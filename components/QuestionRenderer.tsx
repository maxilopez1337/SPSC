
import React from 'react';
import { Question, QuestionType, Category } from '../types';
import { Textarea } from './ui/Textarea';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (val: string, justification?: string) => void;
  currentValue: string;
  currentJustification?: string;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({ 
  question, onAnswer, currentValue, currentJustification 
}) => {
  
  // OPTYMALIZACJA MOBILE: Mniejsze fonty dla małych ekranów
  // MOBILE: text-sm (14px)
  // DESKTOP: text-xl (20px) lub text-2xl (24px)
  const isLongText = question.text.length > 150;
  const textSizeClass = isLongText 
    ? 'text-sm md:text-xl leading-relaxed' 
    : 'text-base md:text-2xl leading-snug';

  // Obsługa zmiany dla Multi-Select (checkboxy)
  const handleMultiSelectChange = (option: string) => {
    let selected = currentValue ? currentValue.split('|') : [];
    if (selected.includes(option)) {
      selected = selected.filter(s => s !== option);
    } else {
      selected.push(option);
    }
    onAnswer(selected.sort().join('|'));
  };

  return (
    <div className="space-y-3 md:space-y-6">
      
      {/* Question Card */}
      <div className="bg-white p-4 md:p-8 rounded-lg border-l-4 md:border-l-[6px] border-[#002147] shadow-sm">
        <h3 className={`font-bold text-[#002147] tracking-tight ${textSizeClass}`}>
            {question.text}
        </h3>
        {question.type === QuestionType.MULTI_SELECT && (
            <p className="text-[10px] md:text-xs font-bold text-[#C5A059] mt-2 md:mt-3 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Wybierz wszystkie poprawne odpowiedzi
            </p>
        )}
      </div>

      {/* ANSWERS AREA */}
      <div>
        {/* SINGLE CHOICE (Radio) & MULTI SELECT (Checkbox) */}
        {(question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.MULTI_SELECT) && (
            <div className="grid grid-cols-1 gap-2 md:gap-3">
                {question.options?.map((opt, idx) => {
                    const isMulti = question.type === QuestionType.MULTI_SELECT;
                    const isSelected = isMulti 
                        ? currentValue.split('|').includes(opt) 
                        : currentValue === opt;
                    
                    const letter = String.fromCharCode(65 + idx); // A, B, C, D...
                    
                    // Jeszcze mniejszy font na mobile dla długich odpowiedzi
                    // MOBILE: text-xs (bardzo długie) lub text-sm
                    const optSizeClass = opt.length > 80 ? 'text-xs md:text-base' : 'text-sm md:text-base';

                    return (
                        <label 
                            key={opt} 
                            className={`
                                relative flex items-start p-3 md:p-5 rounded border cursor-pointer transition-all duration-200 group active:scale-[0.99]
                                ${isSelected 
                                    ? 'border-[#002147] bg-[#F0F4F8] shadow-sm' 
                                    : 'border-[#E1DFDD] bg-white hover:border-[#C5A059]'
                                }
                            `}
                        >
                            <input 
                                type={isMulti ? "checkbox" : "radio"} 
                                name={`q-${question.id}`} 
                                className="hidden"
                                checked={isSelected}
                                onChange={() => isMulti ? handleMultiSelectChange(opt) : onAnswer(opt)}
                                autoComplete="off"
                            />

                            {/* Indicator */}
                            <div className={`
                                w-6 h-6 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center rounded mr-2 md:mr-3 font-bold text-xs md:text-sm transition-colors border
                                ${isSelected 
                                    ? 'bg-[#002147] text-white border-[#002147]' 
                                    : 'bg-[#F3F2F1] text-[#605E5C] border-[#EDEBE9] group-hover:bg-[#C5A059] group-hover:text-white group-hover:border-[#C5A059]'
                                }
                            `}>
                                {isSelected && isMulti ? '✓' : letter}
                            </div>

                            <span className={`${optSizeClass} leading-snug pt-0.5 md:pt-1 ${isSelected ? 'text-[#002147] font-semibold' : 'text-[#323130]'}`}>
                                {opt}
                            </span>
                        </label>
                    );
                })}
            </div>
        )}

        {/* TRUE / FALSE - COMPACT CARDS */}
        {question.type === QuestionType.TRUE_FALSE && (
          <div className="space-y-3 md:space-y-6">
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {['Prawda', 'Fałsz'].map(opt => {
                  const isSelected = currentValue === opt;
                  
                  return (
                    <label 
                      key={opt} 
                      className={`
                        flex flex-col items-center justify-center p-3 md:p-6 border rounded cursor-pointer transition-all duration-200 active:scale-95
                        ${isSelected 
                            ? 'border-[#002147] bg-[#F0F4F8] shadow-sm' 
                            : 'border-[#EDEBE9] bg-white hover:border-[#C5A059] hover:bg-[#FFFCF5]'
                        }
                      `}
                    >
                      <input 
                        type="radio" 
                        className="hidden"
                        checked={isSelected}
                        onChange={() => onAnswer(opt, currentJustification)}
                        autoComplete="off"
                      />
                      <span className={`text-sm md:text-lg font-black uppercase tracking-widest ${isSelected ? 'text-[#002147]' : 'text-[#605E5C]'}`}>{opt}</span>
                    </label>
                  );
              })}
            </div>
            
            <div className="bg-white p-2 md:p-4 border border-[#EDEBE9] rounded">
                <Textarea 
                    label="Uzasadnienie (Wymagane)"
                    className="h-16 md:h-24 text-xs md:text-sm resize-none"
                    placeholder="Wpisz krótkie uzasadnienie..."
                    value={currentJustification}
                    onChange={e => onAnswer(currentValue, e.target.value)}
                    autoComplete="off"
                />
            </div>
          </div>
        )}

        {/* OPEN QUESTION */}
        {question.type === QuestionType.OPEN && (
          <div className="bg-white p-1 rounded">
             <Textarea 
                label="Twoja odpowiedź"
                className="h-32 md:h-64 text-sm md:text-base p-3 md:p-4"
                placeholder="Wpisz odpowiedź..."
                value={currentValue}
                onChange={e => onAnswer(e.target.value)}
                autoComplete="off"
             />
          </div>
        )}
      </div>
    </div>
  );
};
