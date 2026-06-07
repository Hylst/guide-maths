---
title: 'Écoles d''Ingénieurs : Fondements Mathématiques du Deep Learning & Rétropropagation'
level: Post_Bac
subLevel: Ingenieur_IA_Data
order: 3
---
# Écoles d'Ingénieurs : Fondements Mathématiques du Deep Learning & Rétropropagation

**Niveau** : Post-Bac (Écoles d'Ingénieurs M1-M2, Master IA, Spécialisation Informatique/Calcul Scientifique)  
**Prérequis** : Dérivées partielles, calcul matriciel multidimensionnel, dérivation de fonctions composées (Chain Rule).  
**Objectifs** :
- Modéliser mathématiquement le fonctionnement d'un neurone artificiel et d'un réseau multi-couches (MLP).
- Comprendre le rôle des fonctions d'activation (Sigmoïde, ReLU, Softmax) pour introduire de la non-linéarité.
- Dériver formellement l'Algorithme de Rétropropagation du Gradient (Backpropagation) par dérivation chainée.
- Exprimer les équations matricielles complètes des passes avant (Forward) et arrière (Backward).

---

## Activités de découverte

### Activités : Dessiner les contours de décision d'un réseau neuronal
Le cerveau humain apprend en ajustant l'intensité des connexions synaptiques entre ses neurones. Pour imiter ce prodige de façon logicielle, nous programmons des neurones artificiels connectés en couches.
Un neurone reçoit des entrées ($X$), leur applique des poids ($W$), rajoute un biais ($b$), puis fait passer le tout dans une fonction d'activation non linéaire (comme l'interrupteur biologique).

Imaginez que vous vouliez séparer des photos de chats d'images de chiens. Un simple modèle linéaire (une droite) échouera car la frontière de décision est tortueuse.
En empilant plusieurs couches de neurones, on introduit des pliages dans l'espace de données, permettant de tracer des frontières de décision incroyablement complexes !

Comment paramétrer automatiquement les millions de poids $W_{ij}$ du réseau à partir des erreurs commises sur les images ?
On utilise la **Rétropropagation du Gradient**. L'erreur commise sur la sortie est calculée, puis "remonte" le réseau couche après couche de la fin vers le début, en distribuant à chaque neurone la rétro-responsabilité de son erreur grâce à la dérivation en chaîne !

---

## Fondements Théoriques

### 1. Modélisation Mathématique d'un Neurone et d'un Couche

Un réseau de neurones artificiels (Multi-Layer Perceptron ou MLP) est une fonction composée géante différentiable.

#### Le Neurone Artificiel (Perceptron) :
Soit un vecteur d'entrées $x \in \mathbb{R}^d$. Le neurone calcule une combinaison affine suivie d'une fonction d'activation non linéaire $\sigma$ :
$$a = \sigma\left( \sum_{i=1}^d w_i x_i + b \right) = \sigma(w^T x + b)$$
où $w \in \mathbb{R}^d$ est le vecteur des poids et $b$ le biais scalaire.

#### Couche dense de neurones $l$ :
Pour une couche $l$ prenant en entrée le vecteur d'activation $a^{(l-1)}$ de la couche précédente :
$$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$$
$$a^{(l)} = \sigma(z^{(l)})$$
où $W^{(l)}$ est la matrice des poids de la couche $l$, et $b^{(l)}$ le vecteur des biais.

### 2. Fonctions d'Activation Usuelles

La non-linéarité est requise ; sans elle, l'empilement de couches denses matricielles ne serait qu'une simple transformation linéaire de plus.

