---
title: 'Chapitre 3 : La Division Posée'
level: Primaire
subLevel: CM1
order: 3
---
# Chapitre 3 : La Division Posée

**Niveau** : CM1 (Cycle 3)  
**Prérequis** : Sens de la division (partage), tables de multiplication.  
**Objectifs** : 
- Maîtriser le vocabulaire : diviseur, dividende, quotient, reste.
- Poser et calculer une division euclidienne à 1 chiffre.
- Poser et calculer une division euclidienne à 2 chiffres.

---

## 1. Introduction : Le partage équitable

Lorsque tu dois distribuer 850 cartes de jeu entre 6 amis de manière totalement équitable, l'opération qui s'impose est la **division posée**. C'est l'opération la plus rigoureuse de l'école primaire car elle combine toutes les autres : tu auras besoin de la multiplication, de la soustraction et bien sûr de ton sens du partage !

Poser une division s'appelle effectuer une "division euclidienne" (du nom d'un célèbre mathématicien antique). Le but est de trouver le résultat (le quotient) et l'éventuel surplus que l'on ne peut plus partager (le reste).

## 🎨 Animation Interactive : La potence de calcul

<div align="center">
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="background:#fefce8; border-radius:12px; border: 2px solid #fef08a;">
  
  <text x="200" y="30" font-family="sans-serif" font-weight="bold" fill="#854d0e" font-size="16" text-anchor="middle">La Potence : 74 ÷ 3</text>
  
  <!-- La structure de la potence -->
  <line x1="200" y1="50" x2="200" y2="220" stroke="#1f2937" stroke-width="3"/>
  <line x1="200" y1="100" x2="330" y2="100" stroke="#1f2937" stroke-width="3"/>
  
  <!-- Les Nombres et Noms -->
  <text x="140" y="85" font-family="monospace" font-weight="bold" fill="#0284c7" font-size="28" text-anchor="end">74</text>
  <text x="100" y="110" font-family="sans-serif" font-weight="normal" fill="#0284c7" font-size="12" text-anchor="middle">Dividende</text>

  <text x="230" y="85" font-family="monospace" font-weight="bold" fill="#16a34a" font-size="28" text-anchor="start">3</text>
  <text x="250" y="118" font-family="sans-serif" font-weight="normal" fill="#16a34a" font-size="12" text-anchor="middle">Diviseur</text>
  
  <!-- Quotient animé -->
  <text x="230" y="150" font-family="monospace" font-weight="bold" fill="#ea580c" font-size="28" text-anchor="start" opacity="0">
    24
    <animate attributeName="opacity" values="0;1;1;1" dur="4s" repeatCount="indefinite" />
  </text>
  <text x="260" y="170" font-family="sans-serif" font-weight="normal" fill="#ea580c" font-size="12" text-anchor="middle" opacity="0">
    Quotient
    <animate attributeName="opacity" values="0;1;1;1" dur="4s" repeatCount="indefinite" />
  </text>

  <!-- Le Reste -->
  <text x="140" y="210" font-family="monospace" font-weight="bold" fill="#dc2626" font-size="28" text-anchor="end" opacity="0">
    2
    <animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite" />
  </text>
  <text x="90" y="235" font-family="sans-serif" font-weight="normal" fill="#dc2626" font-size="12" text-anchor="middle" opacity="0">
    Reste
    <animate attributeName="opacity" values="0;0;1;1" dur="4s" repeatCount="indefinite" />
  </text>
  
</svg>
</div>

---

## 2. Activités de découverte

### Mission : L'encadrement préliminaire
Avant d'affronter la potence, il faut toujours **estimer la taille du résultat** (combien de chiffres aura le quotient). 
Prenons : `845 ÷ 6`.
1. Est-ce que le résultat est plus grand que 1 ? Oui ($1 \times 6 = 6$).
2. Est-ce que le résultat est plus grand que 10 ? Oui ($10 \times 6 = 60$).
3. Est-ce que le résultat est plus grand que 100 ? Oui ($100 \times 6 = 600$).
4. Est-ce que c'est plus grand que 1 000 ? Non ($1 000 \times 6 = 6 000$, c'est trop grand).
Le Quotient se trouve donc entre 100 et 1 000. Il aura obligatoirement **3 chiffres**. Savoir cela évitera de grosses erreurs de calcul par la suite.

---

## 3. Explications et Théorie

