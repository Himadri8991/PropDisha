const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      searchDir(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('properties.slice') || content.includes('.slice(0') || content.includes('properties.filter') || content.includes('properties[')) {
        console.log(`Found slice/filter in: ${filePath}`);
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (line.includes('properties.slice') || line.includes('.slice(0') || line.includes('properties.filter') || line.includes('properties[')) {
            console.log(`  Line ${idx + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

console.log("Searching for properties slicing/filtering in src/...");
searchDir('src');
