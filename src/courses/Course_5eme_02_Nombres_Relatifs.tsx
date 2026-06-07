import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks 
} from '../components/SharedUI';

const Course_5eme_02_Nombres_Relatifs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-RELAT"
        title="Les Nombres Relatifs"
        subtitle="L'Abysse Sous Zéro : Explorer le miroir négatif de notre univers mathématique."
        duration="30 min"
      />

      <Section title="🕳️ Introduction : L'Éclatement du Zéro" icon="🌌" color="slate">
        <p>
          Avant la 5ème, tu croyais peut-être que le Zéro (0) était le MUR ABSOLU de l'Univers, au-delà duquel rien n'existe. La déception (ou plutôt la révélation) : <strong>Le 0 n'est que le PORTAIL !</strong> En dessous, le royaume des nombres négatifs s'ouvre grand devant toi !
        </p>
        <p className="mt-4">
          Un <strong>Nombre Négatif</strong> (marqué avec le signe "-") sert à mesurer dans "les Ténèbres" ou sous la référence "0" :
        </p>
        <ul className="list-disc list-inside mt-2 text-slate-700 dark:text-slate-300 space-y-1">
          <li>Une dette à la banque (je suis à découvert de -50€).</li>
          <li>Une température glaciale (-15°C en haut d'une montagne).</li>
          <li>Une profondeur d'exploration sous la mer (le Titanic est à -3800m).</li>
          <li>Un sous-sol dans un ascenseur (niveau -2).</li>
        </ul>
        
        <InfoBlock type="definition" title="La Famille Complète">
          L'ensemble formé par les nombres <strong>Positifs</strong> (au-dessus de 0) et les nombres <strong>Négatifs</strong> (en dessous de 0) s'appelle les <strong>NOMBRES RELATIFS</strong>.
        </InfoBlock>
      </Section>

      <Section title="🛡️ L'Anatomie d'un Nombre Relatif" icon="🧬" color="indigo">
        <p>
          Un nombre relatif n'est pas un nombre ordinaire. Il est forgé de <strong>DEUX armes</strong> inséparables :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-card border-2 border-indigo-100 p-6 rounded-2xl shadow-sm text-center">
            <h3 className="font-bold text-xl text-indigo-900 dark:text-indigo-100 mb-2">1. Le Signe</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Il peut être <strong>SOIT POSITIF (+)</strong> pour représenter la lumière/le gain, <strong>SOIT NÉGATIF (-)</strong> pour représenter l'ombre/la perte.
            </p>
          </div>
          <div className="bg-card border-2 border-indigo-100 p-6 rounded-2xl shadow-sm text-center">
            <h3 className="font-bold text-xl text-indigo-900 dark:text-indigo-100 mb-2">2. La Distance à Zéro</h3>
            <p className="text-slate-600 dark:text-slate-400">
              C'est la <strong>valeur pure</strong> du nombre, sans son signe. C'est en fait sa "force" brute. Par exemple pour -15, sa distance à zéro est simplement 15.
            </p>
          </div>
        </div>

        <InfoBlock type="warning" title="Le cas ambigu du Zéro">
          Rassure-toi, Zéro n'est pas cassé. Le Zéro est magique : il est perché exactement sur la frontière. Il est donc <strong>le SEUL nombre à la fois POSITIF et NÉGATIF !</strong> (On peut écrire +0 ou -0, c'est identique à 0).
        </InfoBlock>
      </Section>

      <Section title="⚖️ L'Opposé Magique (Le Jumeau)" icon="🪞" color="purple">
        <p>
          Chaque nombre dans cet univers possède un CLONE de l'autre côté du miroir : son opposé.
        </p>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-300 bg-purple-50/50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 font-medium text-center">
          Deux nombres sont <strong>OPPOSÉS</strong> s'ils possèdent la <em>même Distance à Zéro</em> mais un <em>Signe Contraire</em>.
        </p>
        <p className="mt-4">
          Exemples de confrontation de clones :
        </p>
        <ul className="grid grid-cols-2 gap-2 mt-2 text-center">
          <li className="bg-muted p-2 rounded border border-border">L'opposé de <strong>-14</strong> est <strong>+14</strong></li>
          <li className="bg-muted p-2 rounded border border-border">L'opposé de <strong>+8</strong> est <strong>-8</strong></li>
          <li className="bg-muted p-2 rounded border border-border">L'opposé de <strong>-3,5</strong> est <strong>+3,5</strong></li>
          <li className="bg-muted p-2 rounded border border-border">L'opposé de <strong>0</strong> est <strong>0</strong></li>
        </ul>
      </Section>

      <Section title="🧠 Mémorisation Immédiate" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la <strong>Distance à Zéro</strong> du nombre <code>-245</code> ?</>}
            back={<>Sa distance à zéro est purement <strong>245</strong> (on lui enlève son signe moins).</>}
          />
          <Flashcard 
            front={<>Quel est <strong>l'opposé</strong> de <code>-42</code> ?</>}
            back={<>L'opposé est <strong>+42</strong> ! (ou simplement 42). C'est le clone exact mais de signe contraire.</>}
          />
        </div>
      </Section>

      <Section title="📝 Le Décryptage (Exercices)" icon="✍️" color="slate">
        <Accordion title="Exercice 1 : Scanner les nombres">
          <p className="font-medium mb-4">Pour chaque nombre, donne son signe et sa distance à zéro : <code>A = -512</code>, <code>B = +8</code>, <code>C = 0</code></p>
          <div className="bg-muted p-4 rounded-xl space-y-4 border border-border">
            <div>
              <p className="font-mono text-indigo-700 dark:text-indigo-300 font-bold">Pour A = -512 :</p>
              <p>Signe : <strong>Négatif (-)</strong></p>
              <p>Distance à Zéro : <strong>512</strong></p>
            </div>
            <div className="border-t border-border pt-2">
              <p className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">Pour B = +8 :</p>
              <p>Signe : <strong>Positif (+)</strong></p>
              <p>Distance à Zéro : <strong>8</strong></p>
            </div>
            <div className="border-t border-border pt-2">
              <p className="font-mono text-amber-700 dark:text-amber-300 font-bold">Pour C = 0 :</p>
              <p>Signe : <strong>Positif et Négatif</strong> (les deux !)</p>
              <p>Distance à Zéro : <strong>0</strong></p>
            </div>
          </div>
        </Accordion>
      </Section>

      <Section title="🎮 Simulateur d'Altitude" icon="🏔️" color="emerald">
        <p className="mb-4">Complète cette expédition pour valider tes connaissances :</p>
        <FillInTheBlanks 
          id="relatifs-eval"
          content={[
            "Un nombre relatif est formé de deux choses. La valeur sans le signe s'appelle la ",
            { options: ["valeur absolue (distance à zéro)", "puissance mystique", "partie décimale"], correctAnswer: 0 },
            ". Deux nombres qui se trouvent à la même distance du portail Zéro mais se font miroir sont dits ",
            { options: ["identiques", "opposés", "négatifs"], correctAnswer: 1 },
            ". Le seul nombre de l'univers qui est son propre opposé, et qui est à la fois positif et négatif, est le ",
            { options: ["-1", "0", "1"], correctAnswer: 1 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Quiz Final de Validation" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si tu descends de 5 étages sous le rez-de-chaussée, comment l'écrire mathématiquement ?",
              options: [
                "-5",
                "5",
                "0-5",
                "L'opposé de 0"
              ],
              correctAnswer: 0,
              explanation: "Exact ! Le rez-de-chaussée est le 0. Descendre dans le sous-sol (sous zéro), se note avec les nombres négatifs. On écrit donc -5."
            },
            {
              question: "Quel est l'opposé de 25 ?",
              options: [
                "1/25",
                "-25",
                "0"
              ],
              correctAnswer: 1,
              explanation: "L'opposé de 25 (qui est +25) est sa version miroir négative, donc -25 !"
            },
            {
              question: "Quelle est la distance à zéro du nombre -9 ?",
              options: [
                "0",
                "+9",
                "9"
              ],
              correctAnswer: 2,
              explanation: "La distance à zéro, c'est la jauge d'énergie pure (sans signe). La distance par rapport au portail zéro est de 9. (Note: on ne met pas de '+' quand on parle strictement de distance, 9 est la réponse parfaite)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais qu'un nombre négatif s'écrit avec un signe moins (-) et représente une valeur sous le zéro.",
            "Je sais donner la 'distance à zéro' d'un nombre (sa valeur nue sans signe).",
            "Je sais trouver l'opposé d'un nombre relatif en changeant son signe.",
            "Je sais que le nombre 0 est unique et à la fois positif et négatif !"
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

export default Course_5eme_02_Nombres_Relatifs;
