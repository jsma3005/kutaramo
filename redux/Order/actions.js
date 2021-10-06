import axios from "axios";
import { API_GET_ORDER_ENTITY, API_GET_ORDER_PHYS, API_POST_ORDER } from "../../constants/apiConstants/orderConstants";
import { isFailedAuth } from "../../helpers";
import { entityOrderValidation, indivOrderValidation } from "../../helpers/orderValidation/orderValidation"
import { GET_ENTITY_HISTORY, GET_ENTITY_HISTORY_FAILED, GET_ENTITY_HISTORY_SUCCESS, GET_PHYS_HISTORY, GET_PHYS_HISTORY_FAILED, GET_PHYS_HISTORY_SUCCESS, ORDER_VALIDATION_FAILED, ORDER_VALIDATION_RESET, ORDER_VALIDATION_SUCCESS, POST_ORDER, POST_ORDER_FAILED, POST_ORDER_RESET, POST_ORDER_SUCCESS } from "./types";

export const validateOrderFormAction = (postData, type) => {
    const errorData = []

    if(type === 'indiv'){
        indivOrderValidation(postData, errorData)
    }else if(type === 'entity'){
        entityOrderValidation(postData, errorData)
    }

    if(errorData.length > 0){
        return {
            type: ORDER_VALIDATION_FAILED,
            payload: errorData
        };
    }

    return {
        type: ORDER_VALIDATION_SUCCESS,
    }
}

export const resetValidationAction = () => {
    return {
        type: ORDER_VALIDATION_RESET
    }
}

export const postOrderAction = (faceType, postData, payment_type) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');

    dispatch({
        type: POST_ORDER
    })

    const faceTypeRoute = faceType === 0 ? 'phys/' : 'entity/';

    await axios.post(API_POST_ORDER + faceTypeRoute, 
        {
            ...postData,
            payment_type
        }, 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    .then(res => {
        dispatch({
            type: POST_ORDER_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: POST_ORDER_FAILED,
            payload: err.response?.data
        })
        isFailedAuth(err.response, postOrderAction, dispatch)
    })
}

export const resetPostOrderAction = () => {
    return {
        type: POST_ORDER_RESET
    }
}

export const getPhisOrderHistoryAction = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');

    dispatch({
        type: GET_PHYS_HISTORY
    })

    await axios
    .get(API_GET_ORDER_PHYS, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => {
        dispatch({
            type: GET_PHYS_HISTORY_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PHYS_HISTORY_FAILED,
            payload: err.response?.data
        })
    })
    
}

export const getEntityOrderHistoryAction = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');

    dispatch({
        type: GET_ENTITY_HISTORY
    })

    await axios
    .get(API_GET_ORDER_ENTITY, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(res => {
        dispatch({
            type: GET_ENTITY_HISTORY_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ENTITY_HISTORY_FAILED,
            payload: err.response?.data
        })
    })
}