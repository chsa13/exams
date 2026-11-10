import { md, type Topic } from '../../src/content/schema';

// Лекция 9. Ранг и теорема о размерностях

export const rank: Topic = {
  id: 'rank',
  title: 'Ранг и теорема о размерностях',
  longread: 9,
  units: [
    {
      id: 'rank-map',
      title: 'Ранг линейного отображения',
      source: 'Лекция 9, §44',
      definition: {
        level: 'basic',
        text: md`**Ранг** линейного отображения $\varphi:\mathbb V\to\mathbb W$ (конечномерных) — размерность его образа: $\operatorname{rk}\varphi=\dim\operatorname{Im}\varphi$.`,
      },
      notes: md`Если $(\mathbf a_1,\dots,\mathbf a_n)$ — базис $\mathbb V$, то $\operatorname{Im}\varphi=\operatorname{span}\{\varphi(\mathbf a_1),\dots,\varphi(\mathbf a_n)\}$. Ранг не зависит от выбора базисов: $\operatorname{rk}T(\varphi,\mathcal A,\mathcal B)=\operatorname{rk}\varphi$ (утверждение 49).

$\operatorname{rk}\varphi\le\min\{\dim\mathbb V,\dim\mathbb W\}$.`,
      pitfalls: ['Ранг — размерность образа, а не ядра; размерность ядра называют дефектом.'],
    },
    {
      id: 'rank-matrix',
      title: 'Ранг матрицы',
      source: 'Лекция 9, §44',
      definition: {
        level: 'basic',
        text: md`**Ранг** матрицы $A=[\mathbf a_1\ \dots\ \mathbf a_n]\in\operatorname{Mat}_{m\times n}(\mathbb F)$ — ранг отображения $\varphi_A:\mathbf x\mapsto A\mathbf x$, то есть размерность линейной оболочки её столбцов: $\operatorname{rk}A=\dim\operatorname{span}\{\mathbf a_1,\dots,\mathbf a_n\}$.`,
      },
      notes: md`$\operatorname{rk}A$ равен числу ведущих элементов в ступенчатом виде; $\dim\ker A+\operatorname{rk}A=n$ (число столбцов).

Пример: у $\begin{pmatrix}1&0&1\\0&1&1\\0&0&0\end{pmatrix}$ третий столбец — сумма первых двух, первые два независимы, $\operatorname{rk}=2$.`,
      pitfalls: ['Элементарные преобразования строк и столбцов ранг не меняют, но оболочку столбцов преобразования строк меняют — сохраняется только её размерность.'],
    },
    {
      id: 'rank-nullity',
      title: 'Теорема о размерностях ядра и образа',
      source: 'Лекция 9, утверждение 50',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\varphi:\mathbb V\to\mathbb W$ линейно, $\mathbb V$ конечномерно. Тогда
$$\dim\ker\varphi+\dim\operatorname{Im}\varphi=\dim\mathbb V,\quad\text{то есть}\quad\dim\ker\varphi+\operatorname{rk}\varphi=\dim\mathbb V.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Берём базис ядра и дополняем до базиса $\mathbb V$; векторы ядра переходят в ноль, а образы добавленных векторов — базис образа.`,
        steps: [
          { title: md`Базис ядра и дополнение`, body: md`$\ker\varphi$ — подпространство конечномерного $\mathbb V$, у него есть базис $(\mathbf u_1,\dots,\mathbf u_k)$. Дополним его до базиса $\mathcal A=(\mathbf u_1,\dots,\mathbf u_k,\mathbf v_1,\dots,\mathbf v_r)$ пространства $\mathbb V$; $\dim\mathbb V=k+r$. Докажем, что $(\varphi(\mathbf v_1),\dots,\varphi(\mathbf v_r))$ — базис $\operatorname{Im}\varphi$.` },
          { title: md`Порождают образ`, body: md`Любой $\mathbf x=a_1\mathbf u_1+\dots+a_k\mathbf u_k+b_1\mathbf v_1+\dots+b_r\mathbf v_r$. Так как $\varphi(\mathbf u_i)=\mathbf 0$, $\varphi(\mathbf x)=b_1\varphi(\mathbf v_1)+\dots+b_r\varphi(\mathbf v_r)$.` },
          { title: md`Независимы: комбинация из ядра`, body: md`Пусть $b_1\varphi(\mathbf v_1)+\dots+b_r\varphi(\mathbf v_r)=\mathbf 0$. По линейности $\varphi(b_1\mathbf v_1+\dots+b_r\mathbf v_r)=\mathbf 0$, то есть $b_1\mathbf v_1+\dots+b_r\mathbf v_r\in\ker\varphi$, и он раскладывается по базису ядра: $=a_1\mathbf u_1+\dots+a_k\mathbf u_k$.` },
          { title: md`Независимы: коэффициенты нулевые`, body: md`Переносим: $-a_1\mathbf u_1-\dots-a_k\mathbf u_k+b_1\mathbf v_1+\dots+b_r\mathbf v_r=\mathbf 0$. Это векторы базиса $\mathcal A$, они независимы — все коэффициенты нулевые, в частности $b_1=\dots=b_r=0$.` },
          { title: md`Итог`, body: md`$\dim\ker\varphi=k$, $\dim\operatorname{Im}\varphi=r$, $\dim\mathbb V=k+r$.` },
        ],
      },
      uses: ['extend-to-basis', 'ker-im-subspaces'],
      notes: md`Для матрицы $A\in\operatorname{Mat}_{m\times n}$: $\dim\ker A+\operatorname{rk}A=n$ — свободных переменных $n-s$, ведущих $s$.

Следствия (утверждение 52): $\varphi$ инъективно $\iff\operatorname{rk}\varphi=\dim\mathbb V$; сюръективно $\iff\operatorname{rk}\varphi=\dim\mathbb W$; при $\dim\mathbb V=\dim\mathbb W$ инъективность, сюръективность и изоморфность равносильны.

Пример: $D:\mathbb R[t]_{\le3}\to\mathbb R[t]_{\le2}$: $\dim\ker D=1$, $\operatorname{rk}D=3$, $1+3=4$.

Попутно доказано: если $\mathbb V=\ker\varphi\oplus\mathbb L$, то $\varphi|_{\mathbb L}:\mathbb L\to\operatorname{Im}\varphi$ — изоморфизм (утверждение 51).`,
      pitfalls: [
        md`Справа $\dim\mathbb V$ — размерность пространства **аргументов**, а не значений; для матрицы — число столбцов.`,
        'Начинать нужно с базиса ядра и дополнять его; если начать с базиса 𝕍, образы базисных векторов могут быть зависимы.',
        'Независимость образов — главная часть доказательства; одного «они порождают образ» мало.',
      ],
    },
    {
      id: 'dim-sum',
      title: 'Формула размерности суммы подпространств',
      source: 'Лекция 9, утверждение 53',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для конечномерных подпространств $\mathbb U,\mathbb L\subseteq\mathbb V$:
$$\dim(\mathbb U+\mathbb L)+\dim(\mathbb U\cap\mathbb L)=\dim\mathbb U+\dim\mathbb L.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Теорема о размерностях для отображения сложения $\sigma:\mathbb U\times\mathbb L\to\mathbb V$: образ — $\mathbb U+\mathbb L$, ядро изоморфно $\mathbb U\cap\mathbb L$.`,
        steps: [
          { title: md`Отображение сложения`, body: md`$\sigma:\mathbb U\times\mathbb L\to\mathbb V$, $(\mathbf u,\mathbf l)\mapsto\mathbf u+\mathbf l$ — линейно (покомпонентные операции), и $\operatorname{Im}\sigma=\mathbb U+\mathbb L$ по определению суммы.` },
          { title: md`Ядро`, body: md`$\sigma(\mathbf u,\mathbf l)=\mathbf 0\iff\mathbf u=-\mathbf l$; тогда $\mathbf z=\mathbf u$ лежит и в $\mathbb U$, и в $\mathbb L$. Обратно, для $\mathbf z\in\mathbb U\cap\mathbb L$ $\sigma(\mathbf z,-\mathbf z)=\mathbf 0$. Значит, $\ker\sigma=\{(\mathbf z,-\mathbf z)\mid\mathbf z\in\mathbb U\cap\mathbb L\}$.` },
          { title: md`$\dim\ker\sigma=\dim(\mathbb U\cap\mathbb L)$`, body: md`$\mathbf z\mapsto(\mathbf z,-\mathbf z)$ — изоморфизм $\mathbb U\cap\mathbb L\to\ker\sigma$: линейно, обратное — взять первую компоненту. Изоморфизм сохраняет размерность.` },
          { title: md`Теорема о размерностях`, body: md`$\dim\mathbb U+\dim\mathbb L=\dim(\mathbb U\times\mathbb L)=\dim\ker\sigma+\dim\operatorname{Im}\sigma=\dim(\mathbb U\cap\mathbb L)+\dim(\mathbb U+\mathbb L)$.` },
        ],
      },
      uses: ['rank-nullity', 'product-basis'],
      notes: md`Пример: в $\mathbb R^3$ $\mathbb U=\operatorname{span}\{\mathbf e_1,\mathbf e_2\}$, $\mathbb L=\operatorname{span}\{\mathbf e_2,\mathbf e_3\}$: $\dim(\mathbb U+\mathbb L)=2+2-1=3$.

Следствия: сумма прямая $\iff\dim(\mathbb U+\mathbb L)=\dim\mathbb U+\dim\mathbb L$; две плоскости в $\mathbb R^3$ всегда пересекаются хотя бы по прямой ($\dim\cap\ge2+2-3=1$).`,
      pitfalls: [
        'Формула — для двух подпространств; для трёх аналог «включений-исключений» неверен.',
        md`Не забудь, что $\dim(\mathbb U\times\mathbb L)=\dim\mathbb U+\dim\mathbb L$ — это отдельный факт (базис произведения).`,
      ],
    },
    {
      id: 'rank-composition',
      title: 'Верхняя оценка ранга композиции',
      source: 'Лекция 9, утверждение 54',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для линейных $\varphi:\mathbb U\to\mathbb V$ и $\psi:\mathbb V\to\mathbb W$ (конечномерных):
$$\operatorname{rk}(\psi\circ\varphi)\le\min\{\operatorname{rk}\varphi,\operatorname{rk}\psi\}.$$
Для матриц: $\operatorname{rk}(BA)\le\min\{\operatorname{rk}A,\operatorname{rk}B\}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Образ композиции — образ $\operatorname{Im}\varphi$ под действием $\psi$: он порождается $r=\operatorname{rk}\varphi$ векторами и лежит в $\operatorname{Im}\psi$.`,
        steps: [
          { title: md`Образ композиции`, body: md`$\operatorname{Im}(\psi\circ\varphi)=\{\psi(\varphi(\mathbf x))\}=\psi(\operatorname{Im}\varphi)$.` },
          { title: md`$\le\operatorname{rk}\varphi$`, body: md`Пусть $(\mathbf v_1,\dots,\mathbf v_r)$ — базис $\operatorname{Im}\varphi$, $r=\operatorname{rk}\varphi$. Любой вектор $\operatorname{Im}\varphi$ — их комбинация, поэтому по линейности $\psi(\operatorname{Im}\varphi)=\operatorname{span}\{\psi(\mathbf v_1),\dots,\psi(\mathbf v_r)\}$. Из $r$ порождающих извлекается базис из не более чем $r$ векторов: $\operatorname{rk}(\psi\circ\varphi)\le r$.` },
          { title: md`$\le\operatorname{rk}\psi$`, body: md`Каждое значение композиции — значение $\psi$: $\operatorname{Im}(\psi\circ\varphi)\subseteq\operatorname{Im}\psi$. Размерность подпространства не больше размерности объемлющего.` },
          { title: md`Для матриц`, body: md`$BA$ — матрица композиции $\mathbb F^n\xrightarrow{A}\mathbb F^m\xrightarrow{B}\mathbb F^p$ в стандартных базисах, а ранг матрицы — ранг отображения.` },
        ],
      },
      uses: ['composition-matrix'],
      notes: md`Смысл: после применения линейного отображения число независимых направлений не растёт.

Следствие: если $A=BC$, $B\in\operatorname{Mat}_{m\times r}$, $C\in\operatorname{Mat}_{r\times n}$, то $\operatorname{rk}A\le r$. Нижняя оценка — неравенство Сильвестра $\operatorname{rk}(BA)\ge\operatorname{rk}A+\operatorname{rk}B-m$ — в список не входит.`,
      pitfalls: [
        'Равенства в общем случае нет: rk(BA) может быть 0 при ненулевых A и B (например, BA = 0).',
        md`Порядок: в $BA$ сначала действует $A$, затем $B$.`,
      ],
    },
    {
      id: 'rank-invertible',
      title: 'Сохранение ранга при умножении на обратимые матрицы',
      source: 'Лекция 9, утверждение 55',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Если $\beta:\mathbb U'\to\mathbb U$ и $\alpha:\mathbb W\to\mathbb W'$ — изоморфизмы, а $\varphi:\mathbb U\to\mathbb W$ линейно, то $\operatorname{rk}(\alpha\circ\varphi\circ\beta)=\operatorname{rk}\varphi$.

Для матриц: если $P\in\operatorname{Mat}_m(\mathbb F)$ и $Q\in\operatorname{Mat}_n(\mathbb F)$ обратимы, $A\in\operatorname{Mat}_{m\times n}(\mathbb F)$, то $\operatorname{rk}(PAQ)=\operatorname{rk}A$. В частности, элементарные преобразования строк и столбцов не меняют ранг.`,
      },
      proof: {
        level: 'basic',
        idea: md`Оценка ранга композиции в обе стороны: $\varphi$ получается из $\alpha\varphi\beta$ композицией с обратными изоморфизмами.`,
        steps: [
          { title: md`$\le$`, body: md`По оценке ранга композиции $\operatorname{rk}(\alpha\circ\varphi\circ\beta)\le\operatorname{rk}\varphi$ (ранг композиции не больше ранга любого множителя).` },
          { title: md`$\ge$`, body: md`$\varphi=\alpha^{-1}\circ(\alpha\circ\varphi\circ\beta)\circ\beta^{-1}$, а $\alpha^{-1},\beta^{-1}$ линейны. Снова по оценке $\operatorname{rk}\varphi\le\operatorname{rk}(\alpha\circ\varphi\circ\beta)$.` },
          { title: md`Для матриц`, body: md`Обратимые $P,Q$ задают изоморфизмы $\mathbb F^m\to\mathbb F^m$, $\mathbb F^n\to\mathbb F^n$, а $PAQ$ — матрица композиции $\varphi_P\circ\varphi_A\circ\varphi_Q$. Элементарное преобразование строк — умножение слева на обратимую элементарную матрицу, столбцов — справа.` },
        ],
      },
      uses: ['rank-composition'],
      notes: md`Лонгрид доказывает напрямую: $\beta$ сюръективно, поэтому $\operatorname{Im}(\varphi\circ\beta)=\operatorname{Im}\varphi$, а $\alpha$ изоморфно переводит $\operatorname{Im}\varphi$ в подпространство той же размерности.

Следствия: ранг матрицы не зависит от базисов ($T(\varphi,\mathcal A',\mathcal B')=DMC$ с обратимыми $C,D$); ранг равен числу ненулевых строк ступенчатого вида; подобные матрицы имеют одинаковый ранг.`,
      pitfalls: [
        'Обратимость обоих множителей важна: умножение на необратимую матрицу может уменьшить ранг.',
        md`$\operatorname{rk}(PA)=\operatorname{rk}A$, но оболочка столбцов $PA$ может отличаться от оболочки столбцов $A$ — совпадают только размерности.`,
      ],
    },
    {
      id: 'rouche-capelli',
      title: 'Совместность системы и равенство rk A = rk [A | b]',
      source: 'Неделя 9, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`(**Теорема Кронекера — Капелли.**) Система $A\mathbf x=\mathbf b$ совместна тогда и только тогда, когда $\operatorname{rk}A=\operatorname{rk}[A\mid\mathbf b]$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Совместность — это $\mathbf b\in\operatorname{span}$ столбцов $A$, то есть добавление $\mathbf b$ не расширяет оболочку; а у вложенных подпространств равенство размерностей означает равенство.`,
        steps: [
          { title: md`Две оболочки`, body: md`Пусть $\mathbb S=\operatorname{span}\{\mathbf a_1,\dots,\mathbf a_n\}$ и $\mathbb S'=\operatorname{span}\{\mathbf a_1,\dots,\mathbf a_n,\mathbf b\}$. Тогда $\mathbb S\subseteq\mathbb S'$, $\operatorname{rk}A=\dim\mathbb S$, $\operatorname{rk}[A\mid\mathbf b]=\dim\mathbb S'$.` },
          { title: md`$\Rightarrow$`, body: md`Если система совместна, то $\mathbf b\in\mathbb S$ (совместность и оболочка столбцов). Тогда всякая комбинация $\mathbf a_1,\dots,\mathbf a_n,\mathbf b$ — комбинация $\mathbf a_j$: $\mathbb S'=\mathbb S$, ранги равны.` },
          { title: md`$\Leftarrow$`, body: md`Если $\dim\mathbb S=\dim\mathbb S'$ и $\mathbb S\subseteq\mathbb S'$, то $\mathbb S=\mathbb S'$ (подпространство полной размерности совпадает со всем пространством). Значит, $\mathbf b\in\mathbb S'=\mathbb S$, и система совместна.` },
        ],
      },
      uses: ['consistency-span', 'subspace-dim'],
      notes: md`Связь с Гауссом: $\operatorname{rk}[A\mid\mathbf b]>\operatorname{rk}A$ ровно тогда, когда в ступенчатом виде есть строка $[0\ \dots\ 0\mid c]$, $c\ne0$.

Вместе с теоремой о размерностях: если система совместна, множество решений — сдвиг подпространства размерности $n-\operatorname{rk}A$.

Всегда $\operatorname{rk}A\le\operatorname{rk}[A\mid\mathbf b]\le\operatorname{rk}A+1$.`,
      pitfalls: [
        md`Ранги сравниваются у $A$ и $[A\mid\mathbf b]$, а не у $A$ и $\mathbf b$.`,
        md`Из $\dim\mathbb S=\dim\mathbb S'$ равенство $\mathbb S=\mathbb S'$ следует только потому, что $\mathbb S\subseteq\mathbb S'$ — это надо сказать.`,
      ],
    },
    {
      id: 'rank-sum',
      title: 'Оценки ранга суммы: |rk A − rk B| ≤ rk(A + B) ≤ rk A + rk B',
      source: 'Неделя 9, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Для $A,B\in\operatorname{Mat}_{m\times n}(\mathbb F)$:
$$|\operatorname{rk}A-\operatorname{rk}B|\le\operatorname{rk}(A+B)\le\operatorname{rk}A+\operatorname{rk}B.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Столбцы $A+B$ лежат в $\operatorname{Im}A+\operatorname{Im}B$, размерность суммы не больше суммы размерностей; нижняя оценка — та же верхняя для $A=(A+B)+(-B)$.`,
        steps: [
          { title: md`Образ суммы`, body: md`$(A+B)\mathbf x=A\mathbf x+B\mathbf x\in\operatorname{Im}A+\operatorname{Im}B$, поэтому $\operatorname{Im}(A+B)\subseteq\operatorname{Im}A+\operatorname{Im}B$ и $\operatorname{rk}(A+B)\le\dim(\operatorname{Im}A+\operatorname{Im}B)$.` },
          { title: md`Размерность суммы`, body: md`Объединение базисов $\operatorname{Im}A$ ($\operatorname{rk}A$ векторов) и $\operatorname{Im}B$ ($\operatorname{rk}B$ векторов) порождает $\operatorname{Im}A+\operatorname{Im}B$; из него извлекается базис, так что $\dim(\operatorname{Im}A+\operatorname{Im}B)\le\operatorname{rk}A+\operatorname{rk}B$. (Или по формуле размерности суммы.)` },
          { title: md`Нижняя оценка`, body: md`$A=(A+B)+(-B)$ и $\operatorname{rk}(-B)=\operatorname{rk}B$, поэтому по верхней оценке $\operatorname{rk}A\le\operatorname{rk}(A+B)+\operatorname{rk}B$, то есть $\operatorname{rk}A-\operatorname{rk}B\le\operatorname{rk}(A+B)$.` },
          { title: md`Симметрично`, body: md`Так же $B=(A+B)+(-A)$ даёт $\operatorname{rk}B-\operatorname{rk}A\le\operatorname{rk}(A+B)$. Вместе — модуль.` },
        ],
      },
      uses: ['subspace-dim'],
      notes: md`Обе оценки достигаются: $A=B=E_{11}$ — $\operatorname{rk}(A+B)=1<2$; $A=E_{11}$, $B=E_{22}$ — $\operatorname{rk}(A+B)=2=1+1$; $B=-A$ — $\operatorname{rk}(A+B)=0=|\operatorname{rk}A-\operatorname{rk}B|$.`,
      pitfalls: [
        md`$\operatorname{Im}(A+B)$ лишь содержится в $\operatorname{Im}A+\operatorname{Im}B$, а не равен ему: при $B=-A$ слева $\{\mathbf 0\}$.`,
        md`Для нижней оценки нужен факт $\operatorname{rk}(-B)=\operatorname{rk}B$ — у $B$ и $-B$ один образ.`,
      ],
    },
  ],
};
