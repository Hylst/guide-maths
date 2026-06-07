import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import GramSchmidt from '../../components/interactive/GramSchmidt';

const Course_Post_Bac_05_Espaces_Euclidiens: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-EUCLID"
        title="Espaces Euclidiens"
        subtitle="Produit scalaire généralisé, orthogonalité et projections. La géométrie absolue."
        duration="1h 20"
      />

      <Section title="⚠️ Introduction : Mesurer et Viser" icon="📐" color="emerald">
        <p>
          En algèbre linéaire classique, on sait que l'espace vectoriel possède des vecteurs, mais on n'a <strong>aucune notion de distance ni d'angle</strong>. C'est un monde mou.
        </p>
        <p className="mt-2 mb-4">
          L'Espace Euclidien, c'est l'algèbre linéaire à laquelle on ajoute une arme surpuissante : <strong>Le Produit Scalaire</strong>. Dès lors, on peut mesurer des distances, trouver des vecteurs orthogonaux, et faire des projections comme une ombre sur un mur.
        </p>

        <InfoBlock type="funfact" title="Le saviez-vous ? (Les Espaces de Hilbert)">
          Si l'on étend la définition des espaces euclidiens (produit scalaire, norme, orthogonalité) à des dimensions <strong>infinies</strong> tout en s'assurant que l'espace est complet (que toutes les suites de Cauchy convergent), on obtient un <strong>Espace de Hilbert</strong>. Ces espaces, introduits par David Hilbert, forment le langage mathématique absolu de la mécanique quantique, où les états physiques d'une particule sont représentés comme des vecteurs d'amplitude de probabilité dans un espace de Hilbert de dimension infinie !
        </InfoBlock>
      </Section>

      <Section title="⚖️ Le Produit Scalaire Bilinéaire" icon="⚖️" color="indigo">
        <p className="mb-4">
          Un produit scalaire, noté &lt;x, y&gt; ou (x | y), est une 'fonction' magique qui prend deux vecteurs en entrée, et recrache un nombre Réel avec 3 propriétés obligatoires :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="1. Symétrique & Bilinéaire" 
            math={"\\langle x, y \\rangle = \\langle y, x \\rangle \\\\ \\text{Respecte l'addition/multiplication}"} 
          />
          <FormulaBox 
            title="2. Défini Positif" 
            math={"\\langle x, x \\rangle \\ge 0 \\\\ \\langle x, x \\rangle = 0 \\iff x = 0"} 
          />
        </div>
        <div className="my-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>La Norme :</strong> À la seconde où on possède un produit scalaire valide, on vient de créer une notion de Longueur ou de Distance ! La "Norme" du vecteur x, notée ||x|| se définit par la formule : <strong>||x|| = √(&lt;x, x&gt;)</strong>.
        </div>

        <InfoBlock type="reminder" title="Rappel : Inégalité Triangulaire">
          Pour tout produit scalaire et sa norme associée, nous avons l'Inégalité Triangulaire : {"$||x + y|| \\le ||x|| + ||y||$"} (le plus court chemin entre deux points est la ligne droite). Le carré de la somme se développe via le produit scalaire : {"$||x+y||^2 = ||x||^2 + 2\\langle x, y\\rangle + ||y||^2$"}.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Produit scalaire de fonctions"
          question={<p>Dans l'espace des fonctions continues sur ["<MathComponent math={"-1, 1"} />"], on définit le produit scalaire <><MathComponent math={"\\langle f, g\\rangle = \\int_{-1}^{1} f(t)g(t) dt"} /></>. Soit <><MathComponent math={"f(t) = t"} /></> et <><MathComponent math={"g(t) = t^2"} /></>. Les fonctions <><MathComponent math={"f"} /></> et <><MathComponent math={"g"} /></> sont-elles orthogonales ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Le calcul</p>
              <p>On doit calculer <><MathComponent math={"\\int_{-1}^{1} t \\times t^2 dt"} /></>, c'est-à-dire <><MathComponent math={"\\int_{-1}^{1} t^3 dt"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Parité</p>
              <p>Il ne s'agit que de l'intégrale d'une fonction impaire (<><MathComponent math={"t^3"} /></>) sur un intervalle symétrique par rapport à 0.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : L'intégrale vaut 0. Donc OUI, les fonctions <><MathComponent math={"f(t)=t"} /></> et <><MathComponent math={"g(t)=t^2"} /></> sont orthogonales selon ce produit scalaire.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Inégalité de Cauchy-Schwarz"
          question={<p>En utilisant l'inégalité de Cauchy-Schwarz, trouver le maximum de <><MathComponent math={"3x + 4y"} /></> sachant que <><MathComponent math={"x^2 + y^2 = 1"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Trouver les deux vecteurs</p>
              <p>On peut voir <><MathComponent math={"3x + 4y"} /></> comme le produit scalaire canonique entre le vecteur <><MathComponent math={"u = (3,4)"} /></> et le vecteur <><MathComponent math={"v = (x,y)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer la formule</p>
              <p>L'inégalité nous dit que <><MathComponent math={"\\langle u,v\\rangle^2 \\le ||u||^2 \\times ||v||^2"} /></>. Or <><MathComponent math={"||u||^2 = 3^2 + 4^2 = 25"} /></> et <><MathComponent math={"||v||^2 = x^2 + y^2 = 1"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"(3x + 4y)^2 \\le 25 \\times 1 = 25"} /></>. Donc <><MathComponent math={"-5 \\le 3x + 4y \\le 5"} /></>. Le maximum est exactement 5 ! L'algèbre linéaire détruit les problèmes d'analyse géométrique.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="📜 Cauchy-Schwarz & Orthogonalité" icon="🛡️" color="amber">
        <p className="mb-4">
          Voici le théorème le plus utilisé de TOUTE l'analyse mathématique bac+2 bac+3.
        </p>
        
        <InfoBlock type="definition" title="L'inégalité de Cauchy-Schwarz">
          Pour tous vecteurs x et y : <strong>| &lt;x, y&gt; |  ≤  ||x|| × ||y||</strong><br/>
          (Autrement dit, le produit de deux objets ne dépassera jamais le produit de leurs longueurs individuelles maximum. Il y a égalité UNIQUEMENT si x et y sont colinéaires).
        </InfoBlock>

        <div className="my-4 text-center p-4 bg-rose-50/50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/60 rounded-xl">
            <h4 className="font-bold text-rose-900 dark:text-rose-100">L'Orthogonalité Suprême</h4>
            <p className="text-sm text-rose-950 dark:text-rose-50 mb-2">
              On dit que deux vecteurs sont <strong>ORTHOGONAUX (perpendiculaires)</strong> si et seulement si leur produit scalaire est parfaitement nul.
            </p>
            <div className="font-mono text-lg text-rose-950 dark:text-rose-50 p-2 bg-card rounded border border-rose-300 inline-block">
                &lt;x , y&gt; = 0
            </div>
            <p className="text-xs text-rose-700 dark:text-rose-300 mt-2">Dès lors, on peut utiliser le fameux Théorème de Pythagore Généralisé : ||x + y||² = ||x||² + ||y||².</p>
        </div>

        <InfoBlock type="info" title="Zoom sur : Orthogonalité et Compression JPEG">
          Pourquoi cherche-t-on l'orthogonalité à tout prix ? Dans un espace euclidien, si vous projetez un vecteur sur une base orthonormée (vecteurs orthogonaux de norme 1), les coordonnées s'obtiennent par un simple produit scalaire : {"$c_i = \\langle x, e_i \\rangle$"}, sans aucune inversion de système complexe ! Pour la compression d'image JPEG, on convertit les pixels en spectre de fréquences via une base orthogonale de cosinus (DCT). Pour compresser l'image, on retire les hautes fréquences orthogonales négligeables, ce qui réduit drastiquement la taille du fichier avec une perte visuelle quasi invisible.
        </InfoBlock>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le procédé de Gram-Schmidt sert à trouver les solutions d'un système.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Il sert à ORTHONORMALISER une base. Prendre des vecteurs moches et tordus, et les redresser un par un pour créer une belle grille parfaite, avec des angles de 90° et des vecteurs de longueur 1.</span></>}
          />
          <Flashcard 
            front={<>C'est quoi le Supplémentaire Orthogonal F^⊥ (F-Orthogonal) ?</>}
            back={<><strong>Le Côté Obscur du plan.</strong><br/><span className="text-sm">C'est l'ensemble de TOUS les vecteurs qui sont strictement perpendiculaires au Sous-Espace F. Si F est un plan (dimension 2) dans une pièce 3D, alors F-Orthogonal est la droite (dimension 1) qui transperce ce plan verticalement !</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur Spatial d'Orthonormalisation (Gram-Schmidt)" icon="🕹️" color="slate">
        <GramSchmidt />

        <div className="mt-6">
          <FillInTheBlanks 
            id="pb-euclid-eval"
            content={[
              "Le joyau des espaces euclidiens, c'est le Théorème Spectral. Si je possède une matrice Carrée qui est <strong>Symétrique</strong> (elle est son propre miroir par rapport à la diagonale). Alors les mathématiciens ont prouvé un fait incroyable : cette matrice est FORCÉMENT ",
              { options: ["Inversible", "Nulle", "Diagonalisable"], correctAnswer: 2 },
              " ! \nEncore mieux, non seulement on peut la réduire en matrice diagonale de valeurs propres, mais en plus, tous les Sous-Espaces propres associés sont ",
              { options: ["Orthogonaux entre eux", "Égaux à 0", "De dimension infinie"], correctAnswer: 0 },
              " ! La base des vecteurs est un quadrillage parfait (on appelle ça une base orthonormée)."
            ]}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la définition mathématique exacte d'une projection orthogonale de x sur le plan F ?",
              options: [
                "C'est un vecteur proportionnel à x.",
                "C'est le vecteur 'p' de F qui MINIMISE la distance ||x - p||.",
                "C'est la moitié du produit scalaire."
              ],
              correctAnswer: 1,
              explanation: "Voilà ce qui rend les maths si belles pour le monde réel : La projection orthogonale, c'est la MEILLEURE APPROXIMATION possible (la distance la plus courte) de ton objet vers ce sous-monde plus petit. C'est grâce à ça qu'on fait de la compression d'images JPG/MP3 en tronquant des fréquences !."
            },
            {
              question: "Pour les Matrices ou les Fonctions (et pas des flèches en 2D), c'est quoi le Produit Scalaire Canonique entre deux fonctions 'f' et 'g' ?",
              options: [
                "Multiplier f(0) * g(0)",
                "L'intégrale de 'f(t)*g(t)' sur un segment [a,b]",
                "La dérivée de (f+g)"
              ],
              correctAnswer: 1,
              explanation: "Incroyable mais vrai ! On peut calculer si la 'fonction sin' et la 'fonction cos' sont orthogonales en calculant l'intégrale de leur multiplication ! (Et elles le sont sur -1;1, c'est ce qui crée les fameuses Séries de Fourier !)"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Un Espace Euclidien = Un espace vectoriel RÉEL de dimension FINIE doté d'un Produit Scalaire.",
            "Norme ||x|| = La racine de <x, x>. Ça mesure la taille de notre objet.",
            "Cauchy-Schwarz : <x, y> sera toujours plus faible que le produit des deux normes extrêmes.",
            "Symétrie -> Théorème Spectral -> Diagonalisation PARFAITE."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+35 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_05_Espaces_Euclidiens;
