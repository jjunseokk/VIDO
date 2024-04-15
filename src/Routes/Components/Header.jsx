import React, { useState, useContext, useEffect, useMemo, createRef, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { NavLink, Link, useNavigate, useMatch, useLocation } from 'react-router-dom';
import MYPG from './data/MYPG.json';
import { UserContext } from '../ContextProvider';
import AxiosConfig from '../../AxiosConfig';
import { Outlet, useOutletContext } from 'react-router-dom';
import LogoSvgAnimation from './LogoSvgAnimation';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { loginState, tagSearch, userBaseInfoState } from '../util/recoilState';
import setError from '../util/setError';
import { useQuery } from 'react-query';
import { getAccInfo, getRequest } from '../util/userInfoGet';
import { HeaderStyle } from './HeaderStyle';
import SearchSVG from './SearchSVG';

import { i18n, languages } from "../../language/i18n";
import { loadResources } from "i18next";
import { useCookies } from "react-cookie";
// import {display} from "html2canvas/dist/types/css/property-descriptors/display";
import newLogo from '../../../img/newLogo.svg'

const Header = ({ loggedIn, setLoggedIn, mode }) => {

  const pathname = useLocation();
  const { t } = useTranslation();
  const [cookie, setCookie, removeCookie] = useCookies(['lang']);

  const navigate = useNavigate();
  const userInfo = useRecoilValue(userBaseInfoState);
  const setUserInfo = useSetRecoilState(userBaseInfoState);
  const { serverAddress } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(false);
  const [myPageMenu, setMyPageMenu] = useState(false);
  const isArtPage = useMatch(`/media-art/*`);
  const resetTagSearch = useResetRecoilState(tagSearch);

  const [getMode, setGetMode] = useState(true);

  //Language
  const [isOpenLanguage, setOpenLanguage] = useState(false);
  const [languageSelected, setLanguageSelected] = useState("KOR");
  const languageRef = useRef(null);
  const languageMap = {
    "KOR": "ko",
    "ENG": "en"
  }

  const myPgMenu = (mouseon) => {
    !mouseon ? setMyPageMenu(false) : setMyPageMenu(true);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const checkLogin = async () => {
    const res = await AxiosConfig.get('/account/user');
    if (res.data.statusCode == 104) {
      setLoggedIn(false);
    } else if (res.data.statusCode == 200) {
      setLoggedIn(true);
    }
    return res.data;
  };
  const { data, status } = useQuery(
    'checkLogin',
    checkLogin,

    {
      retry: false,
      refetchInterval: 600000,
      refetchIntervalInBackground: true,
    }
  );
  const checkRequest = () => {
    AxiosConfig.get(`/user/checkRequest`).then((res) =>
      res.data.result === true ? setNotification(true) : setNotification(false)
    );
  };
  useMemo(() => (isArtPage ? null : resetTagSearch()), [isArtPage]);

  useEffect(() => {
    data ? setUserInfo(data.result) : null;
  }, [data]);


  useEffect(() => {
    loggedIn ? checkRequest() : null;
  }, [loggedIn]);

  const handleLogOut = async () => {
    AxiosConfig.post('/account/logout', {
      withCredentials: true,
      crossDomain: true,
      SameSite: 'none',
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.statusCode === 200) {
          setMyPageMenu('-250px');
          navigate('/');
          window.location.reload();
          setLoggedIn(false);
        } else {
          setError('로그아웃 오류');
        }
      }
    });
  };
  const getSearch = () => {
    navigate('/search/' + search + '/0/0');
  };

  useEffect(() => {
    if (cookie.lang == null) {
      const l = Object.keys(languageMap).find(key => languageMap[key] === i18n.language);
      setCookie("lang", l, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      });

      setLanguageSelected(l);
    } else if (i18n.language !== languageMap[cookie.lang]) {
      setLanguageSelected(cookie.lang);
      i18n.changeLanguage(languageMap[cookie.lang]);
    }
    // if(i18n.language !== cookie.lang) {
    //   i18n.changeLanguage(cookie.lang);
    // }
  }, []);

  const onLanguageClick = () => {
    setOpenLanguage(!isOpenLanguage);
  }

  const onLanguageItemClick = async (key, value) => {
    setCookie("lang", key, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    setLanguageSelected(key);
    await i18n.changeLanguage(value);
  }

  const handleClickOutside = (event) => {
    if (languageRef && !languageRef.current.contains(event.target)) {
      setOpenLanguage(false);
    }
  }

  const handleMode = (num) => {
    setGetMode(!num);
  }

  useEffect(() => {
    mode(getMode);
  }, [getMode])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    }
  }, []);

  useEffect(() => {
    setLanguageSelected(Object.keys(languageMap).find(key => languageMap[key] === i18n.language))
  }, [i18n.language]);

  return (
    <>
      <HeaderStyle bg={pathname.pathname === "/collector" ? "black" : "white"} myPageMenu={myPageMenu} mode={getMode == true ? "light" : "dark"}>
        <nav>
          <Link
            to="/"
            onClick={() => {
              setMyPageMenu(false);
            }}
          >
            <img src={newLogo} alt="" />
          </Link>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : null)}
                to="/about"
              >
                {t("header.about")}
              </NavLink>
              <p>{t("header.about")} </p>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : null)}
                to="/media-art"
              >
                {t("header.media_art")}
              </NavLink>
              <p>{t("header.media_art")}</p>
            </li>
            {/* <li>
                <NavLink
                  to="/editor-pick"
                  className={({ isActive }) =>
                    isActive ? "active" : null
                  }
                >
                  EDITOR PICK
                </NavLink>
              </li> */}
            <li>
              <NavLink
                to="/author/name/1"
                className={({ isActive }) => (isActive ? 'active' : null)}
              >
                {t("header.author")}
              </NavLink>
              <p>{t("header.author")}</p>
            </li>
            <li>
              <NavLink
                to="/collector"
                className={({ isActive }) => (isActive ? 'active' : null)}
              >
                {t("header.collector")}
              </NavLink>
              <p>{t("header.collector")}</p>
            </li>
          </ul>
        </nav>
        <div className="left">
          {/* <span onClick={() => { handleMode(getMode) }}>{getMode == true ? t("header.mode_dark") : t("header.mode_light")}</span> */}
          <div className="search">
            <input
              placeholder={t("header.search")}
              value={search}
              onChange={handleSearch}
              onKeyUp={(e) => {
                if (search) {
                  e.key === 'Enter' ? getSearch() : null;
                }
              }}
              autoComplete="off"
            />
            <span
              style={{ cursor: search ? 'pointer' : 'default' }}
              onClick={search ? getSearch : null}
            >
              {/* <img src="/img/search.svg"></img> */}
              <SearchSVG stroke={search ? '#1152CC' : pathname.pathname === "/collector" ? '#ffffff' : '#707070'} />
            </span>
          </div>
          <ul>
            {loggedIn == true ? (
              <li className="dropDown">
                <ul
                  onMouseEnter={() => myPgMenu(true)}
                  onMouseLeave={() => myPgMenu(false)}
                >
                  {MYPG.map((menu, index) => (
                    <li key={index}>
                      <Link to={menu.link}>{t(menu.menu)}</Link>
                    </li>
                  ))}
                  <li className="logout">
                    <Link to="/" onClick={handleLogOut}>
                      {t("common.logout")}
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {/*Language*/}
            <div className={"language"} ref={languageRef} onClick={onLanguageClick}>
              {languageSelected}
              <img src={"/img/arrow_dropdown.svg"} alt={"language_dropdown"} className={"language_dropdown"} />
            </div>
            <div className={"language_dropdown_item"} style={{ display: isOpenLanguage ? "block" : "none" }}>
              {
                Object.keys(languageMap).map((value) =>
                  <div className={"item"} onClick={() => onLanguageItemClick(value, languageMap[value])}>{value}</div>)
              }
            </div>

            <li className="manual">
              <NavLink to="/report">
                {t("header.monthly_report")}
              </NavLink>
            </li>
            <li>
              {loggedIn == true ? (
                <ul
                  className="loggedIn"
                  onMouseEnter={() => myPgMenu(true)}
                  onMouseLeave={() => myPgMenu(false)}
                >
                  <li>
                    <Link to="/mypage">{t("header.mypage")}</Link>
                  </li>
                  <li>
                    <div
                      style={
                        userInfo.profileImgPath
                          ? {
                            backgroundImage: `url(${serverAddress + userInfo.profileImgPath
                              })`,
                          }
                          : { backgroundImage: `url(/img/author-img.png)` }
                      }
                    ></div>
                    {notification ? <div className="notification"></div> : null}
                  </li>
                </ul>
              ) : (
                <ul className="guest">
                  <li>
                    <Link to="/login">{t("common.login")}</Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link to="/signup">{t("common.signup")}</Link>
                  </li>
                </ul>
              )}
            </li>
            {/*<img src={"/img/language.svg"} alt={"language"} className={"language"} onClick={changeLanguage} />*/}
          </ul>
        </div>
      </HeaderStyle>

      <Outlet />
    </>
  );
};

export default Header;
