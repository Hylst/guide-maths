import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { mdToPdf } from 'md-to-pdf';
import QRCode from 'qrcode';

const COURSES_DIR = path.join(process.cwd(), 'Cours_Math');
const OUTPUT_DIR = path.join(process.cwd(), 'dist_pdf');
const APP_URL = process.env.APP_URL || 'https://maths-app.example.com'; // Fallback URL

interface CourseMeta {
  title: string;
  level: string;
  subLevel?: string;
  order: number;
  filePath: string;
  content: string;
}

// Helper to get all markdown files recursively
function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function generateQRCode(url: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(url, { margin: 1, width: 150 });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code', err);
    return '';
  }
}

async function processContent(content: string, courseSlug: string): Promise<string> {
  // Replace interactive SVGs with QR codes
  // The pattern is: <img src=".../filename.svg" alt="..." />
  // We need to find these and if they are in InteractiveRegistry, replace them.
  // Since we don't have direct access to InteractiveRegistry in this script easily,
  // we'll assume any SVG that looks like a component (e.g., TriangleInteractif.svg) 
  // should get a QR code. For now, let's just look for .svg files in the content.
  
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
  let processedContent = content;
  let match;

  // We need to do this asynchronously because of QR code generation
  const replacements: { original: string, replacement: string }[] = [];

  while ((match = imgRegex.exec(content)) !== null) {
    const originalTag = match[0];
    const src = match[1];
    
    if (src.endsWith('.svg')) {
      const filename = src.split('/').pop();
      // Generate URL for this specific course
      const courseUrl = `${APP_URL}/cours/${courseSlug}`;
      const qrDataUrl = await generateQRCode(courseUrl);
      
      const replacement = `
<div style="text-align: center; margin: 2rem 0; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; page-break-inside: avoid;">
  <p style="margin-bottom: 1rem; font-weight: bold; color: #475569;">Scannez ce QR Code pour accéder à la version interactive :</p>
  <img src="${qrDataUrl}" alt="QR Code vers ${courseUrl}" style="width: 150px; height: 150px; margin: 0 auto;" />
  <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #64748b;">${courseUrl}</p>
</div>
`;
      replacements.push({ original: originalTag, replacement });
    } else if (src.startsWith('./assets/')) {
      // Fix relative paths for static images
      const absoluteSrc = path.join(COURSES_DIR, courseSlug.split('/')[0], src.replace('./', ''));
      // Convert to file:// URL for md-to-pdf
      const fileUrl = `file://${absoluteSrc}`;
      replacements.push({ original: originalTag, replacement: originalTag.replace(src, fileUrl) });
    }
  }

  const sqlRegex = /<svg[\s\S]*?<\/svg>/g;
  while ((match = sqlRegex.exec(processedContent)) !== null) {
    const originalTag = match[0];
    const courseUrl = `${APP_URL}/cours/${courseSlug}`;
    const qrDataUrl = await generateQRCode(courseUrl);
      
    const replacement = `
<div style="text-align: center; margin: 2rem 0; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; page-break-inside: avoid;">
  <p style="margin-bottom: 1rem; font-weight: bold; color: #475569;">[Animation Vectorielle Interactive]</p>
  <p style="margin-bottom: 1rem; font-size: 0.9em; color: #64748b;">Scannez ce QR Code pour visionner l'animation détaillée sur la version Web :</p>
  <img src="${qrDataUrl}" alt="QR Code vers ${courseUrl}" style="width: 150px; height: 150px; margin: 0 auto; display: block;" />
  <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #64748b;">${courseUrl}</p>
</div>
`;
    replacements.push({ original: originalTag, replacement });
  }

  for (const { original, replacement } of replacements) {
    processedContent = processedContent.replace(original, replacement);
  }

  return processedContent;
}

async function main() {
  console.log('Starting PDF generation...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = getAllMarkdownFiles(COURSES_DIR);
  const courses: CourseMeta[] = [];

  for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const { data, content } = matter(fileContent);
    
    if (data.title && data.level) {
      courses.push({
        title: data.title,
        level: data.level,
        subLevel: data.subLevel,
        order: data.order || 999,
        filePath: file,
        content: content
      });
    }
  }

  // Sort courses
  courses.sort((a, b) => {
    if (a.level !== b.level) return a.level.localeCompare(b.level);
    if (a.subLevel !== b.subLevel) return (a.subLevel || '').localeCompare(b.subLevel || '');
    return a.order - b.order;
  });

  let fullMarkdown = `---
title: "Maths App - Curriculum"
author: "Maths App"
---

# Table des matières
`;

  // Generate TOC
  let currentLevel = '';
  let currentSubLevel = '';

  for (const course of courses) {
    if (course.level !== currentLevel) {
      currentLevel = course.level;
      fullMarkdown += `\n## ${currentLevel.replace('_', ' ')}\n`;
    }
    if (course.subLevel && course.subLevel !== currentSubLevel) {
      currentSubLevel = course.subLevel;
      fullMarkdown += `### ${currentSubLevel.replace('_', ' ')}\n`;
    }
    fullMarkdown += `- [${course.title}](#${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')})\n`;
  }

  fullMarkdown += '\n<div style="page-break-after: always;"></div>\n\n';

  // Concatenate content
  for (const course of courses) {
    console.log(`Processing: ${course.title}`);
    const relativePath = path.relative(COURSES_DIR, course.filePath);
    const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
    
    const processedContent = await processContent(course.content, slug);
    
    fullMarkdown += `\n<div style="page-break-before: always;"></div>\n\n`;
    fullMarkdown += `# ${course.title}\n\n`;
    fullMarkdown += processedContent;
    fullMarkdown += `\n\n`;
  }

  const tempMdPath = path.join(OUTPUT_DIR, 'book.md');
  fs.writeFileSync(tempMdPath, fullMarkdown);
  console.log(`Generated concatenated markdown at ${tempMdPath}`);

  console.log('Converting to PDF...');
  try {
    const pdf = await mdToPdf(
      { path: tempMdPath },
      {
        dest: path.join(OUTPUT_DIR, 'book.pdf'),
        css: `
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
          h1, h2, h3 { color: #1e293b; }
          h1 { border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 2rem; }
          img { max-width: 100%; height: auto; border-radius: 8px; }
          pre { background-color: #f8fafc; padding: 1rem; border-radius: 8px; overflow-x: auto; }
          code { font-family: 'Courier New', Courier, monospace; background-color: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; }
          blockquote { border-left: 4px solid #cbd5e1; padding-left: 1rem; color: #64748b; font-style: italic; }
          .math { overflow-x: auto; }
        `,
        pdf_options: {
          format: 'A4',
          margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; color: #94a3b8;">Maths App - Curriculum</div>',
          footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%; color: #94a3b8;">Page <span class="pageNumber"></span> sur <span class="totalPages"></span></div>'
        },
        launch_options: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    );
    console.log(`Successfully generated PDF at ${pdf.filename}`);
  } catch (err) {
    console.error('Error generating PDF:', err);
  }
}

main().catch(console.error);
