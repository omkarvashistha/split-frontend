import React, { useEffect, useState } from "react";
import FriendSection from "../Common/FriendSection/FriendSection";
import { SERVER_ADDRESS } from "../Constants/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Friends.css';

const Friends = () => {

    const [friends,setFriends] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem('userEmail');

    const classes = 'friends-friend-container';

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    }

    useEffect(()=>{
        getFriends();
    },[]);

    const getFriends = async(e) => {
        try {
            setLoading(true);
            const userObj = {
                "email" : email
            }
            await axios.post(`${SERVER_ADDRESS}/getFriends`,userObj).then((res) => {
                const resFriends = res.data.friends;
                console.log(resFriends);
                if(resFriends.length > 0) {
                    setFriends(resFriends);
                }
            });

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="friends-main-container">
            <FriendSection 
                classes = {classes}
                friends={friends}
                loading={loading}
                handleLogin={handleLogin}
            />
        </div>
    );
}

export default Friends;