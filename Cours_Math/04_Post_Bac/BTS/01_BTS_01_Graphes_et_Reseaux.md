---
title: 'BTS SIO : Théorie des Graphes et Réseaux'
level: Post_Bac
subLevel: BTS
order: 1
---
# BTS SIO : Théorie des Graphes et Réseaux

**Niveau** : Post-Bac (BTS Services Informatiques aux Organisations - SIO, BTS Systèmes Numériques / CIEL, Licence Informatique L1-L2)  
**Prérequis** : Algorithmique de base, produit de matrices réelles, structures de données simples.  
**Objectifs** :
- Représenter de façon algébrique un graphe (orienté ou non) par sa matrice d'adjacence ou ses listes de successeurs.
- Résoudre un problème de connexité et calculer le nombre de chemins de longueur donnée entre deux sommets par produit matriciel.
- Appliquer rigoureusement l'**Algorithme de Dijkstra** pour déterminer le chemin optimal de coût minimal au sein d'un graphe ponderé (réseau routier ou routage IP).

---

## Activités de découverte

### Activité : Planifier le déploiement de la fibre optique locale
Visualisez un ensemble d'immeubles corporatifs d'une jeune start-up installée dans les Ardennes. Chaque immeuble est un point (sommet) et chaque tranchée routière utilisable pour enfouir une gaine technique de fibre optique est un trait (arc). 
Le coût de génie civil de chaque tranchée est différent (longueur, géologie du sol, nécessité de forer).

Comment raccorder tous les bâtiments de l'entreprise entre eux en minimisant de façon optimale le budget total de raccordement ?
1. Si l'on relie les points au hasard, on risque d'avoir des boucles redondantes très chères.
2. Pour optimiser, on cherche à éviter les boucles (cycles) tout en garantissant qu'aucun bâtiment ne reste isolé.

En mathématiques de l'informatique, ce problème se résout par la recherche d'un **Arbre Couvrant de Poids Minimal** (à l'aide de l'algorithme de Kruskal ou de Prim). Un graphe est le modèle ultime pour structurer n'importe quel réseau, qu'il s'agisse du trafic routier mondial (Google Maps), des liaisons entre pages Internet (algorithme PageRank de Google) ou de l'acheminement des paquets IP sur le Darknet.

---

## Fondements Théoriques

### 1. Définitions et Terminologie des Graphes

Un **graphe** est un couple $G = (V, E)$ où :
- $V = \{s_1, s_2, ..., s_n\}$ est un ensemble fini de **sommets** (ou nœuds).
- $E$ est un ensemble de paires de sommets appelées **arêtes** (graphe non orienté) ou **arcs** (graphe orienté).

#### Matrice d'Adjacence $M$ :
Pour un graphe ordonné de $n$ sommets, la **matrice d'adjacence** est la matrice carrée de taille $n \times n$ définie par :
$$
M_{ij} = \begin{cases}
1 & \text{si le sommet } s_i \text{ est lié au sommet } s_j \\ 
0 & \text{sinon} 
\end{cases}
$$

#### Théorème des chemins :
Soit $M$ la matrice d'adjacence d'un graphe. Le nombre de chemins de longueur exacte $k$ allant du sommet $s_i$ au sommet $s_j$ est donné par le coefficient d'indices $(i, j)$ de la puissance matricielle $M^k$.

### 2. Degrés, Connexité et Coloration

#### Degré d'un sommet :
- Pour un graphe non orienté, le **degré** d'un sommet est le nombre d'arêtes qui lui sont rattachées.
- **Théorème d'Euler (Handshaking Lemma)** : La somme des degrés de tous les sommets est égale à deux fois le nombre d'arêtes du graphe :
  $$\sum_{v \in V} \deg(v) = 2 \times |E|$$
Par conséquent, le nombre de sommets de degré impair est nécessairement pair.

#### Coloration de Graphe :
La **coloration** d'un graphe consiste à attribuer une couleur à chaque sommet de telle sorte que deux sommets adjacents n'aient jamais la même couleur.
- Le plus petit nombre de couleurs nécessaire s'appelle le **nombre chromatique**, noté $\chi(G)$.

### 3. Recherche du Plus Court Chemin : Algorithme de Dijkstra

L'algorithme de Dijkstra permet de trouver le chemin le plus court (coût total minimal) entre un sommet source et tous les autres dans un graphe orienté ou non, dont le poids des arcs est positif ou nul.

