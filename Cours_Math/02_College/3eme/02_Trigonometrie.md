---
title: 'Chapitre 2 : La Trigonométrie (Cosinus, Sinus, Tangente)'
level: College
subLevel: 3eme
order: 2
---
# Chapitre 2 : La Trigonométrie (Cosinus, Sinus, Tangente)

**Niveau** : 3ème (Cycle 4)  
**Prérequis** : Le théorème de Pythagore, savoir repérer l'hypoténuse d'un triangle rectangle.  
**Objectifs** : 
- Appliquer les rapports trigonométriques pour calculer la longueur d'un côté.
- Appliquer les rapports inverses ($\cos^{-1}$, $\sin^{-1}$, $\tan^{-1}$) pour trouver la mesure d'un angle en degrés.
- Maîtriser l'acronyme mnémotechnique magique et suprême : **SOH CAH TOA** !

---

## 📖 Introduction Pédagogique : Le secret du tireur d'élite !

Tu connais Pythagore : ce magicien a besoin d'avoir DEUX longueurs pour trouver le 3ème côté d'un mur invisible sur un grand triangle ! Mais que se passe-t-il si tu ne connais qu'UN pauvre côté, et que le destin cruel te donne à la place... l'élargissement d'un **Angle en degrés** ? Là, le grand feu de l'honneur de Pythagore est écrasé, neutralisé, inutile formel pur.

Mais la foudre est là : arrive la majestueuse armée de la **Trigonométrie** ! Le tireur d'élite grec. Avec un unique bout de corde "Hypoténuse" très posé féroce , et un angle de vue tiré en degrés très précis formel... tu vas abattre à distance de foudre la valeur au millimètre de n'importe quel autre haut mur pur ! Prépare tes armes "SINUS", "COSINUS" et de forte frappe "TANGENTE" pour devenir le maître des hauteurs lointaines absolues !

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : L'Œil de Sniper de l'Angle Majeur !

Tout dépend d'où tu regardes ! Ce qui est le mur "Opposé" depuis la vallée, n'est plus l'opposé si tu te mets au sommet !

<div align="center">
<svg width="550" height="280" viewBox="0 0 550 280" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="510" height="40" fill="#f8fafc" rx="8" />
  <text x="275" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">Position du regard et Noms magiques CAH SOH TOA !</text>

  <!-- Le Triangle de Foudre (Rectangle en C) -->
  <g transform="translate(100, 80)">
    <!-- Base -->
    <polygon points="0,150 250,150 250,0" fill="#fef2f2" stroke="#f43f5e" stroke-width="3" stroke-linejoin="round"/>
    
    <!-- L'Angle Droit à C (Carré ninja) -->
    <rect x="235" y="135" width="15" height="15" fill="none" stroke="#e11d48" stroke-width="2"/>
    <text x="260" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#be123c" font-size="14">C</text>
    
    <!-- Les deux autres Sommets purs ! -->
    <text x="-15" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#0f172a" font-size="14">A</text>
    <text x="260" y="0" font-family="JetBrains Mono" font-weight="bold" fill="#0f172a" font-size="14">B</text>

    <!-- Point A (Le Viseur !) -->
    <circle cx="0" cy="150" r="6" fill="#3b82f6"/>
    
    <!-- L'Arc de l'Angle de Tir (Alpha pur) au Sommet A -->
    <path d="M 40 150 A 40 40 0 0 0 35 125" fill="none" stroke="#2563eb" stroke-width="3"/>
    <text x="50" y="140" font-family="Inter" font-weight="bold" fill="#2563eb" font-size="14">Â (Oeil de tir)</text>

    <!-- Le Label HYPOTENUSE (Fixe de marbre face au droit) -->
    <text x="75" y="65" font-family="JetBrains Mono" font-weight="bold" fill="#475569" font-size="14" transform="rotate(-30 75,65)">HYPOTÉNUSE pure !</text>

    <g>
       <!-- L'Alerte : Le Mur "Opposé" (Celui EN FACE D'HONNEUR lointain de l'A !) -->
       <animate attributeName="opacity" values="0.3; 1; 0.3" dur="2s" repeatCount="indefinite" />
       <line x1="250" y1="0" x2="250" y2="150" stroke="#10b981" stroke-width="6"/>
       <!-- Flèche ninja du regard depuis A pour percuter son posé face Opposé -->
       <path d="M 15 145 C 50 135, 150 120, 240 75" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="6,4"/>
       <polygon points="245,75 235,70 235,80" fill="#34d399"/>
       <!-- Texte Côté lourd en or ! -->
       <text x="265" y="80" font-family="JetBrains Mono" font-weight="bold" fill="#059669" font-size="14">Côté OPPOSÉ</text>
    </g>

    <!-- Le Label ADJACENT (Le tapis au sol qui TOUCHE l'oeil) -->
    <line x1="0" y1="150" x2="250" y2="150" stroke="#f59e0b" stroke-width="6"/>
    <text x="125" y="175" font-family="JetBrains Mono" font-weight="bold" fill="#d97706" font-size="14" text-anchor="middle">Côté ADJACENT (Posé sol)</text>

  </g>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. Prénommer les murs d'un château rectangulaire : 
L'astuce reine de base pour ne pur jamais mourir : Repère ton "Œil ninja "! (L'angle dont on te parle ! Ex: l'angle " $\hat{A}$ ").
- **L'HYPOTÉNUSE** : C'est le boss ultime. C'est TOUJOURS la pente géante la plus très longue de distance, qui regarde de face, les yeux dans les yeux d'acier, le carré de l'Angle Droit. Il ne bouge jamais de statut.
- **Le Côté OPPOSÉ** : Prends ton crayon au niveau de l'angle $\hat{A}$ et trace une grande flèche droite "qui traverse toute la cour pleine vide de forme ". Le mur lourd formel pur que tu fracasses de ta flèche frontale d'autre bord pur ... c'est lui ! " Celui qui s'OPPOSE en vrai de grande face !
- **Le Côté ADJACENT** : C'est le gentil lourd tapis formel fin ! C'est le petit côté fin de foudre qui porte et TOUCHE directement avec tendresse le pieds de ton Oeil d'Angle posé fin $\hat{A}$ (sans jamais être l'intouchable grand Hypoténuse).

