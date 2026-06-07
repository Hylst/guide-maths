---
title: 'Chapitre 8 : Topologie et Espaces Normés'
level: Post_Bac
subLevel: Universite_L2_L3
order: 8
---
# Chapitre 8 : Topologie et Espaces Normés

**Niveau** : L2 / L3 (Licence - Post-Bac)  
**Prérequis** : Espaces vectoriels, suites numériques, logique.  
**Objectifs** : 
- Comprendre la notion de distance et de norme dans un espace.
- Définir les voisinages, ouverts, fermés et l'adhérence.
- Généraliser les concepts de limite et de continuité.
- Appréhender le concept fondamental de compacité.

---

## 🎨 Animation Interactive : Les Boules Unités
En topologie, la forme de ce qu'on appelle "une sphère" ou un "cercle" (tous les points situés à une distance de 1 du centre) dépend totalement de la manière dont on mesure la distance (la Norme $L_p$) ! 
- Norme 1 (Distance de Manhattan) : Un losange.
- Norme 2 (Distance Euclidienne) : Un cercle classique.
- Norme Infinie (Distance Max) : Un carré.

<div align="center">
<svg width="400" height="250" viewBox="-120 -120 240 240" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e24; border-radius:12px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
  <!-- Axes -->
  <line x1="-100" y1="0" x2="100" y2="0" stroke="#555" stroke-width="1" />
  <line x1="0" y1="-100" x2="0" y2="100" stroke="#555" stroke-width="1" />
  
  <!-- Norme 1 (Losange) |x| + |y| = 1 -->
  <polygon points="0,-80 80,0 0,80 -80,0" fill="none" stroke="#f05454" stroke-width="3">
    <animate attributeName="opacity" values="1; 0; 0; 1" keyTimes="0; 0.33; 0.66; 1" dur="6s" repeatCount="indefinite" />
  </polygon>
  <text x="-90" y="-90" fill="#f05454" font-family="sans-serif" font-weight="bold">
    <animate attributeName="opacity" values="1; 0; 0; 1" keyTimes="0; 0.33; 0.66; 1" dur="6s" repeatCount="indefinite" />
    Norme 1
  </text>

  <!-- Norme 2 (Cercle) x^2 + y^2 = 1 -->
  <circle cx="0" cy="0" r="80" fill="none" stroke="#00b4d8" stroke-width="3" opacity="0">
    <animate attributeName="opacity" values="0; 1; 0; 0" keyTimes="0; 0.33; 0.66; 1" dur="6s" repeatCount="indefinite" />
  </circle>
  <text x="-90" y="-90" fill="#00b4d8" font-family="sans-serif" font-weight="bold" opacity="0">
    <animate attributeName="opacity" values="0; 1; 0; 0" keyTimes="0; 0.33; 0.66; 1" dur="6s" repeatCount="indefinite" />
    Norme 2 (Euclidienne)
  </text>

  <!-- Norme Inf (Carré) max(|x|, |y|) = 1 -->
  <rect x="-80" y="-80" width="160" height="160" fill="none" stroke="#10b981" stroke-width="3" opacity="0">
    <animate attributeName="opacity" values="0; 0; 1; 0" keyTimes="0; 0.33; 0.66; 1" dur="6s" repeatCount="indefinite" />
  </rect>
  <text x="-90" y="-90" fill="#10b981" font-family="sans-serif" font-weight="bold" opacity="0">
    <animate attributeName="opacity" values="0; 0; 1; 0" keyTimes="0; 0.33; 0.66; 1" dur="6s" repeatCount="indefinite" />
    Norme Infinie
  </text>
  
  <text x="85" y="15" fill="#aaa" font-size="12">1</text>
  <text x="5" y="-85" fill="#aaa" font-size="12">1</text>
</svg>

  <em>Toutes ces formes représentent "la Boule de centre 0 et de rayon 1" selon la dimension de travail !</em>
</div>

---

## Explications et Théorie

