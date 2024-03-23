import React, { useEffect,useState } from "react";
import Overlay from "../Overlay";
import DynamicDropdown from "../../DynamicDropdown/DynamicDropdown";
import './ExpenseOverlay.css'
import Spinner from "../../Spinner/Spinner";
const ExpenseOverlay = ({
    isOpenExpense,
    toggleExpenseOverlay,
    groupNames = [],
    setGroupId,
    memberlist,
    groupId,
    getGroupMembers,
    amount = 0,
    isEqual = true,
    loading = true,
    showMemberList = false,
    listLoading = false
    }) => {

    useEffect(()=>{
        console.log("Members ->",members);
        console.log("showMemberlist ->",showMemberList);
    },[])

    const [members, setMembers] = useState(memberlist.map(member => ({
        ...member,
        value: '',
        isSelected: false,
    })));

    const handleCheckboxChange = (id) => {
        const updatedMembers = members.map((member, idx) => {
          if (member.UId === id) {
            return { ...member, isSelected: !member.isSelected };
          }
          return member;
        });
        setMembers(updatedMembers);
        console.log(members);
    };

    const handleInputChange = (id, newValue) => {
        const updatedMembers = members.map((member, idx) => {
            if (member.UId === id) {
                return { ...member, value: newValue };
            }
            return member;
        });
        setMembers(updatedMembers);
    };

    const addTransaction = (event) => {
        event.preventDefault();
        members.forEach(member => {
            if(member.isSelected) {
                const obj = {
                    [member.UId] : member.value
                }
                console.log(obj);
            }
        });
    };


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
                            />
                            <input 
                                className="addGroup_form_input"
                                style={{marginTop : "5px"}}
                                placeholder="Amount"
                            />
                            <button className="select_member_btn button" onClick={getGroupMembers}>
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
                                    <p>Select Members</p>
                                    {memberlist.length === 0  ? null :
                                        memberlist.map((member) => (
                                            <>
                                                <MemberList
                                                    handleCheckboxChange={handleCheckboxChange}
                                                    handleInputChange={handleInputChange}
                                                    value={amount}
                                                    member={member}
                                                />
                                            </>
                                            
                                        ))}
                                    <button className="add-transaction-btn">Add Transaction</button>
                                </div>
                            }
                                

                        </>
                        
                    }
                    
                </form>
        </Overlay>
    )
}

const MemberList = ({
    handleCheckboxChange,
    handleInputChange,
    cost = 0,
    isChecked = false,
    member
}) => {
    const [value,setValue] = useState(cost);
    const [checked,setChecked] = useState(isChecked);

    useEffect(()=>{
        console.log("inside MemberList component")
    })
    
    return(
        <>       
            <div className="member-list">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {setChecked(!checked) ; handleCheckboxChange(member.UId,value)}}
                />
                <p>{member.UName}</p>
                <input
                    type="input"
                    value={value}
                    className="member-list-val"
                    onChange={(e) => {
                        setValue(e.target.value);
                        handleInputChange(member.UId,e.target.value)
                    }}
                />
            </div>  
        </>
    )
}

export default ExpenseOverlay;