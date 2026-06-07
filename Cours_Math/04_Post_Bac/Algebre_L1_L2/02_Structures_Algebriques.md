---
title: 'Algèbre L2 : Structures Algébriques (Groupes, Anneaux, Corps)'
level: Post_Bac
subLevel: Algebre_L1_L2
order: 2
---
# Algèbre L2 : Structures Algébriques (Groupes, Anneaux, Corps)

**Niveau** : Post-Bac (Licence 2, Portail Math-Info, CPGE MP/PC)  
**Prérequis** : Notions d'isomorphismes, arithmétique de base, opérations matricielles de base.  
**Objectifs** :
- Assimiler les définitions de structure de Groupe, d'Anneau et de Corps.
- Caractériser les sous-groupes, les sous-anneaux et étudier les morphismes de groupes.
- Comprendre et appliquer le Théorème de Lagrange sur le cardinal des sous-groupes.

---

## Activités de découverte

### Activités : Les symétries d'un triangle équilatéral et la naissance des groupes
Prenons un triangle équilatéral découpé dans du carton, avec ses sommets numérotés $1, 2, 3$. Quelles transformations géométriques laissent ce triangle globalement invariant dans le plan ?
1. **Les Rotations** : La rotation d'angle $0$ (l'identité), la rotation d'angle $\frac{2\pi}{3}$ et la rotation d'angle $\frac{4\pi}{3}$.
2. **Les Réflexions** : Les symétries axiales par rapport aux trois hauteurs du triangle.

Cela fait $6$ transformations au total. Cet ensemble muni de la loi d'enchaînement (la composition des transformations $\circ$) possède des propriétés fascinantes : la composition de deux transformations est toujours une transformation du triangle ; il existe un élément neutre (l'identité) ; chaque transformation possède une transformation inverse qui l'annule. 
Vous venez de redécouvrir le **groupe diédral $D_3$**, l'un des plus petits groupes non commutatifs. L'étude des symétries géométriques se formalise ainsi en algèbre par la théorie des groupes !

---

## Fondements Théoriques

### 1. La Structure de Groupe

#### Définition :
Un ensemble $G$ muni d'une loi de composition interne $*$ (noté $(G, *)$) est un **groupe** si :
1. **Associativité** : $\forall a, b, c \in G, \quad (a * b) * c = a * (b * c)$
2. **Élément neutre** : $\exists e \in G, \forall a \in G, \quad a * e = e * a = a$
3. **Élément symétrique** : $\forall a \in G, \exists a' \in G, \quad a * a' = a' * a = e$

Si de plus la loi $*$ est commutative ($\forall a, b \in G, a * b = b * a$), le groupe est dit **abélien** (ou commutatif).

#### Critère de sous-groupe :
Une partie non vide $H$ d'un groupe $(G, *)$ est un **sous-groupe** de $G$ si et seulement si :
$$\forall x, y \in H, \quad x * y^{-1} \in H$$

### 2. Morphismes de Groupes

Soient $(G, *)$ et $(G', \cdot)$ deux groupes. Une application $f: G \to G'$ est un **homomorphisme (ou morphisme)** de groupes si :
$$\forall x, y \in G, \quad f(x * y) = f(x) \cdot f(y)$$

- **Le Noyau** d'un morphisme est défini par : $\text{Ker}(f) = \{ x \in G \mid f(x) = e_{G'} \}$. C'est un sous-groupe de $G$.
- **L'Image** d'un morphisme est définie par : $\text{Im}(f) = \{ f(x) \mid x \in G \}$. C'est un sous-groupe de $G'$.
- Un morphisme bijectif est appelé un **isomorphisme**.

### 3. Théorème de Lagrange (Groupes finis)

