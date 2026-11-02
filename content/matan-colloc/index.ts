import type { Exam } from '../../src/content/schema';
import { sets, logic } from './sets';
import { summation } from './summation';
import { sequences, seqLimit1 } from './sequences';
import { seqLimit2, seqLimit3 } from './seqlimit';
import { complex, functionsTopic, funcLimit } from './functions';
import { continuity } from './continuity';
import { tasks } from './tasks';
import { how } from './how';

export const matanColloc: Exam = {
  id: 'matan-colloc',
  subject: 'Математический анализ',
  kind: 'Коллоквиум',
  short: 'Коллоквиум по матану',
  icon: '∫',
  dates: ['2026-10-26', '2026-10-30'],
  when: '26–30 октября',
  format: '45 минут подготовки + 30 минут ответа, без материалов',
  scope: 'Лонгриды 1–15: множества и логика, суммирование, последовательности и их пределы, комплексные числа, функции, предел функции, непрерывность',
  levels: true,
  features: ['topics', 'cards', 'proofs', 'quant', 'tasks', 'mock'],
  mock: { kind: 'ticket', title: 'Пробный билет', prepMin: 45, answerMin: 30 },
  tasksNote: 'Задачи в стиле блока задач билета, в билете — 1–1,5 балла за задачу. Сначала реши сам, потом открывай подсказки по одной, и только потом решение.',
  how,
  // Темы в порядке курса
  topics: [sets, logic, summation, sequences, seqLimit1, seqLimit2, seqLimit3, complex, functionsTopic, funcLimit, continuity],
  tasks,
};
