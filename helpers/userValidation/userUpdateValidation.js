const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/
import validLang from '../../data/languages/validations/index.json'
import { getStaticLang } from '../languages';

export const userUpdateValidation = (postData, errorData) => {
    if(postData.email){
        if(!emailRegExp.test(String(postData.email).toLowerCase())){
            errorData.push({
                field: 'email',
                message: getStaticLang(validLang.email.incorrect)
            })
        }
    }

    if(postData.phone_number){
        if(!phoneRegExp.test(postData.phone_number)){
            errorData.push({
                field: 'phone_number',
                message: getStaticLang(validLang.phone.incorrect)
            })
        }
    }

    if(postData.password){
        if(postData.password.length < 6){
            errorData.push({
                field: 'password',
                message: getStaticLang(validLang.password.short)
            })
        }
    }

    if(postData.password_repeat){
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
}