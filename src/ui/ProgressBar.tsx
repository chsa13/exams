import type { Readiness } from '../engine/catalog';

/** Шкала готовности. Легенда показывает только то, что есть: нули в ней — лишний шум. */
export function ProgressBar({ r, legend = true }: { r: Readiness; legend?: boolean }) {
  const pct = (n: number) => (r.total ? (n / r.total) * 100 : 0);
  const items: [string, string, number][] = [
    ['dot-known', 'знаю', r.known],
    ['dot-shaky', 'частично', r.shaky],
    ['dot-weak', 'не знаю', r.weak],
    ['dot-new', 'новых', r.fresh],
  ];
  return (
    <div>
      <div className="pbar" role="img" aria-label={`знаю ${r.known} из ${r.total}`}>
        <span className="pb-known" style={{ width: `${pct(r.known)}%` }} />
        <span className="pb-shaky" style={{ width: `${pct(r.shaky)}%` }} />
        <span className="pb-weak" style={{ width: `${pct(r.weak)}%` }} />
      </div>
      {legend && (
        <div className="pbar-legend small">
          {items
            .filter(([, , n]) => n > 0)
            .map(([dot, label, n]) => (
              <span key={dot}>
                <i className={`dot ${dot}`} /> {label} {n}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
