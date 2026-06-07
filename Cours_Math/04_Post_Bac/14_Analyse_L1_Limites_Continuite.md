---
title: 'Analyse L1 : Limites & Continuité'
level: Post_Bac
subLevel: Analyse_L1
order: 14
---
# Analyse L1 : Limites & Continuité

**Niveau** : Post-Bac (Licence 1, Portail MIASHS, CPGE 1ère année)  
**Prérequis** : Notions sur les réels ($\mathbb{R}$), encadrement de valeurs, fonctions circulaires.  
**Objectifs** :
- Assimiler la définition formelle (en $\varepsilon, \delta$) de la limite d'une fonction.
- Distinguer la continuité simple de la continuité uniforme locale.
- Maîtriser le Théorème des Valeurs Intermédiaires (TVI) et ses implications algorithmiques (méthode de dichotomie).

---

## Activités de découverte

### Activité : L'infini apprivoisé par Cauchy et Weierstrass
Historiquement, la notion de "tendre vers" a suscité de violents conflits philosophiques. Qu'est-ce qu'une valeur qui s'approche infiniment près d'un point sans jamais l'atteindre ? Les mathématiciens du XVIIe siècle utilisaient des concepts vagues d'"infiniment petits", menant parfois à des paradoxes.

Pour formaliser rigoureusement, Weierstrass a posé la structure moderne sous forme de "moustiquaire" mathématique.
Supposons que nous voulions prouver que $\lim_{x \to x_0} f(x) = l$.
1. L'adversaire choisit une marge d'erreur admissible $\varepsilon > 0$, aussi minuscule soit-elle.
2. Votre mission d'analyste est de trouver un intervalle de confiance de demi-hauteur $\delta > 0$ autour de $x_0$ tel que toute valeur $x$ dans cet intervalle produise une image $f(x)$ située à une distance de $l$ inférieure à $\varepsilon$.

