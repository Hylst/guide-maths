---
title: 'BUT SD : Analyse en Composantes Principales (ACP)'
level: Post_Bac
subLevel: BUT
order: 26
---
# BUT SD : Analyse en Composantes Principales (ACP)

**Niveau** : Post-Bac (BUT Science des Données / BUT Informatique, Master Data Science, Écoles d'Ingénieurs)  
**Prérequis** : Algèbre linéaire (Calcul matriciel, diagonalisation), Statistique descriptive (variance, covariance).  
**Objectifs** :
- Comprendre les fondements théoriques et géométriques de la réduction de dimension par l'ACP.
- Savoir centrer et réduire une matrice d'observations statistiques.
- Interpréter le cercle des corrélations, les valeurs propres, et déterminer l'inertie cumulée capturée par les composantes principales.

---

## Activités de découverte

### Activité : Synthétiser les caractéristiques d'un parc immobilier
Un Cabinet de d'Analyse Économique étudie $N = 100$ appartements à Paris. Pour chaque bien, on relève d'innombrables caractéristiques : $x_1$ (surface en $\text{m}^2$), $x_2$ (nombre de pièces), $x_3$ (loyer mensuel), $x_4$ (distance au métro le plus proche).  
Nous sommes face à un jeu de données à 4 dimensions ($p = 4$). Visualiser ce nuage d'individus dans un espace 4D est physiologiquement impossible pour l'être humain.
1. Parmi ces 4 variables, lesquelles ont de fortes chances d'être fortement corrélées (qui varient ensemble) ?
2. Pouvons-nous concevoir une seule variable fictive globale synthétique $F_1$, appelée **"Indicateur de Prestige / Grandeur"**, qui combinerait le loyer, la surface et le nombre de pièces ?
3. Comment tracer de manière rigoureuse un graphique plan en 2D pour projeter nos appartements de la façon la plus fidèle possible, c'est-à-dire en évitant que les points ne se superposent tous au centre ?

C'est exactement le rôle de l'**Analyse en Composantes Principales (ACP)**. Elle projette le nuage $4\text{D}$ sur un sous-espace $2\text{D}$ optimal en minimisant l'écrasement ou la déformation des distances d'origine.

---

## Fondements Théoriques

### 1. Centrage et Réduction des données de départ
Pour éviter que les variables ayant de grandes valeurs physiques (par exemple, le loyer en euros, valant des milliers) n'écrasent artificiellement les variables plus petites (le nombre de pièces, valant de 1 à 5), on doit transformer les données initiales $X$ en données centrées-réduites $Z$ :

$$z_{ij} = \frac{x_{ij} - \bar{x}_j}{\sigma_j}$$

- $\bar{x}_j$ est la moyenne arithmétique de la variable $j$.
- $\sigma_j$ est l'écart-type de la variable $j$.

Dans cette nouvelle matrice $Z$, chaque colonne a une moyenne nulle ($\mu = 0$) et un écart-type unitaire ($\sigma = 1$).

### 2. La Matrice de Corrélation et ses Valeurs Propres
La recherche des directions d'étirement maximum du nuage de points revient à étudier la matrice de covariance des données centrées-réduites, qui n'est autre que la **matrice de corrélation linéaire $R$** :

$$
R = \frac{1}{N} Z^T Z = \begin{pmatrix}
1 & r_{12} & \dots & r_{1p} \\
r_{21} & 1 & \dots & r_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
r_{p1} & r_{p2} & \dots & 1 
\end{pmatrix}
$$

Cette matrice symétrique réelle de dimensions $p \times p$ est diagonalisable. 
Ses valeurs propres $\lambda_1 \geq \lambda_2 \geq \dots \geq \lambda_p \geq 0$ correspondent à l'**inertie** (la quantité d'information ou de variance) capturée par les nouveaux axes factoriels.

#### Préservation de l'Inertie Totale :
La somme totale des valeurs propres est strictement égale au nombre initial de variables étudiées :
$$\sum_{j=1}^p \lambda_j = p$$

---

## 🎨 Schéma Pédagogique Interactif : Changement de Repère Factoriel (ACP)

