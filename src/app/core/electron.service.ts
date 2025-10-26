import { Injectable } from '@angular/core';
import { ParsedConfig } from '../../types/electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private get api() {
    return window.electronAPI;
  }

  async ping(): Promise<string> {
    return this.api.ping();
  }

  async readFile(filePath: string) {
    return this.api.readFile(filePath);
  }

  async listFiles(folderPath: string) {
    return this.api.listFiles(folderPath);
  }

  // OpenKore methods
  async parseOpenKoreFile(filePath: string) {
    return this.api.openkore.parseFile(filePath);
  }

  async parseOpenKoreFolder(folderPath: string) {
    return this.api.openkore.parseFolder(folderPath);
  }

  async saveOpenKoreFile(filePath: string, config: ParsedConfig, useEquals = false) {
    return this.api.openkore.saveFile(filePath, config, useEquals);
  }

  async listOpenKoreFiles(folderPath: string) {
    return this.api.openkore.listFiles(folderPath);
  }
}
