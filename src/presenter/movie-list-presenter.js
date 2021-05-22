import Sort from '../view/sort.js';
import MovieList from '../view/movie-list.js';
import ShowMore from '../view/show-more-button.js';
import MovieListExtra from '../view/movie-list-extra.js';
import { render, RenderPosition, HeadersExtra } from '../view/utils/render.js';
import ListEmpty from '../view/list-empty.js';
import MoviePresenter from './movie-presenter.js';
import { updateItem } from '../view/utils/common.js';
import { SortType } from '../view/const.js';

const CARDS_ON_LINE = 5;

export default class MovieListPresenter {
  constructor(container) {
    this._container = container;
    this._renderedCardsCount = CARDS_ON_LINE;
    this._moviePresenters = {};
    this._movieExtraPresenters = {};
    this._currentSortType = SortType.DEFAULT;

    this._movieListSection = new MovieList();
    this._movieContainer = this._movieListSection.getElement().querySelector('.films-list__container');
    this._showMoreButton = new ShowMore();
    this._handleDataChange = this._handleDataChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._shownMoviesCount = 0;
  }

  init(cards) {
    this._cards = cards.slice();
    this._sourcedCards = cards.slice();

    if (cards.length === 0) {
      render(this._container, RenderPosition.BEFOREEND, new ListEmpty().getElement());
    } else {
      this._renderSort();

      render(this._container, RenderPosition.BEFOREEND, this._movieListSection);

      this._renderMovieList(cards);

      this._renderShowMore(cards);

      //this._renderExtra(cards, HeadersExtra.TOP_RATED, (a, b) => (b.rate - a.rate));
      //this._renderExtra(cards, HeadersExtra.MOST_COMMENTED, (a, b) => (b.comments.length - a.comments.length));
    }
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenters)
      .forEach((presenter) => presenter.resetView());
  }

  _sortCards(sortType) {
    this._currentSortType = sortType;

    let sortedCards = this._cards.slice();

    switch (sortType) {
      case SortType.DEFAULT:
        sortedCards = this._sourcedCards.slice();
        break;
      case SortType.DATE:
        sortedCards = sortedCards.sort((a, b) => b.date - a.date);
        break;
      case SortType.RATE:
        sortedCards = sortedCards.sort((a, b) => b.rate - a.rate);
        break;
    }

    this._clearMovieList();
    this._renderMovieList(sortedCards);
    this._renderShowMore(sortedCards);
  }

  _clearMovieList() {
    Object
      .values(this._moviePresenters)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenters = {};
    this._renderedCardsCount = CARDS_ON_LINE;

    this._showMoreButton.getElement().remove();
    this._showMoreButton.removeElement();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);
  }

  _renderSort() {
    this._sortComponent = new Sort();
    render(this._container, RenderPosition.BEFOREEND, this._sortComponent.getElement());
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _createMovieCardElement(container, card) {
    const moviePresenter = new MoviePresenter(container, this._handleDataChange, this._handleModeChange);
    moviePresenter.init(card);
    this._moviePresenters[card.id] = moviePresenter;
  }

  // _createMovieCardExtraElement(container, card) {
  //   const movieExtraPresenter = new MoviePresenter(container, this._handleDataChange);
  //   movieExtraPresenter.init(card);
  //   this._movieExtraPresenters[card.id] = movieExtraPresenter;
  // }

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

  _renderExtra(cards, header) {
    const extraElement = new MovieListExtra(header).getElement();
    render(this._movieListSection, RenderPosition.BEFOREEND, extraElement);
    const sortedCards = cards.slice().sort();

    const movieContainer = extraElement.querySelector('.films-list__container');
    for (let j = 0; j < 2; j++) {
      this._createMovieCardElement(movieContainer, sortedCards[j]);
    }
  }

  _handleDataChange(updatedCard) {
    this._cards = updateItem(this._cards, updatedCard);
    this._moviePresenters[updatedCard.id].init(updatedCard);
    //this._movieExtraPresenters[updatedCard.id].init(updatedCard);
  }
}
