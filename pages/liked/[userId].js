import MainLayout from '../../components/MainLayout'
import PrivateRoute from '../../components/PrivateRoute'
import cls from '../../styles/Liked.module.scss'
import likedLang from '../../data/languages/liked/index.json'
import notificationLang from '../../data/languages/notifications/index.json'
import { getStaticLang } from '../../helpers/languages'
import { useRouter } from 'next/router'
import FavProduct from '../../components/MiniComponents/FavProduct'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeStore } from '../../redux/store'
import { getFavoritesAction, resetRemoveFavoriteAction } from '../../redux/Favorites/actions'
import Loader from '../../components/MiniComponents/Loader'
import { errorNotify, successNotify } from '../../helpers/notification'
import titlesLang from '../../data/languages/titles/index.json'

const Liked = ({ ssg }) => {
    const router = useRouter();
    const { favorites, removeFavorite } = useSelector(s => s.Favorites)
    const dispatch = useDispatch();

    useEffect(() => {
        if(!removeFavorite.loading){
            if(removeFavorite.success){
                successNotify(getStaticLang(notificationLang.successRemove), 2000)
                dispatch(resetRemoveFavoriteAction())
                dispatch(getFavoritesAction(router.query.userId))
            }

            if(removeFavorite.error){
                errorNotify(getStaticLang(notificationLang.wrong), 2000)
                dispatch(resetRemoveFavoriteAction())
            }
        }
    }, [dispatch, removeFavorite])

    useEffect(() => {
        if(ssg){
            dispatch(getFavoritesAction(router.query.userId))
        }
    }, [ssg, dispatch])

    return (
        <MainLayout title={getStaticLang(titlesLang.favorites)} isFooter={true}>
            <PrivateRoute>
                <div className={cls.root}>
                    {
                        favorites.loading && <div className={cls.loader}><Loader isLoadingPage={false} /></div>
                    }
                    {
                        !favorites.loading && favorites.success && (
                            <>
                                <span className={cls.goBack} onClick={() => router.back()}>{getStaticLang(likedLang.goBack)}</span>
                                <h1 className={cls.title}>{getStaticLang(likedLang.likedTitle)}</h1>
                                <div className={cls.likedContainer}>
                                    {
                                        favorites.success?.length === 0 && (
                                            <h1 className={cls.emptyTitle}>{getStaticLang(likedLang.emptyLiked)}</h1>
                                        )
                                    }
                                    {
                                        favorites.success?.length !== 0 && (
                                            <div className={cls.likedLayout}>
                                                {
                                                    favorites.success.map(({ id, products }) => (
                                                        <FavProduct 
                                                            likedProductId={id}
                                                            product={products[0].product} 
                                                            id={products[0].id}
                                                            key={id} 
                                                            products_image={products[0].products_image} 
                                                            title={products[0].title} 
                                                            description={products[0].description}
                                                            price={products[0].price}
                                                            color={products[0].color}
                                                            size={products[0].size}
                                                        />
                                                    ))
                                                }
                                            </div>
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

Liked.getInitialProps = async (ctx) => {
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;
  
    if(!ctx.req){
      return {
        ssg: true
      }
    }

    await dispatch(getFavoritesAction(ctx.query.userId))
    return { initialReduxState: reduxStore.getState() };
}

export default Liked