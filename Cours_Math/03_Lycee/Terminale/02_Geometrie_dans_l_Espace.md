---
title: 'Chapitre 2 : Géométrie dans l''Espace'
level: Lycee
subLevel: Terminale
order: 2
---
# Chapitre 2 : Géométrie dans l'Espace

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Vecteurs du plan, produit scalaire, systèmes d'équations.  
**Objectifs** : 
- Manipuler des vecteurs dans un repère de l'espace $(O; \vec{i}, \vec{j}, \vec{k})$.
- Déterminer la représentation paramétrique d'une droite.
- Déterminer l'équation cartésienne d'un plan à l'aide d'un vecteur normal.
- Calculer des intersections (droite/plan).

---

## Activités de découverte

**Activité : La 3D dans les jeux vidéo**

Comment un moteur de jeu vidéo (comme Unreal Engine) calcule-t-il si un tir de laser (une droite) touche un mur (un plan) ? 

1. **Le repère** : En 2D, on a $x$ et $y$. Quelle lettre utilise-t-on pour la troisième dimension (profondeur ou altitude) ?
2. **La droite** : Si un laser part du point $A(0;0;0)$ et suit le vecteur $\vec{u}(1;1;1)$, quelles seront ses coordonnées après 2 secondes ? Et après $t$ secondes ?
3. **Le plan** : Imagine une feuille de papier posée sur une table. Comment pourrais-tu définir sa direction à l'aide d'un seul vecteur "perpendiculaire" à la feuille ?

---

## Rappels

Avant de commencer, révise :
- **Vecteurs** : $\vec{u} + \vec{v}$, $k\vec{u}$.
- **Produit scalaire en 2D** : $xx' + yy'$.
- **Orthogonalité** : $\vec{u} \cdot \vec{v} = 0 \iff \vec{u} \perp \vec{v}$.

---

## Explications et Théorie

### 1. Vecteurs dans l'espace
Dans un repère $(O; \vec{i}, \vec{j}, \vec{k})$, un vecteur $\vec{u}$ a 3 coordonnées $(x; y; z)$.
- **Norme** : $||\vec{u}|| = \sqrt{x^2 + y^2 + z^2}$.
- **Produit scalaire** : $\vec{u} \cdot \vec{v} = xx' + yy' + zz'$.

### 2. Droites de l'espace
Une droite $D$ passant par $A(x_A; y_A; z_A)$ et de vecteur directeur $\vec{u}(a; b; c)$ est définie par sa **représentation paramétrique** :
$$
\begin{cases}
x = x_A + ta \\
y = y_A + tb \\
z = z_A + tc
\end{cases}
\quad (t \in \mathbb{R})
$$

### 3. Plans de l'espace
Un plan $P$ est défini par un point $A$ et un **vecteur normal** $\vec{n}(a; b; c)$ (perpendiculaire au plan).
- **Équation cartésienne** : $ax + by + cz + d = 0$.
- Les coefficients $(a, b, c)$ sont les coordonnées du vecteur normal $\vec{n}$.

### 4. Intersections
- **Droite / Plan** : On remplace $x, y, z$ de la droite dans l'équation du plan pour trouver $t$.
- **Plan / Plan** : L'intersection est soit vide (parallèles), soit un plan (confondus), soit une droite.

### Méthodes pas-à-pas

