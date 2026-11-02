// Типы базы знаний. Тексты — Markdown с формулами KaTeX ($...$ и $$...$$).

/** Уровень курса: basic = основной (🔴), advanced = продвинутый (⚫). */
export type Level = 'basic' | 'advanced';

/** Шкала зачёта в билете: красная (основной) и/или чёрная (продвинутый). */
export type Scale = 'red' | 'black';

/** Цвет звёздочки: шкалы уровней и цвет курса. */
export type StarColor = Scale | 'blue';

/** Грань единицы знания — то, что спрашивают отдельным вопросом. */
export type Kind = 'definition' | 'statement' | 'proof';

export interface TextFacet {
  level: Level;
  text: string;
}

export interface ProofStep {
  /** Короткое название шага — его и надо вспомнить. */
  title: string;
  body: string;
}

export interface ProofFacet {
  level: Level;
  /** Идея доказательства в одну-две строки. */
  idea: string;
  steps: ProofStep[];
}

export interface Unit {
  id: string;
  title: string;
  /** Где искать в лонгридах, например «Лонгрид 10, теорема 2». */
  source: string;
  definition?: TextFacet;
  statement?: TextFacet;
  proof?: ProofFacet;
  /** Примеры, замечания, следствия — показываются в справочнике. */
  notes?: string;
  pitfalls?: string[];
  /** id теорем из курса, на которые доказательство ссылается (их доказывать в ответе не нужно). */
  uses?: string[];
  /**
   * id лемм, которые доказательство использует и которые нужно доказать в ответе.
   * Их доказательства показываются прямо перед основными шагами.
   */
  lemmas?: string[];
  /** Вспомогательное утверждение не из списка вопросов: не попадает в билет как отдельный вопрос. */
  aux?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  /** Номер лонгрида в «Сборнике лонгридов». */
  longread: number;
  units: Unit[];
}

export type TaskType = 'quantifiers' | 'true-false' | 'prove' | 'compute' | 'construct';

export interface Task {
  id: string;
  topic: string;
  /** Навык из списка «что нужно уметь» (Exam.skills). Без него задача — для понимания, в пробную КР не идёт. */
  skill?: string;
  /** В какие шкалы идут баллы (как цвет звёздочек в билете). */
  scales: Scale[];
  type: TaskType;
  points: number;
  prompt: string;
  hints: string[];
  answer: string;
  source?: string;
}

/** Разделы сайта, которые есть у экзамена. */
export type Feature = 'topics' | 'cards' | 'proofs' | 'quant' | 'tasks' | 'mock';

/** Что лектор просит уметь на контрольной: отдельный фильтр в банке задач. */
export interface Skill {
  /** Значение фильтра в адресе: /<id>/tasks?skill=<id>. */
  id: string;
  title: string;
}

/** Позиция пробной контрольной: одна задача из подходящих по теме, навыку и типу. */
export interface MockSlot {
  label: string;
  topics?: string[];
  skills?: string[];
  types?: TaskType[];
  /** Баллы позиции: столько же стоит каждая подходящая задача (сверяет тест). */
  points?: number;
}

/**
 * Состав билета коллоквиума по основному уровню: сколько определений, формулировок и доказательств
 * и какие задачи (по позиции на задачу). Без него — структура демо-билета коллоквиума по матану.
 */
export interface TicketLayout {
  definitions: number;
  statements: number;
  proofs: number;
  taskSlots: MockSlot[];
  /**
   * Баллы за каждое доказательство, если они разные (формулировка и доказательство оцениваются одним пунктом).
   * Задаёт и число доказательств — тогда proofs не используется. Без него каждое доказательство — 0,5 + 2.
   */
  proofPoints?: number[];
  /** Сколько вопросов по теории надо сдать (на полный балл), чтобы засчитывались доказательства. */
  theoryGate?: number;
  /** Максимальная оценка, если баллов в билете больше (лишние — запас). */
  scoreCap?: number;
}

/**
 * Пробник. ticket — билет коллоквиума (теория + задачи, подготовка и ответ по таймеру);
 * test — письменная контрольная из задач банка: решаешь по таймеру, потом проверяешь себя.
 */
export type MockSpec =
  | { kind: 'ticket'; title: string; prepMin: number; answerMin: number; layout?: TicketLayout }
  | {
      kind: 'test';
      title: string;
      minutes: number;
      slots: MockSlot[];
      /** Максимальная оценка, если баллов в работе больше (лишние — запас). */
      scoreCap?: number;
    };

/** Экзамен (коллоквиум, контрольная…) — всё, что нужно сайту, чтобы собрать для него раздел. */
export interface Exam {
  /** Часть адреса: /<id>/cards. */
  id: string;
  subject: string;
  /** «Коллоквиум», «Контрольная работа 2». */
  kind: string;
  /** Короткое название для шапки. */
  short: string;
  /** Один символ для значка. */
  icon: string;
  /** Первый и последний день проведения (ISO, YYYY-MM-DD). */
  dates: [string, string];
  /** Когда — по-человечески: «26–30 октября», «5 ноября, 10:00–11:00». */
  when: string;
  /** Формат одной строкой: время, что можно, как сдаётся. */
  format: string;
  /** Что входит: «Лонгриды 1–15», «Темы недель 6–8». */
  scope: string;
  /** Есть ли продвинутый уровень (переключатель 🔴 / 🔴+⚫). */
  levels: boolean;
  /**
   * Звёздочка курса у экзамена без уровней — ставится там же, где 🔴/⚫ у экзаменов с уровнями.
   * Например, blue у «синей» математики (МИА), red у КР по линалу.
   */
  star?: StarColor;
  features: Feature[];
  mock: MockSpec;
  /** Пояснение над банком задач. */
  tasksNote: string;
  /** Что лектор просит уметь на контрольной. */
  skills?: Skill[];
  /**
   * Есть ли в билете вопросы «только формулировка». false — формулировка теоремы спрашивается только вместе
   * с доказательством: отдельной грани «формулировка» у теорем нет (текст формулировки остаётся в ответе).
   */
  statementQuestions?: boolean;
  /** Подпись к номеру темы в справочнике: «Лонгрид» (по умолчанию), «Конспект, гл.». */
  sourceLabel?: string;
  /** Страница «Как устроено»: регламент и советы, Markdown. */
  how: string;
  topics: Topic[];
  tasks: Task[];
}

export const KIND_LABEL: Record<Kind, string> = {
  definition: 'Определение',
  statement: 'Формулировка',
  proof: 'Доказательство',
};

export const TASK_TYPE_LABEL: Record<TaskType, string> = {
  quantifiers: 'Кванторы',
  'true-false': 'Верно ли',
  prove: 'Доказать',
  compute: 'Найти',
  construct: 'Построить',
};

/** Строка с LaTeX без экранирования обратных слешей. */
export const md = String.raw;
