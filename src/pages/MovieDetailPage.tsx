import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenresList from "../components/GenresList";
import HeartIcon from "../components/HeartIcon";
import movieLoadingImg from "../assets/images/movie-loading.gif";
import NoListContent from "../components/NoListContent";
import TrelloForm from "../components/TrelloForm";
import { MoviesContext } from "./../context/MoviesContext";
import { Movie, apiBaseURL, pages } from "./../utils/config";
import {
  getImagePathFromPosterPath,
  getMovieRating,
  getMovieYear,
  getRatingsColour,
} from "./../utils/utils";

interface MovieDetailPageProps {}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({}) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieLoading, setMovieLoading] = useState(false);

  const { movies } = useContext(MoviesContext);
  const { id: movieId } = useParams();

  const getSingleMovie = async () => {
    setMovieLoading(true);
    const fetchRes = await fetch(
      `${apiBaseURL}/movie/${movieId}?api_key=d4f7b87d7cedfdfbbb297f46aa3e8779`
    );
    const fetchedMovie = (await fetchRes.json()) as Movie;
    console.log(fetchedMovie);
    if (fetchedMovie.hasOwnProperty("id")) {
      setMovie(fetchedMovie);
    }
    setMovieLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const movieInState = movies.filter(
      (movieObj) => movieId === `${movieObj.id}`
    )[0];

    if (movieInState) setMovie(movieInState);
    else getSingleMovie();
  }, []);

  const movieRatingStyle: React.CSSProperties = {
    backgroundColor: movie ? getRatingsColour(movie.vote_average) : "initial",
  };

  const movieTitle = movie
    ? `${movie.title} (${getMovieYear(movie.release_date)})`
    : "";

  return (
    <div className="movie-detail-page-container page">
      {movie ? (
        <div className="movie-details-wrapper">
          <div className="detail-image-container">
            <img
              src={getImagePathFromPosterPath(movie.poster_path)}
              alt="movie poster"
              className="detail-main-img"
            />
          </div>

          <div className="movie-details-container">
            <h1 className="detail-movie-name">{`${movie.title} (${getMovieYear(
              movie.release_date
            )})`}</h1>

            <h3
              style={movieRatingStyle}
              className="detail-movie-rating"
            >{`Rating - ${getMovieRating(movie.vote_average)}`}</h3>

            <div className="detail-favourite-movie-container">
              <HeartIcon movie={movie} /> <span>add to favourites</span>
            </div>

            <p className="movie-description">{movie.overview}</p>

            <GenresList movie={movie} />
            <TrelloForm movieTitle={movieTitle} />
          </div>
        </div>
      ) : movieLoading ? (
        <div className="detail-loading-icon-container">
          <h3 className="detail-loading-text">movie loading</h3>
          <img
            src={movieLoadingImg}
            alt="loading icon"
            className="detail-loading-icon"
          />
        </div>
      ) : (
        <NoListContent
          message="Sorry. Movie not found."
          link={pages.popular}
          linkBtnText="See Popular Movies"
        />
      )}
    </div>
  );
};

export default MovieDetailPage;
