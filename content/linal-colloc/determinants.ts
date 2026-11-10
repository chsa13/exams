import { md, type Topic } from '../../src/content/schema';

// Лекция 5. Определители, площади и объёмы

export const determinants: Topic = {
  id: 'determinants',
  title: 'Определители, площади и объёмы',
  longread: 5,
  units: [
    {
      id: 'det2',
      title: 'Определитель матрицы 2×2',
      source: 'Лекция 5, §22.1',
      definition: {
        level: 'basic',
        text: md`**Определитель** матрицы $A=[\mathbf a\ \mathbf b]=\begin{pmatrix}a_1&b_1\\a_2&b_2\end{pmatrix}\in\operatorname{Mat}_{2\times2}(\mathbb F)$ — число $\det A=a_1b_2-a_2b_1$.`,
      },
      notes: md`Свойства (утверждение 22): линейность по каждому столбцу, $\det[\mathbf b\ \mathbf a]=-\det[\mathbf a\ \mathbf b]$; $\det[\mathbf a\ \mathbf b]=0\iff$ векторы пропорциональны или один из них нулевой.`,
      pitfalls: ['Определитель зависит от порядка столбцов: перестановка меняет знак.'],
    },
    {
      id: 'orientation',
      title: 'Ориентация пары векторов и тройки векторов',
      source: 'Лекция 5, §22.2 и §23.1',
      definition: {
        level: 'basic',
        text: md`Упорядоченная пара непропорциональных $\mathbf a,\mathbf b\in\mathbb R^2$ **положительно ориентирована**, если кратчайший поворот от $\mathbf a$ к $\mathbf b$ — против часовой стрелки, иначе отрицательно.

Упорядоченная тройка некомпланарных $\mathbf a,\mathbf b,\mathbf c\in\mathbb R^3$ — **правая**, если со стороны конца $\mathbf c$ кратчайший поворот от $\mathbf a$ к $\mathbf b$ виден против часовой стрелки, иначе **левая**. Стандартная тройка $(\mathbf e_1,\mathbf e_2,\mathbf e_3)$ правая.`,
      },
      pitfalls: ['Ориентация зависит от порядка: (e₁, e₂, e₃) правая, (e₂, e₁, e₃) левая.'],
    },
    {
      id: 'cross-product',
      title: 'Векторное произведение',
      source: 'Лекция 5, §23.1, утверждение 23',
      definition: {
        level: 'basic',
        text: md`**Векторное произведение** — операция $(\mathbf a,\mathbf b)\mapsto\mathbf a\times\mathbf b\in\mathbb R^3$, которая
1. линейна по каждому аргументу;
2. кососимметрична: $\mathbf a\times\mathbf b=-\mathbf b\times\mathbf a$;
3. на стандартных векторах: $\mathbf e_1\times\mathbf e_2=\mathbf e_3$, $\mathbf e_2\times\mathbf e_3=\mathbf e_1$, $\mathbf e_3\times\mathbf e_1=\mathbf e_2$.

Такая операция существует и единственна: $\mathbf a\times\mathbf b=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)^{\mathsf T}$.`,
      },
      notes: md`Геометрически: $\mathbf a\times\mathbf b\perp\mathbf a,\mathbf b$; $\|\mathbf a\times\mathbf b\|^2=\|\mathbf a\|^2\|\mathbf b\|^2-\langle\mathbf a,\mathbf b\rangle^2$, то есть $\|\mathbf a\times\mathbf b\|=\|\mathbf a\|\|\mathbf b\||\sin\varphi|$ — площадь параллелограмма; направление — по правилу правой руки. Из кососимметричности $\mathbf a\times\mathbf a=\mathbf 0$.`,
      pitfalls: [md`Векторное произведение не ассоциативно: $(\mathbf e_1\times\mathbf e_1)\times\mathbf e_2=\mathbf 0$, а $\mathbf e_1\times(\mathbf e_1\times\mathbf e_2)=\mathbf e_1\times\mathbf e_3=-\mathbf e_2$.`],
    },
    {
      id: 'triple-product',
      title: 'Смешанное произведение и определитель 3×3',
      source: 'Лекция 5, §24',
      definition: {
        level: 'basic',
        text: md`**Смешанное произведение** векторов $\mathbf a,\mathbf b,\mathbf c\in\mathbb R^3$ — число $\langle\mathbf a,\mathbf b\times\mathbf c\rangle$. **Определитель** матрицы $A=[\mathbf a\ \mathbf b\ \mathbf c]$ по определению равен смешанному произведению её столбцов: $\det A=\langle\mathbf a,\mathbf b\times\mathbf c\rangle$.`,
      },
      notes: md`Разложение по первой строке: $\det A=a_1\det\begin{pmatrix}b_2&c_2\\b_3&c_3\end{pmatrix}-b_1\det\begin{pmatrix}a_2&c_2\\a_3&c_3\end{pmatrix}+c_1\det\begin{pmatrix}a_2&b_2\\a_3&b_3\end{pmatrix}$.

Циклическая перестановка столбцов определитель не меняет, перестановка двух столбцов меняет знак; определитель линеен по каждому столбцу.

$|\det[\mathbf a\ \mathbf b\ \mathbf c]|$ — объём параллелепипеда, $\frac16$ его — объём тетраэдра; знак — ориентация тройки.`,
      pitfalls: [md`$\langle\mathbf a,\mathbf b\times\mathbf c\rangle=\langle\mathbf b,\mathbf c\times\mathbf a\rangle$, но $\langle\mathbf a,\mathbf c\times\mathbf b\rangle=-\langle\mathbf a,\mathbf b\times\mathbf c\rangle$ — следи за порядком.`],
    },
    {
      id: 'coplanar',
      title: 'Компланарные векторы',
      source: 'Лекция 5, §25.1',
      definition: {
        level: 'basic',
        text: md`Векторы $\mathbf a,\mathbf b,\mathbf c\in\mathbb R^3$ **компланарны**, если они лежат в одной плоскости, проходящей через начало координат.`,
      },
      notes: md`Критерий (утверждение 28): $\mathbf a,\mathbf b,\mathbf c$ компланарны $\iff\det[\mathbf a\ \mathbf b\ \mathbf c]=0$. Если $\mathbf b,\mathbf c$ непропорциональны, $\mathbf b\times\mathbf c$ — нормаль к их плоскости, и $\langle\mathbf a,\mathbf b\times\mathbf c\rangle=0\iff\mathbf a$ в этой плоскости.`,
      pitfalls: ['Компланарность трёх векторов в ℝ³ — то же самое, что их линейная зависимость.'],
    },
    {
      id: 'det2-area',
      title: 'Определитель 2×2 и ориентированная площадь параллелограмма',
      source: 'Лекция 5, утверждения 21 и 22',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для $\mathbf a,\mathbf b\in\mathbb R^2$ число $\det[\mathbf a\ \mathbf b]$ равно ориентированной площади параллелограмма, построенного на $\mathbf a$ и $\mathbf b$: по модулю — его площадь, знак «$+$» для положительно ориентированной пары и «$-$» для отрицательно ориентированной.

Кроме того, $\det$ линеен по каждому столбцу и меняет знак при перестановке столбцов.`,
      },
      proof: {
        level: 'basic',
        idea: md`Записываем векторы в полярных координатах: определитель превращается в $\|\mathbf a\|\|\mathbf b\|\sin(\beta-\alpha)$ — школьная формула площади со знаком поворота.`,
        steps: [
          { title: md`Вырожденный случай`, body: md`Если $\mathbf a=\mathbf 0$ или $\mathbf b=\mathbf 0$, то и определитель, и площадь равны нулю.` },
          { title: md`Полярная запись`, body: md`Пусть $\alpha,\beta$ — углы $\mathbf a,\mathbf b$ с положительным направлением оси $Ox$: $\mathbf a=\|\mathbf a\|(\cos\alpha,\sin\alpha)^{\mathsf T}$, $\mathbf b=\|\mathbf b\|(\cos\beta,\sin\beta)^{\mathsf T}$.` },
          { title: md`Считаем определитель`, body: md`$\det[\mathbf a\ \mathbf b]=\|\mathbf a\|\|\mathbf b\|(\cos\alpha\sin\beta-\sin\alpha\cos\beta)=\|\mathbf a\|\|\mathbf b\|\sin(\beta-\alpha)$.` },
          { title: md`Модуль — площадь`, body: md`$\beta-\alpha$ — угол поворота от $\mathbf a$ к $\mathbf b$; $|\sin(\beta-\alpha)|=\sin\varphi$, где $\varphi$ — угол между векторами. Площадь параллелограмма — $\|\mathbf a\|\|\mathbf b\|\sin\varphi$.` },
          { title: md`Знак — ориентация`, body: md`Если кратчайший поворот от $\mathbf a$ к $\mathbf b$ против часовой стрелки, то $\beta-\alpha\in(0,\pi)$ по модулю $2\pi$ и синус положителен; по часовой — $\beta-\alpha\in(-\pi,0)$, синус отрицателен.` },
          { title: md`Линейность и антисимметрия`, body: md`Из формулы $a_1b_2-a_2b_1$: подставляем $\lambda\mathbf a+\mu\mathbf c$ вместо $\mathbf a$, раскрываем скобки — получаем $\lambda\det[\mathbf a\ \mathbf b]+\mu\det[\mathbf c\ \mathbf b]$; так же по второму столбцу. $\det[\mathbf b\ \mathbf a]=b_1a_2-b_2a_1=-(a_1b_2-a_2b_1)$.` },
        ],
      },
      notes: md`Следствие: $\det[\mathbf a\ \mathbf b]=0\iff$ один из векторов нулевой или они пропорциональны (параллелограмм вырожден).

**Пример.** $\det\begin{pmatrix}3&1\\1&2\end{pmatrix}=5$: пара $(3,1),(1,2)$ положительно ориентирована, площадь $5$. Переставим столбцы — получим $-5$.

Аналоги: в $\mathbb R^3$ площадь параллелограмма — $\|\mathbf a\times\mathbf b\|$, объём параллелепипеда — $|\det[\mathbf a\ \mathbf b\ \mathbf c]|$.`,
      pitfalls: [
        md`Площадь — модуль определителя; сам определитель может быть отрицательным.`,
        'Знак не зависит от длин векторов — только от направления кратчайшего поворота от первого ко второму.',
      ],
    },
  ],
};
