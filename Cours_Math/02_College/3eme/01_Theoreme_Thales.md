---
title: 'Chapitre 1 : Le Théorème de Thalès'
level: College
subLevel: 3eme
order: 1
---
# Chapitre 1 : Le Théorème de Thalès

**Niveau** : 3ème (Cycle 4)  
**Prérequis** : La proportionnalité, les quotients égaux et les droites parallèles.  
**Objectifs** : 
- Comprendre les deux configurations de Thalès ("emboîtée" et "papillon").
- Savoir écrire les rapports (les quotients) d'agrandissement et de réduction.
- Calculer la longueur exacte d'un côté manquant (produit en croix).
- Utiliser la Réciproque et la Contraposée pour certifier que des droites sont parallèles (ou secantes !).

---

## 📖 Introduction Pédagogique : Le secret de la grande Pyramide !

Dans l'antiquité, le pharaon voulait désespérément mesurer la hauteur écrasante et titanesque de la grande pyramide de Khéops. Tous ses architectes devenaient fous car ils ne pouvaient pas jeter un ruban au milieu du monument solide ! 

Arrive un grec malin nommé **Thalès**. Il observe simplement l'ombre incroyable que jette la pyramide brûlante sur le sable, plante son propre bâton en bois au sol et regarde son ombre à lui. Et là... foudre d'illumination : *Si les rayons du soleil frappent strictement parallèles le sol, l'ombre de la pyramide est l'ombre du bâton "en version géante et gonflée !"*. Une stricte question d’Honneur de la Proportionnalité totale ! Avec une formule magique des fractions, il donne de front au pharaon la hauteur colossale au millimètre près en piquant un lourd bâton de $1\text{m}$ base dans le dur du sable fin !! 
Prêt à manier le pouvoir de foudre de l'agrandissement parfait ?

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : L'Oeil de Thalès et le Papillon

Deux triangles stricts : Le petit, et le Grand ! Si et SEULEMENT SI le sommet est foudroyé devant 2 lignes pures parallèles... Le petit devient lourdement géant proportionnellement !

