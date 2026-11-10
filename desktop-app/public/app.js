import * as THREE from 'three';

// Complete 4-Module Curriculum covering 100% of "2. Segmentation"
const MODULES = [
  {
    id: 0,
    slug: 'module-1',
    shortName: '1. Process & Segmentation',
    videoTitle: 'Module 1: From Application to Process & Memory Segmentation',
    quizTitle: 'Module 1 Quiz: Process & Memory Segmentation',
    videoSrc: 'videos/module-1.mp4',
    duration: 21.4,
    scriptText:
      "The moment you launch an executable application, it becomes an active process in main memory. To run, the operating system sets aside variable-sized memory segments for it, called memory segmentation. This space is divided into Stack, Free Memory, Data, and Code segments. Even better? They don't need to sit next to each other, because the OS tracks every part automatically.",
    concepts: [
      { title: 'Executable ➔ Process', desc: 'When an executable application is loaded into main memory, it becomes a process.' },
      { title: 'Memory Segmentation', desc: 'The allocation of segments/sections of memory by the OS to allow a process to run. Segments are NOT a fixed size.' },
      { title: 'Non-Contiguous Tracking', desc: 'Smaller segments do not have to be physically next to one another; the OS keeps track of each part.' },
    ],
    questions: [
      {
        id: 'm1q1',
        q: '1. When an executable application is loaded into main memory, what does it become?',
        options: [
          'A process',
          'A subroutine',
          'A fixed-size ROM sector',
          'A compiler directive',
        ],
        answer: 0,
        explanation: 'Correct! When an executable application is loaded into main memory, it becomes an active "process".',
      },
      {
        id: 'm1q2',
        q: '2. Which statement accurately describes "memory segmentation"?',
        options: [
          'Every segment is locked to a rigid, identical fixed size of 4 KB.',
          'The OS sets aside sections of memory for a process; segments are not a fixed size and are as large as necessary.',
          'It deletes unused hard drive partitions before booting.',
          'It combines all running processes into one single undivided variable.',
        ],
        answer: 1,
        explanation: 'Spot on! Memory segmentation is the allocation of segments of memory to allow a process to run, and segments are as large as is necessary to hold the process.',
      },
      {
        id: 'm1q3',
        q: '3. Do the smaller sections of a process’s memory segment (Stack, Free Memory, Data, Code) have to be physically next to one another in RAM?',
        options: [
          'Yes, they must always be physically contiguous or the CPU halts.',
          'No — they do not have to be physically next to one another; the operating system keeps track of where each part is.',
          'Only the Stack and Code segments must be physically fused together.',
          'The user must manually type memory addresses before launching the app.',
        ],
        answer: 1,
        explanation: 'Exactly right! These smaller segments don’t have to be physically next to one another — the operating system keeps track of where each part of the process’s memory segment is.',
      },
    ],
  },
  {
    id: 1,
    slug: 'module-2',
    shortName: '2. Code & Data Segments',
    videoTitle: 'Module 2: The Code Segment & The Data Segment',
    quizTitle: 'Module 2 Quiz: Code Segment vs. Data Segment',
    videoSrc: 'videos/module-2.mp4',
    duration: 22.2,
    scriptText:
      "Inside a process's memory segment, how does your computer separate instructions from changing values? Meet the Code Segment and the Data Segment. At the bottom sits the Code Segment, where all executable program instructions reside. Right above it lives the Data Segment, a memory space allocated for all the variables the program will use. One stores what to do; the other stores what to remember.",
    concepts: [
      { title: 'Code Segment', desc: 'The section of the process memory segment where the executable program instructions reside.' },
      { title: 'Data Segment', desc: 'A dedicated memory space allocated for all the variables that the program will use.' },
      { title: 'Clear Separation', desc: 'Code Segment stores WHAT TO DO (instructions); Data Segment stores WHAT TO REMEMBER (variables).' },
    ],
    questions: [
      {
        id: 'm2q1',
        q: '1. What resides inside the "code segment" of a process?',
        options: [
          'The program instructions for the process',
          'Only temporary return addresses for interrupted subroutines',
          'Empty unallocated breathing room for the stack',
          'External USB device drivers only',
        ],
        answer: 0,
        explanation: 'Correct! The "code segment" is where the program instructions for the process reside.',
      },
      {
        id: 'm2q2',
        q: '2. What is the "data segment" allocated for?',
        options: [
          'Storing the operating system bootloader',
          'All the variables that the program will use',
          'Holding screen pixel brightness values',
          'Tracking physical CPU fan speeds',
        ],
        answer: 1,
        explanation: 'Correct! The "data segment" is a memory space allocated for all the variables that the program will use.',
      },
      {
        id: 'm2q3',
        q: '3. In the typical memory segment diagram of a process, where are the Code Segment and Data Segment positioned?',
        options: [
          'Code Segment is at the very bottom, with the Data Segment directly above it',
          'Code Segment is at the very top above the Stack Segment',
          'Both are placed outside main memory on the hard disk',
          'Data Segment is at the bottom and Code Segment is in the middle',
        ],
        answer: 0,
        explanation: 'Well done! In the typical memory segment diagram, the Code Segment sits at the base with the Data Segment right above it.',
      },
    ],
  },
  {
    id: 2,
    slug: 'module-3',
    shortName: '3. Stack & Subroutines',
    videoTitle: 'Module 3: The Stack Segment & Subroutines',
    quizTitle: 'Module 3 Quiz: How the Stack Handles Subroutines',
    videoSrc: 'videos/module-3.mp4',
    duration: 20.3,
    scriptText:
      'What happens when a running instruction is suddenly interrupted by a function or subroutine? That is the job of the Stack Segment. Whenever a subroutine is called, the program notes the exact memory address where it left off, and keeps that return address safe inside the stack while the subroutine runs. When the subroutine finishes, the program returns to the exact address stored in the stack.',
    concepts: [
      { title: 'Functions & Subroutines', desc: 'The stack segment is what allows the program to use functions and subroutines.' },
      { title: 'Saving Return Address', desc: 'When an instruction is interrupted by a subroutine, the program notes the address where it left off and keeps it in the stack.' },
      { title: 'Returning on Completion', desc: 'When the subroutine is complete, the program returns to the address stored in the stack.' },
    ],
    questions: [
      {
        id: 'm3q1',
        q: '1. What does the "stack segment" allow a program to use?',
        options: [
          'Functions and subroutines',
          'Permanent hard-drive file encryption',
          'Network firewall rules',
          'External monitor resolution scaling',
        ],
        answer: 0,
        explanation: 'Correct! The "stack segment" is what allows the program to use functions and subroutines.',
      },
      {
        id: 'm3q2',
        q: '2. What happens whenever an instruction is interrupted by a subroutine?',
        options: [
          'The program deletes the Code Segment to save power.',
          'The program notes the address of where it left off, and this address is kept in the stack while the subroutine runs.',
          'The operating system restarts the entire process from line 1.',
          'The return address is discarded because subroutines never return.',
        ],
        answer: 1,
        explanation: 'Exactly! Whenever an instruction is interrupted by a subroutine, the program notes the address of where it left off and keeps it in the stack while the subroutine runs.',
      },
      {
        id: 'm3q3',
        q: '3. What happens when the running subroutine is complete?',
        options: [
          'The program halts permanently.',
          'The program returns to the address stored in the stack.',
          'The stack segment converts into a second Code Segment.',
          'All program variables in the Data Segment are erased.',
        ],
        answer: 1,
        explanation: 'Spot on! When the subroutine is complete, the program returns to the address stored in the stack.',
      },
    ],
  },
  {
    id: 3,
    slug: 'module-4',
    shortName: '4. Stack Growth & Free Memory',
    videoTitle: 'Module 4: Dynamic Stack Growth & Free Memory',
    quizTitle: 'Module 4 Quiz: Dynamic Stack Growth, Free Memory & Diagram Challenge',
    videoSrc: 'videos/module-4.mp4',
    duration: 20.3,
    scriptText:
      'What happens when multiple subroutines run at the same time? The more subroutines running, the more memory is needed in the stack to store return addresses. When those subroutines complete, memory is freed up again, so the stack is continually getting bigger and smaller. That is why Free Memory is allocated right next to the stack, allowing it to grow and shrink as necessary.',
    concepts: [
      { title: 'More Subroutines = Bigger Stack', desc: 'The more subroutines are running, the more memory is needed in the stack to store addresses.' },
      { title: 'Dynamic Grow & Shrink', desc: 'Memory is freed up when subroutines complete, so the stack is continually getting bigger and smaller while the program runs.' },
      { title: 'Role of Free Memory', desc: 'Free memory is allocated memory for the stack to grow and shrink as necessary.' },
    ],
    questions: [
      {
        id: 'm4q1',
        q: '1. Why is the stack continually getting bigger and smaller while a program runs?',
        options: [
          'Because more subroutines running need more stack memory for addresses, and memory is freed up again when subroutines complete.',
          'Because the physical RAM stick expands with heat.',
          'Because the Code Segment randomly deletes instructions.',
          'Because variables move randomly between the Monitor and Keyboard.',
        ],
        answer: 0,
        explanation: 'Correct! More running subroutines require more stack space for return addresses, and memory is freed when they complete.',
      },
      {
        id: 'm4q2',
        q: '2. What is the specific purpose of "free memory" in a process’s memory segment?',
        options: [
          'It is allocated memory for the stack to grow and shrink as necessary.',
          'It holds the compiled binary machine code of the operating system.',
          'It stores permanent user files when the computer is turned off.',
          'It is only used by graphics cards for 3D textures.',
        ],
        answer: 0,
        explanation: 'Exactly! The "free memory" is allocated memory for the stack to grow and shrink as necessary.',
      },
      {
        id: 'm4q3',
        q: '3. Which 4 sections make up the typical memory segment given to a process?',
        options: [
          'Stack segment, Free memory, Data segment, and Code segment',
          'Cache segment, BIOS segment, Registry segment, and Disk segment',
          'HTML segment, CSS segment, JS segment, and SQL segment',
          'Input segment, Output segment, Bus segment, and Clock segment',
        ],
        answer: 0,
        explanation: 'Perfect! A process’s memory segment is divided into the stack segment, free memory, data segment, and code segment.',
      },
    ],
  },
];

