
import emailjs from '@emailjs/browser';
import { ExamResult } from '../types';
import { EMAILJS_CONFIG, OFFICE_EMAIL, CHIEF_DIRECTOR_EMAIL } from '../constants';

// Funkcja pomocnicza do opóźniania wykonania (Promise)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Zaawansowany algorytm zamiany imienia z Mianownika na Wołacz.
 * Zawiera potężny słownik imion męskich i żeńskich.
 */
const getVocativeName = (name: string): string => {
  const n = name.trim();
  if (!n) return '';

  // BAZA IMION (Wyjątki, E-ruchome, Końcówki nietypowe)
  const exceptions: Record<string, string> = {
    // === ŻEŃSKIE (Popularne + Wyjątki) ===
    'Ada': 'Ado', 'Adela': 'Adelo', 'Adrianna': 'Adrianno', 'Agata': 'Agato', 'Agnieszka': 'Agnieszko',
    'Aldona': 'Aldono', 'Aleksandra': 'Aleksandro', 'Alicja': 'Alicjo', 'Alina': 'Alino', 'Amelia': 'Amelio',
    'Anastazja': 'Anastazjo', 'Aneta': 'Aneto', 'Angelika': 'Angeliko', 'Ania': 'Aniu', 'Anita': 'Anito',
    'Anna': 'Anno', 'Antonina': 'Antonino', 'Apolonia': 'Apolonio', 'Asia': 'Asiu',
    'Barbara': 'Barbaro', 'Basia': 'Basiu', 'Beata': 'Beato', 'Bernadeta': 'Bernadeto', 'Bianka': 'Bianko',
    'Blanka': 'Blanko', 'Bogumiła': 'Bogumiło', 'Bogusława': 'Bogusławo', 'Bożena': 'Bożeno', 'Brygida': 'Brygido',
    'Celina': 'Celino', 'Czesława': 'Czesławo',
    'Dagmara': 'Dagmaro', 'Danuta': 'Danuto', 'Daria': 'Dario', 'Dominika': 'Dominiko', 'Dorota': 'Doroto',
    'Edyta': 'Edyto', 'Ela': 'Elu', 'Eliza': 'Elizo', 'Elwira': 'Elwiro', 'Elżbieta': 'Elżbieto',
    'Emilia': 'Emilio', 'Ewa': 'Ewo', 'Ewelina': 'Ewelino',
    'Felicja': 'Felicjo', 'Franciszka': 'Franciszko',
    'Gabriela': 'Gabrielo', 'Gaja': 'Gaju', 'Genowefa': 'Genowefo', 'Gosia': 'Gosiu', 'Grażyna': 'Grażyno',
    'Halina': 'Halino', 'Hanna': 'Hanno', 'Helena': 'Heleno', 'Honorata': 'Honorato',
    'Ida': 'Ido', 'Iga': 'Igo', 'Ilona': 'Ilono', 'Irena': 'Ireno', 'Irmina': 'Irmino', 
    'Iwona': 'Iwono', 'Iza': 'Izo', 'Izabela': 'Izabelo',
    'Jadwiga': 'Jadwigo', 'Jagoda': 'Jagodo', 'Janina': 'Janino', 'Joanna': 'Joanno', 'Jolanta': 'Jolanto',
    'Jowita': 'Jowito', 'Judyta': 'Judyto', 'Julia': 'Julio', 'Julita': 'Julito', 'Justyna': 'Justyno',
    'Kaja': 'Kaju', 'Kamila': 'Kamilo', 'Karina': 'Karino', 'Karolina': 'Karolino', 'Kasia': 'Kasiu',
    'Katarzyna': 'Katarzyno', 'Kazimiera': 'Kazimiero', 'Kinga': 'Kingo', 'Klaudia': 'Klaudio',
    'Kornelia': 'Kornelio', 'Krystyna': 'Krystyno',
    'Laura': 'Lauro', 'Lena': 'Leno', 'Leokadia': 'Leokadio', 'Lidia': 'Lidio', 'Liliana': 'Liliano',
    'Lucyna': 'Lucyno', 'Ludwika': 'Ludwiko', 'Luiza': 'Luizo',
    'Łucja': 'Łucjo',
    'Magda': 'Magdo', 'Magdalena': 'Magdaleno', 'Maja': 'Maju', 'Malwina': 'Malwino', 'Małgorzata': 'Małgorzato',
    'Marcelina': 'Marcelino', 'Maria': 'Mario', 'Marianna': 'Marianno', 'Mariola': 'Mariolo', 'Marlena': 'Marleno',
    'Marta': 'Marto', 'Martyna': 'Martyno', 'Marzena': 'Marzeno', 'Matylda': 'Matyldo', 'Michalina': 'Michalino',
    'Milena': 'Mileno', 'Mirosława': 'Mirosławo', 'Monika': 'Moniko',
    'Natalia': 'Natalio', 'Nel': 'Nel', 'Nikola': 'Nikolo', 'Nina': 'Nino',
    'Ola': 'Olu', 'Olga': 'Olgo', 'Oliwia': 'Oliwio', 'Otylia': 'Otylio',
    'Pamela': 'Pamelo', 'Patrycja': 'Patrycjo', 'Paulina': 'Paulino', 'Pola': 'Polu',
    'Regina': 'Regino', 'Renata': 'Renato', 'Roksana': 'Roksano', 'Róża': 'Różo',
    'Sabina': 'Sabino', 'Sandra': 'Sandro', 'Stanisława': 'Stanisławo', 'Stefania': 'Stefanio', 'Sylwia': 'Sylwio',
    'Teresa': 'Tereso',
    'Urszula': 'Urszulo',
    'Wanda': 'Wando', 'Weronika': 'Weroniko', 'Wiesława': 'Wiesławo', 'Wiktoria': 'Wiktorio', 'Wioletta': 'Wioletto',
    'Zofia': 'Zofio', 'Zosia': 'Zosiu', 'Zuzanna': 'Zuzanno', 'Zyta': 'Zyto',
    'Żaneta': 'Żaneto',

    // === MĘSKIE (E-ruchome, Zmiękczenia) ===
    'Adam': 'Adamie', 'Adolf': 'Adolfie', 'Adrian': 'Adrianie', 'Albert': 'Albercie', 
    'Aleksander': 'Aleksandrze', 'Aleksy': 'Aleksy', 'Alfred': 'Alfredzie', 'Amadeusz': 'Amadeuszu', 
    'Andrzej': 'Andrzeju', 'Antoni': 'Antoni', 'Arek': 'Arku', 'Arkadiusz': 'Arkadiuszu', 
    'Artur': 'Arturze', 
    'Barnaba': 'Barnabo', 'Bartek': 'Bartku', 'Bartłomiej': 'Bartłomieju', 'Bartosz': 'Bartoszu', 
    'Benedykt': 'Benedykcie', 'Bernard': 'Bernardzie', 'Błażej': 'Błażeju', 'Bogdan': 'Bogdanie', 
    'Bogusław': 'Bogusławie', 'Bolesław': 'Bolesławie', 'Borys': 'Borysie', 'Bronisław': 'Bronisławie',
    'Cezary': 'Cezary', 'Czesław': 'Czesławie',
    'Damian': 'Damianie', 'Daniel': 'Danielu', 'Darek': 'Darku', 'Dariusz': 'Dariuszu', 
    'Dawid': 'Dawidzie', 'Dominik': 'Dominiku',
    'Edward': 'Edwardzie', 'Emil': 'Emilu', 'Eryk': 'Eryku', 'Eugeniusz': 'Eugeniuszu',
    'Filip': 'Filipie', 'Franciszek': 'Franciszku', 'Fryderyk': 'Fryderyku',
    'Gabriel': 'Gabrielu', 'Gerard': 'Gerardzie', 'Grzegorz': 'Grzegorzu', 'Gustaw': 'Gustawie',
    'Henryk': 'Henryku', 'Hubert': 'Hubercie',
    'Ignacy': 'Ignacy', 'Igor': 'Igorze', 'Ireneusz': 'Ireneuszu',
    'Jacek': 'Jacku', 'Jakub': 'Jakubie', 'Jan': 'Janie', 'Janusz': 'Januszu', 'Jarek': 'Jarku', 
    'Jarosław': 'Jarosławie', 'Jerzy': 'Jerzy', 'Joachim': 'Joachimie', 'Józef': 'Józefie', 
    'Julian': 'Julianie', 'Juliusz': 'Juliuszu',
    'Kacper': 'Kacprze', 'Kajetan': 'Kajetanie', 'Kamil': 'Kamilu', 'Karol': 'Karolu', 
    'Kazimierz': 'Kazimierzu', 'Klaudiusz': 'Klaudiuszu', 'Konrad': 'Konradzie', 'Kordian': 'Kordianie', 
    'Krystian': 'Krystianie', 'Krzysztof': 'Krzysztofie', 'Kuba': 'Kubo',
    'Lech': 'Lechu', 'Leon': 'Leonie', 'Leszek': 'Leszku', 'Lucjan': 'Lucjanie', 'Ludwik': 'Ludwiku',
    'Łukasz': 'Łukaszu',
    'Maciej': 'Macieju', 'Maksymilian': 'Maksymilianie', 'Marcel': 'Marcelu', 'Marcin': 'Marcinie', 
    'Marek': 'Marku', 'Marian': 'Marianie', 'Mariusz': 'Mariuszu', 'Mateusz': 'Mateuszu', 
    'Michał': 'Michale', 'Mieczysław': 'Mieczysławie', 'Mietek': 'Mietku', 'Mikołaj': 'Mikołaju', 
    'Mirek': 'Mirku', 'Mirosław': 'Mirosławie',
    'Nikodem': 'Nikodemie', 'Norbert': 'Norbercie',
    'Olaf': 'Olafie', 'Olgierd': 'Olgierdzie', 'Oskar': 'Oskarze',
    'Patryk': 'Patryku', 'Paweł': 'Pawle', 'Piotr': 'Piotrze', 'Przemek': 'Przemku', 
    'Przemysław': 'Przemysławie',
    'Radek': 'Radku', 'Radosław': 'Radosławie', 'Rafał': 'Rafale', 'Remigiusz': 'Remigiuszu', 
    'Robert': 'Robercie', 'Roman': 'Romanie', 'Rudolf': 'Rudolfie', 'Rysiek': 'Ryśku', 'Ryszard': 'Ryszardzie',
    'Sebastian': 'Sebastianie', 'Seweryn': 'Sewerynie', 'Sławomir': 'Sławomirze', 'Stanisław': 'Stanisławie', 
    'Stefan': 'Stefanie', 'Sylwester': 'Sylwestrze', 'Szczepan': 'Szczepanie', 'Szymon': 'Szymonie',
    'Tadeusz': 'Tadeuszu', 'Teodor': 'Teodorze', 'Tobiasz': 'Tobiaszu', 'Tomasz': 'Tomaszu', 
    'Tomek': 'Tomku', 'Tymon': 'Tymonie', 'Tytus': 'Tytusie',
    'Wacław': 'Wacławie', 'Waldemar': 'Waldemarze', 'Wiesław': 'Wiesławie', 'Wiktor': 'Wiktorze', 
    'Witold': 'Witoldzie', 'Władysław': 'Władysławie', 'Włodek': 'Włodku', 'Włodzimierz': 'Włodzimierzu', 
    'Wojciech': 'Wojciechu', 'Wojtek': 'Wojtku',
    'Zbigniew': 'Zbigniewie', 'Zdzisław': 'Zdzisławie', 'Zenon': 'Zenonie', 'Zygmunt': 'Zygmuncie'
  };

  if (exceptions[n]) return exceptions[n];

  // ALGORYTMY OGÓLNE (Fallback dla imion spoza bazy)

  // 1. Imiona żeńskie (kończą się na -a)
  // Wyjątek: Kuba, Barnaba, Bonawentura (męskie)
  if (n.endsWith('a') && !['Kuba', 'Barnaba', 'Bonawentura', 'Jarema'].includes(n)) {
    return n.slice(0, -1) + 'o'; // Anna -> Anno, Ewa -> Ewo (Działa dla 99% żeńskich)
  }

  // 2. Imiona męskie - reguły
  if (n.endsWith('k')) return n + 'u'; // Henryk -> Henryku
  if (n.endsWith('r')) return n + 'ze'; // Aleksander -> Aleksandrze
  if (n.endsWith('sz') || n.endsWith('cz') || n.endsWith('rz') || n.endsWith('ż') || n.endsWith('j')) return n + 'u'; // Janusz -> Januszu
  if (n.endsWith('t') || n.endsWith('d')) return n + 'cie'; // Zygmunt -> Zygmuncie
  if (n.endsWith('n') || n.endsWith('m') || n.endsWith('s') || n.endsWith('z')) return n + 'ie'; // Roman -> Romanie
  if (n.endsWith('ł')) return n.slice(0, -1) + 'le'; // Michał -> Michale
  if (n.endsWith('i') || n.endsWith('y')) return n; // Antoni -> Antoni

  // Fallback (zwraca oryginał)
  return n;
};

