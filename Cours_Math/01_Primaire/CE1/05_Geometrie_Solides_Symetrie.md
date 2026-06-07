---
title: 'Chapitre 5 : Géométrie - Solides et Symétrie'
level: Primaire
subLevel: CE1
order: 5
---

# Chapitre 5 : Géométrie - Dans le monde des Solides et de la Symétrie

**Niveau** : CE1 (Cycle 2)  
**Prérequis** : Connaître les figures planes (carré, rectangle, triangle, cercle) vues au CP.  
**Objectifs** : 
- Passer de la 2D (figures plates) à la 3D (les solides).
- Reconnaître, nommer et décrire un cube, un pavé droit, un cylindre et une sphère.
- Comprendre le vocabulaire : face, arête, sommet.
- Découvrir la symétrie axiale (l'effet miroir).

---

## 📖 Introduction Pédagogique : L'usine à boîtes

Au CP, nous avons dessiné des carrés et des rectangles sur des feuilles de papier. Ces figures étaient toutes plates, comme des crêpes ! On dit qu'elles sont en **2 dimensions (2D)**.

Mais regarde autour de toi : ta chambre, tes jouets, ton lit... Rien n'est tout plat ! Les objets prennent de la place, ils ont une épaisseur, de la hauteur. On dit qu'ils sont en **3 dimensions (3D)**.

Imagine que tu travailles dans une usine qui fabrique des boîtes en carton. Pour fabriquer une boîte à chaussures (qui est en 3D), tu dois d'abord découper des rectangles tout plats (en 2D) dans du carton, puis les plier et les coller ensemble sur les bords. En géométrie, un objet construit en 3D s'appelle un **Solide** !

---

## 🎨 Schéma Pédagogique Interactif : De la crêpe au Cube !

Regarde la magie d'un patron plat en carton (2D) qui se replie sur lui-même pour créer une belle boîte fermée (3D).

<div align="center">
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="background:#f0fdf4; border-radius:12px; border: 2px solid #86efac;">
  <!-- Titre -->
  <text x="200" y="30" font-family="sans-serif" font-weight="bold" fill="#166534" font-size="16" text-anchor="middle">Le Patron qui devient un Cube</text>
  
  <!-- Etape 1 : Le Patron (0-3s) -->
  <g opacity="0">
    <animate attributeName="opacity" values="1; 1; 0; 0; 0" keyTimes="0; 0.25; 0.3; 0.9; 1" dur="12s" repeatCount="indefinite" />
    <g transform="translate(100, 80)">
      <rect x="50" y="100" width="50" height="50" fill="#bbf7d0" stroke="#166534" stroke-width="2"/>
      <rect x="50" y="50" width="50" height="50" fill="#4ade80" stroke="#166534" stroke-width="2"/>
      <rect x="50" y="0" width="50" height="50" fill="#bbf7d0" stroke="#166534" stroke-width="2"/>
      <rect x="50" y="-50" width="50" height="50" fill="#86efac" stroke="#166534" stroke-width="2"/>
      <rect x="0" y="50" width="50" height="50" fill="#bbf7d0" stroke="#166534" stroke-width="2"/>
      <rect x="100" y="50" width="50" height="50" fill="#bbf7d0" stroke="#166534" stroke-width="2"/>
      <text x="75" y="180" font-family="sans-serif" font-weight="bold" fill="#166534" font-size="14" text-anchor="middle">Un Patron plat (2D)</text>
    </g>
  </g>

  <!-- Etape 2 : Semi-plié (3.5-6.5s) -->
  <g opacity="0">
    <animate attributeName="opacity" values="0; 0; 1; 1; 0; 0" keyTimes="0; 0.25; 0.3; 0.55; 0.6; 1" dur="12s" repeatCount="indefinite" />
    <g transform="translate(140, 100)">
      <polygon points="25,75 75,75 100,50 50,50" fill="#4ade80" stroke="#166534" stroke-width="2"/>
      <polygon points="50,50 100,50 90,10 40,10" fill="#bbf7d0" stroke="#166534" stroke-width="2"/>
      <polygon points="25,75 50,50 30,30 5,55" fill="#86efac" stroke="#166534" stroke-width="2"/>
      <polygon points="75,75 100,50 120,30 95,55" fill="#86efac" stroke="#166534" stroke-width="2"/>
      <text x="60" y="110" font-family="sans-serif" font-weight="bold" fill="#166534" font-size="14" text-anchor="middle">On plie les faces...</text>
    </g>
  </g>

  <!-- Etape 3 : Le Cube fermé en 3D (7-11.5s) -->
  <g opacity="0">
    <animate attributeName="opacity" values="0; 0; 0; 1; 1; 0" keyTimes="0; 0.5; 0.55; 0.6; 0.95; 1" dur="12s" repeatCount="indefinite" />
    <g transform="translate(150, 120)">
      <polygon points="0,0 40,-20 80,0 40,20" fill="#86efac" stroke="#166534" stroke-width="2"/>
      <polygon points="0,0 40,20 40,70 0,50" fill="#4ade80" stroke="#166534" stroke-width="2"/>
      <polygon points="80,0 40,20 40,70 80,50" fill="#22c55e" stroke="#166534" stroke-width="2"/>
      <!-- Animation Sommet -->
      <circle cx="40" cy="20" r="5" fill="#ef4444">
         <animate attributeName="r" values="3; 6; 3" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="130" y="25" font-family="sans-serif" font-size="12" fill="#ef4444" font-weight="bold">Le Sommet (Pointe)</text>
      <!-- Animation Arête -->
      <line x1="80" y1="0" x2="40" y2="20" stroke="#f59e0b" stroke-width="4">
        <animate attributeName="stroke-width" values="2; 5; 2" dur="2s" repeatCount="indefinite"/>
      </line>
      <text x="100" y="-5" font-family="sans-serif" font-size="12" fill="#f59e0b" font-weight="bold">L'Arête (Pliure)</text>
      <text x="40" y="110" font-family="sans-serif" font-weight="bold" fill="#166534" font-size="14" text-anchor="middle">Un Cube solide en 3D !</text>
    </g>
  </g>
</svg>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. Le vocabulaire des Solides (3D)

Pour se repérer dans un solide mathématique (qui ne roule pas, comme un grand cube), tu as besoin d'une boîte à outils de mots précieux :
- **La Face** : C'est le côté tout plat du solide. Imagine le visage du carton. Si tu mets le solide sur une table, il repose confortablement à plat sur une face.
- **L'Arête** : C'est la ligne droite ! C'est le carrefour très précis où deux grandes "faces" se percutent (la pliure du carton, ou le bord de ton bureau).
- **Le Sommet** : C'est le coin pointu ! L'endroit même où 3 arêtes (ou plus) se rencontrent en un terrible pic. (Aïe, ça pique le doigt !).

### 2. La famille des Solides géants

Il y a 4 solides très fréquents que tu dois connaître de vue :

1. **Le Cube** (Exemple: un dé géant)
   - L'ultime perfection : Il possède **6 faces** qui sont toutes des "Carrés" parfaitement clones.
   - Il compte 12 arêtes pour sa structure, et 8 sommets piquants.

2. **Le Pavé droit** (Exemple: une brique de jus de lait ou une boîte à chaussures)
   - C'est un cousin "étiré" du cube. 
   - Il a **6 faces** qui sont souvent des longs "Rectangles". (Parfois il a 2 carrés de chaque côté de la boîte).

3. **Le Cylindre** (Exemple: Un tuyau ou une canette)
   - Il possède **2 faces parfaitement plates** qui sont des "cercles" ! (pour le couvercle et le fond).
   - Entre les deux ? c'est tout courbé ! Si tu le couches et que tu souffles fort, bingo, il va rouler loin !

4. **La Sphère** (Exemple: le Soleil, une bille)
   - Difficile d'être plus mystérieux : Elle n'a aucune "face plate", **aucune arête, aucun sommet**. Elle est courbée sur 100% de la surface, elle ne sait jamais s'arrêter de rouler !

### 3. La grande règle de la Symétrie (L'effet miroir)

On dit qu'une figure (ou un dessin) est **symétrique** si tu peux poser exactement un miroir droit, et que ce que tu vois au fond du miroir complète magiquement la figure à l'identique ! 
Ou encore avec du papier : si tu plies la figure sur cette fameuse ligne magique, les deux moitiés du dessin _se superposeront bord à bord, au millimètre près_, en se cachant complètement !

L'endroit magique où on a fait le pli s'appelle d'une façon très classe : l'**Axe de Symétrie**.
- *Le Papillon* : C'est la nature symétrique par excellence ! Un trait droit coupé sur sa colonne vertébrale, et paf : l'aile gauche se superpose parfaitement à l'aile droite.
- *Les Lettres* : Le "A" a un bel axe vertical central. Le "H" en a même 2 (un vertical et un horizontal) ! Par contre, le gentil "R" n'a rien du tout de symétrique !

---

## 📌 Rappels

Petit retour au CP très rapide pour les faces plates (2D) : 
- **Le carré** : 4 côtés parfaitement de la même longueur, et de beaux angles droits coincés.
- **Le rectangle** : 4 côtés, mais ils se promènent par deux (2 grands amis et 2 petits).
- **Le triangle** : 3 côtés pointus super cool.
- **Le cercle** : 1 longue courbe qui tourne. 0 piquant.

---

## 💡 Le Saviez-vous ?

L'Égypte antique adorait les formes pures et symétriques ! Les immenses **Pyramides** d'Égypte sont des "solides" grandioses ! Elles disposent d'un sol large et stable (une de ses **faces**) bien caché posé dans le sable chaud, et de façades visibles qui sont des *Triangles* montant se rejoindre sur un seul et unique **Sommet** ultime, pointant le bout de son nez vers les nuages ! 

---

## 🛠️ Application Pratique / Interactive

Dans ton espace d'école ou ta chambre :
1. Partons à la chasse aux sommets ! Avec ton petit doigt prudent, compte précisément les "coins" (sommets) d'un livre épais fermé (c'est un magnifique pavé droit). *Il doit y en avoir 8 !*
2. Touche le long d'un verre en plastique vide... Attention, le haut tout en rond "n'est pas" une arête droite ! Et en plus il n'y a pas de nez pointu.

