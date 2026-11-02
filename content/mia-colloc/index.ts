import type { Exam } from '../../src/content/schema';
import { vectors, dotResearch } from './vectors';
import { logic } from './logic';
import { line, plane } from './geometry';
import { subspaces, basis, projections, gramSchmidt } from './subspaces';
import { matrices, crossTriple } from './matrices';
import { limitArith, limitDef, continuity, limitInf } from './limits';
import { complex } from './complex';
import { derivative, powerDerivative } from './derivative';
import { tasks } from './tasks';
import { how } from './how';

const LINAL = ['vectors', 'dot-research', 'line', 'plane', 'subspaces', 'basis', 'projections', 'gram-schmidt', 'matrices', 'cross-triple'];

export const miaColloc: Exam = {
  id: 'mia-colloc',
  subject: 'Основы математического анализа и линейной алгебры',
  kind: 'Коллоквиум',
  short: 'Коллоквиум по МИА',
  icon: '∇',
  dates: ['2026-11-02', '2026-11-06'],
  when: '2–6 ноября',
  format: '45 минут подготовки + 30 минут ответа, без материалов',
  scope: 'Недели 1–8: векторы, прямые и плоскости, подпространства и базис, проекции, пределы, непрерывность, комплексные числа, производная',
  levels: false,
  star: 'blue',
  features: ['topics', 'cards', 'proofs', 'tasks', 'mock'],
  mock: {
    kind: 'ticket',
    title: 'Пробный билет',
    prepMin: 45,
    answerMin: 30,
    layout: {
      definitions: 4,
      statements: 3,
      proofs: 1,
      taskSlots: [
        { label: 'Векторы, геометрия, подпространства', topics: LINAL },
        { label: 'Пределы и непрерывность', topics: ['limit-arith', 'limit-def', 'continuity', 'limit-inf'] },
        { label: 'Производная', topics: ['derivative', 'power-derivative'] },
        { label: 'Комплексные числа', topics: ['complex'] },
      ],
    },
  },
  tasksNote: 'Задачи из демо-билета и ДЗ 1–8 и по их мотивам, у каждой указан источник. В билете — 1 балл за задачу. Сначала реши сам, потом открывай подсказки по одной, и только потом решение.',
  how,
  topics: [
    vectors, dotResearch, logic, line, plane, subspaces, basis, projections, gramSchmidt,
    matrices, crossTriple, limitArith, limitDef, continuity, limitInf, complex, derivative, powerDerivative,
  ],
  tasks,
};
