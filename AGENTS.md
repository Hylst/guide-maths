# Directives du Projet (Maths Applet)

Ce fichier `AGENTS.md` contient les règles spécifiques au projet pour empêcher les erreurs fréquentes lors de la génération ou la modification des cours de mathématiques et des composants UI.

## 1. Syntaxe LaTeX dans les fichiers TSX / React
Le projet utilise `rehype-katex` et `react-markdown`. Quand tu insères du code avec la syntaxe `$` ou `$$` directement dans du code React (ex: les `props` d'un composant comme `<Flashcard>` ou `<InteractiveExercise>`), tu dois IMPÉRATIVEMENT prendre des précautions si la chaîne contient des accolades `{` et `}`.

**Règle d'or absolue** : les formules contenant des accolades comme `\frac{...}{...}`, `a^{m+p}`, `\text{...}` dans des éléments JSX doivent **absolument être encadrées de guillemets** pour que React ne les interprète pas comme des variables/du code JS.

❌ **Code Interdit (provoque une erreur fatale `Unexpected token` ou `Cannot find name 'm'`) :**
```tsx
<Flashcard 
  front={<>L'inverse de $\frac{3}{5}$ est-il $-\frac{3}{5}$ ?</>}
  back={<>C'est $\frac{5}{3}$ et $a^{m+p}$ !</>}
/>
```

✅ **Code Valide (encadré de `{" ` et ` "}`) :**
```tsx
<Flashcard 
  front={<>L'inverse de {"$\\frac{3}{5}$"} est-il {"$-\\frac{3}{5}$"} ?</>}
  back={<>C'est {"$\\frac{5}{3}$"} et {"$a^{m+p}$"} !</>}
/>
```
Si tu n'es pas dans JSX mais dans une `string` brute ou un block code sans accolades, c'est ok. Dans le doute, encadre toujours ta formule entre `{""}`.

## 2. Couleurs et Types des Composants UI
Certains de nos composants abstraits acceptent des variables très strictes identifiées par un typage TypeScript fort.

**`color` (pour les `Section` entre autres) :**
- Valeurs Autorisées : `"slate" | "indigo" | "emerald" | "amber" | "rose" | "blue" | "purple"`
- ❌ **Interdit** : `"sky"`, `"red"`, `"green"`, `"teal"`... Ne cherche pas à utiliser n'importe quelle couleur Tailwind CSS.

**`type` (pour les blocs d'information) :**
- **Pour `<InfoBlock>`** : Valeurs Autorisées Exactes : `"info" | "warning" | "definition" | "funfact" | "reminder"`
  ❌ **Interdit** : `"success"`, `"error"`. 
- **Pour `<TipBanner>`** : Valeurs Autorisées Exactes : `"info" | "warning" | "success"`
  ❌ **Interdit** : `"error"`, `"reminder"`. 
Dans les deux cas, utiliser `"warning"` au lieu de `"error"`.

## 3. Linter TypeScript (Obligatoire)
La commande de build `npm run build` lance désormais `npm run lint` (`tsc --noEmit`).
Si tu crées ou modifies un code, le build échouera de lui-même. C'est normal. Corrige systématiquement l'erreur de compilation qui a été indiquée dans la console. 

**Erreurs TS Classiques à guetter :**
- `Cannot find name 'AM'` => Tu as oublié d'encadrer de guillemets `\frac{AM}{5}` => Devient `{"\\frac{AM}{5}"}`.
- `Type '"error"' is not assignable to type...` => Remplacer par `"warning"`.
- `Unexpected token` avec `{` => Encadre ton bloc mathématique avec `{" ... "}`.
