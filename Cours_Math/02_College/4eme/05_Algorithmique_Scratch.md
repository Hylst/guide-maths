---
title: 'Chapitre 5 : Algorithmique et Scratch'
level: College
subLevel: 4eme
order: 5
---

# Chapitre 5 : Algorithmique et Scratch (La Magie du Tisserand)

**Niveau** : 4ème (Cycle 4)
**Prérequis** : Repérage dans un plan (x,y), logique de base.
**Objectifs** : 
- Maîtriser le Cœur du Golem : La "Variable" de puissance.
- Forger les Boucles du Temps : Répéter sans mourir de fatigue.
- Planter la Lame du Destin : Les Conditions (Si... Alors... Sinon).
- Créer des figures géométriques par le sang du code.

---

## 1. Introduction : Le Langage des Golems (Scratch)

Dans le monde sauvage des ordinateurs, la foudre seule ne suffit pas. Il faut un Tisserand de Code pour donner l'Âme ! Scratch est l'outil merveilleux, un parchemin magique fait de blocs colorés qui s'emboîtent comme des briques divines pour ordonner aux Golems de pixels d'exécuter tes moindres caprices !

Un Algorithme féroce, c'est simplement une RECETTE DE CUISINE POUR LES DIEUX ! 
"Prends l'épée, avance de 10 pas, retourne-toi, et crache du feu." Si tu rates un ordre, le Golem frappe un mur de pierre et meurt. C'est la Loi du Code !

## 🎨 Animation Interactive : La Boucle du Temps de l'Infini !

