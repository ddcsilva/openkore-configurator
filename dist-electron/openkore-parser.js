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
exports.OpenKoreParser = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class OpenKoreParser {
    /**
     * Lê e parseia um arquivo .txt do OpenKore
     * Suporta formatos: "key value" e "key=value"
     */
    static parseFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const config = {};
        const lines = content.split('\n');
        for (let line of lines) {
            line = line.trim();
            // Ignora linhas vazias e comentários
            if (!line || line.startsWith('#'))
                continue;
            // Suporta "key value" e "key=value"
            let key, value;
            if (line.includes('=')) {
                const parts = line.split('=');
                key = parts[0].trim();
                value = parts.slice(1).join('=').trim();
            }
            else {
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
    static toFileContent(config, useEquals = false) {
        const lines = [];
        for (const [key, value] of Object.entries(config)) {
            const separator = useEquals ? '=' : ' ';
            lines.push(`${key}${separator}${value}`);
        }
        return lines.join('\n');
    }
    /**
     * Salva configuração em arquivo
     */
    static saveFile(filePath, config, useEquals = false) {
        const content = this.toFileContent(config, useEquals);
        fs.writeFileSync(filePath, content, 'utf-8');
    }
    /**
     * Detecta tipo e converte valor
     */
    static parseValue(value) {
        // Boolean
        if (value === '1' || value.toLowerCase() === 'true')
            return true;
        if (value === '0' || value.toLowerCase() === 'false')
            return false;
        // Number
        if (!isNaN(Number(value)) && value !== '')
            return Number(value);
        // String
        return value;
    }
    /**
     * Lista todos os .txt de uma pasta
     */
    static listConfigFiles(folderPath) {
        const files = fs.readdirSync(folderPath);
        return files.filter(f => f.endsWith('.txt'));
    }
    /**
     * Lê todos os arquivos de configuração de uma pasta
     */
    static parseFolder(folderPath) {
        const files = this.listConfigFiles(folderPath);
        const configs = {};
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            configs[file] = this.parseFile(filePath);
        }
        return configs;
    }
}
exports.OpenKoreParser = OpenKoreParser;
