---
title: 'BTS CG : Lois de Probabilités Continues & Gestion des Risques'
level: Post_Bac
subLevel: BTS_CG
order: 3
---
# BTS CG : Lois de Probabilités Continues & Gestion des Risques

**Niveau** : Post-Bac (BTS CG, BTS SIO, BUT QLIO, BTS GPME)  
**Prérequis** : Probabilités élémentaires, notion d'intégrale ou d'aire sous une courbe, calcul statistique simple.  
**Objectifs** :
- Comprendre la notion de loi de probabilité à densité sur un intervalle réel continu.
- Utiliser rigoureusement la Loi Normale $N(\mu, \sigma)$ pour modéliser des variables industrielles ou financières.
- Centrer et réduire une variable aléatoire pour réaliser des calculs à l'aide de la loi normale centrée réduite $N(0,1)$.
- Mener des applications pratiques de gestion des stocks, gestion des files d'attente et contrôle de qualité d'actifs de production.

---

## Activités de découverte

### Activités : Tolérance industrielle ou comment dimensionner des pièces mécaniques
Une machine d'assemblage d'usine fabrique des axes cylindriques en bois de diamètre théorique $50\text{ mm}$. En pratique, en raison de frottements ou de vibrations, toutes les pièces produites n'ont pas exactement le diamètre visé : certaines mesurent $50.02\text{ mm}$, d'autres $49.97\text{ mm}$.
On rassemble les mesures sur un immense échantillon de $10\ 000$ pièces et on trace un histogramme. On voit se dessiner une courbe de forme d'une cloche symétrique centrée sur l'axe des ordonnées $50\text{ mm}$. C'est la célèbre **Loi Normale** (ou courbe de Gauss).

Le cahier des charges de fabrication impose une tolérance stricte : pour être valide, le diamètre de la pièce mécanique doit impérativement être compris entre $49.85\text{ mm}$ et $50.15\text{ mm}$. Sinon, la pièce est mise au rebus.
Quelle est la proportion exacte de pièces qui seront défectueuses lors du processus de production de ce matin ?
Les probabilités continues, par le biais de la **Loi Normale centrée réduite**, fournissent l'outil idéal pour répondre de manière rigoureuse à cette contrainte de rentabilité industrielle !

---

## Fondements Théoriques

### 1. Variables Aléatoires Continues & Lois à Densité

Une variable aléatoire $X$ est dite continue si elle prend ses valeurs dans un intervalle réel de $\mathbb{R}$. La loi de probabilité de $X$ est définie par une fonction $f$, appelée **densité de probabilité**, qui est positive et continue par morceaux, telle que :
$$\int_{-\infty}^{+\infty} f(x) \, dx = 1$$

La probabilité que la variable $X$ prenne sa valeur dans un intervalle $[a, b]$ correspond à l'aire délimitée géométriquement sous la courbe de la densité d'image :
$$P(a \le X \le b) = \int_a^b f(x) \, dx$$

### 2. La Loi Normale Générale $N(\mu, \sigma)$

La Loi Normale de moyenne (espérance) $\mu$ et de direct écart-type $\sigma$ possède l'expression de densité suivante :
$$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{1}{2} \left(\frac{x - \mu}{\sigma}\right)^2 \right)$$

- Son tracé est la célèbre cloche de Gauss, symétrique par rapport à l'abscisse de sa moyenne $\mu$.
- **Règles empiriques emblématiques** :
  - $P(\mu - \sigma \le X \le \mu + \sigma) \approx 0.683$ (environ $68\%$ d'observations dans l'intervalle de premier écart-type)
  - $P(\mu - 2\sigma \le X \le \mu + 2\sigma) \approx 0.954$ (environ $95\%$)
  - $P(\mu - 3\sigma \le X \le \mu + 3\sigma) \approx 0.997$ (environ $99.7\%$)

### 3. Utilisation de la Loi Normale Centrée Réduite $N(0, 1)$

Pour calculer numériquement des probabilités d'une loi normale générale sans intégrer la formule de densité, on applique un changement de variable universel appelé **centrage et réduction**.

#### Théorème de normalisation (le score Z) :
Si une variable aléatoire $X$ suit une loi normale générale $N(\mu, \sigma)$, alors la variable normalisée $Z$ définie par :
$$Z = \frac{X - \mu}{\sigma}$$
suit rigoureusement la loi normale centrée réduite de moyenne nulle et d'écart-type égal à 1, notée $N(0, 1)$.

