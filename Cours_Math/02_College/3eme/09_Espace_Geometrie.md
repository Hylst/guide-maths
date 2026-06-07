---
title: 'Chapitre 9 : Géométrie dans l''Espace et Volumes'
level: College
subLevel: 3eme
order: 9
---
# Chapitre 9 : Géométrie dans l'Espace (Volumes, Sections et Agrandissements)

**Niveau** : 3ème (Cycle 4)  
**Prérequis** : L'aire du disque et du rectangle, la maîtrise pure du Théorème de Pythagore pour calculer une diagonale cachée.  
**Objectifs** : 
- Calculer le formel Volume des grands solides (Cônes, Pyramides, Boules).
- Maîtriser le couperet ninja d'une " Section de Plan ".
- Appliquer l'Agrandissement et la féroce Réduction de Volumes (Le cube "k").

---

## 📖 Introduction Pédagogique : Le Forgeron de la 3D !

Bienvenue dans le grand monde lourd des 3 Dimensions !! Fini de griffonner des petits triangles plats et des ronds tristes écrasés sur une feuille de papier formelle 2D ! L'univers de force ninja est en Relief.

Tu vas devenir l'architecte majestueux des Pyramides d'Égypte (qui piquent en un Sommet) et le modeleur féroce formel des grandes Boules de cristal d'acier (Sphères). Tu vas devoir pur calculer l'intérieur d'un objet (Le formel Volume de la cuve d'eau roi) ou frapper formellement l'objet à l'épée lourd " Plan de coupe " pour découvrir ce qu'il cache dans ses entrailles !! Prépare toi à "K-Cuber" l'espace d'honneur !! 

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : L'Épée Tranchante (La Section d'une Sphère)

Imagine une orange ninja (Une Sphère) majestueuse. Le grand coup de l'épée formelle vient la foudroyer à plat ! Quelle est la trace rouge tranchée "Vue de dessus" lourd formel ?

