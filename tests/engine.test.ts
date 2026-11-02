import { describe, expect, it } from 'vitest';
import { exams } from '../content';
import { catalogOf } from '../src/engine/catalog';
import { gateFailed, generateMock, generateTicket, scoringOf, totals } from '../src/engine/ticket';
import { makeQuestion, randomProblem, type PointType, type ValueType } from '../src/engine/quant';

const matan = catalogOf(exams.find((e) => e.id === 'matan-colloc')!);

describe('test mock', () => {
  const linal = catalogOf(exams.find((e) => e.id === 'linal-kr2')!);

  it('linal: 6 different tasks with skills, 11 points, the grade stops at 10', () => {
    for (let i = 0; i < 50; i++) {
      const qs = generateMock(linal, 'basic');
      expect(qs.length).toBe(6);
      expect(new Set(qs.map((q) => q.task!.id)).size).toBe(6);
      expect(qs.every((q) => q.task!.skill && ['compute', 'construct'].includes(q.task!.type))).toBe(true);
      expect(qs.reduce((s, q) => s + q.parts[0].max, 0)).toBe(11);

      const full = Object.fromEntries(qs.map((q) => [`${q.n}:0`, q.parts[0].max]));
      expect(totals(qs, full, scoringOf(linal))).toMatchObject({ red: 10, redMax: 10 });
      expect(totals(qs, { ...full, '6:0': 0 }, scoringOf(linal)).red).toBe(9.5);
    }
  });
});

describe('ticket', () => {
  it('basic ticket: 11 questions, 11 red points, nothing black-only', () => {
    for (let i = 0; i < 50; i++) {
      const qs = generateTicket(matan, 'basic');
      expect(qs.length).toBe(11);
      expect(qs.every((q) => q.scales.includes('red'))).toBe(true);
      const t = totals(qs, {});
      expect(t.redMax).toBe(11);
      // одна и та же теорема не попадает дважды
      const units = qs.filter((q) => q.facet).map((q) => q.facet!.unit.id);
      expect(new Set(units).size).toBe(units.length);
      expect(qs.filter((q) => q.facet).every((q) => q.facet!.level === 'basic')).toBe(true);
      expect(qs.some((q) => q.facet?.unit.aux)).toBe(false);
    }
  });

  it('advanced ticket adds black-only questions', () => {
    const qs = generateTicket(matan, 'all');
    expect(qs.length).toBe(14);
    expect(qs.some((q) => !q.scales.includes('red'))).toBe(true);
  });
});

describe('test mocks', () => {
  for (const exam of exams.filter((e) => e.mock.kind === 'test')) {
    it(`${exam.id}: one distinct task per slot`, () => {
      const cat = catalogOf(exam);
      const slots = exam.mock.kind === 'test' ? exam.mock.slots : [];
      for (let i = 0; i < 50; i++) {
        const qs = generateMock(cat, 'basic');
        expect(qs.length).toBe(slots.length);
        expect(new Set(qs.map((q) => q.task!.id)).size).toBe(qs.length);
        qs.forEach((q, j) => {
          const s = slots[j];
          expect(!s.topics || s.topics.includes(q.task!.topic), q.task!.id).toBe(true);
          expect(!s.types || s.types.includes(q.task!.type), q.task!.id).toBe(true);
        });
      }
    });
  }
});

describe('quantifiers', () => {
  const P: PointType[] = ['a', 'a+0', 'a-0', '+inf', '-inf', 'inf', 'seq'];
  const V: ValueType[] = ['A', '+inf', '-inf', 'inf'];

  it('demo question 11 gives the course answer', () => {
    const q = makeQuestion({ point: 'a-0', value: '-inf', a: 3, A: 0, negate: false });
    expect(q.prompt).toBe('\\lim_{x\\to 3-0}f(x)=-\\infty');
    expect(q.answer).toContain('-\\delta<x-3<0');
    expect(q.answer).toContain('f(x)<-\\varepsilon');
  });

  it('negation follows the longread pattern', () => {
    const q = makeQuestion({ point: 'inf', value: 'A', a: 0, A: 4, negate: true });
    expect(q.answer).toBe('\\exists\\varepsilon>0:\\ \\forall\\delta>0\\ \\ \\exists x:\\ (|x|>\\delta)\\wedge(|f(x)-4|\\ge\\varepsilon)');
  });

  it('every question has 4 distinct options with the right one inside', () => {
    for (let i = 0; i < 300; i++) {
      const q = makeQuestion(randomProblem(P, V, true));
      expect(new Set(q.options).size).toBe(q.options.length);
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.options[q.correct]).toBe(q.answer);
    }
  });
});

