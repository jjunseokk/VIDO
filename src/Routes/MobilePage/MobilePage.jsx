import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import px2vwMobile from '../util/px2vwMobile';
import Company from './components/Company';
import MobileArtist from './components/MobileArtist';
import MobileCollector from './components/MobileCollector';

const Div = styled.div`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .lightblue {
    color: #5c94ff;
  }
  .blue {
    color: ${({ theme }) => theme.highlightColor};
  }
  > header {
    width: 100vw;
    height: calc(708px / 3);
    background-image: url(/img/mobile-banner.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    margin-bottom: 60px;
    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #2b2b2b;
      opacity: 0.8;
    }
    > p {
      position: absolute;
      z-index: 10;
      font: 600 20px/1.5 ${({ theme }) => theme.noto};
      letter-spacing: -0.4px;
      color: #fff;
      text-align: center;
      width: 100%;
      top: calc(236px / 3);
      > span {
        color: #5c94ff;
      }
    }
  }
  > div > section > h1 {
    color: ${({ theme }) => theme.highlightColor};
    font: 600 33.3px/1.5 ${({ theme }) => theme.noto};
    letter-spacing: -0.65px;
  }
  > div {
    .section {
      padding: 0 ${px2vwMobile(80 / 3)};
      > p {
        font: 600 33.3px/1.5 ${({ theme }) => theme.noto};

        text-align: left;
        color: #2b2b2b;
        margin-bottom: 60px;
        letter-spacing: -0.4px;
        transform-origin: left;
      }
      > span.info {
        font: 400 16px/1.5 ${({ theme }) => theme.noto};
        letter-spacing: -0.32px;
        width: 100%;
        display: block;
        text-align: center;
        color: #9d9d9d;
        margin-bottom: 59.9px;
      }
      > section {
        div {
          h2 {
            font: 600 20px/1.5 ${({ theme }) => theme.noto};
            letter-spacing: -0.4px;
            white-space: pre-wrap;
          }
          p {
            &:nth-of-type(1) {
              letter-spacing: -0.32px;
              white-space: pre-wrap;
            }
            &:nth-of-type(2) {
              white-space: pre-wrap;
              font: 400 8px/1.5 ${({ theme }) => theme.noto};
              letter-spacing: -0.16px;
              color: #707070;
              transform: scale(0.8);
              transform-origin: left;
            }
          }
        }
      }
    }
    .company {
      margin-bottom: 60px;
      width: 100vw;
      height: 140px;
      color: #707070;
      background-color: #f8f8f8;
      > p {
        padding-top: 13.9px;
        letter-spacing: -0.24px;
        font: 600 14px/1.5 ${({ theme }) => theme.noto};
        margin-bottom: 13.19px;
        text-align: center;
        padding-left: ${px2vwMobile(40 / 3)};
      }
      img {
        height: ${px2vwMobile(192.34 / 3)};
        margin-right: 80px;
      }
      /* > div {
        display: flex;
        > img {
          width: auto;

          position: relative;
          object-fit: cover;
        }
        &:nth-of-type(1) {
          gap: 43.3px;
          margin: 0 ${px2vwMobile(80 / 3)};
          margin-bottom: 4.32px;
          position: relative;
          > img {
            &:nth-of-type(1) {
              height: ${px2vwMobile(9.8)};
              top: ${px2vwMobile(6.6)};
            }
            &:nth-of-type(2) {
              height: ${px2vwMobile(9.8)};
              top: ${px2vwMobile(6.6)};
            }
            &:nth-of-type(3) {
              height: ${px2vwMobile(10.5)};
              top: ${px2vwMobile(5.2)};
            }
            &:nth-of-type(4) {
              height: ${px2vwMobile(22.9)};
            }
          }
        }
        &:nth-of-type(2) {
          margin-left: ${px2vwMobile(215 / 3)};

          > img {
            &:nth-of-type(1) {
              height: ${px2vwMobile(24.9 / 3)};
              top: ${px2vwMobile(8.44 / 6)};
              margin-right: ${px2vwMobile(169.89 / 3)};
            }
            &:nth-of-type(2) {
              height: ${px2vwMobile(33.34 / 3)};
              margin-right: ${px2vwMobile(170.34 / 3)};
            }
            &:nth-of-type(3) {
              height: ${px2vwMobile(27.84 / 3)};
              top: ${px2vwMobile(5.44 / 6)};
            }
          }
        }
      } */
    }
    div.link {
      width: ${px2vwMobile(920 / 3)};
      height: max-content;
      margin-left: ${px2vwMobile(80 / 3)};
      box-shadow: ${({ theme }) => theme.boxShadow};
      padding: 20px ${px2vwMobile(40 / 3)};
      > h2 {
        color: #363636;
        text-align: center;
        font: 600 20px/1.5 ${({ theme }) => theme.noto};
        letter-spacing: -0.4px;
      }
      > div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        gap: 7px;
        margin-top: 14px;
        > img {
          width: ${px2vwMobile(68.39 / 3)};
          position: relative;
          top: 5px;
          height: ${px2vwMobile(51.29 / 3)};
        }
        > p {
          color: #2b2b2b;
          font: 500 16px/1.5 ${({ theme }) => theme.noto};
          letter-spacing: -0.14px;
        }
      }
      > p {
        text-align: center;
        &:nth-of-type(1) {
          font: 500 16px/1.5 ${({ theme }) => theme.noto};
          color: #9d9d9d;
          margin-top: ${px2vwMobile(95 / 3)};
        }
        /* &:nth-of-type(2) {
          font: 600 10px/1.5 ${({ theme }) => theme.noto};
          letter-spacing: -0.19px;
          margin-top: 3px;
          margin-bottom: 13px;
        }
        &:nth-of-type(3) {
          font: 500 8px/1.5 ${({ theme }) => theme.noto};
          transform: scale(0.8);
          transform-origin: center;
          letter-spacing: -0.2px;
          color: ${({ theme }) => theme.highlightColor};
        } */
      }
      > .btn {
        cursor: pointer;
        width: ${px2vwMobile(837 / 3)};
        text-align: center;
        height: 40px;
        margin: 0 auto;
        border-radius: 4px;
        background-color: #f7f7f7;
        margin-top: ${px2vwMobile(40 / 3)};
        > p {
          font: 500 16px/40px ${({ theme }) => theme.noto};
          letter-spacing: -0.32px;
          color: #363636;
        }
        &:nth-of-type(1) {
          color: ${({ theme }) => theme.highlightColor};
        }
      }
    }
  }
  > footer {
    margin-top: calc(160px / 3);
    width: 100vw;
    height: 133.3px;
    padding: 0 ${px2vwMobile(80 / 3)};
    border-top: 1px solid #707070;
    p {
      color: #707070;
    }
    > div {
      &:nth-of-type(1) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 ${px2vwMobile(40 / 3)};
        margin-bottom: 20px;
      }
      > img {
        display: block;
        height: ${px2vwMobile(82.41 / 3)};
        width: ${px2vwMobile(319.29 / 3)};
        margin: 0 auto;
        margin-top: calc(55px / 3);
      }
      > a {
        display: block;
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
      }
      > a > img {
        display: block;
        height: ${px2vwMobile(20)};
        margin-top: ${px2vwMobile(54.59 / 3)};
      }
      > p {
        position: relative;
        width: max-content;
        word-wrap: normal;
        line-break: strict;
        word-break: keep-all;
        display: block;
        font: 400 10px ${({ theme }) => theme.noto};
        letter-spacing: -0.8px;
        transform-origin: center;
        white-space: nowrap;
        transform: scale(0.78);
      }
    }
    > p {
      font: 400 10px/1.5 ${({ theme }) => theme.roboto};
      text-align: center;
      transform-origin: center;
      transform: scale(0.8);
      padding-bottom: 20px;
    }
  }
`;
const Collector = styled.section`
  display: flex;
  height: ${px2vwMobile(460 / 3)};

  margin-bottom: 14px;
  gap: ${px2vwMobile(40 / 3)};
  transition: ${({ theme }) => theme.transition};
  width: ${px2vwMobile(840 + (40 / 3) * 2)};
  position: relative;
  left: calc(
    -${(props) => px2vwMobile(props.position * (280 + 40 / 3))} + ${px2vwMobile(0)}
  );
`;

