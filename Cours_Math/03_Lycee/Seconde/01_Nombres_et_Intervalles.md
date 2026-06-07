---
title: 'Chapitre 1 : Nombres et Intervalles'
level: Lycee
subLevel: Seconde
order: 1
---
# Chapitre 1 : Nombres et Intervalles

**Niveau** : Seconde  
**Prérequis** : Nombres décimaux, fractions, inégalités (Collège).  
**Objectifs** : 
- Connaître les différents ensembles de nombres et leurs inclusions.
- Manipuler les intervalles de $\mathbb{R}$ (intersection, réunion).
- Comprendre et utiliser la valeur absolue comme distance.

---

## Activités de découverte

**Activité : La précision des mesures**

Dans la vie courante, quand un ingénieur usine une pièce de moteur, il ne peut pas la fabriquer à $5\text{ cm}$ "pile". Il a une tolérance : la pièce doit mesurer entre $4,98\text{ cm}$ et $5,02\text{ cm}$. 

1. Comment pourrais-tu noter cet ensemble de valeurs possibles sans écrire une phrase entière ?
2. Si une autre pièce doit mesurer entre $5,00\text{ cm}$ et $5,05\text{ cm}$, quelles sont les mesures qui conviennent pour les deux pièces à la fois ?
3. Quelles sont les mesures qui conviennent pour au moins l'une des deux pièces ?

---

## Rappels

Avant de commencer, révise :
- **Inégalités** : $a < b$ signifie que $a$ est strictement plus petit que $b$. $a \le b$ signifie que $a$ est plus petit ou égal à $b$.
- **Fractions** : $\frac{1}{3} \approx 0,333...$ (ne s'arrête jamais).
- **Nombres négatifs** : $-5$ est plus petit que $-2$.

---

## Explications et Théorie

### 1. Les ensembles de nombres
Les nombres sont classés dans des ensembles emboîtés :
- **$\mathbb{N}$ (Naturels)** : $\{0, 1, 2, ...\}$ (Pour compter).
- **$\mathbb{Z}$ (Relatifs)** : $\{..., -2, -1, 0, 1, 2, ...\}$ (Entiers positifs et négatifs).
- **$\mathbb{D}$ (Décimaux)** : Nombres dont l'écriture décimale s'arrête (ex: $1,5$).
- **$\mathbb{Q}$ (Rationnels)** : Nombres pouvant s'écrire $\frac{a}{b}$ (ex: $\frac{1}{3}$).
- **$\mathbb{R}$ (Réels)** : Tous les nombres de la droite graduée (ex: $\pi, \sqrt{2}$).
**Inclusion** : $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{D} \subset \mathbb{Q} \subset \mathbb{R}$.

### 2. Les Intervalles
Un intervalle est une "portion" continue de la droite des réels.
- **$[a ; b]$** : Fermé (contient $a$ et $b$). $a \le x \le b$.
- **$]a ; b[$** : Ouvert (exclut $a$ et $b$). $a < x < b$.
- **$[a ; +\infty[$** : Demi-droite. $x \ge a$. (L'infini est toujours ouvert).

### 3. Intersection et Réunion
- **Intersection ($I \cap J$)** : Nombres qui sont dans $I$ **ET** dans $J$.
- **Réunion ($I \cup J$)** : Nombres qui sont dans $I$ **OU** dans $J$.

### 4. Valeur Absolue
La valeur absolue d'un nombre $x$, notée $|x|$, est sa distance à zéro.
- $|x| = x$ si $x \ge 0$.
- $|x| = -x$ si $x < 0$.
- $|x - a|$ représente la distance entre $x$ et $a$.

### Méthodes pas-à-pas

**Comment déterminer l'intersection de deux intervalles ?**
1. Tracer une droite graduée.
2. Colorier le premier intervalle en bleu et le deuxième en rouge.
3. L'intersection est la zone où les deux couleurs se superposent.
4. Faire attention aux crochets : si un nombre est exclu d'un seul intervalle, il est exclu de l'intersection.

---

## Le saviez-vous ?

Le symbole de l'infini ($\infty$) a été utilisé pour la première fois en mathématiques par John Wallis en 1655. On l'appelle aussi la "lemniscate". En mathématiques, il existe plusieurs "tailles" d'infini ! Par exemple, il y a "plus" de nombres réels qu'il n'y a de nombres entiers, même si les deux ensembles sont infinis.

---

## Exercices

### Exercices d'application directe

1. À quel ensemble le plus petit appartient $-4$ ? Et $\frac{3}{4}$ ?
2. Traduis $x \in ]-2 ; 5]$ par une double inégalité.
3. Calcule $|-7|$ et $|5 - 8|$.

### Exercices d'entraînement

4. **Intervalles** : Soit $I = [-3 ; 4]$ et $J = ]0 ; 7]$. Détermine $I \cap J$ et $I \cup J$.
5. **Valeur absolue** : Résous l'équation $|x - 3| = 5$. (Cherche les nombres dont la distance à 3 est égale à 5).
6. **Ensembles** : Vrai ou Faux ? $\mathbb{Q} \subset \mathbb{D}$. Justifie.

