---
title: 'Prépa Ingénieur : La Transformée de Laplace'
level: Post_Bac
subLevel: Prep_Ingenieur
order: 22
---
# Prépa Ingénieur : La Transformée de Laplace

**Niveau** : Post-Bac (Classes Préparatoires Scientifiques, Cycle d'Ingénieur L3, Automatique & Traitement du Signal)  
**Prérequis** : Intégrales généralisées, équations différentielles linéaires ordinaires.  
**Objectifs** :
- Comprendre la transformée de Laplace comme outil d'isomorphisme pour convertir des équations différentielles temporelles compliquées en simples équations algébriques.
- Maîtriser les propriétés fondamentales (linéarité, déviation temporelle, dérivation, convolution).
- Appliquer la transformée de Laplace pour résoudre des systèmes dynamiques asservis et tracer des diagrammes de blocs.

---

## Activités de découverte

### Activité : Le traducteur universel d'équations
En ingénierie et en sciences physiques, nous faisons face à de redoutables équations différentielles décrivant le mouvement d'un robot, la dynamique thermique d'un bâtiment ou les circuits électriques de puissance. Résoudre ces équations dans le domaine temporel nécessite souvent de longues manipulations analytiques de calcul infinitésimal.

Oliver Heaviside a proposé une idée fabuleuse :
1. Envoyer notre fonction physique du temps (notée $f(t)$) dans une "zone de traduction spectrale" appelée le domaine complexe de Laplace (ou symbolique), à travers une intégrale de projection exponentielle. On obtient une fonction complexe d'une variable fréquentielle $s$ : $F(s)$.
2. Les opérations de dérivation temporelle brutales (ex: $f'(t)$ or $f''(t)$) se traduisent dans cette zone par de banales et simples multiplications algébriques par la variable fréquentielle complexe $s$.
3. Résoudre l'équation algébrique simple obtenue dans l'espace complexe.
4. Appliquer la traduction inverse pour revenir triomphalement dans le domaine temporel d'origine !

Cette activité modélise le processus d'**analyse fréquentielle de Laplace**, qui est le langage universel de l'automatique industrielle.

---

## Fondements Théoriques

### 1. Définition et Intégrabilité

Soit $f : \mathbb{R}^+ \to \mathbb{R}$ une fonction d'évaluation continue par morceaux et à croissance exponentielle limitée (c'est-à-dire qu'il existe deux réels $M$ et $\alpha$ pour lesquels $|f(t)| \le M e^{\alpha t}$).

#### Définition de la transformée de Laplace :
On appelle transformée de Laplace de $f(t)$ la fonction complexe $F(s) = \mathcal{L}\{f(t)\}$ définie par l'intégrale généralisée convergeant pour $\text{Re}(s) > \alpha$ :
$$F(s) = \int_{0}^{+\infty} f(t) e^{-s t} \, dt$$

---

## 🎨 Schéma Pédagogique Interactif : Schéma-Bloc d'un Système Asservi

En ingénierie des systèmes, le domaine fréquentiel permet de modéliser des boucles de rétroaction complexes sous la forme de diagrammes de transfert. L'illustration suivante détaille une boucle fermée classique avec un comparateur d'erreur, un correcteur de transfert $G(s)$ et un retour capteur $H(s)$ d'atténuation.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Schéma-Bloc Temporel de Laplace Y(s)/R(s)</text>
  
  <g transform="translate(10, 10)">
    <!-- Entrée consigne -->
    <text x="25" y="145" font-family="sans-serif" fill="#ffffff" font-size="11" font-weight="bold">R(s)</text>
    <line x1="55" y1="140" x2="100" y2="140" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow_laplace_block)"/>
    
    <!-- Comparateur (Sommateur) -->
    <circle cx="115" cy="140" r="15" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
    <text x="115" y="144" font-family="sans-serif" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">+</text>
    <text x="100" y="165" font-family="sans-serif" font-weight="bold" fill="#ef4444" font-size="12">-</text>
    
    <!-- Erreur d'écart -->
    <line x1="130" y1="140" x2="165" y2="140" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow_laplace_block)"/>
    
    <!-- Bloc de commande G(s) -->
    <rect x="165" y="115" width="80" height="50" fill="#4f46e5" stroke="#818cf8" stroke-width="2" rx="6"/>
    <text x="205" y="145" font-family="sans-serif" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">G(s)</text>
    
    <!-- Sortie consigne Y(s) -->
    <line x1="245" y1="140" x2="350" y2="140" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow_laplace_block)"/>
    <circle cx="295" cy="140" r="4" fill="#fbbf24"/>
    <text x="360" y="145" font-family="sans-serif" fill="#ffffff" font-size="11" font-weight="bold">Y(s)</text>
    
    <!-- Ligne de retour boucle de rétroaction -->
    <line x1="295" y1="140" x2="295" y2="210" stroke="#10b981" stroke-width="2"/>
    <line x1="295" y1="210" x2="245" y2="210" stroke="#10b981" stroke-width="2" marker-end="url(#arrow_laplace_block)"/>
    
    <!-- Bloc de retour H(s) -->
    <rect x="165" y="185" width="80" height="50" fill="#065f46" stroke="#34d399" stroke-width="2" rx="6"/>
    <text x="205" y="215" font-family="sans-serif" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">H(s)</text>
    
    <!-- Retour vers comparateur -->
    <line x1="165" y1="210" x2="115" y2="210" stroke="#10b981" stroke-width="2"/>
    <line x1="115" y1="210" x2="115" y2="155" stroke="#10b981" stroke-width="2" marker-end="url(#arrow_laplace_block)"/>
  </g>
  
  <defs>
    <marker id="arrow_laplace_block" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>
