---
title: 'Chapitre 8 : Variables Aléatoires'
level: Lycee
subLevel: Premiere
order: 8
---
# Chapitre 8 : Variables Aléatoires

**Niveau** : Première (Spécialité Mathématiques)  
**Prérequis** : Probabilités conditionnelles.  
**Objectifs** : 
- Définir une variable aléatoire réelle sur un univers fini.
- Déterminer la loi de probabilité d'une variable aléatoire.
- Calculer et interpréter l'espérance, la variance et l'écart-type d'une variable aléatoire.
- Utiliser la variable aléatoire pour modéliser des gains ou des pertes (jeux).

---

## Activités de découverte

**Activité : Le jeu de la fête foraine**
Tu lances un dé. 
- Si tu fais 6, tu gagnes 10€.
- Si tu fais 1 ou 2, tu perds 5€.
- Sinon, tu ne gagnes rien.
Combien peux-tu espérer gagner en moyenne si tu joues des milliers de fois ? 
Pour répondre, on associe chaque résultat du dé à un gain financier : c'est ce qu'on appelle une **variable aléatoire**. En calculant son "espérance", on saura si le jeu est avantageux ou si c'est une arnaque !

---

## Rappels

Avant de commencer, révise :
- **Probabilité** : $\sum P_i = 1$.
- **Moyenne pondérée** : Somme des (valeurs $\times$ coefficients).

---

## Explications et Théorie

### 1. Définition
Une **variable aléatoire** $X$ est une fonction qui à chaque issue d'une expérience aléatoire associe un nombre réel.
*Exemple : $X$ peut être le gain à un jeu, le nombre de faces obtenues, etc.*

### 2. Loi de probabilité
Définir la loi de probabilité de $X$, c'est donner toutes les valeurs possibles $x_i$ que peut prendre $X$ et les probabilités $P(X = x_i)$ associées.
On présente souvent cela sous forme de tableau :

| $x_i$ | $x_1$ | $x_2$ | ... | $x_n$ |
| :--- | :---: | :---: | --- | :---: |
| $P(X = x_i)$ | $p_1$ | $p_2$ | ... | $p_n$ |

### 3. Espérance Mathématique $E(X)$
C'est la moyenne des valeurs que prend $X$, pondérée par leurs probabilités.
$$E(X) = \sum p_i x_i = p_1 x_1 + p_2 x_2 + ... + p_n x_n$$
- Si $E(X) > 0$, le jeu est dit **favorable**.
- Si $E(X) < 0$, le jeu est dit **défavorable**.
- Si $E(X) = 0$, le jeu est dit **équitable**.

### 4. Variance et Écart-type
Ils mesurent la dispersion (le risque) du jeu.
- **Variance $V(X)$** : $V(X) = \sum p_i (x_i - E(x))^2 = E(X^2) - (E(X))^2$.
- **Écart-type $\sigma(X)$** : $\sigma(X) = \sqrt{V(X)}$.

---

## Exples Pratiques (pas-à-pas)

### Calculer l'espérance d'un jeu
Un sac contient 2 jetons Rouges (gain +5€) et 3 jetons Verts (perte -2€). On tire un jeton.
1. **Loi de probabilité** :
   - $P(X = 5) = 2/5 = 0,4$.
   - $P(X = -2) = 3/5 = 0,6$.
2. **Calcul de l'espérance** :
   $E(X) = 0,4 \times 5 + 0,6 \times (-2) = 2 - 1,2 = \mathbf{0,8}$.
*En moyenne, on gagne 0,80€ par partie. Le jeu est favorable.*

---

## Exercices

**🟢 Exercice 1 (Facile)**
On lance une pièce. Si c'est Pile, on gagne 2 points, si c'est Face on en perd 1.
Donne le tableau de la loi de probabilité de $X$ et calcule $E(X)$.

**🔵 Exercice 2 (Moyen)**
Un jeu coûte 5€ à l'entrée. On lance un dé. Si on fait 6, on reçoit 20€. Sinon, on ne reçoit rien. 
Calcule l'espérance du gain **net** (gain reçu - prix d'entrée). Le jeu est-il équitable ?

**🟠 Exercice 3 (Difficile)**
Une variable aléatoire prend les valeurs $0$ et $10$. On sait que $E(X) = 3$.
Retrouve la loi de probabilité de $X$ (calcule $P(X=0)$ et $P(X=10)$).

---

## Exercices corrigés

**Exercice 1 :**
| Issues | Pile | Face |
| :--- | :---: | :---: |
| $x_i$ | 2 | -1 |
| $p_i$ | 0,5 | 0,5 |
$E(X) = 0,5 \times 2 + 0,5 \times (-1) = 1 - 0,5 = \mathbf{0,5}$.

**Exercice 2 :**
- Gain possible 1 : $20 - 5 = 15€$ (Probabilité $1/6$).
- Gain possible 2 : $0 - 5 = -5€$ (Probabilité $5/6$).
$E(X) = (1/6) \times 15 + (5/6) \times (-5) = 15/6 - 25/6 = -10/6 \approx \mathbf{-1,67€}$.
Le jeu est **défavorable** au joueur.

**Exercice 3 :**
Soit $p = P(X=10)$. Alors $P(X=0) = 1 - p$.
$E(X) = p \times 10 + (1-p) \times 0 = 3$.
$10p = 3 \implies \mathbf{p = 0,3}$.
Loi : $P(X=10) = 0,3$ et $P(X=0) = 0,7$.

---

## 📝 Mini-Quiz

1. La somme des probabilités d'une loi doit toujours être :
   - 0
   - 1
   - $E(X)$

2. Si $E(X) = -2$, le jeu est :
   - Favorable
   - Défavorable
   - Équitable

3. La variance d'une variable aléatoire est toujours :
   - Positive ou nulle
   - Négative
   - Égale à l'espérance

**Réponses :** 1. 1 | 2. Défavorable | 3. Positive ou nulle

---

## Foire Aux Questions (FAQ)

**Q : À quoi sert l'écart-type en économie ?**
R : À mesurer le **risque**. Deux actions en bourse peuvent avoir la même espérance de gain (elles rapportent autant en moyenne), mais celle qui a l'écart-type le plus élevé est la plus risquée car ses valeurs fluctuent énormément. Les investisseurs préfèrent souvent un gain stable (petit $\sigma$).

---

## 💡 Le savais-tu ?
Les mathématiciens ont inventé l'espérance pour répondre à une question de parieurs fatigués : "Si on arrête une partie de dés avant la fin, comment doit-on partager l'argent déjà mis en jeu ?". C'est Pascal et Fermat qui ont posé les bases de ce calcul au 17ème siècle.
