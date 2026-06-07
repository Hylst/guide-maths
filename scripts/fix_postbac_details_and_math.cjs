const fs = require('fs');
const path = require('path');

const postBacDir = path.join(__dirname, '..', 'Cours_Math', '04_Post_Bac');

let totalFilesCount = 0;
let modifiedFilesCount = 0;

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

function processFile(filePath) {
  if (!filePath.endsWith('.md')) return;
  totalFilesCount++;

  let original = fs.readFileSync(filePath, 'utf-8');
  let content = original;

  // 1. Clean details tags of all attributes (style, className, etc.)
  content = content.replace(/<details\b[^>]*>/gi, '<details>');

  // 2. Clean summary tags of all attributes and inner formatting like strong/bold/asterisks
  content = content.replace(/<summary\b[^>]*>([\s\S]*?)<\/summary>/gi, (match, innerText) => {
    let cleanText = innerText
      .replace(/<strong[^>]*>/gi, '')
      .replace(/<\/strong>/gi, '')
      .replace(/<b[^>]*>/gi, '')
      .replace(/<\/b>/gi, '')
      .replace(/\*\*+/g, '') // Strip markdown strong asterisks **
      .trim();
    return `<summary>${cleanText}</summary>`;
  });

  // 3. Clean paragraph tags within details blocks
  content = content.replace(/<p style="[^"]*">/gi, '\n  ');
  content = content.replace(/<p className="[^"]*">/gi, '\n  ');
  content = content.replace(/<p>/gi, '\n  ');
  content = content.replace(/<\/p>/gi, '');

  // 4. Ensure optimal spacing/newlines inside details/summary structures for MD content parsing
  content = content.replace(/<\/summary>\s*([\s\S]*?)\s*<\/details>/gi, (match, bodyText) => {
    return `</summary>\n\n  ${bodyText.trim()}\n</details>`;
  });

  // 5. Line-by-line fix for multiline block math display issues
  const lines = content.split('\n');
  let linesFixed = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // If a line starts with $$ but has extra LaTeX code on the same line (opening format)
    if (line.trim().startsWith('$$') && !line.trim().endsWith('$$') && line.trim().length > 2) {
      lines[i] = '$$\n' + line.trim().substring(2);
      linesFixed = true;
    }
    // If a line ends with $$ but contains LaTeX code preceding it (closing format)
    else if (line.trim().endsWith('$$') && !line.trim().startsWith('$$') && line.trim().length > 2) {
      lines[i] = line.trim().substring(0, line.trim().length - 2) + '\n$$';
      linesFixed = true;
    }
  }

  if (linesFixed) {
    content = lines.join('\n');
  }

  // 6. Save if modified
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[FIXED] ${path.relative(postBacDir, filePath)}`);
    modifiedFilesCount++;
  }
}

console.log('Scanning Post_Bac math courses to standardize FAQ rendering and math blocks...');
walk(postBacDir, processFile);
console.log(`Scan completed. Processed ${totalFilesCount} files. Modified ${modifiedFilesCount} files.`);
