import { ActionType } from "../constants/action-types";

const initState = {isAuth : localStorage.getItem('isAuth') ? JSON.parse(localStorage.getItem('isAuth')) : false}; // use conditional statement to get the value from localStorage if it exists

export const userReducer = (state = initState,{type,payload}) => {
    switch(type) {
        case (ActionType.LOGIN) :
            return {...state,isAuth : payload};
        default:
            return state;
    }
}