import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components';
import AlertPopup from '../../Components/AlertPopup';
import {loginState} from '../../util/recoilState';
import LoginPopup from './LoginPopup';
import MyAsk from './MyAsk';
import SendAsk from './SendAsk';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  margin-top: 36px;
  width: ${({theme}) => theme.pgWidth};
  position: relative;
  left: ${({theme}) => theme.left};

  > ul {
    display: flex;
    gap: 33px;
    margin-bottom: 24px;

    > li {
      transition: ${({theme}) => theme.transition};
      font: 400 16px/24px ${({theme}) => theme.noto};
      cursor: pointer;
      width: 90px;
      text-align: center;

      &.selected {
        color: ${({theme}) => theme.highlightColor};
        font: 500 16px/24px ${({theme}) => theme.noto};
      }
    }
  }

  @media (max-width: 762px) {
    width: 90vw;
    left: 5vw;
  }
`;

const OneToOne = () => {
    const {t} = useTranslation();
    const [menu, setMenu] = useState(0);
    const loggedIn = useRecoilValue(loginState);
    const [popup, setPopup] = useState(true);

    return (
        <Div>
            <ul>
                <li
                    onClick={() => (loggedIn != true ? null : setMenu(0))}
                    className={menu == 0 ? 'selected' : null}
                >
                    {t("service.inquiry.title")}
                </li>
                <li
                    onClick={() => (loggedIn != true ? null : setMenu(1))}
                    className={menu == 1 ? 'selected' : null}
                >
                    {t("service.inquiry.history.title")}
                </li>
            </ul>
            <div className="dropDown"></div>
            {loggedIn !== true && popup == true ? (
                <LoginPopup setPopup={setPopup}/>
            ) : null}
            <div className={loggedIn != true ? 'disabled' : null}>
                {menu == 0 ? (
                    <SendAsk disabled={loggedIn !== true ? true : false}/>
                ) : (
                    <MyAsk/>
                )}
            </div>
        </Div>
    );
};

export default OneToOne;
