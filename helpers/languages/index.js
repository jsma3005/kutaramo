import { INITIAL_LANG } from "../../constants/appConstants/constantsLang";

export const getStaticLang = (langObj) => {
    return langObj[INITIAL_LANG]
}