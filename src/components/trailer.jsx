import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"

export default function Trailer(){

    const location = useLocation();
    const apiKey = import.meta.env.VITE_API_KEY;

    const [showData, setShowData] = useState([]);

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
        }
        fetchData()
    }, [])

    useEffect(() =>{
        console.log(showData)
    }, [showData])

    return (
        <>
            {showData.title}
        </>
    )
}