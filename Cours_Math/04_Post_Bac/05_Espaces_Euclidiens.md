---
title: 'Chapitre 5 : Espaces Euclidiens et Diagonalisation'
level: Post_Bac
subLevel: Tronc_Commun
order: 5
---
# Chapitre 5 : Espaces Euclidiens et Diagonalisation

**Niveau** : Post-Bac (CPGE, Licence)  
**Prérequis** : Algèbre linéaire, espaces vectoriels, calcul matriciel, bases.  
**Objectifs** : 
- Maîtriser le produit scalaire, la notion d'orthogonalité et la projection orthogonale en dimension finie.
- Appliquer le procédé d'orthonormalisation de Gram-Schmidt.
- Comprendre et appliquer la réduction des endomorphismes (diagonalisation, trigonalisation).
- Connaître le théorème spectral pour les matrices symétriques réelles.

---

## 🎯 Mise en situation et Cas d'usage

**Pourquoi diagonaliser ?**  
Dans le monde réel, un système dynamique (comme la diffusion thermique, l'évolution d'une population ou les algorithmes de recommandations comme le PageRank de Google) est souvent modélisé par des suites matricielles $X_{n+1} = A X_n$ ou des systèmes différentiels $X' = A X$.

Traiter la matrice $A$ directement à une grande puissance $n$ est coûteux (complexité algorithmique gigantesque). Mais si on peut "diagonaliser" $A$ en trouvant une matrice de passage $P$ telle que $A = P D P^{-1}$ (où $D$ est diagonale), calculer $A^n = P D^n P^{-1}$ devient instantané, car il suffit d'élever les éléments de la diagonale à la puissance $n$ !

---

## 💡 Rappels Essentiels

Avant d'explorer la dimension $n$, souviens-toi qu'en dimension 2 ou 3 :
- Le module (ou "norme") d'un vecteur $\vec{u}(x, y)$ est $||\vec{u}|| = \sqrt{x^2 + y^2}$.
- Deux vecteurs sont orthogonaux (perpendiculaires) si leur produit scalaire est nul : $\vec{u} \cdot \vec{v} = 0$.
- Une matrice est dite diagonale si tous ses coefficients hors de la première diagonale valent 0.

---

## 📖 Explications et Théorie

### 1. Espaces Préhilbertiens et Euclidiens
Un **produit scalaire** sur un espace vectoriel $E$ (réel) est une forme bilinéaire, symétrique, définie et positive, souvent notée $\langle x, y \rangle$ ou $x \cdot y$.
- **Espace euclidien** : Un espace vectoriel muni d'un produit scalaire et de **dimension finie**.
- **Norme induite** : $\|x\| = \sqrt{\langle x, x \rangle}$.
- **Inégalité de Cauchy-Schwarz** : $|\langle x, y \rangle| \le \|x\| \times \|y\|$.

### 2. Orthogonalité et Bases
- **Famille orthogonale / orthonormale** : Une famille où tous les vecteurs sont deux à deux orthogonaux (et de norme 1 pour "orthonormale").
- **Théorème de Pythagore** : Si $x \perp y$, alors $\|x+y\|^2 = \|x\|^2 + \|y\|^2$.
- **Procédé de Gram-Schmidt** : Algorithme permettant de transformer toute base en une base orthonormale.

## 🎨 Simulateur Interactif : Le Procédé d'Orthogonalisation de Gram-Schmidt

Tu peux ajuster la position des deux vecteurs d'entrée $u_1$ et $u_2$. Clique sur les étapes successives pour observer la projection géométrique et la normalisation aboutir à la base orthonormée parfaite $(e_1, e_2)$ à angle droit.

![Procédé de Gram-Schmidt](./assets/gram_schmidt.svg)

### 3. Réduction des Endomorphismes (Diagonalisation)
Soit $f$ un endomorphisme de $E$ (ou une matrice carrée $A$).
- **Valeurs propres / Vecteurs propres** : $\lambda \in \mathbb{K}$ est valeur propre s'il existe $x \neq 0$ tel que $f(x) = \lambda x$. Le vecteur $x$ est un vecteur propre associé.
- **Polynôme caractéristique** : $\chi_A(X) = \det(XI - A)$. Les racines de ce polynôme sont les valeurs propres de $A$.
- $A$ est **diagonalisable** s'il existe une base de $E$ formée de vecteurs propres. Si c'est le cas, on peut écrire $A = P D P^{-1}$ avec $P$ la matrice de passage (contenant les vecteurs propres) et $D$ contenant les valeurs propres.

