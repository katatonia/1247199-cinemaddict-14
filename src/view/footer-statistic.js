import { createElement } from './utils.js';

const createFooterStatistic = (footerStatisticCount) => {
  const stats = footerStatisticCount;
  return `<section class="footer__statistics">
  <p>${stats}</p>
  </section>`;
};

export default class FooterStatistic {
  constructor(footerStatisticCount) {
    this._footerStatisticCount = footerStatisticCount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistic(this._footerStatisticCount);
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
