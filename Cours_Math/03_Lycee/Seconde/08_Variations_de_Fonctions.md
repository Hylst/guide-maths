---
title: 'Chapitre 8 : Variations de Fonctions'
level: Lycee
subLevel: Seconde
order: 8
---
# Chapitre 8 : Variations de Fonctions

**Niveau** : Seconde (Lycée)  
**Prérequis** : Notions de fonctions (image, antécédent), lecture de graphiques, fonctions de référence.  
**Objectifs** : 
- Décrire le comportement d'une fonction (croissance, décroissance, constance).
- Utiliser la définition mathématique de la croissance et de la décroissance.
- Dresser un tableau de variations complet.
- Identifier et utiliser les extremums (maximum, minimum) d'une fonction.

---

## Activités de découverte

**Activité : Le trajet des montagnes russes**
Imagine le profil d'une attraction dans un parc. Le wagon part d'une hauteur de 20m, monte jusqu'à 50m, redescend à 5m, puis finit sa course à 10m.
1. Sur quels intervalles de temps le wagon "monte"-t-il ?
2. Quel est le point le plus haut atteint ? Et le plus bas ?
3. On peut résumer tout ce voyage par un simple tableau avec des flèches qui montent et qui descendent. C'est l'essence du **tableau de variations**.

---

## Rappels

Avant de commencer, révise :
- **Image** : La valeur de $y$ pour un $x$ donné. On écrit $f(x)$.
- **Antécédent** : La valeur de $x$ qui donne un certain $y$.
- **Intervalle** : Une portion de la droite numérique, notée par exemple $[1 ; 5]$.

---

## Explications et Théorie

### 1. Sens de variation : Définitions
Soit $f$ une fonction définie sur un intervalle $I$.
- **Fonction Croissante** : Une fonction est croissante si elle "conserve l'ordre". Si $x_1 < x_2$, alors $f(x_1) < f(x_2)$. Plus $x$ augmente, plus $f(x)$ augmente.
- **Fonction Décroissante** : Une fonction est décroissante si elle "inverse l'ordre". Si $x_1 < x_2$, alors $f(x_1) > f(x_2)$. Plus $x$ augmente, plus $f(x)$ diminue.

