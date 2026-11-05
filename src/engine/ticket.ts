import type { MockSlot, Scale, Task, TicketLayout } from '../content/schema';
import type { Mode } from '../store/progress';
import type { Catalog, Facet } from './catalog';

export type Section = 'Определения' | 'Формулировки' | 'Доказательства' | 'Задачи';

export interface Part {
  label: string;
  max: number;
}

export interface TicketQuestion {
  n: number;
  section: Section;
  /** название позиции пробной контрольной */
  label?: string;
  scales: Scale[];
  parts: Part[];
  facet?: Facet;
  task?: Task;
}

/** Вопрос в сохранённом виде: вместо грани и задачи — их ключи (так он хранится в браузере и в истории). */
export type SavedQuestion = Omit<TicketQuestion, 'facet' | 'task'> & { facetKey?: string; taskId?: string };

export function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function take<T>(pool: T[], n: number, used: Set<string>, id: (x: T) => string): T[] {
  const out: T[] = [];
  for (const x of shuffle(pool)) {
    if (out.length >= n) break;
    if (used.has(id(x))) continue;
    used.add(id(x));
    out.push(x);
  }
  return out;
}

/** Пробник экзамена: билет коллоквиума или контрольная — по конфигу экзамена. */
export function generateMock(cat: Catalog, mode: Mode): TicketQuestion[] {
  const spec = cat.exam.mock;
  if (spec.kind === 'test') return generateTest(cat, mode, spec.slots);
  return spec.layout ? generateLayoutTicket(cat, mode, spec.layout) : generateTicket(cat, mode);
}

// ---------- Сборка вопросов ----------

type Draft = Omit<TicketQuestion, 'n'>;
const RED: Scale[] = ['red'];
const BLACK: Scale[] = ['black'];

const defQ = (facet: Facet, scales: Scale[]): Draft => ({
  section: 'Определения',
  scales,
  parts: [{ label: 'Определение', max: 0.5 }],
  facet,
});
const stmtQ = (facet: Facet, scales: Scale[]): Draft => ({
  section: 'Формулировки',
  scales,
  parts: [{ label: 'Формулировка', max: 0.5 }],
  facet,
});
const proofQ = (facet: Facet, scales: Scale[], proofMax: number): Draft => ({
  section: 'Доказательства',
  scales,
  parts: [
    { label: 'Формулировка', max: 0.5 },
    { label: 'Доказательство', max: proofMax },
  ],
  facet,
});
/** Доказательство одним пунктом: формулировка и доказательство вместе (когда баллы заданы целиком). */
const proofWholeQ = (facet: Facet, max: number): Draft => ({
  section: 'Доказательства',
  scales: RED,
  parts: [{ label: 'Формулировка и доказательство', max }],
  facet,
});
const taskQ = (task: Task, label?: string): Draft => ({
  section: 'Задачи',
  ...(label ? { label } : {}),
  scales: task.scales,
  parts: [{ label: 'Решение', max: task.points }],
  task,
});
const numbered = (qs: Draft[]): TicketQuestion[] => qs.map((q, i) => ({ ...q, n: i + 1 }));

/** Выбор граней без повторов единиц (вспомогательные единицы в билет не идут). */
function facetPicker(cat: Catalog) {
  const used = new Set<string>();
  return (kind: Facet['kind'], level: Facet['level'], n: number) =>
    take(
      cat.facets.filter((f) => f.kind === kind && f.level === level && !f.unit.aux),
      n,
      used,
      (f) => f.unit.id,
    );
}

/** Подходит ли задача на позицию пробной контрольной. */
export function fitsSlot(t: Task, slot: MockSlot): boolean {
  return (
    (!slot.topics || slot.topics.includes(t.topic)) &&
    (!slot.skills || (t.skill !== undefined && slot.skills.includes(t.skill))) &&
    (!slot.types || slot.types.includes(t.type))
  );
}

/** Задача на позицию: подходит по теме, навыку и типу, ещё не взята. */
function pickForSlot(pool: Task[], slot: MockSlot, used: Set<string>): Task | undefined {
  return take(pool.filter((t) => fitsSlot(t, slot)), 1, used, (x) => x.id)[0];
}

/** Билет одного уровня по составу из конфига экзамена (без продвинутых вопросов). */
export function generateLayoutTicket(cat: Catalog, mode: Mode, layout: TicketLayout): TicketQuestion[] {
  const pick = facetPicker(cat);
  // Доказательства первыми, чтобы та же теорема не попала в формулировки.
  const proofs = pick('proof', 'basic', layout.proofPoints?.length ?? layout.proofs);
  const defs = pick('definition', 'basic', layout.definitions);
  const stmts = pick('statement', 'basic', layout.statements);

  const pool = cat.visibleTasks(mode);
  const usedTasks = new Set<string>();
  const tasks = layout.taskSlots.flatMap((s) => {
    const t = pickForSlot(pool, s, usedTasks);
    return t ? [taskQ(t, s.label)] : [];
  });

  return numbered([
    ...defs.map((f) => defQ(f, RED)),
    ...stmts.map((f) => stmtQ(f, RED)),
    ...proofQuestions(cat, proofs, layout),
    ...tasks,
  ]);
}

