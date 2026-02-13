
import React, { useState } from 'react';
import { User } from '../../../types';
import { Modal } from '../../Modal';
import { Button } from '../../ui/Button';

interface ImportPreviewModalProps {
  users: User[];
  onConfirm: (users: User[]) => void;
  onCancel: () => void;
}

export const ImportPreviewModal: React.FC<ImportPreviewModalProps> = ({ users, onConfirm, onCancel }) => {
  const [data, setData] = useState<User[]>(users);

  const handleUpdateUser = (id: string, field: keyof User, value: string) => {
    setData(prev => prev.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const handleRemoveUser = (id: string) => {
    setData(prev => prev.filter(u => u.id !== id));
  };

  return (
    <Modal
        title="Weryfikacja Importu Danych"
        onClose={onCancel}
        maxWidth="max-w-6xl"
        borderColor="gold"
    >
        <p className="text-xs text-[#605E5C] mb-4 -mt-4">
            Znaleziono {data.length} rekordów. Sprawdź poprawność danych przed dodaniem do bazy.
        </p>

        {/* Content Table */}
        <div className="overflow-auto bg-white border border-[#EDEBE9] rounded h-[500px]">
            <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="bg-[#002147] text-[10px] font-bold uppercase text-white sticky top-0 z-10">
                    <tr>
                        <th className="p-3 w-10">#</th>
                        <th className="p-3">Imię</th>
                        <th className="p-3">Nazwisko</th>
                        <th className="p-3">Email (Login)</th>
                        <th className="p-3">ID Hierarchiczne</th>
                        <th className="p-3">Rola</th>
                        <th className="p-3">Przełożony (Email)</th>
                        <th className="p-3 text-center">Akcja</th>
                    </tr>
                </thead>
                <tbody className="text-xs divide-y divide-gray-200">
                    {data.map((u, idx) => (
                        <tr key={u.id} className="hover:bg-gray-50 group">
                            <td className="p-2 text-center text-gray-400 font-mono">{idx + 1}</td>
                            <td className="p-2">
                                <input 
                                    className="w-full bg-transparent border-b border-transparent focus:border-[#C5A059] focus:outline-none"
                                    value={u.firstName}
                                    onChange={e => handleUpdateUser(u.id, 'firstName', e.target.value)}
                                />
                            </td>
                            <td className="p-2">
                                <input 
                                    className="w-full bg-transparent border-b border-transparent focus:border-[#C5A059] focus:outline-none"
                                    value={u.lastName}
                                    onChange={e => handleUpdateUser(u.id, 'lastName', e.target.value)}
                                />
                            </td>
                            <td className="p-2">
                                <input 
                                    className={`w-full bg-transparent border-b focus:outline-none ${!u.email.includes('@') ? 'border-red-300 bg-red-50 text-red-700' : 'border-transparent focus:border-[#C5A059]'}`}
                                    value={u.email}
                                    onChange={e => handleUpdateUser(u.id, 'email', e.target.value)}
                                />
                            </td>
                            <td className="p-2">
                                <input 
                                    className="w-full bg-transparent border-b border-transparent focus:border-[#C5A059] focus:outline-none font-mono"
                                    value={u.hierarchicalId}
                                    onChange={e => handleUpdateUser(u.id, 'hierarchicalId', e.target.value)}
                                />
                            </td>
                            <td className="p-2">
                                <select 
                                    className="bg-transparent focus:outline-none cursor-pointer"
                                    value={u.role}
                                    onChange={e => handleUpdateUser(u.id, 'role', e.target.value)}
                                >
                                    <option value="USER">USER</option>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </td>
                            <td className="p-2">
                                <input 
                                    className="w-full bg-transparent border-b border-transparent focus:border-[#C5A059] focus:outline-none text-[10px]"
                                    value={u.managerEmail || ''}
                                    onChange={e => handleUpdateUser(u.id, 'managerEmail', e.target.value)}
                                    placeholder="Brak"
                                />
                            </td>
                            <td className="p-2 text-center">
                                <button 
                                    onClick={() => handleRemoveUser(u.id)}
                                    className="text-red-400 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Usuń wiersz"
                                >
                                    ✕
                                </button>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr><td colSpan={8} className="p-8 text-center text-gray-400">Brak danych do importu.</td></tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Footer */}
        <div className="pt-6 mt-6 border-t border-[#EDEBE9] flex justify-between items-center">
             <div className="text-xs text-[#605E5C]">
                <strong>Wskazówka:</strong> Kliknij w dowolne pole w tabeli, aby edytować dane przed importem.
             </div>
             <div className="flex gap-3">
                <Button onClick={onCancel} variant="outline">
                    Anuluj
                </Button>
                <Button 
                    onClick={() => onConfirm(data)} 
                    disabled={data.length === 0}
                    variant="primary"
                >
                    Zatwierdź i Dodaj ({data.length})
                </Button>
             </div>
        </div>
    </Modal>
  );
};
