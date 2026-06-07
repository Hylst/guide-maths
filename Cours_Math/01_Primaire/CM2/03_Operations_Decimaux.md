---
title: 'Chapitre 3 : Opérations sur les Décimaux'
level: Primaire
subLevel: CM2
order: 3
---
# Chapitre 3 : Opérations avec les Nombres Décimaux

**Niveau** : CM2 (Cycle 3)  
**Prérequis** : L'addition et soustraction posées (CM1) et la connaissance de la virgule décimale.  
**Objectifs** : 
- Aligner parfaitement les virgules pour l'addition et la soustraction de décimaux.
- Compenser les dixièmes/centièmes manquants par des zéros.
- Résoudre des problèmes concrets de monnaie ou de mesures.

---

## 📖 Introduction Pédagogique : Le secret de la caisse enregistreuse !

Tu t'es déjà demandé comment font les caisses enregistreuses des supermarchés pour ne jamais se tromper en rendant la monnaie ? Quand on achète un bonbon à `1,50 €` et un magazine à `4,75 €`, il n'y a pas de magie ! Les caisses alignent scrupuleusement les "centimes" avec les "centimes", et les "Euros" avec les "Euros". 

Grâce à la grande muraille de la **virgule**, tu vas maîtriser avec perfection les opérations à trous des nombres décimaux en évitant les terribles pièges de décalage. Prépare-toi à devenir le champion des additions et soustractions !

---

<div className="no-print">

## 🎨 Schéma Pédagogique Interactif : L'Alignement d'Or

Observe l'axe central rouge ! Tout s'aligne sur la virgule.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
  
  <rect x="20" y="20" width="410" height="40" fill="#f8fafc" rx="8" />
  <text x="225" y="45" font-family="Inter, sans-serif" font-weight="bold" fill="#334155" font-size="16" text-anchor="middle">L'Opération :  142,5  +  37,84</text>
  
  <!-- Ligne repère virgule (Le fil rouge de sécurité) -->
  <line x1="260" y1="80" x2="260" y2="240" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,4"/>
  <text x="260" y="75" font-family="Inter" font-weight="bold" fill="#e11d48" font-size="12" text-anchor="middle">Axe Virgule</text>

  <!-- Ligne 1 : 142,5 -->
  <text x="235" y="115" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#334155" font-size="24" text-anchor="end">142</text>
  <text x="260" y="115" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#f43f5e" font-size="24" text-anchor="middle">,</text>
  <text x="285" y="115" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#0284c7" font-size="24" text-anchor="start">5</text>
  <!-- Zero fantome anime -->
  <g>
    <animate attributeName="opacity" values="0.2; 1; 0.2" dur="2s" repeatCount="indefinite" />
    <rect x="315" y="93" width="25" height="30" fill="#e0f2fe" rx="4"/>
    <text x="320" y="115" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#0369a1" font-size="24" text-anchor="start">0</text>
  </g>

  <!-- Ligne 2 : + 37,84 -->
  <text x="140" y="165" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#10b981" font-size="24" text-anchor="start">+</text>
  <text x="235" y="165" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#334155" font-size="24" text-anchor="end">37</text>
  <text x="260" y="165" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#f43f5e" font-size="24" text-anchor="middle">,</text>
  <text x="285" y="165" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#0284c7" font-size="24" text-anchor="start">84</text>

  <!-- Trait égal -->
  <line x1="120" y1="190" x2="350" y2="190" stroke="#94a3b8" stroke-width="3"/>

  <!-- Résultat -->
  <text x="235" y="225" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#334155" font-size="24" text-anchor="end">180</text>
  <text x="260" y="225" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#f43f5e" font-size="24" text-anchor="middle">,</text>
  <text x="285" y="225" font-family="JetBrains Mono, monospace" font-weight="bold" fill="#0284c7" font-size="24" text-anchor="start">34</text>

  <!-- Info -->
  <text x="225" y="265" font-family="Inter" font-weight="600" fill="#64748b" font-size="12" text-anchor="middle">On ajoute un zéro d'attente pour faciliter le calcul !</text>

</svg>
</div>
</div>

---

## 📚 Partie Théorie Enrichie

### 1. La règle d'Or du "Mûr de Virgule"
Si tu dois poser l'opération `14 + 1,5`, le piège absolu serait d'aligner le 4 avec le 5 complètement à droite.
En CM2, la **seule chose qui compte**, c'est l'axe central de la **virgule**. C'est le mur vertical. Toute virgule doit se trouver rigoureusement au dessous de la précédente.
- `14` n'a pas de virgule visible, mais il s'écrit mathématiquement `14,0`.
- J'aligne mon `14,0` bien au-dessus de mon `1,5` pour que les virgules se superposent en pont.

