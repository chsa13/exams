import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { exams } from '../content';

// Единый стиль всех экзаменов. Правила словами — в CLAUDE.md, раздел «Тексты экзамена».
// Меняешь правило — меняй его здесь и в CLAUDE.md и сразу приводи к нему ВСЕ экзамены, а не только новый.

const TASKS_TAIL = 'Сначала реши сам, потом открывай подсказки по одной, и только потом решение.';
const MOCK_TITLE = { ticket: 'Пробный билет', test: 'Пробная КР' } as const;
const HOW_FACTS = ['Когда', 'Время', 'Что входит', 'Нельзя'];
const HOW_LAST = 'Как готовиться на сайте';
/** Чего не должно быть в текстах: уровни — компонентом Star, пробный вариант — по названию из mock.title. */
const BANNED = [/🔴|⚫/u, /пробник/i, /коллок(?!виум)/i];
/** Адреса внутри раздела экзамена, на которые можно ссылаться, кроме разделов из features. */
const PAGES = ['how', 'settings', 'topic'];

const files = (dir: string, ext: RegExp): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? files(join(dir, d.name), ext) : ext.test(d.name) ? [join(dir, d.name)] : [],
  );

describe('exam texts follow one style', () => {
  for (const e of exams) {
    describe(e.id, () => {
      const how = e.how.trim();
      const short = [e.when, e.format, e.scope, e.tasksNote, how];

      it('subject is the subject only; short is «Коллоквиум по …» / «КР2 по …»', () => {
        expect(e.subject).not.toMatch(/поток|,/);
        expect(e.short).toMatch(/^(Коллоквиум|КР\d*) по /);
      });

      it('when / format / scope: one line each, no trailing period', () => {
        for (const s of [e.when, e.format, e.scope]) expect(s, s).not.toMatch(/\.$|\n/);
        expect(e.format, 'format начинается с числа: «45 минут…», «~45 минут…»').toMatch(/^[~\d]/);
        expect(e.scope, 'scope = «Источник: темы»').toMatch(/^[^:]+: \S/);
        expect(e.scope, 'в scope без счётчиков вопросов').not.toMatch(/\d+ (вопрос|теорем)/);
      });

      it('tasksNote ends with the shared advice (empty without tasks)', () => {
        if (e.features.includes('tasks')) expect(e.tasksNote.endsWith(TASKS_TAIL), e.tasksNote).toBe(true);
        else expect(e.tasksNote).toBe('');
      });

      it('mock title matches its kind', () => {
        expect(e.mock.title).toBe(MOCK_TITLE[e.mock.kind]);
      });

      it('how: title, facts list, last section «Как готовиться на сайте»', () => {
        expect(how.split('\n')[0]).toMatch(/^# Как устроен(а)? (коллоквиум|контрольная)$/);
        for (const f of HOW_FACTS) expect(how, `нет пункта **${f}:**`).toContain(`- **${f}:** `);
        const h2 = [...how.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
        expect(h2.at(-1)).toBe(HOW_LAST);
        const last = how.slice(how.lastIndexOf(`## ${HOW_LAST}`)).split('\n').filter((l) => /^\d+\. /.test(l));
        expect(last.length).toBeGreaterThan(2);
        for (const l of last) expect(l, 'пункт: «N. [Раздел](/id/…) — глагол на «ты»…»').toMatch(/^\d+\. \[[^\]]+\]\(\/[^)]+\)( и \[[^\]]+\]\(\/[^)]+\))? — \S/);
      });

      it('no emoji level marks or «пробник»', () => {
        for (const s of short) for (const re of BANNED) expect(s, `${re} в «${s.slice(0, 60)}…»`).not.toMatch(re);
      });

      it('every task has a source and 1–2 hints', () => {
        for (const t of e.tasks) {
          expect(t.source, t.id).toBeTruthy();
          expect(t.hints.length, t.id).toBeGreaterThanOrEqual(1);
          expect(t.hints.length, t.id).toBeLessThanOrEqual(2);
        }
      });

      it('task prompts address the reader as «ты»', () => {
        const formal = /(^|[^а-яё])(найдите|докажите|проверьте|объясните|обоснуйте|выпишите|постройте|опишите|выразите)(?![а-яё])/i;
        for (const t of e.tasks) expect(t.prompt, t.id).not.toMatch(formal);
      });

      it('links inside content lead to this exam and its sections', () => {
        const allowed = new Set<string>([...e.features, ...PAGES]);
        const topics = new Set(e.topics.map((t) => t.id));
        for (const f of files(join('content', e.id), /\.ts$/)) {
          for (const m of readFileSync(f, 'utf8').matchAll(/\]\((\/[^)\s]*)\)/g)) {
            const [, id, page, sub] = m[1].split(/[/?]/);
            expect(id, `${f}: ${m[1]}`).toBe(e.id);
            if (page) expect(allowed.has(page), `${f}: ${m[1]}`).toBe(true);
            if (page === 'topic') expect(topics.has(sub), `${f}: ${m[1]}`).toBe(true);
          }
        }
      });
    });
  }
});

