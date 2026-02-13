
import React, { useState } from 'react';
import { Question, QuestionType, Category } from '../../../types';
import { Modal } from '../../Modal';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';

interface EditQuestionModalProps {
  question: Question;
  onSave: (q: Question) => void;
  onCancel: () => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ 
  question, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Question>({ ...question, options: question.options || ['', '', '', ''] });

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.text.trim()) {
          alert('Treść pytania jest wymagana');
          return;
      }
      if (formData.type === QuestionType.MULTIPLE_CHOICE || formData.type === QuestionType.MULTI_SELECT) {
          if (formData.options?.some(o => !o.trim())) {
              alert('Wszystkie opcje odpowiedzi muszą być wypełnione');
              return;
          }
          if (!formData.correctAnswer) {
              alert('Wybierz poprawną odpowiedź (lub odpowiedzi)');
              return;
          }
      }
      onSave(formData);
  };

  const handleMultiSelectToggle = (opt: string) => {
      let current = formData.correctAnswer ? formData.correctAnswer.split('|') : [];
      if (current.includes(opt)) {
          current = current.filter(x => x !== opt);
      } else {
          current.push(opt);
      }
      setFormData({...formData, correctAnswer: current.sort().join('|')});
  };

  return (
      <Modal 
        title="Edycja Pytania" 
        onClose={onCancel} 
        maxWidth="max-w-2xl"
        borderColor="navy"
      >
          <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                  <Select 
                      label="Typ Pytania"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value as QuestionType, correctAnswer: ''})}
                      options={[
                          { label: 'Jednokrotny Wybór', value: QuestionType.MULTIPLE_CHOICE },
                          { label: 'Wielokrotny Wybór', value: QuestionType.MULTI_SELECT },
                          { label: 'Prawda / Fałsz', value: QuestionType.TRUE_FALSE },
                          { label: 'Otwarte', value: QuestionType.OPEN }
                      ]}
                  />
                  <Select 
                      label="Kategoria"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as Category})}
                      options={[
                          { label: Category.LAW, value: Category.LAW },
                          { label: Category.PRODUCT_KNOWLEDGE, value: Category.PRODUCT_KNOWLEDGE }
                      ]}
                  />
              </div>

              <Textarea 
                  label="Treść Pytania"
                  value={formData.text}
                  onChange={e => setFormData({...formData, text: e.target.value})}
                  required
                  className="h-32"
              />

              {(formData.type === QuestionType.MULTIPLE_CHOICE || formData.type === QuestionType.MULTI_SELECT) && (
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-4">
                      <p className="text-[10px] font-bold uppercase text-[#002147] tracking-widest">
                          {formData.type === QuestionType.MULTIPLE_CHOICE ? 'Poprawna Odpowiedź (1)' : 'Poprawne Odpowiedzi (Wiele)'}
                      </p>
                      {formData.options?.map((opt, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                              {formData.type === QuestionType.MULTIPLE_CHOICE ? (
                                  <input 
                                      type="radio" 
                                      name="editCorrectAnswer" 
                                      checked={formData.correctAnswer === opt && opt !== ''} 
                                      onChange={() => setFormData({...formData, correctAnswer: opt})}
                                      className="accent-[#002147] h-5 w-5 flex-shrink-0 cursor-pointer"
                                  />
                              ) : (
                                  <input 
                                      type="checkbox" 
                                      checked={formData.correctAnswer?.split('|').includes(opt) && opt !== ''} 
                                      onChange={() => handleMultiSelectToggle(opt)}
                                      className="accent-[#C5A059] h-5 w-5 flex-shrink-0 cursor-pointer"
                                  />
                              )}
                              
                              <Input 
                                  value={opt}
                                  onChange={e => {
                                      const newOpts = [...(formData.options || [])];
                                      newOpts[idx] = e.target.value;
                                      
                                      let newCorrect = formData.correctAnswer || '';
                                      if (formData.type === QuestionType.MULTIPLE_CHOICE) {
                                          if (formData.correctAnswer === opt) newCorrect = e.target.value;
                                      } else {
                                          let parts = newCorrect.split('|');
                                          if (parts.includes(opt)) {
                                              parts = parts.map(p => p === opt ? e.target.value : p);
                                              newCorrect = parts.join('|');
                                          }
                                      }
                                      setFormData({...formData, options: newOpts, correctAnswer: newCorrect});
                                  }}
                                  placeholder={`Opcja ${String.fromCharCode(65+idx)}`}
                                  className={
                                      (formData.type === QuestionType.MULTIPLE_CHOICE && formData.correctAnswer === opt && opt !== '') ||
                                      (formData.type === QuestionType.MULTI_SELECT && formData.correctAnswer?.split('|').includes(opt) && opt !== '')
                                      ? 'border-[#002147] ring-1 ring-[#002147]' : ''
                                  }
                              />
                          </div>
                      ))}
                  </div>
              )}

              {formData.type === QuestionType.TRUE_FALSE && (
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                      <p className="text-[10px] font-bold uppercase text-[#002147] mb-3 tracking-widest">Poprawna Odpowiedź</p>
                      <div className="flex gap-4">
                          {['Prawda', 'Fałsz'].map(val => (
                              <label key={val} className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 border rounded shadow-sm w-full hover:bg-gray-50 transition-colors">
                                  <input 
                                      type="radio" 
                                      name="editTfAnswer" 
                                      value={val}
                                      checked={formData.correctAnswer === val}
                                      onChange={() => setFormData({...formData, correctAnswer: val})}
                                      className="accent-[#002147]"
                                  />
                                  <span className="text-sm font-bold text-[#002147]">{val}</span>
                              </label>
                          ))}
                      </div>
                  </div>
              )}

              {formData.type === QuestionType.OPEN && (
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                      <Input 
                          label="Słowa Kluczowe (Opcjonalnie)"
                          value={formData.correctAnswer || ''}
                          onChange={e => setFormData({...formData, correctAnswer: e.target.value})}
                          placeholder="Dla sprawdzającego..."
                          description="Pomocnicze frazy dla osoby sprawdzającej egzamin."
                      />
                  </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-[#EDEBE9]">
                  <Button type="button" variant="outline" fullWidth onClick={onCancel}>
                      Anuluj
                  </Button>
                  <Button type="submit" variant="primary" fullWidth>
                      Zapisz Zmiany
                  </Button>
              </div>
          </form>
      </Modal>
  );
};
