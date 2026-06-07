---
title: 'Algèbre L1/L2 : Arithmétique Supérieure & Cryptographie'
level: Post_Bac
subLevel: Algebre_L1_L2
order: 1
---
# Algèbre L1/L2 : Arithmétique Supérieure & Cryptographie

**Niveau** : Post-Bac (Licence 1, Portail MIASHS, CPGE MPSI)  
**Prérequis** : Division euclidienne fondamentale, notions d'entiers relatifs ($\mathbb{Z}$).  
**Objectifs** :
- Maîtriser le théorème de Bézout et le théorème de Gauss dans $\mathbb{Z}$.
- Résoudre des congruences linéaires et des systèmes de congruences (Théorème des Restes Chinois).
- Comprendre la modélisation mathématique du système de chiffrement asymétrique RSA.

---

## Activités de découverte

### Activités : Le Chiffrement RSA ou l'art d'utiliser les nombres premiers
Imaginez que vous deviez envoyer un message crypté à un ami à travers un réseau public sans vous être préalablement mis d'accord sur une clé secrète. C'est le défi de la cryptographie à clé publique. En 1977, Rivest, Shamir et Adleman (RSA) ont résolu ce problème grâce à un concept fondamental d'arithmétique : la difficulté pratique de factoriser le produit de deux très grands nombres premiers.

1. **La clé publique** : On choisit deux nombres premiers géants $p$ et $q$, et on calcule leur produit $n = p \times q$. On calcule aussi l'indicateur d'Euler $\varphi(n) = (p-1)(q-1)$. On choisit alors un entier $e$ premier avec $\varphi(n)$. Le couple $(n, e)$ est publié au monde entier.
2. **La clé privée** : On calcule l'inverse mathématique de $e$ modulo $\varphi(n)$, noté $d$ (tel que $e \cdot d \equiv 1 \pmod{\varphi(n)}$). Ce $d$ reste ultra-secret.
3. **Le chiffrement** : Pour crypter un message $M$ (un entier inférieur à $n$), on calcule simplement $C \equiv M^e \pmod n$.
4. **Le déchiffrement** : Le destinataire retrouve le message d'origine grâce à une formule magique : $M \equiv C^d \pmod n$.

---

## Fondements Théoriques

### 1. Théorème de Bézout et Algorithme d'Euclide Étendu

#### Théorème de Bézout :
Deux entiers relatifs $a$ et $b$ sont premiers entre eux si et seulement s'il existe un couple d'entiers $(u, v) \in \mathbb{Z}^2$ tel que :
$$ae + bv = 1$$

De manière plus générale, pour tous entiers $a$ et $b$, il existe $u, v \in \mathbb{Z}$ tels que $au + bv = \text{pgcd}(a, b)$. Les coefficients $u$ et $v$ s'appellent les **coefficients de Bézout** et se calculent de manière algorithmique par l'**Algorithme d'Euclide Étendu**.

```
Algorithme d'Euclide Étendu pour pgcd(a, b):
    Entrées : a, b deux entiers positifs
    Sortie : g = pgcd(a, b) et les coefficients u, v tels que au + bv = g
    --------------------------------------------------------------
    Si a = 0 alors retourner (b, 0, 1)
    (g, u1, v1) = EuclideEtendu(b mod a, a)
    u = v1 - (b // a) * u1
    v = u1
    Retourner (g, u, v)
```

### 2. Théorème de Gauss et Conséquences

#### Théorème de Gauss :
Soient $a, b, c \in \mathbb{Z}$.
$$\text{Si } a \text{ divise } bc \text{ et si } \text{pgcd}(a, b) = 1, \text{ alors } a \text{ divise } c.$$

#### Propriété essentielle des nombres premiers :
Si $p$ est un nombre premier et $p$ divise un produit $ab$, alors $p$ divise $a$ ou $p$ divise $b$.

### 3. Petit Théorème de Fermat

