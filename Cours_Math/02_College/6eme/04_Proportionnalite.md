---
title: 'Chapitre 4 : La Proportionnalité'
level: College
subLevel: 6eme
order: 4
---
# Chapitre 4 : La Proportionnalité

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Multiplication, division, nombres décimaux.  

---

## 🎯 Introduction Pédagogique

Si tu achètes 1 baguette à la boulangerie pour $1\text{ €}$, combien vont te coûter 3 baguettes ? "Bah, $3\text{ €}$ !", me diras-tu sans hésiter. Félicitations, tu viens d'utiliser le principe de la **Proportionnalité**. 

C'est probablement le concept mathématique le plus utile de ta vie quotidienne. Savoir adapter les quantités d'une recette de crêpes quand des amis arrivent à l'improviste, calculer le temps de trajet restant lors des vacances, vérifier que la promotion du magasin n'est pas une arnaque... Tout cela repose sur le fait que certaines grandeurs augmentent ensemble selon le **même multiplicateur**. C'est le secret de l'équilibre parfait !

---

## 🎨 Schéma Pédagogique Interactif

Regarde ce tableau de proportionnalité pour des tickets de cinéma. Observe comment les coefficients agissent comme des multiplicateurs magiques, aussi bien en vertical qu'en horizontal.

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#f0fdf4; border-radius:12px; border: 2px solid #22c55e;">
  
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#166534" font-size="18" text-anchor="middle">La Magie des Coefficients</text>
  
  <!-- Tableau -->
  <!-- Lignes du tableau -->
  <line x1="50" y1="80" x2="350" y2="80" stroke="#15803d" stroke-width="2"/>
  <line x1="50" y1="120" x2="350" y2="120" stroke="#15803d" stroke-width="2"/>
  <line x1="50" y1="160" x2="350" y2="160" stroke="#15803d" stroke-width="2"/>
  
  <!-- Colonnes du tableau -->
  <line x1="50" y1="80" x2="50" y2="160" stroke="#15803d" stroke-width="2"/>
  <line x1="180" y1="80" x2="180" y2="160" stroke="#15803d" stroke-width="2"/>
  <line x1="260" y1="80" x2="260" y2="160" stroke="#15803d" stroke-width="2"/>
  <line x1="350" y1="80" x2="350" y2="160" stroke="#15803d" stroke-width="2"/>

  <!-- Textes du tableau -->
  <text x="115" y="105" font-family="sans-serif" font-weight="bold" fill="#1f2937" font-size="14" text-anchor="middle">Nombre de Tickets</text>
  <text x="115" y="145" font-family="sans-serif" font-weight="bold" fill="#1f2937" font-size="14" text-anchor="middle">Prix payé (€)</text>

  <text x="220" y="105" font-family="monospace" font-weight="bold" fill="#0f172a" font-size="16" text-anchor="middle">2</text>
  <text x="305" y="105" font-family="monospace" font-weight="bold" fill="#0f172a" font-size="16" text-anchor="middle">6</text>
  
  <text x="220" y="145" font-family="monospace" font-weight="bold" fill="#0f172a" font-size="16" text-anchor="middle">14</text>
  <text x="305" y="145" font-family="monospace" font-weight="bold" fill="#b91c1c" font-size="18" text-anchor="middle">?</text>

  <!-- Flèche verticale Coefficient -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.2;0.5;0.6;1" dur="6s" repeatCount="indefinite"/>
    <path d="M 370 95 A 30 30 0 0 1 370 145" fill="none" stroke="#eab308" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="410" y="125" font-family="monospace" font-weight="bold" fill="#eab308" font-size="14" text-anchor="middle">× 7</text>
    <text x="305" y="145" font-family="monospace" font-weight="bold" fill="#eab308" font-size="18" text-anchor="middle" style="background:#fff;">42</text>
  </g>

  <!-- Flèche horizontale Addition / Mul -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;0;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="6s" repeatCount="indefinite"/>
    <path d="M 235 90 A 20 20 0 0 1 290 90" fill="none" stroke="#3b82f6" stroke-width="3"/>
    <text x="262" y="80" font-family="monospace" font-weight="bold" fill="#3b82f6" font-size="14" text-anchor="middle">× 3</text>
    
    <path d="M 235 150 A 20 20 0 0 0 290 150" fill="none" stroke="#3b82f6" stroke-width="3"/>
    <text x="262" y="175" font-family="monospace" font-weight="bold" fill="#3b82f6" font-size="14" text-anchor="middle">× 3</text>
    
    <text x="305" y="145" font-family="monospace" font-weight="bold" fill="#3b82f6" font-size="18" text-anchor="middle" style="background:#fff;">42</text>
  </g>
