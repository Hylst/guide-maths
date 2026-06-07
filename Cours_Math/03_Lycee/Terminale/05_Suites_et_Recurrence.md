---
title: 'Chapitre 5 : Suites et Récurrence'
level: Lycee
subLevel: Terminale
order: 5
---
# Chapitre 5 : Suites et Récurrence

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Suites arithmétiques et géométriques de 1ère.  
**Objectifs** : 
- Maîtriser le raisonnement par récurrence.
- Étudier la limite d'une suite (convergence et divergence).
- Utiliser les théorèmes de comparaison et des gendarmes.
- Comprendre le théorème de la limite monotone.

---

## Activités de découverte

**Activité : L'effet Domino**
Comment prouver qu'une infinité de dominos vont tomber si on les pousse ? 
1. On vérifie que le premier domino tombe.
2. On vérifie que si n'importe quel domino tombe, il fait forcément tomber le suivant.
Si ces deux conditions sont vraies, alors TOUS les dominos tomberont, même s'il y en a des milliards. C'est le principe du raisonnement par **Récurrence**, l'outil le plus puissant pour prouver des propriétés sur les entiers.

---

## Rappels

Avant de commencer, révise :
- **Suite Arithmétique** : $u_{n+1} = u_n + r$.
- **Suite Géométrique** : $u_{n+1} = u_n \times q$. Somme $S = \text{1er terme} \times \frac{1-q^{\text{nb termes}}}{1-q}$.

---

## Explications et Théorie

### 1. Le raisonnement par Récurrence
Pour démontrer qu'une propriété $P(n)$ est vraie pour tout $n \geq n_0$ :
- **Initialisation** : On vérifie $P(n_0)$.
- **Hérédité** : On suppose $P(k)$ vraie pour un entier $k$ quelconque, et on démontre que $P(k+1)$ est alors vraie.
- **Conclusion** : Par récurrence, $P(n)$ est vraie pour tout $n$.

### 2. Limite d'une suite
- **Convergence** : On dit que $(u_n)$ converge vers $L$ si tous les termes de la suite finissent par être aussi proches de $L$ que l'on veut quand $n \to +\infty$.
- **Divergence** : Si la limite est $+\infty$ (ou $-\infty$), ou si elle n'existe pas.

### 3. Théorèmes de limites
- **Théorème des Gendarmes** : Si $v_n \leq u_n \leq w_n$ et que $(v_n)$ et $(w_n)$ tendent vers $L$, alors $(u_n)$ tend aussi vers $L$.
- **Théorème de comparaison** : Si $u_n \geq v_n$ et $\lim v_n = +\infty$, alors $\lim u_n = +\infty$.

### 4. Théorème de la Limite Monotone
Toute suite **croissante et majorée** converge.
Toute suite **décroissante et minorée** converge.
*(C'est une propriété fondamentale de la continuité des nombres réels).*

---

## Exples Pratiques (pas-à-pas)

### Démontrer par récurrence que $2^n > n$
1. **Initialisation** ($n=0$) : $2^0 = 1$ et $0$. $1 > 0$, donc $P(0)$ est vraie.
2. **Hérédité** : Supposons $2^k > k$. Montrons $2^{k+1} > k+1$.
   $2^{k+1} = 2 \times 2^k$. Par hypothèse, $2 \times 2^k > 2k$.
   Or $2k = k+k$. Comme $k \geq 1$, $k+k \geq k+1$.
   Donc $2^{k+1} > k+1$. L'hérédité est prouvée.
3. **Conclusion** : La propriété est vraie pour tout $n$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Calcule la limite de la suite $u_n = \frac{2n + 1}{n + 5}$.

**🔵 Exercice 2 (Moyen)**
Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n+1} = \frac{1}{2}u_n + 3$.
Démontre par récurrence que $u_n < 6$ pour tout $n$.

**🟠 Exercice 3 (Difficile)**
Utilise le théorème des gendarmes pour trouver la limite de $u_n = \frac{\cos(n)}{n^2 + 1}$.

---

## Exercices corrigés

**Exercice 1 :**
$u_n = \frac{n(2 + 1/n)}{n(1 + 5/n)} = \frac{2 + 1/n}{1 + 5/n}$.
Quand $n \to +\infty$, $1/n \to 0$. Limite = **2**.

**Exercice 2 :**
- Init : $u_0 = 1 < 6$ (Vrai).
- Hérédité : Supposons $u_k < 6$.
  $u_{k+1} = 0,5 u_k + 3 < 0,5(6) + 3 = 3+3=6$. (Vrai).
Convergence : La suite est croissante et majorée par 6, elle converge. Sa limite $L$ vérifie $L = 0,5L + 3 \implies \mathbf{L=6}$.

**Exercice 3 :**
On sait $-1 \leq \cos(n) \leq 1$.
Donc $\frac{-1}{n^2+1} \leq u_n \leq \frac{1}{n^2+1}$.
Comme les deux extrêmes tendent vers 0, par le théorème des gendarmes, **$\lim u_n = 0$**.

---

## 📝 Mini-Quiz

1. L'initialisation sert à :
   - Prouver que le mécanisme fonctionne
   - Vérifier le point de départ
   - Calculer la limite

2. Une suite qui tend vers $+\infty$ est dite :
   - Convergente
   - Divergente
   - Bornée

3. Le théorème des gendarmes nécessite combien de suites ?
   - 2
   - 3
   - 10

**Réponses :** 1. Vérifier le point de départ | 2. Divergente | 3. 3

---

## Foire Aux Questions (FAQ)

**Q : Est-ce qu'une suite peut être croissante sans avoir de limite finie ?**
R : Oui, bien sûr ! Prends $u_n = n^2$. Elle monte tout le temps mais elle s'envole vers l'infini. Elle ne respecte pas la condition "être majorée".

---

## 💡 Le savais-tu ?
Le mathématicien Fibonacci a inventé sa célèbre suite ($0, 1, 1, 2, 3, 5, 8...$) pour modéliser la croissance d'une population de lapins. On retrouve les nombres de cette suite partout dans la nature (pommes de pin, fleurs de tournesol, galaxies).
