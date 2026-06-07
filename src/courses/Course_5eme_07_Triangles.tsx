import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, StepList 
} from '../components/SharedUI';

const Course_5eme_07_Triangles: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-TRI"
        title="Les Triangles"
        subtitle="Construire l'Impossible et la Sainte Trinité des Angles."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Le Droit d'Exister" icon="⚔️" color="rose">
        <p>
          Un triangle, ce n'est pas n'importe quel dessin que tu peux forcer sur une feuille !
        </p>
        <p className="mt-2">
          Imagine que tu possèdes un grand bâton de <strong>100 cm</strong> pour faire la base de ta tente. Pour faire le toit, tu trouves deux minuscules brindilles de <strong>1 cm</strong> chacune. Tu peux essayer de les pencher autant que tu veux, les deux brindilles ne se toucheront JAMAIS en haut. Le toit s'écroule. Le triangle n'existe pas.
        </p>
        
        <InfoBlock type="definition" title="L'Inégalité Triangulaire">
          Pour qu'un triangle ait "le droit d'exister", la règle est implacable : <br/>
          <strong>LE PLUS GRAND CÔTÉ doit être STRICTEMENT INFÉRIEUR à la somme des deux autres côtés.</strong><br/>
          (Si le grand côté est trop grand, le "toit" s'écrase).
        </InfoBlock>
      </Section>

      <Section title="📐 Scénarios de l'Inégalité" icon="⚖️" color="slate">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 p-5 rounded-2xl">
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-2">1. La Victoire</h3>
            <p className="text-sm font-medium text-emerald-950 dark:text-emerald-50 mb-2">Côtés : 10, 7 et 5.</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Le Boss (le plus grand) est 10. La somme des autres est 7+5=12. <br/><strong className="text-emerald-600 dark:text-emerald-400">10 est plus petit que 12.</strong> Le toit tient. Le triangle existe !</p>
          </div>
          
          <div className="bg-amber-50/50 dark:bg-amber-900/20 border-2 border-amber-100 dark:border-amber-800/60 p-5 rounded-2xl">
            <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100 mb-2">2. Le Choc Plat</h3>
            <p className="text-sm font-medium text-amber-950 dark:text-amber-50 mb-2">Côtés : 10, 6 et 4.</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Le Boss est 10. La somme des autres est 6+4=10. <br/><strong className="text-amber-600 dark:text-amber-400">10 = 10.</strong> Le toit s'écrase exactement sur le sol. C'est un "triangle plat", les 3 points sont <strong>alignés</strong>.</p>
          </div>

          <div className="bg-rose-50/50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-800/60 p-5 rounded-2xl">
            <h3 className="font-bold text-lg text-rose-900 dark:text-rose-100 mb-2">3. La Rupture</h3>
            <p className="text-sm font-medium text-rose-950 dark:text-rose-50 mb-2">Côtés : 10, 4 et 3.</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Le Boss est 10. La somme est 4+3=7. <br/><strong className="text-rose-600 dark:text-rose-400">10 est plus grand que 7.</strong> Les petits ne se touchent pas. Ce triangle est mathématiquement <strong>IMPOSSIBLE</strong>.</p>
          </div>
        </div>
      </Section>

      <Section title="🔮 La Potion des 180°" icon="✨" color="purple">
        <p>
          Ceci est le secret géométrique le plus puissant de l'univers euclidien (celui qu'on étudie au collège) :
        </p>

        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-100 dark:border-purple-800/60 text-indigo-950 dark:text-indigo-50 p-8 rounded-2xl shadow-sm my-6 text-center text-xl lg:text-2xl">
          Dans N'IMPORTE QUEL TRIANGLE, la somme des 3 Angles intérieurs fait <strong>TOUJOURS EXACTEMENT 180°</strong> !
        </div>

        <p className="text-slate-700 dark:text-slate-300 font-medium">
          Ce théorème permet de détecter l'imposture immédiatement. Si on te donne un angle de 90° et un autre de 100°... 90+100=190°. C'est DÉJÀ plus que 180°. Ce triangle est un faux !
        </p>
      </Section>

      <Section title="🛠️ La Construction Parfaite (Règle et Compas)" icon="🏗️" color="indigo">
        <p className="mb-4">
          Si le triangle a le droit d'exister, voici la méthode pour le matérialiser sur ta feuille avec uniquement ses 3 longueurs :
        </p>
        <StepList>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">1. La Base Fondatrice</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Trace à la règle le <strong>plus long</strong> segment en bas de ta feuille.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">2. L'Arc de Gauche</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Ouvre ton compas à la longueur du 2ème côté. Pique du côté gauche de ta base, et trace un arc d'épée vers le haut.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">3. Le Choc Créateur</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Ouvre ton compas à la longueur du 3ème côté. Pique du côté droit de la base, et tranche le premier arc ! <strong>L'intersection est ton 3ème sommet !</strong></p>
          </div>
        </StepList>
      </Section>

      <Section title="🧠 Mémorisation Immédiate" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Combien vaut la <strong>somme des angles</strong> de tout triangle ?</>}
            back={<><strong>180°</strong>. Toujours. Sans aucune exception.</>}
          />
          <Flashcard 
            front={<>Quelle est la règle pour qu'un triangle <strong>puisse exister</strong> ?</>}
            back={<>Le plus long côté doit être <strong>plus petit</strong> (strictement) que la somme des deux plus petits côtés.</>}
          />
        </div>
      </Section>

      <Section title="📝 Épreuve de Décryptage" icon="✍️" color="slate">
        <Accordion title="Exercice : Trouver l'angle manquant">
          <p className="font-medium mb-4">Dans le triangle NINJA, l'angle en N mesure 40° et l'angle en I mesure 75°. Combien mesure l'angle de J ?</p>
          <div className="bg-muted p-6 rounded-xl space-y-4 border border-border">
            <p className="pl-4 border-l-4 border-indigo-300">
              <strong className="text-indigo-700 dark:text-indigo-300">1. Ce que je sais :</strong> La somme des trois angles doit faire <strong>180°</strong> au total.
            </p>
            <p className="pl-4 border-l-4 border-emerald-300">
              <strong className="text-emerald-700 dark:text-emerald-300">2. Calcul des côtés connus :</strong> Les deux angles que j'ai valent : <code>40 + 75 = 115°</code>.
            </p>
            <p className="pl-4 border-l-4 border-rose-300">
              <strong className="text-rose-700 dark:text-rose-300">3. Trouver le reste :</strong> Je prends le total parfait (180) et je retire ce que j'ai déjà : <code>180 - 115 = 65°</code>.
            </p>
            <p className="text-rose-600 dark:text-rose-400 font-bold text-lg mt-4 text-center">L'angle J mesure donc exactement 65°.</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🎮 Simulateur de Validation" icon="🕹️" color="emerald">
        <p className="mb-4">Complète cette analyse d'expertise géométrique :</p>
        <FillInTheBlanks 
          id="tri-eval"
          content={[
            "J'analyse les dimensions 15cm, 8cm et 6cm. Je vois que le plus grand côté est 15. La somme des deux petits donne ",
            { options: ["14", "23", "2"], correctAnswer: 0 },
            ". Étant donné que 14 est ",
            { options: ["plus grand que 15", "plus petit que 15"], correctAnswer: 1 },
            ", cela signifie que ce triangle est physiquement ",
            { options: ["parfait", "impossible à tracer"], correctAnswer: 1 },
            " ! La règle d'or est brisée. Ensuite, un ami me montre un triangle où les angles valent 90°, 45° et 45°. Je calcule la somme : ",
            { options: ["180°", "190°", "100°"], correctAnswer: 0 },
            ". Oh ! C'est la valeur magique absolue, donc j'en déduis que ce triangle a le droit d'",
            { options: ["exister", "exploser"], correctAnswer: 0 },
            "."
          ]}
        />
      </Section>

      <Section title="🎯 Quiz Final de Validation" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si on a un triangle avec un angle de 100° et un autre angle de 80°, est-ce possible ?",
              options: [
                "Oui, il restera 0° pour le 3ème angle.",
                "Non, c'est purement IMPOSSIBLE !"
              ],
              correctAnswer: 1,
              explanation: "100+80 = 180° ! Il n'y a plus AUCUNE place pour le 3ème angle (qui ne peut pas valoir 0 sinon c'est un trait, pas un triangle). Donc c'est impossible !"
            },
            {
              question: "Quelle condition sur les longueurs permet de dire que 3 points A, B, et C sont parfaitement ALIGNÉS ?",
              options: [
                "AB est plus petit que BC + CA.",
                "La plus grande longueur est EXACTEMENT ÉGALE à la somme des deux autres."
              ],
              correctAnswer: 1,
              explanation: "Quand ça fait exactement la même taille (ex: 10 et 5+5), le triangle s'écrase totalement et devient 'plat'. Les points forment une ligne droite parfaite."
            },
            {
              question: "Comment je trace la position du 3ème sommet avec mon compas ?",
              options: [
                "Je trace deux droites avec ma règle jusqu'à ce qu'elles se touchent.",
                "Je fais deux arcs de cercle qui se croisent, ça forme l'intersection magique !"
              ],
              correctAnswer: 1,
              explanation: "Exact ! Le compas est fondamental pour reporter proprement la longueur des deux petits bâtons sans faire de l'à-peu-près."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que dans n'importe quel triangle, la somme des trois angles vaut toujours 180°.",
            "Je sais calculer le 3ème angle si on me donne les deux premiers.",
            "Je connais l'Inégalité Triangulaire : Le plus grand côté M DOIT ÊTRE < au Côté1 + Côté2.",
            "Je sais dessiner un triangle proprement avec Règle et Compas (et la croix de l'intersection)."
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

export default Course_5eme_07_Triangles;
