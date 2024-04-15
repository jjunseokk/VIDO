import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Footer from '../Components/Footer';
import RecommendedArt from './components/RecommendedArt';
import TaggedArt from './components/TaggedArt';
import EditorPick from './components/EditorPick';
import ArtList from './components/ArtList';
import ShowMore from './components/ShowMore';
import Title from '../MainPage/components/TitleStyle';
import styled from 'styled-components';
import MainArt from './components/MainArt';
import MediaArt from './components/MediaArt';
import { Link } from 'react-router-dom';
import px2vw from '../util/px2vw';
import KaKaoBtn from '../Components/KaKaoBtn';

const Div = styled.div`
    background: ${({ mode }) => (mode == 'light' ? '#ffffff' : '#151515')};
  > .artList {
    height: calc(${px2vw(720)});
    /* margin-left: ${({ theme }) => theme.left}; */
    margin-top: 60px;
    margin-bottom: 60px;
    position: relative;
    width: ${({ theme }) => theme.pgWidth};

    > ul {
      display: flex;
      /* position: absolute;
      right: -10%;
      top: 60px; */
      gap: 24px;
      font: 400 14px/20px ${({ theme }) => theme.noto};
      letter-spacing: -0.35px;

      > li {
        cursor: pointer;
        /* color: #151515; */
        color: ${({ mode }) => (mode == 'light' ? '#151515' : '#c1c1c1')};
        margin-top: 5px;
      }
      > p {
        width: 80px;
        height: 32px;
        border: 1px solid #9D9D9D;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color : ${({ mode }) => (mode == 'light' ? '#002e85' : '#ffff')};
      }
      > li.selected {
        cursor: default;
        color: ${({ theme }) => theme.highlightColor};
      }
    }
  }
  @media screen and (max-width: 1206px) {
    > .artList {
      height: calc(${px2vw(850)});
    > ul {
     
      right: -5%;
      gap: 15px;
    }
  }
  @media screen and (max-width: 998px) {
    > .artList {
    height: ${px2vw(870)};
    margin-bottom: 40px;
    }
  }
  @media screen and (max-width: 824px) {
    > .artList {
      height: calc(${px2vw(1100)});
    }
  }
}
`;

const ArtMainPage = ({ mode }) => {
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState('id');
  return (
    <Div mode={mode}>
      {/* <KaKaoBtn /> */}
      <div className="recommend">
        {/* <RecommendedArt mode={mode} orderBy={orderBy} setOrderBy={setOrderBy} /> */}
      </div>
      <div className="artList">
        {/* <Title mode={mode}>{t("media_art.all.title")}</Title>
        <ul>
          <li
            onClick={() => setOrderBy('id')}
            className={orderBy == 'id' ? 'selected' : null}
          >
            {t("media_art.all.order.new")}
          </li>
          <li
            onClick={() => setOrderBy('top')}
            className={orderBy == 'top' ? 'selected' : null}
          >
            {t("media_art.all.order.top")}
          </li>
          <p><Link to={`/media-art/total/id/1`}>더보기</Link></p>
        </ul> */}
        {/* <MainArt orderBy={orderBy} /> */}
        <MediaArt mode={mode} orderBy={orderBy} />
      </div>
      {/* <ShowMore to={'/media-art/total/id/1'} /> */}
      <div className="tagged">
        <TaggedArt mode={mode} page={1} slice={true} />
      </div>
      {/* <ShowMore to={`/media-art/tag`} idx={true} /> */}
      <div className="editorPick">
        <EditorPick mode={mode} />
      </div>
      <Footer mode={mode} />
    </Div>
  );
};

export default ArtMainPage;
