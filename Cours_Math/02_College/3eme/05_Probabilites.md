---
title: 'Chapitre 5 : Les Probabilités'
level: College
subLevel: 3eme
order: 5
---
# Chapitre 5 : Les Probabilités

**Niveau** : 3ème (Cycle 4)  
**Prérequis** : L'addition classique, et surtout une parfaite maîtrise des fractions et des pourcentages de 5ème/4ème.  
**Objectifs** : 
- Calculer la probabilité d'une "Issue" simple (une chance sur...).
- Maîtriser le grand vocabulaire : "Événement certain, impossible, contraire".
- Dessiner et utiliser un majestueux **Arbre de Probabilités**.
- Comprendre les expériences à "Deux épreuves" (Tirages successifs).

---

## 📖 Introduction Pédagogique : Le Maître du Casino Féroce !

As-tu déjà imaginé être capable de lire dans l'avenir pur ? De savoir en entrant d'honneur dans une majestueuse et secrète salle de Casino, si les dés lancés de fortune vont exploser l'or de la banque, ou te ruiner formellement ? C'est pur à l'honneur le métier féroce des Mathématiciens posés d'élites ! 

Cette magie de science s'appelle **Les Probabilités**. Ce n'est ni de la magie noire, ni de la simple "chance de l'Univers". C'est de roi mathématique peser l'impossible, le certain, l'incertain, et calculer avec rigueur une immense fraction qui te dit ta chance de victoire !! Tu vas devenir le stratège lourd de tous les jeux de cartes, de pièces et d'urnes géantes de billes !!

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : L'Arbre Ninja Féroce (2 Lancers!)

Une pièce est lancée. En haut "Pile" ! En bas "Face" ! On la relance encore ! Observe les "Branches" qui multiplient ton destin !

<div align="center">
<svg width="550" height="320" viewBox="0 0 550 320" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="510" height="40" fill="#f8fafc" rx="8" />
  <text x="275" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">L'Arbre Féroce à Deux Épreuves : Pièce Ninja</text>

  <!-- Point de Départ (Départ Casino) -->
  <circle cx="50" cy="160" r="8" fill="#0f172a"/>
  <text x="50" y="190" font-family="JetBrains Mono" font-weight="bold" fill="#475569" font-size="14" text-anchor="middle">Départ</text>

  <!-- Lancer 1 -->
  <!-- Branche Haut : Pile (1/2) -->
  <line x1="50" y1="160" x2="200" y2="80" stroke="#3b82f6" stroke-width="4" stroke-linecap="round"/>
  <polygon points="200,80 190,85 195,75" fill="#3b82f6"/>
  <rect x="100" y="100" width="30" height="20" fill="#eff6ff" rx="4"/>
  <text x="115" y="115" font-family="JetBrains Mono" font-weight="bold" fill="#2563eb" font-size="12" text-anchor="middle">1/2</text>
  <circle cx="210" cy="80" r="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="210" y="85" font-family="Inter" font-weight="bold" fill="#1e3a8a" font-size="14" text-anchor="middle">P</text>

  <!-- Branche Bas : Face (1/2) -->
  <line x1="50" y1="160" x2="200" y2="240" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
  <polygon points="200,240 190,235 195,245" fill="#f59e0b"/>
  <rect x="100" y="200" width="30" height="20" fill="#fffbeb" rx="4"/>
  <text x="115" y="215" font-family="JetBrains Mono" font-weight="bold" fill="#d97706" font-size="12" text-anchor="middle">1/2</text>
  <circle cx="210" cy="240" r="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="210" y="245" font-family="Inter" font-weight="bold" fill="#92400e" font-size="14" text-anchor="middle">F</text>
  
  <text x="130" y="170" font-family="Inter" font-weight="bold" fill="#cbd5e1" font-size="12" text-anchor="middle">1er Lancer</text>

  <!-- Lancer 2 (Depuis Pile Haut) -->
  <!-- Haut -> Pile (1/2) -->
  <g>
    <animate attributeName="opacity" values="0.2; 1; 0.2" dur="2.5s" repeatCount="indefinite" />
    <path d="M 220 80 C 270 50, 320 20, 370 40" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round"/>
    <text x="290" y="45" font-family="JetBrains Mono" font-weight="bold" fill="#15803d" font-size="12" text-anchor="middle">1/2</text>
  </g>
  <circle cx="380" cy="40" r="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="380" y="45" font-family="Inter" font-weight="bold" fill="#1e3a8a" font-size="14" text-anchor="middle">P</text>
  <text x="440" y="45" font-family="JetBrains Mono" font-weight="bold" fill="#ef4444" font-size="14" text-anchor="middle">(P , P)</text>

  <!-- Haut -> Face (1/2) -->
  <path d="M 220 80 C 270 110, 320 140, 370 120" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <text x="290" y="115" font-family="JetBrains Mono" font-weight="bold" fill="#64748b" font-size="12" text-anchor="middle">1/2</text>
  <circle cx="380" cy="120" r="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="380" y="125" font-family="Inter" font-weight="bold" fill="#92400e" font-size="14" text-anchor="middle">F</text>
  <text x="440" y="125" font-family="JetBrains Mono" font-weight="bold" fill="#64748b" font-size="14" text-anchor="middle">(P , F)</text>

  <!-- Lancer 2 (Depuis Face Bas) -->
  <!-- Bas -> Pile (1/2) -->
  <path d="M 220 240 C 270 210, 320 180, 370 200" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <text x="290" y="215" font-family="JetBrains Mono" font-weight="bold" fill="#64748b" font-size="12" text-anchor="middle">1/2</text>
  <circle cx="380" cy="200" r="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
  <text x="380" y="205" font-family="Inter" font-weight="bold" fill="#1e3a8a" font-size="14" text-anchor="middle">P</text>
  <text x="440" y="205" font-family="JetBrains Mono" font-weight="bold" fill="#64748b" font-size="14" text-anchor="middle">(F , P)</text>

  <!-- Bas -> Face (1/2) -->
  <path d="M 220 240 C 270 270, 320 300, 370 280" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
  <text x="290" y="285" font-family="JetBrains Mono" font-weight="bold" fill="#64748b" font-size="12" text-anchor="middle">1/2</text>
  <circle cx="380" cy="280" r="15" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
  <text x="380" y="285" font-family="Inter" font-weight="bold" fill="#92400e" font-size="14" text-anchor="middle">F</text>
  <text x="440" y="285" font-family="JetBrains Mono" font-weight="bold" fill="#64748b" font-size="14" text-anchor="middle">(F , F)</text>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. La Fraction Maîtresse d'Or (Le code pur Ninja !)
