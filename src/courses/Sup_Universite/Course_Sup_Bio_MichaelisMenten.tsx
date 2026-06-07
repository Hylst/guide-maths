import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, TipBanner, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Bio_MichaelisMenten: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [vMax, setVMax] = useState(40.0); // Vitesse maximale de réaction ajustable par curseur
  const [kM, setKM] = useState(25.0); // Constante de Michaelis Km ajustable

  // Tracé de l'hyperbole de Michaelis-Menten : v = vMax * S / (kM + S)
  const pointsHyperbola: string[] = [];
  const originX = 55;
  const originY = 270;
  const scaleX = 3.6; // Largeur max substrat [S] 100
  const scaleY = 5.0; // Hauteur max vitesse v 50

  for (let sSub = 0; sSub <= 100; sSub += 2) {
    const vSpeed = (vMax * sSub) / (kM + sSub);
    const gx = originX + sSub * scaleX;
    const gy = originY - vSpeed * scaleY;
    pointsHyperbola.push(`${gx},${gy}`);
  }

  // Coordonnées du point caractéristique (Km, Vmax/2)
  const characteristicX = originX + kM * scaleX;
  const characteristicY = originY - (vMax / 2) * scaleY;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-BIO"
        title="Sup Biologie : Cinétique Enzymatique de Michaelis-Menten"
        subtitle="Formulation mathématique de la catalyse biochimique : approximation de l'état quasi-stationnaire, linéarisation de Lineweaver-Burk et efficacité catalytique."
        duration="2h 00"
        level="École Nationale de Chimie & Physique / Faculté de Pharmacie / AgroParisTech"
        prerequisites={["Équations différentielles de vitesse chimique", "Loi d'action de masse", "Systèmes asymptotiques hyperboliques"]}
        objectives={[
          "Formuler le schéma réactionnel cinétique de la catalyse d'un produit.",
          "Démontrer mathématiquement l'approximation de l'état quasi-stationnaire de Briggs-Haldane.",
          "Dériver la loi hyperbolique de Michaelis-Menten.",
          "Représenter et exploiter la double réciproque de Lineweaver-Burk pour extraire des paramètres."
        ]}
      />

      <InfoBlock type="definition" title="Qu'est-ce que la Catalyse Enzymatique ?">
        La catalyse désigne l&apos;accélération d&apos;une réaction chimique par une substance tierce appelée catalyseur (ici, l&apos;enzyme). Elle diminue l&apos;énergie d&apos;activation moléculaire sans être détruite saine au cours du processus.
      </InfoBlock>

      <TipBanner type="info" title="Loi de Conservation">
        L&apos;enzyme se conserve tout au long de la réaction. L&apos;ensemble de l&apos;enzyme libre est soit libre, soit capturée au sein du complexe de transition, respectant ainsi une stricte équation d&apos;équilibre.
      </TipBanner>

      <Section title="🧬 Les Ouvriers Cellulaires : Enzymes et Substrats" icon="Dna" color="indigo">
        <p className="mb-4">
          Comment les êtres vivants accomplissent-ils des réactions chimiques complexes à température ambiante avec une vitesse foudroyante ? Grâce aux <strong>enzymes</strong>, ces macromolécules de protéines hautement spécialisées agissant comme des catalyseurs biologiques remarquables.
        </p>
        <p className="mb-4">
          Le mécanisme élémentaire décrit par Leonor Michaelis et Maud Menten en 1913 repose sur la liaison réversible d'une enzyme <MathComponent math="E" /> à son substrat <MathComponent math="S" /> pour constituer un complexe instable <MathComponent math="ES" />. Ce dernier se dissocie ensuite de manière irréversible pour accoucher du produit final <MathComponent math="P" /> et restituer l'enzyme saine :
        </p>
        
        <FormulaBox 
          title="Schéma de Catalyse Enzymatique" 
          math="E + S \xrightleftharpoons[k_{-1}]{k_1} ES \xrightarrow{k_2} E + P" 
        />

        <p className="my-4">
          Où :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>k_1 :</strong> Constante de vitesse bimoléculaire d'association du complexe.</li>
          <li><strong>k_-1 :</strong> Constante de vitesse monomoléculaire de dissociation improductive.</li>
          <li><strong>k_2 (ou k_cat) :</strong> Constante de vitesse monomoléculaire d'accomplissement catalytique.</li>
        </ul>
      </Section>

      <Section title="⚙️ L'Approche de Briggs-Haldane par quasi-stationnarité" icon="Cpu" color="emerald">
        <p className="mb-4">
          La modélisation cinétique s'appuie sur la **loi d'action de masse**. La vitesse globale d'émergence du produit final s'exprime par le rythme de dégradation irréversible du complexe de liaison :
          <MathComponent block math="V = \frac{d[P]}{dt} = k_2 [ES]" />
        </p>
        <p className="mb-4">
          Pour extraire les variables inobservables de l'équation, Briggs et Haldane introduisent en 1925 l'<strong>Approche de l'État Quasi-Stationnaire (AEQS)</strong>. Comme le complexe de transition <MathComponent math="ES" /> réagit à une vitesse extrêmement véloce, son niveau de concentration reste infime et quasi stable pendant la majeure partie de l'expérience :
        </p>

        <FormulaBox 
          title="Hypothèse AEQS de Briggs-Haldane" 
          math="\frac{d[ES]}{dt} = k_1 [E][S] - (k_{-1} + k_2)[ES] \approx 0" 
        />

        <p className="my-4">
          En additionnant la conservation totale de l'enzyme active <MathComponent math="[E]_{\text{total}} = [E] + [ES]" />, on dérive rigoureusement la loi hyperbolique de Michaelis-Menten :
        </p>
        <FormulaBox 
          title="L'Équation Cinétique de Michaelis-Menten" 
          math="V = \frac{V_{\max} \cdot [S]}{K_m + [S]}" 
        />
        <p className="my-4">
          Où deux constantes cruciales s'isolent :
          <MathComponent block math="V_{\max} = k_2 [E]_{\text{total}} \quad \text{et l'incontournable} \quad K_m = \frac{k_{-1} + k_2}{k_1}" />
        </p>
      </Section>

      <Section title="📊 Simulateur de Cinétique Hyperbolique" icon="Sliders" color="indigo">
        <p className="mb-4 text-slate-705 dark:text-slate-300 font-medium">
          Contrôlez la vitesse maximale théorique (<MathComponent math="V_{\max}" />) et l'affinité représentée par la constante de Michaelis (<MathComponent math="K_m" />) au moyen des barres de réglage. Suivez la déformation de l'hyperbole cinétique (courbe bleue) et la signification géométrique de <MathComponent math="K_m" /> (concentration de substrat requise pour acquérir la moitié de la célérité maximale <MathComponent math="V_{\max}/2" />, matérialisé par le point rouge).
        </p>

        {/* Panel de boutons régulateurs */}
        <div className="bg-slate-950 text-white p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 shadow-inner border border-slate-800">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Vitesse Maximale V_max : {vMax.toFixed(1)} uM/s
            </label>
            <input 
              type="range" min="15.0" max="50.0" step="1.0" value={vMax} 
              onChange={(e) => setVMax(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <p className="text-[10px] text-slate-450 mt-1">S'obtient par saturation totale de toutes les enzymes actives.</p>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
              Constante de Michaelis K_m : {kM.toFixed(1)} uM
            </label>
            <input 
              type="range" min="10.0" max="60.0" step="1.0" value={kM} 
              onChange={(e) => setKM(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
            <p className="text-[10px] text-slate-450 mt-1">Indicateur inverse d'affinité (plus Km est petit, plus Km lie fort le substrat).</p>
          </div>
        </div>

        {/* Tracé SVG de l'hyperbole de vitesse */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 500 300" className="w-full max-w-[450px] font-sans">
            {/* Grille axes */}
            <line x1={originX} y1={originY} x2="470" y2={originY} stroke="#cbd5e1" strokeWidth="2" />
            <line x1={originX} y1="30" x2={originX} y2={originY} stroke="#cbd5e1" strokeWidth="2" />

            {/* Ligne d'asymptote horizontale de Vmax */}
            <line 
              x1={originX} y1={originY - vMax * scaleY} 
              x2="450" y2={originY - vMax * scaleY} 
              stroke="#64748b" strokeWidth="1" strokeDasharray="4 4"
            />

            {/* Tracé de l'hyperbole cinétique */}
            <path d={`M ${pointsHyperbola.join(' L ')}`} fill="none" stroke="#3b82f6" strokeWidth="3" />

            {/* Point Km , Vmax/2 et projections projetés */}
            <line x1={characteristicX} y1={characteristicY} x2={characteristicX} y2={originY} stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
            <line x1={characteristicX} y1={characteristicY} x2={originX} y2={characteristicY} stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" />
            
            <circle cx={characteristicX} cy={characteristicY} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />

            {/* Labels descriptifs */}
            <text x="400" y="290" className="text-[10px] fill-slate-500 font-bold">Substrat [S] (uM)</text>
            <text x="12" y="45" className="text-[10px] fill-slate-500 font-bold">Vitesse V</text>
            
            <text x={originX + 5} y={originY - vMax * scaleY - 6} className="text-[8px] fill-slate-500 font-bold">Asymptote saturante V_max</text>
            <text x={characteristicX - 15} y={originY + 15} className="text-[9px] fill-red-650 font-bold">K_m</text>
            <text x="15" y={characteristicY + 3} className="text-[9px] fill-red-650 font-bold">V_max/2</text>
          </svg>
        </div>

        {/* Tableau récapitulatif */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Demi-Vitesse de réaction (V_max/2)</p>
            <p className="text-xl text-indigo-700 dark:text-indigo-300 mt-1">{(vMax / 2).toFixed(2)} uM/s</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Efficacité Intracellulaire de liaison</p>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 mt-1">{(vMax / kM).toFixed(3)} s^-1</p>
          </div>
        </div>
      </Section>

      <Section title="📈 Linéarisation Réciproque de Lineweaver-Burk" icon="Scaling" color="rose">
        <p className="mb-4">
          Comment les biochimistes mesurent-ils concrètement les constantes <MathComponent math="V_{\max}" /> et <MathComponent math="K_m" /> en laboratoire ? Inverser directement l'hyperbole de vitesse est instable à cause des fluctuations de mesure. En 1934, Hans Lineweaver et Dean Burk proposent de prendre la réciproque linéaire (le double inverse) de l'équation de Michaelis-Menten :
        </p>

        <FormulaBox 
          title="Équation Linéarisée de Lineweaver-Burk" 
          math="\frac{1}{V} = \frac{K_m}{V_{\max}} \cdot \frac{1}{[S]} + \frac{1}{V_{\max}}" 
        />

        <p className="my-4">
          La constante d'inversion livre l'équation canonique d'une droite de régression affine d'expression <MathComponent math="y = m \cdot x + p" /> où :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>La variable ordonnée est <MathComponent math="y = 1/V" /> et l'abscisse est <MathComponent math="x = 1/[S]" />.</li>
          <li>La pente géométrique vaut : <MathComponent math="m = K_m / V_{\max}" />.</li>
          <li>L'ordonnée à l'origine (intercept y) donne précisément : <MathComponent math="p = 1/V_{\max}" />.</li>
          <li>L'abscisse d'annulation (intercept x de la droite interpolée) correspond exactement à : <MathComponent math="-1/K_m" />.</li>
        </ul>
      </Section>

      <Section title="🎯 Résolution de Problèmes Pas à Pas" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice corrigé : Régression linéaire par double réciproque"
          question={<p>En laboratoire de biochimie, on mesure les vitesses d'une réaction enzymatique en variant la concentration de substrat. La droite de régression de Lineweaver-Burk obtenue à partir de ces mesures livre l'équation d'ajustement affine suivante : {"$y = 0.50 x + 0.02$"} (avec y en $s/\mu M$ et x en $1/\mu M$). Déterminer les valeurs physiques exactes de la constante de Michaelis et de la célérité saturationnelle maximal.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Isoler l'intercept vertical de l'équation</p>
              <p>L'intercept à l'origine p (valeur de y lorsque x tend vers 0) équivaut à la constante :</p>
              <p>{"$p = \\frac{1}{V_{\\max}} = 0.02 \\quad s/\\mu M$"}.</p>
              <p>On inverse pour isoler immédiatement la vitesse maximale de l'enzyme :</p>
              <p>{"$V_{\\max} = \\frac{1}{0.02} = 50 \\quad \\mu M/s$"}.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Isoler le coefficient directeur de pente</p>
              <p>D'après Lineweaver-Burk, la pente m de la régression vaut :</p>
              <p>{"$m = \\frac{K_m}{V_{\\max}} = 0.50 \\quad s$"}.</p>
              <p>Connaissant la valeur calculée de <MathComponent math="V_{\max}" /> :</p>
              <p>{"$K_m = 0.50 \\times V_{\\max} = 0.50 \\times 50 = 25 \\quad \\mu M$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Évaluation de l'efficacité catalytique et conclusion</p>
              <p>La constante d'affinité inverse vaut précisément <MathComponent math="K_m = 25 \mu M" />.</p>
              <p>On obtient l'efficacité de liaison cellulaire brute de l'enzyme :</p>
              <p>{"$\\frac{V_{\\max}}{K_m} = \\frac{50}{25} = 2.00 \\quad s^{-1}$"}.</p>
              <p>Cette linéarisation géniale permet à de simples outils affines d'extraire des comportements microscopiques cellulaires ultra-précis !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Synthèse Biochimique" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Quelle est l'interprétation concrète d'une constante de Michaelis Km très élevée ?</>}
            back={<>Une valeur Km élevée caractérise une faible affinité de l'enzyme pour son substrat, car il requiert d abundance de matières pour occuper et activer la moitié de ses sites catalytiques.</>}
          />
          <Flashcard 
            front={<>Qu'est-ce que le Turnover number (ou constante de vitesse kcat) d'une enzyme ?</>}
            back={<>Aussi appelé fréquence de rotation, {"$k_{\\text{cat}} = V_{\\max}/[E]_{\\text{total}}$"} définit le nombre de molécules de substrat converties en produit par une molécule d'enzyme isolée par seconde.</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Comment distingue-t-on l'inhibiteur compétitif de l'inhibiteur non compétitif sur Lineweaver-Burk ?">
          <ul className="list-disc pl-6 space-y-1">
            <li>Un **inhibiteur compétitif** (qui prend la place du substrat au site actif de liaison) modifie artificiellement la constante d'affinité <MathComponent math="K_m" /> sans altérer <MathComponent math="V_{\max}" />. Dans le plan de Lineweaver-Burk, les droites se croisent sur l'axe des ordonnées vertical.</li>
            <li>Un **inhibiteur non compétitif** (qui bloque l'enzyme de loin au niveau allostérique) sabote la force catalytique et divise <MathComponent math="V_{\max}" /> sans changer l'affinité <MathComponent math="K_m" />. Les droites boursières coupent alors l'axe horizontal au même endroit (<MathComponent math="-1/K_m" />).</li>
          </ul>
        </Accordion>
        <Accordion title="2. Qu'est-ce que la barrière physique absolue d'efficacité (limite de diffusion) ?">
          La constante d'efficacité cinétique globale de Michaelis ne peut structurellement dépasser le rythme des collisions physiques simples provoquées par la diffusion brownienne aqueuse. Ce plafond absolu de perfection évolutive enzymatique est fixé entre <MathComponent math="10^8" /> et <MathComponent math="10^9" /> <MathComponent math="M^{-1}s^{-1}" /> (ex: enzyme catalase ou acétylcholinestérase).
        </Accordion>
        <Accordion title="3. Pourquoi les enzymes coopératives (allostérie) échappent-elles à Michaelis-Menten ?">
          Des complexes proteines à plusieurs sites de liaison présentent un effet coopératif d'affinité progressive (ex: l'hémoglobine). Leur vitesse cinétique prend une forme sigmoïdale asymétrique en S au lieu d'une hyperbole simple, modélisée par l'**Équation coopérative de Hill**.
        </Accordion>
      </Section>

      <Section title="📝 Quiz d'évaluation biochimique" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle condition sur les concentrations d'un essai enzymatique justifie l'hypothèse d'état quasi-stationnaire ?",
              options: [
                "La concentration du substrat doit être très largement excédentaire par rapport à l'enzyme [S] >> [E]",
                "La température de la solution doit tendre vers le zéro absolu (-273°C)",
                "Il ne doit y avoir aucune molécule d'eau"
              ],
              correctAnswer: 0,
              explanation: "Pour que la réserve de complexe [ES] se maintienne de manière stable sans s'effondrer instantanément sous l'effort de consommation de l'enzyme, il faut que le réservoir de substrat libre [S] abonde massivement devant le nombre de sites d'enzymes."
            },
            {
              question: "Si l'on double la concentration totale d'enzyme [E]_total injectée dans la fiole, que se passe-t-il pour V_max et K_m ?",
              options: [
                "Vmax double tandis que Km reste strictement constant",
                "Vmax reste constant, Km est divisé par deux",
                "Les deux constantes doublent"
              ],
              correctAnswer: 0,
              explanation: "Km est un ratio intrinsèque thermodynamique indépendant de la quantité de protéines solubles. En revanche, Vmax correspond à une vitesse de production globale de saturation directement proportionnelle à l'effectif d'enzymes mobilisé : Vmax = kcat * [E]_total."
            },
            {
              question: "Quel paramètre physique se lit directement au point d'abscisse négative d'une régression de double réciproque ?",
              options: [
                "La valeur 1 / Vmax",
                "La valeur négative d'affinité inverse -1 / Km",
                "Le rendement énergétique"
              ],
              correctAnswer: 1,
              explanation: "En posant 1/V = 0 dans l'équation linéarisée de Lineweaver-Burk, l'abscisse s'annule : y = 0 => x = -1 / Km, permettant de décoder de façon immédiate l'affinité enzymatique de l'appareil."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais le formalisme réactionnel cinétique de Michaelis-Menten.",
            "Je sais démontrer la loi quasi-stationnaire stochastique de Briggs-Haldane.",
            "Je maîtrise la représentation géo-linéarisée de Lineweaver-Burk.",
            "Je comprends les notions d'affinité enzymatique de Michaelis active."
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

export default Course_Sup_Bio_MichaelisMenten;
