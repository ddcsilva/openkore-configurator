import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElectronService } from './core/electron.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h1>OpenKore Configurator</h1>
      
      <button (click)="testPing()">Test Ping</button>
      <button (click)="testReadFile()">Test Read File</button>
      
      <div *ngIf="result" style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px;">
        <h3>Result:</h3>
        <pre>{{ result | json }}</pre>
      </div>
    </div>
  `
})
export class App {
  private electron = inject(ElectronService);
  result: any = null;

  async testPing() {
    this.result = await this.electron.ping();
  }

  async testReadFile() {
    // TESTE: tente ler um arquivo que existe no seu PC
    // Troque pelo caminho real de um arquivo .txt seu
    const testPath = 'D:\\Projetos\\openkore\\control\\shop.txt';
    this.result = await this.electron.readFile(testPath);
  }
}
