import { useState } from 'react';
import { useCat } from '../exam';
import { useProgress, useStore } from '../store/progress';
import { LevelSwitch, Star } from '../ui/LevelSwitch';
import { count } from '../plural';

export function SettingsPage() {
  const { exam } = useCat();
  const store = useStore();
  const st = useProgress();
  const [msg, setMsg] = useState('');

  const download = () => {
    const blob = new Blob([store.exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${exam.id}-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const upload = (file: File) => {
    const units = new Set(exam.topics.flatMap((t) => t.units.map((u) => u.id)));
    const tasks = new Set(exam.tasks.map((t) => t.id));
    const ownKey = (key: string) => (key.startsWith('task:') ? tasks.has(key.slice(5)) : units.has(key.split(':')[0]));
    file
      .text()
      .then((t) => {
        store.importJson(t, ownKey);
        setMsg('Прогресс загружен.');
      })
      .catch((e: Error) => setMsg(`Ошибка: ${e.message}`));
  };

  return (
    <div className="page">
      <h1>Прогресс и настройки</h1>
      <p className="muted">{exam.short}: прогресс у каждого экзамена свой.</p>
      {exam.levels && (
      <section className="panel">
        <h3>Уровень</h3>
        <LevelSwitch />
        <p className="muted small">
          «Основной» прячет вопросы продвинутого уровня (<Star scale="black" />) везде: в справочнике, карточках, задачах и пробном билете.
        </p>
      </section>
      )}
      <section className="panel">
        <h3>Перенос прогресса</h3>
        <p className="muted small">
          Прогресс хранится только в этом браузере ({count(Object.keys(st.items).length, 'отметка', 'отметки', 'отметок')}, {count(st.mocks.length, 'пробный вариант', 'пробных варианта', 'пробных вариантов')}). Чтобы перенести на
          другое устройство — скачай файл и загрузи его там.
        </p>
        <div className="row">
          <button onClick={download}>Скачать прогресс</button>
          <label className="btn">
            Загрузить файл
            <input type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          </label>
          <button
            className="danger"
            onClick={() => {
              if (confirm(`Сбросить весь прогресс по разделу «${exam.short}»?`)) {
                store.reset();
                setMsg('Прогресс сброшен.');
              }
            }}
          >
            Сбросить
          </button>
        </div>
        {msg && <p className="small">{msg}</p>}
      </section>
    </div>
  );
}
