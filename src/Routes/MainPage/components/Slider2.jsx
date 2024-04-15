import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SlideInner from './SlideInner';
import useInterval from '../../util/useInterval';
import SliderIndex from './SliderIndex';

const SliderBase = styled.div`
  height: 540px;
  width: 100vw;
  overflow: hidden;
  position: relative;
  > img {
    position: absolute;
    top: calc(50% - 32px);
    padding: 20px;
    cursor: pointer;
    filter: drop-shadow(0 0 2px #15151575);
    &:nth-of-type(1) {
      left: calc(${({ theme }) => theme.left} - 100px);
    }
    &:nth-of-type(2) {
      right: calc(${({ theme }) => theme.left} - 80px);
      transform: rotate(180deg);
    }
  }
  @media (max-width: 1482px) {
    height: 480px;
  }
  @media (max-width: 1072px) {
    height: 320px;
  }
  @media (max-width: 712px) {
    height: 240px;
  }
`;
const SlideUl = styled.ul`
  position: relative;
  > li {
    opacity: 0;
    position: absolute;
    transition: all 0.5s;
    &:nth-of-type(1) {
      opacity: 1;
    }
  }
`;

const Slider2 = ({ slides, select, setSelect, num, other }) => {
  const [index, setIndex] = useState(0);
  const [mouseEnter, setMouseEnter] = useState(false);
  const slideUl = useRef(null);
  const time = 5000;
  const transition = 100;
  const length = slides.length;

  const changeSelect = (n) => {
    setSelect(n);
  };
  useEffect(() => {
    for (let i = 0; i < length; i++) {
      slideUl.current.children[i].style.opacity = 0;
      if (i == index) {
        slideUl.current.children[i].style.opacity = 1;
      }
    }
  }, [index]);

  // useEffect(() => {
  //   const myTimeout = setTimeout(() => changeSelect(other), time);
  //   if (mouseEnter || index !== length - 1) {
  //     clearTimeout(myTimeout);
  //   } else {
  //   }
  // }, [index]);
  useEffect(() => {
    select != num ? setIndex(0) : null;
  }, [select]);
  useInterval(
    () => {
      if (mouseEnter == false) {
        handleSlide(1);
      } else {
        handleSlide(0);
      }
    },
    select == num ? time : null
  );

  const handleSlide = (direction) => {
    if (index <= 0 && direction < 0) {
      num > 0 ? setSelect(num - 1) : setSelect(1);
    } else if (index >= length - 1 && direction > 0) {
      num < 1 ? setSelect(num + 1) : setSelect(0);
      // setIndex(0);
    } else {
      setIndex(index + direction);
    }
  };

  return (
    <SliderBase
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      <div>
        <SlideUl ref={slideUl}>
          {slides.map((value, idx) => (
            <li key={idx}>
              <SlideInner data={value} />
            </li>
          ))}
        </SlideUl>
      </div>
      <img src="img/slide/slide_arrow.svg" onClick={() => handleSlide(-1)} />
      <img src="img/slide/slide_arrow.svg" onClick={() => handleSlide(1)} />
      <SliderIndex data={slides} index={index} setIndex={setIndex} />
    </SliderBase>
  );
};

export default Slider2;
