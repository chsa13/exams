import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
/** Что выбрал человек: «как в системе» или одну из тем вручную. */
export type ThemeChoice = 'system' | Theme;

// Ключ читает и скрипт в index.html: тема ставится до первой отрисовки, без вспышки.
const KEY = 'exams:theme';
const SYSTEM_DARK = '(prefers-color-scheme: dark)';
/** Тему меняют и кнопка в шапке, и настройки: событие держит их в согласии. */
const EVENT = 'exams:theme-change';

function currentChoice(): ThemeChoice {
  const chosen = document.documentElement.dataset.theme;
  return chosen === 'light' || chosen === 'dark' ? chosen : 'system';
}

function resolve(choice: ThemeChoice): Theme {
  if (choice !== 'system') return choice;
  return window.matchMedia(SYSTEM_DARK).matches ? 'dark' : 'light';
}

export function setThemeChoice(choice: ThemeChoice) {
  if (choice === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = choice;
  try {
    if (choice === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {
    // приватный режим: тема действует до закрытия страницы
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Выбор темы и тема, которая видна сейчас. Пока человек не выбрал сам, тема следует за системой. */
export function useTheme(): { choice: ThemeChoice; theme: Theme } {
  const [choice, setChoice] = useState<ThemeChoice>(currentChoice);
  const [, redraw] = useState(0);

  useEffect(() => {
    const media = window.matchMedia(SYSTEM_DARK);
    const onSystem = () => redraw((n) => n + 1);
    const onChoice = () => setChoice(currentChoice());
    media.addEventListener('change', onSystem);
    window.addEventListener(EVENT, onChoice);
    return () => {
      media.removeEventListener('change', onSystem);
      window.removeEventListener(EVENT, onChoice);
    };
  }, []);

  return { choice, theme: resolve(choice) };
}

/** Кнопка в шапке: переключает на противоположную той, что видна сейчас. */
export function ThemeToggle() {
  const { theme } = useTheme();
  const label = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
  return (
    <button className="icon-btn" aria-label={label} title={label} onClick={() => setThemeChoice(theme === 'dark' ? 'light' : 'dark')}>
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
