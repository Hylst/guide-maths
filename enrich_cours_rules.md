# Règles d'enrichissement des fiches de cours

Afin de garantir des fiches de cours complètes, interactives et standardisées, le contenu de CHAQUE fiche de cours doit être au moins doublé en volume. Pour chaque cours / chapitre / fiche, la checklist suivante doit être validée lors de l'enrichissement.

L'objectif est d'utiliser systématiquement des composants React réutilisables, modulaires et configurables pour s'assurer d'une harmonie visuelle et technique dans l'ensemble de l'application.

## Checklist obligatoire par fiche de cours

- [ ] **Schéma pédagogique interactif** : Un SVG animé / interactif illustrant les concepts clés.
- [ ] **Introduction pédagogique** : Un texte clair expliquant le contexte, l'utilité du chapitre et posant les bases.
- [ ] **Partie théorie enrichie** : Développement des explications du/des concepts, accompagnés d'exemples et d'illustrations détaillées.
- [ ] **FAQ (Questions Fréquentes)** : Au moins 3 questions/réponses pour anticiper les confusions courantes des élèves.
- [ ] **QCM interactifs** : Au moins 3 questions à choix multiples avec corrections et explications détaillées pour chaque choix.
- [ ] **Application pratique / interactive** : Un mini-outil ou exercice où l'utilisateur manipule des variables ou interagit.
- [ ] **Exercices résolus** : 2 exercices minimum, avec une correction détaillée étape par étape.
- [ ] **Flashcards** : 2 flashcards minimum pour réviser rapidement les notions clés (recto/verso).
- [ ] **Blocs d'information spécifiques** :
  - `Le saviez-vous ?` (composant `InfoBlock` type="funfact")
  - `Rappel` (composant `InfoBlock` type="reminder")
  - `Zoom sur` (composant `Section` ou `InfoBlock` type="info")
- [ ] **Checklist de validation des essentiels** : 
  - Une liste des points essentiels à connaître dans le cours.
  - Ces cases ne pourront être cochées que si les QCM et/ou exercices interactifs du cours sont réussis.
  - La validation complète débloque **15 XP** avec une animation de **feu d'artifice**.
  - Le statut d'acquisition de la fiche doit être sauvegardé dans le `localStorage`.

## Éléments globaux à implémenter pour le système de progression

- **Dashboard de progression** : Visualisation de l'avancement global de l'utilisateur (déjà en partie en place, mais à étoffer pour visualiser par fiches validées).
- **Système d'XP et de Niveaux** : Gestion de l'expérience locale, seuils de passages de niveaux.
- **Badges et Trophées** : Des récompenses déblocables sous certaines conditions (ex: "Première fiche validée", "Expert en géométrie", etc.).

## Consignes techniques

- **Modèles de composants** : Chaque bloc cité ci-dessus (QCM, Flashcards, SVG animé, Checklist de validation) doit disposer de son composant React factorisé (ex: `<InteractiveExercise>`, `<Flashcard>`, `<ValidationChecklist>`, etc.).
- **Data vs UI** : Isoler au maximum le texte et les données de la structure UI.
- **Syntaxe Mathématique** : Toutes les formules LaTeX utilisées directement en JSX avec des `{ }` doivent être encadrées de guillemets `{"$\\frac{a}{b}$"}` (règle `AGENTS.md`).
- **Fil d'Ariane Pédagogique (Concept Pedigree)** : Les dépendances amont ("Prend racine dans") et aval ("Fleurira dans") ne doivent plus être écrites en dur dans les fichiers Markdown ou TSX des cours. Elles sont automatiquement résolues et injectées dans le composant `<CourseHeader>` grâce aux liaisons déclarées centralement dans le registre [concept_links.ts](file:///d:/0CODE/AntiGravity/guide-math%C3%A9matiques-interactif/src/data/concept_links.ts). Pour lier un nouveau cours ou modifier des prérequis, éditez ce registre.
