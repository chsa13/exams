import { md, type Task } from '../../src/content/schema';

// Банк задач к КР2 (недели 6–8). По мотивам ДЗ и семинаров: условия пересказаны, числа изменены.
// Упор, как просил лектор, на «почему»: в решениях — не только ответ, но и короткое обоснование,
// а там, где ответ можно «увидеть», — как именно.

const R = ['red'] as const;

export const tasks: Task[] = [
  // ======================= Неделя 6: пространства, базисы, координаты =======================
  {
    id: 'l-sub-r2',
    topic: 'spaces',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'По мотивам семинара 6, задача 1',
    prompt: md`Какие из множеств — подпространства $\mathbb R^2$? Для каждого «нет» укажи конкретное нарушенное условие.
$$\text{(a) } y=3x;\quad \text{(b) } y=3x-2;\quad \text{(c) } x^2=y^2;\quad \text{(d) } x\le0;\quad \text{(e) } \{(0,0)\}.$$`,
    hints: [md`Сначала проверь, лежит ли в множестве $(0,0)$. Потом ищи два вектора, сумма которых выходит из множества, или отрицательный скаляр.`],
    answer: md`- (a) **да**: прямая через начало координат, $\operatorname{span}\{(1,3)\}$.
- (b) **нет**: $(0,0)$ не лежит ($0\ne-2$).
- (c) **нет**: это две прямые $y=\pm x$; $(1,1)+(1,-1)=(2,0)$, а $2^2\ne0^2$.
- (d) **нет**: $(-1,0)$ лежит, а $(-1)\cdot(-1,0)=(1,0)$ — нет.
- (e) **да**: нулевое подпространство.

Все подпространства $\mathbb R^2$: $\{\mathbf 0\}$, прямые через ноль и вся плоскость (размерности 0, 1, 2).`,
  },
  {
    id: 'l-sub-misc',
    topic: 'spaces',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'По мотивам семинара 6, задача 2',
    prompt: md`Подпространства ли это?
1. Кососимметричные матрицы ($A^{\mathsf T}=-A$) в $\operatorname{Mat}_n(\mathbb R)$.
2. Матрицы с $\det A=0$ в $\operatorname{Mat}_2(\mathbb R)$.
3. Многочлены $p\in\mathbb R[x]_{\le3}$ с $p(2)=p(-2)$.
4. Многочлены $p\in\mathbb R[x]_{\le3}$ с $p(0)=1$.
5. Неубывающие функции $\mathbb R\to\mathbb R$.`,
    hints: [md`Для «да» хватит одной строчки: условие линейно и сохраняется при комбинациях. Для «нет» — конкретный контрпример.`],
    answer: md`1. **Да**: $(\lambda A+\mu B)^{\mathsf T}=\lambda A^{\mathsf T}+\mu B^{\mathsf T}=-(\lambda A+\mu B)$, нулевая матрица подходит.
2. **Нет**: $\operatorname{diag}(1,0)$ и $\operatorname{diag}(0,1)$ вырождены, а их сумма $I$ — нет.
3. **Да**: условие $p(2)-p(-2)=0$ линейно по $p$ (это ядро отображения $p\mapsto p(2)-p(-2)$).
4. **Нет**: нулевой многочлен не подходит.
5. **Нет**: $f(x)=x$ неубывающая, а $-f$ — нет.`,
  },
  {
    id: 'l-sub-z',
    topic: 'spaces',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'По мотивам семинара 6, задачи 2 и 12',
    prompt: md`Верно ли, что:
1. непустое подмножество, замкнутое относительно сложения и взятия противоположного вектора, — подпространство;
2. пересечение двух подпространств — подпространство;
3. объединение двух подпространств — подпространство?`,
    hints: [md`Для п. 1 поищи пример внутри $\mathbb R$; для п. 3 — две прямые на плоскости.`],
    answer: md`1. **Неверно**: $\mathbb Z\subset\mathbb R$ замкнуто относительно $+$ и $-$, но $\frac12\cdot1\notin\mathbb Z$ — нет замкнутости относительно умножения на скаляр.
2. **Верно**: $\mathbf 0$ лежит в обоих; если $\mathbf x,\mathbf y$ лежат в обоих, то и $\lambda\mathbf x+\mu\mathbf y$ лежит в обоих.
3. **Неверно** в общем случае: $Ox\cup Oy$ в $\mathbb R^2$, а $(1,0)+(0,1)=(1,1)$ не лежит ни на одной оси. Объединение — подпространство только когда одно подпространство содержится в другом.`,
  },
  {
    id: 'l-union-prove',
    topic: 'spaces',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'Семинар 6, задача 12',
    prompt: md`Пусть $\mathbb U,\mathbb W$ — подпространства $\mathbb V$. Докажи: $\mathbb U\cup\mathbb W$ — подпространство тогда и только тогда, когда $\mathbb U\subseteq\mathbb W$ или $\mathbb W\subseteq\mathbb U$.`,
    hints: [md`Если включения нет, возьми $\mathbf u\in\mathbb U\setminus\mathbb W$ и $\mathbf w\in\mathbb W\setminus\mathbb U$ и посмотри на $\mathbf u+\mathbf w$.`],
    answer: md`**$\Leftarrow$.** Если $\mathbb U\subseteq\mathbb W$, то $\mathbb U\cup\mathbb W=\mathbb W$ — подпространство (аналогично в другом случае).

**$\Rightarrow$.** Пусть включений нет: есть $\mathbf u\in\mathbb U\setminus\mathbb W$ и $\mathbf w\in\mathbb W\setminus\mathbb U$. Если $\mathbf u+\mathbf w\in\mathbb U$, то $\mathbf w=(\mathbf u+\mathbf w)-\mathbf u\in\mathbb U$ — противоречие. Если $\mathbf u+\mathbf w\in\mathbb W$, то $\mathbf u\in\mathbb W$ — противоречие. Значит, $\mathbf u+\mathbf w\notin\mathbb U\cup\mathbb W$, и объединение не замкнуто относительно сложения.`,
  },
  {
    id: 'l-weird-ops',
    topic: 'spaces',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 6, задача 1',
    prompt: md`На $\mathbb V=\mathbb R^2$ заданы операции
$$(u,v)\oplus(x,y)=(u+x-2,\ v+y+1),\qquad \lambda\odot(x,y)=(\lambda x-2\lambda+2,\ \lambda y+\lambda-1).$$
Известно, что это векторное пространство. Найди его нулевой вектор и вектор, противоположный $(0,0)$. Объясни, почему все аксиомы выполнены, **не проверяя их по одной**.`,
    hints: [
      md`Ноль — это $\mathbf z$ с $\mathbf v\oplus\mathbf z=\mathbf v$; он не обязан быть $(0,0)$.`,
      md`Рассмотри биекцию $f(x,y)=(x-2,\ y+1)$. Во что она переводит $\oplus$ и $\odot$?`,
    ],
    answer: md`**Ноль:** $(u+z_1-2,\ v+z_2+1)=(u,v)$ при $z_1=2$, $z_2=-1$. Нулевой вектор — $(2,-1)$.

**Почему это пространство.** Пусть $f(x,y)=(x-2,\ y+1)$ — биекция $\mathbb R^2\to\mathbb R^2$. Тогда
$$f\big((u,v)\oplus(x,y)\big)=(u+x-4,\ v+y+2)=f(u,v)+f(x,y),\qquad f(\lambda\odot(x,y))=(\lambda(x-2),\ \lambda(y+1))=\lambda f(x,y).$$
То есть новые операции — обычные операции $\mathbb R^2$, «перенесённые» биекцией $f$. Каждая аксиома для $\oplus,\odot$ после применения $f$ превращается в ту же аксиому для обычных операций, а она верна.

**Противоположный к $(0,0)$:** $f(0,0)=(-2,1)$, противоположный в обычном смысле $(2,-1)$, возвращаем: $f^{-1}(2,-1)=(4,-2)$. Проверка: $(0,0)\oplus(4,-2)=(2,-1)$ — ноль.`,
  },
  {
    id: 'l-c-over-r',
    topic: 'spaces',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 3',
    prompt: md`Рассмотрим $\mathbb C$ как векторное пространство над $\mathbb R$ и над $\mathbb C$. Найди базис и размерность в каждом случае. Независимы ли $1+i$ и $2-i$ над $\mathbb R$? Над $\mathbb C$? Найди координаты $a+bi$ ($a,b\in\mathbb R$) в базисе $(1+i,\ 2-i)$ над $\mathbb R$.`,
    hints: [md`Над $\mathbb C$ любые два ненулевых числа пропорциональны: $w=\frac wz\cdot z$.`],
    answer: md`Над $\mathbb R$: базис $(1,i)$, $\dim=2$. Над $\mathbb C$: базис $(1)$, $\dim=1$.

Над $\mathbb R$: $\alpha(1+i)+\beta(2-i)=(\alpha+2\beta)+(\alpha-\beta)i=0$ даёт $\alpha+2\beta=0$, $\alpha-\beta=0$, откуда $\alpha=\beta=0$ — **независимы**, и это базис (два независимых в двумерном).

Над $\mathbb C$ **зависимы**: двумерного пространства нет, а явно $2-i=\frac{1-3i}2(1+i)$.

Координаты: $\alpha+2\beta=a$, $\alpha-\beta=b$ $\Rightarrow$ $\beta=\frac{a-b}3$, $\alpha=\frac{a+2b}3$. Ответ: $\left(\frac{a+2b}3,\ \frac{a-b}3\right)^{\mathsf T}$.`,
  },
  {
    id: 'l-sym-dim',
    topic: 'spaces',
    skill: 'vectors',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 4',
    prompt: md`Найди базис и размерность пространства симметричных и пространства кососимметричных матриц $n\times n$ над $\mathbb R$. Чему равны размерности при $n=3$?`,
    hints: [md`Симметричная матрица задаётся элементами на диагонали и над ней. Кососимметричная — только над диагональю (почему на диагонали нули?).`],
    answer: md`**Симметричные:** базис $E_{ii}$ ($1\le i\le n$) и $E_{ij}+E_{ji}$ ($i<j$). Разложение $A=\sum_i a_{ii}E_{ii}+\sum_{i<j}a_{ij}(E_{ij}+E_{ji})$ существует и единственно (коэффициенты читаются по элементам). $\dim=n+\frac{n(n-1)}2=\frac{n(n+1)}2$.

**Кососимметричные:** $a_{ii}=-a_{ii}$, поэтому диагональ нулевая; базис $E_{ij}-E_{ji}$ ($i<j$), $\dim=\frac{n(n-1)}2$.

При $n=3$: $6$ и $3$ (вместе $9=\dim\operatorname{Mat}_3$ — не случайно: $\operatorname{Mat}_n=\mathrm{Sym}\oplus\mathrm{Skew}$).`,
  },
  {
    id: 'l-deg-indep',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'Семинар 6, задача 5',
    prompt: md`Докажи, что ненулевые многочлены попарно различных степеней линейно независимы. Выведи отсюда, что $1,\ (x-a),\ (x-a)^2,\ \dots,\ (x-a)^n$ — базис $\mathbb R[x]_{\le n}$.`,
    hints: [md`Упорядочь по степеням и посмотри на коэффициент при старшей степени в нулевой комбинации.`],
    answer: md`Пусть $\deg p_1<\deg p_2<\dots<\deg p_k$ и $c_1p_1+\dots+c_kp_k=0$. Старшая степень $x^{\deg p_k}$ встречается только в $p_k$, её коэффициент в комбинации — $c_k\cdot(\text{старший коэффициент }p_k)$, он должен быть нулём, значит, $c_k=0$. Дальше то же для $p_{k-1}$ и т.д.: все $c_i=0$.

Многочлены $(x-a)^j$, $j=0,\dots,n$, имеют степени $0,1,\dots,n$ — независимы. Их $n+1$, а $\dim\mathbb R[x]_{\le n}=n+1$, поэтому это базис (независимая система нужной длины).`,
  },
  {
    id: 'l-same-degree',
    topic: 'spaces',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'По мотивам семинара 6, задача 17',
    prompt: md`Верно ли, что в $\mathbb R[x]_{\le3}$ не бывает базиса, в котором все многочлены одной степени? Верно ли, что многочлены попарно различных степеней всегда образуют базис $\mathbb R[x]_{\le n}$, если их $n+1$?`,
    hints: [md`Попробуй $x^3,\ x^3+1,\ x^3+x,\ x^3+x^2$.`],
    answer: md`1. **Неверно.** $x^3,\ x^3+1,\ x^3+x,\ x^3+x^2$ — все степени 3, но через них выражаются $1,x,x^2,x^3$ (вычитаем $x^3$), значит, они порождают $\mathbb R[x]_{\le3}$, а 4 порождающих в 4-мерном пространстве — базис. Различие степеней — достаточное, но не необходимое условие независимости.
2. **Неверно** без уточнения: степени должны быть именно $0,1,\dots,n$ и все многочлены лежать в $\mathbb R[x]_{\le n}$. Если $n+1$ многочлен попарно различных степеней лежат в $\mathbb R[x]_{\le n}$, то степени неизбежно $0,\dots,n$, и тогда **верно** (независимы и их $\dim$ штук).`,
  },
  {
    id: 'l-newton',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 5',
    prompt: md`Почему $(1,\ x,\ x(x-1),\ x(x-1)(x-2))$ — базис $\mathbb R[x]_{\le3}$? Найди в нём координаты $p(x)=x^3+2x^2-x+3$.`,
    hints: [
      md`Степени 0, 1, 2, 3.`,
      md`Подставляй по очереди $x=0$, $x=1$, $x=2$ в равенство $p=c_0+c_1x+c_2x(x-1)+c_3x(x-1)(x-2)$; $c_3$ видно по старшему коэффициенту.`,
    ],
    answer: md`Базис: степени $0,1,2,3$ попарно различны — 4 независимых многочлена в 4-мерном пространстве.

$c_3=1$ (старший коэффициент). $x=0$: $c_0=p(0)=3$. $x=1$: $c_0+c_1=p(1)=5$, $c_1=2$. $x=2$: $c_0+2c_1+2c_2=p(2)=17$, $3+4+2c_2=17$, $c_2=5$.

Ответ: $(3,\ 2,\ 5,\ 1)^{\mathsf T}$. Проверка: $3+2x+5(x^2-x)+(x^3-3x^2+2x)=x^3+2x^2-x+3$.`,
  },
  {
    id: 'l-lagrange',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'construct',
    points: 2,
    source: 'По мотивам семинара 6, задача 6',
    prompt: md`Найди $l_0,l_1,l_2\in\mathbb R[x]_{\le2}$ такие, что $l_i(x_j)=1$ при $i=j$ и $0$ при $i\ne j$, где $x_0=0$, $x_1=1$, $x_2=3$. Докажи, что это базис, и объясни, как найти координаты любого $p$ в этом базисе **без вычислений**.`,
    hints: [md`$l_0$ обнуляется в точках 1 и 3, значит, пропорционален $(x-1)(x-3)$.`],
    answer: md`$$l_0=\frac{(x-1)(x-3)}{3},\quad l_1=\frac{x(x-3)}{-2},\quad l_2=\frac{x(x-1)}{6}.$$
**Базис:** если $c_0l_0+c_1l_1+c_2l_2=0$, подставим $x=0$: $c_0=0$; $x=1$: $c_1=0$; $x=3$: $c_2=0$. Три независимых в трёхмерном — базис.

**Координаты:** в $p=c_0l_0+c_1l_1+c_2l_2$ подставляем те же точки: $[p]=(p(0),\ p(1),\ p(3))^{\mathsf T}$.`,
  },
  {
    id: 'l-taylor',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 7',
    prompt: md`В базисе $\mathcal B=\left(1,\ x-2,\ \frac{(x-2)^2}{2},\ \frac{(x-2)^3}{6}\right)$ пространства $\mathbb R[x]_{\le3}$ вырази координаты любого $p$ через $p(2),p'(2),p''(2),p'''(2)$ и найди координаты $p=x^3-3x+1$.`,
    hints: [md`Подставь $x=2$ в $p=c_0+c_1(x-2)+c_2\frac{(x-2)^2}2+c_3\frac{(x-2)^3}6$ и в его производные.`],
    answer: md`Подстановка $x=2$ в равенство и в его 1-ю, 2-ю, 3-ю производные даёт $c_0=p(2)$, $c_1=p'(2)$, $c_2=p''(2)$, $c_3=p'''(2)$ (каждое следующее слагаемое после дифференцирования ещё обнуляется в точке 2).

Для $p=x^3-3x+1$: $p(2)=3$, $p'=3x^2-3$, $p'(2)=9$; $p''=6x$, $p''(2)=12$; $p'''=6$. Ответ: $(3,\ 9,\ 12,\ 6)^{\mathsf T}$.`,
  },
  {
    id: 'l-roots-subspaces',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 8',
    prompt: md`В $\mathbb R[x]_{\le3}$: $\ \mathbb U=\{p\mid p(2)=0\}$, $\mathbb W=\{p\mid p(-1)=0\}$. Найди базисы и размерности $\mathbb U$, $\mathbb W$, $\mathbb U\cap\mathbb W$. Является ли $\mathbb U\cup\mathbb W$ подпространством?`,
    hints: [md`$p(2)=0\iff p$ делится на $x-2$, то есть $p=(x-2)q$, $\deg q\le2$.`],
    answer: md`$\mathbb U=\{(x-2)q\mid q\in\mathbb R[x]_{\le2}\}$, базис $x-2,\ x(x-2),\ x^2(x-2)$, $\dim=3$ (степени различны).

$\mathbb W$: базис $x+1,\ x(x+1),\ x^2(x+1)$, $\dim=3$.

$\mathbb U\cap\mathbb W$: делятся и на $x-2$, и на $x+1$, то есть на $(x-2)(x+1)$. Базис $(x-2)(x+1),\ x(x-2)(x+1)$, $\dim=2$.

Объединение — **не** подпространство: $(x-2)+(x+1)=2x-1$, а $2\cdot2-1\ne0$ и $2\cdot(-1)-1\ne0$. (Включения нет: $x-2\notin\mathbb W$, $x+1\notin\mathbb U$.)`,
  },
  {
    id: 'l-divisible',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 8',
    prompt: md`Найди базис и размерность подпространства многочленов из $\mathbb R[x]_{\le5}$, делящихся на $x^2+x+1$.`,
    hints: [md`Такой многочлен — это $(x^2+x+1)q$, какая степень у $q$?`],
    answer: md`Это $\{(x^2+x+1)q\mid\deg q\le3\}$. Базис: $x^2+x+1,\ x(x^2+x+1),\ x^2(x^2+x+1),\ x^3(x^2+x+1)$ — порождают (раскрываем $q$ по степеням) и независимы (степени 2, 3, 4, 5). $\dim=4$.`,
  },
  {
    id: 'l-choose-basis',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 9',
    prompt: md`В $\mathbb R[x]_{\le2}$ даны $p_1=1+x$, $p_2=x-x^2$, $p_3=1+2x-x^2$, $p_4=1+x^2$. Найди размерность и базис их линейной оболочки, вырази остальные многочлены через базисные. Порождают ли они $\mathbb R[x]_{\le2}$?`,
    hints: [md`Сложи и вычти $p_1$ и $p_2$.`],
    answer: md`Видно сразу: $p_3=p_1+p_2$, $p_4=p_1-p_2$. А $p_1,p_2$ непропорциональны (разные степени). Значит, оболочка — $\operatorname{span}\{p_1,p_2\}$, $\dim=2$, базис $(p_1,p_2)$.

Всё $\mathbb R[x]_{\le2}$ (размерность 3) они **не** порождают. Например, $1$ не лежит в оболочке: $a(1+x)+b(x-x^2)=1$ требует $b=0$ (при $x^2$), $a=1$, но тогда коэффициент при $x$ равен $1\ne0$.`,
  },
  {
    id: 'l-complete-poly',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'construct',
    points: 2,
    source: 'По мотивам семинара 6, задача 9',
    prompt: md`Дополни $p_1=1+x^2$, $p_2=x+x^3$ до базиса $\mathbb R[x]_{\le4}$. Единствен ли ответ?`,
    hints: [md`Координаты в $(1,x,x^2,x^3,x^4)$ строками: $(1,0,1,0,0)$, $(0,1,0,1,0)$. Где ведущие позиции?`],
    answer: md`Строки $(1,0,1,0,0)$ и $(0,1,0,1,0)$ уже ступенчатые, ведущие в 1-м и 2-м столбцах. Добавляем $\mathbf e_3,\mathbf e_4,\mathbf e_5$, то есть $x^2,x^3,x^4$.

Базис $(p_1,\ p_2,\ x^2,\ x^3,\ x^4)$. Проверка «видно»: $p_1-x^2=1$, $p_2-x^3=x$ — получаем весь стандартный базис, значит, 5 векторов порождают 5-мерное пространство.

Ответ не единствен: например, подходит и $(p_1,p_2,1,x,x^4)$.`,
  },
  {
    id: 'l-recurrence',
    topic: 'spaces',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 10',
    prompt: md`$\mathbb V$ — последовательности $(a_n)_{n\ge0}$ с $a_n=2a_{n-1}+3a_{n-2}$ при $n\ge2$. Докажи, что $\mathbb V$ — подпространство, найди размерность и базис из геометрических прогрессий. Найди координаты последовательности с $a_0=2$, $a_1=2$.`,
    hints: [md`Последовательность однозначно задаётся парой $(a_0,a_1)$. Для прогрессии $r^n$ подставь в рекурренту.`],
    answer: md`**Подпространство:** условие линейно — ноль подходит, сумма и кратное решений снова удовлетворяют рекурренте.

**Размерность 2:** отображение $(a_n)\mapsto(a_0,a_1)$ — изоморфизм $\mathbb V\to\mathbb R^2$ (линейно; по первым двум членам последовательность восстанавливается однозначно).

**Базис:** $r^n\in\mathbb V\iff r^2=2r+3\iff r=3$ или $r=-1$. Последовательности $3^n$ и $(-1)^n$ имеют начала $(1,3)$ и $(1,-1)$ — непропорциональны, значит, независимы; две штуки в двумерном — базис.

**Координаты:** $\alpha+\beta=2$, $3\alpha-\beta=2$ $\Rightarrow$ $\alpha=\beta=1$: $a_n=3^n+(-1)^n$.`,
  },
  {
    id: 'l-funcs-indep',
    topic: 'spaces',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'По мотивам семинара 6, задача 11',
    prompt: md`Докажи, что функции $\cos x,\ \sin x,\ \sqrt x,\ e^x$ линейно независимы в пространстве функций $(0,+\infty)\to\mathbb R$.`,
    hints: [md`Пусть $a\cos x+b\sin x+c\sqrt x+de^x=0$. Раздели на самую быстро растущую функцию и перейди к пределу $x\to+\infty$.`],
    answer: md`Пусть $a\cos x+b\sin x+c\sqrt x+de^x=0$ при всех $x>0$.
1. Делим на $e^x$, $x\to+\infty$: первые три слагаемые стремятся к нулю, получаем $d=0$.
2. Делим на $\sqrt x$, $x\to+\infty$: $\frac{\cos x}{\sqrt x},\frac{\sin x}{\sqrt x}\to0$ (числитель ограничен), значит, $c=0$.
3. $a\cos x+b\sin x=0$: при $x=\frac\pi2$ получаем $b=0$, при $x=\pi$ — $a=0$.

Все коэффициенты нулевые — функции независимы.`,
  },
  {
    id: 'l-new-basis-2d',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 14',
    prompt: md`$(\mathbf a_1,\mathbf a_2)$ — базис двумерного $\mathbb V$; $\mathbf b_1=\mathbf a_1+\mathbf a_2$, $\mathbf b_2=\mathbf a_1+2\mathbf a_2$. Докажи, что $\mathcal B=(\mathbf b_1,\mathbf b_2)$ — базис, найди $[\mathbf x]_{\mathcal B}$ для $\mathbf x=3\mathbf a_1-\mathbf a_2$ и матрицу $C$ с $[\mathbf x]_{\mathcal B}=C[\mathbf x]_{\mathcal A}$ для всех $\mathbf x$.`,
    hints: [md`Вырази $\mathbf a_1,\mathbf a_2$ через $\mathbf b_1,\mathbf b_2$: $\mathbf a_2=\mathbf b_2-\mathbf b_1$.`],
    answer: md`$\mathbf a_2=\mathbf b_2-\mathbf b_1$, $\mathbf a_1=\mathbf b_1-\mathbf a_2=2\mathbf b_1-\mathbf b_2$. Значит, $\mathcal B$ порождает $\mathbb V$, а два порождающих в двумерном пространстве — базис.

$\mathbf x=3\mathbf a_1-\mathbf a_2=3(2\mathbf b_1-\mathbf b_2)-(\mathbf b_2-\mathbf b_1)=7\mathbf b_1-4\mathbf b_2$, $[\mathbf x]_{\mathcal B}=(7,-4)^{\mathsf T}$.

Столбцы $C=C_{\mathcal B\leftarrow\mathcal A}$ — координаты $\mathbf a_1,\mathbf a_2$ в $\mathcal B$: $C=\begin{pmatrix}2&-1\\-1&1\end{pmatrix}$. Проверка: $C(3,-1)^{\mathsf T}=(7,-4)^{\mathsf T}$.`,
  },
  {
    id: 'l-erased',
    topic: 'spaces',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 15',
    prompt: md`$\mathcal F=(\mathbf f_1,\mathbf f_2)$ и $\mathcal G=(\mathbf g_1,\mathbf g_2)$ — базисы одной плоскости в $\mathbb R^3$, $\mathbf v$ — вектор этой плоскости. Три числа стёрты (обозначены $?$):
$$\mathbf f_1=\begin{pmatrix}1\\0\\1\end{pmatrix},\ \mathbf f_2=\begin{pmatrix}1\\1\\0\end{pmatrix},\ \mathbf g_1=\begin{pmatrix}2\\1\\1\end{pmatrix},\ \mathbf g_2=\begin{pmatrix}0\\-1\\?\end{pmatrix},\quad [\mathbf v]_{\mathcal F}=\begin{pmatrix}3\\?\end{pmatrix},\ [\mathbf v]_{\mathcal G}=\begin{pmatrix}?\\1\end{pmatrix}.$$
Восстанови их.`,
    hints: [md`$\mathbf g_1,\mathbf g_2$ лежат в плоскости $=\operatorname{span}\{\mathbf f_1,\mathbf f_2\}$. Вырази их через $\mathbf f_i$ по первым двум координатам.`],
    answer: md`$\mathbf g_1=\mathbf f_1+\mathbf f_2$ (видно). $\mathbf g_2=a\mathbf f_1+b\mathbf f_2$: по 1-й и 2-й координатам $a+b=0$, $b=-1$, так что $a=1$, и третья координата $\mathbf g_2$ равна $a=\mathbf 1$.

Пусть $[\mathbf v]_{\mathcal G}=(t,1)$: $\mathbf v=t(\mathbf f_1+\mathbf f_2)+(\mathbf f_1-\mathbf f_2)=(t+1)\mathbf f_1+(t-1)\mathbf f_2$. Первая координата в $\mathcal F$ равна 3, поэтому $t=2$, а вторая $t-1=1$.

Ответ: $?$ в $\mathbf g_2$ — это $1$; $[\mathbf v]_{\mathcal F}=(3,1)^{\mathsf T}$; $[\mathbf v]_{\mathcal G}=(2,1)^{\mathsf T}$.`,
  },
  {
    id: 'l-matrix-poly',
    topic: 'spaces',
    skill: 'vectors',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'ДЗ 6, задача 3',
    prompt: md`Пусть $A\in\operatorname{Mat}_n(\mathbb R)$. Докажи, что существует ненулевой многочлен $p$ степени не выше $n^2$ с $p(A)=0$ (где $p(A)=c_0I+c_1A+\dots+c_mA^m$).`,
    hints: [md`Сколько матриц в наборе $I,A,A^2,\dots,A^{n^2}$ и какова размерность $\operatorname{Mat}_n(\mathbb R)$?`],
    answer: md`$\dim\operatorname{Mat}_n(\mathbb R)=n^2$. Набор $I,A,\dots,A^{n^2}$ состоит из $n^2+1$ матрицы — больше размерности, значит, по основной лемме он линейно зависим: $c_0I+c_1A+\dots+c_{n^2}A^{n^2}=0$ с не всеми нулевыми $c_i$. Многочлен $p(t)=c_0+c_1t+\dots+c_{n^2}t^{n^2}$ ненулевой, $\deg p\le n^2$ и $p(A)=0$.`,
  },
  {
    id: 'l-eigen-indep',
    topic: 'spaces',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'По мотивам ДЗ 6, задача 4',
    prompt: md`Пусть $A\in\operatorname{Mat}_n(\mathbb R)$, $\mathbf v_1,\mathbf v_2\ne\mathbf 0$, $A\mathbf v_1=\lambda_1\mathbf v_1$, $A\mathbf v_2=\lambda_2\mathbf v_2$, $\lambda_1\ne\lambda_2$. Докажи, что $\mathbf v_1,\mathbf v_2$ линейно независимы. (Для трёх векторов рассуждение то же, с ещё одним шагом.)`,
    hints: [md`Применяй $A$ к соотношению $c_1\mathbf v_1+c_2\mathbf v_2=\mathbf 0$ и вычти соотношение, умноженное на $\lambda_2$.`],
    answer: md`Пусть $c_1\mathbf v_1+c_2\mathbf v_2=\mathbf 0$. Применяем $A$: $c_1\lambda_1\mathbf v_1+c_2\lambda_2\mathbf v_2=\mathbf 0$. Вычитаем исходное, умноженное на $\lambda_2$: $c_1(\lambda_1-\lambda_2)\mathbf v_1=\mathbf 0$. Так как $\lambda_1\ne\lambda_2$ и $\mathbf v_1\ne\mathbf 0$, $c_1=0$; тогда $c_2\mathbf v_2=\mathbf 0$ и $c_2=0$.

Для трёх: тот же приём сводит соотношение на $\mathbf v_1,\mathbf v_2,\mathbf v_3$ к соотношению на $\mathbf v_1,\mathbf v_2$ с коэффициентами $c_i(\lambda_i-\lambda_3)$, и по уже доказанному они нулевые.`,
  },
  {
    id: 'l-commutant-sym',
    topic: 'spaces',
    skill: 'vectors',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 6, задача 5',
    prompt: md`Пусть $A=\begin{pmatrix}3&1\\1&3\end{pmatrix}$. Докажи, что $\mathbb U_A=\{X\in\operatorname{Mat}_2(\mathbb R)\mid XA=AX\}$ — подпространство, и найди его базис и размерность.`,
    hints: [md`$A=3I+J$, где $J=\begin{pmatrix}0&1\\1&0\end{pmatrix}$. С $I$ коммутирует всё, так что условие — $XJ=JX$.`],
    answer: md`**Подпространство:** $\mathbb U_A=\ker(X\mapsto XA-AX)$, а это отображение линейно.

$A=3I+J$, и $XA=AX\iff XJ=JX$. Для $X=\begin{pmatrix}a&b\\c&d\end{pmatrix}$: $XJ=\begin{pmatrix}b&a\\d&c\end{pmatrix}$, $JX=\begin{pmatrix}c&d\\a&b\end{pmatrix}$, откуда $b=c$, $a=d$.

$\mathbb U_A=\left\{\begin{pmatrix}a&b\\b&a\end{pmatrix}\right\}$, базис $(I,\ J)$, $\dim=2$. (Заметь: это ровно $\operatorname{span}\{I,A\}$.)`,
  },
  {
    id: 'l-functions-on-3',
    topic: 'spaces',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 6, задачи 19–20',
    prompt: md`1. Найди базис и размерность пространства всех функций $\{1,2,3\}\to\mathbb R$. Каковы координаты функции $f$ в вашем базисе?
2. Почему пространство всех непрерывных функций $[0,1]\to\mathbb R$ не имеет конечного базиса?`,
    hints: [md`1. Функции-«индикаторы» точек. 2. Многочлены $1,x,\dots,x^m$ — непрерывные функции.`],
    answer: md`1. $\delta_j$ — функция, равная 1 в точке $j$ и 0 в остальных. $f=f(1)\delta_1+f(2)\delta_2+f(3)\delta_3$, и разложение единственно (подставляем точки). Базис $(\delta_1,\delta_2,\delta_3)$, $\dim=3$, координаты $(f(1),f(2),f(3))^{\mathsf T}$.
2. Если бы $m$ функций порождали всё, то $m+1$ функций $1,x,\dots,x^m$ выражались бы через них и по основной лемме были бы зависимы. Но они независимы: многочлен, равный нулю на всём отрезке, имеет бесконечно много корней и потому нулевой. Противоречие.`,
  },
  {
    id: 'l-tf-dim',
    topic: 'spaces',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'Лонгрид 6, утверждения 4 и 8',
    prompt: md`Верно ли (с обоснованием):
1. любые 4 вектора в $\mathbb R^3$ линейно зависимы;
2. любые 3 вектора, порождающие $\mathbb R^3$, образуют базис;
3. если $\mathbb U\subseteq\mathbb W$ — подпространства и $\dim\mathbb U=\dim\mathbb W$, то $\mathbb U=\mathbb W$;
4. в $\mathbb R^3$ есть подпространство размерности 4?`,
    hints: [md`Основная лемма и утверждение 8 лонгрида 6.`],
    answer: md`1. **Верно**: 4 вектора лежат в оболочке 3 векторов стандартного базиса, по основной лемме зависимы.
2. **Верно**: из порождающей системы можно выделить базис, а в нём ровно 3 вектора — выкидывать нечего.
3. **Верно**: базис $\mathbb U$ — независимая система из $\dim\mathbb W$ векторов в $\mathbb W$, значит, базис $\mathbb W$, и $\mathbb U=\mathbb W$ (для конечномерных).
4. **Неверно**: размерность подпространства не больше $\dim\mathbb R^3=3$.`,
  },
  {
    id: 'l-partial-sums',
    topic: 'spaces',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'По мотивам семинара 6, задача 13',
    prompt: md`Пусть $\mathbf s_k=\mathbf x_1+\dots+\mathbf x_k$, $k=1,\dots,n$. Докажи, что $\mathbf x_1,\dots,\mathbf x_n$ независимы тогда и только тогда, когда $\mathbf s_1,\dots,\mathbf s_n$ независимы. Найди координаты $(4,3,3,1)^{\mathsf T}$ в базисе $\mathbf s_k=\mathbf e_1+\dots+\mathbf e_k$ пространства $\mathbb R^4$.`,
    hints: [md`Оболочки двух систем совпадают: $\mathbf x_1=\mathbf s_1$, $\mathbf x_k=\mathbf s_k-\mathbf s_{k-1}$.`],
    answer: md`Каждая система выражается через другую ($\mathbf s_k=\sum_{i\le k}\mathbf x_i$, $\mathbf x_k=\mathbf s_k-\mathbf s_{k-1}$), поэтому оболочки совпадают. Независимость $n$ векторов $\iff$ размерность их оболочки равна $n$ (из порождающей системы выделяется базис; он из всех $n$ векторов ровно тогда, когда они независимы). Оболочки одни и те же — условия равносильны.

(Можно и напрямую: из $\sum c_k\mathbf s_k=\mathbf 0$ коэффициент при $\mathbf x_n$ равен $c_n$, при $\mathbf x_{n-1}$ — $c_{n-1}+c_n$ и т.д., все нули.)

Координаты: если $\mathbf x=\sum c_k\mathbf s_k$, то $x_j=c_j+c_{j+1}+\dots+c_n$, откуда $c_j=x_j-x_{j+1}$, $c_n=x_n$. Для $(4,3,3,1)$: $(1,\ 0,\ 2,\ 1)^{\mathsf T}$.`,
  },
  {
    id: 'l-matrix-coords',
    topic: 'spaces',
    skill: 'vectors',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 6, задача 4',
    prompt: md`$\mathbb U=\{X\in\operatorname{Mat}_2(\mathbb R)\mid\operatorname{tr}X=0\}$. Докажи, что
$$\mathcal B=\left(\begin{pmatrix}1&0\\0&-1\end{pmatrix},\ \begin{pmatrix}0&1\\1&0\end{pmatrix},\ \begin{pmatrix}0&1\\-1&0\end{pmatrix}\right)$$
— базис $\mathbb U$, и найди координаты $X=\begin{pmatrix}3&1\\2&-3\end{pmatrix}$ в этом базисе.`,
    hints: [md`Любая матрица из $\mathbb U$ имеет вид $\begin{pmatrix}a&b\\c&-a\end{pmatrix}$. Запиши её разложение по $\mathcal B$ с неизвестными коэффициентами и сравни элементы.`],
    answer: md`Комбинация с коэффициентами $\alpha,\beta,\gamma$ равна $\begin{pmatrix}\alpha&\beta+\gamma\\\beta-\gamma&-\alpha\end{pmatrix}$. Для матрицы $\begin{pmatrix}a&b\\c&-a\end{pmatrix}$ получаем систему $\alpha=a$, $\beta+\gamma=b$, $\beta-\gamma=c$. У неё ровно одно решение: $\alpha=a$, $\beta=\frac{b+c}2$, $\gamma=\frac{b-c}2$.

Разложение существует и единственно для каждой матрицы из $\mathbb U$, значит, $\mathcal B$ — базис по критерию базиса, и $\dim\mathbb U=3$.

Для $X$: $a=3$, $b=1$, $c=2$, поэтому $[X]_{\mathcal B}=\left(3,\ \frac32,\ -\frac12\right)^{\mathsf T}$.`,
  },

  // ======================= Неделя 7: линейные отображения и матрицы =======================
  {
    id: 'l-which-linear',
    topic: 'maps',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 7, задача 1',
    prompt: md`При каких $b,c\in\mathbb R$ отображение $\varphi:\mathbb R^3\to\mathbb R^2$,
$$\varphi(x,y,z)=(3x-y+2z+b,\ \ 4y+cxz),$$
линейно?`,
    hints: [md`Проверь $\varphi(\mathbf 0)=\mathbf 0$ и $\varphi(2\mathbf u)=2\varphi(\mathbf u)$ для $\mathbf u=(1,1,1)$.`],
    answer: md`$\varphi(\mathbf 0)=(b,0)$, значит, $b=0$. Для $\mathbf u=(1,1,1)$: вторая координата $\varphi(2\mathbf u)$ равна $8+4c$, а $2\varphi(\mathbf u)$ — $8+2c$; равенство даёт $c=0$.

Обратно, при $b=c=0$ это умножение на матрицу $\begin{pmatrix}3&-1&2\\0&4&0\end{pmatrix}$ — линейно. Ответ: $b=c=0$.`,
  },
  {
    id: 'l-exists-map',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 2',
    prompt: md`$\mathbf v_1=(1,0,1)$, $\mathbf v_2=(0,1,1)$, $\mathbf v_3=(1,2,3)$, $\mathbf v_4=(1,1,0)$, $\mathbf v_5=(0,-1,1)$ (столбцы). Существует ли линейное $\varphi:\mathbb R^3\to\mathbb R^2$ с $\varphi(\mathbf v_i)=\mathbf u_i$, если
- (a) $\mathbf u_1=(1,0)$, $\mathbf u_2=(0,1)$, $\mathbf u_3=(1,2)$, $\mathbf u_4=(1,1)$, $\mathbf u_5=(0,-1)$;
- (b) то же, но $\mathbf u_3=(1,1)$?

Если существует — единственно ли и какая у него матрица?`,
    hints: [md`Найди соотношения: $\mathbf v_3$ и $\mathbf v_5$ выражаются через $\mathbf v_1,\mathbf v_2,\mathbf v_4$. Образы обязаны удовлетворять тем же соотношениям.`],
    answer: md`Соотношения: $\mathbf v_3=\mathbf v_1+2\mathbf v_2$, $\mathbf v_5=\mathbf v_1-\mathbf v_4$; а $\mathbf v_1,\mathbf v_2,\mathbf v_4$ независимы — базис $\mathbb R^3$.

**(a)** $\mathbf u_1+2\mathbf u_2=(1,2)=\mathbf u_3$ ✓, $\mathbf u_1-\mathbf u_4=(0,-1)=\mathbf u_5$ ✓. Отображение существует и единственно (значения на базисе $\mathbf v_1,\mathbf v_2,\mathbf v_4$ заданы). Матрица $A=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}$ — «забыть третью координату»: действительно, она переводит $\mathbf v_1,\mathbf v_2,\mathbf v_4$ в $(1,0),(0,1),(1,1)$.

**(b)** $\mathbf u_1+2\mathbf u_2=(1,2)\ne(1,1)=\mathbf u_3$ — соотношение нарушено, такого отображения **нет**.`,
  },
  {
    id: 'l-diff-matrix',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 3',
    prompt: md`$D:\mathbb R[t]_{\le3}\to\mathbb R[t]_{\le2}$, $D(p)=p'$. Найди $T(D,\mathcal A,\mathcal B)$ для $\mathcal A=(1+t^2,\ t^3,\ t,\ 2-t)$, $\mathcal B=(t^2,\ 1,\ t)$, считая по столбцам. Почему $\mathcal A$ — базис?`,
    hints: [md`$D(1+t^2)=2t$, $D(t^3)=3t^2$, $D(t)=1$, $D(2-t)=-1$. Координаты — в порядке $(t^2,1,t)$.`],
    answer: md`$\mathcal A$ — базис: в нулевой комбинации $a(1+t^2)+bt^3+ct+d(2-t)$ коэффициент при $t^3$ даёт $b=0$, при $t^2$ — $a=0$, затем $2d=0$ и $c-d=0$. Четыре независимых в 4-мерном — базис.

Образы и их координаты в $\mathcal B=(t^2,1,t)$: $2t\to(0,0,2)$, $3t^2\to(3,0,0)$, $1\to(0,1,0)$, $-1\to(0,-1,0)$. Ставим столбцами:
$$T(D,\mathcal A,\mathcal B)=\begin{pmatrix}0&3&0&0\\0&0&1&-1\\2&0&0&0\end{pmatrix}.$$`,
  },
  {
    id: 'l-matrix-new-bases',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 4',
    prompt: md`$\varphi:\mathbb R^3\to\mathbb R^2$ в стандартных базисах задано матрицей $A=\begin{pmatrix}1&1&0\\0&1&-1\end{pmatrix}$. Базисы: $\mathcal F=(\mathbf f_1,\mathbf f_2,\mathbf f_3)=((1,0,0),(1,1,0),(1,1,1))$, $\mathcal G=((1,1),(0,1))$. Найди $T(\varphi,\mathcal F,\mathcal G)$. Для $\mathbf x=(3,2,1)$ найди $[\varphi(\mathbf x)]_{\mathcal G}$ двумя способами.`,
    hints: [
      md`$T(\varphi,\mathcal F,\mathcal G)=C_{\mathcal G\leftarrow\mathcal E}\,A\,C_{\mathcal E\leftarrow\mathcal F}$, где $C_{\mathcal E\leftarrow\mathcal F}$ — векторы $\mathbf f_i$ столбцами. Или по столбцам: $\varphi(\mathbf f_j)$ в базисе $\mathcal G$.`,
      md`$(a,b)=a\mathbf g_1+(b-a)\mathbf g_2$.`,
    ],
    answer: md`По столбцам: $\varphi(\mathbf f_1)=(1,0)$, $\varphi(\mathbf f_2)=(2,1)$, $\varphi(\mathbf f_3)=(2,0)$. В $\mathcal G$: $(a,b)\mapsto(a,\ b-a)$, получаем $(1,-1)$, $(2,-1)$, $(2,-2)$:
$$T(\varphi,\mathcal F,\mathcal G)=\begin{pmatrix}1&2&2\\-1&-1&-2\end{pmatrix}.$$
**Способ 1 (векторы):** $A\mathbf x=(5,1)$, в $\mathcal G$: $(5,\ -4)$.

**Способ 2 (координаты):** $[\mathbf x]_{\mathcal F}=(1,1,1)$ (видно: $\mathbf f_1+\mathbf f_2+\mathbf f_3=(3,2,1)$), и $T[\mathbf x]_{\mathcal F}=(1+2+2,\ -1-1-2)=(5,-4)$ ✓.`,
  },
  {
    id: 'l-iso-sym',
    topic: 'maps',
    scales: [...R],
    type: 'construct',
    points: 1.5,
    source: 'По мотивам семинара 7, задача 5',
    prompt: md`Построй явный изоморфизм между $\mathbb R[x]_{\le5}$ и пространством симметричных матриц $3\times3$. Выпиши обратное отображение и объясни, почему оба линейны.`,
    hints: [md`Обе размерности равны 6. Раскладывай коэффициенты многочлена по шести «свободным» элементам симметричной матрицы.`],
    answer: md`$$\Phi(a_0+a_1x+\dots+a_5x^5)=\begin{pmatrix}a_0&a_1&a_2\\a_1&a_3&a_4\\a_2&a_4&a_5\end{pmatrix},$$
обратное: симметричная матрица $\mapsto$ многочлен с коэффициентами $m_{11},m_{12},m_{13},m_{22},m_{23},m_{33}$.

Линейность: каждый элемент матрицы — один из коэффициентов, а коэффициенты комбинации многочленов — комбинации коэффициентов (и наоборот). Отображения взаимно обратны, значит, $\Phi$ — биекция и изоморфизм.`,
  },
  {
    id: 'l-simple-matrix',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'construct',
    points: 2,
    source: 'По мотивам семинара 7, задача 6',
    prompt: md`$\varphi:\mathbb R[x]_{\le2}\to\mathbb R^2$, $\varphi(p)=(p(1),\ p(2))^{\mathsf T}$. Подбери базисы $\mathcal A$ и $\mathcal B$ так, чтобы $T(\varphi,\mathcal A,\mathcal B)$ была как можно проще, и выпиши её.`,
    hints: [md`Найди многочлены, которые переходят в $\mathbf e_1$, в $\mathbf e_2$ и в $\mathbf 0$.`],
    answer: md`$\mathcal B=(\mathbf e_1,\mathbf e_2)$, $\mathcal A=(2-x,\ x-1,\ (x-1)(x-2))$:
$\varphi(2-x)=(1,0)$, $\varphi(x-1)=(0,1)$, $\varphi((x-1)(x-2))=(0,0)$. Значит,
$$T(\varphi,\mathcal A,\mathcal B)=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}.$$
$\mathcal A$ — базис: в нулевой комбинации коэффициент при $x^2$ даёт ноль у третьего, затем подстановки $x=1$ и $x=2$ обнуляют остальные.

Приём: сначала берём векторы с «удобными» образами, потом добавляем векторы ядра.`,
  },
  {
    id: 'l-change-basis-r3',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 8',
    prompt: md`$\mathcal F=((1,0,0),(1,1,0),(1,1,1))$, $\mathcal E$ — стандартный базис $\mathbb R^3$. Найди $C_{\mathcal E\leftarrow\mathcal F}$ и $C_{\mathcal F\leftarrow\mathcal E}$ и словами объясни, что стоит в столбцах каждой. Найди $[\mathbf v]_{\mathcal F}$ для $\mathbf v=(3,5,2)$.`,
    hints: [md`$C_{\mathcal E\leftarrow\mathcal F}$ — векторы $\mathbf f_i$ столбцами; вторая — обратная к ней.`],
    answer: md`$$C_{\mathcal E\leftarrow\mathcal F}=\begin{pmatrix}1&1&1\\0&1&1\\0&0&1\end{pmatrix},\qquad C_{\mathcal F\leftarrow\mathcal E}=C_{\mathcal E\leftarrow\mathcal F}^{-1}=\begin{pmatrix}1&-1&0\\0&1&-1\\0&0&1\end{pmatrix}.$$
В столбцах первой — векторы $\mathbf f_j$ в стандартных координатах (она переводит $\mathcal F$-координаты в стандартные). В столбцах второй — $\mathbf e_j$ в базисе $\mathcal F$: $\mathbf e_1=\mathbf f_1$, $\mathbf e_2=\mathbf f_2-\mathbf f_1$, $\mathbf e_3=\mathbf f_3-\mathbf f_2$.

$[\mathbf v]_{\mathcal F}=C_{\mathcal F\leftarrow\mathcal E}\mathbf v=(3-5,\ 5-2,\ 2)=(-2,\ 3,\ 2)^{\mathsf T}$. Проверка: $-2\mathbf f_1+3\mathbf f_2+2\mathbf f_3=(3,5,2)$.`,
  },
  {
    id: 'l-xp-operator',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 9',
    prompt: md`$L(p)=xp'(x)$ на $\mathbb R[x]_{\le2}$; $\mathcal A=(1,x,x^2)$, $\mathcal B=(1,\ x+1,\ (x+1)^2)$. Найди $T(L,\mathcal A,\mathcal A)$ и $T(L,\mathcal B,\mathcal B)$ по столбцам и проверь формулу $T(L,\mathcal B,\mathcal B)=C_{\mathcal B\leftarrow\mathcal A}T(L,\mathcal A,\mathcal A)C_{\mathcal A\leftarrow\mathcal B}$.`,
    hints: [md`$L(x^k)=kx^k$. Для $\mathcal B$: $L(x+1)=x=(x+1)-1$, $L((x+1)^2)=2x(x+1)=2(x+1)^2-2(x+1)$.`],
    answer: md`$L(x^k)=kx^k$, так что $T(L,\mathcal A,\mathcal A)=\operatorname{diag}(0,1,2)$.

В $\mathcal B$: $L(1)=0$; $L(x+1)=-1+(x+1)$; $L((x+1)^2)=-2(x+1)+2(x+1)^2$:
$$T(L,\mathcal B,\mathcal B)=\begin{pmatrix}0&-1&0\\0&1&-2\\0&0&2\end{pmatrix}.$$
Матрицы перехода: $C_{\mathcal A\leftarrow\mathcal B}=\begin{pmatrix}1&1&1\\0&1&2\\0&0&1\end{pmatrix}$ (столбцы — $1,\ x+1,\ x^2+2x+1$ в $\mathcal A$), $C_{\mathcal B\leftarrow\mathcal A}=\begin{pmatrix}1&-1&1\\0&1&-2\\0&0&1\end{pmatrix}$ (из $x=(x+1)-1$, $x^2=(x+1)^2-2(x+1)+1$). Произведение $C_{\mathcal B\leftarrow\mathcal A}\operatorname{diag}(0,1,2)C_{\mathcal A\leftarrow\mathcal B}$ совпадает с найденной матрицей.`,
  },
  {
    id: 'l-composition-order',
    topic: 'maps',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 7, задача 10',
    prompt: md`$\varphi:\mathbb V\to\mathbb W$, $\psi:\mathbb W\to\mathbb L$. Базисы: $\mathcal A$ в $\mathbb V$, $\mathcal F,\mathcal G$ в $\mathbb W$, $\mathcal H$ в $\mathbb L$. Известны $M=T(\varphi,\mathcal A,\mathcal F)$, $N=T(\psi,\mathcal G,\mathcal H)$, $C=C_{\mathcal G\leftarrow\mathcal F}$. Вырази $T(\psi\circ\varphi,\mathcal A,\mathcal H)$ и объясни порядок множителей, подписав столбец после каждого шага.`,
    hints: [md`Начни с $[\mathbf x]_{\mathcal A}$ и следи, в каком базисе записан столбец.`],
    answer: md`$[\mathbf x]_{\mathcal A}\xrightarrow{M}[\varphi(\mathbf x)]_{\mathcal F}\xrightarrow{C}[\varphi(\mathbf x)]_{\mathcal G}\xrightarrow{N}[\psi(\varphi(\mathbf x))]_{\mathcal H}$.

Значит, $T(\psi\circ\varphi,\mathcal A,\mathcal H)=NCM$. Первое действие над столбцом стоит справа. Без $C$ нельзя: $N$ принимает координаты в $\mathcal G$, а $M$ выдаёт в $\mathcal F$.`,
  },
  {
    id: 'l-commutant-rank1',
    topic: 'maps',
    skill: 'vectors',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 11',
    prompt: md`Докажи, что $\varphi_A(X)=AX-XA$ — линейный оператор на $\operatorname{Mat}_2(\mathbb R)$. Найди все $X$, коммутирующие с $A=\begin{pmatrix}1&3\\2&6\end{pmatrix}$.`,
    hints: [
      md`Сразу видно два решения: $I$ и сама $A$. Значит, $\operatorname{span}\{I,A\}$ точно внутри ответа.`,
      md`Запиши $AX=XA$ для $X=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ и реши систему.`,
    ],
    answer: md`Линейность: $\varphi_A(\lambda X+\mu Y)=A(\lambda X+\mu Y)-(\lambda X+\mu Y)A=\lambda\varphi_A(X)+\mu\varphi_A(Y)$.

$AX=\begin{pmatrix}a+3c&b+3d\\2a+6c&2b+6d\end{pmatrix}$, $XA=\begin{pmatrix}a+2b&3a+6b\\c+2d&3c+6d\end{pmatrix}$. Приравнивая: $3c=2b$ и $b+3d=3a+6b$, то есть $b=\frac32c$, $a=d-\frac52c$ (остальные уравнения следуют).

Ответ: $X=\alpha I+\beta A$, $\alpha,\beta\in\mathbb R$ (при $\beta=\frac c2$, $\alpha=d-6\beta$). Это ядро $\varphi_A$, $\dim=2$, базис $(I,A)$.`,
  },
  {
    id: 'l-even-part',
    topic: 'maps',
    skill: 'projection',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 7, задача 12',
    prompt: md`На $\mathbb V=\mathbb R[x]_{\le3}$: $P(p)(x)=\frac{p(x)+p(-x)}2$, $Q=\operatorname{Id}-P$.
1. Докажи, что $P$ линеен и $P^2=P$; проверь $Q^2=Q$, $PQ=QP=0$.
2. Представь $p$ в виде $u+v$ с $P(u)=u$, $P(v)=0$. Единственно ли?
3. Подбери один базис, где матрицы $P$ и $Q$ максимально просты.`,
    hints: [md`$P$ оставляет чётные степени: $P(a+bx+cx^2+dx^3)=a+cx^2$.`],
    answer: md`1. $P(a+bx+cx^2+dx^3)=a+cx^2$ — оставляет чётные степени, $Q$ — нечётные ($bx+dx^3$). Линейность: подстановки $p(x)$ и $p(-x)$ линейны по $p$. Повторное оставление чётной части ничего не меняет: $P^2=P$, аналогично $Q^2=Q$; чётная часть нечётной — ноль: $PQ=QP=0$.
2. $u=P(p)$, $v=Q(p)$. Единственно: если $p=\tilde u+\tilde v$ с теми же свойствами, применяем $P$: $P(p)=\tilde u$, значит, $\tilde u=u$ и $\tilde v=v$.
3. $\mathcal B=(1,\ x^2,\ x,\ x^3)$: $T(P)=\operatorname{diag}(1,1,0,0)$, $T(Q)=\operatorname{diag}(0,0,1,1)$.`,
  },
  {
    id: 'l-transpose-basis',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 14',
    prompt: md`$\tau(X)=X^{\mathsf T}$ на $\operatorname{Mat}_2(\mathbb R)$. Найди $T(\tau,\mathcal B,\mathcal B)$ для $\mathcal B=(E_{11},\ E_{12}+E_{21},\ E_{12}-E_{21},\ E_{22})$ и для стандартного $\mathcal E=(E_{11},E_{12},E_{21},E_{22})$. Почему в $\mathcal B$ ответ виден без вычислений?`,
    hints: [md`Какие из матриц $\mathcal B$ симметричны, а какие кососимметричны?`],
    answer: md`$E_{11},\ E_{12}+E_{21},\ E_{22}$ симметричны: $\tau$ их не меняет. $E_{12}-E_{21}$ кососимметрична: $\tau$ меняет знак. Поэтому
$$T(\tau,\mathcal B,\mathcal B)=\operatorname{diag}(1,1,-1,1).$$
В стандартном базисе $\tau$ меняет местами $E_{12}$ и $E_{21}$:
$$T(\tau,\mathcal E,\mathcal E)=\begin{pmatrix}1&0&0&0\\0&0&1&0\\0&1&0&0\\0&0&0&1\end{pmatrix}.$$
Это пример того, как удачный базис (из «собственных» векторов оператора) делает матрицу диагональной.`,
  },
  {
    id: 'l-left-mult',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 15',
    prompt: md`$\varphi(X)=AX$ на $\operatorname{Mat}_2(\mathbb R)$, $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$. Найди матрицу $\varphi$ в базисе $(E_{11},E_{12},E_{21},E_{22})$ и в базисе $(E_{11},E_{21},E_{12},E_{22})$. Что меняет перестановка?`,
    hints: [md`$AE_{11}=\begin{pmatrix}1&0\\3&0\end{pmatrix}$: умножение слева действует на каждый столбец $X$ отдельно.`],
    answer: md`$AE_{11}=\begin{pmatrix}1&0\\3&0\end{pmatrix}$, $AE_{12}=\begin{pmatrix}0&1\\0&3\end{pmatrix}$, $AE_{21}=\begin{pmatrix}2&0\\4&0\end{pmatrix}$, $AE_{22}=\begin{pmatrix}0&2\\0&4\end{pmatrix}$.

В $(E_{11},E_{12},E_{21},E_{22})$: $\begin{pmatrix}1&0&2&0\\0&1&0&2\\3&0&4&0\\0&3&0&4\end{pmatrix}$.

В $(E_{11},E_{21},E_{12},E_{22})$ переставлены и 2-й/3-й столбцы, и 2-я/3-я строки: $\begin{pmatrix}A&0\\0&A\end{pmatrix}$ — блочно-диагональная. Смысл: этот порядок записывает $X$ «по столбцам», а $A$ действует на каждый столбец $X$ отдельно.`,
  },
  {
    id: 'l-four-matrices',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 16',
    prompt: md`В $\mathbb R^2$ базисы $\mathcal A=(\mathbf e_1,\mathbf e_2)$ и $\mathcal B=(\mathbf e_1+\mathbf e_2,\ \mathbf e_1+2\mathbf e_2)$. Оператор задан правилом: если $[\mathbf x]_{\mathcal A}=(x,y)$, то $[\varphi(\mathbf x)]_{\mathcal B}=(2x-y,\ x+y)$. Найди $T(\varphi,\mathcal A,\mathcal A)$, $T(\varphi,\mathcal A,\mathcal B)$, $T(\varphi,\mathcal B,\mathcal A)$, $T(\varphi,\mathcal B,\mathcal B)$.`,
    hints: [md`Из условия сразу $M=T(\varphi,\mathcal A,\mathcal B)$. Пусть $P=C_{\mathcal A\leftarrow\mathcal B}$ — векторы $\mathcal B$ столбцами. Остальные: $PM$, $PMP$, $MP$ — какая какая?`],
    answer: md`$M=T(\varphi,\mathcal A,\mathcal B)=\begin{pmatrix}2&-1\\1&1\end{pmatrix}$ (прямо из условия), $P=C_{\mathcal A\leftarrow\mathcal B}=\begin{pmatrix}1&1\\1&2\end{pmatrix}$.
- $T(\varphi,\mathcal A,\mathcal A)=PM=\begin{pmatrix}3&0\\4&1\end{pmatrix}$ (выход переводим из $\mathcal B$ в $\mathcal A$);
- $T(\varphi,\mathcal B,\mathcal B)=MP=\begin{pmatrix}1&0\\2&3\end{pmatrix}$ (вход переводим из $\mathcal B$ в $\mathcal A$);
- $T(\varphi,\mathcal B,\mathcal A)=PMP=\begin{pmatrix}3&3\\5&6\end{pmatrix}$.

В $T(\varphi,\mathcal X,\mathcal Y)$ первый базис — смысл входного столбца, второй — выходного.`,
  },
  {
    id: 'l-antiderivative',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 7, задача 1',
    prompt: md`$\mathbb V=\operatorname{span}\{e^{-x},\ xe^{-x},\ x^2e^{-x}\}$, $\mathcal B$ — эти функции по порядку (это базис). Найди матрицу дифференцирования $D:\mathbb V\to\mathbb V$ в $\mathcal B$ и с помощью $D^{-1}$ найди $F\in\mathbb V$ с $F'=x^2e^{-x}$.`,
    hints: [md`$(x^ke^{-x})'=kx^{k-1}e^{-x}-x^ke^{-x}$. Нужно решить $D[F]_{\mathcal B}=(0,0,1)^{\mathsf T}$ — матрица треугольная.`],
    answer: md`$D(e^{-x})=-e^{-x}$, $D(xe^{-x})=e^{-x}-xe^{-x}$, $D(x^2e^{-x})=2xe^{-x}-x^2e^{-x}$:
$$T(D,\mathcal B,\mathcal B)=\begin{pmatrix}-1&1&0\\0&-1&2\\0&0&-1\end{pmatrix}.$$
Треугольная с ненулевой диагональю — обратима. Решаем $T\mathbf c=(0,0,1)^{\mathsf T}$ снизу вверх: $c_3=-1$; $-c_2+2c_3=0\Rightarrow c_2=-2$; $-c_1+c_2=0\Rightarrow c_1=-2$.

$F=-(x^2+2x+2)e^{-x}$. Проверка: $F'=-(2x+2)e^{-x}+(x^2+2x+2)e^{-x}=x^2e^{-x}$ ✓.`,
  },
  {
    id: 'l-inverse-series',
    topic: 'maps',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 7, задача 2',
    prompt: md`На $\mathbb R[x]_{\le n}$ задан оператор $\varphi(p)=p+p'$. Найди обратный оператор.`,
    hints: [md`$D^{n+1}=0$ на $\mathbb R[x]_{\le n}$. Вспомни $(1+t)(1-t+t^2-\dots)$.`],
    answer: md`$\varphi=\operatorname{Id}+D$, где $D$ — дифференцирование, и $D^{n+1}=0$. Положим
$$\psi(p)=p-p'+p''-\dots+(-1)^np^{(n)}=\sum_{k=0}^n(-1)^kD^kp.$$
Тогда $(\operatorname{Id}+D)\psi=\sum_{k=0}^n(-1)^kD^k+\sum_{k=0}^n(-1)^kD^{k+1}=\operatorname{Id}+(-1)^nD^{n+1}=\operatorname{Id}$ (сумма телескопическая), и так же $\psi(\operatorname{Id}+D)=\operatorname{Id}$. Ответ: $\psi(p)=\sum_{k=0}^n(-1)^kp^{(k)}$.`,
  },
  {
    id: 'l-conj-linear',
    topic: 'maps',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'По мотивам ДЗ 7, задача 5',
    prompt: md`$\varphi:\mathbb C\to\mathbb C$, $\varphi(z)=i\bar z$. Линейно ли $\varphi$, если $\mathbb C$ — пространство над $\mathbb R$? Над $\mathbb C$? Найди $T(\varphi,\mathcal B,\mathcal B)$ для базиса $\mathcal B=(1,i)$ над $\mathbb R$.`,
    hints: [md`Сравни $\varphi(i\cdot1)$ и $i\varphi(1)$.`],
    answer: md`**Над $\mathbb R$ — да:** для вещественных $\lambda,\mu$ $\ \overline{\lambda z+\mu w}=\lambda\bar z+\mu\bar w$, и умножение на $i$ линейно.

**Над $\mathbb C$ — нет:** $\varphi(i\cdot1)=i\cdot\bar i=i(-i)=1$, а $i\varphi(1)=i\cdot i=-1$.

Матрица: $\varphi(1)=i\to(0,1)$, $\varphi(i)=i\cdot(-i)=1\to(1,0)$: $T=\begin{pmatrix}0&1\\1&0\end{pmatrix}$.`,
  },
  {
    id: 'l-conjugation-iso',
    topic: 'maps',
    scales: [...R],
    type: 'prove',
    points: 1.5,
    source: 'ДЗ 7, задача 7',
    prompt: md`Пусть $U\in\operatorname{Mat}_n(\mathbb R)$ обратима. Докажи, что $\varphi(X)=UXU^{-1}$ — изоморфизм $\operatorname{Mat}_n(\mathbb R)\to\operatorname{Mat}_n(\mathbb R)$, и найди обратное.`,
    hints: [md`Линейность — раскрытие скобок. Обратное «снимает» $U$ с обеих сторон.`],
    answer: md`Линейность: $U(\lambda X+\mu Y)U^{-1}=\lambda UXU^{-1}+\mu UYU^{-1}$.

$\psi(Y)=U^{-1}YU$: $\psi(\varphi(X))=U^{-1}UXU^{-1}U=X$ и $\varphi(\psi(Y))=Y$. Есть двустороннее обратное — значит, $\varphi$ биективно, то есть изоморфизм, и $\varphi^{-1}=\psi$.`,
  },
  {
    id: 'l-tf-maps',
    topic: 'maps',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'Лонгрид 7, утверждение 2',
    prompt: md`Существует ли линейное $\varphi:\mathbb R^2\to\mathbb R^2$ такое, что
1. $\varphi(1,1)=(1,0)$ и $\varphi(2,2)=(1,0)$;
2. $\varphi(1,0)=(1,1)$ и $\varphi(0,1)=(1,1)$;
3. $\varphi(1,2)=(0,0)$, $\varphi(2,1)=(1,0)$ и $\varphi(3,3)=(1,0)$;
4. $\varphi(1,0)=(0,1)$ и $\varphi$ — изоморфизм?`,
    hints: [md`Значения на базисе — любые. Если векторы связаны соотношением, образы обязаны быть связаны тем же.`],
    answer: md`1. **Нет**: $(2,2)=2(1,1)$, значит, обязательно $\varphi(2,2)=(2,0)\ne(1,0)$.
2. **Да**: $(1,0),(0,1)$ — базис, значения на базисе любые; матрица $\begin{pmatrix}1&1\\1&1\end{pmatrix}$.
3. **Да**: $(3,3)=(1,2)+(2,1)$ и $(1,0)=(0,0)+(1,0)$ — соотношение сохранено; $(1,2),(2,1)$ — базис, отображение единственно.
4. **Да**: например, $\varphi(x,y)=(y,x)$ (перестановка координат) обратимо.`,
  },
  {
    id: 'l-tf-similar',
    topic: 'maps',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'Лонгрид 7, §6',
    prompt: md`Подобны ли матрицы? Обоснуй.
1. $\begin{pmatrix}1&0\\0&5\end{pmatrix}$ и $\begin{pmatrix}5&0\\0&1\end{pmatrix}$;
2. $I$ и $\begin{pmatrix}1&1\\0&1\end{pmatrix}$;
3. $0$ и $\begin{pmatrix}0&1\\0&0\end{pmatrix}$.`,
    hints: [md`Чему равна $C^{-1}IC$? А $C^{-1}0C$?`],
    answer: md`1. **Да**: это один оператор в базисах $(\mathbf e_1,\mathbf e_2)$ и $(\mathbf e_2,\mathbf e_1)$; $C=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, $C^{-1}MC$ переставляет диагональ.
2. **Нет**: для любой обратимой $C$ $\ C^{-1}IC=C^{-1}C=I\ne\begin{pmatrix}1&1\\0&1\end{pmatrix}$.
3. **Нет**: $C^{-1}0C=0$. Тождественный и нулевой операторы имеют одну и ту же матрицу в любом базисе.`,
  },
  {
    id: 'l-change-lagrange',
    topic: 'maps',
    skill: 'coords',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 7, задача 3',
    prompt: md`В $\mathbb R[x]_{\le2}$ даны базисы $\mathcal A=(a_1,a_2,a_3)=\big((x-1)(x-2),\ (x+1)(x-2),\ (x+1)(x-1)\big)$ и $\mathcal B=(1,x,x^2)$. Объясни, как найти координаты любого $p$ в $\mathcal A$ по значениям $p$ в удачных точках. Найди $C_{\mathcal B\leftarrow\mathcal A}$ и $C_{\mathcal A\leftarrow\mathcal B}$, не обращая матрицу.`,
    hints: [
      md`Подставь $x=-1$ в $p=c_1a_1+c_2a_2+c_3a_3$: какие слагаемые обнулятся? Какие точки взять для $c_2$ и $c_3$?`,
      md`Столбцы $C_{\mathcal A\leftarrow\mathcal B}$ — координаты $1,x,x^2$ в $\mathcal A$: примени найденные формулы к этим многочленам.`,
    ],
    answer: md`**Координаты.** Многочлен $a_1$ обнуляется в точках $1,2$, многочлен $a_2$ — в $-1,2$, многочлен $a_3$ — в $-1,1$. Подставляем точки в $p=c_1a_1+c_2a_2+c_3a_3$, остаётся по одному слагаемому. Так как $a_1(-1)=6$, $a_2(1)=-2$, $a_3(2)=3$, получаем
$$c_1=\frac{p(-1)}6,\qquad c_2=-\frac{p(1)}2,\qquad c_3=\frac{p(2)}3.$$
Для нулевого $p$ все $c_i=0$, поэтому три многочлена независимы и образуют базис трёхмерного пространства.

**$C_{\mathcal B\leftarrow\mathcal A}$.** В столбцах стоят многочлены $\mathcal A$ в базисе $(1,x,x^2)$: $a_1=x^2-3x+2$, $a_2=x^2-x-2$, $a_3=x^2-1$.

**$C_{\mathcal A\leftarrow\mathcal B}$.** В столбцах стоят координаты $1,x,x^2$ в $\mathcal A$, их дают те же формулы:
$$C_{\mathcal B\leftarrow\mathcal A}=\begin{pmatrix}2&-2&-1\\-3&-1&0\\1&1&1\end{pmatrix},\qquad C_{\mathcal A\leftarrow\mathcal B}=\begin{pmatrix}\frac16&-\frac16&\frac16\\-\frac12&-\frac12&-\frac12\\\frac13&\frac23&\frac43\end{pmatrix}.$$`,
  },
  {
    id: 'l-map-action',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 7, задача 4',
    prompt: md`Линейное отображение $\varphi:\mathbb R[x]_{\le2}\to\mathbb R[x]_{\le2}$ задано правилом $\varphi(ax^2+bx+c)=cx^2+ax$. Найди $T(\varphi,\mathcal A,\mathcal B)$ для базисов $\mathcal A=(1+x,\ 1-x^2,\ x+x^2)$ и $\mathcal B=(1,\ 1+x,\ x+x^2)$. Объясни, что записано в каждом столбце.`,
    hints: [
      md`Сначала образы векторов $\mathcal A$. Например, у $1+x$ коэффициенты $a=0$, $b=1$, $c=1$.`,
      md`Потом выражай образы через $\mathcal B$: $x=(1+x)-1$, $x^2=(x+x^2)-x$.`,
    ],
    answer: md`В $j$-м столбце стоят координаты образа $j$-го вектора $\mathcal A$ **в базисе $\mathcal B$**.

Образы: $\varphi(1+x)=x^2$, $\varphi(1-x^2)=x^2-x$, $\varphi(x+x^2)=x$.

Координаты в $\mathcal B$. Из $x=(1+x)-1$ получаем $[x]_{\mathcal B}=(-1,1,0)^{\mathsf T}$. Из $x^2=(x+x^2)-x$ получаем $[x^2]_{\mathcal B}=(1,-1,1)^{\mathsf T}$. Значит, $[x^2-x]_{\mathcal B}=(2,-2,1)^{\mathsf T}$.
$$T(\varphi,\mathcal A,\mathcal B)=\begin{pmatrix}1&2&-1\\-1&-2&1\\1&1&0\end{pmatrix}.$$`,
  },
  {
    id: 'l-transpose-columns',
    topic: 'maps',
    skill: 'map-matrix',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 7, задача 14',
    prompt: md`$\tau(X)=X^{\mathsf T}$ на $\operatorname{Mat}_2(\mathbb R)$, базис $\mathcal B=(B_1,B_2,B_3,B_4)=(E_{11}+E_{21},\ E_{12},\ E_{21},\ E_{12}+E_{22})$. Найди $T(\tau,\mathcal B,\mathcal B)$. Почему здесь проще считать по столбцам, чем через формулу замены базиса?`,
    hints: [md`Сначала разложи произвольную матрицу по $\mathcal B$: $\begin{pmatrix}a&b\\c&d\end{pmatrix}=aB_1+(b-d)B_2+(c-a)B_3+dB_4$.`],
    answer: md`Разложение из подсказки существует и единственно для любой матрицы, поэтому $\mathcal B$ — базис, а координаты читаются сразу.

Транспонируем базисные матрицы и подставляем в формулу:
- $\tau(B_1)=E_{11}+E_{12}=B_1+B_2-B_3$;
- $\tau(B_2)=E_{21}=B_3$;
- $\tau(B_3)=E_{12}=B_2$;
- $\tau(B_4)=E_{21}+E_{22}=-B_2+B_3+B_4$.

Коэффициенты ставим в столбцы:
$$T(\tau,\mathcal B,\mathcal B)=\begin{pmatrix}1&0&0&0\\1&0&1&-1\\-1&1&0&1\\0&0&0&1\end{pmatrix}.$$
Здесь достаточно транспонировать четыре простые матрицы. Формула замены базиса потребовала бы ещё строить и обращать матрицу $4\times4$.`,
  },

  // ======================= Неделя 8: ядро, образ, сумма, прямая сумма =======================
  {
    id: 'l-ker-im-matrix',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 1',
    prompt: md`$\varphi:\mathbb R^3\to\mathbb R^4$ задано матрицей
$$A=\begin{pmatrix}1&2&1\\0&1&1\\1&3&2\\2&5&3\end{pmatrix}.$$
Найди базисы $\ker\varphi$ и $\operatorname{Im}\varphi$. Инъективно ли $\varphi$? Сюръективно? Постарайся увидеть ответ, глядя на столбцы.`,
    hints: [md`Сравни третий столбец с разностью второго и первого.`],
    answer: md`Столбцы: $\mathbf a_3=\mathbf a_2-\mathbf a_1$, то есть $\mathbf a_1-\mathbf a_2+\mathbf a_3=\mathbf 0$, значит, $(1,-1,1)^{\mathsf T}\in\ker\varphi$. При этом $\mathbf a_1,\mathbf a_2$ непропорциональны.

$\operatorname{Im}\varphi=\operatorname{span}\{\mathbf a_1,\mathbf a_2,\mathbf a_3\}=\operatorname{span}\{\mathbf a_1,\mathbf a_2\}$, базис $(\mathbf a_1,\mathbf a_2)$, размерность 2 $<4$ — **не сюръективно**.

$\ker\varphi$: $A\mathbf x=x_1\mathbf a_1+x_2\mathbf a_2+x_3(\mathbf a_2-\mathbf a_1)=(x_1-x_3)\mathbf a_1+(x_2+x_3)\mathbf a_2=\mathbf 0\iff x_1=x_3,\ x_2=-x_3$. Базис $\ker\varphi$: $(1,-1,1)^{\mathsf T}$ — ядро ненулевое, **не инъективно**.`,
  },
  {
    id: 'l-ker-im-poly',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 2',
    prompt: md`$\varphi:\mathbb R[x]_{\le2}\to\mathbb R[x]_{\le2}$, $\varphi(f)=f'(x)+f(1)$. Проверь линейность, найди базисы $\ker\varphi$ и $\operatorname{Im}\varphi$. Изоморфизм ли это?`,
    hints: [md`$\varphi(1)=1$, $\varphi(x)=2$, $\varphi(x^2)=2x+1$.`],
    answer: md`Производная и значение в точке линейны — $\varphi$ линейно.

Образы базиса: $\varphi(1)=1$, $\varphi(x)=1+1=2$, $\varphi(x^2)=2x+1$. Видно: $\varphi(x)=2\varphi(1)$, значит, $\varphi(x-2)=0$, $x-2\in\ker\varphi$.

$\operatorname{Im}\varphi=\operatorname{span}\{1,\ 2x+1\}=\mathbb R[x]_{\le1}$, базис $(1,\ x)$.

$\ker\varphi$: $\varphi(a+bx+cx^2)=(a+2b+c)+2cx=0\iff c=0,\ a=-2b$. Базис $\ker\varphi$: $x-2$.

Не изоморфизм: ядро ненулевое (и образ не всё пространство).`,
  },
  {
    id: 'l-im-eq-ker',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'construct',
    points: 2,
    source: 'По мотивам семинара 8, задача 3',
    prompt: md`Построй оператор $\varphi$ на $\mathbb R^2$, для которого $\operatorname{Im}\varphi=\ker\varphi$. Затем — на $\mathbb R^4$. Выпиши матрицы и проверь равенство.`,
    hints: [md`Нужно $\varphi^2=0$, причём «ровно»: $\varphi(\mathbf e_1)=\mathbf 0$, $\varphi(\mathbf e_2)=\mathbf e_1$.`],
    answer: md`$\mathbb R^2$: $\varphi(\mathbf e_1)=\mathbf 0$, $\varphi(\mathbf e_2)=\mathbf e_1$, матрица $\begin{pmatrix}0&1\\0&0\end{pmatrix}$. $\varphi(x,y)=(y,0)$: $\ker\varphi=\{y=0\}=\operatorname{span}\{\mathbf e_1\}$, $\operatorname{Im}\varphi=\operatorname{span}\{\mathbf e_1\}$.

$\mathbb R^4$: $\mathbf e_3\mapsto\mathbf e_1$, $\mathbf e_4\mapsto\mathbf e_2$, $\mathbf e_1,\mathbf e_2\mapsto\mathbf 0$:
$$\begin{pmatrix}0&0&1&0\\0&0&0&1\\0&0&0&0\\0&0&0&0\end{pmatrix},\quad \varphi(x_1,x_2,x_3,x_4)=(x_3,x_4,0,0).$$
$\ker\varphi=\{x_3=x_4=0\}=\operatorname{span}\{\mathbf e_1,\mathbf e_2\}=\operatorname{Im}\varphi$.`,
  },
  {
    id: 'l-span-map',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'prove',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 4',
    prompt: md`Для $\mathbf v_1,\dots,\mathbf v_m\in\mathbb V$ рассмотрим $\Phi:\mathbb F^m\to\mathbb V$, $\Phi(x_1,\dots,x_m)=x_1\mathbf v_1+\dots+x_m\mathbf v_m$. Какое свойство $\Phi$ означает, что система порождает $\mathbb V$? Что она независима? Что она базис? Обоснуй.`,
    hints: [md`Что такое $\operatorname{Im}\Phi$ и $\ker\Phi$ на языке линейных комбинаций?`],
    answer: md`$\operatorname{Im}\Phi$ — все комбинации $\mathbf v_i$, то есть $\operatorname{span}\{\mathbf v_i\}$. Поэтому **порождает $\iff$ $\Phi$ сюръективно**.

$\ker\Phi$ — наборы коэффициентов, дающие нулевую комбинацию. Независимость — это $\ker\Phi=\{\mathbf 0\}$, то есть **независима $\iff$ $\Phi$ инъективно** (критерий инъективности).

**Базис $\iff$ $\Phi$ — изоморфизм** (обратное к нему — координатная функция).`,
  },
  {
    id: 'l-sum-lines',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 5',
    prompt: md`В $\mathbb R^3$: $\mathbb U=\{(t,2t,-t)\mid t\in\mathbb R\}$, $\mathbb W=\{(s,s,0)\mid s\in\mathbb R\}$. Опиши $\mathbb U+\mathbb W$ уравнением и геометрически. Прямая ли сумма?`,
    hints: [md`Это две непропорциональные прямые через ноль. Уравнение плоскости $ax+by+cz=0$ подбери так, чтобы оба направляющих вектора ему удовлетворяли.`],
    answer: md`$\mathbb U=\operatorname{span}\{(1,2,-1)\}$, $\mathbb W=\operatorname{span}\{(1,1,0)\}$ — две разные прямые через ноль. Сумма — плоскость $\operatorname{span}\{(1,2,-1),(1,1,0)\}$.

Уравнение: из $a+b=0$ (для $(1,1,0)$) и $a+2b-c=0$ (для $(1,2,-1)$): $(a,b,c)=(1,-1,-1)$. Плоскость $x-y-z=0$.

Сумма **прямая**: $\mathbb U\cap\mathbb W=\{\mathbf 0\}$ — векторы непропорциональны.`,
  },
  {
    id: 'l-span-to-eqs',
    topic: 'kernel',
    skill: 'intersection',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 6',
    prompt: md`$\mathbb U=\operatorname{span}\{(1,0,1,1),\ (0,1,1,2)\}\subseteq\mathbb R^4$. Найди матрицу $A$ с $\mathbb U=\ker A$ и обоснуй равенство (оба включения).`,
    hints: [md`Общий вектор $\mathbb U$: $a(1,0,1,1)+b(0,1,1,2)=(a,\ b,\ a+b,\ a+2b)$. Исключи $a,b$.`],
    answer: md`Общий вектор $(a,b,a+b,a+2b)$: его координаты удовлетворяют $x_3=x_1+x_2$, $x_4=x_1+2x_2$. Берём
$$A=\begin{pmatrix}1&1&-1&0\\1&2&0&-1\end{pmatrix}.$$
$\mathbb U\subseteq\ker A$ — проверено выше. Обратно, если $A\mathbf x=\mathbf 0$, то $\mathbf x=(x_1,x_2,x_1+x_2,x_1+2x_2)=x_1(1,0,1,1)+x_2(0,1,1,2)\in\mathbb U$. Значит, $\mathbb U=\ker A$.`,
  },
  {
    id: 'l-sum-cap-eqs',
    topic: 'kernel',
    skill: 'intersection',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 7',
    prompt: md`В $\mathbb R^4$: $\mathbb U=\{x_1+x_2+x_3+x_4=0\}$, $\mathbb W=\{x_1=x_2,\ x_3=x_4\}$. Найди базисы $\mathbb U\cap\mathbb W$ и $\mathbb U+\mathbb W$.`,
    hints: [
      md`Общий вектор $\mathbb W$ — $(a,a,b,b)$. Подставь в уравнение $\mathbb U$.`,
      md`$\dim\mathbb U=3$. Что будет, если добавить к базису $\mathbb U$ вектор вне $\mathbb U$?`,
    ],
    answer: md`**Пересечение:** $(a,a,b,b)\in\mathbb U\iff2a+2b=0$. $\ \mathbb U\cap\mathbb W=\operatorname{span}\{(1,1,-1,-1)\}$.

**Сумма:** базис $\mathbb U$ — $(1,-1,0,0),(0,1,-1,0),(0,0,1,-1)$ (ступенчатые, 3 штуки; одно уравнение на 4 неизвестных). Вектор $(1,1,0,0)\in\mathbb W$ не лежит в $\mathbb U$ (сумма координат 2), значит, четыре вектора независимы, и в $\mathbb R^4$ это базис. $\mathbb U+\mathbb W=\mathbb R^4$, базис — стандартный (или найденные 4 вектора).`,
  },
  {
    id: 'l-span-cap-ker',
    topic: 'kernel',
    skill: 'intersection',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 8 и ДЗ 8, задача 3',
    prompt: md`$\mathbb U=\operatorname{span}\{\mathbf u_1,\mathbf u_2\}$, $\mathbf u_1=(1,0,1,0)$, $\mathbf u_2=(0,1,0,1)$; $\ \mathbb W=\ker\begin{pmatrix}1&-1&1&-1\end{pmatrix}\subseteq\mathbb R^4$. Найди базисы $\mathbb U\cap\mathbb W$ и $\mathbb U+\mathbb W$. Сформулируй общий алгоритм для пары «оболочка + уравнения».`,
    hints: [md`Вектор $c_1\mathbf u_1+c_2\mathbf u_2$ лежит в $\mathbb W$, если $B(c_1\mathbf u_1+c_2\mathbf u_2)=c_1B\mathbf u_1+c_2B\mathbf u_2=0$.`],
    answer: md`$B\mathbf u_1=2$, $B\mathbf u_2=-2$. Условие $2c_1-2c_2=0$, $c_1=c_2$. $\ \mathbb U\cap\mathbb W=\operatorname{span}\{\mathbf u_1+\mathbf u_2\}=\operatorname{span}\{(1,1,1,1)\}$.

$\dim\mathbb W=3$ (одно уравнение), $\mathbf u_1\notin\mathbb W$ — добавив его к базису $\mathbb W$, получаем 4 независимых вектора: $\mathbb U+\mathbb W=\mathbb R^4$.

**Алгоритм.** Пересечение: решаем $BA\mathbf c=\mathbf 0$ ($A$ — порождающие $\mathbb U$ столбцами), для базиса решений берём векторы $A\mathbf c$ (это векторы пересечения, а не коэффициенты!). Сумма: находим базис $\mathbb W$ (ФСР), ставим вместе с порождающими $\mathbb U$ столбцами, оставляем столбцы на ведущих позициях.`,
  },
  {
    id: 'l-complement',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'construct',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 10 и ДЗ 8, задача 4',
    prompt: md`Найди какое-нибудь прямое дополнение к $\mathbb U=\operatorname{span}\{(1,2,0,1),\ (0,1,1,1)\}$ в $\mathbb R^4$. Обоснуй, что сумма прямая и равна $\mathbb R^4$. Единственно ли дополнение?`,
    hints: [md`Запиши векторы строками и приведи к ступенчатому виду. Какие столбцы без ведущих элементов?`],
    answer: md`Строки $(1,2,0,1),(0,1,1,1)$ уже ступенчатые, ведущие элементы в 1-м и 2-м столбцах. Добавляем $\mathbf e_3,\mathbf e_4$: строки $(1,2,0,1),(0,1,1,1),(0,0,1,0),(0,0,0,1)$ независимы (ступенчатый вид) — базис $\mathbb R^4$. Берём $\mathbb W=\operatorname{span}\{\mathbf e_3,\mathbf e_4\}$.

**Сумма — всё $\mathbb R^4$:** базис $\mathbb R^4$ лежит в $\mathbb U+\mathbb W$.

**Пересечение нулевое:** если $a\mathbf u_1+b\mathbf u_2=c\mathbf e_3+d\mathbf e_4$, то $a\mathbf u_1+b\mathbf u_2-c\mathbf e_3-d\mathbf e_4=\mathbf 0$. По независимости все коэффициенты нули, так что общий вектор — нулевой.

Значит, $\mathbb R^4=\mathbb U\oplus\mathbb W$.

Не единственно: подходит, например, и $\operatorname{span}\{\mathbf e_3+\mathbf e_1,\ \mathbf e_4\}$ — дополнений бесконечно много.`,
  },
  {
    id: 'l-complement-poly',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'construct',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 12',
    prompt: md`$\mathbb U=\{p\in\mathbb R[t]_{\le3}\mid p(2)=0\}$. Найди базис $\mathbb U$, прямое дополнение, и опиши **все** одномерные прямые дополнения к $\mathbb U$.`,
    hints: [md`В базисе, «сдвинутом» в точку 2, условие читается сразу. Для $\operatorname{span}\{q\}$: когда $q\in\mathbb U$?`],
    answer: md`$\mathbb U=\operatorname{span}\{t-2,\ (t-2)^2,\ (t-2)^3\}$ (делимость на $t-2$; степени различны). Добавив $1$, получаем базис $\mathbb R[t]_{\le3}$, поэтому $\mathbb R[t]_{\le3}=\mathbb U\oplus\operatorname{span}\{1\}$.

**Все одномерные дополнения:** $\operatorname{span}\{q\}$ с $q(2)\ne0$. Если $q(2)=0$, то $q\in\mathbb U$ — не дополнение. Если $q(2)\ne0$: для любого $p$ положим $c=\frac{p(2)}{q(2)}$, тогда $p=(p-cq)+cq$ с $p-cq\in\mathbb U$; а $\mathbb U\cap\operatorname{span}\{q\}=\{\mathbf 0\}$, так как $(\lambda q)(2)=0\Rightarrow\lambda=0$.`,
  },
  {
    id: 'l-involution',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'Семинар 8, задача 11',
    prompt: md`Пусть $\varphi$ — оператор на $\mathbb V$ над $\mathbb R$, $\varphi^2=\operatorname{Id}$. Докажи, что $\mathbb V=\ker(\varphi-\operatorname{Id})\oplus\ker(\varphi+\operatorname{Id})$, и найди проекторы на слагаемые.`,
    hints: [md`$\mathbf x=\frac{\mathbf x+\varphi(\mathbf x)}2+\frac{\mathbf x-\varphi(\mathbf x)}2$.`],
    answer: md`$\mathbb U=\ker(\varphi-\operatorname{Id})=\{\varphi(\mathbf u)=\mathbf u\}$, $\mathbb W=\ker(\varphi+\operatorname{Id})=\{\varphi(\mathbf w)=-\mathbf w\}$.

**Сумма — всё $\mathbb V$:** $\varphi(\mathbf x+\varphi\mathbf x)=\varphi\mathbf x+\mathbf x$, так что $\mathbf x+\varphi\mathbf x\in\mathbb U$; $\varphi(\mathbf x-\varphi\mathbf x)=\varphi\mathbf x-\mathbf x$, так что $\mathbf x-\varphi\mathbf x\in\mathbb W$. И $\mathbf x=\frac{\mathbf x+\varphi\mathbf x}2+\frac{\mathbf x-\varphi\mathbf x}2$.

**Прямая:** если $\mathbf z\in\mathbb U\cap\mathbb W$, то $\mathbf z=\varphi\mathbf z=-\mathbf z$, $2\mathbf z=\mathbf 0$, $\mathbf z=\mathbf 0$.

По единственности разложения проекторы: $P_{\mathbb U}=\frac{\operatorname{Id}+\varphi}2$, $P_{\mathbb W}=\frac{\operatorname{Id}-\varphi}2$. (Пример: $\varphi(A)=A^{\mathsf T}$ — симметричная и кососимметричная части.)`,
  },
  {
    id: 'l-projections',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 13',
    prompt: md`$\mathbb U=\operatorname{span}\{(1,1,0,0),(0,0,1,1)\}$, $\mathbb W=\operatorname{span}\{(1,-1,0,0),(0,0,1,-1)\}$. Докажи, что $\mathbb R^4=\mathbb U\oplus\mathbb W$, и найди проекцию $\mathbf v=(3,1,2,4)$ на $\mathbb U$ вдоль $\mathbb W$ и на $\mathbb W$ вдоль $\mathbb U$.`,
    hints: [md`Первые две координаты и последние две «живут» отдельно: $(x,y)=\frac{x+y}2(1,1)+\frac{x-y}2(1,-1)$.`],
    answer: md`Четыре вектора — базис $\mathbb R^4$: в паре координат $(x,y)$ векторы $(1,1),(1,-1)$ — базис $\mathbb R^2$, и то же для $(z,t)$.

**Сумма — всё $\mathbb R^4$:** базис $\mathbb R^4$ лежит в $\mathbb U+\mathbb W$. **Пересечение нулевое:** общий вектор дал бы нетривиальное соотношение между четырьмя векторами базиса. Значит, $\mathbb R^4=\mathbb U\oplus\mathbb W$.

$(3,1)=2(1,1)+1(1,-1)$, $(2,4)=3(1,1)-1(1,-1)$. Поэтому
$$P_{\mathbb U}\mathbf v=(2,2,3,3),\qquad P_{\mathbb W}\mathbf v=(1,-1,-1,1).$$
Проверка: сумма равна $(3,1,2,4)$.`,
  },
  {
    id: 'l-even-odd',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 14',
    prompt: md`Пространство всех функций $\mathbb R\to\mathbb R$ раскладывается в прямую сумму чётных и нечётных. Выпиши проекторы и найди обе компоненты $f(x)=(x+1)^3$. Почему сумма прямая?`,
    hints: [md`$f_{\rm even}(x)=\frac{f(x)+f(-x)}2$.`],
    answer: md`$P_{\rm even}f(x)=\frac{f(x)+f(-x)}2$, $P_{\rm odd}f(x)=\frac{f(x)-f(-x)}2$: первая функция чётна, вторая нечётна, сумма равна $f$. Функция, которая и чётна, и нечётна, равна нулю ($f(x)=f(-x)=-f(x)$), — пересечение нулевое, сумма прямая.

$(x+1)^3=x^3+3x^2+3x+1$: чётная часть $3x^2+1$, нечётная $x^3+3x$ (просто чётные и нечётные степени).`,
  },
  {
    id: 'l-functional',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'Семинар 8, задача 15',
    prompt: md`Пусть $\xi:\mathbb V\to\mathbb F$ — ненулевое линейное отображение и $\mathbf u\notin\ker\xi$. Докажи, что $\mathbb V=\ker\xi\oplus\operatorname{span}\{\mathbf u\}$, и выпиши проектор на $\ker\xi$ вдоль $\operatorname{span}\{\mathbf u\}$.`,
    hints: [md`Подбери $c$ так, чтобы $\xi(\mathbf x-c\mathbf u)=0$.`],
    answer: md`$\xi(\mathbf u)\ne0$. Для любого $\mathbf x$: $\mathbf x=\left(\mathbf x-\frac{\xi(\mathbf x)}{\xi(\mathbf u)}\mathbf u\right)+\frac{\xi(\mathbf x)}{\xi(\mathbf u)}\mathbf u$, первое слагаемое в $\ker\xi$ (применяем $\xi$ — получаем 0), второе в $\operatorname{span}\{\mathbf u\}$.

Прямая: если $c\mathbf u\in\ker\xi$, то $c\,\xi(\mathbf u)=0$, $c=0$.

Проектор: $P(\mathbf x)=\mathbf x-\frac{\xi(\mathbf x)}{\xi(\mathbf u)}\mathbf u$. (Это обобщение предыдущей задачи про $p(2)=0$: там $\xi(p)=p(2)$.)`,
  },
  {
    id: 'l-ker-left-mult',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 8, задача 2',
    prompt: md`$\varphi:\operatorname{Mat}_2(\mathbb R)\to\operatorname{Mat}_{3\times2}(\mathbb R)$, $\varphi(X)=MX$, $M=\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$. Найди $\ker\varphi$ и $\operatorname{Im}\varphi$ (базисы — матрицами). Инъективно? Сюръективно?`,
    hints: [md`$MX$ — это строки $X$: первая, вторая и их сумма.`],
    answer: md`Если строки $X$ — $\mathbf r_1,\mathbf r_2$, то у $MX$ строки $\mathbf r_1,\ \mathbf r_2,\ \mathbf r_1+\mathbf r_2$.

$\ker\varphi$: $MX=0\Rightarrow\mathbf r_1=\mathbf r_2=\mathbf 0$, $\ker\varphi=\{0\}$ — **инъективно**.

$\operatorname{Im}\varphi=\{Y\in\operatorname{Mat}_{3\times2}\mid\text{третья строка}=\text{первая}+\text{вторая}\}$, базис $ME_{11},ME_{12},ME_{21},ME_{22}$:
$$\begin{pmatrix}1&0\\0&0\\1&0\end{pmatrix},\ \begin{pmatrix}0&1\\0&0\\0&1\end{pmatrix},\ \begin{pmatrix}0&0\\1&0\\1&0\end{pmatrix},\ \begin{pmatrix}0&0\\0&1\\0&1\end{pmatrix}.$$
$\dim\operatorname{Im}=4<6$ — **не сюръективно**.`,
  },
  {
    id: 'l-complement-family',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'construct',
    points: 1.5,
    source: 'По мотивам ДЗ 8, задача 6',
    prompt: md`$\mathbb U=\{(x,x,y,y)\mid x,y\in\mathbb R\}\subseteq\mathbb R^4$. Найди прямое дополнение к $\mathbb U$, а затем семейство попарно различных дополнений, зависящее от параметра $t\in\mathbb R$. Обоснуй.`,
    hints: [md`Возьми $\mathbb W_t=\operatorname{span}\{\mathbf e_1,\ \mathbf e_3+t\mathbf e_2\}$.`],
    answer: md`$\mathbb U=\operatorname{span}\{(1,1,0,0),(0,0,1,1)\}$. Дополнение $\mathbb W=\operatorname{span}\{\mathbf e_1,\mathbf e_3\}$: четыре вектора $(1,1,0,0),(0,0,1,1),\mathbf e_1,\mathbf e_3$ порождают $\mathbf e_2$ и $\mathbf e_4$, значит, базис.

**Семейство** $\mathbb W_t=\operatorname{span}\{\mathbf e_1,\ \mathbf e_3+t\mathbf e_2\}$. Пересечение с $\mathbb U$: $a\mathbf e_1+b(\mathbf e_3+t\mathbf e_2)=(a,bt,b,0)\in\mathbb U$ требует $b=0$ (4-я координата равна 3-й), затем $a=0$. Значит, $\mathbb U\cap\mathbb W_t=\{\mathbf 0\}$; размерности $2+2$ — вместе базис $\mathbb R^4$ (4 независимых вектора), так что $\mathbb R^4=\mathbb U\oplus\mathbb W_t$.

Попарно различны: $\mathbf e_3+t\mathbf e_2\in\mathbb W_s$ только при $s=t$ (у векторов $\mathbb W_s$ вторая координата равна $s\cdot$третья).`,
  },
  {
    id: 'l-tf-kernel-circle',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'По мотивам ДЗ 8, задача 7',
    prompt: md`Существует ли линейное $\varphi:\mathbb R^2\to\mathbb R^2$, ядро которого равно
1. окружности $x^2+y^2=1$;
2. прямой $\operatorname{span}\{(2,1)\}$;
3. $\mathbb R^2$;
4. двум прямым $y=\pm x$?

Если да — приведи матрицу.`,
    hints: [md`Ядро всегда подпространство.`],
    answer: md`1. **Нет**: ядро — подпространство и содержит $\mathbf 0$, а окружность — нет.
2. **Да**: например, $\begin{pmatrix}1&-2\\0&0\end{pmatrix}$: $x-2y=0\iff(x,y)\in\operatorname{span}\{(2,1)\}$.
3. **Да**: нулевая матрица.
4. **Нет**: объединение двух прямых не замкнуто относительно сложения ($(1,1)+(1,-1)=(2,0)$), значит, не подпространство.`,
  },
  {
    id: 'l-tf-projector',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'Лонгрид 8, §6',
    prompt: md`Верно ли, что для оператора $P$ с $P^2=P$:
1. $P=0$ или $P=\operatorname{Id}$;
2. $\operatorname{Id}-P$ тоже проектор;
3. $\operatorname{Im}P\cap\ker P=\{\mathbf 0\}$;
4. $P$ — проектор на $\operatorname{Im}P$ вдоль любого дополнения к $\operatorname{Im}P$?`,
    hints: [md`Посмотри на $P(x,y)=(x,0)$.`],
    answer: md`1. **Неверно**: $P(x,y)=(x,0)$, $P^2=P$, но $P\ne0,\operatorname{Id}$.
2. **Верно**: $(\operatorname{Id}-P)^2=\operatorname{Id}-2P+P^2=\operatorname{Id}-P$.
3. **Верно**: если $\mathbf y=P\mathbf z$ и $P\mathbf y=\mathbf 0$, то $\mathbf y=P\mathbf z=P^2\mathbf z=P\mathbf y=\mathbf 0$.
4. **Неверно**: «вдоль» — ровно вдоль $\ker P$. Например, $P(x,y)=(x,0)$ проектирует на $Ox$ вдоль $Oy$, а не вдоль прямой $y=x$.`,
  },
  {
    id: 'l-tf-ker-im',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'true-false',
    points: 1.5,
    source: 'Лонгрид 8, §1–2',
    prompt: md`Верно ли:
1. если $A\in\operatorname{Mat}_{3\times5}$, то $\varphi_A$ не инъективно;
2. если $A\in\operatorname{Mat}_{5\times3}$, то $\varphi_A$ не сюръективно;
3. если два столбца $A$ совпадают, то $\ker A\ne\{\mathbf 0\}$;
4. если $\ker\varphi=\{\mathbf 0\}$, то $\varphi$ переводит независимые системы в независимые?`,
    hints: [md`Основная лемма: сколько векторов в $\mathbb R^3$ могут быть независимы?`],
    answer: md`1. **Верно**: 5 столбцов в $\mathbb R^3$ зависимы, нетривиальная зависимость столбцов — ненулевой вектор ядра.
2. **Верно**: $\operatorname{Im}\varphi_A$ — оболочка 3 столбцов, её размерность $\le3<5$.
3. **Верно**: если $\mathbf a_i=\mathbf a_j$, то $\mathbf e_i-\mathbf e_j\in\ker A$.
4. **Верно**: если $\sum c_i\varphi(\mathbf v_i)=\mathbf 0$, то $\varphi(\sum c_i\mathbf v_i)=\mathbf 0$, $\sum c_i\mathbf v_i\in\ker\varphi=\{\mathbf 0\}$, и по независимости $\mathbf v_i$ все $c_i=0$.`,
  },
  {
    id: 'l-kernel-subspace-prove',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'prove',
    points: 1.5,
    source: 'Лонгрид 8, утверждения 1–2',
    prompt: md`Докажи, что ядро линейного отображения — подпространство и что $\varphi$ инъективно $\iff\ker\varphi=\{\mathbf 0\}$.`,
    hints: [md`Критерий подпространства. Для инъективности: $\varphi(\mathbf x)=\varphi(\mathbf y)\Rightarrow\varphi(\mathbf x-\mathbf y)=\mathbf 0$.`],
    answer: md`**Подпространство:** $\varphi(\mathbf 0)=\mathbf 0$, так что $\mathbf 0\in\ker\varphi$; если $\varphi(\mathbf x)=\varphi(\mathbf y)=\mathbf 0$, то $\varphi(\lambda\mathbf x+\mu\mathbf y)=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)=\mathbf 0$.

**$\Rightarrow$:** если $\varphi(\mathbf x)=\mathbf 0=\varphi(\mathbf 0)$, по инъективности $\mathbf x=\mathbf 0$.

**$\Leftarrow$:** если $\varphi(\mathbf x)=\varphi(\mathbf y)$, то $\varphi(\mathbf x-\mathbf y)=\mathbf 0$, $\mathbf x-\mathbf y\in\ker\varphi=\{\mathbf 0\}$, $\mathbf x=\mathbf y$.`,
  },
  {
    id: 'l-direct-sum-prove',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'prove',
    points: 2,
    source: 'Лонгрид 8, утверждение 4',
    prompt: md`Докажи: сумма $\mathbb U+\mathbb L$ прямая тогда и только тогда, когда $\mathbb U\cap\mathbb L=\{\mathbf 0\}$.`,
    hints: [md`Вектор $\mathbf z$ из пересечения даёт два разложения нуля: $\mathbf 0+\mathbf 0$ и $\mathbf z+(-\mathbf z)$.`],
    answer: md`**$\Rightarrow$:** для $\mathbf z\in\mathbb U\cap\mathbb L$ нуль раскладывается как $\mathbf 0+\mathbf 0$ и как $\mathbf z+(-\mathbf z)$ ($\mathbf z\in\mathbb U$, $-\mathbf z\in\mathbb L$). По единственности $\mathbf z=\mathbf 0$.

**$\Leftarrow$:** если $\mathbf u_1+\mathbf l_1=\mathbf u_2+\mathbf l_2$, то $\mathbf u_1-\mathbf u_2=\mathbf l_2-\mathbf l_1$ лежит и в $\mathbb U$, и в $\mathbb L$, то есть равен $\mathbf 0$. Значит, $\mathbf u_1=\mathbf u_2$, $\mathbf l_1=\mathbf l_2$ — разложение единственно.`,
  },
  {
    id: 'l-ker-left-mult-2',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 8, задача 2',
    prompt: md`$\varphi:\operatorname{Mat}_2(\mathbb R)\to\operatorname{Mat}_{3\times2}(\mathbb R)$, $\varphi(X)=MX$, $M=\begin{pmatrix}1&2\\2&4\\3&6\end{pmatrix}$. Найди базисы $\ker\varphi$ и $\operatorname{Im}\varphi$: базисные векторы здесь сами матрицы. Инъективно ли $\varphi$? Сюръективно?`,
    hints: [md`Если $\mathbf x_1,\mathbf x_2$ — столбцы $X$, то столбцы $MX$ — это $M\mathbf x_1$ и $M\mathbf x_2$. Значит, всё сводится к $\ker M$ и $\operatorname{Im}M$.`],
    answer: md`Второй столбец $M$ вдвое больше первого, поэтому $\ker M=\operatorname{span}\{(2,-1)^{\mathsf T}\}$ и $\operatorname{Im}M=\operatorname{span}\{(1,2,3)^{\mathsf T}\}$. Столбцы $MX$ — это $M\mathbf x_1$ и $M\mathbf x_2$, каждый столбец можно менять независимо от другого.

**Ядро:** $MX=0\iff$ оба столбца $X$ лежат в $\ker M$. Базис:
$$\begin{pmatrix}2&0\\-1&0\end{pmatrix},\quad\begin{pmatrix}0&2\\0&-1\end{pmatrix}.$$
**Образ:** матрицы, у которых оба столбца кратны $(1,2,3)^{\mathsf T}$. Базис:
$$\begin{pmatrix}1&0\\2&0\\3&0\end{pmatrix},\quad\begin{pmatrix}0&1\\0&2\\0&3\end{pmatrix}.$$
Ядро ненулевое — **не инъективно**. Размерность образа $2<6$ — **не сюръективно**.`,
  },
  {
    id: 'l-ker-im-values',
    topic: 'kernel',
    skill: 'ker-im',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 2',
    prompt: md`$\varphi:\mathbb R[x]_{\le3}\to\mathbb R^2$, $\varphi(p)=(p(1),\ p(2))^{\mathsf T}$. Найди базисы $\ker\varphi$ и $\operatorname{Im}\varphi$. Инъективно ли $\varphi$? Сюръективно?`,
    hints: [md`$p(1)=p(2)=0$ означает, что $p$ делится на $(x-1)(x-2)$. Для образа подбери многочлены, которые переходят в $\mathbf e_1$ и $\mathbf e_2$.`],
    answer: md`**Ядро:** $p(1)=p(2)=0\iff p=(x-1)(x-2)q$, $\deg q\le1$. Базис: $(x-1)(x-2)$ и $x(x-1)(x-2)$: они порождают ядро (раскрываем $q$) и независимы (степени 2 и 3). Ядро ненулевое — **не инъективно**.

**Образ:** $\varphi(2-x)=\mathbf e_1$ и $\varphi(x-1)=\mathbf e_2$, значит, $\operatorname{Im}\varphi=\mathbb R^2$, базис $(\mathbf e_1,\mathbf e_2)$ — **сюръективно**.`,
  },
  {
    id: 'l-cap-span-ker-2',
    topic: 'kernel',
    skill: 'intersection',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам ДЗ 8, задача 3',
    prompt: md`В $\mathbb R^4$: $\ \mathbb V=\operatorname{span}\{\mathbf v_1,\mathbf v_2\}$, $\mathbf v_1=(1,0,0,-2)$, $\mathbf v_2=(1,1,0,-3)$; $\ \mathbb U=\ker B$, $B=\begin{pmatrix}1&1&-1&0\\0&1&1&-1\end{pmatrix}$. Найди базисы $\mathbb U\cap\mathbb V$ и $\mathbb U+\mathbb V$.`,
    hints: [
      md`Вектор $c_1\mathbf v_1+c_2\mathbf v_2$ лежит в $\mathbb U$, если $c_1B\mathbf v_1+c_2B\mathbf v_2=\mathbf 0$. Посчитай $B\mathbf v_1$ и $B\mathbf v_2$.`,
      md`Для суммы возьми базис $\mathbb U$ (ФСР) и добавляй векторы $\mathbb V$, которых нет в $\mathbb U$.`,
    ],
    answer: md`**Пересечение.** $B\mathbf v_1=(1,2)^{\mathsf T}$, $B\mathbf v_2=(2,4)^{\mathsf T}=2B\mathbf v_1$. Условие $c_1B\mathbf v_1+c_2B\mathbf v_2=\mathbf 0$ равносильно $c_1+2c_2=0$, решения кратны $(c_1,c_2)=(2,-1)$. Ответ — сам вектор, а не коэффициенты: $\mathbf z=2\mathbf v_1-\mathbf v_2=(1,-1,0,-1)$, и $\mathbb U\cap\mathbb V=\operatorname{span}\{\mathbf z\}$.

**Сумма.** ФСР системы $B\mathbf x=\mathbf 0$ со свободными $x_3,x_4$: $\mathbf u_1=(2,-1,1,0)$, $\mathbf u_2=(-1,1,0,1)$. Вектор $\mathbf v_1$ не лежит в $\mathbb U$, так как $B\mathbf v_1\ne\mathbf 0$, поэтому $\mathbf u_1,\mathbf u_2,\mathbf v_1$ независимы. Вектор $\mathbf v_2=2\mathbf v_1-\mathbf z$ через них выражается, ведь $\mathbf z\in\mathbb U$. Значит, базис $\mathbb U+\mathbb V$ — $(\mathbf u_1,\mathbf u_2,\mathbf v_1)$.`,
  },
  {
    id: 'l-cap-two-spans',
    topic: 'kernel',
    skill: 'intersection',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задачи 6 и 8',
    prompt: md`В $\mathbb R^3$: $\ \mathbb U=\operatorname{span}\{(1,0,1),(0,1,1)\}$, $\mathbb W=\operatorname{span}\{(1,1,0),(1,-1,2)\}$. Найди базисы $\mathbb U\cap\mathbb W$ и $\mathbb U+\mathbb W$. Почему удобно сначала перейти от оболочек к уравнениям?`,
    hints: [md`Общий вектор $\mathbb U$ — $(a,b,a+b)$, общий вектор $\mathbb W$ — $(a+b,\ a-b,\ 2b)$. Исключи параметры, получишь по одному уравнению.`],
    answer: md`**Уравнения.** Для $\mathbb U$: $(a,b,a+b)$ даёт $x+y-z=0$. Для $\mathbb W$: $(a+b,\ a-b,\ 2b)$ даёт $x-y-z=0$. У двух уравнений пересечение читается сразу: оба условия ставим в одну систему.

**Пересечение.** Вычитая уравнения, получаем $y=0$, затем $x=z$. $\ \mathbb U\cap\mathbb W=\operatorname{span}\{(1,0,1)\}$. Это видно и без счёта: $(1,1,0)+(1,-1,2)=2(1,0,1)$.

**Сумма.** Вектор $(1,1,0)$ не лежит в $\mathbb U$ ($1+1-0\ne0$), поэтому $(1,0,1),(0,1,1),(1,1,0)$ независимы, а три независимых вектора в $\mathbb R^3$ — базис. $\mathbb U+\mathbb W=\mathbb R^3$.`,
  },
  {
    id: 'l-cap-poly',
    topic: 'kernel',
    skill: 'intersection',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 9',
    prompt: md`В $\mathbb R[x]_{\le2}$: $\ \mathbb U=\operatorname{span}\{1+x^2,\ x\}$, $\mathbb W=\{p\mid p(1)=0\}$. Найди базисы $\mathbb U\cap\mathbb W$ и $\mathbb U+\mathbb W$.`,
    hints: [md`Подставь общий вектор $\mathbb U$, то есть $a(1+x^2)+bx$, в условие $p(1)=0$.`],
    answer: md`**Пересечение.** $p=a(1+x^2)+bx$, $p(1)=2a+b=0$, то есть $b=-2a$. Получаем $p=a(1-2x+x^2)=a(x-1)^2$. $\ \mathbb U\cap\mathbb W=\operatorname{span}\{(x-1)^2\}$.

**Сумма.** $\mathbb W=\operatorname{span}\{x-1,\ x^2-1\}$ (делимость на $x-1$). Многочлен $1+x^2$ не лежит в $\mathbb W$: его значение в единице равно $2$. Значит, $x-1,\ x^2-1,\ 1+x^2$ независимы и образуют базис трёхмерного пространства: $\mathbb U+\mathbb W=\mathbb R[x]_{\le2}$.`,
  },
  {
    id: 'l-cap-matrices',
    topic: 'kernel',
    skill: 'intersection',
    scales: [...R],
    type: 'compute',
    points: 2,
    source: 'По мотивам семинара 8, задача 7',
    prompt: md`В $\operatorname{Mat}_2(\mathbb R)$: $\ \mathbb U$ — симметричные матрицы, $\mathbb W=\{X\mid\operatorname{tr}X=0\}$. Найди базисы $\mathbb U\cap\mathbb W$ и $\mathbb U+\mathbb W$.`,
    hints: [md`Общий вектор $\mathbb U$ — $\begin{pmatrix}a&b\\b&d\end{pmatrix}$. Какое условие накладывает $\mathbb W$?`],
    answer: md`**Пересечение.** В $\begin{pmatrix}a&b\\b&d\end{pmatrix}$ условие следа даёт $d=-a$. Базис: $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$, $\begin{pmatrix}0&1\\1&0\end{pmatrix}$, размерность 2.

**Сумма.** $\dim\mathbb U=3$, а матрица $K=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ лежит в $\mathbb W$, но не симметрична. Базис $\mathbb U$ вместе с $K$ — 4 независимых вектора в 4-мерном пространстве, поэтому $\mathbb U+\mathbb W=\operatorname{Mat}_2(\mathbb R)$. Базис — например, $E_{11},E_{12},E_{21},E_{22}$.`,
  },
  {
    id: 'l-complement-check',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 10',
    prompt: md`$\mathbb U=\operatorname{span}\{(1,1,0),(0,1,1)\}\subset\mathbb R^3$. Какие из подпространств — прямые дополнения к $\mathbb U$? Для каждого проверь оба условия.
$$\text{(a) }\operatorname{span}\{(1,0,-1)\};\quad\text{(b) }\operatorname{span}\{(1,0,0)\};\quad\text{(c) }\operatorname{span}\{(1,0,0),(0,0,1)\}.$$`,
    hints: [md`Общий вектор $\mathbb U$ — $(a,\ a+b,\ b)$, значит, $\mathbb U$ задаётся уравнением $x-y+z=0$. Так удобно проверять, лежит ли вектор в $\mathbb U$.`],
    answer: md`Нужны два условия: $\mathbb U\cap\mathbb W=\{\mathbf 0\}$ и $\mathbb U+\mathbb W=\mathbb R^3$.

- **(a) Нет.** $(1,0,-1)=(1,1,0)-(0,1,1)\in\mathbb U$: пересечение ненулевое, а сумма равна $\mathbb U$. Нарушены оба условия.
- **(b) Да.** $(1,0,0)\notin\mathbb U$, так как $1-0+0\ne0$, поэтому пересечение нулевое. Вектор вне оболочки добавляет независимый: три независимых вектора — базис $\mathbb R^3$, сумма — всё пространство.
- **(c) Нет.** Сумма — всё $\mathbb R^3$, но $(1,0,-1)$ лежит в обоих подпространствах: пересечение ненулевое.

Случай (c) показывает, почему одной проверки мало: сумма даёт всё пространство, а разложение не единственно.`,
  },
  {
    id: 'l-complement-decompose',
    topic: 'kernel',
    skill: 'complement',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 15',
    prompt: md`$\mathbb U=\{x+y+z=0\}\subset\mathbb R^3$, $\mathbb W=\operatorname{span}\{(1,1,1)\}$. Докажи, что $\mathbb R^3=\mathbb U\oplus\mathbb W$, и разложи $\mathbf v=(2,-1,5)$ в сумму $\mathbf u+\mathbf w$.`,
    hints: [md`Подбери $c$ так, чтобы $\mathbf x-c(1,1,1)$ лежал в $\mathbb U$.`],
    answer: md`**Пересечение нулевое:** если $t(1,1,1)\in\mathbb U$, то $3t=0$, $t=0$.

**Сумма — всё $\mathbb R^3$:** для $\mathbf x=(x,y,z)$ положим $c=\frac{x+y+z}3$. Сумма координат $\mathbf x-c(1,1,1)$ равна $x+y+z-3c=0$, поэтому $\mathbf x=(\mathbf x-c(1,1,1))+c(1,1,1)$ — разложение с первым слагаемым из $\mathbb U$ и вторым из $\mathbb W$.

Для $\mathbf v$: $c=2$, поэтому $\mathbf w=(2,2,2)$, $\mathbf u=(0,-3,3)$. Проверка: сумма равна $\mathbf v$, а сумма координат $\mathbf u$ равна нулю.`,
  },
  {
    id: 'l-projector-matrix',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 13',
    prompt: md`В $\mathbb R^2$: $\ \mathbb U=\operatorname{span}\{(2,1)\}$, $\mathbb W=\operatorname{span}\{(1,1)\}$. Найди в стандартном базисе матрицы проекторов на $\mathbb U$ вдоль $\mathbb W$ и на $\mathbb W$ вдоль $\mathbb U$. Найди обе проекции вектора $\mathbf v=(3,1)$.`,
    hints: [
      md`В столбцах матрицы проектора стоят проекции $\mathbf e_1$ и $\mathbf e_2$. Разложи их по векторам $(2,1)$ и $(1,1)$.`,
      md`Или: в базисе $(\mathbf u,\mathbf w)$ матрица равна $\operatorname{diag}(1,0)$, остаётся сменить базис.`,
    ],
    answer: md`Векторы $\mathbf u=(2,1)$ и $\mathbf w=(1,1)$ непропорциональны, поэтому пересечение нулевое, а сумма — всё $\mathbb R^2$ (два независимых вектора): $\mathbb R^2=\mathbb U\oplus\mathbb W$.

Раскладываем стандартный базис: $\mathbf e_1=\mathbf u-\mathbf w$, $\mathbf e_2=-\mathbf u+2\mathbf w$. Значит, $P_{\mathbb U}\mathbf e_1=(2,1)$, $P_{\mathbb U}\mathbf e_2=(-2,-1)$. Столбцы матрицы — эти векторы, а $P_{\mathbb W}=I-P_{\mathbb U}$:
$$P_{\mathbb U}=\begin{pmatrix}2&-2\\1&-1\end{pmatrix},\qquad P_{\mathbb W}=\begin{pmatrix}-1&2\\-1&2\end{pmatrix}.$$
То же даёт формула $P_{\mathbb U}=C\operatorname{diag}(1,0)C^{-1}$, где $\mathbf u,\mathbf w$ — столбцы $C$.

$P_{\mathbb U}\mathbf v=(4,2)$, $P_{\mathbb W}\mathbf v=(-1,-1)$. Проверка: сумма равна $\mathbf v$, а $P_{\mathbb U}^2=P_{\mathbb U}$.`,
  },
  {
    id: 'l-projector-matrix-3',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'По мотивам семинара 8, задача 15',
    prompt: md`$\mathbb U=\{x+y+z=0\}\subset\mathbb R^3$, $\mathbb W=\operatorname{span}\{\mathbf w\}$, $\mathbf w=(1,0,1)$. Найди матрицу проектора на $\mathbb U$ вдоль $\mathbb W$ в стандартном базисе.`,
    hints: [md`Пусть $\xi(\mathbf x)=x+y+z$. Подбери $c$ так, чтобы $\xi(\mathbf x-c\mathbf w)=0$, это и есть проекция.`],
    answer: md`$\xi(\mathbf w)=2\ne0$, поэтому $\mathbf w\notin\mathbb U$. Пересечение нулевое. Для любого $\mathbf x$ положим $c=\frac{\xi(\mathbf x)}2$, тогда $\mathbf x=(\mathbf x-c\mathbf w)+c\mathbf w$ и первое слагаемое лежит в $\mathbb U$, так что сумма — всё $\mathbb R^3$.

Проектор: $P(\mathbf x)=\mathbf x-\frac{\xi(\mathbf x)}2\mathbf w$. Столбцы матрицы — образы стандартных векторов, у которых $\xi=1$:
$$P=\begin{pmatrix}\frac12&-\frac12&-\frac12\\0&1&0\\-\frac12&-\frac12&\frac12\end{pmatrix}.$$
Проверка: $P\mathbf w=\mathbf 0$, а для $\mathbf x\in\mathbb U$ сразу $P\mathbf x=\mathbf x$.`,
  },
  {
    id: 'l-projector-taylor',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'construct',
    points: 1.5,
    source: 'По мотивам ДЗ 8, задача 5',
    prompt: md`$\mathbb U=\{p\in\mathbb R[x]_{\le3}\mid p(2)=p'(2)=0\}$. Найди прямое дополнение $\mathbb W$ к $\mathbb U$ и формулу проектора на $\mathbb U$ вдоль $\mathbb W$. Найди проекцию $p=x^3$.`,
    hints: [md`В базисе $(1,\ x-2,\ (x-2)^2,\ (x-2)^3)$ первые две координаты любого $p$ — это $p(2)$ и $p'(2)$.`],
    answer: md`Разложим $p$ по степеням $x-2$: $p=p(2)+p'(2)(x-2)+c_2(x-2)^2+c_3(x-2)^3$. Условие $p(2)=p'(2)=0$ оставляет два последних слагаемых, так что $\mathbb U=\operatorname{span}\{(x-2)^2,\ (x-2)^3\}$. Берём $\mathbb W=\operatorname{span}\{1,\ x-2\}$.

**Пересечение нулевое:** для $q=a+b(x-2)$ из $q(2)=0$ получаем $a=0$, из $q'(2)=0$ получаем $b=0$.

**Сумма — всё пространство:** разложение выше записывает любой $p$ как сумму слагаемых из $\mathbb W$ и $\mathbb U$.

**Проектор:** $P_{\mathbb U}(p)=p-p(2)-p'(2)(x-2)$.

Для $p=x^3$: $p(2)=8$, $p'(2)=12$, поэтому $P_{\mathbb U}(x^3)=x^3-8-12(x-2)=x^3-12x+16=(x-2)^2(x+4)$.`,
  },
  {
    id: 'l-projector-read',
    topic: 'kernel',
    skill: 'projection',
    scales: [...R],
    type: 'compute',
    points: 1.5,
    source: 'Лонгрид 8, §6',
    prompt: md`Докажи, что $P=\begin{pmatrix}3&-2\\3&-2\end{pmatrix}$ — матрица проектора. На какое подпространство и вдоль какого он проектирует? Какой будет матрица в базисе из векторов образа и ядра?`,
    hints: [md`Проверь $P^2=P$. Образ — оболочка столбцов, ядро задаётся одним уравнением $3x-2y=0$.`],
    answer: md`$P^2=\begin{pmatrix}9-6&-6+4\\9-6&-6+4\end{pmatrix}=P$, значит, это проектор.

Столбцы пропорциональны $(1,1)$: $\operatorname{Im}P=\operatorname{span}\{(1,1)\}$. Ядро: $3x-2y=0$, то есть $\ker P=\operatorname{span}\{(2,3)\}$.

Любой проектор — это проектор на $\operatorname{Im}P$ вдоль $\ker P$. Значит, $P$ проектирует на прямую $\operatorname{span}\{(1,1)\}$ вдоль прямой $\operatorname{span}\{(2,3)\}$. В базисе $((1,1),(2,3))$ его матрица $\operatorname{diag}(1,0)$: первый вектор остаётся на месте, второй переходит в ноль.`,
  },
];
