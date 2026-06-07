import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { PlusCircle, MinusCircle, Hand, Calculator } from 'lucide-react';

const Course_Primaire_CP_02_Addition_Soustraction: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CP-02"
        title="Addition et Soustraction Simples"
        subtitle="Rassembler des trésors ou en perdre en route !"
        duration="40min"
        level="CP"
        prerequisites={["Savoir compter jusqu'à 20"]}
        objectives={[
          "Comprendre le signe (+) : On rassemble, on a plus !",
          "Comprendre le signe (-) : On enlève, on cache, on a moins !",
          "Utiliser ses doigts magiques pour calculer."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Les notions d'addition et de soustraction doivent toujours être reliées à des histoires concrètes ("j'ajoute", "je perds"). Au CP, le calcul mental repose beaucoup sur le fait de "mettre le plus grand dans sa tête" et d'ajouter les petits sur ses doigts.
      </InfoBlock>

      <Section title="1. L'Addition (+) : La Magie du PLUS !" icon={<PlusCircle className="w-6 h-6"/>} color="emerald">
        <p className="mb-4">L'Addition, c'est quand on <strong>AJOUTE</strong> des choses. Comme quand tu as des bonbons et qu'un ami t'en donne D'AUTRES ! Ton tas grossit !</p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 shadow-sm flex flex-col md:flex-row gap-6 items-center my-6">
           <div className="flex-1 text-center">
             <div className="text-4xl mb-2">🍎🍎</div>
             <div className="font-bold text-slate-700 dark:text-slate-300">2 Pommes</div>
           </div>
           
           <div className="text-emerald-500 font-bold text-4xl">+</div>

           <div className="flex-1 text-center">
             <div className="text-4xl mb-2">🍎🍎🍎</div>
             <div className="font-bold text-slate-700 dark:text-slate-300">3 Pommes</div>
           </div>

           <div className="text-slate-400 font-bold text-4xl">=</div>

           <div className="flex-1 text-center">
             <div className="text-4xl mb-2 flex justify-center flex-wrap max-w[80px] mx-auto gap-1">🍎🍎🍎🍎🍎</div>
             <div className="font-bold text-emerald-700 dark:text-emerald-300 text-xl">5 Pommes !</div>
           </div>
        </div>

        <TipBanner title="L'Astuce des Doigts (Le Grand dans la tête)" type="success">
           Pour <strong>5 + 3</strong> : Tu mets le plus grand nombre (5) <em>dans ta tête</em>, et tu lèves 3 doigts. Tu comptes la suite : "Six, Sept, Huit !". Résultat = 8 !
        </TipBanner>
      </Section>

      <Section title="2. La Soustraction (-) : Le Voleur !" icon={<MinusCircle className="w-6 h-6"/>} color="rose">
        <p className="mb-4">La Soustraction, c'est quand on <strong>ENLÈVE</strong>. Quelqu'un te vole des billes ou tu les as mangées. Tu en as <strong>MOINS</strong> qu'avant ! C'est le signe (-).</p>

        <InteractiveExercise 
          title="Le Voleur de Cookies"
          question={<>Tu avais 6 cookies. Le chien en a mangé 2. (6 - 2 = ?). Combien t'en reste-t-il ?</>}
          steps={[
            <><strong>1. La base :</strong> Lève 6 doigts ! (C'est tout ce que tu avais). Le plus grand !</>,
            <><strong>2. Le vol :</strong> Le chien arrive ! <strong>Cache 2 doigts</strong> en les baissant ou en les pliant.</>,
            <><strong>3. Le résultat :</strong> Regarde ta main ! Combien de doigts sont encore levés et debouts ? <strong>4 doigts !</strong></>,
            <><strong>L'Écriture de pro :</strong> On écrit : <strong>6 - 2 = 4</strong> !</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le signe <strong>( + )</strong> sert à "Enlever" ou à "Ajouter" ?</>}
            back={<><strong>A AJOUTER !!</strong><br/>C'est une croix, ça veut dire PLUS. On rassemble, on gagne, ça grossit !</>}
          />
          <Flashcard 
            front={<>Le signe <strong>( - )</strong> (un trait couché) ça fait quoi ?</>}
            back={<><strong>ÇA ENLÈVE !! C'est la ligne du MOINS.</strong><br/>On cache, on mange, on perd, ça rétrécit !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si j'écris  7 + 1 = ?  Que trouves-tu ?",
              options: [
                "6",
                "8",
                "10"
              ],
              correctAnswer: 1,
              explanation: "Top ! Ajouter (+ 1), c'est juste dire le NOUVEAU NOMBRE qui vient juste après dans ta chanson des nombres ! Après 7, c'est 8 !!"
            },
            {
              question: "A quoi sert le signe = (égal) ?",
              options: [
                "À faire joli.",
                "À donner LE RÉSULTAT FINAL !",
                "À barrer la page."
              ],
              correctAnswer: 1,
              explanation: "Génial ! Le (=) c'est la porte de sortie magique, après cette porte c'est la réponse !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la croix ( + ) qui fait grandir le tas.",
            "Je connais le tiret ( - ) qui pique et qui enlève.",
            "Je sais mettre un grand nombre dans ma tête et compter avec mes doigts !"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider la Leçon (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CP_02_Addition_Soustraction;
