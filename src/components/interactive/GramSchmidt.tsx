import React, { useState, useRef } from 'react';

export default function GramSchmidt({ alt }: { alt?: string }) {
  // Endpoints for u1 and u2 in math coordinates
  const [u1, setU1] = useState({ x: 2.0, y: 0.5 });
  const [u2, setU2] = useState({ x: 1.0, y: 1.8 });
  const [activeHandle, setActiveHandle] = useState<'u1' | 'u2' | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: input, 1: normalize u1, 2: project u2, 3: orthogonalize v2
  const svgRef = useRef<SVGSVGElement>(null);

  const center = 200;
  const scale = 75; // 1 unit = 75px

  // Helpers to convert coordinates
  const toSvgX = (mx: number) => center + mx * scale;
  const toSvgY = (my: number) => center - my * scale;
  const toMathX = (svgX: number) => (svgX - center) / scale;
  const toMathY = (svgY: number) => -(svgY - center) / scale;

  // Calculs matriciels / vectoriels Gram-Schmidt complets
  const normSqU1 = u1.x * u1.x + u1.y * u1.y;
  const normU1 = Math.sqrt(normSqU1);

  // e1 = u1 / ||u1||
  const e1 = normU1 > 0.05 ? { x: u1.x / normU1, y: u1.y / normU1 } : { x: 1, y: 0 };

  // dot product <u2, e1>
  const dotU2E1 = u2.x * e1.x + u2.y * e1.y;

  // Project u2 on e1 = <u2, e1> * e1
  const projU2 = {
    x: dotU2E1 * e1.x,
    y: dotU2E1 * e1.y,
  };

  // v2 = u2 - projU2
  const v2 = {
    x: u2.x - projU2.x,
    y: u2.y - projU2.y,
  };

  const normV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  
  // e2 = v2 / ||v2||
  const e2 = normV2 > 0.05 ? { x: v2.x / normV2, y: v2.y / normV2 } : { x: -e1.y, y: e1.x };

  // Pointer move handlers
  const handlePointerDown = (handle: 'u1' | 'u2', e: React.PointerEvent) => {
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

    // Constrain inside boundaries
    const x = Math.max(15, Math.min(385, rawX));
    const y = Math.max(15, Math.min(385, rawY));

    const mx = Math.round(toMathX(x) * 10) / 10;
    const my = Math.round(toMathY(y) * 10) / 10;

    if (activeHandle === 'u1') {
      setU1({ x: mx, y: my });
    } else {
      setU2({ x: mx, y: my });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeHandle && svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
    setActiveHandle(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl mx-auto my-6 text-foreground">
      {/* Visual Workspace */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="font-bold text-sm mb-2 text-primary font-mono select-none">
          GLISSE LES EXTRÉMITÉS DES VECTEURS INDÉPENDANTS :
        </h4>

        <svg
          ref={svgRef}
          width="400"
          height="400"
          className="border border-slate-200 dark:border-slate-800 bg-card rounded-2xl touch-none cursor-crosshair shadow-md"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Base Grid Circles for vector norms */}
          <circle cx={center} cy={center} r={scale} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" className="dark:stroke-slate-800" />
          <circle cx={center} cy={center} r={2 * scale} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" className="dark:stroke-slate-800" />

          {/* Core Cartesian Axis */}
          <line x1="20" y1={center} x2="380" y2={center} stroke="#cbd5e1" strokeWidth="1.5" className="dark:stroke-slate-800" />
          <line x1={center} y1="20" x2={center} y2="380" stroke="#cbd5e1" strokeWidth="1.5" className="dark:stroke-slate-800" />

          {/* Step 2 & 3: Projection guidelines */}
          {currentStep >= 2 && (
            <>
              {/* Line linking u2 with its orthogonal projection on u1 */}
              <line
                x1={toSvgX(u2.x)}
                y1={toSvgY(u2.y)}
                x2={toSvgX(projU2.x)}
                y2={toSvgY(projU2.y)}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              {/* Projection point marker */}
              <circle cx={toSvgX(projU2.x)} cy={toSvgY(projU2.y)} r="4" fill="#6366f1" />
              {/* Label for projection dot */}
              <text x={toSvgX(projU2.x) - 10} y={toSvgY(projU2.y) + 18} fontSize="10" className="font-mono font-bold fill-indigo-600 dark:fill-indigo-400">
                proj
              </text>
            </>
          )}

          {/* Basis vector u1 (Default Blue-Indigo) */}
          <line
            x1={center}
            y1={center}
            x2={toSvgX(u1.x)}
            y2={toSvgY(u1.y)}
            stroke="#3b82f6"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <polygon
            points={`${toSvgX(u1.x)},${toSvgY(u1.y)} ${toSvgX(u1.x) - 10 * e1.x + 5 * e1.y},${toSvgY(u1.y) + 10 * e1.y + 5 * e1.x} ${toSvgX(u1.x) - 10 * e1.x - 5 * e1.y},${toSvgY(u1.y) + 10 * e1.y - 5 * e1.x}`}
            fill="#3b82f6"
          />
          <text x={toSvgX(u1.x) + 8} y={toSvgY(u1.y) - 8} fontSize="13" className="font-mono font-bold fill-blue-600">
            u₁
          </text>

          {/* Basis vector u2 (Emerald) */}
          <line
            x1={center}
            y1={center}
            x2={toSvgX(u2.x)}
            y2={toSvgY(u2.y)}
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Arrowhead u2 */}
          <line x1={center} y1={center} x2={toSvgX(u2.x)} y2={toSvgY(u2.y)} stroke="#10b981" strokeWidth="3" />
          <circle cx={toSvgX(u2.x)} cy={toSvgY(u2.y)} r="2" fill="#10b981" />
          <text x={toSvgX(u2.x) + 8} y={toSvgY(u2.y) - 8} fontSize="13" className="font-mono font-bold fill-emerald-600">
            u₂
          </text>

          {/* Step 1: Draw unit vector e1 on top when step >= 1 */}
          {currentStep >= 1 && (
            <>
              <line
                x1={center}
                y1={center}
                x2={toSvgX(e1.x)}
                y2={toSvgY(e1.y)}
                stroke="#6366f1"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx={toSvgX(e1.x)} cy={toSvgY(e1.y)} r="5" fill="#f43f5e" />
              <text x={toSvgX(e1.x) - 15} y={toSvgY(e1.y) - 14} fontSize="12" className="font-mono font-bold fill-rose-600">
                e₁ (Unitaire)
              </text>
            </>
          )}

          {/* Step 3: Draw normalized e2 on top when step >= 3 */}
          {currentStep >= 3 && (
            <>
              {/* orthogonal vector before normalization v2 */}
              <line
                x1={center}
                y1={center}
                x2={toSvgX(v2.x)}
                y2={toSvgY(v2.y)}
                stroke="#a78bfa"
                strokeWidth="3"
                strokeDasharray="2,2"
              />
              {/* Unit vector e2 (orthogonal) */}
              <line
                x1={center}
                y1={center}
                x2={toSvgX(e2.x)}
                y2={toSvgY(e2.y)}
                stroke="#ec4899"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <circle cx={toSvgX(e2.x)} cy={toSvgY(e2.y)} r="5" fill="#f43f5e" />
              <text x={toSvgX(e2.x) + 12} y={toSvgY(e2.y) + 4} fontSize="12" className="font-mono font-bold fill-pink-600">
                e₂ (Ortho)
              </text>

              {/* Angle indicator (square arc) showing orthogonality of u1/e1 and e2 */}
              <polygon
                points={`${center},${center} ${center + 14 * e1.x},${center - 14 * e1.y} ${center + 14 * e1.x + 14 * e2.x},${center - 14 * e1.y - 14 * e2.y} ${center + 14 * e2.x},${center - 14 * e2.y}`}
                fill="#f43f5e"
                fillOpacity="0.15"
                stroke="#ec4899"
                strokeWidth="1"
              />
            </>
          )}

          {/* Draggable handles at endpoints of vectors u1 and u2 */}
          <circle
            cx={toSvgX(u1.x)}
            cy={toSvgY(u1.y)}
            r="9"
            fill="#3b82f6"
            className="cursor-pointer active:scale-120 transition-transform stroke-white stroke-2 shadow"
            onPointerDown={(e) => handlePointerDown('u1', e)}
          />
          <circle
            cx={toSvgX(u2.x)}
            cy={toSvgY(u2.y)}
            r="9"
            fill="#10b981"
            className="cursor-pointer active:scale-120 transition-transform stroke-white stroke-2 shadow"
            onPointerDown={(e) => handlePointerDown('u2', e)}
          />

          {/* Coordinate system center dot */}
          <circle cx={center} cy={center} r="4.5" fill="#1e293b" />
        </svg>
      </div>

      {/* Control Panel / Math Steps */}
      <div className="w-full md:w-80 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-lg mb-1 text-foreground">Procédé de Gram-Schmidt</h4>
          <p className="text-xs text-muted-text mb-4 leading-normal">
            Prend une base arbitraire {"$(u_1, u_2)$"} et la redresse géométriquement en une base orthonormée parfaite {"$(e_1, e_2)$"} :
          </p>

          {/* Interactive Steps Buttons */}
          <div className="space-y-1.5 mb-4">
            <button
              onClick={() => setCurrentStep(0)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold text-left border flex items-center justify-between cursor-pointer ${
                currentStep === 0 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>0. Base initials {"$(u_1, u_2)$"}</span>
            </button>
            <button
              onClick={() => setCurrentStep(1)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold text-left border flex items-center justify-between cursor-pointer ${
                currentStep === 1 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>1. Normaliser {"$u_1 \\to e_1$"}</span>
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold text-left border flex items-center justify-between cursor-pointer ${
                currentStep === 2 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>2. Projection de {"$u_2$"} sur {"$e_1$"}</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold text-left border flex items-center justify-between cursor-pointer ${
                currentStep === 3 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-card border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>3. Soustraire & Normaliser {"$\\to e_2$"}</span>
            </button>
          </div>

          {/* Math logs / Formula feedback */}
          <div className="bg-white dark:bg-slate-800/60 p-3.5 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs space-y-2 leading-relaxed font-mono">
            {currentStep === 0 && (
              <>
                <div className="text-blue-600 font-bold">Vecteur u₁ : ({u1.x.toFixed(1)}, {u1.y.toFixed(1)})</div>
                <div className="text-emerald-600 font-bold">Vecteur u₂ : ({u2.x.toFixed(1)}, {u2.y.toFixed(1)})</div>
                <div className="text-muted-text text-[11px] pt-1">
                  Les vecteurs ne sont pas perpendiculaires. Produit scalaire {"$\\langle u_1, u_2 \\rangle = $"} {(u1.x * u2.x + u1.y * u2.y).toFixed(2)}. Il faut les redresser !
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div className="text-indigo-600 font-bold">||u₁|| = {normU1.toFixed(3)}</div>
                <div className="text-rose-600 font-bold">e₁ = u₁/||u₁|| = ({e1.x.toFixed(3)}, {e1.y.toFixed(3)})</div>
                <div className="text-muted-text text-[11px] pt-1">
                  On normalise le premier vecteur pour qu'il soit de norme égale à 1. Son module vaut maintenant {"$||e_1|| = 1$"}.
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="text-indigo-600 font-bold">Projeté scalaire : {dotU2E1.toFixed(3)}</div>
                <div className="text-rose-600 font-bold">proj = ({projU2.x.toFixed(2)}, {projU2.y.toFixed(2)})</div>
                <div className="text-muted-text text-[11px] pt-1">
                  On projette le vecteur {"$u_2$"} sur l'axe formé par {"$e_1$"}. La partie colinéaire vaut {"$\\langle u_2, e_1 \\rangle e_1$"}.
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="text-purple-600 font-bold">v₂ = u₂ - proj = ({v2.x.toFixed(2)}, {v2.y.toFixed(2)})</div>
                <div className="text-pink-600 font-bold">e₂ = v₂/||v₂|| = ({e2.x.toFixed(3)}, {e2.y.toFixed(3)})</div>
                <div className="text-muted-text text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800 mt-2">
                  Victoire ! {"$\\langle e_1, e_2 \\rangle = 0.00$"} (Orthogonaux), et {"$||e1||=1$"}, {"$||e2||=1$"}. Nous avons bâti une **base orthonormée** parfaite de l'espace.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Reset coordinates */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setU1({ x: 2.0, y: 0.0 });
              setU2({ x: 1.0, y: 1.5 });
              setCurrentStep(0);
            }}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-xl active:scale-95 transition-all text-center cursor-pointer"
          >
            🔄 Réinitialiser les vecteurs
          </button>
        </div>
      </div>
    </div>
  );
}
