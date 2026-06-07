---
title: 'Licence L1 : Suites Numériques Réelles'
level: Post_Bac
subLevel: Analyse_L1
order: 25
---
# Licence L1 : Suites Numériques Réelles et Convergence

**Niveau** : Licence L1 (Portail Math-Info / Math-Physique, CPGE MPSI/PCSI)  
**Prérequis** : Notions de limite intuitive, valeur absolue, inégalités.  
**Objectifs** :
- Maîtriser la définition quantifiée formelle de la limite d'une suite (les $\varepsilon$).
- Connaître et appliquer les théorèmes fondamentaux de convergence (théorème des gendarmes, limite monotone).
- Manipuler les propriétés associées aux suites usuelles et savoir démontrer rigoureusement une convergence.

---

## Activités de découverte

### Activité : Achille et la Tortue (Le paradoxe de Zénon d'Élée)
Le légendaire héros grec Achille court à une vitesse de $10\text{ m/s}$ pour rattraper une tortue qui marche à $1\text{ m/s}$. La tortue bénéficie d'une avance initiale de $100\text{ m}$.  
Zénon soutient qu'Achille ne pourra jamais rattraper la tortue :
- Quand Achille parcourt les $100\text{ m}$ le séparant de la tortue, celle-ci a parcouru $10\text{ m}$.
- Quand Achille parcourt ces $10\text{ m}$, la tortue a avancé de $1\text{ m}$.
- Quand Achille accomplit ce mètre supplémentaire, la tortue a progressé de $10\text{ cm}$, et ainsi de suite à l'infini.

Modélisons la distance parcourue par Achille à chaque étape $n \in \mathbb{N}^*$ par une suite :
- $d_1 = 100$
- $d_2 = 10$
- $d_3 = 1$
- Et de manière générale, $d_n = 100 \times \left(\frac{1}{10}\right)^{n-1}$.

1. Calculez la distance totale cumulée franchie par Achille après $N$ étapes de raisonnement : $S_N = \sum_{n=1}^N d_n$.
2. En utilisant la formule de la somme d'une suite géométrique, montrez que :
   $$S_N = 100 \times \frac{1 - (1/10)^N}{1 - 1/10} = \frac{1000}{9} \left(1 - \frac{1}{10^N}\right)$$
3. Que se passe-t-il lorsque $N$ devient extrêmement grand ($N \to +\infty$) ? Ce paradoxe est-il résolu par la théorie des **limites** ?

---

## Fondements Théoriques

### 1. La définition quantifiée de la limite (De Cauchy à Weierstrass)
En mathématiques supérieures, on n'utilise plus l'expression floue "se rapproche de". On utilise la définition exacte formalisée par Karl Weierstrass :

$$\lim_{n \to +\infty} u_n = L \iff \forall \varepsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N, |u_n - L| < \varepsilon$$

