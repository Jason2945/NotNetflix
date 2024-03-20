import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ImageContext } from './imageContext';
import Cat_Pic from '../assets/imgs/cat.jpg';
import Dog_Pic from '../assets/imgs/dog.jpg';

import logo from "../assets/imgs/NN_Logo.png"

const apiKey = import.meta.env.VITE_API_KEY;
const options = {
     method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
    }
};

export default function Navbar(){

    const [query, setQuery] = useState([]);
    const [searchMovie, setSearchMovie] = useState([]);
    const [selectedMovieGenre, setSelectedMovieGenre] = useState('');
    const [profileDropdown, setProfileDropdown] = useState(false);
    const { imageData } = useContext(ImageContext);

    let navigate = useNavigate();
    // Allows the navigation to the trailer page
    const toTrailer = (data, type) => {
        let path = `/notnetflix/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
        setQuery('');
    }

    const loggingOut = () => {
        let path = '/notnetflix';
        navigate(path);
    }

    const changeProfile = () => {
        let path = '/notnetflix/profile';
        navigate(path);
    }

    // Allows the navigation to the movies genre page
    const toGenres = (data, type, category) => {
        let path = `/notnetflix/movie_genre/${encodeURIComponent(category)}`;
        navigate(path,{state:{id:data,type:type,category:category}});
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

    // Allow toggle dropdown for profile setting
    const profileToggleDropdown = () => {
        setProfileDropdown(!profileDropdown);
    }

    // Allows the user to search the closest match once there is a result shown
    const searchResult = (e) => {
        if (e.key === 'Enter' && searchMovie.length > 0){
            toTrailer(searchMovie[0].id, 'movie');
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
                toGenres(28, 'movie', 'Action');
                break;
            case 'adventure':
                toGenres(12, 'movie', 'Adventure');
                break;
            case 'animation':
                toGenres(16, 'movie', 'Animation');
                break;
            case 'comedy':
                toGenres(35, 'movie', 'Comedy');
                break;
            case 'crime':
                toGenres(80, 'movie', 'Crime');
                break;
            case 'documentary':
                toGenres(99, 'movie', 'Documentary');
                break;
            case 'drama':
                toGenres(18, 'movie', 'Drama');
                break;
            case 'family':
                toGenres(10751, 'movie', 'Family');
                break;
            case 'fantasy':
                toGenres(14, 'movie', 'Fantasy');
                break;
            case 'history':
                toGenres(36, 'movie', 'History');
                break;
            case 'horror':
                toGenres(27, 'movie', 'Horror');
                break;
            case 'music':
                toGenres(10402, 'movie', 'Music');
                break;
            case 'mystery':
                toGenres(9648, 'movie', 'Mystery');
                break;
            case 'romance':
                toGenres(10749, 'movie', 'Romance');
                break;
            case 'scifi':
                toGenres(878, 'movie', 'Science Fiction');
                break;
            case 'thriller':
                toGenres(53, 'movie', 'Thriller');
                break;
            case 'war':
                toGenres(10752, 'movie', 'War');
                break;
            case 'western':
                toGenres(37, 'movie', 'Western');
                break;
        }
    },[selectedMovieGenre])

    return(
        <div className="NavBar">
            <div className="NavBarLeft">
                <img className="NavBar_Logo" src= {logo} alt="Not-Netflix Logo" />
                <div className="NavBar_Links">
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
                <div className="Search_Movies">
                    <input
                        type='text'
                        placeholder='Search Movies!'
                        value={query}
                        onChange={checkInput}
                        onKeyDown={searchResult}
                    />
                    <div className="dropdown">
                        {searchMovie.length > 0 && (
                            <button onClick={() => toTrailer(searchMovie[0].id, 'movie')}>{searchMovie[0].title}</button>
                        )}
                    </div>
                </div>
                <div className="ProfilePic">
                    {imageData && imageData==='cat' && <img onClick={profileToggleDropdown} src={Cat_Pic} />}
                    {imageData && imageData==='dog' && <img onClick={profileToggleDropdown} src={Dog_Pic} />}
                    {profileDropdown && (
                        <div className="Profile_Dropdown">
                            <ul>
                                <button onClick={changeProfile}>Profile </button>
                                <button onClick={loggingOut}> Logout </button>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}