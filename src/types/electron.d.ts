export interface ParsedConfig {
  [key: string]: string | number | boolean;
}

export interface OpenKoreAPI {
  parseFile: (filePath: string) => Promise<{ success: boolean; config?: ParsedConfig; error?: string }>;
  parseFolder: (folderPath: string) => Promise<{ success: boolean; configs?: { [fileName: string]: ParsedConfig }; error?: string }>;
  saveFile: (filePath: string, config: ParsedConfig, useEquals: boolean) => Promise<{ success: boolean; error?: string }>;
  listFiles: (folderPath: string) => Promise<{ success: boolean; files?: string[]; error?: string }>;
}

export interface ElectronAPI {
  ping: () => Promise<string>;
  readFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  listFiles: (folderPath: string) => Promise<{ success: boolean; files?: string[]; error?: string }>;
  openkore: OpenKoreAPI;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
