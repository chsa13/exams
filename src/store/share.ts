import type { Mode, MockResult, State, Status } from './progress';

// Прогресс внутри ссылки: сервера нет, поэтому всё лежит в адресе после #, и на сервер это не уходит.
// Ссылка должна влезать в сообщение (в Telegram до 4096 символов), поэтому формат двоичный:
// отметка занимает 5 байт. Вместо ключа — его хэш, настоящие ключи знает сам сайт.
// Старые ссылки должны открываться: формат не меняем, новый вариант — только с новым номером версии.

const VERSION = 1;
const PREFIX = '#p=';
const HEADER = 3; // версия, режим, число пробных вариантов
const MOCK_SIZE = 7;
const ITEM_SIZE = 5;
/** В ссылку идут только последние пробные варианты: на продолжение подготовки они не влияют. */
const MAX_MOCKS = 20;
const STATUSES: Status[] = ['new', 'weak', 'shaky', 'known'];
const DAY = 86_400_000;
const EPOCH = Date.UTC(2026, 0, 1);

const toDay = (ms: number, max: number) => Math.min(max, Math.max(0, Math.floor((ms - EPOCH) / DAY)));
const fromDay = (day: number) => EPOCH + day * DAY;
/** Баллы кратны 0,25: в один байт помещается до 63,75. */
const toScore = (v: number) => Math.min(255, Math.max(0, Math.round((Number(v) || 0) * 4)));

/** Хэш с id экзамена: ссылка другого экзамена просто не совпадёт ни с одним ключом. */
export function shareHash(examId: string, key: string): number {
  const text = `${examId}|${key}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return ((h >>> 24) ^ h) & 0xffffff;
}

export function encodeShare(examId: string, state: State): string {
  const items = Object.entries(state.items);
  const mocks = state.mocks.slice(-MAX_MOCKS);
  const bytes = new Uint8Array(HEADER + mocks.length * MOCK_SIZE + items.length * ITEM_SIZE);
  bytes.set([VERSION, state.mode === 'all' ? 1 : 0, mocks.length]);
  let at = HEADER;
  for (const m of mocks) {
    const day = toDay(m.date, 0xffff);
    bytes.set([day >> 8, day & 255, m.mode === 'all' ? 1 : 0, toScore(m.red), toScore(m.redMax), toScore(m.black), toScore(m.blackMax)], at);
    at += MOCK_SIZE;
  }
  for (const [key, item] of items) {
    const h = shareHash(examId, key);
    const packed = (Math.max(0, STATUSES.indexOf(item.status)) << 14) | (Math.min(7, item.seen) << 11) | toDay(item.last, 2047);
    bytes.set([h >> 16, (h >> 8) & 255, h & 255, packed >> 8, packed & 255], at);
    at += ITEM_SIZE;
  }
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** keys — все ключи экзамена. null, если ссылка испорчена или в ней нет ничего для этого экзамена. */
export function decodeShare(examId: string, text: string, keys: string[]): State | null {
  let bytes: Uint8Array;
  try {
    bytes = Uint8Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
  if (bytes.length < HEADER || bytes[0] !== VERSION) return null;
  const mode: Mode = bytes[1] === 1 ? 'all' : 'basic';
  const itemsAt = HEADER + bytes[2] * MOCK_SIZE;
  if (bytes.length < itemsAt || (bytes.length - itemsAt) % ITEM_SIZE !== 0) return null;

  const mocks: MockResult[] = [];
  for (let at = HEADER; at < itemsAt; at += MOCK_SIZE) {
    const [hi, lo, m, red, redMax, black, blackMax] = bytes.subarray(at, at + MOCK_SIZE);
    mocks.push({ date: fromDay((hi << 8) | lo), mode: m === 1 ? 'all' : 'basic', red: red / 4, redMax: redMax / 4, black: black / 4, blackMax: blackMax / 4 });
  }

  const byHash = new Map(keys.map((k) => [shareHash(examId, k), k]));
  const items: State['items'] = {};
  for (let at = itemsAt; at < bytes.length; at += ITEM_SIZE) {
    const key = byHash.get((bytes[at] << 16) | (bytes[at + 1] << 8) | bytes[at + 2]);
    if (!key) continue;
    const packed = (bytes[at + 3] << 8) | bytes[at + 4];
    items[key] = { status: STATUSES[packed >> 14], seen: (packed >> 11) & 7, last: fromDay(packed & 2047) };
  }
  if (!Object.keys(items).length && !mocks.length) return null;
  return { version: 1, mode, items, mocks };
}

/** Что лежит в адресе страницы: нет ссылки — null, испорчена — 'bad'. */
export function readShareHash(examId: string, hash: string, keys: string[]): State | 'bad' | null {
  if (!hash.startsWith(PREFIX)) return null;
  return decodeShare(examId, hash.slice(PREFIX.length), keys) ?? 'bad';
}

/** Убирает данные из адреса: иначе обновление страницы предложило бы загрузить их снова. */
export function clearShareHash() {
  if (location.hash.startsWith(PREFIX)) history.replaceState(history.state, '', location.pathname + location.search);
}

export function shareUrl(examId: string, state: State): string {
  return `${location.origin}${import.meta.env.BASE_URL}${examId}/settings${PREFIX}${encodeShare(examId, state)}`;
}
