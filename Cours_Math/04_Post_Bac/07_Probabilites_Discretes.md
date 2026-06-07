---
title: 'Chapitre 7 : Probabilités sur les univers dénombrables'
level: Post_Bac
subLevel: Probabilites
order: 7
---
# Chapitre 7 : Probabilités Discrètes

**Niveau** : Post-Bac (L1, L2, CPGE)  
**Prérequis** : Dénombrement, séries numériques, suites.  
**Objectifs** : 
- Formaliser la notion d'espace probabilisé (univers, tribu, mesure de probabilité).
- Manipuler des variables aléatoires sur des univers finis ou infinis dénombrables $\mathbb{N}$.
- Étudier les lois discrètes usuelles (Binomiale, Géométrique, Poisson).
- Calculer et manipuler l'espérance et la variance.

---

## 🎯 Mise en situation et Cas d'usage

Imagine que tu es en charge du centre d'appel téléphonique d'urgence d'une grande ville. Comment dimensionner le nombre de standardistes à recruter ?
C'est avec la probabilité discrète que tu peux modéliser ça. En comptant les appels : ils arrivent aléatoirement dans le temps mais suivent une "Loi de Poisson". Grâce à cette loi, tu peux calculer la probabilité exacte qu'il y ait plus d'appels à la fois que de standardistes, et t'assurer que le service soit ouvert à 99,99%.

---

## 💡 Rappels Essentiels

- **Événements Mutuellement Exclusifs** : Si $A \cap B = \emptyset$, alors $\mathbb{P}(A \cup B) = \mathbb{P}(A) + \mathbb{P}(B)$.
- **Probabilité Discrète** : La somme des probabilités de toutes les issues possibles d'une expérience vaut systématiquement $1$.
- **Loi Binomiale** $\mathcal{B}(n, p)$ : Réaliser $n$ épreuves de Bernoulli (succès/échec) indépendantes. Probabilité d'avoir exactement $k$ succès : $\binom{n}{k} p^k (1-p)^{n-k}$.

---

## 📖 Explications et Théorie

### 1. Variables Aléatoires Discrètes (V.A.D)
Une variable aléatoire numérique $X$ est une application de l'univers $\Omega$ dans un ensemble fini ou dénombrable (comme $\mathbb{N}$ ou $\mathbb{Z}$). On note la **loi de probabilité** comme la suite des valeurs $p_k = \mathbb{P}(X=x_k)$. La condition fondamentale est que, si c'est un univers infini, la somme de cette série vaut 1 : $\sum_{k=0}^{+\infty} p_k = 1$.

### 2. Espérance et Variance (Sommes de séries)
L'Espérance (le résultat moyen que l'on obtient si on répète l'expérience une infinité de fois) n'est plus une somme finie, mais une somme de série :
$$E(X) = \sum_{k=0}^{+\infty} x_k \, \mathbb{P}(X=x_k)$$
*(À condition que cette série soit absolument convergente !)*

La Variance $\text{Var}(X)$ mesure la dispersion autour de l'espérance. Formule de Koenig-Huygens :
$$\text{Var}(X) = E(X^2) - (E(X))^2$$

### 3. Les Lois Discrètes Continues (sur $\mathbb{N}$)
**La Loi Géométrique $\mathcal{G}(p)$ :** 
Elle modélise le "Temps d'attente du premier succès". Exemple : On lance un dé jusqu'à obtenir un 6. $X$ = nombre de lancers nécessaires.
- Loi : $\mathbb{P}(X=k) = (1-p)^{k-1} p$ avec $k \ge 1$.
- Espérance : $E(X) = \frac{1}{p}$

## 🎨 Simulateur de Lois Binomiale et de Poisson

Déplace les curseurs pour ajuster les paramètres de la distribution binomiale $\mathcal{B}(n, p)$. Observe comment la distribution s'ajuste au fur et à mesure avec soit sa limite gaussienne continue (Moivre-Laplace / Théorème Central Limite) soit sa limite poissonnienne (les événements rares) :

![Binomiale vs Courbe de Poisson](./assets/binomial_poisson.svg)

**La Loi de Poisson $\mathcal{P}(\lambda)$ :**
Elle modélise le nombre d'occurrences d'un événement rare ou de files d'attente.
- Loi : $\mathbb{P}(X=k) = e^{-\lambda} \frac{\lambda^k}{k!}$ pour $k \ge 0$.
- Espérance et variance identiques : $E(X) = \text{Var}(X) = \lambda$.

---

## 🛠️ Exemples

