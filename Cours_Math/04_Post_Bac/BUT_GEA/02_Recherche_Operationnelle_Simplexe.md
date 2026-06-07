---
title: 'BUT GEA : Recherche Opérationnelle & Algorithme du Simplexe'
level: Post_Bac
subLevel: BUT_GEA
order: 2
---
# BUT GEA : Recherche Opérationnelle & Algorithme du Simplexe

**Niveau** : Post-Bac (BUT GEA 2ème année, Licence Gestion/Éco, Écoles d'Ingénieurs)  
**Prérequis** : Systèmes d'équations linéaires, espaces vectoriels de base, manipulation de matrices.  
**Objectifs** :
- Modéliser un problème économique sous forme de programme linéaire (maximisation ou minimisation).
- Résoudre graphiquement un programme linéaire à deux variables de décision.
- Maîtriser le passage à la forme standard à l'aide de variables d'écart.
- Comprendre et appliquer les itérations du pivot de Gauss dans l'Algorithme du Simplexe.

---

## Activités de découverte

### Activités : Optimiser la production d'une usine de jouets sous contrainte de ressources
Une petite usine fabrique deux types de jouets en bois : des voitures ($X_1$) et des trains ($X_2$).
- Chaque voiture génère un bénéfice net de $10\ €$.
- Chaque train génère un bénéfice net de $15\ €$.

L'usine dispose de deux ateliers limités en temps de travail quotidien :
1. **L'atelier de découpe** possède un maximum de 80 heures disponibles par jour. Fabriquer une voiture nécessite 2 heures de découpe, un train nécessite 4 heures. (Contrainte : $2X_1 + 4X_2 \le 80$)
2. **L'atelier de peinture** dispose de 60 heures par jour. Une voiture requiert 3 heures de peinture, un train requiert 2 heures. (Contrainte : $3X_1 + 2X_2 \le 60$)

La non-négativité impose : $X_1 \ge 0, X_2 \ge 0$.
Le directeur souhaite maximiser le profit global de l'usine : $Z = 10X_1 + 15X_2$.

Comment choisir précisément les quantités $X_1$ et $X_2$ à produire pour maximiser ce profit tout en respectant scrupuleusement les contraintes de temps des ateliers ? 
C'est le rôle fondamental de la **Programmation Linéaire** et de la **Recherche Opérationnelle** d'apporter une solution optimale rigoureuse !

---

## Fondements Théoriques

### 1. Forme Canonique d'un Programme Linéaire (PL)

Un problème de maximisation linéaire sous forme canonique s'écrit de la façon suivante :
$$\text{Maximiser } Z = c_1 x_1 + c_2 x_2 + \dots + c_n x_n$$
Sous les contraintes linéaires suivantes :
$$
\begin{cases}
a_{11} x_1 + a_{12} x_2 + \dots + a_{1n} x_n \le b_1 \\
a_{21} x_1 + a_{22} x_2 + \dots + a_{2n} x_n \le b_2 \\
\dots \\
a_{m1} x_1 + a_{m2} x_2 + \dots + a_{mn} x_n \le b_m
\end{cases}
$$
avec les contraintes de non-négativité : $x_j \ge 0$ pour tout $j \in \{1, \dots, n\}$.
Ici, les coefficients $b_i \ge 0$ représentent les ressources disponibles et les $c_j$ les coefficients de profitabilité économique.

### 2. Passage à la Forme Standard & Variables d'Écart

Pour résoudre algébriquement un PL par l'algorithme du simplexe, il faut transformer les contraintes d'inégalités ($\le$) en équations strictes ($=$). On introduit pour cela des **variables d'écart** positives $e_i \ge 0$ qui mesurent la sous-utilisation ou le reste inutilisé de chaque ressource $i$ :
$$a_{i1} x_1 + a_{i2} x_2 + \dots + a_{in} x_n + e_i = b_i$$

### 3. Fonctionnement de l'Algorithme du Simplexe

L’algorithme du simplexe progresse de manière itérative d’un sommet (solution réalisable de base) du polytope des contraintes vers un sommet adjacent meilleur, jusqu'à atteindre l'optimum.

```
Étapes élémentaires d'un tableau du Simplexe :
1. Identifier la colonne du pivot : celle ayant le coefficient le plus positif (ou négatif selon la convention) dans la ligne de la fonction économique Z. La variable correspondante entre en base.
2. Identifier la ligne du pivot : pour chaque ligne ayant un coefficient strictement positif dans la colonne du pivot, calculer le ratio (Ressource b_i / Coefficient). La ligne ayant le ratio positif minimal est choisie. Cette variable sort de la base.
3. Effectuer l'opération de pivotage de Gauss pour transformer la colonne du pivot en vecteur unitaire.
4. Répéter l'opération tant qu'il reste des coefficients améliorants dans la ligne Z.
```

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Qu'appelle-t-on le problème Dual en programmation linéaire ?</summary>

  À tout programme linéaire de maximisation (appelé **Primal**), on peut associer de manière symétrique un programme de minimisation appelé **Dual**, où les variables du dual modélisent la valeur marginale économique (les prix fictifs ou *shadow prices*) de chaque ressource du primal.  
  
  Le théorème de la dualité forte affirme que si le primal possède une solution optimale $Z^*$, alors le dual possède également une solution optimale $W^*$ et leurs valeurs optimales sont rigoureusement identiques : $Z^* = W^*$.
</details>

<details>
  <summary>Quand peut-on utiliser la méthode de résolution graphique ?</summary>

  La méthode graphique est applicable uniquement lorsque le problème ne comporte pas plus de **2 variables de décision** (3 variables à la rigueur, en perspective tridimensionnelle, mais difficile à tracer). On dessine le polygone convexe des contraintes, puis on trace les droites d'iso-profit. Le sommet optimal est le dernier point du polygone touché par les droites parallèles d'iso-profit en quittant la zone réalisable.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Dans notre activité introductive de découpe ($2X_1 + 4X_2 \le 80$), si l'on produit 10 voitures ($X_1 = 10$) et 10 trains ($X_2 = 10$), quelle est la valeur de la variable d'écart de découpe $e_1$ ?**
- [ ] $0$
- [x] $20$
- [ ] $80$
> **Explication :** En injectant les coordonnées dans l'inéquation : $2(10) + 4(10) + e_1 = 80 \iff 20 + 40 + e_1 = 80 \iff 60 + e_1 = 80 \iff e_1 = 20$. L'usine n'utilise que 60 heures sur les 80 de découpe, il reste donc un écart inutilisé de 20 heures.

**Question 2 : Lors d'une itération de l'algorithme du Simplexe, quel critère permet de sélectionner la variable qui doit quitter la base (variable sortante) ?**
- [ ] Le coefficient le plus élevé de la fonction objectif
- [x] Le ratio minimum strictement positif du quotient entre le second membre de la contrainte (ressource) et le coefficient de pivotement de la ligne
- [ ] La variable ayant la valeur alphabétique la plus élevée
> **Explication :** Pour s'assurer de ne pas quitter la zone des solutions réalisables (conserver des variables positives), la règle de ratio minimal de l'algorithme impose de choisir la variable sortante associée au plus petit ratio strictement positif de $\frac{b_i}{a_{ij}}$.

**Question 3 : En programmation linéaire, que garantit la convexité du domaine des contraintes financières ?**
- [x] Que tout optimum local est automatiquement un optimum global global de résolution
- [ ] Qu'il est obligatoire d'avoir des nombres complexes au tableau final
- [ ] Que le problème est toujours à solutions périodiques infinies
> **Explication :** Le domaine réalisable d'un programme linéaire est un polytope convexe. Sur un ensemble de contraintes convexes et avec une fonction objectif linéaire, le théorème de l'optimisation linéaire garantit de façon universelle que tout extremum local identifié est intrinsèquement l'optimum global unique (ou faisant partie d'une famille d'optiums multiples optimaux).

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Traduire un énoncé commercial complexe sous forme matricielle standard d'un Programme Linéaire.
- [ ] Déterminer l'espace des solutions réalisables et le point optimal par méthode géométrique à deux dimensions.
- [ ] Intégrer les variables d'écart pour modéliser le problème sous forme d'un tableau du Simplexe standardisé.
- [ ] Mener à bien au moins deux itérations manuelles de calcul de pivot de Gauss sur un tableau du simplexe.