### 3.1 Le vocabulaire de la potence
Le dispositif pour calculer s'appelle une "potence". Il est composé de quatre zones :
- Le **Dividende** (en haut à gauche) : C'est le nombre total à partager (ex: la somme totale des cartes).
- Le **Diviseur** (en haut à droite) : C'est la quantité de parts (ex: le nombre d'amis).
- Le **Quotient** (en bas à droite) : C'est le résultat direct. La valeur d'une seule part (ex: les cartes pour un ami).
- Le **Reste** (en bas à gauche) : Ce qui ne peut pas être divisé en restant entier.
*Règle d'or absolue :* Le reste doit **toujours** être strictement plus petit que le Diviseur.

### 3.2 L'algorithme des 4 étapes (La boucle)
Pour résoudre une division à la main, tu dois effectuer une boucle fermée, composée de 4 étapes précises, jusqu'à épuisement des chiffres de gauche à droite :
1. **Chercher** : Dans "...", combien de fois "..." ? Je cherche dans mes tables.
2. **Écrire au quotient** : Je place le nombre trouvé au Quotient.
3. **Multiplier et soustraire** : Je calcule la soustraction pour trouver ma petite retenue restante en bas à gauche de la ligne.
4. **Descendre** : Je descends le chiffre suivant du Dividende à côté de mon petit reste et la boucle recommence à l'étape 1.

### 3.3 L'antidote ultime : La preuve par 9
Tu as terminé ? Comment savoir si c'est juste ? 
L'équation de vérification est : **(Quotient × Diviseur) + Reste = Dividende**.
Si l'équation fonctionne, ta division est validée à 100%.

---

## 4. Méthodes pas-à-pas

**Méthode : La terrible division à 2 chiffres**
Calculons : `4 316 ÷ 12`.
Beaucoup d'élèves paniquent car ils ne connaissent pas la table de 12. 
**L'astuce obligatoire** : Commence toujours par écrire la table de 12 sur un brouillon à côté de ta feuille avant de démarrer.
- $12 \times 1 = 12$
- $12 \times 2 = 24$
- $12 \times 3 = 36$
- $12 \times 4 = 48$
- ...

*La boucle commence :*
1. Je prends 4. Dans 4, combien de fois 12 ? Zéro fois. Je dois donc prendre 43 ensemble.
2. Dans 43, combien de fois 12 ? Je regarde mon brouillon. $12 \times 3 = 36$ et $12 \times 4 = 48$ (trop grand). Ce sera donc 3. J'écris `3` au Quotient.
3. Soustraction : $43 - 36 = 7$. J'écris le reste `7`.
4. Je descends le 1 à côté du 7. Cela forme `71`. Et la boucle recommence : dans 71, combien de fois 12 ?

---

## 💡 Le savais-tu ?

Le symbole mathématique typographique "÷" s'appelle un **obélus**. Il a été inventé par le mathématicien suisse Johann Rahn en 1659 pour son livre "Teutsche Algebra". Composé d'un tiret avec un point au-dessus et en-dessous, il illustre visuellement très bien la notion de fraction, ou de quelque chose séparé au milieu par une barre.

---

## Exercices corrigés détaillés

**Exercice 1 : Le rangement de la bibliothèque**
Le bibliothécaire doit ranger 645 livres dans des boîtes. Chaque boîte ne peut contenir que 8 livres et doit être scellée sans espace vide. Combien de boîtes parfaites obtiendra-t-il ? Et combien de livres restera-t-il hors des boîtes ?

_Correction détaillée :_
- Opération posée : `645 ÷ 8`.
- 1ère étape : Dans 6, combien de fois 8 ? Impossible (0). Je prends 64.
- 2ème étape : Dans 64, combien de fois 8 ? Table de 8 ! $8 \times 8 = 64$. J'écris `8` au Quotient.
- Je soustrais : $64 - 64 = 0$.
- 3ème étape : Je descends le 5. Cela fait 05. 
- 4ème étape : Dans 5, combien de fois 8 ? Zéro fois. C'est très important de l'écrire au quotient ! J'écris `0`. La soustraction donne $5 - 0 = 5$.
- Plus de chiffre à descendre ? C'est fini.
- Résultat : **Quotient = 80**. **Reste = 5**.
- Conclusion : Il aura 80 boîtes remplies scellées, et il restera 5 livres sur la table.

**Exercice 2 : Preuve de calcul**
Antoine trouve le résultat suivant : `150 ÷ 7 = 21` avec un reste de `5`. Sans refaire toute la potence entière, comment vérifier s'il a raison ou s'il s'est trompé ?

_Correction détaillée :_
- On applique la formule de la preuve : (Quotient × Diviseur) + Reste = Dividende.
- Calcul parenthèse : Quotient (21) × Diviseur (7). 
  - $20 \times 7 = 140$. 
  - $1 \times 7 = 7$. 
  - $140 + 7 = 147$.