---

## 🧠 Flashcards

<div className="flex flex-wrap gap-4 justify-center my-6">
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card border-2 border-border-strong rounded-xl [backface-visibility:hidden] shadow-sm p-4">
        <span className="text-sm text-primary font-bold mb-2">Question</span>
        <span className="font-medium text-lg">Qu'est-ce qu'une Face pour un solide géant ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Un côté tout plat !</span>
        <span className="text-sm mt-1">(Le mur ou le sol sur lequel il repose).</span>
      </div>
    </div>
  </div>
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card border-2 border-border-strong rounded-xl [backface-visibility:hidden] shadow-sm p-4">
        <span className="text-sm text-primary font-bold mb-2">Question</span>
        <span className="font-medium text-lg">Comment se nomme la ligne droite où 2 faces de carton se touchent et se plient ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-2xl font-bold">L'Arête !</span>
      </div>
    </div>
  </div>
</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le décompte du Cube
Observe un dé à jouer classique, ou imagine ce cube 3D dans ta tête pour répondre avec certitude.
1. Ce cube possède-t-il plus ou moins de 10 faces plates ? 
2. Donne le nombre très précis de ses Sommets.

<details className="mt-4 p-4 border border-border-strong rounded-xl bg-card">
<summary className="font-bold text-primary cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
1. Un dé possède les numéros : 1, 2, 3, 4, 5 et 6. Exactement un de chaque face pour jouer. Un cube possède donc bien "6 faces". Ce qui est nettement "Moins de 10".
2. Un cube a "4 pointes piquantes" en haut (comme un toit plat)... et également "4 pointes piquantes" plantées solidement au sol. Soit 4+4 = 8 ! Le cube compte 8 sommets. 
</details>

