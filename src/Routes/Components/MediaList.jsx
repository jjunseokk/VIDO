import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextProvider';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ChartElement from './ChartElement';
import FramerMotionAnimate from '../util/FramerMotionAnimate.json';
import px2vw from '../util/px2vw';
const Section = styled.section`
  position: relative;
  height: max-content;
  margin-bottom: 72px;
  
  .cover {
    position: absolute;
    background-color: ${({ mode }) => (mode == 'light' ? '#fff' : '#151515')};
    width: ${({ theme }) => theme.left};
    /* background-color: red; */
    height: inherit;
    height: calc(${px2vw(303)});

    z-index: 10;
    &:nth-child(1) {
      left: 0;
      /* background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 95%,
        rgba(255, 255, 255, 0) 100%
      ); */
    }
    &:nth-child(2) {
      right: -12px;
      /* background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 5%
      ); */
    }
  }
  section {
    position: relative;
    width: ${({ theme }) => theme.pgWidth};
    left: ${({ theme }) => theme.left};
    button {
      top: ${px2vw(180 / 2)};
      position: absolute;
      width: 40px;
      z-index: 10;
      border: none;
      background: none;
      transition: ${({ theme }) => theme.transition};
      cursor: pointer;
      img {
        position: relative;
        z-index: -1;
        border-radius: 100%;
        filter: drop-shadow(3px 3px 3px #00000029);
      }
      &:nth-child(1) {
        left: -20px;
        // display: none;
      }
      &:nth-child(2) {
        left: calc(${({ theme }) => theme.pgWidth} - 20px);
      }
    }
    ul {
      animation: slideIn 1.2s ease-in-out;
      transform: translateX(-${({ scroll }) => scroll * 25.36}%);
      display: flex;
      position: relative;
      transition: ${({ theme }) => theme.transition};
      right: 0;
      height: ${px2vw(280)};
      gap: ${px2vw(22)};
      li {
        flex: 1;
        cursor: pointer;
        position: relative;
        p.index {
          position: absolute;
          z-index: 20;
          color: #fff;
          font: italic 800 80px/1 ${({ theme }) => theme.roboto};
          left: 12px;
          top: 8px;
        }
      }
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
  @media (max-width: 1220px) {
    section {
      button {
        > img {
        }
      }
      ul {
        gap: ${px2vw(24)};
        transform: translateX(-${({ scroll }) => scroll * 25.46}%);
      }
    }
  }
  @media (max-width: 824px) {
    .cover {
      height: ${px2vw(330)};
    }
    section {
      button {
        width: 32px;
        > img {
          width: 32px;
        }
        &:nth-child(1) {
          left: -12px;
          // display: none;
        }
        &:nth-child(2) {
          left: calc(${({ theme }) => theme.pgWidth} - 6px);
        }
      }
      ul {
        transform: translateX(-${({ scroll }) => scroll * 25.66}%);
        gap: ${px2vw(29)};
        li p.index {
          font: italic 800 40px/1 ${({ theme }) => theme.roboto};
        }
      }
    }
  }
`;

const MediaList = ({ dataList = [], top10 = false, mode, direction = '', page }) => {
  const { serverAddress } = useContext(UserContext);

  const [scroll, setScroll] = useState(0);
  const [visibilityL, setVisibilityL] = useState('hidden');
  const [visibilityR, setVisibilityR] = useState('visible');
  const buttonClick = (direction) => {
    switch (direction) {
      case 'right': {
        setScroll((scroll) => ++scroll);
        if (scroll < 2) {
          setVisibilityL('visible');
          setVisibilityR('visible');
        } else if (scroll == dataList.length - 5) {
          setVisibilityR('hidden');
        }
        return;
      }
      case 'left': {
        setScroll((scroll) => --scroll);
        if (scroll > 1) {
          setVisibilityL('visible');
          setVisibilityR('visible');
        } else if (scroll == 1) {
          setVisibilityL('hidden');
        }
        return;
      }
    }
  };

  useEffect(() => {
    setScroll(direction)
  }, [direction])

  return (
    <Section mode={mode} scroll={scroll}>
      <div className={'cover'}></div>
      <div className={'cover'}></div>
      <div>
        <section>
          {page == 'recommended' ? null : (
            <>
              <button
                style={{ visibility: visibilityL }}
                onClick={() => buttonClick('left')}
              >
                <img
                  src={
                    mode == 'light'
                      ? '/img/cir_left.svg'
                      : '/img/arrow-left-dark.svg'
                  }
                ></img>
              </button>
              <button
                disabled={scroll == dataList.length - 4}
                style={{ visibility: visibilityR }}
                onClick={() => buttonClick('right')}
              >
                <img
                  src={
                    mode == 'light'
                      ? '/img/cir_right.svg'
                      : '/img/arrow-right-dark.svg'
                  }
                ></img>
              </button>
            </>
          )}

          <div>
            <ul style={{}}>
              <AnimatePresence>
                {Array.isArray(dataList)
                  ? dataList.map((value, idx) => (
                    <motion.li
                      variants={FramerMotionAnimate[0]}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition="transition"
                      key={value.id}
                    >
                      {top10 ? <p className="index">{idx + 1}</p> : null}
                      <ChartElement
                        mode={mode}
                        imgsrc={serverAddress + value.thumbnailPath}
                        title={value.title}
                        author={value.author.authorName}
                        id={value.id}
                        authorId={value.author.id}
                        profImg={
                          value.authorProfilePath
                            ? serverAddress + value.authorProfilePath
                            : '/img/author-img.png'
                        }
                        imgSize={303}
                      />
                    </motion.li>
                  ))
                  : null}
              </AnimatePresence>
            </ul>
          </div>
        </section>
      </div>
    </Section>
  );
};

export default MediaList;
