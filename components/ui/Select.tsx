
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <select
        id={id}
        className="block w-full px-3 py-2 bg-white dark:bg-slate-700/60 border border-slate-300 dark:border-slate-600 rounded-lg text-sm shadow-sm
                   focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;