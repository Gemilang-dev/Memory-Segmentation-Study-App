"""
setup_project_configs.py
Generates config.json and story/shots.json for module-1, module-2, module-3, and module-4.
"""
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STUDIO_DIR = os.path.join(BASE_DIR, "growkaz-stickman-studio")

PROJECTS = {
    "module-1": {
        "title": "Module 1 - Process and Memory Segmentation",
        "duration": 21.4,
        "shots": [
            {
                "id": "s001", "start": 0.0, "end": 4.6,
                "line": "The moment you launch an executable application, it becomes an active process in main memory.",
                "scene": "3D Main Memory RAM launch",
                "in": {"type": "fade", "dur": 0.4},
                "sfx": [{"at": 0.2, "name": "powerup", "gain": -9}, {"at": 0.8, "name": "pop", "gain": -11}],
                "amb": {"name": "hum", "gain": -24}
            },
            {
                "id": "s002", "start": 4.6, "end": 10.6,
                "line": "To run, the operating system sets aside variable-sized memory segments for it, called memory segmentation.",
                "scene": "2.5D CyberLab variable size segmentation",
                "in": {"type": "whip", "dur": 0.35},
                "sfx": [{"at": 0.1, "name": "whoosh", "gain": -10}, {"at": 0.6, "name": "blip", "gain": -12}],
                "amb": {"name": "roomtone", "gain": -24}
            },
            {
                "id": "s003", "start": 10.6, "end": 15.3,
                "line": "This space is divided into Stack, Free Memory, Data, and Code segments.",
                "scene": "Blueprint 4-section memory diagram",
                "in": {"type": "zoom", "dur": 0.4},
                "sfx": [{"at": 0.2, "name": "pop", "gain": -10}, {"at": 1.0, "name": "pop", "gain": -10, "pitch": 1.15}, {"at": 1.8, "name": "pop", "gain": -10, "pitch": 1.3}],
            },
            {
                "id": "s004", "start": 15.3, "end": 21.4,
                "line": "Even better? They don't need to sit next to each other, because the OS tracks every part automatically.",
                "scene": "3D Non-contiguous RAM blocks tracked by OS Kernel",
                "in": {"type": "flash", "dur": 0.35},
                "sfx": [{"at": 0.1, "name": "shimmer", "gain": -9}, {"at": 0.6, "name": "ding", "gain": -10}],
                "amb": {"name": "hum", "gain": -24}
            }
        ],
        "music": [
            {"start": 0.0, "end": 10.6, "mood": "mystery", "intensity": 0.5},
            {"start": 10.6, "end": 21.4, "mood": "wonder", "intensity": 0.7}
        ]
    },
    "module-2": {
        "title": "Module 2 - Code Segment and Data Segment",
        "duration": 22.2,
        "shots": [
            {
                "id": "s001", "start": 0.0, "end": 7.7,
                "line": "Inside a process's memory segment, how does your computer separate instructions from changing values? Meet the Code Segment and the Data Segment.",
                "scene": "BigFace Alex + Memory Tower",
                "in": {"type": "fade", "dur": 0.4},
                "sfx": [{"at": 0.3, "name": "whoosh", "gain": -11}, {"at": 4.8, "name": "ding", "gain": -10}],
                "amb": {"name": "roomtone", "gain": -24}
            },
            {
                "id": "s002", "start": 7.7, "end": 12.6,
                "line": "At the bottom sits the Code Segment, where all executable program instructions reside.",
                "scene": "3D Code Segment Vault",
                "in": {"type": "zoom", "dur": 0.4},
                "sfx": [{"at": 0.2, "name": "stinger", "gain": -10}, {"at": 0.8, "name": "blip", "gain": -12}],
                "amb": {"name": "hum", "gain": -24}
            },
            {
                "id": "s003", "start": 12.6, "end": 18.3,
                "line": "Right above it lives the Data Segment, a memory space allocated for all the variables the program will use.",
                "scene": "3D Data Segment Variables",
                "in": {"type": "cut"},
                "sfx": [{"at": 0.2, "name": "pop", "gain": -10}, {"at": 1.1, "name": "counter", "gain": -14}],
                "amb": {"name": "hum", "gain": -24}
            },
            {
                "id": "s004", "start": 18.3, "end": 22.2,
                "line": "One stores what to do; the other stores what to remember.",
                "scene": "Blueprint comparison Code vs Data",
                "in": {"type": "whip", "dur": 0.35},
                "sfx": [{"at": 0.1, "name": "swish", "gain": -10}, {"at": 0.5, "name": "ding", "gain": -9}]
            }
        ],
        "music": [
            {"start": 0.0, "end": 12.6, "mood": "hopeful", "intensity": 0.5},
            {"start": 12.6, "end": 22.2, "mood": "wonder", "intensity": 0.65}
        ]
    },
    "module-3": {
        "title": "Module 3 - Stack Segment and Subroutines",
        "duration": 20.3,
        "shots": [
            {
                "id": "s001", "start": 0.0, "end": 4.2,
                "line": "What happens when a running instruction is suddenly interrupted by a function or subroutine?",
                "scene": "Thread Runner jumps to subroutine",
                "in": {"type": "fade", "dur": 0.35},
                "sfx": [{"at": 0.2, "name": "footstep", "gain": -11}, {"at": 1.5, "name": "whoosh", "gain": -8}],
                "amb": {"name": "roomtone", "gain": -24}
            },
            {
                "id": "s002", "start": 4.2, "end": 6.6,
                "line": "That is the job of the Stack Segment.",
                "scene": "Prof close-up + Stack Segment highlight",
                "in": {"type": "cut"},
                "sfx": [{"at": 0.15, "name": "ding", "gain": -9}]
            },
            {
                "id": "s003", "start": 6.6, "end": 15.0,
                "line": "Whenever a subroutine is called, the program notes the exact memory address where it left off, and keeps that return address safe inside the stack while the subroutine runs.",
                "scene": "3D Stack Push Return Address",
                "in": {"type": "zoom", "dur": 0.4},
                "sfx": [{"at": 0.6, "name": "swish", "gain": -9}, {"at": 1.8, "name": "hit", "gain": -10}],
                "amb": {"name": "hum", "gain": -24}
            },
            {
                "id": "s004", "start": 15.0, "end": 20.3,
                "line": "When the subroutine finishes, the program returns to the exact address stored in the stack.",
                "scene": "3D Stack Pop & Return to Main Code",
                "in": {"type": "flash", "dur": 0.35},
                "sfx": [{"at": 0.3, "name": "powerup", "gain": -9}, {"at": 1.2, "name": "shimmer", "gain": -10}],
                "amb": {"name": "hum", "gain": -24}
            }
        ],
        "music": [
            {"start": 0.0, "end": 6.6, "mood": "tension", "intensity": 0.55},
            {"start": 6.6, "end": 20.3, "mood": "triumph", "intensity": 0.65}
        ]
    },
    "module-4": {
        "title": "Module 4 - Dynamic Stack Growth and Free Memory",
        "duration": 20.3,
        "shots": [
            {
                "id": "s001", "start": 0.0, "end": 3.1,
                "line": "What happens when multiple subroutines run at the same time?",
                "scene": "3D Nested Subroutines Stacking",
                "in": {"type": "fade", "dur": 0.35},
                "sfx": [{"at": 0.2, "name": "pop", "gain": -10}, {"at": 0.7, "name": "pop", "gain": -10, "pitch": 1.15}, {"at": 1.2, "name": "pop", "gain": -10, "pitch": 1.3}],
                "amb": {"name": "hum", "gain": -24}
            },
            {
                "id": "s002", "start": 3.1, "end": 8.1,
                "line": "The more subroutines running, the more memory is needed in the stack to store return addresses.",
                "scene": "Blueprint Stack Growth DataCard",
                "in": {"type": "whip", "dur": 0.35},
                "sfx": [{"at": 0.3, "name": "counter", "gain": -12}],
            },
            {
                "id": "s003", "start": 8.1, "end": 14.1,
                "line": "When those subroutines complete, memory is freed up again, so the stack is continually getting bigger and smaller.",
                "scene": "2.5D Oscillating Stack Growth & Shrinkage",
                "in": {"type": "cut"},
                "sfx": [{"at": 0.3, "name": "whoosh", "gain": -10}, {"at": 2.5, "name": "swish", "gain": -10}],
                "amb": {"name": "roomtone", "gain": -24}
            },
            {
                "id": "s004", "start": 14.1, "end": 20.3,
                "line": "That is why Free Memory is allocated right next to the stack, allowing it to grow and shrink as necessary.",
                "scene": "3D Full Memory Segmentation Tower Finale",
                "in": {"type": "flash", "dur": 0.35},
                "sfx": [{"at": 0.1, "name": "stinger", "gain": -8}, {"at": 1.0, "name": "shimmer", "gain": -9}],
                "amb": {"name": "hum", "gain": -24}
            }
        ],
        "music": [
            {"start": 0.0, "end": 8.1, "mood": "action", "intensity": 0.55},
            {"start": 8.1, "end": 20.3, "mood": "wonder", "intensity": 0.75}
        ]
    }
}

for slug, data in PROJECTS.items():
    pdir = os.path.join(STUDIO_DIR, "projects", slug)
    os.makedirs(os.path.join(pdir, "story"), exist_ok=True)
    cfg = {
        "title": data["title"],
        "aspect": "16:9",
        "resolution": "720p",
        "fps": 24,
        "style": "emerald",
        "voiceover": "input/voiceover.mp3",
        "script": "input/script.txt",
        "duration": data["duration"],
        "captions": True,
        "captionStyle": {"y": 965, "size": 52, "max": 4},
        "bars": "thin",
        "fadeIn": 0.35,
        "fadeOut": 0.5,
        "music": {"enabled": True, "gainDb": -19},
        "sfx": {"enabled": True, "gainDb": -6},
        "loudness": -14
    }
    with open(os.path.join(pdir, "config.json"), "w", encoding="utf-8") as f:
        json.dump(cfg, f, indent=2)
    story = {
        "title": data["title"],
        "duration": data["duration"],
        "shots": data["shots"],
        "music": data["music"]
    }
    with open(os.path.join(pdir, "story", "shots.json"), "w", encoding="utf-8") as f:
        json.dump(story, f, indent=2)
    print(f"Configured {slug} ({data['duration']}s, {len(data['shots'])} shots)")
