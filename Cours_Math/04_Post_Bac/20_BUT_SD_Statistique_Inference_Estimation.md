---
title: 'BUT SD : Statistique Inférentielle & Estimation'
level: Post_Bac
subLevel: BUT
order: 20
---
# BUT SD : Statistique Inférentielle & Estimation

**Niveau** : Post-Bac (BUT Science des Données / IUT, Licence Économétrie)  
**Prérequis** : Statistiques descriptives univariées, probabilités discrètes et continues de base.  
**Objectifs** :
- Distinguer une population complète inaccessible d'un échantillon d’évaluation extrait.
- Définir les qualités d'un bon estimateur ponctuel (biais nul, convergence de variance globale).
- Construire et interpréter un Intervalle de Confiance (IC) pour estimer une moyenne ou une proportion inconnue.

---

## Activités de découverte

### Activité : Le sondage électoral de sortie des urnes
Lors d'une élection majeure comptant $40\text{ millions}$ d'électeurs inscrits (la **population**), il est impossible d'interroger chaque citoyen pour connaître son vote en temps réel avant le dépouillement complet. Les instituts de sondage interrogent alors un groupe restreint de $1\text{ 000}$ personnes choisies de manière aléatoire (l'**échantillon**).

1. Pourquoi est-ce que le taux moyen d'intentions de vote observé dans l'échantillon fluctue d'un sondage à un autre ? C'est ce qu'on appelle la **fluctuation d'échantillonnage**.
2. Comment chiffrer scientifiquement la "marge d'erreur" de l'estimation pour annoncer avec confiance le score d'un candidat ?
3. Si le candidat obtient $50.5\%$ dans notre échantillon, est-il certain à 100% de remporter l'élection ?

Cette étude introduit le cœur battant de la **statistique inférentielle**. À partir des observations recueillies sur un petit échantillon délimité, on extrapole (on infère) des lois de probabilités générales étendues à toute la population avec un niveau de confiance rigoureux.

---

## Fondements Théoriques

### 1. Population, Échantillon et Variables Aléatoires

Soit une population d'étude sur laquelle on s'intéresse à un paramètre inconnu $\theta$ (par exemple, la moyenne réelle $\mu$ d'une taille).

#### L'Échantillon statistique :
On extrait un échantillon de taille $n$ représenté par $n$ variables aléatoires indépendantes et identiquement distribuées (i.i.d.) : $(X_1, X_2, \dots, X_n)$.

#### L'Estimateur ($T_n$) :
Un estimateur $T_n$ est une formule ou fonction numérique des variables de l'échantillon servant à estimer la valeur du vrai paramètre $\theta$ :
$$T_n = g(X_1, X_2, \dots, X_n)$$

Un estimateur est lui-même une variable aléatoire dotée de sa propre loi de probabilité !

---

## 🎨 Schéma Pédagogique Interactif : De la Population à l'Échantillon

L'illustration suivante modélise le processus d'inférence. Le cercle de gauche regroupe la population inaccessible présentant un paramètre masqué $\mu$. Le sous-groupe extrait forme l'échantillon d'évaluation grâce auquel on calcule l'estimateur moyenne $\bar{X}$ flanqué de sa marge d'erreur d'intervalle.

<div align="center">
<svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Le Processus de l'Inférence Statistique</text>
  
  <g transform="translate(10, 10)">
    <!-- Population (Grande boite) -->
    <rect x="20" y="55" width="160" height="150" fill="#4f46e5" fill-opacity="0.1" stroke="#4f46e5" stroke-width="2" rx="10"/>
    <text x="100" y="47" font-family="sans-serif" fill="#818cf8" font-size="12" font-weight="bold" text-anchor="middle">MATRICE POPULATION</text>
    <text x="100" y="140" font-family="sans-serif" fill="#ffffff" font-size="11" text-anchor="middle">Inconnue (θ, μ)</text>
    <!-- Grains de population -->
    <circle cx="50" cy="80" r="3" fill="#818cf8" opacity="0.6"/>
    <circle cx="150" cy="90" r="3" fill="#818cf8" opacity="0.4"/>
    <circle cx="70" cy="180" r="3" fill="#818cf8" opacity="0.5"/>
    <circle cx="120" cy="170" r="3" fill="#818cf8" opacity="0.7"/>
    
    <!-- Flèche intermédiaire d'échantillonnage -->
    <line x1="185" y1="130" x2="250" y2="130" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow_inf)"/>
    <text x="218" y="120" font-family="sans-serif" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">Sondage</text>
    
    <!-- Échantillon (Petite boite) -->
    <rect x="255" y="70" width="160" height="120" fill="#065f46" fill-opacity="0.15" stroke="#34d399" stroke-width="2" rx="10"/>
    <text x="335" y="62" font-family="sans-serif" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">ÉCHANTILLON (n)</text>
    <text x="335" y="125" font-family="sans-serif" fill="#ffffff" font-size="11" text-anchor="middle">Moyenne calculée X̄</text>
    <circle cx="280" cy="100" r="4" fill="#10b981"/>
    <circle cx="370" cy="115" r="4" fill="#10b981"/>
    <circle cx="310" cy="155" r="4" fill="#10b981"/>
    <circle cx="340" cy="150" r="4" fill="#10b981"/>
    
    <!-- Flèche de retour d'Inférence -->
    <path d="M 255,170 Q 212,205 180,185" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arrow_inf_back)"/>
    <text x="218" y="210" font-family="sans-serif" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Inférence</text>
  </g>
  
  <defs>
    <marker id="arrow_inf" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
    </marker>
    <marker id="arrow_inf_back" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e"/>
    </marker>
  </defs>
