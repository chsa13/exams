import type { Exam, TaskType } from '../../src/content/schema';
import { spaces } from './spaces';
import { maps } from './maps';
import { kernel } from './kernel';
import { tasks } from './tasks';
import { how } from './how';

// На КР «найди и обоснуй»: «верно ли» и «докажи» остаются в банке, но в пробную КР не идут.
const TASK_TYPES: TaskType[] = ['compute', 'construct'];

export const linalKr2: Exam = {
  id: 'linal-kr2',
  subject: 'Линейная алгебра и геометрия',
  kind: 'Контрольная работа 2',
  short: 'КР2 по линалу',
  icon: 'λ',
  dates: ['2026-11-05', '2026-11-05'],
  when: '5 ноября, 10:00–11:00',
  format: '60 минут письменно, без материалов',
  scope: 'Недели 6–8: базисы и координаты, матрицы отображений, ядро и образ, пересечение подпространств, прямое дополнение, проекторы',
  levels: false,
  star: 'red',
  features: ['topics', 'cards', 'proofs', 'tasks', 'mock'],
  mock: {
    kind: 'test',
    title: 'Пробная КР',
    minutes: 60,
    // Лектор назвал только сумму: 11 баллов, в оценку идёт 10. Позиции и их баллы — наше предположение.
    scoreCap: 10,
    slots: [
      { label: 'Базис и координаты: многочлены и матрицы как векторы', skills: ['coords', 'vectors'], types: TASK_TYPES, points: 2 },
      { label: 'Матрица отображения по его действию', skills: ['map-matrix'], types: TASK_TYPES, points: 2 },
      { label: 'Ядро, образ, инъективность и сюръективность', skills: ['ker-im'], types: TASK_TYPES, points: 2 },
      { label: 'Пересечение и сумма подпространств', skills: ['intersection'], types: TASK_TYPES, points: 2 },
      { label: 'Прямое дополнение и разложение в прямую сумму', skills: ['complement'], types: TASK_TYPES, points: 1.5 },
      { label: 'Проекция вдоль подпространства, матрица проектора', skills: ['projection'], types: TASK_TYPES, points: 1.5 },
    ],
  },
  tasksNote:
    'Задачи по мотивам ДЗ и семинаров недель 6–8, числа изменены. На КР 11 баллов, в оценку идёт максимум 10; сколько стоит каждая задача, неизвестно, баллы здесь — наше предположение. Вычисления короткие, а каждый ответ нужно обосновать. Сначала реши сам, потом открывай подсказки по одной, и только потом решение.',
  skills: [
    { id: 'coords', title: 'Базис и координаты вектора' },
    { id: 'vectors', title: 'Многочлены и матрицы как векторы' },
    { id: 'map-matrix', title: 'Матрица отображения' },
    { id: 'ker-im', title: 'Ядро и образ' },
    { id: 'intersection', title: 'Пересечение подпространств' },
    { id: 'complement', title: 'Прямое дополнение' },
    { id: 'projection', title: 'Проекция и проектор' },
  ],
  how,
  topics: [spaces, maps, kernel],
  tasks,
};
