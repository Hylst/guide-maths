---
title: 'Chapitre 6 : Statistiques Descriptives'
level: Lycee
subLevel: Seconde
order: 6
---
# Chapitre 6 : Statistiques Descriptives

**Niveau** : Seconde (Lycée)  
**Prérequis** : Moyenne, médiane, étendue, effectifs.  
**Objectifs** : 
- Calculer et interpréter des indicateurs de position (médiane, quartiles).
- Calculer et interpréter des indicateurs de dispersion (écart interquartile, écart-type).
- Utiliser la calculatrice pour obtenir ces indicateurs sur une série de données.

---

## Activités de découverte

**Activité : Les salaires des développeurs**
Dans l'entreprise *Codex*, le salaire médian est de 2500€. Dans l'entreprise *Syntax*, le salaire médian est aussi de 2500€. Pourtant, les employés de *Syntax* manifestent, mais pas ceux de *Codex*. Pourquoi ?
Si l'on regarde les **quartiles**, on s'aperçoit que chez *Codex*, 25% gagnent moins de 2400€ et 25% gagnent plus de 2600€. Tout le monde est regroupé. Chez *Syntax*, 25% gagnent le SMIC, et 25% gagnent plus de 8000€ !
*Conclusion : Un indicateur de position (moyenne, médiane) ne suffit pas. Il faut observer la dispersion avec les quartiles ou l'écart-type !*

---

## Rappels

Avant de commencer, révise :
- **Moyenne ($\bar{x}$)** : Somme des valeurs divisée par l'effectif total.
- **Médiane ($Me$)** : Valeur qui partage la série en deux groupes de même effectif (50% en dessous, 50% au-dessus).
- **Étendue** = Valeur Max - Valeur Min.

---

## Explications et Théorie

### 1. Les Quartiles ($Q_1$ et $Q_3$)
Les quartiles coupent la série statistique ordonnée en 4 groupes de même taille (25% chacun).
- **Le premier quartile ($Q_1$)** : C'est la plus petite valeur de la série telle qu'au moins 25% des valeurs lui soient inférieures ou égales.
- **Le troisième quartile ($Q_3$)** : C'est la plus petite valeur telle qu'au moins 75% des valeurs lui soient inférieures ou égales.
- L'**écart interquartile** se calcule en faisant $Q_3 - Q_1$. Il mesure l'étalement des 50% de valeurs "du milieu" en ignorant les extrêmes.

### 2. Variance et Écart-type ($\sigma$)
L'écart-type est l'indicateur de dispersion le plus utilisé au lycée. Il donne une "moyenne" de l'écartement de chaque valeur par rapport à la moyenne globale.
- **Variance ($V$)** : Moyenne des carrés des écarts à la moyenne. $V = \frac{1}{n} \sum (x_i - \bar{x})^2$.
- **Écart-type ($\sigma$)** : Racine carrée de la variance. $\sigma = \sqrt{V}$.

*Plus $\sigma$ est grand, plus les données sont "dispersées" (hétérogènes).*

### 3. Utilisation de la calculatrice
Au lycée, on ne calcule plus l'écart-type "à la main". On utilise le menu "Stats" de la calculatrice.
Il faut savoir entrer une série de données (List 1) et ses effectifs (List 2) pour obtenir instantanément $\bar{x}, \sigma, Q_1, Me$ et $Q_3$.

---

## Exemples Pratiques (pas-à-pas)

### Calculer les quartiles
Série de 12 notes : $5, 7, 8, 10, 10, 11, 12, 13, 14, 15, 16, 18$.
1. **$Q_1$** : $12 \times 0,25 = 3$. La 3ème valeur est **8**. Donc $Q_1 = 8$.
2. **$Q_3$** : $12 \times 0,75 = 9$. La 9ème valeur est **14**. Donc $Q_3 = 14$.
3. **Interprétation** : 25% des élèves ont moins de 8/20, et 75% ont moins de 14/20.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Soit les notes d'un élève : $6; 9; 10; 12; 14; 18; 19$. Détermine la médiane, $Q_1$ et $Q_3$.

**🔵 Exercice 2 (Moyen)**
Un basketteur marque $10, 12, 11, 40, 12$ points lors de 5 matchs. Calcule la moyenne et l'écart-type. Que penses-tu de sa régularité ?

**🟠 Exercice 3 (Difficile)**
On compare deux classes de 2nde. 
Classe A : $\bar{x} = 11$, $\sigma = 1,5$.
Classe B : $\bar{x} = 11$, $\sigma = 4$.
Quelles sont les différences majeures entre ces deux classes ? Imagine le profil des élèves.

---

## Exercices corrigés

**Exercice 1 :**
Effectif = 7.
- Médiane : 4ème valeur = **12**.
- $Q_1$ : $7 \times 0,25 = 1,75 \to$ 2ème valeur = **9**.
- $Q_3$ : $7 \times 0,75 = 5,25 \to$ 6ème valeur = **18**.

**Exercice 2 :**
- Moyenne : $85 / 5 = \mathbf{17}$.
- Écart-type : À la calculatrice, on trouve environ **$\sigma \approx 11,5$**.
- Le joueur n'est **pas régulier** (écart-type élevé) à cause de son match à 40 points qui "tire" la moyenne vers le haut mais s'éloigne des autres valeurs.

**Exercice 3 :**
La classe A est **homogène** (les élèves ont tous des notes proches de 11).
La classe B est **hétérogène** (il y a de très bons élèves et des élèves en grande difficulté, ce qui crée un large écart à la moyenne).

---

## 📝 Mini-Quiz

1. L'écart interquartile est égal à :
   - $Q_3 - Q_1$
   - $Q_3 + Q_1$
   - $Q_2 - Q_1$

2. Si l'écart-type est nul, cela signifie que :
   - Toutes les valeurs sont égales
   - Toutes les valeurs sont nulles
   - La moyenne est nulle

3. $Q_1$ correspond à environ :
   - 50% des données
   - 25% des données
   - 75% des données

**Réponses :** 1. $Q_3 - Q_1$ | 2. Toutes les valeurs sont égales | 3. 25% des données

---

## Foire Aux Questions (FAQ)

**Q : Pourquoi utilise-t-on l'écart-type plutôt que l'étendue ?**
R : L'étendue ne regarde que les deux valeurs extrêmes. Si une seule valeur est très bizarre (un génie dans une classe de nuls), l'étendue devient énorme. L'écart-type, lui, prend en compte TOUTES les données, il est donc beaucoup plus fiable pour juger de la réalité d'un groupe.

---

## 💡 Le savais-tu ?
Le concept de "courbe en cloche" (Loi Normale), très lié à l'écart-type, permet de modéliser énormément de phénomènes naturels : la taille des êtres humains, le poids des fruits sur un arbre, ou même les erreurs de mesure en physique !