// State
let currentModuleIdx = 0;
let currentMode = 'video'; // 'video' | 'quiz' | 'certificate'
const watchedModules = new Set();
const answeredQuestions = new Set();
let diagramCompleted = false;
let xpScore = 0;

// Diagram Builder State (Top to Bottom order)
const CORRECT_DIAGRAM_ORDER = [
  { id: 'stack', label: 'STACK SEGMENT', color: '#9b87d4' },
  { id: 'free',  label: 'FREE MEMORY',   color: '#d9ece8' },
  { id: 'data',  label: 'DATA SEGMENT',  color: '#7bc98f' },
  { id: 'code',  label: 'CODE SEGMENT',  color: '#e5989b' },
];
let userDiagramSlots = [];

// DOM Elements
const flowStepper = document.getElementById('flowStepper');
const scoreDisplay = document.getElementById('scoreDisplay');
const videoView = document.getElementById('videoView');
const quizView = document.getElementById('quizView');
const certificateView = document.getElementById('certificateView');

const videoStepTag = document.getElementById('videoStepTag');
const videoTitle = document.getElementById('videoTitle');
const videoTimerPill = document.getElementById('videoTimerPill');
const lessonVideo = document.getElementById('lessonVideo');
const videoStatusBadge = document.getElementById('videoStatusBadge');
const liveCaptionText = document.getElementById('liveCaptionText');
const conceptStrip = document.getElementById('conceptStrip');
const watchProgressFill = document.getElementById('watchProgressFill');
const watchProgressLabel = document.getElementById('watchProgressLabel');
const replayVideoBtn = document.getElementById('replayVideoBtn');
const startQuizBtn = document.getElementById('startQuizBtn');

