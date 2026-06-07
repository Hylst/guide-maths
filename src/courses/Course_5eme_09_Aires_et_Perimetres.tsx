import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, FormulaBox, InteractiveExercise
} from '../components/SharedUI';

const Course_5eme_09_Aires_et_Perimetres: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-AIR"
        title="Aires et Périmètres"
        subtitle="Le monde de la surface et de la clôture."
        duration="40 min"
      />

      <Section title="⚠️ Introduction : Clôture vs Peinture" icon="🎨" color="rose">
        <p>
          L'erreur absolue, la tragédie classique... Confondre l'aire et le périmètre.
        </p>
        <p className="mt-2">
          Imagine que tu as un magnifique jardin. Le <strong>Périmètre</strong>, c'est la longueur de la clôture qu'il faut acheter pour empêcher les loups d'entrer. C'est le <strong>contour</strong>. L'<strong>Aire</strong>, c'est la surface de gazon que tu vas devoir tondre (ou l'espace intérieur que tu veux peindre).
        </p>
        
        <InfoBlock type="definition" title="Unités de Mesure : Le Grand Piège">
          Un périmètre se mesure en "simple distance" : <strong>cm, m, km</strong>. <br/>
          Une aire se mesure en "carrés d'espace" (longueur × largeur) : <strong>cm², m², km²</strong>. <br/>
          Si tu donnes l'aire de ton salon en mètres tout court, le vendeur de carrelage pleurera.
        </InfoBlock>
      </Section>

      <Section title="📜 Le Grimoire des Formules" icon="🧮" color="slate">
        <p className="mb-4">Voici le recueil sacré des surfaces à connaître par cœur. Le Rectangle est le père de toutes les autres formules.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Le Rectangle"
            formula={<>Aire = Longueur × largeur <br/><span className="text-sm opacity-80">(A = L × l)</span></>}
          />
          <FormulaBox 
            title="Le Carré (Le Rectangle Parfait)"
            formula={<>Aire = côté × côté <br/><span className="text-sm opacity-80">(A = c × c ou A = c²)</span></>}
          />
          <FormulaBox 
            title="Le Parallélogramme (Le Rectangle Penché)"
            formula={<>Aire = Base × Hauteur <br/><span className="text-sm opacity-80">(Attention : la hauteur est prise DROIte, à 90°, pas penchée !)</span></>}
          />
          <FormulaBox 
            title="Le Triangle (Le Demi-Rectangle)"
            formula={<>Aire = (Base × Hauteur) ÷ 2 <br/><span className="text-sm opacity-80">(C'est littéralement la moitié d'un quadrilatère !)</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Périmètre vs Aire : Le Duel" icon="⚖️" color="purple">
        <Accordion title="Le Paradoxe : Même Périmètre, Aires Différentes">
          <div className="p-4 space-y-4">
            <p>
              Prends une ficelle de <strong>20 cm</strong> fermée (Périmètre = 20).
            </p>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
              <li>Si tu fais un rectangle très fin de 9 cm sur 1 cm : <br/>
                Périmètre = 9+1+9+1 = 20 cm. <br/>
                Aire = 9 × 1 = <strong className="text-rose-600 dark:text-rose-400">9 cm²</strong>. (Très peu d'espace)
              </li>
              <li>Si tu fais un carré de 5 cm sur 5 cm : <br/>
                Périmètre = 5+5+5+5 = 20 cm. <br/>
                Aire = 5 × 5 = <strong className="text-emerald-600 dark:text-emerald-400">25 cm²</strong>. (Presque 3 fois plus grand !)
              </li>
            </ul>
            <p className="font-bold text-indigo-900 dark:text-indigo-100">Conclusion : Pour un même périmètre, le Cordon a une surface très faible, alors que le Carré offre une immense surface intérieure.</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🧠 Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Le Piège du Triangle"
          question={<p>J'ai un triangle dont la base fait 8 cm. Le côté "penché" fait 6 cm et la hauteur (qui tombe à l'équerre) fait 5 cm. Comment calcules-tu son aire ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Choisir la bonne formule</p>
              <p>La formule c'est l'Aire du Rectangle divisée par 2 : (Base × Hauteur) / 2.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Esquiver le piège</p>
              <p>On n'a absolument pas besoin de la longueur "penchée" de 6 cm pour l'Aire. On a juste besoin de la Hauteur perpendiculaire (5 cm) !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : (8 × 5) / 2 = 40 / 2 = 20 cm² !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes de Survie" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Comment calcule-t-on l'Aire d'un <strong>Triangle</strong> ?</>}
            back={<><strong>(Base × Hauteur) ÷ 2</strong> <br/><br/><span className="text-sm">Parce que c'est toujours la moitié d'un rectangle/parallélogramme complet.</span></>}
          />
          <Flashcard 
            front={<>Dans un parallélogramme, avec quoi faut-il multiplier la Base ?</>}
            back={<>Avec la <strong>Hauteur</strong> (le segment droit qui tombe à 90°). Surtout pas avec le "côté penché" !</>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur d'Estimation" icon="🕹️" color="indigo">
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

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
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
              question: "Quelle est l'unité de mesure d'un Périmètre ?",
              options: [
                "Le mètre carré (m²)",
                "Le mètre cube (m³)",
                "Le mètre simple (m)"
              ],
              correctAnswer: 2,
              explanation: "Le périmètre est une simple ligne, une longueur déroulée. Donc c'est du m, cm, km."
            },
            {
              question: "On a un triangle défini par sa base B = 6 cm. Sa hauteur H correspondante tombe à pic avec H = 4 cm. Son côté penché vaut 5 cm. Quelle est son aire ?",
              options: [
                "12 cm²",
                "24 cm²",
                "15 cm²"
              ],
              correctAnswer: 0,
              explanation: "(Base × Hauteur) / 2. Attention au panneau 'côté penché' ! On s'en fiche pour l'aire ! (6 × 4) / 2 = 24 / 2 = 12 cm²."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je fais la différence mortelle entre Aire (surface/peinture/m²) et Périmètre (contour/clôture/m).",
            "Je connais l'aire du rectangle : L × l.",
            "Je connais l'aire pure du triangle : (B × H) / 2.",
            "Je sais que pour l'aire d'un parallélogramme/triangle, il faut prendre la Hauteur (Ligne droite) et JAMAIS la longueur du côté oblique."
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

export default Course_5eme_09_Aires_et_Perimetres;
