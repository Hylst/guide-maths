---
title: 'Chapitre 7 : Périmètres et Aires'
level: College
subLevel: 6eme
order: 7
---
# Chapitre 7 : Périmètres et Aires

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Mesure de longueurs, multiplication de décimaux, notion de surface (Primaire).  
**Objectifs** : 
- Différencier le périmètre (contour) et l'aire (surface).
- Calculer le périmètre d'un polygone et la longueur d'un cercle.
- Calculer l'aire d'un rectangle, d'un triangle rectangle et d'un disque.
- Effectuer des conversions d'unités de longueur et d## 🎯 Introduction Pédagogique

Si tu veux installer une clôture autour de ton jardin pour empêcher ton chien de s'enfuir, vas-tu acheter de la peinture pour recouvrir tout le sol gazonné de ton terrain ? Bien sûr que non ! La peinture couvre une surface, alors que la clôture fait tout le tour extérieur comme un cadenas.
C'est précisément l'abîme infranchissable entre l'**Aire** et le **Périmètre**. 
Beaucoup de gens confondent les deux. Or le **Périmètre** sert The dessiner "le Muret" extérieur de protection the, alors the que l'**Aire** est fait The pour s'occuper de "la Moquette" The the que l'on The pose a the Intérieur de formelle ! Maîtriser the ça, The c'est The être sûr de the ne pas acheter the 500 the kilomètres de moquette pour the recouvrir un simple the mur !

---

## 🎨 Schéma Pédagogique Interactif : Muret Vs Moquette !

Observe the bien. D'un the The côté the Périmètre (le Trait de the Contour), The et The The Haut the L'Aire The Vaste the The L'espace !!

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#fef2f2; border-radius:12px; border: 2px solid #ef4444;">
  
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#7f1d1d" font-size="16" text-anchor="middle">Périmètre (1D) vs Aire (2D)</text>
  
  <!-- LE PERIMETRE -->
  <g transform="translate(60, 80)">
      <rect x="0" y="0" width="100" height="80" fill="none" stroke="#dc2626" stroke-width="6" stroke-dasharray="100 80">
         <animate attributeName="stroke-dashoffset" values="360; 0" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="50" y="-15" font-family="sans-serif" font-weight="bold" fill="#dc2626" font-size="14" text-anchor="middle">LE PÉRIMÈTRE</text>
      <text x="50" y="45" font-family="monospace" fill="#7f1d1d" font-size="12" text-anchor="middle">(Le Contour)</text>
      <!-- Petites the unités formelle de force -->
      <line x1="-15" y1="40" x2="-5" y2="40" stroke="#dc2626" stroke-width="2"/>
      <line x1="105" y1="40" x2="115" y2="40" stroke="#dc2626" stroke-width="2"/>
  </g>

  <!-- LIGNE DE SEPARATION -->
  <line x1="225" y1="60" x2="225" y2="180" stroke="#fca5a5" stroke-width="3" stroke-dasharray="5 5"/>

  <!-- L'AIRE -->
  <g transform="translate(290, 80)">
      <rect x="0" y="0" width="100" height="80" fill="#fca5a5" stroke="#7f1d1d" stroke-width="2">
         <animate attributeName="fill-opacity" values="0; 1; 1; 0" dur="4s" repeatCount="indefinite" />
      </rect>
      
      <!-- Quadrillage Interne -->
      <path d="M 25,0 L 25,80 M 50,0 L 50,80 M 75,0 L 75,80 M 0,20 L 100,20 M 0,40 L 100,40 M 0,60 L 100,60" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
      <text x="50" y="-15" font-family="sans-serif" font-weight="bold" fill="#991b1b" font-size="14" text-anchor="middle">L'AIRE</text>
      <text x="50" y="45" font-family="monospace" fill="#7f1d1d" font-size="12" text-anchor="middle" opacity="0.8">(La Surface)</text>
  </g>

  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.2;0.8;0.9;1" dur="10s" repeatCount="indefinite"/>
    <rect x="30" y="210" width="390" height="25" rx="5" fill="#fee2e2" stroke="#f87171" stroke-width="1"/>
    <text x="225" y="227" font-family="sans-serif" font-weight="bold" fill="#b91c1c" font-size="12" text-anchor="middle">Le Périmètre c'est le grillage. L'Aire c'est The la force the Tuiles The au The sol !</text>
  </g>