On peut alors utiliser la fonction de répartition cumulative $\Phi(z) = P(Z \le z)$ lue dans les tables mathématiques ou calculée par des applications :
$$P(X \le x) = P\left( Z \le \frac{x - \mu}{\sigma} \right) = \Phi\left( \frac{x - \mu}{\sigma} \right)$$

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi est-ce que P(X = x) est égal à zéro pour une loi de densité continue ?</summary>

  C'est une spécificité mathématique perturbante par rapport aux probabilités discrètes ! Puisque les probabilités continues s'expriment sous forme d'une aire calculée par intégration sur un intervalle donné, la probabilité d'obtenir une valeur ponctuelle exacte et isolée $x$ revient à calculer l'intégrale d'un point vers lui-même :  
  $P(X = x) = \int_x^x f(t) \, dt = 0$.  
  Conséquence pratique importante : pour les lois continues, l'usage des bornes ouvertes ou fermées ne modifie absolument pas le calcul des probabilités : $P(a \le X \le b) = P(a < X < b)$.
</details>

<details>
  <summary>Comment gère-t-on les valeurs négatives dans la table de loi normale ?</summary>

  La table de la loi normale centrée réduite donne uniquement les valeurs de $\Phi(z)$ pour des valeurs réelles positives ($z \ge 0$).  
  Pour trouver la valeur correspondant à un score négatif, on tire profit de la symétrie parfaite de la courbe en cloche de Gauss en utilisant l'égalité :  
  $\Phi(-z) = 1 - \Phi(z)$.  
  Par exemple, $\Phi(-1.96) = 1 - \Phi(1.96) = 1 - 0.975 = 0.025$.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Une variable aléatoire $X$ suit la loi normale générale $N(100, 15)$. On applique le centrage et la réduction pour modéliser une valeur d'échantillon $x = 130$. Quel est le score $Z$ équivalent ?**
- [ ] $1.0$
- [x] $2.0$ car $(130 - 100) / 15 = 2$
- [ ] $-1.5$
> **Explication :** En utilisant la formule de normalisation de l'écart-type : $Z = \frac{x - \mu}{\sigma} = \frac{130 - 100}{15} = \frac{30}{15} = 2.0$. Cela signifie algébriquement que la valeur de $130$ se situe exactement à une distance de deux écarts-types au-dessus de la moyenne de notre distribution.

**Question 2 : D’après les propriétés remarquables de la Loi Normale centrée réduite $N(0,1)$, quelle est la probabilité d'avoir une mesure $Z$ telle que $P(-1.96 \le Z \le 1.96)$ ?**
- [ ] $50\ \%$
- [ ] $68\ \%$
- [x] $95\ \%$
> **Explication :** L'intervalle symétrique $[-1.96\ ; \ 1.96]$ concentre exactement $95\%$ de l'aire sous la courbe d'image de la densité de la loi normale standard. C’est la valeur pivot universellement utilisée pour l'élaboration de la quasi-totalité des intervalles de confiance d'erreur au seuil classique $\alpha = 5\%$.

**Question 3 : Laquelle de ces fonctions constitue une densité de probabilité valide sur l’intervalle $[0, 2]$ ?**
- [ ] $f(x) = x^2$
- [ ] $f(x) = -0.5x$
- [x] $f(x) = 0.5$ car la fonction est positive et son intégrale sur [0, 2] fait 1
> **Explication :** Une fonction constante positive $f(x) = 0.5$ sur l'intervalle d'intégration $[0, 2]$ est bien positive, et son intégrale est égale à la surface d'un rectangle de largeur 2 et de hauteur 0.5 : $\int_0^2 0.5 \, dx = [0.5x]_0^2 = 1.0 - 0 = 1$. C'est un modèle de densité de probabilité Uniforme valide.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Modéliser une variable continue de production technique à l'aide d'une loi normale appropriée.
- [ ] Réaliser le changement de variable de centrage-réduction pour obtenir la statistique de z-score.
- [ ] Utiliser efficacement la fonction de répartition cumulative pour déduire la probabilité d'intervalles ouverts ou fermés.
- [ ] Évaluer les risques d'une entreprise face à des taux de déchets ou des saturations d'infrastructures de distribution.