**Loi Géométrique :** 
Je joue chaque semaine à une loterie où j'ai 1% de chances de gagner ($p = 0.01$).
1. Quelle est la probabilité que je gagne pour la première fois à la $50^{\text{ème}}$ semaine ?
   $\mathbb{P}(X=50) = 0.99^{49} \times 0.01 \approx 0.006$
2. En moyenne, combien de semaines devrais-je jouer avant de gagner ?
   $E(X) = \frac{1}{p} = \frac{1}{0.01} = 100 \text{ semaines}$.

---

## 🧠 Le Saviez-Vous ?

L'approximation de Poisson est magique ! Si tu as une Loi Binomiale où le nombre d'essais $n$ est gigantesque et que la probabilité $p$ est toute petite (événement rare), alors le calcul des $\binom{n}{k}$ fera planter ton ordinateur. Et bien, cette loi Binomiale devient (presque exactement) la simple Loi de Poisson avec le paramètre $\lambda = np$ !

---

## 📝 Exercices

**🟢 Exercice A (Le Flux Poissonnien)**
1. **L'Attente Magique** : Soit $X$ suivant une loi de Poisson de paramètre magique $\lambda = 2$. Quelle est l'espérance de l'expérience, et surtout : quelle est la probabilité formelle qu'il ne se passe strictement RIEN ? $P(X=0) = ?$
2. **Le Parchemin de Maclaurin** : Montrer rudement, via la célèbre formule de l'exponentielle en série de Taylor, que la somme de la totalité des probabilités des issues d'une loi de Poisson s'additionne parfaitement et donne 1 (masse de l'univers).

