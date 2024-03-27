import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const apiKey = import.meta.env.VITE_API_KEY;
const account_id = import.meta.env.VITE_MOVIE_ACC_ID;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

export default function Favorites() {

    const [favoriteShows, setFavoriteShows] = useState([]);

    let navigate = useNavigate();

    const toTrailer = (data, type) => {
        let path = `/NotNetflix/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
    }

    useEffect(() => {
        const fetchData = async() => {
            //  This gets the favorite shows
            const Response = await fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies?`, options);
            const Data = await Response.json();
            setFavoriteShows(Data.results)
            console.log(favoriteShows)
        }
        fetchData()
    }, [])

    return(
        <div className="Favorites">
            <Navbar/>
            <div className="FavoritesContent">
                {favoriteShows.map((movie, index) => (
                    <div className="FavMovieInfo" key={index}>
                        <img onClick={() => toTrailer(movie.id, 'movie')} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
                        <div className="FavMovieDescription">
                            <h1>{movie.title}</h1>
                            <h2>{movie.overview}</h2>
                            <p>Released: {movie.release_date}</p>
                            <p>Rating: {movie.vote_average}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}