#### Traduction géométrique et intuitive :
- $\varepsilon$ représente la demi-largeur d'un intervalle de tolérance (un "couloir") placé autour de la limite $L$.
- $N$ est l'indice formant un "seuil" de rang à partir duquel tous les termes de la suite sont piégés définitivement à l'intérieur de ce couloir de sécurité $]L - \varepsilon, L + \varepsilon[$.

---

## 🎨 Schéma Pédagogique Interactif : Le cône d'encadrement epsilon

L'illustration montre comment les termes successifs d'une suite convergente (en orange) entrent et restent piégés dans la bande horizontale verte d'amplitude $2\varepsilon$ centrée autour de la limite $L \approx 4$, dès que le rang franchit le seuil vertical $N = 5$.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#111827; border-radius:16px; border: 1px solid #374151;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#6366f1" font-size="15" text-anchor="middle">Définition de la Limite : Tolérance ε et Seuil N</text>
  
  <g transform="translate(50, 220)">
    <!-- Zone verte bande d'encadrement [L-ε, L-ε] -->
    <rect x="0" y="-115" width="360" height="40" fill="#10b981" fill-opacity="0.15" />
    <line x1="0" y1="-115" x2="360" y2="-115" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4"/>
    <line x1="0" y1="-75" x2="360" y2="-75" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="310" y="-123" font-family="sans-serif" fill="#10b981" font-size="10">L + ε</text>
    <text x="310" y="-62" font-family="sans-serif" fill="#10b981" font-size="10">L - ε</text>
    
    <!-- Ligne de Limite L -->
    <line x1="0" y1="-95" x2="360" y2="-95" stroke="#4f46e5" stroke-width="2"/>
    <text x="10" y="-99" font-family="sans-serif" fill="#818cf8" font-size="11" font-weight="bold">L (Limite = 4)</text>

    <!-- Axes graphiques -->
    <line x1="0" y1="0" x2="360" y2="0" stroke="#9ca3af" stroke-width="2"/>
    <text x="340" y="15" font-family="sans-serif" fill="#9ca3af" font-size="11">n</text>
    <line x1="0" y1="0" x2="0" y2="-170" stroke="#9ca3af" stroke-width="2"/>
    <text x="-35" y="-150" font-family="sans-serif" fill="#9ca3af" font-size="11" transform="rotate(-90 -35 -150)">u_n</text>
    
    <!-- Tracé des points de la suite -->
    <circle cx="30" cy="-25" r="5" fill="#f59e0b"/>
    <circle cx="60" cy="-155" r="5" fill="#f59e0b"/>
    <circle cx="90" cy="-45" r="5" fill="#f59e0b"/>
    <circle cx="120" cy="-125" r="5" fill="#f59e0b"/> <!-- hors couloir -->
    
    <!-- Seuil de Rang N -->
    <line x1="150" y1="0" x2="150" y2="-170" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="155" y="-155" font-family="sans-serif" fill="#ef4444" font-size="10" font-weight="bold">Seuil N = 5</text>
    
    <circle cx="150" cy="-90" r="5" fill="#10b981"/> <!-- Au seuil -->
    <circle cx="180" cy="-100" r="5" fill="#10b981"/>
    <circle cx="210" cy="-92" r="5" fill="#10b981"/>
    <circle cx="240" cy="-97" r="5" fill="#10b981"/>
    <circle cx="270" cy="-94" r="5" fill="#10b981"/>
    <circle cx="300" cy="-96" r="5" fill="#10b981"/>
  </g>
</svg>
</div>

---

### 2. Théorèmes Fondamentaux de Structure

#### A. Unicité de la limite
Toute suite convergente possède une **unique** limite réelle.
*Démonstration abrégée (par l'absurde)* : Si $u_n \to L_1$ et $u_n \to L_2$ avec $L_1 \neq L_2$, en posant $\varepsilon = \frac{|L_1 - L_2|}{3} > 0$, les voisinages correspondants finissent par être disjoints, ce qui est impossible car tous les termes à partir d'un certain rang d'indice appartiennent aux deux à la fois.

#### B. Théorème des Gendarmes
Si trois suites $(a_n)$, $(u_n)$ et $(b_n)$ vérifient :
1. À partir d'un certain rang, $a_n \leq u_n \leq b_n$
2. $\lim_{n \to +\infty} a_n = \lim_{n \to +\infty} b_n = L$  
Alors la suite cible $(u_n)$ converge également et sa limite est $\lim_{n \to +\infty} u_n = L$.

#### C. Théorème de la Limite Monotone
- Toute suite croissante et majorée converge vers sa borne supérieure.
- Toute suite décroissante et minorée converge vers sa borne inférieure.
*Attention* : Si une suite est croissante et non majorée, elle diverge vers $+\infty$.

---

## Exercices Résolus

### Exercice 1 : Démontrer avec la définition formelle (en epsilon-N)
Démontrer rigoureusement à l'aide de la définition de Cauchy que la limite de la suite $u_n = \frac{2n + 1}{n + 1}$ pour $n \in \mathbb{N}$ vaut $L = 2$.

**Correction Étape par Étape :**
1. **Étape 1 : Analyser la différence $|u_n - L|$**  
   Calculons la valeur absolue de la différence pour un rang $n$ quelconque :
   $$|u_n - 2| = \left| \frac{2n + 1}{n + 1} - 2 \right| = \left| \frac{2n + 1 - (2n + 2)}{n + 1} \right| = \left| \frac{-1}{n + 1} \right| = \frac{1}{n + 1}$$

2. **Étape 2 : Chercher le seuil $N$ en résolvant l'inéquation relative à $\varepsilon$**  
   Soit $\varepsilon > 0$. Nous voulons trouver un entier naturel seuil $N$ tel que pour tout $n \geq N$, l'écart $|u_n - 2| < \varepsilon$.  
   Cela équivaut à résoudre :
   $$\frac{1}{n + 1} < \varepsilon \iff n + 1 > \frac{1}{\varepsilon} \iff n > \frac{1}{\varepsilon} - 1$$

3. **Étape 3 : Choix de $N$ et conclusion formelle**  
   Posons $N = \max\left(0, \left\lfloor \frac{1}{\varepsilon} \right\rfloor\right)$, ce qui garantit que $N$ est un entier bien défini.  
   Ainsi, pour tout $n \geq N$, nous avons $n > \frac{1}{\varepsilon} - 1$, d'où $|u_n - 2| = \frac{1}{n + 1} < \varepsilon$.  
   La définition de Weierstrass est vérifiée, ce qui valide de façon indiscutable que :
   $$\lim_{n \to +\infty} \frac{2n + 1}{n + 1} = 2$$

### Exercice 2 : Suite récurrente non-linéaire (Algorithme de Héron pour $\sqrt{2}$)
On considère la suite $(x_n)_{n \in \mathbb{N}}$ définie par un premier terme rationnel $x_0 = 2$ et la relation d'évolution :
$$x_{n+1} = \frac{1}{2} \left( x_n + \frac{2}{x_n} \right)$$

1. Montrer par récurrence que pour tout $n \in \mathbb{N}$, $x_n \geq \sqrt{2}$.
2. Montrer que la suite $(x_n)$ est décroissante à partir du rang 0.
3. En déduire que la suite converge et déterminer sa limite exacte.

**Correction Étape par Étape :**
1. **Étape 1 : Analyse de minorant par récurrence**  
   - *Initialisation* : Pour $n = 0$, $x_0 = 2 \geq \sqrt{2}$. La propriété est vraie.
   - *Hérédité* : Supposons que $x_n \geq \sqrt{2}$. Étudions la valeur relative $x_{n+1} - \sqrt{2}$ :
     $$x_{n+1} - \sqrt{2} = \frac{x_n}{2} + \frac{1}{x_n} - \sqrt{2} = \frac{x_n^2 + 2 - 2\sqrt{2}x_n}{2x_n} = \frac{(x_n - \sqrt{2})^2}{2x_n}$$
     Puisque $x_n > 0$ par hypothèse, le numérateur au carré est positif ou nul, donc $x_{n+1} - \sqrt{2} \geq 0$, soit $x_{n+1} \geq \sqrt{2}$. La récurrence est prouvée.
2. **Étape 2 : Sens de variation de la suite**  
   Exprimons l'écart $x_{n+1} - x_n$ :
   $$x_{n+1} - x_n = \frac{1}{2} \left( x_n + \frac{2}{x_n} \right) - x_n = \frac{1}{2} \left( \frac{2}{x_n} - x_n \right) = \frac{2 - x_n^2}{2x_n}$$
   Puisque nous avons prouvé à l'étape précédente que $x_n \geq \sqrt{2}$ pour tout $n$, nous en tirons $x_n^2 \geq 2 \iff 2 - x_n^2 \leq 0$. Et comme $x_n > 0$, le quotient est négatif.  
   Donc, la suite $(x_n)_{n \ge 0}$ est monotone **décroissante**.
3. **Étape 3 : Convergence de Héron**  
   La suite $(x_n)$ est décroissante et minorée par $\sqrt{2}$, elle converge donc en vertu du **Théorème de la Limite Monotone** vers un réel $L \geq \sqrt{2}$.  
   La fonction $f(x) = \frac{1}{2} (x + 2/x)$ étant continue sur $]0, +\infty[$, la limite $L$ doit satisfaire l'équation de point fixe :
   $$L = f(L) \iff L = \frac{1}{2} \left( L + \frac{2}{L} \right) \iff 2L = L + \frac{2}{L} \iff L = \frac{2}{L} \iff L^2 = 2$$
   Puisque $L \geq \sqrt{2} > 0$, l'unique solution admissible est $L = \sqrt{2}$.  
   La suite converge extrêmement vite (convergence quadratique) vers **$\sqrt{2}$**.

---

## FAQ Étudiante

<details>
  <summary>Quelle est la différence fondamentale entre une suite bornée et une suite convergente ?</summary>

  Une suite convergente est nécessairement bornée (les termes en dehors de l'intervalle d'étude étant en nombre fini).  
  En revanche, la réciproque est **fausse**. Par exemple, la suite $u_n = (-1)^n$ est bornée (comprise entre $-1$ et $1$), mais elle ne converge vers aucune limite réelle, car elle oscille indéfiniment.
</details>

<details>
  <summary>Pourquoi la condition d'existence du seuil N commence-t-elle par "Pour tout epsilon &gt; 0" ?</summary>

  Parce que vous devez prouver que votre suite converge de manière robuste et impartiale : la distance de tolérance $\varepsilon$ doit pouvoir être choisie arbitrairement petite par un contradicteur ($10^{-6}$, $10^{-20}$, etc.). Votre capacité à trouver un indice seuil physique $N$ de rattrapage, même immense, prouve la convergence.
</details>

<details>
  <summary>Que sont deux suites "adjacentes" et quel intérêt présentent-elles ?</summary>

  Deux suites $(u_n)$ and $(v_n)$ sont adjacentes si l'une est croissante, l'autre est décroissante, et leur distance tend vers $0$ : $\lim (v_n - u_n) = 0$.  
  **Propriété fondamentale** : Deux suites adjacentes convergent toutes les deux vers la **même** limite réelle commune. C'est un outil très puissant pour définir ou encadrer de nouveaux nombres irrationnels ($e$, $\pi$).
</details>

---

## 📝 Mini-Quiz

**Question 1 : Laquelle de ces expressions quantifie rigoureusement la divergence d'une suite (un) vers +oo ?**
- [ ] Pour tout ε > 0, il existe un rang N tel qu'à partir de ce rang, |u_n| < ε
- [x] Pour tout réel M > 0, il existe un rang N tel que pour tout n ≥ N, u_n > M
- [ ] Il existe un réel M tel que pour tout n, u_n < M
> **Explication :** Diverger vers l'infini signifie franchir n'importe quelle barrière de hauteur $M$, aussi élevée soit-elle, de manière définitive à partir d'un certain rang.

**Question 2 : La suite u_n = sin(n) / n converge-t-elle ?**
- [x] Oui, elle converge vers L = 0 en vertu du Théorème des Gendarmes
- [ ] Non, car la fonction sinus oscille indéfiniment
- [ ] Oui, elle converge vers L = 1
> **Explication :** On sait que $-1 \leq \sin(n) \leq 1$. En divisant par $n > 0$, on obtient $-\frac{1}{n} \leq \frac{\sin(n)}{n} \leq \frac{1}{n}$. Les deux bornes encadrantes tendant vers $0$, la limite est nulle.

**Question 3 : Si lim u_n = L, est-il obligatoire que tous les termes u_n soient différents de L ?**
- [ ] Oui, c'est ce qu'implique la définition de limite stricte
- [x] Non, la suite stationnaire u_n = L converge vers L et tous ses termes sont égaux à L
- [ ] Oui, sinon la distance vaudrait zéro, ce qui est impossible
> **Explication :** La définition formelle tolère tout à fait que les termes de la suite soient égaux à la limite. L'écart $|u_n - L|$ vaut alors $0$, ce qui est bien inférieur à $\varepsilon$ pour n'importe quel choix positif de $\varepsilon$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Écrire la définition mathématique rigoureuse quantifiée d'une limite de suite avec les epsilons-N.
- [ ] Appliquer les théorèmes d'encadrement (Théorème de comparaison et Théorème des Gendarmes).
- [ ] Étudier la convergence d'une suite monotone à l'aide des bornes ou majorants/minorants d'intervalles de récurrence.
- [ ] Manipuler les suites récurrentes usuelles et de Héron pour déterminer analytiquement un point fixe.
