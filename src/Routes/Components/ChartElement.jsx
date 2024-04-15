import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import px2vw from '../util/px2vw';
import styled from 'styled-components';

const El = styled.div`
  position: relative;
  width: ${(props) => px2vw(props.imgSize)};
  height: ${(props) => (props.authorId ? px2vw(303) : px2vw(220))};
  cursor: pointer;
  > div {
    &:nth-of-type(1) {
      border-radius: 4px;
      transition: ${({ theme }) => theme.transition};
      overflow: hidden;
      height: ${(props) => px2vw((props.imgSize / 3) * 2)};
      img {
        cursor: pointer;
        width: ${(props) => px2vw(props.imgSize)};
        height: ${(props) => px2vw((props.imgSize / 3) * 2)};
        border-radius: 4px;
        object-fit: cover;
        transition: ${({ theme }) => theme.transition};
      }
    }
    &:nth-of-type(2) {
      position: relative;
      // justify-content: space-between;
      .prof {
        position: absolute;
        top: ${(props) => (props.imgSize > 240 ? -20 : -15)}px;
        right: 12px;
        > img {
          position: relative;
          z-index: 10;
          background: #fff;
          /* outline: 2px solid
        ${({ mode }) => (mode == 'light' ? '#fff' : '#151515')}; */
          height: ${(props) => (props.imgSize > 240 ? 48 : 36)}px;
          width: ${(props) => (props.imgSize > 240 ? 48 : 36)}px;
          border-radius: 100%;
          object-fit: cover;
        }
        &::after {
          z-index: 1;
          display: block;
          content: '';
          position: absolute;
          top: -2px;
          width: ${(props) => (props.imgSize > 240 ? 52 : 40)}px;
          height: ${(props) => (props.imgSize > 240 ? 52 : 40)}px;
          right: -2px;
          border-radius: 100%;
          bottom: -2px;
          left: -2px;
          background-color: ${({ mode }) =>
            mode == 'light' ? '#fff' : '#151515'};
        }
      }
      p {
        // text-align: right;
        text-align: left;
        cursor: pointer;
        &:nth-of-type(1) {
          padding-top: 8px;
          font-family: ${({ theme }) => theme.noto};
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
          color: ${({ mode }) => (mode == 'light' ? '#151515' : '#fff')};
          font-weight: 500;
          transition: all 0.2s ease-in;
          display: block;
          width: ${px2vw(185)};
        }
        &:nth-of-type(2) {
          padding-top: 4px;
          font-family: ${({ theme }) => theme.noto};

          letter-spacing: -0.35px;
          font-size: 14px;
          line-height: 20px;
          color: ${({ mode }) => (mode == 'light' ? '#707070' : '#E0E0E0')};
          font-weight: 400;
          &:hover {
            color: ${({ theme }) => theme.highlightColor};
          }
        }
      }
    }
  }
  &:hover {
    > div {
      &:nth-of-type(1) {
        img {
          transform: scale(1.4);
        }
      }
    }
    p {
      &:nth-of-type(1) {
        color: ${({ theme }) => theme.highlightColor};
      }
    }
  }
  @media (max-width: 1492px) {
    > div {
      &:nth-of-type(2) {
        p {
          &:nth-of-type(1) {
            font-size: 14px;
            line-height: 16px;
          }
          &:nth-of-type(2) {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }
  }
  @media (max-width: 1112px) {
    > div {
      &:nth-of-type(2) {
        p {
          &:nth-of-type(1) {
            font-size: 10px;
            line-height: 1;
          }
          &:nth-of-type(2) {
            font-size: 10px;
            line-height: 1;
          }
        }
      }
    }
  }
  @media (max-width: 862px) {
    > div:nth-of-type(2) {
      .prof {
        top: ${(props) => (props.imgSize > 240 ? -15 : -10)}px;
        right: 8px;
        > img {
          height: ${(props) => (props.imgSize > 240 ? 32 : 18)}px;
          width: ${(props) => (props.imgSize > 240 ? 32 : 18)}px;
        }
        &:after {
          width: ${(props) => (props.imgSize > 240 ? 36 : 22)}px;
          height: ${(props) => (props.imgSize > 240 ? 36 : 22)}px;
        }
      }
    }
  }
`;

const ChartElement = ({
  imgsrc,
  title,
  author,
  id,
  profImg,
  authorId,
  imgSize = 303,
  mode
}) => {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  const reduceStr = (str, len) => {
    if (screenSize.dynamicWidth > 1600) {
      return str?.length > len ? str?.slice(0, len - 3) + '...' : str;
    }
    if (screenSize.dynamicWidth > 1400) {
      return str?.length > len * 0.9
        ? str?.slice(0, parseInt(len * 0.9) - 3) + '...'
        : str;
    }
    if (screenSize.dynamicWidth > 1200) {
      return str?.length > len * 0.6 ? str?.slice(0, len * 0.6 - 3) + '...' : str;
    }
    if (screenSize.dynamicWidth > 100) {
      return str?.length > len * 0.3 ? str?.slice(0, len * 0.3 - 3) + '...' : str;
    }
  };
  let navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/media-art/detail/${id}`);
  };

  return (
    <El imgSize={imgSize} authorId={authorId} mode={mode}>
      <div>
        <img src={imgsrc} alt={title} onClick={goToDetail} />
      </div>
      <div>
        {/* {authorId ? (
          <div className="prof">
            <img
              src={profImg}
              onClick={() => navigate(`/author/detail/${authorId}`)}
            />
          </div>
        ) : null} */}
        <div>
          <p onClick={goToDetail}> {reduceStr(title, 22)}</p>
          {authorId ? (
            <p onClick={() => navigate(`/author/detail/${authorId}`)}>
              {reduceStr(author, 32)}
            </p>
          ) : null}
        </div>
      </div>
    </El>
  );
};

export default ChartElement;
