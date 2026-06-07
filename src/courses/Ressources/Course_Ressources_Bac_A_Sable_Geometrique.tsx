import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  Info, 
  Zap, 
  RefreshCw, 
  HelpCircle,
  Eye,
  Settings,
  Grid,
  TrendingUp,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Move
} from 'lucide-react';
import { CourseHeader, InfoBlock, TipBanner, Section, InteractiveExercise, Quiz, Flashcard } from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

// Vector interface
interface GeomPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

interface GeomVector {
  id: string;
  name: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
}

export default function Course_Ressources_Bac_A_Sable_Geometrique() {
  // State for points and vectors
  const [points, setPoints] = useState<GeomPoint[]>([
    { id: 'pt_a', name: 'A', x: 2, y: 3, color: '#3b82f6' }, // Blue
    { id: 'pt_b', name: 'B', x: -3, y: 1, color: '#10b981' }, // Emerald
    { id: 'pt_c', name: 'C', x: 4, y: -2, color: '#ec4899' }, // Pink
  ]);

  const [vectors, setVectors] = useState<GeomVector[]>([
    { id: 'vec_u', name: 'u', startX: 0, startY: 0, endX: 3, endY: 2, color: '#6366f1' }, // Indigo
    { id: 'vec_v', name: 'v', startX: 0, startY: 0, endX: -2, endY: 4, color: '#f59e0b' }, // Amber
  ]);

  // Viewport configuration
  const gridRange = 8; // -8 to 8 for x and y
  const canvasSize = 460;
  const padding = 30;
  const plotSize = canvasSize - padding * 2;

  // Tools & snapping
  const [activeTab, setActiveTab] = useState<'objects' | 'operations' | 'matrices' | 'help'>('objects');
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [selectedTool, setSelectedTool] = useState<'select' | 'add_point'>('select');

  // New point form
  const [newPtName, setNewPtName] = useState<string>('');
  const [newPtX, setNewPtX] = useState<number>(0);
  const [newPtY, setNewPtY] = useState<number>(0);
  const [newPtColor, setNewPtColor] = useState<string>('#3b82f6');

  // New vector form
  const [newVecName, setNewVecName] = useState<string>('');
  const [newVecStartX, setNewVecStartX] = useState<number>(0);
  const [newVecStartY, setNewVecStartY] = useState<number>(0);
  const [newVecEndX, setNewVecEndX] = useState<number>(3);
  const [newVecEndY, setNewVecEndY] = useState<number>(1);
  const [newVecColor, setNewVecColor] = useState<string>('#a855f7');

  // Vector operations tab state
  const [opVec1Id, setOpVec1Id] = useState<string>('vec_u');
  const [opVec2Id, setOpVec2Id] = useState<string>('vec_v');
  const [showSum, setShowSum] = useState<boolean>(false);
  const [collinearCheck, setCollinearCheck] = useState<boolean>(true);

  // Matrix Transformation tab state
  const [matrixA, setMatrixA] = useState<number>(1.5);
  const [matrixB, setMatrixB] = useState<number>(0);
  const [matrixC, setMatrixC] = useState<number>(0.5);
  const [matrixD, setMatrixD] = useState<number>(1);
  const [showTransformedGrid, setShowTransformedGrid] = useState<boolean>(true);

  // Int Drag system
  const [draggedObjectId, setDraggedObjectId] = useState<{ type: 'point' | 'vector_head' | 'vector_tail'; id: string } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Coordinate Conversion helper
  const toCanvasX = (mathX: number) => {
    return padding + ((mathX + gridRange) / (gridRange * 2)) * plotSize;
  };

  const toCanvasY = (mathY: number) => {
    // Math Y moves up, SVG Y moves down
    return padding + ((gridRange - mathY) / (gridRange * 2)) * plotSize;
  };

  const toMathX = (canvasX: number) => {
    const rawVal = -gridRange + ((canvasX - padding) / plotSize) * (gridRange * 2);
    return Math.max(-gridRange, Math.min(gridRange, rawVal));
  };

  const toMathY = (canvasY: number) => {
    const rawVal = gridRange - ((canvasY - padding) / plotSize) * (gridRange * 2);
    return Math.max(-gridRange, Math.min(gridRange, rawVal));
  };

  // Convert points and vectors to coordinate strings
  const snapValue = (val: number) => {
    return snapToGrid ? Math.round(val) : parseFloat(val.toFixed(1));
  };

  // Dynamic next letter name generator
  const getNextPointName = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const used = points.map(p => p.name);
    for (let char of letters) {
      if (!used.includes(char)) return char;
    }
    return `P${points.length + 1}`;
  };

  // Auto initialize default naming
  useEffect(() => {
    setNewPtName(getNextPointName());
    setNewVecName(`w`);
  }, [points]);

  // Click on Grid handler
  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTool !== 'add_point' || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const mathX = snapValue(toMathX(clickX));
    const mathY = snapValue(toMathY(clickY));

    const pointName = getNextPointName();
    const newPt: GeomPoint = {
      id: `pt_${Date.now()}`,
      name: pointName,
      x: mathX,
      y: mathY,
      color: points.length % 3 === 0 ? '#3b82f6' : points.length % 3 === 1 ? '#ec4899' : '#10b981'
    };

    setPoints([...points, newPt]);
    setSelectedTool('select');
  };

  // Drag listeners
  const handleMouseDown = (type: 'point' | 'vector_head' | 'vector_tail', id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggedObjectId({ type, id });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedObjectId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const mathX = snapValue(toMathX(mouseX));
    const mathY = snapValue(toMathY(mouseY));

    if (draggedObjectId.type === 'point') {
      setPoints(prev => prev.map(pt => pt.id === draggedObjectId.id ? { ...pt, x: mathX, y: mathY } : pt));
    } else if (draggedObjectId.type === 'vector_head') {
      setVectors(prev => prev.map(v => v.id === draggedObjectId.id ? { ...v, endX: mathX, endY: mathY } : v));
    } else if (draggedObjectId.type === 'vector_tail') {
      setVectors(prev => prev.map(v => v.id === draggedObjectId.id ? { ...v, startX: mathX, startY: mathY } : v));
    }
  };

  const handleMouseUp = () => {
    setDraggedObjectId(null);
  };

  // Touch triggers for tablets/phones
  const handleTouchStart = (type: 'point' | 'vector_head' | 'vector_tail', id: string, e: React.TouchEvent) => {
    e.stopPropagation();
    setDraggedObjectId({ type, id });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedObjectId || !svgRef.current || e.touches.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;

    const mathX = snapValue(toMathX(touchX));
    const mathY = snapValue(toMathY(touchY));

    if (draggedObjectId.type === 'point') {
      setPoints(prev => prev.map(pt => pt.id === draggedObjectId.id ? { ...pt, x: mathX, y: mathY } : pt));
    } else if (draggedObjectId.type === 'vector_head') {
      setVectors(prev => prev.map(v => v.id === draggedObjectId.id ? { ...v, endX: mathX, endY: mathY } : v));
    } else if (draggedObjectId.type === 'vector_tail') {
      setVectors(prev => prev.map(v => v.id === draggedObjectId.id ? { ...v, startX: mathX, startY: mathY } : v));
    }
  };

  // Quick form actions
  const addPointHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPtName.trim()) return;
    const p: GeomPoint = {
      id: `pt_${Date.now()}`,
      name: newPtName,
      x: snapValue(newPtX),
      y: snapValue(newPtY),
      color: newPtColor
    };
    setPoints([...points, p]);
    setNewPtX(0);
    setNewPtY(0);
  };

  const addVectorHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVecName.trim()) return;
    const v: GeomVector = {
      id: `vec_${Date.now()}`,
      name: newVecName,
      startX: snapValue(newVecStartX),
      startY: snapValue(newVecStartY),
      endX: snapValue(newVecEndX),
      endY: snapValue(newVecEndY),
      color: newVecColor
    };
    setVectors([...vectors, v]);
    setNewVecStartX(0);
    setNewVecStartY(0);
  };

  const deletePoint = (id: string) => {
    setPoints(points.filter(pt => pt.id !== id));
  };

  const deleteVector = (id: string) => {
    setVectors(vectors.filter(v => v.id !== id));
  };

  const loadPresetTransform = (preset: string) => {
    switch(preset) {
      case 'rot_90':
        setMatrixA(0); setMatrixB(-1); setMatrixC(1); setMatrixD(0);
        break;
      case 'rot_45':
        setMatrixA(0.7); setMatrixB(-0.7); setMatrixC(0.7); setMatrixD(0.7);
        break;
      case 'scale_2':
        setMatrixA(2); setMatrixB(0); setMatrixC(0); setMatrixD(2);
        break;
      case 'scale_half':
        setMatrixA(0.5); setMatrixB(0); setMatrixC(0); setMatrixD(0.5);
        break;
      case 'shear_x':
        setMatrixA(1); setMatrixB(1); setMatrixC(0); setMatrixD(1);
        break;
      case 'sym_y':
        setMatrixA(-1); setMatrixB(0); setMatrixC(0); setMatrixD(1);
        break;
      case 'projection':
        setMatrixA(1); setMatrixB(0); setMatrixC(0); setMatrixD(0);
        break;
      default:
        setMatrixA(1); setMatrixB(0); setMatrixC(0); setMatrixD(1);
    }
  };

  // Computations for Operations Tab
  const activeV1 = vectors.find(v => v.id === opVec1Id);
  const activeV2 = vectors.find(v => v.id === opVec2Id);

  // Math coordinates of selected vectors (u = end - start)
  const mathU = activeV1 ? { x: activeV1.endX - activeV1.startX, y: activeV1.endY - activeV1.startY } : { x: 0, y: 0 };
  const mathV = activeV2 ? { x: activeV2.endX - activeV2.startX, y: activeV2.endY - activeV2.startY } : { x: 0, y: 0 };

  // u + v math coordinates
  const mathSum = { x: mathU.x + mathV.x, y: mathU.y + mathV.y };

  // Determinant: x_u * y_v - x_v * y_u
  const determinantValue = mathU.x * mathV.y - mathV.x * mathU.y;
  const isCollinear = Math.abs(determinantValue) < 0.001;

  // Render variables
  const gridLines = [];
  for (let i = -gridRange; i <= gridRange; i++) {
    gridLines.push(i);
  }

  return (
    <div className="max-w-6xl mx-auto pb-16 px-4 space-y-10 selection:bg-indigo-500 selection:text-white">
      <CourseHeader 
        acronym="GEO-GEO"
        title="Bac à Sable Géométrique"
        subtitle="Un mini cabinet d'exploration intégrant le tracé de droites, d'études vectorielles et d'effets de transformations matricielles en 2D."
        duration="Outil interactif"
      />

      <Section title="1. Console Interactive de Géométrie Vectorielle" color="indigo" icon={<Sliders className="text-indigo-500 w-5 h-5"/>}>
      {/* Intro explain banner */}
      <TipBanner 
        type="info"
        title="Astuce de manipulation"
      >
        Fais glisser directement les points ou les sommets de tes vecteurs dans le canvas pour les déplacer en temps réel sur la grille !
      </TipBanner>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE CANVAS GRID (Cols 1 to 7) */}
        <div className="lg:col-span-7 bg-card p-4 rounded-[2rem] border border-border-strong shadow-sm space-y-4">
          
          <div className="flex items-center justify-between px-2 bg-muted/40 p-3 rounded-2xl border border-border-strong">
            <div className="flex items-center gap-2">
              <Grid className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-extrabold text-xs uppercase tracking-wider text-foreground">Plan Cartésien Interactif</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSnapToGrid(!snapToGrid)}
                className={`px-3 py-1.5 rounded-xl text-3xs font-extrabold transition-all border ${
                  snapToGrid 
                    ? 'bg-primary border-primary-light text-white shadow-sm' 
                    : 'bg-card border-border-strong text-muted-text hover:text-foreground'
                }`}
              >
                🧲 Aimant Grille : {snapToGrid ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => {
                  setPoints([
                    { id: 'pt_a', name: 'A', x: 2, y: 3, color: '#3b82f6' },
                    { id: 'pt_b', name: 'B', x: -3, y: 1, color: '#10b981' },
                    { id: 'pt_c', name: 'C', x: 4, y: -2, color: '#ec4899' },
                  ]);
                  setVectors([
                    { id: 'vec_u', name: 'u', startX: 0, startY: 0, endX: 3, endY: 2, color: '#6366f1' },
                    { id: 'vec_v', name: 'v', startX: 0, startY: 0, endX: -2, endY: 4, color: '#f59e0b' },
                  ]);
                  setMatrixA(1.5); setMatrixB(0); setMatrixC(0.5); setMatrixD(1);
                  setShowSum(false);
                }}
                className="p-1.5 hover:bg-rose-500/10 hover:text-rose-500 border border-border-strong rounded-xl text-muted-text bg-card transition-all"
                title="Remettre tout à zéro"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* THE SVG CANVAS */}
          <div className="relative aspect-square w-full select-none flex items-center justify-center p-0.5 rounded-2xl bg-muted/20 border border-border-strong/50 overflow-hidden">
            <svg
              id="geo_sandbox_canvas"
              ref={svgRef}
              viewBox={`0 0 ${canvasSize} ${canvasSize}`}
              className="w-full h-full cursor-crosshair touch-none"
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              <defs>
                {/* Arrow markers for vectors */}
                {points.map(p => (
                  <marker
                    key={`arrow_${p.id}`}
                    id={`arrow_${p.id}`}
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={p.color} />
                  </marker>
                ))}
                {vectors.map(v => (
                  <marker
                    key={`arrow_${v.id}`}
                    id={`arrow_${v.id}`}
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={v.color} />
                  </marker>
                ))}
                
                {/* Special markers */}
                <marker id="arrow_sum" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
                </marker>
                <marker id="arrow_u" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                </marker>
                <marker id="arrow_v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>

              {/* Grid Lines */}
              {gridLines.map(line => {
                const isAxis = line === 0;
                return (
                  <g key={`grid_${line}`}>
                    {/* Vertical line */}
                    <line
                      x1={toCanvasX(line)}
                      y1={padding}
                      x2={toCanvasX(line)}
                      y2={canvasSize - padding}
                      stroke={isAxis ? 'var(--foreground)' : 'var(--border-strong)'}
                      strokeWidth={isAxis ? 1.5 : 0.5}
                      strokeOpacity={isAxis ? 0.7 : 0.4}
                    />
                    {/* Horizontal line */}
                    <line
                      x1={padding}
                      y1={toCanvasY(line)}
                      x2={canvasSize - padding}
                      y2={toCanvasY(line)}
                      stroke={isAxis ? 'var(--foreground)' : 'var(--border-strong)'}
                      strokeWidth={isAxis ? 1.5 : 0.5}
                      strokeOpacity={isAxis ? 0.7 : 0.4}
                    />
                    
                    {/* Labels for Axis */}
                    {!isAxis && (
                      <>
                        <text
                          x={toCanvasX(line)}
                          y={toCanvasY(0) + 14}
                          className="text-[9px] font-mono fill-muted-text/80 font-bold"
                          textAnchor="middle"
                        >
                          {line}
                        </text>
                        <text
                          x={toCanvasX(0) - 10}
                          y={toCanvasY(line) + 3}
                          className="text-[9px] font-mono fill-muted-text/80 font-bold"
                          textAnchor="end"
                        >
                          {line}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Origin Circle */}
              <circle
                cx={toCanvasX(0)}
                cy={toCanvasY(0)}
                r="3.5"
                className="fill-foreground opacity-60"
              />

              {/* Draw original points to make selection or visualize */}
              {points.map(pt => (
                <g key={`pt_group_${pt.id}`}>
                  {/* Subtle hover projection lines to coordinate axes */}
                  <line
                    x1={toCanvasX(pt.x)}
                    y1={toCanvasY(pt.y)}
                    x2={toCanvasX(pt.x)}
                    y2={toCanvasY(0)}
                    stroke={pt.color}
                    strokeDasharray="2 3"
                    strokeOpacity="0.3"
                  />
                  <line
                    x1={toCanvasX(pt.x)}
                    y1={toCanvasY(pt.y)}
                    x2={toCanvasX(0)}
                    y2={toCanvasY(pt.y)}
                    stroke={pt.color}
                    strokeDasharray="2 3"
                    strokeOpacity="0.3"
                  />

                  {/* Interactivité : The draggable dot */}
                  <circle
                    cx={toCanvasX(pt.x)}
                    cy={toCanvasY(pt.y)}
                    r="6.5"
                    fill={pt.color}
                    className="hover:scale-125 transition-transform duration-100 cursor-grab"
                    onMouseDown={(e) => handleMouseDown('point', pt.id, e)}
                    onTouchStart={(e) => handleTouchStart('point', pt.id, e)}
                  />

                  {/* The name label */}
                  <text
                    x={toCanvasX(pt.x) + 10}
                    y={toCanvasY(pt.y) - 8}
                    className="text-2xs font-bold font-sans fill-foreground bg-card"
                  >
                    {pt.name} ({pt.x};{pt.y})
                  </text>
                </g>
              ))}

              {/* Draw regular Vectors */}
              {vectors.map(v => (
                <g key={`vec_group_${v.id}`}>
                  {/* The body line */}
                  <line
                    x1={toCanvasX(v.startX)}
                    y1={toCanvasY(v.startY)}
                    x2={toCanvasX(v.endX)}
                    y2={toCanvasY(v.endY)}
                    stroke={v.color}
                    strokeWidth="3.5"
                    markerEnd={`url(#arrow_${v.id})`}
                  />

                  {/* Interactive Tails & Head handles */}
                  {/* Tail handler (only if from 0,0 you don't care, but dragging can attach anywhere) */}
                  <circle
                    cx={toCanvasX(v.startX)}
                    cy={toCanvasY(v.startY)}
                    r="4.5"
                    fill="var(--background)"
                    stroke={v.color}
                    strokeWidth="1.5"
                    className="cursor-grab"
                    onMouseDown={(e) => handleMouseDown('vector_tail', v.id, e)}
                    onTouchStart={(e) => handleTouchStart('vector_tail', v.id, e)}
                  />

                  {/* Head drag target */}
                  <circle
                    cx={toCanvasX(v.endX)}
                    cy={toCanvasY(v.endY)}
                    r="8"
                    fill="transparent"
                    stroke={v.color}
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    className="cursor-pointer hover:stroke-foreground transition-colors"
                    onMouseDown={(e) => handleMouseDown('vector_head', v.id, e)}
                    onTouchStart={(e) => handleTouchStart('vector_head', v.id, e)}
                  />

                  {/* Vector label */}
                  <text
                    x={toCanvasX((v.startX + v.endX) / 2) + 8}
                    y={toCanvasY((v.startY + v.endY) / 2) - 8}
                    className="text-[10px] font-bold fill-foreground"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  >
                    vec {v.name} ({v.endX - v.startX}; {v.endY - v.startY})
                  </text>
                </g>
              ))}

              {/* Operations Layer: Show Vector Sum Triangle rule */}
              {activeTab === 'operations' && showSum && activeV1 && activeV2 && (
                <g key="layer_operations_sum">
                  {/* Copy of v2 attached to head of u */}
                  <line
                    x1={toCanvasX(activeV1.endX)}
                    y1={toCanvasY(activeV1.endY)}
                    x2={toCanvasX(activeV1.endX + mathV.x)}
                    y2={toCanvasY(activeV1.endY + mathV.y)}
                    stroke={activeV2.color}
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    markerEnd="url(#arrow_v)"
                  />
                  {/* Copy of u attached to head of v */}
                  <line
                    x1={toCanvasX(activeV2.endX)}
                    y1={toCanvasY(activeV2.endY)}
                    x2={toCanvasX(activeV2.endX + mathU.x)}
                    y2={toCanvasY(activeV2.endY + mathU.y)}
                    stroke={activeV1.color}
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    markerEnd="url(#arrow_u)"
                  />

                  {/* The RESULT vector: u + v starting from (startX of u) to (endX of u + mathV.x) */}
                  <line
                    x1={toCanvasX(activeV1.startX)}
                    y1={toCanvasY(activeV1.startY)}
                    x2={toCanvasX(activeV1.startX + mathSum.x)}
                    y2={toCanvasY(activeV1.startY + mathSum.y)}
                    stroke="#8b5cf6" // Purple
                    strokeWidth="4"
                    markerEnd="url(#arrow_sum)"
                  />

                  <text
                    x={toCanvasX(activeV1.startX + mathSum.x / 2) - 15}
                    y={toCanvasY(activeV1.startY + mathSum.y / 2) + 15}
                    className="text-2xs font-black fill-purple-600 dark:fill-purple-400 uppercase tracking-wide bg-card"
                  >
                    u + v ({mathSum.x}; {mathSum.y})
                  </text>
                </g>
              )}

              {/* Matrices Layer: Applied matrix visualization (Dynamic preview of mapped points) */}
              {activeTab === 'matrices' && (
                <g key="layer_matrix_transform">
                  {/* Linear transformed grid in light dotted overlay to visualize deformation! */}
                  {showTransformedGrid && (
                    <g opacity="0.15">
                      {gridLines.map(line => {
                        const startLeft = { x: -gridRange, y: line };
                        const endRight = { x: gridRange, y: line };
                        
                        // Apply matrix multiplication
                        const startLeftPrime = {
                          x: matrixA * startLeft.x + matrixB * startLeft.y,
                          y: matrixC * startLeft.x + matrixD * startLeft.y,
                        };
                        const endRightPrime = {
                          x: matrixA * endRight.x + matrixB * endRight.y,
                          y: matrixC * endRight.x + matrixD * endRight.y,
                        };

                        return (
                          <line
                            key={`grid_trans_h_${line}`}
                            x1={toCanvasX(startLeftPrime.x)}
                            y1={toCanvasY(startLeftPrime.y)}
                            x2={toCanvasX(endRightPrime.x)}
                            y2={toCanvasY(endRightPrime.y)}
                            stroke="#6366f1"
                            strokeWidth="1.2"
                          />
                        );
                      })}

                      {gridLines.map(line => {
                        const startBottom = { x: line, y: -gridRange };
                        const endTop = { x: line, y: gridRange };

                        const startBottomPrime = {
                          x: matrixA * startBottom.x + matrixB * startBottom.y,
                          y: matrixC * startBottom.x + matrixD * startBottom.y,
                        };
                        const endTopPrime = {
                          x: matrixA * endTop.x + matrixB * endTop.y,
                          y: matrixC * endTop.x + matrixD * endTop.y,
                        };

                        return (
                          <line
                            key={`grid_trans_v_${line}`}
                            x1={toCanvasX(startBottomPrime.x)}
                            y1={toCanvasY(startBottomPrime.y)}
                            x2={toCanvasX(endTopPrime.x)}
                            y2={toCanvasY(endTopPrime.y)}
                            stroke="#6366f1"
                            strokeWidth="1.2"
                          />
                        );
                      })}
                    </g>
                  )}

                  {/* Transformed Points mapping */}
                  {points.map(pt => {
                    const xPrime = matrixA * pt.x + matrixB * pt.y;
                    const yPrime = matrixC * pt.x + matrixD * pt.y;

                    // Bound mapped value for drawing safely
                    const drawX = Math.max(-10, Math.min(10, xPrime));
                    const drawY = Math.max(-10, Math.min(10, yPrime));

                    return (
                      <g key={`pt_transformed_${pt.id}`}>
                        {/* Soft guide from original point to transformed point */}
                        <line
                          x1={toCanvasX(pt.x)}
                          y1={toCanvasY(pt.y)}
                          x2={toCanvasX(drawX)}
                          y2={toCanvasY(drawY)}
                          stroke="#6366f1"
                          strokeDasharray="1 3"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />

                        {/* Transformed node target */}
                        <circle
                          cx={toCanvasX(drawX)}
                          cy={toCanvasY(drawY)}
                          r="5.5"
                          fill="none"
                          stroke="#ff00a0"
                          strokeWidth="2.5"
                        />

                        <text
                          x={toCanvasX(drawX) + 8}
                          y={toCanvasY(drawY) + 12}
                          className="text-[9px] font-mono font-black italic fill-emerald-600 dark:fill-emerald-400"
                        >
                          {pt.name}' ({xPrime.toFixed(1)}; {yPrime.toFixed(1)})
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

            </svg>
          </div>

          <div className="flex gap-2 text-[11px] justify-between text-muted-text font-bold uppercase px-2 font-mono">
            <span>Repère : -8 &lt; x &lt; 8</span>
            <span>Unité : 1 carreau = 1</span>
            <span>Y-max : 8</span>
          </div>
        </div>

        {/* RIGHT COLUMN: CONFIGURATOR STATS (Cols 8 to 12) */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          
          {/* Navigation Tab selection inside Right Panel */}
          <div className="flex bg-muted/75 p-1 rounded-2xl border border-border-strong gap-1 text-xs font-bold leading-normal">
            <button
              onClick={() => setActiveTab('objects')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'objects' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-text hover:text-foreground hover:bg-card/45'
              }`}
            >
              <Move className="w-4 h-4" /> Objets
            </button>
            <button
              onClick={() => setActiveTab('operations')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'operations' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-text hover:text-foreground hover:bg-card/45'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Vecteurs
            </button>
            <button
              onClick={() => setActiveTab('matrices')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'matrices' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-text hover:text-foreground hover:bg-card/45'
              }`}
            >
              <Sliders className="w-4 h-4" /> Transformations
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'help' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-text hover:text-foreground hover:bg-card/45'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> Aide
            </button>
          </div>

          {/* TAB 1: OBJECTS LIST & CONSTRUCTOR */}
          {activeTab === 'objects' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Creator Forms split */}
              <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-4">
                <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wide flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-primary" /> Placer un Point
                </h3>

                <form onSubmit={addPointHandler} className="grid grid-cols-2 gap-3 pb-3 border-b border-border/50">
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Nom</label>
                    <input
                      type="text"
                      className="w-full bg-muted text-foreground px-3 py-1.5 rounded-xl text-xs font-bold border border-border-strong outline-none"
                      value={newPtName}
                      onChange={(e) => setNewPtName(e.target.value.toUpperCase().slice(0, 3))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Couleur</label>
                    <input
                      type="color"
                      className="w-full bg-muted h-7 p-0.5 rounded-xl border border-border-strong outline-none"
                      value={newPtColor}
                      onChange={(e) => setNewPtColor(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Abscisse (X)</label>
                    <input
                      type="number"
                      min={-gridRange}
                      max={gridRange}
                      className="w-full bg-muted text-foreground px-3 py-1.5 rounded-xl text-xs font-bold border border-border-strong outline-none"
                      value={newPtX}
                      onChange={(e) => setNewPtX(parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Ordonnée (Y)</label>
                    <input
                      type="number"
                      min={-gridRange}
                      max={gridRange}
                      className="w-full bg-muted text-foreground px-3 py-1.5 rounded-xl text-xs font-bold border border-border-strong outline-none"
                      value={newPtY}
                      onChange={(e) => setNewPtY(parseFloat(e.target.value))}
                    />
                  </div>
                  <button
                    type="submit"
                    className="col-span-2 bg-primary dark:bg-primary px-3 py-2 text-3xs font-black uppercase text-white rounded-xl hover:bg-primary-hover transition-all"
                  >
                    Placer le Point {newPtName} ( {newPtX} ; {newPtY} )
                  </button>
                </form>

                <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wide flex items-center gap-1.5 pt-1">
                  <Plus className="w-4 h-4 text-primary" /> Placer un Vecteur
                </h3>

                <form onSubmit={addVectorHandler} className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Nom</label>
                    <input
                      type="text"
                      className="w-full bg-muted text-foreground px-3 py-1.5 rounded-xl text-xs font-bold border border-border-strong outline-none"
                      value={newVecName}
                      onChange={(e) => setNewVecName(e.target.value.toLowerCase().slice(0, 3))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Couleur</label>
                    <input
                      type="color"
                      className="w-full bg-muted h-7 p-0.5 rounded-xl border border-border-strong outline-none"
                      value={newVecColor}
                      onChange={(e) => setNewVecColor(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Tête X (Fin)</label>
                    <input
                      type="number"
                      min={-gridRange}
                      max={gridRange}
                      className="w-full bg-muted text-foreground px-3 py-1.5 rounded-xl text-xs font-bold border border-border-strong outline-none"
                      value={newVecEndX}
                      onChange={(e) => setNewVecEndX(parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs uppercase tracking-wider font-extrabold text-muted-text">Tête Y (Fin)</label>
                    <input
                      type="number"
                      min={-gridRange}
                      max={gridRange}
                      className="w-full bg-muted text-foreground px-3 py-1.5 rounded-xl text-xs font-bold border border-border-strong outline-none"
                      value={newVecEndY}
                      onChange={(e) => setNewVecEndY(parseFloat(e.target.value))}
                    />
                  </div>
                  <button
                    type="submit"
                    className="col-span-2 bg-indigo-500 px-3 py-2 text-3xs font-black uppercase text-white rounded-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-1.5"
                  >
                    Construire le Vecteur <MathComponent math={"\\vec{" + newVecName + "}"} />
                  </button>
                </form>
              </div>

              {/* View/Delete Existing list */}
              <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-3">
                <span className="text-[10px] uppercase font-mono font-black text-muted-text">Éléments du bac à sable</span>
                
                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                  {points.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 bg-muted/40 rounded-xl border border-border-strong/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="font-semibold text-xs text-foreground">Point {p.name}</span>
                        <span className="font-mono text-xs text-muted-text">({p.x} ; {p.y})</span>
                      </div>
                      <button
                        onClick={() => deletePoint(p.id)}
                        className="p-1 hover:text-rose-500 rounded bg-card hover:bg-rose-500/10 transition-colors border border-border-strong"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {vectors.map(v => (
                    <div key={v.id} className="flex items-center justify-between p-2.5 bg-muted/40 rounded-xl border border-border-strong/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-1.5 rounded" style={{ backgroundColor: v.color }} />
                        <span className="font-semibold text-xs text-foreground">Vecteur {v.name}</span>
                        <span className="font-mono text-xs text-muted-text-subtle ml-2">
                          <MathComponent math={"\\vec{" + v.name + "} \\begin{pmatrix} " + (v.endX - v.startX) + " \\\\ " + (v.endY - v.startY) + " \\end{pmatrix}"} />
                        </span>
                      </div>
                      <button
                        onClick={() => deleteVector(v.id)}
                        className="p-1 hover:text-rose-500 rounded bg-card hover:bg-rose-500/10 transition-colors border border-border-strong"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {points.length === 0 && vectors.length === 0 && (
                    <p className="text-xs text-center text-muted-text py-4">Aucun point ou vecteur créé.</p>
                  )}
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: VECTOR SUMS & COLLINEARITY LAB */}
          {activeTab === 'operations' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-mono font-black text-muted-text">Somme Vectorielle (Chasles)</span>
                
                <p className="text-xs text-muted-text">
                  Sélectionne deux vecteurs existants pour tracer leur relation de somme géométrique de bout-à-bout :
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-3xs font-extrabold text-muted-text uppercase">Vecteur u</label>
                    <select
                      className="w-full bg-muted text-foreground text-xs font-bold px-2 py-1.5 rounded-xl border border-border-strong outline-none"
                      value={opVec1Id}
                      onChange={(e) => setOpVec1Id(e.target.value)}
                    >
                      {vectors.map(v => (
                        <option key={v.id} value={v.id}>Vecteur {v.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-3xs font-extrabold text-muted-text uppercase">Vecteur v</label>
                    <select
                      className="w-full bg-muted text-foreground text-xs font-bold px-2 py-1.5 rounded-xl border border-border-strong outline-none"
                      value={opVec2Id}
                      onChange={(e) => setOpVec2Id(e.target.value)}
                    >
                      {vectors.map(v => (
                        <option key={v.id} value={v.id}>Vecteur {v.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-border-strong/60">
                  <div className="flex items-center gap-2">
                    <input 
                      id="checkbox_sum"
                      type="checkbox" 
                      className="w-4 h-4 text-primary bg-muted rounded border-border-strong"
                      checked={showSum}
                      onChange={(e) => setShowSum(e.target.checked)}
                    />
                    <label htmlFor="checkbox_sum" className="text-xs font-bold text-foreground">
                      Tracer u + v dans le plan 🟣
                    </label>
                  </div>
                </div>

                {showSum && activeV1 && activeV2 && (
                  <div className="bg-muted p-4 rounded-2xl space-y-2 border border-border-strong/60">
                    <h5 className="text-xs font-black uppercase tracking-wide text-foreground flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Somme calculée :
                    </h5>
                    <div className="text-xs space-y-1 text-muted-text font-mono">
                      <div>Vecteur u : ({mathU.x} ; {mathU.y})</div>
                      <div>Vecteur v : ({mathV.x} ; {mathV.y})</div>
                      <div className="font-extrabold text-foreground pt-1 border-t border-border mt-1">
                        Résultat u+v : ({mathSum.x} ; {mathSum.y})
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Collinearity Card */}
              <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-mono font-black text-muted-text">Test de Colinéarité</span>

                {activeV1 && activeV2 ? (
                  <div className="space-y-4">
                    <p className="text-xs text-muted-text flex items-center flex-wrap gap-1">
                      Deux vecteurs <MathComponent math="\\vec{u}" /> et <MathComponent math="\\vec{v}" /> sont colinéaires si et seulement si leur déterminant est égal à 0.
                    </p>

                    <div className="p-4 bg-muted/65 rounded-2xl border border-border-strong/50 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="text-xs">
                        <MathComponent math="\\det(\\vec{u}, \\vec{v}) = x_u y_v - x_v y_u" />
                      </div>
                      
                      <div className="text-sm font-black font-mono text-foreground flex items-center justify-center gap-1.5">
                        <span>Calcul :</span>
                        <MathComponent math={"" + mathU.x + " \\times " + mathV.y + " - " + mathU.y + " \\times " + mathV.x + " = " + determinantValue} />
                      </div>

                      {isCollinear ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full border border-emerald-200/50">
                          <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" /> Les vecteurs sont Colinéaires !
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-full border border-rose-200/50">
                          <AlertTriangle className="w-3.5 h-3.5" /> Non colinéaires (Det ≠ 0)
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-muted-text-subtle font-medium italic text-center">
                      💡 Astuce : Déplace la pointe des flèches sur le plan géométrique pour voir le déterminant s'approcher de zéro.
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-text">Crée au moins deux vecteurs pour tester leur colinéarité.</p>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: MATRIX TRANSFORMATIONS */}
          {activeTab === 'matrices' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-4">
                <span className="text-[10px] uppercase font-mono font-black text-muted-text">Transformations Linéaires 2D</span>
                <p className="text-xs text-muted-text flex items-center flex-wrap gap-1">
                  Règle les coefficients de la matrice de transformation <MathComponent math="M = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" /> pour déformer l'espace 2D en temps réel :
                </p>

                {/* Matrix layout sliders or input */}
                <div className="grid grid-cols-2 gap-4 bg-muted p-4 rounded-2xl border border-border-strong">
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-2xs font-extrabold font-mono text-foreground">
                      <span>a</span>
                      <span>{matrixA.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      className="w-full accent-primary"
                      value={matrixA}
                      onChange={(e) => setMatrixA(parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-2xs font-extrabold font-mono text-foreground">
                      <span>b</span>
                      <span>{matrixB.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      className="w-full accent-primary"
                      value={matrixB}
                      onChange={(e) => setMatrixB(parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-2xs font-extrabold font-mono text-foreground">
                      <span>c</span>
                      <span>{matrixC.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      className="w-full accent-primary"
                      value={matrixC}
                      onChange={(e) => setMatrixC(parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-2xs font-extrabold font-mono text-foreground">
                      <span>d</span>
                      <span>{matrixD.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      className="w-full accent-primary"
                      value={matrixD}
                      onChange={(e) => setMatrixD(parseFloat(e.target.value))}
                    />
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center font-bold text-center text-xs sm:text-sm py-2 gap-2 text-foreground">
                  <span>La matrice appliquée est :</span>
                  <MathComponent math={"M = \\begin{pmatrix} " + matrixA.toFixed(1) + " & " + matrixB.toFixed(1) + " \\\\ " + matrixC.toFixed(1) + " & " + matrixD.toFixed(1) + " \\end{pmatrix}"} />
                </div>

                {/* Presets Grid */}
                <div>
                  <label className="text-3xs uppercase tracking-widest font-extrabold text-muted-text block mb-2">Charger un preset matriciel</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => loadPresetTransform('identity')}
                      className="px-2 py-1 bg-card hover:bg-muted border border-border-strong rounded-xl text-3xs font-extrabold transition-all"
                    >
                      Identité
                    </button>
                    <button
                      onClick={() => loadPresetTransform('rot_90')}
                      className="px-2 py-1 bg-card hover:bg-muted border border-border-strong rounded-xl text-3xs font-extrabold transition-all"
                    >
                      Rot. 90°
                    </button>
                    <button
                      onClick={() => loadPresetTransform('rot_45')}
                      className="px-2 py-1 bg-card hover:bg-muted border border-border-strong rounded-xl text-3xs font-extrabold transition-all"
                    >
                      Rot. 45°
                    </button>
                    <button
                      onClick={() => loadPresetTransform('scale_2')}
                      className="px-2 py-1 bg-card hover:bg-muted border border-border-strong rounded-xl text-3xs font-extrabold transition-all"
                    >
                      Homothétie ×2
                    </button>
                    <button
                      onClick={() => loadPresetTransform('shear_x')}
                      className="px-2 py-1 bg-card hover:bg-muted border border-border-strong rounded-xl text-3xs font-extrabold transition-all"
                    >
                      Cisaillement
                    </button>
                    <button
                      onClick={() => loadPresetTransform('sym_y')}
                      className="px-2 py-1 bg-card hover:bg-muted border border-border-strong rounded-xl text-3xs font-extrabold transition-all"
                    >
                      Symétrie Y
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    id="checkbox_grid_trans"
                    type="checkbox"
                    checked={showTransformedGrid}
                    onChange={(e) => setShowTransformedGrid(e.target.checked)}
                    className="w-4 h-4 text-primary bg-muted rounded border border-border-strong"
                  />
                  <label htmlFor="checkbox_grid_trans" className="text-xs font-bold text-foreground">
                    Afficher la déformation de la grille sous-jacente
                  </label>
                </div>

              </div>

              <div className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-2">
                <span className="text-[10px] uppercase font-mono font-black text-muted-text">Comprendre la transformation</span>
                <p className="text-xs text-muted-text leading-relaxed flex items-center flex-wrap gap-1">
                  Le point initial <MathComponent math="P(x, y)" /> est de couleur unie dans le plan. Le point transformé <MathComponent math="P'(x', y')" /> de couleur rose est calculé par la multiplication matricielle :
                </p>
                <div className="p-3 bg-muted rounded-xl border border-border/60 text-xs font-mono">
                  <div>{"x' = a * x + b * y"}</div>
                  <div>{"y' = c * x + d * y"}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: GEOMETRIC GUIDES & HELP */}
          {activeTab === 'help' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card p-6 rounded-3xl border border-border-strong shadow-sm space-y-6"
            >
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wide flex items-center gap-1">
                  <Info className="w-4 h-4 text-primary" /> Les Rappels Théoriques de base
                </h4>
                
                <h5 className="font-extrabold text-xs text-foreground mt-3">1. Définition d'un Vecteur</h5>
                <p className="text-xs text-muted-text leading-relaxed flex items-center flex-wrap gap-1">
                  Un vecteur représente un déplacement, caractérisé par une direction, un sens et une longueur (norme). Les coordonnées d'un vecteur <MathComponent math="\\vec{AB}" /> s'obtiennent par <MathComponent math="X = X_B - X_A" /> et <MathComponent math="Y = Y_B - Y_A" />.
                </p>

                <h5 className="font-extrabold text-xs text-foreground mt-3">2. La Relation de Chasles</h5>
                <p className="text-xs text-muted-text leading-relaxed flex items-center flex-wrap gap-1">
                  Pour tout point A, B, C, on a <MathComponent math="\\vec{AB} + \\vec{BC} = \\vec{AC}" />. Géométriquement, cela correspond à mettre les vecteurs bout à bout (comme illustré sur l'onglet Vecteurs).
                </p>

                <h5 className="font-extrabold text-xs text-foreground mt-3">3. Application Linéaire</h5>
                <p className="text-xs text-muted-text leading-relaxed">
                  Une transformation matricielle déforme l'espace en conservant l'origine et en transformant les grilles de coordonnées cartésiennes en parallélogrammes. C'est le fondement de l'algèbre linéaire en dimensions 2 et 3 !
                </p>
              </div>

              <TipBanner
                type="success"
                title="Espace autonome"
              >
                Cet espace est un bac à sable : n'hésite pas à le réinitialiser ou à le manipuler pour mieux comprendre vos cours !
              </TipBanner>
            </motion.div>
          )}

        </div>

      </div>
      </Section>

      <Section title="2. Synthèse & Formules fondamentales" color="purple" icon="⭐">
        <p className="mb-6">
          Utilisez les cartes interactives ci-dessous pour mémoriser les notions et formules géométriques incontournables. Cliquez sur chaque carte pour l'auto-évaluer !
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Flashcard 
            front={<>Comment calcule-t-on les coordonnées d'un vecteur {"$\\vec{AB}$"} à partir des points {"$A(x_A, y_A)$"} et {"$B(x_B, y_B)$"} ?</>}
            back={<>On soustrait les coordonnées de l'origine à celles de l'extrémité : {"$\\vec{AB} \\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\end{pmatrix}$"}</>}
          />
          <Flashcard 
            front={<>Quelle relation caractérise la colinéarité de {"$\\vec{u}(x, y)$"} et {"$\\vec{v}(x', y')$"} ?</>}
            back={<>Leur déterminant est nul : {"$x y' - y x' = 0$"}. Il y a alors un coefficient de proportionnalité {"$k$"} tel que {"$\\vec{u} = k\\vec{v}$"}.</>}
          />
          <Flashcard 
            front={<>Quelle est la formule de la norme d'un vecteur {"$\\vec{u}(x, y)$"} dans un repère orthonormé ?</>}
            back={<>Elle découle du théorème de Pythagore : {"$||\\vec{u}|| = \\sqrt{x^2 + y^2}$"}</>}
          />
        </div>
      </Section>

      <Section title="3. Exercice d'Entraînement : Norme et Déterminant" color="emerald" icon="⚡">
        <InteractiveExercise 
          title="Calcul d'un déterminant et de la colinéarité"
          question={
            <>
              Soient deux vecteurs dans le plan : {"$\\vec{u}(3, -4)$"} et {"$\\vec{v}(-6, 8)$"}.
              <br />
              Déterminez s'ils sont colinéaires et calculez la norme du vecteur {"$\\vec{u}$"}.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Calculer le déterminant</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Appliquons la formule du déterminant :
                <br />
                <span className="font-mono font-bold block text-center my-2">{"$\\det(\\vec{u}, \\vec{v}) = x_u y_v - x_v y_u = 3 \\times 8 - (-6) \\times (-4)$"}</span>
                On calcule : {"$24 - 24 = 0$"}
              </p>
            </>,
            <>
              <strong>Étape 2 : En déduire la colinéarité</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Le déterminant étant égal à 0, nous pouvons affirmer avec certitude que les vecteurs <strong>sont colinéaires</strong>.
                Ils ont donc la même direction (ils sont parallèles). On remarque en effet la relation : {"$\\vec{v} = -2\\vec{u}$"}.
              </p>
            </>,
            <>
              <strong>Étape 3 : Calculer la norme de u</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Calculons la distance ou intensité géométrique du déplacement :
                <br />
                <span className="font-mono font-bold block text-center my-2">{"$||\\vec{u}|| = \\sqrt{x^2 + y^2} = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25}$"}</span>
                La norme de {"$\\vec{u}$"} vaut donc exactement <strong>5</strong>.
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="4. Teste tes connaissances" color="rose" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si det(u, v) = 0, quelle est l'interprétation géométrique correcte pour les vecteurs u et v ?",
              options: [
                "Ils sont orthogonaux (perpendiculaires)",
                "Ils sont colinéaires (parallèles)",
                "Ils ont la même longueur"
              ],
              correctAnswer: 1,
              explanation: "Un déterminant nul indique que l'aire du parallélogramme formé par les deux vecteurs est nulle, ce qui implique qu'ils ont des directions parallèles."
            },
            {
              question: "Quelle est la norme du vecteur u(5, 12) ?",
              options: [
                "13",
                "17",
                "7"
              ],
              correctAnswer: 0,
              explanation: "||u|| = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13."
            }
          ]}
        />
      </Section>

    </div>
  );
}