### 2. Le Tableau de Variations
C'est un résumé schématique de la fonction. Il comporte deux lignes :
- La première ligne indique les valeurs de $x$ (bornes de l'intervalle et valeurs où le sens change).
- La deuxième ligne indique le sens de variation à l'aide de flèches (oblique vers le haut pour croissante, vers le bas pour décroissante). Les valeurs des images aux points clés sont indiquées au bout des flèches.

### 3. Les Extremums
- **Maximum** : C'est la valeur la plus haute atteinte par la fonction sur un intervalle. On dit que $M$ est le maximum de $f$ sur $I$ si pour tout $x \in I$, $f(x) \leq M$.
- **Minimum** : C'est la valeur la plus basse. On dit que $m$ est le minimum de $f$ sur $I$ si pour tout $x \in I$, $f(x) \geq m$.

### 4. Comparer des images
Grâce aux variations, on peut comparer deux images sans faire de calcul !
*Exemple :* Si on sait que $f$ est croissante sur $[0 ; 10]$, alors on sait d'office que $f(2) < f(5)$ car $2 < 5$.

---

## Exemples Pratiques (pas-à-pas)

### Dresser un tableau de variations à partir d'une courbe
Imagine une courbe qui part de $(-3 ; 0)$, monte jusqu'à $(-1 ; 4)$, descend jusqu'à $(2 ; -2)$ et finit en $(5 ; 1)$.
1. **Identifier les intervalles** : La fonction monte sur $[-3 ; -1]$, descend sur $[-1 ; 2]$ et remonte sur $[2 ; 5]$.
2. **Placer les valeurs de $x$** : Sur la première ligne, on écrit $-3$, $-1$, $2$, $5$.
3. **Dessiner les flèches** : Une flèche qui monte de $0$ à $4$, une qui descend de $4$ à $-2$, une qui remonte de $-2$ à $1$.
4. **Lire les extremums** : Le maximum est $4$ (atteint en $x = -1$). Le minimum est $-2$ (atteint en $x = 2$).

---

## Exercices

**🟢 Exercice 1 (Facile)**
Soit une fonction $g$ décroissante sur l'intervalle $[0 ; 5]$. Compare $g(1)$ et $g(4)$.

**🔵 Exercice 2 (Moyen)**
Dresse le tableau de variations d'une fonction $h$ définie sur $[-5 ; 5]$ sachant que :
- $h$ est croissante sur $[-5 ; 0]$ et $h(-5) = -2$, $h(0) = 3$.
- $h$ est décroissante sur $[0 ; 5]$ et $h(5) = -4$.
Quel est le maximum de $h$ sur cet intervalle ?

**🟠 Exercice 3 (Difficile)**
On considère la fonction carrée $f(x) = x^2$ sur l'intervalle $[-2 ; 3]$. 
1. Rappelle le sens de variation de la fonction carrée sur les négatifs et sur les positifs.
2. Dresse son tableau de variations complet sur $[-2 ; 3]$.
3. Quel est son minimum ? Son maximum ?

**🔴 Exercice 4 (Défi)**
Démontre, en utilisant la définition mathématique (avec $x_1$ et $x_2$), que la fonction affine $f(x) = -3x + 5$ est décroissante sur $\mathbb{R}$.

---

## Exercices Corrigés

**Exercice 1 :**
Puisque $g$ est décroissante sur $[0 ; 5]$, elle "inverse l'ordre". Or $1 < 4$, donc **$g(1) > g(4)$**.

**Exercice 2 :**
La fonction a un seul pic en $x = 0$. Le **maximum de $h$ est 3**.
Tableau :
x : -5 -> 0 -> 5
h : -2 (monte) 3 (descend) -4

**Exercice 3 :**
1. La fonction carrée est décroissante sur les négatifs et croissante sur les positifs.
2. Sur $[-2 ; 0]$, la fonction passe de $f(-2)=4$ à $f(0)=0$ (en décroissant). Sur $[0 ; 3]$, elle passe de $f(0)=0$ à $f(3)=9$ (en croissant).
3. Le **minimum est 0** (atteint en $x=0$). Le **maximum est 9** (atteint en $x=3$).

**Exercice 4 :**
Soit $x_1 < x_2$.
On multiplie par $-3$ (attention, on change le sens de l'inégalité car $-3$ est négatif) :
$-3x_1 > -3x_2$
On ajoute $5$ de chaque côté :
$-3x_1 + 5 > -3x_2 + 5$
C'est-à-dire : **$f(x_1) > f(x_2)$**.
La fonction "inverse l'ordre", elle est donc **décroissante**.

---

## 📝 Mini-Quiz

1. Un tableau de variations permet de lire :
   - L'aire sous la courbe
   - Les extremums
   - L'équation de la fonction

2. Une fonction croissante :
   - Inverse l'ordre
   - Conserve l'ordre
   - Passe par zéro

3. Le sommet d'une courbe en "cloche" est :
   - Un minimum
   - Un maximum
   - Un antécédent

**Réponses :** 1. Les extremums | 2. Conserve l'ordre | 3. Un maximum

---

## Foire Aux Questions (FAQ)

**Q : Est-ce qu'une fonction peut être à la fois croissante et décroissante ?**
R : Non, pas sur le même intervalle (sauf si elle est constante, auquel cas elle ne monte ni ne descend). Par contre, elle peut changer de sens plusieurs fois sur son ensemble de définition total.

---

## 💡 Le savais-tu ?
L'étude des variations est fondamentale pour l'optimisation. Dans l'industrie, on cherche souvent à trouver le "minimum" d'une fonction de coût (pour dépenser le moins possible) ou le "maximum" d'une fonction de profit ou de rendement énergétique. C'est le point où la "pente" de la courbe s'annule avant de repartir dans l'autre sens !

---
