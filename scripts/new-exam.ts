/**
 * Каркас нового экзамена по плану: npm run new-exam -- <plan.json> [--dry]
 *
 * План (plan.json) лежит в рабочей папке материалов (~/exam-work/<id>/), его пишет Claude по списку вопросов
 * и объявлениям. Скрипт:
 *   1. создаёт content/<id>/: index.ts (конфиг), how.ts (разделы по CLAUDE.md §4), файлы тем с заготовками
 *      единиц (у каждой грани текст «TODO»), tasks.ts;
 *   2. подключает экзамен в content/index.ts;
 *   3. добавляет строку в README.md, раздел в DESIGN.md, строку в «Не выложено» CHANGELOG.md;
 *   4. дописывает в tests/content.test.ts проверку: все пункты списка вопросов на месте, пробный вариант как в плане.
 *
 * Существующие файлы не перезаписывает. Пока где-то осталось «TODO», npm test падает (tests/style.test.ts) —
 * так недописанный экзамен не уйдёт на сайт.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exams } from '../content';
import { GLYPHS, SITE_ICON } from '../src/ui/glyphs';
import type { Exam, Feature, Kind, Level, MockSpec, Skill, StarColor } from '../src/content/schema';

interface PlanUnit {
  id: string;
  title: string;
  source: string;
  /** Какие грани есть и какого уровня: { "definition": "basic", "proof": "advanced" }. */
  facets: Partial<Record<Kind, Level>>;
  uses?: string[];
  lemmas?: string[];
  aux?: boolean;
}

interface PlanTopic {
  id: string;
  /** Имя файла без .ts; несколько тем могут жить в одном файле. По умолчанию — id. */
  file?: string;
  title: string;
  longread: number;
  units: PlanUnit[];
}

interface Plan {
  id: string;
  /** Образец из CLAUDE.md §2 — для комментария в конфиге и раздела DESIGN.md. */
  template: 'mia-colloc' | 'matan-colloc' | 'pilot-colloc' | 'linal-kr2';
  exam: {
    subject: string;
    kind: string;
    short: string;
    icon: string;
    dates: [string, string];
    when: string;
    format: string;
    scope: string;
    levels: boolean;
    star?: StarColor;
    features: Feature[];
    tasksNote?: string;
    skills?: Skill[];
    statementQuestions?: boolean;
    sourceLabel?: string;
  };
  mock: MockSpec;
  topics: PlanTopic[];
}

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const planPath = args.find((a) => !a.startsWith('--'));
if (!planPath) {
  console.error('Использование: npm run new-exam -- ~/exam-work/<id>/plan.json [--dry]');
  process.exit(1);
}
const plan: Plan = JSON.parse(readFileSync(planPath.replace(/^~/, process.env.HOME ?? '~'), 'utf8'));

// ------------------------------------------------------------------ проверка плана

const problems: string[] = [];
const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;
if (!kebab.test(plan.id)) problems.push(`id «${plan.id}» — не kebab-case`);
if (exams.some((e) => e.id === plan.id)) problems.push(`экзамен ${plan.id} уже есть`);
const usedIcon = exams.find((e) => e.icon === plan.exam.icon);
if (usedIcon || plan.exam.icon === SITE_ICON) problems.push(`значок ${plan.exam.icon} уже занят (${usedIcon?.id ?? 'значок сайта'})`);
const unitIds = new Set<string>();
const topicIds = new Set<string>();
for (const t of plan.topics) {
  if (!kebab.test(t.id) || topicIds.has(t.id)) problems.push(`тема ${t.id}: id не kebab-case или повторяется`);
  topicIds.add(t.id);
  for (const u of t.units) {
    if (!kebab.test(u.id) || unitIds.has(u.id)) problems.push(`единица ${u.id}: id не kebab-case или повторяется`);
    unitIds.add(u.id);
    if (!Object.keys(u.facets).length) problems.push(`единица ${u.id}: нет ни одной грани`);
    if (!plan.exam.levels && Object.values(u.facets).some((l) => l !== 'basic')) problems.push(`единица ${u.id}: без уровней всё basic`);
  }
}
for (const t of plan.topics)
  for (const u of t.units)
    for (const ref of [...(u.uses ?? []), ...(u.lemmas ?? [])]) if (!unitIds.has(ref)) problems.push(`${u.id}: ссылка на неизвестную единицу ${ref}`);
