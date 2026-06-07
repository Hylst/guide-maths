---
title: 'Chapitre 7 : Le Calcul Littéral et les Équations'
level: College
subLevel: 3eme
order: 7
---
# Chapitre 7 : Le Calcul Littéral et les Équations (Développement, Factorisation et Identités Remarquables)

**Niveau** : 3ème (Cycle 4)  
**Prérequis** : La simple distributivité simple ("le petit bateau"), et la maîtrise absolue de la règle des signes (les fameux : $- \times - = +$).  
**Objectifs** : 
- Maîtriser le grand sort de la "Double Distributivité" (Le tir croisé !).
- Connaître et dégainer les 3 "Identités Remarquables" mortelles.
- Apprendre la "Factorisation" (remettre en sac).
- Savoir résoudre des équations produit-nul " $(...)(...) = 0$ ".

---

## 📖 Introduction Pédagogique : L'Art Martial des Lettres Inconnues !

Toute ton enfance tu as joué avec de très sages nombres qui restaient tranquilles ($2+3 = 5$). Mais en rentrant dans l'antre du collège, tu as découvert qu'un gang de lettres mystérieuses ("les $x$", "les $y$") avait envahi l'univers des calculs. Elles se cachent, se multiplient, se cachent sous des carrés ($x^2$) !

Le Calcul Littéral n'est rien d'autre qu'un art martial de ninja ! Tu dois te battre avec des "blocs" et des "parenthèses" d'acier, sans jamais connaître la valeur de ce "x". Ton seul but de guerrier est de simplifier l'équation majestueuse, de l'écraser, de "développer" ou de "factoriser" pour forcer le traître "$x$" à avouer sa véritable valeur au grand jour !! Prépare tes armes "Identités Remarquables" pour le duel !

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : Le Tir Ninja de Double Distributivité

La règle du jeu pur d'honneur est simple : Tout ce qui est dans le premier château doit tirer une flèche sur tout ce qui bouge dans le 2ème château ! Le combat : $(a + b)(c + d)$.

<div align="center">
<svg width="550" height="280" viewBox="0 0 550 280" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="510" height="40" fill="#f8fafc" rx="8" />
  <text x="275" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">La Double Distributivité : Le Tir Croisé !</text>

  <!-- L'Equation Centrale formelle digne -->
  <text x="140" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="28">(</text>
  
  <text x="160" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#ef4444" font-size="24">a</text>
  <text x="180" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#94a3b8" font-size="24">+</text>
  <text x="200" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#3b82f6" font-size="24">b</text>

  <text x="220" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="28">)</text>
  <text x="240" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="28">(</text>
  
  <text x="260" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#f59e0b" font-size="24">c</text>
  <text x="280" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#94a3b8" font-size="24">+</text>
  <text x="300" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#10b981" font-size="24">d</text>

  <text x="320" y="140" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="28">)</text>

  <!-- Les Flèches Hautes (Les Tirs de 'a') -->
  <g>
    <animate attributeName="opacity" values="0.2; 1; 0.2" dur="2s" repeatCount="indefinite" />
    <!-- Flèche a -> c -->
    <path d="M 165 110 Q 210 60 265 110" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
    <polygon points="265,110 255,105 260,115" fill="#ef4444"/>
    <!-- Flèche a -> d -->
    <path d="M 165 110 Q 235 30 305 110" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
    <polygon points="305,110 295,105 300,115" fill="#ef4444"/>
  </g>

  <!-- Les Flèches Basses (Les Tirs de 'b') -->
  <g>
    <animate attributeName="opacity" values="0.2; 1; 0.2" dur="2s" begin="1s" repeatCount="indefinite" />
    <!-- Flèche b -> c -->
    <path d="M 205 150 Q 235 190 265 150" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
    <polygon points="265,150 255,155 260,145" fill="#3b82f6"/>
    <!-- Flèche b -> d -->
    <path d="M 205 150 Q 255 210 305 150" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
    <polygon points="305,150 295,155 300,145" fill="#3b82f6"/>
  </g>

  <!-- La grande sentence résultat d'étalage au sol -->
  <rect x="80" y="240" width="390" height="40" fill="#fef2f2" stroke="#fca5a5" stroke-width="2" rx="4"/>
  <text x="275" y="267" font-family="JetBrains Mono" font-weight="bold" fill="#b91c1c" font-size="20" text-anchor="middle">= ac + ad + bc + bd</text>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. DÉVELOPPER : La destruction féroce des Parenthèses !
