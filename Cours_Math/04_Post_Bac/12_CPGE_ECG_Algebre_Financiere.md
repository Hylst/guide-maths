---
title: 'CPGE ECG : Algèbre Financière & Modèles Matriciels'
level: Post_Bac
subLevel: CPGE_ECG
order: 12
---
# CPGE ECG : Algèbre Financière & Modèles Matriciels

**Niveau** : Post-Bac (CPGE ECG/ECT : Prépas Commerce et Économie)  
**Prérequis** : Calcul matriciel de base, suites géométriques.  
**Objectifs** :
- Maîtriser le calcul d'annuités, actualisations et taux d'intérêt composés.
- Comprendre et manipuler les matrices de transition pour modéliser l'évolution de marchés concurrentiels (Chaînes de Markov).
- Déterminer les états stables d'un marché par la résolution d'un système propre : $X \cdot P = X$.

---

## Activités de découverte

### Activité : Le duopole de marques d'ordinateurs
Sur un marché fermé, deux fabricants de technologies éducatives $A$ et $B$ se partagent les parts de marché. 
- Chaque année, le constructeur $A$ fidélise $80\%$ de ses clients, tandis que $20\%$ migrent vers la marque concurrentielle $B$.
- De son côté, le constructeur $B$ conserve $70\%$ de ses acheteurs d'une année sur l'autre, et $30\%$ décident d'aller chez $A$.

Notons $a_n$ et $b_n$ les proportions respectives des clients de $A$ et $B$ à l'année $n$.
On souhaite comprendre le comportement théorique à long terme de ce duopole concurentiel.

Nous pouvons traduire ces règles par des équations récurrentes :
$$a_{n+1} = 0.8 a_n + 0.3 b_n$$
$$b_{n+1} = 0.2 a_n + 0.7 b_n$$

Cette formulation linéaire s'écrit de manière très compacte grâce au langage matriciel :
$$\begin{pmatrix} a_{n+1} & b_{n+1} \end{pmatrix} = \begin{pmatrix} a_n & b_n \end{pmatrix} \times \begin{pmatrix} 0.8 & 0.2 \\ 0.3 & 0.7 \end{pmatrix}$$

La matrice $P = \begin{pmatrix} 0.8 & 0.2 \\ 0.3 & 0.7 \end{pmatrix}$ s'appelle une **matrice stochastique** (la somme de chaque ligne vaut $1$). C'est le pilier des méthodes probabilises de prédiction commerciale en CPGE ECG.

---

## Fondements Théoriques

### 1. Mathématiques Financières & Actualisation

#### Intérêts Composés
Si un capital initial $C_0$ est placé au taux annuel $i$, la valeur acquise au bout de $n$ périodes vaut :
$$C_n = C_0 (1 + i)^n$$

#### Actualisation
Elle consiste à déterminer la valeur présente d'une somme future $C_n$ disponible dans $n$ années :
$$C_0 = \frac{C_n}{(1 + i)^n} = C_n (1 + i)^{-n}$$

#### Somme de flux périodiques (Annuités constantes)
La valeur actuelle $V_0$ d'une suite de $n$ versements annuels constants de montant $a$ (fin de période), actualisés au taux $i$, s'obtient via la somme géométrique :
$$V_0 = a \sum_{k=1}^{n} (1+i)^{-k} = a \frac{1 - (1+i)^{-n}}{i}$$

---

### 2. Modèles de Transition Matriciels & Chaînes de Markov

Une chaîne de Markov est un processus stochastique modélisant d'une étape à l'autre l'évolution d'états aléatoires.

#### Définitions :
- Le vecteur d'état à l'étape $n$ est noté : $X_n = \begin{pmatrix} x_{n,1} & x_{n,2} & \dots & x_{n,k} \end{pmatrix}$.
- La **Matrice de Transition** $P$ est une matrice carrée où l'élément $P_{ij}$ désigne la probabilité de passer de l'état $i$ à l'état $j$.
- Le modèle de récurrence est donné par :
$$X_{n+1} = X_n \cdot P$$
- Ainsi, pour tout entier $n \ge 0$, le vecteur d'état se calcule par :
$$X_n = X_0 \cdot P^n$$

#### État Stable (Équilibre à long terme)
On recherche un vecteur de probabilité de transition permanent $X = \begin{pmatrix} x_1 & x_2 & \dots & x_k \end{pmatrix}$ tel que la distribution ne varie plus d'un cycle à l'autre. Il satisfait l'équation :
$$X \cdot P = X \quad \text{avec} \quad \sum_{m=1}^{k} x_m = 1$$

