---
title: 'Chapitre 2 : Algèbre Linéaire'
level: Post_Bac
subLevel: Tronc_Commun
order: 2
---
# Chapitre 2 : Algèbre Linéaire

**Niveau** : Post-Bac (CPGE, Licence)  
**Prérequis** : Systèmes d'équations linéaires, géométrie plane et dans l'espace.  
**Objectifs** : 
- Définir et manipuler les espaces vectoriels.
- Comprendre les notions de famille libre, génératrice et de base.
- Étudier les applications linéaires et le théorème du rang.

---

## Activités de découverte

**Activité : Des vecteurs pas comme les autres**

Au lycée, un "vecteur" est souvent vu comme une flèche. Mais en mathématiques supérieures, on généralise cette notion.

1. **Les polynômes** : Considérez l'ensemble des polynômes de degré inférieur ou égal à 2 : $P(x) = ax^2 + bx + c$. Si on additionne deux tels polynômes, obtient-on encore un polynôme de degré $\le 2$ ?
2. **Les fonctions** : Si on multiplie une fonction continue par un nombre réel, est-elle toujours continue ?
3. **Le point commun** : Quel est le point commun entre ces objets et les "flèches" du plan ? (Indice : regarde comment on les additionne et comment on les multiplie par un nombre).

---

## Rappels

Avant de commencer, révise :
- **Systèmes d'équations** : Méthode du pivot de Gauss.
- **Vecteurs du plan** : $\vec{u} + \vec{v}$, colinéarité.
- **Applications** : Image, antécédent, injection, surjection.

---

## Explications et Théorie

### 1. Espace vectoriel (E.V.)
Un ensemble $E$ est un **$\mathbb{K}$-espace vectoriel** s'il est muni d'une addition interne et d'une multiplication par un scalaire ($\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$) vérifiant 8 propriétés fondamentales.
- **Sous-espace vectoriel (S.E.V.)** : Un sous-ensemble $F \subset E$ est un S.E.V. s'il contient le vecteur nul et s'il est stable par combinaison linéaire ($\forall u, v \in F, \forall \lambda, \mu \in \mathbb{K}, \lambda u + \mu v \in F$).

### 2. Familles de vecteurs
- **Famille libre** : Aucun vecteur n'est combinaison linéaire des autres. $\sum \lambda_i e_i = 0 \implies \forall i, \lambda_i = 0$.
- **Famille génératrice** : Tout vecteur de l'espace peut s'écrire comme combinaison linéaire des vecteurs de la famille.
- **Base** : Une famille à la fois libre et génératrice.

### 3. Dimension
Si $E$ admet une base de $n$ vecteurs, on dit que $\dim(E) = n$.
- Toutes les bases d'un même espace ont le même nombre d'éléments.

## 🎨 Animation Interactive : Base et Transformation Linéaire
Regarde comment la pure grille d'un espace vectoriel de dimension 2 se déforme sous l'effet d'une application linéaire. Les deux vecteurs de base (le rouge $\vec{i}$ et le vert $\vec{j}$) subissent la transformation de plein fouet, entraînant toute la grille 2D avec eux.

![Transformation Linéaire](./assets/transform_lineaire.svg)