describe('layout ticket (mia-colloc)', () => {
  it('follows the layout: 4 definitions, 3 statements, 1 proof, one task per slot', () => {
    const cat = catalogOf(exams.find((e) => e.id === 'mia-colloc')!);
    for (let i = 0; i < 30; i++) {
      const qs = generateMock(cat, 'basic');
      const count = (s: string) => qs.filter((q) => q.section === s).length;
      expect([count('Определения'), count('Формулировки'), count('Доказательства'), count('Задачи')]).toEqual([4, 3, 1, 4]);
      const units = qs.filter((q) => q.facet).map((q) => q.facet!.unit.id);
      expect(new Set(units).size).toBe(units.length);
      const max = qs.reduce((s, q) => s + q.parts.reduce((a, p) => a + p.max, 0), 0);
      expect(max).toBe(10);
    }
  });
});

describe('pilot-colloc ticket', () => {
  const cat = catalogOf(exams.find((e) => e.id === 'pilot-colloc')!);
  const rules = scoringOf(cat);
  const full = (qs: ReturnType<typeof generateMock>) =>
    Object.fromEntries(qs.flatMap((q) => q.parts.map((p, i) => [`${q.n}:${i}`, p.max])));

  it('5 theory questions and 4 proofs worth 1,5 / 2 / 2 / 2,5, longer proofs weigh more', () => {
    for (let i = 0; i < 30; i++) {
      const qs = generateMock(cat, 'basic');
      expect(qs.filter((q) => q.section === 'Определения').length).toBe(5);
      const proofs = qs.filter((q) => q.section === 'Доказательства');
      expect(proofs.map((q) => q.parts[0].max)).toEqual([1.5, 2, 2, 2.5]);
      const len = proofs.map((q) => cat.proofPlan(q.facet!.unit).length);
      expect([...len].sort((a, b) => a - b)).toEqual(len);
      const units = qs.map((q) => q.facet!.unit.id);
      expect(new Set(units).size).toBe(units.length);
    }
  });

  it('full marks give 10 (cap), fewer than 4 theory answers lock the proofs', () => {
    const qs = generateMock(cat, 'basic');
    const scores = full(qs);
    expect(totals(qs, scores, rules)).toMatchObject({ red: 10, redMax: 10 });
    const theory = qs.filter((q) => q.section === 'Определения');
    const failTwo = { ...scores, [`${theory[0].n}:0`]: 0, [`${theory[1].n}:0`]: 0.25 };
    expect(gateFailed(qs, failTwo, rules)).toBe(true);
    expect(totals(qs, failTwo, rules).red).toBe(1.75);
    const failOne = { ...scores, [`${theory[0].n}:0`]: 0 };
    expect(gateFailed(qs, failOne, rules)).toBe(false);
    expect(totals(qs, failOne, rules).red).toBe(10);
  });
});

describe('pilot-colloc: no statement-only questions', () => {
  const cat = catalogOf(exams.find((e) => e.id === 'pilot-colloc')!);
  it('theorem statements are not separate facets; 42 theory + 41 proofs', () => {
    expect(cat.facets.filter((f) => f.kind === 'statement')).toEqual([]);
    expect(cat.facets.length).toBe(83);
  });
  it('other exams keep statements', () => {
    const mia = catalogOf(exams.find((e) => e.id === 'mia-colloc')!);
    expect(mia.facets.some((f) => f.kind === 'statement' && f.unit.proof)).toBe(true);
  });
});