Il s'agit de la recherche du point fixe matriciel, étroitement lié à la théorie spectrale (vecteur propre associé à la valeur propre $1$).

---

## Résolution Mathématique Pratique du Duopole

Recherchons le vecteur stable $X = \begin{pmatrix} a & b \end{pmatrix}$ tel que :
$$\begin{pmatrix} a & b \end{pmatrix} \begin{pmatrix} 0.8 & 0.2 \\ 0.3 & 0.7 \end{pmatrix} = \begin{pmatrix} a & b \end{pmatrix} \quad \text{avec} \quad a + b = 1$$

Ce produit équivaut au système linéaire d'équations :
$$\begin{cases} 0.8a + 0.3b = a \\ 0.2a + 0.7b = b \end{cases} \implies \begin{cases} -0.2a + 0.3b = 0 \\ 0.2a - 0.3b = 0 \end{cases} \implies 0.2a = 0.3b \implies a = 1.5b$$

Puisque $a+b = 1$, en remplaçant :
$$1.5b + b = 2.5b = 1 \implies b = \frac{1}{2.5} = 0.4 \quad \text{et} \quad a = 0.6$$

Le marché va converger à long terme vers un état stable imperturbable de **60% d'acheteurs pour le constructeur $A$ et 40% pour $B$**, quel que soit l'état initial des parts de marché !

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi est-ce que les économistes préfèrent multiplier le vecteur à gauche (X * P) plutôt que standard à droite (P * X) ?</summary>

  C’est une convention formelle de représentation. Si l'on écrit les probabilités sous forme de <strong>vecteur ligne</strong>, on doit le multiplier par la gauche : $X_{n+1} = X_n \cdot P$. Les lignes de $P$ somment à 1. Dans d'autres matières scientifiques, on écrit les probabilités en <strong>vecteur colonne</strong>, et on multiplie par la droite : $V_{n+1} = M \cdot V_n$. Dans ce cas, ce sont les colonnes de la matrice $M$ qui somment à 1. Les deux méthodes sont mathématiquement transposées et équivalentes !
</details>

<details>
  <summary>Qu'est-ce qu'une matrice de transition "régulière" ?</summary>

  Une matrice de transition $P$ est régulière s'il existe une puissance entière positive $k \ge 1$ pour laquelle TOUTES les valeurs de la matrice $P^k$ sont strictement supérieures à zéro. Cela garantit biologiquement qu'on peut migrer de n'importe quel état à n'importe quel autre après plusieurs étapes. Le théorème de Perron-Frobenius assure alors qu'un unique état d'équilibre stable stable à long terme existe.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si j'emprunte un capital de 10 000 € aujourd'hui à un taux d'intérêt composé annuel de 4%. Combien devrai-je rembourser au bout de 2 ans ?**
- [ ] 10 800 €
- [x] 10 816 €
- [ ] 11 200 €
> **Explication :** La formule stipule : $10000 \times (1 + 0.04)^2 = 10000 \times 1.04^2 = 10000 \times 1.0816 = 10816$ €.

**Question 2 : Quelle est la caractéristique obligatoire décisive des coefficients d'une matrice stochastique P ?**
- [ ] La somme de toutes les colonnes vaut 1
- [ ] Les éléments sont tous négatifs ou égaux à 1
- [x] La somme de chaque ligne est égale à 1
> **Explication :** Dans un produit de vecteur d'état ligne $X \cdot P$, chaque coefficient de la ligne de la matrice modélise les proportions de sortie de cet état. La probabilité totale de sortie devant être de 100%, l'union de chaque ligne de coefficients doit totaliser exactement 1.

**Question 3 : On cherche l'état stable $X$ associé à la matrice stochastique $P$. Quel est le calcul matriciel équivalent ?**
- [x] Trouver le vecteur propre de $P$ pour la valeur propre 1
- [ ] Inverser directement la matrice transition $P^{-1}$
- [ ] Calculer le déterminant $\det(P) = 1$
> **Explication :** L'équation de stabilité $X \cdot P = X$ est la définition exacte d'un vecteur propre associé à la valeur spectrale unitaire $\lambda = 1$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Calculer des capitaux finis et placements via des taux d'intérêts périodiques composés.
- [ ] Construire une matrice stochastique de transition à partir d'un graphe de probabilités.
- [ ] Calculer les probabilités d'état futur via $X_n = X_0 \cdot P^n$.
- [ ] Formuler et résoudre le système homogène de point fixe spectral pour trouver l'équilibre stable.
