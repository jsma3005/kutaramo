import { CLOSE_CHAT, CLOSE_FILTER, CLOSE_SIDEBAR, OPEN_CHAT, OPEN_FILTER, OPEN_SIDEBAR, PRODUCTS_VIEW_CHANGE, SIGN_OUT } from './types'
import { GET_USER_FAILED } from '../User/types'
import { getUserAction } from '../User/actions'
import { HOME_URL } from '../../constants/appConstants/constantsURL'

export const openSidebarAction = () => {
    return {
        type: OPEN_SIDEBAR
    }
}

export const closeSidebarAction = () => {
    return {
        type: CLOSE_SIDEBAR
    }
}

export const openFilterAction = () => {
    return {
        type: OPEN_FILTER
    }
}

export const closeFilterAction = () => {
    return {
        type: CLOSE_FILTER
    }
}

export const openChatAction = () => {
    return {
        type: OPEN_CHAT
    }
}

export const closeChatAction = () => {
    return {
        type: CLOSE_CHAT
    }
}

export const firstAuthAction = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');

    if(accessToken){
        return dispatch(getUserAction())
    }
    dispatch({
        type: GET_USER_FAILED
    });
}

export const signOutAction = (router) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    router.push(HOME_URL);
    
    return {
        type: SIGN_OUT
    }
}

export const productsViewChangeAction = (value) => {
    return {
        type: PRODUCTS_VIEW_CHANGE,
        payload: value
    }
}