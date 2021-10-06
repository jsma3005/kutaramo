import cls from './Sidebar.module.scss';
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebarAction } from '../../redux/App/actions'
import { clearCategory, getMainPageAction, setActiveCategory } from '../../redux/MainPage/actions';
import A from '../MiniComponents/A'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { LOGIN_URL, PRODUCTS_CATEGORY_URL, PRODUCT_URL } from '../../constants/appConstants/constantsURL';
import classNames from 'classnames'
import { getStaticLang } from '../../helpers/languages';
import sidebarLang from '../../data/languages/sidebar/index.json'
import { phones } from '../../configs/businessConfig';
import { getSingleSaleAction } from '../../redux/Products/actions';

const Sidebar = () => {
    const { sidebar } = useSelector(s => s.App);
    const { user } = useSelector(s => s.User);
    const { mainPage, activeCategory } = useSelector(s => s.MainPage);
    const { sale } = useSelector(s => s.Products);
    const dispatch = useDispatch();
    const router = useRouter();
    const [width, setWidth] = useState(1000);

    useEffect(() => {
        if(sidebar){
            console.log(sale);
            dispatch(getSingleSaleAction());
        }
    }, [dispatch, sidebar])

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
        if(!mainPage.success){
            dispatch(getMainPageAction())
        }
    }, [dispatch])

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                dispatch(closeSidebarAction())
                dispatch(clearCategory())
            }
        };
        window.addEventListener('keydown', handleEsc);
     
        return () => {
           window.removeEventListener('keydown', handleEsc);
        };
    }, [dispatch])

    const handleChooseCategory = (category) => {
        dispatch(closeSidebarAction())
        router.push(PRODUCTS_CATEGORY_URL(category.id))
    }

    const closeSidebar = () => {
        dispatch(closeSidebarAction())
        dispatch(clearCategory())
    }
    
    const setCategory = (category) => {
        dispatch(setActiveCategory(category))
    }

    const handleChooseSale = (product) => {
        router.push(PRODUCT_URL(product.product, product.id))
        closeSidebar()
    } 

    return (
        <div className={classNames(cls.root, {[cls.active]: sidebar })}>
            <div className={cls.closeIcon}>
                <AiOutlineClose onClick={closeSidebar} />
                {
                    width <= 992 && (
                        <div className={cls.phones}>
                            {phones.map((phone, i) => (
                                <a key={`${i}-phone`} href={`tel:${phone}`}>
                                    {phone}
                                </a>
                            ))}
                        </div>
                    )
                }
            </div>
            <div className={cls.row}>
                <div className={cls.col}>
                    <div className={cls.navList}>
                        <ul>
                            {
                                !mainPage.loading && mainPage.success && mainPage.success?.map(item => (
                                    <li className={activeCategory?.title === item.title ? cls.activeLink : null} key={item.id} onClick={() => setCategory(item)}>
                                        {item.title}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {
                        activeCategory && (
                            <div className={cls.categories}>
                                <ul>
                                    {
                                        activeCategory?.categories?.children.map(item => (
                                            <li onClick={() => handleChooseCategory(item)} key={item.id}>{item.title}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
                {
                    !sale.loading && sale.success && (
                        <div className={cls.col}>
                            <h1 className={cls.saleTitle}>{getStaticLang(sidebarLang.sale)}</h1>
                            <div className={cls.saleProduct}>
                                <img onClick={() => {
                                    handleChooseSale(sale.success[0]?.product_item)
                                }} alt='sale' src={sale.success[0]?.product_item?.products_image[0].image} />
                                <div className={cls.logIn}>
                                    <span>
                                        {getStaticLang(sidebarLang.only)}
                                    </span>
                                    {
                                        user ? <p>{sale.success[0]?.product_item?.price}₽</p> : <A onClick={closeSidebar} text={getStaticLang(sidebarLang.showPrice)} href={LOGIN_URL} />
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Sidebar;