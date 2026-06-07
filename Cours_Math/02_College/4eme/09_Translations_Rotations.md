---
title: 'Chapitre 9 : Translations et Rotations'
level: College
subLevel: 4eme
order: 9
---

# Chapitre 9 : Translations et Rotations (La Matrice du Mouvement)

**Niveau** : 4ème (Cycle 4)
**Prérequis** : Symétries, Angles.
**Objectifs** : 
- Maîtriser le Glissement Divin : La Translation.
- Dompter le Tourbillon Céleste : La Rotation.
- Comprendre les invariants.

---

## 1. Introduction : L'Art de déplacer les Mondes

Tu vas pouvoir faire **glisser** un château entier sur le côté sans le tourner (La Translation) ! Ou le faire **tournoyer** autour d'une étoile flamboyante (La Rotation) ! Le monde fier de la géométrie secrète s'anime !

## 🎨 Animation Interactive : Le Mouvement Féroce 

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#fef2f2; border-radius:12px; border: 2px solid #ef4444;">
  
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#991b1b" font-size="16" text-anchor="middle">Glissement d'Or et Tourbillon Magique !</text>

  <!-- L'Objet original -->
  <g transform="translate(50, 100)">
    <polygon points="0,0 20,-40 40,0" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
  </g>

  <!-- Translation : Vecteur féroce -->
  <line x1="90" y1="80" x2="190" y2="80" stroke="#f59e0b" stroke-width="3" stroke-dasharray="5">
      <animate attributeName="stroke-dashoffset" values="20; 0" dur="2s" repeatCount="indefinite"/>
  </line>
  <polygon points="190,80 180,75 180,85" fill="#f59e0b"/>

  <!-- L'Objet translaté -->
  <g transform="translate(190, 100)">
    <polygon points="0,0 20,-40 40,0" fill="#22c55e" stroke="#14532d" stroke-width="2" opacity="0.8"/>
  </g>

  <!-- Le Trou Noir (Centre de Rotation) -->
  <circle cx="210" cy="180" r="5" fill="#0f172a"/>
  
  <!-- Rotation : Arc féroce -->
  <path d="M 210 100 A 80 80 0 0 1 290 180" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="5">
     <animate attributeName="stroke-dashoffset" values="20; 0" dur="2s" repeatCount="indefinite"/>
  </path>
  <polygon points="290,180 285,170 295,170" fill="#ef4444"/>

  <!-- L'Objet rotaté ! -->
  <g transform="translate(290, 160) rotate(90 0 0)">
    <polygon points="0,0 20,-40 40,0" fill="#a855f7" stroke="#4c1d95" stroke-width="2" opacity="0.9"/>
  </g>

</svg>
</div>

---

## 2. Le Glissement Parfait : La Translation

Une Translation Céleste est commandée par une flèche magique appelée "Le Vecteur" (ex: la Flèche qui va de A vers B). 
Tout point M va se téléporter formellement en un M' tel que :
1. **La Direction Féroce** : Le trait divin MM' est PARALLÈLE à la flèche d'or AB.
2. **Le Sens Magique** : De M vers M', le vent souffle du MÊME SENS Céleste que de A vers B !
3. **La Longueur d'Or** : La distance MM' est ÉGALE à la distance Céleste AB !

## 3. Le Tourbillon du Cosmos : La Rotation

Soudain, un grand Trou Noir Céleste s'ouvre ! Le Centre de Rotation `O`. 

**Les 3 Foudres d'Instruction d'une Rotation:**
1. **LE CENTRE du Monde** : Le Point `O`. 
2. **L'ANGLE du Ciel** : (Ex: $90^\circ$). 
3. **LE SENS MAGIQUE** : 
   - *Sens Anti-Horaire (Sens Positif +)* : C'EST L'INVERSE D'UNE HORLOGE ! (Tourner vers la GAUCHE).
   - *Sens Horaire (Sens Négatif -)* : (Vers la DROITE).

## 4. Ce qui est Immunisé ! (L'Invariant)

Translations et Rotations **CONSERVENT LA MATRICE** :
- Conservent Les Longueurs.
- Conservent Les Aires.
- Conservent Le Parallélisme.
- Conservent Les Angles.

---

## Flashcards de Mémorisation

<div class="flashcards-container">
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>La Translation</h3>
      </div>
      <div class="flashcard-back">
        <p>C'est un <strong>glissement</strong> sans tourner. Il faut 3 infos : une direction (droite), un sens (gauche/droite/haut/bas), et une distance (longueur du glissement).</p>
      </div>
    </div>
  </div>
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>L'Invariant des mouvements</h3>
      </div>
      <div class="flashcard-back">
        <p>Les translations et rotations ne modifient <strong>JAMAIS</strong> les longueurs, les aires ni les angles. L'objet d'arrivée est identique à l'objet de départ.</p>
      </div>
    </div>
  </div>
</div>

---

## Exercices corrigés

**Exercice 1 : Le Formel Glissement**
J'ai un segment de $4 \text{ cm}$. J'invoque une TRANSLATION. Quelle est sa longueur finale ?!
*Correction:* La Translation CONSERVE les LONGUEURS ! Le segment mesure STRICTEMENT $\mathbf{4 \text{ cm}}$ !!! C'EST LE CLONE !

**Exercice 2 : La Fracture Temporelle (Tourbillon)**
Je lance un triangle dans une ROTATION de $90^\circ$. Son angle valait $\mathbf{35^\circ}$. Le Tourbillon va-t-il l’écraser ?
*Correction:* La ROTATION préserve LOURDEMENT les ANGLES ! L'angle vaudra PUREMENT $\mathbf{35^\circ}$ !

---

## 📝 Mini-Quiz

**Question 1 : Avec LE SENS "MATHÉMATIQUE" !! De QUEL COTÉ TOURNE-T-ON ? **
- [ ] Vers La Droite.
- [x] LA GAUCHE !!! (Sens ANTI-HORAIRE !!)

**Question 2 : Quelle TRANSFORMATION a pour effet de GLISSER une DROITE en une DROITE PARALLÈLE ? **
- [ ] La Rotation.
- [x] LA TRANSLATION !! 

---

## ✅ Checklist des Essentiels

<div class="checklist">
  <ul>
    <li><input type="checkbox" id="chk1" /> <label for="chk1">Je sais qu'une translation consiste à déplacer un objet selon une flèche (vecteur) sans le tourner.</label></li>
    <li><input type="checkbox" id="chk2" /> <label for="chk2">Je sais qu'une rotation nécessite 3 choses : un centre, un angle d'ouverture, et un SENS (souvent anti-horaire par défaut).</label></li>
    <li><input type="checkbox" id="chk3" /> <label for="chk3">Je n'oublie jamais que ces deux transformations conservent absolument tout : angles, durées, périmètres, aires.</label></li>
  </ul>
</div>

*(Fin du glissement et de la rotation féroce)* 