</svg>
</div>

---

### 2. Propriétés d'un Estimateur Optimal

Pour s'assurer qu'un estimateur $T_n$ est un outil fidèle de capture, on analyse ses qualités :

#### A. Le Biais (Bias) :
L'écart moyen entre la valeur d'évaluation et la valeur réelle cible.
$$\text{Biais}(T_n) = E(T_n) - \theta$$
*L'estimateur est dit **sans biais** si et seulement si $E(T_n) = \theta$.*

#### B. La Convergence (Var) :
Un estimateur est convergent si, à mesure que la taille d'échantillon $n$ tend vers l'infini, sa distribution s'écrase sur la cible $\theta$.
$$\lim_{n \to +\infty} \text{Var}(T_n) = 0$$

---

### 3. Les Intervalles de Confiance (IC)

L'estimation ponctuelle ne donne qu'une seule valeur, potentiellement fausse. L'Intervalle de Confiance fournit un intervalle de valeurs réelles qui a une probabilité définie $(1-\alpha)$ (généralement $95\%$) de contenir le paramètre d'évaluation.

#### Construction pour la Moyenne $\mu$ (Échantillon $n \ge 30$, $\sigma$ connu)
En appliquant le Théorème Central Limite (TCL), l'estimateur de moyenne d'échantillon $\bar{X}$ converge vers la loi normale $\mathcal{N}(\mu, \frac{\sigma^2}{n})$.

Dès lors, l'Intervalle de Confiance de niveau $\gamma = 1-\alpha$ pour la moyenne $\mu$ se formule ainsi :
$$\text{IC}_{1-\alpha}(\mu) = \left[ \bar{X} - z_{1-\frac{\alpha}{2}} \frac{\sigma}{\sqrt{n}} \, , \, \bar{X} + z_{1-\frac{\alpha}{2}} \frac{\sigma}{\sqrt{n}} \right]$$

- Pour un taux classique de confiance à $95\%$ ($\alpha = 5\%$) : $z_{0.975} = \mathbf{1.96}$.
- Pour un taux massif à $99\%$ ($\alpha = 1\%$) : $z_{0.995} = \mathbf{2.58}$.

---

## Exercices Résolus

### Exercice : Calcul de l'intervalle d'une moyenne de production
Un ingénieur d'IUT contrôle une chaîne automatisée de d'embouteillage de parfum. Il souhaite estimer le volume moyen réel $\mu$ injecté par flacon. 
Il prélève au hasard un échantillon représentatif de $n = 100$ flacons. Les mesures établissent une moyenne d'échantillon de $\bar{x} = 50.2\text{ mL}$. Par expérience industrielle historique, on sait que l'écart-type de cette machine est de $\sigma = 0.5\text{ mL}$.
1. Construire l'Intervalle de Confiance à $95\%$ pour le volume moyen réel de liquide injecté.
2. Déduire le volume minimal de taille d'échantillon $n$ à analyser pour réduire de moitié la marge d'erreur à $95\%$ obtenue.

**Correction Étape par Étape :**
1. **Étape 1 : Vérification des hypothèses**  
   Comme nous mesurons un échantillon de taille $n = 100 \ge 30$, nous pouvons appliquer de manière robuste l'approximation normale du Théorème Central Limite, même si nous ignorons la distribution initiale exacte de la machine.

2. **Étape 2 : Évaluation des bornes de l'intervalle à 95%**  
   Le coefficient critique à 95% est $z_{1-\alpha/2} = 1.96$.  
   La demi-largeur de l'intervalle (la marge d'erreur $E$) vaut :
   $$E = 1.96 \times \frac{\sigma}{\sqrt{n}} = 1.96 \times \frac{0.5}{\sqrt{100}} = 1.96 \times \frac{0.5}{10} = 1.96 \times 0.05 = \mathbf{0.098\text{ mL}}$$
   L'Intervalle de Confiance s'écrit donc :
   $$\text{IC}_{95\%}(\mu) = [50.2 - 0.098 \quad ; \quad 50.2 + 0.098] = \mathbf{[50.102\text{ mL} \quad ; \quad 50.298\text{ mL}]}$$
   *Interprétation : Nous avons 95% de chances de certitude que le volume de ciblage réel de la ligne automatique soit compris entre 50.10 mL et 50.30 mL.*

