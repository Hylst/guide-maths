import React from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../components/SharedUI';
import { Box, Cuboid, Expand, FlaskConical, Cone, Variable, Cylinder } from 'lucide-react';
import { MathComponent } from "../components/MathComponent";

const Course_College_3eme_09_Espace: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-09"
        title="Géométrie dans l'Espace et Volumes"
        subtitle="Domptez la troisième dimension et mesurez l'univers !"
        duration="1h 15"
        level="3ème (Cycle 4)"
        prerequisites={["Aires des figures 2D (Triangle, Disque)", "Théorème de Pythagore"]}
        objectives={[
          "Reconnaître et lister les différents solides (Prismes, Pyramides, Cônes, Boules).",
          "Calculer l'aire et le volume de solides simples et de révolution.",
          "Mémoriser les 3 grandes familles de calcul de volumes.",
          "Maîtriser la Section de solides (ce qui se passe quand on coupe au couteau !)."
        ]}
      />

      <Section title="🌟 Introduction : L'élévation en 3D" icon="🚀" color="slate">
        <p>
          En géométrie classique (2D), tu dessinais des cercles bémols et des carrés plats sur une de feuille de papier. L'univers ne fait pas de feuilles ! Il est constitué de <strong>Volumes</strong> : cubes, sphères, cônes de glace, pyramides d'Egypte, immeubles profilés. 
        </p>
        <p className="mt-4">
          La <strong>Géométrie dans l'Espace</strong> est la grande magie de rajouter <strong>la Hauteur</strong> à toutes tes connaissances plates (Aire usuelle des bases). Attache ta ceinture pour le décollage tridimensionnel !
        </p>
      </Section>

      <Section title="1. Les Architectures Droites (Les Prismes et Cylindres)" icon="🏢" color="indigo">
        <p className="mb-4">Ce sont les "immeubles parfaits". Ils ont une base au rez-de-chaussée, et ils montent TOUT DROIT de manière identique jusqu'au toit.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
           <div className="bg-indigo-50/50 dark:bg-indigo-900/20 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/60 dark:border-indigo-800">
               <h4 className="font-bold text-indigo-900 dark:text-indigo-100 dark:text-indigo-200 mb-3 flex items-center gap-2">
                 <Box className="w-5 h-5"/> Le Prisme Droit
               </h4>
               <p className="text-sm mb-4">La base est un polygone (Triangle, Rectangle, Hexagone...). Les faces latérales sont toutes des RECTANGLES bien lisses.</p>
               <div className="bg-card/50 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/60 shadow-inner">
                  <p className="text-center font-serif text-lg font-bold text-indigo-900 dark:text-indigo-100">
                    $\\mathcal{`{V}`}<MathComponent math={" = Aire de la Base "} />\\times$ hauteur
                                                </p>
               </div>
           </div>
           
           <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800">
               <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-3 flex items-center gap-2">
                 <Cylinder className="w-5 h-5"/> Le Cylindre (de révolution)
               </h4>
               <p className="text-sm mb-4">L'immeuble parfait, mais sa base est un <strong>Cercle</strong> parfait ! (Comme une canette ou un rouleau d'essuie-tout).</p>
               <div className="bg-card/50 p-3 rounded-xl border border-sky-200 shadow-inner">
                  <p className="text-center font-serif text-lg font-bold text-sky-900 dark:text-sky-100">
                    $\\mathcal{`{V}`}<MathComponent math={" = "} />(\\pi \\times r^2) \\times hauteur$
                                                </p>
               </div>
           </div>
        </div>
        
        <InfoBlock title="Le secret de famille ! 🤫" type="info">
           As-tu remarqué que leur base monte tout droit (murs verticaux) ?<br/>
           Pour toute cette famille (ainsi que les cubes et pavés droits), la formule mère est IMMUABLE :<br/>
           <strong className="text-xl inline-block mt-2 font-black text-foreground border-b-2 border-foreground">VOLUME = AIRE DE BASE × HAUTEUR</strong>
        </InfoBlock>
      </Section>

      <Section title="2. Les Familles Pointues (Pyramides et Cônes)" icon="⛺" color="rose">
        <p className="mb-4">Contrairement aux immeubles qui montent tout droits, ces structures se rétrécissent en grimpant pour s'achever <strong>en un point unique majestueux : le Sommet principal.</strong></p>
        
        <div className="bg-rose-50/50 dark:bg-rose-900/20 dark:bg-rose-900/20 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-800/60 dark:border-rose-800 shadow-sm my-6 relative overflow-hidden">
          <FlaskConical className="absolute right-4 top-1/2 transform -translate-y-1/2 w-32 h-32 text-rose-500/10" />
          
          <h3 className="font-bold text-rose-900 dark:text-rose-100 dark:text-rose-200 text-lg mb-4">La Taxe du Rétrécissement (Le <MathComponent math={"\\div 3"} />)</h3>
          <p className="mb-3 text-sm md:text-base">Mettre un toit pointu, cela enlève de la matière ! En réalité, si tu remplis un Cône pointu d'eau et que tu le verses dans un Cylindre parfait de MÊME DIAMÈTRE et de MÊME HAUTEUR... <strong>Tu devras exactement le verser 3 fois !</strong></p>
          
          <hr className="border-rose-100 dark:border-rose-800/60 dark:border-rose-800/50 my-6"/>
          
          <ul className="space-y-4">
             <li>
                <strong>La Pyramide</strong> : (Base : polygone). Formule du grand Cheops =<br/>
                <span className="font-serif bg-card dark:bg-black/40 px-3 py-1 rounded inline-block mt-1 font-bold text-rose-700 dark:text-rose-300 shadow-sm border border-rose-100 dark:border-rose-800/60 dark:border-rose-800/50">$\\mathcal{`{V}`}<MathComponent math={" = (Aire de Base "} />\\times<MathComponent math={" hauteur) "} />\\div$ 3</span>
             </li>
             <li>
                <strong>Le Cône (de révolution)</strong> : (Base : disque, comme un chapeau de sorcière). =<br/>
                <span className="font-serif bg-card dark:bg-black/40 px-3 py-1 rounded inline-block mt-1 font-bold text-rose-700 dark:text-rose-300 shadow-sm border border-rose-100 dark:border-rose-800/60 dark:border-rose-800/50">$\\mathcal{`{V}`}<MathComponent math={" = "} />(\\pi \\times r^2 \\times hauteur) \\div 3$</span>
             </li>
          </ul>
        </div>
      </Section>

      <Section title="3. La Sphère et la Boule (Le cercle total)" icon="🌍" color="blue">
        <p className="mb-4">L'objet cosmique par excellence : la planète ! Mais attention au vocabulaire :</p>
        <ul className="list-disc list-inside mb-4 pl-4 text-muted-text">
          <li><strong>La Sphère :</strong> C'est juste l'écorce externe (la coquille vide, comme un ballon de foot percé ou une bulle de savon). Elle a une Aire (une surface).</li>
          <li><strong>La Boule :</strong> Elle est pleine ! (Comme une boule de billard). Elle a un Volume.</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-center">
           <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-200 dark:border-sky-800">
               <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-3">Aire de la Sphère</h4>
               <p className="font-serif text-2xl font-bold bg-card dark:bg-black/40 py-2 rounded-xl border border-sky-200 dark:border-sky-800/50">
                 <MathComponent math={"4 \\times \\pi \\times r^2"} />
                                         </p>
               <p className="text-xs text-muted-text mt-3">Équivaut magiquement à 4 disques parfaits posés bout à bout.</p>
           </div>
           
           <div className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-2xl border border-blue-300 dark:border-blue-700">
               <h4 className="font-bold text-blue-900 dark:text-blue-100 dark:text-blue-200 mb-3">Volume de la Boule</h4>
               <p className="font-serif text-2xl font-bold bg-card dark:bg-black/40 py-2 rounded-xl border border-blue-300 dark:border-blue-700/50">
                 $\\frac{4}{3} \\times \\pi \\times r^3$
               </p>
               <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 font-bold">ATTENTION : Puissance 3 absolument vitale !</p>
           </div>
        </div>
      </Section>

      <Section title="4. Les Sections de Solides (L'art de la découpe)" icon="🔪" color="emerald">
        <p className="mb-4">Que se passe-t-il quand on passe une gigantesque épée parfaite (un Plan) à travers un solide 3D pour le "trancher" violemment, et qu'on regarde l'entaille ? C'est la <strong>Section Plante</strong> !</p>

        <InteractiveExercise 
          title="Section d'Arbre et de Fromage"
          question={<>L'Inspecteur tranche la forme à l'aide d'un panneau dur et parallèle. Trouvons la trace !</>}
          steps={[
            <>🗡️ Épée Parallèle sur Pave Droit : Je coupe un immeuble pavé droit de façon parfaitement "carrée et horizontale". L'entaille laissée (la trace de la lame) sera magiquement de format : <strong>Rectangle</strong> !</>,
            <>🪚 Épée Horizontale Parallèle sur un Cylindre Droit (Tranche de bûche) : Je découpe une rondelle de saucisson cylindrique : la tranche sera parfaitement identique à la base soit : un <strong>Cercle parfais</strong>.</>,
            <>⚔️ Épée Parallèle sur un Cône Loin au Dessus (Toit conique tranché) : Si je coupe mon chapeau de sorcière horizontalement... Il produit un <strong>DISQUE (plus petit)</strong>, c'est l'essence de la "Section-Réduction" ou 'Tronc de cône' !</>,
            <>🗡️ Épée coupant le Monde (La Sphère) ! Une sphère tranchée, qu'importe le sens et l'angle, révèle TOUJOURS au nez de la trace son unique essence de sang : Un <strong>CERCLE</strong> formel !</>
          ]}
        />
        
        <TipBanner title="Règle Vitale des Agrandissements (Brevet)" type="warning">
           Lorsque vous découpez le sommet d'une pyramide, il se crée une miniature (réduction avec le facteur 'k') ! <br/>
           - Si la petite pyramide a ses longueurs d'arêtes diminuées fois 'k' (ex: divisées par 2, k=0.5).<br/>
           - Son Aire externe est diminuée fois <strong>$\\mathbf{`{k^2}`}$</strong>.<br/>
           - Son Volume brut s'effondre fois <strong>$\\mathbf{`{k^3}`}$</strong> ! (Soit divisé par <MathComponent math={"2^3 = 8"} /> !!)
                          </TipBanner>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Rappelle-toi la formule magique en or : Quel est le lien de famille absolu des Formes à "Murs Verticaux Démarrés depuis le Sol" pour trouver leur Volume ?</>}
            back={<>Une seule équation pure unificatrice :<br/><strong>Aire de la Base multipliée par la Hauteur !</strong><br/><em className="text-sm">(S'applique à : Prismes, Pavés Droits (Box), Cubes Droits, et aux fiers Cylindres).</em></>}
          />
          <Flashcard 
            front={<>Je réduis mon chapeau géant Conique par le saint facteur magique de $k = \\frac{1}{3}$.<br/>Par combien en chute libre tombe le Volume de la miniature ?</>}
            back={<>Souviens-toi de la puissance <MathComponent math={"k^3"} /> !<br/>Le volume est donc écrasé de $\\frac{1}{3} \\times \\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{27} $ ! Le volume final devient <strong>27 fois plus minuscule</strong> !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence totale entre Périmètre, Aire, Volume en unité pure ?",
              answer: "Le Périmètre = Longueur simple = m ou cm (Puissance 1). L'Aire = La Surface de peinture pour peindre le mur = m² ou cm² (Puissance 2). Le Volume = La quantité d'eau pour remplir la cuvette creuse = m³ ou cm³ (Puissance 3). Ne mélangez JAMAIS les Mètres avec les mètres-cubes !"
            },
            {
              question: "Puis-je calculer le volume d'une forme informe comme Un caillou de Roc ?",
              answer: "Les mathématiques s'arrêtent ici. Mais la science antique opère. Remplis à raz bord un sceau cylindrique d'eau (noté de trait Mètre cube). Plonge la roche brute, et mesure le niveau final... La hauteur et volume déplacés de l'eau révèlent formellement 'le Volume de la Roche' (Astuce d'Archimède) !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai une fabuleuse pyramide (base d'aire de 10) et de sublime Hauteur totale d'apex (H=9). Son volume intègre...?",
              options: [
                "90 purs cubes ! (10 × 9)",
                "30 purs cubes ! ((10 × 9) ÷ 3)",
                "Il est infaisable car il manque le Côté long !",
              ],
              correctAnswer: 1,
              explanation: "Top ! L'aire est déjà de terre offerte : 10. La forme fendant l'air pique ! Le Toit pointu réprime par la Trinité de /3 ! Soit $10 \\times 9 \\div 3 = 90 \\div 3 = 30$ volumes."
            },
            {
              question: "La grande Sphère a un Rayon brut r=2, sa sœur miniature (Boule-A) a un Rayon R=1. De combien fois la soeur est-elle PLUS COMPRIMEE EN MASSE ET VOLUME ?",
              options: [
                "2 Fois plus légère en volume ! (Divisé par 2)",
                "4 Fois plus légère en Volume (Divisé par 4)",
                "8 Fois écrasée plus légère au cube ! (Divisé par 8)"
              ],
              correctAnswer: 2,
              explanation: "Magique ! Le rayon a été scindé à plat (facteur k = 0,5 ou demi 1/2). Formules des rois d'homothéties : Un volume diminué suit le cube $k^3$ ! Soit $(1/2)^3 = 1/8$ème. Elle tient moins d'eau d'un facteur immense de HUIT."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Pyramides et Cône de bout et pointe ? Toujours diviser le calcul final par Trois (/3).",
            "Maitrise formelle de l'Aire du Disque : Pi multiplié part le double d'acier du Rayon Puissance 2 !",
            "Conversion Ultime Mémorisée (Brevet) : 1 Formel Litre = 1 Décimètre Cube ! (1 L = 1 dm³)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_College_3eme_09_Espace;
