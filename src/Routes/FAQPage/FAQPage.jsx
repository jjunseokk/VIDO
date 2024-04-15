import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import FAQ from './components/FAQ';
import Notice from './components/Notice';
import OneToOne from './components/OneToOne';
import {useTranslation} from "react-i18next";
const Div = styled.div`
  min-height: calc(100vh - 90px);
  margin-bottom: 121px;
  > .head {
    margin-top: 51px;
    > h1 {
      text-align: center;
      font: 600 22px/33px ${({ theme }) => theme.noto};
      color: #151515;
      letter-spacing: -0.44px;
    }
    > ul {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-top: 40px;
      position: relative;
      margin-bottom: 36px;

      > li {
        &:nth-of-type(1) {
          &::before {
            transition: ${({ theme }) => theme.transition};
            display: block;
            content: '';
            position: absolute;
            top: 0;
            left: ${(props) => props.selected * 152}px;
            width: 120px;
            height: 32px;
            background-color: ${({ theme }) => theme.highlightColor};
            border-radius: 16px;
          }
        }
        position: relative;
        display: block;
        width: 120px;
        height: 32px;
        cursor: pointer;
        transition: ${({ theme }) => theme.transition};
        > p {
          position: relative;
          text-align: center;
          font: 500 18px/32px ${({ theme }) => theme.noto};
          transition: ${({ theme }) => theme.transition};
          color: #707070;
          letter-spacing: -1.08px;
        }
        &.selected {
          > p {
            color: #fff;
          }
        }
      }
    }
  }
`;

const FAQPage = ({mode}) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(0);
  return (
    <>
      <Div selected={selected}>
        <div className="head">
          <h1>{t("service.title")}</h1>
          <ul>
            <li
              onClick={() => setSelected(0)}
              className={selected == 0 ? 'selected' : null}
            >
              <p>{t("service.notice.title")}</p>
            </li>
            <li
              onClick={() => setSelected(1)}
              className={selected == 1 ? 'selected' : null}
            >
              <p>{t("service.faq.title")}</p>
            </li>
            <li
              onClick={() => setSelected(2)}
              className={selected == 2 ? 'selected' : null}
            >
              <p>{t("service.inquiry.title")}</p>
            </li>
          </ul>
        </div>
        <div className="cont">
          {selected == 0 ? <Notice /> : selected == 1 ? <FAQ /> : <OneToOne />}
        </div>
      </Div>
      <Footer mode={mode} />
    </>
  );
};

export default FAQPage;