3. **Étape 3 : Calcul de la taille d'échantillon pour réduire la marge d'erreur par deux**  
   On souhaite obtenir une nouvelle marge d'erreur $E' = E / 2 = 0.049\text{ mL}$.  
   La formule de marge s'inverse :
   $$E' = 1.96 \frac{\sigma}{\sqrt{n'}} \implies \sqrt{n'} = 1.96 \frac{\sigma}{E'}$$
   $$n' = \left( 1.96 \frac{\sigma}{E'} \right)^2 = \left( 1.96 \frac{0.5}{0.049} \right)^2 = (20)^2 = \mathbf{400}$$
   Conclusion : **Pour diviser la marge d'incertitude par 2, on doit multiplier par 4 la taille de notre échantillon d'évaluation.**

---

## FAQ Étudiante

<details>
  <summary>Pourquoi l'estimateur classique de la variance divise-t-il par (n - 1) au lieu de n ?</summary>

  C’est une superbe subtilité ! Diviser la somme des carrés des écarts par $n$, c'est-à-dire faire la simple moyenne naïve, donne un estimateur qui sous-estime la vraie variance de la population. Il présente un biais d'écart. En calculant l'espérance, on démontre que $E(S^2_{\text{naïf}}) = \frac{n-1}{n}\sigma^2$. Pour éliminer ce biais, Heaviside a ajusté le ratio en divisant par $(n-1)$, d'où l'expression de l'**estimateur sans biais de la variance** :  
  $$S^2 = \frac{1}{n-1}\sum_{i=1}^{n} (X_i - \bar{X})^2$$
</details>

<details>
  <summary>Comment analyser un Intervalle de Confiance à 95% sans faire d'erreur d'interprétation philosophique ?</summary>

  La valeur du paramètre réel inconnu $\mu$ est une **constante immuable physique**, tandis que les bornes de l'Intervalle de Confiance calculées sont des **variables aléatoires** dépendant de l'échantillon prélevé. Dire "Il y a 95% de chance que la constante soit dans l'intervalle" est techniquement flou. La formulation probabiliste correcte est : "Si on répète 100 fois l'expérience de prélèvement de taille $n$, environ 95 de ses intervalles calculés contiendront effectivement le vrai paramètre."
</details>

<details>
  <summary>Qu'arrive-t-il si la taille de l'échantillon est inférieure à 30 ?</summary>

  En cas de petits échantillons ($n < 30$), on ne peut plus invoquer commodément l'approximation solide du TCL. Si de plus l'écart-type $\sigma$ est inconnu, on est contraints d'émettre l'hypothèse d'une population initiale gaussienne et d'utiliser la distribution de la **loi de Student (t)** plutôt que la loi normale standard.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Un estimateur ponctuel T est qualifié de sans biais si et seulement si :**
- [ ] Sa variance tend vers zéro à l'infini
- [ ] Son image cumulée est périodique régulière
- [x] L'espérance mathématique E(T) équivaut exactement à la valeur réelle inconnue θ
> **Explication :** C’est la définition réglementaire. L'espérance de l'estimateur doit se centrer de façon imperturbable sur la valeur réelle pour que l'estimation ne souffre d'aucun déséquilibre systématique.

**Question 2 : Qu'arrive-t-il à la largeur d'un Intervalle de Confiance si l'on augmente le niveau de confiance souhaité de 95% à 99% ?**
- [ ] La largeur de l'intervalle diminue pour être plus précise
- [x] La largeur de l'intervalle s'élargit pour augmenter la certitude de capture
- [ ] La largeur de l'intervalle reste rigoureusement la même
> **Explication :** Être plus sûr (99% au lieu de 95%) requiert de ratisser une frange de coordonnées géométriques plus large, ce qui écarte les bornes latérales au prix d'une diminution de la précision ponctuelle.

**Question 3 : La fluctuation d'un échantillon s'atténue de façon visible si :**
- [ ] On multiplie le bruit statistique ambiant de la chaîne
- [x] On augmente le nombre de sujets n de l'échantillon d'analyse
- [ ] On divise le nombre total de variables par deux
> **Explication :** La variance de l'estimateur de moyenne d'échantillon s'exprime par $\frac{\sigma^2}{n}$. Plus $n$ est élevé, plus la dispersion s'effondre vers zéro, ce qui stabilise les variations.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Distinguer de manière théorique et pratique les variables physiques de population des estimateurs d'échantillon.
- [ ] Démonter et justifier le biais d'un estimateur ponctuel de moyenne ou de variance.
- [ ] Calculer un Intervalle de Confiance de type moyenne au niveau standard de 95% d'après le TCL.
- [ ] Dimensionner la taille requise $n$ d'un échantillon de sondage face à une marge d'erreur cible imposée.
