const fs = require('fs');
const path = require('path');

function parseLawFile(filePath, lawType) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const articles = [];
  let currentArticle = null;
  let currentContent = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 조문 시작 감지 (제1조, 제2조 등)
    const articleMatch = line.match(/^제(\d+)조(?:의(\d+))?\s*(.*)/);
    
    if (articleMatch) {
      // 이전 조문 저장
      if (currentArticle) {
        articles.push({
          ...currentArticle,
          content: currentContent.join(' ').trim()
        });
      }
      
      // 새 조문 시작
      const articleNum = articleMatch[1];
      const subNum = articleMatch[2];
      const rest = articleMatch[3];
      
      currentArticle = {
        id: `${lawType}-${articleNum}${subNum ? `-${subNum}` : ''}`,
        articleNumber: `제${articleNum}조${subNum ? `의${subNum}` : ''}`,
        title: undefined,
        content: '',
      };
      
      currentContent = [rest];
    } 
    // 기존 조문에 내용 추가
    else if (currentArticle && line) {
      // 새로운 장(章) 시작이나 다른 섹션이 아니면 내용 추가
      if (!line.startsWith('제') || !line.includes('장')) {
        currentContent.push(line);
      } else if (line.includes('장')) {
        // 새 장이 시작되면 이전 조문 저장
        if (currentArticle) {
          articles.push({
            ...currentArticle,
            content: currentContent.join(' ').trim()
          });
        }
        currentArticle = null;
        currentContent = [];
      }
    }
  }
  
  // 마지막 조문 저장
  if (currentArticle) {
    articles.push({
      ...currentArticle,
      content: currentContent.join(' ').trim()
    });
  }
  
  return articles.filter(a => a.content && a.content.length > 0);
}

// 각 법률 파싱
const laws = [
  { file: 'lawdata/헌법.md', type: 'constitution', name: '헌법' },
  { file: 'lawdata/민법.md', type: 'civil', name: '민법' },
  { file: 'lawdata/형법.md', type: 'criminal', name: '형법' },
  { file: 'lawdata/상법.md', type: 'commercial', name: '상법' }
];

for (const law of laws) {
  console.log(`파싱 중: ${law.name}...`);
  const articles = parseLawFile(law.file, law.type);
  console.log(`  -> ${articles.length}개 조문 추출됨`);
  
  // TypeScript 파일 생성
  const tsContent = `// ${law.name} 조문 데이터
// 총 ${articles.length}개 조문

export interface LawArticle {
  id: string;
  articleNumber: string;
  title?: string;
  content: string;
  summary?: string;
  example?: string;
  importance?: number;
}

export const ${law.type}Articles: LawArticle[] = ${JSON.stringify(articles, null, 2)};
`;
  
  const outputPath = `data/${law.type}.ts`;
  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`  -> 저장됨: ${outputPath}`);
}

console.log('\n모든 법률 파싱 완료!');

