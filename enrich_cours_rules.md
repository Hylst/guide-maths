# Règles d'enrichissement des fiches de cours (enrich_cours_rules.md)

Afin de garantir des fiches de cours complètes, interactives et standardisées, le contenu de CHAQUE fiche de cours doit être enrichi selon cette checklist. L'objectif est d'utiliser systématiquement des composants React réutilisables, modulaires et configurables pour assurer une harmonie visuelle et technique dans l'ensemble de l'application.

> **Script de diagnostic** : `npx tsx scripts/check_completeness.js` — liste tous les fichiers TSX incomplets avec les éléments manquants précis.

---

## ✅ Checklist Obligatoire par Fiche de Cours

- [ ] **Schéma pédagogique interactif** : Un SVG animé / interactif illustrant les concepts clés du chapitre (simulation, manipulation de variables, construction géométrique…).
- [ ] **Introduction pédagogique** : Un texte clair expliquant le contexte, l'utilité du chapitre et posant les bases. Doit inclure une accroche concrète ou une métaphore.
- [ ] **Partie théorie enrichie** : Développement des explications accompagnés d'exemples détaillés, de `<FormulaBox>`, de `<InfoBlock type="definition">` et de `<InfoBlock type="reminder">`.
- [ ] **Le saviez-vous ?** : Au moins 1 `<InfoBlock type="funfact">` avec une anecdote ou application réelle inattendue.
- [ ] **Rappel** : Au moins 1 `<InfoBlock type="reminder">` récapitulant un prérequis clé.
- [ ] **Zoom sur** : Au moins 1 `<Section>` ou `<InfoBlock type="info">` approfondissant un point précis.
- [ ] **FAQ (Questions Fréquentes)** : Un `<AccordionFAQ>` avec au moins 3 questions/réponses anticipant les confusions courantes des élèves.
- [ ] **QCM interactifs** : Un `<Quiz>` avec au moins 3 questions à choix multiples, corrections et explications détaillées pour chaque option.
- [ ] **Exercices résolus** : Au moins 2 `<InteractiveExercise>` avec une correction étape par étape.
- [ ] **Flashcards** : Au moins 2 `<Flashcard>` pour réviser rapidement les notions clés (recto/verso).
- [ ] **Checklist de validation des essentiels** : Un `<InteractiveChecklist>` avec les savoir-faire clés du chapitre. La validation complète débloque **+15 XP** avec une animation de feu d'artifice. Le statut est sauvegardé en `localStorage`.

---

## 📐 Anatomie Standard d'un Composant TSX de Cours

```tsx
import React, { useState } from 'react';
import {
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist,
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner, FormulaBox
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_NiveauXX: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader
        acronym="MATH-NIVEAU-ID"
        title="Titre du Chapitre"
        subtitle="Accroche concrète et métaphorique de la notion"
        duration="45 min"
        level="Cohorte visée"
        prerequisites={["Notion déjà acquise 1", "Notion déjà acquise 2"]}
        objectives={["Savoir-faire 1", "Savoir-faire 2"]}
      />

      {/* 1. Introduction */}
      <Section title="🌟 Introduction" icon="Zap" color="slate">
        <p>Texte d'accroche et contexte...</p>
        <InfoBlock type="reminder" title="Rappel essentiel">
          Ce qu'il faut déjà savoir...
        </InfoBlock>
      </Section>

      {/* 2. Laboratoire interactif SVG */}
      <Section title="🛠️ Laboratoire" icon="Activity" color="indigo">
        {/* Composant SVG interactif avec useState */}
      </Section>

      {/* 3. Théorie */}
      <Section title="📖 Théorie" icon="Book" color="blue">
        <FormulaBox title="Formule Clé" math="E = mc^2" />
        <InfoBlock type="definition" title="Définition">...</InfoBlock>
        <InfoBlock type="funfact" title="Le saviez-vous ?">...</InfoBlock>
        <InfoBlock type="info" title="Zoom sur">...</InfoBlock>
      </Section>

      {/* 4. Exercices résolus */}
      <Section title="✍️ Exercices Résolus" icon="Layers" color="amber">
        <InteractiveExercise
          title="Exercice 1"
          question="Énoncé..."
          steps={["Étape 1", "Étape 2", "Conclusion"]}
        />
      </Section>

      {/* 5. Flashcards */}
      <Section title="🧠 Flashcards" icon="RefreshCw" color="emerald">
        <Flashcard front="Question ?" back="Réponse !" />
        <Flashcard front="Question 2 ?" back="Réponse 2 !" />
      </Section>

      {/* 6. FAQ */}
      <Section title="❓ FAQ" icon="HelpCircle" color="slate">
        <AccordionFAQ items={[
          { question: "Pourquoi... ?", answer: "Parce que..." },
          { question: "Est-ce que... ?", answer: "Oui/Non, car..." },
          { question: "Comment... ?", answer: "En procédant ainsi..." }
        ]} />
      </Section>

      {/* 7. Épreuve Finale */}
      <Section title="🎯 Épreuve Finale" icon="Award" color="rose">
        <Quiz questions={[
          { question: "Q1 ?", options: ["A", "B", "C"], correctAnswer: 0, explanation: "Parce que..." },
          { question: "Q2 ?", options: ["A", "B", "C"], correctAnswer: 1, explanation: "Parce que..." },
          { question: "Q3 ?", options: ["A", "B", "C"], correctAnswer: 2, explanation: "Parce que..." }
        ]} />
        <InteractiveChecklist items={["Savoir-faire 1", "Savoir-faire 2", "Savoir-faire 3"]} />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button onClick={onValidateCourse}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl">
            ✅ Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_NiveauXX;
```

