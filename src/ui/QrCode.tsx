import { useEffect, useState } from 'react';

/** QR-код строки. Библиотека нужна редко, поэтому грузится только при показе кода. */
export function QrCode({ text }: { text: string }) {
  const [code, setCode] = useState<{ size: number; path: string } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    import('qrcode-generator')
      .then(({ default: qrcode }) => {
        const qr = qrcode(0, 'L');
        qr.addData(text, 'Byte');
        qr.make();
        const size = qr.getModuleCount();
        let path = '';
        for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (qr.isDark(y, x)) path += `M${x} ${y}h1v1h-1z`;
        if (alive) setCode({ size, path });
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [text]);

  if (failed) return <p className="small">Не удалось построить QR-код. Скопируй ссылку.</p>;
  if (!code) return null;
  // Чёрный на белом в обеих темах: светлый код на тёмном фоне камеры читают плохо. Поле в 4 клетки требует стандарт.
  // Клетка — целое число пикселей, не меньше четырёх: при дробном размере клетки выходят разной ширины, и код не читается.
  const cells = code.size + 8;
  const width = cells * Math.max(4, Math.floor(420 / cells));
  return (
    <svg className="qr" style={{ width }} viewBox={`-4 -4 ${cells} ${cells}`} role="img" aria-label="QR-код со ссылкой на прогресс" shapeRendering="crispEdges">
      <rect x="-4" y="-4" width={cells} height={cells} fill="#fff" />
      <path d={code.path} fill="#000" />
    </svg>
  );
}
