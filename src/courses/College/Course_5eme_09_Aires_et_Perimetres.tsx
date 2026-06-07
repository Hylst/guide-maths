import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, FormulaBox, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_09_Aires_et_Perimetres: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Rectangle interactive dimensions
  const [lengthVal, setLengthVal] = useState<number>(8); // 8m
  const [widthVal, setWidthVal] = useState<number>(5); // 5m

  const perimeter = 2 * (lengthVal + widthVal);
  const area = lengthVal * widthVal;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-AIR"
        title="Aires et Périmètres"
        subtitle="Le monde de la surface, du contour, et des pièges d'unités de mesure."
        duration="40 min"
        level="5ème Collège"
        prerequisites={["Opérations arithmétiques", "Savoir utiliser une règle"]}
        objectives={[
          "Distinguer clairement le périmètre (contour) de l'aire (surface)",
          "Appliquer les formules d'aires fondamentales (rectangle, carré, triangle, parallélogramme)",
          "Convertir judicieusement les unités de longueur et d'aire",
          "Calculer l'aire de figures composées complexes"
        ]}
      />

      <Section title="⚠️ Peinture vs Clôture (L'erreur absolue)" icon="🎨" color="rose">
        <p className="lead text-lg">
          La confusion entre l'aire et le périmètre est un piège classique de géométrie.
        </p>
        <p className="mt-4">
          Le <strong>périmètre</strong> est la longueur totale du contour d'une figure (ex: une barrière de clôture se mesurant en mètres <b>m</b>). <br/>
          L'<strong>aire</strong> représente la superficie de l'espace à l'intérieur de la figure (ex : du gazon à tondre se mesurant en mètres carrés <b>m²</b>).
        </p>

        {/* Real-time interactive rectangle simulator */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm text-center">
          <h4 className="font-bold text-lg mb-2 text-rose-800 dark:text-rose-400">Interactif : Ajuster la surface en Temps Réel</h4>
          <p className="text-sm text-slate-500 mb-6">Fais glisser les dimensions pour comparer l'évolution de la barrière (périmètre) et du gazon (aire).</p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span>Longueur (L) :</span>
                <input 
                  type="range" 
                  min="3" 
                  max="12" 
                  value={lengthVal} 
                  onChange={(e) => setLengthVal(parseInt(e.target.value))}
                  className="w-28 accent-rose-600"
                />
                <span>{lengthVal} m</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Largeur (l) :</span>
                <input 
                  type="range" 
                  min="2" 
                  max="9" 
                  value={widthVal} 
                  onChange={(e) => setWidthVal(parseInt(e.target.value))}
                  className="w-28 accent-rose-600"
                />
                <span>{widthVal} m</span>
              </div>
            </div>

            <svg className="w-full max-w-sm h-48 border border-slate-100 rounded-2xl bg-slate-50 dark:bg-slate-900" viewBox="0 0 300 180">
              {/* Scale grid helper */}
              <defs>
                <pattern id="grid-air" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-800" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-air)" />

              {/* Draw Rectangle using dimensions. Center point reference: 150, 90 */}
              <rect 
                x={150 - (lengthVal * 15) / 2} 
                y={90 - (widthVal * 15) / 2} 
                width={lengthVal * 15} 
                height={widthVal * 15} 
                fill="#3b82f6" 
                fillOpacity="0.15" 
                stroke="#1d4ed8" 
                strokeWidth="3" 
              />
              
              {/* Inside Grid Tiles representation of area */}
              {Array.from({ length: lengthVal }).map((_, col) => 
                Array.from({ length: widthVal }).map((_, row) => (
                  <rect 
                    key={`${col}-${row}`}
                    x={150 - (lengthVal * 15) / 2 + col * 15} 
                    y={90 - (widthVal * 15) / 2 + row * 15} 
                    width="15" 
                    height="15" 
                    fill="none" 
                    stroke="#1d4ed8" 
                    strokeWidth="0.5" 
                    strokeOpacity="0.3"
                  />
                ))
              )}
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-red-50 dark:bg-rose-950/20 p-4 rounded-2xl text-center border border-red-200">
                <span className="text-xs uppercase font-extrabold tracking-widest text-rose-500">Périmètre (Contour)</span>
                <div className="text-2xl font-black text-rose-700 dark:text-rose-400 mt-1">{perimeter} m</div>
                <div className="text-xs font-mono text-slate-500 mt-1">2 × ({lengthVal} + {widthVal})</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-2xl text-center border border-blue-200">
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-500">Aire (Surface)</span>
                <div className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">{area} m²</div>
                <div className="text-xs font-mono text-slate-500 mt-1">{lengthVal} × {widthVal} carrelages</div>
              </div>
            </div>
          </div>
        </div>

        <InfoBlock type="reminder" title="Unités et carrés théoriques">
          Une aire correspond à un comptage d'un nombre de carrés unitaires de dimension 1m par 1m. Ainsi, l'unité est une surface élevée au carré (cm², m², km²). Ne jamais omettre l'unité dans ta rédaction !
        </InfoBlock>
      </Section>

      <Section title="📜 La Grande Bibliothèque des Formules" icon="🧮" color="slate">
        <p className="mb-4">Voici le recueil sacré des surfaces fondamentales à connaître par cœur en classe de 5ème :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Le Rectangle"
            formula={<>Aire = Longueur × largeur <br/><span className="text-sm font-semibold opacity-75">(A = L × l)</span></>}
          />
          <FormulaBox 
            title="Le Triangle"
            formula={<>Aire = (Base × Hauteur) ÷ 2 <br/><span className="text-sm font-semibold opacity-75">(C'est la moitié de la surface d'un rectangle !)</span></>}
          />
          <FormulaBox 
            title="Le Carré"
            formula={<>Aire = côté × côté <br/><span className="text-sm font-semibold opacity-75">(A = $c^2$)</span></>}
          />
          <FormulaBox 
            title="Le Parallélogramme"
            formula={<>Aire = Base × Hauteur <br/><span className="text-sm font-semibold opacity-75">(Base × Hauteur prise à angle droit)</span></>}
          />
        </div>

        <TipBanner type="success" title="Le Piège du triangle et de la hauteur">
          Dans un triangle comme un parallélogramme, la hauteur est toujours le segment de droite <strong>perpendiculaire</strong> (qui tombe à angle droit). Ne multiplie jamais par un côté oblique sous prétexte qu'il fait partie du contour extérieur !
        </TipBanner>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle formule donne l'Aire d'un <strong>Parallélogramme</strong> ?</>}
            back={<><strong>Base × Hauteur</strong> (hauteur mesurée perpendiculairement).</>}
          />
          <Flashcard 
            front={<>Quel est le périmètre d'un cercle de rayon $R$ ?</>}
            back={<><strong>$2 \times \pi \times R$</strong> (couramment appelé circonférence).</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Le panneau déguisé"
          question="Un triangle a une base de 10 cm. Le côté penché mesure 6 cm, et la hauteur perpendiculaire correspondante fait 4 cm. Quelle est son aire ?"
          steps={[
            "J'écris la formule d'aire du triangle : Aire = (Base × Hauteur) / 2.",
            "J'effectue le choix des dimensions : j'esquive le piège du côté penché (6 cm) et je retiens seulement la base (10 cm) et la hauteur (4 cm).",
            "Je calcule : (10 × 4) / 2 = 40 / 2 = 20 cm². L'aire de ce triangle vaut exactement <strong>20 cm²</strong>."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Le double clôturage"
          question="Un fermier veut border d'une clôture un terrain carré ayant 15 m de côté. Combien de mètres de barrières doit-il commander ?"
          steps={[
            "Il cherche à délimiter le contour du terrain, c'est donc un calcul de périmètre (P).",
            "La formule de périmètre d'un carré est : P = 4 × côté.",
            "Je calcule : P = 4 × 15 = 60 m. Le fermier doit commander exactement <strong>60 m</strong> de barrières."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'aire d'un triangle ressemble à la moitié d'un rectangle ?",
              answer: "Si tu dupliques un triangle et que tu positionnes la copie à l'envers sur un des côtés, tu obtiens un parallélogramme complet de même base et hauteur. Sa surface vaut Base × Hauteur. Donc un seul triangle vaut la moitié de cette valeur !"
            },
            {
              question: "Comment convertir des cm² en m² ?",
              answer: "1 mètre fait 100 cm. Donc 1 m² fait 100 cm × 100 cm = 10 000 cm². Il faut diviser par 10 000 pour convertir des cm² en m²."
            },
            {
              question: "La formule de l'aire du cercle vaut-elle la même chose que le périmètre ?",
              answer: "Non, l'aire d'un disque vaut pi × R² (pense au carré pour l'unité de surface). Le périmètre vaut 2 × pi × R (pense à la distance unitaire)."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Simulateur d'Estime" icon="🕹️" color="indigo">
        <p className="mb-4">Démontre ta maîtrise de l'espace et des limites :</p>
        <FillInTheBlanks 
          id="aire-eval"
          content={[
            "J'ai un rectangle de 10m de long et 4m de large. Si je veux faire le tour pour clôturer, je dois calculer le ",
            { options: ["périmètre", "carré", "volume"], correctAnswer: 0 },
            ". Le calcul est 10 + 4 + 10 + 4, ce qui donne ",
            { options: ["40m", "28m", "14m"], correctAnswer: 1 },
            ". Maintenant, je veux planter de l'herbe à l'intérieur. Je calcule l'aire. L'aire fait donc ",
            { options: ["40m²", "28m²", "14m²"], correctAnswer: 0 },
            ". Attention, l'unité est bien en ",
            { options: ["mètres cubiques", "mètres carrés", "mètres"], correctAnswer: 1 },
            "."
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Un champ rectangulaire mesure 7 km de longueur et 2 km de largeur. Quelle est son aire ?",
              options: [
                "14 km²",
                "18 km",
                "9 km²"
              ],
              correctAnswer: 0,
              explanation: "Longueur × largeur = 7 × 2 = 14 km²."
            },
            {
              question: "Qu'est-ce qu'une hauteur d'un triangle ?",
              options: [
                "La ligne reliant deux sommets opposés.",
                "Un segment perpendiculaire à un côté, passant par le sommet opposé à ce côté.",
                "La plus longue des bordures de la figure."
              ],
              correctAnswer: 1,
              explanation: "C'est la définition absolue d'une hauteur : une droite perpendiculaire à une base s'élevant jusqu'au sommet d'en face."
            },
            {
              question: "Une aire s'exprime dans l'un des cas suivants :",
              options: [
                "En mètres cubes (m³)",
                "En centimètres (cm)",
                "En centimètres carrés (cm²)"
              ],
              correctAnswer: 2,
              explanation: "Une superficie/aire s'exprime toujours dans des dimensions au carré (cm², m², km²)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je fais la différence absolue entre Aire (surface/peinture/m²) et Périmètre (contour/clôture/m).",
            "Je connais l'aire d'un rectangle d'après la formule L × l.",
            "Je connais l'aire d'un triangle d'après la formule (B × H) / 2.",
            "Je comprends qu'une hauteur se mesure toujours perpendiculairement."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
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

export default Course_5eme_09_Aires_et_Perimetres;
