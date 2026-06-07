---
title: 'Chapitre 1 : Nombres entiers et décimaux'
level: College
subLevel: 6eme
order: 1
---

# Chapitre 1 : Nombres entiers et décimaux

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Nombres entiers jusqu'au million, fractions simples (demi, dixième).  

---

## 🎯 Introduction Pédagogique

Pourquoi étudier les nombres décimaux en 6ème ? 
Dans la vie de tous les jours, les nombres entiers ne suffisent pas toujours. Si tu veux acheter un article à 3 euros et 50 centimes, tu utilises un nombre décimal : **3,50**. Si tu participes à une course, ton temps sera mesuré avec une précision extrême, par exemple **12,45 secondes**. 

L'apprentissage des nombres décimaux permet de représenter des quantités qui sont "entre deux" nombres entiers. Cela ouvre la porte vers la géométrie de précision, la science stellaire (calculer la distance entre des planètes avec virgule) et l'économie. Ce chapitre te permet de comprendre l'écriture de ces nombres, leur comparaison, et comment les placer précisément sur une droite graduée.

---

## 🎨 Schéma Pédagogique Interactif

L'animation ci-dessous montre comment une unité entière se divise pour former des dixièmes et des centièmes !

<div align="center">
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="background:#f4f6f9; border-radius:12px; border: 1px solid #ddd;">
  <defs>
    <!-- Grille des centièmes (10x10) -->
    <pattern id="grid100" width="15" height="15" patternUnits="userSpaceOnUse">
      <rect width="15" height="15" fill="none" stroke="#ccc" stroke-width="0.5" />
    </pattern>
    <!-- Masque pour animer un remplissage progressif des colonnes -->
    <clipPath id="fillClip">
      <rect x="0" y="0" width="0" height="150">
        <animate attributeName="width" values="0; 60; 60; 15; 0" keyTimes="0; 0.4; 0.5; 0.8; 1" dur="8s" repeatCount="indefinite" />
      </rect>
    </clipPath>
    <!-- Masque pour animer un petit cube du centième -->
    <clipPath id="fillCubeClip">
      <rect x="0" y="0" width="0" height="15">
        <animate attributeName="width" values="0; 0; 0; 0; 15; 0; 0" keyTimes="0; 0.4; 0.5; 0.6; 0.7; 0.9; 1" dur="8s" repeatCount="indefinite" />
      </rect>
    </clipPath>
  </defs>

  <!-- Carré de base (1 Unité) -->
  <rect x="25" y="25" width="150" height="150" fill="#fff" stroke="#333" stroke-width="2" />
  <rect x="25" y="25" width="150" height="150" fill="url(#grid100)" />
  <text x="75" y="200" font-family="sans-serif" font-weight="bold" fill="#333">1 Unité</text>

  <!-- Replissage au Dixième -->
  <rect x="25" y="25" width="150" height="150" fill="#00b4d8" clip-path="url(#fillClip)" />
  
  <!-- Replissage d'un centième -->
  <rect x="25" y="25" width="150" height="150" fill="#f05454" clip-path="url(#fillCubeClip)" />

  <!-- L'Animation du Texte Dynamique -->
  <text x="210" y="80" font-family="sans-serif" font-weight="bold" fill="#00b4d8" font-size="20">
    <animate attributeName="opacity" values="0; 1; 0; 0" keyTimes="0; 0.3; 0.6; 1" dur="8s" repeatCount="indefinite" />
    4 colonnes = 40/100
  </text>
  <text x="255" y="110" font-family="sans-serif" font-weight="bold" fill="#00b4d8" font-size="26">
    <animate attributeName="opacity" values="0; 1; 0; 0" keyTimes="0; 0.3; 0.6; 1" dur="8s" repeatCount="indefinite" />
    = 0,40
  </text>

  <text x="210" y="80" font-family="sans-serif" font-weight="bold" fill="#f05454" font-size="20" opacity="0">
    <animate attributeName="opacity" values="0; 0; 1; 0" keyTimes="0; 0.6; 0.8; 1" dur="8s" repeatCount="indefinite" />
    1 carreau = 1/100
  </text>
  <text x="255" y="110" font-family="sans-serif" font-weight="bold" fill="#f05454" font-size="26" opacity="0">
    <animate attributeName="opacity" values="0; 0; 1; 0" keyTimes="0; 0.6; 0.8; 1" dur="8s" repeatCount="indefinite" />
    = 0,01
  </text>
</svg>
</div>

---

## 🔁 Rappels Utiles

- **La Décomposition :** L'unité peut toujours être partagée. Par exemple, quand tu prends $1/2$ d'un gâteau, c'est comme prendre 5 parts sur 10 (soit $0,5$).
- **Lecture :** $2\,450$ = deux mille quatre cent cinquante. La virgule marque l'entrée dans le monde décimal !

---

## 📚 Théorie Enrichie

### 1. La Structure du Nombre Décimal
Un nombre décimal, c'est un peu comme un pont entre le monde des grands entiers et le microscope de l'infiniment petit.
Il se divise en deux parties, strictement séparées par une **virgule** :
- **La partie entière** (à gauche) : Les unités complètes (ex: 45 stylos).
- **La partie décimale** (à droite) : Les morceaux d'unité (ex: 0,27 stylo, soit presque un tiers).

**L'astuce de la virgule** : La virgule te crie toujours où se trouve le **chiffre des unités** : c'est celui qui est juste avant elle à gauche. Dans `45,27`, l'unité est le `5`. 

### 2. Le Tableau de Numération

