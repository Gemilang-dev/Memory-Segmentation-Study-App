# Memory Segmentation — ScriptForge Narration Scripts (4 × 20-Second Modules)

> **Niche Style:** `4. SCIENCE` (Computer Science & Operating Systems — Wonder-filled, clear, curious, vivid analogies, fact-accurate)
> **Target Duration per Video:** ~20 seconds (~45–55 words at 150 WPM)
> **Total Modules:** 4 Videos + 4 Interactive Quizzes covering 100% of the *2. Segmentation* curriculum.

---

## MODULE 1: From Application to Process & Memory Segmentation
**Title:** How Your OS Slices RAM for Every Running App
**Estimated Word Count:** 52 words (~20 seconds)

### Full Script (With Visual & Delivery Notes)
- **[0:00–0:05 | HOOK]**
  - **[NARRATION]:** The moment you double-click an application, it transforms into an active *process* inside your computer's main memory. *(brief pause)*
  - **[VISUAL]:** 3D low-poly RAM stick glowing in dark teal space; a stickman clicks an executable icon that launches as a glowing energy cube into RAM.
- **[0:05–0:15 | MAIN BODY]**
  - **[NARRATION]:** To run smoothly, the operating system carves out dedicated space for it—a technique called *memory segmentation*. Instead of one rigid block, segments adapt to whatever size the process needs, split into Code, Data, Stack, and Free Memory.
  - **[VISUAL]:** Blueprint diagram slicing a process tower into 4 distinct glowing segments (`STACK SEGMENT`, `FREE MEMORY`, `DATA SEGMENT`, `CODE SEGMENT`) matching the textbook diagram.
- **[0:15–0:20 | PAYOFF]**
  - **[NARRATION]:** Even crazier? *(emphasis)* These pieces don't even have to sit next to each other—your OS tracks every single one automatically.
  - **[VISUAL]:** 3D camera orbit as the 4 segments scatter to different physical slots in RAM while glowing laser pointers from the OS kernel track their addresses.

### Copy-Paste Text for ElevenLabs (Module 1)
```text
The moment you double-click an application, it transforms into an active process inside your computer's main memory. To run smoothly, the operating system carves out dedicated space for it—a technique called memory segmentation. Instead of one rigid block, segments adapt to whatever size the process needs, split into Code, Data, Stack, and Free Memory. Even crazier? These pieces don't even have to sit next to each other—your OS tracks every single one automatically.
```

---

## MODULE 2: The Code Segment & The Data Segment
**Title:** Where Instructions and Variables Actually Live
**Estimated Word Count:** 50 words (~20 seconds)

### Full Script (With Visual & Delivery Notes)
- **[0:00–0:05 | HOOK]**
  - **[NARRATION]:** Inside a process's memory segment, how does your computer keep program instructions separate from changing values? *(pause)*
  - **[VISUAL]:** Giant stickman close-up looking at two glowing blueprints inside the memory tower: the bottom pink `CODE SEGMENT` and green `DATA SEGMENT`.
- **[0:05–0:14 | MAIN BODY]**
  - **[NARRATION]:** Meet the *Code Segment* and the *Data Segment*. At the base sits the Code Segment—the vault where every executable program instruction resides. Right above it lives the Data Segment, a dedicated workspace holding all the variables your program uses.
  - **[VISUAL]:** 3D zoom into the Code Segment showing scrolling machine instructions, then panning up to the Data Segment where labeled variable boxes (`score = 100`, `user = "Alex"`) update live.
- **[0:14–0:20 | PAYOFF]**
  - **[NARRATION]:** One stores *what to do*; the other stores *what to remember*.
  - **[VISUAL]:** Freeze-frame split screen with bold kinetic typography: `CODE = INSTRUCTIONS` vs `DATA = VARIABLES`.

### Copy-Paste Text for ElevenLabs (Module 2)
```text
Inside a process's memory segment, how does your computer keep program instructions separate from changing values? Meet the Code Segment and the Data Segment. At the base sits the Code Segment—the vault where every executable program instruction resides. Right above it lives the Data Segment, a dedicated workspace holding all the variables your program uses. One stores what to do; the other stores what to remember.
```

---

## MODULE 3: The Stack Segment & Subroutines
**Title:** How the Stack Remembers Where Your Code Left Off
**Estimated Word Count:** 54 words (~20 seconds)

### Full Script (With Visual & Delivery Notes)
- **[0:00–0:05 | HOOK]**
  - **[NARRATION]:** What happens when your program is running a line of code, and suddenly jumps away to a function or subroutine? *(pause)*
  - **[VISUAL]:** Stickman runner sprinting along a glowing instruction track, suddenly teleporting up to a floating subroutine platform.
- **[0:05–0:15 | MAIN BODY]**
  - **[NARRATION]:** Without a bookmark, it would be lost forever. That's the job of the *Stack Segment*. Whenever an instruction is interrupted by a subroutine, the program notes the exact memory address where it left off and pushes it onto the stack.
  - **[VISUAL]:** A glowing return-address card (`0x7FF4`) is stamped and pushed onto the top `STACK SEGMENT` tray while the subroutine executes.
- **[0:15–0:20 | PAYOFF]**
  - **[NARRATION]:** Once the subroutine finishes, the program reads that saved address from the stack and jumps right back on track.
  - **[VISUAL]:** The top address card pops off the stack in a burst of sparks, teleporting the stickman back to exact line `0x7FF4`.

### Copy-Paste Text for ElevenLabs (Module 3)
```text
What happens when your program is running a line of code, and suddenly jumps away to a function or subroutine? Without a bookmark, it would be lost forever. That's the job of the Stack Segment. Whenever an instruction is interrupted by a subroutine, the program notes the exact memory address where it left off and pushes it onto the stack. Once the subroutine finishes, the program reads that saved address from the stack and jumps right back on track.
```

---

## MODULE 4: Dynamic Stack Growth & Free Memory
**Title:** Why Every Process Needs Free Memory to Breathe
**Estimated Word Count:** 53 words (~20 seconds)

### Full Script (With Visual & Delivery Notes)
- **[0:00–0:05 | HOOK]**
  - **[NARRATION]:** What happens when one subroutine calls another, which calls *another*? *(pause)*
  - **[VISUAL]:** Rapid 3D camera tilt as multiple subroutine trays stack rapidly downward inside the memory tower.
- **[0:05–0:15 | MAIN BODY]**
  - **[NARRATION]:** The more subroutines running at once, the more space the stack needs to hold all those return addresses. As functions finish, that memory is freed up again—meaning the stack is continually growing and shrinking while the program runs.
  - **[VISUAL]:** Animated bar gauge showing the `STACK SEGMENT` expanding downward into `FREE MEMORY` as nested calls pile up, then shrinking back up as they complete.
- **[0:15–0:20 | PAYOFF]**
  - **[NARRATION]:** That's why *Free Memory* sits right beside the stack—giving it vital breathing room to expand and contract on demand.
  - **[VISUAL]:** Full 4-part Memory Segmentation diagram glowing in 3D space with arrows illustrating the Stack dynamically expanding and contracting into Free Memory.

### Copy-Paste Text for ElevenLabs (Module 4)
```text
What happens when one subroutine calls another, which calls another? The more subroutines running at once, the more space the stack needs to hold all those return addresses. As functions finish, that memory is freed up again—meaning the stack is continually growing and shrinking while the program runs. That's why Free Memory sits right beside the stack—giving it vital breathing room to expand and contract on demand.
```