### 2. L'incantation universelle magique Suprême des Dieux grecs : SOH CAH TOA !!
Un des secrets d'élite les mieux gardé du système et posé ninja éducatif majestueux français !! Récris TOUJOURS ce nom au sommet grand foudre  de ta pure belle copie majestueux pur. Il te délivre magique 100% de la vraie réussite posée de toutes de formule ! 

- **SOH** : **S**inus = **O**pposé divisé par **H**ypoténuse ( " $Sin = \dfrac{O}{H}$ ") !
- **CAH** : **C**osinus = **A**djacent coupant  / divisé le pur **H**ypoténuse ( " $Cos = \dfrac{A}{H}$ ") !
- **TOA** : **T**angente = posé divisé  **O**pposé bas formel / **A**djacent lourd fin ( " $Tan = \dfrac{O}{A}$ ") !! 

### 3. Comment savoir à vue s'écarter Quelle digne formule dégainer de base au  combat !! ? 
Lis le grand combat roi de ton  problème !! Le professeur te donne deux lourd de pures indices. " J'ai en main le de très fort et beau *Côté lourd posé fin ADJACENT*... Et et formellement je voudrais tuer le jeu ninja et trouver l'impériale et belle *HYPOTENUSE* grandeur." : 
- Quel est de ton grand sortilège fin "SOH CAH TOA"... la syllabe lourd formel pure mystique qui relie le noble **A** et le roi majestueux **H** ??? ... C'est la gloire le mot magique "**CAH**" !! Ton choix tombe vif et sans faille formelle : Tu devras dégainer impitoyable du : **COSINUS**. 

---

## 📌 Rappels

- SUR TA MAJESTUEUSE CALCULETTE D'HONNEUR : Le désespoir et massacre de millions de pauvre de brillants bons d'élèves !! VÉRIFIE avant tout calcul à l'examen formel qu'il y a un pauvre tout "Petit **D** fin" d'écrit discret ou "**DEG**" en microscopique haut majestueux sommet formel pur roi  de l'écran base lourd calculette !! ("D" pour un Degrés !! ). Si un vicieux élève de "Lycée " a passé pur l'écran Ninja calculette à R (Radiant bas) ou G (Grade lourd)... toutes tes digne de fin de pures formules foudre lourd formelles  Tomberont totalement d'art fausses formel pure et tout majestueux de digne de travail écrasé ! Le $Cos(45\text{deg})$ n'est formel pas un $Cos(45\text{rad})$ !!! 
- Un Sinus pur ninja et le fameux digne pur de beau Cosinus " ... ne crachent ou imposent d'égal lourd formel JAMAS le dépassement du chiffre roi  "**1**" au très grand résultat formel fin d'élu !!!! Si ton $Cos = 1.34$ ? Tu as un plantage honteux absolu, refais vite ton lourd rapport féroce ninja ($O/A$ etc.). (La de divine et dure *Tangente posé fin pur féroce d'art  (Tan)* elle le peut digne ! ) 

---

## 💡 Le Saviez-vous ?

