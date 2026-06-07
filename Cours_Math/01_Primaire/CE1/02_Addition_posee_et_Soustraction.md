---
title: 'Chapitre 2 : Addition posée et Soustraction'
level: Primaire
subLevel: CE1
order: 2
---

# Chapitre 2 : Addition posée et Soustraction

**Niveau** : CE1 (Cycle 2)  
**Prérequis** : L'addition en ligne simple, connaître les nombres jusqu'à 999.  
**Objectifs** : 
- Apprendre à "poser" une addition en colonne rigoureusement.
- Comprendre et manipuler le système de la "Retenue" dans l'addition.
- Découvrir la soustraction sans retenue (en ligne ou posée).

---

## 📖 Introduction Pédagogique : L'immeuble des Mathématiques

Au CP, tu calculais tes petits nombres "en ligne" sur ton cahier, comme un petit train : `12 + 5 = 17`. 
Mais au CE1, les nombres grandissent et deviennent des monstres à 3 chiffres ! (Exemple : `245 + 137`). Si tu essaies de faire cela dans ta tête, ton cerveau risque la surchauffe !

Pour dompter ces gros calculs, les mathématiciens ont inventé **l'Immeuble des Opérations** : on appelle ça "Poser l'addition". On écrit les nombres de haut en bas, en colonne. 
Mais attention, dans cet immeuble magique, il y a une règle absolue : **Chaque famille doit rester dans sa colonne !** Les Unités sous les Unités, les Dizaines sous les Dizaines, et les Centaines sous les Centaines !

---

## 🎨 Schéma Pédagogique Interactif : L'ascenseur de la Retenue !

Observe l'opération **48 + 25**. Regarde bien comment se forme la retenue !

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#fff7ed; border-radius:12px; border: 2px solid #fdba74;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#c2410c" font-size="16" text-anchor="middle">L'Opération : 48 + 25</text>
  <!-- Les Colonnes (C / D / U) fond grisé -->
  <rect x="180" y="50" width="40" height="180" fill="#ffedd5" stroke="#fb923c" stroke-width="1" stroke-dasharray="4"/>
  <text x="200" y="70" font-family="sans-serif" font-weight="bold" fill="#ea580c" font-size="18" text-anchor="middle">D</text>
  <rect x="230" y="50" width="40" height="180" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4"/>
  <text x="250" y="70" font-family="sans-serif" font-weight="bold" fill="#0284c7" font-size="18" text-anchor="middle">U</text>
  <!-- Le Signe PLUS -->
  <text x="140" y="140" font-family="monospace" font-weight="bold" fill="#dc2626" font-size="36">+</text>
  <!-- La barre de "Egal" (Trait horizontal) -->
  <line x1="120" y1="160" x2="290" y2="160" stroke="#000" stroke-width="3"/>
  <!-- Le Premier Nombre (48) -->
  <text x="200" y="110" font-family="monospace" font-weight="bold" fill="#000" font-size="28" text-anchor="middle">4</text>
  <text x="250" y="110" font-family="monospace" font-weight="bold" fill="#000" font-size="28" text-anchor="middle">8</text>
  <!-- Le Deuxième Nombre (25) -->
  <text x="200" y="145" font-family="monospace" font-weight="bold" fill="#000" font-size="28" text-anchor="middle">2</text>
  <text x="250" y="145" font-family="monospace" font-weight="bold" fill="#000" font-size="28" text-anchor="middle">5</text>
  <!-- L'Animation de l'Unité ( 8 + 5 = 13 ) -->
  <text x="250" y="210" font-family="monospace" font-weight="bold" fill="#0284c7" font-size="28" text-anchor="middle">
    <animate attributeName="opacity" values="0;0;1;1;1;1" dur="6s" repeatCount="indefinite" />
    3
  </text>
  <!-- La Retenue animée -->
  <circle cx="200" cy="50" r="12" fill="#ef4444" opacity="0">
    <animate attributeName="opacity" values="0;0;0;1;1;0" dur="6s" repeatCount="indefinite" />
  </circle>
  <text x="200" y="55" font-family="monospace" font-weight="bold" fill="#fff" font-size="14" text-anchor="middle" opacity="0">
    <animate attributeName="opacity" values="0;0;0;1;1;0" dur="6s" repeatCount="indefinite" />
    1
  </text>
  <!-- Flèche explicative de l'ascenseur -->
  <path d="M 260 210 Q 350 150 220 50" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6" opacity="0">
    <animate attributeName="opacity" values="0;0;0;1;0;0" dur="6s" repeatCount="indefinite" />
  </path>
  <!-- L'Animation de la Dizaine ( 4 + 2 + Retenue 1 = 7 ) -->
  <text x="200" y="210" font-family="monospace" font-weight="bold" fill="#ea580c" font-size="28" text-anchor="middle">
    <animate attributeName="opacity" values="0;0;0;0;1;1" dur="6s" repeatCount="indefinite" />
    7
  </text>
  <text x="225" y="260" font-family="sans-serif" font-weight="bold" fill="#c2410c" font-size="14" text-anchor="middle">
    8+5=13. Je pose 3, et la retenue (1) monte chez les Dizaines !
  </text>
