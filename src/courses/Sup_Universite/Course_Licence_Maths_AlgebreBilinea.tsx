import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, AccordionFAQ, Flashcard, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, HelpCircle, Activity } from 'lucide-react';

const Course_Licence_Maths_AlgebreBilinea: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Coefficients of the quadratic form q(x,y) = a*x^2 + b*y^2
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-1);

  // Determine signature (p, q)
  let p = 0; // positive coefficients
  let q = 0; // negative coefficients
  if (coeffA > 0) p++;
  if (coeffA < 0) q++;
  if (coeffB > 0) p++;
  if (coeffB < 0) q++;

  // Determine geometry type
  let geomType = "Inconnu";
  if (coeffA > 0 && coeffB > 0) geomType = "Ellipse réelle (Définie positive)";
  else if (coeffA < 0 && coeffB < 0) geomType = "Cône imaginaire (Définie négative)";
  else if (coeffA * coeffB < 0) geomType = "Hyperbole (Indéfinie)";
  else if (coeffA === 0 && coeffB === 0) geomType = "Espace de Jacob (Tout noyau)";
  else geomType = "Droites parallèles / Parabole dégénérée (Semi-définie)";

  // SVG parameters
  const width = 300;
  const height = 300;
  const cx = width / 2;
  const cy = height / 2;

  // Let's generate points for representing the quadric ax^2 + by^2 = 1
  const renderPath = () => {
    if (coeffA === 0 && coeffB === 0) return null;
    
    // If ellipse: x^2 / (1/a) + y^2 / (1/b) = 1
    if (coeffA > 0 && coeffB > 0) {
      const rx = Math.sqrt(1 / coeffA) * 60;
      const ry = Math.sqrt(1 / coeffB) * 60;
      return (
        <ellipse
          cx={cx}
          cy={cy}
          rx={Math.min(rx, 140)}
          ry={Math.min(ry, 140)}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
        />
      );
    }

    // If hyperbola: ax^2 + by^2 = 1
    // Let's draw horizontal hyperbola if a > 0, b < 0: x^2/R_x^2 - y^2/R_y^2 = 1
    if (coeffA > 0 && coeffB < 0) {
      const rx = Math.sqrt(1 / coeffA) * 60;
      let pathD = "";
      for (let i = -120; i <= 120; i += 5) {
        const yVal = i / 60;
        const xSquared = (1 - coeffB * yVal * yVal) / coeffA;
        if (xSquared >= 0) {
          const xVal = Math.sqrt(xSquared) * 60;
          const px = cx + xVal;
          const py = cy - i;
          if (i === -120) pathD += `M ${px} ${py}`;
          else pathD += ` L ${px} ${py}`;
        }
      }
      let pathD2 = "";
      for (let i = -120; i <= 120; i += 5) {
        const yVal = i / 60;
        const xSquared = (1 - coeffB * yVal * yVal) / coeffA;
        if (xSquared >= 0) {
          const xVal = -Math.sqrt(xSquared) * 60;
          const px = cx + xVal;
          const py = cy - i;
          if (i === -120) pathD2 += `M ${px} ${py}`;
          else pathD2 += ` L ${px} ${py}`;
        }
      }
      return (
        <>
          <path d={pathD} fill="none" stroke="#e11d48" strokeWidth="3" />
          <path d={pathD2} fill="none" stroke="#e11d48" strokeWidth="3" />
        </>
      );
    }

    // If vertical hyperbola if a < 0, b > 0: - |a|x^2 + by^2 = 1
    if (coeffA < 0 && coeffB > 0) {
      const ry = Math.sqrt(1 / coeffB) * 60;
      let pathD = "";
      for (let i = -120; i <= 120; i += 5) {
        const xVal = i / 60;
        const ySquared = (1 - coeffA * xVal * xVal) / coeffB;
        if (ySquared >= 0) {
          const yVal = Math.sqrt(ySquared) * 60;
          const px = cx + i;
          const py = cy - yVal;
          if (i === -120) pathD += `M ${px} ${py}`;
          else pathD += ` L ${px} ${py}`;
        }
      }
      let pathD2 = "";
      for (let i = -120; i <= 120; i += 5) {
        const xVal = i / 60;
        const ySquared = (1 - coeffA * xVal * xVal) / coeffB;
        if (ySquared >= 0) {
          const yVal = -Math.sqrt(ySquared) * 60;
          const px = cx + i;
          const py = cy - yVal;
          if (i === -120) pathD2 += `M ${px} ${py}`;
          else pathD2 += ` L ${px} ${py}`;
        }
      }
      return (
        <>
          <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="3" />
          <path d={pathD2} fill="none" stroke="#6366f1" strokeWidth="3" />
        </>
      );
    }

    // Degenerate parallel lines
    if (coeffA !== 0 && coeffB === 0) {
      if (coeffA > 0) {
        const rx = Math.sqrt(1 / coeffA) * 60;
        return (
          <>
            <line x1={cx - rx} y1={0} x2={cx - rx} y2={height} stroke="#10b981" strokeWidth="3" />
            <line x1={cx + rx} y1={0} x2={cx + rx} y2={height} stroke="#10b981" strokeWidth="3" />
          </>
        );
      }
    }
    if (coeffA === 0 && coeffB > 0) {
      const ry = Math.sqrt(1 / coeffB) * 60;
      return (
        <>
          <line x1={0} y1={cy - ry} x2={width} y2={cy - ry} stroke="#10b981" strokeWidth="3" strokeDasharray="4" />
          <line x1={0} y1={cy + ry} x2={width} y2={cy + ry} stroke="#10b981" strokeWidth="3" strokeDasharray="4" />
        </>
      );
    }

    return null;
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 md:px-0">
      <CourseHeader 
        acronym="MATH-LIC-ALGBIL"
        title="Licence Maths : Algèbre Bilinéaire & Formes Quadratiques"
        subtitle="Théorie spectrale, réduction de Gauss, loi d'inertie de Sylvester, noyaux et orthogonalité."
        duration="1h 50"
        level="Licence Maths Fondamentales (L2)"
        prerequisites={["Algèbre linéaire de base (matrices, déterminants)", "Espaces euclidiens de dimension finie"]}
        objectives={[
          "Comprendre la dualité fondamentale entre formes bilinéaires symétriques et formes quadratiques.",
          "Maîtriser la méthode systématique de réduction en carrés de Gauss.",
          "Déterminer la signature spectrale d'une forme quadratique pour classer l'espace.",
          "Appliquer la loi d'inertie de Sylvester sur les matrices de congruence."
        ]}
      />

      <Section title="🌀 Formes Bilinéaires et Formes Quadratiques" icon="📐" color="indigo">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          L'algèbre bilinéaire étudie les structures géométriques au-dessus d'espaces vectoriels arbitraires. Elle fournit les outils pour mesurer les angles, longueurs, et courbures dans des espaces multidimensionnels généraux.
        </p>

        <InfoBlock type="definition" title="Forme Bilinéaire Symétrique">
          Soit <MathComponent math="V" /> un espace vectoriel sur <MathComponent math="\mathbb{R}" />. 
          Une application {" $f: V \\times V \\to \\mathbb{R}$"} est une <strong>forme bilinéaire symétrique</strong> si elle est linéaire par rapport à chaque argument et vérifie :
          <MathComponent block math="\forall x, y \in V, \ f(x, y) = f(y, x)" />
        </InfoBlock>

        <InfoBlock type="definition" title="Forme Quadratique associée">
          On appelle <strong>forme quadratique</strong> associée à <MathComponent math="f" /> l'application {" $q: V \\to \\mathbb{R}$"} définie par :
          <MathComponent block math="q(x) = f(x, x)" />
          Réciproquement, on retrouve <MathComponent math="f" /> grâce à l'identité de polarisation :
          <MathComponent block math="f(x, y) = \frac{1}{2}\big(q(x+y) - q(x) - q(y)\big)" />
        </InfoBlock>

        <TipBanner type="info" title="Formulation matricielle">
          Dans une base stable, si <MathComponent math="A" /> est la matrice symétrique d'évaluation de <MathComponent math="f" />, on récrit simplement :
          <MathComponent block math="q(x) = X^T A X \quad \text{et} \quad f(x, y) = X^T A Y" />
        </TipBanner>
      </Section>

      <Section title="⚖️ Loi d'Inertie de Sylvester et Signature" icon="🕵️" color="emerald">
        <p className="mb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Sous l'action d'un changement de base, la matrice d'une forme quadratique ne conserve pas ses valeurs propres, mais conserve de manière immuable le nombre de ses coefficients strictement positifs et négatifs : c'est la **Loi d'Inertie**.
        </p>

        <InfoBlock type="definition" title="Signature (p, q)">
          La signature d'une forme quadratique <MathComponent math="q" /> est un couple d'entiers <MathComponent math="(p, q)" /> où :
          <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-700 dark:text-slate-300 text-sm">
            <li><MathComponent math="p" /> est le nombre de termes positifs après réduction en carrés indépendants.</li>
            <li><MathComponent math="q" /> est le nombre de termes négatifs après réduction.</li>
          </ul>
          Le rang de la forme vaut <MathComponent math="rk(q) = p + q" />. Son noyau a pour dimension <MathComponent math="\dim(\ker q) = n - (p + q)" />.
        </InfoBlock>

        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 font-semibold">
          Classification spectrale liée à la signature :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900 leading-relaxed text-sm text-slate-800 dark:text-slate-200">
            <strong>Définie Positive :</strong> Si la signature vaut <MathComponent math="(n, 0)" />. Alors <MathComponent math="q(x) > 0" /> pour tout <MathComponent math="x \neq 0" />. On retrouve la structure d'un **produit scalaire**.
          </div>
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900 leading-relaxed text-sm text-slate-800 dark:text-slate-200">
            <strong>Indéfinie :</strong> Si <MathComponent math="p \ge 1" /> et <MathComponent math="q \ge 1" />. L'espace comporte des vecteurs de norme strictement positive, négative, ou nulle (**vecteurs isotropes**).
          </div>
        </div>
      </Section>

      <Section title="📈 Simulateur Analytique de Signatures et de Coniques" icon="🎨" color="indigo">
        <p className="mb-6 text-sm text-slate-700 dark:text-slate-300">
          Manipulez les coefficients du modèle quadratique d'équation {" $q(x, y) = a x^2 + b y^2 = 1$ "}. En modifiant les valeurs de <MathComponent math="a" /> et <MathComponent math="b" />, observez la signature résultante <MathComponent math="(p, q)" /> et l'allure géométrique de la quadric correspondante tracée en temps réel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-100 dark:border-slate-800-strong shadow-sm">
          {/* Sliders details */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Coefficient a : <MathComponent math="a" /></span>
                <span className="text-primary font-bold">{coeffA}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={coeffA}
                onChange={(e) => setCoeffA(Number(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-muted-text uppercase tracking-wider">
                <span>Coefficient b : <MathComponent math="b" /></span>
                <span className="text-rose-500 font-bold">{coeffB}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={coeffB}
                onChange={(e) => setCoeffB(Number(e.target.value))}
                className="w-full accent-primary bg-slate-200 dark:bg-slate-800 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-muted/65 rounded-xl border border-border text-sm space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Signature :</span>
                <span className="font-mono font-bold text-indigo-600">({p}, {q})</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Rang :</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{p + q}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-500">Classification :</span>
                <span className="font-bold text-xs text-indigo-900 dark:text-indigo-300">{geomType}</span>
              </div>
            </div>
          </div>

          {/* Interactive Draw area */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="relative border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl p-2 w-[316px]">
              <svg width={width} height={height} className="overflow-visible">
                {/* Horizontal & vertical lines */}
                <line x1={0} y1={cy} x2={width} y2={cy} stroke="#cbd5e1" strokeDasharray="3,3" />
                <line x1={cx} y1={0} x2={cx} y2={height} stroke="#cbd5e1" strokeDasharray="3,3" />

                {/* Plot the dynamic paths */}
                {renderPath()}

                {/* Draw axes arrows */}
                <polygon points={`${width},${cy} ${width-6},${cy-3} ${width-6},${cy+3}`} fill="#94a3b8" />
                <polygon points={`${cx},0 ${cx-3},6 ${cx+3},6`} fill="#94a3b8" />
              </svg>
            </div>
            <p className="mt-2 text-xs text-muted-text italic text-center text-slate-500">
              Tracé unitaire d'équation : {coeffA}x² + {coeffB}y² = 1
            </p>
          </div>
        </div>
      </Section>

      <Section title="🧩 Réduction de Gauss Étape par Étape" icon="⚡" color="amber">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La **Méthode de Réduction de Gauss** est un algorithme purement algébrique qui décompose toute forme quadratique en somme de carrés de formes linéaires linéairement indépendantes.
        </p>

        <InfoBlock type="reminder" title="Méthode de Gauss">
          Soit <MathComponent math="q(x,y,z)" /> une forme quadratique :
          <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>Si le terme <MathComponent math="x^2" /> existe, on groupe tous les termes avec <MathComponent math="x" /> pour former le début d'un carré d'identité remarquable.</li>
            <li>Si les termes carrés n'existent pas mais qu'il y a un produit croisé <MathComponent math="x y" />, on utilise la décomposition : 
              <br />
              <span className="font-mono text-indigo-600 block sm:inline">{" $x y = \\frac{1}{4}\\big((x+y)^2 - (x-y)^2\\big)$ "}</span>
            </li>
            <li>On procède par récurrence sur les variables restantes.</li>
          </ol>
        </InfoBlock>
      </Section>

      <Section title="✏️ Exercice de Réduction Résolu" icon="✍️" color="indigo">
        <InteractiveExercise
          title="Exercice 1 : Réduction d'une forme quadratique en 3D"
          question={<p>Réduire en carrés de Gauss la forme quadratique définie sur {"$\\mathbb{R}^3$"} par : {"$q(x, y, z) = x^2 + 4x y + 2y^2 - 6y z$"}, puis en déduire sa signature et son rang.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border font-medium">
              <p className="font-bold text-indigo-950 dark:text-indigo-200">Étape 1 : Regrouper les termes contenant x</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                On identifie tous les termes faisant intervenir la première variable <MathComponent math="x" /> : 
                <br />
                <MathComponent math="x^2 + 4xy" />
                On l'exprime sous la forme du début d'un carré parfait d'une identité remarquable :
                <MathComponent block math="x^2 + 4xy = (x + 2y)^2 - 4y^2" />
                Réinjectons cela dans l'expression initiale de <MathComponent math="q" /> :
                <MathComponent block math="q(x,y,z) = (x+2y)^2 - 4y^2 + 2y^2 - 6yz = (x+2y)^2 - 2y^2 - 6yz" />
              </p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-955 dark:text-indigo-200">Étape 2 : Traiter les variables restantes y et z</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                La partie restante en <MathComponent math="y" /> et <MathComponent math="z" /> s'écrit : <MathComponent math="-2y^2 - 6yz" />.
                <br />
                Mettons <MathComponent math="-2" /> en facteur puis complétons le carré pour former l'identité :
                <MathComponent block math="-2(y^2 + 3yz) = -2 \left[ \left(y + \frac{3}{2}z\right)^2 - \frac{9}{4}z^2 \right] = -2\left(y+\frac{3}{2}z\right)^2 + \frac{9}{2}z^2" />
              </p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Formulation finale, signature et rang</p>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950 dark:text-emerald-100">
                En combinant toutes les étapes de calcul, on obtient la décomposition complète de Gauss :
                <MathComponent block math="q(x, y, z) = (x + 2y)^2 - 2\left(y + \frac{3}{2}z\right)^2 + \frac{9}{2}z^2" />
                La forme est somme de 3 termes carrés indépendants.
                <br />
                • Il y a 2 coefficients positifs devant les carrés : 1 (pour le 1er terme) et 9/2 (pour le 3e terme).
                <br />
                • Il y a 1 coefficient négatif : -2.
                <br />
                La signature spectrale vaut donc rigoureusement <strong>(2, 1)</strong> et le rang est égal à <strong>3</strong>. La forme est indéfinie et non dégénérée.
              </p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Validation Algébrique" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front="Sylvester stipule quoi sur la signature de matrices congruentes ?"
            back="Deux matrices symétriques réelles représentent la même forme quadratique (elles sont congruentes) si et seulement si elles ont la même signature."
          />
          <Flashcard 
            front="Qu'est-ce qu'un vecteur isotrope ?"
            back="Un vecteur non nul x de l'espace tel que q(x) = 0. L'ensemble de ces vecteurs forme le cône isotrope d'épanouissement."
          />
          <Flashcard 
            front="Quelle est la dimension maximale d'un sous-espace totalement isotrope sous signature (p, q) ?"
            back="Elle est égale à min(p, q). C'est la limite absolue pour y trouver un sous-espace vectoriel stable entièrement nul."
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions" icon="💬" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi les changements de base ne préservent-ils pas les valeurs propres en bilinéaire ?",
              answer: "En algèbre linéaire élémentaire, un changement de base d'un endomorphisme s'effectue via une similitude P⁻¹AP. En bilinéaire, la matrice d'un opérateur change par congruence PᵀAP. Ce ne sont pas les mêmes invariants spectraux."
            },
            {
              question: "Quelle différence physique y a-t-il entre signature (3,0) et (2,1) ?",
              answer: "(3, 0) représente la géométrie euclidienne classique où la distance au carré est toujours positive. (2, 1) ou (3, 1) est la signature de Minkowski utilisée pour modéliser le tissu de l'espace-temps en théorie macro-physique (relativité restreinte)."
            },
            {
              question: "Comment prouver qu'une matrice symétrique est définie positive simplement ?",
              answer: "On peut utiliser le critère de Sylvester qui valide que tous les déterminants mineurs principaux d'angle successifs de la matrice d'étude sont strictement positifs."
            }
          ]}
        />
      </Section>

      <Section title="📝 Quiz de Fin de Chapitre" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Soit q une forme quadratique de signature (1, 2) sur R³. Quelle est la dimension de son noyau ?",
              options: [
                "Le noyau vaut de dimension 0",
                "Le noyau vaut de dimension 1",
                "Le noyau vaut de dimension 2"
              ],
              correctAnswer: 0,
              explanation: "Le rang d'une forme quadratique vaut r = p + q. Ici r = 1 + 2 = 3. Or par théorème du rang, dim(noyau) = n - r = 3 - 3 = 0."
            },
            {
              question: "Si q a pour signature (2, 0) sur R³. Comment qualifie-t-on q ?",
              options: [
                "Définie positive",
                "Semi-définie positive",
                "Indéfinie dégénérée"
              ],
              correctAnswer: 1,
              explanation: "La signature comportant moins de termes carrés positifs que la dimension totale n (2 < 3) avec 0 négatif, elle est semi-définie positive car certains vecteurs non nuls ont un q nuls."
            },
            {
              question: "Quelle méthode est standardisée pour diagonaliser simultanément deux formes quadratiques ?",
              options: [
                "L'algorithme de pivot de Gauss linéaire",
                "La réduction de dualité simultanée par matrice orthogonale",
                "La décomposition en éléments simples de Fourier"
              ],
              correctAnswer: 1,
              explanation: "Si l'une des deux formes est strictement définie positive, on l'utilise pour construire une structure de produit scalaire dans laquelle on applique le théorème spectral d'orthogonalité."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais traduire une forme bilinéaire symétrique en sa forme quadratique associée.",
            "Je maîtrise parfaitement toutes les étapes de la réduction de Gauss.",
            "Je sais déduire le noyau, le rang et la classification géométrique de la signature (p, q).",
            "Je comprends les applications physiques de la loi d'inertie de Sylvester."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Licence_Maths_AlgebreBilinea;
