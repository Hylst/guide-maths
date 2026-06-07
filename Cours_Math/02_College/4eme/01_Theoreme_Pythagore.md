---
title: 'Chapitre 1 : Le Théorème de Pythagore'
level: College
subLevel: 4eme
order: 1
---
# Chapitre 1 : Le Théorème de Pythagore

**Niveau** : 4ème (Cycle 4)  
**Prérequis** : Carré d'un nombre ($x^2$), racine carrée ($\sqrt{}$), triangle rectangle.  
**Objectifs** : 
- Identifier l'hypoténuse dans un triangle rectangle.
- Utiliser le théorème de Pythagore pour calculer une longueur.
- Rédiger correctement une démonstration.

---

## Schéma Pédagogique Interactif

<div style="display: flex; justify-content: center; margin: 20px 0;">
  <svg viewBox="0 0 400 300" width="100%" max-width="500px" style="background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <!-- Triangle -->
    <polygon points="100,200 300,200 100,100" fill="#e0e7ff" stroke="#4f46e5" stroke-width="3" />
    
    <!-- Angle droit -->
    <polyline points="100,180 120,180 120,200" fill="none" stroke="#ef4444" stroke-width="3" />
    <text x="90" y="215" font-family="monospace" font-weight="bold" fill="#334155">A</text>
    <text x="310" y="215" font-family="monospace" font-weight="bold" fill="#334155">B</text>
    <text x="90" y="90" font-family="monospace" font-weight="bold" fill="#334155">C</text>

    <!-- Hypoténuse -->
    <path id="hypPath" d="M100,100 L300,200" fill="none" />
    <text font-family="monospace" font-weight="bold" fill="#ec4899" font-size="14">
      <textPath href="#hypPath" startOffset="30%" side="left" dy="-10">Hypoténuse (c)</textPath>
    </text>

    <!-- Côtés adjacents -->
    <text x="200" y="220" font-family="monospace" font-weight="bold" fill="#10b981" text-anchor="middle">Côté b</text>
    <text x="60" y="150" font-family="monospace" font-weight="bold" fill="#f59e0b" transform="rotate(-90 80,150)" text-anchor="middle">Côté a</text>

    <!-- Formule -->
    <rect x="120" y="20" width="160" height="40" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
    <text x="200" y="45" font-family="monospace" font-weight="bold" fill="#1e293b" font-size="16" text-anchor="middle">a² + b² = c²</text>
  </svg>
</div>

---

## Activités de découverte

**Activité : La corde à 13 nœuds**

Il y a 4000 ans, les Égyptiens utilisaient une corde avec 13 nœuds (formant 12 intervalles égaux) pour tracer des angles droits.
En formant un triangle avec des côtés de **3**, **4** et **5** intervalles, ils obtenaient un triangle rectangle parfait !
Pythagore a découvert que cela fonctionnait car $3^2 + 4^2 = 5^2$ ($9 + 16 = 25$).

---

## Rappels

Avant de commencer, révise :
- **Le carré d'un nombre** : $5^2 = 5 \times 5 = 25$.
- **La racine carrée** : $\sqrt{49} = 7$ car $7^2 = 49$.
- **Le triangle rectangle** : Il possède un angle droit (90°).
- **L'hypoténuse** : C'est le côté le plus long, situé en face de l'angle droit.

---

## Explications et Théorie

### 1. L'énoncé du théorème
Dans un triangle rectangle, le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.

### 2. La formule
Si le triangle $ABC$ est rectangle en $A$, alors l'hypoténuse est $[BC]$.
L'égalité de Pythagore est :
$$BC^2 = AB^2 + AC^2$$

### Méthodes pas-à-pas

**Comment calculer l'hypoténuse ?**
1. Préciser que le triangle est rectangle.
2. Écrire l'égalité de Pythagore avec les lettres.
3. Remplacer les lettres par les valeurs connues.
4. Calculer les carrés et les additionner.
5. Utiliser la touche $\sqrt{}$ de la calculatrice pour trouver la longueur finale.
   - *Exemple : $AB=3, AC=4 \Rightarrow BC^2 = 3^2 + 4^2 = 9 + 16 = 25 \Rightarrow BC = \sqrt{25} = 5$.*

