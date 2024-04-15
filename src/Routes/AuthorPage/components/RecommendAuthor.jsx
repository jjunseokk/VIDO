import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AxiosConfig from '../../../AxiosConfig';
import px2vw from '../../util/px2vw';
import AuthorMarquee from './AuthorMarquee';
import AuthorUl from './AuthorUl';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const Div = styled(motion.div)`
  padding: 0 ${({ theme }) => theme.left};
  padding-top: 50px;
  background-color: ${({ mode }) => { mode == 'light' ? '#ffffff' : '#151515' }};
  position: relative;
  min-height: ${px2vw(420)};
  overflow: hidden;
  >div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h2 {
      background-color: ${({ mode }) => { mode == 'light' ? '#151515' : '#ffff' }};
      font: 700 22px/32.56px ${({ theme }) => theme.noto};
      margin-bottom: 30px;
      letter-spacing: -0.44px;
    }
    >div{
      button{
        &:first-of-type{
          margin-right: 7px;
        }
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
  }
  @media (max-width: 674px) {
    height: 300px;
  }
`;
// 오늘의 추천 아티스트
const RecommendAuthor = ({ mode }) => {
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [visibilityL, setVisibilityL] = useState('hidden');
  const [visibilityR, setVisibilityR] = useState('visible');

  const buttonClick = (direction) => {
    switch (direction) {
      case 'right': {
        setScroll((scroll) => ++scroll);
        if (scroll < 4) {
          setVisibilityL('visible');
          setVisibilityR('visible');
        } else if (scroll == 4) {
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
    AxiosConfig.get(`/author/recommended`).then((res) =>
      setList(res.data.result)
    );
  };

  useEffect(() => getList(), []);
  return (
    <Div mode={mode}>
      <div className='titleArea'>
        <h2>{t("author.recommend")}</h2>
        <div>
          <button
            onClick={() => buttonClick('left')}
            disabled={visibilityL == 'hidden' ? true : false}
          >
            <img
              src={
                mode == 'light' ? visibilityL == 'hidden' ? '/img/prevBtn_off_light.svg' : '/img/prevBtn_on_light.svg' : visibilityL == 'hidden' ? '/img/prevBtn_off.svg' : '/img/prevBtn_on.svg'
              }
            ></img>
          </button>
          <button
            disabled={visibilityR == 'hidden' ? true : false}
            onClick={() => buttonClick('right')}
          >
            <img
              src={
                mode == 'light' ? visibilityR == 'hidden' ? '/img/nextBtn_off_light.svg' : '/img/nextBtn_on_light.svg' : visibilityR == 'hidden' ? '/img/nextBtn_off.svg' : '/img/nextBtn_on.svg'
              }
            ></img>
          </button>
        </div>
      </div>

      <AuthorMarquee gap={70} data={list} mode={mode} scroll={scroll} />
    </Div>
  );
};

export default RecommendAuthor;