### 1. Espaces Vectoriels Normés (EVN)
Dans $\mathbb{R}^n$ ou tout espace vectoriel $E$, on définit une **norme** $||x||$ comme une application mesurant la "longueur" d'un vecteur, respectant trois axiomes :
1. Séparation : $||x|| = 0 \iff x = 0$
2. Homogénéité absolue : $|| \lambda x || = |\lambda| \cdot ||x||$
3. Inégalité triangulaire : $||x + y|| \leq ||x|| + ||y||$
Une norme induit une **distance** : $d(x, y) = ||x - y||$.

### 2. Ouverts, Fermés et Voisinages
- **Boule ouverte** transcendante $B(a, r)$ : L'ensemble des points $x$ tels que $d(a, x) < r$.
- **Voisinage** : Une partie $V$ est un voisinage de $a$ si elle contient une boule ouverte centrée en $a$.
- **Ouvert** : Une partie est ouverte si elle est voisinage de **chacun** de ses points (elle n'a pas de "bord dur"). Ex : $]0, 1[$.
- **Fermé** : Le complémentaire d'un ouvert. Il inclut ses frontières. Ex : $[0, 1]$.

### 3. Limites et Continuité
L'élégance absolue de la topologie est de redéfinir la continuité sans aucune formule, juste avec des ensembles ! 
**Théorème** : Une fonction $f : E \to F$ est continue si et seulement si, pour tout ouvert $O$ de $F$, son image réciproque $f^{-1}(O)$ est un ouvert de $E$.

### 4. La Compacité
Dans $\mathbb{R}^n$, le théorème de *Heine-Borel* stipule qu'une partie est **compacte** si et seulement si elle est **fermée et bornée**.
La compacité est le "Saint Graal" en mathématiques post-bac : 
*Toute fonction continue sur un compact est bornée et atteint ses bornes (elle admet un minimum et un maximum global garanti).*

---

## 💡 Le savais-tu ?

La topologie est souvent appelée la **"géométrie du caoutchouc"**. Pour une personne non initiée, une *tasse à café* et un *Donut (beignet)* sont deux objets fondamentalement distincts pour des questions de largeur, de volume ou de bords géométriques. Mais pour un Topologue L3, c'est **exactement la même entité** ! 
Pourquoi ? Parce qu'ils possèdent tous les deux exactement 1 "trou" qui traverse l'objet de part en part. Dans ton esprit, si ces objets étaient en pâte à modeler pure (sans droit de la casser ou la percer de nouveau), tu pourrais déformer en continu la tasse jusqu'à recréer la forme d'un beignet. C'est l'essence de la transformation abstraite que l'on nomme un **Homéomorphisme**. La topologie étudie ce qui "survit" aux déformations élastiques de l'espace !

---

## Exercices

**🟢 Exercice A (Le Concept Frontalier)**
1. **Nature de l'Intervalle** : Dans notre bon vieux $\mathbb{R}$ standard, analyse l'ensemble $A = [0, 1[$.  Est-il parfaitement "Ouvert", fermement "Fermé", purement ni l'un ni l'autre, ou carrément les deux (un Clopen) ? Justifie par la théorie des bords.

**🔵 Exercice B (Outils de Démonstration Topologique)**
2. **La Bulle Ouverte** : Démontre rigoureusement, via la méthode des epsilon et de la norme euclidienne, que n'importe quelle Boule Ouverte $B(a, r)$ mérite légalement le statut d'ensemble "Ouvert" selon la topologie ! (Astuce : tu vas invoquer l'antique inégalité matricielle de base).

**🟠 Exercice C (Le Mystère de l'Adhérence Absolue)**
3. **Le Spectre de la Limite** : Confronte l'ensemble fractal $A = \{ \frac{1}{n} \mid n \in \mathbb{N}^* \}$. Fais appel à ta capacité d'abstraction mathématique pour trouver l'adhérence de cet ensemble (notée $\bar{A}$ ou $cl(A)$). Question finale : $A$ est-il un fermé topologique valide ?

---

## Exercices corrigés

**Exercice 1 :**
L'intervalle $A = [0, 1[$ n'est **ni ouvert, ni fermé**. 
- Il n'est pas ouvert car il contient 0, et aucune boule ouverte centrée en 0 (ex: $]-\epsilon, \epsilon[$) n'est incluse dans $A$ (la gauche fuyant dans les négatifs).
- Il n'est pas fermé car son complémentaire $\mathbb{R} \setminus A = ]-\infty, 0[ \cup [1, +\infty[$ n'est pas ouvert (il contient 1 sur un bord fermé).

**Exercice 2 :**
Soit un point inconnu $x \in B(a, r)$. Par définition brute de la boule : $d(a, x) < r$. Appelons la marge restante de la bulle : $\epsilon = r - d(a, x) > 0$.
Soit maintenant un petit $y \in B(x, \epsilon)$. Par l'Inégalité Triangulaire (L'Axiome 3 divin de la Norme) : 
$d(a, y) \le d(a, x) + d(x, y) < d(a, x) + \epsilon = d(a, x) + r - d(a, x) = r$.
Ainsi, $y \in B(a, r)$, ce qui affirme victorieusement que la sous-boule $B(x, \epsilon) \subset B(a, r)$ de façon intégrale ! L'ensemble est bien formellement "Ouvert" à chaque point !

**Exercice 3 :**
L'adhérence d'un corps abstrait est l'union sacrée de son ensemble et de la totalité des points de la frontière de "limite".
La suite génératrice $(1/n)$ converge infiniment vers la valeur $0$. Le chiffre $0$ est donc une valeur d'adhérence logique pure (bien qu'exclue de $A$). L'adhérence absolue est $\bar{A} = A \cup \{0\}$.
Comme $\bar{A} \neq A$, l'ensemble $A$ n'est **pas fermé** !

---

## Foire Aux Questions (FAQ)

<details>
  <summary>Qu'est ce que la compacité a de si incroyable pour les mathématiciens en Licence 3 ?</summary>

  La compacité, c'est l'outil qui redonne des pouvoirs magiques aux théorèmes. Tu te souviens du théorème ultra-connu au lycée "Toute fonction continue sur [a,b] admet un minimum et un maximum garanti"? Eh bien en dimension infinie ou en topologie sauvage, si un ensemble n'est pas "Compact" (fermé et borné de force), c'est TERMINÉ. La courbe pourrait fuir vers l'infini sans avertir. Le Compact sécurise l'étude formelle de nos théorèmes sur l'espace.
</details>

<details>
  <summary>Pourquoi appelle-t-on cela "Voisinage" sur Terre ?</summary>

  C’est une analogie de l'air de "sécurité". Une zone est déclarée comme "voisinage" du centre (A) si elle inclut formellement un matelas de sécurité tout autour du point A, aussi petit soit-il. L'étudiant ne peut pas y "pousser" A d'un coup de doigt hors de la zone par erreur. Il y a toujours un petit "Cercle tampon de marge" inclus avec la bulle V.
</details>

---

## 📝 Mini-Quiz

<details>
  <summary>❓ QCM 1 : Paradoxe Topologique</summary>

  Pense à $\mathbb{R}$ tout entier, en tant que sous-ensemble de lui-même. Est-il :
  <ul>
    <li>A) Ouvert seulement</li>
    <li>B) Fermé seulement</li>
    <li>C) À la fois ouvert et fermé (Clopen)</li>
  </ul>
  <details>
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : C !</strong> Dans n'importe quel espace topologique, l'ensemble vide ($\emptyset$) et l'espace entier sont TOUJOURS à la fois et ouverts et fermés. On les appelle des "clopens" en anglais !
</details>
</details>

<details>
  <summary>❓ QCM 2 : Normes Équivalentes</summary>

  En dimension finie (comme $\mathbb{R}^3$), changer de norme modifie-t-il quels ensembles sont ouverts ?
  <ul>
    <li>A) Oui, un cercle n'est plus un cercle.</li>
    <li>B) Non, toutes les normes sont équivalentes.</li>
  </ul>
  <details>
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> C'est un théorème majeur : en dimension finie, toutes les normes définissent exactement la même topologie (les mêmes ouverts, mêmes limites).
</details>
</details>


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.
