
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'w-full inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none px-5 py-3 transform hover:-translate-y-px';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-primary hover:bg-secondary/80 focus:ring-primary',
    ghost: 'hover:bg-slate-200 dark:hover:bg-slate-700 focus:ring-slate-500 text-slate-600 dark:text-slate-300',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;