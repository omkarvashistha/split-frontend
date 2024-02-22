import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
const Navbar = () => {
    return(
        <>
            <div className="navbar-main">
                <div className="navbar-container">
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/home">Friends</Link>
                        </li>
                            
                        <li>
                            <Link to="/home">Activity</Link>  
                        </li>
                        <li>    
                            <Link to="/home">Account</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;