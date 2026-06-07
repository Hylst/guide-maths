import fs from 'fs';
import path from 'path';

const coursesDir = path.join(process.cwd(), 'src', 'courses');

let countBracketed = 0;
let countUnbracketed = 0;

fs.readdirSync(coursesDir).forEach(file => {
    if (!file.endsWith('.tsx')) return;
    const content = fs.readFileSync(path.join(coursesDir, file), 'utf-8');
    
    // matches {"$math$"}
    const bracketed = content.match(/\{"\$.*?\$"\}/g);
    if (bracketed) countBracketed += bracketed.length;
    
    // matches $math$ not preceded by " and not followed by "
    // This is a naive check but gives a good idea
    const unbracketed = content.match(/(?<!["\\])\$(?!\$).*?(?<![\\])\$(?!["\$])/g);
    if (unbracketed) countUnbracketed += unbracketed.length;
});

console.log(`Bracketed {"$"}: ${countBracketed}`);
console.log(`Unbracketed $: ${countUnbracketed}`);
