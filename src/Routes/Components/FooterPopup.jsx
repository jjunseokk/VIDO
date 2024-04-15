import React from 'react';
import CloseBig from './CloseBig';
import styles from './FooterPopup.module.scss';
import TermPersonalInfo from '../RegisterPage/components/TermPersonalInfo';
import TermMain from '../RegisterPage/components/TermMain';
import { motion } from 'framer-motion';
import FramerMotionAnimate from '../util/FramerMotionAnimate.json';
import styled from 'styled-components';
import px2vw from '../util/px2vw';

const Popup = styled(motion.div)`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100vh !important;
  z-index: 100 !important;
  margin: 0 !important;
  > div {
    position: absolute;
    &:nth-of-type(1) {
      top: 0;
      left: 0;
      background-color: #151515;
      opacity: 0.3;
      width: 100%;
      height: 100vh;
    }
    &:nth-of-type(2) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${px2vw(540)};
      height: 720px;
      background-color: #fff;
      padding: 32px 0;

      > button {
        position: fixed;
        top: 4px;
        right: 4px;
        background: none;
        border: none;
        cursor: pointer;
        width: 12px;
        height: 12px;
        > svg {
          width: 12px;
          height: 12px;
          path {
            cursor: pointer;
            stroke: #151515;
          }
        }
      }
      > div {
        height: 656px;
        padding: 0 24px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 14px;
        }
        &::-webkit-scrollbar-track {
          background: none;
        }
        &::-webkit-scrollbar-thumb {
          background: #f2f2f2;
          width: 12px;
          margin-right: 2px;
          border-radius: 6px;
          border: 2px solid #fff;
        }
        h1 {
          text-align: center;
          font: 800 32px/64px ${({ theme }) => theme.noto};
          color: $highlight-color;
        }
        p {
          font: 400 12px/16px ${({ theme }) => theme.noto};
          color: #151515;
          margin-bottom: 16px;
        }
        strong {
          font: 500 14px/24px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 1248px) {
    > div:nth-of-type(2) {
      width: ${px2vw(640)};
    }
  }
  @media (max-width: 1128px) {
    > div:nth-of-type(2) {
      width: ${px2vw(740)};
    }
  }
  @media (max-width: 824px) {
    > div:nth-of-type(2) {
      width: ${px2vw(840)};
    }
  }
  @media (max-width: 524px) {
    > div:nth-of-type(2) {
      width: ${px2vw(1040)};
    }
  }
`;

const WhichPopup = ({ popup, language }) => {
  switch (popup) {
    case 1:
      return <h1>준비중입니다.</h1>;
    case 2:
      return <TermMain language={language} />;
    case 3:
      return <TermPersonalInfo language={language} />;
    default:
      return <h1>준비중입니다.</h1>;
  }
};

const FooterPopup = ({ setPopup, popup, language }) => {
  return (
    <Popup
      variants={FramerMotionAnimate[0]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition="transition"
    >
      <div onClick={() => setPopup(0)}></div>
      <div>
        <button onClick={() => setPopup(0)}>
          <CloseBig />
        </button>
        <div>
          <WhichPopup popup={popup} language={language} />
        </div>
      </div>
    </Popup>
  );
};

export default FooterPopup;
