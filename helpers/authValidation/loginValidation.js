import { getStaticLang } from "../languages";
import validLang from '../../data/languages/validations/index.json'

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginValidation = (postData, errorData) => {
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

    if(!postData.password){
        errorData.push({
            field: 'password',
            message: getStaticLang(validLang.password.empty)
        })
    }

    if(postData.password.length < 6){
        errorData.push({
            field: 'password',
            message: getStaticLang(validLang.password.short)
        })
    }
}