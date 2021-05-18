import MovieCard from '../view/movie-card.js';
import Popup from '../view/popup.js';
import CommentsSection from '../view/comment.js';
import { RenderPosition, render } from '../view/utils/render.js';

export default class MoviePresenter {
  constructor(container) {
    this._container = container;
  }

  init(card) {
    const movieCard = this._createMovieCard(card);
    render(this._container, RenderPosition.BEFOREEND, movieCard);
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
}
