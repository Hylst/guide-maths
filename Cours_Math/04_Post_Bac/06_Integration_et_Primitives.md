---
title: 'Chapitre 6 : Intégration et Primitives'
level: Post_Bac
subLevel: Analyse_L1
order: 6
---
# Chapitre 6 : Intégration et Primitives

**Niveau** : Post-Bac (Licence 1, CPGE 1ère année)  
**Prérequis** : Dérivation, limites, fonctions usuelles.  
**Objectifs** : 
- Maîtriser l'intégrale de Riemann sur un segment.
- Connaître et utiliser le Théorème Fondamental du Calcul Différentiel et Intégral.
- Maîtriser les techniques de calcul d'intégrales (intégration par parties, changements de variables).
- Maîtriser le calcul de primitives de fonctions rationnelles.

---

## 🎯 Mise en situation et Cas d'usage

**Calcul des surfaces et moyennes**
L'intégration est l'outil mathématique par excellence pour accumuler des grandeurs continues. Que tu sois physicien à la recherche du travail total fait par une force variable $W = \int_{x_1}^{x_2} F(x) dx$, statisticien cherchant l'espérance d'une loi continue, ou architecte tentant de calculer le volume d'une forme complexe, l'intégration est la clé !

---

## 💡 Rappels Essentiels

Primitive : On dit que $F$ est une primitive de $f$ sur un intervalle $I$ si, pour tout $x \in I, F'(x) = f(x)$. 
Deux primitives d'une même fonction sur un intervalle diffèrent toujours d'une constante.

Exemples classiques :
- $\int x^n dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)$
- $\int \frac{1}{x} dx = \ln|x| + C$
- $\int e^x dx = e^x + C$

---

## 📖 Explications et Théorie

### 1. L'intégrale de Riemann (L'approche géométrique)
L'idée de Riemann est de calculer l'aire sous une courbe en la découpant en petits rectangles.
- Soit $f$ une fonction continue (ou continue par morceaux) sur un segment $[a,b]$. On subdivise $[a,b]$ en rectangles. On borne l'aire par des rectangles inscrits (Sommes de Darboux inférieures) et circonscrits (Sommes supérieures).
- Si, en rendant les subdivisions de plus en plus fines, ces deux sommes convergent vers une même limite, $f$ est dite **Riemann-intégrable**.

## 🎨 Simulateur de Sommes de Riemann

Observe la dynamique de l'approximation de l'aire sous la courbe ci-dessous. Tu peux sélectionner différentes fonctions préréglées, changer le nombre de subdivisions et faire varier la technique d'approximation (par la gauche, la droite, le point milieu ou les trapèzes) :

![Sommes de Riemann](./assets/riemann_sums.svg)

### 2. Théorème Fondamental de l'Analyse
Soit $f$ continue sur $[a,b]$. La fonction $F$ définie sur $[a,b]$ par $F(x) = \int_a^x f(t) dt$ est l'unique primitive de $f$ qui s'annule en $a$. 
Corollaire pratique : $\int_a^b f(x)dx = F(b) - F(a) = [F(x)]_a^b$.

### 3. Intégration par parties (IPP)
Très utile quand tu veux intégrer le produit de deux fonctions (comme $x \cdot e^x$ ou $\ln(x)$).
La formule de dérivée $(uv)' = u'v + uv'$ donne en intégrant :
$$\int_a^b u'(x)v(x) dx = [u(x)v(x)]_a^b - \int_a^b u(x)v'(x) dx$$

### 4. Changement de variable
L'analogue de la dérivation des fonctions composées (Règle de composition).
En posant $x = \varphi(t)$, le volume infinitésimal $dx$ devient $\varphi'(t)dt$. 
La formule s'écrit :
$$\int_{\varphi(a)}^{\varphi(b)} f(x) dx = \int_a^b f(\varphi(t)) \varphi'(t) dt$$

---

## 🛠️ Exemples

**Intégration par parties:** Calcul de $\int_1^e \ln(x) dx$
Ici, posons :
- $u'(x) = 1 \Rightarrow u(x) = x$
- $v(x) = \ln(x) \Rightarrow v'(x) = 1/x$
$$\int_1^e 1 \cdot \ln(x) dx = [x \ln(x)]_1^e - \int_1^e x \cdot \frac{1}{x} dx$$
$$ = (e \ln(e) - 1\ln(1)) - \int_1^e 1 dx = e - [x]_1^e = e - (e-1) = 1$$

