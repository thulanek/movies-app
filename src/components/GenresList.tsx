import React, { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";
import { Movie } from "./../utils/config";

/*
GenresList TAKES IN A MOVIE OBJECT AS A PROP AND
USES GENRES FROM THE GLOBAL STATE (MOVIES CONTEXT) TO GET THE GENRE
NAME FROM THE GENRE IDS THE MOVIE OBJECT HAS.
IT THEN MAPS OVER THE LIST OF GENRES AND RETURNS TO BE RENDERED.
*/

interface GenresListProps {
  movie: Movie;
}

const GenresList: React.FC<GenresListProps> = ({ movie }) => {
  const { genres } = useContext(MoviesContext);

  const movieGenres =
    movie && movie.genres
      ? movie.genres.map((genre) => genre.id)
      : movie
      ? movie.genre_ids
      : [];

  return (
    <>
      {genres.length ? (
        <div className="genres-container">
          {movieGenres.map((genreId) =>
            genres.find((genre) => genre.id === genreId) ? (
              <p key={genreId} className="detail-movie-genre">
                {genres.find((genre) => genre.id === genreId)?.name}
              </p>
            ) : null
          )}
        </div>
      ) : (
        <div className="genres-loading-container">loading</div>
      )}
    </>
  );
};

export default GenresList;
