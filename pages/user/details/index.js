import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import A from "../../../components/MiniComponents/A";
import MainLayout from "../../../components/MainLayout"
import Button from "../../../components/MiniComponents/Button";
import Input from "../../../components/MiniComponents/Input";
import PrivateRoute from "../../../components/PrivateRoute"
import { signOutAction } from "../../../redux/App/actions";
import cls from '../../../styles/User.module.scss';
import { USER_DETAILS_URL, USER_PURCHASES_URL } from "../../../constants/appConstants/constantsURL";
import { getUserAction, resetUserUpdateAction, updateUserAction } from "../../../redux/User/actions";
import ErrorMessage from "../../../components/MiniComponents/ErrorMessage";
import { successNotify } from "../../../helpers/notification";
import { removeEmptyKeys } from "../../../helpers";
import userLang from '../../../data/languages/user/index.json'
import formsLang from '../../../data/languages/forms/index.json'
import notifyLang from '../../../data/languages/notifications/index.json'
import { getStaticLang } from "../../../helpers/languages";
import titlesLang from '../../../data/languages/titles/index.json'

const userDetails = [
    {
        id: 1,
        title: getStaticLang(userLang.personalDetails),
        link: USER_DETAILS_URL
    },
    {
        id: 2,
        title: getStaticLang(userLang.purchases),
        link: USER_PURCHASES_URL
    }
]

const changeProfilePages = [
    {
        id: 1,
        title: getStaticLang(userLang.details),
        constant: 'info'
    },
    {
        id: 2,
        title: getStaticLang(userLang.email),
        constant: 'email'
    },
    {
        id: 3,
        title: getStaticLang(userLang.password),
        constant: 'password'
    }
]

