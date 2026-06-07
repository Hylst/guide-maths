import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  BentoGrid, BentoCard, InteractiveExercise
} from '../components/SharedUI';

const Course_Primaire_CP_01_Les_Nombres: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CP-01"
        title="Les Nombres et le Comptage"
        subtitle="Apprends à compter jusqu'à 100 et découvre le secret des Dizaines !"
        duration="30 min"
        level="CP (Cycle 2)"
        prerequisites={["Savoir compter jusqu'à 10 (Maternelle)"]}
        objectives={[
          "Lire, écrire, et nommer les entiers jusqu'à 100.",
          "Comprendre les unités et les dizaines (le secret du paquet de 10).",
          "Comparer des nombres (plus grand que, moins grand que)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Le CP est l'année décisive pour la numération. Votre enfant va découvrir que notre système de nombres est organisé en paquets de 10 (les dizaines). Cette compréhension est primordiale avant d'aborder les calculs complexes. Privilégiez toujours la manipulation (bâtonnets, allumettes, cubes) !
      </InfoBlock>

      <Section title="📖 Le secret du paquet de dix !" icon="🖐️" color="slate">
        <p>
          Sais-tu pourquoi tu as exactement <strong>10</strong> doigts sur tes deux mains ? C’est parce que depuis toujours, l’homme compte avec ses doigts ! Et lorsqu'on a utilisé tous nos doigts, on fabrique ce qu'on appelle "Un gros paquet entier" : <strong>Un Paquet de Dix !!</strong>
        </p>
        <p className="mt-2">
          Au CP, tu vas dompter ce château de nombres jusqu'à la centaine "<strong>100</strong>" !
        </p>
      </Section>

      <Section title="🎨 L'invasion des Unités !" icon="🧱" color="indigo">
        <p>
          Dès que <strong>10</strong> petits cubes simples (les <em>Unités</em>) se rassemblent, <strong>BOUM !</strong> Cela fusionne pour former un grand bâton fixe : <strong>La Dizaine !!</strong>
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800 my-8 flex flex-col items-center">
          <h4 className="text-xl font-bold text-indigo-950 dark:text-indigo-50 dark:text-indigo-200 mb-6 font-mono">
            La Transformation du nombre 13 !
          </h4>
          <div className="flex flex-wrap gap-8 items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-5 gap-1 mb-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-amber-300 border border-amber-500 rounded-sm" />
                ))}
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-amber-300 border border-amber-500 rounded-sm" />
                ))}
              </div>
              <span className="text-slate-500 mt-3 font-medium text-sm">13 Unités séparées</span>
            </div>

            <div className="text-3xl text-indigo-300 font-bold">👉</div>

            <div className="flex items-end gap-6">
              <div className="flex flex-col gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-6 h-3 bg-rose-400 border-x border-y border-rose-600 first:rounded-t-sm last:rounded-b-sm" />
                ))}
                <span className="text-rose-600 dark:text-rose-400 font-bold mt-2 text-center text-sm">1 Dizaine</span>
              </div>
              <div className="flex gap-1 mb-0.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-amber-300 border border-amber-500 rounded-sm" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 font-mono text-xl font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-sm">
            13 = "1" Dizaine + "3" Unités
          </div>
        </div>
      </Section>

      <Section title="📚 Les familles de Nombres" icon="👑" color="emerald">
        <h3 className="text-xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">1. La Ligne des Nombres</h3>
        <p className="mb-6">
          Les nombres sont bien rangés : on part du plus petit (le 1) et on grimpe petit à petit (1, 2, 3, 4, 5, 6, 7, 8, 9).
        </p>

        <h3 className="text-xl font-bold md-4 text-emerald-900 dark:text-emerald-100">2. Les Chefs Disent "Dix"</h3>
        <p className="mb-4">Chaque bâton de dizaine ouvre un nouveau "clan" :</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
            <span className="text-3xl block mb-2">🧱</span>
            <strong className="text-emerald-900 dark:text-emerald-100 dark:text-emerald-200">Famille de Dix (10)</strong>
            <p className="text-sm opacity-80 mt-1">1 bâton complet ! (11, 12, 13...)</p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
            <span className="text-3xl block mb-2">🧱🧱</span>
            <strong className="text-emerald-900 dark:text-emerald-100 dark:text-emerald-200">Vingtaine (20)</strong>
            <p className="text-sm opacity-80 mt-1">2 Bâtons lourds !</p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
            <span className="text-3xl block mb-2">🧱🧱🧱</span>
            <strong className="text-emerald-900 dark:text-emerald-100 dark:text-emerald-200">Trentaine (30)</strong>
            <p className="text-sm opacity-80 mt-1">3 Bâtons de dizaine !</p>
          </div>
        </div>

        <InfoBlock type="reminder" title="Règle d'or de la grandeur :">
          Pour savoir quel nombre est le plus grand, regarde d'abord <strong>le nombre de bâtons (les dizaines) !</strong>
          <br/>Exemple : 48 a quatre dizaines, 12 n'en a qu'une. 48 est beaucoup plus grand !
        </InfoBlock>
      </Section>

      <Section title="🧠 Flashcards de mémorisation" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>J'ai 3 bâtons rouges (dizaines) et 4 jetons jaunes (unités). <br/><span className="text-sky-500 mt-2 block">Qui suis-je ?</span></>}
            back={<>C'est le <strong>34</strong> ! <br/>Le clan des trois grands bâtons fait Trente, et on ajoute les 4 jetons.</>}
          />
          <Flashcard 
            front={<>Le plus grand entre <strong>52</strong> et <strong>48</strong> ?</>}
            back={<><strong>52</strong> !<br/>On regarde toujours les Dizaines en premier. Le beau 5 de 52 écrase le 4 de 48.</>}
          />
        </div>
      </Section>

      <Section title="4. L'Enquête du Détective (Exercices)" icon="🔎" color="indigo">
        <InteractiveExercise 
          title="Le Voleur de Bâtons"
          question="Le voleur a mélangé des boîtes de jouets. Sur la boîte A, il y a 5 bâtons de dizaines et 2 unités. Sur la boîte B, il y a 2 bâtons de dizaines et 9 unités. Laquelle contient le plus de jouets ?"
          steps={[
            <><strong>Étape 1 :</strong> On compte les bâtons (les dizaines) de la boîte A : <strong>5 dizaines</strong>.</>,
            <><strong>Étape 2 :</strong> On compte les bâtons de la boîte B : <strong>2 dizaines</strong>.</>,
            <><strong>Étape 3 :</strong> On s'arrête là ! Les unités ne servent à rien si le nombre des dizaines n'est pas pareil. La boîte A a 5 bâtons, c'est plus grand que 2 bâtons.</>,
            <><strong>Étape finale :</strong> La <span className="font-bold text-rose-600 dark:text-rose-400">Boîte A</span> contient 52 jouets, c'est le vainqueur !</>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Combien y a-t-il d'unités simples dans 1 Dizaine ?",
              options: [
                "1 Unité",
                "10 Unités",
                "100 Unités"
              ],
              correctAnswer: 1,
              explanation: "Rappelle toi que la Dizaine est la fusion magique de 10 petits cubes unités !"
            },
            {
              question: "Quel nombre possède exactement 2 dizaines et 6 unités ?",
              options: [
                "62",
                "26",
                "206"
              ],
              correctAnswer: 1,
              explanation: "Le nombre de dizaines est le premier chiffre en partant de la gauche : 2. L'unité est 6. C'est 26."
            },
            {
              question: "Lequel de ces nombres est le plus grand ?",
              options: [
                "39",
                "41"
              ],
              correctAnswer: 1,
              explanation: "Même si 39 a un 9 dans les unités, 41 gagne car il possède 4 dizaines, contre seulement 3 pour le 39 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que 1 dizaine, c'est un paquet de 10 unités.",
            "Je connais les mots 'Vingt', 'Trente' et 'Quarante'.",
            "Pour comparer deux nombres, je regarde d'abord le chiffre des dizaines."
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

export default Course_Primaire_CP_01_Les_Nombres;
