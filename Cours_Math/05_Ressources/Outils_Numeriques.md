---
title: 'Outils Numériques'
level: Ressources
subLevel: Communes
order: 3
---
# Outils Numériques et Programmation

Aujourd’hui, les mathématiques ne se font plus exclusivement sur papier. L'informatique et les algorithmes sont intégrés dans les programmes dès le collège (Scratch), puis développés dans l'enseignement secondaire (Python), jusqu'à devenir des outils de modélisation colossaux en environnement post-bac.

## 1. Scratch (Collège)
Scratch est un langage de programmation "visuel" basé sur des blocs qui s'emboîtent, développé par le M.I.T.
Il a été inventé pour enseigner la pensée algorithmique sans se soucier des mots-clés syntaxiques ou des points-virgules oubliés.

**Concepts fondamentaux :**
- **Les Boucles :** Les blocs `[Répéter 10 fois]` ou `[Répéter indéfiniment]` (couleur Orange) qui permettent de faire des figures géométriques itératives ou des chronomètres.
- **Les Conditions :** Les blocs `[Si ... Alors]` permettent de prendre des décisions selon la valeur d'une variable.
- **Les Variables / Blocs :** Créer une étiquette pour stocker le score du joueur, ou le résultat d'un théorème.

**Exemple Classique (Tracer un carré sur Scratch) :**
> - *Quand Drapau Vert cliqué*
> - *Effacer tout*
> - *Stylo en position d'écriture*
> - *Répéter 4 fois* :
>   - *Avancer de 100 pas*
>   - *Tourner de 90 degrés à droite*

## 2. Python (Lycée et Post-Bac)
Python est un vrai langage de programmation professionnel. Il est l'outil suprême en data-science, apprentissage profond (I.A) et modélisation météo.

**Aide-Mémoire de syntaxe Math-Python :**
1. **Carré / Puissance** : On n'utilise pas `^`, on utilise `**`. (Exemple: `x**2` vaut $x$ au carré).
2. **Boucle Pour (Itérations précises)** :
```python
# Affiche les chiffres 0, 1, 2, 3, 4
for i in range(5):
    print(i)
```
3. **Boucle Tant Que (Recherche d'un plafond ou seuil critique)** :
```python
# Multiplie le nombre par 2 tant qu'il ne dépasse pas 100
U = 1
while (U <= 100):
   U = U * 2
```
4. **Définir une fonction mathématique $f(x)$ :**
```python
def f(x):
    return x**2 + 3*x - 5
```

## 3. GeoGebra & Tracés (Collège/Lycée)
GeoGebra est l'application la plus populaire, permettant d'associer Algèbre et Géométrie (d'où son nom).
- La section **Graphing** permet de tracer des courbes, des asymptotes et points d'intersection. Merveilleux pour visualiser les tableaux de variations.
- La section **Geometry 2D/3D** permet de créer des pyramides, cubes, plans et vecteurs, afin de valider à l'écran les chapitres de terminale (Espace et Vecteurs normaux).
- La ligne de saisie en bas peut tout résoudre en lui demandant simplement de taper : `Dérivée(x^3 - 2x + 1)` et il l'affiche instantanément.

## 4. Les Calculatrices Graphiques (TI-83 / Casio Graph35)
Interdites ou permises au Bac (si mode "Examen" enclenché), elles ont des fonctions salvatrices :
- Le module `Stats / Tab` permet de trouver rapidement les paramètres d'une population : Moyennes ($\bar{x}$), Écart-types ($\sigma x$) et Médiane (Med).
- La fonction `Distrib` gère la "Loi Binomiale" (`BinomFdp` et `BinomFrép`) et Lois Normales, ce qui remplace la construction complexe des arbres pondérés géants !

## 5. LaTeX (Supérieur)
Quand tu dépasseras le Baccalauréat pour faire de la recherche ou des Master, tu feras la connaissance de **LaTeX** (se prononce Lah-Teck). Ce n'est pas un calcul ! C'est le langage utilisé dans le monde entier par les scientifiques pour **écrire** les mathématiques sur écran sans ratures !
*Exemple :* Pour écrire $\frac{\sqrt{x}}{2\pi}$, tu tapes `\frac{\sqrt{x}}{2\pi}`. C'est d'ailleurs ce que nous utilisons sous le capot de ce site interactif !
