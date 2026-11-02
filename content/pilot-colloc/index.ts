import type { Exam } from '../../src/content/schema';
import { numbers, sets } from './numbers';
import { reals } from './reals';
import { asymptotics, seqLimit } from './sequences';
import { completeness } from './completeness';
import { topology, compactness } from './topology';
import { continuity, funcLimits, compactFunctions } from './functions';
import { how } from './how';

export const pilotColloc: Exam = {
  id: 'pilot-colloc',
  subject: 'Математический анализ (пилот)',
  kind: 'Коллоквиум',
  short: 'Коллоквиум по матану (пилот)',
  icon: 'ℝ',
  dates: ['2026-11-18', '2026-11-18'],
  when: '18 ноября',
  format: '~45 минут подготовки + ответ, без материалов',
  scope: 'Конспект Лопаткина, главы 1, 2, 4: построение чисел, последовательности, топология прямой, непрерывность',
  levels: false,
  star: 'black',
  features: ['topics', 'cards', 'proofs', 'mock'],
  mock: {
    kind: 'ticket',
    title: 'Пробный билет',
    prepMin: 45,
    answerMin: 30,
    layout: {
      definitions: 5,
      statements: 0,
      proofs: 4,
      proofPoints: [1.5, 2, 2, 2.5],
      theoryGate: 4,
      scoreCap: 10,
      taskSlots: [],
    },
  },
  tasksNote: '',
  statementQuestions: false,
  sourceLabel: 'Конспект, гл.',
  how,
  topics: [numbers, sets, reals, asymptotics, seqLimit, completeness, topology, compactness, continuity, funcLimits, compactFunctions],
  tasks: [],
};
