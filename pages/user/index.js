import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import A from "../../components/MiniComponents/A";
import Footer from "../../components/Footer";
import MainLayout from "../../components/MainLayout"
import PrivateRoute from "../../components/PrivateRoute"
import { USER_DETAILS_URL, USER_PURCHASES_URL } from "../../constants/appConstants/constantsURL";
import { signOutAction } from "../../redux/App/actions";
import cls from '../../styles/User.module.scss';
import userLang from '../../data/languages/user/index.json'
import { getStaticLang } from "../../helpers/languages";
import { resetGetCartsAction } from "../../redux/Cart/actions";
import { resetGetFavoritesAction } from "../../redux/Favorites/actions";
import titlesLang from '../../data/languages/titles/index.json'

const userDetails = [
    {
        id: 1,
        title: getStaticLang(userLang.personalDetails),
        link: USER_DETAILS_URL
    },
    {
        id: 2,
        title: getStaticLang(userLang.purchases),
        link: USER_PURCHASES_URL
    }
]

const UserPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector(s => s.User);

    const handleSignOut = () => {
        dispatch(signOutAction(router));
        dispatch(resetGetCartsAction())
        dispatch(resetGetFavoritesAction())
    }

    return (
        <MainLayout title={`${getStaticLang(titlesLang.user)} ${user ? user.first_name : ''}`} isFooter={false}>
            <PrivateRoute>
                <div className={cls.root}>
                    <div className={cls.personalDetails}>
                        <ul>
                            {
                                userDetails.map(({ id, link, title }) => (
                                    <li key={id}>
                                        <A 
                                            text={title}
                                            href={link}
                                        />
                                    </li>
                                ))
                            }
                            <li onClick={handleSignOut} className={cls.endSession}>{getStaticLang(userLang.signOut)}</li>
                        </ul>
                    </div>
                    <div className={cls.newsletter}>
                        <Footer />
                    </div>
                </div>
            </PrivateRoute>
        </MainLayout>
    )
}

export default UserPage