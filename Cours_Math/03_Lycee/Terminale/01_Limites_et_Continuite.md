---
title: 'Chapitre 1 : Limites et Continuité'
level: Lycee
subLevel: Terminale
order: 1
---
# Chapitre 1 : Limites et Continuité

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Dérivation, fonctions de référence, suites.  
**Objectifs** : 
- Calculer des limites de fonctions (formes indéterminées, composition).
- Interpréter graphiquement les limites (asymptotes).
- Comprendre la continuité et utiliser le Théorème des Valeurs Intermédiaires (TVI).

---

## Activités de découverte

**Activité : L'infiniment proche**

1. **Le comportement en l'infini** : Que se passe-t-il pour la fonction $f(x) = \frac{1}{x}$ lorsque $x$ devient immensément grand (1 million, 1 milliard...) ? La valeur de $f(x)$ se rapproche-t-elle d'un nombre précis ?
2. **Le saut** : Imagine une fonction qui vaut 0 pour $x < 0$ et 1 pour $x \ge 0$. Peux-tu tracer sa courbe sans lever le crayon au point $x = 0$ ?
3. **La traversée** : Si une fonction continue part d'une valeur négative ($f(1) = -2$) et arrive à une valeur positive ($f(3) = 5$), doit-elle forcément passer par 0 à un moment donné ?

---

## Rappels

Avant de commencer, révise :
- **Fonctions de référence** : $\lim_{x \to +\infty} x^2 = +\infty$, $\lim_{x \to +\infty} \frac{1}{x} = 0$, $\lim_{x \to +\infty} e^x = +\infty$.
- **Dérivation** : Le signe de la dérivée donne les variations de la fonction.
- **Inégalités** : Manipuler des encadrements.

---

## Explications et Théorie

### 1. Limites et Asymptotes
- **Limite finie en l'infini** : Si $\lim_{x \to +\infty} f(x) = L$, alors la droite $y = L$ est une **asymptote horizontale**.
- **Limite infinie en un point** : Si $\lim_{x \to a} f(x) = \pm\infty$, alors la droite $x = a$ est une **asymptote verticale**.

### 2. Formes Indéterminées (FI)
Il existe 4 cas où l'on ne peut pas conclure directement :
1. $\infty - \infty$
2. $0 \times \infty$
3. $\frac{\infty}{\infty}$
4. $\frac{0}{0}$
*Techniques pour lever une FI* : Factorisation par le plus haut degré, quantité conjuguée, croissances comparées.

### 3. Continuité
Une fonction $f$ est continue en $a$ si $\lim_{x \to a} f(x) = f(a)$.
- Graphiquement : On peut tracer la courbe sans lever le crayon.
- Les fonctions usuelles sont continues sur leur ensemble de définition.

### 4. Théorème des Valeurs Intermédiaires (TVI)
**Théorème** : Si $f$ est continue sur $[a ; b]$, alors pour tout $k$ entre $f(a)$ et $f(b)$, l'équation $f(x) = k$ a au moins une solution.
**Corollaire (Bijection)** : Si $f$ est continue ET strictement monotone sur $[a ; b]$, alors la solution est **unique**.

### Méthodes pas-à-pas

**Comment lever une indétermination $\frac{\infty}{\infty}$ ?**
1. Identifier les termes de plus haut degré au numérateur et au dénominateur.
2. Factoriser en haut et en bas par ces termes.
3. Simplifier la fraction.
4. Calculer la limite des termes restants (les termes en $1/x^n$ tendent vers 0).

---

## Le saviez-vous ?

Le concept de limite a mis des siècles à être formalisé. Newton et Leibniz utilisaient des "infinitésimaux" (des nombres infiniment petits mais non nuls) pour inventer le calcul différentiel. Ce n'est qu'au XIXe siècle que des mathématiciens comme Cauchy et Weierstrass ont donné la définition rigoureuse que nous utilisons aujourd'hui, mettant fin aux débats philosophiques sur la nature de l'infini !

---

## Exercices

### Exercices d'application directe

1. Calcule $\lim_{x \to +\infty} (x^2 - 5x)$.
2. Détermine l'asymptote verticale de $f(x) = \frac{1}{x-3}$.
3. La fonction $f(x) = |x|$ est-elle continue en 0 ?

### Exercices d'entraînement

4. **FI** : Calcule $\lim_{x \to +\infty} \frac{2x^2 + 1}{x^2 - 3x}$.
5. **TVI** : Montre que l'équation $x^3 + x = 5$ possède une unique solution sur $[1 ; 2]$.
6. **Composition** : Calcule $\lim_{x \to +\infty} e^{-x^2}$.

### Problèmes ouverts

