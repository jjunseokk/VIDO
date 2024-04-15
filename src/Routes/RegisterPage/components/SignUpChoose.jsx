import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './signupchoose.module.scss';
import styled from 'styled-components';
import { Trans, useTranslation } from "react-i18next";

const Page = styled.div`
  background-color: ${({ mode }) => (mode == 'light' ? '#f7f7f7' : '#151515')};
  padding-top: 100px;
  height: calc(100vh - 90px);
  width: 100%;
  h1 {
    text-align: center;
    font-size: 22px;
    font-family: ${({ theme }) => theme.noto};
    letter-spacing: -0.44px;
    color :${({ mode }) => (mode == 'light' ? '#151515' : '#ffff')};
  }
  > div.box {
    display: flex;
    margin: 4vh auto 0 auto;
    width: fit-content;
    gap: 10px;
    section {
      background-color: #fff;
      box-shadow: 0px 3px 6px #00000029;
      cursor: pointer;
      font-family: ${({ theme }) => theme.noto};
      width: 305px;
      height: 240px;
      text-align: center;
      transition: all 0.2s;
      a {
        display: block;
        width: 100%;
        height: 100%;

        p {
          line-height: 20px;
          margin-top: 67px;
          margin-bottom: 6px;
          font: 500 14px/20px ${({ theme }) => theme.noto};
        }
        h2 {
          color: #707070;
          font-size: 20px;
          line-height: 24px;
          font: 300 20px/24px ${({ theme }) => theme.noto};
        }
        embed {
          margin-top: 30px;
          position: relative;
          transition: all 0.2s;
        }
      }
      &:hover {
        box-shadow: 0px 6px 6px #00000029;
        embed {
          animation: moveArrow 2s ease;
        }
      }
    }
  }
  @media (max-width: 1206px) {
    height: calc(100vh - 72px);
  }
  @media (max-width: 762px) {
    height: calc(100vh - 64px);
    > div.box {
      section {
        width: 200px;
      }
    }
  }
`;

const SignUpChoose = ({ setUserInfo, footer, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Page mode={mode}>
      <h1>{t("common.signup")}</h1>
      <div className="box">
        <section>
          <Link to="/signup/terms-and-conditions-pers">
            <p>{t("signup.personal")}</p>
            <h2>
              <Trans i18nKey={"signup.personal_signup"} />
            </h2>
            <embed src="./img/signin_arrow.svg"></embed>
          </Link>
        </section>
        <section>
          <Link to="/signup/terms-and-conditions-comp">
            <p>{t("signup.group")}</p>
            <h2>
              <Trans i18nKey={"signup.group_signup"} />
            </h2>
            <embed src="./img/signin_arrow.svg"></embed>
          </Link>
        </section>
      </div>
      {footer}
    </Page>
  );
};

export default SignUpChoose;
