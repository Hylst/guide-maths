---
title: 'Chapitre 4 : Fonction Logarithme Népérien'
level: Lycee
subLevel: Terminale
order: 4
---
# Chapitre 4 : Fonction Logarithme Népérien

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Fonction Exponentielle, limites, dérivation.  
**Objectifs** : 
- Définir la fonction $\ln$ comme la réciproque de l'exponentielle.
- Maîtriser les propriétés algébriques (transformation de produits en sommes).
- Étudier les limites, les variations et la dérivée de la fonction $\ln$.
- Maîtriser les croissances comparées à l'infini.

---

## Activités de découverte

**Activité : L'échelle de Richter**
Comment mesurer des tremblements de terre dont l'énergie va de 1 à 1 000 000 000 ? Au lieu d'utiliser ces immenses nombres, on compte "le nombre de zéros" (la puissance). Passer de magnitude 4 à 5, c'est multiplier l'énergie par 10. 
C'est l'idée derrière le **logarithme** : tasser l'immensité pour la rendre lisible ! En maths, le logarithme transforme les puissances et les multiplications en simples additions.

---

## Rappels

Avant de commencer, révise :
- **Fonction Exponentielle** : $\exp(x)$ est strictement positive et croissante.
- **Réciproque** : Si $y = f(x)$, alors $x = f^{-1}(y)$.

---

## Explications et Théorie

### 1. Définition
La fonction **Logarithme Népérien**, notée **$\ln$**, est la fonction réciproque de la fonction exponentielle.
- Elle est définie uniquement sur **$]0 ; +\infty[$**.
- $\ln(x) = y \iff e^y = x$.

### 2. Propriétés algébriques
Le logarithme transforme les produits en sommes (propriété fondamentale) :
- $\ln(a \times b) = \ln(a) + \ln(b)$
- $\ln(a/b) = \ln(a) - \ln(b)$
- $\ln(a^n) = n \ln(a)$  *(Trés utile pour descendre un inconnu de l'exposant)*
- $\ln(1) = 0$ et $\ln(e) = 1$.

### 3. Étude de fonction
- **Dérivée** : $(\ln(x))' = \frac{1}{x}$.
- **Variations** : Puisque $1/x > 0$ sur $]0 ; +\infty[$, la fonction $\ln$ est **strictement croissante**.
- **Limites** : 
  - $\lim_{x \to 0^+} \ln(x) = -\infty$.
  - $\lim_{x \to +\infty} \ln(x) = +\infty$.

### 4. Croissances Comparées
À l'infini, l'exponentielle est plus forte que les puissances de $x$, qui sont plus fortes que le logarithme.
- $\lim_{x \to +\infty} \frac{\ln(x)}{x} = 0$.
- $\lim_{x \to 0^+} x \ln(x) = 0$.

---

## Exples Pratiques (pas-à-pas)

### Résoudre une équation d'exposant
Résoudre $2^x = 100$.
1. **Appliquer $\ln$** : $\ln(2^x) = \ln(100)$.
2. **Sortir l'exposant** : $x \ln(2) = \ln(100)$.
3. **Calculer** : $x = \frac{\ln(100)}{\ln(2)} \approx \mathbf{6,64}$.

### Dériver une fonction $\ln(u)$
Calculer la dérivée de $f(x) = \ln(x^2 + 1)$.
On applique $(\ln(u))' = \frac{u'}{u}$.
$u = x^2 + 1 \implies u' = 2x$.
$f'(x) = \mathbf{\frac{2x}{x^2 + 1}}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Simplifie $A = \ln(e^3) + \ln(1/e)$.

**🔵 Exercice 2 (Moyen)**
Résous l'inéquation $\ln(2x - 4) \leq 0$. (Indice : $0 = \ln(1)$).

**🟠 Exercice 3 (Difficile)**
Calcule la limite en $+\infty$ de $f(x) = \ln(x) - x$.

---

## Exercices corrigés

**Exercice 1 :**
$A = 3 + (-1) = \mathbf{2}$.

**Exercice 2 :**
$\ln(2x - 4) \leq \ln(1) \iff 2x - 4 \leq 1 \iff 2x \leq 5 \iff x \leq 2,5$.
Attention au domaine : $2x - 4 > 0 \iff x > 2$.
Solution : **$S = ]2 ; 2,5]$**.

**Exercice 3 :**
$f(x) = x (\frac{\ln(x)}{x} - 1)$.
En $+\infty$, $\frac{\ln(x)}{x} \to 0$ (croissance comparée).
L'expression entre parenthèses tend vers $-1$.
Donc $\lim_{x \to +\infty} f(x) = \mathbf{-\infty}$.

---

## 📝 Mini-Quiz

1. Quel est l'ensemble de définition de $\ln(x)$ ?
   - $\mathbb{R}$
   - $]0 ; +\infty[$
   - $[0 ; +\infty[$

2. $\ln(x^2)$ est égal à :
   - $2 \ln(x)$
   - $(\ln(x))^2$
   - $e^{2x}$

3. La limite de $\ln(x)$ quand $x \to 0^+$ est :
   - 0
   - $+\infty$
   - $-\infty$

**Réponses :** 1. $]0 ; +\infty[$ | 2. $2 \ln(x)$ | 3. $-\infty$

---

## Foire Aux Questions (FAQ)

**Q : Qui a inventé les logarithmes ?**
R : John Napier (1614). À l'époque, c'était le seul moyen de faire des multiplications géantes (astronomie) en les transformant en additions simples grâce à des tables de valeurs.

---

## 💡 Le savais-tu ?
Le pH en chimie (acidité d'une solution) est défini par une fonction logarithmique : $pH = -\log[H_3O^+]$. C'est pour cela qu'un pH de 3 est dix fois plus acide qu'un pH de 4 !
