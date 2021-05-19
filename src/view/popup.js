import AbstractView from './abstract.js';
import { createElement } from './utils/render.js';

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
    hours,
    minutes,
    country,
    genre,
    description,
    comments,
  } = card;

  return `<section class="film-details" style="z-index: 2">
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
              <td class="film-details__cell">${hours} ${minutes}</td>
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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container"></div>
  </form>
</section>`;
};

export default class Popup extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._card);
  }

  getElement(bottomElement) {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      if (bottomElement) {
        const bottomSection = this._element.querySelector('.film-details__bottom-container');
        bottomSection.appendChild(bottomElement);
      }
    }

    return this._element;
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClosePopupClickHandler(callback) {
    this._callback.click = callback;
    const element = this.getElement();
    element.querySelector('.film-details__close-btn').addEventListener('click', this._closePopupClickHandler);
  }

  _handlerPopupAddToWatchlist() {
    const popupAddToWatchlistButton = document.querySelector('.film-details__control-label--watchlist');

    popupAddToWatchlistButton.addEventListener('click', () => {});
  }

  _handlerPopupMarkAsWatched() {
    const popupMarkAsWatchedButton = document.querySelector('.film-details__control-label--watched');

    popupMarkAsWatchedButton.addEventListener('click', () => {});
  }

  _handlerPopupIsFavorite() {
    const popupIsFavoriteButton = document.querySelector('.film-details__control-label--favorite');

    popupIsFavoriteButton.addEventListener('click', () => {});
  }
}
