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
    const [allGenres, setAllGenres] = useState([]);
    const [selectedMovieGenre, setSelectedMovieGenre] = useState('');
    const [profileDropdown, setProfileDropdown] = useState(false);
    const { imageData } = useContext(ImageContext);

    let navigate = useNavigate();
    // Allows the navigation to the trailer page
    const toTrailer = (data, type) => {
        let path = `/NotNetflix/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
        setQuery('');
    }

    const loggingOut = () => {
        let path = '/NotNetflix';
        navigate(path);
    }

    const changeProfile = () => {
        let path = '/NotNetflix/profile';
        navigate(path);
    }

    // Allows the navigation to the movies genre page
    const toGenres = (data, type, category) => {
        let path = `/NotNetflix/movie_genre/${encodeURIComponent(category)}`;
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

    // Get all the movie genres from TMDB
    useEffect(() => {
        const getAllGenres = async () => {
            const response = await fetch('https://api.themoviedb.org/3/genre/movie/list', options);
            const data = await response.json();
            setAllGenres(data.genres)
        }
        getAllGenres();
    }, [])

    // Goto the genres page when a genre is selected from the movie list
    useEffect(() => {
        allGenres.find(genre =>{
            if (genre.name === selectedMovieGenre){
                toGenres(genre.id, 'movie', genre.name);
            }
        });
    },[selectedMovieGenre])

    return(
        <div className="NavBar">
            <div className="NavBarLeft">
                <img className="NavBar_Logo" src= {logo} alt="Not-Netflix Logo" />
                <div className="NavBar_Links">
                    <Link to={'/NotNetflix/landing'}>
                        <button> Home</button>
                    </Link>

                    <select value={selectedMovieGenre} onChange={(e) => setSelectedMovieGenre(e.target.value)}>
                        <option value="">Movies</option>
                        {allGenres.map(genre => (
                            <option key={genre.id} value={genre.name}>{genre.name} </option>
                        ))}
                    </select>

                    <Link to={'/NotNetflix/favorites'}>
                        <button> Favorites</button>
                    </Link>

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