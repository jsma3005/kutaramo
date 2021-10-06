import MainLayout from '../../components/MainLayout'
import PrivateRoute from '../../components/PrivateRoute'
import cls from '../../styles/Cart.module.scss'
import cartLang from '../../data/languages/cart/index.json'
import { getStaticLang } from '../../helpers/languages'
import { useRouter } from 'next/router'
import Loader from '../../components/MiniComponents/Loader'
import notificationLang from '../../data/languages/notifications/index.json'
import CartProduct from '../../components/MiniComponents/CartProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCartsAction, resetRemoveCartAction } from '../../redux/Cart/actions'
import { initializeStore } from '../../redux/store'
import { errorNotify, successNotify } from '../../helpers/notification'
import Button from '../../components/MiniComponents/Button'
import { totalPriceCalc } from '../../helpers'
import { ORDER_URL } from '../../constants/appConstants/constantsURL'
import titlesLang from '../../data/languages/titles/index.json'

const Cart = ({ ssg }) => {
    const router = useRouter();
    const { carts, removeCart } = useSelector(s => s.Cart);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if(!removeCart.loading){
            if(removeCart.success){
                successNotify(getStaticLang(notificationLang.successRemove), 2000)
                dispatch(resetRemoveCartAction())
                dispatch(getCartsAction(router.query.userId))
            }

            if(removeCart.error){
                errorNotify(getStaticLang(notificationLang.wrong), 2000)
                dispatch(resetRemoveCartAction())
            }
        }
    }, [dispatch, removeCart])

    useEffect(() => {
        if(ssg){
            dispatch(getCartsAction(router.query.userId))
        }
    }, [ssg, dispatch])

    useEffect(() => {
        if(!carts.loading){
            if(carts.success){
                setTotalPrice(totalPriceCalc(carts.success))
            }
        }
    }, [carts])

    const handleOrder = () => {
        router.push(ORDER_URL)
    }

    return (
        <MainLayout title={getStaticLang(titlesLang.cart)} isFooter={true}>
            <PrivateRoute>
                <div className={cls.root}>
                    {
                        carts.loading && 
                        <div className={cls.loader}>
                            <Loader isLoadingPage={false} />
                        </div>
                    }
                    {
                        !carts.loading && carts.success && (
                            <>
                                <span className={cls.goBack} onClick={() => router.back()}>{getStaticLang(cartLang.goBack)}</span>
                                <h1 className={cls.title}>{getStaticLang(cartLang.cartTitle)}</h1>
                                <div className={cls.cartContainer}>
                                    {
                                        carts.success?.length === 0 && (
                                            <h1 className={cls.emptyTitle}>{getStaticLang(cartLang.emptyCart)}</h1>
                                        )
                                    }
                                    {
                                        carts.success?.length !== 0 && (
                                            <>
                                                <div className={cls.cartLayout}>
                                                    {
                                                        carts.success.map((item, index) => (
                                                            <CartProduct 
                                                                key={item.id} 
                                                                products_image={item.product_item.products_image}
                                                                title={item.product_item.title}
                                                                description={item.product_item.description}
                                                                price={item.product_item.price}
                                                                color={item.product_item.color}
                                                                size={item.product_item.size}
                                                                id={item.product_item.id}
                                                                product={item.product_item.product}
                                                                cartProductId={item.id}
                                                                item={item}
                                                                index={index}
                                                                productAmount={item.amount}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div className={cls.continue}>
                                                    <span className={cls.total}>
                                                        {getStaticLang(cartLang.total)}: <span className={cls.price}>{totalPrice} ₽</span>
                                                    </span>
                                                    <Button onClick={handleOrder}>{getStaticLang(cartLang.continue)}</Button>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </PrivateRoute>
        </MainLayout>
    )
}

Cart.getInitialProps = async (ctx) => {
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;
  
    if(!ctx.req){
      return {
        ssg: true
      }
    }

    await dispatch(getCartsAction(ctx.query.userId))
    return { initialReduxState: reduxStore.getState() };
}

export default Cart