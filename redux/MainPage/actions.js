import axios from "axios"
import { apiUrl } from "../../configs/config"
import { CLEAR_CATEGORY, GET_MAINPAGE, GET_MAINPAGE_FAILED, GET_MAINPAGE_SUCCESS, SET_ACTIVE_CATEGORY } from "./types"

export const setActiveCategory = category => {
    return {
        type: SET_ACTIVE_CATEGORY,
        payload: category
    }
}

export const clearCategory = () => {
    return {
        type: CLEAR_CATEGORY
    }
}

export const getMainPageAction = () => async (dispatch) => {
    dispatch({
        type: GET_MAINPAGE
    })
    await axios
    // .get(urlCreatorApiLang(API_MAINPAGE))
    .get(`${apiUrl}/mainpage/`)
    .then(res => {
        dispatch({
            type: GET_MAINPAGE_SUCCESS,
            payload: res.data?.results
        })
    })
    .catch(err => {
        dispatch({
            type: GET_MAINPAGE_FAILED,
            payload: err.data
        })
    })
}