
import React, { useRef, useCallback } from 'react';
import { CertificateLayout } from '../../../types';

interface CertificatePreviewProps {
  templateBase64: string | null;
  layout: CertificateLayout;
  previewName: string;
  activeDragField: keyof CertificateLayout | null;
  onDragStart: (field: keyof CertificateLayout, e: React.MouseEvent) => void;
  onDragEnd: () => void;
  onDragMove: (x: number, y: number) => void;
  onResize: (field: keyof CertificateLayout, delta: number) => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  templateBase64,
  layout,
  previewName,
  activeDragField,
  onDragStart,
  onDragEnd,
  onDragMove,
  onResize
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!activeDragField || !previewRef.current) return;

    if (e.buttons !== 1) {
        onDragEnd();
        return;
    }

    const rect = previewRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    onDragMove(x, y);
  }, [activeDragField, onDragEnd, onDragMove]);

  const handleWheel = (field: keyof CertificateLayout, e: React.WheelEvent) => {
      e.stopPropagation();
      const delta = e.deltaY < 0 ? 1 : -1;
      onResize(field, delta);
  };

  return (
    <div className="dynamics-card p-6 bg-[#002147] text-white">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-[#C5A059] font-bold text-xs uppercase tracking-widest">Podgląd na żywo</h3>
            <p className="text-[9px] text-white/50">
              Przeciągnij: LPM | Rozmiar: Scroll
            </p>
        </div>
        
        <div 
            className="aspect-[1.414/1] bg-white w-full relative overflow-hidden shadow-2xl border-2 border-[#C5A059]/30 group select-none"
            ref={previewRef}
            onMouseMove={handleMouseMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
        >
            {templateBase64 ? (
            <img src={templateBase64} className="w-full h-full object-cover pointer-events-none" alt="Podgląd" />
            ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#EDEBE9] text-xs uppercase font-bold bg-[#002147]">Brak szablonu graficznego</div>
            )}
            
            <div className="absolute inset-0">
            {layout.fullName.visible && (
                <div 
                onMouseDown={(e) => onDragStart('fullName', e)}
                onWheel={(e) => handleWheel('fullName', e)}
                style={{
                    position: 'absolute',
                    top: `${layout.fullName.y}%`,
                    left: `${layout.fullName.x}%`,
                    transform: layout.fullName.align === 'center' ? 'translateX(-50%)' : 'none',
                    fontSize: `${layout.fullName.fontSize * 0.5}px`, 
                    color: layout.fullName.color,
                    fontWeight: layout.fullName.fontWeight,
                    fontFamily: layout.fullName.fontFamily || 'Montserrat',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    border: activeDragField === 'fullName' ? '1px dashed #0078D4' : '1px dashed rgba(255,0,0,0.3)',
                    cursor: 'move',
                    padding: '2px',
                    zIndex: 30
                }}>
                {previewName}
                </div>
            )}

            {layout.hierarchicalId.visible && (
                <div 
                onMouseDown={(e) => onDragStart('hierarchicalId', e)}
                onWheel={(e) => handleWheel('hierarchicalId', e)}
                style={{
                    position: 'absolute',
                    top: `${layout.hierarchicalId.y}%`,
                    left: `${layout.hierarchicalId.x}%`,
                    transform: layout.hierarchicalId.align === 'center' ? 'translateX(-50%)' : 'none',
                    fontSize: `${layout.hierarchicalId.fontSize * 0.5}px`,
                    color: layout.hierarchicalId.color,
                    fontWeight: layout.hierarchicalId.fontWeight,
                    fontFamily: layout.hierarchicalId.fontFamily || 'Montserrat',
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    border: activeDragField === 'hierarchicalId' ? '1px dashed #0078D4' : '1px dashed rgba(255,0,0,0.3)',
                    cursor: 'move',
                    padding: '2px',
                    zIndex: 30
                }}>
                ID: SP-WAW-2024/MS
                </div>
            )}

            {layout.date.visible && (
                <div 
                onMouseDown={(e) => onDragStart('date', e)}
                onWheel={(e) => handleWheel('date', e)}
                style={{
                    position: 'absolute',
                    top: `${layout.date.y}%`,
                    left: `${layout.date.x}%`,
                    transform: layout.date.align === 'center' ? 'translateX(-50%)' : 'none',
                    fontSize: `${layout.date.fontSize * 0.5}px`,
                    color: layout.date.color,
                    fontWeight: layout.date.fontWeight,
                    fontFamily: layout.date.fontFamily || 'Montserrat',
                    whiteSpace: 'nowrap',
                    border: activeDragField === 'date' ? '1px dashed #0078D4' : '1px dashed rgba(255,0,0,0.3)',
                    cursor: 'move',
                    padding: '2px',
                    zIndex: 30
                }}>
                12.10.2023
                </div>
            )}

            {layout.hologram.visible && (
                <div 
                onMouseDown={(e) => onDragStart('hologram', e)}
                onWheel={(e) => handleWheel('hologram', e)}
                style={{
                    position: 'absolute',
                    top: `${layout.hologram.y}%`,
                    left: `${layout.hologram.x}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${layout.hologram.fontSize * 0.5}px`, 
                    height: `${layout.hologram.fontSize * 0.5}px`,
                    zIndex: 30,
                    border: activeDragField === 'hologram' ? '1px dashed #0078D4' : '1px dashed rgba(255,0,0,0.3)',
                    cursor: 'move'
                }}>
                    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.25))'}}>
                    <defs>
                        <linearGradient id="previewGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#F8E488', stopOpacity:1}} />
                        <stop offset="30%" style={{stopColor:'#C89932', stopOpacity:1}} />
                        <stop offset="60%" style={{stopColor:'#FDF4BA', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#B07D16', stopOpacity:1}} />
                        </linearGradient>
                        <radialGradient id="previewInnerGold" cx="50%" cy="50%" r="50%">
                            <stop offset="60%" style={{stopColor:'#E9C55C', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:'#B38525', stopOpacity:1}} />
                        </radialGradient>
                    </defs>
                    <circle cx="100" cy="100" r="95" fill="url(#previewGoldGradient)" stroke="#8A6208" strokeWidth="1" />
                    <circle cx="100" cy="100" r="95" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="2,5" opacity="0.4" />
                    
                    <circle cx="100" cy="100" r="75" fill="url(#previewInnerGold)" stroke="#B07D16" strokeWidth="1" />
                    <circle cx="100" cy="100" r="72" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />

                    <path d="M 50,130 Q 30,100 50,70" stroke="#FDF4BA" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 50,130 L 45,120 M 50,120 L 40,110 M 50,110 L 40,100 M 50,100 L 42,90 M 50,90 L 45,80" stroke="#FDF4BA" strokeWidth="2" fill="none" />
                    
                    <path d="M 150,130 Q 170,100 150,70" stroke="#FDF4BA" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 150,130 L 155,120 M 150,120 L 160,110 M 150,110 L 160,100 M 150,100 L 158,90 M 150,90 L 155,80" stroke="#FDF4BA" strokeWidth="2" fill="none" />

                    <path id="previewCurveTop" d="M 35,100 A 65,65 0 1,1 165,100" fill="none" />
                    <text fontSize="14" fontWeight="900" fill="#422900" fontFamily="Montserrat, sans-serif" letterSpacing="2">
                        <textPath href="#previewCurveTop" startOffset="50%" textAnchor="middle">STRATTON PRIME</textPath>
                    </text>
                    
                    <text x="100" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#422900" fontFamily="Montserrat, sans-serif" letterSpacing="1">OFFICIAL</text>
                    <text x="100" y="128" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#422900" fontFamily="Montserrat, sans-serif" letterSpacing="1">CERTIFIED</text>
                    <path d="M 100,75 L 105,88 L 118,88 L 108,96 L 112,108 L 100,100 L 88,108 L 92,96 L 82,88 L 95,88 Z" fill="#FFFFFF" stroke="#B07D16" strokeWidth="1" transform="translate(0, -5)" />
                    </svg>
                </div>
            )}
            </div>
        </div>
    </div>
  );
};
