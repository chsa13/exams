import type { ReactNode } from 'react';

/**
 * Переключатель, в котором можно выбрать несколько пунктов: тот же `.seg`, пункты — кнопки с `aria-pressed`.
 * Последний выбранный пункт не снимается — пустой набор ничего бы не показал.
 */
export function MultiSeg<T extends string>({
  items,
  value,
  onChange,
  label,
  children,
}: {
  items: readonly T[];
  value: readonly T[];
  onChange: (next: T[]) => void;
  label: string;
  children: (item: T) => ReactNode;
}) {
  const toggle = (x: T) => {
    const next = items.filter((y) => (y === x ? !value.includes(y) : value.includes(y)));
    if (next.length) onChange(next);
  };
  return (
    <div className="seg seg-multi" role="group" aria-label={label}>
      {items.map((x) => (
        <button key={x} aria-pressed={value.includes(x)} className={value.includes(x) ? 'on' : ''} onClick={() => toggle(x)}>
          {children(x)}
        </button>
      ))}
    </div>
  );
}
