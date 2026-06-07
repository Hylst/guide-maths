---
title: 'Maths Expertes - Chapitre 2 : Arithmétique'
level: Lycee
subLevel: Terminale_Expertes
order: 2
---
# Chapitre 2 : Arithmétique

**Niveau** : Terminale (Option Mathématiques Expertes)  
**Prérequis** : Division euclidienne (Collège), nombres premiers.  
**Objectifs** : 
- Maîtriser la divisibilité dans $\mathbb{Z}$ et les congruences.
- Appliquer l'algorithme d'Euclide pour le PGCD.
- Utiliser le théorème de Bézout et le théorème de Gauss.
- Résoudre des équations diophantiennes.
- Comprendre les fondements de la cryptographie (petit théorème de Fermat).

---

## Activités de découverte

**Activité : Le secret du code secret (RSA)**
Comment se fait-il que tu puisses envoyer ton numéro de carte bleue sur Internet sans qu'un pirate ne le vole ? 
Tout repose sur un problème d'arithmétique très simple : il est facile de multiplier deux nombres premiers géants (ex: 500 chiffres), mais il est quasiment impossible (même pour les supercalculateurs) de retrouver ces deux nombres à partir de leur produit. 
L'**arithmétique**, la plus vieille branche des maths, est devenue le bouclier numérique du monde moderne.

---

## Rappels

Avant de commencer, révise :
- **Division Euclidienne** : $a = bq + r$ avec $0 \leq r < |b|$.
- **Diviseur** : $b$ divise $a$ s'il existe $k \in \mathbb{Z}$ tel que $a = kb$.

---

## Explications et Théorie

### 1. Congruences
On dit que $a \equiv b \pmod n$ si $n$ divise $(a-b)$.
Cela signifie que $a$ et $b$ ont le même reste dans la division par $n$.
**Propriétés** : On peut additionner, multiplier et élever à la puissance des congruences. 
*Attention : on ne peut pas diviser n'importe comment !*

### 2. PGCD et Algorithme d'Euclide
Le PGCD est le plus grand diviseur commun à deux nombres.
**L'Algorithme d'Euclide** consiste à faire des divisions successives : $PGCD(a, b) = PGCD(b, r)$ jusqu'à obtenir un reste nul. Le dernier reste non nul est le PGCD.

### 3. Théorème de Bézout
Deux nombres $a$ et $b$ sont **premiers entre eux** si et seulement s'il existe des entiers $u$ et $v$ tels que :
$$au + bv = 1$$

### 4. Théorème de Gauss
Si $a$ divise $bc$ et si $a$ est premier avec $b$, alors **$a$ divise $c$**.
*(C'est l'outil clé pour résoudre des équations avec des entiers).*

### 5. Petit Théorème de Fermat
Si $p$ est un nombre premier et $a$ un entier non divisible par $p$, alors :
$$a^{p-1} \equiv 1 \pmod p$$

---

## Exples Pratiques (pas-à-pas)

### Résoudre une équation diophantienne $5x - 3y = 1$
1. **Trouver une solution particulière** : On teste des petites valeurs. 
   Pour $x=2$ and $y=3$, on a $5(2) - 3(3) = 10 - 9 = 1$.
   Donc $(2 ; 3)$ est solution.
2. **Soustraction** : $5(x-2) - 3(y-3) = 0 \implies 5(x-2) = 3(y-3)$.
3. **Théorème de Gauss** : 5 divise $3(y-3)$. Comme 5 est premier avec 3, 5 divise $(y-3)$.
   Donc $y-3 = 5k \implies y = 5k + 3$.
4. **Trouver $x$** : $5(x-2) = 3(5k) \implies x-2 = 3k \implies x = 3k + 2$.
5. **Solutions** : $\{(3k+2 ; 5k+3) \mid k \in \mathbb{Z}\}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Trouve le reste de $2^{10}$ dans la division par 7.

**🔵 Exercice 2 (Moyen)**
Détermine le PGCD de 126 et 90 en utilisant l'algorithme d'Euclide.

**🟠 Exercice 3 (Difficile)**
Montre que pour tout entier $n$, $n^3 - n$ est divisible par 6.

---

## Exercices corrigés

**Exercice 1 :**
$2^3 = 8 \equiv 1 \pmod 7$.
$2^{10} = (2^3)^3 \times 2^1 \equiv 1^3 \times 2 \equiv \mathbf{2} \pmod 7$.
Le reste est 2.

**Exercice 2 :**
- $126 = 90 \times 1 + 36$
- $90 = 36 \times 2 + 18$
- $36 = 18 \times 2 + 0$
Le dernier reste non nul est **18**.

**Exercice 3 :**
$n^3 - n = n(n^2 - 1) = (n-1) \times n \times (n+1)$.
C'est le produit de 3 entiers consécutifs.
- Parmi 3 entiers consécutifs, l'un est forcément divisible par 3.
- Parmi 3 entiers consécutifs, au moins l'un est pair (divisible par 2).
Comme 2 et 3 sont premiers entre eux, le produit est divisible par $2 \times 3 = \mathbf{6}$.

---

## 📝 Mini-Quiz

1. $a \equiv b \pmod n$ signifie que :
   - $a$ est plus grand que $b$
   - $n$ divise $a - b$
   - $a$ est premier

2. Si $PGCD(a, b) = 1$, on dit que $a$ et $b$ sont :
   - Divisibles
   - Premiers entre eux
   - Égaux

3. Le Petit Théorème de Fermat s'applique si $p$ est :
   - Pair
   - Premier
   - Négatif

**Réponses :** 1. $n$ divise $a - b$ | 2. Premiers entre eux | 3. Premier

---

## Foire Aux Questions (FAQ)

**Q : À quoi sert l'arithmétique dans la vie quotidienne ?**
R : À chaque seconde ! Ton numéro de sécurité sociale (la clé de contrôle), les codes barres des produits (EAN), l'IBAN de ton compte bancaire... tous utilisent des calculs de congruences (modulo) pour vérifier qu'il n'y a pas d'erreur de saisie.

---

## 💡 Le savais-tu ?
La conjecture de Goldbach affirme que tout nombre pair plus grand que 2 est la somme de deux nombres premiers (ex: $10 = 3+7$, $20 = 13+7$). C'est un problème d'arithmétique posé en 1742 que personne n'a réussi à prouver jusqu'à aujourd'hui, malgré sa simplicité apparente !