const quizStepTag = document.getElementById('quizStepTag');
const quizTitle = document.getElementById('quizTitle');
const backToVideoBtn = document.getElementById('backToVideoBtn');
const quizQuestionsContainer = document.getElementById('quizQuestionsContainer');
const diagramChallengeBox = document.getElementById('diagramChallengeBox');
const quizCompletionStatus = document.getElementById('quizCompletionStatus');
const nextModuleBtn = document.getElementById('nextModuleBtn');

// Render Top Stepper (Video 1 -> Quiz 1 -> Video 2 -> Quiz 2 -> Video 3 -> Quiz 3 -> Video 4 -> Quiz 4)
function renderStepper() {
  flowStepper.innerHTML = '';
  MODULES.forEach((mod, idx) => {
    const vDone = watchedModules.has(idx);
    const qDone = mod.questions.every((q) => answeredQuestions.has(q.id)) && (idx < 3 || diagramCompleted);
    const unlocked = idx === 0 || (MODULES[idx - 1].questions.every((q) => answeredQuestions.has(q.id)));

    const vNode = document.createElement('div');
    vNode.className = `step-node ${currentModuleIdx === idx && currentMode === 'video' ? 'active' : ''} ${vDone ? 'done' : ''} ${!unlocked ? 'locked' : ''}`;
    vNode.innerHTML = `🎬 V${idx + 1}`;
    vNode.title = `${mod.shortName} (20s Video)`;
    vNode.onclick = () => {
      if (unlocked) loadModuleVideo(idx);
    };

    const qNode = document.createElement('div');
    qNode.className = `step-node ${currentModuleIdx === idx && currentMode === 'quiz' ? 'active' : ''} ${qDone ? 'done' : ''} ${!unlocked ? 'locked' : ''}`;
    qNode.innerHTML = `❓ Q${idx + 1}`;
    qNode.title = `${mod.shortName} (Quiz)`;
    qNode.onclick = () => {
      if (unlocked) loadModuleQuiz(idx);
    };

    flowStepper.appendChild(vNode);
    flowStepper.appendChild(qNode);
  });
  scoreDisplay.textContent = `${xpScore} / 130 XP`;
}

