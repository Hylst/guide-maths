---
title: 'Chapitre 6 : Les Angles'
level: College
subLevel: 6eme
order: 6
---
# Chapitre 6 : Les Angles

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Utilisation de la règle et de l'équerre (Primaire).  
**Objectifs** : 
- Maîtriser le vocabulaire des angles (sommet, côtés, aigu, obtus, plat, droit).
- Savoir nommer un angle avec trois lettres.
- Utiliser un rapporteur pour mesurer un angle en degrés.
- Construire un angle de mesure donnée.

---

## 🎯 Introduction Pédagogique

As-tu déjà entendu le commentateur d'un match de foot s'exclamer : "L'attaquant a tiré dans un angle fermé !" ou remarqué qu'une piste de ski noire est vertigineuse à cause de la "pente" ?
Ce qu'on appelle "Angle", c'est simplement l'**ouverture** entre deux directions. C'est le degré d'inclinaison. Maîtriser les angles permet de construire des toits solides pour faire couler la pluie, d'ajuster le tir d'une fusée pour atteindre Mars, de calculer de jolis rebonds au billard, ou d'être le roi du sniper dans ton jeu vidéo préféré !

---

## 🎨 Schéma Pédagogique Interactif : L'Ouverture du Portail

Expérimenté la lecture visuelle ! Un angle "petit" est fermé et pointu. Un angle "grand" est tellement ouvert qu'il ressemble à un dossier de chaise de bureau cassé en arrière !

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#fff7ed; border-radius:12px; border: 2px solid #ea580c;">
  
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#9a3412" font-size="16" text-anchor="middle">Aigu (Pointu) Vs Obtus (Très Ouvert)</text>
  
  <!-- Angle Aigu -->
  <g transform="translate(100, 150)">
      <!-- Ligne de base -->
      <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
      <!-- Ligne animée (ouverte à 40 deg) -->
      <line x1="0" y1="0" x2="61.2" y2="-51.4" stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="5" fill="#1f2937"/>
      <!-- Arc de cercle de mesure -->
      <path d="M 30,0 A 30,30 0 0,0 23,-19" fill="none" stroke="#ea580c" stroke-width="2"/>
      <text x="-15" y="20" font-family="sans-serif" font-weight="bold" fill="#1f2937" font-size="14" text-anchor="middle">S</text>
      <text x="40" y="-30" font-family="monospace" font-weight="bold" fill="#c2410c" font-size="14" text-anchor="middle">40°</text>
      <text x="40" y="40" font-family="sans-serif" font-weight="bold" fill="#c2410c" font-size="16" text-anchor="middle">AIGU</text>
  </g>

  <!-- Ligne de séparation -->
  <line x1="225" y1="70" x2="225" y2="200" stroke="#fdba74" stroke-width="2" stroke-dasharray="5 5"/>

  <!-- Angle Obtus -->
  <g transform="translate(320, 150)">
      <!-- Ligne de base -->
      <line x1="0" y1="0" x2="80" y2="0" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
      <!-- Ligne animée (ouverte à 130 deg) -->
      <line x1="0" y1="0" x2="-51.4" y2="-61.2" stroke="#4338ca" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="5" fill="#1f2937"/>
      <!-- Arc de cercle de mesure -->
      <path d="M 30,0 A 30,30 0 0,0 -19,-23" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
      <text x="-15" y="20" font-family="sans-serif" font-weight="bold" fill="#1f2937" font-size="14" text-anchor="middle">O</text>
      <text x="20" y="-30" font-family="monospace" font-weight="bold" fill="#4338ca" font-size="14" text-anchor="middle">130°</text>
      <text x="20" y="40" font-family="sans-serif" font-weight="bold" fill="#4338ca" font-size="16" text-anchor="middle">OBTUS</text>
  </g>

  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.2;0.8;0.9;1" dur="8s" repeatCount="indefinite"/>
    <rect x="50" y="210" width="350" height="25" rx="5" fill="#ffedd5" stroke="#fdba74" stroke-width="1"/>
    <text x="225" y="227" font-family="sans-serif" font-weight="bold" fill="#9a3412" font-size="12" text-anchor="middle">L'angle droit mesure exactement 90°. Aigu c'est Moin, Obtus c'est Plus !</text>
  </g>

</svg>
</div>

---

## 🔁 Rappels Utiles

