import type { Exam } from '../content/schema';

/** Значок экзамена: математический символ на плитке цвета курса. Экзамен с двумя уровнями — красный. */
export function ExamIcon({ exam, small = false }: { exam: Exam; small?: boolean }) {
  const color = exam.levels ? 'red' : (exam.star ?? 'red');
  return (
    <span className={`exam-icon exam-icon-${color} ${small ? 'exam-icon-sm' : ''}`} aria-hidden="true">
      {exam.icon}
    </span>
  );
}