Toute l'étendue majestueuse des Probabilités tient sur un socle d'une belle phrase royale incassable. 
Pour calculer la Probabilité $P$ d'un bel "Événement A" (par d'exemple : *Tirer une foudre de Bille Bleue* !), tu traces ta gigantesque Barre de Fraction ! 
- En posé Haut Digne ("**Le Numérateur**") : Tu comptes ton nombre de "Fins Gagnantes pour ta quête !" ( "J'ai digne 4 pures billes bleues féroces " = Je mets "$4$")
- En Lourd et très Dur Bas ("**Le Dénominateur Poids!!**") : C'est le roi TOTAL formel de TOUT CE QUI EXISTE féroce dans le sac d'Urne ( "4 bleues, 2 rouges, 10 noires... Mon total posé dans le lourd sac pur est 16 !" = Je mets en dessous le "$16$")
Verdict : $P(A) \ = \ \dfrac{4}{16}$  !!! (Et en majestuex boss fin tu la simplifies formel en : $\dfrac{1}{4}$ de lourd pur !). 

### 2. Vocabulaire du Tribunal
Le lourd prof majestueux t'attaquera sans chiffre pour pur te forcer à de digne loi de vocabulaire !
- **Impossible !** : Si je jette un dé classique numéroté à 6 faces. La probabilité formelle de faire un majestueux " 8 ! " . C'est un pur événement Impossible. Sa belle probabilité féroce vaut formellement **0**.
- **Certain absolu !** : La chance pure " De tomber sur un chiffre compris entre $1$ ou $6$ " avec ce même dé. Il arrivera formellement TOUJOURS. Sa probabilité majestueuse pèse l'absolu du : **1**. 
- **L'Évènement Contraire (Le fameux NON féroce !)** : Tu sais en toi que la probabilité de Victoire $P(V) = 0.2$. On réclame formel ta chance de "La Non-Victoire (La pure perte)!". Tu fais le roi lourd calcul magique digne : **$" 1 - P(V) "$** = Soit $1 - 0.2$ = Un lourd "$0.8$ !".  Le Contraire, c'est ce qui manque pour que le pot de jeu pèse le roi complet "1". 

