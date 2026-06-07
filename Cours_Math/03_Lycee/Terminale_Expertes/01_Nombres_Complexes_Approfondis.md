---
title: 'Maths Expertes - Chapitre 1 : Nombres Complexes (Approfondissements)'
level: Lycee
subLevel: Terminale_Expertes
order: 1
---
# Chapitre 1 : Nombres Complexes (Approfondissements)

**Niveau** : Terminale (Option Mathématiques Expertes)  
**Prérequis** : Nombres complexes du tronc commun (forme algébrique, exponentielle).  
**Objectifs** : 
- Maîtriser la résolution des équations de degré $n$ (racines $n$-ièmes).
- Utiliser les formules de Moivre et d'Euler pour la linéarisation.
- Approfondir les interprétations géométriques (rotations, homothéties complexes).
- Comprendre les ensembles de points et les transformations du plan.

---

## Activités de découverte

**Activité : La division d'un cercle en n parts égales**
Comment placer exactement 5 points sur un cercle pour former un pentagone régulier parfait ? 
En maths réelles, c'est difficile. En maths complexes, cela revient à chercher les nombres $z$ tels que $z^5 = 1$. 
Ces nombres, appelés **racines 5-ièmes de l'unité**, se répartissent avec une symétrie parfaite sur le cercle unité. C'est la porte d'entrée vers l'algèbre moderne et la géométrie fractale !

---

## Rappels

Avant de commencer, révise :
- **Forme exponentielle** : $z = r e^{i\theta}$.
- **Conjugué** : $\overline{z_1 z_2} = \overline{z_1} \cdot \overline{z_2}$.
- **Module** : $|z|^2 = z \bar{z}$.

---

## Explications et Théorie

### 1. Formules de Moivre et d'Euler
- **Moivre** : $(\cos \theta + i \sin \theta)^n = \cos(n\theta) + i \sin(n\theta)$, soit $(e^{i\theta})^n = e^{in\theta}$.
- **Euler** : 
  - $\cos \theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$
  - $\sin \theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$
*Ces formules permettent de transformer des puissances ($\cos^n x$) en sommes de cosinus/sinus (linéarisation), facilitant ainsi le calcul d'intégrales.*

### 2. Racines n-ièmes de l'unité
Les solutions de $z^n = 1$ sont les nombres $w_k = e^{i\frac{2k\pi}{n}}$ pour $k \in \{0, 1, ..., n-1\}$.
- Géométriquement, elles forment un polygone régulier à $n$ côtés inscrit dans le cercle unité.
- La somme de toutes les racines $n$-ièmes est toujours égale à 0.

### 3. Équations de degré $n$
- Tout polynôme de degré $n$ admet exactement $n$ racines dans $\mathbb{C}$ (comptées avec leur multiplicité). 
- Si les coefficients sont réels et si $z_0$ est une racine, alors son conjugué $\bar{z_0}$ est aussi une racine.

### 4. Géométrie et Transformations
- **Translation** par le vecteur d'affixe $b$ : $z' = z + b$.
- **Homothétie** de centre $\Omega(\omega)$ et de rapport $k$ : $z' - \omega = k(z - \omega)$.
- **Rotation** de centre $\Omega(\omega)$ et d'angle $\theta$ : $z' - \omega = e^{i\theta}(z - \omega)$.

---

## Exples Pratiques (pas-à-pas)

### Résoudre $z^3 = 8$
1. **Passer en forme exponentielle** : $8 = 8 e^{i \times 0}$.
2. **Chercher $z = r e^{i\alpha}$** : $z^3 = r^3 e^{i \times 3\alpha}$.
3. **Identifier** : 
   - $r^3 = 8 \implies r = 2$.
   - $3\alpha = 0 + 2k\pi \implies \alpha = \frac{2k\pi}{3}$.
4. **Solutions** : 
   - $z_0 = 2 e^0 = \mathbf{2}$.
   - $z_1 = 2 e^{i\frac{2\pi}{3}} = \mathbf{-1 + i\sqrt{3}}$.
   - $z_2 = 2 e^{i\frac{4\pi}{3}} = \mathbf{-1 - i\sqrt{3}}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Donne les racines carrées de $i$ sous forme exponentielle.

**🔵 Exercice 2 (Moyen)**
Linéarise $\cos^3(x)$ en utilisant les formules d'Euler.

**🟠 Exercice 3 (Difficile)**
Soit $A(i)$ et $B(2)$. Détermine l'ensemble des points $M(z)$ tels que $|z - i| = |z - 2|$. Interprète géométriquement.

---

## Exercices corrigés

**Exercice 1 :**
$i = e^{i\frac{\pi}{2}}$. 
Les racines sont $e^{i\frac{\pi}{4}}$ et $e^{i(\frac{\pi}{4} + \pi)} = e^{i\frac{5\pi}{4}}$.
En forme algébrique : $\frac{\sqrt{2}}{2} + i\frac{\sqrt{2}}{2}$ et $-\frac{\sqrt{2}}{2} - i\frac{\sqrt{2}}{2}$.

**Exercice 2 :**
$\cos^3 x = \left(\frac{e^{ix} + e^{-ix}}{2}\right)^3 = \frac{1}{8} (e^{i3x} + 3e^{i2x}e^{-ix} + 3e^{ix}e^{-i2x} + e^{-i3x})$.
$= \frac{1}{8} (e^{i3x} + e^{-i3x} + 3e^{ix} + 3e^{-ix}) = \frac{1}{4} \left(\frac{e^{i3x} + e^{-i3x}}{2} + 3\frac{e^{ix} + e^{-ix}}{2}\right) = \mathbf{\frac{1}{4} \cos(3x) + \frac{3}{4} \cos(x)}$.

**Exercice 3 :**
$|z - i|$ est la distance $AM$. $|z - 2|$ est la distance $BM$. 
On cherche $AM = BM$. 
L'ensemble des points est la **médiatrice du segment $[AB]$**.

---

## 📝 Mini-Quiz

1. Combien y a-t-il de racines 4-ièmes de 1 ?
   - 1
   - 2
   - 4

2. La rotation d'angle $\pi/2$ correspond à une multiplication par :
   - -1
   - $i$
   - $e^i$

3. Dans l'homothétie de rapport 2 et de centre O, l'affixe $z'$ est :
   - $z+2$
   - $2z$
   - $z^2$

**Réponses :** 1. 4 | 2. $i$ | 3. $2z$

---

## Foire Aux Questions (FAQ)

**Q : C'est quoi la différence entre le second degré réel et complexe ?**
R : Dans $\mathbb{R}$, si $\Delta < 0$, il n'y a pas de solution. Dans $\mathbb{C}$, il y en a TOUJOURS deux. On utilise $\sqrt{-\Delta} \times i$. Cela signifie qu'aucune équation polynomiale ne reste sans réponse dans le monde des complexes.

---

## 💡 Le savais-tu ?
Les ensembles de Mandelbrot et de Julia, les images fractales les plus célèbres du monde, sont créés en répétant une simple opération sur des nombres complexes ($z_{n+1} = z_n^2 + c$). La complexité infinie de ces images naît uniquement de la richesse algébrique des nombres imaginaires.
