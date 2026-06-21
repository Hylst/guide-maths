# Guide de Reprise Rapide (continue.md)

**⚠️ ATTENTION NOUVEL AGENT IA : Lisez immédiatement `bible.md`, `AGENTS.md`, `rodo.md` et `readme-dev.md` avant toute intervention.**

Ce fichier offre un point d'entrée pour un nouvel agent IA ou un développeur arrivant dans un nouveau contexte de discussion.

---

## 1. Contexte du Projet

Nous développons un **Guide Mathématiques Interactif**, couvrant le programme français de la Maternelle (PS) jusqu'au Post-Bac (Licence, BUT, CPGE, Ingénieur).

L'application est une **SPA React + Vite + TypeScript** déployée en PWA. Elle contient **215 cours** répartis dans deux formats coexistants :
- **Composants TSX** (`/src/courses/`) : cours enrichis, interactifs (Quiz, SVG, Flashcards…)
- **Fiches Markdown** (`/Cours_Math/`) : cours affichés via `react-markdown` + `rehype-katex`

---

## 2. Architecture Actuelle (fichiers clés)

| Fichier | Rôle |
|---|---|
| `src/App.tsx` | Layout principal, routage, états globaux |
| `src/components/SharedUI.tsx` | **Bibliothèque UI obligatoire** (Section, InfoBlock, Quiz, Flashcard…) |
| `src/components/CourseContent.tsx` | Rendu dynamique des cours (TSX et MD) |
| `src/components/ConceptGraph.tsx` | Graphe conceptuel SVG interactif (`/graph`) |
| `src/data/concept_links.ts` | **Graphe pédagogique centralisé** — NE PAS dupliquer dans les fiches |
| `src/data/courses_index.json` | Index auto-généré par `scripts/generate_index.ts` |
| `src/courses/CourseRegistry.tsx` | Registre des composants TSX avec lazy loading |
| `src/hooks/useProgress.ts` | XP, badges, streaks (localStorage) |
| `src/hooks/useLocalAccount.ts` | Compte local, notes, avatar, import/export |
| `scripts/check_completeness.js` | Audit des cours incomplets |
| `scripts/generate_index.ts` | Régénère `courses_index.json` depuis le filesystem |

---

## 3. Règles de Code Absolues

### 3a. Formules LaTeX dans JSX
Les accolades `{}` dans une formule math interrompent le compilateur TSX.
```tsx
// ❌ INTERDIT
<Flashcard front={<>L'inverse de $\frac{3}{5}$</>} />

// ✅ CORRECT
<Flashcard front={<>L'inverse de {"$\\frac{3}{5}$"}</>} />
// ou mieux :
<Flashcard front={<><MathComponent math="\\frac{3}{5}" /></>} />
```

### 3b. Types stricts SharedUI
- `color` dans `<Section>` : `"slate" | "indigo" | "emerald" | "amber" | "rose" | "blue" | "purple"`
- `type` dans `<InfoBlock>` : `"info" | "warning" | "definition" | "funfact" | "reminder"`
- `type` dans `<TipBanner>` : `"info" | "warning" | "success"`

### 3c. Liens de Cours (Fil d'Ariane)
**Jamais** écrits dans les fiches individuelles. Tout passe par `concept_links.ts`.
Les cours sont enveloppés dans `CourseContext.Provider` (dans `CourseContent.tsx`).

---

## 4. Mission Actuelle : Complétion du Graphe Pédagogique

### État du graphe (juin 2026)
- **64 nœuds** définis dans `concept_links.ts`
- **0 dépendance pendante** (intégrité vérifiée)
- **62 cours Post-Bac** non encore raccordés au graphe

### Prochain travail prioritaire
👉 **Voir `rodo.md`** pour les 9 lots de cours à intégrer dans `concept_links.ts` avec leurs dépendances exactes.

### Commandes de diagnostic
```bash
# Lister les IDs du graphe sans correspondance dans l'index
node scripts/find_missing_links.js

# Vérifier qu'aucune dépendance ne pointe vers un nœud inexistant
node scripts/check_dependencies.js

# Lister les cours TSX sans composants interactifs requis
npx tsx scripts/check_completeness.js

# Valider la compilation TypeScript
npm run lint

# Build de production (inclut lint)
npm run build
```

---

## 5. Comment Ajouter un Cours au Graphe (workflow exact)

1. **Vérifier** que l'ID du cours existe bien dans `courses_index.json`
2. **Ajouter l'entrée** dans `concept_links.ts` dans la section de domaine appropriée :
```typescript
"/Cours_Math/04_Post_Bac/XX_MonCours.md": {
  domain: "analysis",       // "numbers" | "algebra" | "analysis" | "geometry" | "probability" | "algorithms" | "general"
  shortTitle: "Mon Titre",  // Court (< 25 caractères)
  dependencies: ["/Cours_Math/.../prerequis.md"]  // IDs déjà dans concept_links
},
```
3. **Valider** : `node scripts/check_dependencies.js` → doit afficher **0 dangling**
4. **Compiler** : `npm run lint` → 0 erreur
5. **Committer** : `git add src/data/concept_links.ts && git commit -m "feat: add pedigree for [lot X]"`

---

## 6. Déploiement

- Dev local : `npm run dev` → [http://localhost:3000/guide-maths](http://localhost:3000/guide-maths)
- Build : `npm run build` (lance lint + génère `dist/`)
- Remote : `git push origin main` → déploiement GitHub Pages automatique (si CI configurée)
- Branch principale : `main`

**👉 POUR LES RÈGLES DE STYLE COMPLÈTES, RÉFÉREZ-VOUS AU FICHIER `bible.md`.**
**👉 POUR LE PLAN DE TRAVAIL PRIORISÉ, VOIR `rodo.md`.**
