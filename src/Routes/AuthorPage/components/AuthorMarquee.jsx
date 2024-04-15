import React, { useState, useContext } from 'react';
import { UserContext } from '../../ContextProvider';
import AuthorSingle from './AuthorSingle';
import { useNavigate } from 'react-router-dom';
import px2vw from '../../util/px2vw';
import styled from 'styled-components';

const Div = styled.div`
  position: relative;
  width: ${({ theme }) => theme.pgWidth};
  > ul {
    display: flex;
    gap: ${({ gap }) => px2vw(gap)};
    position: relative;
    left: ${({ scroll }) => px2vw(-270 * scroll)};
    transition: ${({ theme }) => theme.transition};
    animation: slideIn 1.2s ease-in-out;
    > li {
      width: ${px2vw(200)};
    }
  }
  > .cover {
    top: 0;
    width: ${({ theme }) => theme.left};
    height: 110%;
    position: absolute;
    left: -${({ theme }) => theme.left};
    background-color: ${({ mode }) => (mode == 'light' ? '#fff' : '#151515')};
    &:nth-of-type(2) {
      left: ${({ theme }) => theme.pgWidth};
    }
  }
  > button {
    position: absolute;
    top: ${px2vw(80)};
    left: -20px;
    &.right {
      left: calc(${({ theme }) => theme.pgWidth} - 20px);
    }
  }
  @keyframes slideIn {
    from {
      left: -150%;
      opacity: 0;
    }
    to {
      left: 0;
      opacity: 1;
    }
  }
  @media (max-width: 824px) {
    > button {
      width: 32px;
      left: -12px;

      > img {
        width: 32px;
      }
      &.right {
        left: calc(${({ theme }) => theme.pgWidth} - 12px);
      }
    }
  }
`;
// 오늘의 추천 아티스트 목록
const AuthorMarquee = ({ data, mode, scroll, gap }) => {
  const navigate = useNavigate();
  const authorSinglePage = (id) => navigate(`/author/detail/${id}`);

  const { serverAddress } = useContext(UserContext);

  return (
    <Div gap={gap} mode={mode} scroll={scroll}>
      <ul
        initial={{ x: '-200%', opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
        }}
      >
        {data?.map((value) => (
          <li key={value.id}>
            <AuthorSingle
              size={'big'}
              mode={mode}
              onClick={() => authorSinglePage(value.id)}
              profImg={
                value.profileImgPath
                  ? serverAddress + value.profileImgPath
                  : '/img/author-img.png'
              }
              authorName={value.authorName}
            />
          </li>
        ))}
      </ul>
      <div className="cover"></div>
      <div className="cover"></div>

    </Div>
  );
};

export default AuthorMarquee;
