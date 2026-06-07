---
title: 'CPGE : Structures Algébriques Usuelles'
level: Post_Bac
subLevel: CPGE
order: 1
---
# CPGE : Structures Algébriques Usuelles

**Niveau** : Post-Bac (CPGE MPSI, PCSI, MP, MPI, L1/L2 Double Licence Mathématiques)  
**Prérequis** : Théorie des ensembles, relations d'équivalence, logique mathématique de base.  
**Objectifs** :
- Définir et caractériser une loi de composition interne, ses propriétés fondamentales (associativité, commutativité, éléments neutres et symétriques).
- Appliquer la structure de Groupe, de Sous-groupe et caractériser les morphismes de groupes.
- Analyser les structures d'Anneau et de Corps, et identifier les diviseurs de zéro et éléments inversibles.

---

## Activités de découverte

### Activité : L'arithmétique de l'horloge (Symphonie Modulaire)
Imaginez une horloge à 12 heures. S'il est 10h et que vous ajoutez 5 heures, l'aiguille indique 3h. Mathématiquement, nous écrivons :
$$10 \oplus 5 = 3$$
Cette opération ressemble à l’addition standard, mais elle s’effectue dans un ensemble fini : $S = \{0, 1, 2, ..., 11\}$. 

Quelles sont les propriétés remarquables de cette addition circulaire $\oplus$ ?
1. **Fermeture** : Si vous prenez deux nombres de l'horloge et les additionnez, vous retombez toujours sur un nombre de l'horloge.
2. **Élément neutre** : Ajouter 0 heure ne change pas l'heure ($x \oplus 0 = x$).
3. **Symétrique** : Pour chaque heure, il existe un "opposé" qui permet de revenir à 0. Par exemple, l'opposé de 10h est 2h car $10 \oplus 2 = 12 \equiv 0$.

