import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing(){
    
    // Use state to store movies and tv shows
    const [popularMovies, setPopularMovies] = useState([]);
    const [ratedMovies, setRatedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);

    // Allows the naviagtion to the trailer page
    let navigate = useNavigate();
    const to_trailer = (data, type) => {
        let path = `/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
    }

    {/* Fetch shows from the get_data function */}
    useEffect(() => {
        const fetchShows = async() => {
            get_data({url: 'https://api.themoviedb.org/3/movie/popular', set_movie: setPopularMovies})
            get_data({url: 'https://api.themoviedb.org/3/movie/top_rated', set_movie: setRatedMovies})
            get_data({url: 'https://api.themoviedb.org/3/trending/movie/week', set_movie: setTrendingMovies})
            get_data({url: 'https://api.themoviedb.org/3/discover/movie?&language=en-US&with_genres=27', set_movie: setHorrorMovies})
        }
        fetchShows()
    }, [])

    const allContainers = ['popular_movies', 'rated_movies', 'trending_movies', 'horror_movies'];
    scrolling({allContainers});

    return(
            <div className='shows_container'>
                <Movie_Card title="Popular Movies" movies={popularMovies} containerId='popular_movies' onClickHandler={to_trailer} />
                <Movie_Card title="Top Rated Movies" movies={ratedMovies} containerId='rated_movies' onClickHandler={to_trailer} />
                <Movie_Card title="Trending Movies" movies={trendingMovies} containerId='trending_movies' onClickHandler={to_trailer} />
                <Movie_Card title="Horror Movies" movies={horrorMovies} containerId='horror_movies' onClickHandler={to_trailer} />
                <div className='footer'></div>
            </div>
    )
}

const Movie_Card = ({ title, movies, containerId, onClickHandler}) => {
    return (
        <>
            <h3>{title}</h3>
            <div className='movie_container' id={containerId}>
                {movies.map((movie, index) => (
                    <img onClick={() => onClickHandler(movie.id, 'movie')} key={index} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
                ))}
            </div>
        </> 
    )
}

const get_data = async ({ url, set_movie}) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
        }
    };
    const Response = await fetch(url, options);
    const Data = await Response.json();
    set_movie(Data.results);
}

const scrolling = ({allContainers}) => {
    useEffect(() => {
        allContainers.forEach(containerId => {
            const container = document.querySelector(`#${containerId}`);
            let scrollingRight = true;
            let interval;
    
            const startScrolling = () => {
                interval = setInterval(() => {
                    if (scrollingRight){
                        container.scrollLeft += 5;
                        if (container.scrollLeft >= container.scrollWidth - container.clientWidth){
                            scrollingRight = false;
                        }
                    }else {
                        container.scrollLeft -= 5;
                        if (container.scrollLeft <= 0) {
                            scrollingRight = true;
                        }
                    }
                }, 100)
            };
            container.addEventListener('mouseenter', () => clearInterval(interval));
            container.addEventListener('mouseleave', startScrolling);

            startScrolling();
        })
    }, [])
}