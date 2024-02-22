import React, { useEffect, useState } from "react";
import { HomeChild } from "./HomeChild";
import './Home.css';
import { useSelector } from "react-redux";
import Overlay from "../Common/Overlay/Overlay";
import axios from "axios";
import { SERVER_ADDRESS } from "../Constants/constants";

const Home = () =>{

    const [groupsData,setGroupsData] = useState([]);
    const email = localStorage.getItem('userEmail');
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth);
    const [isOpen,setIsOpen] = useState(false);
    const [groupName,setGroupName] = useState("");
    const [errorMsg,setErrorMsg] = useState("");

    useEffect(()=>{
        console.log(isAuth);
        localStorage.setItem('isAuth',false);
        getGroups();
    },[]);

    const getGroups = async() =>{
        try {
            await axios.get(`${SERVER_ADDRESS}/${email}/getGroups`).then((res)=>{
                
                if(res.data.code === 100) {
                    const groupsData = res.data.groupsData;
                    //console.log(groupsData);
                    setGroupsData(groupsData);
                } else {
                    alert("Some error in getting group call")
                }
            }).catch((error)=>{
                console.log(error);
                alert("Error in getting group call check console")
            });
            
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
                setIsOpen(!isOpen);11
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

    return(
        <div className="home_main">
            {groupsData.length > 0 ? 
                groupsData.map((group) => {
                    return(
                        <HomeChild key={group.GId} groupData = {group}/>
                    )
                }) :
                null
            }
            <div className="add_home" onClick={toggleOverlay}>
                <div >
                    Add Group
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