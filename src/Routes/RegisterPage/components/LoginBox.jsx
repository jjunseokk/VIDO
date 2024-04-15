import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AxiosConfig from '../../../AxiosConfig';
import SignupFooter from './SignupFooter';
import RegisterInputText from './RegisterInputText';
import RegisterInputCheckbox from './RegisterInputCheckbox';
import { motion } from 'framer-motion';
import SquareBtn from '../../Components/SquareBtn';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';
import {
  loginState,
  userBaseInfoState,
  errorState,
} from '../../util/recoilState';
import { useQuery } from 'react-query';
import { getAccInfo } from '../../util/userInfoGet';
import styled from 'styled-components';
import LoginFailPopup from './LoginFailPopup';
import {Trans, useTranslation} from "react-i18next";

const Box = styled(motion.div)`
  h1{
    color : ${({mode})=> (mode == 'light'? '#151515' : '#ffff')}
  }
  .box {
    form {
      li {
        &:nth-of-type(1) {
        }
        &:nth-of-type(2) {
          margin-bottom: 12px;
        }
      }
      .txt {
        display: flex;
        justify-content: space-between;
        font: 400 12px/12px ${({ theme }) => theme.noto};
        color: #707070;
        margin-bottom: 30px;
      }
      button {
        &:nth-of-type(1) {
          margin-bottom: 10px;
        }
      }
    }
  }
`;

const LoginBox = ({mode}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  // const { loggedIn, setLoggedIn, setLoggedInHandler } = useContext(UserContext);
  const setLoggedIn = useSetRecoilState(loginState);
  const setInfo = useSetRecoilState(userBaseInfoState);
  const setError = useSetRecoilState(errorState);
  const [loginfail, setLoginfail] = useState(false);
  const [getQuery, setGetQuery] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['rememberUserId']);
  let loginData = {
    userId: id,
    userPw: pw,
    // activateCode: '134aadfadsf',
  };

  useEffect(() => {
    if (cookie.rememberUserId != undefined) {
      setId(cookie.rememberUserId);
      setRememberId(true);
    }
  }, []);

  const handleCheck = (e) => {
    if (e.target.checked) {
      setRememberId(true);
    } else {
      setRememberId(false);
      removeCookie('rememberUserId');
    }
  };

  let handleLogin = async () => {
    const expireDate = new Date(
      new Date() + 1,
      new Date().getMonth(),
      new Date().getDate()
    );
    await AxiosConfig.post('account/login', loginData, {}).then((res) => {
      if (res.data.statusCode === 200) {
        if (rememberId == true) {
          setCookie('rememberUserId', id, {
            path: '/',
            expires: expireDate,
            maxAge: 60 * 60 * 24 * 365,
          });
        } else {
          removeCookie('rememberUserId');
        }
        if(import.meta.env.DEV) {
          console.log("DEV");
          console.log(res.headers["set-cookie"]);
        }
        setGetQuery(true);
      } else if (res.data.statusCode == 105) {
        setLoginfail(2);
      } else {
        setLoginfail(1);
      }
    });
  };
  const { isIdle, data, status } = useQuery('loginCheck', getAccInfo, {
    enabled: getQuery,
  });
  if (status === 'success') {
    setLoggedIn(true);
    setInfo(data);
    navigate('/');
  } else if (status === 'error') {
    setError({ errorMessage: '로그인', popup: true });
  }
  // let handleLoggedIn = async () => {
  //   await AxiosConfig.get('account/user', loginData, {}).then((res) => {
  //     console.log(res);
  //     if (res.data.statusCode === 200) {
  //       setLoggedInHandler(true);
  //       navigate('/');
  //     } else {
  //       setApiError('로그인');
  //       setErrorMessage(res.data.statusCode);
  //       setErrorPopup(true);
  //     }
  //   });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <>
      <Box
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        mode={mode}
      >
        <h1>{t("common.login")}</h1>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <ul>
              <li>
                <RegisterInputText
                  placeHolder={t("login.id_input")}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </li>
              <li>
                <RegisterInputText
                  placeHolder={t("login.pw_input")}
                  type={'password'}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </li>
            </ul>
            <div className="txt">
              <RegisterInputCheckbox
                id={'rememberId'}
                txt={[t("login.save"), '']}
                onChange={handleCheck}
                checked={rememberId}
              />
              <p>
                <Link to="/login/find-id">{t("common.id")}/</Link>
                {/*<Link to="/login/find-pw">{t("login.password_find")}</Link>*/}
                <Link to="/login/find-pw">{
                  <Trans i18nKey={"login.password_find"} />
                }</Link>
              </p>
            </div>

            <SquareBtn context={t("common.login")} onClick={handleLogin} />
            <SquareBtn
              context={t("common.signup")}
              onClick={() => navigate('/signup')}
              bgColor="#F8F8F8"
              color="#002E85"
              hoverColor="#e0e0e0"
            />
          </form>
        </div>
      </Box>
      {loginfail == 1 ? (
        <LoginFailPopup
          context={t("login.login_failed")}
          setPopup={setLoginfail}
        />
      ) : loginfail == 2 ? (
        <LoginFailPopup
          context={t("login.login_removed")}
          setPopup={setLoginfail}
        />
      ) : null}
    </>
  );
};

export default LoginBox;
