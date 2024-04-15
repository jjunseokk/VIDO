import React, { useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 100px;
  position: relative;
  left: ${({ theme }) => theme.left};
  width: ${({ theme }) => theme.pgWidth};
  height: 240px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  > img {
    width: ${({ theme }) => theme.pgWidth};
    height: 240px;
    object-fit: cover;
  }
  > div {
    position: absolute;
    color: #f7f7f7;
    bottom: 60px;
    left: 110px;
    span {
      font: 400 16px/24px ${({ theme }) => theme.noto};
      letter-spacing: -0.32px;
    }
    > p {
      font: 500 24px/30px ${({ theme }) => theme.noto};
      color: #fff;
    }
  }
  > p {
    padding: 0 18px;
    font: 500 14px/32px ${({ theme }) => theme.noto};
    position: absolute;
    color: #fff;
    margin-top: 30px;
    width: 120px;
    border-radius: 16px;
    height: 32px;
    border: 1px solid #fff;
    cursor: pointer;
    z-index: 10;
    letter-spacing: -0.14px;
    display: block;
    bottom: 60px;
    right: 110px;
    > svg {
      margin-left: 8px;
    }
  }
`;

const EditorSuggest = () => {
  return (
    <Div>
      <img src="/img/sample.png" />
      <div>
        <span>이달의 에디터 추천</span>
        <p>
          나도 모르게 빠져드는,
          <br />
          신비로운 느낌의 미디어아트
        </p>
      </div>
      <p>
        더 알아보기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7.061"
          height="12.707"
          viewBox="0 0 7.061 12.707"
        >
          <path
            id="패스_817"
            data-name="패스 817"
            d="M6,0,0,6l6,6"
            transform="translate(6.354 12.354) rotate(180)"
            fill="none"
            stroke={'#fff'}
            stroke-width="1"
          />
        </svg>
      </p>
    </Div>
  );
};

export default EditorSuggest;