<div align="center">
<svg width="550" height="320" viewBox="0 0 550 320" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="510" height="40" fill="#f8fafc" rx="8" />
  <text x="275" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">Les Deux Configurations Magiques (Emboîtée et Papillon)</text>

  <!-- 1. Le Configuration Emboîtée (Classique) -->
  <g transform="translate(40, 100)">
    <text x="75" y="-10" font-family="Inter" font-weight="bold" fill="#64748b" font-size="12" text-anchor="middle">Forme Emboîtée (Classique)</text>
    
    <!-- Grand Triangle A B C -->
    <polygon points="75,10 0,160 150,160" fill="none" stroke="#94a3b8" stroke-width="2"/>
    
    <!-- Ligne Parallèle (Le socle du milieu) -->
    <line x1="37" y1="85" x2="112" y2="85" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Points d'arrêt et Sommets -->
    <circle cx="75" cy="10" r="4" fill="#334155"/> <!-- A / Sommet commun -->
    <circle cx="0" cy="160" r="4" fill="#334155"/> <!-- B -->
    <circle cx="150" cy="160" r="4" fill="#334155"/> <!-- C -->
    <circle cx="37" cy="85" r="4" fill="#ef4444"/> <!-- M -->
    <circle cx="112" cy="85" r="4" fill="#ef4444"/> <!-- N -->
    <line x1="0" y1="160" x2="150" y2="160" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Labels -->
    <text x="75" y="0" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">A</text>
    <text x="-15" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">B</text>
    <text x="165" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">C</text>
    <text x="20" y="85" font-family="JetBrains Mono" font-weight="bold" fill="#e11d48" font-size="14" text-anchor="middle">M</text>
    <text x="130" y="85" font-family="JetBrains Mono" font-weight="bold" fill="#e11d48" font-size="14" text-anchor="middle">N</text>

    <!-- Highlight de l'emboitement -->
    <polygon points="75,10 37,85 112,85" fill="#e0f2fe" fill-opacity="0.5"/>
  </g>

  <!-- Le Signe de l'Egalité et du Coefficient -->
  <g transform="translate(260, 160)">
      <path d="M 0 0 Q 15 -20 30 0" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,2"/>
      <polygon points="30,0 25,-8 20,-2" fill="#2563eb"/>
      <text x="15" y="-25" font-family="Inter" font-weight="bold" fill="#2563eb" font-size="12" text-anchor="middle">Même Formule</text>
  </g>

  <!-- 2. La Configuration Papillon (Croisée) -->
  <g transform="translate(350, 100)">
    <text x="75" y="-10" font-family="Inter" font-weight="bold" fill="#64748b" font-size="12" text-anchor="middle">Forme Sablier (Papillon)</text>
    
    <!-- Lignes sécantes grand X -->
    <line x1="30" y1="20" x2="120" y2="150" stroke="#94a3b8" stroke-width="2"/>
    <line x1="120" y1="20" x2="30" y2="150" stroke="#94a3b8" stroke-width="2"/>
    
    <!-- Lignes Parallèles (Haut et Bas) -->
    <line x1="30" y1="20" x2="120" y2="20" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
    <line x1="15" y1="150" x2="135" y2="150" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Points d'arrêt et Sommets -->
    <circle cx="75" cy="85" r="5" fill="#0284c7"/> <!-- A / Sommet d'intersection central ! -->
    <circle cx="30" cy="20" r="4" fill="#334155"/> <!-- M haut -->
    <circle cx="120" cy="20" r="4" fill="#334155"/> <!-- N haut -->
    <circle cx="30" cy="150" r="4" fill="#334155"/> <!-- B bas -->
    <circle cx="120" cy="150" r="4" fill="#334155"/> <!-- C bas -->
    
    <!-- Labels -->
    <text x="85" y="85" font-family="JetBrains Mono" font-weight="bold" fill="#0369a1" font-size="14" text-anchor="start">A</text>
    <text x="20" y="15" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">M</text>
    <text x="130" y="15" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">N</text>
    <text x="20" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">B</text>
    <text x="130" y="165" font-family="JetBrains Mono" font-weight="bold" fill="#1e293b" font-size="14" text-anchor="middle">C</text>

    <!-- Animation Paralélisme de la mort ! -->
    <g>
       <animate attributeName="opacity" values="0.2; 1; 0.2" dur="2s" repeatCount="indefinite" />
       <text x="75" y="15" font-family="Inter" font-weight="bold" fill="#e11d48" font-size="10" text-anchor="middle">//</text>
       <text x="75" y="145" font-family="Inter" font-weight="bold" fill="#e11d48" font-size="10" text-anchor="middle">//</text>
    </g>
  </g>

  <!-- L'Écriture sacrée de l'équation pure fraction -->
  <rect x="135" y="270" width="280" height="40" fill="#fef2f2" stroke="#fca5a5" stroke-width="2" rx="4"/>
  <text x="275" y="295" font-family="JetBrains Mono" font-weight="bold" fill="#e11d48" font-size="18" text-anchor="middle">AM / AB  =  AN / AC  =  MN / BC</text>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. La Phrase d'Honneur (La rédaction ninja obligatoire)
Au brevet pur et lourd, tu ne peux pas juste jeter la fraction comme un caillou formel et digne. Tu dois "Réciter la formule du rituel majestueux de Thalès".
- "Je sais majestueux que les féroce et purs points A,M,B et les points dignes posés A,N,C sont posés fiers **alignés** d'honneur".
- "Je sais purement (car l'énoncé foudre de l'honneur me le clame) que les Droites (MN) et (BC) sont crânement posées **Parallèles !**".
- "DONC, d'après le théorème très majuscule de **THALÈS**, les fiers rapports de longueurs stricts sont d'égalité pure : " 
- Et tu poses ton $\dfrac{Petit}{Grand}  = \dfrac{Petit}{Grand} = \dfrac{Petit}{Grand}$. ( $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$ ).