// Load Video Stage for Module
function loadModuleVideo(idx) {
  currentModuleIdx = idx;
  currentMode = 'video';
  const mod = MODULES[idx];

  videoView.classList.remove('hidden');
  quizView.classList.add('hidden');
  certificateView.classList.add('hidden');

  videoStepTag.textContent = `MODULE ${idx + 1} OF 4 · WATCH ~20s 3D ANIMATED VIDEO`;
  videoTitle.textContent = mod.videoTitle;
  videoTimerPill.textContent = `⏱️ ${mod.duration.toFixed(0)}s 3D Stickman Video`;

  lessonVideo.src = `${mod.videoSrc}?t=${Date.now()}`;
  lessonVideo.currentTime = 0;
  lessonVideo.play().catch(() => {});

  conceptStrip.innerHTML = mod.concepts
    .map(
      (c) => `
    <div class="concept-card">
      <strong>${c.title}</strong>
      <span>${c.desc}</span>
    </div>`
    )
    .join('');

  updateWatchUI(0);
  highlight3DSegmentForModule(idx);
  renderStepper();
}

function updateWatchUI(pct) {
  const isDone = watchedModules.has(currentModuleIdx) || pct >= 90;
  if (pct >= 90) watchedModules.add(currentModuleIdx);
  const displayPct = watchedModules.has(currentModuleIdx) ? 100 : Math.min(100, Math.round(pct));
  watchProgressFill.style.width = `${displayPct}%`;
  watchProgressLabel.textContent = isDone
    ? '✓ 20s Video Watched — Ready for Quiz!'
    : `Watch progress: ${displayPct}%`;
  videoStatusBadge.textContent = isDone
    ? '✓ Video Completed — Click "Proceed to Module Quiz"'
    : '▶ Watching 20s 3D Animated Lesson...';
}

