import { Course } from "../types";

// Normalization function to strip accents and lowercase strings
export const normalizeString = (str: string): string =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// Helper to generate dynamic tags/keywords for a course based on its metadata and title
export const getCourseKeywords = (course: Course): string[] => {
  const keys: string[] = [];
  const titleNorm = normalizeString(course.title);
  const idNorm = normalizeString(course.id);
  const levelStr = course.level as string;
  const levelNorm = normalizeString(levelStr);
  const subLevelNorm = course.subLevel ? normalizeString(course.subLevel) : "";

  // Add basic metadata
  keys.push(titleNorm, idNorm, levelNorm, subLevelNorm);

  // School levels french nomenclature and aliases
  if (levelStr === "College") {
    keys.push("clg", "brevet", "college", "moyen", "troisieme", "quatrieme", "cinquieme", "sixieme");
  }
  if (levelStr === "Lycee") {
    keys.push("lycee", "lyceen", "bac", "seconde", "premiere", "terminale");
  }
  if (levelStr === "Post_Bac" || idNorm.includes("sup_") || idNorm.includes("post_bac")) {
    keys.push("postbac", "post-bac", "superieur", "universite", "fac", "licence", "prepa", "cpge", "ing", "ingenieur", "bts", "but", "iut");
  }
  if (levelStr === "Maternelle") {
    keys.push("maternelle", "ps", "ms", "gs", "petite section", "moyenne section", "grande section", "petit", "jeux", "enfant");
  }
  if (levelStr === "Primaire") {
    keys.push("primaire", "ecole", "cp", "ce1", "ce2", "cm1", "cm2", "elementaire", "moyen");
  }

  if (course.subLevel) {
    const sl = course.subLevel.toLowerCase();
    if (sl === "3eme") keys.push("troisieme", "brevet", "3e");
    if (sl === "4eme") keys.push("quatrieme", "4e");
    if (sl === "5eme") keys.push("cinquieme", "5e");
    if (sl === "6eme") keys.push("sixieme", "6e");
    if (sl === "2nde" || sl === "seconde") keys.push("2nde", "seconde", "2nd");
    if (sl === "1ere" || sl === "premiere") keys.push("1ere", "premiere", "1re");
    if (sl === "term" || sl === "terminale") keys.push("term", "terminale", "bac", "tles");
  }

  // Mathematical domain synonyms and related keywords
  if (titleNorm.includes("thales") || idNorm.includes("thales")) {
    keys.push("geometrie", "triangle", "rapport", "proportionnalite", "homothetie", "configuration", "calcul", "longueur");
  }
  if (titleNorm.includes("pythagore") || idNorm.includes("pythagore")) {
    keys.push("geometrie", "triangle", "rectangle", "hypotenuse", "carre", "calcul", "longueur", "demonstration", "triangulaire");
  }
  if (titleNorm.includes("trigo") || idNorm.includes("trigo")) {
    keys.push("cosinus", "sinus", "tangente", "angle", "triangle rectangle", "cahsohtoa", "geometrie", "cercle trigonometrique", "mesure");
  }
  if (titleNorm.includes("fonct") || idNorm.includes("fonct")) {
    keys.push("fonction", "image", "antecedent", "courbe", "representation", "graphe", "variable", "tableau de variation", "graphes", "ordonnee", "abscisse");
  }
  if (titleNorm.includes("arithm") || idNorm.includes("arithm") || titleNorm.includes("nombre premier") || titleNorm.includes("divis")) {
    keys.push("diviseur", "multiple", "pgcd", "ppcm", "premiers", "facteurs", "division euclidienne", "reste", "congruence", "quotient", "decimaux", "decimal");
  }
  if (titleNorm.includes("proba") || idNorm.includes("proba") || titleNorm.includes("stochastique")) {
    keys.push("probabilites", "chance", "tirage", "arbre", "loi", "hasard", "esperance", "variance", "continu", "densite", "binominale", "bernoulli");
  }
  if (titleNorm.includes("stat") || idNorm.includes("stat") || titleNorm.includes("estim") || titleNorm.includes("echantillon")) {
    keys.push("moyenne", "mediane", "effectif", "frequence", "quartile", "variance", "ecart-type", "dispersion", "echantillonnage", "estimation", "intervalle", "confiance");
  }
  if (titleNorm.includes("fraction") || idNorm.includes("fraction")) {
    keys.push("proportion", "division", "simplification", "numerateur", "denominateur", "calcul", "partage", "rationnel");
  }
  if (titleNorm.includes("deriv") || idNorm.includes("deriv")) {
    keys.push("derivation", "derivee", "tangente", "calcul", "limite", "variation", "extremum", "pente", "taux d'accroissement", "differenciation");
  }
  if (titleNorm.includes("integr") || idNorm.includes("integr")) {
    keys.push("aire", "primitive", "somme", "integrale", "lebesgue", "gauss", "calcul d'aire", "riemann");
  }
  if (titleNorm.includes("suite") || idNorm.includes("suite")) {
    keys.push("arithmetique", "geometrique", "recurrence", "limite", "convergence", "somme", "terme", "placement", "finance");
  }
  if (titleNorm.includes("vecteur") || idNorm.includes("vecteur") || titleNorm.includes("espace vectoriel")) {
    keys.push("geometrie", "translation", "direction", "sens", "norme", "coordonnees", "colinealite", "chasles", "base", "famille libre", "dimension");
  }
  if (titleNorm.includes("calcul litteral") || titleNorm.includes("equat") || idNorm.includes("litteral") || titleNorm.includes("systeme")) {
    keys.push("algebre", "inconnue", "developper", "factoriser", "identite remarquable", "resolution", "premier degre", "second degre");
  }
  if (titleNorm.includes("complexe") || idNorm.includes("complexe")) {
    keys.push("imaginaire", "i", "module", "argument", "forme algebrique", "forme trigonometrique", "plan complexe", "conjugue");
  }
  if (titleNorm.includes("matrice") || idNorm.includes("matrice")) {
    keys.push("systeme lineaire", "produit matriciel", "determinant", "inverse", "dimension", "vecteur propre", "valeur propre", "diagonalisation");
  }
  if (titleNorm.includes("gradient") || idNorm.includes("gradient") || titleNorm.includes("deep learning") || titleNorm.includes("optim")) {
    keys.push("ia", "intelligence artificielle", "optimisation", "algorithme", "reseau de neurones", "retropropagation", "biais", "poids", "pente", "hessienne", "descente");
  }
  if (titleNorm.includes("laplace") || idNorm.includes("laplace")) {
    keys.push("transformee", "frequentiel", "signal", "physique", "transfert", "filtre", "rlc", "convergence", "stabilite");
  }
  if (titleNorm.includes("fourier") || idNorm.includes("fourier")) {
    keys.push("frequentiel", "harmonique", "signal", "fourier", "onde", "periodique", "serie", "dsp", "spectre");
  }
  if (titleNorm.includes("simplexe") || idNorm.includes("simplexe")) {
    keys.push("recherche operationnelle", "optimisation lineaire", "contrainte", "pivot", "dantzig", "programmation lineaire");
  }
  if (titleNorm.includes("solow") || idNorm.includes("solow")) {
    keys.push("economie", "croissance", "capital", "travail", "amortissement", "rendements decroissants");
  }
  if (titleNorm.includes("epidemi") || idNorm.includes("epidemi") || titleNorm.includes("lotka") || idNorm.includes("michaelis")) {
    keys.push("biologie", "bio", "modele", "equation differentielle", "sir", "proie", "predateur", "enzyme", "catalyse", "vitesse");
  }
  if (titleNorm.includes("geometrie") || idNorm.includes("geometrie") || titleNorm.includes("espace") || titleNorm.includes("solide") || titleNorm.includes("volume")) {
    keys.push("volume", "aire", "solide", "cube", "pyramide", "sphere", "cylindre", "cone", "representation", "perspective", "forme", "platonicien");
  }

  return keys;
};
