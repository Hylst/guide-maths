---
title: 'Chapitre 4 : Équations Différentielles'
level: Post_Bac
subLevel: Analyse_L2
order: 4
---
# Chapitre 4 : Équations Différentielles

**Niveau** : Post-Bac (CPGE, Licence)  
**Prérequis** : Dérivation, intégration, nombres complexes.  
**Objectifs** : 
- Résoudre les équations différentielles linéaires du 1er et 2nd ordre.
- Comprendre la notion de problème de Cauchy.
- Étudier les systèmes différentiels linéaires.

---

## Activités de découverte

**Activité : La croissance d'une population**

Imaginons une population de bactéries qui se reproduit. Le nombre de bactéries $N(t)$ à l'instant $t$ augmente proportionnellement au nombre de bactéries déjà présentes.

1. **Modélisation** : Traduis cette phrase par une égalité faisant intervenir la dérivée $N'(t)$.
2. **Recherche de fonction** : Quelle fonction mathématique connais-tu qui est égale à sa propre dérivée (à un coefficient près) ?
3. **Condition initiale** : Si au départ ($t=0$) il y a 100 bactéries, comment cela influence-t-il la formule finale ?

---

## Rappels

Avant de commencer, révise :
- **Dérivées usuelles** : $(e^{ax})' = a e^{ax}$, $(\cos \omega t)' = -\omega \sin \omega t$.
- **Primitives** : $\int \frac{1}{x} dx = \ln|x| + C$.
- **Équations du second degré** : Résolution dans $\mathbb{C}$ quand $\Delta < 0$.

---

## Explications et Théorie

### 1. Équations du 1er ordre
Une équation linéaire du 1er ordre s'écrit : $y' + a(x)y = b(x)$.
- **Équation homogène** ($b=0$) : Les solutions sont $y_H(x) = C e^{-A(x)}$ où $A$ est une primitive de $a$.
- **Solution générale** : $y = y_H + y_P$ (où $y_P$ est une solution particulière).
- **Méthode de la variation de la constante** : On cherche $y_P$ sous la forme $C(x) e^{-A(x)}$.

### 2. Équations du 2nd ordre à coefficients constants
Forme : $ay'' + by' + cy = f(x)$.
On résout l'équation caractéristique $ar^2 + br + c = 0$.
- **$\Delta > 0$** : $y_H = C_1 e^{r_1 x} + C_2 e^{r_2 x}$.
- **$\Delta = 0$** : $y_H = (C_1 x + C_2) e^{r_0 x}$.
- **$\Delta < 0$** ($r = \alpha \pm i\beta$) : $y_H = e^{\alpha x} (C_1 \cos \beta x + C_2 \sin \beta x)$.

### 3. Systèmes différentiels
Forme : $X' = AX$.
Si $A$ est diagonalisable avec valeurs propres $\lambda_i$ et vecteurs propres $V_i$, la solution est :
$$X(t) = \sum C_i e^{\lambda_i t} V_i$$

## 🎨 Simulateur Interactif : Le Champ de Directions

Le champ de directions de l'équation différentielle montre graphiquement la pente tangente en chaque coordonnée. En déplaçant la condition initiale, tu traces la courbe intégrale unique de Cauchy.

![Champ de Directions](./assets/champ_directions.svg)

### Méthodes pas-à-pas

**Comment résoudre $y' + ay = b(x)$ ?**
1. Résoudre l'équation homogène $y' + ay = 0 \implies y_H = C e^{-ax}$.
2. Chercher une solution particulière $y_P$. Si $b(x)$ est un polynôme, chercher $y_P$ sous forme de polynôme de même degré.
3. Sommer les deux : $y = y_H + y_P$.
4. Utiliser la condition initiale (ex: $y(0)=y_0$) pour trouver la valeur de $C$.

---

## 💡 Le savais-tu ?

Les équations différentielles règnent en maîtres absolus sur l'univers de la physique quantique et des supercalculateurs ! Pour prédire la météo avec 3 jours d'avance, les ordinateurs géants de Météo-France ne "divinent" pas l'avenir : ils résolvent purement et numériquement de terribles équations différentielles non linéaires appelées **Navier-Stokes**. 
Celles-ci décrivent le déplacement turbulent de l'air et des fluides. Elles sont si infernalement complexes que le premier Mathématicien qui trouvera une formule exacte pour les résoudre gagnera littéralement 1 million de dollars (c'est l'un des 7 "Prix du millénaire" de l'Institut Clay) !

---

## Exercices

