import React, { useEffect, useRef } from 'react';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';

interface MathContainerProps {
  children: React.ReactNode;
}

export const MathContainer: React.FC<MathContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let fallbackTimeout: ReturnType<typeof setTimeout>;

    const renderMath = () => {
      if (containerRef.current) {
        if (observer) observer.disconnect();
        try {
          renderMathInElement(containerRef.current, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false,
            output: 'html'
          });
        } catch (e) {
          console.error('KaTeX auto-render error:', e);
        }
        if (observer) {
          observer.observe(containerRef.current, { 
            childList: true, 
            subtree: true,
            characterData: true
          });
        }
      }
    };

    observer = new MutationObserver((mutations) => {
      let shouldRender = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as HTMLElement;
              if (el.classList && !el.classList.contains('katex') && !el.closest('.katex')) {
                shouldRender = true;
                break;
              }
            } else if (node.nodeType === Node.TEXT_NODE) {
              // Wait, a text node being modified might be Katex trying to edit stuff? No.
              // We should only render on text node change if parent is not katex
              const parent = node.parentElement;
              if (parent && parent.classList && !parent.classList.contains('katex') && !parent.closest('.katex')) {
                 shouldRender = true;
                 break;
              }
            }
          }
        } else if (mutation.type === 'characterData') {
           const parent = mutation.target.parentElement;
           if (parent && parent.classList && !parent.classList.contains('katex') && !parent.closest('.katex')) {
              shouldRender = true;
           }
        }
        if (shouldRender) break;
      }
      
      if (shouldRender) {
        // Debounce rendering to avoid loops and performance issues during heavy typing/updates
        clearTimeout(fallbackTimeout);
        fallbackTimeout = setTimeout(() => {
          requestAnimationFrame(renderMath);
        }, 50);
      }
    });

    // Initial render
    clearTimeout(fallbackTimeout);
    fallbackTimeout = setTimeout(() => {
      requestAnimationFrame(renderMath);
    }, 50);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(fallbackTimeout);
    };
  }, [children]);

  return <div ref={containerRef} className="math-container relative w-full h-full">{children}</div>;
};