### Problèmes ouverts

7. **Le radar** : Un radar de vitesse a une marge d'erreur de 5%. Si tu roules à 110 km/h, dans quel intervalle se situe ta vitesse réelle mesurée par le radar ?

---

## Exercices corrigés

**Exercice 1 :**
$-4 \in \mathbf{\mathbb{Z}}$ (Entier relatif). $\frac{3}{4} = 0,75 \in \mathbf{\mathbb{D}}$ (Décimal).

**Exercice 2 :**
$\mathbf{-2 < x \le 5}$.

**Exercice 3 :**
$|-7| = \mathbf{7}$. $|5 - 8| = |-3| = \mathbf{3}$.

**Exercice 4 :**
$I \cap J = \mathbf{]0 ; 4]}$. $I \cup J = \mathbf{[-3 ; 7]}$.

**Exercice 5 :**
La distance entre $x$ et 3 est 5. Les solutions sont $3-5 = \mathbf{-2}$ et $3+5 = \mathbf{8}$.

**Exercice 6 :**
**Faux**. C'est l'inverse : $\mathbb{D} \subset \mathbb{Q}$. Tous les décimaux sont des fractions (ex: $0,5 = 1/2$), mais toutes les fractions ne sont pas des décimaux (ex: $1/3 \approx 0,333...$).

**Exercice 7 :**
5% de 110 est $110 \times 0,05 = 5,5$.
L'intervalle est $[110 - 5,5 ; 110 + 5,5] = \mathbf{[104,5 ; 115,5]}$.

---

## Synthèse

- **Ensembles** : $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{D} \subset \mathbb{Q} \subset \mathbb{R}$.
- **Intervalles** : $[a ; b]$ (fermé), $]a ; b[$ (ouvert).
- **$\cap$ (Intersection)** : "ET".
- **$\cup$ (Réunion)** : "OU".
- **Valeur absolue** : Distance à zéro ou entre deux points.

---

## 📝 Mini-Quiz

**Question 1 : $\pi$ est un nombre rationnel.**
- [ ] Vrai
- [x] Faux
> **Explication :** La bonne réponse est : Faux (irrationnel)

**Question 2 : L'intersection de $]-\infty ; 5]$ et $[5 ; +\infty[$ est le nombre $\{5\}$.**
- [x] Vrai
- [ ] Faux
> **Explication :** La bonne réponse est : Vrai

**Question 3 : $|x|$ est toujours un nombre positif.**
- [x] Vrai
- [ ] Faux
> **Explication :** La bonne réponse est : Vrai.


---

## Pour aller plus loin

**Les nombres irrationnels célèbres**
Il n'y a pas que $\pi$ et $\sqrt{2}$ ! Le nombre d'or ($\phi \approx 1,618$) ou le nombre $e$ ($\approx 2,718$) sont des nombres réels qui ne peuvent pas s'écrire sous forme de fraction. On les appelle des nombres irrationnels. Leur découverte par les Grecs anciens a provoqué une véritable crise car ils pensaient que tout pouvait s'expliquer par des rapports de nombres entiers !

---

## FAQ

**Q : Pourquoi le crochet est-il toujours ouvert sur l'infini ?**
**R** : Parce que l'infini n'est pas un nombre que l'on peut atteindre. C'est une limite, un concept. On ne peut donc jamais l'inclure dans un intervalle.

**Q : Quelle est la différence entre $\mathbb{Q}$ et $\mathbb{R}$ ?**
**R** : $\mathbb{Q}$ contient tous les nombres qui peuvent s'écrire comme une fraction de deux entiers. $\mathbb{R}$ contient TOUS les nombres de la droite, y compris ceux qui ne sont pas des fractions (les irrationnels).

---

## Mini-Quiz

1. Lequel de ces nombres est un entier naturel ?
   - -2
   - 0
   - 1,5

2. L'intervalle correspondant à $x > 3$ est :
   - $[3 ; +\infty[$
   - $]3 ; +\infty[$
   - $]-\infty ; 3[$

3. $|-10| + |5|$ est égal à :
   - -5
   - 5
   - 15

4. L'union de $[1 ; 3]$ et $[2 ; 5]$ est :
   - $[2 ; 3]$
   - $[1 ; 5]$
   - $]1 ; 5[$

**Réponses :** 1. 0 | 2. $]3 ; +\infty[$ | 3. 15 | 4. $[1 ; 5]$