const slots = plan.mock.kind === 'test' ? plan.mock.slots : (plan.mock.layout?.taskSlots ?? []);
for (const s of slots) for (const t of s.topics ?? []) if (!topicIds.has(t)) problems.push(`позиция «${s.label}»: нет темы ${t}`);
if (problems.length) {
  console.error('План не годится:\n- ' + problems.join('\n- '));
  process.exit(1);
}

// ------------------------------------------------------------------ сериализация в TS

const camel = (id: string) => id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const isIdent = (k: string) => /^[A-Za-z_$][\w$]*$/.test(k);

/** Строка: с формулами или обратным слешем — в md`…` (в кавычках слеш теряется), иначе в одинарных кавычках. */
function str(s: string): string {
  if (/[\\$`]/.test(s)) return 'md`' + s.replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';
  return `'${s.replace(/'/g, "\\'")}'`;
}

function lit(v: unknown, ind = ''): string {
  if (typeof v === 'string') return str(v);
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) {
    const flat = `[${v.map((x) => lit(x, ind)).join(', ')}]`;
    if (flat.length < 90 && !flat.includes('\n')) return flat;
    return `[\n${v.map((x) => `${ind}  ${lit(x, ind + '  ')},`).join('\n')}\n${ind}]`;
  }
  if (v && typeof v === 'object') {
    const entries = Object.entries(v).filter(([, x]) => x !== undefined);
    const flat = `{ ${entries.map(([k, x]) => `${isIdent(k) ? k : `'${k}'`}: ${lit(x, ind)}`).join(', ')} }`;
    if (flat.length < 100 && !flat.includes('\n')) return flat;
    return `{\n${entries.map(([k, x]) => `${ind}  ${isIdent(k) ? k : `'${k}'`}: ${lit(x, ind + '  ')},`).join('\n')}\n${ind}}`;
  }
  return 'undefined';
}

const TODO = 'md`TODO`';

function unitStub(u: PlanUnit): string {
  const i = '      ';
  const out = [`${i}id: ${str(u.id)},`, `${i}title: ${str(u.title)},`, `${i}source: ${str(u.source)},`];
  if (u.aux) out.push(`${i}aux: true,`);
  for (const k of ['definition', 'statement'] as const)
    if (u.facets[k]) out.push(`${i}${k}: { level: '${u.facets[k]}', text: ${TODO} },`);
  if (u.facets.proof)
    out.push(
      `${i}proof: {`,
      `${i}  level: '${u.facets.proof}',`,
      `${i}  idea: ${TODO},`,
      `${i}  steps: [`,
      `${i}    { title: ${TODO}, body: ${TODO} },`,
      `${i}  ],`,
      `${i}},`,
    );
  if (u.uses?.length) out.push(`${i}uses: ${lit(u.uses)},`);
  if (u.lemmas?.length) out.push(`${i}lemmas: ${lit(u.lemmas)},`);
  out.push(`${i}pitfalls: [${TODO}],`);
  return `    {\n${out.join('\n')}\n    },`;
}

function topicFile(topics: PlanTopic[]): string {
  const label = plan.exam.sourceLabel ?? 'Лонгрид';
  const blocks = topics.map(
    (t) => `// ${label} ${t.longread}. ${t.title}

export const ${camel(t.id)}: Topic = {
  id: ${str(t.id)},
  title: ${str(t.title)},
  longread: ${t.longread},
  units: [
${t.units.map(unitStub).join('\n')}
  ],
};`,
  );
  return `import { md, type Topic } from '../../src/content/schema';\n\n${blocks.join('\n\n')}\n`;
}

function indexFile(): string {
  const e = plan.exam;
  const files = [...new Set(plan.topics.map((t) => t.file ?? t.id))];
  const imports = files.map((f) => {
    const names = plan.topics.filter((t) => (t.file ?? t.id) === f).map((t) => camel(t.id));
    return `import { ${names.join(', ')} } from './${f}';`;
  });
  const hasTasks = e.features.includes('tasks');
  const cfg: Record<string, unknown> = {
    id: plan.id,
    subject: e.subject,
    kind: e.kind,
    short: e.short,
    icon: e.icon,
    dates: e.dates,
    when: e.when,
    format: e.format,
    scope: e.scope,
    levels: e.levels,
    star: e.levels ? undefined : (e.star ?? 'red'),
    features: e.features,
    mock: plan.mock,
    tasksNote: hasTasks ? (e.tasksNote ?? 'TODO Сначала реши сам, потом открывай подсказки по одной, и только потом решение.') : '',
    skills: e.skills,
    statementQuestions: e.statementQuestions,
    sourceLabel: e.sourceLabel,
  };
  const body = lit(cfg).slice(0, -2); // без закрывающей «}» — допишем поля-ссылки
  const topics = plan.topics.map((t) => camel(t.id)).join(', ');
  return `import type { Exam } from '../../src/content/schema';
${imports.join('\n')}
${hasTasks ? "import { tasks } from './tasks';\n" : ''}import { how } from './how';

// Образец: ${plan.template}.

export const ${camel(plan.id)}: Exam = ${body}
  how,
  topics: [${topics}],
  tasks${hasTasks ? '' : ': []'},
};
`;
}

const SITE_STEPS: Record<Feature, (id: string, mockTitle: string, test: boolean) => string> = {
  topics: (id) => `[Справочник](/${id}/topics) — TODO`,
  cards: (id) => `[Карточки](/${id}/cards) — гоняй определения и формулировки до «знаю».`,
  proofs: (id) => `[Доказательства](/${id}/proofs) — разбери по шагам, затем «Расставь шаги».`,
  quant: (id) => `[Кванторы](/${id}/quant) — TODO`,
  tasks: (id) => `[Задачи](/${id}/tasks) — TODO`,
  mock: (id, title, test) =>
    `[${title}](/${id}/mock) — реши пару раз перед ${test ? 'контрольной' : 'коллоквиумом'}, в реальном времени.`,
};

function howFile(): string {
  const test = plan.mock.kind === 'test';
  const id = plan.id;
  const order: Feature[] = test ? ['topics', 'tasks', 'proofs', 'cards', 'mock'] : ['topics', 'cards', 'proofs', 'quant', 'tasks', 'mock'];
  const steps = order
    .filter((f) => plan.exam.features.includes(f))
    .map((f, i) => `${i + 1}. ${SITE_STEPS[f](id, plan.mock.title, test)}`);
  const skills = plan.exam.skills?.length
    ? `## Что нужно уметь\n\nКаждый пункт открывает задачи по этому навыку.\n\n${plan.exam.skills
        .map((s, i) => `${i + 1}. [${s.title}](/${id}/tasks?skill=${s.id}) — TODO`)
        .join('\n')}\n\n`
    : '';
  const minutes = plan.mock.kind === 'ticket' ? plan.mock.prepMin : plan.mock.minutes;
  const middle = test
    ? `## Работа: TODO баллов

TODO

${skills}## Как оформлять

- TODO
`
    : `## Билет: TODO вопросов, TODO баллов

| Вопросы | Что | Баллы |
|---|---|---|
| TODO | TODO | TODO |

## Как распределить ${minutes} минут

1. **TODO минут** — TODO

## На ответе

- TODO
`;
  return `// Страница «Как устроен${test ? 'а КР' : ' коллоквиум'}». Регламент — из TODO, советы — наши.

export const how = \`
# Как устроен${test ? 'а контрольная' : ' коллоквиум'}

- **Когда:** TODO
- **Время:** TODO
- **Что входит:** TODO
- **Нельзя:** TODO
- **${test ? 'Сдача' : 'Апелляция'}:** TODO

${middle}
## Как готовиться на сайте

${steps.join('\n')}
\`;
`;
}

const TASKS_FILE = `import { md, type Task } from '../../src/content/schema';

// Банк задач. Источник у каждой задачи — в поле source; условия из контрольных пересказаны, числа изменены.

export const tasks: Task[] = [
  // Шаблон:
  // {
  //   id: 'x-...', topic: '<id темы>', scales: ['red'], type: 'compute', points: 1,
  //   source: 'По мотивам семинара N, задача M',
  //   prompt: md\`Найди …\`,
  //   hints: [md\`Идея …\`],
  //   answer: md\`Решение с обоснованием …\`,
  // },
];

void md;
`;

// ------------------------------------------------------------------ правки общих файлов

function nextLetter(l: string): string {
  const abc = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';
  return abc[abc.indexOf(l) + 1];
}

function editIndex(src: string): string {
  const name = camel(plan.id);
  const lines = src.split('\n');
  const lastImport = lines.map((l) => l.startsWith('import {')).lastIndexOf(true);
  lines.splice(lastImport + 1, 0, `import { ${name} } from './${plan.id}';`);
  return lines.join('\n').replace(/(export const exams: Exam\[\] = \[[^\]]*)\]/, `$1, ${name}]`);
}

