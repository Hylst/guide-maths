---
title: 'Chapitre 9 : Calcul Différentiel et Optimisation'
level: Post_Bac
subLevel: Universite_L2_L3
order: 9
---
# Chapitre 9 : Calcul Différentiel et Optimisation

**Niveau** : L3 (Licence - Post-Bac)  
**Prérequis** : Dérivées classiques, Algèbre linéaire (matrices de valeurs propres), Topologie de $\mathbb{R}^n$.  
**Objectifs** : 
- Appréhender les fonctions de plusieurs variables ($f(x, y, z)$).
- Maîtriser le Gradient ($\nabla$) et la matrice Hessienne.
- Trouver et qualifier les extremums (Minimum, Maximum, Point Col).
- Appliquer les conditions d'optimalité (Optimisation convexe).

---

## 🎨 Animation Interactive : La Descente de Gradient
Comment une Intelligence Artificielle (Réseau de neurones) apprend-elle ? Elle veut trouver le minimum d'une fonction d'erreur complexe (le "fond du ravin" sur notre graphique topographique ci-dessous). Pour cela, elle calcule le **Gradient** (la flèche rouge) qui indique la ligne de plus grande pente, et elle fait un "petit pas" dans la direction opposée !

<div align="center">
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="background:#fcfcfc; border-radius:12px; border: 1px solid #ccc;">
  <!-- Courbes de niveau (Lignes isohypses / Contours) -->
  <ellipse cx="200" cy="125" rx="150" ry="80" fill="none" stroke="#e2e8f0" stroke-width="2" />
  <ellipse cx="200" cy="125" rx="100" ry="50" fill="none" stroke="#cbd5e1" stroke-width="2" />
  <ellipse cx="200" cy="125" rx="50" ry="25" fill="none" stroke="#94a3b8" stroke-width="2" />
  <ellipse cx="200" cy="125" rx="20" ry="10" fill="#f05454" />
  <text x="210" y="125" fill="#fff" font-size="10" font-family="sans-serif">Minimum</text>

  <!-- Le chemin de descente (Gradient Descent Steps) -->
  <g fill="none" stroke="#00b4d8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50 45 L 90 65 L 120 90 L 150 105 L 180 115 L 200 120" stroke-dasharray="300" stroke-dashoffset="300">
      <animate attributeName="stroke-dashoffset" values="300; 250; 200; 150; 100; 50; 0; 0; 300" keyTimes="0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.7; 0.9; 1" dur="6s" repeatCount="indefinite" />
    </path>
  </g>
  
  <g fill="#00b4d8">
    <circle cx="50" cy="45" r="4" />
    <!-- Gradient vectoruel local perpendiculaire aux courbes de niveau -->
    <line x1="50" y1="45" x2="60" y2="25" stroke="#f05454" stroke-width="2" marker-end="url(#arrow)" />
  </g>
</svg>

  <em>Chaque pas vers le minimum va dans le sens contraire du Gradient $(-\nabla f)$.</em>
</div>

---

## Explications et Théorie

### 1. Dérivées Partielles et le Gradient ($\nabla$)
Pour une fonction multivariée $f(x_1, x_2, ..., x_n)$, la dérivée dépend de la direction dans laquelle on avance ! 
- Une **dérivée partielle** $\frac{\partial f}{\partial x_i}$ se calcule en dérivant la fonction par rapport à la variable $x_i$ en considérant toutes les autres variables comme des "constantes immobiles".
- Le **Gradient** noté $\nabla f$ ("Nabla f") est un vecteur colonne qui rassemble toutes ces dérivées partielles. 
Le Gradient désigne en tout point le sens de la plus forte augmentation locale !

### 2. Différentielle
Si $f : \mathbb{R}^n \to \mathbb{R}^m$, sa dérivée n'est plus un nombre mais une application linéaire (une matrice $m \times n$ appelée Matrice **Jacobienne**), notée $df_a$.

### 3. Matrice Hessienne (La "Dérivée Seconde")
Pour étudier la courbure (convexité) en dimension $n$, on dérive deux fois ! 
La **matrice Hessienne** (notée $H_f$) est la matrice carrée de toutes les dérivées partielles secondes : $\frac{\partial^2 f}{\partial x_i \partial x_j}$.
Par le *Théorème de Schwarz*, si $f$ est de classe $C^2$ (dérivable 2 fois de façon continue), la matrice Hessienne est **Symétrique** !

