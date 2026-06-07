import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Scale, Coins, Wallet, Weight } from 'lucide-react';

const Course_Primaire_CE1_04_Grandeurs_Mesures_Masses: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE1-04"
        title="Grandeurs et Mesures (Masses et Monnaie)"
        subtitle="Devenir l'expert des Marchands et des Peseurs d'Or !"
        duration="45min"
        level="CE1"
        prerequisites={["Connaître les nombres", "Savoir faire une addition posée"]}
        objectives={[
          "Savoir peser en Grammes (g) et en Kilogrammes (kg).",
          "Calculer avec les Euros (€) et les Centimes (c).",
          "Rendre la monnaie à la boulangerie !"
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Manipuler la monnaie (vrais centimes ou faux billets) et peser avec une vraie balance sont les seuls moyens ancrer ces unités. Ne figez pas la monnaie dans un cahier. Faites-les jouer à "la marchande" avec des exemples familiers.
      </InfoBlock>

      <Section title="1. La Masse : C'est Lourd ou ça Vole ?" icon={<Scale className="w-6 h-6"/>} color="emerald">
        <p className="mb-4">Pour savoir si un objet est LOURD, on le pose sur une Balance. L'unité magique des savants c'est le <strong>Gramme (g)</strong> et le <strong>Kilogramme (kg)</strong>.</p>
        
        <div className="flex flex-col md:flex-row gap-6 my-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/60 text-center flex-1">
             <div className="text-4xl mb-4">🪶</div>
             <h4 className="font-bold text-emerald-700 dark:text-emerald-300">Le Gramme (g)</h4>
             <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">C'est pour les objets très légers ! Une plume, un trombone, une seule fraise. C'est le poids de base, tout petit.</p>
          </div>
          <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-xl border border-rose-100 dark:border-rose-800/60 text-center flex-1">
             <div className="text-4xl mb-4">🐘</div>
             <h4 className="font-bold text-rose-700 dark:text-rose-300">Le KiloGramme (kg)</h4>
             <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">C'est pour les gros trucs ! Toi, une voiture, un gros chien, un sac de Patates. <br/><br/><strong>1 Kg = 1000 petits grammes !</strong></p>
          </div>
        </div>
      </Section>

      <Section title="2. Les Euros et les Centimes (La Richesse !)" icon={<Coins className="w-6 h-6"/>} color="amber">
        <p className="mb-4">L'argent, c'est comme le poids : il y a les gros billets pour les choses chères, et les petites pièces pour le fond de la poche.</p>

        <TipBanner title="Le Secret de la Banque" type="warning">
           L'Euro ( <strong>€</strong> ) est le roi. Le Centime ( <strong>c</strong> ) est le petit soldat jaune. <br/>
           Il faut PILLE <strong>100 Centimes (100 c)</strong> pour réussir à fabriquer un seul <strong>1 Euro (1 €)</strong> !!!
        </TipBanner>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-5 rounded-2xl border-l-4 border-amber-500 mb-6 font-mono text-sm">
           <h4 className="font-bold text-amber-900 dark:text-amber-100 font-sans mb-3 flex items-center gap-2"><Wallet size={18}/> Ma Tirelire</h4>
           <p className="mb-2">- J'ai une pièce de <strong>2 €</strong></p>
           <p className="mb-2">- J'ai une pièce de <strong>1 €</strong></p>
           <p className="mb-2">- J'ai un billet de <strong>5 €</strong></p>
           <div className="border-t border-amber-300 mt-2 pt-2">
             <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">Total : 2 + 1 + 5 = 8 Euros !</p>
           </div>
        </div>
      </Section>

      <Section title="3. Rendre la Monnaie (L'Épreuve du Marchand)" icon={<Wallet className="w-6 h-6"/>} color="indigo">
        <p className="mb-4">Quand tu payes plus cher que le prix, le vendeur DOIT TE REDONNER DE L'ARGENT. C'est la loi des marchands ! (C'est un calcul de Soustraction).</p>

        <InteractiveExercise 
          title="La Boulangerie de l'angoisse"
          question={<>La baguette coûte 1€. Tu donnes un billet de 5€. Combien la Madame te rend ?</>}
          steps={[
            <><strong>1. Le Prix :</strong> Le pain c'est 1€. Tu DOIS 1€ à la dame.</>,
            <><strong>2. L'Énorme Billet :</strong> Tu as posé 5€ sur la table. C'est TROP !</>,
            <><strong>3. Le Calcul Secret :</strong> La dame prend ton 5, et enlève le 1 de sa baguette. Elle fait : <strong>5 - 1 = 4 !</strong></>,
            <><strong>4. Le Bout du Tunnel :</strong> Elle ouvre sa caisse et te rend <strong>4 Euros</strong> en petites pièces !</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Vrai ou Faux : "Un chat se pèse en Grammes (g), parce qu'il est petit comme une fourmi !" ?</>}
            back={<><strong>FAUX !</strong><br/>Un chat s'achète et se pèse en Kilogramme (kg). C'est trop lourd pour le (g). En (g) ça ferait des milliers de grammes !</>}
          />
          <Flashcard 
            front={<>J'ai 100 petites pièces de (1 centime) toutes jaunes dans ma main. Elles pèsent lourd ! Combien d'Euros ça fait ?</>}
            back={<><strong>Pile 1 Euro (1 €) !</strong><br/>100 centimes = 1 Euro.</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si j'achète un jeu vidéo à 20€. Et que je donne au caissier un billet Magique de 50€. Que doit faire le caissier ?",
              options: [
                "Garder la monnaie et rire.",
                "Me Rendre 30€ ! (50 - 20 = 30).",
                "Me Rendre 50€."
              ],
              correctAnswer: 1,
              explanation: "Exact ! Le marchand garde le prix de son jeu (20), et te rend la différence (La Soustraction d'écart) !"
            },
            {
              question: "Quelle balance est la plus forte pour soulever un camion de pompier ?",
              options: [
                "Celle qui compte en Grammes (g).",
                "Celle qui compte en Kilogrammes (kg) voir en Tonnes (t).",
                "Celle des bijoux."
              ],
              correctAnswer: 1,
              explanation: "Bien joué ! Les kilos (kg) c'est pour les poids lourds. (A noter: 1000kg = 1 Tonne !)"
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je sais utiliser les Grammes (g) pour ce qui est léger et les Kilogrammes (kg) pour ce qui est lourd.",
            "Je sais qu'il faut pile 100 centimes pour fabriquer 1 Euro.",
            "Je sais calculer combien on doit me rendre de monnaie en calculant la différence."
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

export default Course_Primaire_CE1_04_Grandeurs_Mesures_Masses;
