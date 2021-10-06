const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
import validLang from '../../data/languages/validations/index.json'
import { getStaticLang } from '../languages';

export const subscribeValidation = (postData, errorData) => {
    if(!postData.email){
        errorData.push({
            field: 'email',
            message: getStaticLang(validLang.email.empty)
        })
    }

    if(!emailRegExp.test(String(postData.email).toLowerCase())){
        errorData.push({
            field: 'email',
            message: getStaticLang(validLang.email.incorrect)
        })
    }
}