import AbstractView from './abstract.js';

const createFooterStatistic = (footerStatisticCount) => {
  const stats = footerStatisticCount;
  return `<section class="footer__statistics">
  <p>${stats} movies inside</p>
  </section>`;
};

export default class FooterStatistic extends AbstractView {
  constructor(footerStatisticCount) {
    super();
    this._footerStatisticCount = footerStatisticCount;
  }

  getTemplate() {
    return createFooterStatistic(this._footerStatisticCount);
  }
}
