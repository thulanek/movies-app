import FavouritesContextProvider from "./context/FavouritesContext";
import MoviesContextProvider from "./context/MoviesContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopularMoviesPage from "./pages/PopularMoviesPage";
import Header from "./components/Header";
import FavouritesPage from "./pages/FavouritesPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { pages } from "./utils/config";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";

const App = () => {
  return (
    <>
      <div className="app-container">
        <Router>
          <Header />
          <MoviesContextProvider>
            <FavouritesContextProvider>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path={pages.favourites} element={<FavouritesPage />} />
                <Route path={pages.popular} element={<PopularMoviesPage />} />
                <Route path={pages.about} element={<AboutPage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
              </Routes>
            </FavouritesContextProvider>
          </MoviesContextProvider>
        </Router>
      </div>
      <Footer />
    </>
  );
};

export default App;
