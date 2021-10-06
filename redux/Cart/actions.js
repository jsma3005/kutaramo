import axios from 'axios'
import { API_GET_CARTS, API_POST_CART_ITEM, API_REMOVE_CART, API_UPDATE_CART } from '../../constants/apiConstants/cartConstants'
import { isFailedAuth } from '../../helpers'
import { CHANGE_AMOUNT, GET_CARTS, GET_CARTS_FAILED, GET_CARTS_RESET, GET_CARTS_SUCCESS, POST_CART_ITEM, POST_CART_ITEM_FAILED, POST_CART_ITEM_RESET, POST_CART_ITEM_SUCCESS, REMOVE_CART, REMOVE_CART_FAILED, REMOVE_CART_RESET, REMOVE_CART_SUCCESS, UPDATE_CART, UPDATE_CART_FAILED, UPDATE_CART_SUCCESS } from './types'

export const postCartItemAction = (productId) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch({
        type: POST_CART_ITEM
    })
    await
    axios.post(API_POST_CART_ITEM, 
        {
            amount: 1,
            product_item: productId
        }, 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    .then(res => {
        dispatch({
            type: POST_CART_ITEM_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: POST_CART_ITEM_FAILED,
            payload: err.response.data.status_code
        })
        isFailedAuth(err.response, postCartItemAction, dispatch)
    })
}   

export const resetPostCartItemAction = () => {
    return {
        type: POST_CART_ITEM_RESET
    }
}

export const getCartsAction = (userId) => async (dispatch) => {
    dispatch({
        type: GET_CARTS
    })
    await axios
    .get(API_GET_CARTS + userId + '/carts/')
    .then(res => {
        dispatch({
            type: GET_CARTS_SUCCESS,
            payload: res?.data?.cart_items
        })
    })
    .catch(err => {
        dispatch({
            type: GET_CARTS_FAILED,
            payload: err.response?.data
        })
    })
}

export const resetGetCartsAction = () => {
    return {
        type: GET_CARTS_RESET
    }
}

export const removeCartAction = (productId) => async (dispatch) => {
    dispatch({
        type: REMOVE_CART
    })
    await axios
    .delete(API_REMOVE_CART + productId)
    .then(res => {
        dispatch({
            type: REMOVE_CART_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: REMOVE_CART_FAILED,
            payload: err.response.data
        })
    })
}

export const resetRemoveCartAction = () => {
    return {
        type: REMOVE_CART_RESET
    }
}

export const changeAmountAction = (product, amount, index) => {
    return {
        type: CHANGE_AMOUNT,
        payload: { product, amount, index }
    }
}

export const updateCartAction = (cartId, product_item, amount) => async (dispatch) => {
    dispatch({
        type: UPDATE_CART
    })
    await axios
    .put(API_UPDATE_CART + `${cartId}/`, {
        amount: amount,
        product_item: product_item
    })
    .then(res => {
        dispatch({
            type: UPDATE_CART_SUCCESS,
            payload: res?.data
        })
    })
    .catch(() => {
        dispatch({
            type: UPDATE_CART_FAILED
        })
    })
}