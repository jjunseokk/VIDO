import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { getMediaArts } from '../../util/axiosGet';
import MediaList from '../../Components/MediaList';
import Title from '../../MainPage/components/TitleStyle';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { errorState } from '../../util/recoilState';
import px2vw from '../../util/px2vw';
import { Link } from 'react-router-dom';

import nextBtn_on from '../../../../img/nextBtn_on.svg';
import nextBtn_off from '../../../../img/nextBtn_off.svg';
import prevBtn_on from '../../../../img/prevBtn_on.svg';
import prevBtn_off from '../../../../img/prevBtn_off.svg';
import NewMediaList from '../../Components/NewMediaList';

const Div = styled.div`
  height: ${px2vw(720)};
  width: 100vw;
  background: ${({ mode }) => (mode == 'light' ? '#ffffff' : '#151515')};
  > div.titleArea{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: ${({ theme }) => theme.left};
    margin-right: ${({ theme }) => theme.left};
    >div{
      display: flex;
      align-items: center;
      > ul {
        display: flex;
        align-items: center;
        margin-right: 20px;
        gap: 24px;
        font: 400 14px/20px ${({ theme }) => theme.noto};
        letter-spacing: -0.35px;

        > li {
          cursor: pointer;
          /* color: #151515; */
          color: ${({ mode }) => (mode == 'light' ? '#151515' : '#c1c1c1')};
          padding-bottom: 2px;
        }
        > p {
          width: 61px;
          height: 24px;
          border: 1px solid #9D9D9D;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color : ${({ mode }) => (mode == 'light' ? '#707070' : '#ffff')};
          font: normal normal normal 12px/17.76px Noto Sans CJK KR;
        }
        > li.selected {
          cursor: default;
          color: ${({ theme }) => theme.highlightColor};
        }
      }
    }
    .pageBtn{
      display: flex;
      align-items: center;
      >button{
        img{
          padding-top: 5px;
        }
        &:first-of-type{
          >img{
              margin-right: 7px;
          }
        }
      }
    }
    > p {
    /* padding-top: 50px; */
    margin-bottom: 20px;
  }
  }

  @media (max-width: 1648px) {
    height: ${px2vw(740)};
  }
  @media (max-width: 1252px) {
    height: ${px2vw(850)};
  }
  @media (max-width: 998px) {
    height: ${px2vw(870)};
  }
  @media (max-width: 838px) {
    /* height: 300px; */
    height: ${px2vw(900)};
  }
  @media (max-width: 674px) {
    /* height: 300px; */
    height: ${px2vw(1100)};
  }
`;

const MediaArt = ({ page = 1, mode, }) => {
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState('top');
  const [getPage, setGetPage] = useState(1);

  const { data, status } = useQuery(`mediaList${getPage}${orderBy}`, () =>
    getMediaArts(getPage, orderBy),
  );
 
  const setError = useSetRecoilState(errorState);
  if (status === 'error') {
    setError({ errorMessage: '태그별 미디어 아트', popup: true });
  }


  let newData = data?.data?.slice(0,8);

  const [scroll, setScroll] = useState(0);
  const [visibilityL, setVisibilityL] = useState('hidden');
  const [visibilityR, setVisibilityR] = useState('visible');

  const buttonClick = (direction) => {
    switch (direction) {
      case 'right': {
        setGetPage((getPage) => ++getPage);
        if (getPage < 4) {
          setVisibilityL('visible');
          setVisibilityR('visible');
        } else if (getPage == data.totalPage-1) {
          setVisibilityR('hidden');
        }
        return;
      }
      case 'left': {
        setGetPage((getPage) => --getPage);
        if (getPage > 2) {
          setVisibilityL('visible');
          setVisibilityR('visible');
        } else if (getPage == 2) {
          setVisibilityL('hidden');
        }
        return;
      }
    }
  };

  return (
    <Div mode={mode}>
      <div className='titleArea'>
        <Title mode={mode}>{t("media_art.all.title")}</Title>
        <div>
          <ul>
            <li
              onClick={() => setOrderBy('createdDatetime')}
              className={orderBy == 'createdDatetime' ? 'selected' : null}
            >
              {t("media_art.all.order.new")}
            </li>
            <li
              onClick={() => setOrderBy('top')}
              className={orderBy == 'top' ? 'selected' : null}
            >
              {t("media_art.all.order.top")}
            </li>
            <p><Link to={`/media-art/total/top/1`}>{t("media_art.more")}</Link></p>
          </ul>
          <div className='pageBtn'>
            <button disabled={visibilityL == 'hidden' ? true : false}>
              <img onClick={() => { buttonClick('left') }} src={mode == 'light' ? visibilityL == 'hidden' ? '/img/prevBtn_off_light.svg' : '/img/prevBtn_on_light.svg' : visibilityL == 'hidden' ? '/img/prevBtn_off.svg' : '/img/prevBtn_on.svg'} />
            </button>
            <button disabled={visibilityR == 'hidden' ? true : false}>
              <img onClick={() => { buttonClick('right') }} src={mode == 'light' ? visibilityR == 'hidden' ? '/img/nextBtn_off_light.svg' : '/img/nextBtn_on_light.svg' : visibilityR == 'hidden' ? '/img/nextBtn_off.svg' : '/img/nextBtn_on.svg'} />
            </button>
          </div>
        </div>

      </div>

      <div>
        {status === 'success'? (
          <NewMediaList mode={mode} dataList={newData} direction={scroll} />
        ) : null}
        {/* {status === 'success' && data ? (
          <MediaList mode={mode} dataList={data.media_art} direction={scroll} page="recommended" />
        ) : null} */}
      </div>
    </Div>
  );
};

export default MediaArt;