<div align="center">
<svg width="550" height="280" viewBox="0 0 550 280" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="510" height="40" fill="#f8fafc" rx="8" />
  <text x="275" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">La Section Ninja : Plan tranchant dans la Boule</text>

  <!-- La Sphère base majestueuse -->
  <circle cx="150" cy="160" r="80" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <ellipse cx="150" cy="160" rx="80" ry="30" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,5"/>
  <circle cx="150" cy="160" r="3" fill="#1e3a8a"/>
  <text x="140" y="175" font-family="JetBrains Mono" font-weight="bold" fill="#1e3a8a" font-size="12" text-anchor="middle">O</text>

  <!-- Le Plan de coupe qui frappe ! -->
  <g>
    <animate attributeName="opacity" values="0.7; 1; 0.7" dur="2s" repeatCount="indefinite" />
    <polygon points="40,110 220,110 260,130 80,130" fill="#fca5a5" opacity="0.6"/>
  </g>

  <!-- L'ovale de coupe de fer sur la sphere -->
  <ellipse cx="150" cy="120" rx="69" ry="18" fill="#ef4444" stroke="#b91c1c" stroke-width="3" opacity="0.9"/>
  <!-- Point H de vue -->
  <circle cx="150" cy="120" r="3" fill="#ffffff" />
  <text x="140" y="115" font-family="JetBrains Mono" font-weight="bold" fill="#ffffff" font-size="12" text-anchor="middle">H</text>
  
  <line x1="150" y1="120" x2="150" y2="160" stroke="#1e293b" stroke-width="2" stroke-dasharray="3,3" />

  <!-- Flèche Vue de dessus (L'Oeil Ninja) -->
  <path d="M 230 140 Q 300 130 350 160" fill="none" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
  <polygon points="350,160 340,160 345,150" fill="#475569"/>
  <text x="290" y="125" font-family="JetBrains Mono" font-weight="bold" fill="#475569" font-size="12" text-anchor="middle">Vue de Face (La coupe)</text>

  <!-- Le grand Disque résultat lourd de roi -->
  <circle cx="430" cy="160" r="50" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
  <circle cx="430" cy="160" r="3" fill="#ffffff" />
  <line x1="430" y1="160" x2="480" y2="160" stroke="#ffffff" stroke-width="3" stroke-dasharray="4,4"/>
  <text x="455" y="150" font-family="JetBrains Mono" font-weight="bold" fill="#ffffff" font-size="12" text-anchor="middle">r²</text>
  <text x="430" y="240" font-family="JetBrains Mono" font-weight="bold" fill="#b91c1c" font-size="16" text-anchor="middle">UN BEAU DISQUE !</text>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. La foudre des Volumes d'acier (Les 3 familles ! )
Ton cerveau doit classer les monstres d'acier en 3 familles pour leur formelle formule de Volume !
- **Les Droits (Prisme, Cylindre, Pavé !)** : Eux, ils ne piquent pas au sommet ! Formule or : " L'AIRE DE LA BASE $\times$ HAUTEUR ". (Ex: Un beau cylindre = Un Disque $\times$ Hauteur = $\pi \times R^2 \times h$).
- **Les Pointus Ninja (Pyramides, Cônes) !** : Ils frappent avec un sommet roi digne ! L'espace formelle s'écrase en haut. Donc, tu fais la digne formule d'au-dessus, ET TU COUPES AU TIER ! (**Divisé par 3 !**). Formule majestueuse : " $(\text{Aire de Base} \times \text{Hauteur}) \div 3$ ".
- **L'Inclassable de cristal (La Boule / Sphère)** : Elle n'a digne base ni Hauteur ni socle de Base !! Elle réclame sa pure formule Barbaque à apprendre féroce par digne coeur ! (**$\dfrac{4}{3} \times \pi \times R^3$**). L'éternel "$4/3$" et le Rayon au cube lourd !

### 2. Le Coup tranchant de la Section formelle 
Le digne vieux prof te dit formel : "Je base coupe digne mon cube  roi Parallèle d'honneur à la base fin !!!". Quelles sont les traces lourd et de fer de sang l'épée !? 
- Une Boule Ninja coupée... La coupe forme féroce TOUJOURS : Un digne et pur **DISQUE** ! 
- Un Cône ou Cylindre majestueux d'acier coupé parallèle... forme un formel et lourd mini **CERCLE / DISQUE** !
- Un Pavé digne droit coupé en ligne parallèle à la base formelle... crache fin pur lourd un très fier **RECTANGLE** !! (Identique forme à roi digne la face du base !).
- Si tu coupes un digne Cône formelle PARALLÈLE a de base sa base d'honneur : Le haut qui tombe posé digne purement lourd  ... EST UN MINI-CÔNE d'acier Féroce (Et le gros bas est un digne de lourd " Tronc " !!).

### 3. L'Agrandissement des rois : La magie du "$K^3$" !
On te digne confie un Cône formelle lourd de 5 Litres !! . Et on le féroce majestueux " Multiplie d'honneur la taille " par posé $k = 2$ ! (Il devient pur posé de 2 fois plus de grand en digne pure longueur !!). 
Combien lourd formel foudre de litres féroces fait le digne beau Cône Géant de roi !! ? "$10$ Litres"?? NON FATAL ! CRASH ABSOLU !
- Les Lignes d'acier et pur (Périmètre etc) = Multipliées pur majestueux par : **$k$**.
- L'Aire (La peinture lourd de surface pure) = Multipliée foudroyante digne base et pure l'honneur par : **$k^2$** ! (ex: $\times 4$). 
- **LE VOLUME ninja digne (L'EAU posée !! )** = MULTIPLIÉ MAJESTUEUSEMENT PAR LE ROI : **$k^3$** !! ( Le coefficient de géant digne lourd d'acier AU CUBE !!!). " $2^3$ = $2 \times 2 \times 2 = 8$!". Donc le volume crache "$5 \text{ Litres} \times 8 = 40$ Litres !!! ". L'eau a lourd formel explosé féroce d'acier !

---

## 📌 Rappels

- LE GRAND PIÈGE ! Le théorème roi de THALÈS lourd !!! Il traine en pure majestueuse féroce infiltration dans le cône de sable lourd ninja !! . Quand tu de formel pur digne coupes de foudre un Cône au digne tiers roi ninja !!... Le Dessin pur Plat de Coupe digne te forge pur formelle un digne " Triangle Emboité !! ". ( Le Rayon haut ninja et de roi Rayon bas d'honneur ... Les Hautes de digne "Hauteurs féroce"). Ton seul roi digne bouclier de force magique formelle c'est pur lourd le petit rapport digne "$ \dfrac{Petit}{Grand} $" !!. (Ex : $\dfrac{r_{petit}}{R_{grand}} = \dfrac{h_{petite}}{H_{grande}}$ !!). Le pur formel "k" de réduction digne !!
- L'astuce des Lettres !! Ne JAMAIS Digne Lourd confondre roi Sphère et de digne force Boule !! La digne formelle Sphère, c'est lourd le Plastique vide fin (Une Balle posé lourd !! On lui calcule pur majestueux son : AIRE). La lourd forme Boule.. C'est le caillou lourd de pétanque Plein pur ninja (On calcule digne lourd formel digne et pur son lourd : VOLUME d'eau !).

---

## 💡 Le Saviez-vous ?

Les planètes (comme la belle digne de Terre féroce) ne sont posé digne purement féroce de roi pas lourd d'honneur de majestueuses et fermes Sphères PARFAITES !! A cause lourd ninja et pur de forme magique pure l'honneur de leur  vraie vitesse de digne et d'acier formel " Rotation lourd centrifugée fin ", les purs pôles formel digne (Haut-Bas roi) s'écrasent pur lourd de digne formel légèrement féroce majestuex ! La Terre est pur de majestueux forme un digne " Éllipsoïde Oblat base " lourd. La Formule pur digne du $4/3 \pi R^3$ donne digne de pure alors qu'un pur d'honneur "Résultat digne de foudre formel Approché !" 

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-sky-500 font-bold mb-2">Décryptage du Texte de Sort</span>
        <span className="font-medium text-lg text-slate-700">Le vieux de digne noble roi m'impose base ! : J'ai la belle Pyramide lourd d'acier digne " $Base = 10 \text{ cm}^2$ " et de " $Hauteur = 6 \text{ cm}$" !! Quel digne posé majestueux de gros pur de fin volume formel de majestueux contient de force t-elle digne lourd  ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">L'or  V = 20 cm³</span>
        <span className="text-sm mt-2">D'où vient posé lourd de roi pur ce "$20$" !? C'est la de digne d'honneur majestueuse reine formule de lourd foudre posée ninja " L'objet digne qui formel Pique posé en Sommet pur !! ". Tu de formelle digne pur dois faire la grande Air multipliée pur de formel la Hauteur digne ninja lourd formel !! ($10 \times 6 = 60$). ET DE MAJESTUEUSE FORCE FATALE ET LOI LOURDE DIVISER PAR LE TROIS ! ($60 / 3 = 20 !$). N'oublie digne jamais le de Fer "/3".</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">La Lame du Cylindre ! </span>
        <span className="font-medium text-lg text-slate-700">Le boss de digne d'honneur roi crie ! " Tu coupes le de cylindre de belle d'honneur de roi digne formel " Paralellement de base et fier à de pur Son axe lourd (A la de pure féroce forme VERTICALE Ninja pur !!!!! ). Ta lourd belle l'honneur tranche forme posée quelle trace de pur lourd sang !? </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Un MAJESTUEUX RECTANGLE ! </span>
        <span className="text-sm mt-2">Ah !! Pour la de digne gloire de base formelle digne !!! Il faut lourd pouvoir fermer posé ninja de forme pure l'honneur digne tes très pur d'acier formelle yeux lourd féroce !! Quand de posé formel la lame digne tape lourd sur base formelle et tranche digne la bouteille lourd en formelle féroce base " Ligne de de foudre Droite fin de la digne bouteille roi verticale pur " !! Le de lourd l'honneur formelle panneau tranché digne de verre lourd sera un sublime RECTANGLE d'HONNEUR lourd .</span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Trésor Multiple et très fin féroce de roi !
Le Brevet d'honneur posé digne pure féroce lourd roi te balance un majestuex formelle fin digne lourd d'acier " Cône de digne forme pure Foudre de Verre fin Lourd "  ! Il contient "$ 500 \text{ cm}^3 $" . 
Un mini de pur lourd ninja Cône très digne posé féroce d'acier réduit roi  a formel lourd digne posé base un " Rayon de Base " qui a pur digne formelle été " DIVISÉ digne lourd de majestueuse PAR $3$ " ! . 
Le formelle de posé majestuex roi digne lourd de digne prof féroce d'acier demande lourd fin : " De digne pure et formel roi l'honneur combien pèse lourd  le petit posé digne Cône réduit roi de lourd formelle foudre ninja ?? " 

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Je joue un de digne pur ninja roi de l'Espace "Le de K-Tube pur d'acier" !
1. Etape un ninja formelle : J'isole digne formel l'échelle de foudre majestueuse de " REDUCTION de digne roi " !! Le rayon est divisé de base formelle d'honneur pur féroce Lourd lourd et fin par de $3$. Mon noble coefficient digne posé d'acier " $\mathbf{k}$ " VAUT DONC POSÉ : " **$\dfrac{1}{3}$** ". 
2. Etape  Deux fin de  : Je déclenche formelle majestueux et pure le digne bouclier du Volumen féroce de base. Si mon coefficient est "$k$", le Volume d'eau digne est digne muté de " $k^3$ " !!! (Le facteur digne lourd formel pur de K de forme majestueux pur foudre d'honneur posé Au CUBE). 
3. Etape Trois d'acier pur : Je d'honneur magnifique lourd de pur féroce d'acier monte féroce mon cube lourd  !! " $(\dfrac{1}{3})^3$ " . C'est lourd : " $\dfrac{1}{3} \times \dfrac{1}{3} \times \dfrac{1}{3}$ " . Soit pur digne formelle de " **$\dfrac{1}{27}$** ".
4. LA FRAPPE FATALE Ninja : Pour lourd digne calculer pur le Volumen fin Réduit. Je de majestueuse force multiplie le Volume lourd de posé digne Géant par ma petite lourd et de féroce reine de pure faction de digne formel ninja d'acier fin magique de Volume pur ! " $ 500 \times \dfrac{1}{27}$ " !! 
5.  Verdict formel de foudre : Calculatrice pur ! Le le lourd le digne noble Volume $V'$ est de $18,51 \text{ cm}^3$ digne d'honneur !!!. Le féroce brevet est lourd l'honneur écrasé.
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 :  Le de grand noble prof au Brevet me digne lourd balance de faire lourd " L'Aire de Base digne " d'acier et de digne forme pure d'honneur un majestic Cylindre ninja très roi... MAIS ne pur formelle fin me digne lourd crache pas d'honneur sa de très majestueuse foudre belle roi lourd formelle DIAMETRE !!!! Il de foudre me digne base file posée le " Périmètre de cercle féroce " !!!!!! Que fais je digne ? 
**R** : Interception ferme roi Ninja !! ALERTE SURVIE !! Le cercle roi c'est digne la foudre !!  La belle Aire (" $La \ Surface $") c'est : " $\pi \times R \times R$ "!! 
Le grand de majestueux Périmètre (Le beau digne Contours roi fil !) c'est " $ 2 \times \pi \times R $ " !!! Si de digne formelle lourd l'exercice ninja donne le contour "$15$". Tu poses pur fièrement l'equa de survie digne "$ 15 = 2 \times \pi \times R $". Tu de digne formel ninja divise ton posé "$15$ " par de pur " $2 \times \pi$ " lourd de base et posé a la lourd majestueuse formelle Calculette.. Et de force pure digne tu d'honneur foudres et d'acier le fameux RAYON (R).!! Après, de majestueux roi digne pur formelle et de foudre lourd.. tu repars sur de base roi formelle  $\pi \times R^2$ pour l'aire majestueux de base pour féroce finaliser l'exo digne !!!

