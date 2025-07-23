import React, { useState, useMemo, useEffect } from 'react';
import { GLOSSARY_DATA } from '../constants';
import Card from './ui/Card';
import Input from './ui/Input';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredGlossary = useMemo(() => {
    if (!searchTerm) {
      return GLOSSARY_DATA;
    }
    return GLOSSARY_DATA.filter(entry =>
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <Card className="flex-1 flex flex-col overflow-hidden !p-0">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700/50">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Glosario de Construcción</h2>
                <button 
                  onClick={onClose} 
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Cerrar glosario"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="mt-4">
                  <Input
                      id="glossary-search"
                      label=""
                      type="text"
                      placeholder="Buscar término..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {filteredGlossary.length > 0 ? filteredGlossary.map(entry => (
              <div key={entry.term}>
                <h3 className="font-bold text-primary dark:text-indigo-400">{entry.term}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{entry.definition}</p>
              </div>
            )) : (
                <p className="text-center text-slate-500 py-8">No se encontraron resultados para "{searchTerm}".</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GlossaryModal;