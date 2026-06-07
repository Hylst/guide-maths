---
title: 'Chapitre 2 : Les Équations du Premier Degré'
level: College
subLevel: 4eme
order: 2
---
# Chapitre 2 : Les Équations du Premier Degré

**Niveau** : 4ème (Cycle 4)  
**Prérequis** : Calcul littéral (réduire, distributivité), nombres relatifs.  
**Objectifs** : 
- Comprendre le concept d'équation et d'inconnue.
- Résoudre algébriquement une équation simple.
- Mettre un problème en équation.

---

## Activités de découverte

**Activité : La balance en équilibre**

Imagine une balance à plateaux parfaitement équilibrée.
- À gauche : 2 boîtes mystères (notées $x$) et un poids de 3 kg.
- À droite : 1 boîte mystère et un poids de 8 kg.
L'équilibre s'écrit : $2x + 3 = x + 8$.
Si tu enlèves une boîte de chaque côté, la balance reste équilibrée : $x + 3 = 8$.
Si tu enlèves 3 kg de chaque côté, il reste : $x = 5$.
La boîte mystère pèse donc 5 kg ! Tu viens de résoudre une équation.

## 🎨 Animation Interactive : La Balance Algébrique
Regarde comment manipuler la lourde balance en temps réel pour démasquer le poids exact de $x$. Soustraire, diviser... Tant que c'est symétrique, on garde la vérité !

<div align="center">
<svg width="400" height="250" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="background:#fef2f2; border-radius:12px; border: 2px solid #ef4444;">
  
  <text x="200" y="30" font-family="sans-serif" font-weight="bold" fill="#b91c1c" font-size="18" text-anchor="middle">Isoler "x" pour trouver l'Équilibre</text>
  
  <!-- Structure de la balance -->
  <line x1="200" y1="200" x2="200" y2="100" stroke="#7f1d1d" stroke-width="4"/>
  <polygon points="170,200 230,200 200,170" fill="#7f1d1d"/>

  <!-- Le grand Fléau de la Balance -->
  <g>
    <!-- Animation de bascule subtile -->
    <animateTransform attributeName="transform" type="rotate" values="0 200 100; -2 200 100; 2 200 100; 0 200 100" dur="4s" repeatCount="indefinite" />
    <line x1="80" y1="100" x2="320" y2="100" stroke="#7f1d1d" stroke-width="4"/>
    
    <!-- Plateau Gauche -->
    <line x1="80" y1="100" x2="80" y2="150" stroke="#991b1b" stroke-width="2"/>
    <path d="M 40,150 Q 80,180 120,150 Z" fill="#fca5a5" stroke="#991b1b" stroke-width="2"/>
    
    <!-- Plateau Droit -->
    <line x1="320" y1="100" x2="320" y2="150" stroke="#991b1b" stroke-width="2"/>
    <path d="M 280,150 Q 320,180 360,150 Z" fill="#fca5a5" stroke="#991b1b" stroke-width="2"/>

    <!-- Contenu Gauche : 2x + 3 -->
    <g transform="translate(60, 130)">
       <!-- Boîte X #1 -->
       <rect x="0" y="-10" width="20" height="20" fill="#3b82f6" rx="3">
       </rect>
       <text x="10" y="5" font-family="sans-serif" font-weight="bold" font-size="12" fill="#fff" text-anchor="middle">x</text>
       
       <!-- Boîte X #2 (Va disparaître pour simuler le -x) -->
       <g>
         <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.3;0.4;0.9;1" dur="8s" repeatCount="indefinite"/>
         <rect x="25" y="-10" width="20" height="20" fill="#3b82f6" rx="3"/>
         <text x="35" y="5" font-family="sans-serif" font-weight="bold" font-size="12" fill="#fff" text-anchor="middle">x</text>
       </g>

       <!-- Poids de 3kg -->
       <circle cx="20" cy="-25" r="12" fill="#f59e0b"/>
       <text x="20" y="-21" font-family="sans-serif" font-weight="bold" font-size="10" fill="#fff" text-anchor="middle">3</text>
    </g>

    <!-- Contenu Droit : 1x + 8 -->
    <g transform="translate(300, 130)">
       <!-- Boîte X #1 (Va disparaître) -->
       <g>
         <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.3;0.4;0.9;1" dur="8s" repeatCount="indefinite"/>
         <rect x="-10" y="-10" width="20" height="20" fill="#3b82f6" rx="3"/>
         <text x="0" y="5" font-family="sans-serif" font-weight="bold" font-size="12" fill="#fff" text-anchor="middle">x</text>
       </g>
       
       <!-- Poids de 8kg divisé virtuellement (5kg et 3kg) -->
       <!-- Le bloc de 3 disparait pour l'étape 2 -->
       <g transform="translate(15, -15)">
         <!-- Le vrai poids -->
         <circle cx="0" cy="0" r="16" fill="#f59e0b"/>
         <text x="0" y="4" font-family="sans-serif" font-weight="bold" font-size="12" fill="#fff" text-anchor="middle">
           <animate attributeName="textContent" values="8; 8; 5; 5; 8" keyTimes="0;0.3;0.4;0.9;1" dur="8s" repeatCount="indefinite" />
         </text>
       </g>
    </g>
  </g>

  <!-- Étiquettes dynamiques -->
  <text x="200" y="230" font-family="monospace" font-weight="bold" font-size="16" fill="#b91c1c" text-anchor="middle">
     <tspan><animate attributeName="opacity" values="1;0;0;0;1" keyTimes="0;0.25;0.3;0.95;1" dur="8s" repeatCount="indefinite"/>2x + 3 = x + 8</tspan>
  </text>
  <text x="200" y="230" font-family="monospace" font-weight="bold" font-size="18" fill="#15803d" text-anchor="middle">
     <tspan><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.25;0.3;0.95;1" dur="8s" repeatCount="indefinite"/> x = 5 (Équilibre Trouvé !)</tspan>
  </text>
