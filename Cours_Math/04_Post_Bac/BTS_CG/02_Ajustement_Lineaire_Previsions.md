---
title: 'BTS CG : Statistiques Bidimensionnelles & Prévisions'
level: Post_Bac
subLevel: BTS_CG
order: 2
---
# BTS CG : Statistiques Bidimensionnelles & Prévisions

**Niveau** : Post-Bac (BTS CG, BTS Électrotechnique, BUT TC, BTS SAM)  
**Prérequis** : Repère orthogonal d’un plan cartésien, équations de droite du type $y = ax + b$, moyenne arithmétique.  
**Objectifs** :
- Représenter graphiquement une série statistique double sous forme de nuage de points.
- Localiser le point moyen $G$ (centre de gravité) d'une distribution bidimensionnelle.
- Calculer et interpréter la covariance et le coefficient de corrélation linéaire de Pearson $r$.
- Déterminer l'équation de la droite d'ajustement affine par la méthode des moindres carrés pour réaliser des prévisions budgétaires à court terme.

---

## Activités de découverte

### Activités : Prédire le Chiffre d'Affaires d'un magasin grâce aux relevés publicitaires
Le directeur d'un magasin de distribution souhaite savoir si son investissement publicitaire local est efficace, et surtout s'il peut prédire ses ventes du mois prochain en fonction du budget dépensé. Il rassemble les données de vente des 5 derniers mois :

| Dépenses de Publicité ($X$ en k€) | $1$ | $2$ | $3$ | $4$ | $5$ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ventes totales réalisées ($Y$ en k€)** | $10$ | $15$ | $19$ | $20$ | $26$ |

Si l'on place ces points dans un repère, on observe un alignement presque rectiligne de la trajectoire : plus on dépense de l'argent en publicité, plus le volume de ventes augmente de façon constante.

1. **La modélisation** : Pouvez-vous tracer une droite "idéale" qui passe le plus près possible de tous les points pour résumer cette relation ?
2. **La prévision** : Si le directeur décide d'allouer un budget publicitaire historique exceptionnel de $X = 7\text{ k€}$ le mois prochain, de quel volume de chiffre d'affaires prévisionnel ($Y$) peut-il légitimement espérer s'approcher ?

La **Méthode des Moindres Carrés** fournit l'unique équation mathématique exacte de cette droite pour répondre avec précision à ce défi commercial et budgétaire !

---

## Fondements Théoriques

### 1. Variables Statistiques Doubles & Point Moyen G

On étudie simultanément deux caractères quantitatifs $X$ et $Y$ observés sur $n$ individus, ce qui donne une série d'observations sous forme de couples de données $(x_i, y_i)$ pour $i \in \{1, \dots, n\}$. On peut les représenter visuellement par un **nuage de points**.

#### Le Point Moyen $G$ (Centre de gravité de la série) :
Les coordonnées du point moyen $G(\bar{x}, \bar{y})$ correspondent simplement aux moyennes arithmétiques respectives des variables $X$ et $Y$ :
$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i \qquad \bar{y} = \frac{1}{n} \sum_{i=1}^n y_i$$
La droite d'ajustement affine optimale passe **obligatoirement** par ce point moyen $G$.

### 2. Force de l'association linéaire : Covariance & Coefficient de Corrélation

Pour mesurer à quel point la liaison entre les deux variables est linéaire, on calcule l'indicateur appelé covariance.

#### La Covariance $\text{Cov}(X, Y)$ :
$$\text{Cov}(X, Y) = \frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y}) = \left( \frac{1}{n} \sum_{i=1}^n x_i y_i \right) - \bar{x}\bar{y}$$
Cette dernière formulation est le théorème classique de l'analogue de König-Huygens.

#### Le Coefficient de Corrélation Linéaire de Pearson $r$ :
$$r = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}$$
Où $\sigma_X$ et $\sigma_Y$ expriment l'écart-type de chaque variable.
- $r$ est sans unité et compris rigoureusement entre $-1$ et $1$.
- **Si $r \approx 1$** : Très forte corrélation linéaire positive. Les points sont alignés sur une droite de pente descendante positive.
- **Si $r \approx -1$** : Très forte corrélation linéaire négative.
- **Si $r \approx 0$** : Pas de liaison linéaire identifiable entre les deux caractères.
- On considère l'ajustement affine pertinent si $|r| > 0.85$ ou $r^2 \ge 0.75$.