</div>

---

### 2. Propriétés Algébriques Cardinales

Ces identités permettent de manipuler les équations sans repasser par le formalisme intégral :

- **Linéarité** : $\mathcal{L}\{a f(t) + b g(t)\} = a F(s) + b G(s)$
- **Dérivation Temporelle (Langage Heaviside)** :
  $$\mathcal{L}\{f'(t)\} = s F(s) - f(0^+)$$
  $$\mathcal{L}\{f''(t)\} = s^2 F(s) - s f(0^+) - f'(0^+)$$
- **Convolution (Transformation en Produit Brut)** :
  $$\mathcal{L}\{(f * g)(t)\} = F(s) \times G(s)$$

---

### Formulaire de Correspondance Table-Clé

1. **Échelon de Heaviside (Signal stable constant $1(t)$)** :
   $$\mathcal{L}\{1(t)\} = \frac{1}{s}$$
2. **Rampe de vitesse ($t \cdot 1(t)$)** :
   $$\mathcal{L}\{t\} = \frac{1}{s^2}$$
3. **Exponentielle amortie ($e^{-at} \cdot 1(t)$)** :
   $$\mathcal{L}\{e^{-at}\} = \frac{1}{s + a}$$
4. **Oscillateur harmonique ($\sin(\omega t) \cdot 1(t)$)** :
   $$\mathcal{L}\{\sin(\omega t)\} = \frac{\omega}{s^2 + \omega^2}$$

---

## Exercices Résolus

### Exercice : Résolution d'équations différentielles par Laplace
Résoudre, à l'aide de la transformée de Laplace, l'équation différentielle linéaire du second degré avec conditions initiales spécifiques modélisant un système de masse-ressort amorti :
$$\begin{cases} y''(t) + 3y'(t) + 2y(t) = e^{-3t} \quad \text{pour } t \ge 0 \\ y(0^+) = 0, \quad y'(0^+) = 0  \end{cases}$$

**Correction Étape par Étape :**
1. **Étape 1 : Projection fréquentielle complète**  
   Appliquons l'opérateur de Laplace $\mathcal{L}$ à chacun des membres de l'équation différentielle linéaire :
   $$\mathcal{L}\{y''(t)\} + 3\mathcal{L}\{y'(t)\} + 2\mathcal{L}\{y(t)\} = \mathcal{L}\{e^{-3t}\}$$
   En convertissant via le formulaire et en annulant les conditions initiales amorties ($y(0^+)=y'(0^+)=0$) :
   $$s^2 Y(s) + 3s Y(s) + 2 Y(s) = \frac{1}{s + 3}$$
   $$\left(s^2 + 3s + 2\right) Y(s) = \frac{1}{s + 3}$$

2. **Étape 2 : Factorisation et Isolement de $Y(s)$**  
   Calculons les racines de la base caractéristique : $s^2 + 3s + 2 = (s + 1)(s + 2)$.  
   Ainsi :
   $$Y(s) = \frac{1}{(s + 1)(s + 2)(s + 3)}$$

3. **Étape 3 : Décomposition en éléments simples (DES)**  
   Créons l'équivalent sous forme de somme fractionnaire unitaire :
   $$Y(s) = \frac{A}{s + 1} + \frac{B}{s + 2} + \frac{C}{s + 3}$$
   Par identification de résidus (méthode de couverture) :
   - $A = \lim_{s \to -1} (s+1)Y(s) = \frac{1}{(-1+2)(-1+3)} = \frac{1}{1 \times 2} = \frac{1}{2}$
   - $B = \lim_{s \to -2} (s+2)Y(s) = \frac{1}{(-2+1)(-2+3)} = \frac{1}{-1 \times 1} = -1$
   - $C = \lim_{s \to -3} (s+3)Y(s) = \frac{1}{(-3+1)(-3+2)} = \frac{1}{-2 \times -1} = \frac{1}{2}$
   On réécrit donc la solution sous sa forme complexe modifiée :
   $$Y(s) = \frac{1}{2} \cdot \frac{1}{s+1} - \frac{1}{s+2} + \frac{1}{2} \cdot \frac{1}{s+3}$$

4. **Étape 4 : Inversion fréquentielle temporelle**  
   Par lecture unitaire inverse immédiate de la table exponentielle :
   $$y(t) = \mathcal{L}^{-1}\{Y(s)\} = \left( \frac{1}{2} e^{-t} - e^{-2t} + \frac{1}{2} e^{-3t} \right) \cdot 1(t)$$
   Conclusion : **La trajectoire temporelle continue exacte de notre système s'établit parfaitement sans aucune intégration de constantes d'Euler génériques.**

---

## FAQ Étudiante

<details>
  <summary>Qu'entend-on par Fonction de Transfert G(s) d'un système asservi ?</summary>

  La **Fonction de Transfert** s'établit comme le ratio universel de la transformée de Laplace du signal de sortie $Y(s)$ divisé par la transformée du signal d'entrée $R(s)$, en gelant absolument toutes les conditions d'origine réelles à zéro ($y(0) = 0, y'(0) = 0\dots$) :  
  $$G(s) = \frac{Y(s)}{R(s)}$$
  C'est l'identité dynamique absolue de notre système asservi, indépendante du type d'entrée extérieure.
</details>

<details>
  <summary>Pourquoi est-ce que les pôles complexes d'une fonction de transfert régissent la stabilité d'un avion ?</summary>

  Les pôles d'un filtre ou système sont les zéros (racines) de la base du dénominateur dynamique de sa fonction de transfert $G(s) = \frac{N(s)}{D(s)}$. S'il y a des pôles complexes possédant une **partie réelle strictement positive** ($\text{Re}(p_k) > 0$), cela engendre temporellement des termes de type $e^{\text{Re}(p_k) t}$ qui explosent vers l'infini. Le système est alors violemment instable (crash, emballement thermique...).
</details>

<details>
  <summary>Quelle différence fondamentale sépare Laplace de Fourier ?</summary>

  Fourier est une projection sur des fréquences purement harmoniques réelles ($i\omega$). Elle analyse des signaux stationnaires périodiques existants à l'infini. Laplace généralise cela en utilisant un plan fréquentiel complet de variables complexes $s = \sigma + i\omega$. La partie réelle $\sigma$ fait office d'amortissement de force, permettant de traiter des signaux instables explosifs et d'analyser des systèmes transitoires dès leur démarrage à $t=0$.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Que devient l'opération temporelle de convolution (f * g)(t) après projection par Laplace ?**
- [ ] Une intégrale de contour de dimension Cauchy
- [ ] Une dérivation par rapport à la variable s
- [x] Un produit simple algébrique direct F(s) * G(s)
> **Explication :** C’est la force absolue de la théorie : le théorème de convolution montre que l'opérateur de convolution se convertit en une banale multiplication linéaire de polynômes spectraux.

**Question 2 : La fonction G(s) = 5 / (s + 2) présente un pôle d'asservissement en :**
- [ ] s = 5
- [ ] s = 2
- [x] s = -2
> **Explication :** Les pôles sont déterminés en posant le dénominateur égal à zéro : $s + 2 = 0 \implies s = -2$. Comme sa partie réelle est strictement négative (-2 < 0), le système d'ordre 1 est stable.

**Question 3 : La transformée de Laplace d'une fonction échelon unitaire s'écrit de manière stable :**
- [ ] 1
- [x] 1 / s
- [ ] e^(-s)
> **Explication :** Par calcul intégral fondamental : $\int_{0}^{+\infty} 1 \cdot e^{-st} \, dt = \left[ -\frac{e^{-st}}{s} \right]_{0}^{+\infty} = 0 - \left(-\frac{1}{s}\right) = \frac{1}{s}$ pour une partie réelle de $s$ positive.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Connaitre la définition mathématique intégrale et l'abscisse de convergence globale de Laplace.
- [ ] Convertir des dérivations de signaux en expressions polynomiales simples de variable $s$.
- [ ] Résoudre des DES complexes de fonctions rationnelles pour inverser des signaux dans le domaine temporel.
- [ ] Formaliser et modéliser des réseaux d'asservissement d'ingénieurs par des diagrammes de transfert en boucle fermée.
