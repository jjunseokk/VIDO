import React, { useState, useRef, useEffect } from 'react';
import styles from './mainbanner.module.scss';
import SLIDES from '../data/SLIDES.json';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const MainBanner = () => {
  const itemSize = SLIDES.length;
  let shadow = 1;
  const [transitionTime, setTransitionTime] = useState(1000);
  const transitionStyle = `transform ${transitionTime}ms cubic-bezier(.09,.45,.55,.96) 0s`;
  const [mouseOver, setMouseOver] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [slideIndex, setSlideIndex] = useState(2);
  const [transition, setTransition] = useState(transitionStyle);

  const SlideTxt = ({ txt }) => {
    if (txt == 'txt1') {
      return (
        <div className={styles[txt]}>
          <img src="./img/vidoWhite.png" />
          <p>
            VIDO는 높은 퀄리티의 미디어아트 구독 서비스와 작가와 개인간의
            <br /> 작품 트레이딩을 통해 수익을 창출 할 수 있는 종합
            플랫폼입니다.
          </p>
        </div>
      );
    } else if (txt == 'txt2') {
      return (
        <div className={styles[txt]}>
          <h1>
            <span>Gallery BHAK </span>
            합류
          </h1>

          <p>
            Gallery BHAK이 소유한 명작들을
            <br />
            VIDO에서 감상하실 수 있습니다
          </p>
        </div>
      );
    } else if (txt == 'txt3') {
      return (
        <div className={styles[txt]}>
          <h1>자연 수묵화의 대가</h1>

          <p>
            <span>류재춘 화백</span>의 명화를 VIDO에서
            <br />
            감상해 보세요
          </p>
        </div>
      );
    } else if (txt == 'txt4') {
      return (
        <div className={styles[txt]}>
          <h1>작가 이수경 합류</h1>
          <p>
            MMCA 올해의 작가상 수상,
            <br />
            <span>현대미술 작가 이수경</span>의 작품을
            <br />
            VIDO에서 만나보세요
          </p>
        </div>
      );
    }
  };

  let slides = setSlides();

  function setSlides() {
    let addedFront = [];
    let addedLast = [];
    var index = 0;
    while (index < 2) {
      addedLast.push(SLIDES[0]);
      addedFront.unshift(SLIDES[SLIDES.length - 1]);
      index++;
    }
    return [...addedFront, ...SLIDES, ...addedLast];
  }

  useInterval(
    () => {
      return handleSlide(slideIndex + 1);
    },
    mouseOver ? null : 3000
  );

  useEffect(() => {
    mouseOver ? null : setTransitionTime(1000);
  }, [mouseOver]);

  const replaceSlide = (index) => {
    setTimeout(() => {
      setSlideIndex(index);
      setTransition('');
      // setTransitionTime(1000);
    }, transitionTime);
  };
  const handleSlide = (index) => {
    setTransition(transitionStyle);
    // console.log('index' + index);
    setSlideIndex(index);
    if (index < 2) {
      // setTransitionTime(10);
      replaceSlide(index + itemSize);
    } else if (index > itemSize + 1) {
      // setTransitionTime(10);
      replaceSlide(index - itemSize);
    }
  };
  const handleSwipe = (direction) => {
    setTransitionTime(100);
    setBtnDisabled(true);
    setTimeout(() => setBtnDisabled(false), 100);
    handleSlide(slideIndex + direction);
  };

  const controls = {
    opacity: 0,
    // opacity: 1,
  };

  return (
    <>
      <main
        className={styles.mainbanner}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        style={{
          backgroundImage:
            slideIndex <= itemSize ? `url('${slides[0].img}')` : null,
        }}
      >
        <button
          style={mouseOver ? null : controls}
          onClick={() => handleSwipe(-1)}
          disabled={btnDisabled}
        >
          <embed src="./img/arrow_left.svg" type="image/svg+xml" />
        </button>
        <button
          style={mouseOver ? null : controls}
          onClick={() => handleSwipe(1)}
          disabled={btnDisabled}
        >
          <embed src="./img/arrow_right.svg" type="image/svg+xml" />
        </button>
        <p style={mouseOver ? null : controls}>
          {slideIndex - 1 <= 0
            ? itemSize
            : slideIndex > itemSize
            ? itemSize
            : slideIndex - 1}
          /{SLIDES.length}
        </p>
        {mouseOver ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : null}
        <ul
          style={{
            transform: `translateX(calc(${
              (-100 / slides.length) * slideIndex
            }%))`,
            transition: transition,
          }}
        >
          {slides.map((slide, index) => {
            return (
              <li key={index}>
                <img src={slide.img} alt="banner" />
                <SlideTxt txt={slide.txt} />
                {slide.link ? <a href={slide.link} target="_blank"></a> : null}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default MainBanner;