Imagine des tiroirs. Chaque tiroir a une étiquette et ne peut contenir qu'un seul chiffre de $0$ à $9$. La virgule agit comme un mur épais entre les tiroirs entiers et décimaux.

| Centaines | Dizaines | Unités | **Mur** | Dixièmes | Centièmes | Millièmes |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 100 | 10 | **1** | **,** | $0,1$ | $0,01$ | $0,001$ |
| 0 | 4 | **5** | **,** | 2 | 7 | 0 |

### 3. Comment Comparer sans se tromper ?
L'erreur fatale de beaucoup d'élèves est de penser que $4,12 > 4,5$ car $12$ est plus grand que $5$. Attention !
- Compare d'abord les **parties entières**.
- Si elles sont identiques, tu dois **compléter par des zéros** à droite pour que les parties décimales aient la même longueur !
Donc : comparer $4,5$ et $4,12$ revient à comparer $4,50$ et $4,12$. Et là, on voit bien que $50 > 12$. Donc **$4,5 > 4,12$**.

### 4. La Demi-Droite Graduée
Chaque point de la droite possède une coordonnée que l'on nomme son **abscisse**. Une droite est souvent divisée en 10 petites parts entre deux entiers. Chaque trait vaut donc $+0,1$.

---

## 💡 Le savais-tu ?

La virgule n'est pas utilisée partout dans le monde ! Dans les pays anglo-saxons (États-Unis, Royaume-Uni), on utilise un **point** à la place de la virgule. On l'écrit "3.14" au lieu de "3,14". C'est pour cela que sur ta calculatrice scientifique ou en programmation, tu dois souvent utiliser le point !

---

## ❓ FAQ (Foire Aux Questions)

**Q : À quoi servent les zéros inutiles, ont-ils une vraie utilité ?**
**R** : Les zéros placés tout à la fin de la partie décimale (ex: $4,500$) n'ajoutent aucune valeur mathématique. Cependant, ils ont une immense utilité visuelle pour les soustractions posées ou pour comparer des nombres de tailles différentes.

**Q : Est-ce que $5$ est un nombre décimal ?**
**R** : Oui, absolument ! On peut toujours l'écrire sous forme décimale : $5 = 5,0 = 5,00$. Un nombre entier est simplement un nombre décimal particulier dont la partie décimale est masquée parce qu'elle vaut zéro.

**Q : Peut-on avoir une infinité de chiffres après la virgule ?**
**R** : Dans certains cas, oui. Par exemple, le test avec ta calculatrice de $1 \div 3$ donnera `0,3333333...` sans s'arrêter. Cependant, la plupart des décimaux que nous utilisons ont une fin.

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Comment écrit-on "quinze unités et trois centièmes" ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>15,03 (Il ne fallait pas oublier le zéro des dixièmes !)
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Qui est le plus grand : 7,42 ou 7,5 ?
    <hr/>
    <strong>VERSO :</strong><br/><br/>7,5 (car si on ajoute un zéro, 7,50 est plus grand que 7,42)
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : Placer et comparer**
Parmi les nombres suivants, identifie le plus petit et le plus grand, puis donne le chiffre des centièmes du plus grand :
$3,045 ; 3,4 ; 3,404$

**Correction Détaillée :**
1. *Cadrage :* On ajoute des zéros pour qu'ils aient tous trois chiffres après la virgule : $3,045 ; 3,400 ; 3,404$.
2. *On compare :* On examine les chiffres après la virgule : $045 < 400 < 404$.
3. *Classement :* Le plus petit est $3,045$. Le plus grand est $3,404$.
4. *Dernier point :* Dans $3,4{\mathbf{0}}4$, le chiffre des centièmes (le 2ème après la virgule) est **$0$**.

**Exercice 2 : Décimaux en fractions**
Quelle est l'écriture fractionnaire décimale du nombre $4,58$ ? 

**Correction Détaillée :**
1. On compte les chiffres après la virgule : Il y en a $2$.
2. Cela signifie qu'il y a un lien direct avec les centièmes (car $100$ a deux zéros).
3. On retire la virgule du nombre : $458$.
4. On le place sur un dénominateur $100$.
5. Résultat final : **$\frac{458}{100}$**.

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Lequel de ces nombres est "Trois unités et quatre millièmes" ?</strong></summary>
  <ul>
    <li>A) 3,04</li>
    <li>B) 3,400</li>
    <li>C) 3,004</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : C !</strong> Dans 3,004, le 4 est en 3ème position, la case des millièmes. Le "A" serait "quatre centièmes" et le "B" vaut juste 3,4 (quatre dixièmes).
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Est-ce que $14,9$ < $14,87$ ?</strong></summary>
  <ul>
    <li>A) Vrai</li>
    <li>B) Faux</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B (Faux) !</strong> Compare-les ainsi : $14,90$ contre $14,87$, tu verras bien que $90$ est supérieur à $87$ !
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 3 : Comment s'écrit $\frac{57}{10}$ en décimal ?</strong></summary>
  <ul>
    <li>A) 0,57</li>
    <li>B) 5,7</li>
    <li>C) 57,0</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Diviser par 10 décale la virgule d'un chiffre vers la gauche, donc 57 devient 5,7.
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

*Attention, cette checklist ne doit être cochée que si tu as réussi les quiz sans regarder les réponses en premier !*

- [ ] Je sais repérer la partie entière et la partie décimale.
- [ ] J'ai compris l'utilité des zéros que je peux rajouter pour comparer.
- [ ] Je sais transformer une fraction en nombre décimal et inversement.
- [ ] Je sais placer les dixièmes, centièmes, millièmes dans mon tableau mental.

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*
