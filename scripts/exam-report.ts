/**
 * Сводка по экзамену: npm run exam-report -- <id> [~/exam-work/<id>/plan.json]
 *
 * Показывает, сколько готово и чего не хватает: по темам — единицы, грани и задачи; сколько «TODO» осталось;
 * хватает ли вопросов и задач на каждую позицию пробного варианта; что нарушает правила CLAUDE.md §5,
 * но тестами не ловится (шаги доказательства, число ошибок и подсказок). С планом — сверка с ним:
 * какие пункты списка вопросов ещё не заведены. Ничего не меняет.
 */
import { readFileSync } from 'node:fs';
import { exams } from '../content';
import { fitsSlot } from '../src/engine/ticket';
import { GLYPHS } from '../src/ui/glyphs';
import type { Exam, Kind, MockSlot } from '../src/content/schema';

const [id, planPath] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const exam: Exam | undefined = exams.find((e) => e.id === id);
if (!exam) {
  console.error(`Нет экзамена «${id ?? ''}». Есть: ${exams.map((e) => e.id).join(', ')}`);
  process.exit(1);
}

const todo = (s: string | undefined) => (s && /\bTODO\b/.test(s) ? 1 : 0);
const pad = (s: string | number, n: number) => String(s).padEnd(n);
const lpad = (s: string | number, n: number) => String(s).padStart(n);
const warn: string[] = [];

console.log(`\n${exam.kind}: ${exam.subject} (${exam.id}), ${exam.when}`);
console.log(`Значок ${exam.icon}: ${GLYPHS[exam.icon] ? 'нарисован' : 'НЕ НАРИСОВАН — допиши в src/ui/glyphs.ts'}`);

// ------------------------------------------------------------------ по темам

console.log(`\n${pad('Тема', 34)}${lpad('ед.', 5)}${lpad('опр', 5)}${lpad('форм', 6)}${lpad('док', 5)}${lpad('задачи', 8)}${lpad('TODO', 6)}`);
let todos = 0;
for (const t of exam.topics) {
  const us = t.units.filter((u) => !u.aux);
  const tasks = exam.tasks.filter((x) => x.topic === t.id);
  let n = 0;
  for (const u of t.units) {
    n += todo(u.definition?.text) + todo(u.statement?.text) + todo(u.notes) + todo(u.proof?.idea);
    u.proof?.steps.forEach((s) => (n += todo(s.title) + todo(s.body)));
    u.pitfalls?.forEach((p) => (n += todo(p)));
  }
  tasks.forEach((x) => (n += todo(x.prompt) + todo(x.answer) + x.hints.reduce((a, h) => a + todo(h), 0)));
  todos += n;
  console.log(
    `${pad(`${t.id}`, 34)}${lpad(us.length, 5)}${lpad(us.filter((u) => u.definition).length, 5)}` +
      `${lpad(us.filter((u) => u.statement).length, 6)}${lpad(us.filter((u) => u.proof).length, 5)}` +
      `${lpad(tasks.length, 8)}${lpad(n || '', 6)}`,
  );
}
todos += todo(exam.how) + todo(exam.tasksNote);
const units = exam.topics.flatMap((t) => t.units);
const main = units.filter((u) => !u.aux);
console.log(
  `${pad('Всего', 34)}${lpad(main.length, 5)}${lpad(main.filter((u) => u.definition).length, 5)}` +
    `${lpad(main.filter((u) => u.statement).length, 6)}${lpad(main.filter((u) => u.proof).length, 5)}` +
    `${lpad(exam.tasks.length, 8)}${lpad(todos || '', 6)}`,
);
if (units.length > main.length) console.log(`Леммы (aux): ${units.length - main.length}`);
const howTodo = (exam.how.match(/\bTODO\b/g) ?? []).length;
if (howTodo) console.log(`«Как устроено»: ${howTodo} TODO`);

// ------------------------------------------------------------------ пробный вариант

