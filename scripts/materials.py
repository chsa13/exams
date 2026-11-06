#!/usr/bin/env python3
"""Материалы курса для нового экзамена: найти, скопировать, вытащить текст, составить опись.

Файлы курса в репозиторий не кладём (CLAUDE.md, §6): всё складывается в рабочую папку вне проекта,
по умолчанию ~/exam-work/<id>/ (переменная EXAM_WORK меняет корень).

Какие материалы брать, говорит пользователь. Скрипт только помогает найти названный файл и собрать ровно его.

    python3 -I scripts/materials.py find матан лонгрид          # найти названный файл: поиск по именам в ~/Downloads и в архивах
    python3 -I scripts/materials.py collect <id> <файл|папка>…  # скопировать, распаковать, вытащить текст, опись
    python3 -I scripts/materials.py extract <id>                # пересобрать text/ и INDEX.md после ручных добавлений

Рабочая папка:
    raw/       копии файлов с именами в NFC (в ~/Downloads имена в NFD — обычный cp с кириллицей их не находит)
    text/      текст: pdf → pdftotext -layout, ipynb → markdown + код, docx/pptx → текст по абзацам и слайдам
    INDEX.md   опись: вид материала, неделя, страницы, объём, сканы и картинки, которые надо смотреть глазами
    brief.md   анкета экзамена (создаётся один раз, дальше заполняется руками)

Только стандартная библиотека. Запускать с -I: материалы — чужие файлы, рядом с ними не должно импортироваться ничего лишнего.
"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import unicodedata
import zipfile
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

HOME = Path.home()
ROOTS = [HOME / 'Downloads']
WORK = Path(os.environ.get('EXAM_WORK', HOME / 'exam-work'))
SKIP_DIRS = {'node_modules', '.git', '__MACOSX', 'MAX_files'}
DOC_EXT = {'.pdf', '.ipynb', '.docx', '.pptx', '.md', '.txt', '.html', '.htm', '.py', '.tex', '.djvu', '.xlsx', '.csv', '.json'}
IMG_EXT = {'.png', '.jpg', '.jpeg', '.webp', '.heic'}
MAX_UNZIP = 500 * 1024 * 1024  # больше — подозрительно, распаковывать не будем
SCAN_CHARS_PER_PAGE = 300       # меньше символов на страницу — скорее всего скан без текстового слоя


def nfc(s: str) -> str:
    return unicodedata.normalize('NFC', s)


def norm(s: str) -> str:
    """Для поиска: NFC, нижний регистр, ё → е, разделители → пробел."""
    s = nfc(s).lower().replace('ё', 'е')
    return re.sub(r'[\s_\-.]+', ' ', s)


# ---------------------------------------------------------------- вид материала

KINDS = [
    ('демо', r'демо|demo'),
    ('вопросы', r'вопрос|программ|коллок|список|билет'),
    ('контрольные', r'контрольн|\bкр ?\d|\bкр\b|exam|test|сборник контрольных'),
    ('решения', r'решени|solution|ответ'),
    ('лонгрид', r'лонгрид|longread|\blr\b|weeklr'),
    ('конспект', r'конспект|лекци|lecture|guide|notes'),
    ('семинар', r'семинар|seminar|\bsem\b|практик'),
    ('дз', r'\bдз\b|домашн|\bhw\b|homework'),
    ('сборник', r'сборник'),
]


def kind_of(name: str) -> str:
    n = norm(name)
    for kind, rx in KINDS:
        if re.search(rx, n):
            return kind
    return '?'


def week_of(name: str) -> str:
    n = norm(name)
    for rx in (r'недел[яиь]? ?(\d{1,2})', r'week ?(\d{1,2})', r'^(\d{1,2}) ?week', r'лонгрид ?(\d{1,2})', r'(?:дз|семинар) ?(\d{1,2})'):
        m = re.search(rx, n)
        if m:
            return m.group(1)
    return ''


# ---------------------------------------------------------------- поиск

def walk(root: Path):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith('.')]
        for f in filenames:
            yield Path(dirpath) / f


def matches(name: str, words: list[str]) -> bool:
    """Каждое слово запроса — начало какого-то слова в пути: «линейн» найдёт «Линейная», «8» не найдёт «0160a857»."""
    tokens = re.findall(r'\w+', norm(name))
    return all(any(t.startswith(w) for t in tokens) for w in (norm(x).strip() for x in words) if w)


def cmd_find(words: list[str]) -> None:
    if not words:
        sys.exit('Укажи слова для поиска: find матан лонгрид')
    hits = []
    for root in ROOTS:
        for p in walk(root):
            rel = nfc(str(p.relative_to(root)))
            if p.suffix.lower() in DOC_EXT | IMG_EXT | {'.zip'} and matches(rel, words):
                hits.append((p.stat().st_mtime, p, None))
            if p.suffix.lower() == '.zip':
                try:
                    with zipfile.ZipFile(p) as z:
                        for info in z.infolist():
                            inner = nfc(info.filename)
                            if not info.is_dir() and matches(inner, words):
                                hits.append((p.stat().st_mtime, p, inner))
                except (zipfile.BadZipFile, OSError):
                    pass
    hits.sort(key=lambda h: -h[0])
    for _, p, inner in hits:
        where = nfc(str(p)).replace(str(HOME), '~')
        size = p.stat().st_size // 1024
        if inner:
            print(f'  {where}  ⟶  {inner}')
        else:
            print(f'  {where}  ({size} КБ, {kind_of(p.name)})')
    print(f'Найдено: {len(hits)}')


# ---------------------------------------------------------------- копирование

def resolve(arg: str) -> Path:
    """Путь, набранный в NFC, ищем среди файлов с NFD-именами."""
    p = Path(os.path.expanduser(arg))
    if p.exists():
        return p
    parts = p.parts
    cur = Path(parts[0])
    for part in parts[1:]:
        cand = cur / part
        if not cand.exists() and cur.is_dir():
            want = nfc(part)
            cand = next((c for c in cur.iterdir() if nfc(c.name) == want), cand)
        cur = cand
    if not cur.exists():
        sys.exit(f'Нет такого файла: {arg}')
    return cur


def safe_unzip(src: Path, dest: Path) -> list[Path]:
    out = []
    with zipfile.ZipFile(src) as z:
        if sum(i.file_size for i in z.infolist()) > MAX_UNZIP:
            print(f'  ! {src.name}: архив больше {MAX_UNZIP >> 20} МБ, пропускаю')
            return out
        for info in z.infolist():
            name = info.filename
            # имена из Windows-архивов бывают в cp866 под видом cp437
            if not info.flag_bits & 0x800:
                try:
                    name = name.encode('cp437').decode('cp866')
                except (UnicodeEncodeError, UnicodeDecodeError):
                    pass
            rel = Path(nfc(name))
            if info.is_dir() or rel.is_absolute() or '..' in rel.parts or rel.parts[0] == '__MACOSX':
                continue
            target = dest / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            with z.open(info) as fin, open(target, 'wb') as fout:
                shutil.copyfileobj(fin, fout)
            out.append(target)
    return out


def copy_in(src: Path, raw: Path) -> int:
    n = 0
    if src.is_dir():
        for p in walk(src):
            rel = Path(nfc(str(p.relative_to(src.parent))))
            n += copy_one(p, raw / rel)
        return n
    return copy_one(src, raw / nfc(src.name))


def copy_one(src: Path, target: Path) -> int:
    ext = src.suffix.lower()
    if ext not in DOC_EXT | IMG_EXT | {'.zip'}:
        return 0
    target.parent.mkdir(parents=True, exist_ok=True)
    if ext == '.zip':
        files = safe_unzip(src, target.with_suffix(''))
        print(f'  {target.name}: распаковано {len(files)} файлов')
        return len(files)
    shutil.copy2(src, target)
    print(f'  + {target.name}')
    return 1


# ---------------------------------------------------------------- текст

class _Strip(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out: list[str] = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1
        if tag in ('p', 'br', 'div', 'li', 'tr', 'h1', 'h2', 'h3'):
            self.out.append('\n')

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip:
            self.out.append(data)


def pdf_pages(p: Path) -> int:
    try:
        info = subprocess.run(['pdfinfo', str(p)], capture_output=True, text=True, timeout=60).stdout
        m = re.search(r'^Pages:\s+(\d+)', info, re.M)
        return int(m.group(1)) if m else 0
    except (OSError, subprocess.TimeoutExpired):
        return 0


def text_of(p: Path) -> tuple[str, str]:
    """Текст файла и заметка для описи."""
    ext = p.suffix.lower()
    if ext == '.pdf':
        r = subprocess.run(['pdftotext', '-layout', str(p), '-'], capture_output=True, text=True, timeout=300)
        return r.stdout, ''
    if ext == '.ipynb':
        nb = json.loads(p.read_text(encoding='utf-8'))
        parts = []
        for c in nb.get('cells', []):
            src = ''.join(c.get('source', ''))
            if c.get('cell_type') == 'code':
                parts.append(f'```python\n{src}\n```')
                for o in c.get('outputs', []):
                    txt = ''.join(o.get('text', '') or o.get('data', {}).get('text/plain', ''))
                    if txt.strip():
                        parts.append('```\n' + txt[:2000] + '\n```')
            else:
                parts.append(src)
        return '\n\n'.join(parts), ''
    if ext in ('.docx', '.pptx'):
        return office_text(p), ''
    if ext in ('.html', '.htm'):
        s = _Strip()
        s.feed(p.read_text(encoding='utf-8', errors='replace'))
        return re.sub(r'\n{3,}', '\n\n', ''.join(s.out)), ''
    if ext in ('.md', '.txt', '.py', '.tex', '.csv', '.json'):
        return p.read_text(encoding='utf-8', errors='replace'), ''
    if ext == '.djvu':
        if shutil.which('djvutxt'):
            r = subprocess.run(['djvutxt', str(p)], capture_output=True, text=True, timeout=300)
            return r.stdout, ''
        return '', 'djvu: нет djvutxt, конвертируй вручную'
    if ext == '.xlsx':
        return '', 'таблица: открой вручную'
    return '', ''


def office_text(p: Path) -> str:
    """docx — абзацы, pptx — слайды по порядку. Формулы Office (OMML) выйдут без разметки — сверяйся с файлом."""
    ns_w = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    ns_a = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
    with zipfile.ZipFile(p) as z:
        if p.suffix.lower() == '.docx':
            root = ElementTree.fromstring(z.read('word/document.xml'))
            paras = [''.join(t.text or '' for t in para.iter(f'{ns_w}t')) for para in root.iter(f'{ns_w}p')]
            return '\n'.join(paras)
        slides = sorted(
            (n for n in z.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', n)),
            key=lambda n: int(re.search(r'(\d+)', n.rsplit('/', 1)[1]).group(1)),
        )
        out = []
        for i, n in enumerate(slides, 1):
            root = ElementTree.fromstring(z.read(n))
            paras = [''.join(t.text or '' for t in para.iter(f'{ns_a}t')) for para in root.iter(f'{ns_a}p')]
            out.append(f'--- Слайд {i} ---\n' + '\n'.join(x for x in paras if x.strip()))
        return '\n\n'.join(out)


def cmd_extract(exam_id: str) -> None:
    base = WORK / exam_id
    raw, text = base / 'raw', base / 'text'
    if not raw.exists():
        sys.exit(f'Нет {raw}: сначала collect')
    text.mkdir(exist_ok=True)
    rows, images = [], []
    for p in sorted(walk(raw)):
        rel = p.relative_to(raw)
        ext = p.suffix.lower()
        if ext in IMG_EXT:
            images.append(rel)
            continue
        try:
            body, note = text_of(p)
        except Exception as e:  # битый файл не должен ронять опись
            body, note = '', f'не прочитался: {e.__class__.__name__}'
        pages = pdf_pages(p) if ext == '.pdf' else 0
        if ext == '.pdf' and pages and len(body.strip()) / pages < SCAN_CHARS_PER_PAGE:
            note = note or 'похоже на скан: читай через Read с pages'
        out = text / (str(rel).replace('/', '__') + '.txt')
        if body:
            out.write_text(body, encoding='utf-8')
        rows.append((kind_of(str(rel)), week_of(str(rel)), str(rel), pages, len(body), note, out.name if body else ''))

    order = {k: i for i, (k, _) in enumerate(KINDS)}
    rows.sort(key=lambda r: (order.get(r[0], 99), int(r[1]) if r[1] else 99, r[2]))
    lines = [
        f'# Материалы: {exam_id}',
        '',
        f'Папка: `{base}`. Текст — в `text/`, оригиналы — в `raw/`. Вид и неделя угаданы по имени файла — проверь.',
        'Порядок чтения: демо и список вопросов → объявления (картинки) → лонгриды/конспект → семинары и ДЗ → контрольные.',
        '',
        '| Вид | Неделя | Файл | Стр. | Символов | Текст | Заметка |',
        '|---|---|---|---|---|---|---|',
    ]
    for kind, week, rel, pages, chars, note, txt in rows:
        lines.append(f'| {kind} | {week} | {rel} | {pages or ""} | {chars} | {txt} | {note} |')
    if images:
        lines += ['', '## Картинки — посмотреть через Read', '', 'Часто это скриншоты объявлений: даты, баллы, формат.', '']
        lines += [f'- `raw/{r}`' for r in images]
    (base / 'INDEX.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')
    print(f'Опись: {base / "INDEX.md"} ({len(rows)} документов, {len(images)} картинок)')

    brief = base / 'brief.md'
    if not brief.exists():
        brief.write_text(BRIEF.format(id=exam_id), encoding='utf-8')
        print(f'Анкета: {brief}')


def cmd_collect(exam_id: str, args: list[str]) -> None:
    if not re.fullmatch(r'[a-z0-9]+(-[a-z0-9]+)*', exam_id):
        sys.exit('id экзамена — латиница в kebab-case: stat-kr1')
    raw = WORK / exam_id / 'raw'
    raw.mkdir(parents=True, exist_ok=True)
    n = 0
    for a in args:
        n += copy_in(resolve(a), raw)
    print(f'Скопировано: {n} → {raw}')
    cmd_extract(exam_id)


BRIEF = """# Анкета экзамена: {id}

