---
title: 'Chapitre 8 : Équations Différentielles'
level: Lycee
subLevel: Terminale
order: 8
---
# Chapitre 8 : Équations Différentielles

**Niveau** : Terminale (Spécialité Mathématiques)  
**Prérequis** : Dérivation, fonction Exponentielle.  
**Objectifs** : 
- Comprendre ce qu'est une équation différentielle.
- Résoudre des équations du type $y' = ay + b$.
- Déterminer une solution particulière vérifiant une condition initiale.
- Modéliser des phénomènes physiques ou biologiques par des équations différentielles.

---

## Activités de découverte

**Activité : Le refroidissement du café**
Pose une tasse de café brûlant (90°C) dans une pièce à 20°C. 
La vitesse à laquelle le café refroidit est proportionnelle à la différence entre la température du café et celle de l'air. Plus le café refroidit, plus il refroidit lentement.
En maths, on traduit "vitesse de variation" par une **dérivée** ($y'$). On cherche donc une fonction $y(t)$ telle que $y'(t) = -k(y(t) - 20)$. 
C'est une **équation différentielle**. La résoudre permet de prédire exactement à quelle minute le café sera à la température parfaite pour être bu !

---

## Rappels

Avant de commencer, révise :
- **Dérivée** : $y'$ représente la vitesse de variation de la fonction $y$.
- **Exponentielle** : La fonction $e^{ax}$ a pour dérivée $a e^{ax}$.

---

## Explications et Théorie

### 1. Qu'est-ce qu'une équation différentielle ?
C'est une équation où l'inconnue n'est pas un nombre, mais une **fonction** $y$, et qui contient au moins une de ses dérivées ($y', y'' ...$).

### 2. Équation $y' = ay$
Les solutions sont toutes les fonctions de la forme :
$$f(x) = C e^{ax}$$
où $C$ est une constante réelle.
*(On obtient une seule solution précise si on nous donne une **condition initiale**, comme $f(0)=2$)*.

### 3. Équation $y' = ay + b$ (avec $a \neq 0$)
Les solutions sont les fonctions de la forme :
$$f(x) = C e^{ax} - \frac{b}{a}$$
- $Ce^{ax}$ est la partie "variable".
- $-b/a$ est la solution "constante" (particulière).

### 4. Modélisations classiques
- **Radioactivité** : $N'(t) = -\lambda N(t)$.
- **Démographie** : $P'(t) = r P(t)$ (Modèle de Malthus).
- **Circuit RC** : $u'(t) + \frac{1}{\tau} u(t) = E$.

---

## Exples Pratiques (pas-à-pas)

### Résoudre $y' = 3y + 6$ avec $y(0) = 4$
1. **Forme générale** : Ici $a=3$ et $b=6$. 
   La solution est $y(x) = C e^{3x} - \frac{6}{3} = \mathbf{C e^{3x} - 2}$.
2. **Utiliser la condition initiale** :
   $y(0) = 4 \implies C e^0 - 2 = 4 \implies C - 2 = 4 \implies \mathbf{C = 6}$.
3. **Solution finale** : $f(x) = 6 e^{3x} - 2$.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Résous l'équation $y' = -2y$. Quelle est la solution telle que $f(0) = 5$ ?

**🔵 Exercice 2 (Moyen)**
On donne $y' = 4y - 12$. Trouve la solution constante (quand $y'=0$). En déduire la forme générale des solutions.

**🟠 Exercice 3 (Difficile)**
Un réservoir se vide. La hauteur d'eau $h(t)$ vérifie $h' = -0,5 h$. 
Au départ, $h(0) = 2$ mètres. Au bout de combien de temps la hauteur sera-t-elle de 1 mètre ?

---

## Exercices corrigés

**Exercice 1 :**
$y(x) = C e^{-2x}$.
Avec $f(0)=5 \implies C e^0 = 5 \implies C=5$.
Solution : **$f(x) = 5 e^{-2x}$**.

**Exercice 2 :**
Solution constante : $4y - 12 = 0 \implies y = 3$.
En effet, $-b/a = -(-12)/4 = 3$.
Forme générale : **$y(x) = C e^{4x} + 3$**.

**Exercice 3 :**
$h(t) = 2 e^{-0,5t}$.
On cherche $t$ tel que $2 e^{-0,5t} = 1 \implies e^{-0,5t} = 0,5$.
On applique $\ln$ : $-0,5t = \ln(0,5)$.
$t = \ln(0,5) / (-0,5) \approx \mathbf{1,38}$ unités de temps.

---

## 📝 Mini-Quiz

1. L'inconnue d'une équation différentielle est :
   - Un chiffre
   - Une fonction
   - Un angle

2. Quelle est la solution de $y' = y$ telle que $y(0)=1$ ?
   - $x$
   - $e^x$
   - $\ln(x)$

3. La solution constante de $y' = -y + 5$ est :
   - 0
   - -5
   - 5

**Réponses :** 1. Une fonction | 2. $e^x$ | 3. 5

---

## Foire Aux Questions (FAQ)

**Q : À quoi servent les équations différentielles en économie ?**
R : Elles permettent de modéliser les taux de croissance. Par exemple, comment la vitesse d'investissement dépend du capital déjà présent. La plupart des modèles financiers de haute technologie sont basés sur des systèmes d'équations différentielles stochastiques (avec du hasard).

---

## 💡 Le savais-tu ?
Isaac Newton et Gottfried Leibniz ont inventé (indépendamment) le calcul différentiel au 17ème siècle. C'est l'outil qui a permis l'avènement de la physique moderne. Avant cela, on ne savait pas calculer de trajectoires complexes comme celles des planètes ou des boulets de canon !
