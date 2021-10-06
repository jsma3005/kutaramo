import { SUBSCRIBE, SUBSCRIBE_FAILED, SUBSCRIBE_RESET, SUBSCRIBE_SUCCESS } from "./types"

const initState = {
    success: null,
    error: null,
    loading: false
}

export const NewsletterReducer = (state = initState, action) => {
    switch(action.type){
        case SUBSCRIBE:
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            }
        case SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: false
            }
        case SUBSCRIBE_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case SUBSCRIBE_RESET:
            return {
                ...state,
                success: null,
                error: null,
                loading: false
            }
        default:
            return state
    }
}