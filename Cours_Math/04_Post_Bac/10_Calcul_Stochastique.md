---
title: 'Chapitre 10 : Calcul Stochastique'
level: Post_Bac
subLevel: Universite_L2_L3
order: 10
---
# Chapitre 10 : Introduction au Calcul Stochastique

**Niveau** : Master 1 (M1 / Fin de Licence - Post-Bac)  
**Prérequis** : Probabilités continues, calcul intégral, limites.  
**Objectifs** : 
- Comprendre la nature d'un "Processus Aléatoire" continu au cours du temps.
- Saisir la puissance et le danger fractal du Mouvement Brownien.
- Découvrir l'Intégrale stochastique transcendante ($dW$).
- Savoir énoncer le fameux Lemme d'Itô (le "Taylor" de l'aléatoire).

---

## 🎨 Animation Interactive : Le Mouvement Brownien
En 1827, le botaniste Robert Brown regarde du pollen dans l'eau au microscope. Les grains sautillent inexplicablement dans tous les sens, sans cesse : ils sont frappés par le frissonnement des atomes d'eau. C'est l'essence de l'aléatoire continu : le Mouvement Brownien standard (noté $W_t$). Au contraire d'une belle courbe lisse du Lycée, il est "infiniment brisé", impossible à dériver en aucun endroit de la courbe !

<div align="center">
<svg width="500" height="250" viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" style="background:#000; border-radius:12px;">
  <line x1="20" y1="125" x2="480" y2="125" stroke="#333" stroke-width="1" />
  
  <g fill="none" stroke="#10b981" stroke-width="2" stroke-linejoin="round">
    <!-- Un chemin généré simulant une fractale boursière brownienne -->
    <path d="M 20 125 L 30 115 L 40 100 L 50 120 L 60 135 L 70 110 L 80 140 L 90 120 L 100 90 L 110 80 L 120 100 L 130 90 L 140 110 L 150 145 L 160 160 L 170 140 L 180 170 L 190 190 L 200 175 L 210 160 L 220 150 L 230 140 L 240 135 L 250 110 L 260 80 L 270 95 L 280 60 L 290 50 L 300 70 L 310 90 L 320 105 L 330 90 L 340 70 L 350 40 L 360 50 L 370 70 L 380 90 L 390 115 L 400 100 L 410 110 L 420 130 L 430 115 L 440 90 L 450 60 L 460 75 L 470 50 L 480 30"
          stroke-dasharray="1000" stroke-dashoffset="1000">
      <animate attributeName="stroke-dashoffset" values="1000; 0" dur="4s" fill="freeze" />
    </path>
  </g>
  <text x="30" y="30" fill="#fff" font-family="monospace" opacity="0">
    <animate attributeName="opacity" values="0; 0; 1" keyTimes="0; 0.9; 1" dur="4.2s" fill="freeze" />
    dW_t ~ N(0, dt)
  </text>
</svg>

  <em>$W_t$ possède une variation d'ordre $\sqrt{dt}$, alors que le classique était $dt$.</em>
</div>

---

## Explications et Théorie

### 1. Processus Aléatoire
Plutôt qu'une seule variable $X$ (un tirage de dés), un processus aléatoire $X_t$ est la donnée d'une variable différente **à chaque instant $t$**.
*Exemple : La valeur d'une action boursière à l'instant $t$. Les infinis tirages de "dés" cumulés au fil du temps tracent une trajectoire capricieuse.*

### 2. Le Mouvement Brownien (Processus de Wiener)
C'est LA brique de base du continu. Noté $W_t$.
Propriétés :
1. $W_0 = 0$ (On part de 0).
2. Le processus est continu.
3. Les accroissements sont singuliers, normaux (Gaussiens) et indépendants. Sur la période $dt$, $W_{t+dt} - W_t$ suit une distribution Normale $\mathcal{N}(0, dt)$. 
*Conséquence terrible : En physique et en maths, la courbe est fractale : **elle n'est nulle part dérivable !*** On ne peut plus utiliser Calculus de Newton ($dt$) !

### 3. L'Intégrale Stochastique (Kiyosi Itô)
Comment intégrer ou dériver une chose non-dérivable ?! Kiyosi Itô, génie japonais de 1944, définit une nouvelle Intégrale "Stochastique" qui somme les aires de trapèzes très particuliers "évalués au point gauche" (pour respecter le non-voyage dans le temps "l'adaptabilité" / la filtration stochastique).
L'intégrale $\int f(t) dW_t$ est née.

### 4. Le Lemme d'Itô (La perle)
Au lycée, une dérivée en chaîne fait : $df(X_t) = f'(X_t)dX_t$.
Dans le monde stochastique avec le Brownien, secoué par l'infini tremblement des carrés de $\sqrt{dt}$, un nouveau terme apparaît obligatoirement appelé **terme quadratique** ! Le Lemme de Taylor est modifié en Lemme d'Itô :
$$ df(t, X_t) = \frac{\partial f}{\partial t}dt + \frac{\partial f}{\partial x}dX_t + \frac{1}{2}\frac{\partial^2 f}{\partial x^2}(dX_t)^2 $$
Avec la règle atomique magique : **$dW_t \times dW_t = dt$**.

---

## 💡 Le savais-tu ?

Même si ce chapitre d'équation différentielle abstraite te paraît lointain, c'est **cette équation précise (le Lemme d'Itô)** qui régit en ce moment même les milliards de dollars échangés à Wall Street. Appliquée aux actions boursières, elle a permis dans les années 1970 au mathématicien Fischer Black et Myron Scholes de créer l'équation légendaire dite *Black-Scholes* permettant de déterminer le prix mathématiquement "juste" d'une action financière optionnelle (Ils ont eu le Prix Nobel d'Économie pur pour ce calcul stochastique dérivé de ce chapitre) !

