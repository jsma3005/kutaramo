export const HOME_URL = '/'
export const USER_URL = '/user';
export const USER_DETAILS_URL = '/user/details'
export const USER_PURCHASES_URL = '/user/purchases'
export const LOGIN_URL = '/login'
export const REGISTER_URL = '/login/register'
export const LIKED_URL = '/liked'
export const CART_URL = '/cart'
export const SEARCH_URL = '/search'
export const FORGOT_PASS_URL = '/login/forgot'
export const ORDER_URL = '/order'

export const PRODUCTS_CATEGORY_URL = (name) => {
    return `/products/${name}`
}

export const PRODUCT_URL = (articuleId, productItemId) => {
    return `/product/${articuleId}/${productItemId}`
}