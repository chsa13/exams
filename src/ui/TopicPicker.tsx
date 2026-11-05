import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { Topic } from '../content/schema';
import { count } from '../plural';
import { MsCheck } from './MultiSeg';

const POP_W = 440;

/** Подпись выбранных тем: «Все темы», название одной темы или «3 темы». */
export function topicsLabel(topics: readonly Topic[], value: readonly string[]): string {
  const picked = topics.filter((t) => value.includes(t.id));
  if (picked.length === 0 || picked.length === topics.length) return 'Все темы';
  return picked.length === 1 ? picked[0].title : count(picked.length, 'тема', 'темы', 'тем');
}
const EDGE = 16;

/**
 * Выбор нескольких тем. Тем много и названия длинные, поэтому в фильтрах — кнопка с видом списка,
 * а по нажатию — те же пункты-переключатели, что в `MultiSeg`, столбиком. Ничего не выбрано — значит, все темы.
 * Список висит над страницей (в body, `position: fixed`) и привязан к кнопке: боковая панель его не обрезает,
 * у правого края экрана он открывается влево. Если тем много, прокручивается только сам список.
 * Закрывается по Esc и по нажатию мимо; при прокрутке и смене размера окна едет вслед за кнопкой.
 */
export function TopicPicker({
  topics,
  value,
  onChange,
  counts,
}: {
  topics: readonly Topic[];
  value: readonly string[];
  onChange: (next: string[]) => void;
  /** сколько карточек или задач в теме под остальные фильтры */
  counts?: (id: string) => number;
}) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties | null>(null);

  // Место под список: ширина — не уже кнопки, по горизонтали не выходит за экран; снизу, а если там тесно — над кнопкой.
  const place = () => {
    if (!btn.current) return;
    const r = btn.current.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const width = Math.min(Math.max(r.width, POP_W), vw - 2 * EDGE);
    // не помещается вправо от кнопки (кнопка в правой колонке) — выравниваем по её правому краю
    const left = r.left + width <= vw - EDGE ? r.left : Math.max(EDGE, Math.min(r.right, vw - EDGE) - width);
    const below = vh - r.bottom - 4 - EDGE;
    const above = r.top - 4 - EDGE;
    const up = below < 240 && above > below;
    setStyle({ left, width, maxHeight: Math.min(480, up ? above : below), ...(up ? { bottom: vh - r.top + 4 } : { top: r.bottom + 4 }) });
  };
  const placeRef = useRef(place);
  placeRef.current = place;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault(); // Esc закрывает список и больше ничего: карточки на него не отзываются
      setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!btn.current?.contains(t) && !pop.current?.contains(t)) setOpen(false);
    };
    const onMove = () => placeRef.current();
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
    };
  }, [open]);

  // Место считаем до показа, чтобы список не мелькнул не там.
  useLayoutEffect(() => {
    if (open) placeRef.current();
    else setStyle(null);
  }, [open]);

  const picked = topics.filter((t) => value.includes(t.id));
  const label = topicsLabel(topics, value);
  const toggle = (id: string) => {
    const next = topics.filter((t) => (t.id === id ? !value.includes(t.id) : value.includes(t.id))).map((t) => t.id);
    onChange(next.length === topics.length ? [] : next);
  };

  return (
    <div className="picker">
      <button ref={btn} className="picker-btn" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{label}</span>
      </button>
      {open &&
        createPortal(
          <div ref={pop} className="picker-pop" style={style ?? { visibility: 'hidden' }}>
            <div className="seg seg-multi picker-list" role="group" aria-label="Темы">
              <button aria-pressed={picked.length === 0} className={picked.length === 0 ? 'on' : ''} onClick={() => onChange([])}>
                <MsCheck />
                <span className="picker-title">Все темы</span>
              </button>
              {topics.map((t) => {
                const on = value.includes(t.id);
                return (
                  <button key={t.id} aria-pressed={on} className={on ? 'on' : ''} onClick={() => toggle(t.id)}>
                    <MsCheck />
                    <span className="picker-title">{t.title}</span>
                    {counts && <span className="seg-count">{counts(t.id)}</span>}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
