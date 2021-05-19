import MovieCard from '../view/movie-card.js';
import Popup from '../view/popup.js';
import CommentsSection from '../view/comment.js';
import { RenderPosition, render } from '../view/utils/render.js';

export default class MoviePresenter {
  constructor(container, handleChangeData) {
    this._container = container;
    this._changeData = handleChangeData;

    this._handleIsWatchedClick = this._handleIsWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleIsFavoriteClick = this._handleIsFavoriteClick.bind(this);
  }

  init(card) {
    this._card = card;
    this._cardComponent = this._createMovieCard(card);
    render(this._container, RenderPosition.BEFOREEND, this._cardComponent);

    this._cardComponent.setCardMarkAsWatched(this._handleIsWatchedClick);
    this._cardComponent.setCardAddToWatchlist(this._handleAddToWatchlistClick);
    this._cardComponent.setCardIsFavorite(() => this._handleIsFavoriteClick(card));
  }

  _createMovieCard(card) {
    const movieCard = new MovieCard(card);
    const movieCardElement = movieCard.getElement();

    const body = document.querySelector('body');

    const handleCloseEvent = () => {
      const popupElement = this._createPopup(card, movieCardElement).getElement();
      body.classList.add('hide-overflow');
      movieCardElement.appendChild(popupElement);
    };

    movieCard.setClickHandler(() => {
      handleCloseEvent();
    });

    return movieCard;
  }

  _createPopup(card, element) {
    const commentsElement = new CommentsSection(card.comments).getElement();
    const popup = new Popup(card);
    const popupElement = popup.getElement(commentsElement);
    const ESC_BUTTON = 'Escape';

    const closePopup = () => {
      element.removeChild(popupElement);
      popup.removeElement();
      document.querySelector('body').classList.remove('hide-overflow');
    };

    popup.setClosePopupClickHandler(() => {
      closePopup();
    });

    const handlerOnEscape = (evt) => {
      if (evt.code === ESC_BUTTON) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', handlerOnEscape);
      }
    };

    document.addEventListener('keydown', handlerOnEscape);

    return popup;
  }

  _handleIsWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isWatched: !this._card.isWatched,
        },
      ),
    );
  }

  _handleAddToWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isWatchlist: !this._card.isWatchlist,
        },
      ),
    );
  }

  _handleIsFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._card,
        {
          isFavorite: !this._card.isFavorite,
        },
      ),
    );
  }
}
