import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../components/SharedUI';
import { Rocket, Zap, Minimize2, MoveUpRight, AlertTriangle } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_4eme_03_Puissances: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-03"
        title="Les Puissances"
        subtitle="Domptez les nombres cosmiques et les atomes microscopiques !"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["Tables de multiplication", "Règles des signes des nombres relatifs", "Connaître le carré (ex: 5² = 25)"]}
        objectives={[
          "Comprendre la notation puissance (le petit nombre en l'air).",
          "Calculer avec des puissances positives et négatives.",
          "Connaître les 3 règles d'or de calcul des puissances.",
          "Maîtriser l'Écriture Scientifique de précision."
        ]}
      />

      <Section title="🌟 Introduction : Le raccourci des géants" icon="🚀" color="slate">
        <p>
          Si tu dois écrire <MathComponent math={"3 \\times 3 \\times 3 \\times 3 \\times 3 \\times 3 \\times 3 \\times 3 \\times 3 \\times 3"} />, tu as mal au poignet avant d'avoir fini. Les mathématiciens sont fainéants, ils ont inventé un raccourci visuel foudroyant : <strong>La Puissance</strong>.
        </p>
        <p className="mt-4">
          C'est l'outil universel de la science. L'univers fait <MathComponent math={"10^26"} /> mètres de large et un microbe fait $10^{-6}$ mètres. Tout fonctionne avec la Force des Puissances !
        </p>
      </Section>

      <Section title="1. La Notation (Le maître et son exposant)" icon="👑" color="indigo">
        <p className="mb-4">Une Puissance est toujours composée de deux protagonistes en duel : La BASE (le nombre normal posé au sol) et l'EXPOSANT (le petit nombre suspendu en l'air).</p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6">
           <div className="flex items-end mx-auto md:mx-0">
             <span className="text-8xl font-black text-indigo-700 dark:text-indigo-300">5</span>
             <span className="text-5xl font-black text-rose-500 mb-8">4</span>
           </div>
           <div>
              <h3 className="font-bold text-lg mb-2">Comment lire et comprendre :</h3>
              <ul className="space-y-3 font-medium">
                <li><span className="text-indigo-700 dark:text-indigo-300 font-bold text-xl">5</span> est la base. C'est le nombre qui sera photocopié.</li>
                <li><span className="text-rose-500 font-bold text-xl">4</span> est l'exposant. C'est le boss qui crie : "Photocopiez le '5' QUATRE FOIS, et liez-les par des multiplications !"</li>
                <li className="mt-4 bg-card/50 dark:bg-black/30 p-2 rounded block w-full text-center font-mono border shadow-inner">
                  $5^4 = 5 \\times 5 \\times 5 \\times 5 = \\mathbf{625}$
                </li>
              </ul>
           </div>
        </div>

        <TipBanner title="L'Erreur Mondiale Mortelle !" type="warning">
           <MathComponent math={"5^4"} /> Ce n'est SURTOUT PAS <MathComponent math={"5 \\times 4 = 20"} /> !! <br/>
           Ça c'est la table de multiplication des primaires ! La puissance est une multiplication RÉPÉTÉE. <br/>
           Pense aux Zombies : 5 zombies mordent 5 humains, qui mordent 5 humains... Ça grandit de manière exponentielle, pas en ligne droite !
        </TipBanner>
      </Section>

      <Section title="2. Les Puissances Négatives (Le royaume de l'infiniment petit)" icon="🔬" color="blue">
        <p className="mb-4">Si exposant '+' veut dire "Je multiplie et je grandis", alors exposant '-' veut dire "Je réduis et je passe SOUS la barre". C'est <strong>l'Inverse</strong>.</p>

        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-200 dark:border-sky-800 my-6 shadow-sm">
           <p className="font-mono text-center text-xl text-sky-800 dark:text-sky-200 mb-6 bg-card dark:bg-black/30 w-max mx-auto px-4 py-2 rounded-xl shadow">
             <><MathComponent math={"10^{-3} = \\frac{1}{10^3} = \\frac{1}{1000} = \\mathbf{0,001}"} /></>
           </p>
           
           <h3 className="font-bold mb-2 flex items-center gap-2"><MoveUpRight className="text-sky-500 w-5 h-5"/> Ce qu'il faut mémoriser :</h3>
           <ul className="space-y-2 text-sm text-foreground">
             <li>Un exposant négatif (-3) <strong>ne donne pas un résultat négatif avec un « - » devant !</strong></li>
             <li>Il fabrique un nombre microscopique : <><MathComponent math={"0,\\text{quelque chose}"} /></>.</li>
             <li>L'exposant t'indique exactement <strong>le nombre de zéros au total</strong> (en comptant le zéro avant la virgule!). Ici, <MathComponent math={"10^{-3} \\text{ donne exactement 3 Zéros : } \\rightarrow 0,001"} />.</li>
           </ul>
        </div>
      </Section>

      <Section title="3. Les 3 Règles d'Or des Calculs" icon="⚡" color="emerald">
        <p className="mb-4">Quand les puissances se rencontrent dans des calculs, tu ne peux pas fusionner leurs bases (un boss 5 ne se mélange pas avec un boss 7). MAIS, si la <strong>MÊME BASE</strong> est présente, une magie d'exposants a lieu !</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 py-4 px-2 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 flex flex-col items-center shadow-sm">
              <span className="font-bold text-center mb-2">1. La Multiplication<br/>(L'Alliance)</span>
              <div className="bg-card dark:bg-black/40 p-2 rounded shadow font-mono text-center w-11/12 mt-auto">
                $a^m \\times a^p = {"a^m+p"}$<br/>
                <hr className="my-2"/>
                $2^3 \\times 2^4 = \\mathbf{2^7}$<br/>
                <span className="text-xs text-muted-text">(On additionne les âmes)</span>
              </div>
           </div>
           
           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 py-4 px-2 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 flex flex-col items-center shadow-sm">
              <span className="font-bold text-center mb-2">2. La Division<br/>(La Guerre)</span>
              <div className="bg-card dark:bg-black/40 p-2 rounded shadow font-mono text-center w-11/12 mt-auto">
                <><MathComponent math={"\\frac{a^m}{a^p} = a^{m-p}"} /></><br/>
                <hr className="my-2"/>
                <><MathComponent math={"\\frac{7^5}{7^3} = \\mathbf{7^2}"} /></><br/>
                <span className="text-xs text-muted-text">(Ceux du haut achèvent ceux du bas)</span>
              </div>
           </div>

           <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 py-4 px-2 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800 flex flex-col items-center shadow-sm">
              <span className="font-bold text-center mb-2">3. La Puissance de Puissance (L'Inception)</span>
              <div className="bg-card dark:bg-black/40 p-2 rounded shadow font-mono text-center w-11/12 mt-auto">
                <><MathComponent math={"(a^m)^p = a^{m \\times p}"} /></><br/>
                <hr className="my-2"/>
                $(3^4)^2 = \\mathbf{3^8}$<br/>
                <span className="text-xs text-muted-text">(Mutiplication fulgurante des mondes)</span>
              </div>
           </div>
        </div>

        <InfoBlock title="Les Exceptions Divines" type="info">
           Deux lois immuables sont écrites dans le code source de l'Univers :<br/>
           Tout le monde à la puissance ZÉRO donne 1. ($5849^0 = \\mathbf{1}$).<br/>
           Tout le monde à la puissance UN reste lui-même. ($42^1 = \\mathbf{42}$).
        </InfoBlock>
      </Section>

      <Section title="4. L'Écriture Scientifique (L'arme des Physiciens)" icon="🔭" color="rose">
        <p className="mb-4">Les chimistes détestent écrire la masse du soleil : <MathComponent math={"1 989 000 000 000 000 000 000 000 000 000"} /> kg. C'est illisible et source d'erreurs (on peut oublier un 0 !). Ils ont inventé le système standard universel : L'Écriture Scientifique.</p>

        <InteractiveExercise 
          title="Forger le nombre Universel"
          question={<>Convertis ce nombre vulgaire en outil scientifique parfait : <strong><MathComponent math={"45 000 000"} /></strong></>}
          steps={[
            <><strong>Règle 1 : L'Unique Chevalier !</strong> On ne tolère qu'UN SEUL chiffre (autre que Zéro) avant la virgule.</>,
            <>Je pose ma virgule juste après le 4. Mon nombre de base devient un beau <strong>"4,5"</strong>.</>,
            <><strong>Règle 2 : Le Vaisseau Spatial !</strong> Pour que <MathComponent math={"4,5"} /> redevienne le géant <MathComponent math={"45 000 000"} />, je dois le multiplier par <MathComponent math={"10"} /> plusieurs fois de suite. (À chaque fois qu'on multiplie par 10, on recule la virgule d'un cran vers la droite !)</>,
            <>Combien de "Sauts" ma virgule doit-elle faire de la position de "4,5..." jusqu'à la fin "...000,00" ? <br/>Elle doit passer le chiffre 5 (ça fait 1 saut), puis passer sept zéros... <strong>Soit 7 Sauts vers la droite au total !</strong></>,
            <><strong>Résultat Parfait :</strong> <span className="font-bold text-rose-600 dark:text-rose-400 font-mono text-xl"><MathComponent math={"4,5 \\times 10^7"} /></span></>
          ]}
        />
        
        <p className="mt-4 text-sm font-medium text-foreground text-center">
          <em>(Attention : Si on était sur un nombre microscopique '0,0005', la virgule doit SAUTER VERS LA GAUCHE (ce que je nomme Vitesse Arrière). On aurait eu un explosant Négatif '-4').</em>
        </p>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Calcule la souricière : Est-ce que $\\mathbf{-3^2}<MathComponent math={" et "} />\\mathbf{(-3)^2}$ donnent le même résultat ?</>}
            back={<><strong>NON !! Le piège à loup !</strong><br/><MathComponent math={"-3^2"} /> : Le carré n'affecte QUE le 3, la réponse est <strong>-9</strong>.<br/><MathComponent math={"(-3)^2"} /> : Le carré embrasse TOUT (le nombre et son arme). Moins par Moins fait Plus. Réponse = <strong>+9</strong> !</>}
          />
          <Flashcard 
            front={<>Le nombre <MathComponent math={"25 \\times 10^4"} /> est-il écrit en Forme Scientifique correcte ?</>}
            back={<><strong>NON, IL EST HORS LALOI !</strong><br/>Il ne peut y avoir qu'UN SEUL chiffre devant la virgule (compris entre 1 et 9). Ce doit être <MathComponent math={"2,5"} />. Et avec le décalage, il devient <MathComponent math={"2,5 \\times 10^5"} />.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'additionne des puissances comme $2^3 + 2^4 = 2^7$ ?",
              answer: "ARGH ! SACRILÈGE ! Les règles d'Or V1, V2 et V3 ne fonctionnent ABSOLUMENT QUE pour les Multiplications et les Divisions ! Les puissances détestent l'Addition ! Pour faire $2^3 + 2^4$, tu dois les calculer manuellement (8 + 16 = 24). Reste vigilant !"
            },
            {
              question: "A quoi servent VRAIMENT ces puissances de 10 à la fin ?",
              answer: "Les téléphones, la RAM de ton ordinateur (Gigaoctet = 10^9), le poids d'une planète, l'air dans la pièce. Si les mathématiques n'avaient pas les puissances de 10, le processeur de ton PC ne pourrait même pas faire des calculs spatiaux car l'écran serait rempli de 'zéros' à afficher et exploserait la mémoire visuelle."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Réduis cette Alliance : $10^5 \\times 10^{-2}$",
              options: [
                "10^-10 (Car on multiplie 5 et -2)",
                "10^3 (Car on ADDITIONNE les exposants : 5 + (-2))",
                "10^7 (Car on soustrait par vengeance)"
              ],
              correctAnswer: 1,
              explanation: "Top ! Lors d'une multiplication des bases, on additionne sagement par le haut ! 5 + (-2), c'est une bataille, les 5 gagnent et il en reste 3 !"
            },
            {
              question: "Transforme Merveilleusement $0,00078$ en Écriture Scientifique de l'Empire.",
              options: [
                "78 × 10^-5",
                "7,8 × 10^4",
                "7,8 × 10^-4"
              ],
              correctAnswer: 2,
              explanation: "Glorieux ! Règle 1 respectée (Un seul chiffre non nul devant, le 7). Puis on constate que ce nombre est 'Microscopique' (Commence par Zéro Virgule), donc l'exposant DOIT être négatif ! De 7,8 à 0,00078, ma virgule a coulé en marche arrière 4 fois. Donc puissance -4."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Méfiance mortelle : Les parenthèses changent le destin des nombres négatifs au Carré/Cube.",
            "L'écriture Scientifique requiert de 1,00 jusqu'à 9,99 maximum.",
            "L'Addition détruit les formules ! On applique les lois (a+b) uniquement sur la Mutliplication de base !"
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

export default Course_College_4eme_03_Puissances;
