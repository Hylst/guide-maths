---
title: 'Probabilités : Variables Aléatoires Continues & Densités'
level: Post_Bac
subLevel: Probabilites
order: 17
---
# Probabilités : Variables Aléatoires Continues & Densités

**Niveau** : Post-Bac (Licence 2/3, Portail Math-Info, CPGE 2ème année)  
**Prérequis** : Intégration univariée (Analyse L1), Probabilités discrètes.  
**Objectifs** :
- Définir rigoureusement une variable aléatoire continue à travers sa fonction de densité.
- Manipuler la fonction de répartition pour évaluer des probabilités sous forme d'intervalles.
- Maîtriser les lois continues de référence : Uniforme, Exponentielle, Normale (loi de Gauss).

---

## Activités de découverte

### Activité : L'attente du bus et le temps continu
Vous vous présentez à un arrêt de bus sans connaître les horaires. Vous savez simplement qu'un bus s'y arrête de manière imperturbable toutes les $20\text{ minutes}$.
Soit $X$ la variable modélisant votre durée d'attente (en minutes) avant le prochain passage.

1. Est-il réaliste de lister toutes les valeurs possibles de $X$ à l'aide d'un ensemble de nombres entiers ? Non, car l'attente peut durer $12\text{ min}$, $5.43\text{ min}$, ou encore $18.23948\text{ min}\dots$ L'univers des possibles est un **continu** modélisé par l'intervalle réel $[0, 20]$.
2. Quelle est la probabilité que vous attendiez exactement, à la microseconde près, $10\text{ minutes}$ ? $P(X = 10)$ est nulle ! Diviser un événement unitaire par un ensemble infini non dénombrable donne $0$.
3. Quelle est la probabilité que vous attendiez entre $5$ et $15\text{ minutes}$ ?

Puisque le temps s'écoule de manière homogène, la probabilité correspond au rapport d'étendues de l'intervalle cible par rapport au domaine d'attente complet :
$$P(5 \le X \le 15) = \frac{15 - 5}{20} = \frac{10}{20} = 0.5$$

Vous venez de modéliser votre première **loi de probabilité continue** : la loi Uniforme !

---

## Fondements Théoriques

### 1. Variables Aléatoires Absolument Continues

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé. Une variable aléatoire réelle $X$ est dite absolument continue si sa loi de probabilité peut être représentée à l'aide d'une fonction de densité.

#### L'intégration et la Fonction de Densité ($f$) :
Une fonction $f : \mathbb{R} \to \mathbb{R}$ est une densité de probabilité si elle satisfait deux critères :
1. **Positivité** : $\forall x \in \mathbb{R}, \quad f(x) \ge 0$
2. **Normalisation (Masse totale 100%)** :
$$\int_{-\infty}^{+\infty} f(x) \, dx = 1$$

La probabilité que $X$ prenne sa valeur dans $[a, b]$ est l'aire sous la courbe de la densité :
$$P(a \le X \le b) = \int_{a}^{b} f(x) \, dx$$

---

## 🎨 Schéma Pédagogique Interactif : La Loi Normale de Gauss

La loi normale (ou courbe en cloche) est la distribution continue la plus fondamentale des sciences physiques et sociales (Théorème Central Limite). L'intégrale de sa cloche centrale de rayon $[-\sigma, +\sigma]$ autour de la moyenne $\mu$ concentre $68.2\%$ de la masse totale de probabilité.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Loi Normale: La Courbe en Cloche (Gauss)</text>
  
  <g transform="translate(45, 230)">
    <!-- Axe horizontal -->
    <line x1="0" y1="0" x2="360" y2="0" stroke="#4b5563" stroke-width="2"/>
    <text x="180" y="20" font-family="sans-serif" fill="#ffffff" font-size="12" text-anchor="middle" font-weight="bold">Moyenne (μ)</text>
    
    <!-- Zone ombrée sous la courbe entre μ-σ et μ+σ (Intégrale 68%) -->
    <path d="M 120,0 L 120,-75 C 150,-150 210,-150 240,-75 L 240,0 Z" fill="#4f46e5" fill-opacity="0.3" stroke="#818cf8" stroke-width="1.5"/>
    <text x="180" y="-55" font-family="sans-serif" font-weight="bold" fill="#818cf8" font-size="12" text-anchor="middle">~ 68%</text>
    
    <!-- La cloche de Gauss complete -->
    <path d="M 20,-2 Q 100,-25 120,-75 C 150,-150 210,-150 240,-75 Q 260,-25 340,-2" fill="none" stroke="#f43f5e" stroke-width="3"/>
    
    <!-- Flèches d'écart-type σ -->
    <line x1="120" y1="-25" x2="240" y2="-25" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2,2"/>
    <text x="180" y="-32" font-family="sans-serif" fill="#10b981" font-size="10" text-anchor="middle">Écart-type 2σ</text>
    <circle cx="120" cy="-25" r="3" fill="#10b981"/>
    <circle cx="240" cy="-25" r="3" fill="#10b981"/>
    
    <!-- Indicateurs finaux -->
    <line x1="180" y1="0" x2="180" y2="-150" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="180" cy="-150" r="5" fill="#f59e0b"/>
  </g>
