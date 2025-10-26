import * as fs from 'fs';
import * as path from 'path';

export interface ParsedConfig {
  [key: string]: string | number | boolean;
}

export class OpenKoreParser {
  /**
   * Lê e parseia um arquivo .txt do OpenKore
   * Suporta formatos: "key value" e "key=value"
   */
  static parseFile(filePath: string): ParsedConfig {
    const content = fs.readFileSync(filePath, 'utf-8');
    const config: ParsedConfig = {};

    const lines = content.split('\n');

    for (let line of lines) {
      line = line.trim();

      // Ignora linhas vazias e comentários
      if (!line || line.startsWith('#')) continue;

      // Suporta "key value" e "key=value"
      let key: string, value: string;

      if (line.includes('=')) {
        const parts = line.split('=');
        key = parts[0].trim();
        value = parts.slice(1).join('=').trim();
      } else {
        const parts = line.split(/\s+/);
        key = parts[0];
        value = parts.slice(1).join(' ').trim();
      }

      // Converte tipos automaticamente
      config[key] = this.parseValue(value);
    }

    return config;
  }

  /**
   * Converte JSON de volta para formato .txt do OpenKore
   */
  static toFileContent(config: ParsedConfig, useEquals = false): string {
    const lines: string[] = [];

    for (const [key, value] of Object.entries(config)) {
      const separator = useEquals ? '=' : ' ';
      lines.push(`${key}${separator}${value}`);
    }

    return lines.join('\n');
  }

  /**
   * Salva configuração em arquivo
   */
  static saveFile(filePath: string, config: ParsedConfig, useEquals = false): void {
    const content = this.toFileContent(config, useEquals);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  /**
   * Detecta tipo e converte valor
   */
  private static parseValue(value: string): string | number | boolean {
    // Boolean
    if (value === '1' || value.toLowerCase() === 'true') return true;
    if (value === '0' || value.toLowerCase() === 'false') return false;

    // Number
    if (!isNaN(Number(value)) && value !== '') return Number(value);

    // String
    return value;
  }

  /**
   * Lista todos os .txt de uma pasta
   */
  static listConfigFiles(folderPath: string): string[] {
    const files = fs.readdirSync(folderPath);
    return files.filter(f => f.endsWith('.txt'));
  }

  /**
   * Lê todos os arquivos de configuração de uma pasta
   */
  static parseFolder(folderPath: string): { [fileName: string]: ParsedConfig } {
    const files = this.listConfigFiles(folderPath);
    const configs: { [fileName: string]: ParsedConfig } = {};

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      configs[file] = this.parseFile(filePath);
    }

    return configs;
  }
}
