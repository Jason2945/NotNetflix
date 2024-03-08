import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing(){

    const apiKey = import.meta.env.VITE_API_KEY;
    // Use state to store movies and tv shows

    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [ratedMovies, setRatedMovies] = useState([]);

    let navigate = useNavigate();
    const to_trailer = (data, type) => {
        console.log(data)
        let path = '/trailer';
        navigate(path,{state:{id:data,type:type}})
    }


    // Allow user to scroll left and right to see all movie list
    // const scrolling = (id, e) => {
    //     const container = document.getElementById(id);
    //     if (e.deltaY > 0) {
    //         container.scrollLeft += 100;
    //     } else {
    //         container.scrollLeft -= 100;
    //     }
    // }

    // Function to get data from TMDB

    useEffect(() => {
        const fetchShows = async() => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            };
            {/* Stores the shows into their own arrays */}

            const PopularMovieResponse = await fetch('https://api.themoviedb.org/3/movie/popular', options);
            const PopularMovieData = await PopularMovieResponse.json();
            setPopularMovies(PopularMovieData.results)

            const PopularTVResponse = await fetch('https://api.themoviedb.org/3/tv/popular', options);
            const PopularTVData = await PopularTVResponse.json();
            setPopularTV(PopularTVData.results)

            const RatedMovieResponse = await fetch('https://api.themoviedb.org/3/movie/top_rated', options);
            const RatedMovieData = await RatedMovieResponse.json();
            setRatedMovies(RatedMovieData.results)
            
        }
        fetchShows()
    }, [])

    return(
        <>
            <div className='shows_container'>
                <h3> Popular Movies</h3>
                <div className='popular_movies_container' id='popular_movie' onWheel={(e) => {scrolling('popular_movie', e)}}>
                    {popularMovies.map((movie) => (
                        <img onClick={() => to_trailer(movie.id, 'movie')} key={movie.id} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>              
                    ))}
                </div>
                
                <h3> Popular TV Shows</h3>
                <div className='popular_tv_container' id='popular_tv' onWheel={(e) => {scrolling('popular_tv', e)}}>
                    {popularTV.map((tv, index) => (
                        <img onClick={() => to_trailer(tv.id, 'tv')} key={index} src={'https://image.tmdb.org/t/p/w500' + tv.poster_path}/>
                    ))}
                </div>

                <h3> Top Rated Movies</h3>
                <div className='rated_movies_container' id='rated_movies' onWheel={(e) => {scrolling('rated_movies', e)}}>
                    {ratedMovies.map((movie, index) => (
                        <img onClick={() => to_trailer(movie.id, 'movie')} key={index} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}/>
                    ))}
                </div>
            </div>
        </>
    )
}