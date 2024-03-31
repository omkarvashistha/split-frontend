import React, { useEffect, useState } from "react";
import './Home.css';
import { SERVER_ADDRESS, TEST_SERVER } from "../Constants/constants";
import Overlay from "../Common/Overlay/Overlay";
import axios from "axios";

 const HomeChild  = ({groupData}) => {

    const {GId,GroupOwner,GName} = groupData
    const [owner,setOwner] = useState(false);
    const [members,setMembers] = useState([]);
    const [isOpen,setIsOpen] = useState(false);

    const getTransactionData = async() => {
        const body = {
            "GId" : GId,
            "UId" : GroupOwner
        }
        await axios.post(`${SERVER_ADDRESS}/getTransactionForGroup`,body).then((res)=>{
        }).catch(()=>{
            
        })
    }

    useEffect(()=>{
        // Here I would have to get the data for group owner and members
        getTransactionData();
        // if()
    },[]);

    function toggleOverlay(){
        setIsOpen(!isOpen);
    }


    return(
        <>
            <div className="home_child_main">
                <span className="home_child_gname">{groupData.GName}</span>
                <span className="home_child_owner">{groupData.GroupOwner}</span>
                {groupData.transactions ? 
                    <div>Your details of cost</div>
                    :
                    <span>No Expenses</span>
                }

                <div className="home_child_btn_group">
                    <div className="home_child_btn tooltip">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                        </svg>
                        <div className="tooltiptext tooltip-bottom">Delete</div>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default HomeChild;