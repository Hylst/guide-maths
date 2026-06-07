---
title: 'Analyse L2 : Fonctions de Plusieurs Variables & Différentiabilité'
level: Post_Bac
subLevel: Analyse_L2
order: 16
---
# Analyse L2 : Fonctions de Plusieurs Variables & Différentiabilité

**Niveau** : Post-Bac (Licence 2, Portail Sciences, CPGE 2ème année)  
**Prérequis** : Algèbre linéaire (calcul de matrices, vecteurs), Analyse L1 (dérivabilité univariée).  
**Objectifs** :
- Comprendre les fonctions réelles de plusieurs variables réelles ($\mathbb{R}^n \to \mathbb{R}$).
- Maîtriser le calcul de dérivées partielles d'ordre 1 et 2 et comprendre le vecteur gradient ($\nabla$).
- Étudier la différentiabilité locale et localiser des points critiques (extremums locaux, points cols).

---

## Activités de découverte

### Activité : La randonnée et le relief montagneux
Imaginez que vous fassiez de la randonnée en haute altitude. Votre position géographique sur la carte est représentée par deux coordonnées $(x, y)$, et l'altitude de la montagne à cette position s'exprime par une fonction de deux variables : $z = f(x, y)$.

1. Si vous vous déplacez uniquement vers l'Est (en variant $x$, $y$ restant constant), la pente de votre sentier correspond à la variation d'altitude. On appelle cette pente la **dérivée partielle par rapport à $x$**, notée $\frac{\partial f}{\partial x}$.
2. Si vous vous déplacez uniquement vers le Nord (en variant $y$, $x$ restant constant), vous mesurez la **dérivée partielle par rapport à $y$**, notée $\frac{\partial f}{\partial y}$.
3. Supposons que vous posiez une balle de ping-pong au sol : dans quelle direction cardinale exacte va-t-elle commencer à rouler ?

La balle va rouler dans le sens de la ligne de plus grande pente descendante. Cette direction privilégiée est dictée géométriquement par un vecteur d'une importance capitale : le **vecteur gradient** (noté $\nabla f(x, y)$), qui pointe vers la pente la plus raide ascendante !

---

## Fondements Théoriques

### 1. Limites et Continuité dans $\mathbb{R}^2$

Soit $f : U \subset \mathbb{R}^2 \to \mathbb{R}$ définie sur un ouvert $U$.

Contrairement aux fonctions univariées où l'on ne peut s'approcher d'un point $x_0$ que par deux directions (gauche et droite), dans le plan $\mathbb{R}^2$, on peut s'approcher de $(x_0, y_0)$ par une **infinité de chemins** (droites, paraboles, spirales).

#### Condition de Continuité :
$f$ est continue en $A(x_0, y_0) \in U$ si et seulement si :
$$\lim_{(x, y) \to (x_0, y_0)} f(x, y) = f(x_0, y_0)$$

---

## 🎨 Schéma Pédagogique Interactif : Lignes de Niveau en 2D/3D

L'un des moyens les plus puissants pour visualiser une fonction $f(x, y)$ est le tracé de ses **lignes de niveau**, comme sur les cartes topographiques de l'IGN. Une ligne de niveau $C$ regroupe tous les points dont l'image vaut exactement la constante $C$ : $f(x, y) = C$.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Lignes de Niveau Topographiques (Gradient)</text>
  
  <g transform="translate(10, 10)">
    <!-- Tracé de cercles concentriques simulant un sommet de montagne (f(x,y) = x^2+y^2) -->
    <circle cx="210" cy="140" r="100" fill="none" stroke="#4f46e5" stroke-width="2" stroke-opacity="0.3"/>
    <circle cx="210" cy="140" r="80" fill="none" stroke="#6366f1" stroke-width="2" stroke-opacity="0.5"/>
    <circle cx="210" cy="140" r="60" fill="none" stroke="#818cf8" stroke-width="2.5" stroke-opacity="0.7"/>
    <circle cx="210" cy="140" r="40" fill="none" stroke="#a5b4fc" stroke-width="3" stroke-opacity="0.9"/>
    <circle cx="210" cy="140" r="20" fill="none" stroke="#c7d2fe" stroke-width="3"/>
    
    <text x="210" y="145" font-family="sans-serif" fill="#ffffff" font-size="10" text-anchor="middle" font-weight="bold">Sommet</text>
    
    <!-- Représentation d'un randonneur (point rouge) -->
    <g>
      <circle cx="150" cy="100" r="6" fill="#f43f5e"/>
      
      <!-- Flèche directionnelle du Gradient (Perpendiculaire aux lignes de niveau) -->
      <!-- Le vecteur pointe vers le sommet (210, 140) depuis (150, 100) -> vecteur (60, 40) -->
      <line x1="150" y1="100" x2="192" y2="128" stroke="#10b981" stroke-width="3" marker-end="url(#arrow)"/>
      <circle cx="150" cy="100" r="25" fill="none" stroke="#10b981" stroke-dasharray="3,3" stroke-width="1" stroke-opacity="0.6"/>
    </g>
    
    <!-- Légendes -->
    <text x="60" y="240" font-family="sans-serif" fill="#818cf8" font-size="11">Bleu : Isohypse (Lignes de niveau)</text>
    <text x="250" y="240" font-family="sans-serif" fill="#10b981" font-size="11">Vert : Vecteur Gradient ∇f</text>
  </g>
  
  <!-- Définition du marqueur de flèche -->
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/>
    </marker>
  </defs>
