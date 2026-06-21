# 💻 Contexte de Développement (contexte_dev.md)

Ce fichier dresse l'état des lieux technique de l'application, l'environnement de développement et les outils de diagnostic à disposition pour maintenir la qualité exceptionnelle de notre outil pédagogique interactif de mathématiques.

---

## 🛠️ Stack Technique & Infrastructure

L'application est un **Applet React full-client (SPA)** s'exécutant dans une boîte de sable sécurisée :
- **Framework** : React 19 (Hooks) + Vite.
- **Langage / Typage** : TypeScript 5+ (Mode Strict activé avec interdiction du type `any`).
- **Stylisation** : Tailwind CSS v4 (utilisant `@import "tailwindcss";` dans `src/index.css`).
- **Composants Génériques** : `src/components/SharedUI.tsx` et `src/components/MathComponent.tsx` (moteur KaTeX).
- **Icônes** : `lucide-react` exclusivement.
- **Port d'Ingress** : Port `3000` uniquement (géré par le reverse proxy Nginx).

---

## 🎯 État Actuel du Projet & Couverture

L'ensemble du catalogue compte **142 cours unitaires** du CP au Post-Bac :
- **Conversion V4 (Terminée)** : Tous les cours sont intégrés à l'application.
- **Enrichissement Interactif V5 (En Cours)** :
  - **Couverture Actuelle** : ~85.2% des cours sont complets (riches en composants `SharedUI`).
  - **Système de Compte Local & Paramètres** (`useLocalAccount.ts`, `Settings.tsx`) : Bloc-notes sécurisé par mot de passe en session, choix parmi 16 avatars personnalisés, sélection du thème, import/export de la progression au format JSON.
  - **Carte Conceptuelle Interactive (Knowledge Graph)** (`ConceptGraph.tsx`, route `/graph`) : Visualisation des cours sous forme de nœuds sur une grille bidimensionnelle thématique/temporelle, avec illumination de la lignée d'une notion (parents/enfants) au survol.
  - **Fil d'Ariane Pédagogique (Concept Pedigree)** : Système dynamique intégré dans `<CourseHeader />` exploitant un `CourseContext` et le registre centralisé `src/data/concept_links.ts` pour afficher et lier les cours prérequis ("Prend racine dans") et successeurs ("Fleurira dans").

---

## 🚨 Règles de Sécurité de Code (Do Not Break !)

### 1. Syntaxe KaTeX dans l'arbre d'éléments React (JSX)
Ne laissez jamais des accolades nues `{ }` à l'intérieur d'une chaîne mathématique `$ ... $` ou `$$ ... $$` dans du JSX (utilisatrice de variables), car le parseur JSX de TypeScript lèvera une erreur de compilation fatale.
- **Faux** : `<span>$\frac{x}{2}$</span>`
- **Correct** : `<span>{"$\\frac{x}{2}$"}</span>` ou utiliser directement `<MathComponent math="\\frac{x}{2}" />` (recommandé).

### 2. Typage Strict des Couleurs & Statuts
Les composants de `SharedUI.tsx` exigent des valeurs d'énumérations très strictes au niveau des variables de props :
- **Couleurs admissibles** : `"slate" | "indigo" | "emerald" | "amber" | "rose" | "blue" | "purple"` (les couleurs génériques Tailwind comme `red` ou `green` provoquent un échec de compilation).
- **Statuts InfoBlock** : `"info" | "warning" | "definition" | "funfact" | "reminder"`
- **Statuts TipBanner** : `"info" | "warning" | "success"`

---

## 🔍 Diagnostics & Outils de Validation

### 1. Script d'Audit d'Exhaustivité
Ce script parcourt récursivement `src/courses/` et valide que chaque fichier contient les éléments d'évaluation indispensables (`InteractiveExercise`, `Quiz`, `Flashcard`) :
```bash
npx tsx scripts/check_completeness.js
```

### 2. Linter & Validation de Syntaxe
À exécuter impérativement après chaque écriture de fichier pour valider les liaisons de variables et les types :
```bash
npm run lint
# Équivalent sous-jacent : tsc --noEmit
```

### 3. Compilation de Production
Vérifie la bonne génération des bundles finaux :
```bash
npm run build
```
