---
title: 'Chapitre 5 : La Trigonométrie'
level: Lycee
subLevel: Premiere
order: 5
---
# Chapitre 5 : La Trigonométrie

**Niveau** : Première (Spécialité Mathématiques)  
**Prérequis** : Trigonométrie du collège (SOH CAH TOA), Théorème de Pythagore, équations.  
**Objectifs** : 
- Maîtriser la mesure d'angles en radians.
- Savoir placer un point sur le cercle trigonométrique.
- Utiliser les valeurs remarquables du cosinus et du sinus.
- Résoudre des équations trigonométriques simples.
- Étudier les fonctions cosinus et sinus (périodicité et parité).

---

## Activités de découverte

**Activité : La roue de vélo géante**
Imagine un fil s'enroulant autour d'une roue de vélo de rayon $R = 1$ mètre. Comme le périmètre de la roue est $2\pi R = 2\pi$ mètres, si tu déroules le fil sur une longueur de $2\pi$ (environ 6,28 mètres), tu auras fait exactement un tour complet.
Cette idée de "longueur d'arc enroulée = angle" est la base d'une nouvelle unité de mesure indispensable dans le supérieur : le **Radian**.

---

## Rappels

Avant de commencer, révise :
- **Pi ($\pi$)** : C'est le rapport entre le périmètre d'un cercle et son diamètre ($P = 2\pi R$).
- **SOH CAH TOA** : Au collège, on définissait le sinus et le cosinus *seulement* dans un triangle rectangle. Avec le cercle trigonométrique, on va généraliser ces calculs à des angles infinis !

---

## Explications et Théorie

### 1. Le Radian
Le radian est la mesure de l'angle qui correspond à un arc de longueur 1 sur un cercle de rayon 1.
**Équivalence à retenir par cœur** : $180^\circ = \pi$ radians.
On utilise la proportionnalité pour convertir : 
- $90^\circ = \pi/2$ rad ; $60^\circ = \pi/3$ rad ; $45^\circ = \pi/4$ rad ; $30^\circ = \pi/6$ rad.

### 2. Le Cercle Trigonométrique
C'est un cercle de centre $O$ (origine du repère), de rayon $R=1$, et orienté dans le **sens direct** (anti-horaire).
- L'axe des abscisses (horizontal) lit les **cosinus**.
- L'axe des ordonnées (vertical) lit les **sinus**.

### 3. Les Fonctions Cosinus et Sinus
À tout angle réel $x$ (en radians), on associe un point $M$ sur le cercle. 
- $\cos(x)$ est l'abscisse de $M$.
- $\sin(x)$ est l'ordonnée de $M$.
Propriété fondamentale : $\cos^2(x) + \sin^2(x) = 1$.

**Parité et périodicité :** 
- $2\pi$-périodiques : $\cos(x + 2\pi) = \cos(x)$ et $\sin(x + 2\pi) = \sin(x)$.
- $\cos(-x) = \cos(x)$ (paire).
- $\sin(-x) = -\sin(x)$ (impaire).

### 4. Équations Trigonométriques
Résoudre $\cos(x) = \cos(a)$ : 
1. $x = a + k2\pi$
2. $x = -a + k2\pi$

Résoudre $\sin(x) = \sin(a)$ :
1. $x = a + k2\pi$
2. $x = (\pi - a) + k2\pi$

---

## Exples Pratiques (pas-à-pas)

### Résoudre une équation cosinus sur $]-\pi ; \pi]$
On veut résoudre l'équation $\cos(x) = \frac{1}{2}$.
1. **Valeur remarquable :** On sait que $\cos(\pi/3) = 1/2$.
2. **Double solution :** $x = \pi/3 + k2\pi$ OU $x = -\pi/3 + k2\pi$.
3. **Sur l'intervalle :** $S = \{-\pi/3 ; \pi/3\}$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Convertis les angles suivants en radians : $120^\circ$, $135^\circ$ et $270^\circ$. Donne les résultats sous forme de fraction irréductible de $\pi$.

**🔵 Exercice 2 (Moyen)**
On donne $\sin(x) = 3/5$ et on sait que $x \in [0 ; \pi/2]$. Calcule la valeur exacte de $\cos(x)$ en utilisant la relation $\cos^2(x) + \sin^2(x) = 1$.

**🟠 Exercice 3 (Difficile)**
Résous l'équation $\sin(x) = -\frac{\sqrt{2}}{2}$ sur l'intervalle $[0; 2\pi]$.

---

## Exercices corrigés

**Exercice 1 :**
- $120 \times \pi / 180 = \mathbf{2\pi/3}$.
- $135 \times \pi / 180 = \mathbf{3\pi/4}$.
- $270 \times \pi / 180 = \mathbf{3\pi/2}$.

**Exercice 2 :**
$\cos^2(x) + (3/5)^2 = 1 \implies \cos^2(x) + 9/25 = 1 \implies \cos^2(x) = 16/25$.
Comme $x \in [0 ; \pi/2]$, $\cos(x)$ est positif. Donc $\cos(x) = \sqrt{16/25} = \mathbf{4/5}$.

**Exercice 3 :**
On sait que $\sin(\pi/4) = \sqrt{2}/2$. Donc $\sin(x) = \sin(-\pi/4)$.
Sur $[0; 2\pi]$, les solutions sont $\pi + \pi/4 = \mathbf{5\pi/4}$ et $2\pi - \pi/4 = \mathbf{7\pi/4}$.

---

## 📝 Mini-Quiz

1. L'angle $180^\circ$ correspond à :
   - $\pi$ rad
   - $2\pi$ rad
   - $\pi/2$ rad

2. $\cos(-x)$ est égal à :
   - $\cos(x)$
   - $-\cos(x)$
   - $\sin(x)$

3. La valeur maximale d'un sinus est :
   - 0
   - 1
   - $\pi$

**Réponses :** 1. $\pi$ | 2. $\cos(x)$ | 3. 1

---

## Foire Aux Questions (FAQ)

**Q : Pourquoi ne plus utiliser les degrés au Lycée ?**
R : Les degrés sont arbitraires. En mathématiques, le radian est l'unité "naturelle" car il simplifie énormément les formules de dérivation (la dérivée de $\sin(x)$ est $\cos(x)$ uniquement en radians !).

---

## 💡 Le savais-tu ?
Les ondes sonores et les courants électriques alternatifs sont parfaitement modélisés par les fonctions trigonométriques. Sans elles, pas de téléphonie mobile ni de Wi-Fi !
