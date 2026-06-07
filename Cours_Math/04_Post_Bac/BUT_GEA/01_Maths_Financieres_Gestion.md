---
title: 'BUT GEA : Mathématiques Financières & Évaluation de Projets'
level: Post_Bac
subLevel: BUT_GEA
order: 1
---
# BUT GEA : Mathématiques Financières & Évaluation de Projets

**Niveau** : Post-Bac (BUT GEA 1ère et 2ème année, Écoles de Commerce L1)  
**Prérequis** : Suites géométriques, équations exponentielles élémentaires, bases du calcul de pourcentage.  
**Objectifs** :
- Maîtriser les calculs de capitalisation (valeur acquise) et d'actualisation (valeur actuelle) à intérêts composés.
- Évaluer des flux financiers périodiques (annuités constantes, annuités en croissance).
- Analyser la rentabilité d'un investissement via la Valeur Actuelle Nette (VAN) et le Taux de Rentabilité Interne (TRI).
- Dresser et décrypter un tableau d'amortissement d'emprunt indivis.

---

## Activités de découverte

### Activités : Choisir entre deux options de paiement ou le concept de la valeur temps de l'argent
Une entreprise vous propose aujourd'hui un contrat. Elle vous donne le choix entre deux modes de rémunération :
- **Option A** : Vous recevez immédiatement $10\ 000\ €$.
- **Option B** : Vous recevez $11\ 000\ €$ dans exactement 2 ans.

Lequel de ces deux choix est le plus avantageux financièrement ? La réponse immédiate "Option B car $11\ 000 > 10\ 000$" est fausse, car elle ignore **la valeur temps de l'argent** ! En effet, si vous prenez l'Option A ($10\ 000\ €$) et que vous placez cette somme à un taux d'intérêt annuel composé de $5\ \%$, combien possèderez-vous dans 2 ans ?
- Au bout d'un an : $10\ 000 \times (1 + 0.05) = 10\ 500\ €$.
- Au bout de deux ans : $10\ 500 \times (1 + 0.05) = 10\ 000 \times 1.05^2 = 11\ 025\ €$.

Puisque $11\ 025\ €$ est supérieur aux $11\ 000\ €$ promis par l'Option B, c'est l'Option A (recevoir l'argent aujourd'hui) qui est la plus intéressante ! L'actualisation est l'opération réciproque qui permet de ramener des valeurs futures à une date présente de référence.

---

## Fondements Théoriques

### 1. Intérêts Composés : Capitalisation et Actualisation

À intérêts composés, les intérêts de chaque période sont rajoutés au capital pour produire eux-mêmes des intérêts à la période suivante.

#### Formule de Capitalisation (Valeur Acquise $C_n$) :
Soit $C_0$ le capital initial, $i$ le taux d'intérêt périodique (annuel, mensuel, etc.) et $n$ le nombre de périodes placées.
$$C_n = C_0 (1 + i)^n$$

#### Formule d'Actualisation (Valeur Actuelle $C_0$) :
Pour ramener une somme future $C_n$ reçue dans $n$ périodes à sa valeur d'aujourd'hui au taux d'actualisation $t$ (exprimant le coût d'opportunité du capital) :
$$C_0 = C_n (1 + t)^{-n} = \frac{C_n}{(1 + t)^n}$$

### 2. Évaluation de Projets d'Investissement : VAN et TRI

Pour évaluer si un projet d'investissement industriel ou commercial est créateur de valeur pour l'organisation, on modélise l'ensemble des flux financiers prévisionnels : une dépense initiale d'investissement $I_0$ à l'instant $0$, suivie de flux nets de trésorerie (Cash-flows) $CF_1, CF_2, \dots, CF_n$ générés à la fin de chaque année pendant $n$ ans.

#### La Valeur Actuelle Nette (VAN) :
Au taux d'actualisation exigé $t$ par les actionnaires :
$$\text{VAN} = -I_0 + \sum_{k=1}^n \frac{CF_k}{(1 + t)^k}$$
- **Si VAN > 0** : Le projet est rentable. L'investissement couvre le capital initial, rémunère les apporteurs de fonds au taux $t$ et crée un surplus monétaire net égal à la VAN.
- **Si VAN < 0** : Le projet doit être rejeté.

