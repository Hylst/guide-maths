---
title: 'BUT GEII : Impédance Complexe et Analyse Harmonique'
level: Post_Bac
subLevel: BUT_GEII
order: 1
---
# BUT GEII : Impédance Complexe et Analyse Harmonique

**Niveau** : Post-Bac (BUT GEII, Licence Électronique, Prépa)  
**Prérequis** : Nombres complexes (module, argument, Euler), fonctions trigonométriques, équations différentielles linéaires.  
**Objectifs** : 
- Maîtriser le passage du domaine temporel au domaine fréquentiel à l'aide des complexes.
- Exprimer les impédances complexes des composants passifs ($R$, $L$, $C$).
- Déterminer les fonctions de transfert de filtres de premier et second ordre.
- Décomposer un signal périodique non sinusoïdal en somme harmonique avec les séries de Fourier.

---

## ⚡ 1. Le Génie Électrique & Les Nombres Complexes 

En électricité industrielle, les courants et tensions alternatifs sinusoïdaux s'expriment sous la forme générale :
$$u(t) = U_{max} \cos(\omega t + \phi)$$

Travailler directement avec ces formes trigonométriques pour résoudre les équations des mailles d'un circuit conduit rapidement à des calculs trigonométriques extrêmement fastidieux.

### Le passage au monde complexe (Phasors)
Le mathématicien Leonhard Euler simplifie le domaine fréquentiel grâce au facteur $e^{j\omega t}$. On associe à la grandeur réelle $u(t)$ sa grandeur complexe associée $\underline{u}(t)$ :
$$\underline{u}(t) = U_{max} e^{j(\omega t + \phi)} = \underline{U} e^{j\omega t}$$

Où $\underline{U} = U_{max} e^{j\phi}$ (ou $U_{eff}\sqrt{2} e^{j\phi}$) est appelé le **phasor ou amplitude complexe**.
> En électricité, pour ne pas confondre le nombre imaginaire pur avec l'**intensité du courant** $i$, on note uniformément :
> $$j^2 = -1$$

---

## 🔬 2. Impédance Complexe des Composants $R, L, C$

En régime sinusoïdal établi de pulsation $\omega$, la relation de comportement d'un dipôle est simplifiée par une loi d'Ohm généralisée complexe :
$$\underline{U} = \underline{Z} \cdot \underline{I}$$

Où $\underline{Z}$ est l'**impédance complexe** (exprimée en Ohms $\Omega$) :

| Composant | Relation Temporelle | Impédance Complexe $\underline{Z}$ | Module $Z$ | Déphasage $\phi$ |
| :--- | :--- | :--- | :--- | :--- |
| **Résistance ($R$)** | $u(t) = R \cdot i(t)$ | $\underline{Z}_R = R$ | $R$ | $0$ (En phase) |
| **Inductance ($L$)** | $u(t) = L \frac{di(t)}{dt}$ | $\underline{Z}_L = j L \omega$ | $L \omega$ | $+\pi/2$ (Tension en avance) |
| **Condensateur ($C$)** | $i(t) = C \frac{du(t)}{dt}$ | $\underline{Z}_C = \frac{1}{j C \omega} = -j \frac{1}{C \omega}$ | $\frac{1}{C\omega}$ | $-\pi/2$ (Tension en retard) |

### Interprétation Géométrique
L'impédance se note aussi : $\underline{Z} = R + j X$ où $R$ est la partie réelle (**Résistance**) et $X$ est la partie imaginaire (**Réactance**).
- Pour une self (inductance) : $\underline{Z} = j L\omega$, la réactance est positive.
- Pour un condensateur : $\underline{Z} = -j \frac{1}{C\omega}$, la réactance est négative (liaison capacitive).

---

## 📈 3. Séries de Fourier & Analyse Harmonique

Un autre grand pilier du BUT GEII est l'analyse spectrale. Tout signal périodique $s(t)$ de période $T$ (pulsation $\omega_1 = 2\pi/T$) et continu par morceaux peut se décomposer en une somme infinie de sinus et de cosinus :

$$s(t) = a_0 + \sum_{n=1}^{+\infty} \left( a_n \cos(n \omega_1 t) + b_n \sin(n \omega_1 t) \right)$$

Où :
- $a_0 = \langle s \rangle$ est la valeur moyenne du signal.
- $a_n = \frac{2}{T} \int_{0}^{T} s(t) \cos(n \omega_1 t) dt$ représente l'amplitude harmonique en cosinus.
- $b_n = \frac{2}{T} \int_{0}^{T} s(t) \sin(n \omega_1 t) dt$ représente l'amplitude en sinus.

