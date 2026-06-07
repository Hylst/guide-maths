---
title: 'Chapitre 3 : Dérivation et Convexité'
level: Lycee
subLevel: Terminale
order: 3
---
# Chapitre 3 : Dérivation et Convexité

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Dérivation de Première ($u/v$, $u \circ v$), limites.  
**Objectifs** : 
- Calculer des dérivées de fonctions composées ($e^{u}$, $\ln(u)$, $u^n$).
- Maîtriser la notion de dérivée seconde ($f''$).
- Déterminer la convexité ou concavité d'une fonction.
- Repérer et interpréter un point d'inflexion graphiquement et par le calcul.

---

## Activités de découverte

**Activité : La descente de la montagne russe**
Imagine que tu es dans un wagon de montagne russe. 
- Au début de la descente, le wagon accélère de plus en plus (on dit que la pente augmente) : c'est la **convexité**. La courbe "regarde" vers le haut.
- À un moment, tu commences à freiner pour ne pas arriver trop vite en bas (la pente diminue) : c'est la **concavité**. La courbe "regarde" vers le bas.
Le moment exact où tu passes de l'accélération au freinage (changement de courbe) s'appelle un **Point d'Inflexion**. Les maths permettent de le trouver au millimètre près en étudiant la "dérivée de la dérivée" !

---

## Rappels

Avant de commencer, révise :
- **Tableau de variations** : Lien entre signe de $f'(x)$ et sens de variation de $f$.
- **Tangente** : Son équation est $y = f'(a)(x-a) + f(a)$.

---

## Explications et Théorie

### 1. Secondes dérivées
Si $f$ est une fonction deux fois dérivable, sa dérivée de dérivée est notée **$f''$**.
Elle mesure la variation de la pente.

### 2. Convexité et Concavité
- **Fonction Convexe** : Sa courbe est située au-dessus de ses tangentes. Cela se produit quand **$f''(x) \geq 0$**.
- **Fonction Concave** : Sa courbe est située en-dessous de ses tangentes. Cela se produit quand **$f''(x) \leq 0$**.

### 3. Point d'inflexion
C'est un point où la fonction change de convexité (elle passe de convexe à concave, ou inversement).
Au point d'inflexion, la tangente "traverse" la courbe.
**Calcul** : On cherche les valeurs de $x$ où $f''(x)$ s'annule **en changeant de signe**.

### 4. Dérivée de fonctions composées
- $(e^{u})' = u' e^{u}$
- $(\ln(u))' = \frac{u'}{u}$
- $(u^n)' = n u' u^{n-1}$

---

## Exples Pratiques (pas-à-pas)

### Étudier la convexité de $f(x) = x^3 - 3x^2 + 2$
1. **Dérivée première** : $f'(x) = 3x^2 - 6x$.
2. **Dérivée seconde** : $f''(x) = 6x - 6$.
3. **Signe de $f''$** : 
   $6x - 6 = 0 \iff x = 1$.
   - Si $x < 1$, $f''(x) < 0 \implies$ **F est concave**.
   - Si $x > 1$, $f''(x) > 0 \implies$ **F est convexe**.
4. **Point d'inflexion** : Il existe un point d'inflexion en $x = 1$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Calcule la dérivée seconde de $f(x) = x^4 - 2x^2 + 5$.

**🔵 Exercice 2 (Moyen)**
Étudie la convexité de la fonction exponentielle $f(x) = e^x$. Que peux-tu en conclure ?

**🟠 Exercice 3 (Difficile)**
Soit $f(x) = \frac{1}{x}$ sur $]0 ; +\infty[$. Démontre que cette fonction est convexe sur cet intervalle.

---

## Exercices corrigés

**Exercice 1 :**
$f'(x) = 4x^3 - 4x$.
$f''(x) = \mathbf{12x^2 - 4}$.

**Exercice 2 :**
$f'(x) = e^x$.
$f''(x) = e^x$.
Comme $e^x$ est toujours strictement positif, $f''(x) > 0$.
Conclusion : La fonction exponentielle est **toujours convexe** sur $\mathbb{R}$.

**Exercice 3 :**
$f(x) = x^{-1}$.
$f'(x) = -1x^{-2} = -1/x^2$.
$f''(x) = 2x^{-3} = 2/x^3$.
Sur $]0 ; +\infty[$, $x^3 > 0$, donc $f''(x) > 0$.
Conclusion : La fonction inverse est **convexe** sur $]0 ; +\infty[$.

---

## 📝 Mini-Quiz

1. Un point d'inflexion est un point où :
   - La fonction s'annule
   - La convexité change
   - La dérivée est nulle

2. Si $f''(x) < 0$ sur un intervalle, alors $f$ est :
   - Croissante
   - Convexe
   - Concave

3. Quelle est la dérivée seconde de $x^2$ ?
   - $2x$
   - 2
   - 0

**Réponses :** 1. La convexité change | 2. Concave | 3. 2

---

## Foire Aux Questions (FAQ)

**Q : À quoi servent les points d'inflexion dans la vraie vie ?**
R : En économie ou en démographie, cela correspond au moment où une croissance commence à ralentir. On parle souvent de "freinage" d'une épidémie ou d'une crise : le nombre de cas augmente encore, mais moins vite qu'avant. C'est le point d'inflexion.

---

## 💡 Le savais-tu ?
Les opticiens utilisent ces concepts pour calculer la courbure des verres de lunettes. Un verre progressif est une surface complexe dont on doit maîtriser la convexité en chaque point pour garantir une vision nette à toutes les distances sans distorsion brutale.
