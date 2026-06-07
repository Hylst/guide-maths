---
title: 'Chapitre 4 : La Fonction Exponentielle'
level: Lycee
subLevel: Premiere
order: 4
---
# Chapitre 4 : La Fonction Exponentielle

**Niveau** : Première (Spécialité Mathématiques)  
**Prérequis** : Dérivation, puissances, suites géométriques.  
**Objectifs** : 
- Définir la fonction exponentielle comme l'unique fonction $f$ telle que $f' = f$ et $f(0) = 1$.
- Maîtriser les propriétés algébriques ($e^{a+b} = e^a \times e^b$).
- Étudier les variations et la convexité de la fonction $x \mapsto e^x$.
- Résoudre des équations et inéquations avec l'exponentielle.

---

## Activités de découverte

**Activité : La croissance qui s'accélère**
Imagine une colonie de bactéries qui double toutes les heures. Plus il y a de bactéries, plus elles se reproduisent vite : la vitesse de croissance est proportionnelle au nombre de bactéries déjà présentes.
En mathématiques, on cherche une fonction dont la **dérivée** (la vitesse de variation) est **égale** à la fonction elle-même. 
Intuitivement : si $f'(x) = f(x)$, cela signifie que plus la valeur de la fonction augmente, plus sa pente (vitesse) augmente aussi. Cette fonction existe et c'est la star du lycée : la fonction **exponentielle**.

---

## Rappels

Avant de commencer, révise :
- **Dérivée** : La pente de la tangente en un point.
- **Puissances** : $a^n \times a^m = a^{n+m}$ et $(a^n)^m = a^{nm}$.
- **Nombre e** : C'est une constante mathématique irrationnelle, environ 2,718. Elle joue un rôle aussi important que $\pi$.

---

## Explications et Théorie

### 1. Définition et Existence
Il existe une unique fonction dérivable sur $\mathbb{R}$ telle que :
- $f'(x) = f(x)$
- $f(0) = 1$
Cette fonction est appelée **fonction exponentielle** et notée $\exp(x)$ ou **$e^x$**.

### 2. Propriétés algébriques
La fonction exponentielle transforme les additions en multiplications :
- $e^{a+b} = e^a \times e^b$
- $e^{a-b} = \frac{e^a}{e^b}$
- $(e^a)^n = e^{an}$
- $e^0 = 1$
- $e^x > 0$ pour tout réel $x$. *La courbe ne descend jamais sous l'axe des abscisses !*

### 3. Étude de fonction
- **Dérivée** : $(e^x)' = e^x$.
- **Variations** : Puisque $e^x > 0$, sa dérivée est toujours positive. La fonction est donc **strictement croissante** sur $\mathbb{R}$.
- **Limites (Introduction)** : Quand $x \to +\infty$, $e^x \to +\infty$. Quand $x \to -\infty$, $e^x \to 0$.

### 4. La forme $e^{u(x)}$
Si $u$ est une fonction dérivable, alors la dérivée de $f(x) = e^{u(x)}$ est :
$$f'(x) = u'(x) \times e^{u(x)}$$
*Exemple : la dérivée de $e^{3x+5}$ est $3e^{3x+5}$.*

---

## Exemples Pratiques (pas-à-pas)

### Résoudre une équation
Résoudre $e^{2x} = e^{x+3}$.
Comme la fonction est strictement croissante, $e^a = e^b \iff a = b$.
$2x = x + 3 \implies \mathbf{x = 3}$.

### Dériver une fonction complexe
Dériver $f(x) = (x+1)e^x$.
On reconnaît la forme $uv$ avec $u=x+1$ ($u'=1$) et $v=e^x$ ($v'=e^x$).
$f'(x) = 1 \times e^x + (x+1)e^x = e^x + xe^x + e^x = \mathbf{(x+2)e^x}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Simplifie l'expression : $A = \frac{e^3 \times e^5}{e^2}$.

**🔵 Exercice 2 (Moyen)**
Résous l'inéquation : $e^{2x - 4} \geq 1$. (Rappel : $1 = e^0$).

**🟠 Exercice 3 (Difficile)**
Étudie les variations de la fonction $g(x) = e^{-x^2}$.
Donne sa dérivée et son sens de variation sur $\mathbb{R}$.

---

## Exercices corrigés

**Exercice 1 :**
$A = \frac{e^{3+5}}{e^2} = \frac{e^8}{e^2} = e^{8-2} = \mathbf{e^6}$.

**Exercice 2 :**
$e^{2x-4} \geq e^0 \implies 2x - 4 \geq 0 \implies 2x \geq 4 \implies x \geq 2$.
Solution : **$S = [2 ; +\infty[$**.

**Exercice 3 :**
$g(x) = e^{u(x)}$ avec $u(x) = -x^2$. $u'(x) = -2x$.
$g'(x) = \mathbf{-2x e^{-x^2}}$.
Signe de $g'$ : Comme $e^{-x^2} > 0$, le signe dépend de $-2x$.
- Si $x < 0$, $g'(x) > 0$ (croissante).
- Si $x > 0$, $g'(x) < 0$ (décroissante).
La fonction "cloche" atteint son maximum en $x=0$.

---

## 📝 Mini-Quiz

1. Quelle est la valeur de $e^0$ ?
   - 0
   - 1
   - $e$

2. La courbe de l'exponentielle est toujours :
   - Au-dessus de l'axe des abscisses
   - En-dessous de l'axe des abscisses
   - Passant par l'origine

3. La dérivée de $e^{-x}$ est :
   - $e^{-x}$
   - $-e^{-x}$
   - $x e^{-x}$

**Réponses :** 1. 1 | 2. Au-dessus | 3. $-e^{-x}$

---

## Foire Aux Questions (FAQ)

**Q : Pourquoi la fonction exponentielle ne peut jamais être négative ?**
R : Par définition, elle est le résultat d'une multiplication infinie de petits facteurs positifs. Mathématiquement, on montre que $e^x = (e^{x/2})^2$. Comme un carré est toujours positif ou nul, et que $e^x$ ne s'annule jamais, elle est strictement positive.

**Q : Est-ce que $e^x$ grandit plus vite que $x^2$ ?**
R : Oui, beaucoup plus vite ! C'est ce qu'on appelle la "croissance comparée". À partir d'un certain seuil, l'exponentielle finit toujours par dépasser n'importe quelle puissance de $x$, aussi grande soit-elle ($x^3, x^{10}, x^{100}...$).

---

## 💡 Le savais-tu ?
La fonction exponentielle est utilisée pour calculer la datation au **Carbone 14**. Comme la radioactivité d'un organisme mort diminue de façon exponentielle avec le temps, mesurer la quantité restante permet de calculer l'âge d'un fossile ou d'un manuscrit ancien avec une précision fascinante !