</svg>
</div>

---

## 🔁 Rappels Utiles

Avant de commencer l'aventure :
- **Multiplier** c'est augmenter proportionnellement : par 2 (le double), par 3 (le triple).
- **Diviser** c'est réduire proportionnellement : par 2 (la moitié), par 3 (le tiers), par 4 (le quart).

---

## 📚 Théorie Enrichie

### 1. Qu'est-ce qu'une vraie situation de proportionnalité ?
Deux "grandeurs" sont proportionnelles si on passe TOUJOURS de l'une à l'autre en **multipliant par un même nombre fixe**.
* **OUI** : Le prix des tomates au marché est proportionnel à leur poids. Si j'en prends 2 fois plus lourd, je paie 2 fois plus cher.
* **NON** : Ta taille n'est pas proportionnelle à ton âge. À 10 ans, tu fais 1m40. À 20 ans, le poids des années fait que tu ne feras absolument pas 2m80 (le double) !

### 2. Le Tableau Opérationnel (et son Coefficient)
Pour résoudre des problèmes, on range souvent nos deux données (comme "Prix" et "Kilos") dans un tableau à deux lignes.
Le but du jeu est de trouver le **Coefficient de Proportionnalité**. C'est le multiplicateur magique caché qui te permet de passer "de la ligne du haut, à la ligne du bas".
*Astuce Infalsifiable : Prends une colonne pleine. Fais le calcul : `Nombre du BAS / Nombre du HAUT = Coefficient`.*
Une fois découvert, tu peux l'appliquer à toutes les autres colonnes !

### 3. Le Passage à l'Unité (La valeur de base)
Savoir combien coûte un seul objet résout tous les problèmes.
*Exemple : Si 5 cahiers identiques coûtent $15\text{ €}$, combien coûtent 8 cahiers ?*
1. Trouve le prix de **1** cahier : $15 \div 5 = 3\text{ €}$ le cahier.
2. Multiplie pour celui de 8 cahiers : $8 \times 3 = 24\text{ €}$.

### 4. L'Échelle Secrète (Multiplicateur Horizontal)
Parfois, on n'a pas besoin du coefficient "Haut-Bas". On peut voyager directement "de gauche à droite" entre deux colonnes.
"Tu veux 4 kilos de pommes au lieu de 2 ? C'est le double. Donc je vais te faire payer le double direct". On n'a même pas eu besoin de chercher le prix d'un seul kilo.

---

## 💡 Le savais-tu ?

L'un des cas les plus géniaux de proportionnalité, ce sont les **Cartes Géographiques**. L'échelle d'une carte indique son coefficient de proportionnalité. Si c'est inscrit 1:25000, cela veut dire que $1\text{ cm}$ sur le papier représente... $25\,000\text{ cm}$ en réalité dans le monde (soit $250\text{ m}$). Les géographes plient l'espace proportionnellement pour le faire tenir dans ton sac à dos !

---

## ❓ FAQ (Foire Aux Questions)

**Q : Dans un tableau, toutes les colonnes doivent-elles avoir le même coefficient ?**
**R** : C'est OBLIGATOIRE ! Si tu vérifies qu'une seule colonne donne (par exemple) $\times 3$, et que tout d'un coup la dernière colonne cache un $\times 4$, alors ce tableau n'est PAS un tableau de proportionnalité. 

**Q : Est-ce qu'on peut additionner les colonnes ?**
**R** : OUI, c'est une astuce géniale. Si tu connais le prix de 2 tickets, et le prix de 5 tickets... Tu peux tout simplement "Additionner" ces deux blocs ensemble pour obtenir instantanément la colonne "7 tickets" !

**Q : Comment calculer "rapidement" 20% d'un prix ?**
**R** : Les pourcentages SONT des tableaux de proportionnalité (Proportion sur 100). Pour "20% de 50€", l'astuce c'est de trouver 10% (on divise le prix par 10 : ça fait $5\text{ €}$), puis on double pour faire 20% (ce qui fait $10\text{ €}$).

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Sur un tableau, comment trouver le "Coefficient de Proportionnalité" qui passe du haut vers le bas ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>On prend une colonne complète, et on fait "Chiffre du Bas ÷ Chiffre du Haut" !
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Le nombre de fautes dans une dictée est-il proportionnel à la longueur du texte ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>NON. Un texte 2 fois plus long ne veut pas du tout dire que tu feras "exactement" 2 fois plus de fautes.
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : Opération Supermarché**
Au supermarché, un pack de 6 bouteilles d'eau identiques est vendu à $4,20\text{ €}$. On te demande d'acheter des packs épars pour ramener un total de 15 bouteilles. Combien vas-tu payer précisément pour ces 15 bouteilles ?

