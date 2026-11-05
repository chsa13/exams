import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { KIND_LABEL, TASK_TYPE_LABEL, type TicketLayout } from '../content/schema';
import { taskKey, type Catalog } from '../engine/catalog';
import { gateFailed, generateMock, scoringOf, theoryPassed, totals, type SavedQuestion, type Scoring, type Section, type TicketQuestion } from '../engine/ticket';
import { trackEvent } from '../analytics';
import { useCat, usePath } from '../exam';
import { storageKey, useProgress, useStore, type MockResult, type Mode, type Status } from '../store/progress';
import { FacetBody } from '../ui/FacetView';
import { ScaleMark, Star, StatusDot } from '../ui/LevelSwitch';
import { Md } from '../ui/Md';
import { fmt } from './HomePage';
import { count } from '../plural';

type Stage = 'intro' | 'prep' | 'answer' | 'result';

interface Saved {
  mode: Mode;
  stage: Stage;
  started: number;
  answerStarted: number;
  scores: Record<string, number>;
  qs: SavedQuestion[];
}

const pack = (qs: TicketQuestion[]): SavedQuestion[] => qs.map(({ facet, task, ...rest }) => ({ ...rest, facetKey: facet?.key, taskId: task?.id }));
const unpack = (cat: Catalog, qs: SavedQuestion[]): TicketQuestion[] =>
  qs.map((q) => ({
    ...q,
    facet: q.facetKey ? cat.facetByKey.get(q.facetKey) : undefined,
    task: q.taskId ? cat.tasks.find((t) => t.id === q.taskId) : undefined,
  }));

function restore(cat: Catalog): { s: Saved; qs: TicketQuestion[] } | null {
  try {
    const raw = localStorage.getItem(storageKey(cat.exam.id, 'mock'));
    if (!raw) return null;
    const s = JSON.parse(raw) as Saved;
    const qs = unpack(cat, s.qs);
    if (qs.some((q) => !q.facet && !q.task)) return null;
    return { s, qs };
  } catch {
    return null;
  }
}

function persist(examId: string, s: Saved | null) {
  try {
    const key = storageKey(examId, 'mock');
    if (s) localStorage.setItem(key, JSON.stringify(s));
    else localStorage.removeItem(key);
  } catch {
    /* не критично */
  }
}

function useNow(active: boolean) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);
  return now;
}

