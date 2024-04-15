import React, { useState, useRef, useEffect, useContext } from 'react';
import AxiosConfig from '../../../AxiosConfig';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../ContextProvider';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState, userBaseInfoState } from '../../util/recoilState';
import Converter from '../../Components/Converter';
import { ProfileMenuStyle } from './ProfileMenuStyle';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

const AlertPopup = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  > .modal {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  > .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 400px;
    height: 140px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    padding: 32px;
    > p {
      color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
      font: 500 14px/20px ${({ theme }) => theme.noto};
      text-align: center;
      margin-bottom: 24px;
    }
    > button {
      margin: 0 auto;
      display: block;
      color: #fff;
      background-color: ${({ theme }) => theme.mainColor};
      width: 138px;
      height: 32px;
      transition: ${({ theme }) => theme.transition};
    }
  }
`;

const ProfileMenu = ({ mode }) => {
  const { t } = useTranslation();
  const info = useRecoilValue(userBaseInfoState);
  const setLoggedIn = useSetRecoilState(loginState);
  const [userData, setUserData] = useState(null);
  const [profileTxt, setProfileTxt] = useState(info.description);
  const { serverAddress } = useContext(UserContext);
  const [wrongImg, setWrongImg] = useState(false);
  const [file, setFile] = useState(null);
  const [webp, setWebp] = useState(null);
  const ul = useRef();
  const onChange = (e) => {
    e.stopPropagation();
    let newfile = e.target.files[0];
    if (newfile) {
      let reader = new FileReader();
      reader.readAsDataURL(newfile);
      reader.onload = function (e) {
        let image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          let height = this.height;
          let width = this.width;
          if (height === 300 && width === 300) {
            console.log(image.src);
            setFile(image.src);
          } else {
            setWrongImg(true);
          }
        };
      };
    }
  };
  let img = new FormData();
  useEffect(() => {
    if (webp) {
      console.log(webp);
      img.append('img', webp);
      upLoadImg();
    }
  }, [webp]);
  // let img = new FormData();

  // const onChange = (e) => {
  //   img.append('img', e.target.files[0]);
  //   e.stopPropagation();
  //   let reader = new FileReader();
  //   console.log(reader);
  //   let newfile = e.target.files[0];

  //   if (newfile) {
  //     upLoadImg();
  //     reader.readAsDataURL(newfile);
  //   }
  // };
  const upLoadImg = () => {
    setWrongImg(false);

    AxiosConfig.post('/user/img', img).then((res) => {
      if (res.data.statusCode === 200) {
        getUserInfo();
        img.delete('img');
      }
    });
  };

  const getUserInfo = () =>
    AxiosConfig.get(`/user/info`).then((res) => {
      if (res.data.statusCode == 200) {
        setUserData(res.data.result);
        if (res.data.result.description) {
          setProfileTxt(res.data.result.description);
        }
        if (!res.data.result.profileImgPath) {
        }
      } else if (res.data.statusCode == 104) {
        setLoggedIn(false);
      }
    });
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <AnimatePresence mode={mode}>
        {wrongImg ? (
          <AlertPopup mode={mode}>
            <div className="modal" onClick={() => setWrongImg(false)}></div>
            <div className="popup">
              <p>{t("mypage.profile.img_hint")}</p>
              <button onClick={() => setWrongImg(false)}>{t("common.done")}</button>
            </div>
          </AlertPopup>
        ) : null}
      </AnimatePresence>
      <ProfileMenuStyle mode={mode}>
        <div className="upper">
          {userData ? (
            <>
              <div
                className="profImg"
                style={
                  userData.profileImgPath
                    ? {
                      backgroundImage: ` url(${serverAddress + userData.profileImgPath
                        })`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }
                    : {
                      backgroundSize: 'cover',
                      backgroundImage: ` url('../img/author-img.png')`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }
                }
              >
                <div className="input">
                  <img src="/img/profile-button.svg" className="plus" />
                  <form>
                    <input
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      name="img"
                      onChange={onChange}
                      id="img"
                    />
                  </form>
                  <div className="info">
                    {t("mypage.profile.img_hint")}
                  </div>
                </div>
              </div>
              <p className="name">
                {info.authorName}
              </p>
            </>
          ) : null}
          <div></div>
        </div>

        <ul ref={ul} className="nav">
          {/* <ArcodianItem
          n={0}
          whichInfo={whichInfo}
          onClick={handleMenuSelect}
          onInfoSelect={handleInfoSelect}
          selectMenu={selectMenu}
          title={{ title: '내 정보 관리', link: '/mypage/' }}
          content={[
            { title: '기본정보 변경', link: '/mypage/' },
            { title: '비밀번호 변경', link: '/mypage/pwchange' },
          ]}
        /> */}

          <li>
            <NavLink
              to={'/mypage/'}
              style={({ isActive }) => ({
                color: isActive ? '#002e85' : mode == 'light'? '#151515' : '#ffffff',
              })}
              className={({ isActive }) => (isActive ? 'active' : null)}
            >
              {t("header.menu.info")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/mypage/myart'}
              style={({ isActive }) => ({
                color: isActive ? '#002e85' : mode == 'light'? '#151515' : '#ffffff',
              })}
              className={({ isActive }) => (isActive ? 'active' : null)}
            >
              {t("header.menu.media_art")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/mypage/dashboard'}
              style={({ isActive }) => ({
                color: isActive ? '#002e85' : mode == 'light'? '#151515' : '#ffffff',
              })}
              className={({ isActive }) => (isActive ? 'active' : null)}
            >
              {t("header.menu.dashboard")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/mypage/Payment'}
              style={({ isActive }) => ({
                color: isActive ? '#002e85' : mode == 'light'? '#151515' : '#ffffff',
              })}
              className={({ isActive }) => (isActive ? 'active' : null)}
            >
              {t("header.menu.refund")}
            </NavLink>
          </li>
        </ul>
        <Converter
          inputFile={file}
          width={300}
          height={300}
          setWebp={setWebp}
        />
      </ProfileMenuStyle>
    </>
  );
};

export default ProfileMenu;
