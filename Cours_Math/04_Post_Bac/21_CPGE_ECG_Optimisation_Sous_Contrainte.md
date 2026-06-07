---
title: 'CPGE ECG : Optimisation Sous Contrainte (Multiplicateurs de Lagrange)'
level: Post_Bac
subLevel: CPGE_ECG
order: 21
---
# CPGE ECG : Optimisation Sous Contrainte (Multiplicateurs de Lagrange)

**Niveau** : Post-Bac (CPGE ECG Mathématiques Approfondies / Appliquées, Écoles de commerce)  
**Prérequis** : Dérivées partielles, calcul de gradients (Analyse L2).  
**Objectifs** :
- Comprendre les principes mathématiques de l'optimisation sous contrainte d'égalité.
- Maîtriser l'écriture de la fonction du Lagrangien d'un problème économique.
- Déterminer les points critiques admissibles à l'aide des multiplicateurs de Lagrange ($\lambda$).

---

## Activités de découverte

### Activité : Le consommateur rationnel face à son portefeuille
Un consommateur cherche à maximiser sa satisfaction (son "utilité scientifique") en achetant deux types de marchandises : de la nourriture saine $x$ et des produits technologiques $y$. Sa fonction d'utilité psychologique est modélisée par $U(x, y) = x \cdot y$.  
Cependant, le consommateur n'a pas un budget illimité. Chaque unité de nourriture coûte $p_1 = 2\text{ }€$, et chaque unité de technologie coûte $p_2 = 4\text{ }€$. Son budget total disponible s'élève à $R = 40\text{ }€$.

Sa contrainte de budget s'écrit donc rigoureusement sous la forme linéaire suivante :
$$2x + 4y = 40$$

1. Si le consommateur dépense tout son budget dans la nourriture ($y = 0$), quelle utilité en retire-t-il ? $U(20, 0) = 0$.
2. Même question s'il n'achète que de la technologie ($x = 0$) : $U(0, 10) = 0$.
3. Comment maximiser mathématiquement l'utilité globale $U(x, y)$ tout en restant scrupuleusement sur l'ensemble ouvert de la droite de budget ?

Ce problème est le fondement historique des théories microéconomiques. Sa résolution élégante repose sur le concept des **multiplicateurs de Lagrange**.

---

## Fondements Théoriques

### 1. Positionnement du Problème

On appelle problème d'optimisation sous contrainte d'égalité la recherche des extremums d'une fonction d'utilité ou d'objectif $f(x, y)$ lorsque les variables sont forcées de satisfaire une relation d'égalité $g(x, y) = 0$.

Mathematisé, on l'écrit fréquemment :
$$\begin{cases} \text{Optimiser } f(x, y) \\ \text{sous la contrainte : } g(x, y) = 0 \end{cases}$$

---

## 🎨 Schéma Pédagogique Interactif : L'équilibre de Lagrange

L'illustration modélise la tangence parfaite entre les lignes de niveau courbes de l'utilité (courbes de satisfaction bleues) et la droite rectiligne de contrainte budgétaire (en vert). L'optimum est le point de contact tangent où le gradient de l'utilité ($\nabla U$) s'aligne colinéairement avec le gradient de la contrainte ($\nabla g$).

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Tangence Géométrique (Optimum de Lagrange)</text>
  
  <g transform="translate(60, 220)">
    <!-- Axes graphiques -->
    <line x1="0" y1="0" x2="320" y2="0" stroke="#4b5563" stroke-width="2"/>
    <text x="300" y="15" font-family="sans-serif" fill="#9ca3af" font-size="11">Marchandise x</text>
    <line x1="0" y1="0" x2="0" y2="-170" stroke="#4b5563" stroke-width="2"/>
    <text x="-40" y="-150" font-family="sans-serif" fill="#9ca3af" font-size="11" transform="rotate(-90 -40 -150)">Utilité y</text>
    
    <!-- Courbes d'indifférence (utilité courbe) -->
    <!-- Courbe 1 basse -->
    <path d="M 40,-150 Q 100,-60 250,-20" fill="none" stroke="#4f46e5" stroke-opacity="0.4" stroke-width="2"/>
    <!-- Courbe 2 optimale (tangente) -->
    <path d="M 70,-150 Q 130,-100 280,-30" fill="none" stroke="#6366f1" stroke-width="3"/>
    <text x="240" y="-70" font-family="sans-serif" fill="#6366f1" font-size="10">U = U*(Optimum)</text>
    
    <!-- Droite de Budget (Contrainte g(x,y)=0) -->
    <!-- Droite passant par (0, -140) et (280, 0) -->
    <line x1="0" y1="-140" x2="280" y2="0" stroke="#10b981" stroke-width="3"/>
    <text x="200" y="-20" font-family="sans-serif" fill="#10b981" font-size="10" transform="rotate(-26.5 200 -20)">Droite de contrainte budgétaire</text>
    
    <!-- Point d'équilibre d'optimum -->
    <circle cx="140" cy="-70" r="6" fill="#f43f5e"/>
    
    <!-- Gradients colinéaires -->
    <!-- Gradient contrainte -->
    <line x1="140" y1="-70" x2="180" y2="-150" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow_lagrange)"/>
    <text x="185" y="-135" font-family="sans-serif" fill="#f59e0b" font-size="10" font-weight="bold">∇U = λ∇g</text>
  </g>
  
  <defs>
    <marker id="arrow_lagrange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>
