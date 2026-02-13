# Stratton Prime - Portal Certyfikacji Doradców

## 1. Wstęp
**Stratton Prime Certification Portal** to profesjonalny, korporacyjny system egzaminacyjny zaprojektowany dla doradców biznesowych. Aplikacja łączy w sobie rygorystyczny silnik testowy z zaawansowanym panelem administracyjnym, automatyzacją wysyłki wyników oraz generowaniem certyfikatów premium. Interfejs został zainspirowany systemem Microsoft Dynamics 365, co zapewnia przejrzystość i biznesową estetykę.

---

## 2. Role w Systemie

### **A. Doradca (Użytkownik)**
*   **Cel:** Potwierdzenie kompetencji merytorycznych z zakresu prawa i wiedzy produktowej.
*   **Uprawnienia:** Logowanie, weryfikacja danych osobowych, przystąpienie do egzaminu, pobranie certyfikatu po uzyskaniu wyniku pozytywnego.

### **B. Manager / Przełożony**
*   **Cel:** Nadzór nad postępami podległych pracowników.
*   **Funkcjonalność:** Otrzymuje automatyczne raporty e-mail po każdej próbie egzaminacyjnej swojego pracownika. Widnieje w hierarchii struktury organizacyjnej.

### **C. Administrator Systemu**
*   **Cel:** Zarządzanie bazą wiedzy, kadrami oraz konfiguracją wizualną.
*   **Uprawnienia:** Zarządzanie pytaniami (import/export), zarządzanie bazą użytkowników, podgląd wszystkich wyników (Audit Log), projektowanie layoutu certyfikatu w trybie WYSIWYG, analiza statystyk (KPI).

---

## 3. Kluczowe Funkcjonalności

### **Silnik Egzaminacyjny**
*   **Reżim czasowy:** Dokładnie 45 sekund na każde pytanie.
*   **Sudden Death:** Brak możliwości powrotu do poprzedniego pytania po udzieleniu odpowiedzi lub upływie czasu.
*   **Losowanie:** Każdy test składa się z 20 pytań (mieszanka pytań zamkniętych, prawda/fałsz i otwartych), dobieranych losowo z większej bazy.
*   **Próg zaliczenia:** 71% (min. 15/20 poprawnych odpowiedzi).

### **Bezpieczeństwo (Anti-Cheat)**
*   **Session Lock:** System wykrywa odświeżenie strony lub zamknięcie karty w trakcie testu. Próba taka jest natychmiastowo uznawana za nieudaną (0%), a doradca traci jedną z trzech dostępnych prób.
*   **Limit prób:** Maksymalnie 3 podejścia. Po ich wyczerpaniu system blokuje dostęp do egzaminu (wymagana interwencja admina).

### **Panel Administracyjny**
*   **Dashboard:** Statystyki zdawalności w czasie rzeczywistym, licznik egzaminów, kontrola bazy kadrowej.
*   **Zarządzanie Certyfikatami:** Edytor wizualny pozwalający na przesuwanie pól (Drag & Drop) oraz zmianę wielkości fontów na certyfikacie.
*   **Struktura Organizacyjna:** Dynamicznie generowany graf hierarchii firmy z możliwością eksportu do formatu SVG.
*   **Import/Export:** Wsparcie dla plików Excel (XLSX) i tekstowych (TXT) przy masowym dodawaniu pytań i pracowników.

---

## 4. Główne Procesy

### **Proces Autoryzacji i Startu**
1.  Użytkownik loguje się danymi służbowymi.
2.  System sprawdza limit prób oraz ewentualne blokady sesji.
3.  Użytkownik potwierdza poprawność danych (imię, nazwisko, ID hierarchiczne).
4.  Wyświetlany jest instruktaż i następuje 10-sekundowe odliczanie do startu.

### **Proces Certyfikacji**
1.  Udzielanie odpowiedzi w rygorze czasowym.
2.  Automatyczne przeliczanie wyniku po ostatnim pytaniu.
3.  Zapisanie szczegółowego logu odpowiedzi (Audit Trail) w bazie danych.
4.  Weryfikacja progu 71%.

### **Proces Automatyzacji Poegzaminacyjnej**
1.  **Generowanie Dokumentów:** W przypadku sukcesu system tworzy PDF z hologramem premium i unikalnym ID.
2.  **Powiadomienia E-mail (EmailJS):**
    *   **Do Doradcy:** Gratulacje lub informacja o konieczności poprawy (odmiana imienia przez Wołacz).
    *   **Do Managera:** Szczegółowy raport o wyniku pracownika.
    *   **Do Centrali (HQ):** Alert o nadaniu uprawnień lub o blokadzie pracownika (po 3 nieudanych próbach).

---

## 5. Specyfikacja Techniczna
*   **Frontend:** React 18, TypeScript, Tailwind CSS.
*   **Generowanie PDF:** jsPDF + html2canvas.
*   **Komunikacja:** EmailJS (wysyłka raportów bez backendu).
*   **Dane:** LocalStorage z mechanizmem wersji i "self-healing" (automatyczna naprawa bazy przy aktualizacji wersji).
*   **Parsowanie plików:** XLSX.js dla arkuszy kalkulacyjnych, PDF.js dla konwersji szablonów.

---
© 2025 Stratton Prime Cloud. Wszystkie prawa zastrzeżone.