### 3. Les Magiques Arbres de Choix
Quand on te dit majestueux "Je lance une Pièce... PUIS je tire une Bille !" (Deux étapes de jeu roi = un pur cauchemar !). Tu dessines le majestueux "Arbre pur pondéré".
- Chaque "Branche" de bois est ton chemin. On pèse formel sa force (Ex: $\dfrac{1}{2}$ pour un "Pile"). 
- THE RÈGLE D'OR FATALE NINJA : Pour trouver la chance du bout " J'ai eu Pile , puis de la Bleu". Tu suis en digne courant la Branche complète ET **TU MULTIPLIES** lourd formel pur Les nombres de foudre qui croisent majestueux fin de ton chemin !! ($\dfrac{1}{2} \times \dfrac{4}{16}$ !). 

---

## 📌 Rappels

- LE PIEGE ULTIME : La Somme de toute tes majestueuses probabilités pour un même départ d'édifice ! CA DOIT lourd formellement **PÉSER UN PUR : 1** (Ou un grand "$100\%$ !" ). Si dans l'immense exercice tu finis avec la somme majestueuse forme base $1.2$ de ta pure branche de départ ... tu t'es féroce planté !!  
- N'oublie pas formel posé de gloire : " Équiprobabilité " . C'est le mot de fer ! Ca crie en ninja : "Aucune carte n'est de pur féroce trafiquée et aucune lourd boule n'est plus grosse ou lestée base de pure ". Chaque entité possède de la Même pure chance digne que l'autre d'honneur ! Mémorise féroce ce noble nom.

---

## 💡 Le Saviez-vous ?

