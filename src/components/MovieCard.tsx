import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../utils/config";
import {
  getMovieRating,
  getRatingsColour,
  getThumbnailPathFromPosterPath,
} from "./../utils/utils";
import HeartIcon from "./HeartIcon";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { id, title, poster_path, vote_average } = movie;

  const navigate = useNavigate();

  const sashStyles: React.CSSProperties = {
    backgroundColor: getRatingsColour(vote_average),
  };

  const navigateToMovieDetail = () => navigate(`/movie/${movie.id}`);

  return (
    <div className="movie-card-container">
      <div className="movie-card-img-container">
        <img
          onClick={navigateToMovieDetail}
          src={getThumbnailPathFromPosterPath(poster_path)}
          alt={`title ${poster_path}`}
          className="movie-card-thumbnail"
        />
        <div className="movie-card-sash-container">
          <div style={sashStyles} className="movie-card-sash">
            <h4 className="movie-card-rating">
              {getMovieRating(vote_average)}
            </h4>
          </div>
        </div>
      </div>

      <h3 className="movie-card-name">{title}</h3>
      <HeartIcon movie={movie} />
    </div>
  );
};

export default MovieCard;