</svg>
</div>

---

## Rappels

Avant de commencer, révise :
- **Réduire une expression** : $5x - 2x = 3x$.
- **La règle des signes** : $- \times - = +$ ; $+ \times - = -$.
- **La distributivité** : $2(x + 3) = 2x + 6$.
- **L'égalité** : Une égalité reste vraie si on fait la même opération des deux côtés.

---

## Explications et Théorie

### 1. Définitions
- **Équation** : Une égalité contenant une lettre appelée **inconnue** (souvent $x$).
- **Solution** : La valeur de $x$ qui rend l'égalité vraie.
- **Résoudre** : Trouver toutes les solutions possibles.

### 2. Les règles de résolution
Pour isoler $x$, on utilise les opérations inverses :
- L'inverse de **$+$** est **$-$**.
- L'inverse de **$-$** est **$+$**.
- L'inverse de **$\times$** est **$\div$**.
- L'inverse de **$\div$** est **$\times$**.

### Méthodes pas-à-pas

**Comment résoudre $5x - 4 = 2x + 11$ ?**
1. **Regrouper les $x$ à gauche** : On enlève $2x$ à droite en faisant $-2x$ des deux côtés.
   $5x - 2x - 4 = 11 \Rightarrow 3x - 4 = 11$.
2. **Regrouper les nombres à droite** : On enlève $-4$ à gauche en faisant $+4$ des deux côtés.
   $3x = 11 + 4 \Rightarrow 3x = 15$.
3. **Isoler $x$** : On divise par 3 des deux côtés.
   $x = 15 / 3 \Rightarrow \mathbf{x = 5}$.

**Comment mettre un problème en équation ?**
1. Choisir l'inconnue (souvent $x$ = ce qu'on cherche).
2. Traduire l'énoncé en langage mathématique.
3. Résoudre l'équation obtenue.
4. Conclure par une phrase.

---

