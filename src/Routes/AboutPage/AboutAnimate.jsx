import { motion } from 'framer-motion';
import { Trans, useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import usePrevious from '../MyPage/utils/usePrevious';
import px2vw from '../util/px2vw';
import Collector from './components/Collector';
import Companies from './components/Companies';
import MediaArtist from './components/MediaArtist';
import { i18n } from "../../language/i18n";
import KaKaoBtn from '../Components/KaKaoBtn';
import AxiosConfig from '../../AxiosConfig';
import InquiryPopup from '../Components/InquiryPopup';

const StepCircle = styled.div`
  width: 290px;
  height: 290px;
  border-radius: 50%;
  /* box-shadow: 0px 20px 15px 4px #D9D9D9; */
  box-shadow: #D9D9D9 0px ${({ direction }) => (direction == 'up' ? '60px' : '-60px')} 40px -7px;
  margin-right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:last-of-type{
    margin-right: 0px;
  }
  >p{
    &:first-of-type{
      font : 700 22px/26.25px ${({ theme }) => theme.pretendard};
      color: #404EFF;
      letter-spacing: 0px;
    }
    font: 700 40px/47.73px ${({ theme }) => theme.pretendard};
    letter-spacing: ${({ resize }) => (resize == 'resize' ? '-2px' : null)};
    color: #151515;
    text-align: center;
    margin-top: 19px;
  }
  @media (max-width: 1450px) {
    width: 200px;
    height: 200px;
    box-shadow: #D9D9D9 0px ${({ direction }) => (direction == 'up' ? '50px' : '-50px')} 40px -7px;
  
    >p{
      &:first-of-type{
        font : 700 17px/21.25px ${({ theme }) => theme.pretendard};
      }
      font: 700 28px/35.73px ${({ theme }) => theme.pretendard};
      letter-spacing: ${({ resize }) => (resize == 'resize' ? '-2px' : null)};
    }
  }
 
  @media (max-width: 992px) {
    width: 180px;
    height: 180px;
    box-shadow: #D9D9D9 0px ${({ direction }) => (direction == 'up' ? '30px' : '-30px')} 40px -7px;
    margin-right: 15px;
  
    >p{
      &:first-of-type{
        font : 700 17px/21.25px ${({ theme }) => theme.pretendard};
      }
      font: 700 25px/32.73px ${({ theme }) => theme.pretendard};
      letter-spacing: ${({ resize }) => (resize == 'resize' ? '-2px' : null)};
    }
  }
`
const Div = styled(motion.div)`
  background: ${({ mode }) => (mode == 'light' ? "#ffff" : "#151515")};
  background: url(/img/about_left_bg.svg) no-repeat;
  background-position: 0% 100px;
  background-size: 25%;

  .blue {
    color: ${({ theme }) => theme.highlightColor};
  }

  > header {
    width: 100vw;
    height: 420px;
    overflow: hidden;
    position: relative;
    > img {
      width: 100vw;
      height: 420px;
    }

    > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &.cover {
        opacity: 0.8;
        background-color: #2b2b2b;
        mix-blend-mode: multiply;
      }

      display: flex;
      align-items: center;
      justify-content: center;

      > h1 {
        white-space: pre-wrap;
        text-align: center;
        font: 700 48px/71px ${({ theme }) => theme.noto};
        color: #fff;
        letter-spacing: -0.96px;
        text-shadow: 0px 3px #00000029;

        > span {
          color: #5c94ff;
        }
      }
    }
  }

  > .head {
    width: 100vw;
    height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    > .vid {
      position: absolute;
      width: 100vw;
      height: ${px2vw(720)};
      top: 135px;
      left: ${({ theme }) => theme.left};

      > video {
        width: ${({ theme }) => theme.pgWidth};
        position: absolute;
        z-index: 0;
        border-radius: 32px;
      }
    }

    > div.txt {
      width: ${({ theme }) => theme.pgWidth};
      position: absolute;
      height: ${px2vw(720)};
      z-index: 20;
      top: 90px;
      overflow: hidden;
      border-radius: 32px;

      > .cover {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: ${({ onHover }) => (onHover == true ? 0 : 0.4)};
        background-color: #2b2b2b;
        mix-blend-mode: multiply;
        transition: all .5s;
      }

      > h1 {
        position: absolute;
        top: 50%;
        left: 50%;
        width: max-content;
        word-break: keep-all;
        white-space: pre-wrap;
        text-align: center;
        font: 700 48px/71px ${({ theme }) => theme.noto};
        color: #fff;
        letter-spacing: -0.96px;
        text-shadow: 0px 3px #00000029;
        z-index: 10;
        display: ${({ onHover }) => (onHover == true ? "none" : "block")};
        > span {
          color: #5c94ff;
        }
      }
    }
  }

  > .vid {
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-top: 52px;
    
  }

  > section {
    > h1 {
      font: 700 60px/80px ${({ theme }) => theme.noto};
      color: ${({ mode }) => (mode == 'light' ? "#151515" : "#ffffff")};
      letter-spacing: -1.2px;
      text-align: center;
      width: 100%;
      margin-bottom: 120px;
    }

    > .link {
      width: 240px;
      height: 60px;
      border-radius: 94px;
      border: none;
      background: #000000;
      color: #ffffff;
      margin: 0 auto;
      margin-top: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:last-of-type{
        margin-top: 10px;
        background: none;
        color: #151515;
      }
      >a{
        font: 700 24px/28.64px ${({ theme }) => theme.pretendard};
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .subscribe{
      width: 240px;
      height: 60px;
      border-radius: 94px;
      border: none;
      background: #000000;
      color: #ffffff;
      margin: 0 auto;
      margin-top: 94px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      >p{
        font: 700 24px/28.64px ${({ theme }) => theme.pretendard};
      }
    }

    &.artist {
      margin-top: 186px;

      h1{
        font: 900 98px/116.95px ${({ theme }) => theme.pretendard};
        margin-bottom: 114px;
        >p{
          :first-of-type{
            font: 900 48px/57.28px ${({ theme }) => theme.pretendard};
          }
          :last-of-type{
            font : 700 36px/42.96px ${({ theme }) => theme.pretendard};
            color: #374FFF;
          }
        }
      }
      > .circle_area {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  
    &.collector{
      .right_bg{
        position: absolute;
        right: 0%;
        top: 2000px;
        z-index: -1;
        width: 15%;
      }
    }
  }
  .more{
    height: 160px;
    background: #3E3E3E;
    margin-top: 156px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    >img{
      width: 31px;
      height: 31px;
    }
    >p{
      font: 700 24px/28.64px ${({ theme }) => theme.pretendard};
      color:#ffff;
      margin-top: 6px;
      margin-bottom: 16px;
    }
    >a{
      width: 120px;
      height: 32px;
      color: #ffffff;
      border: 1px solid #ffffff;
      background: none;
      border-radius: 94px;
      font : 700 16px/19.09px ${({ theme }) => theme.pretendard};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .comp {
    margin-bottom: 160px;
    height: 360px;
    background-color: #ffffff;
    padding-top: 120px;
    z-index: -1;
    > h1 {
      font : 900 48px/57.28px ${({ theme }) => theme.pretendard};
      color: #2b2b2b;
      text-align: center;
      width: 100%;
      margin-bottom: 64px;
    }
  }

  @media (max-width: 1800px) {
    > section {
      &.artist {
        margin-top: 100px;
        h1{
          font: 900 88px/106.95px ${({ theme }) => theme.pretendard};
          >p{
            :first-of-type{
              font: 900 38px/47.28px ${({ theme }) => theme.pretendard};
            }
            :last-of-type{
              font : 700 30px/36.96px ${({ theme }) => theme.pretendard};
              color: #374FFF;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1450px) {
    > section {
      &.artist {
        margin-top: 100px;

        h1{
          font: 900 78px/96.95px ${({ theme }) => theme.pretendard};
          >p{
            :first-of-type{
              font: 900 28px/37.28px ${({ theme }) => theme.pretendard};
            }
            :last-of-type{
              font : 700 26px/32.96px ${({ theme }) => theme.pretendard};
              color: #374FFF;
            }
          }
        }
      }
    
      &.collector{
        .right_bg{
          top: 1400px;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    > .head {
      > div.txt {
        > h1 {
          font: 700 35px/58px ${({ theme }) => theme.noto};
        }
      }
    }
  }
`;


const AboutAnimate = ({ mode }) => {
  const { t } = useTranslation();
  const [onHover, setOnHover] = useState();
  const [showInquiry, setShowInquiry] = useState(false);

  const artistRef = useRef(null);
  const companyRef = useRef(null);



  const getManualLink = () => {
    if (i18n.language === "en") {
      return "[VIDO] Artist's Manual.pdf";
    }

    return "[VIDO] 아티스트 매뉴얼.pdf";
  }

  return (
    <>
      <Div onHover={onHover} mode={mode}>
        {/* <KaKaoBtn /> */}
        <motion.div className="head">
          <motion.div
            className="vid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.6 } }}
            exit={{ opacity: 0 }}
            viewport={{ once: true }}
          >
            <video style={{ display: 'block' }} src="./img/vido-pr.mp4" autoPlay muted loop />
          </motion.div>
          <motion.div
            className="txt"
            initial={{
              y: '50%',
            }}
            animate={{
              y: '45px',
              transition: {
                ease: 'easeInOut',

                bounce: 0,
                duration: 0.5,
              },
            }}
          >
            <motion.div
              className="cover"
              animate={{
                transition: {
                  ease: 'easeInOut',
                  duration: 0.4,
                  delay: 0.2,
                },
              }}
              onMouseEnter={() => { setOnHover(true) }}
              onMouseLeave={() => { setOnHover(false) }}
            ></motion.div>
            <motion.h1
              initial={{ x: '-50%', y: '10%', opacity: 0 }}
              animate={{
                x: '-50%',
                y: '-50%',
                opacity: 1,
                transition: {
                  ease: 'easeInOut',
                  duration: 0.5,
                  delay: 0.5,
                  bounce: 0.05,
                },
              }}
            >
              <Trans i18nKey={"about.content1"} components={[<span></span>]} />
            </motion.h1>
          </motion.div>
        </motion.div>
        <motion.section
          className="artist"
          ref={artistRef}
          animate={{
            transition: {
              staggerChildren: 0.2,
            },
          }}
        >
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
          >
            {/* <Trans i18nKey={"about.content2.title"} components={[<span className={"blue"}></span>]} /> */}
            <p>VIDO</p>
            <p>ARTIST</p>
            <p>4-STEP PROCESS</p>
          </motion.h1>
          <motion.div
            className='circle_area'
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: {
                staggerChildren: 0.5,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
          >
            <StepCircle direction={"up"}>
              <p>STEP 1</p>
              <p>{t("about.VIDO_ARTIST.step_1")}</p>
            </StepCircle>
            <StepCircle resize={"resize"} direction={"down"}>
              <p>STEP 2</p>
              <p>{t("about.VIDO_ARTIST.step_2")}</p>
            </StepCircle>
            <StepCircle direction={"up"}>
              <p>STEP 3</p>
              <p>{t("about.VIDO_ARTIST.step_3")}</p>
            </StepCircle>
            <StepCircle direction={"down"}>
              <p>STEP 4</p>
              <p>{t("about.VIDO_ARTIST.step_4")}</p>
            </StepCircle>
          </motion.div>
          <motion.div
            className="link"
            initial={{ width: '50vw' }}
            whileInView={{
              width: '360px',
              transition: {
                duration: 0.5,
                delay: 0.1,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
          >
            <Link to="/signup">
              <Trans i18nKey={"about.content2.submit"} components={[<span></span>]} />
            </Link>
          </motion.div>
          <motion.div
            className="link"
            initial={{ width: '50vw' }}
            whileInView={{
              width: '360px',
              transition: {
                duration: 0.5,
                delay: 0.1,
                ease: 'easeInOut',
              }
            }}
            viewport={{ once: true }}
          >
            <Link to={`/img/${getManualLink()}`} target={"_blank"} >
              <Trans i18nKey={"about.content2.manual"} components={[<span></span>]} /> <img src='/img/manual_right.svg' alt='' />
            </Link>

          </motion.div>
        </motion.section>

        <motion.section
          className="artist collector"
          ref={artistRef}
          animate={{
            transition: {
              staggerChildren: 0.2,
            },
          }}
        >
          <img className='right_bg' src='/img/about_right_bg.svg' alt='' />
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
          >
            {/* <Trans i18nKey={"about.content2.title"} components={[<span className={"blue"}></span>]} /> */}
            <p>VIDO</p>
            <p>COLLECTOR</p>
            <p>3-STEP PROCESS</p>
          </motion.h1>
          <motion.div
            className='circle_area'
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: {
                staggerChildren: 0.5,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
          >
            <StepCircle direction={"up"}>
              <p>STEP 1</p>
              <p>{t("about.VIDO_COLLECTOR.step_1")}</p>
            </StepCircle>
            <StepCircle direction={"down"}>
              <p>STEP 2</p>
              <p>{t("about.VIDO_COLLECTOR.step_2")}</p>
            </StepCircle>
            <StepCircle direction={"up"}>
              <p>STEP 3</p>
              <p>{t("about.VIDO_COLLECTOR.step_3")}</p>
            </StepCircle>
          </motion.div>
          <motion.div
            className="subscribe"
            initial={{ width: '50vw' }}
            whileInView={{
              width: '360px',
              transition: {
                duration: 0.5,
                delay: 0.1,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
            onClick={() => { setShowInquiry(true) }}
          >
            <p>
              <Trans i18nKey={"about.content2.subscribe"} components={[<span></span>]} />
            </p>
          </motion.div>
        </motion.section>
        <div className='more'>
          <img src="/img/moreLogo.svg" alt="Logo" />
          <p>{t("about.more_introduction")}</p>
          <Link to="/collector">
            {t("about.show_more")}
          </Link>
        </div>
        <div className="comp" ref={companyRef}>
          <h1>{t("about.affiliate")}</h1>
          <Companies />
        </div>
        <Footer mode={mode} />
      </Div >
      {showInquiry == true ? (
        <InquiryPopup setPopup={setShowInquiry} />
      ) : null
      }
    </>
  );
};

export default AboutAnimate;
