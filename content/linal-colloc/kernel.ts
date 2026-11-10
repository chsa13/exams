import { md, type Topic } from '../../src/content/schema';

// Лекция 8. Ядро, образ и операции с подпространствами

export const kernel: Topic = {
  id: 'kernel',
  title: 'Ядро, образ и операции с подпространствами',
  longread: 8,
  units: [
    {
      id: 'ker-im',
      title: 'Ядро и образ линейного отображения',
      source: 'Лекция 8, §38',
      definition: {
        level: 'basic',
        text: md`Для линейного $\varphi:\mathbb V\to\mathbb W$:
- **ядро** $\ker\varphi=\{\mathbf x\in\mathbb V\mid\varphi(\mathbf x)=\mathbf 0\}\subseteq\mathbb V$;
- **образ** $\operatorname{Im}\varphi=\{\varphi(\mathbf x)\mid\mathbf x\in\mathbb V\}\subseteq\mathbb W$.`,
      },
      notes: md`Для $\varphi_A(\mathbf x)=A\mathbf x$: $\ker\varphi_A=\ker A$, $\operatorname{Im}\varphi_A=\operatorname{span}$ столбцов $A$.

Пример: $D:\mathbb R[t]_{\le2}\to\mathbb R[t]_{\le1}$, $p\mapsto p'$: $\ker D=\operatorname{span}\{1\}$, $\operatorname{Im}D=\mathbb R[t]_{\le1}$.`,
      pitfalls: [md`Ядро лежит в пространстве аргументов, образ — в пространстве значений.`],
    },
    {
      id: 'product-space',
      title: 'Прямое произведение пространств',
      source: 'Лекция 8, §41',
      definition: {
        level: 'basic',
        text: md`**Прямое произведение** пространств $\mathbb V$ и $\mathbb W$ над $\mathbb F$ — множество пар $\mathbb V\times\mathbb W=\{(\mathbf v,\mathbf w)\mid\mathbf v\in\mathbb V,\ \mathbf w\in\mathbb W\}$ с покомпонентными операциями: $(\mathbf v_1,\mathbf w_1)+(\mathbf v_2,\mathbf w_2)=(\mathbf v_1+\mathbf v_2,\mathbf w_1+\mathbf w_2)$, $\lambda(\mathbf v,\mathbf w)=(\lambda\mathbf v,\lambda\mathbf w)$.`,
      },
      pitfalls: ['Элемент 𝕌 × 𝕃 — пара векторов, а не их сумма; не путай с 𝕌 + 𝕃.'],
    },
    {
      id: 'sum-intersection',
      title: 'Сумма и пересечение подпространств',
      source: 'Лекция 8, §41',
      definition: {
        level: 'basic',
        text: md`Для подпространств $\mathbb U,\mathbb L\subseteq\mathbb V$: **пересечение** $\mathbb U\cap\mathbb L=\{\mathbf x\mid\mathbf x\in\mathbb U\text{ и }\mathbf x\in\mathbb L\}$, **сумма** $\mathbb U+\mathbb L=\{\mathbf u+\mathbf l\mid\mathbf u\in\mathbb U,\ \mathbf l\in\mathbb L\}$.`,
      },
      notes: md`Оба — подпространства. Пересечение — наибольшее подпространство в обоих, сумма — наименьшее, содержащее оба. Сумма — образ отображения сложения $\sigma:\mathbb U\times\mathbb L\to\mathbb V$; если $\mathbb U=\ker A$, $\mathbb L=\ker B$, то $\mathbb U\cap\mathbb L=\ker\begin{pmatrix}A\\B\end{pmatrix}$.`,
      pitfalls: ['Сумма — не объединение: объединение подпространств обычно не подпространство.'],
    },
    {
      id: 'direct-sum',
      title: 'Прямая сумма подпространств',
      source: 'Лекция 8, §42',
      definition: {
        level: 'basic',
        text: md`Сумма $\mathbb U+\mathbb L$ **прямая** ($\mathbb U\oplus\mathbb L$), если каждый $\mathbf x\in\mathbb U+\mathbb L$ **единственным образом** представляется как $\mathbf x=\mathbf u+\mathbf l$, $\mathbf u\in\mathbb U$, $\mathbf l\in\mathbb L$. Если ещё $\mathbb U+\mathbb L=\mathbb V$, пишут $\mathbb V=\mathbb U\oplus\mathbb L$.`,
      },
      notes: md`Пример: $\mathbb R^3=\operatorname{span}\{\mathbf e_1,\mathbf e_2\}\oplus\operatorname{span}\{\mathbf e_3\}$; квадратные матрицы $=$ симметричные $\oplus$ кососимметричные.`,
      pitfalls: [md`Для $\mathbb V=\mathbb U\oplus\mathbb L$ нужны оба условия: сумма прямая и равна всему $\mathbb V$.`],
    },
    {
      id: 'projector',
      title: 'Проектор',
      source: 'Лекция 8, §43',
      definition: {
        level: 'basic',
        text: md`Оператор $P\in\operatorname{End}(\mathbb V)$ — **проектор**, если $P^2=P$.

Если $\mathbb V=\mathbb U\oplus\mathbb L$ и $\mathbf x=\mathbf u+\mathbf l$, то $P_{\mathbb U}(\mathbf x)=\mathbf u$ — **проектор на $\mathbb U$ вдоль $\mathbb L$**.`,
      },
      notes: md`$P_{\mathbb U}^2=P_{\mathbb U}$, $P_{\mathbb U}+P_{\mathbb L}=\operatorname{Id}$, $P_{\mathbb U}P_{\mathbb L}=P_{\mathbb L}P_{\mathbb U}=0$, $\operatorname{Im}P_{\mathbb U}=\mathbb U$, $\ker P_{\mathbb U}=\mathbb L$.`,
      pitfalls: [md`Проектор на $\mathbb U$ зависит и от $\mathbb L$: «вдоль чего» — часть определения.`],
    },
    {
      id: 'ker-im-subspaces',
      title: 'Ядро и образ — подпространства; критерий инъективности через ядро',
      source: 'Лекция 8, утверждения 44 и 45',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $\varphi:\mathbb V\to\mathbb W$ линейно. Тогда
1. $\ker\varphi$ — подпространство $\mathbb V$, $\operatorname{Im}\varphi$ — подпространство $\mathbb W$;
2. $\varphi$ инъективно $\iff\ker\varphi=\{\mathbf 0\}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Критерий подпространства плюс линейность; для инъективности: из $\varphi(\mathbf x)=\varphi(\mathbf y)$ по линейности $\varphi(\mathbf x-\mathbf y)=\mathbf 0$.`,
        steps: [
          { title: md`Оба содержат ноль`, body: md`$\varphi(\mathbf 0)=\mathbf 0$, поэтому $\mathbf 0\in\ker\varphi$ и $\mathbf 0\in\operatorname{Im}\varphi$ — оба множества непусты.` },
          { title: md`Ядро замкнуто`, body: md`Если $\mathbf x,\mathbf y\in\ker\varphi$, то $\varphi(\lambda\mathbf x+\mu\mathbf y)=\lambda\varphi(\mathbf x)+\mu\varphi(\mathbf y)=\mathbf 0$, то есть $\lambda\mathbf x+\mu\mathbf y\in\ker\varphi$.` },
          { title: md`Образ замкнут`, body: md`Если $\mathbf u=\varphi(\mathbf x)$, $\mathbf v=\varphi(\mathbf y)$, то $\lambda\mathbf u+\mu\mathbf v=\varphi(\lambda\mathbf x+\mu\mathbf y)\in\operatorname{Im}\varphi$. По критерию подпространства оба — подпространства.` },
          { title: md`Инъективность $\Rightarrow$ нулевое ядро`, body: md`Если $\varphi(\mathbf x)=\mathbf 0=\varphi(\mathbf 0)$, то по инъективности $\mathbf x=\mathbf 0$.` },
          { title: md`Нулевое ядро $\Rightarrow$ инъективность`, body: md`Если $\varphi(\mathbf x)=\varphi(\mathbf y)$, то $\varphi(\mathbf x-\mathbf y)=\mathbf 0$, значит, $\mathbf x-\mathbf y\in\ker\varphi=\{\mathbf 0\}$ и $\mathbf x=\mathbf y$.` },
        ],
      },
      uses: ['subspace-criterion'],
      notes: md`Аналогично: $\varphi$ сюръективно $\iff\operatorname{Im}\varphi=\mathbb W$ (это определение), изоморфизм $\iff\ker\varphi=\{\mathbf 0\}$ и $\operatorname{Im}\varphi=\mathbb W$.

Для $\varphi_A$: инъективно $\iff$ у $A\mathbf x=\mathbf 0$ только нулевое решение (столбцы независимы).`,
      pitfalls: [
        'Для инъективности линейного отображения достаточно проверить, что в ноль переходит только ноль; для произвольной функции так нельзя.',
        md`В доказательстве «$\Leftarrow$» важна именно линейность: $\varphi(\mathbf x)-\varphi(\mathbf y)=\varphi(\mathbf x-\mathbf y)$.`,
      ],
    },
    {
      id: 'product-basis',
      title: 'Базис и размерность прямого произведения 𝕌 × 𝕎',
      source: 'Лекция 8, §41',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $\mathcal A=(\mathbf a_1,\dots,\mathbf a_n)$ — базис $\mathbb U$, а $\mathcal B=(\mathbf b_1,\dots,\mathbf b_m)$ — базис $\mathbb W$, то
$$(\mathbf a_1,\mathbf 0),\dots,(\mathbf a_n,\mathbf 0),(\mathbf 0,\mathbf b_1),\dots,(\mathbf 0,\mathbf b_m)$$
— базис $\mathbb U\times\mathbb W$. В частности, $\dim(\mathbb U\times\mathbb W)=\dim\mathbb U+\dim\mathbb W$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Пару раскладываем по компонентам отдельно; единственность обоих разложений даёт единственность разложения пары.`,
        steps: [
          { title: md`Разложение существует`, body: md`Пусть $(\mathbf u,\mathbf w)\in\mathbb U\times\mathbb W$, $\mathbf u=\sum x_i\mathbf a_i$, $\mathbf w=\sum y_j\mathbf b_j$. Покомпонентно $(\mathbf u,\mathbf w)=(\mathbf u,\mathbf 0)+(\mathbf 0,\mathbf w)=\sum x_i(\mathbf a_i,\mathbf 0)+\sum y_j(\mathbf 0,\mathbf b_j)$.` },
          { title: md`Разложение единственно`, body: md`Если $(\mathbf u,\mathbf w)=\sum x_i(\mathbf a_i,\mathbf 0)+\sum y_j(\mathbf 0,\mathbf b_j)=\big(\sum x_i\mathbf a_i,\ \sum y_j\mathbf b_j\big)$, то $\mathbf u=\sum x_i\mathbf a_i$ и $\mathbf w=\sum y_j\mathbf b_j$. Эти разложения по базисам $\mathcal A$ и $\mathcal B$ единственны, поэтому коэффициенты $x_i,y_j$ определены однозначно.` },
          { title: md`Вывод`, body: md`Каждый вектор раскладывается по системе единственным образом — значит, это базис. В нём $n+m$ векторов.` },
        ],
      },
      uses: ['basis-unique'],
      notes: md`Пример: $\mathbb R^2\times\mathbb R^3\simeq\mathbb R^5$. Это утверждение используется в формуле размерности суммы: $\dim(\mathbb U\times\mathbb L)=\dim\mathbb U+\dim\mathbb L$.`,
      pitfalls: [md`Базис произведения — не пары $(\mathbf a_i,\mathbf b_j)$: их $nm$ штук и они зависимы. Нужны пары с нулём в одной из компонент.`],
    },
    {
      id: 'direct-sum-criterion',
      title: 'Прямая сумма двух подпространств и нулевое пересечение',
      source: 'Лекция 8, утверждение 47',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Сумма подпространств $\mathbb U+\mathbb L$ прямая тогда и только тогда, когда $\mathbb U\cap\mathbb L=\{\mathbf 0\}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Вектор пересечения даёт второе разложение нуля; два разложения одного вектора дают вектор пересечения.`,
        steps: [
          { title: md`$\Rightarrow$`, body: md`Пусть сумма прямая и $\mathbf z\in\mathbb U\cap\mathbb L$. Тогда $\mathbf 0=\mathbf 0+\mathbf 0=\mathbf z+(-\mathbf z)$, где $\mathbf z\in\mathbb U$, $-\mathbf z\in\mathbb L$, — два разложения нуля. По единственности $\mathbf z=\mathbf 0$.` },
          { title: md`$\Leftarrow$: два разложения`, body: md`Пусть $\mathbb U\cap\mathbb L=\{\mathbf 0\}$ и $\mathbf x=\mathbf u_1+\mathbf l_1=\mathbf u_2+\mathbf l_2$. Тогда $\mathbf u_1-\mathbf u_2=\mathbf l_2-\mathbf l_1$.` },
          { title: md`$\Leftarrow$: это вектор пересечения`, body: md`Левая часть лежит в $\mathbb U$, правая — в $\mathbb L$, так что обе лежат в $\mathbb U\cap\mathbb L=\{\mathbf 0\}$. Значит, $\mathbf u_1=\mathbf u_2$, $\mathbf l_1=\mathbf l_2$.` },
        ],
      },
      notes: md`На языке отображения сложения $\sigma:\mathbb U\times\mathbb L\to\mathbb V$: $\sigma(\mathbf u,\mathbf l)=\mathbf 0\iff\mathbf u=-\mathbf l\in\mathbb U\cap\mathbb L$, так что сумма прямая $\iff\ker\sigma=\{\mathbf 0\}\iff\sigma$ инъективно.

Для **трёх** подпространств попарно нулевых пересечений мало: три прямые в $\mathbb R^2$.`,
      pitfalls: [
        'Нулевое пересечение даёт прямоту суммы, но не равенство суммы всему пространству.',
        'Для трёх и более подпространств критерий «попарные пересечения нулевые» неверен.',
      ],
    },
    {
      id: 'subspace-as-kernel',
      title: 'Любое подпространство конечномерного пространства — ядро линейного отображения',
      source: 'Лекция 8, утверждение 46',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbb U$ — подпространство конечномерного $\mathbb V$. Тогда существует линейное отображение $\pi$ с $\ker\pi=\mathbb U$. В координатах: любое подпространство задаётся однородной системой линейных уравнений.`,
      },
      proof: {
        level: 'basic',
        idea: md`Дополняем базис $\mathbb U$ до базиса $\mathbb V$ и оставляем только «добавленные» координаты: в ноль переходят ровно векторы $\mathbb U$.`,
        steps: [
          { title: md`Случай $\mathbb U=\mathbb V$`, body: md`Подходит нулевое отображение $\mathbb V\to\{\mathbf 0\}$.` },
          { title: md`Дополняем базис`, body: md`Пусть $\dim\mathbb U=k<n=\dim\mathbb V$. У $\mathbb U$ есть базис $(\mathbf u_1,\dots,\mathbf u_k)$; дополним его до базиса $\mathcal A=(\mathbf u_1,\dots,\mathbf u_n)$ пространства $\mathbb V$.` },
          { title: md`Строим $\pi$`, body: md`$\pi:\mathbb V\to\mathbb F^{n-k}$, $\pi(x_1\mathbf u_1+\dots+x_n\mathbf u_n)=(x_{k+1},\dots,x_n)^{\mathsf T}$ — последние координаты в базисе $\mathcal A$. Линейно, так как координаты линейны.` },
          { title: md`Ядро`, body: md`$\pi(\mathbf x)=\mathbf 0\iff x_{k+1}=\dots=x_n=0\iff\mathbf x\in\operatorname{span}\{\mathbf u_1,\dots,\mathbf u_k\}=\mathbb U$.` },
        ],
      },
      uses: ['extend-to-basis', 'subspace-dim'],
      notes: md`Отображение не единственно — зависит от дополнения. Примеры: $\{p\mid p(a)=0\}=\ker(p\mapsto p(a))$; симметричные матрицы $=\ker(A\mapsto A-A^{\mathsf T})$.

На практике: пишем общий вектор $\operatorname{span}\{(1,0,1,1),(0,1,1,2)\}$ как $(a,b,a+b,a+2b)$ и исключаем параметры: $x_3=x_1+x_2$, $x_4=x_1+2x_2$.`,
      pitfalls: ['Нужно сослаться на то, что у подпространства есть базис и его можно дополнить — это две разные теоремы.'],
    },
    {
      id: 'projector-decomposition',
      title: 'Проекторы и разложение 𝕍 = Im P ⊕ ker P',
      source: 'Лекция 8, §43, утверждение 48',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`1. Если $\mathbb V=\mathbb U\oplus\mathbb L$, то $P_{\mathbb U}:\mathbf u+\mathbf l\mapsto\mathbf u$ — линейный оператор и проектор: $P_{\mathbb U}^2=P_{\mathbb U}$, $\operatorname{Im}P_{\mathbb U}=\mathbb U$, $\ker P_{\mathbb U}=\mathbb L$.
2. Обратно, для любого проектора $P\in\operatorname{End}(\mathbb V)$ ($P^2=P$): $\ \mathbb V=\operatorname{Im}P\oplus\ker P$, и $P$ оставляет у вектора его компоненту из $\operatorname{Im}P$, то есть $P$ — проектор на $\operatorname{Im}P$ вдоль $\ker P$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Единственность разложения даёт линейность $P_{\mathbb U}$; для проектора $P$ работает разложение $\mathbf x=P\mathbf x+(\mathbf x-P\mathbf x)$.`,
        steps: [
          { title: md`$P_{\mathbb U}$ линеен`, body: md`Если $\mathbf x=\mathbf u_1+\mathbf l_1$, $\mathbf y=\mathbf u_2+\mathbf l_2$, то $\lambda\mathbf x+\mu\mathbf y=(\lambda\mathbf u_1+\mu\mathbf u_2)+(\lambda\mathbf l_1+\mu\mathbf l_2)$ — разложение с первым слагаемым из $\mathbb U$ и вторым из $\mathbb L$. По единственности $P_{\mathbb U}(\lambda\mathbf x+\mu\mathbf y)=\lambda\mathbf u_1+\mu\mathbf u_2$.` },
          { title: md`$P_{\mathbb U}$ — проектор`, body: md`Для $\mathbf u\in\mathbb U$ разложение $\mathbf u=\mathbf u+\mathbf 0$, поэтому $P_{\mathbb U}\mathbf u=\mathbf u$; значит, $P_{\mathbb U}^2\mathbf x=P_{\mathbb U}\mathbf u=\mathbf u=P_{\mathbb U}\mathbf x$. Образ — $\mathbb U$; $P_{\mathbb U}\mathbf x=\mathbf 0\iff\mathbf u=\mathbf 0\iff\mathbf x\in\mathbb L$.` },
          { title: md`$\mathbb V=\operatorname{Im}P+\ker P$`, body: md`Для любого $\mathbf x$: $\mathbf x=P\mathbf x+(\mathbf x-P\mathbf x)$, где $P\mathbf x\in\operatorname{Im}P$, а $P(\mathbf x-P\mathbf x)=P\mathbf x-P^2\mathbf x=\mathbf 0$, то есть $\mathbf x-P\mathbf x\in\ker P$.` },
          { title: md`Сумма прямая`, body: md`Если $\mathbf y\in\operatorname{Im}P\cap\ker P$, то $\mathbf y=P\mathbf z$ и $\mathbf y=P\mathbf z=P^2\mathbf z=P(P\mathbf z)=P\mathbf y=\mathbf 0$. По критерию прямой суммы $\mathbb V=\operatorname{Im}P\oplus\ker P$.` },
          { title: md`$P$ оставляет компоненту из образа`, body: md`В (единственном) разложении $\mathbf x=P\mathbf x+(\mathbf x-P\mathbf x)$ компонента из $\operatorname{Im}P$ — это $P\mathbf x$. Значит, $P=P_{\operatorname{Im}P}$ вдоль $\ker P$.` },
        ],
      },
      uses: ['ker-im-subspaces', 'direct-sum-criterion'],
      notes: md`Итог: проекторы на $\mathbb V$ — то же самое, что разложения $\mathbb V=\mathbb U\oplus\mathbb L$.

Пример: $P_{\rm sym}(A)=\frac{A+A^{\mathsf T}}2$ и $P_{\rm skew}(A)=\frac{A-A^{\mathsf T}}2$ — проекторы разложения матриц на симметричные и кососимметричные.

В базисе «базис $\operatorname{Im}P$ + базис $\ker P$» матрица проектора — $\operatorname{diag}(1,\dots,1,0,\dots,0)$, и $\operatorname{rk}P=\dim\operatorname{Im}P$. Для проектора $\operatorname{Id}-P$ — тоже проектор, с образом $\ker P$ и ядром $\operatorname{Im}P$.`,
      pitfalls: [
        md`$P^2=P$ не значит $P\in\{0,\operatorname{Id}\}$: у операторов есть делители нуля.`,
        md`Ключевая выкладка — $P\mathbf y=\mathbf y$ для $\mathbf y\in\operatorname{Im}P$; её нужно вывести из $P^2=P$, а не считать очевидной.`,
      ],
    },
  ],
};
