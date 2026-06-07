---
title: 'BTS CG : Suites Numériques & Gestion Financière'
level: Post_Bac
subLevel: BTS_CG
order: 1
---
# BTS CG : Suites Numériques & Gestion Financière

**Niveau** : Post-Bac (BTS Comptabilité et Gestion, BTS MCO)  
**Prérequis** : Pourcentages simples, suites arithmétiques et géométriques de niveau Lycée (Première/Terminale).  
**Objectifs** :
- Modéliser une évolution comptable linéaire ou exponentielle par des suites numériques réelles.
- Calculer la capitalisation et l'actualisation à court et à long terme d'un placement financier.
- Exprimer la somme des termes de suites géométriques pour évaluer la valeur de versements réguliers (annuités).
- Résoudre des scénarios d'épargne ou de placement par résolution d'un tableau financier synthétique.

---

## Activités de découverte

### Activités : Choisir entre acheter ou louer un équipement informatique par crédit-bail
Une jeune entreprise de comptabilité a besoin d'acheter de nouveaux serveurs réseau de stockage professionnels. Le coût initial d'installation de ces machines est de $30\ 000\ €$.
Deux alternatives financières se présentent :

1. **Option 1 : Achat avec autofinancement direct** : L'entreprise paie l'intégralité des $30\ 000\ €$ aujourd'hui. Elle sait que ce matériel perd de sa valeur comptable à un taux d'amortissement annuel constant de $20\ \%$ par an (il s'agit d'une **suite géométrique** décroissante).
2. **Option 2 : Formule flexible de Crédit-Bail** : L'entreprise loue le matériel informatique. Elle verse un loyer initial de $8\ 000\ €$ à l'ouverture, puis un loyer périodique récurrent constant de $6\ 000\ €$ chaque fin d'année pendant 4 ans.

Comment comparer rigoureusement ces deux options au taux d'actualisation de référence de la banque de $4\ \%$ ?
Vous devez pour cela exprimer le coût global actualisé de chaque loyer annuel récurrent, ce qui revient à calculer la somme des premiers termes d'une **suite géométrique d'actualisation**. Faisons parler les chiffres pour trouver l'option optimale pour la trésorerie !

---

## Fondements Théoriques

### 1. Suites Arithmétiques (Moindres amortissements linéaires)

Une suite $(u_n)$ est **arithmétique** de premier terme $u_0$ et de raison $r \in \mathbb{R}$ si l'on passe d'un terme au suivant en lui additionnant la même valeur constante :
$$u_{n+1} = u_n + r$$

#### Formule explicite :
$$u_n = u_0 + n \times r$$

#### Exemple d'application :
Modélisation de l'amortissement linéaire comptable d'une machine. La dépréciation annuelle d'un véhicule acheté $25\ 000\ €$ avec une dépréciation constante de $3\ 000\ €$ par an s'écrit de la façon suivante :
$$v_n = 25\ 000 - 3\ 000 \times n$$

### 2. Suites Géométriques (Calculs de Placements)

Une suite $(v_n)$ est **géométrique** de premier terme $v_0$ et de raison $q \in \mathbb{R}$ si l'on passe d'un niveau au suivant en le multipliant par un coefficient constant :
$$v_{n+1} = v_n \times q$$

#### Formule explicite :
$$v_n = v_0 \times q^n$$

#### Somme partielle de termes consécutifs :
Pour $q \neq 1$ :
$$S_n = v_0 + v_1 + \dots + v_{n-1} = v_0 \cdot \frac{1 - q^n}{1 - q}$$

#### Exemple en capitalisation :
Si l'on place $1\ 000\ €$ sur un compte à un taux annuel d'intérêts de $2.5\ \%$, la raison est $q = 1 + r = 1.025$. Les valeurs annuelles successives forment une suite géométrique :
$$v_n = 1000 \times (1.025)^n$$

### 3. Calculs des Annuités Constantes de Placement (Épargne)

