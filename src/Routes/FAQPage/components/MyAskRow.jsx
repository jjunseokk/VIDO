import React, { useState } from 'react';
import styled from 'styled-components';
import OpenMenuSvg from '../../Components/OpenMenuSvg';
import px2vw from '../../util/px2vw';
import { motion, AnimatePresence } from 'framer-motion';
import FramerMotionAnimate from '../../util/FramerMotionAnimate.json';
import {useTranslation} from "react-i18next";
const Li = styled.li`
  > ul > li {
    min-height: 60px;
    display: grid;
    align-items: center;
    &:nth-of-type(1) {
      font: 400 14px ${({ theme }) => theme.noto};
      color: #626262;
    }
    &:nth-of-type(2) {
      transition: ${({ theme }) => theme.transition};
      font: 500 18px ${({ theme }) => theme.noto};
      color: #333333;

      letter-spacing: -0.36px;
    }
    &:nth-of-type(3) {
      position: relative;

      font: 400 18px ${({ theme }) => theme.noto};
      letter-spacing: -0.36px;
      color: ${(props) =>
        props.open ? props.theme.highlightColor : '#333333'};
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.highlightColor};
      }
    }
    &:nth-of-type(4) {
      font: 400 14px ${({ theme }) => theme.noto};
      color: #707070;
      position: relative;
      cursor: pointer;
      > span {
        position: absolute;
        right: ${px2vw(12)};
        transition: ${({ theme }) => theme.transition};
        > svg {
          transition: ${({ theme }) => theme.transition};
          transform: ${(props) =>
            props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
        }
      }
    }
  }
  div.content {
    p {
      white-space: pre-wrap;
    }
    > div {
      &:nth-of-type(2) {
        background-color: #f8f8f8;
        padding-bottom: 24px;
      }
      > div {
        margin-left: 324px;

        width: calc(${({ theme }) => theme.pgWidth} - 370px);
        padding: 24px 0;
        display: flex;
        gap: 16px;
        > p.big {
          font: 400 16px/24px ${({ theme }) => theme.noto};
          letter-spacing: -0.32px;
          color: #333333;
          &.blue {
            color: ${({ theme }) => theme.highlightColor};
          }
        }
        > div {
          padding-right: ${px2vw(74)};

          > p {
            font: 400 16px/24px ${({ theme }) => theme.noto};
            letter-spacing: -0.32px;
            color: #333;
            margin-bottom: 8px;
          }
          > span {
            font: 400 14px/20px ${({ theme }) => theme.noto};
            color: #9d9d9d;
          }
        }
      }
    }
  }
  @media (max-width: 1604) {
    > ul > li:nth-of-type(4) {
      > span {
        left: ${px2vw(32)};
      }
    }
  }
  @media (max-width: 1376px) {
    > ul > li {
      &:nth-of-type(1) {
        font: 400 12px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(2) {
        font: 500 12px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        font: 500 12px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(4) {
        font: 400 12px ${({ theme }) => theme.noto};
      }
    }
    > div.content {
      > div > div {
        margin-left: 214px;
        width: calc(${({ theme }) => theme.pgWidth} - 314px);
        > div > p {
          font: 400 12px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 1242px) {
    > ul > li {
      &:nth-of-type(1) {
        font: 400 10px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(2) {
        font: 500 10px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        font: 500 10px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(4) {
        font: 400 10px ${({ theme }) => theme.noto};
        > span {
          right: 12px;
        }
      }
    }
    > div.content {
      > div > div {
        margin-left: 176px;
        width: calc(${({ theme }) => theme.pgWidth} - 252px);
        > div > p {
          font: 400 12px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 762px) {
    > ul > li {
      &:nth-of-type(1) {
        font: 400 10px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(2) {
        font: 500 10px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(3) {
        font: 500 10px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(4) {
        font: 400 10px ${({ theme }) => theme.noto};
        > span {
          right: 12px;
        }
      }
    }
    > div.content {
      > div > div {
        margin-left: 136px;

        width: calc(90vw - 214px);
        > div > p {
          font: 400 10px ${({ theme }) => theme.noto};
        }
      }
    }
  }
`;

const MyAskRow = ({ data }) => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <Li open={open}>
      <ul>
        <li>{data.id}</li>
        <li>{data.type}</li>
        <li onClick={() => setOpen((prev) => !prev)}>
          {data.title ? data.title : null}
        </li>
        <li
          className={data.answer ? 'done' : null}
          onClick={() => setOpen((prev) => !prev)}
        >
          {data.answer ? t("service.inquiry.history.answered") : t("service.inquiry.history.ing")}
          <span>
            <OpenMenuSvg />
          </span>
        </li>
      </ul>
      {open ? (
        <motion.div
          className="content"
          variants={FramerMotionAnimate[3]}
          initial="initial"
          animate="animate"
          transition="transition"
        >
          <div>
            <div>
              <p className="big">Q</p>
              <div>
                <p>{data.content}</p>
                <span>{data.createdDatetime.slice(0, 10)}</span>
              </div>
            </div>
          </div>
          {data.answer ? (
            <div>
              <div>
                <p className="big blue">A</p>
                <div>
                  <p>{data.answer}</p>{' '}
                  <span>{data.answeredDatetime.slice(0, 10)}</span>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </Li>
  );
};

export default MyAskRow;
