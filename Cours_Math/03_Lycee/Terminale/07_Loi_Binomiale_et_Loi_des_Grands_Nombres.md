---
title: 'Chapitre 7 : Loi Binomiale et Loi des Grands Nombres'
level: Lycee
subLevel: Terminale
order: 7
---
# Chapitre 7 : Loi Binomiale et Loi des Grands Nombres

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Probabilités de 1ère (arbres), dénombrement (combinaisons).  
**Objectifs** : 
- Modéliser une répétition d'épreuves indépendantes (Schéma de Bernoulli).
- Reconnaître et utiliser la Loi Binomiale $\mathcal{B}(n, p)$.
- Calculer l'espérance, la variance et l'écart-type d'une variable binomiale.
- Comprendre et simuler la Loi des Grands Nombres.

---

## Activités de découverte

**Activité : Le tireur à l'arc**
Un tireur à l'arc a une probabilité $p = 0,8$ de toucher la cible à chaque tir. Il tire 10 flèches de suite.
Ses tirs sont supposés indépendants (la réussite de l'un n'influence pas le suivant).
- Quelle est la probabilité qu'il touche la cible exactement 8 fois ?
Pour répondre, on ne peut pas juste multiplier les probabilités, car il y a plusieurs "chemins" (ordres possibles) pour avoir 8 succès parmi 10 tirs. Cette situation de répétition s'appelle un **Schéma de Bernoulli**, et la loi qui compte les succès est la **Loi Binomiale**.

---

## Rappels

Avant de commencer, révise :
- **Epreuve de Bernoulli** : Une expérience à deux issues (Succès $S$ de probabilité $p$, et Échec $\bar{S}$ de probabilité $1-p$).
- **Combinaisons** : $\binom{n}{k}$ est le nombre de façons de choisir $k$ succès parmi $n$ essais.

---

## Explications et Théorie

### 1. Schéma de Bernoulli
C'est la répétition de $n$ épreuves de Bernoulli identiques et indépendantes.

### 2. Loi Binomiale $\mathcal{B}(n, p)$
Soit $X$ la variable aléatoire comptant le nombre de succès dans un schéma de Bernoulli.
La probabilité d'obtenir exactement $k$ succès est :
$$P(X = k) = \binom{n}{k} \times p^k \times (1-p)^{n-k}$$

### 3. Paramètres de la Loi Binomiale
- **Espérance** : $E(X) = n \times p$. (C'est le nombre moyen de succès).
- **Variance** : $V(X) = n \times p \times (1-p)$.
- **Écart-type** : $\sigma(X) = \sqrt{V(X)}$.

### 4. Loi des Grands Nombres
Elle stipule que lorsque le nombre d'épreuves $n$ augmente, la fréquence observée des succès se rapproche de la probabilité théorique $p$. 
En Terminale, on apprend que pour $n$ assez grand, la distribution "cloche" de la loi binomiale commence à ressembler à une Loi Normale.

---

## Exples Pratiques (pas-à-pas)

### Calculer une probabilité binomiale
On lance 5 fois une pièce équilibrée ($p=0,5$). Quelle est la probabilité d'avoir exactement 3 "Pile" ?
1. **Paramètres** : $n=5, p=0,5, k=3$.
2. **Calcul** : $P(X = 3) = \binom{5}{3} \times (0,5)^3 \times (0,5)^2 = 10 \times 0,125 \times 0,25 = \mathbf{0,3125}$.
*Il y a 31,25% de chances.*

---

## Exercices

**🟢 Exercice 1 (Facile)**
On donne $X \sim \mathcal{B}(10 ; 0,2)$. Calcule son espérance et son écart-type.

**🔵 Exercice 2 (Moyen)**
Un QCM comporte 4 questions. Pour chaque question, il y a 3 réponses possibles dont une seule est vraie. Un élève répond au hasard.
Quelle est la probabilité qu'il ait au moins 3 bonnes réponses ?

**🟠 Exercice 3 (Difficile)**
Démontre que $P(X \leq 1) = (1-p)^n + n p (1-p)^{n-1}$.

---

## Exercices corrigés

**Exercice 1 :**
$E(X) = 10 \times 0,2 = \mathbf{2}$.
$V(X) = 10 \times 0,2 \times 0,8 = 1,6 \implies \sigma(X) = \sqrt{1,6} \approx \mathbf{1,26}$.

**Exercice 2 :**
On a $n=4$ et $p=1/3$. On cherche $P(X = 3) + P(X = 4)$.
$P(X = 3) = \binom{4}{3} (1/3)^3 (2/3)^1 = 4 \times (1/27) \times (2/3) = 8/81$.
$P(X = 4) = \binom{4}{4} (1/3)^4 (2/3)^0 = 1 \times (1/81) \times 1 = 1/81$.
Somme = **9/81 = 1/9** (environ 11%).

**Exercice 3 :**
$P(X \leq 1) = P(X = 0) + P(X = 1)$.
$P(X = 0) = \binom{n}{0} p^0 (1-p)^n = \mathbf{(1-p)^n}$.
$P(X = 1) = \binom{n}{1} p^1 (1-p)^{n-1} = \mathbf{n p (1-p)^{n-1}}$.

---

## 📝 Mini-Quiz

1. X suit $\mathcal{B}(n, p)$. La valeur maximale de X est :
   - 1
   - $n$
   - $p$

2. Si $p = 0,5$ et $n=100$, l'espérance est :
   - 50
   - 10
   - 1

3. La Loi des Grands Nombres dit que la fréquence tend vers :
   - 1
   - $p$
   - $+\infty$

**Réponses :** 1. $n$ | 2. 50 | 3. $p$

---

## Foire Aux Questions (FAQ)

**Q : À quoi sert la Loi Binomiale en médecine ?**
R : À tester l'efficacité d'un médicament sur un petit groupe de patients avant de le généraliser. Si on connaît la probabilité de guérison naturelle, on compare les résultats observés avec les prévisions de la loi binomiale pour voir si l'amélioration est due au hasard ou au médicament.

---

## 💡 Le savais-tu ?
Le "Schéma de Bernoulli" porte le nom d'une célèbre famille de mathématiciens suisses (Jacob Bernoulli). Sur 3 générations, cette famille a produit 8 mathématiciens de génie, ce qui est statistiquement... presque impossible !
