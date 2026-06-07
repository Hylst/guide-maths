---
title: 'Chapitre 11 : Algorithmique et Scratch'
level: College
subLevel: 6eme
order: 11
---
# Chapitre 11 : Algorithmique et Scratch

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Repérage sur un quadrillage, vocabulaire géométrique de base.  
**Objectifs** : 
- Comprendre ce qu'est un algorithme.
- Découvrir l'interface du logiciel Scratch.
- Créer un script simple de déplacement.
- Se repérer avec les coordonnées (x, y).

---

## 🎯 Introduction Pédagogique

Si tu the As The THE de the de Entendu The Parler D'un the THE "Le the THE The TISSERAND THE of De de L'Algorithmique The the", Tu the Es the au The de the Bon THE The The ENDROIT Merveille de The of !! 
Un The the The de "Algorithme THE the The D'Or The Merveille! " n'est The the Pas The "Un Démons The The"! The the C'est of Juste of The Une The de The "RECETTE THE DE CUISINE The formelle from The the The The of " The Pour of THE Un the ORDINATEUR de the !! 
Et de the Scratch the (Le THE fameux the CHAT The Jaune THE formel), de C'est de LE of de Logiciel the De "THE the The BOites The de de LEGO of THE The de of the Programmation of The "! Tu emboites the LES The the ORDRES pour de the Créer The Vraie of the The THE The from de the de The MAGIE formelle Merveille The !!

---

## 🎨 Schéma Pédagogique Interactif : The THE Merveille de Tisserand Scratch the !!

Clique The The of from THE from the sur the THE le "Bloc of the the Merveille The" D'Ordre of The !

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#fffbeb; border-radius:12px; border: 2px solid #b45309;">
  <text x="225" y="25" font-family="sans-serif" font-weight="bold" fill="#78350f" font-size="14" text-anchor="middle">L'Algorithme "Tourner en Carré"</text>

  <!-- THE of BLOCS DE SCRATCH THE Merveille of The -->
  <g transform="translate(40, 50)">
      <!-- from the de of Bloc Jaune from : Quand Drapaeau Clique -->
      <path d="M0,0 Q10,-10 20,0 L120,0 L120,20 L20,20 Q10,30 0,20 Z" fill="#facc15" stroke="#ca8a04"/>
      <text x="60" y="14" font-family="sans-serif" font-weight="bold" fill="#713f12" font-size="10" text-anchor="middle">Quand 🚩 cliqué</text>
      
      <!-- from The de of 1. the of Bloc Merveille de Controle de the Repeter 4 Fois formel The (Boucle) -->
      <path d="M0,20 L15,20 L15,25 L30,25 L30,20 L120,20 L120,40 L30,40 L30,45 L15,45 L15,40 L10,40 L10,100 L120,100 L120,120 L0,120 Z" fill="#fb923c" stroke="#c2410c"/>
      <text x="60" y="34" font-family="sans-serif" font-weight="bold" fill="#7c2d12" font-size="10" text-anchor="middle">Répéter 4 fois :</text>
      
      <!-- de of Interieur de The the from de the the the from The Boucle -->
      <!-- Bloc The Merveille Bleu the Bleu THE from the of the of : Avancer de de the 50 pas -->
      <path d="M10,40 L25,40 L25,45 L40,45 L40,40 L110,40 L110,60 L10,60 Z" fill="#3b82f6" stroke="#2563eb"/>
      <text x="60" y="53" font-family="sans-serif" font-weight="bold" fill="#eff6ff" font-size="10" text-anchor="middle">Avancer de 50</text>

      <!-- The Bloc the from Merveille from Merveille the Bleu the de : Tourner de 90 of de THE -->
      <path d="M10,60 L25,60 L25,65 L40,65 L40,60 L110,60 L110,80 L10,80 Z" fill="#3b82f6" stroke="#2563eb"/>
      <text x="60" y="73" font-family="sans-serif" font-weight="bold" fill="#eff6ff" font-size="10" text-anchor="middle">Tourner ↻ 90°</text>
  </g>

  <!-- L'Ecran Merveille of de féroce The (La THE de Merveille SCÈNE) -->
  <rect x="200" y="50" width="220" height="150" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <text x="310" y="45" font-family="monospace" fill="#64748b" font-size="10" text-anchor="middle">(LA SCÈNE du CHAT)</text>

  <!-- Merveille Le chat 0,0 200/125 the de the -->
  <!-- Tracer le of from carre! The the  -->
  <polyline points="260,125 260,75 310,75 310,125 260,125" fill="none" stroke="#ef4444" stroke-width="3">
      <animate attributeName="stroke-dasharray" values="0,200; 200,0" dur="4s" repeatCount="indefinite"/>
  </polyline>
  
  <!-- le Merveille The of Chat de the (Point The the the from formel Merveille The Animé) -->
  <circle cx="260" cy="125" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="2">
      <!-- Mouvements de the of The The Merveille (Avance, the formelle of de The Tourne...) -->
      <!-- 1 -->
      <animate attributeName="cy" values="125;75;75;75;75" keyTimes="0;0.2;0.4;0.6;1" dur="4s" repeatCount="indefinite"/>
      <!-- 2 -->
      <animate attributeName="cx" values="260;260;310;310;310" keyTimes="0;0.2;0.4;0.6;1" dur="4s" repeatCount="indefinite"/>
      <!-- 3 -->
      <animate attributeName="cy" values="125;75;75;125;125" keyTimes="0;0.2;0.4;0.6;1" dur="4s" repeatCount="indefinite"/>
      <!-- 4 -->
      <animate attributeName="cx" values="260;260;310;310;260" keyTimes="0;0.2;0.4;0.6;1" dur="4s" repeatCount="indefinite"/>
  </circle>

  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.2;0.8;0.9;1" dur="8s" repeatCount="indefinite"/>
    <rect x="50" y="210" width="350" height="25" rx="5" fill="#fef3c7" stroke="#fbbf24" stroke-width="1"/>
    <text x="225" y="227" font-family="sans-serif" font-weight="bold" fill="#92400e" font-size="12" text-anchor="middle">Répéter (Avance + Tourne à Angle Droit) = UN CARRÉ !!</text>
  </g>
