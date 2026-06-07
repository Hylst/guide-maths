---
title: 'Analyse L1 : Dérivabilité & Développements Limités'
level: Post_Bac
subLevel: Analyse_L1
order: 15
---
# Analyse L1 : Dérivabilité & Développements Limités

**Niveau** : Post-Bac (Licence 1, Portail MIASHS, CPGE 1ère année)  
**Prérequis** : Limites et continuité des fonctions réelles.  
**Objectifs** :
- Maîtriser le concept de dérivabilité locale et le lien fondamental avec l'approximation de premier ordre (tangente).
- Comprendre et savoir appliquer le Théorème de Rolle et des Accroissements Finis (TAF).
- Calculer et utiliser des Développements Limités (DL) par les formules de Taylor-Young pour évaluer des limites complexes et étudier des positions relatives de courbes.

---

## Activités de découverte

### Activité : Le radar de contrôle routier
Un conducteur parcourt une autoroute rectiligne dotée de deux barrières de péage distantes de $100\text{ km}$. Le trajet s'effectue en exactement $30\text{ minutes}$ ($0.5\text{ heure}$).
À chaque péage, la vitesse du véhicule mesurée est de $110\text{ km/h}$. Le conducteur affirme donc qu'il n'a commis aucun excès au regard de la vitesse réglementaire de $130\text{ km/h}$.

Pourtant, la gendarmerie l'attend à la sortie pour lui dresser un procès-verbal pour excès de vitesse. 
1. Calculez sa vitesse moyenne sur l'ensemble du parcours.
2. Pourquoi peut-on affirmer qu'à un moment précis du trajet, le compteur de vitesse du véhicule indiquait exactement cette vitesse moyenne (voire plus) ?

C'est l'illustration physique directe du **Théorème des Accroissements Finis (TAF)**. Si la fonction position est continue et dérivable, la vitesse instantanée coïncide nécessairement avec la vitesse moyenne à un moment donné du trajet.

---

## Fondements Théoriques

### 1. Dérivabilité locale

Soit $f : I \to \mathbb{R}$ une fonction réelle et $x_0 \in I$.

#### Définition (Vecteur vitesse locale) :
La fonction $f$ est dite dérivable en $x_0$ si le taux de variation autour de ce point admet une limite finie réelle :
$$f'(x_0) = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}$$

Si cette limite existe, la courbe admet au point $(x_0, f(x_0))$ une droite tangente d'équation d'approximation de premier ordre :
$$y = f'(x_0)(x - x_0) + f(x_0)$$

---

## 🎨 Schéma Pédagogique Interactif : Le Théorème de Rolle

