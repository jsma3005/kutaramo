import { useDispatch, useSelector } from 'react-redux';
import { closeFilterAction } from '../../redux/App/actions';
import cls from './Filter.module.scss';
import classNames from 'classnames'
import { getStaticLang } from '../../helpers/languages';
import filterLang from '../../data/languages/filter/index.json'
import { useEffect, useState } from 'react';
import { uniqueColors } from '../../helpers';
import cn from 'classnames'
import { filterAdditionalAction, filterColorAction, filterPriceAction, resetFilterAction } from '../../redux/Products/actions';

const Filter = ({ active }) => {
    const { user } = useSelector(s => s.User);
    const { products, filteredProducts } = useSelector(s => s.Products);
    const { carts } = useSelector(s => s.Cart)
    const { favorites } = useSelector(s => s.Favorites)
    const [price, setPrice] = useState(null);
    const [additionally, setAdditionally] = useState(null)
    const [color, setColor] = useState('');
    const dispatch = useDispatch();

    // by color
    useEffect(() => {
        if(color){
            closeFilter()
            dispatch(filterColorAction(filteredProducts, color))
        }
    }, [color])

    // by additional
    useEffect(() => {
        if(additionally){
            closeFilter()
            if(additionally === 'favorite'){
                dispatch(filterAdditionalAction(favorites.success, filteredProducts, additionally))
            }else{
                dispatch(filterAdditionalAction(carts.success, filteredProducts, additionally))
            }
        }
    }, [additionally])

    // by price
    useEffect(() => {
        if(price){
            closeFilter()
            dispatch(filterPriceAction(products?.success, price))
        }
    }, [price])

    useEffect(() => {
        resetFilters()
    }, [filteredProducts])

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                dispatch(closeFilterAction())
            }
        };
        window.addEventListener('keydown', handleEsc);
     
        return () => {
           window.removeEventListener('keydown', handleEsc);
        };
    }, [dispatch])

    function closeFilter(){
        dispatch(closeFilterAction());
    }

    function resetFilters(){
        dispatch(resetFilterAction(filteredProducts))
        setColor('');
        setPrice(null)
        setAdditionally(null)
    }

    return (
        <div className={classNames(cls.root, { [cls.active]: active })}>
            <div className={cls.buttons}>
                <span className={cls.clear} onClick={resetFilters}>{getStaticLang(filterLang.clear)}</span>
                <span onClick={closeFilter} className={cls.close}>{getStaticLang(filterLang.close)}</span>
            </div>
            {
                !products.loading && products.success && (
                    <div className={cls.filter}>
                        <div className={cls.filterTitle}>
                            <h1>{getStaticLang(filterLang.price)}</h1>
                            <ul>
                                <li className={cn({[cls.activeFilter]: price === 'asc'})} onClick={() => setPrice('asc')}>{getStaticLang(filterLang.ascending)}</li>
                                <li className={cn({[cls.activeFilter]: price === 'desc'})}  onClick={() => setPrice('desc')}>{getStaticLang(filterLang.descending)}</li>
                            </ul>
                        </div>
                        <div className={cls.filterTitle}>
                            <h1>{getStaticLang(filterLang.colors)}</h1>
                            <ul className={cls.colorsFlex}>
                                {
                                    uniqueColors(filteredProducts).map((colorItem, index) => (
                                        <div 
                                            key={index} 
                                            className={cn(cls.colorItem, {[cls.activeColorItem]: colorItem === color})}
                                            onClick={() => setColor(colorItem)}
                                        >
                                            <div 
                                                style={{
                                                    backgroundColor: colorItem
                                                }}
                                            />
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={cls.filterTitle}>
                            <h1>{getStaticLang(filterLang.additionally)}</h1>
                            {
                                user && (
                                    <ul>
                                        <li className={cn({[cls.activeFilter]: additionally === 'cart'})} onClick={() => setAdditionally('cart')}>{getStaticLang(filterLang.cart)}</li>
                                        <li className={cn({[cls.activeFilter]: additionally === 'favorite'})} onClick={() => setAdditionally('favorite')}>{getStaticLang(filterLang.favorite)}</li>
                                    </ul>
                                )
                            }
                            {
                                !user && (
                                    <ul>
                                        <li className={cls.disabled}>{getStaticLang(filterLang.cart)}</li>
                                        <li className={cls.disabled}>{getStaticLang(filterLang.favorite)}</li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Filter