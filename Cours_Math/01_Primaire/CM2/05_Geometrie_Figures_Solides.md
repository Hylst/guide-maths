---
title: 'Chapitre 5 : Géométrie (Figures Planes et Solides)'
level: Primaire
subLevel: CM2
order: 5
---
# Chapitre 5 : Géométrie (Figures Planes et Solides)

**Niveau** : CM2 (Cycle 3)  
**Prérequis** : Triangle, carré, rectangle et initiation aux solides simples (CM1).  
**Objectifs** : 
- Reconnaître, décrire et construire des figures planes complexes (losange, parallélogramme) et les cercles.
- Comprendre les notions fondamentales du cercle : centre, rayon, diamètre, corde.
- Identifier, décrire et nommer les solides (prismes, pyramides, cylindres, cônes, sphères).
- Déplier un solide pour comprendre et construire son "patron".

---

## 📖 Introduction Pédagogique : Les Architectes en herbe

Si tu regardes autour de toi, le monde n'est fait que de figures géométriques. L'écran plat sur lequel tu lis ceci est un rectangle, la roue de ton vélo est un cercle parfait, et les magnifiques Pyramides d'Égypte sont... des pyramides ! 

Au CM2, nous allons passer de la simple observation à la construction précise. Tu vas apprendre le vocabulaire exact (on ne dit plus "la ligne du milieu", on dit "le diamètre") et tu vas découvrir la magie du passage de la "2D" (les dessins à plat sur ta feuille) à la "3D" (les formes que tu peux attraper avec tes mains). Sors ton compas et ton équerre, bâtisseur !

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : L'Anatomie du Cercle

Touche pas au compas sans connaître ces trois mots-clés !

<div align="center">
<svg width="450" height="350" viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="410" height="40" fill="#f8fafc" rx="8" />
  <text x="225" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">Les secrets du Cercle</text>

  <!-- Le Cercle central -->
  <circle cx="225" cy="200" r="100" stroke="#334155" stroke-width="3" fill="#eef2ff" />
  
  <!-- Le Centre (Point rouge) -->
  <circle cx="225" cy="200" r="4" fill="#ef4444" />
  <text x="225" y="185" font-family="Inter" font-weight="bold" fill="#ef4444" font-size="14" text-anchor="middle">Centre</text>

  <!-- Le Rayon (Ligne bleue animée pulse) -->
  <g>
    <animate attributeName="opacity" values="0.5; 1; 0.5" dur="3s" repeatCount="indefinite" />
    <line x1="225" y1="200" x2="325" y2="200" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
    <text x="275" y="190" font-family="Inter" font-weight="bold" fill="#2563eb" font-size="14" text-anchor="middle">Rayon</text>
  </g>

  <!-- Le Diamètre (Ligne verte) -->
  <line x1="155" y1="129" x2="295" y2="271" stroke="#10b981" stroke-width="4" stroke-dasharray="6,4"/>
  <text x="180" y="150" font-family="Inter" font-weight="bold" fill="#059669" font-size="14" text-anchor="middle" transform="rotate(45, 180, 150)">Diamètre</text>

  <!-- Une Corde (Ligne violette) -->
  <line x1="140" y1="250" x2="225" y2="300" stroke="#8b5cf6" stroke-width="3" />
  <text x="160" y="290" font-family="Inter" font-weight="bold" fill="#7c3aed" font-size="14" text-anchor="middle" transform="rotate(30, 160, 290)">Corde</text>

  <!-- Bulle info -->
  <text x="225" y="335" font-family="Inter" font-weight="600" fill="#64748b" font-size="12" text-anchor="middle">Le Diamètre est strictement égal à 2 fois le Rayon !</text>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. Le Cercle : Précision au compas
Le cercle possède un vocabulaire très précis qu'il faut absolument maîtriser :
- **Le Centre** : Le point où tu piques la pointe sèche de ton compas. Tous les bords du cercle sont exactement à la même distance de ce point !
- **Le Rayon** : C'est la distance (le trait invisible) entre le **Centre** et n'importe quel point sur le bord du cercle. C'est l'écartement de ton compas !
- **Le Diamètre** : Un segment (ligne droite) qui traverse tout le cercle en passant *obligatoirement* par le **Centre**. Formule d'or : $\text{Diamètre} = \text{Rayon} \times 2$.
- **La Corde** : Une ligne droite qui relie deux points d'un cercle *sans passer* par le centre. 
- L'astuce cachée : le diamètre est techniquement la **plus grande corde possible** du cercle !

### 2. Le Quadrilatère mystère : Le Losange
Un carré qu'on aurait bousculé par les coins !
- Il possède **4 côtés de même longueur** (comme le grand Carré son cousin fort).
- Mais **aucun angle droit** (il a été aplati sous la pression).
- Sa grande force cachée réside dans ses **Diagonales** ! Elles se croisent bien calmement à angles droits puissants strict (perpendiculaires) et au croisement de leur magnifique centre formel ! (en se scindant d'égalité).

### 3. Les Solides : le monde en 3D
Les figures plates montent au ciel et créent du relief d'objet palpable, ils mutent :
- **Les Polyèdres** (Toutes les "faces" sont toutes plates !) : Poly veut dire "plusieurs" et èdres "faces". Les arêtes sont très droites et contondantes sur les poings !
  - Le *Cube* et le *Pavé droit* (la boîte à chaussures).
  - La *Pyramide* (base carrée ou triangle, et face en pointes).
  - Le *Prisme* droit (comme une célèbre tente de camping triangulaire).
- **Les Non-Polyèdres** (Ça roule !) : Formés par des immenses rondeurs.
  - Le *Cylindre* (le rouleau de papier).
  - Le *Cône* (le chapeau pointu du sorcier).
  - La *Sphère* (la balle lisse absolue et intégrale !).

### 4. Le concept fou du "Patron" !
Un Patron ce n'est pas un chef lourd ! En forme de vue pure géométrique c'est un grand "plan plat" magique pour pouvoir construire le volume. 
Si on vient découper proprement la fragile enveloppe avec des ciseaux droits la jolie base pure et pleine d'action d'un solide massif à face plates (comme une boîte pleine) et que nous l'écrasons à plaquer au sol très net -> "La vue de dessin découpée sur la face table donne strictement et lourdement le point : de son PATRON pur qui permet par des replis le bon re-levage de création plein !"

---

## 📌 Rappels

- Ne confonds jamais le « sommet » (la pointe piquante, le coin), « l'arête » (la ligne tranchante où les deux faces de jointure plient) et la « face » (le mur tout plat à l'appui complet sur l'air d'une planchette fine).