</svg>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. L'alignement magique
Quand on pose une addition, l'alignement est la chose la plus importante !
On commence TOUJOURS par aligner les nombres **bien droits contre le mur de droite** (la ligne des Unités).

✅ **Le BON alignement :**
```text
  126
+  42
------
```
Ici, le 6 et le 2 sont bien alignés dans la colonne des unités. Le calcul sera correct.

❌ **Le MAUVAIS alignement :**
```text
  126
+ 42
------
```
Alerte rouge ! Ici le "4" de 42 (qui est une Dizaine) est aligné avec le "1" de 126 (une Centaine). C'est la catastrophe mathématique assurée !

### 2. La règle d'or : Commence toujours par la Droite !
On lit des histoires de gauche à droite... mais **on calcule de droite à gauche** !
C'est indispensable de toujours commencer par faire l'addition de la colonne des **Unités** tout à droite, puis d'avancer vers la gauche colonne par colonne.

### 3. La magie de la Retenue
Parfois, le résultat d'une colonne *déborde* et dépasse 9 ! (Exemple : `8 + 5 = 13`). 
Tu n'as absolument **PAS LE DROIT** d'écrire le nombre " `13` " en bas de la seule petite colonne des unités ! Il n'y a la place que pour *un seul chiffre* par colonne ! 
- Comment faire ? On sépare le nombre "13". 
- Posée en bas : On pose le `3` au sous-sol des Unités.
- Ascenseur : On prend le `1` (qui représente 10 unités, donc UNE dizaine) et on le fait s'envoler tout en haut de la colonne des Dizaines ! C'est **la retenue**.
- Lorsqu'on additionnera la colonne des Dizaines, il faudra bien sûr compter ce "1" supplémentaire avec le reste !

### 4. La Soustraction : le même immeuble, à l'envers !
Pour faire `56 - 24`, le grand nombre doit toujours se trouver au-dessus (`56`). On aligne tout comme pour l'addition, et on soustrait étage par étage, toujours en commençant par les unités de droite :
- Colonne des U : `6 - 4 = 2`
- Colonne des D : `5 - 2 = 3`
- Résultat bas : `32`.

---

## 📌 Rappels

- Le signe de l'addition est le "**+**" (Plus).
- Le signe de la soustraction est le "**-**" (Moins).
- **Une dizaine = 10 unités.** C'est à cause de ça que la retenue existe. Une fois qu'on rassemble 10 unités, pim ! Ça se transforme en 1 Dizaine et ça change de colonne !

---

## 💡 Le Saviez-vous ?

Le signe "**+**" n'a pas toujours existé ! Avant l'an 1489, pour dire "Et", les marchands écrivaient le mot latin " *et* ". Les savants écrivaient ce mot très vite et la lettre "e" s'est peu à peu déformée avec la lettre "t" pour finir par se croiser et donner la croix "+ " de l'addition actuelle !

---

## 🛠️ Application Pratique / Interactive

