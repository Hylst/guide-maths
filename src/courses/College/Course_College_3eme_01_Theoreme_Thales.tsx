import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import ThalesConfigurations from '../../components/interactive/ThalesConfigurations';
import { Sparkles, Calculator, Sliders, Check, HelpCircle } from 'lucide-react';

const Course_College_3eme_01_Theoreme_Thales: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Local states for the interactive calculator
  const [am, setAm] = useState<number>(3);
  const [ab, setAb] = useState<number>(5);
  const [ac, setAc] = useState<number>(10);
  const [focusInput, setFocusInput] = useState<string | null>(null);

  // Calculate AN = (AM * AC) / AB
  const ratio = ab > 0 ? am / ab : 0;
  const an = ratio * ac;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-01"
        title="Le Théorème de Thalès"
        subtitle="Calculez des longueurs inaccessibles grâce à la géométrie proportionnelle !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["La proportionnalité", "Les droites parallèles", "Les quotients égaux"]}
        objectives={[
          "Reconnaître les deux configurations de Thalès (classique et papillon).",
          "Poser correctement les rapports d'égalité (les fractions).",
          "Calculer une longueur manquante avec le produit en croix.",
          "Utiliser la réciproque et la contraposée pour prouver le parallélisme.",
          "Comprendre le lien avec l'agrandissement et la réduction (coefficient k)."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Les fractions égales et la règle de trois">
        Pour réussir Thalès, rappelle-toi que si deux fractions sont égales, par exemple {"$\\frac{a}{b} = \\frac{c}{d}$"}, alors leurs produits en croix sont égaux : {"$a \\times d = b \\times c$"}. On peut ainsi calculer la quatrième valeur inconnue : {"$a = \\frac{b \\times c}{d}$"}.
      </InfoBlock>

      <Section title="🌟 Introduction : Le secret de la Pyramide" icon="📐" color="slate">
        <p>
          Il y a plus de 2500 ans, le pharaon d'Égypte mit au défi le philosophe grec <strong>Thalès</strong> de calculer la hauteur exacte de la grande pyramide de Khéops. Impossible de grimper au sommet avec un décamètre !
        </p>
        <p className="mt-4">
          Thalès eut alors une intuition de génie en regardant les ombres créées par le soleil. Il planta son propre bâton verticalement dans le sable et compara : 
          <em className="block bg-slate-50 dark:bg-slate-900 border-l-4 border-indigo-500 pl-4 py-3 my-4 rounded-r-xl">
            "Si les rayons du soleil sont parallèles, l'ombre de l'immense pyramide est une version géante et strictement proportionnelle de l'ombre de mon petit bâton !"
          </em>
          En formalisant cette idée de proportionnalité des triangles semblables, il venait de découvrir l'un des théorèmes les plus légendaires et utiles de la géométrie plane.
        </p>
        <p className="mt-4">
          Aujourd'hui, ce théorème est utilisé partout : en cartographie pour mettre à l'échelle, en infographie 3D pour projeter des perspectives, en topographie pour calculer des hauteurs de falaises, et lors de la fabrication d'optiques microscopiques !
        </p>
      </Section>

      <Section title="📐 Schéma Pédagogique Interactif" icon="👁️" color="indigo">
        <TipBanner title="Pilotez vous-même la proportionnalité !" type="info">
          <p>
            Ci-dessous, sélectionnez la configuration (Classique ou Papillon), puis faites glisser le curseur pour faire varier le coefficient de proportionnalité {"$k$"}. Constatez que les quotients de longueurs restent identiques en permanence !
          </p>
        </TipBanner>

        <div className="my-8">
          <ThalesConfigurations alt="Démonstrateur de Thalès Interactif" />
        </div>
      </Section>

      <Section title="1. Les deux configurations et l'écriture sacrée" icon="🎭" color="indigo">
        <p className="mb-6">
          Pour appliquer le théorème de Thalès, il te faut obligatoirement valider deux conditions géométriques de base :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-50 dark:bg-slate-900/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></span>
              Configuration 1 : Emboîtée
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Un petit triangle <MathComponent math={"AMN"} /> est niché à l'intérieur d'un grand triangle <MathComponent math={"ABC"} />. Les sommets sont alignés en faisceau de part et d'autre (<MathComponent math={"A, M, B"} /> d'un côté et <MathComponent math={"A, N, C"} /> de l'autre). Les lignes de fond du petit et du grand triangle sont parallèles.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></span>
              Configuration 2 : Papillon
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Les droites se croisent au sommet commun <MathComponent math={"A"} />. Les deux triangles sont opposés par ce sommet (comme des ailes de papillon). Les lignes limites extérieures <MathComponent math={"(MN)"} /> et <MathComponent math={"(BC)"} /> doivent être rigoureusement parallèles.
            </p>
          </div>
        </div>

        <InfoBlock title="Règle absolue d'écriture : partez toujours du Sommet Commun !" type="definition">
          Pour ne jamais mélanger les pinceaux dans vos fractions :
          <ol className="list-decimal ml-6 mt-3 space-y-2 text-sm md:text-base text-foreground/90">
            <li>Identifiez le point d'intersection des deux droites sécantes (le point de rencontre des deux triangles, appelons-le le <strong>sommet principal</strong>, par exemple {"$A$"}).</li>
            <li>Posez trois rapports sous la forme : <strong className="text-indigo-600">{"$\\frac{\\text{Petit Côté}}{\\text{Grand Côté}}$"}</strong>.</li>
            <li>Suivez chaque ligne directrice en partant du sommet principal : d'abord le segment court, puis le segment long.</li>
            <li>Terminez par le rapport des deux droites parallèles (la petite base sur la grande base).</li>
          </ol>
        </InfoBlock>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 text-center shadow-sm my-8">
          <p className="font-bold text-indigo-950 dark:text-indigo-200 mb-2">Les trois quotients égaux (avec le sommet principal A) :</p>
          <div className="font-mono text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400 my-4 flex items-center justify-center gap-4">
            <div className="flex flex-col items-center"><span>AM</span><div className="h-px w-12 bg-current my-1"></div><span>AB</span></div>
            <span>=</span>
            <div className="flex flex-col items-center"><span>AN</span><div className="h-px w-12 bg-current my-1"></div><span>AC</span></div>
            <span>=</span>
            <div className="flex flex-col items-center"><span>MN</span><div className="h-px w-12 bg-current my-1"></div><span>BC</span></div>
          </div>
          <p className="text-xs text-indigo-800 dark:text-indigo-300 font-bold tracking-wider mt-4">
            RAPPORT DE RÉDUCTION k = AM/AB (petit côté sur côté d'origine correspondant).
          </p>
        </div>
      </Section>

      <Section title="🛠️ Application Interactif : Le simulateur de produit en croix ! " icon={<Calculator className="w-6 h-6 text-indigo-500" />} color="indigo">
        <p className="mb-6">
          Manipulez directement les longueurs réelles ci-dessous et découvrez comment le produit en croix (ou règle de trois) résout automatiquement la longueur de côté manquante {"$AN$"}.
        </p>

        <div className="bg-card dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-md my-8">
          <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Cherchons la longueur de AN par la proportionnalité
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label htmlFor="am-input" className="block text-sm font-bold text-slate-600 dark:text-slate-400">Longueur AM (petit côté) :</label>
              <div className="flex items-center gap-3">
                <input 
                  id="am-input"
                  type="range" min="0.1" max="15" step="0.1" value={am} 
                  onChange={(e) => setAm(parseFloat(e.target.value))} 
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="font-mono text-base font-bold bg-muted px-3 py-1.5 rounded-lg border w-16 text-center">{am.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="ab-input" className="block text-sm font-bold text-slate-600 dark:text-slate-400 font-bold">Longueur AB (grand côté) :</label>
              <div className="flex items-center gap-3">
                <input 
                  id="ab-input"
                  type="range" min="1" max="25" step="0.1" value={ab < am ? am : ab} 
                  onChange={(e) => setAb(Math.max(am, parseFloat(e.target.value)))} 
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="font-mono text-base font-bold bg-muted px-3 py-1.5 rounded-lg border w-16 text-center">{ab.toFixed(1)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="ac-input" className="block text-sm font-bold text-slate-600 dark:text-slate-400">Longueur AC (grand côté opposé) :</label>
              <div className="flex items-center gap-3">
                <input 
                  id="ac-input"
                  type="range" min="1" max="30" step="0.1" value={ac} 
                  onChange={(e) => setAc(parseFloat(e.target.value))} 
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="font-mono text-base font-bold bg-muted px-3 py-1.5 rounded-lg border w-16 text-center">{ac.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 font-mono text-sm leading-relaxed">
            <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase text-slate-400 tracking-wider">
              <span>Résolution Étape par Étape</span>
            </div>
            
            <p className="mb-2">
              1. Nous posons le rapport Thalès correspondant :
            </p>
            <div className="my-4 flex items-center justify-start gap-4 text-base font-bold text-foreground">
              <div className="flex flex-col items-center"><span>{am.toFixed(1)}</span><div className="h-0.5 w-10 bg-slate-500 my-1"></div><span>{ab.toFixed(1)}</span></div>
              <span>=</span>
              <div className="flex flex-col items-center"><span className="text-indigo-600 font-black animate-pulse">AN</span><div className="h-0.5 w-10 bg-slate-500 my-1"></div><span>{ac.toFixed(1)}</span></div>
            </div>

            <p className="mb-2">
              2. Nous appliquons le produit en croix pour isoler {"$AN$"} :
            </p>
            <div className="bg-card dark:bg-slate-900 border p-3 rounded-xl mb-4 inline-block text-base font-bold">
              AN = <span className="text-emerald-500">{"\\frac{" + am.toFixed(1) + " \\times " + ac.toFixed(1) + "}{" + ab.toFixed(1) + "}"}</span>
            </div>

            <p className="mt-2 text-foreground font-semibold">
              3. Résultat : <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 px-3 py-1 rounded inline-block">AN = {an.toFixed(2)} cm</span>
            </p>
          </div>
        </div>
      </Section>

      <Section title="2. Méthodologie du Brevet" icon="📝" color="emerald">
        <h3 className="text-xl font-bold mt-4 mb-2">2.1 La rédaction parfaite</h3>
        <p className="mb-4 text-muted-text">Au brevet, le simple calcul de la fraction ne suffit pas. Tu dois écrire ton raisonnement (les conditions d'application du Théorème).</p>
        
        <div className="bg-card p-6 rounded-[2rem] border border-border-strong mb-8">
          <ul className="space-y-3 font-medium text-foreground">
            <li><span className="text-emerald-600 dark:text-emerald-400">1.</span> On sait que les points A, M, B et A, N, C sont alignés dans cet ordre sur leurs droites respectives.</li>
            <li><span className="text-emerald-600 dark:text-emerald-400">2.</span> On sait que les droites (MN) et (BC) sont <strong>parallèles</strong>.</li>
            <li><span className="text-emerald-600 dark:text-emerald-400">3.</span> Or, d'après le théorème de Thalès, il y a égalité des rapports :</li>
            <li className="font-mono text-center pt-2">AM/AB = AN/AC = MN/BC</li>
          </ul>
        </div>

        <InfoBlock title="Le saviez-vous ?" type="funfact">
          Thalès s'amuse avec des homothéties ! Le théorème de Thalès est en réalité le précurseur de la notion d'homothétie et de rapports géométriques du plan. Un coefficient {"$k < 1$"} représente une <strong>réduction</strong> géométrique de la figure, alors qu'un coefficient {"$k > 1$"} représente un <strong>agrandissement</strong>.
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Les configurations 'Papillon' cachées">
          La configuration « Papillon » est souvent plus difficile à visualiser. Rappelez-vous qu&apos;elle est rigoureusement identique à la configuration classique : il s&apos;agit de deux triangles semblables qui se font face par leur sommet commun. L&apos;un est simplement l&apos;image de l&apos;autre par une homothétie de rapport négatif (un agrandissement ou une réduction avec un demi-tour à 180° !).
        </InfoBlock>
      </Section>

      <Section title="⚖️ Le Tribunal du parallèles : Réciproque et Contraposée" icon="⚖️" color="blue">
        <p className="mb-4">
          Parfois, l'énoncé ne te dit pas si les droites sont parallèles. Au contraire, il te demande de <strong>prouver</strong> qu'elles le sont (ou qu'elles ne le sont pas !). On va alors utiliser la <em>Réciproque</em> de Thalès.
        </p>
        
        <TipBanner title="Méthode D'une part / D'autre part" type="info">
          Ne démarre JAMAIS en écrivant que les fractions sont d'emblée égales avec un signe <code>=</code> (puisque c'est ce qu'on cherche à vérifier !). Calcule les fractions séparément et compare-les.
        </TipBanner>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 shadow-sm">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-200 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
              Si c'est ÉGAL (Réciproque)
            </h4>
            <p className="text-sm leading-relaxed mb-3">
              Si <strong>d'une part</strong> {"$AM/AB = 0,4$"} et <strong>d'autre part</strong> {"$AN/AC = 0,4$"}.
            </p>
            <p className="text-sm opacity-90 leading-relaxed font-medium text-slate-700 dark:text-slate-300">
              On constate que les rapports de longueurs sont strictement identiques et que les points sont placés dans le même ordre.
              <strong className="block text-emerald-600 dark:text-emerald-400 mt-2 font-bold">
                Verdict : D'après la Réciproque du théorème de Thalès, les droites (MN) et (BC) sont parallèles.
              </strong>
            </p>
          </div>
          <div className="bg-rose-50/50 dark:bg-rose-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-800/60 shadow-sm">
            <h4 className="font-bold text-rose-950 dark:text-rose-200 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-500 rounded-full"></span>
              Si c'est DIFFÉRENT (Contraposée)
            </h4>
            <p className="text-sm leading-relaxed mb-3">
              Si <strong>d'une part</strong> {"$AM/AB = 0,5$"} et <strong>d'autre part</strong> {"$AN/AC = 0,52$"}.
            </p>
            <p className="text-sm opacity-90 leading-relaxed font-medium text-slate-700 dark:text-slate-300">
              On constate que les rapports géométriques ne sont pas identiques. La régularité proportionnelle est brisée.
              <strong className="block text-rose-600 dark:text-rose-400 mt-2 font-bold">
                Verdict : D'après la Contraposée du théorème de Thalès, les droites (MN) et (BC) ne sont PAS parallèles.
              </strong>
            </p>
          </div>
        </div>

        <InfoBlock title="Rappel important : Gardez les fractions irréductibles !" type="reminder">
          Si vous faites la division de {"$\\frac{2}{3}$"} sur votre calculatrice, elle affichera <code>0,666666...</code>. Si l'autre bloc vous donne {"$\\frac{20}{30}$"}, n'essayez pas de comparer des arrondis décimaux arbitraires ! Calculez toujours avec les fractions exactes !
        </InfoBlock>
      </Section>

      <Section title="✍️ Exercices Résolus de Brevet" icon="✏️" color="emerald">
        {/* Exercice Résolu 1 */}
        <InteractiveExercise 
          title="Exercice 1 : Calculer une hauteur impossible (Thalès Direct)"
          question={(
            <div>
              <p className="mb-2">
                Un géomètre souhaite calculer la hauteur d'une falaise verticale. Pour cela, il place un poteau <MathComponent math={"[MN]"} /> de 2m de hauteur à 12m de distance de la falaise <MathComponent math={"[BC]"} />.
              </p>
              <p className="mb-2">
                En s'allongeant sur le sol au point <MathComponent math={"A"} /> situé à 3m du poteau, les sommets du poteau <MathComponent math={"N"} /> et de la falaise <MathComponent math={"C"} /> sont parfaitement alignés avec son œil de visée.
              </p>
              <p className="font-bold">
                Déterminer la hauteur de la falaise BC.
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Analyse de la configuration :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                La falaise [BC] et le poteau [MN] sont tous deux perpendiculaires au sol horizontal (AB). Deux droites perpendiculaires à une même droite sont parallèles ! On a donc <MathComponent math={"(MN) // (BC)"} />. Les points A, M, B d'une part et A, N, C d'autre part sont alignés. C'est la configuration classique de Thalès.
              </p>
            </>,
            <>
              <strong>2. Calcul du segment AB total :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Attention piège ! Le segment total AB va de l'œil du géomètre A jusqu'au fond de la falaise. Donc : <br/>
                <code>AB = AM + MB = 3m + 12m = 15m.</code> (Et non 12m !).
              </p>
            </>,
            <>
              <strong>3. Pose de l'égalité de Thalès :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                On lance l'écriture magique à partir du sommet A : <br/>
                {"$\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$"}
              </p>
            </>,
            <>
              <strong>4. Remplacement par les valeurs connues :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                On ne s'intéresse qu'aux fractions AM/AB et MN/BC : <br/>
                {"$\\frac{3}{15} = \\frac{2}{BC}$"}
              </p>
            </>,
            <>
              <strong>5. Résolution par produit en croix :</strong>
              <p className="mt-1 text-sm text-foreground/85 font-mono">
                BC = (15 × 2) ÷ 3 = 30 ÷ 3 = 10 mètres.
              </p>
              <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">
                La hauteur de la falaise est de 10 mètres.
              </p>
            </>
          ]}
        />

        {/* Exercice Résolu 2 */}
        <InteractiveExercise 
          title="Exercice 2 : Enquête au tribunal de la voile (La Réciproque)"
          question={(
            <div>
              <p className="mb-2">
                Sur un voilier de compétition triangulaire, un ingénieur veut s'assurer que sa barre de renfort <MathComponent math={"[DE]"} /> est rigoureusement parallèle à la coque <MathComponent math={"[BC]"} />.
              </p>
              <p className="mb-2">
                On donne les mesures de tension structurelle sur le mât :
              </p>
              <ul className="list-disc ml-6 space-y-1 font-mono text-sm">
                <li>AD = 1,2 m</li>
                <li>AB = 3,6 m</li>
                <li>AE = 1,5 m</li>
                <li>AC = 4,5 m</li>
              </ul>
              <p className="mt-2 font-bold">
                La barre de renfort [DE] est-elle parallèle à la coque [BC] ?
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Analyse de la méthode :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Nous voulons savoir si deux droites sont parallèles à partir de mesures de longueurs sur deux sécantes croisant au point A. Nous allons appliquer la méthode "D'une part / D'autre part" avec les rapports issus du mât A.
              </p>
            </>,
            <>
              <strong>2. Calcul du premier rapport (Côté gauche) :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Calculons la première fraction : <br/>
                {"$\\frac{AD}{AB} = \\frac{1,2}{3,6} = \\frac{12}{36} = \\frac{1}{3} \\approx 0,333$"}.
              </p>
            </>,
            <>
              <strong>3. Calcul du second rapport (Côté droit) :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Calculons la deuxième fraction : <br/>
                {"$\\frac{AE}{AC} = \\frac{1,5}{4,5} = \\frac{15}{45} = \\frac{1}{3} \\approx 0,333$"}.
              </p>
            </>,
            <>
              <strong>4. Comparaison des rapports :</strong>
              <p className="mt-1 text-sm text-foreground/80 flex items-center gap-2">
                D'une part {"$\\frac{AD}{AB} = \\frac{1}{3}$"} et d'autre part {"$\\frac{AE}{AC} = \\frac{1}{3}$"}. <br/>
                On constate que les deux quotients sont <strong>strictement identiques</strong>.
              </p>
            </>,
            <>
              <strong>5. Conclusion officielle :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Puisque les rapports sont égaux et que les points A, D, B d'une part et A, E, C d'autre part sont alignés dans le même ordre : <br/>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 rounded-lg border mt-2 block">
                  D'après la Réciproque du Théorème de Thalès, la barre de renfort (DE) est parfaitement parallèle à la coque (BC).
                </strong>
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards de Synthèse" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le grand piège du quotient : on me donne la distance <MathComponent math={"AM = 2"} /> et le bout suivant <MathComponent math={"MB = 5"} />. Quel dénominateur j'utilise pour la fraction gauche ?</>}
            back={<>Une fraction Thalès fonctionne toujours de mât entier à mât entier ! Tu dois <strong>additionner</strong> les deux morceaux ! La ligne complète <MathComponent math={"AB"} /> mesure donc <code>2 + 5 = 7</code> ! Le rapport est <code>2/7</code> (et non pas 2/5 !).</>}
          />
          <Flashcard 
            front={<>On me donne <code>0,334</code> pour le premier quotient et <code>0,336</code> pour le second. Puis-je considérer qu'ils sont égaux car mon dessin est imprécis ?</>}
            back={<><strong>Non, jamais !</strong> En géométrie théorique du brevet, un écart (même de 0,002) prouve que les deux droites finiront inévitablement par s'intersecter quelque part. C'est inégal : on conclut par la <strong>Contraposée</strong> que les droites ne sont pas parallèles !</>}
          />
          <Flashcard 
            front={<>Est-ce que je peux appliquer le théorème de Thalès dans un triangle quelconque qui n'a pas d'angle droit ?</>}
            back={<><strong>OUI, absolument !</strong> C'est la grande différence avec Pythagore ou la Trigonométrie. Le théorème de Thalès n'exige UNIQUEMENT que deux droites parallèles. Pas besoin de triangle rectangle pour poser ses rapports !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi est-ce si important de préciser que les points sont alignés dans le même ordre ?",
              answer: "Si on ne précisait pas 'dans le même ordre' au brevet, la figure de la réciproque pourrait se tordre ou se croiser de façon inattendue tout en conservant les mêmes ratios numériques, ce qui briserait le parallélisme. C'est une condition géométrique absolue de rigueur."
            },
            {
              question: "Quelle est la différence exacte entre le Théorème direct, la Réciproque et la Contraposée ?",
              answer: "1. Le THÉORÈME DIRECT s'applique quand on SAIT déjà que c'est parallèle, et permet de calculer une longueur inconnue.\n2. La RÉCIPROQUE s'applique quand on veut prouver qu'une figure EST parallèle grâce à l'identité parfaite des quotients.\n3. La CONTRAPOSÉE s'applique quand l'inégalité démontre que la figure n'est PAS parallèle."
            },
            {
              question: "Peut-on utiliser le produit en croix avec plus de deux fractions ?",
              answer: "Non, un produit en croix s'exécute toujours deux par deux. Si vous avez AM/AB = AN/AC = MN/BC, vous sélectionnez l'unique couple de fractions qui contient une seule inconnue et trois nombres parfaitement identifiés."
            }
          ]}
        />
      </Section>

      <Section title="🏆 Quiz d'Évaluation Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans la configuration de Thalès ci-dessus, si le coefficient d'agrandissement k d'une fraction est égal à 1.5, que signifie-t-il ?",
              options: [
                "Le petit triangle est 1.5 fois plus petit.",
                "Le grand triangle est un agrandissement de coefficient 1.5 du petit triangle.",
                "La surface du grand triangle est 1.5 fois plus grande.",
                "Les angles ont augmenté de 1.5 fois."
              ],
              correctAnswer: 1,
              explanation: "Le coefficient k > 1 caractérise un agrandissement linéaire uniforme de toutes les longueurs de la figure d'origine par 1.5."
            },
            {
              question: "On vous donne AM = 3, AB = 9, AN = 4, et AC = 12. Les droites sont-elles parallèles ?",
              options: [
                "Oui, car 3/9 = 1/3 et 4/12 = 1/3, les rapports sont égaux.",
                "Non, car 3 et 9 n'ont rien à voir avec 4 et 12.",
                "On ne peut pas savoir sans connaître la troisième fraction."
              ],
              correctAnswer: 0,
              explanation: "D'une part AM/AB = 3/9 = 1/3. D'autre part AN/AC = 4/12 = 1/3. Les rapports sont rigoureusement égaux, donc la Réciproque s'applique : les droites sont parallèles !"
            },
            {
              question: "Pour poser le produit en croix, que fait-on si l'une des fractions n'a aucune valeur ?",
              options: [
                "On remplace par le chiffre 0.",
                "On l'ignore et on utilise uniquement les deux autres fractions.",
                "L'exercice est impossible, on est bloqué.",
                "On utilise la formule de Pythagore à la place."
              ],
              correctAnswer: 1,
              explanation: "C'est l'essence de Thalès : on dispose de trois rapports géométriques égaux, mais un seul couple d'équations suffit pour faire résonner le produit en croix du brevet !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je pose toujours ma flèche à partir du sommet principal commun pour commencer ma fraction.",
            "J'exécute séparément les calculs pour la réciproque avec 'd'une part' et 'd'autre part'.",
            "J'additionne les morceaux de segments pour trouver la longueur totale du grand côté ! (Le piège d'or).",
            "Je garde mes fractions réduites sous forme de fraction irréductible exacte."
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

export default Course_College_3eme_01_Theoreme_Thales;
