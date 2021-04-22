const createMenuTemplate = (watchedMoviesCount, watchlistMoviesCount, favoriteMoviesCount) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchedMoviesCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchlistMoviesCount}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteMoviesCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export { createMenuTemplate };