Si vous pouvez toujours relever ce défi (quel que soit le choix initial de l'adversaire), alors la limite existe !

---

## Fondements Théoriques

### 1. Limite d'une Fonction (Définition formelle)

Soit $f$ une fonction réelle définie sur une partie $I$ de $\mathbb{R}$, et $x_0 \in \mathbb{R}$ un point adhérent à $I$.

#### Définition (Voisinage fini) :
On dit que $f$ admet pour limite $l \in \mathbb{R}$ en $x_0$ si :
$$\forall \varepsilon > 0, \exists \delta > 0, \forall x \in I, \quad |x - x_0| < \delta \implies |f(x) - l| < \varepsilon$$

#### Limite infinie en l'infini :
De même, on dit que $f(x)$ tend vers $+\infty$ quand $x \to +\infty$ si pour tout seuil $M \in \mathbb{R}$ arbitrairement grand, les images finissent par dépasser $M$ :
$$\forall M \in \mathbb{R}, \exists A \in \mathbb{R}, \forall x \in I, \quad x \ge A \implies f(x) \ge M$$

---

## 🎨 Schéma Pédagogique Interactif : L'épreuve $\varepsilon - \delta$

L'illustration suivante modélise le jeu de Weierstrass pour la fonction $f(x) = x^2$ autour de $x_0 = 1$. La bande horizontale violette d'écart $\varepsilon$ délimite la zone de tolérance. La bande verticale verte d'épaisseur $\delta$ est la réponse de l'analyste.

<div align="center">
<svg width="450" height="300" viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Visualisation Formelle : Limites de Fonctions</text>
  
  <g transform="translate(60, 240)">
    <!-- Axes de la boîte -->
    <line x1="0" y1="0" x2="350" y2="0" stroke="#4b5563" stroke-width="2"/>
    <text x="330" y="15" font-family="sans-serif" fill="#9ca3af" font-size="12">x</text>
    <line x1="0" y1="0" x2="0" y2="-200" stroke="#4b5563" stroke-width="2"/>
    <text x="-25" y="-190" font-family="sans-serif" fill="#9ca3af" font-size="12">f(x)</text>
    
    <!-- Zone de tolérance Epsilon -->
    <rect x="0" y="-130" width="350" height="60" fill="#4f46e5" fill-opacity="0.15" stroke="#818cf8" stroke-dasharray="2,2"/>
    <line x1="0" y1="-100" x2="350" y2="-100" stroke="#818cf8" stroke-width="1.5"/>
    <text x="-40" y="-100" font-family="sans-serif" fill="#818cf8" font-size="12" font-weight="bold">l = 1</text>
    <text x="-40" y="-130" font-family="sans-serif" fill="#a78bfa" font-size="10">l + ε</text>
    <text x="-40" y="-70" font-family="sans-serif" fill="#a78bfa" font-size="10">l - ε</text>
    
    <!-- Zone Delta de Weierstrass (Réponse) -->
    <rect x="120" y="-200" width="60" height="200" fill="#10b981" fill-opacity="0.1"/>
    <line x1="150" y1="0" x2="150" y2="-200" stroke="#34d399" stroke-width="1" stroke-dasharray="3,3"/>
    <text x="145" y="15" font-family="sans-serif" fill="#34d399" font-size="12" font-weight="bold">x₀</text>
    
    <!-- Allers-retours Delta -->
    <line x1="120" y1="10" x2="180" y2="10" stroke="#10b981" stroke-width="2"/>
    <text x="135" y="25" font-family="sans-serif" fill="#10b981" font-size="10">2δ</text>
    
    <!-- Graphe de la fonction f(x) = x^2 -->
    <path d="M 10,-10 Q 150,-100 280,-190" fill="none" stroke="#f43f5e" stroke-width="3"/>
    
    <!-- Animation interactive simulée : Cercle qui glisse sur la courbe -->
    <circle cx="150" cy="-100" r="6" fill="#fbbf24">
      <animate attributeName="cx" values="120;150;180;150" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="-64;-100;-136;-100" dur="4s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>
</div>

---

### 2. La Continuité

#### Définition en un point :
Une fonction $f$ est dite continue en $x_0 \in I$ si elle admet une limite finie en ce point égale à sa valeur réelle :
$$\lim_{x \to x_0} f(x) = f(x_0)$$

#### Définition sur un intervalle :
$f$ est continue sur l'intervalle $I$ si elle est continue en tout point $x \in I$.

### 3. Les Théorèmes Fondamentaux

#### Théorème des Valeurs Intermédiaires (TVI)
Soit $f : [a, b] \to \mathbb{R}$ une fonction **continue**.
Pour tout réel $y$ compris entre $f(a)$ et $f(b)$, il existe au moins un réel $c \in [a, b]$ tel que :
$$f(c) = y$$

*Méthode d'application majeure : Détermination d'existence de racines d'équations de type $f(x) = 0$.*

---

## Exercices Résolus

### Exercice 1 : Étude de continuité d'une fonction raccordée
Soit $f : \mathbb{R} \to \mathbb{R}$ définie par :
$$f(x) = \begin{cases} x \sin\left(\frac{1}{x}\right) & \text{si } x \neq 0 \\ 0 & \text{si } x = 0 \end{cases}$$
Montrer que $f$ est continue sur $\mathbb{R}$ tout entier, spécifiquement en $x_0 = 0$.

**Correction Étape par Étape :**
1. **Sur l'intervalle $\mathbb{R}^*$** : Les fonctions circulaires et rationnelles impliquées sont continûment dérivables, donc $f$ est continue par produit et composition de fonctions usuelles d'un ensemble ouvert.
2. **Pour le point critique $x_0 = 0$** : Nous devons majorer $|f(x)|$ pour évaluer la limite.
   On sait que pour tout réel $t$, $|\sin(t)| \le 1$.  
   Ainsi, pour tout $x \neq 0$ :
   $$|f(x)| = \left|x \sin\left(\frac{1}{x}\right)\right| = |x| \cdot \left|\sin\left(\frac{1}{x}\right)\right| \le |x|$$
3. Comme $\lim_{x \to 0} |x| = 0$, par le théorème des gendarmes (encadrement), on en conclut immédiatement :
   $$\lim_{x \to 0} f(x) = 0$$
4. Or $f(0) = 0$. Donc la limite coïncide parfaitement avec l'image définie $f(0)$.
   Conclusion : **La fonction $f$ est rigoureusement continue en $0$.**

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Quelle est la différence fondamentale entre la continuité simple et la continuité uniforme ?</summary>

  C’est un glissement de quantificateurs crucial de L1 !  
  - Pour la **continuité simple** en tout point : le pas constructif $\delta$ dépend de $\varepsilon$ ET du point d'évaluation $x_0$. On l'écrit : $\forall x_0, \forall \varepsilon, \exists \delta(x_0, \varepsilon)\dots$  
  - Pour la **continuité uniforme** (Théorème de Heine) : l'écart $\delta$ dépend UNIQUEMENT d'un budget global $\varepsilon$, et fonctionne uniformément pour tous les points de l'intervalle d'évaluation sans exception. On l'écrit : $\forall \varepsilon, \exists \delta(\varepsilon), \forall (x, y)\dots$  
  Une fonction continue sur un intervalle fermé borné $[a, b]$ est automatiquement uniformément continue (Heine).
</details>

<details>
  <summary>Pourquoi est-ce que le TVI nécessite impérativement l'hypothèse de continuité ?</summary>

  Si la fonction n'est pas parfaitement continue, sa trajectoire peut "sauter" au-dessus d'une ligne d'ordonnée cible sans jamais la percer. Par exemple, la partie entière $f(x) = \lfloor x \rfloor$ passe de $0$ à $1$ instantanément en $x=1$ sans jamais prendre la valeur $0.5$. La continuité assure mathématiquement qu'il n'y a pas de fracture ou de téléportation de valeurs de coordonnées.
</details>

<details>
  <summary>Qu'entend-on par prolongement par continuité en un point ouvert ?</summary>

  Si une fonction $f(x)$ n'est pas définie en $x_0$ (par exemple $f(x) = \frac{\sin x}{x}$ au point $x_0 = 0$) mais qu'elle y possède une limite finie réelle $l$ quand $x \to x_0$, on peut construire une nouvelle fonction $\tilde{f}$ définie sur l'ensemble plus grand, valant $f(x)$ partout et $l$ en $x_0$. $\tilde{f}$ est alors parfaitement continue en $x_0$.
</details>

---

## 📝 Mini-Quiz

**Question 1 : La fonction $f(x) = \frac{1}{x}$ admet-elle un prolongement par continuité sur l'ensemble $[0, 1]$ ?**
- [ ] Oui, en posant f(0) = 0
- [ ] Oui, en posant f(0) = 1
- [x] Non, car sa limite en 0 à droite est infinie (+∞)
> **Explication :** Pour pouvoir prolonger par continuité une fonction en un point d'accumulation $a$, il est absolument obligatoire que la limite de la fonction en ce point soit un nombre **réel fini**. Or, $\frac{1}{x}$ explose à $+\infty$ en $0^+$, rendant tout prolongement impossible.

**Question 2 : Le Théorème des Valeurs Intermédiaires appliqué à $f(x) = \cos(x) - x$ sur $[0, \pi]$ permet d'affirmer que :**
- [x] Il existe une solution unique à f(x) = 0 car f est continue et strictement monotone
- [ ] Il y a une infinité de solutions périodiques complexes
- [ ] L'équation n'a aucun zéro réel possible
> **Explication :** En évaluant les bornes : $f(0) = 1 - 0 = 1 > 0$ et $f(\pi) = -1 - \pi < 0$. Par continuité de $f$ sur le segment $[0, \pi]$, le TVI garantit l'existence d'au moins une solution. De plus, la dérivée $f'(x) = -\sin(x) - 1$ est strictement négative sur $]0, \pi[$, assurant une stricte décroissance (donc unicité absolue de la racine).

**Question 3 : La composée de deux fonctions continues en un point commun est-elle toujours continue ?**
- [x] Oui, c'est un théorème fondamental d'analyse réelle locale
- [ ] Non, la continuité peut se briser s'il y a un point singulier
- [ ] Uniquement si les fonctions possèdent le même signe de dérivation
> **Explication :** Si $f$ est continue en $x_0$ et $g$ continue en $f(x_0)$, alors la fonction composée $h = g \circ f$ est impérativement continue en ce point critique $x_0$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Maîtriser l'écriture formelle avec moustiquaire symbolique d'une limite ($\varepsilon, \delta$).
- [ ] Interpréter graphiquement la limite et le point d'accumulation ouverte.
- [ ] Appliquer rigoureusement le Théorème des Valeurs Intermédiaires pour affirmer l'existence de racines réelles.
- [ ] Identifier et justifier l'existence de prolongements par continuité en un point de division par zéro.
