import { md, type Topic } from '../../src/content/schema';

export const sequences: Topic = {
  id: 'sequences',
  title: 'Последовательности',
  longread: 6,
  units: [
    {
      id: 'bounded-seq',
      title: 'Ограниченная (сверху, снизу) последовательность',
      source: 'Лонгрид 6, определения 2, 3',
      definition: {
        level: 'basic',
        text: md`Последовательность $\{x_n\}$ называется
- **ограниченной сверху**, если $\exists\, C\in\mathbb R:\ \forall n\in\mathbb N\ \ x_n\le C$;
- **ограниченной снизу**, если $\exists\, C\in\mathbb R:\ \forall n\in\mathbb N\ \ x_n\ge C$;
- **ограниченной**, если она ограничена и сверху, и снизу.

Эквивалентно (опр. 3): $\{x_n\}$ ограничена, если $\exists\, C>0:\ \forall n\in\mathbb N\ \ |x_n|\le C$.`,
      },
      pitfalls: ['Порядок кванторов: сначала ∃C, потом ∀n. «∀n ∃C» верно для любой последовательности.'],
    },
    {
      id: 'sup-seq',
      title: 'Точная верхняя грань последовательности',
      source: 'Лонгрид 6, определение 4',
      pitfalls: ['Во втором условии член должен быть строго больше любого M′ < M. Без этого условия любое число больше M тоже было бы «sup».', 'sup не обязан быть членом: у xₙ = 1 − 1/n sup = 1, но все xₙ < 1.'],
      definition: {
        level: 'basic',
        text: md`Точная верхняя грань последовательности — точная верхняя грань множества её значений:
$$\sup\{x_n\}=M\in\mathbb R\iff\begin{cases}\forall n\in\mathbb N\ \ x_n\le M,\\ \forall M'<M\ \ \exists\, n\in\mathbb N:\ x_n>M'.\end{cases}$$
Первое условие: $M$ — верхняя грань; второе: любое меньшее число — уже не верхняя грань.`,
      },
      notes: md`Второе условие равносильно: $\forall\varepsilon>0\ \exists n:\ x_n>M-\varepsilon$. Аналогично $\inf\{x_n\}=m\iff \forall n\ x_n\ge m$ и $\forall m'>m\ \exists n:\ x_n<m'$.`,
    },
    {
      id: 'monotone-seq',
      title: 'Монотонные последовательности',
      source: 'Лонгрид 6, определения 5, 6',
      pitfalls: ['«Возрастающая» в курсе — нестрого: xₙ ≤ xₙ₊₁. Строго — xₙ < xₙ₊₁.', 'Отрицание «монотонна»: ∃n xₙ > xₙ₊₁ и одновременно ∃m xₘ < xₘ₊₁.'],
      definition: {
        level: 'basic',
        text: md`Последовательность $\{x_n\}$ называется
- **возрастающей**, если $\forall n\in\mathbb N\ \ x_n\le x_{n+1}$; **строго возрастающей**, если $\forall n\ \ x_n<x_{n+1}$;
- **убывающей**, если $\forall n\ \ x_n\ge x_{n+1}$; **строго убывающей**, если $\forall n\ \ x_n>x_{n+1}$;
- **монотонной**, если она возрастающая или убывающая (строго монотонной — если строго возрастающая или строго убывающая).`,
      },
      notes: md`В курсе «возрастающая» — нестрого. Строго возрастающая — частный случай возрастающей.`,
    },
  ],
};