</svg>
</div>

---

### 2. Dérivées Partielles

Soit $f(x, y)$ une fonction à deux variables.

#### Dérivées Partielles d'Ordre 1 :
Elles consistent à dériver la fonction par rapport à une variable en traitant l'autre variable comme une **constante immuable**.
$$\frac{\partial f}{\partial x}(x_0, y_0) = \lim_{h \to 0} \frac{f(x_0+h, y_0) - f(x_0, y_0)}{h}$$
$$\frac{\partial f}{\partial y}(x_0, y_0) = \lim_{k \to 0} \frac{f(x_0, y_0+k) - f(x_0, y_0)}{k}$$

#### Le Vecteur Gradient ($\nabla f$) :
Le gradient regroupe les dérivées partielles d'ordre 1 au sein d'un vecteur géométrique :
$$\nabla f(x, y) = \begin{pmatrix} \frac{\partial f}{\partial x}(x, y) \\ \frac{\partial f}{\partial y}(x, y) \end{pmatrix}$$

*Propriété vitale : Le gradient en un point est toujours orthogonal à la ligne de niveau passant par ce point.*

---

### 3. Différentiabilité et Plan Tangent

Une fonction est différentiable si elle admet une excellente approximation plane linéaire locale.

#### Définition de la Différentielle :
S'il existe deux réels $A$ et $B$ et une fonction d'erreur $\varepsilon(h, k) \to 0$ tels que :
$$f(x_0+h, y_0+k) = f(x_0, y_0) + A h + B k + \sqrt{h^2+k^2} \varepsilon(h, k)$$
Alors $f$ est différentiable en $(x_0, y_0)$. Dans ce cas, $A = \frac{\partial f}{\partial x}(x_0, y_0)$ et $B = \frac{\partial f}{\partial y}(x_0, y_0)$.

L'équation du **plan tangent** à la surface au point d'évaluation vaut :
$$z = f(x_0, y_0) + \frac{\partial f}{\partial x}(x_0, y_0)(x - x_0) + \frac{\partial f}{\partial y}(x_0, y_0)(y - y_0)$$

---

## Exercices Résolus

### Exercice : Recherche d'extremums locaux d'une surface
Soit la fonction définie sur $\mathbb{R}^2$ par :
$$f(x, y) = x^2 + 2y^2 - 4x + 4y$$
Rechercher les points critiques de $f$ et déterminer leur nature (minimum, maximum ou point selle).

**Correction Étape par Étape :**
1. **Étape 1 : Calcul du gradient $\nabla f$**  
   Calculons les dérivées partielles de premier ordre :
   $$\frac{\partial f}{\partial x}(x, y) = 2x - 4$$
   $$\frac{\partial f}{\partial y}(x, y) = 4y + 4$$
   Le gradient est donc : $\nabla f(x, y) = \begin{pmatrix} 2x - 4 \\ 4y + 4 \end{pmatrix}$.

2. **Étape 2 : Résolution du système critique $\nabla f(x,y) = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$**  
   $$\begin{cases} 2x - 4 = 0 \\ 4y + 4 = 0 \end{cases} \implies \begin{cases} x = 2 \\ y = -1 \end{cases}$$
   Il y a un **unique point critique** : $S(2, -1)$.