**Comment trouver l'équation d'un plan passant par A et de vecteur normal n ?**
1. Écrire la forme générale : $ax + by + cz + d = 0$.
2. Remplacer $a, b, c$ par les coordonnées de $\vec{n}$.
3. Utiliser les coordonnées du point $A$ pour trouver la valeur de $d$ (en résolvant l'équation).
4. Écrire l'équation finale.

---

## Le saviez-vous ?

En géométrie de l'espace, deux droites qui ne se croisent pas ne sont pas forcément parallèles ! Elles peuvent être **non coplanaires** : imagine une route qui passe sur un pont et une autre route qui passe dessous. Elles n'ont aucun point commun, mais elles ne vont pas dans la même direction. C'est une grande différence avec la géométrie plane !

---

## Exercices

### Exercices d'application directe

1. Calcule la norme de $\vec{u}(2; -1; 2)$.
2. Donne un vecteur normal au plan $3x - y + 2z - 5 = 0$.
3. Écris la représentation paramétrique de la droite passant par $A(1; 2; 3)$ et de vecteur $\vec{u}(0; 1; -1)$.

### Exercices d'entraînement

4. **Plan** : Trouve l'équation du plan passant par $A(1; 1; 1)$ et de vecteur normal $\vec{n}(2; -1; 3)$.
5. **Intersection** : La droite $x=t, y=2t, z=1-t$ coupe-t-elle le plan $x+y+z=5$ ? Si oui, en quel point ?
6. **Orthogonalité** : Les vecteurs $\vec{u}(1; 2; 3)$ et $\vec{v}(-2; 1; 0)$ sont-ils orthogonaux ?

### Problèmes ouverts

7. **Le cube** : Dans un cube $ABCDEFGH$, on considère le repère $(A; \vec{AB}, \vec{AD}, \vec{AE})$. Quelles sont les coordonnées du point $G$ ? Détermine une équation du plan $(BDE)$.

---

## Exercices corrigés

**Exercice 1 :**
$||\vec{u}|| = \sqrt{2^2 + (-1)^2 + 2^2} = \sqrt{4 + 1 + 4} = \sqrt{9} = \mathbf{3}$.

**Exercice 2 :**
$\mathbf{\vec{n}(3; -1; 2)}$.

**Exercice 3 :**
$x = 1$, $y = 2 + t$, $z = 3 - t$.

**Exercice 4 :**
$2x - y + 3z + d = 0$. Avec $A(1;1;1)$ : $2(1) - 1 + 3(1) + d = 0 \implies 4 + d = 0 \implies d = -4$.
Équation : $\mathbf{2x - y + 3z - 4 = 0}$.

**Exercice 5 :**
$t + 2t + (1-t) = 5 \implies 2t + 1 = 5 \implies 2t = 4 \implies t = 2$.
Point : $x=2, y=4, z=-1$. Soit $\mathbf{I(2; 4; -1)}$.

**Exercice 6 :**
$\vec{u} \cdot \vec{v} = 1(-2) + 2(1) + 3(0) = -2 + 2 = 0$. **Oui**, ils sont orthogonaux.

**Exercice 7 :**
$G$ est à l'opposé de $A$, ses coordonnées sont $\mathbf{(1; 1; 1)}$.
Pour le plan $(BDE)$, on cherche un vecteur normal $\vec{n}(a;b;c)$ orthogonal à $\vec{BE}$ et $\vec{BD}$... (Calcul plus long, mais l'idée est là).

---

## Synthèse

- **Vecteur normal** : $\vec{n}(a; b; c) \perp$ Plan.
- **Équation Plan** : $ax + by + cz + d = 0$.
- **Droite** : Système avec un paramètre $t$.
- **Intersection** : Résoudre le système combiné.

---

## 📝 Mini-Quiz

**Question 1 : Deux plans parallèles ont des vecteurs normaux colinéaires.**
- [x] Vrai
- [ ] Faux
> **Explication :** La bonne réponse est : Vrai

**Question 2 : Une droite est définie par un seul point.**
- [ ] Vrai
- [x] Faux
> **Explication :** La bonne réponse est : Faux (il faut aussi une direction)

**Question 3 : Le produit scalaire de deux vecteurs orthogonaux est nul.**
- [x] Vrai
- [ ] Faux
> **Explication :** La bonne réponse est : Vrai.


---

## Pour aller plus loin

**Le produit vectoriel**
Il existe une autre opération entre deux vecteurs dans l'espace : le **produit vectoriel** (noté $\vec{u} \wedge \vec{v}$). Contrairement au produit scalaire qui donne un nombre, le produit vectoriel donne un **nouveau vecteur** qui est perpendiculaire aux deux premiers ! C'est l'outil idéal pour trouver facilement un vecteur normal à un plan quand on connaît deux vecteurs du plan.

---

## FAQ

**Q : Comment savoir si une droite est incluse dans un plan ?**
**R** : Il faut que son vecteur directeur soit orthogonal au vecteur normal du plan ($\vec{u} \cdot \vec{n} = 0$) ET qu'un point de la droite appartienne au plan.

**Q : Qu'est-ce qu'un repère orthonormé ?**
**R** : C'est un repère où les trois vecteurs de base ($\vec{i}, \vec{j}, \vec{k}$) sont de norme 1 et sont tous perpendiculaires entre eux. C'est le repère standard pour faire des calculs de distances et d'angles.

---

## Mini-Quiz

1. Le vecteur normal au plan $z = 0$ (le sol) est :
   - $(1; 0; 0)$
   - $(0; 1; 0)$
   - $(0; 0; 1)$

2. La distance entre $A(0;0;0)$ et $B(1;1;1)$ est :
   - 1
   - 3
   - $\sqrt{3}$

3. Si $\vec{u} \cdot \vec{n} = 0$, alors la droite de vecteur $\vec{u}$ est :
   - Perpendiculaire au plan de vecteur normal $\vec{n}$
   - Parallèle au plan de vecteur normal $\vec{n}$
   - Incluse dans le plan

4. Combien de coordonnées a un point dans l'espace ?
   - 2
   - 3
   - 4

**Réponses :** 1. $(0; 0; 1)$ | 2. $\sqrt{3}$ | 3. Parallèle au plan | 4. 3
