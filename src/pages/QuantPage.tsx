import { useEffect, useRef, useState } from 'react';
import { makeQuestion, POINT_LABEL, randomProblem, VALUE_LABEL, type PointType, type ValueType } from '../engine/quant';
import { Md } from '../ui/Md';
import { revealTop } from '../ui/scroll';

const POINTS = Object.keys(POINT_LABEL) as PointType[];
const VALUES = Object.keys(VALUE_LABEL) as ValueType[];

export function QuantPage() {
  const [points, setPoints] = useState<PointType[]>(POINTS);
  const [values, setValues] = useState<ValueType[]>(VALUES);
  const [neg, setNeg] = useState(true);
  const [choice, setChoice] = useState(true);
  const [q, setQ] = useState(() => makeQuestion(randomProblem(POINTS, VALUES, true)));
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState({ ok: 0, all: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    revealTop(cardRef.current);
  }, [q]);

  const next = () => {
    setQ(makeQuestion(randomProblem(points, values, neg)));
    setPicked(null);
    setOpen(false);
  };

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setStats((s) => ({ ok: s.ok + (i === q.correct ? 1 : 0), all: s.all + 1 }));
  };

  const toggle = <T,>(xs: T[], x: T, set: (v: T[]) => void) => {
    const n = xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x];
    if (n.length) set(n);
  };

  return (
    <div className="page">
      <h1>Тренажёр кванторов</h1>
      <Md
        className="muted"
        text={
          'Задача №11 демо-билета — «Сформулируй в кванторах и неравенствах». Здесь все комбинации: тип точки × тип предела × отрицание. ' +
          'Обозначения как в лонгриде 14: $\\varepsilon$ для значения, $\\delta$ для аргумента.'
        }
      />
      <details className="panel">
        <summary>Настройки</summary>
        <div className="filters">
          <b className="small">Куда стремится аргумент:</b>
          {POINTS.map((p) => (
            <label key={p} className="chk">
              <input type="checkbox" checked={points.includes(p)} onChange={() => toggle(points, p, setPoints)} /> {POINT_LABEL[p]}
            </label>
          ))}
        </div>
        <div className="filters">
          <b className="small">Значение предела:</b>
          {VALUES.map((v) => (
            <label key={v} className="chk">
              <input type="checkbox" checked={values.includes(v)} onChange={() => toggle(values, v, setValues)} /> {VALUE_LABEL[v]}
            </label>
          ))}
        </div>
        <div className="filters">
          <label className="chk">
            <input type="checkbox" checked={neg} onChange={(e) => setNeg(e.target.checked)} /> Отрицания (≠)
          </label>
          <label className="chk">
            <input type="checkbox" checked={choice} onChange={(e) => setChoice(e.target.checked)} /> Режим выбора из вариантов
          </label>
        </div>
      </details>

      <div className="card" ref={cardRef}>
        <div className="card-meta">
          <span className="muted">Сформулируй в кванторах и неравенствах:</span>
          {stats.all > 0 && (
            <span>
              верно {stats.ok}/{stats.all}
            </span>
          )}
        </div>
        <div className="quant-prompt">
          <Md text={`$$${q.prompt}$$`} />
        </div>

        {choice ? (
          <div className="options">
            {q.options.map((o, i) => (
              <button
                key={i}
                className={`option ${picked === null ? '' : i === q.correct ? 'opt-ok' : i === picked ? 'opt-bad' : 'opt-dim'}`}
                onClick={() => pick(i)}
              >
                <Md text={`$${o}$`} inline />
              </button>
            ))}
          </div>
        ) : open ? (
          <div className="answer">
            <Md text={`$$${q.answer}$$`} />
          </div>
        ) : (
          <button className="reveal" onClick={() => setOpen(true)}>
            Запиши на бумаге и проверь
          </button>
        )}

        {(picked !== null || open) && (
          <div className="row">
            {picked !== null && picked !== q.correct && <span className="bad small">Сравни с верным вариантом — где отличие?</span>}
            <button className="primary" onClick={next}>
              Следующая →
            </button>
          </div>
        )}
      </div>

      <section className="panel small">
        <h3>Шпаргалка</h3>
        <Md
          text={`| Что | Условие |
|---|---|
| $x\\to a$ | $0<\\lvert x-a\\rvert<\\delta$ |
| $x\\to a+0$ | $0<x-a<\\delta$ |
| $x\\to a-0$ | $-\\delta<x-a<0$ |
| $x\\to+\\infty$ / $-\\infty$ / $\\infty$ | $x>\\delta$ / $x<-\\delta$ / $\\lvert x\\rvert>\\delta$ |
| $f\\to A$ | $\\lvert f(x)-A\\rvert<\\varepsilon$ |
| $f\\to+\\infty$ / $-\\infty$ / $\\infty$ | $f(x)>\\varepsilon$ / $f(x)<-\\varepsilon$ / $\\lvert f(x)\\rvert>\\varepsilon$ |

**Отрицание:** $\\forall\\varepsilon\\,\\exists\\delta\\,\\forall x\\ (P\\Rightarrow Q)$ превращается в $\\exists\\varepsilon\\,\\forall\\delta\\,\\exists x:\\ P\\wedge\\overline Q$.`}
        />
      </section>
    </div>
  );
}
