import React, { useState, useMemo } from 'react';
import { 
  Sparkles, HelpCircle, ArrowRight, RefreshCw, Layers, Plus, Minus, Check, Play, Eye
} from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

// Helper for matrix multiplication
const multiplyMatrices = (A: number[][], B: number[][]): number[][] => {
  const rA = A.length;
  const cA = A[0].length;
  const cB = B[0].length;
  const result: number[][] = Array(rA).fill(0).map(() => Array(cB).fill(0));
  
  for (let i = 0; i < rA; i++) {
    for (let j = 0; j < cB; j++) {
      let sum = 0;
      for (let k = 0; k < cA; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

// Helper for matrix powers (integers)
const matrixPower = (M: number[][], power: number): number[][] => {
  if (power === 1) return M;
  let result = M;
  for (let p = 1; p < power; p++) {
    result = multiplyMatrices(result, M);
  }
  return result;
};

// ============================================================================
// COMPONENT 1: MATRIX MULTIPLICATION VISUALIZER (2x3 * 3x2 -> 2x2)
// ============================================================================
export const MatrixMultiplicationVisualizer: React.FC = () => {
  const [matrixA, setMatrixA] = useState<number[][]>([
    [2, -1, 3],
    [0, 4, 1]
  ]);
  const [matrixB, setMatrixB] = useState<number[][]>([
    [1, 2],
    [3, 0],
    [-2, 5]
  ]);
  const [selectedResultCell, setSelectedResultCell] = useState<{ r: number; c: number }>({ r: 0, c: 0 });

  const resultMatrix = useMemo(() => {
    return multiplyMatrices(matrixA, matrixB);
  }, [matrixA, matrixB]);

  const updateCellA = (r: number, c: number, value: number) => {
    const next = matrixA.map((row, ri) => 
      row.map((cell, ci) => (ri === r && ci === c ? Math.max(-9, Math.min(9, value)) : cell))
    );
    setMatrixA(next);
  };

  const updateCellB = (r: number, c: number, value: number) => {
    const next = matrixB.map((row, ri) => 
      row.map((cell, ci) => (ri === r && ci === c ? Math.max(-9, Math.min(9, value)) : cell))
    );
    setMatrixB(next);
  };

  const randomizeMultiplication = () => {
    const randomVal = () => Math.floor(Math.random() * 7) - 3; // range -3 to 3
    setMatrixA([
      [randomVal(), randomVal(), randomVal()],
      [randomVal(), randomVal(), randomVal()]
    ]);
    setMatrixB([
      [randomVal(), randomVal()],
      [randomVal(), randomVal()],
      [randomVal(), randomVal()]
    ]);
  };

  return (
    <div id="matrix-mult-visualizer" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl shadow-indigo-100/40 dark:shadow-none mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 gap-3">
        <div>
          <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-1 px-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-mono">A × B</span>
            Visualisateur d'Étape Ligne × Colonne
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Modifiez les valeurs des matrices, puis cliquez sur chaque case du résultat pour décomposer le produit !
          </p>
        </div>
        <button
          onClick={randomizeMultiplication}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all self-end"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Aléatoire
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Matrice A */}
        <div className="lg:col-span-4 flex flex-col justify-center items-center p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-3 text-center">
            Matrice A (2 x 3)
          </span>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-light text-indigo-400 -mr-1 select-none">[</div>
            <div className="grid grid-cols-3 gap-3">
              {matrixA.map((row, r) => 
                row.map((cell, c) => {
                  const isSelectedRow = selectedResultCell.r === r;
                  return (
                    <div 
                      key={`a-${r}-${c}`}
                      className={`flex flex-col items-center p-1.5 rounded-xl border transition-all ${
                        isSelectedRow 
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-800 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-200 shadow-sm scale-105' 
                          : 'bg-white border-slate-200 hover:border-indigo-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-sm font-black">{cell}</span>
                      <div className="flex gap-1 mt-1 opacity-70 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => updateCellA(r, c, cell - 1)}
                          className="p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded text-slate-600"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <button 
                          onClick={() => updateCellA(r, c, cell + 1)}
                          className="p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded text-slate-600"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="text-3xl font-light text-indigo-400 -ml-1 select-none">]</div>
          </div>
          <p className="text-[9px] text-indigo-500/80 mt-2 font-semibold font-mono">
            Sélection : Ligne {selectedResultCell.r + 1} de A
          </p>
        </div>

        {/* Multiplication Operator symbol */}
        <div className="lg:col-span-1 flex items-center justify-center font-bold text-slate-400 text-2xl">
          ×
        </div>

        {/* Matrice B */}
        <div className="lg:col-span-3 flex flex-col justify-center items-center p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-3 text-center">
            Matrice B (3 x 2)
          </span>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-light text-indigo-400 -mr-1 select-none">[</div>
            <div className="grid grid-cols-2 gap-3">
              {matrixB.map((row, r) => 
                row.map((cell, c) => {
                  const isSelectedCol = selectedResultCell.c === c;
                  return (
                    <div 
                      key={`b-${r}-${c}`}
                      className={`flex flex-col items-center p-1.5 rounded-xl border transition-all ${
                        isSelectedCol 
                          ? 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200 shadow-sm scale-105' 
                          : 'bg-white border-slate-200 hover:border-amber-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-sm font-black">{cell}</span>
                      <div className="flex gap-1 mt-1 opacity-70 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => updateCellB(r, c, cell - 1)}
                          className="p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded text-slate-600"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <button 
                          onClick={() => updateCellB(r, c, cell + 1)}
                          className="p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded text-slate-600"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="text-3xl font-light text-indigo-400 -ml-1 select-none">]</div>
          </div>
          <p className="text-[9px] text-amber-600 dark:text-amber-400 mt-2 font-semibold font-mono">
            Sélection : Colonne {selectedResultCell.c + 1} de B
          </p>
        </div>

        {/* Equal sign */}
        <div className="lg:col-span-1 flex items-center justify-center font-bold text-slate-400 text-2xl">
          =
        </div>

        {/* Matrice Résultat C */}
        <div className="lg:col-span-3 flex flex-col justify-center items-center p-4 bg-indigo-50/20 dark:bg-slate-950/60 rounded-2xl border border-indigo-100/40 dark:border-slate-800">
          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase mb-3 text-center">
            Résultat C (2 x 2)
          </span>
          <div className="flex items-center gap-2">
            <div className="text-4xl font-light text-emerald-400 -mr-1 select-none">[</div>
            <div className="grid grid-cols-2 gap-4">
              {resultMatrix.map((row, r) => 
                row.map((cell, c) => {
                  const isSelected = selectedResultCell.r === r && selectedResultCell.c === c;
                  return (
                    <button 
                      key={`c-${r}-${c}`}
                      onClick={() => setSelectedResultCell({ r, c })}
                      className={`w-12 h-12 rounded-xl border font-mono font-black text-sm flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-emerald-500 text-white border-emerald-400 shadow-md ring-4 ring-emerald-200/50 dark:ring-emerald-950 scale-110' 
                          : 'bg-white border-slate-200 hover:border-emerald-300 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {cell}
                    </button>
                  );
                })
              )}
            </div>
            <div className="text-4xl font-light text-emerald-400 -ml-1 select-none">]</div>
          </div>
          <p className="text-[9px] text-slate-400 mt-3 font-mono text-center">
            Explorez le calcul
          </p>
        </div>
      </div>

      {/* DETAILED EQUATION ZONE */}
      <div className="mt-5 p-4 bg-gradient-to-r from-indigo-50/40 to-emerald-50/20 dark:from-slate-900/60 dark:to-slate-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl">
        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide block mb-1">
          Algorithme : Calcul de C[{selectedResultCell.r + 1}, {selectedResultCell.c + 1}]
        </span>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-xs mt-1">
          <div className="space-y-1">
            <p className="text-slate-600 dark:text-slate-400">
              On glisse la <strong className="text-indigo-600 dark:text-indigo-400">Ligne {selectedResultCell.r + 1}</strong> sur la <strong className="text-amber-600 dark:text-amber-400">Colonne {selectedResultCell.c + 1}</strong> :
            </p>
            <div className="flex flex-wrap items-center gap-1.5 font-mono">
              <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 rounded">
                Ligne {selectedResultCell.r + 1} = ({matrixA[selectedResultCell.r].join(', ')})
              </span>
              <span className="text-slate-400 font-bold">∙</span>
              <span className="px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200 rounded">
                Col {selectedResultCell.c + 1} = ({matrixB.map(b => b[selectedResultCell.c]).join(', ')})
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 flex-1 max-w-lg md:text-right">
            <div className="font-black text-slate-800 dark:text-slate-100 font-mono flex flex-wrap gap-1 items-center md:justify-end">
              <span className="text-indigo-600 dark:text-indigo-400">Produit =</span>
              <span>
                ({matrixA[selectedResultCell.r][0]} × {matrixB[0][selectedResultCell.c]}) + ({matrixA[selectedResultCell.r][1]} × {matrixB[1][selectedResultCell.c]}) + ({matrixA[selectedResultCell.r][2]} × {matrixB[2][selectedResultCell.c]})
              </span>
            </div>
            <div className="text-xs font-mono mt-1 text-slate-500">
              = {matrixA[selectedResultCell.r][0] * matrixB[0][selectedResultCell.c]} + {matrixA[selectedResultCell.r][1] * matrixB[1][selectedResultCell.c]} + ({matrixA[selectedResultCell.r][2] * matrixB[2][selectedResultCell.c]})
              <span className="text-emerald-500 font-black text-xs md:text-sm ml-2">
                = {resultMatrix[selectedResultCell.r][selectedResultCell.c]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT 2: INTERACTIVE MATRIX INVERSE (2x2)
// ============================================================================
export const MatrixInverseVisualizer: React.FC = () => {
  const [matrixX, setMatrixX] = useState<number[][]>([
    [3, 2],
    [1, 2]
  ]);

  const computedDet = useMemo(() => {
    const a = matrixX[0][0];
    const b = matrixX[0][1];
    const c = matrixX[1][0];
    const d = matrixX[1][1];
    return a * d - b * c;
  }, [matrixX]);

  const updateCellX = (r: number, c: number, val: number) => {
    const next = matrixX.map((row, ri) => 
      row.map((cell, ci) => (ri === r && ci === c ? Math.max(-9, Math.min(9, val)) : cell))
    );
    setMatrixX(next);
  };

  return (
    <div id="matrix-inverse-visualizer" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl shadow-indigo-100/40 dark:shadow-none mt-6">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
        <span className="p-1 px-2 bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-mono font-black">det(M)</span>
        <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
          Calculateur Pivot : Déterminant & Inverse
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* User Matrice 2x2 */}
        <div className="md:col-span-5 flex flex-col justify-center items-center p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-3">
            Matrice de départ M
          </span>
          <div className="flex items-center gap-2">
            <div className="text-4xl font-light text-amber-500 -mr-1 select-none">[</div>
            <div className="grid grid-cols-2 gap-4">
              {matrixX.map((row, r) => 
                row.map((cell, c) => (
                  <div 
                    key={`x-inv-${r}-${c}`}
                    className="flex flex-col items-center p-1.5 bg-white border border-slate-200 hover:border-amber-300 dark:bg-slate-900 dark:border-slate-800 rounded-xl transition-all"
                  >
                    <span className="font-mono text-sm font-black">{cell}</span>
                    <div className="flex gap-1 mt-1">
                      <button 
                        onClick={() => updateCellX(r, c, cell - 1)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded text-slate-600"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <button 
                        onClick={() => updateCellX(r, c, cell + 1)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded text-slate-600"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="text-4xl font-light text-amber-500 -ml-1 select-none">]</div>
          </div>
        </div>

        {/* Mathematical logic outputs */}
        <div className="md:col-span-7 space-y-4">
          {/* Determinant Card */}
          <div className="p-4 bg-amber-50/40 border border-amber-100/50 dark:bg-slate-950/20 dark:border-slate-800 rounded-2xl">
            <span className="text-[10px] uppercase font-mono font-black text-amber-600 block mb-1">
              Étape 1 : Calcul du Déterminant
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Formule de la croix : {"det(M) = ad - bc"}.
            </p>
            <div className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-1.5">
              det(M) = ({matrixX[0][0]} × {matrixX[1][1]}) - ({matrixX[0][1]} × {matrixX[1][0]}) 
              = {matrixX[0][0] * matrixX[1][1]} - {matrixX[0][1] * matrixX[1][0]}
              <span className="font-black text-amber-600 text-sm md:text-base ml-2">
                = {computedDet}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">
              {computedDet === 0 
                ? "❌ Le déterminant vaut pile 0. Matrice NON INVERSIBLE !" 
                : "✅ Le déterminant est non nul. Matrice INVERSIBLE."}
            </p>
          </div>

          {/* Inverted Matrix Output Card */}
          <div className="p-4 bg-emerald-50/20 dark:bg-slate-950/60 border border-emerald-100/40 dark:border-slate-800 rounded-2xl">
            <span className="text-[10px] uppercase font-mono font-black text-emerald-600 block mb-1">
              Étape 2 : Construction de M⁻¹
            </span>
            {computedDet !== 0 ? (
              <div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  On échange la diagonale principale <strong className="font-mono">({matrixX[0][0]} et {matrixX[1][1]})</strong>, 
                  on inverse le signe des autres <strong className="font-mono">({-matrixX[0][1]} et {-matrixX[1][0]})</strong>, 
                  et on divise par dét = <strong className="font-mono">{computedDet}</strong> :
                </p>
                
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-mono font-bold text-slate-500">M⁻¹ =</span>
                  <div className="text-xl font-light text-emerald-400 -mr-1 select-none">[</div>
                  <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs font-bold text-slate-800 dark:text-slate-100">
                    <div className="p-1 px-2 border border-slate-100 dark:border-slate-800 rounded bg-white dark:bg-slate-900">
                      {(matrixX[1][1] / computedDet).toFixed(2)}
                    </div>
                    <div className="p-1 px-2 border border-slate-100 dark:border-slate-800 rounded bg-white dark:bg-slate-900">
                      {(-matrixX[0][1] / computedDet).toFixed(2)}
                    </div>
                    <div className="p-1 px-2 border border-slate-100 dark:border-slate-800 rounded bg-white dark:bg-slate-900">
                      {(-matrixX[1][0] / computedDet).toFixed(2)}
                    </div>
                    <div className="p-1 px-2 border border-slate-100 dark:border-slate-800 rounded bg-white dark:bg-slate-900">
                      {(matrixX[0][0] / computedDet).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-xl font-light text-emerald-400 -ml-1 select-none">]</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-rose-500 font-bold p-1">
                La division par 0 est proscrite ! Inversion impossible.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT 3: GRAPH & ADJACENCY MATRIX EXPLORER (4 NODES)
// ============================================================================
export const GraphAdjacencyVisualizer: React.FC = () => {
  const [edges, setEdges] = useState<{ [key: string]: boolean }>({
    '0-1': true,  // A -> B
    '1-2': true,  // B -> C
    '2-3': true,  // C -> D
    '3-0': true,  // D -> A
    '1-3': true,  // B -> D
    '0-2': false,
    '2-0': false,
    '3-1': false,
    '2-1': false,
    '0-3': false,
    '1-0': false,
    '3-2': false,
  });

  const [pathLength, setPathLength] = useState<number>(1);
  const [selectedPathCell, setSelectedPathCell] = useState<{ from: number; to: number } | null>(null);

  const adjacencyMatrix = useMemo(() => {
    const M = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (edges[`${i}-${j}`]) {
          M[i][j] = 1;
        }
      }
    }
    return M;
  }, [edges]);

  const powerMatrix = useMemo(() => {
    return matrixPower(adjacencyMatrix, pathLength);
  }, [adjacencyMatrix, pathLength]);

  const toggleEdge = (from: number, to: number) => {
    const key = `${from}-${to}`;
    setEdges(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const nodeLabels = ['A', 'B', 'C', 'D'];
  const nodeCoords = [
    { x: 90, y: 70 },   // A - Top Left
    { x: 230, y: 70 },  // B - Top Right
    { x: 230, y: 210 }, // C - Bottom Right
    { x: 90, y: 210 },  // D - Bottom Left
  ];

  const findPathsOfLength = (from: number, to: number, length: number): number[][] => {
    const paths: number[][] = [];
    
    const search = (current: number, currentPath: number[]) => {
      if (currentPath.length === length + 1) {
        if (current === to) {
          paths.push([...currentPath]);
        }
        return;
      }
      for (let next = 0; next < 4; next++) {
        if (edges[`${current}-${next}`]) {
          search(next, [...currentPath, next]);
        }
      }
    };

    search(from, [from]);
    return paths;
  };

  const currentHighlightedPaths = useMemo(() => {
    if (!selectedPathCell) return [];
    return findPathsOfLength(selectedPathCell.from, selectedPathCell.to, pathLength);
  }, [selectedPathCell, edges, pathLength]);

  return (
    <div id="graph-adjacency-visualizer" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl shadow-slate-100/50 dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
      <div className="lg:col-span-12 border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
        <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span className="p-1 px-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-mono">{"M^k"}</span>
          Chemins & Puissances de Matrices
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Modifiez le graphe en connectant les nœuds, puis bougez le niveau de puissance pour calculer automatiquement le nombre de chemins de longueur k !
        </p>
      </div>

      {/* LEFT COMPONENT: GRAPH CANVAS */}
      <div className="lg:col-span-5 flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80">
        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 text-center">
          Visualisation Graphe (Modifiable)
        </span>

        <div className="flex justify-center my-4 overflow-visible">
          <svg width="300" height="260" className="overflow-visible select-none">
            <defs>
              <marker
                id="arrow-std"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
              </marker>
              <marker
                id="arrow-green"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            {/* Draw Edges */}
            {Array.from({ length: 4 }).map((_, f) => 
              Array.from({ length: 4 }).map((_, t) => {
                if (!edges[`${f}-${t}`]) return null;
                const fromNode = nodeCoords[f];
                const toNode = nodeCoords[t];

                // If self loop
                if (f === t) {
                  return (
                    <path
                      key={`edge-lg-${f}`}
                      d={`M ${fromNode.x - 10} ${fromNode.y - 10} C ${fromNode.x - 25} ${fromNode.y - 35}, ${fromNode.x + 25} ${fromNode.y - 35}, ${fromNode.x + 10} ${fromNode.y - 10}`}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      markerEnd="url(#arrow-std)"
                    />
                  );
                }

                const hasReverse = edges[`${t}-${f}`];
                const dx = toNode.x - fromNode.x;
                const dy = toNode.y - fromNode.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const nx = -dy / dist;
                const ny = dx / dist;

                const offset = hasReverse ? 12 : 0;
                const x1 = fromNode.x + nx * offset;
                const y1 = fromNode.y + ny * offset;
                const x2 = toNode.x + nx * offset;
                const y2 = toNode.y + ny * offset;

                // Highlight paths
                let isHighlighted = false;
                if (currentHighlightedPaths.length > 0) {
                  isHighlighted = currentHighlightedPaths.some(p => {
                    for (let pi = 0; pi < p.length - 1; pi++) {
                      if (p[pi] === f && p[pi+1] === t) return true;
                    }
                    return false;
                  });
                }

                return (
                  <g key={`edge-g-${f}-${t}`}>
                    <title>{`Arc de ${nodeLabels[f]} vers ${nodeLabels[t]}`}</title>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isHighlighted ? "#10b981" : "#6366f1"}
                      strokeWidth={isHighlighted ? "4" : "1.8"}
                      markerEnd={isHighlighted ? "url(#arrow-green)" : "url(#arrow-std)"}
                    />
                    <circle
                      cx={(x1 + x2) / 2}
                      cy={(y1 + y2) / 2}
                      r="6.5"
                      fill="white"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                      className="cursor-pointer hover:stroke-rose-500 hover:fill-rose-50"
                      onClick={() => toggleEdge(f, t)}
                    />
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 + 2.5}
                      fontSize="7"
                      fontWeight="bold"
                      fill="#ef4444"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      ×
                    </text>
                  </g>
                );
              })
            )}

            {/* Draw Nodes */}
            {nodeCoords.map((node, i) => {
              const active = selectedPathCell && (selectedPathCell.from === i || selectedPathCell.to === i);
              return (
                <g key={`node-g-${i}`}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="16"
                    fill={active ? '#ecfdf5' : 'white'}
                    stroke={active ? '#10b981' : '#6366f1'}
                    strokeWidth={active ? '3' : '2'}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    fontSize="11"
                    fontWeight="black"
                    textAnchor="middle"
                    fill="#1e1b4b"
                  >
                    {nodeLabels[i]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="text-[9px] text-slate-400 text-center font-mono">
          Appuyez sur <span className="text-red-500">×</span> pour couper un lien.
        </p>
      </div>

      {/* RIGHT COMPONENT: MATRICES EXPLAINER */}
      <div className="lg:col-span-7 flex flex-col justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Adjacency Matrix */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] font-mono font-black text-indigo-500 block mb-2 leading-none">
              Matrice d'Adjacence M
            </span>
            <div className="flex items-center justify-center gap-1">
              <div className="text-3xl font-light text-indigo-400">[</div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 justify-center mb-1">
                  <span className="w-6"></span>
                  {nodeLabels.map(l => (
                    <span key={`l-head-${l}`} className="w-6 text-center text-[9px] font-mono font-bold text-slate-400">{l}</span>
                  ))}
                </div>
                {adjacencyMatrix.map((row, r) => (
                  <div key={`m-row-${r}`} className="flex items-center gap-1">
                    <span className="w-5 text-right text-[10px] font-mono font-bold text-slate-400 pr-1">{nodeLabels[r]}</span>
                    {row.map((cell, c) => (
                      <button
                        key={`cell-m-${r}-${c}`}
                        onClick={() => toggleEdge(r, c)}
                        className={`w-6 h-6 rounded font-mono text-[10px] font-bold transition-all flex items-center justify-center ${
                          cell === 1 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-white border text-slate-300 dark:bg-slate-900'
                        }`}
                      >
                        {cell}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-3xl font-light text-indigo-400">]</div>
            </div>
          </div>

          {/* Adjacency Power Matrix */}
          <div className="p-3 bg-emerald-50/10 dark:bg-slate-950/40 border border-emerald-100/40 dark:border-slate-800 rounded-xl">
            <span className="text-[10px] font-mono font-black text-emerald-600 block mb-2 leading-none">
              Puissance M^{pathLength}
            </span>
            <div className="flex items-center justify-center gap-1">
              <div className="text-3xl font-light text-emerald-400">[</div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 justify-center mb-1">
                  <span className="w-6"></span>
                  {nodeLabels.map(l => (
                    <span key={`l-pow-v-${l}`} className="w-6 text-center text-[9px] font-mono font-bold text-slate-400">{l}</span>
                  ))}
                </div>
                {powerMatrix.map((row, r) => (
                  <div key={`mpow-row-${r}`} className="flex items-center gap-1">
                    <span className="w-5 text-right text-[10px] font-mono font-bold text-slate-400 pr-1">{nodeLabels[r]}</span>
                    {row.map((cell, c) => {
                      const isSelected = selectedPathCell && selectedPathCell.from === r && selectedPathCell.to === c;
                      return (
                        <button
                          key={`cell-pow-${r}-${c}`}
                          onClick={() => setSelectedPathCell({ from: r, to: c })}
                          className={`w-6 h-6 rounded font-mono text-[10px] font-bold transition-all flex items-center justify-center ${
                            cell > 0 
                              ? isSelected
                                ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                                : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                              : 'bg-white border text-slate-300 dark:bg-slate-900'
                          }`}
                        >
                          {cell}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="text-3xl font-light text-emerald-400">]</div>
            </div>
          </div>
        </div>

        {/* Level selection slider */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 rounded-xl">
          <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
            <strong>Niveau de recherche (k) :</strong>
            <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-bold">
              k = {pathLength} (longueur)
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="3" 
            value={pathLength} 
            onChange={(e) => {
              setPathLength(parseInt(e.target.value));
              setSelectedPathCell(null);
            }}
            className="w-full accent-indigo-600 h-1 rounded"
          />
        </div>

        {/* Trace zone */}
        <div className="p-3 border border-slate-100 rounded-xl bg-slate-50 flex-1 flex flex-col justify-center text-xs dark:bg-slate-900/60">
          {selectedPathCell ? (
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-300">
                Liaisons de {nodeLabels[selectedPathCell.from]} → {nodeLabels[selectedPathCell.to]} :{' '}
                <span className="text-emerald-500 font-bold">{powerMatrix[selectedPathCell.from][selectedPathCell.to]}</span> chemin(s) de taille {pathLength}
              </p>
              {currentHighlightedPaths.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentHighlightedPaths.map((p, ix) => (
                    <span 
                      key={`path-tr-${ix}`}
                      className="text-[9px] font-mono border bg-white text-indigo-700 font-bold px-1.5 py-0.5 rounded"
                    >
                      {p.map(s => nodeLabels[s]).join('→')}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[9px] text-rose-500 mt-1">Aucun chemin trouvé.</p>
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-center text-[11px]">
              Touchez un nombre dans la matrice <strong className="text-emerald-500">M^k</strong> pour tracer les chemins sur le graphe !
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