// Live Remotion-Style Word Highlighting on Video Timeupdate
lessonVideo.addEventListener('timeupdate', () => {
  const mod = MODULES[currentModuleIdx];
  const dur = lessonVideo.duration || mod.duration || 20;
  const cur = lessonVideo.currentTime || 0;
  const pct = (cur / dur) * 100;
  updateWatchUI(pct);

  const words = mod.scriptText.split(' ');
  const activeWordIdx = Math.min(words.length - 1, Math.floor((cur / dur) * words.length));
  const windowStart = Math.max(0, activeWordIdx - 5);
  const windowEnd = Math.min(words.length, windowStart + 12);
  const snippet = words
    .slice(windowStart, windowEnd)
    .map((w, i) => {
      const realIdx = windowStart + i;
      return realIdx === activeWordIdx ? `<span class="caption-word-hi">${w}</span>` : w;
    })
    .join(' ');
  liveCaptionText.innerHTML = snippet;
});

lessonVideo.addEventListener('ended', () => {
  watchedModules.add(currentModuleIdx);
  updateWatchUI(100);
  renderStepper();
});

replayVideoBtn.addEventListener('click', () => {
  lessonVideo.currentTime = 0;
  lessonVideo.play();
});

startQuizBtn.addEventListener('click', () => {
  lessonVideo.pause();
  watchedModules.add(currentModuleIdx);
  loadModuleQuiz(currentModuleIdx);
});

backToVideoBtn.addEventListener('click', () => {
  loadModuleVideo(currentModuleIdx);
});

// Load Quiz Stage for Module
function loadModuleQuiz(idx) {
  currentModuleIdx = idx;
  currentMode = 'quiz';
  const mod = MODULES[idx];

  videoView.classList.add('hidden');
  quizView.classList.remove('hidden');
  certificateView.classList.add('hidden');

  quizStepTag.textContent = `MODULE ${idx + 1} OF 4 · INTERACTIVE QUIZ (VIDEO ➔ QUIZ FLOW)`;
  quizTitle.textContent = mod.quizTitle;

  quizQuestionsContainer.innerHTML = '';
  mod.questions.forEach((qObj) => {
    const isAnswered = answeredQuestions.has(qObj.id);
    const card = document.createElement('div');
    card.className = `quiz-card ${isAnswered ? 'correct' : ''}`;
    card.id = `card-${qObj.id}`;

    const qTitle = document.createElement('div');
    qTitle.className = 'quiz-q-title';
    qTitle.textContent = qObj.q;

    const optsGrid = document.createElement('div');
    optsGrid.className = 'quiz-options';

    const fb = document.createElement('div');
    fb.className = `quiz-feedback ${isAnswered ? 'ok' : 'hidden'}`;
    if (isAnswered) fb.textContent = `✓ ${qObj.explanation}`;

    qObj.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = `quiz-opt-btn ${isAnswered && optIdx === qObj.answer ? 'opt-correct' : ''}`;
      btn.textContent = optText;
      btn.disabled = isAnswered;

      btn.onclick = () => {
        if (optIdx === qObj.answer) {
          btn.classList.add('opt-correct');
          card.classList.add('correct');
          Array.from(optsGrid.children).forEach((b) => (b.disabled = true));
          fb.className = 'quiz-feedback ok';
          fb.textContent = `✓ ${qObj.explanation}`;
          if (!answeredQuestions.has(qObj.id)) {
            answeredQuestions.add(qObj.id);
            xpScore += 10;
          }
          checkModuleQuizCompletion();
          renderStepper();
        } else {
          btn.classList.add('opt-wrong');
          fb.className = 'quiz-feedback err';
          fb.textContent = '✗ Not quite! Review the concept or rewatch the 20s video and try another option.';
        }
      };
      optsGrid.appendChild(btn);
    });

    card.appendChild(qTitle);
    card.appendChild(optsGrid);
    card.appendChild(fb);
    quizQuestionsContainer.appendChild(card);
  });

  // Show interactive Diagram Challenge in Module 4
  if (idx === 3) {
    diagramChallengeBox.classList.remove('hidden');
    renderDiagramBuilder();
  } else {
    diagramChallengeBox.classList.add('hidden');
  }

  checkModuleQuizCompletion();
  renderStepper();
}

