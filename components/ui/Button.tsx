
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', isLoading, icon, fullWidth, className = '', ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm border focus:outline-none focus:ring-2 focus:ring-offset-1";
  
  const variants = {
    primary: "bg-[#C5A059] border-[#C5A059] text-[#002147] hover:bg-[#A68546] hover:border-[#A68546] focus:ring-[#C5A059]",
    secondary: "bg-[#002147] border-[#002147] text-white hover:bg-[#003366] hover:border-[#003366] focus:ring-[#002147]",
    outline: "bg-transparent border-[#002147] text-[#002147] hover:bg-[#F3F2F1] focus:ring-[#002147]",
    danger: "bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700 focus:ring-red-600",
    ghost: "bg-transparent border-transparent text-[#605E5C] hover:text-[#002147] hover:bg-gray-100 focus:ring-gray-300"
  };

  const sizes = {
    sm: "text-[10px] px-3 py-2 gap-2 h-8",
    md: "text-xs px-5 py-3 gap-2 h-10",
    lg: "text-sm px-8 py-4 gap-3 h-14"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      )}
      {!isLoading && icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
