import axios from "axios";
import { GET_USER, GET_USER_FAILED, GET_USER_SUCCESS, UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_RESET, UPDATE_USER_SUCCESS } from "./types";
import { isFailedAuth } from '../../helpers'
import { API_GET_USER } from "../../constants/apiConstants/appConstants";
import { API_UPDATE_USER } from "../../constants/apiConstants/userConstants";
import { userUpdateValidation } from "../../helpers/userValidation/userUpdateValidation";

export const getUserAction = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch({
        type: GET_USER
    })

    axios
    .get(API_GET_USER, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => {
        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_USER_FAILED,
            payload: err.data
        })
        isFailedAuth(err.response, getUserAction, dispatch)
    })
}

export const updateUserAction = (id, postData) => async (dispatch) => {

    const errorData = []

    userUpdateValidation(postData, errorData)
    
    if(errorData.length > 0){
        return dispatch({
            type: UPDATE_USER_FAILED,
            payload: errorData
        });
    }

    const accessToken = localStorage.getItem('accessToken');
    dispatch({
        type: UPDATE_USER
    })

    axios.patch(`${API_UPDATE_USER}/${id}/`, postData, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => {
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: UPDATE_USER_FAILED,
            payload: err.response?.data?.errors
        })
        isFailedAuth(err.response, updateUserAction, dispatch)
    })
}

export const resetUserUpdateAction = () => {
    return {
        type: UPDATE_USER_RESET
    }
}