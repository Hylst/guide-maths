import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Square, StretchHorizontal, Droplet, Hexagon, Sliders, Box } from 'lucide-react';

const AreaPerimeterVisualizer: React.FC = () => {
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(4);

  const perimeter = (width + height) * 2;
  const area = width * height;

  return (
    <div className="bg-emerald-50/40 dark:bg-emerald-950/20 p-6 md:p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-900 my-8 shadow-sm">
      <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-lg mb-4 flex items-center gap-2">
        <Square className="text-emerald-500 w-5 h-5 animate-pulse" />
        Lab' Interactif : Jardin à Clôturer &amp; Carreler
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Fais glisser les réglettes pour configurer les dimensions du jardin (Longueur &amp; Largeur). Observe comment le périmètre (la clôture de contour) et la surface (les blocs d'aire internes à carreler) évoluent séparément !
      </p>

      {/* Control sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Longueur (L) : <span className="text-indigo-600 dark:text-indigo-400 text-lg font-black">{width} m</span>
          </label>
          <input 
            type="range" min="3" max="10" value={width} 
            onChange={(e) => setWidth(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-border">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Largeur (l) : <span className="text-emerald-600 dark:text-emerald-400 text-lg font-black">{height} m</span>
          </label>
          <input 
            type="range" min="2" max="6" value={height} 
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-950/60 flex flex-col md:flex-row items-center gap-10 justify-center">
        {/* SVG Drawing area */}
        <div className="w-64 h-48 flex-shrink-0">
          <svg viewBox="0 0 240 180" className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-xl border border-border p-2">
            {/* Draw Area tiles Grid within boundaries */}
            {Array.from({ length: width }).map((_, col) => (
              Array.from({ length: height }).map((_, row) => (
                <rect 
                  key={`${col}-${row}`}
                  x={(col * 20) + 15}
                  y={(row * 20) + 15}
                  width="18"
                  height="18"
                  fill="#10b981"
                  fillOpacity="0.15"
                  stroke="#10b981"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
              ))
            ))}

            {/* Outline fence line (Perimeter) with dashed border style */}
            <rect 
              x="15"
              y="15"
              width={width * 20}
              height={height * 20}
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinejoin="round"
              className="stroke-dash-animation"
              strokeDasharray="6 4"
            />

            {/* Scale values indicators */}
            <text x="15" y="10" className="text-[9px] font-bold fill-slate-400 font-sans">0</text>
            <text x={(width * 20) + 15} y="10" className="text-[9px] font-bold fill-slate-400 font-sans">{width} m</text>
            <text x="2" y={(height * 20) + 18} className="text-[9px] font-bold fill-slate-400 font-sans">{height} m</text>
          </svg>
        </div>

        {/* Real-time Math formulas */}
        <div className="space-y-4">
          {/* PERIMETER */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-indigo-150 relative">
            <span className="text-[10px] uppercase font-black text-indigo-500 tracking-wider">CONTOUR (PÉRIMÈTRE)</span>
            <div className="text-xl font-bold font-mono mt-1 text-slate-800 dark:text-slate-100">
              P = (L + l) &times; 2
            </div>
            <div className="text-sm font-mono text-indigo-600 font-bold">
              ({width} + {height}) &times; 2 = <span className="text-lg font-black">{perimeter} mètres (m)</span>
            </div>
          </div>

          {/* AREA */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-emerald-150 relative">
            <span className="text-[10px] uppercase font-black text-emerald-500 tracking-wider">SURFACE (AIRE)</span>
            <div className="text-xl font-bold font-mono mt-1 text-slate-800 dark:text-slate-100">
              A = L &times; l
            </div>
            <div className="text-sm font-mono text-emerald-600 font-bold">
              {width} &times; {height} = <span className="text-lg font-black">{area} m²</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        prerequisites={["Multiplications simples", "Connaissance des unités de mesure (m, cm, km)"]}
        objectives={[
          "Faire la différence absolue entre le Contour (Périmètre) et la Surface (Aire).",
          "Calculer l'Aire d'un Rectangle et d'un Triangle Rectangle.",
          "Mémoriser l'Unité au carré (cm²) et le tableau de conversion magique."
        ]}
      />

      <Section title="🌟 Introduction : Clôture vs Carrelage" icon="🏡" color="slate">
        <p>
          Il y a le pire piège du collège dans ce chapitre. Beaucoup d'élèves confondent 'Périmètre' et 'Aire'. Pour ne jamais te tromper de mission de chantier, pose-toi cette seule question de bon sens :
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong>Le Périmètre :</strong> C'est la <em>clôture</em> que tu poses TOUT AUTOUR de ton jardin pour empêcher le chien de s'échapper. C'est une longueur filaire (en mètres simples : m).</li>
          <li><strong>L'Aire :</strong> C'est TOUTE l'herbe verte à l'intérieur. Ou le carrelage rigide de la piscine. C'est une surface plane totale (en mètres carrés : m²).</li>
        </ul>
        <InfoBlock title="Le saviez-vous ?" type="funfact">
          La lettre grecque {"$\\pi$"} (Pi) est absolument irrationnelle et comporte un nombre infini de chiffres après la virgule ! Elle sert à calculer le périmètre du cercle depuis l'Antiquité. Sans Pi, il est impossible de concevoir la forme des canettes de soda ou de tracer des rond-points équitables.
        </InfoBlock>
      </Section>

      <Section title="1. Le Périmètre (L'addition des Murs)" icon="StretchHorizontal" color="indigo">
        <p className="mb-4">Calculer un Périmètre d'une figure (Polygone), c'est l'action la plus basique de l'univers : tu ajoutes la mesure des murs extérieurs un par un.</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6">
           <div className="flex-1 w-full order-2 md:order-1">
             <h3 className="font-bold text-indigo-900 dark:text-indigo-200">Exemple : Le Champ Cabossé</h3>
             <ul className="text-sm mt-2 space-y-2 mb-4 bg-card dark:bg-black/40 p-4 rounded-xl border border-indigo-100 font-mono">
               <li>Mur Haut: 4 cm</li>
               <li>Mur Droit: 6 cm</li>
               <li>Mur Bas: 4 cm</li>
               <li>Mur Gauche: 6 cm</li>
               <li className="border-t border-indigo-100 dark:border-indigo-800/60 mt-2 pt-2 text-rose-500 font-black">Périmètre Total = 4 + 6 + 4 + 6 = 20 cm</li>
             </ul>
           </div>
           
           <div className="flex-1 max-w-sm order-1 md:order-2 space-y-4">
             <TipBanner title="Formule du Rectangle" type="info">
                Le Rectangle a ses côtés opposés Égaux !<br/>
                Formule Rapide : <br/>
                <strong>(Longueur + Largeur) &times; 2</strong><br/>
                <em>(Ex: (6 + 4) * 2 = 10 * 2 = 20 cm)</em>
             </TipBanner>
             <TipBanner title="Formule du Cercle 🔴" type="warning">
                Il n'a pas de mur droit !<br/>
                Pour trouver la longueur du fil,<br/>on multiplie le Diamètre par la Magie :<br/>
                <strong>Diamètre &times; {"$\\pi$"} (Pi {"$\\approx 3,14$"})</strong>
             </TipBanner>
           </div>
        </div>
      </Section>

      <Section title="2. Notre Laboratoire d'Aires et de Périmètres" icon="Square" color="rose">
        <AreaPerimeterVisualizer />
        <InfoBlock title="Rappel de Base" type="reminder">
          N'oublie jamais de vérifier que toutes les longueurs d'un exercice sont exprimées dans la <strong>même unité</strong> (ex: tout en cm ou tout en m) avant d'effectuer tes calculs d'aire ou de périmètre ! S'il y a un mélange de mètres et de centimètres, il te faut obligatoirement convertir pour harmoniser.
        </InfoBlock>
      </Section>

      <Section title="3. L'Aire (La surface au Carré)" icon="Square" color="emerald">
        <p className="mb-4">Pour calculer la surface Intérieure 'posée' au sol, tu ne dois plus additionner, tu dois faire un quadrillage multiplicatif !</p>

        <div className="space-y-4 my-6">
           <div className="bg-card p-5 rounded border-l-4 border-emerald-500 shadow-sm flex items-center justify-between">
             <div>
               <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Le Rectangle (Quadrillage Total)</h4>
               <p className="text-sm mt-1">Multiplie le Grand de devant par la Largeur latérale pour recréer le tapis de carreaux !<br/><strong>Aire = Longueur &times; Largeur</strong>. <em>(Ex : 6cm &times; 4cm = 24 cm²)</em></p>
             </div>
             <div className="font-mono bg-emerald-100 text-emerald-950 px-3 py-1 rounded shadow ml-4 text-center">
               <span className="block text-xs">Unité</span>
               <strong>cm²</strong>
             </div>
           </div>

           <div className="bg-card p-5 rounded border-l-4 border-amber-500 shadow-sm">
             <div className="flex justify-between items-center">
               <h4 className="font-bold text-amber-600 dark:text-amber-400">Le Triangle Rectangle (Le Demi-Rectangle)</h4>
             </div>
             <p className="text-sm mt-2">Un triangle rectangle (qui détient un Angle droit), c'est EXACTEMENT un Rectangle coupé en deux par sa Diagonale !<br/>Calcule la Longueur &times; Largeur (murs perpendiculaires), puis <strong>DIVISE PAR 2</strong> ton Résultat pour enlever la part fantôme !</p>
           </div>
        </div>
      </Section>

      <Section title="4. Les Conversions au Carré (Double Colonne !)" icon="Droplet" color="blue">
        <p className="mb-4">Alerte Maximum !! Un 'mètre carré' ne marche pas comme un Mètre linéaire simple.</p>

        <InteractiveExercise 
          title="Convertir 5 m² en cm²"
          question={<>Convertis 5 <strong>mètres carrés</strong> (Une grosse bâche de Tente) en petits <strong>centimètres carrés</strong></>}
          steps={[
            <><strong>1. La Loi de Longueur :</strong> Quand tu dessines 1 mètre avec tes doigts, oui c'est 100 centimètres de longueur.</>,
            <><strong>2. Mais en Surface ! :</strong> Pour faire UN seul mètre carré (Surfaces), il faut quadriller l'espace par des centaines et des centaines de centimètres carrés alignés en bas et en haut.</>,
            <><strong>3. La Colonne Secrète :</strong> Dans le tableau de conversion des unités de surface (m², dm², cm²), <strong>CHAQUE UNITÉ POSSÈDE DEUX SOUS-COLONNES</strong>. (La petite puissance '²' te sert d'anti-sèche : '2 colonnes par case').</>,
            <><strong>4. Le Saut Magique :</strong> Pour aller d'une case (ex: m²) à sa voisine directe (dm²), il te faut donc rajouter DEUX zéros ! Et pour aller encore au cm², RAJOUTE DEUX nouveaux zéros !</>,
            <><strong>Finalité :</strong> 5 m² = 500 dm² = <strong>50 000 cm²</strong> ! (Un grand bond par multiplication par 10 000).</>
          ]}
        />
      </Section>

      <Section title="📝 Exercices Résolus" icon="✏️" color="emerald">
        <div className="space-y-6">
          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 1 : Périmètre d'un jardin composite</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              On possède un enclos d'école dont les côtés extérieurs s'étendent ainsi : <strong>{"$15 \\text{ m}$"}</strong>, <strong>{"$12 \\text{ m}$"}</strong>, <strong>{"$15 \\text{ m}$"}</strong> et <strong>{"$12 \\text{ m}$"}</strong>. De plus, un portail de 3 mètres de long doit être déduit car on n'y pose pas de grillage. Calcule la longueur exacte de grillage à commander.
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Le périmètre total de cet enclos rectangle est : P = (15 + 12) &times; 2 = 27 &times; 2 = 54 mètres.</li>
                <li>Puisque l'enclos intègre un portail de 3 mètres non grillagé, on déduit cette longueur de notre total.</li>
                <li>Calcul final : 54 - 3 = 51 mètres.</li>
                <li>On doit donc commander précisément <strong>51 mètres</strong> de grillage !</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-emerald-50/30 dark:bg-slate-900 rounded-2xl border border-emerald-100 dark:border-slate-800">
            <h4 className="font-extrabold text-emerald-800 dark:text-emerald-400 text-lg mb-2">Exercice 2 : Aire d'un Triangle de voile</h4>
            <p className="font-medium text-slate-700 dark:text-slate-300">
              Un pavillon de bateau de pêche a la forme d'un triangle rectangle. Les deux côtés du pavillon qui délimitent l’angle droit mesurent respectivement <strong>{"$30 \\text{ cm}$"}</strong> et <strong>{"$50 \\text{ cm}$"}</strong>. Calcule la surface (aire) du tissu de cette voile en cm².
            </p>
            <div className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-emerald-100/60 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Correction étape par étape :</p>
              <ul className="list-decimal pl-5 space-y-1.5">
                <li>Un triangle rectangle est un rectangle coupé en diagonale par le milieu.</li>
                <li>On calcule en premier la surface de son rectangle imaginaire hôte : 30cm &times; 50cm = 1 500 cm².</li>
                <li>On applique la division par deux pour ne garder que la surface de notre voile réelle : 1 500 / 2 = 750 cm².</li>
                <li>L’aire du tissu du pavillon est donc égale à <strong>750 cm²</strong> !</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Le Périmètre est toujours représenté en cm², Vrai ou Faux ?</>}
            back={<><strong>Faux ! Interdit.</strong><br/>Le périmètre est la Clôture, le Lacet de contour, c'est une ligne étirable 1D. Il s'exprime en mètres (m) ou centimètres (cm) simples. Seules les surfaces (Aires) détiennent la puissance de l'unité au carré : cm² ou m² !</>}
          />
          <Flashcard 
            front={<>Un rectangle de 10 m de long et 2 m de large. Donne son Périmètre et son Aire !</>}
            back={<><strong>P = 24 m | A = 20 m² !</strong><br/>Périmètre : (10 + 2) &times; 2 = 12 &times; 2 = 24 mètres de filet.<br/>Aire : 10 &times; 2 = 20 mètres-carrés de toile.</>}
          />
          <Flashcard 
            front={<>Que vaut le préfixe hectare écrit sur les champs de vaches ?</>}
            back={<>Une unité agraire ! Un hectare (ha) correspond exactement à un carré de 100 mètres de côté, c'est-à-dire une surface de 10 000 m² !</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai une figure bizarre sans formule avec des zigzag, comment trouver son perimètre ?",
              answer: "L'arme absolue : j'additionne manuellement un à un tous ses segments de bordure extérieure ! S'il y a 8 côtés, tu fais la somme de ces 8 longueurs d'encre."
            },
            {
              question: "Si j'ai un Rectangle, puis-je juste calculer Longueur + Largeur ?",
              answer: "TU AS OUBLIÉ LA MOITIÉ DE TON ENCLOS ! En ne calculant que Longueur + Largeur, tu n'as fermé que deux côtés du jardin (le bas et la droite). Il faut multiplier ce résultat par 2 pour couvrir et clôturer la fermeture totale !"
            },
            {
              question: "Pourquoi l'aire du triangle rectangle nécessite-t-elle de diviser par deux ?",
              answer: "Parce que deux triangles rectangles identiques imbriqués par leur diagonale constituent un rectangle total dont l'aire vaut Longueur &times; Largeur. Le vôtre ne représentant que la moitié, sa surface doit être divisée par 2 !"
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
                "120 cm² (Un bon x10 classique !)",
                "1 200 cm² (Comme on est au carré, on rajoute deux zéros par palier d'unité).",
                "1,2 cm²"
              ],
              correctAnswer: 1,
              explanation: "Top Suprême !! Le carré '²' entraîne le décalage de deux zéros par colonne de surface dans ton tableau. Donc 12 dm² devient 1 200 cm²."
            },
            {
              question: "Calcule l'Aire d'un triangle rectangle de 4 cm de hauteur, et 6 cm de base :",
              options: [
                "4 &times; 6 = 24 cm²",
                "10 cm²",
                "(4 &times; 6) / 2 = 12 cm²"
              ],
              correctAnswer: 2,
              explanation: "Magnifique ! C'est la boîte de rectangle virtuelle coupée par sa moitié. 4 &times; 6 = 24, puis on divise par deux pour obtenir 12 cm²."
            },
            {
              question: "Un carré possède un côté de 5 cm. Quelle est sa surface d'aire en cm² ?",
              options: [
                "20 cm²",
                "25 cm²",
                "50 cm²"
              ],
              correctAnswer: 1,
              explanation: "Génial ! La formule d'aire du carré est Côté &times; Côté. Donc 5 &times; 5 = 25 cm² !"
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
