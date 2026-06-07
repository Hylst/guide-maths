import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, StepList, InteractiveExercise 
} from '../components/SharedUI';

const Course_5eme_08_Parallelogrammes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-PRL"
        title="Les Parallélogrammes"
        subtitle="L'art du glissement parfait et des diagonales magiques."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : Le Quadrilatère Qui Glisse" icon="🛷" color="rose">
        <p>
          Un quadrilatère a 4 côtés, c'est bien connu. Mais si tu prends un quadrilatère quelconque et que tu obliges ses côtés opposés à glisser <strong>parfaitement en parallèle</strong> l'un par rapport à l'autre, tu obtiens un parallélogramme.
        </p>
        <p className="mt-2">
          C'est comme un rectangle sur lequel un éléphant se serait assis : ses côtés penchent, mais la perfection mathématique de ses alignements reste intacte.
        </p>
        
        <InfoBlock type="definition" title="La Définition Boss">
          Un <strong>Parallélogramme</strong> est un quadrilatère dont les côtés opposés sont <strong>parallèles deux à deux</strong>. C'est la condition absolue, celle qui débloque tous les pouvoirs secrets que l'on va voir.
        </InfoBlock>
      </Section>

      <Section title="💎 Les 3 Pouvoirs des Parallélogrammes" icon="✨" color="purple">
        <p className="mb-4">Dès qu'un quadrilatère a le statut VIP de "parallélogramme", il gagne automatiquement trois super-pouvoirs :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50/50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800/60 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">1. Les Côtés Jumeaux</h3>
            <p className="text-sm font-medium text-purple-950 dark:text-purple-50 mb-2">Les côtés opposés ont exactement la <strong>même longueur</strong>.</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Le haut est aussi long que le bas, la gauche est aussi longue que la droite.</p>
          </div>
          
          <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800/60 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-100 mb-2">2. Les Angles Miroirs</h3>
            <p className="text-sm font-medium text-indigo-950 dark:text-indigo-50 mb-2">Les angles opposés ont exactement la <strong>même mesure</strong>.</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">L'angle en haut à gauche est l'exact clone de celui en bas à droite.</p>
          </div>

          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/60 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-2">3. Le Milieu Parfait</h3>
            <p className="text-sm font-medium text-emerald-950 dark:text-emerald-50 mb-2">Les diagonales <strong>se coupent en leur milieu</strong>.</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Le centre de la figure est le point d'équilibre parfait des deux diagonales.</p>
          </div>
        </div>
      </Section>

      <Section title="🛠️ Construire avec le Compas" icon="🏗️" color="indigo">
        <p className="mb-4">
          Oublie l'équerre ! Pour construire un parallélogramme parfait à partir de 3 points A, B et C, le compas est le maître de la duplication.
        </p>
        <StepList>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">1. Capturer la Base (AB)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Place la pointe du compas sur A et la mine sur B pour mémoriser la longueur "en bas".</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">2. Transférer en l'Air (depuis C)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Glisse la pointe sur C (en haut). Trace un bel arc de cercle de l'autre côté. Tu viens de cloner le côté opposé !</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">3. Capturer le Côté (AD) et Fermer</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Fais pareil avec le côté oblique (pointe sur A, mine sur C si A et C sont liés). Puis pointe sur B et croise le premier arc. L'intersection est ton 4ème sommet D !</p>
          </div>
        </StepList>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Le Losange Masqué"
          question={<p>Imaginons un parallélogramme dont on sait juste qu'il a deux côtés consécutifs (qui se touchent) de même longueur. Quel est son nom secret ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser l'information</p>
              <p>C'est déjà un parallélogramme, donc ses côtés <strong>opposés</strong> sont de même longueur.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Propager la caractéristique</p>
              <p>Si la droite est égale au bas, et que le haut est égal au bas, et que la gauche est égale à la droite... tous les 4 côtés sont égaux !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Il a 4 côtés de même longueur, c'est donc un LOSANGE !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="👑 L'Évolution : Les Parallélogrammes Particuliers" icon="🛡️" color="amber">
        <p className="mb-4">Certains parallélogrammes s'entraînent dur pour devenir des figures d'élite. Ils ajoutent de nouvelles règles à leur arsenal :</p>
        <div className="space-y-4">
          <Accordion title="Le Rectangle : Le Spécialiste des Angles">
            <p className="p-2 border-l-4 border-indigo-300">Si un parallélogramme gagne <strong>un angle droit</strong>, alors ses 4 angles deviennent droits. En bonus ultime, ses diagonales deviennent de <strong>même longueur</strong> ! Il a accédé au rang de Rectangle.</p>
          </Accordion>
          <Accordion title="Le Losange : Le Spécialiste des Côtés">
            <p className="p-2 border-l-4 border-emerald-300">Si un parallélogramme a <strong>deux côtés consécutifs de même longueur</strong>, tous ses côtés deviennent égaux. Son pouvoir bonus : ses diagonales se coupent <strong>à angle droit (perpendiculaires)</strong> ! Il est devenu un Losange.</p>
          </Accordion>
          <Accordion title="Le Carré : Le Dieu Suprême">
            <p className="p-2 border-l-4 border-amber-300">Si une figure est <strong>à la fois</strong> un Rectangle ET un Losange, elle devient Le Carré. Elle possède absolument <strong>toutes les propriétés</strong> : 4 angles droits, 4 côtés égaux, diagonales de même taille, qui se coupent au milieu, et perpendiculairement. Invincible.</p>
          </Accordion>
        </div>
      </Section>

      <Section title="🧠 Mémorisation Haut Risque" icon="⚡" color="slate">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Que font les <strong>diagonales</strong> d'un parallélogramme quelconque ?</>}
            back={<>Elles <strong>se coupent en leur milieu</strong>. (C'est leur pouvoir principal).</>}
          />
          <Flashcard 
            front={<>Quel parallélogramme possède des diagonales de <strong>même longueur</strong> ?</>}
            back={<>Le <strong>Rectangle</strong> (et le Carré, car le Carré est le boss ultime).</>}
          />
          <Flashcard 
            front={<>Quel parallélogramme possède des diagonales <strong>perpendiculaires</strong> ?</>}
            back={<>Le <strong>Losange</strong> (et, bien sûr, le Carré).</>}
          />
          <Flashcard 
            front={<>Qui a des côtés opposés de <strong>même longueur</strong> ?</>}
            back={<><strong>TOUS</strong> les parallélogrammes ! (Quelconques, rectangles, losanges et carrés).</>}
          />
        </div>
      </Section>

      <Section title="🎮 Entraînement Visuel" icon="🕹️" color="emerald">
        <p className="mb-4">Démontre que tu as compris l'ascension des quadrilatères :</p>
        <FillInTheBlanks 
          id="prl-eval"
          content={[
            "J'analyse la figure ABCD. Le texte dit que ses côtés (AB) et (DC) sont parallèles. (AD) et (BC) sont aussi parallèles. C'est officiellement un ",
            { options: ["trapèze", "parallélogramme", "carré"], correctAnswer: 1 },
            ". Du coup, grâce aux super-pouvoirs, je sais sans même mesurer que la longueur AB est ",
            { options: ["plus grande que", "strictement égale à"], correctAnswer: 1 },
            " la longueur DC. Super ! Soudain, on me dit que les diagonales de ABCD sont perpendiculaires. Wow ! Mon parallélogramme a évolué, il est devenu un ",
            { options: ["rectangle", "losange", "cercle"], correctAnswer: 1 },
            ". S'il gagne en plus un angle droit, il deviendra finalement l'être parfait : un ",
            { options: ["rectangle", "trapèze isocèle", "carré"], correctAnswer: 2 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Le Défi du Maître" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si ABCD est un parallélogramme, l'angle en A vaut 50°. Combien vaut l'angle en C (l'angle opposé) ?",
              options: [
                "130° (il faut que ça fasse 180°)",
                "50° (les angles opposés sont égaux)",
                "On ne peut pas savoir."
              ],
              correctAnswer: 1,
              explanation: "Les angles OPPOSÉS d'un parallélogramme sont comme des miroirs. Ils sont strictement égaux !"
            },
            {
              question: "Un quadrilatère a ses diagonales qui se coupent en leur milieu ET qui sont de même longueur. Qui est-il ?",
              options: [
                "Un Losange.",
                "Un Rectangle."
              ],
              correctAnswer: 1,
              explanation: "Puisqu'elles se coupent au milieu, c'est un parallélogramme. Puisqu'elles sont de MÊME LONGUEUR, il s'agit d'un rectangle !"
            },
            {
              question: "Je suis un parallélogramme et mes diagonales se coupent à angle droit (perpendiculaires). Ai-je obligatoirement des angles droits à mes sommets ?",
              options: [
                "Oui, car c'est un carré.",
                "Non, car c'est juste un losange. Les angles aux sommets ne sont pas forcément droits."
              ],
              correctAnswer: 1,
              explanation: "Un losange a des diagonales croisées à 90°, mais ses propres sommets peuvent être 'écrasés' (angles aigus et obtus). Sans angle droit bonus, il ne devient pas un carré."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la définition : côtés opposés parallèles.",
            "Je connais les 3 propriétés de base (côtés opposés égaux, angles opposés égaux, diagonales qui se coupent en leur milieu).",
            "Je sais que le Rectangle pèse sur l'égalité des diagonales et les angles droits.",
            "Je sais que le Losange pèse sur la perpendicularité des diagonales et les côtés égaux.",
            "Je sais construire la 4ème pointe au compas sans trembler."
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

export default Course_5eme_08_Parallelogrammes;
