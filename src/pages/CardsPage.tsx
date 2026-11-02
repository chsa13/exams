import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { KIND_LABEL, type Kind } from '../content/schema';
import { orderByPriority, type Catalog, type Facet } from '../engine/catalog';
import { loadSession, saveSession, type CardSession } from '../store/cardSession';
import { shuffle } from '../engine/ticket';
import { useCat, usePath } from '../exam';
import { useProgress, useStore } from '../store/progress';
import { FacetBody, UsesLinks } from '../ui/FacetView';
import { Md } from '../ui/Md';
import { Grade } from '../ui/Grade';
import { LevelMark, StatusDot } from '../ui/LevelSwitch';
import { count } from '../plural';
import { revealTop } from '../ui/scroll';

const ASK: Record<Kind, string> = {
  definition: 'Дай определение',
  statement: 'Сформулируй',
  proof: 'Докажи — вспомни шаги',
};

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
  const onlyWeak = sp.get('last') === '1';

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
  const filterKey = `${st.mode}|${topic}|${kinds.join(',')}|${onlyWeak}`;
  const buildQueue = (): string[] => {
    const s = store.get();
    const visible = cat.visibleFacets(s.mode);
    // Если доказательства в наборе, теорема спрашивается одной карточкой «сформулируй и докажи».
    const withProof = new Set(kinds.includes('proof') ? visible.filter((f) => f.kind === 'proof').map((f) => f.unit.id) : []);
    let pool = visible.filter(
      (f) => kinds.includes(f.kind) && (!topic || f.topic.id === topic) && !(f.kind === 'statement' && withProof.has(f.unit.id)),
    );
    const weak = (key: string) => ['weak', 'shaky'].includes(s.items[key]?.status ?? 'new');
    if (onlyWeak) pool = pool.filter((f) => weak(f.key) || (isCombined(cat, f) && weak(`${f.unit.id}:statement`)));
    return orderByPriority(pool, (f) => f.key, s).map((f) => f.key);
  };
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

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement) return;
      if (e.key === ' ' || e.key === 'Enter') {
        // Кнопка или ссылка в фокусе срабатывает сама, иначе с клавиатуры по ней не перейти.
        if (e.target instanceof Element && e.target.closest('a, button')) return;
        e.preventDefault();
        setStep((x) => (x === 0 || x === 2 ? x + 1 : x));
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const toggleKind = (k: Kind) => {
    const set = new Set(kinds);
    if (set.has(k)) set.delete(k);
    else set.add(k);
    if (set.size === 0) return;
    update({ kind: [...set].join(',') });
  };

  return (
    <div className="page">
      <h1>Карточки</h1>
      <div className="filters">
        {(['definition', 'statement', 'proof'] as Kind[]).filter((k) => cat.facets.some((f) => f.kind === k)).map((k) => (
          <label key={k} className="chk">
            <input type="checkbox" checked={kinds.includes(k)} onChange={() => toggleKind(k)} /> {KIND_LABEL[k]}
          </label>
        ))}
        <select value={topic} onChange={(e) => update({ topic: e.target.value })}>
          <option value="">Все темы</option>
          {cat.visibleTopics(st.mode).map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <label className="chk">
          <input type="checkbox" checked={onlyWeak} onChange={(e) => update({ last: e.target.checked ? '1' : null })} /> Только «не знаю» и
          «частично»
        </label>
      </div>

      {queue.length === 0 ? (
        <div className="empty">
          {onlyWeak ? `Слабых мест не осталось — отлично! Сними фильтр или реши «${cat.exam.mock.title}».` : 'Под эти фильтры ничего не подходит.'}
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
            <span>
              {pos + 1} / {queue.length}{' '}
              <button className="link small" onClick={shuffleRest} title="Перемешать оставшиеся карточки">
                перемешать
              </button>{' '}
              ·{' '}
              <button className="link small" onClick={() => confirm('Начать заново? Порядок карточек пересоберётся: сначала слабые.') && restart()}>
                начать заново
              </button>
            </span>
            <span className="muted">{card.topic.title}</span>
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