- On ajoute le reste : $147 + 5 = 152$.
- Antoine s'est trompé ! Le résultat de sa preuve est 152. Son dividende de départ était 150. Le compte n'est pas bon. (Le vrai calcul aurait donné $150 ÷ 7 = 21$ avec un reste de $3$).

---

## ⚡ Flashcards

- **Définition de la Potence (Question) / La Potence (Réponse)**
  -  _Comment s'appelle officiellement la figure en forme de T que l'on dessine pour poser et résoudre une division ?_
  -  _On l'appelle la "Potence" de la division euclidienne._
- **Validation du Reste (Question) / Validation du Reste (Réponse)**
  -  _La division est terminée. Je trouve un reste qui est égal à 9, alors que mon petit diviseur était seulement 7. Quelle est la conclusion ?_
  -  _C'est mathématiquement impossible. Le Reste d'une division doit **absolument toujours** être strictement inférieur au Diviseur. Si ce n'est pas le cas, c'est qu'on a mal cherché dans les tables de multiplication._

---

## Foire Aux Questions (FAQ)

**Q1 : Dois-je obligatoirement écrire avec des traits et des zéros le brouillon des petites soustractions intermédiaires ?**
**R** : Au CM1, oui. C'est ce qu'on appelle "la division posée avec les soustractions intermédiaires apparentes". Cela évite beaucoup de fautes de calcul mental fatales. Plus tard, au collège, ta vitesse mentale s'améliorera et tu pourras utiliser "la méthode experte" qui consiste à retenir l'opération de la soustraction uniquement de tête et d'inscrire le reste caché.

**Q2 : Si un nombre descendu forme seulement un "0", par exemple, j'ai 12 et je descends le 0, ça fait 120. Et si ça forme "00" ?**
**R** : Si tu descends un 0 et que ton reste temporaire devient "00", la question de la boucle reste exactement la même ! "Dans 00, combien de fois il y a le grand diviseur ?" La réponse sera bien évidemment "Zéro fois". Tu inscris donc formellement ce beau `0` du côté de ton Quotient, et l'opération se termine proprement.

---

## 📝 Mini-Quiz

**Question 1 : Tu as calculé une division euclidienne avec pour diviseur le nombre 15. Lequel des restes suivants est impossible à obtenir ?**
- [ ] Le Reste vaut 0.
- [ ] Le Reste vaut 14.
- [x] Le Reste vaut 18.
> **Explication :** Tout à fait ! La règle est stricte : le Reste doit être de valeur inférieure au Diviseur (ici 15). Si tu as 18 de Reste, c'est que tu pouvais encore faire une distribution, il fallait mettre 1 part de plus au quotient !

**Question 2 : La vérification mathématique finale parfaite de la division s'appelle... la preuve par...**
- [x] La formule (Quotient × Diviseur) + Reste = Dividende.
- [ ] L'addition finale pure du Quotient + Dividende = Reste.
> **Explication :** Exact ! Pour retrouver ton stock global initial de base (le Dividende), tu dois simplement multiplier le nombre de paquets distribués par la quantité contenue dans le paquet, et bien sûr rajouter pour finir les petites miettes restantes sous forme d'une addition simple finale.

**Question 3 : Dans l'expression mathématique formelle simple `500 ÷ 50 = 10`, le grand nombre 500 s'appelle...**
- [ ] Le quotient de la méthode.
- [x] Le Dividende de l'expression.
> **Explication :** C'est la bonne réponse ! Le grand chiffre qui va subir le découpage et le partage se situe en début d'équation en ligne, ou en haut à gauche sur la structure papier en croix, et se nomme officiellement le Dividende. Le chiffre 50 est le diviseur.

---

## ✅ Checklist des essentiels (Validation)

- [ ] Je sais correctement dessiner les traits croisés d'une potence sur mon quadrillage et placer de façon juste le précieux Dividende à sa stricte gauche et le Diviseur de l'autre côté à sa stricte droite respectueuse.
- [ ] Je maîtrise l'estimation globale d'un nombre final : je suis capable de tester les bornes "par 1", "par 10" ou "par 100" pour savoir à l'avance combien de chiffres exactement contiendra le fameux quotient posé avant de me lancer.
- [ ] Je n'oublie absolument jamais d'effectuer le rajout final d'attention : je surveille attentivement que le dernier chiffre en cours de descente est bien suivi de l'étape "Dans ... , combien de fois ... ". Même si le résultat donne "Zéro fois", l'inscription du 0 au Quotient est un geste essentiel de l'opération complète.
