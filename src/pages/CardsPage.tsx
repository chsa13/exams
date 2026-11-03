import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { KIND_LABEL, type Kind } from '../content/schema';
import { orderByPriority, type Catalog, type Facet } from '../engine/catalog';
import { loadSession, saveSession, type CardSession } from '../store/cardSession';
import { shuffle } from '../engine/ticket';
import { useCat, usePath } from '../exam';
import { useProgress, useStore, type Status } from '../store/progress';
import { FacetBody, UsesLinks } from '../ui/FacetView';
import { Md } from '../ui/Md';
import { Grade } from '../ui/Grade';
import { LevelMark, STATUS_LABEL, StatusDot } from '../ui/LevelSwitch';
import { count } from '../plural';
import { revealTop } from '../ui/scroll';
import { MultiSeg } from '../ui/MultiSeg';

const ASK: Record<Kind, string> = {
  definition: 'Дай определение',
  statement: 'Сформулируй',
  proof: 'Докажи — вспомни шаги',
};

/** Фильтр по статусу: порядок как у кнопок оценки, «новое» в конце. */
const STATUSES: Status[] = ['weak', 'shaky', 'known', 'new'];
const WEAK: Status[] = ['weak', 'shaky'];

/** Что спросить по карточке: у теоремы с доказательством — формулировку и доказательство сразу. */
function askFor(cat: Catalog, f: Facet): string {
  if (f.kind !== 'proof') return ASK[f.kind];
  const lemmas = cat.lemmaChain(f.unit).length;
  const head = f.unit.statement ? 'Сформулируй и докажи' : 'Докажи';
  return lemmas ? `${head} (вместе с ${lemmas === 1 ? 'леммой' : 'леммами'})` : head;
}

