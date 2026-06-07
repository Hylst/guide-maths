# Fonctionnalités de l'Applet (Features)

Cet applet d'apprentissage des mathématiques intègre un ensemble de fonctionnalités hautement interactives conçues pour maximiser la compréhension et l'engagement des étudiants, du niveau primaire au secondaire et aux classes préparatoires (CPGE, BUT GEII).

---

## 🧩 1. Composants Pédagogiques Standards

Ces composants sont intégrés de manière réutilisable dans l'ensemble de nos chapitres :

- **Flashcards de Synthèse (`<Flashcard>`)** :
  - Permettent d'apprendre et de réviser activement les définitions clés ou théorèmes.
  - S'articulent autour d'une mécanique réactive recto/verso d'un simple clic avec un design épuré "Apple-like".
  
- **Mini-Quiz Interactifs (`<Quiz>`)** :
  - Questionnaires à choix multiples (QCM) offrant un retour visuel direct et instantané (couleurs de succès ou d'erreur adaptées d'après notre charte).
  - Explications textuelles détaillées à chaque réponse et suivi de score en temps réel.
  
- **Exercices Guidés Étape par Étape (`<InteractiveExercise>`)** :
  - Accompagnent l'élève pas à pas à travers les étapes de résolution d'un problème complexe (ex: factorisation, réduction de fractions, calcul d'une dérivée).
  - Fournissent des blocs de texte adaptés facilitant la mémorisation de la méthodologie de résolution.

- **Blocs d'Information Complémentaires (`<InfoBlock>` & `<TipBanner>`)** :
  - Catégorisent visuellement les types d'informations (Définition, Rappel, Attention, Anecdote Historique) avec des icônes distinctes et des bordures soignées respectant les contraintes d'accessibilité.

---

## 🧬 2. Laboratoires Pédagogiques de Manipulation Virtuelle (Phase V5)

Ces modules exclusifs sont implémentés à l'aide de tracés dynamiques vectoriels SVG couplés à la gestion d'état fine de React pour illustrer des notions géométriques, analytiques et physiques délicates.

### 📐 Géométrie & Équations (Collège & Lycée)
- **Simulateur de Pythagore** : Un laboratoire interactif qui permet de déplacer librement les sommets d'un triangle rectangle sur une grille pour voir les carrés d'aires $a^2$, $b^2$ et $c^2$ s'ajuster instantanément sous forme d'une balance d'équivalence d'aire.
- **Balance d'Équivalence Algébrique** : Représente visuellement la résolution d'une équation linéaire comme l'équilibre d'une balance à fléau. Ajouter ou soustraire des poids ou des variables à gauche affecte en temps réel le plateau de droite de manière tactile et sensorielle.
- **Translateur & Pivoteur Isométrique** : Visualise la dynamique des isométries (Translation et Rotation) en permettant de régler un vecteur de translation ou un curseur d'angle pour voir les points et axes de symétrie orbiter en temps réel.

### 📈 Analyse, Électricité & Asservissements (BUT GEII)
- **Simulateur Vectoriel d'Impédances Complexes RLC** :
  - Rendu vectoriel d'un circuit oscillant RLC en série ou parallèle.
  - Tracé dynamique polaire complexe (diagramme de Fresnel / d'impédance) recalculé à chaque modification des paramètres d'inductance $L$ (en rose), de capacité $C$ (en bleu) et de résistance $R$ (en vert).
  - Calcul instantané de la fréquence de résonance $f_0$.
- **Simulateur de Boucle Fermée (Transformée de Laplace)** :
  - Modélise un asservissement en cascade de premier et de second ordre avec retour stabilisant réactif.
  - Permet de tester en temps réel l'impact du pôle, du gain statique et de l'amortissement sur les courbes de réponse temporelle à un échelon unité.

### 💼 Dimension Linéaire & Économie Mathématique (CPGE B/L)
- **Transformateur Matriciel 2D** :
  - Permet de dessiner des vecteurs de base dans le plan $\mathbb{R}^2$ et d'ajuster une matrice de transformation linéaire $2 \times 2$.
  - Recherche en direct les vecteurs propres associés (c'est-à-dire les droites de vecteurs invariants où la transformation n'altère pas la direction mais change seulement la longueur/le sens, symbolisant l'équation $Ax = \lambda x$).
- **Optimum de Cobb-Douglas & Gradients** :
  - Visualise la carte d'isocourbes d'une fonction d'utilité de Cobb-Douglas sous une contrainte de budget linéaire.
  - Trace le gradient de la fonction d'utilité et de la contrainte, et illustre visuellement la tangence à l'optimum du consommateur (colinéarité des gradients de Lagrange).

---

## 🎨 3. Charte Visuelle Moderne (Esthétique "Apple-Like")

L'identité visuelle de l'applet a été pensée pour offrir une expérience calme et élégante et éviter toute surcharge d'informations inutiles :
- **Bordures Douces** : Coins arrondis de grand rayon (`rounded-xl` et `rounded-2xl`).
- **Contrastes Parfaits** : Textes et bordures optimisés en mode clair et sombre (classe `dark:` ajustée, résolution du problème de contraste sur le bloc des équations de Seconde).
- **Intégration Typographique Fine** : Famille de polices **Inter** pour les textes d'interfaces courantes associée au caractère de largeur fixe **JetBrains Mono** pour les formules de calcul.
- **Formules LaTeX Professionnelles** : Rendu de toutes les expressions par l'intermédiaire de `rehype-katex` et l'affichage fluide de `<MathComponent>` pour une lisibilité parfaite des équations.
