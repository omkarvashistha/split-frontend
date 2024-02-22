import { ActionType } from "../constants/action-types";

export const setAuthentication = (isAuth) => {
    return {
        type : ActionType.LOGIN,
        payload : isAuth,
    }
}