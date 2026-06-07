import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Tertiaire_Logistique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-TER"
        title="BUT Tertiaire : Recherche Opérationnelle & Gestion de Projets"
        subtitle="Ordonnancement, méthode PERT, détermination des tâches critiques et marges libres."
        duration="1h 15"
      />

      <Section title="📦 Recherche Opérationnelle dans le Tertiaire" icon="🏢" color="indigo">
        <p>
          En BUT Tertiaire (GEA, TC, GLT), la gestion logistique nécessite de savoir optimiser les flux matériels et temporels. La <strong>Recherche Opérationnelle (RO)</strong> est la modélisation mathématique du choix du meilleur scénario possible (coût, temps, distance).
        </p>

        <InfoBlock type="definition" title="Le problème d'ordonnancement">
          Afin de réaliser un grand projet industriel ou commercial, on doit enchaîner une multitude de tâches élémentaires. Chacune possède :
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Une <strong>durée</strong> fixe connue ou probabiliste.</li>
            <li>Des <strong>contraintes d'antériorité</strong> (des tâches à finir absolument avant de pouvoir débuter la tâche actuelle).</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="🕸️ La Méthode PERT et Réseau Associé" icon="🕸️" color="emerald">
        <p className="mb-4">
          La méthode PERT (Program Evaluation and Review Technique) modélise le projet sous la forme d'un <strong>graphe orienté sans circuit</strong>, où les nœuds représentent des étapes temporelles (jalons) et les arcs représentent les tâches elles-mêmes.
        </p>

        <FormulaBox 
          title="Dates au Plus Tôt (T_tôt)" 
          math="t_{\text{tôt}}(j) = \max_{i \to j} \left( t_{\text{tôt}}(i) + d(i,j) \right)" 
        />

        <p className="my-4">
          La date au plus tôt d'une étape <MathComponent math="j" /> est le maximum des chemins menant des étapes antérieures à elle.
        </p>

        <InfoBlock type="reminder" title="Date au plus tard">
          Une fois la date de fin calculée au plus tôt, on procède en marche arrière pour calculer la date au plus tard de chaque jalon sans repousser la fin du chantier :
          <MathComponent block math="t_{\text{tard}}(i) = \min_{i \to j} \left( t_{\text{tard}}(j) - d(i,j) \right)" />
        </InfoBlock>

        <InfoBlock type="funfact" title="Le saviez-vous ? Le secret militaire du projet Polaris">
          La méthode PERT a été créée en 1957 pour le compte de la marine américaine (US Navy) afin de planifier le développement du programme de missiles balistiques Polaris. Avec plus de 250 sous-traitants et 9 000 tâches à coordonner, l&apos;usage de la méthode PERT a permis de réduire la durée totale estimée du projet de plus de deux ans !
        </InfoBlock>
      </Section>

      <Section title="⛓️ Le Chemin Critique et Marges de Manœuvre" icon="⛓️" color="amber">
        <p className="mb-4">
          Un jalon ou une tâche est dit <strong>critique</strong> si sa date au plus tôt est égale à sa date au plus tard. Tout retard sur une tâche critique retarde l'ensemble du projet direct !
        </p>

        <FormulaBox 
          title="Marge Totale d'une Tâche" 
          math="M_{tot}(i \to j) = t_{\text{tard}}(j) - t_{\text{tôt}}(i) - d(i,j)" 
        />

        <p className="my-4">
          La marge totale correspond au délai maximum durant lequel on peut décaler une tâche sans modifier la date de fin du projet final.
        </p>

        <InfoBlock type="warning" title="Alerte Management de Projet : Stress Critique">
          Un gestionnaire de projet doit se focaliser presqu'exclusivement sur le <strong>chemin critique</strong> (la chaîne continue de tâches de marges nulles). C'est là que réside le risque majeur de dérive budgétaire et opérationnelle.
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : La marge libre vs la marge totale">
          Ne confond pas la marge totale et la <strong>marge libre</strong> ! Alors que la marge totale permet de décaler une tâche sans retarder le projet final, la marge libre est la durée maximale de retard qu&apos;on peut accorder à une tâche sans retarder le début au plus tôt des tâches suivantes. Elle se calcule par la formule : {"$M_{\\text{libre}} = t_{\\text{tôt}}(j) - t_{\\text{tôt}}(i) - d(i,j)$"}.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercice Guidé" icon="🛠️" color="purple">
        <InteractiveExercise
          title="Calcul de Marge Totale"
          question={<p>Une tâche T de durée 5 relie le jalon A au jalon B. On connaît les dates caractéristiques : <MathComponent math="t_{\text{tôt}}(A) = 12\text{, } t_{\text{tard}}(A) = 14" /> et <MathComponent math="t_{\text{tard}}(B) = 22" />. Calculer la marge totale de T.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Analyser la date au plus tôt de la tâche</p>
              <p>La tâche commence au plus tôt dès que le jalon de départ A est atteint au plus tôt, soit à la date 12.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Analyser la date au plus tard permissible</p>
              <p>Le jalon d'arrivée B doit être franchi au plus tard à la date 22.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Soustraction des durées</p>
              <p>La marge totale vaut : <MathComponent math="M_{\text{tot}} = t_{\text{tard}}(B) - t_{\text{tôt}}(A) - d = 22 - 12 - 5 = 5" />. On dispose donc de 5 jours de liberté totale pour glisser cette tâche sans impacter l'échéance finale.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="📝 Quiz d'évaluation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si la marge totale d'une tâche est rigoureusement nulle, que peut-on en déduire ?",
              options: [
                "Elle est impossible à accomplir",
                "Elle fait partie du chemin critique du projet",
                "Elle peut être décalée d'un mois"
              ],
              correctAnswer: 1,
              explanation: "Une tâche de marge nulle ne tolère aucune temporisation ou retard sous peine d'impacter le planning global."
            },
            {
              question: "Quelle méthode visuelle alternative (généralement chronologique par barres horizontales) est fréquemment alimentée par les calculs du PERT ?",
              options: [
                "Le diagramme de Gantt",
                "Le graphe de Pareto",
                "L'arbre d'Euler"
              ],
              correctAnswer: 0,
              explanation: "Le diagramme de Gantt est l'outil visuel le plus commun de planification temporelle alimenté par les marges calculées de PERT."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais lire les contraintes d'antériorité d'un tableau de tâches.",
            "Je sais attribuer les dates au plus tôt d'un graphe.",
            "Je sais attribuer les dates au plus tard d'un graphe (marche arrière).",
            "Je sais identifier les maillons critiques d'un planning."
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="purple">
        <p className="mb-6 text-sm text-slate-500 leading-relaxed">
          Révisez rapidement les définitions incontournables de la planification de projet et de la recherche opérationnelle pour le BUT Tertiaire.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Qu&apos;est-ce que le <strong>Chemin Critique</strong> dans un réseau PERT ?</>}
            back={<>C&apos;est le chemin le plus long reliant le jalon de départ au jalon final. Toutes ses tâches ont une marge totale nulle et tout retard sur celles-ci décale le projet.</>}
          />
          <Flashcard 
            front={<>Quelle différence fondamentale y a-t-il entre <strong>Marge Totale</strong> et <strong>Marge Libre</strong> ?</>}
            back={<>La marge totale est le retard possible sans décaler la fin du projet entier, tandis que la marge libre est le retard possible sans repousser le début au plus tôt des tâches successeurs directes.</>}
          />
          <Flashcard 
            front={<>Quel est le rôle d&apos;une <strong>Tâche Fictive</strong> dans un réseau PERT ?</>}
            back={<>C&apos;est une tâche de durée nulle {"$d = 0$"} servant uniquement à modéliser une contrainte d&apos;antériorité complexe entre deux jalons disjoints sans introduire de temps de travail fictif.</>}
          />
          <Flashcard 
            front={<>Comment s&apos;exprime analytiquement la condition de faisabilité de liaison amont-aval ?</>}
            back={<>Le nombre de colonnes de la matrice d&apos;adjacence des dépendances doit être compatible avec l&apos;ordre séquentiel d&apos;ordonnancement.</>}
          />
        </div>
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

export default Course_BUT_Tertiaire_Logistique;
