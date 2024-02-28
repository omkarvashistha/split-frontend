import React, { useEffect } from "react";
import './Home.css';

 const HomeChild  = ({groupData}) => {
    useEffect(()=>{
        // Here I would have to get the data for group owner and members
        //console.log(groupData.GId);
    },[])
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
            </div>
        </>
    )
}

export default HomeChild;