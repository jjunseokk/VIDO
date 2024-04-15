import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import px2vw from '../util/px2vw';
import { useTranslation } from "react-i18next";
import KaKaoBtn from '../Components/KaKaoBtn';
import ImgPopup from './components/ImgPopup';
import { AnimatePresence } from 'framer-motion';
import CollectorNweGallery from './components/CollectorNweGallery';
import InquiryPopup from '../Components/InquiryPopup';


const Page = styled.div`
  /* background: ${({ mode }) => (mode == 'light' ? '#ffff' : "#151515")}; */
  background: #000000;

  .section_1{
    min-height: 880px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    >p{
      color: #ffffff;
    }
    p.title{
      font: 700 38px/45.35px ${({ theme }) => theme.pretendard};
      margin-bottom: 12px;
    }
    p.sub_title{
      font: 900 65px/77.57px ${({ theme }) => theme.pretendard};
      margin-bottom: 28px;
    }
    p.content{
      font: 500 24px/28.64px ${({ theme }) => theme.pretendard};
      margin-bottom: 69px;
    }
    >div{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    >button{
      border-radius: 94px;
      color: #ffff;
      background: #374FFF;
      margin-top: 72px;
      padding: 5px 27px;
      font: 700 18px/21.48px ${({ theme }) => theme.pretendard};
    }
  }
  .section_2{
    background: url(/img/ott_bg.svg);
    background-size: cover;
    min-height: 850px;
  }

  div.gallery {
    width: 100vw;
    background-color: #000000;
    padding-top: ${px2vw(65)};
    padding-bottom: ${px2vw(80)};
    color: #ffffff;
    > p {
      &:first-of-type{
        font: 700 24px/28.64px ${({ theme }) => theme.pretendard};
        margin-bottom: ${px2vw(5)};
      }
      left: ${({ theme }) => theme.left};
      position: relative;
      font: 900 48px/57.28px ${({ theme }) => theme.pretendard};
      margin-bottom: ${px2vw(66)};
      letter-spacing: -0.44px;
    }
  }

  .more{
    height: 160px;
    background: #3E3E3E;
    display: flex;
    justify-content: center;
    align-items: center;
    >img{
      margin-right: ${px2vw(30)};
      width: 31px;
      height: 33px;
    }
    >p{
      font: 700 24px/28.64px ${({ theme }) => theme.roboto};
      color:#ffff;
      margin-right: ${px2vw(151)};
    }
    >button{
      /* width: 120px; */
      /* height: 32px; */
      color: #ffffff;
      padding: 6px 30px;
      border: 1px solid #ffffff;
      background: none;
      border-radius: 94px;
      font : 700 16px/19.09px ${({ theme }) => theme.roboto};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (max-width:1492px) {
    .section_1{
      p.title{
        font: 700 30px/27.35px ${({ theme }) => theme.pretendard};
        margin-bottom: 12px;
      }
      p.sub_title{
        font: 900 57px/69.57px ${({ theme }) => theme.pretendard};
        margin-bottom: 28px;
      }
      p.content{
        font: 500 20px/24.64px ${({ theme }) => theme.pretendard};
        margin-bottom: 69px;
      }
      >div{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @media (max-width: 1206px) {
    .more{
      >p{
        font: 700 20px/24.19px ${({ theme }) => theme.roboto};
        color:#ffff;
        margin-right: ${px2vw(100)};
      }
    }
  }
  @media (max-width: 992px) {
    .more{
      display: flex;
      justify-content: center;
      align-items: center;
      >img{
        margin-right: ${px2vw(20)};
      }
      >p{
        font: 700 18px/20.19px ${({ theme }) => theme.roboto};
        color:#ffff;
        margin-right: ${px2vw(80)};
      }
    }
  }
`;

const CollectBox = styled.div`
  color: #ffff;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 1px solid #ffff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 70px;
  font: 700 ${({ font }) => font}px/19.09px ${({ theme }) => theme.pretendard};
  &:last-of-type{
    margin-right: 0px;
  }

  @media (max-width: 1206px) {
    width: ${({ width }) => width - 20}px;
    height: ${({ height }) => height - 20}px;
    font: 700 13px/19.09px ${({ theme }) => theme.pretendard};
  }
  @media (max-width: 992px) {
    width: ${({ width }) => width - 30}px;
    height: ${({ height }) => height - 30}px;
    font: 700 10px/13.09px ${({ theme }) => theme.pretendard};
  }
`

const Section = styled.div`
  /* background: url(${({ src }) => src}); */
  /* background-size: cover; */
  width: 100vw;
  max-height: 850px;
  position: relative;
  overflow: hidden;

  >video{
    width: 100%;
  }
  >.back{
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.1) 25%,
      rgba(20, 20, 20, 0.3) 50%,
      rgba(20, 20, 20, 0.55) 75%,
      rgba(20, 20, 20, 0.75) 100%
    );
    mix-blend-mode: multiply;
    position: absolute;
    top: 0px;
  }
  >.content{
    position: absolute;
    top: ${px2vw(174)};
    left: ${px2vw(327)};

    >p{
      color: #ffff;
      &:first-of-type{
        font: 700 32px/38.19px ${({ theme }) => theme.pretendard};
        margin: 16px 0px;
      }
      &:nth-of-type(2),&:nth-of-type(3){
        font: 900 60px/71.6px ${({ theme }) => theme.pretendard};
        
      }
      &:nth-of-type(3){
        margin-bottom: 32px;
      }
      &:nth-of-type(4),&:nth-of-type(5),&:nth-of-type(6){
        font: 500 24px/28.64px ${({ theme }) => theme.pretendard};
      }
    }
  }
`


const CollectorPage = ({ mode }) => {
  const { t } = useTranslation();
  const [imgPopup, setImgPopup] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);


  const canvas_gallery = t("main.canvas_gallery");
  const collect_title = t("collector.title");
  const collect_description = t("collector.description");
  const collect_object = t("collector.collect_gallery", { returnObjects: true })


  return (
    <Page mode={mode}>
      {/* <KaKaoBtn /> */}
      <div className='section_1'>
        <p className='title'>VIDO SERVICE</p>
        <p className='sub_title'>
          {collect_title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <p className='content'>
          {collect_description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div>
          {collect_object?.map((value) => (
            <CollectBox font={16} width={120} height={120}>
              {value.collectBox?.map((value) => {
                return (
                  <p>{value}</p>
                )
              })}
            </CollectBox>
          ))}
        </div>
        <button onClick={() => { setShowInquiry(true) }}>
          {t("collector.subscribe")}
        </button>
      </div>
      {collect_object.map((value, idx) => {
        return (
          <Section key={idx} src={value.src}>
            <video src={value.src} autoPlay loop muted />
            <div className='back'></div>
            <div className='content'>
              <CollectBox font={14} width={90} height={90}>
                {value.collectBox?.map((value) => {
                  return (
                    <p> {value}</p>

                  )
                })}
              </CollectBox>
              <p>{value.title}</p>
              {value.sub_title.map((value) => (<p>{value}</p>))}
              {value.txt.map((value) => (<p>{value}</p>))}

            </div>
          </Section>
        )
      })}
      <div className='more'>
        <img src="/img/moreLogo.svg" alt="Logo" />
        <p>{t("collector.subscribe_introduction")}</p>
        <button onClick={() => { setShowInquiry(true) }}>
          {t("collector.subscribe")}
        </button>
      </div>
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
      <Footer mode={mode} white={true} />

      {
        showInquiry == true ? (
          <InquiryPopup setPopup={setShowInquiry} />
        ) : null
      }
    </Page >
  );
};

export default CollectorPage;
