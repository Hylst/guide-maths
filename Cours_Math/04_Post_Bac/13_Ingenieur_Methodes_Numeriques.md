---
title: 'Écoles d''Ingénieurs : Méthodes Numériques & Algorithmique'
level: Post_Bac
subLevel: Prep_Ingenieur
order: 13
---
# Écoles d'Ingénieurs : Méthodes Numériques & Algorithmique

**Niveau** : Post-Bac (Écoles d'ingénieurs post-bac type INSA, UTC, PeiP, CP-GE intégrées)  
**Prérequis** : Dérivation de fonctions analytiques, développement limité du premier ordre.  
**Objectifs** :
- Comprendre les fondements de l'approximation de solutions d'équations non linéaires par la méthode de Newton-Raphson.
- Concevoir et implémenter des algorithmes de résolution numérique fiables et analyser leur vitesse de convergence.
- Programmer ces algorithmes en Python ou Matlab pour résoudre des cas physiques (calcul de trajectoires, flux thermiques).

---

## Activités de découverte

### Activité : Le chercheur de zéro
Imaginez que vous deviez concevoir le contrôleur embarqué d'une fusée. Pour calibrer l'injecteur de carburant, vous devez résoudre l'équation complexe suivante :
$$f(x) = \cos(x) - x e^x = 0$$

Cette équation n'admet aucune résolution algébrique exacte ("formule fermée") avec nos fonctions analytiques ordinaires. Vous êtes bloqué !

En tant qu'ingénieur, vous devez trouver une parade : l'approximation numérique.
1. Nous traçons la fonction grossièrement et voyons une intersection proche de $x_0 = 0.5$.
2. Au lieu de tâtonner au hasard (méthode laborieuse de dichotomie), nous dessinons la **tangente** à la courbe au point $x_0$.
3. L'intersection de cette tangente linéaire avec l'axe horizontal nous donne un nouveau point, $x_1$, qui s'avère infiniment plus proche de la vraie solution !

C'est l'essence même de la **méthode de Newton-Raphson**, l'un des algorithmes d'optimisation les plus robustes et les plus utilisés de l'ingénierie moderne.

---

## Fondements Théoriques

### 1. La Méthode de Newton-Raphson

On cherche à approcher la racine d'une fonction continue et deux fois dérivable, c'est-à-dire le point $r$ tel que $f(r) = 0$.

Soit $x_n$ une approximation actuelle de la racine. La tangente à la courbe $y = f(x)$ au point d'abscisse $x_n$ a pour équation :
$$y = f'(x_n)(x - x_n) + f(x_n)$$

Le point d'intersection de cette droite tangente avec l'axe des abscisses ($y=0$) donne la valeur suivante $x_{n+1}$ :
$$0 = f'(x_n)(x_{n+1} - x_n) + f(x_n) \implies f'(x_n)(x_{n+1} - x_n) = -f(x_n)$$

D'où la célèbre formule de récurrence de Newton :
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} \quad \text{pour tout} \quad f'(x_n) \neq 0$$

---

### 2. Analyse de Convergence

La force extraordinaire de la méthode de Newton réside dans sa vitesse. Si la fonction $f$ vérifie des conditions de régularité convenables autour de sa racine simple $r$, la méthode possède une **convergence d'ordre 2** (quadratique) :
$$|x_{n+1} - r| \le C \cdot |x_n - r|^2$$

En termes pratiques : à chaque étape de l'algorithme, **le nombre de décimales exactes de l'approximation double approximativement !** (Exemple : 2 décimales correctes, puis 4, puis 8, puis 16).

C'est une convergence infiniment plus véloce que le découpage par moitié (dichotomie), dont la convergence est purement linéaire.

---

## Implémentation Algorithmique en Python

Voici le script Python standard écrit et validé dans les laboratoires de simulation des écoles d'ingénieurs :

```python
import math

def newton_raphson(f, df, x0, tol=1e-10, max_iter=100):
    """
    Résolution de f(x) = 0 par la méthode de Newton-Raphson.
    f : fonction analytique
    df : fonction dérivée de f
    x0 : estimation initiale
    tol : tolérance d'erreur (critère d'arrêt)
    """
    x = x0
    for i in range(max_iter):
        fx = f(x)
        dfx = df(x)
        
        if abs(dfx) < 1e-15:
            raise ValueError("Dérivée trop proche de zéro, arrêt de l'algorithme.")
            
        x_next = x - fx / dfx
        print(f"Itération {i+1} : x = {x_next:.11f}, Erreur = {abs(x_next - x):.2e}")
        
        if abs(x_next - x) < tol:
            return x_next # Solution convergeant vers la tolérance demandée
            
        x = x_next
        
    raise RuntimeError("L'algorithme n'a pas convergé dans les limites allouées.")

# Exemple d'application : Résoudre x^2 - 2 = 0 (Calcul de racine de 2)
solution = newton_raphson(lambda x: x**2 - 2, lambda x: 2*x, 1.5)
```

