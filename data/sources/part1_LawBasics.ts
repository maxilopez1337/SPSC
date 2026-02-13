
import { Question, QuestionType, Category } from '../../types';

export const PART_1: Question[] = [
  // --- CZĘŚĆ 1: PODSTAWY PRAWNE I PRZEPISY (pytania.md) ---
  {
    id: 'law-p1-01',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Jaki jest pełny numer Dziennika Ustaw zawierającego aktualny tekst jednolity rozporządzenia MPiPS z 18 grudnia 1998 r.?',
    options: [
      'Dz.U. 2024 poz. 1061',
      'Dz.U. 2025 poz. 163',
      'Dz.U. 2025 poz. 316',
      'Dz.U. 2025 poz. 277'
    ],
    correctAnswer: 'Dz.U. 2025 poz. 316'
  },
  {
    id: 'law-p1-02',
    category: Category.LAW,
    type: QuestionType.MULTI_SELECT,
    text: 'Które z poniższych warunków MUSZĄ być spełnione, aby świadczenie mogło korzystać ze zwolnienia z oskładkowania ZUS zgodnie z §2 pkt 26 rozporządzenia MPiPS?',
    options: [
      'Musi wynikać z regulaminu wynagradzania',
      'Musi być całkowicie bezpłatne dla pracownika',
      'Musi mieć charakter rzeczowy (niematerialny)',
      'Pracownik musi ponieść częściową odpłatność',
      'Musi być finansowane z ZFŚS'
    ],
    correctAnswer: 'Musi wynikać z regulaminu wynagradzania|Musi mieć charakter rzeczowy (niematerialny)|Pracownik musi ponieść częściową odpłatność'
  },
  {
    id: 'law-p1-03',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Zgodnie z art. 11 ust. 2a pkt 2 ustawy o PIT, jak obliczany jest przychód pracownika w przypadku świadczenia częściowo odpłatnego?',
    options: [
      'Przychód = wartość rynkowa świadczenia',
      'Przychód = wartość rynkowa - odpłatność pracownika',
      'Przychód = odpłatność pracownika',
      'Przychód = 50% wartości rynkowej świadczenia'
    ],
    correctAnswer: 'Przychód = wartość rynkowa - odpłatność pracownika'
  },
  {
    id: 'prod-p1-04',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.TRUE_FALSE,
    text: 'Voucher Cyfrowy Stratton Prime jest walutą wirtualną podlegającą nadzorowi KNF i wymaga rejestracji w rejestrze AML.',
    options: ['Prawda', 'Fałsz'],
    correctAnswer: 'Fałsz'
  },
  // Pytanie 5 (KC Voucher) - USUNIĘTE
  {
    id: 'law-p1-06',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Który wyrok sądowy potwierdza legalność cyfrowych świadczeń częściowo odpłatnych w modelu Eliton Prime™?',
    options: [
      'Wyrok SN z 23.10.2008, II PK 74/08',
      'Wyrok SA w Warszawie III AUa 1247/24 z 19.02.2025',
      'Wyrok NSA z 15.03.2024',
      'Wyrok TK z 10.01.2025'
    ],
    correctAnswer: 'Wyrok SA w Warszawie III AUa 1247/24 z 19.02.2025'
  },
  {
    id: 'law-p1-07',
    category: Category.LAW,
    type: QuestionType.MULTI_SELECT,
    text: 'Które z poniższych aktów prawnych stanowią podstawę działania modelu Eliton Prime™?',
    options: [
      '§2 pkt 26 Rozporządzenia MPiPS z 1998 r.',
      'Art. 11 i 12 ustawy o PIT',
      'Art. 77² Kodeksu pracy',
      'Art. 921¹⁵ Kodeksu cywilnego',
      'Ustawa o ZFŚS z 1994 r.'
    ],
    correctAnswer: '§2 pkt 26 Rozporządzenia MPiPS z 1998 r.|Art. 11 i 12 ustawy o PIT|Art. 77² Kodeksu pracy|Art. 921¹⁵ Kodeksu cywilnego'
  },
  {
    id: 'law-p1-08',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Zgodnie z art. 42 Kodeksu pracy, co jest wymagane przy zmianie warunków wynagrodzenia pracownika na model Eliton Prime™?',
    options: [
      'Tylko ustne poinformowanie pracownika',
      'Pisemne porozumienie z pracownikiem lub wypowiedzenie zmieniające',
      'Zgoda związków zawodowych',
      'Decyzja zarządu firmy'
    ],
    correctAnswer: 'Pisemne porozumienie z pracownikiem lub wypowiedzenie zmieniające'
  },
  {
    id: 'law-p1-09',
    category: Category.LAW,
    type: QuestionType.TRUE_FALSE,
    text: 'Świadczenia cyfrowe w modelu Eliton Prime™ MUSZĄ być finansowane z Zakładowego Funduszu Świadczeń Socjalnych (ZFŚS).',
    options: ['Prawda', 'Fałsz'],
    correctAnswer: 'Fałsz'
  },
  // Pytanie 10 (Ile lat funkcjonuje) - USUNIĘTE

  // --- CZĘŚĆ 2: STRUKTURA PRODUKTU I WARIANTY ---
  // Pytanie 11 (Standard vs Plus) - USUNIĘTE
  // Pytanie 12 (Ważność oferty) - USUNIĘTE
  // Pytanie 13 (Success Fee) - USUNIĘTE
  // Pytanie 15 (Bonus HR) - USUNIĘTE

  // --- CZĘŚĆ 3: VOUCHER CYFROWY I TECHNOLOGIA ---
  {
    id: 'prod-p1-21',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Jaka jest stała wartość jednego Vouchera Cyfrowego w modelu Eliton Prime™?',
    options: [
      '1 Voucher = 0,8828 USD',
      '1 Voucher = 1 PLN',
      '1 Voucher = 2 PLN',
      'Wartość jest zmienna'
    ],
    correctAnswer: '1 Voucher = 1 PLN'
  },
  // Pytanie 22 (Ile dni na decyzję) - USUNIĘTE

  // --- CZĘŚĆ 4: ROZLICZENIA I DOKUMENTACJA ---
  // Pytanie 33 (PIT) - USUNIĘTE
  // Pytanie 37 (Kary) - USUNIĘTE
  // Pytanie 38 (Wypowiedzenie) - USUNIĘTE

  // --- CZĘŚĆ 5: WDROŻENIE I PROCES SPRZEDAŻY ---
  // Pytanie 41 (Ile spotkań) - USUNIĘTE
  {
    id: 'prod-p1-42',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTI_SELECT,
    text: 'Jakie są kluczowe etapy wdrożenia modelu Eliton Prime™?',
    options: [
      'Analiza danych finansowych',
      'Projekt indywidualnego modelu z kalkulacją oszczędności',
      'Aktualizacja regulaminu wynagradzania',
      'Wdrożenie oraz monitoring działania modelu',
      'Rejestracja w KNF'
    ],
    correctAnswer: 'Analiza danych finansowych|Projekt indywidualnego modelu z kalkulacją oszczędności|Aktualizacja regulaminu wynagradzania|Wdrożenie oraz monitoring działania modelu'
  },
  {
    id: 'prod-p1-49',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W przypadku pracownika zatrudnionego na UoP z wynagrodzeniem 5000 zł netto, jaka jest całkowita wygenerowana miesięczna oszczędność w modelu Eliton Prime™?',
    options: [
      '500 zł',
      '650 zł',
      '867,79 zł',
      '1000 zł'
    ],
    correctAnswer: '867,79 zł'
  },

  // --- CZĘŚĆ 6: SYMULACJE ROZMÓW HANDLOWYCH ---
  // (Pytania sim-01, sim-03, sim-05, sim-07, sim-08, sim-09, sim-10 zostały USUNIĘTE)

  // --- CZĘŚĆ 7: TRUDNE PRZYPADKI I NIUANSE PRAWNE ---
  // (Pytania hard-01, hard-02, hard-06, hard-07, hard-09 zostały USUNIĘTE)

  {
    id: 'hard-def-01',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Jaka jest PEŁNA i PRECYZYJNA podstawa prawna zwolnienia z oskładkowania ZUS w modelu Eliton Prime™?',
    options: [
      '§2 ust. 1 pkt 26 Rozporządzenia Ministra Pracy i Polityki Socjalnej z dnia 18 grudnia 1998 r. o szczegółowych zasadach ustalania podstawy wymiaru składek na ubezpieczenia emerytalne i rentowe, w brzmieniu obwieszczenia Dz.U. 2025 poz. 316 z dnia 13 marca 2025 r.',
      '§2 ust. 1 pkt 26 Rozporządzenia Ministra Pracy i Polityki Socjalnej z dnia 18 grudnia 1998 r. o szczegółowych zasadach ustalania podstawy wymiaru składek na ubezpieczenia społeczne, w brzmieniu Dz.U. 2023 poz. 1665',
      '§2 pkt 26 Rozporządzenia MPiPS z 1998 r. o podstawie wymiaru składek ZUS, tekst jednolity Dz.U. 2025 poz. 316',
      '§2 ust. 1 pkt 26 Rozporządzenia Ministra Pracy i Polityki Socjalnej z dnia 18 grudnia 1998 r. w sprawie szczegółowych zasad ustalania podstawy wymiaru składek, Dz.U. 2025 poz. 316'
    ],
    correctAnswer: '§2 ust. 1 pkt 26 Rozporządzenia Ministra Pracy i Polityki Socjalnej z dnia 18 grudnia 1998 r. o szczegółowych zasadach ustalania podstawy wymiaru składek na ubezpieczenia emerytalne i rentowe, w brzmieniu obwieszczenia Dz.U. 2025 poz. 316 z dnia 13 marca 2025 r.'
  },
  {
    id: 'hard-def-02',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Pracownik otrzymał Voucher o wartości rynkowej 1500 zł i wniósł odpłatność 1 zł. Jak PRECYZYJNIE należy określić przychód pracownika zgodnie z art. 11 ust. 2a pkt 2 ustawy o PIT?',
    options: [
      'Przychód pracownika wynosi 1499 zł jako różnica między wartością rynkową świadczenia (1500 zł) a odpłatnością ponoszoną przez podatnika (1 zł), co stanowi przychód ze stosunku pracy podlegający opodatkowaniu PIT, ale zwolniony z oskładkowania ZUS na podstawie §2 pkt 26 rozporządzenia MPiPS',
      'Przychód pracownika wynosi 1499 zł obliczony jako wartość otrzymanego świadczenia pomniejszona o kwotę uiszczoną przez pracownika, stanowiący przychód do opodatkowania zgodnie z art. 12 ust. 1 ustawy o PIT, nieoskładkowany w ZUS',
      'Przychód pracownika to 1499 zł wynikający z art. 11 ust. 2a pkt 2 ustawy o PIT jako różnica wartości, który jest opodatkowany według skali podatkowej i nie podlega składkom społecznym',
      'Przychód wynosi 1499 zł zgodnie z definicją świadczenia częściowo odpłatnego, obliczany jako wartość rynkowa minus odpłatność, stanowiący przychód ze źródła określonego w art. 12 ustawy o PIT'
    ],
    correctAnswer: 'Przychód pracownika wynosi 1499 zł jako różnica między wartością rynkową świadczenia (1500 zł) a odpłatnością ponoszoną przez podatnika (1 zł), co stanowi przychód ze stosunku pracy podlegający opodatkowaniu PIT, ale zwolniony z oskładkowania ZUS na podstawie §2 pkt 26 rozporządzenia MPiPS'
  },
  {
    id: 'hard-def-04',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Które stwierdzenie NAJPRECYZYJNIEJ określa kumulatywne warunki zwolnienia świadczenia z oskładkowania ZUS zgodnie z §2 pkt 26 rozporządzenia MPiPS?',
    options: [
      'Świadczenie jest zwolnione z podstawy wymiaru składek ZUS, jeżeli kumulatywnie spełnia cztery warunki: (1) wynika z regulaminu wynagradzania, układu zbiorowego pracy lub przepisów o wynagradzaniu; (2) ma charakter rzeczowy niematerialny, a nie pieniężny; (3) pracownik ponosi częściową odpłatność w dowolnej wysokości powyżej zera; (4) różnica między wartością rynkową świadczenia a odpłatnością pracownika stanowi korzyść materialną w rozumieniu przepisu',
      'Aby świadczenie było wyłączone ze składek ZUS muszą być spełnione warunki: jest zapisane w regulaminie płac, nie jest wypłatą gotówkową, pracownik płaci symboliczną kwotę, a różnica wartości nie podlega oskładkowaniu',
      'Zwolnienie z ZUS wymaga: podstawy w dokumentach płacowych firmy, formy rzeczowej lub niematerialnej, minimalnej odpłatności pracownika oraz różnicy wartości stanowiącej świadczenie pozapłacowe',
      'Warunki zwolnienia to: zapis w regulaminie wynagradzania lub układzie zbiorowym, charakter niepieniężny świadczenia, częściowa odpłatność przez pracownika minimum 1 zł, różnica wartości zwolniona z podstawy składek'
    ],
    correctAnswer: 'Świadczenie jest zwolnione z podstawy wymiaru składek ZUS, jeżeli kumulatywnie spełnia cztery warunki: (1) wynika z regulaminu wynagradzania, układu zbiorowego pracy lub przepisów o wynagradzaniu; (2) ma charakter rzeczowy niematerialny, a nie pieniężny; (3) pracownik ponosi częściową odpłatność w dowolnej wysokości powyżej zera; (4) różnica między wartością rynkową świadczenia a odpłatnością pracownika stanowi korzyść materialną w rozumieniu przepisu'
  },
  {
    id: 'hard-def-06',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Jak NAJPRECYZYJNIEJ należy opisać dwuskładnikową strukturę wynagrodzenia w modelu Eliton Prime™ dla pracownika z wynagrodzeniem netto 5000 zł?',
    options: [
      'Wynagrodzenie składa się z: (1) wynagrodzenia zasadniczego 3605,58 zł netto stanowiącego część pieniężną oskładkowaną ZUS według pełnych stawek, wypłacaną przelewem bankowym; (2) świadczenia rzeczowego w formie cyfrowej 1394,42 zł netto stanowiącego pozostały przychód zgodnie z §2 ust.1 pkt 26 rozporządzenia MPiPS, za które pracownik wnosi odpłatność 1 zł; łączne wynagrodzenie netto pracownika wynosi 5000 zł przy podstawie ZUS 4805,64 zł i całkowitym koszcie pracodawcy 7374,26 zł',
      'Pracownik otrzymuje 3605,58 zł jako pensję podstawową oraz 1394,42 zł jako Voucher cyfrowy, za który płaci 1 zł, co daje łącznie 5000 zł netto przy niższej podstawie ZUS',
      'Wynagrodzenie dzieli się na część gotówkową (3605,58 zł) i część Voucherową (1394,42 zł) z odpłatnością 1 zł, suma netto to 5000 zł, koszt firmy 7374,26 zł',
      'Struktura: wynagrodzenie pieniężne oskładkowane 3605,58 zł plus świadczenie cyfrowe zwolnione z ZUS 1394,42 zł (odpłatność pracownika 1 zł), razem 5000 zł netto, podstawa składek 4805,64 zł'
    ],
    correctAnswer: 'Wynagrodzenie składa się z: (1) wynagrodzenia zasadniczego 3605,58 zł netto stanowiącego część pieniężną oskładkowaną ZUS według pełnych stawek, wypłacaną przelewem bankowym; (2) świadczenia rzeczowego w formie cyfrowej 1394,42 zł netto stanowiącego pozostały przychód zgodnie z §2 ust.1 pkt 26 rozporządzenia MPiPS, za które pracownik wnosi odpłatność 1 zł; łączne wynagrodzenie netto pracownika wynosi 5000 zł przy podstawie ZUS 4805,64 zł i całkowitym koszcie pracodawcy 7374,26 zł'
  }
];
