import React from 'react';
import { Category } from '../types';
import { CATEGORY_DETAILS } from '../constants';
import Card from './ui/Card';

interface CategorySelectorProps {
  onSelect: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
  const categories = Object.values(Category);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Calculadora de Construcción
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Pennywise</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Seleccioná qué parte de tu obra querés calcular. Preciso, rápido y fácil.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const details = CATEGORY_DETAILS[category];
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className="text-left h-full group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-950 focus:ring-primary rounded-xl"
            >
              <Card className="h-full group-hover:border-primary group-hover:-translate-y-1 border-2 border-transparent">
                <div className="flex items-start space-x-4">
                  <div className="text-primary group-hover:text-primary/90 transition-colors duration-300">
                    {details.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{details.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{details.description}</p>
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;