**Correction Détaillée :**
1. *Technique de l'Unité* : Trouvons le prix d'UNE SEULE bouteille magique.
   Le prix total divisé par le nombre : $4,20 \div 6 = 0,70\text{ €}$. Une seule bouteille coûte $70$ centimes.
2. *L'Achat Ciblé* : On veut maintenant le coût de nos $15$ bouteilles.
   $15 \times 0,70 = 10,50\text{ €}$. Le prix exact de notre mission sera de **10,50 €**.

**Exercice 2 : L'Échelle de l'Architecte**
Sur un plan secret de forteresse avec l'échelle "1 / 500", tu mesures avec ta règle un joli couloir qui fait exactement $8\text{ cm}$ sur le papier. Quelle sera la monstrueuse taille dans la vraie vie en mètres de ce long couloir ?

**Correction Détaillée :**
1. *Comprendre le Multiplicateur* : L'échelle "1/500" veut dire que TOUT ce qui est sur le plan a été "rétréci 500 fois". En sens inverse pour trouver la réalité géante, on doit donc tout multiplier par le coefficient **$500$**.
2. *Le Calcul* : $8\text{ cm} \times 500 = 4\,000\text{ cm}$ dans le vrai monde.
3. *Conversion Épique* : Un couloir de $4\,000\text{ centimètres}$, on a du mal à l'imaginer. Divisons par 100 pour passer en mètres : $4000 \div 100 = 40$. De l'entrée à la fin, le couloir de la forteresse fera **40 mètres**. 

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Si un chiot Pèse 5 kilos à 2 mois. À 4 mois (le double de temps), il pèsera scientifiquement de façon absolue 10 kilos.</strong></summary>
  <ul>
    <li>A) Vrai, c'est purement mathématique.</li>
    <li>B) Faux, les êtres vivants ne fonctionnent pas comme ça.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B (Faux) !</strong> Ce n'est "PAS" une situation de proportionnalité. Le poids d'un être vivant (plante, chien, humain) dépend de plein de caractéristiques qui lui sont propres. Ton grand-père ne mesure pas 12 mètres parce qu'il a 80 ans !
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Le prix des croissants à la boulangerie affiche : 1 croissant = 1€ / 3 croissants = 3€ / 10 croissants = 8€. Est-ce un tableau de proportionnalité ?</strong></summary>
  <ul>
    <li>A) OUI, une beauté parfaite de rigueur.</li>
    <li>B) NON, c'est une promotion.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Dans les deux premières colonnes, le coefficient de multiplication est bien x1 (1€ = 1x1... 3€ = 3x1...). MAIS à la fin, 10 croissants auraient dû coûter 10$. S'ils coûtent 8, le multiplicateur a varié (le boulanger fait un "rabais/promo de lot"). Le coefficient n'est plus unique : ce système est NON-proportionnel strico-sensu.
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 3 : Tu connais déjà la colonne de "4 Bonbons" et tu as complété la colonne "7 Bonbons". Quelle est la méthode la plus maligne sans faire la méthode Unité pour trouver la colonne "11 Bonbons" ?</strong></summary>
  <ul>
    <li>A) J'additionne mentalement les prix de la colonne "4" avec la "7" : 4+7 = 11.</li>
    <li>B) C'est impossible, tu prends la calculette de ton portable au marché.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : A !</strong> L'addition latérale de colonnes est une des propriétés maîtresses de la proportionnalité ! Le prix de $4$ ajouté au prix de $7$ donne irrémédiablement le prix de $11$ !
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

*Attention, cette checklist ne doit être cochée que si tu as réussi les quiz sans regarder les réponses en premier !*

- [ ] Je sais repérer ce qui est "proportionnel" et ce qui ne l'est pas (comme des tarifs dégressifs).
- [ ] J'ai compris l'utilité magique et comment obtenir la grandeur de passage à "1 Unité".
- [ ] Je sais trouver le "Coefficient" qui me permet de passer de la Ligne du Haut à la ligne du Bas.
- [ ] Je sais lire une Échelle de carte et la multiplier pour obtenir la vraie longueur réelle.

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*
