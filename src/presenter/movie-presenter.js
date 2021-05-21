import MovieCard from '../view/movie-card.js';
import Popup from '../view/popup.js';
import CommentsSection from '../view/comment.js';
import { RenderPosition, render, replace } from '../view/utils/render.js';

const Mode = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};
export default class MoviePresenter {
  constructor(container, handleChangeData) {
    this._container = container;
    this._changeData = handleChangeData;
    this.Mode = Mode.CLOSE;
    this._bodyContainer = document.querySelector('body');

    this._handleIsWatchedClick = this._handleIsWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
    this._handleIsFavoriteClick = this._handleIsFavoriteClick.bind(this);
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
  }

  _createMovieCard(card) {
    const movieCard = new MovieCard(card);

    const handleCardClick = () => {
      this._popup = this._createPopup(card, this._bodyContainer).getElement();
      this._bodyContainer.classList.add('hide-overflow');
      this._bodyContainer.appendChild(this._popup);
    };

    movieCard.setOpenCardHandler(() => {
      handleCardClick();
    });

    return movieCard;
  }

  resetView() {
    if (this._mode !== Mode.CLOSE) {
      this._closePopup();
    }
  }

  _createPopup(card, element) {
    const commentsElement = new CommentsSection(card.comments).getElement();
    const popup = new Popup(card);
    const popupElement = popup.getElement(commentsElement);

    const closePopup = () => {
      element.removeChild(popupElement);
      popup.removeElement();
      this._bodyContainer.classList.remove('hide-overflow');
    };

    popup.setClosePopupHandler(() => {
      closePopup();
    });

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
