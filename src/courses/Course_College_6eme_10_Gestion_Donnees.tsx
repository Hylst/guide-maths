import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { BarChart3, PieChart, Table, TrendingUp } from 'lucide-react';

const Course_College_6eme_10_Gestion_Donnees: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-10"
        title="Gestion de Données"
        subtitle="Transformer le Chaos des chiffres en Dessins Parfaits"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Proportionnalité (savoir lire un tableau simple)"]}
        objectives={[
          "Lire et piller les informations d'un tableau à Double Entrée.",
          "Lire un Diagramme en Bâtons (ou Barres).",
          "Interpréter un Diagramme Circulaire (Le Camembert).",
          "Construire son propre Graphique Cartésien (L'évolution courbe)."
        ]}
      />

      <Section title="🌟 Introduction : Le Bureau du Maire" icon="📊" color="slate">
        <p>
          Imagine que le maire de ta ville te donne un sac poubelle contenant 5 000 petits papiers avec l'âge de chaque habitant. C'est le <strong>Chaos Total</strong>. Si tu lui lis les nombres un par un, il va s'endormir.
        </p>
        <p className="mt-4">
          La Gestion de Données, c'est l'art d'utiliser des <strong>Tableaux</strong> et des <strong>Dessins Geométriques</strong> pour qu'en UNE SEULE seconde d'œil, le Maire puisse dire : "Oh ! 80% de ma ville a moins de 15 ans !! Construisons un Skateboard park !". C'est de la Magie Visuelle.
        </p>
      </Section>

      <Section title="1. Le Tableau à Double Entrée (Le Croisement)" icon="Table" color="indigo">
        <p className="mb-4">Contrairement au tableau de proportionnalité qui est une bête ligne, ce tableau est une Carte au Trésor (Lignes VS Colonnes).</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col items-center my-6">
           <h3 className="font-bold text-center mb-4 text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">Tableau des Inscrits au Club de Sport</h3>
           <div className="bg-card dark:bg-black/40 p-2 rounded-xl shadow border border-indigo-100 font-mono text-center w-full max-w-2xl overflow-x-auto">
             <table className="border-collapse w-full text-sm sm:text-base">
               <thead>
                 <tr>
                   <th className="border p-3 bg-slate-100 dark:bg-slate-800"></th>
                   <th className="border p-3 font-bold text-sky-600 bg-sky-50 dark:bg-sky-900/30">Football</th>
                   <th className="border p-3 font-bold text-sky-600 bg-sky-50 dark:bg-sky-900/30">Tennis</th>
                   <th className="border p-3 font-bold text-sky-600 bg-sky-50 dark:bg-sky-900/30">Natation</th>
                   <th className="border p-3 font-black text-rose-500 bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/30">TOTAL (Sexe)</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <th className="border p-3 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/30">Filles</th>
                   <td className="border p-3 font-bold">12</td>
                   <td className="border p-3 relative group">
                     <span className="group-hover:bg-amber-200 transition-colors p-1 rounded">25</span>
                   </td>
                   <td className="border p-3 font-bold">30</td>
                   <td className="border p-3 font-black text-rose-500">67</td>
                 </tr>
                 <tr>
                   <th className="border p-3 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/30">Garçons</th>
                   <td className="border p-3 font-bold">45</td>
                   <td className="border p-3 font-bold">15</td>
                   <td className="border p-3 font-bold">20</td>
                   <td className="border p-3 font-black text-rose-500">80</td>
                 </tr>
                 <tr>
                   <th className="border p-3 font-black text-rose-500 bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/30">TOTAL (Sport)</th>
                   <td className="border p-3 font-black text-rose-500">57</td>
                   <td className="border p-3 font-black text-rose-500">40</td>
                   <td className="border p-3 font-black text-rose-500">50</td>
                   <td className="border p-3 font-black text-indigo-600 dark:text-indigo-400 text-xl">147</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="mt-6 w-full space-y-4">
             <InfoBlock type="info" title="L'Intersection Laser (Ex: Le '25' Cible)">
               <p className="text-sm mt-1">Regarde la cellule avec le nombre '25'. En remontant verticalement je lis "Tennis". En tirant à gauche horizontalement je lis "Filles". <br/><strong>Ce tableau me dit qu'il y a 25 Filles inscrites au Tennis !!</strong>. (Le croisement des mondes).</p>
             </InfoBlock>
             
             <InfoBlock type="warning" title="Le Contrôle des Totaux (Alerte Bug)">
               <p className="text-sm mt-1">Le grand chiffre <strong className="text-indigo-600 dark:text-indigo-400 text-lg">147</strong> en bas à droite est le Gardien Divin. Que tu additionnes les Filles + Garcons (Ligne de droite : 67+80), OU les 3 Sports (Ligne du bas : 57+40+50)... Les deux calculs DOIVENT DONNER le même 147. Sinon le tableau est corrompu !</p>
             </InfoBlock>
           </div>
        </div>
      </Section>

      <Section title="2. Les Trois Armes du Graphisme" icon="PieChart" color="emerald">
        <p className="mb-4">Pour frapper l'esprit, le Tableau n'est pas suffisant. Voici les 3 formes reines de l'art géométrique.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-5 rounded-2xl border-t-8 border-emerald-400 shadow-sm">
             <div className="flex justify-center mb-4 text-emerald-600 dark:text-emerald-400"><BarChart3 size={40} /></div>
             <h4 className="font-bold text-lg mb-1 text-center">Diag. en Bâtons</h4>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-300">
               <strong>Pour Comparer des Catégories (Chat vs Chien).</strong><br/>
               Chaque Bâton représente une catégorie. L'Echelle de gauche donne l'Effectif (le nombre). Plus le bâton est grand, plus ça pèse lourd dans le game !
             </p>
           </div>
           
           <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-5 rounded-2xl border-t-8 border-rose-400 shadow-sm">
             <div className="flex justify-center mb-4 text-rose-600 dark:text-rose-400"><PieChart size={40} /></div>
             <h4 className="font-bold text-lg mb-1 text-center">Le Camembert</h4>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-300">
               <strong>Pour Gérer les Répartitions PURES (Fractions).</strong><br/>
               Le disque Total c'est MÊME LE TOUT (100% de la classe). S'il y a un demi-camembert bleu, c'est que la Moitié des élèves (50%) aiment le bleu ! Parfait pour les élections !
             </p>
           </div>

           <div className="bg-sky-50 dark:bg-sky-900/20 p-5 rounded-2xl border-t-8 border-sky-400 shadow-sm">
             <div className="flex justify-center mb-4 text-sky-600"><TrendingUp size={40} /></div>
             <h4 className="font-bold text-lg mb-1 text-center">Diag. Cartésien (La Courbe)</h4>
             <p className="text-sm mt-3 text-slate-600 dark:text-slate-300">
               <strong>Pour Traquer L'ÉVOLUTION DANS LE TEMPS !.</strong><br/>
               Axe horizontal : Le Mois (Lundi, Mardi, Janvier, Février). Axe Vertical : La température ou le Bitcoin). On place des croix, et ON LES RELIE À LA RÈGLE pour voir l'avenir !
             </p>
           </div>
        </div>
      </Section>
      
      <Section title="3. L'Astuce Maîtresse du Graphique" icon="Focus" color="blue">
        <InteractiveExercise 
          title="Dessiner sa propre Courbe sans erreur"
          question={<>Ton professeur te donne un tableau de température : Lundi(10°), Mardi(15°), Mercredi(12°), Jeudi(20°). Tu dois tracer le Graphique de l'évolution.</>}
          steps={[
            <><strong>1. Axe Abscisse (Bas/Horizontal) :</strong> J'écris les Jours. C'est l'axe du Temps. TOUJOURS EN BAS. (Lundi, Mardi...). L'écart entre 'Lundi' et 'Mardi' sur ma feuille doit être Fixe ! (ex: 2 carreaux pour tous).</>,
            <><strong>2. Axe Ordonnée (Gauche/Vertical) :</strong> L'Axe des Températures °C. Je regarde le MAAAAAXX : 20°. Mon axe doit monter jusqu'à 20 minimum. (1 carreau = 5°C par ex).</>,
            <><strong>3. Le Point Tueur :</strong> Lundi = 10°. Je prends "Lundi" en bas, je monte l'ascenseur jusqu'à la hauteur "10". JE METS UNE CROIX !! (Pas un point rond). Une croix "x" ou "+" parfaite.</>,
            <><strong>4. RELIER A LA RÈGLE :</strong> Le prof enlève -4 points s'il voit des vagues à mains levées ! Les croix cartésiennes se relient A LA RIGUEUR DE LA RÈGLE TENDUE d'un Point au Suivant !</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans un Camembert, 25% de la classe a mangé des frites. Quelle est la forme géométrique de cette part ?</>}
            back={<><strong>Un Bel Angle Droit Parfait ! (90°) !</strong><br/>25% c'est EXACTEMENT "Un Quart" du Disque (1/4). Un quart de disque, c'est l'Angle droit de ton équipe coupant la pizza en une grande croix !</>}
          />
          <Flashcard 
            front={<>Axe Horizontal (En Bas) = Les Ordonnées ? Vrai/Faux.</>}
            back={<><strong>Alerte FAUX !!</strong><br/>Axe horizontal = Axe des <strong>Absisses</strong> (Technique: Abscisse commence par un 'a'... bah non par un A.. mais genre Abbbbaas = EN BAS). L'autre c'est l'Ordonnaaee (Ordonnée), celui qui pointe vers le Ciel en Règle Divine Verticale !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai un Bâton qui monte jusqu'à 'Moitié' entre le 10 et le 20 sur la gauche... Que vaut sa valeur ?",
              answer: "Si l'échelle est bien faite, le milieu pur entre 10 et 20 de ton Axe d'Effectif... est 15 !! C'est la de l'entrainement de lecture 'à l'echelle' !"
            },
            {
              question: "J'ai le droit de relier en courbes magiques comme un artiste pour la température ?",
              answer: "Au College... Non. Tu restes sur de la Règle (Sections Poligonales). La Nature est Lisse, certes. Mais en Maths, on relie Segments par Segments avec la règle stricte ! Ca limite les conneries !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel dessin géométrique est le Roi Ultime Merveilleux pour Afficher des Parts (Pourcentages, Fractions de Groupe Électoral...) ?",
              options: [
                "Le Camembert (Diagramme Circulaire)",
                "La Courbe avec la regle (Diagramme Cartésien)",
                "Une liste de nombres avec des flèches en l'air."
              ],
              correctAnswer: 0,
              explanation: "Top ! Le Camembert est Le Roi absolu des Proportions de Groupe (Totalité) ! Tu vois en une fraction de Goute de seconde qui a la plus grosse Part du Gâteau !"
            },
            {
              question: "Dans le mot : Graphique CARTESIEN. Que signifie Cartésien ?",
              options: [
                "Du nom d'un prof d'Art plastique.",
                "Du nom de René Descartes, le créateur de ce système avec des axes perpediculaires !",
                "Un mot pour désigner 'Les Carres' de la feuille."
              ],
              correctAnswer: 1,
              explanation: "René Descartes (Le Philososophe mathématicen Francais). L'Axe des Abscisses(Bas) percutant l'Axe des ordonnées(Gauche). C'est le REPERE CARTÉSIEN."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Horizontale = Abscisse. | Verticale = Ordonnée.",
            "Courbe = Évolution dans Le Temps(Mois/Année).",
            "Mémorisé: On met UNE CROIX au crayon de papier sur nos points avant de relier. Marre de voir des gribouillis Rondouilards."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_College_6eme_10_Gestion_Donnees;
