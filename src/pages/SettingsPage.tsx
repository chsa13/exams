import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { useCat } from '../exam';
import { taskKey } from '../engine/catalog';
import { parseProgress, useProgress, useStore, type State } from '../store/progress';
import { clearShareHash, readShareHash, shareUrl } from '../store/share';
import { LevelSwitch, Star } from '../ui/LevelSwitch';
import { QrCode } from '../ui/QrCode';
import { setThemeChoice, useTheme, type ThemeChoice } from '../ui/ThemeToggle';
import { count } from '../plural';

const hasProgress = (s: State) => Object.keys(s.items).length > 0 || s.mocks.length > 0;

const markCount = (s: State) => count(Object.keys(s.items).length, 'отметка', 'отметки', 'отметок');
const mockCount = (s: State) => count(s.mocks.length, 'пробный вариант', 'пробных варианта', 'пробных вариантов');
const marks = (s: State) => `${markCount(s)} и ${mockCount(s)}`;

/** Где показать ответ на действие: рядом с кнопкой, которую нажали. */
type Place = 'top' | 'link' | 'file' | 'reset';
type Notice = { at: Place; ok: boolean; text: string };
/** Прогресс из ссылки или файла, который ждёт решения: объединить или заменить. */
type Incoming = { state: State; from: 'link' | 'file' };

const THEMES: [ThemeChoice, string][] = [
  ['system', 'Как в системе'],
  ['light', 'Светлая'],
  ['dark', 'Тёмная'],
];