Sans le savoir, vous venez de manipuler le groupe additif $\mathbb{Z}/12\mathbb{Z}$. Cette modélisation d’ensembles munis d’opérations respectant des règles formelles s'appelle la théorie des **structures algébriques**. Elle fournit un cadre d'abstraction puissant utilisé en cryptographie (comme l'algorithme RSA) ou en physique des particules.

---

## Fondements Théoriques

### 1. Lois de Composition Interne (LCI)

Soit $E$ un ensemble non vide.

#### Définition :
On appelle **loi de composition interne** (LCI) sur $E$ toute application $*$ de $E \times E$ dans $E$ :
$$\forall (x, y) \in E^2, \ x * y \in E$$

#### Propriétés remarquables :
- **Associativité** : $\forall (x, y, z) \in E^3, \ (x * y) * z = x * (y * z)$.
- **Commutativité** : $\forall (x, y) \in E^2, \ x * y = y * x$.
- **Élément neutre** : Il existe $e \in E$ tel que $\forall x \in E, \ x * e = e * x = x$. S'il existe, cet élément neutre est unique.
- **Élément symétrisable** : Si $e \in E$ est un élément neutre, un élément $x \in E$ est dit symétrisable s'il existe $x' \in E$ tel que $x * x' = x' * x = e$.

### 2. Structure de Groupe

Un **groupe** est la structure algébrique la plus fondamentale associant un ensemble à une seule loi.

#### Définition :
Un couple $(G, *)$ est un **groupe** si $*$ est une LCI sur $G$ vérifiant :
1. $*$ est associative.
2. $*$ possède un élément neutre $e \in G$.
3. Tout élément de $G$ admet un symétrique dans $G$ pour la loi $*$.
Si de plus la loi $*$ est commutative, on dit que $(G, *)$ est un **groupe abélien** (ou commutatif).

#### Sous-groupes :
Un sous-ensemble non vide $H \subset G$ est un **sous-groupe** de $(G, *)$ si la restriction de la loi $*$ à $H$ munit $H$ d'une structure de groupe.

> **Caractérisation d'un sous-groupe :**  
> $H$ est un sous-groupe de $(G, *)$ si et seulement si :
> - $H \ne \emptyset$ (en pratique, on vérifie que $e \in H$).
> - $\forall (x, y) \in H^2, \ x * y^{-1} \in H$ (où $y^{-1}$ désigne le symétrique de $y$).

#### Morphisme de Groupes :
Soient $(G, *)$ et $(G', \cdot)$ deux groupes. Une application $f: G \to G'$ est un **morphisme de groupes** si:
$$\forall (x, y) \in G^2, \ f(x * y) = f(x) \cdot f(y)$$

### 3. Anneaux et Corps

Ces structures combinent deux lois de composition internes, généralement notées $+$ (loi additive) et $\times$ (loi multiplicative).

#### Structure d'Anneau :
Un triplet $(A, +, \times)$ est un **anneau** si :
1. $(A, +)$ est un groupe abélien d'élément neutre $0_A$.
2. $\times$ est associative, possède un élément neutre $1_A \in A$, et est distributive par rapport à la loi $+$ :
   $$\forall (x, y, z) \in A^3, \ x \times (y + z) = (x \times y) + (x \times z)$$

#### Structure de Corps :
Un triplet $(K, +, \times)$ est un **corps** si :
1. $(K, +, \times)$ est un anneau commutatif.
2. Tout élément différent de l'élément neutre additif ($0_K$) est inversible pour la loi multiplicative $\times$.

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi l'ensemble des matrices carrées muni de la multiplication n'est-il pas un corps ?</summary>

  L'ensemble $\mathcal{M}_n(\mathbb{R})$ muni de l'addition et du produit matriciel $(\mathcal{M}_n(\mathbb{R}), +, \times)$ forme bien un anneau. Cependant, ce n'est pas un corps pour deux raisons :
  1. Le produit matriciel n'est pas commutatif pour $n \ge 2$.
  2. Toutes les matrices non nulles ne sont pas inversibles. Les matrices dont le déterminant est nul (matrices singulières) n'admettent aucun inverse multiplicatif.
</details>

<details>
  <summary>Quelle est la différence fondamentale entre les groupes Z/nZ et R ?</summary>

  Le groupe $(\mathbb{Z}/n\mathbb{Z}, +)$ est un groupe abélien **fini** d'ordre $n$. Il a un comportement cyclique. En revanche, $(\mathbb{R}, +)$ est un groupe abélien **infini** continu (non dénombrable), qui ne contient aucun élément d'ordre fini hormis son élément neutre 0.
</details>

<details>
  <summary>Qu'est-ce qu'un automorphisme de groupe ?</summary>

  Un **automorphisme** est un morphisme de groupes d'un groupe $G$ dans lui-même qui est bijectif. L'ensemble des automorphismes d'un groupe $G$, noté $\text{Aut}(G)$, muni de la loi de composition de fonctions $\circ$, forme lui-même un groupe.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Soit l'ensemble des entiers relatifs pairs $2\mathbb{Z} = \{..., -4, -2, 0, 2, 4, ...\}$. Quelle structure possède-t-il sous l'addition usuelle ?**
- [ ] Il ne possède pas de structure algébrique stable
- [x] Un sous-groupe de $(\mathbb{Z}, +)$ car il est non vide et la différence de deux entiers pairs reste paire
- [ ] Un anneau unitaire car le produit d'entiers pairs est pair
- > **Explication :** $2\mathbb{Z}$ est non vide ($0 \in 2\mathbb{Z}$). De plus, pour tout $(2k, 2k') \in (2\mathbb{Z})^2$, la différence $2k - 2k' = 2(k-k')$ appartient bien à $2\mathbb{Z}$. C'est donc un sous-groupe de $(\mathbb{Z}, +)$. Ce n'est pas un anneau unitaire car il ne contient pas l'élément neutre de la multiplication, qui est 1 (entier impair).

**Question 2 : Dans le groupe additif $\mathbb{Z}/6\mathbb{Z}$, quel est l'ordre de l'élément classe $\bar{2}$ ?**
- [ ] Un ordre infini
- [ ] L'ordre est égal à 2 car $2 \times \bar{2} = \bar{4} \ne \bar{0}$
- [x] L'ordre est égal à 3 car $\bar{2} \oplus \bar{2} \oplus \bar{2} = \bar{6} \equiv \bar{0}$
- > **Explication :** L'ordre d'un élément $x$ dans un groupe additif est le plus petit entier strictement positif $k$ tel que $k \cdot x = 0$. Ici, $1 \cdot \bar{2} = \bar{2} \ne \bar{0}$, $2 \cdot \bar{2} = \bar{4} \ne \bar{0}$, et $3 \cdot \bar{2} = \bar{6} \equiv \bar{0}$. L'ordre de l'élément est donc 3.

**Question 3 : Soit $f: (G, *) \to (G', \cdot)$ un morphisme de groupes. Quel ensemble caractérise le noyau de ce morphisme, noté $\text{Ker}(f)$ ?**
- [ ] L'ensemble des antécédents des éléments inversibles de $G'$
- [x] L'ensemble des éléments de $G$ dont l'image par $f$ est l'élément neutre de $G'$
- [ ] L'ensemble des valeurs d'images non nulles de $G'$
- > **Explication :** Par définition algébrique formelle, le noyau d'un morphisme de groupes $f$ est le sous-ensemble de départ défini par $\text{Ker}(f) = \{ x \in G \ | \ f(x) = e_{G'} \}$, où $e_{G'}$ désigne l'élément neutre du groupe d'arrivée $G'$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Établir rigoureusement si une opération donnée définit ou non une loi de composition interne sur un ensemble spécifique.
- [ ] Utiliser le critère de caractérisation des sous-groupes pour prouver qu'un sous-ensemble est un sous-groupe.
- [ ] Démontrer qu'une application bijective entre deux ensembles structurés constitue un isomorphisme de groupes.
- [ ] Citer les définitions axiomatiques précises d'un Groupe, d'un Anneau et d'un Corps.
