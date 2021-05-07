import AbstractView from './abstract.js';

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

export default class MovieCard extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCard(this._card);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    const element = this.getElement();
    element.querySelector('.film-card__poster').addEventListener('click', this._closeButtonClickHandler);
    element.querySelector('.film-card__title').addEventListener('click', this._closeButtonClickHandler);
    element.querySelector('.film-card__comments').addEventListener('click', this._closeButtonClickHandler);
  }
}


