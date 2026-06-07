---
title: 'BUT GEA : Statistiques Décisionnelles & Tests d''Hypothèses'
level: Post_Bac
subLevel: BUT_GEA
order: 3
---
# BUT GEA : Statistiques Décisionnelles & Tests d'Hypothèses

**Niveau** : Post-Bac (BUT GEA 2ème année, BUT SD, Ecoles de Management, L2-L3 Économie)  
**Prérequis** : Probabilités élémentaires, lois usuelles (Loi Normale), échantillonnage théorique.  
**Objectifs** :
- Estimer un paramètre inconnu (moyenne ou proportion) par intervalle de confiance.
- Formuler rigoureusement les hypothèses nulle ($H_0$) et alternative ($H_1$) d'un problème décisionnel de gestion.
- Choisir et calculer la statistique de test appropriée (Test Z, Test de Student, Test du $\chi^2$).
- Interpréter la p-value et prendre une décision managériale rationnelle au seuil de signification choisi $\alpha$.

---

## Activités de découverte

### Activités : Détecter si une campagne de communication marketing a vraiment fonctionné
Un grand groupe d'e-commerce vend d'habitude un panier d'achat moyen de $\mu_0 = 75\ €$ par utilisateur. Pour augmenter ce panier, l'équipe marketing conçoit une nouvelle campagne promotionnelle par email hautement ciblée.
Après le déploiement sur un échantillon de $n = 100$ clients aléatoires, on remarque que le montant moyen de leur panier d'achat s'élève à $\bar{x} = 79\ €$, avec un écart-type mesuré de $s = 15\ €$.

Le directeur marketing s’exclame : *"Magnifique ! Notre panier a augmenté de 4 euros, généralisons cette campagne à toute la base de clients !"*

En tant qu'analyste de données, vous devez modérer cet enthousiasme par une analyse d'inférence statistique sous forme de test d'hypothèses :
- **Hypothèse $H_0$ (Le hasard)** : La campagne n'a aucun impact réel. La moyenne observée de $79\ €$ n'est due qu'à des fluctuations aléatoires de l'échantillonnage de nos $100$ clients.
- **Hypothèse $H_1$ (L'effet réel)** : La campagne a effectivement eu un effet positif permanent sur le comportement de consommation.

Le gain apparent de $4\ €$ est-il statistiquement significatif au seuil d'erreur de $5\ \%$ ? C'est ce que les **statistiques décisionnelles** permettent de calculer rigoureusement !

---

## Fondements Théoriques

### 1. Estimation par Intervalle de Confiance

L'estimation ponctuelle (par exemple la moyenne de l'échantillon $\bar{X}$) ne donne aucune information sur la précision de la mesure. On détermine donc un intervalle de confiance qui a une probabilité fixée (généralement $1-\alpha = 95\%$) de contenir le vrai paramètre de la population.

#### Intervalle de Confiance d'une Moyenne $\mu$ (Grand échantillon $n \ge 30$, écart-type connu $\sigma$) :
$$IC_{1-\alpha}(\mu) = \left[ \bar{x} - z_{\alpha/2} \frac{\sigma}{\sqrt{n}} \ ; \ \bar{x} + z_{\alpha/2} \frac{\sigma}{\sqrt{n}} \right]$$
Pour un niveau de confiance de $95\%$, le coefficient de la loi normale centrée réduite est $z_{\alpha/2} = 1.96$.

### 2. Cadre formel des Tests d'Hypothèses

Un test d'hypothèses oppose deux théories exclusives :
- **L’hypothèse nulle $H_0$** : Traduit l'absence de changement, d'effet ou l'identité de valeurs.
- **L’hypothèse alternative $H_1$** : Spécifie la conjecture que l'on cherche à démontrer (supériorité, différence).

#### Équilibre des Erreurs :
| Décision / Réalité | $H_0$ est Vraie | $H_0$ est Fausse ($H_1$ Vraie) |
| :--- | :--- | :--- |
| **Rejeter $H_0$** | **Erreur de Type I** ($\alpha$) | Décision Correcte (Puissance $1-\beta$) |
| **Accepter $H_0$** | Décision Correcte ($1-\alpha$) | **Erreur de Type II** ($\beta$) |

- ** Risque $\alpha$** (Seuil de signification) : Probabilité de rejeter indûment l’hypothèse nulle $H_0$ alors qu’elle était vraie (généralement fixé à $5\%$).
- **Risque $\beta$** : Probabilité de ne pas rejeter $H_0$ alors qu’elle était fausse (puissance du test insuffisante pour détecter un effet).

### 3. Le Test de Conformité d'une Moyenne (Test Z)

