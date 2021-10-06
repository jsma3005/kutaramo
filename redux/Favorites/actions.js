import axios from "axios"
import { API_DELETE_FAVORITE, API_GET_FAVORITES, API_POST_FAVORITES } from "../../constants/apiConstants/favoriteConstants";
import { isFailedAuth } from "../../helpers";
import { ADD_FAVORITE, ADD_FAVORITE_FAILED, ADD_FAVORITE_RESET, ADD_FAVORITE_SUCCESS, GET_FAVORITES, GET_FAVORITES_FAILED, GET_FAVORITES_RESET, GET_FAVORITES_SUCCESS, REMOVE_FAVORITE, REMOVE_FAVORITE_FAILED, REMOVE_FAVORITE_RESET, REMOVE_FAVORITE_SUCCESS } from "./types"

export const addFavoriteAction = (products) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch({
        type: ADD_FAVORITE
    })
    await axios
    .post(API_POST_FAVORITES, products, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => {
        dispatch({
            type: ADD_FAVORITE_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: ADD_FAVORITE_FAILED,
            payload: err.response.data.status_code
        })
        isFailedAuth(err.response, addFavoriteAction, dispatch)
    })
}

export const resetAddFavoriteAction = () => {
    return {
        type: ADD_FAVORITE_RESET
    }
}

export const getFavoritesAction = (userId) => async (dispatch) => {

    dispatch({
        type: GET_FAVORITES
    })
    await axios
    .get(API_GET_FAVORITES + userId + '/favorites/')
    .then(res => {
        dispatch({
            type: GET_FAVORITES_SUCCESS,
            payload: res?.data?.results
        })
    })
    .catch(err => {
        dispatch({
            type: GET_FAVORITES_FAILED,
            payload: err.response.data
        })
    })
}

export const resetGetFavoritesAction = () => {
    return {
        type: GET_FAVORITES_RESET
    }
}

export const removeFavoriteAction = (productId) => async (dispatch) => {
    dispatch({
        type: REMOVE_FAVORITE
    })
    await axios
    .delete(API_DELETE_FAVORITE + productId)
    .then(res => {
        dispatch({
            type: REMOVE_FAVORITE_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: REMOVE_FAVORITE_FAILED,
            payload: err.response.data
        })
    })
}

export const resetRemoveFavoriteAction = () => {
    return {
        type: REMOVE_FAVORITE_RESET
    }
}