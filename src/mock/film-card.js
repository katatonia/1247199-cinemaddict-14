const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

  const randomDescription = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomDescription];
};

const generateFilmCard = () => {
  return {
    filmInfo: {
      id: 1,
      poster: '../../public/images/posters',
      title: 'The Great Flamarion',
      titleOriginal: 'Original: The Great Flamarion',
      age: '18+',
      rate: '8.9',
      director: 'Anthony Mann',
      writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
      actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
      release: {
        date: '30 March 1945',
        country: 'USA',
      },
      runtime: '1h 18m',
      genres: ['Drama', 'Film-Noir', 'Mystery'],
      description: generateDescription(),
      comments: [$Comment.id$, $Comment.id$],
    },
    userControls: {
      isWatchlist: false,
      isWatched: true,
      watchedDate: '09 April 2020',
      isFavorite: false,
    },
  };
};

generateFilmCard();
