// project-export.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const PROJECT_ROOT = process.cwd();
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build'];
const EXCLUDE_FILES = ['project-export.js', 'project-import.js', 'project-backup.json'];

function shouldInclude(filePath) {
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    const basename = path.basename(filePath);
    
    // Excluir directorios
    for (const excludeDir of EXCLUDE_DIRS) {
        if (relativePath.startsWith(excludeDir)) {
            return false;
        }
    }
    
    // Excluir archivos específicos
    if (EXCLUDE_FILES.includes(basename)) {
        return false;
    }
    
    return true;
}

function readFileContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        return `// Error reading file: ${error.message}`;
    }
}

function scanDirectory(dirPath) {
    const structure = {};
    
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            
            if (!shouldInclude(fullPath)) {
                continue;
            }
            
            try {
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    structure[item] = scanDirectory(fullPath);
                } else {
                    // Solo incluir archivos de texto (excluir binarios)
                    const ext = path.extname(item).toLowerCase();
                    const textExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css', '.scss', '.md', '.txt'];
                    
                    if (textExtensions.includes(ext)) {
                        structure[item] = readFileContent(fullPath);
                    }
                }
            } catch (error) {
                console.warn(`⚠️  No se pudo acceder a: ${fullPath}`, error.message);
            }
        }
    } catch (error) {
        console.error(`❌ Error escaneando directorio ${dirPath}:`, error);
    }
    
    return structure;
}

function exportProject() {
    console.log('🚀 Exportando proyecto...');
    console.log(`📂 Directorio actual: ${PROJECT_ROOT}`);
    
    const projectStructure = {
        metadata: {
            name: 'Mi Tienda React',
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            totalFiles: 0
        },
        structure: {}
    };
    
    // Escanear todo el directorio actual recursivamente
    console.log('📊 Escaneando estructura de archivos...');
    projectStructure.structure = scanDirectory(PROJECT_ROOT);
    
    // Contar archivos
    function countFiles(obj) {
        let count = 0;
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                count++;
            } else if (typeof obj[key] === 'object') {
                count += countFiles(obj[key]);
            }
        }
        return count;
    }
    
    projectStructure.metadata.totalFiles = countFiles(projectStructure.structure);
    
    // Guardar archivo de exportación
    const outputFile = path.join(PROJECT_ROOT, 'project-backup.json');
    fs.writeFileSync(outputFile, JSON.stringify(projectStructure, null, 2));
    
    console.log(`✅ Exportación completada!`);
    console.log(`📁 Archivos exportados: ${projectStructure.metadata.totalFiles}`);
    console.log(`💾 Guardado en: ${outputFile}`);
    
    // Mostrar resumen
    console.log('\n📋 Resumen de la estructura:');
    function printStructure(obj, indent = '') {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                console.log(`${indent}📄 ${key}`);
            } else {
                console.log(`${indent}📁 ${key}/`);
                printStructure(obj[key], indent + '  ');
            }
        }
    }
    printStructure(projectStructure.structure);
    
    return projectStructure;
}

// Ejecutar exportación
exportProject();