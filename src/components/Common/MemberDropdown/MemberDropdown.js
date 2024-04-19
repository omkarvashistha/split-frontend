import React, { useEffect, useState } from "react";
import './MemberDropdown.css';
import DotSpinner from "../Spinner/DotSpinner";

const MemberDropdown = ({ members , setPaidBy , loading = false}) => {
    // State to keep track of the selected member
    const [selectedMember, setSelectedMember] = useState("");
    const [isListVisible, setIsListVisible] = useState(false);

    useEffect(() => {
        console.log("mem --> ", members);
    }, [members]);

    // Function to handle when a new member is selected
    const handleSelectionChange = (MName,MId) => {
        setSelectedMember(MName);
        setPaidBy(MId);
        setIsListVisible(false);
    };

    return (
        <div className='dropdown-main member-main'>
          <label onClick={() => setIsListVisible(!isListVisible)}>
            <span>
                {selectedMember ? selectedMember : "Select a  member" }
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </label>
          {isListVisible && 
            <div className='dropdown-list-container'>
                {!loading  ? 
                    members && members.map((member,index) => {
                      return(
                        <div
                            key={index}
                            className='dropdown-option'
                            onClick={() => handleSelectionChange(member.UName,member.UId)}
                        >
                            {member.UName}
                        </div>
                    )})
                    :
                    <div style={{padding : "1%"}}>
                        <DotSpinner/>
                    </div>
                    
                }
            </div>
            }
          
          </div>
      );
}

export default MemberDropdown;