</svg>
</div>

---

### 2. Fonction de Répartition ($F_X$)

Pour toute variable aléatoire $X$, sa fonction de répartition $F_X(x)$ exprime la probabilité cumulée que $X$ soit inférieur ou égal à $x$ :
$$F_X(x) = P(X \le x) = \int_{-\infty}^{x} f(t) \, dt$$

#### Propriétés d'unification :
- $F_X(x)$ est une fonction croissante, continue à droite, de limites $\lim_{x \to -\infty} F_X(x) = 0$ et $\lim_{x \to +\infty} F_X(x) = 1$.
- Par théorème fondamental d'analyse, si la densité $f$ est continue, $F_X$ est dérivable et sa dérivée est le profil de densité : $F_X'(x) = f(x)$.

---

### 3. Lois Continues Usuelles Fondamentales

#### Loi Uniforme sur $[a, b]$ (notée $\mathcal{U}([a, b])$)
Chaque intervalle de même largeur possède exactement la même probabilité de réalisation.
- **Densité** : $f(x) = \frac{1}{b-a}$ si $x \in [a, b]$, et $0$ sinon.
- **Espérance (Moyenne)** : $E(X) = \frac{a+b}{2}$

#### Loi Exponentielle de paramètre $\lambda > 0$ (notée $\mathcal{E}(\lambda)$)
Modélise la durée de vie d'atomes radioactifs ou d'équipements sans vieillissement (sans mémoire).
- **Densité** : $f(x) = \lambda e^{-\lambda x}$ si $x \ge 0$, et $0$ sinon.
- **Fonction de Répartition** : $F(x) = 1 - e^{-\lambda x}$ si $x \ge 0$.
- **Espérance** : $E(X) = \frac{1}{\lambda}$

#### Loi Normale Centrée Réduite (notée $\mathcal{N}(0, 1)$)
- **Densité** : $\varphi(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}}$
- **Espérance** : $E(X) = 0$, **Variance** : $V(X) = 1$.

---

## Exercices Résolus

### Exercice : Calculs sur la loi exponentielle (Durée de vie)
Une ampoule industrielle possède une durée de vie $T$ d'années régie par une loi exponentielle de paramètre $\lambda = 0.5$ (exprimé par $E(T) = \frac{1}{0.5} = 2$ ans).
1. Calculez la probabilité que l'ampoule fonctionne au moins 3 ans.
2. Montrez que cette loi "n'a pas de mémoire", c'est-à-dire que sachant qu'elle a déjà fonctionné 2 ans, la probabilité qu'elle tienne encore 3 ans supplémentaires est identique à sa probabilité initiale de tenir 3 ans.

**Correction Étape par Étape :**
1. **Étape 1 : Calcul de $P(T \ge 3)$**  
   Pour une variable continue exponentielle, la probabilité de dépassement s'évalue aisément à l'aide de sa fonction de répartition :
   $$P(T \ge 3) = 1 - P(T < 3) = 1 - F(3) = 1 - (1 - e^{-3\lambda}) = e^{-3\lambda}$$
   En substituant $\lambda = 0.5$ :
   $$P(T \ge 3) = e^{-3 \times 0.5} = e^{-1.5} \approx 0.223 \quad (22.3\%)$$

