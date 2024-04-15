import styled from 'styled-components';
import { motion } from 'framer-motion';

export const InfoRegisterStyle = styled(motion.div)`
  ul.info {
    > li {
      position: relative;
      > div {
        position: relative;
        width: 360px;
        height: 32px;
      }
      &:not(:last-of-type) {
        margin-bottom: 24px;
      }
      p {
        margin-bottom: 4px;
        font: 500 12px/18px ${({ theme }) => theme.noto};
        color: #151515;
        letter-spacing: -0.24px;
      }
      span {
        width: 500px;
        z-index: 10;
        left: 0;
        display: inline-block;
        letter-spacing: -0.16px;
        color: ${({ theme }) => theme.highlightColor};
        font: 400 11px/17px ${({ theme }) => theme.noto};
        line-height: 12px;
        &.avail {
          color: #151515;
        }
        // &:nth-of-type(2) {
        //   top: 102px;
        // }
      }
      input {
        &:nth-of-type(2) {
          margin-top: 16px;
        }
      }
      div.email {
        display: flex;
        position: relative;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-family: ${({ theme }) => theme.noto};
        border: none;
        border-bottom: #e0e0e0 1px solid;
        position: relative;
        > input {
          padding: 0 ${({ padding }) => padding}px;
          width: 132px;
          height: 32px;
          border: none;
          position: relative;
          border-bottom: #e0e0e0 1px solid;
          color: #151515;
          transition: ${({ theme }) => theme.transition};
          font: 400 14px/20px ${({ theme }) => theme.noto};
          &::placeholder {
            font: 400 14px/20px ${({ theme }) => theme.noto};
            color: #c1c1c1;
          }
          &:focus {
            outline: none;
            border: none;
            border-bottom: 1px solid ${({ theme }) => theme.highlightColor};
            background: none;
          }
        }
        > p {
          margin-top: 6px;
          font: 400 14px/20px ${({ theme }) => theme.noto};
          color: #707070;
        }

        .customEmail {
          padding: 0 4px;
          width: 128px;
          height: 32px;
          border: none;
          position: absolute;
          top: 0;
          right: 0;
          border-bottom: #e0e0e0 1px solid;
          color: #151515;
          transition: ${({ theme }) => theme.transition};
          font: 400 14px/20px ${({ theme }) => theme.noto};
          &::placeholder {
            font: 400 14px/20px ${({ theme }) => theme.noto};
            color: #c1c1c1;
          }
          &:focus {
            outline: none;
            border: none;
            border-bottom: 1px solid ${({ theme }) => theme.highlightColor};
            background: #fff;
          }
        }
        > div {
          position: relative;
          > div {
            height: 30px;
            line-height: 30px;
            width: 128px;
            border: none;
            background: #fff;
            color: #707070;
            text-align: center;
            font: 400 14px/34px ${({ theme }) => theme.noto};
            cursor: pointer;
            overflow: hidden;
            padding-right: 4px;
            > div {
              position: absolute;
              right: 0;
              top: 0;
              width: 12px;
              height: 30px;
              cursor: pointer;
              background-color: #fff;
              svg {
                position: absolute;
                right: 0;
                top: 12px;
                z-index: 100;
                display: block;
                width: 12px;
                height: 12px;
              }
            }
          }
          > ul {
            width: 128px;
            height: fit-content;
            position: absolute;
            top: 30px;
            left: 0;
            z-index: 100;
            background-color: #fff;
            display: block;
            box-shadow: 0px 3px 6px #00000029;
            opacity: 1;
            > li {
              margin: 0;
              padding: 0;
              display: block;
              background-color: #fff;
              position: relative;
              height: 30px;
              width: 128px;
              font: 400 14px/30px ${({ theme }) => theme.noto};
              text-align: center;
              cursor: pointer;
              color: #707070;
              transition: all 0.2s;
              &:hover {
                color: ${({ theme }) => theme.highlightColor};
                background-color: #e0e0e0;
              }
            }
          }
          > input {
            position: absolute;
            z-index: 20;
            width: 96px;
            top: 0;
          }
        }
      }
      &:last-of-type {
        margin-bottom: 32px;
        button {
          &:nth-of-type(2) {
            position: absolute;
            top: 72px;
          }
        }
      }
    }
  }
  > button {
    width: 360px;
  }
`;
