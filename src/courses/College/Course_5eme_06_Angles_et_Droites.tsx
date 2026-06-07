import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, StepList, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_06_Angles_et_Droites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Transversal angle slider state
  const [angleSlider, setAngleSlider] = useState<number>(60);
  // Checked is parallel, unchecked is skewed
  const [isParallel, setIsParallel] = useState<boolean>(true);

  const angle1 = angleSlider;
  const angle2 = isParallel ? angle1 : angle1 - 15;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-ANGL"
        title="Angles et Droites"
        subtitle="Le Choc des Épées : Dompter les angles alternes-internes et correspondants, secrets des parallèles."
        duration="45 min"
        level="5ème Collège"
        prerequisites={["Mesurer un angle au rapporteur", "Notion de droites parallèles"]}
        objectives={[
          "Utiliser les propriétés des angles opposés par le sommet",
          "Identifier des angles alternes-internes et correspondants",
          "Déterminer des mesures d'angles formés par des parallèles et une sécante",
          "Démontrer que deux droites sont (ou ne sont pas) parallèles"
        ]}
      />

      <Section title="⚔️ Le Sommet et les Opposés" icon="💥" color="rose">
        <p className="lead text-lg">
          Dès que deux droites se croisent (on les appelle des droites <strong>sécantes</strong>), un point d'intersection apparaît, formant un X parfait.
        </p>
        <p className="mt-4">
          C'est là qu'intervient la première règle absolue de la géométrie des angles.
        </p>

        <InfoBlock type="definition" title="Opposés par le Sommet">
          Deux angles formés par deux droites sécantes sont dits <strong>opposés par le sommet</strong> s'ils ont le même sommet et si leurs côtés sont dans le prolongement l'un de l'autre (dos à dos).
          <br/><br/>
          <strong>Règle d'or :</strong> Deux angles opposés par le sommet sont <strong>toujours strictement égaux</strong> !
        </InfoBlock>
      </Section>

      <Section title="🌉 L'Arrivée de la Sécante (Les 8 Clones)" icon="🗡️" color="indigo">
        <p>
          Si nous prenons deux droites différentes et que nous les coupons d'un coup de sabre par une troisième droite appelée <strong>la sécante</strong>, 8 angles sont formés en tout.
        </p>
        <p className="mt-2 font-medium">
          On regroupe ces angles par paires de jumeaux géométriques selon deux dispositions fondamentales :
        </p>

        {/* Visual interactive diagram showing angle types dynamically */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm text-center">
          <h4 className="font-bold text-lg mb-2 text-indigo-800 dark:text-indigo-400">Interactif : Droites et Sécante</h4>
          <p className="text-sm text-slate-500 mb-4">Ajuste l'orientation de la sécante et change l'alignement des droites.</p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span>Angle de la sécante :</span>
                <input 
                  type="range" 
                  min="40" 
                  max="80" 
                  value={angleSlider} 
                  onChange={(e) => setAngleSlider(parseInt(e.target.value))}
                  className="w-32 accent-indigo-600"
                />
                <span>{angleSlider}°</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200">
                <input 
                  type="checkbox" 
                  checked={isParallel} 
                  onChange={() => setIsParallel(!isParallel)}
                  className="accent-emerald-500 w-4 h-4"
                />
                <span>Droites de base Parallèles ({isParallel ? 'Oui ✅' : 'Non ❌'})</span>
              </label>
            </div>

            <svg className="w-full max-w-lg h-60 border border-slate-100 rounded-2xl bg-slate-50 dark:bg-slate-900" viewBox="0 0 400 240">
              {/* Grid Background */}
              <defs>
                <pattern id="grid-ang" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800" />
                </pattern>
                {/* Marker arrows */}
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                </marker>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-ang)" />

              {/* Angle Sectors highlighting Alternes-Internes */}
              {/* Intersection 1 (x: 200, y: 70) */}
              <path d={`M 200 70 L ${200 + 35 * Math.cos((180 - angle1) * Math.PI / 180)} ${70 + 35 * Math.sin((180 - angle1) * Math.PI / 180)} A 35 35 0 0 1 ${200 - 35} 70 Z`} fill="#f43f5e" fillOpacity="0.15" />
              <path d={`M 200 70 L ${200 + 35} 70 A 35 35 0 0 1 ${200 + 35 * Math.cos((180 - angle1) * Math.PI / 180)} ${70 + 35 * Math.sin((180 - angle1) * Math.PI / 180)} Z`} fill="#a855f7" fillOpacity="0.15" />
              
              {/* Intersection 2 (x: 200, y: 170) */}
              <path d={`M 200 170 L ${200 - 35} 170 A 35 35 0 0 1 ${200 - 35 * Math.cos(angle2 * Math.PI / 180)} ${170 - 35 * Math.sin(angle2 * Math.PI / 180)} Z`} fill="#a855f7" fillOpacity={isParallel ? 0.15 : 0.05} />
              <path d={`M 200 170 L ${200 - 35 * Math.cos(angle2 * Math.PI / 180)} ${170 - 35 * Math.sin(angle2 * Math.PI / 180)} A 35 35 0 0 1 ${200 + 35} 170 Z`} fill="#f43f5e" fillOpacity="0.15" />

              {/* Line 1 (Top) */}
              <line x1="40" y1="70" x2="360" y2="70" stroke="#475569" strokeWidth="3" />
              <text x="340" y="60" className="text-xs font-mono font-bold" fill="#475569">(d1)</text>

              {/* Line 2 (Bottom - skewed if not parallel) */}
              {isParallel ? (
                <line x1="40" y1="170" x2="360" y2="170" stroke="#475569" strokeWidth="3" />
              ) : (
                <line x1="40" y1="150" x2="360" y2="190" stroke="#475569" strokeWidth="3" />
              )}
              <text x="340" y="210" className="text-xs font-mono font-bold" fill="#475569">(d2)</text>

              {/* Transversal Sécante Line */}
              {/* Line passing through (200,70) and (200,170) with angle. Line equation d: y-y0 = m(x-x0) */}
              <line x1={200 - 150 * Math.cos(angleSlider * Math.PI / 180)} y1={120 - 150 * Math.sin(angleSlider * Math.PI / 180)} x2={200 + 150 * Math.cos(angleSlider * Math.PI / 180)} y2={120 + 150 * Math.sin(angleSlider * Math.PI / 180)} stroke="#2563eb" strokeWidth="2.5" />
              <text x="310" y="235" className="text-xs font-mono font-bold" fill="#2563eb">(Sécante)</text>

              {/* Angle labels */}
              <text x="140" y="88" className="text-xs font-bold font-mono" fill="#e11d48">{angle1}°</text>
              <text x="245" y="160" className="text-xs font-bold font-mono" fill="#d01c45">{angle2}°</text>
              
              <text x="220" y="90" className="text-xs font-bold font-mono" fill="#7c3aed">Alterne ({180 - angle1}°)</text>
              <text x="120" y="155" className="text-xs font-bold font-mono" fill="#7c3aed">Alterne ({180 - angle2}°)</text>
            </svg>
            <p className="text-xs font-medium text-slate-500">
              {isParallel 
                ? "Comme (d1) // (d2), l'angle Alterne-Interne rose de gauche et l'angle de droite sont parfaitement égaux : les valeurs correspondent !" 
                : "Les droites ne sont pas parallèles : observe les décalages de mesures !"}
            </p>
          </div>
        </div>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">1. Les angles Alternes-Internes (Le Z)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Deux angles sont alternes-internes s'ils sont situés de part et d'autre de la sécante (alternés) et entre les deux droites (internes).
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-emerald-700 dark:text-emerald-300">2. Les angles Correspondants (Le F)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Deux angles sont dits correspondants s'ils sont situés du même côté de la sécante, l'un à l'intérieur, l'autre à l'extérieur des deux premières droites, et s'ils occupent des positions analogues.
            </p>
          </div>
        </StepList>
      </Section>

      <Section title="🕊️ La Magie Ultime du Parallélisme" icon="🪄" color="purple">
        <p className="mb-4">
          Ces noms d'angles prennent tout leur sens géométrique grâce aux relations fondamentales suivantes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-purple-50/50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800/60 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2 uppercase tracking-wide">La Règle Directe</h3>
            <p className="text-purple-950 dark:text-purple-50 font-medium">
              <strong>SI</strong> deux droites parallèles sont coupées par une sécante... <br/><br/>
              <strong>ALORS</strong> les angles alternes-internes et correspondants ainsi formés sont <strong>strictement égaux deux à deux</strong>.
            </p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-2 uppercase tracking-wide">La Règle Réciproque (Preuve)</h3>
            <p className="text-emerald-950 dark:text-emerald-50 font-medium">
              <strong>SI</strong> une sécante découpe deux paires d'angles alternes-internes ou correspondants de mesures égales... <br/><br/>
              <strong>ALORS</strong> les deux droites d'origines sont <strong>parfaitement parallèles</strong>.
            </p>
          </div>
        </div>

        <TipBanner type="warning" title="Rappel de cours">
          Deux angles sont supplémentaires si la somme de leurs mesures fait exactement <strong>$180^\circ$</strong> (ils forment un angle plat). C'est essentiel pour déduire toutes les mesures autour de l'intersection de droites sécantes !
        </TipBanner>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Comment s'appellent les angles dont la somme fait $180^\circ$ ?</>}
            back={<>On les appelle des angles <strong>supplémentaires</strong>.</>}
          />
          <Flashcard 
            front={<>Si 2 droites parallèles sont coupées par une sécante, comment sont ses angles correspondants ?</>}
            back={<>Ils sont <strong>strictement égaux deux à deux</strong>.</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Trouver l'angle manquant"
          question="Soient deux droites d et d' parallèles coupées par une sécante. Un des angles alternes-internes mesure 72°. Combien mesure l'autre ?"
          steps={[
            "J'identifie les données fournies : les droites de base sont parallèles et on s'intéresse à des angles alternes-internes.",
            "J'applique le théorème fondamental du cours : 'Si deux droites parallèles sont coupées par une sécante, alors ses angles alternes-internes sont de même mesure'.",
            "J'en déduis immédiatement que l'angle manquant mesure lui aussi exactement <strong>72°</strong>."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Prouver le parallélisme"
          question="Une sécante coupe deux droites d1 et d2. Deux angles correspondants mesurent respectivement 58° et 59°. d1 et d2 sont-elles parallèles ?"
          steps={[
            "J'analyse les conditions fournies par l'énoncé : on me donne deux valeurs d'angles correspondants, à savoir 58° et 59°.",
            "Pour que deux droites soient parallèles, les angles correspondants formés par une sécante transversale doivent obligatoirement être de mesures égales.",
            "Or 58° ≠ 59°. J'en conclus de manière indiscutable que les deux droites d1 et d2 ne sont pas parallèles."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi parle-t-on d'angles complémentaires ?",
              answer: "Des angles sont dits complémentaires si la somme de leurs mesures fait exactement 90° (ils forment un angle droit). Ne pas confondre avec supplémentaires (180°) !"
            },
            {
              question: "Comment repérer facilement des angles alternes-internes ?",
              answer: "Pense au motif dessiné par la lettre 'Z'. Les angles situés dans les creux intérieurs de la lettre 'Z' (droite ou inversée) sont des angles alternes-internes."
            },
            {
              question: "Deux droites perpendiculaires à une même troisième sont-elles parallèles ?",
              answer: "Oui, tout à fait ! C'est une grande propriété géométrique, qui se démontre car les angles alternes-internes formés par la sécante font tous deux 90°, et sont donc égaux."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Test du Vrai/Faux" icon="🕹️" color="emerald">
        <p className="mb-4">Complète la logique géométrique !</p>
        <FillInTheBlanks 
          id="ang-eval"
          content={[
            "Deux angles qui forment une croix (X) et se tournent le dos sont dits 'opposés par le sommet'. Ceux-là sont ",
            { options: ["parfois égaux", "toujours égaux", "jamais égaux"], correctAnswer: 1 },
            ". S'il y a 2 lignes quelconques traversées par une sécante, les angles alternes-internes qu'on forme ",
            { options: ["sont directement égaux", "ne sont PAS FORCÉMENT égaux"], correctAnswer: 1 },
            ". Mais si on ajoute la grande condition d'avoir deux droites strictement ",
            { options: ["sécantes", "perpendiculaires", "parallèles"], correctAnswer: 2 },
            ", alors OUI, la magie opère et les alternes-internes deviennent ",
            { options: ["différents", "strictement égaux", "de 90 degrés"], correctAnswer: 1 },
            " ! C'est ce qui nous permet aussi de tester si des droites sont parallèles ou non."
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Deux droites sécantes forment deux angles opposés par le sommet. Si l'un des deux angles fait 130°, combien fait l'autre ?",
              options: [
                "130°",
                "50°",
                "90°"
              ],
              correctAnswer: 0,
              explanation: "Les angles opposés par le sommet sont toujours de même mesure !"
            },
            {
              question: "Quelle forme de lettre permet de repérer graphiquement les angles correspondants ?",
              options: [
                "Un 'Z'",
                "Un 'F'",
                "Un 'X'"
              ],
              correctAnswer: 1,
              explanation: "La lettre 'F' permet d'identifier visuellement les angles correspondants (l'un à l'intérieur, l'autre à l'extérieur, situés du même côté de la sécante)."
            },
            {
              question: "Si la somme de deux angles fait 180°, ils sont dits :",
              options: [
                "Complémentaires",
                "Supplémentaires",
                "Sécants"
              ],
              correctAnswer: 1,
              explanation: "Deux angles de somme égale à 180° sont dits supplémentaires (ils forment un angle plat)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que les angles opposés par le sommet sont TOUJOURS égaux.",
            "Je peux reconnaître sur un dessin une paire d'angles Alternes-Internes (le Z) et Correspondants (le F).",
            "Je sais que SI et seulement SI les droites sont parallèles, ALORS ces paires d'angles sont égales.",
            "Je connais la règle inverse : prouver que 2 droites ne sont pas parallèles en montrant que les angles diffèrent."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_5eme_06_Angles_et_Droites;
