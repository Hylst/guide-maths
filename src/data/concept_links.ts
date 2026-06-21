export interface CourseNodeMetadata {
  domain: "numbers" | "algebra" | "analysis" | "geometry" | "probability" | "algorithms" | "general";
  shortTitle: string;
  dependencies: string[]; // Parent course IDs
  offsetY?: number; // Visual adjustments to prevent overlap
  offsetX?: number;
}

export const CONCEPT_METADATA: Record<string, CourseNodeMetadata> = {
  // --- GÉOMÉTRIE & VECTEURS ---
  "/Cours_Math/02_College/4eme/01_Theoreme_Pythagore.md": {
    domain: "geometry",
    shortTitle: "Pythagore",
    dependencies: [],
    offsetY: -10
  },
  "/Cours_Math/02_College/4eme/10_Triangles_Egaux_Semblables.md": {
    domain: "geometry",
    shortTitle: "Triangles Semblables",
    dependencies: ["/Cours_Math/02_College/4eme/01_Theoreme_Pythagore.md"],
    offsetY: 10
  },
  "/Cours_Math/02_College/3eme/01_Theoreme_Thales.md": {
    domain: "geometry",
    shortTitle: "Thalès",
    dependencies: ["/Cours_Math/02_College/4eme/01_Theoreme_Pythagore.md"],
    offsetY: -15
  },
  "/Cours_Math/02_College/4eme/11_Cosinus.md": {
    domain: "geometry",
    shortTitle: "Cosinus (4e)",
    dependencies: ["/Cours_Math/02_College/4eme/01_Theoreme_Pythagore.md"]
  },
  "/Cours_Math/02_College/3eme/02_Trigonometrie.md": {
    domain: "geometry",
    shortTitle: "Trigonométrie (3e)",
    dependencies: ["/Cours_Math/02_College/4eme/11_Cosinus.md"]
  },
  "/Cours_Math/02_College/3eme/08_Vecteurs.md": {
    domain: "geometry",
    shortTitle: "Vecteurs (3e)",
    dependencies: []
  },
  "/Cours_Math/03_Lycee/Seconde/02_Vecteurs_du_Plan.md": {
    domain: "geometry",
    shortTitle: "Vecteurs (2de)",
    dependencies: ["/Cours_Math/02_College/3eme/08_Vecteurs.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/05_Trigonometrie.md": {
    domain: "geometry",
    shortTitle: "Cercle Trigonométrique",
    dependencies: ["/Cours_Math/02_College/3eme/02_Trigonometrie.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/06_Produit_Scalaire_et_Geometrie.md": {
    domain: "geometry",
    shortTitle: "Produit Scalaire",
    dependencies: ["/Cours_Math/03_Lycee/Seconde/02_Vecteurs_du_Plan.md", "/Cours_Math/03_Lycee/Premiere/05_Trigonometrie.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/02_Geometrie_dans_l_Espace.md": {
    domain: "geometry",
    shortTitle: "Géométrie Espace (Tle)",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/06_Produit_Scalaire_et_Geometrie.md"]
  },
  "/Cours_Math/04_Post_Bac/BUT_Industriel/03_Transformations_CAD.md": {
    domain: "geometry",
    shortTitle: "DAO & Matrices 3D",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/02_Geometrie_dans_l_Espace.md"]
  },
  "/Cours_Math/04_Post_Bac/Ingenieur_IA_Data/01_Analyse_Vectorielle_Operateurs.md": {
    domain: "geometry",
    shortTitle: "Analyse Vectorielle",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/02_Geometrie_dans_l_Espace.md"]
  },

  // --- NOMBRES & ARITHMÉTIQUE ---
  "/Cours_Math/02_College/6eme/01_Nombres_et_Decimaux.md": {
    domain: "numbers",
    shortTitle: "Entiers & Décimaux",
    dependencies: []
  },
  "/Cours_Math/02_College/6eme/03_Fractions.md": {
    domain: "numbers",
    shortTitle: "Fractions (6e)",
    dependencies: ["/Cours_Math/02_College/6eme/01_Nombres_et_Decimaux.md"]
  },
  "/Cours_Math/02_College/4eme/04_Fractions_Operations.md": {
    domain: "numbers",
    shortTitle: "Fractions Calculs",
    dependencies: ["/Cours_Math/02_College/6eme/03_Fractions.md"]
  },
  "/Cours_Math/02_College/4eme/06_Nombres_Relatifs_Operations.md": {
    domain: "numbers",
    shortTitle: "Nombres Relatifs",
    dependencies: []
  },
  "/Cours_Math/02_College/3eme/04_Arithmetique.md": {
    domain: "numbers",
    shortTitle: "Nombres Premiers",
    dependencies: ["/Cours_Math/02_College/6eme/01_Nombres_et_Decimaux.md"]
  },
  "/Cours_Math/03_Lycee/Seconde/01_Nombres_et_Intervalles.md": {
    domain: "numbers",
    shortTitle: "Intervalles & Réels",
    dependencies: ["/Cours_Math/02_College/4eme/06_Nombres_Relatifs_Operations.md", "/Cours_Math/02_College/4eme/04_Fractions_Operations.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/10_Nombres_Complexes.md": {
    domain: "numbers",
    shortTitle: "Nombres Complexes",
    dependencies: ["/Cours_Math/03_Lycee/Seconde/01_Nombres_et_Intervalles.md"]
  },
  "/Cours_Math/03_Lycee/Terminale_Expertes/01_Nombres_Complexes_Approfondis.md": {
    domain: "numbers",
    shortTitle: "Complexes Avancés",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/10_Nombres_Complexes.md"]
  },
  "/Cours_Math/03_Lycee/Terminale_Expertes/02_Arithmetique.md": {
    domain: "numbers",
    shortTitle: "Arithmétique Spé",
    dependencies: ["/Cours_Math/02_College/3eme/04_Arithmetique.md"]
  },
  "/Cours_Math/04_Post_Bac/01_Nombres_Complexes.md": {
    domain: "numbers",
    shortTitle: "Complexes Post-Bac",
    dependencies: ["/Cours_Math/03_Lycee/Terminale_Expertes/01_Nombres_Complexes_Approfondis.md"]
  },
  "/Cours_Math/04_Post_Bac/Algebre_L1_L2/01_Arithmetique_Superieure.md": {
    domain: "numbers",
    shortTitle: "Arithmétique Supérieure",
    dependencies: ["/Cours_Math/04_Post_Bac/CPGE/01_CPGE_01_Structures_Algebriques.md"]
  },

  // --- ALGÈBRE & ÉQUATIONS ---
  "/Cours_Math/02_College/5eme/11_Calcul_Litteral.md": {
    domain: "algebra",
    shortTitle: "Calcul Littéral (5e)",
    dependencies: []
  },
  "/Cours_Math/02_College/4eme/02_Equations_Premier_Degre.md": {
    domain: "algebra",
    shortTitle: "Équations 1er Degré",
    dependencies: ["/Cours_Math/02_College/5eme/11_Calcul_Litteral.md"]
  },
  "/Cours_Math/02_College/3eme/07_Calcul_Litteral_Equations.md": {
    domain: "algebra",
    shortTitle: "Calcul Littéral & Éq",
    dependencies: ["/Cours_Math/02_College/4eme/02_Equations_Premier_Degre.md"]
  },
  "/Cours_Math/03_Lycee/Seconde/04_Calcul_Litteral_et_Equations.md": {
    domain: "algebra",
    shortTitle: "Calcul Littéral (2de)",
    dependencies: ["/Cours_Math/02_College/3eme/07_Calcul_Litteral_Equations.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/03_Second_Degre.md": {
    domain: "algebra",
    shortTitle: "Second Degré",
    dependencies: ["/Cours_Math/03_Lycee/Seconde/04_Calcul_Litteral_et_Equations.md"]
  },
  "/Cours_Math/03_Lycee/Terminale_Expertes/03_Matrices_et_Graphes.md": {
    domain: "algebra",
    shortTitle: "Matrices & Graphes",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/03_Second_Degre.md"]
  },
  "/Cours_Math/04_Post_Bac/02_Algebre_Lineaire.md": {
    domain: "algebra",
    shortTitle: "Algèbre Linéaire",
    dependencies: ["/Cours_Math/03_Lycee/Terminale_Expertes/03_Matrices_et_Graphes.md", "/Cours_Math/03_Lycee/Seconde/02_Vecteurs_du_Plan.md"]
  },
  "/Cours_Math/04_Post_Bac/CPGE/01_CPGE_01_Structures_Algebriques.md": {
    domain: "algebra",
    shortTitle: "Structures Algébriques",
    dependencies: ["/Cours_Math/04_Post_Bac/02_Algebre_Lineaire.md"]
  },
  "/Cours_Math/04_Post_Bac/05_Espaces_Euclidiens.md": {
    domain: "algebra",
    shortTitle: "Espaces Euclidiens",
    dependencies: ["/Cours_Math/04_Post_Bac/02_Algebre_Lineaire.md"]
  },
  "/Cours_Math/04_Post_Bac/Algebre_L1_L2/02_Structures_Algebriques.md": {
    domain: "algebra",
    shortTitle: "Structures Algébriques L2",
    dependencies: ["/Cours_Math/04_Post_Bac/Algebre_L1_L2/01_Arithmetique_Superieure.md"]
  },
  "/Cours_Math/04_Post_Bac/Algebre_L1_L2/03_Espaces_Vectoriels_Rang.md": {
    domain: "algebra",
    shortTitle: "Esp. Vectoriels & Rang",
    dependencies: ["/Cours_Math/04_Post_Bac/02_Algebre_Lineaire.md", "/Cours_Math/04_Post_Bac/Algebre_L1_L2/02_Structures_Algebriques.md"]
  },

  // --- ANALYSE & FONCTIONS ---
  "/Cours_Math/02_College/3eme/03_Notion_de_Fonction.md": {
    domain: "analysis",
    shortTitle: "Notion de Fonction",
    dependencies: []
  },
  "/Cours_Math/03_Lycee/Seconde/03_Fonctions_de_Reference.md": {
    domain: "analysis",
    shortTitle: "Fonctions Réf",
    dependencies: ["/Cours_Math/02_College/3eme/03_Notion_de_Fonction.md"]
  },
  "/Cours_Math/03_Lycee/Seconde/08_Variations_de_Fonctions.md": {
    domain: "analysis",
    shortTitle: "Variations (2de)",
    dependencies: ["/Cours_Math/03_Lycee/Seconde/03_Fonctions_de_Reference.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/02_Suites_Numeriques.md": {
    domain: "analysis",
    shortTitle: "Suites (1ère)",
    dependencies: ["/Cours_Math/02_College/3eme/03_Notion_de_Fonction.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/01_Derivation_et_Variations.md": {
    domain: "analysis",
    shortTitle: "Dérivation (1ère)",
    dependencies: ["/Cours_Math/03_Lycee/Seconde/08_Variations_de_Fonctions.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/04_Fonction_Exponentielle.md": {
    domain: "analysis",
    shortTitle: "Exponentielle",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/01_Derivation_et_Variations.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/05_Suites_et_Recurrence.md": {
    domain: "analysis",
    shortTitle: "Suites & Récurrence",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/02_Suites_Numeriques.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/01_Limites_et_Continuite.md": {
    domain: "analysis",
    shortTitle: "Limites & Continuité",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/01_Derivation_et_Variations.md", "/Cours_Math/03_Lycee/Terminale/05_Suites_et_Recurrence.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/03_Derivation_et_Convexite.md": {
    domain: "analysis",
    shortTitle: "Dérivation (Tle)",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/01_Derivation_et_Variations.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/04_Fonction_Logarithme.md": {
    domain: "analysis",
    shortTitle: "Logarithme Népérien",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/04_Fonction_Exponentielle.md", "/Cours_Math/03_Lycee/Terminale/01_Limites_et_Continuite.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/09_Primitives_et_Calcul_Integral.md": {
    domain: "analysis",
    shortTitle: "Calcul Intégral",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/03_Derivation_et_Convexite.md", "/Cours_Math/03_Lycee/Terminale/04_Fonction_Logarithme.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/08_Equations_Differentielles.md": {
    domain: "analysis",
    shortTitle: "Équations Diff (Tle)",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/04_Fonction_Exponentielle.md"]
  },
  "/Cours_Math/04_Post_Bac/03_Series_Numeriques.md": {
    domain: "analysis",
    shortTitle: "Séries Numériques",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/01_Limites_et_Continuite.md"]
  },
  "/Cours_Math/04_Post_Bac/08_Topologie.md": {
    domain: "analysis",
    shortTitle: "Topologie",
    dependencies: ["/Cours_Math/04_Post_Bac/03_Series_Numeriques.md"]
  },
  "/Cours_Math/04_Post_Bac/09_Calcul_Differentiel_Optimisation.md": {
    domain: "analysis",
    shortTitle: "Calcul Différentiel",
    dependencies: ["/Cours_Math/04_Post_Bac/08_Topologie.md"]
  },
  "/Cours_Math/04_Post_Bac/06_Integration_et_Primitives.md": {
    domain: "analysis",
    shortTitle: "Intégration L1",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/09_Primitives_et_Calcul_Integral.md"]
  },
  "/Cours_Math/04_Post_Bac/04_Equations_Differentielles.md": {
    domain: "analysis",
    shortTitle: "Équations Diff L2",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/08_Equations_Differentielles.md", "/Cours_Math/04_Post_Bac/09_Calcul_Differentiel_Optimisation.md"]
  },
  "/Cours_Math/04_Post_Bac/14_Analyse_L1_Limites_Continuite.md": {
    domain: "analysis",
    shortTitle: "Limites & Continuité (L1)",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/01_Limites_et_Continuite.md"]
  },
  "/Cours_Math/04_Post_Bac/15_Analyse_L1_Derivabilite_DL.md": {
    domain: "analysis",
    shortTitle: "Dérivabilité & DL",
    dependencies: ["/Cours_Math/04_Post_Bac/14_Analyse_L1_Limites_Continuite.md"]
  },
  "/Cours_Math/04_Post_Bac/25_Analyse_L1_Suites_Numeriques_Reelles.md": {
    domain: "analysis",
    shortTitle: "Suites Réelles (L1)",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/05_Suites_et_Recurrence.md"]
  },
  "/Cours_Math/04_Post_Bac/16_Analyse_L2_Fonctions_Plusieurs_Variables.md": {
    domain: "analysis",
    shortTitle: "Fonctions Pl. Var.",
    dependencies: ["/Cours_Math/04_Post_Bac/15_Analyse_L1_Derivabilite_DL.md", "/Cours_Math/04_Post_Bac/09_Calcul_Differentiel_Optimisation.md"]
  },

  // --- PROBABILITÉS & STATISTIQUES ---
  "/Cours_Math/02_College/4eme/08_Statistiques.md": {
    domain: "probability",
    shortTitle: "Statistiques (4e)",
    dependencies: []
  },
  "/Cours_Math/02_College/4eme/13_Probabilites.md": {
    domain: "probability",
    shortTitle: "Probabilités (4e)",
    dependencies: []
  },
  "/Cours_Math/02_College/3eme/05_Probabilites.md": {
    domain: "probability",
    shortTitle: "Probabilités (3e)",
    dependencies: ["/Cours_Math/02_College/4eme/13_Probabilites.md"]
  },
  "/Cours_Math/03_Lycee/Seconde/07_Probabilites.md": {
    domain: "probability",
    shortTitle: "Probabilités (2de)",
    dependencies: ["/Cours_Math/02_College/3eme/05_Probabilites.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/07_Probabilites_Conditionnelles.md": {
    domain: "probability",
    shortTitle: "Conditionnement",
    dependencies: ["/Cours_Math/03_Lycee/Seconde/07_Probabilites.md"]
  },
  "/Cours_Math/03_Lycee/Premiere/08_Variables_Aleatoires.md": {
    domain: "probability",
    shortTitle: "Variables Aléatoires",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/07_Probabilites_Conditionnelles.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/07_Loi_Binomiale_et_Loi_des_Grands_Nombres.md": {
    domain: "probability",
    shortTitle: "Loi Binomiale",
    dependencies: ["/Cours_Math/03_Lycee/Premiere/08_Variables_Aleatoires.md"]
  },
  "/Cours_Math/03_Lycee/Terminale/11_Probabilites_et_Lois_Continues.md": {
    domain: "probability",
    shortTitle: "Lois Continues",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/07_Loi_Binomiale_et_Loi_des_Grands_Nombres.md"]
  },
  "/Cours_Math/04_Post_Bac/BTS/02_BTS_02_Statistiques_Inferentielles.md": {
    domain: "probability",
    shortTitle: "Stats Inférentielles",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/11_Probabilites_et_Lois_Continues.md"]
  },
  "/Cours_Math/04_Post_Bac/BUT_Industriel/01_MSP.md": {
    domain: "probability",
    shortTitle: "Maîtrise Statistique",
    dependencies: ["/Cours_Math/04_Post_Bac/BTS/02_BTS_02_Statistiques_Inferentielles.md"]
  },
  "/Cours_Math/04_Post_Bac/BUT_Industriel/02_Plans_Experiences.md": {
    domain: "probability",
    shortTitle: "Plans d'Expériences",
    dependencies: ["/Cours_Math/04_Post_Bac/BUT_Industriel/01_MSP.md"]
  },
  "/Cours_Math/04_Post_Bac/07_Probabilites_Discretes.md": {
    domain: "probability",
    shortTitle: "Probabilités Discrètes",
    dependencies: ["/Cours_Math/03_Lycee/Terminale/07_Loi_Binomiale_et_Loi_des_Grands_Nombres.md"]
  },
  "/Cours_Math/04_Post_Bac/17_Probabilites_Continues.md": {
    domain: "probability",
    shortTitle: "Probabilités Continues",
    dependencies: ["/Cours_Math/04_Post_Bac/07_Probabilites_Discretes.md", "/Cours_Math/04_Post_Bac/06_Integration_et_Primitives.md"]
  },
  "/Cours_Math/04_Post_Bac/18_Probabilites_Vecteurs_Aleatoires.md": {
    domain: "probability",
    shortTitle: "Vecteurs Aléatoires",
    dependencies: ["/Cours_Math/04_Post_Bac/17_Probabilites_Continues.md"]
  },
  "/Cours_Math/04_Post_Bac/10_Calcul_Stochastique.md": {
    domain: "probability",
    shortTitle: "Calcul Stochastique",
    dependencies: ["/Cours_Math/04_Post_Bac/18_Probabilites_Vecteurs_Aleatoires.md"]
  },

  // --- ALGORITHMIQUE & LOGIQUE ---
  "/Cours_Math/02_College/4eme/05_Algorithmique_Scratch.md": {
    domain: "algorithms",
    shortTitle: "Algorithmique (4e)",
    dependencies: []
  },
  "/Cours_Math/02_College/3eme/06_Algorithmique_Scratch.md": {
    domain: "algorithms",
    shortTitle: "Programmation (3e)",
    dependencies: ["/Cours_Math/02_College/4eme/05_Algorithmique_Scratch.md"]
  },
  "/Cours_Math/04_Post_Bac/BTS/04_BTS_04_Algebre_de_Boole_et_Logique.md": {
    domain: "algorithms",
    shortTitle: "Algèbre de Boole",
    dependencies: []
  },
  "/Cours_Math/04_Post_Bac/BTS/01_BTS_01_Graphes_et_Reseaux.md": {
    domain: "algorithms",
    shortTitle: "Graphes & Réseaux",
    dependencies: ["/Cours_Math/02_College/3eme/06_Algorithmique_Scratch.md"]
  },
  "/Cours_Math/04_Post_Bac/Ingenieur_IA_Data/02_Optimisation_Descente_Gradient.md": {
    domain: "algorithms",
    shortTitle: "Descente de Gradient",
    dependencies: ["/Cours_Math/04_Post_Bac/09_Calcul_Differentiel_Optimisation.md"]
  },
  "/Cours_Math/04_Post_Bac/Ingenieur_IA_Data/03_Fondements_Deep_Learning_Retropropagation.md": {
    domain: "algorithms",
    shortTitle: "Réseaux Neurones",
    dependencies: ["/Cours_Math/04_Post_Bac/Ingenieur_IA_Data/02_Optimisation_Descente_Gradient.md", "/Cours_Math/04_Post_Bac/02_Algebre_Lineaire.md"]
  }
};

export const DOMAIN_DETAILS = {
  numbers: {
    label: "Nombres & Arithmétique",
    color: "emerald",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textClass: "text-emerald-600 dark:text-emerald-400",
    borderClass: "border-emerald-500/20",
    y: 120
  },
  algebra: {
    label: "Algèbre & Équations",
    color: "amber",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    textClass: "text-amber-600 dark:text-amber-400",
    borderClass: "border-amber-500/20",
    y: 260
  },
  analysis: {
    label: "Analyse & Fonctions",
    color: "blue",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
    textClass: "text-blue-600 dark:text-blue-400",
    borderClass: "border-blue-500/20",
    y: 400
  },
  geometry: {
    label: "Géométrie & Vecteurs",
    color: "rose",
    bgClass: "bg-rose-500/10 dark:bg-rose-500/20",
    textClass: "text-rose-600 dark:text-rose-400",
    borderClass: "border-rose-500/20",
    y: 540
  },
  probability: {
    label: "Probabilités & Stats",
    color: "purple",
    bgClass: "bg-purple-500/10 dark:bg-purple-500/20",
    textClass: "text-purple-600 dark:text-purple-400",
    borderClass: "border-purple-500/20",
    y: 680
  },
  algorithms: {
    label: "Algorithmique & Logique",
    color: "indigo",
    bgClass: "bg-indigo-500/10 dark:bg-indigo-500/20",
    textClass: "text-indigo-600 dark:text-indigo-400",
    borderClass: "border-indigo-500/20",
    y: 820
  },
  general: {
    label: "Général",
    color: "slate",
    bgClass: "bg-slate-500/10 dark:bg-slate-500/20",
    textClass: "text-slate-600 dark:text-slate-400",
    borderClass: "border-slate-500/20",
    y: 950
  }
};

// X positions mapped to level and subLevel
export const X_BY_SUBLEVEL: Record<string, number> = {
  "PS": 50, "MS": 120, "GS": 190, // Maternelle
  "CP": 280, "CE1": 340, "CE2": 400, "CM1": 460, "CM2": 520, // Primaire
  "6eme": 620, "5eme": 690, "4eme": 760, "3eme": 830, // Collège
  "Seconde": 950, "Premiere": 1040, "Terminale": 1130, "Terminale_Complementaires": 1130, "Terminale_Expertes": 1180, // Lycée
  "Post_Bac": 1330 // Post Bac base
};

export const X_BY_LEVEL: Record<string, number> = {
  "Maternelle": 120,
  "Primaire": 400,
  "College": 720,
  "Lycee": 1050,
  "Post_Bac": 1350,
  "Autres": 1000,
  "Ressources": 1000
};

export function getXPosition(level: string, subLevel?: string): number {
  if (subLevel && X_BY_SUBLEVEL[subLevel] !== undefined) {
    return X_BY_SUBLEVEL[subLevel];
  }
  // Custom offsets for subLevels under Post_Bac
  if (level === "Post_Bac" && subLevel) {
    if (subLevel.includes("L1") || subLevel.includes("BTS") || subLevel.includes("CPGE")) {
      return 1300;
    }
    if (subLevel.includes("L2") || subLevel.includes("BUT")) {
      return 1380;
    }
    if (subLevel.includes("L3") || subLevel.includes("IA")) {
      return 1460;
    }
  }
  return X_BY_LEVEL[level] || 800;
}
