import React, { useState } from 'react';

export default function ProportionalityTable({ alt }: { alt?: string }) {
  const [coef, setCoef] = useState(2.5);
  const [values, setValues] = useState([
    { x: 2, y: 5 },
    { x: 4, y: 10 },
    { x: 6, y: 15 },
    { x: 10, y: 25 }
  ]);

  const handleXChange = (index: number, val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const newValues = [...values];
      newValues[index] = { x: num, y: parseFloat((num * coef).toFixed(2)) };
      setValues(newValues);
    }
  };

  const handleYChange = (index: number, val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num) && coef !== 0) {
      const newValues = [...values];
      newValues[index] = { x: parseFloat((num / coef).toFixed(2)), y: num };
      setValues(newValues);
    }
  };

  const handleCoefChange = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num !== 0) {
      setCoef(num);
      setValues(values.map(v => ({ x: v.x, y: parseFloat((v.x * num).toFixed(2)) })));
    }
  };

  return (
    <div className="my-8 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{alt || "Tableau de Proportionnalité"}</h3>
        <p className="text-sm text-slate-500">Modifiez les valeurs ou le coefficient pour voir le tableau se mettre à jour automatiquement.</p>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        
        <div className="flex items-center space-x-4 mb-8">
          <label htmlFor="coef-input" className="text-sm font-medium text-slate-700">Coefficient de proportionnalité :</label>
          <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
            <span className="text-indigo-600 font-bold mr-2" aria-hidden="true">×</span>
            <input 
              id="coef-input"
              type="number" 
              step="0.1"
              value={coef} 
              onChange={(e) => handleCoefChange(e.target.value)}
              className="w-20 bg-transparent border-none focus:ring-0 text-indigo-900 font-bold text-center"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {/* Ligne 1 : Grandeurs X */}
              <tr>
                <th scope="row" className="border-2 border-slate-300 bg-slate-100 p-3 font-medium text-slate-700 w-1/4 text-left">
                  Grandeur A
                </th>
                {values.map((v, i) => (
                  <td key={`x-${i}`} className="border-2 border-slate-300 p-2 text-center">
                    <input 
                      type="number" 
                      value={v.x} 
                      aria-label={`Grandeur A, colonne ${i + 1}`}
                      onChange={(e) => handleXChange(i, e.target.value)}
                      className="w-full text-center border-b border-slate-200 focus:border-indigo-500 focus:ring-0 text-lg font-mono"
                    />
                  </td>
                ))}
              </tr>
              
              {/* Ligne 2 : Grandeurs Y */}
              <tr>
                <th scope="row" className="border-2 border-slate-300 bg-slate-100 p-3 font-medium text-slate-700 w-1/4 relative text-left">
                  Grandeur B
                  {/* Flèche du coefficient */}
                  <div className="absolute -right-12 top-0 bottom-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                    <svg width="40" height="80" viewBox="0 0 40 80" className="text-indigo-500">
                      <path d="M 10 10 Q 35 40 10 70" fill="none" stroke="currentColor" strokeWidth="2" />
                      <polygon points="10,70 18,65 15,75" fill="currentColor" />
                      <text x="25" y="45" fontSize="12" fill="currentColor" fontWeight="bold">×{coef}</text>
                    </svg>
                  </div>
                </th>
                {values.map((v, i) => (
                  <td key={`y-${i}`} className="border-2 border-slate-300 p-2 text-center bg-indigo-50/30">
                    <input 
                      type="number" 
                      value={v.y} 
                      aria-label={`Grandeur B, colonne ${i + 1}`}
                      onChange={(e) => handleYChange(i, e.target.value)}
                      className="w-full text-center bg-transparent border-b border-indigo-200 focus:border-indigo-500 focus:ring-0 text-lg font-mono text-indigo-900"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 bg-emerald-50 text-emerald-800 p-4 rounded-lg border border-emerald-200 w-full text-sm">
          <strong>Propriété :</strong> Dans un tableau de proportionnalité, on passe de la première ligne à la deuxième ligne en multipliant toujours par le même nombre : le coefficient de proportionnalité.
        </div>
      </div>
    </div>
  );
}
