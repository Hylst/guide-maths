---
title: 'Chapitre 7 : Probabilités'
level: Lycee
subLevel: Seconde
order: 7
---
# Chapitre 7 : Probabilités

**Niveau** : Seconde (Lycée)  
**Prérequis** : Probabilités simples de 3ème, fréquences, pourcentages.  
**Objectifs** : 
- Modéliser une expérience aléatoire par un ensemble d'issues (univers).
- Manipuler les notions d'intersection ($\cap$) et de réunion ($\cup$).
- Maîtriser la formule de la réunion : $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
- Comprendre le lien entre fréquence et probabilité (échantillonnage).

---

## Activités de découverte

**Activité : Le paradoxe de l'intersection**
Dans un lycée, 60% des élèves aiment les maths, et 50% aiment le sport.
Si on fait $60\% + 50\%$, on obtient $110\%$. C'est impossible !
Pourquoi ? Parce qu'un élève peut aimer les maths **ET** le sport. Ces élèves sont comptés deux fois si on fait une simple addition.
*En probabilités, pour trouver le pourcentage total ($Union$), on doit soustraire ceux qui sont dans les deux camps ($Intersection$).*

---

## Rappels

Avant de commencer, révise :
- **Probabilité** : Entre 0 et 1.
- **Équiprobabilité** : $P(A) = \text{Cas favorables} / \text{Cas possibles}$.
- **Événement contraire** : $P(\bar{A}) = 1 - P(A)$.

---

## Explications et Théorie

### 1. Univers et Événements
- **Univers ($\Omega$)** : L'ensemble de tous les résultats possibles d'une expérience.
- **Événement** : Une partie de l'univers (un sous-ensemble).

### 2. Réunion et Intersection
- **Intersection ($A \cap B$)** : L'événement "$A$ **et** $B$" se produisent ensemble.
- **Réunion ($A \cup B$)** : L'événement "$A$ **ou** $B$" (l'un, l'autre ou les deux) se produit.

**Formule Fondamentale** :
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

### 3. Événements incompatibles
Deux événements sont **incompatibles** (ou disjoints) s'ils ne peuvent pas se produire en même temps.
Dans ce cas : $P(A \cap B) = 0$ et $P(A \cup B) = P(A) + P(B)$.

### 4. Fréquence et Échantillonnage
Si on répète une expérience $n$ fois, la fréquence d'apparition d'un événement se stabilise vers sa probabilité théorique quand $n$ devient très grand. C'est la **Loi des Grands Nombres**.
Au lycée, on étudie aussi la fluctuation d'une fréquence sur un échantillon de taille $n$.

---

## Exples Pratiques (pas-à-pas)

### Appliquer la formule de la réunion
Dans un groupe de 100 personnes :
- 30 parlent espagnol ($E$).
- 20 parlent allemand ($A$).
- 10 parlent les deux ($E \cap A$).
Quelle est la probabilité qu'une personne choisie au hasard parle au moins une des deux langues ($E \cup A$) ?

1. $P(E) = 0,30$.
2. $P(A) = 0,20$.
3. $P(E \cap A) = 0,10$.
4. **Calcul** : $P(E \cup A) = 0,30 + 0,20 - 0,10 = \mathbf{0,40}$.
*Il y a 40% de chances.*

---

## Exercices

**🟢 Exercice 1 (Facile)**
On lance un dé à 6 faces.
Soit $A$ : "Obtenir un nombre pair" et $B$ : "Obtenir un nombre supérieur ou égal à 4".
Détermine les issues de $A \cap B$ et calcule sa probabilité.

**🔵 Exercice 2 (Moyen)**
On donne $P(A) = 0,6$, $P(B) = 0,5$ et $P(A \cup B) = 0,8$.
Calcule $P(A \cap B)$.

**🟠 Exercice 3 (Difficile)**
Dans une boîte de chocolats, il y en a 40. 
25 sont au lait, 15 sont pralinés, et 10 sont à la fois au lait et pralinés.
Un enfant en prend un au hasard. Quelle est la probabilité qu'il soit soit au lait, soit praliné ? (Événement $L \cup P$).

---

## Exercices corrigés

**Exercice 1 :**
$A = \{2, 4, 6\}$. $B = \{4, 5, 6\}$.
$A \cap B = \{4, 6\}$.
$P(A \cap B) = 2/6 = \mathbf{1/3}$.

**Exercice 2 :**
On utilise $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
$0,8 = 0,6 + 0,5 - P(A \cap B)$
$0,8 = 1,1 - P(A \cap B) \implies P(A \cap B) = 1,1 - 0,8 = \mathbf{0,3}$.

**Exercice 3 :**
$P(L) = 25/40 = 0,625$.
$P(P) = 15/40 = 0,375$.
$P(L \cap P) = 10/40 = 0,25$.
$P(L \cup P) = 0,625 + 0,375 - 0,25 = \mathbf{0,75}$ (soit 75% de chances).

---

## 📝 Mini-Quiz

1. Le symbole $\cap$ signifie :
   - Et (Intersection)
   - Ou (Réunion)
   - Pas (Contraire)

2. Si $A$ et $B$ sont incompatibles, $P(A \cap B)$ est égal à :
   - 1
   - 0,5
   - 0

3. $P(\bar{A}) = 0,4$. Alors $P(A)$ vaut :
   - 0,4
   - 0,6
   - 1

**Réponses :** 1. Et | 2. 0 | 3. 0,6

---

## Foire Aux Questions (FAQ)

**Q : Pourquoi on ne peut pas juste additionner les probabilités ?**
R : Imagine que tu comptes les élèves qui portent un pull bleu et ceux qui portent un jean. Si tu additionnes bêtement, tu comptes les élèves qui portent les deux (le pull bleu ET le jean) deux fois : une fois dans le groupe pull, une fois dans le groupe jean. Soustraire l'intersection permet de corriger ce "double comptage".

---

## 💡 Le savais-tu ?
La théorie des probabilités a été formalisée très tard en mathématiques (au 20ème siècle par Kolmogorov). Auparavant, c'était surtout une affaire de parieurs et de joueurs de dés qui essayaient de tricher intelligemment !
