import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { OpenKoreParser } from './openkore-parser';

// ===== HANDLERS IPC =====
ipcMain.handle('ping', () => {
  return 'pong from main process!';
});

ipcMain.handle('read-file', async (event, filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, content };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('list-files', async (event, folderPath: string) => {
  try {
    const files = fs.readdirSync(folderPath);
    const txtFiles = files.filter(f => f.endsWith('.txt'));
    return { success: true, files: txtFiles };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// ===== OpenKore Handlers =====
ipcMain.handle('openkore:parse-file', async (event, filePath: string) => {
  try {
    const config = OpenKoreParser.parseFile(filePath);
    return { success: true, config };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('openkore:parse-folder', async (event, folderPath: string) => {
  try {
    const configs = OpenKoreParser.parseFolder(folderPath);
    return { success: true, configs };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('openkore:save-file', async (event, filePath: string, config: any, useEquals: boolean) => {
  try {
    OpenKoreParser.saveFile(filePath, config, useEquals);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('openkore:list-files', async (event, folderPath: string) => {
  try {
    const files = OpenKoreParser.listConfigFiles(folderPath);
    return { success: true, files };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
// ========================

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
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
  const isDev = !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:4200');
    //mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/browser/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});