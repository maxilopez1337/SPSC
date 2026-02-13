
import React, { useState } from 'react';
import { User } from '../../../types';

interface OrgNode {
  user: User;
  children: OrgNode[];
}

interface OrgChartNodeProps {
  node: OrgNode;
  depth: number;
}

export const OrgChartNode: React.FC<OrgChartNodeProps> = ({ node, depth }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;

  // Kolorystyka w zależności od głębokości (hierarchii)
  const getCardStyle = (d: number) => {
    switch(d) {
      case 0: return 'border-t-4 border-[#C5A059] bg-[#002147] text-white'; // Szef (Granatowy)
      case 1: return 'border-t-4 border-[#002147] bg-white text-[#002147]'; // Managerowie (Biały)
      default: return 'border-l-4 border-[#C5A059] bg-[#FAF9F8] text-[#605E5C]'; // Pracownicy (Szary)
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* KARTA UŻYTKOWNIKA */}
      <div 
        className={`
          relative flex flex-col items-center p-3 w-64 shadow-lg rounded-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl z-10
          ${getCardStyle(depth)}
        `}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-1">
            {node.user.role === 'MANAGER' ? 'Manager' : (node.user.role === 'ADMIN' ? 'System' : 'Doradca')}
        </div>
        <div className="text-sm font-bold text-center leading-tight">
            {node.user.firstName} {node.user.lastName}
        </div>
        <div className="text-[9px] font-mono mt-1 opacity-70">
            {node.user.hierarchicalId}
        </div>
        
        {/* Badge ilości podwładnych */}
        {hasChildren && (
            <div className={`absolute -bottom-3 flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold shadow-md border-2 border-white ${expanded ? 'bg-[#C5A059] text-[#002147]' : 'bg-[#002147] text-white'}`}>
                {expanded ? '-' : node.children.length}
            </div>
        )}
      </div>

      {/* LINIE I DZIECI */}
      {hasChildren && expanded && (
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Pionowa linia w dół od rodzica */}
          <div className="w-px h-6 bg-[#C5A059]"></div>
          
          <div className="flex items-start justify-center">
            {node.children.map((child, index) => (
              <div key={child.user.id} className="flex flex-col items-center">
                {/* Pozioma belka łącząca rodzeństwo */}
                <div className="flex items-center w-full">
                   {/* Lewa część belki (nie rysujemy dla pierwszego) */}
                   <div className={`h-px bg-[#C5A059] w-1/2 ${index === 0 ? 'invisible' : ''}`}></div>
                   {/* Prawa część belki (nie rysujemy dla ostatniego) */}
                   <div className={`h-px bg-[#C5A059] w-1/2 ${index === node.children.length - 1 ? 'invisible' : ''}`}></div>
                </div>
                
                {/* Pionowa linia do dziecka */}
                <div className="w-px h-6 bg-[#C5A059] -mt-px"></div>
                
                {/* Rekurencja - Dziecko */}
                <div className="px-4 pb-4">
                   <OrgChartNode node={child} depth={depth + 1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
