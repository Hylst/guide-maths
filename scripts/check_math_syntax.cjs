const fs = require('fs');
const path = require('path');

const postBacDir = path.join(__dirname, '..', 'Cours_Math', '04_Post_Bac');

function walk(dir, callback) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

function checkFile(filePath) {
  if (!filePath.endsWith('.md')) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Count $$ occurrences
  const blockCount = (content.match(/\$\$/g) || []).length;
  if (blockCount % 2 !== 0) {
    console.log(`[ALERT] Unbalanced $$ (found ${blockCount}) in: ${path.relative(postBacDir, filePath)}`);
  }

  // Check details & summary structures within the file
  if (content.includes('<details') && !content.includes('</details>')) {
    console.log(`[ALERT] Unclosed <details> in: ${path.relative(postBacDir, filePath)}`);
  }

  // Check if any details block contains double bold markers like ****
  if (content.includes('SUMMARY') || content.includes('Summary') || content.includes('details style=')) {
    console.log(`[ALERT] Styled details found in: ${path.relative(postBacDir, filePath)}`);
  }
}

console.log('Running sanity check on all Post Bac math courses...');
walk(postBacDir, checkFile);
console.log('Sanity check completed.');
