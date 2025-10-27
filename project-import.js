// project-import.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 Creado directorio: ${dirPath}`);
    }
}

function writeFile(filePath, content) {
    createDirectory(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`📄 Creado archivo: ${filePath}`);
}

function recreateStructure(basePath, structure) {
    for (const key in structure) {
        const fullPath = path.join(basePath, key);
        
        if (typeof structure[key] === 'string') {
            // Es un archivo
            writeFile(fullPath, structure[key]);
        } else if (typeof structure[key] === 'object') {
            // Es un directorio
            createDirectory(fullPath);
            recreateStructure(fullPath, structure[key]);
        }
    }
}

function importProject(backupFile = 'project-backup.json') {
    console.log('🚀 Importando proyecto...');
    
    const backupPath = path.join(process.cwd(), backupFile);
    
    if (!fs.existsSync(backupPath)) {
        console.error(`❌ Archivo de backup no encontrado: ${backupFile}`);
        return;
    }
    
    try {
        const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        
        console.log(`📦 Proyecto: ${backupData.metadata.name}`);
        console.log(`🕐 Exportado: ${backupData.metadata.exportDate}`);
        console.log(`📁 Total archivos: ${backupData.metadata.totalFiles}`);
        
        // Recrear estructura
        const targetDir = path.join(process.cwd(), 'restored-project');
        console.log(`🎯 Restaurando en: ${targetDir}`);
        
        recreateStructure(targetDir, backupData.structure);
        
        console.log('✅ Proyecto restaurado exitosamente!');
        console.log('📋 Próximos pasos:');
        console.log('   1. cd restored-project');
        console.log('   2. npm install');
        console.log('   3. npm run dev');
        
    } catch (error) {
        console.error('❌ Error importando proyecto:', error);
    }
}

// Ejecutar importación
importProject();