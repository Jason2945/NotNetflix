import { Link } from 'react-router-dom'
import logo from "../assets/imgs/NN_Logo.png"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const apiKey = import.meta.env.VITE_API_KEY;
const options = {
     method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
    }
};


function Navbar(){

    const [query, setQuery] = useState([]);
    const [searchMovie, setSearchMovie] = useState([]);
    const [selectedMovieGenre, setSelectedMovieGenre] = useState('');

    let navigate = useNavigate();
    // Allows the navigation to the trailer page
    const to_trailer = (data, type) => {
        let path = `/notnetflix/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
        setQuery('');
        window.location.reload();
    }

    // Allows the navigation to the movies genre page
    const to_genres = (data, type, category) => {
        let path = `/notnetflix/movies/${encodeURIComponent(category)}`;
        navigate(path,{state:{id:data,type:type,category:category}});
        window.location.reload();
    }

    // Check the search bar to see if the user has any inputs
    const checkInput = (e) => {
        setQuery(e.target.value);
    }

    // Allow toggle dropdown to show most relevant result or closest match to user
    const toggleDropdown = () => {
        let dropdown = document.getElementsByClassName("dropdown")[0];
        if (query.length < 1){
            dropdown.style.display = "none";
        }else {
            dropdown.style.display = "block"
        }
    }

    // Allows the user to search the closest match once there is a result shown
    const searchResult = (e) => {
        if (e.key === 'Enter' && searchMovie.length > 0){
            to_trailer(searchMovie[0].id, 'movie');
        }
    }

    // Get data to find the show from search bar
    useEffect(() => {
        const findMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`, options);
            const data = await response.json();
            setSearchMovie(data.results)
        }
        toggleDropdown();
        findMovies();
    }, [query])

    useEffect(() => {
        switch(selectedMovieGenre){
            case 'action':
                to_genres(28, 'movie', 'Action');
                break;
            case 'adventure':
                to_genres(12, 'movie', 'Adventure');
                break;
            case 'animation':
                to_genres(16, 'movie', 'Animation');
                break;
            case 'comedy':
                to_genres(35, 'movie', 'Comedy');
                break;
            case 'crime':
                to_genres(80, 'movie', 'Crime');
                break;
            case 'documentary':
                to_genres(99, 'movie', 'Documentary');
                break;
            case 'drama':
                to_genres(18, 'movie', 'Drama');
                break;
            case 'family':
                to_genres(10751, 'movie', 'Family');
                break;
            case 'fantasy':
                to_genres(14, 'movie', 'Fantasy');
                break;
            case 'history':
                to_genres(36, 'movie', 'History');
                break;
            case 'horror':
                to_genres(27, 'movie', 'Horror');
                break;
            case 'music':
                to_genres(10402, 'movie', 'Music');
                break;
            case 'mystery':
                to_genres(9648, 'movie', 'Mystery');
                break;
            case 'romance':
                to_genres(10749, 'movie', 'Romance');
                break;
            case 'scifi':
                to_genres(878, 'movie', 'Science Fiction');
                break;
            case 'thriller':
                to_genres(53, 'movie', 'Thriller');
                break;
            case 'war':
                to_genres(10752, 'movie', 'War');
                break;
            case 'western':
                to_genres(37, 'movie', 'Western');
                break;
        }
    },[selectedMovieGenre])

    return(
        <>
        {/*This is the Navigation Bar*/}
        <div className="NavBar">
            <div className="NavBarLeft">
                <img className="NavBar_Logo" src= {logo} alt="Not-Netflix Logo" />
                <div className="NavLinks">
                    <Link to={'/notnetflix/landing'}>
                        <button> Home</button>
                    </Link>

                    <select value={selectedMovieGenre} onChange={(e) => setSelectedMovieGenre(e.target.value)}>
                        <option value="">Movies</option>
                        <option value="action">Action </option>
                        <option value="adventure">Adventure </option>
                        <option value="animation">Animation </option>
                        <option value="comedy">Comedy </option>
                        <option value="action">Crime </option>
                        <option value="action">Documentary </option>
                        <option value="drama">Drama </option>
                        <option value="family">Family </option>
                        <option value="fantasy">Fantasy </option>
                        <option value="history">History </option>
                        <option value="horror">Horror </option>
                        <option value="music">Music </option>
                        <option value="mystery">Mystery </option>
                        <option value="romance">Romance </option>
                        <option value="scifi">Science Fiction </option>
                        <option value="thriller">Thriller </option>
                        <option value="war">War </option>
                        <option value="western">Western </option>
                    </select>

                </div>
            </div>
            
            <div className="NavBarRight">
                <input
                    type='text'
                    placeholder='Search Movies!'
                    value={query}
                    onChange={checkInput}
                    onKeyDown={searchResult}
                />
                <div className="dropdown">
                    {searchMovie.length > 0 && (
                        <button onClick={() => to_trailer(searchMovie[0].id, 'movie')}>{searchMovie[0].title}</button>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}
export default Navbar;