</div>

---

### 2. Le Lagrangien et le Multiplicateur ($\lambda$)

La méthode géniale de Joseph-Louis Lagrange permet d'embarquer la contrainte d'égalité au sein d'une nouvelle fonction sans contrainte comptant une variable supplémentaire fictive : le multiplicateur $\lambda$.

#### Définition de la fonction de Lagrangien ($\mathcal{L}$) :
$$\mathcal{L}(x, y, \lambda) = f(x, y) - \lambda \cdot g(x, y)$$

#### Théorème des conditions de premier ordre (CPO) :
Si la fonction objectif et la contrainte sont différentiables, tout extremum local sous contrainte $(x^*, y^*)$ satisfait le système d'annulation complète de toutes les dérivées partielles du Lagrangien :
$$\nabla \mathcal{L}(x, y, \lambda) = \mathbf{0} \iff \begin{cases} \frac{\partial \mathcal{L}}{\partial x} = 0 \\ \frac{\partial \mathcal{L}}{\partial y} = 0 \\ \frac{\partial \mathcal{L}}{\partial \lambda} = 0 \end{cases} \iff \begin{cases} \frac{\partial f}{\partial x}(x, y) = \lambda \frac{\partial g}{\partial x}(x, y) \\ \frac{\partial f}{\partial y}(x, y) = \lambda \frac{\partial g}{\partial y}(x, y) \\ g(x, y) = 0 \end{cases}$$

Le multiplicateur $\lambda$ s'interprète économiquement comme le **prix fictif d'opportunité** (ou valeur marginale) associé au relâchement infinitésimal de la contrainte.

---

## Exercices Résolus

### Exercice : Résolution de l'équilibre du consommateur
Résoudre mathématiquement le problème de découverte du consommateur rationnel :
- Maximiser l'utilité objective $U(x, y) = x \cdot y$
- Sous la contrainte budgétaire : $2x + 4y = 40 \iff 2x + 4y - 40 = 0$.

**Correction Étape par Étape :**
1. **Étape 1 : Écriture de la fonction du Lagrangien**  
   Posons $f(x, y) = x y$ et la contrainte $g(x, y) = 2x + 4y - 40$.  
   Le Lagrangien s'écrit :
   $$\mathcal{L}(x, y, \lambda) = x y - \lambda(2x + 4y - 40)$$

2. **Étape 2 : Établissement du système des CPO (Conditions du Premier Ordre)**  
   Dérivons par rapport à nos trois coordonnées $x, y, \lambda$ :
   $$\begin{cases} \frac{\partial \mathcal{L}}{\partial x} = y - 2\lambda = 0 \quad (\text{Equation 1}) \\ \frac{\partial \mathcal{L}}{\partial y} = x - 4\lambda = 0 \quad (\text{Equation 2}) \\ \frac{\partial \mathcal{L}}{\partial \lambda} = -(2x + 4y - 40) = 0 \quad (\text{Equation 3}) \end{cases}$$

3. **Étape 3 : Résolution d'isolement algébrique**  
   Des équations 1 et 2, on isole le multiplicateur $\lambda$ :
   $$\lambda = \frac{y}{2} = \frac{x}{4} \implies x = 2y$$
   Injectons cette relation de proportionnalité optimale au sein de l'équation budgétaire 3 :
   $$2(2y) + 4y = 40 \implies 4y + 4y = 40 \implies 8y = 40 \implies \mathbf{y^* = 5}$$
   Dès lors, on en déduit les autres coordinations optimales :
   $$x^* = 2(5) = \mathbf{10}$$
   $$\lambda^* = \frac{5}{2} = \mathbf{2.5}$$
   Conclusion : **L'utilité du consommateur est maximisée au point stationnaire d'achat $x = 10$ unités de nourriture et $y = 5$ unités technologiques.**

