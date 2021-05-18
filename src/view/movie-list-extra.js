import AbstractView from './abstract.js';

const createMovieListExtra = (header) => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">${header}</h2>
  <div class="films-list__container"></div>
  </section>`;
};

export default class MovieListExtra extends AbstractView {
  constructor(header) {
    super();
    this._header = header;
  }

  getTemplate() {
    return createMovieListExtra(this._header);
  }
}

