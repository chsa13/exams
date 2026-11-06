import { describe, expect, it } from 'vitest';
import katex from 'katex';
import { exams } from '../content';
import type { Exam } from '../src/content/schema';
import { fitsSlot } from '../src/engine/ticket';

// Все формулы из текста: $$...$$ и $...$
function formulas(text: string): string[] {
  const out: string[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) out.push((m[1] ?? m[2]).trim());
  return out;
}

const unitsOf = (e: Exam) => e.topics.flatMap((t) => t.units.map((u) => ({ ...u, topic: t.id })));

function texts(e: Exam): { where: string; text: string }[] {
  const all: { where: string; text: string }[] = [];
  for (const u of unitsOf(e)) {
    const add = (k: string, s?: string) => s && all.push({ where: `${u.id}.${k}`, text: s });
    add('definition', u.definition?.text);
    add('statement', u.statement?.text);
    add('notes', u.notes);
    add('proof.idea', u.proof?.idea);
    u.proof?.steps.forEach((s, i) => {
      add(`proof.step${i}.title`, s.title);
      add(`proof.step${i}.body`, s.body);
    });
    u.pitfalls?.forEach((p, i) => add(`pitfall${i}`, p));
  }
  all.push({ where: 'how', text: e.how });
  for (const t of e.tasks) {
    all.push({ where: `${t.id}.prompt`, text: t.prompt });
    all.push({ where: `${t.id}.answer`, text: t.answer });
    t.hints.forEach((h, i) => all.push({ where: `${t.id}.hint${i}`, text: h }));
  }
  return all;
}

