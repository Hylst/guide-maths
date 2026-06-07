---
title: 'Chapitre 1 : Les Nombres jusqu''à 1 000'
level: Primaire
subLevel: CE1
order: 1
---

# Chapitre 1 : Les Nombres jusqu'à 1 000

**Niveau** : CE1 (Cycle 2)  
**Prérequis** : Maîtriser le comptage, les dizaines et les unités (jusqu'à 99 au CP).  
**Objectifs** : 
- Franchir le "mur des 100" et compter jusqu'à 999.
- Comprendre la notion de "Centaine" (10 paquets de 10).
- Écrire les nombres en chiffres et en lettres.
- Décomposer un nombre en C (Centaines), D (Dizaines), U (Unités).

---

## 📖 Introduction Pédagogique : La Tour de Cent !

Au CP, tu as appris à grouper des petits cubes pour former des dizaines (des barres de 10 cubes).
Mais imagine que tu sois un architecte de nombres et que tu aies tellement de barres de dizaines qu'elles encombrent ton bureau. Que fait-on avec **10 barres de dizaines** ? On les rassemble pour construire un gros bloc : **la Centaine** !

Ce gros bloc carré est lourd et imposant... Devine combien de petits cubes s'y cachent au total ? Exactement **100 cubes** ! La Centaine, c'est l'étage des grands nombres. Tu vas pouvoir construire des nombres géants jusqu'à 999 !

---

## 🎨 Schéma Pédagogique Interactif : La machine à construire les nombres

Observez comment le nombre 234 est fabriqué à partir de blocs :

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#f0fdf4; border-radius:12px; border: 2px solid #22c55e;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#166534" font-size="16" text-anchor="middle">Centaines, Dizaines, Unités</text>
  <!-- Les Centaines "Les Coffres Rouges" (Plaques de 100) -->
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="60" height="60" fill="#fca5a5" stroke="#ef4444" stroke-width="2" rx="4">
      <animate attributeName="y" values="-20; 0" dur="1s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" fill="freeze" />
    </rect>
    <text x="30" y="35" font-family="sans-serif" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">100</text>
    <rect x="15" y="15" width="60" height="60" fill="#fca5a5" stroke="#ef4444" stroke-width="2" rx="4">
      <animate attributeName="y" values="-5; 15" dur="1s" begin="0.2s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="0.2s" fill="freeze" />
    </rect>
    <text x="45" y="50" font-family="sans-serif" font-size="14" font-weight="bold" fill="#991b1b" text-anchor="middle">100</text>
    <text x="35" y="110" font-family="sans-serif" font-weight="bold" fill="#ef4444" font-size="16" text-anchor="middle">2 C</text>
  </g>
  <!-- Les Dizaines "Les Barres Vertes" (10) -->
  <g transform="translate(190, 60)">
    <rect x="0" y="0" width="15" height="75" fill="#bbf7d0" stroke="#22c55e" stroke-width="2" rx="2">
      <animate attributeName="y" values="-20; 0" dur="1s" begin="0.5s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="0.5s" fill="freeze" />
    </rect>
    <rect x="25" y="0" width="15" height="75" fill="#bbf7d0" stroke="#22c55e" stroke-width="2" rx="2">
      <animate attributeName="y" values="-20; 0" dur="1s" begin="0.7s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="0.7s" fill="freeze" />
    </rect>
    <rect x="50" y="0" width="15" height="75" fill="#bbf7d0" stroke="#22c55e" stroke-width="2" rx="2">
      <animate attributeName="y" values="-20; 0" dur="1s" begin="0.9s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="0.9s" fill="freeze" />
    </rect>
    <text x="32.5" y="110" font-family="sans-serif" font-weight="bold" fill="#16a34a" font-size="16" text-anchor="middle">3 D</text>
  </g>
  <!-- Les Unités "Les Petits Cubes Bleus" (1) -->
  <g transform="translate(300, 80)">
    <rect x="0" y="0" width="15" height="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="2">
      <animate attributeName="y" values="-20; 0" dur="1s" begin="1.2s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="1.2s" fill="freeze" />
    </rect>
    <rect x="20" y="0" width="15" height="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="2">
      <animate attributeName="y" values="-20; 0" dur="1s" begin="1.3s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="1.3s" fill="freeze" />
    </rect>
    <rect x="40" y="0" width="15" height="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="2">
      <animate attributeName="y" values="-20; 0" dur="1s" begin="1.4s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="1.4s" fill="freeze" />
    </rect>
    <rect x="0" y="25" width="15" height="15" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" rx="2">
      <animate attributeName="y" values="-20; 25" dur="1s" begin="1.5s" fill="freeze" />
      <animate attributeName="opacity" values="0; 1" dur="1s" begin="1.5s" fill="freeze" />
    </rect>
    <text x="27.5" y="90" font-family="sans-serif" font-weight="bold" fill="#2563eb" font-size="16" text-anchor="middle">4 U</text>
  </g>
  <!-- Le résultat final -->
  <rect x="150" y="170" width="150" height="50" fill="white" stroke="#22c55e" stroke-width="2" rx="10">
    <animate attributeName="opacity" values="0; 1" dur="1s" begin="2s" fill="freeze" />
  </rect>
  <text x="225" y="202" font-family="monospace" font-weight="bold" font-size="28" text-anchor="middle">
    <tspan fill="#ef4444" opacity="0"><animate attributeName="opacity" values="0; 1" dur="1s" begin="2.1s" fill="freeze" />2</tspan>
    <tspan fill="#16a34a" opacity="0"><animate attributeName="opacity" values="0; 1" dur="1s" begin="2.3s" fill="freeze" />3</tspan>
    <tspan fill="#2563eb" opacity="0"><animate attributeName="opacity" values="0; 1" dur="1s" begin="2.5s" fill="freeze" />4</tspan>
  </text>
  <text x="225" y="240" font-family="sans-serif" font-size="12" fill="#166534" text-anchor="middle" opacity="0">
    Deux-cent-trente-quatre
    <animate attributeName="opacity" values="0; 1" dur="1s" begin="3s" fill="freeze" />
  </text>
</svg>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. La maison des Cents, Dizaines et Unités

Quand les nombres grandissent au CE1, on utilise **le tableau de numération (CDU)** pour bien ranger chaque chiffre. Attention, on commence toujours à ranger de droite à gauche, mais on lit de gauche à droite !

| Centaines (C) | Dizaines (D) | Unités (U) | Le nombre s'écrit | Le nombre se lit |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 0 | 0 | **100** | Cent |
| 5 | 0 | 8 | **508** | Cinq-cent-huit |
| 3 | 4 | 0 | **340** | Trois-cent-quarante |

> ⚠️ **Le zéro (0) a un rôle magique** : s'il n'y a pas de dizaine, on doit **absolument** mettre un 0. 
> Si on l'oublie et qu'on écrit "58" au lieu de "508", tout est faussé !

### 2. Comment décomposer un nombre ?

Décomposer un nombre, c'est le découper pour montrer de quoi il est fait. Pour **468** :
- À la voix : Quatre-cent-soixante-huit
- En additions : **400 + 60 + 8** (On additionne les blocs)
- En lettres : **4 C, 6 D, 8 U**

### 3. Comparer avec "<" ou ">"

On utilise le crocodile pour comparer (le crocodile mange toujours le plus gros) : `<` ou `>`.
Pour comparer deux grands nombres, **on regarde toujours les Centaines en premier** !
- **732 et 915** : C'est le chef des Centaines qui gagne. 9 est plus grand que 7. Donc $732 < 915$.
- **420 et 450** : Les centaines (4) sont identiques. On regarde alors les Dizaines ! 5 est grand que 2. Donc $420 < 450$.

---

## 📌 Rappels

- Les Unités (U) : Les cubes tout seuls. De 0 à 9.
- Les Dizaines (D) : Les barres de 10. De 10 à 99.
- Dans le nombre **64**, il y a **6 Dizaines** et **4 Unités**.

---

## 💡 Le Saviez-vous ?

Le mot **"Centaine"** vient du latin *centum* qui veut dire "cent". 
Au Moyen-Âge, les bergers ne pouvaient pas compter de grands nombres d'animaux. 
Ils utilisaient un petit caillou dans leur poche à chaque fois qu'un troupeau de 100 moutons passait la barrière !

---

## 🛠️ Application Pratique / Interactive

Prends un jeu de cartes (ou tes mains) et essaie ceci :
1. Choisis trois cartes au hasard (entre 1 et 9). Par exemple, tu as pioché le **4**, le **7** et le **2**.
2. Essaie de fabriquer **le plus grand nombre possible** avec ces trois cartes : mets le plus gros chiffre dans la Centaine, puis le moyen dans la Dizaine, et le petit dans l'Unité. Réponse : **742**.
3. Recommence pour fabriquer **le plus petit nombre possible**. Indice : Fais l'inverse ! Réponse : **247**.

---

## 🧠 Flashcards

<div className="flex flex-wrap gap-4 justify-center my-6">
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card border-2 border-border-strong rounded-xl [backface-visibility:hidden] shadow-sm">
        <span className="text-sm text-primary font-bold mb-2">Question</span>
        <span className="font-medium px-4">Comment s'écrit 200 + 40 + 7 ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-2xl font-bold">247</span>
        <span className="text-sm mt-1">Deux-cent-quarante-sept</span>
      </div>
    </div>
  </div>
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card border-2 border-border-strong rounded-xl [backface-visibility:hidden] shadow-sm">
        <span className="text-sm text-primary font-bold mb-2">Question</span>
        <span className="font-medium px-4">Combien de dizaines y a-t-il dans 806 ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-2xl font-bold">0</span>
        <span className="text-sm mt-1">(Le zéro garde la place des D)</span>
      </div>
    </div>
  </div>
</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Devine le nombre
Je suis un nombre de trois chiffres.
- Mon chiffre des **Centaines** est 3.
- Mon chiffre des **Unités** est 5.
- Mon chiffre des **Dizaines** est la somme du chiffre des Centaines et du chiffre des Unités.
**Qui suis-je ?**

<details className="mt-4 p-4 border border-border-strong rounded-xl bg-card">
<summary className="font-bold text-primary cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction :** 
1. Je place le **3** dans la case des Centaines : `3 .. ..`
2. Je place le **5** dans la case des Unités : `3 .. 5`
3. Le chiffre des Dizaines est 3 + 5 = **8**. Je le place au milieu : `3 8 5`
4. Le nombre est **385** (Trois-cent-quatre-vingt-cinq).
</details>

### Exercice 2 : Compare les nombres
Compare en utilisant `<` (plus petit) ou `>` (plus grand) : 
a) 456 ... 654
b) 321 ... 312

