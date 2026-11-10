const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  uploadElevenLabsAudio: (moduleSlug) => ipcRenderer.invoke('upload-elevenlabs-audio', moduleSlug),
  rebuildVideos: () => ipcRenderer.invoke('rebuild-videos'),
  openScriptsFile: () => ipcRenderer.invoke('open-scripts-file'),
  onRenderProgress: (callback) => ipcRenderer.on('render-progress', (_event, text) => callback(text)),
});
