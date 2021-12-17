import React, { useContext } from 'react'
import {ReactComponent as HeartLogo} from '../assets/images/heart.svg';
import { FavouritesContext } from '../context/FavouritesContext';
import { Movie } from '../utils/config';
import { themeColours } from '../utils/theme';

interface HeartIconProps {
    movie: Movie
}

const HeartIcon:React.FC<HeartIconProps> = ({ movie }) => {
    const {id} = movie
    const { movieIsFavourited, addFavouriteMovie, removeFavouriteMovie } = useContext(FavouritesContext)

    const toggled = movieIsFavourited(id)

    const fillColour =  toggled ? "#ff1111" : themeColours.backgroundColour
    const strokeColour = toggled ? "#ff1111" : themeColours.textColour

    const handleHeartClick = () => {
        !toggled ? addFavouriteMovie(movie)
        : removeFavouriteMovie(id)
    }

    return (
        <HeartLogo onClick={handleHeartClick} fill={fillColour} stroke={strokeColour} strokeWidth="2px" className="heart-icon" />
    )
}

export default HeartIcon