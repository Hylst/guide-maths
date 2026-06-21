# 🗺️ Feuille de Route — Guide Mathématiques Interactif (rodo.md)

> **But de ce fichier** : Servir de journal de bord priorisé pour tout développeur ou agent IA reprenant le projet.
> Il est complémentaire à `continue.md` (contexte rapide) et `readme-dev.md` (architecture technique).
> Dernière mise à jour : 2026-06-21

---

## ✅ Réalisé récemment (Sprint actuel)

- [x] Fil d'Ariane Pédagogique (Concept Pedigree) : `CourseContext` + `CourseHeader` + `concept_links.ts`
- [x] Graphe conceptuel interactif SVG (`ConceptGraph.tsx`)
- [x] Système de compte local + paramètres (`useLocalAccount.ts`, `Settings.tsx`)
- [x] Gamification : XP, badges, séries d'études (`useProgress.ts`, `Rewards.tsx`)
- [x] Audit d'intégrité du graphe : 0 dépendance pendante sur les 64 nœuds existants
- [x] Push Git : commit `75406cd` sur `main`

---

## 🔴 PRIORITÉ 1 — Compléter `concept_links.ts` (graphe pédagogique)

**État actuel** : 64 nœuds sur 215 cours couverts. **62 cours Post-Bac** n'ont pas de fil d'Ariane.
**Risque si non fait** : Aucun crash, mais l'UX est dégradée pour 30 % du catalogue.
**Règle absolue** : Ajouter uniquement des IDs qui existent dans `courses_index.json`. Ne jamais inventer un chemin.

### Script de vérification avant/après chaque lot :
```bash
node scripts/check_dependencies.js   # vérifie les dépendances pendantes
node scripts/find_missing_links.js   # liste les IDs dans l'index mais absents du graphe
```

### Lot A — Tronc commun Post-Bac (Analyse L1/L2, cours numérotés)

| Fichier ID | shortTitle | domain | dependencies (IDs) |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/14_Analyse_L1_Limites_Continuite.md` | Limites L1 | analysis | `/Cours_Math/03_Lycee/Terminale/01_Limites_et_Continuite.md` |
| `/Cours_Math/04_Post_Bac/15_Analyse_L1_Derivabilite_DL.md` | Dérivabilité L1 | analysis | `14_Analyse_L1_Limites_Continuite.md` |
| `/Cours_Math/04_Post_Bac/25_Analyse_L1_Suites_Numeriques_Reelles.md` | Suites L1 | analysis | `/Cours_Math/03_Lycee/Terminale/05_Suites_et_Recurrence.md` |
| `/Cours_Math/04_Post_Bac/16_Analyse_L2_Fonctions_Plusieurs_Variables.md` | Fonctions n-var | analysis | `15_Analyse_L1_Derivabilite_DL.md`, `09_Calcul_Differentiel_Optimisation.md` |
| `/Cours_Math/04_Post_Bac/05_Espaces_Euclidiens.md` | Espaces Euclidiens | algebra | `02_Algebre_Lineaire.md` |
| `/Cours_Math/04_Post_Bac/07_Probabilites_Discretes.md` | Proba Discrètes | probability | `/Cours_Math/03_Lycee/Terminale/07_Loi_Binomiale_et_Loi_des_Grands_Nombres.md` |
| `/Cours_Math/04_Post_Bac/17_Probabilites_Continues.md` | Proba Continues | probability | `07_Probabilites_Discretes.md`, `06_Integration_et_Primitives.md` |
| `/Cours_Math/04_Post_Bac/18_Probabilites_Vecteurs_Aleatoires.md` | Vecteurs Aléatoires | probability | `17_Probabilites_Continues.md` |
| `/Cours_Math/04_Post_Bac/10_Calcul_Stochastique.md` | Calcul Stochastique | probability | `18_Probabilites_Vecteurs_Aleatoires.md` |

### Lot B — Algèbre L1/L2

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/Algebre_L1_L2/01_Arithmetique_Superieure.md` | Arithmétique Sup | numbers | `/Cours_Math/04_Post_Bac/CPGE/01_CPGE_01_Structures_Algebriques.md` |
| `/Cours_Math/04_Post_Bac/Algebre_L1_L2/02_Structures_Algebriques.md` | Groupes/Anneaux | algebra | `Algebre_L1_L2/01_Arithmetique_Superieure.md` |
| `/Cours_Math/04_Post_Bac/Algebre_L1_L2/03_Espaces_Vectoriels_Rang.md` | EV & Théorème Rang | algebra | `02_Algebre_Lineaire.md`, `Algebre_L1_L2/02_Structures_Algebriques.md` |

