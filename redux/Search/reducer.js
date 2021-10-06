import { GET_SEARCH_PRODUCTS, GET_SEARCH_PRODUCTS_FAILED, GET_SEARCH_PRODUCTS_RESET, GET_SEARCH_PRODUCTS_SUCCESS, IS_SEARCHING_PRODUCTS, RESET_SEARCH } from "./types"

const initState = {
    isSearching: false,
    searchData: {
        loading: false,
        success: null,
        error: null
    }
}

export const SearchReducer = (state = initState, action) => {
    switch(action.type){
        case IS_SEARCHING_PRODUCTS:
            return {
                ...state,
                isSearching: action.payload
            }
        case RESET_SEARCH:
            return {
                ...state,
                isSearching: false
            }
        case GET_SEARCH_PRODUCTS:
            return {
                ...state,
                searchData: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_SEARCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_SEARCH_PRODUCTS_FAILED:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case GET_SEARCH_PRODUCTS_RESET:
            return {
                ...state,
                searchData: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        default:
            return state
    }
}