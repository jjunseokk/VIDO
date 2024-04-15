import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../ContextProvider';
import AxiosConfig from '../../AxiosConfig';
import ChartUl from '../Components/ChartUl';
import Footer from '../Components/Footer';
import ErrorPopup from '../Components/ErrorPopup';
import styled from 'styled-components';
import MediaArtListStyle from '../MediaArtPage/MediaArtListStyle';
import { useQuery } from 'react-query';
import { getAuthorDetail } from '../util/axiosGet';
import px2vw from '../util/px2vw';
import { Trans, useTranslation } from "react-i18next";
import KaKaoBtn from '../Components/KaKaoBtn';

const Div = styled.div`
  min-height: calc(100vh - 150px);
  padding-bottom: 60px;
  background: ${({ mode }) => (mode == 'light' ? '#ffff' : '#151515')};
  > .author {
    position: relative;
    left: ${({ theme }) => theme.left};
    padding-top: 100px;
    display: flex;
    width: ${({ theme }) => theme.pgWidth};
    margin-bottom: 60px;
    gap: 40px;
    > img {
      display: block;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      object-fit: cover;
    }
    > div {
      height: 100%;
      position: relative;
      width: ${px2vw(730)};
      > div {
        &:nth-of-type(1) {
          position: relative;
          > p {
            font: 600 22px/1.5 ${({ theme }) => theme.noto};
            letter-spacing: -0.55px;
            margin-bottom: 20px;
            letter-spacing: -0.4px;
            color: ${({ mode }) => (mode == 'light' ? '#151515' : '#ffff')};
          }
          > ul {
            position: absolute;
            display: flex;
            gap: 44px;
            top: 0;
            right: 0;
          }
        }
        &:nth-of-type(2) {
          height: ${(props) => (props.hide == 1 || 0 ? '82px' : 'fit-content')};
          overflow: hidden;
          margin-bottom: 12px;
          > div {
            height: fit-content;
            width: fit-content;
            > p {
              height: fit-content;
              display: block;
              width: fit-content;
              word-break: break-all;
              font: $regular 16px/20px $font-kor;
              font: 400 16px/20px ${({ theme }) => theme.noto};
              letter-spacing: -0.35px;
              white-space: pre-wrap;
              color: ${({ mode }) => (mode == 'light' ? '#707070' : '#ffff')};
            }
          }
        }
      }
      > span {
        font: 600 14px/20px ${({ theme }) => theme.noto};
        color: ${({ theme }) => theme.highlightColor};
        cursor: pointer;
      }
      > p {
        &:nth-of-type(1) {
        }
        &:nth-of-type(2) {
        }
        &:nth-of-type(3) {
          color: #707070;
          font: $regular 14px/20px $font-kor;

          width: max-content;
          position: absolute;
          bottom: 24px;
        }
      }
    }
  }
  > ul {
    flex-wrap: wrap;
    margin-bottom: 222px;
  }
  p.count {
    font: 400 14px/20px ${({ theme }) => theme.noto};
    color: ${({ mode }) => (mode == 'light' ? '#363636' : '#ffff')};
    letter-spacing: -0.35px;
    margin-bottom: 60px;
    > span {
      margin-left: 16px;
      letter-spacing: -0.35px;

      font: 500 14px/20px ${({ theme }) => theme.noto};
    }
  }
  @media (max-width: 858px) {
    min-height: calc(100vh - 284px);
    > .author {
      gap: 32px;
      margin-top: 80px;

      > img {
        width: 160px;
        height: 160px;
      }
      > div {
        > div {
          &:nth-of-type(1) {
            > p {
              font: 600 16px/1.5 ${({ theme }) => theme.noto};
              margin-bottom: 10px;
            }
            > ul {
              gap: 18px;
              img {
                height: 18px;
              }
            }
          }
          &:nth-of-type(2) {
            > div {
              > p {
                font: 400 12px/20px ${({ theme }) => theme.noto};
              }
            }
          }
        }
        > span {
          font: 600 12px/20px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 676px) {
    > .author {
      gap: 18px;
      margin-bottom: 32px;
      margin-top: 40px;

      > img {
        width: 120px;
        height: 120px;
      }
      > div {
        > div {
          &:nth-of-type(1) {
            > p {
              font: 600 14px/1.5 ${({ theme }) => theme.noto};
              margin-bottom: 2px;
            }
            > ul {
              gap: 12px;
              img {
                height: 12px;
              }
            }
          }
          &:nth-of-type(2) {
            margin-bottom: 0px;

            > div {
              > p {
                font: 400 10px/20px ${({ theme }) => theme.noto};
              }
            }
          }
        }
        > span {
          font: 600 10px/20px ${({ theme }) => theme.noto};
        }
      }
    }
    p.count {
      font: 400 10px/20px ${({ theme }) => theme.noto};
      > span {
        font: 500 12px/20px ${({ theme }) => theme.noto};
      }
    }
  }
`;
// 아티스트 디테일 페이지
const AuthorSinglePage = ({ mode }) => {
  const { t } = useTranslation();
  const { serverAddress } = useContext(UserContext);

  const param = useParams();
  const [errorPopup, setErrorPopup] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hide, setHide] = useState(0);
  const desRef = useRef(null);
  const { data, status } = useQuery('author' + param.id, () =>
    getAuthorDetail(param.id)
  );

  useEffect(() => {
    if (desRef?.current) {
      desRef.current.offsetHeight > 90 ? setHide(1) : setHide(2);
    }
  }, [desRef, status]);
  if (status == 'success')
    return (
      <>
        {errorPopup ? (
          <ErrorPopup
            context={apiError}
            errorMessage={errorMessage}
            setErrorPopup={setErrorPopup}
          />
        ) : null}
        <Div hide={hide} mode={mode}>
          {/* <KaKaoBtn /> */}
          <div className="author">
            <img
              src={
                data.profileImgPath
                  ? serverAddress + data.profileImgPath
                  : '/img/author-img.png'
              }
            />
            <div>
              <div>
                <p>{data.authorName}</p>
                <ul>
                  {Array.isArray(data.urls)
                    ? data.urls.map((value, idx) => (
                      <li key={idx}>
                        <a
                          target="_blank"
                          href={
                            value.url.includes('http')
                              ? value.url
                              : 'https://' + value.url
                          }
                        >
                          <img
                            src={
                              value.urlType == '유튜브'
                                ? mode == "true" ? `/img/author-youtube.svg` : `/img/author-dark-youtube.svg`
                                : value.urlType == '인스타그램'
                                  ? mode == "true" ? `/img/author-insta.svg` : `/img/author-dark-insta.svg`
                                  : mode == "true" ? `/img/author-home.svg` : `/img/author-dark-home.svg`
                            }
                          />
                        </a>
                      </li>
                    ))
                    : null}
                </ul>
              </div>
              <div>
                <div ref={desRef} style={{ opacity: hide === 0 ? 0 : 1 }}>
                  <p>{data.description}</p>
                </div>
              </div>
              {hide == 1 ? (
                <span onClick={() => setHide(2)}>{t("author.detail.more")}</span>
              ) : null}
            </div>
          </div>
          <MediaArtListStyle mode={mode}>
            <p className="count">
              <Trans i18nKey={"author.detail.total"} components={[<span></span>]} values={{ value: data.mediaArtList.length }} />
            </p>
            {Array.isArray(data.mediaArtList) ? (
              <ChartUl mode={mode} chartData={data.mediaArtList} />
            ) : null}
          </MediaArtListStyle>
        </Div>
        <Footer mode={mode} />
      </>
    );
};

export default AuthorSinglePage;
