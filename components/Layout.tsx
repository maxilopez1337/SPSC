
import React from 'react';
import { ICONS } from '../constants.tsx';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  variant?: 'default' | 'admin' | 'exam';
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, variant = 'default' }) => {
  
  // Wariant ADMIN: Czysty kontener, AdminPage zarządza własnym Sidebarem i Nagłówkiem
  if (variant === 'admin') {
      return (
          <div className="min-h-screen bg-[#F4F4F4]">
              {children}
          </div>
      );
  }

  // Wariant EXAM: Tryb skupienia (bez nagłówka i stopki)
  if (variant === 'exam') {
    return (
        <div className="min-h-screen bg-[#F4F4F4] flex flex-col justify-center">
            <main className="flex-1 w-full flex flex-col container mx-auto p-4 md:p-8">
                {children}
            </main>
        </div>
    );
  }

  // Wariant DEFAULT: Standardowy układ dla Logowania i Wyników
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#002147] text-white h-16 flex items-center justify-between px-4 md:px-6 shadow-xl sticky top-0 z-50 border-b border-[#C5A059]/30">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-lg md:text-xl tracking-tighter text-[#C5A059]">STRATTON PRIME</span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-light opacity-80 hidden sm:inline">Certification System</span>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="font-bold text-sm tracking-wide">{user.firstName} {user.lastName}</span>
                <span className="text-[#C5A059] text-[9px] font-bold uppercase tracking-wider">
                  {user.role === 'ADMIN' ? 'System Administrator' : user.hierarchicalId}
                </span>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#C5A059] flex items-center justify-center shadow-lg border-2 border-white/10">
                <div className="text-[#002147]">
                  {user.role === 'ADMIN' ? <ICONS.Admin /> : <ICONS.User />}
                </div>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 mx-1 hidden md:block"></div>
            <button 
              onClick={onLogout}
              className="hover:text-[#C5A059] transition-colors p-2 flex items-center space-x-2 group"
              title="Wyloguj"
            >
              <ICONS.Logout />
              <span className="hidden md:inline text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Wyloguj</span>
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col container mx-auto p-4 md:p-8">
        {children}
      </main>

      <footer className="bg-[#002147] text-white/70 py-6 px-6 text-[10px] md:text-[11px] border-t border-[#C5A059]/20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="font-bold text-[#C5A059] tracking-widest">STRATTON PRIME</div>
            <p className="text-center md:text-left">© {new Date().getFullYear()} Stratton Prime Cloud. Wszelkie prawa zastrzeżone.</p>
          </div>
          
          <div className="hidden lg:block text-center opacity-60">
            <p className="font-bold uppercase tracking-[0.5em] text-[#C5A059]/50">Wealth & Security</p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span className="font-bold text-white/90 uppercase tracking-tighter">System Online</span>
            </div>
            <div className="text-white/40">v4.2.1-PRO</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
