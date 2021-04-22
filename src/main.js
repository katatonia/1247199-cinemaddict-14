import { createUserTemplate } from './view/user';
import { createMenuTemplate } from './view/menu';
import { createSortTemplate } from './view/sort';
import { createFilmsList, createFilmsListExtra } from './view/films-container';
import { generateFilmCard } from './mock/generate-card.js';
import { createFilmCard } from './view/film-card';
import { createPopupTemplate } from './view/film-popup.js';
import { getRandomInteger } from './mock/generate-card.js';
import { createShowMoreBtn } from './view/show-more-button.js';
import { createFooterStat } from './view/footer-statistic';

const cards = new Array(25).fill().map(generateFilmCard);

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

const watchedMovies = cards.filter((card) => card.isWatched);
const watchedMoviesCount = watchedMovies.length;
const watchlistMovies = cards.filter((card) => card.isWatchlist);
const watchlistMoviesCount = watchlistMovies.length;
const favoriteMovies = cards.filter((card) => card.isFavorite);
const favoriteMoviesCount = favoriteMovies.length;

const header = document.querySelector('.header');
render(header, 'beforeend', createUserTemplate(watchedMoviesCount));

const main = document.querySelector('.main');
render(main, 'beforeend', createMenuTemplate(watchedMoviesCount, watchlistMoviesCount, favoriteMoviesCount));

render(main, 'beforeend', createSortTemplate());
render(main, 'beforeend', createFilmsList());

const filmsContainer = document.querySelector('.films');
const filmsListContainer = document.querySelector('.films-list__container');

let shownFilmsAmount = 0;
for (let i = 0; i < 5; i++) {
  render(filmsListContainer, 'beforeend', createFilmCard(cards[i]));
  shownFilmsAmount++;
}

render(filmsContainer, 'beforeend', createShowMoreBtn());
const showMoreBtn = document.querySelector('.films-list__show-more');

showMoreBtn.addEventListener('click', () => {
  let addedMovies = 0;
  cards.slice(shownFilmsAmount, shownFilmsAmount + 5).forEach((card) => {
    render(filmsListContainer, 'beforeend', createFilmCard(card));
    addedMovies++;
  });

  shownFilmsAmount += addedMovies;
  if (shownFilmsAmount >= cards.length) {
    showMoreBtn.remove();
  }
});

render(filmsContainer, 'beforeend', createFilmsListExtra());
const extra = document.querySelectorAll('.films-list--extra');
let extraContainer;
let randomFilm;
for (let i = 0; i < extra.length; i++) {
  extraContainer = extra[i].querySelector('.films-list__container');
  for (let j = 0; j < 2; j++) {
    randomFilm = getRandomInteger(0, cards.length - 1);
    render(extraContainer, 'beforeend', createFilmCard(cards[randomFilm]));
  }
}

const footerStats = cards.length;
const footer = document.querySelector('.footer');
render(footer, 'beforeend', createFooterStat(footerStats));

//render(footer, 'afterend', createPopupTemplate(cards[0]));
