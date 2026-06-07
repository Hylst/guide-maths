---
title: 'CPGE ECG : Suites Réelles & Séries Appliquées à l''Économie'
level: Post_Bac
subLevel: CPGE_ECG
order: 19
---
# CPGE ECG : Suites Réelles & Séries Appliquées à l'Économie

**Niveau** : Post-Bac (CPGE ECG Mathématiques Approfondies / Appliquées, Écoles de commerce)  
**Prérequis** : Suites numériques arithmétiques et géométriques usuelles.  
**Objectifs** :
- Maîtriser le calcul de limites de suites de croissance arithmético-géométrique.
- Calculer des sommes de séries géométriques (actualisation financière).
- Appliquer ces concepts à la modélisation de placements à intérêts composés et d'annuités perpétuelles.

---

## Activités de découverte

### Activité : La rente perpétuelle d'une fondation d'élite
Une grande fondation souhaite léguer une bourse de doctorat annuelle d'une valeur immuable de $30\text{ 000 }€$ d'années en années, et ce pour l'éternité absolue. Pour financer ce don infini, le président de la fondation doit placer aujourd'hui un capital initial unique $C_0$ sur un compte bancaire rémunéré au taux annuel constant de $i = 3\%$.

Puisque les bourses d'études sont versées de manière récurrente à la fin de chaque période, le montant des subventions futures ne doit pas puiser dans le capital lui-même, mais uniquement s'auto-financer par les intérêts cumulés.
1. Quel montant de capital doit être placé aujourd'hui pour financer la bourse de l'année 1 ? Le capital requis actualisé est de $30\text{ 000} / (1 + 0.03)$.
2. Pour l'année 2 ? Le capital requis actualisé est de $30\text{ 000} / (1 + 0.03)^2$.
3. Quel capital global cumulé $C_0$ doit être sécurisé à l'origine pour financer toutes les bourses à l'infini ?

Ce paradoxe financier d'un montant global fini de capital requis pour distribuer une infinité de bourses futures s'exprime mathématiquement par la sommation d'une **série géométrique d'actualisation** !

---

## Fondements Théoriques

### 1. Actualisation et Capitalisation Financière

En économie, la valeur temporelle de l'argent stipule qu'un euro d'aujourd'hui vaut plus qu'un euro de demain en raison du taux d'intérêt $i > 0$.

#### La Capitalisation :
Placer une somme $S$ aujourd'hui produit après $n$ années, au taux d'intérêt composé annuel $i$, un capital final $K_n$ valant :
$$K_n = S \times (1 + i)^n$$

#### L'Actualisation (Le Voyage Inverse) :
La valeur actuelle aujourd'hui (notée $V_0$) d'une somme future $F_n$ promise dans $n$ années s'actualise ainsi :
$$V_0 = \frac{F_n}{(1 + i)^n} = F_n \times (1 + i)^{-n}$$

---

## 🎨 Schéma Pédagogique Interactif : Croissance par Annuités

Cette modélisation visuelle (barres de croissance par rapport à la courbe exponentielle) représente l'actualisation financière de capitaux cumulés à intérêts composés de $i = 4\%$ au cours de 5 périodes consécutives d'années.

