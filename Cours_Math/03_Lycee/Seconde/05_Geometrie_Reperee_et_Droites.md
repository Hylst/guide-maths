---
title: 'Chapitre 5 : Géométrie Repérée et Droites'
level: Lycee
subLevel: Seconde
order: 5
---
# Chapitre 5 : Géométrie Repérée et Droites

**Niveau** : Seconde (Lycée)  
**Prérequis** : Fonctions affines, coordonnées dans un repère, vecteurs du plan.  
**Objectifs** : 
- Passer de l'équation réduite à l'équation cartésienne d'une droite, et inversement.
- Utiliser un vecteur directeur pour caractériser une droite.
- Étudier la position relative de deux droites (sécantes, parallèles).
- Résoudre un système de deux équations linéaires à deux inconnues.

---

## Activités de découverte

**Activité : Les trajectoires croisées**
Deux navires se déplacent en ligne droite sur une carte radar. 
- La trajectoire du navire A suit la relation : $y = 2x - 3$.
- La trajectoire du navire B suit la relation : $3x + y = 12$.
1. Ces deux droites vont-elles se croiser ? Les mathématiques permettent de le savoir sans même dessiner la carte ! On regarde leurs **coefficients directeurs** ou leurs **vecteurs directeurs**.
2. Si elles se croisent, quelles seront les coordonnées du point d'impact ? Résoudre ce croisement, c'est résoudre un **système linéaire**.

---

## Rappels

Avant de commencer, révise :
- **Fonction affine** : Droite d'équation $y = mx + p$ (où $m$ est le coefficient directeur et $p$ l'ordonnée à l'origine).
- **Vecteurs colinéaires** : Deux vecteurs $\vec{u}(x;y)$ et $\vec{v}(x';y')$ sont colinéaires si on peut passer de l'un à l'autre en multipliant par un réel $k$, ou si leur déterminant est nul : $xy' - yx' = 0$.

---

## Explications et Théorie

### 1. L'équation cartésienne d'une droite
Toute droite du plan peut s'écrire sous la forme générale :
$$ax + by + c = 0$$
avec $a$ et $b$ non simultanément nuls. C'est l'**équation cartésienne**.
*Contrairement à l'équation réduite $y = mx+p$, l'équation cartésienne permet de représenter AUSSI les droites verticales (de type $x = k$).*

### 2. Vecteur directeur
Un **vecteur directeur** est un vecteur qui "donne la direction" de la droite.
- Si une droite a pour équation $ax + by + c = 0$, un de ses vecteurs directeurs est $\vec{u}(-b ; a)$.
- Si une droite a pour équation réduite $y = mx + p$, un de ses vecteurs directeurs est $\vec{u}(1 ; m)$.
*Une droite possède une infinité de vecteurs directeurs : ils sont tous colinéaires !*

### 3. Position relative de deux droites
Pour savoir comment se positionnent deux droites $(d_1)$ et $(d_2)$ :
- On regarde leurs vecteurs directeurs $\vec{u_1}$ et $\vec{u_2}$.
- **Si $\vec{u_1}$ et $\vec{u_2}$ sont colinéaires** : Les droites sont **parallèles** (strictement ou confondues).
- **Si $\vec{u_1}$ et $\vec{u_2}$ ne sont pas colinéaires** : Les droites sont **sécantes** en un unique point.

### 4. Résolution de systèmes linéaires
L'intersection de deux droites sécantes se trouve en résolvant un système :
$ \begin{cases} ax + by = c \\ a'x + b'y = c' \end{cases} $
On utilise les méthodes vues au collège : **substitution** (isoler une variable) ou **combinaison linéaire** (additionner les lignes pour éliminer une variable).

---

## Exemples Pratiques (pas-à-pas)

