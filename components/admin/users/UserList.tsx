
import React from 'react';
import { User } from '../../../types';
import { ICONS } from '../../../constants';

interface UserListProps {
  users: User[];
  selectedIds: Set<string>;
  startIndex: number;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onResetPassword: (id: string, email: string) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onToggleSelectOne: (id: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ 
  users, 
  selectedIds, 
  startIndex,
  onEdit, 
  onDelete,
  onResetPassword,
  onToggleSelectAll, 
  onToggleSelectOne 
}) => {
  
  const allSelected = users.length > 0 && users.every(u => selectedIds.has(u.id));

  return (
    <div className="dynamics-card overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
            <thead className="bg-[#002147] text-[10px] font-bold uppercase text-[#C5A059]">
            <tr>
                <th className="p-4 w-10 text-center">
                    <input 
                        type="checkbox"
                        checked={allSelected}
                        onChange={e => onToggleSelectAll(e.target.checked)}
                        className="cursor-pointer"
                    />
                </th>
                <th className="p-4 w-16">Lp.</th>
                <th className="p-4">Imię i Nazwisko</th>
                <th className="p-4">Email / ID</th>
                <th className="p-4">Hasło</th>
                <th className="p-4">Przełożony (Email)</th>
                <th className="p-4 w-32 text-center">Akcje</th>
            </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#EDEBE9]">
            {users.length === 0 && (
                <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400 italic">Brak wyników wyszukiwania.</td>
                </tr>
            )}
            {users.map((u, index) => {
                const isSelected = selectedIds.has(u.id);
                return (
                    <tr key={u.id} className={`transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-[#FAF9F8]'}`}>
                    <td className="p-4 text-center">
                        <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onToggleSelectOne(u.id)}
                            className="cursor-pointer"
                        />
                    </td>
                    <td className="p-4 text-[#A19F9D] font-mono">{startIndex + index + 1}</td>
                    <td className="p-4 font-bold text-[#002147]">{u.firstName} {u.lastName}</td>
                    <td className="p-4 text-[#323130]">{u.email}<br/><span className="text-[10px] opacity-60">{u.hierarchicalId}</span></td>
                    <td className="p-4"><span className="font-mono bg-gray-100 px-2 py-1 border text-[#323130]">{u.password}</span></td>
                    <td className="p-4">
                        <div className="font-bold text-[#605E5C]">{u.managerName || 'BRAK'}</div>
                        <div className="text-[10px] text-[#002147] font-medium">{u.managerEmail || '-'}</div>
                    </td>
                    <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                            <button 
                                onClick={() => onResetPassword(u.id, u.email)}
                                className="text-[#C5A059] hover:bg-yellow-50 rounded p-1.5 transition-colors border border-transparent hover:border-[#C5A059]/30"
                                title="Resetuj hasło"
                            >
                                <ICONS.Refresh />
                            </button>
                            <button 
                                onClick={() => onEdit(u)} 
                                className="text-[#002147] hover:bg-gray-200 rounded p-1.5 transition-colors border border-transparent hover:border-gray-300"
                                title="Edytuj dane"
                            >
                                <ICONS.Edit />
                            </button>
                            <button 
                                onClick={() => onDelete(u.id)} 
                                className="text-red-600 hover:bg-red-50 rounded p-1.5 transition-colors border border-transparent hover:border-red-200"
                                title="Usuń użytkownika"
                            >
                                <ICONS.Trash />
                            </button>
                        </div>
                    </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
      </div>
    </div>
  );
};
