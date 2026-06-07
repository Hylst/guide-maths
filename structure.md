# Structure de la Plateforme Éducative (Structure)

Cet Applet est conçu comme un parcours modulaire, progressif et spiralaire, allant des jalons élémentaires de la découverte arithmétique de l'école primaire jusqu'aux concepts hautement abstraits et modélisés de l'enseignement supérieur (CPGE, Licence, BUT).

Il s'organise autour d'un plan d'études fluide et dynamique, structuré en grandes thématiques académiques et cycles scolaires réglementaires.

---

## 🧭 Philosophie de la Taxonomie et Expérience Utilisateur

1. **Exploration Linéaire Structurée** : L'étudiant peut parcourir les leçons d'un cycle donné dans l'ordre pédagogique recommandé par les programmes officiels.
2. **Consultation Ciblée par Prérequis** : Chaque fiche de cours indique explicitement les connaissances requises en amont. Si l'élève possède déjà ces prérequis, il s'immerge directement dans les modules interactifs supérieurs sans frustration.
3. **Répartition de l'effort cognitif** : Chaque notion est immédiatement accompagnée de rétroactions interactives d'auto-évaluation en direct (Quiz, Flashcards, Exercices pas à pas, FAQ).
4. **Apprentissage Éco-Responsable** : L'XP cumulée et l'historique d'apprentissage de l'étudiant sont gérés en local (`localStorage`) de façon totalement privée, sans requêtes réseau superflues.

---

## 📂 Organisation Détaillée des Dossiers

### 1. Bibliothèque des Cours (`/src/courses/`)

Les chapitres d'étude sont rédigés en React TSX et segmentés par cohortes d'apprentissage :

* **`Primaire/`** (CP, CE1, CE2, CM1, CM2 - Cycles 2 & 3) : Notions visuelles de comptage, premières tables opératoires, géométrie plane élémentaire et fractions de partage.
* **`College/`** (6ème, 5ème, 4ème, 3ème - Cycle 3 & 4) : Introduction de la variable littérale, démonstrations rigoureuses et ateliers géométriques.
  * *Récemment terminés* :
    * `Course_College_6eme_09_Espace_Volumes.tsx` (Empilement 3D isométrique de cubes unitaires de $1\text{ cm}^3$ et formules associés).
    * `Course_College_6eme_10_Gestion_Donnees.tsx` (Tableaux croisés à double entrée, diagrammes de données en bâtons SVG interactifs, diagrammes circulaires à rapporteur virtuel).
    * `Course_College_6eme_11_Algorithmique_Scratch.tsx` (Simulateur d'interprétation de briques de code Scratch, direction du regard, stylo à encre et structures de boucles « Répéter »).
* **`Lycee_General/`** (Seconde, Première, Terminale) : Maîtrise de l'analyse réelle (dérivabilité, limites de suites, primitives, intégration), exponantielle, trigonométrie et nombres complexes.
* **`Superieur/`** (CPGE B/L, BUT GEII, Classes Préparatoires, Sup Bio, Universités) :
  * *Modélisations avancées* : Systèmes dynamiques d'équations differentielles, réduction d'endomorphismes matriciels, transformées de Laplace complexes.

---

## 🏗️ Spécifications d'un Chapitre `TSX` Conforme

Chaque fichier de cours sous `/src/courses/` est un composant fonctionnel TypeScript exporté par défaut, prenant deux props obligatoires :
* `onValidateCourse: () => void` : Déclencheur de l'acquisition d'XP et de validation du cours.
* `isCompleted: boolean` : État indiquant si l'élève a déjà maîtrisé et validé ce chapitre spécifique.

### Anatomie du Composant d'Apprentissage

```tsx
import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner, FormulaBox
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { ... } from 'lucide-react';

const Course_Template: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* 1. Entête Officiel de la Fiche */}
      <CourseHeader 
        acronym="MATH-LEVEL-ID"
        title="Titre du Chapitre"
        subtitle="Accroche concrète et métaphorique de la notion"
        duration="45 min"
        level="Cohorte visée"
        prerequisites={["Notion Déjà Revue 1", "Notion Déjà Revue 2"]}
        objectives={["Objectif d'évaluation 1", "Objectif de savoir-faire 2"]}
      />

      {/* 2. Introduction et Ancrage */}
      <Section title="🌟 Introduction" icon="🚀" color="slate">
        <p>Texte introductif de cadrage...</p>
      </Section>

      {/* 3. Laboratoire Interactif SVG */}
      <Section title="🛠️ Le Laboratoire" icon="Activity" color="indigo">
        {/* Composant interactif local à l'aide de states (useState) */}
      </Section>

      {/* 4. Corps de Leçon avec Blocs Spécialisés */}
      <Section title="1. Contenu de cours" icon="Book" color="blue">
        <FormulaBox title="Formule Clé" math="E = mc^2" />
        
        <InfoBlock type="reminder" title="Rappel de cours">
          Rappel mathématique...
        </InfoBlock>
        
        <TipBanner title="Astuce Méthodologique" type="success">
          Contenu d'astuce d'excellence...
        </TipBanner>
      </Section>

      {/* 5. Exercices résolus pas à pas */}
      <Section title="✍️ Exercices Résolus" icon="Layers" color="amber">
        <InteractiveExercise 
          title="Exercice classique de rédaction"
          question="..."
          steps={["Étape 1 : Hypothèses", "Étape 2 : Démonstration", "Étape 3 : Conclusion"]}
        />
      </Section>

      {/* 6. Flashcards, FAQ et Évaluations */}
      <Section title="🧠 Flashcards de mémorisation" icon="RefreshCw" color="emerald">
        <Flashcard front="Question ?" back="Réponse éclair !" />
      </Section>

      <Section title="❓ FAQ" icon="HelpCircle" color="slate">
        <AccordionFAQ items={[{ question: "Pourquoi... ?", answer: "Parce que..." }]} />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="Award" color="rose">
        <Quiz questions={[{ question: "Q1", options: ["O1", "O2"], correctAnswer: 0, explanation: "..." }]} />
        <InteractiveChecklist items={["Savoir-faire 1", "Savoir-faire 2"]} />
      </Section>

      {/* 7. Bouton de Validation */}
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button onClick={onValidateCourse} className="bg-emerald-600 hover:bg-emerald-700 text-white ...">
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Template;
```

---

## 🎨 Contraintes de Typages et Couleurs (Ressources `SharedUI`)

Pour préserver l'intégrité esthétique globale et se conformer impérativement à la directive `AGENTS.md`, les développeurs et agents IA doivent manipuler les composants partagés en respectant la charte graphique :

1. **`color` disponible dans l'élément `<Section>`** :
   * Autorisé : `"slate" | "indigo" | "emerald" | "amber" | "rose" | "blue" | "purple"`
   * ❌ *Interdit* (causera des écarts de contraste ou cassera l'affichage) : `"red"`, `"green"`, `"teal"`, `"sky"`, `"yellow"`.

2. **`type` disponible dans `<InfoBlock>`** :
   * Autorisé : `"info" | "warning" | "definition" | "funfact" | "reminder"`
   * ❌ *Interdit* : `"success"`, `"error"`.

3. **`type` disponible dans `<TipBanner>`** :
   * Autorisé : `"info" | "warning" | "success"`
   * ❌ *Interdit* : `"error"`, `"reminder"`.
