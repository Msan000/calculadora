import React from 'react';
import Button from './ui/Button';
import { BookIcon } from '../constants';

interface HeaderProps {
    onGlossaryClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGlossaryClick }) => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 w-full max-w-4xl">
        <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2 group" aria-label="Volver al inicio">
                 <svg className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M12 7.5V5.25m0 2.25l-2.25 1.313M7.5 15l-2.25-1.313M7.5 15l2.25 1.313M7.5 15V12.75m4.5 9.75l-2.25-1.313M15 15l2.25-1.313M15 15l-2.25 1.313M15 15V12.75" />
                </svg>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">
                    Calculadora de Construcción <span className="text-accent">Pennywise</span>
                </h1>
            </a>
            
            <button onClick={onGlossaryClick} className="flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-indigo-400 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
                <BookIcon/>
                <span className="hidden sm:inline">Glosario</span>
            </button>
        </div>
    </header>
  );
};

export default Header;