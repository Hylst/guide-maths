---
title: 'BUT SD : Régression Linéaire Simple & Moindres Carrés'
level: Post_Bac
subLevel: BUT
order: 24
---
# BUT SD : Régression Linéaire Simple & Moindres Carrés

**Niveau** : Post-Bac (BUT Science des Données / IUT, Licence Économétrie & Data Science)  
**Prérequis** : Covariance, variance, équation de droites affines ($y = ax + b$).  
**Objectifs** :
- Modéliser la relation linéaire d'influence entre deux variables d'analyse continue.
- Estimer les coefficients de droite par la méthode universelle des Moindres Carrés Ordinaires (MCO).
- Évaluer la qualité d'ajustement prédictif de notre modèle grâce au coefficient de détermination ($R^2$).

---

## Activités de découverte

### Activité : Prédire le prix d'un appartement par sa surface
Un agent immobilier d'IUT analyse l'historique des ventes d'appartements d'un même quartier. Il observe deux grandeurs : la surface habitable d'habitation $x$ (en $\text{m}^2$) et le prix d'achat final d'acquisition $y$ (en milliers d'euros).

1. Si on trace chaque appartement sur un graphique bidimensionnel à coordonnées, obtient-on une droite parfaite ? Non, on obtient un **nuage de points** dispersé, car d'autres bruits extérieurs interviennent (étage, état général, exposition).
2. Comment tracer de manière objective la "droite idéale" qui passe au plus près de l'intégralité de tous ces points d'observation ?
3. Comment exploiter l'équation de cette droite moyenne d'ajustement pour estimer de manière fiable le juste prix d'un bien immobilier de $75\text{ m}^2$ qui vient d'entrer en agence ?

Ce problème fondamental d'interpolation prédictive introduit l'outil mathématique capital de la **Régression Linéaire Simple** et de l'optimisation par la méthode des **Moindres Carrés**.

---

## Fondements Théoriques

### 1. Le Modèle de Régression Linéaire Simple

Soit un ensemble de $n$ couples de mesures observées : $(x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)$.  
On suppose qu'il existe une relation d'influence linéaire liant la variable explicative $X$ à la variable cible $Y$ :
$$y_i = a \cdot x_i + b + \varepsilon_i$$

Où :
- $a$ est la pente (le coefficient d'impact unitaire).
- $b$ est l'ordonnée à l'origine (la constante de niveau).
- $\varepsilon_i$ est le terme de d’**erreur résiduelle** (le bruit) représentant l'incapacité du modèle à capturer la réalité exacte.

---

## 🎨 Schéma Pédagogique Interactif : L'ajustement de la Droite de Régression

L'illustration suivante modélise le nuage de points d'observations statistiques dispersées dans le plan. La droite rouge est la droite de régression de repère optimal des Moindres Carrés. Les segments pointillés violets schématisent les résidus d'écarts de prédictions $\varepsilon_i$ dont on cherche à minimiser la somme des carrés.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Ajustement Linéaire par Moindres Carrés (MCO)</text>
  
  <g transform="translate(50, 220)">
    <!-- Axes graphiques -->
    <line x1="0" y1="0" x2="350" y2="0" stroke="#4b5563" stroke-width="2"/>
    <text x="320" y="15" font-family="sans-serif" fill="#9ca3af" font-size="11">X (Surface)</text>
    <line x1="0" y1="0" x2="0" y2="-170" stroke="#4b5563" stroke-width="2"/>
    <text x="-40" y="-150" font-family="sans-serif" fill="#9ca3af" font-size="11" transform="rotate(-90 -40 -150)">Y (Prix)</text>
    
    <!-- Nuage d'observations et résidus -->
    <!-- Point 1 (60, -40) -> Droite est à -50 -->
    <line x1="60" y1="-40" x2="60" y2="-50" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="2,2"/>
    <circle cx="60" cy="-40" r="4.5" fill="#3b82f6"/>
    
    <!-- Point 2 (140, -110) -> Droite est à -90 -->
    <line x1="140" y1="-110" x2="140" y2="-90" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="2,2"/>
    <circle cx="140" cy="-110" r="4.5" fill="#3b82f6"/>
    
    <!-- Point 3 (220, -115) -> Droite est à -130 -->
    <line x1="220" y1="-115" x2="220" y2="-130" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="2,2"/>
    <circle cx="220" cy="-115" r="4.5" fill="#3b82f6"/>
    
    <!-- Point 4 (300, -180) -> Droite est à -170 -->
    <line x1="300" y1="-180" x2="300" y2="-170" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="2,2"/>
    <circle cx="300" cy="-180" r="4.5" fill="#3b82f6"/>
    
    <!-- Droite de Régression Y = ax + b -->
    <!-- Droite passant par (0, -20) et (340, -190) -->
    <line x1="0" y1="-20" x2="340" y2="-190" stroke="#ef4444" stroke-width="3">
      <animate attributeName="stroke" values="#ef4444;#fbbf24;#ef4444" dur="4s" repeatCount="indefinite"/>
    </line>
    <text x="210" y="-150" font-family="sans-serif" fill="#ef4444" font-size="11" font-weight="bold">Droite MCO : Ŷ = aX + b</text>
  </g>
</svg>
</div>

---

### 2. Le Critère des Moindres Carrés Ordinaires (MCO)

Pour trouver les meilleurs coefficients estimateurs $\hat{a}$ et $\hat{b}$, on cherche à minimiser la somme globale des carrés de tous les écarts résiduels observés :
$$\mathcal{S}(a, b) = \sum_{i=1}^{n} \varepsilon_i^2 = \sum_{i=1}^{n} (y_i - (a \cdot x_i + b))^2$$

En annulant les deux dérivées partielles de $\mathcal{S}$ par rapport à $a$ et $b$ (minimisation quadratique standard de L2), on démontre de façon analytique les formules optimales :

#### Pente Estimée $\hat{a}$ :
$$\hat{a} = \frac{\text{Cov}(X, Y)}{\text{Var}(X)} = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n}(x_i - \bar{x})^2}$$

