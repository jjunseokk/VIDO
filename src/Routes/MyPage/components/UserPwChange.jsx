import React, { useState } from 'react';
import styled from 'styled-components';
import BtnSmall from '../../Components/BtnSmall';
import InfoLi from './InfoLi';
import {
  validPwNo,
  validPwSpecial,
  characterNeccessary,
} from '../../util/Regex';
import AxiosConfig from '../../../AxiosConfig';
import SquareBtn from '../../Components/SquareBtn';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '../../util/recoilState';
import {Trans, useTranslation} from "react-i18next";
import {i18n} from "../../../language/i18n";

const ErrorSpan = styled.div`
  position: absolute;
  width: max-content;
  font: 400 14px/20px ${({ theme }) => theme.noto};
  left: 200px;
  color: ${({ theme }) => theme.highlightColor};
  letter-spacing: -0.35px;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  > div {
    &:nth-of-type(1) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
    &:nth-of-type(2) {
      width: 420px;
      height: 180px;
      background-color: #fff;
      box-shadow: ${({ theme }) => theme.boxShadow};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 12px;
      > p {
        text-align: center;
        color: #151515;
        font: 400 16px/30px ${({ theme }) => theme.noto};
      }
      > button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 38px;
      }
    }
  }
`;

const UserPwChange = ({mode}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(loginState);
  const [currPw, setCurrPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [checkPw, setCheckPw] = useState('');
  const [validPw, setValidPw] = useState(false);
  const [wrongPw, setWrongPw] = useState(false);
  const [popup, setPopup] = useState(false);

  let pwSpan = {
    default: t("mypage.info.change_pw.valid.regex"),
    notSame: t("mypage.info.change_pw.valid.no_same"),
    wrong: t("mypage.info.change_pw.valid.wrong"),
    done: t("mypage.info.change_pw.valid.done")
  };
  const checkPwValid = (value) => {
    let testResult =
      validPwNo.test(value) &&
      validPwSpecial.test(value) &&
      characterNeccessary.test(value);
    setValidPw(testResult);
    setNewPw(value);
  };
  const canSubmit = currPw && newPw && validPw && newPw == checkPw;
  const submit = () =>
    AxiosConfig.patch(`/user/password`, {
      oldPassword: currPw,
      newPassword: newPw,
    }).then((res) => {
      if (res.data.statusCode == 102) {
        setWrongPw(true);
      } else if (res.data.statusCode == 200) {
        setPopup(true);
      }
    });

  return (
    <div>
      {popup ? (
        <Popup>
          <div></div>
          <div>
            <p>
              <Trans i18nKey={"mypage.info.change_pw.valid.done"} />
            </p>
            <SquareBtn
              onClick={() => {
                setLoggedIn(false);
                navigate('/');
                window.location.reload();
              }}
              context={t("common.done")}
            />
          </div>
        </Popup>
      ) : null}
      <ul>
        <InfoLi mode={mode}>
          <div>
            <p>{t("mypage.info.change_pw.password")}</p>
            <div style={i18n.language === "ko" ? null : {left: "220px"}}>
              <input
                value={currPw}
                type="password"
                onChange={(e) => setCurrPw(e.target.value)}
              />
              <ErrorSpan>
                {wrongPw ? <span>{pwSpan['wrong']}</span> : null}
              </ErrorSpan>
            </div>
          </div>
        </InfoLi>
        <InfoLi mode={mode}>
          <div>
            <p>{t("mypage.info.change_pw.change_password")}</p>
            <div style={i18n.language === "ko" ? null : {left: "220px"}}>
              <input
                value={newPw}
                type="password"
                onChange={(e) => checkPwValid(e.target.value)}
              />
              <ErrorSpan>
                {!validPw && newPw ? <span>{pwSpan['default']}</span> : null}
              </ErrorSpan>
            </div>
          </div>
        </InfoLi>
        <InfoLi mode={mode}>
          <div>
            <p>{t("mypage.info.change_pw.change_password_confirm")}</p>
            <div style={i18n.language === "ko" ? null : {left: "220px"}}>
              <input
                value={checkPw}
                type="password"
                onChange={(e) => setCheckPw(e.target.value)}
              />
              <ErrorSpan>
                {checkPw != newPw && checkPw ? (
                  <span>{pwSpan['notSame']}</span>
                ) : null}
              </ErrorSpan>
            </div>
          </div>
        </InfoLi>
      </ul>
      <div className="btn">
        <BtnSmall
          onClick={submit}
          className={canSubmit ? null : 'disabled'}
          blue
          width="280px"
        >
          <p>{t("common.save")}</p>
        </BtnSmall>
      </div>
    </div>
  );
};

export default UserPwChange;
