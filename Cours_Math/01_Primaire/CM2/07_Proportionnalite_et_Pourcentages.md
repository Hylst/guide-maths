---
title: 'Chapitre 7 : Proportionnalité et Pourcentages'
level: Primaire
subLevel: CM2
order: 7
---
# Chapitre 7 : Proportionnalité et Pourcentages

**Niveau** : CM2 (Cycle 3)  
**Prérequis** : Maîtrise des divisions/multiplications par 10, 100 et fractions simples (le quart, la moitié).  
**Objectifs** : 
- Reconnaître une situation de proportionnalité dans un problème ou un tableau.
- Résoudre un problème de proportionnalité simple (passage à l'unité, coefficient).
- Comprendre la notion de pourcentage ($100$ étant le tout) et calculer un pourcentage usuel ($50\%$, $25\%$, $10\%$).

---

## 📖 Introduction Pédagogique : Le secret des recettes de cuisine !

As-tu déjà organisé une fête ? Ton incroyable recette de gâteau au chocolat est écrite pour **4 personnes**. Mais boom ! 12 invités s'annoncent à ta porte ! Alerte ! Vas-tu improviser au hasard et risquer de ruiner le gâteau avec trop de sucre ou pas assez d'œufs ? 

Non ! Tu vas utiliser la magie absolue des mathématiques : La **Proportionnalité**. C'est le pouvoir de "tout gonfler" ou de "tout rétrécir" de manière parfaite et équilibrée. Et le cousin de la proportionnalité, c'est le **Pourcentage**, l'arme redoutable qui te permettra plus tard de calculer tes incroyables soldes dans les magasins. Prêt à dominer les proportions ?

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : L'Amplificateur parfait !

Pour qu'un tableau soit proportionnel, TOUT doit être gonflé par le même multiplicateur.

<div align="center">
<svg width="550" height="280" viewBox="0 0 550 280" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="510" height="40" fill="#f8fafc" rx="8" />
  <text x="275" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">La Recette Proportionnelle (Le Coefficient x3)</text>

  <!-- Le Tableau Base -->
  <line x1="80" y1="120" x2="380" y2="120" stroke="#94a3b8" stroke-width="2"/> <!-- Ligne H1 -->
  <line x1="80" y1="180" x2="380" y2="180" stroke="#94a3b8" stroke-width="2"/> <!-- Ligne H2 -->
  <line x1="80" y1="120" x2="80" y2="240" stroke="#94a3b8" stroke-width="2"/> <!-- Ligne V1 -->
  <line x1="200" y1="120" x2="200" y2="240" stroke="#94a3b8" stroke-width="2"/> <!-- Ligne V2 (séparateur label) -->
  <line x1="290" y1="120" x2="290" y2="240" stroke="#94a3b8" stroke-width="2"/> <!-- Ligne V3 -->
  <line x1="380" y1="120" x2="380" y2="240" stroke="#94a3b8" stroke-width="2"/> <!-- Ligne V4 -->
  <line x1="80" y1="240" x2="380" y2="240" stroke="#94a3b8" stroke-width="2"/> <!-- Ligne H3 -->

  <!-- Contenu Ligne 1 -->
  <text x="140" y="155" font-family="Inter" font-weight="bold" fill="#475569" font-size="14" text-anchor="middle">Personnes</text>
  <text x="245" y="155" font-family="JetBrains Mono" font-weight="bold" fill="#334155" font-size="18" text-anchor="middle">4</text>
  <text x="335" y="155" font-family="JetBrains Mono" font-weight="bold" fill="#0284c7" font-size="18" text-anchor="middle">12</text>

  <!-- Contenu Ligne 2 -->
  <text x="140" y="215" font-family="Inter" font-weight="bold" fill="#475569" font-size="14" text-anchor="middle">Œufs</text>
  <text x="245" y="215" font-family="JetBrains Mono" font-weight="bold" fill="#334155" font-size="18" text-anchor="middle">3</text>
  <!-- Résultat animé -->
  <g>
    <animate attributeName="opacity" values="0; 1; 1; 0" dur="4s" repeatCount="indefinite" />
    <text x="335" y="215" font-family="JetBrains Mono" font-weight="bold" fill="#10b981" font-size="22" text-anchor="middle">9</text>
  </g>

  <!-- Flèches d'opération Horizontale -->
  <path d="M 260 140 Q 290 125 320 140" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
  <polygon points="320,140 315,135 315,145" fill="#f43f5e"/>
  <text x="290" y="130" font-family="Inter" font-weight="bold" fill="#e11d48" font-size="14" text-anchor="middle">× 3</text>

  <path d="M 260 200 Q 290 185 320 200" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
  <polygon points="320,200 315,195 315,205" fill="#f43f5e"/>
  <g>
    <animate attributeName="opacity" values="0.3; 1; 0.3" dur="2s" repeatCount="indefinite" />
    <text x="290" y="190" font-family="Inter" font-weight="bold" fill="#e11d48" font-size="14" text-anchor="middle">× 3</text>
  </g>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. Qu'est-ce qu'une "Proportion" ?
C'est une situation où **deux quantités évoluent au même rythme absolu**.
- Exemple VRAI : "1 cahier coûte 2 €". Donc 3 cahiers coûteront 6 €. Tout grandit en même temps. (Si la quantité triple, le prix triple !).
- Exemple FAUX : "À 10 ans, je mesure 1m40". Est-ce que cela veut dire qu'à 20 ans (l'âge a doublé), je mesurerai 2m80 ?! Non : La taille d'un humain n'est **pas** proportionnelle à son âge.

