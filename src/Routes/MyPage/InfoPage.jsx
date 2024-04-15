import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import px2vw from '../util/px2vw';
import { getUserInfo } from '../util/userInfoGet';
import DeleteMember from './components/DeleteMember';
import UserInfoChange from './components/UserInfoChange';
import UserPwChange from './components/UserPwChange';
import {useTranslation} from "react-i18next";

const Div = styled.div`
  position: relative;
  border: ${({ theme }) => theme.border};
  width: ${px2vw(970)};
  overflow: hidden;
  padding-bottom: 120px;
  > nav {
    margin-bottom: 20px;
    width: 100%;
    background-color: ${({mode})=>(mode == 'light'? "#f8f8f8" : "#151515")};
    display: flex;
    height: 64px;
    position: relative;
    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: ${(props) => (props.whichInfo ? 0 : '130px')};
      height: 100%;
      width: 130px;
      background-color: ${({mode})=>(mode == 'light'? "#ffff" : "#151515")};
      transition: ${({ theme }) => theme.transition};
    }
    > p {
      z-index: 10;
      font: 400 16px/64px ${({ theme }) => theme.noto};
      letter-spacing: -0.4px;
      color: #707070;
      width: 130px;
      text-align: center;
      cursor: pointer;
      transition: ${({ theme }) => theme.transition};

      &.selected {
        font: 500 16px/64px ${({ theme }) => theme.noto};
        color: ${({mode})=>(mode == 'light'? "#151515" : "#ffffff")};
      }
    }
    > span {
      z-index: 10;
      position: absolute;
      right: 20px;
      top: 26px;
      font: 400 12px/18px ${({ theme }) => theme.noto};
      letter-spacing: -0.3px;
      color: #707070;
      cursor: pointer;
      transition: ${({ theme }) => theme.transition};
      &:hover {
        color: ${({ theme }) => theme.mainColor};
      }
    }
  }
  span.warning {
    color: ${({ theme }) => theme.errorColor};
    top: 0px;
    left: 430px;
  }
  .btn {
    position: absolute;
    width: 100%;
    bottom: 40px;
    > div {
      margin: 0 auto;
    }
  }
  @media (max-width: 1600px) {
    width: ${px2vw(1020)};
  }
  @media (max-width: 1240px) {
    width: ${px2vw(1040)};
    margin-bottom: 16px;

    > nav {
      height: 48px;
      > p {
        font: 400 14px/48px ${({ theme }) => theme.noto};
        &.selected {
          font: 500 14px/48px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 842px) {
    width: 90vw;

    margin-bottom: 12px;
    > nav {
      height: 36px;
      > p {
        font: 400 12px/36px ${({ theme }) => theme.noto};
        &.selected {
          font: 500 12px/36px ${({ theme }) => theme.noto};
        }
      }
    }
  }
`;

// 마이페이지 탭 버튼
const InfoPage = ({mode}) => {
  const {t} = useTranslation();
  const [whichInfo, setWhichInfo] = useState(true);
  const [popup, setPopup] = useState(false);
  return (
    <>
      {popup ? <DeleteMember setPopup={setPopup} /> : null}
      <Div whichInfo={whichInfo} mode={mode}>
        <nav>
          {/* <span onClick={() => setPopup(true)}>회원 탈퇴</span> */}
          <p
            className={whichInfo ? 'selected' : null}
            onClick={() => setWhichInfo(true)}
            style={{maxLines:1}}
          >
            {t("mypage.info.change.title")}
          </p>
          <p
            className={!whichInfo ? 'selected' : null}
            onClick={() => setWhichInfo(false)}
          >
            {t("mypage.info.change_pw.title")}
          </p>
        </nav>
        {whichInfo ? <UserInfoChange mode={mode} /> : <UserPwChange mode={mode} />}
      </Div>
    </>
  );
};

export default InfoPage;
