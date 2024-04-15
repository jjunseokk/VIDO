import React from 'react';
import { useTranslation } from "react-i18next";
import styled from 'styled-components';
import px2vw from '../../util/px2vw';

const Div = styled.div`
  height: 540px;
  width: 100vw;
  position: relative;
  top: 0;
  left: 0;
  background: url(${({ props }) => props.src});
  background-position: center left;
  background-size: cover;
  background-repeat: no-repeat;
  > .bhak {
    position: absolute;
    width: ${px2vw(950)};
    height: auto;
    right: ${px2vw(320)};
    bottom: 160px;
  }

  > div {
    &:nth-of-type(1) {
      > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 540px;
        object-fit: cover;
      }
      > .mask {
        position: absolute;
        left: 0;
        height: 540px;
        width: 50vw;
        background: rgb(0, 0, 0);
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.75) 0%,
          rgba(255, 255, 255, 0) 100%
        );
        mix-blend-mode: multiply;
      }
    }
    &:nth-of-type(2) {
      position: absolute;
      bottom: ${({ props }) => props.bottom}px;
      height: max-content;
      width: max-content;
      left: calc(16vw + 20px);
      > img.vido {
        width: 400px;
        margin-bottom: 46px;
      }
      > h1 {
        color: ${({ props }) => (props.color ? props.color : '#fff')};
        font: 600 48px/60px ${({ theme }) => theme.noto};
        text-shadow: ${({ props }) => props.titleShadow ?? 'none'};
        letter-spacing: -0.16px;
        &:last-of-type {
          margin-bottom: 20px;
        }
      }
      > p {
        color: ${({ props }) => (props.color ? props.color : '#fff')};
        text-shadow: ${({ props }) => props.titleShadow ?? 'none'};
        font: 500 16px/24px ${({ theme }) => theme.noto};
        letter-spacing: -0.16px;
      }
      > a {
        padding: 0 18px;
        font: 500 14px/32px ${({ theme }) => theme.noto};
        color: ${({ props }) => (props.linkColor ? props.linkColor : '#fff')};
        margin-top: 30px;
        width: 120px;
        border-radius: 16px;
        height: 32px;
        border: 1px solid #9d9d9d;
        z-index: 10;
        letter-spacing: -0.14px;
        display: block;
        position: relative;
        transition: ${({ theme }) => theme.transition};
        z-index: 3;
        &::after {
          z-index: -1;
          transition: ${({ theme }) => theme.transition};
          display: block;
          content: '';
          position: absolute;
          top: 8px;
          right: 0;
          left: auto;
          width: 0px;
          height: 16px;
          border-radius: 16px;
          background-color: ${({ props }) =>
            props.color ? props.color : '#fff'};
        }
        > svg {
          margin-left: 8px;
          > path {
            stroke: ${({ props }) =>
              props.linkColor ? props.linkColor : '#FFF'};
            transition: ${({ theme }) => theme.transition};
          }
        }
        &:hover {
          color: ${({ props, theme }) =>
            props.color != '#ffffff' ? '#fff' : theme.mainColor};
          &::after {
            width: 100%;
            left: 0;
            right: auto;
            top: 0;
            height: 100%;
          }
          > svg > path {
            stroke: ${({ props, theme }) =>
              props.linkColor ? '#fff' : theme.mainColor};
          }
        }
      }
    }
  }
  @media (max-width: 1482px) {
    height: 480px;

    > div:nth-of-type(2) {
      bottom: ${({ props }) => props.bottom - 30}px;

      > img.vido {
        width: 300px;
        margin-bottom: 12px;
      }
      > h1 {
        font: 600 32px/48px ${({ theme }) => theme.noto};
        &:last-of-type {
          margin-bottom: 12px;
        }
      }
      > p {
        font: 500 14px/20px ${({ theme }) => theme.noto};
      }
    }
  }
  @media (max-width: 1072px) {
    height: 320px;
    > .bhak {
      width: ${px2vw(850)};
      bottom: ${({ props }) => props.bottom - 50}px;
    }
    > div:nth-of-type(2) {
      bottom: ${({ props }) => props.bottom - 50}px;

      > img.vido {
        width: 200px;
        margin-bottom: 12px;
      }
      > h1 {
        font: 600 28px ${({ theme }) => theme.noto};
        &:last-of-type {
          margin-bottom: 12px;
        }
      }
      > p {
        font: 500 12px/18px ${({ theme }) => theme.noto};
      }
      > a {
        padding: 0 14px;
        font: 500 12px/24px ${({ theme }) => theme.noto};
        margin-top: 12px;
        width: 110px;
        border-radius: 16px;
        height: 24px;
        &:after {
          top: 4px;
          height: 16px;
        }
        > svg {
          height: 10px;
          width: auto;
        }
      }
    }
  }
  @media (max-width: 712px) {
    height: 240px;
    > .bhak {
      width: ${px2vw(650)};
      bottom: ${({ props }) => props.bottom - 20}px;
    }
    > div:nth-of-type(2) {
      bottom: ${({ props }) => props.bottom - 40}px;

      > img.vido {
        width: 100px;
        margin-bottom: 4px;
      }
      > h1 {
        font: 600 14px ${({ theme }) => theme.noto};
        &:last-of-type {
          margin-bottom: 6px;
        }
      }
      > p {
        font: 500 10px/15px ${({ theme }) => theme.noto};
      }
      > a {
        margin-top: 4px;
        padding: 0 12px;
        font: 500 10px/24px ${({ theme }) => theme.noto};
        width: 110px;
        border-radius: 16px;
        height: 24px;
        &:after {
          top: 4px;
          height: 16px;
        }
        > svg {
          height: 10px;
          width: auto;
        }
      }
    }
  }
`;

const SlideInner = ({ data }) => {
    const { t } = useTranslation();
  return (
    <Div props={data}>
      {data.icon ? <img src={data.icon} className="bhak" /> : null}
      <div>
        {/* <img src={data.src} /> */}
        {data.mask === true ? <div className="mask"></div> : null}
      </div>
      <div>
        {data.titleImg ? <img src={data.titleImg} className="vido" /> : null}
        {data.title
          ? data.title.map((value, idx) => <h1 key={idx} style={{fontSize: data.titleSize, marginBottom: data.titleMargin}}>{value}</h1>)
          : null}
        {data.txt
          ? data.txt.map((value, idx) => <p key={idx}>{value}</p>)
          : null}
        {data.link ? (
          <a href={data.link} target="_blank">
              {t("banner.more")}
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
                strokeWidth="1"
              />
            </svg>
          </a>
        ) : null}
      </div>
    </Div>
  );
};

export default SlideInner;
