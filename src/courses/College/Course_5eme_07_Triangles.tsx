import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, StepList, TipBanner, InteractiveExercise, FormulaBox
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_07_Triangles: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Triangle sides interactive state
  const [sideA, setSideA] = useState<number>(70);
  const [sideB, setSideB] = useState<number>(60);
  const baseC = 100; // Fixed base length (px for display)

  const isPossible = (sideA + sideB) > baseC;
  const isFlat = (sideA + sideB) === baseC;

  // Trigonometry helper for drawing the triangle point (x, y) if possible
  // Using law of cosines: cos_alpha = (b^2 + c^2 - a^2) / (2bc)
  const a2 = sideA * sideA;
  const b2 = sideB * sideB;
  const c2 = baseC * baseC;
  const cosAlpha = (b2 + c2 - a2) / (2 * sideB * baseC);
  
  let pointX = 150;
  let pointY = 150;
  if (isPossible && Math.abs(cosAlpha) <= 1) {
    const alpha = Math.acos(cosAlpha);
    pointX = 150 + sideB * Math.cos(alpha);
    pointY = 150 - sideB * Math.sin(alpha);
  } else {
    // Flat or impossible rendering values
    pointX = 150 + (sideB / (sideA + sideB || 1)) * baseC;
    pointY = 150;
  }

  // Angle sum state interactive demo
  const [angleX, setAngleX] = useState<number>(55);
  const [angleY, setAngleY] = useState<number>(65);
  const angleZ = 180 - angleX - angleY;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-TRI"
        title="Les Triangles"
        subtitle="Construire l'impossible, maîtriser l'Inégalité Triangulaire et percer la magie des 180°."
        duration="45 min"
        level="5ème Collège"
        prerequisites={["Utilisation du compas et du rapporteur", "Tracer des segments"]}
        objectives={[
          "Comprendre et appliquer l'Inégalité Triangulaire",
          "Construire un triangle à partir de ses 3 longueurs de côtés",
          "Utiliser le théorème de la somme des angles d'un triangle (180°)",
          "Distinguer les hauteurs, médiatrices et droites remarquables d'un triangle"
        ]}
      />

      <Section title="⚠️ Le Droit d'Exister (L'Inégalité Triangulaire)" icon="⚔️" color="rose">
        <p className="lead text-lg">
          On ne peut pas dessiner un triangle avec n'importe quelles longueurs !
        </p>
        <p className="mt-4">
          Dans tout triangle, <strong>la longueur de chaque côté doit être inférieure à la somme des longueurs des deux autres côtés</strong>. Si le plus grand côté dépasse cette somme, les côtés ne se rejoignent jamais : le triangle est impossible !
        </p>

        {/* Real-time interactive canvas showing triangle formation / collapse */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm text-center">
          <h4 className="font-bold text-lg mb-2 text-rose-800 dark:text-rose-400">Interactif : L'Inégalité Triangulaire d'un Clic</h4>
          <p className="text-sm text-slate-500 mb-6">Fais varier les longueurs pour tenter de relier les trois côtés.</p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span>Côté A (gauche) :</span>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  value={sideB} 
                  onChange={(e) => setSideB(parseInt(e.target.value))}
                  className="w-28 accent-rose-600"
                />
                <span>{sideB} cm</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Côté B (droite) :</span>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  value={sideA} 
                  onChange={(e) => setSideA(parseInt(e.target.value))}
                  className="w-28 accent-rose-600"
                />
                <span>{sideA} cm</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded">
                <span>Base (fixé) : {baseC} cm</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="text-lg font-bold">
                A + B = {sideB + sideA} cm :{' '}
                {isPossible ? (
                  <span className="text-emerald-600"> {sideB + sideA} &gt; {baseC} → Triangle Constructible ! ✅</span>
                ) : isFlat ? (
                  <span className="text-amber-500"> {sideB + sideA} = {baseC} → Triangle Plat (Points alignés) ! ⚠️</span>
                ) : (
                  <span className="text-rose-650 font-bold"> {sideB + sideA} &lt; {baseC} → Impossible (Toit effondré) ! ❌</span>
                )}
              </div>
            </div>

            <svg className="w-full max-w-sm h-48 border border-slate-100 rounded-2xl bg-slate-100 dark:bg-slate-900" viewBox="0 0 400 200">
              {/* Base line (150, 150) to (250, 150) */}
              <line x1="150" y1="150" x2="250" y2="150" stroke="#334155" strokeWidth="4" />
              <text x="135" y="155" className="text-xs font-bold" fill="#334155">B</text>
              <text x="255" y="155" className="text-xs font-bold" fill="#334155">C</text>
              <text x="195" y="168" className="text-xs font-bold" fill="#334155">Base (100)</text>

              {/* Green connection if possible, otherwise red/orange split draw */}
              {isPossible ? (
                <g>
                  <line x1="150" y1="150" x2={pointX} y2={pointY} stroke="#10b981" strokeWidth="3" />
                  <line x1="250" y1="150" x2={pointX} y2={pointY} stroke="#10b981" strokeWidth="3" />
                  <circle cx={pointX} cy={pointY} r="5" fill="#10b981" />
                  <text x={pointX - 5} y={pointY - 10} className="text-sm font-bold" fill="#1d4ed8">A</text>
                </g>
              ) : (
                <g>
                  {/* Left segment pointing directly at C but short */}
                  <line x1="150" y1="150" x2={150 + sideB} y2="150" stroke="#f43f5e" strokeWidth="3" />
                  {/* Right segment pointing directly at B but short */}
                  <line x1="250" y1="150" x2={250 - sideA} y2="150" stroke="#f43f5e" strokeWidth="3" />
                  <circle cx={150 + sideB} cy="150" r="4" fill="#f43f5e" />
                  <circle cx={250 - sideA} cy="150" r="4" fill="#f43f5e" />
                  <text x="190" y="135" className="text-xs font-bold text-rose-600" fill="#f43f5e">Rupture</text>
                </g>
              )}
            </svg>
          </div>
        </div>

        <FormulaBox title="Cas d'égalité ou Triangle Plat" math={"AB + BC = AC \\iff B \\in [AC]"} />
      </Section>

      <Section title="🔮 Les Angles de la sainte Trinité" icon="✨" color="purple">
        <p className="mb-4">
          Dans n'importe quel triangle plat ou surélevé, un secret absolu régit les coins intérieurs :
        </p>

        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950/40 dark:to-indigo-950/40 border border-purple-100 dark:border-purple-900 text-indigo-950 dark:text-indigo-100 p-8 rounded-[2rem] shadow-sm text-center text-xl lg:text-2xl font-bold">
          La somme des mesures des trois angles d'un triangle fait toujours exactement 180° !
        </div>

        {/* Dynamic angle calculator demo */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm">
          <h4 className="font-bold text-center text-lg mb-4 text-purple-850 dark:text-purple-300">Simulateur d'Angles d'un Triangle</h4>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-rose-600">Angle A :</span>
                <input 
                  type="range" 
                  min="10" 
                  max="140" 
                  value={angleX} 
                  onChange={(e) => {
                    const nextVal = parseInt(e.target.value);
                    if (nextVal + angleY < 180) setAngleX(nextVal);
                  }}
                  className="w-28 accent-rose-600"
                />
                <span>{angleX}°</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-600">Angle B :</span>
                <input 
                  type="range" 
                  min="10" 
                  max="140" 
                  value={angleY} 
                  onChange={(e) => {
                    const nextVal = parseInt(e.target.value);
                    if (nextVal + angleX < 180) setAngleY(nextVal);
                  }}
                  className="w-28 accent-emerald-600"
                />
                <span>{angleY}°</span>
              </div>
            </div>

            <div className="text-center font-mono p-4 bg-muted border rounded-2xl w-full max-w-[240px]">
              <span className="text-sm text-slate-500 font-bold block uppercase mb-2">Calcul du 3ème angle (C) :</span>
              <div className="text-xl font-bold text-indigo-650">
                180° - ({angleX}° + {angleY}°)
              </div>
              <div className="text-3xl font-black text-indigo-800 mt-2">
                = {angleZ}°
              </div>
            </div>
          </div>
        </div>

        <TipBanner type="info" title="Trois Triangles Particuliers">
          - <strong>Rectangle :</strong> Possède un angle droit (90°). Ses deux autres angles sont aigus et complémentaires (somme = 90°).<br/>
          - <strong>Isocèle :</strong> Possède deux côtés égaux et ses deux angles à la base sont parfaitement de même mesure.<br/>
          - <strong>Équilatéral :</strong> Possède ses trois côtés égaux. Ses trois angles font chacun exactement <strong>$60^\circ$</strong>.
        </TipBanner>
      </Section>

      <Section title="🛠️ Construction à la Règle et au Compas" icon="🏗️" color="indigo">
        <p className="mb-4">
          Voici les étapes infaillibles pour tracer sur une feuille un triangle ABC dont on donne AB = 8 cm, AC = 6 cm, et BC = 5 cm :
        </p>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">1. La ligne de fondatrice</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On trace à la règle le plus long segment en bas de sa feuille : ici le segment [AB] de 8 cm.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">2. L'Arc de gauche</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On règle le compas sur l'écartement de 6 cm (rayon AC). On pique la pointe sur le point A et on trace un grand arc de cercle léger vers le haut.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">3. Le choc créateur</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              On règle l'écartement du compas sur 5 cm (rayon BC). On pique sur B et on trace un arc qui vient couper le premier. L'intersection est le point C ! Il ne reste qu'à relier AC et BC.
            </p>
          </div>
        </StepList>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Combien mesure chaque angle à l'intérieur d'un triangle équilatéral ?</>}
            back={<>Chaque angle fait exactement <strong>$60^\circ$</strong> ($180^\circ \div 3$).</>}
          />
          <Flashcard 
            front={<>Quel est l'autre nom de la somme des trois longueurs d'un triangle ?</>}
            back={<>Le <strong>périmètre</strong> du triangle.</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Calcul d'un angle mystère"
          question="Dans un triangle ABC, on donne que l'angle A vaut 32° et que l'angle C est un angle droit (90°). Calcule la mesure de l'angle B."
          steps={[
            "J'écris le principe fondamental : la somme des trois angles d'un triangle fait toujours 180° au total (A + B + C = 180).",
            "J'additionne les deux angles connus : 32° + 90° = 122°.",
            "Je soustrais le total connu à 180° : B = 180° - 122° = 58°. L'angle B mesure donc exactement <strong>58°</strong>."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Faisabilité de construction"
          question="Est-il possible de tracer un triangle dont les trois côtés mesurent respectivement 12 cm, 5 cm, et 6 cm ?"
          steps={[
            "J'isole le plus grand côté qui fait office de mesure de référence : c'est 12 cm.",
            "J'effectue la somme des longueurs des deux autres côtés : 5 cm + 6 cm = 11 cm.",
            "Je compare : 12 cm est supérieur à 11 cm. Comme 12 > 11, l'inégalité triangulaire n'est pas vérifiée. Il est <strong>totalement impossible</strong> de tracer ce triangle."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle différence y a-t-il entre une médiatrice et une hauteur ?",
              answer: "Une médiatrice coupe un côté en son milieu et lui est perpendiculaire. Une hauteur part d'un sommet et est perpendiculaire au côté opposé. Elles ne se confondent que dans les triangles isocèles ou équilatéraux !"
            },
            {
              question: "Pourquoi la somme des angles vaut-elle toujours 180° ?",
              answer: "C'est une conséquence du parallélisme. En traçant le parallèle au côté de base passant par le sommet opposé, on s'aperçoit que les angles s'alignent pour former un angle plat parfait !"
            },
            {
              question: "Qu'est-ce qu'une médiane ?",
              answer: "C'est une droite remarquable qui part d'un sommet du triangle et coupe le segment d'en face exactement en son milieu."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Test des Limites" icon="🕹️" color="emerald">
        <p className="mb-4">Complète cette analyse d'expertise géométrique :</p>
        <FillInTheBlanks 
          id="tri-eval"
          content={[
            "J'analyse les dimensions 15cm, 8cm et 6cm. Je vois que le plus grand côté est 15. La somme des deux petits donne ",
            { options: ["14", "23", "2"], correctAnswer: 0 },
            ". Étant donné que 14 est ",
            { options: ["plus grand que 15", "plus petit que 15"], correctAnswer: 1 },
            ", cela signifie que ce triangle est physiquement ",
            { options: ["parfait", "impossible à tracer"], correctAnswer: 1 },
            " ! La règle d'or est brisée. Ensuite, un ami me montre un triangle où les angles valent 90°, 45° et 45°. Je calcule la somme : ",
            { options: ["180°", "190°", "100°"], correctAnswer: 0 },
            ". Oh ! C'est la valeur magique absolue, donc j'en déduis que ce triangle a le droit d'",
            { options: ["exister", "exploser"], correctAnswer: 0 },
            "."
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans quel type de triangle les trois angles mesurent-ils tous exactement 60° ?",
              options: [
                "Le triangle isocèle.",
                "Le triangle équilatéral.",
                "Le triangle rectangle."
              ],
              correctAnswer: 1,
              explanation: "Le triangle équilatéral a 3 côtés égaux et 3 angles égaux de 60° (car 180° ÷ 3 = 60°)."
            },
            {
              question: "Peut-on dessiner un triangle de dimensions 10 cm, 5 cm et 5 cm ?",
              options: [
                "Oui, et c'est un triangle normal.",
                "Oui, les trois points seront alignés (on parle de triangle plat).",
                "Non, c'est impossible."
              ],
              correctAnswer: 1,
              explanation: "La somme des petits côtés est égale au grand (5 + 5 = 10). Les sommets s'alignent parfaitement, formant un segment plat (un triangle plat)."
            },
            {
              question: "Dans le triangle ABC, l'angle A fait 40° et l'angle B fait 80°. Combien d'angles aigus possède ce triangle en tout ?",
              options: [
                "Un seul.",
                "Deux angles.",
                "Trois angles."
              ],
              correctAnswer: 2,
              explanation: "Le troisième angle C vaut 180° - (40° + 80°) = 60°. Les angles mesurent 40°, 60° et 80°. Ils sont tous inférieurs à 90°, les trois angles sont donc aigus (triangle acutangle)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que dans n'importe quel triangle, la somme des trois angles vaut toujours 180°.",
            "Je sais calculer le 3ème angle si on me donne les deux premiers.",
            "Je connais l'Inégalité Triangulaire : Le plus grand côté M DOIT ÊTRE < au Côté1 + Côté2.",
            "Je sais dessiner un triangle proprement avec Règle et Compas (et la croix de l'intersection)."
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

export default Course_5eme_07_Triangles;
