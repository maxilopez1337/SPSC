
import React from 'react';
import { CertFieldConfig } from '../../../types';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

interface ConfigFieldEditorProps {
  label: string;
  config: CertFieldConfig;
  onChange: (c: CertFieldConfig) => void;
  isActive?: boolean;
}

export const ConfigFieldEditor: React.FC<ConfigFieldEditorProps> = ({ 
  label, 
  config, 
  onChange,
  isActive
}) => {
  return (
    <div className={`bg-[#FAF9F8] p-5 border rounded mb-4 shadow-sm transition-all duration-300 ${isActive ? 'border-[#0078D4] ring-2 ring-[#0078D4]/20' : 'border-[#EDEBE9]'}`}>
      <div className="flex justify-between items-center mb-4 border-b border-[#EDEBE9] pb-2">
        <h4 className={`font-bold text-xs uppercase tracking-widest ${isActive ? 'text-[#0078D4]' : 'text-[#002147]'}`}>
            {isActive ? '🔵 ' : ''}{label}
        </h4>
        <label className="flex items-center space-x-2 text-[10px] uppercase font-bold cursor-pointer text-[#002147]">
          <input 
            type="checkbox" 
            checked={config.visible} 
            onChange={e => onChange({...config, visible: e.target.checked})}
            className="form-checkbox text-[#002147] rounded border-gray-300 focus:ring-[#C5A059]"
          />
          <span>Widoczne</span>
        </label>
      </div>

      <div className="space-y-4">
        {/* Pozycjonowanie */}
        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-[9px] font-bold text-[#605E5C] mb-2 uppercase">Poz. Pozioma (X)</label>
                <div className="flex items-center gap-3">
                    <input 
                        type="range" min="0" max="100" step="1" 
                        value={config.x} 
                        onChange={e => onChange({...config, x: parseInt(e.target.value)})}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#002147]"
                    />
                    <span className="text-[10px] font-mono font-bold w-8 text-right">{config.x}%</span>
                </div>
            </div>

            <div>
                <label className="block text-[9px] font-bold text-[#605E5C] mb-2 uppercase">Poz. Pionowa (Y)</label>
                <div className="flex items-center gap-3">
                    <input 
                        type="range" min="0" max="100" step="1" 
                        value={config.y} 
                        onChange={e => onChange({...config, y: parseInt(e.target.value)})}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#002147]"
                    />
                    <span className="text-[10px] font-mono font-bold w-8 text-right">{config.y}%</span>
                </div>
            </div>
        </div>

        {/* Stylizacja */}
        <div className="grid grid-cols-2 gap-4">
            <Input 
                label="Rozmiar (px)"
                type="number"
                value={config.fontSize}
                onChange={e => onChange({...config, fontSize: parseInt(e.target.value)})}
                className="py-2"
            />

            {/* Kolor i Font ukrywamy dla hologramu */}
            {label !== 'Hologram Cyfrowy' && (
                <>
                    <div>
                        <label className="block text-[10px] font-bold uppercase text-[#002147] mb-1.5 tracking-widest">Kolor</label>
                        <div className="flex gap-2">
                            <div className="relative w-10 h-10 flex-shrink-0 border border-[#D1D1D1] rounded overflow-hidden">
                                <input 
                                    type="color" 
                                    value={config.color} 
                                    onChange={e => onChange({...config, color: e.target.value})}
                                    className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                                />
                            </div>
                            <Input 
                                value={config.color}
                                onChange={e => onChange({...config, color: e.target.value})}
                                className="py-2 uppercase font-mono"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <Select 
                            label="Krój Czcionki"
                            value={config.fontFamily}
                            onChange={e => onChange({...config, fontFamily: e.target.value})}
                            options={[
                                { label: 'Montserrat (Domyślna)', value: 'Montserrat' },
                                { label: 'Times New Roman (Szeryfowa)', value: 'Times New Roman' },
                                { label: 'Arial (Bezszeryfowa)', value: 'Arial' },
                                { label: 'Playfair Display (Elegancka)', value: 'Playfair Display' }
                            ]}
                        />
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