2. **Étape 2 : Évaluation conditionnelle (Absence de mémoire)**  
   On cherche $P(T \ge 2 + 3 \mid T \ge 2) = P(T \ge 5 \mid T \ge 2)$.  
   La définition de la probabilité conditionnelle s'écrit :
   $$P(T \ge 5 \mid T \ge 2) = \frac{P(T \ge 5 \cap T \ge 2)}{P(T \ge 2)} = \frac{P(T \ge 5)}{P(T \ge 2)}$$
   Remplaçons par l'écriture analytique établie à l'Étape 1 :
   $$\frac{P(T \ge 5)}{P(T \ge 2)} = \frac{e^{-5\lambda}}{e^{-2\lambda}} = e^{-5\lambda - (-2\lambda)} = e^{-3\lambda} = P(T \ge 3)$$
   La probabilité conditionnelle coïncide parfaitement avec $P(T \ge 3)$.  
   Ce résultat prouve formellement la propriété d'**absence de mémoire des lois exponentielles**.

---

## FAQ Étudiante

<details>
  <summary>Pourquoi est-ce que la probabilité d'un point exact P(X = x) vaut strictement zéro ?</summary>

  C’est l'essence du continu ! Si vous tracez l'intégrale sur un domaine de dimension nul (un simple point $x$), l'aire sous la courbe d'image est néant : $\int_{x}^{x} f(t)dt = 0$. On peut faire une analogie physique : le poids d'un grain de sable sur une plage infiniment dense est nul, bien que la plage entière pèse des tonnes. Ainsi, pour les variables continues, on évalue uniquement des intervalles d'événements.
</details>

<details>
  <summary>Comment centrer et réduire une variable aléatoire Gaussienne générale ?</summary>

  Si votre variable suit une loi normale générale $X \sim \mathcal{N}(\mu, \sigma^2)$, vous pouvez la ramener de force à la loi standard simplifiée $\mathcal{N}(0, 1)$ en appliquant la transformation suivante :  
  $$Z = \frac{X - \mu}{\sigma}$$
  Cette variable $Z$ est parfaitement centrée et réduite, ce qui permet de lire les valeurs de probabilités en utilisant de simples tables numériques de référence (ou la fonction de répartition de Gauss $\Phi$).
</details>

<details>
  <summary>Qu'entend-on par densité non intégrable analytiquement ?</summary>

  C’est le cas de la loi normale ! La densité de Gauss $\varphi(x) = C e^{-x^2/2}$ ne possède aucune primitive s'écrivant à l'aide de fonctions analytiques élémentaires (polynômes, fractions, trigonométrie). On est obligé de passer par de l'intégration numérique par ordinateur ou par des approximations polynômiales pour estimer sa fonction de répartition $\Phi(x)$.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Une fonction f est une densité sur R si elle est positive et si son intégrale sur R vaut :**
- [ ] 0
- [ ] Infini (+∞)
- [x] 1 (ou 100%)
> **Explication :** L'univers complet $\Omega$ représentant l'infinité des possibles réels, la probabilité cumulée sur $\mathbb{R}$ entier doit être égale à la certitude absolue, soit $1$.

**Question 2 : Si la variable continue $X$ suit la loi Uniforme sur l'intervalle $[1, 5]$, son espérance mathématique s'établit à :**
- [ ] 2
- [x] 3
- [ ] 4
> **Explication :** Pour une loi Uniforme, l'espérance est le milieu physique parfait de l'intervalle : $E(X) = \frac{a+b}{2} = \frac{1+5}{2} = 3$.

**Question 3 : Une propriété majeure de la fonction de répartition $F_X(x)$ pour toute variable continue est que :**
- [ ] Ses valeurs peuvent osciller périodiquement
- [x] Elle est impérativement croissante et bornée entre 0 et 1
- [ ] Sa dérivée seconde est toujours égale à zéro
> **Explication :** Plus vous parcourez le domaine vers la droite, plus vous accumulez de probabilité. La fonction est donc monotone croissante, débutant à $0$ en $-\infty$ et plafonnant à la certitude $1$ en $+\infty$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Vérifier les 2 conditions réglementaires de positivité et d'intégrabilité unitaire d'une densité de probabilité ($f(x)$).
- [ ] Evaluer et tracer géométriquement la fonction de répartition associée à une densité continue.
- [ ] Mener des calculs d'intervalles conditionnels sur les lois continues classiques (Uniforme, Exponentielle).
- [ ] Centrer et réduire de manière automatique toute variable normale générale pour lire les valeurs de répartition de Gauss.
