---
title: 'Chapitre 7 : Probabilités Conditionnelles'
level: Lycee
subLevel: Premiere
order: 7
---
# Chapitre 7 : Probabilités Conditionnelles

**Niveau** : Première (Spécialité Mathématiques)  
**Prérequis** : Probabilités de Seconde (union, intersection).  
**Objectifs** : 
- Calculer une probabilité conditionnelle $P_A(B)$.
- Utiliser et construire des arbres pondérés.
- Maîtriser la formule des probabilités totales.
- Comprendre la notion d'indépendance de deux événements.

---

## Activités de découverte

**Activité : Le test médical**
Une maladie touche 1% de la population. Un test est fiable à 99%. 
Si tu es testé positif, quelle est la probabilité que tu sois **vraiment** malade ?
Intuitivement, on répond 99%. Mais mathématiquement, c'est beaucoup moins (environ 50%) ! 
Pourquoi ? Parce qu'il y a beaucoup plus de gens sains que de gens malades. Les "faux positifs" (1% des gens sains) sont aussi nombreux que les "vrais positifs" (99% des malades).
Cette nuance s'appelle la **probabilité conditionnelle** : c'est la probabilité d'être malade *sachant que* le test est positif.

---

## Rappels

Avant de commencer, révise :
- **Univers ($\Omega$)** : L'ensemble des issues.
- **Intersection ($A \cap B$)** : Événements $A$ et $B$ simultanés.
- **Réunion ($A \cup B$)** : Événement $A$ ou $B$.

---

## Explications et Théorie

### 1. Définition
La probabilité de l'événement $B$ **sachant que** l'événement $A$ est réalisé est notée $P_A(B)$.
Elle se calcule par :
$$P_A(B) = \frac{P(A \cap B)}{P(A)}$$
*(On réduit l'univers des possibles au seul ensemble $A$)*.

### 2. Arbres pondérés
Un arbre permet de visualiser les étapes.
- La somme des probabilités des branches partant d'un même nœud est égale à 1.
- La probabilité d'un chemin est le produit des probabilités rencontrées.
- La probabilité d'un événement au bout de plusieurs chemins est la somme des probabilités de ces chemins.

### 3. Formule des Probabilités Totales
Si les événements $A_1, A_2, ..., A_n$ forment une partition de l'univers (ils couvrent tout sans se chevaucher), alors pour tout événement $B$ :
$$P(B) = P(B \cap A_1) + P(B \cap A_2) + ... + P(B \cap A_n)$$
Soit : $P(B) = P(A_1) \times P_{A_1}(B) + P(A_2) \times P_{A_2}(B) + ...$

### 4. Indépendance
Deux événements $A$ et $B$ sont **indépendants** si le fait que $A$ se produise ne change rien à la probabilité que $B$ se produise.
**Test d'indépendance** : $P(A \cap B) = P(A) \times P(B)$.

---

## Exples Pratiques (pas-à-pas)

### Calculer une probabilité totale avec un arbre
Une usine utilise deux machines. Machine 1 produit 60% des pièces (2% de défauts). Machine 2 produit 40% des pièces (3% de défauts).
Quelle est la probabilité totale qu'une pièce soit défectueuse ($D$) ?
1. $P(M1) = 0,6$ ; $P_{M1}(D) = 0,02$.
2. $P(M2) = 0,4$ ; $P_{M2}(D) = 0,03$.
3. **Calcul** : $P(D) = P(M1 \cap D) + P(M2 \cap D) = (0,6 \times 0,02) + (0,4 \times 0,03)$.
4. $P(D) = 0,012 + 0,012 = \mathbf{0,024}$ (soit 2,4%).

---

## Exercices

**🟢 Exercice 1 (Facile)**
On donne $P(A) = 0,4$ et $P(A \cap B) = 0,12$. Calcule $P_A(B)$.

**🔵 Exercice 2 (Moyen)**
On lance un dé. 
$A$ : "Obtenir un chiffre pair". $B$ : "Obtenir un multiple de 3".
$A$ et $B$ sont-ils indépendants ?

**🟠 Exercice 3 (Difficile)**
Dans une population, 40% des gens fument. Parmi les fumeurs, 20% ont une maladie respiratoire. Parmi les non-fumeurs, 5% ont cette maladie.
Calcule la probabilité qu'une personne choisie au hasard ait cette maladie.
S'il est malade, quelle est la probabilité qu'il soit un fumeur ?

---

## Exercices corrigés

**Exercice 1 :**
$P_A(B) = 0,12 / 0,4 = \mathbf{0,3}$.

**Exercice 2 :**
$P(A) = 3/6 = 0,5$. $P(B) = 2/6 = 1/3$.
$A \cap B = \{6\}$. $P(A \cap B) = 1/6$.
Test : $P(A) \times P(B) = 0,5 \times 1/3 = 1/6$.
**Oui**, les événements sont indépendants.

**Exercice 3 :**
$P(M) = 0,4 \times 0,2 + 0,6 \times 0,05 = 0,08 + 0,03 = \mathbf{0,11}$.
Probabilité qu'il fume sachant qu'il est malade : $P_M(F) = P(F \cap M) / P(M) = 0,08 / 0,11 \approx \mathbf{0,727}$ (soit 72,7%).

---

## 📝 Mini-Quiz

1. $P_A(B)$ se lit :
   - Probabilité de B sachant A
   - Probabilité de A sachant B
   - Probabilité de A et B

2. Si $A$ et $B$ sont indépendants, alors $P_A(B) = \dots$ :
   - $P(A)$
   - $P(B)$
   - 0

3. La somme des probabilités des branches d'un arbre issues d'un même nœud vaut :
   - $P(\Omega)$ (soit 1)
   - 0,5
   - $P(A \cap B)$

**Réponses :** 1. Probabilité de B sachant A | 2. $P(B)$ | 3. 1

---

## Foire Aux Questions (FAQ)

**Q : C'est quoi la différence entre "Incompatibles" et "Indépendants" ?**
R : Attention, c'est le piège classique ! 
- **Incompatibles** : Ils ne peuvent pas se produire en même temps (si l'un arrive, la probabilité de l'autre devient 0). Ils sont donc très "dépendants" !
- **Indépendants** : L'un n'influence pas l'autre. Lancer une pièce deux fois de suite : le premier résultat ne change rien au second.

---

## 💡 Le savais-tu ?
Les probabilités conditionnelles (Théorème de Bayes) sont le moteur des **filtres Anti-Spam** de tes emails. L'ordinateur calcule : "Quelle est la probabilité que cet email soit un spam *sachant qu'il* contient le mot 'Gagner' et 'Gratuit' ?". Plus il y a de mots suspects, plus la probabilité conditionnelle grimpe, jusqu'à déplacer l'email dans la corbeille !
