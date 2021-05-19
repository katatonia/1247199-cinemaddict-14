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

const getDate = () => {
  const date = new Date();

  return date.getFullYear();
};

const getArrayItem = (array) => {
  const randomItem = getRandomInteger(1, array.length - 1);
  return array[randomItem];
};

const updateItem = (items, updatedItem) => {
  const index = items.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1),
  ];
};

export { getNewArray, getRandomInteger, shuffle, getDate, getArrayItem, updateItem };
