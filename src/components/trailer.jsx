import { useState, useEffect, React } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from 'react-player';

export default function Trailer(){

    const location = useLocation();
    const apiKey = import.meta.env.VITE_API_KEY;

    const [showData, setShowData] = useState([]);
    const [getAllLink, setGetAllLink] = useState([]);
    const [trailerLink, setTrailerLink] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            };

            const Response = await fetch(`https://api.themoviedb.org/3/${location.state.type}/${location.state.id}`, options);
            const Data = await Response.json();
            setShowData(Data)

            const linkResponse = await fetch(`https://api.themoviedb.org/3/movie/${location.state.id}/videos`, options);
            const LinkData = await linkResponse.json();
            setGetAllLink(LinkData.results)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const result = getAllLink.filter(link => {
            if (link.type === "Trailer"){
                console.log(link);
                return (link);
            }
        })
        setTrailerLink(result);
    }, [getAllLink])

    useEffect(() => {
        console.log(trailerLink);
        trailerLink.length > 0 && trailerLink[0].key && console.log(trailerLink[0].key)
    }, [trailerLink])

    return (
        <div className="trailer_page">
            <MovieCard movieInfo={showData}/>
            {trailerLink.length > 0 && trailerLink[0].key && (
                <ReactPlayer 
                    url={`https://www.youtube.com/watch?v=${trailerLink[0].key}`}
                    width='100%'
                    height='auto'
                    controls='true'
                />
            )}
        </div>
    )
}

const MovieCard = ({movieInfo}) => {
    return (
        <div className="Movie_Card">
            <h2>{movieInfo.title}</h2>
            <img src={'https://image.tmdb.org/t/p/w500' + movieInfo.poster_path} />
            <p id="overview">{movieInfo.overview}</p>
            <p>Release Date: {movieInfo.release_date}</p>
            <p>Genres: {movieInfo.genres && movieInfo.genres.map(genre => genre.name).join(', ')}</p>
        </div>
    )
}