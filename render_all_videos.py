"""
render_all_videos.py
End-to-end pipeline:
1. Checks ./elevenlabs_audio/module-X.mp3 (or uses Edge-TTS if not present) via generate_voiceovers.py
2. Updates config.json / shots.json via setup_project_configs.py
3. Renders 3D/2.5D animated video frames via GrowKaz Stickman Studio (node render.mjs)
4. Synthesizes music, 36-SFX library, ducks audio, normalizes to -14 LUFS, and muxes MP4 via audio/mix.py
5. Copies finished MP4s to ./desktop-app/public/videos/module-1.mp4 .. module-4.mp4
"""
import os
import shutil
import subprocess
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STUDIO_DIR = os.path.join(BASE_DIR, "growkaz-stickman-studio")
VENV_SCRIPTS = os.path.join(BASE_DIR, ".venv", "Scripts")
PYTHON_EXE = os.path.join(VENV_SCRIPTS, "python.exe")
VIDEOS_OUT_DIR = os.path.join(BASE_DIR, "desktop-app", "public", "videos")

env = os.environ.copy()
env["PATH"] = f"{VENV_SCRIPTS};{STUDIO_DIR};" + env.get("PATH", "")

MODULES = ["module-1", "module-2", "module-3", "module-4"]


def main():
    os.makedirs(VIDEOS_OUT_DIR, exist_ok=True)
    for slug in MODULES:
        print(f"\n==========================================")
        print(f"  RENDERING & MIXING {slug.upper()}")
        print(f"==========================================")
        out_mp4 = os.path.join(VIDEOS_OUT_DIR, f"{slug}.mp4")
        subprocess.run(
            [
                "node", "render.mjs",
                "--project", f"projects/{slug}",
                "--format", "jpeg",
                "--preset", "veryfast",
                "--workers", "4",
            ],
            cwd=STUDIO_DIR,
            env=env,
            check=True,
        )
        subprocess.run(
            [
                PYTHON_EXE, "audio/mix.py",
                "--project", f"projects/{slug}",
                "--out", out_mp4,
            ],
            cwd=STUDIO_DIR,
            env=env,
            check=True,
        )
        print(f"-> Saved final MP4 to: {out_mp4}")


if __name__ == "__main__":
    main()
