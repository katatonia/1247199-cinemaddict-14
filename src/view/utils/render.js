import AbstractView from '../abstract.js';

const HeadersExtra = {
  MOST_COMMENTED: 'Most commented',
  TOP_RATED: 'Top rated',
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

/**
 * Отрисовывает элемент в контейнере.
 * @param {AbstractView | HTMLElement} container контейнер для отрисовки
 * @param {'afterbegin' | 'beforeend'} place куда отрисовывается элемент в контейнер
 * @param {AbstractView | HTMLElement} child элемент для отрисовки
 */
const render = (container, place, child) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export { HeadersExtra, RenderPosition, render, createElement, replace };