function renderDiagramBuilder() {
  const slotsEl = document.getElementById('diagramSlots');
  const bankEl = document.getElementById('diagramBank');
  const fbEl = document.getElementById('diagramFeedback');
  slotsEl.innerHTML = '';
  bankEl.innerHTML = '';

  for (let i = 0; i < 4; i++) {
    const slot = document.createElement('div');
    const item = userDiagramSlots[i];
    slot.className = `diagram-slot ${item ? 'filled' : ''}`;
    if (item) {
      slot.style.background = item.color;
      slot.textContent = `${i + 1}. ${item.label}`;
    } else {
      slot.textContent = `Slot ${i + 1} (${i === 0 ? 'TOP' : i === 3 ? 'BOTTOM' : 'MIDDLE'})`;
    }
    slotsEl.appendChild(slot);
  }

  const shuffled = [
    CORRECT_DIAGRAM_ORDER[2],
    CORRECT_DIAGRAM_ORDER[0],
    CORRECT_DIAGRAM_ORDER[3],
    CORRECT_DIAGRAM_ORDER[1],
  ];
  shuffled.forEach((sec) => {
    const alreadyUsed = userDiagramSlots.some((x) => x.id === sec.id);
    const chip = document.createElement('button');
    chip.className = 'bank-chip';
    chip.style.background = sec.color;
    chip.style.opacity = alreadyUsed ? '0.3' : '1';
    chip.disabled = alreadyUsed || diagramCompleted;
    chip.textContent = sec.label;
    chip.onclick = () => {
      if (userDiagramSlots.length < 4) {
        userDiagramSlots.push(sec);
        renderDiagramBuilder();
      }
    };
    bankEl.appendChild(chip);
  });

  document.getElementById('resetDiagramBtn').onclick = () => {
    if (diagramCompleted) return;
    userDiagramSlots = [];
    fbEl.classList.add('hidden');
    renderDiagramBuilder();
  };

  document.getElementById('verifyDiagramBtn').onclick = () => {
    if (userDiagramSlots.length < 4) {
      fbEl.className = 'quiz-feedback err';
      fbEl.textContent = 'Please place all 4 segments from TOP to BOTTOM first!';
      return;
    }
    const isOk = userDiagramSlots.every((s, i) => s.id === CORRECT_DIAGRAM_ORDER[i].id);
    if (isOk) {
      if (!diagramCompleted) {
        diagramCompleted = true;
        xpScore += 10;
      }
      fbEl.className = 'quiz-feedback ok';
      fbEl.textContent = '✓ Perfect! Top to Bottom: STACK SEGMENT ➔ FREE MEMORY ➔ DATA SEGMENT ➔ CODE SEGMENT!';
      checkModuleQuizCompletion();
      renderStepper();
    } else {
      fbEl.className = 'quiz-feedback err';
      fbEl.textContent = '✗ Order doesn’t match the Typical Memory Segment diagram yet. Hint: Stack is at the TOP, Free Memory below it, Data Segment next, and Code Segment at the BOTTOM.';
    }
  };
}

function checkModuleQuizCompletion() {
  const mod = MODULES[currentModuleIdx];
  const allQsDone = mod.questions.every((q) => answeredQuestions.has(q.id));
  const diagDone = currentModuleIdx < 3 || diagramCompleted;

  if (allQsDone && diagDone) {
    nextModuleBtn.disabled = false;
    if (currentModuleIdx < 3) {
      quizCompletionStatus.textContent = `🎉 Module ${currentModuleIdx + 1} Complete! Unlock the next 20s 3D video.`;
      nextModuleBtn.textContent = `Watch Module ${currentModuleIdx + 2} Video (20s) ➔`;
    } else {
      quizCompletionStatus.textContent = '🏆 All 4 Modules & Diagram Challenge Completed!';
      nextModuleBtn.textContent = 'View Final Mastery Certificate 🏆';
    }
  } else {
    nextModuleBtn.disabled = true;
    quizCompletionStatus.textContent =
      currentModuleIdx === 3
        ? 'Answer all 3 questions AND complete the Diagram Challenge to finish the course!'
        : 'Answer all 3 questions correctly to unlock the next 20s video!';
  }
}

nextModuleBtn.addEventListener('click', () => {
  if (currentModuleIdx < 3) {
    loadModuleVideo(currentModuleIdx + 1);
  } else {
    showCertificate();
  }
});

