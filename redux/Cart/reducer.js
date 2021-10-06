import { POST_CART_ITEM, POST_CART_ITEM_SUCCESS, POST_CART_ITEM_FAILED, POST_CART_ITEM_RESET, GET_CARTS, GET_CARTS_SUCCESS, GET_CARTS_FAILED, REMOVE_CART, REMOVE_CART_SUCCESS, REMOVE_CART_FAILED, REMOVE_CART_RESET, GET_CARTS_RESET, CHANGE_AMOUNT, UPDATE_CART, UPDATE_CART_SUCCESS, UPDATE_CART_FAILED } from "./types"

const initState = {
    addCart: {
        loading: false,
        success: null,
        error: null
    },
    carts: {
        loading: false,
        success: null,
        error: null
    },
    removeCart: {
        loading: false,
        success: null,
        error: null
    },
    updateCart: {
        loading: false,
        success: null,
        error: null
    }
}

export const CartReducer = (state = initState, action) => {
    switch(action.type){
        case POST_CART_ITEM:
            return {
                ...state,
                addCart: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case POST_CART_ITEM_SUCCESS:
            return {
                ...state,
                addCart: {
                    ...state.addCart,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case POST_CART_ITEM_FAILED:
            return {
                ...state,
                addCart: {
                    ...state.addCart,
                    loading: false,
                    success: false,
                    error: {
                        state: true,
                        statusCode: action.payload
                    }
                }
            }
        case POST_CART_ITEM_RESET:
            return {
                ...state,
                addCart: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        case GET_CARTS:
            return {
                ...state,
                carts: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_CARTS_SUCCESS:
            return {
                ...state,
                carts: {
                    ...state.carts,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_CARTS_FAILED:
            return {
                ...state,
                carts: {
                    ...state.carts,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case GET_CARTS_RESET:
            return {
                ...state,
                carts: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        case REMOVE_CART:
            return {
                ...state,
                removeCart: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case REMOVE_CART_SUCCESS:
            return {
                ...state,
                removeCart: {
                    ...state.removeCart,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        case REMOVE_CART_FAILED:
            return {
                ...state,
                removeCart: {
                    ...state.removeCart,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case REMOVE_CART_RESET:
            return {
                ...state,
                removeCart: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        case CHANGE_AMOUNT:
            const cartsList = [...state.carts.success];
            cartsList[action.payload.index].amount = action.payload.amount
            return {
                ...state,
                carts: {
                    ...state.carts,
                    success: cartsList
                }
            }
        case UPDATE_CART:
            return {
                ...state,
                updateCart: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case UPDATE_CART_SUCCESS:
            return {
                ...state,
                updateCart: {
                    ...state.updateCart,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case UPDATE_CART_FAILED:
            return {
                ...state,
                updateCart: {
                    ...state.updateCart,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        default:
            return state
    }
}