### Exercice 2 : Recherche de Symétrie (Le reflet Miroir)
Prends les lettres en MAJUSCULE suivantes : **H**, **E**, et **R**. 
Cherche comme un savant si on peut tracer sur chacune "un Axe" magique (la fine ligne droite) qui transformera les deux côtés en miroir parfait de symétrie.

<details className="mt-4 p-4 border border-border-strong rounded-xl bg-card">
<summary className="font-bold text-primary cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
- Lettre **H** : *OUI !* C'est le roi ! Tu peux tirer un trait droit horizontal en plein milieu, et paf : le haut se replie sur les deux pattes identiques du bas ! Tu peux aussi le couper verticalement et le côté gauche tombe sur l'autre côté droit. Il triche, il a 2 axes !
- Lettre **E** : *OUI !* Pas possible de le couper debout pour lui. Mais si on trace une belle ligne allongée en plein milieu de sa petite barre centrale... le bras du haut se replie de façon magique en superpoition sur la taille du bras du bas ! Il a le parfait axe horizontal de symétrie absolu ! 
- Lettre **R** : *NON !* Absolument jamais ! Si je la coupe de haut en bas, une drôle de grosse bosse et une patte tombent sur... rien de l'autre côté gauche ! Elle n'est clairement pas dotée de l'effet "Axe Symétrique". 
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Est-ce qu'un "carré", c'est finalement la même chose qu'un "cube" ?**
**R** : Absolument pas ! Ne tombe pas dans le terrible piège à l'école ! Un **Carré** c'est une fine trace que tu dessines au crayon sur un papier, c'est totalement plat et sans volume (2D). Un **Cube**, c'est gonflé avec une place réelle à l'intérieur ! Comme une cage à secret (3D) ! Bon, pour être juste... il est tout de même construit par exactement "6 grands carrés 2D" soudés sur tous les côtés ensemble. Mais ce sont donc 2 statuts distincts !

