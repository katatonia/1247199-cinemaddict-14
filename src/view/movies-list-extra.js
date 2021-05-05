import { createElement } from './utils.js';

const createMoviesListExtra = (header) => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">${header}</h2>
  <div class="films-list__container"></div>
  </section>`;
};

export default class MoviesListExtra {
  constructor(header) {
    this._element = null;
    this._header = header;
  }

  getTemplate() {
    return createMoviesListExtra(this._header);
  }

  getElement() {
    if (!this.null) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

