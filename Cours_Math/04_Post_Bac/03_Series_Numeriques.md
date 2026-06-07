---
title: 'Chapitre 3 : Séries Numériques'
level: Post_Bac
subLevel: Analyse_L2
order: 3
---
# Chapitre 3 : Séries Numériques

**Niveau** : Post-Bac (CPGE, Licence)  
**Prérequis** : Suites numériques, limites, intégration.  
**Objectifs** : 
- Définir la convergence d'une série.
- Utiliser les critères de convergence pour les séries à termes positifs.
- Étudier les séries alternées et la convergence absolue.

---

## Activités de découverte

**Activité : L'infini peut-il être fini ?**

Si l'on ajoute une infinité de nombres positifs, la somme est-elle forcément infinie ? 

1. **La tarte** : Imagine que tu coupes une tarte en 2, puis la moitié restante en 2 (donc 1/4), puis encore en 2 (1/8), etc. Si tu additionnes tous ces morceaux à l'infini, quelle fraction de la tarte obtiendras-tu au total ?
2. **Achille et la tortue** : Achille court à 10 m/s et la tortue à 1 m/s avec 10 m d'avance. Achille doit d'abord parcourir les 10 m, puis la distance que la tortue a parcourue pendant ce temps (1 m), puis la distance suivante (0,1 m)... La somme de ces distances est-elle infinie ?
3. **La limite** : Que se passe-t-il si les termes que l'on ajoute ne tendent pas vers 0 ?

---

## Rappels

Avant de commencer, révise :
- **Suites géométriques** : Somme des $n$ premiers termes $S_n = u_0 \frac{1-q^{n+1}}{1-q}$.
- **Limites de suites** : Théorèmes de comparaison, croissances comparées.
- **Équivalents** : $u_n \sim v_n$ signifie $\lim \frac{u_n}{v_n} = 1$.

---

## Explications et Théorie

### 1. Définitions
Soit $(u_n)$ une suite. On appelle **série** de terme général $u_n$ la suite $(S_n)$ des sommes partielles :
$$S_n = \sum_{k=0}^n u_k$$
- La série **converge** si $\lim S_n = S$ (fini). $S$ est la **somme** de la série.
- **Condition Nécessaire** : Si $\sum u_n$ converge, alors $\lim u_n = 0$. (La réciproque est fausse !).

### 2. Séries de référence
- **Série géométrique** : $\sum q^n$ converge $\iff |q| < 1$. Somme : $\frac{1}{1-q}$.
- **Série de Riemann** : $\sum \frac{1}{n^\alpha}$ converge $\iff \alpha > 1$.
- **Série harmonique** : $\sum \frac{1}{n}$ **diverge**.

## 🎨 Animation Interactive : L'Infini Tient dans un Carré (Paradoxe de Zénon)
Regarde comment s'additionnent les termes de la célèbre série de géométrique $1/2 + 1/4 + 1/8 + \dots$. Chaque nouveau bloc fait exactement la moitié de l'espace vide restant. L'infinité de ces blocs ne dépassera jamais la zone tracée ! 

