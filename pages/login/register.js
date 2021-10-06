import MainLayout from "../../components/MainLayout"
import { useRouter } from "next/dist/client/router";
import cls from '../../styles/Register.module.scss';
import Input from "../../components/MiniComponents/Input";
import Button from "../../components/MiniComponents/Button";
import cn from 'classnames'
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/MiniComponents/ErrorMessage";
import { registerAction, resetRegisterAction } from "../../redux/Login/actions";
import { useEffect, useState } from "react";
import authLang from '../../data/languages/auth/index.json'
import formsLang from '../../data/languages/forms/index.json'
import { getStaticLang } from "../../helpers/languages";
import { successNotify } from "../../helpers/notification";
import titlesLang from '../../data/languages/titles/index.json'

const Register = () => {
    const router = useRouter();
    const { register } = useSelector(s => s.Login);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [width, setWidth] = useState(1000);

    useEffect(() => {
        setWidth(window.screen.width);
    
        const handleSetWidth = e => {
          setWidth(e.target.innerWidth)
        }
    
        window.addEventListener('resize', handleSetWidth)
    
        return () => {
          window.removeEventListener('resize', handleSetWidth);
        }
    }, [setWidth])

    useEffect(() => {
        if(register.success){
            successNotify(getStaticLang(authLang.confirmEmail), 5000);
            dispatch(resetRegisterAction())
            resetForm()
        }
    }, [register, dispatch])

    function resetForm(){
        setEmail('');
        setPassword('');
        setPasswordRepeat('')
        setName('');
        setLastName('')
        setPhone('')
    }

    const handleSubmit = () => {
        dispatch(registerAction({
            email,
            password,
            password_repeat: passwordRepeat,
            first_name: name,
            last_name: lastName,
            phone_number: phone
        }, router))
    }

    return (
        <MainLayout title={getStaticLang(titlesLang.register)} isFooter={true}>
            <div className={cls.root}>
                <span className={cls.goBack} onClick={() => router.back()}>{getStaticLang(authLang.goBack)}</span>
                <h1 className={cls.personalTitle}>{getStaticLang(authLang.register)}</h1>
                <div className={cls.registerContainer}>
                    <div className={cls.col}>
                        <div className={cls.inputGroup}>
                            <Input 
                                label={getStaticLang(formsLang.email)}
                                type='email'
                                errorText={
                                    register.error && <ErrorMessage errors={register.error} field='email' />
                                }
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            <Input 
                                label={getStaticLang(formsLang.password)}
                                type='password'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                errorText={
                                    register.error && <ErrorMessage errors={register.error} field='password' />
                                }
                            />
                            {
                                width <= 600 && (
                                    <Input 
                                        label={getStaticLang(formsLang.repeatPassword)}
                                        type='password'
                                        onChange={e => setPasswordRepeat(e.target.value)}
                                        value={passwordRepeat}
                                        errorText={
                                            register.error && <ErrorMessage errors={register.error} field='password_repeat' />
                                        }
                                    />
                                )
                            }
                            <Input 
                                label={getStaticLang(formsLang.name)}
                                type='text'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                errorText={
                                    register.error && <ErrorMessage errors={register.error} field='first_name' />
                                }
                            />
                            {
                                width <= 600 && (
                                    <Input 
                                        label={getStaticLang(formsLang.lastName)}
                                        type='text'
                                        onChange={e => setLastName(e.target.value)}
                                        value={lastName}
                                        errorText={
                                            register.error && <ErrorMessage errors={register.error} field='last_name' />
                                        }
                                    />
                                )
                            }
                            <Input 
                                label={getStaticLang(formsLang.phone)}
                                type='text'
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                                errorText={
                                    register.error && <ErrorMessage errors={register.error} field='phone_number' />
                                }
                            />
                        </div>
                    </div>
                    <div className={cls.col}>
                        <div className={cls.inputGroup}>
                            {
                                width > 600 && (
                                    <Input 
                                        label={getStaticLang(formsLang.repeatPassword)}
                                        type='password'
                                        onChange={e => setPasswordRepeat(e.target.value)}
                                        value={passwordRepeat}
                                        errorText={
                                            register.error && <ErrorMessage errors={register.error} field='password_repeat' />
                                        }
                                    />
                                )
                            }
                            {
                                width > 600 && (
                                    <Input 
                                        label={getStaticLang(formsLang.lastName)}
                                        type='text'
                                        onChange={e => setLastName(e.target.value)}
                                        value={lastName}
                                        errorText={
                                            register.error && <ErrorMessage errors={register.error} field='last_name' />
                                        }
                                    />
                                )
                            }
                        </div>
                    </div>
                    <div className={cn(cls.col, cls.createBtn)}>
                        <Button disabled={register.loading} onClick={handleSubmit}>{getStaticLang(authLang.createBtn)}</Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Register