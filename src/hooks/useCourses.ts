import { useState, useEffect } from 'react';
import { Course, Level } from '../types';
import coursesIndex from '../data/courses_index.json';
import { CourseRegistry } from '../courses/CourseRegistry';

// Simple frontmatter parser to remove YAML block from content
function stripFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return match ? match[1].trim() : markdown;
}

// Fix SVGs and their wrapper divs in markdown by removing blank lines and leading spaces so CommonMark treats them as a single HTML block
function fixSvgFormatting(markdown: string): string {
  // First fix SVGs
  let fixed = markdown.replace(/<svg[\s\S]*?<\/svg>/gi, (match) => {
    return match.replace(/^\s+/gm, '').replace(/^[\r\n]+/gm, '');
  });
  // Then fix wrapper divs containing SVGs
  fixed = fixed.replace(/<div[\s\S]*?<\/div>/gi, (match) => {
    if (match.includes('<svg')) {
      return match.replace(/^\s+/gm, '').replace(/^[\r\n]+/gm, '');
    }
    return match;
  });
  return fixed;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ParsedCourseContent {
  content: string;
  quiz: QuizQuestion[] | null;
  checklist: string[] | null;
}

export function parseInteractiveElementsFromMarkdown(markdown: string): ParsedCourseContent {
  let content = markdown;
  
  // 1. Parsing Checklist
  const checklistRegex = /\n*## ✅ Checklist des Essentiels \(Validation\)\n*([\s\S]*?)(?=\n*## |\n*---|\n*$)/;
  const checklistMatch = content.match(checklistRegex);
  let checklist: string[] | null = null;
  
  if (checklistMatch) {
    content = content.replace(checklistMatch[0], '');
    const items: string[] = [];
    const checklistLines = checklistMatch[1].split('\n');
    for (const line of checklistLines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- [')) {
        const itemText = trimmed.replace(/^- \[[ xX]\] /, '').trim();
        if (itemText) items.push(itemText);
      }
    }
    if (items.length > 0) checklist = items;
  }

  // 2. Parsing Quiz
  const quizSectionRegex = /\n*## 📝 Mini-Quiz(?: [&\w\s]+)?\n*([\s\S]*?)(?=\n*## |\n*---|\n*$)/i;
  const quizSectionMatch = content.match(quizSectionRegex);
  
  if (!quizSectionMatch) {
    return { content: content, quiz: null, checklist };
  }

  content = content.replace(quizSectionMatch[0], '');
  const quizText = quizSectionMatch[1];
  const questions: QuizQuestion[] = [];
  
  const questionBlocks = quizText.split(/(?=\*\*Question \d+ :)/).filter(Boolean);
  
  for (const block of questionBlocks) {
    const lines = block.trim().split('\n');
    const questionMatch = lines[0].match(/\*\*Question \d+ : (.*?)\*\*/);
    if (!questionMatch) continue;
    
    const question = questionMatch[1];
    const options: string[] = [];
    let correctAnswerIndex = 0;
    let explanation = '';
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- [')) {
        const isCorrect = line.startsWith('- [x]') || line.startsWith('- [X]');
        const optionText = line.replace(/^- \[[ xX]\] /, '');
        options.push(optionText);
        if (isCorrect) correctAnswerIndex = options.length - 1;
      } else if (line.startsWith('> **Explication :**')) {
        explanation = line.replace('> **Explication :**', '').trim();
      }
    }
    
    if (options.length > 0) {
      questions.push({ question, options, correctAnswerIndex, explanation });
    }
  }

  // Clean up any trailing horizontal rules (---) or consecutive horizontal rules left over
  content = content.trim();
  content = content.replace(/(\n\s*---\s*)+$/g, '');
  content = content.trim();
  
  return { 
    content: content, 
    quiz: questions.length > 0 ? questions : null,
    checklist
  };
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCourseContent, setActiveCourseContent] = useState<ParsedCourseContent | null>(null);
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  useEffect(() => {
    // Initialize courses from the pre-generated index
    const initialCourses: Course[] = coursesIndex.map((item: any) => ({
      id: item.id,
      title: item.title,
      level: item.level as Level,
      subLevel: item.subLevel,
      content: '', // Content is empty initially
      order: item.order
    }));
    
    setCourses(initialCourses);
    setLoading(false);
  }, []);

  // Function to load the content of a specific course
  const loadCourseContent = async (courseId: string): Promise<ParsedCourseContent | null> => {
    // If it's a native TSX component in our registry, bypass external fetch completely
    if (CourseRegistry[courseId]) {
      const emptyParsed = { content: '', quiz: null, checklist: null };
      setActiveCourseContent(emptyParsed);
      setLoadingCourseId(null);
      return emptyParsed;
    }

    setLoadingCourseId(courseId);
    try {
      // Fetch the markdown file directly since it's served as a static asset...
      const cachedCourseId = `${courseId}?t=${new Date().getTime()}`; // Avoid caching issues during dev
      const response = await fetch(cachedCourseId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const rawContent = await response.text();
      const cleanContent = stripFrontmatter(rawContent);
      const fixedContent = fixSvgFormatting(cleanContent);
      const parsed = parseInteractiveElementsFromMarkdown(fixedContent);
      
      setActiveCourseContent(parsed);
      setLoadingCourseId(null);
      return parsed;
    } catch (error) {
      console.error(`Failed to load course content for ${courseId}:`, error);
      setLoadingCourseId(null);
      return null;
    }
  };

  return { courses, loading, loadCourseContent, activeCourseContent, loadingCourseId };
}
