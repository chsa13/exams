import { BrowserRouter, Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import type { Feature } from './content/schema';
import { trackPage } from './analytics';
import { catalogOf, examById } from './engine/catalog';
import { ExamProvider, useCat, usePath } from './exam';
import { ExamIcon, GlyphTile } from './ui/ExamIcon';
import { ExamStars, LevelSwitch } from './ui/LevelSwitch';
import { ThemeToggle } from './ui/ThemeToggle';
import { HubPage } from './pages/HubPage';
import { HomePage } from './pages/HomePage';
import { TopicsPage, TopicPage } from './pages/TopicsPage';
import { CardsPage } from './pages/CardsPage';
import { ProofsPage, ProofPage } from './pages/ProofsPage';
import { QuantPage } from './pages/QuantPage';
import { TasksPage } from './pages/TasksPage';
import { MockPage } from './pages/MockPage';
import { HowPage } from './pages/HowPage';
import { SettingsPage } from './pages/SettingsPage';

export const SITE_TITLE = 'Подготовка к экзаменам ЦУ';

function ScrollTop() {
  const { pathname, search } = useLocation();
  // Адрес сменился, в том числе только его часть после «?» — это другой экран, открываем его сверху.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  useEffect(() => {
    // Новая страница начинается как после загрузки: фокус на старой ссылке меню перехватывал бы клавиши.
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [pathname]);
  useEffect(() => {
    // заголовок страницы выставляют эффекты раздела, поэтому читаем его чуть позже
    const t = setTimeout(() => trackPage(pathname, document.title), 0);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

const BASE = import.meta.env.BASE_URL;

// Ссылки внутри текстов (Markdown) — обычные <a>. Открываем их внутри сайта, без перезагрузки страницы.
function InternalLinks() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a');
      if (!a || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !url.pathname.startsWith(BASE)) return;
      e.preventDefault();
      navigate(url.pathname.slice(BASE.length - 1) + url.search + url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);
  return null;
}

export function App() {
  return (
    <BrowserRouter basename={BASE.replace(/\/$/, '')}>
      <ScrollTop />
      <InternalLinks />
      <Routes>
        <Route path="/" element={<HubLayout />} />
        <Route path="/:examId/*" element={<ExamLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

function HubLayout() {
  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);
  return (
    <>
      <header className="top">
        <div className="top-inner">
          {/* Домик стоит и здесь, на том же месте, что в шапке экзамена: при переходе в экзамен значок и название не сдвигаются. */}
          <div className="brand-row">
            <NavLink to="/" className="brand-home" title="Все экзамены" aria-label="Все экзамены">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </NavLink>
            <NavLink to="/" className="brand">
              <GlyphTile symbol="∑" color="red" small />
              {SITE_TITLE}
            </NavLink>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="main">
        <HubPage />
      </main>
      <Footer />
    </>
  );
}

const NAV: [string, string, Feature | null][] = [
  ['/', 'Главная', null],
  ['/topics', 'Справочник', 'topics'],
  ['/cards', 'Карточки', 'cards'],
  ['/proofs', 'Доказательства', 'proofs'],
  ['/quant', 'Кванторы', 'quant'],
  ['/tasks', 'Задачи', 'tasks'],
  ['/mock', '', 'mock'],
  ['/how', 'Как устроено', null],
  // на компьютере настройки — шестерёнка в шапке, в меню телефона — пункт
  ['/settings', 'Настройки', null],
];

function ExamLayout() {
  const { examId } = useParams();
  const exam = examById.get(examId ?? '');
  useEffect(() => {
    document.title = exam ? `${exam.short} — ${SITE_TITLE}` : SITE_TITLE;
  }, [exam]);
  if (!exam) return <Navigate to="/" replace />;
  return (
    <ExamProvider value={catalogOf(exam)}>
      {/* key: при смене экзамена страницы монтируются заново и не тащат состояние чужого экзамена */}
      <ExamShell key={exam.id} />
    </ExamProvider>
  );
}

function ExamShell() {
  const p = usePath();
  const { exam } = useCat();
  const { pathname } = useLocation();
  // На узком экране разделы спрятаны в меню: оно закрывается при переходе, по Esc и по нажатию мимо него.
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault(); // Esc закрывает меню и больше ничего: карточки на него не отзываются
      setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [menuOpen]);
  const has = (f: Feature | null) => !f || exam.features.includes(f);
  const only = (f: Feature, el: ReactElement) => (has(f) ? el : <Navigate to={p('/')} replace />);
  return (
    <>
      <header className="top" ref={headerRef}>
        <div className="top-inner">
          <div className="brand-row">
            <NavLink to="/" className="brand-home" title="Все экзамены" aria-label="Все экзамены">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </NavLink>
            <NavLink to={p('/')} className="brand">
              <ExamIcon exam={exam} small />
              {exam.short} <ExamStars exam={exam} />
            </NavLink>
          </div>
          <div className="top-tools">
            {exam.levels && <LevelSwitch />}
            <NavLink to={p('/settings')} className={({ isActive }) => `icon-btn top-settings ${isActive ? 'icon-btn-on' : ''}`} aria-label="Настройки" title="Настройки">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </NavLink>
            <ThemeToggle />
          </div>
          <button className="nav-toggle" aria-label="Разделы" aria-expanded={menuOpen} aria-controls="exam-nav" onClick={() => setMenuOpen(!menuOpen)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d={menuOpen ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
        <nav id="exam-nav" className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {/* На узком экране уровень — первым пунктом меню: в шапке он занимал бы целую строку на каждой странице. */}
          {exam.levels && (
            <div className="nav-level">
              <LevelSwitch />
            </div>
          )}
          {NAV.filter(([, , f]) => has(f)).map(([to, label]) => (
            <NavLink
              key={to}
              to={p(to)}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              // «Главная» горит и по адресу со слэшем на конце (/<id>/): так открываются ссылки на экзамен с GitHub Pages;
              // «Справочник» — и на страницах тем (/topic/<id>)
              className={({ isActive }) => `${isActive || (to === '/' && pathname.replace(/\/$/, '') === p('/')) || (to === '/topics' && pathname.startsWith(p('/topic/'))) ? 'active' : ''} ${to === '/how' ? 'nav-info' : ''} ${to === '/settings' ? 'nav-mobile' : ''}`}
            >
              {to === '/mock' ? exam.mock.title : label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="topics" element={only('topics', <TopicsPage />)} />
          <Route path="topic/:id" element={only('topics', <TopicPage />)} />
          <Route path="cards" element={only('cards', <CardsPage />)} />
          <Route path="proofs" element={only('proofs', <ProofsPage />)} />
          <Route path="proofs/:id" element={only('proofs', <ProofPage />)} />
          <Route path="quant" element={only('quant', <QuantPage />)} />
          <Route path="tasks" element={only('tasks', <TasksPage />)} />
          <Route path="mock" element={only('mock', <MockPage />)} />
          <Route path="how" element={<HowPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to={p('/')} replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <span className="muted">
        Неофициальный конспект от студентов по программе курсов, не заменяет материалы курса. Прогресс хранится только в этом браузере, отдельно для каждого экзамена.
      </span>
      <span className="foot-contact">
        <a href="https://t.me/chsa13" target="_blank" rel="noopener noreferrer" aria-label="Telegram разработчика: @chsa13" title="Связь с разработчиком">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
          @chsa13
        </a>
      </span>
    </footer>
  );
}
