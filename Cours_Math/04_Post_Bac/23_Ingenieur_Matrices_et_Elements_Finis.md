---
title: 'Prépa Ingénieur : Algèbre Linéaire Numérique & Éléments Finis'
level: Post_Bac
subLevel: Prep_Ingenieur
order: 23
---
# Prépa Ingénieur : Algèbre Linéaire Numérique & Éléments Finis

**Niveau** : Post-Bac (Classes Préparatoires Scientifiques, Cycle d'Ingénieur L3, Mécanique & Calcul Scientifique)  
**Prérequis** : Algèbre linéaire matricielle (inversion, valeurs propres), bases de physique des structures.  
**Objectifs** :
- Comprendre la discrétisation par la Méthode des Éléments Finis (MEF) pour résoudre des équations différentielles physiques aux dérivées partielles.
- Assembler des matrices de rigidité élémentaires pour construire la matrice de rigidité globale ($K$).
- Résoudre des grands systèmes d'équations algébriques linéaires de type $K \cdot U = F$.

---

## Activités de découverte

### Activité : Le pont suspendu découpé en briques
Lorsqu'un ingénieur calcule les déformations et les contraintes internes d'une pale d'hélicoptère, d'une aile d'avion ou d'un pont suspendu soumis à des charges, il fait face à des équations hyperboliques de la physique des milieux continus extrêmement complexes. Trouver une solution mathématique exacte et continue dans toute la structure est impossible.

L'ingénieur applique alors la stratégie des Éléments Finis :
1. Découper la structure géométrique complexe en millions de sous-domaines élémentaires de géométrie simple (triangles, tétraèdres), formant un **maillage**.
2. Modéliser le comportement élastique de chaque petit triangle par une équation linéaire type "ressort" reliant les forces exercées sur ses sommets (ses **nœuds**) à leurs déplacements : $k_{\text{élém}} \cdot u = f$.
3. Fusionner les équations de tous les petits éléments pour créer une gigantesque matrice représentant la "rigidité" globale du pont d'acier.
4. Résoudre ce système de millions de variables par ordinateur.

Cette méthode transforme des équations aux dérivées partielles continues insolubles en de simples équations matricielles d'algèbre linéaire !

---

## Fondements Théoriques

### 1. Discrétisation spatiale et Forme faible

Soit à résoudre un problème d'élasticité ou de conduction thermique régenté par une équation aux dérivées partielles (EDP). 

#### Étape 1 : Forme faible variationnelle
On multiplie l'EDP par une fonction test $v$ appartenant à un espace de Sobolev (ex: $H^1(\Omega)$), et l'on intègre sur le domaine global $\Omega$. Par intégration par parties (théorème de Green), on abaisse l'ordre de dérivation de l'équation pour obtenir une formulation bilinéaire :
$$a(u, v) = L(v)$$
Où $a(u,v)$ est une forme bilinéaire symétrique décrivant l'énergie interne du système, et $L(v)$ caractérise le travail des forces extérieures.

#### Étape 2 : Approximation de Ritz-Galerkin
On restreint la recherche de la solution continue $u$ à un sous-espace vectoriel de dimension finie $V_h$ formé par des fonctions d'interpolation (généralement des polynômes par morceaux de Lagrange associés au maillage).

---

## 🎨 Schéma Pédagogique Interactif : Le Maillage par Éléments Finis (Structure de Poutre)

L'illustration suivante simule le maillage 2D triangulaire d'un élément de structure soumis à une force d'effondrement verticale descendante (flèche orange). Les déplacements de déformation au niveau de chaque nœud se résolvent par le système de rigidité.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Discrétisation MEF (Maillage Triangulaire)</text>
  
  <g transform="translate(45, 80)">
    <!-- Supports encastrés à gauche -->
    <line x1="0" y1="20" x2="0" y2="120" stroke="#ef4444" stroke-width="4"/>
    <text x="8" y="15" font-family="sans-serif" fill="#ef4444" font-size="10" font-weight="bold">Encastrement</text>
    
    <!-- Éléments triangulaires du maillage -->
    <!-- Triangle 1 -->
    <polygon points="0,30 100,30 50,80" fill="#4f46e5" fill-opacity="0.15" stroke="#818cf8" stroke-width="2"/>
    <!-- Triangle 2 -->
    <polygon points="0,110 100,110 50,80" fill="#4f46e5" fill-opacity="0.15" stroke="#818cf8" stroke-width="2"/>
    <!-- Triangle 3 -->
    <polygon points="100,30 200,30 150,80" fill="#4f46e5" fill-opacity="0.1" stroke="#818cf8" stroke-width="2"/>
    <!-- Triangle 4 -->
    <polygon points="100,110 200,110 150,80" fill="#4f46e5" fill-opacity="0.1" stroke="#818cf8" stroke-width="2"/>
    <!-- Triangle 5 (tête de charge déformée) -->
    <polygon points="200,30 300,50 250,90" fill="#f43f5e" fill-opacity="0.15" stroke="#f43f5e" stroke-width="2"/>
    <polygon points="200,110 300,110 250,90" fill="#f43f5e" fill-opacity="0.15" stroke="#f43f5e" stroke-width="2"/>
    
    <!-- Les Nœuds d'assemblages -->
    <circle cx="0" cy="30" r="5" fill="#94a3b8"/>
    <circle cx="0" cy="110" r="5" fill="#94a3b8"/>
    <circle cx="50" cy="80" r="5" fill="#3b82f6"/>
    <circle cx="100" cy="30" r="5" fill="#3b82f6"/>
    <circle cx="100" cy="110" r="5" fill="#3b82f6"/>
    <circle cx="150" cy="80" r="5" fill="#3b82f6"/>
    <circle cx="200" cy="30" r="5" fill="#3b82f6"/>
    <circle cx="200" cy="110" r="5" fill="#3b82f6"/>
    
    <!-- Sommets de charge (point chaud) -->
    <circle cx="300" cy="50" r="6" fill="#f43f5e"/>
    <circle cx="300" cy="110" r="5" fill="#fbbf24"/>
    
    <!-- Vecteur force de charge d'effondrement -->
    <line x1="300" y1="5" x2="300" y2="40" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow_mef_force)"/>
    <text x="312" y="15" font-family="sans-serif" fill="#f59e0b" font-size="11" font-weight="bold">Force F</text>
  </g>
  
  <defs>
    <marker id="arrow_mef_force" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>
