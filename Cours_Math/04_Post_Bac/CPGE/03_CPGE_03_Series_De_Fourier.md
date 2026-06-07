---
title: 'CPGE : Séries de Fourier et Analyse Harmonique'
level: Post_Bac
subLevel: CPGE
order: 3
---
# CPGE : Séries de Fourier et Analyse Harmonique

**Niveau** : Post-Bac (CPGE MP, PSI, PC, Double Licence Physique-Mathématiques L2-L3)  
**Prérequis** : Intégration de Riemann sur un segment, suites et séries de fonctions, espaces de Hilbert.  
**Objectifs** :
- Calculer le développement en série de Fourier de fonctions périodiques (coefficients réels $a_n, b_n$ et coefficients exponentiels complexes $c_n$).
- Appliquer le Théorème de Dirichlet pour analyser la convergence simple d'une série trigonométrique vers sa régularisation.
- Utiliser le Théorème de Parseval pour relier la géométrie hilbertienne de l'espace des fonctions de carré intégrable à la convergence de séries de Fourier, et calculer des sommes de séries numériques remarquables (par exemple, problème de Bâle).

---

## Activités de découverte

### Activité : Décomposer une alarme stridente en ondes harmoniques (La Musique des Équations)
Pourquoi l'oreille humaine perçoit-elle une différence nette entre une note de piano très douce et une sirène d'alarme électronique alors qu'elles jouent exactement la même fréquence de base (hauteur de son) ? 
Le son d'un diapason parfait est une **onde purement sinusoïdale** $y(t) = A \sin(\omega t)$. C’est le "degré zéro" du son. 

En revanche, le son d'une alarme électronique ou d'un synthétiseur produit une **onde carrée** ou en **dents de scie**. C'est une fonction périodique extrêmement "abrupte" et discontinue.

L'idée géniale de Joseph Fourier (1822) est de postuler que toute fonction périodique, aussi biscornue ou discontinue soit-elle, peut s'exprimer comme une superposition (somme infinie) d'ondes sinusoïdales pures de fréquences multiples de celle de base :
$$s(t) = a_0 + a_1 \cos(\omega t) + b_1 \sin(\omega t) + a_2 \cos(2\omega t) + b_2 \sin(2\omega t) + ...$$

En combinant une infinité de fréquences harmoniques pures (les coefficients $a_n$, $b_n$), on parvient à recréer parfaitement des angles pointus ou des discontinuities verticales ! cette décomposition correspond à l'**Analyse de Fourier**, la base du traitement de l'image (format JPEG), de compression de musique (MP3) ou d'analyse d'activité cérébrale par électroencéphalographie (EEG).

---

## Fondements Théoriques

### 1. Coefficients de Fourier d'une Fonction Périodique

Soit $f : \mathbb{R} \to \mathbb{C}$ une fonction continue par morceaux, et $T$-périodique (de période $T > 0$). On note $\omega = \frac{2\pi}{T}$ sa pulsation fondamentale.

#### Forme Réelle :
La série de Fourier de la fonction $f$ s'exprime sous la forme réelle matricielle :
$$S_N(f)(t) = a_0(f) + \sum_{n=1}^{N} \left( a_n(f) \cos(n\omega t) + b_n(f) \sin(n\omega t) \right)$$

Les coefficients réels de Fourier sont définis par :
$$a_0(f) = \frac{1}{T} \int_{0}^{T} f(t) \, \mathrm{d}t \quad \text{(valeur moyenne du signal)}$$
$$a_n(f) = \frac{2}{T} \int_{0}^{T} f(t) \cos(n\omega t) \, \mathrm{d}t \quad (n \ge 1)$$
$$b_n(f) = \frac{2}{T} \int_{0}^{T} f(t) \sin(n\omega t) \, \mathrm{d}t \quad (n \ge 1)$$

#### Forme Complexe Exponentielle :
Il est souvent beaucoup plus rapide d'utiliser la décomposition exponentielle complexe :
$$S_N(f)(t) = \sum_{n=-N}^{N} c_n(f) e^{in\omega t}$$
avec les coefficients complexes :
$$c_n(f) = \frac{1}{T} \int_{0}^{T} f(t) e^{-in\omega t} \, \mathrm{d}t \quad (n \in \mathbb{Z})$$

- **Passage réel-complexe** :  
  $$a_n = c_n + c_{-n} \quad \text{et} \quad b_n = i(c_n - c_{-n})$$

### 2. Convergence Simple et Théorème de Dirichlet

Le problème principal consiste à étudier la convergence de la suite de fonctions de la série de Fourier vers la fonction d'origine $f$.

#### Théorème de Dirichlet (Convergence Simple) :
Soit $f : \mathbb{R} \to \mathbb{C}$ une fonction $T$-périodique et régulière par morceaux (propriété de Cauchy de classe $C^1$ par morceaux).
En tout point $t \in \mathbb{R}$, la série de Fourier de $f$ converge simplement et la valeur de la somme est égale à la moyenne régularisée de la fonction :
$$\lim_{N \to +\infty} S_N(f)(t) = \frac{f(t^+) + f(t^-)}{2}$$
où $f(t^+)$ et $f(t^-)$ désignent respectivement les limites à droite et à gauche de $f$ en $t$.

- Si la fonction est continue en $t$, la série de Fourier converge précisément vers la valeur de la courbe $f(t)$.

### 3. Géométrie Hilbertienne et Théorème de Parseval

