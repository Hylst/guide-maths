import fs from 'fs';
import path from 'path';

const coursesDir = path.join(process.cwd(), 'src', 'courses');

fs.readdirSync(coursesDir).slice(0, 5).forEach(file => {
    if (!file.endsWith('.tsx')) return;
    const content = fs.readFileSync(path.join(coursesDir, file), 'utf-8');
    const unbracketed = content.match(/(?<!["\\])\$(?!\$).*?(?<![\\])\$(?!["\$])/g);
    if (unbracketed) {
        console.log(`\nIn ${file}:`);
        console.log(unbracketed.slice(0, 10));
    }
});
