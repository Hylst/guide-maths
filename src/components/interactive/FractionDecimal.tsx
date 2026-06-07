import React, { useState } from 'react';

export default function FractionDecimal({ alt }: { alt?: string }) {
  const [value, setValue] = useState(34); // Value out of 100

  const handleGridClick = (index: number) => {
    setValue(index + 1);
  };

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{alt || "De la fraction au nombre décimal"}</h3>
        <p className="text-sm text-slate-500">Cliquez sur la grille ou utilisez le curseur pour modifier la valeur.</p>
      </div>
      
      <div className="p-6 flex flex-col md:flex-row items-center gap-8">
        
        {/* Grille 10x10 */}
        <div className="flex-1 flex justify-center">
          <div 
            className="grid grid-cols-10 gap-0.5 p-1 bg-slate-300 rounded-lg border-2 border-slate-400 cursor-pointer"
            style={{ width: '250px', height: '250px' }}
          >
            {Array.from({ length: 100 }).map((_, i) => (
              <div 
                key={i}
                onClick={() => handleGridClick(i)}
                onMouseEnter={(e) => {
                  if (e.buttons === 1) handleGridClick(i);
                }}
                className={`w-full h-full rounded-sm transition-colors duration-150 ${
                  i < value ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-white hover:bg-indigo-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contrôles et Affichage */}
        <div className="flex-1 w-full space-y-8">
          <div>
            <input 
              type="range" min="0" max="100" value={value} 
              aria-label="Valeur de la fraction sur 100"
              onChange={(e) => setValue(parseInt(e.target.value, 10))} 
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono" aria-hidden="true">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center space-y-6" aria-live="polite">
            
            {/* Fraction */}
            <div className="flex items-center text-3xl font-mono text-indigo-700">
              <div className="flex flex-col items-center">
                <span className="border-b-2 border-indigo-700 pb-1 px-2">{value}</span>
                <span className="pt-1 px-2">100</span>
              </div>
            </div>

            <div className="text-slate-400 font-bold text-xl">=</div>

            {/* Décimal */}
            <div className="text-4xl font-mono font-bold text-emerald-600">
              {(value / 100).toFixed(2).replace('.', ',')}
            </div>

            {/* Décomposition */}
            <div className="text-sm text-slate-600 font-medium mt-4 pt-4 border-t border-slate-200 w-full text-center">
              {value} centièmes = {Math.floor(value / 10)} dixièmes et {value % 10} centièmes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