export const emailService = {
  async sendExamResult(result: ExamResult, pdfBase64: string | undefined, failedCount: number): Promise<{ success: boolean; text: string }> {
    // Inicjalizacja EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // --- DETEKCJA PŁCI I ODMIANA ---
    const rawFirstName = result.userName.split(' ')[0];
    const isWoman = rawFirstName.toLowerCase().endsWith('a') && !['Kuba', 'Barnaba', 'Bonawentura'].includes(rawFirstName);
    
    // Tworzymy formę wołacza dla nagłówka maila
    const vocativeFirstName = getVocativeName(rawFirstName);

    // Wspólne dane (stopka, data itp.)
    const commonParams = {
      exam_date: result.date,
      user_name: result.userName,
      score: `${result.score}%`,
      hierarchical_id: result.hierarchicalId,
      certificate_pdf: pdfBase64 || '' 
    };

    const logs: string[] = [];
    let hasError = false;

    // Funkcja pomocnicza wysyłająca pojedynczy e-mail
    const sendSingleEmail = async (recipient: string, subject: string, body: string, roleName: string) => {
      if (!recipient || recipient.trim() === '') {
        console.warn(`Pominięto wysyłkę do ${roleName} - brak adresu email.`);
        return;
      }

      try {
        console.log(`Wysyłanie do: ${roleName} (${recipient})...`);
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            ...commonParams,
            all_recipients: recipient,
            subject: subject,
            message_body: body
          }
        );
        console.log(`Sukces: ${roleName}`);
        logs.push(`${roleName}: OK`);
      } catch (error: any) {
        console.error(`Błąd wysyłki do ${roleName}:`, error);
        logs.push(`${roleName}: BŁĄD`);
        hasError = true;
      }
    };

    // --- 1. EMAIL DO KANDYDATA ---
    
    const candidatePrefix = isWoman ? 'Szanowna Pani' : 'Szanowny Panie';
    let candidateSubject = '';
    let candidateBody = '';

    // "Szanowny Panie Marku", "Szanowna Pani Anno"
    const greeting = `${candidatePrefix} ${vocativeFirstName}`;

    if (result.passed) {
      // Wariant SUKCES
      candidateSubject = `✅ GRATULACJE: Uzyskano Certyfikat Stratton Prime`;
      
      const verbPassed = isWoman ? 'ukończyła Pani' : 'ukończył Pan';
      const genderTitle = isWoman ? 'Pani' : 'Pan';
      const genderRole = isWoman ? 'certyfikowaną doradczynią' : 'certyfikowanym doradcą';
      
      candidateBody = `${greeting},\n\nZ ogromną przyjemnością informujemy, że ${verbPassed} weryfikację merytoryczną z wynikiem pozytywnym (${result.score}%).\n\nOd tej chwili jest ${genderTitle} ${genderRole} w strukturach Stratton Prime. Uprawnienia w systemie CRM zostaną zaktualizowane w trybie priorytetowym (SLA 24h).\n\nŻyczymy dalszych sukcesów zawodowych,\nZespół Szkoleń Stratton Prime`;
    
    } else {
      // Wariant PORAŻKA
      candidateSubject = `⚠️ WYNIK: Wymagana poprawa wiedzy`;
      const verbResult = isWoman ? 'uzyskany przez Panią wynik' : 'uzyskany przez Pana wynik';
      
      candidateBody = `${greeting},\n\nNiestety, ${verbResult} (${result.score}%) znajduje się poniżej wymaganego progu certyfikacji (71%).\n\nByła to próba numer ${failedCount} z 3 dostępnych.\nProsimy o ponowną analizę materiałów szkoleniowych przed kolejnym podejściem.`;
    }

    // Wyślij do kandydata
    await sendSingleEmail(result.email, candidateSubject, candidateBody, 'Kandydat');
    
    // !!! WAŻNE: Czekamy 1 sekundę, aby nie zablokować API EmailJS (Rate Limit) !!!
    await sleep(1000);


    // --- 2. EMAIL DO MANAGERA ---
    if (result.managerEmail && result.managerEmail.includes('@')) {
      const workerType = isWoman ? 'Pracownica' : 'Pracownik';
      const workerVerb = isWoman ? 'uzyskała' : 'uzyskał';
      
      let managerSubject = '';
      let managerBody = '';

      if (result.passed) {
        // SUKCES
        managerSubject = `[RAPORT HR] ${result.userName} - AWANS`;
        const statusDesc = `POZYTYWNY - ${workerType} ${workerVerb} pełne uprawnienia.`;
        managerBody = `Raport dla Przełożonego: ${result.managerName || 'Manager'}\n\nDotyczy: ${result.userName}\nID: ${result.hierarchicalId}\n\nWynik testu: ${result.score}%\nLiczba wykorzystanych prób: ${failedCount}/3\n\nStatus końcowy: ${statusDesc}`;
      
      } else if (failedCount >= 3) {
        // KRYTYCZNA PORAŻKA (3/3)
        managerSubject = `[ALERT HR] ${result.userName} - BLOKADA (Próba 3/3)`;
        const statusDesc = `NEGATYWNY (KRYTYCZNY) - ${workerType} wyczerpała limit podejść. Wymagana interwencja i blokada w CRM.`;
        managerBody = `PILNY Raport dla Przełożonego: ${result.managerName || 'Manager'}\n\nDotyczy: ${result.userName}\nID: ${result.hierarchicalId}\n\nWynik testu: ${result.score}%\nLiczba wykorzystanych prób: ${failedCount}/3 (MAX)\n\nStatus końcowy: ${statusDesc}\n\nProsimy o odbycie rozmowy wyjaśniającej.`;
      
      } else {
        // ZWYKŁA PORAŻKA (1/3 lub 2/3)
        managerSubject = `[RAPORT HR] ${result.userName} - BRAK ZALICZENIA`;
        const statusDesc = `NEGATYWNY - ${workerType} nie ${workerVerb} wymaganej liczby punktów. Wymagany nadzór merytoryczny przed kolejną próbą.`;
        managerBody = `Raport dla Przełożonego: ${result.managerName || 'Manager'}\n\nDotyczy: ${result.userName}\nID: ${result.hierarchicalId}\n\nWynik testu: ${result.score}%\nLiczba wykorzystanych prób: ${failedCount}/3\n\nStatus końcowy: ${statusDesc}`;
      }

      await sendSingleEmail(result.managerEmail, managerSubject, managerBody, 'Manager');
      
      // Kolejna pauza dla bezpieczeństwa
      await sleep(1000);
    }


    // --- 3. EMAIL DO CENTRALI (Biuro + Dyrektor) ---
    const hqRecipients = [OFFICE_EMAIL, CHIEF_DIRECTOR_EMAIL]
        .filter(e => e && e.trim().length > 0)
        .join(', ');
    
    if (hqRecipients.length > 5) {
        let hqSubject = '';
        let hqBody = '';

        if (result.passed) {
            // SCENARIUSZ 1: SUKCES (Zaliczenie)
            const attemptNum = failedCount + 1; // Jeśli failedCount=0, to próba 1. (chociaż failedCount jest przekazywany jako currentFailCount z ExamPage)
            // W ExamPage logic: currentFailCount = isPassed ? previousFailures : previousFailures + 1;
            // Więc jeśli zdał za 1 razem, failedCount=0. Próba = 0+1 = 1. Poprawnie.
            
            hqSubject = `[CERTYFIKACJA] Nowy Doradca: ${result.userName} (${result.score}%)`;
            hqBody = `Do: Dyrekcja Operacyjna / Biuro Zarządu\n\n` +
                     `Informujemy o pomyślnym zakończeniu procesu certyfikacji.\n\n` +
                     `DANE DORADCY:\n` +
                     `Imię i Nazwisko: ${result.userName}\n` +
                     `ID: ${result.hierarchicalId}\n` +
                     `Przełożony: ${result.managerName || 'N/A'}\n\n` +
                     `WYNIK EGZAMINU:\n` +
                     `Data: ${result.date}\n` +
                     `Punkty: ${result.score}% (Próg: 71%)\n` +
                     `Podejście numer: ${attemptNum} (Zaliczono)\n\n` +
                     `STATUS: NADANO UPRAWNIENIA\n` +
                     `System automatycznie wygenerował certyfikat PDF i zapisał go w archiwum. Prosimy o przygotowanie fizycznego dyplomu do podpisu przez Zarząd.`;

        } else if (failedCount >= 3) {
            // SCENARIUSZ 2: KRYTYCZNA PORAŻKA (3 próby)
            hqSubject = `[ALERT HR] Blokada Procedury: ${result.userName} (Próba 3/3)`;
            hqBody = `RAPORT INCYDENTU SZKOLENIOWEGO\n\n` +
                     `Pracownik wyczerpał limit dostępnych podejść do egzaminu weryfikacyjnego (3 próby).\n\n` +
                     `PRACOWNIK:\n` +
                     `${result.userName} (ID: ${result.hierarchicalId})\n` +
                     `Manager: ${result.managerEmail || 'Brak danych'}\n\n` +
                     `SZCZEGÓŁY:\n` +
                     `Ostatni wynik: ${result.score}%\n` +
                     `Liczba nieudanych prób: 3 z 3\n\n` +
                     `DZIAŁANIE WYMAGANE:\n` +
                     `1. Natychmiastowa blokada dostępu do modułów sprzedażowych CRM.\n` +
                     `2. Skierowanie na obowiązkową rozmowę wyjaśniającą z Dyrektorem Rozwoju.\n` +
                     `3. Wyznaczenie ścieżki re-edukacji (karencja 14 dni).`;

        } else {
            // SCENARIUSZ 3: ZWYKŁA PORAŻKA (1 lub 2 próba) - Log systemowy
            hqSubject = `[MONITORING] Nieudana próba: ${result.userName} (${failedCount}/3)`;
            hqBody = `Rejestr próby egzaminacyjnej.\n` +
                     `Doradca: ${result.userName}\n` +
                     `Wynik: ${result.score}% (Negatywny)\n` +
                     `Była to próba numer: ${failedCount}.\n` +
                     `Pracownik posiada jeszcze ${3 - failedCount} podejścia przed blokadą systemową.`;
        }

        await sendSingleEmail(hqRecipients, hqSubject, hqBody, 'Centrala (HQ)');
    }

    // Wynik zbiorczy
    const finalMsg = logs.join(' | ');
    return {
      success: !hasError,
      text: hasError ? `Problemy: ${finalMsg}` : `Wysłano: ${finalMsg}`
    };
  }
};
