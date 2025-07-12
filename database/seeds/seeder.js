import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the directory where this script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptDir = __dirname;
const dataDir = path.join(scriptDir, 'data');

console.log('🚀 Starting database seeding...');
console.log(`📁 Reading files from: ${dataDir}`);

// Check if data directory exists
if (!fs.existsSync(dataDir)) {
    console.error(`❌ Data directory not found: ${dataDir}`);
    process.exit(1);
}

// Read all files in the data directory
const files = fs.readdirSync(dataDir);

if (files.length === 0) {
    console.log('⚠️  No files found in data directory');
    process.exit(0);
}

console.log(`📄 Found ${files.length} file(s):`);

// Process each file
files.forEach((filename) => {
    const filePath = path.join(dataDir, filename);
    const fileStats = fs.statSync(filePath);
    
    // Skip directories, only process files
    if (!fileStats.isFile()) {
        console.log(`⏭️  Skipping directory: ${filename}`);
        return;
    }
    
    // Get filename without extension
    const filenameWithoutExt = path.parse(filename).name;
    const fileExtension = path.parse(filename).ext;

    try {
        // Execute npx convex import command
        const command = `convex import --yes --replace --table ${filenameWithoutExt} "${filePath}"`;
        
        execSync(command, { 
            stdio: 'inherit',
            cwd: path.join(scriptDir, '../../') // Go to project root
        });
            } catch (error) {
        console.error(`❌ Failed to import ${filename}:`, error.message);
        // Continue with other files even if one fails
    }
});

console.log('\n🎉 Database seeding completed!');
