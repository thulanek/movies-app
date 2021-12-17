import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { Movie, Genre, apiBaseURL } from "../utils/config";

interface IMoviesContext {
  getPopularMovies: () => void;
  genres: Genre[];
  moviesLoading: boolean;
  genresLoading: boolean;
  movies: Movie[];
}

interface IMovieState {
  movies: Movie[];
  paginationPageNum: number;
  moviesLoading: boolean;
}

export const MoviesContext = createContext<IMoviesContext>({
  getPopularMovies: () => {},
  genres: [],
  moviesLoading: true,
  genresLoading: true,
  movies: [],
});

const MoviesContextProvider: React.FC = ({ children }) => {
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesState, setMoviesState] = useState<IMovieState>({
    movies: [],
    paginationPageNum: 1,
    moviesLoading: true,
  });
  // const [moviesLoading, setMoviesLoading] = useState(true);
  const [genresLoading, setGenresLoading] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  // const [paginationPageNum, setPaginationPageNum] = useState(1);

  const { movies, moviesLoading, paginationPageNum } = moviesState;

  const getPopularMovies = async (initialLoad = false) => {
    if (moviesLoading && !initialLoad) return;
    setMoviesState((prev) => ({ ...prev, moviesLoading: true }));
    const fetchRes = await fetch(
      `${apiBaseURL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${paginationPageNum}`
    );
    const fetchMoviesRes = await fetchRes.json();

    // only updating movies if no fetch error & more movies is available.
    if (!fetchMoviesRes?.error && fetchMoviesRes?.results) {
      setMoviesState((prev) => {
        // API returns duplicate data so we filter it out below.
        const fetchedMovies = fetchMoviesRes.results as Movie[];
        const currentMovieIds = prev.movies.map((movieObj) => movieObj.id);
        const moviesToAdd = fetchMoviesRes
          ? fetchedMovies.filter(
              (movieObj) => !currentMovieIds.includes(movieObj.id)
            )
          : [];
        return {
          paginationPageNum: prev.paginationPageNum + 1,
          movies: [...prev.movies, ...moviesToAdd],
          moviesLoading: false,
        };
      });
    } else setMoviesState((prev) => ({ ...prev, moviesLoading: false }));
  };

  const getGenres = async () => {
    setGenresLoading(true);

    const fetchRes = await fetch(
      `${apiBaseURL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const fetchGenresRes = await fetchRes.json();

    if (!fetchGenresRes?.error) setGenres(fetchGenresRes.genres as Genre[]);
    setGenresLoading(false);
  };

  useEffect(() => {
    getPopularMovies(true);
    getGenres();
  }, []);

  return (
    <MoviesContext.Provider
      value={{ genres, genresLoading, getPopularMovies, movies, moviesLoading }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
