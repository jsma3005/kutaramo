import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../../components/MainLayout"
import Button from "../../../components/MiniComponents/Button";
import cls from '../../../styles/SingleProduct.module.scss';
import { getStaticLang } from "../../../helpers/languages";
import productLang from '../../../data/languages/product/index.json'
import notificationLang from '../../../data/languages/notifications/index.json'
import { useEffect, useState } from "react";
import { initializeStore } from "../../../redux/store";
import { getSingleArticuleAction, getSingleProductItemAction, selectedProductItemAction } from "../../../redux/Products/actions";
import Loader from "../../../components/MiniComponents/Loader";
import { Gallery, Item } from 'react-photoswipe-gallery'
import A from "../../../components/MiniComponents/A";
import { LOGIN_URL } from "../../../constants/appConstants/constantsURL";
import cn from 'classnames'
import { addFavoriteAction, getFavoritesAction, resetAddFavoriteAction } from "../../../redux/Favorites/actions";
import { errorNotify, successNotify } from "../../../helpers/notification";
import { getCartsAction, postCartItemAction, resetPostCartItemAction } from "../../../redux/Cart/actions";

const Product = ({ ssg }) => {
    const router = useRouter();
    const { user } = useSelector(s => s.User);
    const { isAuth } = useSelector((s) => s.App);
    const { activeCategory } = useSelector(s => s.MainPage)
    const { single, selected } = useSelector(s => s.Products);
    const { addFavorite, favorites } = useSelector(s => s.Favorites)
    const { carts, addCart } = useSelector(s => s.Cart)
    const [isLiked, setIsLiked] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const dispatch = useDispatch();
    const [activeImg, setActiveImg] = useState(0)

    useEffect(() => {
        if(favorites.success){
            if(selected.success){
                const findLikedProduct = favorites.success.find(item => item.products[0].id === selected.success.id);
                if(findLikedProduct){
                    setIsLiked(true)
                }else{
                    setIsLiked(false)
                }
            }
        }
    }, [selected, favorites])

    useEffect(() => {
        if(carts.success){
            if(selected.success){
                const findCartedProduct = carts.success.find(item => item.product_item.id === selected.success.id);
                if(findCartedProduct){
                    setIsCart(true)
                }else{
                    setIsCart(false)
                }
            }
        }
    }, [selected, carts])

    useEffect(() => {
        if(user){
            dispatch(getFavoritesAction(user?.id))
            dispatch(getCartsAction(user?.id))
        }
    }, [dispatch, user])

    useEffect(() => {
        if(!addFavorite.loading){
            if(addFavorite.error?.statusCode === 403){
                errorNotify(getStaticLang(notificationLang.notAuth), 2000)
                dispatch(resetAddFavoriteAction())
            }
            
            if(addFavorite.success){
                successNotify(getStaticLang(notificationLang.successAdded), 2000)
                dispatch(resetAddFavoriteAction())
                dispatch(getFavoritesAction(user?.id))
            }
        }
    }, [addFavorite, dispatch])

    useEffect(() => {
        if(!addCart.loading){
            if(addCart.error?.statusCode === 403){
                errorNotify(getStaticLang(notificationLang.notAuth), 2000)
                dispatch(resetPostCartItemAction())
            }

            if(addCart.success){
                successNotify(getStaticLang(notificationLang.successAdded), 2000)
                dispatch(resetPostCartItemAction())
                dispatch(getCartsAction(user?.id))
            }
        }
    }, [addCart, dispatch])

    useEffect(() => {
        dispatch(getSingleProductItemAction(router.query.product))
    }, [dispatch, router.query])

    useEffect(() => {
        if(ssg){
            dispatch(getSingleArticuleAction(router.query.articule))
        }
    }, [ssg, dispatch])

    const changeProductItemType = (productItem) => {
        setActiveImg(0)
        dispatch(selectedProductItemAction(productItem))
    }

    const addToFav = () => {
        dispatch(addFavoriteAction({
            products: [selected.success.id]
        }))
    }

    const addToCart = () => {
        dispatch(postCartItemAction(selected.success.id))
    }

    return (
        <MainLayout 
            isFooter={true}
            title={`
                ${selected.success ? selected.success?.title : ''}
                ${activeCategory ? "| " + activeCategory.title : ''}
            `}
        >
            <div className={cls.root}>
                {
                    single.loading && selected.loading && <div className={cls.loader}><Loader isLoadingPage={false} /></div>
                }
                {
                    !single.loading && single.success && !selected.loading && selected.success && (
                        <div className={cls.row}>
                            <div className={cls.back}>
                                <span onClick={() => router.back()}>{getStaticLang(productLang.back)}</span>
                            </div>
                            <div className={cls.product}>
                                <div className={cls.productImg}>
                                    <div 
                                        className={cls.activeImg}
                                    >
                                        <Gallery>
                                            <Item
                                                original={selected.success.products_image[activeImg]?.image}
                                                thumbnail={selected.success.products_image[activeImg]?.image}
                                                width="1000"
                                                height="1200"
                                                >
                                                {({ ref, open }) => (
                                                    <img ref={ref} onClick={open} src={selected.success.products_image[activeImg]?.image} />
                                                )}
                                            </Item>
                                        </Gallery>
                                    </div>
                                    <div className={cls.productImages}>
                                        {selected.success.products_image.map((item, i) => (
                                            <div 
                                                onClick={() => setActiveImg(i)}
                                                key={item.id} 
                                                className={cls.images}
                                                style={{
                                                    background: `url('${item.image}') center / cover`
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={cls.productContent}>
                                    <span className={cls.vendor}>{getStaticLang(productLang.articule)}: {single.success.article}</span>
                                    <h1 className={cls.title}>{selected.success.title}</h1>
                                    <p className={cls.description}>{selected.success.description}</p>
                                    <div className={cls.price}>
                                        {
                                            !isAuth ? 
                                            <A 
                                                className={cls.hidePrice} 
                                                text={getStaticLang(productLang.hidePrice)}
                                                href={LOGIN_URL}
                                            />
                                            : <p className={cls.showPrice}>{getStaticLang(productLang.total)}: {selected.success.price}₽</p>
                                        }
                                    </div>
                                    <div className={cls.colors}>
                                        <p>{getStaticLang(productLang.type)}</p>
                                        <div className={cls.colorsFlex}>
                                            {
                                                single.success?.product_items.map(item => (
                                                    <div 
                                                        key={item.id} 
                                                        className={cn(cls.colorItem, {[cls.activeColorItem]: item.id === selected.success?.id})}
                                                        onClick={() => changeProductItemType(item)}
                                                    >
                                                        <div 
                                                            style={{
                                                                backgroundColor: item.color
                                                            }}
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={cls.divider} />
                                    <div className={cls.size}>
                                        <p>{getStaticLang(productLang.size)} : {selected.success.size_chart} </p>
                                        <span>{selected.success.size}</span>
                                    </div>
                                    <div className={cls.divider} />
                                    <div className={cls.cart}>
                                        <Button
                                            disabled={isCart || addCart.loading}
                                            onClick={addToCart}
                                        >
                                            {
                                                isCart ? getStaticLang(productLang.addedToCart) : getStaticLang(productLang.addCart)
                                            }
                                        </Button>
                                        <Button
                                            disabled={isLiked || addFavorite.loading}
                                            onClick={addToFav}   
                                        >
                                            {getStaticLang(productLang.addFav)}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </MainLayout>
    )
}

Product.getInitialProps = async (ctx) => {
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;
  
    if(!ctx.req){
      return {
        ssg: true
      }
    }

    await dispatch(getSingleProductItemAction(ctx.query.product))

    await dispatch(getSingleArticuleAction(ctx.query.articule))
  
    return { initialReduxState: reduxStore.getState() };
}

export default Product