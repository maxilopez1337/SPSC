
import { useState, useEffect } from 'react';
import { CertificateLayout } from '../types';
import { storage } from '../services/storage';
import { pdfService } from '../services/pdfService';
import * as pdfjsLib from 'pdfjs-dist';

// FIX: Bezpieczna obsługa importu ES Module dla pdfjs-dist
const getPdfLib = () => {
    const lib = pdfjsLib as any;
    return lib.default ? lib.default : lib;
};

const PDFJS = getPdfLib();
PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export const useCertificate = () => {
  const [certTemplate, setCertTemplate] = useState<{ name: string, base64: string } | null>(null);
  const [certLayout, setCertLayout] = useState<CertificateLayout>(storage.getCertLayout());
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCertTemplate(storage.getCertTemplate());
  }, []);

  // Auto-save layout effect can be in component or here.
  // Let's provide a save function instead of auto-save to be more explicit in UI, 
  // but if we want WYSIWYG feeling, update state immediately and save debounced or on unmount.
  // For now, simple save function.

  const saveLayout = (layout: CertificateLayout) => {
    setCertLayout(layout);
    storage.saveCertLayout(layout);
  };

  const handleManualSave = () => {
    setIsSaving(true);
    storage.saveCertLayout(certLayout);
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleCertUpload = async (file: File) => {
    if (file.type === 'application/pdf') {
        setIsProcessingPdf(true);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFJS.getDocument(arrayBuffer).promise;
            const page = await pdf.getPage(1);
            // Zwiększamy skalę przy imporcie szablonu dla lepszej jakości (High DPI)
            const scale = 3; 
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            if (context) {
                await page.render({ canvasContext: context, viewport }).promise;
                const base64 = canvas.toDataURL('image/png', 1.0);
                const data = { name: file.name, base64 };
                storage.saveCertTemplate(data);
                setCertTemplate(data);
            }
        } catch (error) {
            console.error(error);
            alert("Błąd podczas przetwarzania pliku PDF.");
        } finally {
            setIsProcessingPdf(false);
        }
    } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          const data = { name: file.name, base64 };
          storage.saveCertTemplate(data);
          setCertTemplate(data);
        };
        reader.readAsDataURL(file);
    }
  };

  const loadDefaultTemplate = async () => {
     await storage.loadDefaultTemplateFromAssets();
     setCertTemplate(storage.getCertTemplate());
     alert('Próba przywrócenia pliku "CERTYFIKAT.png" z serwera zakończona.');
  };

  const removeTemplate = () => {
      storage.saveCertTemplate(null);
      setCertTemplate(null);
  };

  const previewPdf = async (name: string) => {
    const mockUser = {
        firstName: name.split(' ')[0] || 'Jan',
        lastName: name.split(' ').slice(1).join(' ') || 'Kowalski',
        hierarchicalId: 'SP-WAW-2024/PREVIEW'
    };
    await pdfService.previewCertificate(mockUser, '12.10.2023');
  };

  return {
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
  };
};