Le schéma illustre la rotation optimale effectuée par l'ACP à partir d'un nuage de points corrélés d'origine (en orange, inclinés sur l'axe surface-prix). Les nouveaux axes factoriels $F_1$ (rouge) et $F_2$ (vert) s'alignent parfaitement le long des directions d'étirement maximal (le grand diamètre et le petit diamètre de l'ellipse d'inertie).

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:16px; border: 1px solid #1e293b;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#38bdf8" font-size="15" text-anchor="middle">Inertie et Projection sur les Axes Factoriels</text>
  
  <g transform="translate(180, 160)">
    <!-- Ellipse d'inertie inclinée -->
    <g transform="rotate(-30)">
      <ellipse cx="0" cy="0" rx="140" ry="40" fill="#38bdf8" fill-opacity="0.08" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5,4" />
      
      <!-- Nouveau repère factoriel ACP -->
      <!-- Premier Axe Factoriel F1 -->
      <line x1="-160" y1="0" x2="160" y2="0" stroke="#f43f5e" stroke-width="2.5" marker-end="url(#arrow_f1)"/>
      <text x="145" y="-12" font-family="sans-serif" fill="#f43f5e" font-weight="bold" font-size="11">Axe F1 (85% d'inertie)</text>
      
      <!-- Deuxième Axe Factoriel F2 -->
      <line x1="0" y1="-70" x2="0" y2="70" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow_f2)"/>
      <text x="10" y="-55" font-family="sans-serif" fill="#10b981" font-weight="bold" font-size="11">Axe F2</text>
      
      <!-- Points projetés sur F1 -->
      <circle cx="-100" cy="0" r="4" fill="#f43f5e"/>
      <circle cx="-50" cy="0" r="4" fill="#f43f5e"/>
      <circle cx="20" cy="0" r="4" fill="#f43f5e"/>
      <circle cx="90" cy="0" r="4" fill="#f43f5e"/>
    </g>

    <!-- Nuage d'individus réels (points dispersés) -->
    <circle cx="-80" cy="30" r="5" fill="#f59e0b"/>
    <circle cx="-50" cy="15" r="5" fill="#f59e0b"/>
    <circle cx="-20" cy="-20" r="5" fill="#f59e0b"/>
    <circle cx="10" cy="10" r="5" fill="#f59e0b"/>
    <circle cx="40" cy="-30" r="5" fill="#f59e0b"/>
    <circle cx="80" cy="-15" r="5" fill="#f59e0b"/>
    <circle cx="100" cy="-55" r="5" fill="#f59e0b"/>
    <circle cx="-110" cy="50" r="5" fill="#f59e0b"/>

    <!-- Anciens axes (Surface / Prix) d'origine -->
    <line x1="-150" y1="20" x2="150" y2="20" stroke="#475569" stroke-width="1.5" stroke-opacity="0.6"/>
    <text x="120" y="35" font-family="sans-serif" fill="#64748b" font-size="9" font-style="italic">Axe d'origine X1 (Surface)</text>
    <line x1="-120" y1="-100" x2="-120" y2="80" stroke="#475569" stroke-width="1.5" stroke-opacity="0.6"/>
    <text x="-115" y="-85" font-family="sans-serif" fill="#64748b" font-size="9" font-style="italic" transform="rotate(-90 -115 -85)">Axe d'origine X2 (Prix)</text>
  </g>
  
  <defs>
    <marker id="arrow_f1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e"/>
    </marker>
    <marker id="arrow_f2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/>
    </marker>
  </defs>
</svg>
</div>

---

## Exercices Résolus

### Exercice 1 : Interprétation d'un tableau d'inertie (Critère d'Eboulis)
Dans le cadre d'un BUT Science des Données, on réalise une ACP sur un jeu de données de $p = 6$ variables d'études financières. La décomposition de diagonalisation de la matrice de corrélation fournit les valeurs propres ci-dessous :

| Axe factoriel | Valeur propre ($\lambda_k$) |
| :--- | :--- |
| **Axe $F_1$** | $3.24$ |
| **Axe $F_2$** | $1.42$ |
| **Axe $F_3$** | $0.68$ |
| **Axe $F_4$** | $0.41$ |
| **Axe $F_5$** | $0.18$ |
| **Axe $F_6$** | $0.07$ |