7. **Le barrage** : Une fonction $f$ est continue sur $[0 ; 10]$. On sait que $f(0) = -5$ et $f(10) = 5$. Peut-on affirmer que la courbe de $f$ coupe l'axe des abscisses ? Si oui, combien de fois au minimum ?

---

## Exercices corrigés

**Exercice 1 :**
$\lim_{x \to +\infty} (x^2 - 5x) = \lim_{x \to +\infty} x^2(1 - \frac{5}{x}) = \mathbf{+\infty}$ (car $1 - 0 = 1$).

**Exercice 2 :**
Le dénominateur s'annule en $x = 3$. $\lim_{x \to 3} \frac{1}{x-3} = \pm\infty$. L'asymptote est la droite **$x = 3$**.

**Exercice 3 :**
$\lim_{x \to 0} |x| = 0$ et $f(0) = 0$. Les deux sont égaux, donc la fonction est **continue** en 0.

**Exercice 4 :**
$\frac{2x^2 + 1}{x^2 - 3x} = \frac{x^2(2 + 1/x^2)}{x^2(1 - 3/x)} = \frac{2 + 1/x^2}{1 - 3/x}$. La limite est $\frac{2+0}{1-0} = \mathbf{2}$.

**Exercice 5 :**
Soit $f(x) = x^3 + x$. $f$ est continue et strictement croissante ($f'(x) = 3x^2 + 1 > 0$).
$f(1) = 2$ and $f(2) = 10$. Comme $5 \in [2 ; 10]$, d'après le corollaire du TVI, il y a une **unique solution**.

**Exercice 6 :**
Posons $X = -x^2$. Quand $x \to +\infty$, $X \to -\infty$.
$\lim_{X \to -\infty} e^X = \mathbf{0}$.

**Exercice 7 :**
Oui, d'après le TVI, car 0 est entre -5 et 5. Elle coupe l'axe **au moins une fois**.

---

## Synthèse

- **Asymptote Horizontale** : Limite finie en l'infini.
- **Asymptote Verticale** : Limite infinie en un point.
- **FI** : Lever l'indétermination par factorisation ou croissances comparées.
- **TVI** : Garantit l'existence d'une solution pour $f(x) = k$.

---

## 📝 Mini-Quiz

**Question 1 : $\frac{0}{\infty}$ est une forme indéterminée.**
- [ ] Vrai
- [x] Faux
> **Explication :** La bonne réponse est : Faux (ça vaut 0)

**Question 2 : Si une fonction est continue, elle est forcément dérivable.**
- [ ] Vrai
- [x] Faux
> **Explication :** La bonne réponse est : Faux (ex: la fonction valeur absolue en 0)

**Question 3 : $\lim_{x \to 0^+} \ln(x) = -\infty$.**
- [x] Vrai
- [ ] Faux
> **Explication :** La bonne réponse est : Vrai.


---

## Pour aller plus loin

**Le théorème des gendarmes**
Pour calculer des limites complexes, on utilise parfois l'encadrement. Si $g(x) \le f(x) \le h(x)$ et que $g$ et $h$ tendent vers la même limite $L$, alors $f$ est "forcée" de tendre aussi vers $L$. C'est très utile pour les fonctions trigonométriques comme $\frac{\sin(x)}{x}$ en l'infini.

---

## FAQ

**Q : Pourquoi $\infty - \infty$ est indéterminé ?**
**R** : Parce que tout dépend de "quel infini est le plus fort". Si c'est $x^2 - x$, $x^2$ l'emporte et ça tend vers $+\infty$. Si c'est $x - x^2$, ça tend vers $-\infty$. Si c'est $x - (x+5)$, ça tend vers -5. On ne peut pas savoir sans étudier les fonctions précisément.

**Q : Le TVI donne-t-il la valeur de la solution ?**
**R** : Non, il prouve seulement qu'elle existe. Pour trouver sa valeur, on utilise des méthodes numériques comme la balayage à la calculatrice ou l'algorithme de dichotomie.

---

## Mini-Quiz

1. La limite de $\frac{1}{x^2}$ en 0 est :
   - 0
   - $+\infty$
   - $-\infty$

2. Si $\lim_{x \to +\infty} f(x) = 3$, alors :
   - $x = 3$ est asymptote verticale
   - $y = 3$ est asymptote horizontale
   - La fonction est croissante

3. Une fonction continue sur $[a ; b]$ :
   - Est toujours croissante
   - Peut être tracée sans lever le crayon
   - Est forcément un polynôme

4. $\lim_{x \to +\infty} \frac{e^x}{x}$ est égale à :
   - 0
   - 1
   - $+\infty$

**Réponses :** 1. $+\infty$ | 2. $y = 3$ est asymptote horizontale | 3. Peut être tracée sans lever le crayon | 4. $+\infty$ (croissances comparées)
