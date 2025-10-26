export interface ElectronAPI {
  ping: () => Promise<string>;
  readFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  listFiles: (folderPath: string) => Promise<{ success: boolean; files?: string[]; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