---

## 💡 Le Saviez-vous ?

On est très fier de notre Terre mais elle n'est aboslument pas une pure "Sphère" parfaite géométrique formelle ! Tournant bien vite et féroce sur sa large d'elle même sa rotation la "bouscule lourdement sa base fine centrale" de l'axe ! Résultat, en pôle le choc à pression : Elle s'écrase sur ses bornes très fines (pôles très durs étroits) et grossit à son large d'équateur bien au soleil lourd ! Cette formidable mal-géométrie imparfaite l'attribue au nom lourd très mystérieux spatial "d'ellipsoïde de révolution boudinée".

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-amber-500 font-bold mb-2">Piège du cercle</span>
        <span className="font-medium text-lg text-slate-700">Le dessin donne un magnifique Diamètre droit valant : $10\ \text{cm}$. L'énigme te demande quel serait le rude "Rayon" précis du cercle.</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">5 cm !</span>
        <span className="text-sm mt-2">Le rayon part du centre et va au bord. Le diamètre traverse tout en passant par le centre. Le rayon c'est donc toujours la moitié du diamètre !</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">Lutte Plane ou Volume ?</span>
        <span className="font-medium text-lg text-slate-700">Le "Cercle" est une figure plane ! Quel est le nom du solide géométrique en "3D" qui correspond ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">La Sphère !</span>
        <span className="text-sm mt-2">Le cercle gonflé qui devient un volume entier est une Sphère ! (comme un ballon).</span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Opération Identification 3D !
Tu reçois ce portrait robot : *"J'adore rouler sur mon bord, mais j'ai une base toute plate (un cercle) pour me tenir debout, et en haut je me termine par une pointe pour piquer les nuages ! Qui suis-je ?"*

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Rien ne peut esquiver ton instinct ! 
1. Mot décisif 1 : "Je roule". J'exclu direct tous les polyèdres ! (Cube, pyramide...).
2. "Base ronde plate" et "Pointe en haut".
3. La grande conclusion : C'est le **Cône** ! (Comme un chapeau pointu d'anniversaire).
</details>

### Exercice 2 : Faille d'instruction au grand LOSANGE 
Le vilain roi t'ordonne : *"Dessinez-moi un Losange en faisant bien attention à ce que tous ses angles soient bien droits !"*. Vas-tu obéir ?

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Interception et désastre tactique ! 
Un losange DOIT avoir 4 côtés égaux, mais IL N'A PAS D'ANGLES DROITS !
Si tu traces un losange avec des angles droits, ce n'est plus un losange, ça devient instantanément... un **CARRÉ** ! Refuse son piège !
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Ma feuille roulée en "Cylindre" a l'air creuse. Est-ce bien un solide ?**
**R** : Un solide fermé est un "vrai" solide géométrique en maths ! Un cylindre parfait (comme un petit rondin de bois) est "plein". Ton rouleau de papier toilette est un contenant ouvert, mais on l'assimile à la famille géométrique du cylindre.

**Q2 : Les perpendiculaires qui se croisent en leur milieu, c'est que pour le Losange ?**
**R** : C'est la signature du losange (ses diagonales) ! MAIS, le Carré est le "roi", il a TOUT (il est à la fois losange et rectangle). Donc oui, le Carré de base (qui est un super losange) possède aussi des diagonales qui se croisent à angles droits en leur centre !

---

## 📝 Mini-Quiz

**Question 1 : Ton dé de jeu (qui possède 6 faces plates carrées) appartient à quelle grande famille ?**
- [x] Aux polyèdres ! (que du plat).
- [ ] Il n'a pas de famille.

> **Explication :** Bingo ! Un Cube parfait est classé dans la famille des polyèdres car il n'a que des faces lisses et plates (pas de rondeur).

**Question 2 : Je coupe mon cercle par un grand trait droit, de part en part. Ce trait passe PILE au centre. Je viens de tracer :**
- [ ] Un Rayon
- [x] Le Diamètre, qui est aussi la plus grande Corde possible !

> **Explication :** Exact ! Si le trait relie deux bords, c'est une Corde. Si cette Corde passe par le Centre absolu, elle devient le grand "Diamètre" roi (le double du rayon).

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'écartement de la pointe de mon compas jusqu'à la mine représente TOUJOURS "Le Rayon" (et exactement la moitié du diamètre).
- [ ] J'ai compris la différence entre Dessin 2D (figure plane) et Volume 3D (Solide).
- [ ] Je sais que le sommet c'est la pointe, la face c'est le "mur" plat, et l'arête c'est le pli coupant du solide !