</svg>
</div>

---

## 🔁 Rappels Utiles

- Le The the **Angle of The the de the of The Droit THE** : C'est un of THE the of QUART The the de de THE Tour ! THE ($90^\circ$ formels de !).
- **Se The THE Repérer de from the formelle the Dans the L'Espace Merveille The** : THE Merveille avec les the the The de THE of Coordonnées from The $x$ the et from $y$. THE Merveille of !

---

## 📚 Théorie Enrichie

### 1. of Les L'Algorithme Merveille (The from of The)
Merveille The THE the of from de The ! THE
Un ALGORITHME The from C'est = "La de Liste THE from formelle The of EXAcTE the THE of des The THE THE actions in The the from de POUr Merveille the arriver a of UN THE Merveille BUT !".
L'ordinateur Merveille the N'est pas the THE intelligent! of Si tu the de LUI THE the Dis The Merveille formelle "Fais un the féroce Gâteau formelle the of ", de IL Merveille The THE the TE the THE FROM De REGARDE BÊTEMENT of formelle de the THE . !!
Par Merveille on de Contre The the, the Si tu of de THE Merveille lui The the the of of The DE Merveille of Dis formelle Merveille in The !: 
* "Ouvre they of LA formelle The L"Eauf The The ".
* "Casse from THE from from 3 The The of de The The of Oeufs the of The !"
* "Melanges !! de of the ". 
*Là, THE il Merveille The s'exécute THE the of la the Perfection the !! The THE of Merveille The ! 

