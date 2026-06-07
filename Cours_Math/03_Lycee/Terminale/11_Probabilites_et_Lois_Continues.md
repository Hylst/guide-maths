---
title: 'Chapitre 11 : Probabilités et Lois Continues'
level: Lycee
subLevel: Terminale
order: 11
---
# Chapitre 11 : Probabilités et Lois Continues

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Probabilités de 1ère, intégration.  
**Objectifs** : 
- Maîtriser la notion de densité de probabilité.
- Étudier la Loi Uniforme et la Loi Exponentielle.
- Comprendre la Loi Normale (courbe de Gauss) et ses propriétés.
- Utiliser la calculatrice pour des calculs de probabilités sur des intervalles.

---

## Activités de découverte

**Activité : Le temps d'attente du bus**
Imagine un bus qui passe exactement toutes les 15 minutes. Tu arrives à l'arrêt à un instant totalement aléatoire.
- Quelle est la probabilité que tu attendes exactement 5 minutes et 12 secondes ? 
En théorie, c'est presque zéro, car le temps est un flux **continu** (il y a une infinité d'instants possibles). 
On ne calcule donc plus la probabilité d'un instant précis, mais la probabilité d'un **intervalle** (ex: attendre entre 5 et 7 minutes). C'est là qu'on utilise le passage des probabilités discrètes aux probabilités continues via le calcul d'aires sous une courbe !

---

## Rappels

Avant de commencer, révise :
- **Intégrale** : L'aire sous une courbe $f$ est $\int_a^b f(x) \, dx$.
- **Probabilité** : La somme totale des probabilités d'un univers doit être 1.

---

## Explications et Théorie

### 1. Densité de probabilité
Une fonction $f$ est une densité de probabilité sur $[a ; b]$ si elle est positive et que l'aire totale sous sa courbe vaut 1 : $\int_a^b f(x) \, dx = 1$.
La probabilité que $X$ appartienne à $[c ; d]$ est alors l'aire : $P(c \leq X \leq d) = \int_c^d f(x) \, dx$.

### 2. La Loi Uniforme
L'événement a la même chance de se produire partout sur l'intervalle $[a ; b]$.
- Densité : $f(x) = \frac{1}{b-a}$.
- Espérance : $E(X) = \frac{a+b}{2}$.

### 3. La Loi Exponentielle (Loi de durée de vie)
Elle modélise souvent le temps d'attente ou la désintégration radioactive. Elle dépend d'un paramètre $\lambda > 0$.
- Densité : $f(x) = \lambda e^{-\lambda x}$ sur $[0 ; +\infty[$.
- Probabilité : $P(X \leq t) = 1 - e^{-\lambda t}$.
- Espérance : $E(X) = 1/\lambda$.

### 4. La Loi Normale $N(\mu, \sigma^2)$
C'est la célèbre courbe en cloche.
- $\mu$ est l'espérance (le sommet de la cloche).
- $\sigma$ est l'écart-type (la largeur de la cloche).
**Règle des 1-$\sigma$, 2-$\sigma$, 3-$\sigma$** à connaître :
- $P(\mu-\sigma \leq X \leq \mu+\sigma) \approx 0,68$.
- $P(\mu-2\sigma \leq X \leq \mu+2\sigma) \approx 0,95$.

---

## Exples Pratiques (pas-à-pas)

### Calculer avec la loi exponentielle
La durée de vie d'un composant (en heures) suit une loi exponentielle de paramètre $\lambda = 0,001$.
Quelle est la probabilité que le composant tombe en panne avant 500 heures ?
1. **Formule** : $P(X \leq 500) = 1 - e^{-0,001 \times 500}$.
2. **Calcul** : $1 - e^{-0,5} \approx 1 - 0,606 = \mathbf{0,394}$.
*Il y a environ 39,4% de chances.*

---

## Exercices

**🟢 Exercice 1 (Facile)**
$X$ suit la loi uniforme sur $[2 ; 10]$. Calcule $P(3 \leq X \leq 7)$ et son espérance.

**🔵 Exercice 2 (Moyen)**
$X$ suit la loi normale $N(50 ; 25)$. (Donc $\mu=50$ et $\sigma=5$).
Sans calculatrice, donne une valeur approchée de $P(40 \leq X \leq 60)$.

**🟠 Exercice 3 (Difficile)**
Démontre que si $f(x) = \lambda e^{-\lambda x}$, alors l'intégrale de 0 à $+\infty$ vaut bien 1.

---

## Exercices corrigés

**Exercice 1 :**
$P(3 \leq X \leq 7) = \frac{7-3}{10-2} = 4/8 = \mathbf{0,5}$.
Espérance : $(2+10)/2 = \mathbf{6}$.

**Exercice 2 :**
On cherche $P(\mu - 2\sigma \leq X \leq \mu + 2\sigma)$ car $50 - 2(5) = 40$ et $50 + 2(5) = 60$.
D'après le cours, cette probabilité est environ **0,95** (95%).

**Exercice 3 :**
$F(t) = \int_0^t \lambda e^{-\lambda x} \, dx = [-e^{-\lambda x}]_0^t = -e^{-\lambda t} - (-e^0) = 1 - e^{-\lambda t}$.
Quand $t \to +\infty$, $e^{-\lambda t} \to 0$. La limite est bien **1**.

---

## 📝 Mini-Quiz

1. L'aire totale sous une densité de probabilité vaut :
   - $\pi$
   - 1
   - 0

2. La Loi Normale est centrée sur quel indicateur ?
   - La Médiane
   - L'Espérance
   - Le Maximum

3. $P(X = c)$ pour une loi continue est toujours égal à :
   - $f(c)$
   - 1
   - 0

**Réponses :** 1. 1 | 2. L'Espérance | 3. 0 (impossible de tomber pile sur une valeur infiniment précise)

---

## Foire Aux Questions (FAQ)

**Q : À quoi sert la Loi Normale en biologie ?**
R : À presque tout ! La taille des individus d'une espèce, le poids des fruits, la pression artérielle... tous ces caractères biologiques se répartissent suivant une "cloche". Cela permet de définir ce qui est "dans la norme" et ce qui est exceptionnel (les extrêmes de la courbe).

---

## 💡 Le savais-tu ?
Le mathématicien Carl Friedrich Gauss, qui a donné son nom à la courbe, était tellement fier de cette découverte qu'elle figurait (avec la formule de la densité) sur les billets de 10 Deutsche Mark en Allemagne avant le passage à l'Euro !