Dans le cas où $n \ge 30$ avec un écart-type estimé $s$, ou si la variable mesurée suit une loi normale d'écart-type connu, on calcule la statistique de test sous l'hypothèse nulle $H_0$ :
$$Z_{calc} = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}$$

#### Règle de décision (Test bilatéral au seuil $\alpha = 5\%$) :
Si $|Z_{calc}| > 1.96$, on rejette $H_0$ au risque de $5\%$ d'erreur de type I. Sinon, on ne peut pas rejeter $H_0$.

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Qu'est-ce que la p-value et comment l'utilise-t-on pour décider ?</summary>

  La **p-value** est la probabilité d'obtenir une valeur de la statistique de test au moins aussi extrême que celle observée de l'échantillon, si l'hypothèse nulle $H_0$ était rigoureusement vraie. Elle offre d'ailleurs un raccourci de décision rapide :  
  - **Si p-value $\le \alpha$ (ex. 0.05)** : On rejette $H_0$. Le résultat est hautement significatif.  
  - **Si p-value $> \alpha$** : On ne peut pas rejeter $H_0$. On dit que le résultat est non statistiquement significatif.
</details>

<details>
  <summary>Quand doit-on utiliser le test de Student plutôt que le test Z ?</summary>

  On emploie le **Test t de Student** lorsque l'effectif de l'échantillon est de petite taille ($n < 30$), que la variable est d’allure normale, et que l'écart-type de la population entière $\sigma$ nous est totalement inconnu. On lit alors le seuil de basculement critique dans la table de loi de Student avec $n - 1$ degrés de liberté (ddl).
</details>

---

## 📝 Mini-Quiz

**Question 1 : Dans un sondage politique sur un échantillon de $n = 1\ 000$ personnes, la marge d'erreur à $95\%$ de confiance d'une proportion est estimée par la formule logarithmique. De façon empirique, quelle est la demi-largeur maximale de l'intervalle d'estimation d'une proportion pour $n = 1000$ ?**
- [ ] Environ $10\ \%$
- [x] Environ $3.1\ \%$ car la formule simplifiée donne $1.96 \cdot \sqrt{\frac{p(1-p)}{n}} \le \frac{0.98}{\sqrt{n}}$
- [ ] Environ $0.1\ \%$
> **Explication :** La demi-largeur de l'IC à $95\%$ d'une proportion d'échantillon est maximale lorsque $p = 0.5$, ce qui donne une formule simplifiée de $\frac{1.96 \times 0.5}{\sqrt{n}} \approx \frac{0.98}{\sqrt{n}}$. Pour $n = 1\ 000$, cela donne : $\frac{0.98}{\sqrt{1000}} \approx 0.031$ ou $3.1\%$, la marge d'erreur classique de sondage d'opinion.

**Question 2 : Si la p-value calculée d'un test de différence de panier moyen s'élève à 0,012 et que notre seuil exige un risque $\alpha = 5\ \%$, quelle est la bonne conclusion ?**
- [x] On rejette l'hypothèse nulle $H_0$ : la différence observée est statistiquement significative
- [ ] On accepte pleinement $H_0$ : la variation n'est due qu'au pur hasard de l'échantillon
- [ ] On annule toutes les vagues de ventes
> **Explication :** Puisque la p-value ($0.012$) est inférieure au risque toléré $\alpha = 0.05$ (soit $1.2\% \le 5\%$), la probabilité que ce résultat soit dû au pur fruit du hasard sous l'hypothèse nulle $H_0$ est extrêmement mince. On rejette donc pleinement $H_0$ au profit de l'hypothèse d'impact $H_1$.

**Question 3 : Qu'est-ce qu'une erreur de type II en statistiques décisionnelles ?**
- [ ] Rejeter l'hypothèse nulle $H_0$ alors qu'elle était pourtant parfaitement vraie
- [x] Ne pas rejeter l'hypothèse nulle $H_0$ alors qu'elle était en réalité fausse.
- [ ] Faire une erreur d'addition dans le calcul du pivot du Simplexe
> **Explication :** L'erreur de type II (ou risque de deuxième espèce $\beta$) se produit si le test ne parvient pas à rejeter $H_0$, alors qu'un effet réel existait en réalité (souvent par manque de puissance du fait d'un échantillon trop réduit).

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Estimer la proportion d'intentions d'achat de la population avec sa marge d'erreur d'intervalle à $95\%$.
- [ ] Formuler les hypothèses $H_0$ et $H_1$ pour n'importe quel arbitrage de processus industriel ou promotionnel.
- [ ] Calculer manuellement la statistique de choix de test adéquat pour comparer deux échantillons de clients.
- [ ] Utiliser les tables statistiques ou la p-value pour statuer sur la généralisation de mesures de rendement d'entreprise.
