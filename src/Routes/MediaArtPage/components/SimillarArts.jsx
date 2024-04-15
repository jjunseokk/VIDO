import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import ChartElement from '../../Components/ChartElement';
import { UserContext } from '../../ContextProvider';
import { getSimillarArt } from '../../util/axiosGet';
import styles from './SimillarArts.module.scss';
import { useTranslation } from "react-i18next";
import MediaList from '../../Components/MediaList';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';
import { Link } from 'react-router-dom';


const Div = styled.div`
    margin-top: 60px;
    div.title{
      display: flex;
      justify-content: space-between;
      align-items: center;

      >h1 {
        font: 500 28px/29px 'Noto Sans KR', sans-serif;
        color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffff')};
        margin-bottom: 16px;
      }
      >div{
        display: flex;
        justify-content: center;
        align-items: center;
        >p{
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
          margin-right: 13px;
        }
        >div{
          >button{
            &:first-of-type{
              img{
                margin-right: 7px;
              }
            }
          }
        }
      }
    }
    
    .dataArea{
        width: calc(100vw - ${px2vw(320)});
        position: relative;
        > div.cover {
        width: ${({ theme }) => theme.left};
        background-color: ${({ mode }) => (mode == 'light' ? '#ffff' : '#151515')};
        height: ${px2vw(310)};
        position: absolute;
        top: 0;
        z-index: 10;
        &:nth-of-type(1) {
        left: -${({ theme }) => theme.left};
        }
        &:nth-of-type(2) {
        right: 0px;
        }
      }
    }
   

  ul {
    display: flex;
    gap: 0 ${px2vw(20)};
    justify-content: space-between;
    animation: slideIn 1.2s ease-in-out;
    transform: translateX(-${({ scroll }) => scroll * 20.15}%);
    transition: ${({ theme }) => theme.transition};
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
`

const SimillarArts = ({ id, mode }) => {
  const { t } = useTranslation();
  const { data, status } = useQuery('simillarArt', () => getSimillarArt(id));
  const { serverAddress } = useContext(UserContext);


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
        } else if (scroll == data?.length - 5) {
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

  if (status == 'success')
    return (
      <Div mode={mode} scroll={scroll}
        style={{ width: data.length < 5 ? `${data.length * 20}%` : `100%` }}
      >
        {data ? (
          <>
            <div className='title'>
              <h1 mode={mode} >{t("media_art.detail.similar")}</h1>
              <div>
                {/* <p><Link to={`/m~edia-art/total/id/1`}>{t("media_art.more")}</Link></p> */}
                <div>
                  <button disabled={visibilityL == 'hidden' ? true : false}>
                    <img onClick={() => { buttonClick('left') }} src={mode == 'light' ? visibilityL == 'hidden' ? '/img/prevBtn_off_light.svg' : '/img/prevBtn_on_light.svg' : visibilityL == 'hidden' ? '/img/prevBtn_off.svg' : '/img/prevBtn_on.svg'} />
                  </button>
                  <button disabled={visibilityR == 'hidden' ? true : false}>
                    <img onClick={() => { buttonClick('right') }} src={mode == 'light' ? visibilityR == 'hidden' ? '/img/nextBtn_off_light.svg' : '/img/nextBtn_on_light.svg' : visibilityR == 'hidden' ? '/img/nextBtn_off.svg' : '/img/nextBtn_on.svg'} />
                  </button>
                </div>
              </div>
            </div>

            <div className='dataArea'>
              <div className="cover"></div>
              <div className="cover"></div>
              <ul>
                {Array.isArray(data)
                  ? data.map((value) => (
                    <li key={value.id}>
                      <ChartElement
                        imgsrc={serverAddress + value.thumbnailPath}
                        title={value.title}
                        id={value.id}
                        author={value.authorName}
                        profImg={
                          value.authorProfilePath
                            ? serverAddress + value.authorProfilePath
                            : '/img/author-img.png'
                        }
                        authorId={value.authorId}
                        mode={mode}
                      />
                    </li>
                  ))
                  : null}
              </ul>
            </div>

          </>
        ) : null}
      </Div>
    );
};

export default SimillarArts;