#### Algorithme de Dijkstra Étape par Étape :
1. Associer à chaque sommet une distance provisoire infinie ($+\infty$), et une distance nulle pour le sommet de départ.
2. Marquer tous les sommets comme non visités. Sélectionner le sommet non visité de distance minimale comme sommet courant.
3. Pour le sommet courant, examiner ses voisins non visités. Calculer leur distance alternative en additionnant le poids de l'arc à la distance du sommet courant. Si cette distance est inférieure à la distance actuellement enregistrée, mettre à jour la distance et noter le sommet courant comme prédécesseur.
4. Une fois tous ses voisins parcourus, marquer le sommet courant comme visité. Il ne sera plus réévalué.
5. Répéter l'étape 3 et 4 tant qu'il reste des sommets non visités.

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi l'algorithme de Dijkstra ne fonctionne-t-il pas avec des poids d'arcs négatifs ?</summary>

  L'algorithme de Dijkstra repose sur un principe glouton (greedy) : il fige définitivement la distance d'un sommet dès que celui-ci est sélectionné comme visité. Si un arc a un poids négatif, un chemin plus long en nombre de sommets mais de coût cumulé plus faible pourrait exister ultérieurement sans pouvoir être réévalué. Pour les graphes à arêtes négatives, on utilise l'algorithme de Bellman-Ford.
</details>

<details>
  <summary>Qu'est-ce qu'un graphe planaire ?</summary>

  Un graphe est dit **planaire** s'il peut être dessiné dans un plan sans qu'aucune de ses arêtes ne se croise. D'après le théorème des 4 couleurs, tout graphe planaire peut être coloré en utilisant au maximum 4 couleurs distinctes ($\chi(G) \le 4$).
</details>

<details>
  <summary>Quelle est la différence entre un cycle de Hamilton et un cycle d'Euler ?</summary>

  Un **cycle d'Euler** est un chemin fermé qui passe par **chaque arête** du graphe une et une seule fois. Un **cycle hamiltonien** est un chemin fermé qui passe par **chaque sommet** du graphe une et une seule fois. Déterminer si un graphe possède un cycle d'Euler est simple (tous les sommets doivent être de degré pair), alors que trouver un cycle hamiltonien est un problème NP-complet complexe (problème du voyageur de commerce).
</details>

---

## 📝 Mini-Quiz

**Question 1 : Dans un graphe non orienté de 5 sommets, la somme des degrés de tous les sommets est égale à 14. Combien d'arêtes possède ce graphe ?**
- [x] 7 arêtes d'après la formule d'Euler (Somme des degrés = 2 * nombre d'arêtes)
- [ ] 14 arêtes
- [ ] 5 arêtes
- > **Explication :** La relation d'Euler pour les degrés énonce que la somme de tous les degrés d'un graphe est égale à deux fois le nombre d'arêtes ($2 \times |E| = \sum \deg(v)$). Ici, $2 \times |E| = 14$, ce qui implique un nombre total d'arêtes égal à $14 / 2 = 7$.

**Question 2 : La matrice d'adjacence d'un graphe au carré est calculée et contient la valeur $M^2_{1,3} = 4$. Qu'indique cette donnée d'un point de vue topologique ?**
- [ ] Il y a 4 arêtes directes entre le sommet 1 et le sommet 3
- [ ] Le sommet 1 a une distance minimale de 4 arcs pour atteindre le sommet 3
- [x] Il existe exactement 4 chemins distincts composés de 2 arcs successifs pour relier le sommet 1 au sommet 3
- > **Explication :** En théorie des graphes algébriques, le coefficient d'indice $(i, j)$ de la matrice d'adjacence élevée à la puissance $k$ donne exactement le nombre de chemins de longueur exacte $k$ reliant le sommet $i$ au sommet $j$.

**Question 3 : Pour colorer un graphe complet à 5 sommets (contenant toutes les liaisons directes possibles entre sommets), de combien de couleurs a-t-on besoin au minimum ?**
- [ ] 2 couleurs car le graphe est symétrique
- [ ] 4 couleurs d'après le théorème des graphes planaires
- [x] 5 couleurs car chaque nœud est adjacent à tous les autres, forçant une couleur distincte par sommet
- > **Explication :** Un graphe complet à $n$ sommets, noté $K_n$, représente un ensemble où chaque sommet est lié à tous les autres sommets. Par conséquent, aucun couple de sommets ne peut partager la même couleur. Son nombre chromatique est donc égal au nombre de sommets : $\chi(K_5) = 5$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Convertir la topologie d'un réseau réseau physique en sa matrice d'adjacence numérique.
- [ ] Calculer manuellement les puissances d'une matrice d'adjacence pour résoudre un problème de comptage de chemins IP.
- [ ] Construire le tableau de résolution pas à pas de l'algorithme de Dijkstra pour trouver le plus court chemin sur un graphe pondéré.
- [ ] Déterminer si un graphe proposé est eulérien en vérifiant la parité des degrés de l'ensemble de ses sommets.
