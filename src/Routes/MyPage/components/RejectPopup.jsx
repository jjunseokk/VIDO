import React from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import { motion } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import {useTranslation} from "react-i18next";

const Div = styled.div`
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
    opacity: 0.3;
  }
  > .popup {
    background-color: #fff;
    width: ${px2vw(480)};
    height: ${px2vw(467)};
    box-shadow: ${({ theme }) => theme.boxShadow};
    padding: 36px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    > h1 {
      text-align: center;
      font: 500 20px ${({ theme }) => theme.noto};
      color: #151515;
      letter-spacing: 0.4px;
      margin-bottom: 12px;
    }
    > .box {
      padding: 8px 10px;
      background-color: #f8f8f8;
      height: ${px2vw(300)};
      width: ${px2vw(420)};
      overflow: auto;
      > p {
        color: #151515;
        font: 400 16px/24px ${({ theme }) => theme.noto};
      }
    }
    > .btnCont {
      margin-top: 24px;
      display: flex;
      gap: 5px;
      justify-content: center;
      > button {
        width: 80px;
        height: 30px;
        font: 400 14px/20px ${({ theme }) => theme.noto};
        letter-spacing: -0.28px;
        transition: ${({ theme }) => theme.transition};
        &:nth-of-type(1) {
          background-color: ${({ theme }) => theme.mainColor};
          border: 1px solid ${({ theme }) => theme.mainColor};
          color: #fff;
          &:hover {
            background-color: ${({ theme }) => theme.highlightColor};
          }
        }
        &:nth-of-type(2) {
          background-color: #f7f7f7;
          border: 1px solid ${({ theme }) => theme.mainColor};
          color: ${({ theme }) => theme.mainColor};
          &:hover {
            color: ${({ theme }) => theme.highlightColor};
          }
        }
      }
    }
  }
`;

const RejectPopup = ({ setPopup, setEditPopup, id, rejectReason }) => {
    const {t} = useTranslation();
  return (
    <Div>
      <motion.div
        className="popup"
        variants={FramerMotionAnimate[2]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition="transition"
      >
        <h1>{t("mypage.media_art.reject_reason")}</h1>
        <div className="box">
          <p>{rejectReason}</p>
        </div>
        <div className="btnCont">
          <button onClick={() => setPopup(false)}>{t("common.done")}</button>
          {setEditPopup ? (
            <button
              onClick={() => {
                setPopup(false);
                setEditPopup(true);
              }}
            >
              {t("mypage.media_art.edit")}
            </button>
          ) : null}
        </div>
      </motion.div>
    </Div>
  );
};

export default RejectPopup;