</svg>
</div>

---

## 🔁 Rappels Utiles

- The **Règle absolue** : Savoir the Additionner formellement pour The le The the Contour. Et savoir  the Multiplier (Le Haut et the large) the pour the Tuiles !

---

## 📚 Théorie Enrichie

### 1. The Périmètre The D'or (Le The Tour !!)
Calculer le périmètre The the, c'est comme poser the Un fil de Fer the le The formel de Merveille the L'exterieur. On **additionne the tous the the Cotées féroces !**.
Son Unité s'exprime The The de Distance en the `Mètres` The (ou the cm).
* **Polygone quelconque the** : Je the fais The The Somme pure absolue = $Cote1 + Cote2 + Cote3$... Merveille !
* **Carré The de Or** The : $P = Côté \times 4$.
* **Rectangle puissant The** : $P = (Longueur + largeur) \times 2$.

### 2. The Le Céleste the the de Périmètre The the Cercle
Pour The Le Cercle, The c'est of de La folie formelle The the the : On the utilise the The Magie the the $\pi$ (Pi $\approx 3,14$).
**Formule Secrète de Longueur The !** : $Périmètre = 2 \times \pi \times Rayon$. (Ou The the $\pi \times Diamètre$).

### 3. The La Grande The AIRE (L"espace De Forme the intérieur)
C'est le gazon The the ! On PENSE THE EN "carré the the ! " d'un the the l'Unité magique est le the $cm^2$ The $m^2$. The Multiplier The base X de hauteur !
* **Carré of the Merveille The** : $Aire = Côté \times Côté$. (Et de pas X 4 Formel The !!!).
* **Rectangle THE féroce The** : $Aire = Longueur \times Largeur$ The .
* **Triangle Rectangle The** : C'est formellement of The la the "La de Moitié de of the THE the Rectangle The ". $Aire = (Base \times Hauteur) \div 2$.
* **Le The Disque The D'or Formel** : $Aire = \pi \times Rayon \times Rayon$.

### 4. La Barrière des Unités d'Aire (ATTENTION DANGER !)
Dans le de tableau de The simple Formel: Pour the the passer The the `m` à `dm` The The de of on The rajoute "1" Zéro The !.
MAIS The Dans THE les the Aires `m²`, Chaque Unité A DEUX The The de Colonnes ! 
*Exemple the de Feu :* The $1\text{ m}^2 = 100\text{ dm}^2 = 10\,000\text{ cm}^2$ !!! Le de Zéro "the Magique The The " the The the Compte formelle Double The !!

---

## 💡 Le savais-tu ?

