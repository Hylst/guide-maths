---
title: 'Chapitre 2 : Opérations sur les nombres décimaux'
level: College
subLevel: 6eme
order: 2
---
# Chapitre 2 : Opérations sur les nombres décimaux

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Nombres entiers et décimaux (Chapitre 1), addition, soustraction et multiplication d'entiers.  

---

## 🎯 Introduction Pédagogique

Savoir poser une addition, c'est utile. Savoir faire des calculs précis avec des nombres à virgule, c'est indispensable dans notre monde moderne ! Dès que tu sors de ta maison (aller au supermarché, calculer une moyenne de vitesse sur ton vélo, ou même construire une maquette), les choses sont rarement parfaites : elles tombent "entre les nombres entiers". 

La maîtrise absolue des additions, soustractions et multiplications de décimaux fera de toi quelqu'un d'impossible à arnaquer au marché et t'ouvrira les portes des sciences appliquées (comment doser un médicament ? comment calculer la résistance d'un câble ?). 

---

## 🎨 Schéma Pédagogique Interactif : L'Alignement

La plus grande cause d'erreur au collège lors des additions, c'est le **décalage**. Regarde pourquoi la virgule agit comme un mur infranchissable dans l'addition et la soustraction !

<div align="center">
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="background:#fffbeb; border-radius:12px; border: 2px solid #fbbf24;">
  
  <text x="200" y="30" font-family="sans-serif" font-weight="bold" fill="#b45309" font-size="18" text-anchor="middle">Le Mur de la Virgule</text>
  
  <!-- Ligne verticale rouge (Le Mur) -->
  <line x1="240" y1="60" x2="240" y2="180" stroke="#ef4444" stroke-width="4" stroke-dasharray="8,4"/>
  <text x="240" y="50" font-family="sans-serif" font-weight="bold" fill="#ef4444" font-size="12" text-anchor="middle">Le Mur (,)</text>

  <!-- Opération 14,5 + 3,82 -->
  
  <!-- Nombre 1: 14,5(0) -->
  <text x="170" y="100" font-family="monospace" font-weight="bold" font-size="28" fill="#1e293b" text-anchor="middle">14</text>
  <text x="240" y="100" font-family="monospace" font-weight="bold" font-size="28" fill="#ef4444" text-anchor="middle">,</text>
  <text x="260" y="100" font-family="monospace" font-weight="bold" font-size="28" fill="#1e293b" text-anchor="start">5</text>
  
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.2;0.3;0.9;1" dur="8s" repeatCount="indefinite"/>
    <text x="280" y="100" font-family="monospace" font-weight="bold" font-size="28" fill="#3b82f6" text-anchor="start">0</text>
    <text x="320" y="95" font-family="sans-serif" font-weight="bold" fill="#3b82f6" font-size="12" text-anchor="start">← Zéro utile</text>
  </g>

  <!-- Signe Plus -->
  <text x="100" y="140" font-family="monospace" font-weight="bold" font-size="28" fill="#b45309" text-anchor="middle">+</text>

  <!-- Nombre 2: 3,82 -->
  <text x="210" y="140" font-family="monospace" font-weight="bold" font-size="28" fill="#1e293b" text-anchor="middle">3</text>
  <text x="240" y="140" font-family="monospace" font-weight="bold" font-size="28" fill="#ef4444" text-anchor="middle">,</text>
  <text x="260" y="140" font-family="monospace" font-weight="bold" font-size="28" fill="#1e293b" text-anchor="start">82</text>

  <!-- Trait égal -->
  <line x1="80" y1="160" x2="320" y2="160" stroke="#1e293b" stroke-width="3"/>

  <!-- Résultat -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;0;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="8s" repeatCount="indefinite"/>
    <text x="170" y="210" font-family="monospace" font-weight="bold" font-size="28" fill="#10b981" text-anchor="middle">18</text>
    <text x="240" y="210" font-family="monospace" font-weight="bold" font-size="28" fill="#ef4444" text-anchor="middle">,</text>
    <text x="260" y="210" font-family="monospace" font-weight="bold" font-size="28" fill="#10b981" text-anchor="start">32</text>
  </g>

</svg>
</div>

---

## 🔁 Rappels

Avant de commencer, tu dois te souvenir de :
- **L'alignement** : Le chiffre des unités d'un nombre doit TOUJOURS se trouver en dessous (ou au-dessus) du chiffre des unités de l'autre nombre !
- **Les Zéros Magiques** : $4,5$ est strictement identique à $4,50$ ou à $4,500$. Les zéros ajoutés tout à droite ne changent rien à la valeur, mais sauvent la vie pour les alignements !
- **Ordre de Grandeur** : C'est le fait d'arrondir un nombre pour "estimer" la valeur. 

