---
title: 'Chapitre 10 : Nombres Complexes'
level: Lycee
subLevel: Terminale
order: 10
---
# Chapitre 10 : Nombres Complexes

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Trigonométrie, calcul littéral, équations du second degré.  
**Objectifs** : 
- Maîtriser l'écriture algébrique ($a+bi$) et le nombre imaginaire $i$.
- Passer à l'écriture trigonométrique et exponentielle.
- Utiliser les complexes pour résoudre des problèmes de géométrie.
- Résoudre des équations du second degré dans $\mathbb{C}$.

---

## Activités de découverte

**Activité : Le nombre qui ne devrait pas exister**
On t'a toujours appris que le carré d'un nombre est toujours positif. Par exemple, $2^2 = 4$ et $(-2)^2 = 4$. Donc, l'équation $x^2 = -1$ n'a aucune solution réelle. 
Mais imagine qu'on "invente" un nombre magique, noté **$i$**, tel que **$i^2 = -1$**. 
En acceptant ce nombre imaginaire, on découvre un univers mathématique nouveau (le plan complexe) où toutes les équations ont des solutions, et où la géométrie devient un simple calcul algébrique !

---

## Rappels

Avant de commencer, révise :
- **Cercle trigonométrique** : $\cos(\theta)$ et $\sin(\theta)$.
- **Coordonnées** : Un point $M(x ; y)$.

---

## Explications et Théorie

### 1. Forme Algébrique
Tout nombre complexe $z$ s'écrit de façon unique :
$$z = a + bi$$
- $a$ est la **partie réelle** ($Re(z)$).
- $b$ est la **partie imaginaire** ($Im(z)$).
- Si $a=0$, $z$ est un imaginaire pur.

### 2. Le plan complexe
On associe à $z = a+bi$ le point $M(a ; b)$ dans un repère orthonormé.
- **Module** : $|z| = \sqrt{a^2 + b^2}$. C'est la distance $OM$.
- **Argument** : $\text{arg}(z) = \theta$ tel que $\cos \theta = a/|z|$ et $\sin \theta = b/|z|$. C'est l'angle de direction.

### 3. Forme Trigonométrique et Exponentielle
$$z = r(\cos \theta + i \sin \theta) = r e^{i\theta}$$
*(L'écriture exponentielle est la plus pratique pour multiplier ou diviser des complexes)*.

### 4. Conjugué
Le conjugué de $z = a+bi$ est $\bar{z} = a - bi$.
Propriété : $z \bar{z} = a^2 + b^2 = |z|^2$.

---

## Exples Pratiques (pas-à-pas)

### Passer de l'écriture algébrique à exponentielle
Soit $z = 1 + i$. 
1. **Calcul du module** : $|z| = \sqrt{1^2 + 1^2} = \sqrt{2}$.
2. **Recherche de l'argument** : 
   $\cos \theta = 1/\sqrt{2} = \sqrt{2}/2$
   $\sin \theta = 1/\sqrt{2} = \sqrt{2}/2$
   $\implies \theta = \pi/4$.
3. **Résultat** : $z = \sqrt{2} e^{i\frac{\pi}{4}}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Calcule $(2 + 3i)(1 - i)$ et donne le résultat sous forme algébrique.

**🔵 Exercice 2 (Moyen)**
Résous l'équation $z^2 + z + 1 = 0$ dans $\mathbb{C}$.

**🟠 Exercice 3 (Difficile)**
Démontre que pour tout réel $\theta$, $|e^{i\theta}| = 1$. Quelle est la forme géométrique décrite par les points d'affixe $e^{i\theta}$ ?

---

## Exercices corrigés

**Exercice 1 :**
$(2+3i)(1-i) = 2 - 2i + 3i - 3i^2 = 2 + i - 3(-1) = 2 + i + 3 = \mathbf{5 + i}$.

**Exercice 2 :**
$\Delta = 1^2 - 4(1)(1) = -3$.
Comme $\Delta < 0$, il y a deux solutions complexes conjuguées :
$z_1 = \frac{-1 - i\sqrt{3}}{2}$ et $z_2 = \frac{-1 + i\sqrt{3}}{2}$.

**Exercice 3 :**
$|e^{i\theta}| = |\cos \theta + i \sin \theta| = \sqrt{\cos^2 \theta + \sin^2 \theta} = \sqrt{1} = \mathbf{1}$.
Comme le module est constant et égal à 1, tous ces points sont à la même distance de l'origine : ils forment le **cercle trigonométrique**.

---

## 📝 Mini-Quiz

1. $i^2$ est égal à :
   - 1
   - -1
   - $i$

2. Le module de $3i$ est :
   - 3
   - -3
   - 9

3. $e^{i\pi}$ est égal à :
   - 1
   - -1
   - $i$

**Réponses :** 1. -1 | 2. 3 | 3. -1

---

## Foire Aux Questions (FAQ)

**Q : Est-ce que les nombres complexes servent à quelque chose "en vrai" ?**
R : Énormément ! En électronique, on utilise les complexes pour calculer l'impédance des circuits alternatifs. En aéronautique, ils permettent de modéliser l'écoulement de l'air autour d'une aile d'avion. Sans les complexes, on ne saurait pas construire d'avions modernes ni de processeurs informatiques !

---

## 💡 Le savais-tu ?
L'égalité $e^{i\pi} + 1 = 0$ est considérée par beaucoup comme la "plus belle formule des mathématiques". Elle relie 5 nombres fondamentaux ($e, i, \pi, 1, 0$) qui semblent pourtant n'avoir rien en commun, par une relation d'une simplicité désarmante.
