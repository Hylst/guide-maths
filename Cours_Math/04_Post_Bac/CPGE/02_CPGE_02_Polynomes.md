---
title: 'CPGE : Polynômes à une Indéterminée'
level: Post_Bac
subLevel: CPGE
order: 2
---
# CPGE : Polynômes à une Indéterminée

**Niveau** : Post-Bac (CPGE MPSI, PCSI, MP, MPI, L1/L2 Double Licence)  
**Prérequis** : Algèbre linéaire de base, arithmétique élémentaire des nombres entiers, théorie des structures.  
**Objectifs** :
- Définir et manipuler l'algèbre des polynômes $K[X]$ et ses opérations structurelles (somme, produit, degré).
- Effectuer des divisions euclidiennes et appliquer l'algorithme d'Euclide pour déterminer le PGCD de deux polynômes.
- Déterminer les racines d'un polynôme, leur ordre de multiplicité, et appliquer le théorème fondamental de l'algèbre (Théorème de d'Alembert-Gauss) pour factoriser les polynômes dans $\mathbb{C}[X]$ et $\mathbb{R}[X]$.

---

## Activités de découverte

### Activité : Rechercher la courbe parfaite passant par des points imposés (Interpolation de Lagrange)
En ingénierie aéronautique ou en imagerie orbitale par satellite, on a régulièrement besoin de lier des points de mesures discrets par une trajectoire fluide et continue. Imaginez que vous ayez 3 points dans le plan cartésien :
$$P_0 = (1, 2), \quad P_1 = (2, 3), \quad P_2 = (3, 6)$$
Existe-t-il une fonction mathématique simple capable de passer exactement par ces trois coordonnées en même temps ? 

La solution la plus simple réside dans les fonctions polynomiales. Un théorème universel montre qu'il existe un unique polynôme $P$ de degré minimal (ici de degré inférieur ou égal à 2) satisfaisant cette contrainte. Ce polynôme se calcule grâce à la méthode de l'**Interpolation de Lagrange** :
$$P(X) = X^2 - 2X + 3$$
Si vous évaluez : $P(1) = 2$, $P(2) = 3$, $P(3) = 6$. Ça fonctionne parfaitement !

Les **polynômes** ne sont pas seulement des fonctions lisses faciles à calculer, ils constituent une structure algébrique d'une richesse inestimable, notée $K[X]$. Leur étude forme le pilier central de l'algèbre linéaire, de la théorie des codes correcteurs d'erreurs (codes de Reed-Solomon) et du traitement du signal numérique.

---

## Fondements Théoriques

### 1. L’Anneau $K[X]$ et Notion de Degré

Soit $K$ un corps commutatif (généralement $\mathbb{R}$ ou $\mathbb{C}$).

#### Définition :
Un **polynôme** à une indéterminée $X$ et à coefficients dans $K$ est une suite d'éléments de $K$ presque tous nuls. On le note symboliquement :
$$P(X) = \sum_{n=0}^{+\infty} a_n X^n = a_0 + a_1 X + a_2 X^2 + ... + a_d X^d$$
où $a_d \ne 0$ s'appelle le coefficient dominant et $d$ est le **degré** de $P$ (noté $\deg(P)$).

- L'ensemble muni des opérations d'addition et de produit multiplicatif possède une structure d'**anneau commutatif intègre**.
- Par convention, le polynôme nul a un degré égal à $-\infty$.

#### Propriétés algébriques du degré :
Pour tous polynômes $P, Q \in K[X]$ :
- $\deg(P + Q) \le \max(\deg(P), \deg(Q))$ (avec égalité stricte si les degrés sont différents).
- $\deg(P \times Q) = \deg(P) + \deg(Q)$.

### 2. Arithmétique dans $K[X]$ : Divisibilité et Algorithme d’Euclide

La structure algébrique de l'anneau $K[X]$ est extrêmement similaire à celle de l'anneau des entiers relatifs $\mathbb{Z}$.

#### Division Euclidienne :
Soient $A$ et $B$ deux polynômes de $K[X]$ avec $B \ne 0$. Il existe un unique couple $(Q, R) \in K[X]^2$ tel que :
$$A = B \times Q + R \quad \text{avec} \quad \deg(R) < \deg(B)$$
où $Q$ est le quotient et $R$ le reste de la division.

#### Divisibilité et PGCD :
On dit que $B$ **divise** $A$ s'il existe $Q \in K[X]$ tel que $A = B \times Q$ (ce qui équivaut à un reste nul $R = 0$).

L'étude des diviseurs communs conduit à la définition du **Plus Grand Commun Diviseur (PGCD)** de deux polynômes, que l'on calcule à l'aide de l'**Algorithme d'Euclide** (en effectuant des divisions euclidiennes successives).

### 3. Racines, Multiplicité et Factorisation

#### Définition d'une racine :
Soit $P \in K[X]$ et $\alpha \in K$. Un élément $\alpha$ est une **racine** de $P$ si la valeur évaluée $P(\alpha) = 0$.
- Un élément $\alpha$ est racine de $P$ si et seulement si le monôme $(X - \alpha)$ divise $P$.

#### Ordre de multiplicité :
On dit que $\alpha$ est une **racine d'ordre (ou multiplicité) $k$** (où $k \ge 1$) de $P$ si $(X - \alpha)^k$ divise $P$, mais $(X - \alpha)^{k+1}$ ne divise pas $P$.
- **Caractérisation par les dérivées** : $\alpha$ est racine de multiplicité $k$ de $P$ si et seulement si :
  $$P(\alpha) = P'(\alpha) = ... = P^{(k-1)}(\alpha) = 0 \quad \text{et} \quad P^{(k)}(\alpha) \ne 0$$

#### Théorème de d'Alembert-Gauss :
Tout polynôme non nul de degré $n$ à coefficients complexes admet exactement $n$ racines complexes comptées avec leur multiplicité. On dit que le corps $\mathbb{C}$ est **algébriquement clos**.
- Dans $\mathbb{C}[X]$, tout polynôme $P$ se décompose uniquement en produit de facteurs du premier degré :
  $$P(X) = \lambda \prod_{i=1}^r (X - \alpha_i)^{k_i}$$
- Dans $\mathbb{R}[X]$, les polynômes irréductibles sont les polynômes de degré 1, et les polynômes de degré 2 de discriminant strictement négatif ($\Delta < 0$).

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi le degré du reste R dans la division euclidienne doit-il être strictement inférieur à celui du diviseur B ?</summary>

  C’est la condition d'arrêt fondamentale qui garantit l'unicité du résultat. Si $\deg(R) \ge \deg(B)$, on peut continuer à diviser le terme de plus haut degré de $R$ par le terme de plus haut degré de $B$, ce qui modifierait le quotient $Q$ et réduirait davantage le reste. La division s'arrête uniquement lorsque le reste ne peut plus s'exprimer par un multiple de $B$.
</details>

<details>
  <summary>Comment trouve-t-on le PGCD de deux polynômes en pratique ?</summary>

  On utilise l'algorithme d'Euclide : on effectue la division euclidienne de $A$ par $B$, on obtient un reste $R_1$. Puis on divise $B$ par $R_1$ pour obtenir un reste $R_2$, et ainsi de suite. Le PGCD est le dernier reste non nul de cette suite d'opérations, rendu unitaire (dont le coefficient dominant est égal à 1).
</details>

<details>
  <summary>Quelle est la forme des polynômes irréductibles dans R[X] ?</summary>

  D'après le théorème de d'Alembert-Gauss, les polynômes irréductibles de $\mathbb{R}[X]$ (ceux que l'on ne peut pas décomposer en produits de polynômes réels de degrés plus petits) sont uniquement :
  1. Les polynômes de degré 1 : $aX + b$ (avec $a \ne 0$).
  2. Les polynômes de degré 2 sans racine réelle : $aX^2 + bX + c$ avec $b^2 - 4ac < 0$.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Soient deux polynômes non nuls $P$ et $Q$ de degrés respectifs $\deg(P) = 3$ et $\deg(Q) = 2$. Quel est le degré du polynôme composé $P \times Q$ ?**
- [ ] $\deg(P \times Q) = 3^2 = 9$
- [x] $\deg(P \times Q) = 3 + 2 = 5$ car les degrés s'additionnent lors de la multiplication
- [ ] $\deg(P \times Q) = 6$
- > **Explication :** La règle structurelle fondamentale sur les degrés d'un produit dans un domaine intègre donne : $\deg(P \times Q) = \deg(P) + \deg(Q)$. Ici, $\deg(P \times Q) = 3 + 2 = 5$.

**Question 2 : Le polynôme $P(X) = X^3 - 3X^2 + 4$ admet le nombre 2 comme racine. Quel est l'ordre de multiplicité de cette racine ?**
- [ ] Multiplicité d'ordre 1 (racine simple)
- [x] Multiplicité d'ordre 2 (racine double) car $P(2) = 0$, $P'(2) = 0$ et $P''(2) \ne 0$
- [ ] Multiplicité d'ordre 3 (racine triple)
- > **Explication :** En évaluant : $P(2) = 8 - 12 + 4 = 0$. Le polynôme dérivé est $P'(X) = 3X^2 - 6X$. En évaluant la dérivée au point 2 : $P'(2) = 3(4) - 12 = 0$. La dérivée seconde est $P''(X) = 6X - 6$, évaluée au point 2 : $P''(2) = 12 - 6 = 6 \ne 0$. Le nombre 2 est donc une racine double (de multiplicité égale à 2) de $P$. S'écrit sous forme factorisée: $P(X) = (X-2)^2(X+1)$.

**Question 3 : Soit la division euclidienne de $A(X) = X^4 + X^2 + 1$ par $B(X) = X^2 + 1$. Quel est le reste réel $R(X)$ obtenu ?**
- [ ] $R(X) = X + 1$
- [ ] $R(X) = 0$ car le diviseur divise parfaitement le dividende
- [x] $R(X) = 1$ car $X^4 + X^2 + 1 = (X^2 + 1) \times X^2 + 1$
- > **Explication :** On peut réécrire $A$ de façon évidente : $A(X) = X^4 + X^2 + 1 = X^2(X^2 + 1) + 1$. Le quotient est donc $Q(X) = X^2$, le reste est $R(X) = 1$, de degré $\deg(1) = 0 < \deg(B) = 2$. Les conditions d'unicité de la division euclidienne sont respectées.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Appliquer rigoureusement la loi de sommation et de multiplication des degrés sur des polynômes complexes.
- [ ] Poser et résoudre manuellement une division euclidienne de polynômes de degré élevé.
- [ ] Utiliser la formule Taylor-Polynômes pour évaluer la multiplicité d'une racine par dérivation successive.
- [ ] Factoriser entièrement un polynôme réel de degré supérieur à 3 en produit de termes irréductibles de degré 1 et 2.