### 2. Le "Produit en Croix" ou "La Règle de 3 féroce" (L'arme d'exécution)
Une fois la gloire écrite du gros calcul posée rouge des $3$ fractions (Le squelette) : Remplis de force tous les trous par les valeurs des nombres de foudre que le professeur te donne en texte de jeu " $AM = 3\text{cm}$ etc.".
Tu auras vite à vue majestueux : Une fraction posé lourd et totalement Complète (ex: le ratio $3/9$). Et des fractions très pauvre : à trouv à trou : " $JeCherche / 6$". 
- Ne pleure pas formel fin devant le vide : Fais un produit croisé majestueux ninja !! : L'égalité : $\dfrac{3}{9} = \dfrac{Je Cherche}{6} \implies JeCherche = \dfrac{(3 \times 6)}{9}$ ! Tu multiplies en croix d'or diagonale et tu écrases foudre par le dernier nombre fin restant pur ! La calculatrice lourd de combat t'achevant de sortir le $2\text{cm}$ victorieux de frappe ! 

### 3. La Réciproque d'assassinat formelle de verdict : "C'est Parallèle ou Pas ?" 
On rentre dans le tribunal ! Le prof ne clame plus d'honneur posé vif  "c'est digne parallèle", il te demande "Prouve le roi féroce si ça l'est !".
- "D'UNE PART :" Tu calcules de ton coin secret pur le ratio du premier gros côté $\dfrac{AM}{AB}$ et tu notes son score (ex: $0,4$).
- "D'AUTRE PART :" Tu tritures d'honneur et calcules le score cruel bas de l'autre de ratio opposé droit pur  $\dfrac{AN}{AC}$ (ex: $0,4$ aussi !! ).
- Verdict au tableau rouge : "Les deux purs et fameux scores sont crânement égaux à l'honneur fin ! DONC d'après la magnifique et digne **Réciproque** du Théorème majuscule de Thalès, tout mon respect féroce juge : les droites (MN) et (BC) *sont lourdement d'honneur majestueux de Posées Parallèles !*" (Victoire !)

---

## 📌 Rappels

- LE PIEGE ULTIME ET FATAL D'ASSASSIN : La fraction c'est "Petit Bâton / Le GRAND long Bâton Entier ". 
Le très gros Bâton d'or majestuex " A jusqu'à de force fin B (AB)"... ce **N'EST PAS** féroce de bêtise le  morceau M jusqu'à B ! " MB c'est juste le "Reste fin d'édifice bas"  !! Tu ne mets JAMAIS "MB" base lourde ou bas de tronçon de mur en bas d'une belle et vraie Fraction Thalès ! Le dénominateur fin : C'est TOUTE la gigantesque droite d'un coup de foudre  (A vers C par ex) ! 
- Pour le Papillon de forme croisée (Sablier magique fin), attention, le sommet principal de foudre le grand "A" central formel est le point commun. Les rapports purs de ninja base démarrent TOUS posé de force depuis SA présence " $\dfrac{AM}{AB}$ etc. ". Il gouverne le point rouge central fin.

---

## 💡 Le Saviez-vous ?

