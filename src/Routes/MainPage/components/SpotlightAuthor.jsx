import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AxiosConfig from '../../../AxiosConfig';
import px2vw from '../../util/px2vw';
import AuthorMarquee from '../../AuthorPage/components/AuthorMarquee';
import AuthorUl from '../../AuthorPage/components/AuthorUl';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const Div = styled(motion.div)`
  padding: 0 ${({ theme }) => theme.left};
  padding-top: 50px;
  background-color: ${({ mode }) => { mode == 'light' ? '#ffffff' : '#151515' }};
  position: relative;
  min-height: ${px2vw(420)};
  overflow: hidden;
  > h2 {
    background-color: ${({ mode }) => { mode == 'light' ? '#151515' : '#ffff' }};
    font: 700 22px/32.56px ${({ theme }) => theme.noto};
    margin-bottom: 30px;
    letter-spacing: -0.44px;
  }
  >div{
    position: relative;
    button{
      position: absolute;
      z-index: 10;
      top: 50%;
      left: -2%;
      transform: translate(-2%, -50%);
      >img{
        filter: drop-shadow(3px 3px 3px #00000029);
      }
      &:last-of-type{
        left: calc(${({ theme }) => theme.pgWidth} - 10px);
        transform: translate(1%, -50%);
      }
    }
  }

  @media (max-width: 1648px) {
    height: ${px2vw(460)};
  }
  @media (max-width: 1252px) {
    height: ${px2vw(500)};
  }
  @media (max-width: 998px) {
    height: ${px2vw(550)};
  }
  @media (max-width: 838px) {
    height: 300px;
    >div{
    button{
      img{
        width: 35px;
      }
    }
  }
  }
  @media (max-width: 674px) {
    height: 300px;
  }
`;
// 오늘의 추천 아티스트
const SpotlightAuthor = ({ mode }) => {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [visibilityL, setVisibilityL] = useState('hidden');
  const [visibilityR, setVisibilityR] = useState('visible');

  const buttonClick = (direction) => {
    switch (direction) {
      case 'right': {
        setScroll((scroll) => ++scroll);
        if (scroll < 2) {
          setVisibilityL('visible');
          setVisibilityR('visible');
        } else if (scroll == list.length - 6) {
          setVisibilityR('hidden');
        }
        return;
      }
      case 'left': {
        setScroll((scroll) => --scroll);
        if (scroll > 1) {
          setVisibilityL('visible');
          setVisibilityR('visible');
        } else if (scroll == 1) {
          setVisibilityL('hidden');
        }
        return;
      }
    }
  };

  const getList = () => {
    AxiosConfig.get(`/author/top10`).then((res) =>
      setList(res.data.result)
    );
  };


  useEffect(() => getList(), []);
  return (
    <Div mode={mode} >
      <h2>{t("main.spotlight.title")}</h2>
      <div>
        <button
          style={{ visibility: visibilityL }}
          onClick={() => buttonClick('left')}
        >
          <img
            src={
              mode == 'light'
                ? '/img/cir_left.svg'
                : '/img/arrow-left-dark.svg'
            }
          ></img>
        </button>
        <AuthorMarquee gap={90} data={list} mode={mode} scroll={scroll} />
        <button
          style={{ visibility: visibilityR }}
          onClick={() => buttonClick('right')}
        >
          <img
            src={
              mode == 'light'
                ? '/img/cir_right.svg'
                : '/img/arrow-right-dark.svg'
            }
          ></img>
        </button>
      </div>

    </Div>
  );
};

export default SpotlightAuthor;