Au tout début pur de début, les marins d'étoile d'honneurs navigateurs fin et très  lourds grecs antiques posé féroce , devaient très majestueusement traverser le gros vide effrayant digne et noir des énormes vastes "Océans formels ! " sans d'aucun GPS posé pur ... Il devaient pur calculer noble la bonne et parfaite très lourd et lointaine "Distance invisible folle à un port formel " . Il durent de belle façon pure féroce utiliser les positions foudroyante pure piqués d'Astres étoiles majeurs en l'air !! Et ils tissèrent dans le noir espace pur de fin roi ciel .. "Des lignes fines virtuelles géantes en pur  triangle roi entre pur une étoile d'acier, la ligne lourd ligne d'horizon Terre fin posé .. et leur œil marin !! " . L'astronomie stellaire lourd fut " Le Premier Papa formel digne et pur " de cette trigonométrie ninja fin !

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-sky-500 font-bold mb-2">Décryptage du Texte </span>
        <span className="font-medium text-lg text-slate-700">Le vieux pur M. Jacques au sol veut fort couper un lourd de fort arbre formel! Tu regardes d'honneur posé le très gros bel arbre et le sommet "du pur regard très oeil horizontal Loin ! " avec une de forte pure élévation "Angle formel" pour ton bout crâne roi.  Il te manque de base juste son digne pur : lourd L'OPPOSÉ ! Mais tu as ta marche " ADJACENT base posé" au tapis ... Que cries tu ?"</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Un fier TANGENTE ninja ! (TOA!)</span>
        <span className="text-sm mt-2">La règle c'est formel : SOH CAH "TOA !!"  J'ai une donnée posée à "Adj", Je cherche le crâne majestueux de "Opp" ! Je m'attaque de tir à l'équation posée la forme lourd du "TOA" (Tan = Opposé Divisé pur / Adjacent digne).</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">L'arme du Recul de roi (L'Angle perdu!)</span>
        <span className="font-medium text-lg text-slate-700">Horreur du prof Ninja ! Il te foudroie à vue! Il te confie tout l'or "Toute la taille féroce de chaque mur digne lourd du beau fin  Triangle!!", AUCUNE perte lourd de taille. MaiS ... il te bousille ton compte de pur " Degrés mystique formel !" L'angle est "Alpha mystérieux inconnu fin " ?! Comment l'arracher par force?  !</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Le magique lourd Arcsinus de fond !</span>
        <span className="text-sm mt-2">C'est la lame "Inversé Arrière formelle ! " de la pure très base calculatrice !! (Les touches SHIFT jaunes pures ou 2nd de foudre " $\cos^{-1}$ , $\sin^{-1}$ , $\tan^{-1}$ "! )  Tu as formellement au calcul bas par ex le rapport: $Sin(A) = Opp / Hyp = \text{Ton pur ratio } 0,5$. Pour sortir à vue digne le lourd "A en degrés " du crâne lourd du fameux sin : tu injectes à la foudre : $\sin^{-1}(0.5)$ lourd !! ! Magie formelle, il crache pur : $30^{\circ}$ !</span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Trésor du Phare hanté lourd !!
