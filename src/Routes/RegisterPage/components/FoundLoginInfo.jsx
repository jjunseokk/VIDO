import React from 'react';
import RegisterBtn from './RegisterBtn';
import styles from './foundlogininfo.module.scss';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {Trans, useTranslation} from "react-i18next";

const Div = styled.div`
  p {
    text-align: center;
    letter-spacing: -0.32px;
    font: 400 16px/24px ${({theme}) => theme.noto};

    span {
      font: 600 16px/24px ${({theme}) => theme.noto};
    }

    &.warning {
      color: ${({theme}) => theme.mainColor};
      font: 400 14px/28px ${({theme}) => theme.noto};
      letter-spacing: -0.28px;
      margin-top: 8px;
    }
  }

  > div {
    &:first-of-type {
      margin-top: 32px;
    }

    &:nth-of-type(2) {
      button {
        background: #f8f8f8;
        color: ${({theme}) => theme.mainColor};
        margin-top: 10px;
      }
    }
  }
`;

const FoundLoginInfo = ({_id, pw}) => {
    const {t} = useTranslation();
    let location = useLocation();

    return (
        <Div className="box">
            {_id ? (
                <p>
                    <Trans i18nKey={"found.title"} components={[<span></span>]} values={{value: location.state.foundId}} />
                </p>
            ) : (
                <>
                    <p>
                        <Trans i18nKey={"found.temp"} components={[<span></span>]} values={{value: location.state.pw}} />
                    </p>
                    <p className="warning">{t("found.description")}</p>
                </>
            )}

            <RegisterBtn context={t("found.submit")} link={'/login'} width={292}/>

            {_id ? (
                <RegisterBtn
                    context={t("find.title")}
                    link={'/login/find-pw'}
                    width={292}
                />
            ) : null}
        </Div>
    );
};

export default FoundLoginInfo;