"Développer", c'est briser foudroyante les sacs de prisons de parenthèses pour étaler majestueusement tous les bouts au sol en une looooongue belle ligne d'addition féroce ! 
- Tu utilises la **Double Distributivité**. 
- Exemple de combat : $(x + 3)(x - 2)$. 
Tu tires la flèche du premier "$x$" sur l'autre sac ! : "$x \times x$" !! Et le roi "$x \times (-2)$" !. 
Ensuite, tu lances la magie ninja du deuxième sbire du premier sac (le $+3$) et on tire à balle féroce !! => "$+3 \times x$" et "$3 \times -2$".
- Tu ramasses formel tout sang au sol =  $x^2 - 2x + 3x - 6$.
- LA PHASE **RÉDUIRE** ! Tu ranges ta chambre du chaos d'honneur : Tous les $x^2$ dans la posée panier $x^2$, les $x$ entre eux et les nombres entiers seuls en bloc isolés fin . => Verdict roi gagnant formel : **$x^2 + x - 6$** ! 

### 2. Le Brelan Magique : Les Identités d'Armes Remarquables !!
Certains châteaux "Sacs de parenthèses de carré " sont de la famille royale des Mathématiques... si tu appliques majestueusement ma règle de la Double Distrib féroce dessus, tu perds une lourd belle minute !! Les rois ninja du calcul utilisent ces Raccourcis Remarquables pour dégainer le résultat fini instanné pur à l'honneur " par coeur majestueux " !
- **Arme d'or 1 digne** : $(a + b)^2$ =  De pure foudre il crache :  $a^2 + 2ab + b^2$ !
- **Arme Ninja 2 lourd** : $(a - b)^2$ = De lourd digne d'honneur posé il sort :  $a^2 - 2ab + b^2$ !  (Attention au digne féroce premier $-2ab$).
- **L'Épée à lame Foudre (La Troisième pure) !!** : $(a+b)(a-b)$. Un pur jumeaux lourd avec un petit "moins traitre !" = Elle foudroie posée tout le très beau central et crache formel : **$a^2 - b^2$** ! C'est la de plus majestueuse belle beauté reine.