### 3. Droite d'Ajustement des Moindres Carrés (Régression Linéaire de Y en X)

La droite d'ajustement d'équation $y = ax + b$ minimise la somme des carrés des écarts verticaux entre les points réels du nuage et la droite de régression.

#### Calcul des coefficients $a$ (la pente) et $b$ (l'ordonnée à l'origine) :
$$a = \frac{\text{Cov}(X, Y)}{\text{Var}(X)}$$
$$b = \bar{y} - a\bar{x}$$
où $\text{Var}(X)$ est la variance de la variable explicative $X$.

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Quelle est la nuance importante entre correlation et causalité ?</summary>

  C’est un piège d’interprétation classique en gestion et en data science ! Deux variables $X$ et $Y$ peuvent afficher un coefficient de corrélation proche de $1$ ou $-1$ sans qu'il n'y ait aucun lien de cause à effet direct entre elles.  
  Par exemple, le nombre d’incendies déclarés ($X$) et les ventes de glace ($Y$) augmentent simultanément durant les mois les plus chauds de l'été. Il y a corrélation positive, mais aucune causalité directe : la hausse des ventes de glace ne provoque pas les incendies ! Ils sont liés à une variable cachée commune, la météo/chaleur.
</details>

<details>
  <summary>Qu'entend-on par interpolation et extrapolation en prévision budgétaire ?</summary>

  - L'**interpolation** calcule une estimation pour une coordonnée située à l'intérieur des bornes de l'échantillon d'origine (par exemple pour $X = 2.5$). Le calcul présente une fiabilité mathématique très forte.  
  - L'**extrapolation** tente d'estimer un résultat en dehors des valeurs observées du nuage de points, par exemple projeter la tendance vers le futur dans 2 ans. Bien que cela soit très utile, la fiabilité diminue au fur et à mesure que l'on s'éloigne des valeurs réelles d'origine car l'environnement économique ou technique peut changer.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si la moyenne d’une variable publicitaire est de $\bar{x} = 4$ et celle des ventes est de $\bar{y} = 22$. Quelles sont les coordonnées du Point Moyen $G$ ?**
- [ ] $G(22, 4)$
- [x] $G(4, 22)$
- [ ] $G(18, 26)$
> **Explication :** Par définition géométrique, les coordonnées cartésiennes orthogonales du point moyen $G$ correspondent précisément au couple contenant en abscisse la moyenne de la première variable $\bar{x}$ et en ordonnée la moyenne de la seconde variable $\bar{y}$. Ainsi, $G(4, 22)$.

**Question 2 : Si le coefficient de corrélation linéaire de Pearson d'une série publicitaire vaut $r = 0.94$. Que peut-on légitimement conclure pour notre étude prévisionnelle ?**
- [ ] Les deux variables évoluent de manière totalement indienne sans point d'accroche linéaire.
- [x] Il existe une liaison linéaire positive forte, un ajustement affine de tendance est très valide.
- [ ] Il y a une erreur de division par zéro dans le calcul de la covariance.
> **Explication :** Un coefficient $r = 0.94$ est extrêmement proche de la borne supérieure $1$. Cela démontre une corrélation forte entre l'effort consenti pour la pub et l'élévation des ventes du point de vente, justifiant l'application d'une régression rectiligne pour réaliser des prédictions fiables.

**Question 3 : Une droite de régression de ventes en Euros possède pour équation $y = 3x + 12$ où $x$ représente les dépenses marketing. Quel est le chiffre d’affaires estimé pour un budget publicitaire unitaire $x = 10\text{ k€}$ ?**
- [ ] $12\text{ k€}$
- [ ] $30\text{ k€}$
- [x] $42\text{ k€}$ car $3(10) + 12 = 42$
> **Explication :** En injectant la valeur de prévision $x = 10$ dans l'expression mathématique issue de la droite des moindres carrés : $y = 3(10) + 12 = 30 + 12 = 42\text{ k€}$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Représenter graphiquement le nuage de points associé à un tableau de bord budgétaire d'entreprise.
- [ ] Calculer manuellement le point moyen $G$ et s'assurer de sa position géométrique dans le nuage.
- [ ] Calculer la pente et l'ordonnée à l'origine de la droite de régression linéaire à l'aide de formules de covariance et de variance.
- [ ] Réaliser une prédiction de tendance commerciale d'affaires en extrapolant le modèle linéaire calculé.
