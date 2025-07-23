import React, { useState, useEffect, useMemo } from 'react';
import { MaterialResult } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';

interface ResultsDisplayProps {
  results: MaterialResult[];
  onReset: () => void;
  onBack: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset, onBack }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [wastes, setWastes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialWastes: { [key: string]: string } = {};
    results.forEach(res => {
      let defaultWaste = 10;
      if (res.name.toLowerCase().includes('cerámico') || res.name.toLowerCase().includes('porcelanato')) {
        defaultWaste = 15;
      } else if (res.name.toLowerCase().includes('ladrillo')) {
        defaultWaste = 10;
      } else if (res.name.toLowerCase().includes('placa de yeso')) {
        defaultWaste = 15;
      }
      initialWastes[res.name] = String(defaultWaste);
    });
    setWastes(initialWastes);
  }, [results]);

  const handleWasteChange = (name: string, value: string) => {
    setWastes(prev => ({ ...prev, [name]: value }));
  };

  const getTotalWithWaste = (quantity: number, waste: string): number => {
    const numericWaste = Number(waste);
    if (isNaN(numericWaste)) return quantity;
    return quantity * (1 + numericWaste / 100);
  };

  const resultsText = useMemo(() => {
    let text = "📋 *Lista de Materiales Calculados* 📋\n\n";
    results.forEach(res => {
      const total = getTotalWithWaste(res.quantity, wastes[res.name] || '0');
      text += `*${res.name}*: ${total.toFixed(2)} ${res.unit}\n`;
    });
    text += "\n_Calculado con la App de Materiales._";
    return text;
  }, [results, wastes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultsText.replace(/\*/g, ''));
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };
  
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(resultsText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto">
      <Card className="dark:bg-slate-800/80">
        <div className="flex items-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-700/50">
           <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Volver al formulario">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resultados del Cálculo</h2>
        </div>
        
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700/50">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Material</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Cantidad Pura</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Desperdicio</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Total a Comprar</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800/80 divide-y divide-slate-200 dark:divide-slate-700/50">
              {results.map((result, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{result.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-600 dark:text-slate-300">
                    {result.quantity.toFixed(2)} <span className="text-xs text-slate-400">{result.unit}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="relative inline-block">
                      <input
                        type="number"
                        value={wastes[result.name] || ''}
                        onChange={(e) => handleWasteChange(result.name, e.target.value)}
                        className="w-20 pl-2 pr-6 py-1 text-center bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        aria-label={`Desperdicio para ${result.name}`}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-base font-bold text-primary dark:text-indigo-400">
                    {getTotalWithWaste(result.quantity, wastes[result.name] || '0').toFixed(2)} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{result.unit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
            Los resultados son una estimación y pueden variar. Siempre consultá con un profesional.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button onClick={handleCopy} variant="secondary">
            {copyStatus === 'idle' ? 'Copiar' : '¡Copiado!'}
          </Button>
          <Button onClick={handleWhatsAppShare} className="bg-green-500 hover:bg-green-600 focus:ring-green-500 text-white">
            Compartir
          </Button>
          <Button onClick={onReset} variant="ghost">
            Nuevo Cálculo
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResultsDisplay;