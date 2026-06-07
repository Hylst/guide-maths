export interface GlossaryItem {
  id: string;
  term: string;
  category: 'algebra' | 'geometry' | 'analysis' | 'proba_stats' | 'superior';
  categoryLabel: string;
  definition: string;
  mathFormula?: string;
  example: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: "abscisse",
    term: "Abscisse",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Coordonnée horizontale décrivant la position d'un point dans un repère cartésien 2D ou 3D au sol. Par convention, elle est mesurée sur l'axe des x.",
    mathFormula: "M(x, y) \\implies x \\text{ est l'abscisse}",
    example: "Le point A(3, -2) possède une abscisse de 3."
  },
  {
    id: "adjacente",
    term: "Adjacente",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Désigne le côté d'un triangle rectangle qui forme l'angle aigu d'intérêt avec l'hypoténuse.",
    mathFormula: "\\cos(\\theta) = \\frac{\\text{Côté Adjacent}}{\\text{Hypoténuse}}",
    example: "Si le triangle ABC est rectangle en B, le côté adjacent de l'angle BAC est le segment [AB]."
  },
  {
    id: "al_kashi",
    term: "Al-Kashi (Théorème)",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Généralisation du théorème de Pythagore dans un triangle quelconque, reliant la longueur d'un côté à celles des deux autres et au cosinus de l'angle opposé.",
    mathFormula: "a^2 = b^2 + c^2 - 2bc \\cos(\\widehat{A})",
    example: "Dans un triangle avec b=3, c=5 et l'angle A=60°, on calcule a² = 9 + 25 - 2*3*5*0.5 = 19."
  },
  {
    id: "algorithme_euclide",
    term: "Algorithme d'Euclide",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Méthode arithmétique efficace pour calculer le Plus Grand Commun Diviseur (PGCD) de deux nombres entiers en effectuant des divisions euclidiennes successives.",
    mathFormula: "a = b \\cdot q + r \\implies \\text{PGCD}(a,b) = \\text{PGCD}(b,r)",
    example: "Pour calculer le PGCD de 15 et 12 : 15 = 12 * 1 + 3, puis 12 = 3 * 4 + 0. Le PGCD vaut 3."
  },
  {
    id: "anneau",
    term: "Anneau",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Structure algébrique munie de deux lois de composition internes (généralement notées + et *) possédant des propriétés de groupe abélien pour la première, et de distributivité pour la seconde.",
    mathFormula: "(A, +, \\times) \\text{ est un anneau}",
    example: "L'ensemble Z des entiers relatifs muni de l'addition et de la multiplication usuelles est un anneau commutatif unitaire."
  },
  {
    id: "asymptote",
    term: "Asymptote",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Ligne droite (horizontale, verticale ou oblique) dont le tracé représentatif d'une courbe s'approche infiniment sans jamais la couper, à mesure que la variable tend vers une borne infinie.",
    mathFormula: "f(x) \\underset{x \\to +\\infty}{\\approx} m x + p \\implies y = m x + p",
    example: "L'hyperbole d'équation y = 1/x de la fonction inverse possède l'axe des ordonnées (x=0) comme asymptote verticale."
  },
  {
    id: "barycentre",
    term: "Barycentre",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Point géométrique d'équilibre stable d'un système de points pondérés affectés de coefficients réels. Par exemple, le barycentre de deux points de masses égales est leur milieu.",
    mathFormula: "(a+b)\\overrightarrow{OG} = a\\overrightarrow{OA} + b\\overrightarrow{OB}",
    example: "Le centre de gravité G d'un solide homogène est le barycentre de tous ses points massifs."
  },
  {
    id: "bayes",
    term: "Bayes (Théorème de)",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Théorème fondamental des probabilités conditionnelles exprimant la probabilité d'un événement A sachant B en fonction de la probabilité de B sachant A.",
    mathFormula: "P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}",
    example: "Utilisé dans le filtrage des spams ou l'évaluation médicale pour connaître le taux réel de maladie en cas de test positif."
  },
  {
    id: "bijection",
    term: "Bijection (Bijective)",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Application mathématique à la fois injective et surjective : chaque élément de l'ensemble d'arrivée possède un unique antécédent dans l'ensemble de départ.",
    mathFormula: "\\forall y \\in Y, \\exists! x \\in X \\text{ t.q. } f(x) = y",
    example: "La fonction f(x) = x³ est une bijection de R dans R car tout nombre possède un unique antécédent (sa racine cubique)."
  },
  {
    id: "bissectrice",
    term: "Bissectrice",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Demi-droite séparant un angle plan en deux angles égaux de même mesure angulaire. C'est l'axe de symétrie de l'angle.",
    example: "Tracer la bissectrice d'un angle droit à 90° produit deux demi-angles égaux de 45°."
  },
  {
    id: "cercle_trigo",
    term: "Cercle Trigonométrique",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Cercle centré à l'origine d'un plan orthonormal, possédant un rayon de longueur exacte 1, orienté positivement dans le sens anti-horaire.",
    mathFormula: "x^2 + y^2 = 1 \\quad (R = 1)",
    example: "Sur le cercle trigonométrique, l'angle de pi / 3 correspond au point de coordonnées (1/2, V3/2)."
  },
  {
    id: "coefficient_binomial",
    term: "Coefficient Binomial",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Nombres entiers positifs apparaissant comme coefficients dans le développement de la formule du binôme de Newton. Ils correspondent aux valeurs du Triangle de Pascal.",
    mathFormula: "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}",
    example: "Le coefficient binomial (4 au-dessus de 2) vaut 4! / (2! * 2!) = 6."
  },
  {
    id: "colinearite",
    term: "Colinéarité",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Propriété de deux vecteurs dont les directions géométriques sont rigoureusement parallèles. Il existe un coefficient multiplicateur réel liant les deux.",
    mathFormula: "\\vec{u} = k \\cdot \\vec{v} \\quad (k \\in \\mathbb{R})",
    example: "Si u(2; 3) et v(4; 6) alors v = 2u, ils sont colinéaires."
  },
  {
    id: "combinatoire",
    term: "Combinatoire",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Branche étudiant le dénombrement de configurations possibles dans un ensemble fini d'éléments (permutations, arrangements, combinaisons).",
    mathFormula: "A_n^k = \\frac{n!}{(n-k)!}",
    example: "Au loto, le calcul combinatoire permet d'évaluer le nombre de tirages distincts de 5 numéros parmi 49."
  },
  {
    id: "congruence",
    term: "Congruence",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Relation d'équivalence entre deux entiers qui ont le même reste dans la division euclidienne par un diviseur commun (le modulo).",
    mathFormula: "a \\equiv b \\pmod n \\iff n \\mid (a-b)",
    example: "17 est congru à 2 modulo 5 car 17 = 3 * 5 + 2."
  },
  {
    id: "continuite",
    term: "Continuité",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Propriété d'une fonction numérique qui ne présente aucun saut ni rupture brusque sur son intervalle de définition, permettant de tracer son graphique sans lever le stylo.",
    mathFormula: "\\lim_{x \\to a} f(x) = f(a)",
    example: "La fonction f(x) = |x| est continue sur R, tandis que la fonction f(x) = E(x) (partie entière) est discontinue à chaque entier."
  },
  {
    id: "convergence",
    term: "Convergence",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Propriété d'une suite ou d'une série qui s'approche d'une valeur limite unique bien définie à mesure que l'indice tend vers l'infini.",
    mathFormula: "\\forall \\varepsilon > 0, \\exists N \\in \\mathbb{N} \\text{ t.q. } n \\ge N \\implies |u_n - L| < \\varepsilon",
    example: "La suite numérique u_n = 1/n converge vers la limite unique 0 quand n tend vers +infini."
  },
  {
    id: "convexe",
    term: "Convexe",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Se dit d'une fonction analytique dont la courbe est entièrement située au-dessus de ses tangentes locales. Sa dérivée seconde est positive.",
    mathFormula: "f''(x) \\ge 0 \\quad \\iff \\quad f \\text{ est convexe}",
    example: "La fonction parabole de référence f(x) = x² est strictement convexe sur l'ensemble des réels."
  },
  {
    id: "corps",
    term: "Corps",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Structure d'anneau commutatif unitaire dans lequel tout élément non nul possède un élément symétrique inverse pour la seconde loi.",
    mathFormula: "\\forall x \\in K \\setminus \\{0\\}, \\exists x^{-1} \\text{ t.q. } x \\cdot x^{-1} = 1",
    example: "R, Q et C munis des opérations d'addition et de multiplication usuelles sont des corps infinis très classiques."
  },
  {
    id: "croissance_comparee",
    term: "Croissances Comparées",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Ensemble de théorèmes décrivant le comportement asymptotique relatif des fonctions logarithmes, puissances et exponentielles à l'infini.",
    mathFormula: "\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty \\quad (n > 0)",
    example: "Bien que x² tende vers l'infini, la croissance d'exponentielle e^x l'emporte largement et le rapport tend vers l'infini."
  },
  {
    id: "derivee",
    term: "Dérivée",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Mesure de la pente locale rectiligne instantanée ou taux de changement infinitésimal d'une fonction numérique par rapport à sa variable d'entrée.",
    mathFormula: "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}",
    example: "La dérivée de la fonction de déplacement d'une voiture par rapport au temps donne sa courbe de vitesse instantanée."
  },
  {
    id: "determinant",
    term: "Déterminant",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Valeur scalaire extraite d'une matrice carrée, mesurant l'expansion géométrique des volumes ou servant à tester si le système correspondant est inversible.",
    mathFormula: "\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc",
    example: "Une matrice de déterminant nul correspond à un système sans solution unique ou à un ensemble de vecteurs liés."
  },
  {
    id: "developpement_limite",
    term: "Développement Limité (DL)",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Approximation polynomiale locale d'une fonction réelle au voisinage d'un point au moyen d'un polynôme de degré n et d'un reste négligeable.",
    mathFormula: "f(x) = f(0) + f'(0)x + \\frac{f''(0)}{2}x^2 + o(x^2)",
    example: "Le développement limité d'ordre 3 de cos(x) en 0 est cos(x) = 1 - x²/2 + o(x²)."
  },
  {
    id: "diagonalisation",
    term: "Diagonalisation",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Processus de calcul matriciel linéaire visant à exprimer une matrice carrée quelconque sous forme diagonale équivalente au moyen d'un changement de base de vecteurs propres.",
    mathFormula: "A = P \\cdot D \\cdot P^{-1}",
    example: "Facilite grandement le calcul des puissances élevées d'une matrice dans l'étude des systèmes dynamiques."
  },
  {
    id: "dichotomie",
    term: "Dichotomie",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Algorithme numérique de recherche séquentielle permettant de localiser l'axe d'un zéro de fonction en coupant itérativement par moitié l'intervalle de travail.",
    example: "Pour trouver la racine d'un polynôme entre 1 et 2, on évalue son milieu 1.5, puis on garde le demi-intervalle de signes opposés."
  },
  {
    id: "differentielle",
    term: "Différentielle",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Équation contenant une fonction inconnue exprimée à travers une ou plusieurs de ses dérivées successives, modélisant les flux physiques complexes.",
    mathFormula: "y'(t) + k \\cdot y(t) = a \\cos(wt)",
    example: "En physique, la décharge d'un condensateur ou l'oscillation d'un ressort se modélisent par des équations différentielles linéaires."
  },
  {
    id: "divisibilite",
    term: "Divisibilité",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Relation arithmétique entre deux entiers indiquant que le reste de la division euclidienne du premier par le second est rigoureusement nul.",
    mathFormula: "a = b \\cdot q \\quad (q \\in \\mathbb{Z}) \\implies b \\mid a",
    example: "On dit que 3 divise 15 car le reste de dividende 15 par 3 vaut 0."
  },
  {
    id: "ecart_type",
    term: "Écart-Type",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Indicateur statistique mesurant la dispersion globale des valeurs d'une variable aléatoire. C'est la racine carrée exacte de la variance.",
    mathFormula: "\\sigma(X) = \\sqrt{V(X)}",
    example: "Dans une classe, si l'écart-type des notes est de 1.5, les notes sont très regroupées autour de la moyenne globale."
  },
  {
    id: "endomorphisme",
    term: "Endomorphisme",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Application linéaire d'un espace vectoriel E dans lui-même. Sa représentation sur une base fixe est une matrice carrée.",
    mathFormula: "f \\in \\mathcal{L}(E) \\implies f(x+y) = f(x)+f(y)",
    example: "La dérivation d'un polynôme sur l'espace des polynômes de degré au plus 3 est un endomorphisme."
  },
  {
    id: "equation_droite",
    term: "Équation de Droite",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Expression algébrique décrivant la condition nécessaire et suffisante pour que les coordonnées d'un point appartiennent à une droite du plan.",
    mathFormula: "y = m x + p \\quad \\text{ou} \\quad ax + by + c = 0",
    example: "La droite passant par l'origine et de coefficient directeur 2 a pour équation y = 2x."
  },
  {
    id: "espace_vectoriel",
    term: "Espace Vectoriel",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Structure algébrique englobant un ensemble d'éléments (vecteurs), munie d'une opération d'addition interne et d'une multiplication par des scalaires réels ou complexes.",
    mathFormula: "\\lambda \\cdot (\\vec{u} + \\vec{v}) = \\lambda \\vec{u} + \\lambda \\vec{v}",
    example: "L'espace R² des couples de réels munis de l'addition coordonnée par coordonnée forme un espace vectoriel fondamental."
  },
  {
    id: "esperance",
    term: "Espérance",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Moyenne harmonique pondérée à long terme qu'un jeu d'argent aléatoire d'une variable discrète est censé produire si l'on répète l'épreuve à l'infini.",
    mathFormula: "E(X) = \\sum_{i} x_i \\cdot P(X = x_i)",
    example: "L'espérance d'un jeu de casino honnête vaut pile 0. Si elle est négative, le jeu est en faveur du casino."
  },
  {
    id: "evenement_contraire",
    term: "Événement Contraire",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Sous-ensemble réunissant toutes les issues du référentiel universel qui n'appartiennent pas à l'événement de base étudié.",
    mathFormula: "P(\\overline{A}) = 1 - P(A)",
    example: "Si la probabilité d'avoir de la pluie vaut 0.3, la probabilité de l'événement contraire 'pas de pluie' vaut 0.7."
  },
  {
    id: "exponentielle",
    term: "Exponentielle (Fonction)",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Unique fonction mathématique continue égale à sa propre dérivée première et valant rigoureusement 1 à l'abscisse d'origine x = 0.",
    mathFormula: "f'(x) = f(x) \\quad \\text{et} \\quad f(0) = 1 \\implies f(x) = e^x",
    example: "Utilisée pour modéliser la prolifération virale rapide des bactéries ou le calcul des intérêts d'épargne dits composés."
  },
  {
    id: "factorielle",
    term: "Factorielle",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Produit de l'intégralité des nombres entiers strictement positifs allant de 1 jusqu'à la limite supérieure d'un nombre entier naturel n donné.",
    mathFormula: "n! = 1 \\times 2 \\times 3 \\times \\dots \\times n",
    example: "La factorielle de l'entier 5 se calcule par la multiplication 5! = 1 * 2 * 3 * 4 * 5 = 120."
  },
  {
    id: "fourier",
    term: "Fourier (Série / Transformée)",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Outil d'analyse décomposant un signal périodique ou général en une superposition infinie ordonnée d'ondes pures sinusoïdales (harmoniques).",
    mathFormula: "\\widehat{f}(\\xi) = \\int_{-\\infty}^{+\\infty} f(x) e^{-2\\pi i x \\xi} dx",
    example: "Fondamental en traitement d'images JPEG ou audio MP3 pour filtrer les plages de fréquences inaudibles."
  },
  {
    id: "gauss_theoreme",
    term: "Gauss (Théorème d'Arithmétique)",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Théorème d'arithmétique indiquant que si un nombre entier a divise le produit bc de deux entiers et s'il est premier avec b, alors il divise obligatoirement c.",
    mathFormula: "a \\mid bc \\quad \\text{et} \\quad \\text{PGCD}(a,b) = 1 \\implies a \\mid c",
    example: "Si 3 divise 5*x, comme 3 est premier avec 5, le théorème de Gauss montre que 3 divise nécessairement x."
  },
  {
    id: "gradient",
    term: "Gradient",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Vecteur dimensionnel constitué des dérivées partielles d'une fonction à plusieurs variables, orienté vers la direction d'intensité ou d'inclinaison la plus raide.",
    mathFormula: "\\nabla f(x, y) = \\begin{pmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{pmatrix}",
    example: "En cartographie de montagne, le vecteur gradient pointe directement vers le sommet, perpendiculairement aux courbes de niveau d'altitude."
  },
  {
    id: "groupe",
    term: "Groupe",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Ensemble muni d'une loi de composition interne associative admettant un élément neutre, et tel que chaque élément ait un symétrique.",
    mathFormula: "(G, *) \\implies \\forall a, b \\in G, \\ a * b \\in G",
    example: "L'ensemble Z des entiers relatifs muni de l'addition classique forme un groupe additif commutatif."
  },
  {
    id: "hasard",
    term: "Hasard",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Caractère imprévisible et aléatoire d'un fait ou d'un événement qui échappe au déterminisme strict ou aux prévisions immédiates de l'observateur.",
    example: "Lancer un dé à six faces non pipé relève du hasard uniforme : chaque face a une probabilité de 1/6."
  },
  {
    id: "hilbert",
    term: "Hilbert (Espace de)",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Espace vectoriel réel ou complexe muni d'un produit scalaire qui en fait un espace métrique complet pour la distance associée à la norme hilbertienne.",
    mathFormula: "\\langle x, y \\rangle = \\text{Produit Scalaire Interne}",
    example: "Fondamental en physique quantique pour modéliser les états des particules au moyen de fonctions complexes de carré intégrable."
  },
  {
    id: "homometrie_homothetie",
    term: "Homothétie",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Transformation géométrique qui agrandit ou rétrécit une figure plane à partir d'un centre de référence rigide et d'un rapport multiplicatif k réel.",
    mathFormula: "\\overrightarrow{OM'} = k \\cdot \\overrightarrow{OM}",
    example: "Une homothétie de centre O et de rapport 2 multiplie toutes les longueurs d'une figure géométrique par 2 et son aire par 4."
  },
  {
    id: "hypotenuse",
    term: "Hypoténuse",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Le côté le plus étendu en longueur géométrique à l'intérieur d'un triangle rectangle. Il correspond toujours au côté situé en face de l'angle droit.",
    mathFormula: "c^2 = a^2 + b^2 \\implies c = \\sqrt{a^2 + b^2}",
    example: "Dans un triangle rectangle dont les petits côtés valent 3cm et 4cm, l'hypoténuse mesure 5cm."
  },
  {
    id: "independance",
    term: "Indépendance",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Propriété de deux événements aléatoires dans laquelle la survenue de l'un n'influence aucunement la probabilité géométrique de réalisation de l'autre.",
    mathFormula: "P(A \\cap B) = P(A) \\cdot P(B)",
    example: "Le fait de tirer une carte de couleur rouge lors d'un premier tirage et d'obtenir pile lors d'un jet de pièce sont indépendants."
  },
  {
    id: "infini",
    term: "Infini",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Concept philosophique et mathématique décrivant une grandeur supérieure à n'importe quelle valeur réelle donnée, sans limite de taille ni de temps.",
    mathFormula: "\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty",
    example: "L'ensemble des nombres entiers naturels possède une taille infinie dénombrable."
  },
  {
    id: "injectif",
    term: "Injectif (Injection)",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Se dit d'une application mathématique où chaque élément de l'ensemble d'arrivée possède au plus un antécédent dans l'ensemble de départ.",
    mathFormula: "f(a) = f(b) \\implies a = b",
    example: "La fonction f(x) = 2x + 1 est injective sur R car deux nombres distincts ont forcément des images distinctes."
  },
  {
    id: "integrale",
    term: "Intégrale",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Opération mesurant l'aire géométrique comprise sous la courbe dessinée par une fonction continue positive, délimitée par un intervalle de bornes [a; b].",
    mathFormula: "\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)",
    example: "Calculer l'intégrale d'un débit d'eau circulant dans un tuyau permet de trouver le volume global de fluide consommé."
  },
  {
    id: "intervalle_confiance",
    term: "Intervalle de Confiance",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Fourchette de valeurs au sein de laquelle un paramètre statistique inconnu du grand public a de fortes chances de se trouver selon un certain taux de confiance.",
    mathFormula: "I_c = \\left[ f - \\frac{1}{\\sqrt{n}} ; f + \\frac{1}{\\sqrt{n}} \\right]",
    example: "Lors d'un sondage de 1000 personnes, si 52% répondent oui, l'intervalle de confiance à 95% est approximativement [49% ; 55%]."
  },
  {
    id: "isomorphisme",
    term: "Isomorphisme",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Application linéaire bijective entre deux structures algébriques, démontrant leur stricte équivalence mathématique structurelle sous-jacente.",
    mathFormula: "f(\\vec{u} + \\vec{v}) = f(\\vec{u}) + f(\\vec{v}) \\quad \\text{et } f \\text{ est bijective}",
    example: "L'application qui associe à tout polynôme de degré inférieur ou égal à 1 ses coefficients réels est un isomorphisme de R1[X] dans R²."
  },
  {
    id: "limite",
    term: "Limite",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Valeur vers laquelle tendent les images d'une fonction numérique ou d'une suite lorsque la variable d'entrée s'approche infiniment d'un point ou de l'infini.",
    mathFormula: "\\lim_{n \\to +\\infty} u_n = L",
    example: "La suite u_n = 3 - (2/n) possède pour limite 3 lorsque n tend vers l'infini."
  },
  {
    id: "logarithme",
    term: "Logarithme",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Fonction réciproque de la croissance exponentielle. Elle possède la propriété de transformer de fastidieuses multiplications en simples additions cumulatives.",
    mathFormula: "\\ln(a \\cdot b) = \\ln(a) + \\ln(b)",
    example: "Le calcul de l'échelle d'acidité pH chimique ou l'énergie des séismes sur l'échelle de Richter s'évaluent en échelles logarithmiques."
  },
  {
    id: "loi_binomiale",
    term: "Loi Binomiale",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Modèle probabiliste discret comptant le nombre cumulé de succès au cours de la répétition d'épreuves de Bernoulli identiques et indépendantes entre elles.",
    mathFormula: "P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}",
    example: "Modéliser le nombre de fois où l'on obtient 'pile' en lançant 10 pièces de monnaie successives."
  },
  {
    id: "loi_grands_nombres",
    term: "Loi des Grands Nombres",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Théorème de probabilités de convergence indiquant que la moyenne empirique calculée sur un échantillon d'épreuves tend vers la valeur d'espérance théorique.",
    mathFormula: "\\lim_{n \\to \\infty} \\bar{X}_n = E(X)",
    example: "Si l'on lance 10 000 fois de suite une pièce, la proportion de piles se rapproche extrêmement près de 0.5."
  },
  {
    id: "loi_poisson",
    term: "Loi de Poisson",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Loi de probabilité discrète décrivant la fréquence de survenue de certains événements indépendants et d'intensité rare sur un intervalle de temps donné.",
    mathFormula: "P(X = k) = e^{-\\lambda} \\frac{\\lambda^k}{k!}",
    example: "Modéliser le nombre d'appels reçus en une heure par un standard de pompiers au cours de la journée."
  },
  {
    id: "matrice",
    term: "Matrice",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Tableau ordonné de dimensions rectangulaires combinant des coefficients numériques en lignes et colonnes, permettant de compacter des systèmes d'équations géantes.",
    mathFormula: "M = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}",
    example: "Les cartes graphiques modifient la perspective 3D d'une scène de jeu vidéo en multipliant des millions de coordonnées par des matrices de rotation."
  },
  {
    id: "matrice_inverse",
    term: "Matrice Inverse",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Unique matrice notée A⁻¹ qui, multipliée par la matrice d'origine A, produit de manière symétrique la matrice d'identité I.",
    mathFormula: "A \\cdot A^{-1} = A^{-1} \\cdot A = I_n",
    example: "Permet de résoudre directement le système matriciel Y = AX sous la forme X = A⁻¹Y."
  },
  {
    id: "mediatrice",
    term: "Médiatrice",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "La droite perpendiculaire à un segment passant par son exact milieu. C'est le lieu d'équidistance des deux extrémités du segment.",
    example: "Tout point situé sur la médiatrice de [AB] est à la même distance de A que de B."
  },
  {
    id: "moyenne",
    term: "Moyenne",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "La somme arithmétique globale d'une distribution de valeurs divisée par l'effectif numérique total pondéré d'observations effectives.",
    mathFormula: "\\bar{x} = \\frac{1}{n} \\sum_{i=1}^n x_i",
    example: "Si un élève obtient les notes de 10, 12 et 14 sur 20, sa note moyenne s'évalue à 12/20."
  },
  {
    id: "nombre_complexe",
    term: "Nombre Complexe",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Extension algébrique des nombres réels comprenant le nombre imaginaire i de sorte que son carré vaut -1. Représentable sur un plan complexe.",
    mathFormula: "z = a + i b \\quad (i^2 = -1)",
    example: "Le nombre complexe z = 3 + 4i possède une partie réelle de 3 et une partie imaginaire de 4."
  },
  {
    id: "norme",
    term: "Norme",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Longueur absolue associée à un vecteur représentée géométriquement ou valeur absolue d'un élément d'un espace vectoriel normé.",
    mathFormula: "\\|\\vec{u}\\| = \\sqrt{u_x^2 + u_y^2}",
    example: "Le vecteur vitesse d'un avion possède pour direction la trajectoire, et sa norme représente la vitesse en kilomètres par heure."
  },
  {
    id: "ordonnee",
    term: "Ordonnée",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Coordonnée d'axe vertical mesurant la hauteur d'un point dans un plan de repère classique cartésien. Généralement identifiée par la coordonnée y.",
    mathFormula: "M(x, y) \\implies y \\text{ est l'ordonnée}",
    example: "Dans le repère orthogonal traditionnel, le point d'origine central O possède pour ordonnée 0."
  },
  {
    id: "orthogonalite",
    term: "Orthogonalité",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Généralisation de la perpendicularité géométrique aux vecteurs et espaces généraux, indiquant un produit scalaire rigoureusement nul.",
    mathFormula: "\\vec{u} \\cdot \\vec{v} = 0 \\iff \\vec{u} \\perp \\vec{v}",
    example: "Les axes x et y d'un plan cartésien orthonormal sont dits orthogonaux entre eux."
  },
  {
    id: "perm_arrange",
    term: "Permutation",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Configuration ordonnée de tous les éléments d'un groupe fini consistant à modifier l'ordre respectif de tri de ces variables sans omission.",
    mathFormula: "P_n = n!",
    example: "Le nombre de possibilités permettant de classer 4 élèves côte à côte sur une photo est de 4! = 24 possibilités."
  },
  {
    id: "pgcd",
    term: "PGCD",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Plus Grand Commun Diviseur entre deux ou plusieurs entiers naturels non nuls. Si le PGCD de deux nombres vaut 1, on les qualifie de premiers entre eux.",
    mathFormula: "\\text{PGCD}(a, b) = d",
    example: "Le PGCD de 12 et 18 vaut 6, car c'est le plus grand entier divisant simultanément les deux."
  },
  {
    id: "point_inflexion",
    term: "Point d'inflexion",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Lieu angulaire sur la courbe représentative d'une fonction continue où celle-ci change d'axe de courbure, passant d'un profil convexe à concave.",
    mathFormula: "f''(x_0) = 0 \\text{ en s'annulant}",
    example: "La fonction cubique f(x) = x³ possède l'origine O(0,0) comme point d'inflexion caractéristique."
  },
  {
    id: "polynome",
    term: "Polynôme",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Expression algébrique constituée uniquement d'une suite cumulée de coefficients réels affectés à une unique variable à l'aide de puissances entières posées.",
    mathFormula: "P(X) = a_n X^n + a_{n-1} X^{n-1} + \\dots + a_1 X + a_0",
    example: "P(X) = 3X² - 5X + 2 est un polynôme réel du second degré avec coefficients réels."
  },
  {
    id: "primitive",
    term: "Primitive",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Fonction F dont la dérivée première coïncide de manière identique avec une fonction de base f donnée. C'est l'inverse conceptuel direct de l'opération de dérivation.",
    mathFormula: "F'(x) = f(x)",
    example: "Une primitive de la fonction f(x) = 2x est F(x) = x²."
  },
  {
    id: "proba_conditionnelle",
    term: "Probabilité Conditionnelle",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Évaluation de la probabilité qu'un événement B se produise sachant qu'un événement initial A s'est déjà produit de manière certaine.",
    mathFormula: "P_A(B) = \\frac{P(A \\cap B)}{P(A)}",
    example: "Si l'on sait qu'une carte tirée au hasard est un coeur, la probabilité d'avoir le roi est de 1/13."
  },
  {
    id: "probabilities_totale",
    term: "Probabilités Totales (Formule)",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Formule probabiliste de décomposition permettant de reconstituer la probabilité intégrale d'un événement au moyen d'une série de partitions disjointes de l'espace.",
    mathFormula: "P(B) = \\sum_{i=1}^n P(B \\cap A_i) = \\sum_{i=1}^n P(B \\mid A_i) \\cdot P(A_i)",
    example: "Calculer le taux global de réussite à un diplôme en additionnant les taux pondérés de réussite de chaque filière académique."
  },
  {
    id: "produit_scalaire",
    term: "Produit Scalaire",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Opération algébrique prenant deux vecteurs d'entrée et fournissant une valeur réelle, mesurant le degré d'alignement ou de perpendicularité des deux directions.",
    mathFormula: "\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\cdot \\|\\vec{v}\\| \\cdot \\cos(\\theta)",
    example: "Si l'un des deux vecteurs est nul ou perpendiculaire, leur produit scalaire vaut rigoureusement 0."
  },
  {
    id: "projecteur",
    term: "Projecteur",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Endomorphisme linéaire d'un espace vectoriel dont l'application itérée deux fois redonne exactement le même résultat, décrivant la projection plane sur ses axes.",
    mathFormula: "p \\circ p = p",
    example: "La projection orthogonale du plan réel 3D sur le plan horizontal (x, y) est un projecteur géométrique stable."
  },
  {
    id: "racine_carree",
    term: "Racine Carrée",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "L'unique nombre réel positif qui, multiplié par lui-même, produit précisément le nombre réel positif de référence de départ donné.",
    mathFormula: "\\sqrt{x} = y \\iff y^2 = x \\quad (y \\ge 0)",
    example: "La racine carrée de 16 s'évalue sous la forme d'un nombre entier simple égal à 4."
  },
  {
    id: "recurrence",
    term: "Récurrence",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Méthode logique de démonstration prouvant qu'une proposition de rang n est rigoureusement vraie pour n'importe quel entier, en vérifiant son initialisation puis son hérédité.",
    mathFormula: "P(n) \\implies P(n+1)",
    example: "Prouver la formule algébrique de la somme cumulée des premiers entiers se fait par récurrence, du maillon n au maillon n+1."
  },
  {
    id: "rolle",
    term: "Rolle (Théorème de)",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Cas particulier fondamental du Théorème des Accroissements Finis énonçant que si une fonction continue est dérivable sur [a, b] et possède des valeurs identiques aux bornes, alors il existe un point stationnaire de dérivée nulle.",
    mathFormula: "f(a) = f(b) \\implies \\exists c \\in ]a, b[ \\text{ t.q. } f'(c) = 0",
    example: "Si une fusée décolle d'une altitude fixe et y retombe plus tard, sa vitesse verticale s'est annulée au moins une fois à l'apogée."
  },
  {
    id: "serie_numerique",
    term: "Série Numérique",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Somme cumulée infinie ordonnée des termes d'une suite de nombres réels ou complexes. Elle peut être convergente ou divergente.",
    mathFormula: "S_N = \\sum_{n=0}^N u_n \\underset{N \\to \\infty}{\\longrightarrow} S",
    example: "La série géométrique de terme général (1/2)^n converge vers la somme exacte totale de 2."
  },
  {
    id: "sinus_cosinus",
    term: "Sinus",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Fonction trigonométrique donnant la coordonnée verticale d'un point sur le cercle unité ou le rapport du côté opposé sur l'hypoténuse dans un triangle rectangle.",
    mathFormula: "\\sin(\\theta) = \\frac{\\text{Côté Opposé}}{\\text{Hypoténuse}}",
    example: "Dans un triangle rectangle d'hypoténuse 10cm et d'angle 30°, le côté opposé mesure 10 * sin(30°) = 5cm."
  },
  {
    id: "supremum",
    term: "Suprémum (Borne Supérieure)",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Le plus petit des majorants réels d'une partie non vide ordonnée supérieurement de R. Si la borne appartient à l'ensemble, elle constitue son maximum.",
    mathFormula: "M = \\sup(A)",
    example: "La borne supérieure de l'intervalle ouvert [0, 1[ est égale à 1, bien que 1 n'appartienne pas à l'ensemble."
  },
  {
    id: "tangente",
    term: "Tangente",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Droite frôlant de façon rectiligne une courbe en un point d'abscisse précis, décrivant localement sa direction de progression instantanée.",
    mathFormula: "y = f'(a)(x - a) + f(a)",
    example: "Si l'on coupe la ficelle d'une fronde en mouvement tournant, la pierre s'échappe selon la droite tangente à la trajectoire circulaire."
  },
  {
    id: "taux_de_variation",
    term: "Taux de Variation",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Rapport mesurant l'évolution moyenne d'une fonction par unité de variable entre deux points disjoints. Sert de fondement à la détection de la dérivée.",
    mathFormula: "\\tau = \\frac{f(b) - f(a)}{b - a}",
    example: "Pour f(x) = x², le taux de variation sur l'intervalle [1; 3] vaut (9 - 1) / (3 - 1) = 8 / 2 = 4."
  },
  {
    id: "theoreme_bezout",
    term: "Bézout (Théorème de)",
    category: "algebra",
    categoryLabel: "Algèbre & Arithmétique",
    definition: "Théorème déterminant la condition nécessaire et suffisante de coprimarité géométrique de deux entiers naturels au moyen de l'existence de coefficients multiplicateurs entiers relatifs de combinaison.",
    mathFormula: "ax + by = \\text{PGCD}(a,b) \\iff \\text{Existence de } (x, y) \\in \\mathbb{Z}^2",
    example: "Comme 3 et 5 sont premiers entre eux, il existe des entiers x et y tels que 3x + 5y = 1. Ici : 3*2 + 5*(-1) = 1."
  },
  {
    id: "theoreme_gauss_maths",
    term: "Gauss (Élimination de)",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Méthode d'algèbre linéaire visant à échelonner une matrice ou résoudre des équations linéaires géantes par des combinaisons linéaires de lignes.",
    mathFormula: "L_i \\leftarrow L_i - \\lambda \\cdot L_j",
    example: "Indispensable pour calculer efficacement le rang de matrices ou programmer des solveurs automatiques de systèmes physiques."
  },
  {
    id: "tvi",
    term: "Théorème des Valeurs Intermédiaires",
    category: "analysis",
    categoryLabel: "Analyse & Fonctions",
    definition: "Théorème montrant que pour toute fonction continue sur un intervalle [a, b], chaque valeur intermédiaire située entre f(a) et f(b) est atteinte au moins une fois.",
    mathFormula: "\\forall u \\in [f(a), f(b)], \\exists c \\in [a, b] \\text{ t.q. } f(c) = u",
    example: "Prouve l'existence de racines d'une équation : si f(1) = -2 et f(2) = 3 et f est continue, alors f s'annule obligatoirement entre 1 et 2."
  },
  {
    id: "valeur_propre",
    term: "Valeur Propre",
    category: "superior",
    categoryLabel: "Supérieur & Experts",
    definition: "Nombre réel ou complexe associé à un endomorphisme linéaire ou une matrice carrée, tel qu'il existe un vecteur non nul dont l'image s'obtient par une simple multiplication scalaire.",
    mathFormula: "f(\\vec{v}) = \\lambda \\vec{v} \\quad (\\vec{v} \\neq \\vec{0})",
    example: "Les fréquences de vibration harmoniques d'un pont suspendu correspondent à des valeurs propres d'une équation physique complexe."
  },
  {
    id: "variance",
    term: "Variance",
    category: "proba_stats",
    categoryLabel: "Probabilités & Combinatoire",
    definition: "Mesure théorique de l'écart moyen quadratique des valeurs d'une variable aléatoire de manière regroupée autour de sa valeur moyenne espérée.",
    mathFormula: "V(X) = E(X^2) - [E(X)]^2",
    example: "Une variance faible indique que les événements d'intérêt se comportent de manière prévisible autour de la moyenne arithmétique."
  },
  {
    id: "vecteur",
    term: "Vecteur",
    category: "geometry",
    categoryLabel: "Géométrie & Repérage",
    definition: "Structure géométrique modélisant une translation linéaire, entièrement identifiée par un axe de direction, un sens d'orientation et une intensité nommée norme.",
    mathFormula: "\\overrightarrow{AB} = (x_B - x_A)\\vec{i} + (y_B - y_A)\\vec{j}",
    example: "Pour modéliser la force du vent s'exerçant sur la grand-voile d'un navire, les physiciens dessinent un vecteur force."
  }
];