/**
 * Вопросы-доказательства. Если баллы разные, более длинное доказательство (с леммами) получает больший вес:
 * короткие теоремы идут на младшие позиции, длинные — на старшие.
 */
function proofQuestions(cat: Catalog, proofs: Facet[], layout: TicketLayout): Draft[] {
  if (!layout.proofPoints) return proofs.map((f) => proofQ(f, RED, 2));
  const len = (f: Facet) => cat.proofPlan(f.unit).length;
  const byLength = [...proofs].sort((a, b) => len(a) - len(b));
  const points = [...layout.proofPoints].sort((a, b) => a - b);
  return byLength.map((f, i) => proofWholeQ(f, points[i]));
}

/**
 * Билет по структуре демо-версии коллоквиума по матану:
 * 3 определения, 3(+1⚫) формулировки, 2(+1⚫) доказательства, 3(+1⚫) задачи.
 */
export function generateTicket(cat: Catalog, mode: Mode): TicketQuestion[] {
  const pick = facetPicker(cat);
  // Доказательства выбираем первыми, чтобы та же теорема не попала в формулировки.
  const proofsBasic = pick('proof', 'basic', 2);
  const proofsAdv = mode === 'all' ? pick('proof', 'advanced', 1) : [];
  const defs = pick('definition', 'basic', 3);
  const stmts = pick('statement', 'basic', 3);
  const stmtsAdv = mode === 'all' ? pick('statement', 'advanced', 1) : [];

  const all = cat.visibleTasks(mode);
  const usedTasks = new Set<string>();
  const tid = (t: Task) => t.id;
  const redOnly = all.filter((t) => t.scales.length === 1 && t.scales[0] === 'red');
  const both = all.filter((t) => t.scales.includes('red') && t.scales.includes('black'));
  const blackOnly = all.filter((t) => !t.scales.includes('red'));
  const tasksPicked = [
    ...take(redOnly, 2, usedTasks, tid),
    ...take(both.length ? both : redOnly, 1, usedTasks, tid),
    ...(mode === 'all' ? take(blackOnly, 1, usedTasks, tid) : []),
  ];

  return numbered([
    ...defs.map((f) => defQ(f, RED)),
    ...stmts.map((f) => stmtQ(f, RED)),
    ...stmtsAdv.map((f) => stmtQ(f, BLACK)),
    ...proofsBasic.map((f) => proofQ(f, ['red', 'black'], 2)),
    ...proofsAdv.map((f) => proofQ(f, BLACK, 3)),
    ...tasksPicked.map((t) => taskQ(t)),
  ]);
}

/** Контрольная: по одной задаче на каждую позицию, без повторов. */
export function generateTest(cat: Catalog, mode: Mode, slots: MockSlot[]): TicketQuestion[] {
  const used = new Set<string>();
  const pool = cat.visibleTasks(mode);
  return numbered(
    slots.flatMap((slot) => {
      const t = pickForSlot(pool, slot, used);
      return t ? [taskQ(t, slot.label)] : [];
    }),
  );
}

export interface Totals {
  red: number;
  redMax: number;
  black: number;
  blackMax: number;
}

/** Правила подсчёта билета: допуск к доказательствам и потолок оценки. */
export interface Scoring {
  theoryGate?: number;
  scoreCap?: number;
}

export function scoringOf(cat: Catalog): Scoring {
  const spec = cat.exam.mock;
  if (spec.kind === 'test') return { scoreCap: spec.scoreCap };
  return spec.layout ? { theoryGate: spec.layout.theoryGate, scoreCap: spec.layout.scoreCap } : {};
}

/** Сколько вопросов по теории сдано на полный балл. */
export function theoryPassed(qs: TicketQuestion[], scores: Record<string, number>): number {
  return qs.filter((q) => q.section === 'Определения' && q.parts.every((p, i) => (scores[`${q.n}:${i}`] ?? 0) >= p.max)).length;
}

/** Не сдан допуск: доказательства не засчитываются. */
export function gateFailed(qs: TicketQuestion[], scores: Record<string, number>, rules: Scoring = {}): boolean {
  return rules.theoryGate !== undefined && theoryPassed(qs, scores) < rules.theoryGate;
}

export function totals(qs: TicketQuestion[], scores: Record<string, number>, rules: Scoring = {}): Totals {
  const t: Totals = { red: 0, redMax: 0, black: 0, blackMax: 0 };
  const locked = gateFailed(qs, scores, rules);
  for (const q of qs) {
    q.parts.forEach((p, i) => {
      const got = locked && q.section === 'Доказательства' ? 0 : (scores[`${q.n}:${i}`] ?? 0);
      if (q.scales.includes('red')) {
        t.red += got;
        t.redMax += p.max;
      }
      if (q.scales.includes('black')) {
        t.black += got;
        t.blackMax += p.max;
      }
    });
  }
  if (rules.scoreCap !== undefined) {
    t.red = Math.min(t.red, rules.scoreCap);
    t.redMax = Math.min(t.redMax, rules.scoreCap);
  }
  return t;
}