</div>

---

### 2. Le Système de Rigidité ($K \cdot U = F$)

Pour chaque élément maillé $e$, on extrait une relation matricielle linéaire locale reliant forces et déplacements nodaux :
$$K^e \cdot U^e = F^e$$
Où $K^e$ est la **matrice de rigidité élémentaire** de taille $n_{\text{nœuds}} \times n_{\text{nœuds}}$, $U^e$ est le vecteur colonne des déplacements nodaux élastiques, et $F^e$ les forces appliquées localement.

#### L'Assemblage Global :
L'ingénieur applique la loi de superposition physique pour additionner toutes les matrices locales $K^e$ au sein de la matrice globale de rigidité $K$ de l'ensemble du maillage. Après prise en compte des liaisons aux limites (ex: blocage de déplacements nodaux d'encastrements), on résout le système :
$$\mathbf{K \cdot U = F}$$

---

### 3. Résolution Numérique des Grands Systèmes

Comme la matrice globale $K$ est très creuse (elle ne contient que des valeurs d'interactions directes sur les nœuds adjacents, le reste étant vide à $95\%$), on utilise des solveurs numériques adaptés :

- **Méthodes Directes** : Factorisation de Cholesky ($K = L L^T$) car la rigidité est symétrique définie positive.
- **Méthodes Itératives** : Algorithme du **Gradient Conjugué (CG)**, idéal pour les grands solveurs de plus de $10^6$ nœuds.

---

## Exercices Résolus

### Exercice : Assemblage mécanique élémentaire (1D Truss)
Soit une structure composée de deux ressorts d'élasticité $k_1 = 100\text{ N/mm}$ et $k_2 = 200\text{ N/mm}$ branchés en série au long d'un seul axe $X$.
- Le nœud 1 est totalement encastré au mur ($u_1 = 0$).
- Le nœud 2 réunit les deux ressorts en série.
- Le nœud 3 subit une force de traction axiale extérieure directe $F_3 = 50\text{ N}$.
1. Établir le système matriciel global $K \cdot U = F$.
2. Résoudre le déplacement nodaux aux points 2 et 3.

**Correction Étape par Étape :**
1. **Étape 1 : Établissement des matrices élémentaires**  
   Pour le ressort 1 reliant le nœud 1 et 2, la rigidité élémentaire est :
   $$K^1 = \begin{pmatrix} k_1 & -k_1 \\ -k_1 & k_1 \end{pmatrix} = \begin{pmatrix} 100 & -100 \\ -100 & 100 \end{pmatrix}$$
   Pour le ressort 2 reliant le nœud 2 et 3 :
   $$K^2 = \begin{pmatrix} k_2 & -k_2 \\ -k_2 & k_2 \end{pmatrix} = \begin{pmatrix} 200 & -200 \\ -200 & 200 \end{pmatrix}$$

2. **Étape 2 : Assemblage global dans la matrice K globale (taille 3x3)**  
   Les nœuds partagent le nœud pivot 2 de liaison. On assemble en superposant sur les adresses nodales :
   $$K = \begin{pmatrix} K^1_{11} & K^1_{12} & 0 \\ K^1_{21} & K^1_{22} + K^2_{22} & K^2_{23} \\ 0 & K^2_{32} & K^2_{33} \end{pmatrix} = \begin{pmatrix} 100 & -100 & 0 \\ -100 & 100+200 & -200 \\ 0 & -200 & 200 \end{pmatrix} = \begin{pmatrix} 100 & -100 & 0 \\ -100 & 300 & -200 \\ 0 & -200 & 200 \end{pmatrix}$$
   Notre système global est donc :
   $$\begin{pmatrix} 100 & -100 & 0 \\ -100 & 300 & -200 \\ 0 & -200 & 200 \end{pmatrix} \begin{pmatrix} u_1 \\ u_2 \\ u_3 \end{pmatrix} = \begin{pmatrix} F_1 \\ F_2 \\ F_3 \end{pmatrix}$$

3. **Étape 3 : Prise en compte de l'encastrement $u_1 = 0$ et chargement $F_2 = 0, F_3 = 50$**  
   Comme le nœud 1 est encastré, la ligne et la colonne 1 s'éliminent du système réduit d'équations libres (2x2) :
   $$\begin{pmatrix} 300 & -200 \\ -200 & 200 \end{pmatrix} \begin{pmatrix} u_2 \\ u_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 50 \end{pmatrix}$$

4. **Étape 4 : Résolution algébrique**  
   De la première ligne : $300 u_2 - 200 u_3 = 0 \implies u_3 = 1.5 u_2$.  
   Injectons dans la seconde :
   $$-200 u_2 + 200 (1.5 u_2) = 50 \implies -200 u_2 + 300 u_2 = 50 \implies 100 u_2 = 50 \implies \mathbf{u_2 = 0.5\text{ mm}}$$
   Puis :
   $$u_3 = 1.5 \times 0.5 = \mathbf{0.75\text{ mm}}$$
   Conclusion : **Sous la dérive de la charge de 50 N, le point central s'étire de 0.5 mm et l'extrémité de 0.75 mm.**

---

## FAQ Étudiante

<details>
  <summary>Qu'entend-on par "Conditionnement (Cond)" d'une matrice numérique de rigidité ?</summary>

  Le conditionnement d'une matrice $K$ est le ratio entre sa plus grande et sa plus petite valeur propre : $\text{cond}(K) = \frac{\lambda_{\max}}{\lambda_{\min}}$. Plus les maillages comportent d'éléments étirés de mauvaise forme géométrique (triangles plats), plus le conditionnement explose, ce qui déstabilise les algorithmes itératifs et engendre d'importantes erreurs d'arrondis numériques dues au processeur.
</details>

<details>
  <summary>Quelle est l'importance du Lemme de Lax-Milgram dans la MEF ?</summary>

  Le **Théorème de Lax-Milgram** est la bible des mathématiciens du calcul de structures. Il garantit qu'une forme faible bilinéaire continue et coercive possède une solution unique stable. S'il n'y a pas d'encastrement pour stopper la translation libre d'un solide, le problème perd sa coercivité interne et le solveur matriciel crashe avec une division par zéro.
</details>

<details>
  <summary>Comment gère-t-on le temps dans les simulations d'éléments finis ?</summary>

  Pour les phénomènes dynamiques (ex: crash-test d'un véhicule), l'équation inclut les forces d'accélération d'inertie : $M\ddot{u} + C\dot{u} + Ku = F(t)$, avec $M$ la matrice de masse et $C$ la matrice d'amortissement de structure. On discrétise alors le temps par des schémas d'intégration temporels de type Newmark ou Euler implicite/explicite.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Que signifie l'acronyme MEF en ingénierie et recherche mécanique ?**
- [ ] Mesure d'Écoulement de Failles terrestres
- [x] Méthode des Éléments Finis (discrétisation de structures)
- [ ] Modèle d'Évaluation de Fonctionnalités logicielles
> **Explication :** En français, "MEF" s'associe historiquement à la "Méthode des Éléments Finis" (FEM en anglais : Finite Element Method).

**Question 2 : La matrice globale de rigidité K d'un système élastique stable est impérativement :**
- [ ] Une matrice triangulaire inférieure asymétrique
- [ ] Identiquement nulle au centre
- [x] Symétrique et définie positive (donc inversible)
> **Explication :** De par les lois énergétiques de la thermodynamique (conservation d'énergie élastique de déformation), la matrice résultant des assemblages est robuste, symétrique et stable.

**Question 3 : La méthode du Gradient Conjugué (CG) s'utilise de préférence pour :**
- [ ] Inverser manuellement une petite matrice de taille 2x2
- [x] Résoudre de manière itérative de très grands systèmes linéaires creux
- [ ] Calculer les intégrales de Fourier singulières
> **Explication :** Inverser de très grands systèmes creux via des méthodes itératives comme le CG permet de s'affranchir du coût mémoire gigantesque imposé par les solveurs directs classiques.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Expliquer le but fondamental de la discrétisation spatiale par rapport aux modèles continus.
- [ ] Formuler les matrices de rigidité d'éléments unidimensionnels de type ressorts ou barres.
- [ ] Réaliser manuellement l'assemblage de matrices élémentaires simples au sein de l'adresse de rigidité globale.
- [ ] Résoudre le système d'équations global réduit après application de contraintes extérieures de blocages aux limites.
