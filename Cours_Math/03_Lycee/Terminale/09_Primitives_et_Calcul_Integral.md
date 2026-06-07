---
title: 'Chapitre 9 : Primitives et Calcul Intégral'
level: Lycee
subLevel: Terminale
order: 9
---
# Chapitre 9 : Primitives et Calcul Intégral

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Dérivation, fonctions de référence.  
**Objectifs** : 
- Définir et calculer des primitives de fonctions usuelles.
- Définir l'intégrale d'une fonction continue comme une aire.
- Calculer une intégrale à l'aide d'une primitive.
- Maîtriser les propriétés de l'intégrale (linéarité, positivité, Chasles).

---

## Activités de découverte

**Activité : Le champ de l'agriculteur**
Un agriculteur possède un champ dont un des côtés est une rivière rectiligne, mais l'autre côté suit la courbe d'une colline d'équation $f(x)$. 
Le géomètre sait calculer l'aire d'un rectangle ($L \times l$) ou d'un triangle, mais pas celle d'une forme avec un côté courbe ! 
En mathématiques, l'**intégrale** permet de calculer l'aire exacte sous n'importe quelle courbe en la découpant en une infinité de rectangles infiniment fins. Pour y arriver facilement, on utilise l'opération inverse de la dérivation : la **primitive**.

---

## Rappels

Avant de commencer, révise :
- **Dérivée** : $(x^3)' = 3x^2$, $(e^x)' = e^x$.
- **Opération inverse** : Si dériver c'est "descendre d'un cran" la puissance, trouver une primitive c'est "remonter d'un cran".

---

## Explications et Théorie

### 1. Qu'est-ce qu'une Primitive ?
$F$ est une primitive de $f$ sur un intervalle si $F'(x) = f(x)$.
Une fonction admet une infinité de primitives, qui diffèrent toutes d'une constante $C$.

**Tableau des primitives usuelles :**
- $f(x) = x^n \implies F(x) = \frac{x^{n+1}}{n+1} + C$.
- $f(x) = \frac{1}{x} \implies F(x) = \ln(x) + C$.
- $f(x) = e^x \implies F(x) = e^x + C$.
- $f(x) = u'(x) e^{u(x)} \implies F(x) = e^{u(x)}$.

### 2. Définition de l'Intégrale
Soit $f$ une fonction continue et positive sur $[a ; b]$. L'intégrale de $f$ de $a$ à $b$, notée $\int_a^b f(x) \, dx$, est égale à l'**aire** du domaine situé sous la courbe.

### 3. Le Lien Fondamental
Si $F$ est une primitive de $f$ sur $[a ; b]$, alors l'intégrale se calcule ainsi :
$$\int_a^b f(x) \, dx = [F(x)]_a^b = F(b) - F(a)$$

### 4. Propriétés
- **Linéarité** : $\int (f+g) = \int f + \int g$.
- **Relation de Chasles** : $\int_a^b f + \int_b^c f = \int_a^c f$.
- **Positivité** : Si $f \geq 0$, alors $\int f \geq 0$.

---

## Exples Pratiques (pas-à-pas)

### Calculer une aire
On veut l'aire sous la courbe de $f(x) = x^2$ entre $x=0$ et $x=3$.
1. **Trouver une primitive** : $F(x) = \frac{1}{3}x^3$.
2. **Appliquer la formule** : 
   $\int_0^3 x^2 \, dx = F(3) - F(0) = \frac{1}{3}(3)^3 - \frac{1}{3}(0)^3 = \frac{27}{3} - 0 = \mathbf{9}$.
*L'aire est de 9 unités d'aire.*

---

## Exercices

**🟢 Exercice 1 (Facile)**
Trouve une primitive de $f(x) = 3x^2 + 4x - 5$.

**🔵 Exercice 2 (Moyen)**
Calcule l'intégrale $I = \int_0^2 e^x \, dx$.

**🟠 Exercice 3 (Difficile)**
Calcule $J = \int_1^e \frac{1}{x} \, dx$. Interprète le résultat graphiquement.

---

## Exercices corrigés

**Exercice 1 :**
$F(x) = 3 \frac{x^3}{3} + 4 \frac{x^2}{2} - 5x + C = \mathbf{x^3 + 2x^2 - 5x + C}$.

**Exercice 2 :**
Primitive de $e^x$ est $e^x$.
$I = [e^x]_0^2 = e^2 - e^0 = \mathbf{e^2 - 1}$.

**Exercice 3 :**
Primitive de $1/x$ est $\ln(x)$.
$J = [\ln(x)]_1^e = \ln(e) - \ln(1) = 1 - 0 = \mathbf{1}$.
L'aire sous la courbe de la fonction inverse entre 1 et $e$ vaut exactement 1 unité d'aire !

---

## 📝 Mini-Quiz

1. Trouver une primitive est l'inverse de :
   - Multiplier
   - Dériver
   - Élever au carré

2. La valeur de $\int_a^a f(x) \, dx$ est toujours :
   - 1
   - 0
   - $f(a)$

3. La primitive de $e^{2x}$ est :
   - $e^{2x}$
   - $2 e^{2x}$
   - $\frac{1}{2} e^{2x}$

**Réponses :** 1. Dériver | 2. 0 | 3. $\frac{1}{2} e^{2x}$

---

## Foire Aux Questions (FAQ)

**Q : Pourquoi écrit-on $dx$ à la fin d'une intégrale ?**
R : C'est une notation historique qui signifie "petit segment de $x$". Quand on calcule une intégrale comme une somme de rectangles, $f(x)$ est la hauteur du rectangle et $dx$ est sa largeur (très petite). Somme(Hauteur $\times$ Largeur) = Aire.

---

## 💡 Le savais-tu ?
Archimède savait déjà calculer des aires sous des paraboles il y a 2200 ans en utilisant la "méthode d'exhaustion", bien avant l'invention des primitives ! C'était un précurseur génial du calcul intégral moderne.
