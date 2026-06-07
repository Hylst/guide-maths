---
title: "BTS SIO : Algèbre de Boole et Logique Combinatoire"
level: Post_Bac
subLevel: BTS
order: 4
---
# BTS SIO : Algèbre de Boole et Logique Combinatoire

**Niveau** : Post-Bac (BTS Services Informatiques aux Organisations - SIO, BTS SN / CIEL, Licence Informatique)  
**Prérequis** : Notions d'informatique, logique élémentaire.  
**Objectifs** :
- Maîtriser les opérateurs logiques fondamentaux (ET, OU, NON) et construire des tables de vérité.
- Appliquer rigoureusement les lois d'absorption, de distributivité et de De Morgan pour simplifier des expressions logiques.
- Concevoir des logigrammes et simplifier des fonctions combinatoires complexes via les tableaux de Karnaugh.

---

## Activités de découverte

### Activité : Le système de sécurité incendie d'un datacenter
Un administrateur réseau en BTS SIO conçoit le système combinatoire automatique d'extinction d'incendie d'un serveur central.  
Il dispose de trois informations binaires en provenance de capteurs :
- $s_1 = 1$ si le premier capteur thermique détecte une chaleur supérieure à $50\text{ °C}$.
- $s_2 = 1$ si le second capteur thermique détecte une chaleur supérieure à $50\text{ °C}$.
- $m = 1$ si le bouton "Arrêt d'Urgence Manuel" de la console technique est enclenché.

Le protocole de sécurité stipule que le système d'aspersion de gaz d'azote doit s'activer (sortie $A = 1$) si et seulement si l'arrêt manuel de sécurité n'est **pas** enclenché, ET qu'au moins deux capteurs thermiques détectent l'alerte de surchauffe.

1. Comment modéliser mathématiquement l'état binaires des détecteurs ?
2. Écrivez l'expression littérale "au moins deux capteurs thermiques détectent l'alerte de surchauffe" en combinant $s_1$ and $s_2$.
3. Exprimez l'état d'activation $A$ de l'aspersion sous forme d'une équation logique faisant intervenir les opérateurs de base.

Cette étude combinatoire de variables binaires (prenant uniquement la valeur $0$ ou $1$) est régie par l'**Algèbre de Boole**, pivot central pour la programmation logicielle et l'architecture matérielle des processeurs.

---

## Fondements Théoriques

### 1. Les Opérateurs Logiques de Base
L'ensemble de calcul boolean se compose de l'ensemble de valeurs $\mathbb{B} = \{0, 1\}$. Les trois opérations d'analyse logiques de base sont :

#### A. Le NON logique (Négation ou Opérateur de complémentation)
- Noté $\bar{x}$ (ou $\neg x$).
- Inverse l'état de la variable : $\bar{1} = 0$ et $\bar{0} = 1$.

#### B. Le ET logique (Produit logique ou Conjonction)
- Noté $x \cdot y$ (ou $x \land y$).
- Vaut $1$ si et seulement si les deux variables valent simultanément $1$.
- Table : $1 \cdot 1 = 1$, $1 \cdot 0 = 0$, $0 \cdot 1 = 0$, $0 \cdot 0 = 0$.

#### C. Le OU logique (Somme logique ou Disjonction)
- Noté $x + y$ (ou $x \lor y$).
- Vaut $1$ s'il y a au moins une des deux variables qui vaut $1$.
- Table : $1 + 1 = 1$, $1 + 0 = 1$, $0 + 1 = 1$, $0 + 0 = 0$.

---

## 🎨 Schéma Pédagogique Interactif : Conception d'un Logigramme Combinatoire

