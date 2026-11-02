import { md, type Topic } from '../../src/content/schema';

// Неделя 8. Ядро, образ и операции с подпространствами.

export const kernel: Topic = {
  id: 'kernel',
  title: 'Ядро, образ, сумма и прямая сумма',
  longread: 8,
  units: [
    {
      id: 'ker-im',
      title: 'Ядро и образ',
      source: 'Лонгрид 8, §1, утверждение 1',
      definition: {
        level: 'basic',
        text: md`Для линейного $\varphi:\mathbb V\to\mathbb W$:
- **ядро** $\ker\varphi=\{\mathbf x\in\mathbb V\mid\varphi(\mathbf x)=\mathbf 0\}\subseteq\mathbb V$;
- **образ** $\operatorname{Im}\varphi=\{\varphi(\mathbf x)\mid\mathbf x\in\mathbb V\}\subseteq\mathbb W$.`,
      },
      statement: {
        level: 'basic',
        text: md`$\ker\varphi$ — подпространство $\mathbb V$, а $\operatorname{Im}\varphi$ — подпространство $\mathbb W$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Критерий подпространства + линейность $\varphi$.`,
        steps: [
          { title: md`Оба содержат ноль`, body: md`$\varphi(\mathbf 0)=\mathbf 0$: значит, $\mathbf 0\in\ker\varphi$ и $\mathbf 0\in\operatorname{Im}\varphi$.` },
          { title: md`Ядро замкнуто`, body: md`Если $\varphi(\mathbf x)=\varphi(\mathbf y)=\mathbf 0$, то $\varphi(\lambda\mathbf x+\mu\mathbf y)=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)=\mathbf 0$.` },
          { title: md`Образ замкнут`, body: md`Если $\mathbf u=\varphi(\mathbf x)$, $\mathbf v=\varphi(\mathbf y)$, то $\lambda\mathbf u+\mu\mathbf v=\varphi(\lambda\mathbf x+\mu\mathbf y)\in\operatorname{Im}\varphi$.` },
        ],
      },
      uses: ['subspace', 'linear-map'],
      notes: md`Для матричного $\varphi_A(\mathbf x)=A\mathbf x$, $A=[\mathbf a_1\dots\mathbf a_n]$:
- $\ker\varphi_A=\ker A$ — решения однородной системы (базис — ФСР);
- $\operatorname{Im}\varphi_A=\operatorname{span}\{\mathbf a_1,\dots,\mathbf a_n\}$ — оболочка **столбцов** (так как $A\mathbf x=x_1\mathbf a_1+\dots+x_n\mathbf a_n$, $A\mathbf e_i=\mathbf a_i$).

Базис образа: столбцы исходной $A$, стоящие на ведущих позициях после Гаусса.

Видно без счёта: если столбцы связаны соотношением $c_1\mathbf a_1+\dots+c_n\mathbf a_n=\mathbf 0$, то $(c_1,\dots,c_n)^{\mathsf T}\in\ker A$.

Пример: $D:\mathbb R[t]_{\le2}\to\mathbb R[t]_{\le1}$, $p\mapsto p'$: $\ker D=\operatorname{span}\{1\}$, $\operatorname{Im}D=\mathbb R[t]_{\le1}$.`,
      pitfalls: [
        md`Ядро живёт в пространстве **аргументов**, образ — в пространстве **значений**: $\ker\varphi\subseteq\mathbb V$, $\operatorname{Im}\varphi\subseteq\mathbb W$.`,
        'Базис образа — столбцы ИСХОДНОЙ матрицы на ведущих позициях, а не столбцы ступенчатого вида (Гаусс по строкам меняет оболочку столбцов).',
      ],
    },
    {
      id: 'injective',
      title: 'Критерий инъективности, сюръективности и изоморфизма',
      source: 'Лонгрид 8, §2, утверждение 2',
      statement: {
        level: 'basic',
        text: md`Для линейного $\varphi:\mathbb V\to\mathbb W$:
1. $\varphi$ инъективно $\iff\ker\varphi=\{\mathbf 0\}$;
2. $\varphi$ сюръективно $\iff\operatorname{Im}\varphi=\mathbb W$;
3. $\varphi$ — изоморфизм $\iff\ker\varphi=\{\mathbf 0\}$ и $\operatorname{Im}\varphi=\mathbb W$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Из $\varphi(\mathbf x)=\varphi(\mathbf y)$ по линейности $\varphi(\mathbf x-\mathbf y)=\mathbf 0$.`,
        steps: [
          { title: md`П. 2 и 3`, body: md`П. 2 — это определение сюръективности, п. 3 следует из пп. 1–2.` },
          { title: md`П. 1, $\Rightarrow$`, body: md`Если $\varphi(\mathbf x)=\mathbf 0=\varphi(\mathbf 0)$, то по инъективности $\mathbf x=\mathbf 0$.` },
          { title: md`П. 1, $\Leftarrow$`, body: md`Если $\varphi(\mathbf x)=\varphi(\mathbf y)$, то $\varphi(\mathbf x-\mathbf y)=\mathbf 0$, значит, $\mathbf x-\mathbf y\in\ker\varphi=\{\mathbf 0\}$ и $\mathbf x=\mathbf y$.` },
        ],
      },
      uses: ['ker-im'],
      notes: md`Для $\varphi_A$: инъективно $\iff$ $A\mathbf x=\mathbf 0$ имеет только нулевое решение (столбцы независимы); сюръективно $\iff$ $A\mathbf x=\mathbf b$ совместна при любом $\mathbf b$ (столбцы порождают $\mathbb F^m$).

Отображение $\Phi:\mathbb F^m\to\mathbb V$, $\mathbf x\mapsto x_1\mathbf v_1+\dots+x_m\mathbf v_m$: инъективно $\iff$ $\mathbf v_i$ независимы; сюръективно $\iff$ порождают; изоморфизм $\iff$ базис.`,
      pitfalls: ['Для инъективности линейного отображения достаточно проверить, что в ноль переходит только ноль, — не нужно сравнивать все пары x, y.'],
    },
    {
      id: 'subspace-is-kernel',
      title: 'Всякое подпространство — ядро',
      source: 'Лонгрид 8, §3, утверждение 3',
      statement: {
        level: 'basic',
        text: md`Для любого подпространства $\mathbb U$ конечномерного $\mathbb V$ есть линейное отображение $\pi$ с $\ker\pi=\mathbb U$. В координатах: любое подпространство задаётся однородной системой линейных уравнений.`,
      },
      proof: {
        level: 'basic',
        idea: md`Дополняем базис $\mathbb U$ до базиса $\mathbb V$ и «забываем» первые координаты: ядро — ровно векторы, у которых остальные координаты нулевые.`,
        steps: [
          { title: md`Случай $\mathbb U=\mathbb V$`, body: md`Подходит нулевое отображение $\mathbb V\to\{\mathbf 0\}$.` },
          { title: md`Дополняем базис`, body: md`Пусть $\dim\mathbb U=k<n=\dim\mathbb V$. Берём базис $(\mathbf u_1,\dots,\mathbf u_k)$ подпространства $\mathbb U$ и дополняем до базиса $(\mathbf u_1,\dots,\mathbf u_n)$ пространства $\mathbb V$.` },
          { title: md`Строим $\pi$`, body: md`$\pi(x_1\mathbf u_1+\dots+x_n\mathbf u_n)=(x_{k+1},\dots,x_n)^{\mathsf T}\in\mathbb F^{n-k}$ — линейно (координаты линейны).` },
          { title: md`Ядро`, body: md`$\pi(\mathbf x)=\mathbf 0\iff x_{k+1}=\dots=x_n=0\iff\mathbf x\in\operatorname{span}\{\mathbf u_1,\dots,\mathbf u_k\}=\mathbb U$.` },
        ],
      },
      uses: ['extend-basis'],
      notes: md`Отображение не единственно (зависит от дополнения). Примеры: $\{p\mid p(a)=0\}=\ker(p\mapsto p(a))$; симметричные матрицы $=\ker(A\mapsto A-A^{\mathsf T})$.

На практике (переход «оболочка → уравнения»): пишем общий вектор $\mathbf x=a\mathbf u_1+b\mathbf u_2$ и исключаем параметры. Например, $\operatorname{span}\{(1,0,1,1),(0,1,1,2)\}$: $\mathbf x=(a,b,a+b,a+2b)$, уравнения $x_3=x_1+x_2$, $x_4=x_1+2x_2$.`,
      pitfalls: ['Уравнений должно хватить, чтобы задать ровно 𝕌, а не больше: проверь обратное включение (каждое решение — комбинация порождающих).'],
    },
    {
      id: 'sum-intersection',
      title: 'Сумма и пересечение подпространств',
      source: 'Лонгрид 8, §4',
      definition: {
        level: 'basic',
        text: md`Для подпространств $\mathbb U,\mathbb L\subseteq\mathbb V$:
- **пересечение** $\mathbb U\cap\mathbb L=\{\mathbf x\mid\mathbf x\in\mathbb U\text{ и }\mathbf x\in\mathbb L\}$;
- **сумма** $\mathbb U+\mathbb L=\{\mathbf u+\mathbf l\mid\mathbf u\in\mathbb U,\ \mathbf l\in\mathbb L\}$.

**Прямое произведение** $\mathbb V\times\mathbb W$ — пары $(\mathbf v,\mathbf w)$ с покомпонентными операциями; $\dim(\mathbb V\times\mathbb W)=\dim\mathbb V+\dim\mathbb W$.`,
      },
      statement: {
        level: 'basic',
        text: md`1. $\mathbb U\cap\mathbb L$ и $\mathbb U+\mathbb L$ — подпространства; пересечение — наибольшее подпространство в обоих, сумма — наименьшее, содержащее оба.
2. $\mathbb U+\mathbb L=\operatorname{Im}\sigma$, где $\sigma:\mathbb U\times\mathbb L\to\mathbb V$, $(\mathbf u,\mathbf l)\mapsto\mathbf u+\mathbf l$.
3. Если $\mathbb U=\ker\varphi$, $\mathbb L=\ker\psi$, то $\mathbb U\cap\mathbb L=\ker\Phi$, $\Phi(\mathbf x)=(\varphi(\mathbf x),\psi(\mathbf x))$. В координатах: $\ker A\cap\ker B=\ker\begin{pmatrix}A\\B\end{pmatrix}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Сумма — образ линейного отображения сложения, пересечение — ядро «склеенного» отображения; образы и ядра — подпространства.`,
        steps: [
          { title: md`$\sigma$ линейно, образ — сумма`, body: md`$\sigma$ линейно из-за покомпонентных операций в $\mathbb U\times\mathbb L$; по определению $\operatorname{Im}\sigma=\{\mathbf u+\mathbf l\}=\mathbb U+\mathbb L$. Образ — подпространство.` },
          { title: md`Сумма наименьшая`, body: md`Любое подпространство, содержащее $\mathbb U$ и $\mathbb L$, замкнуто относительно сложения, поэтому содержит все $\mathbf u+\mathbf l$.` },
          { title: md`Пересечение — ядро`, body: md`$\Phi$ линейно (обе компоненты линейны) и $\Phi(\mathbf x)=(\mathbf 0,\mathbf 0)\iff\varphi(\mathbf x)=\mathbf 0$ и $\psi(\mathbf x)=\mathbf 0\iff\mathbf x\in\mathbb U\cap\mathbb L$. Ядро — подпространство.` },
          { title: md`В координатах`, body: md`$\mathbf x\in\ker A\cap\ker B\iff A\mathbf x=\mathbf 0$ и $B\mathbf x=\mathbf 0\iff\begin{pmatrix}A\\B\end{pmatrix}\mathbf x=\mathbf 0$.` },
        ],
      },
      uses: ['ker-im'],
      notes: md`**Алгоритмы.**
- Сумма: порождающие системы $\mathbb U$ и $\mathbb L$ ставим столбцами в одну матрицу, базис суммы — столбцы на ведущих позициях.
- Пересечение, оба заданы уравнениями: ставим матрицы друг под другом и решаем систему.
- $\mathbb U=\operatorname{span}\{\mathbf u_1,\dots\}$, $\mathbb L=\ker B$: требуем $B(c_1\mathbf u_1+c_2\mathbf u_2+\dots)=\mathbf 0$, то есть решаем систему на $c$ с матрицей $[B\mathbf u_1\ B\mathbf u_2\ \dots]$; векторы пересечения — $\sum c_i\mathbf u_i$ (не сами $c$!).

Объединение подпространств — обычно **не** подпространство: оси $Ox\cup Oy$ не замкнуты относительно сложения. $\mathbb U\cup\mathbb L$ — подпространство только если одно содержится в другом.`,
      pitfalls: [
        md`Элемент $\mathbb U\times\mathbb L$ — пара векторов, элемент $\mathbb U+\mathbb L$ — их сумма. Не путай произведение и сумму.`,
        'В пересечении по алгоритму «span ∩ ker» найденные c — коэффициенты, а не векторы: ответ — комбинация порождающих с этими коэффициентами.',
        'Сумма — не объединение: в сумму входят все u + l, а не только векторы из 𝕌 и 𝕃.',
      ],
    },
    {
      id: 'direct-sum',
      title: 'Прямая сумма и её критерий',
      source: 'Лонгрид 8, §5, утверждение 4',
      definition: {
        level: 'basic',
        text: md`Сумма $\mathbb U+\mathbb L$ **прямая** ($\mathbb U\oplus\mathbb L$), если каждый её вектор **единственным образом** раскладывается как $\mathbf u+\mathbf l$, $\mathbf u\in\mathbb U$, $\mathbf l\in\mathbb L$. Если ещё $\mathbb U+\mathbb L=\mathbb V$, пишут $\mathbb V=\mathbb U\oplus\mathbb L$, а $\mathbb L$ называют **прямым дополнением** к $\mathbb U$.`,
      },
      statement: {
        level: 'basic',
        text: md`Сумма $\mathbb U+\mathbb L$ прямая $\iff\mathbb U\cap\mathbb L=\{\mathbf 0\}$ (равносильно: отображение сложения $\sigma$ инъективно).`,
      },
      proof: {
        level: 'basic',
        idea: md`Вектор пересечения даёт второе разложение нуля; два разложения одного вектора дают вектор пересечения.`,
        steps: [
          { title: md`$\Rightarrow$`, body: md`Пусть $\mathbf z\in\mathbb U\cap\mathbb L$. Тогда $\mathbf 0=\mathbf 0+\mathbf 0=\mathbf z+(-\mathbf z)$ — два разложения нуля ($\mathbf z\in\mathbb U$, $-\mathbf z\in\mathbb L$). По единственности $\mathbf z=\mathbf 0$.` },
          { title: md`$\Leftarrow$: два разложения`, body: md`Пусть $\mathbf u_1+\mathbf l_1=\mathbf u_2+\mathbf l_2$. Тогда $\mathbf u_1-\mathbf u_2=\mathbf l_2-\mathbf l_1$.` },
          { title: md`$\Leftarrow$: это вектор пересечения`, body: md`Левая часть лежит в $\mathbb U$, правая — в $\mathbb L$; значит, обе в $\mathbb U\cap\mathbb L=\{\mathbf 0\}$, откуда $\mathbf u_1=\mathbf u_2$, $\mathbf l_1=\mathbf l_2$.` },
        ],
      },
      notes: md`$\mathbb V=\mathbb U\oplus\mathbb L$ $\iff$ объединение базисов $\mathbb U$ и $\mathbb L$ — базис $\mathbb V$. Прямое дополнение строят дополнением базиса $\mathbb U$ до базиса $\mathbb V$: добавленные векторы порождают дополнение. Оно не единственно.

Чтобы обосновать, что $\mathbb L$ — прямое дополнение, проверь оба условия: $\mathbb U\cap\mathbb L=\{\mathbf 0\}$ и $\mathbb U+\mathbb L=\mathbb V$.

Примеры: $\mathbb R^3=\operatorname{span}\{\mathbf e_1,\mathbf e_2\}\oplus\operatorname{span}\{\mathbf e_3\}$; матрицы $=$ симметричные $\oplus$ кососимметричные; функции $=$ чётные $\oplus$ нечётные; $\mathbb F[t]_{\le n}=\{p\mid p(a)=0\}\oplus\operatorname{span}\{q\}$ для любого $q$ с $q(a)\ne0$.`,
      pitfalls: [
        md`Одной проверки мало: при нулевом пересечении сумма может не дать всё пространство ($\mathbb R^3$ и две прямые), а при $\mathbb U+\mathbb L=\mathbb V$ пересечение может быть ненулевым (две плоскости в $\mathbb R^3$).`,
        md`Прямое дополнение не единственно: к оси $Ox$ в $\mathbb R^2$ подходит любая другая прямая через ноль.`,
        md`Прямое дополнение — не теоретико-множественное дополнение $\mathbb V\setminus\mathbb U$ (то даже не подпространство: в нём нет нуля).`,
      ],
    },
    {
      id: 'projector',
      title: 'Проекторы',
      source: 'Лонгрид 8, §6, утверждение 5',
      definition: {
        level: 'basic',
        text: md`Оператор $P\in\operatorname{End}(\mathbb V)$ — **проектор**, если $P^2=P$.

Если $\mathbb V=\mathbb U\oplus\mathbb L$ и $\mathbf x=\mathbf u+\mathbf l$, то $P_{\mathbb U}(\mathbf x)=\mathbf u$ — **проектор на $\mathbb U$ вдоль $\mathbb L$**, $P_{\mathbb L}(\mathbf x)=\mathbf l$ — на $\mathbb L$ вдоль $\mathbb U$.`,
      },
      statement: {
        level: 'basic',
        text: md`1. $P_{\mathbb U},P_{\mathbb L}$ линейны, $P_{\mathbb U}^2=P_{\mathbb U}$, $P_{\mathbb U}+P_{\mathbb L}=\operatorname{Id}$, $P_{\mathbb U}P_{\mathbb L}=P_{\mathbb L}P_{\mathbb U}=0$, $\operatorname{Im}P_{\mathbb U}=\mathbb U$, $\ker P_{\mathbb U}=\mathbb L$.
2. Для любого проектора $P$: $\ \mathbb V=\operatorname{Im}P\oplus\ker P$, и $P$ — проектор на $\operatorname{Im}P$ вдоль $\ker P$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Разложение $\mathbf x=P\mathbf x+(\mathbf x-P\mathbf x)$; единственность разложения даёт линейность.`,
        steps: [
          { title: md`Линейность $P_{\mathbb U}$`, body: md`Если $\mathbf x=\mathbf u_1+\mathbf l_1$, $\mathbf y=\mathbf u_2+\mathbf l_2$, то $\lambda\mathbf x+\mu\mathbf y=(\lambda\mathbf u_1+\mu\mathbf u_2)+(\lambda\mathbf l_1+\mu\mathbf l_2)$ — это разложение, а оно единственно. Значит, $P_{\mathbb U}(\lambda\mathbf x+\mu\mathbf y)=\lambda\mathbf u_1+\mu\mathbf u_2$.` },
          { title: md`$\mathbb V=\operatorname{Im}P+\ker P$`, body: md`$\mathbf x=P\mathbf x+(\mathbf x-P\mathbf x)$, где $P\mathbf x\in\operatorname{Im}P$, а $P(\mathbf x-P\mathbf x)=P\mathbf x-P^2\mathbf x=\mathbf 0$.` },
          { title: md`Сумма прямая`, body: md`Если $\mathbf y\in\operatorname{Im}P\cap\ker P$, то $\mathbf y=P\mathbf z$ и $\mathbf y=P\mathbf z=P^2\mathbf z=P\mathbf y=\mathbf 0$.` },
          { title: md`$P$ оставляет компоненту из образа`, body: md`В разложении $\mathbf x=P\mathbf x+(\mathbf x-P\mathbf x)$ компонента из $\operatorname{Im}P$ — это $P\mathbf x$.` },
        ],
      },
      uses: ['direct-sum'],
      notes: md`Формулы проекторов в классических разложениях:
- симметричная/кососимметричная часть: $P_{\rm sym}(A)=\frac{A+A^{\mathsf T}}2$, $P_{\rm skew}(A)=\frac{A-A^{\mathsf T}}2$;
- чётная/нечётная часть функции: $\frac{f(x)+f(-x)}2$ и $\frac{f(x)-f(-x)}2$;
- если $\varphi^2=\operatorname{Id}$: $\mathbb V=\ker(\varphi-\operatorname{Id})\oplus\ker(\varphi+\operatorname{Id})$, проекторы $\frac{\operatorname{Id}+\varphi}2$ и $\frac{\operatorname{Id}-\varphi}2$.

В базисе «базис $\operatorname{Im}P$ + базис $\ker P$» матрица проектора — $\operatorname{diag}(1,\dots,1,0,\dots,0)$.

Чтобы найти $P_{\mathbb U}(\mathbf v)$ при $\mathbb V=\mathbb U\oplus\mathbb L$: раскладываем $\mathbf v$ по объединённому базису и оставляем слагаемые из $\mathbb U$.

**Матрица проектора** в стандартном базисе — два способа:
- по столбцам: в $j$-м столбце стоит проекция $\mathbf e_j$;
- заменой базиса: $P=C\operatorname{diag}(1,\dots,1,0,\dots,0)C^{-1}$, где в столбцах $C$ стоят базис $\mathbb U$ и базис $\mathbb L$.`,
      pitfalls: [
        md`Проектор на $\mathbb U$ зависит и от $\mathbb L$ («вдоль чего»): при другом дополнении получится другой оператор.`,
        md`Проектор не обязан быть $0$ или $\operatorname{Id}$: $P^2=P$ не значит $P(P-\operatorname{Id})=0\Rightarrow P\in\{0,\operatorname{Id}\}$ — у операторов есть делители нуля.`,
      ],
    },
  ],
};