**Q2 : Les lignes un peu piquantes... c'est sérieux le mot "Arête" comme pour un poisson ?**
**R** : OUI, c'est drôle, mais très officiel ! En géométrie dans l'espace (la 3D), on ne parle plus du mot "bord ou côté du carton". La ligne formée entre deux faces qui se rencontrent de pleine face prend officiellement le grand nom "**d'Arête**".

**Q3 : Une belle Sphère, c'est un cercle géant ou comment ça se passe ?**
**R** : C'est comme le rapport entre un carré 2D et un cube 3D ! Un vrai Cercle, c'est juste un trait de compas ou un cerceau sportif couché à plat, sans épaisseur. Par contre la Sphère magique.. c'est plein, tu la prends dans ta paume, tu joues avec aux billes ou au basket ! (Comme la Planète !). 

---

## 📝 Mini-Quiz

**Question 1 : Je regarde une toute nouvelle boîte de jus de fruit, qui est un magnifique "Pavé Droit". Elle a fatalement :**
- [ ] 5 grandes faces
- [x] 6 faces
- [ ] 0 face, elle est pleine de vent !

> **Explication :** Bien sûr ! C'est la construction de base de son cousin proche "Le Cube". Un Pavé Droit est certes souvent "allongé" en étirant ses surfaces en rectangles, mais il possède exactement "6 faces" pour constituer une boîte bien fermée !

**Question 2 : Le gentil Petit Cylindre possède beaucoup de sommets (les pointes très piquantes !) dans son volume arrondi...**
- [ ] Vrai !
- [x] Faux ! J'ai beau chercher, je ne me pique pas...

> **Explication :** FAUX !! Ne te laisse pas piéger ! Un Cylindre (comme une boîte de conserve), possède un contour courbe pour rouler sur lui-même !! Aucun coin pointu, donc... "0 Sommet" !

**Question 3 : Une porte de salle de bain fermée avec une poignée asymétrique, est coupée en son milieu (horizontalement). Est-ce symétrique ?**
- [ ] OUI !
- [x] NON !

> **Explication :** Faux ! Si je coupe horizontalement, la poignée ne se trouvera que d'un côté. Et en coupant verticalement, les charnières se retrouveront isolées d'un côté. La porte "avec ses accessoires" n'est donc pas symétrique !

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Je sais ce que veut dire 2D (c'est plat, sur du papier) et 3D (c'est volumineux, en vrai pour prendre de la place !).
- [ ] J'ai compris que la pointe du "Sommet" n'a rien à voir avec "L'arête" qui est comme une pliure.
- [ ] Je sais reconnaître tous mes copains Solides ! (Cube, pavé, cylindre et sphère).
- [ ] J'ai compris qu'un "Axe de symétrie" sépare une chose en deux comme un miroir.
