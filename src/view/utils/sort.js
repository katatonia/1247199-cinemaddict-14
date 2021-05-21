import { SortType } from '../const.js';

export const getSortedCards = (cards, sortType, from, to) => {
  let sortedCards = [];
  const showingFilms = cards.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedCards = showingFilms;
      break;
    case SortType.DATE_DOWN:
      sortedCards = showingFilms.sort((a, b) => b.date - a.date);
      break;
    case SortType.RATING_DOWN:
      sortedCards = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedCards.slice(from, to);
};
