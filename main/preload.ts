import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  listFiles: (folderPath: string) => ipcRenderer.invoke('list-files', folderPath)
});