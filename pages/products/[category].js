import MainLayout from "../../components/MainLayout";
import cls from "../../styles/Products.module.scss";
import A from "../../components/MiniComponents/A";
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdRemoveShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from "react-redux";
import { closeFilterAction, openFilterAction, productsViewChangeAction } from "../../redux/App/actions";
import Filter from "../../components/Filter";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { LOGIN_URL, PRODUCT_URL } from "../../constants/appConstants/constantsURL";
import classNames from "classnames";
import { getStaticLang } from "../../helpers/languages";
import productLang from '../../data/languages/product/index.json'
import notificationLang from '../../data/languages/notifications/index.json'
import { initializeStore } from "../../redux/store";
import { getProductsAction, selectedProductItemAction } from "../../redux/Products/actions";
import Loader from "../../components/MiniComponents/Loader";
import { addFavoriteAction, getFavoritesAction, removeFavoriteAction, resetAddFavoriteAction, resetRemoveFavoriteAction } from "../../redux/Favorites/actions";
import { errorNotify, successNotify } from "../../helpers/notification";
import { cuttedProductTitle, isCartHelper, isLikedHelper } from "../../helpers";
import { getCartsAction, postCartItemAction, removeCartAction, resetPostCartItemAction, resetRemoveCartAction } from "../../redux/Cart/actions";
import titlesLang from '../../data/languages/titles/index.json'

