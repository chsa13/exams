import { Link } from 'react-router-dom';
import type { Kind, Unit } from '../content/schema';
import { KIND_LABEL } from '../content/schema';
import { levelVisible } from '../engine/catalog';
import { useCat, usePath } from '../exam';
import type { Mode } from '../store/progress';
import { useProgress } from '../store/progress';
import { LevelMark, StatusDot } from './LevelSwitch';
import { Md } from './Md';

/** Содержимое одной грани: текст определения/формулировки или доказательство по шагам. */
export function FacetBody({
  unit,
  kind,
  withStatement = true,
  lemmasInline = true,
}: {
  unit: Unit;
  kind: Kind;
  withStatement?: boolean;
  /** false — вместо доказательств лемм показать только ссылки на них */
  lemmasInline?: boolean;
}) {
  if (kind === 'proof') {
    const p = unit.proof!;
    return (
      <div className="facet-body">
        {withStatement && unit.statement && (
          <div className="stmt-ref">
            <div className="label">Формулировка</div>
            <Md text={unit.statement.text} />
          </div>
        )}
        {lemmasInline ? <LemmaProofs unit={unit} /> : <LemmaLinks unit={unit} />}
        <div className="idea">
          <span className="label">Идея</span> <Md text={p.idea} inline />
        </div>
        <ol className="steps">
          {p.steps.map((s, i) => (
            <li key={i}>
              <div className="step-title">
                <Md text={s.title} inline />
              </div>
              <Md text={s.body} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <div className="facet-body">
      <Md text={unit[kind]!.text} />
    </div>
  );
}

/** Доказательства лемм, которые нужно привести в ответе (перед основным доказательством). */
export function LemmaProofs({ unit }: { unit: Unit }) {
  const chain = useCat().lemmaChain(unit);
  if (!chain.length) return null;
  return (
    <div className="lemmas">
      <div className="label">Сначала докажи {chain.length === 1 ? 'лемму — без неё' : `леммы (${chain.length}) — без них`} доказательство неполное</div>
      {chain.map((l) => (
        <details key={l.id} className="lemma" open>
          <summary>
            <b>{l.title}</b>
          </summary>
          {l.statement && l.statement.text.replace(/\.$/, '') !== l.title && <Md text={l.statement.text} />}
          {l.proof && (
            <ol className="steps">
              {l.proof.steps.map((s, i) => (
                <li key={i}>
                  <div className="step-title">
                    <Md text={s.title} inline />
                  </div>
                  <Md text={s.body} />
                </li>
              ))}
            </ol>
          )}
        </details>
      ))}
      <div className="label">Основное доказательство</div>
    </div>
  );
}

export function LemmaLinks({ unit }: { unit: Unit }) {
  const cat = useCat();
  const p = usePath();
  const chain = cat.lemmaChain(unit);
  if (!chain.length) return null;
  return (
    <div className="lemma-links">
      <span className="label">В ответе докажи и {chain.length === 1 ? 'лемму' : 'леммы'}:</span>{' '}
      {chain.map((l, i) => {
        const u = cat.unitById.get(l.id)!;
        return (
          <span key={l.id}>
            {i > 0 && ', '}
            <Link to={p(`/topic/${u.topic.id}?u=${l.id}`)}>{l.title}</Link>
          </span>
        );
      })}
    </div>
  );
}

export function UsesLinks({ unit }: { unit: Unit }) {
  const cat = useCat();
  const p = usePath();
  if (!unit.uses?.length) return null;
  return (
    <div className="uses">
      <span className="label">Ссылается на теоремы:</span>{' '}
      {unit.uses.map((id, i) => {
        const u = cat.unitById.get(id);
        if (!u) return null;
        return (
          <span key={id}>
            {i > 0 && ', '}
            <Link to={p(`/topic/${u.topic.id}?u=${id}`)}>{u.unit.title}</Link>
          </span>
        );
      })}
    </div>
  );
}

/** Карточка единицы в справочнике: все видимые грани + примечания. */
export function UnitCard({ unit, mode }: { unit: Unit; mode: Mode }) {
  const p = usePath();
  const st = useProgress();
  const cat = useCat();
  const kinds = (['definition', 'statement', 'proof'] as const).filter((k) => unit[k]);
  return (
    <article className="unit" id={`u-${unit.id}`}>
      <header className="unit-head">
        <h3>
          {unit.title} {unit.aux && <span className="tag">лемма</span>}
        </h3>
        <span className="muted small">{unit.source}</span>
      </header>
      {kinds.map((k) => {
        const f = unit[k]!;
        const visible = levelVisible(f.level, mode);
        const key = `${unit.id}:${k}`;
        return (
          <section key={k} className={`facet ${visible ? '' : 'facet-hidden'}`}>
            <div className="facet-head">
              <LevelMark level={f.level} />
              <span className="kind">{KIND_LABEL[k]}</span>
              {/* у формулировки, которая не отдельный вопрос, своего статуса нет */}
              {cat.facetByKey.has(key) && <StatusDot status={st.items[key]?.status ?? 'new'} />}
              {k === 'proof' && visible && (
                <Link className="small" to={p(`/proofs/${unit.id}`)}>
                  тренировать →
                </Link>
              )}
            </div>
            {visible ? (
              <FacetBody unit={unit} kind={k} withStatement={false} lemmasInline={false} />
            ) : (
              <div className="muted small">Только продвинутый уровень — включи «Продвинутый» вверху, чтобы увидеть.</div>
            )}
          </section>
        );
      })}
      {unit.notes && (
        <div className="notes">
          <Md text={unit.notes} />
        </div>
      )}
      {unit.pitfalls?.length ? (
        <div className="pitfalls">
          <div className="label">Типичные ошибки</div>
          <ul>
            {unit.pitfalls.map((p, i) => (
              <li key={i}>
                <Md text={p} inline />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <UsesLinks unit={unit} />
    </article>
  );
}
