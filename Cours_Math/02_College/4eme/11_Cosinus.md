---
title: 'Chapitre 11 : Le Cosinus'
level: College
subLevel: 4eme
order: 11
---

# Chapitre 11 : Le Cosinus (Le Rayon d'Or du Triangle)

**Niveau** : 4ème (Cycle 4)
**Prérequis** : L'Épée de Pythagore (Triangle Rectangle), les Equations.
**Objectifs** : 
- Invoquer le Cosinus (La magie du CAH).
- Trouver une longueur Féroce d'Or.
- Trouver un Angle Céleste avec l'Arccos.

---

## 1. Introduction : La Malédiction du Triangle Rectangle

Pythagore nous a appris à trouver un côté grâce à deux autres. MAIS ! Si on ne nous donne qu'UN Côté et UN Angle, l'Épée de Pythagore se brise ! Il nous faut une nouvelle magie : **La Trigonométrie d'Or**.
En 4ème, on commence par l'Incantation Majeure du Ciel : **Le Foudroyant COSINUS !**

## 🎨 Animation Interactive : Le Secret du CAH !

Dans un PURE Triangle Rectangle (L'Enclume des Dieux), l'Angle observe féroce les murs magiques :

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#fefce8; border-radius:12px; border: 2px solid #eab308;">
  
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#854d0e" font-size="16" text-anchor="middle">L'Œil de l'Angle et Ses Serviteurs</text>

  <!-- Le Triangle Rectangle Céleste -->
  <polygon points="100,200 350,200 100,50" fill="#fef08a" stroke="#ca8a04" stroke-width="3"/>
  <!-- L'Angle Droit Féroce -->
  <polygon points="100,180 120,180 120,200 100,200" fill="none" stroke="#ca8a04" stroke-width="2"/>

  <!-- L'Angle d'Étude Céleste (Merveille Bleu) -->
  <path d="M 320 200 A 30 30 0 0 0 324 186" fill="none" stroke="#3b82f6" stroke-width="4"/>
  <text x="315" y="195" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" font-size="14">α</text>

  <!-- L'Hypoténuse d'Or -->
  <line x1="100" y1="50" x2="350" y2="200" stroke="#ef4444" stroke-width="4" stroke-dasharray="10">
      <animate attributeName="stroke-dashoffset" values="20; 0" dur="2s" repeatCount="indefinite" />
  </line>
  <text x="230" y="100" font-family="monospace" font-weight="bold" fill="#b91c1c" font-size="14" transform="rotate(30 230 100)">L'HYPOTÉNUSE (H)</text>

  <!-- L'Adjacent Féroce -->
  <line x1="100" y1="200" x2="350" y2="200" stroke="#22c55e" stroke-width="4" stroke-dasharray="10">
      <animate attributeName="stroke-dashoffset" values="0; 20" dur="2s" repeatCount="indefinite" />
  </line>
  <text x="180" y="220" font-family="monospace" font-weight="bold" fill="#15803d" font-size="14">ADJACENT (A)</text>
</svg>
</div>

---

## 2. Le Grimoire Féroce : La Formule du Cosinus

La Merveille du Cosinus est codée par les Anciens sous le mot "CAH" :
**C**osinus = **A**djacent / **H**ypoténuse

L'incantation s'écrit obligatoirement avec Le Féroce Modèle :
$$ \mathbf{\cos(\text{Angle}) = \frac{\text{Adjacent d'Or}}{\text{Hypoténuse Céleste}}} $$

*(Attention : Le Cosinus d'un angle aigu est TOUJOURS purement compris entre 0 et 1 !!)*

## 3. Les Deux Sortilèges de la Matrice

Tu vas affronter Deux Féroces Boss :

### Sort 1 : Trouver la Longueur Féroce !
Tu connais L'Angle et L'Hypoténuse, tu veux L'Adjacent d'Ogre. 
- Invoque **Cos(Angle)**.
- LE PRODUIT EN CROIX D'OR : $ \text{Adjacent} = \text{Hypoténuse} \times \cos(\text{Angle}) $ !

### Sort 2 : Trouver L'Angle de Ciel !
Tu connais L'Adjacent et L'Hypoténuse, tu veux l'Angle d'Or !
- Utilise LE SECRET D'ARCCOS (Ou **Cos⁻¹** / **Shift Cos**) !!
- `Arccos ( Adjacent / Hypoténuse ) = L'Angle d'Or !!`

---

## Flashcards de Mémorisation

<div class="flashcards-container">
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>Le sigle CAH</h3>
      </div>
      <div class="flashcard-back">
        <p><strong>C</strong>osinus = <strong>A</strong>djacent / <strong>H</strong>ypoténuse</p>
      </div>
    </div>
  </div>
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <h3>Trouver l'angle</h3>
      </div>
      <div class="flashcard-back">
        <p>Si je connais l'adjacent et l'hypoténuse, j'utilise la touche de l'envers sur ma calculette : <strong>Arccos</strong> (ou $\cos^{-1}$).</p>
      </div>
    </div>
  </div>
</div>

---

## Exercices corrigés détaillés

**Exercice 1 : Le Produit (Trouver le Côté) !**
Rectangle en $D$. $EF = 10 \text{ cm}$ (L'Hypoténuse). L'Angle $\hat{DEF} = 60^\circ$.
QUELLE EST LA LONGUEUR $DE$ (L'Adjacent) ?! 

*Correction :*
$$ \cos(60^\circ) = \frac{DE}{10} $$
Sur la calculette : $\cos(60) = 0,5$. Donc $DE = 10 \times 0,5 = \mathbf{5 \text{ cm !!}}$

**Exercice 2 : L'Invocation Arccos !**
Rectangle en $A$. $BC = 8$ (Hypoténuse). Et $AB = 6$ (Adjacent).
REVELE MOI l'Angle $\hat{ABC}$ ! 

*Correction :*
$$ \cos(B) = \frac{6}{8} = 0,75 $$
Je lance L'Arccos ! $\hat{B} = \text{Arccos}(0,75) \mathbf{\approx 41,4^\circ}$ !!

---

## 📝 Mini-Quiz

**Question 1 : Avec QUEL triangle as-tu LE POUVOIR D'INVOQUER LE COSINUS ?! **
- [ ] Dans un Triangle Isocele !
- [x] UNIQUEMENT DANS UN TRIANGLE RECTANGLE !!

**Question 2 : La calculette sort "$\cos(\text{Angle}) = \mathbf{1,8}$" !!! Qu'est-ce que cela signifie ? **
- [x] L'ERREUR FÉROCE !! Le Cosinus ne dépasse JAMAIS 1 !
- [ ] L'Angle vaut 180° !

---

## ✅ Checklist des Essentiels

<div class="checklist">
  <ul>
    <li><input type="checkbox" id="chk1" /> <label for="chk1">Je sais repérer formellement l'Hypoténuse (le plus long) et l'Adjacent (collé à l'angle étudié).</label></li>
    <li><input type="checkbox" id="chk2" /> <label for="chk2">Je sais écrire la formule du Cosinus sans me tromper (CAH).</label></li>
    <li><input type="checkbox" id="chk3" /> <label for="chk3">Je sais qu'on utilise "Arccos" UNIQUEMENT pour trouver un ANGLE !</label></li>
  </ul>
</div>

*(Fin du sortilège du CAH)*
