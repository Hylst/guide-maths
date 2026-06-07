---
title: 'Chapitre 6 : Algorithmique et Programmation'
level: College
subLevel: 3eme
order: 6
---
# Chapitre 6 : Algorithmique et Programmation (Boucles et Conditions)

**Niveau** : 3ème (Cycle 4)  
**Prérequis** : L'utilisation de Scratch (déplacer un lutin), les blocs d'instruction de base.  
**Objectifs** : 
- Maîtriser le fonctionnement majestueux des "Variables".
- Différencier une "Boucle" ("Répéter jusqu'à") et une "Condition" ("Si ... Alors").
- Créer un script capable de dessiner au stylo ou de calculer un programme de calcul formel.
- Traduire du texte en langage bloc (ou bloc en langage Python au lycée).

---

## 📖 Introduction Pédagogique : Le Dresseur de Robots pur !

Dans le grand monde de l'informatique, l'ordinateur est majestueusement bête ! C'est une immense machine féroce et pure qui n'a aucune pensée, aucune loi. Si tu ne lui donnes pas les dits exacts et d'honneur "Ordres d'acier purs", il ne fera jamais rien ! 

L'**Algorithmique**, c'est l'art d'écrire la recette. C'est le dictionnaire majestueux du dresseur de robot. En plaçant des briques (des Blocs Scratch) dans un parfait et rigoureux ordre d'assemblage, tu donnes une âme pure et digne à ton lutin ou ton programme. Tu vas pouvoir lui dire d'honneur de choisir son propre destin, ou de répéter un saut fatiguant " $1000$ fois " majestueuses ! Prêt pur ninja pour hacker le très lourd code digne et formel ?

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : Le Cerveau Algorithmique (Si / Sinon)

Le programme arrive à une route divisée d'honneur ! L'ordinateur regarde sa condition de base. Est-ce "Vrai roi" ? ou est ce "Faux formel !" ?

<div align="center">
<svg width="550" height="320" viewBox="0 0 550 320" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="510" height="40" fill="#f8fafc" rx="8" />
  <text x="275" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">La Condition féroce posée : Si / Alors / Sinon</text>

  <!-- Bloc de Départ Digne -->
  <rect x="200" y="80" width="150" height="30" fill="#6366f1" rx="15"/>
  <text x="275" y="100" font-family="JetBrains Mono" font-weight="bold" fill="#ffffff" font-size="12" text-anchor="middle">Début du Code</text>

  <line x1="275" y1="110" x2="275" y2="130" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
  <polygon points="275,135 270,125 280,125" fill="#94a3b8"/>

  <!-- Le Losange de Condition digne d'honneur -->
  <polygon points="275,135 340,165 275,195 210,165" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
  <text x="275" y="160" font-family="JetBrains Mono" font-weight="bold" fill="#854d0e" font-size="12" text-anchor="middle">Variable est</text>
  <text x="275" y="175" font-family="JetBrains Mono" font-weight="bold" fill="#854d0e" font-size="12" text-anchor="middle">pair ?</text>

  <!-- Sortie 1 (Vrai / Alors) -->
  <line x1="210" y1="165" x2="130" y2="165" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
  <polygon points="125,165 135,160 135,170" fill="#22c55e"/>
  <text x="170" y="155" font-family="JetBrains Mono" font-weight="bold" fill="#15803d" font-size="14" text-anchor="middle">VRAI</text>

  <!-- Sortie 2 (Faux / Sinon) -->
  <line x1="340" y1="165" x2="420" y2="165" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
  <polygon points="425,165 415,160 415,170" fill="#ef4444"/>
  <text x="380" y="155" font-family="JetBrains Mono" font-weight="bold" fill="#b91c1c" font-size="14" text-anchor="middle">FAUX</text>

  <!-- Bloc Action Vrai -->
  <rect x="50" y="145" width="70" height="40" fill="#dcfce3" stroke="#22c55e" stroke-width="2" rx="4"/>
  <text x="85" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#15803d" font-size="12" text-anchor="middle">Divise</text>
  <text x="85" y="180" font-family="JetBrains Mono" font-weight="bold" fill="#15803d" font-size="12" text-anchor="middle">par 2</text>

  <!-- Bloc Action Faux -->
  <rect x="430" y="145" width="80" height="40" fill="#fee2e2" stroke="#ef4444" stroke-width="2" rx="4"/>
  <text x="470" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#b91c1c" font-size="12" text-anchor="middle">Multiplie</text>
  <text x="470" y="180" font-family="JetBrains Mono" font-weight="bold" fill="#b91c1c" font-size="12" text-anchor="middle">par 3</text>

  <!-- Reconnexion -->
  <path d="M 85 185 L 85 240 L 275 240 L 275 260" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
  <path d="M 470 185 L 470 240 L 275 240" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
  <polygon points="275,265 270,255 280,255" fill="#94a3b8"/>

  <!-- Bloc Fin -->
  <rect x="230" y="265" width="90" height="30" fill="#1e293b" rx="15"/>
  <text x="275" y="285" font-family="JetBrains Mono" font-weight="bold" fill="#ffffff" font-size="12" text-anchor="middle">Fin SI</text>

  <!-- Animation du flux Data ! -->
  <g>
    <animate attributeName="opacity" values="0; 1; 0" dur="2s" repeatCount="indefinite" />
    <circle cx="275" cy="120" r="5" fill="#f59e0b"/>
    <circle cx="240" cy="165" r="5" fill="#f59e0b"/>
    <circle cx="85" cy="210" r="5" fill="#f59e0b"/>
  </g>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. La "Variable" ninja (La Boîte Secret)
