import React, { useState, useRef, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import VideoPlayer from '../Components/VideoPlayer';
import { UserContext } from '../ContextProvider';
import { getArtDetail, getArtTag, getAuthorDetail } from '../util/axiosGet';
import px2vw from '../util/px2vw';
import returnTime from '../util/returnTime';
import AuthorOther from './components/AuthorOther';
import SimillarArts from './components/SimillarArts';
import Mock from './components/Mock';
import { useTranslation } from "react-i18next";
import KaKaoBtn from '../Components/KaKaoBtn';

const ArtPg = styled.div`
  position: relative;
  left: ${({ theme }) => theme.left};
  width: ${px2vw(1280)};
  top: 60px;
  height: max-content;
  margin-bottom: 96px;
  > .artInfo {
    display: flex;
    margin-bottom: 60px;
    flex-wrap: wrap;
    position: relative;
    > img {
      width: ${px2vw(730)};
      height: ${px2vw(486)};
      border-radius: 3px;
      object-fit: cover;
    }
    > div {
      position: absolute;
      bottom: 0;
      right: 0;
      width: ${px2vw(510)};
      /* max-height: ${px2vw(486)}; */
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
      > .wrap {
        max-height: calc(${px2vw(486)} - 296px);
        margin-bottom: 32px;
        overflow-y: auto;

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

        > h1 {
          font: 500 24px/36px ${({ theme }) => theme.noto};
          color: ${({ mode }) => (mode == 'light' ? '#151515' : "#ffff")};
          letter-spacing: -0.6px;
          margin-bottom: 20px;
        }
        > p {
          font: 400 16px/24px ${({ theme }) => theme.noto};
          color: ${({ mode }) => (mode == 'light' ? '#363636' : "#ffff")};
          letter-spacing: -0.4px;
          white-space: pre-wrap;
        }
      }
      .tags {
        > ul {
          > li {
            > div {
              display: flex;
              margin-bottom: 13px;
              gap: 12px;
              > p {
                font: 400 14px/30px ${({ theme }) => theme.noto};
                width: max-content;
                word-break: keep-all;
                color: ${({ mode }) => (mode == 'light' ? '#151515' : "#ffff")};
              }
              > div {
                flex-wrap: wrap;
                display: flex;
                gap: 6px;
                > span {
                  padding: 0 15px;
                  height: 30px;
                  border-radius: 15px;
                  /* border: ${({ theme }) => theme.border}; */
                  background-color: ${({ mode }) => (mode == 'light' ? '#ffff' : "")};;
                  transition: ${({ theme }) => theme.transition};
                  width: fit-content;
                  font: 700 14px/30px ${({ theme }) => theme.roboto};
                  color: ${({ mode }) => (mode == 'light' ? '#151515' : "#ffff")};
                  display: block;
                }
              }
            }
          }
        }
      }
      .ect {
        display: flex;
        justify-content: space-between;
        border-bottom: ${({ theme }) => theme.border};
        padding-bottom: 12px;
        > p {
          font: 400 14px/20px ${({ theme }) => theme.noto};
          color: ${({ mode }) => (mode == 'light' ? '#151515' : "#ffff")};
          > span {
            margin-left: 12px;
          }
        }
        span {
          font: 400 14px/20px ${({ theme }) => theme.roboto};
          color: ${({ mode }) => (mode == 'light' ? '#707070' : "#ffff")}; 
        }
      }
    }
    div.author {
      margin-top: 20px;
      max-height: 128px;
      overflow-y: auto;

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
      > div {
        > div {
          justify-content: space-between;
          align-items: center;
          display: flex;
        }
        .toProfile {
          display: flex;
          cursor: pointer;
          gap: 12px;
          img {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 24px;
          }
          p {
            font: 500 16px/48px ${({ theme }) => theme.noto};
            color:  ${({ mode }) => (mode == 'light' ? '#151515' : "#ffff")};
            transition: ${({ theme }) => theme.transition};
            > span {
              margin-left: 12px;

              font: 500 14px ${({ theme }) => theme.noto};
              color: #707070;
            }
          }
          &:hover {
            p {
              color: ${({ theme }) => theme.mainColor};
            }
          }
        }
        .author-sns {
          > ul {
            display: flex;
            gap: 20px;

            > li {
              > img {
                opacity: 0.7;
                width: ${px2vw(24)};
                height: ${px2vw(24)};
              }
            }
          }
        }
      }
      > p {
        font: 400 14px/20px ${({ theme }) => theme.noto};
        margin-top: 16px;
        white-space: pre-wrap;

        color:  ${({ mode }) => (mode == 'light' ? '#707070' : "#ffff")};
      }
    }
  }
  .vidCont {
    position: relative;
    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: all 0.2s;
      z-index: 20;
    }
    > video {
      width: ${px2vw(1280)};
      height: ${px2vw(852)};
      background-color: #151515;
    }
  }
  .line {
    width: ${({ theme }) => theme.pgWidth};
    height: 1px;
    background-color: #e0e0e0;
    margin-top: 80px;
  }
  @media (max-width: 1496px) {
    .artInfo {
      > div {
        > .wrap {
          max-height: calc(${px2vw(486)} - 180px);

          > h1 {
            font: 500 20px ${({ theme }) => theme.noto};
            margin-bottom: 16px;
          }
          > p {
            font: 400 14px ${({ theme }) => theme.noto};
          }
        }
        > .tags {
          > ul > li > div {
            margin-bottom: 10px;
            gap: 10px;
            > p {
              font: 500 12px/24px ${({ theme }) => theme.noto};
            }
            > div {
              > span {
                padding: 0 10px;
                height: 24px;
                font: 400 12px/24px ${({ theme }) => theme.roboto};
              }
            }
          }
        }
        > .ect {
          padding-bottom: 8px;
          > p {
            font: 600 12px/20px ${({ theme }) => theme.noto};
          }
        }
        > .author {
          margin-top: 16px;
          max-height: 100px;

          > div {
            .toProfile {
              gap: 10px;
              img {
                width: 36px;
                height: 36px;
              }
              p {
                font: 500 16px/36px ${({ theme }) => theme.noto};
                > span {
                  font: 500 12px ${({ theme }) => theme.noto};
                }
              }
            }
          }
          > p {
            font: 400 12px/18px ${({ theme }) => theme.noto};
            margin-top: 16px;
          }
        }
      }
    }
  }

  @media (max-width: 1244px) {
    .artInfo {
      > div {
        > .wrap {
          margin-bottom: 6px;

          max-height: calc(${px2vw(486)} - 170px);

          > h1 {
            font: 500 20px ${({ theme }) => theme.noto};
            margin-bottom: 16px;
          }
          > p {
            font: 400 14px ${({ theme }) => theme.noto};
          }
        }
        > .tags {
          > ul > li > div {
            margin-bottom: 8px;
            gap: 10px;
            > p {
              font: 500 12px/18px ${({ theme }) => theme.noto};
            }
            > div {
              > span {
                padding: 0 10px;
                height: 18px;
                font: 400 12px/18px ${({ theme }) => theme.roboto};
              }
            }
          }
        }
        > .ect {
          padding-bottom: 8px;
          > p {
            font: 600 10px/20px ${({ theme }) => theme.noto};
          }
          span {
            font: 400 10px/20px ${({ theme }) => theme.roboto};
          }
        }
        > .author {
          margin-top: 12px;
          max-height: 80px;

          > div {
            .toProfile {
              gap: 10px;
              img {
                width: 32px;
                height: 32px;
              }
              p {
                font: 500 16px/32px ${({ theme }) => theme.noto};
                > span {
                  font: 500 12px ${({ theme }) => theme.noto};
                }
              }
            }
          }
          > p {
            font: 400 12px/18px ${({ theme }) => theme.noto};
            margin-top: 8px;
          }
        }
      }
    }
  }
  @media (max-width: 1048px) {
    top: 42px;
    .artInfo {
      > div {
        > .wrap {
          max-height: calc(${px2vw(486)} - 130px);

          > h1 {
            font: 500 18px ${({ theme }) => theme.noto};
            margin-bottom: 2px;
          }
          > p {
            font: 400 12px ${({ theme }) => theme.noto};
          }
        }
        .tags {
          > ul > li > div {
            margin-bottom: 4px;
            gap: 8px;
            > p {
              font: 500 10px/20px ${({ theme }) => theme.noto};
            }
            > div {
              > span {
                padding: 0 10px;
                height: 18px;
                font: 400 10px/18px ${({ theme }) => theme.roboto};
              }
            }
          }
        }
        > .ect {
          padding-bottom: 2px;
          > p {
            font: 600 10px/15px ${({ theme }) => theme.noto};
          }
          span {
            font: 400 10px/15px ${({ theme }) => theme.noto};
          }
        }
        > .author {
          margin-top: 6px;
          max-height: 80px;

          > div {
            .toProfile {
              gap: 4px;
              img {
                width: 24px;
                height: 24px;
              }
              p {
                font: 500 14px/24px ${({ theme }) => theme.noto};
                > span {
                  font: 500 10px ${({ theme }) => theme.noto};
                }
              }
            }
          }
          > p {
            font: 400 10px/15px ${({ theme }) => theme.noto};
            margin-top: 8px;
          }
        }
      }
    }
  }
  @media (max-width: 762px) {
    top: 24px;
    .artInfo {
      > img {
        border-radius: 3px;
      }
      > div {
        > .wrap {
          max-height: calc(${px2vw(486)} - 90px);
          > h1 {
            font: 500 12px ${({ theme }) => theme.noto};
            margin-bottom: 2px;
          }
          > p {
            font: 400 10px ${({ theme }) => theme.noto};
          }
        }
        .tags {
          > ul > li > div {
            margin-bottom: 4px;
            gap: 8px;
            > p {
              font: 500 10px/12px ${({ theme }) => theme.noto};
            }
            > div {
              gap: 2px;
              > span {
                padding: 0 3px;
                height: 12px;
                font: 400 10px/12px ${({ theme }) => theme.roboto};
              }
            }
          }
        }
        > .ect {
          padding-bottom: 2px;
          > p {
            font: 600 10px/15px ${({ theme }) => theme.noto};
            > span {
              margin-left: 4px;
            }
          }
          span {
            font: 400 10px/15px ${({ theme }) => theme.noto};
          }
        }
        > .author {
          margin-top: 6px;
          max-height: 16px;

          > div {
            .toProfile {
              gap: 4px;
              img {
                width: 16px;
                height: 16px;
              }
              p {
                font: 500 10px/16px ${({ theme }) => theme.noto};
                > span {
                  font: 500 10px ${({ theme }) => theme.noto};
                }
              }
            }
          }
          > p {
            display: none;
            font: 400 10px/12px ${({ theme }) => theme.noto};
            margin-top: 4px;
          }
        }
      }
    }
  }
`;

const ArtDetail = ({ mode }) => {
  const { t } = useTranslation();
  const { serverAddress } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  const { data, status, isLoading } = useQuery(`artDetail ${params.id}`, () =>
    getArtDetail(params.id)
  );
  const authorData = useQuery(
    ['author', !isLoading ? data.author.id : null],
    () => getAuthorDetail(!isLoading ? data.author.id : null)
  );
  const tags = useQuery(['tags', params.id], () => getArtTag(params.id));

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  // useEffect(() => {
  //   if (videoRef != null) {
  //     videoRef.current.onPlaying = () => setPlaying(true);
  //   }
  // }, [videoRef]);
  if (status === 'success')
    return (
      <div style={{ background: mode == 'light' ? "#ffff" : "#151515" }}>
        {/* <KaKaoBtn /> */}
        <ArtPg mode={mode}>
          <div className="artInfo">
            <img src={serverAddress + data.thumbnailPath} alt="thumbnail" />
            <div>
              <div className="wrap">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
              </div>
              <div className="tags">
                <ul>
                  <li>
                    <div>
                      <p>{t("media_art.tag.genre")}</p>
                      <div>
                        {tags.data && Array.isArray(tags.data.genre)
                          ? tags.data.genre.map((value) => (
                            <span key={value.id}>#{value.tag}</span>
                          ))
                          : null}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>{t("media_art.tag.mood")}</p>
                      <div>
                        {tags.data && Array.isArray(tags.data.mood)
                          ? tags.data.mood.map((value) => (
                            <span key={value.id}>#{value.tag}</span>
                          ))
                          : null}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="ect">
                <p>
                  {t("media_art.detail.running_time")}
                  <span>
                    {returnTime(data.playtime).map((val, idx) =>
                      idx == 0 ? val : `:${val}`
                    )}
                  </span>
                </p>
                <span>{data.createdDatetime.slice(0, 10)}</span>
              </div>
              <div className="author">
                <div>
                  <div>
                    <div
                      className="toProfile"
                      onClick={() =>
                        navigate(`/author/detail/${data.author.id}`)
                      }
                    >
                      <img
                        src={
                          data.author.profileImgPath
                            ? serverAddress + data.author.profileImgPath
                            : '/img/author-img.png'
                        }
                        alt="profile"
                      />
                      <p>
                        {data.authorName}
                        {data.author.userType.id == 1 ? null : (
                          <span>- {data.author.authorName}</span>
                        )}
                      </p>
                    </div>
                    {authorData.isFetched ? (
                      <div className="author-sns">
                        <ul>
                          {authorData.data.urls.map((value, idx) => (
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
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
                <p>{data.author.description}</p>
              </div>
            </div>
          </div>
          {/* <div className="vidCont" onClick={() => setPlaying((prev) => !prev)}>
            {!playing ? (
              <img
                onClick={() =>
                  videoRef.current ? videoRef.current.play() : null
                }
                src="/img/bigplay.svg"
              />
            ) : null}
            <video controls ref={videoRef}>
              <source src={serverAddress + data.previewPath} />
            </video>
          </div> */}
          <VideoPlayer mode={mode} src={serverAddress + data.previewPath} />
          <Mock basic={data?.thumbnailPath} artId={params.id} />
          <div className="line"></div>
          <SimillarArts mode={mode} id={params.id} />
          <AuthorOther mode={mode} authorId={data.author.id} />
        </ArtPg>
        <Footer mode={mode} />
      </div>
    );
};

export default ArtDetail;