Toutes les "Probabilités Ninja", aujourd'hui utilisées par l'État pour poser tous tes tarifs d'Assurances foudre ! (Et dans tes chers jeux vidéo !!). Sont nés au siécle $17 eme $  par deux purs mathématiciens formel d'élite (Blaise Pascal et Pierre de Fermat). Il devaient arbitrer d'honneur et régler par lettre l'interruption foudroyante d'un jeu d'argent d'un Casino ... Le pur noble " Chevalier de Méré ". Une partie s'est arrêté féroce au milieu : qui " rafle les gains de table !? ". Blaise lourd a inventé "Les branches de choix " (L'espérance) pour pouvoir trancher de base posé !

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-sky-500 font-bold mb-2">Décryptage du Texte de Sort</span>
        <span className="font-medium text-lg text-slate-700">Le vieux d'énoncé lourd clâme " Mon Urne Ninja possède $5$ de bleu ! , $3$ féroce boule Jaunes ! Et 1 belle lourde noire! " ...  Je pige à l'aveugle $1$ boule. Quelle est la majestueuse Probabilité de " P(J) " digne ?  ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Un fier posé : 3/9  !! (ou 1/3)</span>
        <span className="text-sm mt-2">D'où vient féroce fin le 9 ?! C'est le boss Total foudroyant ! Tu ajoutes lourd dans ta majestueuse tête " $5 + 3 + 1 $", le fond sac possède NEUF boules !! Haut numérateur : Le digne " Jaune " (3). Fraction fin pure : Les Bons (3) sur Les Totaux lourd (9). = P(J)= 3/9. </span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">Piège de l'Événement fin féroce Contraire </span>
        <span className="font-medium text-lg text-slate-700">L'épreuve foudre est majestueux le lourd dé roi à $6$ faces. On digne me crie d'honneur : Donne ma Probabilité formel : $P$ (" Tomber sur UN chiffre IMPAIR "). Que lourd trouve-tu ?  </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Digne Fraction : 3/6 (soit 1/2)! </span>
        <span className="text-sm mt-2">Ah !! Pour la de digne gloire de base !!!  Tu dois faire la pure liste au brouillon : "C'est quoi un chiffre Impair n d'un dé 6 ?" . Le 1 ! Le 3 ! Le 5 !!. Ca formel m'amène 3 Gagnants !  ... Le total : Le dé pur possède 6 de face !!   => Ma faction d'armure " 3 / 6 ! ". </span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Trésor Multiple et Arbre de Roi  !
Le Brevet ninja d'acier t'offre un lourd tir ! Tu participes à l'Incroyable de pur Fête Foraine !! 
Le grand roi sorcier t'oblige : 
- Jeu Un : "Tu lances une PIECE (Pile / Face) ! " .
- Jeu Deux : "Tu tires une Bille d'une grande Urne (3 Verte / 2 Bleues). ".
Tu es Milliardaire si posé ton destin croise : " Obtenir PILE, **ET** tomber Vert ! ". 

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Je crée posé le féroce "ARBRE Lourd d'honneur" .
1. Etape un (La Pièce) : La branche (Pile / Face ! ). Le poids base de fraction pur de chacun est posée **$\dfrac{1}{2}$**.
2. Etape Deux (L'Urne) : Mon sac d'urne possède " $3+2$ " = $5$ totale boules !! 
Ma de pure chance verte =  $\dfrac{3}{5}$ !  (Ma belle chance pur Bleue = de $\dfrac{2}{5}$ lourd digne ! ).
3. Je construis et ramifies !! A chaque d'arrivée "Pile(P)" (Et de Face(F)) ! Je dessine DEUX Branches ! (Verte, Bleue!). 
4. LA FRAPPE FATALE Ninja : Le destin " Pile ET Vert ". 
Je suis base mon chemin de l'Arbre ! Je traverse le " $\dfrac{1}{2}$ " digne de départ.... Et j'impacte pur sur la  "$\dfrac{3}{5}$" de branche verte !! 
5.  Le de noble Théorème Arbre ! : "**ON MULTIPLIE !**" !!!  Ma foudre Fraction = $ \dfrac{1}{2} \times \dfrac{3}{5}$ !! 
(Les numerateurs : $1 \times 3 = 3$ . Les de pur bas et dure Dénominateurs ninja entres eux : $2 \times 5 = 10$).
6. Victoire Formelle féroce  :   La chance de Casino est **de  $\dfrac{3}{10}$** !  ( $30\%$ majestueux !!).
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 :  Le prof t'ajoute un piège à l'Urne :  On tire DEUX Boules.. Mais le texte digne dit " **SANS REMISE** ". Qu'est ce  que formel posé digne cela change  ?**
**R** : Interception ferme roi Ninja !! ALERTE LOURDE ABSOLUE D'ACIER !! "Sans remise" veut dire d'honneur que : La féroce bille que tu as arrachée très  au majestuex "Tirage 1 "... reste dans de ta poche !! Ton de pur second Tirage a le roi "Lourd Sac Total" DÉTRUIT posé et de pur changé !! Si il y avait lourd "10" boules totales lourd en Jeu départ .. , Pour faire ton calcul formel du Tirage n°2, ton Dénominateur pèse pur " $\dots / 9$ " !! . L'arbre de probabilité est pur modifié. N'oublie digne jamais ça ! 

---

## 📝 Mini-Quiz

**Question 1 :  On lance un Féroce Dé (1 a 6) ! On te clame digne :" P ( "Avoir formel un Nombre Pair") = 3/6". Mon événement digne " E = Avoir un Nombre IMPAIR ". De quoi ce " E " lourd posé de foudre d'honneur est t'il digne ? !??   **
- [ ] Tu sors roi pur : C'est base UN pur majestueux fin et digne Évènement pur Incompatible magique ninja ! !
- [x] L'arme et honneur digne : UN Évènement formelle lourd et digne **CONTRAIRE** de Posé !  

> **Explication :** Bien géré !!!! Le vieux fin et dur mot ! Si l'événement "A Pair" pèse la moitié des chances. Et que mon Reste "E Impair" a le fond pur total ! Les deux Posés s'AMASSENT : La digne Somme fait "1". Ils s'opposent en se comblant "Pile roi ET féroce Face ! ". Le lourd formelle nom posé digne math c'est : " Événements Contraires " !!

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Automatisme ! " PROBABILITÉ d'honneur féroce posée "  C'EST ET NE PEUT digne lourd formel base qu'être Une fraction roi formelle ... ou Un joli Pourcentage !! CA N'EST JAMAIS un lourd Chiffre " $4$ ou du $5$ lourd pur formel !! ". Tout se joue en majestueuse fraction entre 0 et 1 ! 
- [ ] L'Automatisme ! "Mon ARBRE fin !! ". Je ne lourd fais pas " La petite Addition féroce " de des branches !! Pour et majestic le féroce pur chemin de digne lourd croisé fin : T_ON MULTIPLIE_ posé l'honneur pur !!
- [ ] Le piège lourd calculette d'honneur féroce ! Toujours valider : Le numérateur Poids base de digne fin .. DOIT D'ACIER posé l'honneur être Plus Petit formel ou très fier et bel ÉGAL !! à digne au  Dénominateur pur bas. Tu as féroce du 18/5 .... ta fraction digne probabilité est morte ! 
