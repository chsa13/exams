import { Link } from 'react-router-dom';
import { exams } from '../../content';
import type { Exam } from '../content/schema';
import { catalogOf, readiness, score, taskKey } from '../engine/catalog';
import { useProgressOf } from '../store/progress';
import { ExamIcon } from '../ui/ExamIcon';
import { ExamStars } from '../ui/LevelSwitch';
import { ProgressBar } from '../ui/ProgressBar';
import { count } from '../plural';

const DAY = 86_400_000;

/** Полночь по местному времени для даты YYYY-MM-DD. */
function day(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

type Phase = 'soon' | 'now' | 'past';

export function phaseOf(exam: Exam, now = Date.now()): { phase: Phase; days: number } {
  const today = new Date(now);
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const [start, end] = exam.dates.map(day);
  if (t < start) return { phase: 'soon', days: Math.round((start - t) / DAY) };
  if (t <= end) return { phase: 'now', days: 0 };
  return { phase: 'past', days: Math.round((t - end) / DAY) };
}

/** «через 8 дней», «завтра», «идёт сейчас», «прошло». */
export function Countdown({ exam }: { exam: Exam }) {
  const { phase, days } = phaseOf(exam);
  if (phase === 'now') return <span className="badge badge-now">идёт сейчас</span>;
  if (phase === 'past') return <span className="badge badge-past">прошло</span>;
  const text = days === 1 ? 'завтра' : `через ${count(days, 'день', 'дня', 'дней')}`;
  return <span className={`badge ${days <= 3 ? 'badge-hot' : 'badge-soon'}`}>{text}</span>;
}

export function HubPage() {
  // Сначала текущие и ближайшие, прошедшие — в конце, самые свежие выше.
  const order: Record<Phase, number> = { now: 0, soon: 1, past: 2 };
  const sorted = [...exams].sort((a, b) => {
    const pa = phaseOf(a);
    const pb = phaseOf(b);
    if (pa.phase !== pb.phase) return order[pa.phase] - order[pb.phase];
    return pa.phase === 'past' ? pa.days - pb.days : day(a.dates[0]) - day(b.dates[0]);
  });
  return (
    <div className="page">
      <h1>Коллоквиумы и контрольные ЦУ</h1>
      <p className="lead">
        Выбери, к чему готовишься: внутри конспект теории, карточки, доказательства по шагам, задачи с решениями и пробный вариант на
        время.
      </p>
      <div className="exam-list">
        {sorted.map((e) => (
          <ExamCard key={e.id} exam={e} />
        ))}
      </div>
    </div>
  );
}

function ExamCard({ exam }: { exam: Exam }) {
  const st = useProgressOf(exam.id);
  const cat = catalogOf(exam);
  const theory = readiness(cat.visibleFacets(st.mode).map((f) => f.key), st);
  const tasks = readiness(cat.visibleTasks(st.mode).map(taskKey), st);
  const past = phaseOf(exam).phase === 'past';
  return (
    <Link to={`/${exam.id}`} className={`exam-card ${past ? 'exam-past' : ''}`}>
      <ExamIcon exam={exam} />
      <div className="exam-main">
        <div className="exam-top">
          <span className="exam-title">
            {exam.kind} <ExamStars exam={exam} />
          </span>
          <Countdown exam={exam} />
        </div>
        <div className="exam-subject">{exam.subject}</div>
        <div className="muted small">
          {exam.when} · {exam.format}
        </div>
        <div className="muted small">{exam.scope}</div>
        <div className="exam-bars">
          <div>
            <div className="bar-head label">
              <span>Теория</span>
              <span>{Math.round(score(theory) * 100)}%</span>
            </div>
            <ProgressBar r={theory} legend={false} />
          </div>
          {exam.features.includes('tasks') && (
            <div>
              <div className="bar-head label">
                <span>Задачи</span>
                <span>{Math.round(score(tasks) * 100)}%</span>
              </div>
              <ProgressBar r={tasks} legend={false} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
