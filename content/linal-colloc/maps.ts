import { md, type Topic } from '../../src/content/schema';

// Лекция 7. Линейные отображения и их матрицы

export const maps: Topic = {
  id: 'maps',
  title: 'Линейные отображения и их матрицы',
  longread: 7,
  units: [
    {
      id: 'linear-map',
      title: 'Линейное отображение',
      source: 'Лекция 7, §32',
      definition: {
        level: 'basic',
        text: md`Отображение $\varphi:\mathbb V\to\mathbb W$ между пространствами над одним полем $\mathbb F$ **линейно**, если $\varphi(\lambda\mathbf x+\mu\mathbf y)=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)$ для всех $\mathbf x,\mathbf y\in\mathbb V$, $\lambda,\mu\in\mathbb F$.

$\operatorname{Hom}(\mathbb V,\mathbb W)$ — все линейные отображения $\mathbb V\to\mathbb W$; **линейный оператор** — отображение $\mathbb V\to\mathbb V$, $\operatorname{End}(\mathbb V)=\operatorname{Hom}(\mathbb V,\mathbb V)$.`,
      },
      notes: md`Примеры: умножение на матрицу $\varphi_M(\mathbf z)=M\mathbf z$; дифференцирование $\mathbb F[t]_{\le d}\to\mathbb F[t]_{\le d-1}$; координатная функция; нулевое и тождественное отображения.

Свойства (утверждение 39): $\varphi(\mathbf 0)=\mathbf 0$, $\varphi(-\mathbf x)=-\varphi(\mathbf x)$, $\varphi$ сохраняет любые конечные линейные комбинации. $\operatorname{Hom}(\mathbb V,\mathbb W)$ — векторное пространство с поточечными операциями.`,
      pitfalls: [md`Сдвиг $\mathbf x\mapsto\mathbf x+\mathbf b$ при $\mathbf b\ne\mathbf 0$ не линеен: $\varphi(\mathbf 0)\ne\mathbf 0$.`],
    },
    {
      id: 'isomorphism',
      title: 'Изоморфизм',
      source: 'Лекция 7, §32',
      definition: {
        level: 'basic',
        text: md`Линейное отображение $\varphi:\mathbb V\to\mathbb W$ — **изоморфизм**, если оно биективно. Если изоморфизм существует, пишут $\mathbb V\simeq\mathbb W$.`,
      },
      pitfalls: ['Изоморфизм обязан быть линейным: произвольная биекция изоморфизмом не является.'],
    },
    {
      id: 'map-matrix-def',
      title: 'Матрица линейного отображения',
      source: 'Лекция 7, §34',
      definition: {
        level: 'basic',
        text: md`Пусть $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ — базис $\mathbb V$, $\mathcal B=(\mathbf b_1,\dots,\mathbf b_m)$ — базис $\mathbb W$. **Матрица** $\varphi:\mathbb V\to\mathbb W$ в базисах $\mathcal A,\mathcal B$:
$$T(\varphi,\mathcal A,\mathcal B)=\big[\,[\varphi(\mathbf a_1)]_{\mathcal B}\ \dots\ [\varphi(\mathbf a_n)]_{\mathcal B}\,\big]\in\operatorname{Mat}_{m\times n}(\mathbb F):$$
в $j$-м столбце — координаты $\varphi(\mathbf a_j)$ в базисе $\mathcal B$.`,
      },
      notes: md`Пример: $D:\mathbb R[t]_{\le2}\to\mathbb R[t]_{\le1}$, $p\mapsto p'$, базисы $(1,t,t^2)$ и $(1,t)$: $T=\begin{pmatrix}0&1&0\\0&0&2\end{pmatrix}$.`,
      pitfalls: ['Координаты образов пишутся СТОЛБЦАМИ; размер матрицы — dim 𝕎 × dim 𝕍.'],
    },
    {
      id: 'change-matrix-def',
      title: 'Матрица замены базиса',
      source: 'Лекция 7, §35',
      definition: {
        level: 'basic',
        text: md`Для двух базисов $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ и $\mathcal B$ пространства $\mathbb V$ **матрица замены базиса** от $\mathcal A$ к $\mathcal B$:
$$C_{\mathcal B\leftarrow\mathcal A}=T(\operatorname{Id}_{\mathbb V},\mathcal A,\mathcal B)=\big[\,[\mathbf a_1]_{\mathcal B}\ \dots\ [\mathbf a_n]_{\mathcal B}\,\big],$$
так что $[\mathbf x]_{\mathcal B}=C_{\mathcal B\leftarrow\mathcal A}[\mathbf x]_{\mathcal A}$. В столбцах — векторы исходного базиса $\mathcal A$ в координатах нового базиса $\mathcal B$.`,
      },
      pitfalls: [md`Стрелка показывает направление пересчёта координат: $C_{\mathcal B\leftarrow\mathcal A}$ принимает координаты в $\mathcal A$, выдаёт в $\mathcal B$.`],
    },
    {
      id: 'similar',
      title: 'Подобные матрицы',
      source: 'Лекция 7, §37',
      definition: {
        level: 'basic',
        text: md`Квадратные матрицы $M$ и $M'$ **подобны**, если существует обратимая матрица $C$ с $M'=C^{-1}MC$.`,
      },
      notes: md`Матрицы одного оператора в разных базисах подобны. У подобных матриц одинаковые след и ранг.`,
      pitfalls: [md`Подобие — не равенство $C^{-1}MC=M$ (это условие перестановочности $C$ и $M$).`],
    },
    {
      id: 'inverse-linear',
      title: 'Линейность обратного к линейной биекции',
      source: 'Лекция 7, §32',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $\varphi:\mathbb V\to\mathbb W$ — линейная биекция (изоморфизм), то обратное отображение $\varphi^{-1}:\mathbb W\to\mathbb V$ тоже линейно.`,
      },
      proof: {
        level: 'basic',
        idea: md`Записываем векторы $\mathbb W$ как образы и применяем $\varphi^{-1}$ к равенству из линейности $\varphi$.`,
        steps: [
          { title: md`Обозначения`, body: md`Пусть $\mathbf u,\mathbf v\in\mathbb W$, $\lambda,\mu\in\mathbb F$. Так как $\varphi$ биективно, $\mathbf u=\varphi(\mathbf x)$ и $\mathbf v=\varphi(\mathbf y)$ для $\mathbf x=\varphi^{-1}(\mathbf u)$, $\mathbf y=\varphi^{-1}(\mathbf v)$.` },
          { title: md`Линейность $\varphi$`, body: md`$\varphi(\lambda\mathbf x+\mu\mathbf y)=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)=\lambda\mathbf u+\mu\mathbf v$.` },
          { title: md`Применяем $\varphi^{-1}$`, body: md`$\varphi^{-1}(\lambda\mathbf u+\mu\mathbf v)=\varphi^{-1}\big(\varphi(\lambda\mathbf x+\mu\mathbf y)\big)=\lambda\mathbf x+\mu\mathbf y=\lambda\varphi^{-1}(\mathbf u)+\mu\varphi^{-1}(\mathbf v)$.` },
        ],
      },
      notes: md`Следствие: «быть изоморфными» — отношение эквивалентности ($\varphi^{-1}$ — изоморфизм в обратную сторону, композиция изоморфизмов — изоморфизм).`,
      pitfalls: [
        'Биективность нужна, чтобы каждый вектор 𝕎 был образом (сюръективность) и φ⁻¹ было определено однозначно (инъективность).',
        md`Нужно доказать линейность именно $\varphi^{-1}$, а не повторить линейность $\varphi$.`,
      ],
    },
    {
      id: 'iso-fn',
      title: 'Любое n-мерное пространство над 𝔽 изоморфно 𝔽ⁿ',
      source: 'Лекция 6, утверждение 38; лекция 7, §32',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $\dim\mathbb V=n$ и $\mathcal B=(\mathbf b_1,\dots,\mathbf b_n)$ — базис $\mathbb V$, то координатная функция $\kappa_{\mathcal B}:\mathbb V\to\mathbb F^n$, $\mathbf x\mapsto[\mathbf x]_{\mathcal B}$, — изоморфизм. В частности, $\mathbb V\simeq\mathbb F^n$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Координаты корректно определены, линейны, и по любому столбцу однозначно собирается вектор — обратное отображение.`,
        steps: [
          { title: md`Корректность`, body: md`Каждый $\mathbf x$ единственным образом раскладывается по базису: $\mathbf x=x_1\mathbf b_1+\dots+x_n\mathbf b_n$. Значит, $[\mathbf x]_{\mathcal B}=(x_1,\dots,x_n)^{\mathsf T}$ определён однозначно.` },
          { title: md`Линейность`, body: md`Если $\mathbf x=\sum x_i\mathbf b_i$, $\mathbf y=\sum y_i\mathbf b_i$, то $\lambda\mathbf x+\mu\mathbf y=\sum(\lambda x_i+\mu y_i)\mathbf b_i$ — это и есть разложение, поэтому $[\lambda\mathbf x+\mu\mathbf y]_{\mathcal B}=\lambda[\mathbf x]_{\mathcal B}+\mu[\mathbf y]_{\mathcal B}$.` },
          { title: md`Сюръективность`, body: md`Для столбца $\mathbf a=(a_1,\dots,a_n)^{\mathsf T}$ вектор $\mathbf x=a_1\mathbf b_1+\dots+a_n\mathbf b_n$ имеет координаты $\mathbf a$ (по единственности разложения).` },
          { title: md`Инъективность`, body: md`Если $[\mathbf x]_{\mathcal B}=[\mathbf y]_{\mathcal B}=\mathbf a$, то $\mathbf x=\sum a_i\mathbf b_i=\mathbf y$. Линейная биекция — изоморфизм.` },
        ],
      },
      uses: ['basis-unique'],
      notes: md`Смысл: после выбора базиса с абстрактными векторами (многочленами, матрицами) можно работать как со столбцами. Изоморфизм сохраняет независимость, порождение и базисы.

Следствие: конечномерные пространства изоморфны $\iff$ у них одна размерность.`,
      pitfalls: ['Изоморфизм зависит от выбора базиса: другой базис — другая координатная функция.'],
    },
    {
      id: 'map-matrix',
      title: 'Матрица линейного отображения: построение и формула действия на координаты',
      source: 'Лекция 7, §34, утверждение 41',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $\varphi:\mathbb V\to\mathbb W$, $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ — базис $\mathbb V$, $\mathcal B$ — базис $\mathbb W$, и $T(\varphi,\mathcal A,\mathcal B)$ — матрица, в $j$-м столбце которой стоит $[\varphi(\mathbf a_j)]_{\mathcal B}$. Тогда для любого $\mathbf x\in\mathbb V$
$$[\varphi(\mathbf x)]_{\mathcal B}=T(\varphi,\mathcal A,\mathcal B)\,[\mathbf x]_{\mathcal A}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Образ вектора — та же комбинация образов базисных векторов; в координатах это комбинация столбцов матрицы, то есть произведение.`,
        steps: [
          { title: md`Раскладываем`, body: md`$\mathbf x=x_1\mathbf a_1+\dots+x_n\mathbf a_n$, $[\mathbf x]_{\mathcal A}=(x_1,\dots,x_n)^{\mathsf T}$. По линейности $\varphi(\mathbf x)=x_1\varphi(\mathbf a_1)+\dots+x_n\varphi(\mathbf a_n)$.` },
          { title: md`Переходим к координатам`, body: md`Координатная функция $\kappa_{\mathcal B}$ линейна: $[\varphi(\mathbf x)]_{\mathcal B}=x_1[\varphi(\mathbf a_1)]_{\mathcal B}+\dots+x_n[\varphi(\mathbf a_n)]_{\mathcal B}$.` },
          { title: md`Это произведение`, body: md`Справа — комбинация столбцов $T(\varphi,\mathcal A,\mathcal B)$ с коэффициентами $x_1,\dots,x_n$, а это по правилу умножения матрицы на столбец и есть $T(\varphi,\mathcal A,\mathcal B)[\mathbf x]_{\mathcal A}$.` },
        ],
      },
      notes: md`На языке диаграмм: $\kappa_{\mathcal B}\circ\varphi=\varphi_T\circ\kappa_{\mathcal A}$ — оба пути $\mathbb V\to\mathbb F^m$ дают одно и то же.

Обратно, матрица с таким свойством единственна: подставив $\mathbf x=\mathbf a_j$ ($[\mathbf a_j]_{\mathcal A}=\mathbf e_j$), получаем, что её $j$-й столбец равен $[\varphi(\mathbf a_j)]_{\mathcal B}$.`,
      pitfalls: [
        md`Порядок аргументов: $T(\varphi,\mathcal A,\mathcal B)$ — сначала базис области определения, потом пространства значений.`,
        'Матрица зависит от базисов: одно отображение — много матриц.',
      ],
    },
    {
      id: 'change-matrix',
      title: 'Матрица перехода C(𝓑←𝒜) и её свойства',
      source: 'Лекция 7, §35, утверждение 42',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Для базисов $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$, $\mathcal B$, $\mathcal C$ пространства $\mathbb V$ матрица $C_{\mathcal B\leftarrow\mathcal A}=\big[[\mathbf a_1]_{\mathcal B}\ \dots\ [\mathbf a_n]_{\mathcal B}\big]$ обладает свойствами:
1. $[\mathbf x]_{\mathcal B}=C_{\mathcal B\leftarrow\mathcal A}[\mathbf x]_{\mathcal A}$ для всех $\mathbf x$;
2. $C_{\mathcal C\leftarrow\mathcal A}=C_{\mathcal C\leftarrow\mathcal B}\,C_{\mathcal B\leftarrow\mathcal A}$;
3. $C_{\mathcal A\leftarrow\mathcal A}=I_n$, $\ C_{\mathcal A\leftarrow\mathcal B}=C_{\mathcal B\leftarrow\mathcal A}^{-1}$ (в частности, матрица перехода обратима).`,
      },
      proof: {
        level: 'basic',
        idea: md`$C_{\mathcal B\leftarrow\mathcal A}$ — матрица тождественного отображения, поэтому всё следует из основной координатной формулы: два пересчёта координат подряд — один пересчёт.`,
        steps: [
          { title: md`П. 1`, body: md`$C_{\mathcal B\leftarrow\mathcal A}=T(\operatorname{Id},\mathcal A,\mathcal B)$, и по основной формуле $[\operatorname{Id}(\mathbf x)]_{\mathcal B}=T(\operatorname{Id},\mathcal A,\mathcal B)[\mathbf x]_{\mathcal A}$.` },
          { title: md`Матрица определяется действием`, body: md`Если $M[\mathbf x]_{\mathcal A}=N[\mathbf x]_{\mathcal A}$ для всех $\mathbf x$, то $M=N$: подставим $\mathbf x=\mathbf a_j$, тогда $[\mathbf a_j]_{\mathcal A}=\mathbf e_j$, и совпадают $j$-е столбцы.` },
          { title: md`П. 2`, body: md`$C_{\mathcal C\leftarrow\mathcal B}C_{\mathcal B\leftarrow\mathcal A}[\mathbf x]_{\mathcal A}=C_{\mathcal C\leftarrow\mathcal B}[\mathbf x]_{\mathcal B}=[\mathbf x]_{\mathcal C}=C_{\mathcal C\leftarrow\mathcal A}[\mathbf x]_{\mathcal A}$ для любого $\mathbf x$, значит, матрицы равны.` },
          { title: md`П. 3`, body: md`$[\mathbf a_j]_{\mathcal A}=\mathbf e_j$, поэтому $C_{\mathcal A\leftarrow\mathcal A}=I_n$. По п. 2 $C_{\mathcal A\leftarrow\mathcal B}C_{\mathcal B\leftarrow\mathcal A}=C_{\mathcal A\leftarrow\mathcal A}=I_n$ и $C_{\mathcal B\leftarrow\mathcal A}C_{\mathcal A\leftarrow\mathcal B}=I_n$ — двусторонняя обратная.` },
        ],
      },
      uses: ['map-matrix', 'inverse-unique'],
      notes: md`**Пример.** $\mathcal A=(1,t,t^2)$, $\mathcal B=(1,t-1,(t-1)^2)$: $t=1+(t-1)$, $t^2=1+2(t-1)+(t-1)^2$, поэтому $C_{\mathcal B\leftarrow\mathcal A}=\begin{pmatrix}1&1&1\\0&1&2\\0&0&1\end{pmatrix}$, и $[t^2+1]_{\mathcal B}=C_{\mathcal B\leftarrow\mathcal A}(1,0,1)^{\mathsf T}=(2,2,1)^{\mathsf T}$.

В $\mathbb F^n$ со стандартным базисом $\mathcal E$: $C_{\mathcal E\leftarrow\mathcal F}$ — векторы $\mathbf f_i$, записанные столбцами.`,
      pitfalls: [
        md`В столбцах $C_{\mathcal B\leftarrow\mathcal A}$ стоят векторы $\mathcal A$ в координатах $\mathcal B$, а не наоборот.`,
        md`В произведении $C_{\mathcal C\leftarrow\mathcal B}C_{\mathcal B\leftarrow\mathcal A}$ «соседние» индексы совпадают — так проверяется правильный порядок.`,
      ],
    },
    {
      id: 'composition-matrix',
      title: 'Матрица композиции',
      source: 'Лекция 7, утверждение 43',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $\varphi:\mathbb V\to\mathbb W$, $\psi:\mathbb W\to\mathbb U$, а $\mathcal A,\mathcal B,\mathcal C$ — базисы $\mathbb V,\mathbb W,\mathbb U$, то
$$T(\psi\circ\varphi,\mathcal A,\mathcal C)=T(\psi,\mathcal B,\mathcal C)\,T(\varphi,\mathcal A,\mathcal B).$$
Для изоморфизма $T(\varphi^{-1},\mathcal B,\mathcal A)=T(\varphi,\mathcal A,\mathcal B)^{-1}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Дважды применяем основную координатную формулу и сравниваем с формулой для композиции.`,
        steps: [
          { title: md`Две формулы подряд`, body: md`$[(\psi\circ\varphi)(\mathbf x)]_{\mathcal C}=[\psi(\varphi(\mathbf x))]_{\mathcal C}=T(\psi,\mathcal B,\mathcal C)[\varphi(\mathbf x)]_{\mathcal B}=T(\psi,\mathcal B,\mathcal C)T(\varphi,\mathcal A,\mathcal B)[\mathbf x]_{\mathcal A}$.` },
          { title: md`Сравниваем`, body: md`С другой стороны, это $T(\psi\circ\varphi,\mathcal A,\mathcal C)[\mathbf x]_{\mathcal A}$. Подставляя $\mathbf x=\mathbf a_j$ ($[\mathbf a_j]_{\mathcal A}=\mathbf e_j$), видим, что у матриц совпадают все столбцы.` },
          { title: md`Обратное`, body: md`$\varphi^{-1}\circ\varphi=\operatorname{Id}_{\mathbb V}$, $\varphi\circ\varphi^{-1}=\operatorname{Id}_{\mathbb W}$, а матрица тождественного отображения в одном базисе — $I$. По доказанному $T(\varphi^{-1},\mathcal B,\mathcal A)T(\varphi,\mathcal A,\mathcal B)=I$ и в другом порядке тоже.` },
        ],
      },
      uses: ['map-matrix'],
      notes: md`Именно поэтому умножение матриц определено «строка на столбец»: оно описывает последовательное применение отображений. Порядок читается справа налево: первое действие стоит справа.`,
      pitfalls: [
        'Базис в середине должен совпадать: выход φ и вход ψ записаны в одном базисе 𝓑.',
        md`Порядок: матрица $\psi$ слева, хотя $\psi$ применяется вторым.`,
      ],
    },
    {
      id: 'map-on-basis',
      title: 'Существование и единственность линейного отображения с заданными образами базисных векторов',
      source: 'Лекция 7, утверждение 40',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ — базис $\mathbb V$, а $\mathbf w_1,\dots,\mathbf w_n\in\mathbb W$ — **любые** векторы. Тогда существует **единственное** линейное отображение $\varphi:\mathbb V\to\mathbb W$ с $\varphi(\mathbf a_i)=\mathbf w_i$ для всех $i$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Определяем $\varphi$ через координаты; любое другое такое отображение обязано совпасть с ним по линейности.`,
        steps: [
          { title: md`Определение`, body: md`Для $\mathbf x=x_1\mathbf a_1+\dots+x_n\mathbf a_n$ положим $\varphi(\mathbf x)=x_1\mathbf w_1+\dots+x_n\mathbf w_n$. Определение корректно: разложение по базису единственно.` },
          { title: md`Линейность`, body: md`Если $\mathbf x=\sum x_i\mathbf a_i$, $\mathbf y=\sum y_i\mathbf a_i$, то $\lambda\mathbf x+\mu\mathbf y=\sum(\lambda x_i+\mu y_i)\mathbf a_i$, поэтому $\varphi(\lambda\mathbf x+\mu\mathbf y)=\sum(\lambda x_i+\mu y_i)\mathbf w_i=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)$.` },
          { title: md`Значения на базисе`, body: md`$\mathbf a_i=0\cdot\mathbf a_1+\dots+1\cdot\mathbf a_i+\dots+0\cdot\mathbf a_n$, поэтому $\varphi(\mathbf a_i)=\mathbf w_i$.` },
          { title: md`Единственность`, body: md`Если линейное $\psi$ тоже даёт $\psi(\mathbf a_i)=\mathbf w_i$, то для любого $\mathbf x$: $\psi(\mathbf x)=\psi\big(\sum x_i\mathbf a_i\big)=\sum x_i\psi(\mathbf a_i)=\sum x_i\mathbf w_i=\varphi(\mathbf x)$.` },
        ],
      },
      uses: ['basis-unique'],
      notes: md`Если значения назначены на систему, которая **не** базис, свободы меньше: линейное отображение обязано сохранять все линейные соотношения. Если $\mathbf v_3=2\mathbf v_1+3\mathbf v_2$, то обязательно $\varphi(\mathbf v_3)=2\varphi(\mathbf v_1)+3\varphi(\mathbf v_2)$, иначе такого отображения нет.`,
      pitfalls: [
        'Корректность определения φ опирается на единственность разложения по базису — её нужно назвать.',
        'Без независимости 𝒜 существования может не быть, без порождения — единственности.',
      ],
    },
    {
      id: 'hom-mat',
      title: 'Изоморфизм Hom(𝕍, 𝕎) ≃ Matₘₓₙ(𝔽) и размерность пространства линейных отображений',
      source: 'Лекция 7, §34',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\dim\mathbb V=n$, $\dim\mathbb W=m$, $\mathcal A$ и $\mathcal B$ — базисы $\mathbb V$ и $\mathbb W$. Отображение
$$\Phi:\operatorname{Hom}(\mathbb V,\mathbb W)\to\operatorname{Mat}_{m\times n}(\mathbb F),\quad\varphi\mapsto T(\varphi,\mathcal A,\mathcal B),$$
— линейный изоморфизм. В частности, $\dim\operatorname{Hom}(\mathbb V,\mathbb W)=mn$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Линейность видна по столбцам; инъективность — отображение задаётся значениями на базисе; сюръективность — по любой матрице строим отображение, назначив образы базисных векторов по её столбцам.`,
        steps: [
          { title: md`Линейность`, body: md`$j$-й столбец $T(\lambda\varphi+\mu\psi,\mathcal A,\mathcal B)$ — это $[\lambda\varphi(\mathbf a_j)+\mu\psi(\mathbf a_j)]_{\mathcal B}=\lambda[\varphi(\mathbf a_j)]_{\mathcal B}+\mu[\psi(\mathbf a_j)]_{\mathcal B}$ (координаты линейны). Значит, $\Phi(\lambda\varphi+\mu\psi)=\lambda\Phi(\varphi)+\mu\Phi(\psi)$.` },
          { title: md`Инъективность`, body: md`Если $T(\varphi,\mathcal A,\mathcal B)=T(\psi,\mathcal A,\mathcal B)$, то $[\varphi(\mathbf a_j)]_{\mathcal B}=[\psi(\mathbf a_j)]_{\mathcal B}$, а значит, $\varphi(\mathbf a_j)=\psi(\mathbf a_j)$ для всех $j$. Линейное отображение однозначно определяется значениями на базисе: $\varphi=\psi$.` },
          { title: md`Сюръективность`, body: md`Дана $M\in\operatorname{Mat}_{m\times n}$ со столбцами $\mathbf m_1,\dots,\mathbf m_n$. Пусть $\mathbf w_j\in\mathbb W$ — вектор с $[\mathbf w_j]_{\mathcal B}=\mathbf m_j$. Есть линейное $\varphi$ с $\varphi(\mathbf a_j)=\mathbf w_j$; его матрица — $M$.` },
          { title: md`Размерность`, body: md`Изоморфизм сохраняет размерность (переводит базис в базис), а $\dim\operatorname{Mat}_{m\times n}(\mathbb F)=mn$ — базис из матричных единиц $E_{ij}$.` },
        ],
      },
      uses: ['map-on-basis', 'map-matrix', 'inverse-linear'],
      notes: md`Базис $\operatorname{Hom}(\mathbb V,\mathbb W)$ — прообразы матричных единиц: отображения $\varepsilon_{ij}$, переводящие $\mathbf a_j$ в $\mathbf b_i$, а остальные базисные векторы — в $\mathbf 0$.

Пример: $\dim\operatorname{End}(\mathbb R[t]_{\le2})=9$, $\dim\operatorname{Hom}(\mathbb R^3,\mathbb R)=3$.`,
      pitfalls: [
        md`Размер матрицы $m\times n$, где $m=\dim\mathbb W$ (пространство значений) — строки, $n=\dim\mathbb V$ — столбцы.`,
        'Изоморфизм Φ зависит от выбора базисов 𝒜 и 𝓑.',
      ],
    },
    {
      id: 'change-basis-map',
      title: 'Изменение матрицы отображения при замене базисов',
      source: 'Лекция 7, §37',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathcal A,\mathcal A'$ — базисы $\mathbb V$, $\mathcal B,\mathcal B'$ — базисы $\mathbb W$, $M=T(\varphi,\mathcal A,\mathcal B)$, $M'=T(\varphi,\mathcal A',\mathcal B')$. Тогда
$$M'=C_{\mathcal B'\leftarrow\mathcal B}\,M\,C_{\mathcal A\leftarrow\mathcal A'}.$$
Обозначив $C=C_{\mathcal A\leftarrow\mathcal A'}$, $D=C_{\mathcal B\leftarrow\mathcal B'}$: $M'=D^{-1}MC$. Для оператора ($\mathcal B=\mathcal A$, $\mathcal B'=\mathcal A'$): $M'=C^{-1}MC$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Входной столбец переводим из нового базиса в старый, применяем $M$, выход переводим из старого базиса в новый.`,
        steps: [
          { title: md`Цепочка`, body: md`Для любого $\mathbf x$: $[\varphi(\mathbf x)]_{\mathcal B'}=C_{\mathcal B'\leftarrow\mathcal B}[\varphi(\mathbf x)]_{\mathcal B}=C_{\mathcal B'\leftarrow\mathcal B}M[\mathbf x]_{\mathcal A}=C_{\mathcal B'\leftarrow\mathcal B}MC_{\mathcal A\leftarrow\mathcal A'}[\mathbf x]_{\mathcal A'}$.` },
          { title: md`Сравниваем с $M'$`, body: md`С другой стороны, $[\varphi(\mathbf x)]_{\mathcal B'}=M'[\mathbf x]_{\mathcal A'}$. Столбец $[\mathbf x]_{\mathcal A'}$ может быть любым (подставь $\mathbf x=\mathbf a_j'$), поэтому матрицы равны.` },
          { title: md`Короткая запись`, body: md`$C_{\mathcal B'\leftarrow\mathcal B}=C_{\mathcal B\leftarrow\mathcal B'}^{-1}=D^{-1}$, отсюда $M'=D^{-1}MC$; для оператора $D=C$.` },
        ],
      },
      uses: ['map-matrix', 'change-matrix', 'composition-matrix'],
      notes: md`Другой взгляд: $\varphi=\operatorname{Id}_{\mathbb W}\circ\varphi\circ\operatorname{Id}_{\mathbb V}$, и по формуле матрицы композиции $T(\varphi,\mathcal A',\mathcal B')=T(\operatorname{Id},\mathcal B,\mathcal B')\,T(\varphi,\mathcal A,\mathcal B)\,T(\operatorname{Id},\mathcal A',\mathcal A)$.

**Пример.** $\varphi(x,y)=(2x,3y)$: в $(\mathbf e_1,\mathbf e_2)$ матрица $\operatorname{diag}(2,3)$, в $(\mathbf e_2,\mathbf e_1)$ — $\operatorname{diag}(3,2)$, $C=\begin{pmatrix}0&1\\1&0\end{pmatrix}$.

Матрицы одного оператора в разных базисах подобны.`,
      pitfalls: [
        md`Перепутать $C$ и $C^{-1}$ — самая частая ошибка. Справа стоит $C_{\mathcal A\leftarrow\mathcal A'}$: её столбцы — **новые** базисные векторы в **старых** координатах.`,
        'Порядок множителей восстанавливай по смыслу: справа — перевод входа, слева — перевод выхода.',
      ],
    },
  ],
};