Soit $G$ un groupe fini de cardinal $|G|$ et $H$ un sous-groupe de $G$.
$$\text{L'ordre (le cardinal) de } H \text{ divise l'ordre de } G.$$
$$|G| = |H| \times [G : H]$$
où $[G : H]$ représente l'indice de $H$ dans $G$ (le nombre de classes d'équivalence à gauche sous la relation d'équivalence induite par $H$).

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Quelle est la différence entre un anneau et un corps ?</summary>

  Un anneau $(A, +, \times)$ dispose de deux lois. $(A, +)$ est un groupe abélien, et la loi $\times$ est associative, distributive par rapport à la loi $+$, et possède un élément neutre $1_A$. Cependant, tous les éléments non nuls d'un anneau ne sont pas forcément inversibles pour la multiplication !  
  Un **corps** est un anneau commutatif dans lequel **tout élément non nul** possède obligatoirement un inverse multiplicatif. Par exemple, $(\mathbb{Z}, +, \times)$ est un anneau (2 n'a pas d'inverse entier), mais $(\mathbb{Q}, +, \times)$ et $(\mathbb{R}, +, \times)$ sont des corps.
</details>

<details>
  <summary>Pourquoi le noyau est-il si important dans l'étude des morphismes ?</summary>

  Le noyau $\text{Ker}(f)$ caractérise l'injectivité du morphisme ! Un morphisme de groupe $f$ est **injectif** si et seulement si son noyau est réduit à l'élément neutre de départ : $\text{Ker}(f) = \{ e_{G} \}$. Cela simplifie grandement les démonstrations d'isomorphismes.
</details>

---

## 📝 Mini-Quiz

**Question 1 : L'ensemble des entiers relatifs pairs muni de l'addition usuelle, noté $(2\mathbb{Z}, +)$, forme-t-il un sous-groupe de $(\mathbb{Z}, +)$ ?**
- [x] Oui, car la somme de deux entiers pairs est paire, l'élément neutre 0 s'y trouve, et l'opposé d'un pair est pair.
- [ ] Non, car le produit de deux entiers pairs n'est pas toujours dans l'ensemble.
- [ ] Uniquement si on rajoute les fractions rationnelles binaires.
> **Explication :** $2\mathbb{Z}$ est non vide ($0 \in 2\mathbb{Z}$). Pour tous entiers pairs $x = 2k$ et $y = 2m$, leur différence $x - y = 2(k - m)$ est encore un entier pair, ce qui prouve par critère de sous-groupe que $(2\mathbb{Z}, +)$ est bien un sous-groupe de $(\mathbb{Z}, +)$.

**Question 2 : Soit $G$ un groupe fini d'ordre 15. D'après le Théorème de Lagrange, quel cardinal est IMPOSSIBLE pour un sous-groupe de $G$ ?**
- [ ] 1
- [ ] 3
- [x] 6
> **Explication :** Le Théorème de Lagrange impose que l'ordre de tout sous-groupe $H$ divise l'ordre du groupe $G$. Les diviseurs positifs de $15$ sont $1, 3, 5, 15$. Par conséquent, aucun sous-groupe de $G$ ne peut posséder un cardinal de $6$, car $6$ ne divise pas $15$.

**Question 3 : La fonction logarithme népérien $\ln : (]0, +\infty[, \times) \to (\mathbb{R}, +)$ constitue-t-elle un morphisme de groupes ?**
- [x] Oui, car pour tous réels x, y strictement positifs, on a ln(xy) = ln(x) + ln(y)
- [ ] Non, car ln(1) = 0 n'est pas l'élément neutre multiplicatif
- [ ] Uniquement si x = e
> **Explication :** La définition d'un morphisme de groupes de $(G, *)$ vers $(G', \cdot)$ exige que $f(x * y) = f(x) \cdot f(y)$. Pour le logarithme : la loi de départ est la multiplication $\times$, la loi d'arrivée est l'addition $+$. L'identité fondamentale $\ln(x \times y) = \ln(x) + \ln(y)$ démontre parfaitement qu'il s'agit d'un morphisme.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Vérifier formellement les axiomes d'une structure de groupe ou d'anneau sur un ensemble de matrices ou de fonctions.
- [ ] Déterminer le noyau, l'image d'un morphisme de groupes et s'en servir pour prouver l'injectivité.
- [ ] Utiliser le théorème de Lagrange pour énumérer ou restreindre les cardinaux possibles de sous-groupes d'un groupe fini.
- [ ] Manipuler des structures d'anneaux cycliques $\mathbb{Z}/n\mathbb{Z}$ et identifier si ce sont des corps (cas où $n$ est premier).
