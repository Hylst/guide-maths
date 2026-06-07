import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Square, StretchHorizontal, Droplet, Hexagon } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_6eme_07_Perimetres_Aires: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-07"
        title="Périmètres et Aires"
        subtitle="La Clôture contre Le Carrelage"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Multiplications simples", "Connaissance des unités (m, cm, km)"]}
        objectives={[
          "Faire la différence absolue entre le Contour (Périmètre) et la Surface (Aire).",
          "Calculer l'Aire d'un Rectangle et d'un Triangle Rectangle.",
          "Mémoriser l'Unité au 'Carré' (cm²) et le tableau de conversion magique."
        ]}
      />

      <Section title="🌟 Introduction : Clôture vs Carrelage" icon="🏡" color="slate">
        <p>
          Il y a le pire piège du collège dans ce chapitre. Beaucoup d'élèves confondent "Périmètre" et "Aire". Pour ne jamais te tromper, pose toi cette seule question de chantier :
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong>Le Périmètre :</strong> C'est la <em>clôture</em> que tu poses TOUT AUTOUR de ton jardin pour empêcher le chien de sortir. C'est une longueur filaire (en mètres).</li>
          <li><strong>L'Aire :</strong> C'est TOUTE l'herbe à l'intérieur. Ou le carrelage de la piscine. C'est une surface totale (en Mètres Carrés 'm²').</li>
        </ul>
      </Section>

      <Section title="1. Le Périmètre (L'addition des Murs)" icon="StretchHorizontal" color="indigo">
        <p className="mb-4">Calculer un Périmètre d'une figure (Polygone), c'est l'action la plus basique de l'univers : tu ajoutes les Murs un par un.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6">
           <div className="flex-1 w-full order-2 md:order-1">
             <h3 className="font-bold text-indigo-900 dark:text-indigo-100 dark:text-indigo-200">Exemple : Le Champ Cabossé</h3>
             <ul className="text-sm mt-2 space-y-2 mb-4 bg-card dark:bg-black/40 p-4 rounded-xl border border-indigo-100 font-mono">
               <li>Mur Haut: 4 cm</li>
               <li>Mur Droit: 6 cm</li>
               <li>Mur Bas: 4 cm</li>
               <li>Mur Gauche: 6 cm</li>
               <li className="border-t border-indigo-100 dark:border-indigo-800/60 mt-2 pt-2 text-rose-500 font-black">Périmètre Total = 4 + 6 + 4 + 6 = 20 cm</li>
             </ul>
           </div>
           
           <div className="flex-1 max-w-sm order-1 md:order-2">
             <TipBanner title="Formule du Rectangle" type="info">
               Le Rectangle a ses cotés opposés Égaux !<br/>
               Formule Rapide : <br/>
               <code>(Longueur + Largeur) &times; 2</code><br/>
               <em>(Ex: (6 + 4) * 2 = 10 * 2 = 20 cm !)</em>
             </TipBanner>
             <TipBanner title="Formule du Cercle 🔴" type="warning">
               Il n'a pas de mur droit !<br/>
               Pour trouver la longueur du fil,<br/>on multiplie le Diamètre par la Magie !!<br/>
               <code>Diamètre &times; <MathComponent math={"\\pi"} /> (Pi <MathComponent math={"\\approx 3.14"} />)</code>
             </TipBanner>
           </div>
        </div>
      </Section>

      <Section title="2. L'Aire (La surface au Carré)" icon="Square" color="emerald">
        <p className="mb-4">Pour calculer la surface Intérieure 'posée' au sol, tu ne dois Plus additionner, tu dois faire un quadrillage multiplicatif !</p>

        <div className="space-y-4 my-6">
           <div className="bg-card p-5 rounded border-l-4 border-emerald-500 shadow-sm flex items-center justify-between">
             <div>
               <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Le Rectangle (Quadrillage Total)</h4>
               <p className="text-sm mt-1">Multiplie le Grand Mur par le Petit Mur pour recréer le tapis de carreaux !<br/><strong>Aire = Longueur &times; Largeur</strong>. <em>(Ex 6cm <MathComponent math={"\\times"} /> 4cm = 24 cm²)</em></p>
             </div>
             <div className="font-mono bg-emerald-100 text-emerald-900 dark:text-emerald-100 px-3 py-1 rounded shadow ml-4 text-center">
               <span className="block text-xs">Unité</span>
               <strong>cm²</strong>
             </div>
           </div>

           <div className="bg-card p-5 rounded border-l-4 border-amber-500 shadow-sm">
             <div className="flex justify-between items-center">
               <h4 className="font-bold text-amber-600 dark:text-amber-400">Le Triangle Rectangle (Le Demi-Rectangle)</h4>
             </div>
             <p className="text-sm mt-2">Un triangle rectangle (Avec un Angle droit), c'est EXACTEMENT un Rectangle coupé en Diagonale (la fameuse Dalle de verre coupée en deux) !<br/>Donc Calcule sa Longueur <MathComponent math={"\\times"} /> Largeur, puis <strong>DIVISE PAR 2</strong> son Résultat pour retirer le morceau fantôme !!</p>
           </div>
        </div>
      </Section>

      <Section title="3. Les Conversions au Carré (Double Colonne !)" icon="Droplet" color="blue">
        <p className="mb-4">Alerte Maximum !! Un "mètre carré" ne marche pas comme un Mètre simple.</p>

        <InteractiveExercise 
          title="Convertir 5 m² en cm²"
          question={<>Convertis 5 <strong>mètres carrés</strong> (Une grosse bâche de Tente) en petits <strong>centimètres carrés</strong></>}
          steps={[
            <><strong>1. La Loi Physique :</strong> Quand tu dessines 1 mètre avec tes doigts, oui c'est 100 centimètres de longueur.</>,
            <><strong>2. Mais au Carré ! :</strong> Pour faire UN mètre carré (Surfaces), il faut des centaines et des centaines de carrés alignés en bas et en haut.</>,
            <><strong>3. La Colonne Secrète :</strong> Dans le tableau de conversion <MathComponent math={"m^2"} />, CHAQUE unité (<MathComponent math={"m^2"} />, <MathComponent math={"dm^2"} />, <MathComponent math={"cm^2"} />) <strong>POSSÈDE DEUX SOUS-COLONNES</strong>. M et m !! (Le p'tit deux m² te rappelle "2 colonnes").</>,
            <><strong>4. Le Saut Magique :</strong> Pour aller d'une case (ex: <MathComponent math={"m^2"} />) à la voisine direct (<MathComponent math={"dm^2"} />), il faut pondre DEUX zéros ! Et pour aller encor au <MathComponent math={"cm^2"} />, PONDS 2 Autres zéros !</>,
            <><strong>Finalité :</strong> 5 m² = 500 dm² = <strong>50 000 cm²</strong>. (4 Pièces de Zéros, un bond x100 !!)</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le Périmètre est en cm², Vrai ou Faux ?</>}
            back={<><strong>Faux ! Interdit.</strong><br/>Le périmètre est la Clôture, le Lacet, c'est juste le trait 1D qu'on étire. Il est en "Mètres (m)" ou "centimètres (cm)" simples sans petit '2' magique en haut !</>}
          />
          <Flashcard 
            front={<>J'ai un rectangle de 10m de long et 2m de large. Donne son Périmètre, et son Aire !</>}
            back={<><strong>Périmètre = 24m, Aire = 20m²</strong><br/>Périmètre : (10+2) * 2 = 12 * 2 = 24 mètres de fil.<br/>Aire : 10 * 2 = 20 Mètres-carrés de moquette.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "J'ai un champ avec une forme PÉTÉE, pleine de zig-zag sans formule. Comment tu trouves le perimètre ?",
              answer: "L'arme absolu : J'ADDITIONNE MANUELLEMENT TOUS LES COTÉS avec mon oeil ! S'il y a 8 cotés en zigzag (ex: 3m, 2m, 5m, 1m..). Je fais 3+2+5+1... Sans me prendre la tête ! C'est le tour des murs."
            },
            {
              question: "Si j'ai un Rectangle, je peux additionner longueur + largeur, et c'est bon pour le périmètre ?",
              answer: "TU AS OUBLIE LA MOITIÉ DE TON CHATEAU !! (L+l) ne correspond qu'a 'un L', tu n'as fait que la Bas, et la Droite du Mur ! Tu laisses le Haut et la Gauche vide ?. Il FAUT Multiplier cette somme par * 2 pour tout fermer !!"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Convertis 12 dm² en cm² :",
              options: [
                "120 cm² (Un bon x10 des familles !)",
                "1 200 cm² (Puisque on est au 'carré', on rajoute de 2 zéros par colonnes).",
                "1,2 cm²"
              ],
              correctAnswer: 1,
              explanation: "Top Suprême !! 'Carré(2)' = 'Les Cases valent DOUBLE Zéros'. Le tableau bondit en x100 par palier. Donc 12 dm² devient 1200 cm²."
            },
            {
              question: "C'est quoi l'Aire d'un triangle RECTANGLE de 4cm de haut, et 6cm de longueur ?",
              options: [
                "4 × 6 = 24 cm²",
                "10 cm²",
                "(4 × 6) divisé par 2 = 12 cm²"
              ],
              correctAnswer: 2,
              explanation: "Magnifique !! C'est la Boite coupée en Deux !! On calcule la plaque totale du rectangle (4x6=24). Et ON DIVISE PAR DEUX !! Ce qui donne 12."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Périmètre : Clôture (m) | Aire : Surface de Carrelage (m²).",
            "Toujours diviser par 2 si on demande l'Aire du triangle.",
            "Conversion de Surface : 2 colonnes secrètes par Unité. Les bonds se font par 2 Zéros (x100) !"
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

export default Course_College_6eme_07_Perimetres_Aires;