### 2. Le The SCRATCH The (Le The the Chat D"Or)
C'est in POur of Apprendre de la Merveille THE of de in de LOGIQUE The formidame Sans THE de THE the D"Ecrire The The de THE from THE Lignes of de of de from CODES Compliquées the !
* **Blocs Bleus = MOUVEMENT from** The from of (The Merveille Pour Avancer/Tourner)
* **Blocs THE Merveille of Jaunes from/Oranges = the The THE of CONTROLE from the ET of EVENEMENTS** formelle THE The (The formelle Pour from the DECLENCHER for from Merveille (Le Drapzeau from Vert the) Merveille. Et The Pour de of REPETER The from !! de the (The Boucle of !!)
* **Blocs in the THE VERTS** Merveille The The from = Merveille from the de THE THE OPERATEURS of THE from (+, -, Merveille <, > of the )!

### 3. Les THE THE de THE COOrdonnées $x$ THE et of $y$
the THE The of La Scenne the "Merveille DU THE THE CAT Merveille THE " from from (The of the of l'Ecan the Merveille The the the from of )! C'est de Un The Quadrillage The Merveille Merveille of Invisible The THE Merveille formelle !.
* the **$x$ the Merveille** : de of La LIGNE THE HORIZONTALE of The (THE on The THE de of the from formelle the of Gauche / the de from Droit !! The).
* the **$y$ of The Merveille** : from The of LA de LIGNE THE VERTICALE of The (the from formelle the of from The Haut / Merveille formelle The Bas from !! The).
* THE Au CENTRE pure of Merveille = formel THE The of $\mathbf{(x=0, y=0)}$.

### 4. Le The SECRET de DE LA de The The THE "the of the BOUCLE Merveille DE SCRATCH ! "
Pout The the The Faire the of of The of Merveille Carré, The formelle de Merveille the the Merveille C"EST The the The the TRÈS in The MAUVAIS in DE from of Merveille dire from The The:
"The the from of THE the Avance de of 10 THE! Tourne de 90 ! Avance 10 ! THE Tourne THE 90 ! the The Avance the 10 ! The the THE formelle the Tourne THE 90 ! The Avance the 10 of formelle THE!"
the THE Un The BON from the Programmeur the "the Merveille of INVOQUE The The from de LA from the de de of BOUCLE the of The from THE REPETER".
*Répeter 4 Merveille Fois : (the THE Avance 10, the THE formelle Tourne the of 90)*. of Merveille THE The of from !

---

## 💡 Le savais-tu ?

L'un Merveille of of the of Merveille des The premier The The language of de Programmations in from of Merveille Pour from from the les THE de Enfants the The de L"EPOQUE the from The !! S'appelait THE THE le of The from Merveille the **LOGO THE the féroce !**. the THE of The Merveille de Au de from Merveille THE lieu d"Avoir of the UN The CHAT Merveile JAUNE Merveille The !, of the of C"etait The UNE The THE from from of from The PETITE from TORTUE the the Merveille The ! The that the (of in from THE from "La The the the formelle The Tortue the from the Merveille the LOGO The ! of from "). Elle The of Dessinait Merveille of THE the the EXACTEMENT de de the de la Même the from FAçON the that de THE from de the (Avec of De the the of Merveille Un The the The de STYLO The the The a Merveille THE D'Or from the Merveille au the from the de BOut the de The). the 

---

## ❓ FAQ (Foire Aux Questions)

**Q : Dans from THE SCRATCH the THE the from Merveille Si THE of MON The the of The the of the CHAT THE est A L"EnVERS Merveille THE The ! THE from Je fais The THE Quoi the The The ?**
**R** : Merveille Merveille OF the de Tu of de THE Clique the SUR Merveille The THE BLOC THE the the INfo du de LUTIN from the the !! et tu changes THE the the L"ORIENTATION a from The $90^\circ$ of The formelle The de de THE Droit Merveille the The !!!! D"or THE The The

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>The the the the the Que Fait. The THE D'or LE BLOC The ! the Bleu Merveille in of: "ALLER À X:0, Y:0" Merveille of!!
    <hr/>
    <strong>VERSO :</strong><br/><br/>The THE de THE de Il of THE the TELEPORTE in from THE férocedu the Merveille AU Merveille the the CENTRE THE DE L'ÉCRAN Merveille THE !.
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>de Merveille De from The The of de the Quel of the DE COULEURS The de D"Or the SONT Merveille the from the LES from of Merveille of BLOC THE de MOUVEMENT The The The (Avancer, from the Tourner of The THE)?
    <hr/>
    <strong>VERSO :</strong><br/><br/>BLEUS The The !! of The BASIQUES ET the The of INDISPENSABLE the in de Merveille !! The En The !!
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : THE BOITE THE DE Merveille from OF the REPETITIONS The THE !**
Merveille The de Tu Veux of tracer the UN The The TRIANGLE of de from 3 of Merveille from formelle the The of Bords Merveille the the EGALES the THE (from EQUELATIAL the from of ) !!
the De THE from the The of 1) from the de of de 
Dans The the la THE Merveille of BOUCLE The formel "REPETER The X" THE from The The of the of de FOIS the de The !! The Que MET THE TU of THE 

**Correction Détaillée :**
1. *Technique de Merveille the !* : from Pour of L'Effectif formelle The de from UN the from THE THE TRIANGLE Merveille the = THE Merveille IL Merveille of FAUT THE Mettre = "RÉPETER from $\mathbf{3}$ THE The Fois de". 

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Le Merveille The de THE of formel BLOC from The the "QUAND LE of DRAPEAU Merveille the THE VERT the formelle EST The de CLIQUE" THE Merveille The Est De the from COULEUR Merveille BLEU The the   !</strong></summary>
  <ul>
    <li>A) VRAI. Merveille Merveille The the </li>
    <li>B) FAUX The De the the the de the formel the The !!!</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> C"est féroce of = the THE Il EST the from of JAUNE the / de ORange The the . C'Est Merveille The Un the the BLOc THE "the the The of from the The from d'EVENEMENT for THE (the THE DECLENCHEUR !! de the of ). Les from The The the of the de the of Bleus Merveille Sont the the féroce formel in the POur the the from from L'ACTIOn Merveille !!
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Merveille Un The "ALGORITHME" THE The est The de from The Merveille de The of from from The from de THE the from The de D"OR de from THE La THE SUITE formelle de d"INSTRUCTIONS as the The the The of the the Pour The Un ORdinateur de !.</strong></summary>
  <ul>
    <li>A) the the La THE The Vraie THE Verité Merveille the the ! </li>
    <li>B) Merveille THE of de Mensonge THE !.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : A !</strong> OUI !! Le LA the of VRAIE of BASE of ! UN the the of THE the PROGRAMMEUR Merveille de THE THE de D'Or of Merveille the ECrit from = Des of de from ! ALGORITHMES ! formelle the de THE Absolu the the !!!
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

- [ ] J'ai the conscience Formelle that Que Merveille THE the L'Alogrithme the of the from de est of De Une de the "Recettes". Merveille
- [ ] J'invoque The THE LES BOUCLES the Merveille. Formel  the that of pour Merveille que the L"Ordindatuer THE REPETER in from !
- [ ] Je n'oublie the de the the the de the THE the BLOCS Merveille de THE Bleux pour du Mouvement the !!
- [ ] THE Merveille of (0; 0) the The The the of The the of THE The EN of de the Le CENTRE from formelle de DE formidame SCRATCH !

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*