<details className="mt-4 p-4 border border-border-strong rounded-xl bg-card">
<summary className="font-bold text-primary cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction :**
a) **456 < 654.** On regarde les Centaines en premier. 4 est plus petit que 6. Le crocodile mange donc 654.
b) **321 > 312.** Les centaines (3) sont pareilles. On regarde donc les dizaines. 2 est plus grand que 1. Le crocodile mange donc 321.
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : 10 dizaines, c'est vraiment la même chose que 100 unités ?**
**R :** Absolument ! Imagine 10 barres vertes (Dizaines). Si tu t'amuses à découper les barres en tout petits cubes bleus, tu obtiendras exactement 100 petits cubes (Unités).

**Q2 : Faut-il mettre un "s" au mot Cent (Exemple : Deux-Cents ou Deux-Cent) ?**
**R :** La règle est un peu amusante : on met un "s" à *cent* seulement quand il est multiplié (Deux-cents, 200) et qu'il n'est suivi d'aucun autre nombre. S'il y a quelque chose après, le "s" disparaît (Deux-cent-quatre, 204). 

**Q3 : Pourquoi ne peut-on pas dire "Dix-cent" au lieu de "Mille" ?**
**R :** Ahah ! En fait, "Dix-cents" c'est bien 1000 ! Mais les mathématiciens ont décidé d'inventer un nouveau mot ("Mille") pour que ce soit plus rapide à dire, et ils l'ont récompensé avec son propre gros coffre jaune géant ! Ça, tu l'apprendras au CE2 !

