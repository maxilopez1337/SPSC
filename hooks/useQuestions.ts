
import { useState, useEffect, useMemo } from 'react';
import { Question, QuestionType, Category } from '../types';
import { storage } from '../services/storage';
import { INITIAL_QUESTIONS } from '../constants';
import * as XLSX from 'xlsx';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const QUESTIONS_PER_PAGE = 10;

  useEffect(() => {
    setQuestions(storage.getQuestions());
  }, []);

  // Filtrowanie
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.text.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'ALL' || q.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [questions, search, categoryFilter]);

  // Paginacja
  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = useMemo(() => {
    return filteredQuestions.slice(
      (currentPage - 1) * QUESTIONS_PER_PAGE, 
      currentPage * QUESTIONS_PER_PAGE
    );
  }, [filteredQuestions, currentPage]);

  // Reset strony przy zmianie filtrów
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [search, categoryFilter]);

  // --- ACTIONS ---

  const addQuestion = (newQ: Partial<Question>) => {
    const q: Question = {
      id: Math.random().toString(36).substr(2, 9),
      text: newQ.text as string,
      type: newQ.type as QuestionType,
      category: newQ.category as Category,
      options: (newQ.type === QuestionType.MULTIPLE_CHOICE || newQ.type === QuestionType.MULTI_SELECT) ? newQ.options : undefined,
      correctAnswer: newQ.correctAnswer
    };
    
    const updated = [...questions, q];
    setQuestions(updated);
    storage.saveQuestions(updated);
  };

  const updateQuestion = (updatedQ: Question) => {
    const updated = questions.map(q => q.id === updatedQ.id ? updatedQ : q);
    setQuestions(updated);
    storage.saveQuestions(updated);
  };

  const deleteQuestion = (id: string) => {
    if (confirm('Usunąć to pytanie?')) {
      const updated = questions.filter(q => q.id !== id);
      setQuestions(updated);
      storage.saveQuestions(updated);
      
      const newSet = new Set(selectedIds);
      newSet.delete(id);
      setSelectedIds(newSet);
    }
  };

  const deleteSelected = () => {
    if (selectedIds.size === 0) return;
    if (confirm(`Czy na pewno usunąć ${selectedIds.size} zaznaczonych pytań?`)) {
        const updated = questions.filter(q => !selectedIds.has(q.id));
        setQuestions(updated);
        storage.saveQuestions(updated);
        setSelectedIds(new Set());
    }
  };

  const clearDatabase = () => {
    if (confirm('UWAGA: Czy na pewno chcesz wyczyścić całą bazę pytań? Tej operacji nie można cofnąć.')) {
        setQuestions([]);
        storage.saveQuestions([]);
        setSelectedIds(new Set());
    }
  };

  const loadDefaults = () => {
    if (confirm(`Czy na pewno chcesz zastąpić obecną bazę zestawem domyślnym (${INITIAL_QUESTIONS.length} pytań)?`)) {
        setQuestions(INITIAL_QUESTIONS);
        storage.saveQuestions(INITIAL_QUESTIONS);
        setSelectedIds(new Set());
        setCurrentPage(1);
        alert('Załadowano domyślny zestaw pytań.');
    }
  };

  // --- SELECTION ---
  const toggleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
        const ids = new Set(currentQuestions.map(q => q.id));
        setSelectedIds(ids);
    } else {
        setSelectedIds(new Set());
    }
  };

  const toggleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
        newSet.delete(id);
    } else {
        newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  // --- IMPORT EXCEL ---
  const importFromExcel = async (file: File): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
          
          const newQuestions: Question[] = [];
          jsonData.forEach((row: any) => {
            if (row.category && row.type && row.text) {
               const q: Question = {
                  id: Math.random().toString(36).substr(2, 9),
                  category: (row.category as Category) || Category.LAW,
                  type: (row.type as QuestionType) || QuestionType.MULTIPLE_CHOICE,
                  text: row.text,
                  correctAnswer: row.correctAnswer,
                  options: (row.type === QuestionType.MULTIPLE_CHOICE || row.type === QuestionType.MULTI_SELECT)
                    ? [row.option1, row.option2, row.option3, row.option4].filter((o: any) => o) 
                    : undefined
               };
               newQuestions.push(q);
            }
          });
          const updated = [...questions, ...newQuestions];
          setQuestions(updated);
          storage.saveQuestions(updated);
          resolve(newQuestions.length);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  // --- IMPORT TXT ---
  const importFromTxt = async (file: File): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          // Dzielimy na bloki oddzielone pustymi liniami
          const blocks = text.split(/\n\s*\n/);
          const newQuestions: Question[] = [];

          for (const block of blocks) {
            const lines = block.split('\n').map(l => l.trim()).filter(l => l);
            if (lines.length === 0) continue;

            // Próba parsowania bloku
            let qText = '';
            let options: string[] = [];
            let correct = '';
            let category: Category = Category.LAW; // Domyślna
            let type: QuestionType = QuestionType.MULTIPLE_CHOICE;

            // Analiza linii
            for (const line of lines) {
              if (line.toLowerCase().startsWith('pytanie:') || line.match(/^\d+\./)) {
                qText = line.replace(/^Pytanie:\s*/i, '').replace(/^\d+\.\s*/, '').trim();
              } else if (line.match(/^[A-D]\s*[:.)]/i)) {
                // Opcje A, B, C, D
                options.push(line.replace(/^[A-D]\s*[:.)]\s*/i, '').trim());
              } else if (line.toLowerCase().startsWith('odp:') || line.toLowerCase().startsWith('poprawna:') || line.toLowerCase().startsWith('poprawne:')) {
                // Wykrywanie liczby mnogiej
                if (line.toLowerCase().includes('odpowiedzi') || line.toLowerCase().includes('poprawne')) {
                    type = QuestionType.MULTI_SELECT;
                }

                const ans = line.replace(/^(Odp|Poprawna|Poprawne odpowiedzi|Poprawne):\s*/i, '').trim();
                
                // Obsługa wielu odpowiedzi (A, B, D) lub pojedynczej (A)
                const parts = ans.split(/,\s*/);
                const correctParts: string[] = [];

                parts.forEach(part => {
                    // Jeśli to tylko litera
                    if (part.length === 1 && part.match(/[A-D]/i)) {
                        const idx = part.toUpperCase().charCodeAt(0) - 65;
                        if (options[idx]) correctParts.push(options[idx]);
                    } else {
                        // Pełny tekst
                        correctParts.push(part);
                    }
                });

                if (type === QuestionType.MULTI_SELECT) {
                    correct = correctParts.sort().join('|');
                } else {
                    correct = correctParts[0] || '';
                }

              } else if (line.toLowerCase().startsWith('kategoria:') || line.toLowerCase().startsWith('kat:')) {
                 const catStr = line.replace(/^(Kategoria|Kat):\s*/i, '').trim().toLowerCase();
                 if (catStr.includes('produkt') || catStr.includes('wiedza')) category = Category.PRODUCT_KNOWLEDGE;
                 else category = Category.LAW;
              }
            }

            // Jeśli nie znaleziono etykiet, zakładamy kolejność: 1 linia = pytanie, kolejne = opcje
            if (!qText && lines.length >= 2) {
               qText = lines[0];
               if (lines.length >= 5) { // Pytanie + 4 opcje
                   options = lines.slice(1, 5);
                   // Szukamy odpowiedzi w ostatniej linii lub oznaczona *
                   const potentialAns = lines.find(l => l.startsWith('*') || l.includes('Poprawna'));
                   if (potentialAns) correct = potentialAns.replace('*', '').replace('Poprawna:', '').trim();
               }
            }

            // Walidacja
            if (qText) {
                // Wykrywanie typu Prawda/Fałsz
                if (options.length === 0 && (qText.toLowerCase().includes('prawda') || correct.toLowerCase().match(/prawda|fałsz/))) {
                    type = QuestionType.TRUE_FALSE;
                    options = ['Prawda', 'Fałsz']; // Ustawiamy standardowe opcje dla logiki UI
                } else if (type === QuestionType.MULTI_SELECT) {
                    // Jeśli wykryto typ wielokrotnego wyboru, zachowujemy go
                } else if (options.length > 1) {
                    type = QuestionType.MULTIPLE_CHOICE;
                } else if (options.length === 0) {
                    type = QuestionType.OPEN;
                }

                newQuestions.push({
                    id: Math.random().toString(36).substr(2, 9),
                    text: qText,
                    type,
                    category,
                    options: (type === QuestionType.MULTIPLE_CHOICE || type === QuestionType.MULTI_SELECT) ? options : undefined,
                    correctAnswer: correct
                });
            }
          }

          if (newQuestions.length > 0) {
              const updated = [...questions, ...newQuestions];
              setQuestions(updated);
              storage.saveQuestions(updated);
              resolve(newQuestions.length);
          } else {
              resolve(0);
          }

        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(file);
    });
  };

  return {
    questions,
    currentQuestions,
    totalPages,
    currentPage,
    search,
    categoryFilter,
    selectedIds,
    setSearch,
    setCategoryFilter,
    setCurrentPage,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    deleteSelected,
    clearDatabase,
    loadDefaults,
    toggleSelectAll,
    toggleSelectOne,
    importFromExcel,
    importFromTxt
  };
};