Prends une feuille de brouillon ou ardoise effaçable !
Tu es directeur d'un magasin de jouets.
- Ce matin, un camion t'apporte **164** peluches.
- Cet après-midi, un autre camion t'apporte **28** peluches.
Dessine tes colonnes (C/D/U) sur ton brouillon, place correctement tes chiffres pour additionner 164 + 28, trace ton trait "Égal" et calcule ! Pense à l'ascenseur si ça dépasse 9 dans une colonne !
*(Ouvre l'exercice 1 pour voir la correction et si ton magasin est bien approvisionné).*

---

## 🧠 Flashcards

<div className="flex flex-wrap gap-4 justify-center my-6">
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card border-2 border-border-strong rounded-xl [backface-visibility:hidden] shadow-sm p-4">
        <span className="text-sm text-primary font-bold mb-2">Question</span>
        <span className="font-medium">Par quel côté doit-on TOUJOURS commencer quand on calcule une addition posée ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">Par la Droite !</span>
        <span className="text-sm mt-1">(La colonne des Unités)</span>
      </div>
    </div>
  </div>
  <div className="group w-64 h-40 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card border-2 border-border-strong rounded-xl [backface-visibility:hidden] shadow-sm p-4">
        <span className="text-sm text-primary font-bold mb-2">Question</span>
        <span className="font-medium">J'additionne les unités et je trouve 15. Que dois-je faire ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-md p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-lg font-bold leading-tight">Je pose le 5 en bas et je retiens le 1 en haut des dizaines !</span>
      </div>
    </div>
  </div>
</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Les peluches (L'addition avec Retenue)
Corrigeons le problème de l'application pratique : je dois calculer **164 + 28**.

<details className="mt-4 p-4 border border-border-strong rounded-xl bg-card">
<summary className="font-bold text-primary cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
1. J'aligne les nombres contre la droite. Le "8" de "28" est sous le "4" de "164".
2. Colonne Unité (à droite) : `4 + 8 = 12`. Je n'ai pas la place d'écrire "12" entier en bas. J'écris le **2** en bas, et je fais voler la retenue "**1**" en haut de la colonne des Dizaines !
3. Colonne Dizaine (au milieu) : Je calcule `6 + 2`... mais n'oublions pas d'ajouter le "**1**" de retenue ! Donc c'est `1 + 6 + 2 = 9`. J'écrit **9** en bas.
4. Colonne Centaine (à gauche) : Il y a seulement `1` (plus rien du côté du 28). `1 + 0 = 1`. J'écris **1** en bas.
**Résultat final : 192 peluches.**
</details>

### Exercice 2 : Les œufs (Soustraction sans retenue)
Le fermier a ramassé `375` œufs. Au marché, il en vend `251`. Combien lui reste-t-il d'œufs ? Poser l'opération pour trouver la réponse.

<details className="mt-4 p-4 border border-border-strong rounded-xl bg-card">
<summary className="font-bold text-primary cursor-pointer hover:underline">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
1. Je pose la grande quantité en haut (`375`) et la plus petite vendue en dessous (`251`), avec un petit signe `-`. J'aligne bien tout à droite !
2. Colonne Unité (droite) : Je prends les oeufs unitaires et je les vends. `5 - 1 = 4`. J'écris **4** en bas.
3. Colonne Dizaine : `7 - 5 = 2`. J'écris **2** en bas.
4. Colonne Centaine : `3 - 2 = 1`. J'écris **1** en bas.
**Résultat : Il lui reste 124 œufs.**
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Puis-je garder la retenue dans le creux de la main au lieu de l'écrire au dessus des dizaines ?**
**R :** À l'école en CE1, la maîtresse exige souvent qu'on écrive la retenue en haut de la colonne suivante (en l'entourant d'un rond rouge par exemple). Si tu essaies juste de t'en souvenir dans ta tête, 99% du temps, tu vas l'oublier au moment de l'ajouter et tout ton calcul sera faux ! Donc "Écris toujours ta retenue" !

**Q2 : Que faire s'il y a très grand nombre plus un très petit ? Comme 483 + 9 ?**
**R :** L'alignement par la droite est l'arme absolue ! Le petit 9 viendra se ranger tout seul parfaitement en dessous du "3" de (483) dans la colonne des Unités. 

**Q3 : Est-ce qu'on retient des choses en soustraction aussi ?**
**R :** Oui, c'est ce qu'on appelle "la soustraction à retenue", ou alors on utilise des méthodes pour "emprunter" ou "casser". Mais c'est une gymnastique très complexe que l'on verra un peu plus tard (souvent au CE2) ! Pour le moment, les soustractions fonctionneront à tous les coups par la simple diminution standard !

---

## 📝 Mini-Quiz

**Question 1 : Que faire si on trouve 16 dans la colonne des unités lors d'une addition posée ?**
- [ ] On écrit 16 tout en bas de la colonne des unités.
- [ ] On pose 1 en bas, et on met la retenue de 6 sur le toit des dizaines.
- [x] On pose 6 en bas, et on met la retenue de 1 sur le toit des dizaines.

> **Explication :** Toujours conserver l'unité ! Dans 16, l'unité est le 6 (qui va en bas), et la dizaine est le "1 paquet de 10", qui s'envole chez ses cousins les Dizaines en retenue !

**Question 2 : Le calcul doit toujours se faire...**
- [ ] Au hasard, de préférence là où ça a l'air simple.
- [x] De droite à gauche. (D'abord les U, puis les D, puis les C).
- [ ] De gauche à droite.

> **Explication :** Pour que le mécanisme de la retenue fonctionne en étant poussée dans la colonne d'à côté, il faut obligatoirement avancer du plus petit bloc (unités à droite), pour aller vers le milieu (Dizaines) !

**Question 3 : Dans `"245 - 12"`, où faut-il placer le "1" du nombre "12" dans le tableau d'opération ?**
- [ ] Sous le "2" de 245.
- [x] Sous le "4" de 245.
- [ ] Sous le "5" de 245.

> **Explication :** Si on aligne bien par la droite (Le 2 va avec le 5 unités). Le 1 (qui est le 1 du 12) représente 1 dizaine. Il doit donc se ranger sagement dans la colonne des dizaines sous le "4".

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Je sais la règle d'or pour poser : j'aligne toujours les nombres contre le mur de droite (unite sur unite).
- [ ] Lors du calcul, je commence systématiquement tout à droite (colonne Unité).
- [ ] Quand la somme des unités dépasse 9, je sais séparer le nombre.
- [ ] Je n'oublie jamais de noter ma petite retenue "1" au dessus des dizaines, ni de la calculer par la suite !