### 4. Le Théorème Spectral
Toute matrice symétrique réelle est diagonalisable dans une **base orthonormale**. (Théorème fondamental de l'algèbre bilinéaire).

---

## 🛠️ Exemples

**Exemple de diagonalisation 2x2 :**
Soit $A = \begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$. 
1. Son polynôme caractéristique est $\chi_A(X) = \det \begin{pmatrix} X-2 & -1 \\ 0 & X-3 \end{pmatrix} = (X-2)(X-3)$.
2. Les valeurs propres sont $2$ et $3$. $A$ admet 2 valeurs propres distinctes en dimension 2, elle est donc diagonalisable.
3. Vecteur propre pour $\lambda=2$: $(x,y)$ tel que $\begin{cases} 2x+y=2x \\ 3y=2y \end{cases} \Rightarrow y=0$. Vecteur $v_1(1,0)$.
4. Matrice de passage : $P = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}, D = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$.

---

## 🧠 Le Saviez-Vous ?

L'algorithme de recommandation **PageRank**, le système originel titanesque créé par les fondateurs de Google (Larry Page et Sergey Brin), repose mathématiquement *entièrement* sur une Diagonalisation de Matrice !
L'intégralité d'Internet est vue comme une matrice géante d'adjacence (chaque ligne montre les hyperliens d'un site web). La plus grande "Valeur Propre" et son "Vecteur Propre" associé pointent magiquement vers le statut exact de classement et la pertinence de chaque site internet mondial. La recherche Web est un pur produit d'Algèbre matricielle !

---

## 📝 Exercices

**🟢 Exercice A (Les Fondations Spectrales)**
1. **L'Analyse du Spectre** : Attaque la matrice $A = \begin{pmatrix} 1 & -1 \\ -1 & 1 \end{pmatrix}$. Ton objectif : Extraire son Spectre complet (trouver toutes ses Valeurs Propres).
2. **Le Défi Euclidien** : Utilise audacieusement l'Inégalité de Cauchy-Schwarz sur $x=(1, 1)$ et $y=(1, 0)$ dans la zone de combat $\mathbb{R}^2$ muni du pur produit scalaire usuel. Que remarques-tu ?

**🔵 Exercice B (Théorie L2 de la Matrice)**
3. **Le Théorème du Projecteur** : Démontre par logique qu'une redoutable matrice de projection (telle que $p^2=p$) est condamnée à n'avoir **que** des $0$ et des $1$ dans tout son Spectre de valeurs propres.

**🟠 Exercice C (Le Mode Gram-Schmidt)**
4. **L'Ortho-Normalisateur** : Invoque l'Algorithme de Gram-Schmidt manuellement sur la famille rebelle $v_1=(1,1,0)$ et $v_2=(1,0,1)$ dans $\mathbb{R}^3$. Ton but : Transformer ces deux vecteurs quelconques en une base orthonormale parfaite du plan qu'ils forment !

---

## 📄 Exercices corrigés

**Exercice 1 :** $\chi_A(X) = (X-1)^2 - 1 = X^2 - 2X = X(X-2)$. Les valeurs propres sont **0 et 2**.

**Exercice 2 :** 
$\langle x, y \rangle = 1\times1 + 1\times0 = 1$. 
$\|x\| = \sqrt{1^2+1^2} = \sqrt{2}$. $\|y\| = \sqrt{1^2+0} = 1$.
On a bien $|1| \le \sqrt{2} \times 1$.

**Exercice 3 :**
Si $x$ est vecteur propre associé à $\lambda$, $p(x) = \lambda x$. Posons $p(p(x))$ :
$p(p(x)) = p(\lambda x) = \lambda p(x) = \lambda^2 x$.
Or $p^2 = p \Rightarrow p(p(x)) = p(x) = \lambda x$.
Donc $\lambda^2 x = \lambda x$, soit $(\lambda^2 - \lambda)x = 0$. Comme $x \neq 0$, $\lambda(\lambda - 1) = 0 \Rightarrow \lambda \in \{0, 1\}$.

---

## 📌 Synthèse

- Un **produit scalaire** est une forme bilinéaire symétrique définie positive.
- L'inégalité d'**Holder/Cauchy-Schwarz** lie le produit scalaire aux normes.
- La **diagonalisation** consiste à trouver une base rendant la matrice de l'opérateur diagonale.
- Les solutions $\chi_A(X)=0$ sont les **valeurs propres**. 

---

## 🙋 FAQ Orthogonale

