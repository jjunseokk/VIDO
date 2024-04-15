import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import Slider2 from './Slider2';
import vidoSlide from '../data/VidoSlide.json';
import mainSlide from '../data/mainSlide.json';
import { motion } from 'framer-motion';

const Div = styled(motion.div)`
  width: 100vw;
  height: 540px;
  position: relative;
  > div {
    position: relative;
    display: flex;
    width: 300vw;
    left: ${({ select }) => `${select * -100}vw`};
    transition: ${({ theme }) => theme.transition};
  }
  @media (max-width: 1482px) {
    height: 480px;
  }
  @media (max-width: 1072px) {
    height: 320px;
  }
  @media (max-width: 712px) {
    height: 240px;
  }
`;
const Select = styled.ul`
  position: absolute;
  display: flex;
  left: ${({ theme }) => theme.left};
  bottom: 0;
  > li {
    cursor: pointer;
    position: relative;
    z-index: 10;
    width: 160px;
    height: 40px;
    text-align: center;
    font: 500 16px/40px ${({ theme }) => theme.noto};
    color: #fff;
    letter-spacing: -0.16px;
    border: 1px solid #707070;
    transition: ${({ theme }) => theme.transition};
    &::before {
      transition: ${({ theme }) => theme.transition};
      z-index: -1;
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.8;
      background-color: #151515;
    }
    &.selected {
      color: #363636;
      &::before {
        background-color: #fff;
      }
    }
  }
  @media (max-width: 1482px) {
    > li {
      width: 120px;
      height: 32px;
      font: 500 14px/32px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 1072px) {
    > li {
      font: 500 14px/32px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 712px) {
    > li {
      font: 500 12px/32px ${({ theme }) => theme.noto};
    }
  }
`;

const SlideWrap = () => {
    const { t } = useTranslation();
  const [select, setSelect] = useState(0);
  return (
    <Div select={select} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>
        <Slider2
          slides={mainSlide}
          setSelect={setSelect}
          select={select}
          num={0}
          other={1}
        />
        <Slider2
          slides={vidoSlide}
          setSelect={setSelect}
          select={select}
          num={1}
          other={0}
        />
        {/* <Slider2
          slides={authorSlide}
          setSelect={setSelect}
          select={select}
          num={2}
          other={0}
        /> */}
      </div>
      <Select select={select}>
        <li
          onClick={() => setSelect(0)}
          className={select == 0 ? 'selected' : null}
        >
            {t("banner.guide")}
        </li>
        <li
          onClick={() => setSelect(1)}
          className={select == 1 ? 'selected' : null}
        >
            {t("banner.news")}
        </li>
        {/* <li
          onClick={() => setSelect(2)}
          className={select == 2 ? 'selected' : null}
        >
          콜렉터 소식
        </li> */}
      </Select>
    </Div>
  );
};

export default SlideWrap;
