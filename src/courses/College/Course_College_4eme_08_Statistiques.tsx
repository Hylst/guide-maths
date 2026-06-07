import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { BarChart, Target, Zap, LayoutList, Scale, Plus, Minus, Calculator } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_4eme_08_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  // Interactive Grade Weights States
  const [coefMaths, setCoefMaths] = useState<number>(3);
  const [coefFrancais, setCoefFrancais] = useState<number>(2);
  const [coefSport, setCoefSport] = useState<number>(1);

  const gradeMaths = 8;
  const gradeFrancais = 14;
  const gradeSport = 17;

  const totalPoints = (gradeMaths * coefMaths) + (gradeFrancais * coefFrancais) + (gradeSport * coefSport);
  const totalCoefs = coefMaths + coefFrancais + coefSport;
  const weightedAverage = totalPoints / totalCoefs;

  const shareMaths = (coefMaths * 100) / totalCoefs;
  const shareFrancais = (coefFrancais * 100) / totalCoefs;
  const shareSport = (coefSport * 100) / totalCoefs;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-08"
        title="Statistiques (Moyenne Pondérée)"
        subtitle="Agis en authentique Data Analyst et dompte le poids des coefficients !"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Calculer une Moyenne simple (5ème)"]}
        objectives={[
          "Comprendre la différence entre Moyenne simple et Moyenne PONDÉRÉE.",
          "Manipuler l'influence d'un Coefficient sur un résultat de bulletin.",
          "Modéliser et segmenter un grand volume de données par des Centres de classe.",
          "Calculer à coup sûr les fréquences relatives d'apparition (Pourcentages)."
        ]}
      />

      <Section title="🌟 Introduction : Le poids des choses" icon="⚖️" color="slate">
        <p>
          Si tu obtiens un 18/20 en Arts Plastiques (qui dure 1h) et un 4/20 au Brevet Blanc de Mathématiques (qui dure 3h), est-ce que ta Moyenne est juste la moyenne simple : {"$(18+4)/2 = 11/20$"} ? Absolument pas !
        </p>
        <p className="mt-4">
          Le monde réel n'est pas uniforme ; il utilise des <strong>Coefficients (ou des Poids)</strong>. Le 4 en Maths pèse trois fois plus lourd en gravité temporelle dans ton bulletin du trimestre que le 18 d'Arts Plastiques. Tu dois donc cloner ton 4 autant de fois que vaut son coefficient. C'est l'essence du concept de la <strong>Moyenne Pondérée</strong>.
        </p>
      </Section>

      {/* SCHEMA INTERACTIF & APLI ENRICHIE */}
      <Section title="🎮 Simulateur Interactif : Balance de Gravité Scolaire" icon="⚖️" color="indigo">
        <p className="mb-6 text-muted-text">
          Bienvenue dans l'extracteur de bulletin. Fais glisser ou clique sur le sélecteur pour ajuster les <strong>coefficients</strong> des trois matières de cet élève. Regarde instantanément comment la moyenne générale se déplace vers les matières de plus fort poids, représentées par des jauges proportionnelles.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-indigo-100/50 dark:shadow-none shadow-xl">
          {/* Inputs Section (Left) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-indigo-500 font-bold uppercase tracking-widest block mb-1">Configuration des Coefficients</span>
            
            {/* Maths input */}
            <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl">
              <div className="flex justify-between items-center mb-2 font-mono text-sm">
                <span className="font-bold text-rose-700">📐 Mathématiques (Note : 8/20)</span>
                <span className="bg-rose-100 dark:bg-rose-950 px-2.5 py-1 rounded-xl text-rose-800 dark:text-rose-200 font-black">Coef {coefMaths}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={coefMaths} 
                onChange={e => setCoefMaths(parseInt(e.target.value) || 1)}
                className="w-full accent-rose-500 h-1"
              />
            </div>

            {/* Francais input */}
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl">
              <div className="flex justify-between items-center mb-2 font-mono text-sm">
                <span className="font-bold text-indigo-700">✍️ Français (Note : 14/20)</span>
                <span className="bg-indigo-100 dark:bg-indigo-905 px-2.5 py-1 rounded-xl text-indigo-850 dark:text-indigo-200 font-black">Coef {coefFrancais}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={coefFrancais} 
                onChange={e => setCoefFrancais(parseInt(e.target.value) || 1)}
                className="w-full accent-indigo-600 h-1"
              />
            </div>

            {/* Sport input */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
              <div className="flex justify-between items-center mb-2 font-mono text-sm">
                <span className="font-bold text-emerald-700">🏃 EPS (Note : 17/20)</span>
                <span className="bg-emerald-100 dark:bg-emerald-955 px-2.5 py-1 rounded-xl text-emerald-850 dark:text-emerald-200 font-black">Coef {coefSport}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={coefSport} 
                onChange={e => setCoefSport(parseInt(e.target.value) || 1)}
                className="w-full accent-emerald-500 h-1"
              />
            </div>
          </div>

          {/* Visual Scale and Output (Right) */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-4 text-center">Part de Gravité dans le Bulletin :</span>
              
              <div className="space-y-3 font-mono text-xs">
                {/* Maths Progress Row */}
                <div className="space-y-1">
                  <div className="flex justify-between text-rose-600">
                    <span>📐 Maths :</span>
                    <span>{shareMaths.toFixed(0)} % de la note globale</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full transition-all duration-300" style={{ width: `${shareMaths}%` }} />
                  </div>
                </div>

                {/* Français Progress Row */}
                <div className="space-y-1">
                  <div className="flex justify-between text-indigo-600">
                    <span>✍️ Français :</span>
                    <span>{shareFrancais.toFixed(0)} % de la note globale</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${shareFrancais}%` }} />
                  </div>
                </div>

                {/* Sport Progress Row */}
                <div className="space-y-1">
                  <div className="flex justify-between text-emerald-600">
                    <span>🏃 EPS :</span>
                    <span>{shareSport.toFixed(0)} % de la note globale</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${shareSport}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations Balance Showcase */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
              <span className="text-xs text-slate-400 font-mono mb-2">Formule appliquée :</span>
              <div className="bg-slate-900 border text-white p-3 rounded-2xl font-mono text-[11px] leading-relaxed mb-4 select-none max-w-sm">
                {"$\\text{Moyenne} = \\frac{(8 \\times " + coefMaths + ") + (14 \\times " + coefFrancais + ") + (17 \\times " + coefSport + ")}{" + coefMaths + " + " + coefFrancais + " + " + coefSport + "}$"}<br/>
                {"$\\text{Moyenne} = \\frac{" + totalPoints + "}{" + totalCoefs + "}$"}
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-4 w-full shadow-lg shadow-indigo-500/25">
                <span className="text-xs uppercase tracking-widest font-bold opacity-75">Moyenne Générale Pondérée</span>
                <div className="text-3xl font-black">{weightedAverage.toFixed(2)} <span className="text-sm font-normal opacity-90">/ 20</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Le saviez-vous ? InfoBlock */}
        <div className="mt-6">
          <InfoBlock title="Le saviez-vous ? L'origine des statistiques" type="funfact">
            Le mot « Statistique » provient directement du mot latin médiéval **status** qui signifie « État ». À l'origine, les statistiques servaient uniquement aux souverains pour comptabiliser les populations, les réserves de grain, et les taxes militaires territoriales !
          </InfoBlock>
        </div>
      </Section>

      <Section title="1. La Moyenne Pondérée (Mécanique à deux temps)" icon="📉" color="indigo">
        <p className="mb-4">Calculer une moyenne pondérée requiert une rigueur absolue pour ne pas confondre le diviseur de fin.</p>

        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-950 my-6">
          <h3 className="font-bold text-center mb-4 text-lg">Le Casier Judiciaire du Trimestre (Tableau d'Effectifs)</h3>
          <div className="bg-card dark:bg-slate-900 p-2 rounded-2xl shadow border border-indigo-100 font-mono text-center mb-6 overflow-x-auto">
            <table className="border-collapse mx-auto min-w-[300px]">
              <thead>
                <tr>
                  <th className="border p-2">Matière</th>
                  <th className="border p-2">SVT</th>
                  <th className="border p-2">Mathématiques</th>
                  <th className="border p-2">EPS (Sport)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-bold text-left">Notes (Valeur $x$)</td>
                  <td className="border p-2 text-slate-800 dark:text-slate-200">12</td>
                  <td className="border p-2 text-rose-500 font-bold">5</td>
                  <td className="border p-2 text-emerald-500 font-bold">18</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold text-left">Coefficients (Effectif $n$)</td>
                  <td className="border p-2 text-indigo-600 font-extrabold">2</td>
                  <td className="border p-2 text-indigo-600 font-extrabold">4</td>
                  <td className="border p-2 text-indigo-600 font-extrabold">1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-bold text-slate-700 dark:text-slate-300 w-full mb-2">Les 2 Étapes de Survie :</p>
          
          <div className="space-y-4 w-full">
            <div className="bg-card dark:bg-slate-950 p-4 rounded-xl shadow-sm border-l-4 border-emerald-500">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">Étape 1 : Le Sommet (Numérateur)</span>
              <p className="text-sm mt-1">Multiplie chaque Note par son Coefficient respectif pour fusionner les points récoltés :</p>
              <div className="font-mono mt-2 bg-slate-50 dark:bg-slate-900 p-2 rounded text-center">
                {"$(12 \\times 2) + (5 \\times 4) + (18 \\times 1)$"}<br/>
                {"$24 + 20 + 18 = \\mathbf{62}$"} points au total.
              </div>
            </div>

            <div className="bg-card dark:bg-slate-950 p-4 rounded-xl shadow-sm border-l-4 border-indigo-500">
              <span className="font-bold text-indigo-800 dark:text-indigo-300">Étape 2 : Le Diviseur Réel (Dénominateur)</span>
              <p className="text-sm mt-1">On ne divise <strong>SURTOUT PAS</strong> par 3 parce qu'il y a 3 matières ! On doit diviser par le <strong>Somme Globale des Coefficients</strong> (L'effectif total) !</p>
              <div className="font-mono mt-2 bg-slate-50 dark:bg-slate-900 p-2 rounded text-center">
                Somme des Coefs : {"$2 + 4 + 1 = \\mathbf{7}$"}.
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl text-center text-white shadow-lg">
              <span className="font-bold text-lg">Bilan final : La Moyenne = {"$62 \\div 7 \\approx \\mathbf{8.86 / 20}$"}</span><br/>
              <span className="text-xs italic opacity-90">(L'excellente note d'EPS n'a pas survécu face à la gravité du coefficient 4 des maths...)</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="2. Tableaux avec Classes (Le Chef-d'œuvre du Pivot)" icon="🏢" color="amber">
        <p className="mb-4">Si l'on relève les salaires des 500 employés d'une entreprise ou la taille de 1000 élèves d'un collège, écrire chaque ligne de note brute serait invivable. On crée des boîtes de tri appelées des <strong>« Classes »</strong>. Exemple : employés gagnant entre {"$[1500 ; 2000[$"} euros.</p>

        <TipBanner title="Comment calculer avec des intervalles de valeurs ?" type="info">
          Quand on te demande d'extraire la moyenne globale du tableau, quel salaire vas-tu multiplier par l'effectif ? <br/>
          Tu dois calculer le <strong>Centre de Classe</strong> (Le point pivot du milieu parfait) : <br/>
          <span className="font-mono font-bold">{"$\\text{Milieu} = \\frac{\\text{Début} + \\text{Fin}}{2} = \\frac{1500 + 2000}{2} = 1750$"} €</span>.<br/> Esprit de synthèse : Pour cette boîte, tous les employés seront considérés comme gagnant virtuellement 1750 € !
        </TipBanner>

        <div className="mt-4">
          <InfoBlock title="Alerte Crochet" type="reminder">
            Fais attention de ne pas te faire rejeter par un crochet ! L'intervalle **{"$[10 ; 15[$"}** indique que le candidat ayant reçu un 15/20 ne va pas s'asseoir ici. Le crochet ouvert **{"$[$"}** vers la droite rejette le 15. Il devra se ranger dans l'intervalle suivant de droite **{"$[15 ; 20[$. "}**
          </InfoBlock>
        </div>
      </Section>

      <Section title="3. La Fréquence (L'Échelle des Pourcentages)" icon="📊" color="emerald">
        <p className="mb-4">L'Effectif d'une valeur est le nombre de candidats qui l'ont choisie. La **Fréquence** est la portion relative que ce sous-groupe représente par rapport à l'univers entier du sondage.</p>

        <InteractiveExercise 
          title="La Fabrication d'une Fréquence en Pourcentages"
          question={<p>Dans une classe de 25 élèves (Effectif Global), 6 ont pris l'option Chinois. Quelle est la fréquence décimale de ce groupe puis sa conversion en pourcentage ?</p>}
          steps={[
            <><strong>Étape 1 : Diviser la part par le tout</strong><br/>
            On applique la formule fondamentale du gâteau :<br/>
            {"$\\text{Fréquence} = \\frac{\\text{Mon Bout de Gâteau}}{\\text{Le Gâteau Entier}} = \\frac{6}{25}$"}.</>,
            <><strong>Étape 2 : Analyser la décimale de la machine</strong><br/>
            La division produit la valeur décimale brute :<br/>
            {"$\\text{Fréquence} = 0,24$"}. <br/>
            (Rappelle-toi qu'une fréquence décimale est obligatoirement bloquée entre 0 et 1 !)</>,
            <><strong>Étape 3 : Conversion d'échelle en %</strong><br/>
            Le symbole "%" signifie litéralement divisé par 100. On multiplie donc notre décimale par 100 :<br/>
            {"$0,24 \\times 100 = \\mathbf{24 \\%}$"}. <br/>
            24 % de la classe étudie le chinois !</>
          ]}
        />
      </Section>

      {/* RESOLVED EXERCISES (EXERCICES RESOLUS) - OBLIGATOIRE */}
      <Section title="📝 Exercices Résolus d'Analystes" icon="✍️" color="purple">
        <div className="space-y-6">
          <InteractiveExercise 
            title="Exercice Résolu 1 : Calculer le Bulletin Trimestriel"
            question={<p>Un élève obtient trois notes au cours du trimestre : un 10 coefficient 1, un 18 coefficient 2, et un 13 coefficient 5. Calcule rigoureusement sa moyenne trimestrielle.</p>}
            steps={[
              <><strong>Étape 1 : Multiplier les notes par les coefficients</strong><br/>
              Calculons la somme des points récoltés au total :<br/>
              {"$P = (10 \\times 1) + (18 \\times 2) + (13 \\times 5)$"}<br/>
              {"$P = 10 + 36 + 65 = 111$"} points.</>,
              <><strong>Étape 2 : Calculer le total des coefficients distribués</strong><br/>
              Additionnons les poids :<br/>
              {"$C = 1 + 2 + 5 = 8$"} coefficients distribués.</>,
              <><strong>Étape 3 : Diviser pour trouver la moyenne générale</strong><br/>
              {"$\\text{Moyenne} = \\frac{111}{8} = \\mathbf{13.875 / 20}$"}.</>
            ]}
          />

          <InteractiveExercise 
            title="Exercice Résolu 2 : Le Combat de l'Inconnue Moyenne"
            question={<p>Une élève a obtenu un 8/20 coefficient 2 et un 14/20 coefficient 1. Quelle note coefficient 3 doit-elle obtenir à sa dernière évaluation pour s'assurer une moyenne générale de 12/20 ?</p>}
            steps={[
              <><strong>Étape 1 : Modéliser le calcul avec une inconnue $x$</strong><br/>
              Appelons $x$ la note manquante de coefficient 3.<br/>
              La moyenne s'exprime par la fraction : <br/>
              {"$\\text{Moyenne} = \\frac{(8 \\times 2) + (14 \\times 1) + (x \\times 3)}{2 + 1 + 3} = 12$"}.</>,
              <><strong>Étape 2 : Épurer l'équation</strong><br/>
              Simplifions le numérateur et le dénominateur :<br/>
              {"$\\frac{16 + 14 + 3x}{6} = 12 \\implies \\frac{30 + 3x}{6} = 12$"}.</>,
              <><strong>Étape 3 : Résoudre pour libérer le $x$</strong><br/>
              Multiplions par 6 des deux côtés :<br/>
              {"$30 + 3x = 12 \\times 6 \\implies 30 + 3x = 72$"}.<br/>
              Diminuons de 30 :<br/>
              {"$3x = 72 - 30 \\implies 3x = 42$"}.<br/>
              Divisons par 3 :<br/>
              {"$x = \\frac{42}{3} = \\mathbf{14}$"}. <br/>
              Elle doit décrocher un 14/20 pour sécuriser son 12 de moyenne générale !</>
            ]}
          />
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur inscrit au tableau l'intervalle `[5 ; 10[. ` Un élève ayant obtenu un 10/20 peut-il y entrer ?</>}
            back={<><strong>NON !! Le crochet fuit !</strong><br/>Le crochet orienté vers l'extérieur `[` au niveau du 10 le repousse. L'élève de 10 ira dans la boîte voisine : `[10 ; 15[`. </>}
          />
          <Flashcard 
            front={<>En sommant toutes les fréquences décimales de mon tableau, j'obtiens 1,02. Mon calcul est-il juste ?</>}
            back={<><strong>Impossible, retranscris tes calculs.</strong><br/>L'univers est infaillible ! La somme des fréquences décimales doit valoir EXACTEMENT <strong>1,00</strong> (ou 100% en échelle relative). Recompte tes arrondis.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre Effectif et Coefficient ?",
              answer: "Aucune sur le plan algorithmique ! Un coefficient est simplement un effectif artificiel donné à une note pour moduler son importance relative."
            },
            {
              question: "Comment calculer le centre de la classe [20 ; 30[ ?",
              answer: "On fait la demi-somme des bornes d'intervalles : (20 + 30) ÷ 2 = 25. C'est ce '25' que l'on utilisera comme représentant unique de sa classe."
            },
            {
              question: "Peut-on avoir une fréquence négative ou supérieure à 100 % ?",
              answer: "C'est mathématiquement impossible. Une fréquence est un rapport d'une partie vis-à-vis d'un tout. Elle vit strictement entre 0 et 1 (soit 0% et 100%)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Un élève a obtenu un 15 Coef 2 et un 9 Coef 3. Quelle est sa moyenne trimestrielle ?",
              options: [
                "12,0 / 20",
                "11,4 / 20",
                "11,0 / 20"
              ],
              correctAnswer: 1,
              explanation: "Superbe ! Somme des points : (15 × 2) + (9 × 3) = 30 + 27 = 57. Somme des coefficients : 2 + 3 = 5. Calcul : 57 / 5 = 11,4."
            },
            {
              question: "Quelle est l'étendue de la boîte d'intervalles [140 ; 160[ ?",
              options: [
                "150",
                "20 (C'est l'écart entre la borne supérieure et la borne inférieure)",
                "impossible à savoir"
              ],
              correctAnswer: 1,
              explanation: "Génial ! L'étendue d'une classe est la largeur de son intervalle : 160 - 140 = 20."
            },
            {
              question: "Si 5 élèves sur un groupe de 20 possèdent un vélo. Quelle est leur fréquence relative d'apparition ?",
              options: [
                "0,25 (soit 25 %)",
                "0,50 (soit 50 %)",
                "5,0 (soit 500 %)"
              ],
              correctAnswer: 0,
              explanation: "Magnifique ! 5 / 20 = 25 / 100 = 0,25. Multiplié de façon décimale par 100, on obtient bien un total splendide de 25 % !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je diviserai systématiquement par la somme globale des coefficients (ou des effectifs) pour calculer ma moyenne pondérée.",
            "Je repérerai et appliquerai le centre de classe pivot pour tous les calculs d'intervalles.",
            "Je m'assurerai que mon bilan de fréquences cumulées retombe sur l'équivalence universelle de 100 %."
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

export default Course_College_4eme_08_Statistiques;