### Trouver l'équation cartésienne à partir de deux points
Soient $A(1; 3)$ et $B(4; -1)$. Quelle est l'équation cartésienne de la droite $(AB)$ ?
1. **On cherche le vecteur directeur :** $\vec{AB}(4-1 ; -1-3) \implies \vec{AB}(3 ; -4)$.
2. **Lien avec $a,b$ :** Comme $\vec{u}(-b ; a) = \vec{AB}(3 ; -4)$, on peut choisir $-b = 3$ (donc $b = -3$) et $a = -4$.
3. **Début d'équation :** $-4x - 3y + c = 0$.
4. **On trouve $c$ avec un point :** Le point $A(1;3)$ appartient à la droite.
   $$-4(1) - 3(3) + c = 0 \implies -4 - 9 + c = 0 \implies -13 + c = 0 \implies c = 13$$
5. **Résultat :** L'équation est $-4x - 3y + 13 = 0$. *(ou $4x + 3y - 13 = 0$, c'est pareil !)*

---

## Exercices

**🟢 Exercice 1 (Facile)**
Donne un vecteur directeur pour les droites suivantes : 
$(d_1): 3x - 2y + 5 = 0$ et $(d_2): y = -4x + 7$.

**🔵 Exercice 2 (Moyen)**
Transforme l'équation cartésienne $4x + 2y - 8 = 0$ en équation réduite. Quel est l'ordonnée à l'origine ?

**🟠 Exercice 3 (Difficile)**
Les droites $(d_1): 2x - 5y + 1 = 0$ et $(d_2): -4x + 10y + 3 = 0$ sont-elles parallèles ou sécantes ? Justifie.

**🔴 Exercice 4 (Défi)**
Trouve le point d'intersection des droites $(D_A): x - y = 4$ et $(D_B): 2x + 3y = 3$ en résolvant le système.

---

## Exercices corrigés

**Exercice 1 :**
$(d_1) : \vec{u_1}(2 ; 3)$. $(d_2) : \vec{u_2}(1 ; -4)$.

**Exercice 2 :**
$2y = -4x + 8 \implies y = -2x + 4$.
L'ordonnée à l'origine est **4**.

**Exercice 3 :**
- $\vec{u_1}(5 ; 2)$.
- $\vec{u_2}(-10 ; -4)$.
Comme $-2 \times \vec{u_1} = \vec{u_2}$, les vecteurs sont colinéaires. Les droites sont **parallèles**.

**Exercice 4 :**
Système : $ \begin{cases} x - y = 4 \implies x = y + 4 \\ 2x + 3y = 3 \end{cases} $
Substitution : $2(y + 4) + 3y = 3 \implies 2y + 8 + 3y = 3 \implies 5y = -5 \implies y = -1$.
D'où $x = -1 + 4 = 3$.
Point d'intersection : **$(3 ; -1)$**.

---

## 📝 Mini-Quiz

1. Un vecteur directeur de $y = 3x + 1$ est :
   - $(1 ; 3)$
   - $(3 ; 1)$
   - $(-1 ; 3)$

2. Deux droites sont parallèles si leurs vecteurs directeurs sont :
   - Perpendiculaires
   - Colinéaires
   - De même longueur

3. L'équation $x = 5$ représente :
   - Une droite horizontale
   - Une droite verticale
   - Un point unique

**Réponses :** 1. $(1 ; 3)$ | 2. Colinéaires | 3. Une droite verticale

---

## Foire Aux Questions (FAQ)

**Q : Pourquoi s'embêter avec $ax+by+c=0$ alors que $y=mx+p$ est plus clair pour tracer ?**
R : L'équation $y=mx+p$ est inutile si la droite est verticale ! Par exemple, si tous les points ont un $x=5$, le coefficient directeur $m$ n'existe pas (la pente est verticale "infinie"). L'équation cartésienne, elle, marche à chaque fois (ici ce serait $1x + 0y - 5 = 0$).

---

## 💡 Le savais-tu ?
Les "cartes vectorielles" que l'on utilise dans des logiciels comme Illustrator ou AutoCAD fonctionnent sur ce principe mathématique. Au lieu d'enregistrer des pixels, l'ordinateur enregistre les équations cartésiennes des lignes et des courbes. C'est pour ça qu'on peut zoomer à l'infini sur du vectoriel sans jamais perdre en netteté !
