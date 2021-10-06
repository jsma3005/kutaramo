import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MainLayout from "../../../components/MainLayout"
import Loader from "../../../components/MiniComponents/Loader"
import PrivateRoute from "../../../components/PrivateRoute"
import { getStaticLang } from "../../../helpers/languages"
import { getEntityOrderHistoryAction, getPhisOrderHistoryAction } from "../../../redux/Order/actions"
import cls from '../../../styles/Purchases.module.scss'
import orderLang from '../../../data/languages/order/index.json'
import PurchasesProduct from "../../../components/MiniComponents/PurchasesProduct"
import titlesLang from '../../../data/languages/titles/index.json'

const Purchases = ({ ssg }) => {
    const dispatch = useDispatch();
    const { physHistory, entityHistory } = useSelector(s => s.Order)
    
    useEffect(() => {
        dispatch(getPhisOrderHistoryAction());
        dispatch(getEntityOrderHistoryAction());
    }, [ssg, dispatch]);
    
    return (
        <MainLayout title={getStaticLang(titlesLang.purchases)} isFooter={true}>
            <PrivateRoute>
                <div className={cls.root}>
                    <span className={cls.goBack} onClick={() => router.back()}>{getStaticLang(orderLang.goBack)}</span>
                    {
                        physHistory.loading && entityHistory.loading &&
                        <div className={cls.loader}>
                            <Loader isLoadingPage={false} />
                        </div>
                    }
                    {
                        physHistory.success && entityHistory.success && (
                            <h1 className={cls.title}>{getStaticLang(orderLang.purchasesTitle)}</h1>
                        )
                    }
                    <div className={cls.cartContainer}>
                        <div className={cls.cartLayout}>
                            {
                                !physHistory.loading && physHistory.success && (
                                    physHistory?.success.map((item) => (
                                        <PurchasesProduct 
                                            key={item.id}
                                            image={item.image}
                                            title={item.title}
                                            price={item.price}
                                            color={item.color}
                                            size={item.size}
                                            description={'Test description'}
                                            amount={item.amount}
                                        />
                                    ))
                                )
                            }
                            {
                                !entityHistory.loading && entityHistory.success && (
                                    entityHistory?.success.map((item) => (
                                        <PurchasesProduct 
                                            key={item.id}
                                            image={item.image}
                                            title={item.title}
                                            price={item.price}
                                            color={item.color}
                                            size={item.size}
                                            description={'Test description'}
                                            amount={item.amount}
                                        />
                                    ))
                                )
                            }
                        </div>
                    </div>
                    {
                        entityHistory.success && physHistory.success && (
                            entityHistory.success.length === 0 && physHistory.success.length && (
                                <h1 className={cls.emptyTitle}>{getStaticLang(orderLang.emptyCart)}</h1>
                            )
                        )
                    }
                </div>
            </PrivateRoute>
        </MainLayout>
    )
}

export default Purchases