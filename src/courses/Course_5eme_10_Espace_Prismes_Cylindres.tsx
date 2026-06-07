import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, InteractiveExercise 
} from '../components/SharedUI';

const Course_5eme_10_Espace_Prismes_Cylindres: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-VOL"
        title="Espace : Prismes et Cylindres"
        subtitle="Sortir de la 2D pour construire et mesurer la 3D."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : La Troisième Dimension" icon="🧊" color="rose">
        <p>
          En 6ème, tu as manipulé le pavé droit (la boîte à chaussures) et le cube (le dé). Mais le monde n'est pas fait que de boîtes carrées !
        </p>
        <p className="mt-2">
          Que se passe-t-il si la "base" de l'objet est un triangle ? Une étoile ? Un disque cercle parfait ? Si tu empiles ces formes sur une certaine hauteur, tu obtiens la famille suprême : <strong>les Prismes et les Cylindres.</strong>
        </p>
        
        <InfoBlock type="definition" title="Le Concept de l'Ascenseur">
          Imagine une figure géométrique plate (par exemple, un triangle) posée sur le sol. Fais-la monter tout droit dans un ascenseur géant, en laissant une trace derrière elle. <strong className="text-emerald-700 dark:text-emerald-300">Le volume créé par cette trace correspond exactement au prisme (ou au cylindre si c'est un cercle).</strong>
        </InfoBlock>
      </Section>

      <Section title="💎 Anatomie d'un Solide" icon="🔍" color="indigo">
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800/60 p-6 rounded-2xl shadow-sm my-6 space-y-4">
          <h3 className="font-bold text-xl text-indigo-950 dark:text-indigo-50 mb-4 border-b pb-2 border-indigo-100 dark:border-indigo-800/60">Le Prisme Droit</h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-xl">🥞</span>
              <span><strong>Les Bases :</strong> Deux polygones (triangles, hexagones, etc.) strictement identiques (superposables) et parfaitement parallèles. Le sol et le plafond de l'ascenseur.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">🚪</span>
              <span><strong>Les Faces Latérales :</strong> Pour fermer les côtés, ce sont TOUJOURS des rectangles (car c'est un prisme <em>droit</em>).</span>
            </li>
          </ul>
        </div>

        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-xl text-foreground mb-4 border-b pb-2 border-border">Le Cylindre de Révolution</h3>
          <ul className="list-none space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-xl">🔵</span>
              <span><strong>Les Bases :</strong> Deux disques identiques et parallèles. Le fond d'un verre et son sommet.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">📜</span>
              <span><strong>La Face Latérale :</strong> Si on déroule l'étiquette d'une canette, miracle ! On obtient... un rectangle parfait !</span>
            </li>
          </ul>
        </div>
      </Section>

      <Section title="📜 Le Grimoire du Volume" icon="🧪" color="emerald">
        <p className="mb-4 text-lg">La règle d'or pour tous les prismes et les cylindres est d'une simplicité phénoménale. L'ascenseur frappe encore !</p>
        
        <FormulaBox 
          title="La Formule Maîtresse (Volume)"
          formula={<>Volume = Aire de la Base × Hauteur <br/><span className="text-sm opacity-80">(V = A_base × h)</span></>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300">Calcul dans un Prisme :</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              1. Calcule l'Aire du triangle (la base).<br/>
              2. Multiplie ça par la hauteur de la "tour" (les piliers rectangulaires).
            </p>
          </div>
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300">Calcul dans un Cylindre :</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              1. Calcule l'Aire du disque (π × rayon × rayon).<br/>
              2. Multiplie ça par la hauteur de la boîte de conserve !
            </p>
          </div>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Plongée dans le Cylindre"
          question={<p>Imaginons un verre cylindrique. L'aire du fond de ton verre est de 20 cm². Le verre est rempli d'eau jusqu'à une hauteur de 5 cm. Quel est le volume de l'eau ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Formule de base</p>
              <p>Il suffit d'appliquer la Formule Maîtresse : Volume = Aire de la Base × Hauteur.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Rassembler les chiffres</p>
              <p>L'aire de la base est déjà donnée (20 cm² ! Pas besoin de pi ou du rayon). Et la hauteur est de 5 cm.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Volume = 20 × 5 = 100 cm³ ! (L'équivalent d'un bon petit verre d'eau).</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes de Mémorisation" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la forme des <strong>faces latérales</strong> d'un Prisme Droit ?</>}
            back={<>Des <strong>rectangles</strong>. C'est l'essence même du prisme "droit".</>}
          />
          <Flashcard 
            front={<>Quelle est la Formule Universelle du <strong>Volume</strong> pour un Prisme ou un Cylindre ?</>}
            back={<><strong>Volume = Aire de la Base × Hauteur</strong></>}
          />
        </div>
      </Section>

      <Section title="🎮 Architecture Pratique" icon="🕹️" color="slate">
        <p className="mb-4">Tu es l'architecte chargé de valider ces constructions 3D !</p>
        <FillInTheBlanks 
          id="vol-eval"
          content={[
            "Pour construire un cylindre, je dois utiliser deux ",
            { options: ["rectangles", "disques", "triangles"], correctAnswer: 1 },
            " parfaitement égaux pour le fond et le couvercle. L'étiquette de mon cylindre, une fois déroulée, forme un immense ",
            { options: ["parallélogramme percé", "rectangle", "cylindre"], correctAnswer: 1 },
            ". Maintenant on passe au volume. Ma base fait 15 cm² et ma boîte s'élève sur 10 cm. Le calcul est super dur... ça fait ",
            { options: ["150 cm³", "25 cm³", "1,5 cm³"], correctAnswer: 0 },
            ". Attention, un volume s'exprime toujours en ",
            { options: ["mètres carrés", "unités cubes", "mètres simples"], correctAnswer: 1 },
            " ! Le fameux petit 'cube' (³) indique les 3 dimensions de l'espace."
          ]}
        />
      </Section>

      <Section title="🎯 L'Attaque Finale de la 3D" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'empile 100 feuilles de papier triangulaires exactement les unes sur les autres, quelle forme 3D j'obtiens au final ?",
              options: [
                "Une pyramide.",
                "Un cône.",
                "Un prisme droit à base triangulaire."
              ],
              correctAnswer: 2,
              explanation: "L'empilement parfait crée une sorte d'ascenseur sans réductions : c'est l'essence du prisme droit m'sieurs dames !"
            },
            {
              question: "Sur un prisme à base 'Pentagone' (5 côtés). Combien de faces latérales (les rectangles sur les flancs) y a-t-il ?",
              options: [
                "2 (car il a 2 bases).",
                "5 faces latérales.",
                "Impossible à dire."
              ],
              correctAnswer: 1,
              explanation: "Chaque côté du pentagone de base sert de fondation à un 'mur' rectangulaire. Puisqu'il y a 5 côtés à la base, il y a 5 murs autour !"
            },
            {
              question: "Quelle est l'unité de mesure correcte d'un Volume ?",
              options: [
                "Le mètre au carré (m²)",
                "Le mètre au cube (m³)"
              ],
              correctAnswer: 1,
              explanation: "Volume = Longueur × Largeur × Hauteur = 3 dimensions, d'où le petit '3' en exposant (cube)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais identifier les bases d'un Prisme et d'un Cylindre.",
            "Je sais que les faces latérales d'un Prisme Droit sont TOUT LE TEMPS des rectangles.",
            "Je connais la formule : V = Aire_de_la_base × hauteur.",
            "Je connais l'importance destructrice des Unités (Volume en m³ ou cm³... jamais m² !)."
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

export default Course_5eme_10_Espace_Prismes_Cylindres;
