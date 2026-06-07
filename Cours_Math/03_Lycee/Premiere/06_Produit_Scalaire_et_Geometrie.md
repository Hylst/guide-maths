---
title: 'Chapitre 6 : Produit Scalaire et Géométrie'
level: Lycee
subLevel: Premiere
order: 6
---
# Chapitre 6 : Produit Scalaire et Géométrie

**Niveau** : Première (Spécialité Mathématiques)  
**Prérequis** : Vecteurs, coordonnées, trigonométrie (cosinus).  
**Objectifs** : 
- Calculer le produit scalaire de deux vecteurs par ses différentes expressions (analytique, norme, projection).
- Utiliser le produit scalaire pour démontrer une orthogonalité (angle droit).
- Utiliser le théorème d'Al-Kashi (cosinus) pour résoudre des problèmes dans les triangles quelconques.
- Trouver l'équation cartésienne d'une droite avec son vecteur normal.
- Trouver l'équation cartésienne d'un cercle.

---

## Activités de découverte

**Activité : Pousser un wagon**
Imagine que tu pousses un wagonnet sur des rails (direction horizontale). 
- Si tu pousses exactement dans le sens des rails (angle de 0°), 100% de ta force sert à avancer.
- Si tu pousses de travers avec un angle de 60°, seule une **partie** (la projection) de ta force sert à avancer. L'autre partie "écrase" le wagon contre les rails, sans utilité.
- Si tu pousses perpendiculairement (angle de 90°), tu as beau pousser de toutes tes forces, le wagon n'avance pas !
Ce "rendement d'un l'effort" entre deux directions définies par des vecteurs s'appelle, en physique comme en maths, le **Produit Scalaire** !

---

## Rappels

Avant de commencer, révise :
- **Norme d'un vecteur** : La longueur du vecteur $\vec{u}(x ; y)$ est $||\vec{u}|| = \sqrt{x^2 + y^2}$.
- **Vecteurs orthogonaux** : Des vecteurs portés par des droites perpendiculaires.

---

## Explications et Théorie

### 1. Définition du Produit Scalaire
Le produit scalaire de deux vecteurs $\vec{u}$ et $\vec{v}$ est un **nombre réel** (pas un vecteur !), noté $\vec{u} \cdot \vec{v}$.
**Expressions :**
- **Géométrique** : $\vec{u} \cdot \vec{v} = ||\vec{u}|| \times ||\vec{v}|| \times \cos(\vec{u}, \vec{v})$.
- **Analytique** (Base orthonormée) : $\vec{u} \cdot \vec{v} = xx' + yy'$.
- **Projection** : $\vec{AB} \cdot \vec{AC} = \pm AB \times AH$ (où $H$ est le projeté de $C$ sur $(AB)$).

### 2. Orthogonalité
Deux vecteurs $(\vec{u}, \vec{v})$ non nuls sont orthogonaux si et seulement si leur produit scalaire est nul ($\vec{u} \cdot \vec{v} = 0$).

### 3. Applications géométriques
- **Vecteur Normal** : Si une droite a pour équation $ax + by + c = 0$, alors $\vec{n}(a ; b)$ est un vecteur normal à cette droite (il lui est perpendiculaire).
- **Équation de Cercle** : Un cercle de centre $C(x_C ; y_C)$ et de rayon $R$ a pour équation $(x - x_C)^2 + (y - y_C)^2 = R^2$.
- **Al-Kashi** : $a^2 = b^2 + c^2 - 2bc \cos(\widehat{A})$. C'est Pythagore pour les triangles quelconques.

---

## Exples Pratiques (pas-à-pas)

### Démontrer une perpendicularité
Soient $\vec{u}(3 ; 1)$ et $\vec{v}(-1 ; 3)$.
$\vec{u} \cdot \vec{v} = 3 \times (-1) + 1 \times 3 = -3 + 3 = \mathbf{0}$.
Les vecteurs sont donc orthogonaux.

### Trouver une longueur avec Al-Kashi
Dans un triangle $ABC$, $b=7, c=5, \widehat{A}=60^\circ$.
$a^2 = 7^2 + 5^2 - 2 \times 7 \times 5 \times \cos(60^\circ)$
$a^2 = 49 + 25 - 70 \times 0,5 = 74 - 35 = 39$.
$a = \mathbf{\sqrt{39}}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
On donne $\vec{u}(4 ; -2)$ et $\vec{v}(1 ; 2)$. Calcule leur produit scalaire. Les vecteurs sont-ils orthogonaux ?

**🔵 Exercice 2 (Moyen)**
Donne l'équation cartésienne de la droite passant par $A(1 ; 2)$ et de vecteur normal $\vec{n}(3 ; -1)$.

**🟠 Exercice 3 (Difficile)**
Donne le centre et le rayon du cercle d'équation $x^2 + y^2 - 4x + 6y - 3 = 0$.

---

## Exercices corrigés

**Exercice 1 :**
$\vec{u} \cdot \vec{v} = 4 \times 1 + (-2) \times 2 = 4 - 4 = \mathbf{0}$. **Oui**, ils sont orthogonaux.

**Exercice 2 :**
L'équation est de la forme $3x - y + c = 0$.
Avec $A(1;2)$ : $3(1) - 2 + c = 0 \implies 3 - 2 + c = 0 \implies c = -1$.
Équation : **$3x - y - 1 = 0$**.

**Exercice 3 :**
$(x^2 - 4x) + (y^2 + 6y) - 3 = 0$
$(x-2)^2 - 4 + (y+3)^2 - 9 - 3 = 0$
$(x-2)^2 + (y+3)^2 = 16$.
Centre **$C(2 ; -3)$**, Rayon **$R = 4$**.

---

## 📝 Mini-Quiz

1. Si $\vec{u} \cdot \vec{v} = 0$, alors $\vec{u}$ et $\vec{v}$ sont :
   - Parallèles
   - Orthogonaux
   - De même longueur

2. Le produit scalaire est :
   - Un vecteur
   - Un nombre réel
   - Une matrice

3. L'équation $(x-1)^2 + y^2 = 9$ décrit un cercle de rayon :
   - 9
   - 3
   - 1

**Réponses :** 1. Orthogonaux | 2. Un nombre réel | 3. 3

---

## Foire Aux Questions (FAQ)

**Q : À quoi ça sert en pratique de projeter un vecteur ?**
R : En physique, cela permet de calculer le "travail" d'une force. Seule la composante de la force qui est dans la direction du mouvement produit un travail utile.

---

## 💡 Le savais-tu ?
Le produit scalaire est à la base des algorithmes de recommandation (comme Netflix ou Spotify). En représentant tes goûts sous forme de vecteurs, l'ordinateur calcule le "cosinus" entre ton vecteur et celui d'un contenu. Plus le produit scalaire est élevé, plus le contenu est proche de tes goûts !
