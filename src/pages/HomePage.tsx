import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import type { Kind } from '../content/schema';
import { readiness, score, taskKey, type Readiness } from '../engine/catalog';
import { useCat, usePath } from '../exam';
import { useProgress, type Status } from '../store/progress';
import { Star, StatusDot } from '../ui/LevelSwitch';
import { ProgressBar } from '../ui/ProgressBar';
import { Md } from '../ui/Md';
import { Ring } from '../ui/Ring';
import { Sparkline } from '../ui/Sparkline';
import { Countdown } from './HubPage';
import { count } from '../plural';

const KINDS: [Kind, string][] = [
  ['definition', 'Опр.'],
  ['statement', 'Форм.'],
  ['proof', 'Док.'],
];

export function HomePage() {
  const cat = useCat();
  const { exam } = cat;
  const p = usePath();
  const st = useProgress();
  const fs = cat.visibleFacets(st.mode);
  const all = readiness(fs.map((f) => f.key), st);
  const ts = readiness(cat.visibleTasks(st.mode).map(taskKey), st);
  // Попытки на текущем уровне; под баллом — как они менялись (последние 12).
  const mocks = st.mocks.filter((m) => m.mode === st.mode && m.redMax > 0);
  const lastMock = mocks.at(-1);
  const trend = mocks.slice(-12);
  const kinds = KINDS.filter(([k]) => fs.some((f) => f.kind === k));
  const isTest = exam.mock.kind === 'test';
  const hasTasks = exam.features.includes('tasks');
  // Прогресс и действие — одна плитка: что уже выучено и куда идти дальше. Главная кнопка одна.
  const theoryTile = (
    <Tile
      key="theory"
      ring={<ReadyRing title="Теория" r={all} />}
      title="Теория"
      sub={`${all.known} из ${count(all.total, 'вопроса', 'вопросов', 'вопросов')} на «знаю»`}
      action={isTest ? 'Теория карточками' : 'Учить карточки'}
      to={p('/cards')}
      primary={!isTest}
    />
  );
  const tasksTile = (
    <Tile
      key="tasks"
      ring={<ReadyRing title="Задачи" r={ts} />}
      title="Задачи"
      sub={`${ts.known} из ${count(ts.total, 'задачи', 'задач', 'задач')} на «знаю»`}
      action="Решать задачи"
      to={p('/tasks')}
      primary={isTest}
    />
  );
  // В контрольной из задач главное — задачи, поэтому они идут первыми.
  const tiles = !hasTasks ? [theoryTile] : isTest ? [tasksTile, theoryTile] : [theoryTile, tasksTile];
  const minutes = exam.mock.kind === 'ticket' ? `${exam.mock.prepMin} минут, как на коллоквиуме` : `${exam.mock.minutes} минут, как на контрольной`;

  return (
    <div className="page home">
      <section className="hero">
        <h1>{exam.kind}</h1>
        <div className="hero-kicker">
          <span>{exam.subject}</span>
          <Countdown exam={exam} />
        </div>
        <p className="muted">
          {exam.when}. {exam.format}. <Link to={p('/how')}>Как устроено и как готовиться{' '}→</Link>
        </p>
      </section>

      <section className="tiles" aria-label="Твой прогресс и что делать дальше">
        {tiles}
        <Tile
          ring={
            <Ring parts={lastMock ? [['ring-accent', lastMock.red / lastMock.redMax]] : []} label={lastMock ? `${fmt(lastMock.red)} из ${fmt(lastMock.redMax)}` : 'нет результата'}>
              {lastMock ? fmt(lastMock.red) : '—'}
            </Ring>
          }
          title={exam.mock.title}
          sub={
            lastMock ? (
              <>
                из {fmt(lastMock.redMax)} в последний раз
                {exam.levels && (
                  <>
                    {' '}
                    <Star scale="red" />
                  </>
                )}
              </>
            ) : (
              minutes
            )
          }
          chart={
            <Sparkline
              values={trend.map((m) => m.red / m.redMax)}
              label={`Баллы за ${count(trend.length, 'последнюю попытку', 'последние попытки', 'последних попыток')}: ${trend.map((m) => fmt(m.red)).join('; ')}`}
            />
          }
          action={lastMock ? 'Решить ещё раз' : 'Начать'}
          to={p('/mock')}
        />
      </section>

      <section className="home-map">
        <h2>Карта готовности</h2>
        <ReadyTips>
          <div
            className="grid-table"
            style={{
              ['--cols' as string]: kinds.length + (exam.features.includes('tasks') ? 1 : 0),
            }}
          >
            <div className="gt-row gt-head">
              <div>Тема</div>
              {kinds.map(([, l]) => (
                <div key={l}>{l}</div>
              ))}
              {exam.features.includes('tasks') && <div>Задачи</div>}
            </div>
            {cat.visibleTopics(st.mode).map((t) => {
              const topicTasks = cat.visibleTasks(st.mode).filter((x) => x.topic === t.id);
              return (
                <div key={t.id} className="gt-row">
                  <Link to={p(`/topic/${t.id}`)} className="gt-topic">
                    {t.title}
                  </Link>
                  {kinds.map(([k]) => (
                    <Cell
                      key={k}
                      id={`${t.id}:${k}`}
                      keys={fs.filter((f) => f.topic.id === t.id && f.kind === k).map((f) => f.key)}
                      to={k === 'proof' ? p('/proofs') : p(`/cards?topic=${t.id}&kind=${k}`)}
                    />
                  ))}
                  {exam.features.includes('tasks') && <Cell id={`${t.id}:tasks`} keys={topicTasks.map(taskKey)} to={p(`/tasks?topic=${t.id}`)} />}
                </div>
              );
            })}
          </div>
        </ReadyTips>
        {/* На телефоне таблица не помещается: там каждая тема — название, процент и одна шкала; нажатие раскрывает, что не выучено. */}
        <div className="ready-list">
          {cat.visibleTopics(st.mode).map((t) => {
            const groups: ReadyGroup[] = kinds
              .map(([k, l]): ReadyGroup => ({ label: l, keys: fs.filter((f) => f.topic.id === t.id && f.kind === k).map((f) => f.key), to: k === 'proof' ? p('/proofs') : p(`/cards?topic=${t.id}&kind=${k}`) }))
              .concat(exam.features.includes('tasks') ? [{ label: 'Задачи', keys: cat.visibleTasks(st.mode).filter((x) => x.topic === t.id).map(taskKey), to: p(`/tasks?topic=${t.id}`) }] : [])
              .filter((g) => g.keys.length);
            return <ReadyRow key={t.id} title={t.title} to={p(`/topic/${t.id}`)} groups={groups} />;
          })}
        </div>
      </section>
    </div>
  );
}

