import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { LOGIN_URL } from "../../constants/appConstants/constantsURL";
import Loader from "../MiniComponents/Loader";

const PrivateRoute = ({ children }) => {
    const { firstLoading, isAuth } = useSelector(s => s.App);
    const router = useRouter();

    useEffect(() => {
        if(firstLoading){
            if(!isAuth){
                router.push(LOGIN_URL)
            }
        }
    }, [isAuth, firstLoading, router])

    return (
        <div>
            {
                (firstLoading && isAuth) ? (
                    <div>
                        {children}
                    </div>
                ) : <Loader isLoadingPage={true} />
            }
        </div>
    )
}

export default PrivateRoute