
import { Question, QuestionType, Category } from '../../types';

export const PART_3: Question[] = [
  // --- CZĘŚĆ 9: ZESTAW Z PLIKU PYTANIA3.MD (Nowe) ---
  {
    id: 'q3-01',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Jakie warunki muszą zostać kumulatywnie spełnione, aby świadczenie cyfrowe w modelu Eliton Prime™ skutecznie korzystało ze zwolnienia z podstawy wymiaru składek ZUS?',
    options: [
      'Świadczenie musi wynikać wprost z regulaminu wynagradzania (lub układu zbiorowego), mieć charakter rzeczowy/niematerialny (niepieniężny) oraz bezwzględnie wiązać się z częściową odpłatnością po stronie pracownika.',
      'Świadczenie musi mieć charakter niematerialny i zostać w 100% sfinansowane przez pracodawcę w ramach rocznego, udokumentowanego budżetu benefitowego.',
      'Świadczenie musi być finansowane w całości z Zakładowego Funduszu Świadczeń Socjalnych (ZFŚS) oraz udostępniane wszystkim pracownikom na równych zasadach ustalonego progu dochodowego.',
      'Wymagane jest zawarcie indywidualnych aneksów z pracownikami oraz zgłoszenie faktu wdrożenia platformy cyfrowej do właściwego oddziału ZUS w terminie 7 dni od uruchomienia.'
    ],
    correctAnswer: 'Świadczenie musi wynikać wprost z regulaminu wynagradzania (lub układu zbiorowego), mieć charakter rzeczowy/niematerialny (niepieniężny) oraz bezwzględnie wiązać się z częściową odpłatnością po stronie pracownika.'
  },
  {
    id: 'q3-02',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Klient (Dyrektor Finansowy) wyraża obawę: "Co w przypadku audytu ZUS? Czy organ nie zakwestionuje tego modelu jako próby agresywnej optymalizacji i obejścia przepisów o ubezpieczeniach społecznych?" Jak brzmi najbardziej merytoryczna odpowiedź doradcy?',
    options: [
      '"Konstrukcja opiera się na stabilnym przepisie – §2 pkt 26 rozporządzenia MPiPS z 1998 r. Legalność modelu świadczeń częściowo odpłatnych w tej formie potwierdza wyrok SA w Warszawie (III AUa 1247/24 z 2025 r.) oraz opinie biegłych sądowych. Dodatkowo gwarantujemy pełną zgodność dokumentacji i wsparcie eksperckie przy audytach."',
      '"Aby zminimalizować to ryzyko, rekomendujemy księgowanie tych świadczeń jako kosztów reprezentacji i reklamy, co skutecznie przenosi ciężar ewentualnej kontroli na Urząd Skarbowy, z pominięciem ZUS."',
      '"Nie ma powodów do obaw, ponieważ świadczenia cyfrowe podlegają wyłączeniu spod jurysdykcji ZUS na mocy znowelizowanych dyrektyw unijnych o cyfryzacji wynagrodzeń, co daje nam pełny immunitet."',
      '"ZUS skupia się obecnie niemal wyłącznie na dużych podmiotach zatrudniających powyżej 500 pracowników, w związku z czym w Państwa skali ryzyko wszczęcia postępowania kontrolnego jest statystycznie pomijalne."'
    ],
    correctAnswer: '"Konstrukcja opiera się na stabilnym przepisie – §2 pkt 26 rozporządzenia MPiPS z 1998 r. Legalność modelu świadczeń częściowo odpłatnych w tej formie potwierdza wyrok SA w Warszawie (III AUa 1247/24 z 2025 r.) oraz opinie biegłych sądowych. Dodatkowo gwarantujemy pełną zgodność dokumentacji i wsparcie eksperckie przy audytach."'
  },
  {
    id: 'q3-03',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Jakie są precyzyjne konsekwencje podatkowo-składkowe przypisania pracownikowi Vouchera Cyfrowego o wartości rynkowej 1000 zł, za który pracownik wnosi odpłatność w wysokości 1 zł?',
    options: [
      'Powstaje przychód ze stosunku pracy w wysokości 999 zł (jako różnica wartości), który podlega standardowemu opodatkowaniu PIT, ale na mocy przepisów jest w całości wyłączony z podstawy wymiaru składek ZUS.',
      'Całkowita wartość rynkowa (1000 zł) podlega oskładkowaniu ZUS, jednak dzięki wniesionej odpłatności pracownika, kwota ta jest w pełni amortyzowana i wyłączona z opodatkowania podatkiem dochodowym.',
      'Przychód podatkowy w ogóle nie powstaje, ponieważ Voucher Cyfrowy klasyfikowany jest prawnie jako narzędzie pracy hybrydowej, co czyni go całkowicie neutralnym podatkowo i składkowo.',
      'Kwota 999 zł jest wyłączona zarówno z opodatkowania PIT, jak i składek ZUS, pod bezwzględnym warunkiem, że pracownik wykorzysta Voucher na certyfikowane usługi wspierające tzw. "wellbeing".'
    ],
    correctAnswer: 'Powstaje przychód ze stosunku pracy w wysokości 999 zł (jako różnica wartości), który podlega standardowemu opodatkowaniu PIT, ale na mocy przepisów jest w całości wyłączony z podstawy wymiaru składek ZUS.'
  },
  {
    id: 'q3-04',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Główna Księgowa i szefowa HR stanowczo sprzeciwiają się wdrożeniu, argumentując, że dwuskładnikowe wynagrodzenie drastycznie skomplikuje comiesięczny "payroll" i obciąży ich dodatkową pracą. Jakiej argumentacji należy użyć, aby obalić tę obiekcję?',
    options: [
      '"Proces jest w pełni zautomatyzowany przez nasz system EBS. Jedyną czynnością po Państwa stronie jest wyeksportowanie i wgranie listy płac w Excelu. My generujemy pełny zestaw: gotowe raporty do list płac, faktury VAT i noty księgowe. Dodatkowo Państwa dział zyskuje 2% bonusu administracyjnego (Success Fee)."',
      '"W modelu Eliton Prime™ pełną odpowiedzialność karno-skarbową za rozliczenia przejmuje nasza spółka, dzięki czemu Państwa dział księgowości jest formalnie zwolniony z obowiązku księgowania tej części wynagrodzenia."',
      '"Zalecamy podpisanie odrębnych, bezpośrednich umów B2B lub umów o dzieło pomiędzy pracownikami a Stratton Prime na kwotę Vouchera, co omija konieczność procesowania tego przez Państwa system kadrowy."',
      '"Aby odciążyć Państwa zespół, oferujemy darmowe wydelegowanie naszego wewnętrznego doradcy podatkowego na 3 dni w miesiącu do Państwa siedziby, by manualnie księgował wszystkie Vouchery."'
    ],
    correctAnswer: '"Proces jest w pełni zautomatyzowany przez nasz system EBS. Jedyną czynnością po Państwa stronie jest wyeksportowanie i wgranie listy płac w Excelu. My generujemy pełny zestaw: gotowe raporty do list płac, faktury VAT i noty księgowe. Dodatkowo Państwa dział zyskuje 2% bonusu administracyjnego (Success Fee)."'
  },
  {
    id: 'q3-05',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W świetle przepisów Kodeksu cywilnego, w jaki sposób prawidłowo klasyfikowany jest Voucher Cyfrowy w ekosystemie Eliton Prime™, co warunkuje jego skuteczność prawną?',
    options: [
      'Jako znak legitymacyjny (art. 921¹⁵ KC) uprawniający do realizacji określonego świadczenia niepieniężnego, którego wydanie skutkuje przeniesieniem praw na pracownika.',
      'Jako pełnoprawny pieniądz elektroniczny funkcjonujący w zamkniętym systemie rozliczeniowym, emitowany na podstawie licencji KNF.',
      'Jako zdematerializowany papier wartościowy na okaziciela, którego obrót i zbycie wymagają zastosowania technologii blockchain.',
      'Jako kryptowaluta użytkowa (utility token), która umożliwia bezpośrednią wymianę barterową między pracodawcą a pracownikiem w ramach swobody umów.'
    ],
    correctAnswer: 'Jako znak legitymacyjny (art. 921¹⁵ KC) uprawniający do realizacji określonego świadczenia niepieniężnego, którego wydanie skutkuje przeniesieniem praw na pracownika.'
  },
  {
    id: 'q3-06',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Klient (Dyrektor HR) obawia się reakcji załogi: "Zarząd boi się, że pracownicy nie podpiszą aneksów, bo po prostu wolą dostać pełną kwotę w gotówce zamiast części w voucherze. Co jeśli masowo odmówią?" Jak powinna brzmieć najbardziej skuteczna i prawdziwa argumentacja doradcy?',
    options: [
      '"Komunikujemy to jako system, w którym pracownik nigdy nie traci. Wynagrodzenie netto zostaje takie samo (a w wariancie PLUS rośnie o 4%). Jeśli pracownik nie wykorzysta vouchera przez 7 dni, automatycznie aktywuje się procedura rezygnacji i następuje odkup, a środki wracają do pracownika w formie pieniężnej. Ma pełną wolność wyboru, dlatego historyczny wskaźnik akceptacji to >95%."',
      '"Zgodnie z Kodeksem pracy, jeśli odpowiednio zaktualizujemy Regulamin Pracy, aneksowanie staje się czynnością jednostronną ze strony pracodawcy, co prawnie eliminuje ryzyko buntu załogi."',
      '"Dla pracowników odmawiających przyjęcia świadczeń cyfrowych mamy przygotowaną pulę fizycznych kart przedpłaconych, które są zwolnione z obowiązku aneksowania umów i łatwiej przyswajalne przez starszych pracowników."',
      '"Ryzyko jest faktycznie duże, dlatego zalecamy wdrożenie modelu metodą \'cichą\', bez bezpośredniej komunikacji do pracowników, ograniczając się jedynie do odpowiedniego oświadczenia drobnym drukiem na pasku płacowym."'
    ],
    correctAnswer: '"Komunikujemy to jako system, w którym pracownik nigdy nie traci. Wynagrodzenie netto zostaje takie samo (a w wariancie PLUS rośnie o 4%). Jeśli pracownik nie wykorzysta vouchera przez 7 dni, automatycznie aktywuje się procedura rezygnacji i następuje odkup, a środki wracają do pracownika w formie pieniężnej. Ma pełną wolność wyboru, dlatego historyczny wskaźnik akceptacji to >95%."'
  },
  {
    id: 'q3-07',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Prezes Zarządu zauważa: "Konkurencyjna firma oferuje wdrożenie bardzo podobnego mechanizmu za ułamek waszej prowizji (Success Fee). Jak uzasadnicie waszą stawkę i dlaczego mielibyśmy wybrać Eliton Prime™?"',
    options: [
      '"Model Eliton Prime to nie tylko \'pomysł na oszczędność\', ale pełny ekosystem bezpieczeństwa. Posiadamy prawomocny wyrok Sądu Apelacyjnego w Warszawie z 2025 r. potwierdzający naszą matrycę prawną, opinię biegłego, system EBS automatyzujący rozliczenia i pełną gwarancję odkupu voucherów 1:1. Dodatkowo oferujemy 2% bonusu za obsługę dla Państwa działu HR. Wybierając nas, kupują Państwo gwarancję legalności i brak dodatkowej pracy."',
      '"Nasza prowizja jest sztywno regulowana przez Komisję Nadzoru Finansowego (KNF), ponieważ nasze Vouchery są uznawane za kwalifikowane instrumenty finansowe klasy A, czego nie posiada żadna konkurencja."',
      '"Wyższa cena wynika z faktu, że jako jedyny podmiot na rynku przejmujemy na siebie całkowity obowiązek opłacania podatku PIT od świadczeń przyznanych Państwa pracownikom."',
      '"Z uwagi na agresywny charakter optymalizacji, nasza prowizja obejmuje ukrytą polisę korupcyjną na wypadek przegranych sporów sądowych z Zakładem Ubezpieczeń Społecznych."'
    ],
    correctAnswer: '"Model Eliton Prime to nie tylko \'pomysł na oszczędność\', ale pełny ekosystem bezpieczeństwa. Posiadamy prawomocny wyrok Sądu Apelacyjnego w Warszawie z 2025 r. potwierdzający naszą matrycę prawną, opinię biegłego, system EBS automatyzujący rozliczenia i pełną gwarancję odkupu voucherów 1:1. Dodatkowo oferujemy 2% bonusu za obsługę dla Państwa działu HR. Wybierając nas, kupują Państwo gwarancję legalności i brak dodatkowej pracy."'
  },
  {
    id: 'q3-08',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Dyrektor Operacyjny (COO) pyta o zarządzanie ryzykiem: "Co w sytuacji, gdy po kilku miesiącach testów uznamy, że ten ekosystem nam nie odpowiada i będziemy chcieli się wycofać? Jakie są długoterminowe zobowiązania i kary umowne?"',
    options: [
      '"Umowa ramowa jest elastyczna i zawierana na czas nieokreślony z jednomiesięcznym okresem wypowiedzenia. Nie ma żadnych kar umownych. Wszystkie niewykorzystane Vouchery odkupujemy od Państwa w stosunku 1:1, a proces zamyka kompleksowy raport i faktura zamykająca. Rezygnacja jest bezpieczna i bezkosztowa."',
      '"Minimalny okres współpracy to 12 miesięcy lojalki, po których można wypowiedzieć umowę z zachowaniem 3-miesięcznego okresu wypowiedzenia. Wcześniejsze zerwanie kontraktu skutkuje naliczeniem kary w wysokości 10% wygenerowanych dotąd oszczędności."',
      '"Model można wyłączyć z dnia na dzień w systemie EBS, jednak nierozliczone Vouchery ulegają wtedy przepadkowi na rzecz emitenta, co rekompensuje koszty technologiczne wdrożenia."',
      '"Wycofanie się z modelu przed upływem pełnego roku podatkowego nałoży na Państwa obowiązek zwrotu do ZUS-u wszystkich zaoszczędzonych dotychczas składek, dlatego odradzamy krótkoterminowe testy."'
    ],
    correctAnswer: '"Umowa ramowa jest elastyczna i zawierana na czas nieokreślony z jednomiesięcznym okresem wypowiedzenia. Nie ma żadnych kar umownych. Wszystkie niewykorzystane Vouchery odkupujemy od Państwa w stosunku 1:1, a proces zamyka kompleksowy raport i faktura zamykająca. Rezygnacja jest bezpieczna i bezkosztowa."'
  },
  {
    id: 'q3-09',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Jak wygląda poprawna i gwarantująca bezpieczeństwo prawne, chronologiczna ścieżka wdrożenia modelu Eliton Prime™ w strukturach klienta?',
    options: [
      'Analiza danych finansowych (lista płac) ➔ Przygotowanie indywidualnego projektu modelu i kalkulacji ➔ Decyzja klienta i aktualizacja wewnątrzzakładowego Regulaminu Wynagradzania ➔ Wdrożenie operacyjne i bieżący monitoring z systemem EBS.',
      'Wdrożenie techniczne przez API systemu kadrowego ➔ Rozdanie voucherów pracownikom ➔ Dopasowanie analizy finansowej do wygenerowanych kosztów ➔ Ewentualna poprawa dokumentacji po audycie wewnętrznym.',
      'Analiza danych ➔ Złożenie formalnego wniosku do lokalnego oddziału ZUS o wydanie indywidualnej interpretacji ➔ Podpisanie aneksów (przy akceptacji ZUS) ➔ Start systemu voucherowego.',
      'Aktualizacja Regulaminu Wynagradzania ➔ Przejście pracowników na formę samozatrudnienia (B2B) dla celów optymalizacji ➔ Wydanie świadczeń cyfrowych.'
    ],
    correctAnswer: 'Analiza danych finansowych (lista płac) ➔ Przygotowanie indywidualnego projektu modelu i kalkulacji ➔ Decyzja klienta i aktualizacja wewnątrzzakładowego Regulaminu Wynagradzania ➔ Wdrożenie operacyjne i bieżący monitoring z systemem EBS.'
  },
  {
    id: 'q3-10',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Główny Księgowy wysuwa obiekcję: "Rozporządzenie MPiPS dotyczy wyłącznie osób na Umowie o Pracę (UoP). Mamy wielu zleceniobiorców (Umowa Zlecenie), więc u nich ten mechanizm w ogóle nie zadziała." Który z argumentów doradcy merytorycznie obala ten mit?',
    options: [
      '"To powszechny błąd interpretacyjny. Tytuł rozporządzenia MPiPS mówi o zasadach ustalania podstawy składek \'ubezpieczonych\', a nie tylko \'pracowników\'. Opierając się na swobodzie umów (art. 353¹ KC), możemy wdrożyć odpowiedni regulamin świadczeń dla zleceniobiorców. Przy zachowaniu częściowej odpłatności (1 zł), zasada zwolnienia ze składek działa tu identycznie, dając często proporcjonalnie wyższe oszczędności."',
      '"Księgowy ma rację. Przepisy wykluczają umowy zlecenia ze zwolnień ZUS, dlatego proponujemy specjalną hybrydę: rozliczanie Vouchera cyfrowego w ramach 50% Kosztów Uzyskania Przychodu (praw autorskich), aby obejść ten problem."',
      '"Osoby na Umowie Zlecenie siłą rzeczy nie podlegają oskładkowaniu, zatem wdrożenie dla nich Vouchera cyfrowego ma wyłącznie charakter benefitu pozapłacowego, nie generując żadnych ulg podatkowych ani składkowych dla spółki."',
      '"Aby objąć zleceniobiorców naszym ekosystemem, muszą oni zarejestrować jednoosobową działalność gospodarczą. Dopiero relacja B2B pozwala na legalny transfer wartości przez Vouchery bez obciążeń składkowych."'
    ],
    correctAnswer: '"To powszechny błąd interpretacyjny. Tytuł rozporządzenia MPiPS mówi o zasadach ustalania podstawy składek \'ubezpieczonych\', a nie tylko \'pracowników\'. Opierając się na swobodzie umów (art. 353¹ KC), możemy wdrożyć odpowiedni regulamin świadczeń dla zleceniobiorców. Przy zachowaniu częściowej odpłatności (1 zł), zasada zwolnienia ze składek działa tu identycznie, dając często proporcjonalnie wyższe oszczędności."'
  },
  {
    id: 'q3-13',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Prawnik klienta wysuwa zarzut: "Stosunek pracy ma charakter alimentacyjny, co oznacza, że wynagrodzenie musi być wypłacane w pieniądzu. Wasz model łamie tę zasadę poprzez narzucanie świadczeń rzeczowych." Która merytoryczna odpowiedź doradcy definitywnie obala ten argument?',
    options: [
      '"To błędna interpretacja. Zgodnie z art. 77² §2 Kodeksu pracy, pracodawca może w regulaminie wynagradzania ustalić także inne świadczenia związane z pracą. Ustawodawca wprost dopuszcza świadczenia pozapłacowe jako element wynagrodzenia. Co kluczowe, wartość ekonomiczna dla pracownika nie maleje, a jeśli nie chce on Vouchera, korzysta z procedury rezygnacji i otrzymuje równowartość."',
      '"Kodeks Pracy nie ma tutaj zastosowania, ponieważ w momencie przyjęcia Vouchera pracownik zawiera odrębną umowę cywilnoprawną na świadczenie usług teleinformatycznych, która jest nadrzędna wobec stosunku pracy."',
      '"Zasada wypłaty wynagrodzenia wyłącznie w pieniądzu dotyczy tylko płacy minimalnej. Każda złotówka powyżej minimalnej krajowej może być dowolnie wypłacana w akcjach, opcjach lub kryptowalutach na podstawie prawa unijnego."',
      '"Zgadzam się z charakterem alimentacyjnym, dlatego Vouchery Eliton Prime™ są klasyfikowane jako pełnoprawny pieniądz elektroniczny i emitowane pod nadzorem KNF, co czyni je prawnie zrównanymi ze złotówką."'
    ],
    correctAnswer: '"To błędna interpretacja. Zgodnie z art. 77² §2 Kodeksu pracy, pracodawca może w regulaminie wynagradzania ustalić także inne świadczenia związane z pracą. Ustawodawca wprost dopuszcza świadczenia pozapłacowe jako element wynagrodzenia. Co kluczowe, wartość ekonomiczna dla pracownika nie maleje, a jeśli nie chce on Vouchera, korzysta z procedury rezygnacji i otrzymuje równowartość."'
  },
  {
    id: 'q3-14',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Podczas audytu prawnego pada pytanie: "Skoro Voucher jest cyfrowy, jak udowodnicie skuteczne przeniesienie jego własności (posiadania) na pracownika zgodnie z przepisami Kodeksu cywilnego, co warunkuje powstanie przychodu?"',
    options: [
      '"Voucher jest indywidualnie oznaczony i przypisany imiennie do pracownika w systemie EBS. Zgodnie z KC, przeniesienie następuje z chwilą tego przypisania – jest to \'oddanie do dyspozycji\'. Voucher funkcjonuje tu jako znak legitymacyjny (art. 921¹⁵ KC), który przenosi się jak papier wartościowy, przez samo elektroniczne przekazanie."',
      '"Przeniesienie własności następuje dopiero w momencie, gdy pracownik fizycznie wydrukuje Voucher lub wygeneruje z systemu kod QR, co stanowi materialny dowód posiadania dla urzędu skarbowego."',
      '"Vouchery cyfrowe nie podlegają pod Kodeks cywilny, gdyż funkcjonują jako oprogramowanie w modelu SaaS (Software as a Service), co oznacza, że pracownik jedynie je \'dzierżawi\' i nie zachodzi tu przeniesienie własności."',
      '"Aby przenieść własność cyfrową, wymagane jest zintegrowanie systemu z profilem zaufanym ePUAP każdego pracownika, co stanowi twardy dowód w rozumieniu ustawy o usługach zaufania z 2016 roku."'
    ],
    correctAnswer: '"Voucher jest indywidualnie oznaczony i przypisany imiennie do pracownika w systemie EBS. Zgodnie z KC, przeniesienie następuje z chwilą tego przypisania – jest to \'oddanie do dyspozycji\'. Voucher funkcjonuje tu jako znak legitymacyjny (art. 921¹⁵ KC), który przenosi się jak papier wartościowy, przez samo elektroniczne przekazanie."'
  },
  {
    id: 'q3-15',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Którego z poniższych sformułowań powinien BEZWZGLĘDNIE UNIKAĆ w oficjalnej komunikacji nowy doradca Stratton Prime, ponieważ jest prawnie niepoprawne i rodzi ryzyko błędnej klasyfikacji modelu?',
    options: [
      '"Model to świetna optymalizacja podatkowa, a sam Voucher działa w praktyce jak pieniądz elektroniczny i e-wypłata gotówki."',
      '"Model pozwala na wyłączenie części wynagrodzenia z podstawy wymiaru składek ZUS przy zachowaniu pełnej zgodności z §2 pkt 26 rozporządzenia MPiPS."',
      '"Voucher uprawnia do realizacji ściśle określonego świadczenia w ramach zamkniętego katalogu usług wspierających np. wellbeing i edukację cyfrową."',
      '"Pracownik ma pełne prawo podjąć decyzję w ciągu 7 dni i jeśli nie zechce zrealizować vouchera cyfrowego, platforma dokona jego odkupu."'
    ],
    correctAnswer: '"Model to świetna optymalizacja podatkowa, a sam Voucher działa w praktyce jak pieniądz elektroniczny i e-wypłata gotówki."'
  },
  {
    id: 'q3-16',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Właściciel mniejszej firmy (zatrudniającej 12 osób na UoP) na pierwszym spotkaniu mówi: "Panie doradco, to brzmi jak rozwiązanie dla korporacji. Mamy zaledwie kilkunastu pracowników, gra nie jest warta świeczki, a wdrożenie pochłonie więcej czasu niż to wszystko warte." Jaka jest właściwa odpowiedź?',
    options: [
      '"Nasz model jest wysoce skalowalny i wdrażamy go już od 10 pracowników. Przy 12 osobach zarabiających średnio 5000 zł netto, spółka oszczędza około 7 800 zł miesięcznie, co daje ponad 93 600 zł rocznie. Proces wdrożenia jest równie prosty co w dużej firmie, a stopa zwrotu (ROI) natychmiastowa."',
      '"Rzeczywiście, rekomendowany próg wejścia to minimum 50 pracowników. W Państwa przypadku możemy zaproponować jedynie uproszczony system kafeteryjny oparty na tradycyjnych kartach przedpłaconych, który nie ingeruje w strukturę składek ZUS."',
      '"Dla firm poniżej 20 pracowników oferujemy wdrożenie w modelu \'success fee\' podwyższonym do 45%, co rekompensuje nam niższe wolumeny, ale nadal generuje dla Państwa około 2-3 tysięcy złotych oszczędności rocznie."',
      '"W przypadku małych firm omijamy etap analizy finansowej i od razu podpisujemy z pracownikami umowy o dzieło z przeniesieniem praw autorskich, co jest dla mikroprzedsiębiorstw znacznie szybsze we wdrożeniu."'
    ],
    correctAnswer: '"Nasz model jest wysoce skalowalny i wdrażamy go już od 10 pracowników. Przy 12 osobach zarabiających średnio 5000 zł netto, spółka oszczędza około 7 800 zł miesięcznie, co daje ponad 93 600 zł rocznie. Proces wdrożenia jest równie prosty co w dużej firmie, a stopa zwrotu (ROI) natychmiastowa."'
  },
  {
    id: 'q3-17',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Otrzymujesz od potencjalnego klienta wypełniony szablon do kalkulacji oszczędności, jednak zauważasz, że brakuje w nim kluczowych danych (np. kosztów pracodawcy lub wymiarów etatu dla części zespołu). Jak zgodnie z procedurą Stratton Prime powinieneś postąpić?',
    options: [
      'Należy skontaktować się z klientem, wskazać luki w danych i samodzielnie wspomóc go w uzupełnieniu szablonu na podstawie dostarczonych list płac, aby kalkulacja była w 100% precyzyjna i bezpieczna operacyjnie.',
      'Należy przekazać niekompletny plik do Działu Analiz, zlecając systemowi EBS automatyczne uśrednienie brakujących wartości na podstawie danych rynkowych GUS dla danej branży.',
      'Należy wstrzymać cały proces sprzedażowy i odesłać formularz do klienta z oficjalnym pismem informującym o niespełnieniu wymogów audytowych, czekając na jego ruch.',
      'Należy usunąć z kalkulacji wiersze z niekompletnymi danymi pracowników i przedstawić klientowi zaniżoną symulację, informując go, że brakujące osoby zostaną objęte modelem w późniejszym terminie.'
    ],
    correctAnswer: 'Należy skontaktować się z klientem, wskazać luki w danych i samodzielnie wspomóc go w uzupełnieniu szablonu na podstawie dostarczonych list płac, aby kalkulacja była w 100% precyzyjna i bezpieczna operacyjnie.'
  },
  {
    id: 'q3-18',
    category: Category.PRODUCT_KNOWLEDGE,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Dyrektor IT oraz szefowa płac w spółce produkcyjnej proponują "maksymalne uproszczenie": "Nie będziemy zmieniać Regulaminu Wynagradzania ani robić aneksów. W naszym systemie ERP po prostu dodamy nowy składnik płacowy oznaczony jako \'świadczenie cyfrowe nieoskładkowane\' i wyklikamy to technicznie." Jakie jest jedyne prawidłowe stanowisko doradcy?',
    options: [
      '"Taka ścieżka jest niedopuszczalna. Kluczowe i bezwzględnie wymagane jest formalne ujęcie świadczenia w Regulaminie Wynagradzania, ponieważ to właśnie ten zapis jest jedną z głównych przesłanek z §2 pkt 26 rozporządzenia MPiPS, warunkującą zwolnienie z ZUS. Zmiana techniczna w systemie ERP to tylko pochodna poprawnej dokumentacji prawnej."',
      '"To doskonały pomysł. Model Eliton Prime™ opiera się na innowacji technologicznej, więc dopóki w systemie EBS zgadzają się kwoty, dokumentacja wewnątrzzakładowa jest dla ZUS-u kwestią drugorzędną."',
      '"Zgoda, pod warunkiem, że dział IT wygeneruje z systemu ERP kryptograficzny podpis (hash) każdej transakcji i prześle go do naszej centrali w ramach raportu miesięcznego."',
      '"Możemy pominąć zmianę Regulaminu Wynagradzania tylko wtedy, gdy wszyscy pracownicy podpiszą u notariusza oświadczenie o dobrowolnym zrzeczeniu się części wynagrodzenia gotówkowego."'
    ],
    correctAnswer: '"Taka ścieżka jest niedopuszczalna. Kluczowe i bezwzględnie wymagane jest formalne ujęcie świadczenia w Regulaminie Wynagradzania, ponieważ to właśnie ten zapis jest jedną z głównych przesłanek z §2 pkt 26 rozporządzenia MPiPS, warunkującą zwolnienie z ZUS. Zmiana techniczna w systemie ERP to tylko pochodna poprawnej dokumentacji prawnej."'
  },
  {
    id: 'q3-20',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Podczas negocjacji Główny Księgowy klienta wyraża wątpliwość: "Zaraz, skoro Voucher w państwa modelu nie ma formy gotówkowej i został zwolniony z podstawy składek ZUS, to na jakiej podstawie wykazujecie go Państwo jako przychód pracownika podlegający opodatkowaniu PIT? Jedno wyklucza drugie." Jaka jest prawidłowa odpowiedź?',
    options: [
      '"Kwalifikacja podatkowa (PIT) i składkowa (ZUS) są na gruncie prawa odrębne. Świadczenie stanowi przychód pracownika do opodatkowania PIT (zgodnie z art. 11 i 12 ustawy o PIT), ponieważ niezależnie od formy spełnia definicję przysporzenia majątkowego. Jednakże, dzięki spełnieniu warunków z rozporządzenia MPiPS (w tym częściowej odpłatności), ten sam przychód korzysta z punktowego wyłączenia z oskładkowania ZUS."',
      '"Ma Pan całkowitą rację. Jeśli ujęlibyśmy to świadczenie jako przychód do PIT, urzędy natychmiast by to oskładkowały. Dlatego w systemie księgujemy Vouchery jako \'koszty uzyskania przychodu\', co czyni je niewidzialnymi dla obu instytucji."',
      '"Wynika to z faktu, że Vouchery cyfrowe są traktowane przez Urząd Skarbowy jako darowizna rzeczowa od pracodawcy. Podlegają one PIT na zasadach ogólnych, ale ustawa o systemie ubezpieczeń społecznych z definicji ignoruje darowizny."',
      '"Podatek PIT naliczany jest w tym modelu wyłącznie od symbolicznej odpłatności pracownika (czyli od 1 zł), co sprawia, że formalnie spełniamy obowiązek podatkowy, jednocześnie omijając pełne oskładkowanie."'
    ],
    correctAnswer: '"Kwalifikacja podatkowa (PIT) i składkowa (ZUS) są na gruncie prawa odrębne. Świadczenie stanowi przychód pracownika do opodatkowania PIT (zgodnie z art. 11 i 12 ustawy o PIT), ponieważ niezależnie od formy spełnia definicję przysporzenia majątkowego. Jednakże, dzięki spełnieniu warunków z rozporządzenia MPiPS (w tym częściowej odpłatności), ten sam przychód korzysta z punktowego wyłączenia z oskładkowania ZUS."'
  },
  {
    id: 'q3-22',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Pracownik otrzymał Voucher Cyfrowy o wartości rynkowej 1500 zł, za który zgodnie z regulaminem wnosi z własnego wynagrodzenia odpłatność w wysokości 1 zł. Zgodnie z art. 11 ust. 2a pkt 2 ustawy o PIT, jak poprawnie należy zakwalifikować to zdarzenie podatkowe?',
    options: [
      'Przychód pracownika z tytułu stosunku pracy wynosi 1499 zł (jako różnica między wartością rynkową a odpłatnością ponoszoną przez podatnika). Kwota ta podlega opodatkowaniu PIT, ale jest zwolniona z oskładkowania ZUS.',
      'Przychód do opodatkowania PIT w ogóle nie powstaje, ponieważ świadczenia w całości wyłączone z ZUS na mocy rozporządzenia MPiPS korzystają z automatycznej akcesoryjności podatkowej i są zwolnione z PIT.',
      'Podstawą opodatkowania PIT jest pełna wartość rynkowa, czyli 1500 zł. Z kolei odpłatność w wysokości 1 zł stanowi dla pracownika koszt uzyskania przychodu odliczany od podstawy opodatkowania w rozliczeniu rocznym.',
      'Przychód wynosi 1499 zł, jednak podlega on zryczałtowanemu podatkowi dochodowemu w wysokości 19% jako przychód z kapitałów pieniężnych (wynikający z nabycia praw majątkowych).'
    ],
    correctAnswer: 'Przychód pracownika z tytułu stosunku pracy wynosi 1499 zł (jako różnica między wartością rynkową a odpłatnością ponoszoną przez podatnika). Kwota ta podlega opodatkowaniu PIT, ale jest zwolniona z oskładkowania ZUS.'
  },
  {
    id: 'q3-31',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Prawnik klienta kwestionuje legalność procedury odkupu Vouchera od pracownika. Twierdzi: "Zgodnie z Kodeksem cywilnym umowa sprzedaży dotyczy wyłącznie \'rzeczy\', a rzeczami są tylko przedmioty materialne (art. 45 KC). Voucher to zapis cyfrowy, więc nie można go legalnie \'odkupić\' czy \'sprzedać\' w świetle polskiego prawa." Jak brzmi celna i poprawna odpowiedź oparta na przepisach?',
    options: [
      '"To błędne założenie. Procedura odkupu opiera się na art. 555 Kodeksu cywilnego, który wprost nakazuje odpowiednie stosowanie przepisów o sprzedaży rzeczy do sprzedaży praw (oraz energii). Ponieważ Voucher to cyfrowe prawo do świadczenia (znak legitymacyjny), z perspektywy prawa cywilnego jego sprzedaż i odkup są w 100% legalne i skuteczne."',
      '"Ma Pan rację, że umowa sprzedaży tu nie działa. Dlatego nasz model nie opiera się na \'odkupie\', lecz na instytucji \'zwolnienia z długu\' (art. 508 KC) oraz \'nowacji\' (art. 506 KC), co omija problem definicji rzeczy materialnych w Kodeksie cywilnym."',
      '"Vouchery w naszym modelu nie podlegają pod Kodeks cywilny polski, lecz pod unijną dyrektywę o rynkach kryptoaktywów (MiCA), która wprowadza autonomiczną definicję sprzedaży tokenów użytkowych z pominięciem polskich regulacji."',
      '"Problem ten rozwiązujemy poprzez zdefiniowanie Vouchera w regulaminie platformy jako materialnego \'bonu towarowego na okaziciela\', co sztucznie tworzy fikcję prawną rzeczy i zadowala urzędy skarbowe."'
    ],
    correctAnswer: '"To błędne założenie. Procedura odkupu opiera się na art. 555 Kodeksu cywilnego, który wprost nakazuje odpowiednie stosowanie przepisów o sprzedaży rzeczy do sprzedaży praw (oraz energii). Ponieważ Voucher to cyfrowe prawo do świadczenia (znak legitymacyjny), z perspektywy prawa cywilnego jego sprzedaż i odkup są w 100% legalne i skuteczne."'
  },
  {
    id: 'q3-33',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Który zestaw przepisów Kodeksu cywilnego (KC) najpełniej i najcelniej opisuje pełną "podróż" prawną Vouchera w modelu Eliton Prime™ – od jego zdefiniowania, aż po jego zbycie (odkup)?',
    options: [
      'Art. 921¹⁵ KC (określający Voucher jako znak legitymacyjny uprawniający do świadczenia) w połączeniu z art. 155 §1 KC (moment przeniesienia praw poprzez udostępnienie w systemie) oraz art. 555 KC (legalizujący umowę sprzedaży i procedurę odkupu tych praw).',
      'Art. 77² KC (pozwalający na dowolne kształtowanie wynagrodzeń w regulaminach) w związku z art. 353¹ KC (zasada swobody umów) i art. 415 KC (odpowiedzialność deliktowa platformy za wady).',
      'Art. 11 Ustawy o PIT (określający moment powstania przychodu) zdominowany przez przepisy o pożyczce (art. 720 KC), ponieważ platforma jedynie "wypożycza" pracownikowi dostęp do usług na okres 7 dni.',
      'Przekazanie i odkup opierają się na art. 888 KC (umowa darowizny) powiązanym z art. 898 KC (odwołanie darowizny rażąco niewdzięcznemu pracownikowi), co pozwala uniknąć konieczności stosowania przepisów o sprzedaży praw z art. 555 KC.'
    ],
    correctAnswer: 'Art. 921¹⁵ KC (określający Voucher jako znak legitymacyjny uprawniający do świadczenia) w połączeniu z art. 155 §1 KC (moment przeniesienia praw poprzez udostępnienie w systemie) oraz art. 555 KC (legalizujący umowę sprzedaży i procedurę odkupu tych praw).'
  },
  {
    id: 'q3-34',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Podczas rozmowy o zmianie umów z pracownikami (wprowadzenie części wynagrodzenia w Voucherze), Dyrektor HR pyta: "Jakim prawem możemy narzucić pracownikowi, w jakiej formie odbiera swoje wynagrodzenie netto?" Jak doradca powinien wykorzystać art. 353¹ KC w swojej argumentacji?',
    options: [
      '"Model niczego nie narzuca, lecz opiera się na art. 353¹ KC, czyli zasadzie swobody umów. Zgodnie z nią, strony mogą dobrowolnie ułożyć stosunek prawny według swego uznania. W drodze obustronnego aneksu pracodawca i pracownik zgadzają się na nową strukturę (gotówka + Voucher), o ile nie łamie to innych ustaw, takich jak np. gwarancja wypłaty płacy minimalnej w gotówce."',
      '"Zasada swobody umów z art. 353¹ KC daje pracodawcy jednostronne prawo do modyfikacji formy wynagrodzenia, pod warunkiem, że nowa forma (Voucher) gwarantuje utrzymanie lub podwyższenie dotychczasowej siły nabywczej pracownika."',
      '"Art. 353¹ KC stanowi, że umowy w obrocie profesjonalnym są nadrzędne wobec Kodeksu pracy. Oznacza to, że podpisując aneks, pracownik zrzeka się ochrony pracowniczej na rzecz prawa cywilnego, co legalizuje każdy rodzaj świadczenia."',
      '"Zgodnie z art. 353¹ KC, jeśli pracownik przyjmie pierwszy Voucher i nie zgłosi sprzeciwu w ciągu 14 dni, system prawny uznaje to za tzw. milczącą akceptację (dorozumiane ukształtowanie stosunku prawnego), co zwalnia nas z aneksowania."'
    ],
    correctAnswer: '"Model niczego nie narzuca, lecz opiera się na art. 353¹ KC, czyli zasadzie swobody umów. Zgodnie z nią, strony mogą dobrowolnie ułożyć stosunek prawny według swego uznania. W drodze obustronnego aneksu pracodawca i pracownik zgadzają się na nową strukturę (gotówka + Voucher), o ile nie łamie to innych ustaw, takich jak np. gwarancja wypłaty płacy minimalnej w gotówce."'
  },
  {
    id: 'q3-35',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Księgowość twierdzi, że "regulaminy wynagradzania" są zarezerwowane wyłącznie dla umów o pracę i etatowców. Jak doradca korzystając z art. 353¹ KC obala tę tezę, legalizując zwolnienie ze składek ZUS dla Umów Zlecenie?',
    options: [
      '"Na mocy zasady swobody umów (art. 353¹ KC), nic nie stoi na przeszkodzie, by pracodawca i zleceniobiorcy umówili się na stworzenie i stosowanie \'Regulaminu świadczeń dla zleceniobiorców\'. Rozporządzenie MPiPS wymaga jedynie istnienia regulaminu – nie precyzuje, że musi to być regulamin w rozumieniu Kodeksu pracy. W ten sposób zleceniobiorca staje się \'ubezpieczonym\', do którego w pełni stosuje się zwolnienie z ZUS."',
      '"Zleceniobiorcy z natury nie podlegają pod Kodeks pracy, więc na mocy art. 353¹ KC zawieramy z nimi ustną ugodę na omijanie regulaminów wewnątrzzakładowych, co ZUS i tak w pełni akceptuje na drodze odstępstwa."',
      '"Swoboda umów pozwala nam na zakwalifikowanie Umowy Zlecenie jako specyficznej formy praw autorskich. W związku z tym Voucher rozliczamy jako 50% Kosztów Uzyskania Przychodu, co stanowi bezpieczniejszą alternatywę niż tworzenie dodatkowych regulaminów."',
      '"Art. 353¹ KC pozwala na czasowe \'zawieszenie\' Umowy Zlecenie na moment wydania Vouchera, co sprawia, że świadczenie przekazywane jest poza głównym stosunkiem prawnym, omijając tym samym konieczność opłacania składek ZUS."'
    ],
    correctAnswer: '"Na mocy zasady swobody umów (art. 353¹ KC), nic nie stoi na przeszkodzie, by pracodawca i zleceniobiorcy umówili się na stworzenie i stosowanie \'Regulaminu świadczeń dla zleceniobiorców\'. Rozporządzenie MPiPS wymaga jedynie istnienia regulaminu – nie precyzuje, że musi to być regulamin w rozumieniu Kodeksu pracy. W ten sposób zleceniobiorca staje się \'ubezpieczonym\', do którego w pełni stosuje się zwolnienie z ZUS."'
  },
  {
    id: 'q3-36',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Prawnik konkurencji atakuje: "Art. 353¹ KC daje swobodę, ALE \'byleby treść nie sprzeciwiała się właściwości stosunku\'. Stosunek pracy ma charakter alimentacyjny - pracownik musi dostawać pieniądze, nie Vouchery. Wasz model jest sprzeczny z naturą stosunku pracy." Jak brzmi merytorycznie poprawne odparcie tego ataku?',
    options: [
      '"To błędny wniosek. Po pierwsze, sam Kodeks pracy (art. 77²) wprost wskazuje, że wynagrodzenie może obejmować \'inne świadczenia\' niepieniężne, co oznacza, że ustawodawca nie uznaje tego za sprzeczne z naturą stosunku pracy. Po drugie, nasz Voucher zawiera mechanizm rezygnacji i możliwość ewentualnego odkupu, co w 100% zabezpiecza interes ekonomiczny pracownika. Natura stosunku pracy jest tu w pełni zachowana i chroniona."',
      '"Prawnik zapomina, że art. 353¹ KC nie obowiązuje w odniesieniu do prawa ubezpieczeń społecznych, więc zarzut o naturze stosunku pracy jest tu prawnie bezskuteczny – liczy się wyłącznie interpretacja ZUS, która w 2025 roku była dla nas korzystna."',
      '"Natura stosunku pracy uległa redefinicji na mocy unijnej dyrektywy MiCA, która wprowadziła do polskiego prawa pojęcie \'wynagrodzenia tokenizowanego\'. Skoro prawo unijne dopuszcza Vouchery, art. 353¹ KC polskiego kodeksu traci tu znaczenie."',
      '"Zgadzam się, że wymiana pracy na Vouchery łamie tę naturę, dlatego my traktujemy Voucher wyłącznie jako premię uznaniową, wypłacaną z zysku pracodawcy, która nie ma związku z właściwością samego stosunku pracy."'
    ],
    correctAnswer: '"To błędny wniosek. Po pierwsze, sam Kodeks pracy (art. 77²) wprost wskazuje, że wynagrodzenie może obejmować \'inne świadczenia\' niepieniężne, co oznacza, że ustawodawca nie uznaje tego za sprzeczne z naturą stosunku pracy. Po drugie, nasz Voucher zawiera mechanizm rezygnacji i możliwość ewentualnego odkupu, co w 100% zabezpiecza interes ekonomiczny pracownika. Natura stosunku pracy jest tu w pełni zachowana i chroniona."'
  },
  {
    id: 'q3-37',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Klient pyta: "Czy skoro mamy swobodę umów (art. 353¹ KC), mogę dogadać się z pracownikami tak, że oni zrzekają się swoich 1000 zł z pensji w zamian za Voucher o wartości 1000 zł, bez żadnego potrącania tej symbolicznej \'złotówki\' na odpłatność?"',
    options: [
      '"Mimo iż swoboda umów z art. 353¹ KC pozwala na takie ukształtowanie wymiany (1000 zł za Voucher 1000 zł), to rozwiązanie to byłoby fatalne w skutkach. Pozbawienie pracownika \'częściowej odpłatności\' łamie twardy wymóg z rozporządzenia MPiPS (§2 pkt 26). Umowa byłaby ważna cywilnoprawnie, ale stracilibyśmy wyłączenie ze składek ZUS. Dlatego my wprowadzamy mechaniczną odpłatność w wys. 1 zł, godząc swobodę umów z wymogami prawa ubezpieczeń społecznych."',
      '"Tak, swoboda umów jest przepisem rangi kodeksowej, więc stoi hierarchicznie wyżej niż rozporządzenia MPiPS. Jeśli pracownicy dobrowolnie zgodzą się na zrzeczenie bez dopłaty, urzędy muszą to respektować na podstawie deklaracji woli."',
      '"Nie można tak zrobić, ponieważ art. 353¹ KC wymusza zasadę ekwiwalentności świadczeń do co grosza. Jeśli pracownik dostaje Voucher 1000 zł, to musi od niego zapłacić dokładnie 19% podatku Belki bezpośrednio do urzędu, by zrównoważyć swobodę umów."',
      '"Jest to prawnie dopuszczalne, ale tylko wtedy, gdy wszyscy pracownicy zarejestrują spółkę z ograniczoną odpowiedzialnością (sp. z o.o.) i podpiszą umowę o współpracę (B2B). W stosunku pracy taka swoboda jest zakazana przez PIP."'
    ],
    correctAnswer: '"Mimo iż swoboda umów z art. 353¹ KC pozwala na takie ukształtowanie wymiany (1000 zł za Voucher 1000 zł), to rozwiązanie to byłoby fatalne w skutkach. Pozbawienie pracownika \'częściowej odpłatności\' łamie twardy wymóg z rozporządzenia MPiPS (§2 pkt 26). Umowa byłaby ważna cywilnoprawnie, ale stracilibyśmy wyłączenie ze składek ZUS. Dlatego my wprowadzamy mechaniczną odpłatność w wys. 1 zł, godząc swobodę umów z wymogami prawa ubezpieczeń społecznych."'
  },
  {
    id: 'q3-38',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Klient pyta: "Chcemy wdrożyć model, ale co zrobić w sytuacji, gdy część pracowników po prostu odmówi podpisania dobrowolnego aneksu zmieniającego strukturę ich wynagrodzenia (część w gotówce + część w Voucherze)?" Jak doradca powinien prawidłowo odwołać się do instrumentów z Kodeksu pracy?',
    options: [
      '"Zasadniczo opieramy się na porozumieniu stron (dobrowolny aneks), co udaje się w >95% przypadków, ponieważ pracownik finansowo nic nie traci (a w wariancie PLUS zyskuje). W przypadku twardej odmowy, pracodawca ma prawo zastosować instytucję wypowiedzenia zmieniającego warunki pracy i płacy na podstawie art. 42 Kodeksu pracy. Jeśli pracownik ostatecznie odrzuci te nowe warunki, umowa ulegnie rozwiązaniu. Jest to jednak ostateczność, której w praktyce niemal nie stosujemy, stawiając na dobrą komunikację i gwarancję procedury odkupu Vouchera."',
      '"W takiej sytuacji art. 42 KP pozwala na tzw. zmianę milczącą. Pracodawca po prostu przelewa nowe wynagrodzenie w formie dwuskładnikowej, a jeśli pracownik nie złoży formalnego sprzeciwu w ciągu 3 dni roboczych, aneks uznaje się za prawnie wiążący."',
      '"Nie ma problemu, pracownicy odmawiający aneksu są z urzędu przenoszeni na system tzw. premii uznaniowej w ramach uprawnień kierowniczych pracodawcy, co całkowicie omija konieczność stosowania wypowiedzenia zmieniającego."',
      '"Jeśli pracownik odmawia, art. 42 KP zmusza pracodawcę do powołania komisji arbitrażowej przy Państwowej Inspekcji Pracy, która w ciągu 30 dni rozstrzyga o prawomocności wdrożenia Vouchera."'
    ],
    correctAnswer: '"Zasadniczo opieramy się na porozumieniu stron (dobrowolny aneks), co udaje się w >95% przypadków, ponieważ pracownik finansowo nic nie traci (a w wariancie PLUS zyskuje). W przypadku twardej odmowy, pracodawca ma prawo zastosować instytucję wypowiedzenia zmieniającego warunki pracy i płacy na podstawie art. 42 Kodeksu pracy. Jeśli pracownik ostatecznie odrzuci te nowe warunki, umowa ulegnie rozwiązaniu. Jest to jednak ostateczność, której w praktyce niemal nie stosujemy, stawiając na dobrą komunikację i gwarancję procedury odkupu Vouchera."'
  },
  {
    id: 'q3-39',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Prawnik wewnętrzny klienta zauważa: "W wariancie PLUS pracownik dostaje 4% podwyżki netto. Skoro to ewidentna zmiana na korzyść pracownika, po co w ogóle aneksować umowy czy rozważać art. 42 KP? Przecież można to po prostu dać bez papierologii." Jaka jest prawidłowa odpowiedź prawna?',
    options: [
      '"Zgodnie z ugruntowanym orzecznictwem Sądu Najwyższego, zmiana samej struktury wynagrodzenia (np. obniżenie podstawy gotówkowej brutto w celu wprowadzenia nowego składnika rzeczowego), nawet jeśli obiektywnie jest korzystna lub neutralna finansowo (netto), zawsze stanowi istotną zmianę warunków płacy. Dlatego bezwzględnie wymaga ona obustronnego aneksu lub, w przypadku jego braku, wypowiedzenia zmieniającego (art. 42 KP)."',
      '"Prawnik ma rację. Zmiany na korzyść pracownika nie wymagają formy pisemnej, dlatego przy wariancie PLUS proces wdrożenia całkowicie omija działy kadr i opiera się na jednostronnym rozporządzeniu zarządu (tzw. dekret płacowy)."',
      '"Wymóg ten wynika wyłącznie z faktu, że art. 42 KP nakazuje rejestrować każdą podwyżkę powyżej 2% w urzędzie skarbowym w celu prawidłowego naliczenia zaliczek na podatek dochodowy."',
      '"Ponieważ podwyżka w wariancie PLUS jest w rzeczywistości finansowana ze środków publicznych (optymalizacja ZUS), art. 42 KP wymusza stworzenie specjalnego oświadczenia lojalnościowego, chroniącego pracodawcę przed zwrotem tych środków."'
    ],
    correctAnswer: '"Zgodnie z ugruntowanym orzecznictwem Sądu Najwyższego, zmiana samej struktury wynagrodzenia (np. obniżenie podstawy gotówkowej brutto w celu wprowadzenia nowego składnika rzeczowego), nawet jeśli obiektywnie jest korzystna lub neutralna finansowo (netto), zawsze stanowi istotną zmianę warunków płacy. Dlatego bezwzględnie wymaga ona obustronnego aneksu lub, w przypadku jego braku, wypowiedzenia zmieniającego (art. 42 KP)."'
  },
  {
    id: 'q3-41',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'HR Manager pyta: "Czy sama zmiana Regulaminu Wynagradzania (czyli wpisanie tam świadczeń rzeczowych zgodnie z rozporządzeniem MPiPS) automatycznie zmienia warunki płacowe pracowników, zwalniając nas z konieczności robienia aneksów lub stosowania art. 42 KP?"',
    options: [
      '"Nie. Wprowadzenie odpowiednich zapisów do Regulaminu Wynagradzania tworzy jedynie wewnątrzzakładową podstawę prawną do przyznania świadczenia i jest warunkiem koniecznym do uzyskania zwolnienia z ZUS. Jednak przełożenie tego na pensję konkretnego pracownika (zwłaszcza jeśli wiąże się to ze zmianą proporcji kwoty bazowej brutto na rzecz Vouchera) bezwzględnie wymaga przeniesienia tego na poziom indywidualnej umowy o pracę – właśnie poprzez aneks lub art. 42 KP."',
      '"Tak, Regulamin Wynagradzania (jako prawo wewnątrzzakładowe) stoi w hierarchii źródeł prawa wyżej niż indywidualna umowa o pracę, więc po 14 dniach od jego ogłoszenia nowe zasady automatycznie nadpisują wszystkie umowy."',
      '"Tak, ale tylko w dużych firmach zatrudniających powyżej 50 pracowników. W mniejszych podmiotach wciąż wymagane są indywidualne aneksy lub wypowiedzenia zmieniające."',
      '"Nie, zmiana Regulaminu Wynagradzania dotyczy z mocy prawa wyłącznie nowo zatrudnianych pracowników. Obecnych pracowników można objąć modelem tylko poprzez formalne zwolnienie i ponowne zatrudnienie na nowych warunkach."'
    ],
    correctAnswer: '"Nie. Wprowadzenie odpowiednich zapisów do Regulaminu Wynagradzania tworzy jedynie wewnątrzzakładową podstawę prawną do przyznania świadczenia i jest warunkiem koniecznym do uzyskania zwolnienia z ZUS. Jednak przełożenie tego na pensję konkretnego pracownika (zwłaszcza jeśli wiąże się to ze zmianą proporcji kwoty bazowej brutto na rzecz Vouchera) bezwzględnie wymaga przeniesienia tego na poziom indywidualnej umowy o pracę – właśnie poprzez aneks lub art. 42 KP."'
  },
  {
    id: 'q3-42',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Prawnik klienta twierdzi stanowczo: "Wynagrodzenie pracownicze może składać się wyłącznie ze stałej stawki miesięcznej w gotówce oraz ewentualnych premii pieniężnych. Dodawanie jakichś cyfrowych Voucherów do pensji jest bezprawne." Jakie znaczenie ma art. 77² § 2 Kodeksu pracy dla obalenia tej tezy i legalizacji modelu Eliton Prime™?',
    options: [
      'Art. 77² § 2 KP wprost stanowi, że pracodawca może w regulaminie wynagradzania ustalić "także inne świadczenia związane z pracą i zasady ich przyznawania". Przepis ten daje pracodawcy pełne i bezsporne prawo do wprowadzania świadczeń rzeczowych/niepieniężnych (takich jak Voucher) jako oficjalnego i legalnego elementu struktury wynagradzania.',
      'Art. 77² § 2 KP stanowi, że świadczenia rzeczowe mogą stanowić maksymalnie 25% całkowitego wynagrodzenia brutto, co legalizuje nasz model, o ile wartość Vouchera nie przekroczy tego ustawowego progu w danym miesiącu.',
      'Przepis ten przenosi kompetencje ustalania formy wynagrodzenia z Kodeksu pracy na Kodeks cywilny, co pozwala na pełną dowolność w wypłacaniu pensji w formie zdematerializowanych praw majątkowych, bez zgody pracownika.',
      'Art. 77² § 2 KP zmusza pracodawcę do corocznej waloryzacji płac, co my wykorzystujemy, oferując wariant PLUS z 4% podwyżką netto jako substytut ustawowego obowiązku wyrównywania inflacji.'
    ],
    correctAnswer: 'Art. 77² § 2 KP wprost stanowi, że pracodawca może w regulaminie wynagradzania ustalić "także inne świadczenia związane z pracą i zasady ich przyznawania". Przepis ten daje pracodawcy pełne i bezsporne prawo do wprowadzania świadczeń rzeczowych/niepieniężnych (takich jak Voucher) jako oficjalnego i legalnego elementu struktury wynagradzania.'
  },
  {
    id: 'q3-43',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Klient zatrudnia 25 pracowników i obecnie nie posiada Regulaminu Wynagradzania. Właściciel twierdzi: "Art. 77² KP nakłada obowiązek tworzenia regulaminu dopiero od 50 pracowników. Nie możemy więc wdrożyć państwa modelu, bo ZUS odrzuci nasze zwolnienie ze składek z powodu braku tego dokumentu." Jak doradca powinien rozwiązać ten problem?',
    options: [
      '"Choć obowiązek tworzenia regulaminu faktycznie dotyczy firm zatrudniających co najmniej 50 pracowników, to art. 77² § 1² KP pozwala mniejszym pracodawcom na dobrowolne utworzenie takiego regulaminu. Aby wdrożyć model i spełnić wymóg z rozporządzenia MPiPS, po prostu wprowadzamy u Państwa odpowiedni regulamin, co jest w pełni legalne i otwiera drogę do oszczędności."',
      '"To prawda, brak 50 pracowników blokuje możliwość stworzenia regulaminu. Dlatego w małych firmach omijamy art. 77² KP i opieramy zwolnienie z ZUS wyłącznie na wewnątrzzakładowym \'Kodeksie Dobrych Praktyk\', który nie ma progów zatrudnienia."',
      '"Dla firm zatrudniających poniżej 50 pracowników, zamiast Regulaminu Wynagradzania, stosujemy odgórny, zbiorowy układ pracy podpisany z naszą centralą Stratton Prime, co przenosi na nas obowiązek raportowania do ZUS."',
      '"ZUS nie ma prawa weryfikować istnienia Regulaminu Wynagradzania u pracodawców zatrudniających poniżej 50 osób. Zastosowanie ma domniemanie prawne, w którym sam fakt przypisania Vouchera zastępuje wymóg regulaminowy."'
    ],
    correctAnswer: '"Choć obowiązek tworzenia regulaminu faktycznie dotyczy firm zatrudniających co najmniej 50 pracowników, to art. 77² § 1² KP pozwala mniejszym pracodawcom na dobrowolne utworzenie takiego regulaminu. Aby wdrożyć model i spełnić wymóg z rozporządzenia MPiPS, po prostu wprowadzamy u Państwa odpowiedni regulamin, co jest w pełni legalne i otwiera drogę do oszczędności."'
  },
  {
    id: 'q3-44',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W jaki sposób art. 77² Kodeksu pracy "współpracuje" z §2 pkt 26 rozporządzenia MPiPS z 1998 r., tworząc bezpieczną i szczelną matrycę prawną dla modelu Eliton Prime™?',
    options: [
      'Art. 77² KP daje twardą podstawę prawa pracy do legalnego przyznania świadczenia rzeczowego (Vouchera) poprzez wpisanie go do regulaminu wynagradzania. Z kolei sam fakt umieszczenia tego świadczenia w tym regulaminie jest pierwszym i bezwzględnym warunkiem do tego, aby mogło ono skorzystać z wyłączenia z podstawy składek ZUS na mocy §2 pkt 26 rozporządzenia MPiPS.',
      'Art. 77² KP zwalnia świadczenia ujęte w regulaminie z opodatkowania PIT, podczas gdy rozporządzenie MPiPS dopełnia tę matrycę poprzez równoległe wyłączenie ich z oskładkowania ZUS, dając podwójną korzyść.',
      'Rozporządzenie MPiPS nakazuje wypłatę części pensji w formie rzeczowej, a art. 77² KP jedynie określa techniczny limit takich świadczeń (do kwoty 2000 zł rocznie).',
      'Te dwa akty prawne są od siebie całkowicie niezależne. Art. 77² KP chroni pracownika przed obniżeniem pensji, podczas gdy rozporządzenie MPiPS służy wyłącznie księgowemu rozliczaniu kosztów platformy abonamentowej.'
    ],
    correctAnswer: 'Art. 77² KP daje twardą podstawę prawa pracy do legalnego przyznania świadczenia rzeczowego (Vouchera) poprzez wpisanie go do regulaminu wynagradzania. Z kolei sam fakt umieszczenia tego świadczenia w tym regulaminie jest pierwszym i bezwzględnym warunkiem do tego, aby mogło ono skorzystać z wyłączenia z podstawy składek ZUS na mocy §2 pkt 26 rozporządzenia MPiPS.'
  },
  {
    id: 'q3-45',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W firmie produkcyjnej klienta działają silne organizacje związkowe. Zgodnie z art. 77² § 4 KP, zmiana regulaminu wynagradzania wymaga uzgodnienia z zarządem związku. Dyrektor obawia się całkowitej blokady wdrożenia Vouchera. Jaki jest najsilniejszy argument doradcy Stratton Prime, ułatwiający negocjacje ze stroną społeczną?',
    options: [
      '"Model Eliton Prime™ w pełni zabezpiecza interesy pracowników. W wariancie Standard nikt nie traci na wartości netto, a w wariancie PLUS generujemy dla załogi 4% podwyżkę finansowaną przez Stratton Prime. Co najważniejsze, działa procedura rezygnacji i jest ewentualny odkup, jeśli pracownik nie wykorzysta Vouchera. Pokazując te gwarancje i podwyżki, związki zawodowe z reguły popierają te zmiany, ponieważ ich nadrzędnym celem jest ochrona finansów załogi."',
      '"Zgodnie z orzecznictwem unijnym, wprowadzanie innowacyjnych świadczeń cyfrowych zwalnia pracodawcę z obowiązku konsultacji związkowych, ponieważ nie stanowią one tradycyjnego \'wynagrodzenia za pracę\', lecz świadczenie z zakresu cyfryzacji."',
      '"W przypadku blokady ze strony związków zawodowych, zarząd może powołać się na art. 353¹ KC (swoboda umów) i podpisać aneksy bezpośrednio z wybranymi pracownikami, całkowicie ignorując stanowisko organizacji związkowej w zakresie regulaminu."',
      '"Aby uspokoić związki zawodowe, obiecujemy, że 10% zaoszczędzonych przez spółkę składek ZUS zostanie przekazane bezpośrednio na konto bankowe samej organizacji związkowej jako darowizna celowa na cele statutowe."'
    ],
    correctAnswer: '"Model Eliton Prime™ w pełni zabezpiecza interesy pracowników. W wariancie Standard nikt nie traci na wartości netto, a w wariancie PLUS generujemy dla załogi 4% podwyżkę finansowaną przez Stratton Prime. Co najważniejsze, działa procedura rezygnacji i jest ewentualny odkup, jeśli pracownik nie wykorzysta Vouchera. Pokazując te gwarancje i podwyżki, związki zawodowe z reguły popierają te zmiany, ponieważ ich nadrzędnym celem jest ochrona finansów załogi."'
  },
  {
    id: 'q3-46',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Zgodnie z fundamentalną zasadą wyrażoną w art. 11 ust. 1 ustawy o PIT, w którym dokładnie momencie po stronie pracownika korzystającego z modelu Eliton Prime™ powstaje przychód podatkowy, od którego pracodawca musi naliczyć zaliczkę?',
    options: [
      'Przychód powstaje w momencie "postawienia świadczenia do dyspozycji" podatnika. W naszym ekosystemie jest to moment faktycznego przypisania Vouchera cyfrowego do indywidualnego profilu pracownika w systemie EBS, niezależnie od tego, kiedy (i czy w ogóle) pracownik zrealizuje za niego konkretną usługę na platformie.',
      'Przychód z tytułu Vouchera powstaje wyłącznie w momencie jego faktycznej konsumpcji, czyli fizycznej wymiany zdematerializowanego znaku legitymacyjnego na wybraną usługę (np. pakiet medyczny lub kurs VOD).',
      'Moment powstania przychodu jest odroczony z mocy prawa do końca roku podatkowego (31 grudnia), co pozwala na skumulowanie wartości wszystkich niewykorzystanych Voucherów i jednorazowe opodatkowanie ich ryczałtem.',
      'Zgodnie z ustawą o PIT, przychód dla pracownika powstaje dopiero w dniu opłacenia przez pracodawcę faktury prowizyjnej (Success Fee) na rzecz operatora platformy, co jest momentem definitywnego poniesienia kosztu przez spółkę.'
    ],
    correctAnswer: 'Przychód powstaje w momencie "postawienia świadczenia do dyspozycji" podatnika. W naszym ekosystemie jest to moment faktycznego przypisania Vouchera cyfrowego do indywidualnego profilu pracownika w systemie EBS, niezależnie od tego, kiedy (i czy w ogóle) pracownik zrealizuje za niego konkretną usługę na platformie.'
  },
  {
    id: 'q3-47',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Pracownik zgłasza pretensje do działu HR: "Przez cały miesiąc nie zalogowałem się na platformę i niczego za ten Voucher nie kupiłem. Dlaczego firma naliczyła mi od niego podatek PIT i potrąciła to z pensji?". Jak doradca tłumaczy tę sytuację księgowej i HR, opierając się na art. 11 ust. 1 PIT i mechanice odkupu?',
    options: [
      '"Na gruncie art. 11 ust. 1 PIT przychodem są świadczenia \'postawione do dyspozycji\'. Sam fakt posiadania Vouchera na koncie generuje obowiązek podatkowy. Jednakże nasz system bezwzględnie chroni pracownika – jeśli w ciągu 7 dni nie podejmie on akcji na platformie, automatycznie uruchamia się procedura rezygnacji i odkupu. Wtedy Voucher zamieniany jest na gotówkę, którą pracownik dostaje na konto, więc potrącony PIT zawsze ma pokrycie w realnym dochodzie."',
      '"Pracownik ma rację. Zgodnie z prawem podatkowym \'brak akceptacji to brak przychodu\'. W takiej sytuacji dział kadr musi dokonać niezwłocznej korekty listy płac i zwrócić pracownikowi nienależnie pobraną zaliczkę na podatek dochodowy za dany miesiąc."',
      '"Podatek PIT został pobrany legalnie, ponieważ art. 11 ust. 1 traktuje Vouchery cyfrowe jako \'przychody z kapitałów pieniężnych\', od których podatek uiszcza się z góry w dniu podpisania umowy, niezależnie od faktu udostępnienia platformy."',
      '"Ustawa o PIT faktycznie uzależnia podatek od faktycznej konsumpcji, ale dzięki interpretacji ogólnej Dyrektora KIS, wszystkie systemy voucherowe są objęte ryczałtowym domniemaniem konsumpcji, co usprawiedliwia naliczenie podatku z góry."'
    ],
    correctAnswer: '"Na gruncie art. 11 ust. 1 PIT przychodem są świadczenia \'postawione do dyspozycji\'. Sam fakt posiadania Vouchera na koncie generuje obowiązek podatkowy. Jednakże nasz system bezwzględnie chroni pracownika – jeśli w ciągu 7 dni nie podejmie on akcji na platformie, automatycznie uruchamia się procedura rezygnacji i odkupu. Wtedy Voucher zamieniany jest na gotówkę, którą pracownik dostaje na konto, więc potrącony PIT zawsze ma pokrycie w realnym dochodzie."'
  },
  {
    id: 'q3-48',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Dyrektor Finansowy klienta pyta: "Art. 11 ust. 1 PIT wymienia \'pieniądze\', \'wartości pieniężne\' oraz \'inne świadczenia\'. Gdzie dokładnie na tej liście mieści się Wasz Voucher Cyfrowy, żebyśmy nie popełnili błędu kategoryzacji?"',
    options: [
      '"Voucher Cyfrowy nie jest pieniądzem ani wartością pieniężną. Kwalifikuje się on prawnie jako \'inne (częściowo odpłatne) świadczenie\'. Stanowi wymierne przysporzenie majątkowe w postaci prawnego uprawnienia do skorzystania z usług. To właśnie ta kwalifikacja – fakt, że Voucher nie jest gotówką – pozwala legalnie chronić to świadczenie przed pełnym oskładkowaniem ZUS na podstawie rozporządzenia MPiPS."',
      '"W świetle art. 11 ust. 1 PIT, Voucher Cyfrowy traktowany jest dosłownie jako \'wartość pieniężna\' (tzw. pieniądz elektroniczny e-money), co znacząco ułatwia jego księgowanie na standardowych kontach rozrachunkowych."',
      '"Vouchery w modelu Eliton Prime™ są całkowicie wyłączone z katalogu art. 11 ust. 1 PIT, ponieważ podlegają pod odrębne przepisy kodeksu handlowego dotyczące obrotu certyfikatami inwestycyjnymi."',
      '"Zalicza się on ściśle do kategorii \'świadczeń w naturze\', co oznacza, że zgodnie z ordynacją podatkową musi zostać fizycznie wydany pracownikowi w formie papierowego bonu z unikalnym hologramem."'
    ],
    correctAnswer: '"Voucher Cyfrowy nie jest pieniądzem ani wartością pieniężną. Kwalifikuje się on prawnie jako \'inne (częściowo odpłatne) świadczenie\'. Stanowi wymierne przysporzenie majątkowe w postaci prawnego uprawnienia do skorzystania z usług. To właśnie ta kwalifikacja – fakt, że Voucher nie jest gotówką – pozwala legalnie chronić to świadczenie przed pełnym oskładkowaniem ZUS na podstawie rozporządzenia MPiPS."'
  },
  {
    id: 'q3-49',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W jaki sposób fundamentalna zasada z art. 11 ust. 1 PIT (postawienie do dyspozycji) musi zostać połączona z kolejnymi przepisami tej ustawy, aby księgowość prawidłowo wyliczyła podstawę opodatkowania dla pracownika objętego systemem Eliton Prime™?',
    options: [
      '"Z chwilą postawienia Vouchera do dyspozycji pracownika (zgodnie z art. 11 ust. 1) powstaje przychód, którego jednak dokładną wartość musimy obliczyć kaskadowo w oparciu o art. 11 ust. 2a pkt 2. Nakazuje on pomniejszyć rynkową wartość udostępnionego świadczenia o kwotę faktycznie wniesioną przez pracownika tytułem częściowej odpłatności (czyli o ten symboliczny 1 zł)."',
      '"Postawienie do dyspozycji generuje przychód, który zawsze mierzony jest w 100% wartości nominalnej Vouchera. Częściowa odpłatność (1 zł) wpływa wyłącznie na podstawę składkową ZUS, ale podatkowo ustawa o PIT zabrania jej odliczania."',
      '"Ponieważ Voucher jest świadczeniem niematerialnym, art. 11 ust. 1 nakazuje wycenę tego przychodu według uśrednionych stawek rynkowych dla usług informatycznych, które są publikowane kwartalnie przez prezesa GUS."',
      '"Zastosowanie częściowej odpłatności powoduje, że na mocy art. 11 ust. 1 przychód ulega tzw. nowacji podatkowej – staje się neutralny dla podatku dochodowego (PIT) i podlega wyłącznie opodatkowaniu podatkiem od towarów i usług (VAT 23%)."'
    ],
    correctAnswer: '"Z chwilą postawienia Vouchera do dyspozycji pracownika (zgodnie z art. 11 ust. 1) powstaje przychód, którego jednak dokładną wartość musimy obliczyć kaskadowo w oparciu o art. 11 ust. 2a pkt 2. Nakazuje on pomniejszyć rynkową wartość udostępnionego świadczenia o kwotę faktycznie wniesioną przez pracownika tytułem częściowej odpłatności (czyli o ten symboliczny 1 zł)."'
  },
  {
    id: 'q3-50',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Księgowa klienta stanowczo twierdzi: "Przychód ze stosunku pracy to wyłącznie pieniądze wypłacone na konto pracownika. Skoro Voucher to usługa cyfrowa, a nie gotówka, to nie mam prawa doliczać go pracownikowi do podstawy opodatkowania PIT." Jak doradca obala ten mit, opierając się na brzmieniu art. 12 ust. 1 ustawy o PIT?',
    options: [
      '"To błędne założenie. Art. 12 ust. 1 ustawy o PIT wprost zalicza do przychodów ze stosunku pracy nie tylko wypłaty pieniężne, ale również \'wartość pieniężną świadczeń w naturze\' oraz \'wartość innych nieodpłatnych lub częściowo odpłatnych świadczeń\'. Zatem Voucher, jako świadczenie częściowo odpłatne, z mocy samego prawa staje się pełnoprawnym przychodem ze stosunku pracy, pomimo braku formy gotówkowej."',
      '"Księgowa ma rację co do zasady, jednak na mocy specustawy o cyfryzacji z 2022 r. Vouchery i platformy benefitowe zostały sztucznie zrównane z gotówką, co wymusza ich opodatkowanie, mimo że nie spełniają klasycznej definicji z art. 12."',
      '"Art. 12 ust. 1 faktycznie wyklucza usługi cyfrowe z opodatkowania, dlatego w naszym modelu Voucher księgujemy w dziale \'Prawa Autorskie\', co pozwala nam go opodatkować ryczałtowo z pominięciem stosunku pracy."',
      '"W polskim prawie podatkowym liczy się wyłącznie wola pracodawcy. Jeśli pracodawca uzna w regulaminie, że Voucher nie jest przychodem z pracy, Urząd Skarbowy musi to zaakceptować, co czyni argument księgowej bezprzedmiotowym."'
    ],
    correctAnswer: '"To błędne założenie. Art. 12 ust. 1 ustawy o PIT wprost zalicza do przychodów ze stosunku pracy nie tylko wypłaty pieniężne, ale również \'wartość pieniężną świadczeń w naturze\' oraz \'wartość innych nieodpłatnych lub częściowo odpłatnych świadczeń\'. Zatem Voucher, jako świadczenie częściowo odpłatne, z mocy samego prawa staje się pełnoprawnym przychodem ze stosunku pracy, pomimo braku formy gotówkowej."'
  },
  {
    id: 'q3-51',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'W jaki sposób mechanizm pobrania od pracownika 1 zł (częściowej odpłatności) za Voucher pozycjonuje to świadczenie w kategoryzacji art. 12 ust. 1 ustawy o PIT?',
    options: [
      '"Pobranie 1 zł kategoryzuje Voucher precyzyjnie jako \'świadczenie częściowo odpłatne\', które jest dosłownie wymienione w art. 12 ust. 1 jako jedna ze składowych przychodu ze stosunku pracy. To właśnie ta kwalifikacja pozwala nam następnie legalnie zastosować wycenę wartości z art. 11 i zwolnienie z ZUS na podstawie rozporządzenia MPiPS."',
      '"Pobranie tej złotówki sprawia, że świadczenie przestaje być przychodem ze stosunku pracy (art. 12) i staje się zwykłą transakcją kupna-sprzedaży między firmą a pracownikiem (art. 10 – inne źródła), co omija listy płac."',
      '"Art. 12 ust. 1 zakłada, że wszelkie świadczenia częściowo odpłatne podlegają opodatkowaniu wyłącznie od kwoty wniesionej przez pracownika, a zatem w tym wypadku podatek PIT naliczany jest tylko od kwoty 1 zł."',
      '"Złotówka odpłatności to zabieg czysto marketingowy. Z punktu widzenia art. 12 ust. 1 Voucher jest zawsze traktowany jako \'świadczenie całkowicie nieodpłatne\', ponieważ wartość 1 zł leży poniżej ustawowego progu istotności podatkowej."'
    ],
    correctAnswer: '"Pobranie 1 zł kategoryzuje Voucher precyzyjnie jako \'świadczenie częściowo odpłatne\', które jest dosłownie wymienione w art. 12 ust. 1 jako jedna ze składowych przychodu ze stosunku pracy. To właśnie ta kwalifikacja pozwala nam następnie legalnie zastosować wycenę wartości z art. 11 i zwolnienie z ZUS na podstawie rozporządzenia MPiPS."'
  },
  {
    id: 'q3-52',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Dlaczego twarda klasyfikacja Vouchera jako "przychodu ze stosunku pracy" (zgodnie z art. 12 ust. 1 PIT) jest paradoksalnie warunkiem koniecznym, abyśmy w ogóle mogli bronić zwolnienia ze składek ZUS przy użyciu rozporządzenia MPiPS?',
    options: [
      '"Rozporządzenie MPiPS (m.in. §2 pkt 26) określa zasady wyłączania ze składek konkretnych składników przychodu ze stosunku pracy. Gdyby Voucher nie był sklasyfikowany przez art. 12 ust. 1 jako przychód pracowniczy, regulacje ZUS w ogóle by go nie dotyczyły (lub podlegałby oskładkowaniu na innych zasadach). Najpierw ustawa o PIT \'wciąga\' świadczenie do przychodu z etatu, a dopiero potem rozporządzenie MPiPS punktowo \'wyciąga\' je z podstawy ZUS."',
      '"Nie ma to żadnego związku. Art. 12 ust. 1 PIT i rozporządzenie MPiPS wzajemnie się wykluczają. Uznanie Vouchera za przychód ze stosunku pracy automatycznie niszczy zwolnienie z ZUS, dlatego naszym celem jest udowodnienie, że Voucher nie podlega pod art. 12."',
      '"Ponieważ art. 12 ust. 1 zawiera tajną klauzulę (tzw. przepis blankietowy), która zmusza ZUS do zrezygnowania z poboru składek od wszelkich świadczeń cyfrowych wprowadzonych po 2021 roku."',
      '"To błąd logiczny. Rozporządzenie MPiPS dotyczy wyłącznie pracowników, którzy zarabiają powyżej drugiego progu podatkowego, co wymusza zastosowanie art. 12 ust. 1 w celu naliczenia 32% podatku wyrównawczego."'
    ],
    correctAnswer: '"Rozporządzenie MPiPS (m.in. §2 pkt 26) określa zasady wyłączania ze składek konkretnych składników przychodu ze stosunku pracy. Gdyby Voucher nie był sklasyfikowany przez art. 12 ust. 1 jako przychód pracowniczy, regulacje ZUS w ogóle by go nie dotyczyły (lub podlegałby oskładkowaniu na innych zasadach). Najpierw ustawa o PIT \'wciąga\' świadczenie do przychodu z etatu, a dopiero potem rozporządzenie MPiPS punktowo \'wyciąga\' je z podstawy ZUS."'
  },
  {
    id: 'q3-53',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Startup technologiczny proponuje: "Po co stosować model Eliton Prime na umowach o pracę (art. 12)? Dajmy te Vouchery twórcom na umowach o dzieło, wtedy unikniemy i PIT, i ZUS!" Dlaczego w świetle prawa podatkowego ta konstrukcja jest błędna?',
    options: [
      '"Umowy o dzieło nie generują przychodów ze stosunku pracy (art. 12), lecz przychody z działalności wykonywanej osobiście (art. 13). Rozporządzenie MPiPS (chroniące przed ZUS) jest spięte z ubezpieczonymi. Osoby na umowie o dzieło z definicji nie podlegają ubezpieczeniom społecznym, więc model optymalizacji ZUS jest u nich bezprzedmiotowy, a sam Voucher i tak stanowiłby dla nich przychód do opodatkowania PIT (brak zwolnienia podatkowego)."',
      '"Startup ma rację. Ustawa o PIT (art. 12 ust. 1) pozwala na całkowite wyłączenie Voucherów z opodatkowania, pod warunkiem że w umowie o dzieło zawarty jest protokół przeniesienia praw autorskich do wygenerowanego kodu źródłowego."',
      '"Jest to błędne, ponieważ osoby na umowie o dzieło podlegają z urzędu podwójnemu opodatkowaniu – muszą zapłacić PIT jako twórcy (art. 13) oraz podatek od darowizn (z tytułu otrzymania Vouchera od firmy), co drastycznie zwiększa koszty operacyjne."',
      '"Ponieważ art. 12 ust. 1 PIT jednoznacznie delegalizuje przyznawanie jakichkolwiek świadczeń rzeczowych i Voucherów osobom niezatrudnionym na umowę o pracę. Przekazanie im Vouchera grozi nałożeniem na startup kary karnoskarbowej."'
    ],
    correctAnswer: '"Umowy o dzieło nie generują przychodów ze stosunku pracy (art. 12), lecz przychody z działalności wykonywanej osobiście (art. 13). Rozporządzenie MPiPS (chroniące przed ZUS) jest spięte z ubezpieczonymi. Osoby na umowie o dzieło z definicji nie podlegają ubezpieczeniom społecznym, więc model optymalizacji ZUS jest u nich bezprzedmiotowy, a sam Voucher i tak stanowiłby dla nich przychód do opodatkowania PIT (brak zwolnienia podatkowego)."'
  },
  {
    id: 'q3-54',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Podczas prezentacji modelu Główny Księgowy klienta przerywa: "Przecież §2 pkt 26 rozporządzenia MPiPS z 1998 r. znajduje się w akcie prawnym, który dotyczy pracowników. Osoby na Umowach Zlecenie są regulowane przez Kodeks cywilny, więc to zwolnienie ich z urzędu nie obejmuje!" Jak doradca powinien merytorycznie obalić ten mit?',
    options: [
      '"To powszechny błąd interpretacyjny. Zgodnie z §5 ust. 2 tego samego rozporządzenia MPiPS, przepisy dotyczące ustalania podstawy wymiaru składek (w tym §2 pkt 26) stosuje się odpowiednio do osób wykonujących pracę na podstawie umowy agencyjnej lub umowy zlecenia. Rozporządzenie dotyczy \'ubezpieczonych\', a oskładkowany zleceniobiorca jest pełnoprawnym ubezpieczonym, więc zwolnienie z ZUS dla Vouchera działa u niego identycznie jak na etacie."',
      '"Księgowy ma rację, dlatego w przypadku umów zlecenie nie stosujemy rozporządzenia MPiPS, lecz ustawę o podatku zryczałtowanym, która pozwala na wydawanie bonów towarowych z pominięciem ewidencji ZUS."',
      '"Osoby na umowach cywilnoprawnych są z definicji wyłączone z systemu ubezpieczeń społecznych, o ile wykonują pracę w systemie zdalnym, co czyni argument księgowego całkowicie bezprzedmiotowym."',
      '"Zwolnienie dla zleceniobiorców opiera się na odrębnej decyzji Prezesa ZUS z 2015 roku, która nakazuje zrównanie umów cywilnoprawnych z umowami o pracę wyłącznie w zakresie dostępu do cyfrowych usług medycznych."'
    ],
    correctAnswer: '"To powszechny błąd interpretacyjny. Zgodnie z §5 ust. 2 tego samego rozporządzenia MPiPS, przepisy dotyczące ustalania podstawy wymiaru składek (w tym §2 pkt 26) stosuje się odpowiednio do osób wykonujących pracę na podstawie umowy agencyjnej lub umowy zlecenia. Rozporządzenie dotyczy \'ubezpieczonych\', a oskładkowany zleceniobiorca jest pełnoprawnym ubezpieczonym, więc zwolnienie z ZUS dla Vouchera działa u niego identycznie jak na etacie."'
  },
  {
    id: 'q3-55',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Warunkiem zwolnienia Vouchera z ZUS jest to, aby prawo do niego wynikało m.in. z "regulaminu wynagradzania". Dyrektor HR zauważa: "My nie mamy i nie możemy mieć regulaminu wynagradzania dla zleceniobiorców, bo to pojęcie z Kodeksu pracy!" Jak poprawnie ukształtować dokumentację dla Umów Zlecenie, aby spełnić ten twardy wymóg formalny z MPiPS?',
    options: [
      '"Wykorzystujemy tu Kodeks cywilny i zasadę swobody umów (art. 353¹ KC). Choć zleceniobiorcy nie podlegają pod pracowniczy \'Regulamin Wynagradzania\', pracodawca może utworzyć odrębny dokument: \'Regulamin przyznawania świadczeń dla zleceniobiorców\' lub po prostu odpowiednio zaktualizować (zaneksować) same umowy zlecenie. ZUS w pełni akceptuje takie cywilnoprawne odpowiedniki jako spełnienie wymogu z rozporządzenia."',
      '"W przypadku umów zlecenie wymóg \'regulaminu\' jest z mocy prawa anulowany, ponieważ zleceniobiorca wystawia własne rachunki. Wystarczy, że dopisze on pozycję \'Voucher\' do swojego miesięcznego zestawienia godzin."',
      '"Zleceniobiorcy muszą zostać fikcyjnie włączeni do pracowniczego Regulaminu Wynagradzania na okres 1 miesiąca w roku (zwykle w styczniu), co pozwala na utrzymanie zwolnienia przez kolejne 11 miesięcy obrotowych."',
      '"Rozwiązujemy to poprzez nakazanie zleceniobiorcom założenia jednoosobowej działalności gospodarczej (JDG). Dzięki temu podpisują oni z nami kontrakt B2B, który w ogóle nie podlega pod jakiekolwiek regulaminy wewnątrzzakładowe."'
    ],
    correctAnswer: '"Wykorzystujemy tu Kodeks cywilny i zasadę swobody umów (art. 353¹ KC). Choć zleceniobiorcy nie podlegają pod pracowniczy \'Regulamin Wynagradzania\', pracodawca może utworzyć odrębny dokument: \'Regulamin przyznawania świadczeń dla zleceniobiorców\' lub po prostu odpowiednio zaktualizować (zaneksować) same umowy zlecenie. ZUS w pełni akceptuje takie cywilnoprawne odpowiedniki jako spełnienie wymogu z rozporządzenia."'
  },
  {
    id: 'q3-56',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Zleceniobiorcy w firmie klienta pracują projektowo i zarabiają nieregularnie. Klient pyta: "Czy skoro to są umowy zlecenie (elastyczne), to możemy pominąć potrącanie tej symbolicznej 1 złotówki i po prostu fundować im Vouchery w 100%, traktując to jako dodatek do projektu?"',
    options: [
      '"Absolutnie nie. Warunek częściowej odpłatności ponoszonej przez ubezpieczonego (np. potrącenie 1 zł z rachunku do umowy zlecenia) jest warunkiem bezwzględnym i nienaruszalnym – wynika on wprost z §2 pkt 26 MPiPS. Jego brak, niezależnie czy mówimy o etacie, czy o zleceniu, spowoduje natychmiastową utratę zwolnienia ze składek ZUS dla całej wartości Vouchera."',
      '"Tak, w przypadku umów zlecenia częściowa odpłatność jest zakazana, ponieważ Kodeks cywilny zabrania potrąceń z wierzytelności bez wyroku sądu. Dlatego fundowanie w 100% to jedyna legalna droga przy UZ."',
      '"Można tak zrobić, ale wtedy wartość Vouchera musi zostać proporcjonalnie pomniejszona o podatek od spadków i darowizn, który firma płaci za zleceniobiorcę na koniec roku rozliczeniowego."',
      '"Jest to dopuszczalne tylko wtedy, gdy zleceniobiorca sam udowodni, że Voucher został wykorzystany w 100% do celów związanych z wykonaniem powierzonego mu zlecenia (np. dostęp do branżowych kursów online)."'
    ],
    correctAnswer: '"Absolutnie nie. Warunek częściowej odpłatności ponoszonej przez ubezpieczonego (np. potrącenie 1 zł z rachunku do umowy zlecenia) jest warunkiem bezwzględnym i nienaruszalnym – wynika on wprost z §2 pkt 26 MPiPS. Jego brak, niezależnie czy mówimy o etacie, czy o zleceniu, spowoduje natychmiastową utratę zwolnienia ze składek ZUS dla całej wartości Vouchera."'
  },
  {
    id: 'q3-57',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Klient to duża agencja marketingowa, która zatrudnia 40 asystentów na Umowie Zlecenie. Wszyscy z nich mają status ucznia/studenta i nie ukończyli 26. roku życia. Doradca Stratton Prime przygotowuje dla nich kalkulację finansową. Jaki będzie realny wynik oszczędności na ZUS z wdrożenia modelu Vouchera dla tej konkretnej grupy?',
    options: [
      '"Oszczędność finansowa z tytułu ZUS wyniesie dokładnie 0 zł. Osoby do 26. r.ż. ze statusem ucznia/studenta wykonujące umowę zlecenia z mocy prawa w ogóle nie podlegają ubezpieczeniom społecznym ani zdrowotnemu (ich wynagrodzenie brutto równa się netto). Nie możemy wyłączyć składek z czegoś, co i tak nie jest oskładkowane. Możemy wdrożyć im Vouchery jako czysty benefit, ale bez mechaniki inżynierii finansowej."',
      '"Oszczędność będzie podwójna. Ponieważ studenci są już zwolnieni z ZUS, wartość Vouchera obniża dodatkowo ich podstawę opodatkowania podatkiem VAT, generując tzw. tarczę studencką dla pracodawcy."',
      '"Wprowadzenie Vouchera u takich osób automatycznie pozbawia ich statusu studenta w oczach ZUS, przez co agencja musiałaby zacząć odprowadzać od nich pełne składki, dlatego tacy zleceniobiorcy mają absolutny zakaz wchodzenia do systemu."',
      '"Oszczędność wyniesie równe 50% tego, co na etacie, ponieważ dla studentów do 26. r.ż. na umowach zlecenia stosuje się obniżoną stawkę tzw. \'małego ZUS-u cywilnego\', z którego Voucher pozwala legalnie uciec."'
    ],
    correctAnswer: '"Oszczędność finansowa z tytułu ZUS wyniesie dokładnie 0 zł. Osoby do 26. r.ż. ze statusem ucznia/studenta wykonujące umowę zlecenia z mocy prawa w ogóle nie podlegają ubezpieczeniom społecznym ani zdrowotnemu (ich wynagrodzenie brutto równa się netto). Nie możemy wyłączyć składek z czegoś, co i tak nie jest oskładkowane. Możemy wdrożyć im Vouchery jako czysty benefit, ale bez mechaniki inżynierii finansowej."'
  },
  {
    id: 'q3-59',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Szefowa Działu Płac zadaje kluczowe pytanie operacyjne: "Mamy pracownika na UoP, który idzie na długotrwałe zwolnienie lekarskie (L4). Jak Voucher wpływa na jego zasiłek chorobowy z ZUS?"',
    options: [
      '"Zgodnie z zasadami ZUS, składniki wynagrodzenia (takie jak stały Voucher), do których pracownik zachowuje prawo w okresie pobierania zasiłku chorobowego, nie są wliczane do podstawy wymiaru tego zasiłku. Oznacza to, że podstawa zasiłku (wyliczana z gotówki) będzie niższa, ale w zamian pracownik na L4 nadal co miesiąc otrzymuje od firmy pełny Voucher. W ujęciu ogólnym bilans pracownika zostaje zabezpieczony."',
      '"Wartość Vouchera jest w 100% wliczana do podstawy zasiłku chorobowego. ZUS traktuje świadczenia cyfrowe jako element stałego wynagrodzenia, więc pracownik otrzymuje wyższy zasiłek na konto, a platforma EBS zawiesza jego Voucher na czas choroby."',
      '"Na czas zwolnienia lekarskiego (L4) pracownik traci prawo do wszelkich świadczeń rzeczowych z regulaminu wynagradzania, dlatego Voucher ulega proporcjonalnemu potrąceniu za każdy dzień nieobecności w pracy."',
      '"Ponieważ Voucher jest wyłączony ze składek ZUS w czasie zdrowia, w czasie choroby ZUS nakłada obowiązek opłacenia zaległych składek od Vouchera wstecz, aby móc legalnie wypłacić zasiłek chorobowy z państwowej kasy."'
    ],
    correctAnswer: '"Zgodnie z zasadami ZUS, składniki wynagrodzenia (takie jak stały Voucher), do których pracownik zachowuje prawo w okresie pobierania zasiłku chorobowego, nie są wliczane do podstawy wymiaru tego zasiłku. Oznacza to, że podstawa zasiłku (wyliczana z gotówki) będzie niższa, ale w zamian pracownik na L4 nadal co miesiąc otrzymuje od firmy pełny Voucher. W ujęciu ogólnym bilans pracownika zostaje zabezpieczony."'
  },
  {
    id: 'q3-61',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Pracownik przebywa przez 3 tygodnie w miesiącu na pełnopłatnym urlopie wypoczynkowym. Jak w świetle przepisów o wynagrodzeniu urlopowym kształtuje się jego prawo do przypisanego Vouchera Cyfrowego?',
    options: [
      '"Zgodnie z ogólną zasadą Kodeksu pracy (art. 152 i kolejne), za czas urlopu pracownikowi przysługuje wynagrodzenie, jakie by otrzymał, gdyby w tym czasie pracował. Ponieważ Voucher jest stałym, comiesięcznym świadczeniem określonym w regulaminie, przysługuje on pracownikowi w pełnej wysokości – nie ulega zawieszeniu ani proporcjonalnemu obniżeniu z powodu urlopu."',
      '"W czasie urlopu wypoczynkowego pracownik nie świadczy pracy, a więc Voucher, który jest świadczeniem \'związanym z praca\', ulega zawieszeniu, a w jego miejsce pracodawca wypłaca tzw. świadczenie urlopowe z odpisu na ZFŚS."',
      '"Voucher jest przypisywany proporcjonalnie do dni przepracowanych. Skoro pracownik był w pracy tylko 1 tydzień z 4, to otrzyma dokładnie 25% nominalnej wartości Vouchera przewidzianej na dany miesiąc."',
      '"Aby zachować prawo do Vouchera podczas urlopu wypoczynkowego, pracownik musi zalogować się do systemu EBS i udowodnić, że zrealizował usługę z katalogu \'Turystyka i Wypoczynek\'."'
    ],
    correctAnswer: '"Zgodnie z ogólną zasadą Kodeksu pracy (art. 152 i kolejne), za czas urlopu pracownikowi przysługuje wynagrodzenie, jakie by otrzymał, gdyby w tym czasie pracował. Ponieważ Voucher jest stałym, comiesięcznym świadczeniem określonym w regulaminie, przysługuje on pracownikowi w pełnej wysokości – nie ulega zawieszeniu ani proporcjonalnemu obniżeniu z powodu urlopu."'
  },
  {
    id: 'q3-62',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Radca prawny klienta czyta rozporządzenie i mówi z uśmiechem: "Panie doradco, to rozporządzenie pochodzi z 1998 roku. Wtedy nikt nie słyszał o usługach cyfrowych, aplikacjach czy platformach wellbeingowych! Ten przepis dotyczy deputatów węglowych i mydła dla górników. Stosowanie go do cyfrowego Vouchera to nadużycie." Jak doradca obala ten argument?',
    options: [
      '"Przepis z 1998 r. celowo posługuje się szerokim i otwartym katalogiem, mówiąc o prawie do zakupu po niższych cenach \'niektórych artykułów, przedmiotów lub usług\'. Prawo nie wymaga aktualizacji za każdym razem, gdy powstaje nowa technologia. Usługa cyfrowa (np. dostęp do platformy VOD czy telemedycyny) jest pełnoprawną \'usługą\' w rozumieniu prawa cywilnego. Potwierdza to ugruntowane orzecznictwo ZUS i sądów powszechnych (w tym z 2025 r.), które bez problemu subsumuje nowoczesne benefity pod ten przepis."',
      '"Ma Pan rację, dlatego w 2023 roku weszła w życie tajna nowelizacja tego rozporządzenia (tzw. Tarcza Cyfrowa), która w osobnym podpunkcie (pkt 26a) wprost wymienia \'tokeny, vouchery elektroniczne i dostęp do platform SaaS\', co w pełni nas legalizuje."',
      '"Zgadza się, że przepis jest anachroniczny, dlatego nasz model opiera się na wykładni celowościowej Sądu Najwyższego, która stanowi, że w razie wątpliwości ubezpieczony ma prawo do wyboru najkorzystniejszej dla siebie interpretacji podatkowej."',
      '"ZUS w ogóle nie interesuje się rokiem wydania rozporządzenia, ponieważ w 2018 roku Polska przystąpiła do unijnej konwencji o swobodzie przepływu usług cyfrowych, która z mocy prawa unieważniła wszelkie polskie ograniczenia w tym zakresie."'
    ],
    correctAnswer: '"Przepis z 1998 r. celowo posługuje się szerokim i otwartym katalogiem, mówiąc o prawie do zakupu po niższych cenach \'niektórych artykułów, przedmiotów lub usług\'. Prawo nie wymaga aktualizacji za każdym razem, gdy powstaje nowa technologia. Usługa cyfrowa (np. dostęp do platformy VOD czy telemedycyny) jest pełnoprawną \'usługą\' w rozumieniu prawa cywilnego. Potwierdza to ugruntowane orzecznictwo ZUS i sądów powszechnych (w tym z 2025 r.), które bez problemu subsumuje nowoczesne benefity pod ten przepis."'
  },
  {
    id: 'q3-63',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Dlaczego w mechanice Vouchera Eliton Prime™ tak fanatycznie pilnujemy potrącenia pracownikowi dokładnie 1 zł z jego wynagrodzenia netto i dlaczego całkowicie darmowy Voucher rozbija cały model?',
    options: [
      '"Wynika to wprost z literalnego brzmienia §2 pkt 26 MPiPS. Przepis warunkuje zwolnienie z ZUS tym, aby korzyść polegała na \'uprawnieniu do zakupu po cenach niższych niż detaliczne\'. Aby nastąpił \'zakup po niższej cenie\', pracownik musi ponieść jakąkolwiek, choćby symboliczną odpłatność (np. 1 zł). Jeśli Voucher będzie w 100% sfinansowany przez pracodawcę (darmowy), nie ma \'zakupu\' i świadczenie w całości podlega oskładkowaniu."',
      '"Potrącenie 1 zł to wyłącznie wymóg techniczny operatora systemu płatności Przelewy24, niezbędny do wygenerowania unikalnego tokena autoryzacyjnego, bez którego ZUS nie jest w stanie zaksięgować raportu miesięcznego."',
      '"Rozporządzenie MPiPS wymaga, aby świadczenia były finansowane z zysku pracodawcy. Potrącenie 1 zł sprawia, że Voucher staje się umową subskrypcyjną, co automatycznie wyłącza go spod rygoru opłacania składki zdrowotnej."',
      '"Przepis nakazuje, aby częściowa odpłatność wynosiła dokładnie 1% minimalnego wynagrodzenia za pracę. Kwota 1 zł to tylko wariant startowy, który w kolejnym kwartale księgowość musi odpowiednio wyrównać i zwaloryzować."'
    ],
    correctAnswer: '"Wynika to wprost z literalnego brzmienia §2 pkt 26 MPiPS. Przepis warunkuje zwolnienie z ZUS tym, aby korzyść polegała na \'uprawnieniu do zakupu po cenach niższych niż detaliczne\'. Aby nastąpił \'zakup po niższej cenie\', pracownik musi ponieść jakąkolwiek, choćby symboliczną odpłatność (np. 1 zł). Jeśli Voucher będzie w 100% sfinansowany przez pracodawcę (darmowy), nie ma \'zakupu\' i świadczenie w całości podlega oskładkowaniu."'
  },
  {
    id: 'q3-65',
    category: Category.LAW,
    type: QuestionType.MULTIPLE_CHOICE,
    text: 'Podczas audytu sprawdzającego wiedzę wdrożeniowca, audytor prosi o wymienienie bez zająknięcia trzech żelaznych, nierozerwalnych warunków z §2 pkt 26 rozporządzenia MPiPS, których łączne (kumulatywne) spełnienie gwarantuje bezpieczeństwo modelu. Który zestaw jest w 100% poprawny?',
    options: [
      '1. Zapisanie prawa do świadczenia w regulaminie wynagradzania (lub układzie zbiorowym). 2. Forma rzeczowa, niematerialna lub usługowa (świadczenie niepieniężne). 3. Prawo do zakupu po cenie niższej niż detaliczna (częściowa odpłatność pracownika, u nas 1 zł).',
      '1. Zgoda wszystkich pracowników wyrażona w formie aktu notarialnego. 2. Finansowanie świadczenia w całości ze środków Zakładowego Funduszu Świadczeń Socjalnych. 3. Ograniczenie wartości Vouchera do kwoty wolnej od podatku.',
      '1. Wydanie Vouchera w formie fizycznej (plastikowa karta). 2. Akceptacja modelu przez terenowy inspektorat ZUS w ciągu 30 dni. 3. Wykorzystanie Vouchera wyłącznie na cele rehabilitacyjne i medyczne.',
      '1. Forma cyfrowa zaaprobowana przez ustawę o usługach zaufania. 2. Waloryzacja częściowej odpłatności zgodnie ze wskaźnikiem inflacji. 3. Wykazanie Vouchera na liście płac jako przychód wolny od PIT.'
    ],
    correctAnswer: '1. Zapisanie prawa do świadczenia w regulaminie wynagradzania (lub układzie zbiorowym). 2. Forma rzeczowa, niematerialna lub usługowa (świadczenie niepieniężne). 3. Prawo do zakupu po cenie niższej niż detaliczna (częściowa odpłatność pracownika, u nas 1 zł).'
  }
];
