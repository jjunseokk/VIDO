import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userBaseInfoState, userInfo } from '../../util/recoilState';
import { replaceAll } from '../../util/replaceAll';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import makePdf from '../utils/makePdf';
import {useEffect, useState} from 'react';
import {Trans, useTranslation} from "react-i18next";
import {i18n} from "../../../language/i18n";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  background-color: #15151544;
  z-index: 100;
`;

const Div = styled.div`
  z-index: 100;
  padding: 24px 18px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.boxShadow};
  width: 640px;
  max-height: 920px;
  overflow: auto;

  font-family: sans-serif;
  &::-webkit-scrollbar {
    width: 14px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #f2f2f2;
    width: 12px;
    margin-right: 2px;
    border-radius: 6px;
    border: 2px solid #fff;
  }
  > button {
    position: absolute;
    top: 12px;
    right: 12px;
    &.getFile {
      right: 48px;
      border: ${({ theme }) => theme.border};
      height: 24px;
      padding: 0 12px;
    }
  }
  @media (max-width: 724px) {
    > button {
      right: 100px;
      &.getFile {
        right: 120px;
      }
    }
  }
`;

const Inner = styled.div`
  font-family: ${({ theme }) => theme.noto};
  width: 595px;
  padding: 24px;
  > svg {
    width: 172px;
    height: auto;
    margin-bottom: 20px;
  }
  > header {
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    line-height: 2;
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const Bold = styled.p`
  font-weight: 600;
`;
const Info = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 112px 148px 5px 1fr;
  // grid-template-rows: repeat(5, 24px);
  grid-template-rows: ${({language}) => language === "en" ? "repeat(5, 40px)" : "repeat(5, 24px)"};
  vertical-align: middle;
  align-items: center;
  
  gap: 4px 16px;
  > p {
    display: block;
    width: 100%;
    position: relative;
    line-height: 1;
    font-size: 14px;
    > span {
      position: absolute;
      right: 0;
    }
  }
`;
const TableArt = styled.table`
  border-collapse: collapse;
  width: 100%;
  td {
    border: 1px solid #000;
  }
  tr > td {
    position: relative;
    height: 24px;
    text-align: center;
    &:nth-of-type(1) {
      width: 140px;
      overflow: hidden;
    }
    &:nth-of-type(n + 2) {
      width: 100px;
    }
    > span {
      text-align: right;
      padding-right: 8px;
      width: 100%;
      display: block;
    }
  }
  tr.last {
    td {
      height: 48px;
      > span {
        bottom: 12px;
        font-weight: 500;
      }
    }
  }
`;

const Medium = styled.p`
  font-weight: 500;
`;

const MainTxt = styled.div`
  justify-content: center;
  display: flex;
  text-align: center;
  font-weight: 500;
  margin: 24px 0;
  > p > span {
    display: inline-block;
    width: 168px;
    text-align: center;
  }
`;

const DetailInfo = styled.div`
  > p {
    text-align: center;
    font-size: 12px;
    &.blue {
      font-weight: 600;
      font-size: 17px;
      color: ${({ theme }) => theme.mainColor};
      margin-top: 18px;
    }
    &.gray {
      font-size: 10px;
      margin-top: 12px;
      color: #707070;
      margin-bottom: 16px;
    }
  }
`;

const Under = styled.div`
  font-size: 14px;
  > p {
    margin-bottom: 4px;
  }
`;

const SettlementDetail = ({ setPopup, month, data }) => {
  const {t} = useTranslation();
  const { userName } = useRecoilValue(userInfo);
  const [clicked, setClicked] = useState(false);
  const [language, setLanguage] = useState(null);

  const getPdf = async (e) => {
    await makePdf.viewWithPdf();
    setClicked(false);
  };

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <>
      <Modal onClick={() => setPopup(false)}></Modal>
      <Div className="div_container">
        <button onClick={() => setPopup(false)}>
          <img src="/img/close-popup.svg" />
        </button>
        <button
          disabled={clicked}
          className="getFile"
          onClick={() => {
            setClicked(true);
            getPdf();
          }}
        >
          {clicked ? t("mypage.refund.pdf.wait") : t("mypage.refund.pdf.save")}
        </button>
        <Inner className="div_paper">
          <svg width="89.113" height="23" viewBox="0 0 89.113 23">
            <defs>
              <clipPath id="clip-path">
                <rect
                  id="사각형_68"
                  data-name="사각형 68"
                  width="89.113"
                  height="23"
                  fill="#002e85"
                />
              </clipPath>
            </defs>
            <g id="그룹_8" data-name="그룹 8" transform="translate(0 0)">
              <g
                id="그룹_7"
                data-name="그룹 7"
                transform="translate(0 0)"
                clip-path="url(#clip-path)"
              >
                <path
                  id="패스_31"
                  data-name="패스 31"
                  d="M11.862,23,0,0H1.3L11.862,20.418,22.427,0h6.259V21.84H50.221a10.341,10.341,0,1,0,0-20.682H33.056V0H50.221a11.5,11.5,0,0,1,0,23h-22.7V1.158H23.141Z"
                  transform="translate(0 -0.001)"
                  fill="#002e85"
                />
                <path
                  id="패스_32"
                  data-name="패스 32"
                  d="M40.568,23a11.5,11.5,0,1,1,11.5-11.5A11.515,11.515,0,0,1,40.568,23m0-21.842A10.341,10.341,0,1,0,50.908,11.5,10.355,10.355,0,0,0,40.568,1.16"
                  transform="translate(37.045 -0.001)"
                  fill="#002e85"
                />
              </g>
            </g>
          </svg>
          <header>
            <Bold>
              {
                t(`report.month_list.${Number(month.slice(5, 7)[0] === '0'
                    ? month.slice(6, 7)
                    : month.slice(5, 7)) - 1}`)
              }{t("mypage.refund.pdf.title")}
            </Bold>
          </header>
          <Info language={language}>

            <Medium language={language}>
              {t("mypage.refund.pdf.date")}<span>|</span>
            </Medium>
            <p>{replaceAll(month.slice(0, 10), '-', '. ')}</p>
            <p></p>
            <p></p>

            <Medium language={language}>
              {t("mypage.refund.pdf.supplier")}<span>|</span>
            </Medium>
            <p>
              <Medium>
                {t("mypage.refund.pdf.business_number")}
              </Medium>
            </p>
            <span>:</span>
            <p>810-81-03271</p>
            <p></p>

            <Medium language={language}>
              {t("mypage.refund.pdf.compnay_title")}
            </Medium>
            <span>:</span>
            <p>{t("mypage.refund.pdf.compnay")}</p>
            <p></p>

            <Medium language={language}>
              {t("mypage.refund.pdf.address_title")}
            </Medium>
            <span>:</span>
            <p>{t("mypage.refund.pdf.address")}</p>
            <p></p>

            <Medium language={language}>
              {t("common.number")}
            </Medium>
            <span>:</span>
            <p>02-512-0982</p>
            <p></p>
          </Info>
          <MainTxt>
            <p>
              <Trans i18nKey={"mypage.refund.pdf.for"} values={{value: userName}} components={[<span></span>]} />
            </p>
          </MainTxt>
          <TableArt>
            <thead>
              <tr>
                <td>{t("mypage.refund.pdf.art_title")}</td>
                <td>{t("mypage.refund.pdf.revenue")}</td>
                <td>{t("mypage.refund.pdf.tax")}</td>
                <td>{t("mypage.refund.pdf.total")}</td>
              </tr>
            </thead>
            <tbody>
              {data.mediaArts.length > 0 ? (
                data.mediaArts.map((art, idx) => (
                  <tr key={art.id}>
                    <td>{art.title}</td>
                    {idx === 0 ? (
                      <>
                        <td rowSpan={data.mediaArts.length}>
                          <span>
                            {Math.round(
                              data.settlementAmount / 0.967
                            ).toLocaleString()}{' '}
                            ￦
                          </span>
                        </td>
                        <td rowSpan={data.mediaArts.length}>
                          <span>
                            {(
                              Math.round(data.settlementAmount / 0.967) -
                              data.settlementAmount
                            ).toLocaleString()}
                            ￦
                          </span>
                        </td>
                        <td rowSpan={data.mediaArts.length}>
                          <span>
                            {data.settlementAmount.toLocaleString()} ￦
                          </span>
                        </td>
                      </>
                    ) : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <p> {''}</p>
                  </td>
                  <td>
                    <span>
                      {Math.round(
                        data.settlementAmount / 0.967
                      ).toLocaleString()}{' '}
                      ￦
                    </span>
                  </td>
                  <td>
                    <span>
                      {(
                        Math.round(data.settlementAmount / 0.967) -
                        data.settlementAmount
                      ).toLocaleString()}
                      ￦
                    </span>
                  </td>
                  <td>
                    <span>{data.settlementAmount.toLocaleString()} ￦</span>
                  </td>
                </tr>
              )}
              <tr className="last">
                <td>{t("mypage.refund.pdf.total")}</td>
                <td colSpan={3}>
                  <span>{data.settlementAmount.toLocaleString()} ￦</span>
                </td>
              </tr>
            </tbody>
          </TableArt>
          <DetailInfo>
            {language === "ko" || language === null ? (
                <>
                  <p>
                    *원활한 지급을 위해 20일 전까지 필히 아래 자료를
                    vidogallery@gmail.com으로 첨부해주세요.
                  </p>
                  <p>
                    *아래 자료의 변경을 원할 경우 vidogallery@gmail.com으로
                    재첨부해주세요.
                  </p>
                </>
            ): null}
            <p>
              {t("mypage.refund.pdf.description1")}
            </p>
            <p className="blue">
              {t("mypage.refund.pdf.description2")}
            </p>
            <p className="gray">
              {t("mypage.refund.pdf.description3")}
              {/*vido.gallery &gt; 로그인 &gt; 마이페이지 &gt; 수익금 출금*/}
            </p>
          </DetailInfo>
          <Under>
            {language === "ko" || language === null ? (
                <>
                  <p>아래</p>
                  <ul>
                    <li>1) 주민등록증 사본</li>
                    <li>2) 통장 사본</li>
                  </ul>
                </>
            ): null}
          </Under>
        </Inner>
      </Div>
    </>
  );
};

export default SettlementDetail;