---

## 🎨 Contraintes de Typage (SharedUI)

| Composant | Prop | Valeurs autorisées uniquement |
|---|---|---|
| `<Section>` | `color` | `"slate" \| "indigo" \| "emerald" \| "amber" \| "rose" \| "blue" \| "purple"` |
| `<InfoBlock>` | `type` | `"info" \| "warning" \| "definition" \| "funfact" \| "reminder"` |
| `<TipBanner>` | `type` | `"info" \| "warning" \| "success"` |

❌ Toute autre valeur provoque une **erreur de compilation TypeScript** et bloque le build.

---

## 🔗 Fil d'Ariane Pédagogique — Rappel

Les dépendances amont ("Prend racine dans 🌱") et aval ("Fleurira dans 🌸") ne doivent **jamais** être écrites en dur dans les fichiers Markdown ou TSX des cours. Elles sont automatiquement résolues et injectées dans le composant `<CourseHeader>` grâce aux liaisons déclarées centralement dans le registre [`concept_links.ts`](file:///d:/0CODE/AntiGravity/guide-mathématiques-interactif/src/data/concept_links.ts).

**Pour lier un nouveau cours ou modifier des prérequis** : éditer uniquement ce registre. Voir `AGENTS.md` section 4 et `todo.md` section "Graphe Pédagogique" pour les 62 cours en attente.

---

## 🔍 Éléments Globaux du Système de Progression

Ces systèmes sont déjà en place (`useProgress.ts`, `Rewards.tsx`, `Dashboard.tsx`). Lors de l'enrichissement d'un cours, s'assurer de la cohérence avec :

- **XP par validation** : La validation d'un cours via `onValidateCourse()` accorde des XP (configuré dans `useProgress.ts`).
- **Badges automatiques** : Des badges se débloquent selon des seuils (premier cours, 10 cours, expert dans un domaine…).
- **Séries quotidiennes (Streaks)** : Toute session active maintient la série. Ne pas interrompre le flux UX avec des modales bloquantes.

---

## 🧪 Syntaxe LaTeX — Mémo Rapide

```tsx
// ❌ Provoque une erreur fatale (accolades LaTeX nues dans JSX)
<InfoBlock>La formule est $\frac{a}{b}$</InfoBlock>

// ✅ Correct — guillemets autour de la formule
<InfoBlock>La formule est {"$\\frac{a}{b}$"}</InfoBlock>

// ✅ Mieux — composant dédié
<InfoBlock>La formule est <MathComponent math="\\frac{a}{b}" /></InfoBlock>

// ✅ OK dans du Markdown pur (fichiers .md dans Cours_Math/)
La formule est $\frac{a}{b}$  ← pas de problème ici
```