---

## 🧠 Le Saviez-Vous ?

L'intégration mathématique a longtemps été complètement indépendante de la dérivation. Le grand Archimède (en 250 avant J.-C.) était déjà capable de calculer l'aire sous une parabole à l'aide d'une "méthode d'exhaustion" s'apparentant à l'intégration, des centaines d'années avant que Cauchy, Leibniz et Newton n'unissent les deux concepts avec leur fameux Théorème Fondamental, prouvant que "Dériver" et "Calculer l'aire" sont les parfaites actions miroirs l'une de l'autre !

---

## 📝 Exercices

**🟢 Exercice A (Les Primitives Essentielles)**
1. **L'Aire du Sinus** : Calcule l'intégrale définie $\int_0^{\pi} \sin(x) dx$.
2. **Identification Immédiate** : Trouve au flair une primitive pure de la fonction $f(x) = \frac{2x}{x^2+1}$. *(Astuce : Regarde le lien direct entre le haut et le bas de la fraction !)*.

**🔵 Exercice B (Outils d'Élite : IPP et Chgt de Variable)**
3. **L'Intégration par Parties (IPP)** : Calcule méticuleusement l'intégrale $\int_0^1 x e^x dx$. Choisis intelligemment qui tu dérives ($u'$) et qui tu intègres !
4. **Le Changement de Monde** : Effectue courageusement le changement de variable $t = \sin(x)$ pour détruire l'intégrale $\int_0^{\pi/2} \cos(x)\sin^2(x) dx$. N'oublie surtout pas de convertir les deux Bornes spatiales ET le fameux $dx$ en $dt$ !

---

## 📄 Exercices corrigés

**Exercice 1 :**
La primitive de $\sin(x)$ est $-\cos(x)$.
$\int_0^{\pi} \sin(x) dx = [-\cos(x)]_0^{\pi} = (-\cos(\pi)) - (-\cos(0)) = (-(-1)) - (-1) = 1 + 1 = 2$.

**Exercice 2 :**
On reconnaît la forme $\frac{u'(x)}{u(x)}$ avec $u(x) = x^2+1$. 
Une primitive est donc $\ln(|u(x)|) = \ln(x^2+1)$. (On peut enlever les barres car $x^2+1>0$).

**Exercice 3 :**
On pose $u'(x) = e^x \Rightarrow u(x) = e^x$ et $v(x) = x \Rightarrow v'(x) = 1$.
$\int_0^1 x e^x dx = [x e^x]_0^1 - \int_0^1 1 \cdot e^x dx = 1e^1 - 0 - [e^x]_0^1 = e - (e - e^0) = e - e + 1 = 1$.

**Exercice 4 :**
Posons $t = \sin(x)$, alors $dt = \cos(x)dx$.
Pour $x=0, t=0$. Pour $x=\pi/2, t=1$.
L'intégrale devient : $\int_0^1 t^2 dt = [\frac{t^3}{3}]_0^1 = \frac{1}{3}$.

---

## 📌 Synthèse

- **Théorème fondamental** : La dérivée de l'intégrale (accumulateur d'aire) te donne la fonction d'origine.
- **IPP** : Utiliser lorsque l'on a un produit de fonctions dont l'une est facile à dériver et l'autre à intégrer.
- **Changement de variable** : Transforme une intégrale complexe en en posant $x=f(u)$ et en pensant à transformer les bornes **et** le $dx$.

---

## 🙋 FAQ Intégrale

<details>
  <summary>Pourquoi rajoute-t-on toujours cet agaçant " + C " à la fin d'un calcul de Primitive ?</summary>

  Parce que la primitive s'occupe de retrouver "Le Chemin" à partir de sa Dérivée (sa pente). Or, si tu décales une courbe verticalement (genre +5 ou -100), sa "pente" ne change absolument pas ! Elle est juste plus haute ou plus basse. La dérivée a "perdu" cette information de hauteur initiale. En marquant "+ C", on annonce mathématiquement : "Voici la bonne courbe, mais je ne sais pas à quelle altitude elle a démarré à l'origine."
</details>

<details>
  <summary>Est-ce que TOUTES les fonctions, sans exception, ont vraiment une Primitive ?</summary>

  Le théorème affirme que "Toutes les fonctions <b>Continues</b> admettent une primitive". <br>Cependant, il y a un piège absolu : ce n'est pas parce que la Nature sait que cette primitive existe que le Cerveau Humain est capable de l'écrire joliment ! Par exemple, la célébrissime intégrale Gaussienne $e^{-x^2}$ a bien une "Aire", mais il est mathématiquement IMPOSSIBLE de l'écrire avec un assemblage de nos fonctions lycéennes usuelles de base (sin, cos, ln, fractions...). Elle crèe sa propre fonction d'élite indéchiffrable.
</details>

<details>
  <summary>Comment fonctionne l'intégration de Riemann pour des fonctions discontinues ou continues par morceaux ?</summary>

  L'intégrale de Riemann s'étend très bien aux fonctions discontinues tant que l'ensemble de leurs points de discontinuité est "suffisamment petit". Plus précisément, le théorème de Lebesgue-Vitali affirme qu'une fonction bornée sur un segment est Riemann-intégrable si et seulement si l'ensemble de ses points de discontinuité est de **mesure nulle** (comme un ensemble fini ou dénombrable de points isolés). Par exemple, une fonction en escalier avec un nombre fini de sauts est parfaitement intégrable au sens de Riemann !
</details>

<details>
  <summary>Quelle est la distinction formelle fondamentale entre l'intégrale historique de Riemann et celle de Lebesgue ?</summary>

  C'est une question de découpage orthogonal :
  1. **L'intégrale de Riemann** découpe l'axe des abscisses (axe $x$, le domaine de départ) en petits intervalles verticaux de largeur $dx$. C'est une méthode simple mais impuissante face aux fonctions très oscillantes comme la fonction de Dirichlet (qui vaut 1 sur les rationnels $\mathbb{Q}$ et 0 ailleurs).
  2. **L'intégrale de Lebesgue** découpe l'axe des ordonnées (axe $y$, le domaine d'arrivée) en fines tranches horizontales, puis regroupe les antécédents sous forme de "mesures". Elle permet d'intégrer des fonctions hautement pathologiques et jette les bases rigoureuses de la théorie moderne des probabilités et de l'analyse fonctionnelle (espaces $L^p$).
</details>

---

## 📝 Mini-Quiz

**Question 1 : Face à l'impatiente primitive de $e^{2x}$, que trouves-tu dans le parchemin final ?**
- [ ] $2 e^{2x} + C$
- [x] $\frac{1}{2} e^{2x} + C$
- [ ] $e^{2x+1} + C$
> **Explication :** Le piège des rois ! La Dérivée descend le chiffre "2" (multiplication). Donc, l'action opposée (la Primitive) est là pour annuler la montée : elle doit diviser, imposant "1/2" comme bouclier absorbeur.

**Question 2 : Le terrifiant sortilège mathématique nommé "Intégration Par Parties (IPP)" provient très exactement... :**
- [ ] Du théorème de limite de la Somme de Darboux !
- [x] De la stricte Dérivée du Produit $(uv)'$ inversée !
> **Explication :** C'est la dérivée inversée ! On prend la formule du cours de première $(u \cdot v)' = u'v + uv'$... on glisse l'équation des deux côtés, on injecte le symbole somme intégrale, et bim ! L'Intégration Par Parties surgit des abîmes.

**Question 3 : L'étudiant novice se lance dans le fatal "Changement de Variable" sur une Intégrale pure... À quoi doit-il être attentif sous peine d'échec total ?**
- [ ] Il doit juste permuter tous les blocs $x$ en bloc $t$ et continuer.
- [x] Il doit changer sa notation, dériver $dx$, MAIS AUSSI recalibrer de force les Bornes spatiales $[a,b]$ !
> **Explication :** C'est l'erreur la plus mortelle et la plus classique à l'université. Si tu changes la définition de l'espace ($x = \sin(t)$), ton ancienne borne chiffrée n'a plus aucun sens sur la nouvelle planète $t$. Il faut tout re-traduire !

---


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.

*(Fin des Outils des Primitives Continues)*