import { createElement } from './utils.js';

const createMovieCard = (card) => {
  const {title, rate, date, hours, minutes, genre, poster, description, comments} = card;

  return `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rate}</p>
        <p class="film-card__info">
          <span class="film-card__year">${date}</span>
          <span class="film-card__duration">${hours} ${minutes}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments" onclick="">${comments.length} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
        </div>
      </article>`;
};

export default class MovieCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createMovieCard(this._card);
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

