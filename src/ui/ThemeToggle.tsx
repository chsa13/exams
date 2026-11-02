import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// Ключ читает и скрипт в index.html: тема ставится до первой отрисовки, без вспышки.
const KEY = 'exams:theme';
const SYSTEM_DARK = '(prefers-color-scheme: dark)';

function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return window.matchMedia(SYSTEM_DARK).matches ? 'dark' : 'light';
}

/** Светлая или тёмная тема. Пока человек не выбрал сам, тема следует за системой. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    const media = window.matchMedia(SYSTEM_DARK);
    const onChange = () => setTheme(currentTheme());
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // приватный режим: тема действует до закрытия страницы
    }
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
  return (
    <button className="icon-btn" aria-label={label} title={label} onClick={toggle}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
