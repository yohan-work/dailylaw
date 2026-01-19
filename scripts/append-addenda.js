const fs = require('fs');
const path = require('path');

const v2Path = 'lawdata/근로기준법_v2.md';
const laborTsPath = 'data/labor.ts';

const content = fs.readFileSync(v2Path, 'utf-8');
const lines = content.split('\n');

const articles = [];
let currentLawInfo = '';
let currentArticle = null;
let currentContent = [];

function saveCurrentArticle() {
    if (currentArticle) {
        currentArticle.content = currentContent.join(' ').trim();
        if (currentArticle.content) {
            articles.push(currentArticle);
        }
        currentArticle = null;
        currentContent = [];
    }
}

for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Detect Addenda Header first
    // Format: 부칙 <법률 제8372호,  2007. 4. 11.>
    const lawMatch = line.match(/부칙\s*<([^>]+)>/);
    if (lawMatch) {
        saveCurrentArticle();
        currentLawInfo = lawMatch[1].trim(); // e.g. "법률 제8372호, 2007. 4. 11."
        continue;
    }

    // Skip metadata lines (only if they are NOT headers)
    if (line.includes('조문목록') || line.includes('보기') || line === '') continue;

    // Detect Article Start
    // Format: 제1조 (시행일) ... or 제1조(시행일) ...
    const articleMatch = line.match(/^제(\d+)조/);

    if (articleMatch) {
        saveCurrentArticle();

        const articleNum = articleMatch[1];
        // Remove "제1조" prefix to get content
        // But sometimes content starts right after "조" or after space
        let rest = line.replace(/^제\d+조\s*/, '').trim();

        // Extract law number for ID
        const lawNumMatch = currentLawInfo.match(/제(\d+)호/);
        const lawNum = lawNumMatch ? lawNumMatch[1] : 'unknown';

        // Use a global counter to ensure uniqueness across all addenda
        // This solves the issue of multiple "unknown" laws having "Article 1"
        const uniqueIndex = articles.length + 1;
        let uniqueId = `labor-addenda-${lawNum}-${articleNum}-${uniqueIndex}`;

        currentArticle = {
            id: uniqueId,
            articleNumber: `부칙(${currentLawInfo.split(',')[0] || ''}) 제${articleNum}조`,
            content: '',
        };

        currentContent.push(rest);
    } else if (currentArticle) {
        currentContent.push(line);
    }
}
saveCurrentArticle();

// Format to JSON-like string for TS
const jsonContent = articles.map(a => JSON.stringify(a, null, 2)).join(',\n');

// Read labor.ts and replace
let laborTs = fs.readFileSync(laborTsPath, 'utf-8');
if (laborTs.includes('//여기부터')) {
    laborTs = laborTs.replace('//여기부터', jsonContent);
    fs.writeFileSync(laborTsPath, laborTs, 'utf-8');
    console.log(`Successfully appended ${articles.length} addenda articles.`);
} else {
    console.error('Marker //여기부터 not found in labor.ts');
}
