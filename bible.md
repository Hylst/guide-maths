# 📖 BIBLE ET RÈGLES DE L'AGENT IA

Ce document est le guide de survie et la SOP (Standard Operating Procedure) pour tout agent IA travaillant sur ce projet. Tu dois t'y référer à chaque session.

> **Ordre de lecture recommandé** : `AGENTS.md` (règles de code) → ce fichier (workflow) → `continue.md` (état actuel) → `todo.md` (tâches prioritaires) → `readme-dev.md` (architecture technique).

---

## 🎯 OBJET DE LA MISSION (Phase V5)

L'application couvre les mathématiques de la Maternelle au Post-Bac (**215 cours**, dont ~142 sous forme de composants TSX interactifs et ~73 sous forme de fiches Markdown).

Deux chantiers parallèles sont en cours :
1. **Enrichissement interactif (V5)** : compléter les cours TSX qui manquent de composants obligatoires (`InteractiveExercise`, `Quiz`, `Flashcard`, blocs `InfoBlock`).
2. **Graphe Pédagogique** : ajouter les 62 cours Post-Bac manquants dans `src/data/concept_links.ts` pour que leur fil d'Ariane (🌱 / 🌸) s'affiche dans `<CourseHeader>`.

---

## ⚙️ WORKFLOW OBLIGATOIRE — Enrichissement TSX (Action par Action)

1. **Audit** : Exécute `npx tsx scripts/check_completeness.js` pour obtenir la liste des cours incomplets.
2. **Choix** : Prends le premier fichier TSX dans la liste (ou celui demandé par l'utilisateur).
3. **Lecture** : Utilise `view_file` pour lire le composant TSX sélectionné. Identifie ce qui manque (blocs `InfoBlock`, `Quiz`, `Flashcard`, `InteractiveExercise`).
4. **Implémentation** : Enrichis le cours avec les composants `SharedUI`. Soigne la qualité mathématique selon le niveau (Primaire → Post-Bac). Ne supprime aucune section existante.
5. **Validation** : Lance `npm run lint` (ou `npm run build`). Corrige toute erreur TypeScript avant de passer à la suite.
6. **Bilan** : Confirme la réussite, demande l'autorisation de passer au fichier suivant.

## ⚙️ WORKFLOW OBLIGATOIRE — Graphe Pédagogique (concept_links.ts)

1. Vérifier que l'ID du cours existe dans `src/data/courses_index.json` (copier-coller, ne pas retaper).
2. Ajouter l'entrée dans le bon bloc de domaine dans `concept_links.ts` :
```typescript
"/Cours_Math/04_Post_Bac/XX_MonCours.md": {
  domain: "analysis",       // numbers | algebra | analysis | geometry | probability | algorithms | general
  shortTitle: "Titre court", // < 25 caractères
  dependencies: ["/Cours_Math/.../prerequis.md"]  // doit exister comme clé dans ce même objet
},
```
3. `node scripts/check_dependencies.js` → **0 dépendance pendante**
4. `npm run lint` → **0 erreur TS**
5. `git add src/data/concept_links.ts && git commit -m "feat: add pedigree lot [X]"`

---

## 🧩 LES COMPOSANTS UI OBLIGATOIRES (imports depuis `../components/SharedUI`)

| Composant | Usage | Obligatoire |
|---|---|---|
| `<CourseHeader>` | En-tête avec titre, niveau, durée, objectifs | ✅ |
| `<Section>` | Découpage principal du cours | ✅ |
| `<InfoBlock>` | Règles, théorèmes, définitions, faits amusants | ✅ |
| `<TipBanner>` | Astuces courtes, avertissements méthodologiques | ✅ |
| `<InteractiveExercise>` | Exercices résolus pas à pas | ✅ |
| `<Flashcard>` | Récapitulatif rapide recto/verso | ✅ |
| `<Quiz>` | QCM final avec correction et explication | ✅ |
| `<AccordionFAQ>` | Questions fréquentes (≥ 3 items) | ✅ |
| `<InteractiveChecklist>` | Checklist de validation des essentiels | ✅ |
| `<FormulaBox>` | Mise en valeur d'une formule clé | Recommandé |
| `<MathComponent math="..." />` | Rendu KaTeX inline sécurisé | Recommandé |

---

## 🚨 RÈGLES D'OR DU PROJET (FATAL ERRORS À ÉVITER)

### 1. Danger : Syntaxe LaTeX dans JSX
L'utilisation d'accolades libres `{ }` dans du texte mathématique à l'intérieur de balises JSX fait planter React et le parseur TSX avec l'erreur `Unexpected Token`.
```
❌ INTERDIT : <Flashcard front={<>C'est $\frac{5}{3}$ ?</>} />
✅ À FAIRE  : <Flashcard front={<>C'est {"$\\frac{5}{3}$"} ?</>} />
✅ MIEUX    : <Flashcard front={<>C'est <MathComponent math="\\frac{5}{3}" /> ?</>} />
```
**Règle** : Dès qu'une formule contient des accolades LaTeX (`\frac`, `a^{2}`, `\text{...}`), encadrer avec `{"  "}` ou utiliser `<MathComponent>`.

### 2. Le Typage Strict : Couleurs des Sections
Si la couleur que tu donnes n'est pas dans cette liste, le compilateur TypeScript échouera :
- **Couleurs valides** : `"slate" | "indigo" | "emerald" | "amber" | "rose" | "blue" | "purple"`
- **Ne jamais utiliser** : `"sky"`, `"red"`, `"green"`, `"orange"`, `"teal"`, etc.

### 3. Le Typage Strict : InfoBlock et TipBanner
- `<InfoBlock>` accepte uniquement : `"info" | "warning" | "definition" | "funfact" | "reminder"`
- `<TipBanner>` accepte uniquement : `"info" | "warning" | "success"`
> ⚠️ Pour indiquer une erreur courante, utiliser toujours `type="warning"`, jamais `"error"`.

### 4. Non-Destruction
N'efface pas les sections de cours existantes, **enrichis-les**. Vérifie toujours les balises de fin et l'état des accolades avant d'écrire le remplacement.

### 5. Fil d'Ariane — Jamais en Dur dans les Fiches
Les prérequis et successeurs d'un cours ne s'écrivent **JAMAIS** dans les fichiers TSX individuels. Tout passe par `src/data/concept_links.ts`. Voir section 4 de `AGENTS.md`.

### 6. Git — PowerShell ne supporte pas `&&`
Sur Windows/PowerShell, ne pas chaîner les commandes avec `&&`. Exécuter séquentiellement :
```powershell
git add src/data/concept_links.ts
git commit -m "feat: ..."
git push origin main
```

---

## 📊 ÉTAT DU PROJET (Juin 2026)

| Indicateur | Valeur |
|---|---|
| Total cours | 215 (index) / ~142 TSX interactifs |
| Cours TSX incomplets (audit) | ~21 restants (~85% complets) |
| Nœuds dans concept_links.ts | 64 / 215 |
| Cours Post-Bac sans fil d'Ariane | 62 (voir `todo.md`, lots A–I) |
| Dépendances pendantes | 0 ✅ |
| Build TypeScript | OK ✅ |
| Remote Git | `git@github.com:Hylst/guide-maths.git` (branche `main`) |
