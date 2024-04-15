import React, {useEffect, useState} from 'react';
import Registerbtn from './RegisterBtn';
import RegisterInputText from './RegisterInputText';
import RoundBtn from './RoundBtn';
import AxiosConfig from '../../../AxiosConfig';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from '../../Components/ErrorPopup';
import styled from 'styled-components';
import NiceVerification from './NiceVerification';
import NiceVerificationFind from './NiceVerificationFind';
import NiceVeriFindPw from './NiceVeriFindPw';
import FindError from './FindError';
import { AnimatePresence } from 'framer-motion';
import {useTranslation} from "react-i18next";

const Style = styled.div`
  > input {
    &:nth-of-type(2) {
      margin-top: 30px;
    }
  }
  > div.input {
    position: relative;
    button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
    &:first-of-type {
      margin-top: 30px;
    }
    &:nth-of-type(2) {
      margin-top: 10px;
    }
  }
  div:not(.input) {
    :first-of-type {
      margin-top: 32px;
      button {
        margin: 0;
      }
    }
    :nth-of-type(2) {
      button {
        margin-top: 10px;
        color: ${({ theme }) => theme.mainColor};
        background-color: #f8f8f8;
      }
    }
  }
  span {
    width: 500px;
    z-index: 10;
    left: 0;
    display: inline-block;
    letter-spacing: -0.16px;
    color: ${({ theme }) => theme.highlightColor};
    font: 400 11px/17px ${({ theme }) => theme.noto};
    line-height: 12px;
    &.avail {
      color: #151515;
    }
    // &:nth-of-type(2) {
    //   top: 102px;
    // }
  }
`;

