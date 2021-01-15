import * as types from '../types/authTypes';
import { isLogged, getInfoUserLogged } from '../../services/loginService'

const initialState = {
    user: getInfoUserLogged(),
    logged: isLogged(),
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN:
            return {
                ...action.payload,
                logged: true,
                user: action.payload

            }
        case types.LOGOUT:
            return {
                logged: false
            }

        default:
            return state;
    }
}
