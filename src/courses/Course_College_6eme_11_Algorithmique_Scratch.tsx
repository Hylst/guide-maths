import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Bot, Code2, ArrowRight, Waypoints } from 'lucide-react';

const Course_College_6eme_11_Algorithmique_Scratch: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-11"
        title="Algorithmique et Scratch"
        subtitle="Apprendre à parler au Cerveau Électrique"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Géométrie (Savoir avancer, tourner d'un angle)"]}
        objectives={[
          "Mémoriser l'Anatomie du logiciel Scratch.",
          "Distinguer L'Avancée (Pas) et La Rotation (Tourner).",
          "Comprendre La Boucle Répéter ('Le Gain de temps').",
          "Décrypter un Programme de Tracé (Ex: Le Triangle Magique)."
        ]}
      />

      <Section title="🌟 Introduction : L'Idiot Parfait" icon="🤖" color="slate">
        <p>
          Un ordinateur est la machine la plus idiote de l'univers : <strong>Il ne sait rien.</strong> Mais c'est aussi la plus puissante : <strong>Il obéit à la perfection.</strong>
        </p>
        <p className="mt-4">
          Si tu lui dis "Va chercher le Pain", il explosera (Erreur Inconnue). Tu dois lui dire "Lève jambe droite de 40cm, Avance de 1m, Tourne de 20 Degrés à Gauche...". Cette suite d'Instructions PURES s'appel : <strong>Un Algorithme</strong>. 
        </p>
        <p className="mt-4">
          Sur Terre, on gère les algorithmes au Code Brüt (Avec du JavaScript ou du Python). Au collège, un petit Chat coloré a été inventé pour nous faciliter la vie avec des Briques Lego. C'est <strong>SCRATCH !</strong>
        </p>
      </Section>

      <Section title="1. L'Anatomie du Plan de Travail (Scratch)" icon="Code2" color="indigo">
        <p className="mb-4">Contrairement à ta feuille blanche, l'Écran Scratch possède 3 dimensions capitales de contrôle.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm text-center">
             <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded mb-2 border-l-8 border-rose-500"></div>
             <h4 className="font-bold text-rose-600 dark:text-rose-400">Le Magasin des Blocs (Palette)</h4>
             <p className="text-xs mt-2 text-slate-600 dark:text-slate-300">C'est la où s'entassent les légos. Bleus (Mouvement), Jaunes (Contrôle), Verts (Batailles Mentales/Opérateurs), Violet (Apparence).</p>
           </div>
           
           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm text-center col-span-1 md:col-span-1">
             <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded mb-2 border-l-8 border-indigo-500 relative flex justify-center items-center">
                <div className="w-16 h-4 bg-indigo-500 rounded"></div>
             </div>
             <h4 className="font-bold text-indigo-600 dark:text-indigo-400">Le Script (Le Cerveau)</h4>
             <p className="text-xs mt-2 text-slate-600 dark:text-slate-300">Le zone vierge de droite, l'Arène. C'est là que tu viens "Clipser" les Légos pour construire la conscience de ton robot-chat Lutin !!</p>
           </div>

           <div className="bg-card dark:bg-black/40 p-4 border rounded-xl shadow-sm text-center relative overflow-hidden">
             <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded mb-2 border border-slate-300 flex items-center justify-center relative">
               <span className="text-sm border bg-card rounded-full h-6 w-6 flex justify-center items-center">🐱</span>
             </div>
             <h4 className="font-bold text-emerald-600 dark:text-emerald-400">La Scène (Le Rendu final)</h4>
             <p className="text-xs mt-2 text-slate-600 dark:text-slate-300">L'écran qui montre le Gamedisplay ! Tu le vois faire sa dange d'Algorithme en Direct avec son stylo. Tu mets le play (Drapeau vert).</p>
           </div>
        </div>
      </Section>

      <Section title="2. Mouvements Divins et la Loi d'Orientation" icon="ArrowRight" color="blue">
        <p className="mb-4">Voici le gros bug des élèves. Ils confondent LE DEPLACEMENT et LA ROTATION du Chat sur lui-même.</p>

        <TipBanner title="Le Différentiateur !!" type="warning">
           <strong>Avancer de 100 pas :</strong> Le Chat MARCHE TOUT DROIT sur une ligne de 100 pixels vers là où il regarde. (Si tu as activé l'Outil Stylo au début, ca tracera Un Segment Visuel).<br/><br/>
           <strong>Tourner Gauche/Droite de 90° :</strong> Le Chat <strong>NE MARCHE PLUS D'UN PIXEL</strong>. Il est cloué au sol, il fait juste une RE-ORIENTATION sur lui même (Il brise les chevilles, il se tourne). (Cela crée LE SOMMET (le point) de futur tracé géométrique et oriente la future ligne !).
        </TipBanner>
      </Section>

      <Section title="3. L'Ultime Chef d'Œuvre (Le Carré parfait)" icon="Waypoints" color="amber">
        <p className="mb-4">Pour comprendre la Brique 'Répéter' de controle (Le C), regardons le code qui crée le dessin du Carré !</p>

        <InteractiveExercise 
          title="Tracé Magique du Carré !"
          question={<>Comment faire faire un Carré au Lutin Sans Utiliser les doigts et sans copier coller 4 fois les mêmes briques infernales ?</>}
          steps={[
            <><strong>1. L'Initialisation :</strong> On met le Drapeau Vert. On "Efface Tout" (reset la feuille du passé), on pose Le "Stylo En Position d'Ecriture".</>,
            <><strong>2. L'Analyse du Tracé :</strong> C'est Quoi un Carré ? 1- J'avance sur un coté. 2- Je tourne a droite aigue (Angre Droit parfait : 90°). Puis je repète !</>,
            <><strong>3. La Loi de Flemardise (La Boucle Jaune) :</strong> On pose le joyaux C Jaune : <strong>"Répéter [4] Fois :"</strong> ! Et on va clipser l'interieur !.</>,
            <><strong>4. Les Griffes Interieures :</strong> A l'interieur de la machoire C Jaune... On clipse "Avancer de 100" SUIVI DIRECTEMENT de : "Tourner Droite 90°".</>,
            <><strong>Le Résultat :</strong> Le chat gère 4 boucles pures. Il avance, tourne pif 90, avance, tourne 90.... Un carrré fermé magique apparaît !</>
          ]}
        />
        
        <div className="bg-card p-4 mx-auto max-w-lg mt-6 border-l-4 border-rose-500 shadow-md">
           <h4 className="font-bold text-rose-500 mb-2">Attention Forme Mystique (Dégommage Mathématique): </h4>
           <p className="text-sm text-slate-700 dark:text-slate-300">Si on a un Triangle Équilatéral (3 cotés). Le programme Répète "3 fois"... <strong>TU DOIS LUI FAIRE TOURNER SON CORPS DE 120 DEGRÉS ! (PAS DE 60 !!)</strong>.<br/>L'angle EXTERIEUR du chat qui continue ca course est (180 - l'AngleInterieur de 60 !). C'est le piège national n°1 du Brevet ! Tourne TOUJOURS de 120° à scratch pour un triangle normal !</p>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le script dit 'Répéte 6 fois' l'enchainement. Va se former un carré magique à la fin ? Vrai/faux.</>}
            back={<><strong>FAUX absolu !</strong><br/>6 fois ? Le lutine va fermer sa création en hexagone si son degré de deplacement es parfait. Le Carré de l'univers c'est le Chiffre du Diable (4 cotés absolues, répètés 4 fois sur 90°).</>}
          />
          <Flashcard 
            front={<>Quelle Brique est indispensable Au DEMARRAGE si on veut que scratch Laisse un joli trait rouge sur la scène ?</>}
            back={<><strong>'Stylo en Position d'Écriture !'</strong><br/>Si le prof a oublié de l'insérer avant le code... ton chat va courrir et danser comme un lache.. Et faire aucun dessin sur la feuille ! Rien du tout.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "A quoi elle sert exactement... LA BOUCLE DE COULEUR JAUNE 'RÉPETER INDÉFINIMENT' ?",
              answer: "Ahhhhh le cauchemar cosmique... La faille temporelle !!! Mettre ce bloc dit au lutin de faire sa tache pour le restant de toute L'ETERNITÉ DE L'UNIVERS. Les Ordi plantent ou explosent quand on utilise cela de n'importe qu'elle façon. Il tourne en boucle et les maths se meurent ! On s'en sert pour Les Jeux Videos ('Verification qu'il tape le mur de façon infni' !) !"
            },
            {
              question: "Si j'écris  'Aller à X:0 et Y:0'. Pourquoi on l'utilise souvent ?",
              answer: "C'est la Teleportation Cosmique Centrale. Le Chat Revient sur la Croix absolue Divine Pil Au Centre d l'écran (0;0)... Sa maison par defaut avan tous les dessins !!"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Qu'est ce que la Brique Bleue (Relever le Stylo) va provoquer si tu la clipse à la Fin d'un bout de code, juste avant que le chat aille tout en Haut la page ?",
              options: [
                "Le chat va voler avec en animation.",
                "Le chat va Avancer Tout en haut, MAIS SANS DESSINER sa traînée. Il s'est téléporté sans encrer.",
                "Le fond d'écran s'efface en blanc pur."
              ],
              correctAnswer: 1,
              explanation: "Top Boss !! Relever le Stylo empêche la pointe d'encre de frotter la feuille scène. Il peut gèrer un deplacement pacifique sur une autre section de papier sans gribouiller par dessus !"
            },
            {
              question: "Pour dessiner un carré, la Brique Tourner dans la boucle [4]... doit avec OBLIGATOIREMENT comme nombre blanc renseigné le chiffre... : ",
              options: [
                "10.",
                "180.",
                "90."
              ],
              correctAnswer: 2,
              explanation: "Top of the Top. L'Angle Parfait du jugement, LE MUR ABSOLU JUDICAIRE, c'est l'Angle Droit à 90°. (4 x 90° = Les 360°, Tour Absolu du Carré !) !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Le Stylo est Obligatoire en 6ème pour Les Tracés et Dessins de Brevet !",
            "Triangle de Scratch = Rotation PURE de 120° !! (Et PAS du 60 qui l'écrase).",
            "Mémorisé: Le Drapeau Vert est L'ETINCELLE D'ALLUMAGE moteur !"
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

export default Course_College_6eme_11_Algorithmique_Scratch;