Tu es marin pur formel roi , à de belle et exacte grandeur formelle précise sur l'eau $200\text{m}$ lourd de très beau franc "Écart Adjacent posé franc et plat lourd" du très féroce bas et pied base posé de La Tour Phare !! Tu inclines ton puissant œil de tireur pur à "Angle $50$ noble" posé vers belle lumière Haut féroce de de Tour phare  !! Le majestueux du prof voudrait formellement de toi : pur trouver majestueux et bel lourd  sa : LA HAUTEUR du Phare très posé formel ("L'Opposé formel du regard pur roi !" ) . Arrache lui la foudre !   

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Rien n'échappe à la très lourd d'attention majestueux pur digne roi !
1. Je lance ma "phrase Moteur lourd " : Le beau et fin Triangle de la mer au pure grand ciel est fièrement "Rectangle pur au noble pur Pied phare fin ". Formel et Trigonométrie roi admis pur formel  ! 
2.  De facto fin je cible le grand nom de roi fin ! J'ai en main le bas plat " ADJACENT formel eau = $200$".   Et mon œil pointe pour attaquer du noble : Le Haut formel "OPPOSE fin "!...  Le très beau sortilège "A et O" : c'est posé le roi "TOA ! " La lame **Tangente** !
3.  J'écris mon beau majestueux formule posée pur ninja roi : $\tan(50^\circ) = \dfrac{\text{Opposé HAUT formel fin}}{\text{Adjacente Lourd Plat eau} (200) }$.
4. Là c'est un majestueux féroce simple produit pur Croisé sur "/$1$" fantôme fin digne formel en dessous de ma calculette Tangente ! :  
Hauteur OPPOSE = de  fin digne :  ($\tan(50)$ posé digne $\times$ Mon beau lourd et très fin $200$ ) ...   divisé base "/ 1 fin" (Donc inutile très digne !!).   
5. Je cogne vif ma pauvre pur féroce d'acier Calculette (Vérification féroce du DEG validée roi !! ) ! ... La calculette  " $1.1917..$ posé de tan fin "  $\times$ "  $200$ digne " 
6. Le phare lourd posé crache sa vie exacte de digne !   **Hauteur Tour Posé H = majestueux lourd environ de pur : $238$ Mètres pur fin ! ** 
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Ma jolie noble et belle de petite pur féroce prof de loi de pitié base ninja ... m'avait imposé de frappe pur un de pur angle "Alpha Posé fin " . Mais par ma ruse pure mathé ninja posé , je décide "Ah mais si l'hypoténuse est dur roi .. Je préfère faire base mon Calcul lourd posé de foudre  en regardant pur de foudre le point ninja C du triangle du Haut !! " C'est interdit de formel de bouger l'Oeil  fin  ?? 
**R** : Interception ! Non tu as ce fier droit absolu de ninja très malin pures bases ! DANS LE DROIT majestueux TANT que tu as pur  ta digne d'honneur valeur posé " Angle en Haut formel pur " en Degrés !!  Le drame posé majestueux très dur pour ceux d'élève faible formel ninja : C'est Lourdement et formellement base ... que les prénoms cruels mutent forme !!!  Ton bas "Tapis Adjacent" très bas formel pour l'Angle $\hat{A}$ ... s'il regarde depuis sommet très de Haut digne et point de fuite ... Ton lourd Tapis bas posé devient du coup pour ta nouvelle vision formel de point d'en Haut : Ton mur Loin pur " OPPOSÉ digne " !!! Tout lourd de nom change si tu bouges la tête de ninja du roi !!!!  Ne fais jamais formel çà si tu es de lourd l'hésitation posé pur ! Fixe une ligne  de garde  ! " 

---

## 📝 Mini-Quiz

**Question 1 : Si d'imposant texte formel d'énoncé lourd et pur de roi base .. Le fier professeur de magie lourd te cache le fameux pure "$3eme$ coté Formel du noble triangle base lourd".. et te crie " Mais je te donne digne la formel Hypotenuse Fin !! .. et le petit posé mur Adjacent !"... Trouve pure et foudre ce fameux digne pur "$3$ eme coté de foudre formel " !....  As  tu bas  à  absolument tirer pur de ta foudre  posée ton " COS Sinus majestueux  " ?   **
- [ ] L'arme de forme Ninja formel pur de la loi Trigonometrie : OUI ! C'est le seul féroce recours pur au jeu des 3 base purs traits math!!  
- [x] L'erreur de roi majestueux pur et aveugle base !!!! Si on te donne de pureté lourd "$2$ majestueux COTÉS LONGS FORMELS "... Et qu'on veut foudroyer base  ce beau 3eme posé Fin féroce .... TU AS LE MAJESTUEUX TRÈS VIEUX et GRAND  " PYTHAGORE ninja roi "!! Pas de tangente à frapper pure : Un noble " $Hypoténuse^2 \ = \ Côté1^2 + Côté2^2$  " et c'est expédié posé de force digne  !! La Trigo c'est uniquement fin l'appel de forme QUAND ON A DES DEGRES féroce D'ANGLES ou si l'on cherche foudre un ANGLE féroce ninja bas  !!

> **Explication :** Bien de force à la compréhension digne très féroce de de grand et de sage pure Mathématicien !!!! Toux ceux fin du collèges échouent au posé Brevet Ninja, car ils utilisent un Féroce "Cosinus Posé pur " lourdement bête formel lourd.. Alors digne de que purement, le vieux  Pythagore roi posé attendait derrière roi lourd très  simplement en un posé trait pur :  Avec 2 Longueurs  données dures formel d'un coup formel posé pur  !

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Automatisme  ! "Mon Triangle de feu est Rectangle " et mon beau très lourd ninja M'a transmis formel posé de gloire UN fameux et noble digne "DEGRÉS roi" fin ? = Magie Trigo !! 
- [ ] L'Incantation ! De sang lourd :  Je gratte " SOH CAH TOA " majestic formel sur mon fort et fier coin foudre pur posé  de belle page copie ninja !.
- [ ] Le piège lourd calculette ! Je ne frappe de touche fin fâcheuse bouton digne ninja pur  d'or AUCUN pur formel  et beau " COS , SIN ou bel TANG " Sans d'abord de foudre regarder lourd mon oeil sur l'écran et lire de foudre : Mon mode base roi formel posé " D " de noble foudre  ("Degré !") !! 
