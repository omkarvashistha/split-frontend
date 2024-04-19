import React, { useEffect, useState } from "react";
import '../Login/login.css';
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../Redux/actions/actions";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_ADDRESS } from "../Constants/constants";
import Spinner from "../Common/Spinner/Spinner";

/**
 * 
 Status Code :{
    100 : "success",
    101 : "failed",
    102 : "user already exists",
 } 
 */

const Signup = () => {
        
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth); 
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();

        if(username.length === 0 || password.length === 0 || email.length === 0){
            setError("Both fields are required");
            console.log(error);
        } else {
            setError("");
            setLoading(true);

            const userData = {
                username : username,
                email : email,
                password : password
            }
            // await axios.post(`${SERVER_ADDRESS}/signup`,userData).then((res)=>{
            //     const statusCode = res.data.code;
                
            //     if(statusCode === 102) {
            //         alert('User already exists');
            //     } else if( statusCode === 101) {
            //         alert('Please try again');
            //     } else {
            //         dispatch(setAuthentication(true));
            //         localStorage.setItem('isAuth',isAuth);
            //         localStorage.setItem('userEmail',email);
            //         if(isAuth) {
            //             navigate("/main");
            //         }
            //     }

            // }).catch((err)=>{
            //     console.log(err);
            // })

            try {
                const res = await axios.post(`${SERVER_ADDRESS}/signup`,userData);
                const statusCode = res.data.code;
                if(statusCode === 102) {
                    alert('User already exists');
                } else if( statusCode === 101) {
                    alert('Please try again');
                }
                else{
                    dispatch(setAuthentication(true));
                    localStorage.setItem('userEmail', email);
    
                    // Dispatching the authentication might not instantly update `isAuth`
                    // Therefore, use a manual approach to check if auth is set
                    localStorage.setItem('isAuth', 'true'); // Consider storing strings in localStorage
                    
                    // Move navigation inside the .then block after ensuring auth is set
                    setTimeout(() => {
                        if (localStorage.getItem('isAuth') === 'true') {
                            navigate("/main");
                        }
                    }, 10); // Short delay to ensure state updates are reflected
                }
            } catch (err) {
                console.log("Error from login page", err);
                setError("Login failed due to server error");
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isAuth === true) {
            navigate("/main");
        } else {
            console.log("failed");
        }
    }, [isAuth]);

    return(
        <>
            <div className="login_main">
                
                <form className="login_form" onSubmit={registerUser}>
                    <h2>Create Account</h2>
                    <div className="login_username login_container">
                        <input 
                            className="form_input"
                            placeholder="Username" 
                            type="text"
                            value={username}
                            onChange={(e)=>{
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                    <div className="login_username login_container">
                        <input 
                            className="form_input"
                            placeholder="Email" 
                            type="email"
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="login_password login_container">
                        <input 
                            className="form_input"
                            placeholder="Password" 
                            type="password"
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    {error ? <div style={{color : "red"}}>{error}</div>:null}
                    <span >
                        <Link to="/login" className="link">Login for user</Link>
                    </span>
                    <button className="form_btn" type="submit" >{loading ? <Spinner size="small" color="white" /> : "Register"}</button>
                </form>
            </div>

        </>
    )
}

export default Signup;