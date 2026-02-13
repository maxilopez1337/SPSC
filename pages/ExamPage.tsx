
import React, { useState, useEffect, useCallback } from 'react';
import { User, Question, ExamResult, QuestionType, Category, AnswerLog } from '../types';
import { storage } from '../services/storage';
import { TIME_PER_QUESTION, PASS_THRESHOLD, ICONS, EXAM_QUESTION_COUNT } from '../constants';
import { QuestionRenderer } from '../components/QuestionRenderer';
import { emailService } from '../services/emailService';
import { Button } from '../components/ui/Button';

interface ExamPageProps {
  user: User;
  onFinish: (result: ExamResult) => void;
}

type ExamStatus = 'INTRO' | 'COUNTDOWN' | 'EXAM' | 'FINISHING';

// Algorytm Fisher-Yates do tasowania tablicy
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export const ExamPage: React.FC<ExamPageProps> = ({ user, onFinish }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { value: string; justification?: string }>>({});
  
  // Stan egzaminu
  const [status, setStatus] = useState<ExamStatus>('INTRO');
  const [countdown, setCountdown] = useState(10);
  
  // Timery per pytanie
  const [timers, setTimers] = useState<Record<string, number>>({});
  
  const [statusMessage, setStatusMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  // 1. Inicjalizacja
  useEffect(() => {
    storage.startExamSession(user.email);
    const all = storage.getQuestions();
    
    if (all.length === 0) {
        setQuestions([]);
        return;
    }

    const uniqueAll = Array.from(new Map(all.map(item => [item.id, item])).values());

    if (user.email === 'test@stratton-prime.pl') {
        const randomizedTest = uniqueAll.map(q => {
            if ((q.type === QuestionType.MULTIPLE_CHOICE || q.type === QuestionType.MULTI_SELECT) && q.options) {
                return { ...q, options: shuffleArray(q.options) };
            }
            return q;
        });
        setQuestions(randomizedTest);
        const initialTimers: Record<string, number> = {};
        randomizedTest.forEach(q => { initialTimers[q.id] = TIME_PER_QUESTION; });
        setTimers(initialTimers);
        return;
    }

    const part3 = uniqueAll.filter(q => q.id.startsWith('q3-'));
    const part2 = uniqueAll.filter(q => q.id.startsWith('q-p2-'));
    const part1 = uniqueAll.filter(q => !q.id.startsWith('q3-') && !q.id.startsWith('q-p2-'));

    const selectedP3 = shuffleArray(part3).slice(0, 8);
    const selectedP2 = shuffleArray(part2).slice(0, 8);
    const selectedP1 = shuffleArray(part1).slice(0, 4);

    let pool = [...selectedP3, ...selectedP2, ...selectedP1];

    if (pool.length < EXAM_QUESTION_COUNT) {
        const usedIds = new Set(pool.map(q => q.id));
        const remaining = uniqueAll.filter(q => !usedIds.has(q.id));
        const needed = EXAM_QUESTION_COUNT - pool.length;
        pool = [...pool, ...shuffleArray(remaining).slice(0, needed)];
    }

    pool = shuffleArray(pool);
    
    const randomizedPool = pool.map(q => {
        if ((q.type === QuestionType.MULTIPLE_CHOICE || q.type === QuestionType.MULTI_SELECT) && q.options) {
            return { ...q, options: shuffleArray(q.options) };
        }
        return q;
    });

    setQuestions(randomizedPool);

    const initialTimers: Record<string, number> = {};
    randomizedPool.forEach(q => { initialTimers[q.id] = TIME_PER_QUESTION; });
    setTimers(initialTimers);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "Opuszczenie strony spowoduje natychmiastowe niezaliczenie egzaminu (0%).";
        return "Opuszczenie strony spowoduje natychmiastowe niezaliczenie egzaminu (0%).";
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user.email]);

  // 2. Countdown
  useEffect(() => {
    if (status === 'COUNTDOWN') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setStatus('EXAM');
      }
    }
  }, [status, countdown]);

  const showWarning = useCallback((msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(''), 3000);
  }, []);

  // Finish Exam Logic
  const finishExam = useCallback(async () => {
    const answersLog: AnswerLog[] = [];
    let correctCount = 0;

    questions.forEach(q => {
      const userAnsObj = answers[q.id];
      const userValue = userAnsObj?.value || '';
      let isCorrect = false;

      if (q.type === QuestionType.OPEN) {
        if (q.correctAnswer && q.correctAnswer.trim().length > 0) {
            const normUser = userValue.trim().toLowerCase();
            const normCorrect = q.correctAnswer.trim().toLowerCase();
            isCorrect = normUser === normCorrect;
        } else {
            isCorrect = userValue.length > 5;
        }
      } else if (q.type === QuestionType.MULTI_SELECT) {
        const userSelected = userValue.split('|').filter(x => x).sort().join('|');
        const correctSelected = (q.correctAnswer || '').split('|').filter(x => x).sort().join('|');
        isCorrect = userSelected === correctSelected;
      } else {
        isCorrect = userValue === q.correctAnswer;
      }

      if (isCorrect) correctCount++;

      answersLog.push({
        questionId: q.id,
        questionText: q.text,
        type: q.type,
        userAnswer: userValue.replace(/\|/g, ', ') || '(Brak odpowiedzi)',
        correctAnswer: q.correctAnswer ? q.correctAnswer.replace(/\|/g, ', ') : '(Opisowe)',
        isCorrect: isCorrect
      });
    });

    const scoreValue = Math.round((correctCount / questions.length) * 100);
    const isPassed = scoreValue >= (PASS_THRESHOLD * 100);
    const examDate = new Date().toLocaleDateString('pl-PL') + ' ' + new Date().toLocaleTimeString('pl-PL');
    
    setStatus('FINISHING');
    setStatusMessage(isPassed ? 'Weryfikacja: POZYTYWNA. Finalizacja...' : 'Weryfikacja: NEGATYWNA. Przetwarzanie...');

    const previousFailures = storage.getFailedAttemptsCount(user.email);
    const currentFailCount = isPassed ? previousFailures : previousFailures + 1;

    const result: ExamResult = {
      id: Math.random().toString(36).substr(2, 9),
      userName: `${user.firstName} ${user.lastName}`,
      hierarchicalId: user.hierarchicalId,
      email: user.email,
      managerName: user.managerName,
      managerEmail: user.managerEmail,
      score: scoreValue,
      passed: isPassed,
      date: examDate,
      answersLog: answersLog
    };

    storage.saveResult(result);
    storage.clearExamSession();
    
    await new Promise(r => setTimeout(r, 1500));
    await emailService.sendExamResult(result, undefined, currentFailCount);
    
    onFinish(result);
  }, [questions, answers, user, onFinish]);

  const isQuestionLocked = useCallback((qId: string) => {
    const isAnswered = !!answers[qId]?.value;
    const isTimeout = (timers[qId] !== undefined && timers[qId] <= 0);
    return isAnswered || isTimeout;
  }, [answers, timers]);

  const handleSmartNavigation = useCallback(() => {
    const playableIndices = questions
      .map((q, i) => {
        const isAns = !!answers[q.id]?.value;
        const time = timers[q.id];
        const hasTime = time === undefined || time > 0;
        return (!isAns && hasTime) ? i : -1;
      })
      .filter(i => i !== -1);
    
    if (playableIndices.length === 0) {
      finishExam();
      return;
    }

    // Szukamy następnego pytania "przed siebie"
    const nextAhead = playableIndices.find(i => i > currentIndex);

    if (nextAhead !== undefined) {
      setCurrentIndex(nextAhead);
    } else {
      // Jeśli nie ma dalej, wracamy do początku (First Wave passed -> Second Wave)
      const firstPlayable = playableIndices[0];
      if (firstPlayable !== undefined && firstPlayable !== currentIndex) {
        showWarning(`Przechodzenie do pytań pominiętych (Pytanie nr ${firstPlayable + 1})...`);
        setCurrentIndex(firstPlayable);
      }
    }
  }, [questions, answers, timers, currentIndex, showWarning, finishExam]);

  // Timer Logic
  const currentQuestion = questions[currentIndex];
  
  useEffect(() => {
    if (status === 'EXAM' && currentQuestion) {
      const timeLeft = timers[currentQuestion.id] || 0;
      if (timeLeft <= 0) return;

      const timer = setInterval(() => {
        if (timeLeft <= 1) {
          setTimers(prev => ({ ...prev, [currentQuestion.id]: 0 }));
          
          const anyOtherPlayable = questions.some((q) => {
            if (q.id === currentQuestion.id) return false;
            const isAns = !!answers[q.id]?.value;
            const t = timers[q.id];
            return !isAns && (t === undefined || t > 0);
          });

          if (anyOtherPlayable) {
             showWarning("Czas minął! Następne pytanie...");
          } else {
             setStatusMessage("Koniec czasu sesji...");
          }
          setTimeout(() => handleSmartNavigation(), 100); 
        } else {
          setTimers(prev => ({ ...prev, [currentQuestion.id]: timeLeft - 1 }));
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, currentQuestion, timers, handleSmartNavigation, showWarning]);


  // --- RENDEROWANIE ---

  if (status === 'FINISHING') {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8">
        <div className="mb-8 relative">
           <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#C5A059]"></div>
        </div>
        <h2 className="text-2xl font-black text-[#002147] tracking-tight uppercase mb-4">Analiza Wyników</h2>
        <p className="text-sm text-[#605E5C]">{statusMessage}</p>
      </div>
    );
  }

  if (status === 'INTRO') {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="dynamics-card max-w-5xl w-full p-6 md:p-12 border-t-8 border-[#C5A059] bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#EDEBE9] pb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#002147] uppercase tracking-tight">Procedura Egzaminacyjna</h1>
              <p className="text-[10px] md:text-xs text-[#605E5C] font-bold uppercase tracking-[0.2em] mt-1">Regulamin Certyfikacji Wiedzy - Stratton Prime</p>
            </div>
            <div className="px-3 py-2 md:px-4 md:py-2 bg-[#F3F2F1] rounded border border-[#EDEBE9] flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[#002147] font-bold text-xs md:text-sm">Sesja: {new Date().toLocaleDateString('pl-PL')}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
             
             {/* Sekcja 1: Struktura */}
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#002147] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                    <div>
                        <h3 className="font-black text-[#002147] uppercase text-sm mb-1">Struktura i Bankowanie Czasu</h3>
                        <p className="text-xs text-[#605E5C] leading-relaxed">
                            Egzamin składa się z <strong>{EXAM_QUESTION_COUNT} pytań</strong>. Masz <strong>1 minutę i 10 sekund (70s)</strong> na każde pytanie. 
                            <br/><span className="text-[#002147] font-bold">WAŻNE:</span> Czas jest liczony indywidualnie dla każdego pytania. Jeśli pominiesz pytanie, czas się zatrzymuje. Możesz wrócić do pominiętych pytań.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#002147] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                    <div>
                        <h3 className="font-black text-[#002147] uppercase text-sm mb-1">Strategia Nawigacji</h3>
                        <p className="text-xs text-[#605E5C] leading-relaxed">
                            Przycisk <strong>"ZATWIERDŹ ODPOWIEDŹ"</strong> pojawia się dopiero po zaznaczeniu wariantu. Zatwierdzenie jest ostateczne.
                            <br/>Przycisk <strong>"NASTĘPNE PYTANIE"</strong> (gdy nic nie zaznaczono) oznacza pominięcie. Wykorzystaj to, jeśli nie jesteś pewien.
                        </p>
                    </div>
                </div>
             </div>

             {/* Sekcja 2: Zasady */}
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C5A059] text-[#002147] flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                    <div>
                        <h3 className="font-black text-[#002147] uppercase text-sm mb-1">Próg Zaliczenia: 71%</h3>
                        <p className="text-xs text-[#605E5C] leading-relaxed">
                            Aby uzyskać certyfikat, musisz udzielić poprawnej odpowiedzi na co najmniej 15 z 20 pytań.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#C5A059] text-[#002147] flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                    <div>
                        <h3 className="font-black text-[#002147] uppercase text-sm mb-1">Bezpieczeństwo (Anti-Cheat)</h3>
                        <p className="text-xs text-[#605E5C] leading-relaxed">
                            System monitoruje aktywność okna. Odświeżenie strony lub wyjście z karty skutkuje natychmiastowym niezaliczeniem.
                        </p>
                    </div>
                </div>
             </div>
          </div>

          <div className="bg-[#FAF9F8] border-l-4 border-red-600 p-4 md:p-6 mb-8">
             <h4 className="text-red-700 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <ICONS.Alert /> Ostrzeżenie Systemowe
             </h4>
             <p className="text-xs text-[#323130] leading-relaxed">
                To jest podejście nr {storage.getFailedAttemptsCount(user.email) + 1} z 3 dostępnych.
                Upewnij się, że masz stabilne łącze internetowe i około 20 minut spokoju.
             </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#C5A059] tracking-widest uppercase animate-pulse">POWODZENIA!</h2>
            {questions.length > 0 ? (
                <Button 
                  onClick={() => setStatus('COUNTDOWN')} 
                  size="lg"
                  className="shadow-xl px-12 py-4 text-base"
                  icon={<ICONS.ArrowRight />}
                >
                  ROZPOCZNIJ EGZAMIN
                </Button>
            ) : (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded text-center text-sm font-bold">
                    ⛔ Baza pytań jest pusta. Skontaktuj się z Administratorem.
                </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'COUNTDOWN') {
    return (
      <div className="fixed inset-0 bg-[#002147] z-[100] flex flex-col items-center justify-center text-white">
        <div className="text-[100px] md:text-[150px] font-black leading-none text-[#C5A059] animate-pulse">
          {countdown}
        </div>
        <p className="text-lg font-bold uppercase tracking-[0.5em] mt-8 opacity-60">Przygotuj się</p>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentTimer = timers[currentQuestion.id] || 0;
  const timePercentage = (currentTimer / TIME_PER_QUESTION) * 100;
  const isTimeCritical = currentTimer <= 10;
  const playableQuestionsCount = questions.filter(q => !answers[q.id]?.value && (timers[q.id] === undefined || timers[q.id] > 0)).length;
  
  // LOGIKA PRZYCISKU
  const currentAnswer = answers[currentQuestion.id]?.value;
  const hasAnswer = !!currentAnswer;

  let mainButtonLabel = hasAnswer ? 'ZATWIERDŹ ODPOWIEDŹ' : 'NASTĘPNE PYTANIE';
  
  // Obsługa ostatniego pytania (lub ostatniego dostępnego w cyklu)
  if (playableQuestionsCount <= 1) {
      mainButtonLabel = hasAnswer ? 'ZAKOŃCZ EGZAMIN' : 'POMIŃ I ZAKOŃCZ';
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      
      {/* 1. COMPACT STICKY HEADER (Zen Mode) */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-md z-50 flex items-center justify-between px-3 md:px-8 border-b border-[#EDEBE9]">
         {/* Left: Progress */}
         <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] text-[#A19F9D] font-bold uppercase tracking-widest">Postęp</span>
            <div className="flex items-center gap-1">
                <span className="text-base md:text-lg font-black text-[#002147]">{currentIndex + 1}</span>
                <span className="text-[10px] md:text-xs text-[#605E5C] font-medium">/ {questions.length}</span>
            </div>
         </div>

         {/* Center: Category Badge (Hidden on small mobile) */}
         <div className="hidden sm:block">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                currentQuestion.category === Category.LAW 
                ? 'bg-[#002147] text-white border-[#002147]' 
                : 'bg-[#fff] text-[#002147] border-[#C5A059]'
            }`}>
                {currentQuestion.category}
            </span>
         </div>

         {/* Right: Timer */}
         <div className={`flex items-center gap-2 px-2 py-1 md:px-4 md:py-1.5 rounded-full border transition-all duration-300 ${isTimeCritical ? 'bg-red-50 border-red-500 animate-pulse' : 'bg-white border-[#EDEBE9]'}`}>
            <ICONS.Clock />
            <span className={`text-base md:text-xl font-black tabular-nums ${isTimeCritical ? 'text-red-600' : 'text-[#002147]'}`}>
                {currentTimer}s
            </span>
         </div>
      </header>

      {/* 2. PROGRESS BAR (Top of content) */}
      <div className="fixed top-14 left-0 right-0 h-1 bg-gray-200 z-40">
         <div 
            className={`h-full transition-all duration-1000 ease-linear ${isTimeCritical ? 'bg-red-500' : 'bg-[#C5A059]'}`}
            style={{ width: `${timePercentage}%` }}
         ></div>
      </div>

      {/* 3. MAIN CONTENT (Scrollable, Padding for Header/Footer) */}
      <div className="pt-16 pb-24 md:pb-32 max-w-5xl mx-auto px-3 md:px-6">
        {warningMessage && (
            <div className="mb-4 bg-red-600 text-white px-3 py-2 rounded shadow-lg flex items-center justify-center animate-bounce text-xs font-bold">
                <ICONS.Alert />
                <span className="ml-2 uppercase tracking-wide">{warningMessage}</span>
            </div>
        )}

        <div className={`transition-opacity duration-300 ${currentTimer === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
            <QuestionRenderer 
                key={currentQuestion.id}
                question={currentQuestion} 
                onAnswer={(val, justification) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: { value: val, justification } }))} 
                currentValue={answers[currentQuestion.id]?.value || ''}
                currentJustification={answers[currentQuestion.id]?.justification || ''}
            />
        </div>
      </div>

      {/* 4. STICKY FOOTER (Always visible action) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EDEBE9] p-3 md:p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="hidden md:flex text-[10px] text-[#A19F9D] uppercase tracking-widest items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Sesja Monitorowana
            </div>
            
            <Button 
                onClick={handleSmartNavigation}
                variant={hasAnswer ? 'primary' : 'outline'}
                size="lg"
                className={`w-full md:w-auto px-8 md:px-12 shadow-xl hover:translate-y-[-2px] transition-transform text-xs md:text-sm ${!hasAnswer ? 'text-gray-500 border-gray-300 hover:border-[#002147] hover:text-[#002147]' : ''}`}
                icon={<ICONS.ArrowRight />}
            >
                {mainButtonLabel}
            </Button>
         </div>
      </footer>

    </div>
  );
};
