import { createUserTemplate } from './view/user';
import { createMenuTemplate } from './view/menu';
import { createSortTemplate } from './view/sort';
import { createFilmsList } from './view/films';

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

const header = document.querySelector('.header');
render(header, 'beforeend', createUserTemplate());

const main = document.querySelector('.main');

render(main, 'beforeend', createMenuTemplate());
render(main, 'beforeend', createSortTemplate());
render(main, 'beforeend', createFilmsList());

