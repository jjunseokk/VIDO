import React from 'react';
import styled from 'styled-components';
import px2vwMobile from '../../util/px2vwMobile';
import { motion } from 'framer-motion';
import { up } from '../../util/Framer';
const Div = styled(motion.div)`
  position: relative;
  margin-bottom: ${({ img }) =>
    img == '3' ? px2vwMobile(140) : px2vwMobile(160)};
  > div {
    &:nth-of-type(1) {
      display: flex;
      gap: ${px2vwMobile(60)};
      margin-bottom: ${px2vwMobile(40)};
      align-items: center;
      > img {
        position: relative;
        width: ${px2vwMobile(200)};
        height: ${px2vwMobile(200)};
        display: block;
      }
      h2 {
        font: 700 20px/1.3 ${({ theme }) => theme.noto};
        letter-spacing: -0.4px;
      }
    }
  }
  p {
    color: #707070;
    word-break: keep-all;
  }
  span {
    white-space: pre-wrap;
    word-break: keep-all;
    font: 400 8px/1.5 ${({ theme }) => theme.noto};
    letter-spacing: -0.16px;
    position: absolute;
    width: ${px2vwMobile(840)};
    left: ${px2vwMobile(20)};
    transform: scale(0.8);
    transform-origin: left;
  }
  @media only screen and (min-width: 300px) {
    p {
      font: 500 16px/1.2 ${({ theme }) => theme.noto};
    }
  }
  @media only screen and (max-width: 300px) {
    p {
      font: 500 12px/1.2 ${({ theme }) => theme.noto};
    }
  }
`;

const MobileCollector = ({ img, title, content, contentsmall }) => {
  return (
    <Div variants={up.item} img={img}>
      <div>
        <img src={`/img/MobileCollector${img}.png`} />
        <h2 className="blue">{title}</h2>
      </div>
      <div>
        <p>{content}</p>
      </div>
    </Div>
  );
};

export default MobileCollector;
