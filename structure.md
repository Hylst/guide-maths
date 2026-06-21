# Structure de la Plateforme Éducative (structure.md)

> Document de référence sur l'organisation des fichiers, la taxonomie des cours et les conventions de nommage.
> À lire avant toute création ou déplacement de fichier.

---

## 🧭 Philosophie de la Taxonomie

1. **Progression spiralaire** : Chaque notion est réintroduite à un niveau de complexité supérieur (ex: probabilités 4e → 1re → BTS → Licence).
2. **Double format** : Les cours existent soit en TSX (interactifs), soit en Markdown (statiques). Les deux coexistent et s'affichent dans la même vue.
3. **Séparation stricte UI / Contenu** : Aucun style, aucun lien de navigation n'est écrit dans les fiches de cours. Tout passe par `SharedUI.tsx` et `concept_links.ts`.

---

## 📂 Arborescence Complète du Projet

```
guide-mathématiques-interactif/
│
├── 📄 README.md              # Présentation publique
├── 📄 readme-dev.md          # Architecture technique (ce que lit un dev)
├── 📄 continue.md            # Point d'entrée rapide pour un agent IA
├── 📄 rodo.md                # Feuille de route priorisée
├── 📄 structure.md           # CE FICHIER — taxonomie et conventions
├── 📄 bible.md               # Règles de style et workflow stricts
├── 📄 AGENTS.md              # Règles spécifiques pour agents IA
├── 📄 contexte_dev.md        # État des lieux technique courant
├── 📄 enrich_cours_rules.md  # Règles pour enrichir les cours TSX
├── 📄 changelog.md           # Historique des versions
├── 📄 features.md            # Fonctionnalités actuelles et à venir
├── 📄 about.md               # Description pédagogique du projet
├── 📄 programme_officiel_maths_france.md  # Référentiel officiel MEN
│
├── 📦 package.json           # Dépendances npm
├── 📦 vite.config.ts         # Config Vite (PWA, static copy, alias)
├── 📦 tsconfig.json          # TypeScript strict mode
├── 📦 index.html             # Shell HTML (KaTeX CSS importé ici)
│
├── 📁 src/                   # CODE SOURCE
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css             # Tailwind CSS v4
│   │
│   ├── components/           # Composants React réutilisables
│   │   ├── SharedUI.tsx      # ★ BIBLIOTHÈQUE UI CENTRALE
│   │   ├── MathComponent.tsx # Rendu KaTeX inline
│   │   ├── Sidebar.tsx       # Menu hiérarchique + recherche
│   │   ├── CourseContent.tsx # Orchestrateur rendu cours (TSX + MD)
│   │   ├── ConceptGraph.tsx  # Graphe SVG interactif
│   │   ├── Dashboard.tsx     # Tableau de bord élève
│   │   ├── Rewards.tsx       # Gamification (badges, mini-jeux)
│   │   └── Settings.tsx      # Compte local et préférences
│   │
│   ├── courses/              # Composants TSX des cours enrichis
│   │   ├── CourseRegistry.tsx  # Registre lazy-loaded
│   │   ├── Primaire/          # CP → CM2
│   │   ├── Maternelle/        # PS, MS, GS
│   │   ├── College/           # 6e → 3e
│   │   ├── Lycee_General/     # 2de → Tle
│   │   └── Superieur/         # Post-Bac
│   │
│   ├── data/
│   │   ├── concept_links.ts    # ★ GRAPHE PÉDAGOGIQUE CENTRALISÉ
│   │   └── courses_index.json  # ★ INDEX AUTO-GÉNÉRÉ (ne pas éditer)
│   │
│   ├── hooks/
│   │   ├── useProgress.ts      # XP, badges, streaks
│   │   ├── useLocalAccount.ts  # Profil local
│   │   └── useCourses.ts       # Fetch Markdown asynchrone
│   │
│   └── utils/
│       ├── search.ts           # Dictionnaire sémantique
│       └── sound.ts            # Synthèse sonore native
│
├── 📁 Cours_Math/             # FICHES MARKDOWN STATIQUES
│   ├── 01_Maternelle/
│   │   ├── PS/               # Petite Section
│   │   ├── MS/               # Moyenne Section
│   │   └── GS/               # Grande Section
│   │
│   ├── 02_College/
│   │   ├── 6eme/             # 11 fiches
│   │   ├── 5eme/             # 14 fiches
│   │   ├── 4eme/             # 13 fiches
│   │   └── 3eme/             # 11 fiches
│   │
│   ├── 03_Lycee/
│   │   ├── Seconde/          # 8 fiches (+ Professionnel ×3, Technologique ×3)
│   │   ├── Premiere/         # 8 fiches
│   │   ├── Terminale/        # 11 fiches
│   │   ├── Terminale_Complementaires/  # 3 fiches
│   │   └── Terminale_Expertes/         # 3 fiches
│   │
│   └── 04_Post_Bac/          # 79 fiches — organisées par filière
│       ├── Algebre_L1_L2/    # 3 fiches (groupes, anneaux, EV)
│       ├── BTS/              # 4 fiches (graphes, stats, signal, Boole)
│       ├── BTS_CG/           # 3 fiches (finance, stats, proba)
│       ├── BTS_Industriel/   # 3 fiches (vibrations, résonance, Fourier)
│       ├── BTS_Tertiaire/    # 3 fiches (suites, échantillonnage, simplexe)
│       ├── BUT/              # 4 fiches (tronc commun)
│       ├── BUT_GEA/          # 3 fiches (finance, RO, stats)
│       ├── BUT_GEII/         # 3 fiches (impédance, Z, Laplace)
│       ├── BUT_Industriel/   # 3 fiches (MSP, plans, DAO)
│       ├── BUT_Tertiaire/    # 3 fiches (PERT, files, décision)
│       ├── CPGE/             # 3 fiches (structures algé., poly, Fourier)
│       ├── CPGE_BL/          # via Sup_CPGE/
│       ├── CPGE_ECG/         # 3 fiches numér. racine (12, 19, 21)
│       ├── Ingenieur_IA_Data/ # 3 fiches (vectoriel, gradient, deep learning)
│       ├── Sup_CPGE/         # 3 fiches (proba BL, algè BL, optim BL)
│       ├── Sup_Universite/   # 15 fiches (licence maths, MIASHS, bio, éco, finance)
│       └── [XX_*.md]         # ~18 fiches numérotées tronc commun Post-Bac
│
├── 📁 scripts/               # Scripts Node / tsx
│   ├── generate_index.ts     # Régénère courses_index.json
│   ├── check_completeness.js # Audit cours TSX incomplets
│   ├── check_dependencies.js # Audit graphe (dépendances pendantes)
│   └── find_missing_links.js # Cours sans entrée dans concept_links.ts
│
└── 📁 public/                # Assets statiques
    ├── icons/                # Icônes PWA
    └── manifest.webmanifest  # Généré par vite-plugin-pwa
```

