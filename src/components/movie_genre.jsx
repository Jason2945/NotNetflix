import { useState, useEffect, React } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const apiKey = import.meta.env.VITE_API_KEY;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

export default function MovieByGenres(){

    const location = useLocation();
    // location.state.type is movie or tv
    // location.state.id is the genre id

    let navigate = useNavigate();

    const toTrailer = (data, type) => {
        let path = `/NotNetflix/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
    }
    const [fetchGenreMovies, setFetchGenresMovies] = useState([]);

    // Runs this use effect to get the movies based off genre
    useEffect(() => {
        const fetchData = async() => {
            //  This gets the info of the movie for the first 100
            const Response = await fetch(`https://api.themoviedb.org/3/discover/${location.state.type}?language=en-US&with_genres=${location.state.id}`, options);
            const Data = await Response.json();

            const Response2 = await fetch(`https://api.themoviedb.org/3/discover/${location.state.type}?language=en-US&page=2&with_genres=${location.state.id}`, options);
            const Data2 = await Response2.json();

            const Response3 = await fetch(`https://api.themoviedb.org/3/discover/${location.state.type}?language=en-US&page=3&with_genres=${location.state.id}`, options);
            const Data3 = await Response3.json();

            const Response4 = await fetch(`https://api.themoviedb.org/3/discover/${location.state.type}?language=en-US&page=4&with_genres=${location.state.id}`, options);
            const Data4 = await Response4.json();

            const Response5 = await fetch(`https://api.themoviedb.org/3/discover/${location.state.type}?language=en-US&page=5&with_genres=${location.state.id}`, options);
            const Data5 = await Response5.json();

            const combinedDatas = [...Data.results, ...Data2.results, ...Data3.results, ...Data4.results, ...Data5.results]
            setFetchGenresMovies(combinedDatas)
        }
        fetchData()
    }, [location.state])

    return (
        <div className="MovieByGenre">
            <Navbar/>
            <h1>Top 100 {location.state.category} Movies</h1>
            <div className="MovieByGenreContainer">
            {fetchGenreMovies.map((movie, index) => (
                <div className="MovieItem" key={index}>
                    <img className="MovieByGenreImges" onClick={() => toTrailer(movie.id, 'movie')} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
                </div>
            ))}
            </div>
        </div>
    )
}