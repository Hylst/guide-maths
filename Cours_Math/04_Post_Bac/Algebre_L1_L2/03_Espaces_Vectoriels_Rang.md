---
title: 'Algèbre L1/L2 : Espaces Vectoriels & Théorème du Rang'
level: Post_Bac
subLevel: Algebre_L1_L2
order: 3
---
# Algèbre L1/L2 : Espaces Vectoriels & Théorème du Rang

**Niveau** : Post-Bac (Licence 1 & 2, Écoles d'Ingénieurs, CPGE MPSI/PCSI)  
**Prérequis** : Systèmes à plusieurs équations lineaires, calcul matriciel élémentaire, géométrie plane vectorielle.  
**Objectifs** :
- Définir formellement un Espace Vectoriel et identifier un sous-espace vectoriel (SEV).
- Manipuler les notions de familles libres, génératrices et de Base en dimension finie.
- Formuler et appliquer le Théorème du Rang pour analyser l'injectivité et la surjectivité des applications linéaires.

---

## Activités de découverte

### Activités : Les composantes rvb de pixel d'écran de téléphone
Chaque couleur affichée sur l'écran de votre smartphone est composée d'un mélange de trois couleurs fondamentales : le Rouge ($R$), le Vert ($V$) et le Bleu ($B$).
On peut modéliser chaque couleur par un triplet de coordonnées $(r, v, b)$ où chaque composante varie continûment entre $0$ et $1$ (ou entre $0$ et $255$).

1. **Addition de couleurs** : Si vous superposez un projecteur de couleur $C_1 = (r_1, v_1, b_1)$ et un autre $C_2 = (r_2, v_2, b_2)$, vous obtenez une nouvelle couleur $C' = (r_1+r_2, v_1+v_2, b_1+b_2)$.
2. **Dilatation (multiplication par un scalaire)** : Si vous baissez la luminosité globale de moitié d'une couleur $C_1 = (r_1, v_1, b_1)$, vous multipliez toutes ses composantes par $0.5$, pour obtenir $0.5 \cdot C_1 = (0.5r_1, 0.5v_1, 0.5b_1)$.

En éliminant les contraintes physiques de saturation minimale et maximale, l'ensemble des "couleurs" possibles muni de ces deux lois possède exactement toutes les propriétés axiomatiques d'un **espace vectoriel** de dimension $3$ ! Les couleurs Rouge, Vert, Bleu forment la **base canonique** de cet espace.

---

## Fondements Théoriques

### 1. Espaces et Sous-Espaces Vectoriels

#### Définition d'un Espace Vectoriel (EV) :
Soit $\mathbb{K}$ un corps commutatif (généralement $\mathbb{R}$ ou $\mathbb{C}$). Un ensemble $E$ muni d'une loi de composition interne $+$ et d'une loi de composition externe $\cdot$ (qui associe un élément de $\mathbb{K}$ et un élément de $E$ pour donner un élément de $E$) est un **$\mathbb{K}$-espace vectoriel** si $(E, +)$ est un groupe abélien et si la loi externe respecte l'associativité et la distributivité usuelles.

#### Caractérisation d'un Sous-Espace Vectoriel (SEV) :
Une partie $F \subset E$ est un sous-espace vectoriel de $(E, +, \cdot)$ si et seulement si :
1. $F$ est non vide (contient notamment l'élément neutre $0_E$).
2. $F$ est stable par combinaison linéaire :
$$\forall x, y \in F, \forall \lambda, \mu \in \mathbb{K}, \quad \lambda x + \mu y \in F$$

### 2. Bases et Dimension Finie

- Une famille de vecteurs $(v_1, v_2, \dots, v_n)$ de $E$ est **libre** si :
$$\forall (\lambda_1, \dots, \lambda_n) \in \mathbb{K}^n, \quad \sum_{i=1}^n \lambda_i v_i = 0_E \implies \lambda_1 = \lambda_2 = \dots = \lambda_n = 0$$
Dans ce cas, les vecteurs sont dits linéairement indépendants.
- Elle est **génératrice** de $E$ si tout vecteur de $E$ peut s'écrire comme combinaison linéaire de ces vecteurs.
- Une famille à la fois libre et génératrice de $E$ est appelée une **Base** de $E$.
- Si $E$ possède une base finie, toutes ses bases possèdent le même nombre de vecteurs. Ce nombre unique s'appelle la **dimension** de $E$ et est noté $\text{dim}(E)$.

### 3. Le Théorème du Rang

Soient $E$ et $F$ deux $\mathbb{K}$-espaces vectoriels, avec $E$ de dimension finie. Soit $u : E \to F$ une application linéaire.
Le **noyau** de $u$ est $\text{Ker}(u) = \{ x \in E \mid u(x) = 0_F \}$, et l'**image** de $u$ est $\text{Im}(u) = \{ u(x) \mid x \in E \}$.

#### Théorème du Rang (Théorème fondamental d'algèbre linéaire) :
La somme de la dimension du noyau de $u$ et du rang de $u$ (dimension de l'image) est égale à la dimension de l'espace de départ $E$ :
$$\text{dim}(\text{Ker}(u)) + \text{rg}(u) = \text{dim}(E)$$
où $\text{rg}(u) = \text{dim}(\text{Im}(u))$.

#### Corollaires importants :
Si $\text{dim}(E) = \text{dim}(F)$, alors les propositions suivantes sont équivalentes :
1. $u$ est injective ($\text{Ker}(u) = \{0_E\}$).
2. $u$ est surjective ($\text{Im}(u) = F$).
3. $u$ est bijective (isomorphisme).

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Comment détermine-t-on concrètement le rang et la base de l'image d'une matrice ?</summary>

  On utilise la méthode d'élimination de Gauss (ou pivot de Gauss) ! On applique l'algorithme sur les colonnes de la matrice pour obtenir des colonnes échelonnées. Les colonnes non nulles résultantes forment une base de l'image ($\text{Im}(u)$), et leur nombre donne précisément le rang de l'application.
</details>

<details>
  <summary>Est-ce que l'intersection et la réunion de deux SEV sont toujours des SEV ?</summary>

  L'intersection $F \cap G$ de deux sous-espaces vectoriels de $E$ est **toujours** un sous-espace vectoriel de $E$.  
  En revanche, la réunion $F \cup G$ n'est **presque jamais** un sous-espace vectoriel, sauf si l'un d'eux est inclus dans l'autre ($F \subset G$ ou $G \subset F$). Pour combiner des espaces, on préfère utiliser la notion de somme de sous-espaces $F + G$.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Soit l'application linéaire $u : \mathbb{R}^3 \to \mathbb{R}^2$. Quelle est la valeur maximale possible du rang $\text{rg}(u)$ ?**
- [ ] 3
- [x] 2
- [ ] 5
> **Explication :** L'image $\text{Im}(u)$ est un sous-espace vectoriel de l'espace d'arrivée $\mathbb{R}^2$. Donc la dimension de l'image (le rang de $u$) ne peut jamais dépasser la dimension de l'espace de réception, qui vaut $2$. Ainsi, $\text{rg}(u) \le 2$.

**Question 2 : Une application linéaire $u : \mathbb{R}^4 \to \mathbb{R}^4$ possède un noyau $\text{Ker}(u)$ réduit à un seul vecteur non nul. Peut-elle être bijective ?**
- [ ] Oui, d'après le Théorème du Rang
- [x] Non, car son noyau n'est pas trivial (réduit au seul vecteur nul $\{0_E\}$)
- [ ] Uniquement si sa matrice est symétrique positive
> **Explication :** Pour qu'une application linéaire soit injective (et donc bijective en dimension finie égale), son noyau doit être **strictement restreint au seul vecteur nul $\{0_{\mathbb{R}^4}\}$**. La présence d'un vecteur non nul dans le noyau implique que $u$ n'est pas injective, donc pas bijective.

**Question 3 : Soit l'espace $E = \mathbb{R}_2[X]$ des polynômes réels de degré inférieur ou égal à 2. Quelle est la dimension réelle de cet espace vectoriel ?**
- [ ] 2
- [x] 3
- [ ] Infinité dénombrable
> **Explication :** Une base naturelle (base canonique) de l'espace des polynômes de degré $\le 2$ est $(1, X, X^2)$. Cette famille comprend exactement 3 vecteurs linéairement indépendants. Ainsi, $\text{dim}(\mathbb{R}_2[X]) = 3$. De façon générale, $\text{dim}(\mathbb{R}_n[X]) = n + 1$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Démonter rigoureusement qu'une partie de $\mathbb{R}^n$ ou d'un espace fonctionnel est un sous-espace vectoriel stable.
- [ ] Démontrer si une famille de vecteurs est libre ou génératrice, et en déduire l'expression d'une base.
- [ ] Modéliser une application linéaire sous forme matricielle et calculer le noyau de celle-ci.
- [ ] Appliquer le Théorème du Rang pour lier la dimension de l'image et du noyau devant n'importe quel système linéaire.
