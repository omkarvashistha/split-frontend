import React, { Suspense, lazy, useEffect, useState } from "react";
import './Home.css';
import { useSelector } from "react-redux";
import Overlay from "../Common/Overlay/Overlay";
import axios from "axios";
import { SERVER_ADDRESS, TEST_SERVER } from "../Constants/constants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css/sea-green';
import { useNavigate } from "react-router-dom";
import Spinner from "../Common/Spinner/Spinner";

const Home = () =>{

    const [groupsData,setGroupsData] = useState([]);
    const email = localStorage.getItem('userEmail');
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth);
    const [authenticated,setAuth] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [groupName,setGroupName] = useState("");
    const [errorMsg,setErrorMsg] = useState("");
    const HomeChild = lazy(() => import('./HomeChild'));
    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);
    

    useEffect(()=>{
        console.log('auth redux',typeof(isAuth));
        if(isAuth) {
            setAuth(true);
        }
        getGroups();
        
    },[]);

    const getGroups = async() =>{
        try {
            setLoading(true);
            console.log('auth',authenticated);
            await axios.get(`${SERVER_ADDRESS}/${email}/getGroups`).then((res)=>{
                
                if(res.data.code === 100) {
                    const groupsData = res.data.groupsData;
                    //console.log(groupsData);
                    setGroupsData(groupsData);
                    console.log(groupsData);
                } else {
                    alert("Some error in getting group call")
                }
            }).catch((error)=>{
                console.log(error);
                alert("Error in getting group call check console")
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Some error caught in getting groups check console");
        }
    }

    const addGroup = async(e) => {
        e.preventDefault();
        try {
            if(groupName.length === 0){
                setErrorMsg("Please enter group name");
            } else {
                setErrorMsg("");
                
                const groupData = {
                    email : email,
                    gName : groupName
                };
                await axios.post(`${SERVER_ADDRESS}/addGroup`,groupData).then((res)=>{
                    console.log('add Group api call result ->',res.data.code);
                    if(res.data.code === 100){
                        console.log(res.data);
                        //getGroups();
                        toggleOverlay();
                    }
                    
                }).catch((error)=>{
                    console.log('add Group API Error ->',error);
                })
                await getGroups();
                setIsOpen(!isOpen);
            }
        } catch (error) {
            console.log('Error in addGroup ->',error);
        }
    }

    const toggleOverlay = () => {
        console.log("Overlay Toggle clicked")
        setErrorMsg("");
        setGroupName("");
        setIsOpen(!isOpen);
    }

    const fallbackDiv = () => {
        return(
            <div style={{textAlign : "center"}}>
                Loading....
            </div>
        )
    }

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    const notLoginContainer = () => {
        return(
            <>
                <div className="not_login_container">
                    <p>You are not logged in</p>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </>
        );
    }

    return(
        <div className="home_main">
            <div className="home_header">
                <h1>Your Groups</h1>
                {authenticated && 
                <div className="home_header_addGroup" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 18 18">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                    </svg>
                </div>
                }
            </div>

            
            <div className="home_group_section">
                
                {loading ?
                <Spinner size="large"/>
                :
                !authenticated ? 
                    <>{notLoginContainer()}</>
                    :
                    <Splide 
                        aria-label="user groups"
                        className="home_group_slider_main"
                        options={{
                            type : 'slide',
                            drag : 'free',
                            width : '100%',
                            autoplay : 'pause',
                            fixedWidth : "true",
                        }}
                        tag="section"
                        hasTrack={true}
                    >
                        {groupsData && groupsData.map((group) => {
                            return(
                                group 
                                && 
                                <SplideSlide key={group.GId} className="home_group_slide">
                                    <Suspense fallback={fallbackDiv}>
                                        <HomeChild key={group.GId} groupData={group}/>
                                    </Suspense>
                                        
                                </SplideSlide> 
                                
                            )
                        })}
                    </Splide>
                }
            </div>

            <div className="home_graph_section_container">
                <div className="home_graph_section ">
                    <h1>Your monthly spending</h1>
                    <img src="/barGraph.png"/>
                </div>
                <div className="home_friends_section">
                    <h1>Friends</h1>
                    {!authenticated
                    ?
                    <>{notLoginContainer()}</>:
                    <div className="home_friend_list">
                        <div className="test-main">
                            <div className="test-main-img">
                                <img src="/logo192.png" width={"50px"} height={"50px"}/>
                            </div>
                            <div className="test-main-info">
                                <h2>Person1</h2>
                                <h3>Email</h3>
                            </div>
                        </div>
                        <div className="test-main">
                            <div className="test-main-img">
                                <img src="/logo192.png" width={"50px"} height={"50px"}/>
                            </div>
                            <div className="test-main-info">
                                <h2>Person 2</h2>
                                <h3>Email</h3>
                            </div>
                        </div>
                        <div className="test-main">
                            <div className="test-main-img">
                                <img src="/logo192.png" width={"50px"} height={"50px"}/>
                            </div>
                            <div className="test-main-info">
                                <h2>Person 3</h2>
                                <h3>Email</h3>
                            </div>
                        </div>
                        <div className="test-main">
                            <div className="test-main-img">
                                <img src="/logo192.png" width={"50px"} height={"50px"}/>
                            </div>
                            <div className="test-main-info">
                                <h2>Person 4</h2>
                                <h3>Email</h3>
                            </div>
                        </div>
                    </div>  
                    }
                    
                </div>
            </div>
            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
                <div className="addGroup_top">
                    <h1>Add Group</h1>
                </div>
                <form className="addGroup_form" onSubmit={addGroup}>
                    <input 
                        placeholder="Group Name" 
                        value={groupName}
                        onChange={(e)=>{
                            setGroupName(e.target.value);
                        }}
                    />
                    <span className="addGroup_btn_container"> 
                        <button type="submit" >Add Group</button>
                    </span>
                    {errorMsg ? <div className="error_msg">{errorMsg}</div> : null}  
                </form>
            </Overlay>
        </div>
    )
}

export default Home;