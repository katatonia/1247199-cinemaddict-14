import { createElement } from './utils.js';

const calcUserRank = (watchedMoviesCount) => {
  if (!watchedMoviesCount) {
    return '';
  } else if (watchedMoviesCount <= 10) {
    return 'Novice';
  } else if (watchedMoviesCount <= 20) {
    return 'Fan';
  } else if (watchedMoviesCount >= 21) {
    return 'Movie Buff';
  }
};

const createUserTemplate = (watchedMoviesCount) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${calcUserRank(watchedMoviesCount)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class User {
  constructor (watchedMoviesCount) {
    this._watchedMoviesCount = watchedMoviesCount;
    this._element = null;
  }

  getTemplate() {
    return createUserTemplate(this._watchedMoviesCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

