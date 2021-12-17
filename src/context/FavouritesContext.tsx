import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { Movie } from "./../utils/config";

// CONFIG TO STORE FAVOURITED MOVIES IN LOCAL STORAGE.
// AND MAKE THEM GLOBALLY AVAILABLE THROUGH CONTEXT.

// favourite movies global variable types.
interface IFavouritesContext {
  favouriteMovies: Movie[];
  favouriteMovieIds: number[];
  addFavouriteMovie: (movie: Movie) => void;
  removeFavouriteMovie: (movieId: number) => void;
  movieIsFavourited: (movieId: number) => boolean;
  showMoreFavMovies: () => void;
  favMoviesDoneLoading: boolean;
}

interface IFavMoviesObj {
  allFavouriteMovies: Movie[];
  paginationNum: number;
  loading: boolean;
}

export const FavouritesContext = createContext<IFavouritesContext>({
  favouriteMovies: [],
  favouriteMovieIds: [],
  addFavouriteMovie: (_: Movie) => {},
  removeFavouriteMovie: (_: number) => {},
  movieIsFavourited: (_: number) => true,
  showMoreFavMovies: () => {},
  favMoviesDoneLoading: false,
});

const FavouritesContextProvider: React.FC = ({ children }) => {
  const favMoviesLSKey = "favourite_movies";

  // fetching favourite move from local storage and parsing the to usable JS objects.
  const favMoviesInLS = localStorage.getItem(favMoviesLSKey);
  const favMoviesDefault: Movie[] = favMoviesInLS
    ? JSON.parse(favMoviesInLS)
    : [];

  const [favouriteMoviesObj, setFavouriteMoviesObj] = useState<IFavMoviesObj>({
    allFavouriteMovies: favMoviesDefault,
    paginationNum: 1,
    loading: false,
  });

  const { allFavouriteMovies, paginationNum } = favouriteMoviesObj;

  const favouriteMovies = allFavouriteMovies.slice(0, 10 * paginationNum);

  const updateLocalStorage = (updatedFavourites: Movie[]) => {
    localStorage.setItem(favMoviesLSKey, JSON.stringify(updatedFavourites));
  };

  const addFavouriteMovie = (movie: Movie) => {
    const movieAlreadyFavourited = favouriteMoviesObj.allFavouriteMovies
      .map((movieObj) => movieObj.id)
      .includes(movie.id);
    if (!movieAlreadyFavourited)
      setFavouriteMoviesObj((prev) => {
        const updatedFavourites = [movie, ...prev.allFavouriteMovies];
        updateLocalStorage(updatedFavourites);
        return { ...prev, allFavouriteMovies: updatedFavourites };
      });
  };

  // filter selected movie out of state and updating local storage.
  const removeFavouriteMovie = (movieId: number) => {
    setFavouriteMoviesObj((prev) => {
      const updatedFavourites = prev.allFavouriteMovies.filter(
        (movie) => movie.id !== movieId
      );
      updateLocalStorage(updatedFavourites);
      return { ...prev, allFavouriteMovies: updatedFavourites };
    });
  };

  const favouriteMovieIds = allFavouriteMovies.map((movie) => movie.id);

  const movieIsFavourited = (movieId: number) =>
    favouriteMovieIds.includes(movieId);

  const favMoviesDoneLoading =
    favouriteMoviesObj.allFavouriteMovies.length === favouriteMovies.length;

  const showMoreFavMovies = () => {
    if (!favMoviesDoneLoading) {
      setFavouriteMoviesObj((prev) => ({
        ...prev,
        paginationNum: prev.paginationNum++,
        loading: false,
      }));
    }
  };

  // ALL APPS WRAPPED AROUND CONTEXT PROVIDER WILL HAVE ACCESS TO THE
  // addFavouriteMovie, favouriteMovieIds, favouriteMovies, removeFavouriteMovie METHODS AND VARIABLES
  return (
    <FavouritesContext.Provider
      value={{
        favMoviesDoneLoading,
        addFavouriteMovie,
        favouriteMovieIds,
        favouriteMovies,
        removeFavouriteMovie,
        movieIsFavourited,
        showMoreFavMovies,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
