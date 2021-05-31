import nanoid from 'nanoid';
import { getDate, getArrayItem, getRandomInteger, shuffle, getNewArray } from '../view/utils/common.js';
import dayjs from 'dayjs';

const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];
const titles = ['Made For Each Other', 'Popeye Meets Sinbad', 'Sagebrush Trail', 'Santa Claus Conquers The Martians', 'The Dance Of Life', 'The Great Flamarion', 'The Man With The Golden Arm'];
const titleOriginals = ['Made For Each Other', 'Popeye Meets Sinbad', 'Sagebrush Trail', 'Santa Claus Conquers The Martians', 'The Dance Of Life', 'The Great Flamarion', 'The Man With The Golden Arm'];
const directors = ['Anthony Mann', 'Anne Wigton', 'Heinz Herald', 'Richard Weil'];
const commentEmotion = ['smile', 'sleeping', 'puke', 'angry'];
const commentTexts = ['Interesting setting and a good cast', 'Booooooooooring', 'Very very old. Meh', 'Almost two hours? Seriously?'];
const commentAuthors = ['Tim Macoveev', 'John Doe'];

const generateDescription = () => {
  const descriptionSentences = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
  const description = shuffle(descriptionSentences);
  const randomDescription = getRandomInteger(0, 5);
  return getNewArray(description, randomDescription);
};

const generateWritersList = () => {
  const writers = ['Anne Wigton', 'Heinz Herald', 'Richard Weil'];
  const writersList = shuffle(writers);
  const randomWriters = getRandomInteger(0, writers.length);
  return getNewArray(writersList, randomWriters);
};

const generateActorsList = () => {
  const actors = ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'];
  const actorsList = shuffle(actors);
  const randomActors = getRandomInteger(0, actors.length);
  return getNewArray(actorsList, randomActors);
};

const generateCountry = () => {
  const countries = ['USA', 'Canada', 'Germany', 'France'];
  const countriesList = shuffle(countries);
  const randomCountries = getRandomInteger(0, countriesList.lenght);
  return getNewArray(countriesList, randomCountries);
};

const generateGenres = () => {
  const genres = ['Drama', 'Film-Noir', 'Mystery'];
  const genresList = shuffle(genres);
  const randomGenres = getRandomInteger(0, genresList.length);
  return getNewArray(genresList, randomGenres);
};

const getDateNum = (num) => {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
};

const formatDate = (date) => {
  return `${getDateNum(date.getFullYear())}/${getDateNum(date.getMonth() + 1)}/${getDateNum(date.getDate())}
  ${getDateNum(date.getHours())}:${getDateNum(date.getMinutes())}`;
};

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateComments = () => {
  const commentsArray = [];
  for (let i = 0; i <= 50; i++) {
    const comment = {
      id: nanoid(),
      text: getArrayItem(commentTexts),
      emotion: getArrayItem(commentEmotion),
      author: getArrayItem(commentAuthors),
      date: formatDate(getRandomDate(new Date(2012, 0, 1), new Date())),
    };
    comment.emotionImg = comment.emotion + '.png';
    commentsArray.push(comment);
  }
  return commentsArray;
};

const allComments = generateComments();

const generateFilmCard = () => {
  const randomDate = getRandomDate(new Date(1980, 0, 1), new Date(1990, 0, 1));
  const date = dayjs(randomDate);

  return {
    id: nanoid(),
    poster: './images/posters/' + getArrayItem(posters),
    title: getArrayItem(titles),
    titleOriginal: getArrayItem(titleOriginals),
    age: getRandomInteger(0, 18) + '+',
    rate: getRandomInteger(10, 100)/10,
    director: getArrayItem(directors),
    writers: generateWritersList(),
    actors: generateActorsList(),
    date: date.format('DD MMMM YYYY'),
    country: generateCountry(),
    hours: getRandomInteger(1, 3) + 'h',
    minutes: getRandomInteger(1, 59) + 'm',
    genre: generateGenres(),
    description: generateDescription(),
    comments: shuffle(allComments).slice(0, getRandomInteger(0, 5)),
    isWatchlist: Math.random() < 0.5,
    isWatched: Math.random() < 0.5,
    watchedDate: getDate(),
    isFavorite: Math.random() < 0.5,
  };
};

const card = generateFilmCard();

export { card, generateFilmCard, getRandomInteger };
