import React, { useState, useRef } from 'react';

const LogoSvgAnimation = ({ width }) => {
  const [isAnimated, setIsAnimated] = useState(true);
  const logo = useRef(null);
  const aniA = useRef(null);
  const aniAEnd = useRef(null);
  const aniB = useRef(null);
  const aniBEnd = useRef(null);
  return (
    <svg
      style={{ width: width }}
      viewBox="0 0 160 41.296"
      xmlns="http://www.w3.org/2000/svg"
      ref={logo}
      onClick={() => aniA.current.beginElement()}
    >
      <>
        <linearGradient id="animation">
          <stop offset="0" stopColor="#1152cc">
            <animate
              dur="1s"
              attributeName="offset"
              fill="freeze"
              begin="0"
              from="0"
              to="1"
              restart="always"
              ref={aniA}
              id="first"
            />
          </stop>
          <stop offset="0" stopColor="#ffffff">
            <animate
              ref={aniAEnd}
              dur="1s"
              attributeName="offset"
              fill="freeze"
              begin="first.begin + 2s"
              from="0"
              to="1"
              id="firstEnd"
            />
          </stop>
        </linearGradient>
        {/* <linearGradient id="animationB">
          <stop offset="0" stop-color="#002E85">
            <animate
              ref={aniB}
              dur="1s"
              attributeName="offset"
              fill="freeze"
              begin="first.begin + 1s"
              from="0"
              to="1"
            />
          </stop>
          <stop offset="0" stop-color="#ffffff">
            <animate
              ref={aniBEnd}
              dur="1s"
              attributeName="offset"
              restart="whenNotActive"
              fill="freeze"
              begin="first.begin + 3s"
              from="0"
              to="1"
            />
          </stop>
        </linearGradient> */}
      </>
      <defs>
        <clipPath id="a">
          <rect width="160" height="41.296" data-name="square 7" />
        </clipPath>
      </defs>
      <g transform="translate(0 -.006)" data-name="group 1">
        <g
          fill="#002E85"
          transform="translate(0 .006)"
          clipPath="url(#a)"
          data-name="group 2"
        >
          <path
            transform="translate(-263.374 -0.002)"
            d="M 402.726,41.3 A 20.648,20.648 0 1 1 423.374,20.652 20.648,20.648 0 0 1 402.726,41.3 m 0,-39.217 A 18.567,18.567 0 1 0 421.291,20.652 18.567,18.567 0 0 0 402.726,2.079 M 284.674,41.3 263.374,0 h 2.334 L 284.674,36.66 303.641,0 h 11.238 v 39.213 h 38.666 a 18.567,18.567 0 0 0 0,-37.134 h -30.82 V 0 h 30.82 a 20.65,20.65 0 0 1 0,41.3 H 312.787 V 2.079 h -7.864 z"
            data-name="path 29"
            fill={isAnimated ? 'url(#animation)' : '#002E85'}
          />
          {/* <path
            transform="translate(-263.37 -.002)"
            d="m402.73 41.3a20.648 20.648 0 1 1 20.648-20.648 20.648 20.648 0 0 1-20.648 20.648m0-39.217a18.567 18.567 0 1 0 18.565 18.569 18.567 18.567 0 0 0-18.565-18.573"
            data-name="path 30"
            fill={isAnimated ? 'url(#animationB)' : '#002E85'}
          /> */}
        </g>
      </g>
    </svg>
  );
};

export default LogoSvgAnimation;
