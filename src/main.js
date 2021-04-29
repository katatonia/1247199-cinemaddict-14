import User from './view/user.js';
import MenuTemplate from './view/menu.js';
import Sort from './view/sort.js';
import MoviesList from './view/movies-list.js';
import MoviesListExtra from './view/movies-list-extra.js';
import { generateFilmCard } from './mock/generate-card.js';
import Popup from './view/popup.js';
import ShowMore from './view/show-more-button.js';
import FooterStatistic from './view/footer-statistic.js';
import { renderTemplate, renderElement, RenderPosition, getRandomInteger, Headers } from './view/utils.js';
import MovieCard from './view/movie-card.js';

const cards = new Array(25).fill().map(generateFilmCard);

const watchedMovies = cards.filter((card) => card.isWatched);
const watchedMoviesCount = watchedMovies.length;
const watchlistMovies = cards.filter((card) => card.isWatchlist);
const watchlistMoviesCount = watchlistMovies.length;
const favoriteMovies = cards.filter((card) => card.isFavorite);
const favoriteMoviesCount = favoriteMovies.length;

const header = document.querySelector('.header');
renderElement(header, RenderPosition.BEFOREEND, new User(watchedMoviesCount).getElement());

const main = document.querySelector('.main');
renderElement(main, RenderPosition.BEFOREEND, new MenuTemplate(watchedMoviesCount, watchlistMoviesCount, favoriteMoviesCount).getElement());

renderElement(main, RenderPosition.BEFOREEND, new Sort().getElement());
renderElement(main, RenderPosition.BEFOREEND, new MoviesList().getElement());

const moviesContainer = document.querySelector('.films');
const moviesListContainer = document.querySelector('.films-list__container');

let shownMovieAmount = 0;
for (let i = 0; i < 5; i++) {
  renderElement(moviesListContainer, RenderPosition.BEFOREEND, new MovieCard(cards[i]).getElement());
  shownMovieAmount++;
}

renderElement(moviesContainer, RenderPosition.BEFOREEND, new ShowMore().getElement());
const showMoreButton = document.querySelector('.films-list__show-more');

showMoreButton.addEventListener('click', () => {
  let addedMovies = 0;
  cards
    .slice(shownMovieAmount, shownMovieAmount + 5)
    .forEach((card) => renderElement(moviesListContainer, RenderPosition.BEFOREEND, new MovieCard(card).getElement()));

  addedMovies++;
  shownMovieAmount += addedMovies;

  if (shownMovieAmount >= cards.length) {
    showMoreButton.remove();
  }
});

renderElement(moviesContainer, RenderPosition.BEFOREEND, new MoviesListExtra(Headers.TOP_RATED).getElement());
renderElement(moviesContainer, RenderPosition.BEFOREEND, new MoviesListExtra(Headers.MOST_COMMENTED).getElement());

const extra = document.querySelectorAll('.films-list--extra');
let extraContainer;
let randomFilm;
for (let i = 0; i < extra.length; i++) {
  extraContainer = extra[i].querySelector('.films-list__container');
  for (let j = 0; j < 2; j++) {
    randomFilm = getRandomInteger(0, cards.length - 1);
    renderElement(extraContainer, RenderPosition.BEFOREEND, new MovieCard(cards[randomFilm]).getElement());
  }
}

const footerStatisticCount = cards.length;
const footer = document.querySelector('.footer');
renderElement(footer, RenderPosition.BEFOREEND, new FooterStatistic(footerStatisticCount).getElement());
renderElement(footer, RenderPosition.AFTERBEGIN, new Popup(cards[0]).getElement());
