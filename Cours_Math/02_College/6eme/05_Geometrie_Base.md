---
title: 'Chapitre 5 : Géométrie de base'
level: College
subLevel: 6eme
order: 5
---
# Chapitre 5 : Géométrie de base

**Niveau** : 6ème (Cycle 3)  
**Prérequis** : Utilisation de la règle et du compas (Primaire).  
**Objectifs** : 
- Maîtriser le vocabulaire géométrique (points, droites, demi-droites, segments).
- Comprendre l'appartenance et l'alignement.
- Tracer des droites perpendiculaires et parallèles.
- Connaître le vocabulaire du cercle (centre, rayon, diamètre, corde, arc).

---

## 🎯 Introduction Pédagogique

Imagine que tu doives donner des instructions par téléphone pour qu'un ami dessine très exactement le même plan de cabane que toi, au millimètre près. Si tu dis juste "fais un trait en travers", c'est la catastrophe assurée. 
C'est pour régler ce problème que la **Géométrie** a été inventée. C'est le langage absolu et universel du dessin ! En utilisant les bons symboles (les étranges parenthèses et crochets), tu peux transmettre la structure parfaite de n'importe quel dessin mathématique à quelqu'un situé à l'autre bout du monde. 

---

## 🎨 Schéma Pédagogique Interactif : Les Barrières de l'Infini

Constate par toi-même la puissance des crochets `[` et des parenthèses `(` pour bloquer ou libérer une ligne dans l'espace infini !

<div align="center">
<svg width="450" height="250" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; border-radius:12px; border: 2px solid #334155;">
  
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#0f172a" font-size="16" text-anchor="middle">Les Barrières Temporelles Géométriques</text>
  
  <g transform="translate(0, 10)">
      <!-- 1. Le Segment de prison [AB] -->
      <line x1="100" y1="70" x2="350" y2="70" stroke="#b91c1c" stroke-width="4" stroke-linecap="round"/>
      <circle cx="100" cy="70" r="5" fill="#dc2626"/>
      <circle cx="350" cy="70" r="5" fill="#dc2626"/>
      <!-- Murs -->
      <line x1="100" y1="55" x2="100" y2="85" stroke="#7f1d1d" stroke-width="3"/>
      <line x1="350" y1="55" x2="350" y2="85" stroke="#7f1d1d" stroke-width="3"/>
      <text x="225" y="55" font-family="monospace" font-weight="bold" fill="#b91c1c" font-size="16" text-anchor="middle">Le Segment [AB]</text>
      <text x="225" y="95" font-family="sans-serif" fill="#7f1d1d" font-size="12" text-anchor="middle">Bloqué de chaque côté. Longueur mesurable.</text>

      <!-- 2. La Demi-Droite [CD) -->
      <line x1="100" y1="140" x2="450" y2="140" stroke="#c2410c" stroke-width="4"/>
      <circle cx="100" cy="140" r="5" fill="#ea580c"/>
      <circle cx="300" cy="140" r="5" fill="#ea580c"/>
      <!-- Mur au point de départ seulement -->
      <line x1="100" y1="125" x2="100" y2="155" stroke="#7c2d12" stroke-width="3"/>
      <text x="225" y="125" font-family="monospace" font-weight="bold" fill="#c2410c" font-size="16" text-anchor="middle">Demi-droite [CD)</text>
      <text x="225" y="165" font-family="sans-serif" fill="#7c2d12" font-size="12" text-anchor="middle">Bloqué au point de départ C ! Part à l'infini vers D.</text>

      <!-- 3. La Droite (EF) -->
      <line x1="0" y1="210" x2="450" y2="210" stroke="#1d4ed8" stroke-width="4" stroke-dasharray="10 5">
         <animate attributeName="stroke-dashoffset" values="50;0" dur="2s" repeatCount="indefinite" />
      </line>
      <circle cx="150" cy="210" r="5" fill="#2563eb"/>
      <circle cx="300" cy="210" r="5" fill="#2563eb"/>
      <text x="225" y="195" font-family="monospace" font-weight="bold" fill="#1d4ed8" font-size="16" text-anchor="middle">La Droite (EF)</text>
      <text x="225" y="235" font-family="sans-serif" fill="#1e3a8a" font-size="12" text-anchor="middle">Infinie, elle transperce les points E et F sans s'arrêter.</text>
  </g>