export function CardsPage() {
  const [sp, setSp] = useSearchParams();
  const cat = useCat();
  const path = usePath();
  const examId = cat.exam.id;
  const store = useStore();
  const st = useProgress();
  const topic = sp.get('topic') ?? '';
  const kindParam = sp.get('kind');
  const kinds: Kind[] = kindParam ? (kindParam.split(',') as Kind[]) : ['definition', 'statement', 'proof'];
  // `last=1` — старая ссылка на слабые карточки: «не знаю» и «частично».
  const statusParam = sp.get('status')?.split(',') ?? [];
  const picked = STATUSES.filter((x) => statusParam.includes(x));
  const statuses: Status[] = picked.length ? picked : sp.get('last') === '1' ? WEAK : STATUSES;
  const allStatuses = statuses.length === STATUSES.length;
  const onlyWeak = statuses.length === WEAK.length && WEAK.every((x) => statuses.includes(x));

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(sp);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === '') next.delete(k);
      else next.set(k, v);
    }
    setSp(next, { replace: true });
  };

  // Очередь строится один раз на набор фильтров (оценки не перетасовывают её на ходу)
  // и сохраняется в браузере: после перезагрузки продолжаем с той же карточки.
  // Сохранённые сессии помнят прежний ключ с true/false на месте статусов: для этих двух наборов он не меняется.
  const statusKey = allStatuses ? 'false' : onlyWeak ? 'true' : statuses.join(',');
  const filterKey = `${st.mode}|${topic}|${kinds.join(',')}|${statusKey}`;
  /** Карточки под вид и тему, без фильтра по статусу. */
  const basePool = (s: typeof st): Facet[] => {
    const visible = cat.visibleFacets(s.mode);
    // Если доказательства в наборе, теорема спрашивается одной карточкой «сформулируй и докажи».
    const withProof = new Set(kinds.includes('proof') ? visible.filter((f) => f.kind === 'proof').map((f) => f.unit.id) : []);
    return visible.filter(
      (f) => kinds.includes(f.kind) && (!topic || f.topic.id === topic) && !(f.kind === 'statement' && withProof.has(f.unit.id)),
    );
  };
  /** Статусы карточки; у теоремы «формулировка + доказательство» — обеих частей, подходит любая. */
  const cardStatuses = (s: typeof st, f: Facet): Status[] => {
    const of = (key: string) => s.items[key]?.status ?? 'new';
    return isCombined(cat, f) ? [of(f.key), of(`${f.unit.id}:statement`)] : [of(f.key)];
  };
  const buildQueue = (): string[] => {
    const s = store.get();
    let pool = basePool(s);
    if (!allStatuses) pool = pool.filter((f) => cardStatuses(s, f).some((x) => statuses.includes(x)));
    return orderByPriority(pool, (f) => f.key, s).map((f) => f.key);
  };
  const base = basePool(st);
  const statusCount = (x: Status) => base.filter((f) => cardStatuses(st, f).includes(x)).length;
  const fresh = (): CardSession => ({ fk: filterKey, keys: buildQueue(), pos: 0, step: 0, updated: Date.now() });
  const restoreOrFresh = (): CardSession => loadSession(examId, filterKey) ?? fresh();

  const [session, setSession] = useState<CardSession>(restoreOrFresh);
  // Сменились фильтры — берём сохранённую для них сессию или начинаем новую.
  if (session.fk !== filterKey) setSession(restoreOrFresh());
  useEffect(() => {
    saveSession(examId, session);
  }, [examId, session]);

  const queue = session.keys.map((k) => cat.facetByKey.get(k)).filter((f): f is Facet => !!f);
  const pos = session.pos;
  const step = session.step;
  const setStep = (v: number | ((x: number) => number)) =>
    setSession((s) => ({ ...s, step: typeof v === 'function' ? v(s.step) : v }));
  const restart = () => setSession(fresh());
  // Перемешиваем ещё не пройденные карточки (с текущей включительно); пройденные остаются на месте.
  const shuffleRest = () =>
    setSession((s) => ({ ...s, keys: [...s.keys.slice(0, s.pos), ...shuffle(s.keys.slice(s.pos))], step: 0 }));

  const card: Facet | undefined = queue[pos];
  const next = () => setSession((s) => ({ ...s, pos: s.pos + 1, step: 0 }));

  // Следующая карточка открывается с начала, а не с того места, где закончился длинный ответ.
  const cardRef = useRef<HTMLDivElement>(null);
  const cardKey = card?.key;
  useEffect(() => {
    if (cardKey) revealTop(cardRef.current);
    else window.scrollTo(0, 0);
  }, [cardKey, pos]);

  // Фокус поставлен клавишей Tab, а не остался от клика мышью: только тогда элемент в фокусе отвечает на пробел сам.
  const viaTab = useRef(false);
  useEffect(() => {
    const onPointer = () => {
      viaTab.current = false;
    };
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Tab') viaTab.current = true;
      if (e.key === 'Escape' && !e.defaultPrevented && !(e.target instanceof HTMLSelectElement)) {
        setSession((s) => (s.pos > 0 ? { ...s, pos: s.pos - 1, step: 0 } : s));
        return;
      }
    };
    // Ловим раньше всех и дальше не пускаем: иначе пробел успевают обработать другие (например, расширения браузера).
    const onReveal = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLSelectElement) return;
      const space = e.key === ' ' || e.code === 'Space';
      if (space || e.key === 'Enter') {
        const el = e.target instanceof HTMLElement ? e.target.closest<HTMLElement>('a, button, input') : null;
        // Кнопка и галочка срабатывают сами, ссылка — только по Enter: пробел на ней листал бы страницу.
        if (el && viaTab.current && (!space || el.tagName !== 'A')) return;
        // Фокус остался от клика: иначе пробел повторил бы «Пропустить» или переключил галочку.
        el?.blur();
        e.preventDefault();
        e.stopPropagation();
        setStep((x) => (x === 0 || x === 2 ? x + 1 : x));
      }
    };
    window.addEventListener('keydown', h);
    window.addEventListener('keydown', onReveal, true);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', h);
      window.removeEventListener('keydown', onReveal, true);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  const kindItems = (['definition', 'statement', 'proof'] as Kind[]).filter((k) => cat.facets.some((f) => f.kind === k));

  return (
    <div className="page">
      <h1>Карточки</h1>
      <div className="filters">
        <MultiSeg items={kindItems} value={kinds} onChange={(list) => update({ kind: list.join(',') })} label="Что спрашивать">
          {(k) => KIND_LABEL[k]}
        </MultiSeg>
        <select value={topic} onChange={(e) => update({ topic: e.target.value })}>
          <option value="">Все темы</option>
          {cat.visibleTopics(st.mode).map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      <div className="filters">
        <MultiSeg
          items={STATUSES}
          value={statuses}
          onChange={(list) => update({ last: null, status: list.length === STATUSES.length ? null : list.join(',') })}
          label="Статус"
        >
          {(x) => (
            <>
              <StatusDot status={x} /> {STATUS_LABEL[x]} <span className="seg-count">{statusCount(x)}</span>
            </>
          )}
        </MultiSeg>
      </div>

      {queue.length === 0 ? (
        <div className="empty">
          {onlyWeak ? `Слабых мест не осталось — отлично! Отметь другие статусы или реши «${cat.exam.mock.title}».` : 'Под эти фильтры ничего не подходит.'}
        </div>
      ) : !card ? (
        <div className="empty">
          <h2>Круг пройден: {count(queue.length, 'карточка', 'карточки', 'карточек')}</h2>
          <p>
            <button className="primary" onClick={restart}>
              Начать заново
            </button>{' '}
            <button onClick={() => setSession({ ...fresh(), keys: shuffle(buildQueue()) })}>Пройти в случайном порядке</button>{' '}
            <Link to={path('/mock')}>{cat.exam.mock.title} →</Link>
          </p>
        </div>
      ) : (
        <div className="card" ref={cardRef}>
          <div className="card-meta">
            <span className="card-where">
              <span className="card-pos">
                {pos + 1} / {queue.length}
              </span>
              <span>{card.topic.title}</span>
            </span>
            <span className="card-tools">
              <button className="tool" onClick={shuffleRest} title="Перемешать оставшиеся карточки">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
                  <path d="m18 2 4 4-4 4" />
                  <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
                  <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
                  <path d="m18 14 4 4-4 4" />
                </svg>
                Перемешать
              </button>
              <button className="tool" onClick={() => confirm('Начать заново? Порядок карточек пересоберётся: сначала слабые.') && restart()}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Начать заново
              </button>
            </span>
          </div>
          <div className="card-q">
            <div className="card-kind">
              <LevelMark level={card.level} />{' '}
              {isCombined(cat, card) ? (
                <>
                  Формулировка <StatusDot status={st.items[`${card.unit.id}:statement`]?.status ?? 'new'} /> + доказательство{' '}
                  <StatusDot status={st.items[card.key]?.status ?? 'new'} />
                </>
              ) : (
                <>
                  {KIND_LABEL[card.kind]} <StatusDot status={st.items[card.key]?.status ?? 'new'} />
                </>
              )}
            </div>
            <h2>{card.unit.title}</h2>
            <div className="muted">{askFor(cat, card)}</div>
          </div>
          {isCombined(cat, card) ? (
            <CombinedAnswer card={card} step={step} setStep={setStep} onDone={next} />
          ) : step === 0 ? (
            <button className="reveal" onClick={() => setStep(1)}>
              Показать ответ <kbd>пробел</kbd>
            </button>
          ) : (
            <>
              <FacetBody unit={card.unit} kind={card.kind} />
              <UsesLinks unit={card.unit} />
              <p className="muted small">Сравни со своим ответом и честно оцени:</p>
              <Grade itemKey={card.key} onDone={next} />
            </>
          )}
          <div className="card-foot">
            <Link className="small" to={path(`/topic/${card.topic.id}?u=${card.unit.id}`)}>
              Открыть в справочнике
            </Link>
            <button className="link small" onClick={next}>
              Пропустить →
            </button>
          </div>
        </div>
      )}
      {card && (
        <div className="keys">
          <span className="keys-title">Можно без мыши:</span>
          <span>
            <kbd>пробел</kbd> показать ответ
          </span>
          <span>
            <kbd>1</kbd> не знаю
          </span>
          <span>
            <kbd>2</kbd> частично
          </span>
          <span>
            <kbd>3</kbd> знаю
          </span>
          <span>
            <kbd>Esc</kbd> прошлая карточка
          </span>
        </div>
      )}
      <p className="muted small">Порядок: сначала «не знаю», затем новые, «частично», «знаю».</p>
    </div>
  );
}

