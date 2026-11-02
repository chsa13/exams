import { useEffect, useLayoutEffect, useState } from 'react';
import { useCat } from '../exam';
import { taskKey } from '../engine/catalog';
import { useProgress, useStore, type State } from '../store/progress';
import { clearShareHash, readShareHash, shareUrl } from '../store/share';
import { LevelSwitch, Star } from '../ui/LevelSwitch';
import { QrCode } from '../ui/QrCode';
import { count } from '../plural';

const hasProgress = (s: State) => Object.keys(s.items).length > 0 || s.mocks.length > 0;

const marks = (s: State) =>
  `${count(Object.keys(s.items).length, 'отметка', 'отметки', 'отметок')}, ${count(s.mocks.length, 'пробный вариант', 'пробных варианта', 'пробных вариантов')}`;

export function SettingsPage() {
  const cat = useCat();
  const { exam } = cat;
  const store = useStore();
  const st = useProgress();
  const [msg, setMsg] = useState('');
  const [link, setLink] = useState('');
  const [showQr, setShowQr] = useState(false);
  const readLink = () => readShareHash(exam.id, location.hash, [...cat.facetByKey.keys(), ...exam.tasks.map(taskKey)]);
  const [shared, setShared] = useState<State | 'bad' | null>(readLink);

  // Раньше, чем сайт отправит статистику: данные из ссылки не должны оставаться в адресе.
  useLayoutEffect(clearShareHash, []);

  // Ссылку вставили в адрес на этой же странице: браузер не перезагружает её, меняется только часть после #.
  useEffect(() => {
    const onHash = () => {
      const next = readLink();
      if (!next) return;
      clearShareHash();
      setMsg('');
      setShared(next);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  });

  const accept = (apply: (s: State) => void, s: State) => {
    apply(s);
    setShared(null);
    setMsg(`Прогресс из ссылки загружен: ${marks(s)}.`);
  };

  useEffect(() => {
    if (shared === 'bad') {
      setShared(null);
      setMsg('Ошибка: ссылка повреждена, прогресс не изменён.');
    } else if (shared && !hasProgress(store.get())) {
      accept(store.replace.bind(store), shared); // своего прогресса нет, спрашивать не о чем
    }
  }, [shared]);

  const copyLink = async () => {
    const url = shareUrl(exam.id, st);
    try {
      await navigator.clipboard.writeText(url);
      setLink('');
      setMsg('Ссылка скопирована. Отправь её себе или другу.');
    } catch {
      setLink(url); // буфер обмена недоступен: покажем ссылку, её можно скопировать руками
      setMsg('');
    }
  };

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
      {shared && shared !== 'bad' && hasProgress(st) && (
        <section className="panel">
          <h3>Прогресс из ссылки</h3>
          <p className="muted small">
            В ссылке {marks(shared)}. Здесь уже есть {marks(st)}. «Объединить» оставит по каждому вопросу более свежую отметку, «Заменить» сотрёт твой прогресс.
          </p>
          <div className="row">
            <button className="primary" onClick={() => accept(store.merge.bind(store), shared)}>
              Объединить
            </button>
            <button onClick={() => accept(store.replace.bind(store), shared)}>Заменить</button>
            <button onClick={() => setShared(null)}>Не загружать</button>
          </div>
        </section>
      )}
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
          Прогресс хранится только в этом браузере ({marks(st)}). Чтобы перенести его на другое устройство или поделиться, скопируй ссылку: кто её откроет,
          получит такой же прогресс. В ссылке только отметки, на сервер она не попадает.
        </p>
        <div className="row">
          <button className="primary" disabled={!hasProgress(st)} onClick={copyLink}>
            Скопировать ссылку
          </button>
          <button disabled={!hasProgress(st)} aria-expanded={showQr} onClick={() => setShowQr(!showQr)}>
            {showQr ? 'Скрыть QR-код' : 'Показать QR-код'}
          </button>
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
        {showQr && hasProgress(st) && (
          <>
            <QrCode text={shareUrl(exam.id, st)} />
            <p className="muted small">Наведи камеру телефона на код: откроется этот экзамен с твоим прогрессом.</p>
          </>
        )}
        {link && <input className="search" readOnly value={link} aria-label="Ссылка на прогресс" onFocus={(e) => e.target.select()} />}
        {msg && <p className="small">{msg}</p>}
      </section>
    </div>
  );
}
