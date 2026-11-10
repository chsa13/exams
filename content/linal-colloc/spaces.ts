import { md, type Topic } from '../../src/content/schema';

// Лекция 6. Векторные пространства, базисы и координаты

export const spaces: Topic = {
  id: 'spaces',
  title: 'Векторные пространства, базисы и координаты',
  longread: 6,
  units: [
    {
      id: 'vector-space',
      title: 'Векторное пространство',
      source: 'Лекция 6, §26',
      definition: {
        level: 'basic',
        text: md`**Векторное пространство** над полем $\mathbb F$ — множество $\mathbb V$ со сложением $\mathbb V\times\mathbb V\to\mathbb V$ и умножением на скаляр $\mathbb F\times\mathbb V\to\mathbb V$, для которых при всех $\mathbf u,\mathbf v,\mathbf w\in\mathbb V$, $\lambda,\mu\in\mathbb F$:
1. $(\mathbf u+\mathbf v)+\mathbf w=\mathbf u+(\mathbf v+\mathbf w)$;
2. $\mathbf u+\mathbf v=\mathbf v+\mathbf u$;
3. есть $\mathbf 0\in\mathbb V$: $\mathbf v+\mathbf 0=\mathbf v$;
4. для каждого $\mathbf v$ есть $-\mathbf v$: $\mathbf v+(-\mathbf v)=\mathbf 0$;
5. $\lambda(\mathbf u+\mathbf v)=\lambda\mathbf u+\lambda\mathbf v$;
6. $(\lambda+\mu)\mathbf v=\lambda\mathbf v+\mu\mathbf v$;
7. $(\lambda\mu)\mathbf v=\lambda(\mu\mathbf v)$;
8. $1\cdot\mathbf v=\mathbf v$.`,
      },
      notes: md`Примеры: $\mathbb F^n$, $\operatorname{Mat}_{m\times n}(\mathbb F)$, $\mathbb F[t]_{\le d}$, функции $X\to\mathbb F$ с поточечными операциями. Решения неоднородной системы — не пространство (нет нуля).

Следствия аксиом: $0\mathbf v=\mathbf 0$, $\lambda\mathbf 0=\mathbf 0$, $(-1)\mathbf v=-\mathbf v$; ноль и противоположный единственны ($\mathbf 0=\mathbf 0+\mathbf 0'=\mathbf 0'$).`,
      pitfalls: [md`Ноль задаётся операцией сложения и при необычных операциях не обязан быть «столбцом из нулей».`],
    },
    {
      id: 'subspace',
      title: 'Подпространство',
      source: 'Лекция 6, §27',
      definition: {
        level: 'basic',
        text: md`Подмножество $\mathbb U\subseteq\mathbb V$ — **подпространство**, если
1. $\mathbf 0\in\mathbb U$;
2. $\mathbf u+\mathbf v\in\mathbb U$ для всех $\mathbf u,\mathbf v\in\mathbb U$;
3. $\lambda\mathbf u\in\mathbb U$ для всех $\lambda\in\mathbb F$, $\mathbf u\in\mathbb U$.`,
      },
      notes: md`Подпространства: $\{\mathbf 0\}$, $\mathbb V$, $\ker A$, симметричные матрицы, многочлены с $p(a)=0$. Не подпространства: обратимые матрицы, многочлены степени ровно $d$, многочлены с $p(a)=1$.`,
      pitfalls: ['Чтобы показать, что множество не подпространство, предъяви конкретную операцию, выводящую из него.'],
    },
    {
      id: 'span',
      title: 'Линейная комбинация и линейная оболочка',
      source: 'Лекция 6, §28',
      definition: {
        level: 'basic',
        text: md`**Линейная комбинация** векторов $\mathbf v_1,\dots,\mathbf v_k\in\mathbb V$ — вектор $\lambda_1\mathbf v_1+\dots+\lambda_k\mathbf v_k$, $\lambda_i\in\mathbb F$. **Линейная оболочка** $\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}$ — множество всех их линейных комбинаций. $\operatorname{span}\varnothing=\{\mathbf 0\}$.`,
      },
      notes: md`Оболочка — наименьшее подпространство, содержащее $\mathbf v_1,\dots,\mathbf v_k$.`,
      pitfalls: ['Удаление вектора, который выражается через остальные, оболочку не меняет; удаление любого другого — уменьшает её.'],
    },
    {
      id: 'generating-system',
      title: 'Порождающая система',
      source: 'Лекция 6, §28',
      definition: {
        level: 'basic',
        text: md`Векторы $\mathbf v_1,\dots,\mathbf v_k$ — **порождающая система** пространства $\mathbb V$ (порождают $\mathbb V$), если каждый вектор $\mathbb V$ — их линейная комбинация: $\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}=\mathbb V$.`,
      },
      pitfalls: ['Порождающая система может содержать лишние (выражающиеся через другие) векторы — она не обязана быть базисом.'],
    },
    {
      id: 'linear-dependence',
      title: 'Линейная зависимость и независимость',
      source: 'Лекция 6, §28, утверждение 31',
      definition: {
        level: 'basic',
        text: md`Система $\mathbf v_1,\dots,\mathbf v_k$ **линейно зависима**, если есть скаляры $\lambda_1,\dots,\lambda_k$, **не все равные нулю**, с $\lambda_1\mathbf v_1+\dots+\lambda_k\mathbf v_k=\mathbf 0$. Если такое возможно только при $\lambda_1=\dots=\lambda_k=0$, система **линейно независима**. Пустая система независима.`,
      },
      notes: md`Утверждение 31: система зависима $\iff$ один из векторов выражается через остальные; если $\mathbf v_1,\dots,\mathbf v_k$ независимы, то $\mathbf v_1,\dots,\mathbf v_k,\mathbf w$ независимы $\iff\mathbf w\notin\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_k\}$.`,
      pitfalls: [
        md`Система с нулевым вектором зависима: $1\cdot\mathbf 0=\mathbf 0$.`,
        'Попарная непропорциональность не означает независимости: (1,0), (0,1), (1,1).',
      ],
    },
    {
      id: 'basis',
      title: 'Базис',
      source: 'Лекция 6, §29',
      definition: {
        level: 'basic',
        text: md`**Базис** пространства $\mathbb V$ — **упорядоченная** система $\mathcal B=(\mathbf b_1,\dots,\mathbf b_n)$, которая линейно независима и порождает $\mathbb V$. Базис $\{\mathbf 0\}$ — пустая система.`,
      },
      notes: md`В $\mathbb R[t]_{\le2}$: $(1,t,t^2)$ — базис; $(1,t,t^2,1+t)$ порождает, но зависима; $(1,t)$ независима, но не порождает.`,
      pitfalls: ['Базис упорядочен: перестановка векторов даёт другой базис.'],
    },
    {
      id: 'finite-dim',
      title: 'Конечномерное пространство',
      source: 'Лекция 6, §29',
      definition: {
        level: 'basic',
        text: md`Векторное пространство **конечномерно**, если у него есть конечная порождающая система. Иначе — бесконечномерно.`,
      },
      notes: md`$\mathbb F[t]$ (все многочлены) бесконечномерно: у конечного набора есть наибольшая степень, и многочлен большей степени через него не выражается.`,
      pitfalls: ['Конечномерность определяется через конечную ПОРОЖДАЮЩУЮ систему; то, что в ней есть базис, — уже теорема.'],
    },
    {
      id: 'dimension',
      title: 'Размерность',
      source: 'Лекция 6, §29',
      definition: {
        level: 'basic',
        text: md`**Размерность** $\dim\mathbb V$ конечномерного пространства — число векторов в любом его базисе (оно одно и то же для всех базисов). $\dim\{\mathbf 0\}=0$.`,
      },
      notes: md`$\dim\mathbb F^n=n$, $\dim\operatorname{Mat}_{m\times n}(\mathbb F)=mn$ (матричные единицы $E_{ij}$), $\dim\mathbb F[t]_{\le d}=d+1$.`,
      pitfalls: [md`$\dim\mathbb F[t]_{\le d}=d+1$, а не $d$; размерность зависит от поля: $\dim_{\mathbb R}\mathbb C=2$.`],
    },
    {
      id: 'coordinates',
      title: 'Координаты вектора в базисе',
      source: 'Лекция 6, §30',
      definition: {
        level: 'basic',
        text: md`Если $\mathcal B=(\mathbf b_1,\dots,\mathbf b_n)$ — базис $\mathbb V$ и $\mathbf x=x_1\mathbf b_1+\dots+x_n\mathbf b_n$, то столбец $[\mathbf x]_{\mathcal B}=(x_1,\dots,x_n)^{\mathsf T}\in\mathbb F^n$ — **столбец координат** $\mathbf x$ в базисе $\mathcal B$. Отображение $\kappa_{\mathcal B}:\mathbf x\mapsto[\mathbf x]_{\mathcal B}$ — координатная функция.`,
      },
      notes: md`Пример: в $\mathcal B=(1,t-1,(t-1)^2)$ многочлен $t^2+1=2+2(t-1)+(t-1)^2$, $[t^2+1]_{\mathcal B}=(2,2,1)^{\mathsf T}$.`,
      pitfalls: ['Координаты — всегда числовой столбец, даже если вектор — многочлен или матрица.'],
    },
    {
      id: 'subspace-criterion',
      title: 'Критерий подпространства',
      source: 'Лекция 6, утверждение 30',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Непустое подмножество $\mathbb U\subseteq\mathbb V$ — подпространство тогда и только тогда, когда $\lambda\mathbf u+\mu\mathbf v\in\mathbb U$ для всех $\mathbf u,\mathbf v\in\mathbb U$ и $\lambda,\mu\in\mathbb F$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Подставляем удобные $\lambda,\mu$: нули дают $\mathbf 0$, единицы — сумму, $\mu=0$ — умножение на скаляр.`,
        steps: [
          { title: md`$\Rightarrow$`, body: md`Если $\mathbb U$ — подпространство, то $\lambda\mathbf u\in\mathbb U$ и $\mu\mathbf v\in\mathbb U$ (замкнутость относительно умножения), а их сумма — по замкнутости относительно сложения.` },
          { title: md`$\Leftarrow$: ноль`, body: md`$\mathbb U$ непусто — возьмём $\mathbf u\in\mathbb U$. При $\lambda=\mu=0$, $\mathbf v=\mathbf u$: $0\mathbf u+0\mathbf u=\mathbf 0\in\mathbb U$.` },
          { title: md`$\Leftarrow$: сложение и умножение`, body: md`$\lambda=\mu=1$ даёт $\mathbf u+\mathbf v\in\mathbb U$; $\mu=0$ даёт $\lambda\mathbf u\in\mathbb U$.` },
        ],
      },
      notes: md`Операции на $\mathbb U$ берутся из $\mathbb V$, поэтому аксиомы векторного пространства для $\mathbb U$ выполнены автоматически: противоположный $-\mathbf u=(-1)\mathbf u\in\mathbb U$.

Пример: $\ker A$ — подпространство: $A(\lambda\mathbf x+\mu\mathbf y)=\lambda A\mathbf x+\mu A\mathbf y=\mathbf 0$.`,
      pitfalls: [
        'Условие непустоты важно: пустое множество удовлетворяет условию «для всех u, v», но подпространством не является.',
        md`Использовать $0\mathbf u=\mathbf 0$ — это следствие аксиом, на него можно ссылаться.`,
      ],
    },
    {
      id: 'basis-unique',
      title: 'Базис и единственность разложения вектора',
      source: 'Лекция 6, утверждение 34',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Система $\mathcal B=(\mathbf b_1,\dots,\mathbf b_n)$ — базис $\mathbb V$ тогда и только тогда, когда каждый $\mathbf x\in\mathbb V$ **единственным образом** представляется в виде $\mathbf x=x_1\mathbf b_1+\dots+x_n\mathbf b_n$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Существование разложения — это порождение, единственность — это независимость.`,
        steps: [
          { title: md`$\Rightarrow$: существование`, body: md`$\mathcal B$ порождает $\mathbb V$, поэтому любой $\mathbf x$ — комбинация $\mathbf b_i$.` },
          { title: md`$\Rightarrow$: единственность`, body: md`Если $\mathbf x=\sum x_i\mathbf b_i=\sum x_i'\mathbf b_i$, вычитаем: $\sum(x_i-x_i')\mathbf b_i=\mathbf 0$. По независимости все $x_i-x_i'=0$.` },
          { title: md`$\Leftarrow$`, body: md`Существование разложений означает, что $\mathcal B$ порождает $\mathbb V$. Нулевой вектор раскладывается как $\sum0\cdot\mathbf b_i$, и это разложение единственно — значит, $\sum\lambda_i\mathbf b_i=\mathbf 0$ только при всех $\lambda_i=0$: система независима.` },
        ],
      },
      notes: md`Именно поэтому корректно определены координаты $[\mathbf x]_{\mathcal B}$. ФСР однородной системы — базис $\ker A$.`,
      pitfalls: ['В «⇐» независимость получается из единственности разложения именно НУЛЕВОГО вектора — это надо сказать явно.'],
    },
    {
      id: 'poly-degrees',
      title: 'Линейная независимость ненулевых многочленов попарно различных степеней',
      source: 'Неделя 6, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Если ненулевые многочлены $p_1,\dots,p_k\in\mathbb F[t]$ имеют попарно различные степени, то они линейно независимы.`,
      },
      proof: {
        level: 'basic',
        idea: md`В нетривиальной комбинации берём многочлен наибольшей степени с ненулевым коэффициентом: его старший член ничем не сокращается.`,
        steps: [
          { title: md`Упорядочиваем`, body: md`Перенумеруем так, что $\deg p_1<\deg p_2<\dots<\deg p_k$.` },
          { title: md`От противного`, body: md`Пусть $\lambda_1p_1+\dots+\lambda_kp_k=0$ и не все $\lambda_i=0$. Пусть $m$ — наибольший номер с $\lambda_m\ne0$; тогда $\lambda_1p_1+\dots+\lambda_mp_m=0$.` },
          { title: md`Старший коэффициент`, body: md`Пусть $d=\deg p_m$ и $c\ne0$ — старший коэффициент $p_m$. У $p_1,\dots,p_{m-1}$ степень меньше $d$, поэтому коэффициент при $t^d$ в сумме равен $\lambda_mc\ne0$.` },
          { title: md`Противоречие`, body: md`Многочлен с ненулевым коэффициентом при $t^d$ не равен нулевому. Значит, все $\lambda_i=0$.` },
        ],
      },
      notes: md`Следствие: $1,t,t^2,\dots,t^d$ независимы; любые $d+1$ ненулевых многочленов степеней $0,1,\dots,d$ — базис $\mathbb F[t]_{\le d}$ (их $d+1=\dim$).

Обратное неверно: $t$ и $t+1$ одной степени, но независимы.`,
      pitfalls: [
        'Условие «ненулевые» важно: нулевой многочлен делает систему зависимой.',
        'Нужно брать наибольшую степень среди многочленов с НЕНУЛЕВЫМ коэффициентом, а не просто наибольшую.',
      ],
    },
    {
      id: 'extract-basis',
      title: 'Извлечение базиса из порождающей системы',
      source: 'Лекция 6, утверждение 35, п. 1',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Из любой конечной порождающей системы пространства $\mathbb V$ можно удалить некоторые векторы (возможно, ни одного) так, что останется базис $\mathbb V$. В частности, у конечномерного пространства есть базис.`,
      },
      proof: {
        level: 'basic',
        idea: md`Пока система зависима, выкидываем вектор, который выражается через остальные: оболочка не меняется, а векторов становится меньше.`,
        steps: [
          { title: md`Лишний вектор`, body: md`Если порождающая система $\mathbf u_1,\dots,\mathbf u_m$ линейно зависима, то один из её векторов, скажем $\mathbf u_j$, выражается через остальные (утверждение 31).` },
          { title: md`Оболочка не меняется`, body: md`Любая комбинация всех $\mathbf u_i$ после подстановки выражения для $\mathbf u_j$ становится комбинацией остальных. Значит, без $\mathbf u_j$ система по-прежнему порождает $\mathbb V$.` },
          { title: md`Процесс конечен`, body: md`Повторяем, пока система зависима. Векторов конечное число, поэтому мы остановимся; в конце система порождает $\mathbb V$ и независима, то есть это базис. (Если выкинули всё, то $\mathbb V=\{\mathbf 0\}$, и базис — пустая система.)` },
        ],
      },
      notes: md`На практике: координаты векторов ставим **столбцами** в матрицу, приводим к ступенчатому виду; столбцы исходной матрицы на ведущих позициях — базис оболочки.`,
      pitfalls: ['Выкидывать можно только вектор, который выражается через ОСТАВШИЕСЯ; в зависимой системе такой есть, но не любой вектор такой.'],
    },
    {
      id: 'union-subspaces',
      title: 'Объединение двух подпространств — подпространство, только если одно содержится в другом',
      source: 'Неделя 6, семинар',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $\mathbb U,\mathbb W\subseteq\mathbb V$ — подпространства. Объединение $\mathbb U\cup\mathbb W$ является подпространством тогда и только тогда, когда $\mathbb U\subseteq\mathbb W$ или $\mathbb W\subseteq\mathbb U$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Если ни одно не содержит другое, берём $\mathbf u\in\mathbb U\setminus\mathbb W$ и $\mathbf w\in\mathbb W\setminus\mathbb U$: их сумма не лежит ни в одном.`,
        steps: [
          { title: md`$\Leftarrow$`, body: md`Если $\mathbb U\subseteq\mathbb W$, то $\mathbb U\cup\mathbb W=\mathbb W$ — подпространство; симметрично для $\mathbb W\subseteq\mathbb U$.` },
          { title: md`$\Rightarrow$: от противного`, body: md`Пусть $\mathbb U\cup\mathbb W$ — подпространство, но $\mathbb U\not\subseteq\mathbb W$ и $\mathbb W\not\subseteq\mathbb U$. Возьмём $\mathbf u\in\mathbb U$, $\mathbf u\notin\mathbb W$ и $\mathbf w\in\mathbb W$, $\mathbf w\notin\mathbb U$.` },
          { title: md`Сумма в объединении`, body: md`$\mathbf u,\mathbf w\in\mathbb U\cup\mathbb W$, значит, $\mathbf s=\mathbf u+\mathbf w\in\mathbb U\cup\mathbb W$, то есть $\mathbf s\in\mathbb U$ или $\mathbf s\in\mathbb W$.` },
          { title: md`Противоречие`, body: md`Если $\mathbf s\in\mathbb U$, то $\mathbf w=\mathbf s-\mathbf u\in\mathbb U$ — нет. Если $\mathbf s\in\mathbb W$, то $\mathbf u=\mathbf s-\mathbf w\in\mathbb W$ — нет.` },
        ],
      },
      notes: md`Пример: оси $Ox\cup Oy$ в $\mathbb R^2$ — не подпространство: $\mathbf e_1+\mathbf e_2$ не лежит ни на одной оси. Поэтому вместо объединения используют сумму $\mathbb U+\mathbb W$ — наименьшее подпространство, содержащее оба.`,
      pitfalls: [
        'Вектор u нужно брать из 𝕌, но не из 𝕎, — а не любой из 𝕌: иначе противоречия нет.',
        'Для пересечения такой проблемы нет: пересечение подпространств всегда подпространство.',
      ],
    },
    {
      id: 'main-lemma',
      title: 'Основная лемма о линейной зависимости и равенство длин базисов',
      source: 'Лекция 6, утверждения 32, 33 и 36',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`**Основная лемма.** Если каждый из векторов $\mathbf w_1,\dots,\mathbf w_k$ лежит в $\operatorname{span}\{\mathbf v_1,\dots,\mathbf v_m\}$ и $k>m$, то $\mathbf w_1,\dots,\mathbf w_k$ линейно зависимы.

**Следствие 1.** Если $\mathbf u_1,\dots,\mathbf u_m$ порождают $\mathbb V$, а $\mathbf v_1,\dots,\mathbf v_n\in\mathbb V$ независимы, то $n\le m$.

**Следствие 2.** Любые два базиса конечномерного пространства содержат одинаковое число векторов.`,
      },
      proof: {
        level: 'basic',
        idea: md`Ищем коэффициенты $\lambda_j$, обнуляющие все коэффициенты при $\mathbf v_i$: это однородная система из $m$ уравнений на $k>m$ неизвестных — у неё есть ненулевое решение.`,
        steps: [
          { title: md`Случай $m=0$`, body: md`Тогда все $\mathbf w_j=\mathbf 0$, а при $k\ge1$ система с нулевым вектором зависима.` },
          { title: md`Раскладываем $\mathbf w_j$`, body: md`$\mathbf w_j=a_{1j}\mathbf v_1+\dots+a_{mj}\mathbf v_m$, $j=1,\dots,k$. В $\sum_j\lambda_j\mathbf w_j$ коэффициент при $\mathbf v_i$ равен $a_{i1}\lambda_1+\dots+a_{ik}\lambda_k$.` },
          { title: md`Однородная система с $k>m$`, body: md`Система $\sum_ja_{ij}\lambda_j=0$, $i=1,\dots,m$: $m$ уравнений, $k>m$ неизвестных. Ведущих элементов не больше $m$, значит, есть свободная переменная и ненулевое решение $(\lambda_1,\dots,\lambda_k)$.` },
          { title: md`Это зависимость`, body: md`Для него $\sum\lambda_j\mathbf w_j=\sum_i0\cdot\mathbf v_i=\mathbf 0$, а не все $\lambda_j$ равны нулю. Независимость $\mathbf v_i$ не нужна.` },
          { title: md`Следствие 1`, body: md`Все $\mathbf v_i$ лежат в $\mathbb V=\operatorname{span}\{\mathbf u_1,\dots,\mathbf u_m\}$. Если бы $n>m$, по лемме они были бы зависимы. Значит, $n\le m$.` },
          { title: md`Следствие 2`, body: md`Пусть базисы из $n$ и $m$ векторов. Первый порождает, второй независим: $m\le n$. Меняем роли: $n\le m$. Значит, $m=n$ — и размерность определена корректно.` },
        ],
      },
      notes: md`Типичные применения: 4 вектора в $\mathbb R^3$ всегда зависимы; 2 вектора не порождают $\mathbb R^3$; $\dim\mathbb V$ не зависит от выбора базиса.`,
      pitfalls: [
        md`Лемма не требует независимости $\mathbf v_1,\dots,\mathbf v_m$.`,
        'Ключевой факт, на который опирается лемма: однородная система, в которой неизвестных больше, чем уравнений, имеет ненулевое решение. Его нужно назвать и объяснить (свободная переменная).',
      ],
    },
    {
      id: 'extend-to-basis',
      title: 'Дополнение линейно независимой системы до базиса',
      source: 'Лекция 6, утверждение 35, п. 2',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Любую линейно независимую систему $\mathbf v_1,\dots,\mathbf v_k$ в конечномерном пространстве $\mathbb V$ можно дополнить до базиса $\mathbb V$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Берём конечную порождающую систему и по очереди добавляем те её векторы, которые не выражаются через уже выбранные: независимость сохраняется, а в конце выбранные порождают всё.`,
        steps: [
          { title: md`Порождающая система`, body: md`$\mathbb V$ конечномерно, поэтому есть конечная порождающая система $\mathbf u_1,\dots,\mathbf u_m$.` },
          { title: md`Добавляем по одному`, body: md`Начинаем с $\mathbf v_1,\dots,\mathbf v_k$ и просматриваем $\mathbf u_1,\dots,\mathbf u_m$ по очереди. Если $\mathbf u_i$ лежит в оболочке уже выбранных, пропускаем его, иначе добавляем.` },
          { title: md`Независимость сохраняется`, body: md`По утверждению 31: если система независима и $\mathbf w$ не лежит в её оболочке, то после добавления $\mathbf w$ она остаётся независимой. Значит, на каждом шаге выбранная система независима.` },
          { title: md`В конце — базис`, body: md`Каждый $\mathbf u_i$ либо добавлен, либо выражается через выбранные; оболочка выбранных содержит все $\mathbf u_i$ и потому равна $\mathbb V$. Выбранная система независима и порождает $\mathbb V$ — это базис, содержащий $\mathbf v_1,\dots,\mathbf v_k$.` },
        ],
      },
      notes: md`На практике: координаты $\mathbf v_i$ — **строками** матрицы, приводим к RREF; для каждого столбца без ведущей единицы добавляем соответствующий вектор стандартного базиса.

Это утверждение — главный инструмент дальше: теорема о размерностях, «всякое подпространство — ядро», канонический вид матрицы.`,
      pitfalls: [
        'Дополнение не единственно.',
        'Дополнять можно только независимую систему; зависимую нельзя: в базисе нет зависимостей.',
        md`Почему «добавленный вектор не ломает независимость» — это утверждение 31, его нужно назвать, а не пропустить.`,
      ],
    },
    {
      id: 'subspace-dim',
      title: 'Подпространство конечномерного пространства: базис и оценка размерности',
      source: 'Лекция 6, утверждение 37, п. 3',
      list: 'core',
      statement: {
        level: 'basic',
        text: md`Пусть $\dim\mathbb V=n$ и $\mathbb U\subseteq\mathbb V$ — подпространство. Тогда $\mathbb U$ конечномерно (у него есть базис), $\dim\mathbb U\le n$, и если $\dim\mathbb U=n$, то $\mathbb U=\mathbb V$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Строим базис $\mathbb U$ «снизу»: добавляем векторы $\mathbb U$ вне оболочки уже выбранных. Независимых векторов в $\mathbb V$ не больше $n$, поэтому процесс остановится.`,
        steps: [
          { title: md`Наращиваем систему`, body: md`Начинаем с пустой системы. Пока её оболочка не равна $\mathbb U$, берём вектор $\mathbf u\in\mathbb U$ вне оболочки и добавляем. По утверждению 31 система остаётся независимой.` },
          { title: md`Процесс конечен`, body: md`Все выбранные векторы независимы и лежат в $\mathbb V$, а $\mathbb V$ порождается $n$ векторами базиса. По следствию основной леммы их не больше $n$. Значит, после не более чем $n$ шагов оболочка станет равна $\mathbb U$.` },
          { title: md`Получился базис`, body: md`Финальная система независима и порождает $\mathbb U$ — базис $\mathbb U$ из не более чем $n$ векторов. Значит, $\mathbb U$ конечномерно и $\dim\mathbb U\le n$.` },
          { title: md`Равенство размерностей`, body: md`Если $\dim\mathbb U=n$, базис $\mathbb U$ — это $n$ независимых векторов в $\mathbb V$, а значит, базис $\mathbb V$ (п. 1 утверждения 37). Тогда $\mathbb V=\operatorname{span}(\text{базиса})=\mathbb U$.` },
        ],
      },
      uses: ['main-lemma', 'extend-to-basis'],
      notes: md`Следствие: если $\mathbb U\subseteq\mathbb W$ и $\dim\mathbb U=\dim\mathbb W$, то $\mathbb U=\mathbb W$ — одного включения достаточно.

Подпространства $\mathbb R^3$: $\{\mathbf 0\}$, прямые и плоскости через ноль, само $\mathbb R^3$.`,
      pitfalls: [
        'Нельзя начинать с «возьмём базис 𝕌»: существование базиса у подпространства — это и есть то, что доказываем.',
        'Без конечномерности 𝕍 утверждение теряет смысл: в бесконечномерном пространстве процесс может не остановиться.',
      ],
    },
    {
      id: 'basis-criteria',
      title: 'Критерии базиса для системы из n векторов в n-мерном пространстве',
      source: 'Лекция 6, утверждение 37, пп. 1 и 2',
      list: 'easy',
      statement: {
        level: 'basic',
        text: md`Пусть $\dim\mathbb V=n$. Тогда
1. любые $n$ линейно независимых векторов образуют базис $\mathbb V$;
2. любая порождающая система из $n$ векторов — базис $\mathbb V$.`,
      },
      proof: {
        level: 'basic',
        idea: md`Дополняем или прореживаем до базиса — но в любом базисе ровно $n$ векторов, так что менять ничего не приходится.`,
        steps: [
          { title: md`П. 1`, body: md`Дополним $n$ независимых векторов до базиса. В базисе ровно $n$ векторов (все базисы одной длины), а у нас уже $n$ — добавлять нечего, система и была базисом.` },
          { title: md`П. 2`, body: md`Извлечём из порождающей системы из $n$ векторов базис. В нём ровно $n$ векторов — выкидывать нечего, система и была базисом.` },
        ],
      },
      uses: ['extend-to-basis', 'extract-basis', 'main-lemma'],
      notes: md`Практически: чтобы проверить, что $n$ векторов в $n$-мерном пространстве — базис, достаточно проверить **одно** из двух условий — независимость или порождение.

Пример: $1,\ 1+t,\ (1+t)^2$ — три независимых многочлена (разные степени) в $\mathbb R[t]_{\le2}$, $\dim=3$, значит, базис.`,
      pitfalls: ['Условие «ровно n векторов» обязательно: n − 1 независимых векторов базисом не будут, n + 1 порождающих — тоже.'],
    },
  ],
};
