import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Aqui vamos expor as APIs depois
  ping: () => ipcRenderer.invoke('ping')
});