**🔵 Exercice B (L'Infini Géométrique)**
3. **Le Joueur Maudit** : Une pièce biaisée tombe sur "Pile" avec une très faible proba $p=1/3$. On lance la pièce en boucle tant qu'on n'a pas Pile. Soit $X$ le nombre de lancers fatals. Calcule de deux manières différentes la probabilité d'avoir besoin de plus de 2 lancers : $\mathbb{P}(X>2)$.

---

## 📄 Exercices corrigés

**Exercice 1 :**
L'espérance d'une loi $\mathcal{P}(\lambda)$ est $\lambda$, donc $E(X) = 2$.
$P(X=0) = e^{-2} \frac{2^0}{0!} = e^{-2} \times 1 \approx 0.135$.

**Exercice 2 :**
On sait par les séries de Maclaurin que $e^x = \sum_{k=0}^{+\infty} \frac{x^k}{k!}$.
Testons la somme des probabilités de la loi de Poisson :
$\sum_{k=0}^{+\infty} \mathbb{P}(X=k) = \sum_{k=0}^{+\infty} e^{-\lambda} \frac{\lambda^k}{k!} = e^{-\lambda} \left( \sum_{k=0}^{+\infty} \frac{\lambda^k}{k!} \right)$
La somme entre parenthèses vaut exactement $e^\lambda$. Donc $e^{-\lambda} \times e^\lambda = e^0 = 1$. L'univers est bien de masse 1 !

**Exercice 3 :**
$X$ suit une loi géométrique $\mathcal{G}(1/3)$. $\mathbb{P}(X>2)$ est la probabilité d'avoir des échecs aux tirs 1 et 2. L'événement se réduit alors à $E_{checs1} \cap E_{checs2}$.
$\mathbb{P}(X>2) = \mathbb{P}(\text{"Face" au tir 1}) \times \mathbb{P}(\text{"Face" au tir 2}) = (2/3) \times (2/3) = \frac{4}{9}$.

---

## 📌 Synthèse

- **Loi Géométrique** : "Combien de temps avant de gagner". Repose sur les sommes de séries géométriques dérivées pour le calcul de de l'espérance $1/p$.
- **Loi de Poisson** : Souvent utilisée en modélisation (files d'attente, nombre d'accidents). Liée à la série exponentielle $e^x$.
- L'espérance dans le domaine infini dénombrable demande désormais d'étudier ou justifier la **convergence de la série**.

---

## 🙋 FAQ Probabilités Expérimentales

<details>
  <summary>Dans quelle stricte condition a-t-on le droit mathématique d'utiliser Poisson à la place de la Binomiale (qui est très lourde à calculer) ?</summary>

  La règle d'or d'usage (empirique) votée par les statisticiens est que si ton nombre d'essais $n \ge 30$, que ta proba $p \le 0.1$ (Un événement RARE) et que ton espérance combinée $np \le 15$, ALORS la lourde formule de Combinatoires de la $\mathcal{B}(n, p)$ peut être remplacée par l'Aérodynamique formule de la $\mathcal{P}(\lambda=np)$. L'approximation est sidérante de précision.
</details>

<details>
  <summary>Si l'univers des possibilités de "N" va jusqu'à l'infini, la Somme ne va-t-elle pas exploser au lieu de faire 1 ?</summary>

  C'est tout le secret des "Séries Numériques". C'est le paradoxe de Zénon. Ce n'est pas parce que tu alignes une infinité de briques sur le sol que ton mur va mesurer une infinité de mètres... si tes briques deviennent à chaque fois divinement plus petites ! Les probabilités des événements "Avoir 500 appels" ou "Lancer 80 fois le dé pour avoir un 6" tendent vers ZERO tellement vite (elles sont écrasées), que l'infinité de ces poussières ajoutée formera toujours un bloc mesurant exactement 1.
</details>

<details>
  <summary>Qu'est-ce que la propriété d'"absence de mémoire" (ou Memorylessness) de la Loi Géométrique ?</summary>

  C'est une propriété fascinante et unique parmi les lois discrètes ! Formellement, si $X$ suit une loi géométrique, pour tous entiers $m, n \ge 0$, on a :  
  $$\mathbb{P}(X > m+n \mid X > m) = \mathbb{P}(X > n)$$  
  *En français clair* : si tu as déjà lancé un dé 10 fois de suite sans jamais obtenir de 6 (l'événement $X > 10$), la probabilité que tu doives attendre au moins 3 lancers de plus pour enfin réussir (l'événement $X>13$) est **exactement la même** que si tu repartais complètement de zéro ! Le dé n'a aucune mémoire de tes échecs passés. Il ne se dit jamais "alors là, ça fait longtemps que je n'ai pas fait un 6, je devrais bientôt tomber dessus".
</details>

<details>
  <summary>Comment s'articulent la Loi des Grands Nombres (LGN) et le Théorème Central Limite (TCL) ?</summary>

  Ce sont les deux monuments jumeaux de la théorie des probabilités sur la convergence de la moyenne empirique $M_n = \frac{1}{n} \sum X_i$ d'échantillons indépendants :
  1. **La Loi Forte des Grands Nombres** garantit une convergence *presque sûre* : quand $n \to +\infty$, la moyenne empirique $M_n$ s'écrase de manière certaine sur la vraie valeur théorique de l'espérance $\mu$. C'est ce qui assure au casino d'être rentable sur l'année.
  2. **Le Théorème Central Limite (TCL)** s'intéresse à la *fluctuation* autour de cette espérance. Il montre que la vitesse d'erreur est en $1/\sqrt{n}$, et que si on recentre et réduit la somme, la distribution de cette erreur converge *en loi* vers une **Loi Normale** standard $\mathcal{N}(0, 1)$, formant cette irrésistible courbe en cloche symétrique (visible dans notre simulateur ci-dessus), peu importe la forme de la loi originale de départ !
</details>

---

## 📝 Mini-Quiz

**Question 1 : Le professeur affirme que pour l'unique et redoutable "Loi de Poisson $P(\lambda)$", le paramètre $\lambda$ incarne...**
- [ ] L'Espérance (Moyenne) pure.
- [ ] La Variance pure.
- [x] Incroyablement, les deux à la fois !
> **Explication :** C'est la signature en or de Poisson. Sur le grand graphe des probabilités, l'Espérance $E(X)$ (Le centre de gravité moyen $\lambda$) est intrinsèquement liée à sa propre Variance (son écartement). L'un ne va pas sans l'autre.

**Question 2 : Le Joueur fou s'attaque à la Loi Géométrique. Son Univers d'événements potentiels (de réussites possibles) s'arrête-t-il à un N maximum ?**
- [ ] Évidemment vrai. Il va mourir ou arrêter statistiquement au bout de 120 ans.
- [x] Faux. Il fait face à l'Infini.
> **Explication :** Faux ! Le mathématicien postule "en théorie". L'ordinateur peut simuler quelqu'un qui perd à la roulette depuis la création du Big Bang jusqu'à la fin de l'univers expansé. Son univers de valeurs possibles est l'ensemble formel des entiers non nuls $\{1, 2, 3, ... \infty\}$.

**Question 3 : L'événement fatal "Avoir RIEN du tout" lors d'une tempête de modèle de Poisson de force $\lambda=3$ donne une proba $P(X = 0)$ égale à :**
- [ ] $0$ (impossible)
- [ ] $e^3$
- [x] $e^{-3}$
> **Explication :** On déroule la machine : Formule $e^{-\lambda} \cdot \frac{\lambda^k}{k!}$. Pour l'événement de proba zéro "k=0", on a $e^{-3} \cdot \frac{3^0}{0!} = e^{-3} \cdot \frac{1}{1} = e^{-3}$.

---


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.

*(Fin des Modèles Continus et Discrets sur $\mathbb{N}$)*