function showCertificate() {
  currentMode = 'certificate';
  videoView.classList.add('hidden');
  quizView.classList.add('hidden');
  certificateView.classList.remove('hidden');
  document.getElementById('certStats').innerHTML = `
    <div class="score-pill" style="display:inline-flex;margin-bottom:10px;">
      <span class="score-label">FINAL SCORE</span>
      <span class="score-val">${xpScore} / 130 XP (100%)</span>
    </div>
  `;
  renderStepper();
}

document.getElementById('restartCourseBtn').addEventListener('click', () => {
  watchedModules.clear();
  answeredQuestions.clear();
  diagramCompleted = false;
  userDiagramSlots = [];
  xpScore = 0;
  loadModuleVideo(0);
});

// ============================================================================
// Interactive Three.js 3D Memory Segmentation Inspector (Right Sidebar)
// ============================================================================
const canvas = document.getElementById('inspectorCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio || 1);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#060b13');

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(0, 2.2, 6.2);
camera.lookAt(0, 1.8, 0);

scene.add(new THREE.AmbientLight('#a0d8ef', 1.1));
const dirLight = new THREE.DirectionalLight('#ffffff', 2.2);
dirLight.position.set(4, 8, 5);
scene.add(dirLight);

// Grid floor
const grid = new THREE.GridHelper(10, 14, '#3FF2B6', '#14263d');
grid.position.y = 0;
scene.add(grid);

// 3D Tower Group
const towerGroup = new THREE.Group();
scene.add(towerGroup);

const matCode  = new THREE.MeshStandardMaterial({ color: '#e5989b', roughness: 0.35, metalness: 0.1 });
const matData  = new THREE.MeshStandardMaterial({ color: '#7bc98f', roughness: 0.35, metalness: 0.1 });
const matFree  = new THREE.MeshStandardMaterial({ color: '#d9ece8', roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.78 });
const matStack = new THREE.MeshStandardMaterial({ color: '#9b87d4', roughness: 0.35, metalness: 0.1 });

const meshCode  = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 1.4), matCode);
const meshData  = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 1.4), matData);
const meshFree  = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 1.4), matFree);
const meshStack = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.75, 1.4), matStack);

meshCode.position.y = 0.45;
meshData.position.y = 1.25;
meshFree.position.y = 2.2;
meshStack.position.y = 3.2;

towerGroup.add(meshCode, meshData, meshFree, meshStack);

let subroutinesCount = 1;
const simReadout = document.getElementById('simReadout');

function updateStackSimulation() {
  const stackScaleY = 0.6 + subroutinesCount * 0.32;
  const freeScaleY = Math.max(0.25, 1.45 - subroutinesCount * 0.24);
  meshStack.scale.y = stackScaleY;
  meshFree.scale.y = freeScaleY;
  meshFree.position.y = 1.6 + (freeScaleY * 1.2) / 2;
  meshStack.position.y = meshFree.position.y + (freeScaleY * 1.2) / 2 + (stackScaleY * 0.75) / 2 + 0.04;
  simReadout.innerHTML = `Active Subroutines in Stack: <strong>${subroutinesCount}</strong> · Free Memory: <strong>${Math.round((freeScaleY / 1.45) * 100)}%</strong>`;
}

document.getElementById('simPushBtn').addEventListener('click', () => {
  if (subroutinesCount < 4) {
    subroutinesCount++;
    updateStackSimulation();
  }
});

document.getElementById('simPopBtn').addEventListener('click', () => {
  if (subroutinesCount > 1) {
    subroutinesCount--;
    updateStackSimulation();
  }
});

function highlight3DSegmentForModule(idx) {
  [matCode, matData, matFree, matStack].forEach((m) => m.emissive.setHex(0x000000));
  if (idx === 1) {
    matCode.emissive.setHex(0x441518);
    matData.emissive.setHex(0x143d22);
  } else if (idx === 2) {
    matStack.emissive.setHex(0x2a1d4d);
  } else if (idx === 3) {
    matStack.emissive.setHex(0x2a1d4d);
    matFree.emissive.setHex(0x163832);
  }
}

