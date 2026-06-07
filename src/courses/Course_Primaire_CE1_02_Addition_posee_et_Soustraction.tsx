import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { PlusSquare, AlignVerticalSpaceAround, Lightbulb, AlertTriangle } from 'lucide-react';

const Course_Primaire_CE1_02_Addition_posee_et_Soustraction: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE1-02"
        title="Addition posée et Soustraction"
        subtitle="Devenir le Maître des Colonnes et des Retenues"
        duration="45min"
        level="CE1"
        prerequisites={["Connaître les Nombres jusqu'à 100", "L'Addition en Ligne"]}
        objectives={[
          "Aligner correctement une Addition en Colonnes.",
          "Gérer le Secret des Retenues (Le plus important de ta vie !).",
          "Poser une Soustraction sans piège."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Le CE1 est l'année décisive pour la pose de l'addition et la mécanique des retenues. L'erreur la plus fréquente étant le mauvais alignement des colonnes. Montrez toujours "en vrai" avec des objets ou dessins qu'une boîte de 10 unités pleine "déborde" et s'en va dans la colonne voisine, avant de l'apprendre sur papier.
      </InfoBlock>

      <Section title="1. La Règle d'Or de l'Alignement (Le Mur Magique)" icon={<AlignVerticalSpaceAround className="w-6 h-6"/>} color="blue">
        <p className="mb-4">Les nombres en calcul posé sont comme les voyageurs dans un bus. Ils ont des places précises ! L'erreur mortelle est de mal les garer.</p>
        
        <TipBanner title="Règle N°1 : La Loi du Mur de droite !" type="info">
           On aligne TOUJOURS tous les nombres contre le Mur invisible de DROITE.
           <strong>Les Unités sous les Unités, Les Dizaines sous les Dizaines !</strong>
        </TipBanner>

        <div className="flex gap-8 justify-center my-6 flex-wrap">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 text-center relative">
            <h4 className="font-bold text-red-600 mb-2">❌ MAUVAIS (Accident de Bus)</h4>
            <div className="font-mono text-2xl tracking-[0.5em] text-right">
              <div>24</div>
              <div>+ 3</div>
              <div className="border-t border-slate-400">---</div>
            </div>
            <p className="text-xs text-red-500 mt-2 mt-4">(Le 3 unité est sous la dizaine ! Aïe !)</p>
          </div>

          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/60 text-center relative">
            <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">✅ PARFAIT (Mur Intact)</h4>
            <div className="font-mono text-2xl tracking-[0.5em] text-right border-r-4 border-emerald-300 pr-2">
              <div>24</div>
              <div>+&nbsp;3</div>
              <div className="border-t border-slate-400">---</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">27</div>
            </div>
             <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 mt-4">(Unités alignées sur le Mur de Droite)</p>
          </div>
        </div>
      </Section>

      <Section title="2. Le Secret de l'Addition avec Retenue" icon={<PlusSquare className="w-6 h-6"/>} color="rose">
        <p className="mb-4">Quand on additionne la colonne des Unités et que le résultat est <strong>10 ou plus</strong>... BOUM ! On a fabriqué une Dizaine. La boite à Unité déborde ! C'est ce qu'on appelle "La Retenue".</p>

        <InteractiveExercise 
          title="Calcul de 37 + 25"
          question={<>On part dans l'arène : Comment calculer 37 + 25 en colonne SANS FAIRE EXPLOSER L'UNIVERS ?</>}
          steps={[
            <><strong>1. L'Alignement :</strong> Je pose mon 37 en Haut. Je pose mon 25 en Dessous. (Les 7 et 5 sont alignés dans la colonne Unité). J'écris mon petit '+' à gauche.</>,
            <><strong>2. L'Armée des Unités D'ABORD :</strong> On commence toujours par Le Mur de Droit (La colonne u). <strong>7 + 5 = 12 !</strong>. Oups... 12 ne peut pas rentrer dans une seule case d'unité !</>,
            <><strong>3. La Retenue Qui Vole :</strong> Le '2' de 12 reste en bas dans les unités. Mais le '1' (la dizaine) s'envole !!! On la petite Retenue "1" <strong>TOUT EN HAUT de la colonne de gauche (Dizaines) !</strong> (Dans un petit rond). On dit: "Je pose 2 et je retiens 1 !".</>,
            <><strong>4. L'Armée des Dizaines (Le Combat Final) :</strong> On va dans la colonne des Dizaines. ON DOIT COMPTER LE PETIT '1' QUI VOLE EN PREMIER (Pour ne pas l'oublier). <strong>(+1) + 3 + 2 = 6 !</strong></>,
            <><strong>Victoire :</strong> Résultat = 62 !!</>
          ]}
        />
      </Section>

      <Section title="3. La Soustraction (Attention Danger !)" icon={<AlertTriangle className="w-6 h-6"/>} color="amber">
        <p className="mb-4">La Soustraction, c'est Enlever. Et il y a un piège redoutable !</p>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-5 rounded-xl border-l-4 border-amber-500 mb-6">
           <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">Le Boss (Le plus Grand) Toujours en Haut !</h4>
           <p>On ne peut pas enlever 10 bonbons à quelqu'un qui n'en a que 5 !<br/>Donc dans une soustraction posée, <strong>Le Nombre Le Plus Grand est OBLIGATOIREMENT TROP en haut !</strong></p>
           <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Ex: 58 - 14. Le 58 est au sommet.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-4 bg-card dark:bg-slate-800 rounded shadow border">
              <h5 className="font-bold border-b pb-2 mb-2">Méthode 58 - 14 (Sans retenue)</h5>
              <ol className="list-decimal pl-5 text-sm space-y-2">
                <li>J'aligne contre le Mur de Droite. 58 au dessus. 14 dessous.</li>
                <li>Colonne de droite, les Unités : 8 - 4. "Si j'ai 8 et qu'on m'en enlève 4, il me reste 4 !". J'écris 4 en bas.</li>
                <li>Colonne de gauche, les Dizaines : 5 - 1. "J'en enlève 1 à 5, il reste 4 !". J'écris 4.</li>
                <li><strong>Resultat final : 44.</strong> Bam. Trop facile.</li>
              </ol>
           </div>
        </div>
      </Section>


      <Section title="⚡ Flashcards" icon="🧠" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Vrai ou Faux : On commence TOUJOURS un calcul posé par la colonne de Gauche (Les plus grands) !</>}
            back={<><strong>Alerte Erreur Fatale ! FAUX !</strong><br/>On commence ABSOLUMENT TOUJOURS par la Colonne de DROITE (Les toutes petites Unités). Pourquoi ? Parce qu'elles peuvent fabriquer une Retenue qu'il faudra donner à la colonne de gauche ensuite !!</>}
          />
          <Flashcard 
            front={<>Dans l'addition   46 + 28. Que devient le calcul de la colonne des Unités (6+8 = 14) ? Que fais-tu ?</>}
            back={<><strong>Je Pose 4, et Je Retiens 1 !!</strong><br/>Le 4 va tout en bas dans la colonne de droite, et la petite dizaine '1' s'écrit tout en haut de la colonne des dizaines !! Pour ne pas être perdue !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si j'additionne 19 + 5. Comment je les place ?",
              options: [
                "J'écris le 19 en haut, et le 5 en dessous du 1 (Aligné à gauche !)",
                "J'écris le 19 en haut, et le 5 en dessous du 9 (Le Mur de droite protégé !)",
                "Je les mets de travers."
              ],
              correctAnswer: 1,
              explanation: "Top Boss !! Le Mur de Droite est inviolable. Le 5 est une unité, il DOIT être sous le 9 qui est aussi une unité !! Sous le 1 (Dizaine), ca ferait exploser l'espace temps !"
            },
            {
              question: "Pourquoi Le nombre du Haut doit TOUJOURS être le plus Grand dans une Soustraction (-) ?",
              options: [
                "Parce que c'est le professeur qui l'a dit.",
                "Parce qu'on ne peut Pas Enlever 10 pommes si on en a que 2 à la base !! On ne peut enlever que du plus Gros !",
                "Car les grands nombres ont peur du vide."
              ],
              correctAnswer: 1,
              explanation: "Incroyable. La règle ultime de la soustraction. Tu as 10 billes, je t'en vole 20 ? Impossible !! Le Haut c'est toi. Le bas c'est le Voleur. Tu dois avoir PLUS au debut."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle Dorée 1 : Le Mur de Droite pour Aligner ! (Unités sous unités).",
            "Règle Dorée 2 : On commence toujours son calcul par La Droite (Le fond de la classe).",
            "Règle Dorée 3 : J'entoure TOUJOURS ma petite Retenue tout en Haut de la colonne des dizaines pour ne Pas l'oublier !"
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

export default Course_Primaire_CE1_02_Addition_posee_et_Soustraction;
