---
title: 'BTS CIEL : Outils Mathématiques du Traitement du Signal'
level: Post_Bac
subLevel: BTS
order: 3
---
# BTS CIEL : Outils Mathématiques du Traitement du Signal

**Niveau** : Post-Bac (BTS Systèmes Numériques / Cybersécurité, Informatique & Électronique - CIEL, BTS Électrotechnique, Licence Sciences pour l'Ingénieur L1-L2)  
**Prérequis** : Éléments de trigonométrie, calcul vectoriel, intégration simple de fonctions polynomiales et sinusoïdales.  
**Objectifs** :
- Caractériser un signal analogique périodique en calculant de façon analytique sa valeur moyenne et sa valeur efficace (RMS).
- Modéliser une tension sinusoïdale alternative à l'aide de sa représentation complexe complexe (notion de **phaseur**).
- Analyser un spectre en fréquences simple en identifiant la fréquence fondamentale et ses composantes harmoniques.

---

## Activités de découverte

### Activité : Lire la structure de l'électricité sur un oscilloscope
Tous les appareils informatiques de votre maison (ordinateurs, routeur Wi-Fi, chargeur de téléphone) sont branchés sur une prise murale standard de courant alternatif fournissant une tension dite de "230 Volts". 
Si vous branchez un adaptateur d'oscilloscope sur cette prise secteur, vous verrez s'afficher à l'écran un signal fluide sinusoïdal oscillant régulièrement à la fréquence de $50 \text{ Hz}$ :
$$v(t) = A \sin(2\pi f \cdot t)$$

Mais d'où vient ce chiffre de "230V" ?
Si vous observez la courbe de tension alternative à l'écran, vous constaterez qu’elle culmine en fait à une valeur d'amplitude maximale d'environ $+325 \text{ Volts}$ et descend à $-325 \text{ Volts}$ !

La valeur de $230 \text{ V}$ correspond en réalité à la **valeur efficace (RMS pour Root Mean Square)** du signal. C’est la tension continue équivalente qui dissiperait exactement la même quantité de puissance thermique (par effet Joule) dans vos appareils.

Le **traitement du signal** est la science informatique et matérielle de l'ingénieur qui exploite les outils mathématiques théoriques pour coder, filtrer et transporter les signaux physiques. Elle est à l'œuvre dans la télécommunication 5G, la synthèse vocale par ordinateur ou la numérisation des instruments de musique.

---

## Fondements Théoriques

### 1. Valeur Moyenne et Valeur Efficace (RMS)

Soit $s(t)$ un signal analogique périodique de période $T > 0$.

#### Valeur Moyenne :
La **valeur moyenne** d'un signal sur une période $T$ (mesurant la composante continue ou le décalage DC du signal) est donnée par l'intégrale temporelle :
$$S_{\text{moy}} = \langle s \rangle = \frac{1}{T} \int_{0}^{T} s(t) \, \mathrm{d}t$$

#### Valeur Efficace (Root Mean Square) :
La **valeur efficace** $S_{\text{eff}}$ (ou $S_{\text{RMS}}$) caractérise l'énergie transportée par le signal alternatif. Elle est définie comme la racine carrée de la moyenne du signal élevé au carré :
$$S_{\text{eff}} = \sqrt{\frac{1}{T} \int_{0}^{T} |s(t)|^2 \, \mathrm{d}t}$$

- **Relation pour un signal sinusoïdal pur d'amplitude $A$** :  
  Si $s(t) = A \sin(\omega t + \phi)$, sa valeur efficace est rigoureusement égale à :
  $$S_{\text{eff}} = \frac{A}{\sqrt{2}} \approx 0.707 \times A$$

### 2. Représentation Complexe d'un Signal (Phaseurs)

Pour analyser les circuits électroniques en régime sinusoïdal établi, les ingénieurs utilisent un outil d'algèbre linéaire complexe puissant : le **phaseur**.

Soit un signal sinusoïdal :
$$s(t) = A \cos(\omega t + \phi)$$
où $A \ge 0$ est l'amplitude, $\omega = 2\pi f$ la pulsation temporelle (en rad/s) et $\phi$ la phase à l'origine (en rad).

#### Le Phaseur Associé :
On associe à ce signal de grandeur réelle le nombre complexe d'amplitude complexe :
$$\underline{S} = [A, \ \phi] = A e^{i\phi} = A \left( \cos(\phi) + i \sin(\phi) \right)$$

- La grandeur temporelle réelle se retrouve par extraction de la partie réelle :  
  $$s(t) = \text{Re}\left( \underline{S} \, e^{i\omega t} \right)$$
- Cette modélisation transforme les équations différentielles de circuits électriques complexes (contenant inductance et capacité) en de simples multiplications de matrices d'**impédance complexe** $\underline{Z}$.

### 3. Analyse Harmonique et Spectres

D'après les théorèmes d'analyse Fourier, un signal périodique non sinusoïdal $s(t)$ de fréquence fondamentale $f_0 = 1/T$ s'analyse comme la somme de signaux sinusoïdaux simples.

#### Composition spectrale :
- **Composante continue (DC)** : La valeur moyenne $S_{\text{moy}}$.
- **Fondamental** : Le signal sinusoïdal de même fréquence $f_0$ que le signal d'origine.
- **Harmonique de rang $n$** : Les composantes sinusoïdales à des fréquences multiples entières de celle d'origine ($f_n = n \times f_0$ pour $n \ge 2$).

Le graphe représentant l'amplitude de chaque harmonique en fonction de sa fréquence s'appelle le **Spectre d'amplitude** du signal.

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi est-il avantageux d'utiliser les phaseurs complexes en électronique ?</summary>

  En régime sinusoïdal, calculer la somme ou la dérivation de signaux réels conduit à des formules trigonométriques complexes extrêmement lourdes. En notation complexe, dériver par rapport au temps équivaut simplement à multiplier par le facteur complexe $j\omega$. Les lois d'Ohm et de Kirchhoff de l'électricité s'appliquent alors directement sous forme algébrique rationnelle.
</details>

<details>
  <summary>Quelle est la signification physique d'un spectre fréquentiel ?</summary>

  Le spectre fréquentiel (représenté par l'analyse harmonique) est la "carte d'identité" du signal. Il permet de visualiser d'un seul coup d'œil si un signal est par exemple composé de hautes fréquences (sons aigus, bruits parasites très rapides) ou de basses fréquences (sons graves, dérive lente), ce qui guide la conception de filtres pour supprimer le bruit de fond d'une communication radio.
</details>

<details>
  <summary>Comment calcule-t-on la puissance active dissipée à l'aide des phaseurs ?</summary>

  La puissance active dissipée par une charge d'électronique alimentée sous une tension complexe $\underline{U}$ et parcourue par un courant complexe $\underline{I}$ s'exprime par la formule :
  $$P = U_{\text{eff}} \times I_{\text{eff}} \times \cos(\varphi)$$
  où $\varphi = \phi_U - \phi_I$ s'appelle le **facteur de puissance** (cosinus phi), correspondant au retard de phase introduit par la charge réactive (inductance ou condensateur).
</details>

---

## 📝 Mini-Quiz

**Question 1 : Quelle est la valeur moyenne sur une période complète d’une tension sinusoïdale pure alternative symétrique non décalée $v(t) = 325 \sin(100\pi \cdot t)$ ?**
- [ ] $230 \text{ V}$
- [ ] $325 \text{ V}$
- [x] $0 \text{ V}$ car la courbe passe autant de temps dans les valeurs positives que négatives
- > **Explication :** Par définition géométrique, l'intégrale d'une sinusoïde pure symétrique sur une période complète $T$ comporte des aires de lobes positives et négatives parfaitement identiques qui s'annulent mutuellement. Sa valeur moyenne est donc rigoureusement égale à 0.

**Question 2 : Un signal sinusoïdal réel a pour formule $u(t) = 10 \cos(100\pi \cdot t - \frac{\pi}{4})$. Quel est le phaseur complexe exponentiel qui lui est associé ?**
- [ ] $\underline{U} = 10 e^{i \frac{\pi}{4}}$
- [x] $\underline{U} = 10 e^{-i \frac{\pi}{4}}$ car l'argument du nombre complexe garde le même signe que la phase à l'origine
- [ ] $\underline{U} = 100\pi e^{-i \frac{\pi}{4}}$
- > **Explication :** Par définition axiomatique de la correspondance phaseur-signal, à un terme de type $A \cos(\omega t + \phi)$, on fait correspondre le complexe d'amplitude polaire $[A, \phi] = A e^{i\phi}$. Dans notre cas, avec $A = 10$ et $\phi = -\pi/4$, le complexe est $\underline{U} = 10 e^{-i \frac{\pi}{4}}$.

**Question 3 : Une onde carrée alternée idéale de fréquence fondamentale de $120 \text{ Hz}$ est développée en série de Fourier. Quelles fréquences harmoniques de signaux sinusoïdaux seront présentes dans son spectre vibratoire ?**
- [ ] Uniquement les multiples pairs : $240 \text{ Hz}$, $480 \text{ Hz}$, $720 \text{ Hz}$, ...
- [x] Uniquement les multiples impairs : $360 \text{ Hz}$, $600 \text{ Hz}$, $840 \text{ Hz}$, ...
- [ ] Absolument toutes les fréquences entières continues sans filtre
- > **Explication :** En raison de la symétrie alternée de demi-période d'une onde carrée parfaite ($s(t + T/2) = -s(t)$), on démontre analytiquement par intégration de Fourier que tous ses coefficients pairs s'annulent ($c_{2k} = 0$). Seuls subsistent dans le spectre d'amplitude les harmoniques de rangs impairs : les coefficients associés aux fréquences $3f_0$, $5f_0$, $7f_0$, soit ici $360 \text{ Hz}$, $600 \text{ Hz}$, $840 \text{ Hz}$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Réaliser le calcul de l'intégrale temporelle de la puissance pour valider la valeur efficace RMS d'un signal créneau ou sinusoïdal décalé.
- [ ] Traduire instantanément l'expression instantanée temporelle d'un signal en phaseur complexe géométrique et réciproquement.
- [ ] Dessiner le spectre d'amplitude schématique d'un signal à partir de l'expression mathématique de sa décomposition de Fourier.
- [ ] Résoudre le courant traversant une impédance de condensateur $\underline{Z}_C = \frac{1}{iC\omega}$ en notation matricielle complexe.
