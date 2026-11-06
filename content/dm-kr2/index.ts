import type { Exam } from '../../src/content/schema';
import { binom } from './binom';
import { recurrences } from './recurrences';
import { perms } from './perms';
import { guessing } from './guessing';
import { tasks } from './tasks';
import { how } from './how';

// Образец: linal-kr2. Лектор назвал только состав: 7 задач, последняя сложнее. Дата, 60 минут и баллы — наше предположение.

export const dmKr2: Exam = {
  id: 'dm-kr2',
  subject: 'Дискретная математика',
  kind: 'Контрольная работа 2',
  short: 'КР2 по дискре',
  icon: 'σ',
  dates: ['2026-11-09', '2026-11-13'],
  when: '9–13 ноября',
  format: '60 минут письменно, без материалов',
  scope: 'Недели 6–9: сочетания с повторениями, бином Ньютона и тождества, числа Фибоначчи, рекурренты, перестановки, угадывание и оптимальность',
  levels: false,
  star: 'red',
  features: ['topics', 'cards', 'proofs', 'tasks', 'mock'],
  mock: {
    kind: 'test',
    title: 'Пробная КР',
    minutes: 60,
    slots: [
      {
        label: 'Сочетания с повторениями, шары и перегородки',
        skills: ['stars-bars', 'binomial'],
        points: 1,
      },
      { label: 'Тождество с биномиальными коэффициентами', skills: ['identities'], points: 1 },
      { label: 'Линейная рекуррента второго порядка', skills: ['linear-rec', 'fibonacci'], points: 1 },
      { label: 'Комбинаторная задача через рекурренту', skills: ['comb-rec'], points: 1 },
      { label: 'Перестановки: циклы, порядок, чётность', skills: ['perms'], points: 1 },
      { label: 'Угадывание и оптимальность', skills: ['guessing', 'restricted'], points: 1 },
      { label: 'Задача повышенной сложности', skills: ['hard'], points: 1 },
    ],
  },
  tasksNote:
    'Задачи по мотивам семинарских задач из лонгридов 6–9, ДЗ 7 и КР2 прошлого года, числа изменены. На КР 7 задач, последняя повышенной сложности; сколько стоит каждая, неизвестно, 1 балл за задачу здесь — наше предположение. Каждый ответ нужно обосновать. Сначала реши сам, потом открывай подсказки по одной, и только потом решение.',
  skills: [
    { id: 'stars-bars', title: 'Сочетания с повторениями' },
    { id: 'binomial', title: 'Бином Ньютона и треугольник Паскаля' },
    { id: 'identities', title: 'Тождества с биномиальными коэффициентами' },
    { id: 'fibonacci', title: 'Числа Фибоначчи' },
    { id: 'linear-rec', title: 'Линейные рекурренты и формула Бине' },
    { id: 'comb-rec', title: 'Комбинаторика через рекурренты' },
    { id: 'perms', title: 'Перестановки: циклы, порядок, чётность' },
    { id: 'guessing', title: 'Бинпоиск и оптимальное угадывание' },
    { id: 'restricted', title: 'Угадывание с ограничениями' },
    { id: 'hard', title: 'Повышенная сложность' },
  ],
  statementQuestions: true,
  sourceLabel: 'Лонгрид',
  how,
  topics: [binom, recurrences, perms, guessing],
  tasks,
};
