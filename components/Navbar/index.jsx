import cls from "./Navbar.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import A from "../MiniComponents/A";
import { useDispatch, useSelector } from "react-redux";
import { openSidebarAction } from "../../redux/App/actions";
import { useRouter } from "next/dist/client/router";
import { phones } from "../../configs/businessConfig";
import {
  USER_URL,
  LOGIN_URL,
  LIKED_URL,
  CART_URL,
  HOME_URL,
  SEARCH_URL,
} from "../../constants/appConstants/constantsURL";
import {
  INITIAL_LANG
} from "../../constants/appConstants/constantsLang";
import { useState } from "react";
import classNames from "classnames";
import { getStaticLang } from "../../helpers/languages";
import headerLang from '../../data/languages/header/index.json'
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((s) => s.User);
  const [selectedLang, setSelectedLang] = useState(INITIAL_LANG);
  const { language } = useSelector(s => s.App);
  const [width, setWidth] = useState(1000);

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
  
  const openSearch = () => {
    router.push(SEARCH_URL);
  };

  const handleChangeLang = (lang) => {
    // redirect na lang.domains
  };

  if(width < 700){
    return (
      <div className={cls.mediumRoot}>
        <div className={cls.top}>
          <div className={cls.sidebarIcon}>
            <button onClick={() => dispatch(openSidebarAction())}>
              <GiHamburgerMenu />
            </button>
          </div>
          <div className={cls.name}>
            {user ? (
              <A href={USER_URL} text={user.first_name} />
            ) : (
              <A href={LOGIN_URL} text={getStaticLang(headerLang.login, language)} />
            )}
          </div>
          <div className={cls.langs}>
            <span
              // onClick={() => handleChangeLang(EN_LANG)}
              className={classNames({ [cls.activeLang]: selectedLang === 'en' })}
            >EN</span> / <span 
              className={classNames({ [cls.activeLang]: selectedLang === 'ru' })} 
              // onClick={() => handleChangeLang(RU_LANG)}
              >RU</span>
          </div>
        </div>
        <div className={cls.mid}>
          <div className={cls.logo}>
            <A text="KUTARAMO" href={HOME_URL} />
          </div>
        </div>
        <div className={cls.bottom}>
          <ul>
            <li>
              <A href={LIKED_URL + `/${user?.id}`} text={getStaticLang(headerLang.liked, language)} />
            </li>
            <li>
              <A href={CART_URL + `/${user?.id}`} text={getStaticLang(headerLang.cart, language)} />
            </li>
            <li>
              <div className={cls.search}>
                <button onClick={openSearch}>
                  <span>{getStaticLang(headerLang.search, language)}</span>
                  <div className={cls.line}></div>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className={cls.root}>
      <div className={cls.sidebarIcon}>
        <button onClick={() => dispatch(openSidebarAction())}>
          <GiHamburgerMenu />
        </button>
      </div>
      <div className={cls.logo}>
        <A text="KUTARAMO" href={HOME_URL} />
      </div>
      {
        width > 992 && (
          <div className={cls.phones}>
            {phones.map((phone, i) => (
              <a key={`${i}-phone`} href={`tel:${phone}`}>
                {phone}
              </a>
            ))}
          </div>
        )
      }
      <div className={cls.langs}>
        <span
          // onClick={() => handleChangeLang(EN_LANG)}
          className={classNames({ [cls.activeLang]: selectedLang === 'en' })}
        >EN</span> / <span 
          className={classNames({ [cls.activeLang]: selectedLang === 'ru' })} 
          // onClick={() => handleChangeLang(RU_LANG)}
          >RU</span>
      </div>
      <div className={cls.search}>
        <button onClick={openSearch}>
          <span>{getStaticLang(headerLang.search, language)}</span>
          <div className={cls.line}></div>
        </button>
      </div>
      <div className={cls.navs}>
        <ul>
          {user ? (
            <li>
              <A href={USER_URL} text={user.first_name} />
            </li>
          ) : (
            <li>
              <A href={LOGIN_URL} text={getStaticLang(headerLang.login, language)} />
            </li>
          )}
          <li>
            <A href={LIKED_URL + `/${user?.id}`} text={getStaticLang(headerLang.liked, language)} />
          </li>
          <li>
            <A href={CART_URL + `/${user?.id}`} text={getStaticLang(headerLang.cart, language)} />
          </li>
        </ul>
      </div>
    </div>
  );

};

export default Navbar;
