import MovieCard from '../view/movie-card.js';
import Popup from '../view/popup.js';
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
    this._closePopup = this._closePopup.bind(this);
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

    this._cardComponent.setCardAddToWatchlist(this._handleAddToWatchlistClick);
    this._cardComponent.setCardMarkAsWatched(this._handleIsWatchedClick);
    this._cardComponent.setCardIsFavorite(this._handleIsFavoriteClick);
  }

  _createMovieCard(card) {
    const movieCard = new MovieCard(card);

    const handleCardClick = () => {
      this._popup = this._createPopup(card, this._bodyContainer);
      this._bodyContainer.classList.add('hide-overflow');
      this._bodyContainer.appendChild(this._popup.getElement());
    };

    movieCard.setOpenCardHandler(() => {
      this._changeMode();
      handleCardClick();
    });

    return movieCard;
  }

  resetView() {
    this._closePopup();
  }

  destroy() {
    this._cardComponent.getElement().remove();
    this._cardComponent.removeElement();
  }

  _closePopup() {
    if (this._popup) {
      this._bodyContainer.removeChild(this._popup.getElement());
      this._popup.removeElement();
      this._popup = null;
      this._bodyContainer.classList.remove('hide-overflow');
    }
  }

  _createPopup(card) {
    this._popup = new Popup(card);
    this._popup.setAddToWatchlistHandler(this._handleAddToWatchlistClick);
    this._popup.setMarkAsWatchedHandler(this._handleIsWatchedClick);
    this._popup.setIsFavoriteHandler(this._handleIsFavoriteClick);

    this._popup.setClosePopupHandler(() => {
      this._closePopup();
    });

    return this._popup;
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