### 2. Le Zéro salvateur ! (Opération Soustraction)
Lors d'une soustraction, le décalage peut être mortel ! 
Exemple redoutable : `80 - 4,25`.
- J'aligne sur la virgule : `80, ` et dessous `- 4,25`.
- Problème ! Il n'y a personne en l'air au-dessus du "2" et du "5" ! En soustraction, on ne fait pas tomber par miracle les chiffres. "Rien moins 5" c'est impossible. 
- Solution obligatoire : Tu combles avec de gros zéros bien voyants pour écrire `80,00`. 
- Et tu procèdes au bon vieux système des retenues de CP ! ($0 - 5 \rightarrow 10 - 5$).

### 3. Les Retenues normales
Au cœur de l'opération, la virgule décimale est "totalement transparente". Si `0,8 + 0,3 = 11`, tu poses proprement ton 1 et tu fais passer la belle retenue du dizaine comme d'habitude tout à fait à gauche de la virgule pour gonfler l'entier d'à côté ! 

---

## 📌 Rappels

- Sur les additions classiques de nombres entiers (CM1), on alignait "par les rails de droite". Cette loi n'a **plus aucune valeur** pour les décimaux. C'est la loi de la Virgule qui écrase tout.
- Le petit signe Virgule doit impérativement descendre de son ascenseur vers le Résultat final. Sans elle, ta réponse est 10 ou 100 fois trop grosse !

---

## 💡 Le Saviez-vous ?

On utilise les opérations de nombres décimaux tous les jours ! Les caissiers s'en servent pour te rendre la monnaie, mais c'est aussi utilisé au dixième de seconde près dans un relais $4 \times 100\text{m}$ aux Jeux Olympiques. Le record du monde incroyable de Usain Bolt au 100m est calé en durée sur des décimales formelles : **$9,58$** secondes. Oseras-tu l'additionner pour estimer le temps fait sur une distance doublée ? 

---

<div className="no-print">

## 🧠 Flashcards

