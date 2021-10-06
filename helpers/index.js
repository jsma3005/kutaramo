import { apiUrl } from "../configs/config";
import { INITIAL_LANG } from "../constants/appConstants/constantsLang";
import { RECENT } from "../constants/appConstants/constantsLocalStorage";
import { refreshTokenAction } from "../redux/Login/actions";

export function isFailedAuth(error, cb, dispatch){
    if(error?.status === 403){
        const refreshToken = localStorage.getItem('refreshToken')
        if(refreshToken){
            dispatch(refreshTokenAction({
                refresh: refreshToken
            }, cb))
        }
    }
}

export function urlCreatorApiLang(url){
    return `${apiUrl}/${INITIAL_LANG}${url}`;
}

export function removeEmptyKeys(obj){
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != ''));
}

export function addSearchRecent(recent, title){
    if(recent){
        if(recent.length >= 20){
            localStorage.setItem('recent', JSON.stringify([...recent, { id: recent[recent.length - 1].id + 1, title: title }].slice(1)));
        }else{
            localStorage.setItem('recent', JSON.stringify([...recent, { id: recent[recent.length - 1].id + 1, title: title }]));
        }
    }
}

export function createSearchRecent(title){
    localStorage.setItem('recent', JSON.stringify([{ id: 1, title: title }]))
}

export function getRecent(){
    if(typeof window !== 'undefined'){
        return JSON.parse(localStorage.getItem(RECENT));
    }
}

// export function slicedProducts(data){
//     if(data){
//         return {
//             left: data.slice(0, Math.ceil(data.length / 2)),
//             right: data.slice(Math.ceil(data.length / 2 ))
//         }
//     }else{
//         return []
//     }
    
// }

export function isLikedHelper(favorites, product){
    if(favorites.success){
        const findLikedProduct = favorites.success?.find(item => item.products[0].id === product.id);
        return true ? findLikedProduct : false
    }else{
        return false
    }
}

export function isCartHelper(carts, product){
    if(carts.success){
        const findCartProduct = carts.success?.find(item => item.product_item.id === product.id);
        return true ? findCartProduct : false
    }else{
        return false
    }
}

export function cuttedProductTitle(str){
    if(str){
        const splittedStr = str.split('');
        if(splittedStr.length >= 28){
            const slicedStr = splittedStr.slice(0, 28);
            return slicedStr.join('') + "...";
        }else{
            return str;
        }
    }else{
        return str
    }
}

export function totalPriceCalc(data){
    const totalPrice = data.reduce((prev, item) => {
        return prev + +item.product_item.price;
    }, 0)
    return totalPrice
}

export function uniqueColors(data){
    if(data){
        return [...new Set(data.map(item => item.color))];
    }else{
        return [];
    }
}