import logo from "../assets/imgs/NN_Logo.png"
import { useNavigate } from 'react-router-dom';

export default function Login(){

    let navigate = useNavigate();
    const logging_in = () => {
        let path = '/profile';
        navigate(path)
    }

    return(
        <div className="login_page">

            <h1 id="website_title">Not Netflix</h1>

            {/* Container for the user info */}
            <div className="info_box">

                {/* Display Not Netflix Logo */}
                <img className="login_logo" src= {logo} alt="Not-Netflix Logo" />
                {/* Create button to enter */}
                <button id="explore_button" onClick={logging_in}>EXPLORE</button>

            </div>
        </div>
    )
}