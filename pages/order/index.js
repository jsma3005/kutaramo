import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout"
import PrivateRoute from "../../components/PrivateRoute"
import cls from '../../styles/Order.module.scss';
import cn from 'classnames'
import Button from "../../components/MiniComponents/Button";
import Input from "../../components/MiniComponents/Input";
import { getStaticLang } from "../../helpers/languages";
import orderLang from '../../data/languages/order/index.json'
import { useDispatch, useSelector } from "react-redux";
import { postOrderAction, resetPostOrderAction, resetValidationAction, validateOrderFormAction } from "../../redux/Order/actions";
import formsLang from '../../data/languages/forms/index.json'
import ErrorMessage from "../../components/MiniComponents/ErrorMessage";
import notificationLang from '../../data/languages/notifications/index.json'
import { HOME_URL } from "../../constants/appConstants/constantsURL";
import { errorNotify } from "../../helpers/notification";
import titlesLang from '../../data/languages/titles/index.json'

const Order = () => {
    const router = useRouter();
    const [activeFace, setActiveFace] = useState(0);
    const [activeMethod, setActiveMethod] = useState(0)
    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const { validation, postOrder } = useSelector(s => s.Order);
    const stepTitle = step === 1 ? getStaticLang(orderLang.chooseFace) : step === 2 ? getStaticLang(orderLang.details) : step === 3 ? getStaticLang(orderLang.methodPayment) : getStaticLang(orderLang.orderProcessed);
    const [detailInfo, setDetailInfo] = useState(null);
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        if(!postOrder.loading){
            if(postOrder.error){
                errorNotify(getStaticLang(notificationLang.wrong), 2000)
                dispatch(resetPostOrderAction())
                setStep(1)
            }
      
            if(postOrder.success){
                setOrderId(postOrder.success.order_id)
                dispatch(resetPostOrderAction())
                setStep(4)
            }
          }
    }, [dispatch, postOrder])

    useEffect(() => {
        if(validation.success){
            setStep(3);
            dispatch(resetValidationAction())
        }
    }, [dispatch, validation])

    useEffect(() => {
        dispatch(resetValidationAction())
    }, [dispatch, activeFace])

    useEffect(() => {
        if(activeFace === 0){
            setDetailInfo({
                fname: '',
                lname: '',
                email: '',
                address: '',
                number: '',
                city: '',
                comment: '',
                payment_type: ''
            })
        }else if(activeFace === 1){
            setDetailInfo({
                fname: '',
                lname: '',
                email: '',
                address: '',
                number: '',
                city: '',
                comment: '',
                inn: '',
                kpp: '',
                contact_face: '',
                company_name: '',
                payment_type: ''
            })
        }
    }, [activeFace])

    const handleChooseLegalFace = () => {
        setActiveFace(1);
    }

    const handleChooseIndivFace = () => {
        setActiveFace(0)
    }

    const handleChooseCheck = () => {
        setActiveMethod(0)
    }
    
    const handleChooseCard = () => {
        setActiveMethod(1)
    }

    const handleNextStep = () => {
        if(step === 2){
            if(activeFace === 0){
                dispatch(validateOrderFormAction(detailInfo, 'indiv'))
            }else if(activeFace === 1){
                dispatch(validateOrderFormAction(detailInfo, 'entity'))
            }
        }else{
            setStep(prev => prev + 1);
        }
    }

    const handlePrevStep = () => {
        setStep(prev => prev - 1)
    }

    const onChangeInput = (value, key) => {
        setDetailInfo(prev => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const handleFinish = () => {
        dispatch(postOrderAction(activeFace, detailInfo, activeMethod === 0 ? getStaticLang(orderLang.checkPayment) : getStaticLang(orderLang.cardPayment)))
    }

    return (
        <MainLayout title={getStaticLang(titlesLang.ordering)} isFooter={false}>
            <PrivateRoute>
                <div className={cls.root}>
                    <span className={cls.goBack} onClick={() => router.back()}>Назад</span>
                    <div className={cls.orderContent}>
                        <h1 className={cls.stepTitle}>{stepTitle}</h1>
                        <div className={cls.stepContent}>
                            {
                                step === 1 && (
                                    <div className={cls.selector}>
                                        <div 
                                            className={cn(cls.indiv, {[cls.activeFace]: activeFace === 0})} 
                                            onClick={handleChooseIndivFace}
                                        >физическое лицо</div>
                                        <div 
                                            className={cn(cls.legal, {[cls.activeFace]: activeFace === 1})} 
                                            onClick={handleChooseLegalFace}
                                        >юридическое лицо</div>
                                    </div>
                                )
                            }
                            {
                                step === 2 && (
                                    <div className={cls.detailsForm}>
                                        {
                                            activeFace === 0 ? (
                                                <div className={cls.indivDetails}>
                                                    <div className={cls.col}>
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.name)}
                                                            value={detailInfo.fname}
                                                            name='fname'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='fname'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.lastName)}
                                                            value={detailInfo.lname}
                                                            name='lname'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='lname'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.city)}
                                                            value={detailInfo.city}
                                                            name='city'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='city'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.address)}
                                                            value={detailInfo.address}
                                                            name='address'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='address'
                                                                />
                                                            }
                                                        />
                                                    </div>
                                                    <div className={cls.col}>
                                                        <Input 
                                                            type='tel'
                                                            label={getStaticLang(formsLang.phone)}
                                                            value={detailInfo.number}
                                                            name='number'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='number'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='email'
                                                            label={getStaticLang(formsLang.email)}
                                                            value={detailInfo.email}
                                                            name='email'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='email'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            textarea={true}
                                                            type='text'
                                                            label={getStaticLang(formsLang.comment)}
                                                            value={detailInfo.comment}
                                                            name='comment'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={cls.legalDetails}>
                                                    <div className={cls.col}>
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.name)}
                                                            value={detailInfo.fname}
                                                            name='fname'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='fname'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.lastName)}
                                                            value={detailInfo.lname}
                                                            name='lname'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='lname'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.city)}
                                                            value={detailInfo.city}
                                                            name='city'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='city'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.companyName)}
                                                            value={detailInfo.company_name}
                                                            name='company_name'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='company_name'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.inn)}
                                                            value={detailInfo.inn}
                                                            name='inn'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='inn'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.kpp)}
                                                            value={detailInfo.kpp}
                                                            name='kpp'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='kpp'
                                                                />
                                                            }
                                                        />
                                                    </div>
                                                    <div className={cls.col}>
                                                        <Input 
                                                            type='tel'
                                                            label={getStaticLang(formsLang.phone)}
                                                            value={detailInfo.number}
                                                            name='number'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='number'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='email'
                                                            label={getStaticLang(formsLang.email)}
                                                            value={detailInfo.email}
                                                            name='email'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='email'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.orderAddress)}
                                                            value={detailInfo.address}
                                                            name='address'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='address'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            type='text'
                                                            label={getStaticLang(formsLang.contactFace)}
                                                            value={detailInfo.contact_face}
                                                            name='contact_face'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                            errorText={
                                                                validation.error && <ErrorMessage 
                                                                    errors={validation.error} 
                                                                    field='contact_face'
                                                                />
                                                            }
                                                        />
                                                        <Input 
                                                            textarea={true}
                                                            type='text'
                                                            label={getStaticLang(formsLang.comment)}
                                                            value={detailInfo.comment}
                                                            name='comment'
                                                            onChange={e => onChangeInput(e.target.value, e.target.name)}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            {
                                step === 3 && (
                                    <div className={cls.paymentMethod}>
                                        <div 
                                            onClick={handleChooseCheck}
                                            className={cn(cls.check, {[cls.activePaymentMethod]: activeMethod === 0})} 
                                        >{getStaticLang(orderLang.checkPayment)}</div>
                                        <div 
                                            onClick={handleChooseCard}
                                            className={cn(cls.card, {[cls.activePaymentMethod]: activeMethod === 1})} 
                                        >{getStaticLang(orderLang.cardPayment)}</div>
                                    </div>
                                )
                            }
                            {
                                step === 4 && (
                                    <div className={cls.finishStep}>
                                        <div className={cls.finishContent}>
                                            <h2>ваш номер заказа: №{orderId}</h2>
                                            <h1>наш менеджер скоро с вами свяжется :)</h1>
                                        </div>
                                        <div className={cls.backToMainBtn}>
                                            <Button onClick={() => router.push(HOME_URL)}>вернуться в главное меню</Button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {
                            step !== 4 && (
                                <div className={cls.continueBtn}>
                                    {
                                        step >= 2 && <Button onClick={handlePrevStep}>{getStaticLang(orderLang.back)}</Button>
                                    }
                                    {
                                        step <= 2 && <Button onClick={handleNextStep}>{getStaticLang(orderLang.continue)}</Button>
                                    }
                                    {
                                        step === 3 && <Button disabled={postOrder.loading} onClick={handleFinish}>Завершить</Button>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </PrivateRoute>
        </MainLayout>
    )   
}

export default Order