## 💡 Le savais-tu ?

Le mot flamboyant "Algèbre" vient d'un célèbre manuscrit arabe écrit par le savant **Al-Khwarizmi** vers l'an 820 : "*L'Abrégé du calcul par la restauration (Al-Jabr) et la comparaison*". 
- **Al-Jabr (restauration)** : C'est l'art génial de faire passer un nombre négatif de l'autre côté de l'égalité afin qu'il se transforme gracieusement en positif.
- Au fait, le mot étrange "Algorithme", qui régit aujourd'hui tout l'Internet de tes réseaux sociaux, est en fait une déformation latinisée du nom de cet illustre penseur perse : *Al-Khwarizmi -> Algorismi*.

---

## Flashcards de Mémorisation

<div class="flashcards-container">
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>Quel est l'objectif d'une équation ?</h3>
      </div>
      <div class="flashcard-back">
        <p><strong>Isoler $x$</strong> d'un seul côté du signe $=$ pour trouver sa valeur exacte (la <strong>solution</strong>).</p>
      </div>
    </div>
  </div>
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>Opérations inverses</h3>
      </div>
      <div class="flashcard-back">
        <p>Le $+$ s'annule par un $-$, et le $\times$ s'annule par une $\div$. Ce qu'on fait à gauche, on le fait <strong>toujours</strong> à droite !</p>
      </div>
    </div>
  </div>
</div>

---

## Exercices

**🟢 Exercice 1 (Découverte et Équations Pures)**
1. L'Opération éclair : Résous rapidement $x + 7 = 15$. *(Quel est le nombre qui...)*
2. La Disparition : Résous élégamment $3x = 21$. *(Attention, ici on ne soustrait pas, 3 multiplie x !)*
3. Double Action : Résous l'équation combinée $2x - 5 = 9$.

