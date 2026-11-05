import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TASK_TYPE_LABEL, type Task, type TaskType } from '../content/schema';
import { orderByPriority, taskKey } from '../engine/catalog';
import { countActivity } from '../analytics';
import { useCat } from '../exam';
import { useProgress, useStore } from '../store/progress';
import { Grade } from '../ui/Grade';
import { ScaleMark, StatusDot } from '../ui/LevelSwitch';
import { Md } from '../ui/Md';
import { fmt } from './HomePage';
import { count } from '../plural';
import { TopicPicker } from '../ui/TopicPicker';

export function TasksPage() {
  const cat = useCat();
  const store = useStore();
  const st = useProgress();
  const [sp, setSp] = useSearchParams();
  const type = (sp.get('type') ?? '') as TaskType | '';
  // Темы через запятую, в порядке справочника; пусто — все темы. Старые ссылки `topic=<id>` открывают одну тему.
  const visibleTopics = cat.visibleTopics(st.mode);
  const topicParam = sp.get('topic')?.split(',') ?? [];
  const topics = visibleTopics.filter((t) => topicParam.includes(t.id)).map((t) => t.id);
  const topic = topics.join(',');
  const skill = sp.get('skill') ?? '';
  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp);
    if (v) n.set(k, v);
    else n.delete(k);
    setSp(n, { replace: true });
  };

  /** Задачи под тип и навык, без фильтра по теме. */
  const byTypeSkill = (mode: typeof st.mode) => cat.visibleTasks(mode).filter((t) => (!type || t.type === type) && (!skill || t.skill === skill));
  const list = useMemo(() => {
    const s = store.get();
    const pool = byTypeSkill(s.mode).filter((t) => !topics.length || topics.includes(t.topic));
    return orderByPriority(pool, taskKey, s);
    // порядок фиксируем на фильтр, чтобы список не прыгал после оценки
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, topic, skill, st.mode, cat]);
  const topicCount = (id: string) => byTypeSkill(st.mode).filter((t) => t.topic === id).length;
  const types = (Object.keys(TASK_TYPE_LABEL) as TaskType[]).filter((x) => cat.tasks.some((t) => t.type === x));

  return (
    <div className="page">
      <h1>Задачи</h1>
      <p className="muted">{cat.exam.tasksNote}</p>
      <div className="filters">
        <select value={type} onChange={(e) => set('type', e.target.value)}>
          <option value="">Все типы</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {TASK_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
        <TopicPicker topics={visibleTopics} value={topics} onChange={(list) => set('topic', list.join(','))} counts={topicCount} />
        {cat.exam.skills && (
          <select value={skill} onChange={(e) => set('skill', e.target.value)}>
            <option value="">Все навыки</option>
            {cat.exam.skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        )}
        <span className="muted small">{count(list.length, 'задача', 'задачи', 'задач')}</span>
      </div>
      {list.map((t, i) => (
        <TaskCard key={t.id} task={t} n={i + 1} />
      ))}
    </div>
  );
}

export function TaskCard({ task, n, showGrade = true }: { task: Task; n?: number; showGrade?: boolean }) {
  const cat = useCat();
  const st = useProgress();
  const [hints, setHints] = useState(0);
  const [open, setOpen] = useState(false);
  const key = taskKey(task);
  return (
    <article className="task">
      <header className="task-head">
        {n !== undefined && <span className="task-n">{n}</span>}
        <ScaleMark scales={task.scales} />
        <span className="tag">{TASK_TYPE_LABEL[task.type]}</span>
        <span className="task-topic">{cat.topicById.get(task.topic)?.title}</span>
        <span className="task-points">{fmt(task.points)} б.</span>
        <StatusDot status={st.items[key]?.status ?? 'new'} />
      </header>
      <Md text={task.prompt} />
      {task.hints.slice(0, hints).map((h, i) => (
        <div key={i} className="hint">
          <span className="label">Подсказка {i + 1}</span> <Md text={h} />
        </div>
      ))}
      {open && (
        <div className="answer">
          <div className="label">Решение</div>
          <Md text={task.answer} />
        </div>
      )}
      <div className="row">
        {hints < task.hints.length && !open && <button onClick={() => setHints(hints + 1)}>Подсказка</button>}
        {!open && (
          <button
            onClick={() => {
              setOpen(true);
              countActivity(cat.exam.id, 'tasks');
            }}
          >
            Показать решение
          </button>
        )}
        {task.source && <span className="task-source">{task.source}</span>}
      </div>
      {open && showGrade && <Grade itemKey={key} current={st.items[key]?.status} hotkeys={false} />}
    </article>
  );
}