### Lot C — CPGE (MP/PC/PSI)

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/CPGE/02_CPGE_02_Polynomes.md` | Polynômes CPGE | algebra | `CPGE/01_CPGE_01_Structures_Algebriques.md` |
| `/Cours_Math/04_Post_Bac/CPGE/03_CPGE_03_Series_De_Fourier.md` | Séries de Fourier | analysis | `03_Series_Numeriques.md`, `CPGE/02_CPGE_02_Polynomes.md` |

### Lot D — Sup_CPGE (Classe BL)

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/Sup_CPGE/Course_CPGE_BL_Proba.md` | Proba BL | probability | `07_Probabilites_Discretes.md` |
| `/Cours_Math/04_Post_Bac/Sup_CPGE/Course_CPGE_BL_AlgebreLineaire.md` | Algèbre BL | algebra | `02_Algebre_Lineaire.md` |
| `/Cours_Math/04_Post_Bac/Sup_CPGE/Course_CPGE_BL_Optimisation.md` | Optimisation BL | analysis | `09_Calcul_Differentiel_Optimisation.md` |

### Lot E — CPGE_ECG (Économique)

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/12_CPGE_ECG_Algebre_Financiere.md` | Algèbre Financière | numbers | `/Cours_Math/03_Lycee/Terminale/05_Suites_et_Recurrence.md` |
| `/Cours_Math/04_Post_Bac/19_CPGE_ECG_Suites_et_Series_Economie.md` | Suites Éco | analysis | `12_CPGE_ECG_Algebre_Financiere.md`, `03_Series_Numeriques.md` |
| `/Cours_Math/04_Post_Bac/21_CPGE_ECG_Optimisation_Sous_Contrainte.md` | Optimisation Éco | analysis | `09_Calcul_Differentiel_Optimisation.md`, `19_CPGE_ECG_Suites_et_Series_Economie.md` |

### Lot F — BTS (Branches complémentaires)

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/BTS/03_BTS_03_Traitement_Signal.md` | Traitement Signal | analysis | `BTS_Industriel/03_Fourier.md` |
| `/Cours_Math/04_Post_Bac/BTS_CG/01_Suites_et_Finance_CG.md` | Finance CG | numbers | `/Cours_Math/03_Lycee/Terminale/05_Suites_et_Recurrence.md` |
| `/Cours_Math/04_Post_Bac/BTS_CG/02_Ajustement_Lineaire_Previsions.md` | Ajustement Linéaire | probability | `BTS/02_BTS_02_Statistiques_Inferentielles.md` |
| `/Cours_Math/04_Post_Bac/BTS_CG/03_Lois_Probabilites_Gestion.md` | Lois Proba Gestion | probability | `BTS_CG/01_Suites_et_Finance_CG.md` |
| `/Cours_Math/04_Post_Bac/BTS_Industriel/01_Vibrations.md` | Vibrations | analysis | `04_Equations_Differentielles.md` |
| `/Cours_Math/04_Post_Bac/BTS_Industriel/02_Resonance.md` | Résonance | analysis | `BTS_Industriel/01_Vibrations.md` |
| `/Cours_Math/04_Post_Bac/BTS_Industriel/03_Fourier.md` | Séries de Fourier BTS | analysis | `BTS_Industriel/02_Resonance.md` |
| `/Cours_Math/04_Post_Bac/BTS_Tertiaire/01_Suites_Finance.md` | Suites Finance Ter | numbers | `/Cours_Math/03_Lycee/Terminale/05_Suites_et_Recurrence.md` |
| `/Cours_Math/04_Post_Bac/BTS_Tertiaire/02_Estimation_Echantillonnage.md` | Échantillonnage | probability | `BTS/02_BTS_02_Statistiques_Inferentielles.md` |
| `/Cours_Math/04_Post_Bac/BTS_Tertiaire/03_Simplexe_Optimisation.md` | Simplexe | algorithms | `BTS/01_BTS_01_Graphes_et_Reseaux.md` |