<details>
  <summary>Quelle est concrètement la différence entre Trigonaliser et Diagonaliser ?</summary>

  <b>Diagonaliser</b>, c'est l'Idéal Divin. C'est trouver une Matrice de Base où ta Matrice système sera remplie de ZÉROS partout, sauf sur sa stricte première diagonale centrale. Tout est découplé, les calculs sont purs.<br>Cependant, dans la réalité, certaines matrices "désobéissent" et refusent d'être Diagonalisées. La seconde chance (le lot de consolation mathématique) c'est de réussir à les <b>Trigonaliser</b> : on accepte quelques nombres au-dessus de la diagonale, mais on garantit au moins que <i>tout ce qui est en-dessous de la diagonale est rempli de zéros</i>, ce qui simplifie quand même beaucoup la résolution !
</details>

<details>
  <summary>Est-ce que toutes les Matrices Carrées sont Diagonalisables ?</summary>

  Absolument pas ! Par exemple la matrice $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ est une récalcitrante notoire. Elle tord l'espace d'une manière spéciale : Elle est dite "Nilpotente". Si tu la mets au carré, elle s'auto-détruit et donne la matrice Zéro ! Impossible de diagonaliser un comportement aussi pathologique.
</details>

<details>
  <summary>En quoi la projection orthogonale résout-elle un problème de "meilleure approximation" ?</summary>

  C'est un des plus beaux théorèmes de l'algèbre géométrique : le théorème de la meilleure approximation. Si $F$ est un sous-espace vectoriel de $E$ et $u$ un vecteur hors de $F$, alors la distance minimale entre $u$ et n'importe quel vecteur de $F$ est atteinte **uniquement** par sa projection orthogonale $p_F(u)$. C’est-à-dire : $\forall v \in F, \, \|u - p_F(u)\| \le \|u - v\|$. Ce concept fonde la méthode de régression linéaire par moindres carrés en statistique et en science des données !
</details>

<details>
  <summary>Qu'est-ce que l'"adjoint" d'un endomorphisme et d'où vient son pouvoir bilinéaire ?</summary>

  Dans un espace euclidien $E$, le théorème de représentation de Riesz garantit que pour tout endomorphisme $f$, il existe un unique endomorphisme $f^*$, baptisé **l'adjoint de $f$**, qui satisfait l'équation magique de glissement de produit scalaire :  
  $$\forall x, y \in E, \, \langle f(x), y \rangle = \langle x, f^*(y) \rangle$$  
  Matriciellement, dans une base orthonormée, la matrice de $f^*$ est simplement la transposée de la matrice de $f$. Si un endomorphisme est autoadjoint ($f = f^*$), sa matrice est symétrique, ce qui déclenche le puissant Théorème Spectral : sa matrice est diagonalisable dans une base d'une propreté absolue (orthonormale) !
</details>

---

## 📝 Mini-Quiz

**Question 1 : Face à une grande matrice 3x3 disposant de 3 "Valeurs Propres" réelles toutes bien distinctes, on affirme qu'elle est :**
- [ ] Interdite de Diagonalisation.
- [ ] Seulement Trigonalisable.
- [x] Totalement Diagonalisable (dans ℝ) avec certitude !
> **Explication :** C'est LE Théorème de Joie. Si une Matrice de taille N détient exactement N valeurs propres distinctes, elle ne peut pas tricher. L'espace vectoriel tout entier libère une Base parfaite de Vecteurs Propres purs. Elle est Totalement Diagonalisable d'office.

**Question 2 : Le Grand Théorème de Pythagore mais dans le monde abstrait des Espaces Euclidiens réclame strictement... :**
- [ ] $\|x+y\| = \|x\| + \|y\|$
- [ ] $x \cdot y = 1$
- [x] $\|x+y\|^2 = \|x\|^2 + \|y\|^2$
> **Explication :** L'équation d'or des carrés réapparaît ! Le développement naturel des carrés des normes donne $\|x+y\|^2 = \|x\|^2 + 2\langle x, y \rangle + \|y\|^2$. Comme on impose aux vecteurs d'être "Orthogonaux", leur Produit Scalaire vaut mathématiquement "0" ... Le terme central disparaît, laissant la fameuse identité de Pythagore.

**Question 3 : Qu'obtiens-tu si tu résous fièrement l'infâme équation $det(A - \lambda I) = 0$ nommée "Polynôme Caractéristique" ?**
- [x] Les Valeurs Propres de A ($\lambda$).
- [ ] Les Vecteurs Propres de A.
- [ ] Le Déterminant Originel de A.
> **Explication :** L'équation s'attaque exclusivement à faire "S'effondrer" la dimension de la matrice pour révéler les Valeurs Propres ($\lambda$). La trouvaille des Vecteurs vient ensuite, via la résolution de systèmes.

---


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.

*(Fin de l'Algèbre Bilinéaire)*