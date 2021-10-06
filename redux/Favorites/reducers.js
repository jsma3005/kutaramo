import { ADD_FAVORITE, ADD_FAVORITE_FAILED, ADD_FAVORITE_RESET, ADD_FAVORITE_SUCCESS, GET_FAVORITES, GET_FAVORITES_FAILED, GET_FAVORITES_RESET, GET_FAVORITES_SUCCESS, REMOVE_FAVORITE, REMOVE_FAVORITE_FAILED, REMOVE_FAVORITE_RESET, REMOVE_FAVORITE_SUCCESS } from "./types"

const initState = {
    addFavorite: {
        loading: false,
        success: null,
        error: null
    },
    favorites: {
        loading: false,
        success: null,
        error: null
    },
    removeFavorite: {
        loading: false,
        success: null,
        error: null
    }
}

export const FavoritesReducer = (state = initState, action) => {
    switch(action.type){
        case ADD_FAVORITE:
            return {
                ...state,
                addFavorite: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case ADD_FAVORITE_SUCCESS:
            return {
                ...state,
                addFavorite: {
                    ...state.addFavorite,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case ADD_FAVORITE_FAILED:
            return {
                ...state,
                addFavorite: {
                    ...state.addFavorite,
                    loading: false,
                    success: false,
                    error: {
                        state: true,
                        statusCode: action.payload
                    }
                }
            }
        case ADD_FAVORITE_RESET:
            return {
                ...state,
                addFavorite: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        case GET_FAVORITES:
            return {
                ...state,
                favorites: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case GET_FAVORITES_SUCCESS:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    loading: false,
                    success: action.payload,
                    error: false
                }
            }
        case GET_FAVORITES_FAILED:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case GET_FAVORITES_RESET:
            return {
                ...state,
                favorites: {
                    loading: false,
                    success: null,
                    error: null
                },
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                removeFavorite: {
                    loading: true,
                    success: null,
                    error: null
                }
            }
        case REMOVE_FAVORITE_SUCCESS:
            return {
                ...state,
                removeFavorite: {
                    ...state.removeFavorite,
                    loading: false,
                    success: true,
                    error: false
                }
            }
        case REMOVE_FAVORITE_FAILED:
            return {
                ...state,
                removeFavorite: {
                    ...state.removeFavorite,
                    loading: false,
                    success: false,
                    error: true
                }
            }
        case REMOVE_FAVORITE_RESET:
            return {
                ...state,
                removeFavorite: {
                    loading: false,
                    success: null,
                    error: null
                }
            }
        default:
            return state
    }
}