<div align="center">
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="background:#f0fdf4; border-radius:12px; border: 2px solid #16a34a;">
  
  <text x="200" y="30" font-family="sans-serif" font-weight="bold" fill="#166534" font-size="16" text-anchor="middle">Série = 1/2 + 1/4 + 1/8 + 1/16 + ... = 1</text>

  <g transform="translate(50, 60)">
    <!-- Carré total = 1 (300x300) -->
    <rect x="0" y="0" width="300" height="300" fill="none" stroke="#bbf7d0" stroke-width="2" />
    
    <!-- 1/2 -->
    <g>
      <animate attributeName="opacity" values="0; 1; 1; 1; 1; 1; 1" dur="7s" repeatCount="indefinite" />
      <rect x="0" y="0" width="150" height="300" fill="#22c55e" stroke="#166534" stroke-width="1"/>
      <text x="75" y="150" font-family="sans-serif" font-weight="bold" fill="#fff" font-size="24" text-anchor="middle">1/2</text>
    </g>

    <!-- 1/4 -->
    <g>
      <animate attributeName="opacity" values="0; 0; 1; 1; 1; 1; 1" dur="7s" repeatCount="indefinite" />
      <rect x="150" y="0" width="150" height="150" fill="#16a34a" stroke="#14532d" stroke-width="1"/>
      <text x="225" y="75" font-family="sans-serif" font-weight="bold" fill="#fff" font-size="20" text-anchor="middle">1/4</text>
    </g>

    <!-- 1/8 -->
    <g>
      <animate attributeName="opacity" values="0; 0; 0; 1; 1; 1; 1" dur="7s" repeatCount="indefinite" />
      <rect x="150" y="150" width="75" height="150" fill="#15803d" stroke="#052e16" stroke-width="1"/>
      <text x="187.5" y="225" font-family="sans-serif" font-weight="bold" fill="#fff" font-size="14" text-anchor="middle">1/8</text>
    </g>

    <!-- 1/16 -->
    <g>
      <animate attributeName="opacity" values="0; 0; 0; 0; 1; 1; 1" dur="7s" repeatCount="indefinite" />
      <rect x="225" y="150" width="75" height="75" fill="#166534" stroke="#052e16" stroke-width="1"/>
      <text x="262.5" y="187.5" font-family="sans-serif" font-weight="bold" fill="#fff" font-size="12" text-anchor="middle">1/16</text>
    </g>

    <!-- L'infini ... -->
    <g>
      <animate attributeName="opacity" values="0; 0; 0; 0; 0; 1; 1" dur="7s" repeatCount="indefinite" />
      <rect x="225" y="225" width="37.5" height="75" fill="#14532d" stroke="#052e16" stroke-width="1"/>
    </g>
  </g>
</svg>
</div>

## 🎨 Simulateur de Convergence des Séries Numériques

Observe la dynamique des sommes partielles ci-dessous. Tu peux sélectionner différentes séries et ajuster le curseur pour simuler le comportement asymptotique à l'infini :

![Convergence des Séries](./assets/series_convergence.svg)

### 3. Séries à termes positifs (S.A.T.P.)
- **Comparaison** : Si $0 \le u_n \le v_n$, alors la convergence de $\sum v_n$ implique celle de $\sum u_n$.
- **Équivalence** : Si $u_n \sim v_n$, alors les séries sont de même nature.
- **Règle de d'Alembert** : Si $\lim \frac{u_{n+1}}{u_n} = L$, alors :
  - $L < 1 \implies$ Convergence.
  - $L > 1 \implies$ Divergence.

### 4. Séries de signe quelconque
- **Convergence absolue** : $\sum u_n$ converge absolument si $\sum |u_n|$ converge.
- **Séries alternées** : $\sum (-1)^n a_n$ converge si $(a_n)$ décroît vers 0.

### Méthodes pas-à-pas

**Comment étudier la nature d'une série ?**
1. Vérifier si $\lim u_n = 0$. Si non, elle diverge grossièrement.
2. Si $u_n \ge 0$, chercher un équivalent simple (souvent une série de Riemann).
3. Si la série contient des factorielles ou des puissances de $n$, utiliser la règle de d'Alembert.
4. Si la série est alternée, vérifier les conditions du critère spécial (décroissance et limite nulle).

---

## 💡 Le savais-tu ?

Le mathématicien Leonhard Euler a stupéfié le monde savant en 1734 en réussissant l'impossible : calculer la somme exacte et totale de l'infinité des inverses des carrés parfaits : $\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}$. 
Ce prodige technique, connu sous le nom majestueux de "Problème de Bâle", a révélé au monde un lien profond, caché et profondément inattendu entre les simples *nombres entiers* fractionnés... et le nombre **$\pi$**, qui était censé appartenir exclusivement au domaine des cercles en géométrie !

---

## Exercices

**🟢 Exercice A (Le Test Anti-Divergence)**
1. **Plafond de Riemann** : La série antique $\sum \frac{1}{n^3}$ respecte-t-elle la limite de convergence ? Justifie à l'aide de la Formule Supérieure.
2. **Magie d'Achille** : Calcule mentalement (ou sur parchemin) l'ultime somme de la série géométrique $\sum_{n=0}^\infty (\frac{1}{2})^n$.
3. **Le Faux Bonheur** : L'apparente innocente série $\sum \frac{n+1}{n}$ converge-t-elle en l'infini ? (Indice : Regarde juste la condition de base).

