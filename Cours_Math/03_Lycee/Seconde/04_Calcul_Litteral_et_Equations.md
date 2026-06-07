---
title: 'Chapitre 4 : Calcul Littéral et Équations'
level: Lycee
subLevel: Seconde
order: 4
---
# Chapitre 4 : Calcul Littéral et Équations

**Niveau** : Seconde (Lycée)  
**Prérequis** : Identités remarquables, développement, équations du 1er degré, intervalles.  
**Objectifs** : 
- Maîtriser le calcul algébrique (mise au même dénominateur, factorisations complexes).
- Résoudre des équations contenant des quotients ou de niveau "second degré" (en se ramenant à un produit nul).
- Savoir dresser un tableau de signes pour un produit ou un quotient.
- Résoudre une inéquation (produit cible ou quotient usuel).

---

## Activités de découverte

**Activité : Quand le zéro fait peur !**
Tu dois résoudre l'équation suivante : $\frac{x^2 - 4}{x - 2} = 0$.
1. Ton premier réflexe est de dire que $2^2 - 4 = 0$, donc la solution pourrait être $x=2$.
2. Essaye de remplacer $x$ par $2$ dans le quotient complet. $\frac{0}{0}$ ! 
3. *Alerte rouge* : En mathématiques, diviser par $0$ est absolument interdit. $x=2$ est ce qu'on appelle une **Valeur Interdite**.
Le raisonnement rigoureux à l'aide des factorisations va t'apprendre à éviter ce "piège mortel" !

---

## Rappels

Avant de commencer, révise :
- **Identités Remarquables** : $A^2 - B^2 = (A-B)(A+B)$.
- **Fraction nulle** : Un quotient algébrique $\frac{A}{B} = 0$ implique obligatoirement $A=0$ ET $B \neq 0$.
- **Règles des signes sur inéquations** : Quand on multiplie ou divise une inéquation par un nombre **négatif**, on **change le sens** de l'inégalité !

---

## Explications et Théorie

### 1. Les Tableaux de Signes
Un tableau de signes sert à savoir sur quels intervalles une expression est positive ou négative.
**Règle pour une fonction affine $ax+b$** :
- Elle s'annule en $x = -\frac{b}{a}$.
- Le signe change autour de ce zéro. La droite "monte" si $a>0$ (donc d'abord $-$, puis $+$), et elle "descend" si $a<0$ (d'abord $+$, puis $-$).

### 2. Produit de expressions (Tableaux de signes)
Pour étudier le signe d'un produit, on étudie le signe de chaque facteur dans un grand tableau, puis on applique la règle des signes ( $-$ par $-$ fait $+$, etc.).
*On utilise beaucoup cela pour résoudre $(2x+4)(-x+3) \leq 0$.*

### 3. Les Inéquations quotients
Même principe : le tableau de signes !
- **Attention absolue** : On doit trouver les valeurs de $x$ qui annulent le dénominateur.
- Dans la ligne du résultat du tableau, ces valeurs interdites sont matérialisées par une **double barre** ($||$).

### 4. Se ramener à "Zéro" !
Pour résoudre des inéquations complexes du type $(x+3)^2 > 25$, on ne doit JAMAIS prendre la racine carrée ou développer si ça donne du $x^2$. 
Il faut :
1. Tout passer à gauche : $(x+3)^2 - 25 > 0$
2. Reconnaître une identité remarquable ($A^2 - B^2$) et factoriser : $((x+3)-5)((x+3)+5) > 0$
3. Simplifier : $(x-2)(x+8) > 0$.
4. Faire un beau tableau de signes !

---

## Exemples Pratiques (pas-à-pas)

### Étude complète du signe de $\frac{3x - 9}{-2x - 4}$
**Étape 1 : Racines et valeurs interdites.**
- Numérateur : $3x - 9 = 0 \implies 3x = 9 \implies x = 3$.
- Dénominateur : $-2x - 4 = 0 \implies -2x = 4 \implies x = -2$. C'est la **valeur interdite**.

**Étape 2 : Le tableau de signes.**
On range les $x$ dans l'ordre de croissance : $-\infty$, puis $-2$, puis $3$, puis $+\infty$.

| $x$ | $-\infty$ | | $-2$ | | $3$ | | $+\infty$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Signe de $3x - 9$ | | $-$ | $|$ | $-$ | $0$ | $+$ | |
| Signe de $-2x - 4$| | $+$ | $0$ | $-$ | $|$ | $-$ | |
| **Signe du quotient** | | **$-$** | **$||$** | **$+$** | **$0$** | **$-$** | |

