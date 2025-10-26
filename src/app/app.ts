import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElectronService } from './core/electron.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h1>🎮 OpenKore Configurator</h1>
      
      <h2>Parser Test</h2>
      <p>Coloque o caminho da sua pasta control ou config.txt:</p>
      <input 
        type="text" 
        [(ngModel)]="testPath" 
        placeholder="C:\openkore\control"
        style="width: 400px; padding: 8px;"
      >
      <br><br>
      
      <button (click)="testParseFile()">Parse config.txt</button>
      <button (click)="testParseFolder()">Parse Folder Inteira</button>
      
      <div *ngIf="result" style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px; max-height: 400px; overflow: auto;">
        <h3>Result:</h3>
        <pre>{{ result | json }}</pre>
      </div>
    </div>
  `
})
export class App {
  private electron = inject(ElectronService);
  result: any = null;
  testPath = 'D:\\Projetos\\openkore\\control'; // Ajuste para sua pasta

  async testParseFile() {
    const filePath = this.testPath.endsWith('.txt') 
      ? this.testPath 
      : `${this.testPath}\\config.txt`;
    this.result = await this.electron.parseOpenKoreFile(filePath);
  }

  async testParseFolder() {
    this.result = await this.electron.parseOpenKoreFolder(this.testPath);
  }
}
