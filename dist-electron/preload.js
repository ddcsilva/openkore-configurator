"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    ping: () => electron_1.ipcRenderer.invoke('ping'),
    readFile: (filePath) => electron_1.ipcRenderer.invoke('read-file', filePath),
    listFiles: (folderPath) => electron_1.ipcRenderer.invoke('list-files', folderPath),
    // OpenKore APIs
    openkore: {
        parseFile: (filePath) => electron_1.ipcRenderer.invoke('openkore:parse-file', filePath),
        parseFolder: (folderPath) => electron_1.ipcRenderer.invoke('openkore:parse-folder', folderPath),
        saveFile: (filePath, config, useEquals) => electron_1.ipcRenderer.invoke('openkore:save-file', filePath, config, useEquals),
        listFiles: (folderPath) => electron_1.ipcRenderer.invoke('openkore:list-files', folderPath)
    }
});