- L'**Équerre** : Sert à pister les coins parfaits qui forment l'**Angle Droit**.
- La taille des "bras" (les demi-droites tracées au crayon) ne change RIEN à CELA : c'est bien "l'ouverture du compas" au démarrage qui détermine la violence de l'angle.

---

## 📚 Théorie Enrichie

### 1. La Grammaire Anatomique (De quoi c'est fait ?)
Un angle est l'écartement de deux "murs" qui partent du même endroit.
- **Le Sommet** : C'est le point de choc. (Le coin du bout, l'intersection pure).
- **Les Côtés** : Ce sont les deux demi-droites maîtresses qui tracent les murs.
**Notation Royale** : Au collège, un angle s'écrit formellement avec 3 lettres majuscules et doté d'un curieux **chapeau $\widehat{  }$** ! Le Sommet DOIT OBLIGATOIREMENT être the lettre du milieu.
- *Exemple : $\widehat{ABC}$ signifie "L'inclinaison a pour Sommet pointu le $B$, et ses bras longent les points A et C."* (On peut aussi l'appeler légalement $\widehat{CBA}$).

### 2. Typologie et Morphologie
Un angle est mesuré avec une unité inventée sur-mesure : le **Degré ($^\circ$)**.
L'angle le plus connu est *L'Angle Droit (L'angle équerre)* : il tape les $\mathbf{90^\circ}$. Et à partir de son gabarit d'or, on juge le reste du monde :
- **L'Angle Nul ($\mathbf{0^\circ}$)** : Les murs sont écrasés l'un sur l'autre (totalement fermé).
- **L'Angle Aigu** : Petit, pointu, fragile. Il mesure formellement *Moins de $90^\circ$*.
- **L'Angle Droit ($\mathbf{90^\circ}$)** : Architecture absolue. Carré.
- **L'Angle Obtus** : Vaste, béant. Mesure entre *$90^\circ$ et $180^\circ$*.
- **L'Angle Plat ($\mathbf{180^\circ}$)** : Totalement ouvert à l'horizontal, les deux bras alignés à plat font un segment strict.

### 3. Le Rapporteur : Manier l'arme fatale
Le "Rapporteur" est cet objet en plastique recourbé qui exaspère les élèves inattentifs. 
Voici l'unique algorithme du Tisserand pour ne jamais rater :
1. Pousse et cloue la **Cible Centrale (le trou ou la croix rouge)** avec exactitude SUR LE SOMMET.
2. Bascule ou pivote l'intégralité du plastique jusqu'à poser un des bras sur la fameuse LIGNE DU ZÉRO ($0$).
3. Fixe le zéro ! Regarde l'inclinaison de l'autre bras et fige les graduations du thermomètre. Tu obtiens ton majestueux angle (ex: $60^\circ$).

### Piège Magistral de la Double Graduation !!
Le rapporteur standard a des chiffres des DEUX côtés ! (À l'endroit et l'envers). On se trompe très vite.
*Astuce Infalsifiable* : Utilise l'estimation visuelle de ton Cerveau Avant ! Si tu trouves $130^\circ$, mais que ton cerveau te dit que l'angle est super "Aigu" et pointu... tu viens de lire la Mavaise Ligne de graduation ! Tourne ta tête et regarde le petit chiffre en retrait qui indique $50^\circ$ !

---

## 💡 Le savais-tu ?

L'Épopée de the Babyloniens. Mais pourquoi diable avoir coupé l'univers en "360" degrés au total plutôt qu'en "100" qui serait plus facile à mémoriser ?
Parce qu'il y a très très longtemps en Mésopotamie, les grands prêtres de la nuit estimaient que l'année faisait 360 jours et ils adoraient le système astronomique (divisible par tout : 12, 60, etc.) ! De plus, ce cycle suit les traces stellaires. Alors, un Soleil au lever et son parcours de rotation ont tracé la ligne d'Or Temporelle des Mathématiques que tu as entre tes mains d'écolier aujourd'hui !

---

## ❓ FAQ (Foire Aux Questions)

**Q : C'est une faute si mes deux bras tracés pour l'angle n'ont pas la même taille sur la feuille ?**
**R** : Absolument Aucune. C'est l'Ouverture Pivotante à la racine du sommet que tu mesures. Tu peux dessiner un bras court (1 cm) et un bras de $2$ mètres, the L'écart d'angle à la racine reste le MEME formellement. Un conseil : N'hésite pas à tracer THE la rallonge the de la droite au crayon pour que la Ligne parvienne facilement jusqu'au le bord de The Rapporteur pour faire the lecture aisée !

**Q : "L'Angle à moitié plat", on the dit comment ?**
**R** : La belle the formule formelle the "Angle Droit $\mathbf{90^\circ}$ ". On dit un demi angle Plat of force. 

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>On veut nommer au stylo plume L'angle du Sommet M avec les bouts K et L sur ces bras formels The. Quel est la Notation de Code ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>$\widehat{KML}$ ou formellement $\widehat{LMK}$ d'Or. Le puissant sommet se positionne en the plein the Centre exclusif!
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Je the te the montre the Une the Mesure majestueuse The : $169^\circ$. De la quel formelle caste type angle cel a fait-il la part The de?
    <hr/>
    <strong>VERSO :</strong><br/><br/>La caste The Angle "Obtus" The !! Il excède amplement The $90^\circ$ du Droit the the mais n'atteint point The Plat temporel absolu the $180^\circ$.
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : Le Formulaire the Code (The Lecture The the Sommet)**
Le Juge The Céleste the pointe L'Angle mystérieusement formel Ouest. Les bras croisés aux points V et X. Le trou central the point d'intersection the nomme G The.
Défini le nom secret the the the Angle ! Par de force !.

**Correction Détaillée :**
1. Je débusque le point the de contact The Ciel the the Sommet The : "C'est l'intersection formelle $G$".
2. Je sais qu'il encaisse Le point Milieu.
3. Je pose le Joli Chapeau d'or dessus the ! Ca donne fièrement of Merveille The : $\widehat{VGX}$ the ou $\widehat{XGV}$ !.

**Exercice 2 : La Piste the Féroce The Temporel 145 !**
Quel est le Dénominatif de classe des anges the 4 dimensions pour des Ouvertures temporel de The $17^\circ$, the $156^\circ$ The et of The $90^\circ$ ?The 

**Correction Détaillée :**
1. L'Angle avec The 17 The The Ciel The : Petit, the vif, formel the refermé à s'y mordre: Merveilleusement **The Aigu !.**
2. L'Angle de $156^\circ$ the : Extrêmement Baie vitré géante. C'est du the Type de The grand  **Obtus Formel !!** The .
3. L'Angle of $90^\circ$ : The The Formidable the the Structure Moteur The Equerre . La Parfaite Architecture:  **L'Angle Droit des Cieux**. The ! .

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Mettre the The Chapeau Merveille the Magique Sur 2 LETTRES c'est autorisé en Mathématique the Formelle pour identifier de force l'angle ! (ex: $\widehat{AB}$).</strong></summary>
  <ul>
    <li>A) VRAI the de the la belle of force </li>
    <li>B) THE SCANDALE OF THE HÉRÉSIE THE ABSOLUE TEMPorelle formel !!!</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> C'est la de Merveille d'inquisition géométrique. LA NOTATION the EXIGE 3 Majuscules The OBLIGATOIRES ! Avec Sommet Centré. Un The angle à deux lettes ca n'existe The of pas in The the Science de Matrice mathématique !
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Le the rapporteur formel t'indique 120 sur le the the bord. Mais T'es Merveille the yeux claires voit Un Angle qui Pique petit Aigu the ! Ou The Es tu ? The La faille de ?</strong></summary>
  <ul>
    <li>A) Une the anomalie dimensionnel. </li>
    <li>B) T'as lu LA de Merveille FAUSSE the de force LIGNE EXTERIEURE AU LIEU THE DE la INTERIEUR. L'Angle fait $60^\circ$ de Ciel.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Formule of The the Survie. Le Juge ultime the des angles the C'EST TON OEIL. Si ca The Pique the petit et The the que la piece The of Plastique the te the the crie 120 The... LIS the Le Petit The CHIFFRE Inverse qui est a the l'autre the bout de trait The ($60^\circ$ temporel !!).
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Je sais écrire un bel the Angle avec $3$ majuscules The sous son The Chapeau Formel 
- [ ] J'ai the The conscience de Classe The the Aigu, the the Obtus, The Plat.
- [ ] Je n'inclus The pas The of taille du the bras de de dessin The dans l"Ouverture de Mesure The pure.
- [ ] J'aligne le d'Or Centre The The "Rapporteur The " the EXACTEMENT de force sur the Le Sommet Pointu the.

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*
