---
title: "Écoles d'Ingénieurs : Analyse de Fourier et Traitement du Signal"
level: Post_Bac
subLevel: Prep_Ingenieur
order: 27
---
# Écoles d'Ingénieurs : Analyse de Fourier et Traitement du Signal

**Niveau** : Écoles d'Ingénieurs (Prépas intégrées, Génie Électrique, Télécoms, Mécanique vibratoire)  
**Prérequis** : Intégration par parties, nombres complexes (formule d'Euler), trigonométrie.  
**Objectifs** :
- Décomposer analytiquement un signal périodique en séries trigonométriques de Fourier.
- Tracer et interpréter les spectres d'amplitude discrets d'un signal physique.
- Appliquer l'égalité de Parseval pour évaluer la puissance énergétique globale d'un système de filtres.

---

## Activités de découverte

### Activité : Le timbre d'un violon et d'un diapason
Un ingénieur acousticien enregistre deux sources sonores qui jouent exactement la même note de musique, le *La* à $f_0 = 440\text{ Hz}$ :
- La première source provient d'un **diapason de laboratoire** : son onde de pression d'air s'affiche à l'oscilloscope comme une sinusoïde parfaitement fluide et pure $s(t) = A \sin(2\pi f_0 t)$.
- La seconde source provient d'un **violon de concert** : l'onde s'affiche comme un signal périodique complexe, en forme de dents de scie asymétriques irrégulières.

Pourtant, l'oreille humaine reconnaît sans faille la même note, mais perçoit deux instruments différents. Le violon possède un **timbre** plus riche.
1. Pourquoi le signal du violon est-il périodique de même période $T = \frac{1}{440}\text{ s}$ sans être une simple sinusoïde ?
2. Pouvons-nous concevoir que l'onde complexe du violon est la somme d'une infinité d'ondes pures et fluides superposées, dont les fréquences sont des multiples entiers ($440, 880, 1320, 1760\text{ Hz}$), appelées les **harmoniques** ?
3. Comment décomposer mathématiquement un signal périodique non-sinusoïdal pour isoler individuellement la puissance de chacun de ses harmoniques ?

C'est tout l'apport de la théorie géométrisée de Joseph Fourier : transformer un problème temporel sinueux en une représentation **fréquentielle** d'amplitude stable.

---

## Fondements Théoriques

### 1. Décomposition en Séries de Fourier (Formulations Réelle et Complexe)
Soit $f(t)$ un signal continu par morceaux sur $\mathbb{R}$, périodique de période $T > 0$ (de pulsation fondamentale $\omega = \frac{2\pi}{T}$).

#### A. Forme Trigonométrique Réelle :
Le signal se décompose en une composante continue (valeur moyenne) et une somme de sinus et cosinus :
$$s(t) = a_0 + \sum_{n=1}^{+\infty} \left( a_n \cos(n\omega t) + b_n \sin(n\omega t) \right)$$

Les coefficients spectraux se déterminent à l'aide des projections intégrales de Fourier :
- **Valeur moyenne ($a_0$)** :
  $$a_0 = \frac{1}{T} \int_0^{T} s(t) \, \mathrm{d}t$$
- **Composantes cosinus ($a_n$)** :
  $$a_n = \frac{2}{T} \int_0^{T} s(t) \cos(n\omega t) \, \mathrm{d}t$$
- **Composantes sinus ($b_n$)** :
  $$b_n = \frac{2}{T} \int_0^{T} s(t) \sin(n\omega t) \, \mathrm{d}t$$

#### B. Forme Expantielle Complexe (la plus prisée des Ingénieurs) :
Pour des calculs simplifiés d'impédance de filtres, la trigonométrie s'efface devant les exponentielles complexes d'Euler :
$$s(t) = \sum_{n=-\infty}^{+\infty} c_n e^{i n \omega t} \quad \text{avec} \quad c_n = \frac{1}{T} \int_0^{T} s(t) e^{-i n \omega t} \, \mathrm{d}t$$

---

## 🎨 Simulateur de Reconstruction de Fourier

Ce simulateur d'ingénierie illustre la dualité physique fondamentale de Fourier. À l'aide de l'oscilloscope ci-dessous, tu peux observer comment la sommation harmonique s'ajuste pour recréer différents types d'ondes périodiques (créneau, dents de scie, triangle) et analyser le spectre d'amplitude associé aux différentes harmoniques en temps réel :

![Analyse de Fourier et Signal](./assets/fourier_reconstruction.svg)

### 2. Le puissant théorème de Dirichlet et de Parseval

#### Théorème de Dirichlet (Convergence physique locale) :
Si $s(t)$ satisfait les conditions régulières de Dirichlet (signal borné ayant sur une période un nombre fini d'extrema et de discontinuités), alors la série de Fourier vers laquelle le signal converge s'évalue ainsi :
- En tout point de continuité $t$, la somme converge exactement vers $s(t)$.
- En tout point de discontinuité de saut $t_0$, la somme s'équilibre parfaitement au centre de la demi-valeur supérieure et inférieure :
  $$\lim_{N \to +\infty} S_N(t_0) = \frac{s(t_0^+) + s(t_0^-)}{2}$$

#### Égalité de Parseval (Conservation universelle de l'Énergie) :
Pour un ingénieur, c’est le théorème le plus fondamental : la puissance totale d'un signal électrique (calculée dans le domaine temporel) équivaut scrupuleusement à la somme des puissances individuelles consommées par chacun de ses harmoniques de sinus (dans le domaine fréquentiel) :

$$\text{Puissance Moyenne} = \frac{1}{T} \int_0^T |s(t)|^2 \, \mathrm{d}t = \sum_{n=-\infty}^{+\infty} |c_n|^2 = a_0^2 + \sum_{n=1}^{+\infty} \frac{a_n^2 + b_n^2}{2}$$

---

## Exercices Résolus

### Exercice 1 : Étude spectrale complète d'un signal créneau (Onde Carrée)
Soit $s(t)$ un signal périodique de période $T = 2\pi$ (pulsation $\omega = 1$). Sur une période, il s'exprime par :
$$s(t) = \begin{cases} +1 \quad \text{si } t \in ]0, \pi[ \\ -1 \quad \text{si } t \in ]\pi, 2\pi[ \end{cases}$$

1. Déterminez la parité du signal pour simplifier la recherche spectrale.
2. Déterminez les coefficients $a_0, a_n$ et $b_n$.
3. Déduire l'écriture complète sous forme de série de Fourier trigonométrique.

**Correction Étape par Étape :**
1. **Étape 1 : Analyse géométrique de parité**  
   Pour simplifier les calculs de Fourier, étudions la symétrie. Le signal créneau présente une symétrie par rapport à l'origine ($s(-t) = -s(t)$). C'est une fonction **impaire**.  
   *Conséquence majeure* : Tout filtre ou composante de type cosinus possède une intégrale nulle d'office.  
   On en tire de manière immédiate :
   $$a_0 = 0 \quad \text{et} \quad a_n = 0 \quad \text{pour tout } n \geq 1$$
   Nous n'avons qu'à évaluer uniquement les coefficients sinusoïdaux $b_n$.

2. **Étape 2 : Évaluation des coefficients sinus ($b_n$)**  
   Puisque l'intégrande est symétrique, nous pouvons réduire l'intervalle à la demi-période $[0, \pi]$ :
   $$b_n = \frac{2}{\pi} \int_0^{\pi} (1) \sin(n t) \, \mathrm{d}t = \frac{2}{\pi} \left[ \frac{-\cos(n t)}{n} \right]_0^{\pi} = \frac{2}{n\pi} \left( 1 - \cos(n\pi) \right)$$
   Or, la valeur de $\cos(n\pi) = (-1)^n$ dépend de la parité de l'indice :
   - Si $n$ est pair ($n = 2k$), $\cos(n\pi) = 1 \implies b_n = \frac{2}{2k\pi}(1 - 1) = \mathbf{0}$.
   - Si $n$ est impair ($n = 2k+1$), $\cos(n\pi) = -1 \implies b_n = \frac{2}{(2k+1)\pi}(1 - (-1)) = \mathbf{\frac{4}{(2k+1)\pi}}$.

3. **Étape 3 : Écriture de la série synthétisée**  
   La série trigonométrique complète s'écrit donc en omettant les indices pairs de fréquences :
   $$s(t) = \frac{4}{\pi} \left( \sin(t) + \frac{\sin(3t)}{3} + \frac{\sin(5t)}{5} + \dots \right) = \frac{4}{\pi} \sum_{k=0}^{+\infty} \frac{\sin((2k+1)t)}{2k+1}$$

### Exercice 2 : Résolution analytique de série à l'aide de Parseval
Exploiter le signal d'onde carrée de l'Exercice 1 et le théorème de Parseval pour calculer la somme de la série infinie suivante :
$$S = \sum_{k=0}^{+\infty} \frac{1}{(2k+1)^2} = 1 + \frac{1}{9} + \frac{1}{25} + \frac{1}{49} + \dots$$

**Correction Étape par Étape :**
1. **Étape 1 : Calcul de l'énergie temporelle globale (Inertie quadratique moyenne)**  
   Calculons l'énergie temporelle du signal $s(t)$, en notant que $|s(t)|^2 = 1$ en permanence sur tout intervalle (car $(\pm 1)^2 = 1$) :
   $$\text{Puissance Temporelle} = \frac{1}{T} \int_0^T |s(t)|^2 \, \mathrm{d}t = \frac{1}{2\pi} \int_0^{2\pi} 1 \, \mathrm{d}t = 1$$

2. **Étape 2 : Évaluation fréquentielle avec Parseval**  
   Les coefficients de Parseval pour notre signal impair de valeur moyenne nulle s'écrivent :
   $$\text{Puissance Fréquentielle} = \sum_{n=1}^{+\infty} \frac{a_n^2 + b_n^2}{2} = \sum_{n=1}^{+\infty} \frac{b_n^2}{2}$$
   Puisque seuls subsistent les coefficients d'indices impairs $n = 2k+1$ de valeur $b_{2k+1} = \frac{4}{(2k+1)\pi}$, injectons cette formule :
   $$\text{Puissance Fréquentielle} = \sum_{k=0}^{+\infty} \frac{1}{2} \left( \frac{4}{(2k+1)\pi} \right)^2 = \sum_{k=0}^{+\infty} \frac{1}{2} \cdot \frac{16}{(2k+1)^2 \pi^2} = \frac{8}{\pi^2} \sum_{k=0}^{+\infty} \frac{1}{(2k+1)^2}$$

3. **Étape 3 : Isolement et résultat de convergence de la série**  
   En vertu de l'égalité de Parseval, nous égalisons les deux domaines de mesures temporelle et fréquentielle :
   $$1 = \frac{8}{\pi^2} \sum_{k=0}^{+\infty} \frac{1}{(2k+1)^2} \iff \sum_{k=0}^{+\infty} \frac{1}{(2k+1)^2} = \mathbf{\frac{\pi^2}{8}}$$
   Ce résultat classique s'obtient de façon instantanée et rigoureuse grâce à l'analyse harmonique de Fourier d'un signal électrique classique !

---

## FAQ Étudiante

<details>
  <summary>Qu’est-ce que le fameux phénomène de Gibbs que l'on observe sur l'oscilloscope ?</summary>

  C’est un comportement surprenant lors de la sommation d’un signal discontinu (par exemple un créneau ou un signal triangulaire brusque). Même si l'on somme des millions d'harmoniques de Fourier, il subsiste toujours un dépassement d'oscillation, un rebondissement incontrôlable d'environ **9%** aux abords du saut de discontinuité. La série de Fourier s’ajuste lentement, modélisant ces "oreilles" de surtension typiques.
</details>

<details>
  <summary>De façon intuitive, quelle est la nuance clé entre Séries de Fourier et Transformée de Fourier ?</summary>

  - Les **Séries de Fourier** analysent exclusivement des signaux physiques **périodiques** (qui se répètent à l'infini). Le spectre découlant s'affiche comme des raies à fréquences discrètes espacées.  
  - La **Transformée de Fourier** (ou spectre continu) généralise ce principe aux signaux **apériodiques** (une impulsion unique, un flash de lumière). Le spectre n’est plus discret mais s'affiche sous forme d’un domaine fréquentiel continu fluide.
</details>

<details>
  <summary>Comment les Télécoms utilisent-ils Fourier pour transmettre des millions de conversations sur un même canal ?</summary>

  C’est la magie du **multiplexage fréquentiel** (FDM / OFDM) ! En attribuant à chaque utilisateur une porteuse à frequence harmonique $f_n$ de Fourier différente, et grâce à l'orthogonalité rigoureuse du produit scalaire des ondes de sinus, le récepteur à l'autre bout de la terre peut filtrer analytiquement (en effectuant une intégrale de produit) l'unique conversation de l'utilisateur sans aucune interférence des voisins.
</details>

<details>
  <summary>Quelles conditions exactes (théorème de Dirichlet) garantissent la convergence d'une Série de Fourier ?</summary>

  Pour qu'un signal périodique $s(t)$ converge proprement de manière simple ou uniforme vers sa décomposition de Fourier, il doit respecter les **conditions de Dirichlet** sur une période :
  1. Le signal doit être absolument intégrable sur une période (c'est-à-dire $\int_0^T |s(t)| dt < +\infty$).
  2. Le signal doit avoir un nombre fini d'extrema locaux (pics et creux) sur une période.
  3. Le signal doit avoir un nombre fini de discontinuités de première espèce (c'est-à-dire des sauts d'amplitude finis).
  
  Si ces conditions physiques standard sont réunies, la série converge en tout point de continuité vers $s(t)$, et vers la demi-somme des limites à gauche et à droite aux points de discontinuité.
</details>

<details>
  <summary>Pourquoi les ingénieurs préfèrent-ils le spectre exponentiel complexe c_n au spectre réel a_n / b_n ?</summary>

  C'est un choix d'élégance analytique et de facilité de calcul ! 
  - Au lieu de manipuler séparément des cosinus ($a_n$) et des sinus ($b_n$), le coefficient exponentiel complexe $c_n$ rassemble les deux informations sous un unique nombre complexe. 
  - L'amplitude du signal est codée par le module $|c_n|$, tandis que son déphasage (angle d'alignement temporel) est codé instantanément par l'argument $\arg(c_n)$ du coefficient. De plus, traiter la multiplication par des fonctions de transfert $H(i\omega)$ de filtres électriques complexes se résume à un simple produit $c'_n = H(i n \omega) c_n$, ce qui évite de lourdes formules trigonométriques complexes !
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si un signal d'alimentation d'électronique s(t) est asymétrique mais rigoureusement pair, que pouvons-nous déduire sur ses harmoniques ?**
- [ ] Tout son spectre est nul car il s'effondre
- [ ] Il ne contient aucun harmonique de type cosinus
- [x] Tous les coefficients sinus b_n sont d'office nuls par annulation d'intégration
> **Explication :** L'intégration du produit d'une fonction paire (le signal) et d'une fonction impaire (le sinus) sur un domaine symétrique s'annule obligatoirement. Seules les ondes de cosinus (paires) peuvent composer ce signal.

**Question 2 : La valeur moyenne d'un signal alternatif triangulaire oscillant symétriquement entre -5 Volt et +5 Volt équivaut à :**
- [ ] a_0 = 5 Volt
- [x] a_0 = 0 Volt
- [ ] a_0 = -5 Volt
> **Explication :** La valeur moyenne $a_0$ correspond géométriquement à la hauteur moyenne du signal. Les aires positives au-dessus de l'axe et négatives s'annulant mutuellement sur une période, le signal de tension alternative possède une composante continue rigoureusement nulle ($a_0 = 0$).

**Question 3 : L'égalité de Parseval modélise mathématiquement :**
- [ ] La perte de données lors d'une compression MP3
- [ ] Le déphasage angulaire des ondes lumineuses
- [x] La conservation globale et imperturbable de l'énergie physique entre le domaine temporel et fréquentiel
> **Explication :** Parseval démontre l'isométrie de l'espace de Hilbert : intégrer le carré de la puissance du signal temporel fournit la même information énergétique cumulée que sommer l'amplitude quadratique pondérée de chacun de ses harmoniques spectraux.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Décomposer mathématiquement un signal périodique pair, impair ou quelconque en séries trigonométriques réelles ou complexes.
- [ ] Interpréter physiquement le spectre à raies découlant de la transformée de Fourier.
- [ ] Résoudre des séries mathématiques infinies complexes à l'aide de l'égalité de Parseval.
- [ ] Anticiper les conséquences du phénomène de Gibbs aux discontinuités d'un signal physique filtré.