console.log(`\n${exam.mock.title}`);
const slotLine = (s: MockSlot) => {
  const fit = exam.tasks.filter((t) => fitsSlot(t, s));
  const wrongPts = s.points !== undefined ? fit.filter((t) => t.points !== s.points).length : 0;
  const flag = fit.length === 0 ? '  ← НЕТ ЗАДАЧ' : fit.length < 4 ? '  ← мало, билеты будут повторяться' : '';
  console.log(`  ${pad(s.label, 60)}${lpad(fit.length, 4)} задач${wrongPts ? `, ${wrongPts} с другими баллами` : ''}${flag}`);
};
if (exam.mock.kind === 'test') {
  const sum = exam.mock.slots.reduce((a, s) => a + (s.points ?? 0), 0);
  console.log(`  ${exam.mock.minutes} минут, ${exam.mock.slots.length} позиций, ${sum} баллов${exam.mock.scoreCap ? `, в оценку ${exam.mock.scoreCap}` : ''}`);
  exam.mock.slots.forEach(slotLine);
} else if (exam.mock.layout) {
  const l = exam.mock.layout;
  const basic = (k: Kind) => main.filter((u) => u[k]?.level === 'basic' && (k !== 'statement' || !u.proof || exam.statementQuestions !== false)).length;
  const need: [string, number, number][] = [
    ['определений', l.definitions, basic('definition')],
    ['формулировок', l.statements, basic('statement')],
    ['доказательств', l.proofPoints?.length ?? l.proofs, basic('proof')],
  ];
  for (const [what, n, have] of need) if (n) console.log(`  ${pad(`${what}: в билете ${n}`, 40)}в банке ${have}${have < n ? '  ← НЕ ХВАТАЕТ' : ''}`);
  l.taskSlots.forEach(slotLine);
} else {
  console.log('  билет по демо матана (без layout)');
}

// ------------------------------------------------------------------ правила, которые тесты не ловят

for (const u of main) {
  const n = u.proof?.steps.length;
  if (n !== undefined && (n < 2 || n > 8)) warn.push(`${u.id}: шагов доказательства ${n} (надо 2–8)`);
  const p = u.pitfalls?.length ?? 0;
  if (p < 1 || p > 3) warn.push(`${u.id}: типичных ошибок ${p} (надо 1–3)`);
  if (!u.source) warn.push(`${u.id}: нет source`);
}
for (const t of exam.tasks) {
  if (/Найдите|Докажите|Вычислите|Покажите/.test(t.prompt)) warn.push(`${t.id}: условие не на «ты»`);
}
const noSkill = exam.skills ? exam.tasks.filter((t) => !t.skill) : [];
if (noSkill.length) console.log(`\nБез навыка ${noSkill.length} задач: в пробную КР не идут, остаются для понимания.`);
const proofUnits = main.filter((u) => u.proof);
if (exam.features.includes('proofs') !== proofUnits.length > 0) warn.push(`features.proofs не совпадает с наличием доказательств (${proofUnits.length})`);
if (exam.features.includes('tasks') !== exam.tasks.length > 0) warn.push(`features.tasks не совпадает с банком задач (${exam.tasks.length})`);
if (exam.skills)
  for (const s of exam.skills) {
    const n = exam.tasks.filter((t) => t.skill === s.id).length;
    if (n < 4) warn.push(`навык ${s.id}: задач ${n}`);
  }

// ------------------------------------------------------------------ сверка с планом

if (planPath) {
  type PU = { id: string; facets: Partial<Record<Kind, string>> };
  const plan = JSON.parse(readFileSync(planPath.replace(/^~/, process.env.HOME ?? '~'), 'utf8')) as { topics: { units: PU[] }[] };
  const have = new Map(units.map((u) => [u.id, u]));
  const planned = plan.topics.flatMap((t) => t.units);
  const missing = planned.filter((p) => !have.has(p.id));
  const extra = units.filter((u) => !planned.some((p) => p.id === u.id));
  const facetDiff = planned.filter((p) => {
    const u = have.get(p.id);
    return u && (['definition', 'statement', 'proof'] as Kind[]).some((k) => !!p.facets[k] !== !!u[k] || (p.facets[k] && p.facets[k] !== u[k]?.level));
  });
  console.log(`\nПлан: ${planned.length} единиц, заведено ${planned.length - missing.length}`);
  if (missing.length) console.log('  нет в контенте: ' + missing.map((p) => p.id).join(', '));
  if (extra.length) console.log('  нет в плане: ' + extra.map((u) => u.id).join(', '));
  if (facetDiff.length) console.log('  грани или уровни не как в плане: ' + facetDiff.map((p) => p.id).join(', '));
}

const design = readFileSync(new URL('../DESIGN.md', import.meta.url), 'utf8');
if (/\bTODO\b/.test(design)) warn.push('DESIGN.md: в разделе экзамена остались TODO');

console.log(warn.length ? `\nЗамечания (${warn.length}):\n- ${warn.join('\n- ')}` : '\nЗамечаний нет.');
console.log(todos || howTodo ? `\nНе готово: ${todos} TODO.` : '\nTODO не осталось.');
