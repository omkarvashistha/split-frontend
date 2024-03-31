import React, { useEffect,useState } from "react";
import Overlay from "../Overlay";
import DynamicDropdown from "../../DynamicDropdown/DynamicDropdown";
import './ExpenseOverlay.css'
import Spinner from "../../Spinner/Spinner";
import FriendList from "../../FriendList/FriendList";

const ExpenseOverlay = ({
    isOpenExpense,
    toggleExpenseOverlay,
    groupNames = [],
    setGroupId,
    memberlist,
    groupId,
    getGroupMembers,
    amount = '',
    loading = true,
    showMemberList = false,
    listLoading = false,
    toggleOverlay,
    friends = [],
    getFriends
    }) => {

    const [members, setMembers] = useState(memberlist.map(member => ({
        ...member,
        value: 0,
        isSelected: false,
    })));

    /*Overlay States */

    const [description,setDescription] = useState('');
    const [totalAmount,setTotalAmount] = useState('');
    const [error,setError] = useState("");
    const [desError,setDesError] = useState(false);
    const [amtError,setAmtError] = useState(false);
    const [isEqual,setIsEqual] = useState(true);

    const [friendLoader,setFriendLoader] = useState(false);
    const [openFriendList,setOpenFriendList] = useState(false);

    useEffect(()=>{
        console.log(members);
        setMembers(memberlist.map(member => ({
            ...member,
            value: 0, // Initialize additional properties as needed
            isSelected: false,
          })));

          return () => {
            setDescription('');
            setTotalAmount('');
            setError('');
          }
    },[memberlist]);

    const handleGetGroup = async(e) => {
        e.preventDefault();
        if(description === ''){
            setError('Description is empty');
            setDesError(true);
            setAmtError(false);
        }
        else if(totalAmount === '') {
            setDesError(false);
            setAmtError(true);
            setError("Total amount is empty")
        }
        else {
            setError("");
            setDesError(false);
            setAmtError(false);
            setIsEqual(true);
            console.log("here");
            await getGroupMembers();
        }
    }

    const updateMembers = (newMembers) => {
        setMembers(currentMembers => {
            // Concatenate current members with newMembers, avoiding duplicates
            let updatedMembers = [...currentMembers];
            newMembers.forEach(newMember => {
                if (!updatedMembers.some(member => member.UId === newMember.UId)) {
                    updatedMembers.push({ ...newMember, isSelected: false, value: 0 });
                }
            });
    
            // If the total amount is defined and we're dividing equally, update each member's value
            if (totalAmount && updatedMembers.length > 0 && isEqual) {
                const individualAmount = parseFloat(totalAmount) / updatedMembers.length;
                updatedMembers = updatedMembers.map(member => ({
                    ...member,
                    value: individualAmount
                }));
            }
    
            return updatedMembers;
        });
    };

    const getFriendList = async() => {
        setOpenFriendList(true);
        setFriendLoader(true);
        setFriendLoader(false);
    }

    const handleCheckboxChange = (id) => {
        const updatedMembers = members.map((member) => {
          if (member.UId === id) {
            return { ...member, isSelected: !member.isSelected };
          }
          return member;
        });
        //console.log("Updated Member ->",updatedMembers);
        setMembers(updatedMembers);
    };

    const handleInputChange = (id, newValue) => {
        const updatedMembers = members.map((member) => {
            if (member.UId === id) {
                return { ...member, value: newValue };
            }
            return member;
        });
        console.log("Updated Member ->",updatedMembers);
        setMembers(updatedMembers);
    };

    const addTransaction = (event) => {
        event.preventDefault();
        members.forEach(member => {
            if(member.isSelected) {
                const obj = {
                    "UId" : member.UId,
                    "cost" : member.value
                }
                console.log(obj);
            }
        });
    };

    const retryRequest = () => {
        getGroupMembers();
    };

    const desBorder = {
        border : "2px solid red"
    }

    const amtBorder = {
        ...desBorder,
        marginTop : "5px"
    }


    return(
        <Overlay isOpen={isOpenExpense} onClose={toggleExpenseOverlay}>
                <div className="addGroup_top">
                    <h1>Add Your Expense</h1>
                </div>
                <form className="addGroup_form">
                    <DynamicDropdown groupNames={groupNames} setGroupId={setGroupId} loading={loading}/>
                    {groupId!== '' &&
                        <>
                            <input 
                                className="addGroup_form_input"
                                placeholder="Enter a description"
                                value={description}
                                onChange={(e)=>{
                                    setDescription(e.target.value);
                                }}
                                style = {error && desError ? desBorder : {}}
                            />
                            <input 
                                className="addGroup_form_input"
                                style={error && amtError ? amtBorder : {marginTop : "5px"}}
                                placeholder="Amount"
                                value={totalAmount}
                                onChange={(e)=>{
                                    setTotalAmount(e.target.value);
                                }}
                            />
                            {error ? <div style={{color:"red",font:'Poppins',marginTop:"5px",fontSize:"16px"}}>{error}</div> : null}
                            <button className="select_member_btn button" onClick={handleGetGroup}>
                            
                                <span class="button__text">Add Member</span>
                                <span class="button__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg">
                                        <line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line>
                                    </svg>
                                </span>
                            </button>


                            {!showMemberList ?  
                                <>
                                    {listLoading ? <Spinner size="small"/> : null}
                                </>
                                :
                                <div className="member-list-container" 
                                    style={showMemberList ? {visibility : 'visible'} : {visibility : 'hidden'}}
                                >
                                    <div className="member-list-top">
                                        <p>Select Member</p>
                                        <div className="member-list-divide-equal">
                                            <input 
                                                type="checkbox"
                                                checked={isEqual}
                                                onChange={()=>{
                                                    setIsEqual(!isEqual);
                                                }}
                                            />
                                            Divide Equally
                                        </div>
                                    </div>
                                    {members.length === 0  ? null :
                                        members.map((member) => {
                                            let cost = 0;
                                            if(isEqual){
                                                cost = totalAmount/member.length;
                                            }
                                            return (
                                                <>
                                                    <MemberList
                                                        key={member.UId}
                                                        handleCheckboxChange={handleCheckboxChange}
                                                        handleInputChange={handleInputChange}
                                                        isEqual={isEqual}
                                                        amount = {totalAmount}
                                                        member={member}
                                                        totalMember = {members.length}
                                                    />
                                                </> 
                                            )
                                        })}
                                    
                                    <div className="addFriends_btn_container">
                                        <span>Add member to group</span>
                                        <a onClick={getFriendList} className="addFriends_btn" >Show more</a>
                                    </div>

                                    {friendLoader ? 
                                        <Spinner size="small"/>
                                        :
                                        openFriendList 
                                        ? 
                                        <FriendList 
                                            friends={friends} 
                                            getFriends={getFriends} 
                                            updateMembers={updateMembers}
                                            members = {memberlist}
                                        />   : null
                                    }
                                </div>
                            }
                            <button className="add-transaction-btn" onClick={addTransaction}>Add Transaction</button>    

                        </>
                        
                    }
                    
                </form>
        </Overlay>
    )
}

const MemberList = ({
    handleCheckboxChange,
    handleInputChange,
    isEqual,
    amount,
    member,
    totalMember
    }) => {

    const [value,setValue] = useState(amount/totalMember);

    const handleChange = (event) => {
        const newValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (event.target.type === 'checkbox') {
            handleCheckboxChange(member.UId);
        } else {
            handleInputChange(member.UId, newValue);
        }
    };

    useEffect(()=>{
        console.log("isEqual ->",isEqual);
        if(isEqual){
            setValue(amount/totalMember);
        } else {
            setValue(0);
        }
    },[amount, totalMember, isEqual])
    
    return(
        <>       
            <div className="member-list">
                <input
                    type="checkbox"
                    checked={member.isSelected}
                    onChange={handleChange}
                />
                <p>{member.UName}</p>
                <input
                    type="number"
                    value={value}
                    className="member-list-val"
                    onChange={(e) => {
                        setValue(e.target.value);
                        handleChange(e);
                    }}
                />
            </div>  
        </>
    )
}

export default ExpenseOverlay;