<div align="center">
<svg width="450" height="285" viewBox="0 0 450 285" xmlns="http://www.w3.org/2000/svg" style="background:#1e1e2f; border-radius:12px; border: 2px solid #5b21b6;">
  <text x="225" y="30" font-family="sans-serif" font-weight="bold" fill="#a78bfa" font-size="16" text-anchor="middle">Modèle d'Actualisation Financière (C_n)</text>
  
  <g transform="translate(60, 220)">
    <!-- Axe y -->
    <line x1="0" y1="0" x2="0" y2="-150" stroke="#4b5563" stroke-width="2"/>
    <text x="-45" y="-140" font-family="sans-serif" fill="#9ca3af" font-size="11">Capital (€)</text>
    
    <!-- Axe x -->
    <line x1="0" y1="0" x2="330" y2="0" stroke="#4b5563" stroke-width="2"/>
    <text x="310" y="18" font-family="sans-serif" fill="#9ca3af" font-size="11">Années (n)</text>
    
    <!-- Évolution des barres d'annuités -->
    <!-- Année 0 : 50 -->
    <rect x="20" y="-50" width="25" height="50" fill="#4f46e5" stroke="#818cf8" stroke-width="1.5"/>
    <text x="32" y="15" font-family="sans-serif" fill="#ffffff" font-size="10" text-anchor="middle">0</text>
    
    <!-- Année 1 : 65 -->
    <rect x="80" y="-65" width="25" height="65" fill="#4f46e5" stroke="#818cf8" stroke-width="1.5">
      <animate attributeName="height" values="0;65" dur="2s" fill="freeze"/>
      <animate attributeName="y" values="0;-65" dur="2s" fill="freeze"/>
    </rect>
    <text x="92" y="15" font-family="sans-serif" fill="#ffffff" font-size="10" text-anchor="middle">1</text>
    
    <!-- Année 2 : 85 -->
    <rect x="140" y="-85" width="25" height="85" fill="#4f46e5" stroke="#818cf8" stroke-width="1.5">
      <animate attributeName="height" values="0;85" dur="2s" fill="freeze"/>
      <animate attributeName="y" values="0;-85" dur="2s" fill="freeze"/>
    </rect>
    <text x="152" y="15" font-family="sans-serif" fill="#ffffff" font-size="10" text-anchor="middle">2</text>
    
    <!-- Année 3 : 110 -->
    <rect x="200" y="-110" width="25" height="110" fill="#4f46e5" stroke="#818cf8" stroke-width="1.5">
      <animate attributeName="height" values="0;110" dur="2s" fill="freeze"/>
      <animate attributeName="y" values="0;-110" dur="2s" fill="freeze"/>
    </rect>
    <text x="212" y="15" font-family="sans-serif" fill="#ffffff" font-size="10" text-anchor="middle">3</text>
    
    <!-- Année 4 : 143 -->
    <rect x="260" y="-143" width="25" height="143" fill="#4f46e5" stroke="#818cf8" stroke-width="1.5">
      <animate attributeName="height" values="0;143" dur="2s" fill="freeze"/>
      <animate attributeName="y" values="0;-143" dur="2s" fill="freeze"/>
    </rect>
    <text x="272" y="15" font-family="sans-serif" fill="#ffffff" font-size="10" text-anchor="middle">4</text>
    
    <!-- Courbe exponentielle superposée -->
    <path d="M 32,-50 Q 152,-85 272,-143" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
  </g>
</svg>
</div>

---

### 2. Séries Géométriques et Sommation Infinie

Une série géométrique est la somme infinie de termes d'une suite géométrique.

#### Théorème de Somme Finie :
Pour un réel $q \neq 1$ :
$$\sum_{k=0}^{n} q^k = 1 + q + q^2 + \dots + q^n = \frac{1 - q^{n+1}}{1 - q}$$

#### Convergence de la Série Infinie (Rente Perpétuelle) :
Si la raison $|q| < 1$, la série infinie converge parfaitement vers une valeur limite finie stable :
$$\lim_{n \to +\infty} \sum_{k=0}^{n} q^k = \sum_{k=0}^{+\infty} q^k = \frac{1}{1 - q}$$

---

### 3. Application : Formule de la Rente Perpétuelle

Afin de financer de manière infinie un versement d'annuités constants de valeur $A$ versés à la fin de chaque année, le capital actuel unique requis $C_0$ au taux d'actualisation constant $i > 0$ correspond à la somme actualisée de tous les flux de trésorerie futurs :
$$C_0 = \sum_{k=1}^{+\infty} \frac{A}{(1 + i)^k} = \frac{A}{1 + i} \sum_{k=0}^{+\infty} \left(\frac{1}{1 + i}\right)^k$$

En appliquant la formule de la série infinie avec la raison $q = \frac{1}{1 + i} < 1$ :
$$C_0 = \frac{A}{1 + i} \times \frac{1}{1 - \frac{1}{1 + i}} = \frac{A}{1 + i} \times \frac{1 + i}{i} = \frac{A}{i}$$

Cette équation fondamentale s'appelle la **Formule d'évaluation de perpétuité** :
$$C_0 = \frac{A}{i}$$

---

## Exercices Résolus

### Exercice : Amortissement d'un prêt corporate par annuités constantes
Une société technologique contracte un financement global de $V_0 = 100\text{ 000 }€$ auprès d'une banque d'investissement. L'accord fixe un taux d'intérêt annuel constant de $i = 5\%$.
Le repaiement s'effectue sur 4 ans sous forme de versements annuels d'une annuité constante récurrente notée $A$ payable en fin d'exercice.
1. Démontrer la formule générale donnant la valeur de l'annuité constante $A$ requise.
2. Évaluer numériquement la valeur de l'annuité d'amortissement $A$.

**Correction Étape par Étape :**
1. **Étape 1 : Formiatisation mathématique du problème**  
   Le capital prêté aujourd'hui $V_0$ doit être rigoureusement égal à la valeur actualisée de tous les paiements d'amortissement $A$ qui seront versés au long des 4 années de contrat :
   $$V_0 = \sum_{k=1}^{4} \frac{A}{(1 + i)^k} = A \sum_{k=1}^{4} (1 + i)^{-k}$$

