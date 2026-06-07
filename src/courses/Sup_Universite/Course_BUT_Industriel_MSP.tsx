import React from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_BUT_Industriel_MSP: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-BUT-IND"
        title="BUT Industriel : Maîtrise Statistique des Procédés"
        subtitle="Contrôle qualité, cartes de contrôle de Shewhart, calcul de capabilité machine et limites d'action."
        duration="1h 10"
      />

      <Section title="⚙️ L'approche MSP (Statistical Process Control)" icon="🛠️" color="indigo">
        <p>
          En BUT Industriel (Génie Industriel, GMP, QLIO, etc.), la <strong>Maîtrise Statistique des Procédés (MSP)</strong> vise à surveiller un outil de production de manière continue afin de s'assurer qu'il ne produit pas de rebuts (pièces non conformes).
        </p>

        <InfoBlock type="definition" title="Variabilité Commune vs Spéciale">
          Tout procédé de fabrication réelle subit deux types de variations :
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Variations Communes :</strong> Petites variations naturelles, aléatoires et inhérentes à la machine (bruit normal modélisé par une loi normale).</li>
            <li><strong>Variations Spéciales :</strong> Dérives systématiques dues à l'usure d'un outil, une erreur humaine, ou une mauvaise matière première. La MSP a pour vocation de les <strong>détecter immédiatement</strong>.</li>
          </ul>
        </InfoBlock>
      </Section>

      <Section title="📊 Cartes de Contrôle de Shewhart" icon="📉" color="emerald">
        <p className="mb-4">
          La pièce maîtresse de la MSP est la <strong>carte de contrôle</strong>. On y reporte régulièrement la moyenne <MathComponent math="\bar{X}" /> d'échantillons prélevés sur la ligne de production.
        </p>

        <FormulaBox 
          title="Limites de Contrôle (Intervalle à 99.7%)" 
          math="\text{LSC} = \mu + 3 \frac{\sigma}{\sqrt{n}} \quad \text{et} \quad \text{LIC} = \mu - 3 \frac{\sigma}{\sqrt{n}}" 
        />

        <p className="my-4">
          Où <MathComponent math="n" /> désigne la taille de l'échantillon (souvent <MathComponent math="n=5" />), <MathComponent math="\mu" /> la moyenne de référence, et <MathComponent math="\sigma" /> l'écart-type de production.
        </p>

        <InfoBlock type="reminder" title="Rappel : Pourquoi diviser l'écart-type par la racine de n ?">
          Une moyenne d&apos;échantillon fluctuation-dépendante est beaucoup plus stable qu&apos;une valeur individuelle ! C&apos;est pourquoi l&apos;écart-type de la moyenne d&apos;un échantillon de taille {"$n$"} est égal à {"$\\frac{\\sigma}{\\sqrt{n}}$"}. Ainsi, plus {"$n$"} est grand, plus l&apos;intervalle entre nos limites de contrôle LIC et LSC se resserre pour détecter la moindre anomalie !
        </InfoBlock>

        <InfoBlock type="warning" title="Limites de Contrôle vs Tolérances">
          Ne confondez JAMAIS les limites de contrôle (LSC/LIC) fixées par la <strong>statistique de la machine</strong>, avec l'intervalle de tolérance (Loi du client : TSI / TII) fixé par le <strong>bureau d'études</strong> !
        </InfoBlock>

        <InfoBlock type="funfact" title="Le saviez-vous ? Comment la MSP a révolutionné le fleuron industriel japonais">
          Après la Seconde Guerre mondiale, l&apos;ingénieur et statisticien américain W. Edwards Deming a été envoyé au Japon pour aider à reconstruire le pays. Ses conférences sur les cartes de contrôle et le contrôle statistique de la qualité (MSP) ont été immédiatement adoptées par les ingénieurs d&apos;entreprises naissantes comme Toyota et Sony. C&apos;est l&apos;application rigoureuse de ces théories qui a permis à l&apos;industrie japonaise de passer d&apos;un statut de « produits bon marché de mauvaise qualité » à celui de leader mondial de la fiabilité absolue !
        </InfoBlock>
      </Section>

      <Section title="📏 Capabilité Machine (Cp)" icon="📊" color="amber">
        <p className="mb-4">
          La performance d'un outil industriel s'évalue par son indice de capabilité <MathComponent math="C_p" />, qui mesure si la dispersion de la machine « rentre » bien dans l'exigence du client.
        </p>

        <FormulaBox 
          title="Formule de la Capabilité Cp" 
          math="C_p = \frac{\text{TS} - \text{TI}}{6\sigma}" 
        />

        <p className="my-4">
          Où <MathComponent math="\text{TS}" /> est la tolérance supérieure et <MathComponent math="\text{TI}" /> la tolérance inférieure fournies par le client.
        </p>

        <InfoBlock type="info" title="Interprétation Industrielle">
          Un procédé est dit <strong>capable</strong> si <MathComponent math="C_p \ge 1.33" />. Cela signifie que la tolérance demandée par le client est au moins 1,33 fois supérieure à la dispersion naturelle maximale de la machine (<MathComponent math="6\sigma" />), assurant un taux de défaut quasi-nul (inférieur à 0,01%).
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercice Guidé" icon="🛠️" color="purple">
        <InteractiveExercise
          title="Calcul de la Capabilité d'une Machine outil"
          question={<p>Une ligne d'usinage fabrique des arbres de diamètres nominaux compris dans un intervalle de tolérance <MathComponent math="[19.85 , 20.15]\text{ mm}" />. L'écart-type de la machine est mesuré à <MathComponent math="\sigma = 0.03\text{ mm}" />. Calculer <MathComponent math="C_p" /> et conclure sur la capabilité.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Calculer l'intervalle de tolérance (IT)</p>
              <p>L'intervalle demandé par le client vaut <MathComponent math="\text{TS} - \text{TI} = 20.15 - 19.85 = 0.30\text{ mm}" />.</p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Calculer la dispersion de la machine</p>
              <p>La dispersion naturelle maximale est égale à <MathComponent math="6 \times \sigma = 6 \times 0.03 = 0.18\text{ mm}" />.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Calcul final de Cp</p>
              <p><MathComponent math="C_p = \frac{0.30}{0.18} \approx 1.67" />. Comme <MathComponent math="1.67 \ge 1.33" />, le procédé est considéré comme <strong>hautement capable</strong>, la machine est donc validée !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="📝 Quiz d'évaluation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la signification de la valeur de LSC ?",
              options: [
                "Limite de Spécificité Commerciale",
                "Limite Supérieure de Contrôle",
                "Largeur de Standard de Conception"
              ],
              correctAnswer: 1,
              explanation: "La LSC (Limite Supérieure de Contrôle) marque la frontière haute d'un procédé statistique normal stable."
            },
            {
              question: "Si l'indice Cp est strictement égal à 1.0, quel pourcentage de pièces non conformes risque d'être produit si la machine est parfaitement centrée ?",
              options: [
                "Environ 0.27 %",
                "Environ 5 %",
                "0 %"
              ],
              correctAnswer: 0,
              explanation: "À Cp = 1.0, la dispersion à 3*sigma touche exactement les tolérances. Il reste 0.27% (loi normale bilatérale) de chances d'avoir des pièces en dehors, d'où l'exigence usuelle d'un Cp supérieur à 1.33."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la différence entre variations communes et spéciales.",
            "Je sais calculer les limites de Shewhart (LSC et LIC).",
            "Je sais utiliser l'indice Cp de Capabilité.",
            "Je comprends pourquoi limites de contrôle et de tolérances sont disjointes."
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de Synthèse" icon="🧠" color="purple">
        <p className="mb-6 text-sm text-slate-500 leading-relaxed">
          Mémorisez les concepts-clés et les indicateurs majeurs du contrôle statistique de procédés (MSP).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Qu&apos;est-ce que l&apos;indice <strong>Cp</strong> et que mesure-t-il ?</>}
            back={<>C&apos;est le ratio de capabilité potentielle de la machine : {"$C_p = \\frac{TS - TI}{6\\sigma}$"}. Il montre si la dispersion naturelle de la machine (6 écarts-types) loge confortablement dans les tolérances du client.</>}
          />
          <Flashcard 
            front={<>Quelle est la formule des limites de contrôle <strong>LIC</strong> et <strong>LSC</strong> pour une moyenne de taille n ?</>}
            back={<>Elles s&apos;expriment par {"$\\text{LSC} = \\mu + 3 \\frac{\\sigma}{\\sqrt{n}}$"} et {"$\\text{LIC} = \\mu - 3 \\frac{\\sigma}{\\sqrt{n}}$"}. Elles définissent l&apos;intervalle d&apos;acceptabilité industrielle à 99,73%.</>}
          />
          <Flashcard 
            front={<>Comment réagir si un point se situe <strong>au-delà d&apos;une limite de contrôle</strong> (LSC ou LIC) ?</>}
            back={<>Le procédé est considéré statistiquement « hors-contrôle ». Il faut immédiatement stopper la production et mener une enquête pour identifier et éliminer la variation spéciale (usure d&apos;outil, dérive thermique, etc.).</>}
          />
          <Flashcard 
            front={<>Quelle différence fondamentale y a-t-il entre <strong>Limites de Contrôle</strong> et <strong>Limites de Spécification</strong> ?</>}
            back={<>Les limites de contrôle (LSC/LIC) dépendent du procédé réel machine (statistique), tandis que les limites de spécification ou tolérances (TS/TI) sont dictées de l&apos;extérieur par les plans du Bureau d&apos;Études.</>}
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

export default Course_BUT_Industriel_MSP;
