import { SIGN_OUT } from "../App/types"
import { GET_USER_SUCCESS, UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_RESET, UPDATE_USER_SUCCESS } from "./types"

const initState = {
    user: null,
    updateUser: {
        loading: false,
        success: null,
        error: null
    }
}

export const UserReducer = (state = initState, action) => {
    switch(action.type){
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case SIGN_OUT:
            return {
                ...state,
                user: null
            }
        case UPDATE_USER:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        case UPDATE_USER_FAILED:
            return {
                ...state,
                updateUser: {
                    ...state.updateUser,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case UPDATE_USER_RESET:
            return {
                ...state,
                updateUser: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        default:
            return state
    }
}