### 4. Applications linéaires
Une fonction $f : E \to F$ est linéaire si $f(\lambda u + v) = \lambda f(u) + f(v)$.
- **Noyau** : $\text{Ker}(f) = \{x \in E \mid f(x) = 0_F\}$. (Indique l'injectivité).
- **Image** : $\text{Im}(f) = \{f(x) \mid x \in E\}$. (Indique la surjectivité).
- **Théorème du rang** : $\dim(E) = \dim(\text{Ker}(f)) + \text{rg}(f)$.

### Méthodes pas-à-pas

**Comment montrer qu'une famille est une base de $\mathbb{R}^n$ ?**
1. Vérifier que la famille contient exactement $n$ vecteurs (où $n = \dim(\mathbb{R}^n)$).
2. Montrer que la famille est **libre** (en résolvant le système $\sum \lambda_i e_i = 0$).
3. Conclure : une famille libre de $n$ vecteurs dans un espace de dimension $n$ est automatiquement une base.

---

## 💡 Le savais-tu ?

L'algèbre linéaire n'est pas qu'un outil abstrait pour faire souffrir les étudiants de CPGE, c'est le **moteur mathématique absolu** derrière presque tous les algorithmes d'Intelligence Artificielle d'aujourd'hui. Les immenses réseaux de neurones profonds (Deep Learning) effectuent des dizaines de milliards de multiplications de matrices (qui ne sont que de redoutables applications linéaires géantes modifiant des espaces dimensionnels) chaque picoseconde pour reconnaître un visage, battre les maîtres aux Échecs ou traduire un texte instantanément !

---

## Exercices

**🟢 Exercice A (Le Test de la Base)**
1. **Validation d'Espace** : Prouve de manière rigoureuse que le sous-ensemble vectoriel $F = \{(x, y) \in \mathbb{R}^2 \mid x + y = 0\}$ mérite bien le statut de Sous-Espace Vectoriel (S.E.V.) dans $\mathbb{R}^2$.
2. **La Peur de la Liaison** : La famille constituée des deux vecteurs purs $u=(1, 2)$ et $v=(2, 4)$ a-t-elle le droit de s'appeler "famille libre" dans $\mathbb{R}^2$ ?
3. **Le Linéarisme Check** : Soit la mystique application $f(x, y) = (x+y, x-y)$. Montre violemment que $f$ est purement linéaire.

**🔵 Exercice B (Guerre des Dimensions)**
4. **Dimension Universelle** : Quelle est la véritable dimension du puissant $\mathbb{R}_n[X]$ (l'espace infini des polynômes limités à un degré $\le n$) ?
5. **Enquête dans le Noyau** : Détermine chirurgicalement le noyau formel de l'application $f : \mathbb{R}^3 \to \mathbb{R}$ définie arbitrairement par la règle : $f(x, y, z) = x + y + z$.
6. **Magie d'Équivalence (Théorème du Rang)** : Si l'organisme $f : \mathbb{R}^4 \to \mathbb{R}^3$ possède un trou noir (noyau) d'une dimension exacte de 2, quel est ce qu'il reste pour son Rang ? Question bonus : L'application est-elle "surjective" ?

**🟠 Exercice C (Domination de Structure L3/Prépa)**
7. **La Projection Parfaite** : On donne $p$ comme une simple application linéaire possédant l'affreux trait $p \circ p = p$. On l'appelle respectueusement un 'Projecteur'. Utilise ton intuition pour démontrer magistralement que $E = \text{Ker}(p) \oplus \text{Im}(p)$ (c'est-à-dire : l'espace entier se coupe purement sans collision entre ceux qui sont tués par le projecteur, et l'image projetée elle-même).

---

## Exercices corrigés

**Exercice 1 :**
$0+0=0$ donc $(0,0) \in F$. Si $u, v \in F$, $(x_u+x_v) + (y_u+y_v) = (x_u+y_u) + (x_v+y_v) = 0+0=0$. Donc $u+v \in F$. De même pour $\lambda u$. **C'est un S.E.V.**

**Exercice 2 :**
On remarque que $v = 2u$. Les vecteurs sont colinéaires, donc la famille est **liée** (non libre).

**Exercice 3 :**
$f(\lambda(x,y) + (x',y')) = f(\lambda x+x', \lambda y+y') = (\lambda x+x'+\lambda y+y', \lambda x+x'-\lambda y-y') = \lambda(x+y, x-y) + (x'+y', x'-y') = \lambda f(x,y) + f(x',y')$. **Oui**.

**Exercice 4 :**
Une base est $(1, X, X^2, ..., X^n)$. Il y a $n+1$ vecteurs, donc la dimension est **$n+1$**.

**Exercice 5 :**
$x+y+z=0 \implies z = -x-y$. Un vecteur du noyau s'écrit $(x, y, -x-y) = x(1, 0, -1) + y(0, 1, -1)$.
$\text{Ker}(f) = \mathbf{\text{Vect}((1, 0, -1), (0, 1, -1))}$. C'est un plan de dimension 2.

**Exercice 6 :**
$\text{rg}(f) = \dim(E) - \dim(\text{Ker}(f)) = 4 - 2 = \mathbf{2}$.
Comme $\text{rg}(f) < 3$ (la dimension de l'espace d'arrivée), $f$ n'est **pas surjective**.

**Exercice 7 :**
Pour tout $x$, on peut écrire $x = (x - p(x)) + p(x)$.
$p(x - p(x)) = p(x) - p(p(x)) = p(x) - p(x) = 0$, donc $(x - p(x)) \in \text{Ker}(p)$.
$p(x) \in \text{Im}(p)$ par définition. La décomposition existe et on montre l'unicité par l'intersection nulle.

---

## Synthèse

- **E.V.** : Structure stable par addition et multiplication scalaire.
- **Base** : Famille libre et génératrice.
- **Dimension** : Nombre de vecteurs d'une base.
- **Théorème du rang** : Relie la dimension du noyau et de l'image.

---




---

## Pour aller plus loin

**Les espaces de dimension infinie**
En analyse, on étudie souvent des espaces de fonctions (comme l'espace des fonctions continues sur $[0, 1]$). Ces espaces n'ont pas de base finie : on dit qu'ils sont de dimension infinie. L'algèbre linéaire devient alors l'**analyse fonctionnelle**, un domaine crucial pour la physique quantique où les états des particules sont représentés par des vecteurs dans des espaces de Hilbert.

---

## Foire Aux Questions (FAQ) Spécialisée

<details>
  <summary>Je n'arrive vraiment pas à distinguer le concept de "Vecteur V" et de ses fameuses "Coordonnées (x,y)"... C'est la même chose, non ?</summary>

  Loin de là ! Le Vecteur pur est un **Objet Mathématique intrinsèque** qui existe librement dans le vide spatial (ça peut même être la fonction Cosinus elle-même dans un espace abstrait !).<br>Ses Coordonnées $(x, y)$, par contre, sont une construction dépendante de la <b>Base choisis l'observateur</b>. <br>Analogie ultime : Le Vecteur c'est ta "Maison physique". Tes coordonnées, c'est ton "Adresse postale". Ta Maison ne bouge jamais. Mais si l'Amérique envahit un jour la France et qu'on change le système de cadastre local (la Base Vectorielle de calcul), ton Numéro d'Adresse et le nom de Rue vont totalement changer ! Même si ta maison est au même endroit cosmique.
</details>

<details>
  <summary>Le fameux "Théorème du Rang". En quoi ça aide au quotidien de l'étudiant ?</summary>

  C'est ton Outil de Surveillance Comptable Magistral. Il te crie cette vérité : "Tu pars d'une grande Salle N. Cette Salle a une taille dim(E). La Transformation se met en marche et une part des éléments sont sauvagement annihilés vers le Zéro Absolu : C'est le Noyau, la poubelle temporelle dim(Ker). Hé bien tout ce qui a SU SURVIVRE sans fuir dans la poubelle, c'est l'Image (Le Rang)."<br>L'équation de sang est donc simple : Tout ce qu'on Avait (Base) = Tout Ce qui est mort (Noyau) + Le Butin final de Survie (Rang Image).
</details>

<details>
  <summary>Quelle est la différence fondamentale entre injectivité, surjectivité et bijectivité d'une application linéaire ?</summary>

  C'est lié à la taille de l'information préservée ou projetée :
  1. **Injectivité** : L'application ne fusionne aucun vecteur distinct. Autrement dit, le noyau $\text{Ker}(f)$ se limite uniquement au vecteur nul $\mathbf{0}_E$.
  2. **Surjectivité** : L'application couvre l'entièreté de l'espace d'arrivée, donc l'image $\text{Im}(f)$ est égale à l'espace $F$. 
  3. **Bijectivité (Isomorphisme)** : L'application est à la fois injective et surjective (elle ne perd aucune information et couvre tout l'espace), ce qui permet de l'inverser parfaitement (matrice inversible).
</details>

<details>
  <summary>Que signifie concrètement qu'une matrice a un déterminant nul ?</summary>

  Cela signifie que l'application linéaire écrase/aplatit l'espace vers une dimension inférieure (par exemple, un plan 2D entier est projeté sur une simple ligne 1D ou sur l'origine 0D). L'aire polaire est compressée à zéro et de l'information est irrémédiablement perdue, c'est pourquoi la matrice est non-inversible (il est impossible de ressusciter un plan complet à partir d'une simple ligne droite).
</details>

---

## 📝 Mini-Quiz

**Question 1 : Dans une salle secrète de type $\mathbb{R}^3$, une belle famille contenant généreusement 4 gros vecteurs...**
- [ ] Est sûrement très Libre si on paie cher.
- [ ] A de grandes chances d'être Libre à cause de sa force.
- [x] Meurt d'une Asphyxie d'Obligation Liée !
> **Explication :** Loi Immuable Post-Bac de l'Élasticité Dimensionnelle : Toute Famille entassant un nombre d'invités $N$ strictement supérieur à la taille limite exacte de son salon $E$ ($\dim(E)=3$) va inévitablement déborder, au moins un invité sera issu du clonage ou de la combinaison des autres ! (Famille méchamment LIÉE).

**Question 2 : Le juge d'un Tribunal Mathématique décide : "La sentence de l'Application est qu'elle restera strictement Surjective pour toujours". Le Noyau $f : \mathbb{R}^3 \to \mathbb{R}^2$ devra subir une taille définitive de... :**
- [ ] 0 ! Car justice est impitoyable.
- [x] 1 ! (L'évaporation inévitable).
- [ ] 2 ! (Le vide d'état).
> **Explication :** C'est la Comptabilité Divine (Théorème Rapide du Rang). Notre argent initial total vaut 3 ($\dim(\mathbb{R}^3)$). La sentence oblige que Le Butin final couvre toute la banque ennemie $R^2$ ($\text{Im}(f) = 2$). Par miracle comptable, tout ce qui a disparu mystérieusement dans les égouts (Le Noyau Ker) vaut l'équation : $3 - 2 = 1$. K.O. !

**Question 3 : Quelle est historiquement la gigantesque différence entre juste être "Famille Libre" et de détenir le titre officiel de "Nouvelle Base Merveilleuse" ?**
- [x] Une Base Merveilleuse est aussi Libre, mais elle paie le privilège d'être Génératrice de tout l'Univers Spatial local.
- [ ] Aucune différence. Libre = Base.
> **Explication :** Le Grade ultime nécessite deux exploits combinés. 1) Libre (Aucun vecteur ne sert à rien / Ne triche). 2) Génératrice Totale (Si on mélange ces vecteurs on peut atteindre N'IMPORTE QUEL coordonné de la Galaxie concernée !!).

---


## ✅ Checklist des Essentiels (Validation)

- [ ] Je maîtrise les définitions clés de ce chapitre.
- [ ] Je sais appliquer les méthodes fondamentales présentées.
- [ ] J'ai résolu les exercices pratiques d'entraînement.
- [ ] J'ai complété le mini-quiz du chapitre avec succès.

*(Fin de l'Algèbre Spatiale)*