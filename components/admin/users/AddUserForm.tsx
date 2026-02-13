
import React, { useState } from 'react';
import { User } from '../../../types';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

interface AddUserFormProps {
  onAdd: (u: Partial<User>) => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ onAdd }) => {
  const [newUser, setNewUser] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    hierarchicalId: '',
    role: 'USER',
    managerName: '',
    managerEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email || !newUser.firstName || !newUser.lastName || !newUser.hierarchicalId) {
        alert("Wypełnij wymagane pola (Imię, Nazwisko, Email, ID)");
        return;
    }
    
    // Ostrzeżenie jeśli brak Managera
    if (!newUser.managerEmail) {
        if (!confirm("UWAGA: Nie podano adresu e-mail przełożonego.\n\nZgodnie z metodologią, system nie wyśle raportu do managera po egzaminie, a jedynie do kandydata i centrali.\n\nCzy chcesz kontynuować bez Managera?")) {
            return;
        }
    }

    onAdd(newUser);
    // Reset
    setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        hierarchicalId: '',
        role: 'USER',
        managerName: '',
        managerEmail: ''
    });
    alert("Dodano nowego użytkownika do bazy.");
  };

  return (
    <div className="dynamics-card p-6 border-t-4 border-[#C5A059] bg-white mb-8">
        <div className="mb-6 border-b border-[#EDEBE9] pb-4">
            <h3 className="text-sm font-bold text-[#002147] uppercase tracking-tight flex items-center gap-2">
                <span className="bg-[#C5A059] text-[#002147] w-6 h-6 flex items-center justify-center rounded-full text-xs font-black">+</span>
                Dodaj pracownika ręcznie
            </h3>
        </div>
            
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
                label="Imię" 
                value={newUser.firstName} 
                onChange={e => setNewUser({...newUser, firstName: e.target.value})} 
                required
            />
            <Input 
                label="Nazwisko" 
                value={newUser.lastName} 
                onChange={e => setNewUser({...newUser, lastName: e.target.value})} 
                required
            />
            
            <Input 
                label="Adres E-mail (Login)"
                type="email"
                value={newUser.email} 
                onChange={e => setNewUser({...newUser, email: e.target.value})} 
                required
            />
            <Input 
                label="ID Hierarchiczne (HR)"
                value={newUser.hierarchicalId} 
                onChange={e => setNewUser({...newUser, hierarchicalId: e.target.value})} 
                required
            />

            <Input 
                label="Hasło Startowe"
                value={newUser.password} 
                onChange={e => setNewUser({...newUser, password: e.target.value})} 
                placeholder="(Opcjonalne) Pozostaw puste dla losowego"
                description="Jeśli nie wpiszesz, system wygeneruje losowe hasło."
            />

            <Select 
                label="Rola Systemowa"
                value={newUser.role}
                onChange={e => setNewUser({...newUser, role: e.target.value as any})}
                options={[
                    { label: 'Użytkownik (Doradca)', value: 'USER' },
                    { label: 'Manager', value: 'MANAGER' },
                    { label: 'Administrator', value: 'ADMIN' }
                ]}
            />

            <div className="md:col-span-2 bg-blue-50 p-4 border border-blue-100 rounded">
                <p className="text-[10px] font-black uppercase text-[#002147] mb-3">Konfiguracja Powiadomień (Metodologia E-mail)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                        label="Przełożony (Imię i Nazwisko)"
                        value={newUser.managerName} 
                        onChange={e => setNewUser({...newUser, managerName: e.target.value})} 
                        placeholder="Do treści raportu..."
                    />
                    <Input 
                        label="Email Przełożonego (Ważne)"
                        type="email"
                        value={newUser.managerEmail} 
                        onChange={e => setNewUser({...newUser, managerEmail: e.target.value})} 
                        placeholder="Tu trafi raport po egzaminie..."
                    />
                </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
                <Button type="submit" variant="primary" size="lg">
                    Zapisz i aktywuj konto
                </Button>
            </div>
        </form>
    </div>
  );
};
