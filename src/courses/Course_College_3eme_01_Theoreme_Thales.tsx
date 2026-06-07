import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_01_Theoreme_Thales: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

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
          "Utiliser la réciproque et la contraposée pour prouver le parallélisme."
        ]}
      />

      <Section title="🌟 Introduction : Le secret de la Pyramide" icon="📐" color="slate">
        <p>
          Il y a plus de 2500 ans, le pharaon d'Égypte mit au défi le philosophe grec <strong>Thalès</strong> de calculer la hauteur exacte de la grande pyramide de Khéops. Impossible de grimper avec une règle !
        </p>
        <p className="mt-4">
          Thalès eut alors une intuition de génie en regardant les ombres créées par le soleil. Il planta son propre bâton dans le sable et compara : <em>"Si les rayons du soleil sont parallèles, l'ombre de la pyramide est une version géante et proportionnelle de l'ombre de mon bâton !"</em>. Sans le savoir, il venait de découvrir l'un des théorèmes les plus puissants de la géométrie.
        </p>
      </Section>

      <Section title="1. Les deux configurations magiques" icon="👁️" color="indigo">
        <TipBanner title="Règle d'or de départ" type="warning">
          Pour appliquer le théorème de Thalès, il te faut absolument : <strong>deux droites sécantes</strong>, coupées par <strong>deux droites parallèles</strong> (qui vont créer les bases de nos triangles).
        </TipBanner>
        
        <p className="mt-6 mb-6 text-foreground">
          Selon la position des parallèles par rapport au sommet principal, tu obtiendras l'une des deux figures géométriques suivantes :
        </p>

        <div className="flex justify-center my-8 bg-card p-6 border border-border-strong rounded-3xl shadow-sm overflow-x-auto">
          <svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" className="min-w-[500px]">
            {/* Configuration 1 : Emboîtée */}
            <g transform="translate(50, 60)">
              <text x="75" y="-20" fontFamily="Inter" fontWeight="bold" fill="currentColor" className="text-slate-600 dark:text-slate-400" fontSize="14" textAnchor="middle">1. Emboîtée (Classique)</text>
              <polygon points="75,0 0,180 150,180" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-600 dark:text-slate-400" strokeWidth="2"/>
              <polygon points="75,0 37.5,90 112.5,90" fill="currentColor" className="text-sky-500/10"/>
              
              <line x1="15" y1="90" x2="135" y2="90" stroke="currentColor" className="text-rose-500" strokeWidth="3" strokeLinecap="round"/>
              <line x1="-20" y1="180" x2="170" y2="180" stroke="currentColor" className="text-rose-500" strokeWidth="3" strokeLinecap="round"/>
              
              <circle cx="75" cy="0" r="4" fill="currentColor" className="text-foreground"/>
              <circle cx="0" cy="180" r="4" fill="currentColor" className="text-foreground"/>
              <circle cx="150" cy="180" r="4" fill="currentColor" className="text-foreground"/>
              <circle cx="37.5" cy="90" r="4" fill="currentColor" className="text-rose-600 dark:text-rose-400"/>
              <circle cx="112.5" cy="90" r="4" fill="currentColor" className="text-rose-600 dark:text-rose-400"/>
              <text x="75" y="-10" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14" textAnchor="middle">A</text>
              <text x="-15" y="185" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14" textAnchor="middle">B</text>
              <text x="165" y="185" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14" textAnchor="middle">C</text>
              <text x="25" y="85" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-rose-600 dark:text-rose-400" fontSize="14" textAnchor="middle">M</text>
              <text x="125" y="85" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-rose-600 dark:text-rose-400" fontSize="14" textAnchor="middle">N</text>
            </g>

            {/* Configuration 2 : Papillon */}
            <g transform="translate(380, 60)">
              <text x="75" y="-20" fontFamily="Inter" fontWeight="bold" fill="currentColor" className="text-slate-600 dark:text-slate-400" fontSize="14" textAnchor="middle">2. Papillon (Croisée)</text>
              
              <line x1="30" y1="0" x2="120" y2="180" stroke="currentColor" className="text-slate-300 dark:text-slate-600 dark:text-slate-400" strokeWidth="2"/>
              <line x1="120" y1="0" x2="30" y2="180" stroke="currentColor" className="text-slate-300 dark:text-slate-600 dark:text-slate-400" strokeWidth="2"/>
              <polygon points="75,90 30,0 120,0" fill="currentColor" className="text-amber-500/10"/>
              <polygon points="75,90 120,180 30,180" fill="currentColor" className="text-emerald-500/10"/>
              
              <line x1="15" y1="0" x2="135" y2="0" stroke="currentColor" className="text-rose-500" strokeWidth="3" strokeLinecap="round"/>
              <line x1="15" y1="180" x2="135" y2="180" stroke="currentColor" className="text-rose-500" strokeWidth="3" strokeLinecap="round"/>
              
              <circle cx="75" cy="90" r="5" fill="currentColor" className="text-sky-500"/>
              <circle cx="30" cy="0" r="4" fill="currentColor" className="text-foreground"/>
              <circle cx="120" cy="0" r="4" fill="currentColor" className="text-foreground"/>
              <circle cx="30" cy="180" r="4" fill="currentColor" className="text-foreground"/>
              <circle cx="120" cy="180" r="4" fill="currentColor" className="text-foreground"/>
              
              <text x="88" y="90" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-sky-600 dark:text-sky-400" fontSize="14" textAnchor="start">A</text>
              <text x="20" y="-10" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14" textAnchor="middle">M</text>
              <text x="130" y="-10" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14" textAnchor="middle">N</text>
              <text x="20" y="200" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14" textAnchor="middle">B</text>
              <text x="130" y="200" fontFamily="JetBrains Mono" fontWeight="bold" fill="currentColor" className="text-foreground" fontSize="14" textAnchor="middle">C</text>
              
              <text x="75" y="-10" fontFamily="Inter" fontWeight="bold" fill="currentColor" className="text-rose-500" fontSize="12" textAnchor="middle">//</text>
              <text x="75" y="170" fontFamily="Inter" fontWeight="bold" fill="currentColor" className="text-rose-500" fontSize="12" textAnchor="middle">//</text>
            </g>
          </svg>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-4">L'écriture sacrée des fractions (L'égalité de Thalès)</h3>
        <p className="mb-4">Dans les deux cas ci-dessus, on part <strong>TOUJOURS du sommet commun <MathComponent math={"A"} /></strong>. Le théorème dit que le "Petit Triangle" est un modèle proportionnel du "Grand Triangle". On pose donc l'égalité des trois rapports (côtés du Petit sur côtés du Grand) :</p>
        
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-200 dark:border-sky-800 text-center shadow-sm">
          <p className="font-bold text-sky-800 dark:text-sky-200 mb-2">Petit Côté  /  Grand Côté (sur la même ligne)</p>
          <div className="font-mono text-2xl md:text-3xl font-black text-rose-600 dark:text-rose-400 my-4 flex items-center justify-center gap-4">
            <div className="flex flex-col items-center"><span>AM</span><div className="h-px w-12 bg-current my-1"></div><span>AB</span></div>
            <span>=</span>
            <div className="flex flex-col items-center"><span>AN</span><div className="h-px w-12 bg-current my-1"></div><span>AC</span></div>
            <span>=</span>
            <div className="flex flex-col items-center"><span>MN</span><div className="h-px w-12 bg-current my-1"></div><span>BC</span></div>
          </div>
        </div>
      </Section>

      <Section title="2. Méthodologie du Brevet" icon="📝" color="emerald">
        <h3 className="text-xl font-bold mt-4 mb-2">2.1 La rédaction parfaite</h3>
        <p className="mb-4 text-muted-text">Au brevet, le simple calcul de la fraction ne suffit pas. Tu dois écrire ton raisonnement (les conditions d'application du Théorème).</p>
        
        <div className="bg-card p-6 rounded-[2rem] border border-border-strong">
          <ul className="space-y-3 font-medium text-foreground">
            <li><span className="text-emerald-600 dark:text-emerald-400">1.</span> On sait que les points A, M, B et A, N, C sont alignés dans cet ordre sur leurs droites respectives.</li>
            <li><span className="text-emerald-600 dark:text-emerald-400">2.</span> On sait que les droites (MN) et (BC) sont <strong>parallèles</strong>.</li>
            <li><span className="text-emerald-600 dark:text-emerald-400">3.</span> Or, d'après le théorème de Thalès, il y a égalité des rapports :</li>
            <li className="font-mono text-center pt-2">AM/AB = AN/AC = MN/BC</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-2">2.2 L'arme secrète : Le Produit en croix</h3>
        <p className="mb-4">Une fois ton squelette de trois fractions écrit avec des lettres, tu remplaces avec les nombres de l'énoncé. Tu auras forcément une fraction incomplète (avec la longueur que tu cherches) et une fraction complète à côté.</p>
        
        <InteractiveExercise 
          title="Calculer une longueur avec Thalès"
          question={<>Imaginons que tes valeurs donnent cela : <span className="font-mono font-bold mx-2 inline-flex items-center">AM/5 = 3/10</span>. Trouvons la longueur <strong>AM</strong>.</>}
          steps={[
            <>On isole la fraction complète (<><MathComponent math={"\\frac{3}{10}"} /></>) et la fraction à trou (<><MathComponent math={"\\frac{AM}{5}"} /></>).</>,
            <>On imagine une croix (un X) entre ces deux fractions. On va multiplier la diagonale complète.</>,
            <>La diagonale avec deux vrais nombres est formelle : <strong>5 × 3</strong> (ou 3 × 5).</>,
            <>On divise ensuite par le nombre restant, ici <strong>10</strong>.</>,
            <>Le calcul est donc : <strong><MathComponent math={"AM = (5 \\times 3) \\div 10"} /></strong>.</>,
            <><span className="text-emerald-600 dark:text-emerald-400 font-bold"><MathComponent math={"AM = 15 \\div 10 = 1,5"} /> cm</span>. C'est gagné !</>
          ]}
        />
      </Section>

      <Section title="3. Réciproque et Contraposée (Tribunal du parallélisme)" icon="⚖️" color="blue">
        <p className="mb-4">Parfois, l'énoncé ne te dit pas si les droites sont parallèles. Au contraire, il te demande de <strong>prouver</strong> qu'elles le sont (ou qu'elles ne le sont pas !). On va alors utiliser la <em>Réciproque</em> de Thalès.</p>
        
        <TipBanner title="Méthode D'une part / D'autre part" type="info">
          Ne démarre JAMAIS en écrivant que les fractions sont égales avec un signe <code>=</code> (puisque c'est justement ce qu'on cherche à vérifier !). Calcule-les <strong>séparément</strong>.
        </TipBanner>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 dark:text-emerald-200 mb-4 flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div>Si c'est ÉGAL</h4>
            <p className="text-sm">Si <strong>d'une part</strong> <MathComponent math={"AM/AB = 0,4"} /> et <strong>d'autre part</strong> <MathComponent math={"AN/AC = 0,4"} />.</p>
            <p className="text-sm mt-2">Alors les rapports sont égaux. Les points sont alignés dans le même ordre. D'après la <strong>Réciproque du théorème de Thalès</strong>, les droites (MN) et (BC) sont <strong>parallèles</strong>.</p>
          </div>
          <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-800/60 dark:border-rose-800">
            <h4 className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200 mb-4 flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-full"></div>Si c'est DIFFÉRENT</h4>
            <p className="text-sm">Si <strong>d'une part</strong> <MathComponent math={"AM/AB = 0,5"} /> et <strong>d'autre part</strong> <MathComponent math={"AN/AC = 0,6"} />.</p>
            <p className="text-sm mt-2">Alors les rapports <strong>ne sont pas égaux</strong>. D'après la <strong>Contraposée du théorème de Thalès</strong>, on constate que la proportionnalité est cassée. Les droites <strong>ne sont PAS parallèles</strong> (elles sont sécantes).</p>
          </div>
        </div>

        <InfoBlock title="Le piège mortel de la calculatrice !" type="warning">
          Si tu calcules <code>2/3</code> sur ta calculette, elle affichera <code>0.666666...</code>. Si l'autre bloc te donne <code>0.666667</code>, pourras-tu dire que c'est différent ? <strong>NON !</strong> Garde les résultats sous forme de <strong>fractions simplifiées</strong> pour éviter l'imprécision des calculatrices avec les nombres infinis. Un dixième de millimètre faux annule tout en géométrie.
        </InfoBlock>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le grand piège du quotient : on me donne la distance <MathComponent math={"AM = 2"} /> et le bout suivant <MathComponent math={"MB = 4"} />. Quelle base je mets pour la grande fraction <code>AM/AB</code> ?</>}
            back={<>Une fraction Thalès fonctionne de "Bâton entier à Bâton entier". Tu <strong>additionnes</strong> les deux bouts ! La ligne complète <MathComponent math={"AB"} /> fait <code>2 + 4 = 6</code> ! Donc la fraction est <code>2/6</code>, et non 2/4 !</>}
          />
          <Flashcard 
            front={<>M'sieur, j'ai trouvé <code>0.334</code> pour la part 1 et <code>0.336</code> pour la part 2. À un petit cheveu près c'est pareil, non ? Les droites sont donc parallèles !</>}
            back={<><strong>Faux, erreur fatale !</strong> En mathématique de géométrie, un "à peu près" signale deux droites qui finiront inévitablement par s'écraser l'une dans l'autre très loin. C'est inégal, donc <strong>Contraposée</strong>. Ce n'est PAS parallèle.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi est-ce si important de nommer les points dans l'ordre ?",
              answer: "Si on te donne 'les points A, E, B' d'un côté et 'A, F, C' de l'autre, et que l'énoncé rajoute la mention 'dans le même ordre', c'est pour garantir que la figure ne se 'twiste' pas. Le simple fait de prouver la Réciproque nécessite de certifier qu'on respecte la linéarité absolue des droites de chaque côté sans que la structure ne se torde."
            },
            {
              question: "Quelle est la différence entre Théorème, Réciproque et Contraposée ?",
              answer: "1. Le THÉORÈME (ou Thalès Direct) te donne une longueur d'un côté sachant qu'on t'A AFFIRMÉ haut et fort que c'était déjà Parallèle.\n2. La RÉCIPROQUE c'est quand l'énoncé te demande le VERDICT : 'Prouve que les droites sont parallèles' et que tu réussis à prouver OUI, l'égalité des quotients est parfaite.\n3. La CONTRAPOSÉE c'est la version négative de la Réciproque : l'égalité échoue, tu conclus que c'est 'Sécant' (donc pas parallèle)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Pour utiliser la configuration du papillon et calculer une longueur manquante, que doit me préciser l'énoncé au départ ?",
              options: [
                "Que les triangles sont isocèles.",
                "Que les deux droites opposées sont parallèles.",
                "Que l'angle vaut 90 degrés.",
                "Je n'ai besoin d'aucune précision."
              ],
              correctAnswer: 1,
              explanation: "Le Théorème direct de Thalès, qu'il soit emboîté ou croisé (papillon), nécessite obligatoirement de certifier que les deux droites bases (Ailes du papillon) sont parallèles pour appliquer la proportionnalité divine."
            },
            {
              question: "Si AM = 2, AB = 5, et AN/AC = 2/5. Sommes-nous dans une situation où Thalès s'applique harmonieusement ?",
              options: [
                "Oui, car la proportion 2/5 est respectée de part et d'autre (sous réserve d'alignement).",
                "Non, 2 n'est pas la moitié de 5."
              ],
              correctAnswer: 0,
              explanation: "Oui ! Le rapport 2/5 est équivalent d'un côté et de l'autre ! C'est l'essence de la Réciproque : les rapports des longueurs sont scrupuleusement égaux."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Mon point de départ des rapports fractionnés est TOUJOURS le sommet principal 'A'.",
            "J'écris ma rédaction 'points alignés + droites parallèles' au brevet.",
            "Je ne confonds pas un morceau du segment avec la totalité de la longue droite."
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
