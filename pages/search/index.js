import cls from '../../styles/Search.module.scss';
import MainLayout from '../../components/MainLayout';
import Button from '../../components/MiniComponents/Button';
import { getStaticLang } from '../../helpers/languages';
import searchLang from '../../data/languages/search/index.json'
import { useEffect, useState } from 'react';
import { addSearchRecent, createSearchRecent, cuttedProductTitle, getRecent } from '../../helpers';
import { errorNotify } from '../../helpers/notification';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchProductsAction } from '../../redux/Search/actions';
import Loader from '../../components/MiniComponents/Loader';
import A from '../../components/MiniComponents/A';
import productLang from '../../data/languages/product/index.json'
import { LOGIN_URL, PRODUCT_URL } from '../../constants/appConstants/constantsURL';
import { useRouter } from 'next/dist/client/router';
import titlesLang from '../../data/languages/titles/index.json'

// const searchHistory = [
//     {
//         id: 1,
//         title: 'shoes'
//     },
//     {
//         id: 2,
//         title: 'bomber'
//     },
//     {
//         id: 3,
//         title: 'jacket'
//     },
//     {
//         id: 4,
//         title: 'hello'
//     },
//     {
//         id: 5,
//         title: 'lorem'
//     },
//     {
//         id: 6,
//         title: 'ipsum'
//     }
// ]

const Search = () => {
    const [search, setSearch] = useState('');
    const [recentList, setRecentList] = useState(null);
    const [showRecent, setShowRecent] = useState(true);
    const dispatch = useDispatch();
    const { searchData } = useSelector(s => s.Search);
    const { isAuth } = useSelector(s => s.App);
    const router = useRouter();

    useEffect(() => {
        if(search){
            setShowRecent(false)
        }else{
            setRecentList(getRecent())
            setShowRecent(true)
        }
    }, [setRecentList, search])

    const submitSearch = () => {
        if(search){
            if(search.length <= 30){
                if(recentList){
                    addSearchRecent(recentList, search)
                }else{
                    createSearchRecent(search)
                }
                dispatch(getSearchProductsAction(search))
                setSearch('');
            }else{
                errorNotify(getStaticLang(searchLang.longSearchText), 2500)
            }
        }else{
            errorNotify(getStaticLang(searchLang.emptyInput), 2000)
        }
    }

    const handleKeyPressSubmit = e => {
        if(e.key === 'Enter'){
            submitSearch();
        }
    }

    const redirectToSingleProduct = (product) => {
        router.push(PRODUCT_URL(product.product, product.id))
    }

    return (
        <MainLayout title={getStaticLang(titlesLang.search)} isFooter={true}>
            <div className={cls.root}>
                <div className={cls.searchField}>
                    <input
                        className={cls.input}
                        type='text'
                        placeholder={getStaticLang(searchLang.enter)}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyPress={e => handleKeyPressSubmit(e)}
                    />
                    <div className={cls.searchBtnContainer}>
                        <Button onClick={submitSearch} className={cls.searchBtn}>{getStaticLang(searchLang.search)}</Button>
                    </div>
                    {
                        showRecent && 
                        <div className={cls.recent}>
                            <h1>{getStaticLang(searchLang.recent)}</h1>
                            <ul>
                                {
                                    recentList ? (
                                        recentList.map(({ id, title }) => (
                                            <li onClick={() => {
                                                dispatch(getSearchProductsAction(title))
                                            }} key={id}>{title}</li>
                                        ))
                                    ) : <li>{getStaticLang(searchLang.empty)}</li>
                                }
                            </ul>
                        </div>
                    }
                </div>
                <div className={cls.searchContent}>
                    {
                        searchData.loading && 
                        <div className={cls.loader}>
                            <Loader />
                        </div>
                    }
                    {
                        searchData.success && (
                            searchData.success.length === 0 ? 
                            <h1 className={cls.notFound}>{getStaticLang(searchLang.notFound)}</h1>
                            : 
                            <div className={cls.searchProducts}>
                                {
                                    searchData.success.map(item => (
                                        <div key={item.id} className={cls.productItem}>
                                            <img onClick={() => redirectToSingleProduct(item)} src={item.products_image[0]?.image} alt={item.title} />
                                            <h1 
                                                onClick={() => {
                                                    redirectToSingleProduct(item)
                                                }}>
                                                {cuttedProductTitle(item.title)}
                                            </h1>
                                            <p>
                                                {!isAuth ? (
                                                <A
                                                    text={getStaticLang(productLang.hidePrice)}
                                                    href={LOGIN_URL}
                                                />
                                                ) : (
                                                <span>{item.price}₽</span>
                                                )}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default Search;