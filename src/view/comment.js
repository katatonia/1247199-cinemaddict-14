import AbstractView from './abstract.js';

const generateFilmComment = (comment) => {
  const { emotionImg, emotion, text, author, date } = comment;
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

const createCommentSection = (comments, img) => {
  let commentsList = '';
  if (comments.length > 0) {
    comments.forEach((comment) => {
      commentsList += generateFilmComment(comment);
    });
  }

  const commentsSection = `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">
    ${commentsList}
    </ul>
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${img && img.src ? `<img src="${img.src}" width="55" height="55" alt="${img.alt}">` : ''}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  </section>`;
  return commentsSection;
};
export default class CommentsSection extends AbstractView {
  constructor(comments, img) {
    super();
    this._comments = comments;
    this._img = img;

    this._markLabels();
  }

  getTemplate() {
    return createCommentSection(this._comments, this._img);
  }

  setImgClickHandler(callback) {
    this._callback.imgClick = callback;
    this._addInputHandler('emoji-angry');
    this._addInputHandler('emoji-puke');
    this._addInputHandler('emoji-sleeping');
    this._addInputHandler('emoji-smile');
  }

  _addInputHandler(id) {
    const input = this.getElement().querySelector(`#${id}`);
    input.addEventListener('click', () => {
      const labelImg = input.label.querySelector('img');
      this._callback.imgClick(labelImg.src, labelImg.alt);
    });
  }

  _markLabels() {
    const labels = this.getElement().getElementsByTagName('LABEL');
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].htmlFor != '') {
        const elem = this.getElement().querySelector(`#${labels[i].htmlFor}`);
        if (elem) {
          elem.label = labels[i];
        }
      }
    }
  }
}
