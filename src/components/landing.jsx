import { useState, useEffect } from 'react';

export default function Landing(){

    const apiKey = import.meta.env.VITE_API_KEY
    const [popularMovies, setPopularMovies] = useState([])
    const [popularTV, setPopularTV] = useState([])

    {/*This gets all the moves that are popular */}
    useEffect(() => {
        const fetchShows = async() => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            };
            const PopularMovieResponse = await fetch('https://api.themoviedb.org/3/movie/popular', options);
            const PopularMovieData = await PopularMovieResponse.json();
            setPopularMovies(PopularMovieData.results)

            const PopularTVResponse = await fetch('https://api.themoviedb.org/3/tv/popular', options);
            const PopularTVData = await PopularTVResponse.json();
            setPopularTV(PopularTVData.results)
        }
        fetchShows()
    }, [])

    return(
        <>
            <div className='popular_shows_container'>
                <h2> Popular Movies</h2>
                <div className='popular_movies_img'>
                    {popularMovies.map((movie, index) => (
                        <img key={index} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
                    ))}
                </div>
                
                <h2> Popular TV</h2>
                <div className='popular_tv_img'>
                    {popularTV.map((tv, index) => (
                        <img key={index} src={'https://image.tmdb.org/t/p/w500' + tv.poster_path}/>
                    ))}
                </div>
            </div>
        </>
    )
}