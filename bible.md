# 📖 BIBLE ET RÈGLES DE L'AGENT IA

Ce document est le guide de survie et la SOP (Standard Operating Procedure) pour tout agent IA travaillant sur ce projet. Tu dois t'y référer à chaque RUN.

## 🎯 OBJET DE LA MISSION (Phase V5)
La majeure partie des cours (fichiers TSX dans `src/courses/`) ont été créés, mais ~60 d'entre eux sont "pauvres". Ils manquent de composants interactifs (`InteractiveExercise`, `Quiz`, `Flashcard`).
Ton but est de prendre ces fichiers et de les transformer en excellents supports pédagogiques interactifs.

## ⚙️ WORKFLOW OBLIGATOIRE (Action par Action)
Dès que l'utilisateur te demande d'avancer :
1. **Audit** : Exécute `npx tsx scripts/check_completeness.js`. 
2. **Choix** : Prends le premier fichier TSX qui ressort dans la liste.
3. **Lecture du code source** : Utilise `view_file` pour lire et analyser le composant TSX sélectionné. Cherche où le contenu peut être enrichi ou restructuré avec `SharedUI`.
4. **Implémentation** : Réécris ou ajoute les sections au cours à l'aide de l'outil `edit_file` / `multi_edit_file`. Rédige les exercices de la plus haute qualité possible de tes connaissances en mathématiques, en ciblant bien le niveau supposé du cours (Primaire, Collège, Lycée, Post-Bac).
5. **Validation absolue** : Lance toujours `npm run build` (ou `npm run lint`). TS s'assurera qu'il n'y a pas d'erreur de typage avec tes composants ou tes formules LaTeX brisées.
6. **Bilan** : Confirme la réussite à l'utilisateur, demande l'autorisation de passer au fichier suivant.

## 🧩 LES COMPOSANTS UI OBLIGATOIRES
Tous les imports doivent venir de `../components/SharedUI`. Utilise ces composants aux bons endroits :

- `<CourseHeader>` : Titre du cours.
- `<Section>` : Découpage principal du cours.
- `<InfoBlock>` : Pour les règles, théorèmes, définitions.
- `<TipBanner>` : Pour les astuces ou les avertissements très courts.
- `<InteractiveExercise>` : Pour tout le bloc "Exercices".
- `<Flashcard>` : Pour récapituler en fin de partie ou de cours (Synthèse).
- `<Quiz>` : Le test de connaissances final du chapitre.

## 🚨 RÈGLES D'OR DU PROJET (FATAL ERRORS À ÉVITER)

### 1. Danger : Syntaxe LaTeX dans JSX
L'utilisation d'accolades libres `{ }` dans du texte mathématique à l'intérieur de balises JSX fait planter React et le parseur TSX avec l'erreur `Unexpected Token`.
❌ **INTERDIT** : `<Flashcard front={<>C'est $\frac{5}{3}$ ?</>} />`
✅ **À FAIRE** : `<Flashcard front={<>C'est {"$\\frac{5}{3}$"} ?</>} />`
**Règle** : Dès qu'une formule (`$...$`) est passée comme contenu ou prop JSX, et qu'elle contient des accolades pour LaTeX (ex: `\frac`, `a^{2}`), encadre la chaîne avec des guillemets `{"  "}`.

### 2. Le Typage Strict : Les Couleurs Tailwind
Si la couleur que tu donnes n'est pas dans cette liste, le compilateur TypeScript échouera :
- **Couleurs valides** : `"slate" | "indigo" | "emerald" | "amber" | "rose" | "blue" | "purple"`
- **Ne jamais utiliser** : `"sky"`, `"red"`, `"green"`, `"orange"`, `"teal"`, etc.

### 3. Le Typage Strict : InfoBlock et TipBanner
Les alertes pédagogiques n'acceptent pas de type `error` ou `success` partout.
- `<InfoBlock>` accepte uniquement : `"info" | "warning" | "definition" | "funfact" | "reminder"`
- `<TipBanner>` accepte uniquement : `"info" | "warning" | "success"`
> ⚠️ **Astuce** : Pour indiquer une erreur commune aux élèves, utilise toujours le `type="warning"` (et la couleur `amber`), n'utilise jamais `"error"`.

### 4. Non-Destruction
N'efface pas les sections de cours existantes, **enrichis-les**. Vérifie toujours les balises de fin et l'état des accolades avant d'écrire le remplacement ! Ne perds pas la structuration du fichier.
