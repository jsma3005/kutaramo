import axios from "axios";
import { API_SUBSCRIBE } from "../../constants/apiConstants/newsletterConstants";
import { subscribeValidation } from "../../helpers/subscribeValidation";
import { SUBSCRIBE, SUBSCRIBE_FAILED, SUBSCRIBE_RESET, SUBSCRIBE_SUCCESS } from "./types";

export const subscribeAction = (postData) => async (dispatch) => {
    const errorData = []

    subscribeValidation(postData, errorData)

    if(errorData.length > 0){
        return dispatch({
            type: SUBSCRIBE_FAILED,
            payload: errorData
        })
    }

    dispatch({
        type: SUBSCRIBE
    })

    axios.post(API_SUBSCRIBE, postData)
    .then(() => {
        dispatch({
            type: SUBSCRIBE_SUCCESS
        })
    })
    .catch((err) => {
        dispatch({
            type: SUBSCRIBE_FAILED,
            payload: err.response?.data?.errors
        })
    })
}

export const resetSubscribeAction = () => {
    return{ 
        type: SUBSCRIBE_RESET
    }
}