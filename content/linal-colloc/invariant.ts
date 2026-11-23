import { md, type Topic } from '../../src/content/schema';

// Лекция 12. Инвариантные подпространства и многочлены от оператора (лонгрид «Недели 1–13», §61–69;
// пункт «нед 12–13, сем» — без семинарского листа, стандартным доказательством)

export const invariant: Topic = {
  id: 'invariant',
  title: 'Инвариантные подпространства и многочлены от оператора',
  longread: 12,
  units: [
    {
      id: 'linear-operator',
      title: 'Линейный оператор, его матрица, след и определитель',
      source: 'Лекция 12, §61–62',
      definition: {
        level: 'basic',
        text: md`**Линейный оператор** на $\mathbb V$ — линейное отображение $\varphi:\mathbb V\to\mathbb V$; все они образуют $\operatorname{End}(\mathbb V)=\operatorname{Hom}(\mathbb V,\mathbb V)$.

**Матрица оператора** в базисе $\mathcal A$ — $T(\varphi,\mathcal A)=T(\varphi,\mathcal A,\mathcal A)$: один базис и для аргумента, и для значения. При замене базиса $T(\varphi,\mathcal A')=C^{-1}T(\varphi,\mathcal A)C$, где $C=C_{\mathcal A\leftarrow\mathcal A'}$.

**След** и **определитель** оператора: $\operatorname{tr}\varphi=\operatorname{tr}T(\varphi,\mathcal A)$, $\det\varphi=\det T(\varphi,\mathcal A)$ для любого базиса $\mathcal A$.`,
      },
      notes: md`Корректность определения следа и определителя — лёгкий вопрос «Независимость следа и определителя оператора от выбора базиса».`,
      pitfalls: [md`Для оператора базис один и тот же на входе и выходе; с двумя разными базисами матрица меняется как $C_1^{-1}TC_2$, и её след и определитель уже не инварианты.`],
    },
    {
      id: 'operator-poly',
      title: 'Многочлен от оператора',
      source: 'Лекция 12, §63',
      definition: {
        level: 'basic',
        text: md`Степени оператора: $\varphi^0=\operatorname{Id}_{\mathbb V}$, $\varphi^{j+1}=\varphi\circ\varphi^j$. Для $p(t)=a_0+a_1t+\dots+a_dt^d\in\mathbb F[t]$
$$p(\varphi)=a_0\operatorname{Id}_{\mathbb V}+a_1\varphi+\dots+a_d\varphi^d.$$`,
      },
      notes: md`Подстановка сохраняет операции: $(p+q)(\varphi)=p(\varphi)+q(\varphi)$, $(cp)(\varphi)=c\,p(\varphi)$, $(pq)(\varphi)=p(\varphi)q(\varphi)$. Поэтому два многочлена от одного оператора перестановочны.

В матрицах: если $A=T(\varphi,\mathcal A)$, то $T(p(\varphi),\mathcal A)=p(A)$.`,
      pitfalls: [md`Свободный член превращается в $a_0\operatorname{Id}$, а не в число $a_0$: $p(t)=t^2-1$ даёт $\varphi^2-\operatorname{Id}$.`],
    },
    {
      id: 'annihilating-poly',
      title: 'Аннулирующий многочлен',
      source: 'Лекция 12, §64, утверждение 71',
      definition: {
        level: 'basic',
        text: md`Ненулевой многочлен $p\in\mathbb F[t]$ — **аннулирующий** для оператора $\varphi$, если $p(\varphi)=0$, то есть $p(\varphi)(\mathbf x)=\mathbf 0$ для всех $\mathbf x\in\mathbb V$.`,
      },
      notes: md`**Существует всегда** (утверждение 71): $\dim\operatorname{End}(\mathbb V)=n^2$, поэтому $n^2+1$ операторов $\operatorname{Id},\varphi,\dots,\varphi^{n^2}$ линейно зависимы; нетривиальная нулевая комбинация — аннулирующий многочлен.

Примеры: для проектора — $t^2-t$, для нильпотентного с $\varphi^s=0$ — $t^s$, для поворота плоскости на $\pi/2$ — $t^2+1$.`,
      pitfalls: ['Аннулирующий многочлен у оператора не один: любое его кратное тоже аннулирует.'],
    },
    {
      id: 'minimal-poly',
      title: 'Минимальный многочлен',
      source: 'Лекция 12, §64',
      definition: {
        level: 'basic',
        text: md`**Минимальный многочлен** $m_\varphi(t)$ оператора $\varphi$ — аннулирующий многочлен наименьшей степени со старшим коэффициентом $1$.`,
      },
      notes: md`$\deg m_\varphi\ge1$ на ненулевом $\mathbb V$. Он единствен и делит любой аннулирующий: $p(\varphi)=0\iff m_\varphi\mid p$. Не зависит от базиса: у оператора и его матрицы минимальные многочлены совпадают.

Примеры: $m_0=t$, $m_{\operatorname{Id}}=t-1$; для дифференцирования на $\mathbb R[x]_{\le d}$ — $t^{d+1}$.`,
      pitfalls: ['Минимальный многочлен по определению нормирован (старший коэффициент 1): без этого он определён только с точностью до множителя.'],
    },
    {
      id: 'nilpotent-operator',
      title: 'Идемпотентный и нильпотентный оператор',
      source: 'Лекция 12, §64',
      definition: {
        level: 'basic',
        text: md`Оператор $\varphi$ — **идемпотент**, если $\varphi^2=\varphi$ (многочлен $t^2-t$ его аннулирует).

Оператор $\varphi$ **нильпотентен**, если $\varphi^s=0$ для некоторого целого $s\ge1$. **Степень (индекс) нильпотентности** — наименьшее такое $s$; тогда $m_\varphi(t)=t^s$.`,
      },
      notes: md`Идемпотенты — это проекторы. Дифференцирование на $\mathbb R[x]_{\le d}$ нильпотентно со степенью $d+1$. Степень нильпотентности не больше $\dim\mathbb V$.`,
      pitfalls: [md`$\varphi^s=0$ означает, что $\varphi^s(\mathbf x)=\mathbf 0$ для **всех** $\mathbf x$ с одним и тем же $s$.`],
    },
    {
      id: 'invariant-subspace',
      title: 'Инвариантное подпространство и ограничение оператора',
      source: 'Лекция 12, §65',
      definition: {
        level: 'basic',
        text: md`Подпространство $\mathbb U\subseteq\mathbb V$ **инвариантно** относительно $\varphi$, если $\varphi(\mathbb U)\subseteq\mathbb U$, то есть $\varphi(\mathbf u)\in\mathbb U$ для всех $\mathbf u\in\mathbb U$.

Тогда определено **ограничение** $\varphi|_{\mathbb U}:\mathbb U\to\mathbb U$, $\varphi|_{\mathbb U}(\mathbf u)=\varphi(\mathbf u)$.`,
      },
      notes: md`Всегда инвариантны $\{\mathbf 0\}$, $\mathbb V$, $\ker\varphi$, $\operatorname{Im}\varphi$. Для проверки достаточно базиса: $\varphi(\mathbf u_i)\in\mathbb U$ для базисных $\mathbf u_i$.

Инвариантное относительно $\varphi$ подпространство инвариантно и относительно любого $p(\varphi)$, причём $p(\varphi)|_{\mathbb U}=p(\varphi|_{\mathbb U})$ (утверждение 73).

**Примеры.** $\mathbb R[x]_{\le k}$ инвариантно относительно дифференцирования на $\mathbb R[x]_{\le d}$; ось $Oz$ и плоскость $Oxy$ инвариантны относительно поворота вокруг $Oz$.`,
      pitfalls: [md`Нужно включение $\varphi(\mathbb U)\subseteq\mathbb U$, а не равенство: у дифференцирования $D(\mathbb R[x]_{\le k})=\mathbb R[x]_{\le k-1}$.`],
    },
    {
      id: 'direct-sum-many',
      title: 'Прямая сумма нескольких подпространств',
      source: 'Лекция 12, §67',
      definition: {
        level: 'basic',
        text: md`**Сумма** подпространств $\mathbb U_1,\dots,\mathbb U_r\subseteq\mathbb V$ — множество векторов $\mathbf u_1+\dots+\mathbf u_r$, $\mathbf u_i\in\mathbb U_i$. Она **прямая**, если такое представление каждого вектора суммы единственно. Если ещё сумма — всё $\mathbb V$, пишут $\mathbb V=\mathbb U_1\oplus\dots\oplus\mathbb U_r$.`,
      },
      notes: md`Критерии прямоты: из $\mathbf u_1+\dots+\mathbf u_r=\mathbf 0$, $\mathbf u_i\in\mathbb U_i$, следует $\mathbf u_1=\dots=\mathbf u_r=\mathbf 0$; или $\mathbb U_i\cap\sum_{j\ne i}\mathbb U_j=\{\mathbf 0\}$ для каждого $i$.

Базисы слагаемых прямой суммы, выписанные подряд, — базис суммы; $\dim(\mathbb U_1\oplus\dots\oplus\mathbb U_r)=\sum\dim\mathbb U_i$.`,
      pitfalls: [md`Для трёх и более слагаемых попарно нулевых пересечений мало: три прямые в $\mathbb R^2$ пересекаются попарно по нулю, но сумма не прямая.`],
    },

    // ---------- Лёгкие вопросы ----------
    {
      id: 'invariant-block',
      title: 'Инвариантное подпространство и блочно-треугольный вид матрицы оператора',
      source: 'Лекция 12, утверждение 74',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbb U\subseteq\mathbb V$ инвариантно относительно $\varphi$, $\dim\mathbb U=k$. Если базис $\mathcal A=(\mathbf u_1,\dots,\mathbf u_k,\mathbf w_1,\dots,\mathbf w_{n-k})$ начинается с базиса $\mathbb U$, то
$$T(\varphi,\mathcal A)=\begin{pmatrix}B&C\\0&D\end{pmatrix},\qquad B=T(\varphi|_{\mathbb U},(\mathbf u_1,\dots,\mathbf u_k))\in\operatorname{Mat}_k.$$
Обратно, если матрица в базисе $\mathcal A$ имеет такой вид с блоком $B$ размера $k\times k$, то $\operatorname{span}\{\mathbf u_1,\dots,\mathbf u_k\}$ инвариантно.`,
      },
      proof: {
        level: 'basic',
        idea: md`Столбцы матрицы — координаты образов базисных векторов; образ $\mathbf u_i$ лежит в $\mathbb U$, поэтому у него нет координат вдоль $\mathbf w_j$ — это нулевой блок слева снизу.`,
        steps: [
          { title: md`Согласованный базис`, body: md`Случаи $\mathbb U=\{\mathbf 0\}$ и $\mathbb U=\mathbb V$ очевидны. Иначе берём базис $\mathbf u_1,\dots,\mathbf u_k$ пространства $\mathbb U$ и дополняем его до базиса $\mathbb V$ векторами $\mathbf w_1,\dots,\mathbf w_{n-k}$.` },
          { title: md`Первые $k$ столбцов`, body: md`$i$-й столбец $T(\varphi,\mathcal A)$ — координаты $\varphi(\mathbf u_i)$ в $\mathcal A$. По инвариантности $\varphi(\mathbf u_i)\in\mathbb U$, то есть $\varphi(\mathbf u_i)=b_{1i}\mathbf u_1+\dots+b_{ki}\mathbf u_k$; координаты при $\mathbf w_j$ нулевые. Отсюда нулевой блок в последних $n-k$ строках первых $k$ столбцов.` },
          { title: md`Блок $B$ — ограничение`, body: md`Числа $b_{1i},\dots,b_{ki}$ — координаты $\varphi|_{\mathbb U}(\mathbf u_i)$ в базисе $(\mathbf u_1,\dots,\mathbf u_k)$, так что $B=T(\varphi|_{\mathbb U},(\mathbf u_1,\dots,\mathbf u_k))$.` },
          { title: md`Обратно`, body: md`Если левый нижний блок нулевой, каждое $\varphi(\mathbf u_i)$ — комбинация $\mathbf u_1,\dots,\mathbf u_k$. По линейности $\varphi$ переводит любую их комбинацию в их оболочку — она инвариантна.` },
        ],
      },
      uses: ['extend-to-basis', 'map-matrix'],
      notes: md`**Пример.** У $A=\begin{pmatrix}a&b&c\\0&d&e\\0&f&g\end{pmatrix}$ прямая $\operatorname{span}\{\mathbf e_1\}$ инвариантна: $A\mathbf e_1=a\mathbf e_1$.

Дополнение $\mathbb W=\operatorname{span}\{\mathbf w_j\}$ инвариантным быть не обязано: блок $C$ — компоненты образов $\mathbf w_j$ вдоль $\mathbb U$. Поэтому $D$ нельзя без оговорок называть матрицей «$\varphi|_{\mathbb W}$». Если и $\mathbb W$ инвариантно, то $C=0$ — блочно-диагональный вид.

Следствие: $\det\varphi=\det B\det D$ и $\chi_\varphi=\chi_{\varphi|_{\mathbb U}}\cdot\det(tI-D)$.`,
      pitfalls: [
        'Нулевой блок — слева внизу, а не справа вверху: первые столбцы отвечают векторам из 𝕌, нижние строки — координатам вдоль добавленных векторов.',
        'Базис должен начинаться именно с базиса 𝕌; если векторы 𝕌 стоят в конце, нулевой блок окажется справа вверху.',
      ],
    },
    {
      id: 'trace-det-invariant',
      title: 'Независимость следа и определителя оператора от выбора базиса',
      source: 'Лекция 12, утверждение 70',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Для оператора $\varphi\in\operatorname{End}(\mathbb V)$ числа $\operatorname{tr}T(\varphi,\mathcal A)$ и $\det T(\varphi,\mathcal A)$ не зависят от базиса $\mathcal A$. Иначе: у подобных матриц равны след и определитель.`,
      },
      proof: {
        level: 'basic',
        idea: md`В другом базисе матрица оператора — $C^{-1}TC$; след не меняется благодаря $\operatorname{tr}(XY)=\operatorname{tr}(YX)$, определитель — благодаря мультипликативности.`,
        steps: [
          { title: md`Замена базиса`, body: md`Пусть $T=T(\varphi,\mathcal A)$, $\mathcal A'$ — другой базис, $C=C_{\mathcal A\leftarrow\mathcal A'}$. По формуле замены базиса $T(\varphi,\mathcal A')=C_{\mathcal A'\leftarrow\mathcal A}\,T\,C_{\mathcal A\leftarrow\mathcal A'}=C^{-1}TC$.` },
          { title: md`След`, body: md`$\operatorname{tr}(C^{-1}TC)=\operatorname{tr}\big((C^{-1}T)C\big)=\operatorname{tr}\big(C(C^{-1}T)\big)=\operatorname{tr}T$ по равенству $\operatorname{tr}(XY)=\operatorname{tr}(YX)$.` },
          { title: md`Определитель`, body: md`$\det(C^{-1}TC)=\det C^{-1}\det T\det C=\det T$, так как $\det C^{-1}\det C=\det(C^{-1}C)=1$.` },
        ],
      },
      uses: ['change-basis-map', 'trace-ab', 'det-product'],
      notes: md`Поэтому корректно определены $\operatorname{tr}\varphi$ и $\det\varphi$ — и характеристический многочлен $\det(t\operatorname{Id}-\varphi)$.

У диагонализуемого оператора $\operatorname{tr}\varphi=\sum\lambda_i d_i$, $\det\varphi=\prod\lambda_i^{d_i}$ — по собственному базису.`,
      pitfalls: [
        md`$\operatorname{tr}(XYZ)=\operatorname{tr}(YXZ)$ в общем случае неверно; переставлять можно только циклически: $\operatorname{tr}(C^{-1}TC)=\operatorname{tr}(CC^{-1}T)$.`,
        'Для отображения 𝕍 → 𝕎 с двумя независимыми базисами утверждение неверно: там C₁⁻¹TC₂ с разными C₁, C₂.',
      ],
    },
    {
      id: 'ker-im-invariant',
      title: 'Ядро и образ оператора инвариантны относительно него',
      source: 'Лекция 12, §65',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Для любого $\varphi\in\operatorname{End}(\mathbb V)$ подпространства $\ker\varphi$ и $\operatorname{Im}\varphi$ инвариантны относительно $\varphi$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Образ вектора ядра — нуль, а он в ядре; образ любого вектора, тем более вектора из образа, лежит в образе.`,
        steps: [
          { title: md`Это подпространства`, body: md`Ядро и образ линейного отображения — подпространства $\mathbb V$ (оператор действует из $\mathbb V$ в $\mathbb V$).` },
          { title: md`Ядро`, body: md`Пусть $\mathbf x\in\ker\varphi$. Тогда $\varphi(\mathbf x)=\mathbf 0\in\ker\varphi$.` },
          { title: md`Образ`, body: md`Пусть $\mathbf y\in\operatorname{Im}\varphi$. Тогда $\varphi(\mathbf y)$ — образ вектора $\mathbf y\in\mathbb V$, то есть лежит в $\operatorname{Im}\varphi$.` },
        ],
      },
      uses: ['ker-im-subspaces'],
      notes: md`**Обобщение.** Если $\psi\varphi=\varphi\psi$, то $\ker\psi$ и $\operatorname{Im}\psi$ инвариантны относительно $\varphi$: $\psi(\varphi\mathbf x)=\varphi(\psi\mathbf x)=\mathbf 0$ при $\mathbf x\in\ker\psi$, и $\varphi(\psi\mathbf y)=\psi(\varphi\mathbf y)\in\operatorname{Im}\psi$. В частности, $\ker p(\varphi)$ и $\operatorname{Im}p(\varphi)$ инвариантны для любого многочлена $p$ — так собственные подпространства $\ker(\varphi-\lambda\operatorname{Id})$ инвариантны.

**Пример.** Для $A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$: $\ker A=\operatorname{Im}A=\operatorname{span}\{\mathbf e_1\}$ — инвариантная прямая. Но ядро и образ не обязаны давать прямую сумму.`,
      pitfalls: ['Для отображения 𝕍 → 𝕎 при 𝕍 ≠ 𝕎 вопрос не имеет смысла: образ лежит в другом пространстве.'],
    },

    // ---------- Содержательные вопросы ----------
    {
      id: 'invariant-direct-sum',
      title: 'Прямая сумма инвариантных подпространств и блочно-диагональный вид матрицы оператора',
      source: 'Лекция 12, утверждение 76 и §67',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbb V=\mathbb U_1\oplus\dots\oplus\mathbb U_r$ и каждое $\mathbb U_i$ инвариантно относительно $\varphi$. Пусть $\mathcal A_i$ — базис $\mathbb U_i$, а $\mathcal A$ — эти базисы, выписанные подряд. Тогда $\mathcal A$ — базис $\mathbb V$ и
$$T(\varphi,\mathcal A)=\begin{pmatrix}T(\varphi_1,\mathcal A_1)&&0\\&\ddots&\\0&&T(\varphi_r,\mathcal A_r)\end{pmatrix},\qquad\varphi_i=\varphi|_{\mathbb U_i}.$$
Обратно, блочно-диагональный вид означает, что оболочки соответствующих частей базиса инвариантны.`,
      },
      proof: {
        level: 'basic',
        idea: md`Сначала: базисы слагаемых прямой суммы вместе — базис. Затем: образ базисного вектора из $\mathbb U_i$ лежит в $\mathbb U_i$, поэтому в его столбце ненулевые координаты только в $i$-м блоке.`,
        steps: [
          { title: md`$\mathcal A$ порождает`, body: md`Любой $\mathbf x=\mathbf u_1+\dots+\mathbf u_r$, $\mathbf u_i\in\mathbb U_i$, а каждый $\mathbf u_i$ — комбинация векторов $\mathcal A_i$.` },
          { title: md`$\mathcal A$ независима`, body: md`Пусть комбинация векторов $\mathcal A$ равна нулю. Сгруппируем по слагаемым: $\mathbf v_1+\dots+\mathbf v_r=\mathbf 0$, $\mathbf v_i\in\mathbb U_i$ — часть комбинации из векторов $\mathcal A_i$. По прямоте суммы все $\mathbf v_i=\mathbf 0$, а по независимости $\mathcal A_i$ все коэффициенты нули.` },
          { title: md`Столбцы блока $i$`, body: md`Пусть $\mathbf a$ — вектор из $\mathcal A_i$. По инвариантности $\varphi(\mathbf a)\in\mathbb U_i$, то есть $\varphi(\mathbf a)$ — комбинация только векторов $\mathcal A_i$. В его столбце координаты вне строк $i$-го блока нулевые.` },
          { title: md`Диагональные блоки`, body: md`Ненулевые координаты $\varphi(\mathbf a)$ — его координаты в $\mathcal A_i$, то есть столбец матрицы $\varphi_i=\varphi|_{\mathbb U_i}$ в базисе $\mathcal A_i$. Все внедиагональные блоки нулевые.` },
          { title: md`Обратно`, body: md`Если матрица блочно-диагональна, образ каждого вектора из $\mathcal A_i$ — комбинация векторов $\mathcal A_i$, так что $\operatorname{span}\mathcal A_i$ инвариантна.` },
        ],
      },
      uses: ['invariant-block', 'map-matrix'],
      notes: md`**Действие по компонентам.** Для $\mathbf x=\mathbf u_1+\dots+\mathbf u_r$: $\varphi(\mathbf x)=\varphi_1(\mathbf u_1)+\dots+\varphi_r(\mathbf u_r)$ — оператор «распадается» на независимые операторы на слагаемых.

Следствия: $\det\varphi=\prod\det\varphi_i$, $\operatorname{tr}\varphi=\sum\operatorname{tr}\varphi_i$, $\chi_\varphi=\prod\chi_{\varphi_i}$.

**Главный пример** — диагонализуемый оператор: $\mathbb V=\bigoplus E_\varphi(\lambda_i)$, $\varphi_i=\lambda_i\operatorname{Id}$, матрица диагональна.`,
      pitfalls: [
        'Нужна инвариантность каждого слагаемого; одной прямой суммы мало — иначе появятся внедиагональные блоки.',
        'Для трёх и более слагаемых прямота суммы — не «попарно нулевые пересечения».',
      ],
    },
    {
      id: 'projector-formula',
      title: 'Формула проектора P = B(AB)⁻¹A',
      source: 'Неделя 12–13, семинар',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbb F^n=\mathbb U\oplus\mathbb L$, $\dim\mathbb U=k$. Пусть столбцы $B\in\operatorname{Mat}_{n\times k}(\mathbb F)$ — базис $\mathbb U$ (то есть $\operatorname{Im}B=\mathbb U$, $\operatorname{rk}B=k$), а $A\in\operatorname{Mat}_{k\times n}(\mathbb F)$ задаёт $\mathbb L$ уравнениями: $\ker A=\mathbb L$. Тогда $AB$ обратима и
$$P=B(AB)^{-1}A$$
— матрица проектора на $\mathbb U$ вдоль $\mathbb L$.`,
      },
      proof: {
        level: 'basic',
        idea: md`$P$ тождественна на $\mathbb U=\operatorname{Im}B$ и обнуляет $\mathbb L=\ker A$; оператор с такими свойствами — и есть проектор на $\mathbb U$ вдоль $\mathbb L$.`,
        steps: [
          { title: md`$AB$ обратима`, body: md`$AB$ — квадратная $k\times k$. Если $AB\mathbf c=\mathbf 0$, то вектор $B\mathbf c$ лежит и в $\operatorname{Im}B=\mathbb U$, и в $\ker A=\mathbb L$; сумма прямая, значит, $B\mathbf c=\mathbf 0$, а столбцы $B$ независимы — $\mathbf c=\mathbf 0$. Ядро нулевое — $AB$ обратима.` },
          { title: md`На $\mathbb U$ — тождественно`, body: md`$\mathbf u\in\mathbb U$ записывается как $\mathbf u=B\mathbf c$. Тогда $P\mathbf u=B(AB)^{-1}(AB)\mathbf c=B\mathbf c=\mathbf u$.` },
          { title: md`На $\mathbb L$ — ноль`, body: md`Если $\mathbf l\in\mathbb L=\ker A$, то $P\mathbf l=B(AB)^{-1}A\mathbf l=\mathbf 0$.` },
          { title: md`Это проектор на $\mathbb U$ вдоль $\mathbb L$`, body: md`Для $\mathbf x=\mathbf u+\mathbf l$: $P\mathbf x=P\mathbf u+P\mathbf l=\mathbf u$. Это определение проектора на $\mathbb U$ вдоль $\mathbb L$; оператор определяется значениями на слагаемых однозначно.` },
          { title: md`Проверка $P^2=P$`, body: md`Напрямую: $P^2=B(AB)^{-1}(AB)(AB)^{-1}A=B(AB)^{-1}A=P$; $\operatorname{Im}P=\mathbb U$, $\ker P=\mathbb L$.` },
        ],
      },
      uses: ['projector-decomposition', 'invertibility-criteria'],
      notes: md`**Размеры.** $\dim\mathbb L=n-k$, поэтому $A$ — $k$ уравнений ранга $k$; $AB$ — $k\times k$.

**Проекция на прямую вдоль плоскости** ($k=1$): $\mathbb U=\operatorname{span}\{\mathbf b\}$, $\mathbb L=\{\mathbf x\mid\mathbf a^{\mathsf T}\mathbf x=0\}$, $\mathbf a^{\mathsf T}\mathbf b\ne0$: $P=\dfrac{\mathbf b\mathbf a^{\mathsf T}}{\mathbf a^{\mathsf T}\mathbf b}$.

**Ортогональная проекция** над $\mathbb R$: $\mathbb L=\mathbb U^\perp=\ker B^{\mathsf T}$, $A=B^{\mathsf T}$: $P=B(B^{\mathsf T}B)^{-1}B^{\mathsf T}$.

**Пример.** $\mathbf b=(1,1)^{\mathsf T}$, $\mathbb L$: $x_1=0$, $\mathbf a=(1,0)^{\mathsf T}$: $P=\begin{pmatrix}1&0\\1&0\end{pmatrix}$, $P^2=P$, $P\mathbf b=\mathbf b$, $P\mathbf e_2=\mathbf 0$.`,
      pitfalls: [
        md`Нельзя «сократить»: $B(AB)^{-1}A\ne BB^{-1}A^{-1}A$ — матрицы $A$ и $B$ неквадратные и необратимы.`,
        md`Обратимость $AB$ — следствие $\mathbb U\cap\mathbb L=\{\mathbf 0\}$, её надо доказать.`,
      ],
    },
    {
      id: 'minimal-divides',
      title: 'Любой аннулирующий многочлен оператора делится на минимальный',
      source: 'Лекция 12, утверждения 71 и 72',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $m_\varphi$ — минимальный многочлен оператора $\varphi$ на конечномерном $\mathbb V$. Тогда для $p\in\mathbb F[t]$
$$p(\varphi)=0\iff m_\varphi\mid p.$$
В частности, минимальный многочлен единствен.`,
      },
      proof: {
        level: 'basic',
        idea: md`Делим $p$ на $m_\varphi$ с остатком и подставляем $\varphi$: остаток аннулирует $\varphi$, а степень у него меньше минимальной — значит, он нулевой.`,
        steps: [
          { title: md`$m_\varphi$ существует`, body: md`$\dim\operatorname{End}(\mathbb V)=n^2$, поэтому $\operatorname{Id},\varphi,\dots,\varphi^{n^2}$ зависимы: аннулирующие многочлены есть. Берём из них многочлен наименьшей степени и делим на старший коэффициент.` },
          { title: md`Деление с остатком`, body: md`Пусть $p(\varphi)=0$. Запишем $p=q\,m_\varphi+r$, где $r=0$ или $\deg r<\deg m_\varphi$.` },
          { title: md`Подставляем оператор`, body: md`Подстановка сохраняет сумму и произведение: $0=p(\varphi)=q(\varphi)\,m_\varphi(\varphi)+r(\varphi)=r(\varphi)$.` },
          { title: md`Остаток нулевой`, body: md`Если $r\ne0$, это аннулирующий многочлен степени меньше $\deg m_\varphi$ — противоречие с минимальностью. Значит, $r=0$ и $m_\varphi\mid p$.` },
          { title: md`Обратно`, body: md`Если $p=q\,m_\varphi$, то $p(\varphi)=q(\varphi)m_\varphi(\varphi)=q(\varphi)\cdot0=0$.` },
          { title: md`Единственность`, body: md`Два нормированных аннулирующих многочлена минимальной степени делят друг друга, значит, отличаются множителем-константой; старшие коэффициенты $1$ — множитель $1$.` },
        ],
      },
      uses: ['hom-mat'],
      notes: md`**Нильпотентный оператор.** $t^s$ аннулирует, поэтому $m_\varphi\mid t^s$, а нормированные делители $t^s$ — степени $t$: $m_\varphi=t^{s_0}$, где $s_0$ — степень нильпотентности.

**Проектор.** $m_P\mid t^2-t=t(t-1)$: $m_P=t$ ($P=0$), $t-1$ ($P=\operatorname{Id}$) или $t^2-t$.

Минимальный многочлен не зависит от базиса: условие $p(\varphi)=0$ равносильно $p(A)=0$ для матрицы $A$ оператора в любом базисе.`,
      pitfalls: [
        'Деление с остатком и подстановка произведения (qm)(φ) = q(φ)m(φ) — ключевые шаги, их надо назвать.',
        'Существование минимального многочлена тоже требует обоснования: на бесконечномерном пространстве аннулирующего многочлена может не быть.',
      ],
    },
  ],
};