### 2. Comment résoudre (Passage à l'unité)
Si 4 stylos coûtent 12 € et qu'on cherche le prix de 7 stylos :
Redescends d'abord pour **chercher la valeur de "1 seul" stylo** !
- Je trouve l'Unité : $12 € \div 4 \text{ stylos} = \text{Un stylo vaut } 3 €$.
- Je multiplie : $7 \text{ stylos} \times 3 € = 21 €$ !
D'où le nom puissant du "Passage à l'unité".

### 3. Les Pourcentages (%)
"$50\%$", ça veut strictement dire "50 morceaux pris sur 100".  
Au CM2, il faut connaître les raccourcis :
- **$50\%$** = La Moitié exacte (Divise par 2).
- **$25\%$** = Le Quart (Divise logiquement par 4).
- **$10\%$** = Un Dixième (Divise par 10 : on enlève un Zéro ou on décale la virgule).

---

## 📌 Rappels

- Un dessin ou schéma peut parfois remplacer un grand tableau compliqué. Fais au plus simple pour visualiser.
- Un pourcentage de réduction s'enlève au prix total (solde), un pourcentage d'augmentation s'ajoute !

---

## 💡 Le Saviez-vous ?

En architecture, on utilise systématiquement la proportionnalité pour créer des "Maquettes" ! Les ingénieurs construisent d'abord un modèle réduit à l'échelle pour tester la résistance du bâtiment, avant d'appliquer un multiplicateur géant pour bâtir le vrai gratte-ciel.

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-emerald-500 font-bold mb-2">Vrai ou Faux ?</span>
        <span className="font-medium text-lg text-slate-700">À 6 mois un chat pèse 2 kg. À 18 mois, il pèsera 6 kg. Vrai ou Faux ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">FAUX (Piège !)</span>
        <span className="text-sm mt-2">Le poids d'un être vivant n'est pas proportionnel à son âge. Sinon on pèserait des centaines de kilos à l'âge adulte !</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-indigo-500 font-bold mb-2">Mental</span>
        <span className="font-medium text-lg text-slate-700">Une veste à 40 € est soldée à $50\%$. Quelle est l'économie réalisée ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">20 € épargnés !</span>
        <span className="text-sm mt-2">$50\%$ correspond exactement à la moitié. La moitié de 40, c'est 20.</span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Plein d'Essence
Pour sa voiture, maman paie $10\ €$ pour $5$ litres d'essence. Combien paiera-t-elle si elle prend $25$ litres ?

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
1. Méthode experte avec multiplicateur direct : Pour passer de $5$ litres à $25$ litres, on fait $\times \ 5$. 
2. Le prix doit subir exactement la même chose. $10\ € \times 5 = 50\ €$.
(La méthode unitaire marcherait aussi : on divise pour trouver 1 litre -> 2€ le litre. Puis $25 \times 2 = 50€$).
</details>

### Exercice 2 : Raccourcis de Solde 
Une console coûte 400 €. Il y a une réduction de $25\%$. Combien d'argent vas-tu économiser, et combien vas-tu payer au final ?

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
1. L'économie : $25\%$ correspond au "Quart" (diviser par 4). 
2. $400 \div 4 = 100$. Tu économises **100 €** posés !
3. Le prix final ? On n'oublie pas de soustraire la réduction : $400 - 100$ = **300 €** sortis de la poche.
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Comment calculer mentalement $1\%$ ?**
**R** : Divise par 100 ! (Tu enlèves les deux derniers zéros, ou tu décales la virgule de deux rangs). $1\%$ de $500$ = $5$.

**Q2 : Les tableaux, on doit toujours faire le lien de la 1ère colonne vers la 2ème ?**
**R** : Non ! Il y a deux types de flèches (multiplicateurs). Soit à l'horizontale (ligne du haut $\times ??$ = ligne du bas), soit à la verticale (colonne de gauche $\times ??$ = colonne de droite). Choisis ce qui est le plus facile à calculer de tête !

---

## 📝 Mini-Quiz

**Question 1 : Si 2 kg de pommes coûtent $6\ €$, combien coûtent 0,5 kg de pommes ?**
- [x] L'équation donne : $1.50$ € !
- [ ] On paie $3\ €$.

> **Explication :** Bien joué. Si 2 kg font 6€ (donc 1 kg fait 3€). Alors un demi-kilo (0,5), c'est la moitié de 3€. Soit $1,50\ €$ !

**Question 2 : La chemise est à 40 €. Le magasin fait une grande remise : $-10\%$. Le prix à payer en CAISSE sera :**
- [ ] 4 €
- [x] 36 €

> **Explication :** Bingo ! 10% de 40€, c'est 4€ enlevés ($-1$ zéro sur le 40). MAIS c'est le montant APRES réduction que l'on paie : $40 - 4 = 36$ €.

---

## ✅ Checklist des Essentiels (Validation)

- [ ] Je sais ce qu'est un "passage à l'unité". 
- [ ] Les 3 totems des pourcentages vitaux sont acquis: $50\%$ (la moitié $\div 2$), $25\%$ (le quart $\div 4$) et $10\%$ (le dixième $\div 10$).
- [ ] Face à un problème de la vie courante, je vérifie par simple bon sens si c'est réellement proportionnel (ex: l'âge/le poids !).