**🔵 Exercice B (Outils d'Évaluation L2)**
4. **Le Juge d'Alembert** : Étudie farouchement la convergence de la puissante $\sum \frac{2^n}{n!}$. (Le Quotient va dicter la loi).
5. **L'Art du Mimétisme (Équivalent)** : Détermine l'issue fatale de la série $\sum \sin(\frac{1}{n^2})$ en l'approchant par un de ses cousins classiques.
6. **L'Instabilité Alternée** : La redoutable $\sum \frac{(-1)^n}{\sqrt{n}}$ est-elle convergente ? Question bonus de maître : Est-elle "Absolument Convergente" ?

**🟠 Exercice C (Le Problème de Télescopique Master)**
7. **La Série Dévorante (Télescopique)** : Déchiffre la somme $\sum_{n=1}^\infty \frac{1}{n(n+1)}$ en utilisant cette remarque capitale du grand livre des astuces : $\frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$. Écris les 4 premiers termes et regarde ce qu'il se passe au centre !

---

## Exercices corrigés

**Exercice 1 :**
**Oui**, c'est une série de Riemann avec $\alpha = 3 > 1$.

**Exercice 2 :**
Série géométrique de raison $q = 1/2$. Somme : $\frac{1}{1 - 1/2} = \frac{1}{1/2} = \mathbf{2}$.

**Exercice 3 :**
$\lim \frac{n+1}{n} = 1 \neq 0$. La série **diverge grossièrement**.

**Exercice 4 :**
$\frac{u_{n+1}}{u_n} = \frac{2^{n+1}}{(n+1)!} \times \frac{n!}{2^n} = \frac{2}{n+1} \to 0$. $0 < 1$, donc la série **converge**.

**Exercice 5 :**
$\sin(\frac{1}{n^2}) \sim \frac{1}{n^2}$ en l'infini. Or $\sum \frac{1}{n^2}$ converge (Riemann $\alpha=2$). Donc la série **converge**.

**Exercice 6 :**
Elle converge par le critère des séries alternées ($1/\sqrt{n}$ décroît vers 0). Mais elle ne converge pas absolument car $\sum \frac{1}{\sqrt{n}}$ diverge (Riemann $\alpha=1/2 \le 1$).

**Exercice 7 :**
$S_n = (1 - 1/2) + (1/2 - 1/3) + ... + (1/n - 1/(n+1)) = 1 - \frac{1}{n+1}$.
$\lim S_n = 1$. La somme est **1**.

---

## Synthèse

- **Convergence** : La somme infinie a une valeur finie.
- **Riemann** : $\sum 1/n^\alpha$ converge $\iff \alpha > 1$.
- **Géométrique** : $\sum q^n$ converge $\iff |q| < 1$.
- **Absolue convergence** : $\sum |u_n|$ converge $\implies \sum u_n$ converge.

---




---

## Pour aller plus loin

**Les séries entières**
Une série entière est une série de la forme $\sum a_n x^n$. C'est une sorte de "polynôme infini". Elles sont fondamentales car elles permettent de représenter des fonctions complexes (comme $\sin, \cos, \exp$) sous forme de sommes simples. C'est ainsi que les calculatrices calculent ces fonctions : elles ne connaissent pas la "géométrie", elles font juste des additions et des multiplications de séries !

---

## Foire Aux Questions (FAQ)

<details>
  <summary>Je n'arrive pas à y croire. Pourquoi la fameuse Série Harmonique de "1/n" refuse-t-elle de converger, alors que "1/n" tend clairement vers un joli 0 ?</summary>

  C'est l'un des plus grands pièges de l'analyse Post-Bac ! Une condition Nécessaire n'est pas Suffisante. Oui, les pièces s'affinent (1/2, 1/3, 1/4... 1/1000000). Mais elles ne s'affinent PAS vites. Le cumul d'une infinité de "poussières" qui ne maigrissent pas "exponentiellement" finit par créer une Montagne gigantesque qui atteint l'infini. Il faut faire le célèbre groupement pour prouver que les packs valent tous plus que (1/2).
</details>

<details>
  <summary>C'est quoi la différence concrète sur le terrain entre une misérable Suite et une glorieuse Série ?</summary>

  L'analogie est stricte :<br>- <b>La Suite</b>, c'est ton bulletin de salaire mensuel. Une liste de montants isolés (1000€, 1200€, 1300€).<br>- <b>La Série</b>, c'est l'Épargne TOTALE en banque (3500€ à la fin). C'est la <i>Somme Cumulée Permanente</i> de toutes les rentrées de ta Suite. On n'étudie pas la valeur d'une rentrée, on étudie ton patrimoine global qui peut exploser ou stagner !
</details>

<details>
  <summary>Comment fonctionne concrètement le test de d'Alembert pour une série ?</summary>

  On étudie le comportement du ratio entre deux termes successifs : $L = \lim_{n \to +\infty} \left| \frac{u_{n+1}}{u_n} \right|$.  
  - Si $L < 1$ : la série converge de manière absolument certaine (de façon exponentielle, comme une série géométrique).  
  - Si $L > 1$ : le terme général ne tend même pas vers 0, la série diverge grossièrement.  
  - Si $L = 1$ : le test est totalement indécis (cas de la série harmonique ou de Riemann). Il faut alors employer d'autres critères (ex. règle de Riemann).
</details>

<details>
  <summary>Quel est le lien entre l'intégrale généralisée et la convergence d'une série numérique ?</summary>

  C'est la méthode de comparaison série-intégrale. Si $f$ désigne une application positive, décroissante et continue sur l'intervalle $[1, +\infty[$, alors la série $\sum f(n)$ et l'intégrale généralisée $\int_1^{+\infty} f(x) dx$ sont de même nature (elles convergent ou divergent ensemble). La démonstration géométrique consiste à encadrer la courbe continue par des rectangles unitaires gauches et droits.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Face à la série primitive de forme "1/√n", ton instinct algébrique prononce...**
- [ ] Sa Convergence (car la limite est 0, c'est magique).
- [x] Sa Divergence Fatale (C'est Riemann qui domine, et l'alpha est trop faible, il est en-dessous de 1).
- [ ] Sa Convergence Absolue Inversée !
> **Explication :** Forme de Riemann stricte : $1/n^\alpha$. Ici la racine implique un exposant fractionnaire : $\alpha = 0.5$. La loi Impériale est claire : Seul un $\alpha > 1$ fait converger ce type. $\alpha \le 1$ c'est direct la Divergence !

**Question 2 : Horreur... la limite pure (quand n devient infini) du terme $u_n$ vaut 1. Quel est l'arrêt de la Cour envers la série totale $\sum u_n$ ?**
- [ ] Elle converge sûrement vers 1 au total.
- [ ] Seul l'Oracle sait.
- [x] Divergence Grossière et Absolue ! Terminaison instantanée de l'exercice.
> **Explication :** C'est la Règle d'Or (Condition Nécessaire). Si tes pièces à additionner ne "tendent pas vers RIEN" en l'infini... (Ici, elles tendent vers 1 de poids, donc tu finiras par additionner une infinité de fois la brique "1"). L'édifice va peser L'Infini. Elle s'écrase grossièrement !

**Question 3 : La terrible série harmonique mais de forme alternée $\sum \frac{(-1)^n}{n}$ revendique-t-elle le statut noble de "Absolument Convergente" ?**
- [ ] Oui, c'est l'Élite.
- [x] Non, elle n'est que Semi-Convergente (une roturière fragile).
> **Explication :** Elle converge par magie uniquement grâce à son balancier alterné de la Valse (Le Critère Spécial). Mais si tu prends la fonction force brute de sa Valeur Absolue (Qui force tout vers ++), le balancier disparaît et ça redevient la terrible Série Harmonique maudite de $1/n$ qui diverge ! Elle n'est donc PAS Absolument (de force pure) convergente.

---


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.

*(Fin des Océans Infinis de Nombres)*