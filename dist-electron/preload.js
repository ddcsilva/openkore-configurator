"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    ping: () => electron_1.ipcRenderer.invoke('ping'),
    readFile: (filePath) => electron_1.ipcRenderer.invoke('read-file', filePath),
    listFiles: (folderPath) => electron_1.ipcRenderer.invoke('list-files', folderPath)
});
