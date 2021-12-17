import React, { useContext, useEffect } from "react";
import { MoviesContext } from "./../context/MoviesContext";
import MovieCard from "./../components/MovieCard";
import MoviesList from "../components/MoviesList";
import MovieCardSkeletons from "./../components/MovieCardSkeletons";
import NoListContent from "../components/NoListContent";
import { pages } from "../utils/config";

interface PopularMoviesPageProps {}

const PopularMoviesPage: React.FC<PopularMoviesPageProps> = ({}) => {
  const { movies, moviesLoading, getPopularMovies } = useContext(MoviesContext);

  // useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="popular-movies-page-container page">
      <h1 className="page-heading">Popular Movies</h1>

      {!movies.length && moviesLoading ? (
        <MovieCardSkeletons numOfLoadingSkeletons={10} />
      ) : !movies.length && !moviesLoading ? (
        <NoListContent
          link={pages.home}
          message="No popular movies found"
          linkBtnText="Go back home"
        />
      ) : (
        <MoviesList
          moviesArr={movies}
          fetchMoreHandler={getPopularMovies}
          loading={moviesLoading}
        />
      )}
    </div>
  );
};

export default PopularMoviesPage;
