import type { Exam } from '../src/content/schema';
import { matanColloc } from './matan-colloc';
import { linalKr2 } from './linal-kr2';
import { miaColloc } from './mia-colloc';
import { pilotColloc } from './pilot-colloc';
import { dmKr2 } from './dm-kr2';

/** Все экзамены сборника. Новый экзамен — папка content/<id>/ с конфигом Exam и строка здесь. */
export const exams: Exam[] = [matanColloc, miaColloc, pilotColloc, linalKr2, dmKr2];
