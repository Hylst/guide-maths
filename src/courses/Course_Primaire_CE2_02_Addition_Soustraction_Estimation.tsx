import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Sigma, Plus, Minus, Calculator } from 'lucide-react';

const Course_Primaire_CE2_02_Addition_Soustraction_Estimation: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-CE2-02"
        title="Addition, Soustraction et Estimation"
        subtitle="Poser les monstres et deviner l'avenir avec l'arrondi !"
        duration="45min"
        level="CE2"
        prerequisites={["Les Nombres jusqu'à 1000", "Addition de base"]}
        objectives={[
          "Faire des additions posées de Vétéran (Avec la Retenue +1 au plafond).",
          "Faire des soustractions avec la retenue magique.",
          "Estimer (L'ordre de grandeur) = Deviner LOUCHE le résultat avant d'agir."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        L'apprentissage des opérations posées au CE2 s'élargit aux nombres à quatre chiffres. Nous introduisons l'approche par l'estime (l'ordre de grandeur) qui permet de déceler d'emblée les erreurs aberrantes. C'est aussi à ce niveau que la soustraction avec retenue (méthode de l'emprunt ou de la cassure de dizaine/centaine) nécessite une grande attention pour éviter les automatismes non compris.
      </InfoBlock>

      <Section title="1. On gère l'Addition avec des Nombres Mastodontes (Les Centaines !)" icon={<Plus className="w-6 h-6" />} color="blue">
        <p className="mb-4">Au CE2, on ajoute pas (5+3) , on ajoute des vraies montagnes (247 + 685) !</p>
        
        <TipBanner title="Règle d'or absolue en Addtion Posée" type="warning">
           On aligne toujours <strong>LE MUR DE DROITE</strong>. (Les Unités sont empilées sur les unités à Droite). Et on commence TOUJOURS le calcul, la bataille par cette même DROITE !!
        </TipBanner>

        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-200 mt-6 font-mono text-center">
          <h4 className="font-bold text-sky-800 dark:text-sky-300 font-sans mb-4">L'Opération de la Retenue Volante : 247 + 685</h4>
          
          <div className="inline-block text-2xl tracking-[0.3em] font-bold text-right pt-4 relative">
             <div className="absolute top-0 right-[0px] text-rose-500 text-sm font-bold border rounded-full px-1 bg-card">1</div>
             <div className="absolute top-0 right-[22px] text-rose-500 text-sm font-bold border rounded-full px-1 bg-card">1</div>
             <div><span className="opacity-0">.</span>247</div>
             <div>+685</div>
             <div className="border-t border-slate-900 w-full mb-1"></div>
             <div className="text-emerald-600 dark:text-emerald-400">0932</div>
          </div>
          
          <div className="mt-6 text-sm text-sky-800 dark:text-sky-200 text-left font-sans max-w-sm mx-auto">
            <p>1️⃣  (7 + 5) = 12 ! J'écris '2' en bas.. Et le '1' (La Dizaine) S'ENVOLE AU PLAFOND DU VOISIN la Retenue !</p>
            <p className="mt-2">2️⃣ (4 + 8) = 12 ! PLUS ma super Retenue volante (12+1) = 13 !! J'écris 3 en bas.. Et BIM un '1' REPART au ciel des Centaines !</p>
            <p className="mt-2">3️⃣ (2 + 6) = 8 ! + la retenue magique = 9 !</p>
          </div>
        </div>
      </Section>

      <Section title="2. La Soustraction : L'Assaut avec Emprunt" icon={<Minus className="w-6 h-6" />} color="rose">
        <p className="mb-4">Soustraire, c'est l'art d'enlever. Le problème, c'est quand on te demande d'enlever '8' ... alors qu'il n'y a que le chiffre '5' au dessus. Tu es coincé ? Non ! <strong>On Casse un Billets au voisin !</strong></p>

        <InteractiveExercise 
          title="Emprunter pour Survivre ( 52 - 38 )"
          question={<>Dans (52 - 38), tu commences en colonne de droite :  (2 - 8) ... Argh !! 2 minuscules bonbons, tu peux pas en manger 8 !</>}
          steps={[
            <><strong>1. S.O.S Voisin Dizaine :</strong> Tu regardes le chiffre d'à coté ! Le <strong> (5) </strong> (Les 5 Dizaines). Et tu le barres avec une épée (/). Tu lui voles une grosse boite de Dix, et tu le transformes en '4'.</>,
            <><strong>2. L'Injection Magique :</strong> Et ce paquet de Dix.. tu le donnes à ton petit (2) !! BOOM !! Il devient sur-puissant et gonfle en <strong> '12' </strong> !</>,
            <><strong>3. La contre attaque :</strong> Maintenant ( 12 - 8 ) C'est super FACILE ! Tu pars de 8 à l'envers. Ca fait = <strong>4 !</strong></>,
            <><strong>4. Fin de match :</strong> La colonne du voisin (elle était devenu 4). Tu y passes !  (4 - 3). Ca fait <strong>1 !</strong>. Résultat final == <strong>14</strong>.</>
          ]}
        />
      </Section>

      <Section title="3. L'Ordre de Grandeur (L'Arrondi des Flémards)" icon={<Sigma className="w-6 h-6" />} color="amber">
        <p className="mb-4">Les Mathématiciens ne sont pas des robots fous. Avant de faire un gros calcul, ils <strong>Arondissent</strong> pour DEVNIER "EN GROS" (à la louche), à quoi va ressembler le futur résultat (pour ne pas écrire une abération géante par erreur).</p>

        <div className="bg-amber-50/50 dark:bg-amber-900/20 dark:bg-amber-900/20 p-5 rounded-2xl border-l-4 border-amber-500 mb-6">
           <h4 className="font-bold text-amber-900 dark:text-amber-100 dark:text-amber-200 mb-2">Exemple du Grand Devin "Estimation"</h4>
           <div className="bg-card dark:bg-slate-800 p-4 rounded shadow-sm">
             <p className="font-mono text-lg font-bold text-slate-700 dark:text-slate-200">198 + 406 = ??</p>
             <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Le Cerveau Flemard dit :<br/> 
             - "198 C'st ppratiquement <strong>200</strong> !! " <br/>
             - "Et 406  C'est presque pile <strong>400</strong>  !." <br/>
             </p>
             <p className="mt-4 font-bold text-emerald-600 dark:text-emerald-400">L'Ordre de grandeur rapide de tête c'est donc : [ 200 + 400 ] = Dans les 600 !! </p>
             <p className="text-xs text-rose-500 mt-1">Garde le en tete ! Si en posant le vrai resultat tu trouves '90' ou '8000', c'est que tu t'es totalement foiré sur la feuille de buisson !</p>
           </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans une soustraction posée, je peux mettre le plus petit nombre de l'opération en HAUT de la grande tour ?? (Ex:  34 minus 100)</>}
            back={<><strong>NON !! C'EST INTERDIT PAR LA LOI !</strong><br/>Le Boss, le PLUS GRAND NOMBRE, est TOUJOURS au plafond de la Soustration ! On retire toujours un morceau d'un gros truc.</>}
          />
          <Flashcard 
            front={<>A Quoi Ca sert l'Arrondi et "L'ordre de Grandeur" ?</>}
            back={<><strong>A éviter les PIÈGES BETES de la Calculette.</strong><br/>Tu sais d'avance si le résultat fera a peu près mille, ou a peu près vingt !</>}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="emerald">
        <Quiz 
          questions={[
            {
              question: "Si j'ai [ 9  +  4 ]  et que j'écrit  [ 13 ]. Je pose d'abord le 3... Ou va le chiffre des Dizaines (Le petit 1) ??",
              options: [
                "A la poubelle.",
                "En Bas de la ligne du voisin de gauche.",
                "AU PLAFOND ! (En Retenue volante dans un rond rouge au dessus des dizaines)."
              ],
              correctAnswer: 2,
              explanation: "Top Boss !! La Retenue d'addition monte en fusée sur la colonne suivante pour pouvoir etre additionéee lors du prochain run !"
            },
            {
              question: "Quel est l'Odre de grandeur magique (Le pari à al louche) pour le Calcul : [ 799 -  203 ] ???",
              options: [
                "C'est à peu près  790 + 20 . = 800",
                "C'est comme :  800(arrondi à la centaine)  MOINS  200(arrondi) .  Ca fait = 600 !",
                "C'est 1400."
              ],
              correctAnswer: 1,
              explanation: "Top ! 799 est écrasé à 800, 203 est écrasé à 200.. ça permet de faire l'opération [800 - 200 = 600] en moin d'une demi seconde !"
            }
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

export default Course_Primaire_CE2_02_Addition_Soustraction_Estimation;
