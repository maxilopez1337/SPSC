
import React, { useState } from 'react';
import { User } from '../../../types';
import { Modal } from '../../Modal';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

interface EditUserModalProps {
    user: User;
    onSave: (u: User) => void;
    onCancel: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ 
    user, 
    onSave, 
    onCancel 
}) => {
    const [formData, setFormData] = useState<User>({ ...user });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal 
            title="Edycja Doradcy" 
            onClose={onCancel} 
            maxWidth="max-w-md"
            borderColor="gold"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <Input 
                        label="Imię"
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        required
                    />
                    <Input 
                        label="Nazwisko"
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        required
                    />
                </div>
                
                <Input 
                    label="ID Hierarchiczne"
                    value={formData.hierarchicalId}
                    onChange={e => setFormData({...formData, hierarchicalId: e.target.value})}
                    required
                />

                <div className="pt-4 border-t border-[#EDEBE9]">
                    <p className="text-[10px] font-black text-[#C5A059] uppercase mb-4 tracking-widest">Dane Przełożonego</p>
                    <div className="space-y-4">
                        <Input 
                            label="Imię i Nazwisko Przełożonego"
                            value={formData.managerName || ''}
                            onChange={e => setFormData({...formData, managerName: e.target.value})}
                            placeholder="np. Jan Kowalski"
                        />
                        <Input 
                            label="Email Przełożonego"
                            value={formData.managerEmail || ''}
                            onChange={e => setFormData({...formData, managerEmail: e.target.value})}
                            placeholder="np. j.kowalski@stratton-prime.pl"
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#EDEBE9]">
                    <Button type="button" variant="outline" fullWidth onClick={onCancel}>
                        Anuluj
                    </Button>
                    <Button type="submit" variant="primary" fullWidth>
                        Zapisz Zmiany
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
