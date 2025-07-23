
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${className}`}>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;