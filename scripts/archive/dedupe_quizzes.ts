import fs from 'fs';
import path from 'path';

function getMdFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getMdFiles(fullPath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = getMdFiles('./Cours_Math');
for(const f of files) {
    let content = fs.readFileSync(f, 'utf-8');
    const parts = content.split('## 📝 Mini-Quiz');
    if (parts.length > 2) {
        console.log("Multiple quizzes found in: " + f);
        // Leave only the last one
        // parts[0] + parts[1] (maybe remove parts[1]) ... wait, parts[1] is the FIRST quiz
        
        // Actually, let's keep all content EXCEPT the first quizzes (the block of the first quiz starts at parts[1] and ends at the next block)
        // A safer way: find the LAST ## 📝 Mini-Quiz, and remove all earlier ## 📝 Mini-Quiz blocks.
        
        let newContent = content;
        while(newContent.split('## 📝 Mini-Quiz').length > 2) {
            newContent = newContent.replace(/## 📝 Mini-Quiz\n*([\s\S]*?)(?=\n*## |\n*---|\n*$)/, '');
        }
        fs.writeFileSync(f, newContent, 'utf-8');
        console.log("Fixed: " + f);
    }
}
