import React, { useState, useCallback } from 'react';
import { Category, MaterialResult, CalculationInput } from './types';
import { calculateMaterials } from './services/calculationService';
import CategorySelector from './components/CategorySelector';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';
import GlossaryModal from './components/GlossaryModal';

const App: React.FC = () => {
  type Step = 'category' | 'form' | 'results';

  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [results, setResults] = useState<MaterialResult[]>([]);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    setStep('form');
  }, []);

  const handleCalculate = useCallback((inputs: CalculationInput) => {
    if (selectedCategory) {
      const calculatedResults = calculateMaterials(selectedCategory, inputs);
      setResults(calculatedResults);
      setStep('results');
    }
  }, [selectedCategory]);

  const handleReset = useCallback(() => {
    setSelectedCategory(null);
    setResults([]);
    setStep('category');
  }, []);
  
  const handleBackToForm = useCallback(() => {
    setStep('form');
  }, []);

  const handleBackToCategory = useCallback(() => {
      setStep('category');
      setSelectedCategory(null);
  }, []);

  const handleGlossaryToggle = useCallback(() => {
    setIsGlossaryOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center p-0 sm:p-2 lg:p-4">
      <Header onGlossaryClick={handleGlossaryToggle} />
      <main className="w-full max-w-4xl flex-grow px-4 sm:px-6 lg:px-8 py-8">
        {step === 'category' && <CategorySelector onSelect={handleSelectCategory} />}
        {step === 'form' && selectedCategory && (
          <CalculatorForm 
            category={selectedCategory} 
            onCalculate={handleCalculate}
            onBack={handleBackToCategory}
          />
        )}
        {step === 'results' && <ResultsDisplay results={results} onReset={handleReset} onBack={handleBackToForm} />}
      </main>
      <footer className="w-full max-w-4xl py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} by sanchezmar00. Todos los derechos reservados.</p>
        <p className="mt-1">Hecho con ♥ en Argentina.</p>
      </footer>
      <GlossaryModal isOpen={isGlossaryOpen} onClose={handleGlossaryToggle} />
    </div>
  );
};

export default App;