
import { Question, User, ExamResult, CertificateLayout } from '../types';
import { INITIAL_QUESTIONS as SEED_QUESTIONS } from '../constants';

const DB_KEYS = {
  QUESTIONS: 'stratton_questions',
  USERS: 'stratton_users',
  RESULTS: 'stratton_results',
  CURRENT_USER: 'stratton_current_user',
  CERT_TEMPLATE: 'stratton_cert_template',
  CERT_LAYOUT: 'stratton_cert_layout',
  DB_VERSION: 'stratton_db_version',
  ACTIVE_SESSION: 'stratton_active_session_lock'
};

const CURRENT_DB_VERSION = 24;

// WGRANY SZABLON CERTYFIKATU (Base64) - Czyste białe tło w wysokiej rozdzielczości A4
// Używany jako ostateczny fallback (awaryjny).
const EMBEDDED_CERT_TEMPLATE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAIAAABs0g2CAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA9ZSURBVHhe7dkxAcAAAMMg+zf9O2hgwIECAAAAAElFTkSuQmCC";

const generateRandomPassword = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let pass = "";
  for (let i = 0; i < 8; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

// --- PEŁNA LISTA KADROWA ---
const DEFAULT_USERS: User[] = [
  { id: 'admin-root', email: 'admin@stratton-prime.pl', password: '1Haslo1haslo1', firstName: 'System', lastName: 'Administrator', hierarchicalId: 'ROOT', role: 'ADMIN' },
  { id: 'admin-dws', email: 'dws@stratton-prime.pl', password: 'Stratton2025!', firstName: 'Dział', lastName: 'Wsparcia Sprzedaży', hierarchicalId: 'DWS', role: 'ADMIN' },
  { id: 'test-user-dev', email: 'test@stratton-prime.pl', password: 'Test1234', firstName: 'Tester', lastName: 'Testowy', hierarchicalId: 'DEV-TEST-01', role: 'USER', managerName: 'Biuro Stratton', managerEmail: 'biuro@stratton-prime.pl' },
  { id: 'u1', hierarchicalId: 'GDJJ', role: 'ADMIN', firstName: 'Jakub', lastName: 'Jabłoński', email: 'j.jablonski@stratton-prime.pl', password: 'Stratton2025!' },
  { id: 'u2', hierarchicalId: 'GDJJ/JA', role: 'MANAGER', firstName: 'Jarosław', lastName: 'Adamczyk', email: 'j.adamczyk@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u3', hierarchicalId: 'GDJJ/JA/UD', role: 'MANAGER', firstName: 'Urszula', lastName: 'Dynowska', email: 'u.dynowska@stratton-prime.pl', managerName: 'Jarosław Adamczyk', managerEmail: 'j.adamczyk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u4', hierarchicalId: 'GDJJ/JA/UD/MS', role: 'MANAGER', firstName: 'Małgorzata', lastName: 'Sienkiewicz-Łuczyn', email: 'm.sienkiewicz@stratton-prime.pl', managerName: 'Urszula Dynowska', managerEmail: 'u.dynowska@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u5', hierarchicalId: 'GDJJ/JA/RC', role: 'MANAGER', firstName: 'Rafał', lastName: 'Choroszynski', email: 'j.choroszynski@stratton-prime.pl', managerName: 'Jarosław Adamczyk', managerEmail: 'j.adamczyk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u6', hierarchicalId: 'GDJJ/JA/RC/PS', role: 'USER', firstName: 'Patryk', lastName: 'Szerniewicz', email: 'p.szerniewicz@stratton-prime.pl', managerName: 'Rafał Choroszynski', managerEmail: 'j.choroszynski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u7', hierarchicalId: 'GDJJ/JA/RC/PP', role: 'USER', firstName: 'Piotr', lastName: 'Pstrocki', email: 'p.pstrocki@stratton-prime.pl', managerName: 'Rafał Choroszynski', managerEmail: 'j.choroszynski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u8', hierarchicalId: 'GDJJ/JA/RC/JL', role: 'USER', firstName: 'Joanna', lastName: 'Lisowska', email: 'j.lisowska@stratton-prime.pl', managerName: 'Rafał Choroszynski', managerEmail: 'j.choroszynski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u9', hierarchicalId: 'GDJJ/JA/AL', role: 'USER', firstName: 'Alicja', lastName: 'Lietz', email: 'a.lietz@stratton-prime.pl', managerName: 'Jarosław Adamczyk', managerEmail: 'j.adamczyk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u10', hierarchicalId: 'GDJJ/NK', role: 'MANAGER', firstName: 'Natalia', lastName: 'Kropez vel Kropacz', email: 'natalia.kvk@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u11', hierarchicalId: 'GDJJ/NK/KJ', role: 'MANAGER', firstName: 'Karol', lastName: 'Jackiewicz', email: 'k.jackiewicz@stratton-prime.pl', managerName: 'Natalia Kropez', managerEmail: 'natalia.kvk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u12', hierarchicalId: 'GDJJ/NK/KR', role: 'USER', firstName: 'Krzysztof', lastName: 'Rimpel', email: 'k.rimpel@stratton-prime.pl', managerName: 'Natalia Kropez', managerEmail: 'natalia.kvk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u13', hierarchicalId: 'GDJJ/NK/JW', role: 'USER', firstName: 'Jacek', lastName: 'Wojtyra', email: 'j.wojtyra@stratton-prime.pl', managerName: 'Natalia Kropez', managerEmail: 'natalia.kvk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u14', hierarchicalId: 'GDJJ/NK/PP', role: 'USER', firstName: 'Paweł', lastName: 'Pikiewicz', email: 'p.pikiewicz@stratton-prime.pl', managerName: 'Natalia Kropez', managerEmail: 'natalia.kvk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u15', hierarchicalId: 'GDJJ/NK/ID', role: 'USER', firstName: 'Ireneusz', lastName: 'Damps', email: 'i.damps@stratton-prime.pl', managerName: 'Natalia Kropez', managerEmail: 'natalia.kvk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u16', hierarchicalId: 'GDJJ/TL', role: 'MANAGER', firstName: 'Mateusz', lastName: 'Tyl', email: 'm.tyl@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u17', hierarchicalId: 'GDJJ/TL', role: 'MANAGER', firstName: 'Tomasz', lastName: 'Lasowski', email: 't.lasowski@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u18', hierarchicalId: 'GDJJ/MJ', role: 'MANAGER', firstName: 'Maciej', lastName: 'Jabłoński', email: 'm.jablonski@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u19', hierarchicalId: 'GDJJ/TP', role: 'MANAGER', firstName: 'Tymoteusz', lastName: 'Pawlikowski', email: 't.pawlikowski@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u20', hierarchicalId: 'GDJJ/TP/MY', role: 'USER', firstName: 'Maksym', lastName: 'Yakymchuk', email: 'm.yakymchuk@stratton-prime.pl', managerName: 'Tymoteusz Pawlikowski', managerEmail: 't.pawlikowski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u21', hierarchicalId: 'GDJJ/TP/KK', role: 'MANAGER', firstName: 'Krzysztof', lastName: 'Kortas', email: 'k.kortas@stratton-prime.pl', managerName: 'Tymoteusz Pawlikowski', managerEmail: 't.pawlikowski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u22', hierarchicalId: 'GDJJ/JA/KG', role: 'USER', firstName: 'Karolina', lastName: 'Galera', email: 'k.galera@stratton-prime.pl', managerName: 'Rafał Choroszynski', managerEmail: 'j.choroszynski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u23', hierarchicalId: 'GDJJ/KR', role: 'MANAGER', firstName: 'Kacper', lastName: 'Reński', email: 'k.renski@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u24', hierarchicalId: 'GDJ/TP/HW/AB', role: 'USER', firstName: 'Andrzej', lastName: 'Bal', email: 'a.bal@stratton-prime.pl', managerName: 'Tymoteusz Pawlikowski', managerEmail: 't.pawlikowski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u25', hierarchicalId: 'GDJJ/KR/PL', role: 'USER', firstName: 'Paweł', lastName: 'Lubiński', email: 'p.lubinski@stratton-prime.pl', managerName: 'Kacper Reński', managerEmail: 'k.renski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u26', hierarchicalId: 'GDJJ/KR/PW', role: 'USER', firstName: 'Przemysław', lastName: 'Wolski', email: 'p.wolski@stratton-prime.pl', managerName: 'Kacper Reński', managerEmail: 'k.renski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u27', hierarchicalId: 'GDJJ/NK/PG', role: 'USER', firstName: 'Piotr', lastName: 'Głogowski', email: 'p.glogowski@stratton-prime.pl', managerName: 'Natalia Kropez', managerEmail: 'natalia.kvk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u28', hierarchicalId: 'GDJJ/JA/UD/MS/RW', role: 'USER', firstName: 'Rafał', lastName: 'Wojtas', email: 'r.wojtas@stratton-prime.pl', managerName: 'Małgorzata Sienkiewicz-Łuczyn', managerEmail: 'm.sienkiewicz@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u29', hierarchicalId: 'GDJJ/JA/UD/MS/PA', role: 'USER', firstName: 'Piotr', lastName: 'Amanowicz', email: 'p.amanowicz@stratton-prime.pl', managerName: 'Małgorzata Sienkiewicz-Łuczyn', managerEmail: 'm.sienkiewicz@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u30', hierarchicalId: 'GDJJ/JA/RC/MC', role: 'USER', firstName: 'Małgorzata', lastName: 'Cholewicka', email: 'm.cholewicka@stratton-prime.pl', managerName: 'Rafał Choroszynski', managerEmail: 'j.choroszynski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u31', hierarchicalId: 'GDJJ/JA/UD/MS1', role: 'MANAGER', firstName: 'Marzanna', lastName: 'Szarolkiewicz', email: 'm.szarolkiewicz@stratton-prime.pl', managerName: 'Urszula Dynowska', managerEmail: 'u.dynowska@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u32', hierarchicalId: 'GDJJ/JA/UD/MG', role: 'MANAGER', firstName: 'Mariola', lastName: 'Gwizdała', email: 'm.gwizdala@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u33', hierarchicalId: 'GDJJ/KR/PL2', role: 'USER', firstName: 'Paulina', lastName: 'Leońska', email: 'p.leonska@stratton-prime.pl', managerName: 'Kacper Reński', managerEmail: 'k.renski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u34', hierarchicalId: 'GDJJ/JA/UD/MS1/RO', role: 'USER', firstName: 'Robert', lastName: 'Ogonowski', email: 'r.ogonowski@stratton-prime.pl', managerName: 'Marzanna Szarolkiewicz', managerEmail: 'm.szarolkiewicz@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u35', hierarchicalId: 'GDJJ/JA/UD/MS1/MK', role: 'USER', firstName: 'Martyna', lastName: 'Kwiatkowska', email: 'm.kwiatkowska@stratton-prime.pl', managerName: 'Marzanna Szarolkiewicz', managerEmail: 'm.szarolkiewicz@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u36', hierarchicalId: 'GDJJ/NK/MS', role: 'USER', firstName: 'Mikołaj', lastName: 'Skonieczka', email: 'm.skonieczka@stratton-prime.pl', managerName: 'Natalia Kropez', managerEmail: 'natalia.kvk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u37', hierarchicalId: 'GDJJ/JA/UD/MG/AD', role: 'USER', firstName: 'Anna', lastName: 'Drywa', email: 'a.drywa@stratton-prime.pl', managerName: 'Mariola Gwizdała', managerEmail: 'm.gwizdala@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u38', hierarchicalId: 'GDJJ/JA/UD/MG/AK', role: 'USER', firstName: 'Aleksandra', lastName: 'Koszczyc', email: 'a.koszczyc@stratton-prime.pl', managerName: 'Mariola Gwizdała', managerEmail: 'm.gwizdala@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u39', hierarchicalId: 'GDJJ/JA/UD/MG/SG', role: 'USER', firstName: 'Sabrina', lastName: 'Gralak', email: 's.gralak@stratton-prime.pl', managerName: 'Mariola Gwizdała', managerEmail: 'm.gwizdala@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u40', hierarchicalId: 'GDJJ/JA/UD/MG/OM', role: 'USER', firstName: 'Oliwia', lastName: 'Mielewczyk', email: 'o.mielewczyk@stratton-prime.pl', managerName: 'Mariola Gwizdała', managerEmail: 'm.gwizdala@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u41', hierarchicalId: 'GDJJ/JA/UD/MG/EM', role: 'USER', firstName: 'Ewelina', lastName: 'Muttka', email: 'e.muttka@stratton-prime.pl', managerName: 'Mariola Gwizdała', managerEmail: 'm.gwizdala@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u42', hierarchicalId: 'GDJJ/JA/UD/MG/PG', role: 'USER', firstName: 'Patryk', lastName: 'Gwizdała', email: 'p.gwizdala@stratton-prime.pl', managerName: 'Mariola Gwizdała', managerEmail: 'm.gwizdala@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u43', hierarchicalId: 'GDJJ/JA/UD/MG/NM', role: 'USER', firstName: 'Natalia', lastName: 'Malinowska', email: 'n.malinowska@stratton-prime.pl', managerName: 'Mariola Gwizdała', managerEmail: 'm.gwizdala@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u44', hierarchicalId: 'GDJJ/JA/UD/MS1/KG', role: 'USER', firstName: 'Krzysztof', lastName: 'Grygierzec', email: 'k.grygierzec@stratton-prime.pl', managerName: 'Marzanna Szarolkiewicz', managerEmail: 'm.szarolkiewicz@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u45', hierarchicalId: 'GDJJ/PD', role: 'MANAGER', firstName: 'Piotr', lastName: 'Dymowski', email: 'p.dymowski@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u46', hierarchicalId: 'GDJJ/JA/UD/MS1/JP', role: 'USER', firstName: 'Jarosław', lastName: 'Pawłowski', email: 'j.pawlowski@stratton-prime.pl', managerName: 'Marzanna Szarolkiewicz', managerEmail: 'm.szarolkiewicz@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u47', hierarchicalId: 'GDJJ/JA/UD/MS1/MN', role: 'USER', firstName: 'Michał', lastName: 'Nizgórski', email: 'm.nizgorski@stratton-prime.pl', managerName: 'Marzanna Szarolkiewicz', managerEmail: 'm.szarolkiewicz@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u48', hierarchicalId: 'GDJJ/JA/KB', role: 'USER', firstName: 'Kamil', lastName: 'Buczak', email: 'k.buczak@stratton-prime.pl', managerName: 'Jarosław Adamczyk', managerEmail: 'j.adamczyk@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u49', hierarchicalId: 'GDJJ/TP/KK/SI', role: 'USER', firstName: 'Serchii', lastName: 'Ivanchenko', email: 's.ivanchenko@stratton-prime.pl', managerName: 'Krzysztof Kortas', managerEmail: 'k.kortas@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u50', hierarchicalId: 'GDJJ/PD/PZ', role: 'MANAGER', firstName: 'Przemysław', lastName: 'Zych', email: 'p.zych@stratton-prime.pl', managerName: 'Piotr Dymowski', managerEmail: 'p.dymowski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u51', hierarchicalId: 'GDJJ/JA/MS1/PG', role: 'MANAGER', firstName: 'Przemysław', lastName: 'Gruchalski', email: 'p.gruchalski@stratton-prime.pl', managerName: 'Jakub Jabłoński', managerEmail: 'j.jablonski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u52', hierarchicalId: 'GDJJ/JA/MS1/PG/MG', role: 'USER', firstName: 'Monika', lastName: 'Gdanietz', email: 'm.gdanietz@stratton-prime.pl', managerName: 'Przemysław Gruchalski', managerEmail: 'p.gruchalski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u53', hierarchicalId: 'GDJJ/JA/MS1/PG/KW', role: 'USER', firstName: 'Kamil', lastName: 'Wieczerzak', email: 'k.wieczerzak@stratton-prime.pl', managerName: 'Przemysław Gruchalski', managerEmail: 'p.gruchalski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u54', hierarchicalId: 'GDJJ/JA/MS1/PG/KD', role: 'USER', firstName: 'Krzysztof', lastName: 'Dziekoński', email: 'k.dziekonski@stratton-prime.pl', managerName: 'Przemysław Gruchalski', managerEmail: 'p.gruchalski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u55', hierarchicalId: 'GDJJ/JA/MS1/PG/MG1', role: 'USER', firstName: 'Michał', lastName: 'Gołębiowski', email: 'm.golebiowski@stratton-prime.pl', managerName: 'Przemysław Gruchalski', managerEmail: 'p.gruchalski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u56', hierarchicalId: 'GDJJ/JA/MS1/PG/PA', role: 'USER', firstName: 'Piotr', lastName: 'Andrzejewski', email: 'p.andrzejewski@stratton-prime.pl', managerName: 'Przemysław Gruchalski', managerEmail: 'p.gruchalski@stratton-prime.pl', password: generateRandomPassword() },
  { id: 'u57', hierarchicalId: 'GDJJ/NK/KJ/ŁK', role: 'USER', firstName: 'Łukasz', lastName: 'Gabriel', email: 'l.gabriel@stratton-prime.pl', managerName: 'Karol Jackiewicz', managerEmail: 'k.jackiewicz@stratton-prime.pl', password: generateRandomPassword() }
];

const DEFAULT_LAYOUT: CertificateLayout = {
  fullName: {
    visible: true,
    x: 49,
    y: 43, 
    fontSize: 37,
    color: '#002147',
    fontFamily: 'Playfair Display',
    fontWeight: 800,
    align: 'center'
  },
  hierarchicalId: {
    visible: true,
    x: 49,
    y: 54, 
    fontSize: 16,
    color: '#C5A059',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    align: 'center'
  },
  date: {
    visible: true,
    x: 86,
    y: 87, 
    fontSize: 18,
    color: '#002147',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    align: 'center'
  },
  hologram: {
    visible: false,
    x: 15,
    y: 21,
    fontSize: 165,
    color: '#000000',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    align: 'center'
  }
};

export const storage = {
  init() {
    try {
        const storedVersion = parseInt(localStorage.getItem(DB_KEYS.DB_VERSION) || '0');
        
        if (!localStorage.getItem(DB_KEYS.QUESTIONS) || SEED_QUESTIONS.length === 0 || storedVersion < CURRENT_DB_VERSION) {
          localStorage.setItem(DB_KEYS.QUESTIONS, JSON.stringify(SEED_QUESTIONS));
        }
        
        const storedUsersJson = localStorage.getItem(DB_KEYS.USERS);
        
        let storedUsersCount = 0;
        if (storedUsersJson) {
            try {
                storedUsersCount = JSON.parse(storedUsersJson).length;
            } catch (e) {
                console.error("Błąd parsowania użytkowników, resetuję bazę.", e);
                storedUsersCount = 0; 
            }
        }
        
        if (storedVersion < CURRENT_DB_VERSION || storedUsersCount < DEFAULT_USERS.length) {
            console.warn(`Wykryto niespójność bazy (Wersja: ${storedVersion}, Rekordy: ${storedUsersCount}/${DEFAULT_USERS.length}). Wymuszanie pełnej synchronizacji.`);
            localStorage.removeItem(DB_KEYS.USERS);
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
            localStorage.setItem(DB_KEYS.DB_VERSION, CURRENT_DB_VERSION.toString());
            this.saveCertLayout(DEFAULT_LAYOUT);
        } else {
            if (!storedUsersJson) {
                localStorage.setItem(DB_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
                localStorage.setItem(DB_KEYS.DB_VERSION, CURRENT_DB_VERSION.toString());
            }
        }

        if (!localStorage.getItem(DB_KEYS.RESULTS)) {
          localStorage.setItem(DB_KEYS.RESULTS, JSON.stringify([]));
        }
        
        if (!localStorage.getItem(DB_KEYS.CERT_LAYOUT) || storedVersion < CURRENT_DB_VERSION) {
          this.saveCertLayout(DEFAULT_LAYOUT);
        }

        // Ładowanie domyślnego szablonu (jeśli nie ma żadnego)
        if (!this.getCertTemplate()) {
            this.loadDefaultTemplateFromAssets();
        }
    } catch (e) {
        console.error("Krytyczny błąd inicjalizacji Storage:", e);
        localStorage.clear();
    }
  },

  async loadDefaultTemplateFromAssets() {
    // Lista plików do sprawdzenia w kolejności priorytetu
    // Teraz system najpierw szuka "CERTYFIKAT.png" jako domyślny szablon
    const candidates = ['/CERTYFIKAT.png', '/CERTYFIKAT (1).png', '/certyfikat.png', '/public/CERTYFIKAT.png', '/public/CERTYFIKAT (1).png', '/public/certyfikat.png'];

    for (const path of candidates) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                 const blob = await response.blob();
                 const name = path.replace('/', '');
                 this.saveBlobAsTemplate(blob, `System (${name})`);
                 return; // Zakończ, jeśli znaleziono
            }
        } catch (e) {
            // Ignoruj błędy, próbuj dalej
        }
    }

    // Fallback: Wbudowany szablon (Base64) - jeśli żaden plik nie istnieje
    this.saveCertTemplate({ 
        name: 'System Default (Białe tło)', 
        base64: EMBEDDED_CERT_TEMPLATE 
    });
  },

  saveBlobAsTemplate(blob: Blob, name: string) {
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64 = reader.result as string;
        this.saveCertTemplate({ name, base64 });
    };
    reader.readAsDataURL(blob);
  },

  getQuestions(): Question[] {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.QUESTIONS) || '[]');
    } catch { return []; }
  },

  saveQuestions(questions: Question[]) {
    localStorage.setItem(DB_KEYS.QUESTIONS, JSON.stringify(questions));
  },

  getResults(): ExamResult[] {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.RESULTS) || '[]');
    } catch { return []; }
  },

  getFailedAttemptsCount(email: string): number {
    const results = this.getResults();
    return results.filter(r => r.email === email && !r.passed).length;
  },

  hasPassed(email: string): boolean {
    const results = this.getResults();
    return results.some(r => r.email === email && r.passed);
  },

  saveResult(result: ExamResult) {
    const results = this.getResults();
    results.push(result);
    localStorage.setItem(DB_KEYS.RESULTS, JSON.stringify(results));
  },

  getCurrentUser(): User | null {
    try {
        const user = localStorage.getItem(DB_KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    } catch { return null; }
  },

  setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(DB_KEYS.CURRENT_USER);
    }
  },

  getUsers(): User[] {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
    } catch { return []; }
  },

  saveUsers(users: User[]) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  },

  getUserByEmail(email: string): User | undefined {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  saveCertTemplate(data: { name: string, base64: string } | null) {
    if (data) {
        localStorage.setItem(DB_KEYS.CERT_TEMPLATE, JSON.stringify(data));
    } else {
        localStorage.removeItem(DB_KEYS.CERT_TEMPLATE);
    }
  },

  getCertTemplate(): { name: string, base64: string } | null {
    try {
        const data = localStorage.getItem(DB_KEYS.CERT_TEMPLATE);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
  },

  saveCertLayout(layout: CertificateLayout) {
    localStorage.setItem(DB_KEYS.CERT_LAYOUT, JSON.stringify(layout));
  },

  getCertLayout(): CertificateLayout {
    try {
        const data = localStorage.getItem(DB_KEYS.CERT_LAYOUT);
        if (!data) return DEFAULT_LAYOUT;
        const parsed = JSON.parse(data);
        return {
            fullName: { ...DEFAULT_LAYOUT.fullName, ...parsed.fullName },
            hierarchicalId: { ...DEFAULT_LAYOUT.hierarchicalId, ...parsed.hierarchicalId },
            date: { ...DEFAULT_LAYOUT.date, ...parsed.date },
            hologram: { ...DEFAULT_LAYOUT.hologram, ...(parsed.hologram || {}) }
        };
    } catch { return DEFAULT_LAYOUT; }
  },

  startExamSession(email: string) {
      localStorage.setItem(DB_KEYS.ACTIVE_SESSION, email);
  },

  clearExamSession() {
      localStorage.removeItem(DB_KEYS.ACTIVE_SESSION);
  },

  checkActiveSession(email: string): boolean {
      const activeSessionEmail = localStorage.getItem(DB_KEYS.ACTIVE_SESSION);
      return activeSessionEmail === email;
  }
};