Le schéma représente le logigramme (circuit logique numérique) correspondant à la fonction d'alerte filtrée $S = A + (\bar{A} \cdot B)$. Les fils en orange vif transportent le signal à l'état actif $1$, tandis que les fils en grisé transportent l'état passif $0$. On observe l'importance des trois portes logiques élémentaires : NON (triangle), ET (demi-cercle), et OU (forme incurvée).

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:16px; border: 1px solid #1e293b;">
  <!-- Titre -->
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#38bdf8" font-size="14" text-anchor="middle">Logigramme de Circuit Combinatoire</text>
  
  <!-- Entrées de test -->
  <!-- Entrée A = 0 -->
  <text x="35" y="80" font-family="sans-serif" font-weight="bold" fill="#64748b" font-size="12">Entrée A = 0</text>
  <circle cx="95" cy="76" r="4" fill="#64748b"/>
  <!-- Entrée B = 1 -->
  <text x="35" y="160" font-family="sans-serif" font-weight="bold" fill="#f59e0b" font-size="12">Entrée B = 1</text>
  <circle cx="95" cy="156" r="4" fill="#f59e0b"/>

  <!-- Fils conducteurs -->
  <!-- Fil A allant vers l'inverseur -->
  <line x1="95" y1="76" x2="130" y2="76" stroke="#64748b" stroke-width="2.5"/>
  <!-- Fil A déviation directe vers la porte OU -->
  <path d="M 115,76 L 115,225 L 290,225" fill="none" stroke="#64748b" stroke-width="2"/>

  <!-- Porte NON (Inverseur) -->
  <g transform="translate(130, 60)">
    <polygon points="0,5 0,27 25,16" fill="none" stroke="#6366f1" stroke-width="2"/>
    <circle cx="28" cy="16" r="3" fill="#0f172a" stroke="#6366f1" stroke-width="2"/>
    <text x="-5" y="-5" font-family="sans-serif" fill="#6366f1" font-size="9" font-weight="bold">NON</text>
  </g>
  
  <!-- Sortie de l'inverseur (qui vaut 1 car A=0) -->
  <line x1="161" y1="76" x2="200" y2="76" stroke="#f59e0b" stroke-width="2.5"/>
  <!-- Fil B allant vers la porte ET -->
  <line x1="95" y1="156" x2="200" y2="156" stroke="#f59e0b" stroke-width="2.5"/>

  <!-- Porte ET -->
  <g transform="translate(200, 60)">
    <!-- Forme demi-cercle plate à gauche incurvée à droite -->
    <path d="M 0,0 L 25,0 A 50,50 0 0,1 25,110 L 0,110 Z" fill="none" stroke="#10b981" stroke-width="2"/>
    <text x="10" y="55" font-family="sans-serif" fill="#10b981" font-size="11" font-weight="bold">ET</text>
  </g>

  <!-- Sortie de la porte ET (qui vaut 1) -->
  <path d="M 235,116 L 270,116 L 270,185 L 290,185" fill="none" stroke="#f59e0b" stroke-width="2.5"/>

  <!-- Porte OU -->
  <g transform="translate(290, 170)">
    <!-- Forme courbe incurvée caractéristique de porte OU -->
    <path d="M 0,0 Q 20,0 35,22 Q 20,44 0,44 Q 10,22 0,0 Z" fill="none" stroke="#ef4444" stroke-width="2"/>
    <text x="8" y="26" font-family="sans-serif" fill="#ef4444" font-size="10" font-weight="bold">OU</text>
  </g>

  <!-- Sortie Finale S = 1 -->
  <line x1="328" y1="192" x2="380" y2="192" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow_bool)"/>
  <text x="390" y="196" font-family="sans-serif" fill="#f59e0b" font-weight="bold" font-size="13">Sortie S = 1</text>
  
  <defs>
    <marker id="arrow_bool" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
    </marker>
  </defs>
</svg>
</div>

---

### 2. Propriétés Majeures de Simplification Algébrique

Pour alléger l’écriture d’un programme ou minimiser l’empreinte carbone d’un circuit intégré de puces électroniques, on applique les lois mathématiques suivantes :

#### A. Involutivité (Double complémentation) :
$$\overline{\overline{x}} = x$$

#### B. Idempotence :
$$x \cdot x = x \quad \text{et} \quad x + x = x$$

#### C. Absorption (Lois clés extrêmement utiles) :
$$x \cdot (x + y) = x \quad \text{et} \quad x + (x \cdot y) = x$$
$$x + (\bar{x} \cdot y) = x + y \quad \text{(Absorption élargie)}$$

