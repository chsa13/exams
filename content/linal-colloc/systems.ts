import { md, type Topic } from '../../src/content/schema';

// Лекция 3. Системы линейных уравнений

export const systems: Topic = {
  id: 'systems',
  title: 'Системы линейных уравнений',
  longread: 3,
  units: [
    {
      id: 'linear-system',
      title: 'Система линейных уравнений, совместность',
      source: 'Лекция 3, §11',
      definition: {
        level: 'basic',
        text: md`**Система из $m$ линейных уравнений с $n$ неизвестными** над $\mathbb F$: $a_{i1}x_1+\dots+a_{in}x_n=b_i$, $i=1,\dots,m$, — в матричной записи $A\mathbf x=\mathbf b$, $A\in\operatorname{Mat}_{m\times n}(\mathbb F)$ — матрица коэффициентов, $[A\mid\mathbf b]$ — расширенная матрица.

Вектор $\mathbf c\in\mathbb F^n$ — **решение**, если $A\mathbf c=\mathbf b$; $\operatorname{Sol}(A,\mathbf b)=\{\mathbf x\in\mathbb F^n\mid A\mathbf x=\mathbf b\}$. Система **совместна**, если решения есть, и **несовместна**, если их нет.`,
      },
      pitfalls: ['Решение — это вектор (столбец значений всех неизвестных), а не отдельные числа.'],
    },
    {
      id: 'matrix-kernel',
      title: 'Ядро матрицы',
      source: 'Лекция 3, §12',
      definition: {
        level: 'basic',
        text: md`Система $A\mathbf x=\mathbf b$ **однородная**, если $\mathbf b=\mathbf 0$. **Ядро** матрицы $A\in\operatorname{Mat}_{m\times n}(\mathbb F)$ — множество решений однородной системы:
$$\ker A=\{\mathbf x\in\mathbb F^n\mid A\mathbf x=\mathbf 0\}.$$`,
      },
      notes: md`Однородная система всегда совместна ($\mathbf x=\mathbf 0$). Ядро замкнуто относительно линейных комбинаций: $A(\lambda\mathbf u+\mu\mathbf v)=\lambda A\mathbf u+\mu A\mathbf v=\mathbf 0$ (утверждение 12).`,
      pitfalls: [md`$\ker A$ лежит в $\mathbb F^n$, где $n$ — число **столбцов** $A$, а не строк.`],
    },
    {
      id: 'pivot-vars',
      title: 'Главные и свободные переменные',
      source: 'Лекция 3, §13',
      definition: {
        level: 'basic',
        text: md`Переменная $x_j$ **главная**, если $j$-й столбец $\operatorname{rref}(A)$ содержит ведущий элемент. Остальные переменные — **свободные**.`,
      },
      notes: md`Система несовместна $\iff$ в ступенчатом виде расширенной матрицы есть строка $[0\ \dots\ 0\mid c]$, $c\ne0$ (утверждение 13). Иначе свободным переменным можно дать любые значения, а главные выражаются через них однозначно.

Совместная система без свободных переменных имеет единственное решение; со свободной переменной над $\mathbb Q,\mathbb R,\mathbb C$ — бесконечно много.`,
      pitfalls: ['Главные переменные определяются по матрице коэффициентов A, а не по расширенной: ведущий элемент в столбце b означает несовместность.'],
    },
    {
      id: 'fss',
      title: 'Фундаментальная система решений',
      source: 'Лекция 3, §14',
      definition: {
        level: 'basic',
        text: md`Пусть свободные переменные однородной системы $A\mathbf x=\mathbf 0$ — это $x_{j_1},\dots,x_{j_k}$. Для каждого $i$ положим $x_{j_i}=1$, остальные свободные — нулями, и найдём главные. Полученные решения $\mathbf v_1,\dots,\mathbf v_k$ — **фундаментальная система решений** (ФСР).`,
      },
      notes: md`ФСР порождает всё ядро: $\ker A=\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}$, и каждое решение раскладывается по ней единственным образом — коэффициенты равны значениям свободных переменных (утверждение 14). То есть ФСР — базис $\ker A$, и $\dim\ker A$ равна числу свободных переменных.

Пример: для $x_1+2x_2+x_3+2x_4=0$, $2x_1+4x_2-x_3-5x_4=0$, $x_1+2x_2+3x_3+8x_4=0$ RREF даёт $x_1=-2x_2+x_4$, $x_3=-3x_4$, ФСР: $(-2,1,0,0)^{\mathsf T}$, $(1,0,-3,1)^{\mathsf T}$.`,
      pitfalls: ['ФСР бывает только у однородной системы; у неоднородной — частное решение плюс ФСР однородной.'],
    },
    {
      id: 'row-ops-solutions',
      title: 'Сохранение решений при элементарных преобразованиях',
      source: 'Лекция 3, утверждение 11; неделя 2, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Элементарные преобразования строк расширенной матрицы $[A\mid\mathbf b]$ не меняют множество решений системы. Общее утверждение: если $C\in\operatorname{Mat}_m(\mathbb F)$ обратима, то системы $A\mathbf x=\mathbf b$ и $CA\mathbf x=C\mathbf b$ имеют одно и то же множество решений.`,
      },
      proof: {
        level: 'basic',
        idea: md`Умножение на обратимую $C$ можно отменить умножением на $C^{-1}$, поэтому равенства равносильны.`,
        steps: [
          { title: md`Преобразование — умножение слева`, body: md`Элементарное преобразование строк $[A\mid\mathbf b]$ — это умножение слева на элементарную матрицу $E$: $E[A\mid\mathbf b]=[EA\mid E\mathbf b]$. Элементарные матрицы обратимы, так что достаточно общего утверждения.` },
          { title: md`$\operatorname{Sol}(A,\mathbf b)\subseteq\operatorname{Sol}(CA,C\mathbf b)$`, body: md`Если $A\mathbf x=\mathbf b$, умножаем слева на $C$: $CA\mathbf x=C\mathbf b$.` },
          { title: md`Обратное включение`, body: md`Если $CA\mathbf x=C\mathbf b$, умножаем слева на $C^{-1}$: $A\mathbf x=C^{-1}CA\mathbf x=C^{-1}C\mathbf b=\mathbf b$.` },
          { title: md`Для цепочки шагов`, body: md`Каждый шаг метода Гаусса сохраняет множество решений, значит, и вся цепочка: исходная система и система с RREF расширенной матрицы равносильны.` },
        ],
      },
      uses: ['elementary-matrices'],
      notes: md`Это строгая версия школьного рассуждения «каждое действие с уравнениями можно отменить».`,
      pitfalls: [
        'Обратимость C существенна: при необратимой матрице (например, нулевой) решений может стать больше.',
        'Преобразования делаются над всей расширенной матрицей, вместе со столбцом b.',
      ],
    },
    {
      id: 'general-solution',
      title: 'Общее решение: частное плюс однородное',
      source: 'Лекция 3, утверждение 15',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть система $A\mathbf x=\mathbf b$ совместна и $\mathbf x_0$ — любое её решение. Тогда
$$\operatorname{Sol}(A,\mathbf b)=\mathbf x_0+\ker A=\{\mathbf x_0+\mathbf v\mid\mathbf v\in\ker A\}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Разность двух решений неоднородной системы — решение однородной.`,
        steps: [
          { title: md`$\mathbf x_0+\ker A\subseteq\operatorname{Sol}$`, body: md`Если $\mathbf v\in\ker A$, то $A(\mathbf x_0+\mathbf v)=A\mathbf x_0+A\mathbf v=\mathbf b+\mathbf 0=\mathbf b$.` },
          { title: md`$\operatorname{Sol}\subseteq\mathbf x_0+\ker A$`, body: md`Если $A\mathbf x=\mathbf b$, то $A(\mathbf x-\mathbf x_0)=\mathbf b-\mathbf b=\mathbf 0$, то есть $\mathbf x-\mathbf x_0\in\ker A$ и $\mathbf x=\mathbf x_0+(\mathbf x-\mathbf x_0)\in\mathbf x_0+\ker A$.` },
        ],
      },
      notes: md`Вместе с ФСР: $\operatorname{Sol}(A,\mathbf b)=\mathbf x_0+\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}$. Геометрически — подпространство $\ker A$, сдвинутое на $\mathbf x_0$: прямая или плоскость, не обязательно через ноль.

Следствие: совместная система имеет единственное решение $\iff\ker A=\{\mathbf 0\}$.`,
      pitfalls: [
        'Формула требует совместности: у несовместной системы нет частного решения.',
        md`$\operatorname{Sol}(A,\mathbf b)$ при $\mathbf b\ne\mathbf 0$ — не подпространство: в нём нет нуля.`,
        md`Частное решение $\mathbf x_0$ можно брать любое — ответ (как множество) от выбора не зависит.`,
      ],
    },
    {
      id: 'consistency-span',
      title: 'Совместность системы и линейная оболочка столбцов',
      source: 'Неделя 3, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $A=[\mathbf a_1\ \dots\ \mathbf a_n]\in\operatorname{Mat}_{m\times n}(\mathbb F)$. Система $A\mathbf x=\mathbf b$ совместна тогда и только тогда, когда $\mathbf b\in\operatorname{span}\{\mathbf a_1,\dots,\mathbf a_n\}$. Решения — это ровно наборы коэффициентов, с которыми $\mathbf b$ раскладывается по столбцам.`,
      },
      proof: {
        level: 'basic',
        idea: md`$A\mathbf x$ — это линейная комбинация столбцов $A$ с коэффициентами $x_1,\dots,x_n$.`,
        steps: [
          { title: md`Произведение по столбцам`, body: md`По определению умножения $i$-я координата $A\mathbf x$ равна $a_{i1}x_1+\dots+a_{in}x_n$ — это $i$-я координата вектора $x_1\mathbf a_1+\dots+x_n\mathbf a_n$. Значит, $A\mathbf x=x_1\mathbf a_1+\dots+x_n\mathbf a_n$.` },
          { title: md`$\Rightarrow$`, body: md`Если $A\mathbf c=\mathbf b$, то $\mathbf b=c_1\mathbf a_1+\dots+c_n\mathbf a_n\in\operatorname{span}\{\mathbf a_j\}$.` },
          { title: md`$\Leftarrow$`, body: md`Если $\mathbf b=c_1\mathbf a_1+\dots+c_n\mathbf a_n$, то $\mathbf c=(c_1,\dots,c_n)^{\mathsf T}$ — решение: $A\mathbf c=\mathbf b$.` },
        ],
      },
      notes: md`Иначе говоря, система $A\mathbf x=\mathbf b$ совместна при **всех** $\mathbf b$ тогда и только тогда, когда столбцы $A$ порождают $\mathbb F^m$. Множество тех $\mathbf b$, при которых она совместна, — образ отображения $\mathbf x\mapsto A\mathbf x$.`,
      pitfalls: ['Речь об оболочке СТОЛБЦОВ матрицы коэффициентов, а не строк.'],
    },
    {
      id: 'row-span',
      title: 'Сохранение линейной оболочки строк при элементарных преобразованиях',
      source: 'Неделя 3, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $A'$ получена из $A$ элементарными преобразованиями строк, то линейная оболочка строк $A'$ совпадает с линейной оболочкой строк $A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Каждая новая строка — комбинация старых, поэтому оболочка не растёт; преобразование обратимо — значит, не уменьшается.`,
        steps: [
          { title: md`Достаточно одного шага`, body: md`Цепочка преобразований — последовательность шагов; если каждый шаг сохраняет оболочку, то и вся цепочка.` },
          { title: md`Новая оболочка внутри старой`, body: md`После $\mathbf r_i\mapsto\mathbf r_i+\lambda\mathbf r_j$, $\mathbf r_i\leftrightarrow\mathbf r_j$ или $\mathbf r_i\mapsto\lambda\mathbf r_i$ каждая строка новой матрицы — линейная комбинация строк старой. Оболочка — подпространство, поэтому вместе со строками она содержит все их комбинации: $\operatorname{span}(A')\subseteq\operatorname{span}(A)$.` },
          { title: md`Старая внутри новой`, body: md`Обратное преобразование ($\mathbf r_i\mapsto\mathbf r_i-\lambda\mathbf r_j$, та же перестановка, $\mathbf r_i\mapsto\lambda^{-1}\mathbf r_i$) тоже элементарное и переводит $A'$ обратно в $A$. По предыдущему шагу $\operatorname{span}(A)\subseteq\operatorname{span}(A')$.` },
        ],
      },
      uses: ['elementary-ops'],
      notes: md`Следствие: ненулевые строки ступенчатого вида — базис оболочки строк $A$ (они независимы: смотрим на ведущие позиции сверху вниз). На этом основан алгоритм дополнения до базиса.

Сравни: оболочка **столбцов** при преобразованиях строк меняется, сохраняются лишь соотношения между столбцами.`,
      pitfalls: [
        'Оболочка столбцов при преобразованиях строк НЕ сохраняется: из [1; 1] вычитанием получаем [1; 0].',
        'Для «⊇» нужна обратимость преобразования — умножение строки на 0 оболочку уменьшает.',
      ],
    },
    {
      id: 'ker-ata',
      title: 'Равенство ker(AᵀA) = ker A над ℝ',
      source: 'Неделя 3, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Для любой $A\in\operatorname{Mat}_{m\times n}(\mathbb R)$ выполнено $\ker(A^{\mathsf T}A)=\ker A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Если $A^{\mathsf T}A\mathbf x=\mathbf 0$, то $\mathbf x^{\mathsf T}A^{\mathsf T}A\mathbf x=\|A\mathbf x\|^2=0$, а над $\mathbb R$ сумма квадратов равна нулю только у нулевого вектора.`,
        steps: [
          { title: md`$\ker A\subseteq\ker(A^{\mathsf T}A)$`, body: md`Если $A\mathbf x=\mathbf 0$, то $A^{\mathsf T}A\mathbf x=A^{\mathsf T}\mathbf 0=\mathbf 0$. Это верно над любым полем.` },
          { title: md`Умножаем на $\mathbf x^{\mathsf T}$`, body: md`Пусть $A^{\mathsf T}A\mathbf x=\mathbf 0$. Тогда $0=\mathbf x^{\mathsf T}A^{\mathsf T}A\mathbf x=(A\mathbf x)^{\mathsf T}(A\mathbf x)$.` },
          { title: md`Сумма квадратов`, body: md`Если $\mathbf y=A\mathbf x=(y_1,\dots,y_m)^{\mathsf T}$, то $\mathbf y^{\mathsf T}\mathbf y=y_1^2+\dots+y_m^2$. Над $\mathbb R$ сумма квадратов равна нулю, только если все $y_i=0$. Значит, $A\mathbf x=\mathbf 0$.` },
        ],
      },
      notes: md`Следствие: $\operatorname{rk}(A^{\mathsf T}A)=\operatorname{rk}A$ (по теореме о размерностях — одинаковые ядра в $\mathbb R^n$). Если столбцы $A$ независимы, $A^{\mathsf T}A$ обратима — это используют в методе наименьших квадратов.`,
      pitfalls: [
        md`Над $\mathbb C$ (с обычным транспонированием) неверно: для столбца $A=\begin{pmatrix}1\\ i\end{pmatrix}$ получаем $A^{\mathsf T}A=1+i^2=0$, так что $\ker(A^{\mathsf T}A)=\mathbb C$, а $\ker A=\{0\}$. Решающий шаг «сумма квадратов $=0\Rightarrow$ все нули» работает только над $\mathbb R$.`,
        md`$A^{\mathsf T}A$ и $AA^{\mathsf T}$ — разные матрицы разных размеров: $n\times n$ и $m\times m$.`,
      ],
    },
    {
      id: 'invertibility-criteria',
      title: 'Критерии обратимости квадратной матрицы',
      source: 'Лекция 3, утверждения 16 и 17',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для $A\in\operatorname{Mat}_n(\mathbb F)$ равносильны:
1. $A$ обратима;
2. $\operatorname{rref}(A)=I_n$;
3. $\ker A=\{\mathbf 0\}$;
4. для каждого $\mathbf b\in\mathbb F^n$ система $A\mathbf x=\mathbf b$ имеет единственное решение.`,
      },
      proof: {
        level: 'basic',
        idea: md`$1\Leftrightarrow2$ через элементарные матрицы, $2\Leftrightarrow3$ через свободные переменные, $1\Rightarrow4\Rightarrow3$ напрямую.`,
        steps: [
          { title: md`$2\Rightarrow1$`, body: md`Если $\operatorname{rref}(A)=I_n$, то $A$ приводится к $I_n$ элементарными преобразованиями, и по методу Гаусса $A^{-1}=E_k\cdots E_1$.` },
          { title: md`$1\Rightarrow2$: $R=\operatorname{rref}(A)$ обратима`, body: md`$R=EA$, где $E$ — произведение элементарных матриц. $E$ и $A$ обратимы, значит, и $R$ обратима.` },
          { title: md`$1\Rightarrow2$: у $R$ нет нулевых строк, поэтому $R=I_n$`, body: md`Если у $R$ нулевая строка, то та же строка $RB$ нулевая при любом $B$, и $RB=I_n$ невозможно. Значит, все $n$ строк ненулевые: $n$ ведущих позиций в $n$ столбцах, каждая правее предыдущей, — они на диагонали. В RREF ведущие элементы равны $1$, остальное в их столбцах — нули: $R=I_n$.` },
          { title: md`$2\Leftrightarrow3$`, body: md`Системы $A\mathbf x=\mathbf 0$ и $\operatorname{rref}(A)\mathbf x=\mathbf 0$ равносильны. Если $\operatorname{rref}(A)=I_n$, решение только нулевое. Если $\operatorname{rref}(A)\ne I_n$, у квадратной матрицы меньше $n$ ведущих элементов, есть свободная переменная; положив её $1$, остальные свободные $0$, получим ненулевое решение.` },
          { title: md`$1\Rightarrow4\Rightarrow3$`, body: md`Если $A$ обратима, $\mathbf x=A^{-1}\mathbf b$ — решение, и оно единственно: из $A\mathbf x=\mathbf b$ следует $\mathbf x=A^{-1}\mathbf b$. Если решение единственно при каждом $\mathbf b$, то при $\mathbf b=\mathbf 0$ единственное решение — $\mathbf 0$, то есть $\ker A=\{\mathbf 0\}$.` },
        ],
      },
      uses: ['gauss-inverse', 'row-ops-solutions', 'inverse-unique'],
      notes: md`Позже к списку добавятся $\operatorname{rk}A=n$ и $\operatorname{Im}\varphi_A=\mathbb F^n$ (лекция 9), а также $\det A\ne0$.

Следствие: у квадратной матрицы односторонней обратной достаточно. Если $BA=I_n$, то $A\mathbf x=\mathbf 0\Rightarrow\mathbf x=BA\mathbf x=\mathbf 0$, так что $\ker A=\{\mathbf 0\}$ и $A$ обратима.`,
      pitfalls: [
        'Критерии — для КВАДРАТНЫХ матриц: у прямоугольной матрицы ker A = {0} не даёт обратимости.',
        'В доказательстве 1 ⇒ 2 ключевой шаг — «у обратимой матрицы нет нулевой строки»; его нужно обосновать, а не просто сказать.',
      ],
    },
  ],
};
