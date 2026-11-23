import { md, type Topic } from '../../src/content/schema';

// Лекция 11. Определители (лонгрид «Недели 1–13», §55–60; пункты «нед 11, сем» — без семинарского листа, стандартными доказательствами)

export const det: Topic = {
  id: 'det',
  title: 'Определители',
  longread: 11,
  units: [
    {
      id: 'det-def',
      title: 'Определитель матрицы n×n',
      source: 'Лекция 11, §55 и утверждение 62',
      definition: {
        level: 'basic',
        text: md`Над полем $\mathbb F$ с $1+1\ne0$ **определитель** — единственная функция $\det:\operatorname{Mat}_n(\mathbb F)\to\mathbb F$ от столбцов матрицы $A=[\mathbf c_1\ \dots\ \mathbf c_n]$, которая
1. линейна по каждому столбцу при фиксированных остальных;
2. равна нулю, если два столбца совпадают;
3. на единичной матрице равна единице: $\det I_n=1$.

Явная формула: $\det A=\sum\limits_{\sigma\in S_n}\operatorname{sgn}\sigma\prod\limits_{k=1}^n a_{\sigma(k),k}$.`,
      },
      notes: md`Из правил 1–2 следует, что при перестановке двух столбцов определитель меняет знак (утверждение 61). Обратное тоже верно, если $2\ne0$: при равных столбцах $D=-D$, откуда $D=0$.

В каждом слагаемом формулы из каждой строки и каждого столбца взято ровно по одному элементу — «ладьи, которые не бьют друг друга». Для $n=2$ получается $ad-bc$, для $n=3$ — шесть слагаемых, как в лекции 5.

Определитель пустой матрицы ($n=0$) считают равным $1$.`,
      pitfalls: [
        md`Определитель не линеен по всей матрице: $\det(A+B)\ne\det A+\det B$ и $\det(\lambda A)=\lambda^n\det A$, а не $\lambda\det A$.`,
        'Определитель есть только у квадратных матриц.',
      ],
    },
    {
      id: 'perm-sign',
      title: 'Перестановка и её знак',
      source: 'Лекция 11, §60',
      definition: {
        level: 'basic',
        text: md`**Перестановка** на $n$ элементах — биекция $\sigma:\{1,\dots,n\}\to\{1,\dots,n\}$; все они образуют $S_n$. **Транспозиция** $(i\ j)$ меняет местами $i\ne j$ и оставляет остальные на месте.

Любая перестановка — произведение транспозиций, и чётность их числа $s$ не зависит от разложения. **Знак** перестановки — $\operatorname{sgn}\sigma=(-1)^s$; перестановка **чётная** при чётном $s$ и **нечётная** при нечётном.`,
      },
      notes: md`$\operatorname{sgn}(\tau\sigma)=\operatorname{sgn}\tau\operatorname{sgn}\sigma$, $\operatorname{sgn}\sigma^{-1}=\operatorname{sgn}\sigma$, знак транспозиции $-1$.

Если $F(\mathbf v_1,\dots,\mathbf v_n)$ меняет знак при обмене любых двух аргументов, то $F(\mathbf v_{\sigma(1)},\dots,\mathbf v_{\sigma(n)})=\operatorname{sgn}\sigma\,F(\mathbf v_1,\dots,\mathbf v_n)$.

**Пример.** $\sigma=(2,3,1)$ (то есть $1\mapsto2$, $2\mapsto3$, $3\mapsto1$) — два обмена, $\operatorname{sgn}\sigma=+1$.`,
      pitfalls: ['Знак — это чётность числа транспозиций в любом разложении; само число транспозиций от разложения зависит.'],
    },
    {
      id: 'minor-cofactor',
      title: 'Минор и алгебраическое дополнение',
      source: 'Лекция 11, §58',
      definition: {
        level: 'basic',
        text: md`Пусть $A\in\operatorname{Mat}_n(\mathbb F)$, $A^{(i\mid j)}$ — матрица $(n-1)\times(n-1)$, полученная вычёркиванием $i$-й строки и $j$-го столбца. **Минор** элемента $a_{ij}$ — $M_{ij}=\det A^{(i\mid j)}$, его **алгебраическое дополнение** — $C_{ij}=(-1)^{i+j}M_{ij}$.`,
      },
      notes: md`Знаки $(-1)^{i+j}$ расставлены шахматной доской, в левом верхнем углу «$+$».`,
      pitfalls: [md`Алгебраическое дополнение отличается от минора знаком $(-1)^{i+j}$ — не забывай его.`],
    },
    {
      id: 'adjugate-def',
      title: 'Присоединённая матрица',
      source: 'Неделя 11, семинар',
      definition: {
        level: 'basic',
        text: md`**Присоединённая матрица** к $A\in\operatorname{Mat}_n(\mathbb F)$ — матрица $\operatorname{adj}A$, у которой на месте $(i,j)$ стоит алгебраическое дополнение $C_{ji}$: $\operatorname{adj}A=(C_{ij})^{\mathsf T}$.`,
      },
      notes: md`Для $2\times2$: $\operatorname{adj}\begin{pmatrix}a&b\\c&d\end{pmatrix}=\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$.`,
      pitfalls: ['Матрицу алгебраических дополнений надо транспонировать: в строке i присоединённой стоят дополнения i-го столбца A.'],
    },
    {
      id: 'det-normalization',
      title: 'Функция, линейная по столбцам и равная нулю при равных столбцах, пропорциональна определителю',
      source: 'Лекция 11, §55.4',
      aux: true,
      statement: {
        level: 'basic',
        text: md`Пусть $F:\operatorname{Mat}_n(\mathbb F)\to\mathbb F$ линейна по каждому столбцу и равна нулю, если два столбца совпадают. Тогда $F(A)=F(I_n)\det A$ для любой $A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Раскладываем каждый столбец по $\mathbf e_1,\dots,\mathbf e_n$ и раскрываем по линейности: остаются только перестановки стандартных столбцов, каждая даёт $\operatorname{sgn}\sigma\,F(I_n)$.`,
        steps: [
          { title: md`Обмен столбцов меняет знак`, body: md`$0=F(\dots,\mathbf u+\mathbf v,\dots,\mathbf u+\mathbf v,\dots)=F(\dots,\mathbf u,\dots,\mathbf v,\dots)+F(\dots,\mathbf v,\dots,\mathbf u,\dots)$: слагаемые с двумя $\mathbf u$ и с двумя $\mathbf v$ равны нулю.` },
          { title: md`Раскрываем по линейности`, body: md`$\mathbf c_k=\sum_j a_{jk}\mathbf e_j$, поэтому $F(A)=\sum_{j_1,\dots,j_n}a_{j_1,1}\cdots a_{j_n,n}\,F(\mathbf e_{j_1},\dots,\mathbf e_{j_n})$.` },
          { title: md`Повторы дают ноль`, body: md`Если среди $j_1,\dots,j_n$ есть одинаковые, у матрицы два равных столбца и $F=0$. Остаются наборы, где $j_k=\sigma(k)$ для перестановки $\sigma\in S_n$.` },
          { title: md`Перестановка столбцов — знак`, body: md`Столбцы $\mathbf e_{\sigma(1)},\dots,\mathbf e_{\sigma(n)}$ приводятся к $I_n$ обменами, каждый меняет знак: $F(\mathbf e_{\sigma(1)},\dots,\mathbf e_{\sigma(n)})=\operatorname{sgn}\sigma\,F(I_n)$.` },
          { title: md`Собираем`, body: md`$F(A)=F(I_n)\sum_{\sigma\in S_n}\operatorname{sgn}\sigma\prod_k a_{\sigma(k),k}=F(I_n)\det A$. Нигде не нужно, чтобы $F(I_n)\ne0$.` },
        ],
      },
      pitfalls: ['Условие F(Iₙ) = 1 здесь не нужно — в этом весь смысл: так доказывают формулы для det(AB) и блочных матриц.'],
    },

    // ---------- Лёгкие вопросы ----------
    {
      id: 'det-elementary',
      title: 'Изменение определителя при элементарных преобразованиях строк и столбцов',
      source: 'Лекция 11, утверждение 63 и §57.2',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $A\in\operatorname{Mat}_n(\mathbb F)$ и $A'$ получена из $A$ одним элементарным преобразованием столбцов или строк. Тогда
1. перестановка двух столбцов (строк): $\det A'=-\det A$;
2. умножение столбца (строки) на $\lambda$: $\det A'=\lambda\det A$;
3. прибавление к столбцу (строке) другого, умноженного на $\lambda$: $\det A'=\det A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Для столбцов всё следует из определяющих правил; для строк — транспонированием, так как $\det A^{\mathsf T}=\det A$.`,
        steps: [
          { title: md`Обмен столбцов`, body: md`По правилу 2 $\det(\dots,\mathbf u+\mathbf v,\dots,\mathbf u+\mathbf v,\dots)=0$. Раскрываем по линейности: $0=\det(\dots,\mathbf u,\dots,\mathbf u,\dots)+\det(\dots,\mathbf u,\dots,\mathbf v,\dots)+\det(\dots,\mathbf v,\dots,\mathbf u,\dots)+\det(\dots,\mathbf v,\dots,\mathbf v,\dots)$; крайние слагаемые нулевые, значит, средние противоположны.` },
          { title: md`Умножение столбца`, body: md`Частный случай линейности по $i$-му столбцу: $\det(\dots,\lambda\mathbf c_i,\dots)=\lambda\det(\dots,\mathbf c_i,\dots)$.` },
          { title: md`Прибавление столбца`, body: md`По линейности $\det(\dots,\mathbf c_i+\lambda\mathbf c_j,\dots,\mathbf c_j,\dots)=\det A+\lambda\det(\dots,\mathbf c_j,\dots,\mathbf c_j,\dots)$, а во втором слагаемом два равных столбца — оно ноль.` },
          { title: md`Строки — через транспонирование`, body: md`Преобразование строк $A$ — то же преобразование столбцов $A^{\mathsf T}$. Так как $\det A^{\mathsf T}=\det A$ и $\det A'^{\mathsf T}=\det A'$, правила для строк те же.` },
        ],
      },
      uses: ['det-transpose'],
      notes: md`Следствия: матрица с нулевым столбцом (строкой) или со столбцом, линейно выражающимся через остальные, имеет определитель $0$.

На языке элементарных матриц: $\det(EA)=\det E\det A$, где $\det E$ равен $-1$, $\lambda$ или $1$ для трёх типов.

**Пример.** $\det\begin{pmatrix}0&1&2\\1&2&0\\2&1&1\end{pmatrix}$: обмен $C_1\leftrightarrow C_2$, затем $R_2-2R_1$, $R_3-R_1$, $R_3-2R_2$ — получаем треугольную с диагональю $1,1,7$. Знак поменялся один раз: $\det A=-7$.`,
      pitfalls: [
        md`Умножение строки на $\lambda$ умножает определитель на $\lambda$; $\det(\lambda A)=\lambda^n\det A$ — это умножение всех $n$ строк.`,
        md`При $R_i\mapsto\lambda R_i+R_j$ определитель умножается на $\lambda$: это не «чистое» преобразование третьего типа.`,
      ],
    },
    {
      id: 'det-triangular',
      title: 'Определитель треугольной матрицы',
      source: 'Лекция 11, утверждение 64',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Определитель верхнетреугольной или нижнетреугольной матрицы равен произведению диагональных элементов: $\det A=a_{11}a_{22}\cdots a_{nn}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Если диагональ без нулей, прибавлением столбцов обнуляем всё над диагональю и выносим множители; если на диагонали ноль — столбцы зависимы.`,
        steps: [
          { title: md`Диагональ без нулей: чистим столбцы`, body: md`Пусть $A$ верхнетреугольная и все $a_{jj}\ne0$. Идём по столбцам слева направо: из $j$-го столбца вычитаем кратные столбцов $1,\dots,j-1$ и обнуляем его элементы над диагональью (столбец $k<j$ к этому моменту равен $a_{kk}\mathbf e_k$). Определитель не меняется.` },
          { title: md`Выносим множители`, body: md`Получилась $\operatorname{diag}(a_{11},\dots,a_{nn})$. Вынося $a_{jj}$ из каждого столбца, получаем $a_{11}\cdots a_{nn}\det I_n=a_{11}\cdots a_{nn}$.` },
          { title: md`На диагонали ноль`, body: md`Пусть $a_{jj}=0$. Первые $j$ столбцов имеют ненулевые координаты только на первых $j-1$ местах — это $j$ векторов в $(j-1)$-мерном подпространстве, они зависимы. Один столбец выражается через остальные, вычитанием делаем его нулевым — $\det A=0=a_{11}\cdots a_{nn}$.` },
          { title: md`Нижнетреугольная`, body: md`$A^{\mathsf T}$ верхнетреугольная с той же диагональю, а $\det A=\det A^{\mathsf T}$. (Или то же рассуждение, обнуляя столбцы справа налево.)` },
        ],
      },
      uses: ['det-elementary', 'det-transpose'],
      notes: md`Это основа вычисления: методом Гаусса приводим к треугольному виду, считая обмены и вынесенные множители.

Также по формуле: в сумме по перестановкам у треугольной матрицы ненулевое только слагаемое тождественной перестановки.`,
      pitfalls: ['Для матрицы с нулями под побочной диагональю формула другая: там появляется знак перестановки.'],
    },
    {
      id: 'det-invertible',
      title: 'Критерий обратимости через определитель',
      source: 'Лекция 11, утверждение 65',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Квадратная матрица $A$ обратима тогда и только тогда, когда $\det A\ne0$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Элементарные преобразования столбцов умножают определитель на ненулевое число; обратимая матрица приводится ими к $I_n$, необратимая — к матрице с нулевым столбцом.`,
        steps: [
          { title: md`Преобразования не обнуляют`, body: md`Каждое элементарное преобразование столбцов умножает $\det$ на $-1$, на $\lambda\ne0$ или на $1$. Значит, «$\det=0$» и «$\det\ne0$» сохраняются.` },
          { title: md`Метод Гаусса по столбцам`, body: md`Приведём $A$ преобразованиями столбцов к улучшенному ступенчатому виду по столбцам — это метод Гаусса для $A^{\mathsf T}$ с последующим транспонированием.` },
          { title: md`Обратима — получаем $I_n$`, body: md`$A$ обратима $\iff$ $A^{\mathsf T}$ обратима $\iff\operatorname{rref}(A^{\mathsf T})=I_n$. Тогда вид по столбцам — $I_n$, $\det I_n=1\ne0$, значит, $\det A\ne0$.` },
          { title: md`Необратима — нулевой столбец`, body: md`Иначе в ступенчатом виде по столбцам есть нулевой столбец, его определитель $0$, значит, и $\det A=0$.` },
        ],
      },
      uses: ['det-elementary', 'invertibility-criteria'],
      notes: md`**Другой путь «$\Rightarrow$».** Если $A$ обратима, $\det A\cdot\det A^{-1}=\det I_n=1$, так что $\det A\ne0$ (через определитель произведения).

**Другой путь «$\Leftarrow$».** Если $A$ необратима, её столбцы зависимы: один выражается через остальные, вычитанием делаем его нулевым — $\det A=0$.

Сюда же: $\ker A\ne\{\mathbf 0\}\iff\det A=0$ — на этом держится поиск собственных значений.`,
      pitfalls: ['Обратимость — свойство квадратной матрицы: для неквадратной определителя нет.'],
    },
    {
      id: 'det-block',
      title: 'Определитель блочно-треугольной матрицы',
      source: 'Лекция 11, утверждение 69',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $A\in\operatorname{Mat}_k(\mathbb F)$, $D\in\operatorname{Mat}_m(\mathbb F)$, размеры $B$ и $C$ согласованы. Тогда
$$\det\begin{pmatrix}A&B\\0&D\end{pmatrix}=\det A\det D=\det\begin{pmatrix}A&0\\C&D\end{pmatrix}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`При фиксированных $B,D$ определитель — функция столбцов $A$, линейная и обнуляющаяся на равных столбцах, значит, равен $\det A$, умноженному на своё значение при $A=I_k$.`,
        steps: [
          { title: md`Функция от столбцов $A$`, body: md`Положим $F(A)=\det\begin{pmatrix}A&B\\0&D\end{pmatrix}$. Столбцы $A$ вместе с нулями под ними — первые $k$ столбцов большой матрицы, поэтому $F$ линейна по каждому столбцу $A$ и равна $0$ при двух равных столбцах.` },
          { title: md`Пропорциональна $\det A$`, body: md`По лемме $F(A)=F(I_k)\det A$.` },
          { title: md`Убираем $B$`, body: md`В $\begin{pmatrix}I_k&B\\0&D\end{pmatrix}$ из каждого правого столбца вычтем комбинацию первых $k$ столбцов (это $\mathbf e_1,\dots,\mathbf e_k$) и обнулим блок $B$: определитель не меняется, получаем $\begin{pmatrix}I_k&0\\0&D\end{pmatrix}$.` },
          { title: md`$F(I_k)=\det D$`, body: md`Раскладываем $\det\begin{pmatrix}I_k&0\\0&D\end{pmatrix}$ по первому столбцу $k$ раз: каждый раз остаётся одно слагаемое $1\cdot(+1)\cdot$ минор. Итог — $\det D$. (Или: как функция столбцов $D$ это определитель, линейный, кососимметричный и равный $1$ при $D=I_m$, — по единственности он равен $\det D$.)` },
          { title: md`Нижняя блочно-треугольная`, body: md`$\begin{pmatrix}A&0\\C&D\end{pmatrix}^{\mathsf T}=\begin{pmatrix}A^{\mathsf T}&C^{\mathsf T}\\0&D^{\mathsf T}\end{pmatrix}$, а транспонирование определитель не меняет.` },
        ],
      },
      lemmas: ['det-normalization'],
      uses: ['det-elementary', 'det-expansion', 'det-transpose'],
      notes: md`Частный случай: $\det\operatorname{diag}(A,D)=\det A\det D$, а при $1\times1$ блоках — формула для треугольной матрицы.

Для квадратных блоков одного размера в общем случае $\det\begin{pmatrix}A&B\\C&D\end{pmatrix}\ne\det(AD-BC)$.

**Пример.** $\det\begin{pmatrix}1&2&5&7\\3&4&6&8\\0&0&2&1\\0&0&1&1\end{pmatrix}=(-2)\cdot1=-2$.`,
      pitfalls: [
        'Нулевой блок должен стоять под диагональю (или над ней) целиком; блоки A и D — квадратные.',
        md`Для матрицы $\begin{pmatrix}0&B\\C&0\end{pmatrix}$ формула $\det B\det C$ неверна без знака: появляется $(-1)^{km}$.`,
      ],
    },
    {
      id: 'cramer',
      title: 'Формулы Крамера для системы',
      source: 'Неделя 11, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $A\in\operatorname{Mat}_n(\mathbb F)$, $\det A\ne0$, $\mathbf b\in\mathbb F^n$. Тогда система $A\mathbf x=\mathbf b$ имеет единственное решение, и
$$x_i=\frac{\det A_i}{\det A},\qquad i=1,\dots,n,$$
где $A_i$ — матрица $A$, в которой $i$-й столбец заменён на $\mathbf b$.`,
      },
      proof: {
        level: 'basic',
        idea: md`$\mathbf b$ — комбинация столбцов с коэффициентами $x_j$; подставляем её в $i$-й столбец и раскрываем определитель по линейности.`,
        steps: [
          { title: md`Решение есть и единственно`, body: md`$\det A\ne0$, поэтому $A$ обратима, и $\mathbf x=A^{-1}\mathbf b$ — единственное решение.` },
          { title: md`$\mathbf b$ через столбцы`, body: md`$A\mathbf x=\mathbf b$ значит $\mathbf b=x_1\mathbf a_1+\dots+x_n\mathbf a_n$, где $\mathbf a_j$ — столбцы $A$.` },
          { title: md`Раскрываем $\det A_i$`, body: md`По линейности по $i$-му столбцу $\det A_i=\sum_j x_j\det(\mathbf a_1,\dots,\underbrace{\mathbf a_j}_{i},\dots,\mathbf a_n)$.` },
          { title: md`Остаётся одно слагаемое`, body: md`При $j\ne i$ в матрице два равных столбца $\mathbf a_j$ — определитель $0$. Остаётся $\det A_i=x_i\det A$, откуда $x_i=\det A_i/\det A$.` },
        ],
      },
      uses: ['det-invertible'],
      notes: md`**Пример.** $\begin{cases}2x+y=5\\x+3y=5\end{cases}$: $\det A=5$, $\det A_1=\det\begin{pmatrix}5&1\\5&3\end{pmatrix}=10$, $\det A_2=\det\begin{pmatrix}2&5\\1&5\end{pmatrix}=5$, так что $x=2$, $y=1$.

Формулы Крамера — то же, что $\mathbf x=\frac1{\det A}\operatorname{adj}A\,\mathbf b$. Для счёта при больших $n$ метод Гаусса быстрее; формулы полезны в теории (например, решение непрерывно зависит от коэффициентов).`,
      pitfalls: [
        md`При $\det A=0$ формулы неприменимы: система может быть несовместна или иметь бесконечно много решений.`,
        md`$\mathbf b$ ставится на место $i$-го **столбца**, а не строки.`,
      ],
    },
    {
      id: 'vandermonde',
      title: 'Определитель Вандермонда',
      source: 'Неделя 11, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Для $x_1,\dots,x_n\in\mathbb F$
$$V(x_1,\dots,x_n)=\det\begin{pmatrix}1&x_1&x_1^2&\dots&x_1^{n-1}\\1&x_2&x_2^2&\dots&x_2^{n-1}\\\vdots&&&&\vdots\\1&x_n&x_n^2&\dots&x_n^{n-1}\end{pmatrix}=\prod_{1\le i<j\le n}(x_j-x_i).$$
В частности, $V\ne0$ тогда и только тогда, когда все $x_i$ попарно различны.`,
      },
      proof: {
        level: 'basic',
        idea: md`Вычитаем из каждого столбца предыдущий, умноженный на $x_1$: первая строка становится $(1,0,\dots,0)$, из остальных строк выносится $x_i-x_1$, и остаётся Вандермонд меньшего размера.`,
        steps: [
          { title: md`Индукция`, body: md`При $n=1$ определитель $1$ — пустое произведение. Пусть формула верна для $n-1$ чисел.` },
          { title: md`Столбцовые преобразования`, body: md`Для $k=n,n-1,\dots,2$ (именно в таком порядке) сделаем $C_k\mapsto C_k-x_1C_{k-1}$. Определитель не меняется. В строке $i$ теперь стоит $(1,\ x_i-x_1,\ x_i(x_i-x_1),\ \dots,\ x_i^{n-2}(x_i-x_1))$; первая строка — $(1,0,\dots,0)$.` },
          { title: md`Раскладываем по первой строке`, body: md`Остаётся определитель $(n-1)\times(n-1)$ со строками $(x_i-x_1)\,(1,x_i,\dots,x_i^{n-2})$, $i=2,\dots,n$.` },
          { title: md`Выносим множители`, body: md`Из строки $i$ выносим $x_i-x_1$: $V(x_1,\dots,x_n)=\prod_{i=2}^n(x_i-x_1)\cdot V(x_2,\dots,x_n)$.` },
          { title: md`Предположение индукции`, body: md`$V(x_2,\dots,x_n)=\prod_{2\le i<j\le n}(x_j-x_i)$; вместе с множителями $x_j-x_1$ получаем произведение по всем парам $i<j$.` },
        ],
      },
      uses: ['det-elementary', 'det-expansion'],
      notes: md`**Размер 3.** $\det\begin{pmatrix}1&a&a^2\\1&b&b^2\\1&c&c^2\end{pmatrix}=(b-a)(c-a)(c-b)$. Например, при $a,b,c=1,2,3$ получаем $1\cdot2\cdot1=2$.

**Зачем.** Через многочлен интерполяции: многочлен степени $<n$ по значениям в $n$ различных точках находится однозначно — система на коэффициенты имеет матрицу Вандермонда, а её определитель не ноль.

Если какие-то $x_i=x_j$, две строки совпадают — определитель $0$, что видно и по формуле.`,
      pitfalls: [
        md`Порядок множителей: $x_j-x_i$ при $i<j$ («больший номер минус меньший»), иначе может поменяться знак.`,
        md`Преобразования $C_k-x_1C_{k-1}$ делай справа налево — иначе вычитаешь уже изменённый столбец.`,
      ],
    },

    // ---------- Содержательные вопросы ----------
    {
      id: 'det-existence',
      title: 'Существование и единственность определителя — разбор для 3×3',
      source: 'Лекция 11, утверждения 61 и 62, §55.3',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Существует ровно одна функция $D:\operatorname{Mat}_3(\mathbb F)\to\mathbb F$, которая линейна по каждому столбцу, равна нулю при двух равных столбцах и равна $1$ на $I_3$. Она задаётся формулой
$$D(A)=a_{11}a_{22}a_{33}+a_{12}a_{23}a_{31}+a_{13}a_{21}a_{32}-a_{13}a_{22}a_{31}-a_{12}a_{21}a_{33}-a_{11}a_{23}a_{32}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Единственность: раскладываем столбцы по $\mathbf e_1,\mathbf e_2,\mathbf e_3$ — правила не оставляют выбора. Существование: проверяем три правила для полученной формулы.`,
        steps: [
          { title: md`Обмен столбцов меняет знак`, body: md`$0=D(\dots,\mathbf u+\mathbf v,\dots,\mathbf u+\mathbf v,\dots)=D(\dots,\mathbf u,\dots,\mathbf v,\dots)+D(\dots,\mathbf v,\dots,\mathbf u,\dots)$ — слагаемые с повторами равны нулю.` },
          { title: md`Раскрываем столбцы`, body: md`$\mathbf c_k=a_{1k}\mathbf e_1+a_{2k}\mathbf e_2+a_{3k}\mathbf e_3$. По линейности $D(A)=\sum_{i,j,l}a_{i1}a_{j2}a_{l3}\,D(\mathbf e_i,\mathbf e_j,\mathbf e_l)$ — $27$ слагаемых.` },
          { title: md`Значения на стандартных столбцах`, body: md`Если среди $i,j,l$ есть повтор, $D=0$. Остаются $6$ перестановок; каждая приводится к $(\mathbf e_1,\mathbf e_2,\mathbf e_3)$ обменами: $D(\mathbf e_1,\mathbf e_2,\mathbf e_3)=1$, $D(\mathbf e_2,\mathbf e_3,\mathbf e_1)=D(\mathbf e_3,\mathbf e_1,\mathbf e_2)=1$ (два обмена), а $D(\mathbf e_2,\mathbf e_1,\mathbf e_3)=D(\mathbf e_3,\mathbf e_2,\mathbf e_1)=D(\mathbf e_1,\mathbf e_3,\mathbf e_2)=-1$.` },
          { title: md`Единственность`, body: md`Значит, $D(A)$ обязано равняться выписанной сумме шести произведений — другой функции с этими правилами нет.` },
          { title: md`Существование: линейность`, body: md`Возьмём формулу за определение. В каждом слагаемом ровно один множитель из каждого столбца, поэтому каждое слагаемое, а значит и сумма, линейно по каждому столбцу.` },
          { title: md`Равные столбцы — ноль`, body: md`Пусть столбцы $i$ и $j$ равны. Слагаемые разбиваются на пары: перестановки $\sigma$ и $\sigma\circ(i\ j)$ (меняем выбранные строки в столбцах $i$ и $j$). Произведения в паре равны, так как столбцы совпадают, а знаки противоположны. Сумма — ноль.` },
          { title: md`Нормировка`, body: md`На $I_3$ ненулевое только $a_{11}a_{22}a_{33}=1$: $D(I_3)=1$.` },
        ],
      },
      notes: md`Для $n\times n$ всё так же: $\det A=\sum_{\sigma\in S_n}\operatorname{sgn}\sigma\prod_k a_{\sigma(k),k}$, $n!$ слагаемых.

Удобная запись для $3\times3$: разложение по первому столбцу $D(A)=a_{11}(a_{22}a_{33}-a_{23}a_{32})-a_{21}(a_{12}a_{33}-a_{13}a_{32})+a_{31}(a_{12}a_{23}-a_{13}a_{22})$ — получается, если сначала раскрыть только первый столбец.

Эта формула совпадает со смешанным произведением столбцов из лекции 5.`,
      pitfalls: [
        'Единственность и существование — два разных утверждения: «правила дают формулу» — единственность; «формула удовлетворяет правилам» — существование.',
        'Проверка «равные столбцы → 0» не следует из линейности: её надо сделать, разбив слагаемые на пары.',
      ],
    },
    {
      id: 'det-product',
      title: 'Определитель произведения матриц',
      source: 'Лекция 11, утверждение 66',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для любых $A,B\in\operatorname{Mat}_n(\mathbb F)$: $\det(AB)=\det A\det B$.`,
      },
      proof: {
        level: 'basic',
        idea: md`При фиксированной $A$ функция $F(B)=\det(AB)$ линейна по столбцам $B$ и обнуляется на равных столбцах — значит, $F(B)=F(I_n)\det B=\det A\det B$.`,
        steps: [
          { title: md`Столбцы $AB$`, body: md`$j$-й столбец $AB$ — это $A\mathbf b_j$, где $\mathbf b_j$ — $j$-й столбец $B$.` },
          { title: md`$F$ линейна по столбцам $B$`, body: md`$F(B)=\det(A\mathbf b_1,\dots,A\mathbf b_n)$. Замена $\mathbf b_j$ на $\lambda\mathbf u+\mu\mathbf v$ даёт столбец $\lambda A\mathbf u+\mu A\mathbf v$, и по линейности $\det$ по $j$-му столбцу $F$ раскладывается так же.` },
          { title: md`Равные столбцы — ноль`, body: md`Если $\mathbf b_i=\mathbf b_j$, то $A\mathbf b_i=A\mathbf b_j$, и $F(B)=0$.` },
          { title: md`Применяем лемму`, body: md`$F(B)=F(I_n)\det B$, а $F(I_n)=\det(AI_n)=\det A$. Итог: $\det(AB)=\det A\det B$.` },
        ],
      },
      lemmas: ['det-normalization'],
      notes: md`**Следствия.** $\det A^k=(\det A)^k$; $\det A^{-1}=1/\det A$; $\det(C^{-1}AC)=\det A$ — у подобных матриц определители равны, поэтому определитель оператора не зависит от базиса. Также $\det(AB)=\det(BA)$, хотя $AB\ne BA$.

**Через элементарные матрицы.** Если $A$ необратима, то и $AB$ необратима, обе части нули. Иначе $A=E_1\cdots E_k$, и $\det(EM)=\det E\det M$ для элементарной $E$ — это правила изменения определителя при преобразованиях строк.`,
      pitfalls: [
        md`Для суммы аналога нет: $\det(A+B)\ne\det A+\det B$ в общем случае.`,
        'Формула только для квадратных матриц одного размера.',
      ],
    },
    {
      id: 'det-transpose',
      title: 'Равенство det Aᵀ = det A',
      source: 'Лекция 11, утверждение 67',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для любой $A\in\operatorname{Mat}_n(\mathbb F)$: $\det A^{\mathsf T}=\det A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Необратимые — обе нули; обратимая — произведение элементарных, а у элементарной матрицы определитель при транспонировании не меняется.`,
        steps: [
          { title: md`Обратимы одновременно`, body: md`Если $A^{-1}$ существует, то $(A^{-1})^{\mathsf T}$ обратна к $A^{\mathsf T}$: $A^{\mathsf T}(A^{-1})^{\mathsf T}=(A^{-1}A)^{\mathsf T}=I_n$. И наоборот, так как $(A^{\mathsf T})^{\mathsf T}=A$.` },
          { title: md`Необратимая`, body: md`Если $A$ необратима, то и $A^{\mathsf T}$; по критерию $\det A=\det A^{\mathsf T}=0$.` },
          { title: md`Обратимая — произведение элементарных`, body: md`Метод Гаусса даёт $A=E_1E_2\cdots E_k$ с элементарными $E_i$.` },
          { title: md`Элементарные матрицы`, body: md`Перестановка строк и умножение строки на $\lambda$ при транспонировании не меняются (матрица симметрична). Матрица «прибавить к $i$-й строке $\lambda\cdot j$-ю» переходит в «прибавить к $j$-й строке $\lambda\cdot i$-ю»; у обеих определитель $1$: каждая получается из $I_n$ прибавлением столбца. Итак, $\det E^{\mathsf T}=\det E$.` },
          { title: md`Собираем`, body: md`$\det A^{\mathsf T}=\det(E_k^{\mathsf T}\cdots E_1^{\mathsf T})=\det E_k^{\mathsf T}\cdots\det E_1^{\mathsf T}=\det E_k\cdots\det E_1=\det A$.` },
        ],
      },
      uses: ['det-invertible', 'det-product', 'elementary-matrices', 'det-elementary'],
      notes: md`**Через формулу.** $\det A^{\mathsf T}=\sum_\sigma\operatorname{sgn}\sigma\prod_k a_{k,\sigma(k)}$; переупорядочив множители, получаем $\prod_k a_{\sigma^{-1}(k),k}$, а $\operatorname{sgn}\sigma^{-1}=\operatorname{sgn}\sigma$, и сумма по $\sigma$ — это сумма по $\sigma^{-1}$.

**Следствие.** Всё, что верно для столбцов, верно и для строк: линейность по строке, обмен строк меняет знак, разложение по столбцу.`,
      pitfalls: [
        'Здесь не стоит ссылаться на правила для строк: они как раз выводятся из det Aᵀ = det A — получится круг.',
        md`Транспонирование меняет порядок множителей: $(E_1\cdots E_k)^{\mathsf T}=E_k^{\mathsf T}\cdots E_1^{\mathsf T}$.`,
      ],
    },
    {
      id: 'det-expansion',
      title: 'Разложение определителя по строке и столбцу',
      source: 'Лекция 11, утверждение 68',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для $A\in\operatorname{Mat}_n(\mathbb F)$ и любых $i,j$:
$$\det A=a_{i1}C_{i1}+a_{i2}C_{i2}+\dots+a_{in}C_{in}\quad\text{(по $i$-й строке)},$$
$$\det A=a_{1j}C_{1j}+a_{2j}C_{2j}+\dots+a_{nj}C_{nj}\quad\text{(по $j$-му столбцу)},$$
где $C_{ij}=(-1)^{i+j}\det A^{(i\mid j)}$ — алгебраические дополнения.`,
      },
      proof: {
        level: 'basic',
        idea: md`Раскладываем $i$-ю строку по стандартным строкам; каждое слагаемое перестановками соседних строк и столбцов сводится к матрице $\begin{pmatrix}1&0\\0&A^{(i\mid j)}\end{pmatrix}$, знак $(-1)^{i+j}$.`,
        steps: [
          { title: md`Линейность по строке`, body: md`$\mathbf r_i=a_{i1}\mathbf e_1^{\mathsf T}+\dots+a_{in}\mathbf e_n^{\mathsf T}$. Определитель линеен по строке (так как $\det A^{\mathsf T}=\det A$), поэтому $\det A=\sum_j a_{ij}\det A_j$, где в $A_j$ на месте $i$-й строки стоит $\mathbf e_j^{\mathsf T}$.` },
          { title: md`Переносим строку и столбец`, body: md`В $A_j$ поднимем $i$-ю строку на первое место $i-1$ обменами соседних строк, а $j$-й столбец переставим на первое место $j-1$ обменами соседних столбцов. Порядок остальных строк и столбцов сохранится. Знак: $(-1)^{(i-1)+(j-1)}=(-1)^{i+j}$.` },
          { title: md`Обнуляем первый столбец`, body: md`Первая строка теперь $(1,0,\dots,0)$. Вычитая её кратные из остальных строк, обнуляем первый столбец под единицей — определитель не меняется. Справа внизу стоит $A^{(i\mid j)}$.` },
          { title: md`$\det\begin{pmatrix}1&0\\0&M\end{pmatrix}=\det M$`, body: md`Как функция столбцов $M$ этот определитель линеен, равен $0$ при равных столбцах и равен $1$ при $M=I_{n-1}$; по единственности это $\det M$.` },
          { title: md`Итог по строке`, body: md`$\det A_j=(-1)^{i+j}\det A^{(i\mid j)}=C_{ij}$, и $\det A=\sum_j a_{ij}C_{ij}$.` },
          { title: md`По столбцу`, body: md`Применим разложение по $j$-й строке к $A^{\mathsf T}$: её миноры — транспонированные миноры $A$, и $\det A^{\mathsf T}=\det A$.` },
        ],
      },
      uses: ['det-transpose', 'det-elementary', 'det-existence'],
      notes: md`**Пример.** По первой строке: $\det\begin{pmatrix}2&0&1\\1&3&0\\0&1&4\end{pmatrix}=2\cdot\det\begin{pmatrix}3&0\\1&4\end{pmatrix}-0+1\cdot\det\begin{pmatrix}1&3\\0&1\end{pmatrix}=24+1=25$.

Перед разложением выгодно получить нули в строке прибавлением кратных других строк или столбцов.

**«Фальшивое» разложение.** $\sum_j a_{kj}C_{ij}=0$ при $k\ne i$: это разложение по $i$-й строке матрицы, у которой $i$-я строка заменена на $k$-ю, — две равные строки. Отсюда $A\operatorname{adj}A=(\det A)I_n$.`,
      pitfalls: [
        md`Знак $(-1)^{i+j}$ — шахматная доска; по второй строке знаки начинаются с «$-$».`,
        'Обмены нужны именно соседние, чтобы порядок остальных строк и столбцов в миноре сохранился; один обмен строк i и 1 перемешал бы минор.',
      ],
    },
    {
      id: 'adjugate',
      title: 'Присоединённая матрица: A·adj A = adj A·A = (det A)I₃ и формула обратной для 3×3',
      source: 'Неделя 11, семинар',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для $A\in\operatorname{Mat}_3(\mathbb F)$ (и вообще для $\operatorname{Mat}_n$)
$$A\operatorname{adj}A=\operatorname{adj}A\,A=(\det A)I_3,$$
где $(\operatorname{adj}A)_{ij}=C_{ji}$. Если $\det A\ne0$, то $A^{-1}=\dfrac1{\det A}\operatorname{adj}A$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Элемент $(i,k)$ произведения $A\operatorname{adj}A$ — разложение по $k$-й строке матрицы, где $k$-я строка заменена на $i$-ю: это $\det A$ при $i=k$ и $0$ при $i\ne k$.`,
        steps: [
          { title: md`Элемент произведения`, body: md`$(A\operatorname{adj}A)_{ik}=\sum_j a_{ij}(\operatorname{adj}A)_{jk}=\sum_j a_{ij}C_{kj}$.` },
          { title: md`Диагональ: $i=k$`, body: md`$\sum_j a_{kj}C_{kj}$ — разложение $\det A$ по $k$-й строке. Получаем $\det A$.` },
          { title: md`Вне диагонали: $i\ne k$`, body: md`Заменим в $A$ $k$-ю строку на $i$-ю, получим $A'$. Дополнения $C_{kj}$ у $A'$ и $A$ одинаковы — $k$-я строка при их подсчёте вычёркивается. Значит, $\sum_j a_{ij}C_{kj}$ — разложение $\det A'$ по $k$-й строке. А в $A'$ две равные строки, $\det A'=0$.` },
          { title: md`Вторая сторона`, body: md`$(\operatorname{adj}A\,A)_{ik}=\sum_j C_{ji}a_{jk}$ — так же через разложение по $i$-му столбцу матрицы, у которой $i$-й столбец заменён на $k$-й: $\det A$ при $i=k$ и $0$ иначе.` },
          { title: md`Обратная`, body: md`При $\det A\ne0$ делим равенства на $\det A$: $A\cdot\frac{\operatorname{adj}A}{\det A}=\frac{\operatorname{adj}A}{\det A}\cdot A=I_3$.` },
        ],
      },
      uses: ['det-expansion', 'det-elementary'],
      notes: md`**Для $3\times3$ явно.** $\operatorname{adj}A=\begin{pmatrix}C_{11}&C_{21}&C_{31}\\C_{12}&C_{22}&C_{32}\\C_{13}&C_{23}&C_{33}\end{pmatrix}$.

**Пример.** $A=\begin{pmatrix}1&2&0\\0&1&3\\0&0&1\end{pmatrix}$, $\det A=1$: $\operatorname{adj}A=\begin{pmatrix}1&-2&6\\0&1&-3\\0&0&1\end{pmatrix}=A^{-1}$.

Отсюда же формулы Крамера: $\mathbf x=A^{-1}\mathbf b=\frac1{\det A}\operatorname{adj}A\,\mathbf b$, и $i$-я координата — разложение $\det A_i$ по $i$-му столбцу.`,
      pitfalls: [
        md`$(\operatorname{adj}A)_{ij}=C_{ji}$, а не $C_{ij}$: без транспонирования равенство не выполняется.`,
        md`Равенство $A\operatorname{adj}A=(\det A)I$ верно и при $\det A=0$ — тогда произведение нулевое.`,
      ],
    },
  ],
};
