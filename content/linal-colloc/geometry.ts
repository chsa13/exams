import { md, type Topic } from '../../src/content/schema';

// Лекция 4. Точки, прямые и плоскости в R³

export const geometry: Topic = {
  id: 'geometry',
  title: 'Точки, прямые и плоскости в ℝ³',
  longread: 4,
  units: [
    {
      id: 'dot-product',
      title: 'Длина, скалярное произведение, ортогональность',
      source: 'Лекция 4, §18',
      definition: {
        level: 'basic',
        text: md`Для $\mathbf x,\mathbf y\in\mathbb R^3$: **скалярное произведение** $\langle\mathbf x,\mathbf y\rangle=x_1y_1+x_2y_2+x_3y_3$, **длина** $\|\mathbf x\|=\sqrt{x_1^2+x_2^2+x_3^2}=\sqrt{\langle\mathbf x,\mathbf x\rangle}$.

Для ненулевых векторов $\langle\mathbf x,\mathbf y\rangle=\|\mathbf x\|\,\|\mathbf y\|\cos\varphi$, где $\varphi$ — угол между ними. Векторы **ортогональны** ($\mathbf x\perp\mathbf y$), если $\langle\mathbf x,\mathbf y\rangle=0$.`,
      },
      pitfalls: [md`Угол между векторами лежит в $[0,\pi]$, косинус может быть отрицательным; угол между прямыми или плоскостями — в $[0,\pi/2]$, поэтому там берут модуль.`],
    },
    {
      id: 'normal-vector',
      title: 'Нормальный вектор плоскости',
      source: 'Лекция 4, §19.2',
      definition: {
        level: 'basic',
        text: md`Ненулевой вектор $\mathbf n$ — **нормальный вектор** (нормаль) к плоскости $\Pi$, если $\mathbf n\perp\overrightarrow{PQ}$ для любых точек $P,Q\in\Pi$.`,
      },
      notes: md`Уравнение $Ax+By+Cz=D$, $(A,B,C)\ne(0,0,0)$, задаёт плоскость с нормалью $\mathbf n=(A,B,C)^{\mathsf T}$. При изменении $D$ плоскость сдвигается параллельно себе вдоль $\mathbf n$.

Плоскость через ноль $\Pi_0=\{\mathbf x\mid\langle\mathbf n,\mathbf x\rangle=0\}=\ker[A\ B\ C]$ — линейная оболочка двух непропорциональных векторов (ФСР уравнения).`,
      pitfalls: ['Нормаль определена с точностью до ненулевого множителя: (1, 2, 3) и (−2, −4, −6) — нормали одной плоскости.'],
    },
    {
      id: 'line-param',
      title: 'Параметрическое уравнение прямой',
      source: 'Лекция 4, §20.1',
      definition: {
        level: 'basic',
        text: md`Прямая через точку $\mathbf x_0$ с **направляющим вектором** $\mathbf d\ne\mathbf 0$: $L=\mathbf x_0+\operatorname{span}\{\mathbf d\}=\{\mathbf x_0+t\mathbf d\mid t\in\mathbb R\}$. Покоординатно $x=x_0+td_1$, $y=y_0+td_2$, $z=z_0+td_3$ — **параметрическое уравнение**.`,
      },
      notes: md`Прямые $L_1=\mathbf x_0+\operatorname{span}\{\mathbf d_1\}$, $L_2=\mathbf y_0+\operatorname{span}\{\mathbf d_2\}$: при пропорциональных $\mathbf d_i$ совпадают (если $\mathbf y_0-\mathbf x_0\in\operatorname{span}\{\mathbf d_1\}$) или параллельны; при непропорциональных пересекаются в точке или скрещиваются — смотрим, совместна ли система $\mathbf x_0+s\mathbf d_1=\mathbf y_0+t\mathbf d_2$.`,
      pitfalls: ['Одна и та же прямая имеет много параметрических уравнений: можно взять любую её точку и любой ненулевой кратный направляющий вектор.'],
    },
    {
      id: 'plane-equation',
      title: 'Уравнение плоскости по точке и нормальному вектору',
      source: 'Лекция 4, §19',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Плоскость через точку $M_0$ с радиус-вектором $\mathbf x_0=(x_0,y_0,z_0)^{\mathsf T}$ и нормалью $\mathbf n=(A,B,C)^{\mathsf T}\ne\mathbf 0$ задаётся уравнением
$$\langle\mathbf n,\mathbf x-\mathbf x_0\rangle=0,\quad\text{то есть}\quad A(x-x_0)+B(y-y_0)+C(z-z_0)=0,$$
или $Ax+By+Cz=D$, где $D=\langle\mathbf n,\mathbf x_0\rangle=Ax_0+By_0+Cz_0$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Точка лежит в плоскости, когда вектор из $M_0$ в неё перпендикулярен нормали; множество таких точек — $\mathbf x_0+\Pi_0$.`,
        steps: [
          { title: md`Плоскость через ноль`, body: md`Векторы, перпендикулярные $\mathbf n$, образуют $\Pi_0=\{\mathbf v\mid\langle\mathbf n,\mathbf v\rangle=0\}=\ker[A\ B\ C]$ — плоскость через начало координат: у уравнения одна главная и две свободные переменные, ФСР из двух непропорциональных векторов.` },
          { title: md`Сдвиг в $M_0$`, body: md`Плоскость через $M_0$ с нормалью $\mathbf n$ — это $\Pi_0$, сдвинутая на $\mathbf x_0$: $\Pi=\mathbf x_0+\Pi_0$. Точка $\mathbf x$ лежит в ней $\iff\mathbf x-\mathbf x_0\in\Pi_0\iff\langle\mathbf n,\mathbf x-\mathbf x_0\rangle=0$.` },
          { title: md`Раскрываем скобки`, body: md`По линейности скалярного произведения $\langle\mathbf n,\mathbf x\rangle=\langle\mathbf n,\mathbf x_0\rangle$, то есть $Ax+By+Cz=D$, $D=Ax_0+By_0+Cz_0$.` },
          { title: md`Проверка: $\mathbf n$ — нормаль`, body: md`Для любых $P,Q\in\Pi$: $\langle\mathbf n,\overrightarrow{PQ}\rangle=\langle\mathbf n,\mathbf x_Q\rangle-\langle\mathbf n,\mathbf x_P\rangle=D-D=0$. Это согласуется с формулой «частное решение плюс ядро»: $\operatorname{Sol}=\mathbf x_0+\ker[A\ B\ C]$.` },
        ],
      },
      uses: ['general-solution'],
      notes: md`**Пример.** Плоскость через $M_0=(1,-2,3)$ с нормалью $\mathbf n=(2,1,-1)^{\mathsf T}$: $2(x-1)+(y+2)-(z-3)=0$, то есть $2x+y-z=-3$. Проверка: $2\cdot1-2-3=-3$.

Плоскость через три точки $M_0,M_1,M_2$: нормаль — $\overrightarrow{M_0M_1}\times\overrightarrow{M_0M_2}$, дальше по этой формуле.`,
      pitfalls: [
        md`Знак $D$: $D=\langle\mathbf n,\mathbf x_0\rangle$, и уравнение $Ax+By+Cz=D$, а не $Ax+By+Cz+D=0$ — в этой записи знак противоположный.`,
        'Проверь ответ: координаты M₀ должны удовлетворять уравнению.',
      ],
    },
    {
      id: 'angle-planes',
      title: 'Формула угла между двумя плоскостями',
      source: 'Неделя 4, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Угол $\varphi\in[0,\pi/2]$ между плоскостями $A_1x+B_1y+C_1z=D_1$ и $A_2x+B_2y+C_2z=D_2$ с нормалями $\mathbf n_1,\mathbf n_2$ находится из
$$\cos\varphi=\frac{|\langle\mathbf n_1,\mathbf n_2\rangle|}{\|\mathbf n_1\|\,\|\mathbf n_2\|}=\frac{|A_1A_2+B_1B_2+C_1C_2|}{\sqrt{A_1^2+B_1^2+C_1^2}\,\sqrt{A_2^2+B_2^2+C_2^2}}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Угол между плоскостями равен углу между их нормалями (или дополняет его до $\pi$) — поворот на прямой угол переводит одну пару в другую; модуль выбирает острый угол.`,
        steps: [
          { title: md`Что такое угол между плоскостями`, body: md`Если плоскости пересекаются по прямой $\ell$, проведём плоскость, перпендикулярную $\ell$. Она пересекает плоскости по двум прямым; угол между ними (острый или прямой) — угол между плоскостями. Параллельные плоскости образуют угол $0$.` },
          { title: md`Нормали лежат в той же секущей плоскости`, body: md`$\mathbf n_1$ и $\mathbf n_2$ перпендикулярны $\ell$ (нормаль перпендикулярна любому вектору в своей плоскости), поэтому лежат в плоскости, перпендикулярной $\ell$. Там $\mathbf n_i$ перпендикулярен прямой-сечению $i$-й плоскости.` },
          { title: md`Угол между нормалями`, body: md`В одной плоскости поворот на $90^\circ$ переводит прямые-сечения в прямые нормалей, углы сохраняются. Значит, угол между прямыми $\mathbb R\mathbf n_1$ и $\mathbb R\mathbf n_2$ равен $\varphi$, а угол между векторами $\mathbf n_1,\mathbf n_2$ — это $\varphi$ или $\pi-\varphi$.` },
          { title: md`Модуль`, body: md`$\cos\angle(\mathbf n_1,\mathbf n_2)=\frac{\langle\mathbf n_1,\mathbf n_2\rangle}{\|\mathbf n_1\|\|\mathbf n_2\|}$, а $\cos(\pi-\varphi)=-\cos\varphi$. Острый угол даёт неотрицательный косинус, поэтому $\cos\varphi$ равен модулю этого выражения.` },
        ],
      },
      notes: md`**Пример.** $x+y=1$ и $y+z=2$: $\mathbf n_1=(1,1,0)$, $\mathbf n_2=(0,1,1)$, $\cos\varphi=\frac{1}{\sqrt2\sqrt2}=\frac12$, $\varphi=60^\circ$.

Плоскости перпендикулярны $\iff\langle\mathbf n_1,\mathbf n_2\rangle=0$; параллельны или совпадают $\iff$ нормали пропорциональны.`,
      pitfalls: [
        'Без модуля можно получить тупой угол: угол между плоскостями всегда от 0 до 90°.',
        md`Числа $D_1,D_2$ на угол не влияют — сдвиг плоскости угол не меняет.`,
      ],
    },
    {
      id: 'angle-line-plane',
      title: 'Формула угла между прямой и плоскостью',
      source: 'Неделя 4, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Угол $\psi\in[0,\pi/2]$ между прямой с направляющим вектором $\mathbf d$ и плоскостью с нормалью $\mathbf n$ находится из
$$\sin\psi=\frac{|\langle\mathbf d,\mathbf n\rangle|}{\|\mathbf d\|\,\|\mathbf n\|}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Угол между прямой и плоскостью дополняет до $\pi/2$ острый угол между прямой и нормалью.`,
        steps: [
          { title: md`Определение угла`, body: md`Угол между прямой и плоскостью — угол между прямой и её ортогональной проекцией на плоскость; если прямая перпендикулярна плоскости, угол $\pi/2$, если параллельна — $0$.` },
          { title: md`Связь с нормалью`, body: md`Направляющий вектор, его проекция на плоскость и нормаль лежат в одной плоскости, причём проекция перпендикулярна нормали. Поэтому острый угол $\theta$ между прямыми $\mathbb R\mathbf d$ и $\mathbb R\mathbf n$ равен $\pi/2-\psi$.` },
          { title: md`Через скалярное произведение`, body: md`$\cos\theta=\frac{|\langle\mathbf d,\mathbf n\rangle|}{\|\mathbf d\|\|\mathbf n\|}$ (модуль — берём острый угол между прямыми). Так как $\cos(\pi/2-\psi)=\sin\psi$, получаем формулу.` },
        ],
      },
      notes: md`**Пример.** Прямая $\mathbf x=(1,0,0)+t(1,1,0)$ и плоскость $z=5$: $\mathbf n=(0,0,1)$, $\langle\mathbf d,\mathbf n\rangle=0$, $\sin\psi=0$ — прямая параллельна плоскости.

Прямая перпендикулярна плоскости $\iff\mathbf d\parallel\mathbf n$; параллельна плоскости или лежит в ней $\iff\mathbf d\perp\mathbf n$.`,
      pitfalls: [
        md`Здесь **синус**, а не косинус: $\mathbf n$ перпендикулярна плоскости, а не лежит в ней.`,
        md`Нулевое скалярное произведение $\langle\mathbf d,\mathbf n\rangle$ значит, что прямая параллельна плоскости, а не перпендикулярна ей.`,
      ],
    },
    {
      id: 'distance-point-plane',
      title: 'Формула расстояния от точки до плоскости',
      source: 'Неделя 4, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Расстояние от точки $M=(x_1,y_1,z_1)$ до плоскости $\Pi:\ Ax+By+Cz=D$ равно
$$\rho(M,\Pi)=\frac{|Ax_1+By_1+Cz_1-D|}{\sqrt{A^2+B^2+C^2}}=\frac{|\langle\mathbf n,\mathbf x_1\rangle-D|}{\|\mathbf n\|}.$$`,
      },
      proof: {
        level: 'basic',
        idea: md`Опускаем перпендикуляр: идём из $M$ вдоль нормали, $\mathbf x_1+t\mathbf n$, и находим $t$, при котором попадаем в плоскость; расстояние — $|t|\,\|\mathbf n\|$.`,
        steps: [
          { title: md`Основание перпендикуляра`, body: md`Перпендикуляр из $M$ к $\Pi$ идёт вдоль $\mathbf n$: его основание — $H=\mathbf x_1+t\mathbf n$ для некоторого $t$. Условие $H\in\Pi$: $\langle\mathbf n,\mathbf x_1+t\mathbf n\rangle=D$, то есть $\langle\mathbf n,\mathbf x_1\rangle+t\|\mathbf n\|^2=D$, откуда $t=\frac{D-\langle\mathbf n,\mathbf x_1\rangle}{\|\mathbf n\|^2}$.` },
          { title: md`$H$ — ближайшая точка`, body: md`Для любой $P\in\Pi$ вектор $\overrightarrow{HP}$ лежит в плоскости и перпендикулярен $\mathbf n$, то есть $\overrightarrow{MH}$. По теореме Пифагора $\|\overrightarrow{MP}\|^2=\|\overrightarrow{MH}\|^2+\|\overrightarrow{HP}\|^2\ge\|\overrightarrow{MH}\|^2$.` },
          { title: md`Длина перпендикуляра`, body: md`$\rho=\|t\mathbf n\|=|t|\,\|\mathbf n\|=\frac{|\langle\mathbf n,\mathbf x_1\rangle-D|}{\|\mathbf n\|^2}\|\mathbf n\|=\frac{|\langle\mathbf n,\mathbf x_1\rangle-D|}{\|\mathbf n\|}$.` },
        ],
      },
      notes: md`**Пример.** $M=(1,2,3)$, $\Pi:\ 2x-y+2z=1$: $\rho=\frac{|2-2+6-1|}{\sqrt{4+1+4}}=\frac53$.

Расстояние между параллельными плоскостями $\langle\mathbf n,\mathbf x\rangle=D_1$ и $\langle\mathbf n,\mathbf x\rangle=D_2$ — $\frac{|D_1-D_2|}{\|\mathbf n\|}$. Знак $\langle\mathbf n,\mathbf x_1\rangle-D$ показывает, по какую сторону от плоскости лежит точка.`,
      pitfalls: [
        md`Не забудь разделить на длину нормали $\|\mathbf n\|$ — без этого получится не расстояние.`,
        md`Следи за знаком $D$: для уравнения $Ax+By+Cz+D=0$ в числителе $|Ax_1+By_1+Cz_1+D|$.`,
      ],
    },
    {
      id: 'planes-intersect',
      title: 'Две плоскости с непропорциональными нормалями пересекаются по прямой',
      source: 'Лекция 4, утверждения 19 и 20',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\Pi_1:\ \langle\mathbf n_1,\mathbf x\rangle=D_1$ и $\Pi_2:\ \langle\mathbf n_2,\mathbf x\rangle=D_2$. Если $\mathbf n_1,\mathbf n_2$ непропорциональны, то $\Pi_1\cap\Pi_2$ — прямая: множество решений системы
$$\begin{cases}A_1x+B_1y+C_1z=D_1\\A_2x+B_2y+C_2z=D_2\end{cases}$$
имеет вид $\mathbf x_0+\operatorname{span}\{\mathbf d\}$, $\mathbf d\ne\mathbf 0$.

Если же $\mathbf n_2=\lambda\mathbf n_1$, $\lambda\ne0$, то плоскости совпадают при $D_2=\lambda D_1$ и параллельны (не пересекаются) при $D_2\ne\lambda D_1$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Метод Гаусса для системы $2\times3$: две ненулевые строки, две главные и одна свободная переменная, противоречивой строки нет — решения $\mathbf x_0+\ker N$, где $\ker N$ одномерно.`,
        steps: [
          { title: md`Ступенчатый вид — две ненулевые строки`, body: md`Матрица $N=\begin{pmatrix}\mathbf n_1^{\mathsf T}\\\mathbf n_2^{\mathsf T}\end{pmatrix}$. Если бы после Гаусса вторая строка обнулилась, то $\mathbf n_2^{\mathsf T}$ было бы кратно $\mathbf n_1^{\mathsf T}$ (строка, которую вычитали, — кратная первой; ведь $\mathbf n_1\ne\mathbf 0$). Это противоречит непропорциональности. Значит, в ступенчатом виде обе строки ненулевые.` },
          { title: md`Совместность`, body: md`Обе строки матрицы коэффициентов в ступенчатом виде ненулевые, поэтому строки $[0\ 0\ 0\mid c]$, $c\ne0$, нет. Система совместна при любых $D_1,D_2$, есть частное решение $\mathbf x_0$.` },
          { title: md`Ядро одномерно`, body: md`Две ведущие позиции в трёх столбцах: две главные и одна свободная переменная. ФСР однородной системы состоит из одного ненулевого вектора $\mathbf d$, $\ker N=\operatorname{span}\{\mathbf d\}$.` },
          { title: md`Это прямая`, body: md`По формуле «частное плюс однородное» $\Pi_1\cap\Pi_2=\mathbf x_0+\operatorname{span}\{\mathbf d\}$ — прямая через $\mathbf x_0$ с направляющим вектором $\mathbf d$.` },
          { title: md`Пропорциональные нормали`, body: md`Если $\mathbf n_2=\lambda\mathbf n_1$, вычтем из второго уравнения первое, умноженное на $\lambda$: получим $0=D_2-\lambda D_1$. При $D_2=\lambda D_1$ второе уравнение лишнее — плоскости совпадают; иначе система несовместна — общих точек нет.` },
        ],
      },
      uses: ['general-solution'],
      notes: md`Направляющий вектор прямой пересечения перпендикулярен обеим нормалям, поэтому можно взять $\mathbf d=\mathbf n_1\times\mathbf n_2$.

**Пример.** $2x-y=2$, $x-z=2$: $\mathbf n_1=(2,-1,0)$, $\mathbf n_2=(1,0,-1)$ непропорциональны. Положив $x=1+t$: $y=2t$, $z=-1+t$, то есть прямая $(1,0,-1)+t(1,2,1)$.

Итог: две различные плоскости в пространстве либо параллельны, либо пересекаются по прямой.`,
      pitfalls: [
        'Нужно отдельно обосновать совместность: «две плоскости пересекаются» — это и есть то, что доказываем.',
        'Непропорциональность нормалей — про сами векторы n₁, n₂; числа D₁, D₂ здесь не участвуют.',
      ],
    },
  ],
};
