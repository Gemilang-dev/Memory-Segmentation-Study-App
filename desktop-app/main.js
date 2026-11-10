const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 750,
    backgroundColor: '#0B1320',
    title: 'SegMentality — 3D Memory Segmentation Interactive Learning Lab',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: Allow user to pick an ElevenLabs MP3/WAV file for a module and hot-swap it
ipcMain.handle('upload-elevenlabs-audio', async (event, moduleSlug) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: `Select ElevenLabs Voiceover Audio for ${moduleSlug.toUpperCase()}`,
    filters: [{ name: 'Audio Files', extensions: ['mp3', 'wav', 'm4a', 'ogg'] }],
    properties: ['openFile'],
  });
  if (result.canceled || !result.filePaths.length) {
    return { ok: false, canceled: true };
  }
  const srcPath = result.filePaths[0];
  const rootDir = path.resolve(__dirname, '..');
  const elevenDir = path.join(rootDir, 'elevenlabs_audio');
  fs.mkdirSync(elevenDir, { recursive: true });
  const destPath = path.join(elevenDir, `${moduleSlug}.mp3`);
  fs.copyFileSync(srcPath, destPath);
  return { ok: true, path: destPath, filename: path.basename(srcPath) };
});

// IPC: Rebuild / Re-render a module (or all modules) with updated ElevenLabs voiceover
ipcMain.handle('rebuild-videos', async () => {
  const rootDir = path.resolve(__dirname, '..');
  const pyExe = path.join(rootDir, '.venv', 'Scripts', 'python.exe');
  const pythonCmd = fs.existsSync(pyExe) ? pyExe : 'python';

  return new Promise((resolve) => {
    const runStep = (scriptName) =>
      new Promise((res, rej) => {
        const proc = spawn(pythonCmd, [path.join(rootDir, scriptName)], { cwd: rootDir });
        proc.stdout.on('data', (d) => {
          mainWindow?.webContents.send('render-progress', d.toString());
        });
        proc.stderr.on('data', (d) => {
          mainWindow?.webContents.send('render-progress', d.toString());
        });
        proc.on('close', (code) => (code === 0 ? res() : rej(new Error(`${scriptName} exited with ${code}`))));
      });

    runStep('generate_voiceovers.py')
      .then(() => runStep('setup_project_configs.py'))
      .then(() => runStep('render_all_videos.py'))
      .then(() => resolve({ ok: true }))
      .catch((err) => resolve({ ok: false, error: err.message }));
  });
});

ipcMain.handle('open-scripts-file', async () => {
  const rootDir = path.resolve(__dirname, '..');
  const scriptsFile = path.join(rootDir, 'SCRIPTS_ELEVENLABS.md');
  if (fs.existsSync(scriptsFile)) {
    await shell.openPath(scriptsFile);
    return { ok: true };
  }
  return { ok: false };
});