*Note sur $(-2x-4)$ : le coefficient devant $x$ est $-2$ (négatif), donc c'est $+$ avant de s'annuler, puis $-$.*

**Étape 3 : Lecture des intervalles.**
Si on cherchait à résoudre $\frac{3x - 9}{-2x - 4} \geq 0$, on lirait la ligne du quotient et la réponse serait : $S = ]-2 ; 3]$. *(Le crochet est ouvert en -2 car c'est une valeur interdite)*.

---

## Exercices

**🟢 Exercice 1 (Facile)**
Dresse le tableau de signes de l'expression affine : $f(x) = 4x + 12$.

**🔵 Exercice 2 (Moyen)**
Résous l'inéquation en utilisant un tableau de signes : $(x - 5)(x + 2) < 0$.

**🟠 Exercice 3 (Difficile)**
Factorise l'expression suivante puis étudie son signe : $E = (2x - 1)^2 - (2x - 1)(x + 3)$.
*(Indice : $(2x-1)$ est le facteur commun !)*

**🔴 Exercice 4 (Défi)**
Résous l'inéquation quotient : $\frac{2}{x - 1} \leq 3$.
*(Attention piège : interdiction de multiplier par $x-1$ de chaque côté car on ne connait pas son signe ! Il faut passer le $3$ à gauche, mettre au même dénominateur, et faire un tableau).*

---

## Exercices corrigés

**Exercice 1 :**
$4x + 12 = 0 \implies x = -3$. Pente $a=4 > 0$.
Signe : $-$ sur $]-\infty ; -3]$ et $+$ sur $[-3 ; +\infty[$.

**Exercice 2 :**
Valeurs qui annulent : $5$ et $-2$.
Tableau de signes : $+$ sur $]-\infty ; -2[$, $-$ sur $]-2 ; 5[$, $+$ sur $]5 ; +\infty[$.
Solution : **$S = ]-2 ; 5[$**.

**Exercice 3 :**
$E = (2x - 1) [ (2x - 1) - (x + 3) ] = (2x - 1)(2x - 1 - x - 3) = \mathbf{(2x - 1)(x - 4)}$.
Signe : $+$ sur $]-\infty ; 0,5[ \cup ]4 ; +\infty[$. $-$ sur $]0,5 ; 4[$.

**Exercice 4 :**
$\frac{2}{x-1} - 3 \leq 0 \implies \frac{2 - 3(x-1)}{x-1} \leq 0 \implies \frac{2 - 3x + 3}{x-1} \leq 0 \implies \mathbf{\frac{5 - 3x}{x-1} \leq 0}$.
Valeur interdite : $1$. Racine : $5/3$.
Tableau : $-$ sur $]-\infty ; 1[$, $+$ sur $]1 ; 5/3]$, $-$ sur $[5/3 ; +\infty[$.
Solution : **$S = ]-\infty ; 1[ \cup [5/3 ; +\infty[$**.

---

## 📝 Mini-Quiz

1. Résoudre $(x+1)(x-1) = 0$ donne :
   - $x = 0$
   - $x = 1$ et $x = -1$
   - $x = 1$ uniquement

2. Quel est le signe de $2x - 8$ pour $x = 5$ ?
   - Négatif
   - Positif
   - Nul

3. La valeur interdite de $\frac{1}{x+4}$ est :
   - 4
   - -4
   - 0

**Réponses :** 1. $1$ et $-1$ | 2. Positif ($10-8=2$) | 3. -4

---

## Foire Aux Questions (FAQ)

**Q : Est-ce que je peux enlever une racine carrée en mettant tout au carré ? Du genre si $\sqrt{x} < -2$.**
R : JAMAIS sans réfléchir ! Une racine carrée donne toujours un résultat POSITIF. L'inéquation $\sqrt{x} < -2$ n'a aucune solution dans l'ensemble des réels, c'est impossible. Ne tombe pas dans le piège aveugle du calcul mécanique !

---

## 💡 Le savais-tu ?
Les symboles des intervalles $[$ et $]$ que l'on utilise pour définir une zone de solutions (introduits plus au Lycée) n'existent que depuis 1893 ! C'est le brillant mathématicien italien Giuseppe Peano qui a introduit cette notation pour être capable d'exclure (tourné vers l'extérieur $] [$) ou d'inclure les frontières infinies.