Le majestueux The "Pi" The ($\pi$) c'est de l'Infini de The !! 3,14159265... Il ne they The formellement s'arrête The the ! Si tu the prends The LA la N'importe quel the the cercle (Petite de the The the Piece de monnaie ou the l'Équateur the the The the ! Terre the the !), Si The the divise The The son PÉRIMETRE the The absolu the The the par son of de The DIAMÈTRE the The the, Tu obtaining the the EXACTEMENT The THE $\pi$ Formel !!! The the Une perfection the The Universel pure absolu !!

---

## ❓ FAQ (Foire Aux Questions)

**Q : C'est the the Quoi La de La The the Différence Entre Un The Cercle et the the the Un The the The Disque de The The ?**
**R** : C'est L'Anneau contre l'Assiette The !. The de LE CERCLE the de est Juste The the la the "The Trace du the bord the The" ! Il the L'a the QU"UN PERIMÈTRE The. The DISQUE est The L'ASSIETTE PLEINE The The. The Le the The the Disque a of de une the AIRE of the formelle ! 

**Q : Dans un carré The the the formel, C'est d'Or The The Possible que The le The the l'Aire the de soit The Merveille The Plus Petite que de The The le the de The Périmètre The the ?**
**R** : OUI !!! The the Pour The the the Merveille Un The The Carré de $2\text{ cm}$ the de Coté the : Son Périmètre of the fait the de $2 \times 4 = 8\text{ cm}$. Alors The The The que de L'aire de D'or the The the Fait The $2 \times 2 = 4\text{ cm}^2$. ($8 > 4$). Il The n'y a the AUCUNE The relation de l'ordre absolu !

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Je the Peins The The Merveille the the Mon Mûr. Es ce de The the of que formel Je the the calcule the Le Contour De mon the Rectangle ou l'Aire Formel The the de Rectangle ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>L'Aire ! Car the tu The Remplis The Le de Le de Le THE Milieu The The de de la Formel The !
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Comment je calcule The Merveille L'Aire féroce d'un the formidabe the Triangle the The Rectangle posé Merveilleusement The !?
    <hr/>
    <strong>VERSO :</strong><br/><br/>C'est de The D'or Le "Demie-Rectangle" ! => (Base The the Merveille de la x Hauteur The formel) le Merveille The the the Divisé formel The the The the La par 2 !!!
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : the Le Champ de Maïs Merveilleux**
Le The Paysan formel possède the un formidabe The the Champ the Rectangle The The 10 Hauts the Mètres the The Sur 5 de Merveille the the the de Mètres the Le the!
1. the the Formule The féroce The Merveille the The pour Trouver le L'Aire de formelle the du MAïs !
2. The The Il de Faut de féroce un The Formel Clôture formel the Anti-Loup The the The the de la Merveille pour The ! the Merveille the Combien de The de mètres the The Formelle il the de Faut The The de de ?

**Correction Détaillée :**
1. *Technique de surface the* : C'est L'intérieur pur. Donc The Formule the Aire  Rectangle The : the Length * Hauteur The the = $10 \times 5 = 50$. Il the aura $\mathbf{50\text{ m}^2}$ the de of Terre D'or maïs !.
2. *L'Achat de clôture the* : C'est THE LA FRONTIERE Merveille that The EXterieure. the The = $2 \times (10 + 5) = 2 \times 15 = 30$. Il achètera Formellement The the $\mathbf{30}$ Mètres Purs de THE Clôture The formel the !!!.

**Exercice 2 : The L'Anneau du pouvoir THE (Cercle the divin The Formel of The the)**
Un grand the formel the Disque The The the Or a Un 10 The Merveille Rayon temporel absolu the Merveille The CM. The de the Quel the the est the le the the The Formel Périmètre de formidables !.

**Correction Détaillée :**
1. *La Formule in des the Cieux de The the Magie* : P = of the the $2 \times \pi \times Rayon$. The Merveille the !!!
2. *Le the Formidable THE the the Calcul absolu* : $2 \times 3,14 \times 10 = 62,8$. the L'anneau The L'Or totalisera The precisely of de Formidables The The **$62,8\text{ cm}$** the de de pourtout in The Merveille the Merveille.

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Le signe d'Unité formel merveille D'or du The Merveille Merveille The THE Aire l'espace, C'est The Céleste $cm$.</strong></summary>
  <ul>
    <li>A) VRAI the de the la belle of force </li>
    <li>B) FAUX The De the the the de the formel the The !!!</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Une The THE Merveille de Longueur the (The le Merveille The The the the The Périmètre Merveille of ) The formel en THE $\text{cm}$. The Mais THE LES AIRE Merveille Formelle s'exprime Merveille the the en de formida The THE EN CARRE DE DE $\mathbf{\text{cm}^2}$ formelle !!! L'erreur foudroyante par de base formelle.
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Dans le VASTE des the TABLEAU The de The Des de The The of Aires $\text{m}^2$... $1\text{ cm}^2 = 10\text{ mm}^2$ the L'évolution pure the formelle .</strong></summary>
  <ul>
    <li>A) Une the VERITE absolue formel. </li>
    <li>B) Mensonge du le The Diable Le the . The $1\text{ cm}^2 = 100\text{ mm}^2$ de Ciel!</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Magie THE de THE de The 2 Dimensions = the "The The of Deux de the ZERO par pure Unité" ! Le The La the 2 de $cm^2$ signifie de force DEUX ZEROS Merveille de D"évolution (The de Multiple ou divisons). Formel.
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

- [ ] J'ai the The conscience L'Aire the Merveille "Interieur The The Moquette de" de de The Formel et the "Clôture Périmètre the". 
- [ ] J'invoque Le Merveille The The $\pi$ pure formel de Pour the the les the The Formidable The Rond/Disques de the Merveille The !.
- [ ] Je n'oublie jamais The The Le "Divisé par of the $2$" the The pour Le THE The The Triangle The Rectangle the !
- [ ] Dans of the le Tableau THE Les the THE AIRES, The The Les de zéros The doublent Merveille!

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*