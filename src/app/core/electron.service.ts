import { Injectable } from '@angular/core';

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
}
