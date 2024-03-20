import NN_Logo from "../assets/imgs/NN_Logo.png";
import { useNavigate } from 'react-router-dom';
import Background from "../assets/imgs/Background.jpg";

export default function Login(){

    let navigate = useNavigate();

    // Allows the user to move to the profile page once EXPLORE is clicked
    const LoggingIn = () => {
        let path = '/notnetflix/profile';
        navigate(path);
    }

    return(
        <div className="Login_Page">
            <div className="Background_Overlay"/>
            <img className="Background" src={Background} />

            <div className="Login_Page_Content">
                <div className="Title">
                    <h1 id="Not">Not</h1>
                    <h1 id="Netflix">Netflix</h1>
                </div>

                <div className="Info_Box">
                    <img className="Login_Logo" src= {NN_Logo} alt="Not-Netflix Logo" />
                    <button onClick={LoggingIn}> EXPLORE </button>
                </div>
            </div>
        </div>
    )
}