describe('UI strings', () => {
  it('no emoji level marks or «пробник» in src (comments aside)', () => {
    for (const f of files('src', /\.tsx?$/)) {
      readFileSync(f, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          const t = line.trim();
          if (/^(\/\/|\/\*|\*|\{\/\*)/.test(t)) return;
          const code = t.replace(/\s\/\/.*$/, '');
          for (const re of BANNED) expect(code, `${f}:${i + 1}`).not.toMatch(re);
        });
    }
  });
});

// Правила оформления — CLAUDE.md, §7, подраздел «Оформление».
describe('styles.css follows the design rules', () => {
  const css = readFileSync('src/styles.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ selector: m[1].trim(), body: m[2] }));
  const light = rules.find((r) => r.selector === ':root')!.body;
  const dark = rules.find((r) => r.selector.startsWith(':root:not'))!.body;

  it('no uppercase labels, no italic, weights 400–600', () => {
    expect(css).not.toMatch(/text-transform:\s*uppercase/);
    expect(css).not.toMatch(/font-style:\s*italic/);
    for (const m of css.matchAll(/font-weight:\s*(\d+)/g)) expect(['400', '500', '600']).toContain(m[1]);
  });

  it('links styled as buttons or cards are not underlined on hover', () => {
    const noUnderline = rules.filter((r) => /text-decoration:\s*none/.test(r.body)).flatMap((r) => r.selector.split(',').map((x) => x.trim()));
    for (const sel of ['.btn:hover', '.exam-card:hover', '.topic-card:hover', '.ready-row:hover', '.cell:hover', '.nav a:hover']) expect(noUnderline).toContain(sel);
  });

  it('manual dark theme uses the same values as the system one', () => {
    const manual = rules.find((r) => r.selector === ":root[data-theme='dark']")!.body;
    const tidy = (b: string) => b.split(';').map((x) => x.trim()).filter(Boolean);
    expect(tidy(manual)).toEqual(tidy(dark));
  });

  it('content blocks do not get their own scrollbars; only a formula may scroll', () => {
    for (const r of rules) if (/overflow-x:\s*auto/.test(r.body)) expect(r.selector).not.toMatch(/\.(card|task|tq|unit)\b/);
  });

  it('key components keep their styles', () => {
    const selectors = rules.map((r) => r.selector).join(' ');
    for (const c of ['exam-icon', 'exam-top', 'exam-main', 'exam-title', 'exam-subject', 'ring', 'meter', 'ready-list', 'ready-row', 'big-arrow', 'brand-home']) expect(selectors).toContain(`.${c}`);
  });

  it('choosing a menu item changes only its color, so nothing jumps', () => {
    const active = rules.find((r) => r.selector === '.nav a.active')!.body;
    expect(active).not.toMatch(/font-weight|font-size|padding|border|background/);
  });

  it('spacing is set in px, not em', () => {
    expect(css).not.toMatch(/(?:padding|margin|gap)[\w-]*:[^;]*\d(?:r?em)\b/);
  });

  const token = (block: string, name: string) => {
    const m = block.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`));
    if (!m) throw new Error(`нет токена --${name}`);
    return m[1];
  };
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };

  it('text on solid fills reaches 4.5:1 in both themes', () => {
    for (const block of [light, dark]) {
      for (const [fill, ink] of [
        ['accent', 'on-accent'],
        ['known-solid', 'on-solid'],
        ['weak', 'on-solid'],
        ['shaky', 'on-shaky'],
      ]) {
        expect(contrast(token(block, fill), token(block.includes(`--${ink}:`) ? block : light, ink)), `${fill} / ${ink}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