### 4. Recherche de l'Extremum (Conditions d'Optimalité)
Comment trouver un plat (un extremum) dans un paysage 3D montagneux ?
1. **Condition Première (C.N)** : Le vecteur Gradient doit être nul : $\nabla f(x) = \vec{0}$. On appelle ça un "Point Critique".
2. **Condition Seconde (C.S)** : Que se passe-t-il à ce point critique ? On étudie le signe des Valeurs Propres de la matrice Hessienne.
   - Toutes V.P $> 0$ : Le point est un **Minimum Local** (Cuvette).
   - Toutes V.P $< 0$ : Le point est un **Maximum Local** (Sommet d'une colline).
   - Signes mélangés (Positifs et Négatifs) : Le point est un **Point Col** ou "Point Selle" (Ça monte dans un sens, ça descend dans l'autre, comme une selle de cheval !).

---

## 💡 Le savais-tu ?

Pratiquement **tous** les algorithmes modernes d'Intelligence Artificielle (Deep Learning, réseaux de neurones) fonctionnent exclusivement grâce à l'optimisation par "Descente de Gradient Stochastique" et au théorème de calcul de différentielle appelé **Backpropagation** (qui n'est en fait qu'une immense règle de dérivation en chaîne mathématique !). 
En entrainant ChatGPT ou Midjourney, des immenses grappes de serveurs GPU ne font rien d'autre que calculer des milliards de Gradients dans des dimensions allant jusqu'à $\mathbb{R}^{100 \ 000 \ 000}$ pour ajuster leurs "poids" et minimiser la fonction d'erreur ! La matrice est partout.

---

## Exercices

**🟢 Exercice A (Le Vecteur de Pente)**
1. **L'Extraction des Dérivées** : Soit l'équation topographique $f(x, y) = x^3 + 2y^2 - 4xy$. Calcule méticuleusement les dérivées partielles $\frac{\partial f}{\partial x}$ et $\frac{\partial f}{\partial y}$. En déduis formellement le vecteur Gradient $\nabla f(x, y)$.

**🔵 Exercice B (La Traque des Cols)**
2. **Les Points Critiques** : Trouve les points critiques vitaux de la fonction de l'exercice 1. Tu devras résoudre le système d'équations annulé défini par $\nabla f = \vec{0}$.

**🟠 Exercice C (L'Arme Ultime : La Hessienne)**
3. **Le Jugement de Schwarz** : Calcule la matrice Hessienne de la fonction de l'exercice 1 et évalue-la à ses fameux points critiques. S'agit-il de minimals purs, de maximas stricts, ou de points cols hybrides ? *(Indice : Le déterminant matriciel d'une $2\times2$ est ton juge absolue. Un déterminant strictement négatif révèle la présence d'une selle !)*

---

## Exercices corrigés

**Exercice 1 :**
Dérivons brutalement par rapport au terme de choix en figant l'autre :
- Par rapport à $x$ : $\frac{\partial f}{\partial x} = 3x^2 - 4y$
- Par rapport à $y$ : $\frac{\partial f}{\partial y} = 4y - 4x$
Le Gradient s'écrit formellement : $\nabla f(x, y) = \begin{pmatrix} 3x^2 - 4y \\ 4y - 4x \end{pmatrix}$.

**Exercice 2 :**
On contraint notre Gradient au repos total (vecteur Nul) :
$\begin{cases} 3x^2 - 4y = 0 \\ 4y - 4x = 0 \end{cases}$
L'équation 2 donne instantanément $y = x$.
On l'injecte dans la 1ère équation : $3x^2 - 4x = 0 \Rightarrow x(3x - 4) = 0$.
Les solutions d'absisse sont $x = 0$ et $x = 4/3$. Les points critiques spatiaux 2D sont donc $(0, 0)$ et $(4/3, 4/3)$.

**Exercice 3 :**
La Matrice Hessienne est le tableau sacré des dérivées secondes (dérivées des dérivées partielles) !
$H_f(x, y) = \begin{pmatrix} \frac{\partial^2 f}{\partial x^2} & \frac{\partial^2 f}{\partial x \partial y} \\ \frac{\partial^2 f}{\partial y \partial x} & \frac{\partial^2 f}{\partial y^2} \end{pmatrix} = \begin{pmatrix} 6x & -4 \\ -4 & 4 \end{pmatrix}$.

Évaluons le Jugement au point $(0, 0)$ :
$H_f(0, 0) = \begin{pmatrix} 0 & -4 \\ -4 & 4 \end{pmatrix}$.
Le déterminant vaut $(0 \times 4) - (-4 \times -4) = -16 < 0$. Le déterminant plonge dans le négatif, l'origine $(0, 0)$ est formellement déclarée comme **Point Col** (ou selle) !

Évaluons le Jugement au point $(4/3, 4/3)$ :
$H_f(4/3, 4/3) = \begin{pmatrix} 8 & -4 \\ -4 & 4 \end{pmatrix}$.
Le déterminant vaut $(8 \times 4) - (-4 \times -4) = 32 - 16 = 16 > 0$. Les deux éléments de la trace (diagonale) 8 et 4 sont positifs. Ce point est authentifié comme un **Minimum Local** !

---

## Foire Aux Questions (FAQ)

<details>
  <summary>Pourquoi appelle-t-on le Gradient "Nabla", cet étrange triangle à l'envers ?</summary>

  L'origine remonte au physicien Écossais Peter Tait. Nabla (∇) vient de la "Harpe hébraïque". C’est le nom d'un instrument de musique antique (le nevel) qui avait précisément cette forme en triangle inversé ! C'est resté comme standard mathématique international car le symbole "Δ" (Delta) majuscule à l'endroit était déjà réservé pour exprimer "la Différence".
</details>

<details>
  <summary>Une Hessienne a donc toujours une trace symétrique miroir ?</summary>

  Absolument, par le "Théorème de Schwarz". Si tu dérives une fonction $x^2 y$ d'abord en x puis en y, ou d'abord en y puis en x ... le résidu mathématique final est strictement le même ! Dans la matrice, cela garantit que la case (Ligne 1, Colonne 2) possèdera la même formule que la case (Ligne 2, Colonne 1) !
</details>

---

## 📝 Mini-Quiz

<details>
  <summary>❓ QCM 1 : Paradoxe Dimensionnel</summary>

  Soit un point critique $\vec{a}$ où $\nabla f(a) = \vec{0}$. Si c'est un "Point Col" en 3D, ça ressemble à une selle. Que représente un Point Col en dimension $1$ ?
  <ul>
    <li>A) Un Point d'inflexion</li>
    <li>B) Un extremum absolu</li>
    <li>C) Ça n'existe pas.</li>
  </ul>
  <details>
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : A !</strong> L'équivalent en analyse 1D (comme vu en TS) de la matrice hessienne aux termes "mitigés", c'est la dérivée seconde qui s'annule (point d'inflexion, type fonction $x^3$ en 0) !
</details>
</details>


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.
