
import React, { useState } from 'react';
import { User, ExamResult } from '../types';
import { ICONS } from '../constants';
import { storage } from '../services/storage';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onStartExam: (user: User) => void;
  onSimulateSuccess?: (result: ExamResult) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onStartExam }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'LOGIN' | 'CONFIRM'>('LOGIN');
  const [tempUser, setTempUser] = useState<User | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    const registeredUser = storage.getUserByEmail(cleanEmail);

    if (!registeredUser) {
      setError('Nie znaleziono doradcy o podanym adresie e-mail w bazie Stratton Prime.');
      return;
    }

    if (registeredUser.password !== cleanPass) {
      setError('Nieprawidłowe hasło dostępowe. Sprawdź wiadomość od przełożonego.');
      return;
    }

    if (registeredUser.role === 'ADMIN') {
      onLogin(registeredUser);
      return;
    }

    // --- ZABEZPIECZENIE ANTI-CHEAT (PORZUCENIE SESJI) ---
    // Jeśli użytkownik ma "wiszącą" sesję (zamknął okno w trakcie egzaminu), to tutaj zostanie ukarany.
    if (storage.checkActiveSession(registeredUser.email)) {
        
        // 1. Generujemy karny wynik
        const failResult: ExamResult = {
            id: Math.random().toString(36).substr(2, 9),
            userName: `${registeredUser.firstName} ${registeredUser.lastName}`,
            hierarchicalId: registeredUser.hierarchicalId,
            email: registeredUser.email,
            managerName: registeredUser.managerName,
            managerEmail: registeredUser.managerEmail,
            score: 0,
            passed: false,
            date: new Date().toLocaleDateString('pl-PL') + ' ' + new Date().toLocaleTimeString('pl-PL'),
            answersLog: [{
                questionId: 'SECURITY_BREACH',
                questionText: 'NARUSZENIE INTEGRALNOŚCI / PORZUCENIE SESJI',
                type: 'OPEN' as any,
                userAnswer: 'Użytkownik zamknął przeglądarkę lub odświeżył stronę w trakcie egzaminu.',
                correctAnswer: 'Procedura ukończona prawidłowo',
                isCorrect: false
            }]
        };

        // 2. Zapisujemy wynik (traci życie)
        storage.saveResult(failResult);

        // 3. Czyścimy flagę sesji (kara wymierzona, może spróbować ponownie, o ile ma życia)
        storage.clearExamSession();

        // 4. Blokujemy logowanie komunikatem błędu
        setError("WYKRYTO NARUSZENIE ZASAD BEZPIECZEŃSTWA! Poprzednia sesja egzaminacyjna została przerwana w niedozwolony sposób (odświeżenie/zamknięcie). Próba została zaliczona jako NEGATYWNA (0%). Zaloguj się ponownie, aby kontynuować.");
        return;
    }

    const failedCount = storage.getFailedAttemptsCount(cleanEmail);
    const isPassed = storage.hasPassed(cleanEmail);

    if (isPassed) {
      setError('Ten doradca posiada już aktywny certyfikat pozytywny.');
      return;
    }

    if (failedCount >= 3) {
      setError('Przekroczono limit 3 prób. Dalszy dostęp wymaga zgody Działu Kadr.');
      return;
    }

    setTempUser(registeredUser);
    setStep('CONFIRM');
    setError('');
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartExam(tempUser!);
  };

  if (step === 'CONFIRM' && tempUser) {
    const attemptNumber = storage.getFailedAttemptsCount(tempUser.email) + 1;
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="dynamics-card w-full max-w-xl p-6 md:p-12 border-t-[12px] border-[#C5A059] bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-start mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#002147] tracking-tight uppercase">Karta Weryfikacyjna</h2>
              <p className="text-[9px] md:text-[11px] font-black text-[#C5A059] uppercase tracking-[0.4em] mt-3 bg-[#002147] px-3 py-1 w-fit">Dostęp personalny | Próba {attemptNumber}</p>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#002147] rounded flex items-center justify-center text-[#C5A059] shadow-2xl border-2 border-[#C5A059]/20">
              <ICONS.User />
            </div>
          </div>
          
          <div className="bg-[#FAF9F8] p-6 md:p-8 border-l-8 border-[#002147] mb-8 md:mb-12 shadow-sm">
             <p className="text-[10px] font-black uppercase text-[#605E5C] mb-2 tracking-widest">Przełożony zatwierdzający</p>
             <p className="text-base md:text-lg font-bold text-[#002147]">{tempUser.managerName || 'Biuro Operacyjne Stratton'}</p>
             <p className="text-xs text-[#C5A059] font-semibold mt-1">{tempUser.managerEmail || 'biuro@stratton-prime.pl'}</p>
          </div>

          <form onSubmit={handleConfirmSubmit} className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              <Input label="Imię" value={tempUser.firstName} readOnly disabled />
              <Input label="Nazwisko" value={tempUser.lastName} readOnly disabled />
            </div>
            <Input label="ID Hierarchiczne Systemu" value={tempUser.hierarchicalId} readOnly disabled className="font-mono tracking-widest font-black" />
            
            <div className="bg-blue-50 p-4 border-l-4 border-[#002147] text-[10px] text-[#002147] font-bold leading-relaxed">
                UWAGA: Powyższe dane zostały pobrane bezpośrednio z bazy kadr. Jeśli dane są nieprawidłowe, przerwij proces i skontaktuj się z przełożonym.
            </div>

            <div className="pt-6 space-y-4">
              <Button type="submit" variant="primary" size="lg" fullWidth icon={<ICONS.ArrowRight />}>
                POTWIERDZAM I ROZPOCZYNAM
              </Button>
              
              <Button type="button" variant="ghost" fullWidth onClick={() => setStep('LOGIN')}>
                WYLOGUJ / ANULUJ SESJĘ
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="dynamics-card w-full max-w-md p-6 md:p-12 border-b-8 border-[#C5A059] bg-white shadow-2xl animate-in fade-in duration-500">
        <div className="flex flex-col items-center mb-8 md:mb-10">
           <div className="text-3xl md:text-4xl font-black text-[#002147] tracking-tighter mb-2">STRATTON <span className="text-[#C5A059]">PRIME</span></div>
           <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black mt-4 text-[#605E5C] border-y border-[#EDEBE9] py-2 w-full text-center">Certification Portal</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <Input 
            label="Login (Służbowy E-mail)"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="doradca@stratton-prime.pl"
            autoFocus
          />
          <Input 
            label="Hasło Dostępu"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-2 animate-pulse shadow-md">
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-xl">⛔</span>
                 <span className="text-red-800 font-black uppercase text-[10px] tracking-widest">Błąd Autoryzacji / Bezpieczeństwa</span>
              </div>
              <p className="text-red-700 text-[10px] font-bold leading-tight uppercase tracking-wide">{error}</p>
            </div>
          )}

          <div className="pt-6">
            <Button type="submit" variant="primary" size="lg" fullWidth>
                AUTORYZUJ DOSTĘP
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#EDEBE9] text-center">
            <p className="text-[9px] text-[#A19F9D]">
                System chroniony protokołem szyfrowania SSL.<br/>
                Nieudane próby logowania są rejestrowane.
            </p>
        </div>
      </div>
    </div>
  );
};
