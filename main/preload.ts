import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  listFiles: (folderPath: string) => ipcRenderer.invoke('list-files', folderPath),
  
  // OpenKore APIs
  openkore: {
    parseFile: (filePath: string) => ipcRenderer.invoke('openkore:parse-file', filePath),
    parseFolder: (folderPath: string) => ipcRenderer.invoke('openkore:parse-folder', folderPath),
    saveFile: (filePath: string, config: any, useEquals: boolean) => 
      ipcRenderer.invoke('openkore:save-file', filePath, config, useEquals),
    listFiles: (folderPath: string) => ipcRenderer.invoke('openkore:list-files', folderPath)
  }
});