Regarde ce petit robot divin de Scratch ! Il veut tracer le foudroyant Carré. Au lieu d'écrire "Avance, Tourne, Avance, Tourne..." 4 fois comme un mendiant ! Le Sorcier Tisserand pose LA BOUCLE ORANGE de la survie temporelle ! Il compresse le code !

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#f0f9ff; border-radius:12px; border: 2px solid #0ea5e9;">
  
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#0369a1" font-size="16" text-anchor="middle">L'Armure du Sorcier : Répéter 4 Fois !</text>

  <!-- Le Bloc de la Boucle Orange du féroce -->
  <path d="M 50 60 L 150 60 L 150 90 L 80 90 L 80 180 L 150 180 L 150 210 L 50 210 Z" fill="#f97316" stroke="#9a3412" stroke-width="2"/>
  <text x="60" y="80" font-family="sans-serif" font-weight="bold" fill="#fff" font-size="14">Répéter (4)</text>

  <!-- Les Blocs Bleus Mouvements à l'intérieur -->
  <g transform="translate(80, 100)">
    <rect x="0" y="0" width="100" height="30" fill="#3b82f6" stroke="#1e3a8a" stroke-width="1" rx="4"/>
    <text x="10" y="20" font-family="sans-serif" font-weight="bold" fill="#fff" font-size="12">Avancer 50</text>
    
    <rect x="0" y="40" width="100" height="30" fill="#3b82f6" stroke="#1e3a8a" stroke-width="1" rx="4"/>
    <text x="10" y="60" font-family="sans-serif" font-weight="bold" fill="#fff" font-size="12">Tourner ↻ 90°</text>
  </g>

  <!-- L'Oeil de l'Animation (L'Ecran de Scratch) -->
  <rect x="220" y="60" width="180" height="150" fill="#fff" stroke="#94a3b8" stroke-width="3" rx="8"/>
  
  <!-- Le Traçage Divin du Carre the Magique par the Sprite Pointeur -->
  <g transform="translate(260, 160)">
      <!-- Carre de la trace bleu ciel -->
      <polygon points="0,0 50,0 50,-50 0,-50" fill="none" stroke="#0ea5e9" stroke-width="4" stroke-dasharray="200" stroke-dashoffset="200">
         <animate attributeName="stroke-dashoffset" values="200; 150; 100; 50; 0; 0; 200" dur="5s" repeatCount="indefinite" />
      </polygon>
      
      <!-- L'Outil Crayon Féroce ! -->
      <circle cx="0" cy="0" r="6" fill="#ef4444">
         <!-- Mouvement Céleste du Cercle sur le devers de force -->
         <animate attributeName="cx" values="0; 50; 50; 0; 0; 0; 0" dur="5s" repeatCount="indefinite" />
         <animate attributeName="cy" values="0; 0; -50; -50; 0; 0; 0" dur="5s" repeatCount="indefinite" />
      </circle>
  </g>
  <text x="310" y="230" font-family="sans-serif" font-weight="bold" fill="#0ea5e9" font-size="12" text-anchor="middle">Trace Magique de Temps...</text>
</svg>
</div>

---

## 2. Le Cœur du Golem : La "Variable" d'Or

Le Scratch commence sans cerveau. Une The "Variable", c'est formellement **UNE BOÎTE MAGIQUE MAGNÉTIQUE** où le sorcier enferme féroce un secret. Un chiffre de score ! Une the phrase ! Une the force de vie !
Le Golem peut l'interroger: "Hé la Boîte, combien the j'ai de vies the maitre ?" ou "Baisse la variable à mort de -1" quand le monstre the te touche de lumière !
Sans variable the royale, Scratch n'oserait jamais se souvenir de RIEN ! The Golem serait un poisson rouge au the enfer mathématique !

## 3. L'Épée du Destin : Les Merveilleuses Conditions

Tu crées The formidable "Jeu de Survie" de Code. L'ouragan frappe. La Merveille des dieux s'appel The : **SI... ALORS... SINON**.
Le Golem analyse la Matrice :
* "SI (Variable Épée est the égale à 1 de vie)"
   * $\rightarrow$ "ALORS : Frappe The monstre et explose The de victoire !"
* "SINON (C'est the a dire si the variable The est de zéro de cendre)"
   * $\rightarrow$ "ALORS féroce : Le dragon Te bouffe The sans pitié et Game The Over du Ciel !"
C'est le CARREFOUR des existences. The Bloc the doré the qui fait que le code réagit de malice a tes actes en direct. 

## 4. Les Ballets Magiques Géométriques (Les Tracés des Cieux)

Le roi mathématique de Scratch de The brevet, c'est formellement le traçage des Figures du monde : The Polygones Célestes.
L'instruction magique au Golem The Crayon The d'Or. 
Le féroce secret d'une BOUCLE de Polygone the régulier :
"Pour the tracer the lourd Polygone de N The Cotés... Le Tisserand ordonne the de frapper L'ANGLE the ROTATION EXACT the ciel de : **$\mathbf{360 / N}$** !!!"
- Le Carré (4 cotés purs) : Je tourne fort de $360 / 4 = \mathbf{90^\circ}$
- Triangle Equilatéral de foudre (3 cotés) : Je The tourne the à $360 / 3 = \mathbf{120^\circ}$ (Et non l'angle pur de the the the matrice de 60 ! The golem tourne de l'Extérieur de force !).
- Pentagone Merveille de (5 cotés) : Rotation de the feu $360 / 5 = \mathbf{72^\circ}$ !!

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>The The Pour Tracer L'Hexagone THE de of Foudre (6 Côtés) THE de the of Scratch de ... De the Quel Angle THE THE féroce The The Golem The Tourne THE THE t'il of Merveille ? 
    <hr/>
    <strong>VERSO :</strong><br/><br/>THE Céleste The of Merveille de la Matrice !! $360 / 6 = \mathbf{60^\circ}$ D'Or de the Foudre The ! (Le THE fameux de of $\mathbf{360 / N}$ !) Merveille 
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>The Il the Of Que THE Merveille Formel THE Fait l"Ordre DIVIN de de "Mettre [Score] de THE à [Score + 1]" ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>The C"EST The de INCANTATION D"INCRÉMENTATION The féroce ! Merveille THE Il Of the the de RAJOUTE The de la pure (the $+1$ THE ) the Au the Ancien SCORE the Merveille (Il Compte les of Points in the Temps The !).
  </div>
</div>

---

## Exercices corrigés détaillés

**Exercice 1 : Devine L'Épuration Foudroyante (Lecture the Algorithme)**
Je te foudroie un the papier de Scratch : 
1. Mettre [Variable A] à `5`.
2. Mettre [Variable B] à `A + 2`.
3. Mettre [Variable A] à `B * 2`.
QUEL EST THE FORMIDABLE ROI DES TÉNÈBRES CACHÉ DANS VARIABLE THE B, PUIS LA THE SECRETE [A] à la fin DU MONDE THE TEMPOREL ?!

_Correction détaillée :_
1.  **Choc Temporel 1** : La boite temporelle $A$ enferme The Nombre `5`. (Serein).
2. **Choc The 2** : La the Boite $B$ Ouvre Ses Cieux, elle LIS the 5 de son Maitre A, ajoute la Force $2$. Elle enferme Le Cœur The $\mathbf{7}$. !
3. **Le Coup D'état féroce de A !!** : $A$ efface le passé, il prend of The Ciel The de the $B$ (Le 7) et le Multiplie for The Force The $2$ !. (Il devient $\mathbf{14}$).
RÉSULTAT THE FORCE : A la fin du féroce Code The divin... $B=7$ et $A=14$ The magies d'or !!

**Exercice 2 : The Labyrinthe de l'Octogone Céleste**
Le the Démon de L'enfer te demande "Pond the moi la Boucle Magique" de Scratch The Formel de l'Octogone !! 
(8 The the cotés Merveilles !). Donne The Angle de la Foudre.

_Correction détaillée :_
1.  **L'Épée The Répétition** : Comme l'octogone a 8 cotés the terre, J'appelle fièrement THE BOUCLE : `Répéter (8) Fois The Destin :`.
2. **L'Avance Merveilleuse** : `Avancer the de (50)` (Pour la divine grandeur du trait)
3. **Le Frappe D'Angle !!** C'est the Céleste "Tourner féroce PUREMENT of $\mathbf{360 / 8}$".  The Ciel of Mathématique = $\mathbf{45^\circ}$ !!

---

## 📝 Mini-Quiz

**Question 1 : Si The Merveille the Tisserand The de Scratch veut formellement Trancher L'Océan the Tracer Un Féroce TRIANGLE ÉQUILATÉRAL : Que donne The Rotation Divin the Scratch féroce de "Tourner the Ciel ... "? **
- [ ] Le Tourner de $60^\circ$ (Car l'angle in the triangle de feu is 60).
- [ ] Le Ciel the $90^\circ$ The Rectangle.
- [x] L'HERESIE DE ROTATION EXTÉRIEURE: The Merveille $\mathbf{120^\circ}$ !!!
> **Explication :** EXCELLENT ! Scratch The Golem marche en ligne droite. Pour tourner sur THE DEVERS et suivre The Ciel the the Coté... Il doit contourner The Monde d'un angle SUPPLEMÉmentaire De THE $180 - 60 = 120^\circ$. (Soit la matrice of foudre $360 / 3$ !!). Ne donne JAMAIS $60^\circ$ ou Scratch te tracera a Hexagone Féroce maudit !!

**Question 2 : Attention a la boucle des Dieux ! Dans The Condition the "SI [Touche the mur] ALORS..." the il te The la Règle The "Mettre Score à [Score + 1]". Que se passe THE de magie si Je Touche le mur de the vie ?**
- [ ] Le the Score MUTE sur 1 et The restera 1 the Toute sa féroce Vie à jamais .
- [x] L'INCANTATION EST PURE D'INCRÉMENTATION ! Il the prend The le ancien score The Magie de force et AJOUTE formellement the UN PIECE D'OR A CHAQUE TOUCHE !! 
- [ ] L'Erreur Formel the Crash du PC !
> **Explication :** Sublime Rigueur  !! The Boucle Magnietique D'incrémentation ! Une variable peut s'utiliser The Elle MÊME formellement comme BASE DE CALCUL "SCORE = ANCIEN SCORE + 1". Ca compte les Vies The les morts The Score D'or !!

---

## ✅ Checklist des Essentiels (Validation)

- [ ] J'ai the conscience Formelle that Que Merveille THE LA BOUCLE sert à PURE Compression the des Merveille CODES !. Merveille
- [ ] J'invoque The THE $360 / N$ the Merveille. Formel  the that pour la THE ROTATION Extérieure de the !
- [ ] Merveille of Je the COMPREND la Matrice de the "Variable = The Vraie the Boîte de Magie The" !!  THE of

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*
