import React, { useEffect } from "react";
import { Movie } from "../utils/config";
import MovieCard from "./MovieCard";
import reelImg from "../assets/images/film.svg";

interface MoviesListProps {
  moviesArr: Movie[];
  loading?: boolean;
  fetchMoreHandler?: () => void;
  done?: boolean;
}

const MoviesList: React.FC<MoviesListProps> = ({
  moviesArr,
  fetchMoreHandler,
  loading,
  done,
}) => {
  useEffect(() => {
    const options = { threshold: 0.1 };

    const elementToObserve = document.querySelector(
      ".intersection-observer-container"
    );

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (!done && !loading && fetchMoreHandler) fetchMoreHandler();
      }
    }, options);

    if (elementToObserve) observer.observe(elementToObserve);

    return () => {
      elementToObserve && observer.unobserve(elementToObserve);
    };
  }, [moviesArr]);

  return (
    <div className="movies-list-wrapper">
      <div className="movies-list-container">
        {moviesArr.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div
        className="loading-reel-wrapper"
        style={{ display: loading && moviesArr.length ? "initial" : "none" }}
      >
        <div className="loading-reel-container">
          <img src={reelImg} alt="film reel" className="loading-reel" />
        </div>
      </div>
      <div
        style={{ display: loading ? "none" : "initial" }}
        className="intersection-observer-container"
      ></div>
    </div>
  );
};

export default MoviesList;