**🟢 Exercice A (Les Bases de l'Ordre 1)**
1. **Désintégration basique** : Résous rapidement la fondamentale éq. radieuse : $y' - 3y = 0$.
2. **Le Pendule de la Mort** : Débusque la solution générale du ressort simple harmonique du Second Ordre : $y'' + y = 0$.
3. **Le Problème de Cauchy** : Résous spécifiquement $y' + y = 1$ en sachant la condition initale imposée : $y(0) = 0$.

**🔵 Exercice B (Techniques Industrielles L2)**
4. **La Formule du Second Ordre** : Abats le démon $y'' - 3y' + 2y = 0$. *(Axe d'attaque : l'équation caractéristique via le Polynôme)*.
5. **Variation de la Constante** : Résous l'équation avec un redoutable Second Membre : $y' + y = e^x$. (Utilise la méthode de Lagrange : Trouve Yh puis la fameuse constante muable $C(x)$).
6. **Le Système Matriciel** : Résous le système couplé : $x' = x + y$ et $y' = x - y$.

**🟠 Exercice C (Le Modèle Prédateur-Proie Ouvert)**
7. **La Logistique de Verhulst** : Étudie avec respect la mystique équation asymétrique $y' = y(1 - y)$. C'est le modèle absolu de croissance de population (des bactéries de laboratoire ou de lapins sauvages) lorsque la nourriture n'est plus infinie. Prends ton courage à deux mains, et pose le changement de variable $z = 1/y$. À toi de jouer !

---

## Exercices corrigés

**Exercice 1 :**
$y' = 3y \implies \mathbf{y(x) = C e^{3x}}$.

**Exercice 2 :**
Équation caractéristique $r^2 + 1 = 0 \implies r = \pm i$.
$\mathbf{y(x) = C_1 \cos x + C_2 \sin x}$.

**Exercice 3 :**
$y_H = C e^{-x}$. Solution particulière évidente $y_P = 1$.
$y(x) = C e^{-x} + 1$.
$y(0) = 0 \implies C + 1 = 0 \implies C = -1$.
$\mathbf{y(x) = 1 - e^{-x}}$.

**Exercice 4 :**
$r^2 - 3r + 2 = 0 \implies (r-1)(r-2) = 0$.
$\mathbf{y(x) = C_1 e^x + C_2 e^{2x}}$.

**Exercice 5 :**
$y_H = C e^{-x}$. On cherche $y_P = C(x) e^{-x}$.
$C'(x) e^{-x} = e^x \implies C'(x) = e^{2x} \implies C(x) = \frac{1}{2} e^{2x}$.
$y_P = \frac{1}{2} e^{2x} e^{-x} = \frac{1}{2} e^x$.
$\mathbf{y(x) = C e^{-x} + \frac{1}{2} e^x}$.

**Exercice 6 :**
Matrice $A = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$. Valeurs propres $\pm \sqrt{2}$.
$\mathbf{X(t) = C_1 e^{\sqrt{2}t} V_1 + C_2 e^{-\sqrt{2}t} V_2}$.

**Exercice 7 :**
En posant $z = 1/y$, on obtient $z' + z = 1$. La solution est $z(t) = 1 + C e^{-t}$.
D'où $\mathbf{y(t) = \frac{1}{1 + C e^{-t}}}$. C'est la fonction logistique.

---

## Synthèse

- **1er ordre** : $y_H + y_P$.
- **2nd ordre** : Dépend du signe de $\Delta$ de l'équation caractéristique.
- **Cauchy** : Équation + Condition initiale = Solution unique.

---




---

## Pour aller plus loin

**Les systèmes chaotiques**
Certaines équations différentielles, même simples en apparence, peuvent mener au chaos. C'est le cas de l'attracteur de Lorenz. Dans ces systèmes, une minuscule variation des conditions initiales (l'effet papillon) change totalement le résultat à long terme. C'est pour cela qu'il est impossible de prévoir la météo avec précision au-delà de quelques jours, quelle que soit la puissance des ordinateurs.

---

## Foire Aux Questions (FAQ) Spécialisée

<details>
  <summary>Pourquoi diable appeler ce type d'équation "Linéaire" ? Il y a des variables partout !</summary>

  L'appellation "linéaire" n'a strictement aucun rapport avec une "ligne droite de lycéen" $f(x)=ax+b$. L'équation est jugée linéaire car l'opérateur inconnu (la fonction $y$ et ses dérivées $y', y''$) n'est JAMAIS mélangé à la puissance carré (pas de $y^2$, pas de $y \cdot y'$). Si $y_1$ et $y_2$ sont des solutions trouvées, alors la combinaison additionnée des deux $\alpha y_1 + \beta y_2$ EST un super-soldat qui vérifie TOUJOURS l'équation homogène mère. C'est l'Antique "Principe de Superposition".
</details>

<details>
  <summary>Je n'ai pas compris "Condition Initiale" de Cauchy. D'où sort le "C" à la fin de la solution Mère ?</summary>

  C'est crucial. L'équation Différentielle en elle-même est "Dieu" : Elle t'impose la "Règle de Croissance" Globale, par exemple: ($y'=y$, tu grandis selon ta taille). Mais on n'a alors qu'une <b>Famille Totale Incomplète</b> de lueurs d'étoiles : $y(t) = C e^t$. Car l'univers ne peut pas deviner d'où tu es parti ! <br>C'est précisément là qu'intervient la "Condition Initiale de Cauchy" : Si le scientifique affirme qu'à l'instant du Choc (t=0) on avait $5$ mètres de hauteur ($y(0)=5$), cela fige brutalement la constante C, et on détient alors <b>LA solution Finale et Unique</b> du Monde réel.
</details>

<details>
  <summary>Qu'est-ce que garantit exactement le fameux Théorème de Cauchy-Lipschitz ?</summary>

  Le théorème de Cauchy-Lipschitz est la clé de voûte de l'analyse : il garantit que pour une équation différentielle du premier ordre $y' = f(x, y)$ où la fonction $f$ est suffisamment régulière (on dit localement lipschitzienne par rapport à sa deuxième variable), il existe **une unique solution maximale** passant par une condition initiale choisie $(x_0, y_0)$. En termes géométriques, cela signifie que deux courbes de solutions intégrales distinctes ne peuvent jamais se croiser ou se toucher !
</details>

<details>
  <summary>Quelle est la différence fondamentale entre la méthode d'Euler et la méthode moderne de Runge-Kutta 4 (RK4) ?</summary>

  Elle réside dans la précision et la courbure :
  1. **La méthode d'Euler** est de premier ordre : elle suppose que la trajectoire est une ligne droite parfaite sur un intervalle $h$ (`y_{new} = y_{old} + h * f(x, y)`). Elle dévie très vite de la solution réelle si l'intervalle est grand.
  2. **La méthode RK4** est de quatrième ordre : au lieu de regarder uniquement la pente au point de départ, elle prélève quatre échantillons de pentes stratégiques (au départ, au milieu et à la fin de l'intervalle présumé) et en fait une moyenne pondérée. Sa précision est infiniment supérieure, permettant de modéliser des courbes fluides et fidèles sans décalage cumulatif majeur.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Le professeur ordonne la matrice mentale brute de la forme homogène $y' = ay$. Intuitivement, on cherche...**
- [ ] Un polynôme mortel de la force ax+b.
- [x] L'inébranlable Exponentielle $C \cdot e^{at}$.
- [ ] Un Cosinus, la vague océanique.
> **Explication :** Seule l'Exponentielle dispose du super pouvoir absolu de survivre à l'assassinat temporel (la Dérivation infinie). Quand on cherche quelqu'un qui, une fois dérivé $y'$, donne exactement un fragment $a$ de MÊME (Lui-même), on appelle l'Exponentielle de matrice $Base$.

**Question 2 : Le terrifiant "Portrait de Phase" (ou Espace de Phase) pour un système... qu'est-ce au juste ?**
- [ ] Un simple graphe fonctionnel de y au fil du Temps $t$.
- [x] Le tracé fantôme de plusieurs trajectoires combinées dans le plan d'État complet (x,y), avec le Temps absent.
> **Explication :** Dans l'espace des phases, le temps explose et est ignoré ! On analyse purement des "Trajectoires", ou des champs de Rivière et courants (comme le magnétisme) sur $x$ et $y$. C'est très prisé en balistique et météorologie quantique.

**Question 3 : Lors de ton calcul Matriciel, les 2 Valeurs Propres de la Bête (Le Système Lineaire Plan) sont strictement Réelles et Négatives !**
- [ ] Le feu aux poudres. Un Col, tout est instable.
- [x] Le soulagement. Un Nœud Attractif, la matière s'effondrera au calme au repère 0 !
> **Explication :** Formellement, la physique nous apprend que si le $\lambda_1 <0$ et le $\lambda_2 <0$, les Exponentielles résultantes (Lames maîtresses de notre système dimensionnel) finissent nécessairement par CRASHER majestueusement vers le point d'équilibre Stable avec le flot exponentiel qui s'évapore et meurt paisiblement avec le temps !

---


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.

*(Fin des Mathématiques Différentielles Supérieures)*