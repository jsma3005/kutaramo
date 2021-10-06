import { LOGIN_SUCCESS, REGISTER_SUCCESS } from "../Login/types"
import { GET_USER_FAILED, GET_USER_SUCCESS } from "../User/types"
import { CLOSE_CHAT, CLOSE_FILTER, CLOSE_SIDEBAR, OPEN_CHAT, OPEN_FILTER, OPEN_SIDEBAR, PRODUCTS_VIEW_CHANGE, SIGN_OUT } from "./types"

const initState = {
    sidebar: false,
    filter: false,
    firstLoading: false,
    chat: false,
    isAuth: false,
    productsView: '1'
}

export const AppReducer = (state = initState, action) => {
    switch(action.type){
        case OPEN_SIDEBAR:
            return {
                ...state,
                sidebar: true
            }
        case CLOSE_SIDEBAR:
            return {
                ...state,
                sidebar: false
            }
        case OPEN_FILTER:
            return {
                ...state,
                filter: true
            }
        case CLOSE_FILTER:
            return {
                ...state,
                filter: false
            }
        case OPEN_CHAT:
            return {
                ...state,
                chat: true
            }
        case CLOSE_CHAT:
            return {
                ...state,
                chat: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                firstLoading: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                firstLoading: false
            }
        case GET_USER_FAILED:
            return {
                ...state,
                firstLoading: true,
                isAuth: false
            }
        case GET_USER_SUCCESS:
            return { 
                ...state,
                firstLoading: true,
                isAuth: true
            }
        case SIGN_OUT:
            return initState
        case PRODUCTS_VIEW_CHANGE:
            return {
                ...state,
                productsView: action.payload
            }
        default:
            return state
    }
}