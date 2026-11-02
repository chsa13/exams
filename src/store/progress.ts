import { useSyncExternalStore } from 'react';
import { useCat } from '../exam';

// Прогресс хранится в браузере (localStorage), отдельно для каждого экзамена. Сервер не нужен.

export type Status = 'new' | 'weak' | 'shaky' | 'known';
export type Mode = 'basic' | 'all';

export interface ItemProgress {
  status: Status;
  seen: number;
  last: number;
}

export interface MockResult {
  date: number;
  mode: Mode;
  red: number;
  redMax: number;
  black: number;
  blackMax: number;
}

export interface State {
  version: 1;
  mode: Mode;
  /** ключ — `${unitId}:${kind}` для граней и `task:${id}` для задач */
  items: Record<string, ItemProgress>;
  mocks: MockResult[];
}

type Slot = 'progress' | 'cards' | 'mock';

// Коллоквиум по матану жил на сайте один; его ключи оставляем, чтобы не потерять прогресс.
const LEGACY: Record<string, Record<Slot, string>> = {
  'matan-colloc': { progress: 'colloc-matan-v1', cards: 'colloc-cards-sessions-v1', mock: 'colloc-mock-current' },
};

/** Ключ localStorage для данных экзамена. */
export function storageKey(examId: string, slot: Slot): string {
  return LEGACY[examId]?.[slot] ?? `exams:${examId}:${slot}:v1`;
}

const empty = (): State => ({ version: 1, mode: 'basic', items: {}, mocks: [] });

const isPlainObject = (v: unknown): v is object => !!v && typeof v === 'object' && !Array.isArray(v);

/** Приводит сохранённые данные к рабочему виду: испорченное поле не должно ломать страницы экзамена. */
function normalize(parsed: State): State {
  return {
    ...empty(),
    ...parsed,
    mode: parsed.mode === 'all' ? 'all' : 'basic',
    items: isPlainObject(parsed.items) ? parsed.items : {},
    mocks: Array.isArray(parsed.mocks) ? parsed.mocks.filter(isPlainObject) : [],
  };
}

export class ProgressStore {
  private state: State;
  private listeners = new Set<() => void>();
  private readonly key: string;

  constructor(examId: string) {
    this.key = storageKey(examId, 'progress');
    this.state = this.load();
    if (typeof window !== 'undefined') {
      // Обновление между вкладками
      window.addEventListener('storage', (e) => {
        if (e.key === this.key) {
          this.state = this.load();
          this.emit();
        }
      });
    }
  }

  private load(): State {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return empty();
      const parsed = JSON.parse(raw) as State;
      if (parsed.version !== 1) return empty();
      return normalize(parsed);
    } catch {
      return empty();
    }
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  private set(next: State) {
    this.state = next;
    try {
      localStorage.setItem(this.key, JSON.stringify(next));
    } catch {
      // приватный режим / нет места — прогресс просто не сохранится
    }
    this.emit();
  }

  get = (): State => this.state;

  subscribe = (cb: () => void) => {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  };

  setMode(mode: Mode) {
    this.set({ ...this.state, mode });
  }

  mark(key: string, status: Exclude<Status, 'new'>) {
    const prev = this.state.items[key];
    this.set({
      ...this.state,
      items: { ...this.state.items, [key]: { status, seen: (prev?.seen ?? 0) + 1, last: Date.now() } },
    });
  }

  addMock(r: MockResult) {
    this.set({ ...this.state, mocks: [...this.state.mocks, r] });
  }

  exportJson(): string {
    return JSON.stringify(this.state, null, 2);
  }

  /** ownKey проверяет, что отметка относится к этому экзамену: файл другого экзамена не должен затереть прогресс. */
  importJson(json: string, ownKey?: (key: string) => boolean) {
    const parsed = JSON.parse(json) as State | null;
    const badMocks = parsed?.mocks !== undefined && !Array.isArray(parsed?.mocks);
    if (parsed?.version !== 1 || !isPlainObject(parsed.items) || badMocks) throw new Error('Неверный файл прогресса');
    const keys = Object.keys(parsed.items);
    if (ownKey && keys.length && !keys.some(ownKey)) throw new Error('Это файл другого экзамена, прогресс не изменён');
    this.set(normalize(parsed));
  }

  reset() {
    this.set({ ...empty(), mode: this.state.mode });
  }
}

const stores = new Map<string, ProgressStore>();

export function progressStore(examId: string): ProgressStore {
  let s = stores.get(examId);
  if (!s) {
    s = new ProgressStore(examId);
    stores.set(examId, s);
  }
  return s;
}

/** Хранилище прогресса текущего экзамена. */
export function useStore(): ProgressStore {
  return progressStore(useCat().exam.id);
}

/** Прогресс текущего экзамена; компонент перерисовывается при изменениях. */
export function useProgress(): State {
  return useProgressOf(useCat().exam.id);
}

export function useProgressOf(examId: string): State {
  const s = progressStore(examId);
  return useSyncExternalStore(s.subscribe, s.get);
}
