
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { ExamPage } from './pages/ExamPage';
import { ResultsPage } from './pages/ResultsPage';
import { AdminPage } from './pages/AdminPage';
import { storage } from './services/storage';
import { User, ExamSession, ExamResult } from './types';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'LOGIN' | 'EXAM' | 'RESULTS' | 'ADMIN'>('LOGIN');
  const [lastResult, setLastResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    storage.init();
    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      if (savedUser.role === 'ADMIN') {
        setCurrentPage('ADMIN');
      }
    }
  }, []);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    storage.setCurrentUser(loggedUser);
    if (loggedUser.role === 'ADMIN') {
      setCurrentPage('ADMIN');
    } else {
      // Dla użytkownika, który nie jest adminem, ale się zalogował (np. odświeżył stronę)
      setCurrentPage('LOGIN'); 
    }
  };

  const handleStartExam = (updatedUser: User) => {
    setUser(updatedUser);
    storage.setCurrentUser(updatedUser);
    setCurrentPage('EXAM');
  };

  const handleExamFinish = (result: ExamResult) => {
    setLastResult(result);
    setCurrentPage('RESULTS');
  };

  const handleRetry = () => {
    setCurrentPage('EXAM');
  };

  const handleSimulateSuccess = (result: ExamResult) => {
    const demoUser = storage.getCurrentUser();
    setUser(demoUser);
    setLastResult(result);
    setCurrentPage('RESULTS');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('LOGIN');
    storage.setCurrentUser(null);
  };

  // Logika wyboru wariantu Layoutu
  let layoutVariant: 'default' | 'admin' | 'exam' = 'default';
  if (currentPage === 'ADMIN') layoutVariant = 'admin';
  if (currentPage === 'EXAM') layoutVariant = 'exam';

  return (
    <Layout 
        user={user} 
        onLogout={handleLogout} 
        variant={layoutVariant}
    >
      {currentPage === 'LOGIN' && (
        <LoginPage 
          onLogin={handleLogin} 
          onStartExam={handleStartExam} 
          onSimulateSuccess={handleSimulateSuccess}
        />
      )}
      {currentPage === 'EXAM' && user && (
        <ExamPage user={user} onFinish={handleExamFinish} />
      )}
      {currentPage === 'RESULTS' && lastResult && (
        <ResultsPage 
          result={lastResult} 
          onBack={handleLogout} 
          onRetry={handleRetry} 
        />
      )}
      {currentPage === 'ADMIN' && <AdminPage onLogout={handleLogout} />}
    </Layout>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
