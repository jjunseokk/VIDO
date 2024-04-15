import { AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import React, { useState } from 'react';
import FooterPopup from './FooterPopup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FooterAsk from './FooterAsk';
import { i18n } from "../../language/i18n";

const Foot = styled.footer`
  width: 100vw;
  height: 200px;
  background-color: ${({ mode }) => (mode == 'light' ? '#F8F8F8' : '#363636')};
  padding: 0 ${({ theme }) => theme.left};
  display: flex;
  justify-content: space-between;
  > div {
    position: relative;
    top: 46px;
    &:nth-of-type(1) {
      height: 16px;
      ul {
        display: flex;

        li {
          line-height: 1;
          position: relative;
          color: ${({ mode }) => (mode == 'light' ? '#151515' : '#e0e0e0')};
          font-family: ${({ theme }) => theme.noto};
          letter-spacing: -0.5px;
          padding: 0 10px;
          font-size: 14px;
          display: block;
          width: fit-content;
          &:nth-of-type(1) {
            padding: 0 12px 0 0;
          }
          &:not(:nth-of-type(1))::after {
            font-family: ${({ theme }) => theme.noto};

            display: block;
            position: absolute;
            content: '';
            width: 1px;
            height: 8px;
            top: 3px;
            background-color: #707070;
            left: 0;
          }
          > p {
            cursor: pointer;
          }
        }
      }
      > div {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        left: 0;
        top: 24px;
        gap: 0 40px;
        img {
          height: 30px;
          width: auto;
          margin-top: 4px;
        }
        > div.address {
          flex-wrap: wrap;
          display: block;
          width: max-content;
          address {
            &:nth-of-type(1) {
              margin-bottom: 8px;
            }
            gap: 25px;
            color: ${({ mode }) => (mode == 'light' ? '#707070' : '#e0e0e0')};
            word-break: keep-all;
            display: flex;
            width: fit-content;
            font-size: 12px;
            line-height: 14px;
            letter-spacing: -0.4px;
            font-style: normal;
            font-family: ${({ theme }) => theme.noto};
            > p {
              position: relative;
              &:not(:first-of-type)::after {
                display: block;
                content: '';
                position: absolute;
                top: 3px;
                left: -13px;
                height: 8px;
                width: 1px;
                background-color: #e0e0e0;
              }
            }
          }
          .copy{
            font-size: 10px;
            margin-top: 17px;
            font: 500 12px/14.06px ${({ theme }) => theme.roboto};
            color: ${({ mode }) => (mode == 'light' ? '#707070' : '#e0e0e0')};
          }
        }
      }
    }
    &:nth-of-type(2) {
      height: fit-content;
      ul {
        li {
          &:nth-of-type(2) {
            margin-top: 20px;
          }
          position: relative;
          z-index: 1;
          a {
            position: relative;
            height: 24px;
            display: block;
            embed {
              position: relative;
              z-index: -20;
            }
          }
        }
      }
    }
  }
  @media (max-width: 928px) {
    height: 160px;
    > div {
      top: 32px;
      &:nth-of-type(1) {
        ul li {
          font-size: 12px;
        }
        > div {
          top: 16px;
          gap: 12px;
          img {
            height: 24px;
          }
          > div.address {
            address {
              &:nth-of-type(1) {
                margin-bottom: 4px;
              }
              gap: 14px;
              font-size: 10px;
              line-height: 14px;
              > p {
                position: relative;
                &:not(:first-of-type)::after {
                  top: 3px;
                  left: -7px;
                }
              }
            }
          }
        }
        > p {
          margin-top: 28px;
        }
      }
      &:nth-of-type(2) {
        ul li {
          &:nth-of-type(2) {
            margin-top: 16px;
          }
          a {
            height: 18px;
          }
          embed {
            height: 18px;
          }
        }
      }
    }
  }
  @media (max-width: 724px) {
    padding: 0 80px;
    > div {
      &:nth-of-type(1) {
        ul li {
          font-size: 10px;
        }
        > div {
          gap: 10px;
          img {
            height: 20px;
          }
        }
      }
    }
  }
`;

const Footer = ({ white = false, mode }) => {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(0);
  const [ask, setAsk] = useState(false);
  const navigate = useNavigate();
  const language = i18n.language;
  return (
    <>
      <AnimatePresence>
        {popup > 0 ? <FooterPopup setPopup={setPopup} popup={popup} language={language} /> : null}
        {ask ? <FooterAsk setPopup={setAsk} /> : null}
      </AnimatePresence>
      <Foot white={white} mode={mode}>
        <div>
          <ul>
            <li>
              <p onClick={() => navigate('/about')}>{t("footer.about")}</p>
            </li>
            <li>
              <p onClick={() => setPopup(2)}>{t("footer.terms")}</p>
            </li>
            <li>
              <p onClick={() => setPopup(3)}>{t("footer.privacy")}</p>
            </li>
            <li>
              <p
                // onClick={() => setPopup(4)}
                onClick={() => navigate('/FaQ')}
              >
                {t("footer.service_center")}
              </p>
            </li>
            <li>
              <p onClick={() => setAsk(true)}>{t("footer.contact")}</p>
            </li>
          </ul>
          <div>
            <img src={mode == 'light' ? "/img/newLogo.svg" : "/img/footer_logo.svg"} />
            <div className="address">
              <address>
                <p>{t("footer.company.name")}</p>
                <p>{t("footer.company.CEO")}</p>
                <p>{t("footer.company.privacy")}</p>
              </address>
              <address>
                <p>{t("footer.company.address")}</p>
                <p>{t("footer.company.number")}</p>
                <p>vidogallery@gmail.com</p>
              </address>
              {/* 서울시 신사동 543-9 3층 (주) 벌스&nbsp; | &nbsp; +82 512 0982 */}
              {/* &nbsp; | &nbsp; vidovido@vido.com */}

              <p className="copy">ⓒ VIDO Corp. All Rights Reserved.</p>
            </div>
          </div>

        </div>
        <div>
          <ul>
            <li>
              {/* <a target="_blank" href="https://codepen.io/drewhaas/pen/KZZBEE"> */}
              <embed src="/img/youtube.svg" type="image/svg+xml"></embed>
              {/* </a> */}
            </li>
            <li>
              <a target="_blank" href="https://instagram.com/vido.gallery/">
                <embed src="/img/instagram.svg" type="image/svg+xml"></embed>
              </a>
            </li>
          </ul>
        </div>
      </Foot>
    </>
  );
};

export default Footer;
