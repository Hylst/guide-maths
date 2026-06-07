---
title: 'Probabilités : Vecteurs Aléatoires & Covariance'
level: Post_Bac
subLevel: Probabilites
order: 18
---
# Probabilités : Vecteurs Aléatoires & Covariance

**Niveau** : Post-Bac (Licence 2/3, Écoles d'Ingénieurs, Actuariat)  
**Prérequis** : Intégrales multiples (Analyse L2), Algèbre matricielle, Probabilités et densités continues.  
**Objectifs** :
- Modéliser plusieurs variables aléatoires simultanément à l'aide d'un vecteur aléatoire.
- Extraire des lois marginales à partir d'une loi conjointe (intégration).
- Analyser les corrélations mutuelles de signaux par la covariance et interpréter la matrice de covariance.

---

## Activités de découverte

### Activité : Le vent et la température marine
Un satellite météorologique mesure au milieu de l'océan deux données physiques fortement couplées : la vitesse locale du vent $X$ (en nœuds) et la hauteur moyenne des vagues côtières $Y$ (en mètres).

1. Peut-on étudier $X$ et $Y$ de manière totalement séparée ? Non, car un vent fort génère physiquement des houles de grande taille. Les deux variables interagissent.
2. Si vous possédez la loi conjointe (qui décrit le comportement couplé global), comment retrouver la loi statistique décrivant le vent $X$ *seul*, indépendamment de la hauteur des vagues ?
3. Comment chiffrer numériquement le sens de la tendance : est-ce que les vagues grandissent ou diminuent de manière linéaire lorsque le vent s'intensifie ?

Ces questions d'analyse multivariate trouvent leurs réponses dans l'étude des **vecteurs aléatoires** et les notions de **covariance** et de **lois marginales**.

---

## Fondements Théoriques

### 1. Lois Conjointes et Marginales

Un vecteur aléatoire à deux dimensions est un couple $(X, Y)$ de variables définies sur le même espace probabilisé $(\Omega, \mathcal{A}, P)$.

#### Densité Conjointe :
Une fonction $f_{X,Y} : \mathbb{R}^2 \to \mathbb{R}$ est la densité de probabilité conjointe du couple $(X, Y)$ si elle est positive et si son intégrale double sur $\mathbb{R}^2$ vaut $1$ :
$$\iint_{\mathbb{R}^2} f_{X,Y}(x, y) \, dx \, dy = 1$$

#### Lois Marginales :
Pour retrouver la distribution de $X$ seule à partir de la loi conjointe, on élimine la variable $Y$ en l'intégrant sur tout son domaine d'existence (sommation continue globale) :
$$f_X(x) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dy$$
$$f_Y(y) = \int_{-\infty}^{+\infty} f_{X,Y}(x, y) \, dx$$

---

## 🎨 Schéma Pédagogique Interactif : Densités Marginales et Indépendance

L'illustration suivante modélise graphiquement la projection d'un vecteur aléatoire bidimensionnel $(X, Y)$ (ellipse centrale violette de distribution jointe) vers ses enveloppes marginales respectives $f_X(x)$ et $f_Y(y)$ sur les axes de coordonnées.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Projection de Lois Marginales (Covariance Elliptique)</text>
  
  <g transform="translate(60, 220)">
    <!-- Repère -->
    <line x1="0" y1="0" x2="320" y2="0" stroke="#4b5563" stroke-width="2"/>
    <text x="300" y="15" font-family="sans-serif" fill="#9ca3af" font-size="11">X (Vent)</text>
    <line x1="0" y1="0" x2="0" y2="-170" stroke="#4b5563" stroke-width="2"/>
    <text x="-35" y="-155" font-family="sans-serif" fill="#9ca3af" font-size="11">Y (Vagues)</text>
    
    <!-- Densité conjointe modélisée par une ellipse inclinée (Corrélation positive) -->
    <g transform="translate(150, -80) rotate(-30)">
      <ellipse cx="0" cy="0" rx="60" ry="25" fill="#4f46e5" fill-opacity="0.2" stroke="#818cf8" stroke-width="2">
        <animate attributeName="stroke" values="#818cf8;#f43f5e;#818cf8" dur="4s" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="0" cy="0" r="4" fill="#fbbf24"/>
    </g>
    
    <!-- Courbe marginale fX sur l'axe X -->
    <path d="M 60,0 Q 150,-40 240,0" fill="none" stroke="#10b981" stroke-width="2.5"/>
    <text x="150" y="-45" font-family="sans-serif" fill="#10b981" font-size="10" text-anchor="middle">Marginale f_X(x)</text>
    
    <!-- Courbe marginale fY sur l'axe Y -->
    <path d="M 0,-30 Q -40,-80 0,-130" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
    <text x="-65" y="-80" font-family="sans-serif" fill="#f59e0b" font-size="10" text-anchor="middle" transform="rotate(-90 -65 -80)">Marginale f_Y(y)</text>
    
    <!-- Simulation de nuage de points conjointe -->
    <circle cx="120" cy="-60" r="3" fill="#ffffff" opacity="0.6"/>
    <circle cx="160" cy="-90" r="3" fill="#ffffff" opacity="0.8"/>
    <circle cx="180" cy="-110" r="3" fill="#ffffff" opacity="0.5"/>
    <circle cx="140" cy="-75" r="3" fill="#ffffff" opacity="0.7"/>
  </g>
</svg>
</div>

---

### 2. Indépendance

Deux variables réelles $X$ et $Y$ d'un couple continu sont dites statistiquement indépendantes si et seulement si leur densité conjointe se factorise parfaitement en produit direct d'enveloppes marginales unilatérales :
$$\forall (x, y) \in \mathbb{R}^2, \quad f_{X,Y}(x, y) = f_X(x) \times f_Y(y)$$

*Propriété essentielle : Si de plus $X$ et $Y$ sont indépendantes, l'espérance de leur produit équivaut au produit d'espérance : $E(XY) = E(X)E(Y)$.*

---

### 3. Covariance et Matrice de Covariance

La covariance mesure la liaison de dépendance linéaire entre d'éventuels signaux d'évaluation.

#### Formule de la Covariance :
$$\text{Cov}(X,Y) = E\left[(X - E(X))(Y - E(Y))\right] = E(XY) - E(X)E(Y)$$

- Si $X$ et $Y$ sont indépendantes, alors leur covariance $\text{Cov}(X,Y) = 0$.
- *Mise en garde doctorale : La réciproque est globalement fausse en analyse* (une covariance nulle n'indique pas forcément l'indépendance s'il y a un lien quadratique ou circulaire).

#### Coefficient de Corrélation Linéaire ($\rho$) :
On normalise la covariance par les écarts-types respectifs pour obtenir une mesure unitaire comprise strictement entre $-1$ et $1$ :
$$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}$$

#### La Matrice de Covariance ($\Sigma$) :
Pour un vecteur aléatoire $Z = [X, Y]^T$, sa matrice de covariance regroupe les variances et covariances :
$$\Sigma = \begin{pmatrix} \text{Var}(X) & \text{Cov}(X, Y) \\ \text{Cov}(Y, X) & \text{Var}(Y) \end{pmatrix}$$

---

## Exercices Résolus

### Exercice : Calcul de lois marginales conjointes
Soit la densité conjointe d'un couple $(X, Y)$ définie sur $[0, 1] \times [0, 1]$ par :
$$f_{X,Y}(x, y) = x + y$$
Et $f_{X,Y}(x, y) = 0$ en dehors de ce carré unitaire de référence.
1. Valider la condition de normalisation.
2. Déterminer la densité marginale de la variable $X$.
3. Evaluer si les variables $X$ et $Y$ sont indépendantes.

**Correction Étape par Étape :**
1. **Étape 1 : Normalisation**  
   Intégrons la densité conjointe sur le carré :
   $$\int_{0}^{1} \int_{0}^{1} (x + y) \, dx \, dy = \int_{0}^{1} \left[ \frac{x^2}{2} + xy \right]_{0}^{1} \, dy = \int_{0}^{1} \left(\frac{1}{2} + y\right) \, dy = \left[ \frac{y}{2} + \frac{y^2}{2} \right]_{0}^{1} = \frac{1}{2} + \frac{1}{2} = 1$$
   La condition est parfaitement et rigoureusement vérifiée.

2. **Étape 2 : Calcul de la marginale de $X$**  
   Pour un réel $x \in [0, 1]$, intégrons par rapport au paramètre spectral vertical $y$ :
   $$f_X(x) = \int_{0}^{1} (x + y) \, dy = \left[ xy + \frac{y^2}{2} \right]_{y=0}^{y=1} = \mathbf{x + \frac{1}{2}}$$
   Et $f_X(x) = 0$ pour $x \notin [0, 1]$. Par symétrie du couple, $f_Y(y) = y + \frac{1}{2}$ pour $y \in [0, 1]$.

3. **Étape 3 : Indépendance**  
   Regardons si le produit $f_X(x) \times f_Y(y)$ est égal à la densité conjointe $f_{X,Y}(x,y)$ :
   $$f_X(x) \times f_Y(y) = \left(x + \frac{1}{2}\right)\left(y + \frac{1}{2}\right) = xy + \frac{x}{2} + \frac{y}{2} + \frac{1}{4}$$
   Or, $f_{X,Y}(x, y) = x + y$.  
   Comme ces expressions diffèrent (par exemple pour $x=0.5, y=0.5$ : $0.5 \times 0.5 + 0.5 = 1 \neq 1 + 1/4$), on en conclut :
   **Les variables $X$ et $Y$ ne sont pas indépendantes.**

---

## FAQ Étudiante

<details>
  <summary>Pourquoi est-ce qu'une covariance nulle n'implique pas forcément l'indépendance ?</summary>

  La covariance mesure uniquement les corrélations de nature strictement **linéaire**. S'il existe une corrélation non linéaire parfaite entre deux variables (par exemple $Y = X^2$ avec $X$ variable normale centrée symétrique), elles sont viscéralement liées de manière non linéaire. Pourtant, la covariance $\text{Cov}(X, Y)$ vaudra mathématiquement zéro. Elle est donc "aveugle" aux géométries complexes non rectilignes.
</details>

<details>
  <summary>À quoi correspond la matrice de covariance de vecteurs dans l'apprentissage automatique (Machine Learning) ?</summary>

  Dans l'IA et la science des données, la matrice de covariance ($\Sigma$) est le cœur battant de l'**Analyse en Composantes Principales (ACP)**. Elle permet d'identifier l'axe géométrique d'étalement bidimensionnel maximal des données de features pour réduire massivement les dimensions par projection linéaire de vecteurs propres.
</details>

<details>
  <summary>Quelle est la particularité géométrique d'un vecteur Gaussien ?</summary>

  Un vecteur aléatoire suit une loi normale multidimensionnelle si toute combinaison linéaire réelle de ses coordonnées individuelles suit une loi normale univariée. C'est une structure extrêmement stable et robuste, où les lignes de d'isodensité tracent de magnifiques ellipses régulières concentriques de contours dans l'espace.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si deux variables aléatoires d'évaluation continues X et Y satisfont Cov(X, Y) = 0, on affirme avec certitude absolue :**
- [ ] Qu'elles sont forcément indépendantes statistiquement
- [ ] Que leur covariance relative vaut 100
- [x] Que l'espérance de leur produit direct E(XY) s'ajuste à E(X)E(Y)
> **Explication :** La définition classique de la covariance stipule $\text{Cov}(X, Y) = E(XY) - E(X)E(Y)$. Si cette dernière s'annule, l'égalité s'en déduit immédiatement, prouvant la décomposition d'espérance de produit.

**Question 2 : Comment obtient-on la loi unilatérale fY(y) à partir d'une loi bidimensionnelle f(x, y) ?**
- [ ] En multipliant par le gradient total local
- [ ] En dérivant l'ensemble par rapport à la variable x
- [x] En intégrant f(x, y) par rapport à la variable x sur son domaine intégral
> **Explication :** Marginaliser par rapport à une cible consiste à sommer l'ensemble des probabilités mutuelles sur tout l'univers réel de l'autre coordonnée par une opération d'intégration générale.

**Question 3 : Quelle limite de valeurs encadre le coefficient de corrélation linéaire de Pearson ρ ?**
- [ ] Borné entre 0 et l'infini (+∞)
- [x] Borné strictement entre -1 (corrélation inverse parfaite) et +1 (corrélation parfaite)
- [ ] Borné entre -0.5 et 0.5 uniquement
> **Explication :** Par inégalité de Cauchy-Schwarz, le ratio de covariance par le produit des deux écarts-types normatifs produit une valeur normalisée évoluant uniquement sur le segment $[-1, 1]$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Valider la normalisation d'une densité conjointe volumique par calcul d'intégrales doubles croisées.
- [ ] Calculer les densités de fonctions marginales à partir d'expressions de densités conjointes.
- [ ] Établir ou réfuter l'indépendance d'un couple continu en testant la factorisation de densités.
- [ ] Calculer la covariance et la corrélation de Pearson pour caractériser le couplage linéaire de signaux.