3. **Étape 3 : Calcul de la matrice Hessienne ($H$) et décision**  
   Calculons les dérivées secondes partielles :
   $$\frac{\partial^2 f}{\partial x^2} = 2, \quad \frac{\partial^2 f}{\partial y^2} = 4, \quad \frac{\partial^2 f}{\partial x \partial y} = 0$$
   La matrice Hessienne est constante :
   $$H = \begin{pmatrix} 2 & 0 \\ 0 & 4 \end{pmatrix}$$
   Le déterminant $\det(H) = 2 \times 4 - 0^2 = 8 > 0$.  
   Comme $\det(H) > 0$ et le premier coefficient diagonal $\frac{\partial^2 f}{\partial x^2} = 2 > 0$, la convexité est positive.
   Conclusion : **Le point $S(2, -1)$ est un minimum local strict de la fonction.**

---

## FAQ Étudiante

<details>
  <summary>Qu'est-ce que le Théorème de Schwarz sur les dérivées croisées ?</summary>

  Le célèbre **Théorème de Schwarz** énonce qu'une fonction de classe $\mathcal{C}^2$ possède des dérivées partielles secondes croisées parfaitement symétriques. C'est-à-dire que dériver par rapport à $x$ puis par rapport à $y$ donne le même résultat exact que dériver d'abord par rapport à $y$ puis par rapport à $x$ :  
  $$\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial^2 f}{\partial x \partial y}$$
  C'est un gain de temps fantastique pour les calculs de matrices Hessiennes !
</details>

<details>
  <summary>Comment différentier visuellement un point col (point ou selle) d'un extremum ?</summary>

  Un **point col** (comme un col de montagne ou une selle de cheval) possède une courbure contradictoire. Si vous marchez dans une direction, vous montez vers les cimes, mais si vous tournez à 90°, vous descendez vers la vallée. Analytiquement, le déterminant de la matrice Hessienne est strictement négatif ($\det(H) < 0$), ce qui indique des vecteurs propres de signes contraires.
</details>

<details>
  <summary>Quelle est la différence fondamentale entre être dérivable en toutes directions et être différentiable ?</summary>

  C’est le piège d'analyse L2 ! Une fonction peut posséder des taux de variation finis dans n'importe quelle direction linéaire plane, sans être pour autant différentiable (ni même continue !). La différentiabilité requiert que l'enveloppe d'approximation plane globale fusionne proprement avec la courbe sans aucun saut chaotique directionnel.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si la surface $f(x, y) = 3x^2 e^y$ s'évalue au point $P(1, 0)$, que vaut la dérivée partielle $\frac{\partial f}{\partial x}$ ?**
- [ ] 0
- [ ] 3
- [x] 6
> **Explication :** En considérant $y$ comme constante, on dérive $f$ par rapport à $x$ : $\frac{\partial f}{\partial x} = 6x e^y$. Évalué au point $(1, 0)$, cela donne $6(1) e^0 = 6 \times 1 = 6$.

**Question 2 : Le déterminant de la Hessienne s'élève à -15 en un point critique. On fait face à :**
- [ ] Un maximum local de montagne
- [ ] Un minimum local de cuvette
- [x] Un point col (selle de cheval)
> **Explication :** Lorsque le déterminant de la matrice Hessienne est négatif ($\det(H) < 0$), la surface possède des directions de concavité opposées. C'est la signature analytique parfaite d'un point col (col de transition géographique).

**Question 3 : Dans quel sens cardinal le gradient d'une fonction d'altitude pointe-t-il ?**
- [ ] Vers la pente la plus plane possible
- [ ] Vers le bas, dans le sens d'écoulement de l'eau
- [x] Vers le haut, dans la ligne de plus grande ascension de la surface
> **Explication :** Par définition géométrique, les coefficients de coordonnées du gradient orientent de manière imperturbable le vecteur vers la zone à croissance locale la plus maximale et violente.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Calculer des dérivées partielles de premier et second ordre en tenant des variables gelées comme constantes.
- [ ] Appliquer le Théorème de Schwarz pour valider la symétrie de la Hessienne.
- [ ] Résoudre le système d'équations critiques pour localiser des points stationnaires plans.
- [ ] Calculer le déterminant d'une Hessienne pour prouver l'existence d'un maximum, d'un minimum ou d'un point col.
