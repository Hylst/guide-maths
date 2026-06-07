import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  Accordion, FillInTheBlanks, StepList 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_5eme_05_Symetrie_Centrale: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-SYMC"
        title="Symétrie Centrale"
        subtitle="Le Demi-Tour Absolu : quand tout s'inverse autour d'un point noir."
        duration="45 min"
      />

      <Section title="🌀 Introduction : Le Point de Pouvoir" icon="🌌" color="purple">
        <p>
          En 6ème tu as dompté la <strong>Symétrie Axiale</strong>. C'était un simple "miroir" représenté par une ligne droite. Une figure se pliait et se reflétait (un 'b' devenait un 'd').
        </p>
        <p className="mt-4">
          Maintenant en 5ème, c'est le pouvoir <strong>Central</strong> ! Tout s'organise autour d'un unique point nommé <strong>O</strong> (Le Centre de Symétrie).
          Ce point agit comme un tourbillon : la figure ne se plie plus, elle fait <strong>un DEMI-TOUR (180°)</strong> autour de ce point ! (Un 'p' devient un 'd' car il est complètement retourné à l'envers).
        </p>

        <InfoBlock type="funfact" title="L'Illusion du 180°">
          Imagine que ton cahier de mathématiques est posé sur la table. Plante la pointe de ton compas au centre du cahier comme un clou, et fais tourner le cahier jusqu'à ce qu'il soit totalement à l'envers. C'EST ÇA, la symétrie centrale ! Moteur physique 100% réel !
        </InfoBlock>
      </Section>

      <Section title="📏 La Règle Inébranlable" icon="📐" color="indigo">
        <p>
          Le principe mathématique derrière le tourbillon est magiquement simple.
        </p>
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 text-indigo-950 dark:text-indigo-50 p-6 rounded-2xl shadow-sm my-4 text-center font-medium text-lg lg:text-xl">
          Si A' est le symétrique du point A par rapport au centre O... <br/><br/>
          Alors <span className="font-bold text-indigo-700 dark:text-indigo-300 bg-card px-3 py-1 rounded inline-block">O est EXACTEMENT LE MILIEU du segment [AA'] !</span>
        </div>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">1. Aligner la Cible</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Je trace une demi-droite qui part de A et qui rentre dans le point noir O en le traversant de l'autre côté.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">2. L'Ouverture du Compas</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Je pique mon compas sur le super-centre O. Je l'ouvre jusqu'au nez de mon point A. J'ai "capturé" la distance !
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">3. Le Tranchage (L'Arc)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Je tourne mon compas de l'autre côté de ma ligne (toujours piqué sur O), et je tranche ma demi-droite d'un arc de cercle. BOOM ! C'est le point A'.
            </p>
          </div>
        </StepList>
      </Section>

      <Section title="🛡️ Qu'est-ce qui est conservé ?" icon="🔒" color="slate">
        <p>
          Si tu jettes un triangle de 12cm² de surface dans une Symétrie Centrale, il ressort de l'autre côté exactement de la même taille ! Comme la symétrie de 6ème, la centrale est respectueuse, elle conserve TOUT :
        </p>
        <ul className="grid grid-cols-2 gap-4 mt-4 text-center text-slate-700 dark:text-slate-300 font-medium font-mono text-sm">
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">Les Longueurs</li>
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">L'Alignement</li>
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">L'Aire et le Périmètre</li>
          <li className="bg-card p-4 border border-border rounded-xl shadow-sm">Les Angles</li>
        </ul>

        <InfoBlock type="warning" title="La Transformation Exceptionnelle !">
          Il y a UNE caractéristique absolue en Symétrie Centrale : 
          Si tu transformes une ligne droite... de l'autre côté du centre O, le clone de cette ligne <strong>LUI SERA TOUJOURS PARALLÈLE</strong> !
        </InfoBlock>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est l'autre façon d'appeler une <strong>Symétrie Centrale</strong> ?</>}
            back={<>Un <strong>Demi-Tour</strong> ! Ou encore une rotation de exactement <strong>180°</strong> autour du centre O.</>}
          />
          <Flashcard 
            front={<>Comment est l'image (le clone) d'une droite qui passe par une Symétrie Centrale ?</>}
            back={<>Une droite strictement <strong>Parallèle</strong> à l'originale.</>}
          />
        </div>
      </Section>

      <Section title="📝 Épreuves de Décryptage (Exercices)" icon="✍️" color="slate">
        <Accordion title="Exercice : Construction mentale du Triangle">
          <p className="font-medium mb-4">On a un triangle ABC et un point central extérieur O. Comment on dessine le clone A'B'C' ?</p>
          <div className="bg-muted p-4 rounded-xl space-y-4 border border-border">
            <p>1. On ne réfléchit pas sur tout le triangle en même temps ! C'est le meilleur moyen d'avoir un accident.</p>
            <p>2. On fait "la règle inébranlable" point par point !</p>
            <ul className="list-disc pl-8 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Ligne A vers O <MathComponent math={"\\rightarrow"} /> je reporte la même distance <MathComponent math={"\\rightarrow"} /> point A'.</li>
              <li>Ligne B vers O <MathComponent math={"\\rightarrow"} /> je reporte la même distance <MathComponent math={"\\rightarrow"} /> point B'.</li>
              <li>Ligne C vers O <MathComponent math={"\\rightarrow"} /> je reporte la même distance <MathComponent math={"\\rightarrow"} /> point C'.</li>
            </ul>
            <p className="text-emerald-700 dark:text-emerald-300 font-bold mt-4">3. À la fin, je prends ma règle, et je relie simplement les points clones A', B' puis C'. MON TRIANGLE CLONE APPARAÎT À L'ENVERS !</p>
          </div>
        </Accordion>
      </Section>

      <Section title="🎮 Test du Tourbillon" icon="🕹️" color="purple">
        <p className="mb-4">Voyons si tu as assimilé la puissance du Point O !</p>
        <FillInTheBlanks 
          id="sym-eval"
          content={[
            "La symétrie axiale utilise une ligne comme miroir. Mais la symétrie ",
            { options: ["centrale", "magique", "parallèle"], correctAnswer: 0 },
            " utilise un simple point nommé Centre ou O. Cela revient à faire subir à ta figure une rotation de ",
            { options: ["90°", "180°", "360°"], correctAnswer: 1 },
            ". Si A' est le symétrique de A, la distance entre A et O est ",
            { options: ["plus grande que", "strictement égale à", "moitié moins que"], correctAnswer: 1 },
            " la distance entre O et A'. Le point O devient donc purement et simplement le ",
            { options: ["milieu", "côté opposé", "sommet principal"], correctAnswer: 0 },
            " du segment [AA'] ! Enfin, attention : le symétrique d'une droite avec ce sortilège sera une ligne qui lui est magiquement ",
            { options: ["perpendiculaire", "sécante", "parallèle"], correctAnswer: 2 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Quiz de Survie" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la définition absolue d'une Symétrie Centrale de centre O ?",
              options: [
                "C'est un pliage selon une ligne qui passe par O.",
                "C'est un demi-tour de 180° autour du point O.",
                "C'est un glissement le long d'une flèche."
              ],
              correctAnswer: 1,
              explanation: "Exact ! La symétrie centrale est un vrai phénomène de ROTATION : un tour de 180 degrés purs autour de l'axe central (comme une vis) !"
            },
            {
              question: "Si j'ai tracé le point A' symétrique du point A par rapport au point O. Où est situé O exactement ?",
              options: [
                "C'est le milieu du segment [AA'] ! (Pile entre les deux)",
                "Il forme un angle droit avec [A'O]."
              ],
              correctAnswer: 0,
              explanation: "Parfait ! La distance [AO] = [OA'], avec les trois points alignés. C'est la définition mathématique du Milieu !"
            },
            {
              question: "Si je passe un cercle de rayon 5cm dans une symétrie centrale O, son clone...",
              options: [
                "Sera déformé en ovale à cause du demi-tour.",
                "Sera un cercle de même rayon 5cm car la symétrie centrale conserve toutes les mesures !"
              ],
              correctAnswer: 1,
              explanation: "Et oui ! Les longueurs, rayons, angles, volumes, périmètres et aires ne subissent absolument AUCUN DÉGÂT lors d'une symétrie centrale."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que la symétrie centrale est un demi-tour (rotation de 180°) autour d'un point O.",
            "Je sais construire un point clone avec une règle et un compas (via la technique de l'arc et du milieu).",
            "Je sais que cette symétrie conserve tout : longueurs, aires, angles.",
            "Je sais que l'image d'une droite droite avec ce pouvoir produit une droite PARALLÈLE."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
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

export default Course_5eme_05_Symetrie_Centrale;
