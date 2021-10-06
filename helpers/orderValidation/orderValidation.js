const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/
import validLang from '../../data/languages/validations/index.json'
import { getStaticLang } from '../languages';

export const indivOrderValidation = (postData, errorData) => {
    if(postData.email){
        if(!emailRegExp.test(String(postData.email).toLowerCase())){
            errorData.push({
                field: 'email',
                message: getStaticLang(validLang.email.incorrect)
            })
        }
    }

    if(postData.number){
        if(!phoneRegExp.test(postData.number)){
            errorData.push({
                field: 'number',
                message: getStaticLang(validLang.phone.incorrect)
            })
        }
    }

    if(!postData.email){
        errorData.push({
            field: 'email',
            message: getStaticLang(validLang.email.empty)
        })
    }

    if(!postData.number){
        errorData.push({
            field: 'number',
            message: getStaticLang(validLang.phone.empty)
        })
    }

    if(!postData.fname){
        errorData.push({
            field: 'fname',
            message: getStaticLang(validLang.name)
        })
    }

    if(!postData.lname){
        errorData.push({
            field: 'lname',
            message: getStaticLang(validLang.lastName)
        })
    }

    if(!postData.address){
        errorData.push({
            field: 'address',
            message: getStaticLang(validLang.address)
        })
    }

    if(!postData.city){
        errorData.push({
            field: 'city',
            message: getStaticLang(validLang.city)
        })
    }
}

export const entityOrderValidation = (postData, errorData) => {
    if(postData.email){
        if(!emailRegExp.test(String(postData.email).toLowerCase())){
            errorData.push({
                field: 'email',
                message: getStaticLang(validLang.email.incorrect)
            })
        }
    }

    if(postData.number){
        if(!phoneRegExp.test(postData.number)){
            errorData.push({
                field: 'number',
                message: getStaticLang(validLang.phone.incorrect)
            })
        }
    }

    if(!postData.email){
        errorData.push({
            field: 'email',
            message: getStaticLang(validLang.email.empty)
        })
    }

    if(!postData.number){
        errorData.push({
            field: 'number',
            message: getStaticLang(validLang.phone.empty)
        })
    }

    if(!postData.fname){
        errorData.push({
            field: 'fname',
            message: getStaticLang(validLang.name)
        })
    }

    if(!postData.lname){
        errorData.push({
            field: 'lname',
            message: getStaticLang(validLang.lastName)
        })
    }

    if(!postData.address){
        errorData.push({
            field: 'address',
            message: getStaticLang(validLang.address)
        })
    }

    if(!postData.city){
        errorData.push({
            field: 'city',
            message: getStaticLang(validLang.city)
        })
    }

    if(!postData.inn){
        errorData.push({
            field: 'inn',
            message: getStaticLang(validLang.inn)
        })
    }

    if(!postData.kpp){
        errorData.push({
            field: 'kpp',
            message: getStaticLang(validLang.kpp)
        })
    }

    if(!postData.contact_face){
        errorData.push({
            field: 'contact_face',
            message: getStaticLang(validLang.contact_face)
        })
    }

    if(!postData.company_name){
        errorData.push({
            field: 'company_name',
            message: getStaticLang(validLang.company_name)
        })
    }
}