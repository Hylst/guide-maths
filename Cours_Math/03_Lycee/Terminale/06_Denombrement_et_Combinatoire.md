---
title: 'Chapitre 6 : Dénombrement et Combinatoire'
level: Lycee
subLevel: Terminale
order: 6
---
# Chapitre 6 : Dénombrement et Combinatoire

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Probabilités simples, factorielles (découverte).  
**Objectifs** : 
- Maîtriser le principe multiplicatif (p-uplets).
- Calculer le nombre de permutations d'un ensemble fini.
- Calculer et interpréter les combinaisons (coefficients binomiaux).
- Utiliser le triangle de Pascal.
- Résoudre des problèmes de dénombrement concrets.

---

## Activités de découverte

**Activité : Le coffre-fort et le Loto**
1. Tu as un cadenas à 3 chiffres (de 0 à 9). Combien de codes existe-t-il ? Facile : $10 \times 10 \times 10 = 1000$. L'ordre compte, et on peut répéter les chiffres.
2. Tu veux choisir une équipe de 3 délégués dans une classe de 30. Est-ce qu'on fait $30 \times 29 \times 28$ ? Pas tout à fait, car choisir Alice puis Bob, c'est la même équipe que Bob puis Alice. L'ordre ne compte plus !
Le **dénombrement** est l'art de compter précisément sans se tromper, que l'ordre compte ou pas.

---

## Rappels

Avant de commencer, révise :
- **Factorielle $n!$** : $n! = n \times (n-1) \times ... \times 1$. Par convention, $0! = 1$.
- **Ensemble fini** : Un ensemble dont on peut compter les éléments.

---

## Explications et Théorie

### 1. p-uplets et Permutations
- **p-uplets** : Dans un ensemble à $n$ éléments, le nombre de listes de $p$ éléments (avec répétition possible et ordre important) est **$n^p$**.
- **Permutations** : Le nombre de façons d'ordonner $n$ objets différents est **$n!$**. 
  *Exemple : il y a $5! = 120$ façons de ranger 5 livres sur une étagère.*

### 2. Les Combinaisons (Coefficients binomiaux)
Choisir $k$ éléments parmi $n$, **sans tenir compte de l'ordre** et sans répétition. On note $\binom{n}{k}$ (se lit "$k$ parmi $n$").
$$\binom{n}{k} = \frac{n!}{k!(n-k)!}$$

### 3. Propriétés des coefficients binomiaux
- Symétrie : $\binom{n}{k} = \binom{n}{n-k}$.
- Cas particuliers : $\binom{n}{0} = 1$, $\binom{n}{1} = n$, $\binom{n}{n} = 1$.
- **Relation de Pascal** : $\binom{n}{k} + \binom{n}{k+1} = \binom{n+1}{k+1}$.

### 4. Le Triangle de Pascal
C'est une méthode de construction visuelle des coefficients binomiaux ligne par ligne. Chaque nombre est la somme des deux nombres situés juste au-dessus.

---

## Exples Pratiques (pas-à-pas)

### Calculer le nombre de tirages au Loto (version simplifiée)
On choisit 5 numéros parmi 50.
1. L'ordre ne compte pas $\implies$ Combinaisons.
2. Calcul : $\binom{50}{5} = \frac{50 \times 49 \times 48 \times 47 \times 46}{5 \times 4 \times 3 \times 2 \times 1} = \mathbf{2\,118\,760}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Calcule $5!$ et $\binom{10}{2}$.

**🔵 Exercice 2 (Moyen)**
Un mot de passe est composé de 4 lettres minuscules (de a à z). Combien de mots de passe différents peut-on créer ?

**🟠 Exercice 3 (Difficile)**
Dans un club de 10 personnes, on doit choisir un bureau composé d'un Président, d'un Secrétaire et d'un Trésorier (tous différents). 
De combien de façons peut-on former ce bureau ? *(Indice : l'ordre des rôles compte !)*

---

## Exercices corrigés

**Exercice 1 :**
$5! = 5 \times 4 \times 3 \times 2 \times 1 = \mathbf{120}$.
$\binom{10}{2} = \frac{10 \times 9}{2 \times 1} = \mathbf{45}$.

**Exercice 2 :**
Il y a 26 choix pour chaque position. C'est un 4-uplet.
Nombre = $26^4 = \mathbf{456\,976}$.

**Exercice 3 :**
On choisit le Président (10 choix), puis le Secrétaire (9 choix restants), puis le Trésorier (8 choix).
Nombre = $10 \times 9 \times 8 = \mathbf{720}$.
*(En mathématiques, on appelle cela un Arrangement).*

---

## 📝 Mini-Quiz

1. $0!$ est égal à :
   - 0
   - 1
   - Erreur

2. $\binom{n}{k}$ représente un choix où l'ordre :
   - Est primordial
   - N'a pas d'importance
   - Est aléatoire

3. Dans le triangle de Pascal, la ligne 3 commence par :
   - 1, 2, 1
   - 1, 3, 3, 1
   - 3, 2, 1

**Réponses :** 1. 1 | 2. N'a pas d'importance | 3. 1, 3, 3, 1

---

## Foire Aux Questions (FAQ)

**Q : Pourquoi utilise-t-on les factorielles au dénominateur des combinaisons ?**
R : Parce que si tu choisis $k$ objets, il y a $k!$ façons de les mélanger entre eux. Puisque l'ordre n'est pas important dans une combinaison, on doit diviser par $k!$ pour "éliminer" tous ces doublons qui correspondent aux mêmes objets rangés différemment.

---

## 💡 Le savais-tu ?
Le dénombrement est utilisé en informatique pour calculer la solidité des clés de cryptage. Une clé de 256 bits possède $2^{256}$ combinaisons possibles. C'est un nombre tellement gigantesque ($10^{77}$) qu'il y a plus de combinaisons que d'atomes dans l'univers connu ! C'est ce qui rend tes transactions bancaires sécurisées.