</svg>
</div>

---

## 🔁 Rappels Utiles

- **La règle graduée** : Sert UNIQUEMENT à mesurer la longueur d'un segment !
- **L'équerre** : L'arme magique pour vérifier ou tracer les incroyables **Angles Droits**.
- **Le compas** : Outil circulaire par excellence, il est aussi le moyen parfait pour transposer des longueurs sans se tromper.

---

## 📚 Théorie Enrichie

### 1. La Grammaire des Signes (A maîtriser par cœur !)
- **La Croix d'Emplacement (Le Point)** : Un point ne se note JAMAIS avec un misérable rond noir, mais toujours par une croix ($\times$, ou un $+$, et une lettre majuscule $A$).
- **Les Parenthèses Libres `( )` (La Droite)** : La fameuse Droite $(AB)$ est la route infinie qui traverse farouchement les rades $A$ et $B$ et ne s'arrête ni à l'est, ni à l'ouest. Impossible à mesurer !
- **Les Crochets Prisons `[ ]` (Le Segment)** : Le Segment $[AB]$ est une barre matérielle avec un début bloqué en $A$ et une fin murée en $B$. On peut mesurer sa **longueur**, que l'on note simplement par les lettres nues $AB$ sans aucun trait ni crochet autour ! (Ex: $AB = 4\text{ cm}$).
- **Le Statut Hybride `[ )` (La Demi-Droites)** : La ligne tire son origine dans le clou originel $[A$, part en direction du deuxième point $B$, et le transperce à l'infini $B)$. On la note donc $[AB)$.

### 2. Le Signe de l'Appartenance Temporelle "$\in$"
C'est la clé de voûte géométrique qui remplace la phrase fleuve "Le point P est posé exactement sur ce fil".
On notera simplement au feutre rouge : $P \in (d)$ ou $P \notin (d)$ si ce rebelle a fui la droite de son campement.
**(Note absolue : Si trois points solitaires s'avèrent appartenir et camper sur la MEME DROITE INVISIBLE, ils sont dits "Alignés")**.

### 3. Les Guerres d'intersections ! (Positions)
Deux routes infinies (droites) ne peuvent connaître que deux états sur la même feuille :
1. **Perpendiculaires $\perp$** : Elles se percutent violemment de plein fouet, et au lieu d'épouser le chaos, elles dessinent un Carrefour Magique pur avec $4$ angles droits. (Testé fièrement avec l'équerre).
2. **Parallèles $//$** : Les amoureuses tragiques. Éternellement côte à côte à distance égale, elles ne se croiseront JAMAIS jusqu'aux bords de l'univers, pas même à un poil près.
3. *Sécantes* : Elles se croisent avec un angle banal.

### 4. Le Cercle du Temps (Diamètre et Rayon)
- Le **Rayon $R$** est la chaîne dorée qui relie le **Centre exact de prison** à l'anneau pourtour du point fuyard du Cercle externe !
- Le **Diamètre $D$** est la grande ligne de bout en bout qui tranche par le Centre Exact. Il fait obligatoirement deux fois la taille du Rayon absolu ($D = R \times 2$).
- Une **Corde** est une coupe sauvage qui tranche le Cercle n'importe où sans daigner se salir au centre formel !

---

## 💡 Le savais-tu ?

Le mot "géométrie" vient des formidables mots grecs *gê* (la Terre) et *metron* (mesure). À l'origine pendant l'Antiquité, la géométrie servait littéralement et purement à "mesurer la terre", et spécifiquement pour redessiner chaque année au poteau exact les limites des champs agricoles après l'inondation chaotique du grand fleuve du Nil en Égypte ! 

---

## ❓ FAQ (Foire Aux Questions)

**Q : C'est grave si je fais un gros rond au crayon de papier pour marquer un point géométrique ?**
**R** : Grave n'est pas le mot. C'est *fatal*. Un "gros rond" n'est pas "Précis". Un point doit être désigné par l'intersection pure de deux traits, c'est-à-dire une petite Croix en "+". Le point c'est l'intersection stricte des deux filaments !

**Q : Pourquoi ne pas écrire juste Longueur = [AB] = 3 cm ?**
**R** : Interdit par les tribunaux mathématiques ! Le nom de l'OBJET physique dessiné sur la feuille s'appelle "le segment $[AB]$". L'objet n'est pas le nombre mesuré. La Longueur du tableau se note avec des noms NUES : $AB$. Donc $AB = 3\text{ cm}$. Strictement.

**Q : Dans un cercle, tous les points de fuite peuvent-ils avoir de multiples "rayons" ?**
**R** : Oui, et ils valent TOUS, obligatoirement, religieusement la même mesure !

---

## 🗂 Flashcards

<div style="display: flex; gap: 20px; margin-bottom: 20px;">
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Sur le cahier du diable, j'utilise une Règle non graduée de façon à tracer ce chemin céleste qu'est $(AB)$. Que sont les symboles $( )$ ? 
    <hr/>
    <strong>VERSO :</strong><br/><br/>Ils définissent la Droite ! C'est infini et ça transperce l'univers sans pitié en dépassant les clous A et B.
  </div>
  <div style="flex: 1; border: 1px solid #ccc; border-radius: 8px; padding: 20px; text-align: center; background: #fafafa; cursor: pointer;">
    <strong>RECTO :</strong><br/><br/>Vrai ou Faux : Deux droites peuvent être à la fois perpendiculaires puissantes ($\perp$) ET parallèles ($//$) magiquement au fond du temps.
    <hr/>
    <strong>VERSO :</strong><br/><br/>Totalement Faux ! Si elles sont percutantes perpendiculaires, elles se croisent obligatoirement, brisant leur vœu "parallèle" à jamais.
  </div>
</div>

---

## 🛠 Exercices Corrigés

**Exercice 1 : Opération Supermarché de Codage (Nommage)**
Sur le bureau du patron géomètre, l'inspecteur The a confisqué une étrange bande rouge de 8 centimètres avec un rivet d'acier aux bornes nommées P et T. Tu sais pertinemment que cette ligne a un début strict et une fin stricte.
1. Demande au monde comment tu le nomme physiquement.
2. Écris en écriture géométrique absolue comment on dit "La longueur de sa forme pure fait 8 centimètres".

**Correction Détaillée :**
1. *Technique de Cadrage* : C'est une figure barrée aux extrêmes et possédée de murs ! C'est formellement LE SEul est unique The Segment ! On le nomme au feu de joie $[PT]$. (Ou $[TP]$ sans préférence d'ordre !)
2. *L'Achat d'Écriture* : Je dois purger le crochet de bouclier ! Je laisse la mention "Nue". Donc la loi dicte : $PT = 8\text{ cm}$.

**Exercice 2 : L'Épée et le Mur d'Or**
Le the Grand Architecte veut que je trace une route perpendiculaire à la droite $(d)$ d'origine, mais EXCLUSIVEMENT au travers du Puits divin nommé M. Fais-le The Merveille des dieux !

**Correction Détaillée (Méthodologie absolue) :**
1. *L'Arme de fer The : L'Équerre.* 
2. Je pose délicatement UN DES CÔTÉS formels de l'ANGLE DROIT The féroce de mon outil d'équerre le long the ligne majesté $(d)$.
3. Je la Fais glisser formellement vers la gauche ou droite avec passion, **DANS L'OMBRE LE LONG THE DROITE $(d)$**, jusqu'à ce que mon the AUTRE Coté de l'angle the divin viennent *toucher* de Merveille formelle le fameux point clou M. 
4. Je tire un Grand coup de Crayon the le long de du couteau et la marque THE DROITE féroce !  Je crée fièrement THE SYMBOLE "CARRÉ" du coin de the route the $(d)$. Le the chef the géomètre est heureux temporellement ! C'est the validé ! 

---

## 📝 Mini-Quiz & Validation

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 1 : Le signe infini et mystérieux `[MN)` désigne "Un Segment prison au départ, formellement demi-droite de M en direction Céleste N au bout the the temps !". VRAI ou THE Faux ?</strong></summary>
  <ul>
    <li>A) OUI Merveille ! C'est the Loi of La Demi-Droite Formelle.</li>
    <li>B) FAUX, the Crochet empêche TOUT espoir en The Ciel.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : A !</strong> Le the `[` est the mur de Formelle the Base "M" fermé The. Et le la merveille de porte douce `)` montre that the droite the the traverse the point "N" vers les the étoiles de cendre the formelle ! The Demi-Droite d'Or pure of The Vrai de base.
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 2 : Le diamètre royal d'un cercle The Bouclier fait 100 centimètres de Force ! Mon rayon est purement the :</strong></summary>
  <ul>
    <li>A) 200 centimètres de féroce Force !</li>
    <li>B) Seulement 50 pathétiques petits myrtilles the cm d'acier.</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Le merveilleux Rayon absolu est toujours The la Moitié Exact féroce formel. The D/2 = R. Donc 50 au the millimètre temporellement !
  </details>