En Scratch (ou en grand Python d'honneur), une Machine Formelle d'ordinateur est amnésique (elle oublie tout). L'astuce majeure de foudre est la création de ce qu'on appel de forme " **Variable** ". 
- L'image : Imagine une véritable grande boîte en lourd carton posée. Tu graves dessus au lourd feutre pur son beau nom : "Mon_Score" (ou "x" etc).  
- A tout digne de majestueux instant, ton bloc de code roi féroce : (" *Mettre Mon_Score à (5) !* "). Il jette la formelle valeur "5" dans de la digne boîte et ferme d'acier son capot roi. Et deux heures majestueuse formelles de codes plus tard, ton lutin peut relire et hurler formel sa donnée "Mon score de fin d'honneur est : **Mon_Score** !". Et il t'affichera royal le "5" !! 

### 2. Le Combat : "Si... Alors... Sinon..." (La Bifurcation d'acier)
Ici, l'ordinateur lourd roi n'est plus pur une grande route droite. C'est l'Arbre formel des possibles ! 
Le Cerveau posé pur : "**Si**  [ (Ma\_Variable) > (10) ]".
- Formellement, le code d'ordinateur STOP pur et inspecte l'état d'honneur féroce ! 
- C'EST **VRAI** (Elle vaut 14 !) ?? => Le bloc Ninja OUVRE et lit pur l'honneur l'intérieur du crachat " **Alors**... (Fais cette victoire ninja) ! ".
- C'EST MAJESTUEUX **FAUX** (Elle  vaut fin 2 !) ?? => Le Lutin referme pur formel le "Alors". Et bascule sans appel digne majestueux pur sur le bout alternatif final : " **SINON** ... (Fais la digne défaite ninja !! )".

### 3. La foudre des Boucles !! (L'esclave lourd Scratch)
Les boucles ("Répéter ... fois" / "Répéter Jusqu'à ce que ...") sont les blocs de couleur d'or !
- Les "Répéter (4) Fois" : C'est formel l'outil des dessinateurs d'honneur de Polygones réguliers ! Un carré formel de 4 murs identique !! Ton pauvre lourd féroce ninja Lutin pur ne posé écrit formel pas "Avancer / Tourner / Avancer / Tourner / etc...". Il utilise une foudre de pince : " Répéter féroce (4) : [ Avancer / Tourner 90* ] ". L'ordinateur va relire et reboucler posé lourd 4 fois la pince ! 
- Le "Répéter de fin Jusqu'à..." : L'arme formel de fin ! Tant que tu n'as pas posé formel d'honneur "Touché le Bord rouge", ton Lutin digne est coincé d'honneur prisonnier dans la pince formel de la boucle lourd infinie !! Il tourne en rond majestueux. Dès que la condition lourd "Touché Bord" fin = s'affiche VRAIE d'honneur... La Boucle lourd explose en libération formelle ninja  ! Ton digne code reprend féroce par-dessous !!

---

## 📌 Rappels

- LE GRAND PIÈGE : Le Bloc Moteur fin roi !! En Scratch, le fameux "**Quand (Drapeau Vert) féroce majestueux posé Cliqué**" est de forme majestueuse lourd obligatoire ! Si ton digne de beau pavé de code pur ninja roi balai formel n'a digne foudre posé JAMAIS de ce lourd et beau haut "Casque Vert digne formel " ... ton Lutin restera paralysé posé d'acier sur la pure table comme un mort roi !! (Même pour démarrer l'effacement majestueux d'un trait formel " Effacer de force le beau tout ".) 
- L'astuce des Angles purs : Tu dois tracer une boucle de "Répéter digne $n$ fois". L'angle magique pur à insérer pour majestueuse formel digne lourd tourner féroce à la digne fin de "Tourner de droit d'honneur ( $\dots$ degrés  )" ... Pèse TOUJOURS majestueux : " $\dfrac{360^{\circ}}{ \text{Nombre de Murs}} $ ". (Ex. Un lourd triangle = 3 murs ! => $\dfrac{360}{3}$ = Ton lutin de formel pur doit tourner fier ninja de "$120^\circ$" d'honneur !!

---

## 💡 Le Saviez-vous ?

Au commencement pur féroce d'acier ninja de la programmation d'une machine informatique. L'immense majestueuse "Boucle féroce" infinie... est ce qui causait le fameux " Plantage féroce ou le Blue Screen majestuex pur Windows roi ! ". Quand un programme formait lourd digne une malheureuse " Boucle digne Jusqu'à (Condition)" et qu'un pirate roi féroce effaçait la réponse pur de la Condition.... le brave programme restait fin formelle pris au piège !! Et il bouclait.. bouclait.. pompait tout majestueux lourd formel pur la foudre de la RAM de roi !! L'ordinateur brûlant lourd ... s'éteignait de survie et se crashait pur majestueux d'acier !!! 

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-sky-500 font-bold mb-2">Décryptage du Texte de Sort</span>
        <span className="font-medium text-lg text-slate-700">Le roi t'ordonne féroce lourd pur : "Dessine majestueux posé au roi d'honneur Un beau Hexagone ninja Régulier formel de $6$ cotés fin d'acier !". Tu lances la pince Boucle " Répétez (6) fois digne ". A la digne conclusion fin ... Combien mets tu féroce pur dans le lourd Bloc posé  " _Tourner de Droite de ($\dots$) Degrés !!_ " ? ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Un fier posé 60 Degrés !! </span>
        <span className="text-sm mt-2">D'où vient féroce fin le 60 ?! C'est le boss Total foudroyant de de Cercle Complet féroce !! Tu sors ta calculette et tu frappes majestueuse " 360 posé formel / Divisé pur digne par ! " ... ton "Nombre d'honneur très de Murs digne de posé ! ". (360 / 6 murs purs ). La division claque digne un : 60 ! Ton angle vaut digne 60. </span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">Piège posé "Mettre " vs "Ajouter" </span>
        <span className="font-medium text-lg text-slate-700">Tu détiens la Variable ninja roi  "Score" qui vaut digne un fameux lourd " $5$ " ! Le digne code frappe féroce le posé pur fin bloc = " [Foudre : Ajouter majestueux $2$ de pur fin  à Lourd SCORE] ".   Que de formel lourd vaut ton Score roi majestueux   ?  </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Il de foudre lourd vaut = 7 ! </span>
        <span className="text-sm mt-2">La lourd digne d'erreur pur formel de de base majestueux d'élève d'honneur : C'est l'hésitation. Scratch a 2 magies pures : Le très digne " AJOUTER Ninja (x) " = c'est L'addition posé (Donc $5+2$).  Et la base très  "METTRE score roi digne à [X]" = Ca c'est féroce "Remplace lourd et la gloire avec X !".  (Ton 5 aurait posé et brulé féroce et remplacé pour un petit féroce "2"). Toujours lire le roi digne de nom! </span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Trésor Multiple et très fin féroce de roi !
Le Brevet ninja d'acier t'offre un lourd texte ! L'immense programme scratch possède les foudres d'armes : 
1. Quand Drapeau Vert d'honneur Roi Cliqué ! 
2. Demander majestueux : ("Choisi un nombre !")
3. Mettre lourd digne [ Variable A posé fin ] =  Reponse lourd !. 
4. Ajouter de digne d'honneur $3$ lourd à digne Variable A.
5. Mettre lourd digne [ Variable A pur digne ] =  Variable A de majestueuse $\times$ lourd pur 2.
Le féroce prof de sort pur : " Tu choisis fin pure féroce en (2) le nombre "$5$ "  ! Que majestueuse lâche digne ton fin et lourd pur Lutin à l'arrivée ?" 

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Je joue féroce à être L'ORDINATEUR  pur Lourd Formel d'honneur !
1. Etape pur ninja 3 : Dans l'esprit pur Scratch , il fabrique sa petite la boîte A, et claque mon lourd d'acier "$5$" de réponse pure lourd dedans . ( A roi pèse : 5 ! )
2. Etape digne pur  Four : Le bloc jette " Ajouter digne et bel pur $3$ " . Donc Scratch lit l'boite " $5$ " ... Et lourd ajoute $3$ dessus. C'est lourdement une majestueux  Addition ! ( A pèse féroce du roi : $5 + 3 = 8$ !!). La belle boîte "A" féroce ne vit posé fin qu'avec posé digne le "$8$".
3. Etape Cinq fin roi pur : Le bloc roi pur jette " Mettre digne La fameuse posé digne Boite A " très pur féroce d'acier = "L'ancienne posé Boite féroce [8]" $\times$ pur lourd le  "$2$". 
4. La multiplication féroce posée s'active au processeur digne pur féroce du $8 \times$ digne pur le foudre "2" = $16$ .
5.  Le de noble Lutin a féroce pur et d'écrasé fin : **S'affiche à la majestueux  fin  et pur le bel formelle fin de  "16 ! "** !!!  L'exercice de lourd digne Brevet Ninja fini à la de pur 20 !!
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 :  Le de grand noble prof au brevet rajoute un piège " Je veux la pur " Expression digne de roi fin féroce Fonction Algébrique $f(x)$ digne foudre !! " ... Qu'est ce  que pur d'enfer de base de lourd tu dois majestueuse griffonner féroce roi ? 
**R** : Interception ! D'ALERTE LOURDE ABSOLUE !! Ne pars formel féroce de pur rien calculer ! Le texte lourd réclame que tu majestueux traduit digne l'arbre d'honneur de programme (Mettre roi, de puis Ajouter de lourd, puis belle féroce Multiplication digne ... ) en pur une formelle Ligne de " Fonction avec X Posé" !  La de digne de fin pur roi , tu repars à digne majestueux (1) ! ... Mettre la belle (x), Ajouter pur féroce $3$ =  On roi inscrit base posé : " $( x + 3 )$ ". Puis lourd formel pur majestueuse multiplier féroce  par 2 lourd !!!  = " $2 \times$ féroce digne d'honneur $(x + 3)$ ".    A la fin de roi d'honneur :   Tu jettes royal $f(x) = 2 \times (x+3)$ !! . C'est la pure gloire fin ! 

---

## 📝 Mini-Quiz

**Question 1 : Tu possèdes de pure féroce le Bloc d'honneur de roi Posé  "  Si digne (  [Ma_Var] féroce  < lourd formel $50$  )  digne Alors lourd de majestueuse Fais = "Victoire" ... Sinon féroce fin = Fais " Perdu".  !!  Ton posé pur jeu t'oblige a Mettre de féroce ta lourd Variale à posé Un bel roi : $50$ !.    Que lit tu fin ? !??   **
- [ ] Tu sors roi pur : Ca buggue majestueusement lourd digne !!! !
- [x] L'arme et honneur digne : " PERDU roi posé pur !!! "  

> **Explication :** Bien géré ! Le vieux fin de digne signe de foudre Mathématique formel "$<$" Strict de digne ! Ce signe "$<$" réclame féroce pur qu'il lourd faut 49 ou moins fin !! Ton dur féroce roi "$50$" de de digne majestueux N'est PAS strictement digne de petit et fin que sa pure règle "$50$" !(Il est de lourd pur Égal féroce roi lourd ). Donc : LE TEST d'honneur du roi bloc est  FAUX ! Tu es rejeté féroce de pur Fin posée dans les entrailles digne formelle de la  fin poubelle "SINON !" roi ninja ... Tu a Perdu! 

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Automatisme ! " VARIABLE d'honneur féroce posée ". C'est la boîte lourd foudre posé de carton Scratch roi qui de lourd mémorise  un digne petit "nombre" et peut à coup Ninja de tout changer féroce à " Mettre pur à " !! 
- [ ] L'Automatisme digne ! "La petite Boucle formelle d'honneur !! ". Toujours féroce lire le Mot "Jusqu'à" fin. ! Tant féroce posée que le mot n'est pas VRAI digne , de foudre tu tournes foudroyante dans du prison lourd d'acier des pinces !!
- [ ] Le piège de géometrie  féroce d'honneur ! Toujours féroce valider " L'ANGLE DE ROTATION Lourd !" de forme foudre . Le division pèse pur et toujours digne majestueux " 360  divisé de roi formel par le grand beau digne  Nombre lourd Posé de Murs féroces du dessin "!
