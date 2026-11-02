import { md, type Topic } from '../../src/content/schema';

// Неделя 7. Линейные отображения и их матрицы.

export const maps: Topic = {
  id: 'maps',
  title: 'Линейные отображения и их матрицы',
  longread: 7,
  units: [
    {
      id: 'linear-map',
      title: 'Линейное отображение',
      source: 'Лонгрид 7, §1, утверждение 1',
      definition: {
        level: 'basic',
        text: md`Отображение $\varphi:\mathbb V\to\mathbb W$ между пространствами над одним полем **линейно**, если $\varphi(\lambda\mathbf x+\mu\mathbf y)=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)$ для всех $\mathbf x,\mathbf y\in\mathbb V$, $\lambda,\mu\in\mathbb F$.

$\operatorname{Hom}(\mathbb V,\mathbb W)$ — все линейные отображения $\mathbb V\to\mathbb W$; линейный **оператор** — отображение $\mathbb V\to\mathbb V$, $\operatorname{End}(\mathbb V)=\operatorname{Hom}(\mathbb V,\mathbb V)$.`,
      },
      statement: {
        level: 'basic',
        text: md`Для линейного $\varphi$: $\ \varphi(\mathbf 0)=\mathbf 0$, $\ \varphi(-\mathbf x)=-\varphi(\mathbf x)$ и $\varphi(\lambda_1\mathbf x_1+\dots+\lambda_k\mathbf x_k)=\lambda_1\varphi(\mathbf x_1)+\dots+\lambda_k\varphi(\mathbf x_k)$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Подставляем в определение удобные скаляры.`,
        steps: [
          { title: md`$\varphi(\mathbf 0)=\mathbf 0$`, body: md`$\lambda=\mu=0$: $\varphi(\mathbf 0)=0\varphi(\mathbf x)+0\varphi(\mathbf y)=\mathbf 0$.` },
          { title: md`$\varphi(-\mathbf x)=-\varphi(\mathbf x)$`, body: md`$\varphi(\mathbf x)+\varphi(-\mathbf x)=\varphi(\mathbf x-\mathbf x)=\varphi(\mathbf 0)=\mathbf 0$.` },
          { title: md`Конечная комбинация`, body: md`Индукция по $k$: отделяем последнее слагаемое и применяем определение.` },
        ],
      },
      notes: md`Примеры: умножение на матрицу $\varphi_M(\mathbf z)=M\mathbf z$ (главный пример); дифференцирование $\mathbb F[t]_{\le d}\to\mathbb F[t]_{\le d-1}$; координатная функция $\kappa_{\mathcal A}$; нулевое и тождественное отображения; $p\mapsto p(a)$; $X\mapsto AX$, $X\mapsto X^{\mathsf T}$, $X\mapsto AX-XA$.

Не линейны: сдвиг $\mathbf x\mapsto\mathbf x+\mathbf b$ при $\mathbf b\ne\mathbf 0$, $X\mapsto X^2$, $X\mapsto\det X$, $\mathbf x\mapsto(x_1x_2,\,\dots)$.

$\operatorname{Hom}(\mathbb V,\mathbb W)$ — само векторное пространство с поточечными операциями.`,
      pitfalls: [
        md`Быстрая проверка нелинейности: $\varphi(\mathbf 0)\ne\mathbf 0$ или $\varphi(2\mathbf x)\ne2\varphi(\mathbf x)$ для одного удобного $\mathbf x$.`,
        md`Линейность зависит от поля: $z\mapsto\bar z$ линейно над $\mathbb R$, но не над $\mathbb C$ ($\overline{iz}=-i\bar z\ne i\bar z$).`,
      ],
    },
    {
      id: 'isomorphism',
      title: 'Изоморфизм',
      source: 'Лонгрид 7, §1',
      definition: {
        level: 'basic',
        text: md`Линейное отображение **изоморфизм**, если оно биективно. Если изоморфизм $\mathbb V\to\mathbb W$ существует, пишут $\mathbb V\simeq\mathbb W$.`,
      },
      statement: {
        level: 'basic',
        text: md`Обратное к линейному изоморфизму отображение тоже линейно. В частности, координатная функция $\kappa_{\mathcal A}:\mathbb V\to\mathbb F^n$ — изоморфизм, и любое $n$-мерное пространство изоморфно $\mathbb F^n$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Записываем векторы $\mathbb W$ как образы и применяем $\varphi^{-1}$ к линейности $\varphi$.`,
        steps: [
          { title: md`Обозначения`, body: md`Пусть $\mathbf u=\varphi(\mathbf x)$, $\mathbf v=\varphi(\mathbf y)$ — любые векторы $\mathbb W$ (они образы, раз $\varphi$ сюръективно).` },
          { title: md`Считаем`, body: md`$\varphi^{-1}(\lambda\mathbf u+\mu\mathbf v)=\varphi^{-1}(\varphi(\lambda\mathbf x+\mu\mathbf y))=\lambda\mathbf x+\mu\mathbf y=\lambda\varphi^{-1}(\mathbf u)+\mu\varphi^{-1}(\mathbf v)$.` },
          { title: md`Координатная функция`, body: md`$\kappa_{\mathcal A}$ линейна и биективна (свойства координат), значит, изоморфизм.` },
        ],
      },
      uses: ['coordinates'],
      notes: md`Изоморфизм переводит базис в базис, независимые системы — в независимые, порождающие — в порождающие. Поэтому изоморфные пространства имеют одну размерность.

Пример: $\mathbb R[x]_{\le2}\simeq$ кососимметричные $3\times3$: $a+bx+cx^2\mapsto\begin{pmatrix}0&a&b\\-a&0&c\\-b&-c&0\end{pmatrix}$.`,
      pitfalls: ['Изоморфизм обязан быть линейным: любая биекция ℝ → ℝ² (а такие есть) изоморфизмом не является.', 'Чтобы доказать изоморфность, удобно предъявить отображение и обратное к нему.'],
    },
    {
      id: 'map-on-basis',
      title: 'Линейное отображение задаётся значениями на базисе',
      source: 'Лонгрид 7, §2, утверждение 2',
      statement: {
        level: 'basic',
        text: md`Пусть $(\mathbf a_1,\dots,\mathbf a_n)$ — базис $\mathbb V$, а $\mathbf w_1,\dots,\mathbf w_n\in\mathbb W$ — **любые** векторы. Тогда существует **единственное** линейное $\varphi:\mathbb V\to\mathbb W$ с $\varphi(\mathbf a_i)=\mathbf w_i$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Определяем $\varphi$ через координаты; любое другое такое отображение обязано совпасть с ним по линейности.`,
        steps: [
          { title: md`Определение`, body: md`Для $\mathbf x=x_1\mathbf a_1+\dots+x_n\mathbf a_n$ положим $\varphi(\mathbf x)=x_1\mathbf w_1+\dots+x_n\mathbf w_n$. Корректно — разложение по базису единственно.` },
          { title: md`Линейность и значения`, body: md`Координаты $\lambda\mathbf x+\mu\mathbf y$ равны $\lambda x_i+\mu y_i$, откуда $\varphi(\lambda\mathbf x+\mu\mathbf y)=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)$. У $\mathbf a_i$ координаты — $i$-й стандартный столбец, так что $\varphi(\mathbf a_i)=\mathbf w_i$.` },
          { title: md`Единственность`, body: md`Если линейное $\psi$ тоже даёт $\psi(\mathbf a_i)=\mathbf w_i$, то $\psi(\mathbf x)=\sum x_i\psi(\mathbf a_i)=\sum x_i\mathbf w_i=\varphi(\mathbf x)$.` },
        ],
      },
      uses: ['basis'],
      notes: md`Если значения назначены на систему, которая **не** базис, свободы меньше: линейное отображение обязано сохранять все линейные соотношения. Алгоритм: найти соотношения между исходными векторами (например, $\mathbf v_3=2\mathbf v_1+3\mathbf v_2$), выделить базис, проверить, что образы удовлетворяют тем же соотношениям ($\mathbf u_3=2\mathbf u_1+3\mathbf u_2$). Выполнены — отображение есть и единственно (если среди векторов есть базис); нарушено хоть одно — отображения нет.`,
      pitfalls: [
        md`Значения на базисе можно назначать **произвольно** — никаких условий проверять не нужно.`,
        md`Если $\mathbf v_2=2\mathbf v_1$, то обязательно $\varphi(\mathbf v_2)=2\varphi(\mathbf v_1)$; иначе такого линейного отображения не существует.`,
      ],
    },
    {
      id: 'map-matrix',
      title: 'Матрица линейного отображения',
      source: 'Лонгрид 7, §3, утверждение 3',
      definition: {
        level: 'basic',
        text: md`Пусть $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ — базис $\mathbb V$, $\mathcal B=(\mathbf b_1,\dots,\mathbf b_m)$ — базис $\mathbb W$. **Матрица** $\varphi$ в этих базисах:
$$T(\varphi,\mathcal A,\mathcal B)=\big[\,[\varphi(\mathbf a_1)]_{\mathcal B}\ \dots\ [\varphi(\mathbf a_n)]_{\mathcal B}\,\big]\in\operatorname{Mat}_{m\times n}(\mathbb F):$$
в $j$-м **столбце** — координаты образа $j$-го базисного вектора в базисе $\mathcal B$.`,
      },
      statement: {
        level: 'basic',
        text: md`**Основная координатная формула:** для любого $\mathbf x\in\mathbb V$
$$[\varphi(\mathbf x)]_{\mathcal B}=T(\varphi,\mathcal A,\mathcal B)\,[\mathbf x]_{\mathcal A}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Образ вектора — та же комбинация образов базисных векторов; в координатах это комбинация столбцов матрицы, то есть произведение.`,
        steps: [
          { title: md`Раскладываем`, body: md`$\mathbf x=x_1\mathbf a_1+\dots+x_n\mathbf a_n$, по линейности $\varphi(\mathbf x)=x_1\varphi(\mathbf a_1)+\dots+x_n\varphi(\mathbf a_n)$.` },
          { title: md`Переходим к координатам`, body: md`Координаты в $\mathcal B$ линейны: $[\varphi(\mathbf x)]_{\mathcal B}=x_1[\varphi(\mathbf a_1)]_{\mathcal B}+\dots+x_n[\varphi(\mathbf a_n)]_{\mathcal B}$.` },
          { title: md`Это произведение`, body: md`Справа — комбинация столбцов $T(\varphi,\mathcal A,\mathcal B)$ с коэффициентами $x_1,\dots,x_n$, то есть $T(\varphi,\mathcal A,\mathcal B)[\mathbf x]_{\mathcal A}$.` },
        ],
      },
      uses: ['linear-map', 'coordinates'],
      notes: md`Соответствие $\varphi\mapsto T(\varphi,\mathcal A,\mathcal B)$ — изоморфизм $\operatorname{Hom}(\mathbb V,\mathbb W)\simeq\operatorname{Mat}_{m\times n}(\mathbb F)$, поэтому $\dim\operatorname{Hom}(\mathbb V,\mathbb W)=mn$.

Пример: $D:\mathbb R[t]_{\le2}\to\mathbb R[t]_{\le1}$, $p\mapsto p'$, базисы $(1,t,t^2)$ и $(1,t)$: $D(1)=0$, $D(t)=1$, $D(t^2)=2t$, так что $T=\begin{pmatrix}0&1&0\\0&0&2\end{pmatrix}$.

Удобный выбор базисов упрощает матрицу: берём векторы, которые переходят в ноль, и векторы, образы которых — базисные векторы $\mathbb W$; тогда матрица из единиц и нулей.`,
      pitfalls: [
        'Координаты образов пишутся СТОЛБЦАМИ, а не строками.',
        md`Порядок аргументов: $T(\varphi,\mathcal A,\mathcal B)$ — сначала базис области определения, потом пространства значений. Размер матрицы $\dim\mathbb W\times\dim\mathbb V$.`,
        'Матрицу проще считать по столбцам (образ каждого базисного вектора), чем через общую формулу для произвольного вектора.',
      ],
    },
    {
      id: 'change-of-basis',
      title: 'Матрица замены базиса',
      source: 'Лонгрид 7, §4, утверждение 4',
      definition: {
        level: 'basic',
        text: md`Для базисов $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ и $\mathcal B$ одного пространства
$$C_{\mathcal B\leftarrow\mathcal A}=T(\operatorname{Id},\mathcal A,\mathcal B)=\big[\,[\mathbf a_1]_{\mathcal B}\ \dots\ [\mathbf a_n]_{\mathcal B}\,\big],\qquad [\mathbf x]_{\mathcal B}=C_{\mathcal B\leftarrow\mathcal A}[\mathbf x]_{\mathcal A}.$$
В столбцах — **старые** базисные векторы $\mathcal A$, записанные в **новом** базисе $\mathcal B$.`,
      },
      statement: {
        level: 'basic',
        text: md`Для любых базисов $\mathcal A,\mathcal B,\mathcal C$:
$$C_{\mathcal A\leftarrow\mathcal B}=C_{\mathcal B\leftarrow\mathcal A}^{-1},\qquad C_{\mathcal C\leftarrow\mathcal A}=C_{\mathcal C\leftarrow\mathcal B}\,C_{\mathcal B\leftarrow\mathcal A}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Матрицы описывают пересчёт координат одного и того же вектора; два пересчёта подряд — один пересчёт.`,
        steps: [
          { title: md`Композиция`, body: md`$C_{\mathcal C\leftarrow\mathcal B}C_{\mathcal B\leftarrow\mathcal A}[\mathbf x]_{\mathcal A}=C_{\mathcal C\leftarrow\mathcal B}[\mathbf x]_{\mathcal B}=[\mathbf x]_{\mathcal C}$ для любого $\mathbf x$; а $[\mathbf x]_{\mathcal A}$ пробегает все столбцы. Значит, произведение равно $C_{\mathcal C\leftarrow\mathcal A}$.` },
          { title: md`Обратная`, body: md`Берём $\mathcal C=\mathcal A$: $C_{\mathcal A\leftarrow\mathcal B}C_{\mathcal B\leftarrow\mathcal A}=C_{\mathcal A\leftarrow\mathcal A}=I$, и так же в другом порядке.` },
        ],
      },
      uses: ['map-matrix'],
      notes: md`Самый частый случай: $\mathbb V=\mathbb F^n$, $\mathcal E$ — стандартный базис. Тогда $C_{\mathcal E\leftarrow\mathcal F}$ — это просто векторы $\mathbf f_i$, записанные столбцами, а $C_{\mathcal F\leftarrow\mathcal E}=C_{\mathcal E\leftarrow\mathcal F}^{-1}$.

Пример: $\mathcal A=(1,t,t^2)$, $\mathcal B=(1,t-1,(t-1)^2)$: $t=1+(t-1)$, $t^2=1+2(t-1)+(t-1)^2$, поэтому $C_{\mathcal B\leftarrow\mathcal A}=\begin{pmatrix}1&1&1\\0&1&2\\0&0&1\end{pmatrix}$.

Для многочленов обратную матрицу часто можно не считать. Если каждый вектор базиса обнуляется во всех выбранных точках, кроме одной, координаты любого $p$ читаются по его значениям в этих точках. Это и есть столбцы матрицы перехода в такой базис.`,
      pitfalls: [
        md`Направление стрелки: $C_{\mathcal B\leftarrow\mathcal A}$ принимает координаты в $\mathcal A$ и выдаёт в $\mathcal B$. Векторы, записанные столбцами, дают переход **из** их базиса **в** стандартный.`,
        'Матрица замены базиса всегда обратима (переход назад существует).',
      ],
    },
    {
      id: 'composition-matrix',
      title: 'Матрица композиции',
      source: 'Лонгрид 7, §5, утверждение 5',
      statement: {
        level: 'basic',
        text: md`Если $\varphi:\mathbb V\to\mathbb W$, $\psi:\mathbb W\to\mathbb U$, а $\mathcal A,\mathcal B,\mathcal C$ — базисы $\mathbb V,\mathbb W,\mathbb U$, то
$$T(\psi\circ\varphi,\mathcal A,\mathcal C)=T(\psi,\mathcal B,\mathcal C)\,T(\varphi,\mathcal A,\mathcal B).$$
Для изоморфизма $T(\varphi^{-1},\mathcal B,\mathcal A)=T(\varphi,\mathcal A,\mathcal B)^{-1}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Дважды применяем основную координатную формулу.`,
        steps: [
          { title: md`Две формулы подряд`, body: md`$[(\psi\circ\varphi)(\mathbf x)]_{\mathcal C}=T(\psi,\mathcal B,\mathcal C)[\varphi(\mathbf x)]_{\mathcal B}=T(\psi,\mathcal B,\mathcal C)T(\varphi,\mathcal A,\mathcal B)[\mathbf x]_{\mathcal A}$.` },
          { title: md`Сравниваем`, body: md`С другой стороны, это $T(\psi\circ\varphi,\mathcal A,\mathcal C)[\mathbf x]_{\mathcal A}$. Столбец $[\mathbf x]_{\mathcal A}$ любой, значит, матрицы равны (подставь стандартные столбцы — совпадут все столбцы).` },
          { title: md`Обратное`, body: md`$\varphi^{-1}\circ\varphi=\operatorname{Id}$, а $T(\operatorname{Id},\mathcal A,\mathcal A)=I$: произведение матриц — $I$.` },
        ],
      },
      uses: ['map-matrix'],
      notes: md`Именно поэтому умножение матриц определено «строка на столбец»: оно описывает последовательное применение отображений.

Порядок множителей читается справа налево: первое действие над столбцом стоит справа. Если матрицы даны в несогласованных базисах, вставляем замену: $T(\psi\circ\varphi,\mathcal A,\mathcal H)=N\,C_{\mathcal G\leftarrow\mathcal F}\,M$ при $M=T(\varphi,\mathcal A,\mathcal F)$, $N=T(\psi,\mathcal G,\mathcal H)$.`,
      pitfalls: ['Базис в середине должен совпадать: выход φ и вход ψ записаны в одном базисе. Если нет — вставь матрицу замены базиса.'],
    },
    {
      id: 'new-bases',
      title: 'Матрица отображения в новых базисах',
      source: 'Лонгрид 7, §6',
      statement: {
        level: 'basic',
        text: md`Если $M=T(\varphi,\mathcal A,\mathcal B)$, $M'=T(\varphi,\mathcal A',\mathcal B')$, то
$$M'=C_{\mathcal B'\leftarrow\mathcal B}\;M\;C_{\mathcal A\leftarrow\mathcal A'}.$$
Для оператора ($\mathcal A=\mathcal B$, $\mathcal A'=\mathcal B'$, $C=C_{\mathcal A\leftarrow\mathcal A'}$): $M'=C^{-1}MC$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Входной столбец переводим в старый базис, применяем $M$, выход переводим в новый базис.`,
        steps: [
          { title: md`Цепочка`, body: md`$[\varphi(\mathbf x)]_{\mathcal B'}=C_{\mathcal B'\leftarrow\mathcal B}[\varphi(\mathbf x)]_{\mathcal B}=C_{\mathcal B'\leftarrow\mathcal B}M[\mathbf x]_{\mathcal A}=C_{\mathcal B'\leftarrow\mathcal B}MC_{\mathcal A\leftarrow\mathcal A'}[\mathbf x]_{\mathcal A'}$.` },
          { title: md`Сравниваем с $M'$`, body: md`С другой стороны, $[\varphi(\mathbf x)]_{\mathcal B'}=M'[\mathbf x]_{\mathcal A'}$, и $[\mathbf x]_{\mathcal A'}$ — любой столбец.` },
          { title: md`Оператор`, body: md`При $\mathcal B=\mathcal A$, $\mathcal B'=\mathcal A'$: $C_{\mathcal A'\leftarrow\mathcal A}=C^{-1}$.` },
        ],
      },
      uses: ['change-of-basis', 'map-matrix'],
      notes: md`Порядок множителей восстанавливается по смыслу, а не заучивается: справа — перевод **входа** из нового базиса в старый, слева — перевод **выхода** из старого в новый.

Пример: $\varphi(x,y)=(2x,3y)$ в базисе $(\mathbf e_1,\mathbf e_2)$ имеет матрицу $\operatorname{diag}(2,3)$, в базисе $(\mathbf e_2,\mathbf e_1)$ — $\operatorname{diag}(3,2)$: эти матрицы подобны.

Матрицы одного оператора в разных базисах [подобны](/linal-kr2/topic/maps?u=similar).`,
      pitfalls: [
        md`$M'=C^{-1}MC$, где $C=C_{\mathcal A\leftarrow\mathcal A'}$ — столбцы $C$ это **новые** базисные векторы в **старых** координатах. Перепутать $C$ и $C^{-1}$ — самая частая ошибка.`,
        'Часто проще посчитать новую матрицу прямо по столбцам (образы новых базисных векторов), чем перемножать три матрицы.',
      ],
    },
    {
      id: 'similar',
      title: 'Подобные матрицы',
      source: 'Лонгрид 7, §6',
      definition: {
        level: 'basic',
        text: md`Квадратные матрицы $M$ и $M'$ **подобны**, если существует обратимая матрица $C$, для которой $M'=C^{-1}MC$.`,
      },
      notes: md`Матрицы одного оператора в разных базисах подобны: $T(\varphi,\mathcal A',\mathcal A')=C^{-1}T(\varphi,\mathcal A,\mathcal A)C$, $C=C_{\mathcal A\leftarrow\mathcal A'}$. И обратно: подобные матрицы — это один оператор, записанный в двух базисах.

Подобие не меняет «сути» оператора: $I$ подобна только себе ($C^{-1}IC=I$), нулевая — только нулевой. Поэтому $I$ и $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ не подобны, а $\operatorname{diag}(2,3)$ и $\operatorname{diag}(3,2)$ подобны (перестановка базиса).`,
      uses: ['new-bases'],
      pitfalls: [md`Подобие — не равенство $C^{-1}MC=M$: это условие «$C$ коммутирует с $M$», совсем другое.`],
    },
  ],
};
