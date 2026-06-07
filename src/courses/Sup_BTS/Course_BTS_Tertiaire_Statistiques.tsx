import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BTS_Tertiaire_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BTS-TER"
        title="BTS Tertiaire : Estimation & Prévisions"
        subtitle="Lois binomiales, approximations normales et intervalles de confiance appliqués au marketing et à la gestion."
        duration="1h 15"
      />

      <Section title="📦 L'évaluation Statistique commerciale" icon="📊" color="indigo">
        <p>
          En BTS Tertiaire (CG, MCO, NDRC, Commerce International), l'évaluation des intentions d'achats d'une clientèle ou les tests d'audit comptable exigent de savoir exploiter les <strong>probabilités d'échantillonnage</strong>. On souhaite inférer le comportement d'une population générale à partir d'un petit échantillon représentatif de clients.
        </p>

        <InfoBlock type="definition" title="Le problème d'estimation">
          Soit une population où une proportion <MathComponent math="p" /> (inconnu) d'individus partage une caractéristique (ex: l'envie d'acheter un produit). On interroge un échantillon de <MathComponent math="n" /> personnes et on constate une fréquence observée <MathComponent math="f" />.
          L'<strong>estimateur ponctuel</strong> de <MathComponent math="p" /> est la fréquence observée <MathComponent math="f" /> :
          <MathComponent block math="\hat{p} = f" />
        </InfoBlock>

        <InfoBlock type="funfact" title="Le saviez-vous ? Le fiasco électoral américain de 1936">
          Lors de l&apos;élection présidentielle de 1936, le célèbre magazine <i>Literary Digest</i> a interrogé plus de 2 millions de personnes par téléphone pour prédire le vainqueur. Il prédisait la victoire écrasante d&apos;Alfred Landon. En parallèle, un jeune staticien nommé George Gallup n&apos;interrogea que 50 000 personnes, mais choisies de façon parfaitement scientifique et représentative. Gallup prédit correctement la victoire éclatante de Franklin D. Roosevelt ! Ce fiasco démontra qu&apos;un échantillon immense mais biaisé (en 1936, seuls les ménages aisés possédaient un téléphone) est inutile comparé à un petit échantillon rigoureusement modélisé.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Théorème Central Limite et Loi Normale" icon="⚖️" color="emerald">
        <p className="mb-4">
          Si l'échantillon prélevé est supérieur à 30 personnes, la loi probabiliste qui dicte le comportement de la fréquence <MathComponent math="F" /> peut s'approcher par une <strong>loi normale</strong> par le Théorème Central Limite.
        </p>

        <FormulaBox 
          title="Espérance et Variance de la Fréquence" 
          math="E(F) = p \quad \text{et} \quad \sigma(F) = \sqrt{\frac{p(1-p)}{n}}" 
        />

        <InfoBlock type="reminder" title="Conditions d'approximation">
          L'approximation d'une loi binomiale par une loi normale <MathComponent math="\mathcal{N}\left(p, \sqrt{\frac{p(1-p)}{n}}\right)" /> n'est valide que si :
          <MathComponent block math="n \ge 30, \quad np \ge 5 \quad \text{et} \quad n(1-p) \ge 5" />
        </InfoBlock>
      </Section>

      <Section title="🎯 L'Intervalle de Confiance à 95%" icon="🎯" color="amber">
        <p className="mb-4">
          Puisqu'on ne connaît pas <MathComponent math="p" /> exactement, on l'encadre dans un <strong>intervalle de confiance</strong> avec un niveau de sécurité de 95%.
        </p>

        <FormulaBox 
          title="Intervalle de confiance à 95%" 
          math="I_c = \left[ f - 1.96 \sqrt{\frac{f(1-f)}{n}} \ , \ f + 1.96 \sqrt{\frac{f(1-f)}{n}} \right]" 
        />

        <p className="my-4">
          Le nombre <MathComponent math="1.96" /> provient du fait que pour une variable normale centrée réduite <MathComponent math="Z" />, on a <MathComponent math="P(-1.96 \le Z \le 1.96) = 0.95" />.
        </p>

        <InfoBlock type="warning" title="Interprétation adéquate du 95%">
          Dire qu'un intervalle est à 95% de confiance ne signifie pas que le paramètre <MathComponent math="p" /> a 95% de chances de tomber dedans (car <MathComponent math="p" /> est un nombre fixe, non aléatoire).
          Cela veut dire que si l'on répétait 100 fois l'enquête statistique sur 100 échantillons différents, <strong>environ 95 de ces intervalles contiendraient le vrai paramètre de population</strong>.
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : La marge d'erreur à 95%">
          La marge d&apos;erreur d&apos;un sondage ou d&apos;une étude de marché s&apos;exprime par {"$E = 1.96 \\sqrt{\\frac{f(1-f)}{n}}$"}. Pour estimer rapidement cette marge sans connaître {"$f$"}, on choisit {"$f = 0.5$"} (cas le plus dispersé). La formule se simplifie alors par l&apos;approximation classique : {"$E \\approx \\frac{1}{\\sqrt{n}}$"}. Ainsi, pour avoir une marge d&apos;erreur de 5%, il faut interroger environ {"$n = 400$"} personnes, alors que pour 1%, il en faut {"$10\\,000$"} !
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercice Guidé" icon="🛠️" color="purple">
        <InteractiveExercise
          title="Dimensionner une enquête d'opinion commerciale"
          question={<p>Une entreprise veut faire une enquête de satisfaction. Elle souhaite obtenir un intervalle de confiance dont la demi-largeur (marge d'erreur) ne dépasse pas 2% (0.02) au niveau de confiance 95%. Combien de clients doit-elle interroger au minimum au cas le plus défavorable (fréquence f=0.5) ?</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Poser l'équation de la demi-largeur</p>
              <p>L'écart maximal de l'estimation est : <MathComponent math="E = 1.96 \sqrt{\frac{f(1-f)}{n}}" />. Au pire des cas, <MathComponent math="f = 0.5" />, ce qui donne <MathComponent math="f(1-f) = 0.25" />.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Écrire l'inéquation</p>
              <p>On cherche <MathComponent math="n" /> tel que : <MathComponent math="1.96 \times \frac{0.5}{\sqrt{n}} \le 0.02" />, c'est-à-dire <MathComponent math="\frac{0.98}{\sqrt{n}} \le 0.02" />.</p>
              <p>D'où <MathComponent math="\sqrt{n} \ge \frac{0.98}{0.02} = 49" />.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Élévation au carré du résultat</p>
              <p><MathComponent math="n \ge 49^2 = 2401" />. Le cabinet de marketing doit donc interroger au minimum <strong>2 401 clients</strong> pour garantir une marge d'erreur inférieure ou égale à 2% !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="📝 Quiz d'évaluation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle valeur de z-score correspond à un niveau de confiance à 90% ?",
              options: [
                "1.96",
                "1.645",
                "2.58"
              ],
              correctAnswer: 1,
              explanation: "Pour une loi normale centrée réduite, 90% de la distribution se situe entre -1.645 et +1.645 écart-types."
            },
            {
              question: "Si l'on multiplie l'effectif n d'un échantillon par 4, comment varie la largeur de l'intervalle de confiance ?",
              options: [
                "Elle est divisée par 2",
                "Elle est divisée par 4",
                "Elle est multipliée par 2"
              ],
              correctAnswer: 0,
              explanation: "Comme le nombre de sujets 'n' est placé sous une racine carrée au dénominateur (1/sqrt(n)), multiplier n par 4 divise l'écart-type d'échantillonnage par sqrt(4) = 2, et divise donc la largeur de l'intervalle par 2."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais définir la notion d'estimateur ponctuel.",
            "Je sais énoncer les conditions de l'approximation normale.",
            "Je sais calculer l'intervalle de confiance à 95% pour une proportion.",
            "Je sais déterminer la taille minimale d'échantillon requise pour un audit."
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="purple">
        <p className="mb-6 text-sm text-slate-500 leading-relaxed">
          Révisez rapidement les définitions et formules cruciales de l&apos;estimation et des intervalles de confiance pour le BTS Tertiaire.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Qu&apos;est-ce qu&apos;un <strong>Estimateur Ponctuel</strong> d&apos;une proportion p ?</>}
            back={<>C&apos;est un nombre unique calculé sur l&apos;échantillon servant à deviner le paramètre de la population. L&apos;estimateur ponctuel standard de la proportion est la fréquence observée {"$\\hat{p} = f = \\frac{x}{n}$"}.</>}
          />
          <Flashcard 
            front={<>Quelle est la formule générale de l&apos;<strong>Intervalle de Confiance</strong> à 95% pour une proportion p ?</>}
            back={<>L&apos;intervalle est défini par {"$I_c = \\left[ f - 1.96 \\sqrt{\\frac{f(1-f)}{n}} \\ , \\ f + 1.96 \\sqrt{\\frac{f(1-f)}{n}} \\right]$"}.</>}
          />
          <Flashcard 
            front={<>Dans quelles conditions précises l&apos;<strong>Approximation Normale</strong> de la fréquence est-elle valide ?</>}
            back={<>Elle nécessite que la taille de l&apos;échantillon soit importante : {"$n \\ge 30$"}, ainsi que {"$n f \\ge 5$"} et {"$n (1-f) \\ge 5$"}.</>}
          />
          <Flashcard 
            front={<>Que représente physiquement le <strong>Niveau de Confiance</strong> de 95% ?</>}
            back={<>Il indique que si l&apos;on réalisait la même étude sur 100 échantillons distincts de la population, environ 95 d&apos;entre eux produiraient un intervalle qui encadre la proportion réelle recherchée.</>}
          />
        </div>
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_BTS_Tertiaire_Statistiques;
