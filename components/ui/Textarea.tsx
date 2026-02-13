
import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, description, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[10px] font-bold uppercase text-[#002147] mb-1.5 tracking-widest">
          {label} {props.required && <span className="text-[#C5A059]">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full bg-white text-[#002147] border rounded-sm px-4 py-3 outline-none focus:ring-1 transition-all disabled:bg-[#F3F2F1] disabled:text-gray-400 text-sm placeholder:text-[#A19F9D] min-h-[100px]
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50'
            : 'border-[#D1D1D1] focus:border-[#C5A059] focus:ring-[#C5A059]'
          } ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-[10px] mt-1 font-bold animate-in slide-in-from-top-1">{error}</p>}
      {!error && description && <p className="text-gray-400 text-[10px] mt-1">{description}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