**Comment calculer un côté de l'angle droit ?**
1. Écrire l'égalité de Pythagore.
2. Remplacer les valeurs (l'hypoténuse est déjà connue !).
3. Faire une **soustraction** pour trouver le carré manquant.
4. Utiliser la touche $\sqrt{}$.
   - *Exemple : $BC=10, AB=6 \Rightarrow 10^2 = 6^2 + AC^2 \Rightarrow 100 = 36 + AC^2 \Rightarrow AC^2 = 100 - 36 = 64 \Rightarrow AC = \sqrt{64} = 8$.*

---

## 💡 Le savais-tu ?

Bien que ce théorème royal porte son illustre nom, **Pythagore de Samos** n'est probablement pas celui qui l'a découvert ! On a retrouvé d'anciennes tablettes d'argile en Mésopotamie (actuel Irak) datant de près de 1000 ans avant Pythagore qui utilisaient déjà ces relations numériques étonnantes (les triplets pythagoriciens). Le mérite de Pythagore fut surtout d'avoir fondé une confrérie mathématique qui a mis un point d'honneur à en chercher la première démonstration théorique universelle.

---

## Flashcards de Mémorisation

<div class="flashcards-container">
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>Conditions pour Pythagore</h3>
      </div>
      <div class="flashcard-back">
        <p>Il faut IMPÉRATIVEMENT avoir un <strong>triangle rectangle</strong> !</p>
      </div>
    </div>
  </div>
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>L'hypoténuse est...</h3>
      </div>
      <div class="flashcard-back">
        <p>Le côté <strong>le plus long</strong>, situé toujours <strong>en face de l'angle droit</strong>.</p>
      </div>
    </div>
  </div>
</div>

---

## Exercices

**🟢 Exercice 1 (Application directe)**
1. Dans le triangle $DEF$ rectangle en $D$, qui a l'honneur d'être l'hypoténuse ? Écris l'égalité de Pythagore correspondante avec les majuscules.
2. Calcule finement $BC$ dans le triangle $ABC$ (rectangle en $A$) en sachant que ses petits côtés mesurent $AB = 5\text{ cm}$ et $AC = 12\text{ cm}$.

**🔵 Exercice 2 (Entraînement tactique)**
3. **Le Côté manquant** : Calcule le côté $ST$ dans le triangle $RST$ rectangle en $S$, si tu sais que la fantastique hypoténuse est $RT = 10\text{ cm}$ et que $RS = 8\text{ cm}$. *(Indice : Gérer la fameuse soustraction)*
4. **L'Achat du Téléviseur** : Un magnifique écran flambant neuf annonce fièrement ses dimensions : 80 cm de largeur pour 60 cm de hauteur. Mais la publicité parle d'une taille de diagonale. Quelle est exactement cette longueur de diagonale ?

**🟠 Exercice 3 (Problèmes du monde réel)**
5. **Le Peintre Étourdi** : Une grande échelle de 4 mètres de long est appuyée contre la façade d'un mur bien droit. Son pied recule et repose à environ 1,5 mètre du pied du mur. À quelle hauteur culmine le bout de l'échelle contre le mur ? *(Arrondis habilement ton résultat au centimètre près)*.
6. **Le Terrain de Football Bizarre** : Un ailier de foot échappe à la vigilance du gardien et traverse le terrain tout droit en diagonale d'un poteau de corner à l'autre bout opposé pour fêter ça ! Le terrain fait exactement 100 m de long pour 64 m de large. Quelle est cette distance courue ? *(Arrondis au dixième)*.

---

## Synthèse

- Le théorème de Pythagore sert à calculer une **longueur** dans un **triangle rectangle**.
- **Hypoténuse au carré = Côté1 au carré + Côté2 au carré**.
- Toujours vérifier que l'hypoténuse est bien le côté le plus long à la fin du calcul !

---

## 📝 Mini-Quiz

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Le théorème de Pythagore s'applique joyeusement à n'importe quel triangle croisé dans la rue.</strong></summary>
  <ul>
    <li>A) Vrai, ce vieux Grec était généreux !</li>
    <li>B) Faux ! Absolument faux.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Formellement interdit sur un triangle standard. Ce théorème MAGIQUE ne déverrouille ses portes que pour la royauté absolue des triangles : le noble **Triangle Rectangle** (il exige la présence d'un pur angle à 90° !).
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Le côté majestueux que l'on nomme l'Hypoténuse boude l'angle droit et se trouve toujours exilé pile en face de lui !</strong></summary>
  <ul>
    <li>A) Totalement Vrai</li>
    <li>B) Faux</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : A !</strong> Oh que oui ! L'Hypoténuse est farouche : elle ne touche JAMAIS l'angle droit. Et comme c'est aussi le boss du triangle, c'est obligatoirement le côté le plus long !
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 3 : On effectue son théorème et on trouve que $AB^2 = 49$. Un camarade dit "Victoire, ça veut dire que la longueur originelle AB = 7". A-t-il raison ?</strong></summary>
  <ul>
    <li>A) Bah Vrai !</li>
    <li>B) Faux, c'est 24,5 !</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : A (Vrai).</strong> L'arme secrète contre "Le Carré" s'appelle "La Racine Carrée !". Et $\sqrt{49} = 7$ car le double mystère de sept $7 \times 7 = 49$.
  </details>
