import { createUserTemplate } from './view/user';
import { createMenuTemplate } from './view/menu';
import { createSortTemplate } from './view/sort';
import { createFilmsList, createCardRate } from './view/films';
import { generateFilmCard } from './mock/film-card.js';
import { card } from './mock/film-card.js';

const CARD_COUNT = 20;

const cards = new Array(CARD_COUNT).fill().map(generateFilmCard);

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector('.header');
render(header, 'beforeend', createUserTemplate());

const main = document.querySelector('.main');
render(main, 'beforeend', createMenuTemplate());
render(main, 'beforeend', createSortTemplate());
render(main, 'beforeend', createFilmsList(card));
const films = main.querySelector('.films');
render(films, 'beforeend', createCardRate());

for (let i = 0; i < CARD_COUNT; i++) {
  render(main, 'beforeend', createMenuTemplate(cards[i]));
}

