import React, { useEffect, useState } from "react";
import './FriendList.css';
import axios from "axios";
import { SERVER_ADDRESS, TEST_SERVER } from "../../Constants/constants";
import Alert from "../Alert/Alert";
import Spinner from "../Spinner/Spinner";

const FriendList = ({friends,getFriends,updateMembers,members}) => {
    const [fName,setFname] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const email = localStorage.getItem('userEmail');
    const [alertMessage, setAlertMessage] = useState('');
    const [error,setError] = useState('');
    const [checked,setChecked] = useState(false);

    const [selectedFriends, setSelectedFriends] = useState(friends.map(member => ({
        ...member,
        value: 0,
        isSelected: false,
    })));

    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setSelectedFriends(friends.map(friend => ({
            ...friend,
            value: 0,
            isSelected: false,
        })));
    },[friends])

    const addFriend = async(e) => {
        e.preventDefault();

        console.log("Here");
        if(fName.length === 0) {
            setError("This field cannot be empty");
            return;
        }

        const obj = {
            "email" : email,
            "FName" : fName
        }
        setLoading(true);
        await axios.post(`${SERVER_ADDRESS}/addFriend`,obj).then((res) => {
            console.log("inside add Friend call");
            if(res.data.code === 100){
                setShowAlert(true);
                setAlertMessage("Friend Added");
                getFriends();
            }
        }).catch((err)=>{
            setShowAlert(true);
            setAlertMessage("Error check console");
            console.log("Error msg -> ",err);
        }).finally(()=>{
            setShowAlert(false);
            setLoading(false);
            setFname('');
        })
        
    }

    const handleCheckboxChange = (id) => {
        const updatedFriends = selectedFriends.map(friend => {
          if (friend.UId === id) {
            return { ...friend, isSelected: !friend.isSelected };
          }
          return friend;
        });
        setSelectedFriends(updatedFriends);
    };

    const addToGroup = (e) => {
        e.preventDefault();
        const selected = selectedFriends.filter(friend => friend.isSelected).map(friend => {
            return { ...friend, isSelected: false, value: 0 }; // Set initial value to 0
        });
        updateMembers(selected);
    };
    
  
    return(
        
        <div className="friendList-container">
            <Alert message={alertMessage} visible={showAlert} onClose={() => setShowAlert(false)} />
            <p className="sub-title" style={{fontWeight : "500"}}>Your Friends</p>
            {friends.length === 0 ? 
                <div className="no-friend-container">
                    <span>No friend start by adding friend</span>
                    <input 
                        type="text"
                        placeholder="Friend Name"
                        className="add-friend-input"
                        value={fName}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    {error && <div>{error}</div>}
                    <button className="add-friend-btn" onClick={addFriend}>Add Friend</button>
                    
                </div>
                :
                <>
                    {selectedFriends.map((friend, index) => (
                        <div className="friendList-item" key={index}>
                            <input 
                            type="checkbox"
                            onChange={() => handleCheckboxChange(friend.UId)}
                            checked={friend.isSelected}
                            />
                            <div className="friendList-name">
                                <span className="span-font">{friend.UName}</span>
                            </div>
                            
                        </div>
                    ))}
                    <button className="add-friend-btn btn-space" onClick={addToGroup}>Select</button>

                    <div className="no-friend-container">
                        <span className="sub-title">Add Friend</span>
                        <input 
                            type="text"
                            placeholder="Friend Name" 
                            className="add-friend-input"
                            value={fName}
                            onChange={(e) => setFname(e.target.value)}
                        />
                        {error && <div>{error}</div>}
                        <button className="add-friend-btn" onClick={addFriend}>{loading ? <Spinner size="small"/> :  "Add Friend"}</button>
                        
                    </div>
                </>
                
            }
        </div>
        
    )
}

export default FriendList;