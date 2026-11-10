"""
generate_voiceovers.py
Generates English narrator voiceovers (via Edge-TTS neural voice en-US-ChristopherNeural)
and word-level timing files (timeline/words.json & timeline/sentences.json) for all 4 modules (~20s each).
Also supports hot-swapping ElevenLabs audio files placed in ./elevenlabs_audio/module-X.mp3!
"""
import asyncio
import json
import os
import re
import shutil
import subprocess
import edge_tts

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STUDIO_DIR = os.path.join(BASE_DIR, "growkaz-stickman-studio")
ELEVENLABS_DIR = os.path.join(BASE_DIR, "elevenlabs_audio")
FFMPEG_EXE = os.path.join(STUDIO_DIR, "ffmpeg.exe")

MODULES = [
    {
        "slug": "module-1",
        "title": "Module 1 - Process and Memory Segmentation",
        "voice": "en-US-ChristopherNeural",
        "rate": "+22%",
        "text": (
            "The moment you launch an executable application, it becomes an active process in main memory. "
            "To run, the operating system sets aside variable-sized memory segments for it, called memory segmentation. "
            "This space is divided into Stack, Free Memory, Data, and Code segments. "
            "Even better? They don't need to sit next to each other, because the OS tracks every part automatically."
        ),
    },
    {
        "slug": "module-2",
        "title": "Module 2 - Code Segment and Data Segment",
        "voice": "en-US-ChristopherNeural",
        "rate": "+18%",
        "text": (
            "Inside a process's memory segment, how does your computer separate instructions from changing values? "
            "Meet the Code Segment and the Data Segment. "
            "At the bottom sits the Code Segment, where all executable program instructions reside. "
            "Right above it lives the Data Segment, a memory space allocated for all the variables the program will use. "
            "One stores what to do; the other stores what to remember."
        ),
    },
    {
        "slug": "module-3",
        "title": "Module 3 - Stack Segment and Subroutines",
        "voice": "en-US-ChristopherNeural",
        "rate": "+20%",
        "text": (
            "What happens when a running instruction is suddenly interrupted by a function or subroutine? "
            "That is the job of the Stack Segment. "
            "Whenever a subroutine is called, the program notes the exact memory address where it left off, "
            "and keeps that return address safe inside the stack while the subroutine runs. "
            "When the subroutine finishes, the program returns to the exact address stored in the stack."
        ),
    },
    {
        "slug": "module-4",
        "title": "Module 4 - Dynamic Stack Growth and Free Memory",
        "voice": "en-US-ChristopherNeural",
        "rate": "+18%",
        "text": (
            "What happens when multiple subroutines run at the same time? "
            "The more subroutines running, the more memory is needed in the stack to store return addresses. "
            "When those subroutines complete, memory is freed up again, so the stack is continually getting bigger and smaller. "
            "That is why Free Memory is allocated right next to the stack, allowing it to grow and shrink as necessary."
        ),
    },
]


def get_audio_duration(path: str) -> float:
    p = subprocess.run(
        [FFMPEG_EXE, "-v", "error", "-i", path, "-f", "f32le", "-acodec", "pcm_f32le", "-ac", "1", "-ar", "16000", "-"],
        capture_output=True,
    )
    if p.returncode != 0:
        raise RuntimeError(f"ffmpeg decode failed for {path}: {p.stderr.decode(errors='ignore')}")
    samples = len(p.stdout) // 4
    return round(samples / 16000.0, 3)


def build_sentences(words):
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(w)
        nxt = words[i + 1] if i + 1 < len(words) else None
        end_punct = re.search(r"[.?!…]['\"”’)]*$", w["word"].strip())
        gap = (nxt["start"] - w["end"]) if nxt else 9.0
        if end_punct or gap > 0.65 or not nxt:
            out.append({
                "i": len(out),
                "start": round(cur[0]["start"], 3),
                "end": round(cur[-1]["end"], 3),
                "text": " ".join(x["word"].strip() for x in cur).strip(),
            })
            cur = []
    return out


async def synthesize_module(mod: dict):
    slug = mod["slug"]
    proj_dir = os.path.join(STUDIO_DIR, "projects", slug)
    input_dir = os.path.join(proj_dir, "input")
    timeline_dir = os.path.join(proj_dir, "timeline")
    os.makedirs(input_dir, exist_ok=True)
    os.makedirs(timeline_dir, exist_ok=True)
    os.makedirs(ELEVENLABS_DIR, exist_ok=True)

    with open(os.path.join(input_dir, "script.txt"), "w", encoding="utf-8") as f:
        f.write(mod["text"] + "\n")

    vo_path = os.path.join(input_dir, "voiceover.mp3")
    custom_elevenlabs = os.path.join(ELEVENLABS_DIR, f"{slug}.mp3")

    words = []
    if os.path.exists(custom_elevenlabs):
        print(f"[{slug}] Using custom ElevenLabs audio: {custom_elevenlabs}")
        shutil.copy2(custom_elevenlabs, vo_path)
        dur = get_audio_duration(vo_path)
        raw_tokens = mod["text"].split()
        step = (dur - 0.3) / max(1, len(raw_tokens))
        for idx, tok in enumerate(raw_tokens):
            words.append({
                "word": tok,
                "start": round(0.1 + idx * step, 3),
                "end": round(0.1 + (idx + 0.9) * step, 3),
            })
    else:
        print(f"[{slug}] Generating neural voiceover via Edge-TTS ({mod['voice']})...")
        comm = edge_tts.Communicate(mod["text"], mod["voice"], rate=mod["rate"], boundary="WordBoundary")
        raw_tokens = mod["text"].split()
        tok_idx = 0
        with open(vo_path, "wb") as audio_file:
            async for chunk in comm.stream():
                if chunk["type"] == "audio":
                    audio_file.write(chunk["data"])
                elif chunk["type"] == "WordBoundary":
                    st = round(chunk["offset"] / 10_000_000.0, 3)
                    du = round(chunk["duration"] / 10_000_000.0, 3)
                    en = round(st + max(0.08, du), 3)
                    txt = chunk["text"].strip()
                    if tok_idx < len(raw_tokens):
                        clean_raw = re.sub(r"[^\w']", "", raw_tokens[tok_idx].lower())
                        clean_txt = re.sub(r"[^\w']", "", txt.lower())
                        if clean_raw == clean_txt:
                            txt = raw_tokens[tok_idx]
                            tok_idx += 1
                    words.append({"word": txt, "start": st, "end": en})
        dur = get_audio_duration(vo_path)

    sentences = build_sentences(words)
    with open(os.path.join(timeline_dir, "words.json"), "w", encoding="utf-8") as f:
        json.dump({"source": "edge-tts", "words": words}, f, indent=2)
    with open(os.path.join(timeline_dir, "sentences.json"), "w", encoding="utf-8") as f:
        json.dump(sentences, f, indent=2)
    with open(os.path.join(timeline_dir, "transcript.txt"), "w", encoding="utf-8") as f:
        for s in sentences:
            f.write(f"[{s['start']:05.2f} -> {s['end']:05.2f}] {s['text']}\n")

    print(f"[{slug}] Done! Duration: {dur:.2f}s | {len(words)} words | {len(sentences)} sentences")
    for s in sentences:
        print(f"   {s['start']:5.2f}s - {s['end']:5.2f}s : {s['text']}")


async def main():
    for mod in MODULES:
        await synthesize_module(mod)


if __name__ == "__main__":
    asyncio.run(main())
