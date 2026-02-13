
import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, error, options, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] font-bold uppercase text-[#002147] mb-1.5 tracking-widest">
          {label} {props.required && <span className="text-[#C5A059]">*</span>}
        </label>
      )}
      <div className="relative">
        <select 
            ref={ref}
            className={`w-full bg-white text-[#002147] border rounded-sm px-4 py-3 outline-none focus:ring-1 transition-all disabled:bg-[#F3F2F1] disabled:text-gray-400 text-sm appearance-none cursor-pointer
            ${error 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50' 
                : 'border-[#D1D1D1] focus:border-[#C5A059] focus:ring-[#C5A059]'
            } ${className}`}
            {...props}
        >
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#C5A059]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      {error && <p className="text-red-600 text-[10px] mt-1 font-bold animate-in slide-in-from-top-1">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