export function SettingsPage() {
  const cat = useCat();
  const { exam } = cat;
  const store = useStore();
  const st = useProgress();
  const theme = useTheme();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [link, setLink] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const readLink = () => readShareHash(exam.id, location.hash, [...cat.facetByKey.keys(), ...exam.tasks.map(taskKey)]);
  const [incoming, setIncoming] = useState<Incoming | null>(() => {
    const s = readLink();
    return s && s !== 'bad' ? { state: s, from: 'link' } : null;
  });

  const say = (at: Place, text: string, ok = true) => setNotice({ at, ok, text });
  const noticeAt = (at: Place) =>
    notice?.at === at && (
      <p className={`notice ${notice.ok ? 'notice-ok' : 'notice-bad'}`} role="status">
        {notice.text}
      </p>
    );

  // Раньше, чем сайт отправит статистику: данные из ссылки не должны оставаться в адресе.
  useLayoutEffect(() => {
    if (readLink() === 'bad') say('top', 'Ссылка повреждена, прогресс не изменён.', false);
    clearShareHash();
  }, []);

  // Ссылку вставили в адрес на этой же странице: браузер не перезагружает её, меняется только часть после #.
  useEffect(() => {
    const onHash = () => {
      const next = readLink();
      if (!next) return;
      clearShareHash();
      if (next === 'bad') say('top', 'Ссылка повреждена, прогресс не изменён.', false);
      else {
        setNotice(null);
        setIncoming({ state: next, from: 'link' });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  });

  const accept = (how: 'merge' | 'replace', { state, from }: Incoming) => {
    if (how === 'merge') store.merge(state);
    else store.replace(state);
    setIncoming(null);
    say('top', `Прогресс из ${from === 'link' ? 'ссылки' : 'файла'} загружен: ${marks(state)}.`);
  };

  // Своего прогресса нет — спрашивать не о чем.
  useEffect(() => {
    if (incoming && !hasProgress(store.get())) accept('replace', incoming);
  }, [incoming]);

  const copyLink = async () => {
    const url = shareUrl(exam.id, st);
    try {
      await navigator.clipboard.writeText(url);
      setLink('');
      say('link', 'Ссылка скопирована. Отправь её себе или другу и открой на другом устройстве.');
    } catch {
      setLink(url); // буфер обмена недоступен: покажем ссылку, её можно скопировать руками
      setNotice(null);
    }
  };

  const download = () => {
    const blob = new Blob([store.exportJson()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${exam.id}-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    say('file', `Файл сохранён: ${marks(st)}.`);
  };

  const upload = (file: File) => {
    const units = new Set(exam.topics.flatMap((t) => t.units.map((u) => u.id)));
    const tasks = new Set(exam.tasks.map((t) => t.id));
    const ownKey = (key: string) => (key.startsWith('task:') ? tasks.has(key.slice(5)) : units.has(key.split(':')[0]));
    file
      .text()
      .then((t) => {
        setNotice(null);
        setIncoming({ state: parseProgress(t, ownKey), from: 'file' });
        window.scrollTo(0, 0); // вопрос «объединить или заменить» — наверху страницы
      })
      .catch((e: Error) => say('file', `${e.message}.`, false));
  };

  const hasTasks = exam.features.includes('tasks');
  const levelSize = (mode: 'basic' | 'all') => {
    const q = count(cat.visibleFacets(mode).length, 'вопрос', 'вопроса', 'вопросов');
    return hasTasks ? `${q} и ${count(cat.visibleTasks(mode).length, 'задача', 'задачи', 'задач')}` : q;
  };
  const any = hasProgress(st);

  return (
    <div className="page page-narrow settings">
      <h1>Настройки</h1>
      {noticeAt('top')}

      {incoming && hasProgress(st) && (
        <section className="panel panel-ask">
          <h3>{incoming.from === 'link' ? 'Загрузить прогресс из ссылки?' : 'Загрузить прогресс из файла?'}</h3>
          <p>
            В {incoming.from === 'link' ? 'ссылке' : 'файле'} {marks(incoming.state)}. Здесь у тебя уже {marks(st)}.
          </p>
          <ul className="settings-options">
            <li>
              <b>Объединить</b> — по каждому вопросу останется более свежая отметка, пробные варианты сложатся.
            </li>
            <li>
              <b>Заменить</b> — твой прогресс здесь сотрётся, останется только загруженный.
            </li>
          </ul>
          <div className="row">
            <button className="primary" onClick={() => accept('merge', incoming)}>
              Объединить
            </button>
            <button onClick={() => accept('replace', incoming)}>Заменить</button>
            <button className="link" onClick={() => setIncoming(null)}>
              Не загружать
            </button>
          </div>
        </section>
      )}

      {/* Настройки — как панель фильтров: одна белая панель на группу, строки «подпись слева, управление справа». */}
      <section className="panel set-group">
        <h3>Вид</h3>
        {exam.levels && (
          <SetRow
            label="Уровень"
            hint={
              <>
                <Star scale="red" /> {levelSize('basic')}, с <Star scale="black" /> — {levelSize('all')}. Только для этого экзамена.
              </>
            }
          >
            <LevelSwitch />
          </SetRow>
        )}
        <SetRow label="Тема" hint="Одна на все экзамены.">
          <div className="seg" role="radiogroup" aria-label="Тема">
            {THEMES.map(([value, label]) => (
              <button
                key={value}
                role="radio"
                aria-checked={theme.choice === value}
                className={theme.choice === value ? 'on' : ''}
                onClick={() => setThemeChoice(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </SetRow>
      </section>

      <section className="panel set-group">
        <h3>Прогресс</h3>
        <p className="muted small">
          {exam.short}: {any ? marks(st) : 'пока ничего не отмечено'}, хранится только в этом браузере.
        </p>
        <SetRow
          label="Ссылка"
          hint="Открой на другом устройстве — там будет такой же прогресс. На сервер она не попадает."
          below={
            <>
              {link && <input className="search" readOnly value={link} aria-label="Ссылка на прогресс" onFocus={(e) => e.target.select()} />}
              {showQr && any && (
                <div className="settings-qr">
                  <QrCode text={shareUrl(exam.id, st)} />
                  <p className="muted small">Наведи камеру телефона на код: откроется этот экзамен с твоим прогрессом.</p>
                </div>
              )}
              {noticeAt('link')}
            </>
          }
        >
          <button className="primary" disabled={!any} onClick={copyLink}>
            Скопировать ссылку
          </button>
          <button disabled={!any} aria-expanded={showQr} onClick={() => setShowQr(!showQr)}>
            {showQr ? 'Скрыть QR-код' : 'QR-код'}
          </button>
        </SetRow>
        <SetRow label="Файл" hint="Копия на всякий случай: загрузи её в другом браузере или после сброса." below={noticeAt('file')}>
          <button disabled={!any} onClick={download}>
            Скачать
          </button>
          <label className="btn">
            Загрузить
            <input
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = ''; // тот же файл можно выбрать ещё раз
                if (f) upload(f);
              }}
            />
          </label>
        </SetRow>
        <SetRow
          label="Сброс"
          hint="Сотрёт отметки и пробные варианты этого экзамена. Уровень и тема останутся."
          below={
            <>
              {confirmReset && (
                <div className="settings-confirm">
                  <p className="small">Стереть {marks(st)}? Это нельзя отменить — если сомневаешься, сначала скачай файл.</p>
                  <div className="row">
                    <button
                      className="danger-solid"
                      onClick={() => {
                        store.reset();
                        setConfirmReset(false);
                        setShowQr(false);
                        setLink('');
                        say('reset', 'Прогресс сброшен.');
                      }}
                    >
                      Стереть прогресс
                    </button>
                    <button onClick={() => setConfirmReset(false)}>Отмена</button>
                  </div>
                </div>
              )}
              {noticeAt('reset')}
            </>
          }
        >
          {!confirmReset && (
            <button className="danger" disabled={!any} onClick={() => (setNotice(null), setConfirmReset(true))}>
              Сбросить…
            </button>
          )}
        </SetRow>
      </section>
    </div>
  );
}

/** Строка настроек: слева подпись и одна строка пояснения, справа управление; ответ на действие — под строкой. */
function SetRow({ label, hint, children, below }: { label: string; hint: ReactNode; children: ReactNode; below?: ReactNode }) {
  return (
    <div className="set-row">
      <div className="set-main">
        <div className="set-label">
          <div className="set-title">{label}</div>
          <div className="set-hint">{hint}</div>
        </div>
        <div className="set-control">{children}</div>
      </div>
      {below}
    </div>
  );
}
