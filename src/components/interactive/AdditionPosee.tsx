import React, { useState } from 'react';

export default function AdditionPosee({ alt }: { alt?: string }) {
  const [num1, setNum1] = useState(47);
  const [num2, setNum2] = useState(25);

  const handleNum1Change = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= 999) setNum1(num);
  };

  const handleNum2Change = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= 999) setNum2(num);
  };

  // Calcul des chiffres
  const u1 = num1 % 10;
  const d1 = Math.floor(num1 / 10) % 10;
  const c1 = Math.floor(num1 / 100) % 10;

  const u2 = num2 % 10;
  const d2 = Math.floor(num2 / 10) % 10;
  const c2 = Math.floor(num2 / 100) % 10;

  // Calcul des retenues
  const sumU = u1 + u2;
  const retU = sumU >= 10 ? 1 : 0;
  const resU = sumU % 10;

  const sumD = d1 + d2 + retU;
  const retD = sumD >= 10 ? 1 : 0;
  const resD = sumD % 10;

  const sumC = c1 + c2 + retD;
  const resC = sumC;

  return (
    <div className="my-8 w-full max-w-sm mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{alt || "Addition Posée"}</h3>
        <p className="text-sm text-slate-500">Modifiez les nombres pour voir les retenues.</p>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="flex space-x-4 mb-6">
          <input 
            type="number" 
            value={num1} 
            onChange={(e) => handleNum1Change(e.target.value)}
            aria-label="Premier nombre"
            className="w-20 p-2 text-center border border-slate-300 rounded-md text-lg font-mono"
            max="999"
          />
          <span className="text-2xl font-bold text-slate-400" aria-hidden="true">+</span>
          <input 
            type="number" 
            value={num2} 
            onChange={(e) => handleNum2Change(e.target.value)}
            aria-label="Deuxième nombre"
            className="w-20 p-2 text-center border border-slate-300 rounded-md text-lg font-mono"
            max="999"
          />
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-3xl font-bold relative" aria-live="polite" aria-label={`Résultat de l'addition : ${num1 + num2}`}>
          
          {/* Ligne des retenues */}
          <div className="flex justify-end space-x-4 mb-2 text-rose-500 text-xl h-8">
            <div className="w-8 text-center">{retD > 0 ? `+${retD}` : ''}</div>
            <div className="w-8 text-center">{retU > 0 ? `+${retU}` : ''}</div>
            <div className="w-8 text-center"></div>
          </div>

          {/* Premier nombre */}
          <div className="flex justify-end space-x-4 mb-2 text-slate-800">
            <div className="w-8 text-center">{c1 > 0 ? c1 : ''}</div>
            <div className="w-8 text-center">{d1 > 0 || c1 > 0 ? d1 : ''}</div>
            <div className="w-8 text-center">{u1}</div>
          </div>

          {/* Deuxième nombre */}
          <div className="flex justify-end space-x-4 mb-2 text-slate-800 relative">
            <div className="absolute -left-8 top-0 text-indigo-500">+</div>
            <div className="w-8 text-center">{c2 > 0 ? c2 : ''}</div>
            <div className="w-8 text-center">{d2 > 0 || c2 > 0 ? d2 : ''}</div>
            <div className="w-8 text-center">{u2}</div>
          </div>

          {/* Ligne de séparation */}
          <div className="border-b-4 border-slate-800 mb-2"></div>

          {/* Résultat */}
          <div className="flex justify-end space-x-4 text-emerald-600">
            <div className="w-8 text-center">{resC > 0 ? resC : ''}</div>
            <div className="w-8 text-center">{resD > 0 || resC > 0 ? resD : ''}</div>
            <div className="w-8 text-center">{resU}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
