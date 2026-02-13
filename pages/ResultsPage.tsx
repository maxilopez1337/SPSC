
import React, { useState, useEffect } from 'react';
import { ExamResult } from '../types';
import { pdfService } from '../services/pdfService';
import { ICONS } from '../constants';
import { storage } from '../services/storage';

interface ResultsPageProps {
  result: ExamResult;
  onBack: () => void;
  onRetry: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ result, onBack, onRetry }) => {
  const [downloading, setDownloading] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [showRetryConfirm, setShowRetryConfirm] = useState(false);
  const [showErrorAnalysis, setShowErrorAnalysis] = useState(false);

  const failedAttempts = storage.getFailedAttemptsCount(result.email);
  const remainingAttempts = 3 - failedAttempts;

  const steps = [
    { title: "Weryfikacja merytoryczna", desc: "Wynik pozytywny zatwierdzony przez system (71%+).", icon: "🏛️" },
    { title: "Generowanie certyfikatu", desc: "Dokument PDF z hologramem cyfrowym wysłany na e-mail.", icon: "🏆" },
    { title: "Aktywacja uprawnień", desc: "Twój profil CRM został wzbogacony o status 'Certyfikowany'.", icon: "💎" },
    { title: "Raport końcowy", desc: "Menadżer regionalny otrzymał powiadomienie o sukcesie.", icon: "📋" },
    { title: "Etap praktyczny", desc: "Zaproszenie na weryfikację ustną zostanie wysłane wkrótce.", icon: "🎙️" },
    { title: "Inauguracja", desc: "Oficjalne wręczenie fizycznego certyfikatu podczas najbliższego eventu.", icon: "🥂" }
  ];

  useEffect(() => {
    if (result.passed) {
      const interval = setInterval(() => {
        setVisibleCount(prev => {
          if (prev < steps.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 600);
      return () => clearInterval(interval);
    }
  }, [result.passed]);

  const handleDownload = async () => {
    setDownloading(true);
    await pdfService.generateCertificate(
      { 
        firstName: result.userName.split(' ')[0], 
        lastName: result.userName.split(' ')[1] || '', 
        hierarchicalId: result.hierarchicalId 
      },
      result.date
    );
    setDownloading(false);
  };

  const handleDownloadMistakes = () => {
      pdfService.generateMistakesReport(result);
  };

  // Filtracja błędnych odpowiedzi do analizy
  const incorrectAnswers = result.answersLog ? result.answersLog.filter(l => !l.isCorrect) : [];

  return (
    <div className="max-w-6xl mx-auto w-full py-8 md:py-16 px-4 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Kolumna Lewa: Podsumowanie Wyniku */}
        <div className="lg:col-span-7 space-y-8">
          <div className="dynamics-card p-12 relative overflow-hidden border-t-8 border-[#C5A059] bg-white">
            {result.passed && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C5A059] rotate-45 flex items-end justify-center pb-2">
                <span className="text-[#002147] font-black text-[10px] uppercase tracking-tighter -rotate-45 mb-4">Elite</span>
              </div>
            )}
            
            <div className="flex flex-col items-center text-center space-y-8">
              <div className={`w-32 h-32 rounded-none flex items-center justify-center shadow-2xl transform rotate-45 border-4 ${result.passed ? 'bg-[#002147] border-[#C5A059] text-[#C5A059]' : 'bg-[#FDE7E9] border-[#A80000] text-[#A80000]'}`}>
                <div className="-rotate-45">
                  {result.passed ? (
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <h1 className="text-4xl font-extrabold text-[#002147] tracking-tight mb-4 uppercase">
                  {result.passed ? 'CERTYFIKACJA PRZYZNANA' : 'WYNIK NEGATYWNY'}
                </h1>
                <p className="text-[#605E5C] text-base leading-relaxed max-w-lg mx-auto font-medium">
                  {result.passed 
                    ? 'Pomyślnie ukończyłeś proces weryfikacji teoretycznej w Stratton Prime. Twoja wiedza merytoryczna spełnia najwyższe standardy korporacyjne.'
                    : !result.passed && remainingAttempts <= 0 
                    ? 'Wyczerpałeś limit podejść. Twój profil został zablokowany w celu obowiązkowej re-edukacji.'
                    : `Nie osiągnięto wymaganego progu 71%. Pozostała liczba prób w bieżącym cyklu: ${remainingAttempts}.`}
                </p>
              </div>

              <div className="flex items-center space-x-8 p-8 bg-[#FAF9F8] border border-[#EDEBE9] rounded-none shadow-inner">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#605E5C] uppercase tracking-[0.3em]">Twój wynik</span>
                  <span className={`text-7xl font-black ${result.passed ? 'text-[#002147]' : 'text-[#A80000]'}`}>{result.score}%</span>
                </div>
                <div className="h-16 w-px bg-[#C5A059]/30"></div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-[#605E5C] uppercase tracking-[0.3em]">Wymagane</span>
                  <span className="text-4xl font-bold text-[#605E5C]">71%</span>
                </div>
              </div>

              {result.passed && (
                <div className="w-full pt-6 space-y-4">
                  <button 
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full dynamics-button-primary py-6 px-8 font-black flex items-center justify-center space-x-4 shadow-2xl active:scale-95 transition-all text-lg text-[#002147]"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>{downloading ? 'GENEROWANIE DOKUMENTU...' : 'POBIERZ CERTYFIKAT PRESTIGE'}</span>
                  </button>
                  <p className="text-[10px] text-[#A19F9D] uppercase tracking-widest font-bold">Dokument zabezpieczony cyfrowym kluczem autentyczności</p>
                </div>
              )}

              {/* Sekcja Raportu Błędów - widoczna ZAWSZE, jeśli są błędy (niezależnie od wyniku) */}
              {incorrectAnswers.length > 0 && (
                <div className="w-full pt-6 border-t border-[#EDEBE9]">
                    <p className="text-xs text-[#605E5C] mb-4 font-bold uppercase tracking-wide">Analiza pomyłek egzaminacyjnych</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                        <button 
                            onClick={() => setShowErrorAnalysis(!showErrorAnalysis)}
                            className="bg-white border border-[#002147] text-[#002147] py-3 px-6 text-[10px] font-bold uppercase tracking-widest hover:bg-[#F3F2F1] flex items-center justify-center gap-2 transition-all flex-1"
                        >
                            <span>{showErrorAnalysis ? 'Ukryj podgląd błędów' : 'Zobacz błędy na ekranie'}</span>
                            <svg className={`w-4 h-4 transition-transform ${showErrorAnalysis ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        
                        <button
                            onClick={handleDownloadMistakes}
                            className="bg-[#a80000] text-white border border-[#a80000] py-3 px-6 text-[10px] font-bold uppercase tracking-widest hover:bg-[#8a0000] flex items-center justify-center gap-2 transition-all flex-1 shadow-lg"
                        >
                            <ICONS.Download />
                            <span>Pobierz Raport Błędów (PDF)</span>
                        </button>
                    </div>
                    
                    {showErrorAnalysis && (
                        <div className="mt-6 text-left bg-gray-50 p-4 border border-gray-200 rounded animate-in fade-in slide-in-from-top-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                             <h4 className="text-sm font-black text-[#a80000] uppercase mb-4 flex items-center gap-2 sticky top-0 bg-gray-50 pb-2 border-b border-gray-200">
                                <ICONS.Alert /> Wykaz Błędnych Odpowiedzi ({incorrectAnswers.length})
                             </h4>
                             <div className="space-y-4 pr-2">
                                 {incorrectAnswers.map((item, idx) => (
                                     <div key={idx} className="bg-white p-4 border-l-4 border-red-500 text-xs shadow-sm">
                                         <p className="font-bold text-[#002147] mb-2">{idx + 1}. {item.questionText}</p>
                                         <div className="grid grid-cols-1 gap-2 pl-2 border-l border-gray-100 ml-1">
                                            <div>
                                                <span className="block text-[9px] uppercase font-bold text-red-600 mb-0.5">Twoja odpowiedź:</span>
                                                <span className="text-red-800 font-medium bg-red-50 px-2 py-1 inline-block rounded">{item.userAnswer}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[9px] uppercase font-bold text-green-600 mb-0.5">Poprawna odpowiedź:</span>
                                                <span className="text-green-800 font-medium bg-green-50 px-2 py-1 inline-block rounded">{item.correctAnswer}</span>
                                            </div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    )}
                </div>
              )}

              {!result.passed && remainingAttempts > 0 && (
                <div className="w-full pt-6">
                  {!showRetryConfirm ? (
                    <button 
                      onClick={() => setShowRetryConfirm(true)}
                      className="w-full bg-[#002147] text-[#C5A059] py-6 px-8 font-black flex items-center justify-center space-x-4 shadow-xl hover:bg-[#003366] transition-all text-lg rounded-none"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <span>PONÓW PRÓBĘ EGZAMINU</span>
                    </button>
                  ) : (
                    <div className="bg-[#FAF9F8] p-6 border-2 border-[#002147] space-y-4 animate-in zoom-in-95 duration-200">
                      <p className="text-sm font-bold text-[#002147]">Czy na pewno chcesz rozpocząć nową próbę teraz?</p>
                      <div className="flex space-x-3">
                        <button onClick={onRetry} className="flex-1 dynamics-button-primary py-3 font-bold text-[#002147]">TAK, ROZPOCZNIJ</button>
                        <button onClick={() => setShowRetryConfirm(false)} className="flex-1 bg-white border border-[#D1D1D1] py-3 font-bold text-[#605E5C]">ANULUJ</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button 
                onClick={onBack}
                className="text-[#605E5C] text-xs font-bold uppercase tracking-widest hover:text-[#002147] transition-colors py-4"
              >
                Zakończ sesję i wróć do portalu
              </button>
            </div>
          </div>
        </div>

        {/* Kolumna Prawa: Następne Kroki */}
        <div className="lg:col-span-5 space-y-6">
          <div className="dynamics-card p-8 border-l-8 border-[#002147] bg-[#002147]/[0.02]">
            <h2 className="text-xl font-black text-[#002147] mb-8 tracking-tight uppercase border-b border-[#C5A059]/20 pb-4">
              Twoja Ścieżka Stratton Prime
            </h2>
            
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start space-x-4 p-4 transition-all duration-500 transform ${idx < visibleCount ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                >
                  <div className={`w-10 h-10 rounded-none flex-shrink-0 flex items-center justify-center text-xl shadow-lg border-2 ${idx < visibleCount ? 'bg-[#002147] border-[#C5A059] text-white' : 'bg-[#FAF9F8] border-[#EDEBE9]'}`}>
                    {idx < visibleCount ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h3 className={`text-sm font-black uppercase tracking-wide ${idx < visibleCount ? 'text-[#002147]' : 'text-[#A19F9D]'}`}>{step.title}</h3>
                    <p className={`text-xs font-medium mt-1 leading-relaxed ${idx < visibleCount ? 'text-[#605E5C]' : 'text-[#A19F9D]'}`}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {result.passed && visibleCount === steps.length && (
              <div className="mt-10 p-6 bg-[#C5A059]/10 border border-[#C5A059] animate-in fade-in slide-in-from-bottom-4">
                 <div className="flex items-center space-x-3 text-[#002147] mb-2">
                   <span className="text-2xl">🎓</span>
                   <span className="font-black uppercase text-xs tracking-widest">Kolejny Krok</span>
                 </div>
                 <p className="text-xs font-medium text-[#002147] leading-relaxed">
                   Zaproszenie na spotkanie online sprawdzające wiedzę praktyczną zostanie wysłane na Twój adres służbowy w ciągu 48 godzin roboczych.
                 </p>
              </div>
            )}
          </div>

          <div className="dynamics-card p-8 bg-gradient-to-br from-[#002147] to-[#003366] text-white">
            <h3 className="text-[#C5A059] font-black uppercase text-[10px] tracking-[0.3em] mb-4">Wsparcie Doradcy</h3>
            <p className="text-sm font-light leading-relaxed mb-6 text-white/90">Masz pytania dotyczące procesu certyfikacji lub swojego wyniku? Skontaktuj się z Działem Rozwoju Kadr.</p>
            <a href="mailto:biuro@stratton-prime.pl" className="inline-flex items-center space-x-2 text-[#C5A059] font-bold text-xs uppercase tracking-widest hover:underline">
               <span>Napisz do nas</span>
               <ICONS.ArrowRight />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
