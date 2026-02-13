
import React, { useState, useEffect } from 'react';
import { QuestionsTab } from '../components/admin/questions/QuestionsTab';
import { UsersTab } from '../components/admin/users/UsersTab';
import { DashboardTab } from '../components/admin/dashboard/DashboardTab';
import { SettingsTab } from '../components/admin/settings/SettingsTab';
import { ResultsTab } from '../components/admin/results/ResultsTab';
import { StructureTab } from '../components/admin/structure/StructureTab';
import { ICONS } from '../constants';

type AdminModule = 'DASHBOARD' | 'QUESTIONS' | 'USERS' | 'STRUCTURE' | 'RESULTS' | 'SETTINGS';

interface AdminPageProps {
    onLogout?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const [activeModule, setActiveModule] = useState<AdminModule>('DASHBOARD');
  // Na mobile domyślnie zamknięty (false), na desktopie otwarty (true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        if (!mobile && !isSidebarOpen) {
            // Przy powrocie na desktop, jeśli był zamknięty, to można go otworzyć lub zostawić zwinięty (wariant w-20)
            // Tutaj zostawiamy logikę użytkownika, ale upewniamy się, że układ się nie psuje
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  // Konfiguracja Menu
  const menuItems = [
    { id: 'DASHBOARD', label: 'Pulpit Zarządczy', icon: <ICONS.Dashboard /> },
    { id: 'RESULTS', label: 'Rejestr Egzaminów', icon: <ICONS.Check /> },
    { id: 'QUESTIONS', label: 'Baza Wiedzy', icon: <ICONS.Questions /> },
    { id: 'USERS', label: 'Kadry i Dostępy', icon: <ICONS.User /> },
    { id: 'STRUCTURE', label: 'Struktura Firmy', icon: <ICONS.Structure /> },
    { id: 'SETTINGS', label: 'Konfiguracja', icon: <ICONS.Settings /> },
  ];

  // Mapowanie tytułów dla Breadcrumbs
  const getModuleTitle = (mod: AdminModule) => {
      const item = menuItems.find(i => i.id === mod);
      return item ? item.label : 'Panel';
  };

  const handleModuleSelect = (id: AdminModule) => {
      setActiveModule(id);
      if (isMobile) setIsSidebarOpen(false); // Zamknij menu po wyborze na mobile
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col md:flex-row">
      
      {/* MOBILE OVERLAY (Tło przyciemniające) */}
      {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[55] backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
      )}

      {/* 1. SIDEBAR */}
      <aside 
        className={`
            fixed top-0 left-0 h-screen bg-[#002147] text-white flex flex-col shadow-2xl z-[60] 
            transition-transform duration-300 ease-in-out border-r border-[#C5A059]/20
            ${isMobile 
                ? (isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72') 
                : (isSidebarOpen ? 'w-72 translate-x-0' : 'w-20 translate-x-0')
            }
        `}
      >
        {/* Logo Area */}
        <div className={`h-20 md:h-24 flex-shrink-0 flex items-center ${isSidebarOpen ? 'justify-start px-6' : 'justify-center'} border-b border-white/10 bg-[#001835] relative overflow-hidden group`}>
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#C5A059]/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10 pointer-events-none"></div>

            {isSidebarOpen ? (
                <div className="flex flex-col leading-tight animate-in fade-in duration-300 delay-75">
                    <span className="font-extrabold text-lg tracking-tighter text-[#C5A059] whitespace-nowrap">STRATTON PRIME</span>
                    <span className="text-[8px] uppercase tracking-[0.3em] font-light text-white/60 whitespace-nowrap">Admin Console</span>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center leading-none gap-0.5 animate-in fade-in duration-300">
                    <span className="font-black text-xl text-[#C5A059]">S</span>
                    <span className="font-black text-xl text-white">P</span>
                </div>
            )}
            
