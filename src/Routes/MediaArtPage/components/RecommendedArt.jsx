import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { getSuggestedArt, getTagList } from '../../util/axiosGet';
import MediaList from '../../Components/MediaList';
import Title from '../../MainPage/components/TitleStyle';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { errorState } from '../../util/recoilState';
import px2vw from '../../util/px2vw';

const Div = styled.div`
  height: ${px2vw(420)};
  width: 100vw;
  background-color: ${({ mode }) => { mode == 'light' ? '#ffffff' : '#151515' }};
  padding-top: 50px;
  > div.titleArea{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: ${({ theme }) => theme.left};
    margin-right: ${({ theme }) => theme.left};
    > p {
    margin-bottom: 20px;
    }
    .pageBtn{
      >button{
        &:first-of-type{
          >img{
              margin-right: 7px;
          }
        }
      }
    }
  }


  > div {
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

const RecommendedArt = ({ mode }) => {
  const { t } = useTranslation();
  const { data, status } = useQuery('recommended', getSuggestedArt);
  const setError = useSetRecoilState(errorState);
  if (status === 'error') {
    setError({ errorMessage: '태그별 미디어 아트', popup: true });
  }


  const [getPage, setGetPage] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const handlePageChange = (page) => {
    if (page <= 0 || page > data.length) {
      setDisabled(true);
    } else {
      setGetPage(page);
    }
  }

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
        } else if (scroll == 5) {
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
  console.log(data)

  return (
    <Div mode={mode}>
      <div className='titleArea'>
        <Title mode={mode}>{t("media_art.editor_pick")}</Title>
        <div className='pageBtn'>
          <button disabled={visibilityL == 'hidden' ? true : false}>
            <img onClick={() => { buttonClick('left') }} src={mode == 'light' ? visibilityL == 'hidden' ? '/img/prevBtn_off_light.svg' : '/img/prevBtn_on_light.svg' : visibilityL == 'hidden' ? '/img/prevBtn_off.svg' : '/img/prevBtn_on.svg'} />
          </button>
          <button disabled={visibilityR == 'hidden' ? true : false}>
            <img onClick={() => { buttonClick('right') }} src={mode == 'light' ? visibilityR == 'hidden' ? '/img/nextBtn_off_light.svg' : '/img/nextBtn_on_light.svg' : visibilityR == 'hidden' ? '/img/nextBtn_off.svg' : '/img/nextBtn_on.svg'} />
          </button>

        </div>
      </div>
      <div>
        {status === 'success' && data ? (
          <MediaList mode={mode} dataList={data} cover={'#f8f8f8'} direction={scroll} page="recommended" />
        ) : null}
      </div>
    </Div>
  );
};

export default RecommendedArt;
