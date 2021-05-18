import User from './view/user.js';
import MenuTemplate from './view/menu.js';
import { generateFilmCard } from './mock/generate-card.js';
import { render, RenderPosition } from './view/utils/render.js';
import MovieListPresenter from './presenter/movie-list-presenter.js';
import FooterStatistic from './view/footer-statistic.js';

const CARDS_COUNT = 11;
const cards = new Array(CARDS_COUNT).fill().map(generateFilmCard);

const watchedMovies = cards.filter((card) => card.isWatched);
const watchedMoviesCount = watchedMovies.length;
const watchlistMovies = cards.filter((card) => card.isWatchlist);
const watchlistMoviesCount = watchlistMovies.length;
const favoriteMovies = cards.filter((card) => card.isFavorite);
const favoriteMoviesCount = favoriteMovies.length;

const header = document.querySelector('.header');
render(header, RenderPosition.BEFOREEND, new User(watchedMoviesCount));

const main = document.querySelector('.main');

render(main, RenderPosition.BEFOREEND, new MenuTemplate(watchedMoviesCount, watchlistMoviesCount, favoriteMoviesCount));

const movieListPresenter = new MovieListPresenter(main);
movieListPresenter.init(cards);

const footerStatisticCount = cards.length;
const footer = document.querySelector('.footer');
render(footer, RenderPosition.BEFOREEND, new FooterStatistic(footerStatisticCount));
