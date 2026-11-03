import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Kind } from '../content/schema';
import { readiness, score, taskKey, type Readiness } from '../engine/catalog';
import { useCat, usePath } from '../exam';
import { useProgress } from '../store/progress';
import { Star, StatusDot } from '../ui/LevelSwitch';
import { ProgressBar } from '../ui/ProgressBar';
import { Ring } from '../ui/Ring';
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
  const lastMock = st.mocks.filter((m) => m.mode === st.mode).at(-1);
  const kinds = KINDS.filter(([k]) => fs.some((f) => f.kind === k));
  const isTest = exam.mock.kind === 'test';
  const hasTasks = exam.features.includes('tasks');
  const weakCount = all.weak + all.shaky;
  const theoryMeter = <Meter key="theory" title="Теория" known="на «знаю»" total={all.total} r={all} />;
  const tasksMeter = <Meter key="tasks" title="Задачи" known="на «знаю»" total={ts.total} r={ts} />;
  // В контрольной из задач главное — задачи, поэтому они идут первыми.
  const meters = !hasTasks ? [theoryMeter] : isTest ? [tasksMeter, theoryMeter] : [theoryMeter, tasksMeter];

  return (
    <div className="page">
      <section className="hero">
        <h1>{exam.kind}</h1>
        <div className="hero-kicker">
          <span>{exam.subject}</span>
          <Countdown exam={exam} />
        </div>
        <p className="muted">
          {exam.when}. {exam.format}. <Link to={p('/how')}>Как устроено и как готовиться →</Link>
        </p>
      </section>

      {/* Прогресс — кольца в одной панели: это сводка, а не кнопки, нажимать тут нечего. */}
      <section className="panel progress" aria-label="Твой прогресс">
        <div className="progress-rings">
          {meters}
          <div className="meter">
            <Ring parts={lastMock ? [['ring-accent', lastMock.red / lastMock.redMax]] : []} label={lastMock ? `${fmt(lastMock.red)} из ${fmt(lastMock.redMax)}` : 'нет результата'}>
              {lastMock ? fmt(lastMock.red) : '—'}
            </Ring>
            <div className="meter-text">
              <div className="meter-title">{exam.mock.title}</div>
              <div className="meter-sub">
                {lastMock ? `из ${fmt(lastMock.redMax)} в последний раз` : 'ещё не решал'}
                {lastMock && exam.levels && (
                  <>
                    {' '}
                    <Star scale="red" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="actions">
        {isTest ? (
          <Action primary title="Решать задачи" to={p('/tasks')}>
            {ts.total - ts.known ? `ещё ${ts.total - ts.known} из ${count(ts.total, 'задачи', 'задач', 'задач')}` : 'все задачи решены, можно повторить'}
          </Action>
        ) : (
          <Action primary title="Учить карточки" to={p('/cards')}>
            {all.total - all.known ? `ещё ${all.total - all.known} из ${count(all.total, 'вопроса', 'вопросов', 'вопросов')}` : 'всё выучено, можно повторить'}
          </Action>
        )}
        <Action title={exam.mock.title} to={p('/mock')}>
          {exam.mock.kind === 'ticket' ? `${exam.mock.prepMin} минут, как на коллоквиуме` : `${exam.mock.minutes} минут, как на контрольной`}
        </Action>
        {isTest ? (
          <Action title="Теория карточками" to={p('/cards')}>
            определения и теоремы
          </Action>
        ) : (
          <Action title="Слабые карточки" to={p('/cards?status=weak,shaky')}>
            {weakCount ? `${count(weakCount, 'вопрос', 'вопроса', 'вопросов')} с «не знаю» и «частично»` : 'пока нечего повторять'}
          </Action>
        )}
      </section>

      <section>
        <h2>Карта готовности</h2>
        <div className="grid-table" style={{ ['--cols' as string]: kinds.length + (exam.features.includes('tasks') ? 1 : 0) }}>
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
                    keys={fs.filter((f) => f.topic.id === t.id && f.kind === k).map((f) => f.key)}
                    to={k === 'proof' ? p('/proofs') : p(`/cards?topic=${t.id}&kind=${k}`)}
                  />
                ))}
                {exam.features.includes('tasks') && <Cell keys={topicTasks.map(taskKey)} to={p(`/tasks?topic=${t.id}`)} />}
              </div>
            );
          })}
        </div>
        {/* На телефоне таблица не помещается: там каждая тема — название, процент и одна шкала. */}
        <div className="ready-list">
          {cat.visibleTopics(st.mode).map((t) => {
            const taskKeys = exam.features.includes('tasks') ? cat.visibleTasks(st.mode).filter((x) => x.topic === t.id).map(taskKey) : [];
            const r = readiness([...fs.filter((f) => f.topic.id === t.id).map((f) => f.key), ...taskKeys], st);
            return (
              <Link key={t.id} to={p(`/topic/${t.id}`)} className="ready-row">
                <span className="ready-head">
                  <span>{t.title}</span>
                  <span className="ready-num">{Math.round(score(r) * 100)}%</span>
                </span>
                <ProgressBar r={r} legend={false} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Meter({ title, known, total, r }: { title: string; known: string; total: number; r: Readiness }) {
  return (
    <div className="meter">
      {/* Длина дуги равна проценту: «частично» идёт за половину, как и в самом проценте. */}
      <Ring parts={[['ring-known', r.total ? r.known / r.total : 0], ['ring-shaky', r.total ? (r.shaky * 0.5) / r.total : 0]]} label={`${title}: ${Math.round(score(r) * 100)}%`}>
        {Math.round(score(r) * 100)}%
      </Ring>
      <div className="meter-text">
        <div className="meter-title">{title}</div>
        <div className="meter-sub">
          {r.known} из {total} {known}
        </div>
        {(r.shaky > 0 || r.weak > 0) && (
          <div className="meter-sub meter-rest">
            {r.shaky > 0 && (
              <span>
                <StatusDot status="shaky" /> частично {r.shaky}
              </span>
            )}
            {r.weak > 0 && (
              <span>
                <StatusDot status="weak" /> не знаю {r.weak}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Action({ title, to, primary = false, children }: { title: string; to: string; primary?: boolean; children: ReactNode }) {
  return (
    <Link className={`btn big ${primary ? 'primary' : ''}`} to={to}>
      <span className="big-text">
        <span className="big-title">{title}</span>
        <span className="big-sub">{children}</span>
      </span>
      <span className="big-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function Cell({ keys, to }: { keys: string[]; to: string }) {
  const st = useProgress();
  if (!keys.length) return <div className="cell cell-empty" />;
  const r = readiness(keys, st);
  return (
    <Link
      to={to}
      className={`cell ${r.known === r.total ? 'cell-full' : score(r) === 0 ? 'cell-zero' : ''}`}
      style={{ ['--p' as string]: score(r) }}
      title={`знаю ${r.known}, частично ${r.shaky}, не знаю ${r.weak}, новых ${r.fresh}`}
    >
      {r.known}/{r.total}
    </Link>
  );
}

export const fmt = (x: number) => (Math.round(x * 100) / 100).toString().replace('.', ',');
