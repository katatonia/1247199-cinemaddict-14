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

// но вообще я бы оставил только одну секцию, и заголовок (top rated или most commented) передавал параметром,
// тогда и дублирования меньше будет, да и с отрисовкой фильмов немного попроще, в том плане что не придётся среди двух секций, которые по селекторам одинаковые, нужную искать

// ну, примерно как ты с рейтингом делала, в конструктор при создании экземпляра передаёшь строку - заголовок, и при создании тэмплэйта её как параметром передаёшь, ну и в createMovieExtra в строку вставляешь
