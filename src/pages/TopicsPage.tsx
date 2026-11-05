import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { levelVisible, readiness, score, unitVisible } from '../engine/catalog';
import { useCat, usePath } from '../exam';
import { useProgress, type State, type Status } from '../store/progress';
import { StatusDot } from '../ui/LevelSwitch';
import type { Catalog } from '../engine/catalog';
import type { Topic, Unit } from '../content/schema';
import { UnitCard } from '../ui/FacetView';
import { ProgressBar } from '../ui/ProgressBar';
import { count } from '../plural';

export function TopicsPage() {
  const cat = useCat();
  const p = usePath();
  const st = useProgress();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (query.length < 2) return [];
    return cat.topics.flatMap((t) =>
      t.units
        .filter((u) => unitVisible(u, st.mode) && u.title.toLowerCase().includes(query))
        .map((u) => ({ t, u })),
    );
  }, [query, st.mode, cat]);

  return (
    <div className="page">
      <h1>Справочник</h1>
      <input className="search" placeholder="Поиск по названию вопроса…" value={q} onChange={(e) => setQ(e.target.value)} />
      {query.length >= 2 && (
        <ul className="hits">
          {hits.length === 0 && <li className="muted">Ничего не найдено</li>}
          {hits.map(({ t, u }) => (
            <li key={u.id}>
              <Link to={p(`/topic/${t.id}?u=${u.id}`)}>{u.title}</Link> <span className="muted small">— {t.title}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="topic-list">
        {cat.visibleTopics(st.mode).map((t) => {
          const keys = cat.facets.filter((f) => f.topic.id === t.id && (st.mode === 'all' || f.level === 'basic')).map((f) => f.key);
          return (
            <Link key={t.id} to={p(`/topic/${t.id}`)} className="topic-card">
              <div className="topic-title">{t.title}</div>
              <div className="topic-meta">
                <span>{cat.exam.sourceLabel ?? 'Лонгрид'} {t.longread}</span>
                <span>
                  {count(keys.length, 'вопрос', 'вопроса', 'вопросов')}, {Math.round(score(readiness(keys, st)) * 100)}%
                </span>
              </div>
              {/* Легенда у каждой из карточек повторялась бы: шкалы и процента темы хватает. */}
              <ProgressBar r={readiness(keys, st)} legend={false} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function TopicPage() {
  const { id } = useParams();
  const [sp] = useSearchParams();
  const st = useProgress();
  const cat = useCat();
  const p = usePath();
  const topics = cat.topics;
  const topic = cat.topicById.get(id ?? '');
  const focus = sp.get('u');

  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById(`u-${focus}`);
    if (el) {
      el.scrollIntoView({ block: 'start' });
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 1600);
    }
  }, [focus, id]);

  if (!topic) return <div className="page">Тема не найдена. <Link to={p('/topics')}>К списку тем</Link></div>;
  const idx = topics.indexOf(topic);
  const units = visibleUnits(topic, st.mode);
  const hidden = topic.units.length - units.length;

  const keys = topicKeys(cat, topic, st);
  return (
    <div className="page ref">
      {/* На компьютере слева — все темы справочника с готовностью, текущая выделена; на узком экране список прячется. */}
      <nav className="ref-toc" aria-label="Темы справочника">
        <Link className="ref-toc-head" to={p('/topics')}>
          Все темы
        </Link>
        {cat.visibleTopics(st.mode).map((t) => (
          <Link key={t.id} to={p(`/topic/${t.id}`)} className={t.id === topic.id ? 'on' : ''} aria-current={t.id === topic.id ? 'page' : undefined}>
            <span>{t.title}</span>
            <span className="ref-toc-num">{Math.round(score(readiness(topicKeys(cat, t, st), st)) * 100)}%</span>
          </Link>
        ))}
      </nav>
      <div className="ref-main">
        <div className="crumbs">
          <Link to={p('/topics')}>Справочник</Link> / {topic.title}
        </div>
        <h1>{topic.title}</h1>
        <div className="ref-meta">
          <span className="muted">
            {cat.exam.sourceLabel ?? 'Лонгрид'} {topic.longread}
          </span>
          <span className="muted">{count(keys.length, 'вопрос', 'вопроса', 'вопросов')}</span>
          <Link to={p(`/cards?topic=${topic.id}`)}>Учить карточками →</Link>
        </div>
        <div className="ref-progress">
          <ProgressBar r={readiness(keys, st)} />
        </div>
        {units.map((u) => (
          <UnitCard key={u.id} unit={u} mode={st.mode} />
        ))}
        {hidden > 0 && <p className="muted small">Скрыто вопросов только продвинутого уровня: {hidden}.</p>}
        <div className="pager">
          {idx > 0 && <Link to={p(`/topic/${topics[idx - 1].id}`)}>← {topics[idx - 1].title}</Link>}
          <span />
          {idx < topics.length - 1 && <Link to={p(`/topic/${topics[idx + 1].id}`)}>{topics[idx + 1].title} →</Link>}
        </div>
      </div>
      <UnitsOutline units={units} />
    </div>
  );
}

/** Отметки темы: грани, которые видны на текущем уровне. */
function topicKeys(cat: Catalog, t: Topic, st: State): string[] {
  return cat.visibleFacets(st.mode).filter((f) => f.topic.id === t.id).map((f) => f.key);
}

/** Вопросы темы, видные на уровне. Один и тот же массив на тему и уровень: от него зависит эффект прокрутки в «В этой теме». */
const unitsCache = new WeakMap<Topic, Map<string, Unit[]>>();
function visibleUnits(t: Topic, mode: State['mode']): Unit[] {
  let byMode = unitsCache.get(t);
  if (!byMode) unitsCache.set(t, (byMode = new Map()));
  let list = byMode.get(mode);
  if (!list) byMode.set(mode, (list = t.units.filter((u) => unitVisible(u, mode))));
  return list;
}

/** Статус вопроса целиком: по самой слабой из частей, видных на текущем уровне. */
function unitStatus(cat: Catalog, u: Unit, st: State): Status {
  const ss = (['definition', 'statement', 'proof'] as const)
    .map((k) => cat.facetByKey.get(`${u.id}:${k}`))
    .filter((f) => f && levelVisible(f.level, st.mode))
    .map((f) => st.items[f!.key]?.status ?? 'new');
  for (const x of ['weak', 'shaky', 'new'] as Status[]) if (ss.includes(x)) return x;
  return 'known';
}

/**
 * «В этой теме» справа: вопросы темы со статусом. Нажатие прокручивает к вопросу,
 * при прокрутке подсвечивается тот, что сейчас наверху экрана.
 */
function UnitsOutline({ units }: { units: Unit[] }) {
  const cat = useCat();
  const st = useProgress();
  const [active, setActive] = useState(units[0]?.id);
  useEffect(() => {
    const onScroll = () => {
      const line = 160;
      let cur = units[0]?.id;
      for (const u of units) {
        const el = document.getElementById(`u-${u.id}`);
        if (el && el.getBoundingClientRect().top <= line) cur = u.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [units]);
  return (
    <aside className="ref-units" aria-label="В этой теме">
      <div className="ref-units-head">В этой теме</div>
      {units.map((u) => (
        <button
          key={u.id}
          className={u.id === active ? 'on' : ''}
          onClick={() => document.getElementById(`u-${u.id}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })}
        >
          <StatusDot status={unitStatus(cat, u, st)} />
          <span>{u.title}</span>
        </button>
      ))}
    </aside>
  );
}