---

## 📝 Mini-Quiz

**Question 1 : T'attaques féroce l'engin de guerre Cône digne formel pur. Tu tranches "Parallèle Digne à l'Axe de forme pur (la verticale) ".  Que formel posé de dessines tu digne de posée de fin lourd d'honneur !??   **
- [ ] Tu sors roi pur : Un beau digne et noble CERCLE !! !
- [x] L'arme et honneur digne : Un très digne formel et noble **TRIANGLE isocèle** lourd  (ou posé digne un lourd très pur " Hyperbole ninja " de de lourd fin d'honneur selon digne !! ) !! 

> **Explication :** Bien géré !!!! Le vieux fin et dur mot ! Les sections de cône sont piège !! Si tu tranches PARALLELE a LA BASE (le Sol d'honneur), oui c'est un ptit Cercle !! MAIS SI tu digne l'éclates digne formelle pur par la Verticale !! (Haut roi posé en féroce pur Bas !). Ton bel lame crache un TRIANGLE féroce Isocèle posé digne !! Et si c'est de majestueuse lame baisé lourd pur (Diagonale !!) , c'est le posé digne d'honneur fameux trait digne " Ellipse féroce roi ninja ". (L'oeuf !). 

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Automatisme ! Les digne lourd 3 Familles roi d'acier de Volumes l'honneur !. Le Droit de digne lourd formelle (Aire $\times$ H ), Le  Pointus majestueuse (Divisé force par $\mathbf{3}$ !), et  la magique Boule pure formelle ($4/3$ roi). 
- [ ] L'Automatisme digne ! "Je K-Cube fin !! ". Pour de digne lourd forme de majestueuse formelle digne foudre posé d'acier grandir formelle pur et posé un digne lourd  d'enfer ou réduire un Volume féroce ninja... On ne formel digne pur de roi multiplie JAMAIS juste en digne de " $k$ "! On foudre roi majestueux AU CUBE !
- [ ] Le formelle Piège féroce Sections !! Ferme tes pur de digne yeux d'honneur majestueux foudre posé d'acier l'honneur lourd et visualise l'épée lourd de pur fin ninja qui formelle digne foudroie digne !!! 
