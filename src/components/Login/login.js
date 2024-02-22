import React, { useEffect, useState } from "react";
import './login.css'
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../Redux/actions/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_ADDRESS } from "../Constants/constants";

const Login = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth); 
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        if(email.length === 0 || password.length === 0){
            setError("Both fields are required");
            console.log(error);
        } else {
            setError("");
            const userData = {
                email : email,
                password : password
            }

            await axios.post(`${SERVER_ADDRESS}/login`,userData).then((res)=>{
                const statusCode = res.data.code;

                if(statusCode === 100){
                    dispatch(setAuthentication(true));
                    localStorage.setItem('isAuth',isAuth);
                    localStorage.setItem('userEmail',email);
                    if(isAuth) {
                        navigate("/home");
                    }
                }
                else {
                    setError("Wrong email or password");
                }
            }).catch((err)=>{
                console.log("Error from login page",err);
            })
        }
    }

    useEffect(() => {
        if (isAuth) {
            console.log('isAuth value from login page ->',isAuth);
           // navigate('/home');
        } else {
            console.log("failed here");
        }
    }, [isAuth]);

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
                            type="password"
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    {error ? <div style={{color : "red"}}>{error}</div>:null}
                    <span>
                        <a href="#">Forgot password.?</a>
                    </span>
                    <button className="form_btn" type="submit">Login</button>
                </form>
            </div>

        </>
    )
}

export default Login;