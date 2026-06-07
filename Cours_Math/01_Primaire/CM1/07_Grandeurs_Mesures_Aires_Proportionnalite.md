---
title: 'Chapitre 7 : Grandeurs, Aires et Proportionnalité'
level: Primaire
subLevel: CM1
order: 7
---
# Chapitre 7 : Grandeurs, Aires et Proportionnalité

**Niveau** : CM1 (Cycle 3)  
**Prérequis** : Additions et multiplications, lecture de tableaux, notion de périmètre.  
**Objectifs** : 
- Comprendre la différence entre Périmètre (le contour) et Aire (la surface).
- Calculer l'aire d'un carré et d'un rectangle.
- Utiliser les bonnes unités de mesure (m vs m²).
- Résoudre un problème de proportionnalité avec un tableau.

---

## 📖 Introduction Pédagogique : Le jardin et la clôture

Imagine que tu possèdes un magnifique terrain pour construire une cabane. Tu as deux grands objectifs :
1. Sécuriser le terrain avec du grillage pour empêcher les moutons d'entrer.
2. Semer de la pelouse PARTOUT à l'intérieur de ta clôture.

Pour acheter le **grillage**, le vendeur va te demander : "Quelle est la longueur totale de votre clôture ?". Tu vas devoir additionner tout le bord de ton jardin : c'est le **Périmètre**.
Pour acheter les **graines**, le vendeur va te demander : "Quelle est la taille globale du sol de votre jardin ?". Là, le contour ne suffit pas, il faut calculer la place qu'il y a *à l'intérieur* : c'est l'**Aire**.

Dans ce chapitre, tu vas devenir le roi de l'aménagement et apprendre à calculer ces deux valeurs sans te tromper, tout en découvrant la magie des "proportions" pour calculer les prix sans calculatrice !

---

## 🎨 Schéma Pédagogique Interactif : Périmètre VS Aire

<div align="center">
<svg width="500" height="250" viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border-2 border-slate-200 rounded-xl shadow-sm">
  
  <text x="250" y="30" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">Le Tour (Périmètre) VS Le Remplissage (Aire)</text>
  
  <!-- Périmètre -->
  <g transform="translate(60, 60)">
    <!-- Animation qui dessine le contour -->
    <rect x="0" y="0" width="140" height="100" fill="none" stroke="#3b82f6" stroke-width="4" stroke-dasharray="480" stroke-dashoffset="480">
      <animate attributeName="stroke-dashoffset" values="480;0;480" dur="4s" repeatCount="indefinite" />
    </rect>
    <text x="70" y="55" font-family="Inter" font-weight="bold" fill="#3b82f6" font-size="16" text-anchor="middle">PÉRIMÈTRE</text>
    <text x="70" y="130" font-family="Inter" font-size="12" fill="#64748b" text-anchor="middle">On additionne les bords</text>
    <text x="70" y="145" font-family="Inter" font-size="10" fill="#94a3b8" text-anchor="middle">(ex: en mètres 'm')</text>
  </g>

  <!-- Ligne de séparation -->
  <line x1="250" y1="50" x2="250" y2="220" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6"/>

  <!-- Aire -->
  <g transform="translate(290, 60)">
    <!-- Le fond qui se remplit -->
    <rect x="0" y="0" width="140" height="100" stroke="#10b981" stroke-width="2" fill="#d1fae5">
      <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
    </rect>
    <!-- Grillage interne montrant la surface -->
    <path d="M 28 0 L 28 100 M 56 0 L 56 100 M 84 0 L 84 100 M 112 0 L 112 100" stroke="#10b981" stroke-width="1" opacity="0.3"/>
    <path d="M 0 25 L 140 25 M 0 50 L 140 50 M 0 75 L 140 75" stroke="#10b981" stroke-width="1" opacity="0.3"/>
    <text x="70" y="55" font-family="Inter" font-weight="bold" fill="#059669" font-size="20" text-anchor="middle">AIRE</text>
    <text x="70" y="130" font-family="Inter" font-size="12" fill="#64748b" text-anchor="middle">On calcule l'intérieur</text>
    <text x="70" y="145" font-family="Inter" font-size="10" fill="#94a3b8" text-anchor="middle">(ex: en mètres carrés 'm²')</text>
  </g>

</svg>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. Le calcul de l'Aire (La Surface)
Pour mesurer une surface, on la "découpe" virtuellement en petits carrés. C'est l'unité des "mètres carrés" (notée $m^2$).
Au lieu de compter ces carrés un par un, les mathématiciens utilisent une formule magique, la multiplication !
- **L'aire du RECTANGLE** : On multiplie sa plus grande longueur par sa largeur. 
  $\text{Aire} = \text{Longueur} \times \text{largeur}$ ($A = L \times l$)
- **L'aire du CARRÉ** : Comme tous ses côtés sont égaux, on multiplie son bord par lui-même.
  $\text{Aire} = \text{côté} \times \text{côté}$ ($A = c \times c$)

