import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import './Main.css';
import logo from './logo-image.png';

const Main = () => {
    const [component,setComponent] = useState("home");
    const renderComponent = () => {
        switch(component) {
            case 'home' :
                return <Home/>
            default :
                return (
                    <>
                        No Option selected
                    </>
                )
        }
    }

    useEffect(()=>{
    },[])

    return(
        <>
            <div id="main" className="">
                <nav className="main-navbar ">
                    <div className="main-app-logo" style={{marginLeft:"40px"}}>
                        <img src={logo} alt="split logo" width={"100px"} height={"100px"}/>
                    </div>
                    
                    <ul className="main-navbar-options">
                        <li onClick={()=>{setComponent("home")}}>
                           <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" viewBox="0 -2 18 18">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                                </svg>
                            </span> Home
                        </li>
                        <li onClick={()=>{setComponent("home")}}>
                             <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill" viewBox="0 -3 18 18">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                </svg>
                            </span>Friends
                        </li>
                            
                        <li onClick={()=>{setComponent("home")}}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-text" viewBox="0 -2 18 18">
                                    <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                                </svg>
                            </span>Activity
                        </li>
                        <li onClick={()=>{setComponent("home")}}>    
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 -1 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                            </span>Account
                        </li>
                    </ul>
                    <div className="main-navbar-user-info">
                        <div className="main-navbar-user-icon"></div>
                        <div className="main-navbar-user-detail">
                            <h1>Omkar vashistha</h1>
                            <h3>omkarvashistha90@gmail.com</h3>
                        </div>
                    </div>
                </nav>
                <div className="main-selection ">
                    {/**TODO conditional rendering for selection*/}
                    {renderComponent()}
                </div>
            </div>
        </>
    )
}

export default Main;