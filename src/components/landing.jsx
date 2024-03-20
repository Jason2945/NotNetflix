import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const apiKey = import.meta.env.VITE_API_KEY;
const options = {
     method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
    }
};

export default function Landing(){
    
    // useState to store different movie categories
    const [popularMovies, setPopularMovies] = useState([]);
    const [ratedMovies, setRatedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    // Allows the navigation to the trailer page
    let navigate = useNavigate();
    const toTrailer = (data, type) => {
        let path = `/notnetflix/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
    }

    {/* Fetch shows from the getData function */}
    useEffect(() => {
        const fetchShows = async() => {
            getData({url: 'https://api.themoviedb.org/3/movie/popular', setMovie: setPopularMovies})
            getData({url: 'https://api.themoviedb.org/3/movie/top_rated', setMovie: setRatedMovies})
            getData({url: 'https://api.themoviedb.org/3/trending/movie/week', setMovie: setTrendingMovies})
        }
        fetchShows()
    }, [])

    const allContainers = ['popularMovies', 'ratedMovies', 'trendingMovies'];
    scrolling({allContainers});

    // This displays the items on the landing page
    return(
            <div className='Shows'>
                <Navbar/>
                <div className="MovieList">
                    <MovieImage Title="Popular Movies" Movies={popularMovies} containerId='popularMovies' onClickHandler={toTrailer} />
                    <MovieImage Title="Top Rated Movies" Movies={ratedMovies} containerId='ratedMovies' onClickHandler={toTrailer} />
                    <MovieImage Title="Trending Movies" Movies={trendingMovies} containerId='trendingMovies' onClickHandler={toTrailer} />
                </div>
            </div>
    )
}

const MovieImage = ({ Title, Movies, containerId, onClickHandler}) => {
    return (
        <>
            <h3>{Title}</h3>
            <div className='MovieContainer' id={containerId}>
                {Movies.map((movie, index) => (
                    <img onClick={() => onClickHandler(movie.id, 'movie')} key={index} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
                ))}
            </div>
        </> 
    )
}

// This function is to get the info on the movies with the url and the movie genre
const getData = async ({ url, setMovie}) => {
    const Response = await fetch(url, options);
    const Data = await Response.json();
    setMovie(Data.results);
}

// This function takes in all the genre containers and allow it to scroll through all 20 results and stop when hovered
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