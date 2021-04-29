import { createElement } from './utils.js';

const createShowMoreButton = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButton();
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
