import React, { useContext, useEffect } from "react";
import { FavouritesContext } from "./../context/FavouritesContext";
import { Link } from "react-router-dom";
import MoviesList from "../components/MoviesList";
import NoListContent from "../components/NoListContent";
import { pages } from "../utils/config";

interface FavouritesPageProps {}

const FavouritesPage: React.FC<FavouritesPageProps> = ({}) => {
  const { favouriteMovies, showMoreFavMovies, favMoviesDoneLoading } =
    useContext(FavouritesContext);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="favourites-page-container page">
      <h1 className="page-heading">Favourite Movies</h1>
      {/* <p className="description">double tap on a movie poster to add it to your favourites list</p> */}

      {favouriteMovies.length ? (
        <MoviesList
          moviesArr={favouriteMovies}
          fetchMoreHandler={showMoreFavMovies}
          loading={false}
          done={favMoviesDoneLoading}
        />
      ) : (
        <NoListContent
          message="You haven't favourited any movies yet."
          link={pages.popular}
          linkBtnText="See Popular Movies"
        />
      )}
    </div>
  );
};

export default FavouritesPage;
