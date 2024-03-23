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
import ExpenseOverlay from "../Common/Overlay/ExpenseOverlay/ExpenseOverlay";
import  commonApiCalls from "../Common/commonApiCalls";

const Home = () =>{

    const [groupsData,setGroupsData] = useState([]);
    const email = localStorage.getItem('userEmail');
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth);
    const [authenticated,setAuth] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const [isOpenExpense,setIsOpenExpense] = useState(false);
    const [groupName,setGroupName] = useState("");
    const [errorMsg,setErrorMsg] = useState("");
    const HomeChild = lazy(() => import('./HomeChild'));
    const navigate = useNavigate();

    const [groupId,setGroupId] = useState('');
    const [showMemberList,setShowMemberList] = useState(false);
    const [listLoading,setListLoading] = useState(false); // For loading member list
    const [loading,setLoading] = useState(false); // for loading group list
    const [overlayLoader,setOverlayLoader] = useState(false);
    const [groupNames,setGroupNames] = useState([]);
    const [memberNames,setMemberNames] = useState([]);

    useEffect(()=>{
        if(isAuth) {
            setAuth(true);
        }
        getGroups();
    },[]);

    const getGroupMembers = async (e) => {
        e.preventDefault();
        setShowMemberList(false);
        setListLoading(true);
        let GroupMembers = []
        for (const group of groupsData) {
            if (group.GId === groupId) {
                GroupMembers = group.GroupMembers;
                break;
            }
        }

        let memberNames = [];
        for(const member of GroupMembers)  {
            const memberName = await commonApiCalls.getNameFromId(member);

            if(memberName) {
                const memberObj = {
                    "UId" : member,
                    "UName" : memberName
                }
                memberNames.push(memberObj);
            }
        }
        setMemberNames(memberNames);
        setShowMemberList(true);
        setListLoading(false);
    }

    const getGroups = async() =>{
        try {
            setLoading(true);
            const response = await axios.get(`${SERVER_ADDRESS}/${email}/getGroups`);
                
                if(response.data.code === 100) {
                    const groupsData = response.data.groupsData;
                    setGroupsData(groupsData);
                    const groupNames = groupsData.map(group => ({
                        "GName": group.GName,
                        "GId": group.GId
                    }));
                    setGroupNames(groupNames);
                } else {
                    alert("Some error in getting group call")
                    setLoading(false);
                }
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Some error caught in getting groups check console");
        }
    }

    const addGroup = async(e) => {
        setOverlayLoader(true);
        e.preventDefault();
        try {
            if(groupName.length === 0){
                setErrorMsg("Please enter group name");
            } else {
                setErrorMsg("");
                const groupData = {
                    email : email,
                    GName : groupName
                };
                await axios.post(`${SERVER_ADDRESS}/addGroup`,groupData).then((res)=>{
                    if(res.data.code === 100){
                        toggleOverlay();
                    }
                    
                }).catch((error)=>{
                    console.log('add Group API Error ->',error);
                })
                getGroups();
                setIsOpen(!isOpen);
            }
        } catch (error) {
            console.log('Error in addGroup ->',error);
        }
        setOverlayLoader(false);
    }

    const toggleOverlay = () => {
        setErrorMsg("");
        setGroupName("");
        setIsOpen(!isOpen);
    }

    const toggleExpenseOverlay = () => {
        setIsOpenExpense(!isOpenExpense);
        setGroupId('');
        setShowMemberList(false);
        setMemberNames([]);
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
                <div className="home_header_buttonGroup">
                    <div className="button_with_tooltip tooltip" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 18 18">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                        </svg>
                        <div className="tooltiptext tooltip-bottom">Add Friend</div>
                    </div>

                    <div className="button_with_tooltip tooltip" onClick={toggleOverlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                        </svg>
                        <div className="tooltiptext tooltip-bottom">Add Group</div>
                    </div>

                    <div className="button_with_tooltip tooltip"  
                        onClick={toggleExpenseOverlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                        <div className="tooltiptext tooltip-bottom">Add Expense</div>
                    </div>
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
                        groupsData.length === 0 ? 
                        <div className="not_login_container">
                            <p>No Groups here. Add Group</p>
                        </div>
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
                                if(group!==null) {
                                    return(
                                        group 
                                        && 
                                        <SplideSlide key={group.GId} className="home_group_slide">
                                            <Suspense fallback={fallbackDiv}>
                                                <HomeChild key={group.GId} groupData={group}/>
                                            </Suspense>
                                                
                                        </SplideSlide> 
                                        
                                    )
                                }
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
                        className="addGroup_form_input"
                        placeholder="Group Name" 
                        value={groupName}
                        onChange={(e)=>{
                            setGroupName(e.target.value);
                        }}
                    />
                    <span className="addGroup_btn_container"> 
                        <button type="submit" >{overlayLoader ? <Spinner size="small"/> : "Add Group"}</button>
                    </span>
                    {errorMsg ? <div className="error_msg">{errorMsg}</div> : null}  
                </form>
            </Overlay>

            <ExpenseOverlay 
                isOpenExpense={isOpenExpense}
                toggleExpenseOverlay = {toggleExpenseOverlay}
                groupNames={groupNames}
                setGroupId={setGroupId}
                memberlist={memberNames}
                groupId={groupId}
                getGroupMembers={getGroupMembers}
                loading={loading}
                showMemberList = {showMemberList}
                listLoading = {listLoading}
            />
            
        </div>
    )
}

export default Home;