---

## 📚 Théorie Enrichie

### 1. Addition et Soustraction, le pouvoir de l'alignement
Le principe ne change jamais : **on aligne le mur des virgules** de façon très stricte.
1. Aligne verticalement les unités avec les unités (et donc les virgules).
2. Complète par des $0$ si besoin pour que tous les nombres aient la même "largeur".
3. Place la virgule du résultat dans la stricte continuité du mur.
*Méthode infaillible pour une soustraction : on met TOUJOURS le grand nombre en HAUT !*

### 2. La Multiplication : Les virgules fantômes
Dans une multiplication, **ON N'ALIGNE PAS LES VIRGULES**. 
1. Pose et effectue la multiplication globale en effaçant mentalement les virgules. Agis exactement comme si tu avais de gros nombres entiers !
2. À la toute fin, sur ton résultat, **compte collectivement** combien il y avait de chiffres après la virgule dans la ligne 1 ET dans la ligne 2.
3. Si le total fait, par exemple, "$3$ chiffres après la virgule au total", alors tu décales la virgule vers la gauche de "$3$ crans" sur ton produit final !

### 3. La Division de haute précision
La division classique a des restes. C'était bien en primaire... Mais maintenant, tu vas pouvoir utiliser la virgule pour continuer de distribuer !
- Effectue ta division normalement.
- Lorsque tu n'as plus d'entier à abaisser, et qu'il y a un reste : mets une **virgule** au quotient, abaisse un fier **zéro (0)** virtuel à côté de ton reste... et continue !

### 4. Ordre de grandeur (Pour éviter le ridicule)
Si tu multiplies `9,98` par `5,1`, c'est long. Mais en une seconde, tu peux te dire que $9,98$ c'est proche de $10$, et $5,1$ c'est proche de $5$. 
$10 \times 5 = 50$. Ton résultat final sera obligatoirement proche de $50$ ! L'ordre de grandeur est ton alarme anti-erreur.

---

## 💡 Le savais-tu ?

Avant l'invention fantastique de la virgule (vers l'an 1600 par les premiers mathématiciens modernes), les calculs complexes pour le commerce étaient d'une lourdeur infinie. Certains écrivaient les chiffres décimales dans des cercles imbriqués, d'autres utilisaient des couleurs d'encre différentes pour les unités, les dixièmes ou les millièmes ! C'est le mathématicien flamand **Simon Stevin** qui l'a inventé, révolutionnant ainsi la construction navale et le commerce de son époque !

De plus, l'informatique a un secret effroyable : certains nombres décimaux sont absolument impossibles à coder d'une façon parfaite pour un ordinateur classique. Par exemple, si tu demandes à de nombreux ordinateurs de calculer `0,1 + 0,2`, ils répondront `0,30000000000000004` à cause de failles en langage binaire !

---

## ❓ FAQ (Foire Aux Questions)

**Q : Pour soustraire, est-on vraiment obligés d'ajouter des Zéros ?**
**R** : Si le nombre du BAS a plus de décimales, OUI c'est indispensable. Essayer de faire mentalement `14,2 - 3,18` sans poser `14,20 - 3,18` c'est t'exposer à faire l'erreur classique d'abandonner le 8 ! Avec le zéro, ça devient `10 - 8`, et on voit la retenue ! 

**Q : Que se passe-t-il si je place mal ma virgule à la fin d'une multiplication ?**
**R** : C'est catastrophique pour le sens physique réel du calcul ! C'est la différence entre le prix d'une baguette de pain (1,20 €) et le prix d'un billet d'avion pour la Russie (1200,00 €). Si le médecin se trompe de virgule, il injecte 10 fois la dose ! 

**Q : Dans une division, le dividende et le diviseur ne peuvent être tous les deux "à virgule" ?**
**R** : C'est un grand secret mathématique : les savants DÉTESTENT diviser par un nombre à virgule. Si cela t'arrive (ex $4,5 \div 1,5$), tu multiplies obligatoirement les DEUX nombres par 10 ou 100 pour retirer la virgule au diviseur ! ($45 \div 15$). 

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Pour additionner et soustraire deux décimaux, quelle est la LOI numéro 1 ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>Il faut aligner les virgules les unes sous les autres.
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Comment trouve t-on mentalement un résultat approché rapide (Ordre de grandeur) de 19,8 x 2,1 ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>On arrondi ! 19,8 devient 20. 2,1 devient 2. Le calcul 20 x 2 = 40. Le résultat sera d'environ 40.
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : La Caisse du Marché**
Tu achètes au marché un livre à **12,50 €** et une figurine à **4,85 €**. 
1. Estime le prix mentalement.
2. Pose précisément le calcul pour connaître le total exact que tu dois payer. (Fais-le sur feuille de brouillon).
3. Tu payes avec un super billet de **20 €**. Quelle monnaie précise va-ton te rendre ?

