import ParabolaRoots from './ParabolaRoots';
import DerivativeSecant from './DerivativeSecant';
import VectorChasles from './VectorChasles';
import VectorField from './VectorField';
import ProportionalityTable from './ProportionalityTable';
import AdditionPosee from './AdditionPosee';
import ThalesConfigurations from './ThalesConfigurations';
import FractionDecimal from './FractionDecimal';
import ArithmeticSequence from './ArithmeticSequence';
import ComplexPlane from './ComplexPlane';
import LinearTransform from './LinearTransform';
import SeriesConvergence from './SeriesConvergence';
import DirectionField from './DirectionField';
import GramSchmidt from './GramSchmidt';
import RiemannSums from './RiemannSums';
import BinomialDist from './BinomialDist';
import TaylorExpansion from './TaylorExpansion';
import FourierReconstruction from './FourierReconstruction';
import TopologicalSpaces from './TopologicalSpaces';
import GradientDescentVisualizer from './GradientDescentVisualizer';
import StochasticProcessSim from './StochasticProcessSim';

export const InteractiveRegistry: Record<string, React.ComponentType<{ alt?: string }>> = {
  'parabole_racines.svg': ParabolaRoots,
  'tangente_secante.svg': DerivativeSecant,
  'somme_vecteurs_chasles.svg': VectorChasles,
  'champ_vecteurs.svg': VectorField,
  'proportionnalite_tableau.svg': ProportionalityTable,
  'addition_posee.svg': AdditionPosee,
  'thales_configurations.svg': ThalesConfigurations,
  'fractions_decimales_interactif.svg': FractionDecimal,
  'suite_arithmetique.svg': ArithmeticSequence,
  'plan_complexe.svg': ComplexPlane,
  'transform_lineaire.svg': LinearTransform,
  'series_convergence.svg': SeriesConvergence,
  'champ_directions.svg': DirectionField,
  'gram_schmidt.svg': GramSchmidt,
  'riemann_sums.svg': RiemannSums,
  'binomial_poisson.svg': BinomialDist,
  'taylor_expansion.svg': TaylorExpansion,
  'fourier_reconstruction.svg': FourierReconstruction,
  'topological_spaces.svg': TopologicalSpaces,
  'gradient_descent.svg': GradientDescentVisualizer,
  'stochastic_process.svg': StochasticProcessSim,
};
