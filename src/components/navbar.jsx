import { Link } from 'react-router-dom'
import logo from "../assets/imgs/NN_Logo.png"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar(){

    const apiKey = import.meta.env.VITE_API_KEY;

    const [query, setQuery] = useState([]);
    const [searchData, setSearchData] = useState([]);

    // Allows the navigation to the trailer page
    let navigate = useNavigate();
    const to_trailer = (data, type) => {
        let path = `/notnetflix/trailer/${encodeURIComponent(data)}`;
        navigate(path,{state:{id:data,type:type}})
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

    // Get data to find the show from search bar
    useEffect(() => {
        const findShows = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            };

            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`, options);
            const data = await response.json();
            setSearchData(data.results)
        }
        toggleDropdown();
        findShows();
    }, [query])

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
                </div>
            </div>
            
            <div className="NavBarRight">
                <input
                    type='text'
                    placeholder='Search Movies!'
                    value={query}
                    onChange={checkInput}
                />
                <div className="dropdown">
                    {searchData.length > 0 && (
                        <button onClick={() => to_trailer(searchData[0].id, 'movie')}>{searchData[0].title}</button>
                    )
                    }
                </div>
            </div>
        </div>
        </>
    )
}
export default Navbar;