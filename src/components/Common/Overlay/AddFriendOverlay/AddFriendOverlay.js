import React, { useEffect, useState } from "react";
import Overlay from "../Overlay";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";
import { SERVER_ADDRESS } from "../../../Constants/constants";
import Alert from "../../Alert/Alert";
import './AddFriendOverlay.css'

const AddFriendOverlay = ({isFriendsOpen,toggleAddFriendsOverlay}) => {

    const [fName,setFname] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [alertMessage,setAlertMessage] = useState('');
    const [showAlert,setShowAlert] = useState('');
    const [alertClass,setAlertClass] = useState('');


    useEffect(() => {
        console.log("here");
    },[])

    const addFriend = async(e) => {
        e.preventDefault();

        console.log("Here in add Friend");
        if(fName.length === 0) {
            setError("This field cannot be empty");
            return;
        }
        const email = localStorage.getItem('userEmail');
        const obj = {
            "email" : email,
            "FName" : fName
        }
        setLoading(true);
        await axios.post(`${SERVER_ADDRESS}/addFriend`,obj).then((res) => {
            console.log("inside add Friend call");
            if(res.data.code === 100){
                setShowAlert(true);
                setAlertMessage('Friend Added');
                setAlertClass('success');
            } else {
                setShowAlert(true);
                setAlertMessage('PLease try again');
                setAlertClass('failed');
            }
        }).catch((err)=>{
            setShowAlert(true);
            setAlertMessage("Error check console");
            console.log("Error msg -> ",err);
        }).finally(()=>{
            setTimeout(() => {setShowAlert(false); }, 3000);
            setLoading(false);
            setFname('');
        })
        
    }

    return(
        <Overlay isOpen={isFriendsOpen} onClose={toggleAddFriendsOverlay}>
            <Alert message={alertMessage} visible={showAlert} onClose={() => setShowAlert(false)}  alertClass={alertClass}/>
            <div className="addFriendOverlay-main">
                <div className="no-friend-container">
                    <div className="addFriend_top">
                        <h1>Add Friend</h1>
                    </div>
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
            </div>
        </Overlay>
        
    )
}

export default AddFriendOverlay;