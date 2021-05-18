import Sort from '../view/sort.js';
import MovieList from '../view/movie-list.js';
import ShowMore from '../view/show-more-button.js';
import MovieListExtra from '../view/movie-list-extra.js';
import { render, RenderPosition, HeadersExtra } from '../view/utils/render.js';
import ListEmpty from '../view/list-empty.js';
import MoviePresenter from './movie-presenter.js';

const CARDS_ON_LINE = 5;

export default class MovieListPresenter {
  constructor(container) {
    this._container = container;
    this._renderedCardsCount = CARDS_ON_LINE;

    this._movieListSection = new MovieList(); // .films > .films-list > .films-list__container
    this._movieContainer = this._movieListSection.getElement().querySelector('.films-list__container');
    this._showMoreButton = new ShowMore();

    this._shownMoviesCount = 0;
  }

  init(cards) {
    this._cards = cards.slice();

    if (cards.length === 0) {
      render(this._container, RenderPosition.BEFOREEND, new ListEmpty().getElement());
    } else {
      this._renderSort();

      render(this._container, RenderPosition.BEFOREEND, this._movieListSection);

      this._renderMovieList(cards);

      this._renderShowMore(cards);

      this._renderExtra(cards, HeadersExtra.TOP_RATED, (a, b) => (b.rate - a.rate));
      this._renderExtra(cards, HeadersExtra.MOST_COMMENTED, (a, b) => (b.comments.length - a.comments.length));
    }
  }

  _addToFavoritesCallback(card) {
    alert(card);
  }

  _renderSort() {
    render(this._container, RenderPosition.BEFOREEND, new Sort().getElement());
  }

  _createMovieCardElement(container, card) {
    const moviePresenter = new MoviePresenter(container);
    moviePresenter.init(card, this._addToFavoritesCallback);
  }

  _renderMovieList(cards) {
    for (let i = 0; i < this._renderedCardsCount; i++) {
      this._createMovieCardElement(this._movieContainer, cards[i]);
      this._shownMoviesCount++;
    }
  }

  _renderShowMore(cards) {
    if (cards.length <= this._shownMoviesCount) {
      return;
    }

    const movieList = this._movieListSection.getElement().querySelector('.films-list');
    render(movieList, RenderPosition.BEFOREEND, this._showMoreButton);

    this._showMoreButton.setClickHandler(() => {
      let addedMovies = 0;
      cards
        .slice(this._shownMoviesCount, this._shownMoviesCount + this._renderedCardsCount)
        .forEach((card) => {
          this._createMovieCardElement(this._movieContainer, card);
          addedMovies++;
        });

      this._shownMoviesCount += addedMovies;

      if (this._shownMoviesCount >= cards.length) {
        this._showMoreButton.getElement().remove();
      }
    });
  }

  _renderExtra(cards, header, sortFn) {
    const extraElement = new MovieListExtra(header).getElement();
    render(this._movieListSection, RenderPosition.BEFOREEND, extraElement);
    const sortedCards = cards.slice().sort(sortFn);

    const movieContainer = extraElement.querySelector('.films-list__container');
    for (let j = 0; j < 2; j++) {
      this._createMovieCardElement(movieContainer, sortedCards[j]);
    }
  }
}
