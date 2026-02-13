
import { Question } from '../types';
import { PART_1 } from './sources/part1_LawBasics';
import { PART_2 } from './sources/part2_Supplement';
import { PART_3 } from './sources/part3_New';

// Łączenie wszystkich modułów w jedną bazę
// Kolejność jest ważna dla spójności indeksowania, choć w aplikacji używamy ID
export const QUESTIONS_DB: Question[] = [
    ...PART_1,
    ...PART_2,
    ...PART_3
];
