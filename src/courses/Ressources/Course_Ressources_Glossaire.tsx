import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';
import { 
  Search, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  RotateCcw, 
  GraduationCap, 
  CalendarDays, 
  FileQuestion,
  Lightbulb,
  Award
} from 'lucide-react';

import { GLOSSARY_ITEMS, GlossaryItem } from './GlossaireData';

const Course_Ressources_Glossaire: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLetter, setActiveLetter] = useState<string>('all');

  // --- HELPER FOR ACCENT NORMALIZATION (É -> E, Ô -> O, etc.) ---
  const getNormalizedFirstLetter = (term: string) => {
    const firstChar = term.trim().charAt(0).toUpperCase();
    return firstChar.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // --- RANDOM CONCEPT OF THE HOUR ---
  const [randomConcept, setRandomConcept] = useState<GlossaryItem>(() => {
    const dateIndex = new Date().getDate() % GLOSSARY_ITEMS.length;
    return GLOSSARY_ITEMS[dateIndex];
  });

  const rollNewRandomConcept = () => {
    const currentId = randomConcept.id;
    const candidates = GLOSSARY_ITEMS.filter(it => it.id !== currentId);
    const randomIndex = Math.floor(Math.random() * candidates.length);
    setRandomConcept(candidates[randomIndex]);
  };

  // --- INTERACTIVE TRIVIA QUIZ STATES ---
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [userGuessAnswers, setUserGuessAnswers] = useState<boolean[]>([]);

  // Choose a subset of glossary items with math formulas for the mini quiz
  const quizItems = useMemo(() => {
    // Return items that have a mathFormula, mixed up to test understanding
    return GLOSSARY_ITEMS.filter(it => !!it.mathFormula).slice(0, 5);
  }, []);

  const handleNextQuiz = (knewIt: boolean) => {
    if (knewIt) {
      setQuizScore(s => s + 1);
    }
    setUserGuessAnswers(prev => [...prev, knewIt]);

    if (quizIndex < quizItems.length - 1) {
      setQuizIndex(i => i + 1);
      setIsAnswerRevealed(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setIsAnswerRevealed(false);
    setQuizScore(0);
    setQuizCompleted(false);
    setUserGuessAnswers([]);
  };

  // --- FILTERED GLOSSARY TERMS ---
  const filteredTerms = useMemo(() => {
    return GLOSSARY_ITEMS.filter(item => {
      // 1. Search Query Match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const mainMatch = item.term.toLowerCase().includes(query) || 
                          item.definition.toLowerCase().includes(query) || 
                          item.example.toLowerCase().includes(query) ||
                          item.categoryLabel.toLowerCase().includes(query);
        if (!mainMatch) return false;
      }

      // 2. Category Tab Match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 3. First Letter Match (using the accent stabilization helper)
      if (activeLetter !== 'all') {
        const firstLetter = getNormalizedFirstLetter(item.term);
        if (firstLetter !== activeLetter) return false;
      }

      return true;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, activeCategory, activeLetter]);

  // Categories list definition
  const categoriesList = [
    { id: 'all', label: 'Tout le dictionnaire' },
    { id: 'analysis', label: 'Analyse & Fonctions' },
    { id: 'geometry', label: 'Géométrie & Repères' },
    { id: 'algebra', label: 'Algèbre & Arithmétique' },
    { id: 'proba_stats', label: 'Probas & Combinatoire' },
    { id: 'superior', label: 'Niveau Supérieur' }
  ];

  // Letters index present inside terms - Cleaned from accents
  const presentLetters = useMemo(() => {
    const letters = GLOSSARY_ITEMS.map(item => getNormalizedFirstLetter(item.term));
    return Array.from(new Set(letters)).sort();
  }, []);

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="RES-GLOS"
        title="Glossaire Mathématique"
        subtitle="Le dictionnaire de précision des concepts, théorèmes et définitions géométriques du collège aux classes préparatoires."
        duration="N/A"
      />

      {/* Intro info box */}
      <TipBanner 
        type="info"
        title="Précision sémantique et rigueur mathématique"
      >
        En mathématiques, les mots possèdent un sens univoque. Confondre une dérivée avec une primitive, ou l'abscisse avec l'ordonnée d'un vecteur, change l'intégralité d'un problème ! Utilise ce répertoire pour lever le moindre doute.
      </TipBanner>

      {/* Concept Aléatoire Interactive Drawer */}
      <div id="random-concept-drawer" className="bg-card border border-indigo-100 dark:border-indigo-900/30 rounded-3xl p-5 md:p-6 mb-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-stretch gap-6">
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 px-2 py-0.5 rounded-md inline-block mb-3">
              🎯 Zoom Concept
            </span>
            <h3 className="text-lg font-black text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              Focus Aléatoire
            </h3>
            <p className="text-xs text-muted-text mt-1.5 leading-relaxed">
              Laissez le hasard guider vos révisions. Piochez un mot-clé au hasard pour tester votre mémoire instantanée !
            </p>
          </div>
          <button
            id="roll-concept-btn"
            onClick={rollNewRandomConcept}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Tirer un autre concept
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2 gap-2">
              <h4 className="text-base font-black text-foreground">
                {randomConcept.term}
              </h4>
              <span className="text-[9px] uppercase font-mono text-indigo-600 font-extrabold bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                {randomConcept.categoryLabel}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              {randomConcept.definition}
            </p>
            {randomConcept.mathFormula && (
              <div className="mb-3 p-2 px-3 bg-muted dark:bg-slate-900/40 border border-border rounded-xl inline-flex items-center justify-center text-xs">
                <div className="font-bold text-indigo-700 dark:text-indigo-300">
                  <MathComponent math={randomConcept.mathFormula} />
                </div>
              </div>
            )}
          </div>
          <div className="pt-2.5 border-t border-border/40 text-xs text-muted-text flex items-start gap-1">
            <ChevronRight className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
            <span>
              <strong className="text-foreground">Exemple :</strong> {randomConcept.example}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Quick Trivia Quiz Block */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-[2rem] border border-indigo-700/40 p-6 md:p-8 text-white mb-10 shadow-xl relative overflow-hidden">
        {/* Background visual graphics shapes decoration */}
        <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20px] left-[10%] w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center border-b border-indigo-800/60 pb-3 mb-5">
          <span className="text-xs uppercase font-mono font-black text-indigo-300 tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-400 animate-bounce" /> Activité active de révision d'épreuves
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-400">
            Jeu-questionnaire éclair
          </span>
        </div>

        {!quizCompleted ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span className="font-bold flex items-center gap-1.5"><FileQuestion className="w-3.5 h-3.5 text-indigo-400" /> Devine le mot caché !</span>
              <span className="font-mono bg-indigo-900/50 border border-indigo-800 px-2.5 py-0.5 rounded font-bold">
                Question {quizIndex + 1} / {quizItems.length}
              </span>
            </div>

            <div className="p-5 bg-indigo-950/40 border border-indigo-800/40 rounded-2xl min-h-[90px] flex flex-col justify-center">
              <h4 className="text-sm font-light text-slate-100 italic leading-relaxed">
                " {quizItems[quizIndex].definition} "
              </h4>
            </div>

            {/* Hidden math formula trigger component clue */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-indigo-300 font-bold flex items-center gap-1"><Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Indice de Formule :</span>
              <div className="px-2 py-0.5 bg-slate-900/70 rounded-lg text-[11px] font-mono text-indigo-200 border border-indigo-800/50 inline-block">
                <MathComponent math={quizItems[quizIndex].mathFormula || ''} />
              </div>
            </div>

            {/* Answer Display segment */}
            {isAnswerRevealed ? (
              <div className="pt-3 border-t border-indigo-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fadeIn">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 font-black block">Le concept recherché était :</span>
                  <span className="text-xl font-black tracking-tight text-white">{quizItems[quizIndex].term}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNextQuiz(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold shadow-lg transition-all"
                  >
                    Je le savais ! (+1 point)
                  </button>
                  <button
                    onClick={() => handleNextQuiz(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all text-slate-300"
                  >
                    À revoir
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setIsAnswerRevealed(true)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 rounded-xl text-slate-950 text-xs font-black shadow-md transition-all self-center"
                >
                  👁️ Révéler le concept caché...
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-4 animate-fadeIn">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-1">
              <Award className="w-10 h-10 text-emerald-400 animate-pulse" />
            </div>
            <h3 className="text-xl font-black">Activité Terminée !</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Félicitations pour avoir révisé les définitions formelles du dictionnaire mathématique ! Votre score final :
            </p>
            <div className="text-3xl font-black font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900 w-32 mx-auto py-2 rounded-2xl">
              {quizScore} / {quizItems.length}
            </div>

            <div className="pt-2">
              <button
                onClick={restartQuiz}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white shadow flex items-center gap-1.5 mx-auto transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Recommencer l'activité
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEARCH AND FILTER INTERACTION SHELL */}
      <div className="bg-card border border-border-strong rounded-3xl p-5 shadow-sm mb-8 space-y-4">
        
        {/* Search Input Row */}
        <div className="relative w-full text-xs text-foreground bg-muted dark:bg-slate-900 rounded-2xl border border-border transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 flex items-center px-4 py-2">
          <Search className="w-4 h-4 text-muted-text flex-shrink-0 mr-3" />
          <input 
            type="text"
            placeholder="Rechercher une définition d'un concept précis (ex: gradient, convexité, vecteur...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 ring-0 focus:outline-none py-1.5 text-sm placeholder-muted-text/75"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors font-bold text-muted-text"
            >
              ×
            </button>
          )}
        </div>

        {/* Categories Tab navigation */}
        <div className="flex border-b border-border/70 overflow-x-auto hide-scrollbar p-0.5 gap-1.5 scroll-smooth">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveLetter('all'); // reset letter to allow broad view
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                  ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 shadow-sm' 
                  : 'text-muted-text hover:text-foreground hover:bg-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Letter jump index panel */}
        <div className="flex items-center flex-wrap gap-1.5 pt-1.5 border-t border-border/40 text-[11px] text-muted-text">
          <span className="font-bold mr-1 font-mono">Index Alphabétique :</span>
          <button
            onClick={() => setActiveLetter('all')}
            className={`w-6 h-6 rounded-lg text-center font-bold font-mono text-[10px] flex items-center justify-center transition-all ${
              activeLetter === 'all' ? 'bg-indigo-600 text-white' : 'hover:bg-muted text-muted-text hover:text-foreground'
            }`}
          >
            All
          </button>
          {presentLetters.map(letter => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`w-6 h-6 rounded-lg text-center font-bold font-mono text-[10px] flex items-center justify-center transition-all ${
                activeLetter === letter ? 'bg-indigo-600 text-white' : 'hover:bg-muted text-muted-text hover:text-foreground'
              }`}
            >
              {letter}
            </button>
          ))}
          <div className="ml-auto font-mono text-[10px] font-bold text-indigo-500">
            {filteredTerms.length} concept{filteredTerms.length > 1 ? 's' : ''} indexé{filteredTerms.length > 1 ? 's' : ''}
          </div>
        </div>

      </div>

      {/* GLOSSARY LIST DISPLAY */}
      <div className="space-y-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((item) => (
            <div 
              key={item.id}
              className="bg-card border border-border-strong rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
            >
              {/* Category label indicator flag top right */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 px-2.5 py-0.5 rounded-full">
                  {item.categoryLabel}
                </span>
                <span className="text-[11px] font-mono text-muted-text/80 font-bold uppercase">
                  Lettrine {item.term.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Term Title */}
              <h3 className="text-base md:text-lg font-black text-foreground mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                {item.term}
              </h3>

              {/* Definition text */}
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {item.definition}
              </p>

              {/* Latex formula inside definition box if present */}
              {item.mathFormula && (
                <div className="mb-4 p-3 bg-muted dark:bg-slate-900/40 border border-border rounded-xl inline-flex self-start items-center justify-center text-xs overflow-x-auto max-w-full">
                  <div className="font-bold text-indigo-700 dark:text-indigo-300">
                    <MathComponent math={item.mathFormula} />
                  </div>
                </div>
              )}

              {/* Example box bottom */}
              <div className="pt-2.5 border-t border-border/40 flex items-start gap-1.5 text-xs text-muted-text">
                <ChevronRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-serif">
                  <strong className="text-foreground font-sans">Exemple :</strong> {item.example}
                </span>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-card border border-dashed border-border-strong rounded-2xl flex flex-col items-center justify-center space-y-3">
            <span className="text-2xl">🔍</span>
            <h4 className="font-bold text-foreground">Aucun concept trouvé</h4>
            <p className="text-xs text-muted-text max-w-xs">
              Nous n'avons trouvé aucun terme correspondant aux filtres actifs. Modifiez votre recherche ou effacez l'index ci-dessus.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveLetter('all');
              }}
              className="px-4 py-1.5 bg-muted hover:bg-slate-200 border rounded-lg text-xs font-bold transition-all text-foreground"
            >
              Effacer tous les filtres
            </button>
          </div>
        )}
      </div>

      {/* Extra Tip Banner */}
      <div className="mt-12">
        <InfoBlock type="reminder" title="Indexation ouverte aux suggestions">
          Un mot manque dans ce dictionnaire de mathématiques ? Note-le pour ton prochain cours afin que nous puissions l'ajouter avec sa formule correspondante dans les prochaines mises à jour.
        </InfoBlock>
      </div>

    </div>
  );
};

export default Course_Ressources_Glossaire;
