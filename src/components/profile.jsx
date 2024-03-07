import cat_pic from "../assets/imgs/cat.jpg"
import dog_pic from "../assets/imgs/dog.jpg"
import { useNavigate } from "react-router-dom"

export default function Profile(){

let navigate = useNavigate();
const to_landing_page = () => {
    let path = '/landing';
    navigate(path)
}

    return(
        <div className="profile_page">
            <div className="profile_box">
                <img onClick={to_landing_page} src={cat_pic}/>
                <img onClick={to_landing_page} src={dog_pic}/>
            </div>
        </div>
    )
}