import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Кнопка «⋯» с выпадающим списком: редкие инструменты и справка, чтобы они не стояли на виду рядом с главным.
 * Закрывается по Esc, по нажатию мимо и после выбора пункта.
 */
export function Menu({ label, children }: { label: string; children: (close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault(); // Esc закрывает меню и больше ничего: карточки на него не отзываются
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
  return (
    <div className="menu" ref={ref}>
      <button className="icon-btn menu-btn" aria-label={label} title={label} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(!open)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <circle cx="5" cy="12" r="1.75" />
          <circle cx="12" cy="12" r="1.75" />
          <circle cx="19" cy="12" r="1.75" />
        </svg>
      </button>
      {open && <div className="menu-pop">{children(() => setOpen(false))}</div>}
    </div>
  );
}

/**
 * Фильтры в боковой колонке. На компьютере видны всегда; на узком экране свёрнуты в одну строку
 * «Фильтры — все темы, 66 карточек», нажатие раскрывает их над содержимым.
 */
export function SideFilters({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <aside className={`side ${open ? 'side-open' : ''}`}>
      <button className="side-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="side-toggle-title">Фильтры</span>
        <span className="side-toggle-sum">{summary}</span>
      </button>
      <div className="side-body">{children}</div>
    </aside>
  );
}