export const seqLimit1: Topic = {
  id: 'seq-limit-1',
  title: 'Предел последовательности. Часть 1',
  longread: 9,
  units: [
    {
      id: 'seq-limit-def',
      title: 'Предел последовательности',
      source: 'Лонгрид 9, определения 3, 4',
      definition: {
        level: 'basic',
        text: md`Число $a\in\mathbb R$ называется **пределом последовательности** $\{x_n\}$, $\lim\limits_{n\to\infty}x_n=a$, если
$$\forall\varepsilon>0\ \ \exists N\in\mathbb N:\ \forall n\ge N\ \ |x_n-a|<\varepsilon.$$
Через окрестности: $\forall\varepsilon>0\ \exists N\in\mathbb N:\ \forall n\ge N\ \ x_n\in U_\varepsilon(a)$.`,
      },
      notes: md`Смысл: в любую окрестность $a$ попадает весь «хвост» последовательности; снаружи остаётся лишь конечное число начальных членов.`,
      pitfalls: ['N зависит от ε — поэтому ∃N стоит после ∀ε.', 'Неравенство |xₙ − a| < ε — строгое, ε > 0 — строго.'],
    },
    {
      id: 'infinitesimal',
      title: 'Бесконечно малая последовательность',
      source: 'Лонгрид 9, определение 13',
      pitfalls: ['Бесконечно малая — это последовательность, а не «очень маленькое число»: ни одно число ε > 0 не бесконечно малое.'],
      definition: {
        level: 'basic',
        text: md`Последовательность $\{x_n\}$ называется **бесконечно малой**, если $\lim\limits_{n\to\infty}x_n=0$, то есть
$$\forall\varepsilon>0\ \ \exists N:\ \forall n\ge N\ \ |x_n|<\varepsilon.$$`,
      },
    },
    {
      id: 'infinitely-large',
      title: 'Бесконечно большая последовательность',
      source: 'Лонгрид 9, определение 7',
      definition: {
        level: 'basic',
        text: md`$\lim\limits_{n\to\infty}x_n=\infty$, если $\forall M>0\ \exists N:\ \forall n\ge N\ \ |x_n|>M$. Последовательность, имеющая бесконечный предел, называется **бесконечно большой**.

Аналогично: $\lim x_n=+\infty$, если $\forall M>0\ \exists N:\ \forall n\ge N\ \ x_n>M$; $\;\lim x_n=-\infty$, если $\forall M>0\ \exists N:\ \forall n\ge N\ \ x_n<-M$.`,
      },
      pitfalls: ['Бесконечно большая ≠ неограниченная: xₙ = n·(1+(−1)ⁿ) не ограничена, но не бесконечно большая.'],
    },
    {
      id: 'convergent',
      title: 'Сходящаяся и расходящаяся последовательности',
      source: 'Лонгрид 9, определение 12',
      pitfalls: ['Сходящаяся — только с конечным пределом. У xₙ = n предел +∞ есть, но она расходится.'],
      definition: {
        level: 'basic',
        text: md`Последовательность называется **сходящейся**, если она имеет **конечный** предел, и **расходящейся**, если конечного предела у неё нет.`,
      },
      notes: md`Бесконечно большая последовательность — расходящаяся.`,
    },
    {
      id: 'lemma-disjoint-nbhd',
      title: 'Лемма о непересекающихся окрестностях',
      source: 'Лонгрид 9, лемма 2',
      aux: true,
      pitfalls: ['Надо разобрать и случаи с ±∞, а не только два числа.', 'Ссылка на рисунок — не доказательство: нужен явный радиус ε₀ = (b − a)/2.'],
      statement: {
        level: 'basic',
        text: md`Если $a,b\in\overline{\mathbb R}$, $a<b$, то у них есть окрестности $U(a)$ и $U(b)$, которые не пересекаются, причём каждая точка $U(a)$ меньше каждой точки $U(b)$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Для двух чисел — радиус в половину расстояния; если есть бесконечность — явные интервалы.`,
        steps: [
          {
            title: md`Оба числа конечны`,
            body: md`$\varepsilon_0=\frac{b-a}2>0$. Тогда $U_{\varepsilon_0}(a)=(a-\varepsilon_0;\,a+\varepsilon_0)$, $U_{\varepsilon_0}(b)=(b-\varepsilon_0;\,b+\varepsilon_0)$ и $a+\varepsilon_0=b-\varepsilon_0$: правый конец первой равен левому концу второй, интервалы открытые, поэтому любая точка первой меньше любой точки второй.`,
          },
          {
            title: md`$a\in\mathbb R$, $b=+\infty$`,
            body: md`Подходят $(a-1;\,a+1)$ и $(a+1;\,+\infty)$. Случай $a=-\infty$, $b\in\mathbb R$ симметричен: $(-\infty;\,b-1)$ и $(b-1;\,b+1)$.`,
          },
          {
            title: md`$a=-\infty$, $b=+\infty$`,
            body: md`Подходят $(-\infty;\,-1)$ и $(1;\,+\infty)$. $\blacksquare$`,
          },
        ],
      },
    },
    {
      id: 'limit-unique',
      title: 'Теорема о единственности предела последовательности',
      source: 'Лонгрид 9, теорема 1',
      pitfalls: ['Лемму о непересекающихся окрестностях надо обосновать (ε₀ = (b − a)/2), а не ссылаться на рисунок.', 'Берём n ≥ max(N₁, N₂) — именно максимум, чтобы оба условия выполнялись сразу.'],
      statement: {
        level: 'basic',
        text: md`У числовой последовательности не может быть более одного предела (из $\overline{\mathbb R}$).`,
      },
      proof: {
        level: 'basic',
        idea: md`От противного: у двух разных точек есть непересекающиеся окрестности, а члены последовательности с некоторого номера должны лежать в обеих.`,
        steps: [
          { title: 'Предположим противное', body: md`Пусть $\{a_n\}$ имеет два предела $a\ne b$, для определённости $a<b$.` },
          {
            title: 'Берём непересекающиеся окрестности',
            body: md`По лемме о непересекающихся окрестностях $\exists\,\varepsilon_1,\varepsilon_2>0:\ U_{\varepsilon_1}(a)\cap U_{\varepsilon_2}(b)=\varnothing$.`,
          },
          {
            title: 'Применяем определение предела дважды',
            body: md`$\exists N_1:\ \forall n\ge N_1\ a_n\in U_{\varepsilon_1}(a)$ и $\exists N_2:\ \forall n\ge N_2\ a_n\in U_{\varepsilon_2}(b)$.`,
          },
          {
            title: md`При $n\ge\max\{N_1;N_2\}$ — противоречие`,
            body: md`Тогда $a_n\in U_{\varepsilon_1}(a)\cap U_{\varepsilon_2}(b)=\varnothing$ — противоречие. $\blacksquare$`,
          },
        ],
      },
      lemmas: ['lemma-disjoint-nbhd'],
    },
    {
      id: 'convergent-bounded',
      title: 'Теорема об ограниченности сходящейся последовательности',
      source: 'Лонгрид 9, теорема 2',
      pitfalls: ['Нельзя забыть первые члены x₁, …, x_{N−1}: границы — min и max из них и чисел a − 1, a + 1.', 'Обратное неверно: (−1)ⁿ ограничена, но расходится.'],
      statement: { level: 'basic', text: md`Сходящаяся последовательность ограничена.` },
      proof: {
        level: 'basic',
        idea: md`Берём $\varepsilon=1$: с номера $N$ все члены в $(a-1;a+1)$, а до $N$ — конечное число членов.`,
        steps: [
          { title: md`Берём $\varepsilon=1$`, body: md`Пусть $\lim x_n=a\in\mathbb R$. По определению при $\varepsilon=1$: $\exists N:\ \forall n\ge N\ \ x_n\in(a-1;a+1)$.` },
          {
            title: 'Вне интервала — конечное число членов',
            body: md`Вне этого интервала могут оказаться только $x_1,\dots,x_{N-1}$ — конечный набор чисел, у него есть минимум и максимум.`,
          },
          {
            title: 'Явные границы',
            body: md`$A=\min\{x_1;\dots;x_{N-1};a-1\}$, $\;B=\max\{x_1;\dots;x_{N-1};a+1\}$. Тогда $\forall n\ \ x_n\in[A;B]$ — последовательность ограничена. $\blacksquare$`,
          },
        ],
      },
      notes: md`Обратное неверно: $x_n=(-1)^n$ ограничена, но расходится.`,
    },
    {
      id: 'infinitesimal-props',
      title: 'Свойства бесконечно малых последовательностей',
      source: 'Лонгрид 9, лемма 3',
      statement: {
        level: 'basic',
        text: md`1. Произведение бесконечно малой последовательности на **ограниченную** является бесконечно малой.
2. Сумма (разность) двух бесконечно малых последовательностей является бесконечно малой.`,
      },
      proof: {
        level: 'basic',
        idea: md`(1) берём в определении $\varepsilon/M$, где $M$ — граница $|y_n|$; (2) неравенство треугольника и $N=\max\{N_1,N_2\}$ с $\varepsilon/2$.`,
        steps: [
          { title: '(1) Ограниченность $y_n$', body: md`Пусть $x_n\to0$, $\{y_n\}$ ограничена: $\exists M>0:\ \forall n\ |y_n|\le M$.` },
          {
            title: md`(1) Определение для $\varepsilon/M$`,
            body: md`Возьмём произвольное $\varepsilon>0$. Так как $x_n\to0$, для числа $\frac{\varepsilon}{M}>0$: $\exists N:\ \forall n\ge N\ \ |x_n|<\frac{\varepsilon}M$.`,
          },
          {
            title: '(1) Оценка произведения',
            body: md`При $n\ge N$: $|x_ny_n|=|x_n|\cdot|y_n|<\frac{\varepsilon}M\cdot M=\varepsilon$. Итак, $\forall\varepsilon>0\ \exists N:\ \forall n\ge N\ |x_ny_n-0|<\varepsilon$, т. е. $x_ny_n\to0$.`,
          },
          {
            title: md`(2) Определения для $\varepsilon/2$`,
            body: md`Пусть $x_n\to0$, $y_n\to0$. $\forall\varepsilon>0$: $\exists N_1:\ \forall n\ge N_1\ |x_n|<\frac\varepsilon2$ и $\exists N_2:\ \forall n\ge N_2\ |y_n|<\frac\varepsilon2$.`,
          },
          {
            title: '(2) Неравенство треугольника',
            body: md`При $n\ge N=\max\{N_1;N_2\}$: $|x_n\pm y_n|\le|x_n|+|y_n|<\frac\varepsilon2+\frac\varepsilon2=\varepsilon$. Значит, $x_n\pm y_n\to0$. $\blacksquare$`,
          },
        ],
      },
      pitfalls: ['В (1) обязательно ограниченность, а не просто «вторая последовательность»: 1/n · n² не бесконечно малая.'],
    },
    {
      id: 'seq-arithmetic',
      title: 'Теорема об арифметических операциях со сходящимися последовательностями',
      source: 'Лонгрид 9, теорема 3',
      pitfalls: ['Для частного сначала доказывают, что 1/yₙ ограничена (|yₙ| > |Y|/2 с некоторого номера); без этого шаг не проходит.', 'Теорема только для конечных пределов: ∞ − ∞ и ∞/∞ — неопределённости.'],
      statement: {
        level: 'basic',
        text: md`Пусть $\lim\limits_{n\to\infty}x_n=X\in\mathbb R$, $\lim\limits_{n\to\infty}y_n=Y\in\mathbb R$. Тогда
1. $\lim(x_n\pm y_n)=X\pm Y$;
2. $\lim(x_ny_n)=XY$;
3. если дополнительно $Y\ne0$ и $\forall n\ y_n\ne0$, то $\lim\dfrac{x_n}{y_n}=\dfrac XY$.`,
      },
      proof: {
        level: 'basic',
        idea: md`$x_n\to X\iff x_n-X$ — бесконечно малая. Всё сводится к свойствам бесконечно малых (лемма 3) и ограниченности сходящейся.`,
        steps: [
          {
            title: 'Вспомогательный факт',
            body: md`$x_n\to X\iff x_n=X+\alpha_n$, где $\alpha_n$ бесконечно малая (условия $|x_n-X|<\varepsilon$ и $|\alpha_n|<\varepsilon$ совпадают). Значит, $\{x_n-X\}$, $\{y_n-Y\}$ — бесконечно малые.`,
          },
          {
            title: 'Сумма/разность',
            body: md`$(x_n\pm y_n)-(X\pm Y)=(x_n-X)\pm(y_n-Y)$ — сумма (разность) бесконечно малых, т. е. бесконечно малая (лемма 3). Значит, $x_n\pm y_n\to X\pm Y$.`,
          },
          {
            title: 'Произведение: прибавить и вычесть $x_nY$',
            body: md`$$x_ny_n-XY=x_n(y_n-Y)+(x_n-X)Y.$$ $\{x_n\}$ сходится $\Rightarrow$ ограничена, поэтому $x_n(y_n-Y)$ — ограниченная на бесконечно малую; $(x_n-X)Y$ — бесконечно малая на константу. Сумма бесконечно малая $\Rightarrow x_ny_n\to XY$.`,
          },
          {
            title: 'Частное: $|y_n|>|Y|/2$ с некоторого номера',
            body: md`Возьмём $\varepsilon=\frac{|Y|}2$: $\exists N:\ \forall n\ge N\ |y_n-Y|<\frac{|Y|}2$. Из $\bigl||y_n|-|Y|\bigr|\le|y_n-Y|$ получаем $|y_n|>\frac{|Y|}2$, т. е. $\left|\frac1{y_n}\right|<\frac2{|Y|}$ — $\left\{\frac1{y_n}\right\}$ ограничена.`,
          },
          {
            title: md`Частное: $\frac1{y_n}\to\frac1Y$`,
            body: md`$\frac1{y_n}-\frac1Y=\frac1{y_nY}\cdot(Y-y_n)$ — ограниченная на бесконечно малую $\Rightarrow$ бесконечно малая. Тогда по п. 2: $\frac{x_n}{y_n}=x_n\cdot\frac1{y_n}\to X\cdot\frac1Y=\frac XY$. $\blacksquare$`,
          },
        ],
      },
      uses: ['infinitesimal-props', 'convergent-bounded'],
      notes: md`Требование $y_n\ne0$ при всех $n$ по сути лишнее: из $y_n\to Y\ne0$ следует $y_n\ne0$ при всех достаточно больших $n$, а начальные члены на предел не влияют.`,
    },
  ],
};