            {/* Mobile Close Button */}
            {isMobile && isSidebarOpen && (
                <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                    <ICONS.Close />
                </button>
            )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto hide-scrollbar">
            {menuItems.map(item => {
                const isActive = activeModule === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => handleModuleSelect(item.id as AdminModule)}
                        className={`w-full flex items-center ${isSidebarOpen ? 'justify-start space-x-4 px-4' : 'justify-center px-0'} py-4 rounded transition-all duration-200 group relative
                            ${isActive 
                                ? 'bg-[#C5A059] text-[#002147] font-bold shadow-lg transform scale-[1.02]' 
                                : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                        title={!isSidebarOpen ? item.label : ''}
                    >
                        <div className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-[#002147]' : 'text-[#C5A059] group-hover:text-white transition-colors'}`}>
                            {item.icon}
                        </div>
                        
                        {isSidebarOpen && (
                            <span className={`text-xs uppercase tracking-widest whitespace-nowrap overflow-hidden ${isActive ? 'font-black' : 'font-medium'}`}>
                                {item.label}
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-white/10 flex-shrink-0 bg-[#001835]">
            {onLogout && (
                <button 
                    onClick={onLogout}
                    className={`w-full flex items-center ${isSidebarOpen ? 'justify-start space-x-4 px-4' : 'justify-center'} py-3 rounded text-red-300 hover:bg-red-900/30 hover:text-red-100 transition-colors group relative`}
                    title="Wyloguj z systemu"
                >
                    <div className="w-6 h-6 flex-shrink-0"><ICONS.Logout /></div>
                    {isSidebarOpen && (
                        <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">Wyloguj</span>
                    )}
                </button>
            )}
            
            {isSidebarOpen && (
                <div className="mt-4 text-center">
                    <p className="text-[9px] text-white/30 uppercase tracking-widest">System ver 4.2.1</p>
                </div>
            )}
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main 
        className={`
            flex-1 flex flex-col min-h-screen transition-all duration-300 
            ${isMobile ? 'ml-0 w-full' : (isSidebarOpen ? 'ml-72' : 'ml-20')}
        `}
      >
        
        {/* Top Header / Breadcrumbs */}
        <header className="bg-white h-16 md:h-20 border-b border-[#EDEBE9] flex items-center justify-between px-4 md:px-10 shadow-sm sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 -ml-2 text-[#002147] hover:bg-[#F3F2F1] rounded transition-colors"
                    title={isSidebarOpen ? "Zwiń menu" : "Rozwiń menu"}
                >
                    <ICONS.Menu />
                </button>

                <div className="flex flex-col">
                    <div className="flex items-center space-x-2 text-[8px] md:text-[10px] uppercase font-bold tracking-widest text-[#A19F9D]">
                        <span className="hidden sm:inline">Stratton Prime</span>
                        <span className="hidden sm:inline text-[#C5A059]">/</span>
                        <span>Admin</span>
                        <span className="text-[#C5A059]">/</span>
                        <span className="text-[#002147]">{getModuleTitle(activeModule)}</span>
                    </div>
                    <h1 className="text-lg md:text-xl font-black text-[#002147] tracking-tight uppercase mt-0.5">
                        {getModuleTitle(activeModule)}
                    </h1>
                </div>
            </div>
            
            <div className="flex items-center space-x-4">
                <div className="px-3 py-1 bg-[#F3F2F1] rounded border border-[#EDEBE9] text-[9px] md:text-[10px] font-bold text-[#605E5C] uppercase tracking-wider hidden sm:block">
                    {new Date().toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="p-4 md:p-10 w-full max-w-[1920px] mx-auto overflow-x-hidden">
            {activeModule === 'DASHBOARD' && (
                <DashboardTab key="dashboard" onNavigateToResults={() => setActiveModule('RESULTS')} />
            )}

            {activeModule === 'QUESTIONS' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <QuestionsTab key="questions" />
                </div>
            )}

            {activeModule === 'USERS' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <UsersTab key="users" />
                </div>
            )}
            
            {activeModule === 'STRUCTURE' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <StructureTab key="structure" />
                </div>
            )}

            {activeModule === 'SETTINGS' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <SettingsTab key="settings" />
                </div>
            )}

            {activeModule === 'RESULTS' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <ResultsTab key="results" />
                </div>
            )}
            
            <div className="h-20"></div> {/* Spacer bottom for mobile */}
        </div>
      </main>

    </div>
  );
};
