import { ratingsColours } from "./theme";

export const getThumbnailPathFromPosterPath = (poster_path: string) =>
  `https://image.tmdb.org/t/p/w200${poster_path}`;

export const getImagePathFromPosterPath = (poster_path: string) =>
  `https://image.tmdb.org/t/p/w500${poster_path}`;

export const getMovieRating = (vote_average: number) => vote_average * 10;

export const getRatingsColour = (vote_average: number) => {
  const rating = getMovieRating(vote_average);

  return rating === 0
    ? ratingsColours.grey
    : rating < 50
    ? ratingsColours.red
    : rating < 70
    ? ratingsColours.yellow
    : ratingsColours.green;
};

export const getMovieYear = (date: string) => new Date(date).getFullYear();