// Mouse drag rotation on 3D Inspector
let isDragging = false;
let prevX = 0;
let rotY = 0.35;
canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  prevX = e.clientX;
});
window.addEventListener('mouseup', () => (isDragging = false));
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  rotY += (e.clientX - prevX) * 0.01;
  prevX = e.clientX;
});

function resizeThreeInspector() {
  const rect = canvas.parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / Math.max(1, rect.height);
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resizeThreeInspector);

function animateThree(now) {
  requestAnimationFrame(animateThree);
  if (!isDragging) rotY += 0.004;
  towerGroup.rotation.y = rotY;
  towerGroup.position.y = Math.sin(now * 0.002) * 0.05;
  renderer.render(scene, camera);
}

// ============================================================================
// ScriptForge & ElevenLabs Studio Modal
// ============================================================================
const studioModal = document.getElementById('studioModal');
const studioScriptsList = document.getElementById('studioScriptsList');
const renderLogBox = document.getElementById('renderLogBox');

function renderStudioModal() {
  studioScriptsList.innerHTML = MODULES.map(
    (m) => `
    <div class="studio-script-card">
      <h4>${m.videoTitle} (~20s)</h4>
      <div class="studio-script-text" id="script-txt-${m.slug}">${m.scriptText}</div>
      <div class="studio-card-actions">
        <button class="btn btn-secondary btn-sm" data-copy="${m.slug}">📋 Copy for ElevenLabs</button>
        <button class="btn btn-outline btn-sm" data-upload="${m.slug}">🎵 Upload ElevenLabs MP3</button>
      </div>
      <div id="status-${m.slug}" style="font-size:11px;color:#3FF2B6;"></div>
    </div>
  `
  ).join('');

  studioScriptsList.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.onclick = () => {
      const slug = btn.getAttribute('data-copy');
      const mod = MODULES.find((x) => x.slug === slug);
      navigator.clipboard.writeText(mod.scriptText);
      btn.textContent = '✓ Copied!';
      setTimeout(() => (btn.textContent = '📋 Copy for ElevenLabs'), 1500);
    };
  });

  studioScriptsList.querySelectorAll('[data-upload]').forEach((btn) => {
    btn.onclick = async () => {
      const slug = btn.getAttribute('data-upload');
      if (!window.electronAPI) return;
      const res = await window.electronAPI.uploadElevenLabsAudio(slug);
      if (res?.ok) {
        document.getElementById(`status-${slug}`).textContent = `✓ Loaded ElevenLabs audio: ${res.filename}`;
      }
    };
  });
}

document.getElementById('openStudioBtn').onclick = () => {
  renderStudioModal();
  studioModal.classList.remove('hidden');
};
document.getElementById('closeStudioBtn').onclick = () => {
  studioModal.classList.add('hidden');
};
document.getElementById('openMarkdownBtn').onclick = () => {
  window.electronAPI?.openScriptsFile();
};
document.getElementById('rebuildVideosBtn').onclick = async () => {
  const btn = document.getElementById('rebuildVideosBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Rendering 3D Videos & Mixing Audio...';
  renderLogBox.classList.remove('hidden');
  renderLogBox.textContent = 'Starting GrowKaz Stickman Studio + Three.js pipeline...\n';
  const res = await window.electronAPI?.rebuildVideos();
  btn.disabled = false;
  btn.textContent = '⚡ Re-Render & Combine All 4 Videos with ElevenLabs Audio';
  if (res?.ok) {
    renderLogBox.textContent += '\n✓ All 4 videos re-rendered and updated! Reloading current video...';
    loadModuleVideo(currentModuleIdx);
  } else {
    renderLogBox.textContent += `\nError: ${res?.error || 'Unknown error'}`;
  }
};

window.electronAPI?.onRenderProgress((msg) => {
  renderLogBox.textContent += msg;
  renderLogBox.scrollTop = renderLogBox.scrollHeight;
});

// Boot App
setTimeout(() => {
  resizeThreeInspector();
  updateStackSimulation();
  animateThree(0);
  loadModuleVideo(0);
}, 60);
