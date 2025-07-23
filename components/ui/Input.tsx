import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  warning?: string;
}

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const Input: React.FC<InputProps> = ({ label, id, warning, ...props }) => {
  const hasWarning = !!warning;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        className={`block w-full px-4 py-2 bg-white dark:bg-slate-700/60 border rounded-lg text-sm shadow-sm placeholder-slate-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-1 transition-colors ${hasWarning ? 'border-amber-500 focus:border-amber-500 focus:ring-amber-500' : 'border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-primary'}`}
        {...props}
      />
      {warning && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 flex items-center">
              <WarningIcon />
              {warning}
          </p>
      )}
    </div>
  );
};

export default Input;