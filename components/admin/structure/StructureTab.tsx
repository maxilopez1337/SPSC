
import React, { useMemo, useRef, useState, MouseEvent } from 'react';
import { useUsers } from '../../../hooks/useUsers';
import { OrgChartNode } from './OrgChartNode';
import { User } from '../../../types';
import { toSvg } from 'html-to-image';
import { Button } from '../../ui/Button';
import { ICONS } from '../../../constants';

interface OrgNode {
  user: User;
  children: OrgNode[];
}

export const StructureTab: React.FC = () => {
  const { users } = useUsers();
  const chartRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [zoom, setZoom] = useState<number>(1); 
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  // Algorytm budowania drzewa
  const structure = useMemo(() => {
    const userMap = new Map<string, OrgNode>();
    const roots: OrgNode[] = [];

    // 1. Inicjalizacja węzłów
    users.forEach(u => {
        if (u.id === 'admin-root') return; 
        userMap.set(u.email.toLowerCase(), { user: u, children: [] });
    });

    // 2. Budowanie relacji
    users.forEach(u => {
        if (u.id === 'admin-root') return;
        const node = userMap.get(u.email.toLowerCase());
        if (!node) return;
        const managerEmail = u.managerEmail?.toLowerCase().trim();
        if (managerEmail && userMap.has(managerEmail)) {
            userMap.get(managerEmail)!.children.push(node);
        } else {
            roots.push(node);
        }
    });
    return roots;
  }, [users]);

  const handleExport = async () => {
    if (!chartRef.current) return;
    try {
        const realWidth = chartRef.current.scrollWidth / zoom + 100; 
        const realHeight = chartRef.current.scrollHeight / zoom + 100;

        const dataUrl = await toSvg(chartRef.current, {
            backgroundColor: '#ffffff',
            width: realWidth,
            height: realHeight,
            style: {
                transform: 'scale(1)',
                transformOrigin: 'top center',
                margin: '0 auto'
            },
            fontEmbedCSS: '', 
        });
        
        const link = document.createElement('a');
        link.download = `struktura_stratton_full_${new Date().toLocaleDateString().replace(/\./g, '-')}.svg`;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.warn("Ostrzeżenie generowania SVG:", err);
        if (err instanceof Error && !err.message.includes('cssRules')) {
             alert("Błąd generowania pliku wektorowego SVG.");
        }
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.2));
  const handleResetZoom = () => {
      setZoom(1);
      centerView();
  };

  const centerView = () => {
      if (containerRef.current && chartRef.current) {
          const containerWidth = containerRef.current.clientWidth;
          const contentWidth = chartRef.current.scrollWidth;
          containerRef.current.scrollTo({
              left: (contentWidth - containerWidth) / 2,
              top: 0,
              behavior: 'smooth'
          });
      }
  };

  // PANNING LOGIC
  const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartPan({ x: e.clientX, y: e.clientY });
      if (containerRef.current) {
          setScrollStart({ 
              left: containerRef.current.scrollLeft, 
              top: containerRef.current.scrollTop 
          });
      }
      // Zmiana kursora
      document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      const dx = e.clientX - startPan.x;
      const dy = e.clientY - startPan.y;
      
      containerRef.current.scrollLeft = scrollStart.left - dx;
      containerRef.current.scrollTop = scrollStart.top - dy;
  };

  const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 dynamics-card border-l-4 border-[#C5A059]">
         <div>
            <h2 className="text-xl font-bold text-[#002147] uppercase tracking-tight">Struktura Organizacyjna</h2>
            <p className="text-xs text-[#605E5C] mt-1">Wizualizacja hierarchii sprzedaży (Fluent Chart)</p>
         </div>
         <div className="flex items-center gap-4">
            {/* KONTROLA ZOOMU */}
            <div className="flex items-center bg-[#F3F2F1] rounded p-1 border border-[#EDEBE9]">
                <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center text-[#002147] hover:bg-white font-bold rounded" title="Pomniejsz">-</button>
                <span className="text-[10px] font-mono w-12 text-center text-[#605E5C]">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center text-[#002147] hover:bg-white font-bold rounded" title="Powiększ">+</button>
            </div>
            
            <Button variant="ghost" size="sm" onClick={centerView}>Wyśrodkuj</Button>
            <div className="h-6 w-px bg-gray-300 mx-2 hidden sm:block"></div>
            <Button variant="primary" size="sm" onClick={handleExport} icon={<ICONS.Download />}>Pobierz (SVG)</Button>
         </div>
      </div>

      {/* Kontener scrollowalny z obsługą Panningu */}
      <div 
        ref={containerRef}
        className="dynamics-card bg-white p-4 overflow-auto h-[70vh] border-t-4 border-[#002147] flex justify-center items-start bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
         
         <div 
            ref={chartRef} 
            className="p-10 transition-transform duration-200 ease-out origin-top select-none"
            style={{ 
                transform: `scale(${zoom})`,
                minWidth: '100%', 
                display: 'flex',
                justifyContent: 'center'
            }}
         >
            {structure.length === 0 ? (
                <div className="text-gray-400 italic mt-20">Brak danych do wyświetlenia struktury. Sprawdź powiązania managerów w zakładce Kadry.</div>
            ) : (
                <div className="flex gap-16 justify-center">
                    {structure.map(root => (
                        <OrgChartNode key={root.user.id} node={root} depth={0} />
                    ))}
                </div>
            )}
         </div>

      </div>
      
      <div className="text-center text-[10px] text-[#A19F9D] font-mono">
         Możesz przesuwać widok chwytając tło myszką.
      </div>
    </div>
  );
};
