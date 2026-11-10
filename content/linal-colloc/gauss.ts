import { md, type Topic } from '../../src/content/schema';

// Лекция 2. Элементарные преобразования и метод Гаусса

export const gauss: Topic = {
  id: 'gauss',
  title: 'Элементарные преобразования и метод Гаусса',
  longread: 2,
  units: [
    {
      id: 'elementary-ops',
      title: 'Элементарные преобразования строк',
      source: 'Лекция 2, §6.1',
      definition: {
        level: 'basic',
        text: md`**Элементарные преобразования строк** матрицы — операции трёх видов:
1. $\mathbf r_i\mapsto\mathbf r_i+\lambda\mathbf r_j$, $i\ne j$, $\lambda\in\mathbb F$ — прибавить к строке другую, умноженную на скаляр;
2. $\mathbf r_i\leftrightarrow\mathbf r_j$, $i\ne j$ — переставить две строки;
3. $\mathbf r_i\mapsto\lambda\mathbf r_i$, $\lambda\ne0$ — умножить строку на ненулевой скаляр.

Каждое обратимо: обратные — $\mathbf r_i\mapsto\mathbf r_i-\lambda\mathbf r_j$, снова $\mathbf r_i\leftrightarrow\mathbf r_j$, $\mathbf r_i\mapsto\lambda^{-1}\mathbf r_i$.`,
      },
      pitfalls: [
        'Умножать строку на ноль нельзя: такое преобразование необратимо и теряет информацию.',
        md`В первом виде $i\ne j$: «$\mathbf r_i\mapsto\mathbf r_i+\lambda\mathbf r_i$» — это умножение строки на $1+\lambda$, которое при $\lambda=-1$ обнулит строку.`,
      ],
    },
    {
      id: 'elementary-matrix',
      title: 'Элементарная матрица',
      source: 'Лекция 2, §6.2',
      definition: {
        level: 'basic',
        text: md`**Элементарная матрица** — матрица, полученная из единичной $I_m$ одним элементарным преобразованием строк:
- $S_{ij}(\lambda)$ — из $I_m$ преобразованием $\mathbf r_i\mapsto\mathbf r_i+\lambda\mathbf r_j$ (единицы на диагонали и $\lambda$ на месте $(i,j)$);
- $P_{ij}$ — перестановкой $\mathbf r_i\leftrightarrow\mathbf r_j$;
- $D_i(\lambda)$ — умножением $\mathbf r_i\mapsto\lambda\mathbf r_i$, $\lambda\ne0$.`,
      },
      notes: md`Например, в $\operatorname{Mat}_3$: $S_{12}(\lambda)=\begin{pmatrix}1&\lambda&0\\0&1&0\\0&0&1\end{pmatrix}$, $P_{13}=\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix}$, $D_2(\lambda)=\operatorname{diag}(1,\lambda,1)$.`,
      pitfalls: [md`В $S_{ij}(\lambda)$ число $\lambda$ стоит в строке $i$ и столбце $j$ — там, какую строку меняем и какую прибавляем.`],
    },
    {
      id: 'row-echelon',
      title: 'Ступенчатый вид матрицы',
      source: 'Лекция 2, §7',
      definition: {
        level: 'basic',
        text: md`**Ведущий элемент** ненулевой строки — её первый слева ненулевой элемент. Матрица в **ступенчатом виде**, если
1. все нулевые строки ниже всех ненулевых;
2. ведущий элемент каждой следующей ненулевой строки стоит строго правее, чем у предыдущей.`,
      },
      notes: md`Любую матрицу элементарными преобразованиями строк можно привести к ступенчатому виду (прямой ход алгоритма Гаусса). Ступенчатый вид не единственен.`,
      pitfalls: ['В ступенчатом виде под ведущим элементом стоят нули, но над ним — что угодно.'],
    },
    {
      id: 'rref',
      title: 'Улучшенный ступенчатый вид',
      source: 'Лекция 2, §7 и §9',
      definition: {
        level: 'basic',
        text: md`Матрица в **улучшенном ступенчатом виде** (RREF), если она в ступенчатом виде и, кроме того,
1. ведущий элемент каждой ненулевой строки равен $1$;
2. в каждом столбце с ведущим элементом все остальные элементы — нули.

У каждой матрицы улучшенный ступенчатый вид единственен; его обозначают $\operatorname{rref}(A)$.`,
      },
      notes: md`Алгоритм Гаусса: прямой ход приводит к ступенчатому виду (ищем первый ненулевой столбец, переставляем строку с ненулевым элементом наверх, обнуляем всё под ним, переходим к подматрице правее и ниже), обратный ход — снизу вверх делим строку на ведущий элемент и обнуляем всё над ним.

Единственность RREF в лонгриде сформулирована без доказательства.`,
      pitfalls: [
        'Ступенчатый вид неединствен, а улучшенный — единственен: говорить «rref(A)» можно, «ступенчатый вид A» — нет.',
        'Ведущие единицы должны быть единственными ненулевыми элементами СВОИХ столбцов; в других столбцах над ними могут стоять любые числа.',
      ],
    },
    {
      id: 'elementary-matrices',
      title: 'Элементарные матрицы: действие на строки и обратимость',
      source: 'Лекция 2, утверждения 6 и 7',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`1. Для $A\in\operatorname{Mat}_{m\times n}(\mathbb F)$ умножение **слева** на $S_{ij}(\lambda)$, $P_{ij}$, $D_i(\lambda)$ выполняет над строками $A$ соответственно $\mathbf r_i\mapsto\mathbf r_i+\lambda\mathbf r_j$, $\mathbf r_i\leftrightarrow\mathbf r_j$, $\mathbf r_i\mapsto\lambda\mathbf r_i$.
2. Все элементарные матрицы обратимы:
$$S_{ij}(\lambda)^{-1}=S_{ij}(-\lambda),\quad P_{ij}^{-1}=P_{ij},\quad D_i(\lambda)^{-1}=D_i(\lambda^{-1}).$$`,
      },
      proof: {
        level: 'basic',
        idea: md`$k$-я строка произведения $EA$ — это $k$-я строка $E$, умноженная на $A$, то есть комбинация строк $A$ с коэффициентами из $k$-й строки $E$.`,
        steps: [
          { title: md`Строки произведения`, body: md`$(EA)_{k\ast}=\sum_\ell e_{k\ell}\,\mathbf r_\ell(A)$: $k$-я строка $EA$ — линейная комбинация строк $A$ с коэффициентами из $k$-й строки $E$. У $I_m$ $k$-я строка — $\mathbf e_k^{\mathsf T}$, она выбирает ровно $\mathbf r_k$.` },
          { title: md`Неизменённые строки`, body: md`Все строки $E$, кроме изменённых, совпадают со строками $I_m$, поэтому соответствующие строки $A$ остаются на месте.` },
          { title: md`Изменённые строки`, body: md`У $S_{ij}(\lambda)$ $i$-я строка — $\mathbf e_i^{\mathsf T}+\lambda\mathbf e_j^{\mathsf T}$, она даёт $\mathbf r_i+\lambda\mathbf r_j$. У $P_{ij}$ $i$-я строка — $\mathbf e_j^{\mathsf T}$, $j$-я — $\mathbf e_i^{\mathsf T}$: строки меняются. У $D_i(\lambda)$ $i$-я строка $\lambda\mathbf e_i^{\mathsf T}$ даёт $\lambda\mathbf r_i$.` },
          { title: md`Обратимость`, body: md`По п. 1 произведение $S_{ij}(-\lambda)S_{ij}(\lambda)$ — это $I_m$, к которой применили $\mathbf r_i\mapsto\mathbf r_i+\lambda\mathbf r_j$, а потом $\mathbf r_i\mapsto\mathbf r_i-\lambda\mathbf r_j$, — снова $I_m$; в другом порядке так же. Аналогично $P_{ij}P_{ij}=I_m$ (две перестановки) и $D_i(\lambda^{-1})D_i(\lambda)=I_m$.` },
        ],
      },
      notes: md`Умножение **справа** на элементарную матрицу делает аналогичное преобразование **столбцов**.`,
      pitfalls: [
        'Преобразование строк — умножение СЛЕВА; справа получатся преобразования столбцов.',
        md`$D_i(\lambda)$ обратима только при $\lambda\ne0$ — поэтому умножать строку на ноль в методе Гаусса нельзя.`,
      ],
    },
    {
      id: 'column-relations',
      title: 'Сохранение линейных соотношений между столбцами при преобразованиях строк',
      source: 'Неделя 2, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $A=[\mathbf a_1\ \dots\ \mathbf a_n]$, а $A'=[\mathbf a_1'\ \dots\ \mathbf a_n']$ получена из $A$ элементарными преобразованиями строк. Тогда для любых $\lambda_1,\dots,\lambda_n\in\mathbb F$
$$\lambda_1\mathbf a_1+\dots+\lambda_n\mathbf a_n=\mathbf 0\iff\lambda_1\mathbf a_1'+\dots+\lambda_n\mathbf a_n'=\mathbf 0.$$
В частности, набор столбцов $A$ независим тогда и только тогда, когда независимы те же столбцы $A'$, и столбец выражается через другие с теми же коэффициентами.`,
      },
      proof: {
        level: 'basic',
        idea: md`$A'=EA$ с обратимой $E$, поэтому $\mathbf a_j'=E\mathbf a_j$, и умножение на обратимую $E$ переводит нулевую комбинацию в нулевую и обратно.`,
        steps: [
          { title: md`Преобразования — умножение на $E$`, body: md`Каждое элементарное преобразование строк — умножение слева на элементарную матрицу, поэтому $A'=EA$, где $E$ — их произведение. Оно обратимо как произведение обратимых.` },
          { title: md`Столбцы по отдельности`, body: md`$j$-й столбец $EA$ — это $E\mathbf a_j$, то есть $\mathbf a_j'=E\mathbf a_j$.` },
          { title: md`$\Rightarrow$`, body: md`Если $\sum\lambda_j\mathbf a_j=\mathbf 0$, то $\sum\lambda_j\mathbf a_j'=\sum\lambda_jE\mathbf a_j=E\big(\sum\lambda_j\mathbf a_j\big)=E\mathbf 0=\mathbf 0$.` },
          { title: md`$\Leftarrow$`, body: md`Если $E\big(\sum\lambda_j\mathbf a_j\big)=\mathbf 0$, умножаем слева на $E^{-1}$: $\sum\lambda_j\mathbf a_j=\mathbf 0$.` },
        ],
      },
      uses: ['elementary-matrices'],
      notes: md`Иначе: $\ker A=\ker A'$ — соотношение $\sum\lambda_j\mathbf a_j=\mathbf 0$ означает $(\lambda_1,\dots,\lambda_n)^{\mathsf T}\in\ker A$.

Практическое следствие: в $\operatorname{rref}(A)$ соотношения между столбцами видны сразу, и те же соотношения верны для столбцов исходной $A$. Поэтому столбцы $A$ на ведущих позициях — базис оболочки столбцов, а остальные столбцы выражаются через них с коэффициентами из RREF.`,
      pitfalls: [
        md`Сохраняются соотношения между столбцами, а не сами столбцы и не их оболочка: $\operatorname{span}$ столбцов $A'$ может отличаться от $\operatorname{span}$ столбцов $A$.`,
        'Базис оболочки столбцов берут из исходной матрицы, а не из ступенчатой.',
      ],
    },
    {
      id: 'gauss-inverse',
      title: 'Нахождение обратной матрицы методом Гаусса',
      source: 'Лекция 2, утверждение 10; неделя 2, семинар',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $A\in\operatorname{Mat}_n(\mathbb F)$ элементарными преобразованиями строк приводится к $I_n$: $A=A_0\mapsto A_1\mapsto\dots\mapsto A_k=I_n$, и $E_i$ — элементарная матрица $i$-го шага ($A_i=E_iA_{i-1}$). Тогда $A$ обратима и $A^{-1}=E_kE_{k-1}\cdots E_1$.

**Алгоритм:** приводим $[A\mid I_n]$ к улучшенному ступенчатому виду. Если слева получилась $I_n$, то справа стоит $A^{-1}$: $[A\mid I_n]\mapsto[I_n\mid A^{-1}]$. Если слева появилась нулевая строка, $A$ необратима.`,
      },
      proof: {
        level: 'basic',
        idea: md`Произведение элементарных матриц $E=E_k\cdots E_1$ — левая обратная к $A$; оно же получается, если те же преобразования применить к $I_n$.`,
        steps: [
          { title: md`Собираем шаги`, body: md`Подставляя $A_i=E_iA_{i-1}$ последовательно, получаем $I_n=A_k=E_kE_{k-1}\cdots E_1A$. Обозначим $E=E_k\cdots E_1$, тогда $EA=I_n$.` },
          { title: md`$E$ — двусторонняя обратная`, body: md`$E$ обратима как произведение обратимых элементарных матриц. Умножим $EA=I_n$ слева на $E^{-1}$: $A=E^{-1}$. Тогда $AE=E^{-1}E=I_n$, так что $E$ — двусторонняя обратная, и $A^{-1}=E$.` },
          { title: md`Почему работает $[A\mid I_n]$`, body: md`Преобразования строк блочной матрицы — умножение слева: $E[A\mid I_n]=[EA\mid EI_n]=[I_n\mid E]=[I_n\mid A^{-1}]$. В правой половине накапливается то же произведение $E$.` },
          { title: md`Необратимый случай`, body: md`Если в RREF левой половины есть нулевая строка, то $\operatorname{rref}(A)\ne I_n$, и $A$ необратима: $\operatorname{rref}(A)=EA$ было бы обратимым как произведение обратимых, а у обратимой матрицы нет нулевых строк ($RB=I_n$ невозможно при нулевой строке $R$).` },
        ],
      },
      uses: ['elementary-matrices', 'inverse-unique'],
      notes: md`Пример: $\left[\begin{array}{cc|cc}1&2&1&0\\3&5&0&1\end{array}\right]\xrightarrow{\mathbf r_2-3\mathbf r_1}\left[\begin{array}{cc|cc}1&2&1&0\\0&-1&-3&1\end{array}\right]\xrightarrow{-\mathbf r_2}\left[\begin{array}{cc|cc}1&2&1&0\\0&1&3&-1\end{array}\right]\xrightarrow{\mathbf r_1-2\mathbf r_2}\left[\begin{array}{cc|cc}1&0&-5&2\\0&1&3&-1\end{array}\right]$, так что $A^{-1}=\begin{pmatrix}-5&2\\3&-1\end{pmatrix}$.

Обратное направление ($A$ обратима $\Rightarrow\operatorname{rref}(A)=I_n$) — в критериях обратимости.`,
      pitfalls: [
        md`Порядок множителей: $A^{-1}=E_k\cdots E_1$ — последнее преобразование слева.`,
        'Преобразовывать можно только строки (или только столбцы) — смешивать нельзя: столбцовые преобразования — умножение справа.',
        'Не забудь проверить ответ: A · A⁻¹ = I.',
      ],
    },
  ],
};
