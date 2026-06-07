---
title: 'Chapitre 3 : Les Fractions'
level: College
subLevel: 6eme
order: 3
---
# Chapitre 3 : Les Fractions

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Vocabulaire Numérateur/Dénominateur (CM1), savoir diviser.  

---

## 🎯 Introduction Pédagogique

Pourquoi s'encombrer de "nombres superposés" ? 
Parce que les fractions sont les nombres les plus parfaits et précis qui existent. Si tu divises 1 par 3 avec ta calculatrice, le résultat $0,33333333...$ n'en finit jamais et est donc toujours imprécis. La seule façon d'être mathématiquement **parfait** sans aucune erreur, c'est d'écrire $\frac{1}{3}$.

Dans la vraie vie, l'utilisation de parts égales est partout : "il reste trois quarts du trajet", "cet article est à moitié prix", "ajoutez un tiers de litre de lait". Comprendre les fractions, c'est maîtriser la notion de partage absolu, qui te servira plus tard pour les probabilités, la chimie, et même la musique (les notes sont aussi des fractions de temps !).

---

## 🎨 Schéma Pédagogique Interactif : Le Gâteau des Fractions

Observe comment couper une unité de plus en plus finement permet de découvrir des fractions parfaitement égales ! 1 part sur 2, c'est exactement la même quantité à manger que 2 parts sur 4.

<div align="center">
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="background:#fdf4ff; border-radius:12px; border: 2px solid #e879f9;">
  
  <text x="200" y="30" font-family="sans-serif" font-weight="bold" fill="#a21caf" font-size="18" text-anchor="middle">L'égalité secrète des Fractions</text>
  
  <!-- Les 3 cercles/Gâteaux -->
  
  <!-- Gâteau 1 : 1/2 -->
  <g transform="translate(60, 120)">
    <!-- Base -->
    <circle cx="0" cy="0" r="40" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>
    <!-- Moitié mangée -->
    <path d="M 0,-40 A 40 40 0 0 1 0,40 L 0,0 Z" fill="#ec4899" />
    <line x1="0" y1="-40" x2="0" y2="40" stroke="#be185d" stroke-width="2"/>
    <text x="0" y="70" font-family="monospace" font-weight="bold" font-size="16" fill="#be185d" text-anchor="middle">1 / 2</text>
  </g>

  <!-- Ligne égalité -->
  <text x="130" y="125" font-family="monospace" font-weight="bold" font-size="20" fill="#a21caf" text-anchor="middle">=</text>

  <!-- Gâteau 2 : 2/4 -->
  <g transform="translate(200, 120)">
    <circle cx="0" cy="0" r="40" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>
    <!-- 2/4 mangés -->
    <path d="M 0,-40 A 40 40 0 0 1 0,40 L 0,0 Z" fill="#ec4899" />
    <!-- Lignes de coupe en 4 -->
    <line x1="0" y1="-40" x2="0" y2="40" stroke="#be185d" stroke-width="2"/>
    <line x1="-40" y1="0" x2="40" y2="0" stroke="#be185d" stroke-width="2"/>
    <text x="0" y="70" font-family="monospace" font-weight="bold" font-size="16" fill="#be185d" text-anchor="middle">2 / 4</text>
  </g>

  <!-- Ligne égalité -->
  <text x="270" y="125" font-family="monospace" font-weight="bold" font-size="20" fill="#a21caf" text-anchor="middle">=</text>

  <!-- Gâteau 3 : 4/8 -->
  <g transform="translate(340, 120)">
    <circle cx="0" cy="0" r="40" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>
    <!-- 4/8 mangés -->
    <path d="M 0,-40 A 40 40 0 0 1 0,40 L 0,0 Z" fill="#ec4899" />
    <!-- Lignes de coupe en 8 -->
    <line x1="0" y1="-40" x2="0" y2="40" stroke="#be185d" stroke-width="2"/>
    <line x1="-40" y1="0" x2="40" y2="0" stroke="#be185d" stroke-width="2"/>
    <line x1="-28" y1="-28" x2="28" y2="28" stroke="#be185d" stroke-width="2"/>
    <line x1="-28" y1="28" x2="28" y2="-28" stroke="#be185d" stroke-width="2"/>
    <text x="0" y="70" font-family="monospace" font-weight="bold" font-size="16" fill="#be185d" text-anchor="middle">4 / 8</text>
  </g>

  <!-- Explication animée -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.2;0.8;0.9;1" dur="10s" repeatCount="indefinite"/>
    <rect x="50" y="210" width="300" height="30" rx="5" fill="#fce7f3" stroke="#f472b6" stroke-width="1"/>
    <text x="200" y="230" font-family="sans-serif" font-weight="bold" fill="#be185d" font-size="12" text-anchor="middle">×2 au Numérateur ET Dénominateur = Même taille !</text>
  </g>