/**
 * Теорема, у которой формулировка и доказательство оцениваются по отдельности (формулировка — свой вопрос билета).
 * Если формулировка отдельным вопросом не бывает, карточка теоремы одна, с одной оценкой.
 */
function isCombined(cat: Catalog, f: Facet): boolean {
  return f.kind === 'proof' && cat.facetByKey.has(`${f.unit.id}:statement`);
}

const STATUS_WORD: Record<string, string> = { weak: 'не знаю', shaky: 'частично', known: 'знаю' };

/** Два блока в одной карточке: формулировка и доказательство открываются и оцениваются по отдельности. */
function CombinedAnswer({
  card,
  step,
  setStep,
  onDone,
}: {
  card: Facet;
  step: number;
  setStep: (s: number) => void;
  onDone: () => void;
}) {
  const st = useProgress();
  const stmtKey = `${card.unit.id}:statement`;
  const stmtStatus = st.items[stmtKey]?.status;
  return (
    <>
      <section className="card-part">
        <div className="label">1. Формулировка</div>
        {step === 0 ? (
          <button className="reveal" onClick={() => setStep(1)}>
            Показать формулировку <kbd>пробел</kbd>
          </button>
        ) : (
          <>
            <Md text={card.unit.statement!.text} />
            {step === 1 ? (
              <>
                <p className="muted small">Как ты знаешь формулировку?</p>
                <Grade itemKey={stmtKey} onDone={() => setStep(2)} />
              </>
            ) : (
              <p className="small muted">
                Оценка: <StatusDot status={stmtStatus ?? 'new'} /> {stmtStatus ? STATUS_WORD[stmtStatus] : '—'}{' '}
                <button className="link small" onClick={() => setStep(1)}>
                  изменить
                </button>
              </p>
            )}
          </>
        )}
      </section>
      <section className="card-part">
        <div className="label">2. Доказательство</div>
        {step < 2 ? (
          <div className="muted small">Сначала оцени формулировку, потом вспомни доказательство.</div>
        ) : step === 2 ? (
          <button className="reveal" onClick={() => setStep(3)}>
            Показать доказательство <kbd>пробел</kbd>
          </button>
        ) : (
          <>
            <FacetBody unit={card.unit} kind="proof" withStatement={false} />
            <UsesLinks unit={card.unit} />
            <p className="muted small">Как ты знаешь доказательство?</p>
            <Grade itemKey={card.key} onDone={onDone} />
          </>
        )}
      </section>
    </>
  );
}
