import React, { useEffect, useState } from "react";
import './login.css'
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../Redux/actions/actions";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_ADDRESS, TEST_SERVER } from "../Constants/constants";
import Spinner from "../Common/Spinner/Spinner";

const Login = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);


    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth); 
    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
    
        if (email.length === 0 || password.length === 0) {
            setError("Both fields are required");
            console.log(error);
        } else {
            setError("");
            setLoading(true);
            const userData = {
                email: email,
                password: password
            };
            const url = `${SERVER_ADDRESS}/login`;
            console.log('This is new url', url);
            try {
                const res = await axios.post(url, userData);
                const statusCode = res.data.code;
                if (statusCode === 100) {
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
                } else {
                    setError("Wrong email or password");
                }
            } catch (err) {
                console.log("Error from login page", err);
                setError("Login failed due to server error");
            }
            setLoading(false);
        }
    }
    

    useEffect(() => {
        
    }, []);

    return(
        <>
            <div className="login_main">
                
                <form className="login_form" onSubmit={loginUser}>
                    <h2>Login</h2>
                    <div className="login_username login_container">
                        <input 
                            className="form_input"
                            placeholder="Email" 
                            type="text"
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
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ?    
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                </svg>
                                : 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg>
                            }
                        </button>
                    </div>
                    {error ? <div style={{color : "red"}}>{error}</div>:null}
                    <span >
                        <Link to='/signup' className="link">Not a user register here.?</Link>
                    </span>
                    <button className="form_btn" type="submit" >{loading ? <Spinner size="small" color="white" /> : "Login"}</button>
                </form>
            </div>

        </>
    )
}




export default Login;