#### Le Taux de Rentabilité Interne (TRI) :
Le TRI correspond au taux d'actualisation pour lequel la VAN s'annule exactement :
$$\text{VAN} = 0 \iff \sum_{k=1}^n \frac{CF_k}{(1 + \text{TRI})^k} = I_0$$
On le résout de manière approchée par interpolation linéaire ou via des solveurs numériques.

### 3. Amortissement d'Emprunt à Annuités Constantes

Dans le cas d'un prêt remboursé par annuités constantes $a$, l'annuité payée à chaque fin de période comprend d'une part les intérêts sur le capital restant dû, et d'autre part l'amortissement (le remboursement effectif d'une partie de la dette).

#### Calcul de l'Annuité Constante $a$ :
Pour rembourser un emprunt de capital initial $V_0$ au taux périodique $i$ en $n$ échéances :
$$a = V_0 \cdot \frac{i}{1 - (1 + i)^{-n}}$$

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Quelle est la différence entre un taux d'intérêt nominal et un taux équivalent ?</summary>

  Le taux nominal (p.ex. $12\%$ par an) sert souvent de base légale, mais si la capitalisation est mensuelle, le taux appliqué chaque mois n'est pas simplement $12\% / 12 = 1\%$. En intérêts composés, le **taux mensuel équivalent** $i_m$ à un taux annuel $i_a$ est celui qui produit la même valeur au bout d'un an, soit :  
  $(1 + i_m)^{12} = 1 + i_a \iff i_m = (1 + i_a)^{1/12} - 1$.  
  Il est toujours légèrement inférieur au taux proportionnel simple.
</details>

<details>
  <summary>Comment lit-on un tableau d'amortissement d'emprunt ?</summary>

  Chaque ligne du tableau (période $k$) contient :  
  1. Le capital restant dû en début de période.  
  2. L'intérêt périodique : capital restant dû $\times$ taux d'intérêt.  
  3. L'annuité globale payée $a$.  
  4. L'amortissement de la période : $Amortissement = Annuité - Intérêt$.  
  5. Le capital restant dû en fin de période : $Capital\ début - Amortissement$.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Vous placez un capital de $5\ 000\ €$ à intérêts composés pendant 4 ans au taux d’intérêt annuel de $3\ \%$. Quelle somme obtiendrez-vous à la fin ?**
- [ ] $5\ 600.00\ €$ (selon la formule d'intérêts simples)
- [x] $5\ 627.54\ €$ car la formule est $5000 \times 1.03^4$
- [ ] $6\ 243.10\ €$
> **Explication :** En appliquant la formule des intérêts composés, la valeur acquise est $C_4 = C_0 (1 + i)^4 = 5000 \times (1.03)^4 \approx 5000 \times 1.1255088 = 5\ 627.54\ €$.

**Question 2 : Un projet d'investissement de $100\ 000\ €$ rapporte d'ici un an un unique gain de $108\ 000\ €$. Quel est son Taux de Rentabilité Interne (TRI) ?**
- [ ] $108\ \%$
- [x] $8\ \%$
- [ ] $-8\ \%$
> **Explication :** Le TRI résout l'équation de la VAN nulle : $\text{VAN} = 0 \iff -100\ 000 + \frac{108\ 000}{1 + TRI} = 0 \iff 1 + TRI = 1.08 \iff TRI = 8\%$.

**Question 3 : Dans une formule de remboursement d'emprunt à annuités constantes, que se passe-t-il au fil du temps (de l'échéance 1 à l'échéance finale) ?**
- [ ] La part des intérêts augmente et l'amortissement diminue
- [x] La part des intérêts diminue et l'amortissement augmente
- [ ] Les intérêts et l'amortissement restent stables à parts égales
> **Explication :** Comme l'emprunteur rembourse progressivement le capital initial, le capital restant dû diminue chaque période. Les intérêts calculés sur ce capital restant dû diminuent donc également. Pour conserver une annuité totale constante, l'amortissement (différence entre l'annuité constante et l'intérêt) augmente réciproquement période après période.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Distinguer et calculer les taux proportionnels et les taux équivalents périodiques.
- [ ] Calculer des valeurs actuelles et acquises pour une suite finie de flux monétaires.
- [ ] Dresser entièrement un tableau d'amortissement d'emprunt à annuités constantes.
- [ ] Déterminer la VAN d'un projet pour arbitrer entre plusieurs options d'investissement d'entreprise.
