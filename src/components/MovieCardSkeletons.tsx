import React from "react";

const MovieCardSkeleton: React.FC = () => {
  console.log("lowding ding");
  return (
    <div className="movie-card-skeleton-container">
      <div className="movie-card-skeleton-img"></div>
      <div className="movie-card-skeleton-text"></div>
      <div className="movie-card-skeleton-text movie-card-skeleton-text-2"></div>
    </div>
  );
};

interface MovieCardSkeletonsProps {
  numOfLoadingSkeletons: number;
}

const MovieCardSkeletons: React.FC<MovieCardSkeletonsProps> = ({
  numOfLoadingSkeletons,
}) => {
  return (
    <div className="loading-skeletons-container">
      {[...new Array(numOfLoadingSkeletons)].map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default MovieCardSkeletons;
