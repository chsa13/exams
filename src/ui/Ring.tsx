import type { ReactNode } from 'react';

/** Кольцо прогресса. parts — закрашенные дуги: класс цвета и доля от 0 до 1, идут подряд по часовой стрелке. */
export function Ring({ parts, label, children }: { parts: [string, number][]; label: string; children: ReactNode }) {
  let start = 0;
  return (
    <div className="ring">
      <svg viewBox="0 0 88 88" role="img" aria-label={label}>
        <circle className="ring-track" cx="44" cy="44" r="38" pathLength={100} />
        {parts
          .filter(([, share]) => share > 0)
          .map(([cls, share]) => {
            const len = share * 100;
            const arc = (
              <circle
                key={cls}
                className={`ring-arc ${cls}`}
                cx="44"
                cy="44"
                r="38"
                pathLength={100}
                strokeDasharray={`${len} ${100 - len}`}
                strokeDashoffset={-start}
              />
            );
            start += len;
            return arc;
          })}
      </svg>
      <span className="ring-value">{children}</span>
    </div>
  );
}
