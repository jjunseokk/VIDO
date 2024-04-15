import React from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import { motion } from 'framer-motion';

const Bulletin = styled(motion.ul)`
  width: ${({ theme }) => theme.pgWidth};
  position: relative;
  left: ${({ theme }) => theme.left};
  margin-bottom: 40px;
  > li.head {
    font: 500 16px/40px ${({ theme }) => theme.noto};
    color: #707070;
    border-top: 1px solid #d5d5d5;
    border-bottom: 1px solid #d5d5d5;
    > ul {
      display: flex;
      width: ${px2vw(1280)};
      > li {
        &:nth-of-type(1) {
          text-align: center;
          width: ${px2vw(94)};
        }
        &:nth-of-type(2) {
          width: ${px2vw(226)};
          padding-left: ${px2vw(32)};
        }
        &:nth-of-type(3) {
        }
      }
    }
  }
  > li:last-of-type {
    border-bottom: 1px solid #d5d5d5;
  }
  @media (max-width: 1376px) {
    > li.head {
      font: 500 14px/32px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 1242px) {
    > li.head {
      font: 500 12px/32px ${({ theme }) => theme.noto};
      > ul {
        > li {
          &:nth-of-type(1) {
            width: ${px2vw(84)};
          }
          &:nth-of-type(2) {
            width: ${px2vw(362)};
          }
          &:nth-of-type(3) {
            width: ${px2vw(880)};
          }
        }
      }
    }
  }
  @media (max-width: 762px) {
    width: 90vw;
    left: 5vw;
  }
  @media (max-width: 540px) {
    > li.head {
      font: 500 10px/32px ${({ theme }) => theme.noto};
      > ul {
        > li {
          &:nth-of-type(1) {
            width: ${px2vw(84)};
          }
          &:nth-of-type(2) {
            width: ${px2vw(362)};
          }
          &:nth-of-type(3) {
            width: ${px2vw(880)};
          }
        }
      }
    }
  }
`;

export default Bulletin;
