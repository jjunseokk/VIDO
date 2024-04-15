import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider';
import {
  getArtDetail,
  getSimillarArt,
  getArtTag,
  getAuthorDetail,
} from '../../util/axiosGet';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';
import LeftNavHeader from '../components/LeftNavHeader';
import MobileFooter from '../components/MobileFooter';
import MobileHeader from '../components/MobileHeader';
import MediaArtMarquee from './components/MediaArtMarquee';
import KaKaoBtn from '../../Components/KaKaoBtn';

const Div = styled.div`
  .inner {
    min-height: calc(100vh - ${px2vhMobile(400)});
    > video {
      width: ${px2vwMobile(1080)};
      height: ${px2vwMobile(719)};
      background-color: #2b2b2b;
    }
    > .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 ${px2vwMobile(40)};
      border-bottom: ${({ theme }) => theme.border};
      .author {
        display: flex;
        gap: ${px2vwMobile(20)};
        align-items: center;
        height: ${px2vwMobile(154)};
        > img {
          width: ${px2vhMobile(100)};
          height: ${px2vhMobile(100)};
          border-radius: 100%;
          object-fit: cover;
          display: block;
        }
        > p {
          letter-spacing: -0.33px;
          font: 400 13px ${({ theme }) => theme.noto};
          color: #363636;
        }
      }
      > .date {
        font: 400 13px ${({ theme }) => theme.roboto};
        color: #707070;
        letter-spacing: 0.8px;
      }
    }
    > .infoOther {
      margin-top: ${px2vhMobile(16)};
      padding: 0 ${px2vwMobile(40)};
      .des {
        > div {
          max-height: ${(props) =>
    props.desShow === 2 ? props.desMaxheight + 'px' : '58.5px'};
          overflow: hidden;
          transition: ${({ theme }) => theme.transition};
          white-space: pre-wrap;
          > p {
            opacity: ${({ desShow }) => (desShow === -1 ? 0 : 1)};
            letter-spacing: -0.33px;
            font: 400 13px/1.5 ${({ theme }) => theme.noto};
            color: #363636;
          }
        }
        > button {
          transition: ${({ theme }) => theme.transition};
          margin-top: ${px2vhMobile(16)};
          font: 400 12px ${({ theme }) => theme.noto};
          color: #707070;
          width: 100%;
          display: block;
        }
        margin-bottom: ${px2vhMobile(83)};
      }
      > .other {
        ul {
          display: flex;
          flex-direction: column;
          gap: ${px2vhMobile(35)};
          li {
            display: grid;
            grid-template-columns: ${px2vwMobile(246)} 1fr;
            width: 100%;
            > .title {
              font: 400 14px ${({ theme }) => theme.noto};
              color: #707070;
              letter-spacing: -0.28px;
            }
            &.time {
              > span {
                font: 400 14px ${({ theme }) => theme.noto};
                color: #363636;
                letter-spacing: 0.56px;
              }
            }
            &.tag {
              div {
                display: flex;
                flex-wrap: wrap;
                gap: ${px2vhMobile(13)} ${px2vwMobile(15)};
                > span {
                  font: 400 11.5px/1 ${({ theme }) => theme.roboto};
                  color: #151515;
                  padding: ${px2vhMobile(17)} ${px2vwMobile(41)}
                    ${px2vhMobile(15)} ${px2vwMobile(35)};
                  border-radius: ${px2vhMobile(45)};
                  border: ${({ theme }) => theme.border};
                }
              }
            }
          }
        }
      }
    }
    > .otherArts {
      margin-top: ${px2vhMobile(142)};
      .select {
        display: flex;
        justify-content: space-between;
        padding: 0 ${px2vwMobile(40)};
        border-bottom: ${({ theme }) => theme.border};
        padding-bottom: ${px2vhMobile(23)};
        margin-bottom: ${px2vhMobile(46)};
        > li {
          font: 700 14px ${({ theme }) => theme.noto};
          letter-spacing: -0.3;
          color: #363636;
          &.selected {
            color: ${({ theme }) => theme.highlightColor};
          }
        }
      }
    }
  }
  @media (max-width: 320px) {
    .inner > .otherArts .select > li {
      font: 700 11px ${({ theme }) => theme.noto};
    }
  }
`;

