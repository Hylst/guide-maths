---
title: 'Maths Expertes - Chapitre 3 : Matrices et Graphes'
level: Lycee
subLevel: Terminale_Expertes
order: 3
---
# Chapitre 3 : Matrices et Graphes

**Niveau** : Terminale (Option Mathématiques Expertes)  
**Prérequis** : Systèmes d'équations, calcul littéral.  
**Objectifs** : 
- Effectuer des calculs matriciels (addition, multiplication, inverse).
- Modéliser des situations par des graphes (sommets et arêtes).
- Utiliser les matrices pour étudier des chaînes de Markov.
- Calculer des probabilités de transition à long terme.

---

## Activités de découverte

**Activité : Le secret de l'algorithme Google (PageRank)**
Comment Google classe-t-il les milliards de pages web pour mettre la meilleure en premier ? 
Imagine le web comme un immense réseau de points (les pages) reliés par des flèches (les liens). Google calcule la probabilité qu'un internaute qui clique au hasard finisse par arriver sur une page donnée. 
Ce calcul géant, qui fait tourner des serveurs jour et nuit, n'est rien d'autre qu'une multiplication de **Matrices** représentant un **Graphe** géant !

---

## Rappels

Avant de commencer, révise :
- **Système d'équations** : Trouver $x$ et $y$ tels que $ax + by = c$.

---

## Explications et Théorie

### 1. Les Matrices
Une matrice est un tableau de nombres à $n$ lignes et $p$ colonnes.
- **Addition** : On additionne les coefficients terme à terme.
- **Multiplication** : On multiplie les "lignes par les colonnes". 
  *Attention : $A \times B$ n'est généralement pas égal à $B \times A$ !*
- **Inverse $A^{-1}$** : C'est la matrice telle que $A \times A^{-1} = I$ (matrice identité).

### 2. Les Graphes
Un graphe est composé de **sommets** reliés par des **arêtes** (ou des arcs si c'est orienté).
- **Matrice d'adjacence** : Une matrice qui indique s'il y a un lien direct entre deux sommets.
- **Chemins** : Le nombre de chemins de longueur $n$ entre deux sommets est donné par les coefficients de la matrice d'adjacence élevée à la puissance $n$.

### 3. Chaînes de Markov
C'est un processus où l'on passe d'un état à un autre avec une certaine probabilité.
- **Matrice de transition $M$** : La somme des coefficients de chaque ligne vaut 1.
- **État à l'étape $n$** : $P_n = P_0 \times M^n$.

### 4. État stable
On cherche un état $P$ tel que $P \times M = P$. 
Cela correspond à l'équilibre du système sur le long terme (ex: répartition stable de clients entre deux marques).

---

## Exples Pratiques (pas-à-pas)

### Produit matriciel
Calculer $A \times B$ avec $A = \begin{pmatrix} 1 & 2 \\ 0 & 3 \end{pmatrix}$ et $B = \begin{pmatrix} 4 \\ 5 \end{pmatrix}$.
1. **Ligne 1 $\times$ Colonne 1** : $1 \times 4 + 2 \times 5 = 4 + 10 = 14$.
2. **Ligne 2 $\times$ Colonne 1** : $0 \times 4 + 3 \times 5 = 0 + 15 = 15$.
3. **Résultat** : $\begin{pmatrix} 14 \\ 15 \end{pmatrix}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Soit $A = \begin{pmatrix} 2 & 1 \\ 5 & 3 \end{pmatrix}$. Calcule son déterminant ($ad - bc$). Est-elle inversible ?

**🔵 Exercice 2 (Moyen)**
Un graphe a 3 sommets A, B, C. La matrice d'adjacence est $M = \begin{pmatrix} 0 & 1 & 1 \\ 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix}$. 
Combien y a-t-il de chemins de longueur 2 pour aller de A à A ?

**🟠 Exercice 3 (Difficile)**
Dans une ville, chaque année, 20% des habitants de la ville partent en banlieue et 10% des habitants de la banlieue viennent en ville.
Donne la matrice de transition et calcule l'état stable (répartition finale).

---

## Exercices corrigés

**Exercice 1 :**
$\text{det}(A) = 2 \times 3 - 5 \times 1 = 6 - 5 = \mathbf{1}$.
Comme le déterminant est non nul, la matrice est **inversible**.
$A^{-1} = \frac{1}{\text{det}} \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix} = \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix}$.

**Exercice 2 :**
On calcule $M^2 = \begin{pmatrix} 2 & 1 & 1 \\ 1 & 2 & 1 \\ 1 & 1 & 2 \end{pmatrix}$.
Le coefficient $(1,1)$ est 2. Il y a donc **2 chemins** : A-B-A et A-C-A.

**Exercice 3 :**
Matrice $M = \begin{pmatrix} 0,8 & 0,2 \\ 0,1 & 0,9 \end{pmatrix}$.
État stable $(v, b)$ :
$0,8v + 0,1b = v$
$0,2v + 0,9b = b$
$\implies 0,1b = 0,2v \implies b = 2v$.
Comme $v+b=1$, on a $v + 2v = 1 \implies 3v = 1 \implies \mathbf{v = 1/3}$ and $\mathbf{b = 2/3}$.
Sur le long terme, 1/3 de la population sera en ville et 2/3 en banlieue.

---

## 📝 Mini-Quiz

1. Un produit de matrices $A(2,3) \times B(3,4)$ donne une matrice de taille :
   - (2,3)
   - (3,4)
   - (2,4)

2. Dans un graphe, une boucle est une arête qui :
   - Relie deux sommets différents
   - Revient sur le même sommet
   - N'existe pas

3. La matrice Identité $I$ se comporte comme :
   - Le chiffre 0
   - Le chiffre 1
   - L'infini

**Réponses :** 1. (2,4) | 2. Revient sur le même sommet | 3. Le chiffre 1

---

## Foire Aux Questions (FAQ)

**Q : À quoi sert l'intelligence artificielle avec les matrices ?**
R : Un réseau de neurones (IA) est essentiellement une succession de millions de multiplications de matrices. Apprendre, pour une IA, c'est modifier les coefficients de ces matrices pour que le résultat final (la prédiction) soit le bon. Les cartes graphiques (GPU) sont très puissantes justement parce qu'elles sont conçues pour multiplier les matrices très vite.

---

## 💡 Le savais-tu ?
Les physiciens utilisent les matrices pour décrire le comportement des particules atomiques en mécanique quantique. Dans ce monde étrange, certaines grandeurs ne peuvent pas être mesurées en même temps (Principe d'incertitude), ce qui se traduit mathématiquement par le fait que les matrices ne commutent pas ($A \times B \neq B \times A$).
