/**
 * Новое содержимое появилось на месте старого (следующая карточка, вопрос):
 * показываем блок с начала, если его верх уже уехал за край экрана. Если верх виден, ничего не двигаем.
 */
export function revealTop(el: HTMLElement | null) {
  if (!el) return;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  if (el.getBoundingClientRect().top < margin) el.scrollIntoView({ block: 'start' });
}