1. Calculez la variance totale initiale de cette analyse.
2. Déterminez la part d'inertie (le pourcentage de variance) capturée par les deux premiers axes factoriels $F_1$ and $F_2$.
3. En déduire s'il est statistiquement acceptable de réduire l'étude à ce seul plan de projection bidimensionnel.

**Correction Étape par Étape :**
1. **Étape 1 : Calcul de la variance totale du jeu d'observations**  
   Les données étant centrées-réduites, chaque colonne possède une variance exacte de $1$. L'inertie totale équivaut à la somme des variances individuelles des colonnes, soit le nombre global de variables $p$ :
   $$\text{Inertie Totale} = \sum_{j=1}^6 \lambda_j = 3.24 + 1.42 + 0.68 + 0.41 + 0.18 + 0.07 = 6.00$$
   On retrouve bien la trace arithmétique de la matrice de corrélation qui vaut $p = 6$.

2. **Étape 2 : Calcul des taux d'inertie des deux premiers axes**  
   - Pour le premier axe $F_1$ :
     $$\tau_1 = \frac{\lambda_1}{p} = \frac{3.24}{6.00} = 0.54 \implies 54.0\%$$
   - Pour le deuxième axe $F_2$ :
     $$\tau_2 = \frac{\lambda_2}{p} = \frac{1.42}{6.00} \approx 0.2367 \implies 23.67\%$$
   - L'inertie cumulée sur ce premier plan principal de projection vaut :
     $$\tau_{\text{cumulé}} = 54.0\% + 23.67\% = \mathbf{77.67\%}$$

3. **Étape 3 : Conclusion de modélisation**  
   Plus des trois quarts (77.67%) de l'information multidimensionnelle globale de nos 6 variables d'origine sont intégralement préservés sur un simple graphique en 2D. En ne retenant que les axes $F_1$ et $F_2$, nous réalisons une réduction de dimension drastique (de 6D à 2D) tout en perdant seulement 22.33% du bruit résiduel. Ce choix est donc hautement validé d'un point de vue de l'exploration des données.

### Exercice 2 : Qualité de représentation individuelle ($\cos^2 \theta$)
L'analyse statistique de l'individu individuel $i$ (un appartement type) donne les coordonnées factorielles suivantes sur les axes factoriels principaux :  
$F_1(i) = -2.10$ and $F_2(i) = 0.80$.  
La distance quadratique totale de cet individu au centre de gravité général du nuage d'origine équivaut à $d^2(i, g) = 5.50$.
1. Calculez la qualité de représentation globale de cet individu sur le plan d'analyse principal $F_1 \times F_2$.

**Correction Étape par Étape :**
1. **Étape 1 : Comprendre la formule de cosinus carré ($\cos^2$)**  
   La qualité de représentation d'un point-individu sur un axe factoriel $k$ se mesure par le carré du cosinus de l'angle $\theta$ formé entre le vecteur d'origine et l'axe de projection. Elle s'évalue sous la forme du ratio de distance projetée sur distance totale réelle :
   $$\cos^2(\theta_1) = \frac{F_1(i)^2}{d^2(i, g)} \quad \text{and} \quad \cos^2(\theta_2) = \frac{F_2(i)^2}{d^2(i, g)}$$

2. **Étape 2 : Application arithmétique**  
   Évaluons la contribution pour chaque axe :
   - Sur l'axe $F_1$ :
     $$\cos^2(\theta_1) = \frac{(-2.10)^2}{5.50} = \frac{4.41}{5.50} \approx \mathbf{0.8018 \quad (80.18\%)}$$
   - Sur l'axe $F_2$ :
     $$\cos^2(\theta_2) = \frac{(0.80)^2}{5.50} = \frac{0.64}{5.50} \approx \mathbf{0.1164 \quad (11.64\%)}$$
   - Cumul sur le plan d'étude complet $F_1 \times F_2$ :
     $$\cos^2(\theta_{1 \times 2}) = 80.18\% + 11.64\% = \mathbf{91.82\%}$$

3. **Étape 3 : Analyse critique**  
   La valeur est très proche de $1$ ($91.82\%$). Cet appartement est donc particulièrement bien "représenté" sur ce plan. On peut interpréter sa projection de façon hautement fiable sans craindre qu'il ne s'agisse d'un effet d'illusion de perspective lié à l'écrasement de la 3D ou 4D.

---

## FAQ Étudiante

