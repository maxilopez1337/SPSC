
import React from 'react';
import { ExamResult } from '../../../types';
import { pdfService } from '../../../services/pdfService';
import { ICONS } from '../../../constants';
import { Modal } from '../../Modal';
import { Button } from '../../ui/Button';

interface ExamDetailsModalProps {
  result: ExamResult;
  onClose: () => void;
}

export const ExamDetailsModal: React.FC<ExamDetailsModalProps> = ({ result, onClose }) => {
  
  const handleDownloadReport = () => {
    pdfService.generateAuditReport(result);
  };

  return (
    <Modal
        title={<><ICONS.User /> Karta Egzaminacyjna</>}
        onClose={onClose}
        maxWidth="max-w-4xl"
        borderColor="navy"
    >
        <div className="space-y-8">
            <p className="text-xs text-[#605E5C] -mt-4 font-mono uppercase tracking-widest border-b border-[#EDEBE9] pb-4">
                ID REF: {result.id} | {result.date}
            </p>
            
            {/* Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="dynamics-card p-4 border-l-4 border-[#C5A059]">
                    <p className="text-[10px] font-bold uppercase text-[#605E5C]">Doradca</p>
                    <p className="text-lg font-black text-[#002147]">{result.userName}</p>
                    <p className="text-xs text-[#605E5C]">{result.hierarchicalId}</p>
                </div>
                <div className="dynamics-card p-4 border-l-4 border-[#002147]">
                    <p className="text-[10px] font-bold uppercase text-[#605E5C]">Wynik Końcowy</p>
                    <div className="flex items-end gap-2">
                        <span className={`text-3xl font-black ${result.passed ? 'text-[#107c10]' : 'text-[#a80000]'}`}>{result.score}%</span>
                        <span className={`text-xs font-bold uppercase mb-1 px-2 py-0.5 rounded ${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {result.passed ? 'POZYTYWNY' : 'NEGATYWNY'}
                        </span>
                    </div>
                </div>
                <div className="dynamics-card p-4 flex flex-col justify-center items-center text-center bg-[#F3F2F1]">
                    <Button 
                        onClick={handleDownloadReport}
                        disabled={!result.answersLog || result.answersLog.length === 0}
                        variant="primary"
                        fullWidth
                        icon={<ICONS.Download />}
                        size="sm"
                    >
                        POBIERZ RAPORT DOWODOWY
                    </Button>
                    {(!result.answersLog || result.answersLog.length === 0) && (
                        <p className="text-[9px] text-red-600 mt-2">Brak logów szczegółowych (stary rekord).</p>
                    )}
                </div>
            </div>

            {/* Answer Log Table */}
            <div>
                <h4 className="text-sm font-bold text-[#002147] uppercase tracking-wide border-b border-[#EDEBE9] pb-2 mb-4">Pełny Log Odpowiedzi</h4>
                {result.answersLog && result.answersLog.length > 0 ? (
                    <div className="border border-[#EDEBE9] rounded overflow-hidden">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAF9F8] text-[10px] uppercase text-[#605E5C] font-bold">
                                <tr>
                                    <th className="p-3 w-10 text-center">#</th>
                                    <th className="p-3">Pytanie</th>
                                    <th className="p-3 w-1/4">Odpowiedź Użytkownika</th>
                                    <th className="p-3 w-1/4">Poprawna Odpowiedź</th>
                                    <th className="p-3 w-16 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EDEBE9]">
                                {result.answersLog.map((log, idx) => (
                                    <tr key={idx} className={log.isCorrect ? 'bg-white' : 'bg-red-50/50'}>
                                        <td className="p-3 text-center text-gray-400 font-mono">{idx + 1}</td>
                                        <td className="p-3 font-medium text-[#323130]">{log.questionText}</td>
                                        <td className={`p-3 font-bold ${log.isCorrect ? 'text-[#107c10]' : 'text-[#a80000]'}`}>
                                            {log.userAnswer}
                                        </td>
                                        <td className="p-3 text-[#605E5C]">{log.correctAnswer}</td>
                                        <td className="p-3 text-center">
                                            {log.isCorrect ? (
                                                <span className="text-[#107c10] font-bold">✔</span>
                                            ) : (
                                                <span className="text-[#a80000] font-bold">✕</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 p-8 text-center text-gray-500 italic rounded">
                        Ten egzamin został przeprowadzony przed wdrożeniem modułu audytowego. Szczegółowe logi odpowiedzi nie są dostępne.
                    </div>
                )}
            </div>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-[#EDEBE9] flex justify-end">
             <Button onClick={onClose} variant="outline">
                Zamknij Podgląd
             </Button>
        </div>
    </Modal>
  );
};
