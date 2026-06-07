export type Level = 'Primaire' | 'College' | 'Lycee' | 'Post_Bac';

export interface Course {
  id: string;
  title: string;
  level: Level;
  subLevel?: string; // e.g., 'Seconde', 'Premiere', 'Terminale'
  order?: number;
  content: string; // Markdown content
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Quiz {
  courseId: string;
  questions: QuizQuestion[];
}
