# Changelog

Toutes les modifications notables apportées à ce projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/), et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [V5.4.0] - PWA, Refactorisation modulaire, SEO et identité Hylst - 2026-06-08

### Ajouté
- **Configuration PWA Complète** :
  * Intégration de `vite-plugin-pwa` dans `vite.config.ts` pour générer automatiquement le Manifest et le Service Worker.
  * Ajout de `localforage` comme dépendance pour la gestion d'état offline.
  * Création de l'icône de marque `public/favicon.svg` (Sigma moderne avec dégradé indigo/violet).
  * Enregistrement du service worker pour prise en charge du cache hors-ligne adaptatif.
- **Documentation Technique et de Déploiement** :
  * Création de `readme-dev.md` détaillant le fonctionnement interne et l'architecture React 19 + TypeScript.
  * Création de `test_build_deploy.md` guidant le test local sous Windows et le déploiement sur hébergement mutualisé ou VPS Coolify/Nginx sous le sous-dossier `/guide-maths/`.

### Modifié
- **Refactorisation de Code et Modularisation** :
  * Réduction de la taille de `src/App.tsx` (de 1650+ lignes à moins de 260 lignes) en le découpant en sous-composants réutilisables.
  * Création de `src/components/CourseContent.tsx` (gestion de l'affichage des cours, KaTeX, mini-quiz).
  * Création de `src/components/Sidebar.tsx` (barre latérale de navigation hiérarchique par cycles).
  * Création de `src/utils/search.ts` (externalisation de l'algorithme de recherche sémantique par mots-clés).
- **Nettoyage de Marque et Oublis** :
  * Remplacement de toutes les références obsolètes à *Google AI Studio Build* par **Hylst** dans `README.md`, `about.md` et les configurations.
  * Changement de `GEMINI_API_KEY` en `HYLST_API_KEY` dans `.env.example` et la configuration de build Vite.
  * Suppression du script d'archive inutilisé `scripts/archive/fix_quizzes_llm.ts` qui importait `@google/genai` (désormais désinstallé) afin d'éviter les échecs de lint (`tsc --noEmit`).
  * Mise à jour de `index.html` avec les URLs canoniques et Open Graph pointant vers `https://hylst.fr/guide-maths/` et le nouveau favicon.
- **Routage en Sous-dossier** :
  * Configuration de `base: '/guide-maths/'` dans `vite.config.ts`.
  * Configuration de `basename="/guide-maths"` sur le `<BrowserRouter>` dans `src/main.tsx`.

---

## [V5.3.0] - Référencement SEO, Ancrages Scientifiques de Première et Consolidation des Directives - 2026-06-05

### Ajouté
- **Référencement SEO Profond (Architecture d'Accueil de l’Applet)** : 
  * Refonte intégrale de `/index.html` avec les balises meta sémantiques en français.
  * Configuration de l’indexation automatique par les moteurs de recherche (robots `index, follow`).
  * Liaison et intégrations de protocoles Open Graph (Facebook, LinkedIn) et Twitter Card pour des partages soignés avec titre contextuel et favicon dynamique.
  * Intégration de micro-données structurées JSON-LD au format `EducationalApplication` spécifiant l'âge, les niveaux d'études français (Primaire au Supérieur), et le sujet d’apprentissage pour stimuler le classement de recherche organique.
- **Ancrage Historique, Physique et Applicatif (Première - Tronc Commun & Spécialité)** :
  * *Dérivation* : Module enrichi avec le rappel sur le Taux d’Accroissement et une anecdote sur la rivalité historique Isaac Newton vs Gottfried Leibniz. Ajout d'un encadré d'applications physiques directes (vitesse instantanée et accélération par rapport au temps).
  * *Suites Numériques* : Intégration de la méthode d'étude de monotonie ($u_{n+1} - u_n$). Insertion d'une anecdote culturelle sur la suite de Fibonacci, les couples de lapins et la convergence vers le Nombre d'Or ($\varphi \approx 1,618$). Ajout d'une boîte d'application économique (intérêts composés) et biologique (prolifération de virus).
  * *Second Degré* : Rappel géométrique pour calculer le sommet $S(\alpha ; \beta)$ d'une parabole. Incursion historique sur les méthodes de découpage géométrique de Babylone (1800 av. J.-C.). Ajout d'une boîte de physique pratique modélisant de parfaites trajectoires de projectiles.
  * *Fonction Exponentielle* : Intégration de la dérivée généralisée de la composée $[e^{u(x)}]'$. Récit culturel sur la ruine du Roi face à l'exponentielle de riz sur le tablier d'échecs. Passage scientifique sur la datation de vestiges archéologiques au Carbone 14.
- **Section FAQ Interactive (Première - Intégration d'Accordions)** :
  * Création et enrichissement systématique de blocs de questions-réponses interactives `<AccordionFAQ>` sous chaque module de Première pour aborder et dissiper les doutes mathématiques récurrents (ex : différence physique entre $f(a)$ et $f'(a)$, raison géométrique négative, singularité du second degré quand l'inconnue s'annule, notation d'Euler pour la constante universelle $e$).

### Modifié
- **Validation Strictes des Normes de Style & Linter (`AGENTS.md`)** :
  * Revues systématiques de l'ensemble des formules mathématiques écrites dans les composants React pour s'assurer du respect des directives d'échappement sémantiques (inclusion de la forme `{"$...$"}`).
  * Uniformisation stricte des balises d'alertes de l'application : réalignement de tous les types d'alertes non assignables dans `<InfoBlock>` et `<TipBanner>` pour se conformer au dictionnaire de types de l'applet.
- **Refonte des Documents Cadres et d’Orientation** :
  * *`/about.md`* : Restructuré et magnifié pour étaler nos 4 piliers d’immersion d'apprentissage (Pédagogie spiralaire, Ancrage réel, Laboratoires de dessin, Esthétique Apple-like) ainsi que l'infrastructure de conformité SEO.
  * *`/README.md`* : Enrichi de sections d'installation, de l'arborescence claire du répertoire, des directives de codage de sécurité LaTeX et du mode opératoire de linter automatique.
  * *`/structure.md`* : Complété pour cataloguer fidèlement l'état et l'anatomie typée d’un chapitre TSX, tout en détaillant l'emplacement et les contraintes structurelles.
  * *`/todo.md`* : Tableau de bord de finalisation mis à jour pour acter la rédaction et la dotation interactive complète des chapitres d'analyse récents.

---

## [V5.2.0] - Modules Applicatifs et Résolutions Graphiques - 2026-06-04
### Ajouté
- **Modules BUT GEII (Harmonique & Laplace)** :
  * *Impédances complexes RLC* : Intégration d'un laboratoire vectoriel complet avec diagramme polaire de Fresnel s'adaptant dynamiquement à l'ajustement réactif des résistances, capacités et inductances.
  * *Transformée de Laplace & Asservissements* : Création d'une planche de simulation de réponses temporelles en boucle fermée pour des systèmes continus du 1er et 2nd ordre.
- **Modules CPGE B/L (Algèbre & Optimisation)** :
  * *Algèbre linéaire* : Implémentation d'un panneau d'interactivité matricielle 2D pour déceler les directions de vecteurs propres invariantes de façon géométrique.
  * *Optimisation sous contrainte* : Un simulateur dynamique représentant un plan de Cobb-Douglas avec tangence de la contrainte budgétaire linéaire et colinéarité des gradients de Lagrange.
- **Fichier des Fonctionnalités de l'Applet** : Création du document global `/features.md` synthétisant tous nos composants et laboratoires interactifs d'apprentissage.

### Modifié
- **Optimisation du Contraste de Texte (Calcul Littéral Seconde)** : Résolution du problème de lisibilité dans le bloc de cours "La règle ultime pour résoudre une équation au lycée" en renforçant l'affichage de l'encadré en mode sombre (`dark:bg-slate-800` et `dark:border-slate-700`) pour éviter l'effet texte clair sur fond clair.
- **Enrichissement de la vision globale de l'Applet** : Mise à jour et enrichissement de `/about.md` et `/structure.md` pour refléter notre expansion de contenus de second et troisième cycles.
- **Perspectives et Pistes d'Évolutions** : Ajout d'une section exhaustive dans `todo.md` compilant de nouvelles propositions pour la gamification, l'ergonomie clavier aux simulateurs, la synthèse vocale mathématique et l'orientation des étudiants.

---

## [V5.1.0] - Standardisation Post-Bac et Plan Complexe Interactif - 2026-05-26
### Ajouté
- **Plan Complexe Interactif (Post-Bac Ch. 1)** : Création d'un simulateur de nombres complexes hautement interactif (`ComplexPlane.tsx`). En glissant le point $z$ sur un plan polaire/cartésien, l'élève voit instantanément se recalculer et s'ajuster ses parties réelles et imaginaires, sa forme algébrique ($a+ib$), trigonométrique, et exponentielle ($r e^{i\theta}$). Comprend un interrupteur "Contraindre au cercle unité" et un traceur dynamique des racines $n$-ièmes de l'unité ($n=3,4,6$).
- **Checklists de validation d'essentiels** : Ajouté les sections `Checklist des Essentiels (Validation)` sur l'ensemble des 10 premiers chapitres universitaires Post-Bac pour permettre le gain d'XP persistant de l'application.

### Modifié
- **Migration de Quizz Statiques vers Dynamiques** : Les quiz des 10 premiers chapitres de l'Olympe Universitaire (Nombres Complexes, Algèbre Linéaire, Séries Numériques, Équations Différentielles, Espaces Euclidiens, Intégration, Probabilités Discrètes, Topologie, Calcul Différentiel et Calcul Stochastique) ont été convertis de la syntaxe HTML `<details>` brute vers le format Markdown standard pour activer l'interactivité dynamique de l'application (QCM à réponse immédiate, explications détaillées, scoring de validation).

---

## [V5.0.0] - Laboratoires Interactifs (Collège 4ème) - 2026-05-25
### Ajouté
- **Laboratoire de Pythagore (4ème Ch. 1)** : Création d'une plaque oscillante d'interactivité géométrique (SVG). En déplaçant les sommets librement sur une grille, l'élève assiste à la projection géométrique en temps réel des carrés $a^2$, $b^2$, et $c^2$, accompagnés de la résolution pas à pas de l'égalité $BC^2 = AB^2 + AC^2$.
- **Balance Algébrique Interactive (4ème Ch. 2)** : Module d'initiation aux équations du premier degré. Les élèves manipulent des bourses d'or inconnues ($x$) et des pièces de monnaie sur une balance à fléau animée pour accomplir les "opérations anti-matière" nécessaires pour isoler l'inconnue.
- **Laboratoire des Déplacements (4ème Ch. 9)** : Simulateur d'isométries comparant la Translation (vecteur $\vec{u}$) et la Rotation (centre $O$ et angle régulé par curseur). Gère les orbites circulaires, les vecteurs de translations clinquant en coordonnées de grille, et le calcul analytique dynamique des points transformés (A', B', C').

### Modifié
- Refactoring complet des calculs et formules complexes sous React/TSX pour éliminer les conflits d'accolades dans `Course_College_4eme_01_Pythagore.tsx` et `Course_College_4eme_02_Equations_Premier_Degre.tsx`.
- Correction globale de la terminologie mathématique dans les exercices (par exemple "Translader" -> "Translater" dans *Translations et Rotations*).
- Validation stricte du typage pour les composants d'alertes et d'encadrés (`InfoBlock` et `TipBanner` conformes aux règles `AGENTS.md`).
- Intégration complète de `<MathComponent>` pour l'écriture sémantique de formules LaTeX dures.

---

## [V4.0.0] - AI Studio React Applet
### Modifié
- **Migration Majeure (V4)** : L'ensemble des 124 cours a été intégralement migré vers des composants natifs en TSX sous une architecture modulaire Vite + React.
- Création de la bibliothèque de composants réutilisables `SharedUI.tsx`.
- Adaptation du système global de navigation au lazy-loading via un registre dynamique (`CourseRegistry.tsx`).

### Ajouté
- Scripts d'audit de progression automatique (`check_completeness.js`).
- Définition d'un fichier de directives spécifiques pour l'IA (`AGENTS.md`).

---

## [V3.0.0] - Exhaustivité Markdown (Legacy)
### Ajouté
- Couverture théorique de 100% de la structure officielle d'apprentissage sous forme de fiches Markdown statiques avec encarts bonus.
