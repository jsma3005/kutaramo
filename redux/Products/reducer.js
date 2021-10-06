import { FILL_FILTERED_PRODUCTS, FILTER_ADDITIONAL, FILTER_COLOR, FILTER_PRICE, FILTER_RESET, GET_PRODUCTS_FAILED, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_SINGLE_ARTICULE, GET_SINGLE_ARTICULE_FAILED, GET_SINGLE_ARTICULE_SUCCESS, GET_SINGLE_PRODUCT_ITEM, GET_SINGLE_PRODUCT_ITEM_FAILED, GET_SINGLE_PRODUCT_ITEM_SUCCESS, GET_SINGLE_SALE, GET_SINGLE_SALE_FAILED, GET_SINGLE_SALE_SUCCESS, SELECTED_PRODUCT } from "./types"

const initState = {
    products: {
        loading: false,
        success: null,
        error: null
    },
    filteredProducts: [],
    single: {
        loading: false,
        success: null,
        error: null
    },
    selected: {
        loading: false,
        success: null,
        error: null
    },
    sale: {
        loading: false,
        success: null,
        error: null
    }
}

export const ProductsReducer = (state = initState, action) => {
    switch(action.type){
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                products: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case GET_SINGLE_ARTICULE:
            return {
                ...state,
                single: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_SINGLE_ARTICULE_SUCCESS:
            return {
                ...state,
                single: {
                    ...state.single,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_SINGLE_ARTICULE_FAILED:
            return {
                ...state,
                single: {
                    ...state.single,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case SELECTED_PRODUCT:
            return {
                ...state,
                selected: {
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_SINGLE_PRODUCT_ITEM:
            return {
                ...state,
                selected: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_SINGLE_PRODUCT_ITEM_SUCCESS:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_SINGLE_PRODUCT_ITEM_FAILED:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case GET_SINGLE_SALE:
            return {
                ...state,
                sale: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_SINGLE_SALE_SUCCESS:
            return {
                ...state,
                sale: {
                    ...state.sale,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_SINGLE_SALE_FAILED:
            return {
                ...state,
                sale: {
                    ...state.sale,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case FILL_FILTERED_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            }
        case FILTER_PRICE:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case FILTER_COLOR:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case FILTER_ADDITIONAL:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case FILTER_RESET:
            return {
                ...state,
                products: {
                    ...state.products,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        default:
            return state
    }
}