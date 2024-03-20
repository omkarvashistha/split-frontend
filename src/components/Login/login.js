import React, { useEffect, useState } from "react";
import './login.css'
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../../Redux/actions/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_ADDRESS, TEST_SERVER } from "../Constants/constants";
import Spinner from "../Common/Spinner/Spinner";

const Login = () =>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth); 
    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();

        if(email.length === 0 || password.length === 0){
            setError("Both fields are required");
            console.log(error);
        } else {
            setError("");
            setLoading(true);
            const userData = {
                email : email,
                password : password
            }
            const url = `${SERVER_ADDRESS}/login`;
            console.log('This is new url',url);
            await axios.post(url,userData).then((res)=>{
                const statusCode = res.data.code;

                if(statusCode === 100){
                    dispatch(setAuthentication(true));
                    localStorage.setItem('isAuth',isAuth);
                    localStorage.setItem('userEmail',email);
                    if(isAuth) {
                        navigate("/main");
                    }
                }
                else {
                    setError("Wrong email or password");
                }
            }).catch((err)=>{
                console.log("Error from login page",err);
            })
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
                    <button className="form_btn" type="submit" >{loading ? <Spinner size="small" color="white" /> : "Login"}</button>
                </form>
            </div>

        </>
    )
}




export default Login;