/** Оставшееся время «м:сс»; после окончания стоит на 0:00, а не уходит в минус. */
function clock(ms: number) {
  const s = Math.ceil(Math.max(0, ms) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const SECTIONS: Section[] = ['Определения', 'Формулировки', 'Доказательства', 'Задачи'];

export function MockPage() {
  const cat = useCat();
  const { exam } = cat;
  const spec = exam.mock;
  const isTest = spec.kind === 'test';
  // Время на работу и на ответ (у контрольной проверка без таймера).
  const PREP_MIN = spec.kind === 'ticket' ? spec.prepMin : spec.minutes;
  const ANSWER_MIN = spec.kind === 'ticket' ? spec.answerMin : null;
  const rules = scoringOf(cat);
  const path = usePath();
  const store = useStore();
  const st = useProgress();
  const restored = useMemo(() => restore(cat), [cat]);
  const [stage, setStage] = useState<Stage>(restored?.s.stage ?? 'intro');
  const [qs, setQs] = useState<TicketQuestion[]>(restored?.qs ?? []);
  const [mode, setModeLocal] = useState<Mode>(restored?.s.mode ?? st.mode);
  const [started, setStarted] = useState(restored?.s.started ?? 0);
  const [answerStarted, setAnswerStarted] = useState(restored?.s.answerStarted ?? 0);
  const [scores, setScores] = useState<Record<string, number>>(restored?.s.scores ?? {});
  const now = useNow(stage === 'prep' || (stage === 'answer' && ANSWER_MIN !== null));
  // `?attempt=<дата>` — разбор прошлого пробного варианта из истории.
  const [sp] = useSearchParams();
  const attempt = st.mocks.find((m) => String(m.date) === sp.get('attempt') && m.qs?.length);

  // Этапы билета сменяются без смены адреса: каждый новый этап открываем сверху.
  // Кнопка «История попыток» на результате ведёт к вступлению и сразу к таблице попыток.
  const toHistory = useRef(false);
  useEffect(() => {
    const history = toHistory.current && stage === 'intro' ? document.getElementById('mock-history') : null;
    toHistory.current = false;
    if (history) history.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  }, [stage]);

  // Нажатие на вкладку пробного варианта с экрана результата (адрес тот же, меняется только location.key) —
  // назад к вступлению с историей. Идущую попытку вкладка не сбрасывает. При открытии страницы результат остаётся.
  const { key: locationKey } = useLocation();
  const firstKey = useRef(locationKey);
  useEffect(() => {
    if (locationKey !== firstKey.current) setStage((s) => (s === 'result' ? 'intro' : s));
  }, [locationKey]);

  useEffect(() => {
    if (stage === 'intro') {
      persist(exam.id, null);
      return;
    }
    persist(exam.id, {
      mode,
      stage,
      started,
      answerStarted,
      scores,
      qs: pack(qs),
    });
  }, [exam.id, stage, qs, mode, started, answerStarted, scores]);

  const start = () => {
    setModeLocal(st.mode);
    setQs(generateMock(cat, st.mode));
    trackEvent('mock-start', { exam: exam.id });
    setScores({});
    setStarted(Date.now());
    setStage('prep');
  };

  const toAnswer = () => {
    setAnswerStarted(Date.now());
    setStage('answer');
  };

  const finish = () => {
    const t = totals(qs, scores, rules);
    store.addMock({ date: Date.now(), mode, ...t, qs: pack(qs), scores });
    trackEvent('mock-finish', { exam: exam.id, percent: t.redMax ? Math.round((t.red / t.redMax) * 100) : 0 });
    // Переносим результат в прогресс: ≥90% — знаю, ≥40% — частично, иначе не знаю.
    const verdict = (got: number, max: number) => (got >= 0.9 * max ? 'known' : got >= 0.4 * max ? 'shaky' : 'weak');
    for (const q of qs) {
      const got = (i: number) => scores[`${q.n}:${i}`] ?? 0;
      if (q.task) store.mark(taskKey(q.task), verdict(got(0), q.parts[0].max));
      else if (q.facet) {
        if (q.facet.kind === 'proof') {
          // Доказательство бывает двумя пунктами (формулировка + доказательство) или одним.
          const last = q.parts.length - 1;
          if (cat.facetByKey.has(`${q.facet.unit.id}:statement`)) store.mark(`${q.facet.unit.id}:statement`, verdict(got(0), q.parts[0].max));
          store.mark(q.facet.key, verdict(got(last), q.parts[last].max));
        } else store.mark(q.facet.key, verdict(got(0), q.parts[0].max));
      }
    }
    setStage('result');
  };

  if (attempt) return <AttemptPage m={attempt} rules={rules} />;

  if (stage === 'intro' && spec.kind === 'test') {
    const slotPoints = spec.slots.every((s) => s.points !== undefined);
    return (
      <div className="page page-narrow">
        <h1>{spec.title}</h1>
        <p>
          Контрольная собирается случайно из банка задач: по одной задаче на каждую позицию. {exam.format}.
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>№</th>
              <th>Что будет</th>
              {slotPoints && <th>Баллы</th>}
            </tr>
          </thead>
          <tbody>
            {spec.slots.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.label}</td>
                {slotPoints && <td>{fmt(s.points!)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        <ScoringNote rules={rules} />
        <ol>
          <li>
            <b>Работа — {spec.minutes} минут.</b> Решай на бумаге, без материалов и калькулятора, с обоснованиями.
          </li>
          <li>
            <b>Проверка.</b> Открывай решение по каждой задаче и честно ставь себе баллы: за ответ без объяснения «почему» — не больше половины.
          </li>
          <li>Результат сохранится, а задачи получат статус в прогрессе.</li>
        </ol>
        <button className="primary big-btn" onClick={start}>
          Начать
        </button>
        <MockHistory />
      </div>
    );
  }

  if (stage === 'intro') {
    return (
      <div className="page page-narrow">
        <h1>{spec.title}</h1>
        <p>
          {spec.kind === 'ticket' && spec.layout ? 'Билет собирается случайно из вопросов списка.' : 'Билет собирается случайно по структуре демо-версии.'}
          {exam.levels && (
            <>
              {' '}
              Сейчас уровень: <b>{st.mode === 'basic' ? 'основной' : 'продвинутый'}</b>.
            </>
          )}
        </p>
        <table className="tbl">
          <thead>
            <tr>
              <th>Блок</th>
              <th>Вопросов</th>
              <th>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {ticketBlocks(spec.kind === 'ticket' ? spec.layout : undefined, st.mode).map(([block, count, points]) => (
              <tr key={block}>
                <td>{block}</td>
                <td>{count}</td>
                <td>{points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ScoringNote rules={rules} />
        <ol>
          <li>
            <b>Подготовка — {PREP_MIN} минут.</b> Пиши ответы на бумаге, без материалов, как на коллоквиуме.
          </li>
          <li>
            <b>Ответ — {ANSWER_MIN} минут.</b> Открывай эталон по каждому вопросу, сравнивай и честно ставь себе баллы.
          </li>
          <li>Результат сохранится, а вопросы получат статус в прогрессе.</li>
        </ol>
        <button className="primary big-btn" onClick={start}>
          Начать
        </button>
        <MockHistory />
      </div>
    );
  }

  if (stage === 'prep') {
    const left = started + PREP_MIN * 60_000 - now;
    return (
      <div className="page page-side side-right">
        <aside className="side mock-side" aria-label="Время и вопросы">
          <MockClock label={isTest ? 'Контрольная' : 'Подготовка'} left={left} warn />
          <p className="small muted">
            {count(qs.length, isTest ? 'задача' : 'вопрос', isTest ? 'задачи' : 'вопроса', isTest ? 'задач' : 'вопросов')}, {fmt(totals(qs, {}, rules).redMax)} б.
          </p>
          <QuestionMap qs={qs} />
          <button className="primary" onClick={toAnswer}>
            {isTest ? 'Сдать и проверить →' : 'Перейти к ответу →'}
          </button>
          <button onClick={() => confirm('Прервать? Результат не сохранится.') && setStage('intro')}>Прервать</button>
        </aside>
        <div className="side-main">
          <div className={`timer mock-bar ${left <= 0 ? 'timer-over' : left < 5 * 60_000 ? 'timer-warn' : ''}`}>
            {isTest ? 'Контрольная' : 'Подготовка'}: {left <= 0 ? 'время вышло' : clock(left)}
          </div>
          <TicketList qs={qs} />
          <div className="row mock-bar">
            <button className="primary" onClick={toAnswer}>
              {isTest ? 'Сдать и проверить →' : 'Перейти к ответу →'}
            </button>
            <button onClick={() => confirm('Прервать? Результат не сохранится.') && setStage('intro')}>Прервать</button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'answer') {
    const left = ANSWER_MIN === null ? 0 : answerStarted + ANSWER_MIN * 60_000 - now;
    const t = totals(qs, scores, rules);
    return (
      <div className="page page-side side-right">
        <aside className="side mock-side" aria-label="Время и баллы">
          {ANSWER_MIN === null ? <div className="mock-clock mock-clock-check">Проверка</div> : <MockClock label="Ответ" left={left} />}
          <div className="mock-score">
            <span className="mock-score-num">
              {fmt(t.red)} / {fmt(t.redMax)}
            </span>
            <span className="small muted">{exam.levels ? <><Star scale="red" /> основной уровень</> : 'баллов'}</span>
            {mode === 'all' && exam.levels && (
              <>
                <span className="mock-score-num">
                  {fmt(t.black)} / {fmt(t.blackMax)}
                </span>
                <span className="small muted"><Star scale="black" /> продвинутый уровень</span>
              </>
            )}
          </div>
          <p className="small muted">
            Оценено: {qs.filter((q) => q.parts.every((_, i) => scores[`${q.n}:${i}`] !== undefined)).length} из {qs.length}
          </p>
          <QuestionMap qs={qs} scores={scores} />
          <GateStatus qs={qs} scores={scores} rules={rules} />
          <button className="primary" onClick={finish}>
            Завершить и сохранить
          </button>
        </aside>
        <div className="side-main">
        <div className={`timer mock-bar ${left <= 0 && ANSWER_MIN !== null ? 'timer-over' : ''}`}>
          <span>{ANSWER_MIN === null ? 'Проверка' : `Ответ: ${left <= 0 ? 'время вышло' : clock(left)}`}</span>
          <span className="timer-score">
            <span>
              {exam.levels ? <><Star scale="red" />{' '}</> : exam.star && <><Star scale={exam.star} />{' '}</>}
              {fmt(t.red)}/{fmt(t.redMax)}
            </span>
            {mode === 'all' && exam.levels && (
              <span>
                <Star scale="black" /> {fmt(t.black)}/{fmt(t.blackMax)}
              </span>
            )}
          </span>
        </div>
        <p className="muted small">
          {isTest
            ? 'Открывай решение и отмечай, сколько баллов поставил бы себе проверяющий. Ответ без обоснования — не больше половины.'
            : 'Открывай эталон и отмечай, сколько баллов поставил бы себе экзаменатор.'}
        </p>
        <div className="mock-bar">
          <GateStatus qs={qs} scores={scores} rules={rules} />
        </div>
        {SECTIONS.map((sec) => {
          const list = qs.filter((q) => q.section === sec);
          if (!list.length) return null;
          return (
            <section key={sec}>
              <h2>{sec}</h2>
              {list.map((q) => (
                <AnswerQuestion
                  key={q.n}
                  q={q}
                  scores={scores}
                  setScore={(k, v) => setScores((s) => ({ ...s, [k]: v }))}
                />
              ))}
            </section>
          );
        })}
        <button className="primary big-btn" onClick={finish}>
          Завершить и сохранить
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      {/* Как в разборе из истории: ссылка наверху ведёт к началу пробного варианта, где история попыток. */}
      <p className="small">
        <Link to={path('/mock')}>← {spec.title}</Link>
      </p>
      <h1>Результат</h1>
      <ResultSummary qs={qs} scores={scores} rules={rules} mode={mode} />
      <div className="row">
        <button className="primary" onClick={start}>
          {isTest ? 'Решить новую КР' : 'Решить новый билет'}
        </button>
        <button
          onClick={() => {
            toHistory.current = true;
            setStage('intro');
          }}
        >
          История попыток
        </button>
        {isTest ? (
          <Link className="btn" to={path('/tasks')}>
            К банку задач
          </Link>
        ) : (
          <Link className="btn" to={path('/cards?status=weak,shaky&kind=definition,statement,proof')}>
            Повторить слабое
          </Link>
        )}
      </div>
      <MockReview qs={qs} scores={scores} rules={rules} />
    </div>
  );
}

/** Баллы попытки и допуск. */
function ResultSummary({ qs, scores, rules, mode }: { qs: TicketQuestion[]; scores: Record<string, number>; rules: Scoring; mode: Mode }) {
  const { exam } = useCat();
  const t = totals(qs, scores, rules);
  return (
    <>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">
            {fmt(t.red)} / {fmt(t.redMax)}
          </div>
          <div className="stat-label">{exam.levels ? <><Star scale="red" /> основной уровень</> : 'баллов'}</div>
        </div>
        {mode === 'all' && exam.levels && (
          <div className="stat">
            <div className="stat-num">
              {fmt(t.black)} / {fmt(t.blackMax)}
            </div>
            <div className="stat-label"><Star scale="black" /> продвинутый уровень</div>
          </div>
        )}
      </div>
      <GateStatus qs={qs} scores={scores} rules={rules} />
    </>
  );
}

/** Разбор прошлой попытки из истории: те же баллы и вопросы, что были в конце. */
function AttemptPage({ m, rules }: { m: MockResult; rules: Scoring }) {
  const cat = useCat();
  const path = usePath();
  // Вопрос, которого больше нет в контенте, пропускаем: показать по нему нечего.
  const qs = unpack(cat, m.qs ?? []).filter((q) => q.facet || q.task);
  const scores = m.scores ?? {};
  return (
    <div className="page page-narrow">
      <p className="small">
        <Link to={path('/mock')}>← {cat.exam.mock.title}</Link>
      </p>
      <h1>Разбор: {when(m.date)}</h1>
      <ResultSummary qs={qs} scores={scores} rules={rules} mode={m.mode} />
      <MockReview qs={qs} scores={scores} rules={rules} />
    </div>
  );
}

/** Сколько набрано за вопрос: точка — как статус в прогрессе (≥90% знаю, ≥40% частично). */
function scoreStatus(got: number, max: number): Status {
  return got >= 0.9 * max ? 'known' : got >= 0.4 * max ? 'shaky' : 'weak';
}

/** Все вопросы попытки с поставленными баллами и эталоном; по умолчанию — только где потерял баллы. */
function MockReview({ qs, scores, rules }: { qs: TicketQuestion[]; scores: Record<string, number>; rules: Scoring }) {
  const locked = gateFailed(qs, scores, rules);
  const got = (q: TicketQuestion, i: number) => (locked && q.section === 'Доказательства' ? 0 : (scores[`${q.n}:${i}`] ?? 0));
  const isLost = (q: TicketQuestion) => q.parts.some((p, i) => got(q, i) < p.max);
  const lostCount = qs.filter(isLost).length;
  const [onlyLost, setOnlyLost] = useState(lostCount > 0);
  const shown = onlyLost ? qs.filter(isLost) : qs;
  return (
    <section className="review">
      <div className="review-head">
        <h2>Разбор</h2>
        <div className="seg" role="radiogroup" aria-label="Какие вопросы показать">
          <button role="radio" aria-checked={onlyLost} className={onlyLost ? 'on' : ''} onClick={() => setOnlyLost(true)}>
            Где потерял баллы <span className="seg-count">{lostCount}</span>
          </button>
          <button role="radio" aria-checked={!onlyLost} className={!onlyLost ? 'on' : ''} onClick={() => setOnlyLost(false)}>
            Все <span className="seg-count">{qs.length}</span>
          </button>
        </div>
      </div>
      {shown.length === 0 && <p className="muted">Все баллы набраны.</p>}
      {SECTIONS.map((sec) => {
        const list = shown.filter((q) => q.section === sec);
        if (!list.length) return null;
        return (
          <section key={sec}>
            <h3>{sec}</h3>
            {list.map((q) => (
              <ReviewQuestion key={q.n} q={q} got={(i) => got(q, i)} locked={locked && sec === 'Доказательства'} />
            ))}
          </section>
        );
      })}
    </section>
  );
}

function ReviewQuestion({ q, got, locked }: { q: TicketQuestion; got: (i: number) => number; locked: boolean }) {
  const [open, setOpen] = useState(false);
  const cat = useCat();
  const path = usePath();
  const sum = q.parts.reduce((a, _, i) => a + got(i), 0);
  const max = q.parts.reduce((a, p) => a + p.max, 0);
  return (
    <div className="tq">
      <div className="tq-head">
        <ScaleMark scales={q.scales} />
        <span className="tq-n">{q.task && cat.exam.mock.kind === 'test' ? 'Задача' : 'Вопрос'} {q.n}</span>
        {q.facet && <span className="tag">{KIND_LABEL[q.facet.kind]}</span>}
        {q.task && cat.exam.mock.kind === 'test' && <span className="tag">{TASK_TYPE_LABEL[q.task.type]}</span>}
        <span className="tq-score">
          <StatusDot status={scoreStatus(sum, max)} /> {fmt(sum)} из {fmt(max)}
        </span>
      </div>
      <div className="tq-body">{q.task ? <Md text={q.task.prompt} /> : <b>{questionTitle(cat, q)}</b>}</div>
      {q.parts.length > 1 && (
        <p className="small muted">
          {q.parts.map((p, i) => `${p.label}: ${fmt(got(i))} из ${fmt(p.max)}`).join('; ')}
        </p>
      )}
      {locked && <p className="small muted">Не засчитано: теория не сдана.</p>}
      {!open ? (
        <button onClick={() => setOpen(true)}>{q.task ? 'Показать решение' : 'Показать эталон'}</button>
      ) : (
        <>
          <div className="answer">{q.task ? <Md text={q.task.answer} /> : <FacetBody unit={q.facet!.unit} kind={q.facet!.kind} />}</div>
          {q.facet && (
            <Link className="small" to={path(`/topic/${q.facet.topic.id}?u=${q.facet.unit.id}`)}>
              Открыть в справочнике
            </Link>
          )}
        </>
      )}
    </div>
  );
}

/** Допуск к доказательствам и потолок оценки — одной строкой под составом билета. */
function ScoringNote({ rules }: { rules: Scoring }) {
  if (rules.theoryGate === undefined && rules.scoreCap === undefined) return null;
  return (
    <p className="small">
      {rules.theoryGate !== undefined && (
        <>
          Чтобы перейти к доказательствам, нужно сдать не меньше <b>{rules.theoryGate}</b> вопросов по теории — иначе коллоквиум на этом заканчивается.{' '}
        </>
      )}
      {rules.scoreCap !== undefined && <>Максимальная оценка — {fmt(rules.scoreCap)}, лишние баллы — запас.</>}
    </p>
  );
}

/** Сколько вопросов по теории сдано и засчитываются ли доказательства. */
function GateStatus({ qs, scores, rules }: { qs: TicketQuestion[]; scores: Record<string, number>; rules: Scoring }) {
  if (rules.theoryGate === undefined) return null;
  const passed = theoryPassed(qs, scores);
  const total = qs.filter((q) => q.section === 'Определения').length;
  return (
    <p className={`small ${gateFailed(qs, scores, rules) ? 'timer-over' : ''}`}>
      Теория сдана: <b>{passed}</b> из {total} (засчитан — полный балл за вопрос), нужно {rules.theoryGate}.{' '}
      {gateFailed(qs, scores, rules) ? 'Доказательства не засчитываются.' : 'Доказательства засчитываются.'}
    </p>
  );
}

/** Строки таблицы «состав билета»: по layout экзамена или по демо-билету матана. */
function ticketBlocks(layout: TicketLayout | undefined, mode: Mode): [string, ReactNode, ReactNode][] {
  if (layout) {
    const proofs = layout.proofPoints?.length ?? layout.proofs;
    const rows: [string, ReactNode, ReactNode][] = [
      ['Определения', layout.definitions, 'по 0,5'],
      ['Формулировки', layout.statements, 'по 0,5'],
      ['Доказательства', proofs, layout.proofPoints ? [...layout.proofPoints].sort((a, b) => a - b).map(fmt).join(' / ') : '0,5 + 2'],
      [`Задачи: ${layout.taskSlots.map((s) => s.label.toLowerCase()).join('; ')}`, layout.taskSlots.length, 'по 1'],
    ];
    return rows.filter(([, n]) => n !== 0);
  }
  const all = mode === 'all';
  const black = <Star scale="black" />;
  return [
    ['Определения', 3, 'по 0,5'],
    ['Формулировки', all ? <>3 + 1 {black}</> : 3, 'по 0,5'],
    ['Доказательства', all ? <>2 + 1 {black}</> : 2, all ? <>0,5 + 2 ({black}: 0,5 + 3)</> : '0,5 + 2'],
    ['Задачи', all ? <>3 + 1 {black}</> : 3, all ? '1–1,5' : 'по 1'],
  ];
}

function questionTitle(cat: Catalog, q: TicketQuestion): string {
  if (q.task) return '';
  const f = q.facet!;
  const lemmas = f.kind === 'proof' ? cat.lemmaChain(f.unit) : [];
  return lemmas.length ? `${f.unit.title} (вместе с ${lemmas.length === 1 ? 'леммой' : 'леммами'}: ${lemmas.map((l) => l.title).join('; ')})` : f.unit.title;
}

function TicketList({ qs }: { qs: TicketQuestion[] }) {
  const cat = useCat();
  return (
    <>
      {SECTIONS.map((sec) => {
        const list = qs.filter((q) => q.section === sec);
        if (!list.length) return null;
        return (
          <section key={sec}>
            <h2>{sec}</h2>
            {list.map((q) => (
              <div key={q.n} className="tq" id={`q-${q.n}`}>
                <div className="tq-head">
                  <ScaleMark scales={q.scales} />
                  <span className="tq-n">{q.task && cat.exam.mock.kind === 'test' ? 'Задача' : 'Вопрос'} {q.n}</span>
                  <b>{q.parts.map((p) => fmt(p.max)).join(' + ')} б.</b>
                </div>
                <div className="tq-body">{q.task ? <Md text={q.task.prompt} /> : questionTitle(cat, q)}</div>
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}

function steps(max: number): number[] {
  const step = max <= 0.5 ? 0.25 : 0.5;
  const out: number[] = [];
  for (let x = 0; x <= max + 1e-9; x += step) out.push(Math.round(x * 100) / 100);
  return out;
}

function AnswerQuestion({
  q,
  scores,
  setScore,
}: {
  q: TicketQuestion;
  scores: Record<string, number>;
  setScore: (k: string, v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const cat = useCat();
  return (
    <div className="tq" id={`q-${q.n}`}>
      <div className="tq-head">
        <ScaleMark scales={q.scales} />
        <span className="tq-n">{q.task && cat.exam.mock.kind === 'test' ? 'Задача' : 'Вопрос'} {q.n}</span>
        {q.facet && <span className="tag">{KIND_LABEL[q.facet.kind]}</span>}
        {q.task && cat.exam.mock.kind === 'test' && <span className="tag">{TASK_TYPE_LABEL[q.task.type]}</span>}
      </div>
      <div className="tq-body">{q.task ? <Md text={q.task.prompt} /> : <b>{q.facet!.unit.title}</b>}</div>
      {!open ? (
        <button onClick={() => setOpen(true)}>{q.task ? 'Показать решение' : 'Показать эталон'}</button>
      ) : q.task ? (
        <div className="answer">
          <Md text={q.task.answer} />
        </div>
      ) : (
        <div className="answer">
          <FacetBody unit={q.facet!.unit} kind={q.facet!.kind} />
        </div>
      )}
      {q.parts.map((p, i) => {
        const k = `${q.n}:${i}`;
        return (
          <div key={i} className="score-row">
            <span className="small">{p.label}:</span>
            {steps(p.max).map((v) => (
              <button key={v} className={`sc ${scores[k] === v ? 'on' : ''}`} onClick={() => setScore(k, v)}>
                {fmt(v)}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function MockHistory() {
  const { exam } = useCat();
  const st = useProgress();
  const path = usePath();
  if (!st.mocks.length) return null;
  // Столбцы уровня — только если в истории есть попытки на продвинутом: иначе там одни прочерки.
  const levels = !!exam.levels && st.mocks.some((m) => m.mode === 'all');
  // Разбор есть у попыток, сохранённых вместе с вопросами; у старых и пришедших по ссылке — только баллы.
  const anyReview = st.mocks.some((m) => m.qs?.length);
  return (
    <section id="mock-history" className="mock-history">
      <h3>История</h3>
      <table className="tbl">
        <thead>
          <tr>
            <th>Дата</th>
            {levels && <th>Уровень</th>}
            <th>{levels ? <Star scale="red" /> : 'Баллы'}</th>
            {levels && (
              <th>
                <Star scale="black" />
              </th>
            )}
            {anyReview && <th />}
          </tr>
        </thead>
        <tbody>
          {[...st.mocks].reverse().map((m) => (
            <tr key={m.date}>
              <td>{when(m.date)}</td>
              {levels && <td>{m.mode === 'basic' ? 'основной' : 'продвинутый'}</td>}
              <td>
                {fmt(m.red)}/{fmt(m.redMax)}
              </td>
              {levels && <td>{m.mode === 'all' ? `${fmt(m.black)}/${fmt(m.blackMax)}` : '—'}</td>}
              {anyReview && (
                <td className="tbl-end">{m.qs?.length ? <Link to={path(`/mock?attempt=${m.date}`)}>Разбор →</Link> : null}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const when = (d: number) => new Date(d).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

/** Таймер в боковой панели пробного варианта: крупное время; меньше 5 минут — жёлтый (если `warn`), время вышло — красный. */
function MockClock({ label, left, warn = false }: { label: string; left: number; warn?: boolean }) {
  const cls = left <= 0 ? 'timer-over' : warn && left < 5 * 60_000 ? 'timer-warn' : '';
  return (
    <div className={`mock-clock ${cls}`} role="timer">
      <span className="mock-clock-label">{label}</span>
      <span className="mock-clock-time">{left <= 0 ? 'время вышло' : clock(left)}</span>
    </div>
  );
}

/**
 * Номера вопросов в боковой панели: нажатие прокручивает к вопросу. На этапе ответа номер окрашен по баллам
 * (как статусы: полный — зелёный, часть — жёлтый, ноль — красный), неоценённый — пустой.
 */
function QuestionMap({ qs, scores }: { qs: TicketQuestion[]; scores?: Record<string, number> }) {
  const cat = useCat();
  const state = (q: TicketQuestion): string => {
    if (!scores || !q.parts.every((_, i) => scores[`${q.n}:${i}`] !== undefined)) return '';
    const got = q.parts.reduce((a, _, i) => a + (scores[`${q.n}:${i}`] ?? 0), 0);
    const max = q.parts.reduce((a, p) => a + p.max, 0);
    return `qmap-${scoreStatus(got, max)}`;
  };
  return (
    <div className="qmap" role="list">
      {qs.map((q) => (
        <button
          key={q.n}
          role="listitem"
          className={state(q)}
          title={`${q.task && cat.exam.mock.kind === 'test' ? 'Задача' : 'Вопрос'} ${q.n}`}
          onClick={() => document.getElementById(`q-${q.n}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })}
        >
          {q.n}
        </button>
      ))}
    </div>
  );
}
