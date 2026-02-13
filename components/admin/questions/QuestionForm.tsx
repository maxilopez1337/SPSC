
import React, { useState } from 'react';
import { Question, QuestionType, Category } from '../../../types';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';

interface QuestionFormProps {
  onAdd: (q: Partial<Question>) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ onAdd }) => {
  const [newQ, setNewQ] = useState<Partial<Question>>({
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.LAW,
    text: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.text) return;
    
    if (newQ.type === QuestionType.MULTIPLE_CHOICE || newQ.type === QuestionType.MULTI_SELECT) {
        if (!newQ.options || newQ.options.some(o => !o.trim())) {
            alert('Wszystkie 4 warianty odpowiedzi muszą być uzupełnione.');
            return;
        }
        if (!newQ.correctAnswer) {
            alert('Musisz zaznaczyć poprawną odpowiedź.');
            return;
        }
    }

    if (newQ.type === QuestionType.TRUE_FALSE && !newQ.correctAnswer) {
        alert('Musisz wybrać czy zdanie jest Prawdziwe czy Fałszywe.');
        return;
    }

    onAdd(newQ);
    
    // Reset formularza
    setNewQ({ 
        type: QuestionType.MULTIPLE_CHOICE, 
        category: Category.LAW, 
        text: '', 
        options: ['', '', '', ''], 
        correctAnswer: '' 
    });
  };

  const handleMultiSelectToggle = (opt: string) => {
      let current = newQ.correctAnswer ? newQ.correctAnswer.split('|') : [];
      if (current.includes(opt)) {
          current = current.filter(x => x !== opt);
      } else {
          current.push(opt);
      }
      setNewQ({...newQ, correctAnswer: current.sort().join('|')});
  };

  return (
    <div className="dynamics-card p-6 border-t-4 border-[#002147] bg-white">
        <details className="group">
        <summary className="list-none flex justify-between items-center cursor-pointer">
            <span className="text-sm font-bold text-[#002147] uppercase tracking-tight flex items-center gap-2">
                <span className="bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">+</span>
                Dodaj nowe pytanie manualnie
            </span>
            <span className="text-[#C5A059] group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div className="mt-6 pt-6 border-t border-[#EDEBE9]">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <Select
                    label="Typ Pytania"
                    value={newQ.type}
                    onChange={e => {
                        const type = e.target.value as QuestionType;
                        setNewQ({...newQ, type, correctAnswer: ''}); // Reset odpowiedzi przy zmianie typu
                    }}
                    options={[
                        { label: 'Jednokrotny Wybór (Radio)', value: QuestionType.MULTIPLE_CHOICE },
                        { label: 'Wielokrotny Wybór (Checkbox)', value: QuestionType.MULTI_SELECT },
                        { label: 'Prawda / Fałsz', value: QuestionType.TRUE_FALSE },
                        { label: 'Otwarte (Opisowe)', value: QuestionType.OPEN }
                    ]}
                />
                <Select
                    label="Kategoria"
                    value={newQ.category}
                    onChange={e => setNewQ({...newQ, category: e.target.value as Category})}
                    options={[
                        { label: Category.LAW, value: Category.LAW },
                        { label: Category.PRODUCT_KNOWLEDGE, value: Category.PRODUCT_KNOWLEDGE }
                    ]}
                />
            </div>

            <div className="md:col-span-2">
                <Textarea 
                    label="Treść Pytania"
                    value={newQ.text} 
                    onChange={e => setNewQ({...newQ, text: e.target.value})} 
                    required 
                    className="h-24"
                />
            </div>

            {(newQ.type === QuestionType.MULTIPLE_CHOICE || newQ.type === QuestionType.MULTI_SELECT) && (
                <div className="md:col-span-2 grid grid-cols-1 gap-4 bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="text-[10px] font-bold uppercase text-[#002147] mb-2">
                        {newQ.type === QuestionType.MULTIPLE_CHOICE ? 'Zaznacz JEDNĄ poprawną odpowiedź' : 'Zaznacz WSZYSTKIE poprawne odpowiedzi'}
                    </p>
                    {newQ.options?.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            {newQ.type === QuestionType.MULTIPLE_CHOICE ? (
                                <input 
                                    type="radio" 
                                    name="correctAnswer" 
                                    checked={newQ.correctAnswer === opt && opt !== ''} 
                                    onChange={() => setNewQ({...newQ, correctAnswer: opt})}
                                    className="accent-[#002147] h-4 w-4 flex-shrink-0"
                                />
                            ) : (
                                <input 
                                    type="checkbox" 
                                    checked={newQ.correctAnswer?.split('|').includes(opt) && opt !== ''} 
                                    onChange={() => handleMultiSelectToggle(opt)}
                                    className="accent-[#C5A059] h-4 w-4 flex-shrink-0"
                                />
                            )}
                            <Input 
                                placeholder={`Opcja ${String.fromCharCode(65+idx)}`} 
                                value={opt} 
                                onChange={e => {
                                    const opts = [...(newQ.options || [])];
                                    opts[idx] = e.target.value;
                                    
                                    // Update correct answer logic if option text changes
                                    let newCorrect = newQ.correctAnswer || '';
                                    if (newQ.type === QuestionType.MULTIPLE_CHOICE) {
                                        if (newQ.correctAnswer === opt) newCorrect = e.target.value;
                                    } else {
                                        // For multi select, we need to replace the old text with new text in the pipe string
                                        let parts = newCorrect.split('|');
                                        if (parts.includes(opt)) {
                                            parts = parts.map(p => p === opt ? e.target.value : p);
                                            newCorrect = parts.join('|');
                                        }
                                    }
                                    
                                    setNewQ({...newQ, options: opts, correctAnswer: newCorrect});
                                }}
                                className={
                                    (newQ.type === QuestionType.MULTIPLE_CHOICE && newQ.correctAnswer === opt && opt !== '') ||
                                    (newQ.type === QuestionType.MULTI_SELECT && newQ.correctAnswer?.split('|').includes(opt) && opt !== '')
                                    ? 'border-[#002147] ring-1 ring-[#002147]' : ''
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

            {newQ.type === QuestionType.TRUE_FALSE && (
                <div className="md:col-span-2 bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="text-[10px] font-bold uppercase text-[#002147] mb-2">Poprawna Odpowiedź</p>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-3 border rounded shadow-sm hover:bg-gray-50 transition-colors w-full">
                            <input 
                                type="radio" 
                                name="tf_answer" 
                                value="Prawda"
                                checked={newQ.correctAnswer === 'Prawda'}
                                onChange={() => setNewQ({...newQ, correctAnswer: 'Prawda'})}
                                className="accent-[#002147]"
                            />
                            <span className="text-sm font-bold text-[#002147]">Prawda</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-3 border rounded shadow-sm hover:bg-gray-50 transition-colors w-full">
                            <input 
                                type="radio" 
                                name="tf_answer" 
                                value="Fałsz"
                                checked={newQ.correctAnswer === 'Fałsz'}
                                onChange={() => setNewQ({...newQ, correctAnswer: 'Fałsz'})}
                                className="accent-[#002147]"
                            />
                            <span className="text-sm font-bold text-[#002147]">Fałsz</span>
                        </label>
                    </div>
                </div>
            )}

            {newQ.type === QuestionType.OPEN && (
                <div className="md:col-span-2 bg-gray-50 p-4 rounded border border-gray-200">
                    <Input 
                        label="Słowa kluczowe (Opcjonalnie)"
                        placeholder="Wpisz kluczowe frazy oddzielone przecinkami (dla sprawdzającego)" 
                        value={newQ.correctAnswer || ''}
                        onChange={e => setNewQ({...newQ, correctAnswer: e.target.value})}
                        description="Dla pytań otwartych system nie ocenia automatycznie, ale podpowiedź ułatwi weryfikację ręczną."
                    />
                </div>
            )}

            <div className="md:col-span-2">
                <Button type="submit" variant="primary" size="lg" fullWidth>
                    Zapisz pytanie do bazy
                </Button>
            </div>
            </form>
        </div>
        </details>
    </div>
  );
};
