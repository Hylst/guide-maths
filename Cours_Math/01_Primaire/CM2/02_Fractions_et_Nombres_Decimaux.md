---
title: 'Chapitre 2 : Fractions et Nombres Décimaux'
level: Primaire
subLevel: CM2
order: 2
---
# Chapitre 2 : Fractions et Nombres Décimaux

**Niveau** : CM2 (Cycle 3)  
**Prérequis** : Fractions simples, compréhension de la virgule et des nombres décimaux (CM1).  
**Objectifs** : 
- Maîtriser l'équivalence entre fraction décimale et nombre décimal.
- Passer d'une écriture fractionnaire à un nombre à virgule et inversement.
- Encadrer et intercaler des nombres décimaux.
- Connaître des équivalences usuelles clés (1/2 = 0,5 ; 1/4 = 0,25).

---

## 📖 Introduction Pédagogique : Les deux visages de la précision

Imagine que tu doives mesurer très précisément un gramme d'or ou peser un centilitre de parfum de luxe. Pour exprimer ces minuscules quantités de façon exacte, les mathématiciens ont inventé **deux langages** qui expriment exactement la même chose, comme de purs synonymes :
- **Le langage des Fractions Décimales** : $\frac{1}{10}$, $\frac{35}{100}$ (Des parts coupées en 10, 100 ou 1000).
- **Le langage des Nombres Décimaux** : $0,1$, $0,35$ (L'utilisation de la fameuse virgule).

Au CM2, ton super-pouvoir mathématique sera de jongler entre ces deux expressions à la vitesse de l'éclair, tel un traducteur bilingue parfait !

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : La traduction

La mécanique est magique : le nombre de zéros en bas te donne la place de la virgule !

<div align="center">
<svg width="550" height="250" viewBox="0 0 550 250" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <text x="275" y="40" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">Passerelles : Fractions $ \rightarrow $ Décimaux</text>

  <!-- Exemple 1 : Dixième -->
  <g transform="translate(60, 80)">
    <!-- Rectangle de fond doux -->
    <rect x="0" y="0" width="130" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" rx="12"/>
    <!-- Fraction -->
    <text x="65" y="35" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#475569" font-size="18" text-anchor="middle">3</text>
    <line x1="45" y1="42" x2="85" y2="42" stroke="#94a3b8" stroke-width="2"/>
    <text x="65" y="60" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#0284c7" font-size="18" text-anchor="middle">10</text>
    <!-- Flèche conversion -->
    <text x="65" y="85" font-family="Inter" font-weight="bold" fill="#94a3b8" font-size="14" text-anchor="middle">↓</text>
    <!-- Résultat -->
    <text x="65" y="105" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#0369a1" font-size="20" text-anchor="middle">0,3</text>
  </g>

  <!-- Exemple 2 : Centième -->
  <g transform="translate(210, 80)">
    <rect x="0" y="0" width="130" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" rx="12"/>
    <!-- Fraction -->
    <text x="65" y="35" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#475569" font-size="18" text-anchor="middle">45</text>
    <line x1="40" y1="42" x2="90" y2="42" stroke="#94a3b8" stroke-width="2"/>
    <text x="65" y="60" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#10b981" font-size="18" text-anchor="middle">100</text>
    <!-- Flèche conversion -->
    <text x="65" y="85" font-family="Inter" font-weight="bold" fill="#94a3b8" font-size="14" text-anchor="middle">↓</text>
    <!-- Résultat -->
    <text x="65" y="105" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#047857" font-size="20" text-anchor="middle">0,45</text>
  </g>

  <!-- Exemple 3 : Millième -->
  <g transform="translate(360, 80)">
    <rect x="0" y="0" width="130" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" rx="12"/>
    <!-- Fraction -->
    <text x="65" y="35" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#475569" font-size="18" text-anchor="middle">8</text>
    <line x1="30" y1="42" x2="100" y2="42" stroke="#94a3b8" stroke-width="2"/>
    <text x="65" y="60" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#8b5cf6" font-size="18" text-anchor="middle">1000</text>
    <!-- Flèche avec mini animation rebond -->
    <text x="65" y="85" font-family="Inter" font-weight="bold" fill="#94a3b8" font-size="14" text-anchor="middle">
      <animate attributeName="y" values="85;90;85" dur="1.5s" repeatCount="indefinite" />
      ↓
    </text>
    <!-- Résultat -->
    <text x="65" y="105" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#6d28d9" font-size="20" text-anchor="middle">0,008</text>
  </g>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. Transformer une Fraction en Décimal 
Une **fraction décimale** possède un dénominateur (le chiffre du bas) valant $10$, $100$ ou $1\ 000$.
Le nombre de **zéros** du dénominateur t'indique *exactement* le nombre de chiffres qui devront se retrouver obligatoirement derrière la virgule (la partie décimale) :
- Sur $\frac{35}{10} \rightarrow$ \ "$10$" n'a qu'un zéro. Je place $1$ chiffre après la virgule : **$3,5$**.
- Sur $\frac{35}{100} \rightarrow$ \ "$100$" possède deux zéros. Je place $2$ chiffres après la virgule : **$0,35$**.
- Sur $\frac{8}{1000} \rightarrow$ \ "$1000$" a trois zéros. Je veux $3$ chiffres après la virgule, j'ajoute les miens pour combler le vide : **$0,008$**.

### 2. Le chemin inverse (Décimal vers Fraction)
Si on te donne $2,46$ et de l'annuler en fraction :
- Compte les chiffres derrière la virgule : il y en a 2 (le `4` et le `6`). Mon dénominateur magique prendra donc 2 zéros (le nombre $100$).
- Enlève totalement la virgule du nombre global et pose-le en haut majestueusement : $246$.
- Résultat de l'opération : $\frac{246}{100}$.

### 3. Les Equivalences indétrônables du marché !
Il existe 3 fractions rebelles de tous les jours qui n'ont pas un socle décimal de base (pas de 10 ou 100) mais qu'il faut connaître par cœur car elles dominent le monde :
- **Un Demi** ($\frac{1}{2}$) : Moitié de 1, cela vaut très précisément **$0,5$** !
- **Un Quart** ($\frac{1}{4}$) : Moitié du demi, cela fait **$0,25$** !
- **Trois Quarts** ($\frac{3}{4}$) : C'est comme rassembler 3 pièces de vingt-cinq centimes : **$0,75$** !

### 4. Intercaler de l'Infiniment Petit
Contrairement aux entiers normaux de CP réguliers : Entre $3$ et $4$, il y a de l'espace infini en décimales !
Je peux y placer le nombre $3,5$.
Si on me demande d'intercaler un choix de nombre précis et pointu entre $3,5$ et $3,6$, je rajoute mes microscopiques zéros pour m'aider visuellement pour lire $3,50$ et $3,60$.
D'un coup, on voit qu'entre "50" et "60", il y a de la place ! On peut glisser le choix : $3,51$ ou $3,57$ !

---

## 📌 Rappels

- Seuls les zéros situés tout à droite de la virgule sans qu'aucun chiffre de valeur ne les croise, sont totalement inutiles (Exemple : $4,500$ = $4,5$). 
- Par contre le Zéro glissé au cœur intime de l'intérieur de la valeur ($4,05$) est indispensable et indéboulonnable !

---

## 💡 Le Saviez-vous ?

La célèbre virgule a été théorisée par un très grand astronome allemand nommé **Johannes Kepler** lors de ses difficiles calculs temporels de la course des astres en orbite. Avant lui, les pauvres écoliers et les commerçants devaient aligner sur du papier des colonnes d'additions en calculant séparément les tranches entières, puis les tranches fractionnées, ce qui entraînait des erreurs monstrueuses de comptabilité dans les calculs navals en pleine mer ! 

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-emerald-600 font-bold mb-2">Traduction inversée !</span>
        <span className="font-medium text-lg text-slate-700">Quelle est la traduction sous forme de grande fraction sur barre de : 0,42 ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">42/100</span>
        <span className="text-sm mt-2">Le $0,42$ possède formellement deux locataires derrière sa virgule. On prend le bloc $42$ brut en haut, et en bas un bloc 1 avec 2 zéros (le Cent).</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">Le Trio Rebelle</span>
        <span className="font-medium text-lg text-slate-700">Dans un gâteau, si on demande de réserver $3/4$, ça représente le même poids que 0,5 ou que 0,75 pointé ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">0,75 !</span>
        <span className="text-sm mt-2">La moitié $1/2$ c'est $0,5$ ; le petit quart c'est la cassure du $0,25$. Donc $3$ quarts amassés se consolident à valoir la base du $0,75$ !</span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le passeport du Décimal !
Propose sur un papier de retranscrire très fidèlement en nombre décimal pointé, la fraction lourde suivante : $\frac{452}{10}$.

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
Rien de plus logique pour un agent ! 
- Identifions l'indice secret du mot du bas : Le $10$. L'indice du 10 c'est de comporter un unique et splendide zéro !
- La loi martiale de l'orthographe dit : "Le résultat final au marché n'aura le droit formel que d'avoir UN SEUL chiffre à l'arrière final de la virgule !".
- Je recopie mon lourd nombre complet : `452`. Et je recule d'une case unique en insérant majestueusement le barrage-virgule : **$45,2$**.
- Note additionnelle : L'erreur tragique serait "0,452" (trop de décalages par peurs). Aie confiance en la stricte présence du nombre de zéros en dessous du trait de séparation !
</details>

### Exercice 2 : L'espace d'attente à combler !
Intercale et choisis moi une fraction juste et acceptable valide qui va pouvoir se caler pour rentrer pile dans le très petit écartement compris ouvertement entre $4,1$ et $4,2$.

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
C'est le jeu de grossir à la loupe et au microscope !
- Visuellement tu paniques car ces numéros se succèdent... (1 puis 2 !).
- L'astuce imparable des champions géomètres : Gonfle artificiellement tes espaces d'attente aveugles en apposant le droit d'ajouter un zéro infini !
- Lisons le $4,10$ d'un regard et du second œil le grand $4,20$ d'attente. Merveille magique : j'ai une suite de 9 cases de disponibles entre le dix et le vingt ! 
- Je place tranquillement et valablement la réponse victorieuse au milieu : Mon bloc de **$4,15$** ou bien un beau **$4,12$**.
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Ma grande sœur a recopié brutalement au feutre `02,5` sur son cahier. Serai-je puni si je recopie ça ?**
**R** : Bien sûr ! Des principes de notation existent. Le zéro initial est inutile car le bloc des nombres entiers s'écrit tout à fait normalement `2`. Il se verra supprimé d'office par la correction informatique et la grammaire au cycle du collège. Mais écrire gentiment au petit stylo d'attente son zéro pour "voir et glisser" sa virgule peut se tolérer en strict passage privé de brouillon mathématique temporaire devant soi pour construire.

**Q2 : Que se passe-t-il visuellement si en haut je n'ai pas assez de réserve de nombres pour faire reculer ma petite virgule au décimal de fractions sur des nombres de Mille ? (Exemple : $14 / 1000$)**
**R** : Cette astuce de secours est bien présente ! On doit loger ses $3$ chiffres de règles à la ligne après sa virgule (car 1000 amène ses lourds trois zéros de blocage formel !). Le chiffre donné haut fait juste malheureux "14". Tu crées à ta force visuelle de superbes réserves supplémentaires fantômes en inventant le renfort des 0 ! Ta retranscription devient : "0 ,0 1 4". Ainsi on y compte fidèlement 3 habitants abrités derrière son grand blocage virgule !

---

## 📝 Mini-Quiz

**Question 1 : Si j'efface les 3 traits et zéros intimes de ma majestueuse fraction $\frac{38}{100}$ (Trente-huit centièmes), vers quelle nature et identité pointe magiquement le tirage en conversion mathématique brute de l'autre dialecte décimal de tableau ?**
- [ ] Le calcul renvoie immédiatement la note valant `3,8` très nette et juste en placement décimal formel de passage.
- [x] L'horloge indique le décalage fin et formel total affichant un bloc valide pur : `0,38`.

> **Explication :** Excellent décodage de vue mathématique. La structure $100$ du dénominateur en position bloque l'obligation lourde des $2$ zéros qui se basculeront sur la forme droite en deux cases justes post-virgule (arrimant solidement le `3` sur sa position fine de *dixième* et propulsant au bout le `8` en valeur nominale pure *centième* formelle).

**Question 2 : Entre quel choix purement chiffré peux-tu venir glisser formellement et avec validation officielle par la cour mathématique ta virgule intercalée de position : $2,49$ !**
- [ ] Dans le maigre mais fin trou laissé logiquement libre d'attente placé entre $2,4$ et le bloc en $2,5$.
- [x] Uniquement dans le couloir très restreint localisé pile entre $2,48$ naturel de base et $2,50$ du compte.

> **Explication :** La ruse ici a confondu. Les deux blocs propositions sont techniquement exacts de validité de placement ! Entre un 2,4 et un 2,5 tu as une suite invisible en couloir infini : (2,40 , ... 2,49 ... 2,50). Et évidement le logis strict juste avant de passer en 2,50 est la fraction unifiée de centièmes 49 (soit 2,49 validé à droite du précédent de base : le 2,48 d'attente d'incrementation classique chiffré mathématique !). (Mais le QCM a pour attente la plus technique et refermée des choix : donc le couloir exact 2,48 - 2,50 !).

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Automatisme ! Traduire sur brouillon et à la vue d'instinct avec fluidité un dixième / $10$ qui correspond à basculer un espace d'horlogerie de $1$ seul point derrière le marqueur virgule !
- [ ] Réussir à identifier le couple fusionnel des Rebelles de Fractions simples et du langage d'emprunt d'usure décimale d'origine : 1 Quart posé avec l'identité du $0,25$ pointé, et son homologue 1 Demi avec un $0,5$ !
- [ ] Je sais à présent glisser "à vue de tête" n'importe quelle insertion demandée et validée dans toute zone séparative coincée de chiffre décimal de type CM2 en étirant ma visée par le simple usage "Zéro optique" d'ajout imaginaire pour grossir !
