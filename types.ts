
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // Single Choice (Radio)
  MULTI_SELECT = 'MULTI_SELECT',       // Multiple Choice (Checkbox)
  OPEN = 'OPEN',
  TRUE_FALSE = 'TRUE_FALSE'
}

export enum Category {
  LAW = 'Prawo',
  PRODUCT_KNOWLEDGE = 'Wiedza o produktach'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: Category;
  options?: string[];
  correctAnswer?: string; // Dla MULTI_SELECT wartości rozdzielone znakiem '|'
}

export interface User {
  id: string;
  email: string;
  password?: string; // Wygenerowane hasło
  firstName: string;
  lastName: string;
  hierarchicalId: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
  managerName?: string;
  managerEmail?: string;
}

export interface AnswerLog {
  questionId: string;
  questionText: string;
  type: QuestionType;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface ExamSession {
  id: string;
  userId: string;
  questions: Question[];
  answers: Record<string, { value: string; justification?: string }>;
  startTime: number;
  endTime?: number;
  score?: number;
  passed?: boolean;
}

export interface ExamResult {
  id: string;
  userName: string;
  hierarchicalId: string;
  email: string;
  managerEmail?: string;
  managerName?: string;
  score: number;
  passed: boolean;
  date: string;
  answersLog?: AnswerLog[]; // Nowe pole: Pełna historia odpowiedzi
}

// --- NOWE TYPY DLA KONFIGURACJI CERTYFIKATU ---

export interface CertFieldConfig {
  visible: boolean;
  x: number;       // Pozycja w poziomie (%)
  y: number;       // Pozycja w pionie (%)
  fontSize: number; // px (dla tekstów) LUB szerokość/wysokość (dla hologramu)
  color: string;   // hex
  fontFamily: string; // Nowe pole: Rodzaj czcionki
  fontWeight: string | number;
  align: 'left' | 'center' | 'right';
}

export interface CertificateLayout {
  fullName: CertFieldConfig;
  hierarchicalId: CertFieldConfig;
  date: CertFieldConfig;
  hologram: CertFieldConfig; // Nowe pole
}
