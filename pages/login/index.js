import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import A from "../../components/MiniComponents/A";
import MainLayout from "../../components/MainLayout";
import Button from "../../components/MiniComponents/Button";
import ErrorMessage from "../../components/MiniComponents/ErrorMessage";
import Input from "../../components/MiniComponents/Input";
import { loginAction } from "../../redux/Login/actions";
import cls from '../../styles/Login.module.scss';
import { FORGOT_PASS_URL, REGISTER_URL } from "../../constants/appConstants/constantsURL";
import { getStaticLang } from "../../helpers/languages";
import authLang from '../../data/languages/auth/index.json'
import formsLang from '../../data/languages/forms/index.json'
import titlesLang from '../../data/languages/titles/index.json'

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { login } = useSelector(s => s.Login);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(loginAction({
            email,
            password
        }, router))
    }

    const handleKeyPressSubmit = e => {
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }

    return (
        <MainLayout title={getStaticLang(titlesLang.login)} isFooter={true}>
            <div className={cls.root}>
                <span className={cls.goBack} onClick={() => router.back()}>{getStaticLang(authLang.goBack)}</span>
                <div className={cls.authContainer}>
                    <div className={cls.login}> 
                        <h1 className={cls.authTitle}>{getStaticLang(authLang.login)}</h1>
                        <div className={cls.inputGroup}>
                            <span className={cls.errorText}>
                                {
                                    login.error && <ErrorMessage errors={login.error} field='detail' />
                                }
                            </span>
                            <Input 
                                label={getStaticLang(formsLang.email)}
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                errorText={
                                    login.error && <ErrorMessage errors={login.error} field='email' />
                                }
                            />
                            <Input 
                                label={getStaticLang(formsLang.password)}
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                errorText={
                                    login.error && <ErrorMessage errors={login.error} field='password' />
                                }
                                onKeyPress={e => handleKeyPressSubmit(e)}
                            />
                            <A 
                                text={getStaticLang(authLang.forgotPass)}
                                href={FORGOT_PASS_URL}
                                className={cls.forgotPass}
                            />
                            <div className={cls.logInBtnContainer}>
                                <Button disabled={login.loading} onClick={handleSubmit} className={cls.logInBtn}>{getStaticLang(authLang.loginBtn)}</Button>
                            </div>
                        </div>
                    </div>
                    <div className={cls.register}>
                        <h1 className={cls.authTitle}>{getStaticLang(authLang.register)}</h1>
                        <p>{getStaticLang(authLang.registerRef.part_1)}</p>
                        <p>{getStaticLang(authLang.registerRef.part_2)}</p>
                        <Button onClick={() => router.push(REGISTER_URL)} className={cls.logUpBtn}>{getStaticLang(authLang.createBtn)}</Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Login;