import type { Exam, Level, Scale, StarColor } from '../content/schema';
import { useCat } from '../exam';
import { useProgress, useStore, type Status } from '../store/progress';

export function LevelSwitch() {
  const store = useStore();
  const { mode } = useProgress();
  const setMode = (m: typeof mode) => store.setMode(m);
  return (
    <div className="seg" role="radiogroup" aria-label="Уровень">
      <button role="radio" aria-checked={mode === 'basic'} className={mode === 'basic' ? 'on' : ''} onClick={() => setMode('basic')}>
        <Star scale="red" /> Основной
      </button>
      <button
        role="radio"
        aria-checked={mode === 'all'}
        className={mode === 'all' ? 'on' : ''}
        onClick={() => setMode('all')}
        title="Основной + продвинутый"
      >
        <RedPlusBlack /> Продвинутый
      </button>
    </div>
  );
}

const STAR_TITLE: Record<StarColor, string> = {
  red: 'Основной уровень',
  black: 'Продвинутый уровень',
  blue: 'Синяя математика',
};

/** Подписи звёздочки сложности у задачи (Task.star). */
const TASK_STAR_TITLE: Record<StarColor, string> = {
  blue: 'Задача попроще',
  red: 'Задача средней сложности',
  black: 'Сложная задача',
};

export function Star({ scale, title }: { scale: StarColor; title?: string }) {
  return (
    <span className={`star star-${scale}`} title={title ?? STAR_TITLE[scale]}>
      ✱
    </span>
  );
}

export function LevelBadge({ level }: { level: Level }) {
  return level === 'basic' ? <Star scale="red" /> : <Star scale="black" />;
}

export function Stars({ scales }: { scales: Scale[] }) {
  return (
    <span className="stars">
      {scales.map((s) => (
        <Star key={s} scale={s} />
      ))}
    </span>
  );
}

/** «🔴+⚫» — основной вместе с продвинутым. */
function RedPlusBlack() {
  return (
    <span className="exam-stars-pair">
      <Star scale="red" />
      <span className="exam-stars-plus">+</span>
      <Star scale="black" />
    </span>
  );
}

/** Звёздочки у названия экзамена: оба уровня «🔴» и «🔴+⚫» либо звёздочка курса. */
export function ExamStars({ exam }: { exam: Exam }) {
  if (exam.levels)
    return (
      <span className="exam-stars">
        <Star scale="red" />
        <RedPlusBlack />
      </span>
    );
  return exam.star ? <Star scale={exam.star} /> : null;
}

/** Значок у вопроса: уровень грани (🔴/⚫), а у экзамена без уровней — звёздочка курса. */
export function LevelMark({ level }: { level: Level }) {
  const { exam } = useCat();
  if (exam.levels) return <LevelBadge level={level} />;
  return exam.star ? <Star scale={exam.star} /> : null;
}

/**
 * Значок у задачи или вопроса билета: шкалы зачёта, а у экзамена без уровней — звёздочка сложности задачи
 * (как в вариантах контрольной), если её нет — звёздочка курса.
 */
export function ScaleMark({ scales, star }: { scales: Scale[]; star?: StarColor }) {
  const { exam } = useCat();
  if (exam.levels) return <Stars scales={scales} />;
  if (star) return <Star scale={star} title={TASK_STAR_TITLE[star]} />;
  return exam.star ? <Star scale={exam.star} /> : null;
}

const STATUS_LABEL: Record<Status, string> = { new: 'новое', weak: 'не знаю', shaky: 'частично', known: 'знаю' };

export function StatusDot({ status }: { status: Status }) {
  return <span className={`dot dot-${status}`} title={STATUS_LABEL[status]} />;
}

export { STATUS_LABEL };