### 2. Le piège de l'unité !
C'est l'erreur la plus fréquente :
- Un Périmètre est une simple ficelle qu'on déroule. Si on la mesure, c'est en **mètres (m)** ou **centimètres (cm)**.
- Une Aire est un bloc plat de remplissage. Une multiplication a été faite, la réponse DOIT avoir son petit 2 magique en hauteur : **mètres carrés ($m^2$)** ou **centimètres carrés ($cm^2$)**. 

### 3. La Proportionnalité : La magie des recettes !
La "Proportionnalité", c'est une relation juste et honnête entre deux choses. 
Exemple : 1 gâteau coûte 5 €. Si la règle est "proportionnelle", alors 2 gâteaux couteront exactement le double ($2 \times 5$ = 10 €), et 3 gâteaux le triple (15 €).
S'il y a une promotion "3 gâteaux pour 12 € au lieu de 15 €", le calcul est cassé. **Ce n'est plus proportionnel**. 
Pour résoudre ces problèmes, on utilise **un tableau**.

---

## 📌 Rappels

- Périmètre (le bord) = On s'amuse à faire des additions : $\text{coté} + \text{coté} + \text{coté} + \text{coté}$.
- Aire (le fond) = On utilise impérativement une Grande Multiplication (Longueur x Largeur) et on jette les additions !

---

## 💡 Le Saviez-vous ?

Sais-tu d'où vient l'indice "$²$" (le petit "au carré") dans le mot *Mètre Carré* ($m^2$) ? Cela vient tout simplement du fait que l'unité de base pour mesurer la surface du monde choisie par les ancêtres... était le dessin géométrique d'un parfait "Carré" pur, mesurant très exactement 1 mètre sur 1 mètre. Pour calculer des villes, ils se demandaient : "Combien de ces gros carrés rigides en bois peut-on plaquer au sol sans dépasser ?".

---

## 🛠️ Application Pratique / Interactive

**Mission : Protéger le potager**
Tu as conçu un merveilleux potager RECTANGULAIRE qui mesure **10 mètres de long** et **3 mètres de large**. 
1. **Calcule l'Aire** pour savoir si tu auras assez des 25 mètres carrés ($m^2$) de terreau achetés hier.
2. **Calcule le Périmètre** de clôture anti-lapins pour savoir si tes 20 mètres de grillage en stock suffiront !

