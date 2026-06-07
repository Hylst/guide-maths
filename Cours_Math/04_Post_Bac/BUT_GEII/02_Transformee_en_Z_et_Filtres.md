---
title: 'BUT GEII : Transformée en Z et Filtres Numériques'
level: Post_Bac
subLevel: BUT_GEII
order: 2
---
# BUT GEII : Transformée en Z et Filtres Numériques

**Niveau** : Post-Bac (BUT GEII, Licence Pro Electronique / Robotique, Informatique Industrielle)  
**Prérequis** : Suites numériques, échantillonnage (Shannon), nombres complexes, transformée de Laplace.  
**Objectifs** : 
- Comprendre la numérisation et l'échantillonnage d'un signal continu.
- Maîtriser la définition et les propriétés majeures de la transformée en Z.
- Résoudre des équations de filtrages discrets par équations aux différences.
- Analyser la stabilité d'un filtre numérique à l'aide de ses pôles complexes.

---

## 🤖 1. L'Échantillonnage et les signaux discrets

Dans notre monde moderne, l'électronique de contrôle est quasi-totalement numérique. Les microcontrôleurs (Arduino, ESP32, STM32, DSP) ne traitent pas des courants électriques lisses, mais des **échantillons de valeurs** mesurés à intervalles de temps réguliers :
$$T_e \quad \text{(Période d'échantillonnage)}$$

Un signal discret est ainsi une suite $x[n] = x(n T_e)$, où $n$ est l'indice temporel discret.

### L'Équation aux Différences
Au lieu d'équations différentielles physiques ($\frac{d^2s}{dt^2} + 2\xi\omega_0 \frac{ds}{dt} + \omega_0^2 s...$), un algorithme de traitement numérique utilise une **équation aux différences** qui calcule l'échantillon de sortie actuel $y[n]$ à partir des entrées actuelles/passées et des sorties passées :
$$y[n] = a_1 y[n-1] + a_2 y[n-2] + b_0 x[n] + b_1 x[n-1]$$

---

## 🌀 2. La Transformée en Z : Le grand pont spectral

De même que la transformée de Laplace est l'outil phare pour simplifier les équations analogiques, la **Transformée en Z ($\mathcal{T}_Z$)** est le socle de l'ensemble de l'automatique et du signal discrets.

### Définition
La transformée en Z d'un signal causal $x[n]$ (nul pour $n < 0$) est définie par :
$$X(z) = \mathcal{Z}\{x[n]\} = \sum_{n=0}^{+\infty} x[n] z^{-n}$$

Où $z$ est une variable complexe spectrale.

### La propriété de Retard (Le coeur des algorithmes)
En automatique numérique, le symbole $z^{-1}$ représente un retard d'exactement un échantillon :
$$\mathcal{Z}\{x[n-1]\} = z^{-1} X(z)$$
$$\mathcal{Z}\{x[n-k]\} = z^{-k} X(z)$$

Cette propriété d'une simplicité désarmante transforme n'importe quelle équation aux différences discrète complexe en une simple fraction polynomiale algébrique appelée la **fonction de transfert discrète $H(z)$** !

$$H(z) = \frac{Y(z)}{X(z)}$$

---

## 🎯 3. Filtres RIF et RII : Filtres Numériques clés

On sépare les filtres discrets en deux familles :

### 1. Filtres à Réponse Impulsionnelle Finie (RIF / FIR)
La sortie ne dépend que des valeurs actuelles et passées du signal d'entrée :
$$y[n] = \sum_{k=0}^{M} b_k x[n-k]$$
- Ce filtre est **toujours stable**, puisque ses pôles dans le domaine complexe sont tous situés à l'origine ($z=0$).
- Facile à concevoir, mais nécessite de nombreux coefficients pour des pentes d'atténuation franches.

### 2. Filtres à Réponse Impulsionnelle Infinie (RII / IIR)
La sortie utilise une rétroaction (feedback) des échantillons de sortie précédents :
$$y[n] = \sum_{i=1}^{N} a_i y[n-i] + \sum_{k=0}^{M} b_k x[n-k]$$
- Beaucoup plus performant (nécessite très peu de coefficients pour filtrer puissamment).
- Il risque d'être instable (osciller à l'infini ou saturer) si ses pôles complexes sortent du **cercle unité** $|z| \le 1$ !

---

## FAQ Étudiante

<details>
  <summary>À quoi correspond le cercle unité dans le plan complexe de la transformée en Z ?</summary>

  En transformée en Z, le plan spectral se comporte différemment de Laplace : la frontière absolue de stabilité est le **cercle unité de rayon 1** ($|z| = 1$), qui correspond à l'axe imaginaire pur analogique.
  - Si tous les pôles de la fonction de transfert $H(z)$ sont strictement **à l'intérieur du cercle** ($|p_i| < 1$), le filtre numérique est stable et amorti.
  - Si au moins un pôle est **à l'extérieur du cercle** ($|p_i| > 1$), le filtre diverge de manière exponentielle, devenant totalement instable !
</details>

<details>
  <summary>Pourquoi la transformée en Z est-elle si géniale pour programmer des filtres sur microcontrôleur ?</summary>

  Parce que le passage de la fonction de transfert $H(z)$ au filtre s'effectue de manière instantanée !
  Si tu as :  
  $$H(z) = \frac{Y(z)}{X(z)} = \frac{0.1 + 0.1 z^{-1}}{1 - 0.8 z^{-1}}$$
  En faisant un simple produit en croix :  
  $$Y(z)(1 - 0.8 z^{-1}) = X(z)(0.1 + 0.1 z^{-1}) \implies Y(z) - 0.8 z^{-1}Y(z) = 0.1 X(z) + 0.1 z^{-1}X(z)$$
  En appliquant la transformée inverse direct par retard, tu as immédiatement ta ligne de code prêt à tourner en boucle infinie (C++) :  
  `y[n] = 0.8 * y[n-1] + 0.1 * x[n] + 0.1 * x[n-1];`
</details>

<details>
  <summary>Qu'est-ce que le repliement de spectre (aliasing) et comment s'en prémunir ?</summary>

  Le repliement de spectre se produit lorsque la fréquence de coupure ou la fréquence d'échantillonnage de ton convertisseur analogique-numérique (CAN) est trop lente par rapport aux variations réelles du signal analogique. Selon le théorème de Shannon-Nyquist, on doit obligatoirement échantillonner à une fréquence au moins double de la composante utile la plus rapide : $f_e > 2 f_{max}$. Pour s'en prémunir, on filtre le signal analogique de manière matérielle avant le CAN avec un **filtre passe-bas anti-repliement**.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si un filtre numérique présente une fonction de transfert avec un pôle complexe p = 1.25, le système est :**
- [ ] Stable et oscillatoire
- [ ] Stable et amorti
- [x] Absolument instable (diverge exponentiellement)
- > **Explication :** Le module du pôle vaut $|p| = 1.25$, ce qui est strictement supérieur à 1. Comme il se trouve en dehors du cercle unité protecteur $|z| \le 1$, la suite divergera de manière géométrique vers l'instabilité totale.

**Question 2 : Qu'implique une multiplication par le terme z⁻¹ dans une fonction sous forme spectrale Z ?**
- [ ] Diviser le signal d'origine par dix.
- [x] Appliquer un décalage (retard) temporel d'exactement un échantillon.
- [ ] Multiplier la constante de temps d'échantillonnage de Shannon.
- > **Explication :** Par définition de la transformée en Z, l'opérateur de retard pur d'un incrément d'échantillonnage d'indice $n \to n-1$ équivaut spectralement à diviser par $z$ (donc multiplier par $z^{-1}$).

**Question 3 : Quelle structure mathématique traduit l'implémentation algorithmique d'un filtre RIF (Réponse Impulsionnelle Finie) ?**
- [ ] Une formule récursive dépendant de tous les échantillons y[n-1]...y[n-N].
- [ ] Une équation différentielle trigonométrique discontinue.
- [x] Une simple somme pondérée des échantillons d'entrée actuels et passés x[n], x[n-1]...x[n-M].
- > **Explication :** Les filtres RIF ne comportent aucun retour (pas d'alimentation par les termes de sortie précédents). Sa sortie calculée est simplement une moyenne glissante filtrée ou une convolution pondérée par les coefficients sur les échantillons d'entrée acquis.

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Savoir déterminer la transformée en Z directe de signaux élémentaires échantillonnés (échelon d'Heaviside, rampe, exponentielle).
- [ ] Passer d'une équation récursive aux différences à sa fonction de transfert en Z ($H(z)$) et inversement.
- [ ] Localiser les zéros et les pôles complexes pour esquisser graphiquement la forme du filtre (passe-bas, passe-haut, passe-bande).
- [ ] Programmer en langage C un filtre passe-bas du 1er ordre conçu par transformée en Z pour une utilisation sur microcontrôleur.