const Products = ({ ssg }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [width, setWidth] = useState(1800);
  const { productsView, isAuth, filter } = useSelector((s) => s.App);
  const { user } = useSelector(s => s.User);
  const { products } = useSelector(s => s.Products);
  const { addCart, carts, removeCart } = useSelector(s => s.Cart);
  const { addFavorite, favorites, removeFavorite } = useSelector(s => s.Favorites);
  const actualShoes = products?.success?.slice(0, width < 1500 ? 1 : 2);
  const productList = width < 1500 ? products?.success?.slice(productsView === '1' ? 1 : 0) : products?.success?.slice(productsView === '1' ? 2 : 0);
  const [actualProductImage, setActualProductImage] = useState(null);
  const [productImage, setProductImage] = useState(null)
  const { activeCategory } = useSelector(s => s.MainPage);
  
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
    if(user){
      dispatch(getFavoritesAction(user?.id))
      dispatch(getCartsAction(user?.id))
    }
  }, [dispatch, user])

  useEffect(() => {
    if(!addCart.loading){
      if(addCart.error?.statusCode === 403){
        errorNotify(getStaticLang(notificationLang.notAuth), 2000)
        dispatch(resetPostCartItemAction())
      }

      if(addCart.success){
        successNotify(getStaticLang(notificationLang.successAddedCart), 2000)
        dispatch(resetPostCartItemAction())
        dispatch(getCartsAction(user?.id))
      }
    }
  }, [dispatch, addCart])

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
  }, [dispatch, addFavorite])

  useEffect(() => {
    if(!removeCart.loading){
      if(removeCart.success){
        successNotify(getStaticLang(notificationLang.successRemove), 2000)
        dispatch(resetRemoveCartAction())
        dispatch(getCartsAction(user?.id))
      }

      if(removeCart.error){
        errorNotify(getStaticLang(notificationLang.wrong), 2000)
        dispatch(resetRemoveCartAction())
      }
    }
  }, [dispatch, removeCart])

  useEffect(() => {
    if(!removeFavorite.loading){
      if(removeFavorite.success){
        successNotify(getStaticLang(notificationLang.successRemove), 2000)
        dispatch(resetRemoveFavoriteAction())
        dispatch(getFavoritesAction(user?.id))
      }

      if(removeFavorite.error){
        errorNotify(getStaticLang(notificationLang.wrong), 2000)
        dispatch(resetRemoveFavoriteAction())
      }
    }
  }, [dispatch, removeFavorite])

  useEffect(() => {
    if(ssg){
      dispatch(getProductsAction(router.query.category))
    }
  }, [ssg, dispatch, router.query.category])

  useEffect(() => {
    dispatch(closeFilterAction())
  }, [dispatch])

  const handleChangeView = (value) => {
    dispatch(productsViewChangeAction(value));
  };

  const openFilter = () => {
    dispatch(openFilterAction())
  }

  const handleChooseProduct = (product) => {
    dispatch(selectedProductItemAction(product));
    router.push(PRODUCT_URL(product.product, product.id))
  }

  const handleAddToFav = (product) => {
    dispatch(addFavoriteAction({
      products: [product.id]
    }))
  }

  const handleRemoveFav = (product) => {
    favorites.success.forEach(favorite => {
      if(product.id === favorite.products[0].id){
        dispatch(removeFavoriteAction(favorite.id))
      }
    })
  }

  const handleAddCart = (product) => {
    dispatch(postCartItemAction(product.id))
  }

  const handleRemoveCart = (product) => {
    carts.success.forEach(cartItem => {
      if(product.id === cartItem.product_item.id){
        dispatch(removeCartAction(cartItem.id))
      }
    })
  }

  return (
    <MainLayout 
      title={
        `
          ${getStaticLang(titlesLang.products)}
          ${activeCategory ? "| " + activeCategory.title : ''}
        `

      } 
      isFooter={true}
    >
      <Filter active={filter} />
      <div className={cls.root}>
        <div className={cls.productsParams}>
          <div className={cls.viewRange}>
            <label>
              <span>{getStaticLang(productLang.view)}</span>
              <input
                onChange={(e) => handleChangeView(e.target.value)}
                type="range"
                min="1"
                max="3"
                value={productsView}
              />
            </label>
          </div>
          <div className={cls.filter}>
            <span onClick={openFilter}>{getStaticLang(productLang.filter)}</span>
          </div>
        </div>
        {
          products.loading && <Loader isLoadingPage={false} />
        }
        {
          !products.loading && products.success && (
            products.success.length > 0 ? 
            <>
              <div className={cls.product_parent}>
                {productsView === "1" && (
                  <div className={cls.product_inline}>
                    <div className={cls.product_card_unImage}>
                      <h2>Lorem ipsum dolor</h2>
                      <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                      </p>
                    </div>
                    <div className={cls.productShoesContainer}>
                      {actualShoes.map((product) => (
                        <div className={cls.product_card} key={product.id}>
                          <div>
                            <img
                              onClick={() => handleChooseProduct(product)}
                              src={
                                actualProductImage?.id === product.id ? actualProductImage?.image : product.products_image[0]?.image
                              }
                              alt={product.title}
                              className={cls.boots_image}
                            />
                            <div className={cls.product_abs_icon}>
                              {
                                !isCartHelper(carts, product) && 
                                <AiOutlineShoppingCart 
                                  onClick={() => {
                                    handleAddCart(product)
                                  }}
                                />
                              }
                              {
                                isCartHelper(carts, product) && 
                                <MdRemoveShoppingCart 
                                  onClick={() => {
                                    handleRemoveCart(product)
                                  }}
                                />
                              }
                              {
                                isLikedHelper(favorites, product) && 
                                <AiFillHeart 
                                  onClick={() => {
                                    handleRemoveFav(product)
                                  }}
                                  className={cls.likedSvg} 
                                />
                              }
                              {
                                !isLikedHelper(favorites, product) && 
                                <AiOutlineHeart
                                  onClick={() => {
                                    handleAddToFav(product)
                                  }}
                                />
                              }
                            </div>
                          </div>
                          <div className={cls.product_card_title}>
                            <h3 onClick={() => handleChooseProduct(product)}>{cuttedProductTitle(product.title)}</h3>
                            <p>
                              {!isAuth ? (
                                <A
                                  text={getStaticLang(productLang.hidePrice)}
                                  href={LOGIN_URL}
                                />
                              ) : (
                                <span>{product.price}₽</span>
                              )}
                            </p>
                          </div>
                          {
                            width >= 992 && (
                              <div className={cls.hoveredImages} onClick={() => handleChooseProduct(product)}>
                                {
                                  product.products_image?.map(image => (
                                    <div
                                      key={image.id} 
                                      className={cls.hoveredItem}
                                      onMouseOver={() => {
                                        setActualProductImage({
                                          id: product.id,
                                          image: image.image
                                        })
                                      }}
                                    ></div>
                                  ))
                                }
                              </div>
                            )
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={cls.product_gallery_parent}>
                <div className={cls.product_gallery_inline}>
                  {productList.map((product) => (
                    <div
                      className={classNames(
                        cls.gallery_card,
                        {
                          [cls.viewType1]: productsView === '1',
                          [cls.viewType2]: productsView === '2',
                          [cls.viewType3]: productsView === '3'
                        }
                      )}
                      key={product.id}
                    >
                      <div>
                        <img 
                          onClick={() => handleChooseProduct(product)}
                          src={
                            productImage?.id === product.id ? productImage?.image : product.products_image[0]?.image
                          }
                          alt={product.title} 
                        />
                        <div className={cls.gallery_abs_icon}>
                            {
                              !isCartHelper(carts, product) && 
                              <AiOutlineShoppingCart 
                                onClick={() => {
                                  handleAddCart(product)
                                }}
                              />
                            }
                            {
                              isCartHelper(carts, product) && 
                              <MdRemoveShoppingCart 
                                onClick={() => {
                                  handleRemoveCart(product)
                                }}
                              />
                            }
                            {
                              isLikedHelper(favorites, product) && 
                              <AiFillHeart 
                                onClick={() => {
                                  handleRemoveFav(product)
                                }}
                                className={cls.likedSvg} 
                              />
                            }
                            {
                            !isLikedHelper(favorites, product) && <AiOutlineHeart 
                              onClick={() => {
                                handleAddToFav(product)
                              }} 
                            />
                          }
                        </div>
                      </div>
                      {productsView === "3" ? null : (
                        <div className={cls.gallery_card_title}>
                          <h3 onClick={() => handleChooseProduct(product)}>{cuttedProductTitle(product.title)}</h3>
                          <p>
                            {!isAuth ? (
                              <A
                                text={getStaticLang(productLang.hidePrice)}
                                href={LOGIN_URL}
                              />
                            ) : (
                              <span>{product.price}₽</span>
                            )}
                          </p>
                        </div>
                      )}
                      {
                        width >= 992 && (
                          <div className={cls.hoveredImages} onClick={() => handleChooseProduct(product)} >
                            {
                              product.products_image?.map(image => (
                                <div
                                  key={image.id} 
                                  className={cls.hoveredItem}
                                  onMouseOver={() => {
                                    setProductImage({
                                      id: product.id,
                                      image: image.image
                                    })
                                  }}
                                ></div>
                              ))
                            }
                          </div>
                        )
                      }
                    </div>
                  ))}
                </div>
              </div>
            </> : <p className={cls.emptyProducts}>{getStaticLang(productLang.notFound)}</p>
          )
        }
      </div>
    </MainLayout>
  );
};

Products.getInitialProps = async (ctx) => {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  if(!ctx.req){
    return {
      ssg: true
    }
  }

  await dispatch(getProductsAction(ctx.query.category))
  return { initialReduxState: reduxStore.getState() };
}

export default Products;