---

## 🏷️ Conventions de Nommage

### Fichiers Markdown (`Cours_Math/`)
```
XX_Nom_Du_Cours.md
│   │
│   └── Nom en PascalCase séparé par underscores (pas d'accents dans le nom de fichier)
└── Numéro d'ordre à 2 chiffres (01, 02…)
```
Exemples : `01_Theoreme_Pythagore.md`, `02_BTS_02_Statistiques_Inferentielles.md`

### Composants TSX (`src/courses/`)
```
Course_[Niveau]_[SousNiveau]_[NomCours].tsx
```
Exemples : `Course_College_3eme_01_Thales.tsx`, `Course_Lycee_Terminale_04_Logarithme.tsx`

### IDs dans `concept_links.ts`
L'ID est le **chemin absolu depuis la racine du projet** (slash initial) :
```
/Cours_Math/04_Post_Bac/BTS/01_BTS_01_Graphes_et_Reseaux.md
```
Il correspond exactement au champ `id` dans `courses_index.json`.

---

## 🔢 Comptage des Cours (juin 2026)

| Niveau | Sous-niveaux | Fiches MD | Composants TSX |
|---|---|---|---|
| Maternelle | PS, MS, GS | 11 | ~0 |
| Primaire | CP→CM2 | 32 | ~32 |
| Collège | 6e→3e | 49 | ~49 |
| Lycée général | 2de→Tle (+compl. +exp.) | 36 | ~36 |
| Lycée pro/techno | Professionnel, Techno | 6 | ~6 |
| Post-Bac | 20+ filières | 79 | ~20 |
| **TOTAL** | | **215** | **~142** |

> ⚠️ Le nombre de composants TSX (142) < nombre de fiches MD (215) car les cours Post-Bac récents n'ont pas encore leur version TSX interactive.

---

## 📐 Anatomie d'une Entrée dans `concept_links.ts`

```typescript
// Syntaxe type
"/Cours_Math/[dossier]/[fichier].md": {
  domain: "numbers" | "algebra" | "analysis" | "geometry" | "probability" | "algorithms" | "general",
  shortTitle: "Titre court (< 25 car.)",
  dependencies: [
    "/Cours_Math/[dossier]/[prerequis].md"  // Doit exister comme clé dans ce même objet !
  ],
  offsetY?: number,  // Ajustement visuel optionnel pour le graphe SVG
  offsetX?: number,
},
```

### Domaines et leur signification

| `domain` | Thème | Couleur affichée |
|---|---|---|
| `numbers` | Nombres & Arithmétique | Emerald |
| `algebra` | Algèbre & Équations | Amber |
| `analysis` | Analyse & Fonctions | Blue |
| `geometry` | Géométrie & Vecteurs | Rose |
| `probability` | Probabilités & Statistiques | Purple |
| `algorithms` | Algorithmique & Logique | Indigo |
| `general` | Général / Transversal | Slate |

---

## ⚠️ Points de Vigilance (anti-régression)

1. **Ne jamais modifier `courses_index.json` à la main** — c'est un fichier généré.
2. **Ne jamais supprimer une clé de `concept_links.ts`** sans vérifier qu'elle n'est pas référencée en `dependencies` d'un autre cours.
3. **Les IDs sont sensibles à la casse et aux underscores** — copier-coller depuis l'index plutôt que retaper.
4. **Un cours Markdown peut exister sans entrée dans `concept_links.ts`** — ce n'est pas une erreur, juste l'absence du fil d'Ariane.
5. **Un ID dans `concept_links.ts` DOIT exister dans `courses_index.json`** — vérifier avant tout ajout.
