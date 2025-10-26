"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const openkore_parser_1 = require("./openkore-parser");
// ===== HANDLERS IPC =====
electron_1.ipcMain.handle('ping', () => {
    return 'pong from main process!';
});
electron_1.ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return { success: true, content };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
electron_1.ipcMain.handle('list-files', async (event, folderPath) => {
    try {
        const files = fs.readdirSync(folderPath);
        const txtFiles = files.filter(f => f.endsWith('.txt'));
        return { success: true, files: txtFiles };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
// ===== OpenKore Handlers =====
electron_1.ipcMain.handle('openkore:parse-file', async (event, filePath) => {
    try {
        const config = openkore_parser_1.OpenKoreParser.parseFile(filePath);
        return { success: true, config };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
electron_1.ipcMain.handle('openkore:parse-folder', async (event, folderPath) => {
    try {
        const configs = openkore_parser_1.OpenKoreParser.parseFolder(folderPath);
        return { success: true, configs };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
electron_1.ipcMain.handle('openkore:save-file', async (event, filePath, config, useEquals) => {
    try {
        openkore_parser_1.OpenKoreParser.saveFile(filePath, config, useEquals);
        return { success: true };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
electron_1.ipcMain.handle('openkore:list-files', async (event, folderPath) => {
    try {
        const files = openkore_parser_1.OpenKoreParser.listConfigFiles(folderPath);
        return { success: true, files };
    }
    catch (error) {
        return { success: false, error: error.message };
    }
});
// ========================
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    // Em DEV: carrega do ng serve
    // Em PROD: carrega do build
    const isDev = !electron_1.app.isPackaged;
    if (isDev) {
        mainWindow.loadURL('http://localhost:4200');
        //mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../dist/browser/index.html'));
    }
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
