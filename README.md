# Math Applet (V4 TSX) – Plateforme Éducative Interactive de Mathématiques

📐 Ce projet est une plateforme interactive, complète, moderne et progressive de cours de mathématiques, couvrant l'intégralité du parcours académique francophone, de l'école primaire au supérieur (Classes Préparatoires aux Grandes Écoles, BUT, Licences, BTS).

Initialement rédigé en Markdown statique, le projet a été migré avec succès vers une application web réactive moderne **React 19, TypeScript, Tailwind CSS et PWA**, développée dans l'environnement de pointe de **Hylst**. Chaque cours est un composant TSX autonome et robuste offrant une interactivité pédagogique supérieure (quiz, flashcards, exercices d'application) et des simulateurs mathématiques animés en SVG.

---

## 🚀 Fonctionnalités Majeures

* **Progression Globale Multi-Cycles** : Plus de 120 chapitres couvrant les cycles fondamentaux (Primaire, Collège, Lycée, Classes Préparatoires CPGE B/L, BUT GEII, et Sup Bio).
* **Laboratoires et Simulateurs Géométriques/Physiques** :
  * *Collège 6ème - Espace & Volumes* : Simulateur de pavé droit avec rendu en projection isométrique 3D en temps réel.
  * *Collège 6ème - Gestion de Données* : Créateur de diagrammes en bâtons interactifs pour l'évaluation empirique des données d'enquête.
  * *Collège 6ème - Algorithmique et Scratch* : Consoles d'exécution de briques Scratch (avancer de $N$ pas, tourner à $D$ degrés, stylo d'écriture actif) pour animer un lutin 🐱 de manière géométrique.
  * *Première - Dérivation, Suites & Second Degré* : Ajustements de coefficients géométriques, visualisation de tangentes, croissance exponentielle et monotonie de suites de Fibonacci.
  * *Supérieur* : Visualisation matricielle en 2D, asservissement temporel de Laplace, modèle démographique, et équilibre macro-économique de Cobb-Douglas sous contraintes d'optimisation lagrangienne.
* **Intégration Typographique Pure avec $\text{KaTeX}$** : Le composant `<MathComponent>` assure un rendu LaTeX irréprochable des symboles, fractions, intégrales et matrices, sans ralentissement.
* **Aide à la Révision Moderne** :
  * Mini-quiz auto-corrigés avec explications théoriques ciblées après soumission.
  * Flashcards interactives réversibles pour activer la mémoire à long terme.
  * Exercices résolus pas à pas guidant l'élève dans la rigueur démonstrative.
  * FAQ pliables (Accordions) résolvant les incompréhensions classiques d'élèves.
  * Checklists interactives pour valider les acquis de fin de chapitre.
* **Sauvegarde de Progression Locale** : Détection des chapitres validés et enregistrement persistant et éco-responsable dans le `localStorage` du dispositif de l'élève.

---

## 🛠️ Technologies & Stack Technique

* **Framework** : React 19 (Hooks fonctionnels strictes, aucun composant de classe hérité), Vite.
* **Langage** : TypeScript (Mode `strict` activé, aucun recours au type de secours `any`).
* **Design & Styles** : Tailwind CSS, esthétique « Apple-like » (grands arrondis, ombres portées douces, contrastes impeccables pour l'accessibilité).
* **Animations** : Framer Motion (importé depuis `motion/react`).
* **Icônes** : Lucide React (import officiel, pas d'icônes SVG codées en dur).
* **Rendu Mathématique** : `react-markdown` et `rehype-katex` (KaTeX).

---

## 📁 Architecture Organisée du Projet

Le projet adhère à une séparation stricte des préoccupations (Logic, Data, UI) :

```bash
├── .env.example        # Modèle de configuration des variables d'environnement (SEO & Sécurité)
├── AGENTS.md           # Directives impératives pour les agents IA (LaTeX et typages)
├── README.md           # Ce guide d'accueil et d'exploitation
├── about.md            # Vision pédagogique générale et ancrage matériel des maths
├── structure.md        # Guide de taxonomie des cours et d'organisation du curriculum
├── changelog.md        # Journal d'historique de publication et de versioning
├── todo.md             # Tableau de bord des chapitres complétés ou restants
├── package.json        # scripts de build, linter et dépendances npm
├── vite.config.ts      # Configuration de build et d'optimisation de Vite
├── src/
│   ├── main.tsx        # Point d'entrée de montage de l'application
│   ├── App.tsx         # Layout principal et routeur de l'application
│   ├── types.ts        # Typage strict de l'architecture des cours, quiz et progressions
│   ├── index.css       # Styles globaux et personnalisations CSS de KaTeX/Fonts
│   ├── components/     
│   │   ├── SharedUI.tsx      # Bibliothèque de composants réutilisables (Section, Flashcard, Quiz...)
│   │   └── MathComponent.tsx # Parseur mathématique KaTeX sécurisé
│   ├── data/           
│   │   └── courses.json      # Structure de navigation des différents cycles académiques
│   └── courses/        # Modules d'apprentissage organisés par cycles scolaires
│       ├── Primaire/
│       ├── College/
│       ├── Lycee_General/
│       └── Superieur/
└── scripts/            # Scripts utilitaires d'analyse et d'entretien régulier
```

---

## ⚠️ Règle de Sécurité LaTeX Majeure (`AGENTS.md`)

Les équations insérées au sein de JSX (les arguments de composants comme `<Flashcard>` ou `<InteractiveExercise>`) contenant des accolades (par exemple `\frac{3}{5}`) déclenchent des erreurs critiques de compilation React si elles ne sont pas correctement échappées. 

**Directive absolue** : Encadrer systématiquement les chaines LaTeX complexes avec des accolades et des guillemets doubles ou simples dans vos balises JSX :

❌ **À ÉVITER (provoque une erreur de compilation fatale ou plante le linter) :**
```tsx
<Flashcard 
  front={<>L'inverse de $\frac{3}{5}$ ...</>} 
/>
```

✅ **SYNTAXE CORRECTE (sécurisée) :**
```tsx
<Flashcard 
  front={<>L'inverse de {"$\\frac{3}{5}$"} ...</>} 
/>
```

---

## 🚀 Utilisation Courante et Commandes

Installez d'abord les dépendances :
```bash
npm install
```

### Lancement en Développement
```bash
npm run dev
```
*Le serveur se lance sur le port 3000.*

### Analyse Typographique (Linter strict)
```bash
npm run lint
```
*Cette commande exécute le compilateur TypeScript sans émission (`tsc --noEmit`). Le projet ne peut pas compiler avec des erreurs TypeScript ou de syntaxe.*

### Compilation pour la Production
```bash
npm run build
```
*Compile l'application statique optimisée dans le dossier `dist/`.*

### Outil de Complétion
```bash
npx tsx scripts/check_completeness.js
```
*Affiche un récapitulatif détaillé de l'état d'intégrité de la rédaction des cours du projet.*