const FindLoginInfo = ({ id_, pw }) => {
  const {t} = useTranslation();
  let navigate = useNavigate();
  const [id, setId] = useState(['', id_]);
  const [name, setName] = useState(['', false]);
  const [tel, setTel] = useState(['', false]);
  const [email, setEmail] = useState(["", false]);
  const [telVeri, setTelVeri] = useState(['', false]);
  const [veriNum, setVeriNum] = useState(false);
  const [di, setDi] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [veriInfo, setVeriInfo] = useState(null);
  const validId = /^[A-Z|a-z|0-9]{4,12}$/;
  const validName = /^[가-힣a-zA-Z\s]{1,20}$/;
  const characterNeccessaryKor = /[A-Z|가-힣|a-z|0-9]+/;
  const validTel = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const emailValid = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState('1652321522321');
  const [errorPopup, setErrorPopup] = useState(false);
  const [wrongPopup, setWrongPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [requestId, setRequestId] = useState(0);
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isEmailVerify, setIsEmailVerify] = useState(null);
  const [emailVerify, setEmailVerify] = useState(["", false]);
  const [mailCount, setMailCount] = useState(60 * 5);
  const [mailRetryCount, setMailRetryCount] = useState(0);
  const [isMailCountReset, setIsMailCountReset] = useState(false);
  const [emailSendTime, setEmailSendTime] = useState(new Date());

  const handleIdchange = (e) => {
    setId([e.target.value, true]);
  };
  const handleNamechange = (e) => {
    setName([e.target.value, validName.test(e.target.value)]);
  };
  const handleTelchange = (e) => {
    setTel([e.target.value, validTel.test(e.target.value)]);
  };
  const handleTelVerichange = (e) => {
    setTelVeri([e.target.value, true]);
  };

  const onVerifyClick = () => {
    if(mailRetryCount < 3) {
      setMailRetryCount(mailRetryCount + 1);
      setEmailSendTime(new Date());
      const id = Math.floor(Math.random() * (999999999 - 100000000) + 100000000);
      const data = {};
      data["requestId"] = id;
      data["email"] = email[0];
      setRequestId(id)

      if (mailCount < 5 * 60 && !isMailCountReset) {
        setIsMailCountReset(true);
        setMailCount(60 * 5);
      }

      AxiosConfig.post(`account/email`, data).then((res) => {
            setIsEmailSend(res.data.statusCode === 200);
          }
      )
    } else {
      alert(t("signup.input.email.alert"))
    }
  }

  const onCheckClick = () => {
    const data = {};
    data["requestId"] = requestId;
    data["key"] = emailVerify[0];

    AxiosConfig.post(`account/email/verify`, data).then((res) => {
      setIsEmailVerify(res.data.statusCode === 200);
    })
  }

  const onEmailChanged = (e) => {
    setEmail([e.target.value, emailValid.test(e.target.value)]);
  }

  const onEmailCodeChanged = (e) => {
    if(e.target.value.length > 7) return;
    setIsEmailVerify(null);
    setEmailVerify([e.target.value, e.target.value.length === 7]);
  }

  // const handleReady = () => {
  //   setReady(id[1] && name[1] && tel[1] && telVeri[1]);
  // };
  const findId = async () => {
    const res = await AxiosConfig.get(
      `/account/find/id?userName=${name[0]}&userEmail=${email[0]}`
    );

    if(res.data.statusCode === 200) {
      navigate("/login/found-id", {state: {foundId: res.data.result.userId}});
    } else {
      setWrongPopup(true);
    }
  };

  const findPw = async () => {
    const res = await AxiosConfig.get(
      `/account/find/pw?userName=${name[0]}&userId=${id[0]}&userEmail=${email[0]}`
    );

    if(res.data.statusCode === 200) {
      navigate('/login/found-pw', { state: { pw: res.data.result.password } });
    } else {
      setWrongPopup(true);
    }
  };

  const convertToTime = () => {
    const min = Math.floor(mailCount / 60);
    const sec = `0${mailCount % 60}`.slice(-2);

    return `0${min}:${sec}`;
  }

  useEffect(() => {
    if(isEmailSend) {
      setTimeout(() => {
        if(isMailCountReset) {
          setIsMailCountReset(false);
          setMailCount(60 * 5 - 1);
        } else if(mailCount > 0) {
          setMailCount(60 * 5 - Math.floor(((new Date()).getTime() - emailSendTime) / 1000));
          // console.log(Math.floor(((new Date()).getTime() - emailSendTime) / 1000));
        }

      }, 1000);
    }
  }, [isEmailSend, mailCount]);

  return (
    <>
      {errorPopup ? (
        <ErrorPopup
          context={apiError}
          errorMessage={errorMessage}
          setErrorPopup={setErrorPopup}
        />
      ) : null}
      <h1>{pw ? t("find.title") : t("find.title_id")}</h1>
      <Style className="box">
        <ul>
          <li>
            <RegisterInputText
              placeHolder={t("find.name")}
              value={name[0]}
              onChange={handleNamechange}
            />
          </li>
          {pw ? (
            <li>
              <RegisterInputText
                placeHolder={t("find.id")}
                value={id[0]}
                onChange={handleIdchange}
              />
            </li>
          ) : null}
          <li style={{marginBottom: "0px"}}>
            <RegisterInputText
              placeHolder={t("find.email.hint")}
              value={email[0]}
              onChange={onEmailChanged}
            />
            <RoundBtn
              context={isEmailSend ? t("signup.input.email.retry"): t("find.email.submit")}
              disabled={!email[1]}
              onClick={onVerifyClick}
            />
          </li>
          {isEmailSend ? (
              <span style={{marginBottom: "20px"}}>
                {t("signup.input.email.left")} {convertToTime()}
              </span>
          ): (<div style={{height:"32px", margin: 0}}></div>)}
          <li>
            <RegisterInputText
                placeHolder={t("find.email.verify.hint")}
                value={emailVerify[0]}
                onChange={onEmailCodeChanged}
                disabled={!isEmailSend}
                type={"number"}
            />
            <RoundBtn
                context={t("find.email.verify.check")}
                disabled={!emailVerify[1] || isEmailVerify}
                onClick={onCheckClick}
            />
          </li>
          {isEmailVerify === false? (<span>{t("signup.input.email.verify.failed")}</span>) :null}
        </ul>
        {id_ ? (
          <NiceVerificationFind
            verification={verificationSent}
            setVeriNum={setVeriNum}
            setVeriInfo={setVeriInfo}
            setDi={setDi}
          />
        ) : (
          <NiceVeriFindPw
            verification={verificationSent}
            setVeriNum={setVeriNum}
            setVeriInfo={setVeriInfo}
            setDi={setDi}
          />
        )}

        <div>
          <Registerbtn
            context={t("find.submit")}
            disabled={!(name[1] && email[1] && isEmailVerify)}
            onClick={id_ ? findId : findPw}
            width={280}
          />
          {id_ ? (
            <Registerbtn
              context={t("find.title")}
              link={'/login/find-pw'}
              width={280}
            />
          ) : null}
        </div>
      </Style>
      <AnimatePresence>
        {wrongPopup ? <FindError setPopup={setWrongPopup} id={id_} /> : null}
      </AnimatePresence>
    </>
  );
};

export default FindLoginInfo;
