import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { extractTextFromNode } from '../utils/extractText';

interface MathProps {
  children?: React.ReactNode;
  math?: string;
  block?: boolean;
}

export const MathComponent: React.FC<MathProps> = ({ children, math, block = false }) => {
  const text = math || extractTextFromNode(children);
  
  if (!text) return null;

  try {
    const html = katex.renderToString(text, {
      displayMode: block,
      throwOnError: false,
      strict: false,
      trust: true
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} className={block ? 'katex-display-wrapper' : ''} />;
  } catch (error) {
    console.error("KaTeX failed to render:", error);
    return <span>{text}</span>;
  }
};
