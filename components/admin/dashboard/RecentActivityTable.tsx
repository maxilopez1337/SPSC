
import React from 'react';
import { ExamResult } from '../../../types';

interface RecentActivityTableProps {
  results: ExamResult[];
  onViewAll: () => void;
}

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ results, onViewAll }) => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-white shadow-lg border-t-4 border-[#002147] flex flex-col h-full">
        <div className="p-5 border-b border-[#EDEBE9] flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#C5A059]"></div>
                <h3 className="text-xs font-black uppercase text-[#002147] tracking-widest">Ostatnie Aktywności</h3>
            </div>
            <button onClick={onViewAll} className="text-[10px] font-bold text-[#605E5C] hover:text-[#002147] hover:underline uppercase tracking-widest transition-colors">
                Pełny Rejestr &rarr;
            </button>
        </div>
        <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-[#FAF9F8] text-[9px] font-black uppercase text-[#A19F9D] tracking-wider">
                <tr>
                    <th className="p-4 border-b border-[#EDEBE9]">Data</th>
                    <th className="p-4 border-b border-[#EDEBE9]">Doradca</th>
                    <th className="p-4 border-b border-[#EDEBE9]">Wynik</th>
                    <th className="p-4 border-b border-[#EDEBE9] text-right">Status</th>
                </tr>
                </thead>
                <tbody className="text-xs divide-y divide-[#F3F2F1]">
                {[...results].reverse().slice(0, 8).map(r => (
                    <tr key={r.id} className="hover:bg-[#F8FDFE] group transition-colors">
                    <td className="p-4 text-[#605E5C] font-mono whitespace-nowrap">{r.date.split(' ')[0]}</td>
                    <td className="p-4">
                        <div className="font-bold text-[#002147]">{r.userName}</div>
                        <div className="text-[9px] text-[#A19F9D] group-hover:text-[#C5A059] transition-colors">{r.hierarchicalId}</div>
                    </td>
                    <td className="p-4">
                        <span className={`font-black ${r.passed ? 'text-[#002147]' : 'text-[#a80000]'}`}>{r.score}%</span>
                    </td>
                    <td className="p-4 text-right">
                        <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest border-l-2 ${r.passed ? 'border-[#107c10] text-[#107c10] bg-[#107c10]/5' : 'border-[#a80000] text-[#a80000] bg-[#a80000]/5'}`}>
                        {r.passed ? 'ZALICZONY' : 'ODRZUCONY'}
                        </span>
                    </td>
                    </tr>
                ))}
                {results.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-400 text-xs italic">Brak danych w rejestrze.</td></tr>
                )}
                </tbody>
            </table>
        </div>
    </div>
  );
};
