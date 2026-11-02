import { describe, expect, it } from 'vitest';
import { exams } from '../content';
import { Catalog, taskKey } from '../src/engine/catalog';
import { ProgressStore, type State } from '../src/store/progress';
import { decodeShare, encodeShare, readShareHash, shareHash } from '../src/store/share';

const memory = new Map<string, string>();
globalThis.localStorage = {
  getItem: (k: string) => memory.get(k) ?? null,
  setItem: (k: string, v: string) => void memory.set(k, v),
} as unknown as Storage;

const DAY = 86_400_000;
const day = (n: number) => Date.UTC(2026, 9, n);
const KEYS = ['squeeze-theorem:proof', 'limit:definition', 'task:limit-1'];
const state = (): State => ({
  version: 1,
  mode: 'all',
  items: {
    'squeeze-theorem:proof': { status: 'shaky', seen: 3, last: day(5) },
    'task:limit-1': { status: 'known', seen: 1, last: day(7) },
  },
  mocks: [{ date: day(6), mode: 'all', red: 6.5, redMax: 10, black: 1.25, blackMax: 5 }],
});

describe('progress link', () => {
  it('survives a round trip', () => {
    expect(decodeShare('test', encodeShare('test', state()), KEYS)).toEqual(state());
  });

  it('uses only characters that are safe in a URL', () => {
    expect(encodeShare('test', state())).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it.each(exams.map((e) => [e.id, e] as const))('%s: full progress fits a message and keys do not collide', (id, exam) => {
    const keys = [...new Catalog(exam).facetByKey.keys(), ...exam.tasks.map(taskKey)];
    expect(new Set(keys.map((k) => shareHash(id, k))).size).toBe(keys.length);
    const items = Object.fromEntries(keys.map((k) => [k, { status: 'known' as const, seen: 2, last: day(1) }]));
    const mocks = Array.from({ length: 30 }, (_, i) => ({ date: day(1) + i * DAY, mode: 'all' as const, red: 5, redMax: 10, black: 1, blackMax: 5 }));
    const text = encodeShare(id, { version: 1, mode: 'all', items, mocks });
    expect(text.length + 100).toBeLessThan(4096); // 100 — запас на адрес сайта
    expect(Object.keys(decodeShare(id, text, keys)!.items)).toHaveLength(keys.length);
  });

  it.each(['', '!!!', 'AA', 'AQAA', 'AgAA', 'AQAAAAAA'])('rejects a broken link %j', (bad) => {
    expect(decodeShare('test', bad, KEYS)).toBeNull();
  });

  it('rejects a link of another exam', () => {
    const { mocks: _, ...rest } = state();
    expect(decodeShare('other', encodeShare('test', { ...rest, mocks: [] }), KEYS)).toBeNull();
  });

  it('reads only its own part of the address', () => {
    expect(readShareHash('test', '', KEYS)).toBeNull();
    expect(readShareHash('test', '#/old/link', KEYS)).toBeNull();
    expect(readShareHash('test', '#p=!!!', KEYS)).toBe('bad');
    expect(readShareHash('test', `#p=${encodeShare('test', state())}`, KEYS)).toEqual(state());
  });
});

describe('merging progress', () => {
  it('keeps the newest mark, adds new ones and does not change the mode', () => {
    const s = new ProgressStore('merge');
    s.replace({ version: 1, mode: 'basic', mocks: [], items: {
      'squeeze-theorem:proof': { status: 'known', seen: 9, last: day(6) },
      'limit:definition': { status: 'weak', seen: 1, last: day(1) },
      'task:limit-1': { status: 'weak', seen: 1, last: day(1) },
    } });
    s.merge(state());
    expect(s.get().mode).toBe('basic');
    expect(s.get().items['squeeze-theorem:proof'].status).toBe('known');
    expect(s.get().items['limit:definition'].status).toBe('weak');
    expect(s.get().items['task:limit-1'].status).toBe('known');
  });

  it('does not count the same mock twice', () => {
    const s = new ProgressStore('merge-mocks');
    s.replace(state());
    s.merge(state());
    expect(s.get().mocks).toHaveLength(1);
  });
});
