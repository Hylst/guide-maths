import React, { useState, useRef } from 'react';

export default function LinearTransform({ alt }: { alt?: string }) {
  // Coordinates of basis vector i (mapped to matrix column 1)
  const [vecI, setVecI] = useState({ x: 1, y: 0 }); // math coords (originally 1, 0)
  // Coordinates of basis vector j (mapped to matrix column 2)
  const [vecJ, setVecJ] = useState({ x: 0, y: 1 }); // math coords (originally 0, 1)
  const [activeHandle, setActiveHandle] = useState<'i' | 'j' | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const center = 200;
  const scale = 80; // 1 unit = 80px

  const det = vecI.x * vecJ.y - vecI.y * vecJ.x;

  // Convert math coords to SVG screen coords
  const toSvgX = (mx: number) => center + mx * scale;
  const toSvgY = (my: number) => center - my * scale; // SVG Y is inverted

  // Convert SVG screen coords to math coords
  const toMathX = (svgX: number) => (svgX - center) / scale;
  const toMathY = (svgY: number) => -(svgY - center) / scale;

  const handlePointerDown = (handle: 'i' | 'j', e: React.PointerEvent) => {
    setActiveHandle(handle);
    if (svgRef.current) {
      svgRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeHandle || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    // Constrain to SVG area boundary
    const x = Math.max(10, Math.min(390, rawX));
    const y = Math.max(10, Math.min(390, rawY));

    const mx = Math.round(toMathX(x) * 10) / 10;
    const my = Math.round(toMathY(y) * 10) / 10;

    if (activeHandle === 'i') {
      setVecI({ x: mx, y: my });
    } else {
      setVecJ({ x: mx, y: my });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeHandle && svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
    setActiveHandle(null);
  };

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'identity':
        setVecI({ x: 1, y: 0 });
        setVecJ({ x: 0, y: 1 });
        break;
      case 'rotation45':
        // Rotates 45deg: cos(45) = 0.7, sin(45) = 0.7
        setVecI({ x: 0.7, y: 0.7 });
        setVecJ({ x: -0.7, y: 0.7 });
        break;
      case 'shear':
        setVecI({ x: 1, y: 0 });
        setVecJ({ x: 1, y: 1 });
        break;
      case 'flip':
        setVecI({ x: -1, y: 0 });
        setVecJ({ x: 0, y: 1 });
        break;
      case 'degenerate':
        setVecI({ x: 1, y: 1 });
        setVecJ({ x: -1, y: -1 });
        break;
      case 'projection':
        setVecI({ x: 1, y: 0 });
        setVecJ({ x: 0, y: 0 });
        break;
    }
  };

  // Original grid coordinates to draw deformed shapes and grid
  const gridRange = [-2, -1, 0, 1, 2];

  // Helper to map any 2D point via the transformation matrix
  const transformPoint = (x: number, y: number) => {
    // x' = x * ix + y * jx
    // y' = x * iy + y * jy
    return {
      x: x * vecI.x + y * vecJ.x,
      y: x * vecI.y + y * vecJ.y,
    };
  };

  // Base shape (F-shaped outline) to clearly visualize skew/transformations
  const shapePoints = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 0.3 },
    { x: 0.3, y: 0.3 },
    { x: 0.3, y: 0.7 },
    { x: 0.8, y: 0.7 },
    { x: 0.8, y: 1.0 },
    { x: 0.3, y: 1.0 },
    { x: 0.3, y: 1.3 },
    { x: 1.0, y: 1.3 },
    { x: 1.0, y: 1.6 },
    { x: 0, y: 1.6 },
  ];

  const transformedPointsString = shapePoints
    .map((pt) => {
      const trans = transformPoint(pt.x, pt.y);
      return `${toSvgX(trans.x)},${toSvgY(trans.y)}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Simulation Screen */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          GLISSE LES GRABBERS DES VECTEURS (i ET j) :
        </h4>
        <svg
          ref={svgRef}
          width="400"
          height="400"
          className="border border-slate-200 dark:border-slate-800 bg-card rounded-2xl touch-none cursor-crosshair shadow-md"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Grid lines (Transformed) */}
          {gridRange.map((val) => {
            // Horizontal grid lines (parallel to primary x-axis before deformation)
            // mapped from (-2, val) to (2, val)
            const p1 = transformPoint(-2, val);
            const p2 = transformPoint(2, val);
            // Vertical grid lines (parallel to primary y-axis before deformation)
            // mapped from (val, -2) to (val, 2)
            const p3 = transformPoint(val, -2);
            const p4 = transformPoint(val, 2);

            return (
              <React.Fragment key={val}>
                <line
                  x1={toSvgX(p1.x)}
                  y1={toSvgY(p1.y)}
                  x2={toSvgX(p2.x)}
                  y2={toSvgY(p2.y)}
                  stroke={val === 0 ? '#94a3b8' : '#e2e8f0'}
                  strokeWidth={val === 0 ? 2 : 1}
                  className="dark:stroke-slate-800/80"
                />
                <line
                  x1={toSvgX(p3.x)}
                  y1={toSvgY(p3.y)}
                  x2={toSvgX(p4.x)}
                  y2={toSvgY(p4.y)}
                  stroke={val === 0 ? '#94a3b8' : '#e2e8f0'}
                  strokeWidth={val === 0 ? 2 : 1}
                  className="dark:stroke-slate-800/80"
                />
              </React.Fragment>
            );
          })}

          {/* Transformed Shape 'F' */}
          <polygon
            points={transformedPointsString}
            fill="#a78bfa"
            fillOpacity="0.25"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeDasharray="1"
          />

          {/* Basis Vector j (Green) */}
          <line
            x1={toSvgX(0)}
            y1={toSvgY(0)}
            x2={toSvgX(vecJ.x)}
            y2={toSvgY(vecJ.y)}
            stroke="#10b981"
            strokeWidth="3.5"
          />
          {/* Arrowhead j */}
          <polygon
            points={`${toSvgX(vecJ.x)},${toSvgY(vecJ.y)} ${toSvgX(vecJ.x) - 10 * vecJ.x + 5 * vecJ.y},${toSvgY(vecJ.y) + 10 * vecJ.y + 5 * vecJ.x} ${toSvgX(vecJ.x) - 10 * vecJ.x - 5 * vecJ.y},${toSvgY(vecJ.y) + 10 * vecJ.y - 5 * vecJ.x}`}
            fill="#10b981"
          />

          {/* Basis Vector i (Indigo) */}
          <line
            x1={toSvgX(0)}
            y1={toSvgY(0)}
            x2={toSvgX(vecI.x)}
            y2={toSvgY(vecI.y)}
            stroke="#6366f1"
            strokeWidth="3.5"
          />
          {/* Arrowhead i */}
          <polygon
            points={`${toSvgX(vecI.x)},${toSvgY(vecI.y)} ${toSvgX(vecI.x) - 10 * vecI.x + 5 * vecI.y},${toSvgY(vecI.y) + 10 * vecI.y + 5 * vecI.x} ${toSvgX(vecI.x) - 10 * vecI.x - 5 * vecI.y},${toSvgY(vecI.y) + 10 * vecI.y - 5 * vecI.x}`}
            fill="#6366f1"
          />

          {/* Interactive Drag Handle - Vector i */}
          <circle
            cx={toSvgX(vecI.x)}
            cy={toSvgY(vecI.y)}
            r="10"
            fill="#6366f1"
            className="cursor-pointer active:scale-125 transition-transform stroke-white stroke-2"
            onPointerDown={(e) => handlePointerDown('i', e)}
          />

          {/* Interactive Drag Handle - Vector j */}
          <circle
            cx={toSvgX(vecJ.x)}
            cy={toSvgY(vecJ.y)}
            r="10"
            fill="#10b981"
            className="cursor-pointer active:scale-125 transition-transform stroke-white stroke-2"
            onPointerDown={(e) => handlePointerDown('j', e)}
          />

          {/* Origin dot */}
          <circle cx={center} cy={center} r="4.5" fill="#1e293b" />
        </svg>
      </div>

      {/* Control panel and matrix visualization */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-2 text-foreground">La Matrice 2x2</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Le vecteur colonne de gauche représente de manière univoque la position transformée de {"$\\mathbf{\\vec{i}}$"}. La colonne de droite représente celle de {"$\\mathbf{\\vec{j}}$"}.
          </p>

          {/* Beautiful 2D Matrix display */}
          <div className="flex items-center justify-center gap-4 my-4 font-mono select-none">
            <span className="text-3xl text-slate-400 font-sans">{"$M = $"}</span>
            <div className="border-l-4 border-r-4 border-slate-700 dark:border-slate-300 rounded-lg px-3 py-2 flex gap-6 text-xl relative">
              {/* Bracket indicators */}
              <div className="flex flex-col text-center">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{vecI.x.toFixed(1)}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{vecI.y.toFixed(1)}</span>
              </div>
              <div className="flex flex-col text-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{vecJ.x.toFixed(1)}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{vecJ.y.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Area & Determinant */}
          <div className="bg-white dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs shadow-sm mb-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-text font-medium">Déterminant (Aire signée) :</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded text-sm ${Math.abs(det) < 0.05 ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'}`}>
                {det.toFixed(2)}
              </span>
            </div>
            <div className="text-muted-text leading-normal">
              {Math.abs(det) < 0.05 ? (
                <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                  ⚠️ Forme dégénérée : les vecteurs sont colinéaires ! L'aire est nulle, la matrice est NON-inversible.
                </span>
              ) : det > 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Orientation positive : l'espace conserve son sens horloger d'origine.
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  Orientation négative : l'espace est inversé/miroir (déterminant négatif) !
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <h5 className="font-bold text-xs uppercase tracking-wider text-muted-text mb-2">Préréglages d'ingénierie :</h5>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => applyPreset('identity')}
              className="px-3 py-1.5 bg-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all text-left"
            >
              🚀 Identité (1,0 / 0,1)
            </button>
            <button
              onClick={() => applyPreset('rotation45')}
              className="px-3 py-1.5 bg-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all text-left"
            >
              🔄 Rotation 45°
            </button>
            <button
              onClick={() => applyPreset('shear')}
              className="px-3 py-1.5 bg-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all text-left"
            >
              📐 Cisaillement
            </button>
            <button
              onClick={() => applyPreset('flip')}
              className="px-3 py-1.5 bg-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all text-left"
            >
              🪞 Réflexion (Y)
            </button>
            <button
              onClick={() => applyPreset('projection')}
              className="px-3 py-1.5 bg-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all text-left"
            >
              📉 Projection 1D
            </button>
            <button
              onClick={() => applyPreset('degenerate')}
              className="px-3 py-1.5 bg-card hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 transition-all text-left"
            >
              🚫 Colinéaire (det=0)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