Si un épargnant verse chaque fin d'année un montant constant $a$ (annuité) sur un livret d'épargne rémunéré au taux annuel composé $i$, le capital total accumulé juste après le $n$-ème versement s'écrit :
$$V_n = a + a(1+i) + a(1+i)^2 + \dots + a(1+i)^{n-1}$$
En utilisant la somme de la suite géométrique de raison $q = 1 + i$ :
$$V_n = a \cdot \frac{(1+i)^n - 1}{i}$$

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi est-ce que le taux annuel composé et l'amortissement linéaire s'opposent en modélisation ?</summary>

  L'**amortissement linéaire** se caractérise par une baisse de valeur constante d'année en année (raison mathématique de soustraction arithmétique de type $-3\ 000$). C'est un modèle linéaire représenté par une droite.  
  En revanche, l'**amortissement dégressif** en comptabilité fiscale ou les placements d’épargne se basent sur un pourcentage constant de diminution ou d'augmentation (multiplicateur géométrique de type $\times 0.82$). C’est une courbe exponentielle du bilan comptable.
</details>

<details>
  <summary>Qu'est-ce que la capitalisation d'intérêts dite 'à intérêts simples' en BTS ?</summary>

  Les intérêts simples s'appliquent pour les placements de court terme (inférieurs à un an). Les intérêts de la période ne sont pas réinjectés et sont calculés uniquement sur le capital unitaire initial ($I = C_0 \times r \times t$). À l'inverse, pour le long terme, on passe universellement aux intérêts composés car la loi exige la réincorporation des gains dans l'assiette de calcul.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si un épargnant dépose chaque mois une somme de $100\ €$ sur un livret classique dépourvu d'intérêts pendant 3 ans. Quelle suite modélise le montant total de son livret ?**
- [x] Une suite arithmétique de premier terme $u_1 = 100$ et de raison $r = 100$
- [ ] Une suite géométrique de raison $q = 1.05$
- [ ] Une suite aléatoire conditionnelle
> **Explication :** Chaque mois supplémentaire rajoute une somme fixe de $100\ €$ de réserve d'argent. Il s'agit d'une addition récurrente du même terme constant. C'est la définition exacte d'une suite arithmétique de pas (raison) $r = 100$.

**Question 2 : Un placement bancaire de capital initial $V_0 = 10\ 000\ €$ est placé au taux annuel composé de $2\ \%$. Quel est le montant disponible après 5 ans d'intérêts accumulés ?**
- [ ] $11\ 000.00\ €$
- [x] $11\ 040.81\ €$ car l'expression est $10000 \times 1.02^5$
- [ ] $12\ 189.94\ €$
> **Explication :** En utilisant la formule de valeur acquise par les suites géométriques : $V_5 = V_0 \times (1 + i)^5 = 10000 \times (1.02)^5 \approx 10\ 000 \times 1.1040808 = 11\ 040.81\ €$.

**Question 3 : Pour rembourser un petit investissement d’artisan, la suite géométrique d'actualisation est utile car elle prouve que :**
- [ ] L'argent futur vaut structurellement plus cher que l'argent présent
- [x] Une promesse de recevoir de l'argent demain a moins de valeur économique que de l'avoir à disposition aujourd'hui
- [ ] Le taux d'intérêt d'emprunt est périodique uniquement s'il est imaginaire pur
> **Explication :** L'actualisation diminue la valeur faciale de flux monétaires futurs en divisant par $(1+i)^n$. Cela traduit l'axiome fondamental de finance qu'une somme future de devise présente un risque d'opportunité d'usage manqué par rapport à un numéraire disponible instantanément.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Modéliser le taux de croissance linéaire du chiffre d'affaires à l'aide d'une suite arithmétique.
- [ ] Calculer rapidement la valeur acquise d'un capital placé sur un compte à intérêts composés.
- [ ] Déduire la somme totale accumulée de plans d’épargne réguliers en utilisant la somme géométrique.
- [ ] Réaliser des calculs de capitalisation d'amortissement dégressif d'un actif fixe du bilan annuel d'entreprise.
