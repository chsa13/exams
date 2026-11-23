import { md, type Topic } from '../../src/content/schema';

// Лекция 13. Собственные значения и диагонализуемость (лонгрид «Недели 1–13», §70–73;
// пункты «нед 12–13, сем» — без семинарского листа, стандартными доказательствами)

export const eigen: Topic = {
  id: 'eigen',
  title: 'Собственные значения и диагонализуемость',
  longread: 13,
  units: [
    {
      id: 'eigenvector',
      title: 'Собственный вектор и собственное значение',
      source: 'Лекция 13, §70',
      definition: {
        level: 'basic',
        text: md`Ненулевой вектор $\mathbf v\in\mathbb V$ — **собственный вектор** оператора $\varphi$, если $\varphi(\mathbf v)=\lambda\mathbf v$ для некоторого $\lambda\in\mathbb F$; число $\lambda$ — соответствующее **собственное значение**.`,
      },
      notes: md`Равносильно: прямая $\operatorname{span}\{\mathbf v\}$ инвариантна относительно $\varphi$.

$0$ — собственное значение $\iff\ker\varphi\ne\{\mathbf 0\}\iff\varphi$ необратим.

**Пример.** Перестановка координат $\begin{pmatrix}0&1\\1&0\end{pmatrix}$: $(1,1)^{\mathsf T}$ — собственный со значением $1$, $(1,-1)^{\mathsf T}$ — со значением $-1$.`,
      pitfalls: [md`Нулевой вектор собственным не бывает: $\varphi(\mathbf 0)=\lambda\mathbf 0$ при любом $\lambda$. А собственное значение $0$ — бывает.`],
    },
    {
      id: 'eigenspace',
      title: 'Собственное подпространство и спектр',
      source: 'Лекция 13, §70',
      definition: {
        level: 'basic',
        text: md`Для $\lambda\in\mathbb F$: $E_\varphi(\lambda)=\ker(\varphi-\lambda\operatorname{Id}_{\mathbb V})$. Если $E_\varphi(\lambda)\ne\{\mathbf 0\}$, то $\lambda$ — собственное значение, а $E_\varphi(\lambda)$ — **собственное подпространство**: его ненулевые векторы — все собственные векторы со значением $\lambda$.

**Спектр** $\operatorname{Spec}(\varphi)$ — множество всех собственных значений.`,
      },
      notes: md`$E_\varphi(\lambda)$ инвариантно, и $\varphi|_{E_\varphi(\lambda)}=\lambda\operatorname{Id}$. Для любого многочлена $p(\varphi)\mathbf v=p(\lambda)\mathbf v$ при $\mathbf v\in E_\varphi(\lambda)$.

**Спектр зависит от поля.** Поворот на $\pi/2$, $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$: над $\mathbb R$ спектр пуст, над $\mathbb C$ — $\{i,-i\}$.`,
      pitfalls: ['Собственное подпространство содержит нулевой вектор, хотя он не собственный: это ядро, а не множество собственных векторов.'],
    },
    {
      id: 'char-poly',
      title: 'Характеристический многочлен',
      source: 'Лекция 13, §73',
      definition: {
        level: 'basic',
        text: md`**Характеристический многочлен** оператора $\varphi$ — $\chi_\varphi(t)=\det(tI_n-A)$, где $A=T(\varphi,\mathcal A)$ в любом базисе. Это многочлен степени $n=\dim\mathbb V$ со старшим коэффициентом $1$; у матрицы — та же формула.`,
      },
      notes: md`Не зависит от базиса: при каждом $t$ это $\det(t\operatorname{Id}-\varphi)$, а определитель оператора от базиса не зависит.

Коэффициенты: при $t^{n-1}$ — $-\operatorname{tr}A$, свободный член — $(-1)^n\det A$. Для $2\times2$: $\chi_A(t)=t^2-(\operatorname{tr}A)t+\det A$.

Корни $\chi_\varphi$ в $\mathbb F$ — ровно собственные значения; множества корней $\chi_\varphi$ и $m_\varphi$ в $\mathbb F$ совпадают (кратности — нет).`,
      pitfalls: [md`$\det(tI-A)$ и $\det(A-tI)$ отличаются множителем $(-1)^n$: корни те же, но нормирован только первый.`],
    },
    {
      id: 'multiplicities',
      title: 'Алгебраическая и геометрическая кратность',
      source: 'Лекция 13, §73',
      definition: {
        level: 'basic',
        text: md`Пусть $\lambda$ — собственное значение $\varphi$. **Алгебраическая кратность** $a_\lambda$ — показатель, с которым $t-\lambda$ входит в $\chi_\varphi$: $\chi_\varphi(t)=(t-\lambda)^{a_\lambda}q(t)$, $q(\lambda)\ne0$. **Геометрическая кратность** — $g_\lambda=\dim E_\varphi(\lambda)$.`,
      },
      notes: md`Всегда $1\le g_\lambda\le a_\lambda$. Пример: у $I_2$ $a_1=g_1=2$; у $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ тот же $\chi=(t-1)^2$, $a_1=2$, но $g_1=1$.

$g_\lambda=n-\operatorname{rk}(A-\lambda I)$ — по теореме о размерностях.`,
      pitfalls: ['Алгебраическая кратность — про многочлен, геометрическая — про размерность подпространства; совпадать они не обязаны.'],
    },
    {
      id: 'diagonalizable',
      title: 'Диагонализуемый оператор',
      source: 'Лекция 13, §72, утверждение 79',
      definition: {
        level: 'basic',
        text: md`Оператор $\varphi$ **диагонализуем** над $\mathbb F$, если $\mathbb V$ — прямая сумма его собственных подпространств: $\mathbb V=E_\varphi(\lambda_1)\oplus\dots\oplus E_\varphi(\lambda_r)$.

Равносильно (утверждение 79): существует базис, в котором матрица $\varphi$ диагональна, то есть базис из собственных векторов. Ещё равносильно: $\sum_i\dim E_\varphi(\lambda_i)=n$.`,
      },
      notes: md`Если $S$ — матрица перехода к собственному базису (в столбцах — собственные векторы), то $S^{-1}AS=D$ диагональна и $A=SDS^{-1}$. Тогда $A^k=SD^kS^{-1}$ и $p(\varphi)=\sum p(\lambda_i)P_i$, где $P_i$ — проекторы на $E_\varphi(\lambda_i)$ вдоль остальных.

Проектор диагонализуем ($\mathbb V=\operatorname{Im}P\oplus\ker P$), $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ — нет, поворот на $\pi/2$ — над $\mathbb C$ да, над $\mathbb R$ нет.`,
      pitfalls: ['Диагонализуемость зависит от поля: одна и та же вещественная матрица может быть диагонализуема над ℂ, но не над ℝ.'],
    },

    // ---------- Лёгкие вопросы ----------
    {
      id: 'eigen-char-roots',
      title: 'Собственные значения оператора — корни его характеристического многочлена',
      source: 'Лекция 13, теорема 1',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Число $\lambda\in\mathbb F$ — собственное значение оператора $\varphi$ тогда и только тогда, когда $\chi_\varphi(\lambda)=0$. Иначе: $\operatorname{Spec}(\varphi)$ — множество корней $\chi_\varphi$ в $\mathbb F$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Собственный вектор — ненулевое решение $(A-\lambda I)\mathbf v=\mathbf 0$; оно есть ровно тогда, когда матрица $A-\lambda I$ необратима, то есть её определитель ноль.`,
        steps: [
          { title: md`В координатах`, body: md`Пусть $A=T(\varphi,\mathcal A)$. Равенство $\varphi(\mathbf v)=\lambda\mathbf v$ в координатах — $A[\mathbf v]=\lambda[\mathbf v]$, то есть $(A-\lambda I_n)[\mathbf v]=\mathbf 0$; $\mathbf v\ne\mathbf 0\iff[\mathbf v]\ne\mathbf 0$.` },
          { title: md`Ненулевое ядро`, body: md`$\lambda$ собственное $\iff\ker(A-\lambda I_n)\ne\{\mathbf 0\}\iff A-\lambda I_n$ необратима (критерий обратимости квадратной матрицы).` },
          { title: md`Через определитель`, body: md`Необратима $\iff\det(A-\lambda I_n)=0\iff\det(\lambda I_n-A)=0$ (множитель $(-1)^n$), то есть $\chi_\varphi(\lambda)=0$.` },
        ],
      },
      uses: ['invertibility-criteria', 'det-invertible', 'map-matrix'],
      notes: md`**Пример.** $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$: $\chi_A=t^2-4t+3=(t-1)(t-3)$, собственные значения $1$ и $3$, векторы $(1,-1)^{\mathsf T}$ и $(1,1)^{\mathsf T}$.

Важны корни именно в $\mathbb F$: у $t^2+1$ над $\mathbb R$ корней нет — собственных значений нет.

Корректность: $\chi_\varphi$ не зависит от базиса, потому что $\det(tI-C^{-1}AC)=\det\big(C^{-1}(tI-A)C\big)=\det(tI-A)$.`,
      pitfalls: [md`Собственные векторы ищут как ненулевые решения $(A-\lambda I)\mathbf x=\mathbf 0$ — после того, как нашли $\lambda$; определитель этой системы равен нулю, и это правильно.`],
    },
    {
      id: 'eigen-annihilating',
      title: 'Любое собственное значение оператора — корень любого его аннулирующего многочлена',
      source: 'Лекция 13, утверждение 77',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если $p(\varphi)=0$, то $p(\lambda)=0$ для каждого $\lambda\in\operatorname{Spec}(\varphi)$.`,
      },
      proof: {
        level: 'basic',
        idea: md`На собственном векторе многочлен от оператора действует умножением на $p(\lambda)$; а аннулирующий многочлен даёт нуль.`,
        steps: [
          { title: md`Степени на собственном векторе`, body: md`Пусть $\varphi(\mathbf v)=\lambda\mathbf v$, $\mathbf v\ne\mathbf 0$. По индукции $\varphi^k(\mathbf v)=\varphi(\lambda^{k-1}\mathbf v)=\lambda^k\mathbf v$; и $\varphi^0(\mathbf v)=\mathbf v$.` },
          { title: md`Многочлен на собственном векторе`, body: md`Для $p=\sum a_kt^k$: $p(\varphi)(\mathbf v)=\sum a_k\varphi^k(\mathbf v)=\sum a_k\lambda^k\mathbf v=p(\lambda)\mathbf v$.` },
          { title: md`Вывод`, body: md`$\mathbf 0=p(\varphi)(\mathbf v)=p(\lambda)\mathbf v$, а $\mathbf v\ne\mathbf 0$, значит, $p(\lambda)=0$.` },
        ],
      },
      notes: md`**Применения.** Проектор: $t^2-t$ аннулирует, $\operatorname{Spec}P\subseteq\{0,1\}$. Нильпотентный: $t^s$, $\operatorname{Spec}\subseteq\{0\}$. Инволюция $\varphi^2=\operatorname{Id}$: $\operatorname{Spec}\subseteq\{1,-1\}$.

Обратное неверно: не каждый корень аннулирующего многочлена — собственное значение ($t^2-t$ аннулирует $\operatorname{Id}$, но $0\notin\operatorname{Spec}\operatorname{Id}$). Для **минимального** многочлена — верно: его корни в $\mathbb F$ и есть спектр (утверждение 80).`,
      pitfalls: ['Это включение Spec(φ) ⊆ {корни p}, а не равенство.'],
    },
    {
      id: 'spectrum-nilpotent-projector',
      title: 'Спектр нильпотентного оператора и проектора',
      source: 'Лекция 13, §70; неделя 12–13, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbb V\ne\{\mathbf 0\}$.
1. Если $\varphi$ нильпотентен, то $\operatorname{Spec}(\varphi)=\{0\}$.
2. Если $P$ — проектор ($P^2=P$), то $\operatorname{Spec}(P)\subseteq\{0,1\}$, причём $E_P(1)=\operatorname{Im}P$, $E_P(0)=\ker P$: $1\in\operatorname{Spec}P\iff P\ne0$, $0\in\operatorname{Spec}P\iff P\ne\operatorname{Id}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Аннулирующие многочлены $t^s$ и $t^2-t$ ограничивают спектр; что значения действительно достигаются, показываем явным вектором.`,
        steps: [
          { title: md`Нильпотентный: только $0$`, body: md`$\varphi^s=0$, многочлен $t^s$ аннулирует, его единственный корень $0$. Значит, $\operatorname{Spec}\varphi\subseteq\{0\}$.` },
          { title: md`Нильпотентный: $0$ есть`, body: md`Возьмём $\mathbf v\ne\mathbf 0$ и последний ненулевой вектор в цепочке $\mathbf v,\varphi(\mathbf v),\varphi^2(\mathbf v),\dots$ (цепочка обрывается: $\varphi^s(\mathbf v)=\mathbf 0$). Его образ — ноль, он собственный со значением $0$.` },
          { title: md`Проектор: только $0$ и $1$`, body: md`$t^2-t=t(t-1)$ аннулирует $P$, поэтому $\operatorname{Spec}P\subseteq\{0,1\}$.` },
          { title: md`Проектор: собственные подпространства`, body: md`$E_P(0)=\ker P$ по определению. Если $\mathbf y=P\mathbf x\in\operatorname{Im}P$, то $P\mathbf y=P^2\mathbf x=P\mathbf x=\mathbf y$; обратно, $P\mathbf y=\mathbf y$ значит $\mathbf y\in\operatorname{Im}P$. Итак, $E_P(1)=\operatorname{Im}P$.` },
          { title: md`Когда значения есть`, body: md`$1\in\operatorname{Spec}P\iff\operatorname{Im}P\ne\{\mathbf 0\}\iff P\ne0$; $0\in\operatorname{Spec}P\iff\ker P\ne\{\mathbf 0\}\iff P\ne\operatorname{Id}$ (из $\ker P=0$ и $P^2=P$ следует $P=\operatorname{Id}$: $P(P\mathbf x-\mathbf x)=\mathbf 0$).` },
        ],
      },
      uses: ['eigen-annihilating', 'projector-decomposition'],
      notes: md`**Следствия.** Нильпотентный оператор необратим и, если он ненулевой, не диагонализуем: диагональная матрица с нулями на диагонали — нулевая. $\chi_\varphi=t^n$, $\operatorname{tr}\varphi=0$.

Проектор всегда диагонализуем: $\mathbb V=\operatorname{Im}P\oplus\ker P$, матрица в согласованном базисе — $\operatorname{diag}(1,\dots,1,0,\dots,0)$, поэтому $\operatorname{tr}P=\operatorname{rk}P$.`,
      pitfalls: [
        md`У нильпотентного спектр $\{0\}$, а не пустой: собственный вектор со значением $0$ есть всегда (на $\mathbb V\ne\{\mathbf 0\}$).`,
        md`$\operatorname{Spec}P$ может быть $\{0\}$ или $\{1\}$, если $P=0$ или $P=\operatorname{Id}$.`,
      ],
    },

    // ---------- Содержательные вопросы ----------
    {
      id: 'eigenspaces-direct',
      title: 'Сумма собственных подпространств для попарно различных собственных значений прямая',
      source: 'Лекция 13, утверждение 78',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Если $\lambda_1,\dots,\lambda_r$ — попарно различные собственные значения $\varphi$, то сумма $E_\varphi(\lambda_1)+\dots+E_\varphi(\lambda_r)$ прямая. В частности, собственные векторы с попарно различными собственными значениями линейно независимы.`,
      },
      proof: {
        level: 'basic',
        idea: md`Индукция по $r$: применяем к нулевой сумме $\varphi-\lambda_r\operatorname{Id}$ — последнее слагаемое исчезает, остальные умножаются на ненулевые $\lambda_j-\lambda_r$.`,
        steps: [
          { title: md`Что доказать`, body: md`По критерию прямоты: из $\mathbf v_1+\dots+\mathbf v_r=\mathbf 0$, $\mathbf v_j\in E_\varphi(\lambda_j)$, следует $\mathbf v_1=\dots=\mathbf v_r=\mathbf 0$.` },
          { title: md`База`, body: md`При $r=1$: $\mathbf v_1=\mathbf 0$ — сразу.` },
          { title: md`Применяем $\varphi-\lambda_r\operatorname{Id}$`, body: md`$(\varphi-\lambda_r\operatorname{Id})\mathbf v_j=(\lambda_j-\lambda_r)\mathbf v_j$. Получаем $(\lambda_1-\lambda_r)\mathbf v_1+\dots+(\lambda_{r-1}-\lambda_r)\mathbf v_{r-1}=\mathbf 0$ — слагаемое $\mathbf v_r$ пропало.` },
          { title: md`Предположение индукции`, body: md`$(\lambda_j-\lambda_r)\mathbf v_j\in E_\varphi(\lambda_j)$, значений $r-1$, и они различны. По предположению все $(\lambda_j-\lambda_r)\mathbf v_j=\mathbf 0$, а $\lambda_j\ne\lambda_r$ — значит, $\mathbf v_1=\dots=\mathbf v_{r-1}=\mathbf 0$.` },
          { title: md`Последнее слагаемое`, body: md`Из исходного равенства $\mathbf v_r=\mathbf 0$.` },
          { title: md`Следствие о векторах`, body: md`Если $\sum c_j\mathbf v_j=\mathbf 0$ для собственных $\mathbf v_j$ с разными $\lambda_j$, то $c_j\mathbf v_j\in E_\varphi(\lambda_j)$, и по прямоте все $c_j\mathbf v_j=\mathbf 0$, то есть $c_j=0$.` },
        ],
      },
      uses: ['direct-sum-many'],
      notes: md`**Следствия.** Различных собственных значений не больше $n$. Если их ровно $n$, собственные векторы по одному на значение — базис, оператор диагонализуем.

$\dim\big(E_\varphi(\lambda_1)\oplus\dots\oplus E_\varphi(\lambda_r)\big)=g_{\lambda_1}+\dots+g_{\lambda_r}\le n$; равенство — критерий диагонализуемости.

**Другой путь.** Применить к $\sum\mathbf v_j=\mathbf 0$ многочлен $\prod_{j\ne i}(\varphi-\lambda_j\operatorname{Id})$: остаётся $\prod_{j\ne i}(\lambda_i-\lambda_j)\mathbf v_i=\mathbf 0$.`,
      pitfalls: [
        'Попарно нулевых пересечений E(λᵢ) ∩ E(λⱼ) мало для прямоты суммы трёх и более подпространств — нужна индукция.',
        'Собственные векторы с одинаковым собственным значением могут быть зависимы: λ должны быть попарно различны.',
      ],
    },
    {
      id: 'diagonalizable-criterion',
      title: 'Критерий диагонализуемости: χ раскладывается на линейные множители и геометрические кратности равны алгебраическим',
      source: 'Лекция 13, утверждения 79 и 82',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Оператор $\varphi$ на $n$-мерном $\mathbb V$ диагонализуем над $\mathbb F$ тогда и только тогда, когда
1. $\chi_\varphi$ раскладывается над $\mathbb F$ на линейные множители: $\chi_\varphi(t)=(t-\lambda_1)^{a_1}\cdots(t-\lambda_r)^{a_r}$, $\lambda_i\in\mathbb F$ попарно различны;
2. для каждого $\lambda_i$ геометрическая кратность равна алгебраической: $\dim E_\varphi(\lambda_i)=a_i$.`,
      },
      proof: {
        level: 'basic',
        idea: md`В собственном базисе $\chi_\varphi$ — произведение $(t-\lambda)$ по диагонали, и каждое $\lambda$ встречается $\dim E(\lambda)$ раз. Обратно: $\sum a_i=n$, значит, $\sum g_i=n$, а сумма собственных подпространств прямая — это всё $\mathbb V$.`,
        steps: [
          { title: md`Диагонализуем ⟺ собственный базис`, body: md`Если $\mathbb V=\bigoplus E_\varphi(\lambda_i)$, базисы слагаемых подряд — базис из собственных векторов, матрица диагональна. Обратно, в диагональном базисе каждый вектор собственный; сгруппировав по значениям, получаем, что собственные подпространства порождают $\mathbb V$, а их сумма прямая.` },
          { title: md`⇒: считаем $\chi$`, body: md`В собственном базисе $T(\varphi,\mathcal A)=\operatorname{diag}(\lambda_1I_{d_1},\dots,\lambda_rI_{d_r})$, $d_i=\dim E_\varphi(\lambda_i)$. Тогда $\chi_\varphi(t)=\det(tI-D)=(t-\lambda_1)^{d_1}\cdots(t-\lambda_r)^{d_r}$ — линейные множители.` },
          { title: md`⇒: кратности`, body: md`Из этой записи $a_i=d_i=g_i$. Других корней нет — все собственные значения в списке.` },
          { title: md`⇐: сумма кратностей`, body: md`$\deg\chi_\varphi=n$ и он разложен на линейные множители, поэтому $a_1+\dots+a_r=n$. По условию $g_i=a_i$, значит, $g_1+\dots+g_r=n$.` },
          { title: md`⇐: прямая сумма — всё $\mathbb V$`, body: md`Сумма $E_\varphi(\lambda_1)+\dots+E_\varphi(\lambda_r)$ прямая (различные собственные значения), её размерность $g_1+\dots+g_r=n=\dim\mathbb V$. Подпространство полной размерности совпадает с $\mathbb V$: $\mathbb V=\bigoplus E_\varphi(\lambda_i)$ — оператор диагонализуем.` },
        ],
      },
      uses: ['eigenspaces-direct', 'eigen-char-roots', 'det-triangular', 'subspace-dim'],
      notes: md`**Частный случай.** $n$ попарно различных корней $\chi_\varphi$ в $\mathbb F$ — оператор диагонализуем: $1\le g_i\le a_i=1$.

**Примеры.** $\begin{pmatrix}1&1\\0&1\end{pmatrix}$: $\chi=(t-1)^2$, $a=2$, $g=1$ — не диагонализуем. Поворот на $\pi/2$: над $\mathbb R$ $t^2+1$ не раскладывается — не диагонализуем; над $\mathbb C$ $(t-i)(t+i)$ — диагонализуем. $\operatorname{diag}(2,2,3)$: кратный корень не мешает, $g_2=a_2=2$.

Так как всегда $g_i\le a_i$, условие 2 можно проверять как $\sum g_i=n$.`,
      pitfalls: [
        'Над ℝ условие «раскладывается на линейные множители» нельзя пропускать.',
        'Кратный корень сам по себе не мешает диагонализуемости — проверь размерность собственного подпространства.',
      ],
    },
    {
      id: 'nilpotent-chain',
      title: 'Базис-цепочка для нильпотентного оператора с индексом нильпотентности dim 𝕍',
      source: 'Неделя 12–13, семинар',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\varphi$ — нильпотентный оператор на $\mathbb V$, $\dim\mathbb V=n$, со степенью нильпотентности $n$: $\varphi^n=0$, $\varphi^{n-1}\ne0$. Тогда для любого $\mathbf v$ с $\varphi^{n-1}(\mathbf v)\ne\mathbf 0$ векторы
$$\mathcal A=\big(\varphi^{n-1}(\mathbf v),\dots,\varphi(\mathbf v),\mathbf v\big)$$
образуют базис $\mathbb V$, и
$$T(\varphi,\mathcal A)=J_n(0)=\begin{pmatrix}0&1&&0\\&0&\ddots&\\&&\ddots&1\\0&&&0\end{pmatrix}$$
(единицы над главной диагональю, остальное — нули).`,
      },
      proof: {
        level: 'basic',
        idea: md`Если нетривиальная комбинация цепочки равна нулю, применим к ней такую степень $\varphi$, чтобы выжило ровно одно слагаемое — с $\varphi^{n-1}(\mathbf v)$.`,
        steps: [
          { title: md`Такой $\mathbf v$ есть`, body: md`$\varphi^{n-1}\ne0$ как оператор, значит, $\varphi^{n-1}(\mathbf v)\ne\mathbf 0$ для некоторого $\mathbf v$.` },
          { title: md`Пусть комбинация равна нулю`, body: md`$c_0\mathbf v+c_1\varphi(\mathbf v)+\dots+c_{n-1}\varphi^{n-1}(\mathbf v)=\mathbf 0$, и не все $c_j$ нули. Пусть $k$ — наименьший номер с $c_k\ne0$.` },
          { title: md`Применяем $\varphi^{n-1-k}$`, body: md`Слагаемое $c_j\varphi^j(\mathbf v)$ переходит в $c_j\varphi^{j+n-1-k}(\mathbf v)$; при $j>k$ степень $\ge n$ — это ноль. Остаётся $c_k\varphi^{n-1}(\mathbf v)=\mathbf 0$, а $\varphi^{n-1}(\mathbf v)\ne\mathbf 0$ — значит, $c_k=0$. Противоречие.` },
          { title: md`Базис`, body: md`Получили $n$ линейно независимых векторов в $n$-мерном пространстве — это базис.` },
          { title: md`Матрица`, body: md`Обозначим $\mathbf a_i=\varphi^{n-i}(\mathbf v)$, $i=1,\dots,n$. Тогда $\varphi(\mathbf a_1)=\varphi^n(\mathbf v)=\mathbf 0$ — первый столбец нулевой, а $\varphi(\mathbf a_i)=\mathbf a_{i-1}$ при $i\ge2$ — в $i$-м столбце единица в строке $i-1$. Это $J_n(0)$.` },
        ],
      },
      uses: ['basis-criteria', 'map-matrix'],
      notes: md`**Смысл.** Все нильпотентные операторы на $\mathbb V$ с индексом $n$ подобны: в подходящем базисе у каждого матрица $J_n(0)$. Для них $m_\varphi=\chi_\varphi=t^n$, $\operatorname{rk}\varphi^k=n-k$, $\dim\ker\varphi=1$.

**Пример.** Дифференцирование $D$ на $\mathbb R[x]_{\le2}$: $D^3=0$, $D^2(x^2)=2\ne0$. Цепочка $(D^2x^2,Dx^2,x^2)=(2,\ 2x,\ x^2)$ — базис, $T(D,\mathcal A)=\begin{pmatrix}0&1&0\\0&0&1\\0&0&0\end{pmatrix}$.

Та же цепочка при любом индексе $s$ даёт $s$ независимых векторов — так оказывается, что $s\le n$.`,
      pitfalls: [
        md`Нужен вектор с $\varphi^{n-1}(\mathbf v)\ne\mathbf 0$; для произвольного $\mathbf v$ (например, из ядра) цепочка обрывается раньше.`,
        'Порядок векторов задаёт, где единицы: в порядке (v, φ(v), …, φⁿ⁻¹(v)) они окажутся под диагональю.',
      ],
    },
    {
      id: 'geom-le-alg',
      title: 'Геометрическая кратность собственного значения не превосходит алгебраической',
      source: 'Лекция 13, утверждение 81',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Для каждого собственного значения $\lambda$ оператора $\varphi$: $1\le g_\lambda\le a_\lambda$, где $g_\lambda=\dim E_\varphi(\lambda)$, а $a_\lambda$ — кратность корня $\lambda$ в $\chi_\varphi$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Начнём базис с базиса $E_\varphi(\lambda)$: матрица блочно-треугольная с блоком $\lambda I_{g}$, и $(t-\lambda)^{g}$ выносится из $\chi_\varphi$.`,
        steps: [
          { title: md`$g_\lambda\ge1$`, body: md`$\lambda$ — собственное значение, значит, есть собственный вектор, $E_\varphi(\lambda)\ne\{\mathbf 0\}$.` },
          { title: md`Согласованный базис`, body: md`$E_\varphi(\lambda)$ инвариантно. Возьмём его базис $\mathbf u_1,\dots,\mathbf u_g$ ($g=g_\lambda$) и дополним до базиса $\mathcal A$ пространства $\mathbb V$.` },
          { title: md`Блочно-треугольный вид`, body: md`По теореме об инвариантном подпространстве $T(\varphi,\mathcal A)=\begin{pmatrix}B&C\\0&D\end{pmatrix}$, где $B$ — матрица ограничения на $E_\varphi(\lambda)$. Но $\varphi|_{E_\varphi(\lambda)}=\lambda\operatorname{Id}$, поэтому $B=\lambda I_g$.` },
          { title: md`Характеристический многочлен`, body: md`$tI-T=\begin{pmatrix}(t-\lambda)I_g&-C\\0&tI-D\end{pmatrix}$, по формуле блочно-треугольного определителя $\chi_\varphi(t)=(t-\lambda)^g\det(tI-D)$.` },
          { title: md`Вывод`, body: md`$(t-\lambda)^g$ делит $\chi_\varphi$, поэтому кратность корня $\lambda$ не меньше $g$: $a_\lambda\ge g_\lambda$. (В $\det(tI-D)$ корень $\lambda$ тоже может быть — тогда $a_\lambda>g_\lambda$.)` },
        ],
      },
      uses: ['invariant-block', 'det-block', 'extend-to-basis'],
      notes: md`**Пример строгого неравенства.** $\begin{pmatrix}1&1\\0&1\end{pmatrix}$: $\chi=(t-1)^2$, $a_1=2$, а $E(1)=\operatorname{span}\{\mathbf e_1\}$, $g_1=1$.

Это неравенство — ключ к критерию диагонализуемости: $\sum g_\lambda\le\sum a_\lambda\le n$, и диагонализуемость — когда везде равенство.`,
      pitfalls: [
        'Блок D может тоже иметь собственное значение λ, поэтому получаем только неравенство, а не равенство.',
        'Ограничение на E(λ) — это λ·Id, отсюда блок λI, а не произвольный верхний левый блок.',
      ],
    },
  ],
};
