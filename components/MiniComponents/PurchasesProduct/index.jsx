import cls from './PurchasesProduct.module.scss';
import productLang from '../../../data/languages/product/index.json'
import { getStaticLang } from '../../../helpers/languages';

const PurchasesProduct = ({ image, title, price, description, amount, color, size }) => {
    return (
        <div className={cls.item}>
            <div className={cls.avatar}>
                <img src={image} alt={title} />
            </div>
            <div className={cls.info}>
                <h1 className={cls.title}>{title}</h1>
                <p className={cls.description}>{description}</p>
                <p className={cls.price}>{getStaticLang(productLang.total)}: <span>{price}</span></p>
                <p className={cls.color}>{getStaticLang(productLang.color)}: <span style={{ background: color }} /> </p>
                <p className={cls.amount}>{getStaticLang(productLang.amount)}: <span>{amount}</span></p>
                <p className={cls.size}>{getStaticLang(productLang.size)}: <span>{size}</span> </p>
            </div>
        </div>
    )
}

export default PurchasesProduct