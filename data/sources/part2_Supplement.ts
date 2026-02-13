
import { Question, QuestionType, Category } from '../../types';

export const PART_2: Question[] = [
  // --- CZĘŚĆ 8: ZESTAW UZUPEŁNIAJĄCY (pytania2.md) ---
  {
    id: 'q-p2-1',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Która podstawa prawna stanowi bezpośredni fundament wyłączenia świadczenia cyfrowego z oskładkowania ZUS w modelu Eliton Prime™?',
    options: [
      '§2 pkt 26 Rozporządzenia MPiPS z 18 grudnia 1998 r. w zw. z art. 11–12 ustawy o PIT',
      'Art. 921¹⁵ Kodeksu cywilnego w zw. z art. 11–12 ustawy o PIT',
      '§2 pkt 26 Rozporządzenia MPiPS z 1998 r. w zw. z ustawą o systemie ubezpieczeń społecznych',
      'Art. 11 ustawy o PIT w zw. z interpretacjami ZUS dotyczącymi benefitów pracowniczych'
    ],
    correctAnswer: '§2 pkt 26 Rozporządzenia MPiPS z 18 grudnia 1998 r. w zw. z art. 11–12 ustawy o PIT'
  },
  {
    id: 'q-p2-2',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Warunkiem zastosowania zwolnienia z oskładkowania świadczenia rzeczowego w modelu Eliton Prime™ jest:',
    options: [
      'całkowite sfinansowanie świadczenia przez pracodawcę',
      'częściowa odpłatność pracownika, nawet symboliczna',
      'dobrowolna rezygnacja pracownika z części wynagrodzenia brutto',
      'wypłata świadczenia w formie pieniężnej przed jego realizacją'
    ],
    correctAnswer: 'częściowa odpłatność pracownika, nawet symboliczna'
  },
  // Pytanie 8 (Brakujące dane) - USUNIĘTE
  // Pytanie 10 (PIT vs ZUS) - USUNIĘTE
  // Pytanie 12 (Benefity vs Eliton) - USUNIĘTE
  
  {
    id: 'q-p2-15',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Wdrożenie modelu Eliton Prime™ obejmuje kolejno:',
    options: [
      'analizę danych, wdrożenie, aktualizację regulaminu, monitoring',
      'projekt modelu, analizę finansową, dokumentację, monitoring',
      'analizę danych, projekt modelu, dokumentację, wdrożenie i monitoring',
      'dokumentację, analizę finansową, wdrożenie, audyt powdrożeniowy'
    ],
    correctAnswer: 'analizę danych, projekt modelu, dokumentację, wdrożenie i monitoring'
  },
  // Pytanie 16 (Warunek częściowej odpłatności) - USUNIĘTE
  // Pytanie 17 (Finansowanie przez pracodawcę) - USUNIĘTE

  {
    id: 'q-p2-18',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W kontekście art. 921¹⁵ KC voucher w modelu należy rozumieć jako:',
    options: [
      'dokument potwierdzający wierzytelność pieniężną wobec emitenta',
      'znak legitymacyjny uprawniający do realizacji określonego świadczenia',
      'instrument finansowy o ograniczonej zbywalności',
      'elektroniczny środek przechowywania wartości pieniężnej'
    ],
    correctAnswer: 'znak legitymacyjny uprawniający do realizacji określonego świadczenia'
  },
  {
    id: 'q-p2-19',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Najczęstszy błąd koncepcyjny przy interpretacji modelu dotyczy założenia, że:',
    options: [
      'świadczenie nie stanowi przychodu podatkowego',
      'świadczenie jest w pełni finansowane przez pracownika',
      'świadczenie ma charakter pieniężny',
      'świadczenie podlega wyłącznie regulaminowi benefitowemu'
    ],
    correctAnswer: 'świadczenie ma charakter pieniężny'
  },
  {
    id: 'q-p2-25',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Dokumentacja wdrożeniowa w modelu ma znaczenie przede wszystkim dla:',
    options: [
      'spełnienia wymogów formalnych w relacji z ZUS',
      'zwiększenia atrakcyjności marketingowej rozwiązania',
      'uproszczenia księgowania świadczeń',
      'ograniczenia liczby aneksów do umów o pracę'
    ],
    correctAnswer: 'spełnienia wymogów formalnych w relacji z ZUS'
  },
  // Pytanie 26 (Kolejność działań) - USUNIĘTE

  {
    id: 'q-p2-31',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Które stwierdzenie jest NIEZGODNE z konstrukcją Eliton Prime™?',
    options: [
      'Świadczenie stanowi przychód do opodatkowania PIT.',
      'Świadczenie może zostać wyłączone z podstawy składek ZUS przy spełnieniu warunków.',
      'Świadczenie ma charakter rzeczowy, a nie pieniężny.',
      'Świadczenie nie stanowi przychodu podatkowego pracownika.'
    ],
    correctAnswer: 'Świadczenie nie stanowi przychodu podatkowego pracownika.'
  },
  {
    id: 'q-p2-32',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Która sytuacja uniemożliwia zastosowanie wyłączenia z oskładkowania?',
    options: [
      'Wprowadzenie świadczenia do regulaminu wynagradzania.',
      'Zapewnienie częściowej odpłatności pracownika.',
      'Całkowite sfinansowanie świadczenia przez pracodawcę.',
      'Ujęcie świadczenia w dokumentacji wdrożeniowej.'
    ],
    correctAnswer: 'Całkowite sfinansowanie świadczenia przez pracodawcę.'
  },
  {
    id: 'q-p2-33',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Które stwierdzenie NIE opisuje prawidłowo charakteru vouchera?',
    options: [
      'Uprawnia do realizacji określonego świadczenia w zamkniętym katalogu.',
      'Stanowi znak legitymacyjny w rozumieniu Kodeksu cywilnego.',
      'Jest środkiem pieniężnym podlegającym regulacjom prawa bankowego.',
      'Nie jest elektronicznym pieniądzem w rozumieniu przepisów finansowych.'
    ],
    correctAnswer: 'Jest środkiem pieniężnym podlegającym regulacjom prawa bankowego.'
  },
  {
    id: 'q-p2-35',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Które twierdzenie błędnie opisuje źródło oszczędności pracodawcy?',
    options: [
      'Wynika ze zmniejszenia podstawy wymiaru składek ZUS.',
      'Wynika z przesunięcia części wynagrodzenia do świadczenia rzeczowego.',
      'Wynika z wyłączenia świadczenia z podstawy składek przy spełnieniu warunków.',
      'Wynika z całkowitego zwolnienia świadczenia z opodatkowania PIT.'
    ],
    correctAnswer: 'Wynika z całkowitego zwolnienia świadczenia z opodatkowania PIT.'
  },
  {
    id: 'q-p2-42',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Które założenie jest NIEZGODNE z logiką modelu?',
    options: [
      'Świadczenie wymaga odpowiedniego ujęcia w regulaminie.',
      'Świadczenie funkcjonuje niezależnie od dokumentacji formalnej.',
      'Świadczenie ma charakter rzeczowy.',
      'Świadczenie wymaga spełnienia warunków formalnych.'
    ],
    correctAnswer: 'Świadczenie funkcjonuje niezależnie od dokumentacji formalnej.'
  },
  {
    id: 'q-p2-44',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Które stwierdzenie jest sprzeczne z konstrukcją prawną modelu?',
    options: [
      'Wyłączenie z ZUS wynika z określonych przepisów rozporządzenia.',
      'Voucher jest traktowany jako pieniądz elektroniczny.',
      'Warunkiem jest częściowa odpłatność pracownika.',
      'Świadczenie jest przychodem do PIT.'
    ],
    correctAnswer: 'Voucher jest traktowany jako pieniądz elektroniczny.'
  },
  {
    id: 'q-p2-45',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Które założenie błędnie opisuje relację między PIT a ZUS w modelu?',
    options: [
      'Świadczenie stanowi przychód do PIT.',
      'Świadczenie może zostać wyłączone z podstawy składek ZUS.',
      'Wyłączenie z ZUS oznacza automatyczne zwolnienie z PIT.',
      'PIT i ZUS podlegają odrębnej kwalifikacji prawnej.'
    ],
    correctAnswer: 'Wyłączenie z ZUS oznacza automatyczne zwolnienie z PIT.'
  },
  {
    id: 'q-p2-47',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Warunek częściowej odpłatności pracownika ma znaczenie prawne, ponieważ:',
    options: [
      'umożliwia uznanie świadczenia za element wynagrodzenia zasadniczego',
      'spełnia przesłankę przewidzianą w rozporządzeniu dotyczącą świadczeń rzeczowych',
      'eliminuje obowiązek wykazania świadczenia w przychodzie podatkowym',
      'powoduje zmianę charakteru świadczenia z pieniężnego na mieszany'
    ],
    correctAnswer: 'spełnia przesłankę przewidzianą w rozporządzeniu dotyczącą świadczeń rzeczowych'
  },
  {
    id: 'q-p2-76',
    category: Category.LAW,
    type: QuestionType.MULTI_SELECT,
    text: 'Które elementy są warunkiem prawidłowego zastosowania wyłączenia z podstawy składek ZUS?',
    options: [
      'Częściowa odpłatność pracownika',
      'Ujęcie świadczenia w regulaminie wynagradzania',
      'Całkowite finansowanie świadczenia przez pracodawcę',
      'Charakter rzeczowy świadczenia'
    ],
    correctAnswer: 'Częściowa odpłatność pracownika|Ujęcie świadczenia w regulaminie wynagradzania|Charakter rzeczowy świadczenia'
  },
  {
    id: 'q-p2-77',
    category: Category.LAW,
    type: QuestionType.MULTI_SELECT,
    text: 'Które cechy prawidłowo opisują voucher w modelu?',
    options: [
      'Stanowi znak legitymacyjny',
      'Jest pieniądzem elektronicznym',
      'Uprawnia do realizacji określonego świadczenia',
      'Funkcjonuje w zamkniętym katalogu usług'
    ],
    correctAnswer: 'Stanowi znak legitymacyjny|Uprawnia do realizacji określonego świadczenia|Funkcjonuje w zamkniętym katalogu usług'
  },
  {
    id: 'q-p2-91',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTI_SELECT,
    text: 'Których określeń nie należy używać przy opisywaniu świadczenia?',
    options: [
      '„pieniądz elektroniczny”',
      '„świadczenie rzeczowe”',
      '„wypłata gotówki”',
      '„znak legitymacyjny”'
    ],
    correctAnswer: '„pieniądz elektroniczny”|„wypłata gotówki”'
  },
  {
    id: 'q-p2-92',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTI_SELECT,
    text: 'Których sformułowań należy unikać w rozmowie z klientem?',
    options: [
      '„pełne zwolnienie z podatku”',
      '„wyłączenie z podstawy składek przy spełnieniu warunków”',
      '„optymalizacja podatkowa”',
      '„konstrukcja oparta na przepisach”'
    ],
    correctAnswer: '„pełne zwolnienie z podatku”|„optymalizacja podatkowa”'
  },
  {
    id: 'q-p2-94',
    category: Category.LAW,
    type: QuestionType.MULTI_SELECT,
    text: 'Których określeń nie należy używać przy opisie vouchera?',
    options: [
      '„kryptowaluta”',
      '„instrument finansowy”',
      '„znak legitymacyjny”',
      '„środek płatniczy”'
    ],
    correctAnswer: '„kryptowaluta”|„instrument finansowy”|„środek płatniczy”'
  },
  {
    id: 'q-p2-97',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTI_SELECT,
    text: 'Które określenia są nieprawidłowe przy opisie charakteru świadczenia?',
    options: [
      '„premia pieniężna”',
      '„świadczenie niepieniężne”',
      '„element wynagrodzenia zasadniczego”',
      '„świadczenie rzeczowe”'
    ],
    correctAnswer: '„premia pieniężna”|„element wynagrodzenia zasadniczego”'
  },
  {
    id: 'q-p2-100',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTI_SELECT,
    text: 'Których słów należy unikać przy rozmowie o bezpieczeństwie modelu?',
    options: [
      '„obejście przepisów”',
      '„konstrukcja zgodna z przepisami”',
      '„optymalizacja na granicy prawa”',
      '„systemowa kwalifikacja prawna”'
    ],
    correctAnswer: '„obejście przepisów”|„optymalizacja na granicy prawa”'
  },
  {
    id: 'q-p2-101',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Którego sformułowania nie należy używać przy opisie świadczenia?',
    options: [
      '„świadczenie rzeczowe realizowane cyfrowo”',
      '„świadczenie niepieniężne realizowane cyfrowo”',
      '„świadczenie pieniężne realizowane cyfrowo”',
      '„świadczenie rzeczowe realizowane w systemie”'
    ],
    correctAnswer: '„świadczenie pieniężne realizowane cyfrowo”'
  },
  {
    id: 'q-p2-111',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Spółka zatrudniająca 120 pracowników planuje wdrożenie Eliton Prime™. Zarząd oczekuje zmniejszenia kosztów zatrudnienia, ale jednocześnie nie chce narażać się na ryzyko zakwestionowania konstrukcji przez ZUS. Które działanie jest kluczowe dla zachowania bezpieczeństwa składkowego modelu?',
    options: [
      'Wprowadzenie świadczenia jako dodatkowej premii kwartalnej finansowanej w całości przez pracodawcę, przy jednoczesnym zachowaniu dotychczasowego regulaminu wynagradzania.',
      'Ujęcie świadczenia w regulaminie wynagradzania jako świadczenia rzeczowego z częściową odpłatnością pracownika oraz zachowanie jego niepieniężnego charakteru.',
      'Wypłata równowartości vouchera w gotówce przy jednoczesnym opisaniu jej jako świadczenia cyfrowego w dokumentacji wewnętrznej.',
      'Wprowadzenie świadczenia jako dodatku uznaniowego przy zachowaniu pełnej swobody jego wykorzystania przez pracownika.'
    ],
    correctAnswer: 'Ujęcie świadczenia w regulaminie wynagradzania jako świadczenia rzeczowego z częściową odpłatnością pracownika oraz zachowanie jego niepieniężnego charakteru.'
  },
  {
    id: 'q-p2-112',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Podczas prezentacji klient stwierdza, że skoro świadczenie jest wyłączone z podstawy składek ZUS, to nie powinno podlegać również opodatkowaniu PIT. Która odpowiedź jest najbardziej precyzyjna z punktu widzenia konstrukcji prawnej modelu?',
    options: [
      'Wyłączenie z ZUS powoduje automatyczne wyłączenie z PIT, ponieważ oba obciążenia dotyczą tego samego świadczenia.',
      'Świadczenie nie podlega PIT, ponieważ ma charakter rzeczowy.',
      'Kwalifikacja podatkowa i składkowa są odrębne, dlatego świadczenie może stanowić przychód do PIT przy jednoczesnym wyłączeniu z podstawy składek.',
      'Brak składek oznacza brak przychodu podatkowego, jeśli świadczenie realizowane jest cyfrowo.'
    ],
    correctAnswer: 'Kwalifikacja podatkowa i składkowa są odrębne, dlatego świadczenie może stanowić przychód do PIT przy jednoczesnym wyłączeniu z podstawy składek.'
  },
  {
    id: 'q-p2-113',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Klient proponuje, aby zrezygnować z częściowej odpłatności pracownika i sfinansować świadczenie w 100% z budżetu firmy, argumentując, że uprości to komunikację. Jakie byłoby najbardziej prawdopodobne ryzyko takiej zmiany?',
    options: [
      'Utrata kwalifikacji świadczenia jako przychodu podatkowego.',
      'Utrata przesłanki umożliwiającej wyłączenie świadczenia z podstawy wymiaru składek ZUS.',
      'Konieczność zmiany podstawy opodatkowania podatkiem dochodowym.',
      'Automatyczna zmiana kwalifikacji vouchera na instrument finansowy.'
    ],
    correctAnswer: 'Utrata przesłanki umożliwiającej wyłączenie świadczenia z podstawy wymiaru składek ZUS.'
  },
  {
    id: 'q-p2-114',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W trakcie audytu wewnętrznego pojawia się pytanie o charakter prawny vouchera. Które określenie jest najbardziej zgodne z konstrukcją modelu?',
    options: [
      'Voucher stanowi pieniądz elektroniczny funkcjonujący w systemie zamkniętym.',
      'Voucher jest środkiem płatniczym o ograniczonej akceptowalności.',
      'Voucher stanowi znak legitymacyjny uprawniający do realizacji określonego świadczenia.',
      'Voucher jest cyfrową formą premii pieniężnej.'
    ],
    correctAnswer: 'Voucher stanowi znak legitymacyjny uprawniający do realizacji określonego świadczenia.'
  },
  {
    id: 'q-p2-121',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Spółka produkcyjna zatrudniająca 300 pracowników chce wdrożyć model w sposób „maksymalnie uproszczony”, bez zmian w dokumentacji wewnętrznej, argumentując, że „wystarczy zmiana techniczna w systemie kadrowo-płacowym”. Jakie stanowisko jest najbardziej prawidłowe?',
    options: [
      'Wystarczająca jest zmiana techniczna w systemie płacowym, jeżeli świadczenie ma charakter cyfrowy.',
      'Kluczowe jest formalne ujęcie świadczenia w regulaminie wynagradzania oraz zachowanie przesłanek konstrukcyjnych, niezależnie od zmian technicznych.',
      'Wystarczy podpisanie oświadczenia przez pracowników o akceptacji świadczenia.',
      'Dokumentacja nie ma znaczenia, jeżeli pracownik ponosi częściową odpłatność.'
    ],
    correctAnswer: 'Kluczowe jest formalne ujęcie świadczenia w regulaminie wynagradzania oraz zachowanie przesłanek konstrukcyjnych, niezależnie od zmian technicznych.'
  },
  {
    id: 'q-p2-122',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'CFO klienta twierdzi, że skoro voucher nie jest gotówką, to nie powinien być wykazywany jako przychód pracownika. Która odpowiedź jest najbardziej precyzyjna?',
    options: [
      'Brak formy gotówkowej wyklucza powstanie przychodu podatkowego.',
      'Każde świadczenie cyfrowe jest neutralne podatkowo.',
      'Świadczenie stanowi przychód podatkowy niezależnie od formy, jeżeli spełnia definicję przysporzenia majątkowego.',
      'Przychód powstaje wyłącznie w przypadku świadczeń pieniężnych.'
    ],
    correctAnswer: 'Świadczenie stanowi przychód podatkowy niezależnie od formy, jeżeli spełnia definicję przysporzenia majątkowego.'
  },
];