2. **Étape 2 : Sommation de la progression géométrique de raison $q = (1 + i)^{-1}$**  
   $$V_0 = A \times \frac{1}{1+i} \left[ \frac{1 - (1+i)^{-4}}{1 - (1+i)^{-1}} \right] = A \times \left[ \frac{1 - (1+i)^{-4}}{i} \right]$$
   On isole donc l'annuité constante de versement contractuel $A$ :
   $$A = V_0 \times \frac{i}{1 - (1+i)^{-4}}$$

3. **Étape 3 : Application numérique**  
   Remplaçons avec $V_0 = 100\text{ 000}$ et $i = 0.05$ :
   $$A = 100\text{ 000} \times \frac{0.05}{1 - (1.05)^{-4}}$$
   Or, $(1.05)^{-4} \approx 0.8227$.  
   D'où :
   $$A \approx 100\text{ 000} \times \frac{0.05}{0.1773} \approx \mathbf{28\text{ 201.18 }€\text{ par an}}$$
   La société paiera donc quatre annuités de $28\text{ 201.18 }€$ pour rembourser intégralement les $100\text{ 000 }€$ empruntés ainsi que les intérêts contractuels cumulés.

---

## FAQ Étudiante

<details>
  <summary>Qu'entend-on par valeur d'option ou VAN (Valeur Actuelle Nette) d'un projet industriel ?</summary>

  La **VAN** est l'indicateur d'aide à la décision par excellence des directeurs financiers. Il caractérise la profitabilité d'un investissement. Elle s'évalue en faisant la somme de tous les flux de trésorerie futurs d'exploitation actualisés (qui forment une série numérique), à laquelle on soustrait le coût initial d'investissement du projet :  
  $$\text{VAN} = \sum_{t=1}^{n} \frac{\text{CashFlow}_t}{(1 + i)^t} - \text{CoupInitial}$$
  Le projet est retenu comme créateur de valeur uniquement si la VAN est strictement positive ($\text{VAN} > 0$).
</details>

<details>
  <summary>Comment analyser la limite de convergence d'une suite de croissance arithmético-géométrique x(n+1) = a x(n) + b ?</summary>

  C’est une suite de transition courante !  
  1. On cherche d'abord la valeur stationnaire de stabilité en résolvant l'équation d'équilibre statique: $L = a L + b \implies L = \frac{b}{1-a}$.  
  2. On étudie ensuite la suite auxiliaire d'écart : $v_n = x_n - L$.  
  3. Par construction algébrique, $v_n$ est strictement une suite géométrique de raison $a$.  
  4. Si et seulement si $|a| < 1$, alors la suite $v_n$ converge vers $0$, prouvant que la suite $x_n$ converge proprement vers $L$ à l'infini.
</details>

<details>
  <summary>Qu'est-ce que le taux de rendement interne (TRI) ?</summary>

  Le **TRI** est le taux d'actualisation mathématique d'équilibre $i$ pour lequel la VAN du projet s'annule de manière exacte. C'est l'un des points singuliers les plus recherchés, car il représente la rentabilité intrinsèque brute d'un projet sous forme de pourcentage d'intérêts.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Si un particulier place 10 000 € au taux d'intérêts composés annuel de i = 2% pendant 3 ans, la somme finale obtenue vaut :**
- [ ] 10 600.00 €
- [x] 10 612.08 €
- [ ] 12 000.00 €
> **Explication :** La formule de capitalisation composée s'applique directement : $K_3 = 10\text{ 000} \times (1.02)^3 \approx 10\text{ 000} \times 1.061208 = 10\text{ 612.08 }€$.

**Question 2 : Au taux d'actualisation de i = 5%, quelle somme aujourd'hui correspond à recevoir une rente annuelle perpétuelle infinie de 1 000 € par an ?**
- [ ] 5 000 €
- [ ] 10 000 €
- [x] 20 000 €
> **Explication :** La formule des perpétuités converge vers $C_0 = \frac{A}{i}$. Ici $C_0 = \frac{1\text{ 000}}{0.05} = 20\text{ 000 }€$.

**Question 3 : La sommation d'une série géométrique de raison positive q converge vers une limite finie ssi :**
- [ ] La raison q est arbitrairement grande
- [x] La raison q est strictement inférieure à 1
- [ ] La valeur de q est paire et négative
> **Explication :** Si $q \ge 1$, les termes accumulés grandissent de plus en plus (ou restent stationnaires à l'unité), l'intégramme explose vers l'infini. Seul le cas $|q| < 1$ garantit l'affaiblissement rapide des valeurs vers la convergence finie.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Calculer des limites et étudier la convergence de suites réelles arithmético-géométriques.
- [ ] Mener des opérations de capitalisation et d'actualisation financière de valeurs de trésorerie temporelles.
- [ ] Démontrer et évaluer les limites de sommes infinies de séries géométriques d'actualisation.
- [ ] Dimensionner des annuités constantes associées à l'amortissement d'un prêt de crédit bancaire.
```