#### Ordonnée Estimée $\hat{b}$ :
La droite passe par le point moyen de gravité du nuage $(\bar{x}, \bar{y})$ :
$$\hat{b} = \bar{y} - \hat{a} \cdot \bar{x}$$

---

### 3. Qualité d'Ajustement et Coefficient de Détermination ($R^2$)

Une fois la droite tracée, l'analyste cherche à évaluer si le modèle linéaire est fidèle ou inefficace pour expliquer les variations.

#### Le Coefficient de Détermination ($R^2$) :
Il s'obtient à partir de la décomposition de la variance (SCT = SCR + SCE) :
$$R^2 = \frac{\text{Somme des Carrés Expliqués (SCE)}}{\text{Somme des Carrés Totaux (SCT)}} = 1 - \frac{\text{Somme des Carrés Résiduels (SCR)}}{\text{Somme des Carrés Totaux (SCT)}}$$

- L'indice $R^2$ est borné strictly par $[0, 1]$.
- Un $R^2 = 0.85$ indique que la surface ou le modélisateurs explique $85\%$ de la variance des prix de vente constatés par rapport au modèle simple unitaire.
- *Propriété simple* : En régression linéaire univariée, $R^2$ est juste égal au carré du coefficient de corrélation linéaire : $R^2 = (\rho_{X,Y})^2$.

---

## Exercices Résolus

### Exercice : Calcul pas-à-pas des coefficients de régression
Un data analyst d'IUT étudie l'effet du temps de révision d'examens $X$ (en heures) sur la note finale obtenue $Y$ (sur 20) auprès d'un échantillon restreint de $n = 5$ étudiants. Les calculs statistiques ont généré les valeurs descriptives suivantes :
- Moyennes : $\bar{x} = 10\text{ h}$, $\bar{y} = 12/20$
- Variances : $\text{Var}(X) = 8$
- Covariance : $\text{Cov}(X, Y) = 6$
1. Calculer les estimateurs de régression des Moindres Carrés $\hat{a}$ et $\hat{b}$.
2. En déduire la note prédite d'un étudiant révisant consciencieusement $14\text{ heures}$.

**Correction Étape par Étape :**
1. **Étape 1 : Calcul de la pente optimale $\hat{a}$**  
   Utilisons la formule classique de droite reliant covariance et variance de la variable source :
   $$\hat{a} = \frac{\text{Cov}(X, Y)}{\text{Var}(X)} = \frac{6}{8} = \mathbf{0.75}$$
   *Interprétation : Chaque heure de révision récurrente injecte en moyenne de d'ajustement 0.75 point de bonus sur la note finale.*

2. **Étape 2 : Calcul de la constante $\hat{b}$**  
   On substitue avec les moyennes observées :
   $$\hat{b} = \bar{y} - \hat{a} \bar{x} = 12 - 0.75 \times 10 = 12 - 7.5 = \mathbf{4.5}$$
   L'équation de régression linéaire estimée s'écrit donc de façon fiable :
   $$\hat{Y} = 0.75 X + 4.5$$

