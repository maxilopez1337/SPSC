
import React, { useState } from 'react';
import { Question, QuestionType, Category } from '../../../types';
import { ICONS } from '../../../constants';

interface QuestionListProps {
  questions: Question[];
  selectedIds: Set<string>;
  currentPage: number;
  totalPages: number;
  search: string;
  categoryFilter: string;
  onSearchChange: (val: string) => void;
  onFilterChange: (val: string) => void;
  onPageChange: (page: number) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onToggleSelectOne: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (q: Question) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions, selectedIds, currentPage, totalPages, search, categoryFilter,
  onSearchChange, onFilterChange, onPageChange, onToggleSelectAll, onToggleSelectOne, onDelete, onEdit
}) => {
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  return (
    <>
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
         <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Szukaj w treści pytania..." 
              className="w-full dynamics-input pl-9 text-[#002147]"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-[#C5A059]">
               <ICONS.Search />
            </div>
         </div>
         <div className="w-full md:w-64">
            <select 
                className="w-full dynamics-input text-[#002147]"
                value={categoryFilter}
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="ALL">Wszystkie kategorie</option>
                <option value={Category.LAW}>{Category.LAW}</option>
                <option value={Category.PRODUCT_KNOWLEDGE}>{Category.PRODUCT_KNOWLEDGE}</option>
            </select>
         </div>
      </div>

      <div className="dynamics-card overflow-hidden">
         <div className="overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[#FAF9F8] text-[9px] font-bold uppercase text-[#605E5C] border-b border-[#EDEBE9]">
                <tr>
                    <th className="p-4 w-10 text-center">
                        <input 
                            type="checkbox" 
                            onChange={(e) => onToggleSelectAll(e.target.checked)}
                            checked={questions.length > 0 && questions.every(q => selectedIds.has(q.id))}
                            className="cursor-pointer accent-[#002147]"
                            title="Zaznacz wszystkie na stronie"
                        />
                    </th>
                    <th className="p-4 w-1/6">Kategoria / Typ</th>
                    <th className="p-4 w-1/2">Treść Pytania</th>
                    <th className="p-4 text-right">Akcja</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEBE9] text-xs">
                {questions.length === 0 && (
                    <tr><td colSpan={4} className="p-12 text-center text-[#A19F9D] italic font-medium tracking-wide">Brak pytań spełniających kryteria wyszukiwania.</td></tr>
                )}
                {questions.map(q => {
                    const isExpanded = expandedQId === q.id;
                    const isSelected = selectedIds.has(q.id);
                    return (
                        <React.Fragment key={q.id}>
                            <tr 
                                onClick={() => setExpandedQId(isExpanded ? null : q.id)} 
                                className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-50' : (isExpanded ? 'bg-[#F3F2F1]' : 'hover:bg-[#FAF9F8]')}`}
                            >
                                <td className="p-4 text-center align-top" onClick={e => e.stopPropagation()}>
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        onChange={() => onToggleSelectOne(q.id)}
                                        className="cursor-pointer accent-[#002147]"
                                    />
                                </td>
                                <td className="p-4 align-top">
                                    <div className="flex flex-col gap-1">
                                        <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase w-fit ${q.category === Category.LAW ? 'bg-[#002147] text-white' : 'bg-[#C5A059] text-white'}`}>
                                            {q.category === Category.LAW ? 'PRAWO' : 'PRODUKT'}
                                        </span>
                                        <span className="text-[9px] text-[#605E5C] font-mono">{q.type}</span>
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <p className="font-semibold text-[#323130] line-clamp-2">{q.text}</p>
                                    {isExpanded && (
                                        <div className="mt-4 pl-4 border-l-2 border-[#C5A059] space-y-2 animate-in fade-in slide-in-from-top-2">
                                            <p className="text-[10px] font-bold text-[#605E5C] uppercase">Warianty Odpowiedzi:</p>
                                            {q.type === QuestionType.MULTIPLE_CHOICE && (
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {q.options?.map((opt, i) => (
                                                        <li key={i} className={`p-2 rounded border text-xs ${opt === q.correctAnswer ? 'bg-green-50 border-green-300 text-green-900 font-bold' : 'bg-white border-gray-200 text-[#323130]'}`}>
                                                            {String.fromCharCode(65 + i)}. {opt}
                                                            {opt === q.correctAnswer && <span className="ml-2">✓</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {q.type === QuestionType.TRUE_FALSE && (
                                                <div className="flex gap-4">
                                                    <span className={`px-3 py-1 rounded border ${q.correctAnswer === 'Prawda' ? 'bg-green-50 border-green-300 text-green-900 font-bold' : 'bg-white text-[#323130]'}`}>Prawda</span>
                                                    <span className={`px-3 py-1 rounded border ${q.correctAnswer === 'Fałsz' ? 'bg-green-50 border-green-300 text-green-900 font-bold' : 'bg-white text-[#323130]'}`}>Fałsz</span>
                                                </div>
                                            )}
                                            {q.type === QuestionType.OPEN && (
                                                <p className="text-gray-500 italic bg-gray-50 p-2 rounded">Pytanie otwarte - ocena manualna / słowa kluczowe: <span className="font-bold">{q.correctAnswer || '(brak)'}</span></p>
                                            )}
                                            <div className="pt-2 text-[10px] text-gray-400 font-mono">ID: {q.id}</div>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 text-right align-top whitespace-nowrap">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onEdit(q); }} 
                                            className="text-[#002147] hover:bg-gray-100 p-2 rounded transition-colors"
                                            title="Edytuj pytanie"
                                        >
                                            <ICONS.Edit />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); onDelete(q.id); }} 
                                            className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                                            title="Usuń pytanie"
                                        >
                                            <ICONS.Trash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
         </div>
         
         {/* Pagination Controls */}
         {totalPages > 1 && (
             <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 bg-[#FAF9F8] border-t border-[#EDEBE9]">
                 <div className="flex gap-2 w-full sm:w-auto justify-center">
                    <button 
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white border border-[#EDEBE9] text-xs font-bold disabled:opacity-50 text-[#002147] w-full sm:w-auto"
                    >
                        Poprzednia
                    </button>
                    <button 
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white border border-[#EDEBE9] text-xs font-bold disabled:opacity-50 text-[#002147] w-full sm:w-auto"
                    >
                        Następna
                    </button>
                 </div>
                 <span className="text-xs font-bold text-[#605E5C]">Strona {currentPage} z {totalPages}</span>
             </div>
         )}
      </div>
    </>
  );
};