/** Кольцо готовности: длина дуги равна проценту, «частично» идёт за половину, как и в самом проценте. */
function ReadyRing({ title, r }: { title: string; r: Readiness }) {
  return (
    <Ring parts={[['ring-known', r.total ? r.known / r.total : 0], ['ring-shaky', r.total ? (r.shaky * 0.5) / r.total : 0]]} label={`${title}: ${Math.round(score(r) * 100)}%`}>
      {Math.round(score(r) * 100)}%
    </Ring>
  );
}

/** Плитка главной: кольцо, сколько сделано и кнопка, куда идти дальше. Главная кнопка на странице одна. */
function Tile({
  ring,
  title,
  sub,
  chart,
  action,
  to,
  primary = false,
}: {
  ring: ReactNode;
  title: string;
  sub: ReactNode;
  chart?: ReactNode;
  action: string;
  to: string;
  primary?: boolean;
}) {
  return (
    <div className="tile">
      <div className="meter">
        {ring}
        <div className="meter-text">
          <div className="meter-title">{title}</div>
          <div className="meter-sub">{sub}</div>
          {chart}
        </div>
      </div>
      <div className="tile-actions">
        <Link className={`btn tile-btn ${primary ? 'primary' : ''}`} to={to}>
          {action}
          <span className="big-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

interface Tip {
  id: string;
  keys: string[];
  to: string;
  at: DOMRect;
  touch: boolean;
}
interface TipApi {
  show: (t: Tip) => void;
  hover: (t: Tip) => void;
  keep: () => void;
  hideSoon: () => void;
  close: () => void;
  openId: () => string | null;
}
const TipCtx = createContext<TipApi | null>(null);

/**
 * Подсказка на карте одна на всю таблицу. Закрывается с задержкой — за это время мышь успевает перейти
 * с ячейки на подсказку и нажать пункт. По пути к подсказке мышь задевает соседние ячейки (подсказка стоит
 * под ячейкой, а под ней — следующая строка), поэтому при наведении открытую подсказку другая ячейка
 * заменяет не сразу, а через SWITCH_MS: дошла мышь до подсказки — замена отменяется.
 */
const SWITCH_MS = 250;

function ReadyTips({ children }: { children: ReactNode }) {
  const [tip, setTip] = useState<Tip | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const open = useRef<string | null>(null);
  open.current = tip?.id ?? null;
  const api = useMemo<TipApi>(
    () => ({
      show: (t) => {
        clearTimeout(timer.current);
        setTip(t);
      },
      hover: (t) => {
        clearTimeout(timer.current);
        if (!open.current) setTip(t);
        else if (open.current !== t.id) timer.current = setTimeout(() => setTip(t), SWITCH_MS);
      },
      // мышь на подсказке: отменяем и закрытие, и замену подсказкой соседней ячейки
      keep: () => clearTimeout(timer.current),
      hideSoon: () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setTip(null), 200);
      },
      close: () => setTip(null),
      openId: () => open.current,
    }),
    [],
  );
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);
  return (
    <TipCtx.Provider value={api}>
      {children}
      {tip && <CellTip tip={tip} onEnter={api.keep} onLeave={api.hideSoon} onClose={api.close} />}
    </TipCtx.Provider>
  );
}

