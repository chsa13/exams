import { useEffect, useRef, useState } from 'react';
import type { Topic } from '../content/schema';
import { count } from '../plural';

/**
 * Выбор нескольких тем. Тем много и названия длинные, поэтому в строке фильтров — кнопка с видом списка,
 * а по нажатию — те же пункты-переключатели, что в `MultiSeg`, столбиком. Ничего не выбрано — значит, все темы.
 * Список закрывается по Esc и по нажатию мимо него.
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
  /** сколько карточек в теме под остальные фильтры */
  counts?: (id: string) => number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault(); // Esc закрывает список и больше ничего: карточки на него не отзываются
      setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const picked = topics.filter((t) => value.includes(t.id));
  const label =
    picked.length === 0 || picked.length === topics.length
      ? 'Все темы'
      : picked.length === 1
        ? picked[0].title
        : count(picked.length, 'тема', 'темы', 'тем');
  const toggle = (id: string) => {
    const next = topics.filter((t) => (t.id === id ? !value.includes(t.id) : value.includes(t.id))).map((t) => t.id);
    onChange(next.length === topics.length ? [] : next);
  };

  return (
    <div className="picker" ref={ref}>
      <button className="picker-btn" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{label}</span>
      </button>
      {open && (
        <div className="picker-pop">
          <div className="seg seg-multi picker-list" role="group" aria-label="Темы">
            <button aria-pressed={picked.length === 0} className={picked.length === 0 ? 'on' : ''} onClick={() => onChange([])}>
              <span className="picker-title">Все темы</span>
            </button>
            {topics.map((t) => {
              const on = value.includes(t.id);
              return (
                <button key={t.id} aria-pressed={on} className={on ? 'on' : ''} onClick={() => toggle(t.id)}>
                  <span className="picker-title">{t.title}</span>
                  {counts && <span className="seg-count">{counts(t.id)}</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