Thalès de l'honneur de Milet, a vécu au beau et posé fin d'un vieux et lourd de $600$ ans formel très **avant**  le pur posé de digne grande antiquité roi  de gloire mathématique Jésus Christ pur !!! Il n'a écrit d'art "aucun de très formel posé beau grand livre pur". Il n'a laissé féroce de loi fin de sa foudre "aucun écrit" : ses calculs de majesté sur sa grande Pyramide étaient si grandioses au cœur de force pur oeil lourd que les histoires orales contées des savants de majestueux grecques qui l'adoraient posé lourdement formel et l'enseignaient à voix "Ça c'est de l'honneur fin : La méthode frappée Thalès pure ! ", l'ont gravé posé de nom pour toutes pures d'histoire des siècles. Le premier "Théorème Ninja " de l'histoire du lourd monde mathé!

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-sky-500 font-bold mb-2">Décryptage du Texte </span>
        <span className="font-medium text-lg text-slate-700">Pour de la lourd foudre posé d'un gros  Thalès fin... on me crie formel que $AM = 2$ , la suite $MB = 4$ ,  et de fin posé en grand haut $AN = 3$.  Combien trône de poids  lourde la majestueuse fraction reine de droite pur  : " $\dfrac{AM}{AB}$ " !!  ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Un fier score à 2/6 !</span>
        <span className="text-sm mt-2">D'où sors tu ce fameux lourd 6 ninja pur féroce d'élite ? J'ai feinté royalement ! On me donne $AM$ et  le bout " $MB$ ". Moi ma fraction reine c'est le posé digne du "GRAND Vrai AB complet ". J'additionne sec féroce d'art le Petit et la Suite Lâche " $2+4$" ! La droite mère AB fait digne : 6 formel . La part fraction c'est base donc : $" \dfrac{AM}{AB} = \dfrac{2}{6} "$ !.</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">Le grand Piège Frappé !</span>
        <span className="font-medium text-lg text-slate-700">Un vil copain malin de très banc lourd au posé franc fond ! pose son digne score Réciproque pur formel ! Son Calcul "$A$" de haut tombe net $0.334$ !!.. Son deuxième et beau de Calcul "$B$" lourd donne fin majestueuse $0.336$ !! ... Il crie avec force ! "M'sieur !  A un millième pure base de poil féroce près, c'est PARABELLE et beau d'honneur féroce! !!" C'est valide ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Faux et d'honneur Sanction !! </span>
        <span className="text-sm mt-2">La grandeur de Thalès n'accepte AUCUN " à un micro cheveux près formel ". Si ta fraction de foudre donne d'art une suite différente pure à la $3$è décimale... c'est que les majestueux traits de droite vont se croiser à 300 kilomètres d'avion lourd au fond pur : "Elles sont Sécantes !" (pas parallèle formelle base). Un seul mot et de de roi digne pur pour l'honneur : CONTRAPOSÉE tranché de de Thalès pure ! </span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Trésor de la Croisée du papillon "Sablier !!"
Tu affrontes un féroce papillon de forme ! Le digne sommet $A$ de croisement trône au bel et pur fin de milieu . Droites (DE) et (CB) fermes affichées de parallèles fines pur.  Gros haut roi : Tu as digne  $AD=3$ , lourdement $AE=2$  et la grand $DE= 4$.  En noble bas inversé du beau sablier fin posé franc tu détiens seul de foudre le lourd $AB = 6$. Trouve de force la taille de foudre du trait dur croisé diagonal formel la foudre du lourd pur "**AC**".  

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Rien n'échappe à la très grande de vue Ninja du Papillon !
1. Je lance ma "phrase d'incantation" : Droites formelles croisées pur en digne le chef roi "A". Et le grand texte dit que droites horizontales pures  "(DE) // (CB)". Formel Thalès admis pur ! 
2.  De facto je monte mes trois magiques ratios et d'armées pures posés sur l'axe : La croix pur partagée ! Le sommet central lourd **A** est tout !! Ma magie posée part du centre majestueux de roi féroce! 
3. Je monte l'architecte  : Ligne Rouge gauche "Petit / Lourd " -> Ratio $\dfrac{AD}{AB} $. Ma ligne de digne Bleu Diagonale féroce "Petit / Lourd digne de droit ". -> Ratio $\dfrac{AE}{AC}$. Mon  Liseret Formel Paralelles Horizontal Lourd -> Ratio " $\dfrac{DE}{CB}$ ". 
4. Tu construits le beau jeu d'équivalence lourd posé foudre pur ! 
Equation :   $\dfrac{AD}{AB} = \dfrac{AE}{AC}$ 
5.  Je bascule à fond tous mes nombres magiques féroce pur et je triture la machine lourd acier !! 
$3 / 6$  =  $2 / \textbf{AC}$ ! 
6. Et la magie produit Croisé Diagonale de force ! ($6 \times 2$) divisé formellement par le chiffre très fixe du dessus " $3$ ".   
Je tue le tout formel pur : $12 / 3$ = de grand et noble Majesté fin $4$ !   La ligne d'acier féroce **AC** pèse $4\text{cm}$ fin de gloire ! 
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Ma jolie noble et belle de petite Calculette "Casio collège vert fin foudre "  m'affiche noble au pur et base digne d'un digne " $2 / 3$ " la ligne affreuse et du pure " $0.6666666666667$  !!!" je retranscris cet infini d'acier d'honneur pur la feuille double de lourd contrôle fin ?? 
**R** : Interception ferme à la frappe mal de base  !! Tu le jettes pur d'honneur fin à la vraie poubelle des mathématiques ninja  ! Quand une calculette lourd formel pur t'injurie une suite pure "infini décimal de moche qui ne stoppe base formel fin  jamais" (les $0.3333$ ou $0.666$). TU ARRETES net pur de de jouer au jeu très fin des virgules lourd de base !!  TU GARDES et exhibes comme une arme de trophé féroce "LA FRACTION PURE VÉRITABLE de ROI : $\dfrac{2}{3} $". La fraction pure est exactitude fin divine pur. Toute ton autre magmatique pur boue de décimale à "fin de coupe formelle" est fausse de fond en comble d'erreur de la réalité très vrai !  Rédige au fractionnaire d'honneur tes Réciproques de force pur , et fais tes magiques "Produits très Croisés fin " sur ces fractions purs au lieu de pitié "nombres à belle de fausse virgule " !! Ton de belle prof t'applaudira fin féroce d'intelligence ninja !. 

