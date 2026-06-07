---
title: 'BTS SIO : Statistiques Inférentielles et Intervalles de Confiance'
level: Post_Bac
subLevel: BTS
order: 2
---
# BTS SIO : Statistiques Inférentielles et Intervalles de Confiance

**Niveau** : Post-Bac (BTS Services Informatiques - SIO, BTS CIEL / SN, BTS CG, Licence Économie et Gestion)  
**Prérequis** : Notions de statistiques descriptives, calcul des probabilités, Loi Normale centrée réduite.  
**Objectifs** :
- Modéliser la distribution des fréquences d'un échantillonnage aléatoire simple.
- Construire et interpréter un **Intervalle de Confiance** pour estimer une proportion ou une moyenne inconnue à partir de données d'un échantillon.
- Formuler et exécuter un **Test d'Hypothèse** bilatéral pour valider la conformité d'une proportion ou d'un paramètre de production.

---

## Activités de découverte

### Activité : Prédire l'issue d'un vote national en interrogeant seulement 1 000 personnes (La Magie des Sondages)
Lors d'une élection présidentielle serrée opposant le candidat A et le candidat B, comment les chaînes de télévision peuvent-elles annoncer à 20h pile le vainqueur avec une fiabilité absolue, alors qu'elles n'ont interrogé que $n = 1 \ 000$ votants sur plus de 40 millions d'électeurs ?

Est-ce une formule divinatoire magique ? Non, c'est de l'**inférence statistique**.
1. Si l'on tire au hasard 1000 personnes, la fréquence observée $f$ du vainqueur dans cet échantillon fluctue autour de sa vraie valeur globale $p$ (inconnue).
2. Grâce aux théorèmes des probabilités, on sait que cette fréquence $f$ suit une cloche parfaite (une **Loi Normale**).
3. On démontre qu'il y a 95% de chances pour que la vraie proportion nationale $p$ se trouve à une distance inférieure ou égale à :
   $$\pm \frac{1.96 \sqrt{f(1-f)}}{\sqrt{n}} \approx \pm 3\% \quad \text{(pour } n = 1000 \text{)}$$

