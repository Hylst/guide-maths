# Guide de Reprise Rapide (continue.md)

**⚠️ ATTENTION NOUVEL AGENT IA : Lisez immédiatement le fichier `bible.md` et `AGENTS.md` avant toute intervention.**

Ce fichier offre un point d'entrée pour un nouvel agent IA ou un développeur arrivant dans un nouveau contexte de discussion.

## 1. Contexte du Projet
Nous développons un **Applet de Mathématiques Interactives**, couvrant le programme français du Primaire (CP) jusqu'au Post-Bac.
L'application est une **App autonome React Vite TSX** (ses pages de cours sont stockées dans `/src/courses/`).

## 2. Architecture Actuelle
- **`/src/courses/`** : Contient tous les cours sous forme de composants React TSX (ex. `Course_College_3eme...tsx`).
- **`/src/components/SharedUI.tsx`** : LA librairie centrale de composants UI. À utiliser absolument pour tout bloc logique.
- **`/AGENTS.md` & `/bible.md`** : Les règles absolues de développement. 
- **`/scripts/check_completeness.js`** : Un script Node pour lister les cours auxquels il manque des sections interactives obligatoires.

## 3. Mission Actuelle : Phase V5
L'Applet a été intégralement converti du Markdown au TSX (Phase V4 terminée).
La **Phase V5** consiste à **Enrichir et Compléter** les cours avec des modules d'apprentissage interactifs avancés et des simulations visuelles sur-mesure (modèles SVG réactifs, balances à fléau algébriques, etc.).

Dernières fonctionnalités majeures apportées :
- **Système de Compte Local & Paramètres** : Sauvegarde locale du profil, bloc-notes, sélection d'avatars de scientifiques célèbres et import/export JSON.
- **Carte Conceptuelle Interactive (Knowledge Graph)** : Visualisation interactive 2D (SVG zoom/pan) de la spirale d'apprentissage et illumination des liens de notions.
- **Fil d'Ariane Pédagogique (Concept Pedigree)** (En cours) : Raccourcis de navigation dynamique (Prend racine dans / Fleurira dans) intégrés globalement via un `CourseContext`.

## 4. Prochaines Étapes Précises (Audit des Fichiers Manquants)
L'exécution de la commande de diagnostic `npx tsx scripts/check_completeness.js` révèle qu'il ne reste plus que **21 fichiers incomplets sur 142 cours répertoriés** !
Voici l'état des priorités pour la suite de l'enrichissement :
1. Finaliser le **Fil d'Ariane Pédagogique (Concept Pedigree)**.
2. Continuer l'enrichissement des modules spécialisés BTS (Ch. 1, 2, 3) : Graphes et Réseaux, Statistiques Inférentielles, Traitement du Signal.
3. Continuer l'enrichissement CPGE (Ch. 1, 2, 3) : Structures Algébriques, Polynômes, Séries de Fourier.
4. Maternelle Grande Section : Quantités, Formes et Grandeurs, Repères Spatiaux.

**👉 POUR LA MARCHE À SUIVRE (WORKFLOW) EXACTE, RÉFÉREZ-VOUS AU FICHIER `bible.md`.**
