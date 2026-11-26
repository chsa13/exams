import { md, type Topic } from '../../src/content/schema';

// Конспект, §1.8–1.10: асимптотика, предел последовательности, арифметика пределов, ограниченность.

export const asymptotics: Topic = {
  id: 'asymptotics',
  title: 'Асимптотика последовательностей',
  longread: 1,
  units: [
    {
      id: 'q-asymp-equiv',
      title: 'Асимптотическая эквивалентность',
      source: 'Конспект, §1.8.1, определение 1.8.1',
      definition: {
        level: 'basic',
        text: md`$a_n\sim b_n$ при $n\to\infty$, если отношение стремится к единице:
$$\forall\varepsilon>0\ \exists N\ \forall n\ge N:\ \Bigl|\frac{a_n}{b_n}-1\Bigr|<\varepsilon.$$
**Условие на $b_n$:** $b_n\ne0$ для всех достаточно больших $n$ — иначе отношение не определено.

**Относительная ошибка** — это $\dfrac{|a_n-b_n|}{|b_n|}=\Bigl|\dfrac{a_n}{b_n}-1\Bigr|$: какую долю от $b_n$ составляет погрешность. Эквивалентность означает, что относительная ошибка $\to0$; абсолютная $|a_n-b_n|$ при этом может даже расти.`,
      },
      notes: md`$\sqrt{n^2+10n}\sim n$: отношение $\sqrt{1+10/n}\to1$, хотя разность $\to5$.`,
      pitfalls: [
        'Эквивалентность — про отношение, а не про разность.',
        'Нельзя писать aₙ ∼ 0: делить на ноль нельзя.',
      ],
    },
    {
      id: 'q-big-o',
      title: 'O-символика',
      source: 'Конспект, §1.8.2, определение 1.8.2; список вопросов, вопрос 18',
      definition: {
        level: 'basic',
        text: md`$a_n=O(b_n)$ при $n\to\infty$ («растёт не быстрее $b_n$ с точностью до множителя»):
$$\exists C>0\ \ \exists N\ \ \forall n\ge N:\ |a_n|\le C\,|b_n|.$$
**Порядок кванторов:** сначала одна константа $C$ и один номер $N$, потом оценка для **всех** $n\ge N$. $C$ не зависит от $n$ — иначе условие выполнялось бы всегда ($C_n=|a_n|/|b_n|$).

**Для начальных номеров оценка не требуется** — только с некоторого $N$. (Если $b_n\ne0$ при всех $n$, её можно распространить на все номера, увеличив $C$: конечное число отношений $|a_n|/|b_n|$, $n<N$, ограничено.)`,
      },
      notes: md`$n^3-5n^2-10n+7=O(n^3)$: $|a_n|\le n^3+5n^3+10n^3+7n^3=23n^3$ при $n\ge1$.

$O(1)$ — ограниченность с некоторого номера (а значит, просто ограниченность).`,
      pitfalls: [
        md`$\exists C\ \exists N\ \forall n$, а не $\forall n\ \exists C$.`,
        'O даёт только оценку сверху: 1 = O(n), но n ≠ O(1).',
      ],
    },
    {
      id: 'q-small-o',
      title: 'o-символика',
      source: 'Конспект, §1.8.2, определение 1.8.3, наблюдение 1.17',
      definition: {
        level: 'basic',
        text: md`$a_n=o(b_n)$ при $n\to\infty$ («пренебрежимо мало по сравнению с $b_n$»):
$$\forall\varepsilon>0\ \ \exists N\ \ \forall n\ge N:\ |a_n|\le\varepsilon\,|b_n|.$$
Если $b_n\ne0$ для всех достаточно больших $n$, это равносильно $\displaystyle\lim_{n\to\infty}\frac{a_n}{b_n}=0$.

**Отличие от $O$:** в $O$ оценка с **некоторой** константой $C$, в $o$ — с **любой** $\varepsilon>0$ (после подходящего $N$). Поэтому $o(b_n)\Rightarrow O(b_n)$ (возьми $\varepsilon=1$), но не наоборот: $n=O(n)$, $n\ne o(n)$.`,
      },
      notes: md`$\dfrac1{n^2}=o\Bigl(\dfrac1n\Bigr)$; $o(1)$ — бесконечно малая.`,
      pitfalls: [
        'В o кванторы ∀ε ∃N, в O — ∃C ∃N.',
        'Равенство a = o(b) читается слева направо: «a принадлежит классу o(b)»; o(b) = a не пишут.',
      ],
    },
    {
      id: 'q-two-equivalences',
      title: 'Два смысла эквивалентности',
      source: 'Конспект, §1.6 и §1.8.1',
      definition: {
        level: 'basic',
        text: md`- **При построении $\mathbb R$:** $(a_n)\sim(b_n)\iff a_n-b_n\to0$ — мала **абсолютная** ошибка (последовательности задают одно число).
- **Асимптотическая:** $a_n\sim b_n\iff a_n/b_n\to1$ — мала **относительная** ошибка.

**$(1/n)$ и $(2/n)$:** $\dfrac2n-\dfrac1n=\dfrac1n\to0$ — это одно и то же действительное число ($0$). Но $\dfrac{2/n}{1/n}=2\not\to1$ — асимптотически они **не** эквивалентны.`,
      },
      notes: md`Обратный пример: $\sqrt{n^2+10n}\sim n$ асимптотически, но разность $\to5$, и к тому же эти последовательности не фундаментальны.`,
      pitfalls: ['Одно и то же слово «эквивалентность» — два разных отношения; на ответе уточни, какое.'],
    },
    {
      id: 'q-abs-rel-error',
      title: 'Абсолютная и относительная ошибки',
      source: 'Конспект, пример 1.19 и важное замечание после теоремы 1.8.1',
      definition: {
        level: 'basic',
        text: md`**Из $a_n\sim b_n$ не следует $a_n-b_n\to0$.** Пример: $a_n=\sqrt{n^2+10n}$, $b_n=n$. Отношение $\sqrt{1+10/n}\to1$, поэтому $a_n\sim b_n$, но
$$a_n-b_n=\frac{10n}{\sqrt{n^2+10n}+n}=\frac{10}{\sqrt{1+10/n}+1}\to5.$$
Относительная ошибка мала, абсолютная — нет.

**Заменять эквивалентными при сложении и вычитании нельзя:** $n^2+n\sim n^2$ и $n^2\sim n^2$, но $(n^2+n)-n^2=n$, а «после замены» получилось бы $n^2-n^2=0$. Эквивалентность гарантирует малость ошибки относительно $b_n$, а при вычитании главные части сокращаются, и остаётся как раз то, что мы потеряли.`,
      },
      notes: md`В произведениях и частных замена допустима: если $a_n\sim a'_n$, то $\dfrac{a_n}{c_n}\sim\dfrac{a'_n}{c_n}$ и $a_nc_n\sim a'_nc_n$.`,
      pitfalls: ['Разность эквивалентных последовательностей может быть сколь угодно большой — она мала только по сравнению с ними самими.'],
    },
    {
      id: 'q-pnt',
      title: 'Асимптотика в теории чисел',
      source: 'Конспект, пример 1.20',
      definition: {
        level: 'basic',
        text: md`$\pi(n)$ — количество простых чисел $\le n$. Формула $\pi(n)\sim\dfrac n{\log n}$ (теорема о распределении простых чисел, без доказательства) означает
$$\frac{\pi(n)}{n/\log n}\to1.$$
Она говорит об **относительной** погрешности: $\dfrac{|\pi(n)-n/\log n|}{n/\log n}\to0$. Абсолютная погрешность $|\pi(n)-n/\log n|$ может быть большой и расти.

Если число выбирают равновероятно из $\{1,\dots,n\}$, вероятность, что оно простое, равна $\dfrac{\pi(n)}n\sim\dfrac1{\log n}$. Например, около $10^6$ это примерно $1/13{,}8\approx7\%$.`,
      },
      notes: md`$\log$ — натуральный логарифм. $\pi(10)=4$, $\pi(100)=25$.`,
      pitfalls: ['∼ не значит «приблизительно равно в абсолютном смысле»: π(n) и n / log n могут отличаться на тысячи.'],
    },
    {
      id: 't-asymp-links',
      title: 'Связь асимптотических обозначений',
      source: 'Конспект, теорема 1.8.1 и важное замечание к определению 1.8.3',
      statement: {
        level: 'basic',
        text: md`Пусть $b_n\ne0$ для всех достаточно больших $n$. Тогда
$$a_n\sim b_n\iff a_n-b_n=o(b_n).$$
Кроме того, $a_n\sim b_n\Rightarrow a_n=O(b_n)$ и $a_n=o(b_n)\Rightarrow a_n=O(b_n)$. Обратные утверждения к последним двум неверны.`,
      },
      proof: {
        level: 'basic',
        idea: md`Всё следует из равенства $\Bigl|\dfrac{a_n}{b_n}-1\Bigr|=\dfrac{|a_n-b_n|}{|b_n|}$ и выбора $\varepsilon=1$.`,
        steps: [
          {
            title: 'Ключевое равенство',
            body: md`При $b_n\ne0$: $\Bigl|\dfrac{a_n}{b_n}-1\Bigr|=\dfrac{|a_n-b_n|}{|b_n|}$, поэтому $\Bigl|\dfrac{a_n}{b_n}-1\Bigr|\le\varepsilon\iff|a_n-b_n|\le\varepsilon|b_n|$.`,
          },
          {
            title: md`$\sim\ \iff$ разность $=o(b_n)$`,
            body: md`Условие «$\forall\varepsilon\ \exists N\ \forall n\ge N$» для левой части равносильно тому же для правой (берём $N$ не меньше номера, с которого $b_n\ne0$). Строгое или нестрогое $\le\varepsilon$ — неважно: «$<\varepsilon$ для всех $\varepsilon$» и «$\le\varepsilon$ для всех $\varepsilon$» равносильны (возьми $\varepsilon/2$).`,
          },
          {
            title: md`$\sim\ \Rightarrow O$: $\varepsilon=1$`,
            body: md`С некоторого $N$: $\Bigl|\dfrac{a_n}{b_n}-1\Bigr|<1$, откуда $\Bigl|\dfrac{a_n}{b_n}\Bigr|<2$, т. е. $|a_n|\le2|b_n|$. Это $O(b_n)$ с $C=2$.`,
          },
          {
            title: md`$o\Rightarrow O$: $\varepsilon=1$`,
            body: md`Из определения $o$ при $\varepsilon=1$: $|a_n|\le1\cdot|b_n|$ с некоторого $N$ — это $O(b_n)$ с $C=1$.`,
          },
          {
            title: 'Обратное неверно',
            body: md`$a_n=2n$, $b_n=n$: $a_n=O(b_n)$ ($C=2$), но $a_n/b_n=2\not\to1$, т. е. $a_n\not\sim b_n$. $a_n=b_n=n$: $n=O(n)$, но $n\ne o(n)$ — отношение $1$ не меньше $\varepsilon=\frac12$. $\blacksquare$`,
          },
        ],
      },
      pitfalls: [
        'Условие bₙ ≠ 0 с некоторого номера нужно только там, где делим на bₙ.',
        'Контрпримеры обязательны: в вопросе прямо просят показать, что обратное неверно.',
      ],
    },
    {
      id: 't-asymp-examples',
      title: 'Примеры асимптотического сравнения из лекции',
      source: 'Конспект, примеры 1.19, 1.21, 1.23, 1.24',
      statement: {
        level: 'basic',
        text: md`$$\sqrt{n^2+10n}\sim n,\qquad\lim_{n\to\infty}\bigl(\sqrt{n^2+10n}-n\bigr)=5,$$
$$n^3-5n^2-10n+7=n^3+o(n^3)\sim n^3,$$
с явными оценками для всех достаточно больших номеров.`,
      },
      proof: {
        level: 'basic',
        idea: md`Обозначим $s_n=\sqrt{1+10/n}$ и оценим $s_n-1$ через сопряжённое; младшие слагаемые многочлена оцениваем через $n^2$.`,
        steps: [
          {
            title: md`Оценка $s_n-1$`,
            body: md`$s_n=\sqrt{1+10/n}\ge1$ и $s_n-1=\dfrac{s_n^2-1}{s_n+1}=\dfrac{10/n}{s_n+1}\le\dfrac5n$.`,
          },
          {
            title: md`$\sqrt{n^2+10n}\sim n$`,
            body: md`$\Bigl|\dfrac{\sqrt{n^2+10n}}n-1\Bigr|=s_n-1\le\dfrac5n<\varepsilon$ при $n>\dfrac5\varepsilon$.`,
          },
          {
            title: md`Разность $\to5$`,
            body: md`$\sqrt{n^2+10n}-n=\dfrac{10n}{\sqrt{n^2+10n}+n}=\dfrac{10}{s_n+1}$, и
$$\Bigl|\frac{10}{s_n+1}-5\Bigr|=\frac{5(s_n-1)}{s_n+1}\le\frac52(s_n-1)\le\frac{25}{2n}<\varepsilon\ \text{ при }n>\frac{25}{2\varepsilon}.$$`,
          },
          {
            title: md`Остаток многочлена $=o(n^3)$`,
            body: md`$r_n=-5n^2-10n+7$, $|r_n|\le5n^2+10n^2+7n^2=22n^2$ при $n\ge1$. Значит, $|r_n|\le\varepsilon n^3$ при $n\ge\dfrac{22}\varepsilon$, т. е. $r_n=o(n^3)$ и $n^3-5n^2-10n+7=n^3+o(n^3)$.`,
          },
          {
            title: md`Отсюда $\sim n^3$`,
            body: md`По связи обозначений ($n^3\ne0$): $a_n-n^3=o(n^3)\iff a_n\sim n^3$. Явно: $\Bigl|\dfrac{a_n}{n^3}-1\Bigr|=\dfrac{|r_n|}{n^3}\le\dfrac{22}n<\varepsilon$ при $n>\dfrac{22}\varepsilon$. $\blacksquare$`,
          },
        ],
      },
      uses: ['t-asymp-links'],
      pitfalls: [
        'Нужны явные оценки «для всех n ≥ N», а не только «главный член — n³».',
        md`При оценке $|r_n|$ модуль суммы оценивается суммой модулей: $|-5n^2-10n+7|\le5n^2+10n+7$.`,
      ],
    },
  ],
};

