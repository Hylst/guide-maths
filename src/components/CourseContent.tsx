import React, { Suspense } from "react";
import { Loader2, Printer, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

import { Course } from "../types";
import { CourseRegistry } from "../courses/CourseRegistry";
import { InteractiveRegistry } from "./interactive/InteractiveRegistry";
import MiniQuiz from "./interactive/MiniQuiz";
import { CourseHeader, CourseContext } from "./SharedUI";

import "katex/dist/katex.min.css";

interface CourseContentProps {
  course: Course;
  activeCourseContent: any;
  isLoadingCurrentCourse: boolean;
  onQuizComplete: (score: number, total: number) => void;
  courseProgress: any;
  onValidateCourse: () => void;
}

export default function CourseContent({
  course,
  activeCourseContent,
  isLoadingCurrentCourse,
  onQuizComplete,
  courseProgress,
  onValidateCourse,
}: CourseContentProps) {
  if (isLoadingCurrentCourse) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-text">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p>Chargement du contenu...</p>
      </div>
    );
  }

  const isCompleted = courseProgress?.completed;

  const handleValidation = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4f46e5", "#10b981", "#f59e0b", "#ec4899"],
      });
      onValidateCourse();
    }
  };

  const Component = CourseRegistry[course.id] as React.ElementType;

  const breadcrumb = (
    <div className="flex items-center justify-between text-sm font-medium text-muted-text tracking-wide mb-8 bg-muted/20 p-3 rounded-2xl border border-border-strong/50 no-print">
      <div className="flex items-center overflow-x-auto whitespace-nowrap">
        <span className="uppercase text-xs tracking-widest text-primary/80">
          {course.level.replace("_", " ")}
        </span>
        <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
        <span className="uppercase text-xs tracking-widest">
          {course.subLevel?.replace("_", " ") || "Général"}
        </span>
        <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
        <span className="truncate max-w-[200px] sm:max-w-xs text-foreground/80">
          {course.title
            .replace(/Chapitre \d+ : /, "")
            .replace(/Thème : /, "")
            .replace(/Maths Expertes - Chapitre \d+ : /, "")}
        </span>
      </div>
      <button
        id="course-print-pdf"
        onClick={() => {
          window.print();
        }}
        className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-extrabold text-2xs truncate tracking-wider rounded-xl transition-all shadow-sm shrink-0 border border-indigo-500/10 hover:border-indigo-500/20 cursor-pointer"
        title="Imprimer / Télécharger en PDF épuré"
      >
        <Printer className="w-3.5 h-3.5" /> PDF
      </button>
    </div>
  );

  if (Component) {
    return (
      <CourseContext.Provider value={course}>
        <div className="min-h-screen max-w-6xl mx-auto">
          {breadcrumb}
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
                <p className="font-medium text-lg">
                  Chargement du module interactif...
                </p>
              </div>
            }
          >
            <Component
              onValidateCourse={handleValidation}
              isCompleted={isCompleted}
              courseProgress={courseProgress}
            />
          </Suspense>
        </div>
      </CourseContext.Provider>
    );
  }

  if (!activeCourseContent) {
    return (
      <div className="text-center text-red-500 p-8">
        Erreur lors du chargement du cours.
      </div>
    );
  }

  const isQuizPerfect =
    courseProgress?.quizScore?.score !== undefined &&
    courseProgress?.quizScore?.score === courseProgress?.quizScore?.total;
  const hasQuiz = !!activeCourseContent.quiz;

  const canValidate = isQuizPerfect || !hasQuiz;

  let rawMarkdown = activeCourseContent.content || '';
  
  // Extract info for CourseHeader
  const niveauMatch = rawMarkdown.match(/\*\*Niveau\*\*\s*:\s*(.+)$/m);
  const preMatch = rawMarkdown.match(/\*\*Prérequis\*\*\s*:\s*(.+)$/m);
  
  let objectivesList: string[] | undefined;
  const objStartMatch = rawMarkdown.match(/\*\*Objectifs\*\*\s*:/);
  if (objStartMatch) {
    const startIdx = objStartMatch.index! + objStartMatch[0].length;
    let endIdx = rawMarkdown.indexOf('---', startIdx);
    if (endIdx === -1) endIdx = rawMarkdown.length;
    const objText = rawMarkdown.substring(startIdx, endIdx);
    objectivesList = objText.split('\n')
      .map(l => l.trim())
      .filter(l => l.startsWith('-'))
      .map(l => l.replace(/^-\s*/, '').trim());
    rawMarkdown = rawMarkdown.substring(0, objStartMatch.index!) + rawMarkdown.substring(endIdx);
  }

  const levelText = niveauMatch ? niveauMatch[1].trim() : undefined;
  const prerequisitesText = preMatch ? [preMatch[1].trim()] : undefined;

  if (niveauMatch) rawMarkdown = rawMarkdown.replace(niveauMatch[0], '');
  if (preMatch) rawMarkdown = rawMarkdown.replace(preMatch[0], '');
  
  const titleMatch = rawMarkdown.match(/^#\s+(.+)$/m);
  let pageTitle = course.title;
  if (titleMatch) {
    pageTitle = titleMatch[1];
    rawMarkdown = rawMarkdown.replace(titleMatch[0], '');
  }

  // Remove empty lines at the very beginning resulting from the trims
  rawMarkdown = rawMarkdown.replace(/^\s+/, '');

  // Regex rules to fix dark mode on legacy Markdown contents
  rawMarkdown = rawMarkdown
    .replace(/bg-white/g, 'bg-card')
    .replace(/bg-slate-50/g, 'bg-slate-50 dark:bg-slate-800') // keeping some variation
    .replace(/text-slate-800/g, 'text-foreground')
    .replace(/text-slate-700/g, 'text-muted-text')
    .replace(/text-blue-800/g, 'text-blue-600 dark:text-blue-300')
    .replace(/text-sky-500/g, 'text-sky-600 dark:text-sky-400')
    .replace(/bg-sky-500/g, 'bg-sky-500 text-white')
    .replace(/border-slate-100/g, 'border-border-strong')
    .replace(/border-slate-200/g, 'border-border-strong')
    .replace(/shadow-indigo-100/g, 'shadow-indigo-500/10')
    .replace(/background:\s*#e2e8f0;?/g, 'background: var(--faq-bg); border: 1px solid var(--border-strong);');

  return (
    <CourseContext.Provider value={course}>
      <div className="max-w-6xl mx-auto">
        {breadcrumb}

        <CourseHeader 
          acronym={`${course.level.substring(0,3).toUpperCase()}-${course.subLevel || 'GEN'}`}
          title={pageTitle}
          level={levelText}
          prerequisites={prerequisitesText}
          objectives={objectivesList}
        />

        <div className="bg-card p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-strong relative overflow-hidden">
          {/* Subtle top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-80" />

          <div
            className="prose prose-slate max-w-none 
                          prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-foreground
                          prose-h1:text-4xl prose-h1:tracking-tighter prose-h1:mb-8
                          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border-strong
                          prose-p:leading-relaxed prose-p:text-muted-text prose-p:mb-6
                          prose-a:text-primary hover:prose-a:text-primary-hover prose-a:font-medium
                          prose-strong:text-foreground
                          prose-ul:text-muted-text prose-li:marker:text-primary
                          prose-td:border-border-strong prose-th:border-border-strong
                          prose-img:rounded-2xl prose-img:shadow-sm"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              components={{
                img: ({ node, ...props }) => {
                  let src = props.src || "";
                  const filename = src.split("/").pop();

                  // Check if we have an interactive component for this SVG
                  if (filename && InteractiveRegistry[filename]) {
                    const InteractiveComponent = InteractiveRegistry[filename];
                    return <InteractiveComponent alt={props.alt} />;
                  }

                  // Fallback to static image
                  if (src.startsWith("./assets/")) {
                    // Extract the directory of the current course
                    const courseDir = course.id.substring(
                      0,
                      course.id.lastIndexOf("/"),
                    );
                    src = `${courseDir}/${src.replace("./", "")}`;
                  }
                  return (
                    <img
                      {...props}
                      src={src}
                      className="rounded-xl shadow-md border border-border-strong my-8 w-full max-w-2xl mx-auto bg-card"
                      alt={props.alt || ""}
                    />
                  );
                },
                details: ({ node, className, ...props }) => (
                  <details className="mt-6 mb-8 p-6 border border-border-strong rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 shadow-sm transition-all open:bg-card open:shadow-md" {...props} />
                ),
                summary: ({ node, className, ...props }) => (
                  <summary className="cursor-pointer font-bold text-lg text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl" {...props} />
                ),
              }}
            >
              {rawMarkdown}
            </ReactMarkdown>
          </div>
        </div>

        {activeCourseContent.quiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <MiniQuiz
              questions={activeCourseContent.quiz}
              courseTitle={course.title}
              onComplete={onQuizComplete}
            />
          </motion.div>
        )}

        {/* Validation Checklist / Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 p-8 rounded-[2rem] border-2 transition-all duration-300 ${isCompleted ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800" : "bg-card border-border-strong"}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col flex-1">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Sparkles
                  className={`w-6 h-6 ${isCompleted ? "text-emerald-500" : "text-amber-500"}`}
                />
                Validation du Chapitre
              </h3>

              {activeCourseContent.checklist &&
                activeCourseContent.checklist.length > 0 && (
                  <div className="mb-6 space-y-3 bg-background/50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Checklist des Essentiels :
                    </h4>
                    <ul className="space-y-2">
                      {activeCourseContent.checklist.map(
                        (item: string, idx: number) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 text-sm ${isCompleted ? "text-foreground font-medium" : "text-muted-text"} transition-colors`}
                          >
                            <div
                              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                                isCompleted
                                  ? "bg-emerald-500 border-emerald-500"
                                  : "border-border-strong bg-card"
                              }`}
                            >
                              {isCompleted && (
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

              <p className="text-muted-text text-sm">
                {isCompleted
                  ? "Bravo ! Tu as maîtrisé ce chapitre et gagné 15 XP."
                  : "Réussis le quiz à 100% pour débloquer la validation et gagner 15 XP."}
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={handleValidation}
                disabled={isCompleted || !canValidate}
                className={`flex items-center gap-2 px-8 py-5 rounded-xl font-bold text-lg transition-all duration-200 w-full md:w-auto justify-center ${
                  isCompleted
                    ? "bg-emerald-500 text-white cursor-default shadow-lg shadow-emerald-500/20"
                    : canValidate
                      ? "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 hover:-translate-y-1"
                      : "bg-muted text-muted-text cursor-not-allowed"
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Chapitre Validé
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Valider (+15 XP)
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </CourseContext.Provider>
  );
}
