import React, { useState, useRef } from 'react';

export default function ComplexPlane({ alt }: { alt?: string }) {
  const [point, setPoint] = useState({ x: 280, y: 120 }); // initial coordinates in SVG space (center at 200, 200)
  const [snapToUnit, setSnapToUnit] = useState(false);
  const [showRoots, setShowRoots] = useState<number | null>(null); // null, 3, 4, 6
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const center = 200;
  const scale = 100; // 1 unit = 100px

  // Calculate math values
  const realRaw = (point.x - center) / scale;
  const imagRaw = -(point.y - center) / scale; // SVG y grows downwards

  let r = Math.sqrt(realRaw * realRaw + imagRaw * imagRaw);
  let theta = Math.atan2(imagRaw, realRaw);
  if (theta < 0) theta += 2 * Math.PI;

  let real = realRaw;
  let imag = imagRaw;

  if (snapToUnit) {
    r = 1.0;
    real = Math.cos(theta);
    imag = Math.sin(theta);
    // update point coordinates to stay exactly on the circle
    point.x = center + real * scale;
    point.y = center - imag * scale;
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    if (svgRef.current) {
      svgRef.current.setPointerCapture(e.pointerId);
      updatePoint(e);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updatePoint(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    if (svgRef.current) {
      svgRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const updatePoint = (e: React.PointerEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert from pixel space to coordinates
    let x = Math.max(20, Math.min(380, clientX));
    let y = Math.max(20, Math.min(380, clientY));

    if (snapToUnit) {
      const rx = (x - center) / scale;
      const ry = -(y - center) / scale;
      const dist = Math.sqrt(rx * rx + ry * ry);
      if (dist > 0.05) {
        let th = Math.atan2(ry, rx);
        x = center + Math.cos(th) * scale;
        y = center - Math.sin(th) * scale;
      } else {
        x = center + scale;
        y = center;
      }
    }

    setPoint({ x, y });
  };

  const handleRootClick = (n: number) => {
    if (showRoots === n) {
      setShowRoots(null);
    } else {
      setShowRoots(n);
      setSnapToUnit(true);
      // set point to the first non-trivial root
      const angle = (2 * Math.PI) / n;
      setPoint({
        x: center + Math.cos(angle) * scale,
        y: center - Math.sin(angle) * scale
      });
    }
  };

  // Render N-th roots of unity
  const renderRootsOfUnity = () => {
    if (!showRoots) return null;
    const roots = [];
    for (let k = 0; k < showRoots; k++) {
      const angle = (2 * Math.PI * k) / showRoots;
      const rx = center + Math.cos(angle) * scale;
      const ry = center - Math.sin(angle) * scale;
      roots.push(
        <g key={k}>
          <line
            x1={center}
            y1={center}
            x2={rx}
            y2={ry}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx={rx} cy={ry} r="5" fill="#10b981" />
          <text
            x={rx + Math.cos(angle) * 15}
            y={ry - Math.sin(angle) * 15 + 5}
            fontSize="11"
            fontFamily="monospace"
            fill="#047857"
            fontWeight="bold"
            textAnchor="middle"
          >
            w_{k}
          </text>
        </g>
      );
    }
    return roots;
  };

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-indigo-100 shadow-xl border border-slate-100 overflow-hidden font-sans">
      <div className="p-5 bg-gradient-to-r from-indigo-50 to-slate-50 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">{alt || "Le Plan Complexe Interactif"}</h3>
        <p className="text-sm text-slate-500">
          Glissez le point <span className="text-rose-500 font-bold font-mono">z</span> pour explorer ses multiples formes géométriques et trigonométriques.
        </p>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="relative w-full max-w-md bg-slate-50 rounded-xl border border-slate-200/60 p-2 mb-6 touch-none">
          <svg
            ref={svgRef}
            width="100%"
            viewBox="0 0 400 400"
            className="w-full h-auto cursor-crosshair select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            aria-label="Plan complexe interactif avec cercle unité"
            role="img"
          >
            {/* Grid axis lines */}
            <g stroke="#e2e8f0" strokeWidth="1" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
              ))}
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
              ))}
            </g>

            {/* Main Axes */}
            <line x1="20" y1="200" x2="380" y2="200" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="200" y1="380" x2="200" y2="20" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="375" y="190" className="text-xs font-mono font-bold fill-slate-500">Re(z)</text>
            <text x="210" y="30" className="text-xs font-mono font-bold fill-slate-500">Im(z)</text>

            {/* Unit circle */}
            <circle
              cx={center}
              cy={center}
              r={scale}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray={snapToUnit ? "none" : "4 4"}
              className="transition-all duration-300"
              opacity={snapToUnit ? 0.9 : 0.4}
            />

            {/* Angle sector arc */}
            {r > 0.1 && (
              <path
                d={`M ${center + 30} ${center} A 30 30 0 ${theta > Math.PI ? 1 : 0} 0 ${center + 30 * Math.cos(theta)} ${center - 30 * Math.sin(theta)}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />
            )}
            <text
              x={center + 40 * Math.cos(theta / 2)}
              y={center - 40 * Math.sin(theta / 2) + 4}
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#d97706"
              textAnchor="middle"
            >
              θ
            </text>

            {/* Roots of Unity points if visible */}
            {renderRootsOfUnity()}

            {/* Real and Imaginary projections */}
            <line
              x1={point.x}
              y1={point.y}
              x2={point.x}
              y2={center}
              stroke="#ec4899"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1={point.x}
              y1={point.y}
              x2={center}
              y2={point.y}
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Vector from origin to z */}
            <line
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#4f46e5"
              strokeWidth="3"
            />

            {/* Draggable point z */}
            <circle
              cx={point.x}
              cy={point.y}
              r="10"
              fill="#f43f5e"
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer shadow-md filter drop-shadow hover:scale-125 transition-transform"
              tabIndex={0}
              aria-label={`Nombre complexe z, partie réelle ${real.toFixed(2)}, imaginaire ${imag.toFixed(2)}`}
            />
            <text
              x={point.x + 12}
              y={point.y - 12}
              fontSize="16"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#e11d48"
            >
              z
            </text>

            {/* Origin */}
            <circle cx={center} cy={center} r="4" fill="#475569" />
            <text x={center - 15} y={center + 15} fontSize="12" fontFamily="monospace" fill="#475569">0</text>
            <text x={center + scale - 5} y={center + 18} fontSize="12" fontFamily="monospace" fill="#475569" fontWeight="bold">1</text>
            <text x={center - 15} y={center - scale + 5} fontSize="12" fontFamily="monospace" fill="#475569" fontWeight="bold">i</text>
          </svg>
        </div>

        {/* Interactive Controls Panel */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Options</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={snapToUnit}
                  onChange={(e) => setSnapToUnit(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Contraindre au cercle unité (Rayon = 1)
              </label>

              <div className="pt-2">
                <span className="text-xs text-slate-500 block mb-1">Visualiser les Racines de l'Unité :</span>
                <div className="flex gap-2">
                  {[3, 4, 6].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleRootClick(n)}
                      className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                        showRoots === n
                          ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                          : "bg-slate-200/60 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      n = {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 text-slate-100 rounded-xl font-mono text-sm shadow-inner flex flex-col justify-between">
            <div>
              <div className="flex justify-between border-b border-slate-700 pb-1 mb-1.5">
                <span className="text-slate-400">Rayon (Module r) :</span>
                <span className="text-indigo-400 font-bold">{r.toFixed(3)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-1 mb-1.5">
                <span className="text-slate-400">Angle (Argument θ) :</span>
                <span className="text-amber-400 font-bold">
                  {(theta).toFixed(3)} rad ({Math.round((theta * 180) / Math.PI)}°)
                </span>
              </div>
            </div>
            
            <div className="space-y-1 pt-2">
              <div className="text-xs text-slate-400">Formes du nombre complexe :</div>
              <div className="text-xs">
                Algébrique: <span className="text-pink-400 font-bold">z = {real.toFixed(2)} + {imag.toFixed(2)}i</span>
              </div>
              <div className="text-xs leading-tight">
                Trigonométrique: <span className="text-blue-400">z = {r.toFixed(2)}(cos θ + i sin θ)</span>
              </div>
              <div className="text-xs">
                Exponentielle: <span className="text-indigo-400 font-bold">z = {r.toFixed(2)} e^(i {real >= 0 && imag >= 0 ? theta.toFixed(2) : `(${theta.toFixed(2)})`})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
