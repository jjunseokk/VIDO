import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Footer from '../Components/Footer';
import Top10 from './components/Top10';
import NewMediaArt from './components/NewMediaArt';
import SlideWrap from './components/SlideWrap';
import CollectorGallery from '../CollectorPage/components/CollectorGallery';
import ImgPopup from '../CollectorPage/components/ImgPopup';
import px2vw from '../util/px2vw';
import KaKaoBtn from '../Components/KaKaoBtn';
import PopularitySoaring from './components/PopularitySoaring';
import SpotlightAuthor from './components/SpotlightAuthor';
import CollectorNweGallery from '../CollectorPage/components/CollectorNweGallery';


const Page = styled.div`
   div.gallery {
    width: 100vw;
    background-color: #000000;
    padding-top: ${px2vw(65)};
    padding-bottom: ${px2vw(80)};
    color: #ffffff;
    > p {
      &:first-of-type{
        font: 700 32px/38.19px ${({ theme }) => theme.pretendard};
        margin-bottom: ${px2vw(16)};
      }
      left: ${({ theme }) => theme.left};
      position: relative;
      font: 900 60px/71.6px ${({ theme }) => theme.pretendard};
      margin-bottom: ${px2vw(40)};
      letter-spacing: -0.44px;
    }
  }`

const InspectionBack = styled.div`
  width: 100vw;
  height: 100%;
  background: #151515;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: 0.6;
  
`

const InspectionPopup = styled.div`
  width: 422px;
  height: 604px;
  border-radius: 15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #ffff;
  z-index: 11;
  >.title{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 422px;
    height: 146px;
    background: #002E85;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;

    >p{
      margin-right: 43px;
      font: 700 25px/37px ${({ theme }) => theme.noto};
      color: #ffff;
      >span{
        font-size: 29px;
        line-height: 42.92px;
      }
    }
    >img{
      &:last-of-type{
        position: absolute;
        top: 7px;
        right: -40px;
        cursor: pointer;
      }
    }
  }
  >.body{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 51px;
    >p{
      text-align: center;

      &:first-of-type{
        width: 81px;
        height: 28px;
        background: #002E85;
        border-radius: 4px;
        color: #ffff;
        font: 500 18px/26.64px ${({ theme }) => theme.noto};
      }
      &:nth-of-type(2){
        font: 700 22px/32.56px ${({ theme }) => theme.noto};
        color: #002E85;
        margin-top: 10px;
      }
      &:nth-of-type(3){
        font: 400 16px/23.68px ${({ theme }) => theme.noto};
        color: #000000;
        margin-top: 70px;
      }
    }
    >img{
      margin-top: 96px;
    }
    >div{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: -50px;
      left: 0px;
      >input{
        width: 24px;
        height: 24px;

      }
      >p{
        margin-left: 7px;
        color: #ffff;
      }
    }
  } 
`
const MainPage = ({ mode }) => {
  const [imgPopup, setImgPopup] = useState(null);
  const { t } = useTranslation();
  const canvas_gallery = t("main.canvas_gallery");

  const [showPopup, setShowPopup] = useState(false);
  const [today, setToday] = useState(false);

  const ExpiresPopup = localStorage.getItem("popup");

  console.log(ExpiresPopup)
  const closeTodayPopup = () => {
    if (today == true) {
      let expires = new Date();
      expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
      localStorage.setItem("popup", expires);
      // localStorage.clear()
    }

    setShowPopup(false);
  }


  useEffect(() => {
    const today = new Date();

    if (today.getTime() > ExpiresPopup) {
      console.log("팝업 없음")
    } else {
      setShowPopup(false);
    }
  }, [ExpiresPopup]);


  return (
    <div style={{ position: 'relative', zIndex: 10, background: mode == "light" ? 'white' : '#151515' }}>
      {/* <KaKaoBtn /> */}
      {/* <MainBanner /> */}
      <SlideWrap />
      <Top10 mode={mode} />
      <NewMediaArt mode={mode} />
      <PopularitySoaring mode={mode} />
      {/*<EventBanner />*/}
      <SpotlightAuthor mode={mode} />
      <Page>
        <div className="gallery">
          <p>MEDIA CANVAS</p>
          <p>
            {canvas_gallery.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          {/* <CollectorGallery setImgPopup={setImgPopup} /> */}
          <CollectorNweGallery setImgPopup={setImgPopup} />
        </div>
        <AnimatePresence>
          {imgPopup ? <ImgPopup src={imgPopup} setPopup={setImgPopup} /> : null}
        </AnimatePresence>
      </Page>
      <Footer mode={mode} />
      {/* <EventTopButton /> */}
      {showPopup == true ? (
        <>
          <InspectionBack />
          <InspectionPopup>
            <div className='title'>
              <p>
                UI/UX 개선을 위한 <br />
                <span>시스템 점검 안내</span>
              </p>
              <img src='/img/InspectionIcon.svg' />
              <img onClick={closeTodayPopup} src='/img/InspectionClose.svg' />
            </div>
            <div className='body'>
              <p>점검 일시</p>
              <p>2024년 1월 31일(수) 00:00 ~ 23:59</p>
              <p>
                보다 안정적인 서비스를 제공해드리기 위해 <br />
                점검 시간 동안 시스템이 불안정 할 수 있습니다.<br />
                사이트 이용에 불편을 드려 죄송합니다.<br />
                감사합니다.
              </p>
              <img src='/img/InspectionLogo.svg' />

              <div>
                <input onClick={() => { setToday(true) }} type="checkbox" />
                <p>하루 동안 보지 않기</p>
              </div>
            </div>
          </InspectionPopup>
        </>
      ) : null}


    </div>
  );
};

export default MainPage;