</svg>
</div>

---

## 🔁 Rappels Utiles

- **Numérateur** (Nuages) : Le nombre du **haut**. C'est combien de parts on prend en tout !
- **Dénominateur** (Dessous des eaux) : Le nombre du **bas**. C'est en combien de morceaux on a tronçonné l'unité au départ.
- **Le lien du Sang** : Un barre de fraction N'EST RIEN D'AUTRE qu'un simple bouton de Division ("$\div$").

---

## 📚 Théorie Enrichie

### 1. La fraction comme un super-partage
C'est le sens de base : on coupe une unité en parts STRICTEMENT égales.
*Exemple : $\frac{3}{4}$ d'une pizza signifie qu'on a coupé l'intégralité de la pizza en $4$, et qu'on en a sauvé $3$ parts.*

### 2. Le multiplicateur magique de grandeur
Imagine la barre de fraction comme un gros $\div$.
**Formule Secrète** : $\frac{a}{b} = a \div b$.
*Exemple : $\frac{3}{4} = 3 \div 4 = 0,75$.*
C'est pour cela que `10 / 2` est "une fraction", mais qui vaut crânement un superbe `5`.
*Note : On a jamais, Ô grand jamais, le droit de diviser par zéro ! Le chiffre zéro n'apparaîtra donc jamais au dénominateur !*

### 3. Savoir maîtriser l'égalité 
Des fractions peuvent avoir des têtes différentes, mais cacher la même quantité sous un masque.
Pour trouver et prouver une "Égalité Fractionnaire", tu as une seule règle absolue : **Tu dois multiplier (ou diviser) le haut ET le bas, de façon parfaitement simultanée, par le même nombre**.
- *Exemple : $\frac{1}{2}$ c'est comme $\frac{1 \times 5}{2 \times 5}$, soit la belle fraction $\frac{5}{10}$.*

### 4. Placer sur une demi-droite graduée
Pour placer $\frac{4}{3}$ sur le papier :
1. Sur les gros traits de construction (0, 1, 2, etc.), tu décides de couper les écarts (unités) en **3 sous-sections** (car le dénominateur est 3).
2. Depuis le grand 0 noir, tu sautes par dessus **4 sous-sections** et tu fais ta marque rouge !
*On remarque que ce fameux point est au delà du 1 : effectivement $4$ est plus puissant que $3$ (Numérateur plus grand), donc le tout est supérieur à une unité !*

### 5. Prendre une fraction d'une quantité
Pour calculer mentalement "les $\frac{2}{3}$ de 60" :
1. On divise d'abord la grosse quantité brute par le bas (les parts de base) : $60 \div 3 = 20$.
2. On multiplie en apothéose par le haut (combien on en veut) : $20 \times 2 = 40$.
*C'est bouclé : Les deux tiers de 60 font 40 !*

---

## 💡 Le savais-tu ?

Le mot "fraction" vient du mot latin *fractio*, qui signifie "briser" ou "rompre". Au Moyen Âge, on appelait même les nombres décimaux des "nombres rompus" ! Fait étonnant, les mythiques Égyptiens de l'Antiquité, pourtant bâtisseurs de pyramides, n'aimaient utiliser que des fractions avec un "1" en haut (comme $\frac{1}{2}$, $\frac{1}{3}$, $\frac{1}{4}$). Pour écrire $\frac{3}{4}$ (qui était alors interdit chez eux), ils devaient trouver l'addition qui fonctionne. Ils gravaient donc sur le papyrus : $\frac{1}{2} + \frac{1}{4}$ !

---

## ❓ FAQ (Foire Aux Questions)

**Q : Pourquoi c'est l'Apocalypse totale si on tente de mettre 0 au dénominateur ?**
**R** : Si tu as un tas de 10 bonbons en or, comment les distribuer à ... "Zéro personne" ? S'il n'y a littéralement personne dans la pièce temporelle, la distribution des objets est impossible et la question n'a "pas de sens logique ou dimensionnel". D'où le fait que l'opération plante toutes les calculatrices (Erreur "Div by Zero").

**Q : Est-ce que $\frac{4}{4}$ c'est la même chose que 1 ?**
**R** : Strictement ! Tu viens de couper l'or en 4 lingots et tu pars dans la nuit avec ces 4 lingots ! Tu as l'intégralité du butin sur toi. L'entier. Le 1.

