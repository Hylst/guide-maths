import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { Target, AlertTriangle, Calculator, Sliders, CheckCircle2, Info } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_3eme_02_Trigonometrie: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Local state for the real-time triangle simulator
  const [angle, setAngle] = useState<number>(35);
  const [hyp, setHyp] = useState<number>(12);

  // Convert to radians for JavaScript Math functions
  const rad = (angle * Math.PI) / 180;
  const opp = hyp * Math.sin(rad);
  const adj = hyp * Math.cos(rad);

  // Scale coordinates for the SVG box (400x320)
  const originX = 50;
  const originY = 270;
  // scale factor to make it fit nicely
  const scale = 18;
  const ptC = { x: originX, y: originY };                      // Right angle (C)
  const ptA = { x: originX, y: originY - opp * scale };        // Top angle (A)
  const ptB = { x: originX + adj * scale, y: originY };        // Right angle base (B)

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-02"
        title="La Trigonométrie (Cosinus, Sinus, Tangente)"
        subtitle="Devenez le maître du calcul des distances inaccessibles !"
        duration="50 min"
        level="3ème (Cycle 4)"
        prerequisites={["Le théorème de Pythagore", "Savoir repérer l'hypoténuse d'un triangle rectangle"]}
        objectives={[
          "Appliquer les rapports trigonométriques pour calculer la longueur d'un côté.",
          "Appliquer les rapports inverses (cos⁻¹, sin⁻¹, tan⁻¹) pour trouver un angle.",
          "Maîtriser l'acronyme mnémotechnique magique : SOH CAH TOA !",
          "Comprendre l'évolution des fonctions trigonométriques pour un angle aigu."
        ]}
      />

      <Section title="🎯 Introduction Pédagogique : Le secret du tireur d'élite" icon="🏹" color="slate">
        <p>
          Tu connais Pythagore : ce magicien a besoin d'avoir <strong>DEUX</strong> longueurs pour trouver le 3ème côté d'un triangle rectangle ! Mais que se passe-t-il si tu ne connais qu'<strong>UN</strong> pauvre côté, et que le destin te donne à la place... <strong>un Angle en degrés</strong> ? Là, Pythagore est bloqué.
        </p>
        <p className="mt-4">
          Heureusement, la <strong>Trigonométrie</strong> arrive à la rescousse ! Avec un unique côté et un angle de vue très précis (ton "angle de visée"), tu convoques les fonctions trigonométriques pour obtenir au millimètre près n'importe quel autre côté !
        </p>
        <p className="mt-4">
          La trigonométrie vient du grec ancien "trigonos" (triangle) et "metron" (mesure). Elle a historiquement permis aux premiers astronomes de calculer la distance de la Terre à la Lune, et aux navigateurs d'éviter les récifs en cartographiant les côtes par simple orientation des étoiles !
        </p>
        <InfoBlock title="Le saviez-vous ? L'invention du nom de 'Sinus'" type="funfact">
          Le mot « sinus » provient d&apos;une étonnante série d&apos;erreurs de traduction historique ! À l&apos;origine, les mathématiciens indiens utilisaient le mot sanskrit « jya-ardha » (demi-corde d&apos;arc). Traduit en arabe par « jiba », écrit sans voyelles, des traducteurs espagnols du Moyen Âge l&apos;ont lu comme « jaib », qui signifie « pli de vêtement » ou « baie ». Ils l&apos;ont traduit en latin par « sinus » !
        </InfoBlock>
      </Section>

      <Section title="📐 Schéma Pédagogique Interactif" icon="👁️" color="indigo">
        <TipBanner title="Pilotez le sniper trigonométrique !" type="info">
          <p>
            Modifiez l'angle d'attaque {"$\\theta$"} au point <strong>B</strong> et observez les côtés se dilater. Notez que la proportion de chaque formule reste indéformable !
          </p>
        </TipBanner>
        
        <div className="my-8 bg-card border border-border-strong rounded-[2rem] p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* SVG Triangle Rendering */}
            <div className="flex justify-center p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border">
              <svg width="340" height="300" viewBox="0 0 340 300" className="max-w-full h-auto">
                {/* Background Grid Lines decorative */}
                <line x1="0" y1={originY} x2="340" y2={originY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3"/>
                <line x1={originX} y1="0" x2={originX} y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3"/>

                {/* Right angle symbol (C) */}
                <rect x={originX} y={originY - 12} width="12" height="12" fill="none" stroke="#ef4444" strokeWidth="2" />
                
                {/* Triangle lines */}
                {/* Hypoténuse (A to B) */}
                <line x1={ptA.x} y1={ptA.y} x2={ptB.x} y2={ptB.y} stroke="#6366f1" strokeWidth="4" />
                {/* Opposite (A to C) */}
                <line x1={ptA.x} y1={ptA.y} x2={ptC.x} y2={ptC.y} stroke="#10b981" strokeWidth="4" />
                {/* Adjacent (C to B) */}
                <line x1={ptC.x} y1={ptC.y} x2={ptB.x} y2={ptB.y} stroke="#f59e0b" strokeWidth="4" />

                {/* Angle arc at B */}
                <path 
                  d={`M ${ptB.x - 22} ${ptB.y} A 22 22 0 0 0 ${ptB.x - 20 * Math.cos(rad)} ${ptB.y - 20 * Math.sin(rad)}`} 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="3"
                />

                {/* Nodes */}
                <circle cx={ptC.x} cy={ptC.y} r="5" fill="#ef4444" />
                <text x={ptC.x - 15} y={ptC.y + 18} fontSize="14" fontWeight="bold" fill="currentColor">C</text>

                <circle cx={ptA.x} cy={ptA.y} r="5" fill="#10b981" />
                <text x={ptA.x - 15} y={ptA.y - 10} fontSize="14" fontWeight="bold" fill="currentColor">A</text>

                <circle cx={ptB.x} cy={ptB.y} r="5" fill="#f59e0b" />
                <text x={ptB.x + 10} y={ptB.y + 18} fontSize="14" fontWeight="bold" fill="currentColor">B</text>

                {/* Text for angle B */}
                <text x={ptB.x - 55} y={ptB.y - 12} fontSize="12" fontWeight="bold" fill="#ef4444">
                  {angle}°
                </text>
              </svg>
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div>
                <label htmlFor="angle-slider" className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 flex justify-between">
                  <span>Angle de visée B ({"$\\theta$"}) :</span>
                  <span className="text-indigo-600 font-mono font-black">{angle}°</span>
                </label>
                <input 
                  id="angle-slider"
                  type="range" min="10" max="80" step="1" value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label htmlFor="hyp-slider" className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 flex justify-between">
                  <span>Hypoténuse d'appui (AB) :</span>
                  <span className="text-indigo-600 font-mono font-black">{hyp.toFixed(1)} cm</span>
                </label>
                <input 
                  id="hyp-slider"
                  type="range" min="2" max="15" step="0.2" value={hyp}
                  onChange={(e) => setHyp(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Ratios readout */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border font-mono text-xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600 font-bold">OPPOSÉ (AC) = {opp.toFixed(2)} cm</span>
                  <span className="text-slate-400">{"opp = hyp × sin = " + Math.sin(rad).toFixed(3)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-500 font-bold">ADJACENT (CB) = {adj.toFixed(2)} cm</span>
                  <span className="text-slate-400">{"adj = hyp × cos = " + Math.cos(rad).toFixed(3)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center text-sm">
                  <span className="text-indigo-600 font-bold">HYPOTÉNUSE (AB)</span>
                  <span className="text-indigo-600 font-bold">{hyp.toFixed(2)} cm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="📚 Partie Théorie Enrichie" icon="📖" color="emerald">
        <h3 className="text-xl font-bold mt-4 mb-2 text-foreground">1. Prénommer les murs d'un château rectangulaire :</h3>
        <p className="mb-4 text-muted-text">L'astuce de base pour ne jamais se tromper est de repérer ton "Œil ninja" (l'angle de visée dont on te parle ! Ex: l'angle B au point {"$B$"}).</p>
        
        <ul className="space-y-4 mb-8">
          <li className="flex gap-3">
            <span className="w-2 h-full bg-slate-400 rounded-full shrink-0"></span>
            <div>
              <strong className="text-slate-700 dark:text-slate-200">L'HYPOTÉNUSE :</strong> C'est le boss ultime. C'est TOUJOURS le côté le plus long, qui regarde face à l'Angle Droit. Il ne change jamais de rôle.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-2 h-full bg-emerald-500 rounded-full shrink-0"></span>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">Le Côté OPPOSÉ :</strong> Trace une flèche droite depuis l'angle de visée. Le mur d'en face que tu touches... c'est lui ! (Ici AC est opposé à B).
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-2 h-full bg-amber-500 rounded-full shrink-0"></span>
            <div>
              <strong className="text-amber-600 dark:text-amber-400">Le Côté ADJACENT :</strong> C'est le côté qui touche et porte directement l'angle de visée, autre que l'hypoténuse. (Ici BC est adjacent à B).
            </div>
          </li>
        </ul>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/60 my-8">
          <h3 className="text-2xl font-bold mb-4 text-emerald-950 dark:text-emerald-100">2. L'incantation universelle magique : SOH CAH TOA !!</h3>
          <p className="text-emerald-900 dark:text-emerald-200 mb-6 font-medium">Écris TOUJOURS ce mot au sommet de ta feuille de brouillon. Il cache les trois définitions fondamentales :</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-800 text-center">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 block mb-2 font-mono">SOH</span>
              <p className="font-mono font-bold text-slate-700 dark:text-slate-300">{"$\\sin(\\theta) = \\frac{\\text{Opp}}{\\text{Hyp}}$"}</p>
              <span className="text-xs text-slate-400 block mt-2">Sinus = Opposé / Hypoténuse</span>
            </div>
            <div className="bg-card dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-800 text-center">
              <span className="text-3xl font-black text-amber-500 dark:text-amber-400 block mb-2 font-mono">CAH</span>
              <p className="font-mono font-bold text-slate-700 dark:text-slate-300">{"$\\cos(\\theta) = \\frac{\\text{Adj}}{\\text{Hyp}}$"}</p>
              <span className="text-xs text-slate-400 block mt-2">Cosinus = Adjacent / Hypoténuse</span>
            </div>
            <div className="bg-card dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-800 text-center">
              <span className="text-3xl font-black text-sky-600 dark:text-sky-400 block mb-2 font-mono">TOA</span>
              <p className="font-mono font-bold text-slate-700 dark:text-slate-300">{"$\\tan(\\theta) = \\frac{\\text{Opp}}{\\text{Adj}}$"}</p>
              <span className="text-xs text-slate-400 block mt-2">Tangente = Opposé / Adjacent</span>
            </div>
          </div>
        </div>

        <TipBanner title="Comment choisir la bonne formule ?" type="success">
          <p>
            C'est simple ! Écrivez les trois grandeurs : l'angle, la longueur connue, et la longueur cherchée. <br/>
            Exemple : Vous avez l'<strong>ADJACENT</strong>, vous cherchez l'<strong>HYPOTÉNUSE</strong>... Quelle syllabe relie le {"$A$"} et le {"$H$"} ? C'est le <strong>CAH</strong> ! Vous utiliserez donc la formule du <strong>COSINUS</strong> !
          </p>
        </TipBanner>
      </Section>
      
      <Section title="⚠️ Rappels Vitaux & Garde-fous" icon="🚨" color="rose">
        <InfoBlock title="Vérifie absolument ta calculette !" type="warning">
          Le cauchemar absolu des examens : vérifiez toujours qu'il y a un petit <strong>D</strong> (ou <strong>DEG</strong>) sur l'écran à cristaux de votre calculatrice. Si vous êtes malencontreusement en radian (R) ou en grade (G), l'altitude de vos tirs trigonométriques sera désastreuse et vous aurez 0 aux calculs.
        </InfoBlock>
        
        <InfoBlock title="Le sinus et le cosinus sont enfermés !" type="info">
          Dans un triangle rectangle, l'hypoténuse est le côté le plus long. Donc, les fractions {"$\\frac{\\text{Opp}}{\\text{Hyp}}$"} et {"$\\frac{\\text{Adj}}{\\text{Hyp}}$"} ont un dénominateur supérieur au numérateur. <br />
          Par conséquent, le cosinus et le sinus d'un angle aigu sont <strong>TOUJOURS STRICTEMENT COMPRIS ENTRE 0 ET 1</strong>. Si vous trouvez un cosinus de 1,4, arrêtez-vous tout de suite : vous avez inversé le numérateur et le dénominateur !
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : La liaison éternelle entre Sinus, Cosinus et Pythagore">
          Il existe une formule d&apos;or absolue en trigonométrie qui découle directement de notre vieil ami Pythagore. Pour tout angle aigu {"$\\theta$"}, on a :
          <div className="font-mono text-center text-lg my-2 font-bold select-all">
            {"$\\cos^2(\\theta) + \\sin^2(\\theta) = 1$"}
          </div>
          C&apos;est la formule fondamentale de la trigonométrie, elle montre que le sinus et le cosinus sont indissociables !
        </InfoBlock>
      </Section>

      <Section title="✍️ Deux Exercices de Brevet Corrigés" icon="🌊" color="emerald">
        {/* Exercice 1 */}
        <InteractiveExercise 
          title="Exercice 1 : La hauteur du phare hanté (Calculer une longueur)"
          question={(
            <div>
              <p className="mb-2">
                Un marin s'approche d'un récif surmonté d'un phare. Son bateau est situé à <strong>200 mètres</strong> de la base verticale du phare.
              </p>
              <p className="mb-2">
                À l'aide d'un théodolite, il mesure l'angle d'inclinaison vers le sommet du phare et lit <strong>42°</strong>.
              </p>
              <p className="font-bold">
                Calculez la hauteur exacte du phare (arrondie au décimètre près).
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Analyse du triangle rectangle :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Le phare étant vertical et la mer horizontale, le triangle formé est rectangle au pied du phare. On peut légitimement utiliser la trigonométrie.
              </p>
            </>,
            <>
              <strong>2. Identification des côtés :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Depuis notre angle mesuré de 42° : <br/>
                - Le côté de 200m touche l'angle : c'est le côté <strong>ADJACENT</strong>.<br/>
                - Nous cherchons la hauteur du phare d'en face : c'est le côté <strong>OPPOSÉ</strong>.
              </p>
            </>,
            <>
              <strong>3. Sélection de la formule (SOH CAH TOA) :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                La formule reliant Opposé (O) et Adjacent (A) est <strong>TOA</strong>. Nous convoquons donc la <strong>TANGENTE</strong> : <br />
                <code>Tan(42°) = Opposé / Adjacent</code>
              </p>
            </>,
            <>
              <strong>4. Établissement du produit en croix :</strong>
              <p className="mt-1 text-sm text-foreground/80 font-mono">
                Tan(42°) = Hauteur / 200 <br />
                Hauteur = Tan(42°) × 200
              </p>
            </>,
            <>
              <strong>5. Frappe calculatrice et verdict final :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                La calculatrice nous donne <code>Tan(42°) ≈ 0,9004</code>. <br/>
                <code>Hauteur = 0,9004 × 200 ≈ 180,08m</code>.
              </p>
              <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">
                La hauteur du phare est d'environ 180,1 mètres.
              </p>
            </>
          ]}
        />

        {/* Exercice 2 */}
        <InteractiveExercise 
          title="Exercice 2 : La rampe PMR de l'hôpital (Trouver un angle)"
          question={(
            <div>
              <p className="mb-2">
                Pour être conforme à la norme de sécurité, une rampe d'accès inclinée en métal doit être installée pour franchir un seuil maçonné. 
              </p>
              <p className="mb-2">
                La rampe mesure <strong>4 mètres</strong> de long (le plan incliné réel). Elle prend appui à une hauteur verticale de <strong>50 cm</strong> (0.5 mètre).
              </p>
              <p className="font-bold">
                Calculez l'angle de pente de la rampe avec le sol horizontal (arrondi au degré).
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Analyse et conversion :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Toutes les dimensions doivent être dans la même unité ! Convertissons la hauteur en mètres : 50 cm = 0,5 m. Le triangle est rectangle au pied de la marche.
              </p>
            </>,
            <>
              <strong>2. Identification des segments :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                - Nous cherchons l'angle {"$\\theta$"} formé avec le sol horizontal.<br/>
                - Le côté de 0,5m est d'en face : c'est le côté <strong>OPPOSÉ</strong>.<br/>
                - Le plan incliné est le plus grand côté : c'est l'<strong>HYPOTÉNUSE</strong> (4m).
              </p>
            </>,
            <>
              <strong>3. Sélection de la formule :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                La formule qui relie Opposé (O) et Hypoténuse (H) est <strong>SOH</strong>. Nous utilisons donc le <strong>SINUS</strong> : <br />
                {"$\\sin(\\theta) = \\frac{\\text{Opp}}{\\text{Hyp}}$"}
              </p>
            </>,
            <>
              <strong>4. Calcul du quotient :</strong>
              <p className="mt-1 text-sm text-foreground/80 font-mono">
                {"$\\sin(\\theta) = \\frac{0,5}{4} = 0,125$"}
              </p>
            </>,
            <>
              <strong>5. Utilisation de la touche inverse Arcsin / sin⁻¹ :</strong>
              <p className="mt-1 text-sm text-foreground/80 font-mono">
                Pour retrouver l'angle à partir du sinus, faites : <br />
                {"$\\theta = \\sin^{-1}(0,125)$"} (Touche SECONDE + sin sur votre calculatrice).<br/>
                La calculatrice nous donne <code>7,18°</code>.
              </p>
              <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">
                L'angle de inclinaison de la rampe est d'environ 7° (conforme à la norme !).
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur te dit : "Tu as le grand triangle, tu regardes l'angle A, tu connais le mur en face (Opposé) et tu cherches le mur adjacent au sol"... Quelle formule cries-tu ?</>}
            back={<>Une fière <strong>TANGENTE</strong> ! (<strong>TOA</strong>). J'ai l'opposé et je cherche l'adjacent. L'équation qui relie O et A est la formule de la Tangente.</>}
          />
          <Flashcard 
            front={<>Tu possèdes toutes les longueurs d'un triangle rectangle, mais tu veux retrouver la mesure d'un <strong>Angle en degrés</strong> ! Quelle est l'alliance magique ?</>}
            back={<>On invoque les touches inverses : <strong>Arcsinus</strong>, <strong>Arccosinus</strong> ou <strong>Arctangente</strong> (notées <code>sin⁻¹</code>, <code>cos⁻¹</code> ou <code>tan⁻¹</code> sur la calculatrice avec la touche SHIFT / SECONDE). Exemple : <code>sin⁻¹(0,5) = 30°</code>.</>}
          />
          <Flashcard 
            front={<>Qu'est-ce que le Sinus et le Cosinus représentent physiquement ?</>}
            back={<>Ce ne sont pas des nombres magiques jetés au hasard ! Ce sont des coefficients de proportionnalité d'angle. Quel que soit le format de ton triangle rectangle, le ratio de l'opposé sur l'hypoténuse restera strictement constant pour un même angle de départ.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Mon professeur m'a imposé un autre angle, je n'aime pas et j'ai l'habituel angle en bas. Est-ce que je peux bouger mon regard ?",
              answer: "OUI, tu peux regarder depuis n'importe quel angle aigu ! MAIS ATTENTION : Si tu changes ton regard d'angle et montes en haut du triangle rectangle, le mur qui était au sol à côté (adjacent) devient le mur d'en face (opposé) de ton nouveau poste d'observation ! Les rôles s'ajustent selon d'où tu regardes."
            },
            {
              question: "Quelle est la différence entre sinus, cosinus et tangente sur la calculatrice ?",
              answer: "Ce sont trois rapports différents. Le cosinus s'appuie sur le côté adjacent (le sol portant l'angle), le sinus s'oriente vers le côté opposé (le mur montant en hauteur), et la tangente s'occupe de la pente directe (opposé sur adjacent) sans jamais utiliser l'hypoténuse."
            },
            {
              question: "Peut-on utiliser le cosinus d'un angle quelconque dans un triangle non rectangle ?",
              answer: "Non, la trigonométrie de base du collège (SOH CAH TOA) s'applique exclusivement dans les triangles rectangles. (Au lycée, tu découvriras de nouvelles règles complexes comme Al-Kashi pour l'appliquer à n'importe quel triangle)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si on cherche la longueur d'un côté et qu'on ne dispose d'aucune mesure d'angle en degrés dans l'énoncé, que fait-on ?",
              options: [
                "J'utilise la trigonométrie (Cosinus).",
                "J'utilise le Théorème de Pythagore (si j'ai deux longueurs connues).",
                "C'est impossible de calculer sans rapporteur."
              ],
              correctAnswer: 1,
              explanation: "Ne mélangez pas tout ! Si vous n'avez pas de degrés d'angle en scène mais uniquement des longueurs manuelles, c'est Pythagore qu'il faut appeler à la rescousse."
            },
            {
              question: "Quelle est la valeur maximale théorique que peut atteindre le Sinus d'un angle aigu ?",
              options: [
                "1",
                "90",
                "L'infini"
              ],
              correctAnswer: 0,
              explanation: "L'hypoténuse étant le côté le plus grand d'un triangle rectangle, le quotient Opposé / Hypoténuse sera obligatoirement inférieur à 1."
            },
            {
              question: "Dans le triangle ABC rectangle en B, que vaut le cosinus de l'angle A ?",
              options: [
                "AB / AC",
                "BC / AC",
                "AB / BC"
              ],
              correctAnswer: 0,
              explanation: "Cosinus de l'angle A = Adjacent / Hypoténuse. Le côté adjacent à l'angle A est AB et l'hypoténuse est AC. Donc Cos(A) = AB / AC !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mon triangle est rectangle et on me donne ou demande un angle ? = Trigonométrie obligée !",
            "Je récite SOH CAH TOA dans la marge de ma copie.",
            "Je commence toujours par identifier l'Hypoténuse immuable en face du carré rouge.",
            "Je contrôle scrupuleusement le mode de calcul de ma calculatrice (DEG et non RAD)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+35 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_College_3eme_02_Trigonometrie;
