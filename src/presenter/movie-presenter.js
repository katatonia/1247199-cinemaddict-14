import MovieCard from '../view/movie-card.js';
import Popup from '../view/popup.js';
import CommentsSection from '../view/comment.js';
import { RenderPosition, render, replace } from '../view/utils/render.js';

const Mode = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};
export default class MoviePresenter {
  constructor(container, handleChangeData, handleModeChange) {
    this._container = container;
    this._changeData = handleChangeData;
    this._changeMode = handleModeChange;
    this.Mode = Mode.CLOSE;
    this._bodyContainer = document.querySelector('body');

    this._handleIsWatchedClick = this._handleIsWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleIsFavoriteClick = this._handleIsFavoriteClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(card) {
    this._card = card;
    const oldСardComponent = this._cardComponent;
    this._cardComponent = this._createMovieCard(card);
    if (oldСardComponent) {
      replace(this._cardComponent, oldСardComponent);
    } else {
      render(this._container, RenderPosition.BEFOREEND, this._cardComponent);
    }

    this._cardComponent.setCardMarkAsWatched(() => this._handleIsWatchedClick(card));
    this._cardComponent.setCardAddToWatchlist(() => this._handleAddToWatchlistClick(card));
    this._cardComponent.setCardIsFavorite(() => this._handleIsFavoriteClick(card));
    this._cardComponent.setClosePopupClickHandler(() => this._handleModeChange(card));
  }

  _createMovieCard(card) {
    const movieCard = new MovieCard(card);

    const handleCloseEvent = () => {
      const popupElement = this._createPopup(card, this._bodyContainer).getElement();
      this._bodyContainer.classList.add('hide-overflow');
      this._bodyContainer.appendChild(popupElement);
    };

    movieCard.setClickHandler(() => {
      handleCloseEvent();
    });

    return movieCard;
  }

  resetView(card, element) {
    if (this._mode !== Mode.CLOSE) {
      this._createPopup(card, element);
    } else {
      this._closePopup();
    }
  }

  _createPopup(card, element) {
    const commentsElement = new CommentsSection(card.comments).getElement();
    const popup = new Popup(card);
    const popupElement = popup.getElement(commentsElement);
    const ESC_BUTTON = 'Escape';

    const closePopup = () => {
      element.removeChild(popupElement);
      popup.removeElement();
      this._bodyContainer.classList.remove('hide-overflow');
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
