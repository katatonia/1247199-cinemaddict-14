const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];
const titles = ['Made For Each Other', 'Popeye Meets Sinbad', 'Sagebrush Trail', 'Santa Claus Conquers The Martians', 'The Dance Of Life', 'The Great Flamarion', 'The Man With The Golden Arm'];
//const titlesOriginal = ['Original: The Great Flamarion'];\
const directors = ['Anthony Mann', 'Anne Wigton', 'Heinz Herald', 'Richard Weil'];
const commentEmotions = ['smile', 'sleeping', 'puke', 'angry'];
const commentTexts = ['Interesting setting and a good cast', 'Booooooooooring', 'Very very old. Meh', 'Almost two hours? Seriously?'];
const commentAuthors = ['Tim Macoveev', 'John Doe'];


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const shuffle = (array) => {
  const newArray = array.slice(0);
  let currentIndex = newArray.length;
  let temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }
  return newArray;
};

const getNewArray = (array, count) => {
  let current = 0;
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!newArray.includes(array[i])) {
      newArray[current++] = array[i];
    }
    if (newArray.length >= count) {
      break;
    }
  }
  return newArray;
};

const getArrayItem = (array) => {
  const randomItem = getRandomInteger(1, array.length - 1);
  return array[randomItem];
};

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

const getDate = () => {
  const date = new Date();
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
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

const generateFilmsComment = () => {
  return {
    //id: ,
    text: getArrayItem(commentTexts),
    emotion: getArrayItem(commentEmotions),
    author: getArrayItem(commentAuthors),
    date: getDate(),
  };
};

const generateFilmsComments = (count) => {
  return new Array(count).fill('').map(generateFilmsComment);
};

const generateFilmCard = () => {
  return {
    filmInfo: {
      //id: 1,
      poster: getArrayItem(posters),
      title: getArrayItem(titles),
      //titleOriginal: 'Original: The Great Flamarion',
      age: getRandomInteger(0, 18) + '+',
      rate: getRandomInteger(10, 100)/10,
      director: getArrayItem(directors),
      writers: generateWritersList(),
      actors: generateActorsList(),
      release: {
        date: getDate(),
        country: generateCountry(),
      },
      runtime: {
        hours: getRandomInteger(0, 3) + 'h',
        minutes: getRandomInteger(0, 59) + 'm',
      },
      genres: generateGenres(),
      description: generateDescription(),
      comments: generateFilmsComments(getRandomInteger(0, 6)),
    },
    userControls: {
      isWatchlist: Math.random() < 0.5,
      isWatched: Math.random() < 0.5,
      watchedDate: getDate(),
      isFavorite: Math.random() < 0.5,
    },
  };
};

export { generateFilmCard };