La théorie des Séries de Fourier prend tout son sens géométrique en interprétant l'ensemble des fonctions $T$-périodiques de carré intégrables sur une période comme un espace préhilbertien muni d'un produit scalaire intrinsèque.

#### Théorème de Parseval (Identité d’Énergie Spectrale) :
Soit $f$ une fonction $T$-périodique et continue par morceaux sur $[0, T]$. L'intégrale du carré de sa norme est égale à la somme des carrés de ses amplitudes spectrales :
$$\frac{1}{T} \int_{0}^{T} |f(t)|^2 \, \mathrm{d}t = |a_0(f)|^2 + \sum_{n=1}^{+\infty} \frac{|a_n(f)|^2 + |b_n(f)|^2}{2} = \sum_{n=-\infty}^{+\infty} |c_n(f)|^2$$

Ce théorème exprime qu'il y a stricte **conservation de l'énergie physique globale** lors du passage du domaine temporel d'origine au domaine fréquentiel spectral.

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Qu'est-ce que le phénomène de Gibbs qui survient près des discontinuités ?</summary>

  Le **phénomène de Gibbs** est un comportement oscillatoire parasite. Lorsqu'une fonction présente un saut brusque de discontinuité (comme une onde créneau), l'approximation par série de Fourier à l'ordre $N$ produit des dépassements et oscillations qui ne s'atténuent pas en amplitude quand $N$ augmente (l'overshoot reste d'environ 9% de l'amplitude du saut), mais se resserrent de plus en plus contre la discontinuité.
</details>

<details>
  <summary>Comment l'analyse de Fourier simplifie-t-elle la parité d'une fonction ?</summary>

  Si la fonction $f$ étudiée est **paire** ($f(-t) = f(t)$), tous les coefficients de sinus s'annulent : $b_n(f) = 0$. On parle alors de développement en série de cosinus.  
  Si la fonction est **impaire** ($f(-t) = -f(t)$), ce sont les cosinus qui s'annulent : $a_n(f) = 0$. Identifier la parité évite de nombreux calculs d'intégrales !
</details>

<details>
  <summary>Quel rapport y a-t-il entre la régularité d'une fonction et ses coefficients ?</summary>

  Plus une fonction est mathématiquement régulière (lisse, admettant de nombreuses dérivées), plus ses coefficients de Fourier décroissent rapidement vers zéro à l'infini (vitesse de décroissance en $O(1/n^k)$ où $k$ est la régularité de la fonction). À l'inverse, une fonction très "anguleuse" aura une décroissance très lente en $1/n$, ce qui requiert d'additionner un très grand nombre de termes harmoniques.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Soit une fonction de parité impaire $f$ développée en série de Fourier. Quels coefficients sont à évaluer pour cette fonction ?**
- [ ] Tous les coefficients $a_n$ et $b_n$ indistinctement
- [ ] Uniquement les coefficients $a_n$ (les coefficients de cosinus)
- [x] Uniquement les coefficients $b_n$ (les coefficients de sinus) car les cosinus s'annulent par symétrie impaire
- > **Explication :** Pour une fonction impaire $f$, l'intégrande servant au calcul de $a_n$ est $f(t) \cos(n\omega t)$. C'est le produit d'une fonction impaire par une fonction paire, donc l'intégrande est impaire. L'intégrale sur un domaine symétrique comme $[-T/2, T/2]$ est alors rigoureusement nulle. Ainsi, $a_n = 0$ et seuls les sinus ($b_n$) subsistent.

**Question 2 : Qu’annonce précisément la formule de convergence simple de Dirichlet en un point de discontinuité $t$ d’un échelon unitaire régulier ($f(t^-) = 0$ et $f(t^+) = 1$) ?**
- [ ] La valeur limite converge vers 0
- [ ] La valeur limite converge vers 1
- [x] La valeur converge vers la valeur moyenne régularisée de la marche, soit 0.5
- > **Explication :** En vertu du théorème de Dirichlet, au point de discontinuité, la série de Fourier converge vers la moyenne arithmétique des limites à gauche et à droite. Ici : $\frac{f(t^+) + f(t^-)}{2} = \frac{1 + 0}{2} = 0.5$.

**Question 3 : En appliquant l’égalité trigonométrique de Parseval sur une onde sinusoïdale pure unitaire de tension alternative $U(t) = A \cos(\omega t)$. Quelle valeur a l'énergie efficace quadratique moyenne de ce signal sur une période ?**
- [ ] $A^2$
- [x] $A^2 / 2$ car Parseval démontre que la valeur quadratique moyenne est la moitié du carré de l'amplitude
- [ ] $\sqrt{A}$
- > **Explication :** Le seul coefficient non nul de Fourier de ce signal est $a_1 = A$. L'identité de Parseval s'écrit : $\frac{1}{T} \int_0^T |U(t)|^2 \mathrm{d}t = \frac{a_1^2}{2} = \frac{A^2}{2}$. C’est bien l’expression physique de la puissance efficace d'un courant purement alternatif sinusoïdal de tension.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Analyser la parité d'un signal périodique et formuler l'expression simplifiée de son développement spectral.
- [ ] Intégrer par parties des fonctions trigonométriques complexes pour calculer le coefficient $c_n$ ou $b_n$.
- [ ] Appliquer Dirichlet pour évaluer la convergence de Fourier dans les cas continus ou discontinus.
- [ ] Déduire la somme de séries numériques de Riemann complexes en appliquant l'isométrie de Parseval sur un signal périodique adapté (comme le problème de Bâle $\sum 1/n^2$).
