import React, { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getAuthorDetail } from '../../util/axiosGet';
import MediaList from '../../Components/MediaList';
import ChartElement from '../../Components/ChartElement';
import { UserContext } from '../../ContextProvider';
import px2vw from '../../util/px2vw';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const Div = styled.div`
  margin-top: 64px;
  margin-bottom: 120px;
  div.title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > p {
      color:  ${({ mode }) => (mode == 'light' ? '#151515' : '#ffffff')};
      font: 500 28px/29px ${({ theme }) => theme.noto};
      margin-bottom: 20px;
    }
    >div{
      display: flex;
      align-Items: 'center';
      >p{
        width: 61px;
        height: 24px;
        margin-right: 20px;
        border: 1px solid #707070;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color : #707070;
        font: 400 12px ${({ theme }) => theme.noto};
      }
      >button{
        &:first-of-type{
          margin-right: 7px;
        }
      }
    }
  }

  > div {
    position: relative;
    /* left: -${({ theme }) => theme.left}; */
    width: calc(100vw - ${({ theme }) => theme.left});
    > img {
      width: 40px;
      position: absolute;
      border-radius: 100%;
      box-shadow: 3px 3px 3px #00000029;
      cursor: pointer;
      z-index: 20;
      top: calc(${px2vw(80)} - 20px);
      &.left {
        left: -20px;
      }
      &.right {
        right: calc(${({ theme }) => theme.left} - 20px);
      }
    }
    > div.cover {
      width: ${({ theme }) => theme.left};
      background-color: ${({ mode }) => (mode == 'light' ? '#ffff' : '#151515')};
      height: ${px2vw(260)};
      position: absolute;
      top: 0;
      z-index: 10;
      &:nth-of-type(1) {
        left: -${({ theme }) => theme.left};
      }
      &:nth-of-type(2) {
        right: 0;
      }
    }
    > ul {
      display: flex;
      position: relative;
      gap: 0 ${px2vw(20)};
      animation: slideIn 1.2s ease-in-out;
      transform: translateX(-${({ scroll }) => scroll * 20.15}%);
      transition: ${({ theme }) => theme.transition};
    }
  }

  @keyframes slideIn {
    from {
      left: -150%;
      opacity: 0;
    }
    to {
      left: 0;
      opacity: 1;
    }
  }
`;

const AuthorOther = ({ authorId, mode }) => {
  const { t } = useTranslation();
  const { data, status } = useQuery('authorArt', () =>
    getAuthorDetail(authorId)
  );
  const { serverAddress } = useContext(UserContext);

  const [scroll, setScroll] = useState(0);
  const [visibilityL, setVisibilityL] = useState('hidden');
  const [visibilityR, setVisibilityR] = useState('visible');

  const buttonClick = (direction) => {
    switch (direction) {
      case 'right': {
        setScroll((scroll) => ++scroll);
        setVisibilityL('visible');
        setVisibilityR('visible');
        if (scroll == data?.mediaArtList.length - 5) {
          setVisibilityR('hidden');
        }
        return;
      }
      case 'left': {
        setScroll((scroll) => --scroll);
        setVisibilityL('visible');
        setVisibilityR('visible');
        if (scroll == 1) {
          setVisibilityL('hidden');
        }
        return;
      }
    }
  };


  if (status == 'success' && data.mediaArtList)
    return (
      <Div scroll={scroll} mode={mode} >
        <div className='title'>
          <p>{t("media_art.detail.same")}</p>


          <div >
            {data.mediaArtList.length > 4 ? <p><Link to={`/author/detail/${data?.id}`}>{t("media_art.more")}</Link></p> : null}
            <button
              onClick={() => buttonClick('left')}
              disabled={data.mediaArtList.length > 4 ? visibilityL == 'hidden' ? true : false : true}
            >
              <img
                src={
                  data.mediaArtList.length > 4 ? mode == 'light' ? visibilityL == 'hidden' ? '/img/prevBtn_off_light.svg' : '/img/prevBtn_on_light.svg' : visibilityL == 'hidden' ? '/img/prevBtn_off.svg' : '/img/prevBtn_on.svg' : null
                }
              ></img>
            </button>
            <button
              disabled={data.mediaArtList.length > 4 ? visibilityR == 'hidden' ? true : false : true}
              onClick={() => buttonClick('right')}
            >
              <img
                src={
                  data.mediaArtList.length > 4 ? mode == 'light' ? visibilityR == 'hidden' ? '/img/nextBtn_off_light.svg' : '/img/nextBtn_on_light.svg' : visibilityR == 'hidden' ? '/img/nextBtn_off.svg' : '/img/nextBtn_on.svg' : null
                }
              ></img>
            </button>
          </div>


        </div>
        <div>

          <div className="cover"></div>
          <div className="cover"></div>
          <ul>
            {Array.isArray(data.mediaArtList)
              ? data.mediaArtList.map((value) => (
                <li key={value.id}>
                  <ChartElement
                    imgsrc={serverAddress + value.thumbnailPath}
                    title={value.title}
                    id={value.id}
                    mode={mode}
                  />
                </li>
              ))
              : null}
          </ul>
        </div>
      </Div>
    );
};

export default AuthorOther;