/**
 * Ячейка карты. Мышью: наведение показывает подсказку, нажатие открывает раздел.
 * Пальцем (планшет с широкой таблицей): первое касание показывает подсказку, второе — открывает.
 */
function Cell({ id, keys, to }: { id: string; keys: string[]; to: string }) {
  const st = useProgress();
  const tips = useContext(TipCtx);
  const pointer = useRef('mouse');
  if (!keys.length) return <div className="cell cell-empty" />;
  const r = readiness(keys, st);
  const tipOf = (el: HTMLElement, touch: boolean): Tip => ({ id, keys, to, touch, at: el.getBoundingClientRect() });
  const show = (el: HTMLElement, touch: boolean) => tips?.show(tipOf(el, touch));
  return (
    <Link
      to={to}
      className={`cell ${r.known === r.total ? 'cell-full' : score(r) === 0 ? 'cell-zero' : ''}`}
      style={{ ['--p' as string]: score(r) }}
      aria-label={`знаю ${r.known} из ${r.total}, частично ${r.shaky}, не знаю ${r.weak}, новых ${r.fresh}`}
      onPointerDown={(e) => {
        pointer.current = e.pointerType;
      }}
      onMouseEnter={(e) => pointer.current !== 'touch' && tips?.hover(tipOf(e.currentTarget, false))}
      onMouseLeave={() => pointer.current !== 'touch' && tips?.hideSoon()}
      onFocus={(e) => pointer.current !== 'touch' && show(e.currentTarget, false)}
      onBlur={() => pointer.current !== 'touch' && tips?.hideSoon()}
      onClick={(e) => {
        if (pointer.current !== 'touch' || tips?.openId() === id) return;
        e.preventDefault();
        show(e.currentTarget, true);
      }}
    >
      {r.known}/{r.total}
    </Link>
  );
}

/** Порядок в подсказке — как в очереди карточек: сначала «не знаю», потом «частично» и новые. */
const TIP_ORDER: Status[] = ['weak', 'shaky', 'new'];
const TIP_MAX = 10;
const TIP_W = 360;
const GAP = 8;

/** Куда ведёт пункт: определение и формулировка — в справочник, доказательство — к его разбору, задача — в банк задач. */
function useTipItem() {
  const cat = useCat();
  const p = usePath();
  return (k: string, fallback: string): { title: ReactNode; href: string } => {
    if (k.startsWith('task:')) {
      const task = cat.tasks.find((t) => taskKey(t) === k);
      if (task) return { title: <Md text={task.prompt.split('\n')[0]} inline />, href: p(`/tasks?topic=${task.topic}&task=${task.id}`) };
    }
    const f = cat.facetByKey.get(k);
    if (!f) return { title: k, href: fallback };
    return { title: f.unit.title, href: f.kind === 'proof' ? p(`/proofs/${f.unit.id}`) : p(`/topic/${f.topic.id}?u=${f.unit.id}`) };
  };
}

