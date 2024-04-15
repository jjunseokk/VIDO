import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BtnSmall from '../../Components/BtnSmall';
import {useTranslation} from "react-i18next";
const Div = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  > div {
    width: 400px;
    height: 172px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: #fff;
    > img {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
    }
    > p {
      margin-top: 48px;
      margin-bottom: 24px;
      text-align: center;
      font: 600 14px/20px ${({ theme }) => theme.noto};
      letter-spacing: -0.35px;
    }
    > div {
      margin: 0 auto;
    }
  }
`;

const LoginPopup = ({ setPopup }) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <Div>
      <div>
        <img src="/img/close-art.svg" onClick={() => setPopup(false)} />
        <p>{t("service.inquiry.popup.title")}</p>
        <BtnSmall blue width={'138px'} onClick={() => navigate('/login')}>
          <p>{t("common.login")}</p>
        </BtnSmall>
      </div>
    </Div>
  );
};

export default LoginPopup;
