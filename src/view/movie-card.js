import AbstractView from './abstract.js';

const createMovieCard = (card) => {
  const { title, rate, date, hours, minutes, genre, poster, description, comments, isFavorite, isWatched, isWatchlist } = card;

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
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isWatchlist ? ' film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isWatched ? ' film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorite ? ' film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
        </div>
      </article>`;
};

export default class MovieCard extends AbstractView {
  constructor(card) {
    super();
    this._card = card;

    this._openCardHandler = this._openCardHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._markAsWatchedClickHandler = this._markAsWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieCard(this._card);
  }

  _openCardHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  _markAsWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.markAsWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setOpenCardHandler(callback) {
    this._callback.click = callback;
    const element = this.getElement();
    element.querySelector('.film-card__poster').addEventListener('click', this._openCardHandler);
    element.querySelector('.film-card__title').addEventListener('click', this._openCardHandler);
    element.querySelector('.film-card__comments').addEventListener('click', this._openCardHandler);
  }

  setCardAddToWatchlist(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._addToWatchlistClickHandler);
  }

  setCardMarkAsWatched(callback) {
    this._callback.markAsWatchedClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._markAsWatchedClickHandler);
  }

  setCardIsFavorite(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }
}
