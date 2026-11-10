import type { Exam } from '../../src/content/schema';
import { matrices } from './matrices';
import { gauss } from './gauss';
import { systems } from './systems';
import { geometry } from './geometry';
import { determinants } from './determinants';
import { spaces } from './spaces';
import { maps } from './maps';
import { kernel } from './kernel';
import { rank } from './rank';
import { canonical } from './canonical';
import { tasks } from './tasks';
import { how } from './how';

// Образец: mia-colloc.

export const linalColloc: Exam = {
  id: 'linal-colloc',
  subject: 'Линейная алгебра и геометрия',
  kind: 'Коллоквиум',
  short: 'Коллоквиум по линалу',
  icon: '⊕',
  dates: ['2026-12-07', '2026-12-14'],
  when: '7–14 декабря',
  format: '40 минут подготовки + ответ, без материалов',
  scope: 'Недели 1–10: матрицы, метод Гаусса, системы, прямые и плоскости, определители, пространства и базисы, линейные отображения, ядро и образ, ранг, канонический вид',
  levels: false,
  star: 'red',
  features: ['topics', 'cards', 'proofs', 'tasks', 'mock'],
  mock: {
    kind: 'ticket',
    title: 'Пробный билет',
    prepMin: 40,
    answerMin: 20,
    layout: {
      definitions: 0,
      statements: 0,
      proofs: 0,
      proofLists: [
        { id: 'easy', title: 'Лёгкий вопрос', tag: 'лёгкий', count: 2, points: 2 },
        { id: 'core', title: 'Содержательный вопрос', tag: 'содержательный', count: 1, points: 2 },
      ],
      taskSlots: [
        { label: 'Задача на понимание', points: 2 },
        { label: 'Задача на понимание', points: 2 },
      ],
    },
  },
  tasksNote: 'Задачи на понимание в стиле примера билета: примеры, контрпримеры и «верно ли» с объяснением. Список таких задач лектор не публикует, в билете их две, по 2 балла. Сначала реши сам, потом открывай подсказки по одной, и только потом решение.',
  statementQuestions: false,
  sourceLabel: 'Лекция',
  how,
  topics: [matrices, gauss, systems, geometry, determinants, spaces, maps, kernel, rank, canonical],
  tasks,
};
