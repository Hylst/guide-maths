import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Seconde_05_Geometrie_Reperee: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [m, setM] = useState<number>(2);
  const [p, setP] = useState<number>(1);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-GEO"
        title="Géométrie Repérée & Droites"
        subtitle="Transformer une ligne tracée à la règle en formule mathématique (y = mx + p)."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : Décrire l'infini" icon="📏" color="emerald">
        <p>
          Si je te donne une feuille blanche et que je trace une droite au hasard, comment peux-tu la décrire au téléphone à un ami pour qu'il trace <span className="italic">exactement</span> la même chez lui ?
        </p>
        <p className="mt-2">
          La réponse : <strong>l'équation de la droite</strong>. Au lieu de dire "elle monte un peu et elle passe par le bas", tu vas donner la formule algébrique de tous les points qui appartiennent à cette droite. C'est le pont parfait entre la géométrie et l'algèbre.
        </p>
        
        <InfoBlock type="definition" title="Équation Réduite : y = mx + p">
          Toute droite (non verticale) du plan possède une équation de la forme <strong>y = mx + p</strong>.<br/>
          - <strong>m (coefficient directeur) :</strong> La Pente ! Si m &gt; 0, elle monte. Si m &lt; 0, elle descend.<br/>
          - <strong>p (ordonnée à l'origine) :</strong> L'Ascenseur ! C'est l'étage où la droite croise l'axe vertical des ordonnées (l'axe Y).
        </InfoBlock>
      </Section>

      <Section title="🛠️ Simulateur de Droite (y = mx + p)" icon="🎛️" color="amber">
        <p className="mb-4">
          Ajuste la Pente (m) et l'Ordonnée à l'origine (p) pour voir le comportement de la droite changer.
        </p>
        
        <div className="bg-slate-50/50 dark:bg-slate-900/20 border-2 border-slate-100 dark:border-slate-800/60 p-6 rounded-2xl shadow-sm text-center">
          <div className="flex justify-center gap-8 mb-6">
             <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Pente (m) = {m}</span>
              <input type="range" min="-5" max="5" step="1" value={m} onChange={(e) => setM(parseInt(e.target.value))} className="accent-indigo-500 w-32" />
            </label>
            <label className="flex flex-col items-center">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">Croisement Y (p) = {p}</span>
              <input type="range" min="-5" max="5" step="1" value={p} onChange={(e) => setP(parseInt(e.target.value))} className="accent-rose-500 w-32" />
            </label>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 dark:border-slate-800/60">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Analyse de la droite : y = {m}x {p >= 0 ? `+ ${p}` : `- ${Math.abs(p)}`}</h4>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className={`p-3 rounded-lg border ${m > 0 ? 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-100' : m < 0 ? 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/60 text-rose-900 dark:text-rose-100' : 'bg-slate-100 border-slate-100 dark:border-slate-800/60 text-slate-700 dark:text-slate-300'}`}>
                <strong>Direction :</strong><br/>
                {m > 0 ? "La droite MONTE (strictement croissante)." : m < 0 ? "La droite DESCEND (strictement décroissante)." : "La droite est HORIZONTALE (constante)."}
                <br/>
                <span className="text-sm">Pour 1 unité avancée, on monte/descend de {m}.</span>
              </div>
              <div className="p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/60 text-amber-900 dark:text-amber-100">
                <strong>Point d'ancrage :</strong><br/>
                La droite coupe l'axe vertical (Y) au point de coordonnées (0 ; {p}).
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="📜 Formulaire d'Intervention" icon="⚡" color="indigo">
        <p className="mb-4">Si on te donne deux points A(x_A ; y_A) et B(x_B ; y_B), tu dois être capable de recréer l'équation de la droite (AB).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Calcul du Coefficient m (Pente)" 
            math={"m = \\frac{y_B - y_A}{x_B - x_A}"} 
          />
          <FormulaBox 
            title="Calcul de p (Ordonnée origine)" 
            math={"p = y_A - m \\times x_A"} 
          />
        </div>
        <div className="mt-4">
          <Accordion title="Et si x_A = x_B ? Le cas de la droite verticale !">
            <div className="p-4 bg-rose-50/50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/60 rounded-xl space-y-2">
              <p className="font-bold text-rose-900 dark:text-rose-100">ATTENTION DANGER !</p>
              <p className="text-rose-950 dark:text-rose-50">Si les abscisses sont identiques, le calcul de <span className="font-mono">m</span> fait une division par zéro !</p>
              <p className="text-rose-950 dark:text-rose-50">Cela signifie que la droite est <strong>verticale</strong>. Elle n'a PAS d'équation réduite <span className="font-mono">y = mx+p</span>.</p>
              <p className="font-bold text-rose-950 dark:text-rose-50">Son équation est de la forme : <span className="font-mono text-lg bg-white px-2 rounded">x = c</span> (où c est la valeur commune).</p>
            </div>
          </Accordion>
        </div>
      </Section>

      <Section title="🧠 Positions Relatives des Droites" icon="🔦" color="purple">
         <p className="mb-4">Deux droites sont soit parallèles (elles ne se touchent jamais), soit sécantes (elles se croisent en un point). Comment le savoir juste en regardant les formules ?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Règle d'Or : Quand deux droites sont-elles <strong>Parallèles</strong> ?</>}
            back={<>Lorsqu'elles ont le <strong>même coefficient directeur</strong> !<br/><span className="text-sm">Si m = m', alors (d) // (d'). Elles ont la même pente.</span></>}
          />
          <Flashcard 
            front={<>Comment trouver les coordonnées du point d'intersection de deux droites sécantes ?</>}
            back={<>Il faut résoudre un <strong>Système d'Équations</strong> !<br/><span className="text-sm">Si y = 2x+1 et y = 3x-4, on pose 2x+1 = 3x-4 pour trouver x, puis on calcule y.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur d'Artilleur" icon="🕹️" color="slate">
        <p className="mb-4">Trouve la bonne droite :</p>
        <FillInTheBlanks 
          id="droites-eval"
          content={[
            "On me donne A(0; 2) et B(2; 8). Pour trouver 'm', je fais (yB - yA) / (xB - xA), soit (8 - 2) / (2 - 0) = 6 / 2 = ",
            { options: ["3", "4", "6"], correctAnswer: 0 },
            ". La pente est donc de 3 ! L'équation commence par y = 3x. Pour trouver 'p', je regarde A(0; 2). Ah, l'abscisse est 0, donc p est l'ordonnée de A, soit p = ",
            { options: ["0", "2", "8"], correctAnswer: 1 },
            ". L'équation complète est y = 3x + 2. Si je veux une droite parallèle à celle-ci passant par C(0; 5), son équation sera y = ",
            { options: ["5x + 3", "3x + 5", "-3x + 5"], correctAnswer: 1 },
            ". Magique !"
          ]}
        />
      </Section>

      <Section title="5. L'Atelier de Calcul (Exercice Interactif)" icon="Brain" color="indigo">
        <InteractiveExercise 
          title="Calcul de la Pente"
          question='Soient les points C(-2; 1) et D(4; 13). Calcule la pente $m$ de la droite (CD).'
          steps={[
            <><strong>Étape 1 :</strong> On rappelle la formule magique : <><MathComponent math={"m = \\frac{y_D - y_C}{x_D - x_C}"} /></>.</>,
            <><strong>Étape 2 :</strong> On remplace par les ordonnées (en haut) : <><MathComponent math={"y_D - y_C = 13 - 1 = 12"} /></>.</>,
            <><strong>Étape 3 :</strong> On remplace par les abscisses (en bas) : <><MathComponent math={"x_D - x_C = 4 - (-2) = 4 + 2 = 6"} /></>. Attention aux signes moins !</>,
            <><strong>Étape finale :</strong> On divise ! <><MathComponent math={"m = \\frac{12}{6} = 2"} /></>. La pente est <strong>2</strong> !</>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai une droite d'équation y = -2x + 4. Est-ce qu'elle monte ou elle descend ?",
              options: [
                "Elle monte (croissante).",
                "Elle descend (décroissante).",
                "Elle est horizontale."
              ],
              correctAnswer: 1,
              explanation: "Le coefficient 'm' (celui collé au x) est -2. C'est négatif, donc la pente descend !"
            },
            {
              question: "L'équation d'une droite horizontale passant par (0 ; 7) est :",
              options: [
                "x = 7",
                "y = 7",
                "y = 7x"
              ],
              correctAnswer: 1,
              explanation: "Horizontale = pente nulle (m=0). La formule mx+p devient 0x + p, donc juste y = p. L'ordonnée est 7, donc y = 7."
            },
            {
              question: "Quelle droite est parallèle à la droite (d): y = 5x - 3 ?",
              options: [
                "(d1) : y = -5x - 3",
                "(d2) : y = 3x + 5",
                "(d3) : y = 5x + 10"
              ],
              correctAnswer: 2,
              explanation: "Pour être parallèles, il faut la MÊME PENTE (m=5). Donc (d3) est correcte !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais identifier le coeff directeur (m) et l'ordonnée à l'origine (p).",
            "Je connais la formule pour calculer 'm' avec yB-yA / xB-xA.",
            "Je sais que deux droites de même pente (m = m') sont parallèles.",
            "Je sais que 'x = constante' c'est une droite verticale et que c'est une exception !"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
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

export default Course_Seconde_05_Geometrie_Reperee;