/** Что из набора ещё не на «знаю»: пункты-ссылки, не больше TIP_MAX, дальше — «и ещё N →». */
function NotKnownList({ keys, to, more = 'и ещё' }: { keys: string[]; to: string; more?: string }) {
  const st = useProgress();
  const item = useTipItem();
  const status = (k: string): Status => st.items[k]?.status ?? 'new';
  const left = keys.filter((k) => status(k) !== 'known').sort((a, b) => TIP_ORDER.indexOf(status(a)) - TIP_ORDER.indexOf(status(b)));
  if (!left.length) return null;
  return (
    <>
      <ul className="nk-list">
        {left.slice(0, TIP_MAX).map((k) => {
          const { title, href } = item(k, to);
          return (
            <li key={k}>
              <Link to={href}>
                <StatusDot status={status(k)} />
                <span className="nk-title">{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {left.length > TIP_MAX && (
        <Link className="nk-more" to={to}>
          {more} {left.length - TIP_MAX} →
        </Link>
      )}
    </>
  );
}

/**
 * Подсказка к ячейке карты. Висит над страницей (`position: fixed`, в body), иначе её обрезала бы таблица
 * со скруглёнными углами. Встаёт под ячейкой; над ней — только если снизу не помещается, а сверху помещается;
 * если не помещается нигде — снизу, с прокруткой внутри. При прокрутке страницы и нажатии мимо закрывается.
 */
function CellTip({ tip, onEnter, onLeave, onClose }: { tip: Tip; onEnter: () => void; onLeave: () => void; onClose: () => void }) {
  const st = useProgress();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top?: number; bottom?: number; maxHeight?: number } | null>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const onScroll = () => close.current();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element;
      if (!ref.current?.contains(t) && !t.closest?.('.cell')) close.current();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);
  const { at } = tip;
  // Высоту меряем до показа: подсказка сначала рисуется невидимой.
  useLayoutEffect(() => {
    const h = ref.current?.offsetHeight ?? 0;
    const vh = window.innerHeight;
    const below = vh - at.bottom - GAP * 2;
    const above = at.top - GAP * 2;
    if (h <= below) setPos({ top: at.bottom + GAP });
    else if (h <= above) setPos({ bottom: vh - at.top + GAP });
    else setPos({ top: at.bottom + GAP, maxHeight: Math.max(below, 160) });
  }, [at, tip.keys]);
  const left = tip.keys.filter((k) => (st.items[k]?.status ?? 'new') !== 'known').length;
  const x = Math.min(Math.max(GAP, at.left + at.width / 2 - TIP_W / 2), document.documentElement.clientWidth - TIP_W - GAP * 2);
  return createPortal(
    <div
      ref={ref}
      className="cell-tip"
      style={{ left: x, width: TIP_W, ...(pos ?? { top: at.bottom + GAP }), visibility: pos ? 'visible' : 'hidden' }}
      role="tooltip"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="cell-tip-head">{left ? `Не выучено: ${left} из ${tip.keys.length}` : 'Всё на «знаю»'}</div>
      <NotKnownList keys={tip.keys} to={tip.to} />
      {tip.touch && (
        <Link className="nk-more" to={tip.to}>
          Открыть раздел →
        </Link>
      )}
    </div>,
    document.body,
  );
}

interface ReadyGroup {
  label: string;
  keys: string[];
  to: string;
}

/** Строка телефонной карты: нажатие раскрывает, что не выучено, по разделам; ссылка на тему — внутри. */
function ReadyRow({ title, to, groups }: { title: string; to: string; groups: ReadyGroup[] }) {
  const st = useProgress();
  const [open, setOpen] = useState(false);
  const r = readiness(
    groups.flatMap((g) => g.keys),
    st,
  );
  return (
    <div className={`ready-row ${open ? 'ready-open' : ''}`}>
      <button className="ready-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="ready-head">
          <span>{title}</span>
          <span className="ready-num">{Math.round(score(r) * 100)}%</span>
        </span>
        <ProgressBar r={r} legend={false} />
      </button>
      {open && (
        <div className="ready-more">
          {groups.map((g) => {
            const gr = readiness(g.keys, st);
            return (
              <section key={g.label}>
                <div className="ready-group">
                  <span>{g.label}</span>
                  <span className="ready-num">
                    {gr.known}/{gr.total}
                  </span>
                </div>
                <NotKnownList keys={g.keys} to={g.to} />
              </section>
            );
          })}
          <Link className="nk-more" to={to}>
            Открыть тему в справочнике →
          </Link>
        </div>
      )}
    </div>
  );
}

export const fmt = (x: number) => (Math.round(x * 100) / 100).toString().replace('.', ',');
