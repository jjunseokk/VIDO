import React from 'react';
import { motion, useScroll } from 'framer-motion';
import styled from 'styled-components';

const Div = styled.div`
  white-space: pre-wrap;
  text-align: center;
  word-break: keep-all;
  > div {
    &:nth-of-type(1) {
      height: 220px;
      margin: 0 auto;
      position: relative;
      width: 220px;
      > img {
        &:nth-of-type(1) {
          height: 220px;
          display: block;

          width: 220px;
        }
        &:nth-of-type(2) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    &:nth-of-type(2) {
      margin-top: 36px;
      > h2 {
        font: 600 28px/40px ${({ theme }) => theme.noto};
        color: ${({ mode }) => (mode == 'light' ? "#151515" : "#ffffff")};
        margin-bottom: 16px;
      }
      > p {
        color: ${({ mode }) => (mode == 'light' ? "#151515" : "#dddddd")};;
        font: 400 20px/30px ${({ theme }) => theme.noto};
        &:nth-of-type(2) {
          margin-top: 16px;
          font-size: 14px;
          color: #707070;
          line-height: 18px;
        }
      }
    }
  }
`;

const Collector = ({
  title = '',
  img = '',
  content = '',
  contentsmall = '',
  mode
}) => {
  return (
    <Div mode={mode}>
      <div>
        <img src={`./img/collectorBg${img}.png`} />
        <motion.img
          initial={{ x: '-50%', y: 0, opacity: 0 }}
          whileInView={{ opacity: 1, x: '-50%', y: '-50%' }}
          src={`./img/collectorIcon${img}.png`}
          viewport={{ once: true }}
          transition={{ type: 'ease', duration: 1 }}
        />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
        {contentsmall ? <p>{contentsmall}</p> : null}
      </div>
    </Div>
  );
};

export default Collector;