### Exemple Majeur : Signal Carré
Pour un signal carré synchrone symétrique de valeur crête $E$ :
- Sa valeur moyenne est nulle ($a_0 = 0$).
- Ses coefficients $a_n$ sont nuls par parité (signal impair).
- Ses coefficients $b_n$ valent $\frac{4E}{n\pi}$ pour les harmoniques impairs ($n = 1, 3, 5...$) et $0$ pour les harmoniques pairs.

---

## FAQ Étudiante

<details>
  <summary>Pourquoi note-t-on "j" au lieu de "i" pour le complexe √-1 en électricité et traitement du signal ?</summary>

  Le choix de $j$ est purement pratique : en physique et électronique, la lettre $i$ est depuis toujours réservée au courant électrique instantané $i(t)$. Si on utilisait $i$ pour les complexes, les formules de mailles se transformeraient rapidement en cauchemar visuel (ex: $u(t) = (r + i\omega L) \cdot i(t)$). Pour éviter toute confusion fatale, l'ensemble du monde de l'ingénierie adopte ainsi $j$.
</details>

<details>
  <summary>Qu'est-ce que le déphasage et comment l'observer à l'oscilloscope ?</summary>

  Le déphasage $\phi$ correspond au retard ou à l'avance temporelle relative d'une grandeur par rapport à une autre (par exemple, la tension par rapport au courant). À l'oscilloscope, on mesure l'écart temporel $\Delta t$ entre les maximums des deux sinusoïdes, et on en déduit l'angle de phase par règle de trois : $\phi = 2\pi \frac{\Delta t}{T}$ rd, où $T$ désigne la période commune des signaux.
</details>

<details>
  <summary>Quelle est la signification physique des harmoniques dans un réseau de distribution d'électricité ?</summary>

  Les harmoniques représentent la pollution fréquentielle générée par les charges non linéaires (ordinateurs, variateurs, LED). Ils créent des courants sinusoïdaux parasites à des fréquences multiples de $50\text{ Hz}$ (ex : $150\text{ Hz}$, $250\text{ Hz}$), induisant des échauffements dans les câbles et endommageant les transformateurs de puissance de manière prématurée.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Quelle est l'impédance complexe exacte d'un condensateur C parfait soumis à une fréquence f ?**
- [ ] Z = j 2 pi f C
- [ ] Z = R + j/f
- [x] Z = 1 / (j 2 pi f C)
- > **Explication :** La pulsation vaut $\omega = 2\pi f$. L'impédance complexe du condensateur est définie par $\underline{Z}_C = \frac{1}{jC\omega}$, ce qui s'exprime donc par $\frac{1}{j 2\pi f C}$.

**Question 2 : Si un signal d'entrée périodique présente un spectre d'harmoniques, la sortie d'un filtre passif linéaire idéal...**
- [ ] Supprimera instantanément toutes les harmoniques d'un coup.
- [ ] Va doubler la fréquence fondamentale automatiquement.
- [x] Modifiera l'amplitude ou la phase de chaque harmonique de manière isolée selon la fréquence.
- > **Explication :** En électricité linéaire, chaque harmonique se comporte comme une sinusoïde indépendante subissant l'atténuation et le déphasage de la fonction de transfert du filtre à sa propre fréquence $n \cdot f_1$ (Principe de Superposition).

**Question 3 : Une tension u(t) = 100 cos(100 pi t) alimente une résistance pure R = 50 Ohms. Quel phasor d'amplitude crête associe-t-on à la tension ?**
- [ ] U_ phasor = 50 e^(j)
- [x] U_ phasor = 100
- [ ] U_ phasor = 100 e^(j 50)
- > **Explication :** Ici $U_{max} = 100\text{ V}$ et la phase $\phi$ est nulle. Comme $\underline{U} = U_{max} e^{j\phi}$, on obtient simplement $\underline{U} = 100$.

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Savoir convertir une équation différentielle sinusoïdale en relation d'impédance complexe.
- [ ] Calculer l'atténuation et le déphasage de filtres passifs simples (RC et RL).
- [ ] Écrire le développement complet des harmoniques d'un signal à partir de ses coefficients de Fourier $a_n$ et $b_n$.
- [ ] Manipuler algébriquement des admittances complexes ($\underline{Y} = 1/\underline{Z}$) pour des associations parallèles.