---

## Foire Aux Questions (FAQ) Étudiante

<details>
  <summary>Pourquoi est-ce que mon code Newton plante ou diverge complètement sur certaines fonctions ?</summary>

  La méthode de Newton est très agressive mais locale. Si vous lancez votre recherche initiale $x_0$ trop loin de la vraie solution, la tangente peut vous projeter à l'infini ou vous enfermer dans des cycles d'oscillations périodiques stables (un "piège de résonance"). De plus, s'il y a un point d'inflexion horizontal ($f'(x) \approx 0$) à proximité, la tangente est presque horizontale et vous éjecte des limites de définition. Un ingénieur astucieux commence par tracer graphiquement sa fonction d'abord pour calibrer finement $x_0$.
</details>

<details>
  <summary>Qu'est-ce que la méthode de la Sécante en programmation ?</summary>

  C’est la variante « économique » de Newton. Dans beaucoup de systèmes d'ingénierie industriels réels, calculer de manière analytique et exacte la dérivée $f'(x)$ à chaque microseconde est trop lourd ou impossible car la fonction est issue de capteurs physiques indirects. La méthode de la Sécante remplace la dérivée analytique par une approximation linéaire locale : $f'(x_n) \approx \frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$. La convergence est légèrement moins rapide (ordre d'or $\approx 1.618$), mais elle ne requiert aucun calcul de dérivée.
</details>

---

## 📝 Mini-Quiz

**Question 1 : On souhaite calculer la racine carrée de 5 par Newton, c'est-à-dire résoudre $f(x) = x^2 - 5 = 0$. Quelle est l'équation récurrente exacte ?**
- [x] $x_{n+1} = \frac{x_n}{2} + \frac{5}{2x_n}$
- [ ] $x_{n+1} = x_n - \frac{x_n^2 - 5}{2}$
- [ ] $x_{n+1} = \sqrt{5x_n}$
> **Explication :** Remplaçons $f(x) = x^2 - 5$ et $f'(x) = 2x$ dans la formule : $x_{n+1} = x_n - \frac{x_n^2 - 5}{2x_n} = \frac{2x_n^2 - x_n^2 + 5}{2x_n} = \frac{x_n^2 + 5}{2x_n} = \frac{x_n}{2} + \frac{5}{2x_n}$. C'est la célèbre **méthode d'Héron d'Alexandrie**, utilisée depuis l'Antiquité pour extraire des racines carrées !

**Question 2 : Qu'entend-on par une convergence « quadratique » d'un algorithme numérique ?**
- [ ] Son tracé d'erreur forme une parabole exacte
- [x] L'erreur à l'étape $n+1$ est proportionnelle au carré de l'erreur précédente
- [ ] Il faut au minimum 4 itérations récurrentes pour approcher la tolérance
> **Explication :** La convergence quadratique (ordre 2) se définit par l'erreur : $E_{n+1} \le C \cdot E_n^2$. Cela se traduit par le fait que le nombre de décimales exactes double globalement à chaque boucle.

**Question 3 : Quelle précaution d'ingénieur est décisive pour éviter une boucle de récurrence infinie dévastatrice ?**
- [ ] Déclarer une variable de type complexe pour x
- [x] Fixer une limite maximale impérative d'itérations récurrentes (max_iter)
- [ ] Multiplier la dérivée f' par zéro
> **Explication :** En informatique de simulation ou sur microcontrôleur embarqué, si une fonction n'admet aucune racine de convergence réelle, l'algorithme tournerait sans s'arrêter. Programmer une sauvegarde absolue de fin de circuit par `max_iter` est un standard de sûreté logicielle.

---

## ✅ Checklist des Essentiels (Validation)
- [ ] Construire l'expression analytique de Newton-Raphson pour tout type de fonction dérivable univariée.
- [ ] Justifier et mener l'analyse théorique de la vitesse quadratique de convergence.
- [ ] Écrire l'algorithme complet avec critères d'arrêt de tolérance spatiale et protection contre les boucles infinies.
- [ ] Interpréter graphiquement la méthode et identifier les cas d'échec (points d'inflexion, dérivée nulle).