const UserDetails = () => {
    const router = useRouter();
    const { user, updateUser } = useSelector(s => s.User);
    const [personalInfo, setPersonalInfo] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        city: '',
        postcode: ''
    })
    const [email, setEmail] = useState('')
    const [passwordData, setPasswordData] = useState({
        password: '',
        password_repeat: '',
    })
    const [changePage, setChangePage] = useState('info');
    const [width, setWidth] = useState(1000);
    const updateBtnTitle = changePage === 'password' ? getStaticLang(userLang.password) : changePage === 'email' ? getStaticLang(userLang.email) : getStaticLang(userLang.details);
    const dispatch = useDispatch();

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
        if(updateUser.success){
            successNotify(getStaticLang(notifyLang.updated));
            dispatch(resetUserUpdateAction())
            resetForm()
            dispatch(getUserAction())
        }
    }, [updateUser, dispatch])

    const onChangeInput = (value, key) => {
        if(changePage === 'info'){
            setPersonalInfo(prev => {
                return {
                    ...prev,
                    [key]: value
                }
            })
        }else if(changePage === 'email'){
            setEmail(value)
        }else{
            setPasswordData(prev => {
                return {
                    ...prev,
                    [key]: value
                }
            })
        }
    }

    const handleSignOut = () => {
        dispatch(signOutAction(router));
    }

    function resetForm(){
        setPersonalInfo({
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            city: '',
            postcode: ''
        })

        setPasswordData({
            password: '',
            password_repeat: '',
        })

        setEmail('')
    }

    const handleSubmitUpdate = () => {
        if(changePage === 'info'){
            return dispatch(updateUserAction(user?.id, removeEmptyKeys(personalInfo)));
        }

        if(changePage === 'email'){
            return dispatch(updateUserAction(user?.id, { email: email }));
        }

        if(changePage === 'password'){
            return dispatch(updateUserAction(user?.id, passwordData));
        }
    }

    return (
        <MainLayout title={getStaticLang(titlesLang.userDetails)} isFooter={false}>
            <PrivateRoute>
                <span className={cls.goBack} onClick={() => router.back()}>{getStaticLang(userLang.back)}</span>   
                <div className={cls.root}>
                    <div className={cls.personalDetails}>
                        <ul>
                            {
                                userDetails.map(({ id, link, title }) => (
                                    <li key={id}>
                                        <A 
                                            text={title}
                                            href={link}
                                        />
                                    </li>
                                ))
                            }
                            <li onClick={handleSignOut} className={cls.endSession}>{getStaticLang(userLang.signOut)}</li>
                        </ul>
                    </div>
                    <div className={cls.userDetails}>
                        <div className={cls.form}>
                            <h1 className={cls.title}>{getStaticLang(userLang.personalDetails)}</h1>
                            <p className={cls.description}>{getStaticLang(userLang.description)}</p>
                            <div className={cls.changeBtns}>
                                {
                                    changeProfilePages.map(({ id, title, constant }) => (
                                        <Button 
                                            onClick={() => setChangePage(constant)}
                                            key={id}
                                        >
                                            {getStaticLang(userLang.change)} {title}
                                        </Button>
                                    ))
                                }
                            </div>
                            <div className={cls.inputsFlex}>
                                <div className={cls.col}>
                                    {
                                        changePage === 'info' && (
                                            <>
                                                <Input 
                                                    type='text'
                                                    label={getStaticLang(formsLang.name)}
                                                    placeholder={user?.first_name}
                                                    value={personalInfo.first_name}
                                                    name='first_name'
                                                    onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                    errorText={
                                                        updateUser.error && <ErrorMessage errors={updateUser.error} field='first_name' />
                                                    }
                                                />
                                                {
                                                    width <= 600 && (
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.lastName)}
                                                            placeholder={user?.last_name}
                                                            value={personalInfo.last_name}
                                                            name='last_name'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                updateUser.error && <ErrorMessage errors={updateUser.error} field='last_name' />
                                                            }
                                                        />
                                                    )
                                                }
                                                <Input 
                                                    type='text'
                                                    label={getStaticLang(formsLang.address)}
                                                    value={personalInfo.address}
                                                    name='address'
                                                    onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                    placeholder={user?.address}
                                                    errorText={
                                                        updateUser.error && <ErrorMessage errors={updateUser.error} field='address' />
                                                    }
                                                />
                                                <Input 
                                                    type='tel'
                                                    label={getStaticLang(formsLang.phone)}
                                                    value={personalInfo.phone_number}
                                                    name='phone_number'
                                                    onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                    placeholder={user?.phone_number}
                                                    errorText={
                                                        updateUser.error && <ErrorMessage errors={updateUser.error} field='phone_number' />
                                                    }
                                                />
                                            </>
                                        )
                                    }
                                    {
                                        changePage === 'email' && (
                                            <Input 
                                                type='email'
                                                label={getStaticLang(formsLang.email)}
                                                placeholder={user?.email}
                                                value={email}
                                                name='email'
                                                onChange={e => onChangeInput(e.target.value, e.target.name)}
                                            />
                                        )
                                    }
                                    {
                                        changePage === 'password' && (
                                            <Input 
                                                type='password'
                                                label={getStaticLang(formsLang.newPassword)}
                                                placeholder='********'
                                                value={passwordData.password}
                                                name='password'
                                                onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                errorText={
                                                    updateUser.error && <ErrorMessage errors={updateUser.error} field='password' />
                                                }
                                            />
                                        )
                                    }
                                </div>
                                <div className={cls.col}>
                                    {
                                        changePage === 'info' && (
                                            <>
                                                {
                                                    width > 600 && (
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.lastName)}
                                                            placeholder={user?.last_name}
                                                            value={personalInfo.last_name}
                                                            name='last_name'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                updateUser.error && <ErrorMessage errors={updateUser.error} field='last_name' />
                                                            }
                                                        />
                                                    )
                                                }
                                                <Input 
                                                    type='text'
                                                    label={getStaticLang(formsLang.city)}
                                                    placeholder={user?.city ? user?.city : 'Moscow'}
                                                    value={personalInfo.city}
                                                    name='city'
                                                    onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                    errorText={
                                                        updateUser.error && <ErrorMessage errors={updateUser.error} field='city' />
                                                    }
                                                />
                                                <Input 
                                                    type='text'
                                                    label={getStaticLang(formsLang.postcode)}
                                                    placeholder={user?.postcode ? user?.postcode : '101000'}
                                                    value={personalInfo.postcode}
                                                    name='postcode'
                                                    onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                    errorText={
                                                        updateUser.error && <ErrorMessage errors={updateUser.error} field='postcode' />
                                                    }
                                                />
                                            </>
                                        )
                                    }
                                    {
                                        changePage === 'password' && (
                                            <Input 
                                                type='password'
                                                label={getStaticLang(formsLang.repeatPassword)}
                                                placeholder='********'
                                                value={passwordData.password_repeat}
                                                name='password_repeat'
                                                onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                errorText={
                                                    updateUser.error && <ErrorMessage errors={updateUser.error} field='password_repeat' />
                                                }
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <div className={cls.submit}>
                                <Button disabled={updateUser.loading} onClick={handleSubmitUpdate}>{getStaticLang(userLang.update)} {updateBtnTitle}</Button>
                                <Button onClick={resetForm}>{getStaticLang(userLang.resetBtn)}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PrivateRoute>
        </MainLayout>
    )
}

export default UserDetails