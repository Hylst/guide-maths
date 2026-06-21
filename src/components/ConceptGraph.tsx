import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Search,
  BookOpen,
  CheckCircle2,
  X,
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  Network
} from "lucide-react";
import { Course } from "../types";
import { CourseProgress } from "../hooks/useProgress";
import {
  CONCEPT_METADATA,
  DOMAIN_DETAILS,
  getXPosition,
  CourseNodeMetadata
} from "../data/concept_links";

interface ConceptGraphProps {
  courses: Course[];
  progress: Record<string, CourseProgress>;
  navigate: (path: string) => void;
  handleCourseSelect: (course: Course) => void;
}

interface NodeData {
  id: string;
  course: Course;
  shortTitle: string;
  domain: string;
  x: number;
  y: number;
  completed: boolean;
  metadata: CourseNodeMetadata;
}

export default function ConceptGraph({
  courses,
  progress,
  navigate,
  handleCourseSelect
}: ConceptGraphProps) {
  // Navigation viewport states
  const [transform, setTransform] = useState({ x: 50, y: 50, zoom: 0.7 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  // Interactive node states
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  // Keyboard navigation & Esc key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNode(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Map courses to graph nodes dynamically
  const nodes = useMemo(() => {
    return courses.map((course) => {
      const metadata = CONCEPT_METADATA[course.id] || {
        domain: "general",
        shortTitle: course.title.replace(/Chapitre \d+ : /, "").slice(0, 20),
        dependencies: []
      };

      // Resolve domain Y lane
      const domainKey = metadata.domain;
      const domainInfo = DOMAIN_DETAILS[domainKey] || DOMAIN_DETAILS.general;
      const baseLinkY = domainInfo.y;

      // Base coordinate resolution
      const baseLinkX = getXPosition(course.level, course.subLevel);

      // Add offsetY/offsetX modifiers from metadata
      const x = baseLinkX + (metadata.offsetX || 0);
      const y = baseLinkY + (metadata.offsetY || 0);
      
      const completed = !!progress[course.id]?.completed;

      return {
        id: course.id,
        course,
        shortTitle: metadata.shortTitle,
        domain: metadata.domain,
        x,
        y,
        completed,
        metadata
      } as NodeData;
    });
  }, [courses, progress]);

  // Index of nodes by ID for fast lookup
  const nodesById = useMemo(() => {
    const map: Record<string, NodeData> = {};
    nodes.forEach((n) => {
      map[n.id] = n;
    });
    return map;
  }, [nodes]);

  // Build connections (edges)
  const edges = useMemo(() => {
    const list: { from: NodeData; to: NodeData }[] = [];
    nodes.forEach((node) => {
      const deps = node.metadata.dependencies || [];
      deps.forEach((depId) => {
        const parent = nodesById[depId];
        if (parent) {
          list.push({ from: parent, to: node });
        }
      });
    });
    return list;
  }, [nodes, nodesById]);

  // Filter nodes according to search and filters
  const filteredNodeIds = useMemo(() => {
    return new Set(
      nodes
        .filter((node) => {
          const matchesSearch =
            node.course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesDomain = selectedDomain === "all" || node.domain === selectedDomain;
          const matchesLevel = selectedLevel === "all" || node.course.level === selectedLevel;
          return matchesSearch && matchesDomain && matchesLevel;
        })
        .map((n) => n.id)
    );
  }, [nodes, searchQuery, selectedDomain, selectedLevel]);

  // Precursor and successor checking helpers
  const { directPrecursors, directSuccessors } = useMemo(() => {
    if (!hoveredNodeId) return { directPrecursors: new Set<string>(), directSuccessors: new Set<string>() };

    const precursors = new Set<string>();
    const successors = new Set<string>();

    edges.forEach((edge) => {
      if (edge.to.id === hoveredNodeId) {
        precursors.add(edge.from.id);
      }
      if (edge.from.id === hoveredNodeId) {
        successors.add(edge.to.id);
      }
    });

    return { directPrecursors: precursors, directSuccessors: successors };
  }, [hoveredNodeId, edges]);

  // Viewport drag logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "button" || (e.target as HTMLElement).closest(".drawer-panel")) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom control helpers
  const zoomIn = () => {
    setTransform((prev) => ({ ...prev, zoom: Math.min(prev.zoom + 0.1, 1.8) }));
  };

  const zoomOut = () => {
    setTransform((prev) => ({ ...prev, zoom: Math.max(prev.zoom - 0.1, 0.4) }));
  };

  const resetZoom = () => {
    setTransform({ x: 50, y: 50, zoom: 0.7 });
  };

  // Handle scroll wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.05;
    const direction = e.deltaY > 0 ? -1 : 1;
    setTransform((prev) => ({
      ...prev,
      zoom: Math.max(0.4, Math.min(1.8, prev.zoom + direction * zoomFactor))
    }));
  };

  // Touch support for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - transform.x,
        y: e.touches[0].clientY - transform.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setTransform((prev) => ({
      ...prev,
      x: e.touches[0].clientX - dragStart.current.x,
      y: e.touches[0].clientY - dragStart.current.y
    }));
  };

  // Determine line styles dynamically based on hover highlight
  const getEdgeStyle = (edge: { from: NodeData; to: NodeData }) => {
    const isRelated = hoveredNodeId === edge.from.id || hoveredNodeId === edge.to.id;
    if (hoveredNodeId) {
      return {
        stroke: isRelated ? "var(--primary)" : "var(--border-strong)",
        strokeWidth: isRelated ? 2.5 : 0.8,
        opacity: isRelated ? 0.9 : 0.08,
        strokeDasharray: isRelated ? "none" : "3 3"
      };
    }
    return {
      stroke: "var(--border-strong)",
      strokeWidth: 1.2,
      opacity: 0.4,
      strokeDasharray: "none"
    };
  };

  // Determine node styles dynamically based on focus state
  const getNodeStyle = (node: NodeData) => {
    const isHovered = hoveredNodeId === node.id;
    const isPrecursor = directPrecursors.has(node.id);
    const isSuccessor = directSuccessors.has(node.id);
    const isSearching = filteredNodeIds.has(node.id);
    
    let isFaded = false;
    if (hoveredNodeId) {
      isFaded = !isHovered && !isPrecursor && !isSuccessor;
    } else if (searchQuery || selectedDomain !== "all" || selectedLevel !== "all") {
      isFaded = !isSearching;
    }

    return {
      opacity: isFaded ? 0.2 : 1,
      scale: isHovered ? 1.15 : isPrecursor || isSuccessor ? 1.05 : 1,
      ringColor: isHovered
        ? "ring-primary shadow-lg shadow-primary/30"
        : isPrecursor
        ? "ring-emerald-500/50"
        : isSuccessor
        ? "ring-indigo-500/50"
        : "ring-transparent"
    };
  };

  const levelColorMap: Record<string, string> = {
    Maternelle: "bg-pink-500 text-white",
    Primaire: "bg-emerald-500 text-white",
    College: "bg-blue-500 text-white",
    Lycee: "bg-indigo-600 text-white",
    Post_Bac: "bg-purple-600 text-white"
  };

  return (
    <div className="relative w-full h-[85vh] bg-background border border-border-strong rounded-[2.5rem] overflow-hidden select-none shadow-sm">
      {/* Header bar controls */}
      <div className="absolute top-6 left-6 right-6 z-10 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-none no-print">
        {/* Title widget */}
        <div className="bg-card/80 dark:bg-slate-900/80 backdrop-blur-md border border-border-strong px-5 py-3 rounded-2xl flex items-center gap-3 shadow-md pointer-events-auto">
          <Network className="w-5 h-5 text-primary animate-pulse" />
          <div>
            <h2 className="text-sm font-extrabold text-foreground">Carte Conceptuelle</h2>
            <p className="text-[10px] text-muted-text font-bold uppercase tracking-wider">Spirale d'apprentissage</p>
          </div>
        </div>

        {/* Filter deck */}
        <div className="flex flex-wrap items-center gap-3 bg-card/80 dark:bg-slate-900/80 backdrop-blur-md border border-border-strong p-2 rounded-2xl shadow-md pointer-events-auto max-w-full overflow-x-auto">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-text-subtle" />
            <input
              type="text"
              placeholder="Chercher un concept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-muted text-foreground border-transparent rounded-xl text-xs outline-none focus:bg-card focus:ring-1 focus:ring-primary w-40 transition-all font-medium"
            />
          </div>

          {/* Discipline filter */}
          <div className="flex items-center gap-1.5 border-l border-border pl-3">
            <Filter className="w-3.5 h-3.5 text-muted-text" />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-transparent text-xs text-foreground font-bold border-transparent outline-none cursor-pointer"
            >
              <option value="all">Tous les domaines</option>
              {Object.entries(DOMAIN_DETAILS).map(([key, details]) => (
                <option key={key} value={key}>
                  {details.label}
                </option>
              ))}
            </select>
          </div>

          {/* Level filter */}
          <div className="flex items-center gap-1.5 border-l border-border pl-3">
            <Layers className="w-3.5 h-3.5 text-muted-text" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-transparent text-xs text-foreground font-bold border-transparent outline-none cursor-pointer"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Maternelle">Maternelle</option>
              <option value="Primaire">Primaire</option>
              <option value="College">Collège</option>
              <option value="Lycee">Lycée</option>
              <option value="Post_Bac">Supérieur</option>
            </select>
          </div>
        </div>
      </div>

      {/* Floating Canvas controls */}
      <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 bg-card/85 dark:bg-slate-900/85 backdrop-blur-md border border-border-strong p-2 rounded-2xl shadow-lg pointer-events-auto no-print">
        <button
          onClick={zoomIn}
          className="p-2 hover:bg-muted text-foreground rounded-xl transition-all cursor-pointer"
          title="Zoom +"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          className="p-2 hover:bg-muted text-foreground rounded-xl transition-all cursor-pointer"
          title="Zoom -"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetZoom}
          className="p-2 hover:bg-muted text-foreground rounded-xl transition-all cursor-pointer"
          title="Réinitialiser l'affichage"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Draggable viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className={`w-full h-full overflow-hidden outline-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
            transformOrigin: "0 0",
            transition: isDragging ? "none" : "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="relative w-[1700px] h-[1050px]"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              {/* Arrow markers for curves */}
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="26"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--border-strong)" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="26"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--primary)" />
              </marker>
            </defs>

            {/* Background Lane dividers representing Math Fields */}
            {Object.entries(DOMAIN_DETAILS).map(([key, val]) => {
              if (key === "general") return null;
              return (
                <g key={key} className="opacity-40">
                  <line
                    x1="20"
                    y1={val.y}
                    x2="1600"
                    y2={val.y}
                    stroke="var(--border)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                  <text
                    x="30"
                    y={val.y - 12}
                    className="text-[10px] font-black uppercase tracking-wider fill-muted-text opacity-70 font-sans"
                  >
                    {val.label}
                  </text>
                </g>
              );
            })}

            {/* Render connecting edges (Bezier paths) */}
            {edges.map((edge, idx) => {
              const { from, to } = edge;
              // Calculate curved layout
              const dx = Math.max(Math.abs(to.x - from.x) * 0.45, 50);
              const pathStr = `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
              const edgeStyle = getEdgeStyle(edge);
              const isRelated = hoveredNodeId === from.id || hoveredNodeId === to.id;

              return (
                <path
                  key={`${from.id}-${to.id}-${idx}`}
                  d={pathStr}
                  fill="none"
                  stroke={edgeStyle.stroke}
                  strokeWidth={edgeStyle.strokeWidth}
                  opacity={edgeStyle.opacity}
                  strokeDasharray={edgeStyle.strokeDasharray}
                  className="transition-all duration-300"
                  markerEnd={isRelated ? "url(#arrow-active)" : "url(#arrow)"}
                />
              );
            })}
          </svg>

          {/* Render interactive Course Nodes */}
          {nodes.map((node) => {
            const nodeStyle = getNodeStyle(node);
            const levelColor = levelColorMap[node.course.level] || "bg-slate-500";
            const domainInfo = DOMAIN_DETAILS[node.domain] || DOMAIN_DETAILS.general;
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "auto"
                }}
                className="z-20 origin-center transition-all duration-300"
              >
                <div
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setSelectedNode(node)}
                  style={{
                    opacity: nodeStyle.opacity,
                    transform: `scale(${nodeStyle.scale})`
                  }}
                  className={`w-36 px-3 py-2 rounded-2xl border bg-card border-border-strong hover:border-primary cursor-pointer shadow-md select-none transition-all ring-4 ${
                    isSelected ? "ring-primary" : nodeStyle.ringColor
                  }`}
                >
                  {/* Bubble badge for Level */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md truncate max-w-[80px] ${levelColor}`}
                    >
                      {node.course.level === "Post_Bac" ? "Post-Bac" : node.course.level}
                    </span>
                    {node.completed && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>

                  {/* Title node */}
                  <div className="text-[10px] font-bold text-foreground leading-tight line-clamp-2 select-none tracking-tight">
                    {node.shortTitle}
                  </div>

                  {/* Bubble subtitle indicator */}
                  <div className={`text-[8px] font-bold mt-1 uppercase ${domainInfo.textClass}`}>
                    {domainInfo.label.split(" ")[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concept details Drawer Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="drawer-panel absolute right-6 top-6 bottom-6 w-80 bg-card/95 dark:bg-slate-900/95 backdrop-blur-md border border-border-strong rounded-3xl p-6 shadow-2xl flex flex-col justify-between z-30 no-print"
          >
            {/* Header info */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span className="text-2xs font-extrabold uppercase tracking-widest text-muted-text">Fiche Notion</span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 hover:bg-muted text-muted-text hover:text-foreground rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Level */}
              <div className="space-y-2">
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    levelColorMap[selectedNode.course.level]
                  }`}
                >
                  {selectedNode.course.level.replace("_", " ")} {selectedNode.course.subLevel ? `> ${selectedNode.course.subLevel}` : ""}
                </span>
                <h3 className="text-lg font-black text-foreground leading-snug tracking-tight">
                  {selectedNode.course.title}
                </h3>
              </div>

              {/* Status card */}
              <div className="bg-muted p-4 rounded-2xl border border-border-strong space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-text uppercase">Statut</span>
                  {selectedNode.completed ? (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                      ✓ Validé
                    </span>
                  ) : (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-extrabold">
                      À travailler
                    </span>
                  )}
                </div>
                
                {/* Domain Pill */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-text uppercase">Domaine</span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      DOMAIN_DETAILS[selectedNode.domain]?.bgClass
                    } ${DOMAIN_DETAILS[selectedNode.domain]?.textClass}`}
                  >
                    {DOMAIN_DETAILS[selectedNode.domain]?.label}
                  </span>
                </div>
              </div>

              {/* Dependencies section */}
              {selectedNode.metadata.dependencies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-text">
                    Nécessite la notion
                  </h4>
                  <div className="space-y-1.5">
                    {selectedNode.metadata.dependencies.map((depId) => {
                      const dep = nodesById[depId];
                      if (!dep) return null;
                      return (
                        <div
                          key={depId}
                          onClick={() => setSelectedNode(dep)}
                          className="flex items-center justify-between px-3 py-2 bg-muted hover:bg-border-strong text-[11px] font-bold text-foreground rounded-xl cursor-pointer border border-transparent transition-colors"
                        >
                          <span className="truncate">{dep.shortTitle}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-text-subtle shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Launch course button */}
            <div className="pt-4 border-t border-border mt-4">
              <button
                onClick={() => {
                  handleCourseSelect(selectedNode.course);
                  setSelectedNode(null);
                }}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-2xl text-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
              >
                Étudier ce chapitre
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