<div className="flex flex-wrap gap-6 justify-center my-8">
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-rose-500 font-bold mb-2">Piège de l'alignement</span>
        <span className="font-medium text-lg text-slate-700">Pour poser 13 + 5,42 je cale le \`3\` au dessus du \`2\` car ils sont tout au fond à droite ?</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">FAUX ABSOLU !</span>
        <span className="text-sm mt-2">Le vrai chiffre entier lourd est le "3" des unités ! Il ne s'aligne que face à face avec le "5". Je devrai transformer mon $13$ en **$13,00$**.</span>
      </div>
    </div>
  </div>
  <div className="group w-72 h-48 [perspective:1000px]">
    <div className="w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer shadow-indigo-100 shadow-lg rounded-2xl">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl [backface-visibility:hidden] p-4">
        <span className="text-sm text-emerald-500 font-bold mb-2">Mental</span>
        <span className="font-medium text-lg text-slate-700">Calcule rapidement de tête : $0,5 + 0,5$ !</span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500 text-white rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
        <span className="text-sm font-bold opacity-80 mb-2">Réponse</span>
        <span className="text-xl font-bold">1 Pil! </span>
        <span className="text-sm mt-2">Une moitié et une moitié reforment le socle de l'Unité magique intacte ! Tu te souviens que dix "dixièmes" remontent à se re-verrouiller en $1$.</span>
      </div>
    </div>
  </div>
</div>

</div>

---

## ✍️ Exercices corrigés détaillés

### Exercice 1 : Le Ticket de la Boulangerie
Léa achète une incroyable tarte à `$12,80 €$` et une boisson pointée à `$1,5 €$`. Quelle somme formelle exacte et fine doit-elle confier à la dame de caisse ?

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
1. J'applique ma loi absolue de la "Tour des Virgules". J'aligne le `$12,80$` en haut, et le `$1,5$` viendra verrouiller sa virgule rigoureusement sous la cadette !
2. Pour ne pas me retrouver "à l'aveugle" du vide de centièmes du `$1,5$`, je le fortifie en complétant un `0` : il me donne au visuel un bienveillant `$1,50$`. 
3. Je pose ma barre et j'additionne formellement la colonne en commençant toujours par le dernier wagon tout à droite.
    - $0 + 0 = 0$
    - $8 + 5 = 13$ (je pose le `3` en place, je glisse et passe au sec ma belle petite retenue vers la sphère des nombres pleins Entiers).
    - Mon mur de virgule fait l'ascenseur au cordeau tout du long pour s'installer !
    - $2 + 1 + 1$ (la réserve) $= 4$.
    - Le gros $1$ final entier de devant descend.
4. Résultat propre : **$14,30 €$**.
</details>

### Exercice 2 : La monnaie du chaland !
Léa a payé avec un grand billet lourd de `$20 €$`. Quel montant net la caissière est dans l'obligation rude de lui rembourser pour équilibrer l'achat de $14,30 €$  ?

<details className="mt-4 p-5 border border-slate-200 rounded-2xl bg-slate-50">
<summary className="font-bold text-indigo-600 cursor-pointer hover:text-indigo-700">Voir la correction détaillée</summary>

**Correction Pas-à-Pas :**
C'est le jeu de la "Moustiquaire de Zéros" !
1. Je pose mon billet colossal plein : le $20$. Et je le soustrais avec le cout précis de $14,30$.
2. Le `$14,30$` se positionne avec son "4" droit posé sous l'immense et massif "0" lourd du 20 d'origine et la virgule décalée.
3. Alerte fatale Moustiquaire ! Le $20$ n'a strictement plus rien en "queue d'air" pour opposer son bloc à la valeur pleine de décimales adverses. 
4. Tu le combles par force ! : Le **$20$** mute en grand **$20,00$**.
5. Je peux à présent faire la retenue magique pour chaque "case manquante soustraite". ($10 - 3 = 7$ etc)
6. Déroulé des retenues. ($0-0=0$). ($10-3=7$ / réserve). ( $10-5 = 5$ / réserve). ( $2-2 = 0$).
7. Rendu magnifique : **$5,70 €$**.
</details>

---

## ❓ Foire Aux Questions (FAQ)

**Q1 : Monsieur, ma virgule a légèrement décalé un chiffre car j'ai écrit trop gros, serai-je tout faux ?**
**R** : Fort probablement ! C'est le socle principal. Prends une feuille à carreaux mathématique SeSey ! Fais loger un unique habitant chiffré au sein d'un fin carreau distinct, avec ton trait plein de séparation en mur. Tes calculs seront protégés !

**Q2 : Lors de soustractions décimales, si mon trou vide est à bas en position, ex : $12,48 \ - \ 1,2$... puis-je juste "descendre en chute libre" le chiffre 8 supérieur ?**
**R** : Totalement ! La règle formelle c'est : "Rien - Quelque-chose" (trou en haut) = Catastrophe ! Mais "8 moins Rien" (Trou vide d'attente à bas en dessous : "zéro") ça fait bien ton `8` ! C'est libre en descente si le vide est en contrebas logés !

---

## 📝 Mini-Quiz

**Question 1 : Tu ajoutes avec courage `24,1 + 3,82`. Lequel de ces montages représente l'Alignement Pur Validé ?**
- [ ] J'additionne mon mur final de mon "1" décimal avec le "2" ultime de queue arrière.
- [x] L'imposant chiffre "4" du lourd `24,1` se frottera rudement mais au millimètre près en frontal vertical au dessus du fin "3" !

> **Explication :** Bingo à toi ! Les unités se connectent de front ! Le 4 entier des unités répond directement au 3. (Et la "queue du 2 arriere de centième" atterira esseulée derrière ce mur mais en bonne attente vide au dessus de lui).

**Question 2 : La maîtresse me tend une petite traîtresse soustraction : $8 - 3,5$ !**
- [x] Je place le 8 majuscule formel. J'invente sur le temps mon virgule-zéro : `$8,0$`. Et j'effectue vaillamment mes réserves croisées et mon vol de dizaine de passage d'emprunt ! (résultat formel $4,5$ !)
- [ ] Je jette dans l'oubliette sa virgule, je retire le "3" au "8" de face à face. Ça fait donc "$5$ , puis le décimal $.5$ en queue"... Soit 5,5 ?

> **Explication :** Bien joué agent ! Ce n'est pas "5,5" ! Tu n'as pas le droit d'ignorer la ponction de la composante des portions. Tu dois bel et bien emprunter la capacité de retenue vers la valeur haute. L'astuce du ",0" te rend toute la magie mécanique du geste visuel. $8,0 - 3,5$ fait s'éclipser les portions de charge formelle : on est bien sûr de descendre sur du pur $4,5$ justifié.

---

## ✅ Checklist des Essentiels (Validation)

- [ ] L'Alignement Divin ! Je le rêve la nuit ! Même en absence formelle de pointée, je superpose sans bavure toutes les unités face face des éléments proposés à calcul !
- [ ] Dès l'affichage du symbole "$-$", je dégaine direct et instantanément ma botte magique des "zéros" au marqueur vert vif pour sécuriser toute faille en attente ou manque aérien d'entier d'attaque du blocage supérieur visuel !
- [ ] Je garde le calme intérieur constant et ne précipite rien car cette opération reste fondamentalement de logique purement égale à l'ancienne des cours de mon CE2 de la retenue. On y glisse de face ses virgules tel un ascenseur libre de toute entrave !
