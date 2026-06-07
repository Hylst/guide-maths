import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, FormulaBox, StepList 
} from '../components/SharedUI';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

const Course_5eme_01_Priorites_Operatoires: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
  courseProgress: any;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-PRIO"
        title="Priorités Opératoires"
        subtitle="Le Code de la Route des Calculs : Qui passe en premier ?"
        duration="45 min"
      />

      <Section title="👋 Pourquoi on apprend ça ?" icon="🤔" color="blue">
        <p>
          Imaginez un carrefour sans feu rouge : c'est l'accident garanti ! En mathématiques, c'est pareil. Si on calcule les nombres dans n'importe quel ordre, deux personnes obtiendront deux résultats différents pour le même calcul.
        </p>
        <p>
          Les <strong>priorités opératoires</strong> sont le code de la route international des maths. Grâce à lui, que l'on soit en France, au Japon ou sur la Lune, <code>2 + 3 × 4</code> donnera toujours le même résultat parfait. Sans ces règles, les ordinateurs et les fusées ne pourraient tout simplement pas fonctionner !
        </p>
        <InfoBlock type="funfact" title="Le saviez-vous ?">
          La toute première calculatrice grand public créée dans les années 70 faisait souvent une erreur monumentale ! Elle calculait toujours de gauche à droite. Si tu tapais <code>2 + 3 × 4</code>, elle calculait 2+3=5, puis 5×4 = 20. Aujourd'hui, on sait que c'est fatalement faux !
        </InfoBlock>
      </Section>

      <Section title="⚔️ La Hiérarchie des Opérations" icon="👑" color="indigo">
        <p>
          Pour calculer une formule, il y a un <strong>Ordre de Combat</strong> strict à respecter, du patron le plus puissant jusqu'au simple fantassin.
        </p>
        
        <StepList>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">1. Les Parenthèses (Le Bouclier Suprême)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On <strong>COMMENCE TOUJOURS</strong> par les calculs à l'intérieur des parenthèses. Elles sont immunisées contre toute attaque externe. S'il y a des crochets, on commence par les parenthèses les plus à l'intérieur !
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">2. Multiplications et Divisions (Les Boss)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Ce sont les patrons. En l'absence de parenthèses, elles foudroient les additions et soustractions et doivent être calculées <strong>EN PREMIER</strong>.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">3. Additions et Soustractions (Les Fantassins)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Ce sont les derniers à agir. Et attention, on les lit <strong>de GAUCHE à DROITE</strong>, dans le sens normal de lecture, sans exception !
            </p>
          </div>
        </StepList>

        <InfoBlock type="warning" title="Le Piège Classique !">
          Si tu as uniquement le même niveau (ex. que des + et des -, ou que des × et des ÷), l'ordre est <strong>TOUJOURS DE GAUCHE À DROITE</strong>. 
          Par exemple : <code>10 - 4 + 2</code> c'est d'abord <code>10 - 4 = 6</code>, puis <code>6 + 2 = 8</code>.
        </InfoBlock>
      </Section>

      <Section title="✨ La Magie de la Distributivité" icon="🪄" color="purple">
        <p>
          La multiplication possède un pouvoir spécial : elle se "distribue" sur les additions et les soustractions lorsqu'il y a des parenthèses. C'est extrêmement utile pour le calcul mental.
        </p>
        <FormulaBox formula="k × (a + b) = k × a + k × b" title="La Distributivité" />
        <p className="text-center font-medium mt-4 text-slate-600 dark:text-slate-400">
          Exemple : 4 × 105 = 4 × (100 + 5) = 400 + 20 = 420 !
        </p>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans <code>5 + 2 × 3</code>, que calcule-t-on en premier ?</>}
            back={<><strong>2 × 3 = 6</strong>. La multiplication est le boss, on la calcule avant l'addition !</>}
          />
          <Flashcard 
            front={<>Dans <code>15 - 5 - 2</code>, que calcule-t-on en premier ?</>}
            back={<><strong>15 - 5 = 10</strong>. Quand on n'a que des soustractions (même famille), on calcule toujours de <strong>gauche à droite</strong> !</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices d'Application Corrigés" icon="✍️" color="slate">
        <Accordion title="Exercice 1 : L'attaque combinée">
          <p className="font-medium mb-4">Calcule en détaillant les étapes : <code>A = 50 - [ 10 + 2 × (8 - 3) ]</code></p>
          <div className="bg-muted p-4 rounded-xl font-mono text-sm space-y-2 border border-border">
            <p>1. <strong>Les Parenthèses profondes :</strong> (8 - 3) = <strong>5</strong></p>
            <p className="text-slate-500 pl-4">{`A = 50 - [ 10 + 2 × 5 ]`}</p>
            
            <p className="mt-4">2. <strong>Le Boss dans le Crochet :</strong> 2 × 5 = <strong>10</strong></p>
            <p className="text-slate-500 pl-4">{`A = 50 - [ 10 + 10 ]`}</p>
            
            <p className="mt-4">3. <strong>Le Crochet :</strong> 10 + 10 = <strong>20</strong></p>
            <p className="text-slate-500 pl-4">{`A = 50 - 20`}</p>
            
            <p className="mt-4">4. <strong>La Fin :</strong> 50 - 20 = <strong className="text-indigo-600 dark:text-indigo-400 text-lg">30</strong></p>
          </div>
        </Accordion>

        <Accordion title="Exercice 2 : Calcul Mental Malin">
          <p className="font-medium mb-4">Calcule astucieusement grâce à la distributivité : <code>B = 12 × 101</code></p>
          <div className="bg-muted p-4 rounded-xl font-mono text-sm space-y-2 border border-border">
            <p>Je casse l'armure du 101 en (100 + 1) !</p>
            <p>{`B = 12 × (100 + 1)`}</p>
            <p className="mt-4">Je distribue la magie du 12 sur les deux blocs :</p>
            <p>{`B = (12 × 100) + (12 × 1)`}</p>
            <p>{`B = 1200 + 12`}</p>
            <p className="mt-4 text-emerald-600 dark:text-emerald-400 font-bold text-lg">B = 1212</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🎮 Entraînement Rapide" icon="🕹️" color="emerald">
        <p className="mb-4">Voyons si tu as le bon instinct. Complète la phrase avec la bonne règle.</p>
        <FillInTheBlanks 
          id="prio-eval"
          content={[
            "Dans l'expression 20 - 4 × 3 + 2, la première opération que l'ordinateur fait sera la ",
            { options: ["soustraction", "multiplication", "addition"], correctAnswer: 1 },
            ". Le résultat de ce morceau sera 12. L'expression devient alors 20 - 12 + 2. Maintenant je n'ai plus de boss, je lis donc strictement de ",
            { options: ["droite à gauche", "gauche à droite"], correctAnswer: 1 },
            ". Je calcule donc d'abord ",
            { options: ["12 + 2", "20 - 12"], correctAnswer: 1 },
            " ce qui fait 8. Et enfin je termine avec 8 + 2 qui donne un résultat final et absolu de ",
            { options: ["10", "6", "24"], correctAnswer: 0 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Quiz Final de Validation" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si tu tapes le calcul 10 - 4 + 2, quel est le piège à éviter absolument ?",
              options: [
                "De faire d'abord 4+2 car l'addition est prioritaire sur la soustraction.",
                "De le lire de gauche à droite."
              ],
              correctAnswer: 0,
              explanation: "Attention ! L'addition N'EST PAS prioritaire sur la soustraction. Elles sont au même niveau de force (les fantassins), donc on doit toujours calculer bêtement de GAUCHE à DROITE : on fait d'abord 10-4=6, puis 6+2=8."
            },
            {
              question: "Quelle est la toute première chose à observer dans l'expression 5 × [ 3 + (2 + 4) ] ?",
              options: [
                "Je multiplie le 5 par 3 tout de suite.",
                "Je regarde le crochet.",
                "Je plonge tout au fond, et j'attaque la parenthèse (2 + 4)."
              ],
              correctAnswer: 2,
              explanation: "La règle d'or (le bouclier suprême) dit qu'il faut toujours commencer par les parenthèses les plus intérieures possibles ! On calcule donc d'abord 2+4."
            },
            {
              question: "Le calcul 2 + 3 × 4 est égal à 20.",
              options: ["Vrai", "Faux (C'est l'Invasion de l'Erreur)"],
              correctAnswer: 1,
              explanation: "Faux ! La multiplication est LE boss. On attaque obligatoirement 3 × 4 en premier (ce qui fait 12), et ensuite seulement on ajoute 2. Le vrai résultat est 14 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais repérer et calculer en premier les calculs à l'intérieur des parenthèses.",
            "Dans un calcul sans parenthèses, j'enclenche les multiplications et divisions en premier.",
            "S'il n'y a QUE des + et des - (ou que des × et ÷), je calcule de GAUCHE à DROITE strictement.",
            "Je sais casser un nombre pour utiliser la Distributivité : k × (a + b) = k×a + k×b."
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

export default Course_5eme_01_Priorites_Operatoires;
