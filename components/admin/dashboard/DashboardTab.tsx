import React from 'react';
import { useResults } from '../../../hooks/useResults';
import { StatsCard } from './StatsCard';
import { RecentActivityTable } from './RecentActivityTable';
import { ICONS } from '../../../constants';

interface DashboardTabProps {
    onNavigateToResults: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ onNavigateToResults }) => {
  const { results, getStats } = useResults();
  const stats = getStats();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard label="Liczba Egzaminów" value={stats.totalExams} description="Łącznie przeprowadzonych" icon={<ICONS.Clock />} />
        <StatsCard 
          label="Zdanych" 
          value={stats.passed} 
          description="Wynik pozytywny" 
          icon={<ICONS.Check />} 
          variant="success"
        />
        <StatsCard 
          label="Niezdanych" 
          value={stats.failed} 
          description="Wynik negatywny" 
          icon={<ICONS.Alert />} 
          variant="danger"
        />
        <StatsCard label="Zdawalność" value={`${stats.passRate}%`} description="Skuteczność szkoleń" variant="highlight" />
        <StatsCard label="Baza Kadrowa" value={stats.userCount} description="Zarejestrowani użytkownicy" icon={<ICONS.User />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* 2. Visual Breakdown Chart */}
         <div className="col-span-1 dynamics-card p-6 border-t-4 border-[#002147] flex flex-col justify-center bg-white">
            <h3 className="text-sm font-bold uppercase text-[#002147] mb-6">Efektywność Certyfikacji</h3>
            
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#002147]">ZALICZONE</span>
                        <span className="text-[#002147]">{stats.passed}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#002147] h-full" style={{width: `${stats.passRate}%`}}></div>
                    </div>
                </div>
                
                <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#605E5C]">NIEZALICZONE</span>
                        <span className="text-[#605E5C]">{stats.failed}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#605E5C] h-full" style={{width: `${100 - stats.passRate}%`}}></div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">Dane aktualizowane w czasie rzeczywistym</p>
            </div>
         </div>

         {/* 3. Recent Activity */}
         <RecentActivityTable results={results} onViewAll={onNavigateToResults} />
      </div>
    </div>
  );
};