import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import ContextProvider from '../../../ContextProvider';
import { getTop10 } from '../../../util/axiosGet';
import px2vhMobile from '../../../util/px2vhMobile';
import px2vwMobile from '../../../util/px2vwMobile';
import MediaEl from '../../components/MediaEl';
import { Title } from '../../components/Title';
import Swipe, { onSwipeMove, onSwipeEnd } from 'react-easy-swipe';

const Div = styled.div`
  width: 100vw;
  overflow: hidden;
  margin-bottom: ${px2vhMobile(160)};
  > h1 {
    margin-left: ${px2vwMobile(40)};
    margin-bottom: ${px2vhMobile(16)};
  }
  > p {
    margin-left: ${px2vwMobile(40)};
    font: 400 14px ${({ theme }) => theme.noto};
    color: #363636;
    letter-spacing: -0.35;
    margin-bottom: ${px2vhMobile(49)};
  }
  ul {
    margin-left: ${px2vwMobile(40)};
    transform: translateX(${(props) => `calc(${props.x}px )`});
    transition: ${({ theme }) => theme.transition};
    display: flex;
    width: max-content;
    align-items: center;
    > .idx {
      > div {
        width: ${px2vwMobile(720)};
        height: ${px2vwMobile(720)};
        > img {
          width: ${px2vwMobile(720)};
          height: ${px2vwMobile(480)};
        }
        .number {
          font: italic 900 55.3px/1.2 ${({ theme }) => theme.roboto};
        }
        > div > img {
          width: ${px2vwMobile(100)};
          height: ${px2vwMobile(100)};
        }
      }
    }
    > li {
      margin-right: ${px2vwMobile(24)};
      > div {
        width: ${px2vwMobile(480)};
        height: ${px2vwMobile(480)};
        transition: ${({ theme }) => theme.transition};
        position: relative;
        .number {
          transition: ${({ theme }) => theme.transition};
          position: absolute;
          top: 0;
          left: ${px2vwMobile(16)};
          font: italic 900 33.3px/39px ${({ theme }) => theme.roboto};
          color: #fff;
        }
        > img {
          width: ${px2vwMobile(480)};
          height: ${px2vwMobile(320)};
          object-fit: cover;
          display: block;
          border-radius: ${px2vwMobile(4)};
          margin-bottom: ${px2vwMobile(16)};
          transition: ${({ theme }) => theme.transition};
        }
        > div {
          display: flex;
          gap: ${px2vwMobile(30)};
          transition: ${({ theme }) => theme.transition};
          > img {
            border-radius: ${px2vwMobile(50)};
            margin-bottom: ${px2vwMobile(5)};
            transition: ${({ theme }) => theme.transition};
          }
          > div {
            .title {
              transition: ${({ theme }) => theme.transition};
              font: 500 12px ${({ theme }) => theme.noto};
              word-break: keep-all;
              color: #151515;
              margin-bottom: ${px2vwMobile(6)};
            }
            .authorName {
              font: 400 10px ${({ theme }) => theme.noto};
              transition: ${({ theme }) => theme.transition};
              color: #707070;
            }
          }
        }
      }
    }
  }
  .horizontal-scroll {
    width: calc(100%);
    overflow-x:scroll;
    white-space:nowrap;
    -ms-overflow-style: none;
    scrollbar-width:none;
  }
  .horizontal-scroll::-webkit-scrollbar {
    display: none;
  }
`;

const El = styled.div``;

const Top10 = () => {
  const { data, isLoading } = useQuery('top10', getTop10);
  const [positionX, setPositionX] = useState(0);
  const [swipeAmount, setSwipeAmount] = useState(0);
  const [idx, setIdx] = useState(1);
  const windowWidth = window.innerWidth;
  const ulRef = useRef(null);
  const onSwipeMove = (position) => {
    setSwipeAmount(() => position.x);
    setPositionX((prev) => prev + position.x);
  };
  const onSwipeEnd = (position) => {
    if (positionX + swipeAmount > 0) {
      setPositionX(0);
    }
    if (
      positionX + swipeAmount <
      -ulRef.current.offsetWidth + windowWidth - 60
    ) {
      setPositionX(-ulRef.current.offsetWidth + windowWidth - 60);
    }
    setSwipeAmount(() => 0);
  };
  // useEffect(() => {
  //   const elWidth = ulRef.current.offsetWidth / 9;
  //   setIdx(-Math.floor(positionX / elWidth));
  // }, [positionX]);
  // useEffect(() => {
  //   if (ulRef.current.children.length === 10) {
  //     for (let i = 0; i < 10; i++) {
  //       if (i === idx) {
  //         ulRef.current.children[idx].className = 'idx';
  //       } else {
  //         ulRef.current.children[i].className = '';
  //       }
  //     }
  //   }
  // }, [idx, ulRef]);
  return (
    <Div x={positionX}>
      <Title eng>VIDO TOP 10</Title>
      <p>VIDO에서 가장 많이 보는 미디어아트</p>
      <div className="horizontal-scroll">
      <ul ref={ulRef}>
          {Array.isArray(data)
            ? data.map((v, idx) => (
                <li key={v.id}>
                  <MediaEl
                    number={idx + 1}
                    id={v.id}
                    title={v.title}
                    author={v.author.authorName}
                    profile={v.author.profileImgPath}
                    thumbnail={v.thumbnailPath}
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
    </Div>
  );
};

export default Top10;
