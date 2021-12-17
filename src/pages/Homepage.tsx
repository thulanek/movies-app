import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pages } from "../utils/config";
import { FavouritesContext } from "./../context/FavouritesContext";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = ({}) => {
  const { favouriteMovies } = useContext(FavouritesContext);

  const welcomeMsg = `Welcome to the Awesome Movies App. Take a look at the most popular${
    favouriteMovies.length ? " or your favourite" : ""
  }
    movies below.`;

  return (
    <div className="homepage-container page">
      <h1 className="page-heading">Awesome Movies</h1>
      <p className="description">{welcomeMsg}</p>

      <div className="home-btns">
        <Link to={pages.popular}>
          <h3 className="home-link home-popular-movies-link">Popular Movies</h3>
        </Link>
        {favouriteMovies.length > 0 && (
          <Link to={pages.favourites}>
            <h3 className="home-link  home-favourite-movies-link">
              Favourite Movies
            </h3>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Homepage;