const MediaArtSingle = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(['art', id], () => getArtDetail(id));
  const tags = useQuery(['tags', id], () => getArtTag(id));
  const simillarArt = useQuery(['simillar', id], () => getSimillarArt(id));
  const authorData = useQuery(
    ['author', !isLoading ? data.author.id : null],
    () => getAuthorDetail(!isLoading ? data.author.id : null)
  );
  const { serverAddress } = useContext(UserContext);
  const navigate = useNavigate();
  const desRef = useRef();
  const [whichArt, setWhichArt] = useState(0);
  const [desShow, setDesShow] = useState(-1);
  const getPlaytime = (time) => {
    return `${parseInt(time / 360) > 10
        ? parseInt(time / 360)
        : '0' + parseInt(time / 360)
      }:${parseInt(time / 60) > 10 ? parseInt(time / 60) : '0' + parseInt(time / 60)
      }:${parseInt(time % 60) > 10 ? parseInt(time % 60) : '0' + parseInt(time % 60)
      }`;
  };

  useEffect(() => {
    if (!isLoading && data.description) {
      if (desRef.current) {
        desRef.current.offsetHeight > 60 ? setDesShow(1) : setDesShow(0);
      }
    }
  }, [isLoading, data, desRef]);
  return (
    <Div
      desShow={desShow}
      desMaxheight={desRef.current ? desRef.current.offsetHeight : null}
    >
      {/* <KaKaoBtn mobile={true} /> */}
      <LeftNavHeader title={data?.title} />
      <div className="inner">
        {isLoading ? null : (
          <>
            <video
              controls
              playsInline
              src={serverAddress + data.previewPath}
            />
            <div className="info">
              <div
                className="author"
                onClick={() => navigate(`/author/detail/${data.author.id}`)}
              >
                <img src={serverAddress + data.author.profileImgPath} />
                <p>
                  {data.author.authorName != data.authorName
                    ? `${data.authorName} - ${data.author.authorName}`
                    : data.authorName}
                </p>
              </div>
              <p className="date">{data.createdDatetime.slice(0, 10)}</p>
            </div>
            <div className="infoOther">
              {data.description && (
                <div className="des">
                  <div>
                    <p ref={desRef}>{data.description}</p>
                  </div>
                  {desShow > 0 ? (
                    <button
                      onClick={() =>
                        desShow === 1 ? setDesShow(2) : setDesShow(1)
                      }
                    >
                      {desShow === 1 ? '더보기' : '닫기'}
                    </button>
                  ) : null}
                </div>
              )}
              {tags.isLoading ? null : (
                <div className="other">
                  <ul>
                    <li className="tag">
                      <p className="title">장르</p>
                      <div>
                        {tags.data.genre.map((v) => (
                          <span key={v.id}>#{v.tag}</span>
                        ))}
                      </div>
                    </li>
                    <li className="tag">
                      <p className="title">무드</p>
                      <div>
                        {tags.data.mood.map((v) => (
                          <span key={v.id}>#{v.tag}</span>
                        ))}
                      </div>
                    </li>
                    <li className="time">
                      <p className="title">러닝타임</p>
                      <span>{getPlaytime(data.playtime)}</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="otherArts">
              <ul className="select">
                <li
                  className={whichArt === 0 ? 'selected' : null}
                  onClick={() => setWhichArt(0)}
                >
                  비슷한 느낌의 미디어아트
                </li>
                <li
                  className={whichArt === 1 ? 'selected' : null}
                  onClick={() => setWhichArt(1)}
                >
                  아티스트의 다른 미디어아트
                </li>
              </ul>

              {!authorData?.isLoading && !simillarArt?.isLoading ? (
                <MediaArtMarquee
                  artList={
                    whichArt === 0
                      ? simillarArt.data
                      : authorData.data.mediaArtList
                  }
                />
              ) : null}
            </div>
          </>
        )}
      </div>
      <MobileFooter />
    </Div>
  );
};

export default MediaArtSingle;
