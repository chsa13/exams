import { BrowserRouter, Navigate, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import type { Feature } from './content/schema';
import { trackPage } from './analytics';
import { catalogOf, examById } from './engine/catalog';
import { ExamProvider, useCat, usePath } from './exam';
import { ExamIcon } from './ui/ExamIcon';
import { ExamStars, LevelSwitch } from './ui/LevelSwitch';
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
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
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
          <NavLink to="/" className="brand">
            <span className="exam-icon exam-icon-red exam-icon-sm" aria-hidden="true">
              ∑
            </span>
            {SITE_TITLE}
          </NavLink>
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
  ['/settings', 'Настройки', null],
];

function ExamLayout() {
  const { examId } = useParams();
  const exam = examById.get(examId ?? '');
  useEffect(() => {
    document.title = exam ? `${exam.short} · ${SITE_TITLE}` : SITE_TITLE;
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
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
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
            <NavLink to="/" className="brand-back" title="Все экзамены" aria-label="Все экзамены">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </NavLink>
            <NavLink to={p('/')} className="brand">
              <ExamIcon exam={exam} small />
              {exam.short} <ExamStars exam={exam} />
            </NavLink>
          </div>
          {exam.levels && <LevelSwitch />}
          <button className="nav-toggle" aria-label="Разделы" aria-expanded={menuOpen} aria-controls="exam-nav" onClick={() => setMenuOpen(!menuOpen)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d={menuOpen ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
        <nav id="exam-nav" className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          {NAV.filter(([, , f]) => has(f)).map(([to, label]) => (
            <NavLink key={to} to={p(to)} end={to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? 'active' : ''} ${to === '/how' ? 'nav-info' : ''}`}>
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
    </footer>
  );
}