- **Sigmoïde** : $\quad \sigma(z) = \frac{1}{1 + e^{-z}}$ (sort sur l'intervalle $]0, 1[$, idéale pour des probabilités). Sa dérivée est remarquable : $\sigma'(z) = \sigma(z)(1 - \sigma(z))$.
- **ReLU (Rectified Linear Unit)** : $\quad \text{ReLU}(z) = \max(0, z)$ (évite la saturation des gradients lors de l'entraînement).
- **Softmax** (Couche de sortie multi-classes) : $\quad \text{Softmax}(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}$ (produit une distribution de probabilité sommable à 1).

### 3. L'Algorithme de Rétropropagation du Gradient (Backpropagation)

Soit une fonction de coût (Loss) $L(a^{(L)}, y)$ où $a^{(L)}$ est l'activation de la dernière couche de prédiction et $y$ la cible réelle.
Pour mettre à jour les poids par descente de gradient, nous devons calculer le gradient de $L$ par rapport aux poids de chaque couche, $\frac{\partial L}{\partial W^{(l)}}$.

#### La Règle de Dérivation en Chaîne (Chain Rule) :
Pour une variable intermédiaire $z^{(l)}$ :
$$\delta^{(l)} = \frac{\partial L}{\partial z^{(l)}}$$
L'erreur locale $\delta^{(l)}$ se calcule de manière rétrograde à partir des couches supérieures.

#### Équations fondamentales de la Rétropropagation :
1. **Erreur de la couche de sortie $L$** :
$$\delta^{(L)} = \vec{\nabla}_{a} L \odot \sigma'(z^{(L)})$$
où $\odot$ est le produit de Hadamard (composante par composante).
2. **Rétropropagation de l'erreur d'une couche supérieure** :
$$\delta^{(l)} = \left( (W^{(l+1)})^T \delta^{(l+1)} \right) \odot \sigma'(z^{(l)})$$
3. **Gradient par rapport aux paramètres de la couche $l$** :
$$\frac{\partial L}{\partial W^{(l)}} = \delta^{(l)} (a^{(l-1)})^T$$
$$\frac{\partial L}{\partial b^{(l)}} = \delta^{(l)}$$

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Qu'est-ce que le problème de disparition du gradient (vanishing gradient) ?</summary>

  C’est un obstacle historique majeur de l'IA résolu par la fonction ReLU !  
  Lorsque l'on entraîne des réseaux très profonds avec la fonction d'activation **Sigmoïde**, sa dérivée $\sigma'(z) = \sigma(z)(1-\sigma(z))$ est toujours comprise entre $0$ et $0.25$.  
  Lors de la rétropropagation, on multiplie ces termes de nombreuses fois (Chain Rule). Le gradient final s'effondre de façon exponentielle vers $0$. Les premières couches ne reçoivent plus aucune mise à jour et n'apprennent rien. ReLU résout cela car sa dérivée vaut $1$ pour toutes les entrées positives.
</details>

<details>
  <summary>Comment l'initialisation des poids impacte-t-elle la rétropropagation ?</summary>

  Si tous les poids du réseau de neurones sont initialisés à $0$ ou à la même valeur positive, tous les neurones d'une même couche effectueront exactement le même calcul et recevront le même gradient lors de la rétropropagation. Ils resteront perpétuellement identiques (problème de symétrie).  
  Pour surmonter cela, on initialise les poids de façon aléatoire à l'aide de distributions spécifiques calculées selon le nombre d'entrées et de sorties d'une couche (initialisation de Xavier de Glorot ou He).
</details>

---

## 📝 Mini-Quiz

**Question 1 : Quelle est la dérivée de la fonction d’activation Sigmoïde $\sigma(z) = \frac{1}{1 + e^{-z}}$ exprimée en fonction d'elle-même ?**
- [ ] $\sigma'(z) = \sigma(z)^2$
- [x] $\sigma'(z) = \sigma(z)(1 - \sigma(z))$ car cela découle directement des règles de dérivation d'un quotient
- [ ] $\sigma'(z) = 1 - \sigma(z)$
> **Explication :** En dérivant la fonction $\sigma(z) = (1 + e^{-z})^{-1}$, nous obtenons : $\sigma'(z) = -(-e^{-z})(1 + e^{-z})^{-2} = \frac{e^{-z}}{(1 + e^{-z})^2}$. On peut réécrire cette fraction sous la forme : $\frac{1}{1 + e^{-z}} \times \frac{e^{-z}}{1 + e^{-z}} = \sigma(z) \times (1 - \sigma(z))$, une propriété très élégante en programmation informatique.

**Question 2 : En faisant passer une image de chat dans un réseau, la fonction de coût s'obtient par la comparaison de la prédiction finale et de la cible réelle. Comment appelle-t-on cette phase initiale de transmission d'information ?**
- [ ] La passe rétrograde (Backward pass)
- [x] La passe avant (Forward pass)
- [ ] La descente stochastique de Fourier
> **Explication :** La transmission de l'information s'effectuant de l'entrée du réseau vers la sortie finale au travers de toutes les couches s'appelle la passe avant (ou Forward pass). Elle calcule toutes les activations successives des neurones jusqu'à la couche finale de prédiction.

**Question 3 : Lors de l'écriture formelle de la dérivation chaînée (Chain Rule), quel symbole de produit mathématique est utilisé pour multiplier l'erreur propagée d'une couche par le vecteur des dérivées de la fonction d'activation ?**
- [ ] Le produit matriciel usuel de Kronecker
- [ ] Le produit de convolution de Fourier discret
- [x] Le produit de Hadamard $\odot$ (produit composante par composante)
> **Explication :** Comme l'activation non linéaire d'un neurone s'effectue indépendamment pour chaque neurone de la couche, la dérivée s'applique composante par composante sur le vecteur d'activation, ce qui se formalise rigoureusement par le produit terme-à-terme de Hadamard ($\odot$).

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Calculer l'activation d'un neurone artificiel pour des vecteurs d'entrée, de poids et de biais donnés.
- [ ] Dériver manuellement la fonction sigmoïde et calculer ses valeurs limites pour des entrées extrêmes.
- [ ] Formuler les équations de dérivation chainée (Chain Rule) pour un réseau à trois couches de neurones denses.
- [ ] Appliquer les gradients rétro-propagés pour mettre à jour les matrices de paramètres par descente de gradient.