---

## Exercices

**🟢 Exercice A (Les Probabilités Continues)**
1. **L'Attente et la Dispersion** : Un Mouvement Brownien vient de naître. Prouve que l'espérance du mouvement brownien $\mathbb{E}[W_t]$ est toujours nulle. Ensuite, invoque la théorie pour déterminer sa variance exacte $\text{Var}(W_t)$ à l'instant cible $t$.

**🔵 Exercice B (Le Piège Quadratique)**
2. **Le Carré Mystique** : Soit la fonction stochastique $f(x) = x^2$. Selon Newton et la terminale, la différentielle donne $d(X^2) = 2X dX$. Mais ici, le processus $W_t$ possède une variation infiniment brisée. Applique le divin *Lemme d'Itô* pour trouver le deuxième terme caché (la secousse quadratique infinitésimale) contenu dans $d(W_t^2)$.

**🟠 Exercice C (L'Équation Différentielle Stochastique ou EDS)**
3. **Le Modèle de l'Intérêt Continu** : Vaslowici de la haute finance te propose l'Équation Différentielle Stochastique de Vasicek pour les taux d'intérêts : $dr_t = a(b - r_t)dt + \sigma dW_t$. 
   Identifie clairement : Quelle partie de l'équation ("Drift" vs "Diffusion") tire le taux vers le niveau moyen d'équilibre $b$ ? Et quelle partie sert de bruit aléatoire constant empêchant le taux d'être prédictible ?

---

## Exercices corrigés

**Exercice 1 :**
Par définition même du mouvement brownien, pour tout instant $t$, la position du mouvement $W_t = W_t - W_0$ suit formellement une loi Normale (Centrée) $\mathcal{N}(0, t)$.
Ainsi, l'espérance (la moyenne statistique des positions sur l'ensemble des infinis univers) reste fixée à la position de départ (0) : $\mathbb{E}[W_t] = 0$.
En revanche, l'incertitude (la Variance) grandit linéairement d'une manière absolue avec le temps : $\text{Var}(W_t) = t$. Si tu attends 10 ans, l'incertitude boursière est 10x plus ample !

**Exercice 2 :**
On sait par Itô que $df(W_t) = f'(W_t) dW_t + \frac{1}{2} f''(W_t) (dW_t)^2$.
Ici $f(x) = x^2 \Rightarrow f'(x) = 2x$ et $f''(x) = 2$.
En remplaçant : $d(W_t^2) = 2W_t dW_t + \frac{1}{2} \cdot 2 \cdot (dW_t)^2$.
Or, la magie fractale fondamentale du calcul d'Itô stipule que le carré d'un pas Brownian équivaut très exactement (en variance forte probabiliste) à un pur pas de Temps certain : $(dW_t)^2 = dt$.
Donc l'équation devient finalement : $d(W_t^2) = 2W_t dW_t + dt$. Ce fameux simple "+ dt" a changé le monde !

**Exercice 3 :**
Dans le modèle $dr_t = a(b - r_t)dt + \sigma dW_t$ :
- Le terme $a(b - r_t)dt$ est le **Drift (La Dérive pure).** C'est la force de traction certaine (sans aléatoire). Si le taux $r_t$ passe au-dessus de $b$, alors $(b - r_t)$ devient négatif, le Drift force le taux total vers le bas (Rappel de la moyenne !).
- Le terme $\sigma dW_t$ est la **Diffusion (La Volatilité).** C'est la turbulence aléatoire du marché boursier, pondérée par l'intensité de peur $\sigma$.

---

## Foire Aux Questions (FAQ)

<details>
  <summary>Pourquoi est-ce qu'on calcule avec $dW_t = \sqrt{dt}$ ?</summary>

  Si tu regardes la variance exacte trouvée $\text{Var}(W_t) = t$, rappelle-toi que l'écart type (l'erreur d'intervalle) est la racine carrée de la variance ($\sigma = \sqrt{t}$). Pour un infiniment petit accroissement temporel $dt$, bien que le mouvement (moyenne) soit de $0$, le choc probabiliste des particules (la variance / dispersion de l'incertitude du hasard pur) mesure une intensité de $\sqrt{dt}$ !
</details>

<details>
  <summary>Pourquoi est-ce impossible de le "dériver" comme au Lycée ?</summary>

  Dans la très douce et prévisible dérivation de Newton, le changement infinitésimal dy face au temps dt est une pente (Tangente approchée). Par exemple, une force de 5 km/s devient $ds \approx 5 dt$. La fonction s'écrase sur une droite pure et lisse. Dans le Brownien et la finance, du fait de ce $\sqrt{dt}$ magique et des sursauts en dents de scies de toutes échelles fractales... si tu "zoomes" un million de fois le graphe ($dt \to 0$), ce n'est PAS une ligne droite plate : c'est encôre et toujours le mêmè chemin aléatoire en dent de scie indérivable au point par point. L'Épée d'Itô fut requise.
</details>

---

## 📝 Mini-Quiz

<details>
  <summary>❓ QCM 1 : Paradoxe Graphique</summary>

  Si tu "zoomes" un milliard de fois sur le graphique du Mouvement Brownien SVG, que vas-tu voir ?
  <ul>
    <li>A) Une ligne droite (la tangente)</li>
    <li>B) Un pixel quantique</li>
    <li>C) Exactement la même courbe brisée qui tremble</li>
  </ul>
  <details>
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : C !</strong> C'est la beauté des fractales, l'invariant d'échelle géographique ou ici temporelle. C'est l'essence qui fait qu'il n'y a jamais de tangent rectiligne : ce n'est nulle part dérivable.
</details>
</details>


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.
