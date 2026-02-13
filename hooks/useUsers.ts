
import { useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../services/storage';
import * as XLSX from 'xlsx';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(storage.getUsers());
  }, []);

  const refreshUsers = () => {
    setUsers(storage.getUsers());
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let pass = "";
    for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
    return pass;
  };

  // --- CRUD ACTIONS ---

  const addUser = (newUser: Partial<User>) => {
    const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: newUser.email || '',
        password: newUser.password || generatePassword(),
        firstName: newUser.firstName || '',
        lastName: newUser.lastName || '',
        hierarchicalId: newUser.hierarchicalId || 'SP-TEMP',
        role: newUser.role || 'USER',
        managerName: newUser.managerName,
        managerEmail: newUser.managerEmail
    };

    const updated = [...users, user];
    setUsers(updated);
    storage.saveUsers(updated);
  };

  const addManyUsers = (newUsersList: User[]) => {
    // Łączymy obecnych użytkowników z nowymi
    const updated = [...users, ...newUsersList];
    setUsers(updated);
    storage.saveUsers(updated);
  };

  const updateUser = (updatedUser: User) => {
    const newUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    setUsers(newUsers);
    storage.saveUsers(newUsers);
  };

  const resetUserPassword = (id: string) => {
    const newPass = generatePassword();
    const updated = users.map(u => {
        if (u.id === id) {
            return { ...u, password: newPass };
        }
        return u;
    });
    setUsers(updated);
    storage.saveUsers(updated);
    return newPass;
  };

  const deleteUser = (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć tego użytkownika? Ta operacja jest nieodwracalna.')) {
        const updated = users.filter(u => u.id !== id);
        setUsers(updated);
        storage.saveUsers(updated);
    }
  };

  const deleteSelectedUsers = (ids: Set<string>) => {
    if (ids.size === 0) return;
    if (confirm(`Czy na pewno chcesz usunąć ${ids.size} zaznaczonych użytkowników?`)) {
        const updated = users.filter(u => !ids.has(u.id));
        setUsers(updated);
        storage.saveUsers(updated);
    }
  };

  // --- IMPORT / EXPORT ---

  // Funkcja parsująca plik Excel i zwracająca dane (BEZ zapisu do bazy)
  const parseExcelFile = async (file: File): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
                
                const parsedUsers: User[] = [];
                jsonData.forEach((row: any) => {
                    const email = row['Adres E-mail'] || row.email;
                    const firstName = row['Imię'] || row.firstName;
                    const lastName = row['Nazwisko'] || row.lastName;
                    
                    if (email && firstName && lastName) {
                        const password = row['Hasło'] || row.password;
                        const hierarchicalId = row['ID Hierarchiczne'] || row.hierarchicalId;
                        const role = row['Rola'] || row.role;
                        const managerName = row['Imię i Nazwisko Przełożonego'] || row.managerName;
                        const managerEmail = row['Email Przełożonego'] || row.managerEmail;

                        parsedUsers.push({
                            id: Math.random().toString(36).substr(2, 9),
                            email: String(email).trim(),
                            password: password ? String(password).trim() : generatePassword(),
                            firstName: String(firstName).trim(),
                            lastName: String(lastName).trim(),
                            hierarchicalId: hierarchicalId ? String(hierarchicalId).trim() : 'SP-TEMP',
                            role: (role?.trim() as any) || 'USER',
                            managerName: managerName ? String(managerName).trim() : undefined,
                            managerEmail: managerEmail ? String(managerEmail).trim() : undefined
                        });
                    }
                });
                resolve(parsedUsers);
            } catch (e) {
                reject(e);
            }
        };
        reader.readAsBinaryString(file);
    });
  };

  // Stara funkcja importu (dla kompatybilności, jeśli gdzieś używana bezpośrednio, ale teraz UI używa parse + addMany)
  const importFromExcel = async (file: File): Promise<number> => {
    const newUsers = await parseExcelFile(file);
    addManyUsers(newUsers);
    return newUsers.length;
  };

  const exportUsersToExcel = () => {
    const currentUsers = storage.getUsers();
    
    // Mapowanie danych na polskie nagłówki
    const data = currentUsers.map(u => ({
        'Adres E-mail': u.email,
        'Imię': u.firstName,
        'Nazwisko': u.lastName,
        'Hasło': u.password,
        'ID Hierarchiczne': u.hierarchicalId,
        'Rola': u.role,
        'Imię i Nazwisko Przełożonego': u.managerName || '',
        'Email Przełożonego': u.managerEmail || ''
    }));

    if (data.length === 0) {
        data.push({ 
            'Adres E-mail': 'doradca@stratton.pl', 
            'Imię': 'Jan', 
            'Nazwisko': 'Kowalski', 
            'Hasło': 'PRZYKLAD_HASLA',
            'ID Hierarchiczne': 'SP-WAW-001', 
            'Rola': 'USER', 
            'Imię i Nazwisko Przełożonego': 'Marek Menedżer', 
            'Email Przełożonego': 'marek@stratton.pl' 
        });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Baza Kadrowa");
    XLSX.writeFile(workbook, `stratton_kadry_eksport_${new Date().toLocaleDateString('pl-PL').replace(/\./g, '-')}.xlsx`);
  };

  const downloadImportTemplate = () => {
    const data = [
      {
        'Adres E-mail': 'nowy.doradca@stratton-prime.pl',
        'Imię': 'Jan',
        'Nazwisko': 'Nowak',
        'Hasło': 'Start2024!',
        'ID Hierarchiczne': 'SP-WAW-NEW-01',
        'Rola': 'USER',
        'Imię i Nazwisko Przełożonego': 'Anna Manager',
        'Email Przełożonego': 'manager@stratton-prime.pl'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Szablon Importu");
    XLSX.writeFile(workbook, "szablon_importu_kadry.xlsx");
  };

  const exportPasswords = () => {
    let csv = 'Email;Imie;Nazwisko;Haslo;Przelozony\n';
    users.filter(u => u.role !== 'ADMIN').forEach(u => {
      csv += `${u.email};${u.firstName};${u.lastName};${u.password};${u.managerName || ''}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'stratton_baza_hasel.csv');
    link.click();
  };

  return {
    users,
    addUser,
    addManyUsers,
    updateUser,
    deleteUser,
    deleteSelectedUsers,
    parseExcelFile,
    importFromExcel,
    exportUsersToExcel,
    downloadImportTemplate,
    exportPasswords,
    refreshUsers,
    resetUserPassword
  };
};