Soit $p$ un nombre premier et $a$ un entier non divisible par $p$. Alors :
$$a^{p-1} \equiv 1 \pmod p$$

Pour tout entier $a \in \mathbb{Z}$, on a également la forme générale :
$$a^p \equiv a \pmod p$$

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Comment trouve-t-on l'inverse de e modulo φ(n) de manière efficace ?</summary>

  On utilise l'Algorithme d'Euclide Étendu ! On cherche à résoudre $e \cdot d + \varphi(n) \cdot k = 1$. L'algorithme nous renvoie les coefficients de Bézout $d$ et $k$. Si la valeur de $d$ retournée est négative, on lui ajoute simplement $\varphi(n)$ pour obtenir un inverse positif unique compris entre $1$ et $\varphi(n)-1$.
</details>

<details>
  <summary>Qu'est-ce que le Théorème des Restes Chinois (CRT) ?</summary>

  C’est un résultat d'algèbre qui affirme que si l'on a plusieurs congruences de la forme $x \equiv a_i \pmod{m_i}$ avec des modules $m_i$ deux à deux premiers entre eux, alors il existe une solution unique de $x$ modulo le produit $M = \prod m_i$. Ce résultat est très utilisé pour accélérer les calculs dans le déchiffrement RSA.
</details>

---

## 📝 Mini-Quiz

**Question 1 : Soient $a = 15$ et $b = 28$. Sont-ils premiers entre eux, et si oui, quel couple $(u, v)$ satisfait l'égalité de Bézout $15u + 28v = 1$ ?**
- [ ] Non, ils ne sont pas premiers entre eux car 15 est impair.
- [x] Oui, et le couple $u = 15, v = -8$ convient car $15(15) + 28(-8) = 225 - 224 = 1$.
- [ ] Oui, mais le couple $u = 2, v = -1$ est la seule solution possible.
> **Explication :** En décomposant en facteurs premiers, $15 = 3 \times 5$ et $28 = 2^2 \times 7$. Ils n'ont aucun facteur commun, donc $\text{pgcd}(15, 28) = 1$. Par simple calcul : $15 \times 15 = 225$ et $28 \times (-8) = -224$, ce qui donne bien $225 - 224 = 1$.

**Question 2 : D'après le Petit Théorème de Fermat, quelle est la valeur de la congruence $3^{16} \pmod{17}$ ?**
- [x] 1
- [ ] 3
- [ ] 16
> **Explication :** Puisque $17$ est un nombre premier et $3$ n'est pas divisible par $17$, le Petit Théorème de Fermat s'applique directement : $a^{p-1} \equiv 1 \pmod p$ d'où $3^{16} \equiv 1 \pmod{17}$.

**Question 3 : Dans l’algorithme RSA, pourquoi le message original $M$ doit-il être strictement inférieur au produit $n = p \times q$ ?**
- [x] Pour garantir l'unicité du déchiffrement car les opérations s'effectuent modulo n
- [ ] Pour accélérer la vitesse de calcul de l'exponentiation rapide
- [ ] Parce que les nombres complexes n'ont pas de modulo défini
> **Explication :** Les calculs de chiffrement et déchiffrement se faisant modulo $n$, toute valeur de $M \ge n$ serait réduite à $M \pmod n$. On perdrait alors l'information d'origine lors du déchiffrement, rendant le système inopérant.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Calculer le PGCD de deux entiers par l'algorithme d'Euclide et trouver les coefficients de Bézout associés.
- [ ] Appliquer le théorème de Gauss pour résoudre des équations diophantiennes de type $ax + by = c$.
- [ ] Utiliser les puissances moduaires et le Petit Théorème de Fermat pour simplifier des calculs arithmétiques complexes.
- [ ] Expliquer précisément l'enchaînement des étapes mathématiques nécessaires pour générer des clés, chiffrer et déchiffrer en RSA.