---

## FAQ Étudiante

<details>
  <summary>Comment prouver qu'un point critique de Lagrange est réellement un maximum et non un minimum ?</summary>

  C’est une question subtile de L2 ! On utilise un outil nommé la **matrice Hessienne bordée** (notée $\bar{H}$). C'est une extension de la Hessienne classique qui intègre la contrainte :
  $$\bar{H} = \begin{pmatrix} 0 & \frac{\partial g}{\partial x} & \frac{\partial g}{\partial y} \\ \frac{\partial g}{\partial x} & \frac{\partial^2 \mathcal{L}}{\partial x^2} & \frac{\partial^2 \mathcal{L}}{\partial x \partial y} \\ \frac{\partial g}{\partial y} & \frac{\partial^2 \mathcal{L}}{\partial y \partial x} & \frac{\partial^2 \mathcal{L}}{\partial y^2} \end{pmatrix}$$
  Si le déterminant de cette matrice hessienne bordée s'évalue strictement positif ($\det(\bar{H}) > 0$), alors la condition d'optimum garantit un **maximum local sous contrainte**.
</details>

<details>
  <summary>Quelle est la signification économique concrète de l'égalité de tangence des gradients de Lagrange ?</summary>

  L'égalité s'analyse ainsi : la pente de la courbe d'utilité locale de satisfaction (le taux marginal de substitution - TMS) s'équilibre de manière parfaite avec le rapport des prix du marché :  
  $$\text{TMS} = \frac{\frac{\partial U}{\partial x}}{\frac{\partial U}{\partial y}} = \frac{p_1}{p_2}$$
  Le consommateur s'arrête de substituer lorsque sa satisfaction psychologique d'échange coïncide exactement avec les conditions réelles économiques du marché de vente.
</details>

<details>
  <summary>La méthode de Lagrange fonctionne-t-elle avec des inégalités (ex: g(x,y) ≤ 0) ?</summary>

  Oui ! Cependant, pour des contraintes d'inégalités, on doit généraliser la structure vers des équations d'analyse plus générales appelées les **conditions de Karush-Kuhn-Tucker (KKT)**. Celles-ci intègrent des conditions de complémentarité d'activation de barrières.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Dans quel cas un consommateur peut-il contourner la contrainte budgétaire stricte ?**
- [ ] Dans aucun cas, la contrainte g(x,y) = 0 délimite impérativement le contour budgétaire
- [x] S'il utilise des crédits non modélisés (ce qui modifie le second membre R)
- [ ] En multipliant toutes les variables de satiété par zéro
> **Explication :** La contrainte linéaire de budget définit une ligne infranchissable de solvabilité sur le plan. Toute hausse de budget décale cette droite vers le haut, élargissant l'espace des possibles.

**Question 2 : Qu'indique un multiplicateur de Lagrange λ* élevé à 4.2 dans un problème de profit d'entreprise ?**
- [ ] Que l'entreprise subit des pertes de d'efficacité de 4.2%
- [x] Qu'une augmentation unitaire du budget de contrainte générera 4.2 € de profit supplémentaire
- [ ] Qu'une contrainte est inactive
> **Explication :** Le multiplicateur de Lagrange caractérise la sensibilité marginale locale. Il indique la plus-value ou l'accroissement de la fonction objectif d'un relâchement infinitésimal unitaire de la contrainte.

**Question 3 : Les dérivées de Lagrangien de premier ordre (CPO) imposent nécessairement :**
- [ ] Que la contrainte budgétaire soit éliminée
- [x] L'annulation complète du gradient du Lagrangien par rapport à (x, y, λ)
- [ ] Que tous les prix des marchandises soient négatifs
> **Explication :** Pour trouver les extrema potentiels du Lagrangien, la condition du premier ordre est l'annulation rigoureuse de toutes ses dérivées partielles par rapport aux coordonnées et aux multiplicateurs.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Formuler analytiquement les contraintes d'utilité et de d'égalité budgétaire sous la forme normalisée g(x, y) = 0.
- [ ] Écrire la fonction de Lagrangien complète associée à un problème d'optimisation économique d'ECG.
- [ ] Établir le système des conditions d'ordres unilatérales de premier ordre de dérivation (CPO).
- [ ] Résoudre le système d'équations couplées pour donner les coordonnées de consommation optimales et le prix fictif.
