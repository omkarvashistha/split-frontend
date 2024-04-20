import React, { useEffect, useState } from "react";
import './FriendSection.css';
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";

const FriendSection = ({ friends, handleLogin, loading , classes = ''}) => {
    // State to track whether to show all friends or only the first four
    const [showAll, setShowAll] = useState(false);

    // Toggle function for showing more or less friends
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    // Get authentication status from Redux store
    const isAuth = useSelector((state) => state.isAuthenticated.isAuth);

    // Function to render not logged in view
    const notLoginContainer = () => (
        <div className="not_login_container">
            <p>You are not logged in</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    );

    // Determine how many friends to show based on `showAll`
    const visibleFriends = showAll ? friends : friends.slice(0, 4);

    return (
        <div className={`home_friends_section ${classes}`}>
            <h1>Friends</h1>
            {!isAuth ? (
                notLoginContainer()
            ) : (
                <div className="home_friend_list">
                    {loading ? (
                        <div style={{ marginBottom: "2%" }}><Spinner size="medium" /></div>
                    ) : friends.length === 0 ? (
                        <div className="not_login_container">
                            <p>No Friends.<br /> Start by adding one</p>
                        </div>
                    ) : (
                        <>
                            {visibleFriends.map((friend, index) => (
                                <div className="test-main" key={index}>
                                    <div className="test-main-img">
                                        <img src="./user.png" alt="User" />
                                    </div>
                                    <div className="test-main-info">
                                        <h2>{friend.UName}</h2>
                                        <h3>{friend.email || null}</h3>
                                    </div>
                                </div>
                            ))}
                            {friends.length > 4 && (
                                <button className="showmore_btn " onClick={toggleShowAll}>
                                    {showAll ? "Show Less" : "Show More"}
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default FriendSection;
