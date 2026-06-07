---
title: 'BUT SD : Statistiques Descriptives & Analyse Univariée'
level: Post_Bac
subLevel: BUT
order: 11
---
# BUT SD : Statistiques Descriptives & Analyse Univariée

**Niveau** : Post-Bac (BUT Science des Données, BUT Informatique, IUT)  
**Prérequis** : Probabilités du Lycée, symboles de sommation ($\sum$).  
**Objectifs** :
- Maîtriser les concepts d'indicateurs de position (moyenne, médiane, quartiles) et de dispersion (variance, écart-type, écart interquartile).
- Comprendre la méthodologie d'analyse univariée appliqué aux données industrielles et marketing.
- Pratiquer l'interprétation des boîtes à moustaches (boxplots) et des diagrammes de distribution.

---

## Activités de découverte

### Activité : Le paradoxe de l'usine d'emballage
Dans une usine de conditionnement alimentaire, deux machines $M_1$ et $M_2$ remplissent des boîtes de conserve de poids nominal ciblé à $400\text{ g}$.
On prélève un échantillon de 100 boîtes sur chaque machine et on calcule le poids moyen :
- Machine $M_1$ : moyenne = $400.1\text{ g}$
- Machine $M_2$ : moyenne = $400.0\text{ g}$

*À première vue, la Machine $M_2$ est la plus précise car elle est pile sur la cible.*

Pourtant, en examinant la répartition, on s'aperçoit que :
- Les boîtes de $M_1$ pèsent toutes entre $399\text{ g}$ et $401\text{ g}$.
- Les boîtes de $M_2$ pèsent pour moitié $350\text{ g}$ et pour l'autre moitié $450\text{ g}$ !

La moyenne est un indicateur de **position** extrêmement trompeur s'il n'est pas assorti d'indicateurs de **dispersion**. $M_2$ produit un déchet gigantesque car sa dispersion est catastrophique.

---

## Fondements Théoriques

### 1. Indicateurs de Position (Centraux)

Soit une série statistique de taille $N$, notée $(x_1, x_2, \dots, x_N)$.

#### La Moyenne Échantillon ($\bar{x}$)
Elle représente le centre de gravité de la distribution :
$$\bar{x} = \frac{1}{N} \sum_{i=1}^{N} x_i$$

#### La Médiane ($Me$)
La médiane divise la population en deux sous-groupes de même effectif (50% au-dessus, 50% au-dessous). Elle est insensible aux valeurs extrêmes (robuste).

#### Les Quartiles ($Q_1$ et $Q_3$)
- **$Q_1$** (premier quartile) : 25% des observations lui sont inférieures ou égales.
- **$Q_3$** (troisième quartile) : 75% des observations lui sont inférieures ou égales.

### 2. Indicateurs de Dispersion

#### La Variance ($s^2$)
Elle mesure la moyenne des carrés des écarts à la moyenne :
$$s^2 = \frac{1}{N} \sum_{i=1}^{N} (x_i - \bar{x})^2$$

*En pratique dans le BUT SD, pour un estimateur non biaisé de la variance de la population, on utilise la variance corrigée (notée $s_{n-1}^2$) :*
$$s_{n-1}^2 = \frac{1}{N-1} \sum_{i=1}^{N} (x_i - \bar{x})^2$$

#### L'Écart-type ($s$)
C'est la racine carrée de la variance. Il s'exprime dans la **même unité** que la variable de départ :
$$s = \sqrt{s^2}$$

#### L'Écart Interquartile ($IQR$)
Mesure l'étendue de la "boîte" centrale contenant 50% des données :
$$IQR = Q_3 - Q_1$$

---

## Représentations Graphiques Clés en BUT SD

### Diagramme en Boîte à moustaches (Boxplot)
Un boxplot résume graphiquement 5 nombres clés :
1. Minimum (hors valeurs aberrantes) : défini par $Q_1 - 1.5 \times IQR$
2. Premier quartile $Q_1$
3. Médiane $Me$
4. Troisième quartile $Q_3$
5. Maximum (hors valeurs aberrantes) : défini par $Q_3 + 1.5 \times IQR$

Les valeurs situées au-delà des moustaches sont considérées comme des **valeurs aberrantes** (outliers) et représentées par des points individuels. Elles méritent une attention statistique particulière.

---

## Exemple Pratique sous R / Python
```python
import numpy as np
import pandas as pd

# Données d'un échantillon statistique
poids = [399, 401, 400, 398, 402, 395, 405, 400, 401, 399]

# Calcul des statistiques univariées
stats = pd.Series(poids).describe()
print(stats)
# Affiche la moyenne, écart-type, min, max et quartiles
```

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi diable diviser par N-1 au lieu de N pour l'écart-type d'échantillon ?</summary>

  C’est une des questions les plus célèbres de BUT SD ! Quand on calcule la variance d'un simple échantillon statistique pour estimer la vraie variance de la population totale, la formule standard avec division par $N$ commet une erreur systématique : elle sous-estime légèrement la dispersion réelle. En divisant par $N-1$ (correction de Bessel), on rectifie ce biais mathématique. C'est l'estimateur dit « non-biaisé ».
</details>

<details>
  <summary>Quelle est la différence fondamentale entre la moyenne et la médiane ?</summary>

  La moyenne utilise la valeur exacte de chaque observation, ce qui la rend extrêmement vulnérable aux valeurs aberrantes. Si vous avez 9 personnes touchant 2 000 € et 1 PDG touchant 80 000 €, le salaire moyen est de 9 800 € (ce qui ne représente personne !). La médiane, elle, vaut 2 000 €. Elle résiste aux anomalies de distribution extrêmes.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si on multiplie toutes les valeurs d'une série statistique par 3, l'écart-type est alors :**
- [ ] Inchangé
- [x] Multiplié par 3
- [ ] Multiplié par 9
> **Explication :** Puisque la variance ($s^2$) est calculée sur des écarts au carré, multiplier les valeurs par 3 multiplie la variance par $3^2 = 9$. Et comme l'écart-type ($s$) est la racine de la variance, il est multiplié par $\sqrt{9} = 3$.

**Question 2 : Dans un boxplot (boîte à moustaches), la hauteur de la boîte principale représente :**
- [ ] L'étendue totale de la distribution
- [ ] L'intervalle de confiance à 95%
- [x] L'écart interquartile (IQR)
> **Explication :** La boîte est tracée du premier quartile ($Q_1$) au troisième quartile ($Q_3$). Sa dimension mesure précisément l'écart interquartile ($IQR = Q_3 - Q_1$).

**Question 3 : Comment appelle-t-on une valeur statistique qui s'éloigne anormalement des limites estimées ($1.5 \times IQR$) ?**
- [ ] Une valeur univariée
- [x] Un outlier (valeur aberrante)
- [ ] La variance résiduelle
> **Explication :** En statistique moderne, les valeurs anormales se trouvant au-delà des « moustaches » statistiques sont qualifiées d'outliers ou valeurs aberrantes. On doit les filtrer ou les étudier spécifiquement.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Calculer des moyennes échantillon et comprendre la limite vis-à-vis des valeurs extrêmes.
- [ ] Maîtriser le calcul de la médiane et identifier les quartiles $Q_1$ et $Q_3$.
- [ ] Savoir tracer et interpréter un diagramme en boîte à moustaches (Boxplot) et identifier les valeurs aberrantes (outliers).
- [ ] Faire la différence entre la variance brute et l'estimateur de variance corrigée (division par $N-1$).
