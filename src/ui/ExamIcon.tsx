import type { Exam } from '../content/schema';
import { GLYPHS } from './glyphs';

type TileColor = 'red' | 'black' | 'blue';

/** Плитка с нарисованным символом. Символа нет в GLYPHS — пишем его шрифтом. */
export function GlyphTile({ symbol, color, small = false }: { symbol: string; color: TileColor; small?: boolean }) {
  const path = GLYPHS[symbol];
  return (
    <span className={`exam-icon exam-icon-${color} ${small ? 'exam-icon-sm' : ''}`} aria-hidden="true">
      {path ? (
        <svg viewBox="0 0 48 48" focusable="false">
          <path className="exam-icon-glyph" d={path} />
        </svg>
      ) : (
        symbol
      )}
    </span>
  );
}

/** Значок экзамена: символ на плитке цвета курса. Экзамен с двумя уровнями — красный. */
export function ExamIcon({ exam, small = false }: { exam: Exam; small?: boolean }) {
  return <GlyphTile symbol={exam.icon} color={exam.levels ? 'red' : (exam.star ?? 'red')} small={small} />;
}
