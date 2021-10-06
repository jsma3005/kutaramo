import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_REGISTER } from "./types"

const initState = {
    user: {
        status: '',
        payload: ''
    },
    register: {
        loading: false,
        success: null,
        error: null
    },
    login: {
        loading: false,
        success: null,
        error: null
    }
}

export const LoginReducer = (state = initState, action) => {
    switch(action.type){
        case 'user_req': 
            return{ 
                ...state,
                user: {
                    status: 'loading',
                    payload: null
                }
            }
        case 'user_success':
            return {
                ...state,
                user: {
                    ...state.user,
                    status: 'success',
                    payload: action.payload
                }
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: true
                }
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        case REGISTER_FAILED:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true
                }
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case LOGIN_FAILED:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case RESET_REGISTER:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: false,
                    success: null,
                    error: null
                }
            }
        default: 
            return state
    }
}