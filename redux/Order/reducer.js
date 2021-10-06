import { GET_ENTITY_HISTORY, GET_ENTITY_HISTORY_FAILED, GET_ENTITY_HISTORY_SUCCESS, GET_PHYS_HISTORY, GET_PHYS_HISTORY_FAILED, GET_PHYS_HISTORY_SUCCESS, ORDER_VALIDATION_FAILED, ORDER_VALIDATION_RESET, ORDER_VALIDATION_SUCCESS, POST_ORDER, POST_ORDER_FAILED, POST_ORDER_RESET, POST_ORDER_SUCCESS } from "./types"

const initState = {
    validation: {
        success: null,
        error: null
    },
    postOrder: {
        loading: false,
        success: null,
        error: null
    },
    physHistory: {
        loading: false,
        success: null,
        error: null
    },
    entityHistory: {
        loading: false,
        success: null,
        error: null
    }
}

export const OrderReducer = (state = initState, action) => {
    switch(action.type){
        case ORDER_VALIDATION_SUCCESS:
            return {
                ...state,
                validation: {
                    success: true,
                    error: false
                }
            }
        case ORDER_VALIDATION_FAILED:
            return {
                ...state, 
                validation: {
                    success: false,
                    error: action.payload
                }
            }
        case ORDER_VALIDATION_RESET:
            return {
                ...state,
                validation: {
                    success: null,
                    error: null
                }
            }
        case POST_ORDER:
            return {
                ...state,
                postOrder: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                postOrder: {
                    ...state.postOrder,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case POST_ORDER_FAILED:
            return {
                ...state,
                postOrder: {
                    ...state.postOrder,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case POST_ORDER_RESET:
            return {
                ...state,
                postOrder: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        case GET_PHYS_HISTORY:
            return {
                ...state,
                physHistory: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_PHYS_HISTORY_SUCCESS:
            return {
                ...state,
                physHistory: {
                    ...state.physHistory,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_PHYS_HISTORY_FAILED:
            return {
                ...state,
                physHistory: {
                    ...state.physHistory,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case GET_ENTITY_HISTORY:
            return {
                ...state,
                entityHistory: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_ENTITY_HISTORY_SUCCESS:
            return {
                ...state,
                entityHistory: {
                    ...state.entityHistory,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_ENTITY_HISTORY_FAILED:
            return {
                ...state,
                entityHistory: {
                    ...state.entityHistory,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        default:
            return state
    }
}