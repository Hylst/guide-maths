---
title: 'Chapitre 3 : Polynômes du Second Degré'
level: Lycee
subLevel: Premiere
order: 3
---
# Chapitre 3 : Polynômes du Second Degré

**Niveau** : Première (Spécialité Mathématiques)  
**Prérequis** : Calcul algébrique, identités remarquables, fonction carré.  
**Objectifs** : 
- Maîtriser les trois formes d'un polynôme du second degré (développée, canonique, factorisée).
- Calculer le discriminant $\Delta$ et trouver les racines.
- Étudier le signe d'un trinôme et résoudre des inéquations.

---

## Activités de découverte

**Activité : L'art de la trajectoire**

Lorsqu'un joueur de basket lance un ballon vers le panier, la trajectoire du ballon dans les airs décrit une courbe parfaite appelée **parabole**. L'équation mathématique qui modélise cette courbe est un **polynôme du second degré** de la forme $f(x) = ax^2 + bx + c$.

1. Imagine que le ballon soit lancé de l'origine $(0,0)$. Sa hauteur $h$ en fonction de la distance horizontale $d$ est donnée par $h(d) = -0,1d^2 + d$.
2. À quelle distance le ballon retombe-t-il au sol ? (Chercher $d$ tel que $h(d) = 0$).
3. Quelle est la hauteur maximale atteinte par le ballon ? (Chercher le sommet de la courbe).

---

## Rappels

