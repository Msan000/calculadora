import React, { useState, useMemo } from 'react';
import { Category, CalculationInput } from '../types';
import { CATEGORY_DETAILS } from '../constants';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import ToggleSwitch from './ui/ToggleSwitch';

interface CalculatorFormProps {
  category: Category;
  onCalculate: (inputs: CalculationInput) => void;
  onBack: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ category, onCalculate, onBack }) => {
  const categoryDetails = useMemo(() => CATEGORY_DETAILS[category], [category]);

  const initialFormState = useMemo(() => {
    const state: CalculationInput = {};
    categoryDetails.inputs.forEach(input => {
      state[input.name] = input.label.includes('(Opcional)') ? '' : '';
    });
    if (categoryDetails.materialOptions) {
      state[categoryDetails.materialOptions.name] = categoryDetails.materialOptions.options[0].value;
    }
    if (categoryDetails.expertSettings) {
        categoryDetails.expertSettings.forEach(setting => {
            state[setting.name] = setting.placeholder || '';
        });
    }
    return state;
  }, [categoryDetails]);
  
  const [formState, setFormState] = useState<CalculationInput>(initialFormState);
  const [warnings, setWarnings] = useState<{[key: string]: string}>({});
  const [isExpertMode, setIsExpertMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const inputDef = categoryDetails.inputs.find(i => i.name === name);
    if (inputDef && inputDef.validation) {
        if (Number(value) > inputDef.validation.warnAt) {
            setWarnings(prev => ({ ...prev, [name]: inputDef.validation.message }));
        } else {
            setWarnings(prev => {
                const newWarnings = { ...prev };
                delete newWarnings[name];
                return newWarnings;
            });
        }
    }

    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formState);
  };

  return (
    <div className="animate-fade-in-up max-w-2xl mx-auto">
      <Card>
        <div className="flex items-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-700/50">
           <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
             <span className="text-primary">{CATEGORY_DETAILS[category].icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{categoryDetails.title}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{categoryDetails.description}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {categoryDetails.inputs.map(input => (
            <Input
              key={input.name}
              id={input.name}
              name={input.name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              value={formState[input.name] as string}
              onChange={handleInputChange}
              required={!input.label.includes('(Opcional)')}
              min={!input.label.includes('(Opcional)') ? "0.01" : "0"}
              step="0.01"
              warning={warnings[input.name]}
            />
          ))}
          
          {categoryDetails.materialOptions && (
            <Select
              id={categoryDetails.materialOptions.name}
              name={categoryDetails.materialOptions.name}
              label={categoryDetails.materialOptions.label}
              value={formState[categoryDetails.materialOptions.name] as string}
              onChange={handleInputChange}
            >
              {categoryDetails.materialOptions.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}

          {categoryDetails.expertSettings && (
              <div className="pt-2">
                  <ToggleSwitch
                      label="Modo Experto"
                      checked={isExpertMode}
                      onChange={setIsExpertMode}
                  />
                  {isExpertMode && (
                      <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg space-y-4 animate-fade-in">
                          <p className="text-sm text-slate-600 dark:text-slate-300">Ajustá los rendimientos y dosificaciones para un cálculo personalizado.</p>
                          {categoryDetails.expertSettings.map(setting => (
                              <Input
                                  key={setting.name}
                                  id={setting.name}
                                  name={setting.name}
                                  label={setting.label}
                                  type={setting.type}
                                  placeholder={setting.placeholder}
                                  value={formState[setting.name] as string}
                                  onChange={handleInputChange}
                                  step="0.01"
                              />
                          ))}
                      </div>
                  )}
              </div>
          )}


          <div className="pt-4">
            <Button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.672 1.901a1 1 0 10-1.344 1.48l1.455 1.323a1 1 0 001.344-1.48L6.672 1.901zM4.142 6.42A1 1 0 005.5 5.5v-2a1 1 0 00-2 0v2c0 .37.204.698.5.866l1.858 1.073a1 1 0 101-1.732L5.142 7.58a1.002 1.002 0 00-.999-1.16zm11.716 0a1 1 0 10-1-1.732L13.5 7.58a1 1 0 00-1 1.16l1.342-1.162a1 1 0 00.5-.866v-2a1 1 0 10-2 0v2a1 1 0 001.356.947l1.456-1.323a1 1 0 10-1.344-1.48l-1.455 1.323a1 1 0 000 1.48l1.455 1.323a1 1 0 001.344-1.48L15.858 6.42zM10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>
              Calcular Materiales
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CalculatorForm;