</details>

---

## Pour aller plus loin

**La réciproque de Pythagore**
Plus tard, tu apprendras la "réciproque". Elle sert à faire l'inverse : si tu connais les 3 côtés d'un triangle et que l'égalité $a^2 + b^2 = c^2$ est vraie, alors tu peux prouver que le triangle est rectangle ! C'est l'outil parfait pour vérifier si un mur est bien droit.

---

## Foire Aux Questions (FAQ)

<details style="background: #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em;">Pourquoi l'écran de ma jolie calculatrice est pollué d'un défilé affreux de nombres hachés avec plein de virgules si je tape une bête racine carrée ?</strong></summary>
  <p style="margin-top: 10px;">La grande majorité des racines carrées du monde réel ne tombent pas "juste", elles sont ce qu'on appelle "irrationnelles". L'infinité de ces décimales ne s'arrête jamais. Tu seras invité formellement à donner à ton professeur une excellente "valeur arrondie" (le plus souvent au dixième ou au centième selon l'énoncé du problème) avec le fameux signe de vaguellettes $≈$ à la place du égal $=$ stricte.</p>
</details>

<details style="background: #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em;">Le blocage intégral : comment ne pas se vautrer sur un exercice en confondant lamentablement Addition ou Soustraction dans l'égalité de Pythagore ?</strong></summary>
  <p style="margin-top: 10px;">Le secret qui sauve tous les élèves du naufrage ? <b>Demande-toi QUI tu cherches.</b><br>- Si tu enquêtes pour chercher le gros boss, l'hypothénuse, le chef suprême... il faut faire exploser le nombre ! Tu <b>additionnes</b> l'aire des deux misérables valets pour créer son empire.<br>- Mais si on te donne déjà le grand boss dans l'énoncé, et que tu dois trouver un malheureux petit côté. C'est l'inverse : Tu prends l'énorme carré du boss, et tu luis <b>soustrais</b> le carré du petit vassal connu pour arracher le chiffre du dernier pion !</p>
</details>

---

## ✅ Checklist des Essentiels

<div class="checklist">
  <ul>
    <li><input type="checkbox" id="chk1" /> <label for="chk1">Je sais repérer rapidement l'hypoténuse (le plus long, face à l'angle droit).</label></li>
    <li><input type="checkbox" id="chk2" /> <label for="chk2">Je connais la formule des carrés ($a^2 + b^2 = c^2$) sur le bout des doigts.</label></li>
    <li><input type="checkbox" id="chk3" /> <label for="chk3">Je pense à vérifier si c'est une addition (chercher l'hypoténuse) ou une soustraction (chercher un côté de l'angle droit).</label></li>
    <li><input type="checkbox" id="chk4" /> <label for="chk4">Je n'oublie jamais de faire la racine carrée ( $\sqrt{}$ ) à la fin du calcul !</label></li>
  </ul>
</div>

*(Fin de ce noble Chapitre Pythéagoricien)*