*(Fais tes propres calculs au brouillon avant de regarder au prochain point d'exercice pour te vérifier !)*

---

## 🧠 Flashcards

<div className="flex flex-wrap gap-4 justify-center my-6">
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-2 border-slate-200 rounded-xl [backface-visibility:hidden] shadow-sm p-4">
        <span className="text-sm text-emerald-600 font-bold mb-2">Formule d'Aire</span>
        <span className="font-medium text-lg text-slate-700">Quelle est la formule pour mesurer l'aire mathématique d'un Carré ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500 text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Côté x Côté !</span>
        <span className="text-sm mt-1">On multiplie sa base par sa hauteur, mais comme tous ses côtés sont identiques, on multiplie le côté par lui-même (c x c).</span>
      </div>
    </div>
  </div>
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-2 border-slate-200 rounded-xl [backface-visibility:hidden] shadow-sm p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">Périmètre vs Aire</span>
        <span className="font-medium text-slate-700">Pour poser les "plinthes" en bois au bas du mur de ma chambre, je calcule l'Aire ou le Périmètre ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-md font-bold">Le Périmètre !</span>
        <span className="text-sm mt-1">Les plinthes font très exactement le "TOUR" de la zone en logeant les murs. Tout ce qui touche la paroi et se déroule : c'est du Périmètre !</span>
      </div>
    </div>
  </div>
</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Potager de la mission (Correction)
Reprenons la mission : Ton terrain fait $L = 10 \text{ m}$ et $l = 3 \text{ m}$.

<details className="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
1. **L'Aire du potager (la terre) :** La formule du rectangle est $\text{Longueur} \times \text{largeur}$.  
   Calcul : $10 \times 3 = 30$.  
   Le terrain fait **$30 \text{ m}^2$**. Ta cargaison de "25" $m^2$ achetée n'est PAS suffisante, il t'en manque 5 !
2. **Le Périmètre de sécurité (la clôture de contour) :** Le terrain possède 4 bords ! (Deux grands et deux petits).  
   Calcul avec la somme de tous les murs : $10 + 10 + 3 + 3 = 26 \text{ m}$.  
   Le contour mesure **$26 \text{ m}$**. Ton rouleau à 20 mètres sera hélas... beaucoup trop court de 6 mètres. Attention aux lapins du fond !
</details>

### Exercice 2 : La Potion Proportionnelle magique
Pour l'anniversaire de papa, la recette indique que pour **4 personnes**, il faut presser la quantité formidable de **12 citrons**. Le grand cousin ramène ses petits enfants au repas : vous allez subitement devoir manger tous ensemble à **8 personnes** de convives !
Combien de citrons devras-tu formellement acheter au Primeur ce soir pour sauver cette recette sans changer le goût ?

<details className="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
C'est un travail typique de mathématique de proportionnalité ! Formons un mini tableau mental.
- À l'étage EN HAUT (Personnes) : on passe du nombre "4" vers le chiffre "8".  
  Question mathématique vitale : Comment passe-t-on du 4 au 8 en multiplication ? L'astuce est de faire un bon fixe par une classe d'une augmentation au symbole "$\times 2$" ! *(car $4 \times 2 = 8$).*
- À l'étage EN BAS (Les Citrons) : on doit REPRODUIRE magiquement et avec fidélité absolue l'astuce de ce même bond multiplicateur découvert en haut (le coefficient proportionnel) !  
  Le stock indique 12 d'origine. On lui applique la règle "$\times 2$" : $12 \times 2 = 24$.
- Conclusion finale : Tu auras l'absolue obligation de presser et couper **24 citrons frais** !
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Est-il possible que deux jardins aient la même "Aire" (la même place au sol), mais ne fassent pas du tout le même "Périmètre" de clôture en longueur ?**
**R** : Bien sûr ! C'est le piège d'ingénieur classique. Le jardin 'A' est fait en format long couloir écrasé ($L=10 \text{ m}, l=1 \text{ m}$ / son aire fait $10 \text{ m}^2$, mais son périmètre donne le long chiffre de $22 \text{ m}$). Le terrain 'B' de ton voisin, est carré ($L=2 \text{ m}, l=5 \text{ m}$ / l'Aire fait bien $10 \text{ m}^2$ de pelouse aussi, mais surprise... faire le tour demande la petite taille de $14 \text{ m}$). La forme géométrique changera les calculs d'échelle entre le "tour" et le sol !

**Q2 : Peut-on additionner pour passer d'une colonne à l'autre en Proportionnalité ? (ex : "j'ai 4 personnes en plus, donc j'ajoute 4 citrons")**
**R** : **NON ! Jamais !** C'est interdit, cela casse la logique. Une proportion, ça "gonfle" en grand ou ça "rétrécit" d'un coup complet, donc ça utilise EXCLUSIVEMENT ou de la **multiplication ($\times$)** de base formelle d'élévation, ou bien de la division ($\div$) stricte pour redescendre.

**Q3 : Pourquoi faut-il faire un tableau pour la proportionnalité ?**
**R** : Parce que ça permet d'aligner les chiffres de même catégorie (les personnes d'un bord, les aliments de l'autre). Si tu mélanges toutes les données comme dans un panier, ton cerveau va vite faire une erreur. Le tableau met de l'ordre géométrique dans ton calcul et rend le "coefficient multiplicateur magique" très facile à apercevoir !

---

## 📝 Mini-Quiz

**Question 1 : "L'Aire" se calcule chez un Rectangle avec l'opération magique...**
- [x] L'opération $\text{Longueur} \times \text{largeur}$.
- [ ] L'addition $\text{Longueur} + \text{largeur}$.

> **Explication :** Bien sûr ! Pour trouver la matière solide intérieure, la seule solution puissante est la "Multiplication" des bases en équerre : La $Longueur \times largeur$. L'addition ne fait hélas que trouver formellement un "demi-périmètre" !

**Question 2 : Laquelle de ces unités de mesure est mathématiquement FAUSSE (ou interdite) pour rendre ta copie finale d'un problème sur L'AIRE ?**
- [ ] Le mètre carré ($m^2$)
- [x] Le Centimètre très classique de fil simple ($cm$).

> **Explication :** Tout à fait ! Parler en "Centimètre" basique et normal, ce n'est autorisé que pour les bords (les Périmètres de parcours en simple clôture au lasso). Dès qu'on utilise un multiplicateur de deux valeurs plates ($\text{côté} \times \text{côté}$), le produit total exige d'arborer l'étiquette au "Carré" ($cm^2$) !

**Question 3 : Une "Situation de Proportionnalité", ça veut dire que...**
- [ ] Le marchand peut faire varier son prix s'il a décidé de solder du stock le samedi !
- [x] Tout augmente (ou diminue) à partir d'une même et unique multiplication constante pour toutes les données !

> **Explication :** Formidable ! Une proportion de base ne connaît pas le hasard. Ce qui monte, monte avec rigueur par exemple en "$\times 3$". S'il y a un tarif "Promotion" d'été, ça fausse le coefficient, la proportion mathématique est officiellement rompue et la règle mathématique s'arrête net.

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Avertisseur de faute classique ! Ne plus JAMAIS confondre les mots dans un exercice (Périmètre = calcul normal autour / Aire = calcul intérieur en multipliant !).
- [ ] Je sais restituer par cœur : l'aire d'un Rectangle se compose de sa grande $\text{Longueur} \times$ sa plus petite $\text{largeur}$. Le Carré : $\text{côté} \times \text{côté}$.
- [ ] À l'arrivée sur un bloc proportionnalité : je dois tracer mon tableau horizontal en deux voies et repérer la fameuse flèche de multiplication (le coefficient) pour la recopier !
