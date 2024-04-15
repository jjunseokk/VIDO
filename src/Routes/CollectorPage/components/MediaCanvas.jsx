import React, { useState } from 'react';
import mapData from '../data/mapData';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { up } from '../../util/Framer';
import px2vw from '../../util/px2vw';
import { Trans, useTranslation } from "react-i18next";

const Div = styled(motion.div)`
  position: relative;
  padding-top: 80px;
  padding-bottom: 60px;
  background: ${({mode})=>(mode == 'light'? "#ffff" : "#151515")};

  > h1 {
    font: 600 36px/1.5 ${({ theme }) => theme.noto};
    text-align: center;
    color: ${({ theme }) => theme.highlightColor};
    margin-bottom: 16px;
  }

  > div {
    margin-left: calc(${({ theme }) => theme.left} - 5px);
    width: calc(${({ theme }) => theme.pgWidth} + 10px);
    color: ${({mode})=>(mode == 'light'? "#151515" : "#ffff")};
    position: relative;

    button {
      position: absolute;
      z-index: 20;
      top: 248px;
      width: 40px;
      height: 40px;

      > img {
        filter: drop-shadow(3px 3px 3px #00000029);
      }

      &.left {
        left: -20px;
        display: ${(props) => (props.idx >= 0 ? 'none' : 'block')};
      }

      &.right {
        right: -20px;
        display: ${(props) =>
    props.idx <= -props.length + 3 ? 'none' : 'block'};
      }
    }

    > div {
      width: calc(${({ theme }) => theme.pgWidth} + 10px);
      height: ${px2vw(510)};
      // height: 519px;
      overflow: hidden;

      > ul {
        display: flex;
        gap: ${px2vw(28)};
        margin-top: 3px;
        transition: ${({ theme }) => theme.transition};
        margin-left: calc(${(props) => px2vw(436 * props.idx)} + 8px);

        &:nth-of-type(1) {
        }
      }
    }
  }

  .card {
    width: ${px2vw(408)};
    height: ${px2vw(500)};
    background-color: #fff;
    box-shadow: ${({ theme }) => theme.boxShadow};
    padding: ${px2vw(24)};
    z-index: 50;

    > img {
      width: ${px2vw(360)};
      height: ${px2vw(240)};
      margin-bottom: 24px;
      object-fit: cover;
    }

    h1 {
      font: 600 22px/1.5 ${({ theme }) => theme.noto};
      color: #2b2b2b;
      margin-bottom: 15px;
    }

    ul {
      li {
        margin-bottom: 14px;
        position: relative;
        display: grid;
        grid-template-columns: 100px 1fr;

        > p {
          font: 400 12px/1.5 ${({ theme }) => theme.noto};
          color: #2b2b2b;

          letter-spacing: -0.24px;
        }

        span {
          font: 600 14px/1.5 ${({ theme }) => theme.noto};
          color: #2b2b2b;
        }
      }
    }
  }

  @media (max-width: 1356px) {
    > div {
      > button {
        width: 32px;
        height: 32px;
        top: 198px;

        > img {
          width: 32px;

          height: 32px;
        }

        &.left {
          left: -12px;
        }

        &.right {
          right: -12px;
        }
      }

      > div {
        height: 432px;

        > ul {
        }
      }
    }

    .card {
      height: 428px;

      > img {
        margin-bottom: 12px;
      }

      h1 {
        font: 600 18px ${({ theme }) => theme.noto};
        margin-bottom: 12px;
      }

      ul li {
        grid-template-columns: 40px 1fr;

        margin-bottom: 14px;

        > p {
        }

        span {
          font: 600 12px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 852px) {
    > div {
      > button {
        width: 32px;
        height: 32px;

        > img {
          width: 32px;

          height: 32px;
        }

        &.left {
          left: -32px;
        }

        &.right {
          right: -32px;
        }
      }

      > div {
        height: 382px;
      }
    }

    .card {
      height: 378px;

      > img {
        margin-bottom: 12px;
      }

      h1 {
        font: 600 18px ${({ theme }) => theme.noto};
        margin-bottom: 12px;
      }

      ul li {
        grid-template-columns: 40px 1fr;

        margin-bottom: 14px;

        > p {
        }

        span {
          font: 600 12px ${({ theme }) => theme.noto};
        }
      }
    }
  }
  @media (max-width: 798px) {
    > div {
      margin-left: 8vw;
      width: calc(82vw);

      > button {
        &.right {
          display: ${(props) =>
    props.idx <= Math.ceil(-props.length / 3) ? 'none' : 'block'};
        }
      }

      > div {
        width: 84vw;
        height: 580px;
        width: calc(82vw);

        > ul {
          flex-direction: column;
          flex-wrap: wrap;
          height: 580px;
          gap: 10px 0px;
          margin-left: calc(${(props) => props.idx * 82 + 'vw' + ' + ' + 12 * props.idx + 'px'});
          transition: ${({ theme }) => theme.transition};
        }
      }

      .card {
        margin-right: 12px;
        width: 82vw;
        box-shadow: none;
        border: ${({ theme }) => theme.border};
        height: 180px;
        display: grid;
        grid-template-columns: 160px 1fr;
        grid-template-rows: 120px 1fr;
        gap: 16px;

        h1 {
          width: 160px;
          grid-column: 1;
          grid-row: 2;
          text-align: center;
          font: 600 11px/1.5 ${({ theme }) => theme.noto};
        }

        > img {
          width: 160px;
          height: 120px;
          margin-bottom: 0;
        }

        ul {
          margin-bottom: 10px;
          grid-column: 2;
          grid-row: 1 / span 2;

          li {
            p {
              font: 400 10px/18px ${({ theme }) => theme.noto};
            }

            span {
              font: 600 10px/18px ${({ theme }) => theme.noto};
            }
          }
        }
      }
    }
  }

  div.description {
    text-align: center;
    margin-bottom: 40px;
    font: 400 16px/24px ${({ theme }) => theme.noto};
  }

  div.scrollBar {
    background-color: #E0E0E0;
    width: calc(${({ theme }) => theme.pgWidth} - 10px);
    height: 6px;
    margin-top: 20px;
    margin-left: calc((${({ theme }) => theme.pgWidth} - 10px) / 100 / 2);
  }

  div.scrollPosition {
    background-color: #707070;
    height: 6px;
    width: ${(props) => 100 / (Math.floor(props.length / 3) + (props.length % 3 != 0 ? 1 : 0))}%;
    margin-left: ${(props) => 100 / (Math.floor(props.length / 3) + (props.length % 3 != 0 ? 1 : 0)) * (props.idx / 3 * -1)}%;
  }
`;

