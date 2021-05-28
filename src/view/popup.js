import Smart from './smart.js';
import { createElement } from './utils/render.js';
import CommentsSection from '../view/comment.js';


const createPopupTemplate = (card) => {
  const {
    poster,
    age,
    title,
    titleOriginal,
    rate,
    director,
    writers,
    actors,
    date,
    runtime,
    country,
    genre,
    description,
    isWatchlist,
    isWatched,
    isFavorite,
  } = card;

  return `<section class="film-details" style="z-index: 2;">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${titleOriginal}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rate}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre${genre.length > 1 ? 's' : ''}</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? 'checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? 'checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? 'checked' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container"></div>
  </form>
</section>`;
};

export default class Popup extends Smart {
  constructor(card) {
    super();
    this._card = card;
    this._data = { img: { src: null, alt: null } };

    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
    this._escapePressHandler = this._escapePressHandler.bind(this);
    this._addToWatchlistHandler = this._addToWatchlistHandler.bind(this);
    this._isWatchedHandler = this._isWatchedHandler.bind(this);
    this._isFavoriteHandler = this._isFavoriteHandler.bind(this);
    this._commentsImgHandler = this._commentsImgHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      const bottomSection = this._element.querySelector('.film-details__bottom-container');
      const bottom = new CommentsSection(this._card.comments, this._data.img);
      bottom.setImgClickHandler(this._commentsImgHandler);
      this._bottomElement = bottom.getElement();

      bottomSection.appendChild(this._bottomElement);
    }

    return this._element;
  }

  _commentsImgHandler(src, alt) {
    this.updateData({
      img: {
        src,
        alt,
      },
    });
  }

  setClosePopupHandler(callback) {
    this._callback.close = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closePopupClickHandler);
    document.addEventListener('keydown', this._escapePressHandler);
  }

  setAddToWatchlistHandler(callback) {
    this._callback.addToWatchlist = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._addToWatchlistHandler);
  }

  setMarkAsWatchedHandler(callback) {
    this._callback.isWatched = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._isWatchedHandler);
  }

  setIsFavoriteHandler(callback) {
    this._callback.isFavorite = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._isFavoriteHandler);
  }

  _addToWatchlistHandler() {
    this._callback.addToWatchlist();
  }

  _isWatchedHandler() {
    this._callback.isWatched();
  }

  _isFavoriteHandler() {
    this._callback.isFavorite();
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.close();
  }

  _escapePressHandler(evt) {
    if (evt.code === 'Escape') {
      evt.preventDefault();
      this._callback.close();
      document.removeEventListener('keydown', this._escapePressHandler);
    }
  }

  restoreHandlers() {
    this.setClosePopupHandler(this._callback.close);
    this.setAddToWatchlistHandler(this._callback.addToWatchlist);
    this.setMarkAsWatchedHandler(this._callback.isWatched);
    this.setIsFavoriteHandler(this._callback.isFavorite);
  }
}
