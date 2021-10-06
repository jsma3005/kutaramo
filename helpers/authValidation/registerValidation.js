import { getStaticLang } from "../languages";

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/
import validLang from '../../data/languages/validations/index.json'

export const registerValidation = (postData, errorData) => {
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

    if(!postData.first_name){
        errorData.push({
            field: 'first_name',
            message: getStaticLang(validLang.name)
        })
    }

    if(!postData.phone_number){
        errorData.push({
            field: 'phone_number',
            message: getStaticLang(validLang.phone.empty)
        })
    }

    if(!phoneRegExp.test(postData.phone_number)){
        errorData.push({
            field: 'phone_number',
            message: getStaticLang(validLang.phone.incorrect)
        })
    }

    if(!postData.password_repeat){
        errorData.push({
            field: 'password_repeat',
            message: getStaticLang(validLang.passwordRepeat.empty)
        })
    }

    if(!postData.last_name){
        errorData.push({
            field: 'last_name',
            message: getStaticLang(validLang.lastName)
        })
    }

    if(postData.password.length < 6){
        errorData.push({
            field: 'password',
            message: getStaticLang(validLang.password.short)
        })
    }

    if(postData.password !== postData.password_repeat){
        errorData.push({
            field: "password",
            message: getStaticLang(validLang.password.mismatch)
        })

        errorData.push({
            field: "password_repeat",
            message: getStaticLang(validLang.password.mismatch)
        })
    }
}