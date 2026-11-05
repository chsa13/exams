import type { ReactNode } from 'react';

/**
 * Переключатель, в котором можно выбрать несколько пунктов: тот же `.seg`, пункты — кнопки с `aria-pressed`.
 * В каждом пункте нарисован квадратик-отметка (`MsCheck`): видно, что выбрано и что пункт можно снять.
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
          <MsCheck />
          {children(x)}
        </button>
      ))}
    </div>
  );
}

/** Квадратик-отметка внутри пункта: залит и с галочкой, когда пункт выбран (по `aria-pressed` кнопки). Не системная галочка. */
export function MsCheck() {
  return <span className="ms-check" aria-hidden="true" />;
}