export const seqLimit: Topic = {
  id: 'seq-limit',
  title: 'Предел последовательности',
  longread: 1,
  units: [
    {
      id: 'q-seq-limit',
      title: 'Предел последовательности',
      source: 'Конспект, §1.8.3, определение 1.8.4',
      definition: {
        level: 'basic',
        text: md`$x_n\to a$ (конечный предел), если
$$\forall\varepsilon>0\ \ \exists N\ \ \forall n\ge N:\ |x_n-a|<\varepsilon.$$
**Геометрически:** какой бы интервал $(a-\varepsilon;a+\varepsilon)$ ни взять, все члены, начиная с некоторого номера, лежат в нём; вне интервала — лишь конечное число членов.

**Связь с асимптотикой:** $x_n\to a\iff x_n=a+o(1)$ (т. е. $x_n-a=o(1)$). При $a\ne0$ это равносильно $x_n\sim a$: $\Bigl|\dfrac{x_n}a-1\Bigr|<\varepsilon\iff|x_n-a|<\varepsilon|a|$.

**$x_n\sim0$ не пишут:** эквивалентность требует деления на $b_n=0$; стремление к нулю записывают как $x_n=o(1)$.`,
      },
      notes: md`Пример: $\dfrac{2n}{n+3}\to2$, так как $\Bigl|\dfrac{2n}{n+3}-2\Bigr|=\dfrac6{n+3}<\varepsilon$ при $n>\dfrac6\varepsilon$.`,
      pitfalls: [
        'N зависит от ε, но не от n.',
        'Предел — один для всех ε; «для каждого ε своё a» — не сходимость.',
      ],
    },
    {
      id: 'q-limit-negation',
      title: 'Отрицание сходимости',
      source: 'Конспект, §1.8.3, пример 1.25, примеры 1.29–1.30',
      definition: {
        level: 'basic',
        text: md`**Данное число $a$ не является пределом:**
$$\exists\varepsilon>0\ \ \forall N\ \ \exists n\ge N:\ |x_n-a|\ge\varepsilon$$
— есть интервал вокруг $a$, вне которого бесконечно много членов.

**У последовательности нет конечного предела** (никакое число не предел):
$$\forall a\in\mathbb R\ \ \exists\varepsilon>0\ \ \forall N\ \ \exists n\ge N:\ |x_n-a|\ge\varepsilon.$$
Разница — в кванторе по $a$: первое утверждение про одно число, второе — про все. $\dfrac1n$: число $1$ не предел, но сама последовательность сходится (к $0$).`,
      },
      notes: md`$(-1)^n$ не имеет предела: для любого $a$ хотя бы одно из чисел $\pm1$ удалено от $a$ не меньше чем на $1$, и оно встречается бесконечно часто — $\varepsilon=1$.`,
      pitfalls: ['Отрицание «∀n ≥ N» — «∃n ≥ N», а не «∀n < N».', 'Не путай «a — не предел» с «предела нет».'],
    },
    {
      id: 'q-infinitesimal-bounded',
      title: 'Бесконечно малые и ограниченные последовательности',
      source: 'Конспект, определения 1.8.5, 1.10.3',
      definition: {
        level: 'basic',
        text: md`- **Бесконечно малая:** $x_n\to0$, т. е. $\forall\varepsilon>0\ \exists N\ \forall n\ge N\ |x_n|<\varepsilon$. Запись: $x_n=o(1)$.
- **Ограниченная:** $\exists C\ \forall n\ |x_n|\le C$ (эквивалентно: $\exists A,B:\ A\le x_n\le B$). Запись $x_n=O(1)$ значит $|x_n|\le C$ с некоторого номера — для последовательности это то же самое, ведь конечное число первых членов ограничено.

**Всякая ли ограниченная последовательность сходится?** Нет: $(-1)^n$ ограничена ($|x_n|\le1$), но предела не имеет. Обратное верно: сходящаяся ограничена.`,
      },
      notes: md`$o(1)$ говорит только «стремится к нулю», без скорости; $x_n\sim\frac1n$ уже даёт скорость.`,
      pitfalls: ['Ограниченность не влечёт сходимость; сходимость влечёт ограниченность.', 'O(1) — не «стремится к константе», а «ограничена».'],
    },
    {
      id: 'q-tail',
      title: 'Начальные значения и хвост последовательности',
      source: 'Конспект, пример 1.46, важное замечание к предложению 4.2.14',
      definition: {
        level: 'basic',
        text: md`Если изменить конечное число членов, **не меняются** ни сходимость, ни предел, ни асимптотические соотношения ($\sim$, $O$, $o$).

Причина: все эти определения содержат условие «для всех $n\ge N$». Если изменены только члены с номерами $<N_0$, достаточно брать $N\ge N_0$ — дальше старая и новая последовательности совпадают.

Поэтому в формулировках достаточно условий «для всех достаточно больших $n$»: например, $a_n\le b_n$ при $n\ge N_0$ в переходе к пределу в неравенствах или $b_n\ne0$ с некоторого номера в пределе частного.`,
      },
      notes: md`В топологических терминах: окрестности точки $+\infty$ в $\mathbb N\cup\{+\infty\}$ — это хвосты $\{n>N\}\cup\{+\infty\}$; конечный набор начальных номеров в них не обязан входить.`,
      pitfalls: ['Ограниченность тоже не зависит от начальных членов, но ограничивающая константа — зависит.'],
    },
    {
      id: 't-limit-remainder',
      title: 'Предел и бесконечно малый остаток',
      source: 'Конспект, предложение 1.8.2, §1.8.3',
      statement: {
        level: 'basic',
        text: md`$$x_n\to a\iff x_n-a\to0\iff x_n=a+o(1).$$
При $a\ne0$ эти условия равносильны $x_n\sim a$. Условие $a\ne0$ необходимо.`,
      },
      proof: {
        level: 'basic',
        idea: md`Все условия — одно и то же неравенство $|x_n-a|<\varepsilon$, записанное по-разному; для $\sim$ меняем $\varepsilon$ на $\varepsilon|a|$.`,
        steps: [
          {
            title: md`$x_n\to a\iff x_n-a\to0$`,
            body: md`$|x_n-a|=|(x_n-a)-0|$: определения совпадают дословно, с теми же $\varepsilon$ и $N$.`,
          },
          {
            title: md`$x_n-a\to0\iff x_n-a=o(1)$`,
            body: md`$o(1)$: $\forall\varepsilon\ \exists N\ \forall n\ge N\ |x_n-a|\le\varepsilon\cdot1$. Отличие от предела — только $\le$ вместо $<$, а «$\le\varepsilon$ для всех $\varepsilon$» равносильно «$<\varepsilon$ для всех $\varepsilon$» (применяем к $\varepsilon/2$).`,
          },
          {
            title: md`При $a\ne0$: $\sim a$`,
            body: md`$\Bigl|\dfrac{x_n}a-1\Bigr|<\varepsilon\iff|x_n-a|<\varepsilon|a|$. Когда $\varepsilon$ пробегает все положительные числа, $\varepsilon|a|$ тоже пробегает все положительные числа, поэтому $x_n\sim a\iff x_n\to a$.`,
          },
          {
            title: md`Зачем $a\ne0$`,
            body: md`При $a=0$ отношение $x_n/a$ не определено, т. е. $x_n\sim0$ не имеет смысла (а записи вроде $\dfrac{x_n}{x_n}\to1$ не то же самое). Стремление к нулю выражается только как $x_n=o(1)$. $\blacksquare$`,
          },
        ],
      },
      pitfalls: ['Не забудь объяснить, почему нужно a ≠ 0, — это часть вопроса.'],
    },
    {
      id: 't-separation',
      title: 'Отделимость от нуля',
      source: 'Конспект, теорема 1.8.3',
      statement: {
        level: 'basic',
        text: md`Если $x_n\to x_0>0$, то $x_n>\dfrac{x_0}2>0$ для всех достаточно больших $n$. Следствие: если $x_n\to x_0\ne0$, то $|x_n|>\dfrac{|x_0|}2$ для всех достаточно больших $n$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Берём $\varepsilon=x_0/2$ (соответственно $|x_0|/2$) в определении предела.`,
        steps: [
          {
            title: md`$\varepsilon=\dfrac{x_0}2$`,
            body: md`$x_0>0$, значит $\varepsilon>0$, и $\exists N\ \forall n\ge N:\ |x_n-x_0|<\dfrac{x_0}2$.`,
          },
          { title: 'Раскрываем модуль', body: md`$x_0-\dfrac{x_0}2<x_n$, т. е. $x_n>\dfrac{x_0}2>0$.` },
          {
            title: md`Случай $x_0\ne0$`,
            body: md`$\varepsilon=\dfrac{|x_0|}2>0$, и при $n\ge N$: $|x_n|\ge|x_0|-|x_n-x_0|>|x_0|-\dfrac{|x_0|}2=\dfrac{|x_0|}2$. (Неравенство треугольника: $|x_0|\le|x_n|+|x_0-x_n|$.) $\blacksquare$`,
          },
        ],
      },
      pitfalls: [
        'Вывод только для достаточно больших n: первые члены могут быть любыми, даже нулями.',
        md`Для $x_0<0$ получаем $x_n<x_0/2<0$ — знак сохраняется.`,
      ],
    },
    {
      id: 't-unique-limit',
      title: 'Единственность предела',
      source: 'Конспект, теорема 1.8.4',
      statement: {
        level: 'basic',
        text: md`Если числовая последовательность имеет предел в $\mathbb R$, то он единственен.`,
      },
      proof: {
        level: 'basic',
        idea: md`Если $x_n\to a$ и $x_n\to b\ne a$, то с некоторого номера $x_n$ ближе $\varepsilon=|a-b|/3$ к обоим — тогда $|a-b|<2\varepsilon$.`,
        steps: [
          { title: 'От противного', body: md`Пусть $x_n\to a$, $x_n\to b$, $a\ne b$. Положим $\varepsilon=\dfrac{|a-b|}3>0$.` },
          {
            title: md`$N=\max(N_1,N_2)$`,
            body: md`$\exists N_1:\ n\ge N_1\Rightarrow|x_n-a|<\varepsilon$; $\exists N_2:\ n\ge N_2\Rightarrow|x_n-b|<\varepsilon$. Возьмём $n=\max(N_1,N_2)$.`,
          },
          {
            title: 'Неравенство треугольника',
            body: md`$|a-b|\le|a-x_n|+|x_n-b|<2\varepsilon=\dfrac23|a-b|$ — противоречие, так как $|a-b|>0$. $\blacksquare$`,
          },
        ],
      },
      notes: md`В «прямой с удвоенным нулём» (склеить две копии $\mathbb R$ по всем точкам, кроме $0$) последовательность $1/n$ имеет два предела — единственность опирается на то, что у разных точек прямой есть непересекающиеся окрестности.`,
      pitfalls: ['ε нужно выбрать конкретно (например, |a − b| / 3), а не «достаточно малое».'],
    },
    {
      id: 't-limit-arith',
      title: 'Арифметика пределов',
      source: 'Конспект, §1.9.1, предложения 1.9.1, 1.9.3, лемма 1.9.2, теорема 1.9.4',
      statement: {
        level: 'basic',
        text: md`Пусть $a_n\to a$, $b_n\to b$. Тогда
- (a) $a_n+c\to a+c$ и $ca_n\to ca$ для каждого $c\in\mathbb R$;
- (b) $a_n+b_n\to a+b$;
- (c) $a_nb_n\to ab$;
- (d) если $b\ne0$, то $b_n\ne0$ для всех достаточно больших $n$, и на этом хвосте $\dfrac{a_n}{b_n}\to\dfrac ab$.

Отбросить конечное число начальных номеров в (d) допустимо: от них не зависят ни сходимость, ни предел.`,
      },
      proof: {
        level: 'basic',
        idea: md`Каждую разность с пределом оцениваем через $|a_n-a|$ и $|b_n-b|$: $\varepsilon/2$ для суммы, ограниченность для произведения, отделимость от нуля для частного.`,
        steps: [
          {
            title: '(a) Сдвиг и множитель',
            body: md`$|(a_n+c)-(a+c)|=|a_n-a|$ — то же $N$. Для $c\ne0$: $|ca_n-ca|=|c|\,|a_n-a|<\varepsilon$, если $|a_n-a|<\varepsilon/|c|$; при $c=0$ всё постоянно.`,
          },
          {
            title: md`(b) Сумма: $\varepsilon/2$`,
            body: md`$N_1,N_2$ для $\varepsilon/2$; при $n\ge\max(N_1,N_2)$: $|a_n+b_n-a-b|\le|a_n-a|+|b_n-b|<\varepsilon$.`,
          },
          {
            title: '(c) Произведение: разложение',
            body: md`$a_nb_n-ab=(a_n-a)\,b_n+a\,(b_n-b)$. Сходящаяся $(b_n)$ ограничена: $|b_n|\le M$, $M>0$.`,
          },
          {
            title: '(c) Оценка',
            body: md`При $n\ge N$, где $|a_n-a|<\dfrac\varepsilon{2M}$ и $|b_n-b|<\dfrac\varepsilon{2(|a|+1)}$:
$$|a_nb_n-ab|\le M|a_n-a|+|a|\,|b_n-b|<\tfrac\varepsilon2+\tfrac\varepsilon2=\varepsilon.$$`,
          },
          {
            title: md`(d) $b_n$ отделены от нуля`,
            body: md`По отделимости от нуля $\exists N_0:\ n\ge N_0\Rightarrow|b_n|>\dfrac{|b|}2>0$; в частности, $b_n\ne0$, и $\dfrac{a_n}{b_n}$ определено на хвосте $n\ge N_0$.`,
          },
          {
            title: md`(d) $\dfrac1{b_n}\to\dfrac1b$`,
            body: md`При $n\ge N_0$: $\Bigl|\dfrac1{b_n}-\dfrac1b\Bigr|=\dfrac{|b-b_n|}{|b_n|\,|b|}\le\dfrac2{b^2}|b_n-b|<\varepsilon$, как только $|b_n-b|<\dfrac{b^2\varepsilon}2$. Тогда $\dfrac{a_n}{b_n}=a_n\cdot\dfrac1{b_n}\to a\cdot\dfrac1b$ по (c). $\blacksquare$`,
          },
        ],
      },
      uses: ['t-convergent-bounded', 't-separation'],
      pitfalls: [
        'Все теоремы требуют, чтобы оба предела существовали: aₙ = n + 1, bₙ = n расходятся, а aₙ − bₙ = 1 сходится.',
        'В (d) b ≠ 0 — условие на предел; отдельные bₙ в начале могут быть нулями, их отбрасываем.',
      ],
    },
    {
      id: 't-squeeze',
      title: 'Лемма о зажатой последовательности',
      source: 'Конспект, лемма 1.9.5, пример 1.32',
      statement: {
        level: 'basic',
        text: md`Если $a_n\le b_n\le c_n$ для всех достаточно больших $n$ и $a_n\to a$, $c_n\to a$, то $b_n\to a$. Как следствие (с биномом Ньютона): $\displaystyle\lim_{n\to\infty}\sqrt[n]n=1$.`,
      },
      proof: {
        level: 'basic',
        idea: md`С некоторого номера $a_n$ и $c_n$ в $(a-\varepsilon;a+\varepsilon)$, а $b_n$ между ними. Для $\sqrt[n]n=1+d_n$ бином даёт $n\ge\frac{n(n-1)}2d_n^2$, т. е. $0\le d_n\le\sqrt{2/n}$.`,
        steps: [
          {
            title: 'Три номера',
            body: md`$N_0$ — с него $a_n\le b_n\le c_n$; $N_1$: $|a_n-a|<\varepsilon$; $N_2$: $|c_n-a|<\varepsilon$. Пусть $N=\max(N_0,N_1,N_2)$.`,
          },
          {
            title: 'Зажимаем',
            body: md`При $n\ge N$: $a-\varepsilon<a_n\le b_n\le c_n<a+\varepsilon$, т. е. $|b_n-a|<\varepsilon$. Значит, $b_n\to a$.`,
          },
          {
            title: md`$\sqrt[n]n=1+d_n$, $d_n\ge0$`,
            body: md`При $n\ge1$: $\sqrt[n]n\ge1$ (иначе $n=(\sqrt[n]n)^n<1$). Положим $d_n=\sqrt[n]n-1\ge0$, тогда $n=(1+d_n)^n$.`,
          },
          {
            title: 'Бином Ньютона',
            body: md`Все слагаемые $(1+d_n)^n=\sum_k\binom nkd_n^k$ неотрицательны, поэтому при $n\ge2$: $n\ge\binom n2d_n^2=\dfrac{n(n-1)}2d_n^2$, откуда $d_n^2\le\dfrac2{n-1}$ и $0\le d_n\le\sqrt{\dfrac2{n-1}}$.`,
          },
          {
            title: 'Зажатие',
            body: md`$\sqrt{\dfrac2{n-1}}\to0$: $<\varepsilon$ при $n>1+\dfrac2{\varepsilon^2}$. По лемме $d_n\to0$, т. е. $\sqrt[n]n\to1$. $\blacksquare$`,
          },
        ],
      },
      pitfalls: [
        'Существование lim bₙ — вывод леммы, а не условие.',
        'Пределы крайних последовательностей должны совпадать.',
        'В биноме оставляем именно слагаемое с d², а не с d: из n ≥ 1 + n·d получится лишь d ≤ 1.',
      ],
    },
    {
      id: 't-limit-ineq',
      title: 'Переход к пределу в неравенствах',
      source: 'Конспект, лемма 1.9.6',
      statement: {
        level: 'basic',
        text: md`Если $a_n\le b_n$ для всех достаточно больших $n$, $a_n\to a$, $b_n\to b$, то $a\le b$. Из $a_n<b_n$ нельзя заключить $a<b$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Если $a>b$, то с некоторого номера $a_n$ ближе к $a$, а $b_n$ — к $b$, чем середина $\frac{a+b}2$, и $a_n>b_n$.`,
        steps: [
          { title: 'От противного', body: md`Пусть $a>b$; положим $\varepsilon=\dfrac{a-b}2>0$.` },
          {
            title: 'Номера',
            body: md`$\exists N$ (максимум из трёх номеров): при $n\ge N$ одновременно $a_n\le b_n$, $|a_n-a|<\varepsilon$, $|b_n-b|<\varepsilon$.`,
          },
          {
            title: 'Противоречие',
            body: md`$a_n>a-\varepsilon=\dfrac{a+b}2=b+\varepsilon>b_n$, т. е. $a_n>b_n$ — противоречие с $a_n\le b_n$.`,
          },
          {
            title: 'Строгое не сохраняется',
            body: md`$a_n=0<\dfrac1n=b_n$ при всех $n$, но $\lim a_n=\lim b_n=0$. $\blacksquare$`,
          },
        ],
      },
      pitfalls: ['Существование пределов — условие теоремы.', 'Строгое неравенство после перехода к пределу становится нестрогим.'],
    },
    {
      id: 't-convergent-bounded',
      title: 'Ограниченность сходящейся последовательности',
      source: 'Конспект, лемма 1.10.3',
      statement: {
        level: 'basic',
        text: md`Каждая сходящаяся числовая последовательность ограничена.`,
      },
      proof: {
        level: 'basic',
        idea: md`Хвост лежит в $(a-1;a+1)$, а начальных членов конечное число — берём максимум.`,
        steps: [
          { title: md`$\varepsilon=1$`, body: md`$x_n\to a$, поэтому $\exists N\ \forall n\ge N:\ |x_n-a|<1$, и тогда $|x_n|<|a|+1$.` },
          {
            title: 'Начальные члены',
            body: md`Членов $x_1,\dots,x_{N-1}$ конечное число. Положим $C=\max\{|x_1|,\dots,|x_{N-1}|,\ |a|+1\}$.`,
          },
          { title: 'Итог', body: md`$|x_n|\le C$ при всех $n\ge1$. $\blacksquare$` },
        ],
      },
      pitfalls: ['Без учёта первых N − 1 членов оценка верна только на хвосте.', 'Обратное неверно: (−1)ⁿ ограничена, но не сходится.'],
    },
  ],
};
