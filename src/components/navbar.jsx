import { Link } from 'react-router-dom'
import logo from "../assets/imgs/NN_Logo.png"

function Navbar(){
    return(
        <>
        {/*This is the Navigation Bar*/}
        <div className="NavBar">
            <div className="NavBarLeft">
                <img className="NavBar_Logo" src= {logo} alt="Not-Netflix Logo" />
                <div className="NavLinks">
                    <Link to={'/landing'}>
                        <button> Home</button>
                    </Link>
                </div>
            </div>
            
            <div className="NavBarRight">
                <form>
                    <input/>
                    hello
                </form>
            </div>
        </div>
        </>
    )
}
export default Navbar;