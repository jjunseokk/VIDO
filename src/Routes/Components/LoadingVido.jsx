import React from 'react';
import styles from './LoadingVido.module.scss';

const LoadingVido = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.bar}></div>
      <div className={styles.cover}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="89.113"
          height="23"
          viewBox="0 0 89.113 23"
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="sqr_68"
                data-name="sqr 68"
                width="89.113"
                height="23"
                fill="#002e85"
              />
            </clipPath>
          </defs>
          <g id="group_8" data-name="group 8" transform="translate(0 0)">
            <g
              id="group_7"
              data-name="group 7"
              transform="translate(0 0)"
              clipPath="url(#clip-path)"
            >
              <path
                id="path_31"
                data-name="path 31"
                d="M11.862,23,0,0H1.3L11.862,20.418,22.427,0h6.259V21.84H50.221a10.341,10.341,0,1,0,0-20.682H33.056V0H50.221a11.5,11.5,0,0,1,0,23h-22.7V1.158H23.141Z"
                transform="translate(0 -0.001)"
                fill="#002e85"
              />
              <path
                id="path_32"
                data-name="path 32"
                d="M40.568,23a11.5,11.5,0,1,1,11.5-11.5A11.515,11.515,0,0,1,40.568,23m0-21.842A10.341,10.341,0,1,0,50.908,11.5,10.355,10.355,0,0,0,40.568,1.16"
                transform="translate(37.045 -0.001)"
                fill="#002e85"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default LoadingVido;