---

## 📝 Mini-Quiz

**Question 1 : Que représente le chiffre "7" dans le nombre 274 ?**
- [ ] Le chiffre des Unités
- [x] Le chiffre des Dizaines
- [ ] Le chiffre des Centaines

> **Explication :** 274 est composé de 2 Centaines, 7 Dizaines, 4 Unités. Le 7 est bien au milieu !

**Question 2 : Lequel de ces nombres est "Quatre-cent-huit" ?**
- [ ] 480
- [ ] 48
- [x] 408

> **Explication :** "Huit" représente des Unités toutes seules. Il n'y a donc pas de dizaines. Il faut écrire un "0" au milieu : 408. 480 se lit "Quatre-cent-quatre-vingts".

**Question 3 : Quel est le plus grand nombre ?**
- [ ] 609
- [ ] 599
- [x] 610

> **Explication :** On regarde d'abord les Centaines. 609 et 610 (6 centaines) sont plus grands que 599 (5 centaines). Entre 609 et 610, la dizaine (1) de 610 bat le zéro (0) de 609 !

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Je sais lire et écrire les nombres jusqu'à 999.
- [ ] Je sais décomposer un nombre en centaines, dizaines et unités.
- [ ] Je n'oublie jamais de mettre un zéro s'il n'y a pas de dizaines ou pas d'unités !
- [ ] Je sais comparer deux grands nombres en regardant d'abord les centaines.

