import { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../ContextProvider';
import { getAuthorDetail } from '../../util/axiosGet';
import px2vhMobile from '../../util/px2vhMobile';
import px2vwMobile from '../../util/px2vwMobile';
import MobileHeader from '../components/MobileHeader';
import { MediaArtStyle } from '../components/MediaArtStyle';
import MediaEl from '../components/MediaEl';
import MobileFooter from '../components/MobileFooter';
import LeftNavHeader from '../components/LeftNavHeader';
import KaKaoBtn from '../../Components/KaKaoBtn';

const Div = styled.div`
  min-height: 100vh;
  position: relative;
  h1 {
    color: #151515;
    font: 700 17px ${({ theme }) => theme.noto};
    letter-spacing: -0.4px;
  }
  > div.inner {
    padding: 0 ${px2vwMobile(40)};
    margin-top: ${px2vhMobile(40)};
    padding-bottom: ${px2vhMobile(295)};
    width: 100vw;
    .head {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: ${px2vwMobile(19)};
      margin-bottom: ${px2vwMobile(63)};
      > img {
        width: ${px2vwMobile(240)};
        height: ${px2vwMobile(240)};
        border-radius: 100%;
        object-fit: cover;
      }
      > p {
        font: 700 20px ${({ theme }) => theme.noto};
        letter-spacing: -0.5px;
        word-break: keep-all;
        color: #151515;
      }
    }
    > .des {
      margin-bottom: ${px2vhMobile(80)};
      > h1 {
        font: 700 17px ${({ theme }) => theme.noto};
        letter-spacing: -0.4px;
        margin-bottom: ${px2vhMobile(29)};
      }
      > div {
        max-height: ${(props) =>
          props.desShow === 2 ? props.desMaxheight + 'px' : '78px'};
        overflow: hidden;
        transition: ${({ theme }) => theme.transition};
        > p {
          color: #363636;
          opacity: ${({ desShow }) => (desShow === -1 ? 0 : 1)};
          transition: ${({ theme }) => theme.transition};
          letter-spacing: -0.3px;
          white-space: pre-wrap;
          font: 400 13px/1.5 ${({ theme }) => theme.noto};
          margin-bottom: ${px2vwMobile(48)};
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
    }
    > .mediaArt {
      margin-bottom: ${px2vhMobile(108)};
      > h1 {
        margin-bottom: ${px2vhMobile(16)};
      }
      > p {
        font: 400 13px ${({ theme }) => theme.noto};
        letter-spacing: -0.32px;
        color: #363636;
        > span {
          color: #363636;
          margin-left: ${px2vwMobile(24)};
          font: 500 13px ${({ theme }) => theme.noto};
        }
      }
      > ul {
        margin-top: ${px2vhMobile(48)};
        display: flex;
        gap: ${px2vwMobile(24)};
        flex-wrap: wrap;
      }
      button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: ${px2vwMobile(72)};
        margin-top: ${px2vhMobile(69)};
        > img {
          width: ${px2vwMobile(72)};
          display: block;
        }
      }
    }
    > .link {
      margin-bottom: ${px2vhMobile(116)};
      > h1 {
        margin-bottom: ${px2vhMobile(55)};
      }
      > ul {
        display: flex;
        flex-direction: column;
        gap: ${px2vhMobile(50)};
        > li {
          > a {
            display: flex;
            gap: ${px2vwMobile(34)};
            align-items: center;
            > img {
              width: auto;
              height: ${px2vhMobile(50)};
            }
            > p {
              font: 400 12px/1.3 ${({ theme }) => theme.noto};
              color: #707070;
              letter-spacing: -0.3px;
            }
          }
        }
      }
    }
  }
  > footer {
    position: absolute;
    bottom: 0;
  }
`;

const ArtistSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const desRef = useRef(null);
  const [desShow, setDesShow] = useState(-1);
  const [mediaShow, setMediaShow] = useState(-1);
  const [mediaList, setMediaList] = useState([]);
  const { serverAddress } = useContext(UserContext);
  const { data, isLoading } = useQuery(['author detail', id], () =>
    getAuthorDetail(id)
  );
  useEffect(() => {
    if (!isLoading && data.description) {
      if (desRef.current.offsetHeight) {
        desRef.current.offsetHeight > 78 ? setDesShow(1) : setDesShow(0);
      }
    }
    if (!isLoading && data.mediaArtList) {
      if (data.mediaArtList.length > 6) {
        setMediaShow(1);
        setMediaList([...data.mediaArtList].slice(0, 6));
      } else {
        setMediaShow(0);
        setMediaList(data.mediaArtList);
      }
    }
  }, [desRef, data, isLoading]);
  const description = () => {
    if (data.description && desRef.current) {
      return data.description();
    }
  };

  const urlTypes = (type) => {
    switch (type) {
      case '유튜브':
        return (
          <>
            <img src="/img/mobile-youtube.svg" />
            <p>YOUTUBE</p>
          </>
        );
      case '인스타그램':
        return (
          <>
            <img src="/img/mobile-instagram.svg" />
            <p>INSTAGRAM</p>
          </>
        );
      case '홈페이지':
        return (
          <>
            <img src="/img/mobile-homepage.svg" />
            <p>홈페이지</p>
          </>
        );
    }
  };

  return (
    <Div
      desShow={desShow}
      desMaxheight={desRef.current ? desRef.current.offsetHeight : null}
    >
      <LeftNavHeader />
      {/* <KaKaoBtn mobile={true}/> */}
      <div className="inner">
        {isLoading ? null : (
          <>
            <div className="head">
              <img
                src={
                  data.profileImgPath
                    ? serverAddress + data.profileImgPath
                    : '/img/author-img.png'
                }
              />
              <p>{data.authorName}</p>
            </div>
            {data.description ? (
              <div className="des">
                <h1>설명</h1>
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
            ) : null}
            {data.mediaArtList.length > 0 ? (
              <div className="mediaArt">
                <h1>미디어아트</h1>
                <p>
                  총 작품수<span>{data.mediaArtList.length}개</span>
                </p>
                <ul>
                  {mediaList
                    ? mediaList.map((v) => (
                        <MediaArtStyle key={v.id}>
                          <MediaEl
                            id={v.id}
                            title={v.title}
                            author={v.authorName}
                            profile={data.profileImgPath}
                            thumbnail={v.thumbnailPath}
                          />
                        </MediaArtStyle>
                      ))
                    : null}
                  {mediaShow === 1 ? (
                    <button
                      onClick={() => {
                        setMediaList(data.mediaArtList);
                        setMediaShow(2);
                      }}
                    >
                      <img src="/img/mobile-showmore.svg" />
                    </button>
                  ) : null}
                </ul>
              </div>
            ) : null}
            {data.urls.length > 0 ? (
              <div className="link">
                <h1>링크</h1>
                <ul>
                  {data.urls.map((v, idx) => (
                    <li key={idx}>
                      <a
                        href={
                          v.url.includes('http') ? v.url : 'https://' + v.url
                        }
                        target="_blank"
                      >
                        {urlTypes(v.urlType)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </div>
      <MobileFooter />
    </Div>
  );
};

export default ArtistSingle;