describe('exams', () => {
  it('ids are unique and url-safe', () => {
    expect(new Set(exams.map((e) => e.id)).size).toBe(exams.length);
    for (const e of exams) expect(e.id, e.id).toMatch(/^[a-z0-9-]+$/);
  });

  it('dates are valid and ordered', () => {
    for (const e of exams) {
      for (const d of e.dates) expect(d, e.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(e.dates[0] <= e.dates[1], e.id).toBe(true);
    }
  });

  it('mock slots point to existing topics and have matching tasks', () => {
    for (const e of exams) {
      const slots = e.mock.kind === 'test' ? e.mock.slots : (e.mock.layout?.taskSlots ?? []);
      const topicIds = new Set(e.topics.map((t) => t.id));
      for (const s of slots) {
        for (const t of s.topics ?? []) expect(topicIds.has(t), `${e.id}: ${s.label} -> ${t}`).toBe(true);
        const fits = e.tasks.filter((t) => fitsSlot(t, s));
        expect(fits.length, `${e.id}: мало задач для «${s.label}»`).toBeGreaterThanOrEqual(3);
        if (s.points !== undefined) for (const t of fits) expect(t.points, `${t.id} на позиции «${s.label}»`).toBe(s.points);
      }
    }
  });

  it('without levels everything is basic', () => {
    for (const e of exams) {
      if (e.levels) continue;
      for (const u of unitsOf(e)) for (const k of ['definition', 'statement', 'proof'] as const) expect(u[k]?.level ?? 'basic', u.id).toBe('basic');
      for (const t of e.tasks) expect(t.scales, t.id).toEqual(['red']);
    }
  });
});

for (const exam of exams) {
  const units = unitsOf(exam);
  const unitIds = new Set(units.map((u) => u.id));

  describe(`content: ${exam.id}`, () => {
    it('ids are unique', () => {
      expect(unitIds.size).toBe(units.length);
      expect(new Set(exam.tasks.map((t) => t.id)).size).toBe(exam.tasks.length);
      expect(new Set(exam.topics.map((t) => t.id)).size).toBe(exam.topics.length);
    });

    it('every unit has at least one facet and pitfalls', () => {
      for (const u of units) {
        expect(u.definition || u.statement || u.proof, u.id).toBeTruthy();
        expect(u.pitfalls?.length ?? 0, u.id).toBeGreaterThan(0);
      }
    });

    it('uses, lemmas and task topics point to existing items', () => {
      for (const u of units) for (const id of [...(u.uses ?? []), ...(u.lemmas ?? [])]) expect(unitIds.has(id), `${u.id} -> ${id}`).toBe(true);
      const topicIds = new Set(exam.topics.map((t) => t.id));
      for (const t of exam.tasks) expect(topicIds.has(t.topic), t.id).toBe(true);
    });

    it('tasks have positive points and an answer', () => {
      for (const t of exam.tasks) {
        expect(t.points, t.id).toBeGreaterThan(0);
        expect(t.answer.trim().length, t.id).toBeGreaterThan(0);
      }
    });

    it('dollar signs are balanced', () => {
      for (const { where, text } of texts(exam)) {
        const n = (text.replace(/\$\$/g, '').match(/\$/g) ?? []).length;
        expect(n % 2, where).toBe(0);
      }
    });

    it('all formulas render with KaTeX', () => {
      for (const { where, text } of texts(exam))
        for (const f of formulas(text)) {
          expect(() => katex.renderToString(f, { throwOnError: true }), `${where}: ${f}`).not.toThrow();
        }
    });

    it('every lemma exists and has a proof; no cycles', () => {
      const byId = new Map(units.map((u) => [u.id, u]));
      const visiting = new Set<string>();
      const done = new Set<string>();
      const dfs = (id: string, path: string[]) => {
        if (done.has(id)) return;
        expect(visiting.has(id), `цикл лемм: ${[...path, id].join(' -> ')}`).toBe(false);
        visiting.add(id);
        for (const l of byId.get(id)?.lemmas ?? []) {
          const lu = byId.get(l);
          expect(lu, `${id}: нет леммы ${l}`).toBeTruthy();
          expect(lu!.proof, `${l}: у леммы нет доказательства`).toBeTruthy();
          dfs(l, [...path, id]);
        }
        visiting.delete(id);
        done.add(id);
      };
      for (const u of units) dfs(u.id, []);
    });

    it('auxiliary lemmas are used somewhere', () => {
      const used = new Set(units.flatMap((u) => u.lemmas ?? []));
      for (const u of units.filter((x) => x.aux)) expect(used.has(u.id), `${u.id} никем не используется`).toBe(true);
    });

    // Леммы нужны для доказательства, а не для формулировки: в формулировке теоремы их нет,
    // они — отдельные единицы в unit.lemmas и показываются в блоке доказательства.
    it('theorem statements do not embed lemmas', () => {
      for (const u of units) {
        if (u.aux || !u.statement) continue;
        expect(/\*\*Лемм/.test(u.statement.text), `${u.id}: лемма внутри формулировки`).toBe(false);
      }
    });

    it('proof steps of a theorem are not lemma steps (lemmas live in unit.lemmas)', () => {
      for (const u of units) {
        if (u.aux || !u.proof) continue;
        for (const s of u.proof.steps) expect(/^Лемм[аы]\s*\d/.test(s.title), `${u.id}: шаг «${s.title}»`).toBe(false);
      }
    });
  });
}

describe('content source', () => {
  it('LaTeX is only inside md`...` strings (in quotes a backslash is lost)', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const dir = path.resolve(__dirname, '../content');
    const files = (fs.readdirSync(dir, { recursive: true }) as string[]).filter((x) => x.endsWith('.ts'));
    for (const f of files) {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      const bad = src.split('\n').filter((l: string) => /(:\s*|\[\s*|,\s*)'[^'\n]*\\[^'\n]*'/.test(l));
      expect(bad, f).toEqual([]);
    }
  });
});

const matan = exams.find((e) => e.id === 'matan-colloc')!;
const tasks = matan.tasks;
const units = unitsOf(matan);

describe('matan-colloc: task bank', () => {
  it('red-scale tasks cost 1 point (the mock ticket expects 11 red points)', () => {
    for (const t of tasks) if (t.scales.includes('red')) expect(t.points, t.id).toBe(1);
  });

  it('has 60+ tasks, about 80% count toward the red scale', () => {
    expect(tasks.length).toBeGreaterThanOrEqual(60);
    const red = tasks.filter((t) => t.scales.includes('red')).length;
    expect(red / tasks.length).toBeGreaterThanOrEqual(0.75);
  });
});

describe('matan-colloc: lemmas', () => {
  const byId = new Map(units.map((u) => [u.id, u]));

  // Если доказательство ссылается на вспомогательный факт, его доказательство должно быть подключено.
  const RULES: [RegExp, string][] = [
    [/Бернулли/i, 'bernoulli'],
    [/непересекающ/i, 'lemma-disjoint-nbhd'],
    [/C_n\^2|бином/i, 'binomial-bound'],
    [/подпоследовательност[ьи] сходящ|сдвиг/i, 'subseq-limit'],
    [/лемм[аеуы] 14\.1|последовательностей Гейне все/i, 'heine-lemma'],
    [/образ[ае]? промежутка/i, 'interval-image'],
  ];
  const chain = (u: (typeof units)[number]): Set<string> => {
    const out = new Set<string>();
    const go = (x: (typeof units)[number]) => {
      for (const id of x.lemmas ?? []) if (!out.has(id)) { out.add(id); go(byId.get(id)!); }
    };
    go(u);
    return out;
  };

  it('proofs that mention a lemma include its proof', () => {
    for (const u of units) {
      if (!u.proof) continue;
      const text = [u.proof.idea, ...u.proof.steps.flatMap((s) => [s.title, s.body])].join(' ');
      const have = chain(u);
      for (const [re, id] of RULES) {
        if (id === u.id || !re.test(text)) continue;
        // лемма, которая сама по себе и есть этот факт (например, оценка через бином), не обязана ссылаться на себя
        expect(have.has(id), `${u.id} упоминает «${re.source}», но не подключает лемму ${id}`).toBe(true);
      }
    }
  });

  it('no proof cites a lemma by name without proving it', () => {
    for (const u of units) {
      if (!u.proof) continue;
      for (const s of u.proof.steps) {
        expect(/лемм[аеуы] об отделимости/i.test(s.body), `${u.id}: ссылка на лемму об отделимости`).toBe(false);
      }
    }
  });
});

describe('linal-kr2: task bank', () => {
  const linal = exams.find((e) => e.id === 'linal-kr2')!;
  it('has 50+ tasks covering every topic, each with a source and a hint', () => {
    expect(linal.tasks.length).toBeGreaterThanOrEqual(50);
    for (const topic of linal.topics) expect(linal.tasks.filter((t) => t.topic === topic.id).length, topic.id).toBeGreaterThanOrEqual(12);
    for (const t of linal.tasks) {
      expect(t.source, t.id).toBeTruthy();
      expect(t.hints.length, t.id).toBeGreaterThan(0);
    }
  });

  it('mock matches the announcement: 11 points, 10 count toward the grade', () => {
    const m = linal.mock.kind === 'test' ? linal.mock : undefined;
    expect(m?.minutes).toBe(60);
    expect(m?.scoreCap).toBe(10);
    expect(m?.slots.reduce((s, x) => s + x.points!, 0)).toBe(11);
  });

  it('every skill from the announcement has tasks for the mock and a link on the «how» page', () => {
    const skills = linal.skills!;
    expect(skills).toHaveLength(7);
    const ids = new Set(skills.map((s) => s.id));
    for (const t of linal.tasks) if (t.skill) expect(ids.has(t.skill), t.id).toBe(true);
    for (const s of skills) {
      expect(linal.tasks.filter((t) => t.skill === s.id && ['compute', 'construct'].includes(t.type)).length, s.id).toBeGreaterThanOrEqual(3);
      expect(linal.how, s.id).toContain(`(/linal-kr2/tasks?skill=${s.id})`);
    }
    const covered = new Set(linal.mock.kind === 'test' ? linal.mock.slots.flatMap((s) => s.skills ?? []) : []);
    expect(covered).toEqual(ids);
  });

  it('the bank has a task inspired by each problem the lecturer named', () => {
    for (const src of ['семинара 6, задача 5', 'семинара 6, задача 6', 'ДЗ 7, задача 3', 'семинара 7, задача 3', 'семинара 7, задача 14', 'семинара 8, задача 1', 'ДЗ 8, задача 2', 'семинара 8, задача 8', 'ДЗ 8, задача 3', 'семинара 8, задача 12', 'семинара 8, задача 13', 'ДЗ 8, задача 5']) {
      expect(linal.tasks.some((t) => t.source?.includes(src)), src).toBe(true);
    }
  });
});

describe('mia-colloc', () => {
  const mia = exams.find((e) => e.id === 'mia-colloc')!;
  const units = unitsOf(mia);

  it('ticket layout matches the demo: 4 + 3 + 1 + 4 questions, 10 points', () => {
    const l = mia.mock.kind === 'ticket' ? mia.mock.layout! : undefined;
    expect(l).toBeTruthy();
    const points = 0.5 * (l!.definitions + l!.statements) + 2.5 * l!.proofs + l!.taskSlots.length;
    expect(points).toBe(10);
  });

  it('every task is worth 1 point and has a source and a hint', () => {
    expect(mia.tasks.length).toBeGreaterThanOrEqual(60);
    for (const t of mia.tasks) {
      expect(t.points, t.id).toBe(1);
      expect(t.source, t.id).toBeTruthy();
      expect(t.hints.length, t.id).toBeGreaterThan(0);
    }
  });

  it('has enough items for every ticket block', () => {
    expect(units.filter((u) => u.definition).length).toBeGreaterThanOrEqual(30);
    expect(units.filter((u) => u.statement && !u.proof).length).toBeGreaterThanOrEqual(25);
    expect(units.filter((u) => u.proof).length).toBe(10);
  });
});

describe('pilot-colloc', () => {
  const pilot = exams.find((e) => e.id === 'pilot-colloc')!;
  const units = unitsOf(pilot).filter((u) => !u.aux);

  it('covers the whole question list: 42 theory questions and 40 theorems', () => {
    expect(units.filter((u) => u.definition).length).toBe(42);
    expect(units.filter((u) => u.proof).length).toBe(40);
    for (const u of units.filter((x) => x.proof)) expect(u.statement, u.id).toBeTruthy();
  });

  it('ticket: 5 × 0,5 + 1,5 + 2 + 2 + 2,5, capped at 10', () => {
    const l = pilot.mock.kind === 'ticket' ? pilot.mock.layout! : undefined;
    expect(0.5 * l!.definitions + l!.proofPoints!.reduce((a, b) => a + b, 0)).toBe(10.5);
    expect(l!.scoreCap).toBe(10);
    expect(l!.theoryGate).toBe(4);
  });
});

describe('dm-kr2', () => {
  const exam = exams.find((e) => e.id === 'dm-kr2')!;
  const units = unitsOf(exam).filter((u) => !u.aux);

  it('covers the question list: 14 definitions, 0 statements, 34 proofs', () => {
    expect(units.filter((u) => u.definition).length).toBe(14);
    expect(units.filter((u) => u.statement && !u.proof).length).toBe(0);
    expect(units.filter((u) => u.proof).length).toBe(34);
  });

  it('mock matches the announcement', () => {
    expect(exam.mock).toEqual({
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
    });
  });
});
