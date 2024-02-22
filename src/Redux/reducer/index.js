import { userReducer } from "./userReducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    isAuthenticated : userReducer
});