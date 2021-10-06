import Button from '../Button';
import cls from './FavProduct.module.scss';
import productLang from '../../../data/languages/product/index.json'
import { getStaticLang } from '../../../helpers/languages';
import { baseURL } from '../../../configs/config';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PRODUCT_URL } from '../../../constants/appConstants/constantsURL';
import { removeFavoriteAction } from '../../../redux/Favorites/actions';

const FavProduct = ({ products_image, title, description, price, color, size, id, product, likedProductId }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { removeFavorite } = useSelector(s => s.Favorites)

    const handleDeleteFav = () => {
        dispatch(removeFavoriteAction(likedProductId))
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
                <Button 
                    onClick={handleDeleteFav}
                    className={cls.deleteFavBtn}
                    disabled={removeFavorite.loading}
                >{getStaticLang(productLang.removeFav)}</Button>
            </div>
        </div>
    )
}

export default FavProduct