const MobilePage = () => {
  const [copied, setCopied] = useState(false);
  const [mail, setMail] = useState(false);
  const [collector, setCollector] = useState(0);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 55) {
      // do your stuff here for left swipe
      console.log(1);
      collector < 2 ? setCollector(() => collector + 1) : null;
    }

    if (touchStart - touchEnd < -55) {
      collector > 0 ? setCollector(() => collector - 1) : null;
      // do your stuff here for right swipe
    }
  }

  // useEffect(() => {
  //   handleTouchEnd();
  // }, [touchEnd]);
  const copyLink = () => {
    const link = 'https://vido.gallery/';
    navigator.clipboard.writeText(link);
    setCopied(true);
  };
  const copyMail = () => {
    const link = 'vidogallery@gmail.com';
    navigator.clipboard.writeText(link);
    setMail(true);
  };
  return (
    <Div>
      <header>
        <p>
          국내 최대 미디어아트 OTT 플랫폼
          <br />
          VIDO에서는
          <span className="lightblue">미디어아트</span>를<br />
          <span className="lightblue">구독</span>
          하고,
          <span className="lightblue"> 전시</span>할 수 있습니다.
        </p>
      </header>
      <div>
        <div className="section artist">
          <p>
            지금 VIDO
            <span className="blue">
              의<br />
              미디어 아티스트
            </span>
            가<br />
            된다면
          </p>
          <section>
            <MobileArtist
              img="1"
              title="작품 재생 수익 창출"
              content={
                '다양한 캔버스(전광판)에\n미디어아트를 전시하고\n수익을 창출해보세요'
              }
              // small={
              //   '* 작품의 재생횟수, 시간, 누적 플레이 횟수, 캔버스 사이즈 등을 바탕으로\n자동화 된 알고리즘을 통해 작가들의 작품 사용에 대한 정당한 사용료를 제공'
              // }
            />
            <MobileArtist
              img="2"
              title="홍보 마케팅 기회 부여"
              content={
                '홈페이지 및 레포트 등을\n통해 아티스트 홍보\n기회를 드립니다'
              }
              // small={'* 선정된 미디어 아티스트를 통해'}
            />
            <MobileArtist
              img="3"
              title={'회화 작품의\n미디어아트로 재탄생'}
              content={
                '일반 회화 작품을 기반으로\n미디어아트를 제작해\n드립니다'
              }
              small={
                '* 미디어아트의 재생횟수, 시간, 누적 플레이 횟수, 캔버스 사이즈 등을 바탕으로\n자동화 된 알고리즘을 통해 작가들의 작품 사용에 대한 정당한 사용료를 제공'
              }
            />
          </section>
          <span className="info">
            *PC 버전에서 VIDO 서비스에 대한
            <br />
            자세한 내용을 확인하실 수 있습니다.
          </span>
        </div>
        <div className="company">
          <p>제휴사</p>
          {/* <div>
            <img src="/img/company-ba.png" alt="Brand Architecture" />
            <img src="/img/company-connecart.png" alt="Connec Art" />
            <img src="/img/company-jj.png" alt="JJ Solution" />
            <img src="/img/company-xmedia.png" alt="X media" />
          </div>
          <div>
            <img src="/img/company-bhak.png" alt="Bhak" />
            <img src="/img/company-exxit.png" alt="Exxit" />
            <img src="/img/company-noflex.png" alt="no flex" />
          </div> */}
          <Company />
        </div>
        <div className="section collector">
          <p>
            VIDO <span className="blue">콜렉터</span>가<br />
            되어주세요!
          </p>
          {/* <Collector
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            position={collector}
          > */}
          <section>
            <MobileCollector
              title={`공간에 맞는\n아트 컨설팅`}
              content={`전문가들을 통해 공간의 용도, 규모,\n캔버스의 크기, 브랜드 아이덴티티에 따라\n이에 맞는 아트 컨설팅을 진행해 드립니다.`}
              img="1"
            />
            <MobileCollector
              title={`다양한\n미디어아트를 전시`}
              content={`캔버스(전광판) 사이즈에 따라 효율적인\n구독서비스를 이용하여 다양한 미디어아트들을\n전시할 수 있습니다.`}
              contentsmall={`* 아티스트별, 카테고리별, 에디터 추전 등을 통해 원하는 재생 목록 설정`}
              img="2"
            />
            <MobileCollector
              title={`미디어아트의 트렌드를\n알 수 있는 레포트 제공`}
              content={`캔버스에서 재생된 미디어아트들에 대한\n데이터와 큐레이팅을 통한 미디어아트와\n아티스트의 트렌드에 대한 월간 레포트를\n제공합니다.`}
              img="3"
            />
          </section>
          {/* </Collector> */}
        </div>
        <div className="link">
          <h2>VIDO 문의</h2>
          <div>
            <img src="/img/mobile-email.png" alt="email icon" />
            <p>vidogallery@gmail.com</p>
          </div>
          <div className="btn" onClick={copyMail}>
            <p>{!mail ? `메일 주소 복사` : `복사되었습니다.`}</p>
          </div>
          {/* <div className="btn" onClick={copyLink}>
            <p>{copied ? '복사되었습니다.' : '홈페이지 링크 복사'}</p>
          </div> */}
          <p>
            *PC 버전에서 VIDO 서비스에 대한
            <br />
            자세한 내용을 확인하실 수 있습니다.
          </p>
        </div>
      </div>
      <footer>
        <div>
          <img src="/img/mobile-logo.png" alt="vido" />
          <a target="_blank" href="https://instagram.com/vido.gallery/">
            <img src="/img/mobile-insta.svg" alt="instagram" />
          </a>
        </div>

        <p>Copyright 2022. VIDO Corp. All rights reserved.</p>
      </footer>
    </Div>
  );
};

export default MobilePage;