Заполни по материалам. В столбце «Откуда» — файл или «спросить». Всё «спросить» — одним вопросом пользователю.
Если оставляем наше предположение — так и пишем на странице «Как устроено» («это наше предположение»).

| Что | Значение | Откуда |
|---|---|---|
| Предмет (`subject`) | | |
| Вид (`kind`) | | |
| Короткое название (`short`) | | |
| Даты и время (`dates`, `when`) | | |
| Формат и время (`format`) | | |
| Что можно с собой | | |
| Что входит (`scope`) | | |
| Уровни (основной / продвинутый) или цвет курса (`star`) | | |
| Состав билета или КР, баллы, потолок оценки | | |
| Допуск (сколько надо сдать, чтобы перейти дальше) | | |
| Апелляция / сдача работы | | |
| Список «что нужно уметь» (`skills`) | | |
| Задачи, которые лектор советовал повторить | | |
| Значок (`icon`): символ, которого ещё нет | | |

## Образец

mia-colloc / matan-colloc / pilot-colloc / linal-kr2 — и почему.

## Темы

Темы = лонгриды или главы конспекта. Для каждой: номер, название, что из неё в списке вопросов.

## Что ещё не ясно

-
"""


def main() -> None:
    if len(sys.argv) < 2 or sys.argv[1] in ('-h', '--help'):
        print(__doc__)
        return
    cmd, rest = sys.argv[1], sys.argv[2:]
    if cmd == 'find':
        cmd_find(rest)
    elif cmd == 'collect' and rest:
        cmd_collect(rest[0], rest[1:])
    elif cmd == 'extract' and rest:
        cmd_extract(rest[0])
    else:
        print(__doc__)
        sys.exit(1)


if __name__ == '__main__':
    main()