### Lot G — BUT (Data, GEA, GEII, Tertiaire, Industriel)

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/11_BUT_SD_Statistiques_Descriptives.md` | Stats Descriptives | probability | `/Cours_Math/03_Lycee/Terminale/11_Probabilites_et_Lois_Continues.md` |
| `/Cours_Math/04_Post_Bac/20_BUT_SD_Statistique_Inference_Estimation.md` | Stats Inférence SD | probability | `11_BUT_SD_Statistiques_Descriptives.md` |
| `/Cours_Math/04_Post_Bac/24_BUT_SD_Regression_Lineaire_Simple.md` | Régression Lin. | probability | `20_BUT_SD_Statistique_Inference_Estimation.md` |
| `/Cours_Math/04_Post_Bac/26_BUT_SD_Analyse_en_Composantes_Principales_ACP.md` | ACP | probability | `24_BUT_SD_Regression_Lineaire_Simple.md`, `02_Algebre_Lineaire.md` |
| `/Cours_Math/04_Post_Bac/BUT_GEA/01_Maths_Financieres_Gestion.md` | Maths Financières | numbers | `BTS_Tertiaire/01_Suites_Finance.md` |
| `/Cours_Math/04_Post_Bac/BUT_GEA/02_Recherche_Operationnelle_Simplexe.md` | Recherche Opé. | algorithms | `BTS_Tertiaire/03_Simplexe_Optimisation.md` |
| `/Cours_Math/04_Post_Bac/BUT_GEA/03_Statistiques_Inference_Tests.md` | Stats Tests GEA | probability | `20_BUT_SD_Statistique_Inference_Estimation.md` |
| `/Cours_Math/04_Post_Bac/BUT_GEII/01_Impedance_Complexe_et_Fourier.md` | Impédance & Fourier | analysis | `01_Nombres_Complexes.md`, `BTS_Industriel/03_Fourier.md` |
| `/Cours_Math/04_Post_Bac/BUT_GEII/02_Transformee_en_Z_et_Filtres.md` | Transformée en Z | analysis | `BUT_GEII/01_Impedance_Complexe_et_Fourier.md` |
| `/Cours_Math/04_Post_Bac/BUT_GEII/03_Laplace_et_Systemes_Asservis.md` | Laplace & Asservis | analysis | `22_Ingenieur_Transformee_de_Laplace.md` |
| `/Cours_Math/04_Post_Bac/BUT_Tertiaire/01_Ordonnancement_PERT.md` | Ordonnancement PERT | algorithms | `BTS/01_BTS_01_Graphes_et_Reseaux.md` |
| `/Cours_Math/04_Post_Bac/BUT_Tertiaire/02_Files_Attente.md` | Files d'Attente | probability | `07_Probabilites_Discretes.md` |
| `/Cours_Math/04_Post_Bac/BUT_Tertiaire/03_Theorie_Decision.md` | Théorie Décision | algorithms | `BUT_Tertiaire/01_Ordonnancement_PERT.md` |

### Lot H — Ingénieur et Prépa Ingénieur

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/13_Ingenieur_Methodes_Numeriques.md` | Méthodes Numériques | analysis | `09_Calcul_Differentiel_Optimisation.md` |
| `/Cours_Math/04_Post_Bac/22_Ingenieur_Transformee_de_Laplace.md` | Transformée Laplace | analysis | `04_Equations_Differentielles.md` |
| `/Cours_Math/04_Post_Bac/23_Ingenieur_Matrices_et_Elements_Finis.md` | Matrices & EF | algebra | `02_Algebre_Lineaire.md`, `22_Ingenieur_Transformee_de_Laplace.md` |
| `/Cours_Math/04_Post_Bac/27_Ingenieur_Analyse_de_Fourier_et_Signal.md` | Fourier & Signal | analysis | `CPGE/03_CPGE_03_Series_De_Fourier.md` |