Le Théorème de Rolle s'énonce ainsi : si une fonction continue sur $[a, b]$ et dérivable sur $]a, b[$ vérifie $f(a) = f(b)$, alors il existe un point intermédiaire $c$ où la tangente est parfaitement horizontale ($f'(c) = 0$).

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Théorème de Rolle : Tangente Horizontale</text>
  
  <g transform="translate(50, 200)">
    <!-- Axe horizontal -->
    <line x1="0" y1="0" x2="350" y2="0" stroke="#4b5563" stroke-width="2"/>
    
    <!-- Bornes a et b -->
    <line x1="60" y1="5" x2="60" y2="-5" stroke="#9ca3af" stroke-width="2"/>
    <text x="55" y="20" font-family="sans-serif" fill="#9ca3af" font-size="12">a</text>
    
    <line x1="290" y1="5" x2="290" y2="-5" stroke="#9ca3af" stroke-width="2"/>
    <text x="285" y="20" font-family="sans-serif" fill="#9ca3af" font-size="12">b</text>
    
    <!-- Valeurs identiques f(a) = f(b) -->
    <line x1="60" y1="-60" x2="290" y2="-60" stroke="#818cf8" stroke-dasharray="3,3" stroke-width="1.5"/>
    <circle cx="60" cy="-60" r="4" fill="#818cf8"/>
    <circle cx="290" cy="-60" r="4" fill="#818cf8"/>
    
    <!-- Courbe continue f -->
    <path d="M 60,-60 C 120,-150 200,-110 290,-60" fill="none" stroke="#f43f5e" stroke-width="3"/>
    
    <!-- Point intermédiaire c stable -->
    <line x1="140" y1="0" x2="140" y2="-128" stroke="#34d399" stroke-width="1.5" stroke-dasharray="2,2"/>
    <text x="135" y="20" font-family="sans-serif" fill="#34d399" font-size="12" font-weight="bold">c</text>
    <circle cx="140" cy="-128" r="5" fill="#34d399"/>
    
    <!-- Tangente horizontale (Dérivée nulle f'(c) = 0) -->
    <line x1="90" y1="-128" x2="190" y2="-128" stroke="#10b981" stroke-width="3">
      <!-- Petite oscillation pour la démo -->
      <animate attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="2s" repeatCount="indefinite"/>
    </line>
    <text x="195" y="-132" font-family="sans-serif" fill="#10b981" font-size="10" font-weight="bold">f'(c) = 0</text>
  </g>
</svg>
</div>

---

### 2. Les Développements Limités (DL)

Un développement limité permet d'approcher localement une courbe complexe par un polynôme algébrique simple.

#### Formule de Taylor-Young
Soit $f$ une fonction de classe $\mathcal{C}^n$ sur un intervalle contenant $0$. Le développement limité de $f$ d'ordre $n$ en $0$ (aussi appelé Maclaurin) s'écrit sous la forme suivante :
$$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \dots + \frac{f^{(n)}(0)}{n!}x^n + o(x^n)$$

Où $o(x^n)$ (petit o de $x^n$) représente le terme résiduel d'erreur négligeable par rapport à $x^n$ lorsque $x \to 0$.

---

### Formulaires essentiels en 0 (DL d'ordre n)

Observe la convergence locale des polynômes de Taylor grâce à notre simulateur interactif. En augmentant l'ordre $n$, la courbe polynomiale s'ajuste avec une précision infinie et croissante à l'origine $x=0$ :

![Développements Limités](./assets/taylor_expansion.svg)

1. **Exponentielle** :
   $$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots + \frac{x^n}{n!} + o(x^n)$$
2. **Cosinus** :
   $$\cos(x) = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots + (-1)^p \frac{x^{2p}}{(2p)!} + o(x^{2p})$$
3. **Sinus** :
   $$\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots + (-1)^p \frac{x^{2p+1}}{(2p+1)!} + o(x^{2p+1})$$
4. **Logarithme** :
   $$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + (-1)^{n-1} \frac{x^n}{n} + o(x^n)$$

---

## Exercices Résolus

### Exercice 1 : Calcul de limite délicat par DL
Calculer la limite suivante lorsque $x \to 0$ :
$$\lim_{x \to 0} \frac{e^x - \cos(x) - x}{x^2}$$

**Correction Étape par Étape :**
1. **Analyse de la forme indéterminée** : En $x=0$, le numérateur vaut $e^0 - \cos(0) - 0 = 1 - 1 - 0 = 0$, et le dénominateur vaut $0^2 = 0$. On fait face à une forme indéterminée "0/0". La règle standard de substitution directe échoue.
2. **Utilisation des DL d'ordre 2** : Écrivons les développements limités à l'ordre 2 au voisinage de $0$.
   $$e^x = 1 + x + \frac{x^2}{2} + o(x^2)$$
   $$\cos(x) = 1 - \frac{x^2}{2} + o(x^2)$$
3. **Soustraction analytique au numérateur** :
   $$e^x - \cos(x) - x = \left(1 + x + \frac{x^2}{2} + o(x^2)\right) - \left(1 - \frac{x^2}{2} + o(x^2)\right) - x$$
   Simplifions les blocs polynomiaux :
   $$= (1 - 1) + (x - x) + \left(\frac{x^2}{2} - \left(-\frac{x^2}{2}\right)\right) + o(x^2) = x^2 + o(x^2)$$
4. **Division par le dénominateur** :
   $$\frac{e^x - \cos(x) - x}{x^2} = \frac{x^2 + o(x^2)}{x^2} = 1 + o(1)$$
5. Lorsque $x \to 0$, le reste $o(1)$ tend vers $0$.
   Conclusion :
   $$\mathbf{\lim_{x \to 0} \frac{e^x - \cos(x) - x}{x^2} = 1}$$

---

## FAQ Étudiante

<details>
  <summary>Pourquoi est-ce que les développements limités d'une fonction paire ne contiennent que des puissances paires ?</summary>

  C’est une superbe propriété de symétrie ! Le développement limité en 0 d'une fonction paire est lui-même symétrique. Toutes les dérivées d'ordre impair d'une fonction paire s'annulent impérativement au point d'origine 0 ($f'(0) = 0$, $f'''(0) = 0$, etc.). Ainsi, par la formule de Taylor, les parties de puissances impaires s'effacent d'elles-mêmes de l'expression polynomiale.
</details>

<details>
  <summary>Qu'est-ce que la règle de L'Hôpital et pourquoi lui préférer les DL ?</summary>

  La règle de L'Hôpital s'utilise pour évaluer des limites complexes en utilisant les dérivées : $\lim \frac{f}{g} = \lim \frac{f'}{g'}$. Bien qu'elle soit séduisante, elle échoue ou devient extrêmement laborieuse dès que l'indétermination implique des ordres supérieurs (par exemple s'il faut dériver 4 fois de suite). Les DL effectuent immédiatement une découpe de toutes les puissances de manière globale et transparente, ce qui est beaucoup plus robuste analytiquement.
</details>

<details>
  <summary>Que signifie concrètement la notation de Landau ("un petit o de x²") ?</summary>

  La notation $o(x^2)$ représente un terme d'erreur ("le reste") qui est infiniment plus petit que $x^2$ au voisinage de la cible. Mathematisé, cela signifie qu'un terme $R(x) = o(x^2)$ satisfait l'égalité : $\lim_{x \to 0} \frac{R(x)}{x^2} = 0$. C'est une garantie que l'approximation polynomiale est fidèle et rigoureuse.
</details>

<details>
  <summary>Peut-on librement additionner, multiplier ou composer deux développements limités ?</summary>

  Oui, à condition de faire très attention à l'ordre et d'éliminer systématiquement les puissances supérieures à l'ordre cible $n$ :
  1. **Addition / Soustraction** : Directe, terme par terme. On conserve le même ordre commun $n$.
  2. **Multiplication** : On effectue le produit usuel des polynômes mais en tronquant (jetant) toutes les puissances strictement supérieures à $n$.
  3. **Composition** : Pour calculer le DL de $f(g(x))$, il faut que $g(x) \to 0$ quand $x \to 0$ (pas de terme constant hors de 0 dans $g$). On substitue alors le polynôme de $g(x)$ à la place de la variable dans le DL de $f$ et on tronque à l'ordre $n$.
</details>

<details>
  <summary>Quelle est la différence fondamentale entre la formule de Taylor-Young et la formule de Taylor-Lagrange ?</summary>

  C'est une différence d'utilité locale contre globale :
  - **Taylor-Young** fournit un résultat purement *local* (au voisinage immédiat de 0). Son erreur reste qualitative sous forme de notation de Landau $o(x^n)$. Elle est idéale pour calculer des limites.
  - **Taylor-Lagrange** fournit un résultat *global* et quantifiable sur tout un intervalle $[a, b]$. Son reste est explicite et s'écrit $\frac{f^{(n+1)}(c)}{(n+1)!}(b-a)^{n+1}$ pour un certain $c \in ]a, b[$. Elle est indispensable pour majorer rigoureusement des erreurs ou prouver des inégalités sur un domaine complet.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Quel est le développement limité à l'ordre 1 en 0 de la fonction $f(x) = \cos(x)$ ?**
- [ ] cos(x) = 1 - x + o(x)
- [x] cos(x) = 1 + o(x)
- [ ] cos(x) = x + o(x)
> **Explication :** La formule de Taylor donne $\cos(x) = \cos(0) - \sin(0)x + o(x) = 1 - 0x + o(x) = 1 + o(x)$. Le premier terme non nul hors de l'unité est de degré 2 ($-\frac{y^2}{2}$), donc à l'ordre 1, le polynôme se résume à la constante 1.

**Question 2 : Le Théorème des Accroissements Finis nécessite que la fonction soit :**
- [ ] Continue sur l'intervalle ouvert et dérivable sur les réelles fermés
- [x] Continue sur l'intervalle fermé [a, b] et dérivable sur l'intervalle ouvert ]a, b[
- [ ] Uniquement positive et monotone décroissante
> **Explication :** C’est la condition d'existence standard de la théorie mathématique locale. Les points d'extrémité ne requièrent que la continuité de limite, tandis que la dérivabilité (la vitesse) doit exister à l'intérieur de l'intervalle.

**Question 3 : Si $f'(x_0) = 0$ et $f''(x_0) > 0$, alors la fonction présente en $x_0$ :**
- [x] Un minimum local
- [ ] Un maximum local
- [ ] Un point d'inflexion non stationnaire
> **Explication :** La dérivée première nulle indique un point critique plan tangent horizontal. La dérivée seconde strictement positive indique une concavité dirigée vers le haut (courbe en forme de « U » ou bol de gravité), prouvant que ce point critique est un minimum structurel de valeur.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Formaliser et calculer le taux d'accroissement pour évaluer l'existence d'une dérivée locale.
- [ ] Enoncer et tracer géométriquement les moustaches du Théorème des Accroissements Finis.
- [ ] Connaître par cœur les développements limités d'ordre $n$ des fonctions usuelles ($e^x, \cos x, \sin x, \ln(1+x)$).
- [ ] Utiliser les développements limités pour lever des formes indéterminées et en déduire la position relative des droites tangentes.
