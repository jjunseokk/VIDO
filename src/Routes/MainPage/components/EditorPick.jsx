import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getEditorPick } from '../../util/axiosGet';
import styled from 'styled-components';
import { errorState } from '../../util/recoilState';
import { useSetRecoilState } from 'recoil';
import px2vw from '../../util/px2vw';
import { UserContext } from '../../ContextProvider';

const Div = styled.div`
  height: 623px;
  margin-bottom: 100px;
  width: 200vw;
  position: relative;
  left: ${({ theme }) => theme.left};

  h1 {
    font: 600 22px/33px ${({ theme }) => theme.noto};
    letter-spacing: -0.44px;
    margin-bottom: 24px;
  }
  > div.wrap {
    display: flex;
    position: relative;
    left: ${({ index, theme }) => (index == 0 ? 0 : '-' + theme.pgWidth)};
    transition: ${({ theme }) => theme.transition};
    > div {
      > div.el {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        &::after {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          content: '';
          width: 100%;
          height: 100%;
          background-color: #151515;
          opacity: 0.3;
          transition: all 0.2s;
        }
        &:nth-of-type(1) {
          float: left;
          width: ${px2vw(852)};
          height: 568px;
          margin-right: ${px2vw(8)};
          > img {
            width: ${px2vw(852)};
            height: 568px;
            object-fit: cover;
            transition: ${({ theme }) => theme.transition};
          }
        }
        &:nth-of-type(2),
        &:nth-of-type(3) {
          width: ${px2vw(420)};
          height: 280px;
          > img {
            object-fit: cover;
            width: ${px2vw(420)};
            height: 280px;
            transition: ${({ theme }) => theme.transition};
          }
        }
        &:nth-of-type(2) {
          margin-bottom: 8px;
        }
        > p {
          z-index: 10;
          position: absolute;
          white-space: pre-wrap;
          word-break: keep-all;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font: 500 16px/32px ${({ theme }) => theme.noto};
          color: #fff;
        }
        &:hover {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }
  > div.layout {
    > .hide {
      position: absolute;
      top: 50px;
      left: -${({ theme }) => theme.left};
      width: ${({ theme }) => theme.left};
      background-color: #fff;
      opacity: 1;
      height: 100%;
      &:nth-of-type(2) {
        left: ${({ theme }) => theme.pgWidth};
      }
    }
    > img {
      position: absolute;
      cursor: pointer;
      width: 40px;
      height: 40px;
      z-index: 20;
      top: 320px;
      border-radius: 20px;
      box-shadow: ${({ theme }) => theme.boxShadow};
      left: -20px;
      &.right {
        left: calc(${({ theme }) => theme.pgWidth} - 20px);
      }
    }
  }
  @media (min-width: 1724px) {
    > .wrap {
      > div {
        > .el {
          > p {
            width: max-content;
          }
        }
      }
    }
  }
`;

const EditorPick = () => {
  const navigate = useNavigate();
  const { serverAddress } = useContext(UserContext);

  const { data, status } = useQuery('EditorPick', getEditorPick, []);
  const [index, setIndex] = useState(0);
  const setError = useSetRecoilState(errorState);
  if (status === 'error') {
    setError({
      errorMessage: '에디터픽',
      popup: true,
    });
  }
  return (
    <Div index={index}>
      <h1>이달의 에디터 추천</h1>
      <div className="wrap">
        <div>
          {status === 'success'
            ? data.slice(0, 3).map((value) => (
                <div
                  className="el"
                  key={value.id}
                  onClick={() =>
                    navigate(`/editor-pick-detail/${value.id}`, {
                      state: {
                        title: value.title,
                      },
                    })
                  }
                >
                  <img src={serverAddress + value.thumbnailPath} />
                  <p>{value.title}</p>
                </div>
              ))
            : null}
        </div>
        <div>
          {status === 'success'
            ? data.slice(3, 6).map((value) => (
                <div
                  className="el"
                  key={value.id}
                  onClick={() =>
                    navigate(`/editor-pick-detail/${value.id}`, {
                      state: {
                        title: value.title,
                      },
                    })
                  }
                >
                  <img src={serverAddress + value.thumbnailPath} />
                  <p>{value.title}</p>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className="layout">
        <div className="hide"></div>
        <div className="hide"></div>
        {index == 0 ? null : (
          <img src="/img/cir_left.svg" onClick={() => setIndex(0)} />
        )}
        {index == 1 ? null : (
          <img
            src="/img/cir_right.svg"
            className="right"
            onClick={() => setIndex(1)}
          />
        )}
      </div>
    </Div>
  );
};

export default EditorPick;