#### D. Les Lois Secrètes de De Morgan (Négation d'expressions) :
Le complémentaire de la conjonction est la disjonction des complémentaires, et inversement :
$$\overline{x \cdot y} = \bar{x} + \bar{y} \quad \text{et} \quad \overline{x + y} = \bar{x} \cdot \bar{y}$$

---

## Exercices Résolus

### Exercice 1 : Simplification algébrique formelle
Simplifier au maximum, en justifiant par les axiomes de Boole, l'expression logique du circuit d'adressage IP suivant :
$$f(A, B, C) = A \cdot \bar{B} \cdot C + A \cdot B \cdot C + \bar{A} \cdot C$$

**Correction Étape par Étape :**
1. **Étape 1 : Mise en facteur commun évidente**  
   Observons les deux premiers termes de la fonction : $A \cdot \bar{B} \cdot C$ and $A \cdot B \cdot C$.  
   Nous pouvons mettre le bloc $A \cdot C$ en facteur commun :
   $$f(A, B, C) = (A \cdot C) \cdot (\bar{B} + B) + \bar{A} \cdot C$$

2. **Étape 2 : Loi de complémentarité**  
   Or, par axiome de complément, une variable réunie avec son inverse vaut toujours $1$ ($\bar{B} + B = 1$). Notre fonction se simplifie en :
   $$f(A, B, C) = (A \cdot C) \cdot 1 + \bar{A} \cdot C = A \cdot C + \bar{A} \cdot C$$

3. **Étape 3 : Seconde factorisation logique**  
   Mettons à présent la variable $C$ en facteur sur les termes restants :
   $$f(A, B, C) = (A + \bar{A}) \cdot C$$
   De nouveau, nous appliquons $(A + \bar{A}) = 1$. L'équation s'effondre de façon élégante vers :
   $$f(A, B, C) = 1 \cdot C = \mathbf{C}$$
   La fonction d'adressage complexe de départ dépend en réalité uniquement de l'état du seul capteur d'entrée $C$ !

### Exercice 2 : Simplification par Tableau de Karnaugh (Système à 3 Variables)
Une alarme de température de serveur informatique s'active (sortie $S=1$) selon l'expression combinatoire suivante :  
$S = \bar{A} \bar{B} C + \bar{A} B C + A B C + A \bar{B} C + A B \bar{C}$.
1. Représentez cette fonction dans un tableau de Karnaugh de dimension 3.
2. Simplifiez par regroupements adjacents de cases pour donner la formule optimisée.

