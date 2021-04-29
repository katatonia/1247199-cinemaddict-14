import { createElement } from './utils.js';

const generateFilmComment = (comment) => {
  const {emotionImg, emotion, text, author, date} = comment;
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
  <img src="/images/emoji/${emotionImg}" width="55" height="55" alt="${emotion}">
  </span>
  <div>
  <p class="film-details__comment-text">${text}</p>
  <p class="film-details__comment-info">
  <span class="film-details__comment-author">${author}</span>
  <span class="film-details__comment-day">${date}</span>
  <button class="film-details__comment-delete">Delete</button>
  </p>
  </div>
  </li>`;
};

const createCommentSection = (comments) => {
  let commentsSection = `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  <ul class="film-details__comments-list">`;

  if (comments.length > 0) {
    comments.forEach((comment) => {
      commentsSection += generateFilmComment(comment);
    });
  }
  commentsSection += '</ul>';
  return commentsSection;
};


export default class CommentsSection {
  constructor(comments) {
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createCommentSection(this._comments);
  }

  getElement() {
    if (!this.null) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
