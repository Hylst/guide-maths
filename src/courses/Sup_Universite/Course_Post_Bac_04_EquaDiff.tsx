import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import DirectionField from '../../components/interactive/DirectionField';

const Course_Post_Bac_04_EquaDiff: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-EQDIFF"
        title="Équations Différentielles Avancées"
        subtitle="Ordre 2, Systèmes de Cauchy, et la magie des équations linéaires à coefficients constants."
        duration="1h 10"
      />

      <Section title="⚠️ Introduction : Oublie ce que tu sais du Lycée" icon="🌀" color="emerald">
        <p>
          Au lycée on se contente de y' = ay + b. C'est l'équivalent de savoir avancer tout droit. En post-bac, on ajoute <strong>l'accélération (y'')</strong>, l'oscillation (des cosinus résonnants), et on mélange les variables entre elles.
        </p>
        <p className="mt-2 mb-4">
          Tout le monde physique autour de nous est piloté par des équations différentielles d'ordre 2 : le rebond d'une suspension de voiture, les ondes sismiques, un circuit RLC, etc.
        </p>

        <InfoBlock type="funfact" title="Le saviez-vous ? (L'Effet Papillon et Lorenz)">
          En 1961, le météorologue Edward Lorenz tentait de modéliser l'atmosphère avec un système d'équations différentielles non linéaires d'ordre 1 à trois variables. En entrant des valeurs initiales légèrement simplifiées (de {"$0.506127$"} à {"$0.506$"}), il découvrit que les prévisions divergeaient de façon spectaculaire. C'est la naissance du <strong>Chaos Déterministe</strong> et de l'Effet Papillon : une infime variation initiale change radicalement la solution d'un système dynamique.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Équations Linéaires d'Ordre 2" icon="🧲" color="indigo">
        <p className="mb-4">
          La forme générale est <strong>ay'' + by' + cy = f(x)</strong>. L'astuce majeure de résolution consiste à diviser le problème en DEUX.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="1. La Solution Homogène (E_0)" 
            math={"ay'' + by' + cy = 0"} 
          />
          <FormulaBox 
            title="2. La Solution Particulière (E_p)" 
            math={"y_p \\text{ vérifie } ay_p'' + by_p' + cy_p = f(x)"} 
          />
        </div>
        <div className="my-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>Objectif Final :</strong> On a prouvé mathématiquement que la solution Générale du problème Y, c'est obligatoirement la somme : <strong>Y = E_0 + E_p</strong>. L'équation Homogène (sans second membre) gère la façon dont le système "résonne" seul (ex: l'amortissement). La solution Particulière gère la façon dont on force le système depuis l'extérieur (ex: la puissance du moteur).
        </div>

        <InfoBlock type="reminder" title="Rappel : Théorème de Cauchy">
          Pour une équation différentielle linéaire d'ordre 2, le théorème de Cauchy garantit que sous réserve de régularité des coefficients, pour un couple de valeurs initiales donné {"$(y_0, y_1)$"}, il existe une <strong>unique</strong> solution globale {"$y$"} vérifiant {"$y(x_0) = y_0$"} et {"$y'(x_0) = y_1$"}. D'un point de vue physique, cela signifie que la trajectoire est entièrement déterminée par la position et la vitesse initiales.
        </InfoBlock>
      </Section>

      <Section title="📜 L'Équation Caractéristique" icon="🔑" color="amber">
        <p className="mb-4">
          Comment résoudre E_0 (ay'' + by' + cy = 0) ? On remarque que seule la fonction Exponentielle a le pouvoir d'avoir sa dérivée identique à elle-même. On "tente le coup" en posant y = e^(rx). 
        </p>
        
        <InfoBlock type="definition" title="Le Polynôme Caché">
          En remplaçant y par e^(rx), on retombe... sur un banal polynôme du second degré de Lycée : <strong>ar² + br + c = 0</strong> !<br/>
          (On l'appelle l'équation caractéristique).
        </InfoBlock>

        <div className="my-4 p-4 bg-muted border border-amber-100 dark:border-amber-800/60 rounded-xl">
          <ul className="list-disc pl-4 text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <li><strong>Si Δ {">"} 0 :</strong> 2 racines réelles. Le système s'amortit très vite sans osciller. (ex: la porte de cantine).</li>
            <li><strong>Si Δ = 0 :</strong> 1 racine réelles double. Amortissement critique, retour au zéro le plus rapide.</li>
            <li><strong>Si Δ {"<"} 0 :</strong> 2 racines COMPLEXES CONJUGUÉES. Et qui dit complexe dit... Euler, e^(i*x) donc des cosinus ! Le système <strong>oscille</strong> (ex: le ressort rebondit infiniment ou jusqu'à frottement).</li>
          </ul>
        </div>

        <InfoBlock type="info" title="Zoom sur : La Catastrophe de Tacoma Narrows et la Résonance">
          Le 7 novembre 1940, le pont suspendu de Tacoma Narrows s'est effondré sous l'effet de vents modérés d'environ 65 km/h. Ce drame n'était pas causé par une simple surcharge de poids, mais par un couplage aéroélastique excitateur (phénomène de résonance). Un vent constant a forcé le système à une fréquence proche de sa fréquence naturelle d'oscillation libre. Dans l'équation différentielle modélisant le pont, l'amortissement {"$by'$"} était sous-dimensionné face au terme de forçage périodique {"$f(t)$"}, ce qui a entraîné une divergence catastrophique de l'amplitude d'oscillation.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Équation Caractéristique"
          question={<p>Comment résoudre l'équation homogène <><MathComponent math={"y'' - 5y' + 6y = 0"} /></> ? Quelles sont les solutions générales ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Passer au polynôme</p>
              <p>On remplace <><MathComponent math={"y''"} /></> par <><MathComponent math={"r^2"} /></>, <><MathComponent math={"y'"} /></> par <><MathComponent math={"r"} /></> et <><MathComponent math={"y"} /></> par <><MathComponent math={"1"} /></>. On obtient l'équation caractéristique : <><MathComponent math={"r^2 - 5r + 6 = 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Chercher les racines</p>
              <p>On cherche deux nombres dont la somme est 5 et le produit est 6. C'est <><MathComponent math={"2"} /></> et <><MathComponent math={"3"} /></>. (On peut aussi calculer le déterminant <><MathComponent math={"\\Delta = 25 - 24 = 1"} /></>).</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Les racines sont réelles : 2 et 3. La solution générale s'écrit donc <><MathComponent math={"y(x) = A e^{2x} + B e^{3x}"} /></>, avec A et B des constantes réelles !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : La Solution Particulière avec Second Membre"
          question={<p>On veut résoudre <><MathComponent math={"y' + 2y = 4x"} /></> (Ordre 1, Linéaire). Qu'elle est l'astuce pour trouver une solution particulière ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Forme du second membre</p>
              <p>Le terme de droite est <><MathComponent math={"f(x) = 4x"} /></>, c'est un polynôme de degré 1.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Le candidat idéal</p>
              <p>Par mimétisme, on pose comme solution particulière <><MathComponent math={"y_p(x) = ax + b"} /></> (un autre polynôme de degré 1). Sa dérivée est <><MathComponent math={"y_p' = a"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : En remplaçant on a <><MathComponent math={"a + 2(ax + b) = 4x"} /></>. Donc <><MathComponent math={"2ax + (a+2b) = 4x"} /></>. Par identification : <><MathComponent math={"2a = 4"} /></> donc <><MathComponent math={"a=2"} /></> ; et <><MathComponent math={"a+2b = 0"} /></> donc <><MathComponent math={"b = -1"} /></>. <br/>La solution particulière est <><MathComponent math={"y_p(x) = 2x - 1"} /></> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le principe de Superposition ça marche sur toutes les équations.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Seulement sur les équations LINÉAIRES. Si tu croises un carré (y'²) ou un cos(y), c'est non-linéaire. Le chaos total commence. On ne peut plus utiliser E_0 + E_p ou la théorie naïve.</span></>}
          />
          <Flashcard 
            front={<>C'est quoi la 'Variation de la Constante' ?</>}
            back={<><strong>La ruse.</strong><br/><span className="text-sm">Pour trouver la solution Particulière y_p, l'astuce c'est de prendre la solution homogène y_0 = K * e^(rx)... et de forcer au pifomètre K à devenir une fonction dépendante de x : K(x) * e^(rx). On remplace ça dans l'équation et on trouve K !</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur Spatial (Champs de Directions Tangentes)" icon="🕹️" color="slate">
        <DirectionField />

        <div className="mt-6">
          <FillInTheBlanks 
            id="pb-equad-eval"
            content={[
              "Soit y'' + 4y = 0. L'équation caractéristique associée devient r² + 4 = 0. Les deux racines magiques sont r = 2i et r = ",
              { options: ["-2i", "-2", "4i"], correctAnswer: 0 },
              ". \nVu que les racines sont complexes pures, pas de partie réelle donc pas d'exponentielle réelle pour 'écraser' le mouvement. La solution sera de la forme : A*cos(2x) + B* ",
              { options: ["cos(-2x)", "sin(2x)", "e^(2x)"], correctAnswer: 1 },
              ". \nC'est l'équation de l'oscillateur harmonique parfait : un pendule sans frottement qui oscillera éternellement entre les bornes fournies par A et B."
            ]}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Combien doit-on fournir de 'conditions initiales' pour trouver les constantes (A, B) et avoir une Unique solution à une équation d'Ordre 2 ?",
              options: [
                "1 condition : y(0)",
                "2 conditions : y(0) et y'(0)",
                "3 conditions"
              ],
              correctAnswer: 1,
              explanation: "Il y a 2 constantes d'intégration magiques générées par l'équation caractéristique (A et B). Pour briser ces verrous, le problème de Cauchy nous demande 2 clés : la position de départ (y) ET la vitesse de départ (y')."
            },
            {
              question: "Si mon Second Membre f(x) est de la forme polynomiale 'x² + 5x - 3', sous quelle forme je vais chercher naïvement ma solution Particulière (E_p) ?",
              options: [
                "K * e^x",
                "ax² + bx + c",
                "Je ne sais pas, on doit utiliser la Variation de la constante"
              ],
              correctAnswer: 1,
              explanation: "Le Théorème de 'Ressemblance' dit que si le forçage est un polynôme de de degré 2, E_p sera PRESQUE TOUJOURS un polynôme de degré 2. On remplace ce ax²+bx+c inconnu dans l'équation, on identifie les coefs et BIM."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "La solution générale de E c'est Y = Sol_Homogène(E_0) + Sol_Particulière(E_p).",
            "Pour l'Homogène, je résous en remplaçant par 'r' et en calculant DELTA.",
            "Si Delta < 0... je dois faire appel aux complexes et les solutions sont des cosinus/sinus.",
            "Le Problème de Cauchy => on fige A et B avec l'état Initial de l'expérience physique y(0) et y'(0)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_04_EquaDiff;
