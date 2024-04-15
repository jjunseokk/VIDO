import React from 'react';
import RegisterBtn from './RegisterBtn';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

const Div = styled.div`
  p {
    font-family: ${({ theme }) => theme.noto};

    &:first-of-type {
      font-size: 16px;
      margin-bottom: 13px;

      span {
        font-weight: 700;
      }
    }

    &:last-of-type {
      font-size: 12px;
      font-weight: 300;
      margin-bottom: 32px;
    }
  }
`;

const RegisterDone = ({ mode }) => {
  const { t } = useTranslation();
  const { state } = useLocation();
  let name = state ? state : 'temp';
  return (
    <div style={{background:'#ffff'}}>
      <h1>{t("signup.done.title")}</h1>
      <Div mode={mode} className="box">
        <p>
          <span>{name} </span>{t("signup.done.welcome")}
        </p>
        <p>{t("signup.done.description")}</p>
        <RegisterBtn context={t("signup.done.submit")} link={'/login'} width={280} />
      </Div>
    </div>
  );
};

export default RegisterDone;
