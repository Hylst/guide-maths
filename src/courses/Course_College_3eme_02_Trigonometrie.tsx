import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { Target, AlertTriangle } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_02_Trigonometrie: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

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
          "Maîtriser l'acronyme mnémotechnique magique : SOH CAH TOA !"
        ]}
      />

      <Section title="🎯 Introduction Pédagogique : Le secret du tireur d'élite" icon="🏹" color="slate">
        <p>
          Tu connais Pythagore : ce magicien a besoin d'avoir <strong>DEUX</strong> longueurs pour trouver le 3ème côté d'un triangle rectangle ! Mais que se passe-t-il si tu ne connais qu'<strong>UN</strong> pauvre côté, et que le destin te donne à la place... <strong>un Angle en degrés</strong> ? Là, Pythagore est bloqué.
        </p>
        <p className="mt-4">
          Heureusement, la <strong>Trigonométrie</strong> arrive à la rescousse ! Avec un unique côté et un angle de vue très précis, tu vas pouvoir abattre à distance de foudre la valeur au millimètre de n'importe quel autre mur ! Prépare tes armes <strong>SINUS</strong>, <strong>COSINUS</strong> et <strong>TANGENTE</strong>.
        </p>
      </Section>

      <Section title="📐 Schéma Pédagogique Interactif" icon="👁️" color="indigo">
        <TipBanner title="L'Œil de Sniper de l'Angle Majeur !" type="info">
          <p>Tout dépend d'où tu regardes ! Ce qui est le mur "Opposé" depuis la vallée n'est plus l'opposé si tu te mets au sommet du triangle !</p>
        </TipBanner>
        
        <div className="flex justify-center my-8 bg-card p-6 border border-border-strong rounded-3xl shadow-sm">
          <svg width="550" height="280" viewBox="0 0 550 280" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
            <rect x="20" y="20" width="510" height="40" fill="currentColor" className="text-secondary/50" rx="8" />
            <text x="275" y="45" fontFamily="Inter" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="16" textAnchor="middle">Position du regard et Noms magiques CAH SOH TOA !</text>

            <g transform="translate(100, 80)">
              {/* Box and Main Shape */}
              <polygon points="0,150 250,150 250,0" fill="transparent" stroke="currentColor" className="text-rose-500" strokeWidth="3" strokeLinejoin="round"/>
              
              {/* Right Angle */}
              <rect x="235" y="135" width="15" height="15" fill="none" stroke="currentColor" className="text-rose-600 dark:text-rose-400" strokeWidth="2"/>
              <text x="260" y="165" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-rose-700 dark:text-rose-400" fontSize="14">C</text>
              
              <text x="-15" y="165" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14">A</text>
              <text x="260" y="0" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14">B</text>

              {/* Point A (Sniper Eye) */}
              <circle cx="0" cy="150" r="6" fill="currentColor" className="text-primary"/>
              
              {/* Angle arc */}
              <path d="M 40 150 A 40 40 0 0 0 35 125" fill="none" stroke="currentColor" className="text-primary" strokeWidth="3"/>
              <text x="50" y="140" fontFamily="Inter" fontWeight="bold" fill="currentColor" className="text-primary" fontSize="14">Â (Oeil de tir)</text>

              {/* HYPOTENUSE */}
              <text x="75" y="65" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-slate-600 dark:text-slate-400" fontSize="14" transform="rotate(-30 75,65)">HYPOTÉNUSE pure !</text>

              {/* OPPOSITE */}
              <g>
                 <line x1="250" y1="0" x2="250" y2="150" stroke="currentColor" className="text-emerald-500" strokeWidth="6"/>
                 <path d="M 15 145 C 50 135, 150 120, 240 75" fill="none" stroke="currentColor" className="text-emerald-400" strokeWidth="2" strokeDasharray="6,4">
                   <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite"/>
                 </path>
                 <polygon points="245,75 235,70 235,80" fill="currentColor" className="text-emerald-400"/>
                 <text x="265" y="80" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-emerald-600 dark:text-emerald-400" fontSize="14">Côté OPPOSÉ</text>
              </g>

              {/* ADJACENT */}
              <line x1="0" y1="150" x2="250" y2="150" stroke="currentColor" className="text-amber-500" strokeWidth="6"/>
              <text x="125" y="175" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-amber-600 dark:text-amber-400" fontSize="14" textAnchor="middle">Côté ADJACENT</text>
            </g>
          </svg>
        </div>
      </Section>

      <Section title="📚 Partie Théorie Enrichie" icon="📖" color="emerald">
        <h3 className="text-xl font-bold mt-4 mb-2 text-foreground">1. Prénommer les murs d"un château rectangulaire :</h3>
        <p className="mb-4 text-muted-text">L"astuce de base pour ne jamais se tromper est de repérer ton "Œil ninja" (L"angle dont on te parle ! Ex: l"angle Â).</p>
        
        <ul className="space-y-4 mb-8">
          <li className="flex gap-3">
            <span className="w-2 h-full bg-slate-400 rounded-full shrink-0"></span>
            <div>
              <strong className="text-slate-700 dark:text-slate-300">L"HYPOTÉNUSE :</strong> C"est le boss ultime. C"est TOUJOURS le côté le plus long, qui regarde face à l"Angle Droit. Il ne bouge jamais.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-2 h-full bg-emerald-500 rounded-full shrink-0"></span>
            <div>
              <strong className="text-emerald-600 dark:text-emerald-400">Le Côté OPPOSÉ :</strong> Trace une flèche droite depuis ton Angle Â. Le mur d"en face que tu touches... c"est lui !
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-2 h-full bg-amber-500 rounded-full shrink-0"></span>
            <div>
              <strong className="text-amber-600 dark:text-amber-400">Le Côté ADJACENT :</strong> C"est le côté qui porte et TOUCHE directement ton Angle Â (qui n"est pas l"Hypoténuse).
            </div>
          </li>
        </ul>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800/50 my-8">
          <h3 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">2. L"incantation universelle magique : SOH CAH TOA !!</h3>
          <p className="text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 mb-6">Écris TOUJOURS ce mot au sommet de ta feuille. Il te donne toutes les formules :</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-700/50 text-center">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 block mb-2">SOH</span>
              <p className="font-mono font-medium text-lg text-foreground">Sin = O / H</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-700/50 text-center">
              <span className="text-3xl font-black text-amber-600 dark:text-amber-400 block mb-2">CAH</span>
              <p className="font-mono font-medium text-lg text-foreground">Cos = A / H</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-700/50 text-center">
              <span className="text-3xl font-black text-sky-600 dark:text-sky-400 block mb-2">TOA</span>
              <p className="font-mono font-medium text-lg text-foreground">Tan = O / A</p>
            </div>
          </div>
        </div>

        <TipBanner title="Comment choisir la bonne formule ?" type="success">
          Lis l"énoncé ! Si on te donne le <strong>Côté ADJACENT</strong> et qu"on veut trouver l"<strong>HYPOTÉNUSE</strong>... Quelle syllabe relie le A et le H ? C"est le <strong>CAH</strong> ! Tu utiliseras donc le <strong>COSINUS</strong> !
        </TipBanner>
      </Section>
      
      <Section title="⚠️ Rappels Vitaux" icon="🚨" color="rose">
        <InfoBlock title="Vérifie ta calculette !" type="warning">
          Le cauchemar des examens : vérifie toujours qu"il y a un petit <strong>D</strong> (ou <strong>DEG</strong>) sur l"écran de ta calculette. Si tu es en Radiant (R) ou en Grade (G), tous tes calculs trigonométriques seront faux et tu auras 0 à l"exercice !! (Le Cos(45°) n"est pas la même chose au Cos(45rad)).
        </InfoBlock>
        
        <InfoBlock title="Sinus et Cosinus sont coincés !" type="info">
          Un Sinus et un Cosinus ne peuvent <strong>JAMAIS</strong> être supérieurs à 1 !! Si tu trouves <MathComponent math={"Cos = 1.34"} />, c"est un plantage absolu. Refais très vite ton rapport <MathComponent math={"O/H"} /> ou <MathComponent math={"A/H"} />.
                          </InfoBlock>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur te dit : "Tu as le grand triangle, tu regardes l"angle A, tu connais le mur en face (Opposé) et tu cherches le mur qui te touche au sol (Adjacent)"... Que cries-tu ?</>}
            back={<>Un fier <strong>TANGENTE</strong> ! (<strong>TOA</strong>). J"ai une donnée à "Opp", je cherche "Adj". L"équation qui relie O et A est la dernière du SOH CAH TOA.</>}
          />
          <Flashcard 
            front={<>Le drame ! Tu connais toutes les longueurs de murs du triangle "Opposé, Adjacent, Hypoténuse", mais tu veux trouver <strong>l"Angle en degrés</strong> ! Que faire ?</>}
            back={<>On utilise le magique <strong>Arcsinus</strong>, <strong>Arccosinus</strong> ou <strong>Arctangente</strong> ! C"est la lame "Inversée" de ta calculatrice (Touches SHIFT jaunes ou SECONDE). Ex : sin⁻¹(0.5) = 30°.</>}
          />
        </div>
      </Section>

      <Section title="✍️ Exercice corrigé : Le Trésor du Phare hanté !!" icon="🌊" color="blue">
        <InteractiveExercise 
          title="Distance au sommet du Phare"
          question={<>Tu es marin, tu te trouves à <strong>200 mètres de la base du Phare (Écart Adjacent)</strong>. Tu inclines ton puissant œil de tireur de <strong>50 degrés</strong> vers la lumière tout en Haut du Phare. Le professeur veut que tu trouves <strong>la HAUTEUR du Phare</strong> (L"Opposé). Arrache-lui la foudre !</>}
          steps={[
            <>1. Je lance ma phrase d"introduction : <em>"Le triangle formé par la mer, le ciel et la lumière est <strong>Rectangle au pied du phare</strong>. J"ai le droit d"utiliser la Trigonométrie."</em></>,
            <>2. Je cible le nom. J"ai l"<strong>ADJACENT = 200m</strong>. Mon œil pointe HAUT pour attaquer l"<strong>OPPOSÉ</strong>. O et A ? J"utilise <strong>TOA (La Tangente !)</strong>.</>,
            <>3. J"écris ma magnifique formule : <br/><code>Tan(50°) = Opposé (Hauteur) / Adjacente (200)</code>.</>,
            <>4. Je fais le produit en croix : <br/><code>Hauteur = Tan(50°) × 200</code>.</>,
            <>5. Je frappe à la calculette (après avoir vérifié le mode DEG). Ta calculette écrit que Tan(50) = 1.1917...</>,
            <>6. La réponse finale s"affiche ! <code>Hauteur du Phare = 1.1917... × 200 ≈ 238 mètres !</code></>
          ]}
        />
      </Section>
      
      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Mon professeur m'a imposé un autre angle, je n'aime pas et j'ai l'habitude de garder l'angle pointé vers le bas. Est-ce que je peux bouger mon regard ?",
              answer: "OUI tu as le droit de changer d'angle ! TANT que tu connais sa valeur en degrés ! MAIS ATTENTION au drame mortel : Si tu changes ton regard de place et que tu regardes d'en HAUT, le mur qui était ADJACENT (en bas) devient soudainement le mur OPPOSÉ ! Tous les noms changent selon d'où tu regardes."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "On te cache la longueur du 3ème côté d'un triangle rectangle, mais on te donne les 2 premiers côtés (Hypoténuse et un Adjacent). Tu DOIS utiliser la Trigonométrie (Cosinus) ?",
              options: [
                "Oui c'est sûr, j'utilise la Trigonométrie.",
                "Non, j'utilise le Théorème de Pythagore !"
              ],
              correctAnswer: 1,
              explanation: "ERREUR CLASSIQUE ! Si tu as 2 longueurs pour chercher la 3ème, le vieux Pythagore suffit amplement. La Trigonométrie est là EXCLUSIVEMENT pour chercher (ou utiliser) un Angle."
            },
            {
              question: "Que signifie le H de SOH CAH TOA ?",
              options: [
                "Hauteur",
                "Hémisphère",
                "Hypoténuse"
              ],
              correctAnswer: 2,
              explanation: "H = Hypoténuse. C'est toujours le côté le plus grand d'un triangle rectangle."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mon triangle est rectangle et on me donne un angle ? = Magie Trigo !",
            "Je gratte SOH CAH TOA dans la marge de ma copie de brevet.",
            "Je vérifie le paramètre 'DEG' sur la calculatrice."
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
