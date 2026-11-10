import { md, type Topic } from '../../src/content/schema';

// Лекция 1. Матрицы

export const matrices: Topic = {
  id: 'matrices',
  title: 'Матрицы',
  longread: 1,
  units: [
    {
      id: 'matrix-product',
      title: 'Произведение матриц',
      source: 'Лекция 1, §2.2',
      definition: {
        level: 'basic',
        text: md`Для $A=[a_{ij}]\in\operatorname{Mat}_{m\times n}(\mathbb F)$ и $B=[b_{ij}]\in\operatorname{Mat}_{n\times k}(\mathbb F)$ **произведение** $AB=C=[c_{ij}]\in\operatorname{Mat}_{m\times k}(\mathbb F)$, где
$$c_{ij}=\sum_{\ell=1}^n a_{i\ell}b_{\ell j}=a_{i1}b_{1j}+\dots+a_{in}b_{nj}$$
— $i$-я строка $A$ «на» $j$-й столбец $B$. Произведение определено, только если число столбцов $A$ равно числу строк $B$.`,
      },
      notes: md`Свойства (утверждение 2): $A(B+C)=AB+AC$, $(A+B)C=AC+BC$, $(AB)C=A(BC)$, $(\lambda A)B=\lambda(AB)=A(\lambda B)$, $I_mA=A=AI_n$.

Коммутативности нет: $\begin{pmatrix}1&3\\0&2\end{pmatrix}\begin{pmatrix}0&1\\0&0\end{pmatrix}=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, а в обратном порядке $\begin{pmatrix}0&2\\0&0\end{pmatrix}$.

Система $A\mathbf x=\mathbf b$ — это матричная запись системы линейных уравнений.`,
      pitfalls: [
        'Порядок множителей менять нельзя: AB и BA могут быть разными, а одно из них может быть вообще не определено.',
        md`Размеры: $(m\times n)\cdot(n\times k)=m\times k$ — «внутренние» размеры совпадают и исчезают.`,
      ],
    },
    {
      id: 'transpose',
      title: 'Транспонированная матрица',
      source: 'Лекция 1, §3',
      definition: {
        level: 'basic',
        text: md`Для $A=[a_{ij}]\in\operatorname{Mat}_{m\times n}(\mathbb F)$ **транспонированная** $A^{\mathsf T}=[a_{ji}]\in\operatorname{Mat}_{n\times m}(\mathbb F)$: строки $A$ становятся столбцами.`,
      },
      notes: md`Свойства (утверждение 3): $(A^{\mathsf T})^{\mathsf T}=A$, $(\lambda A)^{\mathsf T}=\lambda A^{\mathsf T}$, $(A+B)^{\mathsf T}=A^{\mathsf T}+B^{\mathsf T}$, $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$.

Доказательство последнего: элемент $(i,j)$ слева равен $(AB)_{ji}=\sum_k a_{jk}b_{ki}=\sum_k b_{ki}a_{jk}$ — это элемент $(i,j)$ матрицы $B^{\mathsf T}A^{\mathsf T}$.`,
      pitfalls: [md`При транспонировании произведения порядок меняется: $(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$, а не $A^{\mathsf T}B^{\mathsf T}$ (у неё могут даже не совпасть размеры).`],
    },
    {
      id: 'inverse-matrix',
      title: 'Обратная матрица',
      source: 'Лекция 1, §4',
      definition: {
        level: 'basic',
        text: md`Пусть $A\in\operatorname{Mat}_n(\mathbb F)$. Матрица $B\in\operatorname{Mat}_n(\mathbb F)$ — **левая обратная** к $A$, если $BA=I_n$, и **правая обратная**, если $AB=I_n$.

$A$ **обратима**, если есть матрица, которая одновременно левая и правая обратная: $AB=BA=I_n$. Она единственна и обозначается $A^{-1}$.`,
      },
      notes: md`Пример: $\begin{pmatrix}1&2\\3&5\end{pmatrix}^{-1}=\begin{pmatrix}-5&2\\3&-1\end{pmatrix}$.

Не всякая ненулевая матрица обратима: если $A\mathbf v=\mathbf 0$ для ненулевого $\mathbf v$, то $\mathbf v=A^{-1}A\mathbf v=\mathbf 0$ — противоречие. Например, $\begin{pmatrix}1&0\\0&0\end{pmatrix}\mathbf e_2=\mathbf 0$.`,
      pitfalls: [
        'Обратная определена только для квадратных матриц.',
        md`Ненулевая матрица не обязана быть обратимой; простой формулы для $(A+B)^{-1}$ нет.`,
      ],
    },
    {
      id: 'trace',
      title: 'След матрицы',
      source: 'Неделя 1, семинар',
      definition: {
        level: 'basic',
        text: md`**След** квадратной матрицы $A=[a_{ij}]\in\operatorname{Mat}_n(\mathbb F)$ — сумма элементов главной диагонали: $\operatorname{tr}A=a_{11}+a_{22}+\dots+a_{nn}=\sum_{i=1}^n a_{ii}$.`,
      },
      notes: md`След линеен: $\operatorname{tr}(\lambda A+\mu B)=\lambda\operatorname{tr}A+\mu\operatorname{tr}B$, и $\operatorname{tr}A^{\mathsf T}=\operatorname{tr}A$.`,
      pitfalls: [md`След мультипликативным не бывает: $\operatorname{tr}(AB)\ne\operatorname{tr}A\cdot\operatorname{tr}B$ в общем случае (возьми $A=B=I_2$: $2\ne4$).`],
    },
    {
      id: 'nilpotent',
      title: 'Нильпотентная матрица',
      source: 'Неделя 1, семинар',
      definition: {
        level: 'basic',
        text: md`Квадратная матрица $N$ **нильпотентна**, если $N^k=0$ для некоторого натурального $k$.`,
      },
      notes: md`Пример: строго верхнетреугольная матрица (нули на диагонали и ниже) нильпотентна: $\begin{pmatrix}0&1\\0&0\end{pmatrix}^2=0$, у $n\times n$ строго верхнетреугольной $N^n=0$.`,
      pitfalls: ['Нильпотентная матрица не обязана быть нулевой, хотя её степень нулевая.', 'Нильпотентная матрица необратима: из N^k = 0 и обратимости N получилось бы I = 0.'],
    },
    {
      id: 'inverse-unique',
      title: 'Единственность обратной матрицы',
      source: 'Лекция 1, утверждение 4',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $A,B,C\in\operatorname{Mat}_n(\mathbb F)$, $AB=I_n$ и $CA=I_n$ (то есть $B$ — правая обратная, $C$ — левая). Тогда $B=C$. В частности, обратная к обратимой матрице единственна.`,
      },
      proof: {
        level: 'basic',
        idea: md`Вставляем $I_n$ с двух сторон и пользуемся ассоциативностью: $B=(CA)B=C(AB)=C$.`,
        steps: [
          { title: md`Левая равна правой`, body: md`$B=I_nB=(CA)B=C(AB)=CI_n=C$ — здесь работает ассоциативность умножения матриц.` },
          { title: md`Две обратные совпадают`, body: md`Если $B_1$ и $B_2$ обе обратные к $A$, то $AB_1=I_n$ ($B_1$ — правая обратная) и $B_2A=I_n$ ($B_2$ — левая). По первому шагу $B_1=B_2$.` },
        ],
      },
      notes: md`Позже (критерии обратимости) окажется, что у квадратной матрицы одна левая обратная уже гарантирует обратимость.`,
      pitfalls: ['Без ассоциативности доказательство не проходит — назови её явно.', 'Не путай: утверждение говорит, что левая и правая обратные совпадают, если обе существуют; их существование оно не доказывает.'],
    },
    {
      id: 'inverse-product',
      title: 'Обратная к произведению (AB)⁻¹',
      source: 'Лекция 1, утверждение 5',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $A,B\in\operatorname{Mat}_n(\mathbb F)$ обратимы, то $AB$ обратима и $(AB)^{-1}=B^{-1}A^{-1}$.

Также $(A^{-1})^{-1}=A$ и $(A^{\mathsf T})^{-1}=(A^{-1})^{\mathsf T}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Предъявляем кандидата $B^{-1}A^{-1}$ и проверяем, что он обратный с обеих сторон; дальше — единственность обратной.`,
        steps: [
          { title: md`Справа`, body: md`$(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=AI_nA^{-1}=AA^{-1}=I_n$.` },
          { title: md`Слева`, body: md`$(B^{-1}A^{-1})(AB)=B^{-1}(A^{-1}A)B=B^{-1}B=I_n$.` },
          { title: md`Вывод`, body: md`$B^{-1}A^{-1}$ — двусторонняя обратная к $AB$, значит, $AB$ обратима, а по единственности обратной $(AB)^{-1}=B^{-1}A^{-1}$.` },
          { title: md`Транспонированная`, body: md`Транспонируем $AA^{-1}=A^{-1}A=I_n$: $(A^{-1})^{\mathsf T}A^{\mathsf T}=A^{\mathsf T}(A^{-1})^{\mathsf T}=I_n$, так что $(A^{-1})^{\mathsf T}$ — обратная к $A^{\mathsf T}$.` },
        ],
      },
      uses: ['inverse-unique'],
      notes: md`По индукции $(A_1A_2\cdots A_k)^{-1}=A_k^{-1}\cdots A_2^{-1}A_1^{-1}$: порядок обращается, как при транспонировании. Наглядно: чтобы снять носки и ботинки, снимаешь сначала ботинки.`,
      pitfalls: [
        md`$(AB)^{-1}\ne A^{-1}B^{-1}$ в общем случае — порядок обязательно обращается.`,
        'Проверять нужно обе стороны (или сослаться на то, что для квадратных матриц достаточно одной — но это отдельная теорема).',
      ],
    },
    {
      id: 'nilpotent-inverse',
      title: 'Обратная к Iₙ − N для нильпотентной N',
      source: 'Неделя 1, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $N\in\operatorname{Mat}_n(\mathbb F)$ и $N^k=0$, то $I_n-N$ обратима и
$$(I_n-N)^{-1}=I_n+N+N^2+\dots+N^{k-1}.$$
Аналогично $(I_n+N)^{-1}=I_n-N+N^2-\dots+(-1)^{k-1}N^{k-1}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Это формула геометрической прогрессии $\frac1{1-x}=1+x+\dots$, которая для нильпотентной матрицы обрывается: сумма «телескопически» сокращается.`,
        steps: [
          { title: md`Обозначаем кандидата`, body: md`$S=I_n+N+\dots+N^{k-1}$. Матрицы $I_n$ и степени $N$ перестановочны между собой.` },
          { title: md`Умножаем справа`, body: md`$(I_n-N)S=(I_n+N+\dots+N^{k-1})-(N+N^2+\dots+N^k)=I_n-N^k=I_n$: все промежуточные степени сокращаются.` },
          { title: md`Умножаем слева`, body: md`$S(I_n-N)=I_n-N^k=I_n$ так же. Значит, $S$ — двусторонняя обратная.` },
          { title: md`Для $I_n+N$`, body: md`Матрица $-N$ тоже нильпотентна: $(-N)^k=(-1)^kN^k=0$. Подставляем $-N$ вместо $N$.` },
        ],
      },
      uses: ['inverse-unique'],
      notes: md`Пример: $N=\begin{pmatrix}0&1&2\\0&0&3\\0&0&0\end{pmatrix}$, $N^3=0$, $(I-N)^{-1}=I+N+N^2$, $N^2=\begin{pmatrix}0&0&3\\0&0&0\\0&0&0\end{pmatrix}$, так что $(I-N)^{-1}=\begin{pmatrix}1&1&5\\0&1&3\\0&0&1\end{pmatrix}$.`,
      pitfalls: [
        md`Последняя степень в сумме — $N^{k-1}$, а не $N^k$ (она и так нулевая).`,
        'Сокращение работает, потому что все слагаемые — степени одной матрицы; для двух разных матриц так раскрывать нельзя.',
      ],
    },
    {
      id: 'trace-ab',
      title: 'Равенство tr(AB) = tr(BA)',
      source: 'Неделя 1, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Для $A\in\operatorname{Mat}_{m\times n}(\mathbb F)$ и $B\in\operatorname{Mat}_{n\times m}(\mathbb F)$ выполнено $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ (матрицы $AB$ и $BA$ квадратные, хотя и разных размеров).`,
      },
      proof: {
        level: 'basic',
        idea: md`Обе стороны — одна и та же двойная сумма $\sum_{i,j}a_{ij}b_{ji}$, просто просуммированная в другом порядке.`,
        steps: [
          { title: md`След $AB$`, body: md`$(AB)_{ii}=\sum_{j=1}^n a_{ij}b_{ji}$, поэтому $\operatorname{tr}(AB)=\sum_{i=1}^m\sum_{j=1}^n a_{ij}b_{ji}$.` },
          { title: md`След $BA$`, body: md`$(BA)_{jj}=\sum_{i=1}^m b_{ji}a_{ij}$, поэтому $\operatorname{tr}(BA)=\sum_{j=1}^n\sum_{i=1}^m b_{ji}a_{ij}$.` },
          { title: md`Меняем порядок суммирования`, body: md`Конечные суммы можно переставлять, а $b_{ji}a_{ij}=a_{ij}b_{ji}$. Суммы совпадают.` },
        ],
      },
      notes: md`Следствие: $\operatorname{tr}(C^{-1}AC)=\operatorname{tr}(ACC^{-1})=\operatorname{tr}A$ — у подобных матриц одинаковый след. И $AB-BA=I_n$ невозможно: след слева $0$, справа $n$.`,
      pitfalls: [
        md`Для трёх множителей можно только циклически: $\operatorname{tr}(ABC)=\operatorname{tr}(BCA)$, но $\operatorname{tr}(ABC)\ne\operatorname{tr}(BAC)$ в общем случае.`,
        md`Само $AB$ не равно $BA$ — равны только их следы.`,
      ],
    },
  ],
};
