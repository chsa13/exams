import { md, type Topic } from '../../src/content/schema';

// Лекция 10. Канонический вид линейного отображения (лонгрид «Недели 1–13»; пункт «нед 10, сем» — без семинарского листа)

export const canonical: Topic = {
  id: 'canonical',
  title: 'Канонический вид линейного отображения',
  longread: 10,
  units: [
    {
      id: 'canonical-form',
      title: 'Канонический вид матрицы линейного отображения при независимом выборе базисов',
      source: 'Лекция 10, утверждения 56 и 57',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\varphi:\mathbb V\to\mathbb W$ линейно, $\dim\mathbb V=n$, $\dim\mathbb W=m$, $\operatorname{rk}\varphi=r$. Тогда существуют базисы $\mathcal A$ пространства $\mathbb V$ и $\mathcal B$ пространства $\mathbb W$, в которых
$$T(\varphi,\mathcal A,\mathcal B)=\begin{pmatrix}I_r&0\\0&0\end{pmatrix}\in\operatorname{Mat}_{m\times n}(\mathbb F).$$
Матричная форма: для любой $A\in\operatorname{Mat}_{m\times n}(\mathbb F)$ ранга $r$ есть обратимые $P\in\operatorname{Mat}_m$, $Q\in\operatorname{Mat}_n$ с $PAQ=\begin{pmatrix}I_r&0\\0&0\end{pmatrix}$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Как в теореме о размерностях: базис ядра ставим в конец, впереди — векторы, чьи образы образуют базис образа; этот базис образа дополняем до базиса $\mathbb W$.`,
        steps: [
          { title: md`Базис $\mathbb V$`, body: md`По теореме о размерностях $\dim\ker\varphi=n-r$. Возьмём базис ядра $(\mathbf u_{r+1},\dots,\mathbf u_n)$ и дополним его до базиса $\mathbb V$; добавленные векторы поставим в начало: $\mathcal A=(\mathbf v_1,\dots,\mathbf v_r,\mathbf u_{r+1},\dots,\mathbf u_n)$.` },
          { title: md`Образы — базис образа`, body: md`Как в доказательстве теоремы о размерностях, $\mathbf w_i=\varphi(\mathbf v_i)$, $i=1,\dots,r$, образуют базис $\operatorname{Im}\varphi$ (порождают: $\varphi(\mathbf u_j)=\mathbf 0$; независимы: иначе нетривиальная комбинация $\mathbf v_i$ попала бы в ядро).` },
          { title: md`Базис $\mathbb W$`, body: md`Независимую систему $\mathbf w_1,\dots,\mathbf w_r$ дополним до базиса $\mathcal B=(\mathbf w_1,\dots,\mathbf w_r,\mathbf w_{r+1},\dots,\mathbf w_m)$ пространства $\mathbb W$.` },
          { title: md`Матрица по столбцам`, body: md`$\varphi(\mathbf v_i)=\mathbf w_i$ — координаты в $\mathcal B$ — $\mathbf e_i$, это первые $r$ столбцов. $\varphi(\mathbf u_j)=\mathbf 0$ — остальные столбцы нулевые. Получаем $\begin{pmatrix}I_r&0\\0&0\end{pmatrix}$.` },
          { title: md`Матричная форма`, body: md`Пусть $A=T(\varphi_A,\mathcal E_n,\mathcal E_m)$. По формуле замены базисов $T(\varphi_A,\mathcal A,\mathcal B)=C_{\mathcal B\leftarrow\mathcal E_m}\,A\,C_{\mathcal E_n\leftarrow\mathcal A}$; положим $P=C_{\mathcal B\leftarrow\mathcal E_m}$, $Q=C_{\mathcal E_n\leftarrow\mathcal A}$ — матрицы перехода обратимы.` },
        ],
      },
      uses: ['rank-nullity', 'extend-to-basis', 'change-basis-map'],
      notes: md`Смысл: если базисы в $\mathbb V$ и $\mathbb W$ выбираются **независимо**, единственная характеристика отображения — ранг. Две матрицы одного размера получаются друг из друга как $A'=PAQ$ с обратимыми $P,Q$ тогда и только тогда, когда у них одинаковый ранг.

Для оператора ($\mathcal A=\mathcal B$, матрицы $C^{-1}MC$) так упростить нельзя: там важны не только ранги — это тема следующих недель.

$Q$ — столбцы $\mathbf v_1,\dots,\mathbf v_r,\mathbf u_{r+1},\dots,\mathbf u_n$; $P^{-1}$ — столбцы $\mathbf w_1,\dots,\mathbf w_m$.`,
      pitfalls: [
        md`Порядок векторов в базисе $\mathcal A$ важен: векторы ядра — в конце, иначе единичный блок окажется не в левом верхнем углу.`,
        'Это работает только при независимом выборе двух базисов; для оператора в одном базисе канонический вид другой.',
        md`Что $\varphi(\mathbf v_1),\dots,\varphi(\mathbf v_r)$ независимы, надо обосновать, а не считать очевидным.`,
      ],
    },
    {
      id: 'rank-factorization',
      title: 'Представление матрицы ранга r в виде произведения матриц m×r и r×n',
      source: 'Неделя 10, семинар',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Если $A\in\operatorname{Mat}_{m\times n}(\mathbb F)$ и $\operatorname{rk}A=r\ge1$, то $A=BC$ для некоторых $B\in\operatorname{Mat}_{m\times r}(\mathbb F)$ и $C\in\operatorname{Mat}_{r\times n}(\mathbb F)$, причём $\operatorname{rk}B=\operatorname{rk}C=r$. Обратно, произведение матриц $m\times r$ и $r\times n$ имеет ранг не больше $r$.`,
      },
      proof: {
        level: 'basic',
        idea: md`$B$ — базис оболочки столбцов $A$, записанный столбцами; $C$ — коэффициенты разложения столбцов $A$ по этому базису.`,
        steps: [
          { title: md`Базис оболочки столбцов`, body: md`$\operatorname{rk}A=r$, поэтому у $\operatorname{span}\{\mathbf a_1,\dots,\mathbf a_n\}$ есть базис $\mathbf b_1,\dots,\mathbf b_r$. Положим $B=[\mathbf b_1\ \dots\ \mathbf b_r]\in\operatorname{Mat}_{m\times r}$; её столбцы независимы, $\operatorname{rk}B=r$.` },
          { title: md`Раскладываем столбцы $A$`, body: md`Каждый $\mathbf a_j=c_{1j}\mathbf b_1+\dots+c_{rj}\mathbf b_r=B\mathbf c_j$, где $\mathbf c_j=(c_{1j},\dots,c_{rj})^{\mathsf T}$. Положим $C=[\mathbf c_1\ \dots\ \mathbf c_n]\in\operatorname{Mat}_{r\times n}$.` },
          { title: md`$A=BC$`, body: md`$j$-й столбец $BC$ — это $B\mathbf c_j=\mathbf a_j$. Совпадают все столбцы.` },
          { title: md`Ранги`, body: md`По оценке ранга композиции $r=\operatorname{rk}A=\operatorname{rk}(BC)\le\operatorname{rk}C\le r$ ($C$ имеет $r$ строк, оболочка её столбцов лежит в $\mathbb F^r$). Значит, $\operatorname{rk}C=r$. Обратное утверждение — та же оценка: $\operatorname{rk}(BC)\le\operatorname{rk}B\le r$.` },
        ],
      },
      uses: ['canonical-form', 'rank-invertible'],
      notes: md`**Через канонический вид.** $A=P^{-1}\begin{pmatrix}I_r&0\\0&0\end{pmatrix}Q^{-1}$ и $\begin{pmatrix}I_r&0\\0&0\end{pmatrix}=\begin{pmatrix}I_r\\0\end{pmatrix}\begin{pmatrix}I_r&0\end{pmatrix}$, поэтому $B=P^{-1}\begin{pmatrix}I_r\\0\end{pmatrix}$ (первые $r$ столбцов $P^{-1}$), $C=\begin{pmatrix}I_r&0\end{pmatrix}Q^{-1}$ (первые $r$ строк $Q^{-1}$).

**Пример.** $A=\begin{pmatrix}1&2&3\\2&4&6\end{pmatrix}$, $\operatorname{rk}A=1$: $A=\begin{pmatrix}1\\2\end{pmatrix}\begin{pmatrix}1&2&3\end{pmatrix}$. Матрица ранга $1$ — это всегда «столбец на строку».

Удобно брать $B$ из столбцов $A$ на ведущих позициях, а $C$ — ненулевые строки $\operatorname{rref}(A)$.`,
      pitfalls: [
        'Разложение не единственно: A = BC = (BG)(G⁻¹C) для любой обратимой G размера r × r.',
        md`Размеры: $B$ — $m\times r$ (столько строк, сколько у $A$), $C$ — $r\times n$.`,
      ],
    },
  ],
};
