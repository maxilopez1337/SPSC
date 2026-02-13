
import React, { useState } from 'react';
import { useResults } from '../../../hooks/useResults';
import { ICONS } from '../../../constants';
import { ExamResult } from '../../../types';
import { ExamDetailsModal } from './ExamDetailsModal';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { pdfService } from '../../../services/pdfService';
import * as XLSX from 'xlsx';

export const ResultsTab: React.FC = () => {
  const { results } = useResults();
  const [search, setSearch] = useState('');
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);

  // Filtrowanie wyników
  const filteredResults = results.filter(r => 
    r.userName.toLowerCase().includes(search.toLowerCase()) ||
    r.hierarchicalId.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  // Funkcja eksportu do Excel
  const exportToExcel = () => {
    const data = filteredResults.map(r => ({
        'Data': r.date,
        'Imię i Nazwisko': r.userName,
        'ID': r.hierarchicalId,
        'Email': r.email,
        'Przełożony': r.managerName || '-',
        'Wynik': `${r.score}%`,
        'Status': r.passed ? 'POZYTYWNY' : 'NEGATYWNY'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rejestr Egzaminów");
    XLSX.writeFile(workbook, `stratton_rejestr_${new Date().toLocaleDateString().replace(/\./g, '-')}.xlsx`);
  };

  const exportToPDF = () => {
      pdfService.generateExamRegistryPDF(filteredResults);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="w-full md:w-auto">
                <h2 className="text-xl font-bold text-[#002147] uppercase tracking-tight">Rejestr Egzaminów ({filteredResults.length})</h2>
                <p className="text-xs text-[#605E5C] mt-1">Pełna historia certyfikacji. Kliknij wiersz, aby zobaczyć szczegóły audytowe.</p>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto items-end">
                <div className="relative flex-1 min-w-[200px] md:w-64">
                    <Input 
                        placeholder="Szukaj (Nazwisko, ID, Email)..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                    <div className="absolute left-3 top-3.5 text-[#C5A059]">
                        <ICONS.Search />
                    </div>
                </div>
                <Button variant="outline" size="sm" onClick={exportToPDF}>
                    Eksport PDF
                </Button>
                <Button 
                    variant="outline"
                    size="sm"
                    onClick={exportToExcel}
                    icon={<ICONS.ArrowRight />}
                >
                    Eksport Excel
                </Button>
            </div>
        </div>

        <div className="dynamics-card overflow-hidden bg-white border-t-4 border-[#002147]">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-[#FAF9F8] text-[9px] font-bold uppercase text-[#605E5C] border-b border-[#EDEBE9]">
                    <tr>
                        <th className="p-4">Data</th>
                        <th className="p-4">Doradca</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Przełożony</th>
                        <th className="p-4">Wynik</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Szczegóły</th>
                    </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-[#EDEBE9]">
                    {filteredResults.length === 0 && (
                        <tr>
                            <td colSpan={7} className="p-8 text-center text-gray-400 italic">Brak wyników spełniających kryteria.</td>
                        </tr>
                    )}
                    {[...filteredResults].reverse().map((r) => (
                        <tr 
                            key={r.id} 
                            onClick={() => setSelectedResult(r)}
                            className="hover:bg-blue-50 transition-colors cursor-pointer group"
                        >
                        <td className="p-4 text-[#605E5C] font-mono whitespace-nowrap">{r.date}</td>
                        <td className="p-4 font-bold text-[#002147]">
                            {r.userName}
                            <div className="text-[9px] font-normal opacity-60 font-mono mt-0.5">{r.hierarchicalId}</div>
                        </td>
                        <td className="p-4 text-[#323130]">{r.email}</td>
                        <td className="p-4 text-[#323130]">
                            {r.managerName || '-'}
                            {r.managerEmail && <div className="text-[9px] text-gray-400">{r.managerEmail}</div>}
                        </td>
                        <td className="p-4 font-black text-[#002147]">{r.score}%</td>
                        <td className="p-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${r.passed ? 'bg-[#002147] text-[#C5A059] border-[#002147]' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {r.passed ? 'POZYTYWNY' : 'NEGATYWNY'}
                            </span>
                        </td>
                        <td className="p-4 text-center text-[#002147] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                            <span className="border-b border-[#002147] pb-0.5 text-[10px] uppercase">Pokaż Kartę</span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Modal Szczegółów */}
        {selectedResult && (
            <ExamDetailsModal 
                result={selectedResult} 
                onClose={() => setSelectedResult(null)} 
            />
        )}
    </div>
  );
};
