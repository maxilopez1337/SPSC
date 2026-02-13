
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'highlight' | 'success' | 'danger';
}

export const StatsCard: React.FC<StatCardProps> = ({ label, value, description, icon, variant = 'default' }) => {
  
  // Standardy korporacyjne Stratton Prime
  const styles = {
    default: {
      bg: 'bg-white',
      border: 'border-l-4 border-[#002147]',
      text: 'text-[#002147]',
      label: 'text-[#605E5C]',
      desc: 'text-[#A19F9D]',
      iconBg: 'bg-[#F3F2F1] text-[#002147]'
    },
    highlight: {
      bg: 'bg-[#002147]',
      border: 'border-l-4 border-[#C5A059]',
      text: 'text-white',
      label: 'text-[#C5A059]',
      desc: 'text-white/60',
      iconBg: 'bg-[#C5A059] text-[#002147]'
    },
    success: {
      bg: 'bg-white',
      border: 'border-l-4 border-[#107c10]',
      text: 'text-[#002147]',
      label: 'text-[#605E5C]',
      desc: 'text-[#107c10]',
      iconBg: 'bg-[#107c10]/10 text-[#107c10]'
    },
    danger: {
      bg: 'bg-white',
      border: 'border-l-4 border-[#a80000]',
      text: 'text-[#002147]',
      label: 'text-[#605E5C]',
      desc: 'text-[#a80000]',
      iconBg: 'bg-[#a80000]/10 text-[#a80000]'
    }
  };

  const currentStyle = styles[variant];

  return (
    <div className={`dynamics-card p-5 relative overflow-hidden transition-all duration-300 hover:shadow-xl ${currentStyle.bg} ${currentStyle.border}`}>
      <div className="flex justify-between items-start">
        <div className="relative z-10">
          <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${currentStyle.label}`}>{label}</h3>
          <div className={`text-3xl font-black tracking-tight ${currentStyle.text}`}>{value}</div>
          <p className={`text-[10px] font-semibold mt-2 uppercase tracking-wide ${currentStyle.desc}`}>{description}</p>
        </div>
        
        {icon && (
          <div className={`w-10 h-10 rounded flex items-center justify-center shadow-sm ${currentStyle.iconBg}`}>
             {icon}
          </div>
        )}
      </div>
    </div>
  );
};
