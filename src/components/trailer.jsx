import { useState, useEffect, React } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from 'react-player';
import Navbar from "./navbar";

const apiKey = import.meta.env.VITE_API_KEY;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
    }
};

export default function Trailer(){

    const location = useLocation();
    // location.state.type is movie or tv
    // location.state.id is the movie or tv show id number

    const [showData, setShowData] = useState([]);
    const [videoLinks, setVideoLinks] = useState([]);
    const [trailerLink, setTrailerLink] = useState([]);

    // Runs this use effect to get the show info and show trailer link
    useEffect(() => {
        const fetchData = async() => {
            //  This gets the info of the movie
            const Response = await fetch(`https://api.themoviedb.org/3/${location.state.type}/${location.state.id}`, options);
            const Data = await Response.json();
            setShowData(Data)

            // This gets the video link based off the movie id
            const linkResponse = await fetch(`https://api.themoviedb.org/3/${location.state.type}/${location.state.id}/videos`, options);
            const LinkData = await linkResponse.json();
            setVideoLinks(LinkData.results)
        }
        fetchData()
    }, [location.state])

    useEffect(() => {
        const findTrailer = videoLinks.filter(link => {
            if (link.type === "Trailer"){
                return (link);
            }
        });
        setTrailerLink(findTrailer)
    }, [videoLinks])

    return (
        <div className="Trailer">
            <Navbar/>
            <div className="TrailerContent">
                <MovieInfo movieInfo={showData}/>
                {trailerLink.length > 0 && trailerLink[0].key && (
                    <ReactPlayer 
                        className='VideoPlayer'
                        controls={true}
                        url={`https://www.youtube.com/watch?v=${trailerLink[0].key}`}
                        width='100%'
                        height='90%'
                    />
                )}
            </div>
        </div>
    )
}

//  This movie card displays the movie name, image, overview, release date, and the genres
const MovieInfo = ({movieInfo}) => {
    return (
        <div className="MovieCard">
            <h2>{movieInfo.title}</h2>
            <img src={'https://image.tmdb.org/t/p/w500' + movieInfo.poster_path} />
            <p id="overview">{movieInfo.overview}</p>
            <p>Release Date: {movieInfo.release_date}</p>
            <p>Genres: {movieInfo.genres && movieInfo.genres.map(genre => genre.name).join(', ')}</p>
        </div>
    )
}