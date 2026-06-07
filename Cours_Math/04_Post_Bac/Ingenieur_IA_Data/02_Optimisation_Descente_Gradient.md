---
title: 'Écoles d''Ingénieurs : Optimisation Convexe & Descente de Gradient'
level: Post_Bac
subLevel: Ingenieur_IA_Data
order: 2
---
# Écoles d'Ingénieurs : Optimisation Convexe & Descente de Gradient

**Niveau** : Post-Bac (Écoles d'Ingénieurs L3-M1, M2 Data Science, Master Recherche Opérationnelle)  
**Prérequis** : Calcul de gradients vectoriels, espaces normés de Banach, matrices symétriques et valeurs propres.  
**Objectifs** :
- Caractériser les fonctions convexes de plusieurs variables réelles à l'aide de leur matrice Hessienne.
- Identifier théoriquement les extrema d'une fonction avec ou sans contraintes d'égalité.
- Formuler et implémenter l'Algorithme de la Descente de Gradient (Gradient Descent) pour minimiser une fonction de coût.
- Analyser l'impact du pas d'apprentissage (learning rate) sur la vitesse d'apprentissage et la convergence du modèle.

---

## Activités de découverte

### Activités : Trouver le fond d'une vallée brumeuse les yeux bandés
Imaginez que vous soyez parachuté au milieu d'une chaîne de montagnes plongée dans un brouillard si dense que vous ne pouvez pas voir à plus d'un mètre autour de vous. Votre objectif est de rejoindre le point le plus bas de la vallée (le minimum global de relief). Vous avez les yeux bandés, mais vous possédez un capteur d'inclinaison très précis sous vos pieds.

Quelle stratégie adopter ?
1. En restant immobile, vous palpez le sol pour déterminer la direction où la pente descend le plus fort localement.
2. Vous faites un pas prudent dans cette direction descendante directe.
3. Vous vous arrêtez, évaluez de nouveau l'inclinaison du sol, et répétez indéfiniment le processus.

Si la topologie de la montagne est "gentille" (convexe, ressemblant à un bol parfait), cette approche intuitive vous mènera inéluctablement tout au fond de la vallée !
En intelligence artificielle, la montagne représente la **fonction de perte (loss function)** du réseau de neurones, vos pas correspondent aux ajustements des paramètres (poids), et l'inclinaison du sol est le **gradient**. Bienvenue dans l'univers de la **Descente de Gradient**, l'algorithme d'optimisation universel qui entraîne les modèles d'IA !

---

## Fondements Théoriques

### 1. Convexité et Caractérisation par la Matrice Hessienne

Une fonction $f : \mathbb{R}^n \to \mathbb{R}$ de classe $C^2$ est **convexe** si son graphe est situé au-dessus de son plan tangent en tout point, ou de façon équivalente si son segment d'interpolation ne coupe pas le domaine épigraphe.

#### La Matrice Hessienne $H_f(x)$ :
C'est la matrice symétrique construite à partir des dérivées partielles secondes de la fonction :
$$H_f(x)_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$$

#### Critère de convexité :
$$f \text{ est convexe } \iff \forall x \in \mathbb{R}^n, \ H_f(x) \text{ est une matrice semi-définie positive}$$
Une matrice symétrique $H$ est semi-définie positive si toutes ses valeurs propres réelles sont supérieures ou égales à zéro ($\lambda_i \ge 0$).

### 2. Extrema locaux : Conditions d'Optimalité d'Ordre Supérieur

Soit $f : \mathbb{R}^n \to \mathbb{R}$ de classe $C^2$. Un point $x^*$ est dit **critique (ou stationnaire)** de $f$ si son vecteur gradient s'y annule :
$$\vec{\nabla} f(x^*) = \vec{0}$$

- **Minimum local** : Si $x^*$ est un point critique et que la matrice Hessienne $H_f(x^*)$ est définie positive (valeurs propres $\lambda_i > 0$).
- **Maximum local** : Si la Hessienne est définie négative ($\lambda_i < 0$).
- **Point Selle (col)** : S'il y a à la fois des valeurs propres positives et négatives.

Si la fonction $f$ est rigoureusement **convexe**, tout point critique $x^*$ est de façon absolue le **minimum global** de la fonction.

### 3. L'Algorithme de la Descente de Gradient

Pour minimiser une fonction de coût différentiable $f(x)$, on part d’un vecteur initial $x^{(0)} \in \mathbb{R}^n$ choisi aléatoirement, et on construit de manière itérative la suite de points suivante :
$$x^{(k+1)} = x^{(k)} - \eta \ \vec{\nabla} f(x^{(k)})$$
où $\eta > 0$ s'appelle le **pas d'apprentissage (learning rate)**. On avance dans la direction opposée au gradient pour descendre la courbe de coût.

```
Algorithme de Descente de Gradient :
    Initialiser x^(0), tolérance epsilon, pas d'apprentissage eta, maximum d'itérations MaxIter
    Pour k allant de 0 à MaxIter do:
        Calculer le vecteur gradient G = Nabla f(x^(k))
        Si ||G|| < epsilon alors retourner la solution optimale x^(k)
        Mettre à jour les paramètres : x^(k+1) = x^(k) - eta * G
    Retourner x^(MaxIter)
```

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Comment choisir la valeur du pas d'apprentissage η (learning rate) ?</summary>

  C’est un choix hyperparamétrique crucial en ingénierie de l'IA !  
  - **Si $\eta$ est trop petit** : L’algorithme fait de minuscules pas de fourmi. La convergence sera extrêmement lente et gourmande en ressources de calcul CPU/GPU.  
  - **Si $\eta$ est trop grand** : L'algorithme fait des bonds géants. Il risque d'osciller de part et d'autre de la vallée sans jamais converger, voire de diverger complètement vers l'infini.  
  En pratique, on utilise des variantes à pas adaptatif (comme Adam, RMSprop) qui ajustent $\eta$ dynamiquement au cours de l'apprentissage.
</details>

<details>
  <summary>Qu'est-ce que la Descente de Gradient Stochastique (SGD) ?</summary>

  En Deep Learning, calculer le vrai gradient sur des millions de données simultanées (Batch) au cours de chaque itération est impossible en mémoire. Dans la **Descente de Gradient Stochastique**, on estime le gradient sur une seule donnée (ou un mini-lot, *mini-batch*, de quelques dizaines d'images). Le calcul devient ultra-rapide et l'algorithme converge efficacement en introduisant un bruit bénéfique pour sauter hors des minima locaux sous-optimaux.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Soit la fonction $f(x, y) = x^2 + y^2$. Quel est le vecteur gradient de cette fonction au point de coordonnées $(3, 4)$ ?**
- [ ] $\vec{\nabla} f = (3, 4)^T$
- [x] $\vec{\nabla} f = (6, 8)^T$ car la dérivée est $(2x, 2y)^T$
- [ ] $\vec{\nabla} f = (9, 16)^T$
> **Explication :** Les dérivées partielles sont $\frac{\partial f}{\partial x} = 2x$ et $\frac{\partial f}{\partial y} = 2y$. Au point $(3, 4)$, on évalue : $2(3) = 6$ et $2(4) = 8$. Le gradient est donc $(6, 8)^T$.

**Question 2 : Si au cours d'une itération de descente de gradient, le gradient mesuré est $\vec{\nabla} f = (10, -5)^T$ et le pas d'apprentissage $\eta = 0.1$. Quel est le vecteur de déplacement d'ajustement $-\eta \vec{\nabla} f$ ?**
- [ ] $(1, 0.5)^T$
- [x] $(-1, 0.5)^T$ car la mise à jour soustrait le gradient mis à l'échelle
- [ ] $(-1, -0.5)^T$
> **Explication :** La formule de déplacement est $-\eta \ \vec{\nabla} f = -0.1 \times (10, -5)^T = (-1, 0.5)^T$. On déplace donc la variable en diminuant sa coordonnée $x$ de 1 et en augmentant sa coordonnée $y$ de 0.5.

**Question 3 : Une fonction $f$ possède un point critique $x^*$ où sa matrice Hessienne admet pour valeurs propres réelles $\lambda_1 = 5$ et $\lambda_2 = -3$. Que s'y passe-t-il géométriquement ?**
- [ ] C'est un minimum local parfait du coût
- [ ] C'est un maximum local du coût
- [x] C'est un point selle (col), le gradient s'annule mais la fonction monte dans un sens et descend dans l'autre
> **Explication :** Comme la Hessienne a des valeurs propres de signes opposés, la matrice n'est ni définie positive ni définie négative. Le point stationnaire $x^*$ est donc un point selle (ou point col), caractérisé par des directions planes de descente et d'autres de montée.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Construire la matrice Hessienne d’une fonction multivariable et déterminer sa convexité par recherche de valeurs propres positives.
- [ ] Identifier l'intégralité des points critiques d'une fonction et classifier leur nature géométrique (minimum, maximum, selle).
- [ ] Mener à bien manuellement les premières itérations de calcul de la descente de gradient sur une fonction quadratique simple.
- [ ] Expliquer précisément le comportement divergent ou oscillatoire induit par un surdimensionnement du pas d'apprentissage (learning rate).