**Correction Étape par Étape :**
1. **Étape 2 : Construction de la grille de Karnaugh**  
   Disposons les états de variables dans un tableau à code de Gray (seule une variable change d'axe à chaque transition de case : $00, 01, 11, 10$) :

   | $A \backslash BC$ | **$00$** | **$01$** | **$11$** | **$10$** |
   | :---: | :---: | :---: | :---: | :---: |
   | **$A=0$** | $0$ | $1$ | $1$ | $0$ |
   | **$A=1$** | $0$ | $1$ | $1$ | $1$ |

   Nous avons posé un $1$ dans les 5 cases correspondant aux 5 termes à l'état actif de la fonction.

2. **Étape 2 : Regroupements par blocs maximaux de dimension puissance de 2**  
   - **Regroupement 1 (un bloc vertical/horizontal de 4 cases)** :  
     Les quatre "1" consécutifs des colonnes $01$ et $11$ créent un grand bloc de dimension 4.  
     Sur ce bloc, $A$ change d'état ($0$ et $1$), donc s'élimine. $B$ change d'état (vaut $0$ puis $1$), s'élimine aussi. Seule la variable $C$ reste invariante et stable à l'état $1$.  
     *Formule issue du premier bloc* = $\mathbf{C}$.
   - **Regroupement 2 (un bloc de 2 cases)** :  
     La case de coordonnées $(A=1, B=1, C=0)$ contenant le dernier "1" non pris peut se regrouper avec son voisin adjacent du dessus $(A=1, B=1, C=1)$.  
     Sur ce bloc à deux cases, $A$ reste stable à $1$, $B$ reste stable à $1$, tandis que $C$ varie et s'élimine.  
     *Formule issue du second bloc* = $\mathbf{A \cdot B}$.

3. **Étape 3 : Écriture de la fonction minimale**  
   L'expression minimale complète s'obtient par réunion logique des formules simplifiées des deux blocs d'adjacence :
   $$S = \mathbf{C + A \cdot B}$$
   Le circuit électronique d'activation de l'alarme n'exige que deux connexions simplifiées à la place du multiplexeur immense initial !

---

## FAQ Étudiante

<details>
  <summary>Quelle est la distinction exacte entre ET logique (·) et une addition classique (+) en algèbre ?</summary>

  Deux nuances capitales les différencient :  
  1. En mathématique standard, $1+1 = 2$. En algèbre booléenne, il n'existe pas d'état supérieur à $1$, d'où la règle fondamentale : $1+1 = 1$.  
  2. L'opérateur de somme logique (+) est **distributif** par rapport au produit logique ($\cdot$), ce qui n’est pas vrai en algèbre usuelle : $a + (b \cdot c) = (a + b) \cdot (a + c)$.
</details>

<details>
  <summary>Qu'est-ce qu’un opérateur "universel" (comme le NAND ou le NOR) en informatique industrielle ?</summary>

  La porte **NAND** (NON-ET, notée $\overline{x \cdot y}$) ou la porte **NOR** (NON-OU, notée $\overline{x + y}$) sont dites **universelles** car n'importe quel circuit logique ou processeur de calcul du monde, même le plus infini, peut se concevoir et se fabriquer en utilisant **uniquement** des puces de ce type. Cela permet d'uniformiser de façon industrielle le coût de tirage de silicium d'un processeur.
</details>

<details>
  <summary>Comment s'applique l'algèbre de Boole lors du codage d'un site web ou de scripts système en BTS SIO ?</summary>

  Elle intervient à chaque structure de contrôle ou conditionnelle !  
  Par exemple, une boucle conditionnelle programmée de type `if (!isAdmin && (isUser || hasToken))` n'est rien d'autre que l'évaluation du système booléen $S = \bar{A} \cdot (U + T)$. Maîtriser De Morgan permet d'optimiser ces règles logiques pour rendre les temps de réponse de serveurs plus efficaces.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Quelle est l'expression simplifiée de la négation complète non-exclusive de "A + B" en vertu des règles logiques de De Morgan ?**
- [ ] Non(A) + Non(B)
- [x] Non(A) • Non(B)
- [ ] A • B
> **Explication :** La négation d'un "OU" logique ($+$) se transforme toujours en produit de négations individuelles ("ET" logique $\cdot$) : $\overline{A+B} = \bar{A} \cdot \bar{B}$.

**Question 2 : Un tableau de Karnaugh comportant 3 entrées binaires contient exactement :**
- [ ] 6 cases
- [x] 8 cases
- [ ] 12 cases
> **Explication :** Pour un nombre $p$ de variables d'entrées binaires indépendantes, le nombre total de combinaisons logiques (donc de cases de la grille d'étude) équivaut à la puissance de deux $2^p$. Pour 3 entrées, nous avons $2^3 = 8$ cases.

**Question 3 : Laquelle de ces formules logiques illustre de manière exacte la loi d'absorption booléenne ?**
- [ ] A + A = 2A
- [ ] A • (B + C) = A•B + A•C
- [x] A + (A • B) = A
> **Explication :** En algèbre booléenne, $A + (A \cdot B) = A \cdot (1 + B) = A \cdot 1 = A$. La variable $B$ est par conséquent absorbée par la répétition d'état de $A$.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Dresser sans erreur la table de vérité complète associée à un logigramme logique.
- [ ] Simplifier algébriquement des équations booléennes en appliquant les lois de De Morgan et d'absorption.
- [ ] Construire et déchiffrer des tableaux de Karnaugh pour éliminer les redondances dans un logigramme.
- [ ] Convertir une expression combinatoire textuelle complexe en une logique formelle d'axiomes.
