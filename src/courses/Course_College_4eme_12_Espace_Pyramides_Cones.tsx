import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Box, Cylinder, Scale3d, Info } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_4eme_12_Espace_Pyramides_Cones: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-12"
        title="Pyramides et Cônes (Espace & Géométrie)"
        subtitle="Dompter la dimension 3D qui pique vers le Ciel"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Aires des figures de base (Carré, Rectangle, Cercle de 6ème)", "Volumes du Pavé Droit (5ème)"]}
        objectives={[
          "Mémoriser LA Formule Commune des volumes Piquants (Le Tiers Divin).",
          "Calculer le volume d'une Pyramide à base carrée/triangulaire.",
          "Calculer le volume d'un Cône de révolution.",
          "Reconnaître un Patron (La peau étalée de la forme 3D)."
        ]}
      />

      <Section title="🌟 Introduction : Ceux qui pointent au Ciel" icon="🏔️" color="slate">
        <p>
          En 5ème, tu as étudié "Les Droits" : le Pavé et le Cylindre. Des piliers droits et lourds. 
        </p>
        <p className="mt-4">
          La 4ème coupe au couteau dans les blocs droits pour créer l'Aérodynamisme : <strong>Les Formes Pointues</strong>. Que ce soit la Pyramide de Khéops ou le cornet de glace de la plage (le Cône), ils ont tous une "Base" posée au sol, et une "Hauteur" qui fonce, tel un Laser, frapper le sommet unique.
        </p>
      </Section>

      <Section title="1. La Formule Absolue Divisée par 3" icon="📏" color="indigo">
        <p className="mb-4">Si on remplit un cône d'eau et qu'on le verse dans un cylindre (qui a la même base ronde et la même hauteur), il faudra le verser... EXACTEMENT 3 FOIS ! Une forme 'pointue' est toujours le <strong>TIERS (1/3)</strong> de l'architecture droite qui la contient.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm text-center my-6">
           <h3 className="font-bold text-xl text-indigo-900 dark:text-indigo-100 dark:text-indigo-200 mb-4 font-serif">La Formule de tous les Pointus (Pyramides et Cônes)</h3>
           <div className="font-mono text-2xl md:text-3xl font-black bg-card dark:bg-black/40 p-4 rounded-xl border-l-8 border-indigo-500 shadow-lg inline-block text-indigo-700 dark:text-indigo-300">
             V = (Aire de Base &times; Hauteur) &divide; 3
           </div>
           
           <ul className="text-left mt-6 space-y-3 font-medium max-w-lg mx-auto">
             <li><span className="bg-sky-200 dark:bg-sky-800 px-2 rounded mr-2">Aire de Base</span> : L'Ovale au sol, ou le Carré au sol. Tu DOIS calculer son Air 2D d'abord.</li>
             <li><span className="bg-rose-200 dark:bg-rose-800 px-2 rounded mr-2">Hauteur (h)</span> : C'est le mât du drapeau, parfaitement DROIT à angle droit depuis le sol jusqu'au pic !</li>
             <li><span className="bg-emerald-200 dark:bg-emerald-800 px-2 rounded mr-2">&divide; 3</span> : Le coup de l'amputation de 3ème dimension ! N'oublie jamais de diviser à la fin.</li>
           </ul>
        </div>
      </Section>

      <Section title="2. Le Cas Pratique (Le Cône Glacé)" icon="🍦" color="blue">
        <p className="mb-4">Voyons comment remplir formellement la mission du Brevet sans perdre un point en route.</p>

        <InteractiveExercise 
          title="Calculer le Volume Parfait d'un Cône"
          question={<>Un Cône a un disque de Rayon R = 4cm. Sa hauteur pure 'H' = 9cm.<br/>L'énoncé dit : "Donne la Valeur Exacte, puis l'arrondi au dixième".</>}
          steps={[
            <><strong>Étape 1 (Le plan au sol) :</strong> Je calcule d'abord l'Aire de la Base (Un Cercle). Formule du cercle : <><MathComponent math={"\\pi \\times R^2"} /></>. <br/>Aire = <><MathComponent math={"\\pi \\times 4^2 = \\mathbf{16\\pi}"} /></> (On garde le symbole mystique <MathComponent math={"\\pi"} /> intact ! C'est la valeur EXACTE).</>,
            <><strong>Étape 2 (L'Ascension Muliplicative) :</strong> Je multiplie cette base par la fusée (la Hauteur 'h' = 9).<br/>Haut de fraction = <><MathComponent math={"16\\pi \\times 9 = \\mathbf{144\\pi}"} /></></>,
            <><strong>Étape 3 (L'amputation pointeur) :</strong> Je n'oublie SURTOUT PAS de diviser par 3 !!<br/><><MathComponent math={"V = 144\\pi \\div 3 = \\mathbf{48\\pi \\text{ cm}^3}"} /></> <em>(Ceci est ta Valeur Exacte, tu gagnes déjà 1.5 points).</em></>,
            <><strong>L'Étape de la Calculatrice (L'Arrondi) :</strong> Tu tapes 48 × π (Pi) sur la machine = <><MathComponent math={"150,796..."} /></><br/>Arrondi au Dixième (Un trait derrière la virgule) : le 9 pousse le 7 vers le haut. &rarr; <strong>150,8 cm³</strong>.</>
          ]}
        />
      </Section>

      <Section title="3. Les Patrons (L'Art de l'Origami)" icon="✂️" color="emerald">
        <p className="mb-4">La 4ème exige que tu puisses plier mentalement une pièce en Carton 2D pour la transformer en Pyramide ou Cône 3D. Le Patron, c'est le Gabarit d'usine.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 text-center">
              <h4 className="font-bold mb-2">🏷️ Le Patron de la Pyramide Régulière</h4>
              <p className="text-sm">Une figure polygonale centrale (ex: un Carré central), et DEPUIS CHAQUE CÔTÉ pousse un triangle identique comme les pétales d'une fleur morte ("L'Étoile du désert").</p>
           </div>
           
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 text-center">
              <h4 className="font-bold mb-2">🧢 Le Patron du Cône (Pac-Man)</h4>
              <p className="text-sm">Une part de fromage géante sans son centre (Secteur de Cercle pour le flanc), ET suspendu contre l'arrondi... Un petit cercle parfait (Le sol, la base) ! C'est le chapeau du sorcier déplié.</p>
           </div>
        </div>

        <TipBanner title="L'Alerte Longueurs!" type="warning">
           L'Erreur Mondiale : <br/>
           Dans le Pythagore de la Pyramide, la "Hauteur du Solitaire (Le Mât qui frappe au centre en angle droit)" <strong>n'est pas la même chose</strong> que la "Hauteur d'un des pétales" (la longueur sur la peau penchée de la pyramide - la génératrice). Assure-toi de quelle longueur on a tirée à l'arc !
        </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande l'Aire Totale de ma peau de Pyramide (à base carrée avec 4 triangles identiques). Comment je fais ?</>}
            back={<><strong>La Mosaïque 2D !</strong><br/>Volume = Division par 3 et l'espace. MAIS Aire Totale, c'est juste de la peinture 2D ajoutée bout à bout ! <br/>Aire(Le Carré de base) + 4 × Aire(Dun petit triangle pétale). Pas de division !</>}
          />
          <Flashcard 
            front={<>Le prof écrit : Le volume est de <><MathComponent math={"25\\pi\\text{ cm}^3"} /></>. Arrondis le pour moi.</>}
            back={<>Tu sors la machine. Pi n'est pas une lettre de décoration, c'est un nombre (3.1415..). Donc tu tapes : 25 multiplié par le logo PI. La machine vomira : 78.5398... Arrondi propre : 78,5 cm³.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si la Pyramide a une base triangulaire (Pétales + Triangle de fond), c'est une Pyramide normale ?",
              answer: "Oui ! Et on a un nom prestigieux pour ce joyau à 4 faces parfaites (1 sol et 3 murs) : Le TETRAÈDRE. (Tétra = 4 en grec ancien, Eddre = Face). Le fameux 'D4' des jeux de rôles !"
            },
            {
              question: "A quoi ressemble la face latérale d'un cylindre droit Plié au sol ?",
              answer: "Pense à l'étiquette d'un boîte de conserve de raviolis! Si tu pelles le papier autour et le met à plat : c'est UN RECTANGLE colossal !. Donc Cylindre Patron = 1 grand Rectangle central prisonnier de 2 cercles pour fermer haut/bas."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une Pyramide base carrée : La base au sol a pour Longitude (côté) 5cm. La grande Hauteur 'h' de la pyramide est 6cm. Le Volume !",
              options: [
                "L'Aire est (5+5)=10. Volume = (10 × 6) / 3 = 20",
                "L'Aire est 5×5=25. Volume = (25 × 6) / 3 = 50",
                "L'Aire est 25. Volume = (25 × 6) / 2 = 75"
              ],
              correctAnswer: 1,
              explanation: "Top Exécution ! L'Air d'un Carré c'est Côté FOIS Côté (Pas l'addition du Périmètre !!). Donc Base = 25 cm². Volume = (25(Air) × 6(Haut)) ÷ 3(Loi suprême des pointus). 150÷3 = 50 cm³ ! Unité volume avec Cube !"
            },
            {
              question: "Si on augmente l'étalement du rayon d'un Cône sans toucher à sa hauteur de mât, la formule reste valide ?",
              options: [
                "Oui la formule de Base×Hauteur / 3 est inaltérable. L'aire du cercle aura juste grandi dans la parenthèse.",
                "Non, il faut une nouvelle formule pour Cône Étalé."
              ],
              correctAnswer: 0,
              explanation: "Victoire de l'Absolu ! LA Formule est incassable et cosmique ! Volume = AireDeBase × Hauteur / 3 . Tout passe !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Règle de Fer : Le 3 final. Les élèves meurent TOUS au brevet sur l'oubli du '/3'.",
            "Marge erreur Pyrahymide : L'aire Base au sol Carré. LOUPE PAS LE CARRE !",
            "Calcul mental final. Forme Valeur exacte d'abord (avec Pi). Puis décimale."
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

export default Course_College_4eme_12_Espace_Pyramides_Cones;