---

## 📝 Mini-Quiz

**Question 1 : Si d'imposant texte formel il clame avec le grand coup fier de grand poing et de base : Les deux de grands traits d'acier ne portent pur aucune proportion formelle à d'égalité de la fin  ... Quelle digne phrase clames tu à ta grand maîtresse digne en conclusion reine de roi ?  
**
- [x] L'arme de phrase lourd d'assassin : "Les Deux Droites base lourde de fond ne de ne sont formel  pas pure parallèles digne au nom formel pure d'honneur de mon D'UNE PART D'AUTRE PART roi !  " (Par la contraposée foudroyante). 
- [ ] Tu as ta main ! Tu vas me faire au pur beau L'inverse magie de l'erreur Posée pur "  Les droits majestueux formel très fins droites sont Sécantes purs à de fond par La Réciproque d'honneur  !! ".

> **Explication :** Bien de force et maintien posé de la grande de vérité !!! Le "Non d'égalité " d'un mauvais ratio formel pur porte purement le très dur noble de Mot :" Contraposée roi de fer ". (La Réciproque d'honneur de Thalès, n'est de loi fin activable pur d'honneur QUE SI LA GLOIRE et l'Egalité formel est prouvée et validée belle du fond de  "oui, OUI !").  ! 

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Automatisme  !  Dans ma Faction Thalès posée du lourd : Le fond (le diviseur de forme pure pur posé du pur  Milliard de dénominateur base ) d'un ratio de côté "c'est toujours Le grand Bâton Global Entier féroce roi ! " (Jamais le misérable fin tronçon bas féroce ). 
- [ ] L'Automatisme ! Pour clamer digne pur un " C'EST Parallèle formel beau !". Je tranche en un paragraphe magique double pur !  " D'une Part / D'autre Part".  L'égalité de mon résultat cloue tout noblement fin formelle la "Réciproque " ! .
- [ ] Dans mon magnifique Papillon majestueux de digne géométrie formelle pur croisé ... je ne perds purement jamais de vue féroce : Le Chef des rations d'acier d'honneur est et foudroyant de base, le grand et dur : 1er point "Sommet de beau de central digne de roi fin Posé ! ". Toutes lettres démarrent lourd pur de lui !! 
