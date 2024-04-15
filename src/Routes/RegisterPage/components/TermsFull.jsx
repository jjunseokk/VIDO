import React from 'react';
import TermMain from './TermMain';
import { AnimatePresence, motion } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import TermPersonalInfo from './TermPersonalInfo';
import TermMarketing from './TermMarketing';
import styled from 'styled-components';

const Div = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 100;
  background: none;

  > div {
    &:nth-of-type(1) {
      display: block;
      content: '';
      background-color: #151515;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.3;
    }
    &:not(:nth-of-type(1)) {
      position: absolute;
      z-index: 20;
      top: 213px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      width: 360px;
      height: 420px;
      > div {
        &:nth-of-type(1) {
          position: sticky;
          top: 0;
          background-color: #fff;
          z-index: 10;
          height: 40px;
          width: 100%;
          button {
            position: absolute;
            right: 5px;
            cursor: pointer;
            top: 5px;
            background: none;
            border: none;
            path {
              stroke: #707070;
            }
          }
        }
        &:nth-of-type(3) {
          position: sticky;
          bottom: 0;
          background-color: #fff;
          width: 100%;
          height: 40px;
          z-index: 20;
        }
        &:nth-of-type(2) {
          padding: 0 26px;
          overflow-y: scroll;
          height: 360px;

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
          * {
            font: 400 12px/16px ${({ theme }) => theme.noto};
            color: #707070;
          }
          p {
            font: 400 12px/16px ${({ theme }) => theme.noto};
            color: #707070;
            margin-bottom: 16px;
          }
          strong {
            font: 500 14px/24px ${({ theme }) => theme.noto};
          }
        }
      }
    }
  }
`;

const TermsFull = ({ setPopup, whichTerm = 1, language="ko" }) => {
  return (
    <Div
      variants={FramerMotionAnimate[0]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition="transition"
    >
      <div onClick={() => setPopup(false)} className={'modal'}></div>
      <div>
        <div>
          <button onClick={() => setPopup(false)}>
            <img src="/img/close-art.svg" />
          </button>
        </div>
        <div>
          {whichTerm === 0 ? (
            <TermMain language={language} />
          ) : whichTerm === 1 ? (
            <TermPersonalInfo language={language}/>
          ) : (
            <TermMarketing language={language} />
          )}
        </div>
        <div></div>
      </div>
    </Div>
  );
};

export default TermsFull;
