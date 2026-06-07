import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { ShieldCheck, Lock, Binary, Cpu, Disc, Sparkles, Check } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_3eme_04_Arithmetique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Local state for the interactive divisor and prime factorizer tool
  const [numInput, setNumInput] = useState<string>("120");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Parse and calculate prime factorization
  const parseNumber = parseInt(numInput, 10);
  const isValid = !isNaN(parseNumber) && parseNumber >= 2 && parseNumber <= 99999;

  const getFactorization = (n: number) => {
    let temp = n;
    const factors: { prime: number; exponent: number }[] = [];
    let d = 2;
    // Simple but highly effective trial division
    while (d * d <= temp) {
      if (temp % d === 0) {
        let count = 0;
        while (temp % d === 0) {
          count++;
          temp = temp / d;
        }
        factors.push({ prime: d, exponent: count });
      }
      d === 2 ? d++ : d += 2;
    }
    if (temp > 1) {
      factors.push({ prime: temp, exponent: 1 });
    }
    const isPrime = factors.length === 1 && factors[0].exponent === 1;
    return { factors, isPrime };
  };

  const calculationResult = isValid ? getFactorization(parseNumber) : null;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-04"
        title="Arithmétique et Nombres Premiers"
        subtitle="Décodez la clé de cryptographie des banques et de la cybersécurité !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Les tables de multiplication", "Les critères de divisibilité (2, 3, 5, 9, 10)", "La division euclidienne"]}
        objectives={[
          "Comprendre les multiples et les diviseurs de manière intuitive.",
          "Identifier les nombres premiers (les briques élémentaires insécables).",
          "Décomposer n'importe quel nombre en produit de facteurs premiers.",
          "Rendre des fractions irréductibles grâce aux facteurs premiers communs.",
          "Comprendre l'application réelle de l'arithmétique en cybersécurité."
        ]}
      />

      <Section title="🛡️ Introduction : Le Bouclier de la Cybersécurité" icon="🛡️" color="slate">
        <p>
          Saisis-tu comment les armées de défense nationale, les banques ou les applications comme WhatsApp arrivent à protéger tes données personnelles sur Internet face aux plus grands pirates informatiques du monde ? Ils utilisent le <strong>"bouclier cryptographique des nombres premiers"</strong> !
        </p>
        <p className="mt-4">
          Un nombre premier est le <em>diamant pur indéformable</em> des mathématiques. C'est une particule élémentaire insécable d'entiers. Tu ne peux le briser par rien, à part 1 ou lui-même. 
        </p>
        <p className="mt-4">
          En combinant deux nombres premiers géants de plusieurs centaines de chiffres, on crée une "clé publique" de verrouillage (le protocole RSA). Pour casser ce cadenas, un ordinateur de hacker devrait tester toutes les combinaisons possibles, ce qui prendrait... plus de temps que l'âge total de notre Univers ! Aujourd'hui, tu vas devenir un codeur scientifique et apprendre à décoder la structure génétique des nombres complexes.
        </p>
      </Section>

      <Section title="🤖 Outil de Cryptographie : Le Décomposeur d'ADN pur" icon={<Cpu className="w-5 h-5 text-indigo-500" />} color="indigo">
        <TipBanner title="Saisissez un nombre entier à analyser" type="info">
          Entre un nombre entre <strong>2</strong> et <strong>99 999</strong> ci-dessous. Le décomposeur de l'applet va automatiquement extraire ses diamants premiers et afficher sa formule génétique !
        </TipBanner>

        <div className="bg-card border border-border-strong rounded-[2rem] p-6 md:p-8 shadow-md my-8">
          <div className="max-w-md mx-auto space-y-4 text-center">
            <label htmlFor="num-calc-input" className="block text-sm font-bold text-slate-600 dark:text-slate-400">Saisir un nombre à fracasser :</label>
            <div className="flex gap-3 justify-center">
              <input 
                id="num-calc-input"
                type="text" 
                value={numInput} 
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ''); // only digits
                  setNumInput(val);
                }} 
                placeholder="Ex prime: 156"
                className="font-mono text-xl text-center font-bold px-4 py-2 border rounded-xl w-48 text-indigo-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            {!isValid && numInput !== "" && (
              <p className="text-xs text-rose-500 font-bold">Veuillez entrer un entier valide supérieur ou égal à 2 (max 99999).</p>
            )}

            {isValid && calculationResult && (
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border text-left space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-xs uppercase font-bold tracking-widest text-slate-500">Statut Arithmétique</span>
                  <div>
                    {calculationResult.isPrime ? (
                      <span className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 rounded-lg shadow-sm">
                        💎 NOMBRE PREMIER PURE
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-bold text-white bg-indigo-600 rounded-lg shadow-sm">
                        📦 NOMBRE COMPOSÉ
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-2xs uppercase text-slate-400 font-bold block">Décomposition en facteurs premiers (ADN) :</span>
                  <div className="bg-card dark:bg-slate-900 px-4 py-3 border rounded-xl font-mono text-lg font-black text-indigo-700 flex flex-wrap gap-2 items-center justify-center">
                    <span>{parseNumber} = </span>
                    {calculationResult.factors.map((f, idx) => (
                      <span key={idx} className="flex items-center">
                        <span className="text-indigo-600 font-black">{f.prime}</span>
                        {f.exponent > 1 && (
                          <sup className="text-rose-500 text-xs font-black ml-0.5">{f.exponent}</sup>
                        )}
                        {idx < calculationResult.factors.length - 1 && <span className="mx-1 text-slate-400">×</span>}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-2xs text-slate-400 leading-normal">
                  {calculationResult.isPrime 
                    ? `Le nombre ${parseNumber} n'a pas d'autres diviseurs que 1 et lui-même. Ses cellules arithmétiques sont indivisibles !` 
                    : `Ce nombre composé est le produit de ces facteurs premiers uniques. C'est l'unique combinaison possible de son ADN.`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section title="1. Les Diviseurs et les Multiples" icon="🔢" color="indigo">
        <p className="mb-4">Tout commence par la division euclidienne (sans virgule !). Si le reste de la division d'un nombre A par un nombre B est ZÉRO, la magie s'opère :</p>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 shadow-sm flex flex-col md:flex-row items-center justify-center gap-6 my-6">
          <div className="text-center font-mono text-xl md:text-2xl font-bold text-foreground">
            24 ÷ 3 = 8 <br/><span className="text-sm text-slate-400">(Reste 0)</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-indigo-200"></div>
          <div className="text-left space-y-2 text-indigo-950 dark:text-indigo-200 font-medium">
            <p>On formule ainsi la trinité arithmétique :</p>
            <ul className="list-disc ml-6 space-y-1 text-sm md:text-base">
              <li>24 est un <strong>multiple</strong> de 3 (et de 8).</li>
              <li>3 est un <strong>diviseur</strong> de 24.</li>
              <li>24 est <strong>divisible</strong> par 3.</li>
            </ul>
          </div>
        </div>

        <TipBanner title="Rappel Vital : Les Critères de Divisibilité" type="info">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2 font-medium">
            <li><strong>Par 2 :</strong> Se termine par un chiffre pair (0, 2, 4, 6, 8).</li>
            <li><strong>Par 3 :</strong> La somme des chiffres est dans la table de 3 (ex: 123 {'->'} 1+2+3=6 = oui).</li>
            <li><strong>Par 5 :</strong> Se termine par 0 ou 5.</li>
            <li><strong>Par 9 :</strong> La somme des chiffres est dans la table de 9.</li>
            <li><strong>Par 10 :</strong> Se termine par 0.</li>
          </ul>
        </TipBanner>
      </Section>

      <Section title="2. Les Nombres Premiers : Les diamants insécables" icon="💎" color="rose">
        <div className="bg-card p-6 rounded-2xl border border-border-strong mb-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl"></div>
          <Lock className="absolute top-6 right-6 w-8 h-8 text-rose-500 opacity-20" />
          <h3 className="text-xl font-bold text-rose-600 dark:text-rose-400 mb-2 font-sans">Définition Officielle</h3>
          <p className="text-lg text-foreground font-medium leading-relaxed">
            Un nombre entier est dit <strong>premier</strong> s'il possède <strong>EXACTEMENT DEUX</strong> diviseurs distincts : 1 et lui-même.
          </p>
        </div>

        <InfoBlock title="Le cas tragique du nombre 1 !" type="warning">
          Le nombre 1 n'a <strong>QU'UN SEUL</strong> diviseur (lui-même). Il ne répond donc pas à la définition de posséder "exactement deux" diviseurs distincts. Par conséquent, <strong>le nombre 1 n'est pas premier !</strong>
        </InfoBlock>

        <p className="mt-8 mb-4 font-semibold text-foreground">Voici la liste officielle des premiers nombres premiers que tu DOIS connaître par cœur :</p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[2, 3, 5, 7, 11, 13, 17, 19, 23, 29].map((n) => (
            <div key={n} className="w-12 h-12 flex items-center justify-center bg-rose-100 dark:bg-rose-900/40 text-rose-950 dark:text-rose-100 rounded-xl font-bold font-mono text-xl shadow-sm border border-rose-100 dark:border-rose-900">
              {n}
            </div>
          ))}
          <div className="w-12 h-12 flex items-center justify-center text-rose-500/50 font-black text-xl font-mono">...</div>
        </div>

        <InfoBlock title="Le saviez-vous ? Le plus grand nombre premier connu" type="funfact">
          Le plus grand nombre premier connu aujourd&apos;hui (découvert récemment via Internet de manière collaborative) possède plus de 24 millions de chiffres ! S&apos;il fallait l&apos;imprimer entièrement dans un livre de poche, celui-ci compterait environ 9 000 pages et pèserait plusieurs kilogrammes. On appelle ces nombres géants des « nombres premiers de Mersenne ».
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : La conjecture de Goldbach, le plus grand mystère non résolu">
          Énoncée en 1742 par Christian Goldbach, cette conjecture est l&apos;un des plus vieux problèmes non résolus de toutes les mathématiques. Elle affirme que : « Tout nombre entier pair supérieur à 2 peut être écrit comme la somme de deux nombres premiers. »
          <br />Par exemple : <code>4 = 2 + 2</code> ; <code>10 = 3 + 7</code> ; <code>20 = 13 + 7</code> ou <code>3 + 17</code>. 
          <br />Même s&apos;il a été testé et vérifié par des superordinateurs jusqu&apos;à des nombres gigantesques, personne n&apos;a encore réussi à le prouver de manière absolue !
        </InfoBlock>
      </Section>

      <Section title="3. L'Arme de Choc : La Décomposition Unique" icon="⚒️" color="amber">
        <p className="mb-4">
          Le théorème fondamental de l'arithmétique énonce : 
          <strong className="block bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-3 my-3 rounded-r-xl text-amber-950 dark:text-slate-300 font-medium">
            "Tout nombre entier composé supérieur ou égal à 2 peut s'écrire de manière unique sous la forme d'un produit de puissances de nombres premiers."
          </strong>
        </p>

        <p className="mb-6 text-muted-text">
          Pour casser un nombre, on va essayer de le diviser par les nombres premiers dans l'ordre croissant (2, puis 3, puis 5, etc.) jusqu'à ce qu'il ne reste que 1.
        </p>

        <InteractiveExercise 
          title="Le Concassage du nombre 60"
          question={<>Trouvons l'ADN pur (la décomposition en nombres premiers) du nombre <strong>60</strong>.</>}
          steps={[
            <>On se demande : <em>Est-ce que 60 se divise par le premier diamant (2) ?</em><br/>Ses terminaisons (0) disent OUI. On casse : <strong><MathComponent math={"60 \\div 2 = 30"} /></strong>.</>,
            <>Est-ce que 30 se divise encore par 2 ? OUI. <br/>On casse : <strong><MathComponent math={"30 \\div 2 = 15"} /></strong>.</>,
            <>Est-ce que 15 se divise encore par 2 ? NON. (Il finit par 5).<br/>On passe au diamant suivant (3). Est-ce que 15 est dans la table de 3 (1+5=6) ? OUI. <br/>On casse : <strong><MathComponent math={"15 \\div 3 = 5"} /></strong>.</>,
            <>Est-ce que 5 se divise par 3 ? NON. <br/>On passe au diamant suivant (5). Est-ce que 5 se divise par 5 ? OUI. <br/>On casse : <strong><MathComponent math={"5 \\div 5 = 1"} /></strong>.</>,
            <>On a touché le fond (1). L'opération est terminée !</>,
            <>Le code génétique de 60 est le rassemblement de tous les diviseurs qu'on a utilisé : <br/><span className="text-amber-600 dark:text-amber-400 font-mono text-xl font-bold"><MathComponent math={"60 = 2 \\times 2 \\times 3 \\times 5"} /></span><br/>(ou avec les puissances : <strong><MathComponent math={"60 = 2^2 \\times 3 \\times 5"} /></strong>).</>
          ]}
        />
      </Section>

      <Section title="4. Rendre une fraction irréductible" icon="🗡️" color="emerald">
        <p className="mb-4">
          C'est le pouvoir d'effacer les grands nombres au brevet. En posant la décomposition complète en haut et en bas d'une fraction, on peut rayer au feutre rouge tous les facteurs identiques communs.
        </p>

        <div className="bg-muted dark:bg-slate-900/30 p-6 rounded-[2rem] border border-border-strong my-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="font-mono text-2xl font-bold">126</span>
              <div className="w-16 h-0.5 bg-foreground my-2"></div>
              <span className="font-mono text-2xl font-bold">180</span>
            </div>
            
            <div className="text-3xl font-bold text-muted-text">→</div>
            
            <div className="flex flex-col items-center">
              <span className="font-mono text-lg font-bold"><span className="line-through text-rose-500 mr-1 opacity-70">2</span> × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × 7</span>
              <div className="w-32 h-0.5 bg-foreground my-2"></div>
              <span className="font-mono text-lg font-bold"><span className="line-through text-rose-500 mr-1 opacity-70">2</span> × 2 × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × <span className="line-through text-rose-500 mr-1 opacity-70">3</span> × 5</span>
            </div>

            <div className="text-3xl font-bold text-muted-text">→</div>

            <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
              <span className="font-mono text-3xl font-black">7</span>
              <div className="w-12 h-1 bg-current my-2"></div>
              <span className="font-mono text-3xl font-black">10</span>
            </div>
          </div>
          <p className="text-center mt-6 text-sm text-slate-500 font-medium bg-background p-3 rounded-xl shadow-sm border inline-block mx-auto">
            Astuce : On supprime tous les nombres premiers présents en haut et en bas en couples identiques. Ce qui subsiste forme la fraction irréductible simplifiée.
          </p>
        </div>
      </Section>

      <Section title="✏️ Deux Exercices de Brevet Résolus" icon="✏️" color="emerald">
        {/* Exercice 1 : Macarons d'un Pâtissier (PGCD / Combinaisons) */}
        <InteractiveExercise 
          title="Exercice 1 : Les ballotins du Pâtissier (Problème complexe de Brevet)"
          question={(
            <div>
              <p className="mb-2">
                Un artisan chocolatier a fabriqué <strong>120 macarons au chocolat</strong> et <strong>180 macarons à la framboise</strong>.
              </p>
              <p className="mb-2">
                Il souhaite composer des sachets cadeaux identiques contenant chacun le même nombre de macarons chocolat et le même nombre de macarons framboise. Il doit utiliser l'intégralité de sa marchandise.
              </p>
              <p className="font-bold">
                1. Quel est le nombre maximal de sachets qu'il peut confectionner ? <br />
                2. Quelle sera la composition exacte de chaque sachet ?
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Analyse du besoin arithmétique :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Puisque les sachets doivent être identiques et ne laisser aucun reste, le nombre total de sachets doit être un <strong>diviseur commun</strong> de 120 et 180. Pour maximiser les sachets, on cherche donc le <strong>Plus Grand Commun Diviseur (PGCD)</strong> de ces deux entiers.
              </p>
            </>,
            <>
              <strong>2. Décomposition en facteurs premiers de 120 et 180 :</strong>
              <p className="mt-1 text-sm text-foreground/80 font-mono">
                120 = 2 × 2 × 2 × 3 × 5 = 2³ × 3 × 5 <br/>
                180 = 2 × 2 × 3 × 3 × 5 = 2² × 3² × 5
              </p>
            </>,
            <>
              <strong>3. Extraction des facteurs premiers communs du PGCD :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Pour assembler le plus grand diviseur commun, on prend toutes les colonnes communes avec leur plus petit exposant : <br />
                - Facteur 2 commun : au plus bas exposant, c'est {"$2^2$"} (4). <br/>
                - Facteur 3 commun : au plus bas exposant, c'est {"$3^1$"} (3). <br/>
                - Facteur 5 commun : c'est {"$5^1$"} (5). <br/>
                <code>PGCD = 2² × 3 × 5 = 4 × 15 = 60</code>.
              </p>
              <p className="font-bold text-emerald-600">Le chocolatier peut confectionner au maximum 60 sachets identiques.</p>
            </>,
            <>
              <strong>4. Calcul de la composition par sachet :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                On divise le cheptel global par le nombre de boîtes (60) : <br/>
                - Macarons Chocolat : <code>120 ÷ 60 = 2</code> macarons par sachet. <br/>
                - Macarons Framboise : <code>180 ÷ 60 = 3</code> macarons par sachet.
              </p>
            </>,
            <>
              <strong>5. Bilan du chocolatier :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Chacun des 60 sachets rigoureusement identiques contiendra exactement 2 macarons au chocolat et 3 macarons à la framboise. Le problème est résolu !
              </p>
            </>
          ]}
        />
        
        {/* Exercice 2 : Division Euclidienne complexe */}
        <InteractiveExercise 
          title="Exercice 2 : L'algorithme d'Euclide pas à pas"
          question={(
            <div>
              <p className="mb-2">
                On nous demande de trouver le plus grand diviseur commun des deux nombres imposants : <strong>665</strong> et <strong>560</strong>.
              </p>
              <p className="font-bold">
                Mettre en œuvre l'algorithme des divisions successives (Euclide) pour trouver leur PGCD.
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Première division euclidienne :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Dans 665, combien de fois 560 ? Il y va 1 fois, et il reste : <br/>
                <code>665 = 560 × 1 + 105</code> (Reste 105).
              </p>
            </>,
            <>
              <strong>2. Deuxième division (on décale les pivots) :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                On prend le diviseur précédent (560) et le reste précédent (105). Dans 560, combien de fois 105 ? Il y va 5 fois : <br/>
                <code>560 = 105 × 5 + 35</code> (Car 105 × 5 = 525. Il reste 35).
              </p>
            </>,
            <>
              <strong>3. Troisième division (on décale à nouveau) :</strong>
              <p className="mt-1 text-sm text-foreground/80 font-mono">
                Dans 105, combien de fois 35 ? Il y va exactement 3 fois ! <br/>
                <code>105 = 35 × 3 + 0</code> (Le reste est nul !).
              </p>
            </>,
            <>
              <strong>4. Verdict de l'algorithme d'Euclide :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Le PGCD est le <strong>dernier reste non nul</strong> dans la suite d'opérations d'Euclide. Ici, le dernier reste non nul de l'histoire était le nombre <strong>35</strong>.
              </p>
              <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">
                Le PGCD de 665 et 560 est 35.
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le nombre 9 est-il un nombre premier ?</>}
            back={<><strong>NON !</strong><br/>Il a 3 diviseurs distincts : 1, 3, et 9. (Puisque <MathComponent math={"3 \\times 3 = 9"} />). Pour être un nombre premier pur, la définition officielle exige exactement deux diviseurs distincts.</>}
          />
          <Flashcard 
            front={<>Tous les nombres impairs sont-ils des nombres premiers secrets ?</>}
            back={<><strong>Absolument faux !</strong><br/>Des nombres impairs comme 9 (3×3), 15 (3×5) ou 21 (3×7) sont des nombres composés puisqu'ils ont d'autres diviseurs. À l'exception de 2 (qui est pair), tous les nombres premiers sont effectivement impairs !</>}
          />
          <Flashcard 
            front={<>Si un nombre entier finit par 0 ou 5, par quoi est-il obligatoirement divisible ?</>}
            back={<><strong>Par 5 !</strong><br/>C'est le critère de divisibilité de 5. Exemple : 455 ou 1020 sont divisibles par 5.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi les nombres premiers s'arrêtent au-delà de 29 dans votre cours ?",
              answer: "Ils ne s'arrêtent jamais ! Les nombres premiers sont infinis (31, 37, 41, 43, 47, 53...). Le mathématicien antique Euclide a prouvé il y a 2300 ans que la suite des nombres premiers ne s'éteint jamais."
            },
            {
              question: "Quelle est l'utilité réelle de la décomposition de nombres premiers au-delà du brevet ?",
              answer: "C'est l'épine dorsale de la cryptographie RSA. Lorsque vous effectuez un achat sécurisé par carte bancaire sur Internet, vos informations sont codées grâce à un nombre géant constitué de deux facteurs premiers distincts. Briser ce cryptage demanderait des calculs infinis."
            },
            {
              question: "Peut-on décomposer un nombre décimal à virgule (ex: 12,5) ?",
              answer: "Non, l'arithmétique s'occupe exclusivement de la structure discrete des nombres d'objets entiers. Les fractions ou nombres décimaux n'ont pas de décomposition première."
            }
          ]}
        />
      </Section>

      <Section title="🏆 Quiz d'Évaluation Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est le seul et unique nombre PREMIER de la nature qui soit PAIR ?",
              options: [
                "2",
                "4",
                "6",
                "Il n'y en a aucun."
              ],
              correctAnswer: 0,
              explanation: "Le chiffre 2 n'est divisible que par 1 et 2. C'est donc un premier pur. Tous les autres pairs (4, 6...) se divisent par 2 en plus, donc ne peuvent pas être premiers !"
            },
            {
              question: "La décomposition d'un nombre donne 2² × 3² × 5. Quel est ce nombre mystique ?",
              options: [
                "60",
                "120",
                "180",
                "240"
              ],
              correctAnswer: 2,
              explanation: "Faisons le produit : 2² = 4. 3² = 9. Donc 4 × 9 = 36. Ensuite, 36 × 5 = 180. Notre nombre est 180 !"
            },
            {
              question: "Parmi ces nombres, lequel est premier ?",
              options: [
                "33",
                "51",
                "97",
                "111"
              ],
              correctAnswer: 2,
              explanation: "33 = 3 × 11. 51 = 3 × 17. 111 = 3 × 37. Seul 97 est strictement indivisible par un autre facteur. Il est donc premier !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Le nombre 1 n'est jamais premier (un seul diviseur).",
            "J'ai mémorisé la liste de base [2, 3, 5, 7, 11, 13, 17, 19, 23, 29].",
            "La décomposition s'effectue sous forme de multiplications successives (jamais d'additions !).",
            "Je sais rendre une fraction irréductible en rayant les couples de facteurs."
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

export default Course_College_3eme_04_Arithmetique;
