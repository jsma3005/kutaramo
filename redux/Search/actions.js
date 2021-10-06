import axios from "axios"
import { API_SEARCH_PRODUCTS } from "../../constants/apiConstants/searchConstants"
import { GET_SEARCH_PRODUCTS, GET_SEARCH_PRODUCTS_FAILED, GET_SEARCH_PRODUCTS_RESET, GET_SEARCH_PRODUCTS_SUCCESS, IS_SEARCHING_PRODUCTS, RESET_SEARCH } from "./types"

export const isSearchingProductsAction = (searchString) => {
    return {
        type: IS_SEARCHING_PRODUCTS,
        payload: searchString
    }
}

export const resetSearchAction = () => {
    return {
        type: RESET_SEARCH
    }
}

export const getSearchProductsAction = (searchString) => async (dispatch) => {
    dispatch({
        type: GET_SEARCH_PRODUCTS
    })
    await axios
    .get(API_SEARCH_PRODUCTS, {
        params: {
            search: searchString
        }
    })
    .then(res => {
        dispatch({
            type: GET_SEARCH_PRODUCTS_SUCCESS,
            payload: res?.data?.results
        })
    })
    .catch(err => {
        dispatch({
            type: GET_SEARCH_PRODUCTS_FAILED,
            payload: err.response?.data
        })
    })
}

export const resetSearchProductsAction = () => {
    return {
        type: GET_SEARCH_PRODUCTS_RESET
    }
}