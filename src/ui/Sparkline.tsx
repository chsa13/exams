/**
 * Микрографик: значения от 0 до 1 слева направо, последняя точка выделена.
 * Шкала всегда от 0 до 1, а не от минимума до максимума: иначе разница в полбалла выглядела бы как обвал.
 */
export function Sparkline({ values, label }: { values: number[]; label: string }) {
  const W = 112;
  const H = 28;
  const PAD = 3;
  if (values.length < 2) return null;
  const x = (i: number) => PAD + (i * (W - 2 * PAD)) / (values.length - 1);
  const y = (v: number) => PAD + (1 - Math.max(0, Math.min(1, v))) * (H - 2 * PAD);
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = values.length - 1;
  return (
    <svg className="spark" width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      <line className="spark-base" x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} />
      <polyline className="spark-line" points={pts} />
      <circle className="spark-dot" cx={x(last)} cy={y(values[last])} r={3} />
    </svg>
  );
}