### Lot I — Sup_Université (Licences spécialisées)

| Fichier ID | shortTitle | domain | dependencies |
|---|---|---|---|
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_Maths_Groupes.md` | Groupes | algebra | `Algebre_L1_L2/02_Structures_Algebriques.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_Maths_TopologieMetric.md` | Topologie Métrique | analysis | `08_Topologie.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_Maths_AlgebreBilinea.md` | Formes Bilinéaires | algebra | `05_Espaces_Euclidiens.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_MIASHS_Jeux.md` | Théorie des Jeux | algorithms | `21_CPGE_ECG_Optimisation_Sous_Contrainte.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_MIASHS_Regression.md` | Régression MIASHS | probability | `24_BUT_SD_Regression_Lineaire_Simple.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_MIASHS_MarkovChain.md` | Chaînes de Markov | probability | `10_Calcul_Stochastique.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Bio_Epidemio.md` | Épidémiologie | probability | `17_Probabilites_Continues.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Bio_LotkaVolterra.md` | Lotka-Volterra | analysis | `04_Equations_Differentielles.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Bio_MichaelisMenten.md` | Michaelis-Menten | analysis | `Sup_Bio/Course_Sup_Bio_LotkaVolterra.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Eco_Solow.md` | Modèle Solow | analysis | `21_CPGE_ECG_Optimisation_Sous_Contrainte.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Eco_Optimisation.md` | Optimisation Éco | analysis | `Sup_Eco/Course_Sup_Eco_Solow.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Eco_GameTheory.md` | Théorie des Jeux Éco | algorithms | `Sup_Universite/Course_Licence_MIASHS_Jeux.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Finance_BlackScholes.md` | Black-Scholes | probability | `10_Calcul_Stochastique.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Finance_Markowitz.md` | Markowitz | probability | `18_Probabilites_Vecteurs_Aleatoires.md` |
| `/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Finance_CoxRoss.md` | Cox-Ross-Rubinstein | probability | `Sup_Finance/Course_Sup_Finance_BlackScholes.md` |

---

## 🟡 PRIORITÉ 2 — Enrichissement interactif des cours incomplets

**État** : ~85 % des cours ont tous leurs composants interactifs requis.
**Commande d'audit** : `npx tsx scripts/check_completeness.js`

Familles à prioriser :
1. BTS (Traitement Signal, BTS_CG complet)
2. CPGE (Polynômes, Séries de Fourier)
3. Maternelle GS (Quantités, Formes, Repères Spatiaux) — fichiers TSX manquants

---

## 🟢 PRIORITÉ 3 — Améliorations UX / Fonctionnalités

- [ ] **Filtres dans le menu latéral** par domaine (Géométrie, Analyse, Probabilités…)
- [ ] **Mode Révision Express** : parcours automatique des fiches flashcard de tous les cours d'un niveau
- [ ] **Partage de progression** : export URL avec état encodé (sans serveur)
- [ ] **Accessibilité (a11y)** : labels ARIA sur tous les composants interactifs SVG
- [ ] **Thème Clair perfectionné** : quelques contrastes insuffisants dans les `Section` en mode clair

---

## 🔵 PRIORITÉ 4 — Infrastructure & Documentation

- [ ] Mettre à jour `changelog.md` après chaque sprint
- [ ] Versionner `courses_index.json` dans Git (actuellement régénéré au build)
- [ ] Ajouter `rodo.md` au `.gitignore` si confidentiel OU le garder comme doc publique
- [ ] Configurer GitHub Actions pour lint + build automatique sur chaque PR

---

## ⚠️ Règles Anti-Régression (à vérifier avant tout commit)

1. `node scripts/audit_dangling.js` → doit afficher **0 dépendance pendante**
2. `npm run lint` → doit passer **sans erreur TypeScript**
3. Aucun ID inventé dans `concept_links.ts` : toujours vérifier dans `courses_index.json` que le chemin existe
4. Jamais de doublon de clé dans `concept_links.ts` (grep : `grep -c "Cours_Math" concept_links.ts` doit être cohérent)
5. Si un cours est ajouté/renommé côté filesystem, relancer `npx tsx scripts/generate_index.ts` pour régénérer l'index
