import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const Author = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > div {
    width: ${(props) => (props.size === 'small' ? px2vw(120) : px2vw(180))};
    height: ${(props) => (props.size === 'small' ? px2vw(120) : px2vw(180))};
    border-radius: 50%;
    overflow: hidden;
    > img {
      border-radius: 50%;
      height: ${(props) => (props.size === 'small' ? px2vw(120) : px2vw(180))};
      width: ${(props) => (props.size === 'small' ? px2vw(120) : px2vw(180))};
      object-fit: cover;
      transition: ${({ theme }) => theme.transition};
    }
    > div {
      height: ${(props) => (props.size === 'small' ? px2vw(120) : px2vw(180))};
      width: ${(props) => (props.size === 'small' ? px2vw(120) : px2vw(180))};
      background-color: #707070;
    }
  }
  > p {
    font-size: ${(props) => (props.size === 'small' ? '18px' : '20px')};
    font-family: ${({ theme }) => theme.noto};
    color: ${({ mode }) => (mode == 'light' ? '#151515' : '#fff')};
    font-weight: 400;
    margin-top: 11px;
    text-align: center;
    letter-spacing: -0.45px;
    transition: ${({ theme }) => theme.transition};
  }
  &:hover {
    img {
      transform: scale(1.2);
    }
    p {
      color: ${({ theme }) => theme.highlightColor};
    }
  }
  @media (max-width: 1492px) {
    > p {
      font-size: ${(props) => (props.size === 'small' ? '14px' : '16px')};
      line-height: 16px;
    }
  }
  @media (max-width: 1112px) {
    > p {
      font-size: ${(props) => (props.size === 'small' ? '12px' : '14px')};
      line-height: 14px;
    }
  }
  @media (max-width: 686px) {
    > p {
      font-size: 10px;
      line-height: 12px;
    }
  }
`;

const AuthorSingle = ({
  profImg,
  authorName,
  size,
  onClick = () => {},
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
      return str.length > len ? str.slice(0, len - 3) + '...' : str;
    }
    if (screenSize.dynamicWidth > 1400) {
      return str.length > len * 0.9
        ? str.slice(0, parseInt(len * 0.9) - 3) + '...'
        : str;
    }
    if (screenSize.dynamicWidth > 1200) {
      return str.length > len * 0.6 ? str.slice(0, len * 0.6 - 3) + '...' : str;
    }
    if (screenSize.dynamicWidth > 100) {
      return str.length > len * 0.3 ? str.slice(0, len * 0.3 - 3) + '...' : str;
    }
  };
  return (
    // 아티스트 리스트 목록(이미지 / 작가이름) 컴포넌트
    <Author onClick={onClick} size={size} mode={mode}>
      <div>
        {profImg ? <img src={profImg} /> : <img src="/img/author-img.png" />}
        {/* {profImg ? <img src={profImg} /> : <img src="/img/author-img.png" />} */}
      </div>
      <p>{reduceStr(authorName, 18)}</p>
    </Author>
  );
};

export default AuthorSingle;
