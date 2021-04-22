const createCommentSection = (comments) => {
  let commentsSection = `
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">`;

  if (comments.length > 0) {
    comments.forEach((comment) => {
      commentsSection += `
      <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotionImg}" width="55" height="55" alt="${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    });
  }
  commentsSection += '</ul>';
  return commentsSection;
};

const generateFilmComment = (comment) => {
  const {emotionImg, emotion, text, author, date} = comment;
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emotionImg}" width="55" height="55" alt="${emotion}">
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

export { generateFilmComment, createCommentSection };