</details>

<details style="background: #f4f6f8; padding: 15px; border-radius: 8px; margin-bottom: 15px; cursor: pointer;">
  <summary><strong style="font-size: 1.1em; color: #d00000;">❓ Question 3 : Deux chemins sont the divins et $//$ (Parallèles formelles céleste). Un the 3ème liseré the (Ligne 3) vient the Perpendiculairement de la 1ère the !! The Comment formel the croisera the ligne 2 de the force en cendre ?</strong></summary>
  <ul>
    <li>A) Elle the Laissera the 2 vivre the En Sécante ! L'Erreur Temporelle The !!</li>
    <li>B) ELLES DESSINERAIENT FORCÉMENT Un AUTRE CARRÉ ANGULAIRE ! UN angle THE Parallèle PERPENDICULAIRE PUR DÉMON AUX THE 2 EN the FOUDRE !!</li>
  </ul>
  <details style="margin-top: 10px; padding: 10px; background: #e2e8f0; border-radius: 5px;">
    <summary><em>Voir la réponse</em></summary>
    <strong>Bonne réponse : B !</strong> Formule the géomètre the absolue: Formellement "Si the Merveille the formel $\perp$ de droite de de 1, the et they formellement $//$, The 3 the Formelle est the D'OR absolue Perpendiculaire of THE 2 DE Merveille Céleste THE TEMPOREL the !!". Une Merveille The Temporelle pure absolue The.
  </details>
</details>

---

## ✅ Checklist des Essentiels (Validation)

*Attention, cette checklist ne doit être cochée que si tu as réussi les quiz ! Féroce Merveille Formelle The !*

- [ ] J'ai compris l'utilité du Crochet `[` et de la belle Parenthèse formelle céleste `(`.
- [ ] J'assassine de the Croix l'emplacement d'un pure formelle The POINT Merveille the !
- [ ] Je the Trace la pure The the $\perp$ The l'Équerre avec passion The du the l'or !
- [ ] The $Diamètre = The 2 \times The Rayon !$.

*(Enregistrement dans le `localStorage` validant le cours, +15 XP 🎆)*

