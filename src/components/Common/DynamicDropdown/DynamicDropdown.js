import React, { useEffect, useState } from 'react';
import './dynamicDropdown.css';
import Spinner from '../Spinner/Spinner';

const DynamicDropdown = ({ groupNames , setGroupId, loading }) => {
    const [selectedGroupName, setSelectedGroupName] = useState('');
    const [isListVisible, setIsListVisible] = useState(false);
  
    const handleSelectionChange = (groupName,groupId) => {
      console.log("groupName -> ",groupName);
      console.log('groupId ->',groupId);
      setSelectedGroupName(groupName);
      setGroupId(groupId);
      setIsListVisible(false);  // Hide the list after selection
    };

  useEffect(()=>{
  },[])

  return (
    <div className='dropdown-main'>
      <label onClick={() => setIsListVisible(!isListVisible)}>
        <span>
            {selectedGroupName ? selectedGroupName : "Select a Group" }
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      </label>
      {isListVisible && 
        <div className='dropdown-list-container'>
            {!loading  ? 
                groupNames && groupNames.map(group => {
                  return(
                    <div
                        key={group.GId}
                        className='dropdown-option'
                        onClick={() => handleSelectionChange(group.GName,group.GId)}
                    >
                        {group.GName}
                    </div>
                )})
                :
                <div style={{padding : "1%"}}>
                    <Spinner size='small'/>
                </div>
                
            }
        </div>
        }
      
      </div>
  );
}

export default DynamicDropdown;
