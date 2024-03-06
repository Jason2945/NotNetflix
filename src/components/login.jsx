import logo from "../assets/imgs/NN_Logo.png"

export default function Login(){
    return(
        <div className="Login_Page">
            {/* This is the div for container including login, password, signup, and login */}
            <div className="Login_Box">
                <img className="logo" src= {logo} alt="Not-Netflix Logo" />

                {/* This is the div for the username box */}
                <div className="Username_Box"> 
                    <label>Username</label>
                    <input type="text"></input>
                </div>
                {/* This is the div for the password box */}
                <div className="Password_Box"> 
                    <label>Password</label>
                    <input type="text"></input>
                </div>
                {/* This is the div for the button boxes in login page */}
                <div className="Entry_Buttons">
                    <button className="SignUp_Button">Sign Up</button>
                    <button className="Login_Button">Login</button>
                </div>
                
            </div>
        </div>
    )
}