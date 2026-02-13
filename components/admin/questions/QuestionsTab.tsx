
import React, { useState, useRef } from 'react';
import { useQuestions } from '../../../hooks/useQuestions';
import { QuestionList } from './QuestionList';
import { QuestionForm } from './QuestionForm';
import { EditQuestionModal } from './EditQuestionModal';
import { Question, Category } from '../../../types';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { ICONS } from '../../../constants';
import * as XLSX from 'xlsx';

export const QuestionsTab = () => {
  const { 
    questions, currentQuestions, totalPages, currentPage, search, categoryFilter, selectedIds,
    setSearch, setCategoryFilter, setCurrentPage, addQuestion, updateQuestion, deleteQuestion, 
    deleteSelected, clearDatabase, loadDefaults, toggleSelectAll, toggleSelectOne, importFromExcel, importFromTxt
  } = useQuestions();

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const questionImportRef = useRef<HTMLInputElement>(null);

  const downloadQuestionSample = () => {
    const data = [
      { category: 'Prawo', type: 'MULTIPLE_CHOICE', text: 'Przykład pytania...', correctAnswer: 'Opcja A', option1: 'Opcja A', option2: 'Opcja B', option3: 'Opcja C', option4: 'Opcja D' },
      { category: 'Wiedza o produktach', type: 'TRUE_FALSE', text: 'Czy to prawda?', correctAnswer: 'Prawda', option1: '', option2: '', option3: '', option4: '' }
    ];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pytania");
    XLSX.writeFile(workbook, "stratton_wzor_pytan.xlsx");
  };

  const exportAllQuestions = () => {
      const data = questions.map(q => ({
          ID: q.id,
          Kategoria: q.category,
          Typ: q.type,
          Pytanie: q.text,
          Poprawna_Odpowiedz: q.correctAnswer,
          Opcja_1: q.options?.[0] || '',
          Opcja_2: q.options?.[1] || '',
          Opcja_3: q.options?.[2] || '',
          Opcja_4: q.options?.[3] || ''
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Baza Pytań");
      XLSX.writeFile(workbook, `stratton_baza_pytan_full_${new Date().toLocaleDateString().replace(/\./g,'-')}.xlsx`);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        let count = 0;
        if (file.name.endsWith('.txt')) {
            count = await importFromTxt(file);
        } else {
            count = await importFromExcel(file);
        }
        
        if (count > 0) {
            alert(`Sukces! Zaimportowano ${count} nowych pytań do bazy.`);
        } else {
            alert("Nie znaleziono poprawnych pytań w pliku. Sprawdź formatowanie.");
        }
      } catch (err) {
        alert("Błąd importu pliku. Upewnij się, że format jest poprawny.");
        console.error(err);
      }
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ACTION BAR */}
      <div className="bg-white p-4 shadow-sm border border-[#EDEBE9] flex flex-col lg:flex-row justify-between items-end lg:items-center gap-4 sticky top-0 z-10">
         
         {/* Filters */}
         <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-end">
            <div className="w-full sm:w-64">
                <div className="relative">
                    <Input 
                        placeholder="Szukaj w treści..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-[#F3F2F1] border-none focus:ring-1"
                    />
                    <div className="absolute left-3 top-3.5 text-[#605E5C]">
                        <ICONS.Search />
                    </div>
                </div>
            </div>
            
            <div className="w-full sm:w-48">
                <Select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    options={[
                        { label: 'Wszystkie Kategorie', value: 'ALL' },
                        { label: 'Prawo', value: Category.LAW },
                        { label: 'Wiedza Produktowa', value: Category.PRODUCT_KNOWLEDGE }
                    ]}
                    className="bg-[#F3F2F1] border-none font-bold"
                />
            </div>
         </div>

         {/* Actions */}
         <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
            <Button 
                variant={showAddForm ? 'secondary' : 'outline'} 
                size="sm" 
                onClick={() => setShowAddForm(!showAddForm)}
            >
                {showAddForm ? 'Zamknij Kreatora' : '+ Dodaj Pytanie'}
            </Button>

            <div className="h-8 w-px bg-[#EDEBE9] mx-1 hidden sm:block"></div>

            <input type="file" ref={questionImportRef} onChange={handleFileChange} className="hidden" accept=".csv, .xlsx, .xls, .txt" />
            
            <Button variant="ghost" size="sm" onClick={() => questionImportRef.current?.click()} icon={<ICONS.Upload />}>
                Import
            </Button>
            <Button variant="ghost" size="sm" onClick={exportAllQuestions}>
                Eksport Bazy (XLSX)
            </Button>

            {selectedIds.size > 0 && (
                <Button variant="danger" size="sm" onClick={deleteSelected} className="animate-in zoom-in">
                    Usuń ({selectedIds.size})
                </Button>
            )}
            
            <div className="h-8 w-px bg-[#EDEBE9] mx-1 hidden sm:block"></div>
            
            <Button variant="ghost" size="sm" onClick={loadDefaults} className="text-gray-400 hover:text-gray-600">
                Reset
            </Button>
         </div>
      </div>

      {showAddForm && (
          <div className="animate-in slide-in-from-top-4 duration-300">
             <QuestionForm onAdd={addQuestion} />
          </div>
      )}

      {/* Info Bar */}
      <div className="flex justify-between items-center px-1">
         <span className="text-[10px] font-bold text-[#A19F9D] uppercase tracking-widest">
            Baza Wiedzy: {questions.length} pytań
         </span>
      </div>

      {/* Question List */}
      <QuestionList 
        questions={currentQuestions}
        selectedIds={selectedIds}
        currentPage={currentPage}
        totalPages={totalPages}
        search={search}
        categoryFilter={categoryFilter}
        onSearchChange={setSearch}
        onFilterChange={setCategoryFilter}
        onPageChange={setCurrentPage}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectOne={toggleSelectOne}
        onDelete={deleteQuestion}
        onEdit={setEditingQuestion}
      />

      {/* Edit Modal */}
      {editingQuestion && (
        <EditQuestionModal 
          question={editingQuestion} 
          onSave={(updated) => { updateQuestion(updated); setEditingQuestion(null); }} 
          onCancel={() => setEditingQuestion(null)} 
        />
      )}
    </div>
  );
};