Cette fourchette de sécurité $[f - 3\%, f + 3\%]$ s'appelle un **Intervalle de Confiance**. Les statistiques inférentielles permettent d'étendre des observations locales à la population globale de façon rigoureusement quantifiée. Elles régissent aujourd’hui le contrôle qualité industriel (estimer le taux de pièces électroniques défectueuses d'un lot), les essais cliniques de nouveaux vaccins ou l'A/B testing de sites e-commerce.

---

## Fondements Théoriques

### 1. Échantillonnage et Fluctuations

L'inférence statistique consiste à extraire des lois ou paramètres d'une population globale de taille $N$, à partir de la mesure d'un échantillon aléatoire de taille $n$ (avec $n \ll N$).

#### Distribution d'une proportion d'échantillon :
Soit une population contenant une proportion $p$ d'un caractère. On prélève un échantillon de taille $n$.
La variable aléatoire $F$, représentant la fréquence observée du caractère dans l'échantillon, a pour caractéristiques :
- Espérance : $E(F) = p$ (l'estimateur est dit **sans biais**).
- Écart-type : $\sigma(F) = \sqrt{\frac{p(1-p)}{n}}$.

#### Approximation par la Loi Normale (Théorème Central Limite) :
Si $n \ge 30$, $np \ge 5$ et $n(1-p) \ge 5$, la distribution de fréquences observées $F$ peut être approchée de façon continue par une Loi Normale :
$$F \sim \mathcal{N}\left( p, \sqrt{\frac{p(1-p)}{n}} \right)$$

### 2. Estimation par Intervalle de Confiance

L'estimation ponctuelle (prendre $f$ comme estimation directe de $p$) est insuffisante car elle ne donne aucune mesure d'erreur. On préfère estimer par un encadrement appelé **Intervalle de Confiance** (IC).

#### Intervalle de Confiance d'une proportion au seuil de confiance de 95% :
Soit $f$ la fréquence observée sur un échantillon de taille $n$.
L'intervalle de confiance $I_{0.95}$ d'estimation de la proportion globale $p$ est défini sous réserve que les conditions d'approximation soient vérifiées ($n \ge 30, nf \ge 5, n(1-f) \ge 5$) par :
$$I_{0.95} = \left[ f - t \sqrt{\frac{f(1-f)}{n}}, \ f + t \sqrt{\frac{f(1-f)}{n}} \right]$$
Pour un niveau de confiance de 95%, le coefficient d'écart normal de cloche est de $t = 1.96$.

- **Signification** : Si on répète l'échantillonnage 100 fois, l'intervalle calculé contiendra la vraie valeur inconnue $p$ dans 95 cas en moyenne.

### 3. Principes des Tests d’Hypothèses

Un test d'hypothèse est une règle de décision mathématique permettant de choisir entre deux hypothèses contradictoires au vu des résultats de l'échantillon.

#### Formulation générale d'un test bilatéral :
- **Hypothèse nulle $H_0$** : "Il n'y a pas de différence significative (la piece est conforme)". Ex: $p = p_0$.
- **Hypothèse alternative $H_1$** : "Il y a un changement systématique". Ex: $p \ne p_0$.

#### Processus de test :
1. On suppose $H_0$ vraie.
2. On définit un **seuil de risque $\alpha$** (généralement 5%), représentant la probabilité de rejeter $H_0$ à tort (erreur de première espèce).
3. On calcule la statistique de test centrée réduite sous $H_0$ :
   $$Z_{\text{obs}} = \frac{f - p_0}{\sqrt{\frac{p_0(1-p_0)}{n}}}$$
4. **Règle de décision** : Si $|Z_{\text{obs}}| > 1.96$, l'écart observé est trop grand pour être le fruit du simple hasard. On rejette $H_0$ au niveau de confiance de 95%. Sinon, on dit que l'écart est statistiquement non significatif et on conserve $H_0$.

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Comment diviser la taille de l'intervalle de confiance par 2 ?</summary>

  La largeur d'un intervalle de confiance est proportionnelle à l'inverse de la racine carrée de la taille de l'échantillon ($1/\sqrt{n}$). Pour diviser par 2 la taille de la marge d'erreur, il faut donc multiplier par **4** la taille de l'échantillon $n$ !
</details>

<details>
  <summary>Quelle est la différence entre risque d'erreur α et confiance 1-α ?</summary>

  Le niveau de confiance ($1-\alpha$, ex: 95%) est la probabilité d'accepter une hypothèse correcte ou d'englober la vraie valeur. Le risque $\alpha$ (ex: 5%) est le risque d'erreur de première espèce : rejeter l'hypothèse conforme du fabricant car l'échantillon de test s'est avéré par malchance exceptionnel et non représentatif.
</details>

<details>
  <summary>Qu'est-ce qu'une p-valeur (p-value) ?</summary>

  La **p-valeur** est la probabilité d'observer un résultat au moins aussi extrême que celui obtenu dans notre échantillon si l'hypothèse nulle $H_0$ était rigoureusement vraie. Si cette p-valeur est inférieure au seuil de risque $\alpha$ (ex: 0.05), le résultat est considéré comme très improbable sous l'hypothèse nulle, on choisit alors de la rejeter.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Un assureur prend au hasard un échantillon de $n = 400$ clients et observe une proportion de clients engagés de $f = 0.40$ (soit 40%). Quelle est la borne d'erreur simplifiée à 95% ($1/\sqrt{n}$) de cette estimation ?**
- [ ] $\pm 1\%$
- [x] $\pm 5\%$ car $1/\sqrt{n} = 1/\sqrt{400} = 1/20 = 0.05$
- [ ] $\pm 10\%$
- > **Explication :** En statistiques, une règle d'approximation simplifiée très utile énonce que la borne d'erreur de fluctuation à un niveau de confiance de 95% est d'environ de $\pm 1/\sqrt{n}$. Ici : $1/\sqrt{400} = 1/20 = 0.05$, soit une marge de sécurité de $\pm 5\%$. L'intervalle de confiance est $[35\%, 45\%]$.

**Question 2 : Au cours d'un test statistique bilatéral de conformité au seuil de risque de 5%, le paramètre centré réduit calculé donne la valeur absolue $|Z_{\text{obs}}| = 2.45$. Quelle décision statistique doit-on prendre ?**
- [ ] On conserve l'hypothèse de conformité nulle $H_0$ car la valeur est élevée
- [x] On rejette l'hypothèse $H_0$ car $|Z_{\text{obs}}| > 1.96$
- [ ] On annule le test pour insuffisance de données
- > **Explication :** Au seuil d'erreur standard de 5% ($\alpha = 0.05$), la région de rejet de l'hypothèse de conformité $H_0$ correspond à toutes les valeurs centrées réduites dont l'écart est strictement supérieur en valeur absolue à 1.96. Comme $2.45 > 1.96$, l'écart est qualifié de très significatif et on rejette $H_0$.

**Question 3 : Qu’appelle-t-on "Erreur de seconde espèce" (notée β) dans la construction des tests d’hypothèses ?**
- [ ] Le fait de commettre une erreur de calcul arithmétique de moyenne
- [ ] Rejeter l'hypothèse nulle $H_0$ alors qu'elle est vraie
- [x] Conserver l'hypothèse nulle $H_0$ alors qu'elle est fausse
- > **Explication :** L'erreur de première espèce ($\alpha$) consiste à rejeter par erreur $H_0$ alors qu'elle est en réalité vraie. L'erreur de seconde espèce ($\beta$) consiste à accepter/conserver à tort l'hypothèse nulle $H_0$ alors qu'elle est fausse (par exemple, déclarer un lot conforme alors qu'il est défectueux). Le complémentaire $1-\beta$ s'appelle la puissance statistique du test.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Modéliser la loi probabiliste d'un estimateur de fréquence d'échantillonnage simple à l'aide de la loi normale.
- [ ] Calculer manuellement les bornes précises de l'intervalle de confiance à 95% d'une proportion ou d’une moyenne observée.
- [ ] Formuler rigoureusement les hypothèses contraires $H_0$ et $H_1$ d'un énoncé technique d'ingénierie.
- [ ] Prendre une décision de rejet ou d'acceptation statistique argumentée en calculant la statistique statistique observée et en la comparant au seuil d'erreur.