### 3. FACTORISER : L'art inverse Ninja ! Mettre en de fer Sac ! 
Factoriser de base digne c'est pur L'OPÉRATION de lourd formel Total digne INVERSE d'un Développement roi ! On te donne de loin le grand carnage au sol, et le prof crie formellement de base et pur d'honneur "Range tout majestueusement ça pur digne dans DEUX PETITS SACS PARENTHÈSES purs accrochés de beau "!!
- Le graal ninja : La Recherche du " **FACTEUR digne roi COMMUN fin** " (L'espion jumeau formel).
- Combat roi : $3x + 12$.  Que cache de ninja ce grand $12$ féroce sous de son digne masque ? " $3 \times 4$ digne formelle !". 
- L'équation montre roi formel son vrai grand jour ninja posé !  " $\mathbf{3} \times x \ + \ \mathbf{3} \times 4$  ". Je traque l'honneur mon pur de Jumeaux de base espion !! " C'est le roi et digne \mathbf{3} !! ". 
- Mettre au gros de poing le Sac lourd foudre posé : Le jumeau formelle passe majestueux DEVANT la posée parenthèse. Et tous de fin d'honneur restes s'enferment posé ! :  Verdict roi : **$3 ( x + 4)$** !! 

---

## 📌 Rappels

- LE GRAND PIÈGE FATAL ! Quand deux pures parenthèses se percutent digne féroce " $( \dots )( \dots )$ "... le Signe fantôme planqué très forme entre elles, posé de base, majestueux roi  : **C'est le MULTIPLIER ($\times$) !! ** 
- Attention au SIGNE " $-$ DE LA MORT " posé féroce juste et de digne forme pure Avant posé L'HONNEUR lourd  d'une Parenthèse !!  Un ninja formelle : $ - ( 3x + 5 ) $... C'est un digne posée  Virus Infectieux  roi pur de forme ! Le digne Minus "$ - $" va foudroyant de base pur contaminer CHAQUE roi digne signe de féroce LÀ Dedans en lourd formelle inversant roi  la polarité posé complète !! Le digne résultat pur de force et de crachat  sera " $-3x - 5$ ".  Tout digne beau plus d'honneur s'est digne formel inversé féroce !

---

## 💡 Le Saviez-vous ?

Avant la majestueuse Renaissance féroce et royale (autour d'honneur très pur et fin de grand roi de $16$ème foudroyant majestueux siècle formel, grâce au de digne et pur François Viète fin de foudre, un digne avocat et codeur Français), Les lourd Mathématiques féroces Pures.. ne possédaient formellement de loi d'acier... **AUCUNE LETTRE X NI PARENTHESE LOURD DE BASE** !! Les purs et grands grecs formels ou le noble et dur monde d'islam  de l'art math digne Roi de base devaient rédiger posé en de belle poésie d'une page complète formel fin " Le petit posé et noble nombre ninja caché manquant au très grand Roi de majestueux carré foudroyé féroce !..". L'utilisation du de code lettre mystère ($x$) a de pure base fait gagner des siècles d'évolution mathématique ninja pur et réduit de féroce équation d'une page d'honneur... à de simple 3 cm formel digne !

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-sky-500 font-bold mb-2">Décryptage du Texte de Sort</span>
        <span className="font-medium text-lg text-slate-700">Le vieux de digne noble roi m'impose base formelle ! : Développe en urgence de foudre roi l'énorme bloc :  **$(x + 5)^2$** !! . Qu'est ce  que pur d'acier tu lui donnes féroce majestueux ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">L'or  $x^2 + 10x + 25$</span>
        <span className="text-sm mt-2">D'où vient le "10x" ?! C'est la 1ère Identité Ninja ! $(a+b)^2 = a^2 + 2ab + b^2$. Le roi du milieu féroce c'est "2 fois le a, fois le b" !! Donc : $2 \times x \times 5 = 10x$ !!! Et le b au carré = 25. Trop d'élèves féroces écrivent " $x^2 + 25$ " et oublient le double de majestueux produit féroce formel. Crash mortel !</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">L'arme de "l'Équation Produit Nul !" </span>
        <span className="font-medium text-lg text-slate-700">Le boss de digne d'honneur roi crie ! " Résous moi belle de force digne l'énigme = "   **$(2x - 4)(x + 7) = 0$**  " !   Tu de pur lourd formel attaque féroce comment digne de d'honneur majestueux ? ? </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Un pur majestueux : x = 2 OU bien : x = -7 !! </span>
        <span className="text-sm mt-2">La lourd digne RÈGLE D'OR ! Si un de " Machin FOIS Truc lourd = ZÉRO absolu ".  Alors de force pure et féroce, L'UN DES DUO... est le ZÉRO Ninja !  Donc tu poses tes 2 mini-équations lourd : "Soit (2x - 4) explose a Zéro digne ". (donc $2x=4$, soit $x=2$). "Soit base d'honneur féroce " C'est le bloc (x+7) qui fait = Zéro " (Donc de digne $x=-7$). Ta quête trouve 2 pures Solutions féroce ! .</span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Trésor Multiple et très fin féroce de roi !
Le Brevet t'offre une sublime FACTORISATION D'ACIER posée formelle ! 
Force la porte  d'honneur pur de foudre :   **$A = (2x + 1)(x - 3) + (2x + 1)(5x + 4) $** 

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Je joue un de digne pur ninja roi à traquer formelle d'honneur le **"Facteur de base pur Commun" ! **
1. Etape un ninja formelle : J'observe l'immense bloc digne féroce de foudre. Un truc majestueux " Bloc GAUCHE  + le Bloc de forme pur digne lourd et fin DROITE ".
2. Etape  Deux fin de  : L'œil du tigre féroce formel roi digne !! Une GIGANTESQUE de fort PARENTHÈSE complète digne pure se répète à la fois à digne d'honneur GAUCHE et Droite formel féroce de grand " + " ! C'est le roi très digne Jumeaux Commun : "**$(2x + 1)$**". 
3. Etape Trois d'acier pur : Je l'arrache majestueusement pur de la forêt et je le grave **DEVANT tout au point de foudre base ** féroce majestueux !  " $(2x + 1) \dots$  " (Je me met alors un de très grand bloc crochet carré de  foudre [   ] pour ramasser posé de force digne  " les reste minables de survie fin " ! ). 
4. LA FRAPPE FATALE Ninja :  $A = (2x + 1) \ [ \ (x-3)  +  (5x+4) \ ] $.
5. Le de noble  Je "Réduis" (et je fais de la pure féroce beauté !) magique formel de ce qu'il loge à base à l'interieur pur formel majestueux fin de l'immense foudre d'honneur Crochet [ ] !!!.  "$x + 5x$" = de beau $6x$. et un lourd " $-3 + 4$ " = mon fin $+1$.
6. Victoire Formelle féroce  :  ** $A = (2x + 1)(6x + 1)$** !!! T'es le boss fin pur formelle de toute magie foudre .
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 :  Le de grand noble prof t'ajoute digne : Je te mets formelle majestueux un **$x$** en pur  facteur fin !!! Factorise pur un digne de foudre roi lourd  "$x^2 + 5x$" digne !   Comment je me lourd sors pur formel base de ce " $x$ Carre digne!"  
**R** : Interception ferme roi Ninja !! ALERTE ! Le de digne " $x^2$ " pur a digne de pur lourd foudre l'apparence posé et du digne "bloc infranchissable base digne fin ". MAIS NON de pure magique formel  !! Le très formel digne et pur " $x^2$ " de lourd digne n'est formel pure féroce QUE lourd très "  $\mathbf{x \times x}$ " !. L'équation de pure base t'explose au " $x \times x + 5 \times x $ " . Ton Facteur roi et pur de bel d'honneur digne COMMUN  base féroce c'est le posé digne pure et formel " $x$ " !  Tu le pose de force devant. :   Victoire féroce foudre d'honneur en une lourd digne féroce ligne : **$x ( x + 5)$** ! . C'est pur formelle base et beau roi magique terminé ! 

---

## 📝 Mini-Quiz

**Question 1 :  T'attaques féroce de noble L'Équation  :  $x^2 - 81 = 0$  .  Que formel posé de trouves tu digne de de fin lourd d'honneur !??   **
- [ ] Tu sors roi pur : $x = 9$ lourd et de féroce, digne point de formel Fin !!! !
- [x] L'arme et honneur digne : $x = 9$ !!    OU d'honneur féroce pur ninja :  **$x = -9$** lourd l'honneur base posé de roi !! 

> **Explication :** Bien géré !!!! Le vieux fin et dur mot ! L'équation roi de "Carré $x^2$" posé digne ! Quand le féroce $x^2 = 81$ ; Il y a TOUJOURS majestueuse 2 racines de pur féroce lourd d'honneur carré à base digne ! Le Positif digne fin de ($9 \times 9 = 81$), OUI de base formelle ! MAIS  n'oublie pure de digne majestueux forme jamais : la Règle digne fin d'honneur des purs SIGNES ninja d'acier !!!. ( $-9 \times -9$ = formellement pure et très lourd posé un FIER $+81$ !!!) . Il y a Deux base d'honneur pur formelle Solutions magiques à base  l'Exercice digne de ninja  !

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Automatisme majestueuse féroce ! Le majestueux " DÉVELOPPEMENT ninja de roi ". Le prof te somme de péter toutes de majestueuses tes digne formelle parenthèses !!! 
- [ ] L'Automatisme ! "Je FACTORISE fin !! ". Le  maître te pur somme formel de Lourd de digne formelle CRÉER pur et posé Des Parenthèses de belle fin !! Et de digne lourd d'enfermer noble formel les armes de pur ninja dedan lourd  et base digne  ! Fais roi digne apparaitre le Facteur de pur formel Espion Jumeau féroce bas et forme !
- [ ] Le piège IDENTITÉ ninja digne de majestueux foudre !!! Toujours digne féroce et pure connaitre sur le formel fin "  Le bout du de poing Ninja " :   $(a+b)(a-b) = a^2 - b^2 $  !! Si digne de forme tu la vois la noble $16x^2 - 100$ digne l'honneur . Tu dois repenser formel de base majestueux " Ah c'est du formelle a Carre - b digne CARRE posé ". Ca cache pure et se factorise du majestueux et digne formelle  "$ (4x - 10)(4x+10) $ " !!!  
