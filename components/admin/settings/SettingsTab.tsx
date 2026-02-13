
import React, { useState, useRef } from 'react';
import { useCertificate } from '../../../hooks/useCertificate';
import { ConfigFieldEditor } from './ConfigFieldEditor';
import { CertificatePreview } from './CertificatePreview';
import { CertificateLayout } from '../../../types';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { ICONS } from '../../../constants';

export const SettingsTab: React.FC = () => {
  const { 
    certTemplate, 
    certLayout, 
    isProcessingPdf, 
    isSaving, 
    setCertLayout,
    saveLayout,
    handleManualSave, 
    handleCertUpload, 
    loadDefaultTemplate,
    removeTemplate,
    previewPdf
  } = useCertificate();

  const [previewName, setPreviewName] = useState('Marzanna Szarolkiewicz');
  const [activeDragField, setActiveDragField] = useState<keyof CertificateLayout | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false); 
  const certInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (field: keyof CertificateLayout, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDragField(field);
  };

  const handleDragEnd = () => {
    setActiveDragField(null);
  };

  const handleDragMove = (x: number, y: number) => {
    if (activeDragField) {
        setCertLayout(prev => ({
            ...prev,
            [activeDragField]: {
                ...prev[activeDragField],
                x: Math.round(x),
                y: Math.round(y)
            }
        }));
    }
  };

  const handleResize = (field: keyof CertificateLayout, delta: number) => {
    setCertLayout(prev => {
        const currentSize = prev[field].fontSize;
        const newSize = Math.max(5, currentSize + delta);
        return {
            ...prev,
            [field]: {
                ...prev[field],
                fontSize: newSize
            }
        };
    });
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          handleCertUpload(e.target.files[0]);
      }
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleCertUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEWA KOLUMNA: KONFIGURACJA + DROP ZONE */}
        <div 
            className={`dynamics-card p-10 border-l-8 transition-all duration-300 ${
                isDraggingFile 
                    ? 'border-[#C5A059] bg-[#002147]/5 ring-4 ring-[#C5A059]/20 scale-[1.01]' 
                    : 'border-[#C5A059] bg-white'
            }`}
            onDragOver={handleFileDragOver}
            onDragLeave={handleFileDragLeave}
            onDrop={handleFileDrop}
        >
            <h2 className="text-xl font-bold text-[#002147] mb-6 uppercase tracking-tight">Szablon Certyfikatu</h2>
            
            {isDraggingFile ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#C5A059] rounded bg-white/50">
                    <svg className="w-16 h-16 text-[#C5A059] mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <p className="text-[#002147] font-bold uppercase tracking-widest">Upuść plik tutaj</p>
                </div>
            ) : (
                <>
                    <p className="text-sm text-[#605E5C] mb-8">Wgraj plik <strong>PDF</strong> lub obraz (JPG/PNG), który będzie tłem dla generowanych certyfikatów. <br/>System automatycznie przekonwertuje pierwszą stronę PDF na wysokiej jakości tło.</p>
                    
                    <input type="file" ref={certInputRef} onChange={onFileInputChange} className="hidden" accept="image/*,application/pdf" />
                    <div className="space-y-4">
                        <Button 
                            onClick={() => certInputRef.current?.click()} 
                            isLoading={isProcessingPdf}
                            fullWidth
                            variant="primary"
                            icon={<ICONS.Upload />}
                        >
                            {isProcessingPdf ? 'PRZETWARZANIE PDF...' : 'WYBIERZ PLIK SZABLONU'}
                        </Button>
                        
                        <Button 
                            onClick={loadDefaultTemplate} 
                            variant="outline"
                            fullWidth
                            size="sm"
                        >
                            Załaduj plik domyślny (CERTYFIKAT.png)
                        </Button>
                    </div>
                    
                    {certTemplate && (
                    <div className="mt-6 p-4 border border-[#EDEBE9] bg-[#FAF9F8] flex justify-between items-center rounded">
                        <p className="text-[10px] font-bold uppercase text-[#605E5C]">Aktywny: {certTemplate.name}</p>
                        <Button onClick={removeTemplate} variant="danger" size="sm">
                            Usuń
                        </Button>
                    </div>
                    )}
                    
                    <hr className="my-8 border-[#EDEBE9]" />

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#002147] uppercase tracking-tight">Edytor Układu</h2>
                        <div className="flex gap-2">
                            <Button 
                                onClick={() => previewPdf(previewName)}
                                variant="outline"
                                size="sm"
                            >
                                Podgląd PDF/Obraz
                            </Button>
                            <Button 
                                onClick={() => downloadPdf(previewName)}
                                variant="primary"
                                size="sm"
                            >
                                Pobierz PDF
                            </Button>
                            <Button 
                                onClick={handleManualSave}
                                variant="primary"
                                size="sm"
                                isLoading={isSaving}
                            >
                                {isSaving ? 'Zapisywanie...' : 'Zapisz Układ'}
                            </Button>
                        </div>
                    </div>
                    <p className="text-xs text-[#605E5C] mb-4">Możesz edytować pozycje ręcznie poniżej lub <strong>przeciągać elementy myszką</strong> na podglądzie obok.</p>

                    <ConfigFieldEditor 
                        label="Imię i Nazwisko" 
                        config={certLayout.fullName} 
                        onChange={c => setCertLayout({...certLayout, fullName: c})} 
                        isActive={activeDragField === 'fullName'}
                    />
                    <ConfigFieldEditor 
                        label="Numer ID" 
                        config={certLayout.hierarchicalId} 
                        onChange={c => setCertLayout({...certLayout, hierarchicalId: c})} 
                        isActive={activeDragField === 'hierarchicalId'}
                    />
                    <ConfigFieldEditor 
                        label="Data Egzaminu" 
                        config={certLayout.date} 
                        onChange={c => setCertLayout({...certLayout, date: c})} 
                        isActive={activeDragField === 'date'}
                    />
                    
                    <ConfigFieldEditor 
                        label="Hologram Cyfrowy" 
                        config={certLayout.hologram} 
                        onChange={c => setCertLayout({...certLayout, hologram: c})} 
                        isActive={activeDragField === 'hologram'}
                    />
                </>
            )}
        </div>

        {/* PRAWA KOLUMNA: PODGLĄD */}
        <div>
            <div className="mb-4 flex justify-end">
                <div className="w-64">
                    <Input 
                        value={previewName}
                        onChange={(e) => setPreviewName(e.target.value)}
                        placeholder="Imię do podglądu..."
                        className="text-right"
                    />
                </div>
            </div>
            <CertificatePreview 
                templateBase64={certTemplate?.base64 || null}
                layout={certLayout}
                previewName={previewName}
                activeDragField={activeDragField}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                onResize={handleResize}
            />
        </div>
    </div>
  );
};
