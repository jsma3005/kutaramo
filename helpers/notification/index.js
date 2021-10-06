import { toast } from 'react-toastify';

export const errorNotify = (text, duration = 3000) => {
    toast.configure();
    toast.error(text, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: duration
    })
}

export const successNotify = (text, duration = 3000) => {
    toast.configure();
    toast.success(text, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: duration
    })
}