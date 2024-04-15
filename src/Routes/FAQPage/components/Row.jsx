import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FooterPopup from '../../Components/FooterPopup';
import OpenMenuSvg from '../../Components/OpenMenuSvg';
import px2vw from '../../util/px2vw';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';

const Li = styled(motion.li)`
  transition: ${({ theme }) => theme.transition};
  > ul {
    display: flex;
    transition: ${({ theme }) => theme.transition};
    > li {
      &:nth-of-type(1) {
        text-align: center;
        width: ${px2vw(94)};
        font: 400 14px/60px ${({ theme }) => theme.noto};
        color: #626262;
      }
      &:nth-of-type(2) {
        width: ${px2vw(232)};

        padding-left: ${px2vw(32)};
        transition: ${({ theme }) => theme.transition};
        font: 500 18px/60px ${({ theme }) => theme.noto};
        color: #333333;

        letter-spacing: -0.36px;
      }
      &:nth-of-type(3) {
        width: ${px2vw(980)};
        position: relative;

        font: 400 18px/60px ${({ theme }) => theme.noto};
        letter-spacing: -0.36px;
        color: ${(props) =>
          props.open ? props.theme.highlightColor : '#333333'};
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.highlightColor};
        }
        > span {
          position: absolute;
          right: 0px;
          cursor: pointer;
          transition: ${({ theme }) => theme.transition};
          > svg {
            position: relative;
            transition: ${({ theme }) => theme.transition};
            transform: ${(props) =>
              props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
          }
        }
      }
    }
  }
  > div.cont {
    background-color: #f8f8f8;
    transition: ${({ theme }) => theme.transition};
    height: ${(props) => (props.open ? 'fit-content' : '0px')};
    overflow: hidden;
    padding: 10px ${px2vw(121)} 36px ${px2vw(320)};
    > p {
      white-space: pre-wrap;
      font: 400 16px/24px ${({ theme }) => theme.noto};
      letter-spacing: -0.32px;
      width: ${px2vw(858)};
      color: #333333;
      &:nth-of-type(2) {
        margin-top: 12px;
        color: ${({ theme }) => theme.highlightColor};
        cursor: pointer;
      }
    }
  }
  @media (max-width: 1376px) {
    > ul > li {
      &:nth-of-type(1) {
        font: 400 12px/48px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(2) {
        font: 500 14px/48px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        font: 500 16px/48px ${({ theme }) => theme.noto};
      }
    }
    > div.cont > p {
      font: 500 16px/24px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 1242px) {
    > ul > li {
      &:nth-of-type(1) {
        font: 400 10px/48px ${({ theme }) => theme.noto};
        width: ${px2vw(64)};
      }
      &:nth-of-type(2) {
        width: ${px2vw(362)};

        font: 500 10px/48px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        width: ${px2vw(880)};

        font: 500 12px/48px ${({ theme }) => theme.noto};
      }
    }
    > div.cont > p {
      font: 500 12px/24px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 540px) {
    > ul > li {
      &:nth-of-type(1) {
        font: 400 10px/48px ${({ theme }) => theme.noto};
        width: ${px2vw(44)};
      }
      &:nth-of-type(2) {
        width: ${px2vw(402)};

        font: 500 10px/48px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        width: ${px2vw(860)};

        font: 500 10px/48px ${({ theme }) => theme.noto};
      }
    }
    > div.cont > p {
      font: 500 10px/24px ${({ theme }) => theme.noto};
    }
  }
`;

const Ect = ({ type, setPopup }) => {
  switch (type) {
    case 'manual':
      return (
        <a href="/img/[VIDO] 온라인 플랫폼 유저가이드_.pdf" target="_blank">
          작가 메뉴얼 다운받기
        </a>
      );
    case 'myPage':
      return <Link to="/Mypage">마이 페이지로 가기</Link>;
    case 'register':
      return <Link to="/signup">마이 페이지로 가기</Link>;
    case 'terms':
      return <span onClick={() => setPopup(true)}>이용약관 보기</span>;
  }
};

const Row = ({ id, title, date, content, ect = null, category }) => {
  const [show, setShow] = useState(false);
  const [popup, setPopup] = useState(false);
  return (
    <>
      <Li open={show}>
        <ul>
          <li>{id}</li>
          <li>{category}</li>
          <li onClick={() => setShow((prev) => !prev)}>
            {title}

            <span>
              <OpenMenuSvg />
            </span>
          </li>
        </ul>
        {show ? (
          <motion.div
            className="cont"
            variants={FramerMotionAnimate[3]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition="transition"
          >
            <p>{content}</p>
            {ect != null ? (
              <p>
                <Ect type={ect} setPopup={setPopup} />{' '}
              </p>
            ) : null}
          </motion.div>
        ) : null}
        {popup ? <FooterPopup setPopup={setPopup} popup={2} /> : null}
      </Li>
    </>
  );
};

export default Row;
