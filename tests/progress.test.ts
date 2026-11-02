import { describe, expect, it } from 'vitest';
import { ProgressStore } from '../src/store/progress';

// Файл экспорта — обещание людям: файлы, скачанные в прошлых версиях сайта, должны загружаться всегда.
const OLD_FILE = JSON.stringify({
  version: 1,
  mode: 'all',
  items: { 'squeeze-theorem:proof': { status: 'shaky', seen: 3, last: 1790000000000 }, 'task:limit-1': { status: 'known', seen: 1, last: 1790000000001 } },
  mocks: [{ date: 1790000000000, mode: 'all', red: 6.5, redMax: 10, black: 1, blackMax: 5 }],
});
const own = (k: string) => k === 'squeeze-theorem:proof' || k === 'task:limit-1';

// В тестах браузера нет, а восстановление читает localStorage.
const memory = new Map<string, string>();
globalThis.localStorage = {
  getItem: (k: string) => memory.get(k) ?? null,
  setItem: (k: string, v: string) => void memory.set(k, v),
} as unknown as Storage;

describe('progress export and import', () => {
  it('loads a file from an earlier version and exports it back unchanged', () => {
    const s = new ProgressStore('test');
    s.importJson(OLD_FILE, own);
    expect(JSON.parse(s.exportJson())).toEqual(JSON.parse(OLD_FILE));
  });

  it('fills fields missing from old files', () => {
    const s = new ProgressStore('test');
    s.importJson('{"version":1,"items":{}}');
    expect(s.get().mode).toBe('basic');
    expect(s.get().mocks).toEqual([]);
  });

  it.each(['null', '[]', '{}', '{"version":2,"items":{}}', '{"version":1,"items":null}', '{"version":1,"items":[]}', '{"version":1,"items":{},"mocks":5}', '{"version":1,"items":{},"mocks":null}'])('rejects %s and keeps progress', (bad) => {
    const s = new ProgressStore('test');
    s.importJson(OLD_FILE);
    expect(() => s.importJson(bad)).toThrow('Неверный файл прогресса');
    expect(Object.keys(s.get().items)).toHaveLength(2);
  });

  it('repairs a broken saved state instead of crashing', () => {
    localStorage.setItem('exams:broken:progress:v1', '{"version":1,"mode":"zzz","items":null,"mocks":[null,5]}');
    expect(new ProgressStore('broken').get()).toEqual({ version: 1, mode: 'basic', items: {}, mocks: [] });
  });

  it('rejects a file of another exam and keeps progress', () => {
    const s = new ProgressStore('test');
    s.importJson(OLD_FILE, own);
    expect(() => s.importJson('{"version":1,"items":{"other-unit:proof":{"status":"known","seen":1,"last":1}}}', own)).toThrow('другого экзамена');
    expect(Object.keys(s.get().items)).toHaveLength(2);
  });
});
