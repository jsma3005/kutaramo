import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { social } from '../../documentation/social';
import { getStaticLang } from '../../helpers/languages';
import { resetSubscribeAction, subscribeAction } from '../../redux/Newsletter/actions';
import Button from '../MiniComponents/Button';
import ErrorMessage from '../MiniComponents/ErrorMessage';
import cls from './Footer.module.scss';
import footerLang from '../../data/languages/footer/index.json'
import { successNotify } from '../../helpers/notification';
import notificationLang from '../../data/languages/notifications/index.json'

const Footer = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const newsletter = useSelector(s => s.Newsletter);

    useEffect(() => {
        if(!newsletter.loading){
            if(newsletter.success){
                successNotify(getStaticLang(notificationLang.successSubscribed))
                dispatch(resetSubscribeAction())
            }
        }
    }, [dispatch, newsletter])

    const handleSubmit = () => {
        dispatch(subscribeAction({
            email
        }))
    }

    const handleKeyPressSubmit = e => {
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }

    useEffect(() => {
        if(!newsletter.loading && newsletter.success){
            setEmail('')
        }
    }, [setEmail, newsletter.loading, newsletter.success])

    return (
        <div className={cls.root}>
            <h1>{getStaticLang(footerLang.join)}</h1>
            <div className={cls.emailInput}>
                <input 
                    type='email' 
                    placeholder={getStaticLang(footerLang.enter)} 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyPress={e => handleKeyPressSubmit(e)}
                />
                <span className={cls.errorText}>
                    {
                        newsletter.error && <ErrorMessage errors={newsletter.error} field='email' />
                    }
                </span>
            </div>
            <div className={cls.submitBtn}>
                <Button disabled={newsletter.loading} onClick={handleSubmit}>{getStaticLang(footerLang.submit)}</Button>
            </div>
            <div className={cls.social}>
                <ul>
                    {
                        social.map(({ id, title, link }) => (
                            <li key={id}>
                                <a rel='noreferrer' target='_blank' href={link}>{title}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Footer