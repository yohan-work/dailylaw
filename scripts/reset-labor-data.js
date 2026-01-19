const fs = require('fs');

const path = 'data/labor.ts';
const content = fs.readFileSync(path, 'utf-8');

// Find the end of labor-116
const targetId = '"labor-116"';
const targetIndex = content.indexOf(targetId);

if (targetIndex === -1) {
    console.error('Could not find labor-116');
    process.exit(1);
}

// Find the closing brace of labor-116 object
// This is a simple heuristic: find the next '},' after targetId
const closingBraceIndex = content.indexOf('},', targetIndex);

if (closingBraceIndex === -1) {
    console.error('Could not find closing brace for labor-116');
    process.exit(1);
}

// Keep content up to closing brace + 2 (for "},")
const newContent = content.substring(0, closingBraceIndex + 2) + '\n  //여기부터\n];\n';

fs.writeFileSync(path, newContent, 'utf-8');
console.log('Reset labor.ts successfully.');