Avant de commencer, révise :
- **Identités remarquables** : $(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, $(a-b)(a+b) = a^2 - b^2$.
- **Équations produit nul** : $A \times B = 0 \iff A = 0$ ou $B = 0$.
- **Fonction carré** : $f(x) = x^2$ est représentée par une parabole de sommet $(0,0)$.

---

## Explications et Théorie

### 1. Les trois formes du trinôme
Un polynôme du second degré (ou trinôme) peut s'écrire sous trois formes :
- **Forme développée** : $f(x) = ax^2 + bx + c$ (avec $a \neq 0$).
- **Forme canonique** : $f(x) = a(x - \alpha)^2 + \beta$.
  - Le point $S(\alpha ; \beta)$ est le **sommet** de la parabole.
  - $\alpha = \frac{-b}{2a}$ et $\beta = f(\alpha)$.
- **Forme factorisée** : $f(x) = a(x - x_1)(x - x_2)$ (si elle existe).
  - $x_1$ et $x_2$ sont les **racines** du polynôme.

### 2. Le Discriminant $\Delta$ et les Racines
Pour résoudre $ax^2 + bx + c = 0$, on calcule le discriminant :
$$\Delta = b^2 - 4ac$$
- **Si $\Delta > 0$** : Deux racines réelles distinctes : $x_1 = \frac{-b - \sqrt{\Delta}}{2a}$ et $x_2 = \frac{-b + \sqrt{\Delta}}{2a}$.
- **Si $\Delta = 0$** : Une racine double : $x_0 = \frac{-b}{2a}$.
- **Si $\Delta < 0$** : Aucune racine réelle.

![Générateur interactif de paraboles](./assets/parabole_racines.svg)

### 3. Signe du trinôme
Un trinôme du second degré est **du signe de $a$ à l'extérieur des racines**, et du signe contraire de $a$ entre les racines.
- Si $\Delta < 0$, le trinôme est toujours du signe de $a$.

### Méthodes pas-à-pas

**Comment résoudre une inéquation du second degré ?**
1. Tout passer du même côté pour avoir une expression comparée à 0.
2. Calculer $\Delta$ et trouver les racines de l'équation correspondante.
3. Dresser un tableau de signes en appliquant la règle "signe de $a$ à l'extérieur".
4. Conclure en donnant l'intervalle solution.

---

## Le saviez-vous ?

Le mot "algorithme" vient du nom d'un mathématicien perse du 9ème siècle, **Al-Khwarizmi**, qui a écrit le premier livre traitant systématiquement de la résolution des équations du second degré. À l'époque, il n'utilisait pas de symboles ($x, y, \Delta$) mais des phrases entières pour décrire les étapes de calcul !

---

## Exercices

### Exercices d'application directe

1. Calcule le discriminant de $f(x) = x^2 - 5x + 6$.
2. Détermine les racines de $2x^2 + 4x - 6 = 0$.
3. Donne la forme canonique de $g(x) = x^2 - 6x + 5$.

### Exercices d'entraînement

4. **Inéquation** : Résous dans $\mathbb{R}$ l'inéquation $-x^2 + 3x + 4 > 0$.
5. **Sommet** : Trouve les coordonnées du sommet de la parabole d'équation $y = 3x^2 - 12x + 7$.
6. **Factorisation** : Factorise le trinôme $h(x) = 4x^2 - 8x + 4$.

### Problèmes ouverts

7. **Le rectangle** : Un rectangle a un périmètre de 30 cm et une aire de 54 cm². Quelles sont ses dimensions ?

---

## Exercices corrigés

**Exercice 1 :**
$\Delta = (-5)^2 - 4(1)(6) = 25 - 24 = \mathbf{1}$.

**Exercice 2 :**
$\Delta = 4^2 - 4(2)(-6) = 16 + 48 = 64$.
$x_1 = \frac{-4-8}{4} = \mathbf{-3}$ ; $x_2 = \frac{-4+8}{4} = \mathbf{1}$.

**Exercice 3 :**
$\alpha = \frac{-(-6)}{2} = 3$. $\beta = g(3) = 3^2 - 6(3) + 5 = 9 - 18 + 5 = -4$.
Forme canonique : $\mathbf{(x-3)^2 - 4}$.

**Exercice 4 :**
Racines de $-x^2 + 3x + 4 = 0$ : $\Delta = 25$. $x_1 = -1, x_2 = 4$.
$a = -1$ (négatif). Le trinôme est positif entre les racines.
$S = \mathbf{]-1 ; 4[}$.

**Exercice 5 :**
$\alpha = \frac{-(-12)}{2 \times 3} = 2$. $\beta = f(2) = 3(2^2) - 12(2) + 7 = 12 - 24 + 7 = -5$.
Sommet : $\mathbf{S(2 ; -5)}$.

**Exercice 6 :**
$\Delta = (-8)^2 - 4(4)(4) = 64 - 64 = 0$. Racine double $x_0 = \frac{8}{8} = 1$.
$h(x) = 4(x-1)^2$.

**Exercice 7 :**
Soit $x$ et $y$ les côtés. $2(x+y) = 30 \implies y = 15-x$.
Aire $x(15-x) = 54 \implies -x^2 + 15x - 54 = 0$.
$\Delta = 15^2 - 4(-1)(-54) = 225 - 216 = 9$.
$x_1 = \frac{-15-3}{-2} = 9$ ; $x_2 = \frac{-15+3}{-2} = 6$.
Les dimensions sont **9 cm et 6 cm**.

---

## Synthèse

- **$\Delta = b^2 - 4ac$** : Détermine le nombre de racines.
- **Signe de $a$** : Détermine si la parabole est tournée vers le haut ($a>0$) ou vers le bas ($a<0$).
- **Sommet $S(\alpha ; \beta)$** : Point le plus haut ou le plus bas de la courbe.
- **Inéquations** : Utiliser le signe de $a$ à l'extérieur des racines.

---




---

## Pour aller plus loin

**Les nombres complexes**
Que se passe-t-il quand $\Delta < 0$ ? Au lycée, on dit qu'il n'y a pas de solution. Mais plus tard, tu découvriras les **nombres complexes** et le nombre imaginaire $i$ tel que $i^2 = -1$. Dans cet ensemble, toutes les équations du second degré ont des solutions, même quand $\Delta$ est négatif !

---

## FAQ

**Q : Pourquoi $\Delta$ s'appelle le "discriminant" ?**
**R** : Parce qu'il permet de "discriminer" (distinguer) les différents cas possibles pour le nombre de racines.

**Q : Comment savoir si une parabole a un maximum ou un minimum ?**
**R** : Regarde le signe de $a$. Si $a > 0$, la parabole est "contente" (tournée vers le haut), elle a un **minimum**. Si $a < 0$, elle est "triste" (tournée vers le bas), elle a un **maximum**.

---

## 📝 Mini-Quiz

**Question 1 : Comment s'appelle la courbe représentative d'une fonction polynôme du second degré ?**
- [ ] Une hyperbole
- [ ] Une droite
- [x] Une parabole
- [ ] Un cercle
> **Explication :** La représentation graphique d'une fonction de la forme ax² + bx + c est une parabole.

**Question 2 : Si le discriminant (Delta) est strictement négatif (Δ < 0), combien l'équation ax² + bx + c = 0 a-t-elle de solutions réelles ?**
- [ ] Deux
- [ ] Une
- [ ] Une infinité
- [x] Aucune
> **Explication :** Si Δ < 0, l'équation n'admet aucune solution réelle car on ne peut pas prendre la racine carrée d'un nombre négatif dans les réels.