3. **Étape 3 : Application prédictive pour $X = 14$**  
   Substituons la valeur explicative :
   $$\hat{y}_{\text{pred}} = 0.75 \times 14 + 4.5 = 10.5 + 4.5 = \mathbf{15.0}$$
   Conclusion : **La prédiction linéaire attribue statistiquement une note de 15/20 à l'étudiant révisant 14 heures.**

---

## FAQ Étudiante

<details>
  <summary>Qu'entend-on par hypothèse d'homoscédasticité dans la régression ?</summary>

  C’est une des hypothèses vitales de Gauss-Markov ! L'**homoscédasticité** stipule que la variance des erreurs résiduelles $\varepsilon_i$ reste parfaitement homogène et constante sur l'intégralité du domaine explicatif. Si la dispersion des erreurs s'évase ou se tord (par exemple, si les erreurs d'estimations des prix d'appartements sont minimes pour les petites surfaces mais énormes pour les grands lofts), on parle d'hétéroscédasticité, ce qui nécessite des corrections par Moindres Carrés Pondérés.
</details>

<details>
  <summary>Peut-on suspecter que corrélation implique causalité directe ?</summary>

  **Absolument pas !** C'est le piège numéro 1 de la statistique et du journalisme grand public. Une corrélation élevée (même avec $R^2 \approx 1$) peut s'expliquer par un effet de coïncidence pure, ou par une variable cachée commune (effet de confusion). Par exemple, la vente de glaces et les coups de soleil sont corrélés de manière extrêmement forte. Pourtant, manger des glaces ne génère pas de brûlures de peau : les deux phénomènes sont causés par une tierce variable unificatrice : la chaleur du soleil.
</details>

<details>
  <summary>Quelle est la particularité moyenne d'un vecteur de résidus après ajustement MCO ?</summary>

  Par construction mathématique, la somme algébrique brute (et donc la moyenne unitaire) de l'intégralité de tous les résidus cumulés d'un ajustement linéaire MCO avec constante est **rigoureusement égale à zéro** :  
  $$\sum_{i=1}^{n} \hat{\varepsilon}_i = 0$$
  Le modèle compense de lui-même de manière parfaite les surestimations locales par des sous-estimations d'erreurs.
</details>

---

## 📝 Mini-Quiz

**Question 1 : La méthode d'estimation des Moindres Carrés Ordinaires consiste à minimiser :**
- [ ] La somme brute des écarts résiduels absolus
- [x] La somme globale des carrés des résidus d'erreurs (SCR)
- [ ] La variance explicative de la variable cible
> **Explication :** On élève à la puissance 2 (le carré) chacun de nos écarts résiduels pour éliminer les compensations de signes et pénaliser de façon accrue les erreurs majeures de prédictions éloignées.

**Question 2 : Une valeur de coefficient de détermination de R² = 0.96 implique que :**
- [ ] Il y a exactement 96 observations au sein du jeu de données
- [ ] Seules 4.0% des prédictions commettent des erreurs absolues
- [x] Le modèle d'ajustement linéaire explique 96.0% de la dispersion totale de la variable d'étude
> **Explication :** C’est la définition quantitative même du coefficient. L'indicateur traduit de manière transparente la fraction de la variance totale expliquée par l'enveloppe explicative linéaire.

**Question 3 : Comment s'aligne la droite MCO par rapport au point moyen de gravité (X̄, Ȳ) de nos données ?**
- [ ] Elle passe scrupuleusement au-dessus de lui à une distance de sécurité de 10 unités
- [x] Elle passe de façon imperturbable et exacte par ce centre de gravité
- [ ] Elle l'évite car ce point est instable
> **Explication :** La CPO unilatérale d'annulation par rapport à la constante $b$ de dérivation impose que $b = \bar{Y} - a\bar{X}$, ce qui équivaut mathématiquement à l'ancrage de la droite sur ce point de coordonnées moyennes.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Formuler le modèle statistique de régression simple intégrant le terme de d’erreur résiduelle.
- [ ] Calculer manuellement les estimateurs des Moindres Carrés $\hat{a}$ et $\hat{b}$ de données univariées de variances.
- [ ] Évaluer le coefficient de détermination $R^2$ pour diagnostiquer la qualité prédictive d'un modèle d'ajustement.
- [ ] Formuler des équations de prédictions quantitatives et lister les limites d'interprétation causale standard.
