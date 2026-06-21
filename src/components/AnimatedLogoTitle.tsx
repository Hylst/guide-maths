import React from 'react';

interface AnimatedLogoTitleProps {
  /** Taille du sigma : 'sm' | 'md' | 'lg' | 'xl' */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Afficher le sous-titre */
  showSubtitle?: boolean;
  /** Classe CSS additionnelle */
  className?: string;
}

const sizes = {
  sm:  { sigma: 40,  title: 18, subtitle: 10 },
  md:  { sigma: 60,  title: 26, subtitle: 13 },
  lg:  { sigma: 80,  title: 36, subtitle: 16 },
  xl:  { sigma: 110, title: 48, subtitle: 20 },
};

/**
 * Composant SVG animé du titre "Guide Mathématiques" avec logo Sigma doré.
 * Les animations CSS sont inline pour éviter les conflits de classes Tailwind.
 */
const AnimatedLogoTitle: React.FC<AnimatedLogoTitleProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const s = sizes[size];
  const totalWidth = s.sigma * 14;
  const totalHeight = s.sigma * 2.6;
  const sigmaX = s.sigma * 1.1;
  const sigmaY = totalHeight / 2;
  const textX = s.sigma * 2.5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      width={totalWidth}
      height={totalHeight}
      className={className}
      role="img"
      aria-label="Guide Mathématiques - Logo animé"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="alg-sigmaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="alg-titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="70%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>

        <linearGradient id="alg-titleHoverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>

        <filter id="alg-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>{`
          @keyframes alg-pulse {
            0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.2)) url(#alg-glow); }
            50% { opacity: 0.85; filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4)) url(#alg-glow); }
          }
          @keyframes alg-spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes alg-fadeInUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes alg-logo-intro {
            0% { transform: scale(0) rotate(-45deg); opacity: 0; }
            60% { transform: scale(1.08) rotate(5deg); }
            80% { transform: scale(0.97) rotate(-2deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          
          .alg-logo-group {
            animation: alg-logo-intro 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            transform-origin: 0px 0px;
          }
          .alg-sigma { 
            animation: alg-pulse 4s ease-in-out infinite; 
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.5s ease;
            transform-origin: 0px 0px;
          }
          .alg-ring { 
            animation: alg-spin-slow 20s linear infinite; 
            transform-origin: 0px 0px; 
            transition: stroke 0.4s ease, stroke-opacity 0.4s ease, stroke-width 0.4s ease, animation-duration 0.4s ease;
          }
          .alg-title { 
            animation: alg-fadeInUp 0.7s ease-out 0.4s both; 
            transition: fill 0.5s ease, transform 0.5s ease;
          }
          .alg-guide { 
            animation: alg-fadeInUp 0.5s ease-out 0.2s both; 
          }
          .alg-sub { 
            animation: alg-fadeInUp 0.5s ease-out 0.8s both; 
          }

          /* Hover Interactive States */
          svg {
            cursor: pointer;
          }
          svg:hover .alg-sigma {
            transform: scale(1.12);
            filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.85)) url(#alg-glow);
          }
          svg:hover .alg-ring {
            animation-duration: 5s;
            stroke: #fbbf24;
            stroke-opacity: 0.85;
            stroke-width: 1.8px;
          }
          svg:hover .alg-title {
            fill: url(#alg-titleHoverGrad);
            transform: translateX(4px);
          }
        `}</style>
      </defs>

      {/* ── Sigma Icon ── */}
      <g transform={`translate(${sigmaX}, ${sigmaY})`}>
        <g className="alg-logo-group">
          {/* Anneau décoratif rotatif */}
          <circle
            className="alg-ring"
            cx="0" cy="0"
            r={s.sigma * 0.78}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={s.sigma * 0.025}
            strokeDasharray={`${s.sigma * 0.3} ${s.sigma * 0.15}`}
            strokeOpacity="0.4"
          />
          {/* Cercle de fond */}
          <circle cx="0" cy="0" r={s.sigma * 0.72} fill="#0f172a" opacity="0.95" />
          {/* Halo glow sigma */}
          <path
            d={`M${-s.sigma*0.42} ${-s.sigma*0.44}
                H${s.sigma*0.42} V${-s.sigma*0.29}
                L${s.sigma*0.12} 0
                L${s.sigma*0.42} ${s.sigma*0.29}
                V${s.sigma*0.44}
                H${-s.sigma*0.42} V${s.sigma*0.29}
                H${s.sigma*0.25} L0 0
                L${s.sigma*0.25} ${-s.sigma*0.29}
                H${-s.sigma*0.42} Z`}
            fill="#f59e0b"
            opacity="0.18"
            filter="url(#alg-glow)"
          />
          {/* Sigma principal */}
          <path
            className="alg-sigma"
            d={`M${-s.sigma*0.42} ${-s.sigma*0.44}
                H${s.sigma*0.42} V${-s.sigma*0.29}
                L${s.sigma*0.12} 0
                L${s.sigma*0.42} ${s.sigma*0.29}
                V${s.sigma*0.44}
                H${-s.sigma*0.42} V${s.sigma*0.29}
                H${s.sigma*0.25} L0 0
                L${s.sigma*0.25} ${-s.sigma*0.29}
                H${-s.sigma*0.42} Z`}
            fill="url(#alg-sigmaGrad)"
            filter="url(#alg-glow)"
          />
        </g>
      </g>

      {/* ── Texte ── */}
      <g transform={`translate(${textX}, ${sigmaY})`}>
        {/* "GUIDE" */}
        <text
          className="alg-guide"
          x="0"
          y={-s.title * 0.9}
          fontFamily="'Segoe UI', 'Inter', 'Arial', sans-serif"
          fontSize={s.title * 0.56}
          fontWeight="300"
          fill="#93c5fd"
          letterSpacing={s.title * 0.2}
        >
          GUIDE
        </text>

        {/* "Mathématiques" */}
        <text
          className="alg-title"
          x="0"
          y={s.title * 0.2}
          fontFamily="'Segoe UI', 'Inter', 'Arial', sans-serif"
          fontSize={s.title}
          fontWeight="700"
          fill="url(#alg-titleGrad)"
        >
          Mathématiques
        </text>

        {/* Ligne de séparation animée */}
        <line
          x1="0"
          y1={s.title * 0.55}
          x2={s.title * 7.5}
          y2={s.title * 0.55}
          stroke="#6366f1"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          className="alg-sub"
        />

        {/* Sous-titre */}
        {showSubtitle && (
          <text
            className="alg-sub"
            x="0"
            y={s.title * 1.1}
            fontFamily="'Segoe UI', 'Inter', 'Arial', sans-serif"
            fontSize={s.subtitle}
            fontWeight="400"
            fill="#6366f1"
            letterSpacing={s.subtitle * 0.25}
          >
            INTERACTIF &amp; PROGRESSIF
          </text>
        )}
      </g>
    </svg>
  );
};

export default AnimatedLogoTitle;
