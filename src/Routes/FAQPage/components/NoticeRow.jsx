import React, { useState } from 'react';
import styled from 'styled-components';
import OpenMenuSvg from '../../Components/OpenMenuSvg';
import px2vw from '../../util/px2vw';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';

const Li = styled.li`
  > ul {
    display: flex;
    transition: ${({ theme }) => theme.transition};
    background-color: #fff;
    > li {
      &:nth-of-type(1) {
        text-align: center;
        width: ${px2vw(94)};
        font: 400 14px/60px ${({ theme }) => theme.noto};
        color: #626262;
      }
      &:nth-of-type(2) {
        transition: ${({ theme }) => theme.transition};
        font: 500 18px/60px ${({ theme }) => theme.noto};
        color: ${(props) =>
          props.open ? props.theme.highlightColor : '#333333'};
        cursor: pointer;

        letter-spacing: -0.36px;
        &:hover {
          color: ${({ theme }) => theme.highlightColor};
        }
      }
      &:nth-of-type(3) {
        position: relative;
        font: 400 14px/60px ${({ theme }) => theme.noto};
        letter-spacing: -0.36px;
        color: #626262;
        > span {
          position: absolute;
          right: -20px;
          cursor: pointer;
          transition: ${({ theme }) => theme.transition};
          > svg {
            transition: ${({ theme }) => theme.transition};
            transform: ${(props) =>
              props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
          }
        }
      }
    }
  }
  > div.cont {
    position: relative;
    background-color: #f8f8f8;
    transition: ${({ theme }) => theme.transition};
    height: ${(props) => (props.open ? 'fit-content' : '0px')};
    overflow: hidden;
    padding: 10px ${px2vw(121)} 36px ${px2vw(154)};
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
        font: 500 16px/48px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        font: 500 12px/48px ${({ theme }) => theme.noto};
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
      }
      &:nth-of-type(2) {
        font: 500 14px/48px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        font: 500 10px/48px ${({ theme }) => theme.noto};
      }
    }
    > div.cont > p {
      font: 500 14px/24px ${({ theme }) => theme.noto};
    }
  }
`;

const NoticeRow = ({ id, title, date, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <Li open={open}>
      <ul>
        <li>{id}</li>
        <li onClick={() => setOpen((prev) => !prev)}>{title}</li>
        <li>
          {date}
          <span onClick={() => setOpen((prev) => !prev)}>
            <OpenMenuSvg />
          </span>
        </li>
      </ul>
      {open ? (
        <motion.div
          className="cont"
          variants={FramerMotionAnimate[3]}
          initial="initial"
          animate="animate"
          transition="transition"
        >
          <p>{content}</p>
        </motion.div>
      ) : null}
    </Li>
  );
};

export default NoticeRow;
