
import React, { useEffect } from 'react';
import { ICONS } from '../constants';

interface ModalProps {
  title: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string; // np. 'max-w-2xl', 'max-w-4xl'
  borderColor?: 'navy' | 'gold';
}

export const Modal: React.FC<ModalProps> = ({ 
  title, 
  onClose, 
  children, 
  maxWidth = 'max-w-lg',
  borderColor = 'gold' // Domyślnie złoty border
}) => {
  
  // Zamknięcie na ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const borderClass = borderColor === 'gold' ? 'border-[#C5A059]' : 'border-[#002147]';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className={`bg-white rounded-lg shadow-2xl w-full ${maxWidth} flex flex-col border-t-8 ${borderClass} animate-in zoom-in-95 duration-200 max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EDEBE9] flex justify-between items-center bg-[#FAF9F8] flex-shrink-0">
          <div className="text-xl font-bold text-[#002147] uppercase tracking-tight flex items-center gap-2">
             {title}
          </div>
          <button 
            onClick={onClose} 
            className="text-[#605E5C] hover:text-[#002147] transition-colors p-2 bg-white border border-[#EDEBE9] rounded-full hover:bg-gray-100 group"
            title="Zamknij (ESC)"
          >
             <div className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300">
                <ICONS.Close />
             </div>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 relative">
            {children}
        </div>
      </div>
    </div>
  );
};
