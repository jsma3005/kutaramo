import axios from "axios"
import { API_GET_CATEGORY } from "../../constants/apiConstants/categoriesConstants"
import { API_PRODUCTS, API_PRODUCT_ITEMS, API_SINGLE_SALE } from "../../constants/apiConstants/productsConstants"
import { FILL_FILTERED_PRODUCTS, FILTER_ADDITIONAL, FILTER_COLOR, FILTER_PRICE, FILTER_RESET, GET_PRODUCTS_FAILED, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_SINGLE_ARTICULE, GET_SINGLE_ARTICULE_FAILED, GET_SINGLE_ARTICULE_SUCCESS, GET_SINGLE_PRODUCT_ITEM, GET_SINGLE_PRODUCT_ITEM_FAILED, GET_SINGLE_PRODUCT_ITEM_SUCCESS, GET_SINGLE_SALE, GET_SINGLE_SALE_FAILED, GET_SINGLE_SALE_SUCCESS, SELECTED_PRODUCT } from "./types"

export const getProductsAction = (categoryId) => async (dispatch) => {
    dispatch({
        type: GET_PRODUCTS_REQUEST
    })

    await axios
    .get(API_PRODUCTS, {
        params: { 
            category: categoryId
        }
    })
    .then(res => {
        const allProductsArray = [];
        res.data?.results.forEach(articule => {
            articule.product_items.forEach(product => {
                allProductsArray.push(product)
            })
        })
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: allProductsArray
        })
        dispatch({
            type: FILL_FILTERED_PRODUCTS,
            payload: allProductsArray
        })
    })
    .catch(err => {
        dispatch({
            type: GET_PRODUCTS_FAILED,
            payload: err.response?.data
        })
    })
}

export const getSingleArticuleAction = (articuleId) => async (dispatch) => {
    dispatch({
        type: GET_SINGLE_ARTICULE
    })
    await axios
    .get(API_PRODUCTS + articuleId)
    .then(res => {
        dispatch({
            type: GET_SINGLE_ARTICULE_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_SINGLE_ARTICULE_FAILED,
            payload: err.response?.data
        })
    })
}

export const selectedProductItemAction = (product) => {
    return {
        type: SELECTED_PRODUCT,
        payload: product
    }
}

export const getSingleProductItemAction = (productItemId) => async (dispatch) => {
    dispatch({
        type: GET_SINGLE_PRODUCT_ITEM
    })
    await axios
    .get(API_PRODUCT_ITEMS + productItemId)
    .then(res => {
        dispatch({
            type: GET_SINGLE_PRODUCT_ITEM_SUCCESS,
            payload: res?.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_SINGLE_PRODUCT_ITEM_FAILED,
            payload: err.response?.data
        })
    })
}

export const getSingleSaleAction = () => async (dispatch) => {
    dispatch({
        type: GET_SINGLE_SALE
    })
    await axios
    .get(API_SINGLE_SALE)
    .then(res => {
        dispatch({
            type: GET_SINGLE_SALE_SUCCESS,
            payload: res?.data?.results
        })
    })
    .catch(err => {
        dispatch({
            type: GET_SINGLE_SALE_FAILED,
            payload: err.response?.data
        })
    })
}

export const filterPriceAction = (products, type) => {
    const filteredArr = products?.sort((a, b) => {
        if(type === 'asc'){
            return a.price - b.price
        }else {
            return b.price - a.price
        }
    })

    return {
        type: FILTER_PRICE,
        payload: filteredArr
    }
}

export const filterColorAction = (products, activeColor) => {
    const filteredByColor = products?.filter(item => item.color === activeColor);

    return {
        type: FILTER_COLOR,
        payload: filteredByColor
    }
}

export const filterAdditionalAction = (additional, products, type) => {
    const filteredProducts = [];

    if(type === 'favorite'){
        products.forEach(product => {
            additional.forEach(favorite => {
                if(product.id === favorite.products[0].id){
                    filteredProducts.push(product)
                }
            })
        })
    }else{
        products.forEach(product => {
            additional.forEach(cart => {
                if(product.id === cart.product_item.id){
                    filteredProducts.push(product)
                }
            })
        })
    }

    return {
        type: FILTER_ADDITIONAL,
        payload: filteredProducts
    }
}

export const resetFilterAction = (allProducts) => {
    return {
        type: FILTER_RESET,
        payload: allProducts
    }
}