function editReadme(src: string): string {
  const lines = src.split('\n');
  const last = lines.map((l) => l.startsWith('| [')).lastIndexOf(true);
  lines.splice(last + 1, 0, `| [${plan.exam.short}](https://chsa13.github.io/exams/${plan.id}) | ${plan.exam.when} |`);
  return lines.join('\n');
}

function editChangelog(src: string): string {
  const line = `- Новый экзамен: ${plan.exam.short} (${plan.exam.when}).`;
  if (src.includes('## Не выложено')) return src.replace(/## Не выложено\n+/, (m) => `${m}${line}\n`);
  return src.replace(/\n## /, `\n## Не выложено\n\n${line}\n\n## `);
}

function editDesign(src: string): string {
  const m = src.match(/^## (\S)\. Правила контента/m);
  if (!m) throw new Error('В DESIGN.md нет раздела «Правила контента»');
  const letter = m[1];
  const section = `## ${letter}. ${plan.exam.kind}: ${plan.exam.subject}

ЦУ, 2026/27. ${plan.exam.when}, ${plan.exam.format}. Образец — \`${plan.template}\`.

Источники: TODO

- TODO: чем отличается от образца.

`;
  let out = src.replace(m[0], `${section}## ${nextLetter(letter)}. Правила контента`);
  const tree = out.split('\n');
  const lastExam = tree.map((l) => /^  [a-z0-9-]+\/\s+#/.test(l)).lastIndexOf(true);
  if (lastExam >= 0) tree.splice(lastExam + 1, 0, `  ${`${plan.id}/`.padEnd(26)}# ${plan.exam.short}`);
  out = tree.join('\n');
  return out;
}

function testBlock(): string {
  const units = plan.topics.flatMap((t) => t.units).filter((u) => !u.aux);
  const d = units.filter((u) => u.facets.definition).length;
  const s = units.filter((u) => u.facets.statement && !u.facets.proof).length;
  const p = units.filter((u) => u.facets.proof).length;
  return `
describe('${plan.id}', () => {
  const exam = exams.find((e) => e.id === '${plan.id}')!;
  const units = unitsOf(exam).filter((u) => !u.aux);

  it('covers the question list: ${d} definitions, ${s} statements, ${p} proofs', () => {
    expect(units.filter((u) => u.definition).length).toBe(${d});
    expect(units.filter((u) => u.statement && !u.proof).length).toBe(${s});
    expect(units.filter((u) => u.proof).length).toBe(${p});
  });

  it('mock matches the announcement', () => {
    expect(exam.mock).toEqual(${lit(plan.mock, '    ')});
  });
});
`;
}

// ------------------------------------------------------------------ запись

const dir = join(ROOT, 'content', plan.id);
const writes: [string, string][] = [];
const byFile = new Map<string, PlanTopic[]>();
for (const t of plan.topics) byFile.set(t.file ?? t.id, [...(byFile.get(t.file ?? t.id) ?? []), t]);
for (const [f, ts] of byFile) writes.push([join(dir, `${f}.ts`), topicFile(ts)]);
writes.push([join(dir, 'index.ts'), indexFile()], [join(dir, 'how.ts'), howFile()]);
if (plan.exam.features.includes('tasks')) writes.push([join(dir, 'tasks.ts'), TASKS_FILE]);

const edits: [string, (s: string) => string][] = [
  ['content/index.ts', editIndex],
  ['README.md', editReadme],
  ['CHANGELOG.md', editChangelog],
  ['DESIGN.md', editDesign],
  ['tests/content.test.ts', (s) => s.trimEnd() + '\n' + testBlock()],
];

if (dry) {
  for (const [p, c] of writes) console.log(`\n=== ${p}\n${c}`);
  console.log('\n=== tests/content.test.ts (+)\n' + testBlock());
  process.exit(0);
}

if (existsSync(dir)) {
  console.error(`Папка ${dir} уже есть — каркас не перезаписываю.`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });
for (const [p, c] of writes) writeFileSync(p, c);
for (const [p, f] of edits) writeFileSync(join(ROOT, p), f(readFileSync(join(ROOT, p), 'utf8')));

const units = plan.topics.flatMap((t) => t.units);
console.log(`Каркас ${plan.id}: ${plan.topics.length} тем, ${units.length} единиц, файлов ${writes.length}.`);
console.log('Подключён в content/index.ts; строки в README.md, CHANGELOG.md, DESIGN.md; проверка в tests/content.test.ts.');
if (!GLYPHS[plan.exam.icon]) console.log(`Нарисуй значок ${plan.exam.icon} в src/ui/glyphs.ts (контур в квадрате 48×48).`);
console.log(`Дальше: заполни TODO и смотри npm run exam-report -- ${plan.id}`);