**Correction Détaillée :**
1. *Ordre de Grandeur* : $12,50$ c'est super proche de $13$. Et $4,85$ c'est très proche de $5$. $13 + 5$ = Environ $18 €$.
2. *Le Prix Précis (Addition)* : J'aligne les virgules !
   - $12,50$ 
   - $ +\ 4,85$ 
   - J'additionne par colonnes en partant de la droite : $0+5=5$ puis $5+8=13$ (j'écris 3 je retiens 1) puis $2+4+1=7$. L'unité du $1$ reste à $1$. Le Mur de virgule redescend : Total **17,35 €**.
3. *Le Rendu Monnaie (Soustraction)* : Je soustrais mon achat à mon billet.
   - $20,00$ *<- J'ai le droit (et l'obligation) d'ajouter `,00` pour équilibrer.*
   - $ -\ 17,35$
   - $10 - 5 = \mathbf{5}$ (je retiens 1 sur le $3$, qui devient un $4$)
   - $10 - 4 = \mathbf{6}$ (je retiens 1 sur le $7$, qui devient un $8$)
   - $10 - 8 = \mathbf{2}$ (je retiens 1 sur le $1$, qui devient un $2$)
   - $2 - 2 = \mathbf{0}$. Mur de virgule à sa place. Le compte exact est : **2,65 €**.

**Exercice 2 : La Superficie Fantôme**
Un paysagiste délimite un terrain rectangulaire parfait : La largeur fait $3,1 \text{ m}$ et la longueur $12,5 \text{ m}$. L'aire d'un rectangle est sa longueur multipliée par sa largeur. Calcule précisément son Aire. 

**Correction Détaillée :**
1. *La Multiplication Cachée* : Nous allons faire fi des virgules, par le calcul $125 \times 31$ !
2. *La Potence de l'Ombre* : 
   - $125 \times 1 = \mathbf{125}$
   - Je mets un zéro pour dire que je passe aux dizaines.
   - $125 \times 3 = \mathbf{375}$ (avec mon zéro, ça fait $3750$).
   - $125 + 3750 = \mathbf{3875}$.
3. *Appel à la Magie Décimale* : "Il y a combien de chiffres total derrière la virgule au départ ?" $12,5$ (il y a le 5) et $3,1$ (il y a le 1). **Soit DEUX au total**. 
4. *Résultat* : Mon résultat $3875$ va donc être frappé par DEUX décalages depuis la droite. Le nombre est : **38,75 mètres carrés !**

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Pour l'opération de multiplication ($1,2 \times 3,5$), l'alignement strict du mur des virgules est absolument obligatoire.</strong></summary>
  <ul>
    <li>A) Vrai, sinon l'Univers s'effondre.</li>
    <li>B) Faux, on fait semblant qu'elles ne sont pas là.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Le "Mur de la Virgule" n'est obligatoire QUE pour l'Addition et la Soustraction ! Pour la multiplication, on tasse tous les chiffres à droite comme des entiers, on calcule, puis on replace la virgule tout à la fin en comptant le cumul des chiffres.
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Le calcul mental $0,2 \times 0,2$ donne pour résultat final $0,4$.</strong></summary>
  <ul>
    <li>A) L'affirmation est vraie, c'est $4$.</li>
    <li>B) Faux ! Mais de très peu !</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> L'erreur d'inattention fatale. $2 \times 2 = 4$. Mais attention : Il y a "UN" chiffre après la virgule dans le premier, et "UN" chiffre après la virgule dans le deuxième. Donc "DEUX" chiffres décimaux pour la fin. Ainsi le résultat est $0,04$.
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 3 : Lors d'une division, le "Reste" (le petit nombre tout en bas) devrait pouvoir être plus grand que le Diviseur (le nombre dans l'oreille de la potence) si l'infinité est requise.</strong></summary>
  <ul>
    <li>A) VRAI</li>
    <li>B) FAUX</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B (Faux) !</strong> C'est la Règle d'or absolue de la division. Si le reste est plus grand que le diviseur, ça veut dire que tu aurais pu encore distribuer au moins "1 paquet" supplémentaire ! Ton calcul comportait une anomalie la ligne au-dessus.
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Je sais aligner mes virgules (et mes zéros) lors d'une addition et soustraction.
- [ ] J'ai compris l'astuce de compter l’intégralité des décimales à la fin d'une multiplication posée.
- [ ] Je connais le mécanisme pour estimer l'ordre de grandeur et valider mon résultat !
- [ ] Je maîtrise l'ajout de zéros magiques (`20 = 20,00`) et à quoi cela sert !

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*

