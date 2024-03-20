import Cat_Pic from "../assets/imgs/cat.jpg";
import Dog_Pic from "../assets/imgs/dog.jpg";
import Background from "../assets/imgs/Background.jpg";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { ImageContext } from "./imageContext";

export default function Profile(){

    const { setImageData } = useContext(ImageContext);

    let navigate = useNavigate();
    const To_Landing_Page = (image) => {
        let path = '/notnetflix/landing';
        setImageData(image)
        navigate(path)
    }

    return(
        <div className="Profile_Page">
            <div className="Background_Overlay"/>
            <img className="Background" src={Background} />
            <div className="Profile_Content">
                <img onClick={() => To_Landing_Page('cat')} src={Cat_Pic}/>
                <img onClick={() => To_Landing_Page('dog')} src={Dog_Pic}/>
            </div>
        </div>
    )
}