**Q : Doit-on toujours diviser "le grand nombre par le petit" ?**
**R** : Ah l'horrible piège ! NON. Il faut diviser "le numérateur" (Le Haut) par le "Dénominateur" (Le Bas), point. $\frac{2}{10}$, c'est petit sur grand. C'est $2 \div 10 = 0,2$ ! Il n'y a pas de sélection par grandeur en division.

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Où se lit le nombre de parts dans lequel on a découpé le gâteau de départ ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>Au Dénominateur (en bas de la barre).
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Comment savoir, d'un simple un coup d'œil très rapide, que la fraction 18 / 37 est plus petite que le nombre 1 ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>C'est immédiat : le numérateur 18 est plus petit que 37. On ne pourra donc pas reconstituer une unité !
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : La Ligne du Temps des Fractions**
1. Dessine une ligne, marque au feutre l"Unité Zéro" (le très gros `0`), l'Unité Un (`1`) et l'Unité Deux (`2`).
2. Marque un sous-graduage pour diviser par morceaux de quarts (donc 4).
3. À la plume de feu, place : $A = \frac{1}{4}$ ; $B = \frac{5}{4}$ ; $C = \frac{8}{4}$.
Que remarques-tu sur C ?

**Correction Détaillée :**
1. *Brouillon mental* : Chaque unité a 4 marques, car c'est des dénominateurs en Quarts.
2. Pour A, je me décale de 1 trait après le zéro (Haut=1). Pour B, de 5 traits après le 0 (Je vais donc atterrir après le gros trait "1").
3. *Le Mystère C :* Si je place C, je saute de 8 graduations depuis l'origine (ou l'Unité). $8$ sauts de $1/4$, j'atterris exactement, et au millimètre près, sur la Grosse marque du chiffre 2 entier ! Et pour cause !! **$8 \div 4 = 2$ !** L'aventure est sauvée !

**Exercice 2 : La Potion du Ravitailleur**
Sur ton manuel secret de potions magiques, on te demande d'extraire de l'élixir afin d'obtenir **les $\frac{3}{5}$ de 20 décilitres** pour guérir la blessure du héros. Quelle est cette mesure pure ?

**Correction Détaillée :**
1. J'applique l'algorithme "fraction d'une quantité".
2. Je trouve la force de la "quantité de base d'1 part" en divisant la racine par le Dénominateur de l'élixir : $20 \div 5 = 4$. Une part magique vaut $4$ dl.
3. Je multiplie le fruit de mon labeur par le Numérateur (le nombre de fiole voulues qui est 3) : $4 \times 3 = 12$.
4. J'aurai l'immense honneur d'enfermer et transporter **12 décilitres** purs au héros.

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Mettre au Numérateur le zéro ($0/5$) crée instantanément une implosion fatale et ce nombre ne peut pas exister.</strong></summary>
  <ul>
    <li>A) OUI, C'est la FIN de l'univers !</li>
    <li>B) Absolument faux, c'est légal.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Avoir $0$ au Numérateur (En HAUT) c'est totalement légal ! Ça veut juste dire "Je partage mon or en 5, et je te donne ... zéro parts". Zéro. $\frac{0}{5} = \mathbf{0}$. L'implosion fatale c'est le contraire, mettre le Zéro en BAS.
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Le videur méchant ne laisse entrer dans son royaume que les fractions "strictement plus petites" que $1$. Qui entre en rampant ?</strong></summary>
  <ul>
    <li>A) $4/3$</li>
    <li>B) $7/7$</li>
    <li>C) $1/10$</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : C !</strong> Seule la $C$ a un puissant Dénominateur au fond qui est 10 face au petit ridicule 1 du haut ($1 \div 10 = 0,1$). De fait $\frac{1}{10} < 1$. Notons que $\frac{7}{7}$ vaut exactement 1 tout pile, donc il n'est pas "strictement plus petit" !
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 3 : On peut multiplier le Numérateur par 10 et le Dénominateur par 2 pour trouver une fraction qui a exactement le même périmètre de base !</strong></summary>
  <ul>
    <li>A) Vrai, super astuce</li>
    <li>B) Faux, sacrilège complet</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Pour qu'une fraction garde strictement sa "même quantité de base", on doit *obligatoirement* l'arroser via la Multiplication Haut et Bas par le **Strict Même Nombre** (ici 10 et 10,  ou 2 et 2).
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Je sais ce qu'est le Numérateur (Haut) et le Dénominateur (Bas).
- [ ] J'ai compris l'utilité des multiplications simultanées haut-bas pour trouver des copains égaux (comme 1/2 = 2/4).
- [ ] J'ai compris que la fraction est un portail de division basique !
- [ ] Je sais trouver une fraction à partir d'une quantité totale de référence.

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*