// 콜렉터 - VIDO 미디어 캔버스
const MediaCanvas = ({mode}) => {
  const { t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const length = mapData.length;
  return (
    <Div idx={idx} length={length} mode={mode}>
      <motion.h1>{t("collector.title")}</motion.h1>
      <div class="description">{t("collector.description")}</div>
      <div>
        <div>
          <motion.ul variants={up.container} initial="hidden" animate="show">
            {mapData.map((value, idx) => (
              <motion.li key={idx} variants={up.item}>
                <motion.div className="card">
                  <img src={`/img/collector/${value.thumb}`} />
                  <h1>{value.name}</h1>
                  <ul>
                    {value.keyword ? (
                      <li>
                        <span>{t("collector.keyword")}</span>
                        <p>{value.keyword}</p>
                      </li>
                    ) : null}
                    <li>
                      <span>
                        {value.res ? t("collector.resolution") : t("collector.size")}
                      </span>
                      <p>{value.res ?? value.size}</p>
                    </li>
                    <li>
                      <span>{t("collector.ratio")}</span>
                      <p>{value.ratio}</p>
                    </li>
                    <li>
                      <span>{t("collector.address")}</span>
                      <p>{value.address}</p>
                    </li>
                  </ul>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <button onClick={() => setIdx((prev) => prev + 3)} className="left">
          <img src="/img/collector-left.png" />
        </button>
        <button onClick={() => setIdx((prev) => prev - 3)} className="right">
          <img src="/img/collector-right.png" />
        </button>
        <div class="scrollBar">
          <div class="scrollPosition"></div>
        </div>
      </div>
    </Div>
  );
};

export default MediaCanvas;
