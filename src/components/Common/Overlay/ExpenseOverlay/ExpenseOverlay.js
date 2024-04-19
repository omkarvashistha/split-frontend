import React, { useEffect,useRef,useState } from "react";
import Overlay from "../Overlay";
import DynamicDropdown from "../../DynamicDropdown/DynamicDropdown";
import './ExpenseOverlay.css'
import Spinner from "../../Spinner/Spinner";
import FriendList from "../../FriendList/FriendList";
import axios from "axios";
import { SERVER_ADDRESS, TEST_SERVER } from "../../../Constants/constants";
import Alert from "../../Alert/Alert";
import DotSpinner from "../../Spinner/DotSpinner";
import { Dropdown } from "bootstrap";
import MemberDropdownn from "../../MemberDropdown/MemberDropdown";

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
    setShowMemberList,
    listLoading = false,
    friends = [],
    getFriends,
    getGroups
    }) => {

    const [members, setMembers] = useState(memberlist.map(member => ({
        ...member,
        value: parseFloat(amount) / memberlist.length,
        isSelected: true, // Default to selected
    })));

    /*Overlay States */

    const [description,setDescription] = useState('');
    const [totalAmount,setTotalAmount] = useState('');
    const [paidBy,setPaidBy] = useState('');
    const [error,setError] = useState("");
    const [desError,setDesError] = useState(false);
    const [amtError,setAmtError] = useState(false);
    const [isEqual,setIsEqual] = useState(true);

    const [friendLoader,setFriendLoader] = useState(false);
    const [openFriendList,setOpenFriendList] = useState(false);
    const [transactionLoader,setTransactionLoader] = useState(false);
    const [showFriendList,setShowFriendList] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Here will be the Alert message');
    const [alertClass,setAlertClass] = useState('');

    useEffect(() => {
        // This effect updates member values when `totalAmount` changes
        if (isEqual) {
            updateEqualDivision();
        }
    }, [totalAmount]);  // React to changes in totalAmount or members
    
    const updateEqualDivision = () => {
        const selectedMembersCount = members.filter(member => member.isSelected).length;
        const individualAmount = selectedMembersCount > 0 ? parseFloat(totalAmount) / selectedMembersCount : 0;
    
        setMembers(members.map(member => ({
            ...member,
            value: member.isSelected ? individualAmount : 0,
        })));
    };

    const handleIsEqualChange = (e) => {
        console.log("here");
        setIsEqual(prevIsEqual => {
            const newIsEqual = !prevIsEqual;
            if (newIsEqual) {
                const selectedMembersCount = members.filter(member => member.isSelected).length;
                const individualAmount = selectedMembersCount > 0 ? parseFloat(totalAmount) / selectedMembersCount : 0;
    
                setMembers(members.map(member => ({
                    ...member,
                    value: member.isSelected ? individualAmount : 0,
                })));
            }
            return newIsEqual;
        });
    }; 


    useEffect(()=>{
        console.log(members);
        if (description !== '' && totalAmount !== '') {
            setMembers(memberlist.map(member => ({
                ...member,
                value: 0, // Initialize additional properties as needed
                isSelected: false,
            })));
        }
    },[groupId,memberlist]);

    useEffect(() => {
        // Reset description and amount when groupId changes
        setDescription('');
        setTotalAmount('');
        setPaidBy('');
        setShowMemberList(false);
        
    }, [groupId]);
    
    useEffect(() => {
        // Reset description and amount when the overlay is closed
        if (!isOpenExpense) {
            setDescription('');
            setTotalAmount('');
            setShowMemberList(false);
        }
    }, [isOpenExpense]);

    // This useEffect reacts to changes in isEqual, totalAmount, or members' selection state


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
            let updatedMembers = [...currentMembers, ...newMembers.filter(newMember => 
                !currentMembers.some(member => member.UId === newMember.UId))];
    
            if (isEqual) {
                const selectedMembersCount = updatedMembers.filter(member => member.isSelected).length;
                const individualAmount = selectedMembersCount > 0 ? parseFloat(totalAmount) / selectedMembersCount : 0;
    
                updatedMembers = updatedMembers.map(member => ({
                    ...member,
                    value: member.isSelected ? individualAmount : 0,
                    isSelected: member.isSelected
                }));
            } else {
                // When isEqual is false, new members should have a value of 0
                updatedMembers = updatedMembers.map(member => ({
                    ...member,
                    value: member.isSelected ? member.value : 0,
                    isSelected: member.isSelected
                }));
            }
    
            return updatedMembers;
        });
    };
    


    const handleCheckboxChange = (id) => {
        setMembers(currentMembers => {
            const updatedMembers = currentMembers.map(member => {
                if (member.UId === id) {
                    // Toggle isSelected status
                    return { ...member, isSelected: !member.isSelected };
                }
                return member;
            });
    
            if (isEqual) {
                const selectedMembersCount = updatedMembers.filter(member => member.isSelected).length;
                const individualAmount = selectedMembersCount > 0 ? parseFloat(totalAmount) / selectedMembersCount : 0;
    
                // Update values based on selection
                return updatedMembers.map(member => ({
                    ...member,
                    value: member.isSelected ? individualAmount : 0,
                }));
            }
    
            // If isEqual is not checked, don't modify the values
            return updatedMembers;
        });
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

    const addTransaction = async(event) => {
        event.preventDefault();
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
        else if(paidBy === '') {
            setError("PaidBy is not selected")
        }
        else{
            setTransactionLoader(true);
           const users = members.reduce((accumulator, member) => {
                            if (member.isSelected) {
                            accumulator.push({ [member.UId]: member.value });
                            }
                            return accumulator;
                        }, []);
           console.log("users ->",paidBy);
                    
           const reqBody = {
                "amount" : totalAmount,
                "users" : users,
                "paidBy" : paidBy,
                "GId" : groupId,
                "title" : description
           }

           console.log("reqBody ->",reqBody);
           await axios.post(`${SERVER_ADDRESS}/addTransaction`,reqBody).then((res) => {
                const responseCode = res.data.code;

                if(responseCode === 100) {
                    setAlertMessage('Transaction added successfully!');
                    setShowAlert(true);
                    setAlertClass('success');
                    // Reset the alert after a few seconds
                    setGroupId('');
                    setTimeout(() => {setShowAlert(false); }, 3000);
                } else if (responseCode === 101) {
                    setAlertMessage('Transaction not added try again');
                    setShowAlert(true);
                    setAlertClass('failed');
                    // Reset the alert after a few seconds
                    setTimeout(() => setShowAlert(false), 5000);
                }
           }).catch((err) => {
                console.error('Error in adding transaction:', err);
                setAlertMessage('Error in adding transaction. Please try again.');
                setShowAlert(true);
                // Reset the alert after a few seconds
                setTimeout(() => setShowAlert(false), 5000)
           }).finally(()=>{
                getGroups();
                setTransactionLoader(false);
           })
        }
        
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

    const handleClick = (e) => {
        e.preventDefault();
        console.log("openFriendList ->",openFriendList);
        setOpenFriendList(!openFriendList);
    }


    return(
        <Overlay isOpen={isOpenExpense} onClose={toggleExpenseOverlay}>
                <Alert message={alertMessage} visible={showAlert} onClose={() => setShowAlert(false)}  alertClass={alertClass}/>
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
                                    {listLoading ? <div className="flex-justify-center" style={{marginTop : "2%"}}><DotSpinner size="small"/></div> : null}
                                </>
                                :
                                <>
                                    <div className="flex-justify-center memberDropdown-parent" style={{}}>
                                       <span style={{marginRight : "16px",fontFamily:'Poppins'}}>
                                            Paid by 
                                        </span>  
                                        <MemberDropdownn 
                                            members={members} 
                                            setPaidBy={setPaidBy}    
                                        />
                                    </div>
                                    <div className="member-list-container" 
                                        style={showMemberList ? {visibility : 'visible'} : {visibility : 'hidden'}}
                                    >
                                        <div className="member-list-top">
                                            <p>Select Member</p>
                                            <div className="member-list-divide-equal">
                                                <input 
                                                    type="checkbox"
                                                    checked={isEqual}
                                                    onChange={handleIsEqualChange}
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
                                                            member={member}
                                                        />
                                                    </> 
                                                )
                                            })}
                                        
                                        <div className="addFriends_btn_container">
                                            <span>Add member to group</span>
                                            <a onClick={handleClick} className="addFriends_btn" >{openFriendList ? "Show less" : "Show more"}</a>
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
                                </>
                            }
                            <button className="add-transaction-btn" onClick={addTransaction}>{transactionLoader ? <Spinner size="small"/> : "Add Transaction"}</button>    

                        </>
                        
                    }
                    
                </form>
        </Overlay>
    )
}

const MemberList = ({
    handleCheckboxChange,
    handleInputChange,
    member
}) => {
    // Use the member.value directly to show the amount for each member
    const [value, setValue] = useState(member.value);

    useEffect(() => {
        // Update the value displayed whenever the member's value changes
        setValue(member.isSelected ? member.value : 0);
    }, [member.value, member.isSelected]);

    const handleChange = (event) => {
        const { type, checked, value: newValue } = event.target;
        
        if (type === 'checkbox') {
            handleCheckboxChange(member.UId);
            // If unchecking, set the value to 0 immediately in the UI
            if (!checked) {
                setValue(0);
            }
        } else if (type === 'number' && member.isSelected) {
            // Update the value if the input changes (and the member is selected)
            setValue(newValue);
            handleInputChange(member.UId, newValue);
        }
    };

    return (
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
                    disabled={!member.isSelected} // Disable input if member is not selected
                    className="member-list-val"
                    onChange={handleChange}
                />
            </div>  
        </>
    );
};


export default ExpenseOverlay;