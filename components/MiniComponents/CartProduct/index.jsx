import Button from '../Button';
import cls from './CartProduct.module.scss';
import productLang from '../../../data/languages/product/index.json'
import { getStaticLang } from '../../../helpers/languages';
import { baseURL } from '../../../configs/config';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PRODUCT_URL } from '../../../constants/appConstants/constantsURL';
import { changeAmountAction, removeCartAction, updateCartAction } from '../../../redux/Cart/actions'
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const CartProduct = ({ products_image, title, description, price, color, size, id, product, cartProductId, item, index, productAmount }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { removeCart, carts } = useSelector(s => s.Cart)
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setAmount(productAmount)
    }, [setAmount])

    const handleDeleteCart = () => {
        dispatch(removeCartAction(cartProductId))
    }

    const handleMinusAmount = () => {
        if(amount > 1){
            setAmount(prev => prev - 1);
            // dispatch(changeAmountAction(item, amount - 1, index))
            dispatch(updateCartAction(item.id, item.product_item.id, amount - 1))
        }
    }

    const handlePlusAmount = () => {
        setAmount(prev => prev + 1);
        // dispatch(changeAmountAction(item, amount + 1, index))
        console.log(carts.success);
        dispatch(updateCartAction(item.id, item.product_item.id, amount + 1))
    }

    return (
        <div className={cls.item}>
            <div className={cls.avatar}>
                <img alt={title} onClick={() => router.push(PRODUCT_URL(product, id))} src={baseURL + products_image[0].image} />
            </div>
            <div className={cls.info}>
                <h1 onClick={() => router.push(PRODUCT_URL(product, id))} className={cls.title}>{title}</h1>
                <p className={cls.description}>{description}</p>
                <p className={cls.price}>{getStaticLang(productLang.total)}: <span>{price}</span></p>
                <p className={cls.color}>{getStaticLang(productLang.color)}: <span style={{ background: color }} /> </p>
                <p className={cls.size}>{getStaticLang(productLang.size)}: <span>{size}</span> </p>
                <div className={cls.amount}>
                    <AiOutlineMinus onClick={handleMinusAmount} />
                    <span className={cls.digit}>{amount}</span>
                    <AiOutlinePlus onClick={handlePlusAmount} />
                </div>
                <Button 
                    onClick={handleDeleteCart}
                    className={cls.deleteFavBtn}
                    disabled={removeCart.loading}
                >{getStaticLang(productLang.removeCart)}</Button>
            </div>
        </div>
    )
}

export default CartProduct