**🔵 Exercice 2 (Le Choc des Inconnues !)**
4. Le Balancier : Trouve x dans le duel $6x + 2 = 4x + 10$. *(Idée : Ramène d'abord les x du côté des "grands")*
5. Le Piège des Parenthèses : Casse les gardes avec $3(x + 4) = 18$ et trouve $x$.
6. L'Évasion finale : Résous $7x - 5 = 2x + 20$.

**🟠 Exercice 3 (Résolution du Monde Réel)**
7. **L'Énigme du Vieil Homme** : "Hé toi là ! Si on prend le grand mystère de mon âge, qu'on le triple purement, et qu'on y ajoute 5 pépites, on obtient exactement 41 !". Formule la phrase sous forme d'équation, et dévoile l'âge réel du vieillard.
8. **Le Cadre Magique** : Un grand cadre rectangulaire réclame un périmètre très précis de 30 cm de boiserie autour de lui. Le charpentier sait que la longueur a l'ordre de faire 3 cm de plus que l'anonyme largeur. Mets sur pied une équation redoutable, et livre les deux dimensions exactes finales.

---

## Synthèse

- Une équation est une **balance**.
- Ce qu'on fait à gauche, on le fait à droite.
- Le but est d'isoler $x$ en utilisant les opérations inverses.
- Toujours vérifier sa solution en remplaçant $x$ dans l'équation de départ.

---




---

## Pour aller plus loin

**Équations-produits**
En 3ème, tu apprendras à résoudre des équations plus complexes comme $(x+2)(x-3) = 0$. La règle est simple : un produit est nul si l'un de ses facteurs est nul. Donc soit $x+2=0$, soit $x-3=0$. C'est une extension directe de ce que tu apprends aujourd'hui !

---

## Foire Aux Questions (FAQ)

<details style="background: #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em;">Honnêtement, pourquoi est-ce qu'on s'évertue à "changer brutalement le signe" quand un bout de nombre est téléporté de l'autre côté du signe ÉGAL ? Sortilège ?</strong></summary>
  <p style="margin-top: 10px;">Il n'y a absolument pas de téléportation ! C'est une puissante illusion très utile. En réalité absolue, tu appartiens au secret du "J'annule une chose pénible".<br>Exemple : Tu refuses catégoriquement le $« \, +5 \, »$ squatteur du côté gauche. Pour l'évaporer, tu infliges sauvagement une sanction mortelle $« \, -5 \, »$... MAIS tu es forcé par la Justice d'infliger cette même sanction cruelle $« \, -5 \, »$ à la base du côté droit. Le côté gauche annule à 0, il n'apparaît plus. Le côté droit a maintenant un gros $« \, -5 \, »$ planté dans son flanc. On croit alors qu'il a volé à gauche et changé de t-shirt, mais c'est faux !</p>
</details>

<details style="background: #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em;">C'est étrange : on me dit que mon Équation simple n'a pas qu'une, mais "plusieurs" solutions possibles ? M'a-t-on menti ?</strong></summary>
  <p style="margin-top: 10px;">Reste calme, on ne t'a pas menti. Ton équation royale est strictement appelée "du Premier Degré" (car le $x$ est juste $x^1$). Elle n'autorisera jamais qu'une seule victoire ! En revanche, l'an prochain tu débloqueras violemment les équations terrifiantes "du Second Degré" par exemple $x^2 = 9$. Puisque le miroir $3 \times 3$ fait la perfection de 9, et que le miroir noir $(-3) \times (-3)$ crache aussi le feu en perfection 9, pouf... deux solutions existent en temps réel : 3 et -3.</p>
</details>

---

## 📝 Mini-Quiz

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Le professeur me donne $2x + 5 = 13$. Face à ce casse-tête, mon TOUT premier mouvement d'assaut doit être de :</strong></summary>
  <ul>
    <li>A) Intercepter en divisant immédiatement la totalité par 2 de tous les côtés, c'est mieux rangé.</li>
    <li>B) Arracher le membre polluant en soustrayant un énorme 5 de de tous les côtés.</li>
    <li>C) Prier de l'aide en priant secrètement pour rajouter un joyeux 5 dans l'équation.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Formellement B ! On dégage TOUJOURS délicatement les plus petits obstacles éloignés d'addition / soustraction (comme des peaux de banane par terre) AVANT la grosse brute finale (le grand déracinement de division finale pour libérer $x$).
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Le terrifiant boss me dit $3x = 12$. Quelle arme libérera l'esprit de sa gangue pour gagner ? :</strong></summary>
  <ul>
    <li>A) $x = 4$ !</li>
    <li>B) $x = 9$ ! (L'illusion de $12 - 3$)</li>
    <li>C) $x = 36$ ! (L'illusion monstrueuse de multiplication $12 \times 3$)</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : A ! (x = 4).</strong> Rappelez-vous à jamais ceci : un chiffre vulgaire coincé à gauche (collé intimmement contre une lettre d'inconnu) est fondamentalement un "agent multiplicateur caché secret", ce qui ne peut s'anuller de sa racine qu'en "Divisant de l'autre côté !" ( $12 \div 3 = 4$ !).
  </details>
</details>

---

## ✅ Checklist des Essentiels

<div class="checklist">
  <ul>
    <li><input type="checkbox" id="chk1" /> <label for="chk1">Je sais qu'une équation fonctionne comme une balance (je fais pareil des deux côtés).</label></li>
    <li><input type="checkbox" id="chk2" /> <label for="chk2">Je sais traiter les additions/soustractions en premier pour nettoyer autour de $x$.</label></li>
    <li><input type="checkbox" id="chk3" /> <label for="chk3">Je n'oublie pas de diviser en dernière étape (si j'ai $3x=12$, je fais $12 / 3$).</label></li>
    <li><input type="checkbox" id="chk4" /> <label for="chk4">Je sais vérifier ma réponse finale en la remplaçant à la place des $x$ dans l'équation de départ.</label></li>
  </ul>
</div>

*(Fin de la Révolte Algébrique)*