<details>
  <summary>Pourquoi est-il absolument CRUCIAL de centrer et réduire nos variables statistiques avant de calculer l'ACP ?</summary>

  Si vous n'effectuez pas de réduction, les variables possédant de fortes variances numériques d'unités (comme les prix en milliers d'euros) vont polariser et attirer à elles de manière infondée les calculs de matrice d'inertie. Les vecteurs propres s'aligneraient uniquement sur ces variables de forte échelle, négligeant les variables en petites échelles pourtant fondamentales (votre taux d'intérêt, l'indice d'ensoleillement...).
</details>

<details>
  <summary>Qu'est-ce que le cercle de corrélation de l'ACP et comment l'interprétons-nous ?</summary>

  C'est une fenêtre d'interprétation des variables initiales projetées sur le cercle de rayon $R = 1$.  
  - Si deux variables sont très proches l'une de l'autre sur la périphérie du cercle, elles sont **fortement corrélées positivement**.  
  - S'elles s'orientent à l'opposé diamétralement, elles sont **fortement décorrélées ou corrélées négativement** ($r \approx -1$).  
  - S'elles se positionnent à angle droit ($90^\circ$), elles sont **indépendantes statistiquement** (liaison nulle).
</details>

<details>
  <summary>Quel critère devons-nous utiliser pour arrêter de créer des axes factoriels ?</summary>

  Il existe deux méthodes majeures :  
  1. **Le critère de Kaiser** (le plus universel) : Conserver uniquement les axes factoriels dont la valeur propre s'évalue strictement supérieure à $1$ ($\lambda_k > 1$). En effet, un axe factoriel doit au moins contenir plus d'information qu'une variable unitaire standard brute.  
  2. **Le critère du Coude** : Tracer visuellement l'éboulement décroissant des valeurs propres et couper juste après la cassure de pente la plus prononcée.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si la somme de toutes les valeurs propres issues d'une ACP contenant 5 variables d'observations vaut S = 5, cela confirme que :**
- [ ] L'ACP a échoué car la variance s'est disloquée
- [x] Les données ont été scrupuleusement réduites et centrées au préalable (p = 5)
- [ ] Une seule et unique valeur propre contient 100% de l'information de base
> **Explication :** La corrélation centrée-réduite attribue une variance exacte de $1$ à chaque colonne. Ainsi, la trace du système linéaire vaut $5$. Par conservation linéaire lors de la diagonalisation, la somme des valeurs propres doit obligatoirement valoir $5$.

**Question 2 : Que signifie une variable positionnée très proche du centre géométrique (0,0) à l'intérieur du cercle des corrélations ?**
- [ ] Que la variable possède une corrélation suprême avec tous les axes à la fois
- [ ] Qu'elle n'est pas centrée
- [x] Que la qualité de représentation de cette variable (cos²θ) sur ce plan de projection est très mauvaise
> **Explication :** Plus une variable projetée est éloignée de la circonférence de rayon $1$ du cercle, plus sa reconstruction par projection sur le plan est instable et incomplète. Sa variance s'exprime sur des axes factoriels supérieurs non représentés dans l'analyse présente.

**Question 3 : L'ACP est-elle un algorithme statistique d'apprentissage supervisé ou non supervisé ?**
- [ ] Supervisé, car elle cherche à maximiser la prédiction de classes cibles pré-étiquetées
- [x] Non supervisé, car elle explore structurellement la structure interne géométrique globale du nuage sans attribuer de labels privilégiés ou de variables cibles à estimer
- [ ] C'est un test d'hypothèse purement paramétrique
> **Explication :** L'ACP ne contient aucune variable dite "cible" ou d'étiquetage d'entraînement. C'est une technique pure d'exploration multidimensionnelle cherchant de manière globale des régularités géométriques passives sur un jeu de données brut.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Maîtriser le processus calculatoire rigoureux de recentrage-réduction des vecteurs de données statistiques brutes.
- [ ] Extraire les valeurs propres de corrélation statistique et les trier pour dégager les composantes principales.
- [ ] Exploiter à l'aide des cosinus de projection la pertinence géométrique de la reconstruction d'individus sur le plan factoriel.
- [ ] Analyser de bout en bout un cercle de corrélation pour extraire les liaisons complexes de variables réelles.
